import { PageRenderer, FormFieldsBase, AnnotationRenderer, SignatureBase, BookmarkStyles, BookmarkDestination, BookmarkBase, AnnotBounds } from './index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataFormat, PdfAnnotationExportSettings, PdfDocument, PdfRotationAngle, PdfTextStyle, PdfDocumentLinkAnnotation, PdfTextWebLinkAnnotation, PdfUriAnnotation, PdfPermissionFlag, PdfFormFieldExportSettings, PdfPageSettings, PdfSignatureField, PdfPageImportOptions } from '@syncfusion/ej2-pdf';
import { ExtractTextOption } from '../index';
import { Size } from '@syncfusion/ej2-drawings';
import { PdfViewerUtils, TaskPriorityLevel } from '../base/pdfviewer-utlis';
/**
 * PdfRenderer
 *
 * @hidden
 */
var PdfRenderer = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    function PdfRenderer(pdfViewer, pdfViewerBase) {
        /**
         * @private
         */
        this.bookmarkStyles = [];
        /**
         * @private
         */
        this.bookmarkCollection = [];
        /**
         * @private
         */
        this.pageRotationCollection = [];
        /**
         * @private
         */
        this.bookmarkDictionary = {};
        this.annotationDetailCollection = {};
        /**
         * @private
         */
        this.documentTextCollection = [];
        this.pageSizes = {};
        this.isCompletePageSizeNotReceieved = true;
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.id = 0;
        this.pageIndex = 0;
        this.textCollections = [];
        this.scaleFactor = 1.5;
        this.restrictionList = [];
        this.securityList = ['Print', 'EditContent', 'CopyContent', 'EditAnnotations', 'FillFields', 'AccessibilityCopyContent', 'AssembleDocument', 'FullQualityPrint'];
        this._fallbackFontCollection = {};
        this.document = null;
        /**
         * @private
         */
        this.searchResults = {};
        this.isDummyInserted = false;
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    Object.defineProperty(PdfRenderer.prototype, "PageCount", {
        /**
         * @private
         * @returns {void}
         */
        get: function () {
            return this.pageCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfRenderer.prototype, "ReferencePath", {
        /**
         * @private
         * @returns {void}
         */
        get: function () {
            return this.mReferencePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfRenderer.prototype, "referencePath", {
        /**
         * @private
         * @param {string} v - v
         * @returns {void}
         */
        set: function (v) {
            this.mReferencePath = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfRenderer.prototype, "ScaleFactor", {
        /**
         * @private
         * @returns {void}
         */
        get: function () {
            return this.scaleFactor;
        },
        /**
         * @private
         * @param {string} v - v
         */
        set: function (v) {
            this.scaleFactor = v;
            if (this.scaleFactor <= 0) {
                this.scaleFactor = 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfRenderer.prototype, "FallbackFontCollection", {
        /**
         * @private
         * @returns {void}
         */
        get: function () {
            return this._fallbackFontCollection;
        },
        /**
         * @private
         * @param {string} v - v
         */
        set: function (v) {
            this._fallbackFontCollection = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {string} documentData - documentData
     * @param {string} documentId - documentId
     * @param {string} password - password
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.load = function (documentData, documentId, password, jsonObject) {
        try {
            if (jsonObject.action !== 'VirtualLoad') {
                this.loadedDocument = new PdfDocument(documentData, password ? password : '');
                this.loadedByteArray = documentData;
                this.password = password;
                this.isCompletePageSizeNotReceieved = true;
            }
        }
        catch (error) {
            if (error.message === 'Invalid PDF structure.') {
                return '3';
            }
            else if (error.message === 'Cannot open an encrypted document. The password is invalid.') {
                return '4';
            }
            else if (error.message === 'Invalid cross reference') {
                return '4';
            }
            else {
                return error.message;
            }
        }
        var jsonResult = this.loadDocument(documentData, documentId, password, jsonObject);
        this.bookmarkStyles = [];
        this.bookmarkCollection = [];
        this.bookmarkDictionary = {};
        return JSON.stringify(jsonResult);
    };
    /**
     * @param {string} documentData - documentData
     * @param {string} documentId - documentId
     * @param {string} password - password
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.loadImportDocument = function (documentData, documentId, password, jsonObject) {
        try {
            if (jsonObject.action !== 'VirtualLoad') {
                this.loadImportedDocument = new PdfDocument(documentData, password ? password : '');
                this.loadImportedBase64String = documentData;
                this.importedDocpassword = password;
            }
        }
        catch (error) {
            if (error.message === 'Invalid PDF structure.') {
                return '3';
            }
            else if (error.message === 'Cannot open an encrypted document. The password is invalid.') {
                return '4';
            }
            else if (error.message === 'Invalid cross reference') {
                return '4';
            }
            else {
                return error.message;
            }
        }
        var jsonResult = { uniqueId: documentId, password: this.importedDocpassword };
        this.loadImportedDocument.destroy();
        this.loadImportedDocument = null;
        return JSON.stringify(jsonResult);
    };
    /**
     * @param {string} documentData - documentData
     * @param {string} documentId - documentId
     * @param {string} password - password
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.loadDocument = function (documentData, documentId, password, jsonObject) {
        if (Object.prototype.hasOwnProperty.call(jsonObject, 'isCompletePageSizeNotReceived')) {
            this.isCompletePageSizeNotReceieved = !jsonObject.isCompletePageSizeNotReceived;
        }
        this.pageCount = this.loadedDocument.pageCount;
        this.pageSizes = this.getPageSizes(this.pageCount);
        var pdfRenderedFormFields = [];
        var isDigitalSignaturePresent = false;
        var isTaggedPdf = false; //Need to check and set if loaddocument is tagged pdf
        this.formFieldsBase = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase, isDigitalSignaturePresent);
        this.restrictionList = [];
        if (!isNullOrUndefined(this.loadedDocument)) {
            this.documentSecurity(password);
        }
        if (!isNullOrUndefined(this.loadedDocument)) {
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'hideEmptyDigitalSignatureFields')) {
                this.formFieldsBase.hideEmptyDigitalSignatureFields = jsonObject['hideEmptyDigitalSignatureFields'];
            }
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'showDigitalSignatureAppearance')) {
                this.formFieldsBase.showDigitalSignatureAppearance = jsonObject['showDigitalSignatureAppearance'];
            }
        }
        if (!isNullOrUndefined(this.formFieldsBase) && this.pageSizes && Object.keys(this.pageSizes).length <= 100) {
            this.formFieldsBase.GetFormFields();
            pdfRenderedFormFields = this.formFieldsBase.PdfRenderedFormFields;
        }
        if (this.formFieldsBase.mIsDigitalSignaturePresent) {
            var digitalSignatureDoc = new PdfDocument(documentData, '');
            var loadedForm = digitalSignatureDoc.form;
            if (!isNullOrUndefined(loadedForm) && !isNullOrUndefined(loadedForm._fields)) {
                for (var i = 0; i < loadedForm.count; i++) {
                    if (loadedForm.fieldAt(i) instanceof PdfSignatureField) {
                        var signatureField = loadedForm.fieldAt(i);
                        if (signatureField.isSigned && this.formFieldsBase.showDigitalSignatureAppearance) {
                            signatureField.flatten = true;
                        }
                    }
                }
            }
            this.digitialByteArray = digitalSignatureDoc.save();
            digitalSignatureDoc.destroy();
        }
        return { pageCount: this.pageCount, pageSizes: this.pageSizes, uniqueId: documentId,
            PdfRenderedFormFields: pdfRenderedFormFields, RestrictionSummary: this.restrictionList,
            isDigitalSignaturePresent: this.formFieldsBase.mIsDigitalSignaturePresent,
            digitialSignatureFile: this.digitialByteArray ? true : false,
            isTaggedPdf: isTaggedPdf, pageRotation: this.pageRotationCollection };
    };
    PdfRenderer.prototype.documentSecurity = function (password) {
        var isOwnerPassword = this.loadedDocument.isEncrypted &&
            (!this.loadedDocument.isUserPassword || this.loadedDocument._hasUserPasswordOnly);
        if (!isNullOrUndefined(password) && password !== '' && isOwnerPassword) {
            this.restrictionSummary(password, true);
        }
        else {
            this.restrictionSummary(password, false);
        }
    };
    PdfRenderer.prototype.restrictionSummary = function (password, isOwner) {
        var ownerPassword = password ? password : ''; //Need to set owner password from loaded document
        var userPassword = password ? password : ''; //Need to set user password from loaded document
        var permissionList = this.getPermissionArray(this.loadedDocument.permissions);
        var isEncrypted = this.loadedDocument.isEncrypted;
        if ((!(permissionList.length === 1 && permissionList[0] === 'Default')) || (isEncrypted && ownerPassword === '' && userPassword === '')) {
            for (var i = 0; i < this.securityList.length; i++) {
                var isExist = false;
                for (var j = 0; j < permissionList.length; j++) {
                    if (permissionList[parseInt(j.toString(), 10)].trim() === this.securityList[parseInt(i.toString(), 10)].trim()) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist && !isOwner) {
                    this.restrictionList.push(this.securityList[parseInt(i.toString(), 10)].trim());
                }
            }
        }
        else if (permissionList.length === 1 && permissionList[0] === 'Default' && isEncrypted && !isOwner) {
            for (var i = 0; i < this.securityList.length; i++) {
                this.restrictionList.push(this.securityList[parseInt(i.toString(), 10)].trim());
            }
        }
    };
    PdfRenderer.prototype.getPermissionArray = function (permission) {
        var permissionArray = [];
        if (permission === PdfPermissionFlag.default) {
            permissionArray.push('Default');
        }
        else {
            if (permission & PdfPermissionFlag.fullQualityPrint) {
                permissionArray.push('FullQualityPrint');
            }
            if (permission & PdfPermissionFlag.assembleDocument) {
                permissionArray.push('AssembleDocument');
            }
            if (permission & PdfPermissionFlag.accessibilityCopyContent) {
                permissionArray.push('AccessibilityCopyContent');
            }
            if (permission & PdfPermissionFlag.fillFields) {
                permissionArray.push('FillFields');
            }
            if (permission & PdfPermissionFlag.editAnnotations) {
                permissionArray.push('EditAnnotations');
            }
            if (permission & PdfPermissionFlag.copyContent) {
                permissionArray.push('CopyContent');
            }
            if (permission & PdfPermissionFlag.editContent) {
                permissionArray.push('EditContent');
            }
            if (permission & PdfPermissionFlag.print) {
                permissionArray.push('Print');
            }
        }
        return permissionArray;
    };
    PdfRenderer.prototype.getPageSizes = function (pageCount) {
        var pageSizes = {};
        var pageLimit = pageCount;
        if (pageCount > 100) {
            pageLimit = 100;
        }
        if (this.isCompletePageSizeNotReceieved) {
            for (var i = 0; i < pageLimit; i++) {
                pageSizes[i.toString()] = this.getPageSize(i);
                var page = this.loadedDocument.getPage(i);
                var rotation = page.rotation % 4;
                this.pageRotationCollection.push(rotation);
            }
        }
        else {
            for (var i = pageLimit; i < pageCount; i++) {
                pageSizes[i.toString()] = this.getPageSize(i);
                var page = this.loadedDocument.getPage(i);
                var rotation = page.rotation % 4;
                this.pageRotationCollection.push(rotation);
            }
        }
        return pageSizes;
    };
    /**
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.getPageSize = function (pageNumber) {
        var page = this.loadedDocument.getPage(pageNumber);
        var size = page.size;
        var rotation = page.rotation % 4;
        if (rotation === PdfRotationAngle.angle0 || rotation === PdfRotationAngle.angle180) {
            return new Size(this.convertPointToPixel(size[0]), this.convertPointToPixel(size[1]));
        }
        else {
            return new Size(this.convertPointToPixel(size[1]), this.convertPointToPixel(size[0]));
        }
    };
    PdfRenderer.prototype.convertPointToPixel = function (number) {
        return number * 96 / 72;
    };
    PdfRenderer.prototype.convertPixelToPoint = function (value) {
        return (value * (72 / 96));
    };
    /**
     * @param {string} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.getDocumentAsBase64 = function (jsonObject) {
        this.loadedDocument = new PdfDocument(this.loadedByteArray, this.password);
        var clonedDocument = null;
        if (Object.prototype.hasOwnProperty.call(jsonObject, 'digitalSignatureDocumentEdited') &&
            !jsonObject.digitalSignatureDocumentEdited) {
            return this.loadedByteArray;
        }
        else {
            var annotationRenderer = new AnnotationRenderer(this.pdfViewer, this.pdfViewerBase);
            var formfields = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase);
            // create object for form fields signature
            annotationRenderer.removeSignatureTypeAnnot(jsonObject, this.loadedDocument);
            this.orderAnnotations(jsonObject);
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'isFormFieldAnnotationsExist') && jsonObject.isFormFieldAnnotationsExist) {
                if (Object.prototype.hasOwnProperty.call(jsonObject, 'formDesigner') && !isNullOrUndefined(jsonObject['formDesigner'])) {
                    formfields.saveFormFieldsDesignerData(jsonObject);
                }
                else if (Object.prototype.hasOwnProperty.call(jsonObject, 'fieldsData')) {
                    formfields.saveFormFieldsData(jsonObject);
                }
            }
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'organizePages')) {
                var savedBase64String = this.loadedDocument.save();
                clonedDocument = new PdfDocument(savedBase64String, this.password);
                var organizePages = JSON.parse(jsonObject.organizePages);
                if (organizePages.length > 0) {
                    var reorderedPages = this.rearrangePages(organizePages);
                    this.deletePdfPages(organizePages, reorderedPages);
                    this.insertPdfPages(organizePages);
                    this.copyPages(organizePages, clonedDocument);
                    this.rotatePages(organizePages);
                    this.importPages(organizePages);
                    if (this.isDummyInserted) {
                        this.loadedDocument.removePage(this.loadedDocument.pageCount - 1);
                        this.isDummyInserted = false;
                    }
                }
                clonedDocument.destroy();
                clonedDocument = null;
            }
            var documentSaved = this.loadedDocument.save();
            if (this.document != null) {
                this.document.destroy();
                this.document = null;
            }
            return documentSaved;
        }
    };
    PdfRenderer.prototype.rearrangePages = function (organizePages) {
        var _this = this;
        var reorderedPageIndices = [];
        if (organizePages.length > 0) {
            var clonedCollection = JSON.parse(JSON.stringify(organizePages));
            var sortedCollection = clonedCollection.sort(function (a, b) { return _this.pdfViewer.pageOrganizer.sorting(a['currentPageIndex'], b['currentPageIndex']); });
            for (var i = 0; i < sortedCollection.length; i++) {
                var currentPageDetails = sortedCollection[parseInt(i.toString(), 10)];
                if (!currentPageDetails.isInserted && !currentPageDetails.isCopied && !currentPageDetails.isImportedDoc && currentPageDetails['currentPageIndex'] !== null && currentPageDetails['pageIndex'] !== null && parseInt(currentPageDetails['pageIndex'].toString(), 10) >= 0) {
                    reorderedPageIndices.push(parseInt(currentPageDetails['pageIndex'].toString(), 10));
                }
            }
            // eslint-disable-next-line
            var deltetedPages = sortedCollection.filter(function (item) { return item.isDeleted && item['currentPageIndex'] === null; });
            for (var i = 0; i < deltetedPages.length; i++) {
                var deletedPage = deltetedPages[parseInt(i.toString(), 10)];
                reorderedPageIndices = reorderedPageIndices.slice(0, deletedPage.pageIndex).concat([deletedPage.pageIndex], reorderedPageIndices.slice(deletedPage.pageIndex));
            }
            if (reorderedPageIndices.length > 0) {
                this.loadedDocument.reorderPages(reorderedPageIndices);
            }
        }
        return reorderedPageIndices;
    };
    PdfRenderer.prototype.rotatePages = function (organizePages) {
        if (organizePages.length > 0) {
            var importPageCount = 0;
            for (var i = 0; i < organizePages.length; i++) {
                var pageNumber = organizePages[parseInt(i.toString(), 10)].pageIndex;
                var currentPageNumber = organizePages[parseInt(i.toString(), 10)].currentPageIndex;
                var isDeleted = organizePages[parseInt(i.toString(), 10)].isDeleted;
                var isInserted = organizePages[parseInt(i.toString(), 10)].isInserted;
                var isCopied = organizePages[parseInt(i.toString(), 10)].isCopied;
                var isImportedDoc = organizePages[parseInt(i.toString(), 10)].isImportedDoc;
                var rotation = organizePages[parseInt(i.toString(), 10)].rotateAngle;
                if (isImportedDoc) {
                    importPageCount++;
                }
                if (!isNullOrUndefined(currentPageNumber) && !isNullOrUndefined(rotation) &&
                    !isDeleted && !isInserted && !isCopied && !isImportedDoc && pageNumber !== -1) {
                    var page = this.loadedDocument.getPage(currentPageNumber - importPageCount);
                    page.rotation = this.getPdfRotationAngle(rotation);
                }
            }
        }
    };
    PdfRenderer.prototype.insertPdfPages = function (organizePages) {
        if (organizePages.length > 0) {
            var copiedPageCount = 0;
            for (var i = 0; i < organizePages.length; i++) {
                var pageNumber = organizePages[parseInt(i.toString(), 10)].pageIndex;
                var currentPageNumber = organizePages[parseInt(i.toString(), 10)].currentPageIndex;
                var isDeleted = organizePages[parseInt(i.toString(), 10)].isDeleted;
                var isInserted = organizePages[parseInt(i.toString(), 10)].isInserted;
                var isCopied = organizePages[parseInt(i.toString(), 10)].isCopied;
                var isImportedDoc = organizePages[parseInt(i.toString(), 10)].isImportedDoc;
                var pageSize = void 0;
                if (!isNullOrUndefined(organizePages[parseInt(i.toString(), 10)].pageSize)) {
                    pageSize = [this.convertPixelToPoint(organizePages[parseInt(i.toString(), 10)].pageSize.width),
                        this.convertPixelToPoint(organizePages[parseInt(i.toString(), 10)].pageSize.height)];
                }
                if (isCopied || isImportedDoc) {
                    copiedPageCount++;
                }
                if (!isNullOrUndefined(currentPageNumber) && !isDeleted && isInserted && pageNumber === -1) {
                    var rotation = organizePages[parseInt(i.toString(), 10)].rotateAngle;
                    var pageSettings = new PdfPageSettings();
                    pageSettings.rotation = this.getPdfRotationAngle(rotation);
                    if (!isNullOrUndefined(pageSize)) {
                        pageSettings.size = pageSize;
                    }
                    this.loadedDocument.addPage(currentPageNumber - copiedPageCount, pageSettings);
                }
            }
        }
    };
    PdfRenderer.prototype.copyPages = function (organizePages, clonedDocument) {
        if (organizePages.length > 0) {
            var importPageCount = 0;
            for (var i = 0; i < organizePages.length; i++) {
                var pageNumber = organizePages[parseInt(i.toString(), 10)].pageIndex;
                var currentPageNumber = organizePages[parseInt(i.toString(), 10)].currentPageIndex;
                var copiedPageIndex = organizePages[parseInt(i.toString(), 10)].copiedPageIndex;
                var isDeleted = organizePages[parseInt(i.toString(), 10)].isDeleted;
                var isInserted = organizePages[parseInt(i.toString(), 10)].isInserted;
                var isCopied = organizePages[parseInt(i.toString(), 10)].isCopied;
                var isImportedDoc = organizePages[parseInt(i.toString(), 10)].isImportedDoc;
                var rotation = organizePages[parseInt(i.toString(), 10)].rotateAngle;
                if (isImportedDoc) {
                    importPageCount++;
                }
                if (!isNullOrUndefined(currentPageNumber) && !isDeleted && !isInserted && !isImportedDoc && isCopied && pageNumber === -1) {
                    var pageToImport = clonedDocument.getPage(copiedPageIndex);
                    pageToImport.rotation = this.getPdfRotationAngle(rotation);
                    var options = new PdfPageImportOptions();
                    options.targetIndex = currentPageNumber - importPageCount;
                    options.groupFormFields = true;
                    this.loadedDocument.importPage(pageToImport, clonedDocument, options);
                }
            }
        }
    };
    PdfRenderer.prototype.importPages = function (organizePages) {
        if (organizePages.length > 0) {
            for (var i = organizePages.length - 1; i >= 0; i--) {
                var pageNumber = organizePages[parseInt(i.toString(), 10)].pageIndex;
                var currentPageNumber = organizePages[parseInt(i.toString(), 10)].currentPageIndex;
                var isDeleted = organizePages[parseInt(i.toString(), 10)].isDeleted;
                var isInserted = organizePages[parseInt(i.toString(), 10)].isInserted;
                var isCopied = organizePages[parseInt(i.toString(), 10)].isCopied;
                var isImportedDoc = organizePages[parseInt(i.toString(), 10)].isImportedDoc;
                var documentData = organizePages[parseInt(i.toString(), 10)].documentData;
                var password = organizePages[parseInt(i.toString(), 10)].password;
                if (!isNullOrUndefined(currentPageNumber) && !isDeleted && !isInserted && !isCopied && isImportedDoc &&
                    pageNumber === -1) {
                    var importedDocCountBefore = 0;
                    for (var j = 0; j < i; j++) {
                        if (organizePages[parseInt(j.toString(), 10)].isImportedDoc) {
                            importedDocCountBefore++;
                        }
                    }
                    documentData = this.pdfViewerBase.convertBase64(documentData);
                    this.document = null;
                    this.document = new PdfDocument(documentData, password);
                    var options = new PdfPageImportOptions();
                    options.targetIndex = currentPageNumber - importedDocCountBefore;
                    options.groupFormFields = true;
                    this.loadedDocument.importPageRange(this.document, 0, this.document.pageCount - 1, options);
                }
            }
        }
    };
    PdfRenderer.prototype.deletePdfPages = function (organizePages, reorderedPages) {
        if (organizePages.length > 0) {
            var clonedCollection = JSON.parse(JSON.stringify(organizePages));
            var sortedCollection = [];
            var deleteCount = 0;
            var initialPageCount = this.loadedDocument.pageCount;
            var _loop_1 = function (i) {
                if (clonedCollection.
                    find(function (item) { return item.pageIndex === reorderedPages[parseInt(i.toString(), 10)]; })) {
                    sortedCollection[parseInt(i.toString(), 10)] = clonedCollection.
                        find(function (item) { return item.pageIndex === reorderedPages[parseInt(i.toString(), 10)]; });
                }
            };
            for (var i = 0; i < clonedCollection.length; i++) {
                _loop_1(i);
            }
            for (var i = sortedCollection.length - 1; i >= 0; i--) {
                var count = 0;
                var pageNumber = sortedCollection[parseInt(i.toString(), 10)].pageIndex;
                var isDeleted = sortedCollection[parseInt(i.toString(), 10)].isDeleted;
                if (!isNullOrUndefined(pageNumber) && isDeleted) {
                    if (deleteCount + 1 === initialPageCount) {
                        this.loadedDocument.addPage();
                        this.isDummyInserted = true;
                    }
                    for (var j = i - 1; j >= 0; j--) {
                        if (!(i === sortedCollection[parseInt(i.toString(), 10)].pageIndex)) {
                            count++;
                        }
                    }
                    if (count > sortedCollection[parseInt(i.toString(), 10)].pageIndex) {
                        count = count - sortedCollection[parseInt(i.toString(), 10)].pageIndex;
                        this.loadedDocument.removePage(pageNumber + count);
                    }
                    else {
                        this.loadedDocument.removePage(pageNumber);
                    }
                    deleteCount++;
                }
            }
        }
    };
    PdfRenderer.prototype.getPdfRotationAngle = function (rotation) {
        switch (rotation) {
            case 0:
                return PdfRotationAngle.angle0;
            case 90:
                return PdfRotationAngle.angle90;
            case 180:
                return PdfRotationAngle.angle180;
            case 270:
                return PdfRotationAngle.angle270;
            default:
                return PdfRotationAngle.angle0;
        }
    };
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {any} - any
     */
    PdfRenderer.prototype.importAnnotations = function (jsonObject) {
        try {
            var annotationRenderer = new AnnotationRenderer(this.pdfViewer, this.pdfViewerBase);
            var annotData = jsonObject['importedData'];
            annotationRenderer.removeSignatureTypeAnnot(jsonObject, this.loadedDocument);
            var annotationDataFormat = jsonObject['annotationDataFormat'];
            if (typeof annotationDataFormat === 'string') {
                this.loadedDocument._allowImportCustomData = true;
                switch (annotationDataFormat.toLowerCase()) {
                    case 'json':
                        this.loadedDocument.importAnnotations(annotData, DataFormat.json);
                        break;
                    case 'xfdf':
                        this.loadedDocument.importAnnotations(annotData, DataFormat.xfdf);
                        break;
                    default:
                        break;
                }
                for (var i = 0; i < this.loadedDocument.pageCount; i++) {
                    var pageNumber = i;
                    var pageSize = this.getPageSize(pageNumber);
                    var renderer = new PageRenderer(this.pdfViewer, this.pdfViewerBase);
                    renderer.exportAnnotationComments(pageNumber, pageSize);
                    this.annotationDetailCollection[i.toString()] = new Annotations();
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].textMarkupAnnotation = renderer.textMarkupAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].shapeAnnotation = renderer.shapeAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].measureShapeAnnotation = renderer.measureAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].stampAnnotations = renderer.rubberStampAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].stickyNotesAnnotation = renderer.stickyAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].freeTextAnnotation = renderer.freeTextAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].signatureAnnotation = renderer.signatureAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].signatureInkAnnotation =
                        renderer.signatureInkAnnotationList;
                    this.annotationDetailCollection[parseInt(i.toString(), 10)].annotationOrder = renderer.annotationOrder;
                    this.removeAnnotationsFromCollection(renderer);
                }
                var returnAnnot = JSON.parse(JSON.stringify(this.annotationDetailCollection));
                if (Object.prototype.hasOwnProperty.call(jsonObject, 'uniqueId')) {
                    return { pdfAnnotation: returnAnnot, uniqueId: jsonObject['uniqueId'] };
                }
                else {
                    return { pdfAnnotation: returnAnnot };
                }
            }
        }
        catch (e) {
            return e.message;
        }
    };
    PdfRenderer.prototype.removeAnnotationsFromCollection = function (renderer) {
        renderer.textMarkupAnnotationList = [];
        renderer.shapeAnnotationList = [];
        renderer.measureAnnotationList = [];
        renderer.rubberStampAnnotationList = [];
        renderer.stickyAnnotationList = [];
        renderer.freeTextAnnotationList = [];
        renderer.signatureAnnotationList = [];
        renderer.signatureInkAnnotationList = [];
        renderer.annotationOrder = [];
    };
    /**
     * @param {string} jsonObject - jsonObject
     * @param {boolean} isObject - isObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.exportAnnotation = function (jsonObject, isObject) {
        var annotationRenderer = new AnnotationRenderer(this.pdfViewer, this.pdfViewerBase);
        annotationRenderer.removeSignatureTypeAnnot(jsonObject, this.loadedDocument);
        this.orderAnnotations(jsonObject);
        var settings = new PdfAnnotationExportSettings();
        var annotationDataFormat = jsonObject['annotationDataFormat'];
        var fileName;
        var exportObject;
        if (typeof annotationDataFormat === 'string') {
            switch (annotationDataFormat.toLowerCase()) {
                case 'json':
                    settings.dataFormat = DataFormat.json;
                    if (isObject) {
                        settings.exportAppearance = isObject;
                        exportObject = this.loadedDocument.exportAnnotations(settings);
                        return exportObject;
                    }
                    else {
                        fileName = this.changeFileExtension(this.pdfViewer.fileName, 'json');
                        return this.loadedDocument.exportAnnotations(settings);
                    }
                case 'xfdf':
                    settings.dataFormat = DataFormat.xfdf;
                    if (isObject) {
                        settings.exportAppearance = isObject;
                        exportObject = this.loadedDocument.exportAnnotations(settings);
                        return exportObject;
                    }
                    else {
                        fileName = this.changeFileExtension(this.pdfViewer.fileName, 'xfdf');
                        return this.loadedDocument.exportAnnotations(settings);
                    }
                // Add more cases for other supported formats as needed
                default:
                    break;
            }
        }
        return null;
    };
    PdfRenderer.prototype.changeFileExtension = function (filename, newExtension) {
        var lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === -1) {
            // No extension found in the filename
            return filename + '.' + newExtension;
        }
        var nameWithoutExtension = filename.slice(0, lastDotIndex);
        return nameWithoutExtension + '.' + newExtension;
    };
    PdfRenderer.prototype.orderAnnotations = function (jsonObject) {
        var annotationRenderer = new AnnotationRenderer(this.pdfViewer, this.pdfViewerBase);
        var signatureModule = new SignatureBase(this.pdfViewer, this.pdfViewerBase);
        if (Object.prototype.hasOwnProperty.call(jsonObject, 'isAnnotationsExist') && jsonObject.isAnnotationsExist) {
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'annotationCollection')) {
                var annotationDetails = JSON.parse(jsonObject.annotationCollection);
                var count = annotationDetails.length;
                var _loop_2 = function (i) {
                    var annotationType = annotationDetails[parseInt(i.toString(), 10)].shapeAnnotationType;
                    var details = annotationDetails[parseInt(i.toString(), 10)];
                    if (Object.prototype.hasOwnProperty.call(details, 'calibrate') && (details['shapeAnnotationType'] === 'Circle' || details['shapeAnnotationType'] === 'Line' || details['shapeAnnotationType'] === 'Polygon' || details['shapeAnnotationType'] === 'Polyline')) {
                        annotationType = 'measureShapes';
                    }
                    else if (!(Object.prototype.hasOwnProperty.call(details, 'calibrate')) && (details['shapeAnnotationType'] === 'Line' || details['shapeAnnotationType'] === 'Circle' || details['shapeAnnotationType'] === 'Polygon' || details['shapeAnnotationType'] === 'Square' || details['shapeAnnotationType'] === 'Polyline')) {
                        annotationType = 'shapeAnnotation';
                    }
                    switch (annotationType) {
                        case 'textMarkup':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'textMarkupAnnotations')) {
                                var textMarkupDetails = JSON.parse(jsonObject.textMarkupAnnotations);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = textMarkupDetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var textMarkup = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (textMarkup) {
                                    details = textMarkup;
                                    annotationRenderer.addTextMarkup(details, this_1.loadedDocument);
                                }
                            }
                            break;
                        case 'shapeAnnotation':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'shapeAnnotations')) {
                                var shapeDetails = JSON.parse(jsonObject.shapeAnnotations);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = shapeDetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var page = this_1.loadedDocument.getPage(parseInt(pageNumber, 10));
                                var shape = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (shape) {
                                    details = shape;
                                    annotationRenderer.addShape(details, page);
                                }
                            }
                            break;
                        case 'stamp':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'stampAnnotations')) {
                                var stampdetails = JSON.parse(jsonObject.stampAnnotations);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = stampdetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var page = this_1.loadedDocument.getPage(parseInt(pageNumber, 10));
                                var stamp = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (stamp) {
                                    details = stamp;
                                    annotationRenderer.addCustomStampAnnotation(details, page);
                                }
                            }
                            break;
                        case 'measureShapes':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'measureShapeAnnotations')) {
                                var shapeDetails = JSON.parse(jsonObject.measureShapeAnnotations);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = shapeDetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var page = this_1.loadedDocument.getPage(parseInt(pageNumber, 10));
                                var shape = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (shape) {
                                    details = shape;
                                    annotationRenderer.addMeasure(details, page);
                                }
                            }
                            break;
                        case 'sticky':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'stickyNotesAnnotation')) {
                                var shapeDetails = JSON.parse(jsonObject.stickyNotesAnnotation);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = shapeDetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var page = this_1.loadedDocument.getPage(parseInt(pageNumber, 10));
                                var shape = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (shape) {
                                    details = shape;
                                    annotationRenderer.addStickyNotes(details, page);
                                }
                            }
                            break;
                        case 'Ink':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'inkSignatureData')) {
                                var shapeDetails = JSON.parse(jsonObject.inkSignatureData);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = shapeDetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var page = this_1.loadedDocument.getPage(parseInt(pageNumber, 10));
                                var shape = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (shape) {
                                    details = shape;
                                    annotationRenderer.saveInkSignature(details, page);
                                }
                            }
                            break;
                        case 'FreeText':
                            if (Object.prototype.hasOwnProperty.call(jsonObject, 'freeTextAnnotation')) {
                                var freeTextDetails = JSON.parse(jsonObject.freeTextAnnotation);
                                var pageNumber = details['pageNumber'].toString();
                                var annotationCount = freeTextDetails[parseInt(pageNumber, 10)];
                                var pageAnnotations = annotationCount;
                                var page = this_1.loadedDocument.getPage(parseInt(pageNumber, 10));
                                var freeText = pageAnnotations.find(function (obj) { return obj['annotName'].toString() === details['annotationId'].toString(); });
                                if (!isNullOrUndefined(freeText)) {
                                    details = freeText;
                                    if (!isNullOrUndefined(this_1.FallbackFontCollection) &&
                                        Object.keys(this_1.FallbackFontCollection).length !== 0) {
                                        annotationRenderer.addFreeText(details, page, this_1.FallbackFontCollection);
                                    }
                                    else {
                                        annotationRenderer.addFreeText(details, page);
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                };
                var this_1 = this;
                for (var i = 0; i < count; i++) {
                    _loop_2(i);
                }
                if (jsonObject.signatureData) {
                    if (jsonObject.isSignatureEdited) {
                        signatureModule.saveSignatureAsAnnotatation(jsonObject, this.loadedDocument);
                    }
                    else {
                        signatureModule.saveSignatureData(jsonObject, this.loadedDocument);
                    }
                }
            }
        }
    };
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.getAnnotationComments = function (jsonObject) {
        try {
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'pageStartIndex') && !isNullOrUndefined(jsonObject.pageStartIndex)) {
                var pageStartIndex = parseInt(jsonObject.pageStartIndex, 10);
                var pageEndIndex = parseInt(jsonObject.pageEndIndex, 10);
                var annotationDetails = {};
                for (var i = pageStartIndex; i < pageEndIndex; i++) {
                    var pageNumber = i;
                    var pageSize = this.getPageSize(pageNumber);
                    this.renderer = new PageRenderer(this.pdfViewer, this.pdfViewerBase);
                    annotationDetails[pageNumber.toString()] = this.renderer.exportAnnotationComments(pageNumber, pageSize);
                }
                return { uniqueId: jsonObject.uniqueId, annotationDetails: annotationDetails,
                    startPageIndex: pageStartIndex, endPageIndex: pageEndIndex, isAnnotationPresent: this.renderer.isAnnotationPresent };
            }
            return '';
        }
        catch (error) {
            return error.message;
        }
    };
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.getBookmarks = function (jsonObject) {
        try {
            var bookmark = this.loadedDocument.bookmarks;
            if (!isNullOrUndefined(bookmark) && Object.prototype.hasOwnProperty.call(jsonObject, 'bookmarkStyles')) {
                for (var i = 0; i < bookmark.count; i++) {
                    this.retrieveFontStyles(bookmark.at(i), false);
                }
            }
            if (isNullOrUndefined(bookmark) || isNullOrUndefined(bookmark.count) || bookmark.count === 0) {
                return null;
            }
            else {
                for (var i = 0; i < bookmark.count; i++) {
                    var pdfLoadedBookmark = bookmark.at(i);
                    var parentBookmarkDestination = new BookmarkDestination();
                    var bookmarkDestination = pdfLoadedBookmark.destination ?
                        pdfLoadedBookmark.destination : pdfLoadedBookmark.namedDestination ?
                        pdfLoadedBookmark.namedDestination.destination ? pdfLoadedBookmark.namedDestination.destination : null : null;
                    parentBookmarkDestination.X = !isNullOrUndefined(bookmarkDestination) ? bookmarkDestination.location[0] : 0;
                    parentBookmarkDestination.PageIndex = !isNullOrUndefined(bookmarkDestination) ? bookmarkDestination.pageIndex : 0;
                    parentBookmarkDestination.Zoom = !isNullOrUndefined(bookmarkDestination) ? bookmarkDestination.zoom : 0;
                    var parentBookmark = new BookmarkBase();
                    parentBookmark.Id = ++this.id;
                    parentBookmark.Title = pdfLoadedBookmark.title;
                    parentBookmark.Child = [];
                    parentBookmark.FileName = !isNullOrUndefined(pdfLoadedBookmark.action) ? pdfLoadedBookmark.action.toString() : '';
                    if (!isNullOrUndefined(bookmarkDestination)) {
                        if (bookmarkDestination.page.rotation === PdfRotationAngle.angle90) {
                            parentBookmarkDestination.Y = this.convertPointToPixel(bookmarkDestination.page.size[0]) -
                                this.convertPointToPixel(Math.abs(bookmarkDestination.location[1]));
                        }
                        else if (bookmarkDestination.page.rotation === PdfRotationAngle.angle270) {
                            parentBookmarkDestination.Y = this.convertPointToPixel(Math.abs(bookmarkDestination.location[1]));
                        }
                        else {
                            parentBookmarkDestination.Y = this.convertPointToPixel(bookmarkDestination.page.size[1]) -
                                this.convertPointToPixel(Math.abs(bookmarkDestination.location[1]));
                        }
                    }
                    else {
                        parentBookmarkDestination.Y = 0;
                    }
                    this.bookmarkDictionary[this.id.toString()] = parentBookmarkDestination;
                    parentBookmark.Child = this.getChildrenBookmark(pdfLoadedBookmark);
                    if (parentBookmark.Child.length > 0) {
                        parentBookmark.HasChild = true;
                    }
                    this.bookmarkCollection.push(parentBookmark);
                }
            }
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'uniqueId')) {
                return { Bookmarks: JSON.parse(JSON.stringify(this.bookmarkCollection)), BookmarksDestination: JSON.parse(JSON.stringify(this.bookmarkDictionary)), uniqueId: jsonObject['uniqueId'].toString(), Bookmarkstyles: JSON.parse(JSON.stringify(this.bookmarkStyles)) };
            }
            else {
                return { Bookmarks: JSON.parse(JSON.stringify(this.bookmarkCollection)), BookmarksDestination: JSON.parse(JSON.stringify(this.bookmarkDictionary)), Bookmarkstyles: JSON.parse(JSON.stringify(this.bookmarkStyles)) };
            }
        }
        catch (error) {
            return error.message;
        }
    };
    PdfRenderer.prototype.retrieveFontStyles = function (listElement, isChild) {
        var currentElement = listElement;
        var currentStyles = new BookmarkStyles();
        if (!isNullOrUndefined(currentElement)) {
            if (!isNullOrUndefined(currentElement.color)) {
                currentStyles.Color = 'rgba(' + currentElement.color[0] + ',' + currentElement.color[1] + ',' + currentElement.color[2] + ',' + 1 + ')';
            }
            currentStyles.FontStyle = this.getPdfTextStyleString(currentElement.textStyle);
            currentStyles.Text = currentElement.title;
            currentStyles.IsChild = isChild;
            this.bookmarkStyles.push(currentStyles);
            this.getChildrenStyles(listElement);
        }
    };
    PdfRenderer.prototype.getPdfTextStyleString = function (textStyle) {
        switch (textStyle) {
            case PdfTextStyle.bold:
                return 'Bold';
            case PdfTextStyle.italic:
                return 'Italic';
            case PdfTextStyle.regular:
                return 'Regular';
            default:
                return 'Regular';
        }
    };
    PdfRenderer.prototype.getChildrenStyles = function (bookmarks) {
        for (var i = 0; i < bookmarks.count; i++) {
            this.retrieveFontStyles(bookmarks.at(i), true);
        }
    };
    PdfRenderer.prototype.getChildrenBookmark = function (pdfLoadedBookmark) {
        var childBookmarkCollection = [];
        if (!isNullOrUndefined(pdfLoadedBookmark) && !isNullOrUndefined(pdfLoadedBookmark.count) && pdfLoadedBookmark.count > 0) {
            for (var i = 0; i < pdfLoadedBookmark.count; i++) {
                var child = pdfLoadedBookmark.at(i);
                var childBookmarkDestination = child.destination ? child.destination :
                    child.namedDestination ? child.namedDestination.destination ? child.namedDestination.destination : null : null;
                this.id++;
                var title = child.title;
                this.pageIndex = !isNullOrUndefined(childBookmarkDestination) ? childBookmarkDestination.pageIndex : 0;
                this.x = !isNullOrUndefined(childBookmarkDestination) ? childBookmarkDestination.location[0] : 0;
                var yPosition = !isNullOrUndefined(childBookmarkDestination) ? Math.abs(childBookmarkDestination.location[1]) : 0;
                if (!isNullOrUndefined(childBookmarkDestination)) {
                    if (childBookmarkDestination.page.rotation === PdfRotationAngle.angle90) {
                        this.y = this.convertPointToPixel(childBookmarkDestination.page.size[0]) - this.convertPointToPixel(yPosition);
                    }
                    else if (childBookmarkDestination.page.rotation === PdfRotationAngle.angle270) {
                        this.y = this.convertPointToPixel(yPosition);
                    }
                    else {
                        this.y = this.convertPointToPixel(childBookmarkDestination.page.size[1]) - this.convertPointToPixel(yPosition);
                    }
                    this.zoom = childBookmarkDestination.zoom;
                }
                else {
                    this.y = 0;
                    this.zoom = 0;
                }
                var childrenBookmark = new BookmarkBase();
                childrenBookmark.Title = title;
                childrenBookmark.Id = this.id;
                childrenBookmark.Child = [];
                childrenBookmark.FileName = !isNullOrUndefined(child.action) ? child.action.toString() : '';
                var childrenBookmarkDestination = new BookmarkDestination();
                childrenBookmarkDestination.X = this.x;
                childrenBookmarkDestination.Y = this.y;
                childrenBookmarkDestination.PageIndex = this.pageIndex;
                childrenBookmarkDestination.Zoom = this.zoom;
                this.bookmarkDictionary[this.id.toString()] = childrenBookmarkDestination;
                childBookmarkCollection.push(childrenBookmark);
                childrenBookmark.Child = this.getChildrenBookmark(child);
                if (childrenBookmark.Child.length > 0) {
                    childrenBookmark.HasChild = true;
                }
            }
        }
        return childBookmarkCollection;
    };
    /**
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.getHyperlinks = function (pageIndex) {
        if (isNullOrUndefined(this.renderer)) {
            this.renderer = new PageRenderer(this.pdfViewer, this.pdfViewerBase);
        }
        if (isNullOrUndefined(this.renderer.hyperlinks)) {
            this.renderer.hyperlinks = [];
        }
        this.exportHyperlinks(pageIndex, this.getPageSize(pageIndex), false, true);
        return { hyperlinks: this.renderer.hyperlinks, hyperlinkBounds: this.renderer.hyperlinkBounds,
            linkAnnotation: this.renderer.annotationList, linkPage: this.renderer.annotationDestPage,
            annotationLocation: this.renderer.annotationYPosition };
    };
    PdfRenderer.prototype.exportHyperlinks = function (pageIndex, pageSize, isExport, isAnnotationNeeded) {
        var page = this.loadedDocument.getPage(pageIndex);
        this.renderer.hyperlinks = [];
        this.renderer.hyperlinkBounds = [];
        this.renderer.annotationDestPage = [];
        this.renderer.annotationList = [];
        this.renderer.annotationYPosition = [];
        for (var i = 0; i < page.annotations.count; i++) {
            if (page.annotations.at(i) instanceof PdfUriAnnotation) {
                var pdfLoadedUriAnnotation = page.annotations.at(i);
                var rectangle = this.getHyperlinkBounds(pdfLoadedUriAnnotation.bounds, pageSize, page.rotation);
                if (isNullOrUndefined(this.renderer.hyperlinks)) {
                    this.renderer.hyperlinks = [];
                    this.renderer.hyperlinkBounds = [];
                }
                this.renderer.hyperlinks.push(pdfLoadedUriAnnotation.uri);
                this.renderer.hyperlinkBounds.push(rectangle);
            }
            else if (page.annotations.at(i) instanceof PdfTextWebLinkAnnotation) {
                var pdfLoadedTextWebLinkAnnotation = page.annotations.at(i);
                var rectangle = this.getHyperlinkBounds(pdfLoadedTextWebLinkAnnotation.bounds, pageSize, page.rotation);
                if (isNullOrUndefined(this.renderer.hyperlinks)) {
                    this.renderer.hyperlinks = [];
                    this.renderer.hyperlinkBounds = [];
                }
                this.renderer.hyperlinks.push(pdfLoadedTextWebLinkAnnotation.url);
                this.renderer.hyperlinkBounds.push(rectangle);
            }
            else if (page.annotations.at(i) instanceof PdfDocumentLinkAnnotation) {
                var pdfLoadedDocumentLinkAnnotation = page.annotations.at(i);
                var rectangle = this.getHyperlinkBounds(pdfLoadedDocumentLinkAnnotation.bounds, pageSize, page.rotation);
                if (isNullOrUndefined(this.renderer.annotationDestPage)) {
                    this.renderer.annotationDestPage = [];
                    this.renderer.annotationList = [];
                    this.renderer.annotationYPosition = [];
                }
                if (!isNullOrUndefined(pdfLoadedDocumentLinkAnnotation.destination)) {
                    var linkPageIndex = pdfLoadedDocumentLinkAnnotation.destination.pageIndex;
                    this.renderer.annotationDestPage.push(linkPageIndex);
                    this.renderer.annotationList.push(rectangle);
                    if (page.rotation === PdfRotationAngle.angle180) {
                        this.renderer.annotationYPosition.push(this.convertPointToPixel(Math.abs(pdfLoadedDocumentLinkAnnotation.
                            destination.location[1])));
                    }
                    else if (page.rotation === PdfRotationAngle.angle90 || page.rotation === PdfRotationAngle.angle270) {
                        this.renderer.annotationYPosition.push(pageSize.width -
                            this.convertPointToPixel(Math.abs(pdfLoadedDocumentLinkAnnotation.destination.location[1])));
                    }
                    else {
                        this.renderer.annotationYPosition.push(pageSize.height -
                            this.convertPointToPixel(Math.abs(pdfLoadedDocumentLinkAnnotation.destination.location[1])));
                    }
                }
            }
        }
    };
    PdfRenderer.prototype.getHyperlinkBounds = function (bounds, pageSize, pageRotation) {
        var bound;
        if (pageRotation === PdfRotationAngle.angle0) {
            bound = new AnnotBounds(this.convertPointToPixel(bounds.x), this.convertPointToPixel(bounds.y), this.convertPointToPixel(bounds.width), this.convertPointToPixel(bounds.height));
        }
        else if (pageRotation === PdfRotationAngle.angle90) {
            bound = new AnnotBounds(pageSize.width - this.convertPointToPixel(bounds.y - bounds.height), this.convertPointToPixel(bounds.x), this.convertPointToPixel(bounds.height), this.convertPointToPixel(bounds.width));
        }
        else if (pageRotation === PdfRotationAngle.angle180) {
            bound = new AnnotBounds(pageSize.width - this.convertPointToPixel(bounds.x - bounds.width), pageSize.height - this.convertPointToPixel(bounds.y - bounds.height), this.convertPointToPixel(bounds.width), this.convertPointToPixel(bounds.height));
        }
        else if (pageRotation === PdfRotationAngle.angle270) {
            bound = new AnnotBounds(this.convertPointToPixel(bounds.y), pageSize.height -
                this.convertPointToPixel(bounds.x - bounds.width), this.convertPointToPixel(bounds.height), this.convertPointToPixel(bounds.width));
        }
        return bound;
    };
    /**
     * @param {any} jsonObject - jsonObject
     * @param {boolean} isObjects - isObjects
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.exportFormFields = function (jsonObject, isObjects) {
        var formFields = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase);
        formFields.saveFormFieldsData(jsonObject);
        formFields.saveFormFieldsDesignerData(jsonObject);
        if (!Object.prototype.hasOwnProperty.call(jsonObject, 'fileName')) {
            jsonObject['fileName'] = 'undefined.pdf';
        }
        this.loadedDocument.form.exportEmptyFields = true;
        var dataFormat = DataFormat.json;
        if (Object.prototype.hasOwnProperty.call(jsonObject, 'formFieldDataFormat')) {
            dataFormat = this.exportDataFormat(jsonObject['formFieldDataFormat']);
        }
        var settings = new PdfFormFieldExportSettings();
        var fileName;
        var exportFormFieldObject;
        settings.dataFormat = dataFormat;
        if (isObjects) {
            exportFormFieldObject = this.loadedDocument.exportFormData(settings);
            return exportFormFieldObject;
        }
        else {
            fileName = this.changeFileExtension(this.pdfViewer.fileName, this.fileFormat(dataFormat));
            return this.loadedDocument.exportFormData(settings);
        }
    };
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {any} - any
     */
    PdfRenderer.prototype.importFormFields = function (jsonObject) {
        try {
            var formFields = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase);
            formFields.saveFormFieldsDesignerData(jsonObject);
            var dataFormat = this.exportDataFormat(jsonObject['formFieldDataFormat']);
            if (!this.isBase64(jsonObject['data']) && !this.isUint8Array(jsonObject['data'])) {
                if (jsonObject['formFieldDataFormat'] === 'Json') {
                    jsonObject['data'] = JSON.parse(jsonObject['data']);
                }
                var encoder = new TextEncoder();
                var uint8ArrayLike = encoder.encode(jsonObject['data']);
                jsonObject['data'] = new Uint8Array(uint8ArrayLike);
            }
            if (Object.prototype.hasOwnProperty.call(jsonObject, 'formFieldDataFormat')) {
                this.loadedDocument.importFormData(jsonObject['data'], dataFormat);
            }
            formFields = new FormFieldsBase(this.pdfViewer, this.pdfViewerBase);
            formFields.GetFormFields();
            var PdfRenderedFormFields = [];
            PdfRenderedFormFields = formFields.PdfRenderedFormFields;
            return { PdfRenderedFormFields: PdfRenderedFormFields };
        }
        catch (e) {
            return null;
        }
    };
    PdfRenderer.prototype.isUint8Array = function (value) {
        return value instanceof Uint8Array;
    };
    PdfRenderer.prototype.isBase64 = function (str) {
        // Base64 regular expression pattern
        /* eslint-disable-next-line security/detect-unsafe-regex */
        var base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return base64Regex.test(str);
    };
    PdfRenderer.prototype.exportDataFormat = function (format) {
        var exportFormat;
        switch (format) {
            case 'Json':
                exportFormat = DataFormat.json;
                break;
            case 'Xfdf':
                exportFormat = DataFormat.xfdf;
                break;
            case 'Fdf':
                exportFormat = DataFormat.fdf;
                break;
            case 'Xml':
                exportFormat = DataFormat.xml;
                break;
        }
        return exportFormat;
    };
    PdfRenderer.prototype.fileFormat = function (value) {
        var fileExtention;
        switch (value) {
            case 0:
                fileExtention = 'fdf';
                break;
            case 1:
                fileExtention = 'xfdf';
                break;
            case 2:
                fileExtention = 'json';
                break;
            case 3:
                fileExtention = 'xml';
                break;
        }
        return fileExtention;
    };
    /**
     * @param {number} pageIndex - It sets the page index
     * @private
     * @returns {Promise<string>} - promise
     */
    PdfRenderer.prototype.exportAsImage = function (pageIndex) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.pdfiumExportAsImage(pageIndex));
        });
    };
    /**
     * @param {number} startIndex - It gets the start index value
     * @param {number} endIndex - It gets the end index value
     * @private
     * @returns { Promise<string[]>} - Promise
     */
    PdfRenderer.prototype.exportAsImages = function (startIndex, endIndex) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.pdfiumExportAsImages(startIndex, endIndex));
        });
    };
    /**
     * @param {number} pageIndex - It gets the start index value
     * @param {Size} size - It gets the size value
     * @private
     * @returns { Promise<string[]>} - Promise
     */
    PdfRenderer.prototype.exportAsImagewithSize = function (pageIndex, size) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.pdfiumExportAsImage(pageIndex, size));
        });
    };
    /**
     * @param {number} startIndex - It gets the start index value
     * @param {number} endIndex - It gets the end index value
     * @param {Size} size - It gets the size value
     * @private
     * @returns { Promise<string[]>} - Promise
     */
    PdfRenderer.prototype.exportAsImagesWithSize = function (startIndex, endIndex, size) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.pdfiumExportAsImages(startIndex, endIndex, size));
        });
    };
    PdfRenderer.prototype.pdfiumExportAsImage = function (pageIndex, size) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        return new Promise(function (resolve, reject) {
            if (!isNullOrUndefined(_this.pdfViewerBase.pdfViewerRunner) && !isNullOrUndefined(_this.loadedDocument)) {
                size = !isNullOrUndefined(size) ? size : null;
                _this.pdfViewerBase.pdfViewerRunner.addTask({ pageIndex: pageIndex, message: 'extractImage', zoomFactor: _this.pdfViewer.magnificationModule.zoomFactor, isTextNeed: false, size: size }, TaskPriorityLevel.Medium);
                _this.pdfViewerBase.pdfViewerRunner.onMessage('imageExtracted', function (event) {
                    if (event.data.message === 'imageExtracted') {
                        var canvas = document.createElement('canvas');
                        var _a = event.data, value = _a.value, width = _a.width, height = _a.height;
                        canvas.width = width;
                        canvas.height = height;
                        var canvasContext = canvas.getContext('2d');
                        var imageData = canvasContext.createImageData(width, height);
                        imageData.data.set(value);
                        canvasContext.putImageData(imageData, 0, 0);
                        var imageUrl = canvas.toDataURL();
                        proxy.pdfViewerBase.releaseCanvas(canvas);
                        resolve(imageUrl);
                    }
                });
            }
            else {
                resolve(null);
            }
        });
    };
    PdfRenderer.prototype.pdfiumExportAsImages = function (startIndex, endIndex, size) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        return new Promise(function (resolve, reject) {
            if (!isNullOrUndefined(_this.pdfViewerBase.pdfViewerRunner) && !isNullOrUndefined(_this.loadedDocument)) {
                if (startIndex < 0) {
                    startIndex = 0;
                }
                if (endIndex > _this.loadedDocument.pageCount - 1) {
                    endIndex = _this.loadedDocument.pageCount - 1;
                }
                if (startIndex > endIndex) {
                    reject('Invalid page index');
                }
                size = !isNullOrUndefined(size) ? size : null;
                var imageUrls_1 = [];
                var count_1 = endIndex - startIndex + 1;
                for (var i = startIndex; i <= endIndex; i++) {
                    _this.pdfViewerBase.pdfViewerRunner.addTask({ pageIndex: i, message: 'extractImages', zoomFactor: _this.pdfViewer.magnificationModule.zoomFactor, isTextNeed: false, size: size }, TaskPriorityLevel.Medium);
                }
                _this.pdfViewerBase.pdfViewerRunner.onMessage('imagesExtracted', function (event) {
                    if (event.data.message === 'imagesExtracted') {
                        var canvas = document.createElement('canvas');
                        var _a = event.data, value = _a.value, width = _a.width, height = _a.height;
                        canvas.width = width;
                        canvas.height = height;
                        var canvasContext = canvas.getContext('2d');
                        var imageData = canvasContext.createImageData(width, height);
                        imageData.data.set(value);
                        canvasContext.putImageData(imageData, 0, 0);
                        var imageUrl = canvas.toDataURL();
                        proxy.pdfViewerBase.releaseCanvas(canvas);
                        imageUrls_1.push(imageUrl);
                        if (imageUrls_1.length === count_1) {
                            resolve(imageUrls_1);
                        }
                    }
                });
            }
            else {
                resolve(null);
            }
        });
    };
    /**
     * @param {any} event - event
     * @param {Function} [resolve] - An optional resolve function to complete a Promise when extraction is complete.
     * @param {number} [count] - An optional count of total expected results used for resolving multiple extractions.
     * @param {any[]} [textCollections] - An optional array for accumulating text data results when processing in bulk.
     * @private
     * @returns {any} - any
     */
    PdfRenderer.prototype.textExtractionOnmessage = function (event, resolve, count) {
        var pageText = '';
        var textData = [];
        if ((event.data.message.indexOf('extractText') !== -1) || event.data.message === 'renderThumbnail' || event.data.message === 'renderPreviewTileImage') {
            var characterDetails = event.data.characterBounds;
            for (var i = 0; i < characterDetails.length; i++) {
                if (!event.data.isLayout && characterDetails[parseInt(i.toString(), 10)].Text.indexOf('\r') !== -1) {
                    pageText += '';
                }
                else {
                    pageText += characterDetails[parseInt(i.toString(), 10)].Text;
                }
                var cropBox = this.loadedDocument.getPage(event.data.pageIndex).cropBox;
                var bound = new AnnotBounds(this.convertPixelToPoint(characterDetails[parseInt(i.toString(), 10)].X), this.convertPixelToPoint(characterDetails[parseInt(i.toString(), 10)].Y +
                    cropBox[1]), this.convertPixelToPoint(characterDetails[parseInt(i.toString(), 10)].Width), this.convertPixelToPoint(characterDetails[parseInt(i.toString(), 10)].Height));
                textData.push(new TextData(characterDetails[parseInt(i.toString(), 10)].Text, bound));
            }
            if (!event.data.isAPI) {
                var result = {};
                if (event.data.isRenderText) {
                    result.extractedTextDetails = { textDataCollection: textData, extractedText: pageText };
                    result.textBounds = event.data.textBounds;
                    result.textContent = event.data.textContent;
                    result.rotation = event.data.rotation;
                    result.pageText = event.data.pageText;
                    result.characterBounds = event.data.characterBounds;
                    result.isRenderText = event.data.isRenderText;
                    result.pageIndex = event.data.pageIndex;
                    result.jsonObject = event.data.jsonObject;
                    result.requestType = event.data.requestType;
                    result.annotationObject = event.data.annotationObject;
                    result.isNeedToRender = event.data.isNeedToRender;
                }
                else {
                    result = { textDataCollection: textData, extractedText: pageText,
                        isRenderText: event.data.isRenderText, pageIndex: event.data.pageIndex,
                        jsonObject: event.data.jsonObject, requestType: event.data.requestType,
                        annotationObject: event.data.annotationObject, isNeedToRender: event.data.isNeedToRender };
                }
                var pageTextDataCollection = this.getPageTextDataCollection(result);
                var documentTextCollection = this.getDocumentTextCollection(pageTextDataCollection);
                if (!isNullOrUndefined(documentTextCollection)) {
                    if (documentTextCollection.requestType === 'pageTextRequest') {
                        this.pdfViewerBase.pageTextRequestSuccess(documentTextCollection, documentTextCollection.pageIndex);
                    }
                    else if (documentTextCollection.requestType === 'textRequest') {
                        this.pdfViewerBase.textRequestSuccess(documentTextCollection, documentTextCollection.pageIndex, documentTextCollection.annotationObject);
                    }
                    else if (documentTextCollection.requestType === 'pdfTextSearchRequest') {
                        this.pdfViewer.textSearchModule.pdfTextSearchRequestSuccess(documentTextCollection, documentTextCollection.pageStartIndex, documentTextCollection.pageEndIndex);
                    }
                }
            }
            else {
                if ((event.data.message.indexOf('extractText') !== -1)) {
                    pageText = event.data.pageText;
                    var result = function () {
                        if (event.data.options === ExtractTextOption.BoundsOnly) {
                            return { textData: textData };
                        }
                        else if (event.data.options === ExtractTextOption.TextOnly) {
                            return { pageText: pageText };
                        }
                        else {
                            return { textData: textData, pageText: pageText };
                        }
                    };
                    this.textCollections.push(result());
                    if (count === 1) {
                        resolve(result());
                        this.textCollections = [];
                    }
                    else if (this.textCollections.length === count) {
                        resolve(this.textCollections);
                        this.textCollections = [];
                    }
                }
            }
        }
    };
    /**
     * Extracts text data and additional details from a range of pages in the PDF document.
     *
     * This method performs text extraction on multiple pages defined by the start and end indices,
     * and returns a promise that resolves to an object containing the extracted text data and page text.
     *
     * @param {number} startIndex - The index of the first page from which to start text extraction.
     * @param {number} endIndex - The index of the last page up to which text extraction should be performed.
     * @param {ExtractTextOption} options - Specifies options for text extraction, which may include bounds, text only, etc.
     * @param {boolean} isLayout - Get the isLayout value.
     * @private
     * @returns {Promise<{ textData: TextDataSettingsModel[], pageText: string }>} - A promise that resolves with an object containing
     * an array of text data models representing extracted content and the combined page text of the specified page range.
     */
    PdfRenderer.prototype.extractsText = function (startIndex, endIndex, options, isLayout) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.textExtraction(startIndex, endIndex, options, true, isLayout));
        });
    };
    PdfRenderer.prototype.extractTextFromCharacterDetails = function (characterDetails, cropBox, isLayout, options, documentPageText) {
        var pageText = '';
        var textData = [];
        if (characterDetails.length > 0) {
            for (var _i = 0, characterDetails_1 = characterDetails; _i < characterDetails_1.length; _i++) {
                var detail = characterDetails_1[_i];
                var text = detail.Text;
                if (options !== ExtractTextOption.BoundsOnly) {
                    if (!isLayout && text.indexOf('\r') !== -1) {
                        pageText += '';
                    }
                    else {
                        pageText += text;
                    }
                }
                if (options !== ExtractTextOption.TextOnly) {
                    var bound = new AnnotBounds(this.convertPixelToPoint(detail.X), this.convertPixelToPoint(detail.Y + cropBox[1]), this.convertPixelToPoint(detail.Width), this.convertPixelToPoint(detail.Height));
                    textData.push(new TextData(text, bound));
                }
            }
        }
        if (documentPageText) {
            pageText = documentPageText;
        }
        if (options === ExtractTextOption.BoundsOnly) {
            return { textData: textData };
        }
        else if (options === ExtractTextOption.TextOnly) {
            return { pageText: pageText };
        }
        else {
            return { textData: textData, pageText: pageText };
        }
    };
    PdfRenderer.prototype.textExtraction = function (startIndex, endIndex, options, isAPI, isLayout, isRenderText, jsonObject, requestType, annotationObject) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var isSkipCharacterBounds = !isAPI ?
            ((this.pdfViewer.extractTextOption === ExtractTextOption.None ||
                this.pdfViewer.extractTextOption === ExtractTextOption.TextOnly) ? true : false) : false;
        if (!isAPI) {
            this.documentTextCollection = [];
        }
        return new Promise(function (resolve, reject) {
            if (isNullOrUndefined(proxy.pdfViewerBase.pdfViewerRunner)) {
                resolve(null);
                return;
            }
            endIndex = Math.min(endIndex, proxy.pdfViewer.pageCount - 1);
            var count = endIndex - startIndex + 1;
            var fetchTextCollection = function (i) {
                return proxy.pdfViewer.textSearch.documentTextCollection[parseInt(i.toString(), 10)]
                    // eslint-disable-next-line max-len
                    ? proxy.pdfViewer.textSearch.documentTextCollection[parseInt(i.toString(), 10)][parseInt(i.toString(), 10)]
                    : null;
            };
            var processPage = function (i, msg) {
                var documentTextCollection = fetchTextCollection(i);
                if (isNullOrUndefined(documentTextCollection) || (!isNullOrUndefined(documentTextCollection) &&
                    (((options === ExtractTextOption.BoundsOnly || options === ExtractTextOption.TextAndBounds) &&
                        (!isNullOrUndefined(documentTextCollection.TextData) && documentTextCollection.TextData.length === 0) ||
                        isNullOrUndefined(documentTextCollection.TextData))) || ((options === ExtractTextOption.TextOnly &&
                    (!isNullOrUndefined(documentTextCollection.PageText) && documentTextCollection.PageText === '') ||
                    (isNullOrUndefined(documentTextCollection.PageText)))))) {
                    proxy.pdfViewerBase.pdfViewerRunner.addTask({
                        pageIndex: i,
                        message: msg,
                        zoomFactor: proxy.pdfViewer.magnificationModule.zoomFactor,
                        isTextNeed: true,
                        isLayout: isLayout,
                        isSkipCharacterBounds: isSkipCharacterBounds,
                        options: options,
                        isRenderText: isRenderText,
                        jsonObject: jsonObject,
                        requestType: requestType,
                        annotationObject: annotationObject,
                        isAPI: isAPI
                    }, !isAPI ? TaskPriorityLevel.Low : TaskPriorityLevel.Medium);
                    proxy.pdfViewerBase.pdfViewerRunner.onMessage(msg, function (event) {
                        if ((event.data.message.indexOf('extractText') !== -1)) {
                            proxy.textExtractionOnmessage(event, resolve, count);
                        }
                    });
                }
                else {
                    var cropBox = proxy.loadedDocument.getPage(i).cropBox;
                    var result = proxy.extractTextFromCharacterDetails(documentTextCollection.TextData, cropBox, isLayout, options, documentTextCollection.PageText);
                    proxy.textCollections.push(result);
                    if (count === 1) {
                        resolve(result);
                        proxy.textCollections = [];
                    }
                    else if (proxy.textCollections.length === count) {
                        resolve(proxy.textCollections);
                        proxy.textCollections = [];
                    }
                }
            };
            var msg = 'extractText';
            if (isAPI) {
                msg = 'extractText_' + PdfViewerUtils.createGUID();
            }
            if ((!isAPI && proxy.pdfViewer.extractTextOption !== ExtractTextOption.None) || isAPI) {
                for (var i = startIndex; i <= endIndex; i++) {
                    processPage(i, msg);
                }
            }
        });
    };
    PdfRenderer.prototype.getCharacterBounds = function (pageIndex) {
        var documentIndex = this.pdfViewer.textSearchModule.documentTextCollection[parseInt(pageIndex.toString(), 10)][parseInt(pageIndex.toString(), 10)];
        return documentIndex.textData || documentIndex.TextData;
    };
    /**
     * @param {any} textData - It describes about the text data
     * @private
     * @returns {any} - any
     */
    PdfRenderer.prototype.getPageTextDataCollection = function (textData) {
        var pageTextDataCollection = {};
        if (!isNullOrUndefined(textData)) {
            var textDetails = textData;
            if (textData.isRenderText) {
                textDetails = textData.extractedTextDetails;
                textDetails.extractedText = textData.pageText;
            }
            pageTextDataCollection[textData.pageIndex] =
                new PageTextData(new SizeBase(this.getPageSize(textData.pageIndex).width, this.getPageSize(textData.pageIndex).height), textDetails.textDataCollection, textDetails.extractedText);
            if (textData.isRenderText) {
                return ({ pageTextDataCollection: pageTextDataCollection, textBounds: textData.textBounds,
                    textContent: textData.textContent, rotation: textData.rotation, characterBounds: textData.characterBounds,
                    jsonObject: textData.jsonObject, requestType: textData.requestType, pageIndex: textData.pageIndex,
                    annotationObject: textData.annotationObject, isNeedToRender: textData.isNeedToRender });
            }
            else {
                return (pageTextDataCollection);
            }
        }
        else {
            return (null);
        }
    };
    /**
     * @param {any} value - It describes about the value
     * @private
     * @returns {any} - any
     */
    PdfRenderer.prototype.getDocumentTextCollection = function (value) {
        var pageStartIndex = !isNullOrUndefined(value.jsonObject.pageStartIndex) ? value.jsonObject.pageStartIndex :
            value.jsonObject.pageIndex;
        var pageEndIndex = !isNullOrUndefined(value.jsonObject.pageEndIndex) ? value.jsonObject.pageEndIndex :
            value.jsonObject.pageIndex + 1;
        var pageCount = this.loadedDocument.pageCount;
        var endNumber = !isNullOrUndefined(value.jsonObject.pageStartIndex) ? (pageEndIndex - pageStartIndex) : (pageCount);
        if (!isNullOrUndefined(value)) {
            this.documentTextCollection.push(value.pageTextDataCollection);
            if (this.documentTextCollection.length === endNumber) {
                return ({ uniqueId: value.jsonObject.uniqueId,
                    documentTextCollection: this.documentTextCollection,
                    pageStartIndex: pageStartIndex,
                    pageEndIndex: !isNullOrUndefined(value.jsonObject.pageEndIndex) ? pageEndIndex : pageCount,
                    textBounds: value.textBounds,
                    textContent: value.textContent,
                    rotation: value.rotation,
                    characterBounds: value.characterBounds,
                    requestType: value.requestType,
                    pageIndex: value.pageIndex,
                    annotationObject: value.annotationObject,
                    isNeedToRender: value.isNeedToRender
                });
            }
        }
        else {
            return (null);
        }
    };
    /**
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {Promise} - Promise
     */
    PdfRenderer.prototype.extractTextWithPageSize = function (pageIndex) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.extractTextDetailsWithPageSize(pageIndex));
        });
    };
    PdfRenderer.prototype.extractTextDetailsWithPageSize = function (pageIndex, isRenderText, jsonObject, requestType, annotationObject) {
        var pageTextDataCollection = {};
        this.textExtraction(pageIndex, pageIndex, null, false, true, isRenderText, jsonObject, requestType, annotationObject);
    };
    /**
     * @param {any} jsonObject - jsonObject
     * @param {string} requestType - It describes about the request type
     * @param {any} annotationObject - It describes about the annotation object
     * @private
     * @returns {void}
     */
    PdfRenderer.prototype.getDocumentText = function (jsonObject, requestType, annotationObject) {
        var pageStartIndex = !isNullOrUndefined(jsonObject.pageStartIndex) ? jsonObject.pageStartIndex : jsonObject.pageIndex;
        var pageEndIndex = !isNullOrUndefined(jsonObject.pageEndIndex) ? jsonObject.pageEndIndex : jsonObject.pageIndex + 1;
        var pageCount = this.loadedDocument.pageCount;
        if (this.pdfViewer.extractTextOption !== ExtractTextOption.None) {
            for (var pageIndex = pageStartIndex; pageIndex < pageEndIndex; pageIndex++) {
                this.extractTextDetailsWithPageSize(pageIndex, true, jsonObject, requestType, annotationObject);
            }
        }
        else {
            this.pdfViewer.fireTextExtractionCompleted([]);
        }
    };
    PdfRenderer.IsLinuxOS = false;
    PdfRenderer.IsWindowsOS = false;
    return PdfRenderer;
}());
export { PdfRenderer };
var TextData = /** @class */ (function () {
    function TextData(text, bounds) {
        this.Text = text;
        this.Bounds = bounds;
    }
    return TextData;
}());
var PageTextData = /** @class */ (function () {
    function PageTextData(pageSize, textData, pageText) {
        this.PageSize = pageSize;
        this.TextData = textData;
        this.PageText = pageText;
    }
    return PageTextData;
}());
/**
 *
 * @hidden
 */
var SizeBase = /** @class */ (function () {
    function SizeBase(_Width, _Height) {
        this.IsEmpty = true;
        this.Width = _Width;
        this.Height = _Height;
        this.IsEmpty = false;
    }
    return SizeBase;
}());
export { SizeBase };
/**
 *
 * @hidden
 */
var Annotations = /** @class */ (function () {
    function Annotations() {
    }
    return Annotations;
}());
export { Annotations };
