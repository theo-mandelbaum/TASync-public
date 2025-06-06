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
import { Component, Property, ChildProperty, NotifyPropertyChanges, isBlazor } from '@syncfusion/ej2-base';
import { Event, EventHandler, KeyboardEvents, Touch } from '@syncfusion/ej2-base';
import { Animation } from '@syncfusion/ej2-base';
import { Browser, Collection, setValue, getValue, getUniqueID, getInstance, isNullOrUndefined } from '@syncfusion/ej2-base';
import { select, selectAll, closest, detach, append, rippleEffect, isVisible, Complex, addClass, removeClass } from '@syncfusion/ej2-base';
import { ListBase } from '@syncfusion/ej2-lists';
import { getZindexPartial, calculatePosition, isCollide, fit, Popup } from '@syncfusion/ej2-popups';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { getScrollableParent } from '@syncfusion/ej2-popups';
import { HScroll } from '../common/h-scroll';
import { VScroll } from '../common/v-scroll';
import { addScrolling, destroyScroll } from '../common/menu-scroll';
var ENTER = 'enter';
var ESCAPE = 'escape';
var FOCUSED = 'e-focused';
var HEADER = 'e-menu-header';
var SELECTED = 'e-selected';
var SEPARATOR = 'e-separator';
var UPARROW = 'uparrow';
var DOWNARROW = 'downarrow';
var LEFTARROW = 'leftarrow';
var RIGHTARROW = 'rightarrow';
var HOME = 'home';
var END = 'end';
var TAB = 'tab';
var CARET = 'e-caret';
var ITEM = 'e-menu-item';
var DISABLED = 'e-disabled';
var HIDE = 'e-menu-hide';
var ICONS = 'e-icons';
var RTL = 'e-rtl';
var POPUP = 'e-menu-popup';
var TEMPLATE_PROPERTY = 'Template';
/**
 * Configures the field options of the Menu.
 */
var FieldSettings = /** @class */ (function (_super) {
    __extends(FieldSettings, _super);
    function FieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('id')
    ], FieldSettings.prototype, "itemId", void 0);
    __decorate([
        Property('parentId')
    ], FieldSettings.prototype, "parentId", void 0);
    __decorate([
        Property('text')
    ], FieldSettings.prototype, "text", void 0);
    __decorate([
        Property('iconCss')
    ], FieldSettings.prototype, "iconCss", void 0);
    __decorate([
        Property('url')
    ], FieldSettings.prototype, "url", void 0);
    __decorate([
        Property('separator')
    ], FieldSettings.prototype, "separator", void 0);
    __decorate([
        Property('items')
    ], FieldSettings.prototype, "children", void 0);
    return FieldSettings;
}(ChildProperty));
export { FieldSettings };
/**
 * Specifies menu items.
 */
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], MenuItem.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], MenuItem.prototype, "id", void 0);
    __decorate([
        Property(false)
    ], MenuItem.prototype, "separator", void 0);
    __decorate([
        Collection([], MenuItem)
    ], MenuItem.prototype, "items", void 0);
    __decorate([
        Property('')
    ], MenuItem.prototype, "text", void 0);
    __decorate([
        Property('')
    ], MenuItem.prototype, "url", void 0);
    __decorate([
        Property()
    ], MenuItem.prototype, "htmlAttributes", void 0);
    return MenuItem;
}(ChildProperty));
export { MenuItem };
/**
 * Animation configuration settings.
 */
var MenuAnimationSettings = /** @class */ (function (_super) {
    __extends(MenuAnimationSettings, _super);
    function MenuAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('SlideDown')
    ], MenuAnimationSettings.prototype, "effect", void 0);
    __decorate([
        Property(400)
    ], MenuAnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property('ease')
    ], MenuAnimationSettings.prototype, "easing", void 0);
    return MenuAnimationSettings;
}(ChildProperty));
export { MenuAnimationSettings };
/**
 * Base class for Menu and ContextMenu components.
 *
 *  @private
 */
