/**
 *@returns {void}
 */
export function PdfiumRunner() {
    var moduleString = 'Module';
    var pageLoaded = false;
    var moduleLoaded = false;
    var FPDF = {};
    // eslint-disable-next-line
    var pdfiumWindow = pdfiumWindow ? pdfiumWindow : {};
    var documentDetails;
    var PDFiumModule = typeof (pdfiumWindow["" + moduleString]) !== 'undefined' ? (pdfiumWindow["" + moduleString]) : {};
    var F64 = Float64Array;
    var H = function (t, s, d) { return function (f) {
        var _a = pdfiumWindow.heap(t, s), m = _a[0], a = _a.slice(1);
        var v = f.apply(void 0, a.map(function (x) { return x.p; }));
        if (!v) {
            m.free();
            return d;
        }
        var r = a.map(function (x) { return x.v; });
        m.free();
        return r;
    }; };
    Object.assign(FPDF, {
        LCD_TEXT: 0x02,
        NO_NATIVETEXT: 0x04,
        GRAYSCALE: 0x08,
        DEBUG_INFO: 0x80,
        NO_CATCH: 0x100,
        RENDER_LIMITEDIMAGECACHE: 0x200,
        RENDER_FORCEHALFTONE: 0x400,
        PRINTING: 0x800,
        REVERSE_BYTE_ORDER: 0x10,
        // eslint-disable-next-line
        Bitmap_Gray: 1,
        // eslint-disable-next-line
        Bitmap_BGR: 2,
        // eslint-disable-next-line
        Bitmap_BGRx: 3,
        // eslint-disable-next-line
        Bitmap_BGRA: 4,
        LAST_ERROR: {
            SUCCESS: 0,
            UNKNOWN: 1,
            FILE: 2,
            FORMAT: 3,
            PASSWORD: 4,
            SECURITY: 5,
            PAGE: 6
        }
    });
    /**
     *@returns {void}
     */
    function initializeFPDF() {
        FPDF.Init = PDFiumModule.cwrap('FPDF_InitLibrary');
        FPDF.RenderPageBitmap = PDFiumModule.cwrap('FPDF_RenderPageBitmap', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
        // eslint-disable-next-line
        FPDF.Bitmap_FillRect = PDFiumModule.cwrap('FPDFBitmap_FillRect', '', ['number', 'number', 'number', 'number', 'number', 'number']);
        // eslint-disable-next-line
        FPDF.Bitmap_CreateEx = PDFiumModule.cwrap('FPDFBitmap_CreateEx', 'number', ['number', 'number', 'number', 'number', 'number']);
        // eslint-disable-next-line
        FPDF.Bitmap_Destroy = PDFiumModule.cwrap('FPDFBitmap_Destroy', '', ['number']);
        FPDF.LoadPage = PDFiumModule.cwrap('FPDF_LoadPage', 'number', ['number', 'number']);
        FPDF.ClosePage = PDFiumModule.cwrap('FPDF_ClosePage', '', ['number']);
        FPDF.LoadMemDocument = PDFiumModule.cwrap('FPDF_LoadMemDocument', 'number', ['number', 'number', 'string']);
        FPDF.GetPageSizeByIndex = PDFiumModule.cwrap('FPDF_GetPageSizeByIndex', 'number', ['number', 'number', 'number', 'number']);
        FPDF.GetLastError = PDFiumModule.cwrap('FPDF_GetLastError', 'number');
        FPDF.GetPageCount = PDFiumModule.cwrap('FPDF_GetPageCount', 'number', ['number']);
        FPDF.CloseDocument = PDFiumModule.cwrap('FPDF_CloseDocument', '', ['number']);
        FPDF.DestroyLibrary = PDFiumModule.cwrap('FPDF_DestroyLibrary');
        FPDF.LoadTextPage = PDFiumModule.cwrap('FPDFText_LoadPage', 'number', ['number']);
        FPDF.CloseTextPage = PDFiumModule.cwrap('FPDFText_ClosePage', '', ['number']);
        FPDF.TextCountChars = PDFiumModule.cwrap('FPDFText_CountChars', 'number', ['number']);
        FPDF.GetUnicodeChar = PDFiumModule.cwrap('FPDFText_GetUnicode', 'number', ['number']);
        FPDF.GetCharBox = PDFiumModule.cwrap('FPDFText_GetCharBox', 'number', ['number', 'number', 'number', 'number', 'number']);
        FPDF.GetPageRotation = PDFiumModule.cwrap('FPDFPage_GetRotation', 'number', ['number']);
        FPDF.GetCharAngle = PDFiumModule.cwrap('FPDFText_GetCharAngle', 'number', ['number']);
        FPDF.TextFindStart = PDFiumModule.cwrap('FPDFText_FindStart', '', ['number', 'number', 'number', 'number']);
        FPDF.TextFindClose = PDFiumModule.cwrap('FPDFText_FindClose', '', ['number']);
        FPDF.TextFindNext = PDFiumModule.cwrap('FPDFText_FindNext', '', ['number']);
        FPDF.TextFindResultIndex = PDFiumModule.cwrap('FPDFText_GetSchResultIndex', '', ['number']);
        FPDF.TextFindCount = PDFiumModule.cwrap('FPDFText_GetSchCount', '', ['number']);
        FPDF.GetPageHeight = PDFiumModule.cwrap('FPDF_GetPageHeight', 'number', ['number']);
        FPDF.GetPageHeight = PDFiumModule.cwrap('FPDF_GetPageHeight', 'number', ['number']);
        FPDF.GetPageWidth = PDFiumModule.cwrap('FPDF_GetPageWidth', 'number', ['number']);
        pdfiumWindow.heap = function (J, s) {
            var E;
            switch (J) {
                case Int8Array:
                    E = PDFiumModule.HEAP8;
                    break;
                case Int16Array:
                    E = PDFiumModule.HEAP16;
                    break;
                case Int32Array:
                    E = PDFiumModule.HEAP32;
                    break;
                case Uint8Array:
                    E = PDFiumModule.HEAPU8;
                    break;
                case Uint16Array:
                    E = PDFiumModule.HEAPU16;
                    break;
                case Uint32Array:
                    E = PDFiumModule.HEAPU32;
                    break;
                case Float32Array:
                    E = PDFiumModule.HEAPF32;
                    break;
                case Float64Array:
                    E = PDFiumModule.HEAPF64;
                    break;
            }
            var Z = J.BYTES_PER_ELEMENT;
            var m = PDFiumModule.asm.malloc(s * Z);
            var a = Array(1 + s);
            a[0] = ({ s: s, J: J, Z: Z, E: E, m: m, free: function () { return PDFiumModule.asm.free(m); } });
            var _loop_1 = function (i) {
                a[i + 1] = ({ p: m + (i * Z), get v() { return E[m / Z + i]; } });
            };
            for (var i = 0; i < s; i++) {
                _loop_1(i);
            }
            return a;
        };
    }
    /**
     *@returns {void}
     */
    function checkIfEverythingWasLoaded() {
        pageLoaded = true;
        if (pageLoaded || moduleLoaded) {
            startApp();
        }
    }
    PDFiumModule.onRuntimeInitialized = function () {
        moduleLoaded = true;
        checkIfEverythingWasLoaded();
    };
    /**
     *@returns {void}
     */
    function startApp() {
        initializeFPDF();
        if (pdfiumWindow.loaded) {
            pdfiumWindow.loaded();
        }
    }
    pdfiumWindow.onload = function () {
        pageLoaded = true;
        checkIfEverythingWasLoaded();
    };
    pdfiumWindow.loaded = function () {
        ctx.postMessage({ message: 'loaded' });
    };
    var ctx = self;
    ctx.onmessage = function (event) {
        if (event.data.message === 'initialLoading') {
            importScripts(event.data.url + '/pdfium.js');
            PDFiumModule.url = event.data.url;
            PDFiumModule.onRuntimeInitialized = function () {
                moduleLoaded = true;
                checkIfEverythingWasLoaded();
                if (event.data.fonts && Object.keys(event.data.fonts).length > 0) {
                    var filePath = '/usr/share/fonts/';
                    PDFiumModule.FS.createPath('/', filePath, true, true);
                    for (var key in event.data.fonts) {
                        if (event.data.fonts["" + key] && key.indexOf('fallbackfonts') === -1) {
                            PDFiumModule.FS.createDataFile(filePath + key, null, event.data.fonts["" + key], true, true, true);
                        }
                    }
                }
            };
            this['PDFiumModule'](PDFiumModule);
        }
        else if (event.data.message === 'LoadPageCollection') {
            pdfiumWindow.fileByteArray = event.data.uploadedFile;
            var fileSize = pdfiumWindow.fileByteArray.length;
            FPDF.Init();
            var wasmBuffer = PDFiumModule.asm.malloc(fileSize);
            PDFiumModule.HEAPU8.set(pdfiumWindow.fileByteArray, wasmBuffer);
            pdfiumWindow.fileByteArray = null;
            documentDetails = new DocumentInfo({
                wasm: FPDF.LoadMemDocument(wasmBuffer, fileSize, event.data.password),
                wasmBuffer: wasmBuffer
            });
            var pages = FPDF.GetPageCount(documentDetails.processor.wasmData.wasm);
            documentDetails.setPages(pages);
            documentDetails.createAllPages();
            ctx.postMessage({ message: 'PageLoaded', pageIndex: event.data.pageIndex, isZoomMode: event.data.isZoomMode });
        }
        else if (event.data.message === 'LoadPageStampCollection') {
            var fileSize = event.data.uploadedFile.length;
            FPDF.Init();
            var wasmBuffer = PDFiumModule.asm.malloc(fileSize);
            PDFiumModule.HEAPU8.set(event.data.uploadedFile, wasmBuffer);
            var documentDetailsNew = new DocumentInfo({
                wasm: FPDF.LoadMemDocument(wasmBuffer, fileSize, event.data.password),
                wasmBuffer: wasmBuffer
            });
            var pages = FPDF.GetPageCount(documentDetailsNew.processor.wasmData.wasm);
            documentDetailsNew.setPages(pages);
            documentDetailsNew.createAllPages();
            var firstPage = documentDetailsNew.getPage(event.data.pageIndex);
            var ImageData_1 = event.data;
            var data = firstPage.render(null, ImageData_1.zoomFactor, false, null, null, null, true);
            data.message = 'LoadedStamp';
            data.annotName = event.data.AnnotName;
            data.rubberStampAnnotationPageNumber = event.data.rubberStampAnnotationPageNumber;
            data.annotationOrder = event.data.annotationOrder;
            data.collectionOrder = event.data.collectionOrder;
            data.isFormField = event.data.isFormField;
            if (data.isFormField) {
                data.message = 'LoadedStampForFormFields';
                data.formFieldName = event.data.formFieldName;
                data.formFieldList = event.data.formFieldList;
                data.formFields = event.data.rubberStampAnnotation;
                data.PageIndex = event.data.PageIndex;
            }
            ctx.postMessage(data);
        }
        if (documentDetails) {
            if (event.data.message === 'renderPage') {
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var ImageData_2 = event.data;
                var data = firstPage.render(null, ImageData_2.zoomFactor, ImageData_2.isTextNeed, null, null, ImageData_2.textDetailsId, null, event.data.cropBoxRect, event.data.mediaBoxRect);
                ctx.postMessage(data);
            }
            else if (event.data.message === 'renderPageSearch') {
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var ImageData_3 = event.data;
                var data = firstPage.render(null, ImageData_3.zoomFactor, ImageData_3.isTextNeed, null, null, ImageData_3.textDetailsId, null, event.data.cropBoxRect);
                data.message = 'imageRenderedSearch';
                ctx.postMessage(data);
            }
            else if (event.data.message.indexOf('extractText') !== -1) {
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var ImageData_4 = event.data;
                var isSkipCharacterBounds = event.data.isSkipCharacterBounds;
                var data = firstPage.render('extractText', ImageData_4.zoomFactor, ImageData_4.isTextNeed, null, null, ImageData_4.textDetailsId, null, null, null, null, isSkipCharacterBounds);
                data.message = event.data.message;
                data.isLayout = event.data.isLayout;
                data.isRenderText = event.data.isRenderText;
                data.jsonObject = event.data.jsonObject;
                data.requestType = event.data.requestType;
                data.annotationObject = event.data.annotationObject;
                data.pageIndex = event.data.pageIndex;
                data.options = event.data.options;
                data.isAPI = event.data.isAPI;
                data.isNeedToRender = event.data.isNeedToRender;
                ctx.postMessage(data);
            }
            else if (event.data.message === 'searchText') {
                var pagesCount = FPDF.GetPageCount(documentDetails.processor.wasmData.wasm);
                var searchTerm = event.data.searchWord;
                var buffer = new Uint16Array(searchTerm.length + 1);
                for (var i = 0; i < searchTerm.length; i++) {
                    buffer[parseInt(i.toString(), 10)] = searchTerm.charCodeAt(i);
                }
                buffer[searchTerm.length] = 0;
                var pointer = PDFiumModule.asm.malloc(buffer.length * buffer.BYTES_PER_ELEMENT);
                PDFiumModule.HEAPU16.set(buffer, pointer / Uint16Array.BYTES_PER_ELEMENT);
                var occurrencesCount = 0;
                var isMatchCase = (event.data.matchCase === true) ? 1 : 0;
                var startIndex = event.data.startIndex;
                var endIndex = event.data.endIndex;
                var pageSearchCounts = {};
                var _loop_2 = function (a) {
                    var pageOccurrence = -1;
                    var page = FPDF.LoadPage(documentDetails.processor.wasmData.wasm, a);
                    var textPage = FPDF.LoadTextPage(page);
                    var searchHandle = FPDF.TextFindStart(textPage, pointer, isMatchCase, 0);
                    var pageHeight = FPDF.GetPageHeight(page);
                    var _loop_3 = function () {
                        occurrencesCount++;
                        pageOccurrence++;
                        var charLength = FPDF.TextFindCount(searchHandle);
                        var startIndex_1 = FPDF.TextFindResultIndex(searchHandle);
                        if (!pageSearchCounts[parseInt(a.toString(), 10)]) {
                            pageSearchCounts[parseInt(a.toString(), 10)] = { Indices: [], Bounds: {}, pageOccurrence: 0 };
                        }
                        if (!pageSearchCounts[parseInt(a.toString(), 10)].Bounds[parseInt(pageOccurrence.toString(), 10)]) {
                            pageSearchCounts[parseInt(a.toString(), 10)].Bounds[parseInt(pageOccurrence.toString(), 10)] = [];
                        }
                        pageSearchCounts[parseInt(a.toString(), 10)].Indices.push(startIndex_1);
                        var charLeft = Number.POSITIVE_INFINITY;
                        var charRight = 0;
                        var charBottom = Number.POSITIVE_INFINITY;
                        var charTop = 0;
                        var _loop_4 = function (i) {
                            var resultPage = FPDF.GetUnicodeChar(textPage, startIndex_1 + i);
                            var character = String.fromCharCode(resultPage);
                            if (character !== '\r') {
                                if (character !== '\n') {
                                    var result_1 = H(F64, 4, [-1, -1, -1, -1])(function (left, right, bottom, top) {
                                        return FPDF.GetCharBox(textPage, startIndex_1 + i, left, right, bottom, top);
                                    });
                                    charLeft = Math.min(charLeft, result_1[0]);
                                    charRight = Math.max(charRight, result_1[1]);
                                    charBottom = Math.min(charBottom, result_1[2]);
                                    charTop = Math.max(charTop, result_1[3]);
                                }
                            }
                            if (character === '\r') {
                                var characterBounds_1 = new RectAngle((charLeft * (96 / 72)), ((pageHeight - (charTop - charBottom) - charBottom) * (96 / 72)), ((charRight - charLeft) * (96 / 72)), ((charTop - charBottom) * (96 / 72)), '', null);
                                pageSearchCounts[parseInt(a.toString(), 10)].Bounds[parseInt(pageOccurrence.toString(), 10)]
                                    .push(characterBounds_1);
                                pageSearchCounts[parseInt(a.toString(), 10)].Bounds[parseInt(pageOccurrence.toString(), 10)].sort(function (a, b) {
                                    return a.Top === b.Top ? a.Left - b.Left : a.Top - b.Top;
                                });
                                charLeft = Number.POSITIVE_INFINITY;
                                charRight = 0;
                                charBottom = Number.POSITIVE_INFINITY;
                                charTop = 0;
                            }
                        };
                        for (var i = 0; i < charLength; i++) {
                            _loop_4(i);
                        }
                        var characterBounds = new RectAngle((charLeft * (96 / 72)), ((pageHeight - (charTop - charBottom) - charBottom) * (96 / 72)), ((charRight - charLeft) * (96 / 72)), ((charTop - charBottom) * (96 / 72)), '', null);
                        pageSearchCounts[parseInt(a.toString(), 10)].Bounds[parseInt(pageOccurrence.toString(), 10)].push(characterBounds);
                        pageSearchCounts[parseInt(a.toString(), 10)].Bounds[parseInt(pageOccurrence.toString(), 10)].sort(function (a, b) {
                            return a.Top === b.Top ? a.Left - b.Left : a.Top - b.Top;
                        });
                        pageSearchCounts[parseInt(a.toString(), 10)].pageOccurrence = pageOccurrence + 1;
                    };
                    while (FPDF.TextFindNext(searchHandle)) {
                        _loop_3();
                    }
                    FPDF.TextFindClose(searchHandle);
                    FPDF.ClosePage(page);
                };
                for (var a = startIndex; a < endIndex; a++) {
                    _loop_2(a);
                }
                var result = {
                    totalSearchCount: occurrencesCount,
                    resultPages: pageSearchCounts,
                    message: 'textSearched',
                    searchWord: searchTerm,
                    matchCase: event.data.matchCase,
                    isRequestsend: event.data.isRequestsend,
                    isCompletedSearch: (endIndex === pagesCount) ? true : false,
                    endIndex: endIndex
                };
                ctx.postMessage(result);
                pageSearchCounts = {};
                PDFiumModule.asm.free(pointer);
            }
            else if (event.data.message === 'renderThumbnail') {
                // eslint-disable-next-line
                var thumbnail = new Promise(function (resolve, reject) {
                    try {
                        var firstPage = documentDetails.getPage(event.data.pageIndex);
                        if (firstPage.processor !== null && firstPage.processor !== undefined) {
                            var data = firstPage.render('thumbnail', null, event.data.isTextNeed, null, null, null, null, null, null, null, event.data.isSkipCharacterBounds);
                            data.isRenderText = event.data.isRenderText;
                            data.jsonObject = event.data.jsonObject;
                            data.requestType = event.data.requestType;
                            resolve(data);
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
                });
                thumbnail.then(function (results) {
                    ctx.postMessage(results);
                });
            }
            else if (event.data.message === 'renderPreviewTileImage') {
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var data = firstPage.render('thumbnail', null, event.data.isTextNeed, null, null, null, null, null, null, null, event.data.isSkipCharacterBounds);
                data.message = 'renderPreviewTileImage';
                data.isRenderText = event.data.isRenderText;
                data.jsonObject = event.data.jsonObject;
                data.requestType = event.data.requestType;
                data.startIndex = event.data.startIndex;
                data.endIndex = event.data.endIndex;
                ctx.postMessage(data);
            }
            else if (event.data.message === 'printImage') {
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var data = firstPage.render('print', null, false, event.data.printScaleFactor, event.data.printDevicePixelRatio);
                ctx.postMessage(data);
            }
            else if (event.data.message === 'extractImage' || event.data.message === 'extractImages') {
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var ImageData_5 = event.data;
                var data = firstPage.render(null, ImageData_5.zoomFactor, ImageData_5.isTextNeed, null, null, ImageData_5.textDetailsId, null, null, null, event.data.size);
                if (event.data.message === 'extractImage') {
                    data.message = 'imageExtracted';
                }
                if (event.data.message === 'extractImages') {
                    data.message = 'imagesExtracted';
                }
                ctx.postMessage(data);
            }
            else if (event.data.message === 'renderImageAsTile') {
                var values = event.data;
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var data = firstPage.renderTileImage(values.tileX, values.tileY, values.tileXCount, values.tileYCount, values.zoomFactor, event.data.isTextNeed, event.data.textDetailsId, event.data.cropBoxRect, event.data.mediaBoxRect);
                ctx.postMessage(data);
            }
            else if (event.data.message === 'renderImageAsTileSearch') {
                var values = event.data;
                var firstPage = documentDetails.getPage(event.data.pageIndex);
                var data = firstPage.renderTileImage(values.tileX, values.tileY, values.tileXCount, values.tileYCount, values.zoomFactor, event.data.isTextNeed, event.data.textDetailsId, event.data.cropBoxRect, event.data.mediaBoxRect);
                data.message = 'renderTileImageSearch';
                ctx.postMessage(data);
            }
            else if (event.data.message === 'unloadFPDF') {
                if (documentDetails) {
                    PDFiumModule.asm.free(documentDetails.processor.wasmData.wasmBuffer);
                    FPDF.CloseDocument(documentDetails.processor.wasmData.wasm);
                    FPDF.DestroyLibrary();
                }
            }
        }
        if (event.data.message === 'unloadFPDF') {
            ctx.postMessage({ message: '' });
        }
    };
    var Page = /** @class */ (function () {
        function Page(index, processor) {
            this.index = index;
            this.src = null;
            this.processor = processor;
        }
        Page.prototype.render = function (message, zoomFactor, isTextNeed, printScaleFactor, printDevicePixelRatio, textDetailsId, isTransparent, cropBoxRect, mediaBoxRect, size, isSkipCharacterBounds) {
            return this.processor.render(this.index, message, zoomFactor, isTextNeed, printScaleFactor, printDevicePixelRatio, textDetailsId, isTransparent, cropBoxRect, mediaBoxRect, size, isSkipCharacterBounds);
        };
        Page.prototype.renderTileImage = function (x, y, tileX, tileY, zoomFactor, isTextNeed, textDetailsId, cropBoxRect, mediaBoxRect) {
            return this.processor.renderTileImage(this.index, x, y, tileX, tileY, zoomFactor, isTextNeed, textDetailsId, cropBoxRect, mediaBoxRect);
        };
        return Page;
    }());
    var RectAngle = /** @class */ (function () {
        function RectAngle(X, Y, Width, Height, Text, Rotation) {
            this.X = X;
            this.Y = Y;
            this.Width = Width;
            this.Height = Height;
            this.Bottom = this.Y + this.Height;
            this.Right = this.X + this.Width;
            this.Top = this.Y;
            this.Left = this.X;
            this.Rotation = Rotation;
            this.Text = Text;
        }
        return RectAngle;
    }());
    var Processor = /** @class */ (function () {
        function Processor(wasmData) {
            this.TextBounds = [];
            this.TextContent = [];
            this.CharacterBounds = [];
            this.PageText = '';
            this.wasmData = wasmData;
        }
        Processor.prototype.getPageSize = function (i) {
            var _this = this;
            if (i === void 0) { i = 0; }
            return H(F64, 2, [-1, -1])(function (w, h) { return FPDF.GetPageSizeByIndex(_this.wasmData.wasm, i, w, h); }).
                map(function (v) { return parseInt((v * (96 / 72)).toString(), 10); });
        };
        Processor.prototype.getCharBounds = function (pagePointer, i) {
            if (i === void 0) { i = 0; }
            return H(F64, 4, [-1, -1, -1, -1])(function (left, right, bottom, top) { return FPDF.
                GetCharBox(pagePointer, i, left, right, bottom, top); });
        };
        Processor.prototype.getRender = function (i, w, h, isTextNeed, isTransparent, cropBoxRect, mediaBoxRect, isSkipCharacterBounds) {
            if (i === void 0) { i = 0; }
            var flag = FPDF.REVERSE_BYTE_ORDER;
            var heap = PDFiumModule.asm.malloc(w * h * 4);
            PDFiumModule.HEAPU8.fill(0, heap, heap + (w * h * 4));
            var bmap = FPDF.Bitmap_CreateEx(w, h, FPDF.Bitmap_BGRA, heap, w * 4);
            var page = FPDF.LoadPage(this.wasmData.wasm, i);
            FPDF.Bitmap_FillRect(bmap, 0, 0, w, h, isTransparent ? 0x00FFFFFF : 0xFFFFFFFF);
            FPDF.RenderPageBitmap(bmap, page, 0, 0, w, h, 0, flag);
            FPDF.Bitmap_Destroy(bmap);
            this.textExtraction(page, i, isTextNeed, cropBoxRect, mediaBoxRect, isSkipCharacterBounds);
            FPDF.ClosePage(page);
            return heap;
        };
        Processor.prototype.textExtraction = function (pagePointer, pageIndex, isTextNeed, cropBoxRect, mediaBoxRect, isSkipCharacterBounds) {
            var _a;
            if (isTextNeed) {
                // eslint-disable-next-line
                var _b = this.getPageSize(pageIndex), pageWidth = _b[0], pageHeight = _b[1];
                pageHeight = pageHeight + this.pointerToPixelConverter(mediaBoxRect && mediaBoxRect.y ? mediaBoxRect.y : 0);
                var textPage = FPDF.LoadTextPage(pagePointer, pageIndex);
                var pageRotation = FPDF.GetPageRotation(pagePointer);
                var totalCharacterCount = FPDF.TextCountChars(textPage);
                this.TextBounds = [];
                this.TextContent = [];
                this.CharacterBounds = [];
                var pageText = '';
                var minTop = 0;
                var maxBottom = 0;
                var minLeft = 0;
                var maxRight = 0;
                var top_1 = [];
                var bottom = [];
                var left = [];
                var right = [];
                var wordBounds = [];
                var word = '';
                var wordMinLeft = 0;
                var wordMaxRight = 0;
                var wordMinTop = 0;
                var wordMaxBottom = 0;
                var wordRotation = 0;
                var wordStart = true;
                var isZeroWidthSpace = false;
                var isPreviousSpace = false;
                var startNewLine = false;
                var maximumSpaceForNewLine = 11;
                for (var charCount = 0; charCount <= totalCharacterCount; charCount++) {
                    if (!isSkipCharacterBounds) {
                        var result = FPDF.GetUnicodeChar(textPage, charCount);
                        var rotationRadian = FPDF.GetCharAngle(textPage, charCount);
                        var character = String.fromCharCode(result);
                        var _c = this.getCharBounds(textPage, charCount), charLeft = _c[0], charRight = _c[1], charBottom = _c[2], charTop = _c[3];
                        var X = this.pointerToPixelConverter(charLeft) -
                            this.pointerToPixelConverter(cropBoxRect && cropBoxRect.x ? cropBoxRect.x : 0);
                        var Y = (pageHeight + this.pointerToPixelConverter(cropBoxRect && cropBoxRect.y ? cropBoxRect.y : 0)) -
                            this.pointerToPixelConverter(charTop);
                        var Width = this.pointerToPixelConverter(charRight - charLeft);
                        var Height = this.pointerToPixelConverter(charTop - charBottom);
                        var rotationAngle = parseInt((rotationRadian * 180 / Math.PI).toString(), 10);
                        if (charCount < totalCharacterCount) {
                            pageText += character;
                            var currentCharacterBounds = new RectAngle(X, Y, Width, Height, character, rotationAngle);
                            this.CharacterBounds.push(currentCharacterBounds);
                        }
                        if (pageRotation === 1 || pageRotation === 3) {
                            Y = (pageWidth) - this.pointerToPixelConverter(charTop);
                        }
                        switch (character) {
                            case '\0': {
                                // eslint-disable-next-line
                                minTop = Math.min.apply(Math, top_1);
                                // eslint-disable-next-line
                                maxBottom = Math.max.apply(Math, bottom);
                                // eslint-disable-next-line
                                minLeft = Math.min.apply(Math, left);
                                // eslint-disable-next-line
                                maxRight = Math.max.apply(Math, right);
                                var newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                wordBounds.push(newWordBounds);
                                this.textBoundsCalculation(wordBounds, minTop, maxBottom, maxRight, minLeft, pageRotation, pageWidth, pageHeight);
                                wordBounds = [];
                                wordStart = true;
                                isPreviousSpace = false;
                                word = '';
                                top_1 = [];
                                left = [];
                                bottom = [];
                                right = [];
                                minTop = 0;
                                maxBottom = 0;
                                minLeft = 0;
                                maxRight = 0;
                                break;
                            }
                            case '\r':
                                if (charCount < totalCharacterCount) {
                                    var characterBounds = new RectAngle(X, Y, Width, Height, '\r\n', rotationAngle);
                                    top_1.push(characterBounds.Top);
                                    bottom.push(characterBounds.Bottom);
                                    left.push(characterBounds.Left);
                                    right.push(characterBounds.Right);
                                    // eslint-disable-next-line
                                    minTop = Math.min.apply(Math, top_1);
                                    // eslint-disable-next-line
                                    maxBottom = Math.max.apply(Math, bottom);
                                    // eslint-disable-next-line
                                    minLeft = Math.min.apply(Math, left);
                                    // eslint-disable-next-line
                                    maxRight = Math.max.apply(Math, right);
                                    var newWordBounds = void 0;
                                    if (wordStart === false) {
                                        newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                        wordBounds.push(newWordBounds);
                                    }
                                    wordBounds.push(characterBounds);
                                    this.textBoundsCalculation(wordBounds, minTop, maxBottom, maxRight, minLeft, pageRotation, pageWidth, pageHeight);
                                    wordBounds = [];
                                    wordStart = true;
                                    isPreviousSpace = false;
                                    word = '';
                                    top_1 = [];
                                    left = [];
                                    bottom = [];
                                    right = [];
                                    minTop = 0;
                                    maxBottom = 0;
                                    minLeft = 0;
                                    maxRight = 0;
                                    pageText += '\n';
                                    rotationRadian = FPDF.GetCharAngle(textPage, charCount);
                                    _a = this.getCharBounds(textPage, charCount), charLeft = _a[0], charRight = _a[1], charBottom = _a[2], charTop = _a[3];
                                    X = this.pointerToPixelConverter(charLeft);
                                    Y = (pageHeight) - this.pointerToPixelConverter(charTop);
                                    Width = this.pointerToPixelConverter(charRight - charLeft);
                                    Height = this.pointerToPixelConverter(charTop - charBottom);
                                    rotationAngle = parseInt((rotationRadian * 180 / Math.PI).toString(), 10);
                                    var currentCharacterBounds = new RectAngle(X, Y, Width, Height, character, rotationAngle);
                                    this.CharacterBounds.push(currentCharacterBounds);
                                    charCount++;
                                }
                                break;
                            case '\u0002':
                            case '\ufffe':
                                {
                                    var characterBounds = new RectAngle(X, Y, Width, Height, character, rotationAngle);
                                    top_1.push(characterBounds.Top);
                                    bottom.push(characterBounds.Bottom);
                                    left.push(characterBounds.Left);
                                    right.push(characterBounds.Right);
                                    // eslint-disable-next-line
                                    minTop = Math.min.apply(Math, top_1);
                                    // eslint-disable-next-line
                                    maxBottom = Math.max.apply(Math, bottom);
                                    // eslint-disable-next-line
                                    minLeft = Math.min.apply(Math, left);
                                    // eslint-disable-next-line
                                    maxRight = Math.max.apply(Math, right);
                                    var newWordBounds = void 0;
                                    if (wordStart === false) {
                                        newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                        wordBounds.push(newWordBounds);
                                    }
                                    if (character === '\u0002') {
                                        wordBounds.push(characterBounds);
                                    }
                                    this.textBoundsCalculation(wordBounds, minTop, maxBottom, maxRight, minLeft, pageRotation, pageWidth, pageHeight);
                                    wordBounds = [];
                                    wordStart = true;
                                    isPreviousSpace = false;
                                    word = '';
                                    top_1 = [];
                                    left = [];
                                    bottom = [];
                                    right = [];
                                    minTop = 0;
                                    maxBottom = 0;
                                    minLeft = 0;
                                    maxRight = 0;
                                }
                                break;
                            default:
                                if (Width === 0 || Height === 0) {
                                    isZeroWidthSpace = true;
                                    // eslint-disable-next-line
                                    minTop = Math.min.apply(Math, top_1);
                                    // eslint-disable-next-line
                                    maxBottom = Math.max.apply(Math, bottom);
                                    // eslint-disable-next-line
                                    minLeft = Math.min.apply(Math, left);
                                    // eslint-disable-next-line
                                    maxRight = Math.max.apply(Math, right);
                                    var newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                    wordBounds.push(newWordBounds);
                                    var characterBounds = new RectAngle(X, Y, Width, Height, character, rotationAngle);
                                    wordMinTop = characterBounds.Top;
                                    wordMaxBottom = characterBounds.Bottom;
                                    wordMinLeft = characterBounds.Left;
                                    wordMaxRight = characterBounds.Right;
                                    word = character;
                                    wordRotation = wordBounds[wordBounds.length - 1].Rotation;
                                    newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                    wordBounds.push(newWordBounds);
                                    wordMinTop = 0;
                                    wordMaxBottom = 0;
                                    wordMinLeft = 0;
                                    wordMaxRight = 0;
                                    word = '';
                                    wordRotation = 0;
                                    wordStart = true;
                                    isPreviousSpace = true;
                                }
                                else {
                                    if (wordStart === true) {
                                        wordMinTop = Y;
                                        wordMaxBottom = Y + Height;
                                        wordMinLeft = X;
                                        wordMaxRight = X + Width;
                                    }
                                    var characterBounds = new RectAngle(X, Y, Width, Height, character, rotationAngle);
                                    if (character !== ' ') {
                                        if (isPreviousSpace && wordBounds.length > 0 && (rotationAngle === wordBounds[0].Rotation)) {
                                            if ((rotationAngle === 180 || rotationAngle === 0) &&
                                                (Math.abs(characterBounds.Y - wordBounds[0].Y) > maximumSpaceForNewLine)) {
                                                startNewLine = true;
                                            }
                                            if ((rotationAngle === 270 || rotationAngle === 90) &&
                                                (Math.abs(characterBounds.X - wordBounds[0].X) > maximumSpaceForNewLine)) {
                                                startNewLine = true;
                                            }
                                        }
                                        if ((isZeroWidthSpace && wordBounds.length >= 1 &&
                                            wordBounds[wordBounds.length - 1].Rotation !== characterBounds.Rotation) || startNewLine) {
                                            isZeroWidthSpace = false;
                                            startNewLine = false;
                                            // eslint-disable-next-line
                                            minTop = Math.min.apply(Math, top_1);
                                            // eslint-disable-next-line
                                            maxBottom = Math.max.apply(Math, bottom);
                                            // eslint-disable-next-line
                                            minLeft = Math.min.apply(Math, left);
                                            // eslint-disable-next-line
                                            maxRight = Math.max.apply(Math, right);
                                            var newWordBounds = void 0;
                                            if (wordStart === false) {
                                                newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                                wordBounds.push(newWordBounds);
                                            }
                                            this.textBoundsCalculation(wordBounds, minTop, maxBottom, maxRight, minLeft, pageRotation, pageWidth, pageHeight);
                                            wordBounds = [];
                                            wordStart = true;
                                            word = '';
                                            top_1 = [];
                                            left = [];
                                            bottom = [];
                                            right = [];
                                            minTop = 0;
                                            maxBottom = 0;
                                            minLeft = 0;
                                            maxRight = 0;
                                        }
                                        top_1.push(characterBounds.Top);
                                        bottom.push(characterBounds.Bottom);
                                        left.push(characterBounds.Left);
                                        right.push(characterBounds.Right);
                                        wordMinTop = Math.min(wordMinTop, characterBounds.Top);
                                        wordMaxBottom = Math.max(wordMaxBottom, characterBounds.Bottom);
                                        wordMinLeft = Math.min(wordMinLeft, characterBounds.Left);
                                        wordMaxRight = Math.max(wordMaxRight, characterBounds.Right);
                                        word += character;
                                        wordRotation = characterBounds.Rotation;
                                        wordStart = false;
                                        isPreviousSpace = false;
                                    }
                                    else {
                                        var newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                        wordBounds.push(newWordBounds);
                                        wordMinTop = characterBounds.Top;
                                        wordMaxBottom = characterBounds.Bottom;
                                        wordMinLeft = characterBounds.Left;
                                        wordMaxRight = characterBounds.Right;
                                        word = character;
                                        wordRotation = characterBounds.Rotation;
                                        newWordBounds = new RectAngle(wordMinLeft, wordMinTop, wordMaxRight - wordMinLeft, wordMaxBottom - wordMinTop, word, wordRotation);
                                        wordBounds.push(newWordBounds);
                                        wordMinTop = 0;
                                        wordMaxBottom = 0;
                                        wordMinLeft = 0;
                                        wordMaxRight = 0;
                                        word = '';
                                        wordRotation = 0;
                                        wordStart = true;
                                        isPreviousSpace = true;
                                    }
                                }
                                break;
                        }
                    }
                    else {
                        var result = FPDF.GetUnicodeChar(textPage, charCount);
                        var character = String.fromCharCode(result);
                        if (charCount < totalCharacterCount) {
                            pageText += character;
                        }
                    }
                }
                FPDF.CloseTextPage(textPage);
                this.Rotation = pageRotation;
                this.PageText = pageText;
            }
        };
        Processor.prototype.pointerToPixelConverter = function (pointerValue) {
            return (pointerValue * (96 / 72));
        };
        Processor.prototype.textBoundsCalculation = function (wordBounds, minTop, maxBottom, maxRight, minLeft, pageRotation, pageWidth, pageHeight) {
            var newWordBounds;
            var hasInBetweenRotation = false;
            var inBetweenRotatedText = '';
            var maximumSpaceBetweenWords = 30;
            var sentence = wordBounds.reduce(function (word, rect) { return word + rect.Text; }, '');
            var isRTLText = this.checkIsRtlText(sentence);
            for (var count = 0; count < wordBounds.length; count++) {
                var textRotation = wordBounds[parseInt(count.toString(), 10)].Rotation;
                if (textRotation === 0 || textRotation === 180) {
                    if (hasInBetweenRotation) {
                        this.TextBounds.push(newWordBounds);
                        this.TextContent.push(inBetweenRotatedText);
                        inBetweenRotatedText = '';
                    }
                    hasInBetweenRotation = false;
                    if (pageRotation === 0) {
                        newWordBounds = new RectAngle(wordBounds[parseInt(count.toString(), 10)].Left, minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 1) {
                        newWordBounds = new RectAngle(pageWidth - minTop, wordBounds[parseInt(count.toString(), 10)].Left, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 2) {
                        newWordBounds = new RectAngle(pageWidth - wordBounds[parseInt(count.toString(), 10)].Left, pageHeight - minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 3) {
                        newWordBounds = new RectAngle(minTop, pageHeight - wordBounds[parseInt(count.toString(), 10)].Left, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                }
                else if (textRotation === 90 || textRotation === 270) {
                    if (hasInBetweenRotation) {
                        this.TextBounds.push(newWordBounds);
                        this.TextContent.push(inBetweenRotatedText);
                        inBetweenRotatedText = '';
                    }
                    hasInBetweenRotation = false;
                    if (pageRotation === 0) {
                        newWordBounds = new RectAngle(minLeft, wordBounds[parseInt(count.toString(), 10)].Top, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 1) {
                        newWordBounds = new RectAngle(pageWidth - wordBounds[parseInt(count.toString(), 10)].Top, minLeft, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 2) {
                        newWordBounds = new RectAngle(pageWidth - minLeft, pageHeight - wordBounds[parseInt(count.toString(), 10)].Top, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 3) {
                        newWordBounds = new RectAngle(wordBounds[parseInt(count.toString(), 10)].Top, pageHeight - minLeft, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                }
                else if (!hasInBetweenRotation) {
                    hasInBetweenRotation = true;
                    inBetweenRotatedText += wordBounds[parseInt(count.toString(), 10)].Text;
                    if (pageRotation === 0) {
                        newWordBounds = new RectAngle(wordBounds[parseInt(count.toString(), 10)].Left, minTop, maxRight - minLeft, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 1) {
                        newWordBounds = new RectAngle(pageWidth - minTop, wordBounds[parseInt(count.toString(), 10)].Left, maxRight - minLeft, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 2) {
                        newWordBounds = new RectAngle(pageWidth - wordBounds[parseInt(count.toString(), 10)].Left, pageHeight - minTop, maxRight - minLeft, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                    else if (pageRotation === 3) {
                        newWordBounds = new RectAngle(minTop, pageHeight - wordBounds[parseInt(count.toString(), 10)].Left, maxRight - minLeft, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                    }
                }
                else {
                    inBetweenRotatedText += wordBounds[parseInt(count.toString(), 10)].Text;
                }
                if (!hasInBetweenRotation && wordBounds[parseInt(count.toString(), 10)].Text === ' ' && count !== 0 && count + 1 <= wordBounds.length) {
                    if (!isRTLText) {
                        if (count + 1 !== wordBounds.length) {
                            var spaceWidth = 0;
                            switch (textRotation) {
                                case 0:
                                    spaceWidth = wordBounds[count + 1].Left - (wordBounds[count - 1].Left + wordBounds[count - 1].Width);
                                    if (maximumSpaceBetweenWords < spaceWidth || spaceWidth < 0) {
                                        spaceWidth = 0;
                                    }
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(wordBounds[count - 1].Left + wordBounds[count - 1].Width, minTop, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - minTop, wordBounds[count - 1].Left + wordBounds[count - 1].Width, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count - 1].Left +
                                            wordBounds[count - 1].Width), pageHeight - minTop, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle(minTop, pageHeight - (wordBounds[count - 1].Left +
                                            wordBounds[count - 1].Width), spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                                case 90:
                                    spaceWidth = wordBounds[count + 1].Top - (wordBounds[count - 1].Top + wordBounds[count - 1].Height);
                                    if (maximumSpaceBetweenWords < spaceWidth || spaceWidth < 0) {
                                        spaceWidth = 0;
                                    }
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(minLeft, wordBounds[count - 1].Top + wordBounds[count - 1].Height, maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count - 1].Top +
                                            wordBounds[count - 1].Height), minLeft, maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - minLeft, pageHeight - (wordBounds[count - 1].Top +
                                            wordBounds[count - 1].Height), maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle((wordBounds[count - 1].Top + wordBounds[count - 1].Height), pageHeight - minLeft, maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                                case 180:
                                    spaceWidth = wordBounds[count - 1].Left - (wordBounds[count + 1].Left + wordBounds[count + 1].Width);
                                    if (maximumSpaceBetweenWords < spaceWidth || spaceWidth < 0) {
                                        spaceWidth = 0;
                                    }
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(wordBounds[count + 1].Left + wordBounds[count + 1].Width, minTop, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - minTop, wordBounds[count + 1].Left +
                                            wordBounds[count + 1].Width, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count + 1].Left +
                                            wordBounds[count + 1].Width), pageHeight - minTop, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle(minTop, pageHeight - (wordBounds[count + 1].Left +
                                            wordBounds[count + 1].Width), spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                                case 270:
                                    spaceWidth = wordBounds[count - 1].Top - (wordBounds[count + 1].Top + wordBounds[count + 1].Height);
                                    if (maximumSpaceBetweenWords < spaceWidth || spaceWidth < 0) {
                                        spaceWidth = 0;
                                    }
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(minLeft, wordBounds[count + 1].Top + wordBounds[count + 1].Height, maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count + 1].Top +
                                            wordBounds[count + 1].Height), minLeft, maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - minLeft, pageHeight -
                                            (wordBounds[count + 1].Top + wordBounds[count + 1].Height), maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle((wordBounds[count + 1].Top + wordBounds[count + 1].Height), pageHeight - minLeft, maxRight - minLeft, spaceWidth, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                            }
                        }
                        else {
                            switch (textRotation) {
                                case 90:
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(minLeft, wordBounds[count - 1].Top + wordBounds[count - 1].Height, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count - 1].Top +
                                            wordBounds[count - 1].Height), minLeft, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - minLeft, pageHeight -
                                            (wordBounds[count - 1].Top + wordBounds[count - 1].Height), maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle((wordBounds[count - 1].Top + wordBounds[count - 1].Height), pageHeight - minLeft, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                                case 270:
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(minLeft, wordBounds[count - 1].Top -
                                            wordBounds[parseInt(count.toString(), 10)].Height, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count - 1].Top -
                                            wordBounds[parseInt(count.toString(), 10)].Height), minLeft, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - minLeft, pageHeight -
                                            wordBounds[count - 1].Top - wordBounds[parseInt(count.toString(), 10)].Height, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle((wordBounds[count - 1].Top -
                                            wordBounds[parseInt(count.toString(), 10)].Height), pageHeight - minLeft, maxRight - minLeft, wordBounds[parseInt(count.toString(), 10)].Height, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                                case 180:
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(wordBounds[count - 1].Left -
                                            wordBounds[parseInt(count.toString(), 10)].Width, minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle((pageWidth - minTop), wordBounds[count - 1].Left -
                                            wordBounds[parseInt(count.toString(), 10)].Width, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count - 1].Left -
                                            wordBounds[parseInt(count.toString(), 10)].Width), pageHeight - minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle(minTop, pageHeight - (wordBounds[count - 1].Left -
                                            wordBounds[parseInt(count.toString(), 10)].Width), wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                                case 0:
                                    if (pageRotation === 0) {
                                        newWordBounds = new RectAngle(wordBounds[count - 1].Left + wordBounds[count - 1].Width, minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 1) {
                                        newWordBounds = new RectAngle(pageWidth - minTop, wordBounds[count - 1].Left +
                                            wordBounds[count - 1].Width, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 2) {
                                        newWordBounds = new RectAngle(pageWidth - (wordBounds[count - 1].Left +
                                            wordBounds[count - 1].Width), pageHeight - minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    else if (pageRotation === 3) {
                                        newWordBounds = new RectAngle(minTop, pageHeight - (wordBounds[count - 1].Left +
                                            wordBounds[count - 1].Width), wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, textRotation);
                                    }
                                    break;
                            }
                        }
                    }
                    else if (isRTLText && count + 1 !== wordBounds.length) {
                        var spaceWidth = (wordBounds[count - 1].Left - (wordBounds[count + 1].Left + wordBounds[count + 1].Width));
                        if (maximumSpaceBetweenWords < spaceWidth || spaceWidth < 0) {
                            spaceWidth = 0;
                        }
                        newWordBounds = new RectAngle((wordBounds[count + 1].Left + wordBounds[count + 1].Width), minTop, spaceWidth, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, wordBounds[parseInt(count.toString(), 10)].Rotation);
                    }
                    else if (isRTLText) {
                        newWordBounds = new RectAngle((wordBounds[count - 1].Left -
                            wordBounds[parseInt(count.toString(), 10)].Width), minTop, wordBounds[parseInt(count.toString(), 10)].Width, maxBottom - minTop, wordBounds[parseInt(count.toString(), 10)].Text, wordBounds[parseInt(count.toString(), 10)].Rotation);
                    }
                }
                if (!hasInBetweenRotation) {
                    this.TextBounds.push(newWordBounds);
                    this.TextContent.push(wordBounds[parseInt(count.toString(), 10)].Text);
                }
            }
            if (hasInBetweenRotation) {
                this.TextBounds.push(newWordBounds);
                this.TextContent.push(inBetweenRotatedText);
            }
        };
        Processor.prototype.checkIsRtlText = function (text) {
            var ltrChars = 'A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02B8\\u0300-\\u0590\\u0800-\\u1FFF' + '\\u2C00-\\uFB1C\\uFDFE-\\uFE6F\\uFEFD-\\uFFFF';
            var rtlChars = '\\u0591-\\u07FF\\uFB1D-\\uFDFD\\uFE70-\\uFEFC';
            // eslint-disable-next-line
            var rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
            return rtlDirCheck.test(text);
        };
        Processor.prototype.getPageRender = function (n, w, h, isTextNeed, isTransparent, cropBoxRect, mediaBoxRect, isSkipCharacterBounds) {
            if (n === void 0) { n = 0; }
            var pageRenderPtr = this.getRender(n, w, h, isTextNeed, isTransparent, cropBoxRect, mediaBoxRect, isSkipCharacterBounds);
            var pageRenderData = [];
            pageRenderData = PDFiumModule.HEAPU8.slice(pageRenderPtr, pageRenderPtr + (w * h * 4));
            PDFiumModule.asm.free(pageRenderPtr);
            return pageRenderData;
        };
        Processor.prototype.render = function (n, message, zoomFactor, isTextNeed, printScaleFactor, printDevicePixelRatio, textDetailsId, isTransparent, cropBoxRect, mediaBoxRect, size, isSkipCharacterBounds) {
            if (n === void 0) { n = 0; }
            var _a = this.getPageSize(n), w = _a[0], h = _a[1];
            if (isNaN(w) && isNaN(h)) {
                var page = FPDF.LoadPage(this.wasmData.wasm, n);
                h = this.pointerToPixelConverter(FPDF.GetPageHeight(page));
                w = this.pointerToPixelConverter(FPDF.GetPageWidth(page));
            }
            var scaleFactor = 1.5;
            var thumbnailWidth = 99.7;
            var thumbnailHeight = 141;
            if (message === 'thumbnail') {
                var newWidth = Math.round(thumbnailWidth * scaleFactor);
                var newHeight = Math.round(thumbnailHeight * scaleFactor);
                var data = this.getPageRender(n, newWidth, newHeight, isTextNeed, null, null, null, isSkipCharacterBounds);
                return { value: data, width: newWidth, height: newHeight, pageIndex: n, message: 'renderThumbnail', textBounds: this.TextBounds, textContent: this.TextContent, rotation: this.Rotation, pageText: this.PageText, characterBounds: this.CharacterBounds, zoomFactor: zoomFactor, isTextNeed: isTextNeed, textDetailsId: textDetailsId };
            }
            else if (message === 'print') {
                //An A0 piece of paper measures 33.1 × 46.8 inches, with 46.8 inches being the greater dimension. The pixel value of 46.8 inches is 4493px. If the document size is too large, we may not be able to display the image. Therefore, we should consider the maximum size of A0 paper if the page size is greater than 4493 pixels.
                var maxPageSize = 4493;
                var scaleFactor_1 = 1.5;
                var whichIsBigger = (w > h) ? 'Width' : 'Height';
                var maxWidth = w;
                var maxHeight = h;
                if (whichIsBigger === 'Width') {
                    maxWidth = (w > maxPageSize) ? maxPageSize : w;
                    if (maxWidth === maxPageSize) {
                        maxHeight = h / (w / maxPageSize);
                    }
                }
                else {
                    maxHeight = (h > maxPageSize) ? maxPageSize : h;
                    if (maxHeight === maxPageSize) {
                        maxWidth = w / (h / maxPageSize);
                    }
                }
                var newWidth = Math.round(maxWidth * printScaleFactor * scaleFactor_1);
                var newHeight = Math.round(maxHeight * printScaleFactor * scaleFactor_1);
                var data = this.getPageRender(n, newWidth, newHeight, false, null, null, null, isSkipCharacterBounds);
                return { value: data, width: newWidth, height: newHeight, pageIndex: n, pageWidth: w, pageHeight: h, message: 'printImage', printDevicePixelRatio: printDevicePixelRatio };
            }
            else {
                var newWidth = Math.round(((size && size !== null) ? size.width : w) * scaleFactor * zoomFactor);
                var newHeight = Math.round(((size && size !== null) ? size.height : h) * scaleFactor * zoomFactor);
                // Reduce the zoom factor if the new image size exceeds the memory limit
                while (((newWidth * newHeight * 4) * 2) >= 2147483648) {
                    zoomFactor = zoomFactor - 0.1;
                    newWidth = Math.round(this.pointerToPixelConverter(w) * zoomFactor);
                    newHeight = Math.round(this.pointerToPixelConverter(h) * zoomFactor);
                }
                var data = null;
                if (message === 'extractText') {
                    var page = FPDF.LoadPage(this.wasmData.wasm, n);
                    this.textExtraction(page, n, isTextNeed, cropBoxRect, mediaBoxRect, isSkipCharacterBounds);
                    FPDF.ClosePage(page);
                }
                else {
                    data = this.getPageRender(n, newWidth, newHeight, isTextNeed, isTransparent, cropBoxRect, mediaBoxRect, isSkipCharacterBounds);
                }
                return { value: data, width: newWidth, height: newHeight, pageWidth: w, pageHeight: h, pageIndex: n, message: 'imageRendered', textBounds: this.TextBounds, textContent: this.TextContent, rotation: this.Rotation, pageText: this.PageText, characterBounds: this.CharacterBounds, zoomFactor: zoomFactor, isTextNeed: isTextNeed, textDetailsId: textDetailsId };
            }
        };
        Processor.prototype.renderTileImage = function (n, tileX, tileY, xCount, yCount, zoomFactor, isTextNeed, textDetailsId, cropBoxRect, mediaBoxRect) {
            if (n === void 0) { n = 0; }
            var _a = this.getPageSize(n), w = _a[0], h = _a[1];
            var newWidth = Math.round(w * 1.5 * zoomFactor);
            var newHeight = Math.round(h * 1.5 * zoomFactor);
            var w1 = Math.round(newWidth / xCount);
            var h1 = Math.round(newHeight / yCount);
            var flag = FPDF.REVERSE_BYTE_ORDER;
            var heap = PDFiumModule.asm.malloc(w1 * h1 * 4);
            PDFiumModule.HEAPU8.fill(0, heap, heap + (w1 * h1 * 4));
            var bmap = FPDF.Bitmap_CreateEx(w1, h1, 4, heap, w1 * 4);
            var page = FPDF.LoadPage(this.wasmData.wasm, n);
            FPDF.Bitmap_FillRect(bmap, 0, 0, w1, h1, 0xFFFFFFFF);
            FPDF.RenderPageBitmap(bmap, page, -tileX * w1, -tileY * h1, newWidth, newHeight, 0, flag);
            FPDF.Bitmap_Destroy(bmap);
            this.textExtraction(page, n, isTextNeed, cropBoxRect, mediaBoxRect);
            FPDF.ClosePage(page);
            var pageRenderPtr = heap;
            var data = [];
            data = PDFiumModule.HEAPU8.slice(pageRenderPtr, pageRenderPtr + (w1 * h1 * 4));
            PDFiumModule.asm.free(pageRenderPtr);
            if (tileX === 0 && tileY === 0) {
                return {
                    value: data,
                    w: w1,
                    h: h1,
                    noTileX: xCount,
                    noTileY: yCount,
                    x: tileX,
                    y: tileY,
                    pageIndex: n,
                    message: 'renderTileImage',
                    textBounds: this.TextBounds,
                    textContent: this.TextContent,
                    rotation: this.Rotation,
                    pageText: this.PageText,
                    characterBounds: this.CharacterBounds,
                    textDetailsId: textDetailsId,
                    isTextNeed: isTextNeed,
                    zoomFactor: zoomFactor
                };
            }
            else {
                return {
                    value: data,
                    w: w1,
                    h: h1,
                    noTileX: xCount,
                    noTileY: yCount,
                    x: tileX,
                    y: tileY,
                    pageIndex: n,
                    message: 'renderTileImage',
                    textDetailsId: textDetailsId,
                    isTextNeed: isTextNeed,
                    zoomFactor: zoomFactor
                };
            }
        };
        Processor.prototype.getLastError = function () {
            var lastError = FPDF.GetLastError();
            switch (lastError) {
                case FPDF.LAST_ERROR.SUCCESS:
                    return 'success';
                case FPDF.LAST_ERROR.UNKNOWN:
                    return 'unknown error';
                case FPDF.LAST_ERROR.FILE:
                    return 'file not found or could not be opened';
                case FPDF.LAST_ERROR.FORMAT:
                    return 'file not in PDF format or corrupted';
                case FPDF.LAST_ERROR.PASSWORD:
                    return 'password required or incorrect password';
                case FPDF.LAST_ERROR.SECURITY:
                    return 'unsupported security scheme';
                case FPDF.LAST_ERROR.PAGE:
                    return 'page not found or content error';
                default:
                    return 'unknown error';
            }
        };
        return Processor;
    }());
    var DocumentInfo = /** @class */ (function () {
        function DocumentInfo(wasmData) {
            this.pages = [];
            this.processor = new Processor(wasmData);
        }
        DocumentInfo.prototype.setPages = function (pagesCount) {
            this.pages = Array(pagesCount).fill(null);
        };
        DocumentInfo.prototype.createAllPages = function () {
            for (var i = 0; i < this.pages.length; i++) {
                this.pages[parseInt(i.toString(), 10)] = new Page(parseInt(i.toString(), 10), this.processor);
            }
        };
        DocumentInfo.prototype.getPage = function (index) {
            var page = this.pages[parseInt(index.toString(), 10)];
            if (!page) {
                page = new Page(index);
                this.pages[parseInt(index.toString(), 10)] = page;
            }
            return page;
        };
        return DocumentInfo;
    }());
}
