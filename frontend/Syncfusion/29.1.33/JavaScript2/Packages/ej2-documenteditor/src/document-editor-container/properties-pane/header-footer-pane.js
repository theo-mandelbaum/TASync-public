/**
 * Represents document editor header and footer.
 */
import { createElement, L10n, classList } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
/**
 * @private
 */
var HeaderFooterProperties = /** @class */ (function () {
    function HeaderFooterProperties(container, isRtl) {
        this.isHeaderTopApply = false;
        this.isFooterTopApply = false;
        //Events Hook Constants
        this.HeaderTopApplyClickHook = this.headerTopApply.bind(this);
        this.FooterTopApplyClickHook = this.footerTopapply.bind(this);
        this.OnHeaderValueKeyDownHook = this.onHeaderValue.bind(this);
        this.OnFooterValueKeyDownHook = this.onFooterValue.bind(this);
        this.ChangeHeaderBlurHook = this.changeHeaderBlur.bind(this);
        this.ChangeFooterBlurHook = this.changeFooterBlur.bind(this);
        this.container = container;
        this.isRtl = isRtl;
        this.initHeaderFooterPane();
        this.wireEvents();
    }
    Object.defineProperty(HeaderFooterProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderFooterProperties.prototype, "toolbar", {
        get: function () {
            return this.container.toolbarModule;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {boolean} enable - enable/disable header footer pane.
     * @returns {void}
     */
    HeaderFooterProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    HeaderFooterProperties.prototype.initHeaderFooterPane = function () {
        this.initializeHeaderFooter();
        this.element.style.display = 'none';
        this.container.propertiesPaneContainer.appendChild(this.element);
    };
    HeaderFooterProperties.prototype.showHeaderFooterPane = function (isShow) {
        if (isShow) {
            if (this.toolbar) {
                this.toolbar.enableDisablePropertyPaneButton(false);
            }
            this.onSelectionChange();
        }
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    };
    HeaderFooterProperties.prototype.initializeHeaderFooter = function () {
        var _this = this;
        this.localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        this.elementId = 'header_footer_properties';
        this.element = createElement('div', { id: this.documentEditor.element.id + this.elementId, className: 'e-de-prop-pane' });
        this.headerDiv = this.createDivTemplate('_header_footer', this.element, 'padding-bottom:0');
        classList(this.headerDiv, ['e-de-cntr-pane-padding'], []);
        this.headerLabel = createElement('label', { className: 'e-de-prop-header-label' });
        this.headerLabel.innerHTML = this.localObj.getConstant('Header And Footer');
        var closeButtonFloat;
        //let optionsLabelDivPadding: string;
        //let positionLabelDivPadding: string;
        if (!this.isRtl) {
            closeButtonFloat = 'float:right;';
            //optionsLabelDivPadding = 'padding-left: 14px';
            //positionLabelDivPadding = 'padding-left: 14px;';
        }
        else {
            closeButtonFloat = 'float:left;';
            //optionsLabelDivPadding = 'padding-right: 14px';
            //positionLabelDivPadding = 'padding-right: 14px;';
        }
        this.closeIcon = createElement('span', {
            id: '_header_footer_close',
            className: 'e-de-ctnr-close e-de-close-icon e-icons',
            styles: 'display:inline-block;cursor:pointer;' + closeButtonFloat
        });
        this.closeIcon.addEventListener('click', function () {
            _this.onClose();
        });
        this.headerDiv.appendChild(this.headerLabel);
        this.headerDiv.appendChild(this.closeIcon);
        this.optionsLabelDiv = this.createDivTemplate(this.elementId + '_options', this.element);
        classList(this.optionsLabelDiv, ['e-de-cntr-pane-padding', 'e-de-prop-separator-line'], []);
        this.optionsLabel = createElement('label', { className: 'e-de-ctnr-prop-label', styles: 'height:20px;' });
        this.optionsLabel.innerHTML = this.localObj.getConstant('Options');
        this.optionsLabelDiv.appendChild(this.optionsLabel);
        this.optionsDiv = this.createDivTemplate(this.elementId + '_optionsDiv', this.optionsLabelDiv);
        this.firstPageDiv = this.createDivTemplate(this.elementId + '_firstPageDiv', this.optionsDiv);
        classList(this.firstPageDiv, ['e-de-hdr-ftr-frst-div'], []);
        var firstPage = createElement('input', { id: 'firstPage', className: 'e-de-prop-sub-label' });
        this.firstPageDiv.appendChild(firstPage);
        this.firstPage = new CheckBox({ label: this.localObj.getConstant('Different First Page'), change: this.changeFirstPageOptions.bind(this), cssClass: 'e-de-prop-sub-label', enableRtl: this.isRtl });
        this.firstPage.appendTo(firstPage);
        this.firstPageDiv.children[0].setAttribute('title', this.localObj.getConstant('Different header and footer for first page'));
        this.oddOrEvenDiv = this.createDivTemplate(this.elementId + '_oddOrEvenDiv', this.optionsDiv);
        classList(this.oddOrEvenDiv, ['e-de-hdr-ftr-frst-div'], []);
        var oddOrEven = createElement('input', { id: 'oddOrEven', className: 'e-de-sub-prop-label' });
        this.oddOrEvenDiv.appendChild(oddOrEven);
        this.oddOrEven = new CheckBox({ label: this.localObj.getConstant('Different Odd And Even Pages'), change: this.changeoddOrEvenOptions.bind(this), cssClass: 'e-de-prop-sub-label', enableRtl: this.isRtl });
        this.oddOrEven.appendTo(oddOrEven);
        this.oddOrEvenDiv.children[0].setAttribute('title', this.localObj.getConstant('Different header and footer for odd and even pages'));
        this.linkToPreviousDiv = this.createDivTemplate(this.elementId + '_linkToPreviousDiv', this.optionsDiv);
        var linkToPrevious = createElement('input', { id: 'linkToPrevious', className: 'e-de-sub-prop-label' });
        this.linkToPreviousDiv.appendChild(linkToPrevious);
        this.linkToPrevious = new CheckBox({ label: this.localObj.getConstant('Link to Previous'), change: this.changeLinkToPreviousOptions.bind(this), cssClass: 'e-de-prop-sub-label', enableRtl: this.isRtl, checked: true });
        this.linkToPrevious.appendTo(linkToPrevious);
        this.linkToPreviousDiv.children[0].setAttribute('title', this.localObj.getConstant('Link to the previous Title'));
        // let autoFieldLabelDiv: HTMLElement = this.createDivTemplate(element + '_autoFieldLabelDiv', div, 'padding-top:10px;padding-left: 10px;');
        // let autoFieldLabel: HTMLElement = createElement('label', { className: 'e-de-header-prop-label', styles: 'height:20px;' });
        // autoFieldLabel.innerHTML = 'Insert Autofield';
        // autoFieldLabelDiv.appendChild(autoFieldLabel);
        // let autofieldDiv: HTMLElement = this.createDivTemplate(element + '_autofieldDiv', autoFieldLabelDiv, 'display:inline-flex;');
        // let pageNumberDiv: HTMLElement = this.createDivTemplate(element + '_pageNumberDiv', autofieldDiv, 'margin-right:8px;');
        // let pageNumber: HTMLInputElement = createElement('input', { id: 'pageNumber' }) as HTMLInputElement;
        // pageNumberDiv.appendChild(pageNumber);
        // this.pageNumber = new CheckBox({ label: 'Page Number', change: this.changePageNumber });
        // this.pageNumber.appendTo(pageNumber);
        // let pageCountDiv: HTMLElement = this.createDivTemplate(element + '_pageCountDiv', autofieldDiv);
        // let pageCount: HTMLInputElement = createElement('input', { id: 'pageCount' }) as HTMLInputElement;
        // pageCountDiv.appendChild(pageCount);
        // this.pageCount = new CheckBox({ label: 'Page Count', change: this.changePageCount });
        // this.pageCount.appendTo(pageCount);
        // let autoFieldLine: HTMLElement = createElement('div', { className: 'e-de-prop-separator-line', styles: 'margin-top:7px;' });
        // autoFieldLabelDiv.appendChild(autoFieldLine);
        this.positionLabelDiv = this.createDivTemplate(this.elementId + '_positionLabelDiv', this.element);
        classList(this.positionLabelDiv, ['e-de-cntr-pane-padding', 'e-de-prop-separator-line'], []);
        this.positionLabel = createElement('label', { className: 'e-de-ctnr-prop-label', styles: 'height:20px;' });
        this.positionLabel.innerHTML = this.localObj.getConstant('Position');
        this.positionLabelDiv.appendChild(this.positionLabel);
        this.positionDiv = this.createDivTemplate(this.elementId + '_positionDiv', this.positionLabelDiv);
        //let width: string;
        //let headerFooterDivMargin: string;
        //if (!this.isRtl) {
        //width = 'width: 128px;';
        //headerFooterDivMargin = 'margin-right:8px;';
        //} else {
        //width = 'width: 150px;';
        //headerFooterDivMargin = 'margin-left:8px;';
        //}
        this.headerTopDiv = this.createDivTemplate(this.elementId + '_headerTopDiv', this.positionDiv);
        classList(this.headerTopDiv, ['e-de-hdr-ftr-top-div'], []);
        this.headerTopLabel = createElement('label', { className: 'e-de-prop-sub-label', styles: 'display:block' });
        this.headerTopLabel.innerHTML = this.localObj.getConstant('Header from Top');
        this.headerTopDiv.appendChild(this.headerTopLabel);
        var headerFromTop = createElement('input', { id: this.documentEditor.element.id + '_headerFromTop', className: 'e-de-prop-sub-label' });
        headerFromTop.setAttribute('aria-label', this.localObj.getConstant('Header from Top'));
        this.headerTopDiv.appendChild(headerFromTop);
        this.headerFromTop = new NumericTextBox({
            value: 36, cssClass: 'e-de-prop-header-numeric',
            showSpinButton: false, format: 'n0', decimals: 2, max: 1584, min: 0, enableRtl: this.isRtl
        });
        this.headerFromTop.appendTo(headerFromTop);
        this.headerFromTop.element.parentElement.setAttribute('title', this.localObj.getConstant('Distance from top of the page to top of the header'));
        this.footerBottomDiv = this.createDivTemplate(this.elementId + '_footerBottomDiv', this.positionDiv);
        this.footerBottomLabel = createElement('label', { className: 'e-de-prop-sub-label', styles: 'display:block' });
        this.footerBottomLabel.innerHTML = this.localObj.getConstant('Footer from Bottom');
        this.footerBottomDiv.appendChild(this.footerBottomLabel);
        var footerFromTop = createElement('input', { id: this.documentEditor.element.id + '_footerFromTop', className: 'e-de-prop-sub-label' });
        footerFromTop.setAttribute('aria-label', this.localObj.getConstant('Footer from Bottom'));
        this.footerBottomDiv.appendChild(footerFromTop);
        this.footerFromTop = new NumericTextBox({
            value: 36, cssClass: 'e-de-prop-header-numeric',
            showSpinButton: false, format: 'n0', decimals: 2, max: 1584, min: 0, enableRtl: this.isRtl
        });
        this.footerFromTop.appendTo(footerFromTop);
        this.footerFromTop.element.parentElement.setAttribute('title', this.localObj.getConstant('Distance from bottom of the page to bottom of the footer'));
    };
    HeaderFooterProperties.prototype.createDivTemplate = function (id, parentDiv, style) {
        if (style) {
            this.divElement = createElement('div', { id: id, styles: style });
        }
        else {
            this.divElement = createElement('div', { id: id });
        }
        parentDiv.appendChild(this.divElement);
        return this.divElement;
    };
    HeaderFooterProperties.prototype.wireEvents = function () {
        this.headerFromTop.element.addEventListener('click', this.HeaderTopApplyClickHook);
        this.footerFromTop.element.addEventListener('click', this.FooterTopApplyClickHook);
        this.headerFromTop.element.addEventListener('keydown', this.OnHeaderValueKeyDownHook);
        this.footerFromTop.element.addEventListener('keydown', this.OnFooterValueKeyDownHook);
        this.headerFromTop.element.addEventListener('blur', this.ChangeHeaderBlurHook);
        this.footerFromTop.element.addEventListener('blur', this.ChangeFooterBlurHook);
    };
    HeaderFooterProperties.prototype.headerTopApply = function () {
        this.isHeaderTopApply = true;
    };
    HeaderFooterProperties.prototype.footerTopapply = function () {
        this.isFooterTopApply = true;
    };
    HeaderFooterProperties.prototype.changeHeaderBlur = function () {
        this.changeHeaderValue();
        this.isHeaderTopApply = false;
    };
    HeaderFooterProperties.prototype.changeFooterBlur = function () {
        this.changeFooterValue();
        this.isFooterTopApply = false;
    };
    HeaderFooterProperties.prototype.onClose = function () {
        this.container.showHeaderProperties = true;
        this.container.documentEditor.selectionModule.closeHeaderFooter();
    };
    HeaderFooterProperties.prototype.changeFirstPageOptions = function () {
        var _this = this;
        if (!this.documentEditor.isReadOnly) {
            this.documentEditor.selectionModule.sectionFormat.differentFirstPage = this.firstPage.checked;
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 10);
        }
    };
    HeaderFooterProperties.prototype.changeoddOrEvenOptions = function () {
        var _this = this;
        if (!this.documentEditor.isReadOnly) {
            this.documentEditor.selectionModule.sectionFormat.differentOddAndEvenPages = this.oddOrEven.checked;
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 10);
        }
    };
    HeaderFooterProperties.prototype.changeLinkToPreviousOptions = function () {
        var _this = this;
        if (!this.documentEditor.isReadOnly) {
            var headerFooterType = (this.documentEditor.selectionModule.start.paragraph.containerWidget).headerFooterType;
            var value = this.linkToPrevious.checked;
            switch (headerFooterType) {
                case 'OddHeader':
                    this.documentEditor.selectionModule.sectionFormat.oddPageHeader.linkToPrevious = value;
                    break;
                case 'OddFooter':
                    this.documentEditor.selectionModule.sectionFormat.oddPageFooter.linkToPrevious = value;
                    break;
                case 'EvenHeader':
                    this.documentEditor.selectionModule.sectionFormat.evenPageHeader.linkToPrevious = value;
                    break;
                case 'EvenFooter':
                    this.documentEditor.selectionModule.sectionFormat.evenPageFooter.linkToPrevious = value;
                    break;
                case 'FirstPageHeader':
                    this.documentEditor.selectionModule.sectionFormat.firstPageHeader.linkToPrevious = value;
                    break;
                case 'FirstPageFooter':
                    this.documentEditor.selectionModule.sectionFormat.firstPageFooter.linkToPrevious = value;
                    break;
            }
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 10);
        }
    };
    HeaderFooterProperties.prototype.changeHeaderValue = function () {
        if (!this.isHeaderTopApply) {
            return;
        }
        if (!this.documentEditor.isReadOnly) {
            var headerTop = this.headerFromTop.value;
            if (headerTop > this.headerFromTop.max) {
                headerTop = this.headerFromTop.max;
            }
            this.documentEditor.selectionModule.sectionFormat.headerDistance = headerTop;
        }
    };
    HeaderFooterProperties.prototype.onHeaderValue = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.changeHeaderValue();
                _this.isHeaderTopApply = false;
            }, 30);
        }
    };
    HeaderFooterProperties.prototype.onFooterValue = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.changeFooterValue();
                _this.isFooterTopApply = false;
            }, 30);
        }
    };
    HeaderFooterProperties.prototype.changeFooterValue = function () {
        if (!this.isFooterTopApply) {
            return;
        }
        if (!this.documentEditor.isReadOnly) {
            var footerTop = this.footerFromTop.value;
            if (footerTop > this.footerFromTop.max) {
                footerTop = this.footerFromTop.max;
            }
            this.documentEditor.selectionModule.sectionFormat.footerDistance = footerTop;
        }
    };
    HeaderFooterProperties.prototype.onSelectionChange = function () {
        this.headerFromTop.value = this.documentEditor.selectionModule.sectionFormat.headerDistance;
        this.footerFromTop.value = this.documentEditor.selectionModule.sectionFormat.footerDistance;
        if (this.documentEditor.selectionModule.sectionFormat.differentFirstPage) {
            this.firstPage.checked = true;
        }
        else {
            this.firstPage.checked = false;
        }
        if (this.documentEditor.selectionModule.sectionFormat.differentOddAndEvenPages) {
            this.oddOrEven.checked = true;
        }
        else {
            this.oddOrEven.checked = false;
        }
        if (this.documentEditor.selectionModule.start.paragraph.bodyWidget.sectionIndex === 0) {
            this.linkToPrevious.disabled = true;
        }
        else {
            this.linkToPrevious.disabled = false;
            var headerFooterType = (this.documentEditor.selectionModule.start.paragraph.containerWidget).headerFooterType;
            switch (headerFooterType) {
                case 'OddHeader':
                    this.linkToPrevious.checked = this.documentEditor.selectionModule.sectionFormat.oddPageHeader.linkToPrevious;
                    break;
                case 'OddFooter':
                    this.linkToPrevious.checked = this.documentEditor.selectionModule.sectionFormat.oddPageFooter.linkToPrevious;
                    break;
                case 'EvenHeader':
                    this.linkToPrevious.checked = this.documentEditor.selectionModule.sectionFormat.evenPageHeader.linkToPrevious;
                    break;
                case 'EvenFooter':
                    this.linkToPrevious.checked = this.documentEditor.selectionModule.sectionFormat.evenPageFooter.linkToPrevious;
                    break;
                case 'FirstPageHeader':
                    this.linkToPrevious.checked = this.documentEditor.selectionModule.sectionFormat.firstPageHeader.linkToPrevious;
                    break;
                case 'FirstPageFooter':
                    this.linkToPrevious.checked = this.documentEditor.selectionModule.sectionFormat.firstPageFooter.linkToPrevious;
                    break;
            }
        }
    };
    HeaderFooterProperties.prototype.destroy = function () {
        this.unWireEvents();
        this.removeHTMLDOM();
        if (this.element) {
            this.element.innerHTML = '';
            if (this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }
        }
        this.element = undefined;
        if (this.firstPage) {
            this.firstPage.destroy();
        }
        this.firstPage = undefined;
        if (this.oddOrEven) {
            this.oddOrEven.destroy();
        }
        this.oddOrEven = undefined;
        if (this.linkToPrevious) {
            this.linkToPrevious.destroy();
        }
        this.linkToPrevious = undefined;
        if (this.headerFromTop) {
            this.headerFromTop.destroy();
            this.headerFromTop = undefined;
        }
        if (this.footerFromTop) {
            this.footerFromTop.destroy();
            this.footerFromTop = undefined;
        }
        this.container = undefined;
        this.localObj = undefined;
        this.elementId = undefined;
    };
    HeaderFooterProperties.prototype.unWireEvents = function () {
        this.headerFromTop.element.removeEventListener('click', this.HeaderTopApplyClickHook);
        this.footerFromTop.element.removeEventListener('click', this.FooterTopApplyClickHook);
        this.headerFromTop.element.removeEventListener('keydown', this.OnHeaderValueKeyDownHook);
        this.footerFromTop.element.removeEventListener('keydown', this.OnFooterValueKeyDownHook);
        this.headerFromTop.element.removeEventListener('blur', this.ChangeHeaderBlurHook);
        this.footerFromTop.element.removeEventListener('blur', this.ChangeFooterBlurHook);
        this.HeaderTopApplyClickHook = undefined;
        this.FooterTopApplyClickHook = undefined;
        this.OnHeaderValueKeyDownHook = undefined;
        this.OnFooterValueKeyDownHook = undefined;
        this.ChangeHeaderBlurHook = undefined;
        this.ChangeFooterBlurHook = undefined;
    };
    HeaderFooterProperties.prototype.removeHTMLDOM = function () {
        this.headerDiv.remove();
        this.headerLabel.remove();
        this.closeIcon.remove();
        this.optionsLabelDiv.remove();
        this.optionsLabel.remove();
        this.optionsDiv.remove();
        this.firstPageDiv.remove();
        this.oddOrEvenDiv.remove();
        this.linkToPreviousDiv.remove();
        this.positionLabelDiv.remove();
        this.positionLabel.remove();
        this.positionDiv.remove();
        this.headerTopDiv.remove();
        this.headerTopLabel.remove();
        this.footerBottomDiv.remove();
        this.footerBottomLabel.remove();
        this.divElement.remove();
    };
    return HeaderFooterProperties;
}());
export { HeaderFooterProperties };
