/**
 * The `BlazorUIAdaptor` module is used to handle the UI update of native components.
 *
 * @hidden
 */
var BlazorUiAdaptor = /** @class */ (function () {
    /**
     * Initialize the constructor of blazorUIadapater.
     *
     * @param { PdfViewer } pdfviewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    function BlazorUiAdaptor(pdfviewer, pdfViewerBase) {
        this.pdfViewer = null;
        this.pdfViewerBase = null;
        /**
         * @private
         */
        this.totalPageElement = null;
        this.currentPageBoxElementContainer = null;
        this.currentPageBoxElement = null;
        this.firstPageElement = null;
        this.previousPageElement = null;
        this.nextPageElement = null;
        this.lastPageElement = null;
        this.zommOutElement = null;
        this.zoomInElement = null;
        this.zoomDropDownElement = null;
        this.selectToolElement = null;
        this.handToolElement = null;
        this.undoElement = null;
        this.redoElement = null;
        this.commentElement = null;
        this.submitFormButton = null;
        this.searchElement = null;
        this.annotationElement = null;
        this.printElement = null;
        this.downloadElement = null;
        this.highlightElement = null;
        this.underlineElement = null;
        this.strikeThroughElement = null;
        this.shapeElement = null;
        this.calibrateElement = null;
        this.stampElement = null;
        this.freeTextElement = null;
        this.signatureElement = null;
        this.inkElement = null;
        this.annotationFontSizeInputElement = null;
        this.annotationFontFamilyInputElement = null;
        this.annotationColorElement = null;
        this.annotationStrokeColorElement = null;
        this.annotationThicknessElement = null;
        this.annotationOpacityElement = null;
        this.annotationFontColorElement = null;
        this.annotationFontFamilyElement = null;
        this.annotationFontSizeElement = null;
        this.annotationTextAlignElement = null;
        this.annotationTextColorElement = null;
        this.annotationTextPropertiesElement = null;
        this.annotationDeleteElement = null;
        this.annotationCloseElement = null;
        this.annotationCommentPanelElement = null;
        this.mobileToolbarContainerElement = null;
        this.mobileSearchPreviousOccurenceElement = null;
        this.mobileSearchNextOccurenceElement = null;
        this.cssClass = 'e-overlay';
        this.disableClass = ' e-overlay';
        this.editAnnotationButtonElement = null;
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
        this.findToolbarElements();
    }
    BlazorUiAdaptor.prototype.findToolbarElements = function () {
        this.totalPageElement = this.pdfViewerBase.getElement('_totalPage').children[0];
        this.currentPageBoxElementContainer = this.pdfViewerBase.getElement('_currentPageInput');
        this.currentPageBoxElement = this.pdfViewerBase.getElement('_currentPageInput').children[0].children[0];
        this.firstPageElement = this.pdfViewerBase.getElement('_firstPage');
        this.previousPageElement = this.pdfViewerBase.getElement('_previousPage');
        this.nextPageElement = this.pdfViewerBase.getElement('_nextPage');
        this.lastPageElement = this.pdfViewerBase.getElement('_lastPage');
        this.zommOutElement = this.pdfViewerBase.getElement('_zoomOut');
        this.zoomInElement = this.pdfViewerBase.getElement('_zoomIn');
        this.zoomDropDownElement = this.pdfViewerBase.getElement('_zoomDropDown');
        this.selectToolElement = this.pdfViewerBase.getElement('_selectTool');
        this.handToolElement = this.pdfViewerBase.getElement('_handTool');
        this.undoElement = this.pdfViewerBase.getElement('_undo');
        this.redoElement = this.pdfViewerBase.getElement('_redo');
        this.commentElement = this.pdfViewerBase.getElement('_comment');
        this.submitFormButton = this.pdfViewerBase.getElement('_submitFormButton');
        this.searchElement = this.pdfViewerBase.getElement('_search');
        this.annotationElement = this.pdfViewerBase.getElement('_annotation');
        this.editAnnotationButtonElement = this.annotationElement.children[0];
        this.editAnnotationButtonElement.classList.add('e-pv-tbar-btn');
        this.printElement = this.pdfViewerBase.getElement('_print');
        this.downloadElement = this.pdfViewerBase.getElement('_download');
        this.highlightElement = this.pdfViewerBase.getElement('_highLight');
        this.underlineElement = this.pdfViewerBase.getElement('_underline');
        this.strikeThroughElement = this.pdfViewerBase.getElement('_strikethrough');
        this.shapeElement = this.pdfViewerBase.getElement('_annotation_shapes');
        this.calibrateElement = this.pdfViewerBase.getElement('_annotation_calibrate');
        this.stampElement = this.pdfViewerBase.getElement('_annotation_stamp');
        this.freeTextElement = this.pdfViewerBase.getElement('_annotation_freeTextEdit');
        this.signatureElement = this.pdfViewerBase.getElement('_annotation_signature');
        this.inkElement = this.pdfViewerBase.getElement('_annotation_ink');
        this.annotationFontSizeInputElement = this.pdfViewerBase.getElement('_annotation_fontsize').children[0].children[0];
        this.annotationFontFamilyInputElement = this.pdfViewerBase.getElement('_annotation_fontname').children[0].children[0];
        this.annotationColorElement = this.pdfViewerBase.getElement('_annotation_color');
        this.annotationStrokeColorElement = this.pdfViewerBase.getElement('_annotation_stroke');
        this.annotationThicknessElement = this.pdfViewerBase.getElement('_annotation_thickness');
        this.annotationOpacityElement = this.pdfViewerBase.getElement('_annotation_opacity');
        this.annotationFontColorElement = this.pdfViewerBase.getElement('_annotation_textcolor');
        this.annotationFontFamilyElement = this.pdfViewerBase.getElement('_annotation_fontname');
        this.annotationFontSizeElement = this.pdfViewerBase.getElement('_annotation_fontsize');
        this.annotationTextAlignElement = this.pdfViewerBase.getElement('_annotation_textalign');
        this.annotationTextColorElement = this.pdfViewerBase.getElement('_annotation_textcolor');
        this.annotationTextPropertiesElement = this.pdfViewerBase.getElement('_annotation_textproperties');
        this.annotationDeleteElement = this.pdfViewerBase.getElement('_annotation_delete');
        this.annotationCommentPanelElement = this.pdfViewerBase.getElement('_annotation_commentPanel');
        this.annotationCloseElement = this.pdfViewerBase.getElement('_annotation_close');
        this.mobileToolbarContainerElement = this.pdfViewerBase.getElement('_mobileToolbarContainer');
        this.mobileSearchPreviousOccurenceElement = this.pdfViewerBase.getElement('_prev_occurrence');
        this.mobileSearchNextOccurenceElement = this.pdfViewerBase.getElement('_next_occurrence');
    };
    /**
     * Update the total page.
     *
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.updateTotalPage = function () {
        this.totalPageElement.textContent = this.pdfViewer.localeObj.getConstant('of') + this.pdfViewerBase.pageCount.toString();
    };
    /**
     * Update current page.
     *
     * @param {number} pageNumber - The pageNumber.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.updateCurrentPage = function (pageNumber) {
        this.currentPageBoxElement.value = pageNumber.toString();
    };
    /**
     * Load the PDF document.
     *
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.loadDocument = function () {
        if (this.pdfViewer.enableNavigation) {
            this.currentPageBoxElementContainer.classList.remove(this.cssClass);
            this.currentPageBoxElement.value = '1';
            this.totalPageElement.textContent = this.pdfViewer.localeObj.getConstant('of') + this.pdfViewerBase.pageCount.toString();
            if (!this.isEnabled(this.firstPageElement)) {
                this.firstPageElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.previousPageElement)) {
                this.previousPageElement.className += this.disableClass;
            }
            this.nextPageElement.classList.remove(this.cssClass);
            this.lastPageElement.classList.remove(this.cssClass);
            if (this.pdfViewerBase.pageCount === 1) {
                if (!this.nextPageElement.classList.contains(this.cssClass)) {
                    this.nextPageElement.className += this.disableClass;
                }
                if (!this.lastPageElement.classList.contains(this.cssClass)) {
                    this.lastPageElement.className += this.disableClass;
                }
            }
        }
        if (this.pdfViewer.enableMagnification) {
            this.zoomInElement.classList.remove(this.cssClass);
            this.zommOutElement.classList.remove(this.cssClass);
            this.zoomDropDownElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableTextSelection) {
            this.selectToolElement.classList.remove(this.cssClass);
            this.selectItem(this.pdfViewer.toolbar.SelectToolElement);
        }
        this.handToolElement.classList.remove(this.cssClass);
        if (this.pdfViewer.enableStickyNotesAnnotation) {
            this.commentElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableTextSearch) {
            this.searchElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.isFormFieldDocument) {
            this.submitFormButton.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableAnnotationToolbar) {
            this.annotationElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enablePrint) {
            this.printElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableDownload) {
            this.downloadElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableTextMarkupAnnotation) {
            this.highlightElement.classList.remove(this.cssClass);
            this.underlineElement.classList.remove(this.cssClass);
            this.strikeThroughElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableShapeAnnotation) {
            this.shapeElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableMeasureAnnotation) {
            this.calibrateElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableStampAnnotations) {
            this.stampElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableFreeText) {
            this.freeTextElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableHandwrittenSignature) {
            this.signatureElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableInkAnnotation) {
            this.inkElement.classList.remove(this.cssClass);
        }
        if (this.pdfViewer.enableCommentPanel) {
            this.annotationCommentPanelElement.classList.remove(this.cssClass);
        }
    };
    BlazorUiAdaptor.prototype.selectItem = function (element) {
        if (element) {
            element.classList.add('e-pv-select');
        }
    };
    BlazorUiAdaptor.prototype.deselectItem = function (element) {
        if (element) {
            element.classList.remove('e-pv-select');
        }
    };
    BlazorUiAdaptor.prototype.showAnnotationToolbar = function (isToolbarVisible) {
        this.pdfViewer.toolbar.annotationToolbarModule.adjustViewer(isToolbarVisible[0]);
        if (isToolbarVisible[0]) {
            this.pdfViewer.toolbar.selectItem(this.editAnnotationButtonElement);
        }
        else {
            this.pdfViewer.toolbar.deSelectItem(this.editAnnotationButtonElement);
            this.pdfViewerBase.focusViewerContainer();
        }
    };
    BlazorUiAdaptor.prototype.closeAnnotationToolbar = function () {
        this.pdfViewer.toolbar.annotationToolbarModule.adjustViewer(false);
        this.pdfViewer.toolbar.deSelectItem(this.editAnnotationButtonElement);
        this.pdfViewerBase.navigationPane.closeCommentPanelContainer();
    };
    /**
     * Reset the toolbar.
     *
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.resetToolbar = function () {
        if (this.pdfViewer.enableToolbar) {
            this.currentPageBoxElement.value = '0';
            this.totalPageElement.textContent = this.pdfViewer.localeObj.getConstant('of') + '0';
            if (!this.isEnabled(this.currentPageBoxElementContainer)) {
                this.currentPageBoxElementContainer.className += this.disableClass;
            }
            if (!this.isEnabled(this.firstPageElement)) {
                this.firstPageElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.previousPageElement)) {
                this.previousPageElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.nextPageElement)) {
                this.nextPageElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.lastPageElement)) {
                this.lastPageElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.zoomInElement)) {
                this.zoomInElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.zommOutElement)) {
                this.zommOutElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.zoomDropDownElement)) {
                this.zoomDropDownElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.selectToolElement)) {
                this.selectToolElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.handToolElement)) {
                this.handToolElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.undoElement)) {
                this.undoElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.redoElement)) {
                this.redoElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.commentElement)) {
                this.commentElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.searchElement)) {
                this.searchElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.submitFormButton)) {
                this.submitFormButton.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationElement)) {
                this.annotationElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.printElement)) {
                this.printElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.downloadElement)) {
                this.downloadElement.className += this.disableClass;
            }
        }
        if (this.pdfViewer.enableAnnotationToolbar) {
            if (!this.isEnabled(this.highlightElement)) {
                this.highlightElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.underlineElement)) {
                this.underlineElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.strikeThroughElement)) {
                this.strikeThroughElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.shapeElement)) {
                this.shapeElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.calibrateElement)) {
                this.calibrateElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.stampElement)) {
                this.stampElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.freeTextElement)) {
                this.freeTextElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.signatureElement)) {
                this.signatureElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.inkElement)) {
                this.inkElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationFontFamilyElement)) {
                this.annotationFontFamilyElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationFontSizeElement)) {
                this.annotationFontSizeElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextColorElement)) {
                this.annotationTextColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextAlignElement)) {
                this.annotationTextAlignElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextPropertiesElement)) {
                this.annotationTextPropertiesElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationColorElement)) {
                this.annotationColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationStrokeColorElement)) {
                this.annotationStrokeColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationThicknessElement)) {
                this.annotationThicknessElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationOpacityElement)) {
                this.annotationOpacityElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationDeleteElement)) {
                this.annotationDeleteElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationCommentPanelElement)) {
                this.annotationCommentPanelElement.className += this.disableClass;
            }
        }
    };
    /**
     * When annotation selection changed.
     *
     * @param {boolean} isEnable - isEnable
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.EnableDeleteOption = function (isEnable) {
        if (this.annotationDeleteElement !== null) {
            if (isEnable) {
                this.annotationDeleteElement.classList.remove(this.cssClass);
            }
            else {
                if (!this.isEnabled(this.annotationDeleteElement)) {
                    this.annotationDeleteElement.className += this.disableClass;
                }
            }
        }
    };
    /**
     * when the page changes.
     *
     * @param {number} currentPageNumber - The current page number.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.pageChanged = function (currentPageNumber) {
        if (this.pdfViewer.enableNavigation) {
            this.currentPageBoxElement.value = currentPageNumber.toString();
        }
        if (currentPageNumber === this.pdfViewer.pageCount) {
            if (!this.isEnabled(this.nextPageElement)) {
                this.nextPageElement.className += this.disableClass;
            }
            this.previousPageElement.classList.remove(this.cssClass);
            if (!this.isEnabled(this.lastPageElement)) {
                this.lastPageElement.className += this.disableClass;
            }
            this.firstPageElement.classList.remove(this.cssClass);
        }
        if (currentPageNumber < this.pdfViewer.pageCount && currentPageNumber !== 1) {
            this.firstPageElement.classList.remove(this.cssClass);
            this.previousPageElement.classList.remove(this.cssClass);
            this.nextPageElement.classList.remove(this.cssClass);
            this.lastPageElement.classList.remove(this.cssClass);
        }
        if (currentPageNumber === 1) {
            this.nextPageElement.classList.remove(this.cssClass);
            this.lastPageElement.classList.remove(this.cssClass);
            if (!this.isEnabled(this.firstPageElement)) {
                this.firstPageElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.previousPageElement)) {
                this.previousPageElement.className += this.disableClass;
            }
        }
    };
    /**
     * @param {string} item - The current item.
     * @param {boolean} enable - To enable the item or not.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.updateUndoRedoButton = function (item, enable) {
        if (item === 'undo') {
            if (enable) {
                this.undoElement.classList.remove(this.cssClass);
            }
            else {
                if (!this.isEnabled(this.undoElement)) {
                    this.undoElement.className += this.disableClass;
                }
            }
        }
        if (item === 'redo') {
            if (enable) {
                this.redoElement.classList.remove(this.cssClass);
            }
            else {
                if (!this.isEnabled(this.redoElement)) {
                    this.redoElement.className += this.disableClass;
                }
            }
        }
    };
    /**
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.disableUndoRedoButton = function () {
        if (!this.isEnabled(this.undoElement)) {
            this.undoElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.redoElement)) {
            this.redoElement.className += this.disableClass;
        }
    };
    /**
     * @param {boolean} isEnable - isEnable
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.enableTextMarkupAnnotationPropertiesTools = function (isEnable) {
        if (isEnable) {
            this.annotationColorElement.classList.remove(this.cssClass);
            this.annotationOpacityElement.classList.remove(this.cssClass);
        }
        else {
            if (!this.isEnabled(this.annotationOpacityElement)) {
                this.annotationOpacityElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationColorElement)) {
                this.annotationColorElement.className += this.disableClass;
            }
        }
        if (!this.isEnabled(this.annotationFontColorElement)) {
            this.annotationFontColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontFamilyElement)) {
            this.annotationFontFamilyElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontSizeElement)) {
            this.annotationFontSizeElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextAlignElement)) {
            this.annotationTextAlignElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextPropertiesElement)) {
            this.annotationTextPropertiesElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationStrokeColorElement)) {
            this.annotationStrokeColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationThicknessElement)) {
            this.annotationThicknessElement.className += this.disableClass;
        }
    };
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isProperitiesChange - To enable the item or not.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.enableAnnotationPropertiesTool = function (isEnable, isProperitiesChange) {
        if (isProperitiesChange) {
            if (isEnable) {
                this.annotationColorElement.classList.remove(this.cssClass);
                this.annotationStrokeColorElement.classList.remove(this.cssClass);
                this.annotationThicknessElement.classList.remove(this.cssClass);
                this.annotationOpacityElement.classList.remove(this.cssClass);
                if (this.pdfViewer.enableShapeLabel) {
                    this.annotationFontColorElement.classList.remove(this.cssClass);
                    this.annotationFontFamilyElement.classList.remove(this.cssClass);
                    this.annotationFontSizeElement.classList.remove(this.cssClass);
                }
                if (!this.isEnabled(this.annotationTextAlignElement)) {
                    this.annotationTextAlignElement.className += this.disableClass;
                }
                if (!this.isEnabled(this.annotationTextPropertiesElement)) {
                    this.annotationTextPropertiesElement.className += this.disableClass;
                }
            }
            else {
                if (!this.isEnabled(this.annotationColorElement)) {
                    this.annotationColorElement.className += this.disableClass;
                }
                if (!this.isEnabled(this.annotationStrokeColorElement)) {
                    this.annotationStrokeColorElement.className += this.disableClass;
                }
                if (!this.isEnabled(this.annotationThicknessElement)) {
                    this.annotationThicknessElement.className += this.disableClass;
                }
                if (!this.isEnabled(this.annotationOpacityElement)) {
                    this.annotationOpacityElement.className += this.disableClass;
                }
                if (!this.isEnabled(this.annotationDeleteElement)) {
                    this.annotationDeleteElement.className += this.disableClass;
                }
            }
        }
    };
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isProperitiesChange - To enable the item or not.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.enableFreeTextAnnotationPropertiesTools = function (isEnable, isProperitiesChange) {
        if (isProperitiesChange && isEnable) {
            this.annotationColorElement.classList.remove(this.cssClass);
            this.annotationStrokeColorElement.classList.remove(this.cssClass);
            this.annotationThicknessElement.classList.remove(this.cssClass);
            this.annotationOpacityElement.classList.remove(this.cssClass);
            this.annotationFontColorElement.classList.remove(this.cssClass);
            this.annotationFontFamilyElement.classList.remove(this.cssClass);
            this.annotationFontSizeElement.classList.remove(this.cssClass);
            this.annotationTextAlignElement.classList.remove(this.cssClass);
            this.annotationTextPropertiesElement.classList.remove(this.cssClass);
            this.annotationDeleteElement.classList.remove(this.cssClass);
            this.annotationCommentPanelElement.classList.remove(this.cssClass);
        }
    };
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isPropertiesChange - To enable the item or not.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.enableStampAnnotationPropertiesTools = function (isEnable, isPropertiesChange) {
        if (isEnable) {
            this.annotationOpacityElement.classList.remove(this.cssClass);
            this.annotationDeleteElement.classList.remove(this.cssClass);
            this.annotationCommentPanelElement.classList.remove(this.cssClass);
        }
        else {
            if (!this.isEnabled(this.annotationOpacityElement)) {
                this.annotationOpacityElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationDeleteElement)) {
                this.annotationDeleteElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationCommentPanelElement)) {
                this.annotationCommentPanelElement.className += this.disableClass;
            }
        }
        if (!this.isEnabled(this.annotationColorElement)) {
            this.annotationColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationStrokeColorElement)) {
            this.annotationStrokeColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationThicknessElement)) {
            this.annotationThicknessElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationOpacityElement)) {
            this.annotationOpacityElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontColorElement)) {
            this.annotationFontColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontFamilyElement)) {
            this.annotationFontFamilyElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontSizeElement)) {
            this.annotationFontSizeElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextAlignElement)) {
            this.annotationTextAlignElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextPropertiesElement)) {
            this.annotationTextPropertiesElement.className += this.disableClass;
        }
    };
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isProperitiesChange - To enable the item or not.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.enableSignaturePropertiesTools = function (isEnable, isProperitiesChange) {
        if (isEnable) {
            this.annotationStrokeColorElement.classList.remove(this.cssClass);
            this.annotationThicknessElement.classList.remove(this.cssClass);
            this.annotationOpacityElement.classList.remove(this.cssClass);
            this.annotationDeleteElement.classList.remove(this.cssClass);
            this.annotationCommentPanelElement.classList.remove(this.cssClass);
        }
        else {
            if (!this.isEnabled(this.annotationStrokeColorElement)) {
                this.annotationStrokeColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationThicknessElement)) {
                this.annotationThicknessElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationOpacityElement)) {
                this.annotationOpacityElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationDeleteElement)) {
                this.annotationDeleteElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationCommentPanelElement)) {
                this.annotationCommentPanelElement.className += this.disableClass;
            }
        }
        if (!this.isEnabled(this.annotationColorElement)) {
            this.annotationColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontColorElement)) {
            this.annotationFontColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontFamilyElement)) {
            this.annotationFontFamilyElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontSizeElement)) {
            this.annotationFontSizeElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextAlignElement)) {
            this.annotationTextAlignElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextPropertiesElement)) {
            this.annotationTextPropertiesElement.className += this.disableClass;
        }
    };
    /**
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.annotationAdd = function () {
        if (!this.isEnabled(this.annotationColorElement)) {
            this.annotationColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationStrokeColorElement)) {
            this.annotationStrokeColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationThicknessElement)) {
            this.annotationThicknessElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationOpacityElement)) {
            this.annotationOpacityElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontColorElement)) {
            this.annotationFontColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontFamilyElement)) {
            this.annotationFontFamilyElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontSizeElement)) {
            this.annotationFontSizeElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextAlignElement)) {
            this.annotationTextAlignElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextPropertiesElement)) {
            this.annotationTextPropertiesElement.className += this.disableClass;
        }
    };
    /**
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.annotationUnSelect = function () {
        if (!this.isEnabled(this.annotationColorElement)) {
            this.annotationColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationStrokeColorElement)) {
            this.annotationStrokeColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationThicknessElement)) {
            this.annotationThicknessElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationOpacityElement)) {
            this.annotationOpacityElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontColorElement)) {
            this.annotationFontColorElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontFamilyElement)) {
            this.annotationFontFamilyElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationFontSizeElement)) {
            this.annotationFontSizeElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextAlignElement)) {
            this.annotationTextAlignElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationTextPropertiesElement)) {
            this.annotationTextPropertiesElement.className += this.disableClass;
        }
        if (!this.isEnabled(this.annotationDeleteElement)) {
            this.annotationDeleteElement.className += this.disableClass;
        }
    };
    /**
     * @param {string} annotationType - The annotationType.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.annotationSelect = function (annotationType) {
        if (annotationType === 'FreeText') {
            this.annotationColorElement.classList.remove(this.cssClass);
            this.annotationStrokeColorElement.classList.remove(this.cssClass);
            this.annotationThicknessElement.classList.remove(this.cssClass);
            this.annotationOpacityElement.classList.remove(this.cssClass);
            this.annotationFontColorElement.classList.remove(this.cssClass);
            this.annotationFontFamilyElement.classList.remove(this.cssClass);
            this.annotationFontSizeElement.classList.remove(this.cssClass);
            this.annotationTextAlignElement.classList.remove(this.cssClass);
            this.annotationTextPropertiesElement.classList.remove(this.cssClass);
        }
        if (annotationType === 'Shape' || annotationType === 'Measure') {
            this.annotationColorElement.classList.remove(this.cssClass);
            this.annotationStrokeColorElement.classList.remove(this.cssClass);
            this.annotationThicknessElement.classList.remove(this.cssClass);
            this.annotationOpacityElement.classList.remove(this.cssClass);
            if (!this.isEnabled(this.annotationFontColorElement)) {
                this.annotationFontColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationFontFamilyElement)) {
                this.annotationFontFamilyElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationFontSizeElement)) {
                this.annotationFontSizeElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextAlignElement)) {
                this.annotationTextAlignElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextPropertiesElement)) {
                this.annotationTextPropertiesElement.className += this.disableClass;
            }
        }
        if (annotationType === 'TextMarkup') {
            this.annotationColorElement.classList.remove(this.cssClass);
            if (!this.isEnabled(this.annotationStrokeColorElement)) {
                this.annotationStrokeColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationThicknessElement)) {
                this.annotationThicknessElement.className += this.disableClass;
            }
            this.annotationOpacityElement.classList.remove(this.cssClass);
            if (!this.isEnabled(this.annotationFontColorElement)) {
                this.annotationFontColorElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationFontFamilyElement)) {
                this.annotationFontFamilyElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationFontSizeElement)) {
                this.annotationFontSizeElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextAlignElement)) {
                this.annotationTextAlignElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.annotationTextPropertiesElement)) {
                this.annotationTextPropertiesElement.className += this.disableClass;
            }
        }
        this.annotationDeleteElement.classList.remove(this.cssClass);
        this.annotationCommentPanelElement.classList.remove(this.cssClass);
    };
    /**
     * @param {string} fontFamily - The fontFamily.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.updateFontFamilyInIcon = function (fontFamily) {
        this.annotationFontFamilyInputElement.value = fontFamily;
    };
    /**
     * @param {number} fontSize - The fontSize.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.updateFontSizeInIcon = function (fontSize) {
        var fontValue = fontSize.toString() + 'px';
        this.annotationFontSizeInputElement.value = fontValue;
    };
    /**
     * @param {boolean} isEnable - To enable or disable.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.enableSearchItems = function (isEnable) {
        if (isEnable) {
            this.mobileSearchPreviousOccurenceElement.classList.remove(this.cssClass);
            this.mobileSearchNextOccurenceElement.classList.remove(this.cssClass);
        }
        else {
            if (!this.isEnabled(this.mobileSearchPreviousOccurenceElement)) {
                this.mobileSearchPreviousOccurenceElement.className += this.disableClass;
            }
            if (!this.isEnabled(this.mobileSearchNextOccurenceElement)) {
                this.mobileSearchNextOccurenceElement.className += this.disableClass;
            }
        }
    };
    /**
     * @param {boolean} isTapHidden - To enable or disable.
     * @returns {void}
     */
    BlazorUiAdaptor.prototype.tapOnMobileDevice = function (isTapHidden) {
        if (this.mobileToolbarContainerElement != null) {
            if (isTapHidden) {
                this.mobileToolbarContainerElement.style.display = 'none';
            }
            else {
                this.mobileToolbarContainerElement.style.display = 'block';
            }
        }
    };
    /**
     * @param {HTMLElement} element - The HTMLElement.
     * @returns {boolean} - Returns trur or false.
     */
    BlazorUiAdaptor.prototype.isEnabled = function (element) {
        return element.classList.contains(this.cssClass);
    };
    return BlazorUiAdaptor;
}());
export { BlazorUiAdaptor };
