import { createElement, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { HelperMethods } from '../editor/editor-helper';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TextBox } from '@syncfusion/ej2-inputs';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
/**
 * The Hyperlink dialog is used to insert or edit hyperlink at selection.
 */
/* eslint-disable max-len */
var HyperlinkDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function HyperlinkDialog(documentHelper) {
        var _this = this;
        this.displayText = '';
        this.navigationUrl = undefined;
        this.screenTipText = '';
        this.bookmarkDropdown = undefined;
        this.bookmarkCheckbox = undefined;
        this.keyUpOnDisplayBoxClickHandler = this.onKeyUpOnDisplayBoxClick.bind(this);
        this.onKeyUpOnUrlBoxClickHandler = this.onKeyUpOnUrlBoxClick.bind(this);
        this.onScreenTipTextBoxClickHandler = this.onScreenTipTextBoxClick.bind(this);
        this.bookmarks = [];
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.onKeyUpOnUrlBox = function (event) {
            if (event.keyCode === 13) {
                if (_this.displayTextBox.value !== '' && _this.urlTextBox.value !== '') {
                    _this.onInsertHyperlink();
                }
                return;
            }
            //const selectedText: string = this.documentHelper.selection.text;
            var urlValue = _this.urlTextBox.value;
            if (urlValue.substring(0, 4).toLowerCase() === 'www.') {
                _this.urlTextBox.value = 'http://' + urlValue;
            }
            if (_this.displayText === '') {
                _this.displayTextBox.value = urlValue;
            }
            _this.enableOrDisableInsertButton();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onKeyUpOnDisplayBox = function () {
            _this.displayText = _this.displayTextBox.value;
            _this.enableOrDisableInsertButton();
        };
        this.onScreenTipTextBox = function () {
            _this.screenTipText = _this.screenTipTextBox.value;
        };
        /**
         * @private
         * @returns {void}
         */
        this.onInsertButtonClick = function () {
            _this.onInsertHyperlink();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog.hide();
            _this.clearValue();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.loadHyperlinkDialog = function () {
            _this.documentHelper.updateFocus();
            _this.bookmarks = [];
            for (var i = 0; i < _this.documentHelper.bookmarks.keys.length; i++) {
                var bookmark = _this.documentHelper.bookmarks.keys[parseInt(i.toString(), 10)];
                if (bookmark.indexOf('_') !== 0) {
                    _this.bookmarks.push(bookmark);
                }
            }
            var fieldBegin = _this.documentHelper.selection.getHyperlinkField();
            if (!isNullOrUndefined(fieldBegin)) {
                if (!isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    var format = undefined;
                    var fieldObj = _this.documentHelper.selection.getHyperlinkDisplayText(fieldBegin.fieldSeparator.line.paragraph, fieldBegin.fieldSeparator, fieldBegin.fieldEnd, false, format);
                    _this.displayText = fieldObj.displayText;
                    _this.displayTextBox.disabled = fieldObj.isNestedField;
                }
                _this.displayTextBox.value = _this.displayText;
                _this.screenTipTextBox.value = _this.documentHelper.selection.getLinkText(fieldBegin, false);
                var link = _this.documentHelper.selection.getLinkText(fieldBegin, true);
                _this.urlTextBox.value = _this.navigationUrl = link;
                _this.documentHelper.dialog.header = _this.localObj.getConstant('Edit Hyperlink');
            }
            else {
                _this.displayText = _this.documentHelper.selection.getText(true);
                if (_this.displayText !== '') {
                    if (_this.displayText.indexOf(String.fromCharCode(65532)) !== -1 ||
                        _this.displayText.indexOf('\r') !== -1 && (_this.displayText.lastIndexOf('\r') !== -1 &&
                            _this.displayText.slice(0, -1).indexOf('\r') !== -1)) {
                        _this.displayTextBox.value = '<<Selection in document>>';
                        _this.displayTextBox.disabled = true;
                    }
                    else {
                        _this.displayTextBox.value = _this.displayText;
                    }
                }
            }
            _this.bookmarkDiv.style.display = 'none';
            _this.addressText.style.display = 'block';
            _this.urlTextBox.style.display = 'block';
            _this.bookmarkCheckbox.checked = false;
            _this.bookmarkDropdown.dataSource = _this.documentHelper.bookmarks.keys;
            _this.insertButton = document.getElementsByClassName('e-hyper-insert')[0];
            _this.enableOrDisableInsertButton();
            _this.urlTextBox.focus();
            if (_this.documentHelper.selection.caret.style.display !== 'none') {
                _this.documentHelper.selection.caret.style.display = 'none';
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeHyperlinkDialog = function () {
            _this.clearValue();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @param {CheckBoxChangeArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.onUseBookmarkChange = function (args) {
            if (args.checked) {
                _this.bookmarkDiv.style.display = 'block';
                _this.bookmarkDropdown.dataSource = _this.bookmarks;
                _this.addressText.style.display = 'none';
                _this.urlTextBox.style.display = 'none';
            }
            else {
                _this.bookmarkDiv.style.display = 'none';
                _this.addressText.style.display = 'block';
                _this.urlTextBox.style.display = 'block';
            }
            _this.enableOrDisableInsertButton();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onBookmarkchange = function () {
            if (_this.bookmarkDropdown.value !== '') {
                _this.insertButton.disabled = false;
            }
        };
        this.documentHelper = documentHelper;
    }
    HyperlinkDialog.prototype.getModuleName = function () {
        return 'HyperlinkDialog';
    };
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    HyperlinkDialog.prototype.initHyperlinkDialog = function (localValue, isRtl) {
        this.target = createElement('div', { className: 'e-de-hyperlink' });
        this.container = createElement('div');
        this.displayText1 = createElement('div', { className: 'e-de-dlg-container' });
        this.displayTextBox = createElement('input', { className: 'e-input' });
        this.displayTextBox.addEventListener('keyup', this.keyUpOnDisplayBoxClickHandler);
        this.displayText1.appendChild(this.displayTextBox);
        this.container.appendChild(this.displayText1);
        //container.appendChild(this.displayTextBox);
        this.addressText = createElement('div', { className: 'e-de-dlg-container' });
        this.urlTextBox = createElement('input', { className: 'e-input', attrs: { autofocus: 'true' } });
        this.urlTextBox.addEventListener('input', this.onKeyUpOnUrlBoxClickHandler);
        this.urlTextBox.addEventListener('keyup', this.onKeyUpOnUrlBoxClickHandler);
        this.addressText.appendChild(this.urlTextBox);
        this.container.appendChild(this.addressText);
        //container.appendChild(this.urlTextBox);
        this.screenTipText1 = createElement('div', { className: 'e-de-dlg-container' });
        this.screenTipTextBox = createElement('input', { className: 'e-input' });
        this.screenTipTextBox.addEventListener('keyup', this.onScreenTipTextBoxClickHandler);
        this.screenTipText1.appendChild(this.screenTipTextBox);
        this.container.appendChild(this.screenTipText1);
        //container.appendChild(this.screenTipTextBox);
        this.bookmarkDiv = createElement('div', { styles: 'display:none;' });
        this.bookmarkText = createElement('div', { className: 'e-de-dlg-container' });
        //const bookmarkTextElement: HTMLElement = createElement('div', { className: 'e-de-hyperlink-dlg-bookmark' });
        this.bookmarkValue = createElement('input');
        this.bookmarkText.appendChild(this.bookmarkValue);
        this.bookmarkDropdown = new DropDownList({
            dataSource: [], change: this.onBookmarkchange,
            noRecordsTemplate: localValue.getConstant('No bookmarks found'),
            placeholder: localValue.getConstant('Bookmark'), floatLabelType: 'Always'
        });
        this.bookmarkDropdown.appendTo(this.bookmarkValue);
        this.bookmarkDiv.appendChild(this.bookmarkText);
        //this.bookmarkDiv.appendChild(bookmarkTextElement);
        this.container.appendChild(this.bookmarkDiv);
        this.bookmarkCheckDiv = createElement('div');
        this.bookmarkCheck = createElement('input', { attrs: { type: 'checkbox' } });
        this.bookmarkCheckDiv.appendChild(this.bookmarkCheck);
        this.bookmarkCheckbox = new CheckBox({
            label: localValue.getConstant('Use bookmarks'),
            enableRtl: isRtl, change: this.onUseBookmarkChange
        });
        this.bookmarkCheckbox.appendTo(this.bookmarkCheck);
        this.container.appendChild(this.bookmarkCheckDiv);
        this.target.appendChild(this.container);
        new TextBox({ placeholder: localValue.getConstant('Text to display'), floatLabelType: 'Always' }, this.displayTextBox);
        new TextBox({ placeholder: localValue.getConstant('Address'), floatLabelType: 'Always' }, this.urlTextBox);
        new TextBox({ placeholder: localValue.getConstant('ScreenTip text'), floatLabelType: 'Always' }, this.screenTipTextBox);
    };
    /**
     * @private
     * @returns {void}
     */
    HyperlinkDialog.prototype.show = function () {
        this.localObj = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        this.localObj.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initHyperlinkDialog(this.localObj, this.documentHelper.owner.enableRtl);
        }
        this.documentHelper.dialog.header = this.localObj.getConstant('Insert Hyperlink');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.buttons = [{
                click: this.onInsertButtonClick,
                buttonModel: { content: this.localObj.getConstant('Ok'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: this.localObj.getConstant('Cancel'), cssClass: 'e-flat e-hyper-cancel' }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.beforeOpen = this.loadHyperlinkDialog;
        this.documentHelper.dialog.close = this.closeHyperlinkDialog;
        this.documentHelper.dialog.show();
    };
    /**
     * @private
     * @returns {void}
     */
    HyperlinkDialog.prototype.hide = function () {
        this.closeHyperlinkDialog();
    };
    HyperlinkDialog.prototype.onKeyUpOnUrlBoxClick = function (event) {
        this.onKeyUpOnUrlBox(event);
    };
    HyperlinkDialog.prototype.onKeyUpOnDisplayBoxClick = function () {
        this.onKeyUpOnDisplayBox();
    };
    HyperlinkDialog.prototype.onScreenTipTextBoxClick = function () {
        this.onScreenTipTextBox();
    };
    HyperlinkDialog.prototype.enableOrDisableInsertButton = function () {
        if (!isNullOrUndefined(this.insertButton)) {
            if (this.bookmarkCheckbox.checked) {
                this.insertButton.disabled = this.bookmarkDropdown.value === '' || this.bookmarkDropdown.value == null;
            }
            else {
                this.insertButton.disabled = this.urlTextBox.value === '' || this.displayTextBox.value === '';
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    HyperlinkDialog.prototype.onInsertHyperlink = function () {
        var displayText = SanitizeHtmlHelper.sanitize(this.displayTextBox.value.trim());
        var address = this.urlTextBox.value.trim();
        if (HelperMethods.startsWith(address, 'http://') || HelperMethods.startsWith(address, 'https://')) {
            address = SanitizeHtmlHelper.sanitize(address.replace(/\s/g, ''));
        }
        var screenTipText = SanitizeHtmlHelper.sanitize(this.screenTipTextBox.value.trim());
        var isBookmark = false;
        if (!isNullOrUndefined(this.bookmarkDropdown.value) && this.bookmarkDropdown.value !== '' && this.bookmarkCheckbox.checked === true) {
            address = this.bookmarkDropdown.value;
            isBookmark = true;
        }
        if (address === '') {
            this.documentHelper.hideDialog();
            return;
        }
        if (screenTipText !== '') {
            // eslint-disable-next-line no-useless-escape
            address = address + '\"\\o \"' + screenTipText;
        }
        if (displayText === '' && address !== '') {
            displayText = address;
        }
        else {
            displayText = this.displayTextBox.value;
        }
        if (!isNullOrUndefined(this.navigationUrl)) {
            this.documentHelper.owner.editorModule.editHyperlink(this.documentHelper.selection, address, displayText, isBookmark);
        }
        else {
            var remove = (this.documentHelper.selection.text !== displayText ||
                this.documentHelper.selection.text.indexOf('\r') === -1) && !this.displayTextBox.disabled;
            this.documentHelper.owner.editorModule.insertHyperlinkInternal(address, displayText, remove, isBookmark);
        }
        this.documentHelper.hideDialog();
        this.navigationUrl = undefined;
    };
    /**
     * @private
     * @returns {void}
     */
    HyperlinkDialog.prototype.clearValue = function () {
        this.displayTextBox.value = '';
        this.urlTextBox.value = '';
        this.screenTipText = '';
        this.screenTipTextBox.value = '';
        this.displayText = '';
        this.displayTextBox.disabled = false;
        this.bookmarks = [];
    };
    /**
     * @private
     * @returns {void}
     */
    HyperlinkDialog.prototype.destroy = function () {
        if (this.displayTextBox) {
            this.displayTextBox.innerHTML = '';
            this.displayTextBox = undefined;
        }
        if (this.urlTextBox) {
            this.urlTextBox.parentElement.removeChild(this.urlTextBox);
            this.urlTextBox = undefined;
        }
        if (this.screenTipTextBox) {
            this.screenTipTextBox.parentElement.removeChild(this.screenTipTextBox);
            this.screenTipTextBox = undefined;
        }
        this.documentHelper = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            this.target.innerHTML = '';
            this.target = undefined;
        }
        this.removeEvents();
        this.removeElements();
    };
    HyperlinkDialog.prototype.removeEvents = function () {
        if (this.displayTextBox) {
            this.displayTextBox.removeEventListener('keyup', this.keyUpOnDisplayBoxClickHandler);
        }
        if (this.urlTextBox) {
            this.urlTextBox.removeEventListener('input', this.onKeyUpOnUrlBoxClickHandler);
            this.urlTextBox.removeEventListener('keyup', this.onKeyUpOnUrlBoxClickHandler);
        }
        if (this.screenTipTextBox) {
            this.screenTipTextBox.removeEventListener('keyup', this.onScreenTipTextBoxClickHandler);
        }
    };
    HyperlinkDialog.prototype.removeElements = function () {
        if (this.container) {
            this.container.remove();
            this.container = undefined;
        }
        if (this.displayText1) {
            this.displayText1.remove();
            this.displayText1 = undefined;
        }
        if (this.addressText) {
            this.addressText.remove();
            this.addressText = undefined;
        }
        if (this.screenTipText1) {
            this.screenTipText1.remove();
            this.screenTipText1 = undefined;
        }
        if (this.bookmarkDiv) {
            this.bookmarkDiv.remove();
            this.bookmarkDiv = undefined;
        }
        if (this.bookmarkText) {
            this.bookmarkText.remove();
            this.bookmarkText = undefined;
        }
        if (this.bookmarkValue) {
            this.bookmarkValue.remove();
            this.bookmarkValue = undefined;
        }
        if (this.bookmarkCheckDiv) {
            this.bookmarkCheckDiv.remove();
            this.bookmarkCheckDiv = undefined;
        }
        if (this.bookmarkCheck) {
            this.bookmarkCheck.remove();
            this.bookmarkCheck = undefined;
        }
    };
    return HyperlinkDialog;
}());
export { HyperlinkDialog };
