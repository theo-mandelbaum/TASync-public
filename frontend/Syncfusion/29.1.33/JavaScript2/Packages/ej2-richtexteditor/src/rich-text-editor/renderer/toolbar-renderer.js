var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { addClass, Browser, removeClass, formatUnit, isNullOrUndefined, isNullOrUndefined as isNOU, EventHandler, detach } from '@syncfusion/ej2-base';
import { getInstance, closest, selectAll } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import * as classes from '../base/classes';
import * as events from '../base/constant';
import { CLS_TOOLBAR, CLS_DROPDOWN_BTN, CLS_RTE_ELEMENTS, CLS_TB_BTN, CLS_INLINE_DROPDOWN, CLS_COLOR_CONTENT, CLS_FONT_COLOR_DROPDOWN, CLS_BACKGROUND_COLOR_DROPDOWN, CLS_COLOR_PALETTE, CLS_FONT_COLOR_PICKER, CLS_BACKGROUND_COLOR_PICKER, CLS_CUSTOM_TILE, CLS_NOCOLOR_ITEM, CLS_BULLETFORMATLIST_TB_BTN, CLS_NUMBERFORMATLIST_TB_BTN, CLS_LIST_PRIMARY_CONTENT } from '../base/classes';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import { hasClass } from '../base/util';
import { ToolbarStatus } from '../../editor-manager/plugin/toolbar-status';
import { defaultLocale } from '../models/default-locale';
/**
 * `Toolbar renderer` module is used to render toolbar in RichTextEditor.
 *
 * @hidden
 * @deprecated
 */
