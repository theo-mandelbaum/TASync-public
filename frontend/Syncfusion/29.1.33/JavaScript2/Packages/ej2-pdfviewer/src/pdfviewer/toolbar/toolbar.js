import { createElement, Browser, isBlazor, isNullOrUndefined, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { AnnotationToolbar } from '../index';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { FormFieldDataFormat } from '../base/types';
import { FormDesignerToolbar } from './formdesigner-toolbar';
/* eslint-disable valid-jsdoc */
/**
 * Toolbar module
 *
 * @param {string} args - args
 * @param {Event} event - args
 * @returns {void}
 */
var Toolbar = /** @class */ (function () {
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewer base
     * @private
     * @returns {void}
     */
    function Toolbar(viewer, viewerBase) {
        var _this = this;
        this.isPageNavigationToolDisabled = false;
        this.isMagnificationToolDisabled = false;
        /**
         * @private
         */
        this.isSelectionToolDisabled = false;
        this.isScrollingToolDisabled = false;
        this.isOpenBtnVisible = true;
        this.isNavigationToolVisible = true;
        this.isMagnificationToolVisible = true;
        this.isSelectionBtnVisible = true;
        this.isScrollingBtnVisible = true;
        this.isDownloadBtnVisible = true;
        this.isPrintBtnVisible = true;
        this.isSearchBtnVisible = true;
        /**
         * @private
         */
        this.isTextSearchBoxDisplayed = false;
        this.isUndoRedoBtnsVisible = true;
        this.isAnnotationEditBtnVisible = true;
        this.isFormDesignerEditBtnVisible = true;
        this.isCommentBtnVisible = true;
        this.isSubmitbtnvisible = true;
        this.toolItems = [];
        this.itemsIndexArray = [];
        this.onToolbarKeydown = function (event) {
            var isSkip = event.key === 'Tab' || event.shiftKey === true || event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight';
            var targetId = event.target.id;
            var customItem = _this.toolItems.filter(function (toolItem) { return toolItem.id === targetId; });
            if (!(targetId === _this.pdfViewer.element.id + '_currentPageInput' || targetId === _this.pdfViewer.element.id + '_zoomDropDown' || customItem.length > 0) && !isSkip) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        this.toolbarClickHandler = function (args) {
            var isKeyBoardEvent = args.originalEvent && args.originalEvent.pointerType !== 'mouse' && args.originalEvent.pointerType !== 'touch';
            if (!Browser.isDevice || _this.pdfViewer.enableDesktopMode) {
                if (args.originalEvent.target === _this.zoomDropdownItem.parentElement.childNodes[1] ||
                    args.originalEvent.target === _this.zoomDropdownItem.parentElement.childNodes[2]) {
                    args.cancel = true;
                }
                else if (args.originalEvent.target.id === _this.pdfViewer.element.id + '_openIcon') {
                    var tooltipData = args.originalEvent.target.parentElement.dataset;
                    if (tooltipData && tooltipData.tooltipId) {
                        var tooltipElement = document.getElementById(tooltipData.tooltipId);
                        if (tooltipElement) {
                            tooltipElement.style.display = 'none';
                        }
                    }
                }
            }
            _this.handleToolbarBtnClick(args, isKeyBoardEvent);
            var targetElement = args.originalEvent.target;
            var customItem = [];
            if (!isNullOrUndefined(args.item)) {
                customItem = _this.toolItems.filter(function (toolItem) { return toolItem.id === args.item.id; });
            }
            if (!Browser.isDevice || _this.pdfViewer.enableDesktopMode) {
                if (!(args.originalEvent.target === _this.zoomDropdownItem.parentElement.childNodes[1] ||
                    args.originalEvent.target === _this.zoomDropdownItem.parentElement.childNodes[2] ||
                    args.originalEvent.target === _this.currentPageBoxElement ||
                    args.originalEvent.target === _this.textSearchItem.childNodes[0] || customItem.length > 0)) {
                    if (!isKeyBoardEvent && targetElement.parentElement.id !== _this.pdfViewer.element.id + '_toolbarContainer_nav' && targetElement.id !== _this.pdfViewer.element.id + '_toolbarContainer_nav') {
                        args.originalEvent.target.blur();
                        _this.pdfViewerBase.focusViewerContainer();
                    }
                }
            }
            else {
                args.originalEvent.target.blur();
                _this.pdfViewerBase.focusViewerContainer();
            }
        };
        this.loadDocument = function (args) {
            var upoadedFiles = args.target.files;
            if (args.target.files[0] !== null) {
                var uploadedFile = upoadedFiles[0];
                if (uploadedFile) {
                    _this.uploadedDocumentName = uploadedFile.name;
                    var reader = new FileReader();
                    if (_this.pdfViewerBase.clientSideRendering) {
                        reader.readAsArrayBuffer(uploadedFile);
                    }
                    else {
                        reader.readAsDataURL(uploadedFile);
                    }
                    reader.onload = function (e) {
                        args.target.value = null;
                        var uploadedFileUrl = e.currentTarget.result;
                        _this.pdfViewer.uploadedFileByteArray = new Uint8Array(uploadedFileUrl);
                        if (isBlazor()) {
                            _this.pdfViewer._dotnetInstance.invokeMethodAsync('LoadDocumentFromClient', uploadedFileUrl);
                        }
                        else {
                            if (_this.pdfViewerBase.clientSideRendering) {
                                _this.uploadedFile = _this.pdfViewer.uploadedFileByteArray;
                                _this.pdfViewer.load(_this.pdfViewer.uploadedFileByteArray, null);
                                _this.pdfViewerBase.isSkipDocumentPath = true;
                                _this.pdfViewer.documentPath = _this.pdfViewer.uploadedFileByteArray;
                                _this.pdfViewerBase.documentPathByteArray = _this.pdfViewer.documentPath;
                            }
                            else {
                                _this.uploadedFile = uploadedFileUrl;
                                _this.pdfViewer.load(uploadedFileUrl, null);
                                _this.pdfViewerBase.isSkipDocumentPath = true;
                                _this.pdfViewer.documentPath = uploadedFileUrl;
                                _this.pdfViewerBase.documentPathByteArray = _this.pdfViewer.documentPath;
                            }
                        }
                        if (!isNullOrUndefined(_this.fileInputElement)) {
                            _this.fileInputElement.value = '';
                        }
                    };
                }
            }
        };
        this.navigateToPage = function (args) {
            if (args.which === 13) {
                var enteredValue = parseInt(_this.currentPageBoxElement.value, 10);
                if (enteredValue !== null) {
                    if (enteredValue > 0 && enteredValue <= _this.pdfViewerBase.pageCount) {
                        if (_this.pdfViewer.navigationModule) {
                            _this.pdfViewer.navigationModule.goToPage(enteredValue);
                        }
                    }
                    else {
                        _this.updateCurrentPage(_this.pdfViewerBase.currentPageNumber);
                    }
                }
                else {
                    _this.updateCurrentPage(_this.pdfViewerBase.currentPageNumber);
                }
                _this.currentPageBoxElement.blur();
                _this.pdfViewerBase.focusViewerContainer();
            }
        };
        this.textBoxFocusOut = function () {
            if (_this.currentPageBox.value === null || _this.currentPageBox.value >= _this.pdfViewerBase.pageCount ||
                _this.currentPageBox.value !== _this.pdfViewerBase.currentPageNumber) {
                _this.updateCurrentPage(_this.pdfViewerBase.currentPageNumber);
            }
        };
        this.pdfViewer = viewer;
        this.pdfViewerBase = viewerBase;
    }
    /**
     * @param {string} width - It describes about the width
     * @private
     * @returns {HTMLElement} - html element
     */
    Toolbar.prototype.intializeToolbar = function (width) {
        var toolbarDiv;
        if (!isBlazor()) {
            toolbarDiv = this.createToolbar(width);
        }
        else {
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                toolbarDiv = this.pdfViewer.element.querySelector('.e-pv-toolbar');
                this.toolbarElement = toolbarDiv;
            }
        }
        var isIE = !!document.documentMode;
        if (isIE) {
            if (isBlazor()) {
                this.pdfViewerBase.blazorUIAdaptor.totalPageElement.classList.add('e-pv-total-page-ms');
            }
            else {
                if (!Browser.isDevice) {
                    this.totalPageItem.classList.add('e-pv-total-page-ms');
                }
            }
        }
        this.createFileElement(toolbarDiv);
        this.wireEvent();
        if (!isBlazor()) {
            this.updateToolbarItems();
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.applyToolbarSettings();
                this.initialEnableItems();
                this.pdfViewerBase.navigationPane.adjustPane();
            }
            else {
                this.initialEnableItems();
            }
            if (this.pdfViewer.annotationModule) {
                this.annotationToolbarModule = new AnnotationToolbar(this.pdfViewer, this.pdfViewerBase, this);
                if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                    this.annotationToolbarModule.initializeAnnotationToolbar();
                }
            }
            if (this.pdfViewer.formDesignerModule) {
                this.formDesignerToolbarModule = new FormDesignerToolbar(this.pdfViewer, this.pdfViewerBase, this);
                if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                    this.formDesignerToolbarModule.initializeFormDesignerToolbar();
                }
            }
        }
        else {
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.initialEnableItems();
                this.pdfViewerBase.navigationPane.adjustPane();
                if (this.pdfViewer.enableToolbar) {
                    this.bindOpenIconEvent();
                }
            }
            this.PanElement = document.getElementById(this.pdfViewer.element.id + '_handTool').children[0];
            this.PanElement.classList.add('e-pv-tbar-btn');
            this.SelectToolElement = document.getElementById(this.pdfViewer.element.id + '_selectTool').children[0];
            this.SelectToolElement.classList.add('e-pv-tbar-btn');
            this.CommentElement = document.getElementById(this.pdfViewer.element.id + '_comment').children[0];
            this.CommentElement.classList.add('e-pv-tbar-btn');
            this.annotationToolbarModule = new AnnotationToolbar(this.pdfViewer, this.pdfViewerBase, this);
            if (this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar ||
                (this.pdfViewer.enableDesktopMode && Browser.isDevice)) {
                this.annotationToolbarModule.afterAnnotationToolbarCreationInBlazor();
            }
        }
        return toolbarDiv;
    };
    Toolbar.prototype.bindOpenIconEvent = function () {
        var openElement = document.getElementById(this.pdfViewer.element.id + '_open');
        if (openElement) {
            openElement.addEventListener('click', this.openFileDialogBox.bind(this));
        }
    };
    Toolbar.prototype.InitializeMobileToolbarInBlazor = function () {
        var toolbarDiv = this.pdfViewer.element.querySelector('.e-pv-mobile-toolbar');
        this.createFileElement(toolbarDiv);
        this.wireEvent();
    };
    /**
     * Shows /hides the toolbar in the PdfViewer
     *
     * @param  {boolean} enableToolbar - If set true , its show the Toolbar
     * @returns {void}
     */
    Toolbar.prototype.showToolbar = function (enableToolbar) {
        var toolbar;
        if (!isNullOrUndefined(this.toolbarElement)) {
            toolbar = this.toolbarElement;
        }
        if (enableToolbar) {
            if (!isNullOrUndefined(toolbar) && !(this.pdfViewerBase.navigationPane &&
                this.pdfViewerBase.navigationPane.isNavigationToolbarVisible)) {
                toolbar.style.display = 'block';
            }
            var toolbarContainer = this.pdfViewerBase.getElement('_toolbarContainer');
            if (toolbarContainer) {
                var toolbarHeight = toolbarContainer.clientHeight;
                if (toolbarHeight === 0) {
                    toolbarHeight = parseFloat(window.getComputedStyle(toolbarContainer)['height']) + 1;
                }
                this.pdfViewerBase.toolbarHeight = toolbarHeight;
            }
            if ((Browser.isDevice && !this.pdfViewer.enableDesktopMode) && this.pdfViewer.toolbarModule &&
                this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.hideMobileAnnotationToolbar();
            }
        }
        else {
            this.pdfViewerBase.toolbarHeight = 0;
            if (enableToolbar) {
                if (Browser.isDevice && this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar) {
                    this.annotationToolbarModule.toolbarCreated = false;
                    this.annotationToolbarModule.adjustMobileViewer();
                    this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.element.style.display = 'none';
                }
                if (Browser.isDevice && this.annotationToolbarModule.propertyToolbar) {
                    this.annotationToolbarModule.propertyToolbar.element.style.display = 'none';
                }
            }
            if (!isNullOrUndefined(toolbar)) {
                toolbar.style.display = 'none';
            }
        }
    };
    /**
     * Shows/hides the Navigation toolbar in the PdfViewer
     *
     * @param  {boolean} enableNavigationToolbar - If set true , its show the Navigation Toolbar
     * @returns {void}
     */
    Toolbar.prototype.showNavigationToolbar = function (enableNavigationToolbar) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            var navigationToolbar = this.pdfViewerBase.navigationPane.sideBarToolbar;
            var navigationToolbarSplitter = this.pdfViewerBase.navigationPane.sideBarToolbarSplitter;
            if (enableNavigationToolbar) {
                if (!isNullOrUndefined(navigationToolbar)) {
                    navigationToolbar.style.display = 'block';
                }
                if (!isNullOrUndefined(navigationToolbarSplitter)) {
                    navigationToolbarSplitter.style.display = 'block';
                }
                if (this.pdfViewerBase.navigationPane.isBookmarkOpen || this.pdfViewerBase.navigationPane.isThumbnailOpen) {
                    this.pdfViewerBase.navigationPane.clear();
                }
            }
            else {
                if (!isNullOrUndefined(navigationToolbar)) {
                    navigationToolbar.style.display = 'none';
                }
                if (!isNullOrUndefined(navigationToolbarSplitter)) {
                    navigationToolbarSplitter.style.display = 'none';
                }
                if (this.pdfViewerBase.navigationPane.isBookmarkOpen || this.pdfViewerBase.navigationPane.isThumbnailOpen) {
                    this.pdfViewerBase.navigationPane.updateViewerContainerOnClose();
                }
            }
        }
    };
    /**
     * Shows /hides the annotation toolbar in the PdfViewer
     *
     * @param  {boolean} enableAnnotationToolbar - If set true , its show the annotation Toolbar
     * @returns {void}
     */
    Toolbar.prototype.showAnnotationToolbar = function (enableAnnotationToolbar) {
        if (enableAnnotationToolbar) {
            this.annotationToolbarModule.isToolbarHidden = true;
            this.annotationToolbarModule.showAnnotationToolbar(null, false, true);
        }
        else {
            this.annotationToolbarModule.isToolbarHidden = false;
            this.annotationToolbarModule.showAnnotationToolbar(null, false, false);
        }
    };
    /**
     * Shows /hides the the toolbar items in the PdfViewer
     *
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isVisible - If set true, then its show the toolbar Items
     * @returns {void}
     */
    Toolbar.prototype.showToolbarItem = function (items, isVisible) {
        for (var i = 0; i < items.length; i++) {
            switch (items[parseInt(i.toString(), 10)]) {
                case 'OpenOption':
                    this.showOpenOption(isVisible);
                    break;
                case 'PageNavigationTool':
                    this.showPageNavigationTool(isVisible);
                    break;
                case 'MagnificationTool':
                    this.showMagnificationTool(isVisible);
                    break;
                case 'SelectionTool':
                    this.showSelectionTool(isVisible);
                    break;
                case 'PanTool':
                    this.showScrollingTool(isVisible);
                    break;
                case 'DownloadOption':
                    this.showDownloadOption(isVisible);
                    break;
                case 'PrintOption':
                    this.showPrintOption(isVisible);
                    break;
                case 'SearchOption':
                    this.showSearchOption(isVisible);
                    break;
                case 'UndoRedoTool':
                    this.showUndoRedoTool(isVisible);
                    break;
                case 'AnnotationEditTool':
                    this.showAnnotationEditTool(isVisible);
                    break;
                case 'FormDesignerEditTool':
                    this.showFormDesignerEditTool(isVisible);
                    break;
                case 'CommentTool':
                    this.showCommentOption(isVisible);
                    break;
                case 'SubmitForm':
                    this.showSubmitForm(isVisible);
                    break;
            }
        }
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            this.applyHideToToolbar(true, this.itemsIndexArray[0].endIndex + 1, this.itemsIndexArray[0].endIndex + 1);
            this.applyHideToToolbar(true, this.itemsIndexArray[1].endIndex + 1, this.itemsIndexArray[1].endIndex + 1);
            this.applyHideToToolbar(true, this.itemsIndexArray[2].endIndex + 1, this.itemsIndexArray[2].endIndex + 1);
            this.applyHideToToolbar(true, this.itemsIndexArray[4].endIndex + 1, this.itemsIndexArray[4].endIndex + 1);
            this.applyHideToToolbar(true, this.itemsIndexArray[5].endIndex + 1, this.itemsIndexArray[5].endIndex + 1);
        }
        else {
            this.applyHideToToolbar(true, 1, 1);
            this.applyHideToToolbar(true, 8, 8);
            this.applyHideToToolbar(true, 12, 12);
            this.applyHideToToolbar(true, 15, 15);
        }
        this.showSeparator(items);
    };
    /**
     * Enables /disables the the toolbar items in the PdfViewer
     *
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isEnable - If set true, then its Enable the toolbar Items
     * @returns {void}
     */
    Toolbar.prototype.enableToolbarItem = function (items, isEnable) {
        for (var i = 0; i < items.length; i++) {
            switch (items[parseInt(i.toString(), 10)]) {
                case 'OpenOption':
                    this.enableOpenOption(isEnable);
                    break;
                case 'PageNavigationTool':
                    this.isPageNavigationToolDisabled = isEnable;
                    this.enablePageNavigationTool(isEnable);
                    break;
                case 'MagnificationTool':
                    this.isMagnificationToolDisabled = isEnable;
                    this.enableMagnificationTool(isEnable);
                    break;
                case 'SelectionTool':
                    this.isSelectionToolDisabled = isEnable;
                    this.enableSelectionTool(isEnable);
                    break;
                case 'PanTool':
                    this.isScrollingToolDisabled = isEnable;
                    this.enableScrollingTool(isEnable);
                    break;
                case 'DownloadOption':
                    this.enableDownloadOption(isEnable);
                    break;
                case 'PrintOption':
                    this.enablePrintOption(isEnable);
                    break;
                case 'SearchOption':
                    this.enableSearchOption(isEnable);
                    break;
                case 'UndoRedoTool':
                    this.enableUndoRedoTool(isEnable);
                    break;
                case 'AnnotationEditTool':
                    this.enableAnnotationEditTool(isEnable);
                    break;
                case 'FormDesignerEditTool':
                    this.enableFormDesignerEditTool(isEnable);
                    break;
                case 'CommentTool':
                    this.enableCommentsTool(isEnable);
                    break;
                case 'OrganizePagesTool':
                    this.enableOrganizePagesButton(isEnable);
                    break;
            }
        }
    };
    /**
     * @param {any} restrictionSummary - It describes about the restriction summary
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    Toolbar.prototype.DisableToolbarItems = function (restrictionSummary, isEnable) {
        switch (restrictionSummary) {
            case 'Print':
                this.enablePrintOption(isEnable);
                break;
            case 'CopyContent':
                this.isSelectionToolDisabled = isEnable;
                this.enableSelectionTool(isEnable);
                if (isEnable) {
                    this.pdfViewerBase.initiateTextSelectMode();
                    this.updateInteractionTools(isEnable);
                }
                else {
                    this.pdfViewerBase.initiatePanning();
                    this.updateInteractionTools(isEnable);
                }
                break;
            case 'EditAnnotations':
                this.enableAnnotationEditTool(isEnable);
                if (this.annotationToolbarModule && !this.annotationToolbarModule.isToolbarHidden) {
                    this.annotationToolbarModule.showAnnotationToolbar();
                }
                break;
        }
    };
    Toolbar.prototype.showOpenOption = function (enableOpenOption) {
        this.isOpenBtnVisible = enableOpenOption;
        //For mobile devices, the default previous value for OpenOption has been passed as (0,0).
        this.applyHideToToolbar(enableOpenOption, !isNullOrUndefined(this.itemsIndexArray[0]) ?
            this.itemsIndexArray[0].startIndex : 0, !isNullOrUndefined(this.itemsIndexArray[0]) ? this.itemsIndexArray[0].endIndex : 0);
    };
    Toolbar.prototype.showPageNavigationTool = function (enablePageNavigationTool) {
        this.isNavigationToolVisible = enablePageNavigationTool;
        //For mobile devices, the default previous value for PageNavigationTool has been passed as (2,7).
        this.applyHideToToolbar(enablePageNavigationTool, !isNullOrUndefined(this.itemsIndexArray[1]) ?
            this.itemsIndexArray[1].startIndex : 2, !isNullOrUndefined(this.itemsIndexArray[1]) ? this.itemsIndexArray[1].endIndex : 7);
    };
    Toolbar.prototype.showMagnificationTool = function (enableMagnificationTool) {
        this.isMagnificationToolVisible = enableMagnificationTool;
        //For mobile devices, the default previous value for MagnificationTool has been passed as (9,11).
        this.applyHideToToolbar(enableMagnificationTool, !isNullOrUndefined(this.itemsIndexArray[2]) ?
            this.itemsIndexArray[2].startIndex : 9, !isNullOrUndefined(this.itemsIndexArray[2]) ? this.itemsIndexArray[2].endIndex : 11);
    };
    Toolbar.prototype.showSelectionTool = function (enableSelectionTool) {
        this.isSelectionBtnVisible = enableSelectionTool;
        //For mobile devices, the default previous value for SelectionTool has been passed as (13,13).
        this.applyHideToToolbar(enableSelectionTool, !isNullOrUndefined(this.itemsIndexArray[3]) ?
            this.itemsIndexArray[3].startIndex : 13, !isNullOrUndefined(this.itemsIndexArray[3]) ? this.itemsIndexArray[3].endIndex : 13);
    };
    Toolbar.prototype.showScrollingTool = function (enableScrollingTool) {
        this.isScrollingBtnVisible = enableScrollingTool;
        //For mobile devices, the default previous value for ScrollingTool has been passed as (14,14).
        this.applyHideToToolbar(enableScrollingTool, !isNullOrUndefined(this.itemsIndexArray[4]) ?
            this.itemsIndexArray[4].startIndex : 14, !isNullOrUndefined(this.itemsIndexArray[4]) ? this.itemsIndexArray[4].endIndex : 14);
    };
    Toolbar.prototype.showDownloadOption = function (enableDownloadOption) {
        this.isDownloadBtnVisible = enableDownloadOption;
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            //The itemsIndexArray is null, the default previous value for DownloadOption has been passed as (26,26).
            this.applyHideToToolbar(enableDownloadOption, !isNullOrUndefined(this.itemsIndexArray[12]) ?
                this.itemsIndexArray[12].startIndex : 26, !isNullOrUndefined(this.itemsIndexArray[12]) ?
                this.itemsIndexArray[12].endIndex : 26);
        }
        else {
            this.applyHideToToolbar(enableDownloadOption, 6, 6);
        }
    };
    Toolbar.prototype.showPageOrganizerToolbar = function (enablePageOrganizer) {
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.applyHideToToolbar(enablePageOrganizer, 4, 4);
        }
    };
    Toolbar.prototype.showPrintOption = function (enablePrintOption) {
        this.isPrintBtnVisible = enablePrintOption;
        //For mobile devices, the default previous value for PrintOption has been passed as (25,25).
        this.applyHideToToolbar(enablePrintOption, !isNullOrUndefined(this.itemsIndexArray[11]) ?
            this.itemsIndexArray[11].startIndex : 25, !isNullOrUndefined(this.itemsIndexArray[11]) ?
            this.itemsIndexArray[11].endIndex : 25);
    };
    Toolbar.prototype.showSearchOption = function (enableSearchOption) {
        this.isSearchBtnVisible = enableSearchOption;
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            //The itemsIndexArray is null, the default previous value for SearchOption has been passed as (22,22).
            this.applyHideToToolbar(enableSearchOption, !isNullOrUndefined(this.itemsIndexArray[8]) ?
                this.itemsIndexArray[8].startIndex : 22, !isNullOrUndefined(this.itemsIndexArray[8]) ?
                this.itemsIndexArray[8].endIndex : 22);
        }
        else {
            this.applyHideToToolbar(enableSearchOption, 6, 6);
        }
    };
    Toolbar.prototype.showUndoRedoTool = function (isEnable) {
        this.isUndoRedoBtnsVisible = isEnable;
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            //The itemsIndexArray is null, the default previous value for PageNavigationTool has been passed as (16,17).
            this.applyHideToToolbar(isEnable, !isNullOrUndefined(this.itemsIndexArray[5]) ? this.itemsIndexArray[5].startIndex : 16, !isNullOrUndefined(this.itemsIndexArray[5]) ? this.itemsIndexArray[5].endIndex : 17);
        }
        else {
            this.applyHideToToolbar(isEnable, 2, 3);
        }
    };
    Toolbar.prototype.showCommentOption = function (isEnable) {
        if (!this.pdfViewer.enableStickyNotesAnnotation) {
            this.isCommentBtnVisible = isEnable;
            //For mobile devices, the default previous value for CommentOption has been passed as (18,19).
            this.applyHideToToolbar(this.pdfViewer.enableStickyNotesAnnotation, !isNullOrUndefined(this.itemsIndexArray[6]) ?
                this.itemsIndexArray[6].startIndex : 18, !isNullOrUndefined(this.itemsIndexArray[6]) ?
                this.itemsIndexArray[6].endIndex : 19);
        }
        else {
            this.isCommentBtnVisible = isEnable;
            //For mobile devices, the default previous value for CommentOption has been passed as (18,19).
            this.applyHideToToolbar(isEnable, !isNullOrUndefined(this.itemsIndexArray[6]) ? this.itemsIndexArray[6].startIndex : 18, !isNullOrUndefined(this.itemsIndexArray[6]) ? this.itemsIndexArray[6].endIndex : 19);
        }
    };
    Toolbar.prototype.showAnnotationEditTool = function (isEnable) {
        this.isAnnotationEditBtnVisible = isEnable;
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            //The itemsIndexArray is null, the default previous value for AnnotationEditTool has been passed as (23,23).
            this.applyHideToToolbar(isEnable, !isNullOrUndefined(this.itemsIndexArray[9]) ?
                this.itemsIndexArray[9].startIndex : 23, !isNullOrUndefined(this.itemsIndexArray[9]) ?
                this.itemsIndexArray[9].endIndex : 23);
        }
        else {
            this.applyHideToToolbar(isEnable, 5, 5);
        }
    };
    Toolbar.prototype.showFormDesignerEditTool = function (isEnable) {
        this.isFormDesignerEditBtnVisible = isEnable;
        //For mobile devices, the default previous value for FormDesignerEditTool has been passed as (24,24).
        this.applyHideToToolbar(isEnable, !isNullOrUndefined(this.itemsIndexArray[10]) ?
            this.itemsIndexArray[10].startIndex : 24, !isNullOrUndefined(this.itemsIndexArray[10]) ?
            this.itemsIndexArray[10].endIndex : 24);
    };
    Toolbar.prototype.showSubmitForm = function (isEnable) {
        this.isSubmitbtnvisible = isEnable;
        //For mobile devices, the default previous value for SubmitForm has been passed as (20,21).
        this.applyHideToToolbar(isEnable, !isNullOrUndefined(this.itemsIndexArray[7]) ?
            this.itemsIndexArray[7].startIndex : 20, !isNullOrUndefined(this.itemsIndexArray[7]) ?
            this.itemsIndexArray[7].endIndex : 21);
    };
    Toolbar.prototype.enableOpenOption = function (enableOpenOption) {
        this.enableItems(this.openDocumentItem.parentElement, enableOpenOption);
    };
    Toolbar.prototype.enablePageNavigationTool = function (enablePageNavigationTool) {
        this.enableItems(this.firstPageItem.parentElement, enablePageNavigationTool);
        this.enableItems(this.previousPageItem.parentElement, enablePageNavigationTool);
        this.enableItems(this.nextPageItem.parentElement, enablePageNavigationTool);
        this.enableItems(this.lastPageItem.parentElement, enablePageNavigationTool);
        this.currentPageBox.readonly = !enablePageNavigationTool;
    };
    Toolbar.prototype.enableMagnificationTool = function (enableMagnificationTool) {
        this.enableItems(this.zoomInItem.parentElement, enableMagnificationTool);
        this.enableItems(this.zoomOutItem.parentElement, enableMagnificationTool);
        this.zoomDropDown.readonly = !enableMagnificationTool;
    };
    Toolbar.prototype.enableSelectionTool = function (enableSelectionTool) {
        if (this.textSelectItem && this.textSelectItem.parentElement) {
            this.enableItems(this.textSelectItem.parentElement, enableSelectionTool);
        }
    };
    Toolbar.prototype.enableScrollingTool = function (enableScrollingTool) {
        this.enableItems(this.panItem.parentElement, enableScrollingTool);
    };
    Toolbar.prototype.enableDownloadOption = function (enableDownloadOption) {
        this.enableItems(this.downloadItem.parentElement, enableDownloadOption);
    };
    Toolbar.prototype.enablePrintOption = function (enablePrintOption) {
        this.enableItems(this.printItem.parentElement, enablePrintOption);
    };
    Toolbar.prototype.enableSearchOption = function (enableSearchOption) {
        this.enableItems(this.textSearchItem.parentElement, enableSearchOption);
    };
    Toolbar.prototype.enableUndoRedoTool = function (isEnable) {
        this.enableItems(this.undoItem.parentElement, isEnable);
        this.enableItems(this.redoItem.parentElement, isEnable);
    };
    Toolbar.prototype.enableAnnotationEditTool = function (isEnable) {
        this.enableItems(this.annotationItem.parentElement, isEnable);
    };
    Toolbar.prototype.enableFormDesignerEditTool = function (isEnable) {
        this.enableItems(this.formDesignerItem.parentElement, isEnable);
    };
    Toolbar.prototype.enableCommentsTool = function (isEnable) {
        if (this.pdfViewer.enableStickyNotesAnnotation) {
            this.enableItems(this.annotationItem.parentElement, isEnable);
        }
    };
    Toolbar.prototype.enableOrganizePagesButton = function (isEnable) {
        if (!isNullOrUndefined(this.organizePageItem) && !isNullOrUndefined(this.organizePageItem.parentElement) &&
            this.pdfViewer.enablePageOrganizer) {
            this.enableItems(this.organizePageItem.parentElement, isEnable);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.resetToolbar = function () {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (!isNullOrUndefined(this.currentPageBox)) {
                this.currentPageBox.min = 0;
                this.currentPageBox.value = 0;
            }
            this.updateTotalPage();
            this.updateToolbarItems();
            if (this.pdfViewer.toolbarModule && this.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.updateFontSizeInIcon(16);
            }
            if (this.annotationToolbarModule) {
                this.annotationToolbarModule.clear();
            }
            else {
                if (this.annotationToolbarModule) {
                    if (this.annotationToolbarModule.propertyToolbar) {
                        this.annotationToolbarModule.propertyToolbar.destroy();
                    }
                    var commentsContainer = document.getElementById(this.pdfViewer.element.id + '_commentscontentcontainer');
                    if (commentsContainer) {
                        commentsContainer.innerHTML = '';
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateToolbarItems = function () {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (this.toolbar) {
                if (this.pdfViewerBase.pageCount === 0) {
                    this.enableItems(this.downloadItem.parentElement, false);
                    this.enableItems(this.printItem.parentElement, false);
                    this.enableItems(this.commentItem.parentElement, false);
                    this.updateUndoRedoButtons();
                    this.updateNavigationButtons();
                    this.enableItems(this.zoomInItem.parentElement, false);
                    this.enableItems(this.zoomOutItem.parentElement, false);
                    if (this.pdfViewer.magnificationModule) {
                        this.zoomDropDown.readonly = true;
                    }
                    this.enableItems(this.submitItem.parentElement, false);
                    this.toolbar.enableItems(this.pdfViewerBase.getElement('_currentPageInputContainer'), false);
                    this.enableItems(this.pdfViewerBase.getElement('_zoomDropDownContainer'), false);
                    this.enableItems(this.textSelectItem.parentElement, false);
                    this.enableItems(this.annotationItem.parentElement, false);
                    this.enableItems(this.formDesignerItem.parentElement, false);
                    this.enableItems(this.panItem.parentElement, false);
                    this.enableItems(this.textSearchItem.parentElement, false);
                    this.deSelectItem(this.annotationItem);
                    if (this.annotationToolbarModule) {
                        this.annotationToolbarModule.resetToolbar();
                    }
                    this.deSelectItem(this.formDesignerItem);
                    if (this.formDesignerToolbarModule) {
                        this.formDesignerToolbarModule.resetFormDesignerToolbar();
                    }
                }
                else if (this.pdfViewerBase.pageCount > 0) {
                    var obj = this.pdfViewerBase.getElement('_currentPageInputContainer');
                    if (obj) {
                        this.enableItems(this.downloadItem.parentElement, true);
                        this.enableItems(this.printItem.parentElement, true);
                        this.toolbar.enableItems(this.pdfViewerBase.getElement('_currentPageInputContainer'), true);
                        this.enableItems(this.pdfViewerBase.getElement('_zoomDropDownContainer'), true);
                        this.updateUndoRedoButtons();
                        this.updateNavigationButtons();
                        this.updateZoomButtons();
                        if (this.pdfViewer.magnificationModule) {
                            this.zoomDropDown.readonly = false;
                        }
                        this.updateInteractionItems();
                        // modify this condition if new annotation types are added.
                        if (this.pdfViewer.annotationModule && this.pdfViewer.enableAnnotation) {
                            this.enableItems(this.annotationItem.parentElement, true);
                        }
                        if (this.pdfViewer.formDesignerModule && this.pdfViewer.enableFormDesigner) {
                            this.enableItems(this.formDesignerItem.parentElement, true);
                        }
                        if (this.pdfViewer.textSearchModule && this.pdfViewer.enableTextSearch) {
                            this.enableItems(this.textSearchItem.parentElement, true);
                        }
                        if (this.pdfViewer.annotationModule && this.pdfViewer.enableStickyNotesAnnotation) {
                            this.enableItems(this.commentItem.parentElement, true);
                        }
                    }
                }
                if (this.pdfViewer.toolbarSettings.annotationToolbarItems) {
                    if (this.pdfViewer.toolbarSettings.annotationToolbarItems.length === 0 ||
                        !this.pdfViewer.annotationModule || !this.pdfViewer.enableAnnotationToolbar) {
                        this.enableToolbarItem(['AnnotationEditTool'], false);
                    }
                }
                if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems) {
                    if (this.pdfViewer.toolbarSettings.formDesignerToolbarItems.length === 0 ||
                        !this.pdfViewer.formDesignerModule || !this.pdfViewer.enableFormDesignerToolbar) {
                        this.enableToolbarItem(['FormDesignerEditTool'], false);
                    }
                }
                if (!this.pdfViewer.enableDownload) {
                    this.enableDownloadOption(false);
                }
                if (!this.pdfViewer.enablePrint) {
                    this.enablePrintOption(false);
                }
            }
        }
        else {
            if (this.pdfViewerBase.pageCount === 0) {
                this.enableItems(this.textSearchItem.parentElement, false);
                this.enableItems(this.moreOptionItem.parentElement, false);
                this.enableItems(this.annotationItem.parentElement, false);
            }
            else if (this.pdfViewerBase.pageCount > 0) {
                this.enableItems(this.textSearchItem.parentElement, true);
                this.enableItems(this.moreOptionItem.parentElement, true);
                if (this.pdfViewer.annotationModule && this.pdfViewer.enableAnnotation) {
                    this.enableItems(this.annotationItem.parentElement, true);
                }
                if (!this.pdfViewer.annotationModule || !this.pdfViewer.enableAnnotationToolbar) {
                    this.enableToolbarItem(['AnnotationEditTool'], false);
                }
                this.updateUndoRedoButtons();
                if (this.pdfViewer && this.pdfViewer.element && this.pdfViewer.element.id && this.pdfViewer.isAnnotationToolbarOpen) {
                    var annotationId = this.pdfViewer.element.id + '_annotationIcon';
                    this.annotationToolbarModule.createAnnotationToolbarForMobile(annotationId);
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateNavigationButtons = function () {
        if (this.pdfViewer.navigationModule && !this.isPageNavigationToolDisabled) {
            if (this.pdfViewerBase.pageCount === 0 || (this.pdfViewerBase.currentPageNumber === 1 && this.pdfViewerBase.pageCount === 1)) {
                this.enableItems(this.firstPageItem.parentElement, false);
                this.enableItems(this.previousPageItem.parentElement, false);
                this.enableItems(this.nextPageItem.parentElement, false);
                this.enableItems(this.lastPageItem.parentElement, false);
            }
            else if (this.pdfViewerBase.currentPageNumber === 1 && this.pdfViewerBase.pageCount > 0) {
                this.enableItems(this.firstPageItem.parentElement, false);
                this.enableItems(this.previousPageItem.parentElement, false);
                this.enableItems(this.nextPageItem.parentElement, true);
                this.enableItems(this.lastPageItem.parentElement, true);
            }
            else if (this.pdfViewerBase.currentPageNumber === this.pdfViewerBase.pageCount && this.pdfViewerBase.pageCount > 0) {
                this.enableItems(this.firstPageItem.parentElement, true);
                this.enableItems(this.previousPageItem.parentElement, true);
                this.enableItems(this.nextPageItem.parentElement, false);
                this.enableItems(this.lastPageItem.parentElement, false);
            }
            else if (this.pdfViewerBase.currentPageNumber > 1 && this.pdfViewerBase.currentPageNumber < this.pdfViewerBase.pageCount) {
                this.enableItems(this.firstPageItem.parentElement, true);
                this.enableItems(this.previousPageItem.parentElement, true);
                this.enableItems(this.nextPageItem.parentElement, true);
                this.enableItems(this.lastPageItem.parentElement, true);
            }
        }
        else {
            this.enableItems(this.firstPageItem.parentElement, false);
            this.enableItems(this.previousPageItem.parentElement, false);
            this.enableItems(this.nextPageItem.parentElement, false);
            this.enableItems(this.lastPageItem.parentElement, false);
            this.currentPageBox.readonly = true;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateZoomButtons = function () {
        if (this.pdfViewer.magnificationModule && !this.isMagnificationToolDisabled && (!Browser.isDevice ||
            this.pdfViewer.enableDesktopMode)) {
            if (this.pdfViewer.minZoom != null || this.pdfViewer.maxZoom != null) {
                if (this.pdfViewer.magnificationModule.zoomFactor <= this.pdfViewer.minZoom / 100) {
                    this.enableItems(this.zoomInItem.parentElement, true);
                    this.enableItems(this.zoomOutItem.parentElement, false);
                }
                else if (this.pdfViewer.magnificationModule.zoomFactor >= this.pdfViewer.maxZoom / 100) {
                    this.enableItems(this.zoomInItem.parentElement, false);
                    this.enableItems(this.zoomOutItem.parentElement, true);
                }
                else {
                    this.enableItems(this.zoomInItem.parentElement, true);
                    this.enableItems(this.zoomOutItem.parentElement, true);
                }
            }
            else {
                if (this.pdfViewer.magnificationModule.zoomFactor <= 0.1) {
                    this.enableItems(this.zoomInItem.parentElement, true);
                    this.enableItems(this.zoomOutItem.parentElement, false);
                }
                else if (this.pdfViewer.magnificationModule.zoomFactor >= 4) {
                    this.enableItems(this.zoomInItem.parentElement, false);
                    this.enableItems(this.zoomOutItem.parentElement, true);
                }
                else {
                    this.enableItems(this.zoomInItem.parentElement, true);
                    this.enableItems(this.zoomOutItem.parentElement, true);
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateUndoRedoButtons = function () {
        if (this.pdfViewer.annotationModule) {
            if (this.pdfViewerBase.pageCount > 0) {
                if (isBlazor()) {
                    this.enableCollectionAvailableInBlazor(this.pdfViewer.annotationModule.actionCollection, 'undo');
                    this.enableCollectionAvailableInBlazor(this.pdfViewer.annotationModule.redoCollection, 'redo');
                }
                else {
                    if (!isNullOrUndefined(this.undoItem) && !isNullOrUndefined(this.undoItem.parentElement)) {
                        this.enableCollectionAvailable(this.pdfViewer.annotationModule.actionCollection, this.undoItem.parentElement);
                    }
                    if (!isNullOrUndefined(this.redoItem) && !isNullOrUndefined(this.redoItem.parentElement)) {
                        this.enableCollectionAvailable(this.pdfViewer.annotationModule.redoCollection, this.redoItem.parentElement);
                    }
                }
            }
            else {
                if (isBlazor()) {
                    //this.pdfViewer._dotnetInstance.invokeMethodAsync('DisableUndoRedoButton', null);
                    this.pdfViewerBase.blazorUIAdaptor.disableUndoRedoButton();
                }
                else {
                    this.disableUndoRedoButtons();
                }
            }
        }
        else {
            if (isBlazor()) {
                //this.pdfViewer._dotnetInstance.invokeMethodAsync('DisableUndoRedoButton', null);
                this.pdfViewerBase.blazorUIAdaptor.disableUndoRedoButton();
            }
            else {
                this.disableUndoRedoButtons();
            }
        }
    };
    Toolbar.prototype.enableCollectionAvailable = function (collection, item) {
        if (collection.length > 0) {
            this.toolbar.enableItems(item, true);
        }
        else {
            this.toolbar.enableItems(item, false);
        }
    };
    Toolbar.prototype.enableCollectionAvailableInBlazor = function (collection, item) {
        if (collection.length > 0) {
            //this.pdfViewer._dotnetInstance.invokeMethodAsync('UpdateUndoRedoButton', item, true);
            this.pdfViewerBase.blazorUIAdaptor.updateUndoRedoButton(item, true);
        }
        else {
            // this.pdfViewer._dotnetInstance.invokeMethodAsync('UpdateUndoRedoButton', item, false);
            this.pdfViewerBase.blazorUIAdaptor.updateUndoRedoButton(item, false);
        }
    };
    Toolbar.prototype.disableUndoRedoButtons = function () {
        this.enableItems(this.undoItem.parentElement, false);
        this.enableItems(this.redoItem.parentElement, false);
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.destroy = function () {
        if (!isBlazor()) {
            this.unWireEvent();
            this.destroyComponent();
            if (this.moreDropDown) {
                this.moreDropDown.destroy();
            }
            if (this.annotationToolbarModule) {
                this.annotationToolbarModule.destroy();
            }
            if (this.formDesignerToolbarModule) {
                this.formDesignerToolbarModule.destroy();
            }
            if (this.toolbar) {
                this.toolbar.destroy();
            }
            if (this.toolbarElement) {
                this.toolbarElement.parentElement.removeChild(this.toolbarElement);
            }
        }
    };
    Toolbar.prototype.destroyComponent = function () {
        var componentElement = [this.openDocumentItem, this.firstPageItem, this.previousPageItem, this.nextPageItem,
            this.lastPageItem, this.currentPageBoxElement, this.zoomOutItem, this.zoomInItem, this.zoomDropdownItem, this.textSelectItem,
            this.panItem, this.submitItem, this.undoItem, this.redoItem, this.commentItem, this.textSearchItem, this.annotationItem,
            this.formDesignerItem, this.printItem, this.downloadItem];
        for (var i = 0; i < componentElement.length; i++) {
            if (componentElement[parseInt(i.toString(), 10)]) {
                this.destroyDependentComponent(componentElement[parseInt(i.toString(), 10)]);
            }
        }
    };
    Toolbar.prototype.destroyDependentComponent = function (component) {
        if (component.ej2_instances) {
            for (var i = component.ej2_instances.length - 1; i >= 0; i--) {
                component.ej2_instances[parseInt(i.toString(), 10)].destroy();
            }
        }
    };
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateCurrentPage = function (pageIndex) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (!isBlazor()) {
                if (!isNullOrUndefined(this.currentPageBox)) {
                    if (this.currentPageBox.value === pageIndex) {
                        this.currentPageBoxElement.value = pageIndex.toString();
                    }
                    this.currentPageBox.value = pageIndex;
                }
            }
            else {
                //this.pdfViewer._dotnetInstance.invokeMethodAsync('OnPageChanged', pageIndex);
                this.pdfViewerBase.blazorUIAdaptor.pageChanged(pageIndex);
            }
            this.pdfViewerBase.currentPageNumber = pageIndex;
            this.pdfViewer.currentPageNumber = pageIndex;
        }
        else {
            this.pdfViewerBase.mobileSpanContainer.innerHTML = pageIndex.toString();
            this.pdfViewerBase.mobilecurrentPageContainer.innerHTML = pageIndex.toString();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateTotalPage = function () {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (this.pdfViewerBase.pageCount > 0) {
                if (!isNullOrUndefined(this.currentPageBox)) {
                    this.currentPageBox.min = 1;
                }
            }
            if (!isNullOrUndefined(this.totalPageItem)) {
                this.totalPageItem.textContent = this.pdfViewer.localeObj.getConstant('of') + this.pdfViewerBase.pageCount.toString();
            }
        }
    };
    /**
     * @param {event} event - It describes about the event
     * @private
     * @returns {void}
     */
    Toolbar.prototype.openFileDialogBox = function (event) {
        event.preventDefault();
        this.fileInputElement.click();
    };
    Toolbar.prototype.createToolbar = function (controlWidth) {
        var _this = this;
        this.toolbarElement = createElement('div', { id: this.pdfViewer.element.id + '_toolbarContainer', className: 'e-pv-toolbar' });
        this.pdfViewerBase.viewerMainContainer.appendChild(this.toolbarElement);
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            this.toolbar = new tool({
                clicked: this.toolbarClickHandler, width: '', height: '', overflowMode: 'Popup', cssClass: 'e-pv-toolbar-scroll',
                items: this.createToolbarItems(), created: function () {
                    _this.createZoomDropdown();
                    _this.createNumericTextBox();
                    _this.toolbar.refreshOverflow();
                }
            });
            this.toolbar.isStringTemplate = true;
            if (this.pdfViewer.enableRtl) {
                this.toolbar.enableRtl = true;
            }
            this.toolbar.appendTo(this.toolbarElement);
            this.applyToolbarSettings();
            this.afterToolbarCreation();
            this.updateTotalPage();
            this.toolbarElement.addEventListener('keydown', this.onToolbarKeydown);
            this.toolbarElement.setAttribute('aria-label', 'Toolbar');
        }
        else {
            this.createToolbarItemsForMobile();
            this.afterToolbarCreationInMobile();
            if (this.pdfViewer.enableRtl) {
                this.toolbar.enableRtl = true;
            }
            this.applyToolbarSettingsForMobile();
            this.disableUndoRedoButtons();
        }
        return this.toolbarElement;
    };
    /**
     * Create a custom toolbar item in the PdfViewer
     *
     * @param  {number} startIndex - It describes about the start index
     * @returns {void}
     */
    Toolbar.prototype.createCustomItem = function (startIndex) {
        if (!isNullOrUndefined(this.pdfViewer.toolbarSettings)) {
            if (isNullOrUndefined(this.pdfViewer.toolbarSettings.toolbarItems)) {
                this.pdfViewer.toolbarSettings.toolbarItems = ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'SelectionTool',
                    'PanTool', 'UndoRedoTool', 'CommentTool', 'SubmitForm', 'SearchOption', 'AnnotationEditTool',
                    'FormDesignerEditTool', 'PrintOption', 'DownloadOption'];
            }
            if (isNullOrUndefined(this.pdfViewer.toolbarSettings.annotationToolbarItems)) {
                this.pdfViewer.toolbarSettings.annotationToolbarItems = ['HighlightTool', 'UnderlineTool', 'StrikethroughTool',
                    'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool', 'HandWrittenSignatureTool',
                    'InkAnnotationTool', 'ShapeTool', 'CalibrateTool', 'StrokeColorEditTool', 'ThicknessEditTool',
                    'FreeTextAnnotationTool', 'FontFamilyAnnotationTool', 'FontSizeAnnotationTool', 'FontStylesAnnotationTool',
                    'FontAlignAnnotationTool', 'FontColorAnnotationTool', 'CommentPanelTool'];
            }
            if (isNullOrUndefined(this.pdfViewer.toolbarSettings.formDesignerToolbarItems)) {
                this.pdfViewer.toolbarSettings.formDesignerToolbarItems = ['TextboxTool', 'PasswordTool', 'CheckBoxTool',
                    'RadioButtonTool', 'DropdownTool', 'ListboxTool', 'DrawSignatureTool', 'DeleteTool'];
            }
            if (isNullOrUndefined(this.pdfViewer.toolbarSettings.showTooltip)) {
                this.pdfViewer.toolbarSettings.showTooltip = false;
            }
        }
        for (var j = startIndex; j < this.pdfViewer.toolbarSettings.toolbarItems.length; j++) {
            if (typeof (this.pdfViewer.toolbarSettings.toolbarItems[parseInt(j.toString(), 10)]) === 'object') {
                var customToolbarItem = this.pdfViewer.toolbarSettings.toolbarItems[parseInt(j.toString(), 10)];
                if (!isNullOrUndefined(customToolbarItem.prefixIcon) && customToolbarItem.prefixIcon !== '') {
                    customToolbarItem.prefixIcon += ' e-pv-icon';
                }
                //Generate a text button template
                if ((isNullOrUndefined(customToolbarItem.prefixIcon) || customToolbarItem.prefixIcon === '') && isNullOrUndefined(customToolbarItem.template)) {
                    var text = !isNullOrUndefined(customToolbarItem.text) ? customToolbarItem.text : 'Custom Toolbar Item';
                    customToolbarItem.template = '<button id="Custom" class="e-tbar-btn" style="font-size:14px"><span>' + text + '</span></button>';
                }
                this.toolItems.push(customToolbarItem);
                if (isNullOrUndefined(customToolbarItem.align) || customToolbarItem.align === 'left' || customToolbarItem.align === 'Left') {
                    this.toolItems.push({ type: 'Separator', align: 'Left' });
                }
            }
            else {
                break;
            }
        }
    };
    Toolbar.prototype.createToolbarItems = function () {
        var currentPageInputTemplate = this.createCurrentPageInputTemplate();
        var totalPageTemplate = this.createTotalPageTemplate();
        var zoomDropDownTemplateString = this.createZoomDropdownElement();
        var submitButton = '<button id="' + this.pdfViewer.element.id + '_submitForm" class="e-tbar-btn" style="font-size:15px"><span id="' + this.pdfViewer.element.id + '_submitFormSpan" class="e-tbar-btn-text e-pv-submitform-text">' + this.pdfViewer.localeObj.getConstant('SubmitForm') + '</span></button>';
        var defaultToolbarOrder = ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'SelectionTool', 'PanTool', 'UndoRedoTool', 'CommentTool', 'SubmitForm', 'SearchOption', 'AnnotationEditTool', 'FormDesignerEditTool', 'PrintOption', 'DownloadOption'];
        for (var i = 0; i < defaultToolbarOrder.length; i++) {
            if (i === 0) {
                this.createCustomItem(i);
            }
            var toolbarItemOrder = i;
            switch (toolbarItemOrder) {
                case 0:
                    this.itemsIndexArray.push({ item: 'OpenOption', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-open-document-icon e-pv-icon', cssClass: 'e-pv-open-document-container', id: this.pdfViewer.element.id + '_open', text: this.pdfViewer.localeObj.getConstant('Open text'), align: 'Left' });
                    this.toolItems.push({ type: 'Separator', align: 'Left', cssClass: 'e-pv-open-separator-container' });
                    break;
                case 1:
                    if (!this.pdfViewer.enableRtl) {
                        this.itemsIndexArray.push({ item: 'PageNavigationTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length + 5 });
                        this.toolItems.push({ prefixIcon: 'e-pv-first-page-navigation-icon e-pv-icon', cssClass: 'e-pv-first-page-navigation-container', id: this.pdfViewer.element.id + '_firstPage', text: this.pdfViewer.localeObj.getConstant('First text'), align: 'Left' });
                        this.toolItems.push({ prefixIcon: 'e-pv-previous-page-navigation-icon e-pv-icon', cssClass: 'e-pv-previous-page-navigation-container', id: this.pdfViewer.element.id + '_previousPage', text: this.pdfViewer.localeObj.getConstant('Previous text'), align: 'Left' });
                        this.toolItems.push({ prefixIcon: 'e-pv-next-page-navigation-icon e-pv-icon', cssClass: 'e-pv-next-page-navigation-container', id: this.pdfViewer.element.id + '_nextPage', text: this.pdfViewer.localeObj.getConstant('Next text'), align: 'Left' });
                        this.toolItems.push({ prefixIcon: 'e-pv-last-page-navigation-icon e-pv-icon', cssClass: 'e-pv-last-page-navigation-container', id: this.pdfViewer.element.id + '_lastPage', text: this.pdfViewer.localeObj.getConstant('Last text'), align: 'Left' });
                        this.toolItems.push({ template: currentPageInputTemplate, align: 'Left', cssClass: 'e-pv-current-page-container' });
                        this.toolItems.push({ template: totalPageTemplate, align: 'Left', cssClass: 'e-pv-total-page-container' });
                    }
                    else {
                        this.toolItems.push({ prefixIcon: 'e-pv-last-page-navigation-icon e-pv-icon', cssClass: 'e-pv-last-page-navigation-container', id: this.pdfViewer.element.id + '_firstPage', text: this.pdfViewer.localeObj.getConstant('First text'), align: 'Left' });
                        this.toolItems.push({ prefixIcon: 'e-pv-next-page-navigation-icon e-pv-icon', cssClass: 'e-pv-next-page-navigation-container', id: this.pdfViewer.element.id + '_previousPage', text: this.pdfViewer.localeObj.getConstant('Previous text'), align: 'Left' });
                        this.toolItems.push({ prefixIcon: 'e-pv-previous-page-navigation-icon e-pv-icon', cssClass: 'e-pv-previous-page-navigation-container', id: this.pdfViewer.element.id + '_nextPage', text: this.pdfViewer.localeObj.getConstant('Next text'), align: 'Left' });
                        this.toolItems.push({ prefixIcon: 'e-pv-first-page-navigation-icon e-pv-icon', cssClass: 'e-pv-first-page-navigation-container', id: this.pdfViewer.element.id + '_lastPage', text: this.pdfViewer.localeObj.getConstant('Last text'), align: 'Left' });
                        this.toolItems.push({ template: totalPageTemplate, align: 'Left', cssClass: 'e-pv-total-page-container' });
                        this.toolItems.push({ template: currentPageInputTemplate, align: 'Left', cssClass: 'e-pv-current-page-container' });
                    }
                    this.toolItems.push({ type: 'Separator', align: 'Left', cssClass: 'e-pv-navigation-separator-container' });
                    break;
                case 2:
                    this.itemsIndexArray.push({ item: 'MagnificationTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length + 2 });
                    this.toolItems.push({ prefixIcon: 'e-pv-zoom-out-icon e-pv-icon', cssClass: 'e-pv-zoom-out-container', id: this.pdfViewer.element.id + '_zoomOut', text: this.pdfViewer.localeObj.getConstant('Zoom out text'), align: 'Left' });
                    this.toolItems.push({ prefixIcon: 'e-pv-zoom-in-icon e-pv-icon', cssClass: 'e-pv-zoom-in-container', id: this.pdfViewer.element.id + '_zoomIn', text: this.pdfViewer.localeObj.getConstant('Zoom in text'), align: 'Left' });
                    this.toolItems.push({ template: zoomDropDownTemplateString, cssClass: 'e-pv-zoom-drop-down-container', align: 'Left' });
                    this.toolItems.push({ type: 'Separator', align: 'Left', cssClass: 'e-pv-magnification-separator-container' });
                    break;
                case 3:
                    this.itemsIndexArray.push({ item: 'SelectionTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-text-select-tool-icon e-pv-icon', cssClass: 'e-pv-text-select-tool-container', id: this.pdfViewer.element.id + '_selectTool', text: this.pdfViewer.localeObj.getConstant('Selection text') });
                    break;
                case 4:
                    this.itemsIndexArray.push({ item: 'PanTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-pan-tool-icon e-pv-icon', cssClass: 'e-pv-pan-tool-container', id: this.pdfViewer.element.id + '_handTool', text: this.pdfViewer.localeObj.getConstant('Pan text') });
                    this.toolItems.push({ type: 'Separator', align: 'Left', cssClass: 'e-pv-pan-separator-container' });
                    break;
                case 5:
                    this.itemsIndexArray.push({ item: 'UndoRedoTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length + 1 });
                    this.toolItems.push({ prefixIcon: 'e-pv-undo-icon e-pv-icon', cssClass: 'e-pv-undo-container', id: this.pdfViewer.element.id + '_undo', text: this.pdfViewer.localeObj.getConstant('Undo'), align: 'Left' });
                    this.toolItems.push({ prefixIcon: 'e-pv-redo-icon e-pv-icon', cssClass: 'e-pv-redo-container', id: this.pdfViewer.element.id + '_redo', text: this.pdfViewer.localeObj.getConstant('Redo'), align: 'Left' });
                    this.toolItems.push({ type: 'Separator', align: 'Left', cssClass: 'e-pv-undo-separator-container' });
                    break;
                case 6:
                    this.itemsIndexArray.push({ item: 'CommentTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length + 1 });
                    this.toolItems.push({ prefixIcon: 'e-pv-comment-icon e-pv-icon', cssClass: 'e-pv-comment-container', id: this.pdfViewer.element.id + '_comment', text: this.pdfViewer.localeObj.getConstant('Add Comments'), align: 'Left' });
                    this.toolItems.push({ type: 'Separator', align: 'Left', cssClass: 'e-pv-comment-separator-container' });
                    break;
                case 7:
                    this.itemsIndexArray.push({ item: 'SubmitForm', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ template: submitButton, cssClass: 'e-pv-submit', align: 'Left' });
                    break;
                case 8:
                    this.itemsIndexArray.push({ item: 'SearchOption', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-text-search-icon e-pv-icon', cssClass: 'e-pv-text-search-container', id: this.pdfViewer.element.id + '_search', text: this.pdfViewer.localeObj.getConstant('Search text'), align: 'Right' });
                    break;
                case 9:
                    this.itemsIndexArray.push({ item: 'AnnotationEditTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-annotation-icon e-pv-icon', cssClass: 'e-pv-annotation-container', id: this.pdfViewer.element.id + '_annotation', text: this.pdfViewer.localeObj.getConstant('Annotation Edit text'), align: 'Right' });
                    break;
                case 10:
                    this.itemsIndexArray.push({ item: 'FormDesignerEditTool', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-formdesigner-icon e-pv-icon', cssClass: 'e-pv-formdesigner-container', id: this.pdfViewer.element.id + '_formdesigner', text: this.pdfViewer.localeObj.getConstant('FormDesigner Edit text'), align: 'Right' });
                    break;
                case 11:
                    this.itemsIndexArray.push({ item: 'PrintOption', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-print-document-icon e-pv-icon', cssClass: 'e-pv-print-document-container', id: this.pdfViewer.element.id + '_print', text: this.pdfViewer.localeObj.getConstant('Print text'), align: 'Right' });
                    break;
                case 12:
                    this.itemsIndexArray.push({ item: 'DownloadOption', startIndex: this.toolItems.length, endIndex: this.toolItems.length });
                    this.toolItems.push({ prefixIcon: 'e-pv-download-document-icon e-pv-icon', cssClass: 'e-pv-download-document-container', id: this.pdfViewer.element.id + '_download', text: this.pdfViewer.localeObj.getConstant('Download'), align: 'Right' });
                    break;
            }
            for (var k = 0; k < this.pdfViewer.toolbarSettings.toolbarItems.length; k++) {
                if (defaultToolbarOrder[parseInt(i.toString(), 10)] ===
                    this.pdfViewer.toolbarSettings.toolbarItems[parseInt(k.toString(), 10)]) {
                    if (typeof (this.pdfViewer.toolbarSettings.toolbarItems[k + 1]) === 'object') {
                        this.createCustomItem(k + 1);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return this.toolItems;
    };
    Toolbar.prototype.afterToolbarCreationInMobile = function () {
        this.itemsContainer = this.toolbar.element.childNodes[0];
        this.itemsContainer.id = this.pdfViewer.element.id + '_toolbarItemsContainer';
        this.openDocumentItem = this.addClassToolbarItem('_open', 'e-pv-open-document', this.pdfViewer.localeObj.getConstant('Open'));
        this.undoItem = this.addClassToolbarItem('_undo', 'e-pv-undo', this.pdfViewer.localeObj.getConstant('Undo'));
        this.redoItem = this.addClassToolbarItem('_redo', 'e-pv-redo', this.pdfViewer.localeObj.getConstant('Redo'));
        this.annotationItem = this.addClassToolbarItem('_annotation', 'e-pv-annotation', this.pdfViewer.localeObj.getConstant('Annotation'));
        this.textSearchItem = this.addClassToolbarItem('_search', 'e-pv-text-search', this.pdfViewer.localeObj.getConstant('Text Search'));
    };
    Toolbar.prototype.afterToolbarCreation = function () {
        var isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
        this.itemsContainer = this.toolbar.element.childNodes[0];
        this.itemsContainer.id = this.pdfViewer.element.id + '_toolbarItemsContainer';
        this.openDocumentItem = this.addClassToolbarItem('_open', 'e-pv-open-document', this.pdfViewer.localeObj.getConstant('Open') + (isMac ? ' (⌘+O)' : ' (Ctrl+O)'));
        this.undoItem = this.addClassToolbarItem('_undo', 'e-pv-undo', this.pdfViewer.localeObj.getConstant('Undo') + (isMac ? ' (⌘+Z)' : ' (Ctrl+Z)'));
        this.redoItem = this.addClassToolbarItem('_redo', 'e-pv-redo', this.pdfViewer.localeObj.getConstant('Redo') + (isMac ? ' (⌘+Y)' : ' (Ctrl+Y)'));
        if (!this.pdfViewer.enableRtl) {
            this.firstPageItem = this.addClassToolbarItem('_firstPage', 'e-pv-first-page-navigation', this.pdfViewer.localeObj.getConstant('Go To First Page') + (isMac ? ' (⌘+← or ⌘+↑)' : ' (Ctrl+← or Ctrl+↑)'));
            this.previousPageItem = this.addClassToolbarItem('_previousPage', 'e-pv-previous-page-navigation', this.pdfViewer.localeObj.getConstant('Previous Page') + (' (←)'));
            this.nextPageItem = this.addClassToolbarItem('_nextPage', 'e-pv-next-page-navigation', this.pdfViewer.localeObj.getConstant('Next Page') + (' (→)'));
            this.lastPageItem = this.addClassToolbarItem('_lastPage', 'e-pv-last-page-navigation', this.pdfViewer.localeObj.getConstant('Go To Last Page') + (isMac ? ' (⌘+→ or ⌘+↓)' : ' (Ctrl+→ or Ctrl+↓)'));
        }
        else {
            this.firstPageItem = this.addClassToolbarItem('_firstPage', 'e-pv-last-page-navigation', this.pdfViewer.localeObj.getConstant('Go To First Page') + (isMac ? ' (⌘+← or ⌘+↑)' : ' (Ctrl+← or Ctrl+↑)'));
            this.previousPageItem = this.addClassToolbarItem('_previousPage', 'e-pv-next-page-navigation', this.pdfViewer.localeObj.getConstant('Previous Page') + (' (←)'));
            this.nextPageItem = this.addClassToolbarItem('_nextPage', 'e-pv-previous-page-navigation', this.pdfViewer.localeObj.getConstant('Next Page') + (' (→)'));
            this.lastPageItem = this.addClassToolbarItem('_lastPage', 'e-pv-first-page-navigation', this.pdfViewer.localeObj.getConstant('Go To Last Page') + (isMac ? ' (⌘+→ or ⌘+↓)' : ' (Ctrl+→ or Ctrl+↓)'));
        }
        this.zoomOutItem = this.addClassToolbarItem('_zoomOut', 'e-pv-zoom-out', this.pdfViewer.localeObj.getConstant('Zoom Out') + (isMac ? ' (⌘+Minus)' : ' (Ctrl+Minus)'));
        this.zoomInItem = this.addClassToolbarItem('_zoomIn', 'e-pv-zoom-in', this.pdfViewer.localeObj.getConstant('Zoom In') + (isMac ? ' (⌘+Plus)' : ' (Ctrl+Plus)'));
        this.textSelectItem = this.addClassToolbarItem('_selectTool', 'e-pv-text-select-tool', this.pdfViewer.localeObj.getConstant('Text Selection') + (isMac ? ' (⇧+V)' : ' (Shift+V)'));
        this.panItem = this.addClassToolbarItem('_handTool', 'e-pv-pan-tool', this.pdfViewer.localeObj.getConstant('Panning') + (isMac ? ' (⇧+H)' : ' (Shift+H)'));
        this.commentItem = this.addClassToolbarItem('_comment', 'e-pv-comment', this.pdfViewer.localeObj.getConstant('Add Comments'));
        this.textSearchItem = this.addClassToolbarItem('_search', 'e-pv-text-search', this.pdfViewer.localeObj.getConstant('Text Search') + (isMac ? ' (⌘+F)' : ' (Ctrl+F)'));
        this.textSearchItem.setAttribute('aria-label', this.pdfViewer.localeObj.getConstant('Search text'));
        this.annotationItem = this.addClassToolbarItem('_annotation', 'e-pv-annotation', this.pdfViewer.localeObj.getConstant('Annotation') + (isMac ? ' (⌘+⇧+A)' : ' (Ctrl+Shift+A)'));
        this.annotationItem.setAttribute('aria-label', this.pdfViewer.localeObj.getConstant('Annotation Edit text'));
        this.formDesignerItem = this.addClassToolbarItem('_formdesigner', 'e-pv-formdesigner', this.pdfViewer.localeObj.getConstant('FormDesigner'));
        this.printItem = this.addClassToolbarItem('_print', 'e-pv-print-document', this.pdfViewer.localeObj.getConstant('Print') + (isMac ? ' (⌘+P)' : ' (Ctrl+P)'));
        this.downloadItem = this.addClassToolbarItem('_download', 'e-pv-download-document', this.pdfViewer.localeObj.getConstant('Download file') + (isMac ? ' (⌘+S)' : ' (Ctrl+S)'));
        this.zoomDropdownItem = this.pdfViewerBase.getElement('_zoomDropDown');
        this.createTooltip(this.zoomDropdownItem, this.pdfViewer.localeObj.getConstant('Zoom'));
        this.zoomDropdownItem.setAttribute('aria-label', this.pdfViewer.localeObj.getConstant('Zoom'));
        this.addPropertiesToolItemContainer(this.zoomDropdownItem.parentElement.parentElement, null, '_zoomDropDownContainer');
        this.createTooltip(this.currentPageBoxElement, this.pdfViewer.localeObj.getConstant('Page Number') + (isMac ? ' (⌘+G)' : ' (Ctrl+G)'));
        this.currentPageBoxElement.setAttribute('aria-label', this.pdfViewer.localeObj.getConstant('Page Number'));
        this.submitItem = this.pdfViewerBase.getElement('_submitForm');
        this.addPropertiesToolItemContainer(this.submitItem.parentElement, 'e-pv-submit', '_submitFormContainer');
        this.createTooltip(this.submitItem, this.pdfViewer.localeObj.getConstant('SubmitForm'));
        this.submitItem.setAttribute('aria-label', this.pdfViewer.localeObj.getConstant('SubmitForm'));
        this.addPropertiesToolItemContainer(this.currentPageBoxElement.parentElement.parentElement, 'e-pv-current-page-container', '_currentPageInputContainer');
        this.pdfViewerBase.getElement('_currentPageInputContainer').style.minWidth = '20px';
        this.totalPageItem = this.pdfViewerBase.getElement('_totalPage');
        this.addPropertiesToolItemContainer(this.totalPageItem.parentElement, 'e-pv-total-page-container', '_totalPageContainer');
    };
    /**
     * @param {string} idString - It describes about the idString value
     * @param {string} className - It describes about the class name
     * @param {string} tooltipText - It describes about the tooltip text
     * @private
     * @returns {HTMLElement} - html element
     */
    Toolbar.prototype.addClassToolbarItem = function (idString, className, tooltipText) {
        var element = this.pdfViewerBase.getElement(idString);
        element.classList.add(className);
        element.classList.add('e-pv-tbar-btn');
        element.setAttribute('aria-label', tooltipText);
        element.parentElement.classList.add(className + '-container');
        element.parentElement.classList.add('e-popup-text');
        element.parentElement.id = this.pdfViewer.element.id + idString + 'Container';
        if (element.childNodes.length > 0) {
            var spanElement = element.childNodes[0];
            spanElement.id = this.pdfViewer.element.id + idString + 'Icon';
            spanElement.classList.remove('e-icons');
            spanElement.classList.remove('e-btn-icon');
            if (this.pdfViewer.enableRtl) {
                spanElement.classList.add('e-right');
            }
            var textElement = element.childNodes[1];
            if (textElement) {
                if (textElement.classList.contains('e-tbar-btn-text')) {
                    textElement.id = this.pdfViewer.element.id + idString + 'Text';
                }
            }
        }
        element.style.width = '';
        this.createTooltip(element, tooltipText);
        return element;
    };
    Toolbar.prototype.addPropertiesToolItemContainer = function (element, className, idString) {
        if (className !== null) {
            element.classList.add(className);
        }
        element.classList.add('e-popup-text');
        element.id = this.pdfViewer.element.id + idString;
    };
    Toolbar.prototype.createZoomDropdownElement = function () {
        var zoomDropdownElement = this.createToolbarItem('input', this.pdfViewer.element.id + '_zoomDropDown', null);
        return zoomDropdownElement.outerHTML;
    };
    Toolbar.prototype.createZoomDropdown = function () {
        // eslint-disable-next-line
        var proxy = this;
        var minZoom = proxy.pdfViewer.minZoom;
        var maxZoom = proxy.pdfViewer.maxZoom;
        var items = [];
        var zoomValues = [10, 25, 50, 75, 100, 125, 150, 200, 400];
        if (minZoom != null && maxZoom != null && minZoom > maxZoom) {
            var tempZoomValue = maxZoom;
            maxZoom = minZoom;
            minZoom = tempZoomValue;
        }
        if (minZoom != null || maxZoom != null) {
            var isWithinRange = function (zoom) {
                return (minZoom == null || zoom >= minZoom) && (maxZoom == null || zoom <= maxZoom);
            };
            var idCounter = 0;
            if (minZoom != null && !items.some(function (item) { return parseInt(item.id, 10) === minZoom; })) {
                items.push({ percent: minZoom + '%', id: idCounter.toString() });
                idCounter++;
            }
            for (var i = 0; i < zoomValues.length; i++) {
                var zoom = zoomValues[parseInt(i.toString(), 10)];
                if (isWithinRange(zoom) && zoom !== minZoom && zoom !== maxZoom) {
                    items.push({ percent: zoom + '%', id: idCounter.toString() });
                    idCounter++;
                }
            }
            if (maxZoom != null && !items.some(function (item) { return parseInt(item.id, 10) === maxZoom; }) && maxZoom !== minZoom) {
                items.push({ percent: maxZoom + '%', id: idCounter.toString() });
                idCounter++;
            }
            items.sort(function (a, b) { return parseInt(a.id, 10) - parseInt(b.id, 10); });
        }
        else {
            items.push({ percent: '10%', id: '0' }, { percent: '35%', id: '1' }, { percent: '50%', id: '2' }, { percent: '75%', id: '3' }, { percent: '100%', id: '4' }, { percent: '125%', id: '5' }, { percent: '150%', id: '6' }, { percent: '200%', id: '7' }, { percent: '400%', id: '8' });
        }
        items.push({ percent: proxy.pdfViewer.localeObj.getConstant('Fit Page'), id: 'fitPage' }, { percent: proxy.pdfViewer.localeObj.getConstant('Fit Width'), id: 'fitWidth' }, { percent: proxy.pdfViewer.localeObj.getConstant('Automatic'), id: 'automatic' });
        if (!proxy.pdfViewer.enableRtl) {
            proxy.zoomDropDown = new ComboBox({
                dataSource: items, text: '100%', fields: { text: 'percent', value: 'id' }, readonly: true, cssClass: 'e-pv-zoom-drop-down', popupHeight: '450px', showClearButton: false, open: proxy.openZoomDropdown.bind(proxy), select: function (args) {
                    if (args.e.type === 'keydown' && args.itemData.percent !== proxy.zoomDropDown.element.value) {
                        proxy.zoomDropDownChange(proxy.zoomDropDown.element.value);
                        args.cancel = true;
                    }
                }
            });
        }
        else {
            proxy.zoomDropDown = new ComboBox({
                dataSource: items, text: '100%', enableRtl: true, fields: { text: 'percent', value: 'id' }, readonly: true, cssClass: 'e-pv-zoom-drop-down-rtl', popupHeight: '450px', showClearButton: false, open: proxy.openZoomDropdown.bind(proxy), select: function (args) {
                    if (args.e.type === 'keydown' && args.itemData.percent !== proxy.zoomDropDown.element.value) {
                        proxy.zoomDropDownChange(proxy.zoomDropDown.element.value);
                        args.cancel = true;
                    }
                }
            });
        }
        proxy.zoomDropDown.appendTo(proxy.pdfViewerBase.getElement('_zoomDropDown'));
    };
    Toolbar.prototype.createCurrentPageInputTemplate = function () {
        var goToPageElement = this.createToolbarItem('input', this.pdfViewer.element.id + '_currentPageInput', null);
        return goToPageElement.outerHTML;
    };
    Toolbar.prototype.createTotalPageTemplate = function () {
        var totalPageElement = this.createToolbarItem('span', this.pdfViewer.element.id + '_totalPage', 'e-pv-total-page');
        return totalPageElement.outerHTML;
    };
    Toolbar.prototype.createNumericTextBox = function () {
        this.currentPageBox = new NumericTextBox({ value: 0, format: '##', cssClass: 'e-pv-current-page-box', showSpinButton: false });
        this.currentPageBoxElement = this.pdfViewerBase.getElement('_currentPageInput');
        this.currentPageBox.appendTo(this.currentPageBoxElement);
    };
    Toolbar.prototype.createToolbarItemsForMobile = function () {
        this.toolbarElement.classList.add('e-pv-mobile-toolbar');
        var template = '<button id="' + this.pdfViewer.element.id + '_more_option" class="e-tbar-btn"></button>';
        this.toolbar = new tool({
            items: [{ prefixIcon: 'e-pv-open-document-icon e-pv-icon', tooltipText: this.pdfViewer.localeObj.getConstant('Open'), id: this.pdfViewer.element.id + '_open' },
                { type: 'Separator', align: 'Left' },
                { prefixIcon: 'e-pv-undo-icon e-pv-icon', tooltipText: this.pdfViewer.localeObj.getConstant('Undo'), id: this.pdfViewer.element.id + '_undo' },
                { prefixIcon: 'e-pv-redo-icon e-pv-icon', tooltipText: this.pdfViewer.localeObj.getConstant('Redo'), id: this.pdfViewer.element.id + '_redo' },
                {
                    tooltipText: 'Organize PDF', id: this.pdfViewer.element.id + '_menu_organize',
                    prefixIcon: 'e-pv-organize-view-icon e-pv-icon', align: 'Right',
                    disabled: true
                },
                { prefixIcon: 'e-pv-annotation-icon e-pv-icon', cssClass: 'e-pv-annotation-container', tooltipText: this.pdfViewer.localeObj.getConstant('Annotation'), id: this.pdfViewer.element.id + '_annotation', align: 'Right' },
                { prefixIcon: 'e-pv-text-search-icon e-pv-icon', tooltipText: this.pdfViewer.localeObj.getConstant('Text Search'), id: this.pdfViewer.element.id + '_search', align: 'Right' },
                { template: template, align: 'Right' }
            ], clicked: this.toolbarClickHandler, width: '', height: '', overflowMode: 'Popup'
        });
        this.toolbar.isStringTemplate = true;
        this.toolbar.appendTo(this.toolbarElement);
        this.openDocumentItem = this.pdfViewerBase.getElement('_open');
        this.openDocumentItem.classList.add('e-pv-open-document');
        this.openDocumentItem.firstElementChild.id = this.pdfViewer.element.id + '_openIcon';
        this.annotationItem = this.pdfViewerBase.getElement('_annotation');
        this.annotationItem.classList.add('e-pv-annotation');
        this.annotationItem.firstElementChild.id = this.pdfViewer.element.id + '_annotationIcon';
        this.organizePageItem = this.pdfViewerBase.getElement('_menu_organize');
        this.organizePageItem.classList.add('e-pv-organize-view');
        this.annotationItem.firstElementChild.id = this.pdfViewer.element.id + '_organize-view' + '_icon';
        this.textSearchItem = this.pdfViewerBase.getElement('_search');
        this.textSearchItem.classList.add('e-pv-text-search');
        this.textSearchItem.firstElementChild.id = this.pdfViewer.element.id + '_searchIcon';
        this.undoItem = this.pdfViewerBase.getElement('_undo');
        this.undoItem.classList.add('e-pv-undo');
        this.redoItem = this.pdfViewerBase.getElement('_redo');
        this.redoItem.classList.add('e-pv-redo');
        this.redoItem.firstElementChild.id = this.pdfViewer.element.id + '_redoIcon';
        this.undoItem.firstElementChild.id = this.pdfViewer.element.id + '_undoIcon';
        this.createMoreOption(this.pdfViewer.element.id + '_more_option');
    };
    Toolbar.prototype.createMoreOption = function (idString) {
        var _this = this;
        this.moreOptionItem = document.getElementById(idString);
        var items = [
            {
                text: this.pdfViewer.localeObj.getConstant('Download'), id: this.pdfViewer.element.id + '_menu_download',
                iconCss: 'e-icons e-pv-download-document-icon e-pv-icon'
            },
            {
                text: this.pdfViewer.localeObj.getConstant('Bookmarks'), id: this.pdfViewer.element.id + '_menu_bookmarks',
                iconCss: 'e-icons e-pv-bookmark-icon e-pv-icon'
            }
        ];
        this.moreDropDown = new DropDownButton({
            items: items, iconCss: 'e-pv-more-icon e-pv-icon', cssClass: 'e-caret-hide',
            open: function (args) {
                var dropdownButtonPosition = _this.moreDropDown.element.getBoundingClientRect();
                if (!_this.pdfViewer.enableRtl) {
                    args.element.parentElement.style.left = dropdownButtonPosition.left + dropdownButtonPosition.width - args.element.parentElement.offsetWidth + 'px';
                }
            }, select: function (args) {
                switch (args.item.id) {
                    case _this.pdfViewer.element.id + '_menu_download':
                        _this.pdfViewerBase.download();
                        break;
                    case _this.pdfViewer.element.id + '_menu_bookmarks':
                        _this.showToolbar(false);
                        _this.pdfViewerBase.navigationPane.createNavigationPaneMobile('bookmarks');
                        break;
                    default:
                        break;
                }
            }, beforeItemRender: function (args) {
                if (args.item.id === _this.pdfViewer.element.id + '_menu_bookmarks') {
                    if (!_this.pdfViewer.bookmarkViewModule || !_this.pdfViewer.bookmarkViewModule.bookmarks) {
                        args.element.classList.add('e-disabled');
                    }
                    else {
                        args.element.classList.remove('e-disabled');
                    }
                }
                else if (args.item.id === _this.pdfViewer.element.id + '_menu_download') {
                    if (!_this.pdfViewer.enableDownload) {
                        args.element.classList.add('e-disabled');
                    }
                    else {
                        args.element.classList.remove('e-disabled');
                    }
                }
            }, close: function (args) {
                _this.moreOptionItem.blur();
                _this.pdfViewerBase.focusViewerContainer();
            }
        });
        this.moreDropDown.appendTo('#' + idString);
    };
    Toolbar.prototype.createToolbarItem = function (elementName, id, className) {
        var toolbarItem = createElement(elementName, { id: id });
        if (className !== null) {
            toolbarItem.className = className;
        }
        if (elementName === 'input' && id !== this.pdfViewer.element.id + '_zoomDropDown') {
            toolbarItem.type = 'text';
        }
        return toolbarItem;
    };
    /**
     * @param {HTMLElement} toolbarItem - It describes about the toolbar item
     * @param {string} tooltipText - It describes about the tooltip text
     * @private
     * @returns {void}
     */
    Toolbar.prototype.createTooltip = function (toolbarItem, tooltipText) {
        if (tooltipText !== null) {
            var tooltip = new Tooltip({
                content: initializeCSPTemplate(function () { return tooltipText; }), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
            });
            tooltip.appendTo(toolbarItem);
        }
    };
    Toolbar.prototype.onTooltipBeforeOpen = function (args) {
        if (!this.pdfViewer.toolbarSettings.showTooltip && this.toolbarElement.contains(args.target)) {
            args.cancel = true;
        }
        if (this.annotationToolbarModule) {
            if (!this.pdfViewer.toolbarSettings.showTooltip && ((this.annotationToolbarModule.toolbarElement &&
                this.annotationToolbarModule.toolbarElement.contains(args.target)) ||
                (this.annotationToolbarModule.shapeToolbarElement &&
                    this.annotationToolbarModule.shapeToolbarElement.contains(args.target)))) {
                args.cancel = true;
            }
        }
        if (this.formDesignerToolbarModule) {
            if (!this.pdfViewer.toolbarSettings.showTooltip && (this.formDesignerToolbarModule.toolbarElement &&
                this.formDesignerToolbarModule.toolbarElement.contains(args.target))) {
                args.cancel = true;
            }
        }
    };
    Toolbar.prototype.createFileElement = function (toolbarElement) {
        if (toolbarElement) {
            if (!isBlazor()) {
                this.fileInputElement = createElement('input', { id: this.pdfViewer.element.id + '_fileUploadElement', styles: 'position:fixed; left:-100em', attrs: { 'type': 'file' } });
                this.fileInputElement.setAttribute('accept', '.pdf');
                this.fileInputElement.setAttribute('aria-label', 'file upload element');
                this.fileInputElement.setAttribute('tabindex', '-1');
            }
            else {
                this.fileInputElement = this.pdfViewer.element.querySelector('.e-pv-fileupload-element');
            }
            if (toolbarElement) {
                toolbarElement.appendChild(this.fileInputElement);
            }
        }
    };
    Toolbar.prototype.wireEvent = function () {
        if (this.fileInputElement) {
            this.fileInputElement.addEventListener('change', this.loadDocument);
        }
        if (!isBlazor()) {
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.toolbarElement.addEventListener('mouseup', this.toolbarOnMouseup.bind(this));
                this.currentPageBoxElement.addEventListener('focusout', this.textBoxFocusOut);
                this.currentPageBoxElement.addEventListener('keypress', this.navigateToPage);
                this.zoomDropDown.change = this.zoomPercentSelect.bind(this);
                this.zoomDropDown.element.addEventListener('keypress', this.onZoomDropDownInput.bind(this));
                this.zoomDropDown.element.addEventListener('click', this.onZoomDropDownInputClick.bind(this));
            }
        }
    };
    Toolbar.prototype.unWireEvent = function () {
        if (this.fileInputElement) {
            this.fileInputElement.removeEventListener('change', this.loadDocument);
        }
        if ((!Browser.isDevice || this.pdfViewer.enableDesktopMode) && !isBlazor()) {
            if (!isNullOrUndefined(this.toolbarElement)) {
                this.toolbarElement.removeEventListener('mouseup', this.toolbarOnMouseup.bind(this));
            }
            if (!isNullOrUndefined(this.currentPageBoxElement)) {
                this.currentPageBoxElement.removeEventListener('focusout', this.textBoxFocusOut);
                this.currentPageBoxElement.removeEventListener('keypress', this.navigateToPage);
            }
            if (!isNullOrUndefined(this.zoomDropDown)) {
                this.zoomDropDown.removeEventListener('change', this.zoomPercentSelect);
                this.zoomDropDown.element.removeEventListener('keypress', this.onZoomDropDownInput);
                this.zoomDropDown.element.removeEventListener('click', this.onZoomDropDownInputClick);
            }
        }
    };
    /**
     * @param {number} viewerWidth - It describes about the viewer width
     * @private
     * @returns {void}
     */
    Toolbar.prototype.onToolbarResize = function (viewerWidth) {
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.pdfViewerBase.navigationPane.toolbarResize();
        }
        else {
            if (!isNullOrUndefined(this.toolbar)) {
                this.toolbar.refreshOverflow();
            }
        }
    };
    Toolbar.prototype.toolbarOnMouseup = function (event) {
        if (event.target === this.itemsContainer || event.target === this.toolbarElement) {
            this.pdfViewerBase.focusViewerContainer();
        }
    };
    Toolbar.prototype.applyHideToToolbar = function (show, startIndex, endIndex) {
        var isHide = !show;
        for (var index = startIndex; index <= endIndex; index++) {
            if (!isNullOrUndefined(this.toolbar) && this.toolbar.items[parseInt(index.toString(), 10)]) {
                var className = this.toolbar.items[parseInt(index.toString(), 10)].cssClass;
                if (className && className !== '') {
                    // Querying the toolbar item
                    var element = this.toolbar.element.querySelector('.' + className);
                    if (element) {
                        this.toolbar.hideItem(element, isHide);
                    }
                }
                else {
                    this.toolbar.hideItem(index, isHide);
                }
            }
        }
    };
    Toolbar.prototype.handleOpenIconClick = function (args, isKeyBoardEvent) {
        this.fileInputElement.click();
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && !isKeyBoardEvent) {
            if (!isBlazor()) {
                args.originalEvent.target.blur();
            }
            this.pdfViewerBase.focusViewerContainer();
        }
    };
    Toolbar.prototype.handleToolbarBtnClick = function (args, isKeyBoardEvent) {
        this.addInkAnnotation();
        this.deSelectCommentAnnotation();
        switch (args.originalEvent.target.id || (!isNullOrUndefined(args.item) &&
            args.item.id)) {
            case this.pdfViewer.element.id + '_open':
            case this.pdfViewer.element.id + '_openIcon':
            case this.pdfViewer.element.id + '_openText':
                this.handleOpenIconClick(args, isKeyBoardEvent);
                break;
            case this.pdfViewer.element.id + '_download':
            case this.pdfViewer.element.id + '_downloadIcon':
            case this.pdfViewer.element.id + '_downloadText':
                this.pdfViewerBase.download();
                break;
            case this.pdfViewer.element.id + '_print':
            case this.pdfViewer.element.id + '_printIcon':
            case this.pdfViewer.element.id + '_printText':
                if (this.pdfViewer.printModule) {
                    this.pdfViewer.firePrintStart();
                }
                break;
            case this.pdfViewer.element.id + '_undo':
            case this.pdfViewer.element.id + '_undoIcon':
            case this.pdfViewer.element.id + '_undoText':
                if (this.pdfViewer.annotationModule) {
                    this.pdfViewer.annotationModule.undo();
                }
                break;
            case this.pdfViewer.element.id + '_redo':
            case this.pdfViewer.element.id + '_redoIcon':
            case this.pdfViewer.element.id + '_redoText':
                if (this.pdfViewer.annotationModule) {
                    this.pdfViewer.annotationModule.redo();
                }
                break;
            case this.pdfViewer.element.id + '_firstPage':
            case this.pdfViewer.element.id + '_firstPageIcon':
            case this.pdfViewer.element.id + '_firstPageText':
                if (this.pdfViewer.navigationModule) {
                    this.pdfViewer.navigationModule.goToFirstPage();
                }
                break;
            case this.pdfViewer.element.id + '_previousPage':
            case this.pdfViewer.element.id + '_previousPageIcon':
            case this.pdfViewer.element.id + '_previousPageText':
                if (this.pdfViewer.navigationModule) {
                    this.pdfViewer.navigationModule.goToPreviousPage();
                }
                break;
            case this.pdfViewer.element.id + '_nextPage':
            case this.pdfViewer.element.id + '_nextPageIcon':
            case this.pdfViewer.element.id + '_nextPageText':
                if (this.pdfViewer.navigationModule) {
                    this.pdfViewer.navigationModule.goToNextPage();
                }
                break;
            case this.pdfViewer.element.id + '_lastPage':
            case this.pdfViewer.element.id + '_lastPageIcon':
            case this.pdfViewer.element.id + '_lastPageText':
                if (this.pdfViewer.navigationModule) {
                    this.pdfViewer.navigationModule.goToLastPage();
                }
                break;
            case this.pdfViewer.element.id + '_zoomIn':
            case this.pdfViewer.element.id + '_zoomInIcon':
            case this.pdfViewer.element.id + '_zoomInText':
                this.pdfViewer.magnificationModule.zoomIn();
                break;
            case this.pdfViewer.element.id + '_zoomOut':
            case this.pdfViewer.element.id + '_zoomOutIcon':
            case this.pdfViewer.element.id + '_zoomOutText':
                this.pdfViewer.magnificationModule.zoomOut();
                break;
            case this.pdfViewer.element.id + '_selectTool':
            case this.pdfViewer.element.id + '_selectToolIcon':
            case this.pdfViewer.element.id + '_selectToolText':
                if (!this.isSelectionToolDisabled) {
                    this.pdfViewerBase.initiateTextSelectMode();
                    this.updateInteractionTools(true);
                }
                break;
            case this.pdfViewer.element.id + '_handTool':
            case this.pdfViewer.element.id + '_handToolIcon':
            case this.pdfViewer.element.id + '_handToolText':
                if (!(this.isScrollingToolDisabled || this.getStampMode())) {
                    this.pdfViewerBase.initiatePanning();
                    this.updateInteractionTools(false);
                }
                break;
            case this.pdfViewer.element.id + '_search':
            case this.pdfViewer.element.id + '_searchIcon':
            case this.pdfViewer.element.id + '_searchText':
                this.textSearchButtonHandler();
                break;
            case this.pdfViewer.element.id + '_annotation':
            case this.pdfViewer.element.id + '_annotationIcon':
            case this.pdfViewer.element.id + '_annotationText':
                this.initiateAnnotationMode(args.originalEvent.target.id, isKeyBoardEvent);
                break;
            case this.pdfViewer.element.id + '_formdesigner':
            case this.pdfViewer.element.id + '_formdesignerIcon':
            case this.pdfViewer.element.id + '_formdesignerText':
                this.initiateFormDesignerMode(isKeyBoardEvent);
                this.formDesignerToolbarModule.showHideDeleteIcon(false);
                break;
            case this.pdfViewer.element.id + '_comment':
            case this.pdfViewer.element.id + '_commentIcon':
            case this.pdfViewer.element.id + '_commentText':
                this.pdfViewerBase.isAddComment = true;
                this.pdfViewerBase.isCommentIconAdded = true;
                this.annotationToolbarModule.deselectAllItems();
                this.pdfViewer.annotation.triggerAnnotationUnselectEvent();
                this.pdfViewer.annotation.triggerSignatureUnselectEvent();
                this.addComments(args.originalEvent.target);
                break;
            case this.pdfViewer.element.id + '_submitForm':
            case this.pdfViewer.element.id + '_submitFormSpan': {
                var data = void 0;
                this.pdfViewerBase.exportFormFields(data, FormFieldDataFormat.Json);
                break;
            }
            case this.pdfViewer.element.id + '_menu_organize':
                if (!isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
                    this.pdfViewer.pageOrganizer.createOrganizeWindowForMobile();
                }
                break;
            default:
                this.pdfViewer.fireCustomToolbarClickEvent(args);
                break;
        }
    };
    Toolbar.prototype.addInkAnnotation = function () {
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.inkAnnotationModule) {
            var currentPageNumber = parseInt(this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber, 10);
            this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
        }
        if (this.annotationToolbarModule) {
            this.pdfViewer.toolbar.annotationToolbarModule.deselectInkAnnotation();
            this.annotationToolbarModule.inkAnnotationSelected = false;
        }
    };
    Toolbar.prototype.deSelectCommentAnnotation = function () {
        if (!isBlazor()) {
            this.pdfViewer.toolbar.deSelectItem(this.commentItem);
        }
        else {
            this.pdfViewer.toolbar.deSelectItem(this.CommentElement);
        }
        this.pdfViewerBase.isCommentIconAdded = false;
    };
    /**
     * @param {any} targetElement - It describes about the target element
     * @private
     * @returns {void}
     */
    Toolbar.prototype.addComments = function (targetElement) {
        if (!isBlazor()) {
            if (targetElement.id === this.pdfViewer.element.id + '_comment' || targetElement.id === this.pdfViewer.element.id + '_commentIcon' || targetElement.id === this.pdfViewer.element.id + '_commentText') {
                if ((targetElement.id === this.pdfViewer.element.id + '_commentIcon' || targetElement.id === this.pdfViewer.element.id + '_commentText') && targetElement.parentElement) {
                    targetElement.parentElement.classList.add('e-pv-select');
                }
                else {
                    targetElement.classList.add('e-pv-select');
                }
            }
            else {
                if (this.pdfViewer.enableRtl) {
                    targetElement.className = 'e-pv-comment-selection-icon e-pv-icon e-icon-left e-right';
                }
                else {
                    targetElement.className = 'e-pv-comment-selection-icon e-pv-icon e-icon-left';
                }
            }
        }
        else {
            this.pdfViewerBase.isCommentIconAdded = true;
            this.pdfViewerBase.isAddComment = true;
            this.annotationToolbarModule.deselectAllItemsInBlazor();
            var commentsButton = this.CommentElement;
            commentsButton.classList.add('e-pv-select');
        }
        this.updateStampItems();
        document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + (this.pdfViewerBase.currentPageNumber - 1)).addEventListener('mousedown', this.pdfViewer.annotationModule.stickyNotesAnnotationModule.drawIcons.bind(this));
    };
    Toolbar.prototype.openZoomDropdown = function () {
        // eslint-disable-next-line
        var toolbarData = this;
        if (document.fullscreen) {
            if (isBlazor()) {
                var fullscreenElement = document.fullscreenElement;
                if (fullscreenElement && fullscreenElement.tagName !== 'BODY' && fullscreenElement.tagName !== 'HTML') {
                    setTimeout(function () {
                        var popupElement = document.getElementById(toolbarData.pdfViewer.element.id + '_zoomCombo_popup');
                        var targetElement = document.getElementById(toolbarData.toolbarElement.id);
                        if (popupElement && targetElement && popupElement.ej2_instances) {
                            targetElement.appendChild(popupElement);
                            popupElement.ej2_instances[0].refreshPosition();
                        }
                    }, 100);
                }
            }
            else {
                var popupElement = document.getElementById(this.pdfViewer.element.id + '_zoomDropDown_popup');
                var targetElement = document.getElementById(this.toolbarElement.id);
                if (popupElement) {
                    targetElement.appendChild(popupElement);
                }
            }
        }
    };
    Toolbar.prototype.onZoomDropDownInput = function (event) {
        if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 13 && event.which !== 32) {
            event.preventDefault();
            return false;
        }
        else {
            if (event.which === 13) {
                event.preventDefault();
                var value = this.zoomDropDown.element.value.trim();
                this.zoomDropDownChange(value);
            }
            return true;
        }
    };
    Toolbar.prototype.onZoomDropDownInputClick = function () {
        this.zoomDropDown.element.select();
    };
    Toolbar.prototype.zoomPercentSelect = function (args) {
        if (this.pdfViewerBase.pageCount > 0) {
            if (args.isInteracted) {
                if (args.itemData) {
                    var zoomText = args.itemData.percent;
                    this.zoomDropDownChange(zoomText);
                }
            }
            else {
                this.updateZoomPercentage(this.pdfViewer.magnificationModule.zoomFactor);
            }
        }
    };
    Toolbar.prototype.zoomDropDownChange = function (zoomText) {
        if (zoomText !== this.pdfViewer.localeObj.getConstant('Fit Width') && zoomText !== this.pdfViewer.localeObj.getConstant('Fit Page') && zoomText !== this.pdfViewer.localeObj.getConstant('Automatic')) {
            this.pdfViewer.magnificationModule.isAutoZoom = false;
            this.pdfViewerBase.previousScrollbarWidth = this.pdfViewerBase.navigationPane.getViewerContainerScrollbarWidth();
            this.pdfViewer.magnificationModule.zoomTo(parseFloat(zoomText));
            this.updateZoomPercentage(this.pdfViewer.magnificationModule.zoomFactor);
            this.zoomDropDown.focusOut();
        }
        else if (zoomText === this.pdfViewer.localeObj.getConstant('Fit Width')) {
            this.pdfViewer.magnificationModule.isAutoZoom = false;
            this.pdfViewer.magnificationModule.fitToWidth();
            this.zoomDropDown.focusOut();
        }
        else if (zoomText === this.pdfViewer.localeObj.getConstant('Fit Page')) {
            this.pdfViewer.magnificationModule.fitToPage();
            this.zoomDropDown.focusOut();
        }
        else if (zoomText === this.pdfViewer.localeObj.getConstant('Automatic')) {
            this.pdfViewer.magnificationModule.isAutoZoom = true;
            this.pdfViewer.magnificationModule.fitToAuto();
            this.zoomDropDown.focusOut();
        }
    };
    /**
     * @param {number} zoomFactor - It describes about the zoom factor
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateZoomPercentage = function (zoomFactor) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            var currentPercent = parseInt((zoomFactor * 100).toString(), 10) + '%';
            if (isBlazor()) {
                var blazorZoomDropDown = this.pdfViewerBase.getElement('_zoomDropDown');
                if (blazorZoomDropDown && blazorZoomDropDown.children.length > 0) {
                    blazorZoomDropDown.children[0].children[0].value = currentPercent;
                }
            }
            else if (!isNullOrUndefined(this.zoomDropDown)) {
                if (this.zoomDropDown.text === currentPercent) {
                    this.zoomDropDown.element.value = currentPercent;
                }
                if (this.zoomDropDown.index === 11) {
                    this.zoomDropDown.value = 4;
                }
                if (zoomFactor <= 0.25) {
                    this.pdfViewerBase.isMinimumZoom = true;
                }
                else {
                    this.pdfViewerBase.isMinimumZoom = false;
                }
                this.zoomDropDown.text = currentPercent;
            }
        }
    };
    Toolbar.prototype.updateInteractionItems = function () {
        if (this.pdfViewer.textSelectionModule) {
            if (this.pdfViewer.enableTextSelection) {
                this.enableItems(this.textSelectItem.parentElement, true);
            }
            else {
                this.enableItems(this.textSelectItem.parentElement, false);
            }
        }
        else {
            this.enableItems(this.textSelectItem.parentElement, false);
        }
        this.enableItems(this.panItem.parentElement, true);
        if (this.pdfViewer.interactionMode === 'TextSelection' && this.pdfViewer.enableTextSelection) {
            this.selectItem(this.textSelectItem);
            this.textSelectItem.setAttribute('tabindex', '-1');
            this.deSelectItem(this.panItem);
            this.panItem.setAttribute('tabindex', '0');
        }
        else {
            this.selectItem(this.panItem);
            this.panItem.setAttribute('tabindex', '-1');
            this.deSelectItem(this.textSelectItem);
            this.textSelectItem.setAttribute('tabindex', '0');
            this.pdfViewerBase.initiatePanning();
        }
    };
    /**
     * @param {boolean} iskeyboardClick - It describes about the iskeyboardclick boolean value
     * @private
     * @returns {void}
     */
    Toolbar.prototype.textSearchButtonHandler = function (iskeyboardClick) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (this.pdfViewer.textSearchModule && this.pdfViewerBase.pageCount > 0) {
                this.isTextSearchBoxDisplayed = !this.isTextSearchBoxDisplayed;
                this.pdfViewer.textSearchModule.showSearchBox(this.isTextSearchBoxDisplayed);
                if (this.isTextSearchBoxDisplayed) {
                    if (!isBlazor()) {
                        this.selectItem(this.textSearchItem);
                        this.textSearchItem.setAttribute('tabindex', '0');
                    }
                    var searchInputElement = document.getElementById(this.pdfViewer.element.id + '_search_input');
                    searchInputElement.select();
                    searchInputElement.focus();
                }
                else {
                    if (!isBlazor()) {
                        this.deSelectItem(this.textSearchItem);
                        this.textSearchItem.blur();
                    }
                    else {
                        var searchItem = this.pdfViewerBase.getElement('_search');
                        if (iskeyboardClick) {
                            searchItem.firstElementChild.focus();
                        }
                        else {
                            searchItem.firstElementChild.blur();
                            this.pdfViewerBase.focusViewerContainer();
                        }
                    }
                }
            }
        }
        else {
            this.showToolbar(false);
            this.pdfViewerBase.navigationPane.createNavigationPaneMobile('search');
        }
    };
    /**
     * @param {string} id - It describes about the id value
     * @param {boolean} isKeyBoardEvent - It describes about the whether isKeyBoardEvent true or not
     * @private
     * @returns {void}
     */
    Toolbar.prototype.initiateAnnotationMode = function (id, isKeyBoardEvent) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (this.annotationToolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                this.annotationToolbarModule.showAnnotationToolbar(this.annotationItem);
                this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.refreshOverflow();
                if (isKeyBoardEvent || this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.items.length > 0) {
                    document.getElementById(this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.items[0].id).focus();
                }
                if (this.pdfViewer.isAnnotationToolbarVisible && this.pdfViewer.isFormDesignerToolbarVisible) {
                    var formDesignerMainDiv = document.getElementById(this.pdfViewer.element.id + '_formdesigner_toolbar');
                    formDesignerMainDiv.style.display = 'none';
                    this.formDesignerToolbarModule.isToolbarHidden = false;
                    this.formDesignerToolbarModule.showFormDesignerToolbar(this.formDesignerItem);
                    this.annotationToolbarModule.adjustViewer(true);
                }
            }
        }
        else {
            if (!isBlazor()) {
                if (id === this.pdfViewer.element.id + '_annotation') {
                    id = this.pdfViewer.element.id + '_annotationIcon';
                }
                this.annotationToolbarModule.createAnnotationToolbarForMobile(id);
            }
        }
    };
    Toolbar.prototype.initiateFormDesignerMode = function (isKeyBoardEvent) {
        if (this.formDesignerToolbarModule && this.pdfViewer.enableFormDesignerToolbar) {
            this.formDesignerToolbarModule.showFormDesignerToolbar(this.formDesignerItem);
            if (this.pdfViewer.isAnnotationToolbarVisible && this.pdfViewer.isFormDesignerToolbarVisible) {
                var annotationMainDiv = document.getElementById(this.pdfViewer.element.id + '_annotation_toolbar');
                annotationMainDiv.style.display = 'none';
                var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                if (!isNullOrUndefined(commentPanel) && !isNullOrUndefined(this.pdfViewerBase.navigationPane)) {
                    if (commentPanel.style.display === 'block') {
                        this.pdfViewerBase.navigationPane.closeCommentPanelContainer();
                    }
                }
                this.annotationToolbarModule.isToolbarHidden = false;
                this.annotationToolbarModule.showAnnotationToolbar(this.annotationItem);
                this.formDesignerToolbarModule.adjustViewer(true);
            }
            if (isKeyBoardEvent && this.pdfViewer.toolbarModule.formDesignerToolbarModule.toolbar.items.length > 0) {
                document.getElementById(this.pdfViewer.toolbarModule.formDesignerToolbarModule.toolbar.items[0].id).focus();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.DisableInteractionTools = function () {
        this.deSelectItem(this.textSelectItem);
        this.deSelectItem(this.panItem);
    };
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @private
     * @returns {void}
     */
    Toolbar.prototype.selectItem = function (element) {
        if (element) {
            element.classList.add('e-pv-select');
        }
    };
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @private
     * @returns {void}
     */
    Toolbar.prototype.deSelectItem = function (element) {
        if (element) {
            element.classList.remove('e-pv-select');
        }
    };
    /**
     * @param {boolean} isTextSelect - It describes about the isTextSelect boolean value
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateInteractionTools = function (isTextSelect) {
        var isBlazorPlatform = isBlazor();
        if (isTextSelect) {
            if (isBlazorPlatform) {
                this.selectItem(this.SelectToolElement);
                this.deSelectItem(this.PanElement);
            }
            else {
                this.selectItem(this.textSelectItem);
                if (!isNullOrUndefined(this.textSelectItem)) {
                    this.textSelectItem.setAttribute('tabindex', '-1');
                }
                this.deSelectItem(this.panItem);
                if (!isNullOrUndefined(this.panItem)) {
                    this.panItem.setAttribute('tabindex', '0');
                }
            }
        }
        else {
            if (isBlazorPlatform) {
                this.selectItem(this.PanElement);
                this.deSelectItem(this.SelectToolElement);
            }
            else {
                this.selectItem(this.panItem);
                if (!isNullOrUndefined(this.panItem)) {
                    this.panItem.setAttribute('tabindex', '-1');
                }
                this.deSelectItem(this.textSelectItem);
                if (!isNullOrUndefined(this.textSelectItem)) {
                    this.textSelectItem.setAttribute('tabindex', '0');
                }
            }
        }
    };
    Toolbar.prototype.initialEnableItems = function () {
        if (this.pdfViewer.enableToolbar) {
            this.showToolbar(true);
        }
        else {
            this.showToolbar(false);
        }
        if (this.pdfViewer.enableNavigationToolbar) {
            this.showNavigationToolbar(true);
        }
        else {
            this.showNavigationToolbar(false);
        }
        if (this.pdfViewer.pageOrganizer) {
            this.showPageOrganizerToolbar(true);
        }
        else {
            this.showPageOrganizerToolbar(false);
        }
        if (!isBlazor()) {
            if (this.isPrintBtnVisible) {
                this.showPrintOption(true);
            }
            else {
                this.showPrintOption(false);
            }
            if (this.isDownloadBtnVisible) {
                this.showDownloadOption(true);
            }
            else {
                this.showDownloadOption(false);
            }
            if (this.isSearchBtnVisible) {
                this.showSearchOption(true);
            }
            else {
                this.showSearchOption(false);
            }
            if (this.isCommentBtnVisible) {
                this.showCommentOption(true);
            }
            else {
                this.showCommentOption(false);
            }
        }
    };
    Toolbar.prototype.showSeparator = function (toolbarItems) {
        if (!this.isOpenBtnVisible || (!this.isNavigationToolVisible && !this.isMagnificationToolVisible &&
            !this.isSelectionBtnVisible && !this.isScrollingBtnVisible && !this.isUndoRedoBtnsVisible)) {
            //For mobile devices, the default previous value has been passed as (1,1).
            this.applyHideToToolbar(false, !isNullOrUndefined(this.itemsIndexArray[0]) ? this.itemsIndexArray[0].endIndex + 1 : 1, !isNullOrUndefined(this.itemsIndexArray[0]) ? this.itemsIndexArray[0].endIndex + 1 : 1);
        }
        if (((!this.isNavigationToolVisible && !this.isMagnificationToolVisible) && !this.isOpenBtnVisible) ||
            (this.isOpenBtnVisible && !this.isNavigationToolVisible) ||
            ((!this.isOpenBtnVisible && !this.isNavigationToolVisible) || (!this.isMagnificationToolVisible &&
                !this.isScrollingBtnVisible && !this.isSelectionBtnVisible))) {
            //For mobile devices, the default previous value has been passed as (8,8).
            this.applyHideToToolbar(false, !isNullOrUndefined(this.itemsIndexArray[1]) ? this.itemsIndexArray[1].endIndex + 1 : 8, !isNullOrUndefined(this.itemsIndexArray[1]) ? this.itemsIndexArray[1].endIndex + 1 : 8);
        }
        if ((!this.isMagnificationToolVisible && !this.isSelectionBtnVisible && !this.isScrollingBtnVisible) ||
            (this.isMagnificationToolVisible && (!this.isSelectionBtnVisible && !this.isScrollingBtnVisible)) ||
            (!this.isMagnificationToolVisible && (this.isSelectionBtnVisible || this.isScrollingBtnVisible))) {
            //For mobile devices, the default previous value has been passed as (12,12).
            this.applyHideToToolbar(false, !isNullOrUndefined(this.itemsIndexArray[2]) ?
                this.itemsIndexArray[2].endIndex + 1 : 12, !isNullOrUndefined(this.itemsIndexArray[2]) ?
                this.itemsIndexArray[2].endIndex + 1 : 12);
        }
        if (((!this.isMagnificationToolVisible && !this.isNavigationToolVisible && !this.isScrollingBtnVisible
            && !this.isSelectionBtnVisible) && this.isUndoRedoBtnsVisible || !this.isUndoRedoBtnsVisible)) {
            //For mobile devices, the default previous value has been passed as (15,15).
            this.applyHideToToolbar(false, !isNullOrUndefined(this.itemsIndexArray[4]) ?
                this.itemsIndexArray[4].endIndex + 1 : 15, !isNullOrUndefined(this.itemsIndexArray[4]) ?
                this.itemsIndexArray[4].endIndex + 1 : 15);
        }
        if ((!this.isUndoRedoBtnsVisible || (this.isUndoRedoBtnsVisible && !this.isCommentBtnVisible &&
            !this.isSubmitbtnvisible)) && (!isNullOrUndefined(this.itemsIndexArray[5]))) {
            this.applyHideToToolbar(false, this.itemsIndexArray[5].endIndex + 1, this.itemsIndexArray[5].endIndex + 1);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.applyToolbarSettings = function () {
        var toolbarSettingsItems = this.pdfViewer.toolbarSettings.toolbarItems;
        if (toolbarSettingsItems) {
            if (toolbarSettingsItems.indexOf('OpenOption') !== -1) {
                this.showOpenOption(true);
            }
            else {
                this.showOpenOption(false);
            }
            if (toolbarSettingsItems.indexOf('PageNavigationTool') !== -1) {
                this.showPageNavigationTool(true);
            }
            else {
                this.showPageNavigationTool(false);
            }
            if (toolbarSettingsItems.indexOf('MagnificationTool') !== -1) {
                this.showMagnificationTool(true);
            }
            else {
                this.showMagnificationTool(false);
            }
            if (toolbarSettingsItems.indexOf('SelectionTool') !== -1) {
                this.showSelectionTool(true);
            }
            else {
                this.showSelectionTool(false);
            }
            if (toolbarSettingsItems.indexOf('PanTool') !== -1) {
                this.showScrollingTool(true);
            }
            else {
                this.showScrollingTool(false);
            }
            if (toolbarSettingsItems.indexOf('PrintOption') !== -1) {
                this.showPrintOption(true);
            }
            else {
                this.showPrintOption(false);
            }
            if (toolbarSettingsItems.indexOf('DownloadOption') !== -1) {
                this.showDownloadOption(true);
            }
            else {
                this.showDownloadOption(false);
            }
            if (toolbarSettingsItems.indexOf('SearchOption') !== -1) {
                this.showSearchOption(true);
            }
            else {
                this.showSearchOption(false);
            }
            if (toolbarSettingsItems.indexOf('UndoRedoTool') !== -1) {
                this.showUndoRedoTool(true);
            }
            else {
                this.showUndoRedoTool(false);
            }
            if (toolbarSettingsItems.indexOf('AnnotationEditTool') !== -1) {
                this.showAnnotationEditTool(true);
            }
            else {
                this.showAnnotationEditTool(false);
            }
            if (toolbarSettingsItems.indexOf('FormDesignerEditTool') !== -1) {
                this.showFormDesignerEditTool(true);
            }
            else {
                this.showFormDesignerEditTool(false);
            }
            if (toolbarSettingsItems.indexOf('CommentTool') !== -1) {
                this.showCommentOption(true);
            }
            else {
                this.showCommentOption(false);
            }
            if (toolbarSettingsItems.indexOf('SubmitForm') !== -1) {
                this.showSubmitForm(true);
            }
            else {
                this.showSubmitForm(false);
            }
            this.showSeparator(toolbarSettingsItems);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.applyToolbarSettingsForMobile = function () {
        var toolbarSettingsItems = this.pdfViewer.toolbarSettings.toolbarItems;
        if (toolbarSettingsItems) {
            if (toolbarSettingsItems.indexOf('OpenOption') !== -1) {
                this.showOpenOption(true);
            }
            else {
                this.showOpenOption(false);
            }
            if (toolbarSettingsItems.indexOf('UndoRedoTool') !== -1) {
                this.showUndoRedoTool(true);
            }
            else {
                this.showUndoRedoTool(false);
            }
            if (toolbarSettingsItems.indexOf('AnnotationEditTool') !== -1) {
                this.showAnnotationEditTool(true);
            }
            else {
                this.showAnnotationEditTool(false);
            }
            if (toolbarSettingsItems.indexOf('SearchOption') !== -1) {
                this.showSearchOption(true);
            }
            else {
                this.showSearchOption(false);
            }
        }
    };
    Toolbar.prototype.getStampMode = function () {
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.stampAnnotationModule) {
            return this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode;
        }
        else {
            return false;
        }
    };
    Toolbar.prototype.stampBeforeOpen = function (args) {
        this.annotationToolbarModule.resetFreeTextAnnot();
        if (args.ParentItem.Text === '' && this.pdfViewer.customStampSettings.isAddToMenu && args.Items.length > 0) {
            var currentElements = null;
            for (var i = 0; i < args.Items.length; i++) {
                if (args.Items[parseInt(i.toString(), 10)].Text === 'Custom Stamp') {
                    args.Items[parseInt(i.toString(), 10)].Items = [];
                    currentElements = args.Items[parseInt(i.toString(), 10)];
                    break;
                }
            }
            var elements = this.pdfViewerBase.customStampCollection;
            var stampElements = this.pdfViewer.customStampSettings.customStamps;
            if (elements.length === 0 && stampElements && stampElements.length > 0) {
                for (var n = 0; n < stampElements.length; n++) {
                    elements.push({ customStampName: stampElements[parseInt(n.toString(), 10)].customStampName,
                        customStampImageSource: stampElements[parseInt(n.toString(), 10)].customStampImageSource });
                }
            }
            for (var m = 0; m < elements.length; m++) {
                if (currentElements != null) {
                    currentElements.Items.push({ text: elements[parseInt(m.toString(), 10)].customStampName });
                }
            }
        }
    };
    Toolbar.prototype.stampBeforeClose = function (args, showItemOnClick) {
        if ((args.ParentItem && args.ParentItem.Text !== 'Custom Stamp' && args.ParentItem.Text !== 'Standard Business' && args.ParentItem.Text !== 'Dynamic' && args.ParentItem.Text !== 'Sign Here') || !args.ParentItem) {
            showItemOnClick = true;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Toolbar.prototype.updateStampItems = function () {
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.stampAnnotationModule &&
            this.pdfViewer.annotationModule.stampAnnotationModule.isNewStampAnnot) {
            if (this.pdfViewer.selectedItems.annotations[0]) {
                this.pdfViewer.remove(this.pdfViewer.selectedItems.annotations[0]);
                this.pdfViewer.clearSelection(this.pdfViewer.currentPageNumber - 1);
                this.pdfViewer.renderDrawing();
                this.pdfViewerBase.tool = null;
            }
            this.pdfViewerBase.isAlreadyAdded = false;
            this.pdfViewer.annotationModule.stampAnnotationModule.isNewStampAnnot = false;
        }
    };
    Toolbar.prototype.stampSelect = function (args, stampParentID) {
        this.pdfViewerBase.isAlreadyAdded = false;
        this.updateStampItems();
        if (args.Item.Text === 'Custom Stamp') {
            this.annotationToolbarModule.checkStampAnnotations();
            this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
            var stampImage = createElement('input', { id: this.pdfViewer.element.id + '_stampElement', attrs: { 'type': 'file' } });
            stampImage.setAttribute('accept', '.jpg,.jpeg,.png');
            stampImage.style.position = 'absolute';
            stampImage.style.left = '0px';
            stampImage.style.top = '0px';
            stampImage.style.visibility = 'hidden';
            document.body.appendChild(stampImage);
            stampImage.click();
            stampImage.addEventListener('change', this.annotationToolbarModule.addStampImage);
            document.body.removeChild(stampImage);
        }
        else if (stampParentID === 'Custom Stamp' && args.Item.Text !== '') {
            var elements = this.pdfViewerBase.customStampCollection;
            for (var n = 0; n < elements.length; n++) {
                if (elements[parseInt(n.toString(), 10)].customStampName === args.Item.Text) {
                    this.pdfViewer.annotationModule.stampAnnotationModule.customStampName = args.Item.Text;
                    this.annotationToolbarModule.checkStampAnnotations();
                    this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
                    this.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
                    this.pdfViewerBase.stampAdded = true;
                    this.pdfViewerBase.isAlreadyAdded = true;
                    this.pdfViewer.annotationModule.stampAnnotationModule.
                        createCustomStampAnnotation(elements[parseInt(n.toString(), 10)].customStampImageSource);
                    this.pdfViewerBase.stampAdded = false;
                }
            }
        }
        else if (args.Item.Text !== 'Dynamic' && args.Item.Text !== '' && args.Item.Text !== 'Standard Business' && (stampParentID === 'Sign Here' || args.Item.Text !== 'Sign Here')) {
            this.annotationToolbarModule.checkStampAnnotations();
            this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
            this.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
            this.pdfViewerBase.stampAdded = true;
            if (stampParentID === 'Dynamic') {
                this.pdfViewerBase.isDynamicStamp = true;
                this.pdfViewer.annotationModule.stampAnnotationModule.retrieveDynamicStampAnnotation(args.Item.Text);
            }
            else {
                this.pdfViewerBase.isDynamicStamp = false;
                this.pdfViewer.annotationModule.stampAnnotationModule.retrievestampAnnotation(args.Item.Text);
            }
        }
    };
    Toolbar.prototype.enableItems = function (element, isEnable) {
        this.toolbar.enableItems(element, isEnable);
        if (element && element.id === this.pdfViewer.element.id + '_zoomDropDownContainer') {
            this.pdfViewerBase.getElement('_zoomDropDown').setAttribute('tabindex', isEnable ? '0' : '-1');
            this.pdfViewerBase.getElement('_zoomDropDown').setAttribute('data-tabindex', isEnable ? '0' : '-1');
        }
        else if (element.firstElementChild && element.id !== this.pdfViewer.element.id + '_zoomDropDownContainer') {
            element.firstElementChild.setAttribute('tabindex', isEnable ? '0' : '-1');
            element.firstElementChild.setAttribute('data-tabindex', isEnable ? '0' : '-1');
        }
    };
    /**
     * @private
     * @returns {string} - string
     */
    Toolbar.prototype.getModuleName = function () {
        return 'Toolbar';
    };
    return Toolbar;
}());
export { Toolbar };
