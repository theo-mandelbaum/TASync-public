import { createElement, isNullOrUndefined, L10n, initializeCSPTemplate, updateCSSText } from '@syncfusion/ej2-base';
import { DropDownList, ComboBox } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { WCharacterStyle, WParagraphStyle } from '../../implementation/format/style';
import { internalStyleCollectionChange } from '../../base/index';
import { BulletsAndNumberingDialog } from './index';
import { Query } from '@syncfusion/ej2-data';
import { WAbstractList } from '../list/abstract-list';
import { WParagraphFormat } from '../index';
import { ColorPicker, TextBox } from '@syncfusion/ej2-inputs';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
// eslint-disable-next-line valid-jsdoc
/**
 * The Style dialog is used to create or modify styles.
 */
var StyleDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function StyleDialog(documentHelper) {
        var _this = this;
        this.target = undefined;
        this.styleType = undefined;
        this.styleBasedOn = undefined;
        this.styleParagraph = undefined;
        this.onlyThisDocument = undefined;
        this.template = undefined;
        this.fontFamily = undefined;
        this.fontSize = undefined;
        this.characterFormat = undefined;
        this.paragraphFormat = undefined;
        this.textAlignment = undefined;
        this.lineSpacing = undefined;
        this.leftIndent = undefined;
        this.beforeSpacing = undefined;
        this.afterSpacing = undefined;
        this.setLeftAlignmentClickHandler = this.onSetLeftAlignmentClick.bind(this);
        this.setCenterAlignmentClickHandler = this.onSetCenterAlignmentClick.bind(this);
        this.setRightAlignmentClickHandler = this.onSetRightAlignmentClick.bind(this);
        this.setJustifyAlignmentClickHandler = this.onSetJustifyAlignmentClick.bind(this);
        this.setSingleLineSpacingClickHandler = this.setSingleLineSpacing.bind(this);
        this.setOnePointFiveLineSpacingClickHandler = this.setOnePointFiveLineSpacing.bind(this);
        this.setDoubleLineSpacingClickHandler = this.setDoubleLineSpacing.bind(this);
        this.increaseIndentValueHandler = this.increaseIndentValue.bind(this);
        this.decreaseIndentValueHandler = this.decreaseIndentValue.bind(this);
        this.increaseBeforeAfterSpacingValueHandler = this.onIncreaseBeforeAfterSpacing.bind(this);
        this.decreaseBeforeAfterSpacingValueHandler = this.onDecreaseBeforeAfterSpacing.bind(this);
        this.setUnderlinePropertyHandler = this.onSetUnderlineProperty.bind(this);
        this.setItalicPropertyHandler = this.onSetItalicProperty.bind(this);
        this.setBoldPropertyHandler = this.onSetBoldProperty.bind(this);
        this.openDialogHandler = this.onOpenDialog.bind(this);
        this.updateOkButtonClickHandler = this.onUpdateOkButtonClick.bind(this);
        this.updateNextStyleHandler = this.onUpdateNextStyle.bind(this);
        /**
         *
         * @param {DropDownButtonMenuEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.openDialog = function (args) {
            switch (args.item.id) {
                case 'style_font':
                    _this.showFontDialog();
                    break;
                case 'style_paragraph':
                    _this.showParagraphDialog();
                    break;
                case 'style_numbering':
                    _this.showNumberingBulletDialog();
                    break;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.setBoldProperty = function () {
            _this.characterFormat.bold = !_this.characterFormat.bold;
            _this.fontButtonClicked();
        };
        /**
         * @private
         * @returns {void}
         */
        this.setItalicProperty = function () {
            _this.characterFormat.italic = !_this.characterFormat.italic;
            _this.fontButtonClicked();
        };
        /**
         * @private
         * @returns {void}
         */
        this.setUnderlineProperty = function () {
            _this.characterFormat.underline = _this.characterFormat.underline === 'None' ? 'Single' : 'None';
            _this.fontButtonClicked();
        };
        /**
         * @private
         * @returns {void}
         */
        this.fontButtonClicked = function () {
            if (_this.characterFormat.bold) {
                if (!_this.bold.classList.contains('e-active')) {
                    _this.bold.classList.add('e-active');
                }
            }
            else {
                if (_this.bold.classList.contains('e-active')) {
                    _this.bold.classList.remove('e-active');
                }
            }
            if (_this.characterFormat.italic) {
                if (!_this.italic.classList.contains('e-active')) {
                    _this.italic.classList.add('e-active');
                }
            }
            else {
                if (_this.italic.classList.contains('e-active')) {
                    _this.italic.classList.remove('e-active');
                }
            }
            if (_this.characterFormat.underline !== undefined && _this.characterFormat.underline !== 'None') {
                if (!_this.underline.classList.contains('e-active')) {
                    _this.underline.classList.add('e-active');
                    _this.characterFormat.underline = 'Single';
                }
            }
            else {
                if (_this.underline.classList.contains('e-active')) {
                    _this.underline.classList.remove('e-active');
                    _this.characterFormat.underline = 'None';
                }
            }
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.fontSizeUpdate = function (args) {
            _this.characterFormat.fontSize = args.value;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.fontFamilyChanged = function (args) {
            _this.characterFormat.fontFamily = args.value.toString();
        };
        /**
         * @private
         * @param {ColorPickerEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.fontColorUpdate = function (args) {
            _this.characterFormat.fontColor = args.currentValue.hex;
        };
        /**
         * @private
         * @returns {void}
         */
        this.setLeftAlignment = function () {
            if (_this.textAlignment === 'Left') {
                _this.textAlignment = 'Justify';
            }
            else {
                _this.textAlignment = 'Left';
            }
            _this.updateParagraphFormat();
        };
        /**
         * @private
         * @returns {void}
         */
        this.setRightAlignment = function () {
            if (_this.textAlignment === 'Right') {
                _this.textAlignment = 'Left';
            }
            else {
                _this.textAlignment = 'Right';
            }
            _this.updateParagraphFormat();
        };
        /**
         * @private
         * @returns {void}
         */
        this.setCenterAlignment = function () {
            if (_this.textAlignment === 'Center') {
                _this.textAlignment = 'Left';
            }
            else {
                _this.textAlignment = 'Center';
            }
            _this.updateParagraphFormat();
        };
        /**
         * @private
         * @returns {void}
         */
        this.setJustifyAlignment = function () {
            if (_this.textAlignment === 'Justify') {
                _this.textAlignment = 'Left';
            }
            else {
                _this.textAlignment = 'Justify';
            }
            _this.updateParagraphFormat();
        };
        /**
         * @private
         * @returns {void}
         */
        this.increaseBeforeAfterSpacing = function () {
            _this.beforeSpacing += 6;
            _this.afterSpacing += 6;
        };
        /**
         * @private
         * @returns {void}
         */
        this.decreaseBeforeAfterSpacing = function () {
            if (_this.beforeSpacing >= 6) {
                _this.beforeSpacing -= 6;
            }
            else {
                _this.beforeSpacing = 0;
            }
            if (_this.afterSpacing >= 6) {
                _this.afterSpacing -= 6;
            }
            else {
                _this.afterSpacing = 0;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.updateNextStyle = function (args) {
            var typedName = args.srcElement.value;
            if (_this.getTypeValue() === _this.localObj.getConstant('Paragraph') && !isNullOrUndefined(typedName) && typedName !== '' && !_this.isUserNextParaUpdated) {
                var styles = _this.documentHelper.styles.getStyleNames(_this.getTypeValue());
                if (_this.isEdit) {
                    styles = styles.filter(function (e) { return e !== _this.editStyleName; });
                }
                styles.push(typedName);
                _this.styleParagraph.dataSource = styles;
                _this.styleParagraph.index = null;
                _this.styleParagraph.index = styles.indexOf(typedName);
                // this.styleParagraph.dataBind();
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.updateOkButton = function () {
            var styleName = _this.target.getElementsByClassName('e-input e-de-style-dlg-name-input').item(0).value;
            _this.enableOrDisableOkButton();
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.styleTypeChange = function (args) {
            if (args.isInteracted) {
                var type = void 0;
                if (args.value === 'Character') {
                    _this.style = new WCharacterStyle();
                    type = 'Character';
                }
                if (args.value === 'Paragraph' || args.value === 'Linked Style') {
                    _this.style = new WParagraphStyle();
                    type = 'Paragraph';
                }
                _this.toggleDisable();
                _this.updateStyleNames(type);
            }
        };
        /**
         * @returns {void}
         */
        this.styleBasedOnChange = function () {
            //Based on change
        };
        /**
         * @private
         * @param {SelectEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.styleParagraphChange = function (args) {
            if (args.isInteracted) {
                _this.isUserNextParaUpdated = true;
            }
            //Next change
        };
        /**
         * @private
         * @returns {void}
         */
        this.showFontDialog = function () {
            if (!isNullOrUndefined(_this.documentHelper.owner.fontDialogModule)) {
                _this.documentHelper.owner.showFontDialog(_this.characterFormat);
            }
            _this.updateCharacterFormat();
        };
        /**
         * @private
         * @returns {void}
         */
        this.showParagraphDialog = function () {
            if (!isNullOrUndefined(_this.documentHelper.owner.paragraphDialogModule)) {
                _this.documentHelper.owner.showParagraphDialog(_this.paragraphFormat);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.showNumberingBulletDialog = function () {
            _this.numberingBulletDialog = new BulletsAndNumberingDialog(_this.documentHelper);
            if (_this.style instanceof WParagraphStyle && (!isNullOrUndefined(_this.style.paragraphFormat))) {
                _this.numberingBulletDialog.showNumberBulletDialog(_this.style.paragraphFormat.listFormat, _this.abstractList);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.onOkButtonClick = function () {
            var styleName = _this.documentHelper.owner.stylesDialogModule.getStyleName(SanitizeHtmlHelper.sanitize(_this.styleNameElement.value));
            if (styleName.length > 0) {
                var style = _this.documentHelper.styles.findByName(styleName);
                var name_1;
                if (!isNullOrUndefined(style)) {
                    _this.documentHelper.owner.editorHistoryModule.initializeHistory('ModifyStyle');
                    if (_this.styleType.value === 'Paragraph' || _this.styleType.value === 'Linked Style') {
                        _this.updateList();
                    }
                    if (_this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo && _this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.action === 'ModifyStyle') {
                        var listId_1 = style instanceof WParagraphStyle ? style.paragraphFormat.listFormat.listId : -1;
                        var styleObject = _this.documentHelper.owner.getStyleObject(style, listId_1);
                        _this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.modifiedProperties.push(styleObject);
                        _this.applyParagraphFormat();
                    }
                    _this.documentHelper.owner.editorHistoryModule.updateHistory();
                    _this.style.type = _this.getTypeValue();
                    _this.style.basedOn = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleBasedOn.value));
                    if (_this.styleType.value === 'Paragraph' || _this.styleType.value === 'Linked Style') {
                        _this.style.next = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleParagraph.value));
                        _this.style.characterFormat.assignFormat(_this.characterFormat);
                        _this.style.paragraphFormat.assignFormat(_this.paragraphFormat, true);
                        _this.style.link = (_this.styleType.value === 'Linked Style') ? _this.createLinkStyle(styleName, _this.isEdit) : undefined;
                    }
                    //Updating existing style implementation
                    _this.style.name = style.name;
                    name_1 = style.name;
                    style = _this.style;
                    var listId = _this.style instanceof WParagraphStyle ? _this.style.paragraphFormat.listFormat.listId : -1;
                    _this.documentHelper.owner.setStyleData(name_1, listId);
                    _this.documentHelper.owner.isShiftingEnabled = true;
                    _this.documentHelper.owner.editorModule.isSkipOperationsBuild = _this.documentHelper.owner.enableCollaborativeEditing;
                    _this.documentHelper.owner.editorModule.layoutWholeDocument();
                    _this.documentHelper.owner.editorModule.isSkipOperationsBuild = false;
                    _this.documentHelper.owner.isShiftingEnabled = false;
                }
                else {
                    var tmpStyle = _this.getTypeValue() === 'Paragraph' ? new WParagraphStyle() : new WCharacterStyle;
                    tmpStyle.copyStyle(_this.style);
                    if (_this.getTypeValue() === 'Character') {
                        tmpStyle.characterFormat.copyFormat(_this.characterFormat);
                    }
                    var basedOn = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleBasedOn.value));
                    if (_this.styleType.value === 'Paragraph' || _this.styleType.value === 'Linked Style') {
                        if (styleName === _this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleParagraph.value)) {
                            tmpStyle.next = tmpStyle;
                        }
                        else {
                            tmpStyle.next = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleParagraph.value));
                        }
                        _this.updateList();
                    }
                    tmpStyle.link = (_this.styleType.value === 'Linked Style') ? _this.createLinkStyle(styleName) : undefined;
                    tmpStyle.type = _this.getTypeValue();
                    tmpStyle.name = styleName;
                    tmpStyle.basedOn = basedOn;
                    tmpStyle.characterFormat = _this.characterFormat;
                    tmpStyle.paragraphFormat = _this.paragraphFormat;
                    _this.documentHelper.styles.push(tmpStyle);
                    _this.documentHelper.addToStylesMap(tmpStyle);
                    name_1 = styleName;
                    _this.documentHelper.owner.editorHistoryModule.initializeHistory('ModifyStyle');
                    if (_this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo && _this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.action === 'ModifyStyle') {
                        var listId_2 = tmpStyle instanceof WParagraphStyle ? tmpStyle.paragraphFormat.listFormat.listId : -1;
                        var styleObject = _this.documentHelper.owner.getStyleObject(tmpStyle, listId_2);
                        styleObject["isNew"] = true;
                        _this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.modifiedProperties.push(styleObject);
                        _this.applyParagraphFormat();
                    }
                    _this.documentHelper.owner.editorHistoryModule.updateHistory();
                    var listId = _this.style instanceof WParagraphStyle ? _this.style.paragraphFormat.listFormat.listId : -1;
                    _this.documentHelper.owner.setStyleData(name_1, listId);
                    _this.documentHelper.owner.editorModule.isSkipOperationsBuild = _this.styleType.value === 'Character' && _this.documentHelper.owner.enableCollaborativeEditing;
                    _this.documentHelper.owner.editorModule.applyStyle(name_1, true);
                    _this.documentHelper.owner.editorModule.isSkipOperationsBuild = false;
                    _this.documentHelper.owner.notify(internalStyleCollectionChange, {});
                }
                _this.documentHelper.dialog2.hide();
                _this.documentHelper.updateFocus();
            }
            else {
                throw new Error('Enter valid Style name');
            }
            if (_this.style) {
                //this.style.destroy();
            }
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.loadStyleDialog = function () {
            _this.documentHelper.updateFocus();
            _this.isUserNextParaUpdated = false;
            _this.styleNameElement = _this.target.getElementsByClassName('e-input e-de-style-dlg-name-input').item(0);
            _this.styleNameElement.value = null;
            if (!_this.isEdit) {
                _this.styleType.index = 0; //Set to paragraph            
            }
            var name;
            if (_this.isEdit) {
                var localValue = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
                localValue.setLocale(_this.documentHelper.owner.locale);
                var styleName = localValue.getConstant(_this.editStyleName);
                if (styleName === '') {
                    styleName = _this.editStyleName;
                }
                _this.styleNameElement.value = styleName;
                name = _this.editStyleName;
            }
            _this.okButton = _this.documentHelper.dialog2.element.getElementsByClassName('e-flat e-style-okay').item(0);
            _this.enableOrDisableOkButton();
            _this.updateStyleNames(_this.getTypeValue(), name);
            _this.updateCharacterFormat(_this.style.characterFormat);
            _this.updateParagraphFormat(_this.style.paragraphFormat);
        };
        this.applyParagraphFormat = function () {
            if (isNullOrUndefined(_this.paragraphFormat)) {
                _this.paragraphFormat = new WParagraphFormat();
            }
            if (!isNullOrUndefined(_this.textAlignment)) {
                _this.paragraphFormat.textAlignment = _this.textAlignment;
            }
            if (!isNullOrUndefined(_this.beforeSpacing)) {
                _this.paragraphFormat.beforeSpacing = _this.beforeSpacing;
            }
            if (!isNullOrUndefined(_this.afterSpacing)) {
                _this.paragraphFormat.afterSpacing = _this.afterSpacing;
            }
            if (!isNullOrUndefined(_this.leftIndent)) {
                _this.paragraphFormat.leftIndent = _this.leftIndent;
            }
            if (!isNullOrUndefined(_this.lineSpacing)) {
                _this.paragraphFormat.lineSpacing = _this.lineSpacing;
            }
            _this.updateParagraphFormat();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            // if (!this.isEdit && this.style) {
            _this.style = undefined;
            _this.characterFormat = undefined;
            _this.paragraphFormat = undefined;
            _this.textAlignment = undefined;
            _this.lineSpacing = undefined;
            _this.leftIndent = undefined;
            _this.beforeSpacing = undefined;
            _this.afterSpacing = undefined;
            // }
            _this.documentHelper.dialog2.hide();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeStyleDialog = function () {
            _this.documentHelper.updateFocus();
            _this.textAlignment = undefined;
            _this.lineSpacing = undefined;
            _this.leftIndent = undefined;
            _this.beforeSpacing = undefined;
            _this.afterSpacing = undefined;
        };
        this.documentHelper = documentHelper;
    }
    /**
     * @private
     * @returns {string} Returns module name
     */
    StyleDialog.prototype.getModuleName = function () {
        return 'StyleDialog';
    };
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    /* eslint-disable  */
    StyleDialog.prototype.initStyleDialog = function (localValue, isRtl) {
        var instance = this;
        this.localObj = localValue;
        this.target = createElement('div', { className: 'e-de-style-dialog' });
        this.container = createElement('div');
        this.properties = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localValue.getConstant('Properties') });
        this.container.appendChild(this.properties);
        this.styleNameTypeDiv = createElement('div', { className: 'e-de-container-row' });
        this.container.appendChild(this.styleNameTypeDiv);
        this.nameWholeDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.styleNameTypeDiv.appendChild(this.nameWholeDiv);
        // let name: HTMLElement = createElement('div', { className: 'e-de-style-name', innerHTML: localValue.getConstant('Name') + ':' });
        // nameWholeDiv.appendChild(name);
        this.nameValue = createElement('input', { className: 'e-input e-de-style-dlg-name-input' });
        this.nameValue.addEventListener('keyup', this.updateOkButtonClickHandler);
        this.nameValue.addEventListener('input', this.updateOkButtonClickHandler);
        this.nameValue.addEventListener('blur', this.updateNextStyleHandler);
        this.nameWholeDiv.appendChild(this.nameValue);
        new TextBox({ placeholder: localValue.getConstant('Name') + ':', floatLabelType: 'Always' }, this.nameValue);
        this.styleTypeWholeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.styleNameTypeDiv.appendChild(this.styleTypeWholeDiv);
        // let styleType: HTMLElement = createElement('div', { className: 'e-de-style-styletype', innerHTML:  });
        // styleTypeWholeDiv.appendChild(styleType);
        this.styleTypeDivElement = createElement('div');
        this.styleTypeValue = createElement('select');
        this.styleTypeValue.innerHTML = '<option value="Paragraph">' + localValue.getConstant('Paragraph') + '</option><option value="Character">' + localValue.getConstant('Character') + '</option><option value="Linked Style">' + localValue.getConstant('Linked Style') + '</option>';
        this.styleTypeDivElement.appendChild(this.styleTypeValue);
        this.styleType = new DropDownList({
            change: this.styleTypeChange,
            popupHeight: '253px', enableRtl: isRtl,
            placeholder: localValue.getConstant('Style type') + ':', floatLabelType: 'Always'
        });
        this.styleType.appendTo(this.styleTypeValue);
        this.styleTypeWholeDiv.appendChild(this.styleTypeDivElement);
        this.styleBasedParaDiv = createElement('div', { className: 'e-de-container-row' });
        this.container.appendChild(this.styleBasedParaDiv);
        this.styleBasedOnWholeDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.styleBasedParaDiv.appendChild(this.styleBasedOnWholeDiv);
        //let styleBasedOn: HTMLElement = createElement('div', { className: 'e-de-style-style-based-on', innerHTML:  });
        //styleBasedOnWholeDiv.appendChild(styleBasedOn);
        this.styleBasedOnDivElement = createElement('div', { className: 'e-de-style-style-based-on-div' });
        this.styleBasedOnValue = createElement('input');
        //styleBasedOnValue.innerHTML = '<option>Normal</option><option>Heading 1</option><option>Heading 2</option><option>Heading 3</option><option>Heading 4</option><option>Heading 5</option><option>Heading 6</option>';
        this.styleBasedOnDivElement.appendChild(this.styleBasedOnValue);
        this.styleBasedOn = new DropDownList({
            dataSource: [], select: this.styleBasedOnChange, popupHeight: '253px', enableRtl: isRtl,
            placeholder: localValue.getConstant('Style based on') + ':', floatLabelType: 'Always'
        });
        this.styleBasedOn.appendTo(this.styleBasedOnValue);
        this.styleBasedOnWholeDiv.appendChild(this.styleBasedOnDivElement);
        this.styleParagraphWholeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.styleBasedParaDiv.appendChild(this.styleParagraphWholeDiv);
        if (isRtl) {
            this.nameWholeDiv.classList.add('e-de-rtl');
            this.styleBasedOnWholeDiv.classList.add('e-de-rtl');
            this.styleParagraphWholeDiv.classList.add('e-de-rtl');
        }
        //let styleParagraph: HTMLElement = createElement('div', { className: 'e-de-style-style-paragraph', innerHTML: });
        //styleParagraphWholeDiv.appendChild(styleParagraph);
        this.styleParagraphDivElement = createElement('div');
        this.styleParagraphValue = createElement('input');
        //styleParagraphValue.innerHTML = '<option>Normal</option><option>Heading 1</option><option>Heading 2</option><option>Heading 3</option><option>Heading 4</option><option>Heading 5</option><option>Heading 6</option>';
        this.styleParagraphDivElement.appendChild(this.styleParagraphValue);
        this.styleParagraph = new DropDownList({
            dataSource: [], select: this.styleParagraphChange, popupHeight: '253px', enableRtl: isRtl,
            placeholder: localValue.getConstant('Style for following paragraph') + ':', floatLabelType: 'Always'
        });
        this.styleParagraph.appendTo(this.styleParagraphValue);
        this.styleParagraphWholeDiv.appendChild(this.styleParagraphDivElement);
        this.formatting = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localValue.getConstant('Formatting') });
        this.container.appendChild(this.formatting);
        this.optionsDiv = createElement('div', { className: 'e-de-style-options-div' });
        this.container.appendChild(this.optionsDiv);
        this.fontOptionsDiv = createElement('div', { styles: 'display:flex;margin-bottom: 14px;' });
        this.optionsDiv.appendChild(this.fontOptionsDiv);
        this.createFontOptions(this.fontOptionsDiv, isRtl);
        this.paragraphOptionsDiv = createElement('div', { styles: 'display:flex', className: 'e-style-paragraph' });
        this.optionsDiv.appendChild(this.paragraphOptionsDiv);
        this.createParagraphOptions(this.paragraphOptionsDiv);
        // let radioOptionsDiv: HTMLElement = createElement('div', { styles: 'display:flex' });
        // container.appendChild(radioOptionsDiv);
        // let onlyThisDocumentDiv: HTMLElement = createElement('div', { className: 'e-de-style-radio-button' });
        // let onlyThisDocument: HTMLInputElement = createElement('input', { className: 'e-de-style-only-this-doc', attrs: { type: 'radio' } }) as HTMLInputElement;
        // onlyThisDocumentDiv.appendChild(onlyThisDocument);
        // this.onlyThisDocument = new RadioButton({ label: 'Only in this document', value: 'only in this document', checked: true, name: 'styles' });
        // this.onlyThisDocument.appendTo(onlyThisDocument);
        // radioOptionsDiv.appendChild(onlyThisDocumentDiv);
        // let templateDiv: HTMLElement = createElement('div', { className: 'e-de-style-radio-button' });
        // let template: HTMLInputElement = createElement('input', { className: 'e-de-style-temp', attrs: { type: 'radio' } }) as HTMLInputElement;
        // templateDiv.appendChild(template);
        // this.template = new RadioButton({ label: 'Template', value: 'template', name: 'styles' });
        // this.template.appendTo(template);
        // radioOptionsDiv.appendChild(templateDiv);
        this.createFormatDropdown(this.container, localValue, isRtl);
        this.target.appendChild(this.container);
    };
    StyleDialog.prototype.createFormatDropdown = function (parentDiv, localValue, isRtl) {
        var _this = this;
        this.formatBtn = createElement('button', {
            id: 'style_format_dropdown', innerHTML: localValue.getConstant('Format'),
            attrs: { type: 'button' }
        });
        this.formatBtn.style.height = '31px';
        parentDiv.appendChild(this.formatBtn);
        var items = [{ text: localValue.getConstant('Font') + '...', id: 'style_font' },
            { text: localValue.getConstant('Paragraph') + '...', id: 'style_paragraph' },
            { text: localValue.getConstant('Numbering') + '...', id: 'style_numbering' }];
        this.styleDropdwn = new DropDownButton({
            items: items, cssClass: 'e-de-style-format-dropdwn', enableRtl: isRtl,
            beforeItemRender: function (args) {
                if (_this.styleType.value === localValue.getConstant('Character')) {
                    if (args.item.id === "style_paragraph") {
                        args.element.classList.add('e-disabled');
                    }
                    if (args.item.id === 'style_numbering') {
                        args.element.classList.add('e-disabled');
                    }
                }
                else {
                    if (args.item.id === "style_paragraph") {
                        args.element.classList.remove('e-disabled');
                    }
                    if (args.item.id === 'style_numbering') {
                        args.element.classList.remove('e-disabled');
                    }
                }
            },
        });
        this.styleDropdwn.appendTo(this.formatBtn);
        this.styleDropdwn.addEventListener('select', this.openDialogHandler);
    };
    StyleDialog.prototype.onOpenDialog = function (args) {
        this.openDialog(args);
    };
    StyleDialog.prototype.createFontOptions = function (parentDiv, isRtl) {
        var _this = this;
        this.fontFamilyElement = createElement('input', {
            id: this.target.id + '_fontName',
        });
        var fontStyle;
        var isStringTemplate = true;
        var itemTemplate = initializeCSPTemplate(function (data) { return "<span style=\"font-family: " + data.FontName + ";\">" + data.FontName + "</span>"; });
        parentDiv.appendChild(this.fontFamilyElement);
        this.fontFamily = new ComboBox({
            dataSource: fontStyle, query: new Query().select(['FontName']), fields: { text: 'FontName', value: 'value' },
            allowCustom: true, width: '123px', popupWidth: '123px',
            cssClass: 'e-style-font-fmaily-right', enableRtl: isRtl, change: this.fontFamilyChanged,
            showClearButton: false, itemTemplate: itemTemplate
        });
        this.fontFamily.appendTo(this.fontFamilyElement);
        this.fontFamily.isStringTemplate = isStringTemplate;
        var fontFamilyValue = this.documentHelper.owner.documentEditorSettings.fontFamilies;
        for (var i = 0; i < fontFamilyValue.length; i++) {
            var fontValue = fontFamilyValue[i];
            var fontStyleValue = { 'FontName': fontValue, 'value': fontValue };
            this.fontFamily.addItem(fontStyleValue, i);
        }
        this.fontFamily.focus = function () { _this.fontFamily.element.select(); };
        this.fontFamily.element.parentElement.setAttribute('title', this.localObj.getConstant('Font'));
        this.fontSizeElement = createElement('input');
        parentDiv.appendChild(this.fontSizeElement);
        var sizeDataSource = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
        this.fontSize = new ComboBox({
            dataSource: sizeDataSource, width: '73px', cssClass: 'e-style-font-fmaily-right',
            enableRtl: isRtl, change: this.fontSizeUpdate
        });
        this.fontSize.showClearButton = false;
        this.fontSize.appendTo(this.fontSizeElement);
        this.fontGroupButton = createElement('div', { className: 'e-de-style-font-group-button' });
        parentDiv.appendChild(this.fontGroupButton);
        this.bold = this.createButtonElement(this.fontGroupButton, 'e-de-bold', 'e-de-style-bold-button-size', this.documentHelper.owner.containerId + '_style_bold');
        this.bold.setAttribute('aria-label', 'bold');
        this.bold.addEventListener('click', this.setBoldPropertyHandler);
        this.italic = this.createButtonElement(this.fontGroupButton, 'e-de-italic', 'e-de-style-icon-button-size', this.documentHelper.owner.containerId + '_style_italic');
        this.italic.setAttribute('aria-label', 'italic');
        this.italic.addEventListener('click', this.setItalicPropertyHandler);
        this.underline = this.createButtonElement(this.fontGroupButton, 'e-de-underline', 'e-de-style-icon-button-size', this.documentHelper.owner.containerId + '_style_underline');
        this.underline.setAttribute('aria-label', 'underline');
        this.underline.addEventListener('click', this.setUnderlinePropertyHandler);
        this.fontColorElement = createElement('input', { attrs: { type: 'color' }, className: 'e-de-style-icon-button-size' });
        parentDiv.appendChild(this.fontColorElement);
        var _a = this.documentHelper.owner.documentEditorSettings.colorPickerSettings, columns = _a.columns, createPopupOnClick = _a.createPopupOnClick, disabled = _a.disabled, enablePersistence = _a.enablePersistence, enableRtl = _a.enableRtl, inline = _a.inline, mode = _a.mode, modeSwitcher = _a.modeSwitcher, noColor = _a.noColor, presetColors = _a.presetColors, showButtons = _a.showButtons;
        this.fontColor = new ColorPicker({ cssClass: 'e-de-style-font-color-picker', enableRtl: isRtl, change: this.fontColorUpdate, locale: this.documentHelper.owner.locale, enableOpacity: false, mode: mode, modeSwitcher: modeSwitcher, showButtons: showButtons, columns: columns, createPopupOnClick: createPopupOnClick, disabled: disabled, enablePersistence: enablePersistence, inline: inline, noColor: noColor, presetColors: presetColors });
        this.documentHelper.fontColor = this.fontColor;
        this.fontColor.appendTo(this.fontColorElement);
    };
    StyleDialog.prototype.onSetBoldProperty = function () {
        this.setBoldProperty();
    };
    StyleDialog.prototype.onSetItalicProperty = function () {
        this.setItalicProperty();
    };
    StyleDialog.prototype.onSetUnderlineProperty = function () {
        this.setUnderlineProperty();
    };
    StyleDialog.prototype.createParagraphOptions = function (parentDiv) {
        this.alignmentDiv = createElement('div', { className: 'e-de-style-paragraph-group-button' });
        parentDiv.appendChild(this.alignmentDiv);
        this.leftAlign = this.createButtonElement(this.alignmentDiv, 'e-de-align-left', 'e-de-style-icon-button-size');
        this.leftAlign.setAttribute('aria-label', 'leftAlign');
        this.leftAlign.addEventListener('click', this.setLeftAlignmentClickHandler);
        this.centerAlign = this.createButtonElement(this.alignmentDiv, 'e-de-align-center', 'e-de-style-icon-button-size');
        this.centerAlign.setAttribute('aria-label', 'centerAlign');
        this.centerAlign.addEventListener('click', this.setCenterAlignmentClickHandler);
        this.rightAlign = this.createButtonElement(this.alignmentDiv, 'e-de-align-right', 'e-de-style-icon-button-size');
        this.rightAlign.setAttribute('aria-label', 'rightAlign');
        this.rightAlign.addEventListener('click', this.setRightAlignmentClickHandler);
        this.justify = this.createButtonElement(this.alignmentDiv, 'e-de-justify', 'e-de-style-icon-button-last-size');
        this.justify.setAttribute('aria-label', 'justify');
        this.justify.addEventListener('click', this.setJustifyAlignmentClickHandler);
        this.lineSpacingDiv = createElement('div', { className: 'e-de-style-paragraph-group-button' });
        parentDiv.appendChild(this.lineSpacingDiv);
        this.singleLineSpacing = this.createButtonElement(this.lineSpacingDiv, 'e-de-single-spacing', 'e-de-style-icon-button-first-size');
        this.singleLineSpacing.setAttribute('aria-label', 'singleLineSpacing');
        this.singleLineSpacing.addEventListener('click', this.setSingleLineSpacingClickHandler);
        this.onePointFiveLineSpacing = this.createButtonElement(this.lineSpacingDiv, 'e-de-one-point-five-spacing', 'e-de-style-icon-button-size');
        this.onePointFiveLineSpacing.setAttribute('aria-label', 'onePointFiveLineSpacing');
        this.onePointFiveLineSpacing.addEventListener('click', this.setOnePointFiveLineSpacingClickHandler);
        this.doubleLineSpacing = this.createButtonElement(this.lineSpacingDiv, 'e-de-double-spacing', 'e-de-style-icon-button-last-size');
        this.doubleLineSpacing.setAttribute('aria-label', 'doubleLineSpacing');
        this.doubleLineSpacing.addEventListener('click', this.setDoubleLineSpacingClickHandler);
        this.spacingDiv = createElement('div', { className: 'e-de-style-paragraph-group-button' });
        parentDiv.appendChild(this.spacingDiv);
        this.beforeSpacingEle = this.createButtonElement(this.spacingDiv, 'e-de-before-spacing', 'e-de-style-icon-button-first-size');
        this.beforeSpacingEle.setAttribute('aria-label', 'beforeSpacing');
        this.afterSpacingEle = this.createButtonElement(this.spacingDiv, 'e-de-after-spacing', 'e-de-style-icon-button-last-size');
        this.afterSpacingEle.setAttribute('aria-label', 'afterSpacing');
        this.beforeSpacingEle.addEventListener('click', this.increaseBeforeAfterSpacingValueHandler);
        this.afterSpacingEle.addEventListener('click', this.decreaseBeforeAfterSpacingValueHandler);
        this.indentingDiv = createElement('div', { className: 'e-de-style-paragraph-indent-group-button' });
        parentDiv.appendChild(this.indentingDiv);
        this.decreaseIndent = this.createButtonElement(this.indentingDiv, 'e-de-indent', 'e-de-style-icon-button-first-size');
        this.decreaseIndent.setAttribute('aria-label', 'decreaseIndent');
        this.decreaseIndent.addEventListener('click', this.decreaseIndentValueHandler);
        this.increaseindent = this.createButtonElement(this.indentingDiv, 'e-de-outdent', 'e-de-style-icon-button-size');
        this.increaseindent.setAttribute('aria-label', 'increaseindent');
        this.increaseindent.addEventListener('click', this.increaseIndentValueHandler);
    };
    StyleDialog.prototype.setSingleLineSpacing = function () {
        this.lineSpacing = 1;
        this.updateParagraphFormat();
    };
    StyleDialog.prototype.setOnePointFiveLineSpacing = function () {
        this.lineSpacing = 1.5;
        this.updateParagraphFormat();
    };
    StyleDialog.prototype.setDoubleLineSpacing = function () {
        this.lineSpacing = 2;
        this.updateParagraphFormat();
    };
    StyleDialog.prototype.increaseIndentValue = function () {
        this.leftIndent += 36;
    };
    StyleDialog.prototype.decreaseIndentValue = function () {
        if (this.leftIndent >= 36) {
            this.leftIndent -= 36;
        }
        else {
            this.leftIndent = 0;
        }
    };
    StyleDialog.prototype.onSetLeftAlignmentClick = function () {
        this.setLeftAlignment();
    };
    StyleDialog.prototype.onSetRightAlignmentClick = function () {
        this.setRightAlignment();
    };
    StyleDialog.prototype.onSetCenterAlignmentClick = function () {
        this.setCenterAlignment();
    };
    StyleDialog.prototype.onSetJustifyAlignmentClick = function () {
        this.setJustifyAlignment();
    };
    StyleDialog.prototype.createButtonElement = function (parentDiv, iconCss, className, id) {
        var buttonElement = createElement('button', { attrs: { type: 'button' } });
        if (!isNullOrUndefined(id)) {
            buttonElement.id = id;
        }
        parentDiv.appendChild(buttonElement);
        var button = new Button({ iconCss: iconCss, cssClass: className });
        button.appendTo(buttonElement);
        return buttonElement;
    };
    StyleDialog.prototype.onIncreaseBeforeAfterSpacing = function () {
        this.increaseBeforeAfterSpacing();
    };
    StyleDialog.prototype.onDecreaseBeforeAfterSpacing = function () {
        this.decreaseBeforeAfterSpacing();
    };
    StyleDialog.prototype.toggleDisable = function () {
        if (this.styleType.value === this.localObj.getConstant('Character')) {
            var cssText = 'display:flex;pointer-events:none;opacity:0.5';
            this.styleParagraph.enabled = false;
            updateCSSText(this.target.getElementsByClassName('e-style-paragraph').item(0), cssText);
        }
        else {
            var cssText = 'display:flex';
            this.styleParagraph.enabled = true;
            this.target.getElementsByClassName('e-style-paragraph').item(0).removeAttribute('style');
            updateCSSText(this.target.getElementsByClassName('e-style-paragraph').item(0), cssText);
        }
        this.styleBasedOn.enabled = true;
    };
    StyleDialog.prototype.onUpdateNextStyle = function (args) {
        this.updateNextStyle(args);
    };
    StyleDialog.prototype.onUpdateOkButtonClick = function () {
        this.updateOkButton();
    };
    /**
     * @private
     * @param {string} styleName - Specifies the style name.
     * @param {string} header - Specifies the header.
     * @returns {void}
     */
    StyleDialog.prototype.show = function (styleName, header) {
        var localObj = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        this.isEdit = (!isNullOrUndefined(styleName) && styleName.length > 0) ? true : false;
        this.editStyleName = styleName;
        this.abstractList = new WAbstractList();
        var style = this.documentHelper.styles.findByName(styleName);
        this.style = !this.isEdit ? new WParagraphStyle() : style ? style : this.getStyle(styleName);
        localObj.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initStyleDialog(localObj, this.documentHelper.owner.enableRtl);
        }
        if (!this.isEdit) {
            this.styleType.value = 'Paragraph';
        }
        else {
            this.styleType.value = this.style instanceof WCharacterStyle ? 'Character' : 'Paragraph';
        }
        if (isNullOrUndefined(header)) {
            header = localObj.getConstant('Create New Style');
        }
        this.documentHelper.dialog2.header = header;
        this.documentHelper.dialog2.height = 'auto';
        this.documentHelper.dialog2.width = 'auto';
        this.documentHelper.dialog2.content = this.target;
        this.documentHelper.dialog2.buttons = [{
                click: this.onOkButtonClick,
                buttonModel: { content: localObj.getConstant('Ok'), cssClass: 'e-flat e-style-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-style-cancel' }
            }];
        this.toggleDisable();
        this.documentHelper.dialog2.dataBind();
        this.documentHelper.dialog2.beforeOpen = this.loadStyleDialog;
        this.documentHelper.dialog2.close = this.closeStyleDialog;
        this.documentHelper.dialog2.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog2.show();
    };
    StyleDialog.prototype.updateList = function () {
        var listId = this.style.paragraphFormat.listFormat.listId;
        if (listId > -1) {
            if (this.documentHelper.lists.filter(function (a) { return (a.listId === listId); }).length === 0) {
                this.documentHelper.lists.push(this.style.paragraphFormat.listFormat.list);
            }
            else {
                this.documentHelper.lists = this.documentHelper.lists.filter(function (a) { return (a.listId !== listId); });
                this.documentHelper.lists.push(this.style.paragraphFormat.listFormat.list);
            }
        }
        if (this.abstractList.abstractListId !== -1) {
            this.documentHelper.abstractLists.push(this.abstractList);
        }
    };
    StyleDialog.prototype.createLinkStyle = function (name, isEdit) {
        var charStyle;
        if (isEdit) {
            charStyle = this.documentHelper.styles.findByName((name + ' Char'), 'Character');
        }
        else {
            charStyle = new WCharacterStyle();
        }
        charStyle.type = 'Character';
        charStyle.name = name + ' Char';
        charStyle.characterFormat = this.style.characterFormat.cloneFormat();
        charStyle.basedOn = this.style.basedOn;
        if (!isEdit) {
            this.documentHelper.styles.push(charStyle);
        }
        return this.documentHelper.styles.findByName(charStyle.name, 'Character');
    };
    /**
     * @private
     * @param {L10n} characterFormat - Specifies the character format
     * @returns {void}
     */
    StyleDialog.prototype.updateCharacterFormat = function (characterFormat) {
        if (!isNullOrUndefined(characterFormat)) {
            this.characterFormat = characterFormat.cloneFormat();
        }
        this.fontFamily.value = this.characterFormat.fontFamily;
        this.fontSize.value = this.characterFormat.fontSize;
        var color = this.characterFormat.fontColor;
        // "empty" is old value used for auto color till v19.2.49. It is maintained for backward compatibility.
        this.fontColor.value = (color === 'empty' || color === '#00000000') ? '#000000' : color;
        this.fontButtonClicked();
    };
    /**
     * @private
     * @returns {void}
     */
    StyleDialog.prototype.updateParagraphFormat = function (paragraphFOrmat) {
        if (!isNullOrUndefined(paragraphFOrmat)) {
            this.paragraphFormat = paragraphFOrmat.cloneFormat();
            this.textAlignment = paragraphFOrmat.textAlignment;
            this.lineSpacing = paragraphFOrmat.lineSpacing;
        }
        if (isNullOrUndefined(this.paragraphFormat)) {
            return;
        }
        if (this.textAlignment === 'Left') {
            if (!this.leftAlign.classList.contains('e-active')) {
                this.leftAlign.classList.add('e-active');
            }
            if (this.rightAlign.classList.contains('e-active')) {
                this.rightAlign.classList.remove('e-active');
            }
            if (this.centerAlign.classList.contains('e-active')) {
                this.centerAlign.classList.remove('e-active');
            }
            if (this.justify.classList.contains('e-active')) {
                this.justify.classList.remove('e-active');
            }
        }
        else if (this.textAlignment === 'Right') {
            if (this.leftAlign.classList.contains('e-active')) {
                this.leftAlign.classList.remove('e-active');
            }
            if (!this.rightAlign.classList.contains('e-active')) {
                this.rightAlign.classList.add('e-active');
            }
            if (this.centerAlign.classList.contains('e-active')) {
                this.centerAlign.classList.remove('e-active');
            }
            if (this.justify.classList.contains('e-active')) {
                this.justify.classList.remove('e-active');
            }
        }
        else if (this.textAlignment === 'Center') {
            if (this.leftAlign.classList.contains('e-active')) {
                this.leftAlign.classList.remove('e-active');
            }
            if (this.rightAlign.classList.contains('e-active')) {
                this.rightAlign.classList.remove('e-active');
            }
            if (!this.centerAlign.classList.contains('e-active')) {
                this.centerAlign.classList.add('e-active');
            }
            if (this.justify.classList.contains('e-active')) {
                this.justify.classList.remove('e-active');
            }
        }
        else if (this.textAlignment === 'Justify') {
            if (this.leftAlign.classList.contains('e-active')) {
                this.leftAlign.classList.remove('e-active');
            }
            if (this.rightAlign.classList.contains('e-active')) {
                this.rightAlign.classList.remove('e-active');
            }
            if (this.centerAlign.classList.contains('e-active')) {
                this.centerAlign.classList.remove('e-active');
            }
            if (!this.justify.classList.contains('e-active')) {
                this.justify.classList.add('e-active');
            }
        }
        if (this.lineSpacing === 1) {
            this.singleLineSpacing.classList.add('e-active');
            this.onePointFiveLineSpacing.classList.remove('e-active');
            this.doubleLineSpacing.classList.remove('e-active');
        }
        else if (this.lineSpacing === 1.5) {
            this.singleLineSpacing.classList.remove('e-active');
            this.onePointFiveLineSpacing.classList.add('e-active');
            this.doubleLineSpacing.classList.remove('e-active');
        }
        else if (this.lineSpacing === 2) {
            this.singleLineSpacing.classList.remove('e-active');
            this.onePointFiveLineSpacing.classList.remove('e-active');
            this.doubleLineSpacing.classList.add('e-active');
        }
        else {
            this.singleLineSpacing.classList.remove('e-active');
            this.onePointFiveLineSpacing.classList.remove('e-active');
            this.doubleLineSpacing.classList.remove('e-active');
        }
    };
    StyleDialog.prototype.enableOrDisableOkButton = function () {
        if (!isNullOrUndefined(this.okButton)) {
            this.okButton.disabled = (this.styleNameElement.value === '');
        }
    };
    /**
     * @private
     */
    StyleDialog.prototype.getTypeValue = function (type) {
        var value = !isNullOrUndefined(type) ? type : this.styleType.value;
        if (value === 'Linked Style' || value === 'Paragraph') {
            return 'Paragraph';
        }
        else {
            return 'Character';
        }
    };
    StyleDialog.prototype.updateStyleNames = function (type, name) {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        var styles = this.documentHelper.styles.getStyleNames(type);
        var finalList = [];
        for (var i = 0; i < styles.length; i++) {
            var styleName = localValue.getConstant(styles[parseInt(i.toString(), 10)]);
            if (styleName === '') {
                styleName = styles[parseInt(i.toString(), 10)];
            }
            finalList.push(styleName);
        }
        this.styleParagraph.dataSource = finalList;
        this.styleParagraph.index = null;
        if (name) {
            this.styleBasedOn.dataSource = finalList.filter(function (e) { return e !== name; });
            this.styleBasedOn.index = null;
            var style = this.getStyle(name);
            if (style.basedOn instanceof String || isNullOrUndefined(style.basedOn)) {
                this.styleBasedOn.enabled = false;
            }
            else {
                this.styleBasedOn.index = styles.indexOf(style.basedOn.name) > -1 ? styles.indexOf(style.basedOn.name) : 0;
            }
            if (style.type === 'Paragraph') {
                if (!isNullOrUndefined(style.link)) {
                    this.styleType.index = 2;
                }
                else {
                    this.styleType.index = 0;
                }
            }
            else {
                this.styleType.index = 1;
            }
            if (!isNullOrUndefined(style.next)) {
                var nxtName = style.next.name;
                var index = 0;
                if (styles.indexOf(nxtName) > -1) {
                    index = styles.indexOf(nxtName);
                }
                this.styleParagraph.index = index;
                this.isUserNextParaUpdated = (nxtName === name) ? false : true;
            }
        }
        else {
            this.styleBasedOn.dataSource = finalList;
            this.styleBasedOn.index = null;
            var basedOnIndex = 0;
            if (this.documentHelper.owner.selectionModule) {
                var styleName = void 0;
                if (type === 'Character') {
                    styleName = this.documentHelper.owner.selectionModule.characterFormat.styleName;
                }
                else {
                    styleName = this.documentHelper.owner.selectionModule.paragraphFormat.styleName;
                }
                basedOnIndex = styles.indexOf(styleName);
            }
            this.styleBasedOn.index = basedOnIndex;
            this.styleParagraph.index = 0;
        }
        if (this.isEdit) {
            this.styleType.enabled = false;
        }
        else {
            this.styleType.enabled = true;
        }
        // this.styleBasedOn.dataBind();
        // this.styleParagraph.dataBind();
    };
    StyleDialog.prototype.getStyle = function (styleName) {
        if (isNullOrUndefined(this.documentHelper.styles.findByName(styleName))) {
            this.documentHelper.owner.editorModule.createStyle(this.documentHelper.preDefinedStyles.get(styleName));
        }
        return this.documentHelper.styles.findByName(styleName);
    };
    /**
     * @private
     * @returns {void}
     */
    StyleDialog.prototype.destroy = function () {
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var n = 0; n < this.target.childNodes.length; n++) {
                this.target.removeChild(this.target.childNodes[n]);
                n--;
            }
            this.target = undefined;
        }
        if (this.characterFormat) {
            this.characterFormat.destroy();
            this.characterFormat = undefined;
        }
        if (this.paragraphFormat) {
            this.paragraphFormat.destroy();
            this.paragraphFormat = undefined;
        }
        if (this.fontColor) {
            this.fontColor.destroy();
            this.fontColor = undefined;
        }
        if (this.fontSize) {
            this.fontSize.destroy();
            this.fontSize = undefined;
        }
        if (this.fontFamily) {
            this.fontFamily.destroy();
            this.fontFamily = undefined;
        }
        if (this.styleType) {
            this.styleType.destroy();
            this.styleType = undefined;
        }
        if (this.styleBasedOn) {
            this.styleBasedOn.destroy();
            this.styleBasedOn = undefined;
        }
        if (this.styleParagraph) {
            this.styleParagraph.destroy();
            this.styleParagraph = undefined;
        }
        if (this.onlyThisDocument) {
            this.onlyThisDocument.destroy();
        }
        this.onlyThisDocument = undefined;
        if (this.template) {
            this.template.destroy();
            this.template = undefined;
        }
        if (this.style) {
            this.style.destroy();
            this.style = undefined;
        }
        if (this.abstractList) {
            this.abstractList.destroy();
            this.abstractList = undefined;
        }
        if (this.numberingBulletDialog) {
            this.numberingBulletDialog.destroy();
            this.numberingBulletDialog = undefined;
        }
        if (this.styleDropdwn) {
            this.styleDropdwn.destroy();
            this.styleDropdwn = undefined;
        }
        if (this.textAlignment) {
            this.textAlignment = undefined;
        }
        if (this.lineSpacing) {
            this.lineSpacing = undefined;
        }
        if (this.leftIndent) {
            this.leftIndent = undefined;
        }
        if (this.beforeSpacing) {
            this.beforeSpacing = undefined;
        }
        if (this.afterSpacing) {
            this.afterSpacing = undefined;
        }
        this.removeEvents();
        this.removeElements();
        this.documentHelper = undefined;
    };
    StyleDialog.prototype.removeEvents = function () {
        if (this.nameValue) {
            this.nameValue.removeEventListener('input', this.updateOkButtonClickHandler);
            this.nameValue.removeEventListener('keyup', this.updateOkButtonClickHandler);
            this.nameValue.removeEventListener('blur', this.updateNextStyleHandler);
        }
        if (this.styleDropdwn) {
            this.styleDropdwn.removeEventListener('select', this.openDialogHandler);
        }
        if (this.bold) {
            this.bold.removeEventListener('click', this.setBoldPropertyHandler);
        }
        if (this.italic) {
            this.italic.removeEventListener('click', this.setItalicPropertyHandler);
        }
        if (this.underline) {
            this.underline.removeEventListener('click', this.setUnderlinePropertyHandler);
        }
        if (this.leftAlign) {
            this.leftAlign.removeEventListener('click', this.setLeftAlignmentClickHandler);
        }
        if (this.centerAlign) {
            this.centerAlign.removeEventListener('click', this.setCenterAlignmentClickHandler);
        }
        if (this.rightAlign) {
            this.rightAlign.removeEventListener('click', this.setRightAlignmentClickHandler);
        }
        if (this.justify) {
            this.justify.removeEventListener('click', this.setJustifyAlignmentClickHandler);
        }
        if (this.singleLineSpacing) {
            this.singleLineSpacing.removeEventListener('click', this.setSingleLineSpacingClickHandler);
        }
        if (this.onePointFiveLineSpacing) {
            this.onePointFiveLineSpacing.removeEventListener('click', this.setOnePointFiveLineSpacingClickHandler);
        }
        if (this.doubleLineSpacing) {
            this.doubleLineSpacing.removeEventListener('click', this.setDoubleLineSpacingClickHandler);
        }
        if (this.beforeSpacingEle) {
            this.beforeSpacingEle.removeEventListener('click', this.increaseBeforeAfterSpacingValueHandler);
        }
        if (this.afterSpacingEle) {
            this.afterSpacingEle.removeEventListener('click', this.decreaseBeforeAfterSpacingValueHandler);
        }
        if (this.decreaseIndent) {
            this.decreaseIndent.removeEventListener('click', this.decreaseIndentValueHandler);
        }
        if (this.increaseindent) {
            this.increaseindent.removeEventListener('click', this.increaseIndentValueHandler);
        }
    };
    StyleDialog.prototype.removeElements = function () {
        if (this.container) {
            this.container.remove();
            this.container = undefined;
        }
        if (this.properties) {
            this.properties.remove();
            this.properties = undefined;
        }
        if (this.styleNameTypeDiv) {
            this.styleNameTypeDiv.remove();
            this.styleNameTypeDiv = undefined;
        }
        if (this.nameWholeDiv) {
            this.nameWholeDiv.remove();
            this.nameWholeDiv = undefined;
        }
        if (this.nameValue) {
            this.nameValue.remove();
            this.nameValue = undefined;
        }
        if (this.styleTypeWholeDiv) {
            this.styleTypeWholeDiv.remove();
            this.styleTypeWholeDiv = undefined;
        }
        if (this.styleTypeDivElement) {
            this.styleTypeDivElement.remove();
            this.styleTypeDivElement = undefined;
        }
        if (this.styleTypeValue) {
            this.styleTypeValue.remove();
            this.styleTypeValue = undefined;
        }
        if (this.styleBasedParaDiv) {
            this.styleBasedParaDiv.remove();
            this.styleBasedParaDiv = undefined;
        }
        if (this.styleBasedOnWholeDiv) {
            this.styleBasedOnWholeDiv.remove();
            this.styleBasedOnWholeDiv = undefined;
        }
        if (this.styleBasedOnDivElement) {
            this.styleBasedOnDivElement.remove();
            this.styleBasedOnDivElement = undefined;
        }
        if (this.styleBasedOnValue) {
            this.styleBasedOnValue.remove();
            this.styleBasedOnValue = undefined;
        }
        if (this.styleParagraphWholeDiv) {
            this.styleParagraphWholeDiv.remove();
            this.styleParagraphWholeDiv = undefined;
        }
        if (this.styleParagraphDivElement) {
            this.styleParagraphDivElement.remove();
            this.styleParagraphDivElement = undefined;
        }
        if (this.styleParagraphValue) {
            this.styleParagraphValue.remove();
            this.styleParagraphValue = undefined;
        }
        if (this.formatting) {
            this.formatting.remove();
            this.formatting = undefined;
        }
        if (this.optionsDiv) {
            this.optionsDiv.remove();
            this.optionsDiv = undefined;
        }
        if (this.fontOptionsDiv) {
            this.fontOptionsDiv.remove();
            this.fontOptionsDiv = undefined;
        }
        if (this.paragraphOptionsDiv) {
            this.paragraphOptionsDiv.remove();
            this.paragraphOptionsDiv = undefined;
        }
        if (this.formatBtn) {
            this.formatBtn.remove();
            this.formatBtn = undefined;
        }
        if (this.fontFamilyElement) {
            this.fontFamilyElement.remove();
            this.fontFamilyElement = undefined;
        }
        if (this.fontSizeElement) {
            this.fontSizeElement.remove();
            this.fontSizeElement = undefined;
        }
        if (this.fontGroupButton) {
            this.fontGroupButton.remove();
            this.fontGroupButton = undefined;
        }
        if (this.fontColorElement) {
            this.fontColorElement.remove();
            this.fontColorElement = undefined;
        }
        if (this.alignmentDiv) {
            this.alignmentDiv.remove();
            this.alignmentDiv = undefined;
        }
        if (this.lineSpacingDiv) {
            this.lineSpacingDiv.remove();
            this.lineSpacingDiv = undefined;
        }
        if (this.spacingDiv) {
            this.spacingDiv.remove();
            this.spacingDiv = undefined;
        }
        if (this.beforeSpacingEle) {
            this.beforeSpacingEle.remove();
            this.beforeSpacingEle = undefined;
        }
        if (this.afterSpacingEle) {
            this.afterSpacingEle.remove();
            this.afterSpacingEle = undefined;
        }
        if (this.indentingDiv) {
            this.indentingDiv.remove();
            this.indentingDiv = undefined;
        }
        if (this.decreaseIndent) {
            this.decreaseIndent.remove();
            this.decreaseIndent = undefined;
        }
        if (this.increaseindent) {
            this.increaseindent.remove();
            this.increaseindent = undefined;
        }
    };
    return StyleDialog;
}());
export { StyleDialog };
