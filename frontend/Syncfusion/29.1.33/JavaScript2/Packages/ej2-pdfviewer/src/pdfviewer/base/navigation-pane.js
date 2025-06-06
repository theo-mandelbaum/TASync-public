import { AnnotationDataFormat } from '../index';
import { createElement, Browser, isBlazor, initializeCSPTemplate, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Toolbar as Tool, ContextMenu as Context } from '@syncfusion/ej2-navigations';
import { Tooltip } from '@syncfusion/ej2-popups';
import { Toast } from '@syncfusion/ej2-notifications';
import { _decode } from '@syncfusion/ej2-pdf';
/**
 * The `NavigationPane` module is used to handle navigation pane for thumbnail and bookmark navigation of PDF viewer.
 *
 * @param {args} args - args
 * @returns {void}
 * @hidden
 */
var NavigationPane = /** @class */ (function () {
    /**
     * Initialize the constructor of navigationPane.
     *
     * @param { PdfViewer } viewer - Specified PdfViewer class.
     * @param { PdfViewerBase } base - The pdfViewerBase.
     */
    function NavigationPane(viewer, base) {
        var _this = this;
        this.thumbnailWidthMin = 200;
        this.contentContainerScrollWidth = 33;
        this.closeButtonLeft = 170;
        this.isTooltipCreated = false;
        this.annotationContextMenu = [];
        this.isCommentPanelShow = false;
        this.commentPanelWidthMin = 300;
        /**
         * @private
         */
        this.isThumbnail = false;
        /**
         * @private
         */
        this.isThumbnailAddedProgrammatically = false;
        /**
         * @private
         */
        this.isBookmarkOpenProgrammatically = false;
        /**
         * @private
         */
        this.isNavigationToolbarVisible = false;
        /**
         * @private
         */
        this.isBookmarkListOpen = false;
        /**
         * @private
         */
        this.isNavigationPaneResized = false;
        /**
         * @private
         */
        this.isBookmarkOpen = false;
        /**
         * @private
         */
        this.isThumbnailOpen = false;
        /**
         * @private
         */
        this.restrictUpdateZoomValue = true;
        this.loadImportAnnotation = function (args) {
            var upoadedFiles = args.target.files;
            if (args.target.files[0] !== null) {
                var uploadedFile = upoadedFiles[0];
                if (uploadedFile) {
                    _this.pdfViewer.fireImportStart(uploadedFile);
                    var uploadedFileType = uploadedFile.type;
                    if (uploadedFile.name.split('.json').length > 1 && uploadedFileType.includes('json')) {
                        var reader = new FileReader();
                        reader.readAsDataURL(uploadedFile);
                        reader.onload = function (e) {
                            if (e.currentTarget.result) {
                                var importFile = e.currentTarget.result.split(',')[1];
                                var annotationData = atob(importFile);
                                if (annotationData) {
                                    // Encountering a script error while attempting to import annotations from the older version JSON document. As a result, the below line has been commented: Task ID: 842694
                                    // annotationData = this.pdfViewerBase.getSanitizedString(annotationData);
                                    var jsonData = JSON.parse(annotationData);
                                    var firstAnnotation = jsonData.pdfAnnotation[Object.keys(jsonData.pdfAnnotation)[0]];
                                    if ((Object.keys(jsonData.pdfAnnotation).length >= 1) && (firstAnnotation.textMarkupAnnotation ||
                                        firstAnnotation.measureShapeAnnotation || firstAnnotation.freeTextAnnotation ||
                                        firstAnnotation.stampAnnotations || firstAnnotation.signatureInkAnnotation ||
                                        (firstAnnotation.shapeAnnotation && firstAnnotation.shapeAnnotation[0].Bounds))) {
                                        _this.pdfViewerBase.isPDFViewerJson = true;
                                        _this.pdfViewerBase.importAnnotations(jsonData, AnnotationDataFormat.Json);
                                    }
                                    else {
                                        _this.pdfViewerBase.isPDFViewerJson = false;
                                        if (!_this.pdfViewerBase.clientSideRendering) {
                                            _this.pdfViewerBase.importAnnotations(importFile, AnnotationDataFormat.Json);
                                        }
                                        else {
                                            _this.pdfViewerBase.importAnnotations(_decode(importFile), AnnotationDataFormat.Json);
                                        }
                                    }
                                }
                            }
                        };
                    }
                    else if (uploadedFile.name.split('.xfdf').length > 1 && (uploadedFileType.includes('xfdf') || args.target.accept.includes('xfdf'))) {
                        var reader = new FileReader();
                        if (!_this.pdfViewerBase.clientSideRendering) {
                            reader.readAsDataURL(uploadedFile);
                        }
                        else {
                            reader.readAsArrayBuffer(uploadedFile);
                        }
                        reader.onload = function (e) {
                            if (e.currentTarget.result) {
                                if (!_this.pdfViewerBase.clientSideRendering) {
                                    var importFile = e.currentTarget.result.split(',')[1];
                                    var annotationData = atob(importFile);
                                    if (annotationData) {
                                        _this.pdfViewerBase.importAnnotations(importFile, AnnotationDataFormat.Xfdf, true);
                                    }
                                }
                                else {
                                    var importFileByteArray = new Uint8Array(e.currentTarget.result);
                                    if (importFileByteArray) {
                                        _this.pdfViewerBase.importAnnotations(importFileByteArray, AnnotationDataFormat.Xfdf, true);
                                    }
                                }
                            }
                        };
                    }
                    else {
                        _this.pdfViewer.fireImportFailed(uploadedFile, _this.pdfViewer.localeObj.getConstant('Import Failed'));
                        if (isBlazor()) {
                            var promise = _this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_ImportFailed');
                            promise.then(function (value) {
                                _this.pdfViewerBase.openImportExportNotificationPopup(value);
                            });
                        }
                        else {
                            _this.pdfViewerBase.openImportExportNotificationPopup(_this.pdfViewer.localeObj.getConstant('Import Failed'));
                        }
                    }
                }
                args.target.value = '';
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.resizeIconMouseOver = function (event) {
            event.srcElement.style.cursor = 'e-resize';
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.resizePanelMouseDown = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            proxy.offset = [
                proxy.sideBarResizer.offsetLeft - event.clientX,
                proxy.sideBarResizer.offsetTop - event.clientY,
                proxy.sideBarResizer.offsetParent.clientWidth
            ];
            _this.previousX = event.clientX;
            proxy.isDown = true;
            proxy.isNavigationPaneResized = true;
            proxy.pdfViewerBase.viewerContainer.style.cursor = 'e-resize';
            if (proxy.sideBarContentContainer) {
                proxy.sideBarContentContainer.style.cursor = 'e-resize';
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.resizeViewerMouseLeave = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            if (proxy.isDown) {
                setTimeout(function () {
                    proxy.pdfViewerBase.onWindowResize();
                }, 200);
            }
            proxy.isDown = false;
            if (proxy.isNavigationPaneResized && proxy.sideBarContentContainer) {
                proxy.pdfViewerBase.viewerContainer.style.cursor = 'default';
                proxy.sideBarContentContainer.style.cursor = 'default';
                proxy.isNavigationPaneResized = false;
            }
            if (proxy.commentPanelContainer && proxy.isCommentPanelShow) {
                _this.commentPanelMouseLeave(event);
                proxy.isCommentPanelShow = false;
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.resizePanelMouseMove = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            if (!_this.pdfViewerBase.getPopupNoteVisibleStatus()) {
                var target = event.target;
                if (_this.pdfViewerBase.skipPreventDefault(target)) {
                    event.preventDefault();
                }
                if (proxy.isDown && _this.sideBarContentContainer) {
                    // prevent the sidebar from becoming too narrow, or from occupying more
                    // than half of the available viewer width.
                    if (_this.pdfViewer.enableRtl) {
                        var currentWidth = _this.previousX - event.clientX;
                        var width = currentWidth + proxy.offset[2];
                        var maxWidth = Math.floor(_this.outerContainerWidth / 2);
                        if (width > maxWidth) {
                            width = maxWidth;
                        }
                        if (width < _this.thumbnailWidthMin) {
                            width = _this.thumbnailWidthMin;
                        }
                        proxy.sideBarResizer.style.right = width + 'px';
                        proxy.sideBarContentContainer.style.width = width + 'px';
                        proxy.sideBarContent.style.width = width + 'px';
                        proxy.sideBarContentSplitter.style.width = width + 'px';
                        proxy.sideBarTitleContainer.style.width = width + 'px';
                        proxy.pdfViewerBase.viewerContainer.style.right = proxy.getViewerContainerLeft() + 'px';
                        proxy.pdfViewerBase.viewerContainer.style.left = proxy.getViewerContainerRight() + 'px';
                    }
                    else {
                        var width = event.clientX + proxy.offset[0];
                        var maxWidth = Math.floor(_this.outerContainerWidth / 2);
                        if (width > maxWidth) {
                            width = maxWidth;
                        }
                        if (width < _this.thumbnailWidthMin) {
                            width = _this.thumbnailWidthMin;
                        }
                        proxy.sideBarResizer.style.left = width + 'px';
                        proxy.closeDiv.style.left = width - proxy.contentContainerScrollWidth + 'px';
                        proxy.sideBarContentContainer.style.width = width + 'px';
                        proxy.sideBarContent.style.width = width + 'px';
                        proxy.sideBarContentSplitter.style.width = width + 'px';
                        proxy.sideBarTitleContainer.style.width = width + 'px';
                        proxy.pdfViewerBase.viewerContainer.style.left = proxy.getViewerContainerLeft() + 'px';
                        proxy.pdfViewerBase.viewerContainer.style.right = proxy.getViewerContainerRight() + 'px';
                    }
                    var viewerWidth = (proxy.pdfViewer.element.clientWidth - proxy.getViewerContainerLeft() -
                        proxy.getViewerContainerRight());
                    proxy.pdfViewerBase.viewerContainer.style.width = viewerWidth + 'px';
                    proxy.pdfViewerBase.pageContainer.style.width = proxy.pdfViewerBase.viewerContainer.clientWidth + 'px';
                    proxy.pdfViewer.thumbnailViewModule.gotoThumbnailImage(proxy.pdfViewerBase.currentPageNumber - 1);
                    proxy.pdfViewer.thumbnailViewModule.renderViewPortThumbnailImage();
                    proxy.pdfViewerBase.updateZoomValue();
                    if (!proxy.bookmarkButton.children[0].classList.contains('e-pv-bookmark-disable-icon')) {
                        proxy.pdfViewer.bookmarkViewModule.setBookmarkContentHeight();
                    }
                }
                else if (proxy.isCommentPanelShow && _this.commentPanelContainer) {
                    _this.updateCommentPanelContainer(event);
                }
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.sideToolbarOnClose = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            proxy.removeThumbnailSelectionIconTheme();
            proxy.removeBookmarkSelectionIconTheme();
            proxy.updateViewerContainerOnClose();
            proxy.isThumbnailAddedProgrammatically = false;
            proxy.isBookmarkOpenProgrammatically = false;
            proxy.isThumbnail = false;
            proxy.isBookmarkOpen = false;
        };
        /**
         * Private method to handle the click event of the "organize" button.
         *
         * @param {MouseEvent} event - The MouseEvent object representing the click event.
         * @returns {void}
         */
        this.organizeButtonOnClick = function (event) {
            if (!isNullOrUndefined(_this.pdfViewer.pageOrganizer)) {
                _this.pdfViewer.pageOrganizer.createOrganizeWindow();
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @private
         * @returns {void}
         */
        this.sideToolbarOnClick = function (event) {
            _this.sideBarTitle.textContent = _this.pdfViewer.localeObj.getConstant('Page Thumbnails');
            _this.sideBarContent.setAttribute('aria-label', 'Thumbnail View Panel');
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            var bookmarkPane = document.getElementById(_this.pdfViewer.element.id + '_bookmark_view');
            if (bookmarkPane) {
                proxy.removeBookmarkSelectionIconTheme();
                bookmarkPane.style.display = 'none';
            }
            document.getElementById(_this.pdfViewer.element.id + '_thumbnail_view').style.display = 'flex';
            if (proxy.sideBarContentContainer) {
                if (proxy.sideBarContentContainer.style.display !== 'none') {
                    if (proxy.isBookmarkOpen) {
                        proxy.isThumbnailOpen = true;
                        proxy.isThumbnail = true;
                        proxy.setThumbnailSelectionIconTheme();
                        proxy.updateViewerContainerOnExpand();
                        document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_image_' + (proxy.pdfViewerBase.currentPageNumber - 1)).focus();
                        proxy.isThumbnailAddedProgrammatically = true;
                    }
                    else {
                        proxy.isThumbnailOpen = false;
                        proxy.removeThumbnailSelectionIconTheme();
                        proxy.updateViewerContainerOnClose();
                        proxy.isThumbnailAddedProgrammatically = false;
                        proxy.isThumbnail = false;
                    }
                }
                else {
                    proxy.sideBarContent.focus();
                    proxy.isThumbnailOpen = true;
                    proxy.setThumbnailSelectionIconTheme();
                    proxy.updateViewerContainerOnExpand();
                    proxy.isThumbnail = true;
                    if (!isNullOrUndefined(document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_image_' + (proxy.pdfViewerBase.currentPageNumber - 1)))) {
                        document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_image_' + (proxy.pdfViewerBase.currentPageNumber - 1)).focus();
                    }
                    proxy.isThumbnailAddedProgrammatically = true;
                }
            }
            proxy.isBookmarkOpen = false;
            proxy.isBookmarkOpenProgrammatically = false;
            if (_this.pdfViewer.annotationModule && _this.pdfViewer.annotationModule.inkAnnotationModule) {
                var currentPageNumber = parseInt(_this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
                _this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.openThumbnailPane = function () {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            var sideBarContent = document.getElementById(_this.pdfViewer.element.id + '_sideBarContent');
            var sideBarContentContainer = document.getElementById(_this.pdfViewer.element.id + '_sideBarContentContainer');
            var viewerContainer = document.getElementById(_this.pdfViewer.element.id + '_viewerContainer');
            var pageContainer = document.getElementById(_this.pdfViewer.element.id + '_pageViewContainer');
            document.getElementById(_this.pdfViewer.element.id + '_thumbnail_view').style.display = 'block';
            document.getElementById(_this.pdfViewer.element.id + '_sideBarResizer').style.display = 'none';
            proxy.sideBarTitle.textContent = _this.pdfViewer.localeObj.getConstant('Page Thumbnails');
            proxy.sideBarContent.setAttribute('aria-label', 'Thumbnail View Panel');
            proxy.sideBarContent.setAttribute('tabindex', '0');
            var bookmarkPane = document.getElementById(_this.pdfViewer.element.id + '_bookmark_view');
            if (bookmarkPane) {
                proxy.removeBookmarkSelectionIconTheme();
                bookmarkPane.style.display = 'none';
            }
            if (sideBarContentContainer && !_this.isThumbnailAddedProgrammatically) {
                if (proxy.isThumbnail) {
                    sideBarContentContainer.style.display = 'none';
                    viewerContainer.style.width = proxy.pdfViewer.element.clientWidth + 'px';
                    pageContainer.style.width = viewerContainer.clientWidth + 'px';
                    viewerContainer.style.left = sideBarContentContainer.clientWidth + 'px';
                    proxy.pdfViewerBase.updateZoomValue();
                    proxy.removeThumbnailSelectionIconTheme();
                    proxy.isThumbnail = false;
                }
                else {
                    sideBarContent.focus();
                    proxy.setThumbnailSelectionIconTheme();
                    proxy.updateViewerContainerOnExpand();
                    proxy.isThumbnail = true;
                    proxy.pdfViewerBase.updateZoomValue();
                    if (!isNullOrUndefined(proxy.pdfViewer.thumbnailViewModule)) {
                        proxy.pdfViewer.thumbnailViewModule.gotoThumbnailImage(proxy.pdfViewerBase.currentPageNumber - 1);
                    }
                    proxy.isThumbnailAddedProgrammatically = true;
                    proxy.isThumbnailOpen = true;
                    proxy.isBookmarkOpen = false;
                    proxy.isBookmarkOpenProgrammatically = false;
                }
            }
            if (_this.pdfViewer.annotationModule && _this.pdfViewer.annotationModule.inkAnnotationModule) {
                var currentPageNumber = parseInt(_this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
                _this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeThumbnailPane = function () {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            if (proxy.isThumbnail || proxy.isThumbnailAddedProgrammatically || proxy.pdfViewer.isThumbnailViewOpen) {
                proxy.sideBarContent.removeAttribute('tabindex');
                proxy.removeThumbnailSelectionIconTheme();
                proxy.isThumbnailOpen = false;
                proxy.updateViewerContainerOnClose();
                proxy.isThumbnailAddedProgrammatically = false;
                proxy.isThumbnail = false;
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @private
         * @returns {void}
         */
        this.bookmarkButtonOnClick = function (event) {
            _this.openBookmarkcontentInitially(true);
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeBookmarkPane = function () {
            // eslint-disable-next-line
            var proxy = _this;
            if (proxy.isBookmarkOpen || proxy.isBookmarkOpenProgrammatically) {
                proxy.removeBookmarkSelectionIconTheme();
                proxy.isBookmarkOpen = false;
                proxy.updateViewerContainerOnClose();
                proxy.isBookmarkOpenProgrammatically = false;
                proxy.isBookmarkListOpen = false;
            }
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.commentPanelMouseDown = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            proxy.offset = [
                proxy.commentPanelResizer.offsetLeft - event.clientX,
                proxy.commentPanelResizer.offsetTop - event.clientY,
                proxy.getViewerContainerRight()
            ];
            _this.isCommentPanelShow = true;
            _this.previousX = event.clientX;
            proxy.pdfViewerBase.viewerContainer.style.cursor = 'e-resize';
            proxy.commentPanelResizer.style.cursor = 'e-resize';
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.updateCommentPanelContainer = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            // prevent the commentPanel from becoming too narrow, or from occupying more
            // than half of the available viewer width.
            if (_this.pdfViewer.enableRtl) {
                var width = event.clientX + proxy.offset[0];
                var maxWidth = Math.floor(_this.outerContainerWidth / 2);
                if (width > maxWidth) {
                    width = maxWidth;
                }
                if (width < _this.commentPanelWidthMin) {
                    width = _this.commentPanelWidthMin;
                }
                proxy.commentPanelResizer.style.left = width + 'px';
                proxy.commentPanelContainer.style.width = width + 'px';
                proxy.pdfViewerBase.viewerContainer.style.left = proxy.getViewerContainerRight() + 'px';
                proxy.pdfViewerBase.viewerContainer.style.right = proxy.getViewerContainerLeft() + 'px';
            }
            else {
                var currentWidth = _this.previousX - event.clientX;
                var width = currentWidth + proxy.offset[2];
                var maxWidth = Math.floor(_this.outerContainerWidth / 2);
                if (width > maxWidth) {
                    width = maxWidth;
                }
                if (width < _this.commentPanelWidthMin) {
                    width = _this.commentPanelWidthMin;
                }
                proxy.commentPanelResizer.style.right = width + 'px';
                proxy.commentPanelContainer.style.width = width + 'px';
                proxy.pdfViewerBase.viewerContainer.style.right = proxy.getViewerContainerRight() + 'px';
                proxy.pdfViewerBase.viewerContainer.style.left = proxy.getViewerContainerLeft() + 'px';
            }
            _this.pdfViewer.annotation.stickyNotesAnnotationModule.updateCommentPanelTextTop();
            var viewerWidth = (proxy.pdfViewer.element.clientWidth - proxy.getViewerContainerLeft() -
                proxy.getViewerContainerRight());
            proxy.pdfViewerBase.viewerContainer.style.width = viewerWidth + 'px';
            proxy.pdfViewerBase.pageContainer.style.width = proxy.pdfViewerBase.viewerContainer.clientWidth + 'px';
            proxy.calculateCommentPanelWidth();
            proxy.pdfViewerBase.updateZoomValue();
        };
        /**
         * @param {MouseEvent} event - The event.
         * @returns {void}
         */
        this.commentPanelMouseLeave = function (event) {
            var proxy = null;
            // eslint-disable-next-line
            proxy = _this;
            if (proxy.commentPanelContainer) {
                proxy.pdfViewerBase.viewerContainer.style.cursor = 'default';
                proxy.commentPanelContainer.style.cursor = 'default';
            }
        };
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.initializeNavigationPane = function () {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            this.createNavigationPane();
        }
        else {
            this.commentPanelContainer = createElement('div', { id: this.pdfViewer.element.id + '_commantPanel', className: 'e-pv-mobile-comments-container' });
            this.pdfViewerBase.mainContainer.appendChild(this.commentPanelContainer);
            if (this.pdfViewer.enableRtl) {
                this.commentPanelContainer.style.left = 0 + 'px';
            }
            else {
                this.commentPanelContainer.style.right = 0 + 'px';
            }
            this.commentPanelContainer.style.bottom = 0 + 'px';
            this.createCommentPanelTitleContainer();
            this.commentPanelContainer.style.display = 'none';
            this.commentsContentContainer = createElement('div', { id: this.pdfViewer.element.id + '_commentscontentcontainer', className: 'e-pv-comments-content-container' });
            this.commentPanelContainer.appendChild(this.commentsContentContainer);
            this.createFileElement(this.commentPanelContainer);
            this.createXFdfFileElement(this.commentPanelContainer);
        }
    };
    NavigationPane.prototype.createNavigationPane = function () {
        var isblazor = isBlazor();
        if (!isblazor) {
            this.sideBarToolbar = createElement('div', { id: this.pdfViewer.element.id + '_sideBarToolbar', className: 'e-pv-sidebar-toolbar', attrs: { 'role': 'toolbar', 'aria-orientation': 'vertical', 'tabindex': '-1', 'aria-label': 'Sidebar Toolbar' } });
            this.sideBarToolbarSplitter = createElement('div', { id: this.pdfViewer.element.id + '_sideBarToolbarSplitter', className: 'e-pv-sidebar-toolbar-splitter' });
            this.sideBarContentContainer = createElement('div', { id: this.pdfViewer.element.id + '_sideBarContentContainer', className: 'e-pv-sidebar-content-container' });
            this.sideBarContentSplitter = createElement('div', { id: this.pdfViewer.element.id + '_sideBarContentSplitter', className: 'e-pv-sidebar-content-splitter' });
            this.sideBarContent = createElement('div', { id: this.pdfViewer.element.id + '_sideBarContent', className: 'e-pv-sidebar-content' });
            this.sideBarTitleContainer = createElement('div', { id: this.pdfViewer.element.id + '_sideBarTitleContainer', className: 'e-pv-sidebar-title-container' });
            this.sideBarTitle = createElement('div', { id: this.pdfViewer.element.id + '_sideBarTitle', className: 'e-pv-sidebar-title', attrs: { 'tabindex': '-1' } });
            this.sideBarResizer = createElement('div', { id: this.pdfViewer.element.id + '_sideBarResizer', className: 'e-pv-sidebar-resizer' });
        }
        else {
            this.sideBarToolbar = this.pdfViewer.element.querySelector('.e-pv-sidebar-toolbar');
            this.sideBarToolbarSplitter = this.pdfViewer.element.querySelector('.e-pv-sidebar-toolbar-splitter');
            this.sideBarContentContainer = this.pdfViewer.element.querySelector('.e-pv-sidebar-content-container');
            this.sideBarContentSplitter = this.pdfViewer.element.querySelector('.e-pv-sidebar-content-splitter');
            this.sideBarContent = this.pdfViewer.element.querySelector('.e-pv-sidebar-content');
            this.sideBarTitleContainer = this.pdfViewer.element.querySelector('.e-pv-sidebar-title-container');
            this.sideBarTitle = this.pdfViewer.element.querySelector('.e-pv-sidebar-title');
            this.sideBarResizer = this.pdfViewer.element.querySelector('.e-pv-sidebar-resizer');
        }
        this.pdfViewerBase.mainContainer.appendChild(this.sideBarToolbar);
        if (this.pdfViewer.enableRtl) {
            this.sideBarToolbar.style.cssFloat = 'right';
            this.sideBarToolbar.style.right = 1 + 'px';
            this.sideBarToolbar.style.position = 'relative';
        }
        this.pdfViewerBase.mainContainer.appendChild(this.sideBarToolbarSplitter);
        if (this.pdfViewer.enableRtl) {
            this.sideBarToolbarSplitter.classList.add('e-right');
        }
        else {
            this.sideBarToolbarSplitter.classList.add('e-left');
        }
        if (this.pdfViewer.enableRtl) {
            this.sideBarContentContainer.classList.add('e-right');
        }
        else {
            this.sideBarContentContainer.classList.add('e-left');
        }
        this.pdfViewerBase.mainContainer.appendChild(this.sideBarContentContainer);
        if (this.pdfViewer.enableRtl) {
            this.sideBarContentSplitter.style.right = 0 + 'px';
        }
        this.sideBarContentContainer.appendChild(this.sideBarContentSplitter);
        if (this.pdfViewer.enableRtl) {
            this.sideBarContent.style.right = 0 + 'px';
            this.sideBarContent.style.direction = 'rtl';
        }
        this.sideBarContentContainer.appendChild(this.sideBarContent);
        if (this.pdfViewer.enableRtl) {
            this.sideBarTitleContainer.style.right = 0 + 'px';
        }
        if (this.pdfViewer.enableRtl) {
            this.sideBarTitle.classList.add('e-right');
        }
        else {
            this.sideBarTitle.classList.add('e-left');
        }
        this.sideBarTitleContainer.appendChild(this.sideBarTitle);
        this.sideBarContentContainer.appendChild(this.sideBarTitleContainer);
        this.sideBarResizer.addEventListener('mousedown', this.resizePanelMouseDown);
        this.pdfViewerBase.mainContainer.addEventListener('mousemove', this.resizePanelMouseMove);
        this.pdfViewerBase.mainContainer.addEventListener('mouseup', this.resizeViewerMouseLeave);
        if (this.pdfViewer.enableRtl) {
            this.sideBarResizer.classList.add('e-right');
        }
        else {
            this.sideBarResizer.classList.add('e-left');
        }
        this.sideBarContentContainer.appendChild(this.sideBarResizer);
        this.createCommentPanel();
        var controlLeft = this.getViewerContainerLeft();
        var controlRight = this.getViewerContainerRight();
        if (!this.pdfViewer.enableRtl) {
            this.pdfViewerBase.viewerContainer.style.left = controlLeft + 'px';
            this.pdfViewerBase.viewerContainer.style.right = controlRight + 'px';
        }
        this.pdfViewerBase.viewerContainer.style.width = (this.pdfViewer.element.clientWidth - controlLeft - this.commentPanelContainer.clientWidth) + 'px';
        this.sideBarContentContainer.style.display = 'none';
        if (!this.pdfViewer.enableNavigationToolbar) {
            if (!this.pdfViewer.enableRtl) {
                this.sideBarContentContainer.style.left = '0px';
            }
            else {
                this.sideBarContentContainer.style.right = '0px';
            }
        }
        this.createSidebarToolBar();
        this.createSidebarTitleCloseButton();
        this.createResizeIcon();
        this.sideBarToolbar.addEventListener('mouseup', this.sideToolbarOnMouseup.bind(this));
        this.sideBarContentContainer.addEventListener('mouseup', this.sideBarTitleOnMouseup.bind(this));
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.adjustPane = function () {
        if (isBlazor()) {
            var splitterElement = this.pdfViewer.element.querySelector('.e-pv-sidebar-toolbar-splitter');
            var sideToolbarElement = this.pdfViewer.element.querySelector('.e-pv-sidebar-toolbar');
            var sideToolbarContent = this.pdfViewer.element.querySelector('.e-pv-sidebar-content-container');
            var toolbarContainer = this.pdfViewer.element.querySelector('.e-pv-toolbar');
            var toolbarHeight = toolbarContainer.getBoundingClientRect().height;
            if (toolbarHeight === 0) {
                toolbarHeight = parseFloat(window.getComputedStyle(toolbarContainer)['height']) + 1;
            }
            if (!this.pdfViewer.enableToolbar) {
                toolbarHeight = 0;
            }
            sideToolbarElement.style.top = toolbarHeight + 'px';
            sideToolbarContent.style.top = toolbarHeight + 'px';
            splitterElement.style.top = toolbarHeight + 'px';
            sideToolbarElement.style.height = this.getSideToolbarHeight(toolbarHeight);
            sideToolbarContent.style.height = this.getSideToolbarHeight(toolbarHeight);
            splitterElement.style.height = this.getSideToolbarHeight(toolbarHeight);
            this.pdfViewerBase.viewerContainer.style.height = this.getSideToolbarHeight(toolbarHeight);
        }
        else {
            var splitterElement = this.pdfViewerBase.getElement('_sideBarToolbarSplitter');
            var toolbarContainer = this.pdfViewerBase.getElement('_toolbarContainer');
            var toolbarHeight = toolbarContainer.clientHeight;
            if (toolbarHeight === 0) {
                toolbarHeight = parseFloat(window.getComputedStyle(toolbarContainer)['height']) + 1;
            }
            this.sideBarToolbar.style.top = toolbarHeight + 'px';
            this.sideBarContentContainer.style.top = toolbarHeight + 'px';
            splitterElement.style.top = toolbarHeight + 'px';
        }
    };
    NavigationPane.prototype.getSideToolbarHeight = function (toolbarHeight) {
        var height = this.pdfViewer.element.getBoundingClientRect().height;
        return (height !== 0) ? height - toolbarHeight + 'px' : '';
    };
    NavigationPane.prototype.createCommentPanel = function () {
        this.commentPanelContainer = createElement('div', { id: this.pdfViewer.element.id + '_commantPanel', className: 'e-pv-comment-panel' });
        this.pdfViewerBase.mainContainer.appendChild(this.commentPanelContainer);
        if (this.pdfViewer.enableRtl) {
            this.commentPanelContainer.style.left = 0 + 'px';
        }
        else {
            this.commentPanelContainer.style.right = 0 + 'px';
        }
        this.commentPanelContainer.style.bottom = 0 + 'px';
        this.createCommentPanelTitleContainer();
        this.commentPanelContainer.style.display = 'none';
        this.commentsContentContainer = createElement('div', { id: this.pdfViewer.element.id + '_commentscontentcontainer', className: 'e-pv-comments-content-container' });
        this.commentPanelContainer.appendChild(this.commentsContentContainer);
        this.commentPanelResizer = createElement('div', { id: this.pdfViewer.element.id + '_commentPanelResizer', className: 'e-pv-comment-panel-resizer' });
        if (this.pdfViewer.enableRtl) {
            this.commentPanelResizer.classList.add('e-left');
        }
        else {
            this.commentPanelResizer.classList.add('e-right');
        }
        this.commentPanelResizer.style.display = 'none';
        this.commentPanelResizer.addEventListener('mousedown', this.commentPanelMouseDown);
        this.pdfViewerBase.mainContainer.appendChild(this.commentPanelResizer);
        this.createCommentPanelResizeIcon();
        this.createFileElement(this.commentPanelContainer);
        this.createXFdfFileElement(this.commentPanelContainer);
    };
    NavigationPane.prototype.createCommentPanelTitleContainer = function () {
        var commentPanelTitleContainer = createElement('div', { id: this.pdfViewer.element.id + '_commentPanelTitleContainer', className: 'e-pv-comment-panel-title-container' });
        var commentpanelTilte = createElement('div', { id: this.pdfViewer.element.id + '_commentPanelTitle', className: 'e-pv-comment-panel-title', attrs: { 'tabindex': '-1' } });
        if (isBlazor()) {
            var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_Comments');
            promise.then(function (value) {
                commentpanelTilte.innerText = value;
            });
        }
        else {
            commentpanelTilte.innerText = this.pdfViewer.localeObj.getConstant('Comments');
        }
        var annotationButton = createElement('button', { id: this.pdfViewer.element.id + '_annotations_btn' });
        annotationButton.setAttribute('aria-label', 'annotation button');
        annotationButton.setAttribute('type', 'button');
        annotationButton.className = 'e-btn e-pv-tbar-btn e-pv-comment-panel-title-close-div e-btn';
        var moreOptionButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_annotation_more_icon', className: 'e-pv-more-icon e-pv-icon' });
        annotationButton.appendChild(moreOptionButtonSpan);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && !isBlazor()) {
            var commentCloseIconDiv = createElement('button');
            commentCloseIconDiv.setAttribute('aria-label', 'annotation button');
            commentCloseIconDiv.setAttribute('type', 'button');
            commentCloseIconDiv.style.borderColor = 'transparent';
            commentCloseIconDiv.style.paddingTop = '11px';
            commentCloseIconDiv.style.paddingBottom = '11px';
            commentCloseIconDiv.style.backgroundColor = 'transparent';
            commentCloseIconDiv.addEventListener('click', this.closeCommentPanelContainer.bind(this));
            commentpanelTilte.style.left = '37px';
            var commentCloseIcon = createElement('span', { className: 'e-pv-annotation-tools-close-icon e-pv-icon' });
            commentCloseIconDiv.appendChild(commentCloseIcon);
            commentPanelTitleContainer.appendChild(commentCloseIconDiv);
        }
        commentPanelTitleContainer.appendChild(commentpanelTilte);
        commentPanelTitleContainer.appendChild(annotationButton);
        this.commentPanelContainer.appendChild(commentPanelTitleContainer);
        this.createAnnotationContextMenu();
        annotationButton.addEventListener('click', this.openAnnotationContextMenu.bind(this));
    };
    NavigationPane.prototype.createCommentPanelResizeIcon = function () {
        this.commentPanelResizeIcon = createElement('div', { id: this.pdfViewer.element.id + '_commentPanel_resize', className: 'e-pv-resize-icon e-pv-icon' });
        this.setCommentPanelResizeIconTop();
        this.commentPanelResizeIcon.style.position = 'absolute';
        this.commentPanelResizer.appendChild(this.commentPanelResizeIcon);
    };
    NavigationPane.prototype.openAnnotationContextMenu = function (event) {
        this.annotationMenuObj.open(event.clientY, event.clientX, event.currentTarget);
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.createAnnotationContextMenu = function () {
        this.annotationContextMenu = [
            { text: this.pdfViewer.localeObj.getConstant('Export Annotations') },
            { text: this.pdfViewer.localeObj.getConstant('Import Annotations') },
            { text: this.pdfViewer.localeObj.getConstant('Export XFDF') },
            { text: this.pdfViewer.localeObj.getConstant('Import XFDF') }
        ];
        var annotationMenuElement = createElement('ul', { id: this.pdfViewer.element.id + '_annotation_context_menu' });
        this.pdfViewer.element.appendChild(annotationMenuElement);
        this.annotationMenuObj = new Context({
            target: '#' + this.pdfViewer.element.id + '_annotations_btn', items: this.annotationContextMenu,
            select: this.annotationMenuItemSelect.bind(this)
        });
        if (this.pdfViewer.enableRtl) {
            this.annotationMenuObj.enableRtl = true;
        }
        this.annotationMenuObj.appendTo(annotationMenuElement);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.annotationMenuObj.animationSettings.effect = 'ZoomIn';
        }
        else {
            this.annotationMenuObj.animationSettings.effect = 'SlideDown';
        }
    };
    NavigationPane.prototype.annotationMenuItemSelect = function (args) {
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.inkAnnotationModule) {
            var currentPageNumber = parseInt(this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
            this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
        }
        if (args.item) {
            switch (args.item.text) {
                case this.pdfViewer.localeObj.getConstant('Export Annotations'):
                    this.pdfViewerBase.exportAnnotations(AnnotationDataFormat.Json);
                    break;
                case this.pdfViewer.localeObj.getConstant('Import Annotations'):
                    this.importAnnotationIconClick(args);
                    break;
                case this.pdfViewer.localeObj.getConstant('Export XFDF'):
                    this.pdfViewerBase.exportAnnotations(AnnotationDataFormat.Xfdf);
                    break;
                case this.pdfViewer.localeObj.getConstant('Import XFDF'):
                    this.importXFdfAnnotationIconClick(args);
                    break;
                default:
                    break;
            }
        }
    };
    NavigationPane.prototype.createFileElement = function (toolbarElement) {
        this.annotationInputElement = createElement('input', { id: this.pdfViewer.element.id + '_annotationUploadElement', styles: 'position:fixed; left:-100em', attrs: { 'type': 'file', 'aria-label': 'upload elements' } });
        this.annotationInputElement.setAttribute('accept', '.json');
        toolbarElement.appendChild(this.annotationInputElement);
        this.annotationInputElement.addEventListener('change', this.loadImportAnnotation);
    };
    NavigationPane.prototype.createXFdfFileElement = function (toolbarElement) {
        this.annotationXFdfInputElement = createElement('input', { id: this.pdfViewer.element.id + '_annotationXFdfUploadElement', styles: 'position:fixed; left:-100em', attrs: { 'type': 'file', 'aria-label': 'upload elements' } });
        this.annotationXFdfInputElement.setAttribute('accept', '.xfdf');
        toolbarElement.appendChild(this.annotationXFdfInputElement);
        this.annotationXFdfInputElement.addEventListener('change', this.loadImportAnnotation);
    };
    NavigationPane.prototype.importAnnotationIconClick = function (args) {
        this.annotationInputElement.click();
    };
    NavigationPane.prototype.importXFdfAnnotationIconClick = function (args) {
        this.annotationXFdfInputElement.click();
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.closeCommentPanelContainer = function () {
        var proxy = null;
        // eslint-disable-next-line
        proxy = this;
        var viewerContainer = document.getElementById(this.pdfViewer.element.id + '_viewerContainer');
        var pageContainer = document.getElementById(this.pdfViewer.element.id + '_pageViewContainer');
        var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
        if (commentPanel) {
            commentPanel.style.display = 'none';
            if (proxy.commentPanelResizer) {
                proxy.commentPanelResizer.style.display = 'none';
            }
            if (viewerContainer) {
                if (this.pdfViewer.enableRtl) {
                    viewerContainer.style.left = proxy.getViewerContainerRight() + 'px';
                }
                else {
                    viewerContainer.style.right = proxy.getViewerContainerRight() + 'px';
                }
                viewerContainer.style.width = (proxy.pdfViewer.element.clientWidth - proxy.getViewerContainerLeft() - proxy.getViewerContainerRight()) + 'px';
                pageContainer.style.width = (proxy.pdfViewerBase.viewerContainer.offsetWidth - proxy.getViewerContainerScrollbarWidth()) + 'px';
            }
            if (proxy.pdfViewerBase) {
                proxy.pdfViewerBase.updateZoomValue();
            }
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.textMarkupAnnotationModule) {
                this.pdfViewer.annotation.textMarkupAnnotationModule.showHideDropletDiv(true);
            }
            if (Browser.isDevice && !isBlazor()) {
                if (this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.element.style.display = 'block';
                    if (this.pdfViewer.toolbarModule.annotationToolbarModule.propertyToolbar) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.propertyToolbar.element.style.display = 'block';
                    }
                }
            }
        }
    };
    /**
     * @private
     * @param {string} option - The option.
     * @returns {void}
     */
    NavigationPane.prototype.createNavigationPaneMobile = function (option) {
        var _this = this;
        this.isNavigationToolbarVisible = true;
        this.toolbarElement = createElement('div', { id: this.pdfViewer.element.id + '_navigationToolbar', className: 'e-pv-nav-toolbar' });
        this.pdfViewerBase.viewerMainContainer.insertBefore(this.toolbarElement, this.pdfViewerBase.viewerContainer);
        var items;
        if (option === 'search') {
            var searchTemplate = '<div class="e-input-group e-pv-text-search-input-mobile" id="' + this.pdfViewer.element.id +
                '_search_input_container"><input class="e-input" type="text" placeholder="' +
                this.pdfViewer.localeObj.getConstant('Find in document') + '" id="' +
                this.pdfViewer.element.id + '_search_input"></input></div>';
            var searchCountTemplate = "\n                <span class=\"e-pv-search-count\" id=\"" + this.pdfViewer.element.id + "_search_count\"></span>\n            ";
            items = [
                { prefixIcon: 'e-pv-backward-icon e-pv-icon', tooltipText: this.pdfViewer.localeObj.getConstant('Go Back'), id: this.pdfViewer.element.id + '_backward', click: this.goBackToToolbar.bind(this) },
                { template: searchTemplate },
                {
                    prefixIcon: 'e-pv-search-icon e-pv-icon', id: this.pdfViewer.element.id + '_search_box-icon',
                    click: function () {
                        var iconElement = _this.pdfViewerBase.getElement('_search_box-icon').firstElementChild;
                        if (iconElement.classList.contains('e-pv-search-close')) {
                            _this.enableSearchItems(false);
                        }
                        _this.pdfViewer.textSearchModule.searchButtonClick(iconElement, _this.searchInput, true);
                        _this.setSearchInputWidth();
                    }
                },
                { template: searchCountTemplate },
                {
                    prefixIcon: this.pdfViewer.enableRtl ? 'e-pv-next-search-icon e-pv-icon' : 'e-pv-prev-search-icon e-pv-icon', id: this.pdfViewer.element.id + '_prev_occurrence',
                    click: function (args) {
                        _this.pdfViewer.textSearchModule.searchPrevious();
                        _this.setSearchInputWidth();
                    }
                },
                {
                    prefixIcon: this.pdfViewer.enableRtl ? 'e-pv-prev-search-icon e-pv-icon' : 'e-pv-next-search-icon e-pv-icon', id: this.pdfViewer.element.id + '_next_occurrence',
                    click: function (args) {
                        _this.pdfViewer.textSearchModule.searchNext();
                        _this.setSearchInputWidth();
                    }
                }
            ];
        }
        else {
            items = [
                { prefixIcon: 'e-pv-backward-icon e-pv-icon', id: this.pdfViewer.element.id + '_backward', click: this.goBackToToolbar.bind(this) },
                { text: this.pdfViewer.localeObj.getConstant('Bookmarks') }
            ];
        }
        this.toolbar = new Tool({ items: items, width: '', height: '', overflowMode: 'Popup' });
        if (this.pdfViewer.enableRtl) {
            this.toolbar.enableRtl = true;
        }
        this.toolbar.isStringTemplate = true;
        this.toolbar.appendTo(this.toolbarElement);
        if (option === 'search') {
            var toolbarContainer = this.pdfViewerBase.getElement('_toolbarContainer');
            if (toolbarContainer) {
                var toolbarHeight = toolbarContainer.clientHeight;
                if (toolbarHeight === 0) {
                    toolbarHeight = parseFloat(window.getComputedStyle(toolbarContainer)['height']) + 1;
                }
                this.pdfViewerBase.toolbarHeight = toolbarHeight;
            }
            this.initiateSearchBox();
        }
        else {
            this.initiateBookmarks();
        }
    };
    NavigationPane.prototype.initiateSearchBox = function () {
        var _this = this;
        this.searchInput = this.pdfViewerBase.getElement('_search_input');
        this.pdfViewer.textSearchModule.searchBtn = this.pdfViewerBase.getElement('_search_box-icon').firstElementChild;
        this.searchInput.addEventListener('keyup', function (event) {
            _this.enableSearchItems(true);
            var searchString = _this.searchInput.value;
            if (event.which === 13) {
                _this.initiateTextSearch();
                _this.setSearchInputWidth();
            }
            else {
                _this.pdfViewer.textSearchModule.resetVariables();
            }
        });
        var searchElement = document.getElementById(this.pdfViewer.element.id + '_search_count');
        var parentContainer = searchElement.parentElement;
        if (parentContainer) {
            parentContainer.style.display = 'none';
        }
        this.pdfViewer.textSearchModule.searchInput = this.searchInput;
        this.setSearchInputWidth();
        this.enableSearchItems(false);
        this.searchInput.focus();
    };
    NavigationPane.prototype.enableSearchItems = function (isEnable) {
        if (!isBlazor()) {
            this.toolbar.enableItems(this.pdfViewerBase.getElement('_prev_occurrence').parentElement, isEnable);
            this.toolbar.enableItems(this.pdfViewerBase.getElement('_next_occurrence').parentElement, isEnable);
        }
        else {
            this.pdfViewer._dotnetInstance.invokeMethodAsync('EnableSearchItems', isEnable);
        }
    };
    NavigationPane.prototype.initiateBookmarks = function () {
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.pdfViewerBase.mobileScrollerContainer.style.display = 'none';
            var mobileTool = document.querySelectorAll('.e-pv-mobile-annotation-toolbar');
            for (var i = 0; i < mobileTool.length; i++) {
                mobileTool[parseInt(i.toString(), 10)].style.display = 'none';
            }
        }
        var bookmarkContainer = createElement('div', { id: this.pdfViewer.element.id + '_bookmarks_container', className: 'e-pv-bookmark-container' });
        bookmarkContainer.style.width = '100%';
        bookmarkContainer.style.height = this.pdfViewerBase.viewerContainer.style.height;
        this.pdfViewerBase.getElement('_viewerMainContainer').appendChild(bookmarkContainer);
        this.pdfViewerBase.viewerContainer.style.display = 'none';
        this.isBookmarkListOpen = true;
        this.pdfViewer.bookmarkViewModule.renderBookmarkContentMobile();
    };
    NavigationPane.prototype.initiateTextSearch = function () {
        var inputString = this.searchInput.value;
        this.pdfViewer.textSearchModule.initiateSearch(inputString, true);
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.goBackToToolbar = function () {
        this.isNavigationToolbarVisible = false;
        if (isBlazor() && (!Browser.isDevice || this.pdfViewer.enableDesktopMode) || !isBlazor()) {
            this.pdfViewer.textSearchModule.cancelTextSearch();
        }
        this.searchInput = null;
        if (this.pdfViewer.bookmarkViewModule.childNavigateCount !== 0) {
            this.pdfViewer.bookmarkViewModule.bookmarkList.back();
            this.pdfViewer.bookmarkViewModule.childNavigateCount--;
        }
        else {
            if (this.toolbar != null) {
                this.toolbar.destroy();
                this.toolbar = null;
            }
            var bookmarkContainer = this.pdfViewerBase.getElement('_bookmarks_container');
            if (bookmarkContainer) {
                bookmarkContainer.parentElement.removeChild(bookmarkContainer);
                if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                    this.pdfViewerBase.mobileScrollerContainer.style.display = '';
                }
            }
            if (this.toolbarElement && this.toolbarElement.parentElement != null) {
                this.toolbarElement.parentElement.removeChild(this.toolbarElement);
            }
            this.pdfViewerBase.viewerContainer.style.display = 'block';
            this.isBookmarkListOpen = false;
            if (!isBlazor()) {
                if (!this.pdfViewer.toolbar.annotationToolbarModule.isMobileAnnotEnabled) {
                    this.pdfViewer.toolbarModule.showToolbar(true);
                }
            }
            else {
                this.pdfViewerBase.onWindowResize();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.setSearchInputWidth = function () {
        var searchInputParent = this.searchInput.parentElement;
        var padding = window.getComputedStyle(searchInputParent.parentElement, null).getPropertyValue('padding-left');
        if (isBlazor() && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
            this.toolbarElement = this.pdfViewerBase.getElement('_navigationToolbar');
        }
        var width = this.toolbarElement.clientWidth - this.getParentElementSearchBox('_backward').clientWidth
            - this.getParentElementSearchBox('_search_box-icon').clientWidth - this.getParentElementSearchBox('_prev_occurrence').clientWidth
            - this.getParentElementSearchBox('_next_occurrence').clientWidth - this.getParentElementSearchBox('_search_count').clientWidth - 6;
        if (padding !== '') {
            width = width - (parseFloat(padding) * 2);
        }
        searchInputParent.style.width = width + 'px';
    };
    NavigationPane.prototype.getParentElementSearchBox = function (idString) {
        return this.pdfViewerBase.getElement(idString).parentElement;
    };
    /**
     * @private
     * @param {string} text - The text.
     * @returns {void}
     */
    NavigationPane.prototype.createTooltipMobile = function (text) {
        if (!this.isTooltipCreated) {
            //boolean to prevent again toast creation.
            this.createMobileTooltip(text);
        }
        else {
            if (this.toastObject) {
                this.toastObject.title = text;
                var tooltipElement = this.pdfViewerBase.getElement('_container_tooltip');
                var tooltipChild = tooltipElement.firstElementChild;
                if (tooltipChild) {
                    tooltipChild.style.width = 'auto';
                    tooltipChild.firstElementChild.firstElementChild.textContent = text;
                }
                else {
                    this.isTooltipCreated = false;
                    var tooltipElement_1 = this.pdfViewerBase.getElement('_container_tooltip');
                    if (this.toastObject) {
                        this.toastObject.destroy();
                    }
                    tooltipElement_1.parentElement.removeChild(tooltipElement_1);
                    this.toastObject = null;
                    this.createMobileTooltip(text);
                }
            }
        }
    };
    NavigationPane.prototype.createMobileTooltip = function (text) {
        var tooltipDiv = createElement('div', { className: 'e-pv-container-tooltip', id: this.pdfViewer.element.id + '_container_tooltip' });
        this.pdfViewer.element.appendChild(tooltipDiv);
        this.toastObject = new Toast({ title: text, target: this.pdfViewer.element, close: this.onTooltipClose.bind(this), position: { X: 0, Y: 0 }, animation: { hide: { duration: 200, effect: 'FadeOut' } } });
        this.toastObject.appendTo(tooltipDiv);
        var y = this.pdfViewer.element.clientHeight * 0.65;
        var x = (this.pdfViewer.element.clientWidth - tooltipDiv.clientWidth) / 2;
        this.isTooltipCreated = true;
        this.toastObject.show({ position: { X: x, Y: y } });
        var tooltipChild = tooltipDiv.firstElementChild;
        if (tooltipChild) {
            tooltipChild.style.width = 'auto';
        }
    };
    NavigationPane.prototype.onTooltipClose = function (args) {
        if (this.pdfViewer.textSearchModule) {
            this.isTooltipCreated = false;
            var tooltipElement = this.pdfViewerBase.getElement('_container_tooltip');
            this.pdfViewer.textSearchModule.isMessagePopupOpened = false;
            if (this.toastObject) {
                this.toastObject.destroy();
            }
            tooltipElement.parentElement.removeChild(tooltipElement);
            this.toastObject = null;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.toolbarResize = function () {
        if (this.searchInput) {
            this.searchInput.style.width = 'auto';
            this.setSearchInputWidth();
        }
    };
    NavigationPane.prototype.createSidebarToolBar = function () {
        if (!isBlazor()) {
            var isMac_1 = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
            this.thumbnailButton = createElement('button', { id: this.pdfViewer.element.id + '_thumbnail-view', attrs: { 'disabled': 'disabled', 'aria-label': 'Page Thumbnails', 'tabindex': '-1' } });
            this.thumbnailButton.className = 'e-pv-tbar-btn e-pv-thumbnail-view-button e-btn';
            this.thumbnailButton.setAttribute('type', 'button');
            var thumbnailButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_thumbnail-view' + '_icon', className: 'e-pv-thumbnail-view-disable-icon e-pv-icon' });
            this.thumbnailButton.appendChild(thumbnailButtonSpan);
            var thumbnailTooltip = new Tooltip({ content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Page Thumbnails') + (isMac_1 ? ' (⌘+⌥+1)' : ' (Ctrl+Alt+1)'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this) });
            thumbnailTooltip.appendTo(this.thumbnailButton);
            this.bookmarkButton = createElement('button', { id: this.pdfViewer.element.id + '_bookmark', attrs: { 'disabled': 'disabled', 'aria-label': 'Bookmarks', 'tabindex': '-1' } });
            this.bookmarkButton.setAttribute('type', 'button');
            this.bookmarkButton.className = 'e-pv-tbar-btn e-pv-bookmark-button e-btn';
            var buttonSpan = createElement('span', { id: this.pdfViewer.element.id + '_bookmark' + '_icon', className: 'e-pv-bookmark-disable-icon e-pv-icon' });
            this.bookmarkButton.appendChild(buttonSpan);
            var bookMarkTooltip = new Tooltip({ content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Bookmarks') + (isMac_1 ? ' (⌘+⌥+2)' : ' (Ctrl+Alt+2)'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this) });
            bookMarkTooltip.appendTo(this.bookmarkButton);
            this.organizePageButton = createElement('button', { id: this.pdfViewer.element.id + '_organize-view', attrs: { 'disabled': 'disabled', 'aria-label': 'Organize Pages', 'tabindex': '-1' } });
            this.organizePageButton.className = 'e-pv-tbar-btn e-pv-organize-view-button e-btn';
            this.organizePageButton.setAttribute('type', 'button');
            var organizeButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_organize-view' + '_icon', className: 'e-pv-organize-view-disable-icon e-pv-icon' });
            this.organizePageButton.appendChild(organizeButtonSpan);
            var organizeButtonTooltip = new Tooltip({
                content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Organize Pages') + (isMac_1 ? ' (⌘+⌥+3)' : ' (Ctrl+Alt+3)'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
            });
            organizeButtonTooltip.appendTo(this.organizePageButton);
            this.sideBarToolbar.appendChild(this.thumbnailButton);
            this.sideBarToolbar.appendChild(this.bookmarkButton);
            if (!isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
                this.sideBarToolbar.appendChild(this.organizePageButton);
            }
        }
        else {
            this.thumbnailButton = this.pdfViewer.element.querySelector('.e-pv-thumbnail-view-button');
            this.bookmarkButton = this.pdfViewer.element.querySelector('.e-pv-bookmark-button');
        }
        this.thumbnailButton.addEventListener('click', this.sideToolbarOnClick);
        this.bookmarkButton.addEventListener('click', this.bookmarkButtonOnClick);
        this.organizePageButton.addEventListener('click', this.organizeButtonOnClick);
    };
    NavigationPane.prototype.onTooltipBeforeOpen = function (args) {
        if (!this.pdfViewer.toolbarSettings.showTooltip) {
            args.cancel = true;
        }
    };
    /**
     * @param {boolean} isEnable - This is isEnable
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.enableOrganizeButton = function (isEnable) {
        if (this.organizePageButton) {
            if (isEnable) {
                this.organizePageButton.removeAttribute('disabled');
                this.organizePageButton.children[0].classList.remove('e-pv-organize-view-disable-icon');
                this.organizePageButton.children[0].classList.add('e-pv-organize-view-icon');
                this.organizePageButton.setAttribute('tabindex', '0');
            }
            else {
                this.organizePageButton.setAttribute('disabled', 'disabled');
                this.organizePageButton.children[0].classList.remove('e-pv-organize-view-icon');
                this.organizePageButton.children[0].classList.add('e-pv-organize-view-disable-icon');
                this.organizePageButton.setAttribute('tabindex', '-1');
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.enableThumbnailButton = function () {
        if (this.thumbnailButton) {
            this.thumbnailButton.removeAttribute('disabled');
            this.thumbnailButton.children[0].classList.remove('e-pv-thumbnail-view-disable-icon');
            this.thumbnailButton.children[0].classList.add('e-pv-thumbnail-view-icon');
            this.thumbnailButton.setAttribute('tabindex', '0');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.enableBookmarkButton = function () {
        if (this.bookmarkButton) {
            this.bookmarkButton.removeAttribute('disabled');
            this.bookmarkButton.children[0].classList.remove('e-pv-bookmark-disable-icon');
            this.bookmarkButton.children[0].classList.add('e-pv-bookmark-icon');
            this.bookmarkButton.setAttribute('tabindex', '0');
        }
    };
    NavigationPane.prototype.createSidebarTitleCloseButton = function () {
        this.closeDiv = createElement('button', { id: this.pdfViewer.element.id + '_close_btn' });
        this.closeDiv.setAttribute('aria-label', 'close button');
        this.closeDiv.setAttribute('type', 'button');
        this.closeDiv.className = 'e-btn e-pv-tbar-btn e-pv-title-close-div e-btn';
        if (this.pdfViewer.enableRtl) {
            this.closeDiv.style.left = 8 + 'px';
        }
        else {
            this.closeDiv.style.left = this.closeButtonLeft + 'px';
        }
        var buttonSpan = createElement('span', { id: this.pdfViewer.element.id + '_close' + '_icon', className: 'e-pv-title-close-icon e-pv-icon' });
        this.closeDiv.appendChild(buttonSpan);
        this.sideBarTitleContainer.appendChild(this.closeDiv);
        this.closeDiv.addEventListener('click', this.sideToolbarOnClose);
    };
    NavigationPane.prototype.createResizeIcon = function () {
        this.resizeIcon = createElement('div', { id: this.pdfViewer.element.id + '_resize', className: 'e-pv-resize-icon e-pv-icon' });
        this.setResizeIconTop();
        this.resizeIcon.style.position = 'absolute';
        this.resizeIcon.addEventListener('click', this.sideToolbarOnClose);
        this.resizeIcon.addEventListener('mouseover', this.resizeIconMouseOver);
        this.sideBarResizer.appendChild(this.resizeIcon);
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.setResizeIconTop = function () {
        if (this.sideBarToolbar && this.sideBarToolbar.clientHeight && this.resizeIcon.style.top === '') {
            this.resizeIcon.style.top = (this.sideBarToolbar.clientHeight) / 2 + 'px';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.setCommentPanelResizeIconTop = function () {
        if (this.commentPanelContainer && this.commentPanelContainer.clientHeight && this.commentPanelResizeIcon && this.commentPanelResizeIcon.style.top === '') {
            this.commentPanelResizeIcon.style.top = (this.commentPanelContainer.clientHeight) / 2 + 'px';
        }
    };
    Object.defineProperty(NavigationPane.prototype, "outerContainerWidth", {
        /**
         * @private
         * @returns {number} - Returns the number.
         */
        get: function () {
            if (!this.mainContainerWidth) {
                this.mainContainerWidth = this.pdfViewerBase.mainContainer.clientWidth;
            }
            return this.mainContainerWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    NavigationPane.prototype.getViewerContainerScrollbarWidth = function () {
        return (this.pdfViewerBase.viewerContainer.offsetWidth + this.pdfViewerBase.viewerContainer.offsetLeft) -
            (this.pdfViewerBase.viewerContainer.clientWidth + this.pdfViewerBase.viewerContainer.offsetLeft);
    };
    Object.defineProperty(NavigationPane.prototype, "sideToolbarWidth", {
        /**
         * @private
         * @returns {number} - Returns the number.
         */
        get: function () {
            if (this.sideBarToolbar) {
                return this.sideBarToolbar.clientWidth;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationPane.prototype, "sideBarContentContainerWidth", {
        /**
         * @private
         * @returns {number} - Returns the number.
         */
        get: function () {
            if (this.sideBarContentContainer) {
                return this.sideBarContentContainer.clientWidth;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationPane.prototype, "commentPanelContainerWidth", {
        /**
         * @private
         * @returns {number} - Returns the number.
         */
        get: function () {
            if (this.commentPanelContainer) {
                return this.commentPanelContainer.offsetWidth;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.updateViewerContainerOnClose = function () {
        var proxy = null;
        // eslint-disable-next-line
        proxy = this;
        if (proxy.sideBarContentContainer) {
            proxy.sideBarContentContainer.style.display = 'none';
            if (this.pdfViewer.enableRtl) {
                proxy.pdfViewerBase.viewerContainer.style.right = (proxy.sideToolbarWidth) + 'px';
            }
            else {
                proxy.pdfViewerBase.viewerContainer.style.left = (proxy.sideToolbarWidth) + 'px';
            }
            proxy.pdfViewerBase.viewerContainer.style.width = (proxy.pdfViewer.element.clientWidth - proxy.sideToolbarWidth - proxy.getViewerContainerRight()) + 'px';
            proxy.pdfViewerBase.pageContainer.style.width = (proxy.pdfViewerBase.viewerContainer.offsetWidth - proxy.getViewerContainerScrollbarWidth()) + 'px';
            if (this.restrictUpdateZoomValue) {
                proxy.pdfViewerBase.updateZoomValue();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.updateViewerContainerOnExpand = function () {
        var proxy = null;
        // eslint-disable-next-line
        proxy = this;
        if (proxy.sideBarContentContainer) {
            if (!isNullOrUndefined(this.pdfViewer.thumbnailViewModule) && !this.pdfViewer.thumbnailViewModule.isThubmnailOpen) {
                proxy.sideBarContentContainer.style.display = 'block';
            }
            if (proxy.pdfViewer.isBookmarkPanelOpen || this.isBookmarkOpen) {
                proxy.sideBarContentContainer.style.display = 'block';
            }
            if (this.pdfViewer.enableRtl) {
                proxy.pdfViewerBase.viewerContainer.style.right = proxy.getViewerContainerLeft() + 'px';
            }
            else {
                proxy.pdfViewerBase.viewerContainer.style.left = proxy.getViewerContainerLeft() + 'px';
            }
            proxy.pdfViewerBase.viewerContainer.style.width = (proxy.pdfViewer.element.clientWidth - this.getViewerContainerLeft() - this.getViewerContainerRight()) + 'px';
            proxy.pdfViewerBase.pageContainer.style.width = proxy.pdfViewerBase.viewerContainer.clientWidth + 'px';
            proxy.pdfViewerBase.updateZoomValue();
            if (proxy.pdfViewer.enableThumbnail) {
                proxy.pdfViewer.thumbnailViewModule.gotoThumbnailImage(proxy.pdfViewerBase.currentPageNumber - 1);
                proxy.pdfViewer.thumbnailViewModule.renderViewPortThumbnailImage();
            }
        }
    };
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    NavigationPane.prototype.getViewerContainerLeft = function () {
        if (this.sideToolbarWidth) {
            return (this.sideToolbarWidth + this.sideBarContentContainerWidth);
        }
        else if (this.sideToolbarWidth === 0 && !this.pdfViewer.enableNavigationToolbar) {
            return (this.sideBarContentContainerWidth);
        }
        else {
            return 0;
        }
    };
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    NavigationPane.prototype.getViewerContainerRight = function () {
        if (this.commentPanelResizer) {
            return (this.commentPanelContainerWidth + this.commentPanelResizer.clientWidth);
        }
        else if (this.sideToolbarWidth === 0 && !this.pdfViewer.enableNavigationToolbar) {
            return (this.sideBarContentContainerWidth);
        }
        else {
            return 0;
        }
    };
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    NavigationPane.prototype.getViewerMainContainerWidth = function () {
        return this.pdfViewer.element.clientWidth - this.sideToolbarWidth;
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.setThumbnailSelectionIconTheme = function () {
        if (this.thumbnailButton) {
            this.thumbnailButton.children[0].classList.remove('e-pv-thumbnail-view-icon');
            this.thumbnailButton.children[0].classList.add('e-pv-thumbnail-view-selection-icon');
            this.thumbnailButton.classList.add('e-pv-thumbnail-view-button-selection');
        }
    };
    NavigationPane.prototype.removeThumbnailSelectionIconTheme = function () {
        if (this.thumbnailButton && this.thumbnailButton.children[0]) {
            this.thumbnailButton.children[0].classList.add('e-pv-thumbnail-view-icon');
            this.thumbnailButton.children[0].classList.remove('e-pv-thumbnail-view-selection-icon');
            this.thumbnailButton.classList.remove('e-pv-thumbnail-view-button-selection');
        }
    };
    NavigationPane.prototype.resetThumbnailIcon = function () {
        if (this.thumbnailButton && this.thumbnailButton.children[0]) {
            this.thumbnailButton.children[0].classList.remove('e-pv-thumbnail-view-icon');
            this.thumbnailButton.children[0].classList.add('e-pv-thumbnail-view-disable-icon');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.resetThumbnailView = function () {
        if (this.sideBarContentContainer) {
            this.sideBarContentContainer.style.display = 'none';
            if (this.pdfViewer.enableRtl) {
                this.pdfViewerBase.viewerContainer.style.left = 1 + 'px';
            }
            else {
                this.pdfViewerBase.viewerContainer.style.left = (this.sideToolbarWidth) + 'px';
            }
            this.pdfViewerBase.viewerContainer.style.width = (this.pdfViewer.element.clientWidth - this.sideToolbarWidth - this.getViewerContainerRight()) + 'px';
            if (this.pdfViewerBase.pageContainer) {
                this.pdfViewerBase.pageContainer.style.width = this.pdfViewerBase.viewerContainer.clientWidth + 'px';
            }
            this.thumbnailButton.setAttribute('disabled', 'disabled');
            this.removeThumbnailSelectionIconTheme();
            this.resetThumbnailIcon();
        }
    };
    NavigationPane.prototype.setBookmarkSelectionIconTheme = function () {
        if (this.bookmarkButton) {
            this.bookmarkButton.children[0].classList.remove('e-pv-bookmark-icon');
            this.bookmarkButton.children[0].classList.add('e-pv-bookmark-selection-icon');
            this.bookmarkButton.classList.add('e-pv-bookmark-button-selection');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.removeBookmarkSelectionIconTheme = function () {
        if (this.bookmarkButton && this.bookmarkButton.children[0]) {
            this.bookmarkButton.children[0].classList.add('e-pv-bookmark-icon');
            this.bookmarkButton.children[0].classList.remove('e-pv-bookmark-selection-icon');
            this.bookmarkButton.classList.remove('e-pv-bookmark-button-selection');
        }
    };
    NavigationPane.prototype.sideToolbarOnMouseup = function (event) {
        if (event.target === this.sideBarToolbar) {
            this.pdfViewerBase.focusViewerContainer();
        }
    };
    NavigationPane.prototype.sideBarTitleOnMouseup = function (event) {
        this.pdfViewerBase.focusViewerContainer();
    };
    /**
     * @param {boolean} isSideToolbarOnClick - This is isSideToolbarOnClick
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.openBookmarkcontentInitially = function (isSideToolbarOnClick) {
        // eslint-disable-next-line
        var proxy = this;
        if (document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_view')) {
            document.getElementById(proxy.pdfViewer.element.id + '_thumbnail_view').style.display = 'none';
        }
        proxy.removeThumbnailSelectionIconTheme();
        proxy.sideBarTitle.textContent = proxy.pdfViewer.localeObj.getConstant('Bookmarks');
        proxy.sideBarContent.setAttribute('aria-label', 'Bookmark View Panel');
        proxy.sideBarContent.setAttribute('role', 'navigation');
        proxy.pdfViewer.bookmarkViewModule.renderBookmarkcontent();
        if (proxy.sideBarContentContainer && (isSideToolbarOnClick || !proxy.isBookmarkOpenProgrammatically)) {
            if (proxy.sideBarContentContainer.style.display !== 'none') {
                if (proxy.isThumbnailOpen) {
                    proxy.setBookmarkSelectionIconTheme();
                    proxy.isBookmarkOpen = true;
                    proxy.updateViewerContainerOnExpand();
                    proxy.isThumbnail = false;
                    proxy.isThumbnailAddedProgrammatically = false;
                    proxy.isBookmarkOpenProgrammatically = true;
                    proxy.pdfViewer.isThumbnailViewOpen = false;
                }
                else {
                    proxy.removeBookmarkSelectionIconTheme();
                    proxy.isBookmarkOpen = false;
                    proxy.updateViewerContainerOnClose();
                    proxy.isBookmarkOpenProgrammatically = false;
                }
            }
            else {
                proxy.sideBarContent.focus();
                proxy.setBookmarkSelectionIconTheme();
                proxy.isBookmarkOpen = true;
                proxy.updateViewerContainerOnExpand();
                proxy.isBookmarkOpenProgrammatically = true;
                proxy.pdfViewer.isThumbnailViewOpen = false;
            }
        }
        proxy.isThumbnailOpen = false;
        if (proxy.pdfViewer.annotationModule && proxy.pdfViewer.annotationModule.inkAnnotationModule) {
            var currentPageNumber = parseInt(proxy.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
            proxy.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.disableBookmarkButton = function () {
        if (this.sideBarContentContainer && this.bookmarkButton && this.bookmarkButton.children[0]) {
            var bookmarkContent = this.pdfViewer.element.querySelector('.e-pv-bookmark-view');
            if (bookmarkContent) {
                bookmarkContent.style.display = 'none';
            }
            this.bookmarkButton.setAttribute('disabled', 'disabled');
            this.bookmarkButton.children[0].classList.add('e-pv-bookmark-disable-icon');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.calculateCommentPanelWidth = function () {
        var commentTitleCollections = document.getElementsByClassName('e-pv-comment-title');
        var commentTitleMoreIconCollections = document.getElementsByClassName('e-pv-more-options-button e-btn');
        for (var i = 0; i < commentTitleCollections.length; i++) {
            var commentTitleElement = commentTitleCollections[parseInt(i.toString(), 10)];
            var moreIconElement = commentTitleMoreIconCollections[parseInt(i.toString(), 10)];
            commentTitleElement.style.maxWidth = (commentTitleElement.parentElement.clientWidth - moreIconElement.clientWidth) + 'px';
        }
        var replyTitleCollections = document.getElementsByClassName('e-pv-reply-title');
        var replyTitleMoreIconCollections = document.getElementsByClassName('e-pv-more-options-button e-btn');
        for (var j = 0; j < replyTitleCollections.length; j++) {
            var replyTitleElement = replyTitleCollections[parseInt(j.toString(), 10)];
            var elementOfMoreIcon = replyTitleMoreIconCollections[parseInt(j.toString(), 10)];
            replyTitleElement.style.maxWidth = (replyTitleElement.parentElement.clientWidth - elementOfMoreIcon.clientWidth) + 'px';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.clear = function () {
        if (!Browser.isDevice) {
            this.removeBookmarkSelectionIconTheme();
            this.removeThumbnailSelectionIconTheme();
            this.closeCommentPanelContainer();
        }
        if (this.commentsContentContainer) {
            this.commentsContentContainer.innerHTML = '';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    NavigationPane.prototype.destroy = function () {
        var bookmarkButtonInstance = this.bookmarkButton;
        var thumbnailButtonInstance = this.thumbnailButton;
        var organizeButtonInstance = this.organizePageButton;
        if (bookmarkButtonInstance && bookmarkButtonInstance.ej2_instances && bookmarkButtonInstance.ej2_instances.length > 0) {
            bookmarkButtonInstance.ej2_instances[0].destroy();
        }
        if (thumbnailButtonInstance && thumbnailButtonInstance.ej2_instances && thumbnailButtonInstance.ej2_instances.length > 0) {
            thumbnailButtonInstance.ej2_instances[0].destroy();
        }
        if (organizeButtonInstance && organizeButtonInstance.ej2_instances && organizeButtonInstance.ej2_instances.length > 0) {
            organizeButtonInstance.ej2_instances[0].destroy();
        }
        if (this.annotationMenuObj) {
            var annotationMenuElement = this.annotationMenuObj.element;
            if (annotationMenuElement && annotationMenuElement.ej2_instances && annotationMenuElement.ej2_instances.length > 0) {
                this.annotationMenuObj.destroy();
            }
        }
    };
    /**
     * @returns {string} - Returns the string.
     */
    NavigationPane.prototype.getModuleName = function () {
        return 'NavigationPane';
    };
    return NavigationPane;
}());
export { NavigationPane };
