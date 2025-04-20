import { AjaxHandler, ExtractTextOption } from '../index';
import { createElement, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { TaskPriorityLevel } from '../base/pdfviewer-utlis';
/**
 * The `ThumbnailView` module is used to handle thumbnail view navigation of PDF viewer.
 *
 * @param {Event} event - args
 * @returns {void}
 */
var ThumbnailView = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     * @returns {void}
     */
    function ThumbnailView(pdfViewer, pdfViewerBase) {
        var _this = this;
        this.thumbnailLimit = 30;
        this.thumbnailThreshold = 5;
        this.thumbnailRequestsBatch = 5;
        this.thumbnailTopMargin = 10;
        this.thumbnailTop = 8;
        this.isRendered = false;
        this.list = [];
        /**
         * @private
         */
        this.thumbnailPageSize = [];
        /**
         * @private
         */
        this.isThubmnailOpen = false;
        /**
         * @private
         */
        this.isThumbnailClicked = false;
        this.thumbnailOnScroll = function (event) {
            var _loop_1 = function (i) {
                var scrollPosition = _this.pdfViewerBase.navigationPane.sideBarContent.scrollTop;
                var index = _this.thumbnailPageSize.findIndex(function (page) { return page.top >= scrollPosition; });
                if (index !== -1) {
                    var number = Math.floor((index) / _this.thumbnailRequestsBatch) * _this.thumbnailRequestsBatch;
                    _this.updateScrollTopForThumbnail(number);
                    return "break";
                }
            };
            for (var i = 0; i < _this.thumbnailPageSize.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        };
        /**
         * @param {MouseEvent} event - It describes about the event
         * @param {boolean} isKeyboard - It describes about the isKeyboard value
         * @private
         * @returns {void}
         */
        this.thumbnailClick = function (event, isKeyboard) {
            // eslint-disable-next-line
            var proxy = _this;
            var target = event.target;
            var pageNumber = proxy.getPageNumberFromID(target.id);
            if (proxy.previousElement) {
                proxy.previousElement.classList.remove('e-pv-thumbnail-selection');
                proxy.previousElement.classList.remove('e-pv-thumbnail-focus');
                proxy.previousElement.classList.add('e-pv-thumbnail-selection-ring');
            }
            if (target.parentElement.id === proxy.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
                proxy.setSelectionStyle(target.parentElement);
                proxy.previousElement = target.parentElement;
            }
            else if (target.id === proxy.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
                proxy.setSelectionStyle(target);
                proxy.previousElement = target;
            }
            proxy.pdfViewer.fireThumbnailClick(pageNumber + 1);
            proxy.isThumbnailClicked = true;
            proxy.goToThumbnailPage(pageNumber + 1);
            if (!isKeyboard) {
                proxy.pdfViewerBase.focusViewerContainer();
            }
            if (_this.pdfViewer.annotationModule && _this.pdfViewer.annotationModule.inkAnnotationModule) {
                var currentPageNumber = parseInt(_this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
                _this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
            }
        };
        /**
         * @param {KeyboardEvent} event - It describes about the event
         * @private
         * @returns {void}
         */
        this.thumbnailKeydown = function (event) {
            if (event && event.key === 'Enter' || event.key === ' ') {
                _this.thumbnailClick(event, true);
                event.preventDefault();
                event.stopPropagation();
            }
        };
        /**
         * @param {MouseEvent} event - It describes about the event
         * @private
         * @returns {void}
         */
        this.thumbnailMouseOver = function (event) {
            // eslint-disable-next-line
            var proxy = _this;
            var target = event.target;
            var pageNumber = proxy.getPageNumberFromID(target.id);
            if (target.id === proxy.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
                proxy.setMouseOverStyle(target);
            }
            else if (target.id === proxy.pdfViewer.element.id + '_thumbnail_image_' + pageNumber) {
                proxy.setMouseOverStyle(target.parentElement);
            }
        };
        /**
         * @param {MouseEvent} event - It describes about the event
         * @private
         * @returns {void}
         */
        this.thumbnailMouseLeave = function (event) {
            // eslint-disable-next-line
            var proxy = _this;
            var target = event.target;
            var pageNumber = proxy.getPageNumberFromID(target.id);
            if (target.parentElement.id === proxy.pdfViewer.element.id + '_thumbnail_view') {
                proxy.setMouseLeaveStyle(target.children[0].children[0]);
            }
            else if (target.parentElement.id === proxy.pdfViewer.element.id + '_thumbnail_' + pageNumber) {
                proxy.setMouseLeaveStyle(target.parentElement.children[0]);
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.createThumbnailContainer = function () {
        this.thumbnailView = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_view', className: 'e-pv-thumbnail-view e-pv-thumbnail-row' });
        this.pdfViewerBase.navigationPane.sideBarContent.appendChild(this.thumbnailView);
        this.pdfViewerBase.navigationPane.sideBarContent.addEventListener('scrollend', this.thumbnailOnScroll);
    };
    /**
     * Open the thumbnail pane of the PdfViewer.
     *
     * @returns {void}
     */
    ThumbnailView.prototype.openThumbnailPane = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.openThumbnailPane();
        }
    };
    /**
     * Close the thumbnail pane of the PdfViewer.
     *
     * @returns {void}
     */
    ThumbnailView.prototype.closeThumbnailPane = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.closeThumbnailPane();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.createRequestForThumbnails = function () {
        // eslint-disable-next-line
        var proxy = this;
        proxy.thumbnailLimit = 0;
        for (var i = 0; i < proxy.pdfViewer.pageCount; i++) {
            proxy.renderThumbnailEmptyPage(i);
        }
        if (proxy.pdfViewer.isThumbnailViewOpen) {
            this.isThubmnailOpen = true;
            if (proxy.pdfViewerBase.navigationPane && proxy.pdfViewerBase.navigationPane.sideBarTitle) {
                proxy.pdfViewerBase.navigationPane.sideBarTitle.textContent = proxy.pdfViewer.localeObj.getConstant('Page Thumbnails');
            }
            if (document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_view')) {
                document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_view').style.display = 'flex';
            }
            var bookmarkContent = proxy.pdfViewer.element.querySelector('.e-pv-bookmark-view');
            if (bookmarkContent) {
                bookmarkContent.style.display = 'none';
            }
            proxy.pdfViewerBase.navigationPane.updateViewerContainerOnExpand();
            this.isThubmnailOpen = false;
            proxy.pdfViewerBase.navigationPane.isBookmarkOpen = false;
        }
        this.createRequestForThumbnailImages();
    };
    ThumbnailView.prototype.isThumbnailViewOpen = function () {
        // eslint-disable-next-line
        var proxy = this;
        if (proxy.pdfViewer.isThumbnailViewOpen) {
            proxy.pdfViewerBase.navigationPane.setThumbnailSelectionIconTheme();
            proxy.pdfViewerBase.navigationPane.isThumbnailOpen = true;
            this.pdfViewerBase.navigationPane.sideBarContentContainer.style.display = 'block';
            if (this.pdfViewer.enableRtl) {
                proxy.pdfViewerBase.viewerContainer.style.right = this.pdfViewerBase.navigationPane.getViewerContainerLeft() + 'px';
            }
            else {
                proxy.pdfViewerBase.viewerContainer.style.left = this.pdfViewerBase.navigationPane.getViewerContainerLeft() + 'px';
            }
            proxy.pdfViewerBase.viewerContainer.style.width = (proxy.pdfViewer.element.clientWidth - this.pdfViewerBase.navigationPane.getViewerContainerLeft() - this.pdfViewerBase.navigationPane.getViewerContainerRight()) + 'px';
            proxy.pdfViewerBase.pageContainer.style.width = proxy.pdfViewerBase.viewerContainer.clientWidth + 'px';
            proxy.pdfViewerBase.updateZoomValue();
        }
    };
    /**
     * Checks if thumbnails have been requested for the given page number.
     *
     * @param {number} pageNumber The page number to check.
     * @returns {boolean} True if thumbnails have been requested, otherwise false.
     */
    ThumbnailView.prototype.thumbnailsRequestedForPage = function (pageNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var requestedPage = _a[_i];
            if (pageNumber === requestedPage) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {number} pageNumber - Specify the pageNumber.
     * @returns {void}
     * @private
     */
    ThumbnailView.prototype.updateScrollTopForThumbnail = function (pageNumber) {
        var _this = this;
        var step = this.thumbnailRequestsBatch;
        var number = Math.floor((pageNumber + 1) / step) * step;
        var lastNum = this.pdfViewer.thumbnailViewModule.thumbnailLimit;
        var numbers = [number, number - step, number + step, lastNum];
        numbers.forEach(function (num) {
            if (num < 0) {
                return;
            }
            if (!_this.thumbnailsRequestedForPage(num)) {
                _this.renderThumbnailImage(null, num);
            }
        });
    };
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.renderThumbnailEmptyPage = function (pageIndex) {
        if (this.thumbnailView) {
            var pageLink = createElement('a', { id: 'page_' + pageIndex, attrs: { 'aria-label': 'Thumbnail of Page' + (pageIndex + 1), 'tabindex': '-1', 'role': 'link' }, className: 'e-pv-thumbnail-anchor-node' });
            var thumbnail = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_' + pageIndex, className: 'e-pv-thumbnail e-pv-thumbnail-column' });
            this.thumbnailSelectionRing = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageIndex, className: 'e-pv-thumbnail-selection-ring' });
            thumbnail.appendChild(this.thumbnailSelectionRing);
            var thumbnailPageNumber = createElement('div', { id: this.pdfViewer.element.id + '_thumbnail_pagenumber_' + pageIndex, className: 'e-pv-thumbnail-number' });
            thumbnailPageNumber.textContent = (pageIndex + 1).toString();
            thumbnail.appendChild(thumbnailPageNumber);
            var height = 180;
            this.thumbnailImage = createElement('img', { id: this.pdfViewer.element.id + '_thumbnail_image_' + pageIndex, className: 'e-pv-thumbnail-image' });
            if (this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)] &&
                (this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height <
                    this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].width)) {
                this.thumbnailImage.style.height = '86px';
                this.thumbnailImage.style.width = '126px';
                thumbnail.style.height = '100px';
                thumbnail.style.width = '140px';
                thumbnailPageNumber.style.left = '18px';
                pageLink.style.marginRight = '41px';
                thumbnail.style.marginLeft = '-5px';
                thumbnail.style.marginRight = '0px';
                height = 140;
            }
            if (pageIndex !== 0) {
                this.thumbnailTop = this.thumbnailPageSize[pageIndex - 1].top + this.thumbnailPageSize[pageIndex - 1].height;
                var thumbnailSize = { height: height, top: this.thumbnailTop };
                this.thumbnailPageSize[parseInt(pageIndex.toString(), 10)] = thumbnailSize;
            }
            else {
                var thumbnailSize = { height: height, top: this.thumbnailTop };
                this.thumbnailPageSize[parseInt(pageIndex.toString(), 10)] = thumbnailSize;
            }
            this.thumbnailSelectionRing.appendChild(this.thumbnailImage);
            pageLink.appendChild(thumbnail);
            this.thumbnailView.appendChild(pageLink);
            this.wireUpEvents();
            if (pageIndex === 0) {
                this.setMouseFocusToFirstPage();
            }
            this.pdfViewerBase.navigationPane.enableThumbnailButton();
        }
    };
    /**
     * @param {ThumbnailView} prox - It describes about the prox
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.renderViewPortThumbnailImage = function (prox) {
        var proxy = prox ? prox : this;
        // Removed the condition to skip multiple request for thumbnail image.
        proxy.startIndex = proxy.thumbnailLimit;
        this.list.push(proxy.startIndex);
        if (this.pdfViewerBase.pageSize.length === this.pdfViewerBase.pageCount && !this.isRendered) {
            this.renderDiv();
        }
        proxy.thumbnailLimit = proxy.startIndex + proxy.thumbnailThreshold < proxy.pdfViewer.pageCount ?
            proxy.startIndex + proxy.thumbnailThreshold : proxy.pdfViewer.pageCount;
        if (!this.pdfViewerBase.clientSideRendering) {
            var digitalSignaturePresent = false;
            for (var i = proxy.startIndex; i < proxy.thumbnailLimit; i++) {
                if (proxy.pdfViewerBase.digitalSignaturePresent(i)) {
                    digitalSignaturePresent = true;
                }
            }
            var digitalSignatureList = '';
            if (digitalSignaturePresent) {
                digitalSignatureList = proxy.pdfViewerBase.digitalSignaturePages.toString();
            }
            var jsonObject = { startPage: proxy.startIndex.toString(), endPage: proxy.thumbnailLimit.toString(), sizeX: '99.7', sizeY: '141', hashId: proxy.pdfViewerBase.hashId, action: 'RenderThumbnailImages', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId, digitalSignaturePresent: digitalSignaturePresent, digitalSignaturePageList: digitalSignatureList };
            if (this.pdfViewerBase.jsonDocumentId) {
                jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
            }
            this.thumbnailRequestHandler = new AjaxHandler(this.pdfViewer);
            this.thumbnailRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.renderThumbnail;
            this.thumbnailRequestHandler.responseType = 'json';
            if ((proxy.startIndex.toString() !== proxy.thumbnailLimit.toString()) && proxy.thumbnailLimit > 0 &&
                !isNullOrUndefined(proxy.pdfViewerBase.hashId)) {
                this.pdfViewerBase.requestCollection.push(this.thumbnailRequestHandler);
                this.thumbnailRequestHandler.send(jsonObject);
            }
            this.thumbnailRequestHandler.onSuccess = function (result) {
                var data = result.data;
                var redirect = proxy.pdfViewerBase.checkRedirection(data);
                if (!redirect) {
                    proxy.updateThumbnailCollection(data);
                }
            };
            this.thumbnailRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderThumbnail);
            };
            this.thumbnailRequestHandler.onError = function (result) {
                proxy.pdfViewerBase.openNotificationPopup();
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderThumbnail);
            };
        }
        else {
            for (var count = proxy.startIndex; count < proxy.thumbnailLimit; count++) {
                var currentPageImage = this.getThumbnailImageElement(count);
                var jsonObject = { documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId,
                    elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
                var isTextNeed = proxy.pdfViewer.textSearch ? true : false;
                var isSkipCharacterBounds = (this.pdfViewer.extractTextOption === ExtractTextOption.None ||
                    this.pdfViewer.extractTextOption === ExtractTextOption.TextOnly) ? true : false;
                if ((currentPageImage && currentPageImage.src === '') || (isNullOrUndefined(currentPageImage) && !isNullOrUndefined(this.pdfViewer.pageOrganizer))) {
                    this.pdfViewerBase.pdfViewerRunner.addTask({
                        pageIndex: count,
                        message: 'renderThumbnail',
                        isTextNeed: isTextNeed,
                        jsonObject: jsonObject,
                        isRenderText: isTextNeed,
                        requestType: isTextNeed ? 'pdfTextSearchRequest' : '',
                        isSkipCharacterBounds: isSkipCharacterBounds
                    }, TaskPriorityLevel.Low);
                }
            }
            this.isThumbnailViewOpen();
        }
    };
    /**
     * @param {any} event - It describes about the event
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.thumbnailOnMessage = function (event) {
        if (event.data.message === 'renderThumbnail') {
            var canvas = document.createElement('canvas');
            var _a = event.data, value = _a.value, width = _a.width, height = _a.height, pageIndex = _a.pageIndex;
            canvas.width = width;
            canvas.height = height;
            var canvasContext = canvas.getContext('2d');
            var imageData = canvasContext.createImageData(width, height);
            imageData.data.set(value);
            canvasContext.putImageData(imageData, 0, 0);
            var imageUrl = canvas.toDataURL();
            this.pdfViewerBase.releaseCanvas(canvas);
            var currentPageImage = this.getThumbnailImageElement(pageIndex);
            if (currentPageImage) {
                currentPageImage.src = imageUrl;
            }
            var data = ({
                thumbnailImage: imageUrl,
                startPage: this.startIndex,
                endPage: this.thumbnailLimit,
                uniqueId: this.pdfViewerBase.documentId,
                pageIndex: pageIndex
            });
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.updateThumbnailCollection(data);
            }
            else {
                if (!isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
                    this.pdfViewer.pageOrganizer.updatePreviewCollection(data);
                }
            }
        }
    };
    /**
     * @param {any} data - It describes about the data
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.updateThumbnailCollection = function (data) {
        if (data) {
            // eslint-disable-next-line
            var proxy = this;
            if (typeof data !== 'object') {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                    proxy.pdfViewerBase.onControlError(500, data, proxy.pdfViewer.serverActionSettings.renderThumbnail);
                    data = null;
                }
            }
            if (data && data.uniqueId === proxy.pdfViewerBase.documentId) {
                proxy.pdfViewer.fireAjaxRequestSuccess(proxy.pdfViewer.serverActionSettings.renderThumbnail, data);
                proxy.renderThumbnailImage(data);
            }
        }
    };
    ThumbnailView.prototype.renderDiv = function (data) {
        if ((this.pdfViewerBase.pageSize.length === this.pdfViewerBase.pageCount || !isNullOrUndefined(data)) && !this.isRendered) {
            for (var i = 100; i < this.pdfViewer.pageCount; i++) {
                var thumbnail = document.getElementById(this.pdfViewer.element.id + '_thumbnail_' + i);
                var pageLink = document.getElementById('page_' + i);
                var thumbnailPageNumber = document.getElementById(this.pdfViewer.element.id + '_thumbnail_pagenumber_' + i);
                var currentPageImage = this.getThumbnailImageElement(i);
                var height = 180;
                if ((this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)] &&
                    (this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].height <
                        this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].width)) ||
                    (data && (data.pageRotation[parseInt(i.toString(), 10)] === 1 ||
                        data.pageRotation[parseInt(i.toString(), 10)] === 3))) {
                    currentPageImage.style.height = '86px';
                    currentPageImage.style.width = '126px';
                    thumbnail.style.height = '100px';
                    thumbnail.style.width = '140px';
                    thumbnailPageNumber.style.left = '18px';
                    pageLink.style.marginRight = '41px';
                    thumbnail.style.marginLeft = '-5px';
                    thumbnail.style.marginRight = '0px';
                    height = 140;
                }
                if (this.thumbnailPageSize.length > 0) {
                    this.thumbnailTop = this.thumbnailPageSize[i - 1].top + this.thumbnailPageSize[i - 1].height;
                    var thumbnailSize = { height: height, top: this.thumbnailTop };
                    this.thumbnailPageSize[parseInt(i.toString(), 10)] = thumbnailSize;
                }
            }
            this.isRendered = true;
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.gotoThumbnailImage = function (pageNumber) {
        var shouldScroll = this.checkThumbnailScroll(pageNumber);
        if (this.thumbnailView) {
            var thumbnailChild = this.thumbnailView.children[parseInt(pageNumber.toString(), 10)];
            if (thumbnailChild) {
                var thumbnailDiv = thumbnailChild.children[0];
                var offsetTop = void 0;
                if (shouldScroll) {
                    if (this.pdfViewerBase.pageSize.length === this.pdfViewerBase.pageCount && !this.isRendered) {
                        this.renderDiv();
                    }
                    if (thumbnailDiv.offsetTop <= 0) {
                        offsetTop = thumbnailDiv.parentElement.offsetTop + thumbnailDiv.clientTop - this.thumbnailTopMargin;
                    }
                    else {
                        offsetTop = thumbnailDiv.offsetTop + thumbnailDiv.clientTop - this.thumbnailTopMargin;
                    }
                    this.pdfViewerBase.navigationPane.sideBarContent.scrollTop = offsetTop;
                }
                if (!this.isThumbnailClicked) {
                    if (this.previousElement) {
                        this.previousElement.classList.remove('e-pv-thumbnail-selection');
                        this.previousElement.classList.remove('e-pv-thumbnail-focus');
                        this.previousElement.classList.remove('e-pv-thumbnail-hover');
                        this.previousElement.classList.add('e-pv-thumbnail-selection-ring');
                    }
                    this.setFocusStyle(thumbnailDiv, pageNumber);
                }
                this.previousElement = thumbnailDiv.children[0];
            }
        }
    };
    /**
     * Determines if there is a need to request thumbnails based on the current page number.
     *
     * @param {number} currentPageNumber The current page number.
     * @returns {number} The page number to request thumbnails for.
     */
    ThumbnailView.prototype.determineThumbnailsRequest = function (currentPageNumber) {
        var pageCount = this.pdfViewer.pageCount;
        var batchSize = this.thumbnailRequestsBatch; // Assuming thumbnails are requested in batches of 50
        var numberOfBatches = Math.ceil(pageCount / batchSize);
        if (this.list.length === numberOfBatches) {
            return pageCount;
        }
        for (var i = 0; i < this.list.length; i++) {
            if (currentPageNumber === this.list[parseInt(i.toString(), 10)]) {
                currentPageNumber += batchSize;
                i = -1; // Resetting i to -1 to start from the beginning of the list again
            }
        }
        return currentPageNumber !== undefined && currentPageNumber < pageCount ? currentPageNumber : pageCount;
    };
    ThumbnailView.prototype.checkThumbnailScroll = function (pageNumber) {
        var shouldScroll = false;
        if (this.thumbnailView) {
            var visibleThumbs = this.getVisibleThumbs();
            var numVisibleThumbs = visibleThumbs.views.length;
            // if the thumbnail isn't currently visible, scroll it into view.
            if (numVisibleThumbs > 0) {
                var visibleFirstPageID = this.getPageNumberFromID(visibleThumbs.first.id);
                // account for only one thumbnail being visible.
                var visibleLastPageID = (numVisibleThumbs > 1 ?
                    this.getPageNumberFromID(visibleThumbs.last.id) : visibleFirstPageID);
                if (pageNumber <= visibleFirstPageID || pageNumber >= visibleLastPageID) {
                    shouldScroll = true;
                }
                else {
                    visibleThumbs.views.some(function (view) {
                        var pageID = view.id.split('_');
                        var thumbPageNumber = pageID[pageID.length - 1];
                        if (parseInt(thumbPageNumber, 10) !== pageNumber) {
                            return false;
                        }
                        shouldScroll = view.percent < 100 && (view.view.offsetWidth > view.view.offsetHeight && view.percent < 97);
                        return true;
                    });
                }
            }
        }
        return shouldScroll;
    };
    ThumbnailView.prototype.getPageNumberFromID = function (pageId) {
        var pageID = pageId.split('_');
        var pageNumber = pageID[pageID.length - 1];
        return parseInt(pageNumber, 10);
    };
    ThumbnailView.prototype.setFocusStyle = function (thumbnail, pageNumber) {
        if (thumbnail.children[0].id === this.pdfViewer.element.id + '_thumbnail_Selection_Ring_' + pageNumber) {
            this.setMouseFocusStyle(thumbnail.children[0]);
        }
    };
    ThumbnailView.prototype.renderThumbnailImage = function (data, pageNumber) {
        if (this.thumbnailView && data) {
            if (this.pdfViewerBase.clientSideRendering) {
                this.renderClientThumbnailImage(data);
            }
            else {
                this.renderServerThumbnailImage(data);
            }
        }
        if (!isNullOrUndefined(data) && !isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
            this.pdfViewer.pageOrganizer.getData(data, this.pdfViewerBase.clientSideRendering);
        }
        this.thumbnailLimit = this.determineThumbnailsRequest(!isNullOrUndefined(pageNumber) ? pageNumber : this.thumbnailLimit);
        if (this.thumbnailLimit !== this.pdfViewerBase.pageCount && (this.thumbnailView ||
            !isNullOrUndefined(this.pdfViewer.pageOrganizer))) {
            var isIE = !!document.documentMode;
            if (!isIE) {
                Promise.all([this.createRequestForThumbnailImages()]);
            }
            else {
                this.createRequestForThumbnailImages();
            }
        }
    };
    ThumbnailView.prototype.createRequestForThumbnailImages = function () {
        // eslint-disable-next-line
        var proxy = this;
        var isIE = !!document.documentMode;
        if (!isIE) {
            return new Promise(function (renderThumbnailImage, reject) {
                proxy.renderViewPortThumbnailImage(proxy);
            });
        }
        else {
            this.renderViewPortThumbnailImage(proxy);
            return null;
        }
    };
    ThumbnailView.prototype.renderServerThumbnailImage = function (data) {
        var startPage = !isNullOrUndefined(data && (data.startPage)) ? data.startPage : this.startIndex;
        var endPage = !isNullOrUndefined(data && (data.endPage)) ? data.endPage : this.thumbnailLimit;
        for (var i = startPage; i < endPage; i++) {
            this.thumbnailImageRender(i, data);
        }
        this.isThumbnailViewOpen();
    };
    ThumbnailView.prototype.renderClientThumbnailImage = function (data) {
        var pageIndex = data.pageIndex;
        this.thumbnailImageRender(pageIndex, data);
    };
    ThumbnailView.prototype.thumbnailImageRender = function (pageIndex, data) {
        if (!isNullOrUndefined(data.pageRotation) && Object.keys(data.pageRotation).length > 0 && !this.isRendered) {
            this.renderDiv(data);
        }
        var thumbnail = document.getElementById(this.pdfViewer.element.id + '_thumbnail_' + pageIndex);
        var pageLink = document.getElementById('page_' + pageIndex);
        var thumbnailPageNumber = document.getElementById(this.pdfViewer.element.id + '_thumbnail_pagenumber_' + pageIndex);
        var currentPageImage = this.getThumbnailImageElement(pageIndex);
        if (!isNullOrUndefined(thumbnail) && !isNullOrUndefined(currentPageImage)) {
            currentPageImage.src = this.pdfViewerBase.clientSideRendering || typeof data.thumbnailImage === 'string' || data.thumbnailImage instanceof String ? data.thumbnailImage : data.thumbnailImage[parseInt(pageIndex.toString(), 10)];
            currentPageImage.alt = this.pdfViewer.element.id + '_thumbnail_page_' + pageIndex;
            pageLink.setAttribute('aria-label', "Thumbnail of Page " + (pageIndex + 1));
            if (this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)] &&
                (this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height <
                    this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].width)) {
                currentPageImage.style.height = '86px';
                currentPageImage.style.width = '126px';
                thumbnail.style.height = '100px';
                thumbnail.style.width = '140px';
                // pageLink.style.left = '-25px';
                thumbnailPageNumber.style.left = '18px';
                pageLink.style.marginRight = '41px';
                thumbnail.style.marginLeft = '-5px';
                thumbnail.style.marginRight = '0px';
            }
            if (pageIndex === 0) {
                this.pdfViewerBase.navigationPane.enableThumbnailButton();
                this.isThumbnailViewOpen();
            }
        }
    };
    ThumbnailView.prototype.wireUpEvents = function () {
        if (this.thumbnailSelectionRing) {
            this.thumbnailSelectionRing.addEventListener('click', this.thumbnailClick);
            this.thumbnailImage.addEventListener('keydown', this.thumbnailKeydown);
            this.thumbnailSelectionRing.addEventListener('mouseover', this.thumbnailMouseOver);
            this.thumbnailSelectionRing.addEventListener('mouseleave', this.thumbnailMouseLeave);
        }
    };
    ThumbnailView.prototype.unwireUpEvents = function () {
        if (this.thumbnailSelectionRing && this.thumbnailImage) {
            this.thumbnailSelectionRing.removeEventListener('click', this.thumbnailClick);
            this.thumbnailImage.removeEventListener('keydown', this.thumbnailKeydown);
            this.thumbnailSelectionRing.removeEventListener('mouseover', this.thumbnailMouseOver);
            this.thumbnailSelectionRing.removeEventListener('mouseleave', this.thumbnailMouseLeave);
        }
    };
    ThumbnailView.prototype.goToThumbnailPage = function (pageNumber) {
        if (pageNumber > 0 && pageNumber <= this.pdfViewerBase.pageCount && this.pdfViewerBase.currentPageNumber !== pageNumber) {
            this.pdfViewerBase.updateScrollTop(pageNumber - 1);
        }
        else {
            this.isThumbnailClicked = false;
        }
    };
    ThumbnailView.prototype.setSelectionStyle = function (thumbnailElement) {
        thumbnailElement.classList.remove('e-pv-thumbnail-selection-ring');
        thumbnailElement.classList.remove('e-pv-thumbnail-hover');
        thumbnailElement.classList.remove('e-pv-thumbnail-focus');
        thumbnailElement.classList.add('e-pv-thumbnail-selection');
    };
    ThumbnailView.prototype.setMouseOverStyle = function (thumbnailElement) {
        if (!thumbnailElement.classList.contains('e-pv-thumbnail-selection')) {
            thumbnailElement.classList.remove('e-pv-thumbnail-selection-ring');
            if (!thumbnailElement.classList.contains('e-pv-thumbnail-focus')) {
                thumbnailElement.classList.add('e-pv-thumbnail-hover');
            }
        }
    };
    ThumbnailView.prototype.setMouseLeaveStyle = function (thumbnailElement) {
        if (!thumbnailElement.classList.contains('e-pv-thumbnail-selection')) {
            if (!thumbnailElement.classList.contains('e-pv-thumbnail-focus')) {
                thumbnailElement.classList.add('e-pv-thumbnail-selection-ring');
            }
            thumbnailElement.classList.remove('e-pv-thumbnail-hover');
        }
        else {
            if (!thumbnailElement.classList.contains('e-pv-thumbnail-selection')) {
                thumbnailElement.classList.remove('e-pv-thumbnail-selection');
                thumbnailElement.classList.add('e-pv-thumbnail-focus');
            }
        }
    };
    ThumbnailView.prototype.setMouseFocusStyle = function (thumbnailElement) {
        thumbnailElement.classList.remove('e-pv-thumbnail-selection');
        thumbnailElement.classList.remove('e-pv-thumbnail-hover');
        thumbnailElement.classList.add('e-pv-thumbnail-focus');
    };
    ThumbnailView.prototype.setMouseFocusToFirstPage = function () {
        var thumbnailChild = this.thumbnailView.children[0];
        if (thumbnailChild) {
            var thumbnailDiv = thumbnailChild.children[0].children[0];
            this.setMouseFocusStyle(thumbnailDiv);
            this.previousElement = thumbnailDiv;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.clear = function () {
        this.startIndex = 0;
        this.thumbnailLimit = 0;
        this.list = [];
        this.thumbnailPageSize = [];
        this.thumbnailTop = 0;
        this.isRendered = false;
        if (this.pdfViewerBase.navigationPane) {
            if (this.pdfViewerBase.navigationPane.sideBarContentContainer) {
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.display = 'block';
                this.pdfViewerBase.navigationPane.sideBarContent.scrollTop = 0;
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.display = 'none';
            }
        }
        if (this.thumbnailView) {
            while (this.thumbnailView.hasChildNodes()) {
                this.thumbnailView.removeChild(this.thumbnailView.lastChild);
            }
        }
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.resetThumbnailView();
        }
        if (this.thumbnailRequestHandler) {
            this.thumbnailRequestHandler.clear();
        }
        this.unwireUpEvents();
    };
    ThumbnailView.prototype.getVisibleThumbs = function () {
        return this.getVisibleElements(this.pdfViewerBase.navigationPane.sideBarContent, this.thumbnailView.children);
    };
    ThumbnailView.prototype.getVisibleElements = function (scrollElement, thumbnailViewChildren) {
        var top = scrollElement.scrollTop;
        var bottom = top + scrollElement.clientHeight;
        var left = scrollElement.scrollLeft;
        var right = left + scrollElement.clientWidth;
        /**
         * @param {HTMLElement} thumbnailViewChildrenElement - It describes about the thumbnail view children element
         * @returns {boolean} - boolean
         */
        function isThumbnailElementBottomAfterViewTop(thumbnailViewChildrenElement) {
            var elementBottom = thumbnailViewChildrenElement.offsetTop + thumbnailViewChildrenElement.clientTop + thumbnailViewChildrenElement.clientHeight;
            return elementBottom > top;
        }
        var visible = [];
        var thumbnailView;
        var element;
        var currentHeight;
        var viewHeight;
        var viewBottom;
        var hiddenHeight;
        var currentWidth;
        var viewWidth;
        var viewRight;
        var hiddenWidth;
        var percentVisible;
        var firstVisibleElementInd = thumbnailViewChildren.length === 0 ? 0 :
            this.binarySearchFirstItem(thumbnailViewChildren, isThumbnailElementBottomAfterViewTop);
        if (thumbnailViewChildren.length > 0) {
            firstVisibleElementInd =
                this.backtrackBeforeAllVisibleElements(firstVisibleElementInd, thumbnailViewChildren, top);
        }
        var lastEdge = -1;
        for (var i = firstVisibleElementInd, ii = thumbnailViewChildren.length; i < ii; i++) {
            thumbnailView = this.getThumbnailElement(i);
            element = thumbnailView;
            currentWidth = element.offsetLeft + element.clientLeft;
            currentHeight = element.offsetTop + element.clientTop;
            viewWidth = element.clientWidth;
            viewHeight = element.clientHeight;
            viewRight = currentWidth + viewWidth;
            viewBottom = currentHeight + viewHeight;
            if (lastEdge === -1) {
                if (viewBottom >= bottom) {
                    lastEdge = viewBottom;
                }
            }
            else if (currentHeight > lastEdge) {
                break;
            }
            if (viewBottom <= top || currentHeight >= bottom ||
                viewRight <= left || currentWidth >= right) {
                continue;
            }
            hiddenHeight = Math.max(0, top - currentHeight) +
                Math.max(0, viewBottom - bottom);
            hiddenWidth = Math.max(0, left - currentWidth) +
                Math.max(0, viewRight - right);
            percentVisible = ((viewHeight - hiddenHeight) * (viewWidth - hiddenWidth) * 100 / viewHeight / viewWidth) | 0;
            visible.push({
                id: thumbnailView.id,
                x: currentWidth,
                y: currentHeight,
                view: thumbnailView,
                percent: percentVisible
            });
        }
        var first = visible[0];
        var last = visible[visible.length - 1];
        return { first: first, last: last, views: visible };
    };
    ThumbnailView.prototype.binarySearchFirstItem = function (items, condition) {
        var minIndex = 0;
        var maxIndex = items.length - 1;
        if (items.length === 0 || !condition(this.getThumbnailElement(maxIndex))) {
            return items.length - 1;
        }
        if (condition(this.getThumbnailElement(minIndex))) {
            return minIndex;
        }
        while (minIndex < maxIndex) {
            var currentIndex = (minIndex + maxIndex) >> 1;
            if (condition(this.getThumbnailElement(currentIndex))) {
                maxIndex = currentIndex;
            }
            else {
                minIndex = currentIndex + 1;
            }
        }
        return minIndex; /* === maxIndex */
    };
    ThumbnailView.prototype.backtrackBeforeAllVisibleElements = function (index, views, top) {
        if (index < 2) {
            return index;
        }
        var thumbnailElement = this.getThumbnailElement(index);
        var pageTop = thumbnailElement.offsetTop + thumbnailElement.clientTop;
        if (pageTop >= top) {
            thumbnailElement = this.getThumbnailElement(index - 1);
            pageTop = thumbnailElement.offsetTop + thumbnailElement.clientTop;
        }
        for (var i = index - 2; i >= 0; --i) {
            thumbnailElement = this.getThumbnailElement(i);
            if (thumbnailElement.offsetTop + thumbnailElement.clientTop + thumbnailElement.clientHeight <= pageTop) {
                break;
            }
            index = i;
        }
        return index;
    };
    /**
     * @param {number} index - It describes about the index value
     * @private
     * @returns {HTMLElement} - html element
     */
    ThumbnailView.prototype.getThumbnailElement = function (index) {
        var thumbnailChild = this.thumbnailView.children[parseInt(index.toString(), 10)];
        return thumbnailChild.children[0];
    };
    /**
     * @param {number} index - It describes about the index value
     * @private
     * @returns {HTMLElement} - html element
     */
    ThumbnailView.prototype.getThumbnailLinkElement = function (index) {
        var thumbnailChild = this.thumbnailView.children[parseInt(index.toString(), 10)];
        return thumbnailChild;
    };
    /**
     * @param {number} index - It describes about the index value
     * @private
     * @returns {HTMLImageElement} - html image element
     */
    ThumbnailView.prototype.getThumbnailImageElement = function (index) {
        if (isNullOrUndefined(this.thumbnailView)) {
            return null;
        }
        var thumbnailChild = this.thumbnailView.children[parseInt(index.toString(), 10)];
        if (thumbnailChild) {
            return thumbnailChild.children[0].children[0].children[0];
        }
        else {
            return null;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ThumbnailView.prototype.destroy = function () {
        this.clear();
    };
    /**
     * @private
     * @returns {string} - string
     */
    ThumbnailView.prototype.getModuleName = function () {
        return 'ThumbnailView';
    };
    return ThumbnailView;
}());
export { ThumbnailView };
