import { createElement, Browser, isBlazor, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { AjaxHandler } from '../index';
/**
 * The `BookmarkView` module is used to handle bookmark view navigation of PDF viewer.
 *
 * @param {EventArgs} args - args
 * @returns {void}
 */
var BookmarkView = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfViewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfViewerBase
     * @private
     */
    function BookmarkView(pdfViewer, pdfViewerBase) {
        var _this = this;
        this.isKeyboardNavigation = false;
        /**
         * @private
         */
        this.childNavigateCount = 0;
        this.bookmarkClick = function (args) {
            if (!args.event.target.classList.contains('e-icons')) {
                var bookid = args.data.Id;
                _this.childNavigateCount = 0;
                _this.pdfViewerBase.navigationPane.goBackToToolbar();
                var selectedItem = _this.bookmarkList.getSelectedItems();
                _this.navigateToBookmark(bookid, args.text, selectedItem.data.FileName);
            }
            else {
                _this.childNavigateCount++;
            }
            return false;
        };
        this.nodeClick = function (args) {
            _this.setHeight(args.node);
            var data = _this.treeObj.getTreeData(args.node);
            var bookid = Number(data[0].Id);
            _this.navigateToBookmark(bookid, args.node.textContent, data[0].FileName);
            if (_this.pdfViewer.annotationModule && _this.pdfViewer.annotationModule.inkAnnotationModule) {
                var currentPageNumber = parseInt(_this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
                _this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
            }
            return false;
        };
        this.bookmarkKeypress = function (args) {
            if (args.event && args.event.pointerType !== 'mouse' && args.event.pointerType !== 'touch' && (args.event.key === 'Enter' || args.event.key === ' ')) {
                _this.isKeyboardNavigation = true;
                _this.nodeClick(args);
                _this.isKeyboardNavigation = false;
            }
        };
        this.bookmarkPanelBeforeOpen = function (args) {
            if (_this.pdfViewer.enableBookmarkStyles) {
                for (var k = 0; k < _this.bookmarkStyles.length; k++) {
                    if ((args.text.trim()) === (_this.bookmarkStyles[parseInt(k.toString(), 10)].Text.trim())) {
                        var element = args.node.lastElementChild;
                        if (element) {
                            var fontStyle = _this.bookmarkStyles[parseInt(k.toString(), 10)].FontStyle.split(',');
                            for (var n = 0; n < fontStyle.length; n++) {
                                switch (fontStyle[parseInt(n.toString(), 10)].trim()) {
                                    case 'Italic':
                                        element.style.fontStyle = 'italic';
                                        break;
                                    case 'Bold':
                                        element.style.fontWeight = 'Bold';
                                }
                            }
                            var currentElement = element.getElementsByClassName('e-pv-bookmark-title')[0];
                            if (currentElement) {
                                currentElement.style.color = _this.bookmarkStyles[parseInt(k.toString(), 10)].Color;
                            }
                            else {
                                element.children[0].style.color = _this.bookmarkStyles[parseInt(k.toString(), 10)].Color;
                            }
                        }
                        break;
                    }
                }
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * Open the bookmark pane of the PDF Viewer.
     *
     * @returns {void}
     */
    BookmarkView.prototype.openBookmarkPane = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.openBookmarkcontentInitially();
        }
    };
    /**
     * Close the bookmark pane of the PDF Viewer.
     *
     * @returns {void}
     */
    BookmarkView.prototype.closeBookmarkPane = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.closeBookmarkPane();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    BookmarkView.prototype.createRequestForBookmarks = function () {
        // eslint-disable-next-line
        var proxy = this;
        var jsonObject = { hashId: this.pdfViewerBase.hashId, action: 'Bookmarks', elementId: this.pdfViewer.element.id, uniqueId: this.pdfViewerBase.documentId };
        if (this.pdfViewerBase.jsonDocumentId) {
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        if (this.pdfViewer.enableBookmarkStyles) {
            jsonObject.bookmarkStyles = this.pdfViewer.enableBookmarkStyles;
        }
        this.bookmarkRequestHandler = new AjaxHandler(this.pdfViewer);
        this.bookmarkRequestHandler.url = proxy.pdfViewer.serviceUrl + '/Bookmarks';
        this.bookmarkRequestHandler.responseType = 'json';
        if (this.pdfViewerBase.clientSideRendering) {
            var data = this.pdfViewer.pdfRendererModule.getBookmarks(jsonObject);
            this.renderBookmarksOnSuccess(data, proxy);
        }
        else {
            this.pdfViewerBase.requestCollection.push(this.bookmarkRequestHandler);
            this.bookmarkRequestHandler.send(jsonObject);
            this.bookmarkRequestHandler.onSuccess = function (result) {
                if (proxy.pdfViewerBase.navigationPane) {
                    proxy.pdfViewerBase.navigationPane.disableBookmarkButton();
                }
                var data = result.data;
                var redirect = proxy.pdfViewerBase.checkRedirection(data);
                if (!redirect) {
                    proxy.renderBookmarksOnSuccess(data, proxy);
                }
            };
            this.bookmarkRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, 'Bookmarks');
            };
            this.bookmarkRequestHandler.onError = function (result) {
                proxy.pdfViewerBase.openNotificationPopup();
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, 'Bookmarks');
            };
        }
    };
    BookmarkView.prototype.renderBookmarksOnSuccess = function (data, proxy) {
        if (data) {
            if (typeof data !== 'object') {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                    proxy.pdfViewerBase.onControlError(500, data, 'Bookmarks');
                    data = null;
                }
            }
            if (data && data.uniqueId === proxy.pdfViewerBase.documentId) {
                proxy.pdfViewer.fireAjaxRequestSuccess('Bookmarks', data);
                proxy.bookmarks = { bookMark: data.Bookmarks };
                proxy.bookmarkStyles = data.Bookmarkstyles;
                proxy.bookmarksDestination = { bookMarkDestination: data.BookmarksDestination };
                if (isBlazor()) {
                    var bookmarkCollection = { bookmarks: proxy.bookmarks, bookmarksDestination: proxy.bookmarksDestination };
                    if (proxy.pdfViewer && proxy.pdfViewer._dotnetInstance) {
                        proxy.pdfViewer._dotnetInstance.invokeMethodAsync('UpdateBookmarkCollection', bookmarkCollection);
                    }
                }
            }
        }
        if (proxy.pdfViewerBase.navigationPane) {
            if (proxy.bookmarks == null) {
                proxy.pdfViewerBase.navigationPane.disableBookmarkButton();
                if (isBlazor() && proxy.pdfViewer._dotnetInstance) {
                    proxy.pdfViewer._dotnetInstance.invokeMethodAsync('UpdateBookmarkCollection', null);
                }
            }
            else {
                proxy.pdfViewerBase.navigationPane.enableBookmarkButton();
                proxy.isBookmarkViewDiv = false;
                if (proxy.pdfViewer.isBookmarkPanelOpen) {
                    proxy.pdfViewerBase.navigationPane.openBookmarkcontentInitially();
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    BookmarkView.prototype.renderBookmarkcontent = function () {
        var _this = this;
        if (!this.isBookmarkViewDiv) {
            var isblazor = isBlazor();
            this.bookmarkView = isblazor ? this.pdfViewer.element.querySelector('.e-pv-bookmark-view') : createElement('div', { id: this.pdfViewer.element.id + '_bookmark_view', className: 'e-pv-bookmark-view' });
            this.pdfViewerBase.navigationPane.sideBarContent.appendChild(this.bookmarkView);
            var bookmarkIconView_1 = createElement('div', { id: this.pdfViewer.element.id + '_bookmark_iconview', className: 'e-pv-bookmark-icon-view' });
            if (!this.pdfViewer.enableRtl) {
                var bookmarkIcon = createElement('span', { id: this.pdfViewer.element.id + '_bookmark_icon', className: 'e-pv-bookmark-icon e-pv-icon' });
                bookmarkIconView_1.appendChild(bookmarkIcon);
            }
            else {
                var bookmarkIcon = createElement('span', { id: this.pdfViewer.element.id + '_bookmark_icon', className: 'e-pv-bookmark-icon e-pv-icon e-right' });
                bookmarkIconView_1.appendChild(bookmarkIcon);
            }
            var bookmarkTitle = createElement('div', { id: this.pdfViewer.element.id + '_bookmark_Title', className: 'e-pv-bookmark-title' });
            if (this.pdfViewer.enableRtl) {
                bookmarkTitle.style.paddingRight = 26 + 'px';
            }
            bookmarkTitle.innerText = '${Title}';
            bookmarkIconView_1.appendChild(bookmarkTitle);
            if (!isblazor) {
                this.treeObj = new TreeView({
                    fields: {
                        dataSource: this.bookmarks.bookMark,
                        id: 'Id',
                        text: 'Title',
                        child: 'Child',
                        hasChildren: 'HasChild'
                    },
                    nodeTemplate: initializeCSPTemplate(function (data) { return bookmarkIconView_1.outerHTML.replace('${Title}', data.Title); }),
                    nodeClicked: this.nodeClick.bind(this),
                    keyPress: this.bookmarkKeypress.bind(this),
                    drawNode: this.bookmarkPanelBeforeOpen.bind(this)
                });
                this.treeObj.isStringTemplate = true;
                if (this.pdfViewer.enableRtl) {
                    this.treeObj.enableRtl = true;
                }
                this.treeObj.appendTo(this.bookmarkView);
            }
            var event_1 = ['mouseover', 'keydown'];
            for (var m = 0; m < event_1.length; m++) {
                this.bookmarkView.addEventListener(event_1[parseInt(m.toString(), 10)], function (event) {
                    _this.setHeight(event.target);
                });
            }
            this.isBookmarkViewDiv = true;
        }
        this.bookmarkView.style.display = 'block';
    };
    /**
     * @private
     * @returns {void}
     */
    BookmarkView.prototype.renderBookmarkContentMobile = function () {
        if (this.bookmarkView != null) {
            this.bookmarkView.remove();
        }
        this.bookmarkView = createElement('div', { id: this.pdfViewer.element.id + '_bookmark_view', className: 'e-pv-bookmark-view' });
        this.pdfViewerBase.getElement('_bookmarks_container').appendChild(this.bookmarkView);
        this.bookmarkList = new ListView({
            dataSource: this.bookmarks.bookMark,
            fields: {
                id: 'Id',
                text: 'Title',
                child: 'Child'
            },
            showHeader: false,
            select: this.bookmarkClick.bind(this)
        });
        this.bookmarkList.isStringTemplate = true;
        if (this.pdfViewer.enableRtl) {
            this.bookmarkList.enableRtl = true;
        }
        this.bookmarkList.appendTo(this.bookmarkView);
    };
    BookmarkView.prototype.setHeight = function (element) {
        if (this.treeObj) {
            if (this.treeObj.fullRowSelect && element.classList) {
                if (element.classList.contains('e-treeview') && element.classList.contains('.e-active')) {
                    element = element.querySelector('.e-active').querySelector('.e-fullrow');
                }
                else if (element.classList.contains('e-treeview')) {
                    element = element.querySelector('.e-fullrow');
                }
                else if (element.classList.contains('e-list-parent')) {
                    element = element.querySelector('.e-fullrow');
                }
                else if (element.classList.value !== ('e-fullrow')) {
                    if (element.closest && element.closest('.e-list-item')) {
                        element = element.closest('.e-list-item').querySelector('.e-fullrow');
                    }
                    else {
                        if (element.classList.contains('e-list-item')) {
                            element = element.querySelector('.e-fullrow');
                        }
                        else if (element.classList.contains('e-icons') && element.classList.contains('interaction')
                            && element.parentElement.parentElement.classList.contains('e-list-item')) {
                            element = element.parentElement.parentElement.querySelector('.e-fullrow');
                        }
                    }
                }
                if (element.nextElementSibling) {
                    element.style.height = element.nextElementSibling.offsetHeight + 'px';
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    BookmarkView.prototype.setBookmarkContentHeight = function () {
        if (this.treeObj) {
            var element = this.treeObj.element;
            if (this.treeObj.fullRowSelect) {
                if (element.classList.contains('e-treeview') && element.classList.contains('.e-active')) {
                    element = element.querySelector('.e-active').querySelector('.e-fullrow');
                }
                else if (element.classList.contains('e-treeview')) {
                    element = element.querySelector('.e-fullrow');
                }
                if (element.nextElementSibling) {
                    element.style.height = element.nextElementSibling.offsetHeight + 'px';
                }
            }
        }
    };
    BookmarkView.prototype.navigateToBookmark = function (bookid, text, fileName) {
        var pageIndex = this.bookmarksDestination.bookMarkDestination[parseInt(bookid.toString(), 10)].PageIndex;
        var Y = this.bookmarksDestination.bookMarkDestination[parseInt(bookid.toString(), 10)].Y;
        if (pageIndex !== -1) {
            this.goToBookmark(pageIndex, Y);
        }
        this.pdfViewer.fireBookmarkClick(pageIndex !== -1 ? pageIndex + 1 : pageIndex, Y, text, fileName);
    };
    /**
     * Get Bookmarks of the PDF document being loaded in the ejPdfViewer control
     *
     * @returns {any} - any
     */
    BookmarkView.prototype.getBookmarks = function () {
        if (this.bookmarks && this.bookmarksDestination) {
            return { bookmarks: this.bookmarks, bookmarksDestination: this.bookmarksDestination };
        }
    };
    /**
     * Navigate To current Bookmark location of the PDF document being loaded in the ejPdfViewer control.
     *
     * @param  {number} pageIndex - Specifies the pageIndex for Navigate
     * @param  {number} y - Specifies the Y coordinates value of the Page
     * @returns {void}
     */
    BookmarkView.prototype.goToBookmark = function (pageIndex, y) {
        // eslint-disable-next-line
        var proxy = this;
        var destPage = (this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height);
        var scrollValue;
        if (y === 0) {
            scrollValue = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].top * this.pdfViewerBase.getZoomFactor();
        }
        else {
            scrollValue = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].top *
                this.pdfViewerBase.getZoomFactor() + ((destPage - y) * this.pdfViewerBase.getZoomFactor());
        }
        var scroll = scrollValue.toString();
        proxy.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll, 10);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.pdfViewerBase.mobileScrollerContainer.style.display = '';
            this.pdfViewerBase.updateMobileScrollerPosition();
        }
        if (!this.isKeyboardNavigation) {
            this.pdfViewerBase.focusViewerContainer();
        }
        if (pageIndex > 0 && pageIndex <= this.pdfViewerBase.pageCount && this.pdfViewerBase.currentPageNumber !== pageIndex + 1) {
            this.pdfViewerBase.updateScrollTop(pageIndex, false);
        }
        this.isKeyboardNavigation = false;
        return false;
    };
    /**
     * @private
     * @returns {void}
     */
    BookmarkView.prototype.clear = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.disableBookmarkButton();
            this.pdfViewerBase.navigationPane.updateViewerContainerOnClose();
        }
        if (this.bookmarks) {
            this.bookmarks.bookMark = [];
            this.bookmarks = null;
        }
        if (this.bookmarksDestination) {
            this.bookmarksDestination.bookMarkDestination = [];
        }
        if (this.bookmarkView != null && !isBlazor()) {
            if (this.bookmarkView.parentElement !== null) {
                this.bookmarkView.parentElement.removeChild(this.bookmarkView);
            }
            while (this.bookmarkView.hasChildNodes()) {
                this.bookmarkView.removeChild(this.bookmarkView.lastChild);
            }
        }
        if (this.bookmarkRequestHandler) {
            this.bookmarkRequestHandler.clear();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    BookmarkView.prototype.destroy = function () {
        this.clear();
    };
    /**
     * @private
     * @returns {string} - string
     */
    BookmarkView.prototype.getModuleName = function () {
        return 'BookmarkView';
    };
    return BookmarkView;
}());
export { BookmarkView };
