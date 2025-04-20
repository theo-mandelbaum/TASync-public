import { createElement, L10n, classList } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TextBox } from '@syncfusion/ej2-inputs';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Image Property pane
 *
 * @private
 */
var ImageProperties = /** @class */ (function () {
    function ImageProperties(container, isRtl) {
        this.isWidthApply = false;
        this.isHeightApply = false;
        //Event Hook Constants
        this.onAspectRatioBtnClickHook = this.onAspectRatioBtnClick.bind(this);
        this.widthBlurHook = this.widthBlur.bind(this);
        this.heightBlurHook = this.heightBlur.bind(this);
        this.onImageWidthHook = this.onImageWidth.bind(this);
        this.onImageHeightHook = this.onImageHeight.bind(this);
        this.widthNumericBlurHook = this.widthNumericBlur.bind(this);
        this.heightNumericBlurHook = this.heightNumericBlur.bind(this);
        this.altTextAreaBlurHook = this.altTextAreaBlur.bind(this);
        this.container = container;
        this.elementId = this.documentEditor.element.id;
        this.isMaintainAspectRatio = false;
        this.isRtl = isRtl;
        this.initializeImageProperties();
    }
    Object.defineProperty(ImageProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {boolean} enable - enable/disable image properties pane.
     * @returns {void}
     */
    ImageProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    ImageProperties.prototype.initializeImageProperties = function () {
        this.element = createElement('div', { id: this.elementId + '_imageProperties', className: 'e-de-prop-pane' });
        this.element.style.display = 'none';
        this.container.propertiesPaneContainer.appendChild(this.element);
        this.initImageProp();
        this.initImageAltProp();
        this.wireEvents();
    };
    ImageProperties.prototype.initImageProp = function () {
        var localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        this.imageDiv = createElement('div', { id: this.elementId + '_imageDiv', className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
        this.element.appendChild(this.imageDiv);
        this.label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        this.label.textContent = localObj.getConstant('Image');
        this.imageDiv.appendChild(this.label);
        this.outerDiv = createElement('div');
        this.imageDiv.appendChild(this.outerDiv);
        this.widthElement = this.createImagePropertiesDiv('_widthDiv', this.outerDiv, '_widthInput', localObj.getConstant('W'), localObj.getConstant('Width'));
        this.widthNumericBox = new NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
        this.widthNumericBox.appendTo(this.widthElement);
        this.heightElement = this.createImagePropertiesDiv('_heightDiv', this.outerDiv, '_heightInput', localObj.getConstant('H'), localObj.getConstant('Height'));
        this.heightNumericBox = new NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
        this.heightNumericBox.appendTo(this.heightElement);
        this.aspectRatioDiv = createElement('div', { id: this.elementId + '_aspectRatioDiv' });
        this.aspectRatioDiv.setAttribute('title', localObj.getConstant('Aspect ratio'));
        this.outerDiv.appendChild(this.aspectRatioDiv);
        this.aspectRatio = createElement('input', { id: this.elementId + '_aspectRatio', className: 'e-de-ctnr-prop-label' });
        this.aspectRatioDiv.appendChild(this.aspectRatio);
        this.aspectRatioBtn = new CheckBox({ label: localObj.getConstant('Aspect ratio'), enableRtl: this.isRtl }, this.aspectRatio);
    };
    ImageProperties.prototype.initImageAltProp = function () {
        var localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        this.altDiv = createElement('div', { id: this.elementId + '_altDiv', className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
        this.element.appendChild(this.altDiv);
        this.alabel = createElement('label', { className: 'e-de-ctnr-prop-label' });
        this.alabel.textContent = localObj.getConstant('Alternate Text');
        this.altDiv.appendChild(this.alabel);
        this.textArea = createElement('textarea', { id: this.elementId + '_textarea', className: 'e-de-ctnr-prop-label ' });
        this.altDiv.appendChild(this.textArea);
        this.textareaObj = new TextBox({
            floatLabelType: 'Never'
        });
        this.textareaObj.appendTo(this.textArea);
    };
    /* eslint-disable-next-line max-len */
    ImageProperties.prototype.createImagePropertiesDiv = function (id, outerDiv, inputId, spanContent, tooltip) {
        var divElement = createElement('div', { id: this.elementId + id, styles: 'position: relative;width: 100%;', className: 'e-de-ctnr-segment' });
        divElement.setAttribute('title', tooltip);
        outerDiv.appendChild(divElement);
        var inputElement = createElement('input', { id: this.elementId + inputId, className: 'e-textbox', styles: 'width:100%;' });
        divElement.appendChild(inputElement);
        var spanElement = createElement('span', { className: 'e-de-img-prty-span' });
        spanElement.textContent = spanContent;
        divElement.appendChild(spanElement);
        return inputElement;
    };
    ImageProperties.prototype.wireEvents = function () {
        this.aspectRatioBtn.element.addEventListener('change', this.onAspectRatioBtnClickHook);
        this.widthNumericBox.element.addEventListener('click', this.widthBlurHook);
        this.heightNumericBox.element.addEventListener('click', this.heightBlurHook);
        this.widthNumericBox.element.addEventListener('keydown', this.onImageWidthHook);
        this.heightNumericBox.element.addEventListener('keydown', this.onImageHeightHook);
        this.widthNumericBox.element.addEventListener('blur', this.widthNumericBlurHook);
        this.heightNumericBox.element.addEventListener('blur', this.heightNumericBlurHook);
        this.textArea.addEventListener('blur', this.altTextAreaBlurHook);
    };
    ImageProperties.prototype.altTextAreaBlur = function () {
        if (this.documentEditor.selectionModule.imageFormat.alternateText !== this.textArea.value) {
            this.applyImageAlternativeText();
        }
    };
    ImageProperties.prototype.heightNumericBlur = function () {
        this.applyImageHeight();
        this.isHeightApply = false;
    };
    ImageProperties.prototype.widthNumericBlur = function () {
        this.applyImageWidth();
        this.isWidthApply = false;
    };
    ImageProperties.prototype.widthBlur = function () {
        this.isWidthApply = true;
    };
    ImageProperties.prototype.heightBlur = function () {
        this.isHeightApply = true;
    };
    ImageProperties.prototype.applyImageAlternativeText = function () {
        var altText = SanitizeHtmlHelper.sanitize(this.textArea.value);
        if (!isNullOrUndefined(altText)) {
            this.documentEditor.selectionModule.imageFormat.applyImageAlternativeText(altText);
        }
    };
    ImageProperties.prototype.onImageWidth = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyImageWidth();
                _this.isWidthApply = false;
            }, 30);
        }
    };
    ImageProperties.prototype.onImageHeight = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyImageHeight();
                _this.isHeightApply = false;
            }, 30);
        }
    };
    ImageProperties.prototype.applyImageWidth = function () {
        if (!this.isMaintainAspectRatio) {
            var width = this.widthNumericBox.value;
            var height = this.heightNumericBox.value;
            if (width > this.widthNumericBox.max) {
                width = this.widthNumericBox.max;
            }
            if (height > this.heightNumericBox.max) {
                height = this.heightNumericBox.max;
            }
            if (!(width === null || height === null)) {
                this.documentEditor.selectionModule.imageFormat.resize(width, height);
            }
        }
        else if (this.isMaintainAspectRatio) {
            var width = this.widthNumericBox.value;
            if (width > this.widthNumericBox.max) {
                width = this.widthNumericBox.max;
            }
            var ratio = width / this.documentEditor.selectionModule.imageFormat.width;
            var height = this.heightNumericBox.value * ratio;
            this.heightNumericBox.value = height;
            if (!(width === null || height === null)) {
                this.documentEditor.selectionModule.imageFormat.resize(width, height);
            }
        }
    };
    ImageProperties.prototype.applyImageHeight = function () {
        if (!this.isMaintainAspectRatio) {
            var width = this.widthNumericBox.value;
            var height = this.heightNumericBox.value;
            if (!(width === null || height === null)) {
                this.documentEditor.selectionModule.imageFormat.resize(width, height);
            }
        }
        else if (this.isMaintainAspectRatio) {
            var height = this.heightNumericBox.value;
            var ratio = height / this.documentEditor.selectionModule.imageFormat.height;
            var width = this.widthNumericBox.value * ratio;
            this.widthNumericBox.value = width;
            if (!(width === null || height === null)) {
                this.documentEditor.selectionModule.imageFormat.resize(width, height);
            }
        }
    };
    ImageProperties.prototype.onAspectRatioBtnClick = function () {
        if (this.isMaintainAspectRatio) {
            this.isMaintainAspectRatio = false;
        }
        else {
            this.isMaintainAspectRatio = true;
        }
    };
    ImageProperties.prototype.showImageProperties = function (isShow) {
        if (this.element.style.display === 'block') {
            this.updateImageProperties();
        }
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    };
    ImageProperties.prototype.updateImageProperties = function () {
        this.widthNumericBox.value = this.documentEditor.selectionModule.imageFormat.width;
        this.heightNumericBox.value = this.documentEditor.selectionModule.imageFormat.height;
        if (isNullOrUndefined(this.documentEditor.selectionModule.imageFormat.alternateText)) {
            this.textArea.value = '';
        }
        else {
            this.textArea.value = this.documentEditor.selectionModule.imageFormat.alternateText;
        }
    };
    ImageProperties.prototype.destroy = function () {
        this.unWireEvents();
        this.removeHTMLDom();
        if (this.widthNumericBox) {
            this.widthNumericBox.destroy();
        }
        this.widthNumericBox = undefined;
        if (this.heightNumericBox) {
            this.heightNumericBox.destroy();
        }
        this.heightNumericBox = undefined;
        if (this.aspectRatioBtn) {
            this.aspectRatioBtn.destroy();
        }
        this.aspectRatioBtn = undefined;
        if (this.textareaObj) {
            this.textareaObj.destroy();
            this.textArea.remove();
            this.textArea = undefined;
        }
        if (this.element) {
            this.element.innerHTML = '';
            this.element = undefined;
        }
        this.container = undefined;
    };
    ImageProperties.prototype.removeHTMLDom = function () {
        this.outerDiv.remove();
        this.label.remove();
        this.imageDiv.remove();
        this.aspectRatioDiv.remove();
        this.aspectRatio.remove();
        this.alabel.remove();
        this.textArea.remove();
        this.altDiv.remove();
        this.element.remove();
    };
    ImageProperties.prototype.unWireEvents = function () {
        this.aspectRatioBtn.element.removeEventListener('change', this.onAspectRatioBtnClickHook);
        this.widthNumericBox.element.removeEventListener('click', this.widthBlurHook);
        this.heightNumericBox.element.removeEventListener('click', this.heightBlurHook);
        this.widthNumericBox.element.removeEventListener('keydown', this.onImageWidthHook);
        this.heightNumericBox.element.removeEventListener('keydown', this.onImageHeightHook);
        this.widthNumericBox.element.removeEventListener('blur', this.widthNumericBlurHook);
        this.heightNumericBox.element.removeEventListener('blur', this.heightNumericBlurHook);
        this.textArea.removeEventListener('blur', this.altTextAreaBlurHook);
        this.onAspectRatioBtnClickHook = undefined;
        this.widthBlurHook = undefined;
        this.heightBlurHook = undefined;
        this.onImageWidthHook = undefined;
        this.onImageHeightHook = undefined;
        this.widthNumericBlurHook = undefined;
        this.heightNumericBlurHook = undefined;
        this.altTextAreaBlurHook = undefined;
    };
    return ImageProperties;
}());
export { ImageProperties };
