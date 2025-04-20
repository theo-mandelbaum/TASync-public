import { Browser, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getDiagramElement } from '@syncfusion/ej2-drawings';
/**
 * Magnification module
 */
var Magnification = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdf viewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewer base
     * @private
     */
    function Magnification(pdfViewer, viewerBase) {
        /**
         * @private
         */
        this.zoomFactor = 1;
        /**
         * @private
         */
        this.previousZoomFactor = 1;
        this.scrollWidth = 25;
        this.zoomPercentages = [10, 25, 50, 75, 100, 125, 150, 200, 400];
        this.isNotPredefinedZoom = false;
        this.pinchStep = 0;
        this.reRenderPageNumber = 0;
        this.magnifyPageRerenderTimer = null;
        this.rerenderOnScrollTimer = null;
        this.rerenderInterval = null;
        this.touchCenterX = 0;
        this.touchCenterY = 0;
        this.mouseCenterX = 0;
        this.mouseCenterY = 0;
        this.pageRerenderCount = 0;
        this.imageObjects = [];
        this.topValue = 0;
        this.isTapToFitZoom = false;
        /**
         * @private
         */
        this.isWaitingPopupUpdated = false;
        /**
         * @private
         */
        this.isInitialCustomZoomValues = true;
        /**
         * @private
         */
        this.fitType = null;
        /**
         * @private
         */
        this.isPinchZoomed = false;
        /**
         * @private
         */
        this.isPagePinchZoomed = false;
        /**
         * @private
         */
        this.isRerenderCanvasCreated = false;
        /**
         * @private
         */
        this.isMagnified = false;
        /**
         * @private
         */
        this.isPagesZoomed = false;
        /**
         * @private
         */
        this.isPinchScrolled = false;
        /**
         * @private
         */
        this.isAutoZoom = false;
        /**
         * @private
         */
        this.isDoubleTapZoom = false;
        /**
         * @private
         */
        this.isFormFieldPageZoomed = false;
        this.isWebkitMobile = false;
        this.isFitToPageMode = true;
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
        this.zoomLevel = 2;
    }
    /**
     * Zoom the PDF document to the given zoom value
     *
     * @param  {number} zoomValue - Specifies the Zoom Value for magnify the PDF document
     * @returns {void}
     */
    Magnification.prototype.zoomTo = function (zoomValue) {
        var MaximumZoomPercentage = 400;
        var MinmumZoomPercentage = 10;
        var minZoom = this.pdfViewer.minZoom;
        var maxZoom = this.pdfViewer.maxZoom;
        if (minZoom != null && maxZoom != null && minZoom > maxZoom) {
            var tempZoomValue = maxZoom;
            maxZoom = minZoom;
            minZoom = tempZoomValue;
        }
        if (minZoom != null || maxZoom != null) {
            if (minZoom != null && minZoom !== undefined) {
                MinmumZoomPercentage = minZoom;
            }
            if (maxZoom != null && maxZoom !== undefined) {
                MaximumZoomPercentage = maxZoom;
            }
        }
        else {
            MaximumZoomPercentage = 400;
            MinmumZoomPercentage = 10;
        }
        if (zoomValue < MinmumZoomPercentage) {
            zoomValue = MinmumZoomPercentage;
        }
        else if (zoomValue > MaximumZoomPercentage) {
            zoomValue = MaximumZoomPercentage;
        }
        this.fitType = null;
        this.isNotPredefinedZoom = false;
        if (this.isAutoZoom && this.isInitialLoading) {
            this.pdfViewerBase.onWindowResize();
        }
        else {
            this.isAutoZoom = false;
            this.onZoomChanged(zoomValue);
        }
        this.isInitialLoading = false;
    };
    /**
     * Magnifies the page to the next value in the zoom drop down list.
     *
     * @returns {void}
     */
    Magnification.prototype.zoomIn = function () {
        if (this.fitType || this.isNotPredefinedZoom) {
            if (!isNullOrUndefined(this.lowerZoomLevel)) {
                this.zoomLevel = this.lowerZoomLevel;
            }
            this.fitType = null;
        }
        this.isNotPredefinedZoom = false;
        if (this.pdfViewer.minZoom != null || this.pdfViewer.maxZoom != null) {
            var zoomLength = this.pdfViewerBase.customZoomValues.length;
            var zoomLevel = this.zoomLevel;
            if (zoomLevel >= zoomLength) {
                zoomLevel = zoomLength;
            }
            else {
                zoomLevel++;
            }
            this.zoomLevel = zoomLevel;
        }
        else {
            if (this.zoomLevel >= 8) {
                this.zoomLevel = 8;
            }
            else {
                this.zoomLevel++;
            }
        }
        this.isAutoZoom = false;
        if (this.pdfViewer.minZoom != null || this.pdfViewer.maxZoom != null) {
            this.onZoomChanged(this.pdfViewerBase.customZoomValues[this.zoomLevel]);
        }
        else {
            this.onZoomChanged(this.zoomPercentages[this.zoomLevel]);
        }
    };
    /**
     * Magnifies the page to the previous value in the zoom drop down list.
     *
     * @returns {void}
     */
    Magnification.prototype.zoomOut = function () {
        if (this.fitType || this.isNotPredefinedZoom) {
            if (!isNullOrUndefined(this.higherZoomLevel)) {
                this.zoomLevel = this.higherZoomLevel;
            }
            this.fitType = null;
        }
        this.isNotPredefinedZoom = false;
        if (this.zoomLevel <= 0) {
            this.zoomLevel = 0;
        }
        else {
            this.zoomLevel--;
        }
        this.isAutoZoom = false;
        if (this.pdfViewer.minZoom != null || this.pdfViewer.maxZoom != null) {
            this.onZoomChanged(this.pdfViewerBase.customZoomValues[this.zoomLevel]);
        }
        else {
            this.onZoomChanged(this.zoomPercentages[this.zoomLevel]);
        }
    };
    /**
     * Scales the page to fit the page width to the width of the container in the control.
     *
     * @returns {void}
     */
    Magnification.prototype.fitToWidth = function () {
        this.isAutoZoom = false;
        var zoomValue = this.calculateFitZoomFactor('fitToWidth');
        this.onZoomChanged(zoomValue);
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.fitToAuto = function () {
        this.isAutoZoom = true;
        var zoomValue = this.calculateFitZoomFactor('fitToWidth');
        this.onZoomChanged(zoomValue);
    };
    /**
     * Scales the page to fit the page in the container in the control.
     *
     * @returns {void}
     */
    Magnification.prototype.fitToPage = function () {
        var zoomValue = this.calculateFitZoomFactor('fitToPage');
        if (zoomValue !== null) {
            this.isAutoZoom = false;
            this.onZoomChanged(zoomValue);
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                if (this.pdfViewerBase.isWebkitMobile) {
                    this.pdfViewerBase.viewerContainer.style.overflowY = 'auto';
                }
                else {
                    this.pdfViewerBase.viewerContainer.style.overflowY = 'hidden';
                }
            }
            else {
                this.pdfViewerBase.viewerContainer.style.overflowY = 'auto';
            }
            if (this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1]) {
                this.pdfViewerBase.viewerContainer.scrollTop =
                    this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top * this.zoomFactor;
            }
        }
    };
    /**
     * Returns zoom factor for the fit zooms.
     *
     * @param {string} type -It describes about the type
     * @returns {number} - number
     */
    Magnification.prototype.calculateFitZoomFactor = function (type) {
        var viewerWidth = this.pdfViewerBase.viewerContainer.getBoundingClientRect().width;
        var viewerHeight = this.pdfViewerBase.viewerContainer.getBoundingClientRect().height;
        if (viewerWidth === 0 && viewerHeight === 0) {
            viewerWidth = parseFloat(this.pdfViewer.width.toString());
            viewerHeight = parseFloat(this.pdfViewer.height.toString());
        }
        if (isNaN(viewerHeight) || isNaN(viewerWidth)) {
            return null;
        }
        this.fitType = type;
        if (this.fitType === 'fitToWidth') {
            var scaleX = ((viewerWidth - this.scrollWidth) / this.pdfViewerBase.highestWidth);
            if (this.isAutoZoom) {
                this.fitType = null;
                scaleX = Math.min(1, scaleX);
                if (scaleX === 1) {
                    this.zoomLevel = 2;
                }
            }
            return parseInt((scaleX * 100).toString(), 10);
        }
        else {
            this.isFitToPageMode = true;
            var pageLeft = 10;
            var scaleX = ((viewerWidth - this.scrollWidth - pageLeft) / this.pdfViewerBase.highestWidth);
            var scaleY = 0;
            if (this.pdfViewerBase.pageSize && this.pdfViewerBase.pageSize.length === 1 &&
                !isNullOrUndefined(this.pdfViewerBase.pageSize[0].top) && !this.isPinchZoomed) {
                scaleY = (viewerHeight - this.pdfViewerBase.pageSize[0].top) / this.pdfViewerBase.highestHeight;
            }
            else {
                scaleY = (viewerHeight / this.pdfViewerBase.highestHeight);
            }
            if (scaleY > scaleX) {
                scaleY = scaleX;
                this.isFitToPageMode = false;
            }
            return parseInt((scaleY * 100).toString(), 10);
        }
    };
    /**
     * Initiating cursor based zoom.
     *
     * @param {number} pointX - It describes about the pointX
     * @param {number} pointY - It describes about the pointY
     * @param {number} zoomValue - It describes about the zoom value
     * @private
     * @returns {void}
     */
    Magnification.prototype.initiateMouseZoom = function (pointX, pointY, zoomValue) {
        var pointInViewer = this.positionInViewer(pointX, pointY);
        this.mouseCenterX = pointInViewer.x;
        this.mouseCenterY = pointInViewer.y;
        this.zoomTo(zoomValue);
    };
    /**
     * Performs pinch in operation
     *
     * @returns {void}
     */
    Magnification.prototype.pinchIn = function () {
        this.fitType = null;
        var temporaryZoomFactor = this.zoomFactor - this.pinchStep;
        if (temporaryZoomFactor < 4 && temporaryZoomFactor > 2) {
            temporaryZoomFactor = this.zoomFactor - this.pinchStep;
        }
        if (temporaryZoomFactor <= 1.5) {
            temporaryZoomFactor = this.zoomFactor - (this.pinchStep / 1.5);
        }
        if (this.pdfViewer.minZoom != null && temporaryZoomFactor < this.pdfViewer.minZoom / 100) {
            temporaryZoomFactor = this.pdfViewer.minZoom / 100;
        }
        else if (temporaryZoomFactor < 0.25) {
            temporaryZoomFactor = 0.25;
        }
        this.isPinchZoomed = true;
        this.onZoomChanged(temporaryZoomFactor * 100);
        this.isTapToFitZoom = true;
        if ((Browser.isDevice && !this.pdfViewer.enableDesktopMode) && (this.zoomFactor * 100) === 50) {
            var zoomValue = this.calculateFitZoomFactor('fitToWidth');
            this.fitType = null;
            if (zoomValue <= 50) {
                this.fitToWidth();
            }
        }
    };
    /**
     * Performs pinch out operation
     *
     * @returns {void}
     */
    Magnification.prototype.pinchOut = function () {
        this.fitType = null;
        var temporaryZoomFactor = this.zoomFactor + this.pinchStep;
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            if (this.pdfViewer.maxZoom != null && temporaryZoomFactor > this.pdfViewer.maxZoom / 100) {
                temporaryZoomFactor = this.pdfViewer.maxZoom / 100;
            }
            else if (temporaryZoomFactor > 4) {
                temporaryZoomFactor = 4;
            }
        }
        else {
            if (temporaryZoomFactor > 2) {
                temporaryZoomFactor = temporaryZoomFactor - this.pinchStep;
            }
            if (this.pdfViewer.maxZoom != null && temporaryZoomFactor > this.pdfViewer.maxZoom / 100) {
                temporaryZoomFactor = this.pdfViewer.maxZoom / 100;
            }
            else if (temporaryZoomFactor > 4) {
                temporaryZoomFactor = 4;
            }
        }
        this.isTapToFitZoom = true;
        this.isPinchZoomed = true;
        this.onZoomChanged(temporaryZoomFactor * 100);
    };
    /**
     * returns zoom level for the zoom factor.
     *
     * @param {number} zoomFactor - It describes about the zoom factor
     * @returns {number} - number
     */
    Magnification.prototype.getZoomLevel = function (zoomFactor) {
        if (this.pdfViewer.minZoom != null || this.pdfViewer.maxZoom != null) {
            var min = 0;
            var customZoomValues = this.pdfViewerBase.customZoomValues;
            var max = customZoomValues.length - 1;
            while (min <= max) {
                var mid = Math.floor((min + max) / 2);
                if (customZoomValues[parseInt(mid.toString(), 10)] === zoomFactor) {
                    return mid;
                }
                else if (customZoomValues[parseInt(mid.toString(), 10)] < zoomFactor) {
                    min = mid + 1;
                }
                else {
                    max = mid - 1;
                }
            }
            this.higherZoomLevel = min;
            this.lowerZoomLevel = max;
            return max;
        }
        else {
            var min = 0;
            var max = this.zoomPercentages.length - 1;
            while ((min <= max) && !(min === 0 && max === 0)) {
                var mid = Math.round((min + max) / 2);
                if (this.zoomPercentages[parseInt(mid.toString(), 10)] <= zoomFactor) {
                    min = mid + 1;
                }
                else if (this.zoomPercentages[parseInt(mid.toString(), 10)] >= zoomFactor) {
                    max = mid - 1;
                }
            }
            this.higherZoomLevel = min;
            this.lowerZoomLevel = max;
            return max;
        }
    };
    /**
     * @private
     * @returns {boolean} - boolean
     */
    Magnification.prototype.checkZoomFactor = function () {
        return this.zoomPercentages.indexOf(this.zoomFactor * 100) > -1;
    };
    /**
     * Executes when the zoom or pinch operation is performed
     *
     * @param {number} zoomValue - It describes about the zoom value
     * @returns {void}
     */
    Magnification.prototype.onZoomChanged = function (zoomValue) {
        if (this.isInitialCustomZoomValues) {
            this.pdfViewerBase.getCustomZoomValues();
        }
        if (zoomValue) {
            if (this.pdfViewer.annotationModule) {
                this.pdfViewer.annotationModule.closePopupMenu();
            }
            this.previousZoomFactor = this.zoomFactor;
            this.zoomLevel = this.getZoomLevel(zoomValue);
            this.zoomFactor = this.getZoomFactor(zoomValue);
            if (this.zoomFactor <= 0.25) {
                this.pdfViewerBase.isMinimumZoom = true;
            }
            else {
                this.pdfViewerBase.isMinimumZoom = false;
            }
            if (!isNullOrUndefined(this.pdfViewerBase.viewerContainer)) {
                if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                    if (this.pdfViewerBase.isWebkitMobile) {
                        this.pdfViewerBase.viewerContainer.style.overflowY = 'auto';
                    }
                    else {
                        this.pdfViewerBase.viewerContainer.style.overflowY = 'hidden';
                    }
                }
                else {
                    this.pdfViewerBase.viewerContainer.style.overflowY = 'auto';
                }
            }
            if (this.pdfViewerBase.pageCount > 0) {
                if ((this.previousZoomFactor !== this.zoomFactor) || this.pdfViewerBase.isInitialPageMode) {
                    if (!this.isPinchZoomed) {
                        this.magnifyPages();
                    }
                    else {
                        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                            this.pdfViewerBase.mobilePageNoContainer.style.left = (this.pdfViewer.element.clientWidth / 2) - (parseFloat(this.pdfViewerBase.mobilePageNoContainer.style.width) / 2) + 'px';
                        }
                        this.responsivePages();
                    }
                }
                if (!isBlazor()) {
                    if (this.pdfViewer.toolbarModule) {
                        this.pdfViewer.toolbarModule.updateZoomButtons();
                    }
                }
                if (!this.isInitialLoading) {
                    if (this.previousZoomFactor !== this.zoomFactor) {
                        this.pdfViewer.zoomValue = parseInt((this.zoomFactor * 100).toString(), 10);
                        this.pdfViewer.fireZoomChange();
                    }
                }
            }
            if (this.pdfViewer.toolbarModule) {
                this.pdfViewer.toolbarModule.updateZoomPercentage(this.zoomFactor);
            }
            if (!this.isInitialLoading) {
                if (this.previousZoomFactor !== this.zoomFactor) {
                    this.pdfViewer.zoomValue = parseInt((this.zoomFactor * 100).toString(), 10);
                    this.pdfViewer.fireZoomChange();
                }
            }
            if ((Browser.isDevice && !this.pdfViewer.enableDesktopMode) && this.isPinchZoomed) {
                var zoomPercentage = parseInt((this.zoomFactor * 100).toString(), 10) + '%';
                this.pdfViewerBase.navigationPane.createTooltipMobile(zoomPercentage);
            }
        }
    };
    /**
     * @param {number} clientX - It describes about the clientX
     * @param {number} clientY - It describes about the clientY
     * @private
     * @returns {void}
     */
    Magnification.prototype.setTouchPoints = function (clientX, clientY) {
        var pointInViewer = this.positionInViewer(clientX, clientY);
        this.touchCenterX = pointInViewer.x;
        this.touchCenterY = pointInViewer.y;
    };
    /**
     * @param {number} pointX1 - It describes about the pointX1
     * @param {number} pointY1 - It describes about the pointY1
     * @param {number} pointX2 - It describes about the pointX2
     * @param {number} pointY2 - It describes about the pointY2
     * @private
     * @returns {void}
     */
    Magnification.prototype.initiatePinchMove = function (pointX1, pointY1, pointX2, pointY2) {
        this.isPinchScrolled = false;
        this.isMagnified = false;
        this.reRenderPageNumber = this.pdfViewerBase.currentPageNumber;
        var pointInViewer = this.positionInViewer((pointX1 + pointX2) / 2, (pointY1 + pointY2) / 2);
        this.touchCenterX = pointInViewer.x;
        this.touchCenterY = pointInViewer.y;
        this.zoomOverPages(pointX1, pointY1, pointX2, pointY2);
    };
    Magnification.prototype.magnifyPages = function () {
        var _this = this;
        this.clearRerenderTimer();
        var pageDivElements = document.querySelectorAll('.e-pv-page-div');
        var startPageElement = pageDivElements[0].id.split('_pageDiv_')[1];
        var endPageElement = pageDivElements[pageDivElements.length - 1].id.split('_pageDiv_')[1];
        if ((this.previousZoomFactor !== this.zoomFactor) || this.pdfViewerBase.isInitialPageMode) {
            for (var i = startPageElement; i <= endPageElement; i++) {
                this.pdfViewerBase.showPageLoadingIndicator(i, false);
            }
        }
        for (var i = startPageElement; i <= endPageElement; i++) {
            this.pdfViewerBase.showPageLoadingIndicator(i, true);
        }
        this.isWaitingPopupUpdated = true;
        if (!this.isPagesZoomed) {
            this.reRenderPageNumber = this.pdfViewerBase.currentPageNumber;
        }
        if (!this.pdfViewerBase.documentLoaded && !this.pdfViewerBase.isInitialPageMode) {
            this.isPagesZoomed = true;
        }
        var scrollValue = this.pdfViewerBase.viewerContainer.scrollTop;
        if (this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.maintainSelectionOnZoom(false, true);
        }
        if (this.pdfViewer.formDesignerModule && !this.pdfViewerBase.documentLoaded && !this.pdfViewerBase.isDocumentLoaded) {
            this.isFormFieldPageZoomed = true;
        }
        if (!this.isInitialLoading) {
            this.isMagnified = true;
        }
        this.updatePageLocation();
        this.resizeCanvas(this.reRenderPageNumber);
        this.calculateScrollValuesOnMouse(scrollValue);
        if (this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.resizeTouchElements();
        }
        var annotModule = this.pdfViewer.annotationModule;
        if (annotModule && annotModule.textMarkupAnnotationModule) {
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.updateCurrentResizerPosition();
        }
        if (this.pdfViewerBase.pageSize.length > 0) {
            this.pdfViewerBase.pageContainer.style.height = this.topValue + this.pdfViewerBase.getPageHeight(this.pdfViewerBase.pageSize.length - 1) + 'px';
            // eslint-disable-next-line
            var proxy_1 = this;
            this.pdfViewerBase.renderedPagesList = [];
            this.pdfViewerBase.pinchZoomStorage = [];
            if (!this.pdfViewerBase.documentLoaded) {
                this.magnifyPageRerenderTimer = setTimeout(function () {
                    proxy_1.rerenderMagnifiedPages();
                    _this.pdfViewerBase.showPageLoadingIndicator(_this.pdfViewerBase.currentPageNumber - 1, false);
                }, 800);
            }
        }
    };
    Magnification.prototype.updatePageLocation = function () {
        this.topValue = 0;
        for (var i = 1; i < this.pdfViewerBase.pageSize.length; i++) {
            this.topValue += (this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].height + this.pdfViewerBase.pageGap) *
                this.zoomFactor;
        }
        var limit;
        if (this.pdfViewer.initialRenderPages > 10) {
            limit = this.pdfViewer.initialRenderPages <= this.pdfViewerBase.pageCount ? this.pdfViewer.initialRenderPages :
                this.pdfViewerBase.pageCount;
        }
        else {
            limit = this.pdfViewerBase.pageCount < 10 ? this.pdfViewerBase.pageCount : 10;
        }
        for (var i = 0; i < limit; i++) {
            this.updatePageContainer(i, this.pdfViewerBase.getPageWidth(i), this.pdfViewerBase.getPageHeight(i), this.pdfViewerBase.getPageTop(i), true);
        }
    };
    Magnification.prototype.updatePageContainer = function (pageNumber, pageWidth, pageHeight, topValue, isReRender) {
        var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + pageNumber);
        if (pageDiv) {
            pageDiv.style.width = pageWidth + 'px';
            pageDiv.style.height = pageHeight + 'px';
            var textLayerDiv = this.pdfViewerBase.getElement('_textLayer_' + pageNumber);
            if (textLayerDiv) {
                textLayerDiv.style.width = pageWidth + 'px';
                textLayerDiv.style.height = pageHeight + 'px';
            }
            pageDiv.style.width = pageWidth + 'px';
            pageDiv.style.height = pageHeight + 'px';
            if (this.pdfViewer.enableRtl) {
                pageDiv.style.right = this.pdfViewerBase.updateLeftPosition(pageNumber) + 'px';
            }
            else {
                pageDiv.style.left = this.pdfViewerBase.updateLeftPosition(pageNumber) + 'px';
            }
            pageDiv.style.top = topValue + 'px';
            this.pdfViewerBase.pageContainer.style.width = this.pdfViewerBase.viewerContainer.clientWidth + 'px';
            this.pdfViewerBase.renderPageCanvas(pageDiv, pageWidth, pageHeight, pageNumber, 'block');
        }
    };
    Magnification.prototype.clearRerenderTimer = function () {
        clearTimeout(this.rerenderOnScrollTimer);
        clearTimeout(this.magnifyPageRerenderTimer);
        this.clearIntervalTimer();
        this.isPinchScrolled = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.clearIntervalTimer = function () {
        clearInterval(this.rerenderInterval);
        this.rerenderInterval = null;
        this.clearRendering();
        var oldCanvases = document.querySelectorAll('canvas[id*="' + this.pdfViewer.element.id + '_oldCanvas_"]');
        for (var i = 0; i < oldCanvases.length; i++) {
            var pageNumber = parseInt(oldCanvases[parseInt(i.toString(), 10)].id.split('_oldCanvas_')[1], 10);
            var pageCanvas = this.pdfViewerBase.getElement('_pageCanvas_' + pageNumber);
            if (pageCanvas) {
                oldCanvases[parseInt(i.toString(), 10)].id = pageCanvas.id;
                pageCanvas.parentElement.removeChild(pageCanvas);
            }
            else {
                oldCanvases[parseInt(i.toString(), 10)].id = this.pdfViewer.element.id + '_pageCanvas_' + pageNumber;
            }
            if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.rerenderAnnotationsPinch(i);
            }
        }
        this.isRerenderCanvasCreated = false;
    };
    /**
     * @param {HTMLImageElement} image - It describes about the image
     * @private
     * @returns {void}
     */
    Magnification.prototype.pushImageObjects = function (image) {
        if (!isNullOrUndefined(this.imageObjects)) {
            if (this.imageObjects) {
                this.imageObjects.push(image);
            }
        }
    };
    Magnification.prototype.clearRendering = function () {
        if (this.imageObjects) {
            for (var j = 0; j < this.imageObjects.length; j++) {
                if (this.imageObjects[parseInt(j.toString(), 10)]) {
                    this.imageObjects[parseInt(j.toString(), 10)].onload = null;
                    this.imageObjects[parseInt(j.toString(), 10)].onerror = null;
                }
            }
            this.imageObjects = [];
        }
    };
    Magnification.prototype.rerenderMagnifiedPages = function () {
        if ((this.pdfViewerBase.isInitialLoaded || this.pdfViewerBase.isDocumentLoaded) && !this.pdfViewerBase.isInitialPageMode) {
            this.renderInSeparateThread(this.reRenderPageNumber);
            this.isPagesZoomed = false;
        }
        else if (this.pdfViewerBase.isInitialPageMode) {
            this.pageRerenderCount = 0;
            this.pdfViewerBase.renderedPagesList = [];
            this.pdfViewerBase.pinchZoomStorage = [];
            this.isMagnified = false;
            this.pdfViewerBase.pageViewScrollChanged(this.reRenderPageNumber);
            this.pdfViewerBase.isInitialPageMode = false;
        }
    };
    Magnification.prototype.renderInSeparateThread = function (pageNumber) {
        var _this = this;
        this.designNewCanvas(pageNumber);
        this.pageRerenderCount = 0;
        this.pdfViewerBase.renderedPagesList = [];
        this.pdfViewerBase.pinchZoomStorage = [];
        this.isMagnified = false;
        this.pdfViewerBase.pageViewScrollChanged(this.pdfViewerBase.currentPageNumber);
        // eslint-disable-next-line
        var proxy = this;
        this.rerenderInterval = setInterval(function () {
            _this.initiateRerender(proxy);
        }, 1);
    };
    Magnification.prototype.responsivePages = function () {
        this.isPagesZoomed = true;
        this.clearRerenderTimer();
        if (this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.clearTextSelection();
        }
        if (this.pdfViewer.textSearchModule) {
            this.pdfViewer.textSearchModule.clearAllOccurrences();
        }
        var scrollValue = this.pdfViewerBase.viewerContainer.scrollTop;
        this.isAutoZoom = false;
        this.updatePageLocation();
        this.pdfViewerBase.pageContainer.style.height = this.topValue + this.pdfViewerBase.pageSize[this.pdfViewerBase.pageSize.length - 1].height * this.zoomFactor + 'px';
        this.resizeCanvas(this.pdfViewerBase.currentPageNumber);
        if (this.pdfViewerBase.textLayer && this.pdfViewer.formDesignerModule) {
            this.pdfViewerBase.textLayer.clearTextLayers(true);
        }
        if (this.isPinchZoomed) {
            this.calculateScrollValues(scrollValue);
        }
        this.pdfViewerBase.renderedPagesList = [];
        this.pdfViewerBase.pinchZoomStorage = [];
        if (this.pdfViewer.formFieldsModule && !this.pdfViewer.formDesignerModule) {
            // eslint-disable-next-line
            var proxy_2 = this;
            if (!this.pdfViewerBase.documentLoaded) {
                this.magnifyPageRerenderTimer = setTimeout(function () {
                    proxy_2.rerenderMagnifiedPages();
                }, 800);
            }
        }
    };
    Magnification.prototype.calculateScrollValues = function (scrollValue) {
        var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        var currentPageCanvas = this.pdfViewerBase.getElement('_pageDiv_' + pageIndex);
        if (currentPageCanvas) {
            var pointInViewer = void 0;
            var currentPageBounds = currentPageCanvas.getBoundingClientRect();
            if (this.pdfViewer.enableRtl && !this.isDoubleTapZoom) {
                pointInViewer = this.positionInViewer(currentPageBounds.right, currentPageBounds.top);
            }
            else {
                pointInViewer = this.positionInViewer(currentPageBounds.left, currentPageBounds.top);
            }
            var currentPageBoundsLeft = pointInViewer.x;
            var currentPageBoundsTop = pointInViewer.y;
            // update scroll top for the viewer container based on pinch zoom factor
            var previousPageTop = (currentPageBoundsTop) * this.previousZoomFactor;
            var canvasPreviousY = scrollValue + this.touchCenterY;
            var canvasCurrentY = (currentPageBoundsTop) * this.zoomFactor + ((canvasPreviousY - previousPageTop) < 0 ?
                canvasPreviousY - previousPageTop : (canvasPreviousY - previousPageTop) * (this.zoomFactor / this.previousZoomFactor));
            var pageGapValue = this.zoomFactor - this.previousZoomFactor > 0 ? -this.pdfViewerBase.pageGap *
                (this.zoomFactor / this.previousZoomFactor) : this.pdfViewerBase.pageGap * (this.previousZoomFactor / this.zoomFactor);
            this.pdfViewerBase.viewerContainer.scrollTop = canvasCurrentY - this.touchCenterY + pageGapValue /
                this.pdfViewerBase.zoomInterval;
            // update scroll left for the viewer container based on pinch zoom factor
            var previousWidthFactor = (currentPageBounds.width * this.previousZoomFactor) / currentPageBounds.width;
            var scaleCorrectionFactor = this.zoomFactor / previousWidthFactor - 1;
            var scrollX_1 = this.touchCenterX - currentPageBoundsLeft;
            if (this.pdfViewerBase.isMixedSizeDocument && (this.pdfViewerBase.highestWidth * this.pdfViewerBase.getZoomFactor()) >
                this.pdfViewerBase.viewerContainer.clientWidth) {
                this.pdfViewerBase.viewerContainer.scrollLeft = (this.pdfViewerBase.pageContainer.offsetWidth -
                    this.pdfViewerBase.viewerContainer.clientWidth) / 2;
            }
            else {
                this.pdfViewerBase.viewerContainer.scrollLeft += scrollX_1 * scaleCorrectionFactor;
            }
        }
    };
    Magnification.prototype.calculateScrollValuesOnMouse = function (scrollValue) {
        var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        var currentPageCanvas = this.pdfViewerBase.getElement('_pageDiv_' + pageIndex);
        if (currentPageCanvas) {
            var pointInViewer = void 0;
            var currentPageBounds = currentPageCanvas.getBoundingClientRect();
            if (this.pdfViewer.enableRtl) {
                pointInViewer = this.positionInViewer(currentPageBounds.right, currentPageBounds.top);
            }
            else {
                pointInViewer = this.positionInViewer(currentPageBounds.left, currentPageBounds.top);
            }
            var currentPageBoundsLeft = pointInViewer.x;
            var currentPageBoundsTop = pointInViewer.y;
            // update scroll top for the viewer container based on mouse zoom factor
            var previousPageTop = (currentPageBoundsTop) * this.previousZoomFactor;
            var canvasPreviousY = scrollValue + this.mouseCenterY;
            var canvasCurrentY = (currentPageBoundsTop) * this.zoomFactor + ((canvasPreviousY - previousPageTop) *
                (this.zoomFactor / this.previousZoomFactor));
            var pageGapValue = this.pdfViewerBase.pageGap * (this.zoomFactor / this.previousZoomFactor);
            if (this.pdfViewerBase.isTouchPad && !this.pdfViewerBase.isMacSafari) {
                pageGapValue = pageGapValue / this.pdfViewerBase.zoomInterval;
            }
            if (canvasCurrentY === 0) {
                pageGapValue = 0;
            }
            this.pdfViewerBase.viewerContainer.scrollTop = canvasCurrentY - this.mouseCenterY + pageGapValue;
            // update scroll left for the viewer container based on mouse zoom factor
            var previousWidthFactor = (currentPageBounds.width * this.previousZoomFactor) / currentPageBounds.width;
            var scaleCorrectionFactor = this.zoomFactor / previousWidthFactor - 1;
            var scrollX_2 = this.mouseCenterX - currentPageBoundsLeft;
            if (this.pdfViewerBase.isMixedSizeDocument && (this.pdfViewerBase.highestWidth * this.pdfViewerBase.getZoomFactor()) >
                this.pdfViewerBase.viewerContainer.clientWidth) {
                this.pdfViewerBase.viewerContainer.scrollLeft = (this.pdfViewerBase.pageContainer.offsetWidth -
                    this.pdfViewerBase.viewerContainer.clientWidth) / 2;
            }
            else {
                var pageContainer = document.getElementById(this.pdfViewerBase.pageContainer.id);
                if (pageContainer && pageContainer.children && pageContainer.children[0].clientWidth >
                    this.pdfViewer.viewerBase.viewerContainer.clientWidth) {
                    this.pdfViewerBase.viewerContainer.scrollLeft += scrollX_2 * scaleCorrectionFactor;
                }
                else {
                    this.pdfViewerBase.viewerContainer.scrollLeft = (this.pdfViewerBase.pageContainer.offsetWidth -
                        this.pdfViewerBase.viewerContainer.clientWidth) / 2;
                }
            }
        }
    };
    Magnification.prototype.rerenderOnScroll = function () {
        var _this = this;
        this.isPinchZoomed = false;
        if (this.isPinchScrolled) {
            this.rerenderOnScrollTimer = null;
            this.isPinchScrolled = false;
            this.reRenderPageNumber = this.pdfViewerBase.currentPageNumber;
            this.pdfViewerBase.renderedPagesList = [];
            this.pdfViewerBase.pinchZoomStorage = [];
            var pageDivs = document.querySelectorAll('img[id*="' + this.pdfViewer.element.id + '_pageCanvas_"]');
            var viewPortWidth = 816;
            for (var i = 0; i < pageDivs.length; i++) {
                var pageNumber = parseInt(pageDivs[parseInt(i.toString(), 10)].id.split('_pageCanvas_')[1], 10);
                var pageWidth = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].width;
                if ((viewPortWidth < pageWidth) && this.pdfViewer.tileRenderingSettings.enableTileRendering) {
                    if (this.pdfViewer.restrictZoomRequest) {
                        pageDivs[parseInt(i.toString(), 10)].style.width = pageWidth * this.pdfViewerBase.getZoomFactor() + 'px';
                        pageDivs[parseInt(i.toString(), 10)].style.height = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height * this.pdfViewerBase.getZoomFactor() + 'px';
                    }
                    else {
                        pageDivs[parseInt(i.toString(), 10)].style.width = pageWidth * this.pdfViewerBase.getZoomFactor() + 'px';
                        pageDivs[parseInt(i.toString(), 10)].style.height = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height * this.pdfViewerBase.getZoomFactor() + 'px';
                    }
                }
            }
            if (this.pdfViewerBase.textLayer) {
                var textLayers = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_textLayer_"]');
                for (var i = 0; i < textLayers.length; i++) {
                    textLayers[parseInt(i.toString(), 10)].style.display = 'none';
                }
            }
            if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
                var annotationLayers = document.querySelectorAll('canvas[id*="' + this.pdfViewer.element.id + '_annotationCanvas_"]');
                for (var j = 0; j < annotationLayers.length; j++) {
                    var pageNumber = annotationLayers[parseInt(j.toString(), 10)].id.split('_annotationCanvas_')[1];
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.rerenderAnnotationsPinch(parseInt(pageNumber, 10));
                }
            }
            if (Browser.isDevice) {
                if (this.pdfViewer.formDesignerModule) {
                    var pageNumber_1 = this.pdfViewer.currentPageNumber;
                    var fomrFieldCollection = this.pdfViewer.formFieldCollection.filter(function (data) {
                        return data.pageNumber ===
                            pageNumber_1;
                    });
                    for (var i = 0; i < fomrFieldCollection.length; i++) {
                        document.querySelectorAll('[id^=' + fomrFieldCollection[parseInt(i.toString(), 10)].id + ']').forEach(function (formField) { return formField.style.display = 'none'; });
                    }
                }
                else {
                    document.querySelectorAll('[id^="pdfViewerinput_"]').forEach(function (formField) { return formField.parentElement.style.display = 'none'; });
                }
            }
            this.pdfViewerBase.pageViewScrollChanged(this.reRenderPageNumber);
            this.isPagePinchZoomed = false;
            this.rerenderOnScrollTimer = setTimeout(function () {
                _this.pdfViewerBase.pageViewScrollChanged(_this.reRenderPageNumber);
            }, 300);
            if (this.pdfViewerBase.textLayer) {
                var textLayers = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_textLayer_"]');
                for (var i = 0; i < textLayers.length; i++) {
                    textLayers[parseInt(i.toString(), 10)].style.display = 'block';
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.pinchMoveScroll = function () {
        var _this = this;
        if (this.isRerenderCanvasCreated) {
            this.clearIntervalTimer();
        }
        if (this.isPagesZoomed || (!this.isRerenderCanvasCreated && this.isPagePinchZoomed)) {
            this.clearRendering();
            this.isPagesZoomed = false;
            clearTimeout(this.magnifyPageRerenderTimer);
            this.isPinchScrolled = true;
            this.isFormFieldPageZoomed = true;
            this.rerenderOnScrollTimer = setTimeout(function () {
                _this.rerenderOnScroll();
            }, 100);
        }
    };
    Magnification.prototype.initiateRerender = function (proxy) {
        var isReRender = false;
        if (this.previousZoomFactor < 0.4 || this.pdfViewerBase.isMinimumZoom) {
            isReRender = true;
        }
        if (((proxy.pageRerenderCount === proxy.pdfViewerBase.reRenderedCount) || isReRender) &&
            proxy.pageRerenderCount !== 0 && proxy.pdfViewerBase.reRenderedCount !== 0) {
            proxy.reRenderAfterPinch(this.reRenderPageNumber);
            proxy.isFormFieldPageZoomed = false;
        }
    };
    Magnification.prototype.reRenderAfterPinch = function (currentPageIndex) {
        this.pageRerenderCount = 0;
        var lowerPageValue = currentPageIndex - 3;
        var higherPageValue = currentPageIndex + 1;
        if (this.pdfViewerBase.isMinimumZoom) {
            lowerPageValue = currentPageIndex - 4;
            higherPageValue = currentPageIndex + 4;
        }
        lowerPageValue = (lowerPageValue > 0) ? lowerPageValue : 0;
        higherPageValue = (higherPageValue < this.pdfViewerBase.pageCount) ? higherPageValue : (this.pdfViewerBase.pageCount - 1);
        for (var i = lowerPageValue; i <= higherPageValue; i++) {
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + i);
            var oldCanvas = this.pdfViewerBase.getElement('_oldCanvas_' + i);
            if (oldCanvas) {
                oldCanvas.onload = null;
                oldCanvas.onerror = null;
                oldCanvas.parentNode.removeChild(oldCanvas);
            }
            if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.rerenderAnnotations(i);
            }
            else if (this.pdfViewer.formDesignerModule) {
                this.rerenderAnnotations(i);
                this.pdfViewer.renderDrawing(undefined, currentPageIndex);
            }
            if (pageDiv) {
                pageDiv.style.visibility = 'visible';
            }
        }
        this.isRerenderCanvasCreated = false;
        this.isPagePinchZoomed = false;
        if (this.pdfViewerBase.reRenderedCount !== 0) {
            this.pdfViewerBase.reRenderedCount = 0;
            this.pageRerenderCount = 0;
            clearInterval(this.rerenderInterval);
            this.rerenderInterval = null;
        }
        this.imageObjects = [];
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    Magnification.prototype.rerenderAnnotations = function (pageNumber) {
        var _this = this;
        var oldCanvasCollection = document.querySelectorAll('#' + this.pdfViewer.element.id + '_old_annotationCanvas_' + pageNumber);
        for (var i = 0; i < oldCanvasCollection.length; i++) {
            if (oldCanvasCollection[parseInt(i.toString(), 10)]) {
                oldCanvasCollection[parseInt(i.toString(), 10)].parentElement.removeChild(oldCanvasCollection[parseInt(i.toString(), 10)]);
            }
        }
        // Styles need to be applied to both canvases. The 'blendAnnotationsIntoCanvas' is used for highlight annotations.
        ['_annotationCanvas_', '_blendAnnotationsIntoCanvas_'].forEach(function (id) {
            var canvas = _this.pdfViewerBase.getElement("" + id + pageNumber);
            canvas.style.setProperty('display', 'block');
        });
    };
    Magnification.prototype.designNewCanvas = function (currentPageIndex) {
        if (this.pdfViewerBase.textLayer) {
            this.pdfViewerBase.textLayer.clearTextLayers();
        }
        var lowerPageValue = currentPageIndex - 3;
        var higherPageValue = currentPageIndex + 1; // jshint ignore:line
        if (this.pdfViewerBase.isMinimumZoom) {
            lowerPageValue = currentPageIndex - 4;
            higherPageValue = currentPageIndex + 4;
        }
        lowerPageValue = (lowerPageValue > 0) ? lowerPageValue : 0;
        higherPageValue = (higherPageValue < this.pdfViewerBase.pageCount) ? higherPageValue : (this.pdfViewerBase.pageCount - 1);
        for (var i = lowerPageValue; i <= higherPageValue; i++) {
            if (this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)]) {
                var canvas = this.pdfViewerBase.getElement('_pageCanvas_' + i);
                var width = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].width * this.zoomFactor;
                var height = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].height * this.zoomFactor;
                if (canvas && !this.pdfViewer.restrictZoomRequest) {
                    this.pdfViewerBase.renderPageCanvas(this.pdfViewerBase.getElement('_pageDiv_' + i), width, height, i, 'none');
                }
                else if (!this.pdfViewer.restrictZoomRequest) {
                    this.pdfViewerBase.renderPageCanvas(this.pdfViewerBase.getElement('_pageDiv_' + i), width, height, i, 'none');
                }
            }
        }
        this.isRerenderCanvasCreated = true;
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.pageRerenderOnMouseWheel = function () {
        var _this = this;
        if (this.isRerenderCanvasCreated) {
            this.clearIntervalTimer();
            clearTimeout(this.magnifyPageRerenderTimer);
            if (!this.isPinchScrolled) {
                this.isPinchScrolled = true;
                this.rerenderOnScrollTimer = setTimeout(function () {
                    _this.rerenderOnScroll();
                }, 100);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.renderCountIncrement = function () {
        if (this.isRerenderCanvasCreated) {
            this.pageRerenderCount++;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.rerenderCountIncrement = function () {
        if (this.pageRerenderCount > 0) {
            this.pdfViewerBase.reRenderedCount++;
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    Magnification.prototype.resizeCanvas = function (pageNumber) {
        var annotationModule = this.pdfViewer.annotationModule;
        if (annotationModule && annotationModule.inkAnnotationModule && annotationModule.inkAnnotationModule.outputString !== '') {
            annotationModule.inkAnnotationModule.inkPathDataCollection.push({ pathData: annotationModule.inkAnnotationModule.outputString, zoomFactor: annotationModule.inkAnnotationModule.inkAnnotationInitialZoom });
            annotationModule.inkAnnotationModule.outputString = '';
        }
        if (annotationModule && annotationModule.freeTextAnnotationModule) {
            var currentPosition = { x: annotationModule.freeTextAnnotationModule.currentPosition[0],
                y: annotationModule.freeTextAnnotationModule.currentPosition[1],
                width: annotationModule.freeTextAnnotationModule.currentPosition[2],
                height: annotationModule.freeTextAnnotationModule.currentPosition[3] };
            annotationModule.freeTextAnnotationModule.addInputInZoom(currentPosition);
        }
        var lowerPageValue = pageNumber - 3;
        var higherPageValue = pageNumber + 3;
        if (this.pdfViewerBase.isMinimumZoom) {
            lowerPageValue = pageNumber - 4;
            higherPageValue = pageNumber + 4;
        }
        if (this.pdfViewer.initialRenderPages > this.pdfViewerBase.pageRenderCount) {
            lowerPageValue = 0;
            higherPageValue = (higherPageValue < this.pdfViewer.initialRenderPages) ?
                (this.pdfViewer.initialRenderPages <= this.pdfViewerBase.pageCount) ?
                    this.pdfViewer.initialRenderPages : this.pdfViewerBase.pageCount :
                (higherPageValue < this.pdfViewerBase.pageCount) ? higherPageValue : (this.pdfViewerBase.pageCount - 1);
        }
        else {
            lowerPageValue = (lowerPageValue > 0) ? lowerPageValue : 0;
            higherPageValue = (higherPageValue < this.pdfViewerBase.pageCount) ? higherPageValue : (this.pdfViewerBase.pageCount - 1);
        }
        for (var i = lowerPageValue; i <= higherPageValue; i++) {
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + i);
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + i);
            if (pageDiv) {
                if ((lowerPageValue <= i) && (i <= higherPageValue)) {
                    var isSelectionAvailable = false;
                    if (this.pdfViewer.textSelectionModule) {
                        isSelectionAvailable = this.pdfViewer.textSelectionModule.isSelectionAvailableOnScroll(i);
                    }
                    if (this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)] != null) {
                        var width = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].width * this.zoomFactor;
                        var height = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].height * this.zoomFactor;
                        pageDiv.style.width = width + 'px';
                        pageDiv.style.height = height + 'px';
                        pageDiv.style.top = ((this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].top) * this.zoomFactor) + 'px';
                        if (this.pdfViewer.enableRtl) {
                            pageDiv.style.right = this.pdfViewerBase.updateLeftPosition(i) + 'px';
                        }
                        else {
                            pageDiv.style.left = this.pdfViewerBase.updateLeftPosition(i) + 'px';
                        }
                        var canvas = this.pdfViewerBase.getElement('_pageCanvas_' + i);
                        if (canvas) {
                            canvas.style.width = (width) + 'px';
                            canvas.style.height = height + 'px';
                            if (this.pdfViewer.annotation) {
                                this.pdfViewer.annotationModule.resizeAnnotations(width, height, i);
                            }
                            else if (this.pdfViewer.formDesignerModule) {
                                this.pdfViewer.formDesignerModule.resizeAnnotations(width, height, i);
                            }
                        }
                        var zoomFactor = this.pdfViewerBase.retrieveCurrentZoomFactor();
                        var tileCount = this.pdfViewerBase.getTileCount(this.pdfViewerBase.
                            pageSize[parseInt(i.toString(), 10)].width, this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].height);
                        var noTileX = void 0;
                        var noTileY = void 0;
                        noTileX = noTileY = tileCount;
                        var tileSettings = this.pdfViewer.tileRenderingSettings;
                        if (tileSettings.enableTileRendering && tileSettings.x > 0 && tileSettings.y > 0) {
                            if ((1200 < this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].width ||
                                this.pdfViewerBase.getZoomFactor() > 2)) {
                                noTileX = tileSettings.x;
                                noTileY = tileSettings.y;
                            }
                        }
                        var tileRequestCount = noTileX * noTileY;
                        if (tileRequestCount === 1) {
                            var storedData = void 0;
                            if (this.pdfViewerBase.clientSideRendering) {
                                storedData = this.pdfViewerBase.getWindowSessionStorage(i, zoomFactor) ?
                                    this.pdfViewerBase.getWindowSessionStorage(i, zoomFactor) : this.pdfViewerBase.getPinchZoomPage(i);
                            }
                            else {
                                storedData = this.pdfViewerBase.getLinkInformation(i) ?
                                    this.pdfViewerBase.getLinkInformation(i) : this.pdfViewerBase.getWindowSessionStorage(i, zoomFactor);
                            }
                            if (storedData) {
                                storedData = this.pdfViewerBase.clientSideRendering && typeof storedData === 'object' ? storedData : JSON.parse(storedData);
                                var imageData = storedData['image'];
                                if (imageData) {
                                    canvas.src = imageData;
                                    canvas.style.display = 'block';
                                    var oldCanvases = document.querySelectorAll('img[id*="' + this.pdfViewer.element.id + '_tileimg_' + i + '_"]');
                                    var pageCanvas = this.pdfViewerBase.getElement('_pageDiv_' + i);
                                    for (var k = 0; k < oldCanvases.length; k++) {
                                        var tileImgId = oldCanvases[parseInt(k.toString(), 10)].id.split('_');
                                        if (parseFloat(tileImgId[tileImgId.length - 3]) !== this.pdfViewerBase.getZoomFactor()) {
                                            oldCanvases[parseInt(k.toString(), 10)].onload = null;
                                            oldCanvases[parseInt(k.toString(), 10)].onerror = null;
                                            pageCanvas.removeChild(oldCanvases[parseInt(k.toString(), 10)]);
                                        }
                                    }
                                    var oldPageDiv = document.querySelectorAll('img[id*="' + this.pdfViewer.element.id + '_oldCanvas"]');
                                    for (var j = 0; j < oldPageDiv.length; j++) {
                                        oldPageDiv[parseInt(j.toString(), 10)].onload = null;
                                        oldPageDiv[parseInt(j.toString(), 10)].onerror = null;
                                        pageDiv.removeChild(oldPageDiv[parseInt(j.toString(), 10)]);
                                    }
                                }
                                this.pdfViewerBase.isReRenderRequired = false;
                            }
                            else {
                                this.pdfViewerBase.isReRenderRequired = true;
                            }
                        }
                        else {
                            var oldCanvases = document.querySelectorAll('img[id*="' + this.pdfViewer.element.id + '_tileimg_' + i + '_"]');
                            for (var l = 0; l < oldCanvases.length; l++) {
                                var tileImgId = oldCanvases[parseInt(l.toString(), 10)].id.split('_');
                                var tileX = parseFloat(tileImgId[tileImgId.length - 2]);
                                var tileY = parseFloat(tileImgId[tileImgId.length - 1]);
                                var tileData = this.pdfViewerBase.clientSideRendering ?
                                    JSON.parse(this.pdfViewerBase.getStoredTileImageDetails(i, tileX, tileY, zoomFactor)) :
                                    JSON.parse(this.pdfViewerBase.getWindowSessionStorageTile(i, tileX, tileY, zoomFactor));
                                if (tileData && tileData.zoomFactor) {
                                    zoomFactor = tileData.zoomFactor;
                                }
                                if (parseFloat(tileImgId[tileImgId.length - 4]) === i) {
                                    canvas.style.display = 'none';
                                    var node = oldCanvases[parseInt(l.toString(), 10)];
                                    // Make sure it's really an Element
                                    if (node.nodeType === Node.ELEMENT_NODE) {
                                        var dataScaleFactor = 1.5;
                                        if (!isNullOrUndefined(tileData)) {
                                            dataScaleFactor = (!isNullOrUndefined(tileData.scaleFactor)) ? tileData.scaleFactor : 1.5;
                                        }
                                        var pageWidth = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].width;
                                        var serverImageWidth = pageWidth * zoomFactor * dataScaleFactor;
                                        var serverImageHeight = this.pdfViewerBase.
                                            pageSize[parseInt(i.toString(), 10)].height * zoomFactor * dataScaleFactor;
                                        var tilewidth = serverImageWidth / noTileX;
                                        var tileHeight = serverImageHeight / noTileY;
                                        var originalWidth = tilewidth;
                                        var originalLeft = parseFloat(tileImgId[tileImgId.length - 2]) * tilewidth;
                                        var originalTop = parseFloat(tileImgId[tileImgId.length - 1]) * tileHeight;
                                        node.width = (((originalWidth * this.pdfViewerBase.getZoomFactor()) / zoomFactor) /
                                            dataScaleFactor);
                                        node.style.width = (((originalWidth * this.pdfViewerBase.getZoomFactor()) / zoomFactor) / dataScaleFactor) + 'px';
                                        node.style.left = (((originalLeft * this.pdfViewerBase.getZoomFactor()) / zoomFactor) / dataScaleFactor) + 'px';
                                        node.style.top = (((originalTop * this.pdfViewerBase.getZoomFactor()) / zoomFactor) / dataScaleFactor) + 'px';
                                        node.id = this.pdfViewer.element.id + '_tileimg_' + i + '_' + this.pdfViewerBase.getZoomFactor() + '_' + tileX + '_' + tileY;
                                        if (tileData) {
                                            var imageData = tileData['image'];
                                            if (imageData) {
                                                node.src = imageData;
                                            }
                                            this.pdfViewerBase.isReRenderRequired = false;
                                        }
                                        else {
                                            this.pdfViewerBase.isReRenderRequired = true;
                                        }
                                    }
                                }
                            }
                            if (oldCanvases.length === 0) {
                                this.pdfViewerBase.isReRenderRequired = true;
                            }
                        }
                        var adornerSvg = getDiagramElement(this.pdfViewer.element.id + '_textLayer_' + i);
                        if (adornerSvg) {
                            var adonerLayer = getDiagramElement(this.pdfViewer.element.id + i + '_diagramAdorner_svg');
                            if (adonerLayer) {
                                adonerLayer.style.width = width + 'px';
                                adonerLayer.style.height = height + 'px';
                            }
                            var diagramAdornerLayer = getDiagramElement(this.pdfViewer.element.id + i + '_diagramAdornerLayer');
                            if (diagramAdornerLayer) {
                                diagramAdornerLayer.style.width = width + 'px';
                                diagramAdornerLayer.style.height = height + 'px';
                            }
                            adornerSvg.style.width = width + 'px';
                            adornerSvg.style.height = height + 'px';
                            this.pdfViewer.renderSelector(i, this.pdfViewer.annotationSelectorSettings);
                            this.pdfViewerBase.applyElementStyles(diagramAdornerLayer, i);
                        }
                    }
                }
            }
        }
    };
    Magnification.prototype.zoomOverPages = function (pointX1, pointY1, pointX2, pointY2) {
        var currentDifference = Math.sqrt(Math.pow((pointX1 - pointX2), 2) + Math.pow((pointY1 - pointY2), 2));
        if (this.previousTouchDifference > -1) {
            if (currentDifference > this.previousTouchDifference) {
                this.pinchStep = this.getPinchStep(currentDifference, this.previousTouchDifference);
                this.pinchOut();
            }
            else if (currentDifference < this.previousTouchDifference) {
                this.pinchStep = this.getPinchStep(this.previousTouchDifference, currentDifference);
                this.pinchIn();
            }
        }
        this.previousTouchDifference = currentDifference;
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.pinchMoveEnd = function () {
        this.touchCenterX = 0;
        this.touchCenterY = 0;
        this.previousTouchDifference = -1;
        if (this.isPinchZoomed) {
            this.isPinchScrolled = false;
            this.isPagePinchZoomed = true;
            this.pinchMoveScroll();
        }
    };
    /**
     * @param {WheelEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    Magnification.prototype.fitPageScrollMouseWheel = function (event) {
        if (this.fitType === 'fitToPage') {
            this.isMagnified = false;
            event.preventDefault();
            if (event.deltaY > 0) {
                this.downwardScrollFitPage(this.pdfViewerBase.currentPageNumber - 1);
            }
            else {
                this.upwardScrollFitPage(this.pdfViewerBase.currentPageNumber - 1);
            }
        }
    };
    /**
     * @param {KeyboardEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    Magnification.prototype.magnifyBehaviorKeyDown = function (event) {
        var isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
        var isCommandKey = isMac ? event.metaKey : false;
        if (event.ctrlKey || isCommandKey) {
            if (event.code === 'Equal') {
                event.preventDefault();
                this.zoomIn();
            }
        }
        if (event.ctrlKey || isCommandKey) {
            if (event.code === 'Minus') {
                event.preventDefault();
                this.zoomOut();
            }
        }
        switch (event.keyCode) {
            case 37: // left arrow
                if (event.ctrlKey || isCommandKey) {
                    event.preventDefault();
                    this.pdfViewerBase.updateScrollTop(0);
                }
                else if (this.focusOnViewerContainer() && this.formElementcheck()) {
                    event.preventDefault();
                    this.upwardScrollFitPage(this.pdfViewerBase.currentPageNumber - 1);
                }
                break;
            case 38: // up arrow
            case 33: // page up
                if (event.ctrlKey || isCommandKey) {
                    event.preventDefault();
                    this.pdfViewerBase.updateScrollTop(0);
                }
                else if (this.fitType === 'fitToPage' && !((event.ctrlKey || isCommandKey) && event.shiftKey)) {
                    event.preventDefault();
                    this.upwardScrollFitPage(this.pdfViewerBase.currentPageNumber - 1);
                }
                break;
            case 39: // right arrow
                if (event.ctrlKey || isCommandKey) {
                    event.preventDefault();
                    this.pdfViewerBase.updateScrollTop(this.pdfViewerBase.pageCount - 1);
                }
                else if (this.focusOnViewerContainer() && this.formElementcheck()) {
                    event.preventDefault();
                    this.downwardScrollFitPage(this.pdfViewerBase.currentPageNumber - 1);
                }
                break;
            case 40: // down arrow
            case 34: // page down
                if (event.ctrlKey || isCommandKey) {
                    event.preventDefault();
                    this.pdfViewerBase.updateScrollTop(this.pdfViewerBase.pageCount - 1);
                }
                else if (this.fitType === 'fitToPage' && !((event.ctrlKey || isCommandKey) && event.shiftKey)) {
                    event.preventDefault();
                    this.downwardScrollFitPage(this.pdfViewerBase.currentPageNumber - 1);
                }
                break;
            case 48: // zero key
                if ((event.ctrlKey || isCommandKey) && !event.shiftKey && !event.altKey) {
                    event.preventDefault();
                    this.fitToPage();
                }
                break;
            case 49: // one key
                if ((event.ctrlKey || isCommandKey) && !event.shiftKey && !event.altKey) {
                    event.preventDefault();
                    this.zoomTo(100);
                }
                break;
            default:
                break;
        }
    };
    Magnification.prototype.formElementcheck = function () {
        var target = event.target;
        return (target.offsetParent && target.offsetParent.classList.length > 0 && !target.offsetParent.classList.contains('foreign-object'));
    };
    Magnification.prototype.focusOnViewerContainer = function () {
        var activeElement = document.activeElement;
        var viewerContainer = document.querySelector('.e-pv-viewer-container');
        return viewerContainer.contains(activeElement);
    };
    Magnification.prototype.upwardScrollFitPage = function (currentPageIndex) {
        if (currentPageIndex > 0) {
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex - 1));
            if (pageDiv) {
                pageDiv.style.visibility = 'visible';
                this.pdfViewerBase.viewerContainer.scrollTop = this.pdfViewerBase.pageSize[currentPageIndex - 1].top * this.zoomFactor;
                if (this.isFitToPageMode) {
                    var division = this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex));
                    if (division) {
                        division.style.visibility = 'hidden';
                    }
                }
            }
        }
    };
    /**
     * @param {number} currentPageIndex - It describes about the current page index
     * @private
     * @returns {void}
     */
    Magnification.prototype.updatePagesForFitPage = function (currentPageIndex) {
        if (this.fitType === 'fitToPage') {
            if (this.isFitToPageMode) {
                if (currentPageIndex > 0 && this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex - 1))) {
                    this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex - 1)).style.visibility = 'hidden';
                }
                if ((currentPageIndex < (this.pdfViewerBase.pageCount - 1)) && this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex + 1))) {
                    this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex + 1)).style.visibility = 'hidden';
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.onDoubleTapMagnification = function () {
        var _this = this;
        if (this.pdfViewer.toolbarModule && isBlazor()) {
            this.pdfViewer.toolbarModule.showToolbar(true);
        }
        var scrollValue = this.pdfViewerBase.viewerContainer.scrollTop;
        if (!this.pdfViewer.selectedItems.annotations[0]) {
            this.isDoubleTapZoom = true;
            if (!this.isTapToFitZoom) {
                if (this.zoomFactor < 2) {
                    this.zoomTo(200);
                }
                else {
                    this.fitToWidth();
                }
            }
            else {
                this.fitToWidth();
            }
            this.calculateScrollValues(scrollValue);
            this.isTapToFitZoom = !this.isTapToFitZoom;
            setTimeout(function () { _this.isMagnified = false; }, 500);
            this.isDoubleTapZoom = false;
        }
        else {
            if (isBlazor()) {
                if (this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText') {
                    var elmtPosition = {};
                    elmtPosition.x = this.pdfViewer.selectedItems.annotations[0].bounds.x;
                    elmtPosition.y = this.pdfViewer.selectedItems.annotations[0].bounds.y;
                    this.pdfViewer.annotation.freeTextAnnotationModule.
                        addInuptElemet(elmtPosition, this.pdfViewer.selectedItems.annotations[0]);
                }
            }
        }
    };
    Magnification.prototype.downwardScrollFitPage = function (currentPageIndex) {
        if (currentPageIndex !== (this.pdfViewerBase.pageCount - 1)) {
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex + 1));
            if (pageDiv) {
                pageDiv.style.visibility = 'visible';
            }
            this.pdfViewerBase.viewerContainer.scrollTop = this.pdfViewerBase.pageSize[currentPageIndex + 1].top * this.zoomFactor;
            if (this.isFitToPageMode) {
                var division1 = this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex));
                var division2 = this.pdfViewerBase.getElement('_pageDiv_' + (currentPageIndex + 2));
                if (currentPageIndex + 1 === (this.pdfViewerBase.pageCount - 1)) {
                    if (division1) {
                        division1.style.visibility = 'hidden';
                    }
                }
                else {
                    if (division2) {
                        division2.style.visibility = 'hidden';
                    }
                }
            }
        }
    };
    Magnification.prototype.getMagnifiedValue = function (value) {
        return (value / this.previousZoomFactor) * this.zoomFactor;
    };
    /**
     * @private
     * @returns {void}
     */
    Magnification.prototype.destroy = function () {
        this.imageObjects = undefined;
    };
    /**
     * returns zoom factor when the zoom percent is passed.
     *
     * @param {number} zoomValue - It describes about the zoom value
     * @returns {number} - number
     */
    Magnification.prototype.getZoomFactor = function (zoomValue) {
        return zoomValue / 100;
    };
    /**
     * @private
     * @returns {string} - string
     */
    Magnification.prototype.getModuleName = function () {
        return 'Magnification';
    };
    /**
     * Returns the pinch step value.
     *
     * @param {number} higherValue - It describes about the higher value
     * @param {number} lowerValue - It describes about the lower value
     * @returns {number} - number
     */
    Magnification.prototype.getPinchStep = function (higherValue, lowerValue) {
        var defaultPinchStep = 0.02; // Default pinch step value.
        var higherPinchStep = 1; // higher pinch step value.
        var pinchstep = (higherValue - lowerValue) / 100;
        if (pinchstep < defaultPinchStep) {
            pinchstep = defaultPinchStep;
        }
        else if (pinchstep > higherPinchStep) {
            pinchstep = 0.1; // set the pinch step as 0.1 if the pinch reaches the higher pinch step value.
        }
        return pinchstep;
    };
    /**
     * @private
     * @param {Rect} zoomRect - Specifies the region in client coordinates that is to be brought to view.
     * @returns {void}
     */
    Magnification.prototype.zoomToRect = function (zoomRect) {
        var desiredScaleFactor;
        var pdfViewerBase = this.pdfViewerBase;
        var viewerContainer = pdfViewerBase.viewerContainer;
        var pdfViewer = this.pdfViewer;
        if (zoomRect.width > 0 && zoomRect.height > 0) {
            var location_1 = { x: zoomRect.x, y: zoomRect.y };
            var pageNumber = pdfViewer.getPageNumberFromClientPoint(location_1);
            if (pageNumber > 0) {
                var desiredHorizontalScale = viewerContainer.getBoundingClientRect().width / zoomRect.width;
                var desiredVerticalScale = viewerContainer.getBoundingClientRect().height / zoomRect.height;
                if (desiredHorizontalScale < desiredVerticalScale) {
                    desiredScaleFactor = desiredHorizontalScale;
                }
                else {
                    desiredScaleFactor = desiredVerticalScale;
                }
                var zoomValue = 100; // default zoom value
                var zoomPercentage = pdfViewerBase.getZoomFactor() * 100;
                zoomValue = zoomPercentage * desiredScaleFactor;
                var prevScrollTop = viewerContainer.scrollTop;
                var prevScrollLeft = viewerContainer.scrollLeft;
                // Zoom to desired zoom value.
                this.zoomTo(zoomValue);
                viewerContainer.scrollTop = prevScrollTop;
                viewerContainer.scrollLeft = prevScrollLeft;
                var zoomFactor = pdfViewerBase.getZoomFactor();
                var pagepoint = { x: zoomRect.x, y: zoomRect.y };
                // Convert the client point to page point.
                pagepoint = pdfViewer.convertClientPointToPagePoint(pagepoint, pageNumber);
                pdfViewerBase.updateScrollTop(pageNumber - 1);
                // To adjust the container to the left position.
                viewerContainer.scrollLeft = (pagepoint.x - prevScrollLeft) * zoomFactor;
                // To adjust the container to the top position.
                viewerContainer.scrollTop = ((pagepoint.y + pdfViewerBase.pageSize[pageNumber - 1].top) - prevScrollTop) * zoomFactor;
            }
        }
    };
    /**
     * Returns Point value respect to Main container.
     *
     * @param {number} pointX - It describes about the pointX
     * @param {number} pointY - It describes about the pointY
     * @returns {any} - any
     */
    Magnification.prototype.positionInViewer = function (pointX, pointY) {
        var mainRect = this.pdfViewerBase.mainContainer.getBoundingClientRect();
        return { x: pointX - mainRect.left, y: pointY - mainRect.top };
    };
    return Magnification;
}());
export { Magnification };
