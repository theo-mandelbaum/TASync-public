import { ListView } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { createElement, L10n } from '@syncfusion/ej2-base';
/**
 * The Styles dialog is used to create or modify styles.
 */
var StylesDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function StylesDialog(documentHelper) {
        var _this = this;
        this.selecHandlerClickHandler = this.onSelecHandlerClick.bind(this);
        this.addNewStyleClickHandler = this.onAddNewStyleClick.bind(this);
        this.modifyStyleClickHandler = this.onModifyStyleClick.bind(this);
        /**
         * @private
         * @returns {void}
         */
        this.modifyStyles = function () {
            _this.documentHelper.dialog.hide();
            _this.documentHelper.owner.styleDialogModule.show(_this.styleName, _this.localValue.getConstant('Modify Style'));
        };
        /**
         * @param {SelectEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.selectHandler = function (args) {
            _this.styleName = _this.getStyleName(args.text);
        };
        /**
         * @private
         * @returns {void}
         */
        this.addNewStyles = function () {
            _this.documentHelper.dialog.hide();
            _this.documentHelper.owner.styleDialogModule.show();
        };
        this.documentHelper = documentHelper;
    }
    StylesDialog.prototype.getModuleName = function () {
        return 'StylesDialog';
    };
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value.
     * @param {string[]} styles - Specifies the styles.
     * @param {boolean} isRtl - Specifies the is rtl.
     * @returns {void}
     */
    StylesDialog.prototype.initStylesDialog = function (localValue, styles, isRtl) {
        var id = this.documentHelper.owner.containerId + '_insert_styles';
        this.target = createElement('div', { id: id, className: 'e-de-styles' });
        var headerValue = localValue.getConstant('Styles');
        this.dlgFields = createElement('div', { innerHTML: headerValue, className: 'e-de-para-dlg-heading' });
        this.target.appendChild(this.dlgFields);
        this.commonDiv = createElement('div', { className: 'e-styles-common' });
        this.target.appendChild(this.commonDiv);
        this.searchDiv = createElement('div', { className: 'e-styles-list' });
        this.commonDiv.appendChild(this.searchDiv);
        if (isRtl) {
            this.searchDiv.classList.add('e-de-rtl');
        }
        this.listviewDiv = createElement('div', { className: 'e-styles-listViewDiv', id: 'styles_listview' });
        this.searchDiv.appendChild(this.listviewDiv);
        this.listviewInstance = new ListView({
            dataSource: styles,
            cssClass: 'e-styles-listview',
            fields: { text: 'StyleName', iconCss: 'IconClass' },
            showIcon: true
        });
        this.listviewInstance.appendTo(this.listviewDiv);
        this.listviewInstance.addEventListener('select', this.selecHandlerClickHandler);
        this.buttonDiv = createElement('div', { className: 'e-styles-button' });
        this.commonDiv.appendChild(this.buttonDiv);
        this.newButtonDiv = createElement('div', { className: 'e-styles-addbutton' });
        this.buttonDiv.appendChild(this.newButtonDiv);
        this.newButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('New') + '...', id: 'new',
            attrs: { type: 'button' }
        });
        this.newButtonDiv.appendChild(this.newButtonElement);
        this.newbutton = new Button({ cssClass: 'e-button-custom' });
        this.newbutton.appendTo(this.newButtonElement);
        this.newButtonElement.addEventListener('click', this.addNewStyleClickHandler);
        this.modifybuttonDiv = createElement('div', { className: 'e-styles-addbutton' });
        this.buttonDiv.appendChild(this.modifybuttonDiv);
        this.modifyButtonElement = createElement('button', {
            innerHTML: localValue.getConstant('Modify') + '...', id: 'modify',
            attrs: { type: 'button' }
        });
        this.modifybuttonDiv.appendChild(this.modifyButtonElement);
        this.addbutton = new Button({ cssClass: 'e-button-custom' });
        this.addbutton.appendTo(this.modifyButtonElement);
        this.modifyButtonElement.addEventListener('click', this.modifyStyleClickHandler);
    };
    /**
     * @private
     * @returns {void}
     */
    StylesDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        var paraStyles = this.updateStyleNames('Paragraph').filter(function (obj) { return obj.Type === 'Paragraph'; });
        var linkedStyles = this.updateStyleNames('Paragraph').filter(function (obj) { return obj.Type === 'Linked'; });
        var charStyles = this.updateStyleNames('Character').filter(function (obj) { return obj.Type === 'Character'; });
        for (var _i = 0, linkedStyles_1 = linkedStyles; _i < linkedStyles_1.length; _i++) {
            var linkedStyle = linkedStyles_1[_i];
            for (var _a = 0, charStyles_1 = charStyles; _a < charStyles_1.length; _a++) {
                var charStyle = charStyles_1[_a];
                if (linkedStyle['StyleName'] + ' Char' === charStyle['StyleName']) {
                    charStyles.splice(charStyles.indexOf(charStyle), 1);
                    break;
                }
            }
        }
        var styles = paraStyles.concat(linkedStyles, charStyles);
        this.localValue = localValue;
        this.initStylesDialog(localValue, styles, this.documentHelper.owner.enableRtl);
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.header = localValue.getConstant('Styles');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.buttons = [{
                click: this.hideObjects.bind(this),
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
    };
    StylesDialog.prototype.updateStyleNames = function (type) {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        var collection = this.documentHelper.owner.documentHelper.styles.getStyles(type);
        var paraIcon = 'e-de-listview-icon e-de-e-paragraph-style-mark e-icons';
        var charIcon = 'e-de-listview-icon e-de-e-character-style-mark e-icons';
        var linkedIcon = 'e-de-listview-icon e-de-e-linked-style-mark e-icons';
        var finalList = [];
        for (var i = 0; i < collection.length; i++) {
            var styleName = localValue.getConstant(collection[parseInt(i.toString(), 10)].name);
            if (styleName === '') {
                styleName = collection[parseInt(i.toString(), 10)].name;
            }
            if (collection[parseInt(i.toString(), 10)].type === 'Paragraph') {
                finalList.push({ StyleName: styleName, IconClass: paraIcon, Type: collection[parseInt(i.toString(), 10)].type });
            }
            else if (collection[parseInt(i.toString(), 10)].type === 'Character') {
                finalList.push({ StyleName: styleName, IconClass: charIcon, Type: collection[parseInt(i.toString(), 10)].type });
            }
            else {
                finalList.push({ StyleName: styleName, IconClass: linkedIcon, Type: collection[parseInt(i.toString(), 10)].type });
            }
        }
        return finalList;
    };
    StylesDialog.prototype.defaultStyleName = function (styleNames) {
        var styleName = [];
        for (var index = 0; index < styleNames.length; index++) {
            styleName.push(styleNames[parseInt(index.toString(), 10)]);
        }
        return styleName;
    };
    StylesDialog.prototype.onModifyStyleClick = function () {
        this.modifyStyles();
    };
    StylesDialog.prototype.onSelecHandlerClick = function (args) {
        this.selectHandler(args);
    };
    /**
     * @param {string} styleName - Specifies the style name.
     * @private
     * @returns {string} - Returns the style name.
     */
    StylesDialog.prototype.getStyleName = function (styleName) {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        if (localValue.getConstant('Heading 1') === styleName) {
            styleName = 'Heading 1';
        }
        else if (localValue.getConstant('Heading 2') === styleName) {
            styleName = 'Heading 2';
        }
        else if (localValue.getConstant('Heading 3') === styleName) {
            styleName = 'Heading 3';
        }
        else if (localValue.getConstant('Heading 4') === styleName) {
            styleName = 'Heading 4';
        }
        else if (localValue.getConstant('Heading 5') === styleName) {
            styleName = 'Heading 5';
        }
        else if (localValue.getConstant('Heading 6') === styleName) {
            styleName = 'Heading 6';
        }
        else if (localValue.getConstant('Normal') === styleName) {
            styleName = 'Normal';
        }
        else if (localValue.getConstant('Header') === styleName) {
            styleName = 'Header';
        }
        else if (localValue.getConstant('Footer') === styleName) {
            styleName = 'Footer';
        }
        return styleName;
    };
    /**
     * @private
     * @returns {void}
     */
    StylesDialog.prototype.hideObjects = function () {
        this.documentHelper.dialog.hide();
        this.documentHelper.updateFocus();
    };
    StylesDialog.prototype.onAddNewStyleClick = function () {
        this.addNewStyles();
    };
    /**
     * @private
     * @returns {void}
     */
    StylesDialog.prototype.destroy = function () {
        if (this.listviewInstance) {
            this.listviewInstance.destroy();
            this.listviewInstance = undefined;
        }
        this.removeEvents();
        this.removeElements();
        this.documentHelper = undefined;
        this.styleName = undefined;
        this.localValue = undefined;
        this.target = undefined;
    };
    StylesDialog.prototype.removeEvents = function () {
        if (this.newButtonElement) {
            this.newButtonElement.removeEventListener('click', this.addNewStyleClickHandler);
        }
        if (this.modifyButtonElement) {
            this.modifyButtonElement.removeEventListener('click', this.modifyStyleClickHandler);
        }
        if (this.listviewInstance) {
            this.listviewInstance.removeEventListener('select', this.selecHandlerClickHandler);
        }
    };
    StylesDialog.prototype.removeElements = function () {
        if (this.dlgFields) {
            this.dlgFields.remove();
            this.dlgFields = undefined;
        }
        if (this.commonDiv) {
            this.commonDiv.remove();
            this.commonDiv = undefined;
        }
        if (this.searchDiv) {
            this.searchDiv.remove();
            this.searchDiv = undefined;
        }
        if (this.listviewDiv) {
            this.listviewDiv.remove();
            this.listviewDiv = undefined;
        }
        if (this.buttonDiv) {
            this.buttonDiv.remove();
            this.buttonDiv = undefined;
        }
        if (this.newButtonDiv) {
            this.newButtonDiv.remove();
            this.newButtonDiv = undefined;
        }
        if (this.newButtonElement) {
            this.newButtonElement.remove();
            this.newButtonElement = undefined;
        }
        if (this.newbutton) {
            this.newbutton.destroy();
            this.newbutton = undefined;
        }
        if (this.modifybuttonDiv) {
            this.modifybuttonDiv.remove();
            this.modifybuttonDiv = undefined;
        }
        if (this.modifyButtonElement) {
            this.modifyButtonElement.remove();
            this.modifyButtonElement = undefined;
        }
        if (this.addbutton) {
            this.addbutton.destroy();
            this.addbutton = undefined;
        }
    };
    return StylesDialog;
}());
export { StylesDialog };