var ToolbarRenderer = /** @class */ (function () {
    /**
     * Constructor for toolbar renderer module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     */
    function ToolbarRenderer(parent, serviceLocator) {
        this.isEscapeKey = false;
        this.parent = parent;
        this.isDestroyed = false;
        if (serviceLocator) {
            this.l10n = serviceLocator.getService('rteLocale');
        }
        this.wireEvent();
    }
    ToolbarRenderer.prototype.wireEvent = function () {
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.destroyTooltip, this.destroyTooltip, this);
        this.parent.on(events.closeTooltip, this.closeTooltip, this);
    };
    ToolbarRenderer.prototype.destroyTooltip = function () {
        var currentDocument = this.parent.iframeSettings.enable ? this.parent.contentModule.getPanel().ownerDocument :
            this.parent.contentModule.getDocument();
        if (!isNullOrUndefined(currentDocument.querySelector('.e-tooltip-wrap')) && !isNullOrUndefined(currentDocument.querySelector('[data-tooltip-id]'))) {
            var tooltipTargetEle = currentDocument.querySelector('[data-tooltip-id]');
            var event_1 = new MouseEvent('mouseleave', { bubbles: true, cancelable: true });
            tooltipTargetEle.dispatchEvent(event_1);
        }
    };
    ToolbarRenderer.prototype.unWireEvent = function () {
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.destroyTooltip, this.destroyTooltip);
        this.parent.off(events.closeTooltip, this.closeTooltip);
    };
    ToolbarRenderer.prototype.toolbarBeforeCreate = function (e) {
        if (this.mode === 'Extended') {
            e.enableCollision = false;
        }
    };
    ToolbarRenderer.prototype.toolbarCreated = function () {
        this.parent.notify(events.toolbarCreated, this);
        if (this.mode === 'Extended') {
            var extendedToolbarElement = this.toolbarPanel.querySelector("#" + CSS.escape(this.parent.element.id) + "_toolbar_nav");
            if (extendedToolbarElement) {
                EventHandler.add(extendedToolbarElement, 'mousedown', this.extendedToolbarMouseDownHandler, this);
            }
        }
    };
    ToolbarRenderer.prototype.extendedToolbarMouseDownHandler = function () {
        if (this.parent.userAgentData.isSafari()) {
            this.parent.notify(events.selectionSave, {});
        }
    };
    ToolbarRenderer.prototype.toolbarClicked = function (args) {
        var _this = this;
        if (!this.parent.enabled) {
            return;
        }
        var toolbarClickEventArgs = { item: args.item, originalEvent: args.originalEvent, cancel: false };
        this.parent.trigger('toolbarClick', toolbarClickEventArgs, function (clickEventArgs) {
            if ((!_this.parent.readonly || isNullOrUndefined(args.item)) && !clickEventArgs.cancel) {
                _this.parent.notify(events.toolbarClick, clickEventArgs);
            }
        });
    };
    ToolbarRenderer.prototype.dropDownSelected = function (args) {
        this.parent.notify(events.dropDownSelect, { element: args.element, item: args.item, originalEvent: args.event });
        this.destroyTooltip();
    };
    ToolbarRenderer.prototype.beforeDropDownItemRender = function (args) {
        if (this.parent.readonly || !this.parent.enabled) {
            return;
        }
        this.parent.notify(events.beforeDropDownItemRender, args);
    };
    ToolbarRenderer.prototype.tooltipBeforeRender = function (args) {
        if (!isNOU(args.target.getAttribute('title'))) {
            var tooltipTarget = args.target.getAttribute('title');
            var tooltipText = void 0;
            switch (tooltipTarget) {
                case 'Minimize':
                    tooltipText = this.l10n.getConstant('minimize');
                    args.target.setAttribute('title', tooltipText + ' (Esc)');
                    break;
                case 'Maximize':
                    tooltipText = this.l10n.getConstant('maximize');
                    args.target.setAttribute('title', tooltipText + ' (Ctrl+Shift+F)');
                    break;
            }
        }
        if (args.target.querySelector('.e-active')) {
            args.cancel = true;
            if (!isNOU(args.target.getAttribute('title'))) {
                this.closeTooltip({ target: args.target, isTitle: true });
            }
        }
    };
    ToolbarRenderer.prototype.dropDownOpen = function (args) {
        if (args.element.parentElement.getAttribute('id').indexOf('TableCell') > -1 && !isNOU(args.element.parentElement.querySelector('.e-cell-merge'))) {
            var listEle = args.element.querySelectorAll('li');
            var selectedEles_1 = this.parent.inputElement.querySelectorAll('.e-cell-select');
            if (selectedEles_1.length === 1) {
                addClass([listEle[0]], 'e-disabled');
                removeClass([listEle[1], listEle[2]], 'e-disabled');
            }
            else if (selectedEles_1.length > 1) {
                if (!Array.from(selectedEles_1).every(function (element) {
                    return element.tagName.toLowerCase() === selectedEles_1[0].tagName.toLowerCase();
                })) {
                    addClass([listEle[0]], 'e-disabled');
                }
                else {
                    removeClass([listEle[0]], 'e-disabled');
                }
                addClass([listEle[1], listEle[2]], 'e-disabled');
            }
        }
        this.parent.notify(events.selectionSave, args);
    };
    ToolbarRenderer.prototype.dropDownClose = function (args) {
        if (!this.isEscapeKey) {
            this.parent.notify(events.selectionRestore, args);
        }
        this.isEscapeKey = false;
    };
    ToolbarRenderer.prototype.dropDownBeforeClose = function (args) {
        if (!isNOU(args.event) && args.event.key === 'Escape' && args.event.keyCode === 27) {
            this.isEscapeKey = true;
            this.parent.notify(events.preventQuickToolbarClose, args);
        }
    };
    /**
     * renderToolbar method
     *
     * @param {IToolbarOptions} args - specifies the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.renderToolbar = function (args) {
        this.setPanel(args.target);
        this.renderPanel();
        this.mode = args.overflowMode;
        args.rteToolbarObj.toolbarObj = new Toolbar({
            items: args.items,
            width: '100%',
            overflowMode: args.overflowMode,
            beforeCreate: this.toolbarBeforeCreate.bind(this),
            created: this.toolbarCreated.bind(this),
            clicked: this.toolbarClicked.bind(this),
            enablePersistence: args.enablePersistence,
            enableRtl: args.enableRtl,
            cssClass: args.cssClass
        });
        args.rteToolbarObj.toolbarObj.isStringTemplate = true;
        args.rteToolbarObj.toolbarObj.createElement = this.parent.createElement;
        args.rteToolbarObj.toolbarObj.appendTo(args.target);
        if (this.parent.showTooltip && args.type === 'toolbar') {
            this.tooltip = new Tooltip({
                target: '#' + this.parent.getID() + '_toolbar_wrapper [title]',
                showTipPointer: true,
                openDelay: 400,
                opensOn: 'Hover',
                beforeRender: this.tooltipBeforeRender.bind(this),
                beforeOpen: this.tooltipBeforeOpen.bind(this),
                cssClass: this.parent.getCssClass(),
                windowCollision: true,
                position: 'BottomCenter'
            });
            this.tooltip.appendTo(args.target.parentElement);
        }
    };
    ToolbarRenderer.prototype.tooltipBeforeOpen = function (args) {
        if (args.element) {
            args.element.setAttribute('data-rte-id', this.parent.getID());
        }
    };
    /**
     * renderDropDownButton method
     *
     * @param {IDropDownModel} args - specifies the the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.renderDropDownButton = function (args) {
        var _this = this;
        var css;
        var targetEle = args.activeElement;
        args.element.classList.add(CLS_DROPDOWN_BTN);
        css = args.cssClass + ' ' + CLS_RTE_ELEMENTS + ' ' + CLS_TB_BTN;
        if (this.parent.inlineMode.enable && Browser.isDevice) {
            css = css + ' ' + CLS_INLINE_DROPDOWN;
        }
        // eslint-disable-next-line
        var proxy = this;
        var dropDown = new DropDownButton({
            items: args.items,
            iconCss: args.iconCss,
            cssClass: css,
            content: args.content,
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl,
            select: this.dropDownSelected.bind(this),
            beforeOpen: function (args) {
                if (proxy.parent.readonly || !proxy.parent.enabled) {
                    args.cancel = true;
                    return;
                }
                if (_this.parent.userAgentData.isSafari() && args.event.type === 'keydown' && _this.parent.formatter.editorManager.nodeSelection &&
                    !_this.parent.inputElement.contains(_this.parent.getRange().startContainer)) {
                    _this.parent.notify(events.selectionRestore, args);
                }
                // Table styles dropdown preselect
                if (proxy.parent.editorMode !== 'Markdown') {
                    var startNode = proxy.parent.getRange().startContainer.parentElement;
                    var tableEle = startNode.closest('table');
                    var trow = startNode.closest('tr');
                    if (!isNOU(tableEle) && tableEle.classList.contains('e-dashed-border')) {
                        for (var index = 0; index < args.element.childNodes.length; index++) {
                            if (args.element.childNodes[index].classList.contains('e-dashed-borders')) {
                                addClass([args.element.childNodes[index]], 'e-active');
                            }
                        }
                    }
                    if (!isNOU(tableEle) && tableEle.classList.contains('e-alternate-rows') && window.getComputedStyle(trow).backgroundColor !== '') {
                        for (var index = 0; index < args.element.childNodes.length; index++) {
                            if (args.element.childNodes[index].classList.contains('e-alternate-rows')) {
                                addClass([args.element.childNodes[index]], 'e-active');
                            }
                        }
                    }
                    //Alignments preselect
                    var alignEle = proxy.parent.getRange().startContainer;
                    while (alignEle !== proxy.parent.inputElement && !isNOU(alignEle.parentElement)) {
                        if (alignEle.nodeName === '#text') {
                            alignEle = alignEle.parentElement;
                        }
                        var alignStyle = window.getComputedStyle(alignEle).textAlign;
                        if (!isNOU(args.items[0]) && args.items[0].command === 'Alignments') {
                            if ((args.items[0].text === 'Align Left' && (alignStyle === 'left') || alignStyle === 'start')) {
                                addClass([args.element.childNodes[0]], 'e-active');
                                break;
                            }
                            else if (args.items[1].text === 'Align Center' && alignStyle === 'center') {
                                addClass([args.element.childNodes[1]], 'e-active');
                                break;
                            }
                            else if (args.items[2].text === 'Align Right' && alignStyle === 'right') {
                                addClass([args.element.childNodes[2]], 'e-active');
                                break;
                            }
                            else if (args.items[3].text === 'Align Justify' && alignStyle === 'justify') {
                                addClass([args.element.childNodes[3]], 'e-active');
                                break;
                            }
                        }
                        alignEle = alignEle.parentElement;
                    }
                    //image preselect
                    var closestNode = startNode.closest('img');
                    var imageEle = closestNode ? closestNode : (targetEle ? targetEle : startNode.querySelector('img'));
                    if (!isNOU(args.items[0]) && args.items[0].command === 'Images') {
                        if (!isNOU(imageEle)) {
                            var index = void 0;
                            if (imageEle.classList.contains('e-imgleft') || imageEle.classList.contains('e-imginline')) {
                                index = 0;
                            }
                            else if (imageEle.classList.contains('e-imgcenter') || imageEle.classList.contains('e-imgbreak')) {
                                index = 1;
                            }
                            else if (imageEle.classList.contains('e-imgright')) {
                                index = 2;
                            }
                            if (!isNOU(args.element.childNodes[index])) {
                                addClass([args.element.childNodes[index]], 'e-active');
                            }
                        }
                    }
                    //Video preselect
                    var videoClosestNode = startNode.closest('.e-video-wrap');
                    var videoEle = videoClosestNode ? videoClosestNode : (targetEle ? targetEle : startNode.querySelector('video'));
                    if (!isNOU(args.items[0]) && args.items[0].command === 'Videos') {
                        if (!isNOU(videoEle)) {
                            var index = void 0;
                            if (videoEle.classList.contains('e-video-left') || videoEle.classList.contains('e-video-inline')) {
                                index = 0;
                            }
                            else if (videoEle.classList.contains('e-video-center') || videoEle.classList.contains('e-video-break')) {
                                index = 1;
                            }
                            else if (videoEle.classList.contains('e-video-right')) {
                                index = 2;
                            }
                            if (!isNOU(args.element.childNodes[index])) {
                                addClass([args.element.childNodes[index]], 'e-active');
                            }
                        }
                    }
                    //Formats preselect
                    if (!isNOU(args.items[0]) && (args.items[0].command === 'Formats' || args.items[0].command === 'Font')) {
                        var fontName_1 = [];
                        var formats_1 = [];
                        var hasUpdatedActive = false;
                        _this.parent.format.types.forEach(function (item) {
                            formats_1.push(item.value.toLocaleLowerCase());
                        });
                        _this.parent.fontFamily.items.forEach(function (item) {
                            fontName_1.push(item.value);
                        });
                        var toolbarStatus = ToolbarStatus.get(_this.parent.contentModule.getDocument(), _this.parent.contentModule.getEditPanel(), formats_1, null, fontName_1);
                        for (var index = 0; index < args.element.childNodes.length; index++) {
                            var htmlString = dropDown.content.trim();
                            var styleMatch = htmlString.match(/style="([^"]*)"/);
                            var styleValue = '';
                            if (styleMatch) {
                                styleValue = styleMatch[1];
                            }
                            var updatedHtml = htmlString.replace(/ style="([^"]*)"/, '');
                            var divNode = _this.parent.createElement('div');
                            divNode.innerHTML = updatedHtml;
                            var spanElement = divNode.querySelector('span');
                            spanElement.style.cssText = styleValue;
                            if (!hasUpdatedActive && ((divNode.textContent.trim() !== ''
                                && args.element.childNodes[index].textContent.trim() === divNode.textContent.trim()) ||
                                ((args.items[0].command === 'Formats' && !isNOU(toolbarStatus.formats) && _this.parent.format.types[index].value.toLowerCase() === toolbarStatus.formats.toLowerCase() && args.element.childNodes[index].classList.contains(_this.parent.format.types[index].cssClass))
                                    || (args.items[0].subCommand === 'FontName' && args.items[0].command === 'Font' && !isNOU(toolbarStatus.fontname) && !isNOU(_this.parent.fontFamily.items[index]) && _this.parent.fontFamily.items[index].value.toLowerCase() === toolbarStatus.fontname.toLowerCase() && args.element.childNodes[index].classList.contains(_this.parent.fontFamily.items[index].cssClass)))
                                || (((args.items[0].subCommand === 'FontName') && _this.parent.fontFamily.items[index].value === '' && isNullOrUndefined(toolbarStatus.fontname) && args.element.childNodes[index].classList.contains(_this.parent.fontFamily.items[index].cssClass)) ||
                                    ((args.items[0].subCommand === 'FontSize') && args.element.childNodes[index].textContent === 'Default' && divNode.textContent === 'Font Size' && _this.parent.fontSize.items[index].value === '' && !isNullOrUndefined(toolbarStatus.fontsize))))) {
                                if (!args.element.childNodes[index].classList.contains('e-active')) {
                                    addClass([args.element.childNodes[index]], 'e-active');
                                    hasUpdatedActive = true;
                                }
                            }
                            else {
                                removeClass([args.element.childNodes[index]], 'e-active');
                            }
                        }
                    }
                }
                else if (proxy.parent.editorMode === 'Markdown') {
                    if (args.items[0].command === 'Formats') {
                        var formats_2 = [];
                        var hasUpdatedActive = false;
                        _this.parent.format.types.forEach(function (item) {
                            formats_2.push(item.value.toLocaleLowerCase());
                        });
                        var childNodes = args.element.childNodes;
                        for (var index = 0; index < childNodes.length; index++) {
                            var divNode = _this.parent.createElement('div');
                            divNode.innerHTML = dropDown.content.trim();
                            if (!hasUpdatedActive && ((divNode.textContent.trim() !== '' && childNodes[index].textContent.trim() === divNode.textContent.trim()))) {
                                if (!childNodes[index].classList.contains('e-active')) {
                                    addClass([childNodes[index]], 'e-active');
                                    hasUpdatedActive = true;
                                }
                            }
                            else {
                                removeClass([childNodes[index]], 'e-active');
                            }
                        }
                    }
                }
                proxy.parent.notify(events.beforeDropDownOpen, args);
            },
            close: this.dropDownClose.bind(this),
            beforeClose: this.dropDownBeforeClose.bind(this),
            open: this.dropDownOpen.bind(this),
            beforeItemRender: this.beforeDropDownItemRender.bind(this)
        });
        dropDown.isStringTemplate = true;
        dropDown.createElement = proxy.parent.createElement;
        dropDown.appendTo(args.element);
        args.element.tabIndex = -1;
        var popupElement = document.getElementById(dropDown.element.id + '-popup');
        popupElement.setAttribute('aria-owns', this.parent.getID());
        return dropDown;
    };
    ToolbarRenderer.prototype.mouseOutHandler = function () {
        if (!isNOU(this.tooltipTargetEle)) {
            this.tooltipTargetEle.setAttribute('title', this.tooltipTargetEle.getAttribute('data-title'));
        }
        else {
            var currentDocument = this.parent.iframeSettings.enable ? this.parent.contentModule.getPanel().ownerDocument :
                this.parent.contentModule.getDocument();
            this.tooltipTargetEle = currentDocument.querySelector('[data-title]');
            this.tooltipTargetEle.setAttribute('title', this.tooltipTargetEle.getAttribute('data-title'));
        }
        this.tooltipTargetEle.removeAttribute('data-title');
        EventHandler.remove(this.tooltipTargetEle, 'mouseout', this.mouseOutHandler);
    };
    ToolbarRenderer.prototype.closeTooltip = function (args) {
        if (args.isTitle) {
            this.tooltipTargetEle = args.target;
            this.tooltipTargetEle.setAttribute('data-title', this.tooltipTargetEle.getAttribute('title'));
            this.tooltipTargetEle.removeAttribute('title');
            EventHandler.add(this.tooltipTargetEle, 'mouseout', this.mouseOutHandler, this);
        }
        else {
            var currentDocument = this.parent.iframeSettings.enable ? this.parent.contentModule.getPanel().ownerDocument :
                this.parent.contentModule.getDocument();
            this.tooltipTargetEle = closest(args.target, '[data-tooltip-id]');
            if (!isNOU(this.tooltipTargetEle) && this.parent.showTooltip && !isNOU(currentDocument.querySelector('.e-tooltip-wrap'))) {
                this.destroyTooltip();
                this.tooltipTargetEle.setAttribute('data-title', this.tooltipTargetEle.getAttribute('title'));
                this.tooltipTargetEle.removeAttribute('title');
                EventHandler.add(this.tooltipTargetEle, 'mouseout', this.mouseOutHandler, this);
            }
        }
    };
    /**
     * renderListDropDown method
     *
     * @param {IDropDownModel} args - specifies the the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.renderListDropDown = function (args) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var css = CLS_RTE_ELEMENTS + ' ' + CLS_TB_BTN + ((this.parent.inlineMode) ? (' ' + CLS_INLINE_DROPDOWN) : '');
        css += (' ' + ((args.itemName === 'NumberFormatList') ? CLS_NUMBERFORMATLIST_TB_BTN : CLS_BULLETFORMATLIST_TB_BTN));
        var content = proxy.parent.createElement('span', { className: CLS_LIST_PRIMARY_CONTENT });
        var inlineEle = proxy.parent.createElement('span', { className: args.cssClass });
        content.appendChild(inlineEle);
        var dropDown = new DropDownButton({
            items: args.items,
            cssClass: css,
            content: args.content,
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl,
            select: this.dropDownSelected.bind(this),
            beforeOpen: function (args) {
                if (Browser.info.name === 'safari' && !proxy.parent.inputElement.contains(proxy.parent.getRange().startContainer)) {
                    proxy.parent.notify(events.selectionRestore, {});
                }
                if (proxy.parent.editorMode !== 'Markdown') {
                    var startNode = proxy.parent.getRange().startContainer.parentElement;
                    var listElem = startNode.closest('LI');
                    var currentLiElem = !isNOU(listElem) ? listElem.parentElement : null;
                    var currentAction = args.items[0].subCommand;
                    if (!isNOU(currentLiElem)) {
                        var validNumberFormatAction = (currentAction === 'NumberFormatList' && currentLiElem.nodeName === 'OL');
                        var validBulletFormatAction = (currentAction === 'BulletFormatList' && currentLiElem.nodeName === 'UL');
                        if (validNumberFormatAction || validBulletFormatAction) {
                            var currentListStyle = currentLiElem.style.listStyleType.split('-').join('').toLocaleLowerCase();
                            currentListStyle = currentListStyle === 'decimal' ? 'number' : currentListStyle;
                            for (var index = 0; index < args.element.childNodes.length; index++) {
                                if (currentListStyle === args.element.childNodes[index].innerHTML.split(' ').join('').toLocaleLowerCase()) {
                                    addClass([args.element.childNodes[index]], 'e-active');
                                    break;
                                }
                                else if (currentListStyle === '' && args.element.childNodes[index].innerHTML !== 'None') {
                                    addClass([args.element.childNodes[index]], 'e-active');
                                    break;
                                }
                            }
                        }
                    }
                }
                _this.closeTooltip({ target: args.event.target });
                if (proxy.parent.readonly || !proxy.parent.enabled) {
                    args.cancel = true;
                    return;
                }
                var element = (args.event) ? args.event.target : null;
                proxy.currentElement = dropDown.element;
                proxy.currentDropdown = dropDown;
                if (args.event && args.event.type === 'click' && (element.classList.contains(CLS_LIST_PRIMARY_CONTENT)
                    || element.parentElement.classList.contains(CLS_LIST_PRIMARY_CONTENT))) {
                    args.cancel = true;
                    return;
                }
                proxy.parent.notify(events.beforeDropDownOpen, args);
            },
            close: this.dropDownClose.bind(this),
            open: this.dropDownOpen.bind(this),
            beforeItemRender: this.beforeDropDownItemRender.bind(this)
        });
        dropDown.isStringTemplate = true;
        dropDown.createElement = proxy.parent.createElement;
        dropDown.appendTo(args.element);
        args.element.tabIndex = -1;
        args.element.setAttribute('role', 'button');
        var popupElement = document.getElementById(dropDown.element.id + '-popup');
        popupElement.setAttribute('aria-owns', this.parent.getID());
        if (args.element.childElementCount === 1) {
            dropDown.element.insertBefore(content, dropDown.element.querySelector('.e-caret'));
        }
        args.element.tabIndex = -1;
        dropDown.element.removeAttribute('type');
        dropDown.element.onmousedown = function () {
            if (Browser.info.name === 'safari') {
                proxy.parent.notify(events.selectionSave, {});
            }
        };
        dropDown.element.onkeydown = function () {
            if (Browser.info.name === 'safari') {
                proxy.parent.notify(events.selectionSave, {});
            }
        };
        return dropDown;
    };
    ToolbarRenderer.prototype.paletteSelection = function (dropDownArgs, currentElement) {
        var ele = dropDownArgs.element.querySelector('.e-control.e-colorpicker');
        var colorbox = [].slice.call(selectAll('.e-tile', ele.parentElement));
        removeClass(colorbox, 'e-selected');
        var style = currentElement.querySelector('.' + CLS_RTE_ELEMENTS).style.borderBottomColor;
        (colorbox.filter(function (colorbox) {
            if (colorbox.style.backgroundColor === style) {
                addClass([colorbox], 'e-selected');
            }
        }));
    };
    /**
     * renderColorPickerDropDown method
     *
     * @param {IColorPickerModel} args - specifies the arguments.
     * @param {string} item - specifies the item.
     * @param {ColorPicker} colorPicker - specifies the colorpicker.
     * @param {string} defaultColor -specifies the defaultColor.
     * @param {string} toolbarType - Specifies the type of toolbar triggering the color picker.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.renderColorPickerDropDown = function (args, item, colorPicker, defaultColor, toolbarType) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var css = CLS_RTE_ELEMENTS + ' ' + CLS_TB_BTN + ((this.parent.inlineMode) ? (' ' + CLS_INLINE_DROPDOWN) : '');
        css += (' ' + ((item === 'backgroundcolor') ? CLS_BACKGROUND_COLOR_DROPDOWN : CLS_FONT_COLOR_DROPDOWN));
        css += this.parent.getCssClass(true);
        var content = proxy.parent.createElement('span', { className: CLS_COLOR_CONTENT });
        var inlineEle = proxy.parent.createElement('span', { className: args.cssClass });
        var range;
        var initialBackgroundColor = (isNullOrUndefined(defaultColor)) ? proxy.parent.backgroundColor.default : defaultColor;
        inlineEle.style.borderBottomColor = (item === 'backgroundcolor') ?
            initialBackgroundColor : proxy.parent.fontColor.default;
        content.appendChild(inlineEle);
        var dropDown = new DropDownButton({
            target: colorPicker.element.parentElement, cssClass: css,
            enablePersistence: this.parent.enablePersistence, enableRtl: this.parent.enableRtl,
            beforeOpen: function (dropDownArgs) {
                if (proxy.parent.readonly || !proxy.parent.enabled) {
                    dropDownArgs.cancel = true;
                    return;
                }
                var element = (dropDownArgs.event) ? dropDownArgs.event.target : null;
                proxy.currentElement = dropDown.element;
                proxy.currentDropdown = dropDown;
                proxy.paletteSelection(dropDownArgs, proxy.currentElement);
                if (dropDownArgs.event && dropDownArgs.event.type === 'click' && (element.classList.contains(CLS_COLOR_CONTENT)
                    || element.parentElement.classList.contains(CLS_COLOR_CONTENT))) {
                    dropDownArgs.cancel = true;
                    var colorpickerValue = element.classList.contains(CLS_RTE_ELEMENTS) ? element.style.borderBottomColor :
                        element.querySelector('.' + CLS_RTE_ELEMENTS).style.borderBottomColor;
                    proxy.parent.notify(events.selectionRestore, {});
                    range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.parent.contentModule.getDocument());
                    var parentNode = range.startContainer.parentNode;
                    var closestElement = closest(range.startContainer.parentNode, 'table');
                    var isMACSelection = _this.parent.userAgentData.getPlatform() === 'macOS' && !range.collapsed;
                    var allowSelectionRange = isMACSelection ? true : range.collapsed;
                    if ((range.startContainer.nodeName === 'TD' || range.startContainer.nodeName === 'TH' ||
                        (closest(range.startContainer.parentNode, 'td,th')) ||
                        (proxy.parent.iframeSettings.enable && !hasClass(parentNode.ownerDocument.querySelector('body'), 'e-lib')))
                        && allowSelectionRange && args.subCommand === 'BackgroundColor' && (closest(closestElement, '.' + classes.CLS_RTE) || proxy.parent.iframeSettings.enable) && toolbarType === 'quick') {
                        var colorPickerArgs = __assign({ name: 'tableColorPickerChanged', item: { command: 'Table', subCommand: 'BackgroundColor', value: colorpickerValue } }, args);
                        proxy.parent.formatter.process(_this.parent, colorPickerArgs, null, colorpickerValue);
                        proxy.parent.notify(events.hideTableQuickToolbar, {});
                    }
                    else {
                        proxy.parent.notify(events.colorPickerChanged, { item: { command: args.command, subCommand: args.subCommand,
                                value: colorpickerValue }
                        });
                    }
                    return;
                }
                else {
                    var ele = dropDownArgs.element.querySelector('.e-control.e-colorpicker');
                    var inst = getInstance(ele, ColorPicker);
                    inst.showButtons = (dropDownArgs.element.querySelector('.e-color-palette')) ? false : true;
                    inst.dataBind();
                }
                dropDownArgs.element.onclick = function (args) {
                    if (args.target.classList.contains('e-cancel')) {
                        dropDown.toggle();
                    }
                };
            },
            open: function (dropDownArgs) {
                _this.setColorPickerContentWidth(colorPicker);
                var focusEle;
                var ele = dropDownArgs.element.querySelector('.e-control.e-colorpicker');
                if (dropDownArgs.element.querySelector('.e-color-palette')) {
                    focusEle = ele.parentElement.querySelector('.e-palette');
                }
                else {
                    focusEle = ele.parentElement.querySelector('e-handler');
                }
                if (focusEle) {
                    focusEle.focus();
                }
                _this.pickerRefresh(dropDownArgs);
            },
            beforeClose: function (dropDownArgs) {
                var element = (dropDownArgs.event) ? dropDownArgs.event.target : null;
                _this.dropDownBeforeClose(dropDownArgs);
                if (dropDownArgs.event && dropDownArgs.event.type === 'click' && (element.classList.contains(CLS_COLOR_CONTENT)
                    || element.parentElement.classList.contains(CLS_COLOR_CONTENT))) {
                    var colorpickerValue = element.classList.contains(CLS_RTE_ELEMENTS) ? element.style.borderBottomColor :
                        element.querySelector('.' + CLS_RTE_ELEMENTS).style.borderBottomColor;
                    range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.parent.contentModule.getDocument());
                    if ((range.startContainer.nodeName === 'TD' || range.startContainer.nodeName === 'TH' ||
                        closest(range.startContainer.parentNode, 'td,th')) && range.collapsed && toolbarType === 'quick') {
                        var colorPickerArgs = __assign({ name: 'tableColorPickerChanged', item: { command: 'Table', subCommand: 'BackgroundColor', value: colorpickerValue } }, args);
                        proxy.parent.formatter.process(_this.parent, colorPickerArgs, null, colorpickerValue);
                        proxy.parent.notify(events.hideTableQuickToolbar, {});
                    }
                    else {
                        proxy.parent.notify(events.colorPickerChanged, { item: { command: args.command, subCommand: args.subCommand,
                                value: colorpickerValue }
                        });
                    }
                    return;
                }
            },
            close: function () {
                if (!_this.isEscapeKey) {
                    proxy.parent.notify(events.selectionRestore, {});
                }
            }
        });
        dropDown.isStringTemplate = true;
        dropDown.createElement = proxy.parent.createElement;
        args.element.setAttribute('role', 'button');
        dropDown.appendTo(args.element);
        var popupElement = document.getElementById(dropDown.element.id + '-popup');
        popupElement.setAttribute('aria-owns', this.parent.getID());
        args.element.setAttribute('aria-label', item === 'backgroundcolor' ? defaultLocale.backgroundColor : defaultLocale.fontColor);
        dropDown.element.insertBefore(content, dropDown.element.querySelector('.e-caret'));
        args.element.tabIndex = -1;
        dropDown.element.removeAttribute('type');
        dropDown.element.onmousedown = function () {
            proxy.parent.notify(events.selectionSave, {});
        };
        dropDown.element.onkeydown = function () {
            if (!_this.parent.userAgentData.isSafari() || _this.parent.userAgentData.isSafari()
                && proxy.parent.inputElement.contains(proxy.parent.getRange().startContainer)) {
                proxy.parent.notify(events.selectionSave, {});
            }
        };
        return dropDown;
    };
    ToolbarRenderer.prototype.pickerRefresh = function (dropDownArgs) {
        if (this.parent.backgroundColor.mode === 'Picker') {
            var popupElem = dropDownArgs.element.parentElement;
            popupElem.style.width = (popupElem.offsetWidth + 5).toString() + 'px';
            getInstance(popupElem, Popup).refreshPosition(popupElem);
            popupElem.style.width = (popupElem.offsetWidth - 5).toString() + 'px';
        }
    };
    ToolbarRenderer.prototype.setColorPickerContentWidth = function (colorPicker) {
        var colorPickerContent = colorPicker.element.nextSibling;
        if (colorPickerContent.style.width === '0px') {
            colorPickerContent.style.width = '';
            var borderWidth = parseInt(getComputedStyle(colorPickerContent).borderBottomWidth, 10);
            colorPickerContent.style.width = formatUnit(colorPickerContent.children[0].offsetWidth
                + borderWidth + borderWidth);
        }
    };
    /**
     * renderColorPicker method
     *
     * @param {IColorPickerModel} args - specifies the arguments
     * @param {string} item - specifies the string values
     * @param {string} toolbarType - Specifies the type of toolbar triggering the color picker.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.renderColorPicker = function (args, item, toolbarType) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var value;
        var colorPicker = new ColorPicker({
            enableRtl: this.parent.enableRtl,
            inline: true,
            value: null,
            cssClass: ((item === 'backgroundcolor') ? CLS_BACKGROUND_COLOR_PICKER : CLS_FONT_COLOR_PICKER) + ' ' + args.cssClass,
            created: function () {
                var value = (item === 'backgroundcolor') ? proxy.parent.backgroundColor.default : proxy.parent.fontColor.default;
                colorPicker.setProperties({ value: value });
            },
            mode: ((item === 'backgroundcolor') ? proxy.parent.backgroundColor.mode : proxy.parent.fontColor.mode),
            modeSwitcher: ((item === 'backgroundcolor') ? proxy.parent.backgroundColor.modeSwitcher : proxy.parent.fontColor.modeSwitcher),
            presetColors: (item === 'backgroundcolor') ? this.parent.backgroundColor.colorCode : this.parent.fontColor.colorCode,
            columns: (item === 'backgroundcolor') ? this.parent.backgroundColor.columns : this.parent.fontColor.columns,
            beforeTileRender: function (args) {
                args.element.classList.add(CLS_COLOR_PALETTE);
                args.element.classList.add(CLS_CUSTOM_TILE);
                if (!isNullOrUndefined(_this.parent.cssClass)) {
                    var allClassName = _this.parent.getCssClass().split(' ');
                    for (var i = 0; i < allClassName.length; i++) {
                        if (allClassName[i].trim() !== '') {
                            args.element.classList.add(allClassName[i]);
                        }
                    }
                }
                if (args.value === '') {
                    args.element.classList.add(CLS_NOCOLOR_ITEM);
                }
            },
            change: function (colorPickerArgs) {
                var colorpickerValue = colorPickerArgs.currentValue.rgba;
                colorPickerArgs.item = {
                    command: args.command,
                    subCommand: args.subCommand,
                    value: colorpickerValue
                };
                proxy.parent.notify(events.selectionRestore, {});
                if (proxy.currentElement) {
                    proxy.currentElement.querySelector('.' + CLS_RTE_ELEMENTS).style.borderBottomColor = colorpickerValue;
                }
                var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.parent.contentModule.getDocument());
                var closestElement = closest(range.startContainer.parentNode, 'table');
                if ((range.startContainer.nodeName === 'TD' || range.startContainer.nodeName === 'TH' || range.startContainer.nodeName === 'BODY' ||
                    (range.startContainer.parentNode && closest(range.startContainer.parentNode, 'td,th'))) && range.collapsed && args.subCommand === 'BackgroundColor' && (closestElement && closest(closestElement, '.' + classes.CLS_RTE) || proxy.parent.iframeSettings.enable)
                    && toolbarType === 'quick') {
                    colorPickerArgs.name = 'tableColorPickerChanged';
                    colorPickerArgs.item.command = 'Table';
                    proxy.parent.formatter.process(_this.parent, colorPickerArgs, colorPickerArgs.event, colorPickerArgs.item.value);
                    proxy.parent.notify(events.hideTableQuickToolbar, {});
                }
                else {
                    proxy.parent.notify(events.colorPickerChanged, colorPickerArgs);
                }
                if (proxy.currentDropdown) {
                    proxy.currentDropdown.toggle();
                }
            },
            beforeModeSwitch: function (args) {
                value = colorPicker.value;
                if (value === '') {
                    colorPicker.setProperties({ value: ((args.mode === 'Picker') ? '#008000ff' : '') }, true);
                }
                colorPicker.showButtons = args.mode === 'Palette' ? false : true;
            }
        });
        colorPicker.isStringTemplate = true;
        colorPicker.createElement = this.parent.createElement;
        colorPicker.appendTo(document.getElementById(args.target));
        return colorPicker;
    };
    /**
     * The function is used to render Rich Text Editor toolbar
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.renderPanel = function () {
        this.getPanel().classList.add(CLS_TOOLBAR);
    };
    /**
     * Get the toolbar element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.getPanel = function () {
        return this.toolbarPanel;
    };
    /**
     * Set the toolbar element of RichTextEditor
     *
     * @returns {void}
     * @param  {Element} panel - specifies the element.
     * @hidden
     * @deprecated
     */
    ToolbarRenderer.prototype.setPanel = function (panel) {
        this.toolbarPanel = panel;
    };
    ToolbarRenderer.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.tooltip && !this.tooltip.isDestroyed) {
            this.tooltip.destroy();
            var tooltipElements = document.querySelectorAll('[data-rte-id="' + this.parent.getID() + '"]');
            for (var i = 0; i < tooltipElements.length; i++) {
                var tooltipEle = tooltipElements[i];
                if (this.parent.getID() === tooltipEle.getAttribute('data-rte-id')) {
                    detach(tooltipEle);
                }
            }
        }
        this.unWireEvent();
        this.mode = null;
        this.toolbarPanel = null;
        this.currentElement = null;
        this.currentDropdown = null;
        this.tooltip = null;
        this.tooltipTargetEle = null;
        this.isDestroyed = true;
    };
    return ToolbarRenderer;
}());
export { ToolbarRenderer };
