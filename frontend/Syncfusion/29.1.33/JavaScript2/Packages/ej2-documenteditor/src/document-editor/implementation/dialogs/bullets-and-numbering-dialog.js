import { createElement, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { Tab } from '@syncfusion/ej2-navigations';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WListLevel } from '../list/list-level';
import { WListFormat } from '../../implementation/format/list-format';
/**
 * The Bullets and Numbering dialog is used to apply list format for a paragraph style.
 */
var BulletsAndNumberingDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function BulletsAndNumberingDialog(documentHelper) {
        var _this = this;
        this.isBullet = false;
        this.numberListClickHandler = this.onNumberListClick.bind(this);
        this.bulletListClickHandler = this.onBulletListClick.bind(this);
        /* eslint-disable */
        /**
         * @param args
         * @private
         */
        this.numberListClick = function (args) {
            _this.isBullet = false;
            _this.setActiveElement(args);
            if (args.currentTarget.classList.contains('e-de-list-numbered-none')) {
                _this.numberFormat = undefined;
                _this.listLevelPattern = undefined;
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-number-dot')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'Arabic';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-number-brace')) {
                _this.numberFormat = '%1)';
                _this.listLevelPattern = 'Arabic';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-up-roman')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'UpRoman';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-up-letter')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'UpLetter';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-low-letter-brace')) {
                _this.numberFormat = '%1)';
                _this.listLevelPattern = 'LowLetter';
            }
            else if (args.currentTarget.classList.contains('e-de-numbered-low-letter-dot')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'LowLetter';
            }
            else if (args.currentTarget.classList.contains('e-de-list-numbered-low-roman')) {
                _this.numberFormat = '%1.';
                _this.listLevelPattern = 'LowRoman';
            }
        };
        /**
         * @param args
         * @private
         */
        this.bulletListClick = function (args) {
            _this.isBullet = true;
            _this.setActiveElement(args);
            if (args.currentTarget.classList.contains('e-bullet-none')) {
                _this.symbol = undefined;
                _this.fontFamily = undefined;
            }
            else if (args.currentTarget.classList.contains('e-bullet-dot')) {
                _this.symbol = String.fromCharCode(61623);
                _this.fontFamily = 'Symbol';
            }
            else if (args.currentTarget.classList.contains('e-bullet-circle')) {
                _this.symbol = String.fromCharCode(61551) + String.fromCharCode(32);
                _this.fontFamily = 'Symbol';
            }
            else if (args.currentTarget.classList.contains('e-bullet-square')) {
                _this.symbol = String.fromCharCode(61607);
                _this.fontFamily = 'Wingdings';
            }
            else if (args.currentTarget.classList.contains('e-bullet-flower')) {
                _this.symbol = String.fromCharCode(61558);
                _this.fontFamily = 'Wingdings';
            }
            else if (args.currentTarget.classList.contains('e-bullet-arrow')) {
                _this.symbol = String.fromCharCode(61656);
                _this.fontFamily = 'Wingdings';
            }
            else if (args.currentTarget.classList.contains('e-bullet-tick')) {
                _this.symbol = String.fromCharCode(61692);
                _this.fontFamily = 'Wingdings';
            }
        };
        /* eslint-enable */
        /**
         * @private
         * @returns {void}
         */
        this.loadNumberingBulletDialog = function () {
            //Load
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeNumberingBulletDialog = function () {
            _this.unWireEventsAndBindings();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.isBullet = false;
            _this.listLevelPattern = undefined;
            _this.numberFormat = undefined;
            _this.symbol = undefined;
            _this.fontFamily = undefined;
            _this.documentHelper.dialog.hide();
            _this.unWireEventsAndBindings();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onOkButtonClick = function () {
            if (_this.documentHelper.owner.documentHelper.lists.length > 0) {
                /* eslint-disable-next-line max-len */
                _this.listFormat.list.listId = _this.documentHelper.owner.documentHelper.lists[_this.documentHelper.owner.documentHelper.lists.length - 1].listId + 1;
                _this.listFormat.listId = _this.listFormat.list.listId;
            }
            else {
                _this.listFormat.list.listId = 0;
                _this.listFormat.listId = 0;
            }
            if (_this.documentHelper.owner.documentHelper.abstractLists.length > 0) {
                /* eslint-disable-next-line max-len */
                _this.abstractList.abstractListId = _this.documentHelper.owner.documentHelper.abstractLists[_this.documentHelper.owner.documentHelper.abstractLists.length - 1].abstractListId + 1;
            }
            else {
                _this.abstractList.abstractListId = 0;
            }
            _this.listFormat.list.abstractListId = _this.abstractList.abstractListId;
            //const nsid: number = HelperMethods.generateUniqueId(this.documentHelper.lists);
            _this.listFormat.nsid = _this.listFormat.list.nsid = _this.abstractList.nsid;
            var listLevel = new WListLevel(_this.abstractList);
            listLevel.listLevelPattern = !isNullOrUndefined(_this.listLevelPattern) ? _this.listLevelPattern : 'Bullet';
            listLevel.numberFormat = _this.isBullet ? _this.symbol : _this.numberFormat;
            if (listLevel.listLevelPattern !== 'Bullet') {
                listLevel.startAt = 1;
            }
            listLevel.characterFormat.fontFamily = !isNullOrUndefined(_this.fontFamily) ? _this.fontFamily : 'Verdana';
            listLevel.paragraphFormat.leftIndent = 36;
            listLevel.paragraphFormat.firstLineIndent = -18;
            _this.abstractList.levels.push(listLevel);
            _this.listFormat.listLevelNumber = 0;
            _this.listFormat.list.abstractList = _this.abstractList;
            _this.documentHelper.hideDialog();
        };
        this.documentHelper = documentHelper;
    }
    /**
     * @private
     * @returns {string} Returns module name
     */
    BulletsAndNumberingDialog.prototype.getModuleName = function () {
        return 'BulletsAndNumberingDialog';
    };
    /**
     * @private
     * @param {L10n} locale - Specifies the locale.
     * @returns {void}
     */
    BulletsAndNumberingDialog.prototype.initNumberingBulletDialog = function (locale) {
        var id = this.documentHelper.owner.containerId;
        this.target = createElement('div', { id: id + '_insertNumberBulletDialog', className: 'e-de-number-bullet-dlg' });
        this.tabTarget = createElement('div', { id: id + '_tabNumberBulletDialog', className: 'e-de-tab-number-bullet-dlg' });
        this.target.appendChild(this.tabTarget);
        this.createNumberList(id, locale);
        this.createBulletList(id, locale);
        //Initialize Tab component
        this.tabObj = new Tab({
            items: [
                {
                    header: { 'text': createElement('div', { innerHTML: locale.getConstant('Numbering') }) },
                    content: this.numberListDiv
                },
                {
                    header: { 'text': createElement('div', { innerHTML: locale.getConstant('Bullets') }) },
                    content: this.bulletListDiv
                }
            ],
            heightAdjustMode: 'None',
            width: 'auto',
            selecting: this.onTabSelect.bind(this)
        });
        this.tabObj.isStringTemplate = true;
        //Render initialized Tab component
        this.tabObj.appendTo(this.tabTarget);
    };
    BulletsAndNumberingDialog.prototype.onTabSelect = function (args) {
        args.preventFocus = true;
        if (args.selectingIndex === 1) {
            this.bulletListDiv.style.display = 'block';
        }
    };
    BulletsAndNumberingDialog.prototype.createNumberList = function (id, locale) {
        this.numberListDiv = createElement('div', { className: 'e-de-style-numbered-list', id: id + '_Number' });
        var numberListDiv = this.numberListDiv;
        this.ulTag = createElement('ul', {
            styles: 'display: block; outline: 0px;',
            id: 'listMenu',
            className: 'e-de-ui-wfloating-menu e-de-ui-bullets-menu e-de-list-container e-de-list-thumbnail'
        });
        numberListDiv.appendChild(this.ulTag);
        var numberedNone = this.createNumberNoneListTag(this.ulTag, locale);
        var numberedNumberDot = this.createNumberListTag(this.ulTag, '1.', '2.', '3.', 'e-de-list-numbered-number-dot');
        var numberedNumberBrace = this.createNumberListTag(this.ulTag, '1)', '2)', '3)', 'e-de-list-numbered-number-brace');
        var numberedUpRoman = this.createNumberListTag(this.ulTag, 'I.', 'II.', 'III.', 'e-de-list-numbered-up-roman');
        var numberedUpLettter = this.createNumberListTag(this.ulTag, 'A.', 'B.', 'C.', 'e-de-list-numbered-up-letter');
        var numberedLowLetterDot = this.createNumberListTag(this.ulTag, 'a.', 'b.', 'c.', 'e-de-numbered-low-letter-dot');
        var numberedLowLetterBrace = this.createNumberListTag(this.ulTag, 'a)', 'b)', 'c)', 'e-de-list-numbered-low-letter-brace');
        var numberedLowRoman = this.createNumberListTag(this.ulTag, 'i.', 'ii.', 'iii.', 'e-de-list-numbered-low-roman');
        numberedNone.addEventListener('click', this.numberListClickHandler);
        numberedNumberDot.addEventListener('click', this.numberListClickHandler);
        numberedNumberBrace.addEventListener('click', this.numberListClickHandler);
        numberedUpRoman.addEventListener('click', this.numberListClickHandler);
        numberedUpLettter.addEventListener('click', this.numberListClickHandler);
        numberedLowLetterBrace.addEventListener('click', this.numberListClickHandler);
        numberedLowLetterDot.addEventListener('click', this.numberListClickHandler);
        numberedLowRoman.addEventListener('click', this.numberListClickHandler);
        this.target.appendChild(numberListDiv);
    };
    BulletsAndNumberingDialog.prototype.createNumberListTag = function (ulTag, text1, text2, text3, className) {
        this.liTag = createElement('li', {
            styles: 'display:block',
            className: 'e-de-ui-wfloating-menuitem e-de-ui-wfloating-menuitem-md e-de-list-items  e-de-list-item-size ' + className
        });
        ulTag.appendChild(this.liTag);
        var innerHTML = '<div>' + text1 + '<span class="e-de-ui-list-line"></span></div><div>' + text2 + '<span class="e-de-ui-list-line">';
        innerHTML += '</span></div><div>' + text3 + '<span class="e-de-ui-list-line"> </span></div >';
        this.liInnerDiv = createElement('div', {
            className: 'e-de-ui-list-header-presetmenu',
            id: 'e-de-ui-zlist0', innerHTML: innerHTML
        });
        this.liTag.style.cssFloat = 'left';
        this.liTag.appendChild(this.liInnerDiv);
        return this.liTag;
    };
    BulletsAndNumberingDialog.prototype.createNumberNoneListTag = function (ulTag, locale) {
        this.liTag1 = createElement('li', {
            styles: 'display:block',
            className: 'e-de-ui-wfloating-menuitem e-de-ui-wfloating-menuitem-md e-de-list-items  e-de-list-item-size e-de-list-numbered-none'
        });
        ulTag.appendChild(this.liTag1);
        var innerHTML = '<div class="e-de-ui-bullets e-de-bullet-icons">' + locale.getConstant('None') + '</div>';
        this.liInnerDiv1 = createElement('div', {
            className: 'e-de-ui-list-header-presetmenu',
            id: 'e-de-ui-zlist0', innerHTML: innerHTML
        });
        this.liTag1.style.cssFloat = 'left';
        this.liTag1.appendChild(this.liInnerDiv1);
        return this.liTag1;
    };
    BulletsAndNumberingDialog.prototype.createBulletListTag = function (ulTag, iconCss, className, locale) {
        this.liTag2 = createElement('li', {
            styles: 'display:block;',
            className: 'e-de-ui-wfloating-menuitem e-de-ui-wfloating-bullet-menuitem-md e-de-list-items  e-de-list-item-size ' + className
        });
        ulTag.appendChild(this.liTag2);
        var isNone = className === 'e-bullet-none';
        this.liInnerDiv2 = createElement('div', {
            className: 'e-de-ui-bullet-list-header-presetmenu e-de-bullet-icon-size',
            styles: isNone ? 'font-size:9px;text-align: center;top: 13px;left:-2px;line-height:normal;position: relative' : ''
        });
        this.liNextDiv = createElement('div', { className: !isNone ? iconCss : '', innerHTML: isNone ? locale.getConstant('None') : '' });
        this.liInnerDiv2.appendChild(this.liNextDiv);
        this.liTag2.appendChild(this.liInnerDiv2);
        return this.liTag2;
    };
    BulletsAndNumberingDialog.prototype.createBulletList = function (id, locale) {
        this.bulletListDiv = createElement('div', { className: 'e-de-ui-bullet-list-header-presetmenu', id: id + '_Bullet' });
        var bulletListDiv = this.bulletListDiv;
        bulletListDiv.style.display = 'none';
        this.ulTag1 = createElement('ul', {
            styles: 'display: block; outline: 0px;', id: 'listMenu',
            className: 'e-de-ui-wfloating-menu e-de-ui-bullets-menu e-de-list-container e-de-list-thumbnail'
        });
        bulletListDiv.appendChild(this.ulTag1);
        var bulletNone = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-none e-de-bullet-icons', 'e-bullet-none', locale);
        var bulletDot = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-dot e-de-bullet-icons', 'e-bullet-dot');
        var bulletCircle = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-circle e-de-bullet-icons', 'e-bullet-circle');
        var bulletSquare = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-square e-de-bullet-icons', 'e-bullet-square');
        var bulletFlower = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-flower e-de-bullet-icons', 'e-bullet-flower');
        var bulletArrow = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-arrow e-de-bullet-icons', 'e-bullet-arrow');
        var bulletTick = this.createBulletListTag(this.ulTag1, 'e-de-icon-bullet-list-tick e-de-bullet-icons', 'e-bullet-tick');
        bulletNone.addEventListener('click', this.bulletListClickHandler);
        bulletDot.addEventListener('click', this.bulletListClickHandler);
        bulletCircle.addEventListener('click', this.bulletListClickHandler);
        bulletSquare.addEventListener('click', this.bulletListClickHandler);
        bulletFlower.addEventListener('click', this.bulletListClickHandler);
        bulletArrow.addEventListener('click', this.bulletListClickHandler);
        bulletTick.addEventListener('click', this.bulletListClickHandler);
        this.target.appendChild(bulletListDiv);
    };
    /**
     * @private
     * @param {WListFormat} listFormat - Specifies the list format.
     * @param {WAbstractList} abstractList - Specifies the abstract list.
     * @returns {void}
     */
    BulletsAndNumberingDialog.prototype.showNumberBulletDialog = function (listFormat, abstractList) {
        if (!isNullOrUndefined(listFormat)) {
            this.listFormat = listFormat;
        }
        else {
            this.listFormat = new WListFormat();
        }
        if (isNullOrUndefined(this.listFormat.list)) {
            this.listFormat.list = new WList();
        }
        if (!isNullOrUndefined(abstractList)) {
            this.abstractList = abstractList;
        }
        else {
            this.abstractList = new WAbstractList();
        }
        var locale = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        locale.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initNumberingBulletDialog(locale);
        }
        this.documentHelper.dialog.header = locale.getConstant('Numbering and Bullets');
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.loadNumberingBulletDialog;
        this.documentHelper.dialog.close = this.closeNumberingBulletDialog;
        this.documentHelper.dialog.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog.buttons = [{
                click: this.onOkButtonClick,
                buttonModel: { content: locale.getConstant('Ok'), cssClass: 'e-flat e-numbering-bullet-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: locale.getConstant('Cancel'), cssClass: 'e-flat e-numbering-bullet-cancel' }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
        this.tabObj.refresh();
    };
    BulletsAndNumberingDialog.prototype.onNumberListClick = function (args) {
        this.numberListClick(args);
    };
    BulletsAndNumberingDialog.prototype.setActiveElement = function (args) {
        var html = args.currentTarget.parentElement;
        for (var i = 0; i < html.childElementCount; i++) {
            if (html.childNodes[i].classList.contains('e-de-list-active')) {
                html.childNodes[i].classList.remove('e-de-list-active');
            }
        }
        args.currentTarget.classList.add('e-de-list-active');
    };
    BulletsAndNumberingDialog.prototype.onBulletListClick = function (args) {
        this.bulletListClick(args);
    };
    /**
     * @private
     * @returns {void}
     */
    BulletsAndNumberingDialog.prototype.unWireEventsAndBindings = function () {
        //Unwire events
    };
    /**
     * @private
     * @returns {void}
     */
    BulletsAndNumberingDialog.prototype.destroy = function () {
        this.documentHelper = undefined;
        if (this.listFormat) {
            this.listFormat.destroy();
            this.listFormat = undefined;
        }
        if (this.tabObj) {
            this.tabObj.destroy();
            this.tabObj = undefined;
        }
        if (this.abstractList) {
            this.abstractList.destroy();
            this.abstractList = undefined;
        }
        if (this.target && this.target.parentElement) {
            this.target.parentElement.removeChild(this.target);
            for (var m = 0; m < this.target.childNodes.length; m++) {
                this.target.removeChild(this.target.childNodes[parseInt(m.toString(), 10)]);
                m--;
            }
            this.target = undefined;
        }
        this.removeEvents();
        this.removeElements();
        this.bulletListDiv = undefined;
        this.numberListDiv = undefined;
    };
    BulletsAndNumberingDialog.prototype.removeEvents = function () {
        if (this.liTag) {
            this.liTag.removeEventListener('click', this.numberListClickHandler);
        }
        if (this.liTag1) {
            this.liTag1.removeEventListener('click', this.numberListClickHandler);
        }
        if (this.liTag2) {
            this.liTag2.removeEventListener('click', this.numberListClickHandler);
        }
        if (this.liTag) {
            this.liTag.removeEventListener('click', this.bulletListClickHandler);
        }
        if (this.liTag1) {
            this.liTag1.removeEventListener('click', this.bulletListClickHandler);
        }
        if (this.liTag2) {
            this.liTag2.removeEventListener('click', this.bulletListClickHandler);
        }
    };
    BulletsAndNumberingDialog.prototype.removeElements = function () {
        if (this.ulTag) {
            this.ulTag.remove();
            this.ulTag = undefined;
        }
        if (this.ulTag1) {
            this.ulTag1.remove();
            this.ulTag1 = undefined;
        }
        if (this.liTag) {
            this.liTag.remove();
            this.liTag = undefined;
        }
        if (this.liTag1) {
            this.liTag1.remove();
            this.liTag1 = undefined;
        }
        if (this.liTag2) {
            this.liTag2.remove();
            this.liTag2 = undefined;
        }
        if (this.liNextDiv) {
            this.liNextDiv.remove();
            this.liNextDiv = undefined;
        }
        if (this.liInnerDiv) {
            this.liInnerDiv.remove();
            this.liInnerDiv = undefined;
        }
        if (this.liInnerDiv1) {
            this.liInnerDiv1.remove();
            this.liInnerDiv1 = undefined;
        }
        if (this.liInnerDiv2) {
            this.liInnerDiv2.remove();
            this.liInnerDiv2 = undefined;
        }
    };
    return BulletsAndNumberingDialog;
}());
export { BulletsAndNumberingDialog };
/* eslint-enable @typescript-eslint/no-explicit-any */