var MenuBase = /** @class */ (function (_super) {
    __extends(MenuBase, _super);
    /**
     * Constructor for creating the widget.
     *
     * @private
     * @param {MenuBaseModel} options - Specifies the menu base model
     * @param {string | HTMLUListElement} element - Specifies the element
     */
    function MenuBase(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.navIdx = [];
        _this.animation = new Animation({});
        _this.isTapHold = false;
        _this.tempItem = [];
        _this.showSubMenuOn = 'Auto';
        _this.isAnimationNone = false;
        _this.isKBDAction = false;
        return _this;
    }
    /**
     * Initialized third party configuration settings.
     *
     * @private
     * @returns {void}
     */
    MenuBase.prototype.preRender = function () {
        if (!this.isMenu) {
            var ul = void 0;
            if (this.element.tagName === 'EJS-CONTEXTMENU') {
                ul = this.createElement('ul', {
                    id: getUniqueID(this.getModuleName()), className: 'e-control e-lib e-' + this.getModuleName()
                });
                var ejInst = getValue('ej2_instances', this.element);
                removeClass([this.element], ['e-control', 'e-lib', 'e-' + this.getModuleName()]);
                this.clonedElement = this.element;
                this.element = ul;
                setValue('ej2_instances', ejInst, this.element);
            }
            else {
                ul = this.createElement('ul', { id: getUniqueID(this.getModuleName()) });
                append([].slice.call(this.element.cloneNode(true).children), ul);
                var refEle = this.element.nextElementSibling;
                if (refEle) {
                    this.element.parentElement.insertBefore(ul, refEle);
                }
                else {
                    this.element.parentElement.appendChild(ul);
                }
                this.clonedElement = ul;
            }
            this.clonedElement.style.display = 'none';
        }
        if (this.element.tagName === 'EJS-MENU') {
            var ele = this.element;
            var ejInstance = getValue('ej2_instances', ele);
            var ul = this.createElement('ul');
            var wrapper = this.createElement('EJS-MENU', { className: 'e-' + this.getModuleName() + '-wrapper' });
            for (var idx = 0, len = ele.attributes.length; idx < len; idx++) {
                ul.setAttribute(ele.attributes[idx].nodeName, ele.attributes[idx].nodeValue);
            }
            ele.parentNode.insertBefore(wrapper, ele);
            detach(ele);
            ele = ul;
            wrapper.appendChild(ele);
            setValue('ej2_instances', ejInstance, ele);
            this.clonedElement = wrapper;
            this.element = ele;
            if (!this.element.id) {
                this.element.id = getUniqueID(this.getModuleName());
            }
        }
    };
    /**
     * Initialize the control rendering.
     *
     * @private
     * @returns {void}
     */
    MenuBase.prototype.render = function () {
        var _this = this;
        this.initialize();
        this.renderItems();
        this.wireEvents();
        this.renderComplete();
        var wrapper = this.getWrapper();
        // eslint-disable-next-line
        if (this.template && this.enableScrolling && (this.isReact || this.isAngular)) {
            requestAnimationFrame(function () {
                addScrolling(_this.createElement, wrapper, _this.element, 'hscroll', _this.enableRtl);
            });
        }
    };
    MenuBase.prototype.enableTouchScroll = function (scrollList) {
        var touchStartY = 0;
        this.touchStartFn = function (e) {
            touchStartY = e.touches[0].clientY;
        };
        this.touchMoveFn = function (e) {
            var touchEndY = e.touches[0].clientY;
            var touchDiff = touchStartY - touchEndY;
            var atTop = scrollList.scrollTop === 0;
            var atBottom = scrollList.scrollTop + scrollList.clientHeight === scrollList.scrollHeight;
            if ((atTop && touchDiff < 0) || (atBottom && touchDiff > 0)) {
                e.preventDefault();
            }
            touchStartY = touchEndY;
        };
        scrollList.addEventListener('touchstart', this.touchStartFn, { passive: false });
        scrollList.addEventListener('touchmove', this.touchMoveFn, { passive: false });
    };
    MenuBase.prototype.touchOutsideHandler = function (e) {
        var target = e.target;
        if (!closest(target, '.e-' + this.getModuleName() + '-wrapper')) {
            this.closeMenu();
        }
    };
    MenuBase.prototype.initialize = function () {
        var wrapper = this.getWrapper();
        if (!wrapper) {
            wrapper = this.createElement('div', { className: 'e-' + this.getModuleName() + '-wrapper' });
            if (this.isMenu) {
                this.element.parentElement.insertBefore(wrapper, this.element);
            }
            else {
                document.body.appendChild(wrapper);
            }
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.enableRtl) {
            wrapper.classList.add(RTL);
        }
        wrapper.appendChild(this.element);
        if (this.isMenu && this.hamburgerMode) {
            if (!this.target) {
                this.createHeaderContainer(wrapper);
            }
        }
        this.defaultOption = this.showItemOnClick;
    };
    MenuBase.prototype.renderItems = function () {
        if (!this.items.length) {
            var items = ListBase.createJsonFromElement(this.element, { fields: { child: 'items' } });
            this.setProperties({ items: items }, true);
            if (isBlazor() && !this.isMenu) {
                this.element = this.removeChildElement(this.element);
            }
            else {
                this.element.innerHTML = '';
            }
        }
        var ul = this.createItems(this.items);
        append(Array.prototype.slice.call(ul.children), this.element);
        this.element.classList.add('e-menu-parent');
        if (this.isMenu) {
            if (!this.hamburgerMode && this.element.classList.contains('e-vertical')) {
                this.setBlankIconStyle(this.element);
            }
            if (this.enableScrolling) {
                var wrapper = this.getWrapper();
                if (this.element.classList.contains('e-vertical')) {
                    addScrolling(this.createElement, wrapper, this.element, 'vscroll', this.enableRtl);
                }
                else {
                    addScrolling(this.createElement, wrapper, this.element, 'hscroll', this.enableRtl);
                }
            }
        }
        else {
            this.element.parentElement.setAttribute('role', 'dialog');
            this.element.parentElement.setAttribute('aria-label', 'context menu');
        }
    };
    MenuBase.prototype.wireEvents = function () {
        var wrapper = this.getWrapper();
        if (this.target) {
            var target = void 0;
            var targetElems = selectAll(this.target);
            for (var i = 0, len = targetElems.length; i < len; i++) {
                target = targetElems[i];
                if (this.isMenu) {
                    EventHandler.add(target, 'click', this.menuHeaderClickHandler, this);
                }
                else {
                    if (Browser.isIos) {
                        new Touch(target, { tapHold: this.touchHandler.bind(this) });
                    }
                    else {
                        EventHandler.add(target, 'contextmenu', this.cmenuHandler, this);
                    }
                }
            }
            this.targetElement = target;
            if (!this.isMenu) {
                EventHandler.add(this.targetElement, 'scroll', this.scrollHandler, this);
                for (var _i = 0, _a = getScrollableParent(this.targetElement); _i < _a.length; _i++) {
                    var parent_1 = _a[_i];
                    EventHandler.add(parent_1, 'scroll', this.scrollHandler, this);
                }
            }
        }
        if (!Browser.isDevice) {
            this.delegateMoverHandler = this.moverHandler.bind(this);
            this.delegateMouseDownHandler = this.mouseDownHandler.bind(this);
            EventHandler.add(this.isMenu ? document : wrapper, 'mouseover', this.delegateMoverHandler, this);
            EventHandler.add(document, 'mousedown', this.delegateMouseDownHandler, this);
            EventHandler.add(document, 'keydown', this.domKeyHandler, this);
            if (!this.isMenu && !this.target) {
                EventHandler.add(document, 'scroll', this.scrollHandler, this);
            }
        }
        this.delegateClickHandler = this.clickHandler.bind(this);
        EventHandler.add(document, 'click', this.delegateClickHandler, this);
        this.wireKeyboardEvent(wrapper);
        this.rippleFn = rippleEffect(wrapper, { selector: '.' + ITEM });
        if (!this.isMenu && this.enableScrolling) {
            this.enableTouchScroll(wrapper);
            document.addEventListener('touchstart', this.touchOutsideHandler.bind(this), { passive: true });
        }
    };
    MenuBase.prototype.wireKeyboardEvent = function (element) {
        var keyConfigs = {
            downarrow: DOWNARROW,
            uparrow: UPARROW,
            enter: ENTER,
            leftarrow: LEFTARROW,
            rightarrow: RIGHTARROW,
            escape: ESCAPE
        };
        if (this.isMenu) {
            keyConfigs.home = HOME;
            keyConfigs.end = END;
            keyConfigs.tab = TAB;
        }
        new KeyboardEvents(element, {
            keyAction: this.keyBoardHandler.bind(this),
            keyConfigs: keyConfigs
        });
    };
    MenuBase.prototype.mouseDownHandler = function (e) {
        if (closest(e.target, '.e-' + this.getModuleName() + '-wrapper') !== this.getWrapper()
            && (!closest(e.target, '.e-' + this.getModuleName() + '-popup'))) {
            this.closeMenu(this.isMenu ? null : this.navIdx.length, e);
        }
    };
    MenuBase.prototype.keyHandler = function (e) {
        if (e.keyCode === 38 || e.keyCode === 40) {
            if (e.target && (e.target.classList.contains('e-contextmenu') || e.target.classList.contains('e-menu-item'))) {
                e.preventDefault();
            }
        }
    };
    MenuBase.prototype.domKeyHandler = function (e) {
        if (e.keyCode === 27) {
            if (this.isMenuVisible()) {
                e.stopImmediatePropagation();
            }
            e.action = ESCAPE;
            this.leftEscKeyHandler(e);
        }
    };
    MenuBase.prototype.keyBoardHandler = function (e) {
        var actionName = '';
        var trgt = e.target;
        var actionNeeded = this.isMenu && !this.hamburgerMode && !this.element.classList.contains('e-vertical')
            && this.navIdx.length < 1;
        e.preventDefault();
        if (this.enableScrolling && e.keyCode === 13 && trgt.classList.contains('e-scroll-nav')) {
            this.removeLIStateByClass([FOCUSED, SELECTED], [closest(trgt, '.e-' + this.getModuleName() + '-wrapper')]);
        }
        this.isKBDAction = true;
        if (actionNeeded) {
            switch (e.action) {
                case RIGHTARROW:
                    actionName = RIGHTARROW;
                    e.action = DOWNARROW;
                    break;
                case LEFTARROW:
                    actionName = LEFTARROW;
                    e.action = UPARROW;
                    break;
                case DOWNARROW:
                    actionName = DOWNARROW;
                    e.action = RIGHTARROW;
                    break;
                case UPARROW:
                    actionName = UPARROW;
                    e.action = '';
                    break;
            }
        }
        else if (this.enableRtl) {
            switch (e.action) {
                case LEFTARROW:
                    actionNeeded = true;
                    actionName = LEFTARROW;
                    e.action = RIGHTARROW;
                    break;
                case RIGHTARROW:
                    actionNeeded = true;
                    actionName = RIGHTARROW;
                    e.action = LEFTARROW;
                    break;
            }
        }
        switch (e.action) {
            case DOWNARROW:
            case UPARROW:
            case END:
            case HOME:
            case TAB:
                this.upDownKeyHandler(e);
                break;
            case RIGHTARROW:
                this.rightEnterKeyHandler(e);
                break;
            case LEFTARROW:
                this.leftEscKeyHandler(e);
                break;
            case ENTER:
                if (this.hamburgerMode && trgt.tagName === 'SPAN' && trgt.classList.contains('e-menu-icon')) {
                    this.menuHeaderClickHandler(e);
                }
                else {
                    this.rightEnterKeyHandler(e);
                }
                break;
        }
        if (this.isAnimationNone) {
            this.isKBDAction = false;
        }
        if (actionNeeded) {
            e.action = actionName;
        }
    };
    MenuBase.prototype.upDownKeyHandler = function (e) {
        var cul = this.getUlByNavIdx();
        var defaultIdx = (e.action === DOWNARROW || e.action === HOME || e.action === TAB) ? 0 : cul.childElementCount - 1;
        var fliIdx = defaultIdx;
        var fli = this.getLIByClass(cul, FOCUSED);
        if (fli) {
            if (e.action !== END && e.action !== HOME) {
                fliIdx = this.getIdx(cul, fli);
            }
            fli.classList.remove(FOCUSED);
            if (e.action !== END && e.action !== HOME) {
                if (e.action === DOWNARROW) {
                    fliIdx++;
                }
                else {
                    fliIdx--;
                }
                if (fliIdx === (e.action === DOWNARROW ? cul.childElementCount : -1)) {
                    fliIdx = defaultIdx;
                }
            }
        }
        var cli = cul.children[fliIdx];
        fliIdx = this.isValidLI(cli, fliIdx, e.action);
        cul.children[fliIdx].classList.add(FOCUSED);
        cul.children[fliIdx].focus();
    };
    MenuBase.prototype.isValidLI = function (cli, index, action) {
        var cul = this.getUlByNavIdx();
        var defaultIdx = (action === DOWNARROW || action === HOME || action === TAB) ? 0 : cul.childElementCount - 1;
        if (cli.classList.contains(SEPARATOR) || cli.classList.contains(DISABLED) || cli.classList.contains(HIDE)) {
            if (action === DOWNARROW && index === cul.childElementCount - 1) {
                index = defaultIdx;
            }
            else if (action === UPARROW && index === 0) {
                index = defaultIdx;
            }
            else if ((action === DOWNARROW) || (action === RIGHTARROW)) {
                index++;
            }
            else if (action === 'tab' && cli.classList.contains(SEPARATOR)) {
                index++;
            }
            else {
                index--;
            }
        }
        cli = cul.children[index];
        if (cli && (cli.classList.contains(SEPARATOR) || cli.classList.contains(DISABLED) || cli.classList.contains(HIDE))) {
            index = this.isValidLI(cli, index, action);
        }
        return index;
    };
    MenuBase.prototype.getUlByNavIdx = function (navIdxLen) {
        var _this = this;
        if (navIdxLen === void 0) { navIdxLen = this.navIdx.length; }
        if (this.isMenu) {
            var popup = [this.getWrapper()].concat([].slice.call(selectAll('.' + POPUP)))[navIdxLen];
            var popups_1 = [];
            var allPopup = selectAll('.' + POPUP);
            allPopup.forEach(function (elem) {
                if (_this.element.id === elem.id.split('-')[2] || elem.id.split('-')[2] + '-' + elem.id.split('-')[3]) {
                    popups_1.push(elem);
                }
            });
            popup = [this.getWrapper()].concat([].slice.call(popups_1))[navIdxLen];
            return isNullOrUndefined(popup) ? null : select('.e-menu-parent', popup);
        }
        else {
            if (!document.body.contains(this.element) && navIdxLen === 0) {
                return null;
            }
            return this.getWrapper().children[navIdxLen];
        }
    };
    MenuBase.prototype.rightEnterKeyHandler = function (e) {
        var eventArgs;
        var cul = this.getUlByNavIdx();
        var fli = this.getLIByClass(cul, FOCUSED);
        if (fli) {
            var fliIdx = this.getIdx(cul, fli);
            var navIdx = this.navIdx.concat(fliIdx);
            var item = this.getItem(navIdx);
            if (item.items.length) {
                this.navIdx.push(fliIdx);
                this.keyType = 'right';
                this.action = e.action;
                this.openMenu(fli, item, -1, -1, e);
            }
            else {
                if (e.action === ENTER) {
                    if (this.isMenu && this.navIdx.length === 0) {
                        this.removeLIStateByClass([SELECTED], [this.getWrapper()]);
                    }
                    else {
                        fli.classList.remove(FOCUSED);
                    }
                    fli.classList.add(SELECTED);
                    eventArgs = { element: fli, item: item, event: e };
                    this.trigger('select', eventArgs);
                    var aEle = fli.querySelector('.e-menu-url');
                    if (item.url && aEle) {
                        switch (aEle.getAttribute('target')) {
                            case '_blank':
                                window.open(item.url, '_blank');
                                break;
                            case '_parent':
                                window.parent.location.href = item.url;
                                break;
                            default:
                                window.location.href = item.url;
                        }
                    }
                    this.closeMenu(null, e);
                    var sli = this.getLIByClass(this.getUlByNavIdx(), SELECTED);
                    if (sli) {
                        sli.classList.add(FOCUSED);
                        sli.focus();
                    }
                }
            }
        }
    };
    MenuBase.prototype.leftEscKeyHandler = function (e) {
        if (this.navIdx.length) {
            this.keyType = 'left';
            this.closeMenu(this.navIdx.length, e);
        }
        else {
            if (e.action === ESCAPE) {
                this.closeMenu(null, e);
            }
        }
    };
    MenuBase.prototype.scrollHandler = function (e) {
        this.closeMenu(null, e);
    };
    MenuBase.prototype.touchHandler = function (e) {
        this.isTapHold = true;
        this.cmenuHandler(e.originalEvent);
    };
    MenuBase.prototype.cmenuHandler = function (e) {
        e.preventDefault();
        this.currentTarget = e.target;
        this.isCMenu = true;
        this.pageX = e.changedTouches ? e.changedTouches[0].pageX + 1 : e.pageX + 1;
        this.pageY = e.changedTouches ? e.changedTouches[0].pageY + 1 : e.pageY + 1;
        this.closeMenu(null, e);
        if (this.isCMenu) {
            if (this.canOpen(e.target)) {
                this.openMenu(null, null, this.pageY, this.pageX, e);
            }
            this.isCMenu = false;
        }
    };
    // eslint:disable-next-line:max-func-body-length
    MenuBase.prototype.closeMenu = function (ulIndex, e, isIterated) {
        var _this = this;
        if (ulIndex === void 0) { ulIndex = 0; }
        if (e === void 0) { e = null; }
        if (this.isMenuVisible()) {
            var sli = void 0;
            var item_1;
            var wrapper_1 = this.getWrapper();
            var beforeCloseArgs = void 0;
            var items_1;
            var popups = this.getPopups();
            var isClose = false;
            var cnt = this.isMenu ? popups.length + 1 : wrapper_1.childElementCount;
            var ul_1 = this.isMenu && cnt !== 1 ? select('.e-ul', popups[cnt - 2])
                : selectAll('.e-menu-parent', wrapper_1)[cnt - 1];
            if (this.isMenu && ul_1.classList.contains('e-menu')) {
                sli = this.getLIByClass(ul_1, SELECTED);
                if (sli) {
                    sli.classList.remove(SELECTED);
                }
                isClose = true;
            }
            if (!isClose) {
                var liElem_1 = e && e.target && this.getLI(e.target);
                if (liElem_1) {
                    this.cli = liElem_1;
                }
                else {
                    this.cli = ul_1.children[0];
                }
                item_1 = this.navIdx.length ? this.getItem(this.navIdx) : null;
                items_1 = item_1 ? item_1.items : this.items;
                beforeCloseArgs = { element: ul_1, parentItem: item_1, items: items_1, event: e, cancel: false, isFocused: true };
                this.trigger('beforeClose', beforeCloseArgs, function (observedCloseArgs) {
                    var popupEle;
                    var closeArgs;
                    var popupId = '';
                    var popupObj;
                    var isOpen = !observedCloseArgs.cancel;
                    if (isOpen || _this.isCMenu) {
                        if (_this.isMenu) {
                            popupEle = closest(ul_1, '.' + POPUP);
                            if (_this.hamburgerMode) {
                                popupEle.parentElement.style.minHeight = '';
                                closest(ul_1, '.e-menu-item').setAttribute('aria-expanded', 'false');
                            }
                            _this.unWireKeyboardEvent(popupEle);
                            destroyScroll(getInstance(popupEle.children[0], VScroll), popupEle.children[0]);
                            popupObj = getInstance(popupEle, Popup);
                            popupObj.hide();
                            popupId = popupEle.id;
                            popupObj.destroy();
                            detach(popupEle);
                        }
                        else {
                            _this.isContextMenuClosed = false;
                            _this.toggleAnimation(ul_1, false);
                        }
                        closeArgs = { element: ul_1, parentItem: item_1, items: items_1 };
                        _this.trigger('onClose', closeArgs);
                        _this.navIdx.pop();
                        if (_this.navIdx.length === 0 && e && e.type === 'keyup') {
                            _this.showSubMenu = false;
                        }
                        if (!_this.isMenu) {
                            EventHandler.remove(ul_1, 'keydown', _this.keyHandler);
                            if (_this.keyType === 'right') {
                                _this.keyType = '';
                            }
                        }
                    }
                    _this.updateReactTemplate();
                    var trgtliId;
                    var closedLi;
                    var trgtLi;
                    var trgtpopUp = _this.getWrapper() && _this.getUlByNavIdx();
                    if (_this.isCMenu) {
                        if (_this.canOpen(e.target)) {
                            _this.openMenu(null, null, _this.pageY, _this.pageX, e);
                        }
                        _this.isCMenu = false;
                    }
                    if (_this.isMenu && trgtpopUp && popupId.length) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var regExp = RegExp;
                        trgtliId = new regExp('(.*)-ej2menu-' + _this.element.id + '-popup').exec(popupId)[1];
                        closedLi = trgtpopUp.querySelector('[id="' + trgtliId + '"]');
                        trgtLi = (liElem_1 && trgtpopUp.querySelector('[id="' + liElem_1.id + '"]'));
                    }
                    else if (trgtpopUp) {
                        closedLi = trgtpopUp.querySelector('.e-menu-item.e-selected');
                        trgtLi = (liElem_1 && trgtpopUp.querySelector('[id="' + liElem_1.id + '"]'));
                    }
                    var submenus = liElem_1 && liElem_1.querySelectorAll('.e-menu-item');
                    if (isOpen && _this.hamburgerMode && ulIndex && !(submenus.length)) {
                        _this.afterCloseMenu(e);
                    }
                    else if (isOpen && !_this.hamburgerMode && closedLi && !trgtLi && _this.keyType !== 'left' && (_this.navIdx.length || !_this.isMenu && _this.navIdx.length === 0)) {
                        var ele = (e && e.target.classList && (e.target.classList.contains('e-vscroll') || e.target.classList.contains('e-scroll-nav')))
                            ? closest(e.target, '.e-menu-wrapper') : null;
                        if (ele) {
                            ele = ele.querySelector('.e-menu-item');
                            if (_this.showItemOnClick || (ele && _this.getIndex(ele.id, true).length <= _this.navIdx.length)) {
                                _this.closeMenu(_this.navIdx[_this.navIdx.length - 1], e, true);
                            }
                        }
                        else {
                            if (!(e && e.target.classList && e.target.classList.contains('e-nav-arrow'))) {
                                _this.closeMenu(_this.navIdx[_this.navIdx.length - 1], e);
                            }
                        }
                    }
                    else if (isOpen && !isIterated && !ulIndex && ((_this.hamburgerMode && _this.navIdx.length) ||
                        _this.navIdx.length === 1 && liElem_1 && trgtpopUp !== liElem_1.parentElement)) {
                        _this.closeMenu(null, e);
                    }
                    else if (isOpen && isNullOrUndefined(ulIndex) && _this.navIdx.length) {
                        _this.closeMenu(null, e);
                    }
                    else if (isOpen && !_this.isMenu && !ulIndex && _this.navIdx.length === 0 &&
                        !_this.isMenusClosed && !_this.isCmenuHover) {
                        _this.isMenusClosed = true;
                        _this.closeMenu(0, e);
                    }
                    else if (isOpen && _this.isMenu && e && e.target &&
                        _this.navIdx.length !== 0 && closest(e.target, '.e-menu-parent.e-control')) {
                        _this.closeMenu(0, e);
                    }
                    else if (isOpen && !_this.isMenu && selectAll('.e-menu-parent', wrapper_1)[ulIndex - 1] && e.which === 3) {
                        _this.closeMenu(null, e);
                    }
                    else {
                        if (isOpen && (_this.keyType === 'right' || _this.keyType === 'click')) {
                            _this.afterCloseMenu(e);
                        }
                        else {
                            var cul = _this.getUlByNavIdx();
                            var sli_1 = _this.getLIByClass(cul, SELECTED);
                            if (sli_1) {
                                sli_1.setAttribute('aria-expanded', 'false');
                                sli_1.classList.remove(SELECTED);
                                if (observedCloseArgs.isFocused && liElem_1 || _this.keyType === 'left') {
                                    sli_1.classList.add(FOCUSED);
                                    if (!e.target || !e.target.classList.contains('e-edit-template')) {
                                        sli_1.focus();
                                    }
                                }
                            }
                            if (!isOpen && _this.hamburgerMode && liElem_1 && liElem_1.getAttribute('aria-expanded') === 'false' &&
                                liElem_1.getAttribute('aria-haspopup') === 'true') {
                                if (closest(liElem_1, '.e-menu-parent.e-control')) {
                                    _this.navIdx = [];
                                }
                                else {
                                    _this.navIdx.pop();
                                }
                                _this.navIdx.push(_this.cliIdx);
                                var item_2 = _this.getItem(_this.navIdx);
                                liElem_1.setAttribute('aria-expanded', 'true');
                                _this.openMenu(liElem_1, item_2, -1, -1, e);
                            }
                        }
                        if (_this.navIdx.length < 1) {
                            if (_this.showSubMenuOn === 'Hover' || _this.showSubMenuOn === 'Click') {
                                _this.showItemOnClick = _this.defaultOption;
                                _this.showSubMenuOn = 'Auto';
                            }
                        }
                    }
                    _this.removeStateWrapper();
                });
            }
        }
    };
    MenuBase.prototype.updateReactTemplate = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact && this.template && this.navIdx.length === 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var portals = void 0;
            if (this.portals) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                portals = this.portals.splice(0, this.items.length);
            }
            this.clearTemplate(['template']);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.portals = portals;
            this.renderReactTemplates();
        }
    };
    MenuBase.prototype.getMenuItemModel = function (item, level) {
        if (isNullOrUndefined(item)) {
            return null;
        }
        if (isNullOrUndefined(level)) {
            level = 0;
        }
        var fields = this.getFields(level);
        return { text: item[fields.text], id: item[fields.id], items: item[fields.child], separator: item[fields.separator],
            iconCss: item[fields.iconCss], url: item[fields.url] };
    };
    MenuBase.prototype.getPopups = function () {
        var _this = this;
        var popups = [];
        [].slice.call(document.querySelectorAll('.' + POPUP)).forEach(function (elem) {
            if (!isNullOrUndefined(elem.querySelector('.' + ITEM)) && _this.getIndex(elem.querySelector('.' + ITEM).id, true).length) {
                popups.push(elem);
            }
        });
        return popups;
    };
    MenuBase.prototype.isMenuVisible = function () {
        return (this.navIdx.length > 0 || (this.element.classList.contains('e-contextmenu') && isVisible(this.element).valueOf()));
    };
    MenuBase.prototype.canOpen = function (target) {
        var canOpen = true;
        if (this.filter) {
            canOpen = false;
            var filter = this.filter.split(' ');
            for (var i = 0, len = filter.length; i < len; i++) {
                if (closest(target, '.' + filter[i])) {
                    canOpen = true;
                    break;
                }
            }
        }
        return canOpen;
    };
    MenuBase.prototype.openMenu = function (li, item, top, left, e, target) {
        var _this = this;
        if (top === void 0) { top = 0; }
        if (left === void 0) { left = 0; }
        if (e === void 0) { e = null; }
        if (target === void 0) { target = this.targetElement; }
        var wrapper = this.getWrapper();
        this.lItem = li;
        var elemId = this.element.id !== '' ? this.element.id : 'menu';
        this.isMenusClosed = false;
        if (isNullOrUndefined(top)) {
            top = -1;
        }
        if (isNullOrUndefined(left)) {
            left = -1;
        }
        if (li) {
            this.uList = this.createItems(item[this.getField('children', this.navIdx.length - 1)]);
            if (!this.isMenu && Browser.isDevice) {
                wrapper.lastChild.style.display = 'none';
                var data = {
                    text: item[this.getField('text')].toString(), iconCss: ICONS + ' e-previous'
                };
                if (this.template) {
                    item.iconCss = (item.iconCss || '') + ICONS + ' e-previous';
                }
                var hdata = new MenuItem(this.items[0], 'items', this.template ? item : data, true);
                var hli = this.createItems([hdata]).children[0];
                hli.classList.add(HEADER);
                this.uList.insertBefore(hli, this.uList.children[0]);
            }
            if (this.isMenu) {
                this.popupWrapper = this.createElement('div', {
                    className: 'e-' + this.getModuleName() + '-wrapper ' + POPUP, id: li.id + '-ej2menu-' + elemId + '-popup'
                });
                this.popupWrapper.setAttribute('role', 'navigation');
                this.popupWrapper.setAttribute('aria-label', item.text + '-menu-popup');
                if (this.hamburgerMode) {
                    top = li.offsetHeight;
                    li.appendChild(this.popupWrapper);
                }
                else {
                    document.body.appendChild(this.popupWrapper);
                }
                this.isNestedOrVertical = this.element.classList.contains('e-vertical') || this.navIdx.length !== 1;
                this.popupObj = this.generatePopup(this.popupWrapper, this.uList, li, this.isNestedOrVertical);
                if (this.template) {
                    this.renderReactTemplates();
                }
                if (this.hamburgerMode) {
                    this.calculateIndentSize(this.uList, li);
                }
                else {
                    if (this.cssClass) {
                        addClass([this.popupWrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    this.popupObj.hide();
                }
                if (!this.hamburgerMode && !this.showItemOnClick && this.hoverDelay) {
                    window.clearInterval(this.timer);
                    this.timer = window.setTimeout(function () { _this.triggerBeforeOpen(li, _this.uList, item, e, 0, 0, 'menu'); }, this.hoverDelay);
                }
                else {
                    this.triggerBeforeOpen(li, this.uList, item, e, 0, 0, 'menu');
                }
            }
            else {
                this.uList.style.zIndex = this.element.style.zIndex;
                wrapper.appendChild(this.uList);
                if (!this.showItemOnClick && this.hoverDelay) {
                    window.clearInterval(this.timer);
                    this.timer = window.setTimeout(function () { _this.triggerBeforeOpen(li, _this.uList, item, e, top, left, 'none'); }, this.hoverDelay);
                }
                else {
                    this.triggerBeforeOpen(li, this.uList, item, e, top, left, 'none');
                }
            }
        }
        else {
            this.uList = this.element;
            this.uList.style.zIndex = getZindexPartial(target ? target : this.element).toString();
            if (isNullOrUndefined(e)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var ev = document.createEvent('MouseEvents');
                ev.initEvent('click', true, false);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var targetEvent = this.copyObject(ev, {});
                targetEvent.target = targetEvent.srcElement = target;
                targetEvent.currentTarget = target;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.triggerBeforeOpen(li, this.uList, item, targetEvent, top, left, 'none');
            }
            else {
                this.triggerBeforeOpen(li, this.uList, item, e, top, left, 'none');
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MenuBase.prototype.copyObject = function (source, destination) {
        // eslint-disable-next-line guard-for-in
        for (var prop in source) {
            destination["" + prop] = source["" + prop];
        }
        return destination;
    };
    MenuBase.prototype.calculateIndentSize = function (ul, li) {
        var liStyle = getComputedStyle(li);
        var liIndent = parseInt(liStyle.textIndent, 10);
        if (this.navIdx.length < 2 && !li.classList.contains('e-blankicon')) {
            liIndent *= 2;
        }
        else {
            liIndent += (liIndent / 4);
        }
        ul.style.textIndent = liIndent + 'px';
        var blankIconElem = ul.querySelectorAll('.e-blankicon');
        if (blankIconElem && blankIconElem.length) {
            var menuIconElem = ul.querySelector('.e-menu-icon');
            var menuIconElemStyle = getComputedStyle(menuIconElem);
            var blankIconIndent = (parseInt(menuIconElemStyle.marginRight, 10) + menuIconElem.offsetWidth + liIndent);
            for (var i = 0; i < blankIconElem.length; i++) {
                blankIconElem[i].style.textIndent = blankIconIndent + 'px';
            }
        }
    };
    MenuBase.prototype.generatePopup = function (popupWrapper, ul, li, isNestedOrVertical) {
        var _this = this;
        var popupObj = new Popup(popupWrapper, {
            actionOnScroll: this.hamburgerMode ? 'none' : 'reposition',
            relateTo: li,
            collision: this.hamburgerMode ? { X: 'none', Y: 'none' } : { X: isNestedOrVertical ||
                    this.enableRtl ? 'none' : 'flip', Y: 'fit' },
            position: (isNestedOrVertical && !this.hamburgerMode) ? { X: 'right', Y: 'top' } : { X: 'left', Y: 'bottom' },
            targetType: 'relative',
            enableRtl: this.enableRtl,
            content: ul,
            open: function () {
                var scrollEle = select('.e-menu-vscroll', popupObj.element);
                if (scrollEle) {
                    scrollEle.style.height = 'inherit';
                    scrollEle.style.maxHeight = '';
                }
                var ul = select('.e-ul', popupObj.element);
                popupObj.element.style.maxHeight = '';
                ul.focus();
                _this.triggerOpen(ul);
            }
        });
        return popupObj;
    };
    MenuBase.prototype.createHeaderContainer = function (wrapper) {
        wrapper = wrapper || this.getWrapper();
        var spanElem = this.createElement('span', { className: 'e-' + this.getModuleName() + '-header' });
        var tempTitle = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(this.title) : this.title;
        var spanTitle = this.createElement('span', {
            className: 'e-' + this.getModuleName() + '-title', innerHTML: tempTitle
        });
        var spanIcon = this.createElement('span', {
            className: 'e-icons e-' + this.getModuleName() + '-icon', attrs: { 'tabindex': '0' }
        });
        spanElem.appendChild(spanTitle);
        spanElem.appendChild(spanIcon);
        wrapper.insertBefore(spanElem, this.element);
    };
    MenuBase.prototype.openHamburgerMenu = function (e) {
        if (this.hamburgerMode) {
            this.triggerBeforeOpen(null, this.element, null, e, 0, 0, 'hamburger');
        }
    };
    MenuBase.prototype.closeHamburgerMenu = function (e) {
        var _this = this;
        var beforeCloseArgs = { element: this.element, parentItem: null, event: e,
            items: this.items, cancel: false };
        this.trigger('beforeClose', beforeCloseArgs, function (observedHamburgerCloseArgs) {
            if (!observedHamburgerCloseArgs.cancel) {
                _this.closeMenu(null, e);
                _this.element.classList.add('e-hide-menu');
                _this.trigger('onClose', { element: _this.element, parentItem: null, items: _this.items });
            }
        });
    };
    MenuBase.prototype.callFit = function (element, x, y, top, left) {
        return fit(element, null, { X: x, Y: y }, { top: top, left: left });
    };
    MenuBase.prototype.triggerBeforeOpen = function (li, ul, item, e, top, left, type) {
        var _this = this;
        var items = li ? item[this.getField('children', this.navIdx.length - 1)] : this.items;
        var eventArgs = {
            element: ul, items: items, parentItem: item, event: e, cancel: false, top: top, left: left, showSubMenuOn: 'Auto'
        };
        var menuType = type;
        var observedElement;
        this.trigger('beforeOpen', eventArgs, function (observedOpenArgs) {
            switch (menuType) {
                case 'menu':
                    if (!_this.hamburgerMode) {
                        if (observedOpenArgs.showSubMenuOn !== 'Auto') {
                            _this.showItemOnClick = !_this.defaultOption;
                            _this.showSubMenuOn = observedOpenArgs.showSubMenuOn;
                        }
                        _this.top = observedOpenArgs.top;
                        _this.left = observedOpenArgs.left;
                    }
                    _this.popupWrapper.style.display = 'block';
                    if (!_this.hamburgerMode) {
                        _this.popupWrapper.style.maxHeight = _this.popupWrapper.getBoundingClientRect().height + 'px';
                        if (_this.enableScrolling) {
                            addScrolling(_this.createElement, _this.popupWrapper, _this.uList, 'vscroll', _this.enableRtl);
                        }
                        _this.checkScrollOffset(e);
                    }
                    if (!_this.hamburgerMode && !_this.left && !_this.top) {
                        _this.popupObj.refreshPosition(_this.lItem, true);
                        _this.left = parseInt(_this.popupWrapper.style.left, 10);
                        _this.top = parseInt(_this.popupWrapper.style.top, 10);
                        if (_this.enableRtl) {
                            _this.left =
                                _this.isNestedOrVertical ? _this.left - _this.popupWrapper.offsetWidth - _this.lItem.parentElement.offsetWidth + 2
                                    : _this.left - _this.popupWrapper.offsetWidth + _this.lItem.offsetWidth;
                        }
                        // eslint-disable-next-line
                        if (_this.template && (_this.isReact || _this.isAngular)) {
                            requestAnimationFrame(function () {
                                _this.collision();
                                _this.popupWrapper.style.display = '';
                            });
                        }
                        else {
                            _this.collision();
                            _this.popupWrapper.style.display = '';
                        }
                    }
                    else {
                        _this.popupObj.collision = { X: 'none', Y: 'none' };
                        _this.popupWrapper.style.display = '';
                    }
                    break;
                case 'none':
                    _this.top = observedOpenArgs.top;
                    _this.left = observedOpenArgs.left;
                    _this.isContextMenuClosed = true;
                    observedElement = observedOpenArgs.element;
                    if (_this.enableScrolling && _this.isCMenu && observedElement && observedElement.parentElement) {
                        observedElement.style.height = observedElement.parentElement.style.height;
                    }
                    break;
                case 'hamburger':
                    if (!observedOpenArgs.cancel) {
                        _this.element.classList.remove('e-hide-menu');
                        _this.triggerOpen(_this.element);
                    }
                    break;
            }
            if (menuType !== 'hamburger') {
                if (observedOpenArgs.cancel) {
                    if (_this.isMenu) {
                        _this.popupObj.destroy();
                        detach(_this.popupWrapper);
                    }
                    else if (ul.className.indexOf('e-ul') > -1) {
                        detach(ul);
                    }
                    _this.navIdx.pop();
                }
                else {
                    if (_this.isMenu) {
                        if (_this.hamburgerMode) {
                            _this.popupWrapper.style.top = _this.top + 'px';
                            _this.popupWrapper.style.left = 0 + 'px';
                            _this.toggleAnimation(_this.popupWrapper);
                        }
                        else {
                            _this.setBlankIconStyle(_this.popupWrapper);
                            _this.wireKeyboardEvent(_this.popupWrapper);
                            rippleEffect(_this.popupWrapper, { selector: '.' + ITEM });
                            _this.popupWrapper.style.left = _this.left + 'px';
                            _this.popupWrapper.style.top = _this.top + 'px';
                            var animationOptions = _this.animationSettings.effect !== 'None' ? {
                                name: _this.animationSettings.effect, duration: _this.animationSettings.duration,
                                timingFunction: _this.animationSettings.easing
                            } : null;
                            _this.popupObj.show(animationOptions, _this.lItem);
                            if (Browser.isDevice) {
                                _this.popupWrapper.style.left = _this.left + 'px';
                            }
                        }
                    }
                    else {
                        _this.setBlankIconStyle(_this.uList);
                        _this.setPosition(_this.lItem, _this.uList, _this.top, _this.left);
                        _this.toggleAnimation(_this.uList);
                    }
                }
            }
            if (_this.keyType === 'right') {
                var cul = _this.getUlByNavIdx();
                li.classList.remove(FOCUSED);
                if (_this.isMenu && _this.navIdx.length === 1) {
                    _this.removeLIStateByClass([SELECTED], [_this.getWrapper()]);
                }
                li.classList.add(SELECTED);
                if (_this.action === ENTER) {
                    var eventArgs_1 = { element: li, item: item, event: e };
                    _this.trigger('select', eventArgs_1);
                }
                li.focus();
                cul = _this.getUlByNavIdx();
                var index = _this.isValidLI(cul.children[0], 0, _this.action);
                cul.children[index].classList.add(FOCUSED);
                cul.children[index].focus();
            }
        });
    };
    MenuBase.prototype.collision = function () {
        var collide;
        collide = isCollide(this.popupWrapper, null, this.left, this.top);
        if ((this.isNestedOrVertical || this.enableRtl) && (collide.indexOf('right') > -1
            || collide.indexOf('left') > -1)) {
            this.popupObj.collision.X = 'none';
            var offWidth = closest(this.lItem, '.e-' + this.getModuleName() + '-wrapper').offsetWidth;
            this.left =
                this.enableRtl ? calculatePosition(this.lItem, this.isNestedOrVertical ? 'right' : 'left', 'top').left
                    : this.left - this.popupWrapper.offsetWidth - offWidth + 2;
        }
        collide = isCollide(this.popupWrapper, null, this.left, this.top);
        if (collide.indexOf('left') > -1 || collide.indexOf('right') > -1) {
            this.left = this.callFit(this.popupWrapper, true, false, this.top, this.left).left;
        }
        this.popupWrapper.style.left = this.left + 'px';
    };
    MenuBase.prototype.setBlankIconStyle = function (menu) {
        var blankIconList = [].slice.call(menu.getElementsByClassName('e-blankicon'));
        if (!blankIconList.length) {
            return;
        }
        var iconLi = menu.querySelector('.e-menu-item:not(.e-blankicon):not(.e-separator)');
        if (!iconLi) {
            return;
        }
        var icon = iconLi.querySelector('.e-menu-icon');
        if (!icon) {
            return;
        }
        var cssProp = this.enableRtl ? { padding: 'paddingRight', margin: 'marginLeft' } :
            { padding: 'paddingLeft', margin: 'marginRight' };
        var iconCssProps = getComputedStyle(icon);
        var iconSize = parseInt(iconCssProps.fontSize, 10);
        if (!!parseInt(iconCssProps.width, 10) && parseInt(iconCssProps.width, 10) > iconSize) {
            iconSize = parseInt(iconCssProps.width, 10);
        }
        // eslint:disable
        var size = iconSize + parseInt(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconCssProps[cssProp.margin], 10) + parseInt(getComputedStyle(iconLi)[cssProp.padding], 10) + "px";
        blankIconList.forEach(function (li) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            li.style[cssProp.padding] = size;
        });
        // eslint:enable
    };
    MenuBase.prototype.checkScrollOffset = function (e) {
        var wrapper = this.getWrapper();
        if (wrapper.children[0].classList.contains('e-menu-hscroll') && this.navIdx.length === 1) {
            var trgt = isNullOrUndefined(e) ? this.element : closest(e.target, '.' + ITEM);
            var offsetEle = select('.e-hscroll-bar', wrapper);
            if (offsetEle.scrollLeft > trgt.offsetLeft) {
                offsetEle.scrollLeft -= (offsetEle.scrollLeft - trgt.offsetLeft);
            }
            var offsetLeft = offsetEle.scrollLeft + offsetEle.offsetWidth;
            var offsetRight = trgt.offsetLeft + trgt.offsetWidth;
            if (offsetLeft < offsetRight) {
                offsetEle.scrollLeft += (offsetRight - offsetLeft);
            }
        }
    };
    MenuBase.prototype.setPosition = function (li, ul, top, left) {
        var px = 'px';
        this.toggleVisiblity(ul);
        if (ul === this.element || (left > -1 && top > -1)) {
            var collide = isCollide(ul, null, left, top);
            if (collide.indexOf('right') > -1) {
                left = left - ul.offsetWidth;
            }
            if (collide.indexOf('bottom') > -1) {
                var offset = this.callFit(ul, false, true, top, left);
                top = offset.top - 20;
                if (top < 0) {
                    var newTop = (pageYOffset + document.documentElement.clientHeight) - ul.getBoundingClientRect().height;
                    if (newTop > -1) {
                        top = newTop;
                    }
                }
            }
            collide = isCollide(ul, null, left, top);
            if (collide.indexOf('left') > -1) {
                var offset = this.callFit(ul, true, false, top, left);
                left = offset.left;
            }
        }
        else {
            if (Browser.isDevice) {
                if (!this.isMenu && this.enableScrolling) {
                    var menuScrollElement = document.querySelector('.e-menu-vscroll');
                    top = Number(menuScrollElement.style.top.replace('px', ''));
                    left = Number(menuScrollElement.style.left.replace('px', ''));
                }
                else {
                    top = Number(this.element.style.top.replace(px, ''));
                    left = Number(this.element.style.left.replace(px, ''));
                }
            }
            else {
                var x = this.enableRtl ? 'left' : 'right';
                var offset = calculatePosition(li, x, 'top');
                top = offset.top;
                left = offset.left;
                var collide = isCollide(ul, null, this.enableRtl ? left - ul.offsetWidth : left, top);
                var xCollision = collide.indexOf('left') > -1 || collide.indexOf('right') > -1;
                if (xCollision) {
                    offset = calculatePosition(li, this.enableRtl ? 'right' : 'left', 'top');
                    left = offset.left;
                }
                if (this.enableRtl || xCollision) {
                    left = (this.enableRtl && xCollision) ? left : left - ul.offsetWidth;
                }
                if (collide.indexOf('bottom') > -1 && (this.isMenu || !this.enableScrolling)) {
                    offset = this.callFit(ul, false, true, top, left);
                    top = offset.top;
                }
            }
        }
        this.toggleVisiblity(ul, false);
        if (this.isCMenu && this.enableScrolling && ul) {
            ul.style.height = '';
        }
        var wrapper = closest(this.element, '.e-' + this.getModuleName() + '-wrapper');
        if (!this.isMenu && this.enableScrolling && ul && wrapper && wrapper.offsetHeight > 0) {
            var menuVScroll = closest(ul, '.e-menu-vscroll');
            ul.style.display = 'block';
            if (menuVScroll) {
                destroyScroll(getInstance(menuVScroll, VScroll), menuVScroll);
            }
            var cmenuWidth = Math.ceil(this.getMenuWidth(ul, ul.offsetWidth, this.enableRtl));
            var cmenu = addScrolling(this.createElement, wrapper, ul, 'vscroll', this.enableRtl, wrapper.offsetHeight);
            Object.assign(cmenu.style, {
                top: top + "px",
                left: left + "px",
                width: cmenuWidth + "px",
                position: 'absolute',
                display: 'none'
            });
        }
        else {
            ul.style.top = top + px;
            ul.style.left = left + px;
        }
    };
    MenuBase.prototype.getMenuWidth = function (cmenu, width, isRtl) {
        var caretIcon = cmenu.getElementsByClassName(CARET)[0];
        if (caretIcon) {
            width += parseInt(getComputedStyle(caretIcon)[isRtl ? 'marginRight' : 'marginLeft'], 10);
        }
        return width < 120 ? 120 : width;
    };
    MenuBase.prototype.toggleVisiblity = function (ul, isVisible) {
        if (isVisible === void 0) { isVisible = true; }
        ul.style.visibility = isVisible ? 'hidden' : '';
        ul.style.display = isVisible ? 'block' : 'none';
    };
    MenuBase.prototype.createItems = function (items) {
        var _this = this;
        var level = this.navIdx ? this.navIdx.length : 0;
        var fields = this.getFields(level);
        var showIcon = this.hasField(items, this.getField('iconCss', level));
        var listBaseOptions = {
            showIcon: showIcon,
            moduleName: 'menu',
            fields: fields,
            template: this.template,
            itemNavigable: true,
            itemCreating: function (args) {
                if (!args.curData[args.fields[fields.id]]) {
                    args.curData[args.fields[fields.id]] = getUniqueID('menuitem');
                }
                if (isNullOrUndefined(args.curData.htmlAttributes)) {
                    Object.defineProperty(args.curData, 'htmlAttributes', {
                        value: {},
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                if (Browser.isIE) {
                    if (!args.curData.htmlAttributes.role) {
                        args.curData.htmlAttributes.role = 'menuitem';
                    }
                    if (!args.curData.htmlAttributes.tabindex) {
                        args.curData.htmlAttributes.tabindex = '-1';
                    }
                }
                else {
                    Object.assign(args.curData.htmlAttributes, {
                        role: args.curData.htmlAttributes.role || 'menuitem',
                        tabindex: args.curData.htmlAttributes.tabindex || '-1'
                    });
                }
                if (_this.isMenu && !args.curData[_this.getField('separator', level)]) {
                    if (!args.curData.htmlAttributes['aria-label']) {
                        args.curData.htmlAttributes['aria-label'] = args.curData[args.fields.text] ?
                            args.curData[args.fields.text] : args.curData[args.fields.id];
                    }
                }
                if (args.curData[args.fields[fields.iconCss]] === '') {
                    args.curData[args.fields[fields.iconCss]] = null;
                }
            },
            itemCreated: function (args) {
                if (args.curData[_this.getField('separator', level)]) {
                    args.item.classList.add(SEPARATOR);
                    if (!args.curData.htmlAttributes.role) {
                        args.item.setAttribute('role', 'separator');
                    }
                    if (!args.curData.htmlAttributes.ariaLabel) {
                        args.item.setAttribute('aria-label', 'separator');
                    }
                }
                if (showIcon && !args.curData[args.fields.iconCss]
                    && !args.curData[_this.getField('separator', level)]) {
                    args.item.classList.add('e-blankicon');
                }
                if (args.curData[args.fields.child]
                    && args.curData[args.fields.child].length) {
                    var span = _this.createElement('span', { className: ICONS + ' ' + CARET });
                    args.item.appendChild(span);
                    args.item.setAttribute('aria-haspopup', 'true');
                    args.item.setAttribute('aria-expanded', 'false');
                    args.item.classList.add('e-menu-caret-icon');
                }
                if (_this.isMenu && _this.template) {
                    args.item.setAttribute('id', args.curData[args.fields.id].toString());
                    args.item.removeAttribute('data-uid');
                    if (args.item.classList.contains('e-level-1')) {
                        args.item.classList.remove('e-level-1');
                    }
                    if (args.item.classList.contains('e-has-child')) {
                        args.item.classList.remove('e-has-child');
                    }
                    args.item.removeAttribute('aria-level');
                }
                var eventArgs = { item: args.curData, element: args.item };
                _this.trigger('beforeItemRender', eventArgs);
            }
        };
        this.setProperties({ 'items': this.items }, true);
        if (this.isMenu) {
            listBaseOptions.templateID = this.element.id + TEMPLATE_PROPERTY;
        }
        var ul = ListBase.createList(this.createElement, items, listBaseOptions, !this.template, this);
        ul.setAttribute('tabindex', '0');
        if (this.isMenu) {
            ul.setAttribute('role', 'menu');
        }
        else {
            ul.setAttribute('role', 'menubar');
        }
        return ul;
    };
    MenuBase.prototype.moverHandler = function (e) {
        var trgt = e.target;
        this.liTrgt = trgt;
        if (!this.isMenu) {
            this.isCmenuHover = true;
        }
        var cli = this.getLI(trgt);
        var wrapper = cli ? closest(cli, '.e-' + this.getModuleName() + '-wrapper') : this.getWrapper();
        var hdrWrapper = this.getWrapper();
        var regex = new RegExp('-ej2menu-(.*)-popup');
        var ulId;
        var isDifferentElem = false;
        if (!wrapper) {
            return;
        }
        if (wrapper.id !== '') {
            ulId = regex.exec(wrapper.id)[1];
        }
        else {
            ulId = wrapper.querySelector('ul').id;
        }
        if (ulId !== this.element.id) {
            this.removeLIStateByClass([FOCUSED, SELECTED], [this.getWrapper()]);
            if (this.navIdx.length) {
                isDifferentElem = true;
            }
            else {
                return;
            }
        }
        if (cli && closest(cli, '.e-' + this.getModuleName() + '-wrapper') && !isDifferentElem) {
            this.removeLIStateByClass([FOCUSED], this.isMenu ? [wrapper].concat(this.getPopups()) : [wrapper]);
            this.removeLIStateByClass([FOCUSED], this.isMenu ? [hdrWrapper].concat(this.getPopups()) : [hdrWrapper]);
            cli.classList.add(FOCUSED);
            if (!this.showItemOnClick) {
                this.clickHandler(e);
            }
        }
        else if (this.isMenu && this.showItemOnClick && !isDifferentElem) {
            this.removeLIStateByClass([FOCUSED], [wrapper].concat(this.getPopups()));
        }
        if (this.isMenu) {
            if (!this.showItemOnClick && (trgt.parentElement !== wrapper && !closest(trgt, '.e-' + this.getModuleName() + '-popup'))
                && (!cli || (cli && !this.getIndex(cli.id, true).length)) && this.showSubMenuOn !== 'Hover') {
                this.removeLIStateByClass([FOCUSED], [wrapper]);
                if (this.navIdx.length) {
                    this.isClosed = true;
                    this.closeMenu(null, e);
                }
            }
            else if (isDifferentElem && !this.showItemOnClick) {
                if (this.navIdx.length) {
                    this.isClosed = true;
                    this.closeMenu(null, e);
                }
            }
            if (!this.isClosed) {
                this.removeStateWrapper();
            }
            this.isClosed = false;
        }
        if (!this.isMenu) {
            this.isCmenuHover = false;
        }
    };
    MenuBase.prototype.removeStateWrapper = function () {
        if (this.liTrgt) {
            var wrapper = closest(this.liTrgt, '.e-menu-vscroll');
            if (this.liTrgt.tagName === 'DIV' && wrapper) {
                this.removeLIStateByClass([FOCUSED, SELECTED], [wrapper]);
            }
        }
    };
    MenuBase.prototype.removeLIStateByClass = function (classList, element) {
        var li;
        var _loop_1 = function (i) {
            classList.forEach(function (className) {
                li = select('.' + className, element[i]);
                if (li) {
                    li.classList.remove(className);
                }
            });
        };
        for (var i = 0; i < element.length; i++) {
            _loop_1(i);
        }
    };
    MenuBase.prototype.getField = function (propName, level) {
        if (level === void 0) { level = 0; }
        var fieldName = this.fields["" + propName];
        return typeof fieldName === 'string' ? fieldName :
            (!fieldName[level] ? fieldName[fieldName.length - 1].toString()
                : fieldName[level].toString());
    };
    MenuBase.prototype.getFields = function (level) {
        if (level === void 0) { level = 0; }
        return {
            id: this.getField('itemId', level),
            iconCss: this.getField('iconCss', level),
            text: this.getField('text', level),
            url: this.getField('url', level),
            child: this.getField('children', level),
            separator: this.getField('separator', level)
        };
    };
    MenuBase.prototype.hasField = function (items, field) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i]["" + field]) {
                return true;
            }
        }
        return false;
    };
    MenuBase.prototype.menuHeaderClickHandler = function (e) {
        var menuWrapper = closest(e.target, '.e-menu-wrapper');
        if (menuWrapper && menuWrapper.querySelector('ul.e-menu-parent').id !== this.element.id) {
            return;
        }
        if (this.element.className.indexOf('e-hide-menu') > -1) {
            this.openHamburgerMenu(e);
        }
        else {
            this.closeHamburgerMenu(e);
        }
    };
    MenuBase.prototype.clickHandler = function (e) {
        this.isTapHold = this.isTapHold ? false : this.isTapHold;
        var wrapper = this.getWrapper();
        var trgt = e.target;
        var cli = this.cli = this.getLI(trgt);
        var regex = new RegExp('-ej2menu-(.*)-popup');
        var cliWrapper = cli ? closest(cli, '.e-' + this.getModuleName() + '-wrapper') : null;
        var isInstLI = cli && cliWrapper && (this.isMenu ? this.getIndex(cli.id, true).length > 0
            : wrapper.firstElementChild.id === cliWrapper.firstElementChild.id);
        if (Browser.isDevice && this.isMenu) {
            this.removeLIStateByClass([FOCUSED], [wrapper].concat(this.getPopups()));
            this.mouseDownHandler(e);
        }
        if (cli && cliWrapper && this.isMenu) {
            var cliWrapperId = cliWrapper.id ? regex.exec(cliWrapper.id)[1] : cliWrapper.querySelector('.e-menu-parent').id;
            if (this.element.id !== cliWrapperId) {
                return;
            }
        }
        if (isInstLI && e.type === 'click' && !cli.classList.contains(HEADER)) {
            this.setLISelected(cli);
            var navIdx = this.getIndex(cli.id, true);
            var item = this.getItem(navIdx);
            var eventArgs = { element: cli, item: item, event: e };
            this.trigger('select', eventArgs);
        }
        if (isInstLI && (e.type === 'mouseover' || Browser.isDevice || this.showItemOnClick)) {
            var ul = void 0;
            if (cli.classList.contains(HEADER)) {
                ul = wrapper.children[this.navIdx.length - 1];
                this.toggleAnimation(ul);
                var sli = this.getLIByClass(ul, SELECTED);
                if (sli) {
                    sli.classList.remove(SELECTED);
                }
                var scrollMenu = this.enableScrolling && !this.isMenu ? closest(cli.parentElement, '.e-menu-vscroll') : null;
                if (scrollMenu) {
                    destroyScroll(getInstance(scrollMenu, VScroll), scrollMenu);
                }
                detach(cli.parentNode);
                this.navIdx.pop();
            }
            else {
                if (!cli.classList.contains(SEPARATOR)) {
                    this.showSubMenu = true;
                    var cul = cli.parentNode;
                    if (isNullOrUndefined(cul)) {
                        return;
                    }
                    this.cliIdx = this.getIdx(cul, cli);
                    if (this.isMenu || !Browser.isDevice) {
                        var culIdx = this.isMenu ? Array.prototype.indexOf.call([wrapper].concat(this.getPopups()), closest(cul, '.' + 'e-' + this.getModuleName() + '-wrapper'))
                            : this.getIdx(wrapper, cul);
                        if (this.navIdx[culIdx] === this.cliIdx) {
                            this.showSubMenu = false;
                        }
                        if (culIdx !== this.navIdx.length && (e.type !== 'mouseover' || this.showSubMenu)) {
                            var sli = this.getLIByClass(cul, SELECTED);
                            if (sli) {
                                sli.classList.remove(SELECTED);
                            }
                            this.isClosed = true;
                            this.keyType = 'click';
                            if (this.showItemOnClick) {
                                this.setLISelected(cli);
                                if (!this.isMenu) {
                                    this.isCmenuHover = true;
                                }
                            }
                            this.closeMenu(culIdx + 1, e);
                            if (this.showItemOnClick) {
                                this.setLISelected(cli);
                                if (!this.isMenu) {
                                    this.isCmenuHover = false;
                                }
                            }
                        }
                    }
                    if (!this.isClosed) {
                        this.afterCloseMenu(e);
                    }
                    this.isClosed = false;
                }
            }
        }
        else {
            if (trgt.tagName === 'DIV' && closest(trgt, '.e-menu-vscroll') && (this.navIdx.length || !this.isMenu && this.enableScrolling && this.navIdx.length === 0)) {
                var popupEle = this.isMenu ? closest(trgt, '.' + POPUP) : closest(trgt, '.e-menu-vscroll');
                var cIdx = this.isMenu ? Array.prototype.indexOf.call(this.getPopups(), popupEle) + 1
                    : this.getIdx(wrapper, select('ul.e-menu-parent', popupEle));
                if (cIdx < this.navIdx.length) {
                    this.closeMenu(cIdx + 1, e);
                    if (popupEle) {
                        this.removeLIStateByClass([FOCUSED, SELECTED], [popupEle]);
                    }
                }
            }
            else if (this.isMenu && this.hamburgerMode && trgt.tagName === 'SPAN'
                && trgt.classList.contains('e-menu-icon')) {
                this.menuHeaderClickHandler(e);
            }
            else {
                if (trgt.tagName !== 'UL' || (this.isMenu ? trgt.parentElement.classList.contains('e-menu-wrapper') &&
                    !this.getIndex(trgt.querySelector('.' + ITEM).id, true).length : trgt.parentElement !== wrapper)) {
                    if (!cli) {
                        this.removeLIStateByClass([SELECTED], [wrapper]);
                    }
                    if (!this.isAnimationNone && !cli || (cli && !cli.querySelector('.' + CARET))) {
                        if (navigator.platform.toUpperCase().indexOf('MAC') < 0 || (navigator.platform.toUpperCase().indexOf('MAC') >= 0 && !e.ctrlKey)) {
                            this.closeMenu(null, e);
                        }
                    }
                }
            }
        }
    };
    MenuBase.prototype.afterCloseMenu = function (e) {
        if (isNullOrUndefined(e)) {
            return;
        }
        var isHeader;
        if (this.showSubMenu) {
            if (this.showItemOnClick && this.navIdx.length === 0) {
                isHeader = closest(e.target, '.e-menu-parent.e-control');
            }
            else {
                isHeader = closest(this.element, '.e-menu-parent.e-control');
            }
            var idx = this.navIdx.concat(this.cliIdx);
            var item = this.getItem(idx);
            if (item && item[this.getField('children', idx.length - 1)] &&
                item[this.getField('children', idx.length - 1)].length) {
                if (e.type === 'mouseover' || (Browser.isDevice && this.isMenu)) {
                    this.setLISelected(this.cli);
                }
                if ((!this.hamburgerMode && isHeader) || (this.hamburgerMode && this.cli.getAttribute('aria-expanded') === 'false')) {
                    this.cli.setAttribute('aria-expanded', 'true');
                    this.navIdx.push(this.cliIdx);
                    this.openMenu(this.cli, item, null, null, e);
                }
            }
            else {
                if (e.type !== 'mouseover') {
                    this.closeMenu(null, e);
                }
            }
            if (!isHeader) {
                var cul = this.getUlByNavIdx();
                var sli = this.getLIByClass(cul, SELECTED);
                if (sli) {
                    sli.setAttribute('aria-expanded', 'false');
                    sli.classList.remove(SELECTED);
                }
            }
        }
        this.keyType = '';
    };
    MenuBase.prototype.setLISelected = function (li) {
        var sli = this.getLIByClass(li.parentElement, SELECTED);
        if (sli) {
            sli.classList.remove(SELECTED);
        }
        if (!this.isMenu) {
            li.classList.remove(FOCUSED);
        }
        li.classList.add(SELECTED);
    };
    MenuBase.prototype.getLIByClass = function (ul, classname) {
        if (ul && ul.children) {
            for (var i = 0, len = ul.children.length; i < len; i++) {
                if (ul.children[i].classList.contains(classname)) {
                    return ul.children[i];
                }
            }
        }
        return null;
    };
    /**
     * This method is used to get the index of the menu item in the Menu based on the argument.
     *
     * @param {MenuItem | string} item - item be passed to get the index | id to be passed to get the item index.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.getItemIndex = function (item, isUniqueId) {
        var idx;
        if (typeof item === 'string') {
            idx = item;
        }
        else {
            idx = item.id;
        }
        var isText = (isUniqueId === false) ? false : true;
        var navIdx = this.getIndex(idx, isText);
        return navIdx;
    };
    /**
     * This method is used to set the menu item in the Menu based on the argument.
     *
     * @param {MenuItem} item - item need to be updated.
     * @param {string} id - id / text to be passed to update the item.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.setItem = function (item, id, isUniqueId) {
        var idx;
        if (isUniqueId) {
            idx = id ? id : item.id;
        }
        else {
            idx = id ? id : item.text;
        }
        var navIdx = this.getIndex(idx, isUniqueId);
        var newItem = this.getItem(navIdx);
        Object.assign(newItem, item);
    };
    MenuBase.prototype.getItem = function (navIdx) {
        navIdx = navIdx.slice();
        var idx = navIdx.pop();
        var items = this.getItems(navIdx);
        return items[idx];
    };
    MenuBase.prototype.getItems = function (navIdx) {
        var items = this.items;
        for (var i = 0; i < navIdx.length; i++) {
            items = items[navIdx[i]][this.getField('children', i)];
        }
        return items;
    };
    MenuBase.prototype.setItems = function (newItems, navIdx) {
        var items = this.getItems(navIdx);
        items.splice(0, items.length);
        for (var i = 0; i < newItems.length; i++) {
            items.splice(i, 0, newItems[i]);
        }
    };
    MenuBase.prototype.getIdx = function (ul, li, skipHdr) {
        if (skipHdr === void 0) { skipHdr = true; }
        var ulElem = !this.isMenu && this.enableScrolling && select('.e-menu-vscroll', ul)
            ? selectAll('.e-menu-parent', ul) : Array.from(ul.children);
        var idx = Array.prototype.indexOf.call(ulElem, li);
        if (skipHdr && ul.children[0].classList.contains(HEADER)) {
            idx--;
        }
        return idx;
    };
    MenuBase.prototype.getLI = function (elem) {
        if (elem.tagName === 'LI' && elem.classList.contains('e-menu-item')) {
            return elem;
        }
        return closest(elem, 'li.e-menu-item');
    };
    MenuBase.prototype.updateItemsByNavIdx = function () {
        var items = this.items;
        var count = 0;
        for (var index = 0; index < this.navIdx.length; index++) {
            items = items[index].items;
            if (!items) {
                break;
            }
            count++;
            var ul = this.getUlByNavIdx(count);
            if (!ul) {
                break;
            }
            this.updateItem(ul, items);
        }
    };
    MenuBase.prototype.removeChildElement = function (elem) {
        while (elem.firstElementChild) {
            elem.removeChild(elem.firstElementChild);
        }
        return elem;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {MenuBaseModel} newProp - Specifies the new properties
     * @param {MenuBaseModel} oldProp - Specifies the old properties
     * @returns {void}
     */
    MenuBase.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        var wrapper = this.getWrapper();
        var _loop_2 = function (prop) {
            switch (prop) {
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([wrapper], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([wrapper], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'enableRtl':
                    if (this_1.enableRtl) {
                        wrapper.classList.add(RTL);
                    }
                    else {
                        wrapper.classList.remove(RTL);
                    }
                    break;
                case 'showItemOnClick':
                    this_1.unWireEvents();
                    this_1.showItemOnClick = newProp.showItemOnClick;
                    this_1.wireEvents();
                    break;
                case 'enableScrolling':
                    if (newProp.enableScrolling) {
                        var ul_2;
                        if (this_1.element.classList.contains('e-vertical')) {
                            addScrolling(this_1.createElement, wrapper, this_1.element, 'vscroll', this_1.enableRtl);
                        }
                        else {
                            addScrolling(this_1.createElement, wrapper, this_1.element, 'hscroll', this_1.enableRtl);
                        }
                        this_1.getPopups().forEach(function (wrapper) {
                            ul_2 = select('.e-ul', wrapper);
                            addScrolling(_this.createElement, wrapper, ul_2, 'vscroll', _this.enableRtl);
                        });
                    }
                    else {
                        var ul_3 = wrapper.children[0];
                        if (this_1.element.classList.contains('e-vertical') || !this_1.isMenu) {
                            destroyScroll(getInstance(ul_3, VScroll), ul_3);
                        }
                        else {
                            destroyScroll(getInstance(ul_3, HScroll), ul_3);
                        }
                        wrapper.style.overflow = '';
                        wrapper.appendChild(this_1.element);
                        this_1.getPopups().forEach(function (wrapper) {
                            ul_3 = wrapper.children[0];
                            destroyScroll(getInstance(ul_3, VScroll), ul_3);
                            wrapper.style.overflow = '';
                        });
                    }
                    break;
                case 'items': {
                    var idx = void 0;
                    var navIdx = void 0;
                    var item = void 0;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (this_1.isReact && this_1.template) {
                        this_1.clearTemplate(['template']);
                    }
                    if (!Object.keys(oldProp.items).length) {
                        this_1.updateItem(this_1.element, this_1.items);
                        if (this_1.enableScrolling && this_1.element.parentElement.classList.contains('e-custom-scroll')) {
                            if (this_1.element.classList.contains('e-vertical')) {
                                addScrolling(this_1.createElement, wrapper, this_1.element, 'vscroll', this_1.enableRtl);
                            }
                            else {
                                addScrolling(this_1.createElement, wrapper, this_1.element, 'hscroll', this_1.enableRtl);
                            }
                        }
                        if (!this_1.hamburgerMode) {
                            for (var i = 1, count = wrapper.childElementCount; i < count; i++) {
                                detach(wrapper.lastElementChild);
                            }
                        }
                        this_1.navIdx = [];
                    }
                    else {
                        var keys = Object.keys(newProp.items);
                        for (var i = 0; i < keys.length; i++) {
                            navIdx = this_1.getChangedItemIndex(newProp, [], Number(keys[i]));
                            if (navIdx.length <= this_1.getWrapper().children.length) {
                                idx = navIdx.pop();
                                item = this_1.getItems(navIdx);
                                this_1.insertAfter([item[idx]], item[idx].text);
                                this_1.removeItem(item, navIdx, idx);
                                this_1.setItems(item, navIdx);
                            }
                            navIdx.length = 0;
                        }
                    }
                    break;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            _loop_2(prop);
        }
    };
    MenuBase.prototype.updateItem = function (ul, items) {
        if (isBlazor() && !this.isMenu) {
            ul = this.removeChildElement(ul);
        }
        else {
            if (this.enableScrolling) {
                var wrapper1 = this.getWrapper();
                var ul1 = wrapper1.children[0];
                if (this.element.classList.contains('e-vertical')) {
                    destroyScroll(getInstance(ul1, VScroll), ul1);
                }
                else {
                    destroyScroll(getInstance(ul1, HScroll), ul1);
                }
            }
            ul.innerHTML = '';
        }
        var lis = [].slice.call(this.createItems(items).children);
        lis.forEach(function (li) {
            ul.appendChild(li);
        });
    };
    MenuBase.prototype.getChangedItemIndex = function (newProp, index, idx) {
        index.push(idx);
        var key = Object.keys(newProp.items[idx]).pop();
        if (key === 'items') {
            var item = newProp.items[idx];
            var popStr = Object.keys(item.items).pop();
            if (popStr) {
                this.getChangedItemIndex(item, index, Number(popStr));
            }
        }
        else {
            if (key === 'isParentArray' && index.length > 1) {
                index.pop();
            }
        }
        return index;
    };
    MenuBase.prototype.removeItem = function (item, navIdx, idx) {
        item.splice(idx, 1);
        var uls = this.getWrapper().children;
        if (navIdx.length < uls.length) {
            if (this.enableScrolling && !uls[navIdx.length].classList.contains('e-menu-parent')) {
                var ul = uls[navIdx.length].querySelector('.e-menu-parent');
                detach(ul.children[idx]);
            }
            else {
                detach(uls[navIdx.length].children[idx]);
            }
        }
    };
    /**
     * Used to unwire the bind events.
     *
     * @private
     * @param {string} targetSelctor - Specifies the target selector
     * @returns {void}
     */
    MenuBase.prototype.unWireEvents = function (targetSelctor) {
        if (targetSelctor === void 0) { targetSelctor = this.target; }
        var wrapper = this.getWrapper();
        if (targetSelctor) {
            var target = void 0;
            var touchModule = void 0;
            var targetElems = selectAll(targetSelctor);
            for (var i = 0, len = targetElems.length; i < len; i++) {
                target = targetElems[i];
                if (this.isMenu) {
                    EventHandler.remove(target, 'click', this.menuHeaderClickHandler);
                }
                else {
                    if (Browser.isIos) {
                        touchModule = getInstance(target, Touch);
                        if (touchModule) {
                            touchModule.destroy();
                        }
                    }
                    else {
                        EventHandler.remove(target, 'contextmenu', this.cmenuHandler);
                    }
                }
            }
            if (!this.isMenu) {
                EventHandler.remove(this.targetElement, 'scroll', this.scrollHandler);
                for (var _i = 0, _a = getScrollableParent(this.targetElement); _i < _a.length; _i++) {
                    var parent_2 = _a[_i];
                    EventHandler.remove(parent_2, 'scroll', this.scrollHandler);
                }
            }
        }
        if (!Browser.isDevice) {
            EventHandler.remove(this.isMenu ? document : wrapper, 'mouseover', this.delegateMoverHandler);
            EventHandler.remove(document, 'mousedown', this.delegateMouseDownHandler);
            EventHandler.remove(document, 'keydown', this.domKeyHandler);
            if (!this.isMenu && !this.target) {
                EventHandler.remove(document, 'scroll', this.scrollHandler);
            }
        }
        EventHandler.remove(document, 'click', this.delegateClickHandler);
        this.unWireKeyboardEvent(wrapper);
        this.rippleFn();
        if (!this.isMenu && this.enableScrolling) {
            wrapper.removeEventListener('touchstart', this.touchStartFn);
            wrapper.removeEventListener('touchmove', this.touchMoveFn);
            document.removeEventListener('touchstart', this.touchOutsideHandler);
        }
    };
    MenuBase.prototype.unWireKeyboardEvent = function (element) {
        var keyboardModule = getInstance(element, KeyboardEvents);
        if (keyboardModule) {
            keyboardModule.destroy();
        }
    };
    MenuBase.prototype.toggleAnimation = function (ul, isMenuOpen) {
        var _this = this;
        if (isMenuOpen === void 0) { isMenuOpen = true; }
        var pUlHeight;
        var pElement;
        var animateElement = (this.enableScrolling && !this.isMenu && closest(ul, '.e-menu-vscroll'))
            ? closest(ul, '.e-menu-vscroll') : ul;
        if (this.animationSettings.effect === 'None' || !isMenuOpen) {
            if (this.hamburgerMode && ul) {
                ul.style.top = '0px';
            }
            this.isAnimationNone = this.animationSettings.effect === 'None';
            this.end(ul, isMenuOpen);
        }
        else {
            this.animation.animate(animateElement, {
                name: this.animationSettings.effect,
                duration: this.animationSettings.duration,
                timingFunction: this.animationSettings.easing,
                begin: function (options) {
                    if (_this.hamburgerMode) {
                        pElement = options.element.parentElement;
                        options.element.style.position = 'absolute';
                        if (pElement) {
                            pUlHeight = pElement.offsetHeight;
                        }
                        options.element.style.maxHeight = options.element.offsetHeight + 'px';
                        if (pElement) {
                            pElement.style.maxHeight = '';
                        }
                    }
                    else {
                        options.element.style.display = 'block';
                        options.element.style.maxHeight = _this.isMenu ? options.element.getBoundingClientRect().height + 'px' : options.element.scrollHeight + 'px';
                    }
                },
                progress: function (options) {
                    if (_this.hamburgerMode && pElement) {
                        pElement.style.minHeight = (pUlHeight + options.element.offsetHeight) + 'px';
                    }
                },
                end: function (options) {
                    if (_this.hamburgerMode) {
                        options.element.style.position = '';
                        options.element.style.maxHeight = '';
                        if (pElement) {
                            pElement.style.minHeight = '';
                        }
                        options.element.style.top = 0 + 'px';
                        options.element.children[0].focus();
                        _this.triggerOpen(options.element.children[0]);
                    }
                    else {
                        _this.end(options.element, isMenuOpen);
                    }
                    _this.isKBDAction = false;
                }
            });
        }
    };
    MenuBase.prototype.triggerOpen = function (ul) {
        var item = this.navIdx.length ? this.getItem(this.navIdx) : null;
        var eventArgs = {
            element: ul, parentItem: item, items: item ? item.items : this.items
        };
        this.trigger('onOpen', eventArgs);
        if (!this.isMenu) {
            EventHandler.add(ul, 'keydown', this.keyHandler, this);
        }
    };
    MenuBase.prototype.end = function (ul, isMenuOpen) {
        if (isMenuOpen && this.isContextMenuClosed) {
            if (this.isMenu || !Browser.isDevice || (!this.isMenu && this.isAnimationNone && Browser.isDevice)) {
                ul.style.display = 'block';
            }
            ul.style.maxHeight = '';
            var scrollMenu = this.enableScrolling && !this.isMenu ? closest(ul, '.e-menu-vscroll') : null;
            if (scrollMenu) {
                scrollMenu.style.display = 'block';
            }
            this.triggerOpen(ul);
            if (ul.querySelector('.' + FOCUSED) && this.isKBDAction) {
                ul.querySelector('.' + FOCUSED).focus();
            }
            else {
                var ele = this.getWrapper().children[this.getIdx(this.getWrapper(), ul) - 1];
                if (this.currentTarget) {
                    if (!(this.currentTarget.classList.contains('e-numerictextbox') || this.currentTarget.classList.contains('e-textbox') || this.currentTarget.tagName === 'INPUT')) {
                        if (ele && this.isKBDAction) {
                            ele.querySelector('.' + SELECTED).focus();
                        }
                        else {
                            this.element.focus();
                        }
                    }
                }
                else {
                    if (ele && this.isKBDAction) {
                        ele.querySelector('.' + SELECTED).focus();
                    }
                    else {
                        this.element.focus();
                    }
                }
            }
        }
        else {
            var scrollMenu = this.enableScrolling && !this.isMenu ? closest(ul, '.e-menu-vscroll') : null;
            if (scrollMenu) {
                destroyScroll(getInstance(scrollMenu, VScroll), scrollMenu);
            }
            if (ul === this.element) {
                var fli = this.getLIByClass(this.element, FOCUSED);
                if (fli) {
                    fli.classList.remove(FOCUSED);
                }
                var sli = this.getLIByClass(this.element, SELECTED);
                if (sli) {
                    sli.classList.remove(SELECTED);
                }
                ul.style.display = 'none';
                this.isAnimationNone = false;
            }
            else {
                detach(ul);
            }
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    MenuBase.prototype.getPersistData = function () {
        return '';
    };
    /**
     * Get wrapper element.
     *
     * @returns {Element} - Wrapper element
     * @private
     */
    MenuBase.prototype.getWrapper = function () {
        return closest(this.element, '.e-' + this.getModuleName() + '-wrapper');
    };
    MenuBase.prototype.getIndex = function (data, isUniqueId, items, nIndex, isCallBack, level) {
        if (items === void 0) { items = this.items; }
        if (nIndex === void 0) { nIndex = []; }
        if (isCallBack === void 0) { isCallBack = false; }
        if (level === void 0) { level = 0; }
        var item;
        level = isCallBack ? level + 1 : 0;
        for (var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var currentField = isUniqueId ? item[this.getField('itemId', level)] : item[this.getField('text', level)];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var itemId = (item.htmlAttributes && 'id' in item.htmlAttributes) ? item.htmlAttributes.id : currentField;
            if (itemId === data) {
                nIndex.push(i);
                break;
            }
            else if (item[this.getField('children', level)]
                && item[this.getField('children', level)].length) {
                nIndex = this.getIndex(data, isUniqueId, item[this.getField('children', level)], nIndex, true, level);
                if (nIndex[nIndex.length - 1] === -1) {
                    if (i !== len - 1) {
                        nIndex.pop();
                    }
                }
                else {
                    nIndex.unshift(i);
                    break;
                }
            }
            else {
                if (i === len - 1) {
                    nIndex.push(-1);
                }
            }
        }
        return (!isCallBack && nIndex[0] === -1) ? [] : nIndex;
    };
    /**
     * This method is used to enable or disable the menu items in the Menu based on the items and enable argument.
     *
     * @param {string[]} items - Text items that needs to be enabled/disabled.
     * @param {boolean} enable - Set `true`/`false` to enable/disable the list items.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.enableItems = function (items, enable, isUniqueId) {
        if (enable === void 0) { enable = true; }
        var ul;
        var idx;
        var navIdx;
        var disabled = DISABLED;
        var skipItem;
        for (var i = 0; i < items.length; i++) {
            navIdx = this.getIndex(items[i], isUniqueId);
            if (this.navIdx.length) {
                if (navIdx.length !== 1) {
                    skipItem = false;
                    for (var i_1 = 0, len = navIdx.length - 1; i_1 < len; i_1++) {
                        if (navIdx[i_1] !== this.navIdx[i_1]) {
                            skipItem = true;
                            break;
                        }
                    }
                    if (skipItem) {
                        continue;
                    }
                }
            }
            else {
                if (navIdx.length !== 1) {
                    continue;
                }
            }
            idx = navIdx.pop();
            ul = this.getUlByNavIdx(navIdx.length);
            if (ul && !isNullOrUndefined(idx)) {
                if (enable) {
                    if (this.isMenu) {
                        ul.children[idx].classList.remove(disabled);
                        ul.children[idx].removeAttribute('aria-disabled');
                    }
                    else {
                        if (Browser.isDevice && !ul.classList.contains('e-contextmenu')) {
                            ul.children[idx + 1].classList.remove(disabled);
                        }
                        else if (this.enableScrolling && !ul.classList.contains('e-menu-parent')) {
                            var mainUl = ul.querySelector('.e-menu-parent');
                            mainUl.children[idx].classList.remove(disabled);
                        }
                        else {
                            ul.children[idx].classList.remove(disabled);
                        }
                    }
                }
                else {
                    if (this.isMenu) {
                        ul.children[idx].classList.add(disabled);
                        ul.children[idx].setAttribute('aria-disabled', 'true');
                    }
                    else {
                        if (Browser.isDevice && !ul.classList.contains('e-contextmenu')) {
                            ul.children[idx + 1].classList.add(disabled);
                        }
                        else {
                            if (this.enableScrolling && !ul.classList.contains('e-menu-parent')) {
                                var mainUl = ul.querySelector('.e-menu-parent');
                                mainUl.children[idx].classList.add(disabled);
                            }
                            else {
                                ul.children[idx].classList.add(disabled);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * This method is used to show the menu items in the Menu based on the items text.
     *
     * @param {string[]} items - Text items that needs to be shown.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.showItems = function (items, isUniqueId) {
        this.showHideItems(items, false, isUniqueId);
    };
    /**
     * This method is used to hide the menu items in the Menu based on the items text.
     *
     * @param {string[]} items - Text items that needs to be hidden.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.hideItems = function (items, isUniqueId) {
        this.showHideItems(items, true, isUniqueId);
    };
    MenuBase.prototype.showHideItems = function (items, ishide, isUniqueId) {
        var ul;
        var index;
        var navIdx;
        var item;
        for (var i = 0; i < items.length; i++) {
            navIdx = this.getIndex(items[i], isUniqueId);
            index = navIdx.pop();
            ul = this.getUlByNavIdx(navIdx.length);
            item = this.getItems(navIdx);
            if (ul) {
                if (this.enableScrolling && !ul.classList.contains('e-menu-parent')) {
                    ul = ul.querySelector('.e-menu-parent');
                }
                var validUl = isUniqueId ? ul.children[index].id : item[index].text.toString();
                if (ishide && validUl === items[i]) {
                    ul.children[index].classList.add(HIDE);
                }
                else if (!ishide && validUl === items[i]) {
                    ul.children[index].classList.remove(HIDE);
                }
            }
        }
    };
    /**
     * It is used to remove the menu items from the Menu based on the items text.
     *
     * @param {string[]} items Text items that needs to be removed.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.removeItems = function (items, isUniqueId) {
        var idx;
        var navIdx;
        var iitems;
        for (var i = 0; i < items.length; i++) {
            navIdx = this.getIndex(items[i], isUniqueId);
            idx = navIdx.pop();
            iitems = this.getItems(navIdx);
            if (!isNullOrUndefined(idx)) {
                this.removeItem(iitems, navIdx, idx);
            }
        }
    };
    /**
     * It is used to insert the menu items after the specified menu item text.
     *
     * @param {MenuItemModel[]} items - Items that needs to be inserted.
     * @param {string} text - Text item after that the element to be inserted.
     * @param {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.insertAfter = function (items, text, isUniqueId) {
        this.insertItems(items, text, isUniqueId);
    };
    /**
     * It is used to insert the menu items before the specified menu item text.
     *
     * @param {MenuItemModel[]} items - Items that needs to be inserted.
     * @param {string} text - Text item before that the element to be inserted.
     * @param  {boolean} isUniqueId - Set `true` if it is a unique id.
     * @returns {void}
     */
    MenuBase.prototype.insertBefore = function (items, text, isUniqueId) {
        this.insertItems(items, text, isUniqueId, false);
    };
    MenuBase.prototype.insertItems = function (items, text, isUniqueId, isAfter) {
        if (isAfter === void 0) { isAfter = true; }
        var li;
        var idx;
        var navIdx;
        var iitems;
        var menuitem;
        var parentUl;
        for (var i = 0; i < items.length; i++) {
            navIdx = this.getIndex(text, isUniqueId);
            idx = navIdx.pop();
            iitems = this.getItems(navIdx);
            menuitem = new MenuItem(iitems[0], 'items', items[i], true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            menuitem.parentObj = iitems[0].parentObj;
            iitems.splice(isAfter ? idx + 1 : idx, 0, menuitem);
            var uls = this.isMenu ? [this.getWrapper()].concat(this.getPopups()) : [].slice.call(this.getWrapper().children);
            if (!isNullOrUndefined(idx) && navIdx.length < uls.length) {
                idx = isAfter ? idx + 1 : idx;
                li = this.createItems(iitems).children[idx];
                var ul = parentUl = this.isMenu ? select('.e-menu-parent', uls[navIdx.length]) : uls[navIdx.length];
                if (this.enableScrolling && !ul.classList.contains('e-menu-parent')) {
                    ul = ul.querySelector('.e-menu-parent');
                }
                ul.insertBefore(li, ul.children[idx]);
                if (i === items.length - 1 && !this.isMenu && ul.style.display === 'block') {
                    if (this.enableScrolling) {
                        this.setPosition(null, ul, parseFloat(parentUl.style.top), parseFloat(parentUl.style.left));
                        var scrollElem = closest(ul, '.e-vscroll');
                        if (scrollElem) {
                            scrollElem.style.display = 'block';
                        }
                    }
                    else {
                        this.setPosition(null, ul, parseFloat(ul.style.top), parseFloat(ul.style.left));
                        ul.style.display = 'block';
                    }
                }
            }
        }
    };
    MenuBase.prototype.removeAttributes = function () {
        var _this = this;
        ['top', 'left', 'display', 'z-index'].forEach(function (key) {
            _this.element.style.removeProperty(key);
        });
        ['role', 'tabindex', 'class', 'style'].forEach(function (key) {
            if (key === 'class' && _this.element.classList.contains('e-menu-parent')) {
                _this.element.classList.remove('e-menu-parent');
            }
            if (['class', 'style'].indexOf(key) === -1 || !_this.element.getAttribute(key)) {
                _this.element.removeAttribute(key);
            }
            if (_this.isMenu && key === 'class' && _this.element.classList.contains('e-vertical')) {
                _this.element.classList.remove('e-vertical');
            }
        });
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    MenuBase.prototype.destroy = function () {
        var wrapper = this.getWrapper();
        if (wrapper) {
            this.unWireEvents();
            if (!this.isMenu) {
                this.clonedElement.style.display = '';
                if (this.clonedElement.tagName === 'EJS-CONTEXTMENU') {
                    addClass([this.clonedElement], ['e-control', 'e-lib', 'e-' + this.getModuleName()]);
                    this.element = this.clonedElement;
                }
                else {
                    if (this.refreshing && this.clonedElement.childElementCount && this.clonedElement.children[0].tagName === 'LI') {
                        this.setProperties({ 'items': [] }, true);
                    }
                    if (document.getElementById(this.clonedElement.id)) {
                        var refEle = this.clonedElement.nextElementSibling;
                        if (refEle && refEle !== wrapper) {
                            this.clonedElement.parentElement.insertBefore(this.element, refEle);
                        }
                        else {
                            this.clonedElement.parentElement.appendChild(this.element);
                        }
                        if (isBlazor() && !this.isMenu) {
                            this.element = this.removeChildElement(this.element);
                        }
                        else {
                            this.element.innerHTML = '';
                        }
                        append([].slice.call(this.clonedElement.children), this.element);
                        detach(this.clonedElement);
                        this.removeAttributes();
                    }
                }
                this.clonedElement = null;
            }
            else {
                this.closeMenu();
                if (isBlazor() && !this.isMenu) {
                    this.element = this.removeChildElement(this.element);
                }
                else {
                    this.element.innerHTML = '';
                }
                this.removeAttributes();
                wrapper.parentNode.insertBefore(this.element, wrapper);
                this.clonedElement = null;
            }
            detach(wrapper);
            _super.prototype.destroy.call(this);
            if (this.template) {
                this.clearTemplate(['template']);
            }
        }
        this.rippleFn = null;
    };
    __decorate([
        Event()
    ], MenuBase.prototype, "beforeItemRender", void 0);
    __decorate([
        Event()
    ], MenuBase.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], MenuBase.prototype, "onOpen", void 0);
    __decorate([
        Event()
    ], MenuBase.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], MenuBase.prototype, "onClose", void 0);
    __decorate([
        Event()
    ], MenuBase.prototype, "select", void 0);
    __decorate([
        Event()
    ], MenuBase.prototype, "created", void 0);
    __decorate([
        Property('')
    ], MenuBase.prototype, "cssClass", void 0);
    __decorate([
        Property(0)
    ], MenuBase.prototype, "hoverDelay", void 0);
    __decorate([
        Property(false)
    ], MenuBase.prototype, "showItemOnClick", void 0);
    __decorate([
        Property('')
    ], MenuBase.prototype, "target", void 0);
    __decorate([
        Property('')
    ], MenuBase.prototype, "filter", void 0);
    __decorate([
        Property(null)
    ], MenuBase.prototype, "template", void 0);
    __decorate([
        Property(false)
    ], MenuBase.prototype, "enableScrolling", void 0);
    __decorate([
        Property(true)
    ], MenuBase.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Complex({ itemId: 'id', text: 'text', parentId: 'parentId', iconCss: 'iconCss', url: 'url', separator: 'separator', children: 'items' }, FieldSettings)
    ], MenuBase.prototype, "fields", void 0);
    __decorate([
        Collection([], MenuItem)
    ], MenuBase.prototype, "items", void 0);
    __decorate([
        Complex({ duration: 400, easing: 'ease', effect: 'SlideDown' }, MenuAnimationSettings)
    ], MenuBase.prototype, "animationSettings", void 0);
    MenuBase = __decorate([
        NotifyPropertyChanges
    ], MenuBase);
    return MenuBase;
}(Component));
export { MenuBase };
