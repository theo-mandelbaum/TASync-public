import { createElement, L10n, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox, Button } from '@syncfusion/ej2-buttons';
import { FieldElementBox, DropDownFormField } from '../viewer/page';
import { ListView } from '@syncfusion/ej2-lists';
import { TextBox } from '@syncfusion/ej2-inputs';
/**
 * Form field drop-down dialog is used to modify the value in drop-down form field.
 */
var DropDownFormFieldDialog = /** @class */ (function () {
    function DropDownFormFieldDialog(owner) {
        var _this = this;
        this.moveDownItemClickHandler = this.onMouseDownItemClick.bind(this);
        this.keyUpOnTextBoxClickHandler = this.onKeyUpOnTextBoxClick.bind(this);
        this.addItemtoListClickHandler = this.onAddItemtoListClick.bind(this);
        this.moveUpItemClickHandler = this.onMoveUpItemClick.bind(this);
        this.removeItemFromListClickHandler = this.onRemoveItemFromListClick.bind(this);
        /**
         * @private
         * @returns {void}
         */
        this.addItemtoList = function () {
            _this.dropDownItems.push(_this.drpDownItemsInput.value);
            _this.currentSelectedItem = _this.drpDownItemsInput.value;
            _this.drpDownItemsInput.value = '';
            _this.enableOrDisableButton();
            _this.updateList();
        };
        /**
         * @private
         * @returns {void}
         */
        this.removeItemFromList = function () {
            for (var i = 0; i < _this.dropDownItems.length; i++) {
                if (_this.dropDownItems[i] === _this.currentSelectedItem) {
                    _this.dropDownItems.splice(i, 1);
                }
            }
            _this.updateList();
        };
        /**
         * @private
         * @returns {void}
         */
        this.selectHandler = function (args) {
            _this.currentSelectedItem = args.text;
        };
        /**
         * @private
         * @returns {void}
         */
        this.moveUpItem = function () {
            var index = _this.getSelectedIndex();
            _this.moveUp(index, (index - 1));
            _this.updateList();
        };
        /**
         * @private
         * @returns {void}
         */
        this.moveDownItem = function () {
            var index = _this.getSelectedIndex();
            _this.moveDown(index, (index + 1));
            _this.updateList();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onKeyUpOnTextBox = function () {
            _this.enableOrDisableButton();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog.hide();
        };
        /**
         * @private
         * @returns {void}
         */
        this.insertDropDownField = function () {
            var dropDownField = new DropDownFormField();
            dropDownField.dropdownItems = _this.dropDownItems;
            dropDownField.selectedIndex = 0;
            dropDownField.name = _this.bookmarkInput.value;
            dropDownField.helpText = _this.tooltipInput.value;
            dropDownField.enabled = _this.dropDownEnable.checked;
            _this.owner.editorModule.editFormField('DropDown', dropDownField);
            _this.closeDropDownField();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeDropDownField = function () {
            _this.documentHelper.dialog.hide();
            _this.documentHelper.dialog.element.style.pointerEvents = '';
        };
        this.owner = owner;
    }
    Object.defineProperty(DropDownFormFieldDialog.prototype, "documentHelper", {
        get: function () {
            return this.owner.documentHelper;
        },
        enumerable: true,
        configurable: true
    });
    DropDownFormFieldDialog.prototype.getModuleName = function () {
        return 'DropDownFormFieldDialog';
    };
    /* eslint-disable  */
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    DropDownFormFieldDialog.prototype.initTextDialog = function (localValue, isRtl) {
        this.target = createElement('div');
        this.dialogDiv = createElement('div');
        this.firstDiv = createElement('div', { className: 'e-de-drp-dwn-frst-div' });
        this.drpDownItemsInput = createElement('input', {
            className: 'e-input e-bookmark-textbox-input',
            id: 'fielditems_text_box'
        });
        this.drpDownItemsInput.addEventListener('keyup', this.keyUpOnTextBoxClickHandler);
        this.secondDiv = createElement('div', { className: 'e-de-ff-drpdwn-dlg-scndiv' });
        this.itemsDrpItemsLabel = createElement('div', {
            className: 'e-de-ff-dlg-drpdwn-heading',
            innerHTML: localValue.getConstant('Items in dropdown list')
        });
        this.listviewDiv = createElement('div', {
            className: 'e-bookmark-listViewDiv e-de-ff-drpdwn-listview',
            attrs: { style: 'height:100%' }
        });
        this.listviewInstance = new ListView({
            cssClass: 'e-bookmark-listview',
            select: this.selectHandler
        });
        this.buttonDiv = createElement('div');
        this.addButtonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        this.addButtonEle = createElement('button', {
            innerHTML: localValue.getConstant('ADD'),
            attrs: { type: 'button', style: 'height:36px;width:100%' }
        });
        this.addButton = new Button({ cssClass: 'e-button-custom' });
        this.addButton.disabled = true;
        this.addButtonEle.setAttribute('aria-label', localValue.getConstant('ADD'));
        this.addButtonEle.addEventListener('click', this.addItemtoListClickHandler);
        this.editButtonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        this.editButtonDiv.style.display = 'none';
        this.editButtonEle = createElement('button', {
            innerHTML: 'EDIT',
            attrs: { type: 'button', style: 'height:36px;width:100%' }
        });
        this.editButton = new Button({ cssClass: 'e-button-custom' });
        this.editButtonEle.setAttribute('aria-label', 'EDIT');
        this.removeButtonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        this.removeButtonEle = createElement('button', {
            innerHTML: localValue.getConstant('REMOVE'),
            attrs: { type: 'button', style: 'height:36px;width:100%' }
        });
        this.removeButtonEle.setAttribute('aria-label', localValue.getConstant('REMOVE'));
        this.removeButton = new Button({ cssClass: 'e-button-custom' });
        this.removeButtonEle.addEventListener('click', this.removeItemFromListClickHandler);
        this.moveBtnDiv = createElement('div', { attrs: { style: 'display:inline-flex' } });
        this.moveUpButtonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        this.moveUpButtonEle = createElement('button', {
            attrs: { type: 'button', style: 'height:36px;width:40px' },
            className: 'e-de-ff-drpdwn-mvup'
        });
        this.moveUpButtonEle.setAttribute('aria-label', 'moveUp');
        this.moveUpButton = new Button({ cssClass: 'e-button-custom', iconCss: 'e-de-arrow-up' });
        this.moveUpButtonEle.addEventListener('click', this.moveUpItemClickHandler);
        this.moveDownButtonDiv = createElement('div', { className: 'e-bookmark-addbutton' });
        this.moveDownButtonEle = createElement('button', {
            attrs: { type: 'button', style: 'height:36px;width:40px' },
            className: 'e-de-ff-drpdwn-mvdn'
        });
        this.moveDownButtonEle.setAttribute('aria-label', 'moveDown');
        this.moveDownButton = new Button({ cssClass: 'e-button-custom', iconCss: 'e-de-arrow-down' });
        this.moveDownButtonEle.addEventListener('click', this.moveDownItemClickHandler);
        this.fileSettingsLabel = createElement('div', {
            className: 'e-de-para-dlg-heading',
            innerHTML: localValue.getConstant('Field settings')
        });
        this.thirdDiv = createElement('div', { className: 'e-de-container-row' });
        this.toolTipDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.bookmarkDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.tooltipInput = createElement('input', { className: 'e-input e-bookmark-textbox-input' });
        this.bookmarkInput = createElement('input', { className: 'e-input e-bookmark-textbox-input' });
        this.dropDownEnableDiv = createElement('div');
        this.dropDownEnableEle = createElement('input', { attrs: { type: 'checkbox' } });
        this.dropDownEnable = new CheckBox({
            cssClass: 'e-de-ff-dlg-check',
            label: localValue.getConstant('Dropdown enabled'),
            enableRtl: isRtl
        });
        if (isRtl) {
            this.listviewDiv.classList.add('e-de-rtl');
            this.moveUpButtonEle.classList.add('e-de-rtl');
            this.toolTipDiv.classList.add('e-de-rtl');
            this.bookmarkDiv.classList.add('e-de-rtl');
        }
        this.dropDownEnableDiv.setAttribute('aria-label', localValue.getConstant('Dropdown enabled'));
        this.target.appendChild(this.dialogDiv);
        this.dialogDiv.appendChild(this.firstDiv);
        this.firstDiv.appendChild(this.drpDownItemsInput);
        this.dialogDiv.appendChild(this.itemsDrpItemsLabel);
        this.dialogDiv.appendChild(this.secondDiv);
        this.secondDiv.appendChild(this.listviewDiv);
        this.listviewInstance.appendTo(this.listviewDiv);
        this.secondDiv.appendChild(this.buttonDiv);
        this.buttonDiv.appendChild(this.addButtonDiv);
        this.addButtonDiv.appendChild(this.addButtonEle);
        this.addButton.appendTo(this.addButtonEle);
        this.buttonDiv.appendChild(this.editButtonDiv);
        this.editButtonDiv.appendChild(this.editButtonEle);
        this.editButton.appendTo(this.editButtonEle);
        this.buttonDiv.appendChild(this.removeButtonDiv);
        this.removeButtonDiv.appendChild(this.removeButtonEle);
        this.removeButton.appendTo(this.removeButtonEle);
        this.buttonDiv.appendChild(this.moveBtnDiv);
        this.moveBtnDiv.appendChild(this.moveUpButtonDiv);
        this.moveUpButtonDiv.appendChild(this.moveUpButtonEle);
        this.moveUpButton.appendTo(this.moveUpButtonEle);
        this.moveBtnDiv.appendChild(this.moveDownButtonDiv);
        this.moveDownButtonDiv.appendChild(this.moveDownButtonEle);
        this.moveDownButton.appendTo(this.moveDownButtonEle);
        this.dialogDiv.appendChild(this.fileSettingsLabel);
        this.dialogDiv.appendChild(this.thirdDiv);
        this.thirdDiv.appendChild(this.toolTipDiv);
        this.toolTipDiv.appendChild(this.tooltipInput);
        this.thirdDiv.appendChild(this.bookmarkDiv);
        this.bookmarkDiv.appendChild(this.bookmarkInput);
        this.dialogDiv.appendChild(this.dropDownEnableDiv);
        this.dropDownEnableDiv.appendChild(this.dropDownEnableEle);
        this.dropDownEnable.appendTo(this.dropDownEnableEle);
        new TextBox({ placeholder: localValue.getConstant('Tooltip'), floatLabelType: 'Always' }, this.tooltipInput);
        new TextBox({ placeholder: localValue.getConstant('Name'), floatLabelType: 'Always' }, this.bookmarkInput);
        new TextBox({ placeholder: localValue.getConstant('Dropdown items'), floatLabelType: 'Always' }, this.drpDownItemsInput);
        this.tooltipInput.setAttribute('aria-labelledby', localValue.getConstant('Tooltip'));
        this.bookmarkInput.setAttribute('aria-labelledby', localValue.getConstant('Name'));
        this.drpDownItemsInput.setAttribute('aria-labelledby', localValue.getConstant('Dropdown items'));
    };
    /**
     * @private
     * @returns {void}
     */
    DropDownFormFieldDialog.prototype.show = function () {
        var localObj = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localObj.setLocale(this.documentHelper.owner.locale);
        if (isNullOrUndefined(this.target)) {
            this.initTextDialog(localObj, this.documentHelper.owner.enableRtl);
        }
        this.loadDropDownDialog();
        this.documentHelper.dialog.header = localObj.getConstant('Drop Down Form Field');
        this.documentHelper.dialog.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = '448px';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.buttons = [{
                click: this.insertDropDownField,
                buttonModel: { content: localObj.getConstant('Ok'), cssClass: 'e-flat e-table-cell-margin-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-table-cell-margin-cancel' }
            }];
        this.documentHelper.dialog.show();
    };
    /**
     * @private
     * @returns {void}
     */
    DropDownFormFieldDialog.prototype.loadDropDownDialog = function () {
        var inline = this.owner.selectionModule.getCurrentFormField();
        if (inline instanceof FieldElementBox) {
            this.fieldBegin = inline;
            this.dropDownInstance = inline.formFieldData;
            if (this.dropDownInstance.dropdownItems.length > 0) {
                var index = this.dropDownInstance.selectedIndex;
                this.currentSelectedItem = this.dropDownInstance.dropdownItems[index];
            }
            if (this.dropDownInstance.enabled) {
                this.dropDownEnable.checked = true;
            }
            else {
                this.dropDownEnable.disabled = false;
            }
            if (this.dropDownInstance.helpText !== '') {
                this.tooltipInput.value = this.dropDownInstance.helpText;
            }
            else {
                this.tooltipInput.value = '';
            }
            if (this.dropDownInstance.name !== '') {
                this.bookmarkInput.value = this.dropDownInstance.name;
            }
            else {
                this.bookmarkInput.value = '';
            }
            this.dropDownItems = this.dropDownInstance.dropdownItems.slice();
            this.updateList();
        }
    };
    // sets updated list to dialog & refresh the List
    DropDownFormFieldDialog.prototype.updateList = function () {
        this.listviewInstance.dataSource = this.dropDownItems.slice();
        this.listviewInstance.dataBind();
        if (this.currentSelectedItem) {
            var toSelectItem = this.currentSelectedItem;
            this.listviewInstance.selectItem(toSelectItem);
        }
    };
    DropDownFormFieldDialog.prototype.onAddItemtoListClick = function () {
        this.addItemtoList();
    };
    DropDownFormFieldDialog.prototype.onRemoveItemFromListClick = function () {
        this.removeItemFromList();
    };
    DropDownFormFieldDialog.prototype.onMoveUpItemClick = function () {
        this.moveUpItem();
    };
    DropDownFormFieldDialog.prototype.onMouseDownItemClick = function () {
        this.moveDownItem();
    };
    DropDownFormFieldDialog.prototype.getSelectedIndex = function () {
        for (var i = 0; i < this.dropDownItems.length; i++) {
            if (this.dropDownItems[i] === this.currentSelectedItem) {
                return i;
            }
        }
        return 0;
    };
    DropDownFormFieldDialog.prototype.moveUp = function (fromIndex, toIndex) {
        var tempData = [];
        if (fromIndex === 0) {
            for (var i = 0; i < this.dropDownItems.length; i++) {
                if (i < (this.dropDownItems.length - 1)) {
                    tempData[i] = this.dropDownItems[i + 1];
                }
                else {
                    tempData[i] = this.dropDownItems[0];
                }
            }
            this.dropDownItems = tempData;
        }
        else {
            var temp = this.dropDownItems[fromIndex];
            this.dropDownItems[fromIndex] = this.dropDownItems[toIndex];
            this.dropDownItems[toIndex] = temp;
        }
    };
    DropDownFormFieldDialog.prototype.moveDown = function (fromIndex, toIndex) {
        var tempData = [];
        if (fromIndex === (this.dropDownItems.length - 1)) {
            for (var i = 0; i < this.dropDownItems.length; i++) {
                if (i !== 0) {
                    tempData[i] = this.dropDownItems[i - 1];
                }
                else {
                    tempData[i] = this.dropDownItems[(this.dropDownItems.length - 1)];
                }
            }
            this.dropDownItems = tempData;
        }
        else {
            var temp = this.dropDownItems[fromIndex];
            this.dropDownItems[fromIndex] = this.dropDownItems[toIndex];
            this.dropDownItems[toIndex] = temp;
        }
    };
    DropDownFormFieldDialog.prototype.onKeyUpOnTextBoxClick = function () {
        this.onKeyUpOnTextBox();
    };
    DropDownFormFieldDialog.prototype.enableOrDisableButton = function () {
        if (!isNullOrUndefined(this.addButton)) {
            this.addButton.disabled = (this.drpDownItemsInput.value === '');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    DropDownFormFieldDialog.prototype.destroy = function () {
        var dropDownDialogTarget = this.target;
        if (dropDownDialogTarget) {
            if (dropDownDialogTarget.parentElement) {
                dropDownDialogTarget.parentElement.removeChild(dropDownDialogTarget);
            }
            this.target = undefined;
        }
        this.owner = undefined;
        this.drpDownItemsInput = undefined;
        this.removeEvents();
        this.removeElements();
        if (this.listviewInstance) {
            this.listviewInstance.destroy();
            this.listviewInstance = undefined;
        }
        if (this.addButton) {
            this.addButton.destroy();
            this.addButton = undefined;
        }
        if (this.editButton) {
            this.editButton.destroy();
            this.editButton = undefined;
        }
        if (this.removeButton) {
            this.removeButton.destroy();
            this.removeButton = undefined;
        }
        if (this.moveUpButton) {
            this.moveUpButton.destroy();
            this.moveUpButton = undefined;
        }
        if (this.moveDownButton) {
            this.moveDownButton.destroy();
            this.moveDownButton = undefined;
        }
        this.tooltipInput = undefined;
        this.bookmarkInput = undefined;
        if (this.dropDownEnable) {
            this.dropDownEnable.destroy();
            this.dropDownEnable = undefined;
        }
        this.dropDownInstance = undefined;
    };
    DropDownFormFieldDialog.prototype.removeEvents = function () {
        if (this.addButtonEle) {
            this.addButtonEle.removeEventListener('click', this.addItemtoListClickHandler);
        }
        if (this.removeButtonEle) {
            this.removeButtonEle.removeEventListener('click', this.removeItemFromListClickHandler);
        }
        if (this.moveUpButtonEle) {
            this.moveUpButtonEle.removeEventListener('click', this.moveUpItemClickHandler);
        }
        if (this.moveDownButtonEle) {
            this.moveDownButtonEle.removeEventListener('click', this.moveDownItemClickHandler);
        }
        if (this.drpDownItemsInput) {
            this.drpDownItemsInput.removeEventListener('keyup', this.keyUpOnTextBoxClickHandler);
        }
    };
    DropDownFormFieldDialog.prototype.removeElements = function () {
        if (this.dialogDiv) {
            this.dialogDiv.remove();
            this.dialogDiv = undefined;
        }
        if (this.firstDiv) {
            this.firstDiv.remove();
            this.firstDiv = undefined;
        }
        if (this.secondDiv) {
            this.secondDiv.remove();
            this.secondDiv = undefined;
        }
        if (this.itemsDrpItemsLabel) {
            this.itemsDrpItemsLabel.remove();
            this.itemsDrpItemsLabel = undefined;
        }
        if (this.listviewDiv) {
            this.listviewDiv.remove();
            this.listviewDiv = undefined;
        }
        if (this.buttonDiv) {
            this.buttonDiv.remove();
            this.buttonDiv = undefined;
        }
        if (this.addButtonDiv) {
            this.addButtonDiv.remove();
            this.addButtonDiv = undefined;
        }
        if (this.addButtonEle) {
            this.addButtonEle.remove();
            this.addButtonEle = undefined;
        }
        if (this.editButtonDiv) {
            this.editButtonDiv.remove();
            this.editButtonDiv = undefined;
        }
        if (this.editButtonEle) {
            this.editButtonEle.remove();
            this.editButtonEle = undefined;
        }
        if (this.removeButtonDiv) {
            this.removeButtonDiv.remove();
            this.removeButtonDiv = undefined;
        }
        if (this.removeButtonEle) {
            this.removeButtonEle.remove();
            this.removeButtonEle = undefined;
        }
        if (this.moveBtnDiv) {
            this.moveBtnDiv.remove();
            this.moveBtnDiv = undefined;
        }
        if (this.moveUpButtonDiv) {
            this.moveUpButtonDiv.remove();
            this.moveUpButtonDiv = undefined;
        }
        if (this.moveUpButtonEle) {
            this.moveUpButtonEle.remove();
            this.moveUpButtonEle = undefined;
        }
        if (this.moveDownButtonDiv) {
            this.moveDownButtonDiv.remove();
            this.moveDownButtonDiv = undefined;
        }
        if (this.moveDownButtonEle) {
            this.moveDownButtonEle.remove();
            this.moveDownButtonEle = undefined;
        }
        if (this.fileSettingsLabel) {
            this.fileSettingsLabel.remove();
            this.fileSettingsLabel = undefined;
        }
        if (this.thirdDiv) {
            this.thirdDiv.remove();
            this.thirdDiv = undefined;
        }
        if (this.toolTipDiv) {
            this.toolTipDiv.remove();
            this.toolTipDiv = undefined;
        }
        if (this.bookmarkDiv) {
            this.bookmarkDiv.remove();
            this.bookmarkDiv = undefined;
        }
        if (this.dropDownEnableDiv) {
            this.dropDownEnableDiv.remove();
            this.dropDownEnableDiv = undefined;
        }
        if (this.dropDownEnableEle) {
            this.dropDownEnableEle.remove();
            this.dropDownEnableEle = undefined;
        }
    };
    return DropDownFormFieldDialog;
}());
export { DropDownFormFieldDialog };
