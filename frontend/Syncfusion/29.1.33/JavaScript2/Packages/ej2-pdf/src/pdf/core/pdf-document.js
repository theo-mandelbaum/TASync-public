import { _PdfStream } from './base-stream';
import { _PdfCrossReference } from './pdf-cross-reference';
import { _Linearization } from './pdf-parser';
import { _isWhiteSpace, FormatError, _decode, _getNewGuidString, _isNullOrUndefined, _updatePageSettings, _updatePageCount } from './utils';
import { _PdfCatalog } from './pdf-catalog';
import { _PdfDictionary, _PdfReference, _isName, _PdfName, _clearPrimitiveCaches } from './pdf-primitives';
import { PdfPage } from './pdf-page';
import { Save } from '@syncfusion/ej2-file-utils';
import { DataFormat, PdfPermissionFlag, PdfTextAlignment, PdfPageOrientation, PdfRotationAngle } from './enumerator';
import { PdfForm } from './form/form';
import { PdfBrush } from './graphics/pdf-graphics';
import { PdfFontFamily, PdfFontStyle, PdfStandardFont } from './fonts/pdf-standard-font';
import { PdfStringFormat, PdfVerticalAlignment } from './fonts/pdf-string-format';
import { _XfdfDocument } from './import-export/xfdf-document';
import { _JsonDocument } from './import-export/json-document';
import { _FdfDocument } from './import-export/fdf-document';
import { PdfBookmarkBase, _PdfNamedDestinationCollection } from './pdf-outline';
import { _XmlDocument } from './import-export/xml-document';
import { PdfFileStructure } from './pdf-file-structure';
import { _PdfMergeHelper } from './pdf-merge';
import { PdfPageImportOptions } from './pdf-page-import-options';
import { PdfLayerCollection } from './layers/layer-collection';
import { PdfSection } from './pdf-section';
/**
 * Represents a PDF document and can be used to parse an existing PDF document.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Flatten annotations and form fields
 * document.flatten = true;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfDocument = /** @class */ (function () {
    function PdfDocument(data, password) {
        this._headerSignature = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
        this._startXrefSignature = new Uint8Array([0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66]);
        this._endObjSignature = new Uint8Array([0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a]);
        this._version = '';
        this._permissions = PdfPermissionFlag.default;
        this._isEncrypted = false;
        this._isUserPassword = false;
        this._hasUserPasswordOnly = false;
        this._encryptOnlyAttachment = false;
        this._encryptMetaData = false;
        this._isExport = false;
        this._allowCustomData = false;
        this._isDuplicatePage = false;
        this._isSplitDocument = false;
        this._optionalContentDictionaries = [];
        this._order = [];
        this._on = [];
        this._off = [];
        this._as = [];
        this._printLayer = [];
        this._isLoaded = true;
        if (data) {
            this._stream = new _PdfStream(typeof data === 'string' ? _decode(data) : data);
            this._fileStructure = new PdfFileStructure();
            this._crossReference = new _PdfCrossReference(this, password);
            this._pages = new Map();
            this._checkHeader();
            this._crossReference._setStartXRef(this._startXRef);
            try {
                this._parse(false);
            }
            catch (e) {
                if (e.name === 'XRefParseException') {
                    this._parse(true);
                }
                else {
                    throw e;
                }
            }
            this._crossReference._version = this._version;
        }
        else {
            this._isLoaded = false;
            this._stream = new _PdfStream([]);
            this._version = '1.4';
            this._fileStructure = new PdfFileStructure();
            this._fileStructure.isIncrementalUpdate = false;
            this._crossReference = new _PdfCrossReference(this);
            this._crossReference._version = this._version;
            this._crossReference._nextReferenceNumber = 1;
            var catalogDictionary = new _PdfDictionary(this._crossReference);
            catalogDictionary.update('Type', _PdfName.get('Catalog'));
            var catalogReference = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(catalogReference, catalogDictionary);
            var trailerDictionary = new _PdfDictionary();
            trailerDictionary.update('Root', catalogReference);
            this._crossReference._trailer = trailerDictionary;
            this._crossReference._root = catalogDictionary;
            var topPagesDictionary = new _PdfDictionary(this._crossReference);
            topPagesDictionary.update('Type', _PdfName.get('Pages'));
            topPagesDictionary.update('Kids', []);
            topPagesDictionary.update('Count', 0);
            var topPagesReference = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(topPagesReference, topPagesDictionary);
            catalogDictionary.update('Pages', topPagesReference);
            this._catalog = new _PdfCatalog(this._crossReference);
            this._pages = new Map();
        }
    }
    Object.defineProperty(PdfDocument.prototype, "_allowImportCustomData", {
        get: function () {
            return this._allowCustomData;
        },
        set: function (value) {
            this._allowCustomData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "_linearization", {
        get: function () {
            if (!this._linear) {
                var value = void 0;
                try {
                    value = new _Linearization(this._stream);
                }
                catch (err) { } // eslint-disable-line
                this._linear = value;
            }
            return this._linear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "_startXRef", {
        get: function () {
            var stream = this._stream;
            var startXRef = 0;
            if (this._linearization && this._linearization.isValid) {
                stream.reset();
                if (this._find(stream, this._endObjSignature)) {
                    startXRef = stream.position + 6 - stream.start;
                }
            }
            else {
                var step = 1024;
                var startXRefLength = this._startXrefSignature.length;
                var found = false;
                var position = stream.end;
                while (!found && position > 0) {
                    position -= step - startXRefLength;
                    if (position < 0) {
                        position = 0;
                    }
                    stream.position = position;
                    found = this._find(stream, this._startXrefSignature, step, true);
                }
                if (found) {
                    stream.skip(9);
                    var ch = void 0;
                    do {
                        ch = stream.getByte();
                    } while (_isWhiteSpace(ch));
                    var str = '';
                    while (ch >= 0x20 && ch <= 0x39) {
                        str += String.fromCharCode(ch);
                        ch = stream.getByte();
                    }
                    startXRef = parseInt(str, 10);
                    if (isNaN(startXRef)) {
                        startXRef = 0;
                    }
                }
            }
            return startXRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "isEncrypted", {
        /**
         * Gets a value indicating whether the document is encrypted. (Read Only).
         *
         * @returns {boolean} A boolean value indicates whether the document is encrypted.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Gets a value indicating whether the document is encrypted.
         * let isEncrypted: boolean = document.isEncrypted;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._isEncrypted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "isUserPassword", {
        /**
         * Gets a value indicating whether the document is decrypted using the user password. (Read only).
         *
         * @returns {boolean} A boolean value indicates whether the document is decrypted using the user password.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Gets a value indicating whether the document is decrypted using the user password
         * let isUserPassword: boolean = document.isUserPassword;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._isUserPassword;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "pageCount", {
        /**
         * Gets the page count (Read only).
         *
         * @returns {number} Number of pages
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Gets the page count
         * let count: number = document.pageCount;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._pageCount === 'undefined') {
                this._pageCount = 0;
                if (this._linearization && this._linearization.isValid) {
                    this._pageCount = this._linearization.pageCount;
                }
                else {
                    this._pageCount = this._catalog.pageCount;
                }
            }
            return this._pageCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "form", {
        /**
         * Gets the PDF form fields included in the document (Read only).
         *
         * @returns {PdfForm} Form object
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access loaded form
         * let form: PdfForm = document.form;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._form === 'undefined') {
                this._form = new PdfForm(this._catalog.acroForm, this._crossReference);
            }
            return this._form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "flatten", {
        /**
         * Gets the boolean flag to flatten the annotations and form fields.
         *
         * @returns {boolean} Flag to flatten
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Gets the flatten value applied
         * let flatten: boolean = document.flatten;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._flatten;
        },
        /**
         * Sets the boolean flag to flatten the annotations and form fields.
         *
         * @param {boolean} value to flatten
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Flatten PDF annotations and form fields
         * document.flatten = true;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._flatten = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "permissions", {
        /**
         * Gets the permission flag of the PDF document (Read only).
         *
         * @returns {PdfPermissionFlag} permission flag. Default value is PdfPermissionFlag.default.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Gets the permission flag
         * let permission: PdfPermissionFlag = document.permissions;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._crossReference) {
                var flag = this._crossReference._permissionFlags;
                if (typeof flag !== 'undefined') {
                    this._permissions = (flag & ~-3904);
                }
            }
            return this._permissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "bookmarks", {
        /**
         * Gets the bookmarks (Read only).
         *
         * @returns {PdfBookmarkBase} Bookmarks.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Get bookmarks
         * let bookmarks: PdfBookmarkBase = document.bookmarks;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var catalog = this._catalog;
            if (catalog) {
                if (catalog._catalogDictionary.has('Outlines')) {
                    var reference = catalog._catalogDictionary._get('Outlines');
                    var outlines = catalog._catalogDictionary.get('Outlines');
                    if (outlines) {
                        this._bookmarkBase = new PdfBookmarkBase(outlines, this._crossReference);
                        this._bookmarkBase._reference = reference;
                        if (outlines.has('First')) {
                            this._bookmarkBase._reproduceTree();
                        }
                    }
                }
                else {
                    var outlines = new _PdfDictionary(this._crossReference);
                    var reference = this._crossReference._getNextReference();
                    this._crossReference._cacheMap.set(reference, outlines);
                    catalog._catalogDictionary.update('Outlines', reference);
                    this._crossReference._allowCatalog = true;
                    this._bookmarkBase = new PdfBookmarkBase(outlines, this._crossReference);
                    this._bookmarkBase._reference = reference;
                }
            }
            return this._bookmarkBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "fileStructure", {
        /**
         * Gets the internal structure of the PDF document.
         *
         * @returns {PdfFileStructure} The internal structure of the PDF document.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the internal file structure of the PDF document
         * let fileStructure: PdfFileStructure = document.fileStructure;
         * // Get the cross reference type
         * let type: PdfCrossReferenceType = fileStructure.crossReferenceType;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._fileStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocument.prototype, "layers", {
        /**
         * Gets the collection of `PdfLayer` from the document.
         *
         * @returns {PdfLayerCollection} Layer collection.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (!this._layers) {
                this._layers = new PdfLayerCollection(this);
            }
            return this._layers;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the `PdfPage` at the specified index.
     *
     * @param {number} pageIndex Page index.
     * @returns {PdfPage} PDF page at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfDocument.prototype.getPage = function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.pageCount) {
            throw new Error('Invalid page index');
        }
        var cachedPage = this._pages.get(pageIndex);
        if (cachedPage) {
            return cachedPage;
        }
        var _a = this, _catalog = _a._catalog, _linearization = _a._linearization;
        var promise;
        if (_linearization && _linearization.isValid && _linearization.pageFirst === pageIndex) {
            promise = this._getLinearizationPage(pageIndex);
        }
        else {
            promise = _catalog.getPageDictionary(pageIndex);
        }
        var page = new PdfPage(this._crossReference, pageIndex, promise.dictionary, promise.reference);
        this._pages.set(pageIndex, page);
        return page;
    };
    PdfDocument.prototype.addPage = function (arg1, arg2) {
        var settings;
        var pageIndex;
        if (typeof arg2 !== 'undefined') {
            settings = arg2;
            pageIndex = arg1;
            this._checkPageNumber(pageIndex);
        }
        else if (typeof arg1 === 'undefined') {
            settings = new PdfPageSettings();
            pageIndex = this.pageCount;
        }
        else if (arg1 instanceof PdfPageSettings) {
            settings = arg1;
            pageIndex = this.pageCount;
        }
        else {
            settings = new PdfPageSettings();
            pageIndex = arg1;
            this._checkPageNumber(pageIndex);
        }
        var sectionDictionary = new _PdfDictionary(this._crossReference);
        sectionDictionary.update('Type', _PdfName.get('Pages'));
        sectionDictionary.update('Count', 1);
        _updatePageSettings(sectionDictionary, settings);
        var sectionReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(sectionReference, sectionDictionary);
        sectionDictionary.objId = sectionReference.toString();
        var pageDictionary = new _PdfDictionary(this._crossReference);
        pageDictionary.update('Type', _PdfName.get('Page'));
        var pageReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pageReference, pageDictionary);
        pageDictionary.objId = pageReference.toString();
        pageDictionary.update('Parent', sectionReference);
        sectionDictionary.update('Kids', [pageReference]);
        if (this.pageCount === 0) {
            var parentReference = this._catalog._catalogDictionary._get('Pages');
            if (parentReference && this._catalog._topPagesDictionary) {
                var isUpdated = false;
                if (this._catalog._topPagesDictionary.has('Kids')) {
                    var kids = this._catalog._topPagesDictionary.get('Kids');
                    if (kids) {
                        kids.push(sectionReference);
                        this._catalog._topPagesDictionary.update('Kids', kids);
                        isUpdated = true;
                    }
                }
                if (!isUpdated) {
                    this._catalog._topPagesDictionary.update('Kids', [sectionReference]);
                }
                this._catalog._topPagesDictionary.update('Count', 1);
                sectionDictionary.update('Parent', parentReference);
            }
            else {
                this._catalog._catalogDictionary.update('Pages', sectionReference);
            }
            this._pages = new Map();
            this._pageCount = 1;
        }
        else {
            var lastPage_1 = this.getPage(pageIndex === this.pageCount ? (pageIndex - 1) : pageIndex);
            if (lastPage_1 && lastPage_1._pageDictionary) {
                var parentReference = lastPage_1._pageDictionary._get('Parent');
                var parentDictionary = this._crossReference._fetch(parentReference);
                if (parentDictionary && parentDictionary.has('Kids')) {
                    var kids = parentDictionary.get('Kids');
                    if (kids) {
                        if (pageIndex === this.pageCount) {
                            kids.push(sectionReference);
                        }
                        else {
                            var newKids_1 = [];
                            kids.forEach(function (entry) {
                                if (entry === lastPage_1._ref) {
                                    newKids_1.push(sectionReference);
                                }
                                newKids_1.push(entry);
                            });
                            kids = newKids_1;
                            this._updatePageCache(pageIndex);
                        }
                        parentDictionary.update('Kids', kids);
                        sectionDictionary.update('Parent', parentReference);
                        _updatePageCount(parentDictionary, 1);
                        this._pageCount = this.pageCount + 1;
                    }
                }
            }
        }
        var result = new PdfPage(this._crossReference, pageIndex, pageDictionary, pageReference);
        result._pageSettings = settings;
        result._isNew = true;
        this._pages.set(pageIndex, result);
        return result;
    };
    PdfDocument.prototype.addSection = function (settings) {
        var result;
        if (!this._isLoaded) {
            var pageSettings = settings ? settings : new PdfPageSettings();
            result = new PdfSection(this, pageSettings);
        }
        return result;
    };
    PdfDocument.prototype.removePage = function (argument) {
        var targetPage = (argument instanceof PdfPage) ? argument : this.getPage(argument);
        this._removePage(targetPage);
    };
    PdfDocument.prototype._checkPageNumber = function (index) {
        if (index < 0 || index > this.pageCount) {
            throw new Error('Index out of range');
        }
    };
    PdfDocument.prototype._updatePageCache = function (index, isIncrement) {
        if (isIncrement === void 0) { isIncrement = true; }
        var updatedData = new Map();
        for (var i = this.pageCount - 1; i >= 0; i--) {
            var page = this.getPage(i);
            if (isIncrement) {
                if (i >= index) {
                    updatedData.set(i + 1, page);
                    page._pageIndex = i + 1;
                }
                else {
                    updatedData.set(i, page);
                }
            }
            else {
                if (i > index) {
                    updatedData.set(i - 1, page);
                    page._pageIndex = i - 1;
                }
                else if (i !== index) {
                    updatedData.set(i, page);
                }
            }
        }
        this._pages = updatedData;
        if (!isIncrement) {
            this._pageCount = this._pages.size;
        }
    };
    PdfDocument.prototype._removePage = function (pageToRemove) {
        var bookMarkMap = this._parseBookmarkDestination();
        if (bookMarkMap && bookMarkMap.has(pageToRemove)) {
            var bookmarks = bookMarkMap.get(pageToRemove);
            if (bookmarks) {
                for (var i = 0; i < bookmarks.length; i++) {
                    var bookmark = bookmarks[Number.parseInt(i.toString(), 10)];
                    if (bookmark) {
                        var bookmarkDictionary = bookmark._dictionary;
                        if (bookmarkDictionary) {
                            if (bookmarkDictionary.has('A')) {
                                bookmarkDictionary.update('A', null);
                            }
                            bookmarkDictionary.update('Dest', null);
                        }
                    }
                }
            }
        }
        this._removePageTemplates(pageToRemove);
        for (var i = this.form.count - 1; i >= 0; --i) {
            var field = this.form.fieldAt(i);
            if (field && field.page === pageToRemove) {
                this.form.removeFieldAt(i);
            }
        }
        this._updatePageCache(pageToRemove._pageIndex, false);
        this._removeParent(pageToRemove._ref, pageToRemove._pageDictionary);
        if (this._crossReference._cacheMap.has(pageToRemove._ref)) {
            pageToRemove._pageDictionary._updated = false;
        }
        if (this.pageCount === 0) {
            this._catalog._topPagesDictionary.update('Kids', []);
        }
    };
    PdfDocument.prototype._removeParent = function (referenceToRemove, dictionary) {
        if (dictionary.has('Parent')) {
            var parentReference = dictionary._get('Parent');
            var parentDictionary = this._crossReference._fetch(parentReference);
            if (parentDictionary && parentDictionary.has('Kids')) {
                var kids = parentDictionary.get('Kids');
                if (_isNullOrUndefined(kids) && kids.length === 1 && parentDictionary && parentDictionary.get('Type').name === 'Pages') {
                    this._removeParent(parentReference, parentDictionary);
                }
                else {
                    kids = kids.filter(function (item) { return item !== referenceToRemove; });
                    parentDictionary.update('Kids', kids);
                    _updatePageCount(parentDictionary, -1);
                }
            }
        }
    };
    PdfDocument.prototype._parseBookmarkDestination = function () {
        var current = this.bookmarks;
        if (typeof this._bookmarkHashTable === 'undefined' && current) {
            this._bookmarkHashTable = new Map();
            var stack = [];
            var nodeInformation = { index: 0, kids: current._bookMarkList };
            do {
                for (; nodeInformation.index < nodeInformation.kids.length;) {
                    current = nodeInformation.kids[nodeInformation.index];
                    var namedDestination = current.namedDestination;
                    if (namedDestination) {
                        if (namedDestination.destination) {
                            var page = namedDestination.destination.page;
                            var list = this._bookmarkHashTable.get(page);
                            if (!list) {
                                list = [];
                            }
                            list.push(current);
                            this._bookmarkHashTable.set(page, list);
                        }
                    }
                    else {
                        var destination = current.destination;
                        if (destination) {
                            var page = destination.page;
                            var list = this._bookmarkHashTable.get(page);
                            if (!list) {
                                list = [];
                            }
                            list.push(current);
                            this._bookmarkHashTable.set(page, list);
                        }
                    }
                    nodeInformation.index += 1;
                    if (current.count > 0) {
                        stack.push(nodeInformation);
                        nodeInformation = { index: 0, kids: current._bookMarkList };
                        continue;
                    }
                }
                if (stack.length > 0) {
                    nodeInformation = stack.pop();
                    while (nodeInformation.index === nodeInformation.kids.length && stack.length > 0) {
                        nodeInformation = stack.pop();
                    }
                }
            } while (nodeInformation.index < nodeInformation.kids.length);
        }
        return this._bookmarkHashTable;
    };
    PdfDocument.prototype._removePageTemplates = function (page) {
        var dictionary;
        if (this._catalog._catalogDictionary.has('Names')) {
            dictionary = this._catalog._catalogDictionary.get('Names');
            if (dictionary) {
                this._removeInternalTemplates(dictionary, 'Pages', page);
                this._removeInternalTemplates(dictionary, 'Templates', page);
            }
        }
    };
    PdfDocument.prototype._removeInternalTemplates = function (dictionary, key, page) {
        if (dictionary.has(key)) {
            var namedObject = dictionary.get(key);
            if (namedObject && namedObject.has('Names')) {
                var nameCollection = namedObject.getArray('Names');
                if (nameCollection && nameCollection.length > 0) {
                    var namedPageCollection = this._getUpdatedPageTemplates(nameCollection, page);
                    var namedPageDictionary = new _PdfDictionary(this._crossReference);
                    namedPageDictionary.update('Names', namedPageCollection);
                    var reference = this._crossReference._getNextReference();
                    this._crossReference._cacheMap.set(reference, namedPageDictionary);
                    namedPageDictionary.objId = reference.toString();
                    dictionary.update(key, reference);
                }
            }
        }
    };
    PdfDocument.prototype._getUpdatedPageTemplates = function (namedPages, page) {
        if (namedPages.length > 0) {
            for (var i = 1; i <= namedPages.length; i = i + 2) {
                var pageDictionary = namedPages[Number.parseInt(i.toString(), 10)];
                if (pageDictionary && page._pageDictionary === pageDictionary) {
                    namedPages.pop();
                    namedPages.pop();
                    return namedPages;
                }
            }
        }
        return namedPages;
    };
    /**
     * Reorders the pages in the PDF document.
     *
     * @param {number[]} orderArray The page sequence to arrange the pages.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Reorders the pages in the PDF document
     * document.reorderPages([3, 2, 1]);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfDocument.prototype.reorderPages = function (orderArray) {
        var _this = this;
        orderArray.forEach(function (pageNumber) {
            _this._checkPageNumber(pageNumber);
        });
        var sortedArray = this._sortedArray(orderArray);
        var ascendingOrder = orderArray.slice().sort(function (a, b) { return a - b; });
        var inputArray = Array.from({ length: this.pageCount }, function (_, i) { return i; });
        var pagesToRemove = inputArray.filter(function (element) { return sortedArray.indexOf(element) === -1; });
        for (var i = pagesToRemove.length - 1; i >= 0; i--) {
            this.removePage(pagesToRemove[Number.parseInt(i.toString(), 10)]);
        }
        var newkids = [];
        var newPages = new Map();
        var parentReference = this._catalog._catalogDictionary._get('Pages');
        var _loop_1 = function (i) {
            var indexPage = this_1.getPage(ascendingOrder.indexOf(sortedArray[Number.parseInt(i.toString(), 10)]));
            indexPage._pageIndex = i;
            newPages.set(i, indexPage);
            var sectionDictionary = new _PdfDictionary(this_1._crossReference);
            sectionDictionary.update('Type', _PdfName.get('Pages'));
            sectionDictionary.update('Count', 1);
            sectionDictionary.update('Parent', parentReference);
            var sectionReference = this_1._crossReference._getNextReference();
            sectionDictionary.objId = sectionReference.toString();
            sectionDictionary.update('Kids', [indexPage._ref]);
            newkids.push(sectionReference);
            var parentDictionary = indexPage._pageDictionary.get('Parent');
            while (parentDictionary && parentDictionary.get('Type').name === 'Pages') {
                parentDictionary.forEach(function (key, value) {
                    switch (key) {
                        case 'Parent':
                        case 'Kids':
                        case 'Type':
                        case 'Count':
                            break;
                        case 'Resources':
                            _this._cloneResources(parentDictionary.get('Resources'), sectionDictionary);
                            break;
                        default:
                            if (!sectionDictionary.has(key)) {
                                sectionDictionary.update(key, value);
                            }
                            break;
                    }
                });
                if (parentDictionary.has('Parent')) {
                    parentDictionary = parentDictionary.get('Parent');
                }
                else {
                    break;
                }
            }
            this_1._crossReference._cacheMap.set(sectionReference, sectionDictionary);
            var pageSection = this_1._crossReference._fetch(indexPage._ref);
            pageSection.update('Parent', sectionReference);
        };
        var this_1 = this;
        for (var i = 0; i < sortedArray.length; i++) {
            _loop_1(i);
        }
        this._pages = newPages;
        if (this._catalog) {
            var parentDictionary = this._catalog._topPagesDictionary;
            if (parentDictionary && parentDictionary.has('Kids')) {
                var kids = parentDictionary.get('Kids');
                kids = newkids;
                parentDictionary.update('Kids', kids);
            }
        }
    };
    PdfDocument.prototype._sortedArray = function (order) {
        var sortedArray = [];
        order.forEach(function (num) {
            if (sortedArray.indexOf(num) === -1) {
                sortedArray.push(num);
            }
        });
        return sortedArray;
    };
    PdfDocument.prototype._cloneResources = function (source, target) {
        var _this = this;
        if (!target.has('Resources')) {
            target.update('Resources', source);
        }
        else {
            var resourceDictionary_1 = target.get('Resources');
            source.forEach(function (key, value) {
                if (resourceDictionary_1.has(key)) {
                    _this._cloneInnerResources(key, value, resourceDictionary_1);
                }
                else {
                    resourceDictionary_1.update(key, value);
                }
            });
        }
    };
    PdfDocument.prototype._cloneInnerResources = function (key, value, resourceDictionary) {
        if (value instanceof _PdfDictionary) {
            var oldObject_1 = resourceDictionary.get(key);
            if (oldObject_1) {
                var hasNew_1 = false;
                oldObject_1.forEach(function (innerKey, innerValue) {
                    if (!oldObject_1.has(innerKey)) {
                        oldObject_1.update(innerKey, innerValue);
                        hasNew_1 = true;
                    }
                });
                if (hasNew_1) {
                    resourceDictionary._updated = true;
                }
            }
            else {
                resourceDictionary.update(key, value);
            }
        }
        else if (Array.isArray(value)) {
            var oldArray_1 = resourceDictionary.get(key); // eslint-disable-line
            if (oldArray_1) {
                var hasNew_2 = false;
                value.forEach(function (entry) {
                    if (oldArray_1.indexOf(entry) === -1) {
                        oldArray_1.push(entry);
                        hasNew_2 = true;
                    }
                });
                if (hasNew_2) {
                    resourceDictionary._updated = true;
                }
            }
            else {
                resourceDictionary.update(key, value);
            }
        }
    };
    PdfDocument.prototype.save = function (filename) {
        if (!this._isLoaded && this.pageCount === 0) {
            this.addSection().addPage();
        }
        this._doPostProcess(this._flatten);
        if (typeof filename === 'string') {
            Save.save(filename, new Blob([this._crossReference._save()], { type: 'application/pdf' }));
        }
        else {
            return this._crossReference._save();
        }
    };
    /**
     * Saves the document to the specified output stream and return the stream as Blob.
     *
     * @returns {Promise<{ blobData: Blob }>} Saved PDF data as `Blob`.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Save the document
     * let data: Promise<{ blobData: Blob }> = document.saveAsBlob();
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfDocument.prototype.saveAsBlob = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var obj = { blobData: new Blob([_this._crossReference._save()], { type: 'application/pdf' }) };
            resolve(obj);
        });
    };
    PdfDocument.prototype.exportAnnotations = function (arg1, arg2) {
        this._isExport = true;
        this._doPostProcessOnAnnotations();
        var helper;
        var settings;
        if (arg1 && arg1 instanceof PdfAnnotationExportSettings) {
            settings = arg1;
        }
        else if (arg2 && arg2 instanceof PdfAnnotationExportSettings) {
            settings = arg2;
        }
        if (settings) {
            if (settings.dataFormat === DataFormat.xfdf) {
                helper = new _XfdfDocument();
            }
            else if (settings.dataFormat === DataFormat.json) {
                helper = new _JsonDocument();
            }
            else if (settings.dataFormat === DataFormat.fdf) {
                helper = new _FdfDocument();
            }
            else {
                return undefined;
            }
            helper.exportAppearance = settings.exportAppearance;
        }
        else {
            helper = new _XfdfDocument();
        }
        var result = helper._exportAnnotations(this);
        if (arg1 && typeof arg1 === 'string') {
            Save.save(arg1, new Blob([result], { type: 'text/plain' }));
        }
        else {
            return result;
        }
    };
    PdfDocument.prototype.exportFormData = function (arg1, arg2) {
        this._doPostProcessOnFormFields();
        var helper;
        var settings;
        if (arg1 && arg1 instanceof PdfFormFieldExportSettings) {
            settings = arg1;
        }
        else if (arg2 && arg2 instanceof PdfFormFieldExportSettings) {
            settings = arg2;
        }
        if (settings) {
            if (settings.dataFormat === DataFormat.xfdf) {
                helper = new _XfdfDocument(settings.exportName);
            }
            else if (settings.dataFormat === DataFormat.json) {
                helper = new _JsonDocument(settings.exportName);
            }
            else if (settings.dataFormat === DataFormat.fdf) {
                helper = new _FdfDocument(settings.exportName);
            }
            else if (settings.dataFormat === DataFormat.xml) {
                helper = new _XmlDocument(settings.exportName);
            }
            else {
                return undefined;
            }
            helper._asPerSpecification = settings.asPerSpecification;
        }
        else {
            helper = new _XfdfDocument();
            helper._asPerSpecification = false;
        }
        if (arg1 && typeof arg1 === 'string') {
            Save.save(arg1, new Blob([helper._exportFormFields(this)], { type: 'text/plain' }));
        }
        else {
            return helper._exportFormFields(this);
        }
    };
    PdfDocument.prototype.importAnnotations = function (data, dataFormat) {
        if (dataFormat === DataFormat.xfdf) {
            var xfdf = new _XfdfDocument();
            xfdf._importAnnotations(this, (typeof data === 'string') ? _decode(data) : data);
        }
        else if (dataFormat === DataFormat.json) {
            var json = new _JsonDocument();
            json._importAnnotations(this, (typeof data === 'string') ? _decode(data) : data);
        }
        else if (dataFormat === DataFormat.fdf) {
            var fdf = new _FdfDocument();
            fdf._importAnnotations(this, (typeof data === 'string') ? _decode(data) : data);
        }
    };
    PdfDocument.prototype.importFormData = function (data, dataFormat) {
        if (this.form.count > 0) {
            if (dataFormat === DataFormat.xfdf) {
                var xfdf = new _XfdfDocument();
                xfdf._importFormData(this, (typeof data === 'string') ? _decode(data) : data);
            }
            else if (dataFormat === DataFormat.json) {
                var json = new _JsonDocument();
                json._importFormData(this, (typeof data === 'string') ? _decode(data) : data);
            }
            else if (dataFormat === DataFormat.fdf) {
                var fdf = new _FdfDocument();
                fdf._importFormData(this, (typeof data === 'string') ? _decode(data) : data);
            }
            else if (dataFormat === DataFormat.xml) {
                var xml = new _XmlDocument();
                xml._importFormData(this, (typeof data === 'string') ? _decode(data) : data);
            }
        }
    };
    /**
     * Disposes the current instance of `PdfDocument` class.
     *
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfDocument.prototype.destroy = function () {
        if (this._crossReference) {
            this._crossReference._destroy();
            this._crossReference = undefined;
        }
        if (this._catalog) {
            this._catalog._destroy();
            this._catalog = undefined;
        }
        this._endObjSignature = undefined;
        this._headerSignature = undefined;
        if (this._pages && this._pages.size > 0) {
            this._pages.forEach(function (value) {
                value._destroy();
            });
        }
        if (this._pages) {
            this._pages.clear();
            this._pages = undefined;
        }
        this._startXrefSignature = undefined;
        this._stream = undefined;
        this._form = undefined;
        _clearPrimitiveCaches();
        if (this._mergeHelperCache) {
            if (this._mergeHelperCache.size > 0) {
                this._mergeHelperCache.forEach(function (value) {
                    if (value) {
                        value._objectDispose();
                    }
                });
            }
            this._mergeHelperCache.clear();
            this._mergeHelperCache = undefined;
        }
    };
    Object.defineProperty(PdfDocument.prototype, "_destinationCollection", {
        get: function () {
            if (this._namedDestinationCollection === null || typeof this._namedDestinationCollection === 'undefined') {
                if (this._catalog._catalogDictionary.has('Names')) {
                    var names = this._catalog._catalogDictionary.get('Names');
                    this._namedDestinationCollection = new _PdfNamedDestinationCollection(names, this._crossReference);
                }
                else {
                    this._namedDestinationCollection = new _PdfNamedDestinationCollection();
                }
            }
            return this._namedDestinationCollection;
        },
        enumerable: true,
        configurable: true
    });
    PdfDocument.prototype._getLinearizationPage = function (pageIndex) {
        var _a = this, _catalog = _a._catalog, _linearization = _a._linearization, _crossReference = _a._crossReference;
        var ref = _PdfReference.get(_linearization.objectNumberFirst, 0);
        try {
            var obj = _crossReference._fetch(ref); // eslint-disable-line
            if (obj instanceof _PdfDictionary) {
                var type = obj.get('Type');
                if (_isName(type, 'Page') || (!obj.has('Type') && !obj.has('Kids'))) {
                    if (!_catalog.pageKidsCountCache.has(ref)) {
                        _catalog.pageKidsCountCache.put(ref, 1);
                    }
                    if (!_catalog.pageIndexCache.has(ref)) {
                        _catalog.pageIndexCache.put(ref, 0);
                    }
                    return { dictionary: obj, reference: ref };
                }
            }
            throw new FormatError('The Linearization dictionary does not point to a valid Page dictionary.');
        }
        catch (reason) {
            return _catalog.getPageDictionary(pageIndex);
        }
    };
    PdfDocument.prototype._checkHeader = function () {
        var stream = this._stream;
        stream.reset();
        if (!this._find(stream, this._headerSignature)) {
            return;
        }
        stream.moveStart();
        var version = '';
        var ch = stream.getByte();
        while (ch > 0x20) {
            if (version.length >= 12) {
                break;
            }
            version += String.fromCharCode(ch);
            ch = stream.getByte();
        }
        if (!this._version) {
            this._version = version.substring(5);
        }
    };
    PdfDocument.prototype._parse = function (recoveryMode) {
        this._crossReference._parse(recoveryMode);
        this._catalog = new _PdfCatalog(this._crossReference);
        if (this._catalog.version) {
            this._version = this._catalog.version;
        }
    };
    PdfDocument.prototype._find = function (stream, signature, limit, backwards) {
        if (limit === void 0) { limit = 1024; }
        if (backwards === void 0) { backwards = false; }
        var signatureLength = signature.length;
        var scanBytes = stream.peekBytes(limit);
        var scanLength = scanBytes.length - signatureLength;
        if (scanLength <= 0) {
            return false;
        }
        if (backwards) {
            var signatureEnd = signatureLength - 1;
            var position = scanBytes.length - 1;
            while (position >= signatureEnd) {
                var j = 0;
                while (j < signatureLength && scanBytes[position - j] === signature[signatureEnd - j]) {
                    j++;
                }
                if (j >= signatureLength) {
                    stream.position += position - signatureEnd;
                    return true;
                }
                position--;
            }
        }
        else {
            var position = 0;
            while (position <= scanLength) {
                var j = 0;
                while (j < signatureLength && scanBytes[position + j] === signature[j]) { // eslint-disable-line
                    j++;
                }
                if (j >= signatureLength) {
                    stream.position += position;
                    return true;
                }
                position++;
            }
        }
        return false;
    };
    PdfDocument.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        this._doPostProcessOnFormFields(isFlatten);
        this._doPostProcessOnAnnotations(isFlatten);
    };
    PdfDocument.prototype._doPostProcessOnFormFields = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        if (this._catalog._catalogDictionary.has('AcroForm')) {
            this.form._doPostProcess(isFlatten);
            if (isFlatten) {
                var formObject = this._catalog._catalogDictionary.getRaw('AcroForm');
                var dictionary = new _PdfDictionary(this._crossReference);
                dictionary._updated = true;
                if (formObject instanceof _PdfReference) {
                    this._crossReference._cacheMap.set(formObject, dictionary);
                }
                else {
                    this.form._dictionary = dictionary;
                    this._crossReference._allowCatalog = true;
                }
                this.form._clear();
            }
            if (this.form._isDefaultAppearance) {
                this.form._dictionary.update('NeedAppearances', this.form._isDefaultAppearance);
            }
            else if (!this.form._isDefaultAppearance && this.form._dictionary.has('NeedAppearances') && this.form._isNeedAppearances) {
                this.form._dictionary.update('NeedAppearances', false);
            }
            else if (!this.form._isDefaultAppearance && this.form._dictionary.has('NeedAppearances')) {
                this.form._dictionary.update('NeedAppearances', this.form.needAppearances);
            }
        }
    };
    PdfDocument.prototype._doPostProcessOnAnnotations = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        for (var i = 0; i < this.pageCount; i++) {
            var page = this.getPage(i);
            page.annotations._isExport = this._isExport;
            page.annotations._doPostProcess(isFlatten);
            if (isFlatten) {
                if (page._pageDictionary.has('Annots')) {
                    delete page._pageDictionary._map.Annots;
                    page._pageDictionary._updated = true;
                }
                page.annotations._clear();
            }
        }
    };
    PdfDocument.prototype._addWatermarkText = function () {
        if (this.pageCount > 0) {
            for (var index = 0; index < this._pageCount; index++) {
                var page = this.getPage(index);
                if (page) {
                    try {
                        var graphics = page.graphics;
                        graphics.save();
                        graphics.setTransparency(0.20);
                        graphics.drawRectangle(0, 0, page.size[0], 33.75, new PdfBrush([255, 255, 255]));
                        graphics.restore();
                        graphics.save();
                        graphics.setTransparency(0.50);
                        var font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.regular);
                        var format = new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle);
                        graphics.drawString('Created with a trial version of Syncfusion Essential PDF', font, [0, 0, page.size[0], 33.75], null, new PdfBrush([0, 0, 0]), format);
                        graphics.restore();
                    }
                    catch (e) { } // eslint-disable-line
                }
            }
        }
    };
    PdfDocument.prototype.importPageRange = function (sourceDocument, startIndex, endIndex, options) {
        if (startIndex > endIndex || startIndex >= sourceDocument.pageCount) {
            throw new Error('The start index is greater then the end index, which might indicate the error in the program.');
        }
        this._importPages(sourceDocument, startIndex, endIndex, options);
    };
    PdfDocument.prototype._importPages = function (sourceDocument, startIndex, endIndex, options) {
        var sourceOCProperties;
        var correspondancePagecount = 0;
        var ocProperties;
        if (typeof options !== 'undefined' && typeof options.targetIndex === 'number') {
            if (options.targetIndex > this.pageCount) {
                throw new Error('The target index is out of range.');
            }
            this._targetIndex = options.targetIndex;
        }
        var pageReference = new Map();
        if (!this._isDuplicatePage) {
            for (var index = 0; index < sourceDocument.pageCount; index++) {
                var sourcepage = sourceDocument.getPage(index);
                pageReference.set(sourcepage._pageDictionary, null);
            }
        }
        var helper;
        if (!this._mergeHelperCache) {
            this._mergeHelperCache = new Map();
        }
        if (!sourceDocument._uniqueID) {
            sourceDocument._uniqueID = _getNewGuidString();
        }
        if (this._mergeHelperCache.has(sourceDocument._uniqueID)) {
            helper = this._mergeHelperCache.get(sourceDocument._uniqueID);
        }
        else {
            helper = new _PdfMergeHelper(this._crossReference, this, sourceDocument, pageReference, options);
            this._mergeHelperCache.set(sourceDocument._uniqueID, helper);
        }
        var isLayersPresent = false;
        if ((!this._isDuplicatePage && sourceDocument._catalog._catalogDictionary.has('OCProperties')) || (typeof options !== 'undefined' && !options.optimizeResources)) {
            isLayersPresent = true;
            sourceOCProperties = sourceDocument._catalog._catalogDictionary.get('OCProperties');
            ocProperties = new _PdfDictionary(this._crossReference);
            helper._writeObject(sourceDocument, ocProperties, sourceOCProperties, sourceOCProperties, 'OCProperties', null, null);
            ocProperties._updated = true;
        }
        for (var i = startIndex; i <= endIndex; i++) {
            var page = sourceDocument.getPage(i);
            sourceDocument.form._doPostProcess(sourceDocument.flatten, page);
            if (page.annotations.count > 0) {
                page.annotations._doPostProcess(sourceDocument.flatten);
                if (sourceDocument.flatten) {
                    if (page._pageDictionary.has('Annots')) {
                        delete page._pageDictionary._map.Annots;
                        page._pageDictionary._updated = true;
                    }
                    page.annotations._clear();
                }
            }
            if (sourceDocument._isSplitDocument) {
                helper._importPages(page, this._targetIndex, isLayersPresent, this._isDuplicatePage, options, sourceDocument._isSplitDocument);
            }
            else {
                helper._importPages(page, this._targetIndex, isLayersPresent, this._isDuplicatePage, options);
            }
            correspondancePagecount++;
            if (typeof this._targetIndex === 'number') {
                ++this._targetIndex;
            }
        }
        if (!this._isDuplicatePage) {
            helper._fixDestinations(sourceDocument);
        }
        helper._exportBookmarks(sourceDocument, correspondancePagecount);
        helper._mergeFormFieldsWithDocument();
        if ((isLayersPresent && !this._isDuplicatePage) || (typeof options !== 'undefined' && !options.optimizeResources)) {
            helper._importLayers(ocProperties, true);
        }
        helper._objectDispose();
        this._isDuplicatePage = false;
    };
    PdfDocument.prototype.importPage = function (arg1, arg2, options) {
        if (typeof arg1 === 'number') {
            this._isDuplicatePage = true;
            if (arg2 instanceof PdfPageImportOptions) {
                this._importPages(this, arg1, arg1, arg2);
            }
            else {
                this._importPages(this, arg1, arg1);
            }
        }
        else if (arg1 instanceof PdfPage && arg2 instanceof PdfDocument) {
            var index = arg1._pageIndex;
            this.importPageRange(arg2, index, index, options);
        }
    };
    /**
     * Splitting a PDF file into individual pages.
     *
     * @returns {void} Nothing
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document into individual pages
     * document.split();
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    PdfDocument.prototype.split = function () {
        this.splitByFixedNumber(1);
    };
    /**
     * Splits the PDF document into parts, each containing a maximum number of pages specified.
     *
     * @param {number} fixedNumber specifies the maximum number of pages in each split PDF. The default value is 1.
     * @returns {void} Nothing
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document by fixed number of pages
     * document.splitByFixedNumber(1);
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    PdfDocument.prototype.splitByFixedNumber = function (fixedNumber) {
        var pageCount = this.pageCount;
        if (this.splitEvent && pageCount >= fixedNumber && fixedNumber > 0) {
            var splitIndex = 0;
            for (var tempValue = 0; tempValue < pageCount; tempValue += fixedNumber) {
                var endIndex = Math.min(tempValue + fixedNumber - 1, pageCount - 1);
                var pdfData = this._importDocumentPages(tempValue, endIndex);
                this._invokeSplitEvent(splitIndex, pdfData);
                splitIndex++;
            }
        }
        else {
            throw new Error('Invalid split number. Split number should be greater than zero and less than or equal to page count.');
        }
    };
    /**
     * Splits the PDF document into multiple parts based on the specified page ranges.
     *
     * @param {Array<number[]>} ranges The two dimensional number array specified for start and end page indexes to split PDF documents.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document by page ranges specified
     * document.splitByPageRanges([[0, 4], [5, 9]]);
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    PdfDocument.prototype.splitByPageRanges = function (ranges) {
        var pageCount = this.pageCount;
        if (this.splitEvent) {
            var splitIndex = 0;
            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[Number.parseInt(i.toString(), 10)];
                if (Array.isArray(range) && range.length < 2) {
                    throw new Error('Invalid page range. Start and end page indexes should be specified.');
                }
                var start = range[0];
                var end = range[1];
                if (start < 0 || end < 0 || start >= pageCount || end >= pageCount || start > end) {
                    throw new Error('Invalid page range: start (${start}) and end (${end}).');
                }
                var pdfData = this._importDocumentPages(start, end);
                this._invokeSplitEvent(splitIndex, pdfData);
                splitIndex++;
            }
        }
    };
    PdfDocument.prototype._importDocumentPages = function (startIndex, endIndex) {
        this._isSplitDocument = true;
        var document = new PdfDocument();
        for (var i = startIndex; i <= endIndex; i++) {
            var page = this.getPage(i);
            document.importPage(page, this);
        }
        var result = document.save();
        document.destroy();
        return result;
    };
    PdfDocument.prototype._invokeSplitEvent = function (splitIndex, pdfData) {
        var args = new PdfDocumentSplitEventArgs(splitIndex, pdfData);
        this.splitEvent(this, args);
    };
    return PdfDocument;
}());
export { PdfDocument };
/**
 * Represents annotation export settings.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Sets export data format as JSON type to annotation export settings
 * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
 * // Set the data format defined in annotation export settings
 * settings.dataFormat = DataFormat.json;
 * // Export annotations to JSON format
 * let json: Uint8Array = document.exportAnnotations(settings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfAnnotationExportSettings = /** @class */ (function () {
    function PdfAnnotationExportSettings() {
        this._format = DataFormat.xfdf;
        this._exportAppearance = false;
    }
    Object.defineProperty(PdfAnnotationExportSettings.prototype, "dataFormat", {
        /**
         * Gets the data format defined in annotation export settings.
         *
         * @returns {DataFormat} - Returns the data format.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Sets export data format as JSON type to annotation export settings
         * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
         * // Export annotations to JSON format
         * let json: Uint8Array = document.exportAnnotations(settings);
         * // Get the data format defined in annotation export settings
         * let dataFormat: DataFormat = settings.dataFormat;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._format;
        },
        /**
         * Sets the data format defined in annotation export settings.
         *
         * @param {DataFormat} format - Specifies the data format.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Sets export data format as JSON type to annotation export settings
         * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
         * // Set the data format defined in annotation export settings
         * settings.dataFormat = DataFormat.json;
         * // Export annotations to JSON format
         * let json: Uint8Array = document.exportAnnotations(settings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (format) {
            this._format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfAnnotationExportSettings.prototype, "exportAppearance", {
        /**
         * Gets the boolean value indicating whether the appearance of a particular object can be exported or not.
         *
         * @returns {boolean} - Returns the boolean value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Sets the annotation export settings with enabled export appearance.
         * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
         * // Export annotations to XFDF format
         * let xfdf: Uint8Array = document.exportAnnotations(settings);
         * // Get the boolean value indicating whether the appearance of a particular object can be exported or not
         * let appearance: boolean = settings.exportAppearance;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._exportAppearance;
        },
        /**
         * Sets the boolean value indicating whether the appearance of a particular object can be exported or not.
         *
         * @param {boolean} value - The boolean value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Sets the annotation export settings with enabled export appearance.
         * let settings: PdfAnnotationExportSettings = new PdfAnnotationExportSettings();
         * // Set the boolean value indicating whether the appearance of a particular object can be exported or not
         * settings.exportAppearance = true;
         * // Export annotations to XFDF format
         * let xfdf: Uint8Array = document.exportAnnotations(settings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._exportAppearance = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfAnnotationExportSettings;
}());
export { PdfAnnotationExportSettings };
/**
 * Represents form fields export settings.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Sets the form field data export settings with output data format.
 * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
 * // Set the data format defined in form field export settings.
 * settings.dataFormat = DataFormat.json;
 * // Export form field to JSON format
 * let json: Uint8Array = document.exportFormData(settings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfFormFieldExportSettings = /** @class */ (function () {
    function PdfFormFieldExportSettings() {
        this._format = DataFormat.xfdf;
        this._exportName = '';
        this._asPerSpecification = true;
    }
    Object.defineProperty(PdfFormFieldExportSettings.prototype, "dataFormat", {
        /**
         * Gets the data format defined in form field export settings.
         *
         * @returns {DataFormat} - Returns the data format.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Sets the form field data export settings with output data format.
         * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
         * // Export form field to JSON format
         * let json: Uint8Array = document.exportFormData(settings);
         * // Get the data format defined in form field export settings
         * let dataFormat: DataFormat = settings.dataFormat;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._format;
        },
        /**
         * Sets the data format defined in form field export settings.
         *
         * @param {DataFormat} format - Specifies the data format.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Sets the form field data export settings with output data format.
         * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
         * // Set the data format defined in form field export settings.
         * settings.dataFormat = DataFormat.json;
         * // Export form field to JSON format
         * let json: Uint8Array = document.exportFormData(settings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (format) {
            this._format = format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFormFieldExportSettings.prototype, "exportName", {
        /**
         * Gets the export name defined in form field export settings.
         *
         * @returns {string} - Returns the string value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Sets the form field data export settings with export name.
         * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
         * // Export form field to JSON format
         * let json: Uint8Array = document.exportFormData(settings);
         * // Get the export name defined in form field export settings
         * let name: boolean = settings.exportName;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._exportName;
        },
        /**
         * Sets the export name defined in form field export settings.
         *
         * @param {string} name - Specifies the export name of the form.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Sets the form field data export settings with export name.
         * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
         * // Set the export name defined in form field export settings.
         * settings.exportName = ‘JobApplication’.
         * // Export form field to JSON format
         * let json: Uint8Array = document.exportFormData(settings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (name) {
            this._exportName = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfFormFieldExportSettings.prototype, "asPerSpecification", {
        /**
         * Gets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
         *
         * @returns {boolean} - Returns the boolean value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Sets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
         * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
         * // Export form field to JSON format
         * let json: Uint8Array = document.exportFormData(settings);
         * // Get the boolean value indicating whether the data in a form field can be exported based on a certain specification.
         * let asPerSpecification: boolean = settings.asPerSpecification;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._asPerSpecification;
        },
        /**
         * Sets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
         *
         * @param {boolean} value - The boolean value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Sets the boolean value indicating whether the data in a form field can be exported based on a certain specification.
         * let settings: PdfFormFieldExportSettings = new PdfFormFieldExportSettings();
         * // Set the boolean value indicating whether the data in a form field can be exported based on a certain specification.
         * settings.asPerSpecification = true;
         * // Export form field to JSON format
         * let json: Uint8Array = document.exportFormData(settings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._asPerSpecification = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfFormFieldExportSettings;
}());
export { PdfFormFieldExportSettings };
/**
 * The class provides various settings related to PDF pages.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Create a new PDF page settings instance
 * let pageSettings: PdfPageSettings = new PdfPageSettings();
 * // Sets the margins
 * pageSettings.margins = new PdfMargins(40);
 * // Sets the page size
 * pageSettings.size = [595, 842];
 * // Sets the page orientation
 * pageSettings.orientation = PdfPageOrientation.landscape;
 * // Add a new PDF page with page settings
 * page = document.addPage(pageSettings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfPageSettings = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfPageSettings` class
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Create a new PDF page settings instance
     * let pageSettings: PdfPageSettings = new PdfPageSettings();
     * // Sets the margins
     * pageSettings.margins = new PdfMargins(40);
     * // Sets the page size
     * pageSettings.size = [595, 842];
     * // Sets the page orientation
     * pageSettings.orientation = PdfPageOrientation.landscape;
     * // Add a new PDF page with page settings
     * page = document.addPage(pageSettings);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    function PdfPageSettings() {
        this._size = [595, 842];
        this._isOrientation = false;
        this._orientation = PdfPageOrientation.portrait;
        this._size = [595, 842];
        this._margins = new PdfMargins();
        this._rotation = PdfRotationAngle.angle0;
    }
    Object.defineProperty(PdfPageSettings.prototype, "orientation", {
        /**
         * Gets the orientation of the page.
         *
         * @returns {PdfPageOrientation} The orientation.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the page size
         * pageSettings.size = [842, 595];
         * // Gets the page orientation
         * let orientation: PdfPageOrientation = pageSettings.orientation;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._orientation;
        },
        /**
         * Sets the orientation of the page.
         *
         * @param {PdfPageOrientation} value The orientation.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the page orientation
         * pageSettings.orientation = PdfPageOrientation.landscape;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._isOrientation = true;
            if (this._orientation !== value) {
                this._orientation = value;
                this._updateSize(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfPageSettings.prototype, "size", {
        /**
         * Gets the size of the page.
         *
         * @returns {number[]} The width and height of the page as number array.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the width and height of the PDF page as number array
         * let size: number[] = page.size;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._size;
        },
        /**
         * Sets the width and height of the page.
         *
         * @param {number[]} value The width and height of the page as number array.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the page size
         * pageSettings.size = [595, 842];
         * // Sets the page orientation
         * pageSettings.orientation = PdfPageOrientation.landscape;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._isOrientation) {
                this._updateSize(value);
            }
            else {
                this._size = value;
                this._updateOrientation();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfPageSettings.prototype, "margins", {
        /**
         * Gets the margin value of the page.
         *
         * @returns {PdfMargins} PDF margins
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Gets the margins
         * let margins: PdfMargins = pageSettings.margins;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._margins;
        },
        /**
         * Sets the margin value of the page.
         *
         * @param {PdfMargins} value PDF margins
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the margins
         * pageSettings.margins = new PdfMargins(40);
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._margins = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfPageSettings.prototype, "rotation", {
        /**
         * Gets the rotation angle of the PDF page.
         *
         * @returns {PdfRotationAngle} PDF rotation angle
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Gets the rotation angle
         * let rotation: PdfRotationAngle = pageSettings.rotation;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._rotation;
        },
        /**
         * Sets the rotation angle of the PDF page.
         *
         * @param {PdfRotationAngle} value PDF rotation angle
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the rotation angle
         * pageSettings.rotation = PdfRotationAngle.angle90;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._rotation = value;
            if (value >= 4) {
                this._rotation = (value % 4);
            }
        },
        enumerable: true,
        configurable: true
    });
    PdfPageSettings.prototype._updateSize = function (value) {
        var pageOrientation;
        var pageSize;
        if (Array.isArray(value)) {
            pageOrientation = this.orientation;
            pageSize = value;
        }
        else {
            pageOrientation = value;
            pageSize = this._size;
        }
        if (pageOrientation === PdfPageOrientation.portrait) {
            this._size = [Math.min(pageSize[0], pageSize[1]), Math.max(pageSize[0], pageSize[1])];
        }
        else {
            this._size = [Math.max(pageSize[0], pageSize[1]), Math.min(pageSize[0], pageSize[1])];
        }
    };
    PdfPageSettings.prototype._updateOrientation = function () {
        this._orientation = (this._size[1] >= this._size[0]) ? PdfPageOrientation.portrait : PdfPageOrientation.landscape;
    };
    PdfPageSettings.prototype._getActualSize = function () {
        var width = this._size[0] - (this._margins._left + this._margins._right);
        var height = this._size[1] - (this._margins._top + this._margins._bottom);
        return [width, height];
    };
    return PdfPageSettings;
}());
export { PdfPageSettings };
/**
 * A class representing PDF page margins.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Create a new PDF page settings instance
 * let pageSettings: PdfPageSettings = new PdfPageSettings();
 * // Sets the margins
 * pageSettings.margins = new PdfMargins(40);
 * // Sets the page size
 * pageSettings.size = [595, 842];
 * // Sets the page orientation
 * pageSettings.orientation = PdfPageOrientation.landscape;
 * // Add a new PDF page with page settings
 * page = document.addPage(pageSettings);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfMargins = /** @class */ (function () {
    function PdfMargins(all) {
        if (typeof all === 'undefined') {
            this._left = this._right = this._top = this._bottom = 40;
        }
        else {
            this._left = this._right = this._top = this._bottom = all;
        }
    }
    Object.defineProperty(PdfMargins.prototype, "left", {
        /**
         * Gets the left margin value of the page.
         *
         * @returns {number} Left margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Gets the left margin
         * let left: number = pageSettings.margins.left;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._left;
        },
        /**
         * Sets the left margin value of the page.
         *
         * @param {number} value Left margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the margins
         * let margins: PdfMargins = new PdfMargins();
         * margins.left = 40;
         * margins.right = 40;
         * margins.top = 20;
         * margins.bottom = 20;
         * pageSettings.margins = margins;
         * // Sets the page size
         * pageSettings.size = [595, 842];
         * // Sets the page orientation
         * pageSettings.orientation = PdfPageOrientation.landscape;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._left = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfMargins.prototype, "right", {
        /**
         * Gets the right margin value of the page.
         *
         * @returns {number} Right margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Gets the right margin
         * let right: number = pageSettings.margins.right;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._right;
        },
        /**
         * Sets the right margin value of the page.
         *
         * @param {number} value - Right margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the margins
         * let margins: PdfMargins = new PdfMargins();
         * margins.left = 40;
         * margins.right = 40;
         * margins.top = 20;
         * margins.bottom = 20;
         * pageSettings.margins = margins;
         * // Sets the page size
         * pageSettings.size = [595, 842];
         * // Sets the page orientation
         * pageSettings.orientation = PdfPageOrientation.landscape;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._right = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfMargins.prototype, "top", {
        /**
         * Gets the top margin value of the page.
         *
         * @returns {number} Top margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Gets the top margin
         * let top: number = pageSettings.margins.top;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._top;
        },
        /**
         *Sets the top margin value of the page.
         *
         * @param {number} value Top margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the margins
         * let margins: PdfMargins = new PdfMargins();
         * margins.left = 40;
         * margins.right = 40;
         * margins.top = 20;
         * margins.bottom = 20;
         * pageSettings.margins = margins;
         * // Sets the page size
         * pageSettings.size = [595, 842];
         * // Sets the page orientation
         * pageSettings.orientation = PdfPageOrientation.landscape;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._top = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfMargins.prototype, "bottom", {
        /**
         * Get the bottom margin value of the page.
         *
         * @returns {number} Bottom margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Gets the bottom margin
         * let bottom: number = pageSettings.margins.bottom;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._bottom;
        },
        /**
         * Sets the bottom margin value of the page.
         *
         * @param {number} value Bottom margin.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Create a new PDF page settings instance
         * let pageSettings: PdfPageSettings = new PdfPageSettings();
         * // Sets the margins
         * let margins: PdfMargins = new PdfMargins();
         * margins.left = 40;
         * margins.right = 40;
         * margins.top = 20;
         * margins.bottom = 20;
         * pageSettings.margins = margins;
         * // Sets the page size
         * pageSettings.size = [595, 842];
         * // Sets the page orientation
         * pageSettings.orientation = PdfPageOrientation.landscape;
         * // Add a new PDF page with page settings
         * page = document.addPage(pageSettings);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._bottom = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfMargins;
}());
export { PdfMargins };
/**
 * Public class to provide data for the document split event, including the split index and PDF data.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * document.splitEvent = documentSplitEvent;
 * // Split PDF document by fixed number of pages
 * document.splitByFixedNumber(1);
 * // Event to invoke while splitting PDF document data
 * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
 *  Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
 * }
 * // Destroy the document
 * document.destroy();
 */
var PdfDocumentSplitEventArgs = /** @class */ (function () {
    /*
     * Initializes a new instance of the `PdfDocumentSplitEventArgs` class.
     *
     * @param {number} splitIndex The fixed number to split PDF document pages. The default value is 1.
     * @param {Uint8Array} pdfData The byte array of the split PDF document data.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * document.splitEvent = documentSplitEvent;
     * // Split PDF document by fixed number of pages
     * document.splitByFixedNumber(1);
     * // Event to invoke while splitting PDF document data
     * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
     *   Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
     * }
     * // Destroy the document
     * document.destroy();
     */
    function PdfDocumentSplitEventArgs(splitIndex, pdfData) {
        this._index = splitIndex;
        this._pdfData = pdfData;
    }
    Object.defineProperty(PdfDocumentSplitEventArgs.prototype, "pdfData", {
        /*
         * Gets the byte array of the PDF document data.
         *
         * @returns {Uint8Array} The byte array of the PDF document data.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * document.splitEvent = documentSplitEvent;
         * // Split PDF document by fixed number of pages
         * document.splitByFixedNumber(1);
         * // Event to invoke while splitting PDF document data
         * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
         *  Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
         * }
         * // Destroy the document
         * document.destroy();
         */
        get: function () {
            return this._pdfData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfDocumentSplitEventArgs.prototype, "index", {
        /*
         * Gets the split index of the PDF document.
         *
         * @returns {Uint8Array} The index that defines the number of event calls during the PDF document split.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * document.splitEvent = documentSplitEvent;
         * // Split PDF document by fixed number of pages
         * document.splitByFixedNumber(1);
         * // Event to invoke while splitting PDF document data
         * function documentSplitEvent(sender: PdfDocument, args: PdfDocumentSplitEventArgs): void {
         *  Save.save(‘output_’ + args.splitIndex + ‘.pdf’, new Blob([args.pdfData], { type: 'application/pdf' }));
         * }
         * // Destroy the document
         * document.destroy();
         */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    return PdfDocumentSplitEventArgs;
}());
export { PdfDocumentSplitEventArgs };
