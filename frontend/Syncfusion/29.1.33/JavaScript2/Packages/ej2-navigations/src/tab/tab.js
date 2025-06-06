var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Property, Event, closest, Collection, Complex, attributes, detach, isNullOrUndefined, animationMode } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, ChildProperty, select, isVisible } from '@syncfusion/ej2-base';
import { KeyboardEvents, Browser, formatUnit, L10n } from '@syncfusion/ej2-base';
import { setStyleAttribute as setStyle, isNullOrUndefined as isNOU, selectAll, addClass, removeClass, remove } from '@syncfusion/ej2-base';
import { EventHandler, rippleEffect, Touch, compile, Animation } from '@syncfusion/ej2-base';
import { getRandomId, SanitizeHtmlHelper, Draggable } from '@syncfusion/ej2-base';
import { Toolbar } from '../toolbar/toolbar';
var CLS_TAB = 'e-tab';
var CLS_HEADER = 'e-tab-header';
var CLS_BLA_TEM = 'blazor-template';
var CLS_CONTENT = 'e-content';
var CLS_NEST = 'e-nested';
var CLS_ITEMS = 'e-items';
var CLS_ITEM = 'e-item';
var CLS_TEMPLATE = 'e-template';
var CLS_RTL = 'e-rtl';
var CLS_ACTIVE = 'e-active';
var CLS_DISABLE = 'e-disable';
var CLS_HIDDEN = 'e-hidden';
var CLS_FOCUS = 'e-focused';
var CLS_ICONS = 'e-icons';
var CLS_ICON = 'e-icon';
var CLS_ICON_TAB = 'e-icon-tab';
var CLS_ICON_CLOSE = 'e-close-icon';
var CLS_CLOSE_SHOW = 'e-close-show';
var CLS_TEXT = 'e-tab-text';
var CLS_INDICATOR = 'e-indicator';
var CLS_WRAP = 'e-tab-wrap';
var CLS_TEXT_WRAP = 'e-text-wrap';
var CLS_TAB_ICON = 'e-tab-icon';
var CLS_TB_ITEMS = 'e-toolbar-items';
var CLS_TB_ITEM = 'e-toolbar-item';
var CLS_TB_POP = 'e-toolbar-pop';
var CLS_TB_POPUP = 'e-toolbar-popup';
var CLS_HOR_NAV = 'e-hor-nav';
var CLS_POPUP_OPEN = 'e-popup-open';
var CLS_POPUP_CLOSE = 'e-popup-close';
var CLS_PROGRESS = 'e-progress';
var CLS_IGNORE = 'e-ignore';
var CLS_OVERLAY = 'e-overlay';
var CLS_HSCRCNT = 'e-hscroll-content';
var CLS_VSCRCNT = 'e-vscroll-content';
var CLS_VTAB = 'e-vertical-tab';
var CLS_VERTICAL = 'e-vertical';
var CLS_VLEFT = 'e-vertical-left';
var CLS_VRIGHT = 'e-vertical-right';
var CLS_HBOTTOM = 'e-horizontal-bottom';
var CLS_FILL = 'e-fill-mode';
var TABITEMPREFIX = 'tabitem_';
var CLS_REORDER_ACTIVE_ITEM = 'e-reorder-active-item';
/**
 * Objects used for configuring the Tab selecting item action properties.
 */
var TabActionSettings = /** @class */ (function (_super) {
    __extends(TabActionSettings, _super);
    function TabActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('SlideLeftIn')
    ], TabActionSettings.prototype, "effect", void 0);
    __decorate([
        Property(600)
    ], TabActionSettings.prototype, "duration", void 0);
    __decorate([
        Property('ease')
    ], TabActionSettings.prototype, "easing", void 0);
    return TabActionSettings;
}(ChildProperty));
export { TabActionSettings };
/**
 * Objects used for configuring the Tab animation properties.
 */
var TabAnimationSettings = /** @class */ (function (_super) {
    __extends(TabAnimationSettings, _super);
    function TabAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({ effect: 'SlideLeftIn', duration: 600, easing: 'ease' }, TabActionSettings)
    ], TabAnimationSettings.prototype, "previous", void 0);
    __decorate([
        Complex({ effect: 'SlideRightIn', duration: 600, easing: 'ease' }, TabActionSettings)
    ], TabAnimationSettings.prototype, "next", void 0);
    return TabAnimationSettings;
}(ChildProperty));
export { TabAnimationSettings };
/**
 * Objects used for configuring the Tab item header properties.
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Header.prototype, "text", void 0);
    __decorate([
        Property('')
    ], Header.prototype, "iconCss", void 0);
    __decorate([
        Property('left')
    ], Header.prototype, "iconPosition", void 0);
    return Header;
}(ChildProperty));
export { Header };
/**
 * An array of object that is used to configure the Tab.
 */
