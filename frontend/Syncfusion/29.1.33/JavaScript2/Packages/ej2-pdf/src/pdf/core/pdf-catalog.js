import { _PdfDictionary, _PdfReferenceSet, _PdfReferenceSetCache, _PdfReference, _isName } from './pdf-primitives';
import { FormatError } from './utils';
var _PdfCatalog = /** @class */ (function () {
    function _PdfCatalog(xref) {
        this._crossReference = xref;
        this._catalogDictionary = xref._getCatalogObj();
        if (!(this._catalogDictionary instanceof _PdfDictionary)) {
            throw new FormatError('Catalog object is not a dictionary.');
        }
        else {
            this._catalogDictionary.isCatalog = true;
        }
        this._topPagesDictionary = this._catalogDictionary.get('Pages');
        this.pageKidsCountCache = new _PdfReferenceSetCache();
        this.pageIndexCache = new _PdfReferenceSetCache();
    }
    Object.defineProperty(_PdfCatalog.prototype, "version", {
        get: function () {
            var value;
            if (this._catalogDictionary.has('Version')) {
                var version = this._catalogDictionary.get('Version');
                if (version) {
                    value = version.name;
                }
            }
            return value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfCatalog.prototype, "pageCount", {
        get: function () {
            var obj = this._topPagesDictionary.get('Count');
            if (typeof obj === 'undefined' || !Number.isInteger(obj)) {
                throw new FormatError('Invalid page count');
            }
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfCatalog.prototype, "acroForm", {
        get: function () {
            var form;
            if (this._catalogDictionary.has('AcroForm')) {
                form = this._catalogDictionary.get('AcroForm');
            }
            if (form === null || typeof form === 'undefined') {
                form = this._createForm();
            }
            return form;
        },
        enumerable: true,
        configurable: true
    });
    /* eslint-disable */
    _PdfCatalog.prototype._createForm = function () {
        var form = new _PdfDictionary(this._crossReference);
        var ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(ref, form);
        this._catalogDictionary.set('AcroForm', ref);
        this._catalogDictionary._updated = true;
        this._crossReference._allowCatalog = true;
        form._updated = true;
        return form;
    };
    _PdfCatalog.prototype.getPageDictionary = function (pageIndex) {
        var nodesToVisit = [this._topPagesDictionary];
        var visitedNodes = new _PdfReferenceSet();
        var pagesRef = this._catalogDictionary.getRaw('Pages');
        if (pagesRef && pagesRef instanceof _PdfReference) {
            visitedNodes.put(pagesRef);
        }
        var xref = this._crossReference;
        var pageKidsCountCache = this.pageKidsCountCache;
        var pageIndexCache = this.pageIndexCache;
        var currentPageIndex = 0;
        while (nodesToVisit.length > 0) {
            var currentNode = nodesToVisit.pop();
            if (currentNode !== null && typeof currentNode !== 'undefined' && currentNode instanceof _PdfReference) {
                var count_1 = pageKidsCountCache.get(currentNode);
                if (count_1 >= 0 && currentPageIndex + count_1 <= pageIndex) {
                    currentPageIndex += count_1;
                    continue;
                }
                if (visitedNodes.has(currentNode)) {
                    throw new FormatError('Pages tree contains circular reference.');
                }
                visitedNodes.put(currentNode);
                var obj = xref._fetch(currentNode);
                if (obj && obj instanceof _PdfDictionary) {
                    var type = obj.getRaw('Type');
                    if (type !== null && typeof type !== 'undefined' && type instanceof _PdfReference) {
                        type = xref._fetch(type);
                    }
                    if (_isName(type, 'Page') || !obj.has('Kids')) {
                        if (!pageKidsCountCache.has(currentNode)) {
                            pageKidsCountCache.put(currentNode, 1);
                        }
                        if (!pageIndexCache.has(currentNode)) {
                            pageIndexCache.put(currentNode, currentPageIndex);
                        }
                        if (currentPageIndex === pageIndex) {
                            return { dictionary: obj, reference: currentNode };
                        }
                        currentPageIndex++;
                        continue;
                    }
                }
                nodesToVisit.push(obj);
                continue;
            }
            if (!(currentNode instanceof _PdfDictionary)) {
                throw new FormatError('Page dictionary kid reference points to wrong type of object.');
            }
            var objId = currentNode.objId;
            var count = currentNode.get('Count');
            if (count !== null && typeof count !== 'undefined' && count instanceof _PdfReference) {
                count = xref._fetch(count);
            }
            if (count !== null && typeof count !== 'undefined' && Number.isInteger(count) && count >= 0) {
                if (objId && !pageKidsCountCache.has(objId)) {
                    pageKidsCountCache.set(objId, count);
                }
                if (currentPageIndex + count <= pageIndex) {
                    currentPageIndex += count;
                    continue;
                }
            }
            var kids = currentNode.getRaw('Kids');
            if (kids !== null && typeof kids !== 'undefined' && kids instanceof _PdfReference) {
                kids = xref._fetch(kids);
            }
            if (!Array.isArray(kids)) {
                var type = currentNode.getRaw('Type');
                if (type !== null && typeof type !== 'undefined' && type instanceof _PdfReference) {
                    type = xref._fetch(type);
                }
                if (_isName(type, 'Page') || !currentNode.has('Kids')) {
                    if (currentPageIndex === pageIndex) {
                        return { dictionary: currentNode, reference: null };
                    }
                    currentPageIndex++;
                    continue;
                }
                throw new FormatError('Page dictionary kids object is not an array.');
            }
            for (var last = kids.length - 1; last >= 0; last--) {
                nodesToVisit.push(kids[last]);
            }
        }
        throw new Error("Page index " + pageIndex + " not found.");
    };
    _PdfCatalog.prototype._destroy = function () {
        if (this._catalogDictionary) {
            this._catalogDictionary = undefined;
        }
        if (this._topPagesDictionary) {
            this._topPagesDictionary = undefined;
        }
        if (this.pageIndexCache) {
            this.pageIndexCache.clear();
            this.pageIndexCache = undefined;
        }
        if (this.pageKidsCountCache) {
            this.pageKidsCountCache.clear();
            this.pageKidsCountCache = undefined;
        }
    };
    return _PdfCatalog;
}());
export { _PdfCatalog };
