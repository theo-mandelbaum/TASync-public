import { ListView } from '@syncfusion/ej2-lists';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { createElement, L10n, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ContentControl, ContentControlListItems } from '../viewer/page';
import { ColorPicker, TextBox } from '@syncfusion/ej2-inputs';
var ContentControlPropertiesDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function ContentControlPropertiesDialog(documentHelper) {
        var _this = this;
        this.colorPicker = undefined;
        this.fontColor = undefined;
        this.keyUpOnTextBoxClickHandler = this.onKeyUpOnTextBoxClicked.bind(this);
        this.setButtonClickHandler = this.onSetButtonClick.bind(this);
        this.clearButtonClickHandler = this.onClearButtonClick.bind(this);
        /**
         * @private
         */
        this.characterFormat = undefined;
        this.clearButtonClick = function (args) {
            _this.textBoxInput.value = '';
            _this.valueBoxInput.value = '';
            for (var i = 0; i < _this.convertedItems.length; i++) {
                if (_this.convertedItems[parseInt(i.toString(), 10)].value === _this.currentSelectedItem) {
                    _this.currentContentControl.contentControlProperties.contentControlListItems.splice(i, 1);
                    _this.convertedItems.splice(i, 1);
                }
            }
            _this.listviewInstance.dataSource = _this.convertedItems.slice();
            _this.listviewInstance.dataBind();
        };
        /* eslint-disable  */
        this.setButtonClick = function (args) {
            if (!isNullOrUndefined(_this.textBoxInput.value) ||
                !isNullOrUndefined(_this.valueBoxInput.value)) {
                var newItem = new ContentControlListItems();
                newItem.displayText = _this.textBoxInput.value ? _this.textBoxInput.value : '';
                newItem.value = _this.valueBoxInput.value ? _this.valueBoxInput.value : '';
                _this.currentContentControl.contentControlProperties.contentControlListItems.push(newItem);
                var convertedItem = {
                    displayText: newItem.displayText,
                    value: newItem.value
                };
                _this.convertedItems.push(convertedItem);
                _this.listviewInstance.addItem([convertedItem]);
            }
            _this.textBoxInput.value = '';
            _this.valueBoxInput.value = '';
        };
        /**
         * @private
         * @returns {void}
         */
        this.onKeyUpOnTextBox = function () {
            _this.enableOrDisableButton();
        };
        this.loadPropertiesdialog = function () {
            _this.currentContentControl = _this.documentHelper.owner.selection.currentContentControl;
            if (!isNullOrUndefined(_this.currentContentControl)) {
                _this.contentEditedCheckBox.checked = _this.currentContentControl.contentControlProperties.lockContents;
                _this.contentDeletedCheckBox.checked = _this.currentContentControl.contentControlProperties.lockContentControl;
                _this.removeCheckBox.checked = _this.currentContentControl.contentControlProperties.isTemporary;
                _this.multilineCheckBox.checked = _this.currentContentControl.contentControlProperties.multiline;
                _this.colorPicker.value = _this.currentContentControl.contentControlProperties.color;
                if (_this.removeCheckBox.checked) {
                    _this.contentEditedCheckBox.checked = false;
                }
                _this.titleText.value = _this.currentContentControl.contentControlProperties.title ? _this.currentContentControl.contentControlProperties.title : '';
                _this.tagText.value = _this.currentContentControl.contentControlProperties.tag ? _this.currentContentControl.contentControlProperties.tag : '';
                _this.fontColor = _this.currentContentControl.contentControlProperties.color;
                if (_this.currentContentControl.contentControlProperties.type === 'Text') {
                    _this.plainTextPropertiesDiv.style.display = 'block';
                }
                else {
                    _this.plainTextPropertiesDiv.style.display = 'none';
                }
                if (_this.currentContentControl.contentControlProperties.type === 'ComboBox' || _this.currentContentControl.contentControlProperties.type === 'DropDownList') {
                    _this.dropDownPropertiesDiv.style.display = 'block';
                }
                else {
                    _this.dropDownPropertiesDiv.style.display = 'none';
                }
                if (!isNullOrUndefined(_this.currentContentControl.contentControlProperties.contentControlListItems !== undefined)) {
                    _this.convertedItems = _this.currentContentControl.contentControlProperties.contentControlListItems.map(function (item) {
                        var convertedItem = {};
                        for (var prop in item) {
                            convertedItem["" + prop] = item["" + prop];
                        }
                        return convertedItem;
                    });
                    _this.listviewInstance.dataSource = _this.convertedItems;
                    _this.listviewInstance.dataBind();
                }
            }
            _this.documentHelper.updateFocus();
        };
        this.applyProperties = function () {
            var start = _this.documentHelper.selection.start.clone();
            var end = _this.documentHelper.selection.end.clone();
            var offset = _this.currentContentControl.line.getOffset(_this.currentContentControl, 1);
            _this.documentHelper.selection.start.setPositionParagraph(_this.currentContentControl.line, offset);
            _this.documentHelper.selection.end.setPositionParagraph(_this.currentContentControl.line, offset + 1);
            _this.documentHelper.owner.editorModule.initHistory('UpdateContentControl');
            var properties = _this.documentHelper.owner.editor.getContentControlPropObject(_this.currentContentControl.contentControlProperties);
            if (!isNullOrUndefined(_this.fontColor)) {
                _this.currentContentControl.contentControlProperties.color = _this.fontColor;
            }
            var contentControlImage = _this.documentHelper.owner.getImageContentControl();
            if ((contentControlImage instanceof ContentControl && contentControlImage.contentControlProperties.type == 'Picture')) {
                contentControlImage.contentControlProperties.lockContents = _this.contentEditedCheckBox.checked;
                contentControlImage.contentControlProperties.lockContentControl = _this.contentDeletedCheckBox.checked;
                contentControlImage.contentControlProperties.isTemporary = _this.removeCheckBox.checked;
                if (_this.removeCheckBox.checked) {
                    contentControlImage.contentControlProperties.lockContents = false;
                }
                contentControlImage.contentControlProperties.title = _this.titleText.value !== undefined ? _this.titleText.value : '';
                contentControlImage.contentControlProperties.tag = _this.tagText.value !== undefined ? _this.tagText.value : '';
                contentControlImage.contentControlProperties.multiline = _this.multilineCheckBox.checked;
            }
            if (!isNullOrUndefined(_this.currentContentControl)) {
                _this.currentContentControl.contentControlProperties.lockContents = _this.contentEditedCheckBox.checked;
                _this.currentContentControl.contentControlProperties.lockContentControl = _this.contentDeletedCheckBox.checked;
                _this.currentContentControl.contentControlProperties.isTemporary = _this.removeCheckBox.checked;
                if (_this.removeCheckBox.checked) {
                    _this.currentContentControl.contentControlProperties.lockContents = false;
                }
                _this.currentContentControl.contentControlProperties.title = _this.titleText.value !== undefined ? _this.titleText.value : '';
                _this.currentContentControl.contentControlProperties.tag = _this.tagText.value !== undefined ? _this.tagText.value : '';
                _this.currentContentControl.contentControlProperties.multiline = _this.multilineCheckBox.checked;
            }
            if (_this.documentHelper.owner.editorHistoryModule) {
                if (_this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo) {
                    _this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.modifiedProperties.push(properties);
                    var format = _this.documentHelper.owner.editor.getContentControlPropObject(_this.currentContentControl.contentControlProperties);
                    _this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.format = JSON.stringify(format);
                }
                _this.documentHelper.owner.editorHistoryModule.updateHistory();
            }
            _this.documentHelper.selection.selectRange(start, end);
            _this.unWireEventsAndBindings();
            _this.documentHelper.dialog.hide();
            _this.documentHelper.viewer.updateScrollBars();
            _this.documentHelper.updateFocus();
            _this.documentHelper.owner.editorModule.fireContentChange();
        };
        this.closePropertiesDialog = function () {
            _this.documentHelper.dialog.hide();
            _this.unWireEventsAndBindings();
            _this.documentHelper.updateFocus();
        };
        this.fontColorUpdate = function (args) {
            if (!isNullOrUndefined(args.currentValue)) {
                _this.fontColor = args.currentValue.hex;
            }
        };
        /**
         * @private
         * @param args args value.
         * @returns {void}
         */
        /* eslint-disable  */
        this.selectHandler = function (args) {
            _this.currentSelectedItem = args.text;
        };
        this.documentHelper = documentHelper;
    }
    ContentControlPropertiesDialog.prototype.getModuleName = function () {
        return 'ContentControlPropertiesDialog';
    };
    ContentControlPropertiesDialog.prototype.createInputElement = function (type, id, className) {
        var element = createElement('input', {
            attrs: { type: type },
            id: id,
            className: className
        });
        return element;
    };
    ContentControlPropertiesDialog.prototype.initContentControlPropertiesDialog = function (localeValue, enableRtl) {
        var _this = this;
        this.target = createElement('div', { className: 'e-de-cont-cntr' });
        this.container = createElement('div');
        this.generalDiv = createElement('div');
        this.genLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localeValue.getConstant('General') });
        this.generalDiv.appendChild(this.genLabel);
        this.displayText = createElement('div', { className: 'e-de-dlg-container' });
        this.titleText = createElement('input', { className: 'e-input' });
        this.displayText.appendChild(this.titleText);
        this.generalDiv.appendChild(this.displayText);
        this.tagText = createElement('input', { className: 'e-input' });
        this.generalDiv.appendChild(this.tagText);
        this.colorDiv = createElement('div', { className: 'e-de-container-row' });
        this.colorDiv.style.paddingTop = '10px';
        this.fontColorDiv = createElement('div', { className: 'e-de-font-dlg-display' });
        this.fontColorLabel = createElement('label', {
            className: 'e-de-font-dlg-header-font-color e-de-font-color-margin',
            innerHTML: localeValue.getConstant('Color')
        });
        // if (isRtl) {
        //     fontColorLabel.classList.add('e-de-rtl');
        // }
        this.fontColorDiv.appendChild(this.fontColorLabel);
        this.fontColorElement = this.createInputElement('color', this.target.id + '_ColorDiv', 'e-de-font-dlg-color');
        this.fontColorDiv.appendChild(this.fontColorElement);
        this.colorDiv.appendChild(this.fontColorDiv);
        this.generalDiv.appendChild(this.colorDiv);
        var _a = this.documentHelper.owner.documentEditorSettings.colorPickerSettings, columns = _a.columns, createPopupOnClick = _a.createPopupOnClick, cssClass = _a.cssClass, disabled = _a.disabled, enablePersistence = _a.enablePersistence, inline = _a.inline, mode = _a.mode, modeSwitcher = _a.modeSwitcher, noColor = _a.noColor, presetColors = _a.presetColors, showButtons = _a.showButtons;
        this.colorPicker = new ColorPicker({
            change: this.fontColorUpdate, value: '#000000', locale: this.documentHelper.owner.locale, enableOpacity: false, mode: mode, modeSwitcher: modeSwitcher, showButtons: showButtons, columns: columns, createPopupOnClick: createPopupOnClick, cssClass: cssClass, disabled: disabled, enablePersistence: enablePersistence, inline: inline, noColor: noColor, presetColors: presetColors
        });
        this.colorPicker.appendTo(this.fontColorElement);
        this.style = createElement('div', { styles: 'display:block' });
        this.generalDiv.appendChild(this.style);
        this.remove = createElement('div', { styles: 'display:block' });
        this.generalDiv.appendChild(this.remove);
        this.removeContent = createElement('input', {
            attrs: { type: 'checkbox' }
        });
        this.remove.appendChild(this.removeContent);
        this.removeCheckBox = new CheckBox({
            label: localeValue.getConstant('Remove content control when contents are edited'),
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.removeCheckBox.appendTo(this.removeContent);
        this.removeContent.setAttribute('aria-label', localeValue.getConstant('Remove content control when contents are edited'));
        this.container.appendChild(this.generalDiv);
        this.lockedDiv = createElement('div');
        this.lockedDiv.style.paddingTop = '10px';
        this.lockedLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localeValue.getConstant('Locking') });
        this.lockedDiv.appendChild(this.lockedLabel);
        this.contentDelete = createElement('div', { styles: 'display:block' });
        this.lockedDiv.appendChild(this.contentDelete);
        this.contentDeleted = createElement('input', {
            attrs: { type: 'checkbox' }
        });
        this.contentDelete.appendChild(this.contentDeleted);
        this.contentDeletedCheckBox = new CheckBox({
            label: localeValue.getConstant('Content control cannot be deleted'),
            cssClass: 'e-de-para-dlg-cs-check-box',
            change: function (args) {
                if (args.checked) {
                    _this.removeCheckBox.disabled = true;
                    _this.removeCheckBox.dataBind();
                }
                else {
                    _this.removeCheckBox.disabled = false;
                    _this.removeCheckBox.dataBind();
                }
            }
        });
        this.contentDeletedCheckBox.appendTo(this.contentDeleted);
        this.contentDeleted.setAttribute('aria-label', localeValue.getConstant('Content control cannot be deleted'));
        this.contentEdit = createElement('div', { styles: 'display:block' });
        this.lockedDiv.appendChild(this.contentEdit);
        this.contentEdited = createElement('input', {
            attrs: { type: 'checkbox' }
        });
        this.contentEdit.appendChild(this.contentEdited);
        this.contentEditedCheckBox = new CheckBox({
            label: localeValue.getConstant('Contents cannot be edited'),
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.contentEditedCheckBox.appendTo(this.contentEdited);
        this.contentEdited.setAttribute('aria-label', localeValue.getConstant('Contents cannot be edited'));
        this.container.appendChild(this.lockedDiv);
        this.plainTextPropertiesDiv = createElement('div');
        this.plainTextPropertiesDiv.style.marginTop = '10px';
        this.plainTextPropertiesDiv.style.display = 'none';
        this.plainTextLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localeValue.getConstant('Plain Text properties') });
        this.plainTextPropertiesDiv.appendChild(this.plainTextLabel);
        this.multiline = createElement('input', {
            attrs: { type: 'checkbox' }
        });
        this.plainTextPropertiesDiv.appendChild(this.multiline);
        this.multilineCheckBox = new CheckBox({
            label: localeValue.getConstant('Allow carriage returns'),
            //enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.multilineCheckBox.appendTo(this.multiline);
        this.multiline.setAttribute('aria-label', localeValue.getConstant('Allow carriage returns'));
        this.container.appendChild(this.plainTextPropertiesDiv);
        this.dropDownPropertiesDiv = createElement('div');
        this.dropDownPropertiesDiv.style.marginTop = '10px';
        this.dropDownPropertiesDiv.style.display = 'none';
        this.lockedcontentLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localeValue.getConstant('Drop_Down List properties') });
        this.dropDownPropertiesDiv.appendChild(this.lockedcontentLabel);
        this.commonDiv = createElement('div', { className: 'e-bookmark-common' });
        this.dropDownPropertiesDiv.appendChild(this.commonDiv);
        this.searchDiv = createElement('div', { className: 'e-bookmark-list' });
        this.commonDiv.appendChild(this.searchDiv);
        this.textBoxDiv = createElement('div', { className: 'e-bookmark-textboxdiv' });
        this.searchDiv.appendChild(this.textBoxDiv);
        this.textBoxInput = createElement('input', { className: 'e-input e-bookmark-textbox-input', id: 'bookmark_text_box' });
        this.textBoxInput.setAttribute('type', 'text');
        this.textBoxInput.addEventListener('keyup', this.keyUpOnTextBoxClickHandler);
        this.textBoxInput.setAttribute('aria-label', localeValue.getConstant('Display Text'));
        this.textBoxDiv.appendChild(this.textBoxInput);
        this.valueBoxDiv = createElement('div', { className: 'e-bookmark-textboxdiv' });
        this.searchDiv.appendChild(this.valueBoxDiv);
        this.valueBoxInput = createElement('input', { className: 'e-input e-bookmark-textbox-input', id: 'bookmark_text_box' });
        this.valueBoxInput.setAttribute('type', 'text');
        this.valueBoxInput.addEventListener('keyup', this.keyUpOnTextBoxClickHandler);
        this.valueBoxInput.setAttribute('aria-label', localeValue.getConstant('Value'));
        this.valueBoxDiv.appendChild(this.valueBoxInput);
        this.listviewDiv = createElement('div', { className: 'e-bookmark-listViewDiv', id: 'bookmark_listview', attrs: { tabindex: '-1', role: 'listbox' } });
        this.searchDiv.appendChild(this.listviewDiv);
        this.listviewInstance = new ListView({
            cssClass: 'e-bookmark-listview',
            select: this.selectHandler,
            fields: { text: 'value' }
        });
        this.listviewInstance.appendTo(this.listviewDiv);
        this.buttonDiv = createElement('div', { className: 'e-bookmark-button' });
        this.commonDiv.appendChild(this.buttonDiv);
        this.addbuttonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        this.buttonDiv.appendChild(this.addbuttonDiv);
        this.addButtonElement = createElement('button', {
            innerHTML: 'Add', id: 'add',
            attrs: { type: 'button' }
        });
        this.addButtonElement.setAttribute('aria-label', localeValue.getConstant('Add'));
        this.addbuttonDiv.appendChild(this.addButtonElement);
        this.addButton = new Button({ cssClass: 'e-button-custom' });
        this.addButton.disabled = true;
        this.addButton.appendTo(this.addButtonElement);
        //addButtonElement.addEventListener('click', this.setButtonClick);
        this.addButtonElement.addEventListener('click', this.setButtonClickHandler);
        this.deleteButtonDiv = createElement('div', { className: 'e-bookmark-deletebutton' });
        this.buttonDiv.appendChild(this.deleteButtonDiv);
        this.deleteButtonElement = createElement('button', {
            innerHTML: 'Delete', id: 'delete',
            attrs: { type: 'button' }
        });
        this.deleteButtonElement.setAttribute('aria-label', 'Delete');
        this.deleteButtonDiv.appendChild(this.deleteButtonElement);
        this.deleteButton = new Button({ cssClass: 'e-button-custom' });
        this.deleteButton.appendTo(this.deleteButtonElement);
        this.deleteButtonElement.addEventListener('click', this.clearButtonClickHandler);
        this.container.appendChild(this.dropDownPropertiesDiv);
        this.target.appendChild(this.container);
        new TextBox({ placeholder: localeValue.getConstant('Title'), floatLabelType: 'Always' }, this.titleText);
        new TextBox({ placeholder: localeValue.getConstant('Tag'), floatLabelType: 'Always' }, this.tagText);
        new TextBox({ placeholder: localeValue.getConstant('Display Text'), floatLabelType: 'Always' }, this.textBoxInput);
        new TextBox({ placeholder: localeValue.getConstant('Value'), floatLabelType: 'Always' }, this.valueBoxInput);
    };
    /**
     * @private
     * @returns {void}
     */
    ContentControlPropertiesDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        this.localeValue = localValue;
        if (!this.target) {
            this.initContentControlPropertiesDialog(localValue, false);
        }
        if (this.documentHelper.selection.caret.style.display !== 'none') {
            this.documentHelper.selection.caret.style.display = 'none';
        }
        if (this.dropDownPropertiesDiv.style.display !== 'none' || this.plainTextPropertiesDiv.style.display !== 'none') {
            this.dropDownPropertiesDiv.style.display = 'none';
            this.plainTextPropertiesDiv.style.display = 'none';
        }
        this.documentHelper.dialog.header = localValue.getConstant('Content Control Properties');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.beforeOpen = this.loadPropertiesdialog;
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.buttons = [
            {
                click: this.applyProperties,
                buttonModel: { content: this.localeValue.getConstant('Ok'), cssClass: 'e-flat e-para-okay', isPrimary: true }
            },
            {
                click: this.closePropertiesDialog,
                buttonModel: { content: this.localeValue.getConstant('Cancel'), cssClass: 'e-flat e-para-cancel' }
            }
        ];
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
    };
    /* eslint-disable  */
    ContentControlPropertiesDialog.prototype.onClearButtonClick = function (args) {
        this.clearButtonClick(args);
    };
    ContentControlPropertiesDialog.prototype.onSetButtonClick = function (args) {
        this.setButtonClick(args);
    };
    ContentControlPropertiesDialog.prototype.onKeyUpOnTextBoxClicked = function () {
        this.onKeyUpOnTextBox();
    };
    ContentControlPropertiesDialog.prototype.enableOrDisableButton = function () {
        if (!isNullOrUndefined(this.addButton)) {
            this.addButton.disabled = this.textBoxInput.value === '' || this.valueBoxInput.value === '';
        }
    };
    ContentControlPropertiesDialog.prototype.unWireEventsAndBindings = function () {
        this.fontColor = undefined;
        this.currentContentControl = undefined;
        this.currentSelectedItem = undefined;
        this.convertedItems = [];
    };
    /**
     * @private
     * @returns {void}
     */
    ContentControlPropertiesDialog.prototype.destroy = function () {
        if (this.contentDeletedCheckBox) {
            this.contentDeletedCheckBox.destroy();
            this.contentDeletedCheckBox = undefined;
        }
        if (this.contentEditedCheckBox) {
            this.contentEditedCheckBox.destroy();
            this.contentEditedCheckBox = undefined;
        }
        if (this.removeCheckBox) {
            this.removeCheckBox.destroy();
            this.removeCheckBox = undefined;
        }
        if (this.multilineCheckBox) {
            this.multilineCheckBox.destroy();
            this.multilineCheckBox = undefined;
        }
        if (this.listviewInstance) {
            this.listviewInstance.destroy();
            this.listviewInstance = undefined;
        }
        if (this.textBoxInput) {
            this.textBoxInput.remove();
            this.textBoxInput = undefined;
        }
        if (this.valueBoxInput) {
            this.valueBoxInput.remove();
            this.valueBoxInput = undefined;
        }
        if (this.titleText) {
            this.titleText.remove();
            this.titleText = undefined;
        }
        if (this.tagText) {
            this.tagText.remove();
            this.tagText = undefined;
        }
        if (this.colorPicker) {
            this.colorPicker.destroy();
        }
        this.colorPicker = undefined;
        this.documentHelper = undefined;
        this.removeEvents();
        this.removeElements();
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var i = 0; i < this.target.childNodes.length; i++) {
                this.target.removeChild(this.target.childNodes[parseInt(i.toString(), 10)]);
                i--;
            }
            this.target = undefined;
        }
    };
    ContentControlPropertiesDialog.prototype.removeEvents = function () {
        if (this.addButtonElement) {
            this.addButtonElement.removeEventListener('click', this.setButtonClickHandler);
        }
        if (this.deleteButtonElement) {
            this.deleteButtonElement.removeEventListener('click', this.clearButtonClickHandler);
        }
        if (this.textBoxInput) {
            this.textBoxInput.removeEventListener('keyup', this.keyUpOnTextBoxClickHandler);
        }
        if (this.valueBoxInput) {
            this.valueBoxInput.removeEventListener('keyup', this.keyUpOnTextBoxClickHandler);
        }
    };
    ContentControlPropertiesDialog.prototype.removeElements = function () {
        if (this.generalDiv) {
            this.generalDiv.remove();
            this.generalDiv = undefined;
        }
        if (this.genLabel) {
            this.genLabel.remove();
            this.genLabel = undefined;
        }
        if (this.displayText) {
            this.displayText.remove();
            this.displayText = undefined;
        }
        if (this.colorDiv) {
            this.colorDiv.remove();
            this.colorDiv = undefined;
        }
        if (this.fontColorDiv) {
            this.fontColorDiv.remove();
            this.fontColorDiv = undefined;
        }
        if (this.fontColorLabel) {
            this.fontColorLabel.remove();
            this.fontColorLabel = undefined;
        }
        if (this.fontColorElement) {
            this.fontColorElement.remove();
            this.fontColorElement = undefined;
        }
        if (this.style) {
            this.style.remove();
            this.style = undefined;
        }
        if (this.remove) {
            this.remove.remove();
            this.remove = undefined;
        }
        if (this.removeContent) {
            this.removeContent.remove();
            this.removeContent = undefined;
        }
        if (this.lockedDiv) {
            this.lockedDiv.remove();
            this.lockedDiv = undefined;
        }
        if (this.lockedLabel) {
            this.lockedLabel.remove();
            this.lockedLabel = undefined;
        }
        if (this.contentDelete) {
            this.contentDelete.remove();
            this.contentDelete = undefined;
        }
        if (this.contentDeleted) {
            this.contentDeleted.remove();
            this.contentDeleted = undefined;
        }
        if (this.contentEdit) {
            this.contentEdit.remove();
            this.contentEdit = undefined;
        }
        if (this.contentEdited) {
            this.contentEdited.remove();
            this.contentEdited = undefined;
        }
        if (this.plainTextLabel) {
            this.plainTextLabel.remove();
            this.plainTextLabel = undefined;
        }
        if (this.multiline) {
            this.multiline.remove();
            this.multiline = undefined;
        }
        if (this.lockedcontentLabel) {
            this.lockedcontentLabel.remove();
            this.lockedcontentLabel = undefined;
        }
        if (this.commonDiv) {
            this.commonDiv.remove();
            this.commonDiv = undefined;
        }
        if (this.searchDiv) {
            this.searchDiv.remove();
            this.searchDiv = undefined;
        }
        if (this.textBoxDiv) {
            this.textBoxDiv.remove();
            this.textBoxDiv = undefined;
        }
        if (this.valueBoxDiv) {
            this.valueBoxDiv.remove();
            this.valueBoxDiv = undefined;
        }
        if (this.listviewDiv) {
            this.listviewDiv.remove();
            this.listviewDiv = undefined;
        }
        if (this.buttonDiv) {
            this.buttonDiv.remove();
            this.buttonDiv = undefined;
        }
        if (this.addbuttonDiv) {
            this.addbuttonDiv.remove();
            this.addbuttonDiv = undefined;
        }
        if (this.addButtonElement) {
            this.addButtonElement.remove();
            this.addButtonElement = undefined;
        }
        if (this.deleteButtonDiv) {
            this.deleteButtonDiv.remove();
            this.deleteButtonDiv = undefined;
        }
        if (this.deleteButtonElement) {
            this.deleteButtonElement.remove();
            this.deleteButtonElement = undefined;
        }
    };
    return ContentControlPropertiesDialog;
}());
export { ContentControlPropertiesDialog };