var TabItem = /** @class */ (function (_super) {
    __extends(TabItem, _super);
    function TabItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, Header)
    ], TabItem.prototype, "header", void 0);
    __decorate([
        Property(null)
    ], TabItem.prototype, "headerTemplate", void 0);
    __decorate([
        Property('')
    ], TabItem.prototype, "content", void 0);
    __decorate([
        Property('')
    ], TabItem.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], TabItem.prototype, "disabled", void 0);
    __decorate([
        Property(true)
    ], TabItem.prototype, "visible", void 0);
    __decorate([
        Property()
    ], TabItem.prototype, "id", void 0);
    __decorate([
        Property(-1)
    ], TabItem.prototype, "tabIndex", void 0);
    return TabItem;
}(ChildProperty));
export { TabItem };
/**
 * Tab is a content panel to show multiple contents in a single space, one at a time.
 * Each Tab item has an associated content, that will be displayed based on the active Tab header item.
 * ```html
 * <div id="tab"></div>
 * <script>
 *   var tabObj = new Tab();
 *   tab.appendTo("#tab");
 * </script>
 * ```
 */
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    /**
     * Initializes a new instance of the Tab class.
     *
     * @param {TabModel} options  - Specifies Tab model properties as options.
     * @param {string | HTMLElement} element  - Specifies the element that is rendered as a Tab.
     */
    function Tab(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.show = {};
        _this.hide = {};
        _this.maxHeight = 0;
        _this.title = 'Close';
        _this.isInteracted = false;
        _this.lastIndex = 0;
        _this.isAdd = false;
        _this.isIconAlone = false;
        _this.draggableItems = [];
        _this.resizeContext = _this.refreshActiveTabBorder.bind(_this);
        /**
         * Contains the keyboard configuration of the Tab.
         */
        _this.keyConfigs = {
            tab: 'tab',
            home: 'home',
            end: 'end',
            enter: 'enter',
            space: 'space',
            delete: 'delete',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            moveDown: 'downarrow'
        };
        return _this;
    }
    /**
     * Removes the component from the DOM and detaches all its related event handlers, attributes and classes.
     *
     * @returns {void}
     */
    Tab.prototype.destroy = function () {
        if (this.isReact || this.isAngular) {
            this.clearTemplate();
        }
        if (!isNOU(this.tbObj)) {
            this.tbObj.destroy();
            this.tbObj = null;
        }
        this.unWireEvents();
        this.element.removeAttribute('aria-disabled');
        this.expTemplateContent();
        if (!this.isTemplate) {
            while (this.element.firstElementChild) {
                remove(this.element.firstElementChild);
            }
        }
        else {
            var cntEle = select('.' + CLS_TAB + ' > .' + CLS_CONTENT, this.element);
            this.element.classList.remove(CLS_TEMPLATE);
            if (!isNOU(cntEle)) {
                cntEle.innerHTML = this.cnt;
            }
        }
        if (this.btnCls) {
            this.btnCls = null;
        }
        this.hdrEle = null;
        this.cntEle = null;
        this.tbItems = null;
        this.tbItem = null;
        this.tbPop = null;
        this.prevItem = null;
        this.popEle = null;
        this.bdrLine = null;
        this.content = null;
        this.dragItem = null;
        this.cloneElement = null;
        this.draggingItems = [];
        if (this.draggableItems && this.draggableItems.length > 0) {
            for (var i = 0; i < this.draggableItems.length; i++) {
                this.draggableItems[i].destroy();
                this.draggableItems[i] = null;
            }
            this.draggableItems = [];
        }
        _super.prototype.destroy.call(this);
        this.trigger('destroyed');
    };
    /**
     * Refresh the tab component
     *
     * @returns {void}
     */
    Tab.prototype.refresh = function () {
        if (this.isReact) {
            this.clearTemplate();
        }
        _super.prototype.refresh.call(this);
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * Reorganizes and adjusts the Tab headers to fit the available width without re-rendering the entire Tab component.
     *
     * This method is useful for optimizing the layout when:
     * - A hidden tab item becomes visible.
     * - The number of tab items changes dynamically.
     *
     * @returns {void} This method does not return a value.
     */
    Tab.prototype.refreshOverflow = function () {
        if (!isNOU(this.tbObj)) {
            this.tbObj.refreshOverflow();
        }
    };
    /**
     * Initialize component
     *
     * @private
     * @returns {void}
     */
    Tab.prototype.preRender = function () {
        var nested = closest(this.element, '.' + CLS_CONTENT);
        this.prevIndex = 0;
        this.isNested = false;
        this.isPopup = false;
        this.initRender = true;
        this.isSwiped = false;
        this.itemIndexArray = [];
        this.templateEle = [];
        if (this.allowDragAndDrop) {
            this.dragArea = !isNOU(this.dragArea) ? this.dragArea : '#' + this.element.id + ' ' + ('.' + CLS_HEADER);
        }
        if (!isNOU(nested)) {
            nested.parentElement.classList.add(CLS_NEST);
            this.isNested = true;
        }
        var name = Browser.info.name;
        var css = (name === 'msie') ? 'e-ie' : (name === 'edge') ? 'e-edge' : (name === 'safari') ? 'e-safari' : '';
        setStyle(this.element, { 'width': formatUnit(this.width), 'height': formatUnit(this.height) });
        this.setCssClass(this.element, this.cssClass, true);
        attributes(this.element, { 'aria-disabled': 'false' });
        this.setCssClass(this.element, css, true);
        this.updatePopAnimationConfig();
    };
    /**
     * Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    Tab.prototype.render = function () {
        var _this = this;
        this.btnCls = this.createElement('span', { className: CLS_ICONS + ' ' + CLS_ICON_CLOSE, attrs: { title: this.title } });
        this.tabId = this.element.id.length > 0 ? ('-' + this.element.id) : getRandomId();
        this.renderContainer();
        this.wireEvents();
        this.initRender = false;
        if (this.isReact && this.portals && this.portals.length > 0) {
            this.renderReactTemplates(function () {
                _this.refreshOverflow();
                _this.refreshActiveBorder();
            });
        }
    };
    Tab.prototype.renderContainer = function () {
        var ele = this.element;
        this.items.forEach(function (item, index) {
            if (isNOU(item.id) && !isNOU(item.setProperties)) {
                item.setProperties({ id: TABITEMPREFIX + index.toString() }, true);
            }
        });
        if (this.items.length > 0 && ele.children.length === 0) {
            ele.appendChild(this.createElement('div', { className: CLS_CONTENT }));
            this.setOrientation(this.headerPlacement, this.createElement('div', { className: CLS_HEADER }));
            this.isTemplate = false;
        }
        else if (this.element.children.length > 0) {
            this.isTemplate = true;
            ele.classList.add(CLS_TEMPLATE);
            var header = ele.querySelector('.' + CLS_HEADER);
            if (header && this.headerPlacement === 'Bottom') {
                this.setOrientation(this.headerPlacement, header);
            }
        }
        if (!isNOU(select('.' + CLS_HEADER, this.element)) && !isNOU(select('.' + CLS_CONTENT, this.element))) {
            this.renderHeader();
            this.tbItems = select('.' + CLS_HEADER + ' .' + CLS_TB_ITEMS, this.element);
            if (!isNOU(this.tbItems)) {
                rippleEffect(this.tbItems, { selector: '.e-tab-wrap' });
            }
            this.renderContent();
            if (selectAll('.' + CLS_TB_ITEM, this.element).length > 0) {
                this.tbItems = select('.' + CLS_HEADER + ' .' + CLS_TB_ITEMS, this.element);
                this.bdrLine = this.createElement('div', { className: CLS_INDICATOR + ' ' + CLS_HIDDEN + ' ' + CLS_IGNORE });
                var scrCnt = select('.' + this.scrCntClass, this.tbItems);
                if (!isNOU(scrCnt)) {
                    scrCnt.insertBefore(this.bdrLine, scrCnt.firstChild);
                }
                else {
                    this.tbItems.insertBefore(this.bdrLine, this.tbItems.firstChild);
                }
                this.setContentHeight(true);
                this.select(this.selectedItem);
            }
            this.setRTL(this.enableRtl);
        }
    };
    Tab.prototype.renderHeader = function () {
        var _this = this;
        var hdrPlace = this.headerPlacement;
        var tabItems = [];
        this.hdrEle = this.getTabHeader();
        this.addVerticalClass();
        if (!this.isTemplate) {
            tabItems = this.parseObject(this.items, 0);
        }
        else {
            if (this.element.children.length > 1 && this.element.children[1].classList.contains(CLS_HEADER)) {
                this.setProperties({ headerPlacement: 'Bottom' }, true);
            }
            var count = this.hdrEle.children.length;
            var hdrItems = [];
            for (var i = 0; i < count; i++) {
                hdrItems.push(this.hdrEle.children.item(i));
            }
            if (count > 0) {
                var tabItems_1 = this.createElement('div', { className: CLS_ITEMS });
                this.hdrEle.appendChild(tabItems_1);
                hdrItems.forEach(function (item, index) {
                    _this.lastIndex = index;
                    var attr = {
                        className: CLS_ITEM, id: CLS_ITEM + _this.tabId + '_' + index
                    };
                    var txt = _this.createElement('span', {
                        className: CLS_TEXT, attrs: { 'role': 'presentation' }
                    }).outerHTML;
                    var cont = _this.createElement('div', {
                        className: CLS_TEXT_WRAP, innerHTML: txt + _this.btnCls.outerHTML
                    }).outerHTML;
                    var wrap = _this.createElement('div', {
                        className: CLS_WRAP, innerHTML: cont,
                        attrs: { role: 'tab', tabIndex: '-1', 'aria-selected': 'false', 'aria-controls': CLS_CONTENT + _this.tabId + '_' + index, 'aria-disabled': 'false' }
                    });
                    wrap.querySelector('.' + CLS_TEXT).appendChild(item);
                    tabItems_1.appendChild(_this.createElement('div', attr));
                    selectAll('.' + CLS_ITEM, tabItems_1)[index].appendChild(wrap);
                });
            }
        }
        this.tbObj = new Toolbar({
            width: (hdrPlace === 'Left' || hdrPlace === 'Right') ? 'auto' : '100%',
            height: (hdrPlace === 'Left' || hdrPlace === 'Right') ? '100%' : 'auto',
            overflowMode: this.overflowMode,
            items: (tabItems.length !== 0) ? tabItems : [],
            clicked: this.clickHandler.bind(this),
            scrollStep: this.scrollStep,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            cssClass: this.cssClass
        });
        this.tbObj.isStringTemplate = true;
        this.tbObj.createElement = this.createElement;
        this.tbObj.appendTo(this.hdrEle);
        attributes(this.hdrEle, { role: 'tablist' });
        if (!isNOU(this.element.getAttribute('aria-label'))) {
            this.hdrEle.setAttribute('aria-label', this.element.getAttribute('aria-label'));
            this.element.removeAttribute('aria-label');
        }
        else if (!isNOU(this.element.getAttribute('aria-labelledby'))) {
            this.hdrEle.setAttribute('aria-labelledby', this.element.getAttribute('aria-labelledby'));
            this.element.removeAttribute('aria-labelledby');
        }
        this.setCloseButton(this.showCloseButton);
        var toolbarHeader = this.tbObj.element.querySelector('.' + CLS_TB_ITEMS);
        if (!isNOU(toolbarHeader)) {
            if (isNOU(toolbarHeader.id) || toolbarHeader.id === '') {
                toolbarHeader.id = this.element.id + '_' + 'tab_header_items';
            }
        }
    };
    Tab.prototype.createContentElement = function (index) {
        var contentElement = this.createElement('div', {
            id: CLS_CONTENT + this.tabId + '_' + index, className: CLS_ITEM,
            attrs: { 'role': 'tabpanel', 'aria-labelledby': CLS_ITEM + this.tabId + '_' + index }
        });
        if (['Dynamic', 'Demand'].indexOf(this.loadOn) !== -1 ||
            (this.loadOn === 'Init' && index === this.selectedItem)) {
            addClass([contentElement], CLS_ACTIVE);
        }
        return contentElement;
    };
    Tab.prototype.renderContent = function () {
        this.cntEle = select('.' + CLS_CONTENT, this.element);
        var hdrItem = selectAll('.' + CLS_TB_ITEM, this.element);
        if (this.isTemplate) {
            this.cnt = (this.cntEle.children.length > 0) ? this.cntEle.innerHTML : '';
            var contents = this.cntEle.children;
            for (var i = 0; i < hdrItem.length; i++) {
                if (contents.length - 1 >= i) {
                    addClass([contents.item(i)], CLS_ITEM);
                    attributes(contents.item(i), { 'role': 'tabpanel', 'aria-labelledby': CLS_ITEM + this.tabId + '_' + i });
                    contents.item(i).id = CLS_CONTENT + this.tabId + '_' + i;
                }
            }
        }
        else {
            if (selectAll('.' + CLS_TB_ITEM, this.element).length > 0) {
                if (this.loadOn === 'Init') {
                    for (var i = 0; i < this.itemIndexArray.length; i++) {
                        if (this.itemIndexArray[i]) {
                            this.cntEle.appendChild(this.createContentElement(Number(this.extIndex(this.itemIndexArray[i]))));
                        }
                    }
                }
                else if (this.loadOn === 'Dynamic') {
                    this.cntEle.appendChild(this.createContentElement(this.selectedItem > 0 ?
                        this.selectedItem : Number(this.extIndex(this.itemIndexArray[0]))));
                }
            }
        }
    };
    Tab.prototype.reRenderItems = function () {
        this.renderContainer();
        if (!isNOU(this.cntEle)) {
            this.bindSwipeEvents();
        }
    };
    Tab.prototype.parseObject = function (items, index) {
        var _this = this;
        var tbItems = Array.prototype.slice.call(selectAll('.e-tab-header .' + CLS_TB_ITEM, this.element));
        var maxId = this.lastIndex;
        if (!this.isReplace && tbItems.length > 0) {
            maxId = this.getMaxIndicesFromItems(tbItems);
        }
        var tItems = [];
        var txtWrapEle;
        var spliceArray = [];
        var i = 0;
        items.forEach(function (item, i) {
            var pos = (isNOU(item.header) || isNOU(item.header.iconPosition)) ? '' : item.header.iconPosition;
            var css = (isNOU(item.header) || isNOU(item.header.iconCss)) ? '' : item.header.iconCss;
            if ((isNOU(item.headerTemplate)) && (isNOU(item.header) || isNOU(item.header.text) ||
                ((item.header.text.length === 0)) && (css === ''))) {
                spliceArray.push(i);
                return;
            }
            var txt = item.headerTemplate || item.header.text;
            if (typeof txt === 'string' && _this.enableHtmlSanitizer) {
                txt = SanitizeHtmlHelper.sanitize(txt);
            }
            var itemIndex;
            if (_this.isReplace && !isNOU(_this.tbId) && _this.tbId !== '') {
                itemIndex = parseInt(_this.tbId.substring(_this.tbId.lastIndexOf('_') + 1), 10);
                _this.tbId = '';
            }
            else {
                itemIndex = index + i;
            }
            _this.lastIndex = ((tbItems.length === 0) ? i : ((_this.isReplace) ? (itemIndex) : (maxId + 1 + i)));
            var disabled = (item.disabled) ? ' ' + CLS_DISABLE + ' ' + CLS_OVERLAY : '';
            var hidden = (item.visible === false) ? ' ' + CLS_HIDDEN : '';
            txtWrapEle = _this.createElement('div', { className: CLS_TEXT, attrs: { 'role': 'presentation' } });
            var tHtml = ((txt instanceof Object) ? txt.outerHTML : txt);
            var txtEmpty = (!isNOU(tHtml) && tHtml !== '');
            if (!isNOU(txt.tagName)) {
                txtWrapEle.appendChild(txt);
            }
            else {
                _this.headerTextCompile(txtWrapEle, txt, i);
            }
            var tEle;
            var icon = _this.createElement('span', {
                className: CLS_ICONS + ' ' + CLS_TAB_ICON + ' ' + CLS_ICON + '-' + pos + ' ' + css
            });
            var tCont = _this.createElement('div', { className: CLS_TEXT_WRAP });
            tCont.appendChild(txtWrapEle);
            if ((txt !== '' && txt !== undefined) && css !== '') {
                if ((pos === 'left' || pos === 'top')) {
                    tCont.insertBefore(icon, tCont.firstElementChild);
                }
                else {
                    tCont.appendChild(icon);
                }
                tEle = txtWrapEle;
                _this.isIconAlone = false;
            }
            else {
                tEle = ((css === '') ? txtWrapEle : icon);
                if (tEle === icon) {
                    detach(txtWrapEle);
                    tCont.appendChild(icon);
                    _this.isIconAlone = true;
                }
            }
            var tabIndex = isNOU(item.tabIndex) ? '-1' : item.tabIndex.toString();
            var wrapAttrs = (item.disabled) ? { role: 'tab', 'aria-disabled': 'true' } : { tabIndex: tabIndex, 'data-tabindex': tabIndex, role: 'tab', 'aria-selected': 'false', 'aria-disabled': 'false' };
            tCont.appendChild(_this.btnCls.cloneNode(true));
            var wrap = _this.createElement('div', { className: CLS_WRAP, attrs: wrapAttrs });
            wrap.appendChild(tCont);
            if (_this.itemIndexArray instanceof Array) {
                _this.itemIndexArray.splice((index + i), 0, CLS_ITEM + _this.tabId + '_' + _this.lastIndex);
            }
            var attrObj = {
                id: CLS_ITEM + _this.tabId + '_' + _this.lastIndex, 'data-id': item.id
            };
            var tItem = { htmlAttributes: attrObj, template: wrap };
            tItem.cssClass = ((item.cssClass !== undefined) ? item.cssClass : ' ') + ' ' + disabled + ' ' + hidden + ' '
                + ((css !== '') ? 'e-i' + pos : '') + ' ' + ((!txtEmpty) ? CLS_ICON : '');
            if (pos === 'top' || pos === 'bottom') {
                _this.element.classList.add('e-vertical-icon');
            }
            tItems.push(tItem);
            i++;
        });
        if (!this.isAdd) {
            spliceArray.forEach(function (spliceItemIndex) {
                _this.items.splice(spliceItemIndex, 1);
            });
        }
        if (this.isIconAlone) {
            this.element.classList.add(CLS_ICON_TAB);
        }
        else {
            this.element.classList.remove(CLS_ICON_TAB);
        }
        return tItems;
    };
    Tab.prototype.removeActiveClass = function () {
        var tabHeader = this.getTabHeader();
        if (tabHeader) {
            var tabItems = selectAll('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE, tabHeader);
            [].slice.call(tabItems).forEach(function (node) { return node.classList.remove(CLS_ACTIVE); });
            [].slice.call(tabItems).forEach(function (node) { return node.firstElementChild.setAttribute('aria-selected', 'false'); });
        }
    };
    Tab.prototype.checkPopupOverflow = function (ele) {
        this.tbPop = select('.' + CLS_TB_POP, this.element);
        var popIcon = select('.e-hor-nav', this.element);
        var tbrItems = select('.' + CLS_TB_ITEMS, this.element);
        var lastChild = tbrItems.lastChild;
        var isOverflow = false;
        if (!this.isVertical() && ((this.enableRtl && ((popIcon.offsetLeft + popIcon.offsetWidth) > tbrItems.offsetLeft))
            || (!this.enableRtl && popIcon.offsetLeft < tbrItems.offsetWidth))) {
            isOverflow = true;
        }
        else if (this.isVertical() && (popIcon.offsetTop < lastChild.offsetTop + lastChild.offsetHeight)) {
            isOverflow = true;
        }
        if (isOverflow) {
            ele.classList.add(CLS_TB_POPUP);
            this.tbPop.insertBefore(ele, selectAll('.' + CLS_TB_POPUP, this.tbPop)[0]);
        }
        return true;
    };
    Tab.prototype.popupHandler = function (target) {
        var ripEle = target.querySelector('.e-ripple-element');
        if (!isNOU(ripEle)) {
            ripEle.outerHTML = '';
            target.querySelector('.' + CLS_WRAP).classList.remove('e-ripple');
        }
        this.tbItem = selectAll('.' + CLS_TB_ITEMS + ' .' + CLS_TB_ITEM, this.hdrEle);
        var lastChild = this.tbItem[this.tbItem.length - 1];
        if (this.tbItem.length !== 0) {
            target.classList.remove(CLS_TB_POPUP);
            target.removeAttribute('style');
            this.tbItems.appendChild(target);
            this.actEleId = target.id;
            if (this.checkPopupOverflow(lastChild)) {
                var prevEle = this.tbItems.lastChild.previousElementSibling;
                this.checkPopupOverflow(prevEle);
            }
            this.isPopup = true;
        }
        return selectAll('.' + CLS_TB_ITEM, this.tbItems).length - 1;
    };
    Tab.prototype.setCloseButton = function (val) {
        var trg = select('.' + CLS_HEADER, this.element);
        if (val === true) {
            trg.classList.add(CLS_CLOSE_SHOW);
        }
        else {
            trg.classList.remove(CLS_CLOSE_SHOW);
        }
        this.refreshOverflow();
        this.refreshActiveTabBorder();
    };
    Tab.prototype.prevCtnAnimation = function (prev, current) {
        var animation;
        var checkRTL = this.enableRtl || this.element.classList.contains(CLS_RTL);
        if (this.isPopup || prev <= current) {
            if (this.animation.previous.effect === 'SlideLeftIn') {
                animation = {
                    name: 'SlideLeftOut',
                    duration: this.animation.previous.duration, timingFunction: this.animation.previous.easing
                };
            }
            else {
                animation = null;
            }
        }
        else {
            if (this.animation.next.effect === 'SlideRightIn') {
                animation = {
                    name: 'SlideRightOut',
                    duration: this.animation.next.duration, timingFunction: this.animation.next.easing
                };
            }
            else {
                animation = null;
            }
        }
        return animation;
    };
    Tab.prototype.triggerPrevAnimation = function (oldCnt, prevIndex) {
        var _this = this;
        var animateObj = this.prevCtnAnimation(prevIndex, this.selectedItem);
        if (!isNOU(animateObj)) {
            animateObj.begin = function () {
                setStyle(oldCnt, { 'position': 'absolute' });
                oldCnt.classList.add(CLS_PROGRESS);
                oldCnt.classList.add('e-view');
            };
            animateObj.end = function () {
                oldCnt.style.display = 'none';
                oldCnt.classList.remove(CLS_ACTIVE);
                oldCnt.classList.remove(CLS_PROGRESS);
                oldCnt.classList.remove('e-view');
                setStyle(oldCnt, { 'display': '', 'position': '' });
                if (oldCnt.childNodes.length === 0 && !_this.isTemplate) {
                    detach(oldCnt);
                }
            };
            new Animation(animateObj).animate(oldCnt);
        }
        else {
            oldCnt.classList.remove(CLS_ACTIVE);
        }
    };
    Tab.prototype.triggerAnimation = function (id, value) {
        var _this = this;
        var prevIndex = this.prevIndex;
        var oldCnt;
        var itemCollection = [].slice.call(this.element.querySelector('.' + CLS_CONTENT).children);
        itemCollection.forEach(function (item) {
            if (item.id === _this.prevActiveEle) {
                oldCnt = item;
            }
        });
        var prevEle = this.tbItem[prevIndex];
        var newCnt = this.getTrgContent(this.cntEle, this.extIndex(id));
        if (isNOU(oldCnt) && !isNOU(prevEle)) {
            var idNo = this.extIndex(prevEle.id);
            oldCnt = this.getTrgContent(this.cntEle, idNo);
        }
        if (!isNOU(newCnt)) {
            this.prevActiveEle = newCnt.id;
        }
        var isPrevent = isNOU(this.animation) || isNOU(this.animation.next.effect) || isNOU(this.animation.previous.effect)
            || this.animation.previous.effect === 'None' || this.animation.next.effect === 'None';
        if (this.initRender || value === false || isPrevent) {
            if (oldCnt && oldCnt !== newCnt) {
                oldCnt.classList.remove(CLS_ACTIVE);
            }
            return;
        }
        var cnt = select('.' + CLS_CONTENT, this.element);
        var animateObj;
        if (this.prevIndex > this.selectedItem && !this.isPopup) {
            var openEff = this.animation.previous.effect;
            animateObj = {
                name: ((openEff === 'None') ? '' : ((openEff !== 'SlideLeftIn') ? openEff : 'SlideLeftIn')),
                duration: (this.animation.previous.duration === 0 && animationMode === 'Enable') ? 600 : this.animation.previous.duration,
                timingFunction: this.animation.previous.easing
            };
        }
        else if (this.isPopup || this.prevIndex < this.selectedItem || this.prevIndex === this.selectedItem) {
            var clsEff = this.animation.next.effect;
            animateObj = {
                name: ((clsEff === 'None') ? '' : ((clsEff !== 'SlideRightIn') ? clsEff : 'SlideRightIn')),
                duration: (this.animation.next.duration === 0 && animationMode === 'Enable') ? 600 : this.animation.next.duration,
                timingFunction: this.animation.next.easing
            };
        }
        animateObj.progress = function () {
            cnt.classList.add(CLS_PROGRESS);
            _this.setActiveBorder();
        };
        animateObj.end = function () {
            cnt.classList.remove(CLS_PROGRESS);
            newCnt.classList.add(CLS_ACTIVE);
        };
        if (!this.initRender && !isNOU(oldCnt)) {
            this.triggerPrevAnimation(oldCnt, prevIndex);
        }
        this.isPopup = false;
        if (animateObj.name === '') {
            newCnt.classList.add(CLS_ACTIVE);
        }
        else {
            new Animation(animateObj).animate(newCnt);
        }
    };
    Tab.prototype.keyPressed = function (trg) {
        var trgParent = closest(trg, '.' + CLS_HEADER + ' .' + CLS_TB_ITEM);
        var trgIndex = this.getEleIndex(trgParent);
        if (!isNOU(this.popEle) && trg.classList.contains('e-hor-nav')) {
            (this.popEle.classList.contains(CLS_POPUP_OPEN)) ? this.popObj.hide(this.hide) : this.popObj.show(this.show);
        }
        else if (trg.classList.contains('e-scroll-nav')) {
            trg.click();
        }
        else {
            if (!isNOU(trgParent) && trgParent.classList.contains(CLS_ACTIVE) === false) {
                this.selectTab(trgIndex, null, true);
                if (!isNOU(this.popEle)) {
                    this.popObj.hide(this.hide);
                }
            }
        }
    };
    Tab.prototype.getTabHeader = function () {
        if (isNOU(this.element)) {
            return undefined;
        }
        var headers = [].slice.call(this.element.children).filter(function (e) { return e.classList.contains(CLS_HEADER); });
        if (headers.length > 0) {
            return headers[0];
        }
        else {
            var wrap = [].slice.call(this.element.children).filter(function (e) { return !e.classList.contains(CLS_BLA_TEM); })[0];
            if (!wrap) {
                return undefined;
            }
            return [].slice.call(wrap.children).filter(function (e) { return e.classList.contains(CLS_HEADER); })[0];
        }
    };
    Tab.prototype.getEleIndex = function (item) {
        return Array.prototype.indexOf.call(selectAll('.' + CLS_TB_ITEM, this.getTabHeader()), item);
    };
    Tab.prototype.extIndex = function (id) {
        return id.replace(CLS_ITEM + this.tabId + '_', '');
    };
    Tab.prototype.getMaxIndicesFromItems = function (tbItems) {
        var _this = this;
        var idList = [];
        tbItems.forEach(function (item) {
            idList.push(_this.getIndexFromEle(item.id));
        });
        return Math.max.apply(Math, idList);
    };
    Tab.prototype.expTemplateContent = function () {
        var _this = this;
        this.templateEle.forEach(function (eleStr) {
            if (!isNOU(_this.element.querySelector(eleStr))) {
                document.body.appendChild(_this.element.querySelector(eleStr)).style.display = 'none';
            }
        });
    };
    Tab.prototype.templateCompile = function (ele, cnt, index) {
        var tempEle = this.createElement('div');
        this.compileElement(tempEle, cnt, 'content', index);
        if (tempEle.childNodes.length !== 0) {
            ele.appendChild(tempEle);
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Tab.prototype.compileElement = function (ele, val, prop, index) {
        var templateFn;
        if (typeof val === 'string') {
            val = val.trim();
            if (this.isVue) {
                templateFn = compile(this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(val) : val);
            }
            else {
                ele.innerHTML = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(val) : val;
            }
        }
        else {
            templateFn = compile(val);
        }
        var templateFUN;
        if (!isNOU(templateFn)) {
            templateFUN = templateFn({}, this, prop);
        }
        if (!isNOU(templateFn) && templateFUN.length > 0) {
            [].slice.call(templateFUN).forEach(function (el) {
                ele.appendChild(el);
            });
        }
    };
    Tab.prototype.headerTextCompile = function (element, text, index) {
        this.compileElement(element, text, 'headerTemplate', index);
    };
    Tab.prototype.getContent = function (ele, cnt, callType, index) {
        var eleStr;
        cnt = isNOU(cnt) ? '' : cnt;
        if (typeof cnt === 'string' || isNOU(cnt.innerHTML)) {
            if (typeof cnt === 'string' && this.enableHtmlSanitizer) {
                cnt = SanitizeHtmlHelper.sanitize(cnt);
            }
            if (cnt[0] === '.' || cnt[0] === '#') {
                if (document.querySelectorAll(cnt).length) {
                    var eleVal = document.querySelector(cnt);
                    eleStr = eleVal.outerHTML.trim();
                    if (callType === 'clone') {
                        ele.appendChild(eleVal.cloneNode(true));
                    }
                    else {
                        ele.appendChild(eleVal);
                        eleVal.style.display = '';
                    }
                }
                else {
                    this.templateCompile(ele, cnt, index);
                }
            }
            else {
                this.templateCompile(ele, cnt, index);
            }
        }
        else {
            ele.appendChild(cnt);
        }
        if (!isNOU(eleStr)) {
            if (this.templateEle.indexOf(cnt.toString()) === -1) {
                this.templateEle.push(cnt.toString());
            }
        }
    };
    Tab.prototype.getTrgContent = function (cntEle, no) {
        var ele;
        if (this.element.classList.contains(CLS_NEST)) {
            ele = select('.' + CLS_NEST + '> .' + CLS_CONTENT + ' > #' + CLS_CONTENT + this.tabId + '_' + no, this.element);
        }
        else {
            ele = this.findEle(cntEle.children, CLS_CONTENT + this.tabId + '_' + no);
        }
        return ele;
    };
    Tab.prototype.findEle = function (items, key) {
        var ele;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === key) {
                ele = items[i];
                break;
            }
        }
        return ele;
    };
    Tab.prototype.isVertical = function () {
        var isVertical = (this.headerPlacement === 'Left' || this.headerPlacement === 'Right') ? true : false;
        this.scrCntClass = (isVertical) ? CLS_VSCRCNT : CLS_HSCRCNT;
        return isVertical;
    };
    Tab.prototype.addVerticalClass = function () {
        if (this.isVertical()) {
            var tbPos = (this.headerPlacement === 'Left') ? CLS_VLEFT : CLS_VRIGHT;
            addClass([this.hdrEle], [CLS_VERTICAL, tbPos]);
            if (!this.element.classList.contains(CLS_NEST)) {
                addClass([this.element], [CLS_VTAB, tbPos]);
            }
            else {
                addClass([this.hdrEle], [CLS_VTAB, tbPos]);
            }
        }
        if (this.headerPlacement === 'Bottom') {
            addClass([this.hdrEle], [CLS_HBOTTOM]);
        }
    };
    Tab.prototype.updatePopAnimationConfig = function () {
        this.show = { name: (this.isVertical() ? 'FadeIn' : 'SlideDown'), duration: 100 };
        this.hide = { name: (this.isVertical() ? 'FadeOut' : 'SlideUp'), duration: 100 };
    };
    Tab.prototype.changeOrientation = function (place) {
        this.setOrientation(place, this.hdrEle);
        var activeTab = this.hdrEle.querySelector('.' + CLS_ACTIVE);
        var isVertical = this.hdrEle.classList.contains(CLS_VERTICAL) ? true : false;
        removeClass([this.element], [CLS_VTAB]);
        removeClass([this.hdrEle], [CLS_VERTICAL, CLS_VLEFT, CLS_VRIGHT]);
        if (isVertical !== this.isVertical()) {
            this.changeToolbarOrientation();
            if (!isNOU(activeTab) && activeTab.classList.contains(CLS_TB_POPUP)) {
                this.popupHandler(activeTab);
            }
        }
        this.addVerticalClass();
        this.setActiveBorder();
        this.focusItem();
    };
    Tab.prototype.focusItem = function () {
        var curActItem = select(' #' + CLS_ITEM + this.tabId + '_' + this.selectedItem, this.hdrEle);
        if (!isNOU(curActItem)) {
            curActItem.firstElementChild.focus();
        }
    };
    Tab.prototype.changeToolbarOrientation = function () {
        this.tbObj.setProperties({ height: (this.isVertical() ? '100%' : 'auto'), width: (this.isVertical() ? 'auto' : '100%') }, true);
        this.tbObj.changeOrientation();
        this.updatePopAnimationConfig();
    };
    Tab.prototype.setOrientation = function (place, ele) {
        var headerPos = Array.prototype.indexOf.call(this.element.children, ele);
        var contentPos = Array.prototype.indexOf.call(this.element.children, this.element.querySelector('.' + CLS_CONTENT));
        if (place === 'Bottom' && (contentPos > headerPos)) {
            this.element.appendChild(ele);
        }
        else {
            removeClass([ele], [CLS_HBOTTOM]);
            this.element.insertBefore(ele, select('.' + CLS_CONTENT, this.element));
        }
    };
    Tab.prototype.setCssClass = function (ele, cls, val) {
        if (cls === '' || isNOU(cls)) {
            return;
        }
        var list = cls.split(' ');
        for (var i = 0; i < list.length; i++) {
            if (val) {
                ele.classList.add(list[i]);
            }
            else {
                ele.classList.remove(list[i]);
            }
        }
    };
    Tab.prototype.loadContentInitMode = function (ele) {
        if (!ele) {
            return;
        }
        if (this.loadOn === 'Init') {
            for (var i = 0; i < this.items.length; i++) {
                if (this.cntEle.children.item(i)) {
                    this.getContent(this.cntEle.children.item(i), this.items[i].content, 'render', i);
                }
            }
        }
    };
    Tab.prototype.loadContentElement = function () {
        if (!this.isTemplate) {
            var ele = this.cntEle.children.item(0);
            this.loadContentInitMode(ele);
        }
    };
    Tab.prototype.setContentHeight = function (val) {
        if (this.element.classList.contains(CLS_FILL)) {
            removeClass([this.element], [CLS_FILL]);
        }
        if (isNOU(this.cntEle)) {
            return;
        }
        var hdrEle = this.getTabHeader();
        if (this.heightAdjustMode === 'None') {
            this.loadContentElement();
            if (this.height === 'auto') {
                return;
            }
            else {
                if (!this.isVertical()) {
                    setStyle(this.cntEle, { 'height': (this.element.clientHeight - hdrEle.offsetHeight) + 'px' });
                }
            }
        }
        else if (this.heightAdjustMode === 'Fill') {
            addClass([this.element], [CLS_FILL]);
            setStyle(this.element, { 'height': '100%' });
            this.loadContentElement();
            this.cntEle.style.height = 'calc(100% - ' + this.hdrEle.offsetHeight + 'px)';
        }
        else if (this.heightAdjustMode === 'Auto') {
            if (this.isTemplate === true) {
                var cnt = selectAll('.' + CLS_CONTENT + ' > .' + CLS_ITEM, this.element);
                for (var i = 0; i < cnt.length; i++) {
                    cnt[i].style.display = 'block';
                    cnt[i].style.visibility = 'visible';
                    this.maxHeight = Math.max(this.maxHeight, this.getHeight(cnt[i]));
                    cnt[i].style.removeProperty('display');
                    cnt[i].style.removeProperty('visibility');
                }
            }
            else {
                this.cntEle = select('.' + CLS_CONTENT, this.element);
                if (val === true && this.loadOn === 'Demand') {
                    this.cntEle.appendChild(this.createContentElement(Number(this.extIndex(this.itemIndexArray[0]))));
                }
                var ele = this.cntEle.children.item(0);
                for (var i = 0; i < this.items.length; i++) {
                    this.getContent(ele, this.items[i].content, 'clone', i);
                    this.maxHeight = Math.max(this.maxHeight, this.getHeight(ele));
                    while (ele.firstChild) {
                        ele.removeChild(ele.firstChild);
                    }
                }
                if (this.isReact || this.isAngular || this.isVue) {
                    this.clearTemplate(['content']);
                }
                this.templateEle = [];
                if (this.loadOn === 'Demand') {
                    this.getContent(ele, this.items[0].content, 'render', 0);
                }
                this.loadContentInitMode(ele);
                if (this.prevIndex !== this.selectedItem) {
                    ele.classList.remove(CLS_ACTIVE);
                }
            }
            setStyle(this.cntEle, { 'height': this.maxHeight + 'px' });
        }
        else {
            this.loadContentElement();
            setStyle(this.cntEle, { 'height': 'auto' });
        }
    };
    Tab.prototype.getHeight = function (ele) {
        var cs = window.getComputedStyle(ele);
        return ele.offsetHeight + parseFloat(cs.getPropertyValue('padding-top')) + parseFloat(cs.getPropertyValue('padding-bottom')) +
            parseFloat(cs.getPropertyValue('margin-top')) + parseFloat(cs.getPropertyValue('margin-bottom'));
    };
    Tab.prototype.setActiveBorder = function () {
        var trgHdrEle = this.getTabHeader();
        var trg = select('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE, trgHdrEle);
        if (isNOU(trg)) {
            return;
        }
        if (!this.reorderActiveTab) {
            if (trg.classList.contains(CLS_TB_POPUP) && !this.bdrLine.classList.contains(CLS_HIDDEN)) {
                this.bdrLine.classList.add(CLS_HIDDEN);
            }
            if (trgHdrEle && !trgHdrEle.classList.contains(CLS_REORDER_ACTIVE_ITEM)) {
                trgHdrEle.classList.add(CLS_REORDER_ACTIVE_ITEM);
            }
        }
        else if (trgHdrEle) {
            trgHdrEle.classList.remove(CLS_REORDER_ACTIVE_ITEM);
        }
        var root = closest(trg, '.' + CLS_TAB);
        if (this.element !== root) {
            return;
        }
        this.tbItems = select('.' + CLS_TB_ITEMS, trgHdrEle);
        var bar = select('.' + CLS_INDICATOR, trgHdrEle);
        var scrollCnt = select('.' + CLS_TB_ITEMS + ' .' + this.scrCntClass, trgHdrEle);
        if (this.isVertical()) {
            setStyle(bar, { 'left': '', 'right': '' });
            var tbHeight = (isNOU(scrollCnt)) ? this.tbItems.offsetHeight : scrollCnt.offsetHeight;
            if (tbHeight !== 0) {
                setStyle(bar, { 'top': trg.offsetTop + 'px', 'height': trg.offsetHeight + 'px' });
            }
            else {
                setStyle(bar, { 'top': 0, 'height': 0 });
            }
        }
        else {
            if (this.overflowMode === 'MultiRow') {
                var top_1 = this.headerPlacement === 'Bottom' ? trg.offsetTop : trg.offsetHeight + trg.offsetTop;
                setStyle(bar, { 'top': top_1 + 'px', 'height': '' });
            }
            else {
                setStyle(bar, { 'top': '', 'height': '' });
            }
            var tbWidth = (isNOU(scrollCnt)) ? this.tbItems.offsetWidth : scrollCnt.offsetWidth;
            if (tbWidth !== 0) {
                setStyle(bar, { 'left': trg.offsetLeft + 'px', 'right': tbWidth - (trg.offsetLeft + trg.offsetWidth) + 'px' });
            }
            else {
                setStyle(bar, { 'left': 'auto', 'right': 'auto' });
            }
        }
        if (!isNOU(this.bdrLine) && !trg.classList.contains(CLS_TB_POPUP)) {
            this.bdrLine.classList.remove(CLS_HIDDEN);
        }
    };
    Tab.prototype.setActive = function (value, skipDataBind, isInteracted) {
        if (skipDataBind === void 0) { skipDataBind = false; }
        if (isInteracted === void 0) { isInteracted = false; }
        this.tbItem = selectAll('.' + CLS_TB_ITEM, this.getTabHeader());
        var trg = this.tbItem[value];
        if (value < 0 || isNaN(value) || this.tbItem.length === 0 || !isNOU(trg) && trg.classList.contains(CLS_DISABLE)) {
            return;
        }
        if (value >= 0 && !skipDataBind) {
            this.allowServerDataBinding = false;
            this.setProperties({ selectedItem: value }, true);
            this.allowServerDataBinding = true;
            if (!this.initRender) {
                this.serverDataBind();
            }
        }
        if (trg.classList.contains(CLS_ACTIVE)) {
            this.setActiveBorder();
            return;
        }
        if (!this.isTemplate) {
            attributes(trg.firstElementChild, { 'aria-controls': CLS_CONTENT + this.tabId + '_' + this.extIndex(trg.id) });
        }
        var id = trg.id;
        this.removeActiveClass();
        trg.classList.add(CLS_ACTIVE);
        trg.firstElementChild.setAttribute('aria-selected', 'true');
        var no = Number(this.extIndex(id));
        if (isNOU(this.prevActiveEle)) {
            this.prevActiveEle = CLS_CONTENT + this.tabId + '_' + no;
        }
        if (this.isTemplate) {
            if (select('.' + CLS_CONTENT, this.element).children.length > 0) {
                var trg_1 = this.findEle(select('.' + CLS_CONTENT, this.element).children, CLS_CONTENT + this.tabId + '_' + no);
                if (!isNOU(trg_1)) {
                    trg_1.classList.add(CLS_ACTIVE);
                }
                this.triggerAnimation(id, this.enableAnimation);
            }
        }
        else {
            this.cntEle = select('.' + CLS_TAB + ' > .' + CLS_CONTENT, this.element);
            while (this.loadOn === 'Dynamic' && this.cntEle.firstElementChild) {
                this.cntEle.removeChild(this.cntEle.firstElementChild);
            }
            var item = this.getTrgContent(this.cntEle, this.extIndex(id));
            if (isNOU(item)) {
                this.cntEle.appendChild(this.createElement('div', {
                    id: CLS_CONTENT + this.tabId + '_' + this.extIndex(id), className: CLS_ITEM + ' ' + CLS_ACTIVE,
                    attrs: { role: 'tabpanel', 'aria-labelledby': CLS_ITEM + this.tabId + '_' + this.extIndex(id) }
                }));
                var eleTrg = this.getTrgContent(this.cntEle, this.extIndex(id));
                var itemIndex = Array.prototype.indexOf.call(this.itemIndexArray, id);
                this.getContent(eleTrg, this.items[itemIndex].content, 'render', itemIndex);
            }
            else {
                item.classList.add(CLS_ACTIVE);
            }
            this.triggerAnimation(id, this.enableAnimation);
        }
        this.setActiveBorder();
        this.refreshItemVisibility(trg);
        if (!this.initRender && !skipDataBind) {
            var eventArg = {
                previousItem: this.prevItem,
                previousIndex: this.prevIndex,
                selectedItem: trg,
                selectedIndex: value,
                selectedContent: select('#' + CLS_CONTENT + this.tabId + '_' + this.selectingID, this.content),
                isSwiped: this.isSwiped,
                isInteracted: isInteracted,
                preventFocus: false
            };
            this.trigger('selected', eventArg, function (selectEventArgs) {
                if (!selectEventArgs.preventFocus) {
                    trg.firstElementChild.focus();
                }
            });
        }
    };
    Tab.prototype.setItems = function (items) {
        this.isReplace = true;
        this.tbItems = select('.' + CLS_TB_ITEMS, this.getTabHeader());
        this.tbObj.items = this.parseObject(items, 0);
        this.tbObj.dataBind();
        this.isReplace = false;
    };
    Tab.prototype.setRTL = function (value) {
        this.tbObj.enableRtl = value;
        this.tbObj.dataBind();
        this.setCssClass(this.element, CLS_RTL, value);
        this.refreshActiveBorder();
    };
    Tab.prototype.refreshActiveBorder = function () {
        if (!isNOU(this.bdrLine)) {
            this.bdrLine.classList.add(CLS_HIDDEN);
        }
        this.setActiveBorder();
    };
    Tab.prototype.showPopup = function (config) {
        var tbPop = select('.e-popup.e-toolbar-pop', this.hdrEle);
        if (tbPop && tbPop.classList.contains('e-popup-close')) {
            var tbPopObj = (tbPop && tbPop.ej2_instances[0]);
            tbPopObj.position.X = (this.headerPlacement === 'Left' || this.element.classList.contains(CLS_RTL)) ? 'left' : 'right';
            tbPopObj.dataBind();
            tbPopObj.show(config);
        }
    };
    Tab.prototype.bindDraggable = function () {
        var _this = this;
        if (this.allowDragAndDrop) {
            var tabHeader = this.element.querySelector('.' + CLS_HEADER);
            if (tabHeader) {
                var items = Array.prototype.slice.call(tabHeader.querySelectorAll('.' + CLS_TB_ITEM));
                items.forEach(function (element) {
                    _this.initializeDrag(element);
                });
            }
        }
    };
    Tab.prototype.bindSwipeEvents = function () {
        if (this.swipeMode !== 'None') {
            this.touchModule = new Touch(this.cntEle, { swipe: this.swipeHandler.bind(this) });
        }
    };
    Tab.prototype.wireEvents = function () {
        this.bindDraggable();
        window.addEventListener('resize', this.resizeContext);
        EventHandler.add(this.element, 'mouseover', this.hoverHandler, this);
        EventHandler.add(this.element, 'keydown', this.spaceKeyDown, this);
        if (!isNOU(this.cntEle)) {
            this.bindSwipeEvents();
        }
        this.keyModule = new KeyboardEvents(this.element, { keyAction: this.keyHandler.bind(this), keyConfigs: this.keyConfigs });
        this.tabKeyModule = new KeyboardEvents(this.element, {
            keyAction: this.keyHandler.bind(this),
            keyConfigs: { openPopup: 'shift+f10', tab: 'tab', shiftTab: 'shift+tab' },
            eventName: 'keydown'
        });
    };
    Tab.prototype.unWireEvents = function () {
        if (!isNOU(this.keyModule)) {
            this.keyModule.destroy();
        }
        if (!isNOU(this.tabKeyModule)) {
            this.tabKeyModule.destroy();
        }
        if (!isNOU(this.cntEle) && !isNOU(this.touchModule)) {
            this.touchModule.destroy();
            this.touchModule = null;
        }
        window.removeEventListener('resize', this.resizeContext);
        EventHandler.remove(this.element, 'mouseover', this.hoverHandler);
        EventHandler.remove(this.element, 'keydown', this.spaceKeyDown);
        this.element.classList.remove(CLS_RTL);
        this.element.classList.remove(CLS_FOCUS);
    };
    Tab.prototype.clickHandler = function (args) {
        this.element.classList.remove(CLS_FOCUS);
        var trg = args.originalEvent.target;
        var trgParent = closest(trg, '.' + CLS_TB_ITEM);
        var trgIndex = this.getEleIndex(trgParent);
        if (trg.classList.contains(CLS_ICON_CLOSE)) {
            this.removeTab(trgIndex);
        }
        else if (this.isVertical() && closest(trg, '.' + CLS_HOR_NAV)) {
            this.showPopup(this.show);
        }
        else {
            this.isPopup = false;
            if (!isNOU(trgParent) && (trgIndex !== this.selectedItem)) {
                this.selectTab(trgIndex, args.originalEvent, true);
            }
        }
    };
    Tab.prototype.swipeHandler = function (e) {
        if ((e.velocity < 3 && isNullOrUndefined(e.originalEvent.changedTouches)) ||
            (this.swipeMode === 'Touch' && ((e.originalEvent.type === 'mouseup') || e.originalEvent.type === 'mouseleave')) ||
            (this.swipeMode === 'Mouse' && e.originalEvent.type === 'touchend') || (this.swipeMode === 'None')) {
            return;
        }
        if (this.isNested) {
            this.element.setAttribute('data-swipe', 'true');
        }
        var nestedTab = this.element.querySelector('[data-swipe="true"]');
        if (nestedTab) {
            nestedTab.removeAttribute('data-swipe');
            return;
        }
        this.isSwiped = true;
        if (e.swipeDirection === 'Right' && this.selectedItem !== 0) {
            for (var k = this.selectedItem - 1; k >= 0; k--) {
                if (!this.tbItem[k].classList.contains(CLS_HIDDEN)) {
                    this.selectTab(k, null, true);
                    break;
                }
            }
        }
        else if (e.swipeDirection === 'Left' && (this.selectedItem !== selectAll('.' + CLS_TB_ITEM, this.element).length - 1)) {
            for (var i = this.selectedItem + 1; i < this.tbItem.length; i++) {
                if (!this.tbItem[i].classList.contains(CLS_HIDDEN)) {
                    this.selectTab(i, null, true);
                    break;
                }
            }
        }
        this.isSwiped = false;
    };
    Tab.prototype.spaceKeyDown = function (e) {
        if ((e.keyCode === 32 && e.which === 32) || (e.keyCode === 35 && e.which === 35)) {
            var clstHead = closest(e.target, '.' + CLS_HEADER);
            if (!isNOU(clstHead)) {
                e.preventDefault();
            }
        }
    };
    Tab.prototype.keyHandler = function (e) {
        if (this.element.classList.contains(CLS_DISABLE)) {
            return;
        }
        this.element.classList.add(CLS_FOCUS);
        var trg = e.target;
        var tabHeader = this.getTabHeader();
        var actEle = select('.' + CLS_ACTIVE, tabHeader);
        this.popEle = select('.' + CLS_TB_POP, tabHeader);
        if (!isNOU(this.popEle)) {
            this.popObj = this.popEle.ej2_instances[0];
        }
        var item = closest(document.activeElement, '.' + CLS_TB_ITEM);
        var trgParent = closest(trg, '.' + CLS_TB_ITEM);
        switch (e.action) {
            case 'space':
            case 'enter':
                if (trg.parentElement.classList.contains(CLS_DISABLE)) {
                    return;
                }
                if (e.action === 'enter' && trg.classList.contains('e-hor-nav')) {
                    this.showPopup(this.show);
                    break;
                }
                this.keyPressed(trg);
                break;
            case 'tab':
            case 'shiftTab':
                if (trg.classList.contains(CLS_WRAP)
                    && closest(trg, '.' + CLS_TB_ITEM).classList.contains(CLS_ACTIVE) === false) {
                    trg.setAttribute('tabindex', trg.getAttribute('data-tabindex'));
                }
                if (this.popObj && isVisible(this.popObj.element)) {
                    this.popObj.hide(this.hide);
                }
                if (!isNOU(actEle) && actEle.children.item(0).getAttribute('tabindex') === '-1') {
                    actEle.children.item(0).setAttribute('tabindex', '0');
                }
                break;
            case 'moveLeft':
            case 'moveRight':
                if (!isNOU(item)) {
                    this.refreshItemVisibility(item);
                }
                break;
            case 'openPopup':
                e.preventDefault();
                if (!isNOU(this.popEle) && this.popEle.classList.contains(CLS_POPUP_CLOSE)) {
                    this.popObj.show(this.show);
                }
                break;
            case 'delete':
                if (this.showCloseButton === true && !isNOU(trgParent)) {
                    var nxtSib = trgParent.nextSibling;
                    if (!isNOU(nxtSib) && nxtSib.classList.contains(CLS_TB_ITEM)) {
                        nxtSib.firstElementChild.focus();
                    }
                    this.removeTab(this.getEleIndex(trgParent));
                }
                this.setActiveBorder();
                break;
        }
    };
    Tab.prototype.refreshItemVisibility = function (target) {
        var scrCnt = select('.' + this.scrCntClass, this.tbItems);
        if (!this.isVertical() && !isNOU(scrCnt)) {
            var scrBar = select('.e-hscroll-bar', this.tbItems);
            var scrStart = scrBar.scrollLeft;
            var scrEnd = scrStart + scrBar.offsetWidth;
            var eleStart = target.offsetLeft;
            var eleWidth = target.offsetWidth;
            var eleEnd = target.offsetLeft + target.offsetWidth;
            if ((scrStart < eleStart) && (scrEnd < eleEnd)) {
                var eleViewRange = scrEnd - eleStart;
                scrBar.scrollLeft = scrStart + (eleWidth - eleViewRange);
            }
            else {
                if ((scrStart > eleStart) && (scrEnd > eleEnd)) {
                    var eleViewRange = eleEnd - scrStart;
                    scrBar.scrollLeft = scrStart - (eleWidth - eleViewRange);
                }
            }
        }
        else {
            return;
        }
    };
    Tab.prototype.getIndexFromEle = function (id) {
        return parseInt(id.substring(id.lastIndexOf('_') + 1), 10);
    };
    Tab.prototype.hoverHandler = function (e) {
        var trg = e.target;
        if (!isNOU(trg.classList) && trg.classList.contains(CLS_ICON_CLOSE)) {
            trg.setAttribute('title', new L10n('tab', { closeButtonTitle: this.title }, this.locale).getConstant('closeButtonTitle'));
        }
    };
    Tab.prototype.evalOnPropertyChangeItems = function (newProp, oldProp) {
        var _this = this;
        if (!(newProp.items instanceof Array && oldProp.items instanceof Array)) {
            var changedProp = Object.keys(newProp.items);
            for (var i = 0; i < changedProp.length; i++) {
                var index = parseInt(Object.keys(newProp.items)[i], 10);
                var properties = Object.keys(newProp.items[index]);
                for (var j = 0; j < properties.length; j++) {
                    var oldVal = Object(oldProp.items[index])[properties[j]];
                    var newVal = Object(newProp.items[index])[properties[j]];
                    var hdr = this.element.querySelectorAll('.' + CLS_TB_ITEM)[index];
                    var itemIndex = void 0;
                    if (hdr && !isNOU(hdr.id) && hdr.id !== '') {
                        itemIndex = this.getIndexFromEle(hdr.id);
                    }
                    else {
                        itemIndex = index;
                    }
                    var hdrItem = select('.' + CLS_TB_ITEMS + ' #' + CLS_ITEM + this.tabId + '_' + itemIndex, this.element);
                    var cntItem = select('.' + CLS_CONTENT + ' #' + CLS_CONTENT + this.tabId + '_' + itemIndex, this.element);
                    if (properties[j] === 'header' || properties[j] === 'headerTemplate') {
                        var icon = (isNOU(this.items[index].header) ||
                            isNOU(this.items[index].header.iconCss)) ? '' : this.items[index].header.iconCss;
                        var textVal = this.items[index].headerTemplate || this.items[index].header.text;
                        if (properties[j] === 'headerTemplate') {
                            this.clearTabTemplate(hdrItem, properties[j], CLS_TB_ITEM);
                        }
                        if ((textVal === '') && (icon === '')) {
                            this.removeTab(index);
                        }
                        else {
                            this.tbId = hdr.id;
                            var arr = [];
                            arr.push(this.items[index]);
                            this.items.splice(index, 1);
                            this.itemIndexArray.splice(index, 1);
                            this.tbObj.items.splice(index, 1);
                            var isHiddenEle = hdrItem.classList.contains(CLS_HIDDEN);
                            detach(hdrItem);
                            this.isReplace = true;
                            this.addTab(arr, index);
                            if (isHiddenEle) {
                                this.hideTab(index);
                            }
                            this.isReplace = false;
                        }
                    }
                    if (properties[j] === 'content' && !isNOU(cntItem)) {
                        var strVal = typeof newVal === 'string' || isNOU(newVal.innerHTML);
                        if (strVal && (newVal[0] === '.' || newVal[0] === '#') && newVal.length) {
                            var eleVal = document.querySelector(newVal);
                            cntItem.appendChild(eleVal);
                            eleVal.style.display = '';
                        }
                        else if (newVal === '' && oldVal[0] === '#') {
                            document.body.appendChild(this.element.querySelector(oldVal)).style.display = 'none';
                            cntItem.innerHTML = newVal;
                        }
                        else if (this.isAngular || this.isReact) {
                            this.clearTabTemplate(cntItem, properties[j], CLS_ITEM);
                            cntItem.innerHTML = '';
                            this.templateCompile(cntItem, newVal, index);
                        }
                        else if (typeof newVal !== 'function') {
                            cntItem.innerHTML = newVal;
                        }
                    }
                    if (properties[j] === 'cssClass') {
                        if (!isNOU(hdrItem)) {
                            hdrItem.classList.remove(oldVal);
                            hdrItem.classList.add(newVal);
                        }
                        if (!isNOU(cntItem)) {
                            cntItem.classList.remove(oldVal);
                            cntItem.classList.add(newVal);
                        }
                    }
                    if (properties[j] === 'disabled') {
                        this.enableTab(index, ((newVal === true) ? false : true));
                    }
                    if (properties[j] === 'visible') {
                        this.hideTab(index, ((newVal === true) ? false : true));
                    }
                }
            }
            if (this.isReact && this.portals && this.portals.length > 0) {
                this.renderReactTemplates(function () {
                    _this.refreshActiveTabBorder();
                });
            }
        }
        else {
            this.lastIndex = 0;
            if (isNOU(this.tbObj)) {
                this.reRenderItems();
            }
            else {
                if (this.isReact || this.isAngular) {
                    this.clearTemplate();
                }
                this.setItems(newProp.items);
                if (this.templateEle.length > 0) {
                    this.expTemplateContent();
                }
                this.templateEle = [];
                var selectElement = select('.' + CLS_TAB + ' > .' + CLS_CONTENT, this.element);
                while (selectElement.firstElementChild) {
                    detach(selectElement.firstElementChild);
                }
                this.select(this.selectedItem);
                this.draggableItems = [];
                this.bindDraggable();
            }
        }
    };
    Tab.prototype.clearTabTemplate = function (templateEle, templateName, className) {
        if (!this.clearTemplates) {
            return;
        }
        if (this.registeredTemplate && this.registeredTemplate[templateName]) {
            var registeredTemplates = this.registeredTemplate;
            for (var index = 0; index < registeredTemplates[templateName].length; index++) {
                var registeredItem = registeredTemplates[templateName][index].rootNodes[0];
                var closestItem = closest(registeredItem, '.' + className);
                if (!isNullOrUndefined(closestItem) && closestItem === templateEle) {
                    this.clearTemplate([templateName], [registeredTemplates[templateName][index]]);
                    break;
                }
            }
        }
        else if (this.portals && this.portals.length > 0) {
            var portals = this.portals;
            for (var index = 0; index < portals.length; index++) {
                var portalItem = portals[index];
                var closestItem = closest(portalItem.containerInfo, '.' + className);
                if (!isNullOrUndefined(closestItem) && closestItem === templateEle) {
                    this.clearTemplate([templateName], index);
                    break;
                }
            }
        }
    };
    Tab.prototype.initializeDrag = function (target) {
        var _this = this;
        var dragObj = new Draggable(target, {
            dragArea: this.dragArea,
            dragTarget: '.' + CLS_TB_ITEM,
            clone: true,
            helper: this.helper.bind(this),
            dragStart: this.itemDragStart.bind(this),
            drag: function (e) {
                var dragIndex = _this.getEleIndex(_this.dragItem);
                var dropIndex;
                var dropItem;
                var dragArgs = {
                    draggedItem: _this.dragItem,
                    event: e.event,
                    target: e.target,
                    droppedItem: e.target.closest('.' + CLS_TB_ITEM),
                    clonedElement: _this.cloneElement,
                    index: dragIndex
                };
                if (!isNOU(e.target.closest('.' + CLS_TAB)) && !e.target.closest('.' + CLS_TAB).isEqualNode(_this.element) &&
                    _this.dragArea !== '.' + CLS_HEADER) {
                    _this.trigger('dragging', dragArgs);
                }
                else {
                    if (!(e.target.closest(_this.dragArea)) && _this.overflowMode !== 'Popup') {
                        document.body.style.cursor = 'not-allowed';
                        addClass([_this.cloneElement], CLS_HIDDEN);
                        if (_this.dragItem.classList.contains(CLS_HIDDEN)) {
                            removeClass([_this.dragItem], CLS_HIDDEN);
                        }
                        _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = 'visible';
                    }
                    else {
                        document.body.style.cursor = '';
                        _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = 'hidden';
                        if (_this.cloneElement.classList.contains(CLS_HIDDEN)) {
                            removeClass([_this.cloneElement], CLS_HIDDEN);
                        }
                    }
                    if (_this.overflowMode === 'Scrollable' && !isNOU(_this.element.querySelector('.e-hscroll'))) {
                        var scrollRightNavEle = _this.element.querySelector('.e-scroll-right-nav');
                        var scrollLeftNavEle = _this.element.querySelector('.e-scroll-left-nav');
                        var hscrollBar = _this.element.querySelector('.e-hscroll-bar');
                        if (!isNOU(scrollRightNavEle) && Math.abs((scrollRightNavEle.offsetWidth / 2) +
                            scrollRightNavEle.offsetLeft) > _this.cloneElement.offsetLeft + _this.cloneElement.offsetWidth) {
                            hscrollBar.scrollLeft -= 10;
                        }
                        if (!isNOU(scrollLeftNavEle) && Math.abs((scrollLeftNavEle.offsetLeft + scrollLeftNavEle.offsetWidth) -
                            _this.cloneElement.offsetLeft) > (scrollLeftNavEle.offsetWidth / 2)) {
                            hscrollBar.scrollLeft += 10;
                        }
                    }
                    _this.cloneElement.style.pointerEvents = 'none';
                    dropItem = closest(e.target, '.' + CLS_TB_ITEM + '.e-draggable');
                    var scrollContentWidth = 0;
                    if (_this.overflowMode === 'Scrollable' && !isNOU(_this.element.querySelector('.e-hscroll'))) {
                        scrollContentWidth = _this.element.querySelector('.e-hscroll-content').offsetWidth;
                    }
                    if (dropItem != null && !dropItem.isSameNode(_this.dragItem) &&
                        dropItem.closest('.' + CLS_TAB).isSameNode(_this.dragItem.closest('.' + CLS_TAB))) {
                        dropIndex = _this.getEleIndex(dropItem);
                        if (dropIndex < dragIndex &&
                            (Math.abs((dropItem.offsetLeft + dropItem.offsetWidth) -
                                _this.cloneElement.offsetLeft) > (dropItem.offsetWidth / 2))) {
                            _this.dragAction(dropItem, dragIndex, dropIndex);
                        }
                        if (dropIndex > dragIndex &&
                            (Math.abs(dropItem.offsetWidth / 2) + dropItem.offsetLeft -
                                scrollContentWidth) < _this.cloneElement.offsetLeft + _this.cloneElement.offsetWidth) {
                            _this.dragAction(dropItem, dragIndex, dropIndex);
                        }
                    }
                    _this.droppedIndex = _this.getEleIndex(_this.dragItem);
                    _this.trigger('dragging', dragArgs);
                }
            },
            dragStop: this.itemDragStop.bind(this)
        });
        this.draggableItems.push(dragObj);
    };
    Tab.prototype.helper = function (e) {
        this.cloneElement = this.createElement('div');
        if (e.element) {
            this.cloneElement = (e.element.cloneNode(true));
            addClass([this.cloneElement], 'e-tab-clone-element');
            if (this.element.querySelector('.' + CLS_HEADER).classList.contains(CLS_CLOSE_SHOW)) {
                addClass([this.cloneElement], CLS_CLOSE_SHOW);
            }
            removeClass([this.cloneElement.querySelector('.' + CLS_WRAP)], 'e-ripple');
            if (!isNOU(this.cloneElement.querySelector('.e-ripple-element'))) {
                remove(this.cloneElement.querySelector('.e-ripple-element'));
            }
            document.body.appendChild(this.cloneElement);
        }
        return this.cloneElement;
    };
    Tab.prototype.itemDragStart = function (e) {
        var _this = this;
        this.draggingItems = this.items.map(function (x) { return x; });
        this.dragItem = e.element;
        var dragArgs = {
            draggedItem: e.element,
            event: e.event,
            target: e.target,
            droppedItem: null,
            index: this.getEleIndex(this.dragItem),
            clonedElement: this.cloneElement,
            cancel: false
        };
        this.trigger('onDragStart', dragArgs, function (tabItemDragArgs) {
            if (tabItemDragArgs.cancel) {
                var dragObj = e.element.ej2_instances[0];
                if (!isNullOrUndefined(dragObj)) {
                    dragObj.intDestroy(e.event);
                }
                detach(_this.cloneElement);
            }
            else {
                _this.removeActiveClass();
                addClass([_this.tbItems.querySelector('.' + CLS_INDICATOR)], CLS_HIDDEN);
                _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = 'hidden';
            }
        });
    };
    Tab.prototype.dragAction = function (dropItem, dragsIndex, dropIndex) {
        if (this.items.length > 0) {
            var item = this.draggingItems[dragsIndex];
            this.draggingItems.splice(dragsIndex, 1);
            this.draggingItems.splice(dropIndex, 0, item);
        }
        if (this.overflowMode === 'MultiRow') {
            dropItem.parentNode.insertBefore(this.dragItem, dropItem.nextElementSibling);
        }
        if (dragsIndex > dropIndex) {
            if (!(this.dragItem.parentElement).isSameNode(dropItem.parentElement)) {
                if (this.overflowMode === 'Extended') {
                    if (dropItem.isSameNode(dropItem.parentElement.lastChild)) {
                        var popupContainer = this.dragItem.parentNode;
                        dropItem.parentNode.insertBefore(this.dragItem, dropItem);
                        popupContainer.insertBefore(dropItem.parentElement.lastChild, popupContainer.childNodes[0]);
                    }
                    else {
                        this.dragItem.parentNode.insertBefore((dropItem.parentElement.lastChild), this.dragItem.parentElement.childNodes[0]);
                        dropItem.parentNode.insertBefore(this.dragItem, dropItem);
                    }
                }
                else {
                    var lastEle = (dropItem.parentElement).lastChild;
                    if (dropItem.isSameNode(lastEle)) {
                        var popupContainer = this.dragItem.parentNode;
                        dropItem.parentNode.insertBefore(this.dragItem, dropItem);
                        popupContainer.insertBefore(lastEle, popupContainer.childNodes[0]);
                    }
                    else {
                        this.dragItem.parentNode.insertBefore((dropItem.parentElement).lastChild, this.dragItem.parentElement.childNodes[0]);
                        dropItem.parentNode.insertBefore(this.dragItem, dropItem);
                    }
                }
            }
            else {
                this.dragItem.parentNode.insertBefore(this.dragItem, dropItem);
            }
        }
        if (dragsIndex < dropIndex) {
            if (!(this.dragItem.parentElement).isSameNode(dropItem.parentElement)) {
                if (this.overflowMode === 'Extended') {
                    this.dragItem.parentElement.appendChild(dropItem.parentElement.firstElementChild);
                    dropItem.parentNode.insertBefore(this.dragItem, dropItem.nextSibling);
                }
                else {
                    this.dragItem.parentNode.insertBefore((dropItem.parentElement).lastChild, this.dragItem.parentElement.childNodes[0]);
                    dropItem.parentNode.insertBefore(this.dragItem, dropItem);
                }
            }
            else {
                this.dragItem.parentNode.insertBefore(this.dragItem, dropItem.nextElementSibling);
            }
        }
    };
    Tab.prototype.itemDragStop = function (e) {
        var _this = this;
        detach(this.cloneElement);
        this.cloneElement = null;
        this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = 'visible';
        document.body.style.cursor = '';
        var dragStopArgs = {
            draggedItem: this.dragItem,
            event: e.event,
            target: e.target,
            droppedItem: this.tbItem[this.droppedIndex],
            clonedElement: null,
            index: this.droppedIndex,
            cancel: false
        };
        this.trigger('dragged', dragStopArgs, function (tabItemDropArgs) {
            if (tabItemDropArgs.cancel) {
                _this.refresh();
            }
            else {
                if (_this.items.length > 0 && _this.draggingItems.length > 0) {
                    _this.items = _this.draggingItems;
                    _this.selectedItem = isNOU(_this.droppedIndex) ? _this.getEleIndex(_this.dragItem) : _this.droppedIndex;
                    _this.refresh();
                }
                else {
                    _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = '';
                    removeClass([_this.tbItems.querySelector('.' + CLS_INDICATOR)], CLS_HIDDEN);
                    _this.droppedIndex = isNOU(_this.droppedIndex) ? _this.getEleIndex(_this.dragItem) : _this.droppedIndex;
                    _this.selectTab(_this.droppedIndex, null, true);
                }
            }
        });
        this.dragItem = null;
        this.droppedIndex = null;
    };
    /**
     * Enables or disables the specified Tab item. On passing value as `false`, the item will be disabled.
     *
     * @param {number} index - Index value of target Tab item.
     * @param {boolean} value - Boolean value that determines whether the command should be enabled or disabled.
     * By default, isEnable is true.
     * @returns {void}.
     */
    Tab.prototype.enableTab = function (index, value) {
        var tbItems = selectAll('.' + CLS_TB_ITEM, this.element)[index];
        if (isNOU(tbItems)) {
            return;
        }
        if (value === true) {
            tbItems.classList.remove(CLS_DISABLE, CLS_OVERLAY);
            tbItems.firstElementChild.setAttribute('tabindex', tbItems.firstElementChild.getAttribute('data-tabindex'));
        }
        else {
            tbItems.classList.add(CLS_DISABLE, CLS_OVERLAY);
            tbItems.firstElementChild.removeAttribute('tabindex');
            if (tbItems.classList.contains(CLS_ACTIVE)) {
                this.select(index + 1);
            }
        }
        if (!isNOU(this.items[index])) {
            this.items[index].disabled = !value;
            this.dataBind();
        }
        tbItems.firstElementChild.setAttribute('aria-disabled', (value === true) ? 'false' : 'true');
    };
    /**
     * Adds new items to the Tab that accepts an array as Tab items.
     *
     * @param {TabItemModel[]} items - An array of item that is added to the Tab.
     * @param {number} index - Number value that determines where the items to be added. By default, index is 0.
     * @returns {void}.
     */
    Tab.prototype.addTab = function (items, index) {
        var _this = this;
        var addArgs = { addedItems: items, cancel: false };
        if (!this.isReplace) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                item.disabled = item.disabled || false;
                item.visible = item.visible || true;
            }
            if (items && items.length !== 0 && this.element && this.element.classList.contains(CLS_HIDDEN)) {
                this.element.classList.remove(CLS_HIDDEN);
            }
            this.trigger('adding', addArgs, function (tabAddingArgs) {
                if (!tabAddingArgs.cancel) {
                    _this.addingTabContent(items, index);
                }
            });
        }
        else {
            this.addingTabContent(items, index);
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Tab.prototype.addingTabContent = function (items, index) {
        var _this = this;
        var lastEleIndex = 0;
        this.hdrEle = select('.' + CLS_HEADER, this.element);
        if (isNOU(this.hdrEle)) {
            this.items = items;
            this.reRenderItems();
            this.bindDraggable();
        }
        else {
            var tbItems = Array.from(selectAll('.e-tab-header .' + CLS_TB_ITEM, this.element));
            var itemsCount = tbItems.length;
            if (itemsCount !== 0) {
                lastEleIndex = this.getMaxIndicesFromItems(tbItems) + 1;
            }
            if (isNOU(index)) {
                index = itemsCount - 1;
            }
            if (itemsCount < index || index < 0 || isNaN(index)) {
                return;
            }
            if (itemsCount === 0 && !isNOU(this.hdrEle)) {
                this.hdrEle.style.display = '';
            }
            if (!isNOU(this.bdrLine)) {
                this.bdrLine.classList.add(CLS_HIDDEN);
            }
            this.tbItems = select('.' + CLS_TB_ITEMS, this.getTabHeader());
            this.isAdd = true;
            var tabItems_2 = this.parseObject(items, index);
            this.isAdd = false;
            var i_1 = 0;
            var textValue_1;
            items.forEach(function (item, place) {
                textValue_1 = item.headerTemplate || item.header.text;
                if (!(isNOU(item.headerTemplate || item.header) || isNOU(textValue_1) ||
                    (textValue_1.length === 0) && !isNOU(item.header) && isNOU(item.header.iconCss))) {
                    if (tabItems_2[place]) {
                        if (isNOU(item.id)) {
                            item.id = CLS_ITEM + _this.tabId + '_' + TABITEMPREFIX + (lastEleIndex + place).toString();
                        }
                        tabItems_2[place].htmlAttributes['data-id'] = item.id;
                    }
                    _this.items.splice((index + i_1), 0, item);
                    i_1++;
                }
                if (!isNOU(item.header) && !isNOU(item.header.text) && (_this.isTemplate || _this.loadOn === 'Init')) {
                    var no = lastEleIndex + place;
                    var ele = _this.createElement('div', {
                        id: CLS_CONTENT + _this.tabId + '_' + no, className: CLS_ITEM,
                        attrs: { role: 'tabpanel', 'aria-labelledby': CLS_ITEM + '_' + no }
                    });
                    _this.cntEle.insertBefore(ele, _this.cntEle.children[(index + place)]);
                    var eleTrg = _this.getTrgContent(_this.cntEle, no.toString());
                    _this.getContent(eleTrg, item.content, 'render', index);
                }
            });
            this.tbObj.addItems(tabItems_2, index);
            if (!this.isReplace) {
                this.trigger('added', { addedItems: items });
            }
            if (this.selectedItem === index) {
                this.select(index);
            }
            else {
                this.setActiveBorder();
                this.tbItem = selectAll('.' + CLS_TB_ITEM, this.getTabHeader());
            }
            this.bindDraggable();
        }
    };
    /**
     * Removes the items in the Tab from the specified index.
     *
     * @param {number} index - Index of target item that is going to be removed.
     * @returns {void}.
     */
    Tab.prototype.removeTab = function (index) {
        var _this = this;
        var trg = selectAll('.' + CLS_TB_ITEM, this.element)[index];
        if (isNOU(trg)) {
            return;
        }
        var removeArgs = { removedItem: trg, removedIndex: index, cancel: false };
        this.trigger('removing', removeArgs, function (tabRemovingArgs) {
            if (!tabRemovingArgs.cancel) {
                var header = select('#' + CLS_ITEM + _this.tabId + '_' + _this.extIndex(trg.id), select('.' + CLS_TB_ITEMS, _this.element));
                if (!isNOU(header)) {
                    _this.clearTabTemplate(header, 'headerTemplate', CLS_TB_ITEM);
                }
                _this.tbObj.removeItems(index);
                if (_this.allowDragAndDrop && (index !== Array.prototype.indexOf.call(_this.itemIndexArray, trg.id))) {
                    index = Array.prototype.indexOf.call(_this.itemIndexArray, trg.id);
                }
                var targetEleIndex = _this.itemIndexArray.indexOf(trg.id);
                _this.items.splice(targetEleIndex, 1);
                _this.itemIndexArray.splice(targetEleIndex, 1);
                _this.refreshActiveBorder();
                var cntTrg = select('#' + CLS_CONTENT + _this.tabId + '_' + _this.extIndex(trg.id), select('.' + CLS_CONTENT, _this.element));
                if (!isNOU(cntTrg)) {
                    _this.clearTabTemplate(cntTrg, 'content', CLS_ITEM);
                    detach(cntTrg);
                }
                _this.trigger('removed', tabRemovingArgs);
                if (_this.draggableItems && _this.draggableItems.length > 0) {
                    _this.draggableItems[index].destroy();
                    _this.draggableItems[index] = null;
                    _this.draggableItems.splice(index, 1);
                }
                if (trg.classList.contains(CLS_ACTIVE)) {
                    index = (index > selectAll('.' + CLS_TB_ITEM + ':not(.' + CLS_TB_POPUP + ')', _this.element).length - 1) ? index - 1 : index;
                    _this.enableAnimation = false;
                    _this.tbItem = selectAll('.' + CLS_TB_ITEM, _this.getTabHeader());
                    index = _this.getSelectingTabIndex(index);
                    index = !isNaN(index) && index >= 0 && _this.tbItem.length > index ? index : 0;
                    var tabItem = _this.tbItem[index];
                    if (tabItem) {
                        if (tabItem.classList.contains(CLS_HIDDEN)) {
                            tabItem.classList.remove(CLS_HIDDEN);
                        }
                        var firstChild = tabItem.firstElementChild;
                        if (firstChild && firstChild.hasAttribute('aria-hidden')) {
                            firstChild.removeAttribute('aria-hidden');
                        }
                    }
                    _this.selectedItem = index;
                    _this.select(index);
                }
                else if (index !== _this.selectedItem) {
                    if (index < _this.selectedItem) {
                        index = _this.itemIndexArray.indexOf(_this.tbItem[_this.selectedItem].id);
                        _this.setProperties({ selectedItem: index > -1 ? index : _this.selectedItem }, true);
                        _this.prevIndex = _this.selectedItem;
                    }
                    _this.tbItem = selectAll('.' + CLS_TB_ITEM, _this.getTabHeader());
                }
                if (selectAll('.' + CLS_TB_ITEM, _this.element).length === 0) {
                    var cnt = select('.' + CLS_CONTENT, _this.element);
                    detach(_this.hdrEle);
                    detach(cnt);
                }
                _this.enableAnimation = true;
            }
        });
    };
    /**
     * Shows or hides the Tab that is in the specified index.
     *
     * @param {number} index - Index value of target item.
     * @param {boolean} value - Based on this Boolean value, item will be hide (true) or show (false). By default, value is true.
     * @returns {void}.
     */
    Tab.prototype.hideTab = function (index, value) {
        var items;
        var item = selectAll('.' + CLS_TB_ITEM, this.element)[index];
        if (isNOU(item)) {
            return;
        }
        if (isNOU(value)) {
            value = true;
        }
        this.bdrLine.classList.add(CLS_HIDDEN);
        if (value === true) {
            item.classList.add(CLS_HIDDEN);
            items = selectAll('.' + CLS_TB_ITEM + ':not(.' + CLS_HIDDEN + ')', this.tbItems);
            if (items.length !== 0 && item.classList.contains(CLS_ACTIVE)) {
                if (index !== 0) {
                    for (var i = index - 1; i >= 0; i--) {
                        if (!this.tbItem[i].classList.contains(CLS_HIDDEN)) {
                            this.select(i);
                            break;
                        }
                        else if (i === 0) {
                            for (var k = index + 1; k < this.tbItem.length; k++) {
                                if (!this.tbItem[k].classList.contains(CLS_HIDDEN)) {
                                    this.select(k);
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    for (var k = index + 1; k < this.tbItem.length; k++) {
                        if (!this.tbItem[k].classList.contains(CLS_HIDDEN)) {
                            this.select(k);
                            break;
                        }
                    }
                }
            }
            else if (items.length === 0) {
                this.element.classList.add(CLS_HIDDEN);
            }
        }
        else {
            this.element.classList.remove(CLS_HIDDEN);
            items = selectAll('.' + CLS_TB_ITEM + ':not(.' + CLS_HIDDEN + ')', this.tbItems);
            item.classList.remove(CLS_HIDDEN);
            if (items.length === 0) {
                this.select(index);
            }
        }
        this.setActiveBorder();
        if (!isNOU(this.items[index])) {
            this.items[index].visible = !value;
            this.dataBind();
        }
        if (!isNullOrUndefined(item.firstElementChild)) {
            item.firstElementChild.setAttribute('aria-hidden', '' + value);
        }
        if (this.overflowMode === 'Popup') {
            this.refreshOverflow();
        }
    };
    Tab.prototype.selectTab = function (args, event, isInteracted) {
        if (event === void 0) { event = null; }
        if (isInteracted === void 0) { isInteracted = false; }
        this.isInteracted = isInteracted;
        this.select(args, event);
    };
    /**
     * Specifies the index or HTMLElement to select an item from the Tab.
     *
     * @param {number | HTMLElement} args - Index or DOM element is used for selecting an item from the Tab.
     * @param {Event} event - An event which takes place in DOM.
     * @returns {void}
     */
    Tab.prototype.select = function (args, event) {
        var _this = this;
        var tabHeader = this.getTabHeader();
        this.tbItems = select('.' + CLS_TB_ITEMS, tabHeader);
        this.tbItem = selectAll('.' + CLS_TB_ITEM, tabHeader);
        this.content = select('.' + CLS_CONTENT, this.element);
        this.prevItem = this.tbItem[this.prevIndex];
        if (isNOU(this.selectedItem) || (this.selectedItem < 0) || (this.tbItem.length <= this.selectedItem) || isNaN(this.selectedItem)) {
            this.selectedItem = 0;
        }
        else {
            this.selectedID = this.extIndex(this.tbItem[this.selectedItem].id);
        }
        var trg = this.tbItem[args];
        if (isNOU(trg)) {
            this.selectedID = '0';
        }
        else {
            this.selectingID = this.extIndex(trg.id);
        }
        if (!isNOU(this.prevItem) && !this.prevItem.classList.contains(CLS_DISABLE)) {
            this.prevItem.children.item(0).setAttribute('tabindex', this.prevItem.firstElementChild.getAttribute('tabindex'));
        }
        var eventArg = {
            event: event,
            previousItem: this.prevItem,
            previousIndex: this.prevIndex,
            selectedItem: this.tbItem[this.selectedItem],
            selectedIndex: this.selectedItem,
            selectedContent: !isNOU(this.content) ?
                select('#' + CLS_CONTENT + this.tabId + '_' + this.selectedID, this.content) : null,
            selectingItem: trg,
            selectingIndex: args,
            selectingContent: !isNOU(this.content) ?
                select('#' + CLS_CONTENT + this.tabId + '_' + this.selectingID, this.content) : null,
            isSwiped: this.isSwiped,
            isInteracted: this.isInteracted,
            cancel: false
        };
        if (!this.initRender) {
            this.trigger('selecting', eventArg, function (selectArgs) {
                if (!selectArgs.cancel) {
                    _this.selectingContent(args, _this.isInteracted);
                }
            });
        }
        else {
            this.selectingContent(args, this.isInteracted);
        }
        this.isInteracted = false;
    };
    Tab.prototype.getSelectingTabIndex = function (args) {
        if (!isNOU(this.tbItem[args]) && (this.tbItem[args].classList.contains(CLS_DISABLE) ||
            this.tbItem[args].classList.contains(CLS_HIDDEN))) {
            for (var i = args + 1; i < this.items.length; i++) {
                if (this.items[i].disabled === false && this.items[i].visible === true) {
                    args = i;
                    break;
                }
                else {
                    args = 0;
                }
            }
        }
        return args;
    };
    Tab.prototype.selectingContent = function (args, isInteracted) {
        if (typeof args === 'number') {
            args = this.getSelectingTabIndex(args);
            if (this.tbItem.length > args && args >= 0 && !isNaN(args)) {
                this.prevIndex = this.selectedItem;
                this.prevItem = this.tbItem[this.prevIndex];
                if (this.tbItem[args].classList.contains(CLS_TB_POPUP) && this.reorderActiveTab) {
                    this.setActive(this.popupHandler(this.tbItem[args]), null, isInteracted);
                    if ((!isNOU(this.items) && this.items.length > 0) && this.allowDragAndDrop) {
                        this.tbItem = selectAll('.' + CLS_TB_ITEMS + ' .' + CLS_TB_ITEM, this.hdrEle);
                        var item = this.items[args];
                        this.items.splice(args, 1);
                        this.items.splice(this.tbItem.length - 1, 0, item);
                        var itemId = this.itemIndexArray[args];
                        this.itemIndexArray.splice(args, 1);
                        this.itemIndexArray.splice(this.tbItem.length - 1, 0, itemId);
                    }
                }
                else {
                    this.setActive(args, null, isInteracted);
                }
            }
            else {
                this.setActive(0, null, isInteracted);
            }
        }
        else if (args instanceof (HTMLElement)) {
            this.setActive(this.getEleIndex(args), null, isInteracted);
        }
    };
    /**
     * Gets the item index from the Tab.
     *
     * @param  {string} tabItemId - Item ID is used for getting index from the Tab.
     * @returns {number} - It returns item index.
     */
    Tab.prototype.getItemIndex = function (tabItemId) {
        var tabIndex;
        for (var i = 0; i < this.tbItem.length; i++) {
            var value = this.tbItem[i].getAttribute('data-id');
            if (tabItemId === value) {
                tabIndex = i;
                break;
            }
        }
        return tabIndex;
    };
    /**
     * Specifies the value to disable/enable the Tab component.
     * When set to `true`, the component will be disabled.
     *
     * @param  {boolean} value - Based on this Boolean value, Tab will be enabled (false) or disabled (true).
     * @returns {void}.
     */
    Tab.prototype.disable = function (value) {
        this.setCssClass(this.element, CLS_DISABLE, value);
        this.element.setAttribute('aria-disabled', '' + value);
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - It returns the persisted state.
     */
    Tab.prototype.getPersistData = function () {
        return this.addOnPersist(['selectedItem', 'actEleId']);
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    Tab.prototype.getModuleName = function () {
        return 'tab';
    };
    /**
     * Gets called when the model property changes.The data that describes the old and new values of the property that changed.
     *
     * @param  {TabModel} newProp - It contains the new value of data.
     * @param  {TabModel} oldProp - It contains the old value of data.
     * @returns {void}
     * @private
     */
    Tab.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        var sortedKeys = Object.keys(newProp).sort(function (a, b) {
            if (a === 'items')
                return -1;
            if (b === 'items')
                return 1;
            return 0;
        });
        for (var _i = 0, sortedKeys_1 = sortedKeys; _i < sortedKeys_1.length; _i++) {
            var prop = sortedKeys_1[_i];
            switch (prop) {
                case 'width':
                    setStyle(this.element, { width: formatUnit(newProp.width) });
                    break;
                case 'height':
                    setStyle(this.element, { height: formatUnit(newProp.height) });
                    this.setContentHeight(false);
                    break;
                case 'cssClass':
                    var headerEle = this.element.querySelector('.' + CLS_HEADER);
                    if (oldProp.cssClass !== '' && !isNullOrUndefined(oldProp.cssClass)) {
                        this.setCssClass(this.element, oldProp.cssClass, false);
                        this.setCssClass(this.element, newProp.cssClass, true);
                        if (!isNullOrUndefined(headerEle)) {
                            this.setCssClass(headerEle, oldProp.cssClass, false);
                            this.setCssClass(headerEle, newProp.cssClass, true);
                        }
                    }
                    else {
                        this.setCssClass(this.element, newProp.cssClass, true);
                        if (!isNullOrUndefined(headerEle)) {
                            this.setCssClass(headerEle, newProp.cssClass, true);
                        }
                    }
                    break;
                case 'items':
                    this.evalOnPropertyChangeItems(newProp, oldProp);
                    break;
                case 'showCloseButton':
                    this.setCloseButton(newProp.showCloseButton);
                    break;
                case 'reorderActiveTab':
                    this.refreshActiveTabBorder();
                    break;
                case 'selectedItem':
                    this.selectedItem = oldProp.selectedItem;
                    this.select(newProp.selectedItem);
                    break;
                case 'headerPlacement':
                    this.changeOrientation(newProp.headerPlacement);
                    break;
                case 'enableRtl':
                    this.setRTL(newProp.enableRtl);
                    break;
                case 'overflowMode':
                    this.tbObj.overflowMode = newProp.overflowMode;
                    this.tbObj.dataBind();
                    this.refreshActiveTabBorder();
                    break;
                case 'heightAdjustMode':
                    this.setContentHeight(false);
                    this.select(this.selectedItem);
                    break;
                case 'scrollStep':
                    if (this.tbObj) {
                        this.tbObj.scrollStep = this.scrollStep;
                    }
                    break;
                case 'allowDragAndDrop':
                    this.bindDraggable();
                    break;
                case 'swipeMode':
                    if (this.touchModule) {
                        this.touchModule.destroy();
                        this.touchModule = null;
                    }
                    this.bindSwipeEvents();
                    break;
                case 'dragArea':
                    if (this.allowDragAndDrop) {
                        this.draggableItems.forEach(function (item) {
                            item.dragArea = _this.dragArea;
                        });
                        this.refresh();
                    }
                    break;
            }
        }
    };
    /**
     * To refresh the active tab contents.
     *
     * @returns {void}
     */
    Tab.prototype.refreshActiveTab = function () {
        if (this.isReact && this.isTemplate) {
            this.clearTemplate();
        }
        if (!this.isTemplate) {
            if (this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE)) {
                detach(this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE).children[0]);
                detach(this.element.querySelector('.' + CLS_CONTENT).querySelector('.' + CLS_ACTIVE).children[0]);
                var item = this.items[this.selectedItem];
                var pos = (isNOU(item.header) || isNOU(item.header.iconPosition)) ? '' : item.header.iconPosition;
                var css = (isNOU(item.header) || isNOU(item.header.iconCss)) ? '' : item.header.iconCss;
                var text = item.headerTemplate || item.header.text;
                var txtWrap = this.createElement('div', { className: CLS_TEXT, attrs: { 'role': 'presentation' } });
                if (!isNOU(text.tagName)) {
                    txtWrap.appendChild(text);
                }
                else {
                    this.headerTextCompile(txtWrap, text, this.selectedItem);
                }
                var tEle = void 0;
                var icon = this.createElement('span', {
                    className: CLS_ICONS + ' ' + CLS_TAB_ICON + ' ' + CLS_ICON + '-' + pos + ' ' + css
                });
                var tConts = this.createElement('div', { className: CLS_TEXT_WRAP });
                tConts.appendChild(txtWrap);
                if ((text !== '' && text !== undefined) && css !== '') {
                    if ((pos === 'left' || pos === 'top')) {
                        tConts.insertBefore(icon, tConts.firstElementChild);
                    }
                    else {
                        tConts.appendChild(icon);
                    }
                    tEle = txtWrap;
                    this.isIconAlone = false;
                }
                else {
                    tEle = ((css === '') ? txtWrap : icon);
                    if (tEle === icon) {
                        detach(txtWrap);
                        tConts.appendChild(icon);
                        this.isIconAlone = true;
                    }
                }
                var tabIndex = isNOU(item.tabIndex) ? '-1' : item.tabIndex.toString();
                var wrapAtt = (item.disabled) ? {} : { tabIndex: tabIndex, 'data-tabindex': tabIndex, role: 'tab', 'aria-selected': 'true', 'aria-disabled': 'false' };
                tConts.appendChild(this.btnCls.cloneNode(true));
                var wraper = this.createElement('div', { className: CLS_WRAP, attrs: wrapAtt });
                wraper.appendChild(tConts);
                if (pos === 'top' || pos === 'bottom') {
                    this.element.classList.add('e-vertical-icon');
                }
                this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE).appendChild(wraper);
                var crElem = this.createElement('div');
                var cnt = item.content;
                var eleStr = void 0;
                if (typeof cnt === 'string' || isNOU(cnt.innerHTML)) {
                    if (typeof cnt === 'string' && this.enableHtmlSanitizer) {
                        cnt = SanitizeHtmlHelper.sanitize(cnt);
                    }
                    if (cnt[0] === '.' || cnt[0] === '#') {
                        if (document.querySelectorAll(cnt).length) {
                            var eleVal = document.querySelector(cnt);
                            eleStr = eleVal.outerHTML.trim();
                            crElem.appendChild(eleVal);
                            eleVal.style.display = '';
                        }
                        else {
                            this.compileElement(crElem, cnt, 'content', this.selectedItem);
                        }
                    }
                    else {
                        this.compileElement(crElem, cnt, 'content', this.selectedItem);
                    }
                }
                else {
                    crElem.appendChild(cnt);
                }
                if (!isNOU(eleStr)) {
                    if (this.templateEle.indexOf(cnt.toString()) === -1) {
                        this.templateEle.push(cnt.toString());
                    }
                }
                this.element.querySelector('.' + CLS_ITEM + '.' + CLS_ACTIVE).appendChild(crElem);
            }
        }
        else {
            var tabItems = this.element.querySelector('.' + CLS_TB_ITEMS);
            var element = this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE);
            var index = this.getIndexFromEle(element.id);
            var header = element.innerText;
            var detachContent = this.element.querySelector('.' + CLS_CONTENT).querySelector('.' + CLS_ACTIVE).children[0];
            var mainContents = detachContent.innerHTML;
            detach(element);
            detach(detachContent);
            var attr = {
                className: CLS_TB_ITEM + ' ' + CLS_TEMPLATE + ' ' + CLS_ACTIVE, id: CLS_ITEM + this.tabId + '_' + index
            };
            var txtString = this.createElement('span', {
                className: CLS_TEXT, innerHTML: header, attrs: { 'role': 'presentation' }
            }).outerHTML;
            var conte = this.createElement('div', {
                className: CLS_TEXT_WRAP, innerHTML: txtString + this.btnCls.outerHTML
            }).outerHTML;
            var tabIndex = element.firstElementChild.getAttribute('data-tabindex');
            var wrap = this.createElement('div', {
                className: CLS_WRAP, innerHTML: conte,
                attrs: { tabIndex: tabIndex, 'data-tabindex': tabIndex, role: 'tab', 'aria-controls': CLS_CONTENT + this.tabId + '_' + index, 'aria-selected': 'true', 'aria-disabled': 'false' }
            });
            tabItems.insertBefore(this.createElement('div', attr), tabItems.children[index + 1]);
            this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE).appendChild(wrap);
            var crElem = this.createElement('div', { innerHTML: mainContents });
            this.element.querySelector('.' + CLS_CONTENT).querySelector('.' + CLS_ACTIVE).appendChild(crElem);
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * To refresh the active tab indicator.
     *
     * @returns {void}
     */
    Tab.prototype.refreshActiveTabBorder = function () {
        if (this.heightAdjustMode === 'None' && this.height !== 'auto' && this.cntEle && !this.isVertical()) {
            var hdrEle = this.getTabHeader();
            setStyle(this.cntEle, { 'height': (this.element.clientHeight - hdrEle.offsetHeight) + 'px' });
        }
        var activeEle = select('.' + CLS_TB_ITEM + '.' + CLS_TB_POPUP + '.' + CLS_ACTIVE, this.element);
        if (!isNOU(activeEle) && this.reorderActiveTab) {
            this.select(this.getEleIndex(activeEle));
        }
        this.refreshActiveBorder();
    };
    __decorate([
        Collection([], TabItem)
    ], Tab.prototype, "items", void 0);
    __decorate([
        Property('100%')
    ], Tab.prototype, "width", void 0);
    __decorate([
        Property('Both')
    ], Tab.prototype, "swipeMode", void 0);
    __decorate([
        Property('auto')
    ], Tab.prototype, "height", void 0);
    __decorate([
        Property('')
    ], Tab.prototype, "cssClass", void 0);
    __decorate([
        Property(0)
    ], Tab.prototype, "selectedItem", void 0);
    __decorate([
        Property('Top')
    ], Tab.prototype, "headerPlacement", void 0);
    __decorate([
        Property('Content')
    ], Tab.prototype, "heightAdjustMode", void 0);
    __decorate([
        Property('Scrollable')
    ], Tab.prototype, "overflowMode", void 0);
    __decorate([
        Property('Demand')
    ], Tab.prototype, "loadOn", void 0);
    __decorate([
        Property(false)
    ], Tab.prototype, "enablePersistence", void 0);
    __decorate([
        Property(true)
    ], Tab.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], Tab.prototype, "showCloseButton", void 0);
    __decorate([
        Property(true)
    ], Tab.prototype, "reorderActiveTab", void 0);
    __decorate([
        Property()
    ], Tab.prototype, "scrollStep", void 0);
    __decorate([
        Property()
    ], Tab.prototype, "dragArea", void 0);
    __decorate([
        Property(false)
    ], Tab.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Property(true)
    ], Tab.prototype, "clearTemplates", void 0);
    __decorate([
        Complex({}, TabAnimationSettings)
    ], Tab.prototype, "animation", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "created", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "adding", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "added", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "selecting", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "selected", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "removing", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "removed", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "onDragStart", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "dragging", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "dragged", void 0);
    __decorate([
        Event()
    ], Tab.prototype, "destroyed", void 0);
    Tab = __decorate([
        NotifyPropertyChanges
    ], Tab);
    return Tab;
}(Component));
export { Tab };
