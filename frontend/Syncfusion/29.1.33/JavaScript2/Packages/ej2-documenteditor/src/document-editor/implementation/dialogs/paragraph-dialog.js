import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { WParagraphFormat } from '../index';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
/**
 * The Paragraph dialog is used to modify formatting of selected paragraphs.
 */
var ParagraphDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function ParagraphDialog(documentHelper) {
        var _this = this;
        //paragraph Format properties
        this.leftIndent = undefined;
        this.rightIndent = undefined;
        this.beforeSpacing = undefined;
        this.afterSpacing = undefined;
        this.spaceBeforeAuto = false;
        this.spaceAfterAuto = false;
        this.textAlignment = undefined;
        this.paraOutlineLevel = undefined;
        this.firstLineIndent = undefined;
        this.lineSpacingIn = undefined;
        this.lineSpacingType = undefined;
        this.paragraphFormat = undefined;
        this.bidi = undefined;
        this.contextualSpacing = undefined;
        this.isStyleDialog = false;
        this.directionDiv = undefined;
        this.keepWithNextValue = undefined;
        this.keepLineTogetherValue = undefined;
        this.widowControlValue = undefined;
        this.tabObj = undefined;
        this.clickBeforeSpacingClickHandler = this.onClickBeforeSpacingClick.bind(this);
        this.clickAfterSpacingClickHandler = this.onClickAfterSpacingClick.bind(this);
        this.keyUpParagraphSettingsClickHandler = this.onKeyUpParagraphSettingsClick.bind(this);
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.keyUpParagraphSettings = function (event) {
            if (event.keyCode === 13) {
                _this.applyParagraphFormat();
            }
        };
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.changeBeforeSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.beforeSpacingIn.element.value = local.getConstant('Auto');
                _this.beforeSpacingIn.step = 1;
                _this.spaceBeforeAuto = true;
                _this.beforeSpacing = 5;
            }
            else {
                _this.beforeSpacing = event.value;
                _this.beforeSpacingIn.step = 6;
                _this.spaceBeforeAuto = false;
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.focusBeforeSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.beforeSpacingIn.element.value = local.getConstant('Auto');
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.blurBeforeSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                var proxy_1 = _this.beforeSpacingIn;
                setTimeout(function () {
                    proxy_1.element.value = local.getConstant('Auto');
                }, 0);
            }
        };
        /**
        * @private
        * @param {ClickEventArgs} event - Specifies the event args.
        * @returns {void}
        */
        this.clickBeforeSpacing = function () {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (_this.beforeSpacingIn.element.value === '-1.0')
                _this.beforeSpacingIn.element.value = local.getConstant('Auto');
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeAfterSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.afterSpacingIn.element.value = local.getConstant('Auto');
                _this.afterSpacingIn.step = 1;
                _this.spaceAfterAuto = true;
                _this.afterSpacing = 5;
            }
            else {
                _this.afterSpacing = event.value;
                _this.afterSpacingIn.step = 6;
                _this.spaceAfterAuto = false;
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.focusAfterSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.afterSpacingIn.element.value = local.getConstant('Auto');
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.blurAfterSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                var proxy_2 = _this.afterSpacingIn;
                setTimeout(function () {
                    proxy_2.element.value = local.getConstant('Auto');
                }, 0);
            }
        };
        /**
        * @private
        * @param {ClickEventArgs} event - Specifies the event args.
        * @returns {void}
        */
        this.clickAfterSpacing = function () {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (_this.afterSpacingIn.element.value === '-1.0')
                _this.afterSpacingIn.element.value = local.getConstant('Auto');
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeLeftIndent = function (event) {
            _this.leftIndent = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeRightIndent = function (event) {
            _this.rightIndent = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeLineSpacingValue = function (event) {
            _this.lineSpacingIn = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeFirstLineIndent = function (event) {
            _this.firstLineIndent = event.value;
            if (_this.special.index === 2) {
                _this.firstLineIndent = -(_this.firstLineIndent);
                _this.leftIndent = _this.leftIndentIn.value + event.value;
            }
        };
        /**
         * @private
         * @param {DropDownChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeByTextAlignment = function (args) {
            _this.textAlignment = args.value;
        };
        /**
         * @private
         * @param {DropDownChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeByOutlineLevel = function (args) {
            _this.paraOutlineLevel = args.value;
        };
        /**
         * @private
         * @param {ChangeArgs} event - Specifies change event args.
         * @returns {void}
         */
        this.changeBidirectional = function (event) {
            if (event.value === 'ltr') {
                _this.rtlButton.checked = !_this.ltrButton.checked;
                _this.bidi = false;
            }
            else {
                _this.ltrButton.checked = !_this.rtlButton.checked;
                _this.bidi = true;
            }
            _this.changeAlignmentByBidi();
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeContextualSpacing = function (args) {
            _this.contextualSpacing = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeKeepWithNext = function (args) {
            _this.keepWithNextValue = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeKeepLinesTogether = function (args) {
            _this.keepLineTogetherValue = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeWidowControl = function (args) {
            _this.widowControlValue = args.checked;
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeByValue = function () {
            var paragraphFormat = _this.documentHelper.selection.paragraphFormat;
            switch (_this.special.index) {
                case 0:
                    if (paragraphFormat.firstLineIndent !== 0) {
                        _this.byIn.value = 0;
                        _this.leftIndent = _this.leftIndentIn.value;
                    }
                    break;
                case 1:
                    if (paragraphFormat.firstLineIndent === 0 || isNullOrUndefined(paragraphFormat.firstLineIndent)) {
                        _this.byIn.value = 0.1;
                    }
                    else if (paragraphFormat.firstLineIndent < 0) {
                        _this.byIn.value = -(paragraphFormat.firstLineIndent);
                        if (Math.abs(paragraphFormat.firstLineIndent) <= _this.leftIndent) {
                            _this.leftIndent = paragraphFormat.firstLineIndent + _this.leftIndent;
                        }
                    }
                    break;
                case 2:
                    if (paragraphFormat.firstLineIndent === 0 || isNullOrUndefined(paragraphFormat.firstLineIndent)) {
                        paragraphFormat.firstLineIndent = -0.1;
                    }
                    else if (paragraphFormat.firstLineIndent > 0) {
                        _this.byIn.value = (paragraphFormat.firstLineIndent);
                        if (!isNullOrUndefined(_this.leftIndent)) {
                            _this.leftIndent = _this.leftIndent + paragraphFormat.firstLineIndent;
                        }
                        else {
                            _this.leftIndent = paragraphFormat.firstLineIndent;
                        }
                    }
                    break;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeBySpacing = function () {
            if (isNullOrUndefined(_this.lineSpacing)) {
                return;
            }
            switch (_this.lineSpacing.index) {
                case 0:
                    _this.lineSpacingType = 'AtLeast';
                    _this.atIn.value = 12;
                    break;
                case 1:
                    _this.lineSpacingType = 'Exactly';
                    _this.atIn.value = 12;
                    break;
                case 2:
                    _this.lineSpacingType = 'Multiple';
                    _this.atIn.value = 1;
                    break;
            }
        };
        /* eslint-enable */
        /**
         * @private
         * @returns {void}
         */
        this.loadParagraphDialog = function () {
            if (_this.isStyleDialog) {
                _this.directionDiv.classList.add('e-de-disabledbutton');
            }
            else {
                _this.directionDiv.classList.remove('e-de-disabledbutton');
            }
            var selectionFormat;
            if (_this.paragraphFormat) {
                selectionFormat = _this.paragraphFormat;
            }
            else {
                selectionFormat = _this.documentHelper.selection.paragraphFormat;
            }
            var alignValue = _this.getAlignmentValue(selectionFormat.textAlignment);
            _this.alignment.index = alignValue;
            var outlineValue = _this.getOutlineValue(selectionFormat.outlineLevel);
            _this.outlineLevel.index = outlineValue;
            if (_this.isHeadingStyle()) {
                _this.outlineLevel.readonly = true;
            }
            else {
                _this.outlineLevel.readonly = false;
            }
            if (selectionFormat.spaceBeforeAuto) {
                _this.beforeSpacingIn.value = -1;
            }
            else {
                if (selectionFormat.beforeSpacing === -1) {
                    _this.beforeSpacingIn.value = undefined;
                }
                else {
                    _this.beforeSpacingIn.value = selectionFormat.beforeSpacing;
                }
            }
            if (selectionFormat.spaceAfterAuto) {
                _this.afterSpacingIn.value = -1;
            }
            else {
                if (selectionFormat.afterSpacing === -1) {
                    _this.afterSpacingIn.value = undefined;
                }
                else {
                    _this.afterSpacingIn.value = selectionFormat.afterSpacing;
                }
            }
            _this.leftIndentIn.value = selectionFormat.leftIndent;
            _this.rightIndentIn.value = selectionFormat.rightIndent;
            _this.byIn.value = Math.abs(selectionFormat.firstLineIndent);
            var lineSpaceValue = _this.lineSpacing.index;
            _this.keepWithNextValue = undefined;
            _this.keepLineTogetherValue = undefined;
            _this.widowControlValue = undefined;
            if (selectionFormat.firstLineIndent > 0) {
                _this.special.index = 1;
            }
            else if (selectionFormat.firstLineIndent < 0) {
                _this.special.index = 2;
                _this.leftIndentIn.value = selectionFormat.leftIndent - _this.byIn.value;
            }
            if (selectionFormat.lineSpacingType === 'AtLeast') {
                lineSpaceValue = 0;
            }
            else if (selectionFormat.lineSpacingType === 'Exactly') {
                lineSpaceValue = 1;
            }
            else {
                lineSpaceValue = 2;
            }
            _this.lineSpacing.index = lineSpaceValue;
            _this.atIn.value = selectionFormat.lineSpacing;
            if (_this.documentHelper.selection.caret.style.display !== 'none') {
                _this.documentHelper.selection.caret.style.display = 'none';
            }
            if (selectionFormat.bidi) {
                _this.rtlButton.checked = true;
                _this.ltrButton.checked = false;
            }
            else {
                _this.ltrButton.checked = true;
                _this.rtlButton.checked = false;
            }
            if (isNullOrUndefined(selectionFormat.keepWithNext)) {
                _this.keepWithNext.indeterminate = true;
            }
            else {
                _this.keepWithNext.checked = selectionFormat.keepWithNext;
            }
            if (isNullOrUndefined(selectionFormat.keepLinesTogether)) {
                _this.keepLinesTogether.indeterminate = true;
            }
            else {
                _this.keepLinesTogether.checked = selectionFormat.keepLinesTogether;
            }
            if (isNullOrUndefined(selectionFormat.widowControl)) {
                _this.widowControlIn.indeterminate = true;
            }
            else {
                _this.widowControlIn.checked = selectionFormat.widowControl;
            }
            _this.contextSpacing.checked = selectionFormat.contextualSpacing;
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyParagraphFormat = function () {
            var paraFormat;
            var isApply;
            if (_this.paragraphFormat) {
                paraFormat = _this.paragraphFormat;
                isApply = false;
            }
            else {
                paraFormat = new WParagraphFormat();
                paraFormat.borders = undefined;
                isApply = true;
            }
            if (!isNullOrUndefined(_this.beforeSpacing)) {
                paraFormat.beforeSpacing = _this.beforeSpacing;
            }
            if (!isNullOrUndefined(_this.afterSpacing)) {
                paraFormat.afterSpacing = _this.afterSpacing;
            }
            if (!isNullOrUndefined(_this.spaceBeforeAuto)) {
                paraFormat.spaceBeforeAuto = _this.spaceBeforeAuto;
            }
            if (!isNullOrUndefined(_this.spaceAfterAuto)) {
                paraFormat.spaceAfterAuto = _this.spaceAfterAuto;
            }
            if (!isNullOrUndefined(_this.lineSpacingType)) {
                paraFormat.lineSpacingType = _this.lineSpacingType;
            }
            if (!isNullOrUndefined(_this.leftIndent)) {
                paraFormat.leftIndent = _this.leftIndent;
            }
            if (!isNullOrUndefined(_this.rightIndent)) {
                paraFormat.rightIndent = _this.rightIndent;
            }
            if (!isNullOrUndefined(_this.lineSpacingIn)) {
                paraFormat.lineSpacing = _this.lineSpacingIn;
            }
            if (!isNullOrUndefined(_this.firstLineIndent)) {
                paraFormat.firstLineIndent = Math.abs(_this.firstLineIndent);
                if (_this.special.index === 2) {
                    paraFormat.firstLineIndent = -paraFormat.firstLineIndent;
                    paraFormat.leftIndent = _this.leftIndentIn.value + _this.byIn.value;
                }
            }
            if (!isNullOrUndefined(_this.paraOutlineLevel)) {
                paraFormat.outlineLevel = _this.paraOutlineLevel;
            }
            if (!isNullOrUndefined(_this.bidi)) {
                paraFormat.bidi = _this.bidi;
            }
            if (!isNullOrUndefined(_this.textAlignment)) {
                var textAlignment = _this.textAlignment;
                if (paraFormat.bidi) {
                    if (textAlignment === 'Right') {
                        textAlignment = 'Left';
                    }
                    else if (textAlignment === 'Left') {
                        textAlignment = 'Right';
                    }
                }
                paraFormat.textAlignment = textAlignment;
            }
            if (!isNullOrUndefined(_this.contextualSpacing)) {
                paraFormat.contextualSpacing = _this.contextualSpacing;
            }
            if (!isNullOrUndefined(_this.keepWithNextValue)) {
                paraFormat.keepWithNext = _this.keepWithNextValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.keepWithNext) {
                paraFormat.keepWithNext = _this.documentHelper.selection.paragraphFormat.keepWithNext;
            }
            if (!isNullOrUndefined(_this.keepLineTogetherValue)) {
                paraFormat.keepLinesTogether = _this.keepLineTogetherValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.keepLinesTogether) {
                paraFormat.keepLinesTogether = _this.documentHelper.selection.paragraphFormat.keepLinesTogether;
            }
            if (!isNullOrUndefined(_this.widowControlValue)) {
                paraFormat.widowControl = _this.widowControlValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.widowControl) {
                paraFormat.widowControl = _this.documentHelper.selection.paragraphFormat.widowControl;
            }
            if (isApply) {
                _this.onParagraphFormat(paraFormat);
            }
            else {
                _this.documentHelper.owner.styleDialogModule.updateParagraphFormat(paraFormat);
            }
            _this.documentHelper.hideDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.openTabDialog = function () {
            _this.documentHelper.hideDialog();
            _this.documentHelper.owner.tabDialogModule.show();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeParagraphDialog = function () {
            _this.leftIndent = undefined;
            _this.afterSpacing = undefined;
            _this.beforeSpacing = undefined;
            _this.firstLineIndent = undefined;
            _this.textAlignment = undefined;
            _this.paraOutlineLevel = undefined;
            _this.rightIndent = undefined;
            _this.lineSpacingIn = undefined;
            _this.lineSpacingType = undefined;
            _this.paragraphFormat = undefined;
            _this.documentHelper.hideDialog();
        };
        this.documentHelper = documentHelper;
    }
    Object.defineProperty(ParagraphDialog.prototype, "owner", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @returns {string} Returns module name
     */
    ParagraphDialog.prototype.getModuleName = function () {
        return 'ParagraphDialog';
    };
    /* eslint-disable */
    /**
     * @private
     * @param {L10n} locale - Specifies the locale.
     * @returns {void}
     */
    ParagraphDialog.prototype.initParagraphDialog = function (locale) {
        var tabContainer = createElement('div');
        this.ejtab = createElement('div');
        this.instance = this;
        var ownerId = this.documentHelper.owner.containerId;
        //let id: string = ownerId + '_paragraph_dialog';
        this.indentContainer = createElement('div', { className: 'e-de-dlg-tab-first-child e-de-para-dlg-container' });
        this.target = tabContainer;
        tabContainer.appendChild(this.ejtab);
        this.div = createElement('div', { styles: 'width:400px;' });
        this.generalDiv = createElement('div');
        this.genLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('General') });
        this.generalDiv.appendChild(this.genLabel);
        this.alignmentWholeDiv = createElement('div', { className: 'e-de-container-row' });
        this.generalDiv.appendChild(this.alignmentWholeDiv);
        this.alignmentDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.alignmentWholeDiv.appendChild(this.alignmentDiv);
        var alignment = createElement('select', {
            id: ownerId + '_Alignment',
            innerHTML: '<option value="Center">' + locale.getConstant('Center') +
                '</option><option value="Left">' + locale.getConstant('Left') +
                '</option><option value="Right">' + locale.getConstant('Right') +
                '</option><option value="Justify">' + locale.getConstant('Justify') + '</option>'
        });
        var outlineLevel = createElement('select', {
            id: ownerId + '_Outline',
            innerHTML: '<option value="BodyText">' + locale.getConstant('BodyText') +
                '</option><option value="Level1">' + locale.getConstant('Level1') +
                '</option><option value="Level2">' + locale.getConstant('Level2') +
                '</option><option value="Level3">' + locale.getConstant('Level3') +
                '</option><option value="Level4">' + locale.getConstant('Level4') +
                '</option><option value="Level5">' + locale.getConstant('Level5') +
                '</option><option value="Level6">' + locale.getConstant('Level6') +
                '</option><option value="Level7">' + locale.getConstant('Level7') +
                '</option><option value="Level8">' + locale.getConstant('Level8') +
                '</option><option value="Level9">' + locale.getConstant('Level9') + '</option>'
        });
        this.alignmentDiv.appendChild(alignment);
        this.alignmentDiv.setAttribute('aria-labelledby', alignment.innerText);
        this.alignmentDiv.appendChild(outlineLevel);
        this.alignmentDiv.setAttribute('aria-labelledby', outlineLevel.innerText);
        this.dirLabel = createElement('div', {
            className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Direction')
        });
        this.directionDiv = createElement('div', { className: 'e-de-container-row' });
        this.rtlDiv = createElement('div', { className: 'e-de-rtl-btn-div' });
        this.rtlInputELe = createElement('input', { id: ownerId + '_rtlEle' });
        this.rtlDiv.appendChild(this.rtlInputELe);
        this.directionDiv.appendChild(this.rtlDiv);
        var isRtl = this.documentHelper.owner.enableRtl;
        if (isRtl) {
            this.rtlDiv.classList.add('e-de-rtl');
        }
        this.ltrDiv = createElement('div', { className: 'e-de-ltr-btn-div' });
        this.ltrInputELe = createElement('input', { id: ownerId + '_ltrEle' });
        this.ltrDiv.appendChild(this.ltrInputELe);
        this.directionDiv.appendChild(this.ltrDiv);
        this.generalDiv.appendChild(this.dirLabel);
        this.generalDiv.appendChild(this.directionDiv);
        this.rtlButton = new RadioButton({
            label: locale.getConstant('Right-to-left'), enableRtl: isRtl,
            value: 'rtl', cssClass: 'e-small', change: this.changeBidirectional
        });
        this.rtlButton.appendTo(this.rtlInputELe);
        this.rtlInputELe.setAttribute('aria-label', locale.getConstant('Right-to-left'));
        this.ltrButton = new RadioButton({
            label: locale.getConstant('Left-to-right'), enableRtl: isRtl,
            value: 'ltr', cssClass: 'e-small', change: this.changeBidirectional
        });
        this.ltrButton.appendTo(this.ltrInputELe);
        this.ltrInputELe.setAttribute('aria-label', locale.getConstant('Left-to-right'));
        this.indentionWholeDiv = createElement('div');
        this.indentLabel = createElement('div', { className: 'e-de-para-dlg-heading',
            innerHTML: locale.getConstant('Indentation')
        });
        this.indentionWholeDiv.appendChild(this.indentLabel);
        this.indentionSubDiv1 = createElement('div', { className: 'e-de-container-row' });
        this.indentionWholeDiv.appendChild(this.indentionSubDiv1);
        this.indentionSubDiv2 = createElement('div', { className: 'e-de-container-row' });
        this.indentionWholeDiv.appendChild(this.indentionSubDiv2);
        this.beforeTextDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.indentionSubDiv1.appendChild(this.beforeTextDiv);
        this.afterTextDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.indentionSubDiv1.appendChild(this.afterTextDiv);
        this.specialDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.indentionSubDiv2.appendChild(this.specialDiv);
        this.byDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.indentionSubDiv2.appendChild(this.byDiv);
        this.spacingDiv = createElement('div');
        this.leftSpacingDiv = createElement('div');
        this.spacingDiv.appendChild(this.leftSpacingDiv);
        // let contextSpacingStyles: string = 'float:left';
        // if (isRtl) {
        //     contextSpacingStyles = 'float:right;';
        // }
        this.contextSpacingDiv = createElement('div', { className: 'e-de-container-row' });
        this.spacingDiv.appendChild(this.contextSpacingDiv);
        this.rightSpacingDiv = createElement('div', { className: 'e-de-container-row' });
        this.spacingDiv.appendChild(this.rightSpacingDiv);
        this.contextInputEle = createElement('input', {
            attrs: { type: 'checkbox' },
            id: ownerId + '_contextSpacing'
        });
        this.contextSpacingDiv.appendChild(this.contextInputEle);
        var leftIndent = createElement('input', { id: ownerId + '_leftIndent', attrs: { 'type': 'text' } });
        var rightIndent = createElement('input', { id: ownerId + '_rightIndent', attrs: { 'type': 'text' } });
        this.beforeTextDiv.appendChild(leftIndent);
        this.beforeTextDiv.setAttribute('aria-labelledby', locale.getConstant('Indent from left'));
        this.afterTextDiv.appendChild(rightIndent);
        this.afterTextDiv.setAttribute('aria-labelledby', locale.getConstant('Indent from right'));
        var special = createElement('select', {
            id: ownerId + '_special',
            innerHTML: '<option value="None">' + locale.getConstant('None') +
                '</option><option value="First Line">' + locale.getConstant('First line') +
                '</option><option value="Hanging">' + locale.getConstant('Hanging') + '</option> '
        });
        this.by = createElement('input', { id: ownerId + '_By', attrs: { 'type': 'text' } });
        this.specialDiv.setAttribute('aria-labelledby', 'Special');
        this.specialDiv.appendChild(special);
        this.byDiv.appendChild(this.by);
        this.byDiv.setAttribute('aria-labelledby', 'By');
        this.spaceLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Spacing') });
        this.spacingWholeDiv = createElement('div', { className: 'e-de-container-row' });
        this.beforeSpacingWholeDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        var beforeSpacing = createElement('input', { id: ownerId + '_beforeSpacing', attrs: { 'type': 'text' } });
        this.afterSpacingWholeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        var afterSpacing = createElement('input', { id: ownerId + '_afterSpacing', attrs: { 'type': 'text' } });
        this.leftSpacingDiv.appendChild(this.spaceLabel);
        this.leftSpacingDiv.appendChild(this.spacingWholeDiv);
        this.beforeSpacingWholeDiv.appendChild(beforeSpacing);
        this.spacingWholeDiv.appendChild(this.beforeSpacingWholeDiv);
        this.afterSpacingWholeDiv.appendChild(afterSpacing);
        this.spacingWholeDiv.appendChild(this.afterSpacingWholeDiv);
        this.lineSpacingDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        var lineSpacing = createElement('select', {
            id: ownerId + '_lineSpacing',
            innerHTML: '<option value="At least">' + locale.getConstant('At least') +
                '</option><option value="Exactly">' + locale.getConstant('Exactly') +
                '</option><option value="Multiple">' + locale.getConstant('Multiple') + '</option>'
        });
        this.lineTypeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.lineSpacingAt = createElement('input', { id: ownerId + '_lineSpacingAt', attrs: { 'type': 'text' } });
        this.lineSpacingDiv.appendChild(lineSpacing);
        this.rightSpacingDiv.appendChild(this.lineSpacingDiv);
        this.lineTypeDiv.appendChild(this.lineSpacingAt);
        this.rightSpacingDiv.appendChild(this.lineTypeDiv);
        this.div.appendChild(this.generalDiv);
        this.div.appendChild(this.indentionWholeDiv);
        this.div.appendChild(this.spacingDiv);
        this.indentContainer.appendChild(this.div);
        this.leftIndentIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1584, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('Before text'), change: this.changeLeftIndent
        });
        this.leftIndentIn.appendTo(leftIndent);
        this.rightIndentIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1584, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('After text'), change: this.changeRightIndent
        });
        this.rightIndentIn.appendTo(rightIndent);
        this.byIn = new NumericTextBox({
            format: 'n1', value: 0, min: 0, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('By'), change: this.changeFirstLineIndent
        });
        this.byIn.appendTo(this.by);
        this.beforeSpacingIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1, max: 1584, step: 6, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('Before'),
            change: this.changeBeforeSpacing,
            focus: this.focusBeforeSpacing,
            blur: this.blurBeforeSpacing,
        });
        this.beforeSpacingIn.appendTo(beforeSpacing);
        this.beforeSpacingSpinDown = this.beforeSpacingWholeDiv.getElementsByClassName("e-input-group-icon e-spin-down")[0];
        this.beforeSpacingSpinDown.addEventListener('click', this.clickBeforeSpacingClickHandler);
        this.afterSpacingIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1, max: 1584, step: 6, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('After'),
            change: this.changeAfterSpacing,
            focus: this.focusAfterSpacing,
            blur: this.blurAfterSpacing
        });
        this.afterSpacingIn.appendTo(afterSpacing);
        this.afterSpacingSpinDown = this.afterSpacingWholeDiv.getElementsByClassName("e-input-group-icon e-spin-down")[0];
        this.afterSpacingSpinDown.addEventListener('click', this.clickAfterSpacingClickHandler);
        this.atIn = new NumericTextBox({
            format: 'n1', value: 0, min: 1, max: 1584, step: 0.5, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('At'), change: this.changeLineSpacingValue
        });
        this.special = new DropDownList({ change: this.changeByValue, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('Special') });
        this.special.appendTo(special);
        this.lineSpacing = new DropDownList({ change: this.changeBySpacing, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('Line Spacing'), htmlAttributes: { 'aria-labelledby': locale.getConstant('Line Spacing') } });
        this.lineSpacing.appendTo(lineSpacing);
        this.alignment = new DropDownList({ change: this.changeByTextAlignment, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('Alignment'), htmlAttributes: { 'aria-labelledby': locale.getConstant('Alignment') } });
        this.alignment.appendTo(alignment);
        this.outlineLevel = new DropDownList({ change: this.changeByOutlineLevel, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('OutlineLevel'), htmlAttributes: { 'aria-labelledby': locale.getConstant('OutlineLevel') } });
        this.outlineLevel.appendTo(outlineLevel);
        this.atIn.appendTo(this.lineSpacingAt);
        this.contextSpacing = new CheckBox({
            change: this.changeContextualSpacing,
            label: locale.getConstant("Contextual Spacing"),
            enableRtl: isRtl
        });
        this.contextSpacing.appendTo(this.contextInputEle);
        this.contextInputEle.setAttribute('aria-labelledby', locale.getConstant("Contextual Spacing"));
        this.indentContainer.addEventListener('keyup', this.instance.keyUpParagraphSettingsClickHandler);
        if (isRtl) {
            this.afterSpacingWholeDiv.classList.add('e-de-rtl');
            this.lineTypeDiv.classList.add('e-de-rtl');
        }
        this.lineBreakContainer = createElement('div', { className: 'e-de-dlg-tab-first-child' });
        var paginationDiv = createElement('div', { className: 'e-de-para-dlg-sub-container' });
        this.paginationDiv = paginationDiv;
        this.paginationLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Pagination') });
        paginationDiv.appendChild(this.paginationLabel);
        this.widowContorlContainer = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(this.widowContorlContainer);
        this.keepNextContainer = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(this.keepNextContainer);
        this.keepLines = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(this.keepLines);
        this.keepWithNext1 = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        this.keepNextContainer.appendChild(this.keepWithNext1);
        this.keepWithNext = new CheckBox({
            change: this.changeKeepWithNext,
            label: locale.getConstant('Keep With Next'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.keepWithNext.appendTo(this.keepWithNext1);
        this.keepWithNext1.setAttribute('aria-label', locale.getConstant('Keep With Next'));
        this.keepLinesTogether1 = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        this.keepLines.appendChild(this.keepLinesTogether1);
        this.keepLinesTogether = new CheckBox({
            change: this.changeKeepLinesTogether,
            label: locale.getConstant('Keep Lines Together'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.keepLinesTogether.appendTo(this.keepLinesTogether1);
        this.keepLinesTogether1.setAttribute('aria-label', locale.getConstant('Keep Lines Together'));
        this.widowControl = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        this.widowContorlContainer.appendChild(this.widowControl);
        this.widowControlIn = new CheckBox({
            change: this.changeWidowControl,
            label: locale.getConstant('WidowControl'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.widowControlIn.appendTo(this.widowControl);
        this.widowControl.setAttribute('aria-label', locale.getConstant('WidowControl'));
        this.lineBreakContainer.appendChild(paginationDiv);
        var items = [
            { header: { text: locale.getConstant('Indents and Spacing') }, content: this.indentContainer },
            { header: { text: locale.getConstant('Line and Page Breaks') }, content: this.lineBreakContainer }
        ];
        this.tabObj = new Tab({ items: items, enableRtl: isRtl, animation: { previous: { effect: 'None' }, next: { effect: 'None' } } }, this.ejtab);
        this.tabObj.isStringTemplate = true;
    };
    ParagraphDialog.prototype.onKeyUpParagraphSettingsClick = function (event) {
        this.keyUpParagraphSettings(event);
    };
    ParagraphDialog.prototype.onClickBeforeSpacingClick = function () {
        this.clickBeforeSpacing();
    };
    ParagraphDialog.prototype.onClickAfterSpacingClick = function () {
        this.clickAfterSpacing();
    };
    ParagraphDialog.prototype.changeAlignmentByBidi = function () {
        if (this.textAlignment === 'Left') {
            this.textAlignment = 'Right';
        }
        else if (this.textAlignment === 'Right') {
            this.textAlignment = 'Left';
        }
        if (!isNullOrUndefined(this.textAlignment)) {
            this.alignment.index = this.getAlignmentValue(this.textAlignment);
        }
        else {
            if (this.alignment.index === 0) {
                this.textAlignment = 'Center';
            }
            else {
                this.textAlignment = 'Justify';
            }
        }
    };
    ParagraphDialog.prototype.getAlignmentValue = function (textAlignment) {
        var alignValue;
        if (textAlignment === 'Center') {
            alignValue = 0;
        }
        else if (textAlignment === 'Left') {
            alignValue = 1;
        }
        else if (textAlignment === 'Right') {
            alignValue = 2;
        }
        else {
            alignValue = 3;
        }
        return alignValue;
    };
    ParagraphDialog.prototype.isHeadingStyle = function () {
        var parastyle = this.documentHelper.selection.paragraphFormat.styleName;
        if (parastyle === 'Heading 1' || parastyle === 'Heading 2' || parastyle === 'Heading 3' || parastyle === 'Heading 4' || parastyle === 'Heading 5' || parastyle === 'Heading 6' || parastyle === 'Heading 7' || parastyle === 'Heading 8' || parastyle === 'Heading 9') {
            return true;
        }
        else {
            return false;
        }
    };
    ParagraphDialog.prototype.getOutlineValue = function (outlineLevel) {
        var alignValue;
        if (outlineLevel === 'BodyText') {
            alignValue = 0;
        }
        else if (outlineLevel === 'Level1') {
            alignValue = 1;
        }
        else if (outlineLevel === 'Level2') {
            alignValue = 2;
        }
        else if (outlineLevel === 'Level3') {
            alignValue = 3;
        }
        else if (outlineLevel === 'Level4') {
            alignValue = 4;
        }
        else if (outlineLevel === 'Level5') {
            alignValue = 5;
        }
        else if (outlineLevel === 'Level6') {
            alignValue = 6;
        }
        else if (outlineLevel === 'Level7') {
            alignValue = 7;
        }
        else if (outlineLevel === 'Level8') {
            alignValue = 8;
        }
        else {
            alignValue = 9;
        }
        return alignValue;
    };
    /**
     * Applies Paragraph Format
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    ParagraphDialog.prototype.onParagraphFormat = function (paragraphFormat) {
        var selection = this.documentHelper.selection;
        if (!isNullOrUndefined(selection) && selection.checkContentControlLocked(true)) {
            return;
        }
        var isListBidi = paragraphFormat.bidi && selection.paragraphFormat.listId !== -1;
        if (!isListBidi) {
            this.documentHelper.layout.isBidiReLayout = true;
        }
        this.documentHelper.owner.editorModule.setPreviousBlockToLayout();
        this.documentHelper.owner.editorModule.initHistory('ParagraphFormat');
        this.documentHelper.owner.isShiftingEnabled = true;
        if (this.documentHelper.selection.isEmpty) {
            this.documentHelper.owner.editorModule.applyParaFormatProperty(selection.start.paragraph, undefined, paragraphFormat, false);
            this.documentHelper.owner.editorModule.isMeasureParaWidth = true;
            this.documentHelper.owner.editorModule.layoutItemBlock(selection.start.paragraph, false);
            this.documentHelper.owner.editorModule.isMeasureParaWidth = true;
        }
        else {
            this.documentHelper.owner.editorModule.updateSelectionParagraphFormatting('ParagraphFormat', paragraphFormat, false);
        }
        this.documentHelper.owner.editorModule.reLayout(selection);
        if (!isListBidi) {
            this.documentHelper.layout.isBidiReLayout = false;
        }
    };
    /**
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    ParagraphDialog.prototype.show = function (paragraphFormat) {
        if (paragraphFormat) {
            this.isStyleDialog = true;
            this.paragraphFormat = paragraphFormat;
        }
        else {
            this.isStyleDialog = false;
        }
        var local = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        local.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initParagraphDialog(local);
        }
        this.loadParagraphDialog();
        this.documentHelper.dialog.header = local.getConstant('Paragraph');
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.buttons = [
            {
                click: this.openTabDialog,
                buttonModel: { content: local.getConstant('Tabs') + '....', cssClass: 'e-flat e-de-para-tab', enableRtl: this.documentHelper.owner.enableRtl }
            },
            {
                click: this.applyParagraphFormat,
                buttonModel: { content: local.getConstant('Ok'), cssClass: 'e-flat e-para-okay', isPrimary: true }
            },
            {
                click: this.closeParagraphDialog,
                buttonModel: { content: local.getConstant('Cancel'), cssClass: 'e-flat e-para-cancel' }
            }
        ];
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.dataBind();
        this.alignment.focusIn();
        this.documentHelper.dialog.show();
        var dialogElement = this.documentHelper.dialog.element;
        if (dialogElement) {
            var width = this.documentHelper.updateDialogTabHeight(dialogElement, this.target);
            this.paginationDiv.style.width = width.toString() + 'px';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ParagraphDialog.prototype.destroy = function () {
        if (this.afterSpacingIn) {
            this.afterSpacingIn.destroy();
            this.afterSpacingIn = undefined;
        }
        if (this.beforeSpacingIn) {
            this.beforeSpacingIn.destroy();
            this.beforeSpacingIn = undefined;
        }
        if (this.leftIndentIn) {
            this.leftIndentIn.destroy();
            this.leftIndentIn = undefined;
        }
        if (this.rightIndentIn) {
            this.rightIndentIn.destroy();
            this.rightIndentIn = undefined;
        }
        if (this.byIn) {
            this.byIn.destroy();
            this.byIn = undefined;
        }
        if (this.special) {
            this.special.destroy();
            this.special = undefined;
        }
        if (this.atIn) {
            this.atIn.destroy();
            this.atIn = undefined;
        }
        if (this.alignment) {
            this.alignment.change = undefined;
            this.alignment.destroy();
        }
        this.alignment = undefined;
        if (this.outlineLevel) {
            this.outlineLevel.change = undefined;
            this.outlineLevel.destroy();
        }
        this.outlineLevel = undefined;
        if (this.lineSpacing) {
            this.lineSpacing.change = undefined;
            this.lineSpacing.destroy();
        }
        this.lineSpacing = undefined;
        if (this.special) {
            this.special.change = undefined;
            this.special.destroy();
        }
        this.removeEvents();
        this.removeElements();
        this.special = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var q = 0; q < this.target.childNodes.length; q++) {
                this.target.removeChild(this.target.childNodes[parseInt(q.toString(), 10)]);
                q--;
            }
            this.target = undefined;
            if (this.paragraphFormat) {
                this.paragraphFormat.destroy();
                this.paragraphFormat = undefined;
            }
            this.documentHelper = undefined;
        }
    };
    ParagraphDialog.prototype.removeEvents = function () {
        if (this.beforeSpacingSpinDown) {
            this.beforeSpacingSpinDown.removeEventListener('click', this.clickBeforeSpacingClickHandler);
        }
        if (this.afterSpacingSpinDown) {
            this.afterSpacingSpinDown.removeEventListener('click', this.clickAfterSpacingClickHandler);
        }
        if (this.indentContainer) {
            this.indentContainer.removeEventListener('keyup', this.instance.keyUpParagraphSettingsClickHandler);
        }
    };
    ParagraphDialog.prototype.removeElements = function () {
        if (this.ejtab) {
            this.ejtab.remove();
            this.ejtab = undefined;
        }
        if (this.div) {
            this.div.remove();
            this.div = undefined;
        }
        if (this.generalDiv) {
            this.generalDiv.remove();
            this.generalDiv = undefined;
        }
        if (this.genLabel) {
            this.genLabel.remove();
            this.genLabel = undefined;
        }
        if (this.alignmentWholeDiv) {
            this.alignmentWholeDiv.remove();
            this.alignmentWholeDiv = undefined;
        }
        if (this.alignmentDiv) {
            this.alignmentDiv.remove();
            this.alignmentDiv = undefined;
        }
        if (this.dirLabel) {
            this.dirLabel.remove();
            this.dirLabel = undefined;
        }
        if (this.rtlDiv) {
            this.rtlDiv.remove();
            this.rtlDiv = undefined;
        }
        if (this.rtlInputELe) {
            this.rtlInputELe.remove();
            this.rtlInputELe = undefined;
        }
        if (this.ltrDiv) {
            this.ltrDiv.remove();
            this.ltrDiv = undefined;
        }
        if (this.ltrInputELe) {
            this.ltrInputELe.remove();
            this.ltrInputELe = undefined;
        }
        if (this.indentionWholeDiv) {
            this.indentionWholeDiv.remove();
            this.indentionWholeDiv = undefined;
        }
        if (this.indentLabel) {
            this.indentLabel.remove();
            this.indentLabel = undefined;
        }
        if (this.indentionSubDiv1) {
            this.indentionSubDiv1.remove();
            this.indentionSubDiv1 = undefined;
        }
        if (this.indentionSubDiv2) {
            this.indentionSubDiv2.remove();
            this.indentionSubDiv2 = undefined;
        }
        if (this.beforeTextDiv) {
            this.beforeTextDiv.remove();
            this.beforeTextDiv = undefined;
        }
        if (this.afterTextDiv) {
            this.afterTextDiv.remove();
            this.afterTextDiv = undefined;
        }
        if (this.specialDiv) {
            this.specialDiv.remove();
            this.specialDiv = undefined;
        }
        if (this.byDiv) {
            this.byDiv.remove();
            this.byDiv = undefined;
        }
        if (this.by) {
            this.by.remove();
            this.by = undefined;
        }
        if (this.spacingDiv) {
            this.spacingDiv.remove();
            this.spacingDiv = undefined;
        }
        if (this.leftSpacingDiv) {
            this.leftSpacingDiv.remove();
            this.leftSpacingDiv = undefined;
        }
        if (this.contextSpacingDiv) {
            this.contextSpacingDiv.remove();
            this.contextSpacingDiv = undefined;
        }
        if (this.rightSpacingDiv) {
            this.rightSpacingDiv.remove();
            this.rightSpacingDiv = undefined;
        }
        if (this.contextInputEle) {
            this.contextInputEle.remove();
            this.contextInputEle = undefined;
        }
        if (this.spaceLabel) {
            this.spaceLabel.remove();
            this.spaceLabel = undefined;
        }
        if (this.spacingWholeDiv) {
            this.spacingWholeDiv.remove();
            this.spacingWholeDiv = undefined;
        }
        if (this.beforeSpacingWholeDiv) {
            this.beforeSpacingWholeDiv.remove();
            this.beforeSpacingWholeDiv = undefined;
        }
        if (this.afterSpacingWholeDiv) {
            this.afterSpacingWholeDiv.remove();
            this.afterSpacingWholeDiv = undefined;
        }
        if (this.lineSpacingDiv) {
            this.lineSpacingDiv.remove();
            this.lineSpacingDiv = undefined;
        }
        if (this.lineTypeDiv) {
            this.lineTypeDiv.remove();
            this.lineTypeDiv = undefined;
        }
        if (this.lineSpacingAt) {
            this.lineSpacingAt.remove();
            this.lineSpacingAt = undefined;
        }
        if (this.lineBreakContainer) {
            this.lineBreakContainer.remove();
            this.lineBreakContainer = undefined;
        }
        if (this.paginationLabel) {
            this.paginationLabel.remove();
            this.paginationLabel = undefined;
        }
        if (this.widowContorlContainer) {
            this.widowContorlContainer.remove();
            this.widowContorlContainer = undefined;
        }
        if (this.keepNextContainer) {
            this.keepNextContainer.remove();
            this.keepNextContainer = undefined;
        }
        if (this.keepLines) {
            this.keepLines.remove();
            this.keepLines = undefined;
        }
        if (this.widowControl) {
            this.widowControl.remove();
            this.widowControl = undefined;
        }
        if (this.keepWithNext1) {
            this.keepWithNext1.remove();
            this.keepWithNext1 = undefined;
        }
        if (this.keepLinesTogether1) {
            this.keepLinesTogether1.remove();
            this.keepLinesTogether1 = undefined;
        }
        if (this.beforeSpacingSpinDown) {
            this.beforeSpacingSpinDown.remove();
            this.beforeSpacingSpinDown = undefined;
        }
        if (this.afterSpacingSpinDown) {
            this.afterSpacingSpinDown.remove();
            this.afterSpacingSpinDown = undefined;
        }
        if (this.indentContainer) {
            this.indentContainer.remove();
            this.indentContainer = undefined;
        }
    };
    return ParagraphDialog;
}());
export { ParagraphDialog };
