import { createElement, isNullOrUndefined, classList, L10n, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { Query } from '@syncfusion/ej2-data';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
/**
 * Paragraph Properties
 *
 * @private
 */
var Paragraph = /** @class */ (function () {
    function Paragraph(container) {
        //Event Handlers
        this.numberedAndBulletNoneClickHandler = this.numberedNoneClick.bind(this);
        this.numberedNumberDotClickHandler = this.numberedNumberDotClick.bind(this);
        this.numberedLowLetterClickHandler = this.numberedLowLetterClick.bind(this);
        this.numberedUpLetterClickHandler = this.numberedUpLetterClick.bind(this);
        this.numberedLowRomanClickHandler = this.numberedLowRomanClick.bind(this);
        this.numberedUpRomanClickHandler = this.numberedUpRomanClick.bind(this);
        this.numberSplitButtonBeforeOpenHandler = this.numberSplitButtonBeforeOpen.bind(this);
        this.bulletDotClickHandler = this.bulletDotClick.bind(this);
        this.bulletCircleClickHandler = this.bulletCircleClick.bind(this);
        this.bulletSquareClickHandler = this.bulletSquareClick.bind(this);
        this.bulletFlowerClickHandler = this.bulletFlowerClick.bind(this);
        this.bulletArrowClickHandler = this.bulletArrowClick.bind(this);
        this.bulletTickClickHandler = this.bulletTickClick.bind(this);
        this.onrightAlignmentClickHandler = this.onrightAlignmentClick.bind(this);
        this.isRetrieving = false;
        this.appliedBulletStyle = 'dot';
        this.appliedNumberingStyle = 'arabic';
        this.appliedLineSpacing = '';
        this.splitButtonClass = 'e-de-prop-splitbutton';
        this.container = container;
    }
    Object.defineProperty(Paragraph.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.initializeParagraphPropertiesDiv = function (wholeDiv, isRtl) {
        this.localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        this.isRtl = isRtl;
        if (this.isRtl) {
            this.splitButtonClass = 'e-rtl ' + this.splitButtonClass;
        }
        this.textProperties = wholeDiv;
        var element = this.documentEditor.element.id + '_font_properties';
        this.paragraphDiv = this.createDivElement(element + '_paragraph', wholeDiv, '');
        classList(this.paragraphDiv, ['e-de-cntr-pane-padding'], []);
        this.label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        this.label.innerHTML = this.localObj.getConstant('Paragraph');
        this.paragraphDiv.appendChild(this.label);
        this.styleDiv = this.createDivElement(element + '_styleDiv', this.paragraphDiv);
        this.styleDiv.classList.add('e-de-ctnr-segment', 'e-de-ctnr-style-div');
        this.styleSelect = createElement('input', { id: element + '_style', styles: 'width:248px;letter-spacing: 0.05px;' });
        this.styleDiv.appendChild(this.styleSelect);
        this.createStyleDropDownList(this.styleSelect);
        this.indentWholeDiv = this.createDivElement(element + '_indentWholeDiv', this.paragraphDiv);
        this.indentWholeDiv.style.display = 'flex';
        this.indentWholeDiv.classList.add('e-de-ctnr-segment');
        if (isRtl) {
            classList(this.indentWholeDiv, ['e-de-ctnr-segment-rtl'], []);
        }
        this.indentDiv = this.createDivElement(element + '_indentDiv', this.indentWholeDiv, 'display:flex;');
        var indentClassName = 'e-de-ctnr-group-btn e-de-char-fmt-btn-left e-btn-group';
        if (isRtl) {
            indentClassName = 'e-rtl ' + indentClassName;
        }
        this.indentDiv.className = indentClassName;
        this.leftAlignment = this.createButtonTemplate(element + '_leftIndent', 'e-de-ctnr-alignleft e-icons', this.indentDiv, 'e-de-prop-indent-button', '40.5', 'Align left Tooltip');
        this.centerAlignment = this.createButtonTemplate(element + '_centerIndent', 'e-de-ctnr-aligncenter e-icons', this.indentDiv, 'e-de-prop-indent-button', '40.5', 'Center Tooltip');
        this.rightAlignment = this.createButtonTemplate(element + '_rightIndent', 'e-de-ctnr-alignright e-icons', this.indentDiv, 'e-de-prop-indent-button', '40.5', 'Align right Tooltip');
        this.justify = this.createButtonTemplate(element + '_justify', 'e-de-ctnr-justify e-icons', this.indentDiv, 'e-de-prop-indent-last-button', '40.5', 'Justify Tooltip');
        var increaseIndentIconCss = 'e-de-ctnr-increaseindent e-icons';
        var decreaseIndentIconCss = 'e-de-ctnr-decreaseindent e-icons';
        this.incDecIndentDiv = this.createDivElement(element + '_lineindentDiv', this.indentWholeDiv, 'display:flex;');
        indentClassName = 'e-de-ctnr-group-btn e-de-char-fmt-btn-right e-btn-group';
        if (isRtl) {
            indentClassName = 'e-rtl ' + indentClassName;
            increaseIndentIconCss += ' e-de-flip';
            decreaseIndentIconCss += ' e-de-flip';
        }
        this.incDecIndentDiv.className = indentClassName;
        this.decreaseIndent = this.createButtonTemplate(element + '_decreaseIndent', decreaseIndentIconCss, this.incDecIndentDiv, 'e-de-prop-indent-button', '37', 'Decrease indent');
        this.increaseIndent = this.createButtonTemplate(element + '_increaseIndent', increaseIndentIconCss, this.incDecIndentDiv, 'e-de-prop-indent-last-button', '37', 'Increase indent');
        this.listDiv = this.createDivElement(element + '_listDiv', this.paragraphDiv, 'display:flex;');
        this.paraDiv = this.createDivElement(element + '_paraDiv', this.paragraphDiv, 'display:flex');
        classList(this.listDiv, ['e-de-ctnr-segment', 'e-de-ctnr-group-btn'], []);
        classList(this.paraDiv, ['e-de-ctnr-segment', 'e-de-ctnr-group-btn'], []);
        if (isRtl) {
            classList(this.listDiv, ['e-de-ctnr-segment-rtl', 'e-de-ctnr-group-btn'], []);
            classList(this.paraDiv, ['e-de-ctnr-segment-rtl', 'e-de-ctnr-group-btn'], []);
        }
        this.lineHeight = createElement('button', { id: element + '_lineHeight', attrs: { type: 'button' } });
        this.listDiv.appendChild(this.lineHeight);
        this.lineSpacing = this.createLineSpacingDropdown(this.lineHeight);
        this.listDropDown = this.createDivElement(element + '_listDropDiv', this.listDiv);
        classList(this.listDropDown, ['de-split-button', 'e-de-ctnr-segment-list'], []);
        if (isRtl) {
            classList(this.listDropDown, ['e-de-ctnr-segment-list-rtl'], []);
        }
        this.bulletButton = createElement('button', { id: element + '_bullet', attrs: { type: 'button' } });
        this.listDropDown.appendChild(this.bulletButton);
        this.numberingList = createElement('button', { id: element + '_numberingList', attrs: { type: 'button' } });
        this.listDropDown.appendChild(this.numberingList);
        var bulletIconCss = 'e-de-ctnr-bullets e-icons';
        var numberIconCss = 'e-de-ctnr-numbering e-icons';
        if (isRtl) {
            bulletIconCss += ' e-de-flip';
            numberIconCss += ' e-de-flip';
        }
        this.createBulletListDropButton(bulletIconCss, this.bulletButton);
        this.createNumberListDropButton(numberIconCss, this.numberingList);
        this.borders = this.createButtonTemplate(element + '_borders', 'e-de-ctnr-borders e-icons', this.paraDiv, 'e-de-ctnr-group-btn', '37', 'Borders');
        this.showHiddenMarks = this.createButtonTemplate(element + '_paraMark', 'e-de-e-paragraph-mark e-icons', this.paraDiv, 'e-de-ctnr-group-btn', '37', 'ShowHiddenMarks Tooltip');
    };
    Paragraph.prototype.createSeparator = function (parentDiv) {
        var separator = createElement('div', { className: 'e-de-prop-vline' });
        parentDiv.appendChild(separator);
    };
    Paragraph.prototype.createDivElement = function (id, parentDiv, style) {
        var element;
        if (style) {
            element = createElement('div', { id: id, styles: style });
        }
        else {
            element = createElement('div', { id: id });
        }
        parentDiv.appendChild(element);
        return element;
    };
    /* eslint-disable-next-line max-len */
    Paragraph.prototype.createButtonTemplate = function (id, iconcss, div, buttonClass, width, toolTipText) {
        var buttonElement = createElement('Button', { id: id, attrs: { type: 'button' } });
        // buttonElement.style.width = width + 'px';
        // buttonElement.style.height = 32 + 'px';
        div.appendChild(buttonElement);
        var btn = new Button({
            cssClass: buttonClass, iconCss: iconcss
        });
        btn.appendTo(buttonElement);
        buttonElement.setAttribute('title', this.localObj.getConstant(toolTipText));
        buttonElement.setAttribute('aria-label', this.localObj.getConstant(toolTipText));
        if (this.localObj.getConstant(toolTipText) !== 'Decrease indent' && this.localObj.getConstant(toolTipText) !== 'Increase indent' && this.localObj.getConstant(toolTipText) !== 'Borders') {
            buttonElement.setAttribute('aria-pressed', 'false');
        }
        switch (toolTipText) {
            case 'Align left Tooltip':
                this.leftAlignmentBtn = btn;
                break;
            case 'Align right Tooltip':
                this.rightAlignmentBtn = btn;
                break;
            case 'Justify Tooltip':
                this.justifyBtn = btn;
                break;
            case 'Decrease indent':
                this.decreaseIndentBtn = btn;
                break;
            case 'Increase indent':
                this.increaseIndentBtn = btn;
                break;
            case 'Borders':
                this.bordersBtn = btn;
                break;
            case 'ShowHiddenMarks Tooltip':
                this.showHiddenMarksBtn = btn;
                break;
            default:
                this.centerAlignmentBtn = btn;
        }
        return buttonElement;
    };
    Paragraph.prototype.createLineSpacingDropdown = function (button) {
        var _this = this;
        var items = [{
                text: this.localObj.getConstant('Single')
            }, {
                text: '1.15'
            }, {
                text: '1.5'
            }, {
                text: this.localObj.getConstant('Double')
            }];
        var dropdown = new DropDownButton({
            items: items,
            iconCss: 'e-de-ctnr-linespacing e-icons',
            enableRtl: this.isRtl,
            select: this.lineSpacingAction.bind(this),
            cssClass: this.splitButtonClass,
            beforeItemRender: function (args) {
                args.element.innerHTML = '<span></span>' + args.item.text;
                var span = args.element.children[0];
                if (args.item.text === _this.appliedLineSpacing) {
                    span.style.marginRight = '10px';
                    span.setAttribute('class', 'e-de-selected-item e-icons e-de-linespacing');
                }
                else {
                    args.element.children[0].style.marginRight = '25px';
                    args.element.children[0].classList.remove('e-de-selected-item');
                }
            }
        });
        dropdown.appendTo(button);
        button.setAttribute('title', this.localObj.getConstant('Line spacing'));
        return dropdown;
    };
    Paragraph.prototype.createNumberListDropButton = function (iconcss, button) {
        var _this = this;
        this.numberListDropDiv = createElement('div', { id: 'target', styles: 'width: 211px;height: auto;display:none' });
        this.numberListDropUlTag = createElement('ul', {
            styles: 'display: block; outline: 0px;',
            id: 'listMenu',
            className: 'e-de-floating-menu e-de-bullets-menu e-de-list-container e-de-list-thumbnail'
        });
        this.numberListDropDiv.appendChild(this.numberListDropUlTag);
        this.noneNumberTag = this.createNumberNoneListTag(this.numberListDropUlTag);
        this.noneNumberTag.addEventListener('click', this.numberedAndBulletNoneClickHandler);
        this.numberList = this.createNumberListTag(this.numberListDropUlTag, '1.', '2.', '3.');
        this.numberList.addEventListener('click', this.numberedNumberDotClickHandler);
        this.lowLetter = this.createNumberListTag(this.numberListDropUlTag, 'a.', 'b.', 'c.');
        this.lowLetter.addEventListener('click', this.numberedLowLetterClickHandler);
        this.upLetter = this.createNumberListTag(this.numberListDropUlTag, 'A.', 'B.', 'C.');
        this.upLetter.addEventListener('click', this.numberedUpLetterClickHandler);
        this.lowRoman = this.createNumberListTag(this.numberListDropUlTag, 'i.', 'ii.', 'iii.');
        this.lowRoman.addEventListener('click', this.numberedLowRomanClickHandler);
        this.upRoman = this.createNumberListTag(this.numberListDropUlTag, 'I.', 'II.', 'III.');
        this.upRoman.addEventListener('click', this.numberedUpRomanClickHandler);
        var menuOptions = {
            target: this.numberListDropDiv,
            iconCss: iconcss,
            cssClass: this.splitButtonClass,
            beforeOpen: this.numberSplitButtonBeforeOpen.bind(this),
            beforeClose: this.numberSplitButtonBeforeClose.bind(this)
        };
        this.numberedListBtn = new SplitButton(menuOptions);
        this.numberedListBtn.click = function () {
            _this.applyLastAppliedNumbering();
        };
        this.numberedListBtn.appendTo(button);
        button.parentElement.setAttribute('title', this.localObj.getConstant('Numbering'));
        button.parentElement.setAttribute('aria-label', this.localObj.getConstant('Numbering'));
    };
    Paragraph.prototype.numberSplitButtonBeforeClose = function () {
        this.numberListDropDiv.style.display = 'none';
        this.removeSelectedList();
    };
    Paragraph.prototype.numberSplitButtonBeforeOpen = function () {
        this.numberListDropDiv.style.display = 'block';
        var levelPattern = 'None';
        if (!isNullOrUndefined(this.documentEditor.selectionModule.paragraphFormat)) {
            if (isNullOrUndefined(this.documentEditor.selectionModule.paragraphFormat.listId)
                || this.documentEditor.selectionModule.paragraphFormat.listId === -1) {
                levelPattern = 'None';
            }
            else {
                var list = this.documentEditor.documentHelper.getListById(this.documentEditor.selectionModule.paragraphFormat.listId);
                var abstractList = this.documentEditor.documentHelper.getAbstractListById(list.abstractListId);
                var startParagraph = this.documentEditor.selectionModule.isForward ?
                    this.documentEditor.selectionModule.start.paragraph : this.documentEditor.selectionModule.end.paragraph;
                var level = abstractList.levels[startParagraph.paragraphFormat.listFormat.listLevelNumber];
                levelPattern = level.listLevelPattern;
            }
        }
        this.updateSelectedNumberedListType(levelPattern);
    };
    Paragraph.prototype.updateSelectedBulletListType = function (listText) {
        switch (listText) {
            case String.fromCharCode(61623):
                this.dotBullet.classList.add('de-list-item-selected');
                break;
            case String.fromCharCode(61551) + String.fromCharCode(32):
                this.circleBullet.classList.add('de-list-item-selected');
                break;
            case String.fromCharCode(61607):
                this.squareBullet.classList.add('de-list-item-selected');
                break;
            case String.fromCharCode(61558):
                this.flowerBullet.classList.add('de-list-item-selected');
                break;
            case String.fromCharCode(61656):
                this.arrowBullet.classList.add('de-list-item-selected');
                break;
            case String.fromCharCode(61692):
                this.tickBullet.classList.add('de-list-item-selected');
                break;
            default:
                this.noneBulletTag.classList.add('de-list-item-selected');
                break;
        }
    };
    Paragraph.prototype.updateSelectedNumberedListType = function (listText) {
        switch (listText) {
            case 'Arabic':
                this.numberList.classList.add('de-list-item-selected');
                break;
            case 'UpRoman':
                this.upRoman.classList.add('de-list-item-selected');
                break;
            case 'UpLetter':
                this.upLetter.classList.add('de-list-item-selected');
                break;
            case 'LowLetter':
                this.lowLetter.classList.add('de-list-item-selected');
                break;
            case 'LowRoman':
                this.lowRoman.classList.add('de-list-item-selected');
                break;
            default:
                this.noneNumberTag.classList.add('de-list-item-selected');
                break;
        }
    };
    Paragraph.prototype.removeSelectedList = function () {
        var className = 'de-list-item-selected';
        this.noneNumberTag.classList.remove(className);
        this.numberList.classList.remove(className);
        this.lowLetter.classList.remove(className);
        this.upLetter.classList.remove(className);
        this.lowRoman.classList.remove(className);
        this.upRoman.classList.remove(className);
        this.noneBulletTag.classList.remove(className);
        this.dotBullet.classList.remove(className);
        this.circleBullet.classList.remove(className);
        this.squareBullet.classList.remove(className);
        this.flowerBullet.classList.remove(className);
        this.arrowBullet.classList.remove(className);
        this.tickBullet.classList.remove(className);
    };
    /**
     * @private
     * @returns {void}
     */
    Paragraph.prototype.applyLastAppliedNumbering = function () {
        switch (this.appliedNumberingStyle) {
            case 'arabic':
                this.numberedNumberDotClick();
                break;
            case 'lowletter':
                this.numberedLowLetterClick();
                break;
            case 'upletter':
                this.numberedUpLetterClick();
                break;
            case 'lowroman':
                this.numberedLowRomanClick();
                break;
            case 'uproman':
                this.numberedUpRomanClick();
                break;
        }
    };
    Paragraph.prototype.applyLastAppliedBullet = function () {
        switch (this.appliedBulletStyle) {
            case 'dot':
                this.bulletDotClick();
                break;
            case 'circle':
                this.bulletCircleClick();
                break;
            case 'square':
                this.bulletSquareClick();
                break;
            case 'arrow':
                this.bulletArrowClick();
                break;
            case 'tick':
                this.bulletTickClick();
                break;
            case 'flower':
                this.bulletFlowerClick();
                break;
        }
    };
    Paragraph.prototype.createBulletListDropButton = function (iconcss, button) {
        var _this = this;
        var div = createElement('div', { id: 'bullet_list', styles: 'width: 196px;height: auto;display:none' });
        var ulTag = createElement('ul', {
            styles: 'display: block; outline: 0px;', id: 'listMenu',
            className: 'e-de-floating-menu e-de-bullets-menu e-de-list-container e-de-list-thumbnail'
        });
        div.appendChild(ulTag);
        this.noneBulletTag = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-none e-icons e-de-ctnr-list', true);
        this.noneBulletTag.addEventListener('click', this.numberedAndBulletNoneClickHandler);
        this.dotBullet = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-dot e-icons e-de-ctnr-list', false);
        this.dotBullet.addEventListener('click', this.bulletDotClickHandler);
        this.circleBullet = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-circle e-icons e-de-ctnr-list', false);
        this.circleBullet.addEventListener('click', this.bulletCircleClickHandler);
        this.squareBullet = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-square e-icons e-de-ctnr-list', false);
        this.squareBullet.addEventListener('click', this.bulletSquareClickHandler);
        this.flowerBullet = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-flower e-icons e-de-ctnr-list', false);
        this.flowerBullet.addEventListener('click', this.bulletFlowerClickHandler);
        this.arrowBullet = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-arrow e-icons e-de-ctnr-list', false);
        this.arrowBullet.addEventListener('click', this.bulletArrowClickHandler);
        this.tickBullet = this.createBulletListTag(ulTag, 'e-de-ctnr-bullet-tick e-icons e-de-ctnr-list', false);
        this.tickBullet.addEventListener('click', this.bulletTickClickHandler);
        var menuOptions = {
            target: div,
            iconCss: iconcss,
            cssClass: this.splitButtonClass,
            beforeOpen: function () {
                div.style.display = 'block';
                if (isNullOrUndefined(_this.documentEditor.selectionModule.paragraphFormat.listId) ||
                    _this.documentEditor.selectionModule.paragraphFormat.listId === -1) {
                    _this.updateSelectedBulletListType(_this.documentEditor.selectionModule.paragraphFormat.listText);
                }
                else {
                    var startParagraph = _this.documentEditor.selectionModule.isForward ?
                        _this.documentEditor.selectionModule.start.paragraph : _this.documentEditor.selectionModule.end.paragraph;
                    _this.updateSelectedBulletListType(startParagraph.paragraphFormat.listFormat.listLevel.numberFormat);
                }
            },
            beforeClose: function () {
                div.style.display = 'none';
                _this.removeSelectedList();
            }
        };
        this.bulletListBtn = new SplitButton(menuOptions);
        this.bulletListBtn.click = function () {
            _this.applyLastAppliedBullet();
        };
        this.bulletListBtn.appendTo(button);
        button.parentElement.setAttribute('title', this.localObj.getConstant('Bullets'));
        button.parentElement.setAttribute('aria-label', this.localObj.getConstant('Bullets'));
    };
    Paragraph.prototype.createNumberListTag = function (ulTag, text1, text2, text3) {
        var liTag = createElement('li', {
            styles: 'display:block',
            className: 'e-de-floating-menuitem e-de-floating-menuitem-md e-de-list-items  e-de-list-item-size'
        });
        ulTag.appendChild(liTag);
        var innerHTML = '<div>' + text1 + '<span class="e-de-list-line"></span></div><div>' + text2 + '<span class="e-de-list-line">';
        innerHTML += '</span></div><div>' + text3 + '<span class="e-de-list-line"> </span></div >';
        var liInnerDiv = createElement('div', {
            className: 'e-de-list-header-presetmenu',
            innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    Paragraph.prototype.createNumberNoneListTag = function (ulTag) {
        var liTag = createElement('li', {
            styles: 'display:block;',
            className: 'e-de-floating-menuitem e-de-floating-menuitem-md e-de-list-items  e-de-list-item-size'
        });
        ulTag.appendChild(liTag);
        var innerHTML = '<div><span class="e-de-bullets">' + this.localObj.getConstant('None') + '</span></div>';
        var liInnerDiv = createElement('div', {
            className: 'e-de-list-header-presetmenu', styles: 'position:relative;left:11px;top:13px',
            innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    Paragraph.prototype.createBulletListTag = function (ulTag, iconCss, isNone) {
        var liTag = createElement('li', {
            styles: 'display:block;',
            className: 'e-de-floating-menuitem e-de-floating-bullet-menuitem-md e-de-list-items  e-de-list-item-size'
        });
        ulTag.appendChild(liTag);
        var liInnerDiv = createElement('div', { className: 'e-de-bullet-list-header-presetmenu' });
        var spanDiv = createElement('div', { styles: isNone ? 'font-size:8px;text-align: center;top: 8px;line-height:normal' : '' });
        liInnerDiv.appendChild(spanDiv);
        var span = createElement('span', { className: !isNone ? iconCss : '' });
        spanDiv.appendChild(span);
        if (isNone) {
            liInnerDiv.style.display = 'inline-table';
            span.textContent = this.localObj.getConstant('None');
        }
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    Paragraph.prototype.createStyleDropDownList = function (selectElement) {
        var _this = this;
        this.style = new ComboBox({
            dataSource: [{ StyleName: 'Normal', IconClass: 'e-de-e-paragraph-mark e-icons' }],
            cssClass: 'e-de-prop-dropdown',
            popupHeight: '240px',
            enableRtl: this.isRtl,
            allowFiltering: true,
            query: new Query().select(['StyleName', 'Style', 'IconClass']),
            fields: { text: 'StyleName', value: 'StyleName' },
            showClearButton: false,
            change: this.selectStyleValue.bind(this)
        });
        var itemTemplate = '';
        // const instance: Paragraph = this;
        this.style.open = this.updateOptions.bind(this);
        if (!this.container.enableCsp) {
            if (this.isRtl) {
                itemTemplate = initializeCSPTemplate(function (data) {
                    return "<span style=\"" + data.Style + "\">" + data.StyleName + "</span><span class=\"" + data.IconClass + "\"></span>";
                });
            }
            else {
                itemTemplate = initializeCSPTemplate(function (data) {
                    return "<span class=\"" + data.IconClass + "\"></span><span style=\"" + data.Style + "\">" + data.StyleName + "</span>";
                });
            }
            this.style.itemTemplate = itemTemplate;
            this.style.isStringTemplate = true;
        }
        this.style.footerTemplate = initializeCSPTemplate(function (data) {
            return "<span class=\"e-de-ctnr-dropdown-ftr\">\n                " + _this.localObj.getConstant('Manage Styles') + "...</span>";
        });
        this.style.appendTo(selectElement);
        this.style.focus = function () {
            _this.isRetrieving = false;
            _this.style.element.select();
        };
        selectElement.parentElement.setAttribute('title', this.localObj.getConstant('Styles'));
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Paragraph.prototype.updateOptions = function (args) {
        args.popup.element.getElementsByClassName('e-de-ctnr-dropdown-ftr')[0].addEventListener('click', this.createStyle.bind(this));
    };
    /* eslint-disable */
    Paragraph.prototype.updateStyleNames = function () {
        this.styleName = !isNullOrUndefined(this.style.itemData) ? this.style.itemData.StyleName : undefined;
        var stylesMap = this.documentEditor.documentHelper.stylesMap;
        var paraStyles = stylesMap.get("Paragraph") ? stylesMap.get("Paragraph") : [];
        var linkedStyles = stylesMap.get("Linked") ? stylesMap.get("Linked") : [];
        var charStyles = stylesMap.get("Character") ? stylesMap.get("Character") : [];
        for (var _i = 0, linkedStyles_1 = linkedStyles; _i < linkedStyles_1.length; _i++) {
            var linkedStyle = linkedStyles_1[_i];
            for (var i = 0; i < charStyles.length; i++) {
                var charStyle = charStyles[i];
                if (linkedStyle["StyleName"] + " Char" === charStyle["StyleName"]) {
                    charStyles.splice(i, 1);
                    break;
                }
            }
        }
        this.style.dataSource = paraStyles.concat(linkedStyles, charStyles);
        this.onSelectionChange();
    };
    Paragraph.prototype.createStyle = function () {
        this.style.hidePopup();
        if (!this.documentEditor.isReadOnly) {
            this.documentEditor.showDialog('Styles');
        }
    };
    Paragraph.prototype.constructStyleDropItems = function (styles) {
        var collection = [];
        var paraIcon = 'e-list-icon e-de-listview-icon e-de-e-paragraph-style-mark e-icons';
        var charIcon = 'e-list-icon e-de-listview-icon e-de-e-character-style-mark e-icons';
        var linkedIcon = 'e-list-icon e-de-listview-icon e-de-e-linked-style-mark e-icons';
        for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
            var styleObj = styles_1[_i];
            var obj = {};
            var styleName = this.localObj.getConstant(styleObj.name);
            obj.StyleName = styleName === '' ? styleObj.name : styleName;
            obj.Style = this.parseStyle(styleObj.style);
            if (styleObj.type == "Paragraph") {
                obj.IconClass = paraIcon;
            }
            else if (styleObj.type == "Character") {
                obj.IconClass = charIcon;
            }
            else {
                obj.IconClass = linkedIcon;
            }
            collection.push(obj);
        }
        return collection;
    };
    Paragraph.prototype.parseStyle = function (style) {
        var domStyle = '';
        var styleObj = JSON.parse(style);
        var textDecoration = '';
        if (!isNullOrUndefined(styleObj.characterFormat.baselineAlignment) && styleObj.characterFormat.baselineAlignment !== 'Normal') {
            var vAlign = '';
            switch (styleObj.characterFormat.baselineAlignment) {
                case 'Superscript':
                    vAlign = 'super';
                    break;
                case 'Subscript':
                    vAlign = 'sub';
                    break;
            }
            if (vAlign.length > 1) {
                domStyle += 'vertical-align:' + vAlign + ';';
            }
        }
        if (!isNullOrUndefined(styleObj.characterFormat.underline) && styleObj.characterFormat.underline !== 'None') {
            textDecoration += 'underline ';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.strikethrough) && styleObj.characterFormat.strikethrough !== 'None') {
            textDecoration += 'line-through ';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.fontSize)) {
            domStyle += 'font-size:' + styleObj.characterFormat.fontSize + 'px;';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.fontFamily)) {
            domStyle += 'font-family:' + styleObj.characterFormat.fontFamily + ';';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.bold) && styleObj.characterFormat.bold) {
            domStyle += 'font-weight:bold;';
        }
        if (!isNullOrUndefined(styleObj.characterFormat.italic) && styleObj.characterFormat.italic) {
            domStyle += 'font-style:italic;';
        }
        // if (!isNullOrUndefined(styleObj.characterFormat.fontColor)) {
        //     domStyle += 'color: ' + styleObj.characterFormat.fontColor + ';';
        // }
        if (textDecoration.length > 1) {
            domStyle += 'text-decoration:' + textDecoration + ';';
        }
        return domStyle;
    };
    Paragraph.prototype.onrightAlignmentClick = function () {
        this.leftAlignmentAction();
    };
    ;
    Paragraph.prototype.wireEvent = function () {
        var _this = this;
        this.leftAlignment.addEventListener('click', this.onrightAlignmentClickHandler);
        this.rightAlignment.addEventListener('click', function () {
            _this.rightAlignmentAction();
        });
        this.centerAlignment.addEventListener('click', function () {
            _this.centerAlignmentAction();
        });
        this.justify.addEventListener('click', function () {
            _this.justifyAction();
        });
        this.increaseIndent.addEventListener('click', function () {
            _this.increaseIndentAction();
        });
        this.showHiddenMarks.addEventListener('click', function () {
            _this.container.documentEditorSettings.showHiddenMarks = !_this.container.documentEditorSettings.showHiddenMarks;
            _this.toggleHiddenMarks();
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        });
        this.decreaseIndent.addEventListener('click', function () {
            _this.decreaseIndentAction();
        });
        this.lineSpacing.addEventListener('select', function (args) {
            _this.lineSpacingAction(args);
        });
        this.borders.addEventListener('click', function () {
            _this.documentEditor.showBordersAndShadingDialog();
        });
    };
    Paragraph.prototype.unwireEvents = function () {
        this.leftAlignment.removeEventListener('click', this.onrightAlignmentClickHandler);
        this.rightAlignment.click = undefined;
        this.centerAlignment.click = undefined;
        this.justify.click = undefined;
        this.increaseIndent.click = undefined;
        this.decreaseIndent.click = undefined;
        this.lineSpacing.select = undefined;
        this.style.select = undefined;
    };
    /**
     * @private
     */
    Paragraph.prototype.toggleHiddenMarks = function () {
        if (this.container.documentEditorSettings.showHiddenMarks) {
            classList(this.showHiddenMarks, ['e-btn-toggle'], []);
            this.showHiddenMarks.setAttribute('aria-pressed', 'true');
        }
        else {
            classList(this.showHiddenMarks, [], ['e-btn-toggle']);
            this.showHiddenMarks.setAttribute('aria-pressed', 'false');
        }
    };
    Paragraph.prototype.leftAlignmentAction = function () {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            this.documentEditor.editorModule.toggleTextAlignment('Left');
            this.documentEditor.focusIn();
        }
    };
    Paragraph.prototype.lineSpacingAction = function (args) {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        var text = args.item.text;
        switch (text) {
            case this.localObj.getConstant('Single'):
                this.documentEditor.selectionModule.paragraphFormat.lineSpacing = 1;
                break;
            case '1.15':
                this.documentEditor.selectionModule.paragraphFormat.lineSpacing = 1.15;
                break;
            case '1.5':
                this.documentEditor.selectionModule.paragraphFormat.lineSpacing = 1.5;
                break;
            case this.localObj.getConstant('Double'):
                this.documentEditor.selectionModule.paragraphFormat.lineSpacing = 2;
                break;
        }
        setTimeout(function () {
            _this.documentEditor.focusIn();
        }, 30);
    };
    Paragraph.prototype.setLineSpacing = function () {
        var lineSpacing = this.documentEditor.selectionModule.paragraphFormat.lineSpacing;
        if (lineSpacing === 1) {
            this.appliedLineSpacing = this.localObj.getConstant('Single');
        }
        else if (lineSpacing === 1.15) {
            this.appliedLineSpacing = '1.15';
        }
        else if (lineSpacing === 1.5) {
            this.appliedLineSpacing = '1.5';
        }
        else if (lineSpacing === 2) {
            this.appliedLineSpacing = this.localObj.getConstant('Double');
        }
        else {
            this.appliedLineSpacing = '';
        }
    };
    Paragraph.prototype.selectStyleValue = function (args) {
        var _this = this;
        if (this.container) {
            if (this.isRetrieving || !args.isInteracted) {
                return;
            }
            setTimeout(function () {
                _this.applyStyleValue(args);
            }, 10);
        }
    };
    Paragraph.prototype.applyStyleValue = function (args) {
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            var styleName = this.documentEditor.stylesDialogModule.getStyleName(SanitizeHtmlHelper.sanitize(args.itemData.StyleName));
            if (!isNullOrUndefined(this.documentEditor.documentHelper.styles.findByName(styleName))) {
                this.documentEditor.editorModule.applyStyle(styleName, true);
                var treeViewResult = document.getElementById(this.documentEditor.containerId + '_treeDiv');
                if (!isNullOrUndefined(treeViewResult) && !isNullOrUndefined(this.documentEditor.optionsPaneModule) && this.documentEditor.optionsPaneModule.isOptionsPaneShow && this.documentEditor.optionsPaneModule.isHeadingTab) {
                    treeViewResult.innerHTML = '';
                    this.documentEditor.optionsPaneModule.data = this.documentEditor.optionsPaneModule.dataForTreeview();
                    this.documentEditor.optionsPaneModule.initHeadingTab();
                }
            }
        }
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    Paragraph.prototype.rightAlignmentAction = function () {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            this.documentEditor.editorModule.toggleTextAlignment('Right');
            this.documentEditor.focusIn();
        }
    };
    Paragraph.prototype.centerAlignmentAction = function () {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            this.documentEditor.editorModule.toggleTextAlignment('Center');
            this.documentEditor.focusIn();
        }
    };
    Paragraph.prototype.justifyAction = function () {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            this.documentEditor.editorModule.toggleTextAlignment('Justify');
            this.documentEditor.focusIn();
        }
    };
    Paragraph.prototype.increaseIndentAction = function () {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            this.documentEditor.editorModule.increaseIndent();
            this.documentEditor.focusIn();
        }
    };
    Paragraph.prototype.decreaseIndentAction = function () {
        if (this.isRetrieving) {
            return;
        }
        if (!this.documentEditor.isReadOnly && this.documentEditor.editorModule) {
            this.documentEditor.editorModule.decreaseIndent();
            this.documentEditor.focusIn();
        }
    };
    Paragraph.prototype.numberedNoneClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.documentEditor.editorModule.clearList();
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.numberedNumberDotClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedNumberingStyle = 'arabic';
            this.documentEditor.editorModule.applyNumbering(this.getLevelFormatNumber(), 'Arabic');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.numberedUpRomanClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedNumberingStyle = 'uproman';
            this.documentEditor.editorModule.applyNumbering(this.getLevelFormatNumber(), 'UpRoman');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.numberedUpLetterClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedNumberingStyle = 'upletter';
            this.documentEditor.editorModule.applyNumbering(this.getLevelFormatNumber(), 'UpLetter');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.numberedLowLetterClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedNumberingStyle = 'lowletter';
            this.documentEditor.editorModule.applyNumbering(this.getLevelFormatNumber(), 'LowLetter');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.numberedLowRomanClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedNumberingStyle = 'lowroman';
            this.documentEditor.editorModule.applyNumbering(this.getLevelFormatNumber(), 'LowRoman');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.getLevelFormatNumber = function () {
        var numberFormat = '%';
        numberFormat = numberFormat + (((this.documentEditor.selectionModule.paragraphFormat.listLevelNumber <= 0) ? 0 : this.documentEditor.selectionModule.paragraphFormat.listLevelNumber) + 1) + '.';
        return numberFormat;
    };
    Paragraph.prototype.bulletDotClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedBulletStyle = 'dot';
            this.documentEditor.editorModule.applyBullet(String.fromCharCode(61623), 'Symbol');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.bulletCircleClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedBulletStyle = 'circle';
            this.documentEditor.editorModule.applyBullet(String.fromCharCode(61551) + String.fromCharCode(32), 'Symbol');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.bulletSquareClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedBulletStyle = 'square';
            this.documentEditor.editorModule.applyBullet(String.fromCharCode(61607), 'Wingdings');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.bulletFlowerClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedBulletStyle = 'flower';
            this.documentEditor.editorModule.applyBullet(String.fromCharCode(61558), 'Wingdings');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.bulletArrowClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedBulletStyle = 'arrow';
            this.documentEditor.editorModule.applyBullet(String.fromCharCode(61656), 'Wingdings');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.bulletTickClick = function () {
        var _this = this;
        if (this.isRetrieving) {
            return;
        }
        if (this.documentEditor.editorModule) {
            this.appliedBulletStyle = 'tick';
            this.documentEditor.editorModule.applyBullet(String.fromCharCode(61692), 'Wingdings');
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 30);
        }
    };
    Paragraph.prototype.onSelectionChange = function () {
        this.isRetrieving = true;
        if (this.documentEditor.editorModule) {
            //#region paragraph format
            var style = this.documentEditor.selectionModule.characterFormat.styleName;
            if (this.documentEditor.selectionModule.characterFormat.styleName === "Default Paragraph Font") {
                style = this.documentEditor.selectionModule.paragraphFormat.styleName;
            }
            if (style) {
                var localeValue = this.localObj.getConstant(style);
                this.style.value = (isNullOrUndefined(localeValue) || localeValue == '') ? style : localeValue;
                // this.style.dataBind();
            }
            else {
                this.style.value = null;
            }
            classList(this.leftAlignment, [], ['e-btn-toggle']);
            classList(this.rightAlignment, [], ['e-btn-toggle']);
            classList(this.centerAlignment, [], ['e-btn-toggle']);
            classList(this.justify, [], ['e-btn-toggle']);
            if (this.documentEditor.selectionModule.paragraphFormat.textAlignment === 'Left') {
                classList(this.leftAlignment, ['e-btn-toggle'], []);
                this.leftAlignment.setAttribute('aria-pressed', 'true');
                this.rightAlignment.setAttribute('aria-pressed', 'false');
                this.centerAlignment.setAttribute('aria-pressed', 'false');
                this.justify.setAttribute('aria-pressed', 'false');
            }
            else if (this.documentEditor.selectionModule.paragraphFormat.textAlignment === 'Right') {
                classList(this.rightAlignment, ['e-btn-toggle'], []);
                this.leftAlignment.setAttribute('aria-pressed', 'false');
                this.rightAlignment.setAttribute('aria-pressed', 'true');
                this.centerAlignment.setAttribute('aria-pressed', 'false');
                this.justify.setAttribute('aria-pressed', 'false');
            }
            else if (this.documentEditor.selectionModule.paragraphFormat.textAlignment === 'Center') {
                classList(this.centerAlignment, ['e-btn-toggle'], []);
                this.leftAlignment.setAttribute('aria-pressed', 'false');
                this.rightAlignment.setAttribute('aria-pressed', 'false');
                this.centerAlignment.setAttribute('aria-pressed', 'true');
                this.justify.setAttribute('aria-pressed', 'false');
            }
            else if (this.documentEditor.selectionModule.paragraphFormat.textAlignment === 'Justify') {
                classList(this.justify, ['e-btn-toggle'], []);
                this.leftAlignment.setAttribute('aria-pressed', 'false');
                this.rightAlignment.setAttribute('aria-pressed', 'false');
                this.centerAlignment.setAttribute('aria-pressed', 'false');
                this.justify.setAttribute('aria-pressed', 'true');
            }
            this.toggleHiddenMarks();
        }
        this.setLineSpacing();
        this.isRetrieving = false;
    };
    Paragraph.prototype.removeHTMLElements = function () {
        this.leftAlignment.remove();
        this.leftAlignment = null;
        this.rightAlignment.remove();
        this.rightAlignment = null;
        this.centerAlignment.remove();
        this.centerAlignment = null;
        this.justify.remove();
        this.justify = null;
        this.increaseIndent.remove();
        this.increaseIndent = null;
        this.decreaseIndent.remove();
        this.decreaseIndent = null;
        this.showHiddenMarks.remove();
        this.showHiddenMarks = null;
        this.noneNumberTag.remove();
        this.noneNumberTag = null;
        this.numberList.remove();
        this.numberList = null;
        this.lowLetter.remove();
        this.lowLetter = null;
        this.upLetter.remove();
        this.upLetter = null;
        this.lowRoman.remove();
        this.lowRoman = null;
        this.upRoman.remove();
        this.upRoman = null;
        this.noneBulletTag.remove();
        this.noneBulletTag = null;
        this.dotBullet.remove();
        this.dotBullet = null;
        this.circleBullet.remove();
        this.circleBullet = null;
        this.squareBullet.remove();
        this.squareBullet = null;
        this.flowerBullet.remove();
        this.flowerBullet = null;
        this.arrowBullet.remove();
        this.arrowBullet = null;
        this.tickBullet.remove();
        this.tickBullet = null;
        this.borders.remove();
        this.borders = null;
        this.paragraphDiv.remove();
        this.paragraphDiv = null;
        this.label.remove();
        this.label = null;
        // this.styleDiv.remove();
        // this.styleDiv = null;
        // this.styleSelect.remove();
        // this.styleSelect = null;
        this.indentWholeDiv.remove();
        this.indentWholeDiv = null;
        this.indentDiv.remove();
        this.indentDiv = null;
        this.incDecIndentDiv.remove();
        this.incDecIndentDiv = null;
        this.listDiv.remove();
        this.listDiv = null;
        this.paraDiv.remove();
        this.paraDiv = null;
        this.lineHeight.remove();
        this.lineHeight = null;
        this.listDropDown.remove();
        this.listDropDown = null;
        this.bulletButton.remove();
        this.bulletButton = null;
        this.numberingList.remove();
        this.numberingList = null;
        this.numberListDropDiv.remove();
        this.numberListDropDiv = null;
        this.numberListDropUlTag.remove();
        this.numberListDropUlTag = null;
    };
    Paragraph.prototype.destroy = function () {
        this.container = undefined;
        this.unwireEvents();
        this.removeHTMLElements();
        if (this.lineSpacing) {
            this.lineSpacing.destroy();
            this.lineSpacing = undefined;
        }
        // if (this.style) {
        //     //this.style.destroy();
        //     if(this.style.element) {
        //         this.style.element.remove();
        //     }
        //     this.style.element = null;
        //     this.style = undefined;
        //}
        if (this.bulletListBtn) {
            this.bulletListBtn.destroy();
            this.bulletListBtn = undefined;
        }
        if (this.numberedListBtn) {
            this.numberedListBtn.destroy();
            this.numberedListBtn = undefined;
        }
        if (this.leftAlignmentBtn) {
            this.leftAlignmentBtn.destroy();
            this.leftAlignmentBtn = undefined;
        }
        if (this.rightAlignmentBtn) {
            this.rightAlignmentBtn.destroy();
            this.rightAlignmentBtn = undefined;
        }
        if (this.centerAlignmentBtn) {
            this.centerAlignmentBtn.destroy();
            this.centerAlignmentBtn = undefined;
        }
        if (this.showHiddenMarksBtn) {
            this.showHiddenMarksBtn.destroy();
            this.showHiddenMarksBtn = undefined;
        }
        if (this.justifyBtn) {
            this.justifyBtn.destroy();
            this.justifyBtn = undefined;
        }
        if (this.decreaseIndentBtn) {
            this.decreaseIndentBtn.destroy();
            this.decreaseIndentBtn = undefined;
        }
        if (this.increaseIndentBtn) {
            this.increaseIndentBtn.destroy();
            this.increaseIndentBtn = undefined;
        }
        if (this.bordersBtn) {
            this.bordersBtn.destroy();
            this.bordersBtn = undefined;
        }
        if (this.showHiddenMarksBtn) {
            this.showHiddenMarksBtn.destroy();
            this.showHiddenMarksBtn = undefined;
        }
    };
    return Paragraph;
}());
export { Paragraph };
