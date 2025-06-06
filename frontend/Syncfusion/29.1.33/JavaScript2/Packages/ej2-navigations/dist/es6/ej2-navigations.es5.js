import { Browser, getUniqueID, Touch, EventHandler, isNullOrUndefined, selectAll, detach, classList, Property, NotifyPropertyChanges, Component, createElement, removeClass, select, ChildProperty, Collection, Animation, getValue, setValue, append, closest, addClass, isBlazor, rippleEffect, KeyboardEvents, getInstance, isVisible, SanitizeHtmlHelper, Event, Complex, formatUnit, setStyleAttribute, attributes, compile, isRippleEnabled, animationMode, remove, getRandomId, L10n, Draggable, isUndefined, getElement, Droppable, matches, extend, merge, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { ListBase } from '@syncfusion/ej2-lists';
import { getScrollableParent, Popup, getZindexPartial, fit, isCollide, calculatePosition, createSpinner, showSpinner, hideSpinner, Tooltip } from '@syncfusion/ej2-popups';
import { Button, createCheckBox, rippleMouseHandler } from '@syncfusion/ej2-buttons';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Input } from '@syncfusion/ej2-inputs';

var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CLS_ROOT = 'e-hscroll';
var CLS_RTL = 'e-rtl';
var CLS_DISABLE = 'e-overlay';
var CLS_HSCROLLBAR = 'e-hscroll-bar';
var CLS_HSCROLLCON = 'e-hscroll-content';
var CLS_NAVARROW = 'e-nav-arrow';
var CLS_NAVRIGHTARROW = 'e-nav-right-arrow';
var CLS_NAVLEFTARROW = 'e-nav-left-arrow';
var CLS_HSCROLLNAV = 'e-scroll-nav';
var CLS_HSCROLLNAVRIGHT = 'e-scroll-right-nav';
var CLS_HSCROLLNAVLEFT = 'e-scroll-left-nav';
var CLS_DEVICE = 'e-scroll-device';
var CLS_OVERLAY = 'e-scroll-overlay';
var CLS_RIGHTOVERLAY = 'e-scroll-right-overlay';
var CLS_LEFTOVERLAY = 'e-scroll-left-overlay';
var OVERLAY_MAXWID = 40;
/**
 * HScroll module is introduces horizontal scroller when content exceeds the current viewing area.
 * It can be useful for the components like Toolbar, Tab which needs horizontal scrolling alone.
 * Hidden content can be view by touch moving or icon click.
 * ```html
 * <div id="scroll"/>
 * <script>
 *   var scrollObj = new HScroll();
 *   scrollObj.appendTo("#scroll");
 * </script>
 * ```
 */
var HScroll = /** @class */ (function (_super) {
    __extends(HScroll, _super);
    /**
     * Initializes a new instance of the HScroll class.
     *
     * @param {HScrollModel} options  - Specifies HScroll model properties as options.
     * @param {string | HTMLElement} element  - Specifies the element for which horizontal scrolling applies.
     */
    function HScroll(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    HScroll.prototype.preRender = function () {
        this.browser = Browser.info.name;
        this.browserCheck = this.browser === 'mozilla';
        this.isDevice = Browser.isDevice;
        this.customStep = true;
        var element = this.element;
        this.ieCheck = this.browser === 'edge' || this.browser === 'msie';
        this.initialize();
        if (element.id === '') {
            element.id = getUniqueID('hscroll');
            this.uniqueId = true;
        }
        element.style.display = 'block';
        if (this.enableRtl) {
            element.classList.add(CLS_RTL);
        }
    };
    /**
     * To Initialize the horizontal scroll  rendering
     *
     * @private
     * @returns {void}
     */
    HScroll.prototype.render = function () {
        this.touchModule = new Touch(this.element, { scroll: this.touchHandler.bind(this), swipe: this.swipeHandler.bind(this) });
        EventHandler.add(this.scrollEle, 'scroll', this.scrollHandler, this);
        if (!this.isDevice) {
            this.createNavIcon(this.element);
        }
        else {
            this.element.classList.add(CLS_DEVICE);
            this.createOverlay(this.element);
        }
        this.setScrollState();
    };
    HScroll.prototype.setScrollState = function () {
        if (isNullOrUndefined(this.scrollStep) || this.scrollStep < 0) {
            this.scrollStep = this.scrollEle.offsetWidth;
            this.customStep = false;
        }
        else {
            this.customStep = true;
        }
    };
    HScroll.prototype.initialize = function () {
        var scrollEle = this.createElement('div', { className: CLS_HSCROLLCON });
        var scrollDiv = this.createElement('div', { className: CLS_HSCROLLBAR });
        scrollDiv.setAttribute('tabindex', '-1');
        var ele = this.element;
        var innerEle = [].slice.call(ele.children);
        for (var _i = 0, innerEle_1 = innerEle; _i < innerEle_1.length; _i++) {
            var ele_1 = innerEle_1[_i];
            scrollEle.appendChild(ele_1);
        }
        scrollDiv.appendChild(scrollEle);
        ele.appendChild(scrollDiv);
        scrollDiv.style.overflowX = 'hidden';
        this.scrollEle = scrollDiv;
        this.scrollItems = scrollEle;
    };
    HScroll.prototype.getPersistData = function () {
        var keyEntity = ['scrollStep'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    HScroll.prototype.getModuleName = function () {
        return 'hScroll';
    };
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    HScroll.prototype.destroy = function () {
        var ele = this.element;
        ele.style.display = '';
        ele.classList.remove(CLS_ROOT);
        ele.classList.remove(CLS_DEVICE);
        ele.classList.remove(CLS_RTL);
        var nav = selectAll('.e-' + ele.id + '_nav.' + CLS_HSCROLLNAV, ele);
        var overlay = selectAll('.' + CLS_OVERLAY, ele);
        [].slice.call(overlay).forEach(function (ele) {
            detach(ele);
        });
        for (var _i = 0, _a = [].slice.call(this.scrollItems.children); _i < _a.length; _i++) {
            var elem = _a[_i];
            ele.appendChild(elem);
        }
        if (this.uniqueId) {
            this.element.removeAttribute('id');
        }
        detach(this.scrollEle);
        if (nav.length > 0) {
            detach(nav[0]);
            if (!isNullOrUndefined(nav[1])) {
                detach(nav[1]);
            }
        }
        EventHandler.remove(this.scrollEle, 'scroll', this.scrollHandler);
        this.touchModule.destroy();
        this.touchModule = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Specifies the value to disable/enable the HScroll component.
     * When set to `true` , the component will be disabled.
     *
     * @param  {boolean} value - Based on this Boolean value, HScroll will be enabled (false) or disabled (true).
     * @returns {void}.
     */
    HScroll.prototype.disable = function (value) {
        var navEles = selectAll('.e-scroll-nav:not(.' + CLS_DISABLE + ')', this.element);
        if (value) {
            this.element.classList.add(CLS_DISABLE);
        }
        else {
            this.element.classList.remove(CLS_DISABLE);
        }
        [].slice.call(navEles).forEach(function (el) {
            el.setAttribute('tabindex', !value ? '0' : '-1');
        });
    };
    HScroll.prototype.createOverlay = function (element) {
        var id = element.id.concat('_nav');
        var rightOverlayEle = this.createElement('div', { className: CLS_OVERLAY + ' ' + CLS_RIGHTOVERLAY });
        var clsRight = 'e-' + element.id.concat('_nav ' + CLS_HSCROLLNAV + ' ' + CLS_HSCROLLNAVRIGHT);
        var rightEle = this.createElement('div', { id: id.concat('_right'), className: clsRight });
        var navItem = this.createElement('div', { className: CLS_NAVRIGHTARROW + ' ' + CLS_NAVARROW + ' e-icons' });
        rightEle.appendChild(navItem);
        var leftEle = this.createElement('div', { className: CLS_OVERLAY + ' ' + CLS_LEFTOVERLAY });
        if (this.ieCheck) {
            rightEle.classList.add('e-ie-align');
        }
        element.appendChild(rightOverlayEle);
        element.appendChild(rightEle);
        element.insertBefore(leftEle, element.firstChild);
        this.eventBinding([rightEle]);
    };
    HScroll.prototype.createNavIcon = function (element) {
        var id = element.id.concat('_nav');
        var clsRight = 'e-' + element.id.concat('_nav ' + CLS_HSCROLLNAV + ' ' + CLS_HSCROLLNAVRIGHT);
        var rightAttributes = { 'role': 'button', 'id': id.concat('_right'), 'aria-label': 'Scroll right' };
        var nav = this.createElement('div', { className: clsRight, attrs: rightAttributes });
        nav.setAttribute('aria-disabled', 'false');
        var navItem = this.createElement('div', { className: CLS_NAVRIGHTARROW + ' ' + CLS_NAVARROW + ' e-icons' });
        var clsLeft = 'e-' + element.id.concat('_nav ' + CLS_HSCROLLNAV + ' ' + CLS_HSCROLLNAVLEFT);
        var leftAttributes = { 'role': 'button', 'id': id.concat('_left'), 'aria-label': 'Scroll left' };
        var navEle = this.createElement('div', { className: clsLeft + ' ' + CLS_DISABLE, attrs: leftAttributes });
        navEle.setAttribute('aria-disabled', 'true');
        var navLeftItem = this.createElement('div', { className: CLS_NAVLEFTARROW + ' ' + CLS_NAVARROW + ' e-icons' });
        navEle.appendChild(navLeftItem);
        nav.appendChild(navItem);
        element.appendChild(nav);
        element.insertBefore(navEle, element.firstChild);
        if (this.ieCheck) {
            nav.classList.add('e-ie-align');
            navEle.classList.add('e-ie-align');
        }
        this.eventBinding([nav, navEle]);
    };
    HScroll.prototype.onKeyPress = function (e) {
        var _this = this;
        if (e.key === 'Enter') {
            var timeoutFun_1 = function () {
                _this.keyTimeout = true;
                _this.eleScrolling(10, e.target, true);
            };
            this.keyTimer = window.setTimeout(function () {
                timeoutFun_1();
            }, 100);
        }
    };
    HScroll.prototype.onKeyUp = function (e) {
        if (e.key !== 'Enter') {
            return;
        }
        if (this.keyTimeout) {
            this.keyTimeout = false;
        }
        else {
            e.target.click();
        }
        clearTimeout(this.keyTimer);
    };
    HScroll.prototype.eventBinding = function (ele) {
        var _this = this;
        [].slice.call(ele).forEach(function (el) {
            new Touch(el, { tapHold: _this.tabHoldHandler.bind(_this), tapHoldThreshold: 500 });
            el.addEventListener('keydown', _this.onKeyPress.bind(_this));
            el.addEventListener('keyup', _this.onKeyUp.bind(_this));
            el.addEventListener('mouseup', _this.repeatScroll.bind(_this));
            el.addEventListener('touchend', _this.repeatScroll.bind(_this));
            el.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
            EventHandler.add(el, 'click', _this.clickEventHandler, _this);
        });
    };
    HScroll.prototype.repeatScroll = function () {
        clearInterval(this.timeout);
    };
    HScroll.prototype.tabHoldHandler = function (e) {
        var _this = this;
        var trgt = e.originalEvent.target;
        trgt = this.contains(trgt, CLS_HSCROLLNAV) ? trgt.firstElementChild : trgt;
        var scrollDis = 10;
        var timeoutFun = function () {
            _this.eleScrolling(scrollDis, trgt, true);
        };
        this.timeout = window.setInterval(function () {
            timeoutFun();
        }, 50);
    };
    HScroll.prototype.contains = function (ele, className) {
        return ele.classList.contains(className);
    };
    HScroll.prototype.eleScrolling = function (scrollDis, trgt, isContinuous) {
        var rootEle = this.element;
        var classList = trgt.classList;
        if (classList.contains(CLS_HSCROLLNAV)) {
            classList = trgt.querySelector('.' + CLS_NAVARROW).classList;
        }
        if (this.contains(rootEle, CLS_RTL) && this.browserCheck) {
            scrollDis = -scrollDis;
        }
        if ((!this.contains(rootEle, CLS_RTL) || this.browserCheck) || this.ieCheck) {
            if (classList.contains(CLS_NAVRIGHTARROW)) {
                this.frameScrollRequest(scrollDis, 'add', isContinuous);
            }
            else {
                this.frameScrollRequest(scrollDis, '', isContinuous);
            }
        }
        else {
            if (classList.contains(CLS_NAVLEFTARROW)) {
                this.frameScrollRequest(scrollDis, 'add', isContinuous);
            }
            else {
                this.frameScrollRequest(scrollDis, '', isContinuous);
            }
        }
    };
    HScroll.prototype.clickEventHandler = function (e) {
        this.eleScrolling(this.scrollStep, e.target, false);
    };
    HScroll.prototype.swipeHandler = function (e) {
        var swipeEle = this.scrollEle;
        var distance;
        if (e.velocity <= 1) {
            distance = e.distanceX / (e.velocity * 10);
        }
        else {
            distance = e.distanceX / e.velocity;
        }
        var start = 0.5;
        var animate = function () {
            var step = Math.sin(start);
            if (step <= 0) {
                window.cancelAnimationFrame(step);
            }
            else {
                if (e.swipeDirection === 'Left') {
                    swipeEle.scrollLeft += distance * step;
                }
                else if (e.swipeDirection === 'Right') {
                    swipeEle.scrollLeft -= distance * step;
                }
                start -= 0.5;
                window.requestAnimationFrame(animate);
            }
        };
        animate();
    };
    HScroll.prototype.scrollUpdating = function (scrollVal, action) {
        if (action === 'add') {
            this.scrollEle.scrollLeft += scrollVal;
        }
        else {
            this.scrollEle.scrollLeft -= scrollVal;
        }
        if (this.enableRtl && this.scrollEle.scrollLeft > 0) {
            this.scrollEle.scrollLeft = 0;
        }
    };
    HScroll.prototype.frameScrollRequest = function (scrollVal, action, isContinuous) {
        var _this = this;
        var step = 10;
        if (isContinuous) {
            this.scrollUpdating(scrollVal, action);
            return;
        }
        if (!this.customStep) {
            [].slice.call(selectAll('.' + CLS_OVERLAY, this.element)).forEach(function (el) {
                scrollVal -= el.offsetWidth;
            });
        }
        var animate = function () {
            var scrollValue;
            var scrollStep;
            if (_this.contains(_this.element, CLS_RTL) && _this.browserCheck) {
                scrollValue = -scrollVal;
                scrollStep = -step;
            }
            else {
                scrollValue = scrollVal;
                scrollStep = step;
            }
            if (scrollValue < step) {
                window.cancelAnimationFrame(scrollStep);
            }
            else {
                _this.scrollUpdating(scrollStep, action);
                scrollVal -= scrollStep;
                window.requestAnimationFrame(animate);
            }
        };
        animate();
    };
    HScroll.prototype.touchHandler = function (e) {
        var ele = this.scrollEle;
        var distance = e.distanceX;
        if ((this.ieCheck) && this.contains(this.element, CLS_RTL)) {
            distance = -distance;
        }
        if (e.scrollDirection === 'Left') {
            ele.scrollLeft = ele.scrollLeft + distance;
        }
        else if (e.scrollDirection === 'Right') {
            ele.scrollLeft = ele.scrollLeft - distance;
        }
    };
    HScroll.prototype.arrowDisabling = function (addDisable, removeDisable) {
        if (this.isDevice) {
            var arrowEle = isNullOrUndefined(addDisable) ? removeDisable : addDisable;
            var arrowIcon = arrowEle.querySelector('.' + CLS_NAVARROW);
            if (isNullOrUndefined(addDisable)) {
                classList(arrowIcon, [CLS_NAVRIGHTARROW], [CLS_NAVLEFTARROW]);
            }
            else {
                classList(arrowIcon, [CLS_NAVLEFTARROW], [CLS_NAVRIGHTARROW]);
            }
        }
        else if (addDisable && removeDisable) {
            addDisable.classList.add(CLS_DISABLE);
            addDisable.setAttribute('aria-disabled', 'true');
            addDisable.removeAttribute('tabindex');
            removeDisable.classList.remove(CLS_DISABLE);
            removeDisable.setAttribute('aria-disabled', 'false');
            removeDisable.setAttribute('tabindex', '0');
        }
        this.repeatScroll();
    };
    HScroll.prototype.scrollHandler = function (e) {
        var target = e.target;
        var width = target.offsetWidth;
        var rootEle = this.element;
        var navLeftEle = this.element.querySelector('.' + CLS_HSCROLLNAVLEFT);
        var navRightEle = this.element.querySelector('.' + CLS_HSCROLLNAVRIGHT);
        var leftOverlay = this.element.querySelector('.' + CLS_LEFTOVERLAY);
        var rightOverlay = this.element.querySelector('.' + CLS_RIGHTOVERLAY);
        var scrollLeft = target.scrollLeft;
        if (scrollLeft <= 0) {
            scrollLeft = -scrollLeft;
        }
        if (this.isDevice) {
            if (this.enableRtl && !(this.browserCheck || this.ieCheck)) {
                leftOverlay = this.element.querySelector('.' + CLS_RIGHTOVERLAY);
                rightOverlay = this.element.querySelector('.' + CLS_LEFTOVERLAY);
            }
            if (scrollLeft < OVERLAY_MAXWID) {
                leftOverlay.style.width = scrollLeft + 'px';
            }
            else {
                leftOverlay.style.width = '40px';
            }
            if ((target.scrollWidth - Math.ceil(width + scrollLeft)) < OVERLAY_MAXWID) {
                rightOverlay.style.width = (target.scrollWidth - Math.ceil(width + scrollLeft)) + 'px';
            }
            else {
                rightOverlay.style.width = '40px';
            }
        }
        if (scrollLeft === 0) {
            this.arrowDisabling(navLeftEle, navRightEle);
        }
        else if (Math.ceil(width + scrollLeft + .1) >= target.scrollWidth) {
            this.arrowDisabling(navRightEle, navLeftEle);
        }
        else {
            var disEle = this.element.querySelector('.' + CLS_HSCROLLNAV + '.' + CLS_DISABLE);
            if (disEle) {
                disEle.classList.remove(CLS_DISABLE);
                disEle.setAttribute('aria-disabled', 'false');
                disEle.setAttribute('tabindex', '0');
            }
        }
    };
    /**
     * Gets called when the model property changes.The data that describes the old and new values of property that changed.
     *
     * @param  {HScrollModel} newProp - It contains the new value of data.
     * @param  {HScrollModel} oldProp - It contains the old value of data.
     * @returns {void}
     * @private
     */
    HScroll.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'scrollStep':
                    this.setScrollState();
                    break;
                case 'enableRtl':
                    newProp.enableRtl ? this.element.classList.add(CLS_RTL) : this.element.classList.remove(CLS_RTL);
                    break;
            }
        }
    };
    __decorate([
        Property(null)
    ], HScroll.prototype, "scrollStep", void 0);
    HScroll = __decorate([
        NotifyPropertyChanges
    ], HScroll);
    return HScroll;
}(Component));

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CLS_ROOT$1 = 'e-vscroll';
var CLS_RTL$1 = 'e-rtl';
var CLS_DISABLE$1 = 'e-overlay';
var CLS_VSCROLLBAR = 'e-vscroll-bar';
var CLS_VSCROLLCON = 'e-vscroll-content';
var CLS_NAVARROW$1 = 'e-nav-arrow';
var CLS_NAVUPARROW = 'e-nav-up-arrow';
var CLS_NAVDOWNARROW = 'e-nav-down-arrow';
var CLS_VSCROLLNAV = 'e-scroll-nav';
var CLS_VSCROLLNAVUP = 'e-scroll-up-nav';
var CLS_VSCROLLNAVDOWN = 'e-scroll-down-nav';
var CLS_DEVICE$1 = 'e-scroll-device';
var CLS_OVERLAY$1 = 'e-scroll-overlay';
var CLS_UPOVERLAY = 'e-scroll-up-overlay';
var CLS_DOWNOVERLAY = 'e-scroll-down-overlay';
var OVERLAY_MAXWID$1 = 40;
/**
 * VScroll module is introduces vertical scroller when content exceeds the current viewing area.
 * It can be useful for the components like Toolbar, Tab which needs vertical scrolling alone.
 * Hidden content can be view by touch moving or icon click.
 * ```html
 * <div id="scroll"/>
 * <script>
 *   var scrollObj = new VScroll();
 *   scrollObj.appendTo("#scroll");
 * </script>
 * ```
 */
var VScroll = /** @class */ (function (_super) {
    __extends$1(VScroll, _super);
    /**
     * Initializes a new instance of the VScroll class.
     *
     * @param {VScrollModel} options  - Specifies VScroll model properties as options.
     * @param {string | HTMLElement} element  - Specifies the element for which vertical scrolling applies.
     */
    function VScroll(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    VScroll.prototype.preRender = function () {
        this.browser = Browser.info.name;
        this.browserCheck = this.browser === 'mozilla';
        this.isDevice = Browser.isDevice;
        this.customStep = true;
        var ele = this.element;
        this.ieCheck = this.browser === 'edge' || this.browser === 'msie';
        this.initialize();
        if (ele.id === '') {
            ele.id = getUniqueID('vscroll');
            this.uniqueId = true;
        }
        ele.style.display = 'block';
        if (this.enableRtl) {
            ele.classList.add(CLS_RTL$1);
        }
    };
    /**
     * To Initialize the vertical scroll rendering
     *
     * @private
     * @returns {void}
     */
    VScroll.prototype.render = function () {
        this.touchModule = new Touch(this.element, { scroll: this.touchHandler.bind(this), swipe: this.swipeHandler.bind(this) });
        EventHandler.add(this.scrollEle, 'scroll', this.scrollEventHandler, this);
        if (!this.isDevice) {
            this.createNavIcon(this.element);
        }
        else {
            this.element.classList.add(CLS_DEVICE$1);
            this.createOverlayElement(this.element);
        }
        this.setScrollState();
        EventHandler.add(this.element, 'wheel', this.wheelEventHandler, this);
    };
    VScroll.prototype.setScrollState = function () {
        if (isNullOrUndefined(this.scrollStep) || this.scrollStep < 0) {
            this.scrollStep = this.scrollEle.offsetHeight;
            this.customStep = false;
        }
        else {
            this.customStep = true;
        }
    };
    VScroll.prototype.initialize = function () {
        var scrollCnt = createElement('div', { className: CLS_VSCROLLCON });
        var scrollBar = createElement('div', { className: CLS_VSCROLLBAR });
        scrollBar.setAttribute('tabindex', '-1');
        var ele = this.element;
        var innerEle = [].slice.call(ele.children);
        for (var _i = 0, innerEle_1 = innerEle; _i < innerEle_1.length; _i++) {
            var ele_1 = innerEle_1[_i];
            scrollCnt.appendChild(ele_1);
        }
        scrollBar.appendChild(scrollCnt);
        ele.appendChild(scrollBar);
        scrollBar.style.overflow = 'hidden';
        this.scrollEle = scrollBar;
        this.scrollItems = scrollCnt;
    };
    VScroll.prototype.getPersistData = function () {
        var keyEntity = ['scrollStep'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    VScroll.prototype.getModuleName = function () {
        return 'vScroll';
    };
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    VScroll.prototype.destroy = function () {
        var el = this.element;
        el.style.display = '';
        removeClass([this.element], [CLS_ROOT$1, CLS_DEVICE$1, CLS_RTL$1]);
        var navs = selectAll('.e-' + el.id + '_nav.' + CLS_VSCROLLNAV, el);
        var overlays = selectAll('.' + CLS_OVERLAY$1, el);
        [].slice.call(overlays).forEach(function (ele) {
            detach(ele);
        });
        for (var _i = 0, _a = [].slice.call(this.scrollItems.children); _i < _a.length; _i++) {
            var elem = _a[_i];
            el.appendChild(elem);
        }
        if (this.uniqueId) {
            this.element.removeAttribute('id');
        }
        detach(this.scrollEle);
        if (navs.length > 0) {
            detach(navs[0]);
            if (!isNullOrUndefined(navs[1])) {
                detach(navs[1]);
            }
        }
        EventHandler.remove(this.scrollEle, 'scroll', this.scrollEventHandler);
        this.touchModule.destroy();
        this.touchModule = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Specifies the value to disable/enable the VScroll component.
     * When set to `true` , the component will be disabled.
     *
     * @param  {boolean} value - Based on this Boolean value, VScroll will be enabled (false) or disabled (true).
     * @returns {void}.
     */
    VScroll.prototype.disable = function (value) {
        var navEle = selectAll('.e-scroll-nav:not(.' + CLS_DISABLE$1 + ')', this.element);
        if (value) {
            this.element.classList.add(CLS_DISABLE$1);
        }
        else {
            this.element.classList.remove(CLS_DISABLE$1);
        }
        [].slice.call(navEle).forEach(function (el) {
            el.setAttribute('tabindex', !value ? '0' : '-1');
        });
    };
    VScroll.prototype.createOverlayElement = function (element) {
        var id = element.id.concat('_nav');
        var downOverlayEle = createElement('div', { className: CLS_OVERLAY$1 + ' ' + CLS_DOWNOVERLAY });
        var clsDown = 'e-' + element.id.concat('_nav ' + CLS_VSCROLLNAV + ' ' + CLS_VSCROLLNAVDOWN);
        var downEle = createElement('div', { id: id.concat('down'), className: clsDown });
        var navItem = createElement('div', { className: CLS_NAVDOWNARROW + ' ' + CLS_NAVARROW$1 + ' e-icons' });
        downEle.appendChild(navItem);
        var upEle = createElement('div', { className: CLS_OVERLAY$1 + ' ' + CLS_UPOVERLAY });
        if (this.ieCheck) {
            downEle.classList.add('e-ie-align');
        }
        element.appendChild(downOverlayEle);
        element.appendChild(downEle);
        element.insertBefore(upEle, element.firstChild);
        this.eventBinding([downEle]);
    };
    VScroll.prototype.createNavIcon = function (element) {
        var id = element.id.concat('_nav');
        var clsDown = 'e-' + element.id.concat('_nav ' + CLS_VSCROLLNAV + ' ' + CLS_VSCROLLNAVDOWN);
        var nav = createElement('div', { id: id.concat('_down'), className: clsDown });
        nav.setAttribute('aria-disabled', 'false');
        var navItem = createElement('div', { className: CLS_NAVDOWNARROW + ' ' + CLS_NAVARROW$1 + ' e-icons' });
        var clsUp = 'e-' + element.id.concat('_nav ' + CLS_VSCROLLNAV + ' ' + CLS_VSCROLLNAVUP);
        var navElement = createElement('div', { id: id.concat('_up'), className: clsUp + ' ' + CLS_DISABLE$1 });
        navElement.setAttribute('aria-disabled', 'true');
        var navUpItem = createElement('div', { className: CLS_NAVUPARROW + ' ' + CLS_NAVARROW$1 + ' e-icons' });
        navElement.appendChild(navUpItem);
        nav.appendChild(navItem);
        nav.setAttribute('tabindex', '0');
        element.appendChild(nav);
        element.insertBefore(navElement, element.firstChild);
        if (this.ieCheck) {
            nav.classList.add('e-ie-align');
            navElement.classList.add('e-ie-align');
        }
        this.eventBinding([nav, navElement]);
    };
    VScroll.prototype.onKeyPress = function (ev) {
        var _this = this;
        if (ev.key === 'Enter') {
            var timeoutFun_1 = function () {
                _this.keyTimeout = true;
                _this.eleScrolling(10, ev.target, true);
            };
            this.keyTimer = window.setTimeout(function () {
                timeoutFun_1();
            }, 100);
        }
    };
    VScroll.prototype.onKeyUp = function (ev) {
        if (ev.key !== 'Enter') {
            return;
        }
        if (this.keyTimeout) {
            this.keyTimeout = false;
        }
        else {
            ev.target.click();
        }
        clearTimeout(this.keyTimer);
    };
    VScroll.prototype.eventBinding = function (element) {
        var _this = this;
        [].slice.call(element).forEach(function (ele) {
            new Touch(ele, { tapHold: _this.tabHoldHandler.bind(_this), tapHoldThreshold: 500 });
            ele.addEventListener('keydown', _this.onKeyPress.bind(_this));
            ele.addEventListener('keyup', _this.onKeyUp.bind(_this));
            ele.addEventListener('mouseup', _this.repeatScroll.bind(_this));
            ele.addEventListener('touchend', _this.repeatScroll.bind(_this));
            ele.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
            EventHandler.add(ele, 'click', _this.clickEventHandler, _this);
        });
    };
    VScroll.prototype.repeatScroll = function () {
        clearInterval(this.timeout);
    };
    VScroll.prototype.tabHoldHandler = function (ev) {
        var _this = this;
        var trgt = ev.originalEvent.target;
        trgt = this.contains(trgt, CLS_VSCROLLNAV) ? trgt.firstElementChild : trgt;
        var scrollDistance = 10;
        var timeoutFun = function () {
            _this.eleScrolling(scrollDistance, trgt, true);
        };
        this.timeout = window.setInterval(function () {
            timeoutFun();
        }, 50);
    };
    VScroll.prototype.contains = function (element, className) {
        return element.classList.contains(className);
    };
    VScroll.prototype.eleScrolling = function (scrollDis, trgt, isContinuous) {
        var classList = trgt.classList;
        if (classList.contains(CLS_VSCROLLNAV)) {
            classList = trgt.querySelector('.' + CLS_NAVARROW$1).classList;
        }
        if (classList.contains(CLS_NAVDOWNARROW)) {
            this.frameScrollRequest(scrollDis, 'add', isContinuous);
        }
        else if (classList.contains(CLS_NAVUPARROW)) {
            this.frameScrollRequest(scrollDis, '', isContinuous);
        }
    };
    VScroll.prototype.clickEventHandler = function (event) {
        this.eleScrolling(this.scrollStep, event.target, false);
    };
    VScroll.prototype.wheelEventHandler = function (e) {
        e.preventDefault();
        this.frameScrollRequest(this.scrollStep, (e.deltaY > 0 ? 'add' : ''), false);
    };
    VScroll.prototype.swipeHandler = function (e) {
        var swipeElement = this.scrollEle;
        var distance;
        if (e.velocity <= 1) {
            distance = e.distanceY / (e.velocity * 10);
        }
        else {
            distance = e.distanceY / e.velocity;
        }
        var start = 0.5;
        var animate = function () {
            var step = Math.sin(start);
            if (step <= 0) {
                window.cancelAnimationFrame(step);
            }
            else {
                if (e.swipeDirection === 'Up') {
                    swipeElement.scrollTop += distance * step;
                }
                else if (e.swipeDirection === 'Down') {
                    swipeElement.scrollTop -= distance * step;
                }
                start -= 0.02;
                window.requestAnimationFrame(animate);
            }
        };
        animate();
    };
    VScroll.prototype.scrollUpdating = function (scrollVal, action) {
        if (action === 'add') {
            this.scrollEle.scrollTop += scrollVal;
        }
        else {
            this.scrollEle.scrollTop -= scrollVal;
        }
    };
    VScroll.prototype.frameScrollRequest = function (scrollValue, action, isContinuous) {
        var _this = this;
        var step = 10;
        if (isContinuous) {
            this.scrollUpdating(scrollValue, action);
            return;
        }
        if (!this.customStep) {
            [].slice.call(selectAll('.' + CLS_OVERLAY$1, this.element)).forEach(function (el) {
                scrollValue -= el.offsetHeight;
            });
        }
        var animate = function () {
            if (scrollValue < step) {
                window.cancelAnimationFrame(step);
            }
            else {
                _this.scrollUpdating(step, action);
                scrollValue -= step;
                window.requestAnimationFrame(animate);
            }
        };
        animate();
    };
    VScroll.prototype.touchHandler = function (e) {
        var el = this.scrollEle;
        var distance = e.distanceY;
        if (e.scrollDirection === 'Up') {
            el.scrollTop = el.scrollTop + distance;
        }
        else if (e.scrollDirection === 'Down') {
            el.scrollTop = el.scrollTop - distance;
        }
    };
    VScroll.prototype.arrowDisabling = function (addDisableCls, removeDisableCls) {
        if (this.isDevice) {
            var arrowEle = isNullOrUndefined(addDisableCls) ? removeDisableCls : addDisableCls;
            var arrowIcon = arrowEle.querySelector('.' + CLS_NAVARROW$1);
            if (isNullOrUndefined(addDisableCls)) {
                classList(arrowIcon, [CLS_NAVDOWNARROW], [CLS_NAVUPARROW]);
            }
            else {
                classList(arrowIcon, [CLS_NAVUPARROW], [CLS_NAVDOWNARROW]);
            }
        }
        else {
            addDisableCls.classList.add(CLS_DISABLE$1);
            addDisableCls.setAttribute('aria-disabled', 'true');
            addDisableCls.removeAttribute('tabindex');
            removeDisableCls.classList.remove(CLS_DISABLE$1);
            removeDisableCls.setAttribute('aria-disabled', 'false');
            removeDisableCls.setAttribute('tabindex', '0');
        }
        this.repeatScroll();
    };
    VScroll.prototype.scrollEventHandler = function (e) {
        var target = e.target;
        var height = target.offsetHeight;
        var navUpEle = this.element.querySelector('.' + CLS_VSCROLLNAVUP);
        var navDownEle = this.element.querySelector('.' + CLS_VSCROLLNAVDOWN);
        var upOverlay = this.element.querySelector('.' + CLS_UPOVERLAY);
        var downOverlay = this.element.querySelector('.' + CLS_DOWNOVERLAY);
        var scrollTop = target.scrollTop;
        if (scrollTop <= 0) {
            scrollTop = -scrollTop;
        }
        if (this.isDevice) {
            if (scrollTop < OVERLAY_MAXWID$1) {
                upOverlay.style.height = scrollTop + 'px';
            }
            else {
                upOverlay.style.height = '40px';
            }
            if ((target.scrollHeight - Math.ceil(height + scrollTop)) < OVERLAY_MAXWID$1) {
                downOverlay.style.height = (target.scrollHeight - Math.ceil(height + scrollTop)) + 'px';
            }
            else {
                downOverlay.style.height = '40px';
            }
        }
        if (scrollTop === 0) {
            this.arrowDisabling(navUpEle, navDownEle);
        }
        else if (Math.ceil(height + scrollTop + .1) >= target.scrollHeight) {
            this.arrowDisabling(navDownEle, navUpEle);
        }
        else {
            var disEle = this.element.querySelector('.' + CLS_VSCROLLNAV + '.' + CLS_DISABLE$1);
            if (disEle) {
                disEle.classList.remove(CLS_DISABLE$1);
                disEle.setAttribute('aria-disabled', 'false');
                disEle.setAttribute('tabindex', '0');
            }
        }
    };
    /**
     * Gets called when the model property changes.The data that describes the old and new values of property that changed.
     *
     * @param  {VScrollModel} newProp - It contains the new value of data.
     * @param  {VScrollModel} oldProp - It contains the old value of data.
     * @returns {void}
     * @private
     */
    VScroll.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'scrollStep':
                    this.setScrollState();
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        this.element.classList.add(CLS_RTL$1);
                    }
                    else {
                        this.element.classList.remove(CLS_RTL$1);
                    }
                    break;
            }
        }
    };
    __decorate$1([
        Property(null)
    ], VScroll.prototype, "scrollStep", void 0);
    VScroll = __decorate$1([
        NotifyPropertyChanges
    ], VScroll);
    return VScroll;
}(Component));

/**
 * Used to add scroll in menu.
 *
 * @param {createElementType} createElement - Specifies the create element model
 * @param {HTMLElement} container - Specifies the element container
 * @param {HTMLElement} content - Specifies the content element
 * @param {string} scrollType - Specifies the scroll type
 * @param {boolean} enableRtl - Specifies the enable RTL property
 * @param {boolean} offset - Specifies the offset value
 * @returns {HTMLElement} - Element
 * @hidden
 */
function addScrolling(createElement, container, content, scrollType, enableRtl, offset) {
    var containerOffset;
    var contentOffset;
    var parentElem = container.parentElement;
    if (scrollType === 'vscroll') {
        containerOffset = offset || container.getBoundingClientRect().height;
        contentOffset = content.getBoundingClientRect().height;
    }
    else {
        containerOffset = container.getBoundingClientRect().width;
        contentOffset = content.getBoundingClientRect().width;
    }
    if (containerOffset < contentOffset) {
        return createScrollbar(createElement, container, content, scrollType, enableRtl, offset);
    }
    else if (parentElem) {
        var width = parentElem.getBoundingClientRect().width;
        if (width < containerOffset && scrollType === 'hscroll') {
            contentOffset = width;
            container.style.maxWidth = width + 'px';
            return createScrollbar(createElement, container, content, scrollType, enableRtl, offset);
        }
        return content;
    }
    else {
        return content;
    }
}
/**
 * Used to create scroll bar in menu.
 *
 * @param {createElementType} createElement - Specifies the create element model
 * @param {HTMLElement} container - Specifies the element container
 * @param {HTMLElement} content - Specifies the content element
 * @param {string} scrollType - Specifies the scroll type
 * @param {boolean} enableRtl - Specifies the enable RTL property
 * @param {boolean} offset - Specifies the offset value
 * @returns {HTMLElement} - Element
 * @hidden
 */
function createScrollbar(createElement, container, content, scrollType, enableRtl, offset) {
    var scrollEle = createElement('div', { className: 'e-menu-' + scrollType });
    container.appendChild(scrollEle);
    scrollEle.appendChild(content);
    if (offset) {
        scrollEle.style.overflow = 'hidden';
        scrollEle.style.height = offset + 'px';
    }
    else {
        scrollEle.style.maxHeight = container.style.maxHeight;
        container.style.overflow = 'hidden';
    }
    var scrollObj;
    if (scrollType === 'vscroll') {
        scrollObj = new VScroll({ enableRtl: enableRtl }, scrollEle);
        scrollObj.scrollStep = select('.e-' + scrollType + '-bar', container).offsetHeight / 2;
    }
    else {
        scrollObj = new HScroll({ enableRtl: enableRtl }, scrollEle);
        scrollObj.scrollStep = select('.e-' + scrollType + '-bar', container).offsetWidth;
    }
    return scrollEle;
}
/**
 * Used to destroy the scroll option.
 *
 * @param {VScroll | HScroll} scrollObj - Specifies the scroller object
 * @param {Element} element - Specifies the element
 * @param {HTMLElement} skipEle - Specifies the skip  element
 * @returns {void}
 * @hidden
 */
function destroyScroll(scrollObj, element, skipEle) {
    if (scrollObj) {
        var menu = select('.e-menu-parent', element);
        if (menu) {
            if (!skipEle || skipEle === menu) {
                scrollObj.destroy();
                element.parentElement.appendChild(menu);
                detach(element);
            }
        }
        else {
            scrollObj.destroy();
            detach(element);
        }
    }
}

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    __extends$2(FieldSettings, _super);
    function FieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('id')
    ], FieldSettings.prototype, "itemId", void 0);
    __decorate$2([
        Property('parentId')
    ], FieldSettings.prototype, "parentId", void 0);
    __decorate$2([
        Property('text')
    ], FieldSettings.prototype, "text", void 0);
    __decorate$2([
        Property('iconCss')
    ], FieldSettings.prototype, "iconCss", void 0);
    __decorate$2([
        Property('url')
    ], FieldSettings.prototype, "url", void 0);
    __decorate$2([
        Property('separator')
    ], FieldSettings.prototype, "separator", void 0);
    __decorate$2([
        Property('items')
    ], FieldSettings.prototype, "children", void 0);
    return FieldSettings;
}(ChildProperty));
/**
 * Specifies menu items.
 */
var MenuItem = /** @class */ (function (_super) {
    __extends$2(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(null)
    ], MenuItem.prototype, "iconCss", void 0);
    __decorate$2([
        Property('')
    ], MenuItem.prototype, "id", void 0);
    __decorate$2([
        Property(false)
    ], MenuItem.prototype, "separator", void 0);
    __decorate$2([
        Collection([], MenuItem)
    ], MenuItem.prototype, "items", void 0);
    __decorate$2([
        Property('')
    ], MenuItem.prototype, "text", void 0);
    __decorate$2([
        Property('')
    ], MenuItem.prototype, "url", void 0);
    __decorate$2([
        Property()
    ], MenuItem.prototype, "htmlAttributes", void 0);
    return MenuItem;
}(ChildProperty));
/**
 * Animation configuration settings.
 */
var MenuAnimationSettings = /** @class */ (function (_super) {
    __extends$2(MenuAnimationSettings, _super);
    function MenuAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('SlideDown')
    ], MenuAnimationSettings.prototype, "effect", void 0);
    __decorate$2([
        Property(400)
    ], MenuAnimationSettings.prototype, "duration", void 0);
    __decorate$2([
        Property('ease')
    ], MenuAnimationSettings.prototype, "easing", void 0);
    return MenuAnimationSettings;
}(ChildProperty));
/**
 * Base class for Menu and ContextMenu components.
 *
 *  @private
 */
var MenuBase = /** @class */ (function (_super) {
    __extends$2(MenuBase, _super);
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
    __decorate$2([
        Event()
    ], MenuBase.prototype, "beforeItemRender", void 0);
    __decorate$2([
        Event()
    ], MenuBase.prototype, "beforeOpen", void 0);
    __decorate$2([
        Event()
    ], MenuBase.prototype, "onOpen", void 0);
    __decorate$2([
        Event()
    ], MenuBase.prototype, "beforeClose", void 0);
    __decorate$2([
        Event()
    ], MenuBase.prototype, "onClose", void 0);
    __decorate$2([
        Event()
    ], MenuBase.prototype, "select", void 0);
    __decorate$2([
        Event()
    ], MenuBase.prototype, "created", void 0);
    __decorate$2([
        Property('')
    ], MenuBase.prototype, "cssClass", void 0);
    __decorate$2([
        Property(0)
    ], MenuBase.prototype, "hoverDelay", void 0);
    __decorate$2([
        Property(false)
    ], MenuBase.prototype, "showItemOnClick", void 0);
    __decorate$2([
        Property('')
    ], MenuBase.prototype, "target", void 0);
    __decorate$2([
        Property('')
    ], MenuBase.prototype, "filter", void 0);
    __decorate$2([
        Property(null)
    ], MenuBase.prototype, "template", void 0);
    __decorate$2([
        Property(false)
    ], MenuBase.prototype, "enableScrolling", void 0);
    __decorate$2([
        Property(true)
    ], MenuBase.prototype, "enableHtmlSanitizer", void 0);
    __decorate$2([
        Complex({ itemId: 'id', text: 'text', parentId: 'parentId', iconCss: 'iconCss', url: 'url', separator: 'separator', children: 'items' }, FieldSettings)
    ], MenuBase.prototype, "fields", void 0);
    __decorate$2([
        Collection([], MenuItem)
    ], MenuBase.prototype, "items", void 0);
    __decorate$2([
        Complex({ duration: 400, easing: 'ease', effect: 'SlideDown' }, MenuAnimationSettings)
    ], MenuBase.prototype, "animationSettings", void 0);
    MenuBase = __decorate$2([
        NotifyPropertyChanges
    ], MenuBase);
    return MenuBase;
}(Component));

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CLS_VERTICAL = 'e-vertical';
var CLS_ITEMS = 'e-toolbar-items';
var CLS_ITEM = 'e-toolbar-item';
var CLS_RTL$2 = 'e-rtl';
var CLS_SEPARATOR = 'e-separator';
var CLS_POPUPICON = 'e-popup-up-icon';
var CLS_POPUPDOWN = 'e-popup-down-icon';
var CLS_POPUPOPEN = 'e-popup-open';
var CLS_TEMPLATE = 'e-template';
var CLS_DISABLE$2 = 'e-overlay';
var CLS_POPUPTEXT = 'e-toolbar-text';
var CLS_TBARTEXT = 'e-popup-text';
var CLS_TBAROVERFLOW = 'e-overflow-show';
var CLS_POPOVERFLOW = 'e-overflow-hide';
var CLS_TBARBTN = 'e-tbar-btn';
var CLS_TBARNAV = 'e-hor-nav';
var CLS_TBARSCRLNAV = 'e-scroll-nav';
var CLS_TBARRIGHT = 'e-toolbar-right';
var CLS_TBARLEFT = 'e-toolbar-left';
var CLS_TBARCENTER = 'e-toolbar-center';
var CLS_TBARPOS = 'e-tbar-pos';
var CLS_HSCROLLCNT = 'e-hscroll-content';
var CLS_VSCROLLCNT = 'e-vscroll-content';
var CLS_HSCROLLBAR$1 = 'e-hscroll-bar';
var CLS_POPUPNAV = 'e-hor-nav';
var CLS_POPUPCLASS = 'e-toolbar-pop';
var CLS_POPUP = 'e-toolbar-popup';
var CLS_TBARBTNTEXT = 'e-tbar-btn-text';
var CLS_TBARNAVACT = 'e-nav-active';
var CLS_TBARIGNORE = 'e-ignore';
var CLS_POPPRI = 'e-popup-alone';
var CLS_HIDDEN = 'e-hidden';
var CLS_MULTIROW = 'e-toolbar-multirow';
var CLS_MULTIROWPOS = 'e-multirow-pos';
var CLS_MULTIROW_SEPARATOR = 'e-multirow-separator';
var CLS_EXTENDABLE_SEPARATOR = 'e-extended-separator';
var CLS_EXTEANDABLE_TOOLBAR = 'e-extended-toolbar';
var CLS_EXTENDABLECLASS = 'e-toolbar-extended';
var CLS_EXTENDPOPUP = 'e-expended-nav';
var CLS_EXTENDEDPOPOPEN = 'e-tbar-extended';
/**
 * An item object that is used to configure Toolbar commands.
 */
var Item = /** @class */ (function (_super) {
    __extends$3(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('')
    ], Item.prototype, "id", void 0);
    __decorate$3([
        Property('')
    ], Item.prototype, "text", void 0);
    __decorate$3([
        Property('auto')
    ], Item.prototype, "width", void 0);
    __decorate$3([
        Property('')
    ], Item.prototype, "cssClass", void 0);
    __decorate$3([
        Property(false)
    ], Item.prototype, "showAlwaysInPopup", void 0);
    __decorate$3([
        Property(false)
    ], Item.prototype, "disabled", void 0);
    __decorate$3([
        Property('')
    ], Item.prototype, "prefixIcon", void 0);
    __decorate$3([
        Property('')
    ], Item.prototype, "suffixIcon", void 0);
    __decorate$3([
        Property(true)
    ], Item.prototype, "visible", void 0);
    __decorate$3([
        Property('None')
    ], Item.prototype, "overflow", void 0);
    __decorate$3([
        Property('')
    ], Item.prototype, "template", void 0);
    __decorate$3([
        Property('Button')
    ], Item.prototype, "type", void 0);
    __decorate$3([
        Property('Both')
    ], Item.prototype, "showTextOn", void 0);
    __decorate$3([
        Property(null)
    ], Item.prototype, "htmlAttributes", void 0);
    __decorate$3([
        Property('')
    ], Item.prototype, "tooltipText", void 0);
    __decorate$3([
        Property('Left')
    ], Item.prototype, "align", void 0);
    __decorate$3([
        Event()
    ], Item.prototype, "click", void 0);
    __decorate$3([
        Property(-1)
    ], Item.prototype, "tabIndex", void 0);
    return Item;
}(ChildProperty));
/**
 * The Toolbar control contains a group of commands that are aligned horizontally.
 * ```html
 * <div id="toolbar"/>
 * <script>
 *   var toolbarObj = new Toolbar();
 *   toolbarObj.appendTo("#toolbar");
 * </script>
 * ```
 */
var Toolbar = /** @class */ (function (_super) {
    __extends$3(Toolbar, _super);
    /**
     * Initializes a new instance of the Toolbar class.
     *
     * @param {ToolbarModel} options  - Specifies Toolbar model properties as options.
     * @param { string | HTMLElement} element  - Specifies the element that is rendered as a Toolbar.
     */
    function Toolbar(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.resizeContext = _this.resize.bind(_this);
        _this.orientationChangeContext = _this.orientationChange.bind(_this);
        /**
         * Contains the keyboard configuration of the Toolbar.
         */
        _this.keyConfigs = {
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            moveDown: 'downarrow',
            popupOpen: 'enter',
            popupClose: 'escape',
            tab: 'tab',
            home: 'home',
            end: 'end'
        };
        return _this;
    }
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}.
     */
    Toolbar.prototype.destroy = function () {
        var _this = this;
        if (this.isReact || this.isAngular) {
            this.clearTemplate();
        }
        var btnItems = this.element.querySelectorAll('.e-control.e-btn');
        [].slice.call(btnItems).forEach(function (el) {
            if (!isNullOrUndefined(el) && !isNullOrUndefined(el.ej2_instances) && !isNullOrUndefined(el.ej2_instances[0]) && !(el.ej2_instances[0].isDestroyed)) {
                el.ej2_instances[0].destroy();
            }
        });
        this.unwireEvents();
        this.tempId.forEach(function (ele) {
            if (!isNullOrUndefined(_this.element.querySelector(ele))) {
                document.body.appendChild(_this.element.querySelector(ele)).style.display = 'none';
            }
        });
        this.destroyItems();
        while (this.element.lastElementChild) {
            this.element.removeChild(this.element.lastElementChild);
        }
        if (this.trgtEle) {
            this.element.appendChild(this.ctrlTem);
            this.trgtEle = null;
            this.ctrlTem = null;
        }
        if (this.popObj) {
            this.popObj.destroy();
            detach(this.popObj.element);
        }
        if (this.activeEle) {
            this.activeEle = null;
        }
        this.popObj = null;
        this.tbarAlign = null;
        this.tbarItemsCol = [];
        this.remove(this.element, 'e-toolpop');
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        this.element.removeAttribute('style');
        ['aria-disabled', 'aria-orientation', 'role'].forEach(function (attrb) {
            return _this.element.removeAttribute(attrb);
        });
        _super.prototype.destroy.call(this);
    };
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    Toolbar.prototype.preRender = function () {
        var eventArgs = { enableCollision: this.enableCollision, scrollStep: this.scrollStep };
        this.trigger('beforeCreate', eventArgs);
        this.enableCollision = eventArgs.enableCollision;
        this.scrollStep = eventArgs.scrollStep;
        this.scrollModule = null;
        this.popObj = null;
        this.tempId = [];
        this.tbarItemsCol = this.items;
        this.isVertical = this.element.classList.contains(CLS_VERTICAL) ? true : false;
        this.isExtendedOpen = false;
        this.popupPriCount = 0;
        if (this.enableRtl) {
            this.add(this.element, CLS_RTL$2);
        }
    };
    Toolbar.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        window.addEventListener('resize', this.resizeContext);
        window.addEventListener('orientationchange', this.orientationChangeContext);
        if (this.allowKeyboard) {
            this.wireKeyboardEvent();
        }
    };
    Toolbar.prototype.wireKeyboardEvent = function () {
        this.keyModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs
        });
        EventHandler.add(this.element, 'keydown', this.docKeyDown, this);
        this.updateTabIndex('0');
    };
    Toolbar.prototype.updateTabIndex = function (tabIndex) {
        var ele = this.element.querySelector('.' + CLS_ITEM + ':not(.' + CLS_DISABLE$2 + ' ):not(.' + CLS_SEPARATOR + ' ):not(.' + CLS_HIDDEN + ' )');
        if (!isNullOrUndefined(ele) && !isNullOrUndefined(ele.firstElementChild)) {
            var dataTabIndex = ele.firstElementChild.getAttribute('data-tabindex');
            if (dataTabIndex && dataTabIndex === '-1' && ele.firstElementChild.tagName !== 'INPUT') {
                ele.firstElementChild.setAttribute('tabindex', tabIndex);
            }
        }
    };
    Toolbar.prototype.unwireKeyboardEvent = function () {
        if (this.keyModule) {
            EventHandler.remove(this.element, 'keydown', this.docKeyDown);
            this.keyModule.destroy();
            this.keyModule = null;
        }
    };
    Toolbar.prototype.docKeyDown = function (e) {
        if (e.target.tagName === 'INPUT') {
            return;
        }
        var popCheck = !isNullOrUndefined(this.popObj) && isVisible(this.popObj.element) && this.overflowMode !== 'Extended';
        if (e.keyCode === 9 && e.target.classList.contains('e-hor-nav') === true && popCheck) {
            this.popObj.hide({ name: 'FadeOut', duration: 100 });
        }
        var keyCheck = (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 35 || e.keyCode === 36);
        if (keyCheck) {
            e.preventDefault();
        }
    };
    Toolbar.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.clickHandler);
        this.destroyScroll();
        this.unwireKeyboardEvent();
        window.removeEventListener('resize', this.resizeContext);
        window.removeEventListener('orientationchange', this.orientationChangeContext);
        document.removeEventListener('scroll', this.clickEvent);
        document.removeEventListener('click', this.scrollEvent);
        this.scrollEvent = null;
        this.clickEvent = null;
    };
    Toolbar.prototype.clearProperty = function () {
        this.tbarEle = [];
        this.tbarAlgEle = { lefts: [], centers: [], rights: [] };
    };
    Toolbar.prototype.docEvent = function (e) {
        var popEle = closest(e.target, '.e-popup');
        if (this.popObj && isVisible(this.popObj.element) && !popEle && this.overflowMode === 'Popup') {
            this.popObj.hide({ name: 'FadeOut', duration: 100 });
        }
    };
    Toolbar.prototype.destroyScroll = function () {
        if (this.scrollModule) {
            if (this.tbarAlign) {
                this.add(this.scrollModule.element, CLS_TBARPOS);
            }
            this.scrollModule.destroy();
            this.scrollModule = null;
        }
    };
    Toolbar.prototype.destroyItems = function () {
        if (this.element) {
            [].slice.call(this.element.querySelectorAll('.' + CLS_ITEM)).forEach(function (el) { detach(el); });
        }
        if (this.tbarAlign) {
            var tbarItems = this.element.querySelector('.' + CLS_ITEMS);
            [].slice.call(tbarItems.children).forEach(function (el) {
                detach(el);
            });
            this.tbarAlign = false;
            this.remove(tbarItems, CLS_TBARPOS);
        }
        this.clearProperty();
    };
    Toolbar.prototype.destroyMode = function () {
        if (this.scrollModule) {
            this.remove(this.scrollModule.element, CLS_RTL$2);
            this.destroyScroll();
        }
        this.remove(this.element, CLS_EXTENDEDPOPOPEN);
        this.remove(this.element, CLS_EXTEANDABLE_TOOLBAR);
        var tempEle = this.element.querySelector('.e-toolbar-multirow');
        if (tempEle) {
            this.remove(tempEle, CLS_MULTIROW);
        }
        if (this.popObj) {
            this.popupRefresh(this.popObj.element, true);
        }
    };
    Toolbar.prototype.add = function (ele, val) {
        ele.classList.add(val);
    };
    Toolbar.prototype.remove = function (ele, val) {
        ele.classList.remove(val);
    };
    Toolbar.prototype.elementFocus = function (ele) {
        var fChild = ele.firstElementChild;
        if (fChild) {
            fChild.focus();
            this.activeEleSwitch(ele);
        }
        else {
            ele.focus();
        }
    };
    Toolbar.prototype.clstElement = function (tbrNavChk, trgt) {
        var clst;
        if (tbrNavChk && this.popObj && isVisible(this.popObj.element)) {
            clst = this.popObj.element.querySelector('.' + CLS_ITEM);
        }
        else if (this.element === trgt || tbrNavChk) {
            clst = this.element.querySelector('.' + CLS_ITEM + ':not(.' + CLS_DISABLE$2 + ' ):not(.' + CLS_SEPARATOR + ' ):not(.' + CLS_HIDDEN + ' )');
        }
        else {
            clst = closest(trgt, '.' + CLS_ITEM);
        }
        return clst;
    };
    Toolbar.prototype.keyHandling = function (clst, e, trgt, navChk, scrollChk) {
        var popObj = this.popObj;
        var rootEle = this.element;
        var popAnimate = { name: 'FadeOut', duration: 100 };
        var value = e.action === 'moveUp' ? 'previous' : 'next';
        var ele;
        var nodes;
        switch (e.action) {
            case 'moveRight':
                if (this.isVertical) {
                    return;
                }
                if (rootEle === trgt) {
                    this.elementFocus(clst);
                }
                else if (!navChk) {
                    this.eleFocus(clst, 'next');
                }
                break;
            case 'moveLeft':
                if (this.isVertical) {
                    return;
                }
                if (!navChk) {
                    this.eleFocus(clst, 'previous');
                }
                break;
            case 'home':
            case 'end':
                if (clst) {
                    var popupCheck = closest(clst, '.e-popup');
                    var extendedPopup = this.element.querySelector('.' + CLS_EXTENDABLECLASS);
                    if (this.overflowMode === 'Extended' && extendedPopup && extendedPopup.classList.contains('e-popup-open')) {
                        popupCheck = e.action === 'end' ? extendedPopup : null;
                    }
                    if (popupCheck) {
                        if (isVisible(this.popObj.element)) {
                            nodes = [].slice.call(popupCheck.children);
                            if (e.action === 'home') {
                                ele = this.focusFirstVisibleEle(nodes);
                            }
                            else {
                                ele = this.focusLastVisibleEle(nodes);
                            }
                        }
                    }
                    else {
                        nodes = this.element.querySelectorAll('.' + CLS_ITEMS + ' .' + CLS_ITEM + ':not(.' + CLS_SEPARATOR + ')');
                        if (e.action === 'home') {
                            ele = this.focusFirstVisibleEle(nodes);
                        }
                        else {
                            ele = this.focusLastVisibleEle(nodes);
                        }
                    }
                    if (ele) {
                        this.elementFocus(ele);
                    }
                }
                break;
            case 'moveUp':
            case 'moveDown':
                if (!this.isVertical) {
                    if (popObj && closest(trgt, '.e-popup')) {
                        var popEle = popObj.element;
                        var popFrstEle = popEle.firstElementChild;
                        if ((value === 'previous' && popFrstEle === clst)) {
                            popEle.lastElementChild.firstChild.focus();
                        }
                        else if (value === 'next' && popEle.lastElementChild === clst) {
                            popFrstEle.firstChild.focus();
                        }
                        else {
                            this.eleFocus(clst, value);
                        }
                    }
                    else if (e.action === 'moveDown' && popObj && isVisible(popObj.element)) {
                        this.elementFocus(clst);
                    }
                }
                else {
                    if (e.action === 'moveUp') {
                        this.eleFocus(clst, 'previous');
                    }
                    else {
                        this.eleFocus(clst, 'next');
                    }
                }
                break;
            case 'tab':
                if (!scrollChk && !navChk) {
                    var ele_1 = clst.firstElementChild;
                    if (rootEle === trgt) {
                        if (this.activeEle) {
                            this.activeEle.focus();
                        }
                        else {
                            this.activeEleRemove(ele_1);
                            ele_1.focus();
                        }
                    }
                }
                break;
            case 'popupClose':
                if (popObj && this.overflowMode !== 'Extended') {
                    popObj.hide(popAnimate);
                }
                break;
            case 'popupOpen':
                if (!navChk) {
                    return;
                }
                if (popObj && !isVisible(popObj.element)) {
                    popObj.element.style.top = rootEle.offsetHeight + 'px';
                    popObj.show({ name: 'FadeIn', duration: 100 });
                }
                else {
                    popObj.hide(popAnimate);
                }
                break;
        }
    };
    Toolbar.prototype.keyActionHandler = function (e) {
        var trgt = e.target;
        if (trgt.tagName === 'INPUT' || trgt.tagName === 'TEXTAREA' || this.element.classList.contains(CLS_DISABLE$2)) {
            return;
        }
        e.preventDefault();
        var tbrNavChk = trgt.classList.contains(CLS_TBARNAV);
        var tbarScrollChk = trgt.classList.contains(CLS_TBARSCRLNAV);
        var clst = this.clstElement(tbrNavChk, trgt);
        if (clst || tbarScrollChk) {
            this.keyHandling(clst, e, trgt, tbrNavChk, tbarScrollChk);
        }
    };
    /**
     * Specifies the value to disable/enable the Toolbar component.
     * When set to `true`, the component will be disabled.
     *
     * @param  {boolean} value - Based on this Boolean value, Toolbar will be enabled (false) or disabled (true).
     * @returns {void}.
     */
    Toolbar.prototype.disable = function (value) {
        var rootEle = this.element;
        if (value) {
            rootEle.classList.add(CLS_DISABLE$2);
        }
        else {
            rootEle.classList.remove(CLS_DISABLE$2);
        }
        if (this.activeEle) {
            this.activeEle.setAttribute('tabindex', this.activeEle.getAttribute('data-tabindex'));
        }
        if (this.scrollModule) {
            this.scrollModule.disable(value);
        }
        if (this.popObj) {
            if (isVisible(this.popObj.element) && this.overflowMode !== 'Extended') {
                this.popObj.hide();
            }
            rootEle.querySelector('#' + rootEle.id + '_nav').setAttribute('tabindex', !value ? '0' : '-1');
        }
    };
    Toolbar.prototype.eleContains = function (el) {
        return el.classList.contains(CLS_SEPARATOR) || el.classList.contains(CLS_DISABLE$2) || el.getAttribute('disabled') || el.classList.contains(CLS_HIDDEN) || !isVisible(el) || !el.classList.contains(CLS_ITEM);
    };
    Toolbar.prototype.focusFirstVisibleEle = function (nodes) {
        var element;
        var index = 0;
        while (index < nodes.length) {
            var ele = nodes[parseInt(index.toString(), 10)];
            if (!ele.classList.contains(CLS_HIDDEN) && !ele.classList.contains(CLS_DISABLE$2)) {
                return ele;
            }
            index++;
        }
        return element;
    };
    Toolbar.prototype.focusLastVisibleEle = function (nodes) {
        var element;
        var index = nodes.length - 1;
        while (index >= 0) {
            var ele = nodes[parseInt(index.toString(), 10)];
            if (!ele.classList.contains(CLS_HIDDEN) && !ele.classList.contains(CLS_DISABLE$2)) {
                return ele;
            }
            index--;
        }
        return element;
    };
    Toolbar.prototype.eleFocus = function (closest, pos) {
        var sib = Object(closest)[pos + 'ElementSibling'];
        if (sib) {
            var skipEle = this.eleContains(sib);
            if (skipEle) {
                this.eleFocus(sib, pos);
                return;
            }
            this.elementFocus(sib);
        }
        else if (this.tbarAlign) {
            var elem = Object(closest.parentElement)[pos + 'ElementSibling'];
            if (!isNullOrUndefined(elem) && elem.children.length === 0) {
                elem = Object(elem)[pos + 'ElementSibling'];
            }
            if (!isNullOrUndefined(elem) && elem.children.length > 0) {
                if (pos === 'next') {
                    var el = elem.querySelector('.' + CLS_ITEM);
                    if (this.eleContains(el)) {
                        this.eleFocus(el, pos);
                    }
                    else {
                        el.firstElementChild.focus();
                        this.activeEleSwitch(el);
                    }
                }
                else {
                    var el = elem.lastElementChild;
                    if (this.eleContains(el)) {
                        this.eleFocus(el, pos);
                    }
                    else {
                        this.elementFocus(el);
                    }
                }
            }
        }
        else if (!isNullOrUndefined(closest)) {
            var tbrItems = this.element.querySelectorAll('.' + CLS_ITEMS + ' .' + CLS_ITEM + ':not(.' + CLS_SEPARATOR + ')' + ':not(.' + CLS_DISABLE$2 + ')' + ':not(.' + CLS_HIDDEN + ')');
            if (pos === 'next' && tbrItems) {
                this.elementFocus(tbrItems[0]);
            }
            else if (pos === 'previous' && tbrItems) {
                this.elementFocus(tbrItems[tbrItems.length - 1]);
            }
        }
    };
    Toolbar.prototype.clickHandler = function (e) {
        var _this = this;
        var trgt = e.target;
        var ele = this.element;
        var isPopupElement = !isNullOrUndefined(closest(trgt, '.' + CLS_POPUPCLASS));
        var clsList = trgt.classList;
        var popupNav = closest(trgt, ('.' + CLS_TBARNAV));
        if (!popupNav) {
            popupNav = trgt;
        }
        if (!ele.children[0].classList.contains('e-hscroll') && !ele.children[0].classList.contains('e-vscroll')
            && (clsList.contains(CLS_TBARNAV))) {
            clsList = trgt.querySelector('.e-icons').classList;
        }
        if (clsList.contains(CLS_POPUPICON) || clsList.contains(CLS_POPUPDOWN)) {
            this.popupClickHandler(ele, popupNav, CLS_RTL$2);
        }
        var itemObj;
        var clst = closest(e.target, '.' + CLS_ITEM);
        if ((isNullOrUndefined(clst) || clst.classList.contains(CLS_DISABLE$2)) && !popupNav.classList.contains(CLS_TBARNAV)) {
            return;
        }
        if (clst) {
            var tempItem = this.items[this.tbarEle.indexOf(clst)];
            itemObj = tempItem;
        }
        var eventArgs = { originalEvent: e, item: itemObj };
        var isClickBinded = itemObj && !isNullOrUndefined(itemObj.click) && typeof itemObj.click == 'object' ?
            !isNullOrUndefined(itemObj.click.observers) && itemObj.click.observers.length > 0 :
            !isNullOrUndefined(itemObj) && !isNullOrUndefined(itemObj.click);
        if (isClickBinded) {
            this.trigger('items[' + this.tbarEle.indexOf(clst) + '].click', eventArgs);
        }
        if (!eventArgs.cancel) {
            this.trigger('clicked', eventArgs, function (clickedArgs) {
                if (!isNullOrUndefined(_this.popObj) && isPopupElement && !clickedArgs.cancel && _this.overflowMode === 'Popup' &&
                    clickedArgs.item && clickedArgs.item.type !== 'Input') {
                    _this.popObj.hide({ name: 'FadeOut', duration: 100 });
                }
            });
        }
    };
    Toolbar.prototype.popupClickHandler = function (ele, popupNav, CLS_RTL) {
        var popObj = this.popObj;
        if (isVisible(popObj.element)) {
            popupNav.classList.remove(CLS_TBARNAVACT);
            popObj.hide({ name: 'FadeOut', duration: 100 });
        }
        else {
            if (ele.classList.contains(CLS_RTL)) {
                popObj.enableRtl = true;
                popObj.position = { X: 'left', Y: 'top' };
            }
            if (popObj.offsetX === 0 && !ele.classList.contains(CLS_RTL)) {
                popObj.enableRtl = false;
                popObj.position = { X: 'right', Y: 'top' };
            }
            if (this.overflowMode === 'Extended') {
                popObj.element.style.minHeight = '0px';
                popObj.width = this.getToolbarPopupWidth(this.element);
            }
            popObj.dataBind();
            popObj.refreshPosition();
            popObj.element.style.top = this.getElementOffsetY() + 'px';
            popupNav.classList.add(CLS_TBARNAVACT);
            popObj.show({ name: 'FadeIn', duration: 100 });
        }
    };
    Toolbar.prototype.getToolbarPopupWidth = function (ele) {
        var eleStyles = window.getComputedStyle(ele);
        return parseFloat(eleStyles.width) + ((parseFloat(eleStyles.borderRightWidth)) * 2);
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    Toolbar.prototype.render = function () {
        var _this = this;
        this.initialize();
        this.renderControl();
        this.wireEvents();
        this.clickEvent = this.docEvent.bind(this);
        this.scrollEvent = this.docEvent.bind(this);
        this.renderComplete();
        if (this.isReact && this.portals && this.portals.length > 0) {
            this.renderReactTemplates(function () {
                _this.refreshOverflow();
            });
        }
    };
    Toolbar.prototype.initialize = function () {
        var width = formatUnit(this.width);
        var height = formatUnit(this.height);
        if (Browser.info.name !== 'msie' || this.height !== 'auto' || this.overflowMode === 'MultiRow') {
            setStyleAttribute(this.element, { 'height': height });
        }
        setStyleAttribute(this.element, { 'width': width });
        var ariaAttr = {
            'role': 'toolbar', 'aria-disabled': 'false',
            'aria-orientation': !this.isVertical ? 'horizontal' : 'vertical'
        };
        attributes(this.element, ariaAttr);
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    };
    Toolbar.prototype.renderControl = function () {
        var ele = this.element;
        this.trgtEle = (ele.children.length > 0) ? ele.querySelector('div') : null;
        this.tbarAlgEle = { lefts: [], centers: [], rights: [] };
        this.renderItems();
        this.renderLayout();
    };
    Toolbar.prototype.renderLayout = function () {
        this.renderOverflowMode();
        if (this.tbarAlign) {
            this.itemPositioning();
        }
        if (this.popObj && this.popObj.element.childElementCount > 1 && this.checkPopupRefresh(this.element, this.popObj.element)) {
            this.popupRefresh(this.popObj.element, false);
        }
        this.separator();
    };
    Toolbar.prototype.itemsAlign = function (items, itemEleDom) {
        var innerItem;
        var innerPos;
        if (!this.tbarEle) {
            this.tbarEle = [];
        }
        for (var i = 0; i < items.length; i++) {
            innerItem = this.renderSubComponent(items[parseInt(i.toString(), 10)], i);
            if (this.tbarEle.indexOf(innerItem) === -1) {
                this.tbarEle.push(innerItem);
            }
            if (!this.tbarAlign) {
                this.tbarItemAlign(items[parseInt(i.toString(), 10)], itemEleDom, i);
            }
            innerPos = itemEleDom.querySelector('.e-toolbar-' + items[parseInt(i.toString(), 10)].align.toLowerCase());
            if (innerPos) {
                if (!(items[parseInt(i.toString(), 10)].showAlwaysInPopup && items[parseInt(i.toString(), 10)].overflow !== 'Show')) {
                    this.tbarAlgEle[(items[parseInt(i.toString(), 10)].align + 's').toLowerCase()].push(innerItem);
                }
                innerPos.appendChild(innerItem);
            }
            else {
                itemEleDom.appendChild(innerItem);
            }
        }
        if (this.isReact) {
            var portals = 'portals';
            this.notify('render-react-toolbar-template', this["" + portals]);
            this.renderReactTemplates();
        }
    };
    /**
     * @hidden
     * @returns {void}
     */
    Toolbar.prototype.changeOrientation = function () {
        var ele = this.element;
        if (this.isVertical) {
            ele.classList.remove(CLS_VERTICAL);
            this.isVertical = false;
            if (this.height === 'auto' || this.height === '100%') {
                ele.style.height = this.height;
            }
            ele.setAttribute('aria-orientation', 'horizontal');
        }
        else {
            ele.classList.add(CLS_VERTICAL);
            this.isVertical = true;
            ele.setAttribute('aria-orientation', 'vertical');
            setStyleAttribute(this.element, { 'height': formatUnit(this.height), 'width': formatUnit(this.width) });
        }
        this.destroyMode();
        this.refreshOverflow();
    };
    Toolbar.prototype.initScroll = function (element, innerItems) {
        if (!this.scrollModule && this.checkOverflow(element, innerItems[0])) {
            if (this.tbarAlign) {
                this.element.querySelector('.' + CLS_ITEMS + ' .' + CLS_TBARCENTER).removeAttribute('style');
            }
            if (this.isVertical) {
                this.scrollModule = new VScroll({ scrollStep: this.scrollStep, enableRtl: this.enableRtl }, innerItems[0]);
            }
            else {
                this.scrollModule = new HScroll({ scrollStep: this.scrollStep, enableRtl: this.enableRtl }, innerItems[0]);
            }
            if (this.cssClass) {
                addClass([innerItems[0]], this.cssClass.split(' '));
            }
            var scrollEle = this.scrollModule.element.querySelector('.' + CLS_HSCROLLBAR$1 + ', .' + 'e-vscroll-bar');
            if (scrollEle) {
                scrollEle.removeAttribute('tabindex');
            }
            this.remove(this.scrollModule.element, CLS_TBARPOS);
            setStyleAttribute(this.element, { overflow: 'hidden' });
        }
    };
    Toolbar.prototype.itemWidthCal = function (items) {
        var _this = this;
        var width = 0;
        var style;
        [].slice.call(selectAll('.' + CLS_ITEM, items)).forEach(function (el) {
            if (isVisible(el)) {
                style = window.getComputedStyle(el);
                width += _this.isVertical ? el.offsetHeight : el.offsetWidth;
                width += parseFloat(_this.isVertical ? style.marginTop : style.marginRight);
                width += parseFloat(_this.isVertical ? style.marginBottom : style.marginLeft);
            }
        });
        return width;
    };
    Toolbar.prototype.getScrollCntEle = function (innerItem) {
        var trgClass = (this.isVertical) ? '.e-vscroll-content' : '.e-hscroll-content';
        return innerItem.querySelector(trgClass);
    };
    Toolbar.prototype.checkOverflow = function (element, innerItem) {
        if (isNullOrUndefined(element) || isNullOrUndefined(innerItem) || !isVisible(element)) {
            return false;
        }
        var eleWidth = this.isVertical ? element.offsetHeight : element.offsetWidth;
        var itemWidth = this.isVertical ? innerItem.offsetHeight : innerItem.offsetWidth;
        if (this.tbarAlign || this.scrollModule || (eleWidth === itemWidth)) {
            itemWidth = this.itemWidthCal(this.scrollModule ? this.getScrollCntEle(innerItem) : innerItem);
        }
        var popNav = element.querySelector('.' + CLS_TBARNAV);
        var scrollNav = element.querySelector('.' + CLS_TBARSCRLNAV);
        var navEleWidth = 0;
        if (popNav) {
            navEleWidth = this.isVertical ? popNav.offsetHeight : popNav.offsetWidth;
        }
        else if (scrollNav) {
            navEleWidth = this.isVertical ? (scrollNav.offsetHeight * (2)) : (scrollNav.offsetWidth * 2);
        }
        if (eleWidth >= itemWidth && scrollNav) {
            return false;
        }
        else if (itemWidth > eleWidth - navEleWidth) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Refresh the whole Toolbar component without re-rendering.
     * - It is used to manually refresh the Toolbar overflow modes such as scrollable, popup, multi row, and extended.
     * - It will refresh the Toolbar component after loading items dynamically.
     *
     * @returns {void}.
     */
    Toolbar.prototype.refreshOverflow = function () {
        this.resize();
    };
    Toolbar.prototype.toolbarAlign = function (innerItems) {
        if (this.tbarAlign) {
            this.add(innerItems, CLS_TBARPOS);
            this.itemPositioning();
        }
    };
    Toolbar.prototype.renderOverflowMode = function () {
        var ele = this.element;
        var innerItems = ele.querySelector('.' + CLS_ITEMS);
        var priorityCheck = this.popupPriCount > 0;
        if (ele && ele.children.length > 0) {
            this.offsetWid = ele.offsetWidth;
            this.remove(this.element, 'e-toolpop');
            if (Browser.info.name === 'msie' && this.height === 'auto') {
                ele.style.height = '';
            }
            switch (this.overflowMode) {
                case 'Scrollable':
                    if (isNullOrUndefined(this.scrollModule)) {
                        this.initScroll(ele, [].slice.call(ele.getElementsByClassName(CLS_ITEMS)));
                    }
                    break;
                case 'Popup':
                    this.add(this.element, 'e-toolpop');
                    if (this.tbarAlign) {
                        this.removePositioning();
                    }
                    if (this.checkOverflow(ele, innerItems) || priorityCheck) {
                        this.setOverflowAttributes(ele);
                    }
                    this.toolbarAlign(innerItems);
                    break;
                case 'MultiRow':
                    this.add(innerItems, CLS_MULTIROW);
                    if (this.checkOverflow(ele, innerItems) && this.tbarAlign) {
                        this.removePositioning();
                        this.add(innerItems, CLS_MULTIROWPOS);
                    }
                    if (ele.style.overflow === 'hidden') {
                        ele.style.overflow = '';
                    }
                    if (Browser.info.name === 'msie' || ele.style.height !== 'auto') {
                        ele.style.height = 'auto';
                    }
                    break;
                case 'Extended':
                    this.add(this.element, CLS_EXTEANDABLE_TOOLBAR);
                    if (this.checkOverflow(ele, innerItems) || priorityCheck) {
                        if (this.tbarAlign) {
                            this.removePositioning();
                        }
                        this.setOverflowAttributes(ele);
                    }
                    this.toolbarAlign(innerItems);
            }
        }
    };
    Toolbar.prototype.setOverflowAttributes = function (ele) {
        this.createPopupEle(ele, [].slice.call(selectAll('.' + CLS_ITEMS + ' .' + CLS_ITEM, ele)));
        var ariaAttr = {
            'tabindex': '0', 'role': 'button', 'aria-haspopup': 'true',
            'aria-label': 'overflow'
        };
        attributes(this.element.querySelector('.' + CLS_TBARNAV), ariaAttr);
    };
    Toolbar.prototype.separator = function () {
        var element = this.element;
        var eleItem = [].slice.call(element.querySelectorAll('.' + CLS_SEPARATOR));
        var multiVar = element.querySelector('.' + CLS_MULTIROW_SEPARATOR);
        var extendVar = element.querySelector('.' + CLS_EXTENDABLE_SEPARATOR);
        var eleInlineItem = this.overflowMode === 'MultiRow' ? multiVar : extendVar;
        if (eleInlineItem !== null) {
            if (this.overflowMode === 'MultiRow') {
                eleInlineItem.classList.remove(CLS_MULTIROW_SEPARATOR);
            }
            else if (this.overflowMode === 'Extended') {
                eleInlineItem.classList.remove(CLS_EXTENDABLE_SEPARATOR);
            }
        }
        for (var i = 0; i <= eleItem.length - 1; i++) {
            if (eleItem[parseInt(i.toString(), 10)].offsetLeft < 30 && eleItem[parseInt(i.toString(), 10)].offsetLeft !== 0) {
                if (this.overflowMode === 'MultiRow') {
                    eleItem[parseInt(i.toString(), 10)].classList.add(CLS_MULTIROW_SEPARATOR);
                }
                else if (this.overflowMode === 'Extended') {
                    eleItem[parseInt(i.toString(), 10)].classList.add(CLS_EXTENDABLE_SEPARATOR);
                }
            }
        }
    };
    Toolbar.prototype.createPopupEle = function (ele, innerEle) {
        var innerNav = ele.querySelector('.' + CLS_TBARNAV);
        var vertical = this.isVertical;
        if (!innerNav) {
            this.createPopupIcon(ele);
        }
        innerNav = ele.querySelector('.' + CLS_TBARNAV);
        var innerNavDom = (vertical ? innerNav.offsetHeight : innerNav.offsetWidth);
        var eleWidth = ((vertical ? ele.offsetHeight : ele.offsetWidth) - (innerNavDom));
        this.element.classList.remove('e-rtl');
        setStyleAttribute(this.element, { direction: 'initial' });
        this.checkPriority(ele, innerEle, eleWidth, true);
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        this.element.style.removeProperty('direction');
        this.createPopup();
    };
    Toolbar.prototype.pushingPoppedEle = function (tbarObj, popupPri, ele, eleHeight, sepHeight) {
        var element = tbarObj.element;
        var poppedEle = [].slice.call(selectAll('.' + CLS_POPUP, element.querySelector('.' + CLS_ITEMS)));
        var nodes = selectAll('.' + CLS_TBAROVERFLOW, ele);
        var nodeIndex = 0;
        var nodePri = 0;
        poppedEle.forEach(function (el, index) {
            nodes = selectAll('.' + CLS_TBAROVERFLOW, ele);
            if (el.classList.contains(CLS_TBAROVERFLOW) && nodes.length > 0) {
                if (tbarObj.tbResize && nodes.length > index) {
                    ele.insertBefore(el, nodes[parseInt(index.toString(), 10)]);
                    ++nodePri;
                }
                else {
                    ele.insertBefore(el, ele.children[nodes.length]);
                    ++nodePri;
                }
            }
            else if (el.classList.contains(CLS_TBAROVERFLOW)) {
                ele.insertBefore(el, ele.firstChild);
                ++nodePri;
            }
            else if (tbarObj.tbResize && el.classList.contains(CLS_POPOVERFLOW) && ele.children.length > 0 && nodes.length === 0) {
                ele.insertBefore(el, ele.firstChild);
                ++nodePri;
            }
            else if (el.classList.contains(CLS_POPOVERFLOW)) {
                popupPri.push(el);
            }
            else if (tbarObj.tbResize) {
                ele.insertBefore(el, ele.childNodes[nodeIndex + nodePri]);
                ++nodeIndex;
            }
            else {
                ele.appendChild(el);
            }
            if (el.classList.contains(CLS_SEPARATOR)) {
                setStyleAttribute(el, { display: '', height: sepHeight + 'px' });
            }
            else {
                setStyleAttribute(el, { display: '', height: eleHeight + 'px' });
            }
        });
        popupPri.forEach(function (el) {
            ele.appendChild(el);
        });
        var tbarEle = selectAll('.' + CLS_ITEM, element.querySelector('.' + CLS_ITEMS));
        for (var i = tbarEle.length - 1; i >= 0; i--) {
            var tbarElement = tbarEle[parseInt(i.toString(), 10)];
            if (tbarElement.classList.contains(CLS_SEPARATOR) && this.overflowMode !== 'Extended') {
                setStyleAttribute(tbarElement, { display: 'none' });
            }
            else {
                break;
            }
        }
    };
    Toolbar.prototype.createPopup = function () {
        var element = this.element;
        var sepHeight;
        var sepItem;
        if (this.overflowMode === 'Extended') {
            sepItem = element.querySelector('.' + CLS_SEPARATOR);
            sepHeight =
                (element.style.height === 'auto' || element.style.height === '') ? null : (sepItem && sepItem.offsetHeight);
        }
        var eleItem = element.querySelector('.' + CLS_ITEM + ':not(.' + CLS_SEPARATOR + '):not(.' + CLS_POPUP + ')');
        var eleHeight = (element.style.height === 'auto' || element.style.height === '') ? null : (eleItem && eleItem.offsetHeight);
        var ele;
        var popupPri = [];
        if (select('#' + element.id + '_popup.' + CLS_POPUPCLASS, element)) {
            ele = select('#' + element.id + '_popup.' + CLS_POPUPCLASS, element);
        }
        else {
            var extendEle = this.createElement('div', {
                id: element.id + '_popup', className: CLS_POPUPCLASS + ' ' + CLS_EXTENDABLECLASS
            });
            var popupEle = this.createElement('div', { id: element.id + '_popup', className: CLS_POPUPCLASS });
            ele = this.overflowMode === 'Extended' ? extendEle : popupEle;
        }
        this.pushingPoppedEle(this, popupPri, ele, eleHeight, sepHeight);
        this.popupInit(element, ele);
    };
    Toolbar.prototype.getElementOffsetY = function () {
        return (this.overflowMode === 'Extended' && window.getComputedStyle(this.element).getPropertyValue('box-sizing') === 'border-box' ?
            this.element.clientHeight : this.element.offsetHeight);
    };
    Toolbar.prototype.popupInit = function (element, ele) {
        if (!this.popObj) {
            element.appendChild(ele);
            if (this.cssClass) {
                addClass([ele], this.cssClass.split(' '));
            }
            setStyleAttribute(this.element, { overflow: '' });
            var popup = new Popup(null, {
                relateTo: this.element,
                offsetY: (this.isVertical) ? 0 : this.getElementOffsetY(),
                enableRtl: this.enableRtl,
                open: this.popupOpen.bind(this),
                close: this.popupClose.bind(this),
                collision: { Y: this.enableCollision ? 'flip' : 'none' },
                position: this.enableRtl ? { X: 'left', Y: 'top' } : { X: 'right', Y: 'top' }
            });
            if (this.overflowMode === 'Extended') {
                popup.width = this.getToolbarPopupWidth(this.element);
                popup.offsetX = 0;
            }
            popup.appendTo(ele);
            document.addEventListener('scroll', this.clickEvent);
            document.addEventListener('click', this.scrollEvent);
            if (this.overflowMode !== 'Extended') {
                popup.element.style.maxHeight = popup.element.offsetHeight + 'px';
            }
            if (this.isVertical) {
                popup.element.style.visibility = 'hidden';
            }
            if (this.isExtendedOpen) {
                var popupNav = this.element.querySelector('.' + CLS_TBARNAV);
                popupNav.classList.add(CLS_TBARNAVACT);
                classList(popupNav.firstElementChild, [CLS_POPUPICON], [CLS_POPUPDOWN]);
                this.element.querySelector('.' + CLS_EXTENDABLECLASS).classList.add(CLS_POPUPOPEN);
            }
            else {
                popup.hide();
            }
            this.popObj = popup;
        }
        else if (this.overflowMode !== 'Extended') {
            var popupEle = this.popObj.element;
            setStyleAttribute(popupEle, { maxHeight: '', display: 'block' });
            setStyleAttribute(popupEle, { maxHeight: popupEle.offsetHeight + 'px', display: '' });
        }
    };
    Toolbar.prototype.tbarPopupHandler = function (isOpen) {
        if (this.overflowMode === 'Extended') {
            if (isOpen) {
                this.add(this.element, CLS_EXTENDEDPOPOPEN);
            }
            else {
                this.remove(this.element, CLS_EXTENDEDPOPOPEN);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Toolbar.prototype.popupOpen = function (e) {
        var popObj = this.popObj;
        if (!this.isVertical) {
            popObj.offsetY = this.getElementOffsetY();
            popObj.dataBind();
        }
        var popupEle = this.popObj.element;
        var toolEle = this.popObj.element.parentElement;
        var popupNav = toolEle.querySelector('.' + CLS_TBARNAV);
        popupNav.setAttribute('aria-expanded', 'true');
        if (this.overflowMode === 'Extended') {
            popObj.element.style.minHeight = '';
        }
        else {
            setStyleAttribute(popObj.element, { height: 'auto', maxHeight: '' });
            popObj.element.style.maxHeight = popObj.element.offsetHeight + 'px';
        }
        var popupElePos = popupEle.offsetTop + popupEle.offsetHeight + calculatePosition(toolEle).top;
        var popIcon = popupNav.firstElementChild;
        popupNav.classList.add(CLS_TBARNAVACT);
        classList(popIcon, [CLS_POPUPICON], [CLS_POPUPDOWN]);
        this.tbarPopupHandler(true);
        var scrollVal = isNullOrUndefined(window.scrollY) ? 0 : window.scrollY;
        if (!this.isVertical && ((window.innerHeight + scrollVal) < popupElePos) && (this.element.offsetTop < popupEle.offsetHeight)) {
            var overflowHeight = (popupEle.offsetHeight - ((popupElePos - window.innerHeight - scrollVal) + 5));
            popObj.height = overflowHeight + 'px';
            for (var i = 0; i <= popupEle.childElementCount; i++) {
                var ele = popupEle.children[parseInt(i.toString(), 10)];
                if (ele.offsetTop + ele.offsetHeight > overflowHeight) {
                    overflowHeight = ele.offsetTop;
                    break;
                }
            }
            if (this.overflowMode !== 'Extended') {
                setStyleAttribute(popObj.element, { maxHeight: overflowHeight + 'px' });
            }
        }
        else if (this.isVertical && this.overflowMode !== 'Extended') {
            var tbEleData = this.element.getBoundingClientRect();
            setStyleAttribute(popObj.element, { maxHeight: (tbEleData.top + this.element.offsetHeight) + 'px', bottom: 0, visibility: '' });
        }
        if (popObj) {
            var popupOffset = popupEle.getBoundingClientRect();
            if (popupOffset.right > document.documentElement.clientWidth && popupOffset.width > toolEle.getBoundingClientRect().width) {
                popObj.collision = { Y: 'none' };
                popObj.dataBind();
            }
            popObj.refreshPosition();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Toolbar.prototype.popupClose = function (e) {
        var element = this.element;
        var popupNav = element.querySelector('.' + CLS_TBARNAV);
        popupNav.setAttribute('aria-expanded', 'false');
        var popIcon = popupNav.firstElementChild;
        popupNav.classList.remove(CLS_TBARNAVACT);
        classList(popIcon, [CLS_POPUPDOWN], [CLS_POPUPICON]);
        this.tbarPopupHandler(false);
    };
    Toolbar.prototype.checkPriority = function (ele, inEle, eleWidth, pre) {
        var popPriority = this.popupPriCount > 0;
        var len = inEle.length;
        var eleWid = eleWidth;
        var eleOffset;
        var checkoffset;
        var sepCheck = 0;
        var itemCount = 0;
        var itemPopCount = 0;
        var checkClass = function (ele, val) {
            var rVal = false;
            val.forEach(function (cls) {
                if (ele.classList.contains(cls)) {
                    rVal = true;
                }
            });
            return rVal;
        };
        for (var i = len - 1; i >= 0; i--) {
            var mrgn = void 0;
            var compuStyle = window.getComputedStyle(inEle[parseInt(i.toString(), 10)]);
            if (this.isVertical) {
                mrgn = parseFloat((compuStyle).marginTop);
                mrgn += parseFloat((compuStyle).marginBottom);
            }
            else {
                mrgn = parseFloat((compuStyle).marginRight);
                mrgn += parseFloat((compuStyle).marginLeft);
            }
            var fstEleCheck = inEle[parseInt(i.toString(), 10)] === this.tbarEle[0];
            if (fstEleCheck) {
                this.tbarEleMrgn = mrgn;
            }
            eleOffset = this.isVertical ? inEle[parseInt(i.toString(), 10)].offsetHeight : inEle[parseInt(i.toString(), 10)].offsetWidth;
            var eleWid_1 = fstEleCheck ? (eleOffset + mrgn) : eleOffset;
            if (checkClass(inEle[parseInt(i.toString(), 10)], [CLS_POPPRI]) && popPriority) {
                inEle[parseInt(i.toString(), 10)].classList.add(CLS_POPUP);
                if (this.isVertical) {
                    setStyleAttribute(inEle[parseInt(i.toString(), 10)], { display: 'none', minHeight: eleWid_1 + 'px' });
                }
                else {
                    setStyleAttribute(inEle[parseInt(i.toString(), 10)], { display: 'none', minWidth: eleWid_1 + 'px' });
                }
                itemPopCount++;
            }
            if (this.isVertical) {
                checkoffset =
                    (inEle[parseInt(i.toString(), 10)].offsetTop + inEle[parseInt(i.toString(), 10)].offsetHeight + mrgn) > eleWidth;
            }
            else {
                checkoffset =
                    (inEle[parseInt(i.toString(), 10)].offsetLeft + inEle[parseInt(i.toString(), 10)].offsetWidth + mrgn) > eleWidth;
            }
            if (checkoffset) {
                if (inEle[parseInt(i.toString(), 10)].classList.contains(CLS_SEPARATOR)) {
                    if (this.overflowMode === 'Extended') {
                        var sepEle = inEle[parseInt(i.toString(), 10)];
                        if (checkClass(sepEle, [CLS_SEPARATOR, CLS_TBARIGNORE])) {
                            inEle[parseInt(i.toString(), 10)].classList.add(CLS_POPUP);
                            itemPopCount++;
                        }
                        itemCount++;
                    }
                    else if (this.overflowMode === 'Popup') {
                        if (sepCheck > 0 && itemCount === itemPopCount) {
                            var sepEle = inEle[i + itemCount + (sepCheck - 1)];
                            if (checkClass(sepEle, [CLS_SEPARATOR, CLS_TBARIGNORE])) {
                                setStyleAttribute(sepEle, { display: 'none' });
                            }
                        }
                        sepCheck++;
                        itemCount = 0;
                        itemPopCount = 0;
                    }
                }
                else {
                    itemCount++;
                }
                if (inEle[parseInt(i.toString(), 10)].classList.contains(CLS_TBAROVERFLOW) && pre) {
                    eleWidth -= ((this.isVertical ? inEle[parseInt(i.toString(), 10)].offsetHeight :
                        inEle[parseInt(i.toString(), 10)].offsetWidth) + (mrgn));
                }
                else if (!checkClass(inEle[parseInt(i.toString(), 10)], [CLS_SEPARATOR, CLS_TBARIGNORE])) {
                    inEle[parseInt(i.toString(), 10)].classList.add(CLS_POPUP);
                    if (this.isVertical) {
                        setStyleAttribute(inEle[parseInt(i.toString(), 10)], { display: 'none', minHeight: eleWid_1 + 'px' });
                    }
                    else {
                        setStyleAttribute(inEle[parseInt(i.toString(), 10)], { display: 'none', minWidth: eleWid_1 + 'px' });
                    }
                    itemPopCount++;
                }
                else {
                    eleWidth -= ((this.isVertical ? inEle[parseInt(i.toString(), 10)].offsetHeight :
                        inEle[parseInt(i.toString(), 10)].offsetWidth) + (mrgn));
                }
            }
        }
        if (pre) {
            var popedEle = selectAll('.' + CLS_ITEM + ':not(.' + CLS_POPUP + ')', this.element);
            this.checkPriority(ele, popedEle, eleWid, false);
        }
    };
    Toolbar.prototype.createPopupIcon = function (element) {
        var id = element.id.concat('_nav');
        var className = 'e-' + element.id.concat('_nav ' + CLS_POPUPNAV);
        className = this.overflowMode === 'Extended' ? className + ' ' + CLS_EXTENDPOPUP : className;
        var nav = this.createElement('div', { id: id, className: className });
        if (Browser.info.name === 'msie' || Browser.info.name === 'edge') {
            nav.classList.add('e-ie-align');
        }
        var navItem = this.createElement('div', { className: CLS_POPUPDOWN + ' e-icons' });
        nav.appendChild(navItem);
        nav.setAttribute('tabindex', '0');
        nav.setAttribute('role', 'button');
        element.appendChild(nav);
    };
    // eslint-disable-next-line max-len
    Toolbar.prototype.tbarPriRef = function (inEle, indx, sepPri, el, des, elWid, wid, ig, eleStyles) {
        var ignoreCount = ig;
        var popEle = this.popObj.element;
        var query = '.' + CLS_ITEM + ':not(.' + CLS_SEPARATOR + '):not(.' + CLS_TBAROVERFLOW + ')';
        var priEleCnt = selectAll('.' + CLS_POPUP + ':not(.' + CLS_TBAROVERFLOW + ')', popEle).length;
        var checkClass = function (ele, val) {
            return ele.classList.contains(val);
        };
        if (selectAll(query, inEle).length === 0) {
            var eleSep = inEle.children[indx - (indx - sepPri) - 1];
            var ignoreCheck = (!isNullOrUndefined(eleSep) && checkClass(eleSep, CLS_TBARIGNORE));
            if ((!isNullOrUndefined(eleSep) && checkClass(eleSep, CLS_SEPARATOR) && !isVisible(eleSep)) || ignoreCheck) {
                eleSep.style.display = 'unset';
                var eleSepWidth = eleSep.offsetWidth + (parseFloat(window.getComputedStyle(eleSep).marginRight) * 2);
                var prevSep = eleSep.previousElementSibling;
                if ((elWid + eleSepWidth) < wid || des) {
                    inEle.insertBefore(el, inEle.children[(indx + ignoreCount) - (indx - sepPri)]);
                    if (!isNullOrUndefined(prevSep)) {
                        prevSep.style.display = '';
                    }
                }
                else {
                    setStyleAttribute(el, eleStyles);
                    if (prevSep.classList.contains(CLS_SEPARATOR)) {
                        prevSep.style.display = 'none';
                    }
                }
                eleSep.style.display = '';
            }
            else {
                inEle.insertBefore(el, inEle.children[(indx + ignoreCount) - (indx - sepPri)]);
            }
        }
        else {
            inEle.insertBefore(el, inEle.children[(indx + ignoreCount) - priEleCnt]);
        }
    };
    Toolbar.prototype.popupRefresh = function (popupEle, destroy) {
        var _this = this;
        var ele = this.element;
        var isVer = this.isVertical;
        var innerEle = ele.querySelector('.' + CLS_ITEMS);
        var popNav = ele.querySelector('.' + CLS_TBARNAV);
        if (isNullOrUndefined(popNav)) {
            return;
        }
        innerEle.removeAttribute('style');
        popupEle.style.display = 'block';
        var dimension;
        if (isVer) {
            dimension = ele.offsetHeight - (popNav.offsetHeight + innerEle.offsetHeight);
        }
        else {
            dimension = ele.offsetWidth - (popNav.offsetWidth + innerEle.offsetWidth);
        }
        var popupEleWidth = 0;
        [].slice.call(popupEle.children).forEach(function (el) {
            popupEleWidth += _this.popupEleWidth(el);
            setStyleAttribute(el, { 'position': '' });
        });
        if ((dimension + (isVer ? popNav.offsetHeight : popNav.offsetWidth)) > (popupEleWidth) && this.popupPriCount === 0) {
            destroy = true;
        }
        this.popupEleRefresh(dimension, popupEle, destroy);
        popupEle.style.display = '';
        if (popupEle.children.length === 0 && popNav && this.popObj) {
            detach(popNav);
            popNav = null;
            this.popObj.destroy();
            detach(this.popObj.element);
            this.popObj = null;
        }
    };
    Toolbar.prototype.ignoreEleFetch = function (index, innerEle) {
        var ignoreEle = [].slice.call(innerEle.querySelectorAll('.' + CLS_TBARIGNORE));
        var ignoreInx = [];
        var count = 0;
        if (ignoreEle.length > 0) {
            ignoreEle.forEach(function (ele) {
                ignoreInx.push([].slice.call(innerEle.children).indexOf(ele));
            });
        }
        else {
            return 0;
        }
        ignoreInx.forEach(function (val) {
            if (val <= index) {
                count++;
            }
        });
        return count;
    };
    Toolbar.prototype.checkPopupRefresh = function (root, popEle) {
        popEle.style.display = 'block';
        var elWid = this.popupEleWidth(popEle.firstElementChild);
        popEle.firstElementChild.style.removeProperty('Position');
        var tbarWidth = root.offsetWidth - root.querySelector('.' + CLS_TBARNAV).offsetWidth;
        var tbarItemsWid = root.querySelector('.' + CLS_ITEMS).offsetWidth;
        popEle.style.removeProperty('display');
        if (tbarWidth > (elWid + tbarItemsWid)) {
            return true;
        }
        return false;
    };
    Toolbar.prototype.popupEleWidth = function (el) {
        el.style.position = 'absolute';
        var elWidth = this.isVertical ? el.offsetHeight : el.offsetWidth;
        var btnText = el.querySelector('.' + CLS_TBARBTNTEXT);
        if (el.classList.contains('e-tbtn-align') || el.classList.contains(CLS_TBARTEXT)) {
            var btn = el.children[0];
            if (!isNullOrUndefined(btnText) && el.classList.contains(CLS_TBARTEXT)) {
                btnText.style.display = 'none';
            }
            else if (!isNullOrUndefined(btnText) && el.classList.contains(CLS_POPUPTEXT)) {
                btnText.style.display = 'block';
            }
            btn.style.minWidth = '0%';
            elWidth = parseFloat(!this.isVertical ? el.style.minWidth : el.style.minHeight);
            btn.style.minWidth = '';
            btn.style.minHeight = '';
            if (!isNullOrUndefined(btnText)) {
                btnText.style.display = '';
            }
        }
        return elWidth;
    };
    Toolbar.prototype.popupEleRefresh = function (width, popupEle, destroy) {
        var popPriority = this.popupPriCount > 0;
        var eleSplice = this.tbarEle;
        var priEleCnt;
        var index;
        var innerEle = this.element.querySelector('.' + CLS_ITEMS);
        var ignoreCount = 0;
        var _loop_1 = function (el) {
            if (el.classList.contains(CLS_POPPRI) && popPriority && !destroy) {
                return "continue";
            }
            var elWidth = this_1.popupEleWidth(el);
            if (el === this_1.tbarEle[0]) {
                elWidth += this_1.tbarEleMrgn;
            }
            el.style.position = '';
            if (elWidth < width || destroy) {
                var inlineStyles = {
                    minWidth: el.style.minWidth, height: el.style.height,
                    minHeight: el.style.minHeight
                };
                setStyleAttribute(el, { minWidth: '', height: '', minHeight: '' });
                if (!el.classList.contains(CLS_POPOVERFLOW)) {
                    el.classList.remove(CLS_POPUP);
                }
                index = this_1.tbarEle.indexOf(el);
                if (this_1.tbarAlign) {
                    var pos = this_1.items[parseInt(index.toString(), 10)].align;
                    index = this_1.tbarAlgEle[(pos + 's').toLowerCase()].indexOf(el);
                    eleSplice = this_1.tbarAlgEle[(pos + 's').toLowerCase()];
                    innerEle = this_1.element.querySelector('.' + CLS_ITEMS + ' .' + 'e-toolbar-' + pos.toLowerCase());
                }
                var sepBeforePri_1 = 0;
                if (this_1.overflowMode !== 'Extended') {
                    eleSplice.slice(0, index).forEach(function (el) {
                        if (el.classList.contains(CLS_TBAROVERFLOW) || el.classList.contains(CLS_SEPARATOR)) {
                            if (el.classList.contains(CLS_SEPARATOR)) {
                                el.style.display = '';
                                width -= el.offsetWidth;
                            }
                            sepBeforePri_1++;
                        }
                    });
                }
                ignoreCount = this_1.ignoreEleFetch(index, innerEle);
                if (el.classList.contains(CLS_TBAROVERFLOW)) {
                    this_1.tbarPriRef(innerEle, index, sepBeforePri_1, el, destroy, elWidth, width, ignoreCount, inlineStyles);
                    width -= el.offsetWidth;
                }
                else if (index === 0) {
                    innerEle.insertBefore(el, innerEle.firstChild);
                    width -= el.offsetWidth;
                }
                else {
                    priEleCnt = selectAll('.' + CLS_TBAROVERFLOW, this_1.popObj.element).length;
                    innerEle.insertBefore(el, innerEle.children[(index + ignoreCount) - priEleCnt]);
                    width -= el.offsetWidth;
                }
                el.style.height = '';
            }
            else {
                return "break";
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = [].slice.call(popupEle.children); _i < _a.length; _i++) {
            var el = _a[_i];
            var state_1 = _loop_1(el);
            if (state_1 === "break")
                break;
        }
        var checkOverflow = this.checkOverflow(this.element, this.element.getElementsByClassName(CLS_ITEMS)[0]);
        if (checkOverflow && !destroy) {
            this.renderOverflowMode();
        }
    };
    Toolbar.prototype.removePositioning = function () {
        var item = this.element.querySelector('.' + CLS_ITEMS);
        if (isNullOrUndefined(item) || !item.classList.contains(CLS_TBARPOS)) {
            return;
        }
        this.remove(item, CLS_TBARPOS);
        var innerItem = [].slice.call(item.childNodes);
        innerItem[1].removeAttribute('style');
        innerItem[2].removeAttribute('style');
    };
    Toolbar.prototype.refreshPositioning = function () {
        var item = this.element.querySelector('.' + CLS_ITEMS);
        this.add(item, CLS_TBARPOS);
        this.itemPositioning();
    };
    Toolbar.prototype.itemPositioning = function () {
        var item = this.element.querySelector('.' + CLS_ITEMS);
        var margin;
        if (isNullOrUndefined(item) || !item.classList.contains(CLS_TBARPOS)) {
            return;
        }
        var popupNav = this.element.querySelector('.' + CLS_TBARNAV);
        var innerItem;
        if (this.scrollModule) {
            var trgClass = (this.isVertical) ? CLS_VSCROLLCNT : CLS_HSCROLLCNT;
            innerItem = [].slice.call(item.querySelector('.' + trgClass).children);
        }
        else {
            innerItem = [].slice.call(item.childNodes);
        }
        if (this.isVertical) {
            margin = innerItem[0].offsetHeight + innerItem[2].offsetHeight;
        }
        else {
            margin = innerItem[0].offsetWidth + innerItem[2].offsetWidth;
        }
        var tbarWid = this.isVertical ? this.element.offsetHeight : this.element.offsetWidth;
        if (popupNav) {
            tbarWid -= (this.isVertical ? popupNav.offsetHeight : popupNav.offsetWidth);
            var popWid = (this.isVertical ? popupNav.offsetHeight : popupNav.offsetWidth) + 'px';
            innerItem[2].removeAttribute('style');
            if (this.isVertical) {
                if (this.enableRtl) {
                    innerItem[2].style.top = popWid;
                }
                else {
                    innerItem[2].style.bottom = popWid;
                }
            }
            else {
                if (this.enableRtl) {
                    innerItem[2].style.left = popWid;
                }
                else {
                    innerItem[2].style.right = popWid;
                }
            }
        }
        if (tbarWid <= margin) {
            return;
        }
        var value = (((tbarWid - margin)) - (!this.isVertical ? innerItem[1].offsetWidth : innerItem[1].offsetHeight)) / 2;
        innerItem[1].removeAttribute('style');
        var mrgn = ((!this.isVertical ? innerItem[0].offsetWidth : innerItem[0].offsetHeight) + value) + 'px';
        if (this.isVertical) {
            if (this.enableRtl) {
                innerItem[1].style.marginBottom = mrgn;
            }
            else {
                innerItem[1].style.marginTop = mrgn;
            }
        }
        else {
            if (this.enableRtl) {
                innerItem[1].style.marginRight = mrgn;
            }
            else {
                innerItem[1].style.marginLeft = mrgn;
            }
        }
    };
    Toolbar.prototype.tbarItemAlign = function (item, itemEle, pos) {
        var _this = this;
        if (item.showAlwaysInPopup && item.overflow !== 'Show') {
            return;
        }
        var alignDiv = [];
        alignDiv.push(this.createElement('div', { className: CLS_TBARLEFT, attrs: { role: 'group' } }));
        alignDiv.push(this.createElement('div', { className: CLS_TBARCENTER, attrs: { role: 'group' } }));
        alignDiv.push(this.createElement('div', { className: CLS_TBARRIGHT, attrs: { role: 'group' } }));
        if (pos === 0 && item.align !== 'Left') {
            alignDiv.forEach(function (ele) {
                itemEle.appendChild(ele);
            });
            this.tbarAlign = true;
            this.add(itemEle, CLS_TBARPOS);
        }
        else if (item.align !== 'Left') {
            var alignEle = itemEle.childNodes;
            var leftAlign_1 = alignDiv[0];
            [].slice.call(alignEle).forEach(function (el) {
                _this.tbarAlgEle.lefts.push(el);
                leftAlign_1.appendChild(el);
            });
            itemEle.appendChild(leftAlign_1);
            itemEle.appendChild(alignDiv[1]);
            itemEle.appendChild(alignDiv[2]);
            this.tbarAlign = true;
            this.add(itemEle, CLS_TBARPOS);
        }
    };
    Toolbar.prototype.ctrlTemplate = function () {
        var _this = this;
        this.ctrlTem = this.trgtEle.cloneNode(true);
        this.add(this.trgtEle, CLS_ITEMS);
        this.tbarEle = [];
        var innerEle = [].slice.call(this.trgtEle.children);
        innerEle.forEach(function (ele) {
            if (ele.tagName === 'DIV') {
                _this.tbarEle.push(ele);
                if (!isNullOrUndefined(ele.firstElementChild)) {
                    ele.firstElementChild.setAttribute('aria-disabled', 'false');
                }
                _this.add(ele, CLS_ITEM);
            }
        });
    };
    Toolbar.prototype.renderItems = function () {
        var ele = this.element;
        var items = this.items;
        if (this.trgtEle != null) {
            this.ctrlTemplate();
        }
        else if (ele && items.length > 0) {
            var itemEleDom = void 0;
            if (ele && ele.children.length > 0) {
                itemEleDom = ele.querySelector('.' + CLS_ITEMS);
            }
            if (!itemEleDom) {
                itemEleDom = this.createElement('div', { className: CLS_ITEMS });
            }
            this.itemsAlign(items, itemEleDom);
            ele.appendChild(itemEleDom);
        }
    };
    Toolbar.prototype.setAttr = function (attr, element) {
        var key = Object.keys(attr);
        var keyVal;
        for (var i = 0; i < key.length; i++) {
            keyVal = key[parseInt(i.toString(), 10)];
            if (keyVal === 'class') {
                this.add(element, attr["" + keyVal]);
            }
            else {
                element.setAttribute(keyVal, attr["" + keyVal]);
            }
        }
    };
    /**
     * Enables or disables the specified Toolbar item.
     *
     * @param  {number|HTMLElement|NodeList} items - DOM element or an array of items to be enabled or disabled.
     * @param  {boolean} isEnable  - Boolean value that determines whether the command should be enabled or disabled.
     * By default, `isEnable` is set to true.
     * @returns {void}.
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        var elements = items;
        var len = elements.length;
        var ele;
        if (isNullOrUndefined(isEnable)) {
            isEnable = true;
        }
        var enable = function (isEnable, ele) {
            if (isEnable) {
                ele.classList.remove(CLS_DISABLE$2);
                if (!isNullOrUndefined(ele.firstElementChild)) {
                    ele.firstElementChild.setAttribute('aria-disabled', 'false');
                }
            }
            else {
                ele.classList.add(CLS_DISABLE$2);
                if (!isNullOrUndefined(ele.firstElementChild)) {
                    ele.firstElementChild.setAttribute('aria-disabled', 'true');
                }
            }
        };
        if (!isNullOrUndefined(len) && len >= 1) {
            for (var a = 0, element = [].slice.call(elements); a < len; a++) {
                var itemElement = element[parseInt(a.toString(), 10)];
                if (typeof (itemElement) === 'number') {
                    ele = this.getElementByIndex(itemElement);
                    if (isNullOrUndefined(ele)) {
                        return;
                    }
                    else {
                        elements[parseInt(a.toString(), 10)] = ele;
                    }
                }
                else {
                    ele = itemElement;
                }
                enable(isEnable, ele);
            }
            if (isEnable) {
                removeClass(elements, CLS_DISABLE$2);
            }
            else {
                addClass(elements, CLS_DISABLE$2);
            }
        }
        else {
            if (typeof (elements) === 'number') {
                ele = this.getElementByIndex(elements);
                if (isNullOrUndefined(ele)) {
                    return;
                }
            }
            else {
                ele = items;
            }
            enable(isEnable, ele);
        }
    };
    Toolbar.prototype.getElementByIndex = function (index) {
        if (this.tbarEle[parseInt(index.toString(), 10)]) {
            return this.tbarEle[parseInt(index.toString(), 10)];
        }
        return null;
    };
    /**
     * Adds new items to the Toolbar that accepts an array as Toolbar items.
     *
     * @param  {ItemModel[]} items - DOM element or an array of items to be added to the Toolbar.
     * @param  {number} index - Number value that determines where the command is to be added. By default, index is 0.
     * @returns {void}.
     */
    Toolbar.prototype.addItems = function (items, index) {
        var innerItems;
        this.extendedOpen();
        var itemsDiv = this.element.querySelector('.' + CLS_ITEMS);
        if (isNullOrUndefined(itemsDiv)) {
            this.itemsRerender(items);
            return;
        }
        var innerEle;
        var itemAgn = 'Left';
        if (isNullOrUndefined(index)) {
            index = 0;
        }
        items.forEach(function (e) {
            if (!isNullOrUndefined(e.align) && e.align !== 'Left' && itemAgn === 'Left') {
                itemAgn = e.align;
            }
        });
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (isNullOrUndefined(item.type)) {
                item.type = 'Button';
            }
            innerItems = selectAll('.' + CLS_ITEM, this.element);
            item.align = itemAgn;
            innerEle = this.renderSubComponent(item, index);
            if (this.tbarEle.length >= index && innerItems.length >= 0) {
                if (isNullOrUndefined(this.scrollModule)) {
                    this.destroyMode();
                }
                var algIndex = item.align[0] === 'L' ? 0 : item.align[0] === 'C' ? 1 : 2;
                var ele = void 0;
                if (!this.tbarAlign && itemAgn !== 'Left') {
                    this.tbarItemAlign(item, itemsDiv, 1);
                    this.tbarAlign = true;
                    ele = closest(innerItems[0], '.' + CLS_ITEMS).children[parseInt(algIndex.toString(), 10)];
                    ele.appendChild(innerEle);
                    this.tbarAlgEle[(item.align + 's').toLowerCase()].push(innerEle);
                    this.refreshPositioning();
                }
                else if (this.tbarAlign) {
                    ele = closest(innerItems[0], '.' + CLS_ITEMS).children[parseInt(algIndex.toString(), 10)];
                    ele.insertBefore(innerEle, ele.children[parseInt(index.toString(), 10)]);
                    this.tbarAlgEle[(item.align + 's').toLowerCase()].splice(index, 0, innerEle);
                    this.refreshPositioning();
                }
                else if (innerItems.length === 0) {
                    innerItems = selectAll('.' + CLS_ITEMS, this.element);
                    innerItems[0].appendChild(innerEle);
                }
                else {
                    innerItems[0].parentNode.insertBefore(innerEle, innerItems[parseInt(index.toString(), 10)]);
                }
                this.items.splice(index, 0, item);
                if (item.template) {
                    this.tbarEle.splice(this.tbarEle.length - 1, 1);
                }
                this.tbarEle.splice(index, 0, innerEle);
                index++;
                this.offsetWid = itemsDiv.offsetWidth;
            }
        }
        itemsDiv.style.width = '';
        this.renderOverflowMode();
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * Removes the items from the Toolbar. Acceptable arguments are index of item/HTMLElement/node list.
     *
     * @param  {number|HTMLElement|NodeList|HTMLElement[]} args
     * Index or DOM element or an Array of item which is to be removed from the Toolbar.
     * @returns {void}.
     */
    Toolbar.prototype.removeItems = function (args) {
        var elements = args;
        var index;
        var innerItems = [].slice.call(selectAll('.' + CLS_ITEM, this.element));
        if (typeof (elements) === 'number') {
            index = parseInt(args.toString(), 10);
            this.removeItemByIndex(index, innerItems);
        }
        else {
            if (elements && elements.length > 1) {
                for (var _i = 0, _a = [].slice.call(elements); _i < _a.length; _i++) {
                    var ele = _a[_i];
                    index = this.tbarEle.indexOf(ele);
                    this.removeItemByIndex(index, innerItems);
                    innerItems = selectAll('.' + CLS_ITEM, this.element);
                }
            }
            else {
                var ele = (elements && elements.length && elements.length === 1) ? elements[0] : args;
                index = innerItems.indexOf(ele);
                this.removeItemByIndex(index, innerItems);
            }
        }
        this.resize();
    };
    Toolbar.prototype.removeItemByIndex = function (index, innerItems) {
        if (this.tbarEle[parseInt(index.toString(), 10)] && innerItems[parseInt(index.toString(), 10)]) {
            var eleIdx = this.tbarEle.indexOf(innerItems[parseInt(index.toString(), 10)]);
            if (this.tbarAlign) {
                var indexAgn = this.tbarAlgEle[(this.items[parseInt(eleIdx.toString(), 10)].align + 's').toLowerCase()].indexOf(this.tbarEle[parseInt(eleIdx.toString(), 10)]);
                this.tbarAlgEle[(this.items[parseInt(eleIdx.toString(), 10)].align + 's').toLowerCase()].splice(parseInt(indexAgn.toString(), 10), 1);
            }
            if (this.isReact) {
                this.clearToolbarTemplate(innerItems[parseInt(index.toString(), 10)]);
            }
            var btnItem = innerItems[parseInt(index.toString(), 10)].querySelector('.e-control.e-btn');
            if (!isNullOrUndefined(btnItem) && !isNullOrUndefined(btnItem.ej2_instances[0]) && !(btnItem.ej2_instances[0].isDestroyed)) {
                btnItem.ej2_instances[0].destroy();
            }
            detach(innerItems[parseInt(index.toString(), 10)]);
            this.items.splice(eleIdx, 1);
            this.tbarEle.splice(eleIdx, 1);
        }
    };
    Toolbar.prototype.templateRender = function (templateProp, innerEle, item, index) {
        var itemType = item.type;
        var eleObj = templateProp;
        var isComponent;
        if (typeof (templateProp) === 'object') {
            isComponent = typeof (eleObj.appendTo) === 'function';
        }
        if (typeof (templateProp) === 'string' || !isComponent) {
            var templateFn = void 0;
            var val = templateProp;
            var regEx = new RegExp(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i);
            val = (typeof (templateProp) === 'string') ? templateProp.trim() : templateProp;
            try {
                if (typeof (templateProp) === 'object' && !isNullOrUndefined(templateProp.tagName)) {
                    innerEle.appendChild(templateProp);
                }
                else if (typeof (templateProp) === 'string' && regEx.test(val)) {
                    innerEle.innerHTML = val;
                }
                else if (document.querySelectorAll(val).length) {
                    var ele = document.querySelector(val);
                    var tempStr = ele.outerHTML.trim();
                    innerEle.appendChild(ele);
                    ele.style.display = '';
                    if (!isNullOrUndefined(tempStr)) {
                        this.tempId.push(val);
                    }
                }
                else {
                    templateFn = compile(val);
                }
            }
            catch (e) {
                templateFn = compile(val);
            }
            var tempArray = void 0;
            if (!isNullOrUndefined(templateFn)) {
                var toolbarTemplateID = this.element.id + index + '_template';
                tempArray = templateFn({}, this, 'template', toolbarTemplateID, this.isStringTemplate, undefined, undefined, this.root);
            }
            if (!isNullOrUndefined(tempArray) && tempArray.length > 0) {
                [].slice.call(tempArray).forEach(function (ele) {
                    if (!isNullOrUndefined(ele.tagName)) {
                        ele.style.display = '';
                    }
                    innerEle.appendChild(ele);
                });
            }
        }
        else if (itemType === 'Input') {
            var ele = this.createElement('input');
            if (item.id) {
                ele.id = item.id;
            }
            else {
                ele.id = getUniqueID('tbr-ipt');
            }
            innerEle.appendChild(ele);
            eleObj.appendTo(ele);
        }
        this.add(innerEle, CLS_TEMPLATE);
        var firstChild = innerEle.firstElementChild;
        if (!isNullOrUndefined(firstChild)) {
            firstChild.setAttribute('tabindex', isNullOrUndefined(firstChild.getAttribute('tabIndex')) ? '-1' : this.getDataTabindex(firstChild));
            firstChild.setAttribute('data-tabindex', isNullOrUndefined(firstChild.getAttribute('tabIndex')) ? '-1' : this.getDataTabindex(firstChild));
        }
        this.tbarEle.push(innerEle);
    };
    Toolbar.prototype.buttonRendering = function (item, innerEle) {
        var dom = this.createElement('button', { className: CLS_TBARBTN });
        dom.setAttribute('type', 'button');
        var textStr = item.text;
        var iconCss;
        var iconPos;
        if (item.id) {
            dom.id = item.id;
        }
        else {
            dom.id = getUniqueID('e-tbr-btn');
        }
        var btnTxt = this.createElement('span', { className: 'e-tbar-btn-text' });
        if (textStr) {
            btnTxt.innerHTML = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(textStr) : textStr;
            dom.appendChild(btnTxt);
            dom.classList.add('e-tbtn-txt');
        }
        else {
            this.add(innerEle, 'e-tbtn-align');
        }
        if (item.prefixIcon || item.suffixIcon) {
            if ((item.prefixIcon && item.suffixIcon) || item.prefixIcon) {
                iconCss = item.prefixIcon + ' e-icons';
                iconPos = 'Left';
            }
            else {
                iconCss = item.suffixIcon + ' e-icons';
                iconPos = 'Right';
            }
        }
        var btnObj = new Button({ iconCss: iconCss, iconPosition: iconPos });
        btnObj.createElement = this.createElement;
        btnObj.appendTo(dom);
        if (item.width) {
            setStyleAttribute(dom, { 'width': formatUnit(item.width) });
        }
        return dom;
    };
    Toolbar.prototype.renderSubComponent = function (item, index) {
        var dom;
        var innerEle = this.createElement('div', { className: CLS_ITEM });
        var tempDom = this.createElement('div', {
            innerHTML: this.enableHtmlSanitizer && !isNullOrUndefined(item.tooltipText) ?
                SanitizeHtmlHelper.sanitize(item.tooltipText) : item.tooltipText
        });
        if (!this.tbarEle) {
            this.tbarEle = [];
        }
        if (item.htmlAttributes) {
            this.setAttr(item.htmlAttributes, innerEle);
        }
        if (item.tooltipText) {
            innerEle.setAttribute('title', tempDom.textContent);
        }
        if (item.cssClass) {
            innerEle.className = innerEle.className + ' ' + item.cssClass;
        }
        if (item.template) {
            this.templateRender(item.template, innerEle, item, index);
        }
        else {
            switch (item.type) {
                case 'Button':
                    dom = this.buttonRendering(item, innerEle);
                    dom.setAttribute('tabindex', isNullOrUndefined(item.tabIndex) ? '-1' : item.tabIndex.toString());
                    dom.setAttribute('data-tabindex', isNullOrUndefined(item.tabIndex) ? '-1' : item.tabIndex.toString());
                    dom.setAttribute('aria-label', (item.text || item.tooltipText));
                    dom.setAttribute('aria-disabled', 'false');
                    innerEle.appendChild(dom);
                    innerEle.addEventListener('click', this.itemClick.bind(this));
                    break;
                case 'Separator':
                    this.add(innerEle, CLS_SEPARATOR);
                    break;
            }
        }
        if (item.showTextOn) {
            var sTxt = item.showTextOn;
            if (sTxt === 'Toolbar') {
                this.add(innerEle, CLS_POPUPTEXT);
                this.add(innerEle, 'e-tbtn-align');
            }
            else if (sTxt === 'Overflow') {
                this.add(innerEle, CLS_TBARTEXT);
            }
        }
        if (item.overflow) {
            var overflow = item.overflow;
            if (overflow === 'Show') {
                this.add(innerEle, CLS_TBAROVERFLOW);
            }
            else if (overflow === 'Hide') {
                if (!innerEle.classList.contains(CLS_SEPARATOR)) {
                    this.add(innerEle, CLS_POPOVERFLOW);
                }
            }
        }
        if (item.overflow !== 'Show' && item.showAlwaysInPopup && !innerEle.classList.contains(CLS_SEPARATOR)) {
            this.add(innerEle, CLS_POPPRI);
            this.popupPriCount++;
        }
        if (item.disabled) {
            this.add(innerEle, CLS_DISABLE$2);
        }
        if (item.visible === false) {
            this.add(innerEle, CLS_HIDDEN);
        }
        return innerEle;
    };
    Toolbar.prototype.getDataTabindex = function (ele) {
        return isNullOrUndefined(ele.getAttribute('data-tabindex')) ? '-1' : ele.getAttribute('data-tabindex');
    };
    Toolbar.prototype.itemClick = function (e) {
        this.activeEleSwitch(e.currentTarget);
    };
    Toolbar.prototype.activeEleSwitch = function (ele) {
        this.activeEleRemove(ele.firstElementChild);
        this.activeEle.focus();
    };
    Toolbar.prototype.activeEleRemove = function (curEle) {
        var previousEle = this.element.querySelector('.' + CLS_ITEM + ':not(.' + CLS_DISABLE$2 + ' ):not(.' + CLS_SEPARATOR + ' ):not(.' + CLS_HIDDEN + ' )');
        if (!isNullOrUndefined(this.activeEle)) {
            this.activeEle.setAttribute('tabindex', this.getDataTabindex(this.activeEle));
            if (previousEle) {
                previousEle.removeAttribute('tabindex');
            }
            previousEle = this.activeEle;
        }
        this.activeEle = curEle;
        if (this.getDataTabindex(this.activeEle) === '-1') {
            if (isNullOrUndefined(this.trgtEle) && !curEle.parentElement.classList.contains(CLS_TEMPLATE)) {
                if (!isNullOrUndefined(this.element.querySelector('.e-hor-nav')) && this.element.querySelector('.e-hor-nav').classList.contains('e-nav-active')) {
                    this.updateTabIndex('0');
                    var tabindexValue = this.getDataTabindex(previousEle) === '-1' ? '0' : this.getDataTabindex(previousEle);
                    previousEle.setAttribute('tabindex', tabindexValue);
                }
                else {
                    this.updateTabIndex('-1');
                }
                curEle.removeAttribute('tabindex');
            }
            else {
                var tabIndex = parseInt(this.getDataTabindex(this.activeEle), 10) + 1;
                this.activeEle.setAttribute('tabindex', tabIndex.toString());
            }
        }
    };
    Toolbar.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - Returns the module name as string.
     * @private
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    Toolbar.prototype.itemsRerender = function (newProp) {
        this.items = this.tbarItemsCol;
        if (this.isReact || this.isAngular) {
            this.clearTemplate();
        }
        this.destroyMode();
        this.destroyItems();
        this.items = newProp;
        this.tbarItemsCol = this.items;
        this.renderItems();
        this.renderOverflowMode();
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Toolbar.prototype.resize = function () {
        var ele = this.element;
        this.tbResize = true;
        if (this.tbarAlign) {
            this.itemPositioning();
        }
        if (this.popObj && this.overflowMode === 'Popup') {
            this.popObj.hide();
        }
        var checkOverflow = this.checkOverflow(ele, ele.getElementsByClassName(CLS_ITEMS)[0]);
        if (!checkOverflow) {
            this.destroyScroll();
            var multirowele = ele.querySelector('.' + CLS_ITEMS);
            if (!isNullOrUndefined(multirowele)) {
                this.remove(multirowele, CLS_MULTIROWPOS);
                if (this.tbarAlign) {
                    this.add(multirowele, CLS_TBARPOS);
                }
            }
        }
        if (checkOverflow && this.scrollModule && (this.offsetWid === ele.offsetWidth)) {
            return;
        }
        if (this.offsetWid > ele.offsetWidth || checkOverflow) {
            this.renderOverflowMode();
        }
        if (this.popObj) {
            if (this.overflowMode === 'Extended') {
                this.popObj.width = this.getToolbarPopupWidth(this.element);
            }
            if (this.tbarAlign) {
                this.removePositioning();
            }
            this.popupRefresh(this.popObj.element, false);
            if (this.tbarAlign) {
                this.refreshPositioning();
            }
        }
        if (this.element.querySelector('.' + CLS_HSCROLLBAR$1)) {
            this.scrollStep = this.element.querySelector('.' + CLS_HSCROLLBAR$1).offsetWidth;
        }
        this.offsetWid = ele.offsetWidth;
        this.tbResize = false;
        this.separator();
    };
    Toolbar.prototype.orientationChange = function () {
        var _this = this;
        setTimeout(function () {
            _this.resize();
        }, 500);
    };
    Toolbar.prototype.extendedOpen = function () {
        var sib = this.element.querySelector('.' + CLS_EXTENDABLECLASS);
        if (this.overflowMode === 'Extended' && sib) {
            this.isExtendedOpen = sib.classList.contains(CLS_POPUPOPEN);
        }
    };
    Toolbar.prototype.updateHideEleTabIndex = function (ele, isHidden, isElement, eleIndex, innerItems) {
        if (isElement) {
            eleIndex = innerItems.indexOf(ele);
        }
        var nextEle = innerItems[++eleIndex];
        while (nextEle) {
            var skipEle = this.eleContains(nextEle);
            if (!skipEle) {
                var dataTabIndex = nextEle.firstElementChild.getAttribute('data-tabindex');
                if (isHidden && dataTabIndex === '-1') {
                    nextEle.firstElementChild.setAttribute('tabindex', '0');
                }
                else if (dataTabIndex !== nextEle.firstElementChild.getAttribute('tabindex')) {
                    nextEle.firstElementChild.setAttribute('tabindex', dataTabIndex);
                }
                break;
            }
            nextEle = innerItems[++eleIndex];
        }
    };
    Toolbar.prototype.clearToolbarTemplate = function (templateEle) {
        if (this.registeredTemplate && this.registeredTemplate["" + 'template']) {
            var registeredTemplates = this.registeredTemplate;
            for (var index = 0; index < registeredTemplates["" + 'template'].length; index++) {
                var registeredItem = registeredTemplates["" + 'template'][parseInt(index.toString(), 10)].rootNodes[0];
                var closestItem = closest(registeredItem, '.' + CLS_ITEM);
                if (!isNullOrUndefined(closestItem) && closestItem === templateEle) {
                    this.clearTemplate(['template'], [registeredTemplates["" + 'template'][parseInt(index.toString(), 10)]]);
                    break;
                }
            }
        }
        else if (this.portals && this.portals.length > 0) {
            var portals = this.portals;
            for (var index = 0; index < portals.length; index++) {
                var portalItem = portals[parseInt(index.toString(), 10)];
                var closestItem = closest(portalItem.containerInfo, '.' + CLS_ITEM);
                if (!isNullOrUndefined(closestItem) && closestItem === templateEle) {
                    this.clearTemplate(['template'], index);
                    break;
                }
            }
        }
    };
    /**
     * Gets called when the model property changes.The data that describes the old and new values of the property that changed.
     *
     * @param  {ToolbarModel} newProp - It contains new value of the data.
     * @param  {ToolbarModel} oldProp - It contains old value of the data.
     * @returns {void}
     * @private
     */
    Toolbar.prototype.onPropertyChanged = function (newProp, oldProp) {
        var tEle = this.element;
        this.extendedOpen();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'items':
                    if (!(newProp.items instanceof Array && oldProp.items instanceof Array)) {
                        var changedProb = Object.keys(newProp.items);
                        for (var i = 0; i < changedProb.length; i++) {
                            var index = parseInt(Object.keys(newProp.items)[parseInt(i.toString(), 10)], 10);
                            var property = Object.keys(newProp.items[parseInt(index.toString(), 10)])[0];
                            var newProperty = Object(newProp.items[parseInt(index.toString(), 10)])["" + property];
                            if (this.tbarAlign || property === 'align') {
                                this.refresh();
                                this.trigger('created');
                                break;
                            }
                            var popupPriCheck = property === 'showAlwaysInPopup' && !newProperty;
                            var booleanCheck = property === 'overflow' && this.popupPriCount !== 0;
                            if ((popupPriCheck) || (this.items[parseInt(index.toString(), 10)].showAlwaysInPopup) && booleanCheck) {
                                --this.popupPriCount;
                            }
                            if (isNullOrUndefined(this.scrollModule)) {
                                this.destroyMode();
                            }
                            var itemCol = [].slice.call(selectAll('.' + CLS_ITEMS + ' .' + CLS_ITEM, tEle));
                            if (this.isReact && this.items[parseInt(index.toString(), 10)].template) {
                                this.clearToolbarTemplate(itemCol[parseInt(index.toString(), 10)]);
                            }
                            detach(itemCol[parseInt(index.toString(), 10)]);
                            this.tbarEle.splice(index, 1);
                            this.addItems([this.items[parseInt(index.toString(), 10)]], index);
                            this.items.splice(index, 1);
                            if (this.items[parseInt(index.toString(), 10)].template) {
                                this.tbarEle.splice(this.items.length, 1);
                            }
                        }
                    }
                    else {
                        this.itemsRerender(newProp.items);
                    }
                    break;
                case 'width':
                    setStyleAttribute(tEle, { 'width': formatUnit(newProp.width) });
                    this.refreshOverflow();
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(newProp.height) });
                    break;
                case 'overflowMode':
                    this.destroyMode();
                    this.renderOverflowMode();
                    if (this.enableRtl) {
                        this.add(tEle, CLS_RTL$2);
                    }
                    this.refreshOverflow();
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        this.add(tEle, CLS_RTL$2);
                    }
                    else {
                        this.remove(tEle, CLS_RTL$2);
                    }
                    if (!isNullOrUndefined(this.scrollModule)) {
                        if (newProp.enableRtl) {
                            this.add(this.scrollModule.element, CLS_RTL$2);
                        }
                        else {
                            this.remove(this.scrollModule.element, CLS_RTL$2);
                        }
                    }
                    if (!isNullOrUndefined(this.popObj)) {
                        if (newProp.enableRtl) {
                            this.add(this.popObj.element, CLS_RTL$2);
                        }
                        else {
                            this.remove(this.popObj.element, CLS_RTL$2);
                        }
                    }
                    if (this.tbarAlign) {
                        this.itemPositioning();
                    }
                    break;
                case 'scrollStep':
                    if (this.scrollModule) {
                        this.scrollModule.scrollStep = this.scrollStep;
                    }
                    break;
                case 'enableCollision':
                    if (this.popObj) {
                        this.popObj.collision = { Y: this.enableCollision ? 'flip' : 'none' };
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.split(' '));
                    }
                    break;
                case 'allowKeyboard':
                    this.unwireKeyboardEvent();
                    if (newProp.allowKeyboard) {
                        this.wireKeyboardEvent();
                    }
                    break;
            }
        }
    };
    /**
     * Shows or hides the Toolbar item that is in the specified index.
     *
     * @param  {number | HTMLElement} index - Index value of target item or DOM element  of items to be hidden or shown.
     * @param  {boolean} value - Based on this Boolean value, item will be hide (true) or show (false). By default, value is false.
     * @returns {void}.
     */
    Toolbar.prototype.hideItem = function (index, value) {
        var isElement = (typeof (index) === 'object') ? true : false;
        var eleIndex = index;
        var ele;
        if (!isElement && isNullOrUndefined(eleIndex)) {
            return;
        }
        var innerItems = [].slice.call(selectAll('.' + CLS_ITEM, this.element));
        if (isElement) {
            ele = index;
        }
        else if (this.tbarEle[parseInt(eleIndex.toString(), 10)]) {
            var innerItems_1 = [].slice.call(selectAll('.' + CLS_ITEM, this.element));
            ele = innerItems_1[parseInt(eleIndex.toString(), 10)];
        }
        if (ele) {
            if (value) {
                ele.classList.add(CLS_HIDDEN);
                if (!ele.classList.contains(CLS_SEPARATOR)) {
                    if (isNullOrUndefined(ele.firstElementChild.getAttribute('tabindex')) ||
                        ele.firstElementChild.getAttribute('tabindex') !== '-1') {
                        this.updateHideEleTabIndex(ele, value, isElement, eleIndex, innerItems);
                    }
                }
            }
            else {
                ele.classList.remove(CLS_HIDDEN);
                if (!ele.classList.contains(CLS_SEPARATOR)) {
                    this.updateHideEleTabIndex(ele, value, isElement, eleIndex, innerItems);
                }
            }
            this.refreshOverflow();
        }
    };
    __decorate$3([
        Collection([], Item)
    ], Toolbar.prototype, "items", void 0);
    __decorate$3([
        Property('auto')
    ], Toolbar.prototype, "width", void 0);
    __decorate$3([
        Property('auto')
    ], Toolbar.prototype, "height", void 0);
    __decorate$3([
        Property('')
    ], Toolbar.prototype, "cssClass", void 0);
    __decorate$3([
        Property('Scrollable')
    ], Toolbar.prototype, "overflowMode", void 0);
    __decorate$3([
        Property()
    ], Toolbar.prototype, "scrollStep", void 0);
    __decorate$3([
        Property(true)
    ], Toolbar.prototype, "enableCollision", void 0);
    __decorate$3([
        Property(true)
    ], Toolbar.prototype, "enableHtmlSanitizer", void 0);
    __decorate$3([
        Property(true)
    ], Toolbar.prototype, "allowKeyboard", void 0);
    __decorate$3([
        Event()
    ], Toolbar.prototype, "clicked", void 0);
    __decorate$3([
        Event()
    ], Toolbar.prototype, "created", void 0);
    __decorate$3([
        Event()
    ], Toolbar.prototype, "destroyed", void 0);
    __decorate$3([
        Event()
    ], Toolbar.prototype, "beforeCreate", void 0);
    Toolbar = __decorate$3([
        NotifyPropertyChanges
    ], Toolbar);
    return Toolbar;
}(Component));

var __extends$4 = (undefined && undefined.__extends) || (function () {
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
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CLS_ACRDN_ROOT = 'e-acrdn-root';
var CLS_ROOT$2 = 'e-accordion';
var CLS_ITEM$1 = 'e-acrdn-item';
var CLS_ITEMFOCUS = 'e-item-focus';
var CLS_ITEMHIDE = 'e-hide';
var CLS_HEADER = 'e-acrdn-header';
var CLS_HEADERICN = 'e-acrdn-header-icon';
var CLS_HEADERCTN = 'e-acrdn-header-content';
var CLS_CONTENT = 'e-acrdn-panel';
var CLS_CTENT = 'e-acrdn-content';
var CLS_TOOGLEICN = 'e-toggle-icon';
var CLS_COLLAPSEICN = 'e-tgl-collapse-icon e-icons';
var CLS_EXPANDICN = 'e-expand-icon';
var CLS_RTL$3 = 'e-rtl';
var CLS_CTNHIDE = 'e-content-hide';
var CLS_SLCT = 'e-select';
var CLS_SLCTED = 'e-selected';
var CLS_ACTIVE = 'e-active';
var CLS_ANIMATE = 'e-animate';
var CLS_DISABLE$3 = 'e-overlay';
var CLS_TOGANIMATE = 'e-toggle-animation';
var CLS_NEST = 'e-nested';
var CLS_EXPANDSTATE = 'e-expand-state';
var CLS_CONTAINER = 'e-accordion-container';
/**
 * Objects used for configuring the Accordion expanding item action properties.
 */
var AccordionActionSettings = /** @class */ (function (_super) {
    __extends$4(AccordionActionSettings, _super);
    function AccordionActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('SlideDown')
    ], AccordionActionSettings.prototype, "effect", void 0);
    __decorate$4([
        Property(400)
    ], AccordionActionSettings.prototype, "duration", void 0);
    __decorate$4([
        Property('linear')
    ], AccordionActionSettings.prototype, "easing", void 0);
    return AccordionActionSettings;
}(ChildProperty));
/**
 * Objects used for configuring the Accordion animation properties.
 */
var AccordionAnimationSettings = /** @class */ (function (_super) {
    __extends$4(AccordionAnimationSettings, _super);
    function AccordionAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Complex({ effect: 'SlideUp', duration: 400, easing: 'linear' }, AccordionActionSettings)
    ], AccordionAnimationSettings.prototype, "collapse", void 0);
    __decorate$4([
        Complex({ effect: 'SlideDown', duration: 400, easing: 'linear' }, AccordionActionSettings)
    ], AccordionAnimationSettings.prototype, "expand", void 0);
    return AccordionAnimationSettings;
}(ChildProperty));
/**
 * An item object that is used to configure Accordion items.
 */
var AccordionItem = /** @class */ (function (_super) {
    __extends$4(AccordionItem, _super);
    function AccordionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property(null)
    ], AccordionItem.prototype, "content", void 0);
    __decorate$4([
        Property(null)
    ], AccordionItem.prototype, "header", void 0);
    __decorate$4([
        Property(null)
    ], AccordionItem.prototype, "cssClass", void 0);
    __decorate$4([
        Property(null)
    ], AccordionItem.prototype, "iconCss", void 0);
    __decorate$4([
        Property(false)
    ], AccordionItem.prototype, "expanded", void 0);
    __decorate$4([
        Property(true)
    ], AccordionItem.prototype, "visible", void 0);
    __decorate$4([
        Property(false)
    ], AccordionItem.prototype, "disabled", void 0);
    __decorate$4([
        Property()
    ], AccordionItem.prototype, "id", void 0);
    return AccordionItem;
}(ChildProperty));
/**
 * The Accordion is a vertically collapsible content panel that displays one or more panels at a time within the available space.
 * ```html
 * <div id='accordion'/>
 * <script>
 *   var accordionObj = new Accordion();
 *   accordionObj.appendTo('#accordion');
 * </script>
 * ```
 */
var Accordion = /** @class */ (function (_super) {
    __extends$4(Accordion, _super);
    /**
     * Initializes a new instance of the Accordion class.
     *
     * @param {AccordionModel} options  - Specifies Accordion model properties as options.
     * @param {string | HTMLElement} element  - Specifies the element that is rendered as an Accordion.
     */
    function Accordion(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Contains the keyboard configuration of the Accordion.
         */
        _this.keyConfigs = {
            moveUp: 'uparrow',
            moveDown: 'downarrow',
            enter: 'enter',
            space: 'space',
            home: 'home',
            end: 'end'
        };
        return _this;
    }
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    Accordion.prototype.destroy = function () {
        if (this.isReact || this.isAngular || this.isVue) {
            this.clearTemplate();
        }
        var ele = this.element;
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.isDestroy = true;
        this.restoreContent(null);
        [].slice.call(ele.children).forEach(function (el) {
            ele.removeChild(el);
        });
        if (this.trgtEle) {
            this.trgtEle = null;
            while (this.ctrlTem.firstElementChild) {
                ele.appendChild(this.ctrlTem.firstElementChild);
            }
            this.ctrlTem = null;
        }
        ele.classList.remove(CLS_ACRDN_ROOT);
        ele.removeAttribute('style');
        this.element.removeAttribute('data-ripple');
        if (!this.isNested && isRippleEnabled) {
            this.removeRippleEffect();
        }
    };
    Accordion.prototype.preRender = function () {
        var nested = closest(this.element, '.' + CLS_CONTENT);
        this.isNested = false;
        this.templateEle = [];
        if (!this.isDestroy) {
            this.isDestroy = false;
        }
        if (nested && nested.firstElementChild && nested.firstElementChild.firstElementChild) {
            if (nested.firstElementChild.firstElementChild.classList.contains(CLS_ROOT$2)) {
                nested.classList.add(CLS_NEST);
                this.isNested = true;
            }
        }
        else {
            this.element.classList.add(CLS_ACRDN_ROOT);
        }
        if (this.enableRtl) {
            this.add(this.element, CLS_RTL$3);
        }
    };
    Accordion.prototype.add = function (ele, val) {
        ele.classList.add(val);
    };
    Accordion.prototype.remove = function (ele, val) {
        ele.classList.remove(val);
    };
    /**
     * To initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    Accordion.prototype.render = function () {
        this.initializeHeaderTemplate();
        this.initializeItemTemplate();
        this.initialize();
        this.renderControl();
        this.wireEvents();
        this.renderComplete();
    };
    Accordion.prototype.initialize = function () {
        var width = formatUnit(this.width);
        var height = formatUnit(this.height);
        setStyleAttribute(this.element, { 'width': width, 'height': height });
        if (isNullOrUndefined(this.initExpand)) {
            this.initExpand = [];
        }
        if (!isNullOrUndefined(this.expandedIndices) && this.expandedIndices.length > 0) {
            this.initExpand = this.expandedIndices;
        }
    };
    Accordion.prototype.renderControl = function () {
        this.trgtEle = (this.element.children.length > 0) ? select('div', this.element) : null;
        this.renderItems();
        this.initItemExpand();
    };
    Accordion.prototype.wireFocusEvents = function () {
        var acrdItem = [].slice.call(this.element.querySelectorAll('.' + CLS_ITEM$1));
        for (var _i = 0, acrdItem_1 = acrdItem; _i < acrdItem_1.length; _i++) {
            var item = acrdItem_1[_i];
            var headerEle = item.querySelector('.' + CLS_HEADER);
            if (item.childElementCount > 0 && headerEle) {
                EventHandler.clearEvents(headerEle);
                EventHandler.add(headerEle, 'focus', this.focusIn, this);
                EventHandler.add(headerEle, 'blur', this.focusOut, this);
            }
        }
    };
    Accordion.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.clickHandler);
        if (!isNullOrUndefined(this.keyModule)) {
            this.keyModule.destroy();
        }
    };
    Accordion.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        if (!this.isNested && !this.isDestroy) {
            this.removeRippleEffect = rippleEffect(this.element, { selector: '.' + CLS_HEADER });
        }
        if (!this.isNested) {
            this.keyModule = new KeyboardEvents(this.element, {
                keyAction: this.keyActionHandler.bind(this),
                keyConfigs: this.keyConfigs,
                eventName: 'keydown'
            });
        }
    };
    Accordion.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return compile(template);
            }
        }
        return undefined;
    };
    Accordion.prototype.initializeHeaderTemplate = function () {
        if (this.headerTemplate) {
            this.headerTemplateFn = this.templateParser(this.headerTemplate);
        }
    };
    Accordion.prototype.initializeItemTemplate = function () {
        if (this.itemTemplate) {
            this.itemTemplateFn = this.templateParser(this.itemTemplate);
        }
    };
    Accordion.prototype.getHeaderTemplate = function () {
        return this.headerTemplateFn;
    };
    Accordion.prototype.getItemTemplate = function () {
        return this.itemTemplateFn;
    };
    Accordion.prototype.focusIn = function (e) {
        e.target.parentElement.classList.add(CLS_ITEMFOCUS);
    };
    Accordion.prototype.focusOut = function (e) {
        e.target.parentElement.classList.remove(CLS_ITEMFOCUS);
    };
    Accordion.prototype.ctrlTemplate = function () {
        this.ctrlTem = this.element.cloneNode(true);
        var innerEles;
        var rootEle = select('.' + CLS_CONTAINER, this.element);
        if (rootEle) {
            innerEles = rootEle.children;
        }
        else {
            innerEles = this.element.children;
        }
        var items = [];
        [].slice.call(innerEles).forEach(function (el) {
            items.push({
                header: (el.childElementCount > 0 && el.children[0]) ? (el.children[0]) : '',
                content: (el.childElementCount > 1 && el.children[1]) ? (el.children[1]) : ''
            });
            el.parentNode.removeChild(el);
        });
        if (rootEle) {
            this.element.removeChild(rootEle);
        }
        this.setProperties({ items: items }, true);
    };
    Accordion.prototype.toggleIconGenerate = function () {
        var tglIcon = this.createElement('div', { className: CLS_TOOGLEICN });
        var hdrColIcon = this.createElement('span', { className: CLS_COLLAPSEICN });
        tglIcon.appendChild(hdrColIcon);
        return tglIcon;
    };
    Accordion.prototype.initItemExpand = function () {
        var len = this.initExpand.length;
        if (len === 0) {
            return;
        }
        if (this.expandMode === 'Single') {
            this.expandItem(true, this.initExpand[len - 1]);
        }
        else {
            for (var i = 0; i < len; i++) {
                this.expandItem(true, this.initExpand[parseInt(i.toString(), 10)]);
            }
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Accordion.prototype.renderItems = function () {
        var _this = this;
        var ele = this.element;
        var innerItem;
        var innerDataSourceItem;
        if (!isNullOrUndefined(this.trgtEle)) {
            this.ctrlTemplate();
        }
        if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0) {
            this.dataSource.forEach(function (item, index) {
                innerDataSourceItem = _this.renderInnerItem(item, index);
                ele.appendChild(innerDataSourceItem);
                if (innerDataSourceItem.childElementCount > 0) {
                    EventHandler.add(innerDataSourceItem.querySelector('.' + CLS_HEADER), 'focus', _this.focusIn, _this);
                    EventHandler.add(innerDataSourceItem.querySelector('.' + CLS_HEADER), 'blur', _this.focusOut, _this);
                }
            });
        }
        else {
            var items = this.items;
            if (ele && items.length > 0) {
                items.forEach(function (item, index) {
                    innerItem = _this.renderInnerItem(item, index);
                    ele.appendChild(innerItem);
                    if (innerItem.childElementCount > 0) {
                        EventHandler.add(innerItem.querySelector('.' + CLS_HEADER), 'focus', _this.focusIn, _this);
                        EventHandler.add(innerItem.querySelector('.' + CLS_HEADER), 'blur', _this.focusOut, _this);
                    }
                });
            }
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Accordion.prototype.clickHandler = function (e) {
        var trgt = e.target;
        var items = this.getItems();
        var eventArgs = {};
        var tglIcon;
        var acrdEle = closest(trgt, '.' + CLS_ROOT$2);
        if (acrdEle !== this.element) {
            return;
        }
        trgt.classList.add('e-target');
        var acrdnItem = closest(trgt, '.' + CLS_ITEM$1);
        var acrdnHdr = closest(trgt, '.' + CLS_HEADER);
        var acrdnCtn = closest(trgt, '.' + CLS_CONTENT);
        if (acrdnItem && (isNullOrUndefined(acrdnHdr) || isNullOrUndefined(acrdnCtn))) {
            acrdnHdr = acrdnItem.children[0];
            acrdnCtn = acrdnItem.children[1];
        }
        if (acrdnHdr) {
            tglIcon = select('.' + CLS_TOOGLEICN, acrdnHdr);
        }
        var acrdnCtnItem;
        if (acrdnHdr) {
            acrdnCtnItem = closest(acrdnHdr, '.' + CLS_ITEM$1);
        }
        else if (acrdnCtn) {
            acrdnCtnItem = closest(acrdnCtn, '.' + CLS_ITEM$1);
        }
        var index = this.getIndexByItem(acrdnItem);
        if (acrdnCtnItem) {
            eventArgs.item = items[this.getIndexByItem(acrdnCtnItem)];
        }
        eventArgs.originalEvent = e;
        var ctnCheck = !isNullOrUndefined(tglIcon) && acrdnItem.childElementCount <= 1;
        if (ctnCheck && (isNullOrUndefined(acrdnCtn) || !isNullOrUndefined(select('.' + CLS_HEADER + ' .' + CLS_TOOGLEICN, acrdnCtnItem)))) {
            acrdnItem.appendChild(this.contentRendering(index));
            this.ariaAttrUpdate(acrdnItem);
            this.afterContentRender(trgt, eventArgs, acrdnItem, acrdnHdr, acrdnCtn, acrdnCtnItem);
        }
        else {
            this.afterContentRender(trgt, eventArgs, acrdnItem, acrdnHdr, acrdnCtn, acrdnCtnItem);
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Accordion.prototype.afterContentRender = function (trgt, eventArgs, acrdnItem, acrdnHdr, acrdnCtn, acrdnCtnItem) {
        var _this = this;
        var acrdActive = [];
        this.trigger('clicked', eventArgs, function (eventArgs) {
            if (eventArgs.cancel) {
                return;
            }
            var cntclkCheck = (acrdnCtn && !isNullOrUndefined(select('.e-target', acrdnCtn)));
            var inlineAcrdnSel = '.' + CLS_CONTENT + ' .' + CLS_ROOT$2;
            var inlineEleAcrdn = acrdnCtn && !isNullOrUndefined(select('.' + CLS_ROOT$2, acrdnCtn)) && isNullOrUndefined(closest(trgt, inlineAcrdnSel));
            var nestContCheck = acrdnCtn && isNullOrUndefined(select('.' + CLS_ROOT$2, acrdnCtn)) || !(closest(trgt, '.' + CLS_ROOT$2) === _this.element);
            cntclkCheck = cntclkCheck && (inlineEleAcrdn || nestContCheck);
            trgt.classList.remove('e-target');
            if (trgt.classList.contains(CLS_CONTENT) || trgt.classList.contains(CLS_CTENT) || cntclkCheck) {
                return;
            }
            var acrdcontainer = _this.element.querySelector('.' + CLS_CONTAINER);
            var acrdnchild = (acrdcontainer) ? acrdcontainer.children : _this.element.children;
            [].slice.call(acrdnchild).forEach(function (el) {
                if (el.classList.contains(CLS_ACTIVE)) {
                    acrdActive.push(el);
                }
            });
            var acrdAniEle = [].slice.call(_this.element.querySelectorAll('.' + CLS_ITEM$1 + ' [' + CLS_ANIMATE + ']'));
            if (acrdAniEle.length > 0) {
                for (var _i = 0, acrdAniEle_1 = acrdAniEle; _i < acrdAniEle_1.length; _i++) {
                    var el = acrdAniEle_1[_i];
                    acrdActive.push(el.parentElement);
                }
            }
            var sameContentCheck = acrdActive.indexOf(acrdnCtnItem) !== -1 && acrdnCtn.getAttribute('e-animate') === 'true';
            var sameHeader = false;
            if (!isNullOrUndefined(acrdnItem) && !isNullOrUndefined(acrdnHdr)) {
                var acrdnCtn_1 = select('.' + CLS_CONTENT, acrdnItem);
                var acrdnRoot = closest(acrdnItem, '.' + CLS_ACRDN_ROOT);
                var expandState = acrdnRoot.querySelector('.' + CLS_EXPANDSTATE);
                if (isNullOrUndefined(acrdnCtn_1)) {
                    return;
                }
                sameHeader = (expandState === acrdnItem);
                if (isVisible(acrdnCtn_1) && (!sameContentCheck || acrdnCtnItem.classList.contains(CLS_SLCTED))) {
                    _this.collapse(acrdnCtn_1);
                }
                else {
                    if ((acrdActive.length > 0) && _this.expandMode === 'Single' && !sameContentCheck) {
                        acrdActive.forEach(function (el) {
                            _this.collapse(select('.' + CLS_CONTENT, el));
                            el.classList.remove(CLS_EXPANDSTATE);
                        });
                    }
                    _this.expand(acrdnCtn_1);
                }
                if (!isNullOrUndefined(expandState) && !sameHeader) {
                    expandState.classList.remove(CLS_EXPANDSTATE);
                }
            }
        });
    };
    Accordion.prototype.eleMoveFocus = function (action, root, trgt) {
        var clst;
        var clstItem = closest(trgt, '.' + CLS_ITEM$1);
        if (trgt === root) {
            clst = ((action === 'moveUp' ? trgt.lastElementChild : trgt).querySelector('.' + CLS_HEADER));
        }
        else if (trgt.classList.contains(CLS_HEADER)) {
            clstItem = (action === 'moveUp' ? clstItem.previousElementSibling : clstItem.nextElementSibling);
            if (clstItem) {
                clst = select('.' + CLS_HEADER, clstItem);
            }
        }
        if (clst) {
            clst.focus();
        }
    };
    Accordion.prototype.keyActionHandler = function (e) {
        var trgt = e.target;
        var header = closest(e.target, CLS_HEADER);
        if (isNullOrUndefined(header) && !trgt.classList.contains(CLS_ROOT$2) && !trgt.classList.contains(CLS_HEADER)) {
            return;
        }
        var clst;
        var root = this.element;
        var content;
        switch (e.action) {
            case 'moveUp':
                this.eleMoveFocus(e.action, root, trgt);
                break;
            case 'moveDown':
                this.eleMoveFocus(e.action, root, trgt);
                break;
            case 'space':
            case 'enter':
                content = trgt.nextElementSibling;
                if (!isNullOrUndefined(content) && content.classList.contains(CLS_CONTENT)) {
                    if (content.getAttribute('e-animate') !== 'true') {
                        trgt.click();
                    }
                }
                else {
                    trgt.click();
                }
                e.preventDefault();
                break;
            case 'home':
            case 'end':
                clst = e.action === 'home' ? root.firstElementChild.children[0] : root.lastElementChild.children[0];
                clst.focus();
                e.preventDefault();
                break;
        }
    };
    Accordion.prototype.headerEleGenerate = function () {
        var header = this.createElement('div', { className: CLS_HEADER, id: getUniqueID('acrdn_header') });
        var ariaAttr = {
            'tabindex': '0', 'role': 'button', 'aria-disabled': 'false', 'aria-expanded': 'false'
        };
        attributes(header, ariaAttr);
        return header;
    };
    Accordion.prototype.renderInnerItem = function (item, index) {
        var innerEle = this.createElement('div', {
            className: CLS_ITEM$1, id: item.id || getUniqueID('acrdn_item')
        });
        if (this.headerTemplate) {
            var ctnEle = this.headerEleGenerate();
            var hdrEle = this.createElement('div', { className: CLS_HEADERCTN });
            ctnEle.appendChild(hdrEle);
            append(this.getHeaderTemplate()(item, this, 'headerTemplate', this.element.id + '_headerTemplate', false), hdrEle);
            innerEle.appendChild(ctnEle);
            ctnEle.appendChild(this.toggleIconGenerate());
            this.add(innerEle, CLS_SLCT);
            return innerEle;
        }
        if (item.header && this.angularnativeCondiCheck(item, 'header')) {
            var header = item.header;
            if (this.enableHtmlSanitizer && typeof (item.header) === 'string') {
                header = SanitizeHtmlHelper.sanitize(item.header);
            }
            var ctnEle = this.headerEleGenerate();
            var hdrEle = this.createElement('div', { className: CLS_HEADERCTN });
            ctnEle.appendChild(hdrEle);
            ctnEle.appendChild(this.fetchElement(hdrEle, header, index));
            innerEle.appendChild(ctnEle);
        }
        var hdr = select('.' + CLS_HEADER, innerEle);
        if (item.expanded && !isNullOrUndefined(index) && (!this.enablePersistence)) {
            if (this.initExpand.indexOf(index) === -1) {
                this.initExpand.push(index);
            }
        }
        if (item.cssClass) {
            addClass([innerEle], item.cssClass.split(' '));
        }
        if (item.disabled) {
            addClass([innerEle], CLS_DISABLE$3);
        }
        if (item.visible === false) {
            addClass([innerEle], CLS_ITEMHIDE);
        }
        if (item.iconCss) {
            var hdrIcnEle = this.createElement('div', { className: CLS_HEADERICN });
            var icon = this.createElement('span', { className: item.iconCss + ' e-icons' });
            hdrIcnEle.appendChild(icon);
            if (isNullOrUndefined(hdr)) {
                hdr = this.headerEleGenerate();
                hdr.appendChild(hdrIcnEle);
                innerEle.appendChild(hdr);
            }
            else {
                hdr.insertBefore(hdrIcnEle, hdr.childNodes[0]);
            }
        }
        if (item.content && this.angularnativeCondiCheck(item, 'content')) {
            var hdrIcon = this.toggleIconGenerate();
            if (isNullOrUndefined(hdr)) {
                hdr = this.headerEleGenerate();
                innerEle.appendChild(hdr);
            }
            hdr.appendChild(hdrIcon);
            this.add(innerEle, CLS_SLCT);
        }
        return innerEle;
    };
    Accordion.prototype.angularnativeCondiCheck = function (item, prop) {
        var property = prop === 'content' ? item.content : item.header;
        var content = property;
        if (this.isAngular && !isNullOrUndefined(content.elementRef)) {
            var data = content.elementRef.nativeElement.data;
            if (isNullOrUndefined(data) || data === '' || (data.indexOf('bindings=') === -1)) {
                return true;
            }
            var parseddata = JSON.parse(content.elementRef.nativeElement.data.replace('bindings=', ''));
            if (!isNullOrUndefined(parseddata) && parseddata['ng-reflect-ng-if'] === 'false') {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    Accordion.prototype.fetchElement = function (ele, value, index) {
        var templateFn;
        var temString;
        try {
            if (document.querySelectorAll(value).length && value !== 'Button') {
                var eleVal = document.querySelector(value);
                temString = eleVal.outerHTML.trim();
                ele.appendChild(eleVal);
                eleVal.style.display = '';
            }
            else {
                templateFn = compile(value);
            }
        }
        catch (e) {
            if (typeof (value) === 'string') {
                ele.innerHTML = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(value) : value;
            }
            else if (value instanceof (HTMLElement)) {
                ele.appendChild(value);
                if (this.trgtEle) {
                    ele.firstElementChild.style.display = '';
                }
            }
            else {
                templateFn = compile(value);
            }
        }
        var tempArray;
        if (!isNullOrUndefined(templateFn)) {
            if (this.isReact) {
                this.renderReactTemplates();
            }
            var templateProps = void 0;
            var templateName = void 0;
            if (ele.classList.contains(CLS_HEADERCTN)) {
                templateProps = this.element.id + index + '_header';
                templateName = 'header';
            }
            else if (ele.classList.contains(CLS_CTENT)) {
                templateProps = this.element.id + index + '_content';
                templateName = 'content';
            }
            tempArray = templateFn({}, this, templateName, templateProps, this.isStringTemplate);
        }
        if (!isNullOrUndefined(tempArray) && tempArray.length > 0 && !(isNullOrUndefined(tempArray[0].tagName) && tempArray.length === 1)) {
            [].slice.call(tempArray).forEach(function (el) {
                if (!isNullOrUndefined(el.tagName)) {
                    el.style.display = '';
                }
                ele.appendChild(el);
            });
        }
        else if (ele.childElementCount === 0) {
            ele.innerHTML = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(value) : value;
        }
        if (!isNullOrUndefined(temString)) {
            if (this.templateEle.indexOf(value) === -1) {
                this.templateEle.push(value);
            }
        }
        return ele;
    };
    Accordion.prototype.ariaAttrUpdate = function (itemEle) {
        var header = select('.' + CLS_HEADER, itemEle);
        var content = select('.' + CLS_CONTENT, itemEle);
        header.setAttribute('aria-controls', content.id);
        content.setAttribute('aria-labelledby', header.id);
        content.setAttribute('role', 'region');
    };
    Accordion.prototype.contentRendering = function (index) {
        var itemcnt = this.createElement('div', { className: CLS_CONTENT + ' ' + CLS_CTNHIDE, id: getUniqueID('acrdn_panel') });
        attributes(itemcnt, { 'aria-hidden': 'true' });
        var ctn = this.createElement('div', { className: CLS_CTENT });
        if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0) {
            if (this.isReact) {
                this.renderReactTemplates();
            }
            append(this.getItemTemplate()(this.dataSource[parseInt(index.toString(), 10)], this, 'itemTemplate', this.element.id + '_itemTemplate', false), ctn);
            itemcnt.appendChild(ctn);
        }
        else {
            var content = this.items[parseInt(index.toString(), 10)].content;
            if (this.enableHtmlSanitizer && typeof (content) === 'string') {
                content = SanitizeHtmlHelper.sanitize(content);
            }
            itemcnt.appendChild(this.fetchElement(ctn, content, index));
        }
        return itemcnt;
    };
    Accordion.prototype.expand = function (trgt) {
        var _this = this;
        var items = this.getItems();
        var trgtItemEle = closest(trgt, '.' + CLS_ITEM$1);
        if (isNullOrUndefined(trgt) || (isVisible(trgt) && trgt.getAttribute('e-animate') !== 'true') || trgtItemEle.classList.contains(CLS_DISABLE$3)) {
            return;
        }
        var acrdnRoot = closest(trgtItemEle, '.' + CLS_ACRDN_ROOT);
        var expandState = acrdnRoot.querySelector('.' + CLS_EXPANDSTATE);
        var animation = {
            name: this.animation.expand.effect,
            duration: this.animation.expand.duration,
            timingFunction: this.animation.expand.easing
        };
        var icon = select('.' + CLS_TOOGLEICN, trgtItemEle).firstElementChild;
        var eventArgs = {
            element: trgtItemEle,
            item: items[this.getIndexByItem(trgtItemEle)],
            index: this.getIndexByItem(trgtItemEle),
            content: trgtItemEle.querySelector('.' + CLS_CONTENT),
            isExpanded: true
        };
        this.trigger('expanding', eventArgs, function (expandArgs) {
            if (!expandArgs.cancel) {
                icon.classList.add(CLS_TOGANIMATE);
                _this.expandedItemsPush(trgtItemEle);
                if (!isNullOrUndefined(expandState)) {
                    expandState.classList.remove(CLS_EXPANDSTATE);
                }
                trgtItemEle.classList.add(CLS_EXPANDSTATE);
                if ((animation.name === 'None' && animationMode !== 'Enable') || (animationMode === 'Disable')) {
                    _this.expandProgress('begin', icon, trgt, trgtItemEle, expandArgs);
                    _this.expandProgress('end', icon, trgt, trgtItemEle, expandArgs);
                }
                else {
                    _this.expandAnimation(animation.name, icon, trgt, trgtItemEle, animation, expandArgs);
                }
            }
        });
    };
    Accordion.prototype.expandAnimation = function (ef, icn, trgt, trgtItemEle, animate, args) {
        var _this = this;
        if (ef === 'None' && animationMode === 'Enable') {
            ef = 'SlideDown';
            animate.name = 'SlideDown';
        }
        var height;
        this.lastActiveItemId = trgtItemEle.id;
        if (ef === 'SlideDown') {
            animate.begin = function () {
                _this.expandProgress('begin', icn, trgt, trgtItemEle, args);
                trgt.style.position = 'absolute';
                height = trgtItemEle.offsetHeight;
                trgt.style.maxHeight = (trgt.offsetHeight) + 'px';
                trgtItemEle.style.maxHeight = '';
            };
            animate.progress = function () {
                trgtItemEle.style.minHeight = (height + trgt.offsetHeight) + 'px';
            };
            animate.end = function () {
                setStyleAttribute(trgt, { 'position': '', 'maxHeight': '' });
                trgtItemEle.style.minHeight = '';
                _this.expandProgress('end', icn, trgt, trgtItemEle, args);
            };
        }
        else {
            animate.begin = function () {
                _this.expandProgress('begin', icn, trgt, trgtItemEle, args);
            };
            animate.end = function () {
                _this.expandProgress('end', icn, trgt, trgtItemEle, args);
            };
        }
        new Animation(animate).animate(trgt);
    };
    Accordion.prototype.expandProgress = function (progress, icon, trgt, trgtItemEle, eventArgs) {
        this.remove(trgt, CLS_CTNHIDE);
        this.add(trgtItemEle, CLS_SLCTED);
        this.add(icon, CLS_EXPANDICN);
        if (progress === 'end') {
            this.add(trgtItemEle, CLS_ACTIVE);
            trgt.setAttribute('aria-hidden', 'false');
            attributes(trgt.previousElementSibling, { 'aria-expanded': 'true' });
            icon.classList.remove(CLS_TOGANIMATE);
            this.trigger('expanded', eventArgs);
        }
    };
    Accordion.prototype.expandedItemsPush = function (item) {
        var index = this.getIndexByItem(item);
        if (this.expandedIndices.indexOf(index) === -1) {
            var temp = [].slice.call(this.expandedIndices);
            temp.push(index);
            this.setProperties({ expandedIndices: temp }, true);
        }
    };
    Accordion.prototype.getIndexByItem = function (item) {
        var itemEle = this.getItemElements();
        return [].slice.call(itemEle).indexOf(item);
    };
    Accordion.prototype.getItemElements = function () {
        var itemEle = [];
        var itemCollection = this.element.children;
        [].slice.call(itemCollection).forEach(function (el) {
            if (el.classList.contains(CLS_ITEM$1)) {
                itemEle.push(el);
            }
        });
        return itemEle;
    };
    Accordion.prototype.expandedItemsPop = function (item) {
        var index = this.getIndexByItem(item);
        var temp = [].slice.call(this.expandedIndices);
        temp.splice(temp.indexOf(index), 1);
        this.setProperties({ expandedIndices: temp }, true);
    };
    Accordion.prototype.collapse = function (trgt) {
        var _this = this;
        if (isNullOrUndefined(trgt)) {
            return;
        }
        var items = this.getItems();
        var trgtItemEle = closest(trgt, '.' + CLS_ITEM$1);
        if (!isVisible(trgt) || trgtItemEle.classList.contains(CLS_DISABLE$3)) {
            return;
        }
        var animation = {
            name: this.animation.collapse.effect,
            duration: this.animation.collapse.duration,
            timingFunction: this.animation.collapse.easing
        };
        var icon = select('.' + CLS_TOOGLEICN, trgtItemEle).firstElementChild;
        var eventArgs = {
            element: trgtItemEle,
            item: items[this.getIndexByItem(trgtItemEle)],
            index: this.getIndexByItem(trgtItemEle),
            content: trgtItemEle.querySelector('.' + CLS_CONTENT),
            isExpanded: false
        };
        this.trigger('expanding', eventArgs, function (expandArgs) {
            if (!expandArgs.cancel) {
                _this.expandedItemsPop(trgtItemEle);
                trgtItemEle.classList.remove(CLS_EXPANDSTATE);
                icon.classList.add(CLS_TOGANIMATE);
                if ((animation.name === 'None' && animationMode !== 'Enable') || (animationMode === 'Disable')) {
                    _this.collapseProgress('begin', icon, trgt, trgtItemEle, expandArgs);
                    _this.collapseProgress('end', icon, trgt, trgtItemEle, expandArgs);
                }
                else {
                    _this.collapseAnimation(animation.name, trgt, trgtItemEle, icon, animation, expandArgs);
                }
            }
        });
    };
    Accordion.prototype.collapseAnimation = function (ef, trgt, trgtItEl, icn, animate, args) {
        var _this = this;
        if (ef === 'None' && animationMode === 'Enable') {
            ef = 'SlideUp';
            animate.name = 'SlideUp';
        }
        var height;
        var trgtHeight;
        var itemHeight;
        var remain;
        this.lastActiveItemId = trgtItEl.id;
        if (ef === 'SlideUp') {
            animate.begin = function () {
                itemHeight = trgtItEl.offsetHeight;
                trgtItEl.style.minHeight = itemHeight + 'px';
                trgt.style.position = 'absolute';
                height = trgtItEl.offsetHeight;
                trgtHeight = trgt.offsetHeight;
                trgt.style.maxHeight = trgtHeight + 'px';
                _this.collapseProgress('begin', icn, trgt, trgtItEl, args);
            };
            animate.progress = function () {
                remain = ((height - (trgtHeight - trgt.offsetHeight)));
                if (remain < itemHeight) {
                    trgtItEl.style.minHeight = remain + 'px';
                }
            };
            animate.end = function () {
                trgt.style.display = 'none';
                _this.collapseProgress('end', icn, trgt, trgtItEl, args);
                trgtItEl.style.minHeight = '';
                setStyleAttribute(trgt, { 'position': '', 'maxHeight': '', 'display': '' });
            };
        }
        else {
            animate.begin = function () {
                _this.collapseProgress('begin', icn, trgt, trgtItEl, args);
            };
            animate.end = function () {
                _this.collapseProgress('end', icn, trgt, trgtItEl, args);
            };
        }
        new Animation(animate).animate(trgt);
    };
    Accordion.prototype.collapseProgress = function (progress, icon, trgt, trgtItemEle, eventArgs) {
        this.remove(icon, CLS_EXPANDICN);
        this.remove(trgtItemEle, CLS_SLCTED);
        if (progress === 'end') {
            this.add(trgt, CLS_CTNHIDE);
            icon.classList.remove(CLS_TOGANIMATE);
            this.remove(trgtItemEle, CLS_ACTIVE);
            trgt.setAttribute('aria-hidden', 'true');
            attributes(trgt.previousElementSibling, { 'aria-expanded': 'false' });
            this.trigger('expanded', eventArgs);
        }
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    Accordion.prototype.getModuleName = function () {
        return 'accordion';
    };
    Accordion.prototype.getItems = function () {
        var items;
        if (this.itemTemplate && this.headerTemplate) {
            items = this.dataSource;
        }
        else {
            items = this.items;
        }
        return items;
    };
    /**
     * Adds new item to the Accordion with the specified index of the Accordion.
     *
     * @param  {AccordionItemModel | AccordionItemModel[] | Object | Object[]} item - Item array that is to be added to the Accordion.
     * @param  {number} index - Number value that determines where the item should be added.
     * By default, item is added at the last index if the index is not specified.
     * @returns {void}
     */
    Accordion.prototype.addItem = function (item, index) {
        var _this = this;
        var ele = this.element;
        var itemEle = this.getItemElements();
        var items = this.getItems();
        if (isNullOrUndefined(index)) {
            index = items.length;
        }
        if (ele.childElementCount >= index) {
            var addItems = (item instanceof Array) ? item : [item];
            addItems.forEach(function (addItem, i) {
                var itemIndex = index + i;
                items.splice(itemIndex, 0, addItem);
                var innerItemEle = _this.renderInnerItem(addItem, itemIndex);
                if (ele.childElementCount === itemIndex) {
                    ele.appendChild(innerItemEle);
                }
                else {
                    ele.insertBefore(innerItemEle, itemEle[parseInt(itemIndex.toString(), 10)]);
                }
                EventHandler.add(innerItemEle.querySelector('.' + CLS_HEADER), 'focus', _this.focusIn, _this);
                EventHandler.add(innerItemEle.querySelector('.' + CLS_HEADER), 'blur', _this.focusOut, _this);
                _this.expandedIndices = [];
                _this.expandedItemRefresh();
                if (addItem && addItem.expanded) {
                    _this.expandItem(true, itemIndex);
                }
            });
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Accordion.prototype.expandedItemRefresh = function () {
        var _this = this;
        var itemEle = this.getItemElements();
        [].slice.call(itemEle).forEach(function (el) {
            if (el.classList.contains(CLS_SLCTED)) {
                _this.expandedItemsPush(el);
            }
        });
    };
    /**
     * Dynamically removes item from Accordion.
     *
     * @param  {number} index - Number value that determines which item should be removed.
     * @returns {void}.
     */
    Accordion.prototype.removeItem = function (index) {
        if (this.isReact || this.isAngular) {
            var item = selectAll('.' + CLS_ITEM$1, this.element)[parseInt(index.toString(), 10)];
            var header = select('.' + CLS_HEADERCTN, item);
            var content = select('.' + CLS_CTENT, item);
            this.clearAccordionTemplate(header, this.dataSource.length > 0 ? 'headerTemplate' : 'header', CLS_HEADERCTN);
            this.clearAccordionTemplate(content, this.dataSource.length > 0 ? 'itemTemplate' : 'content', CLS_CTENT);
        }
        var itemEle = this.getItemElements();
        var ele = itemEle[parseInt(index.toString(), 10)];
        var items = this.getItems();
        if (isNullOrUndefined(ele)) {
            return;
        }
        this.restoreContent(index);
        detach(ele);
        items.splice(index, 1);
        this.expandedIndices = [];
        this.expandedItemRefresh();
    };
    /**
     * Sets focus to the specified index item header in Accordion.
     *
     * @param  {number} index - Number value that determines which item should be focused.
     * @returns {void}.
     */
    Accordion.prototype.select = function (index) {
        var itemEle = this.getItemElements();
        var ele = itemEle[parseInt(index.toString(), 10)];
        if (isNullOrUndefined(ele) || isNullOrUndefined(select('.' + CLS_HEADER, ele))) {
            return;
        }
        ele.children[0].focus();
    };
    /**
     * Shows or hides the specified item from Accordion.
     *
     * @param  {number} index - Number value that determines which item should be hidden/shown.
     * @param  {boolean} isHidden - Boolean value that determines the action either hide (true) or show (false). Default value is false.
     * If the `isHidden` value is false, the item is shown or else item it is hidden.
     * @returns {void}.
     */
    Accordion.prototype.hideItem = function (index, isHidden) {
        var itemEle = this.getItemElements();
        var ele = itemEle[parseInt(index.toString(), 10)];
        if (isNullOrUndefined(ele)) {
            return;
        }
        if (isNullOrUndefined(isHidden)) {
            isHidden = true;
        }
        if (isHidden) {
            this.add(ele, CLS_ITEMHIDE);
        }
        else {
            this.remove(ele, CLS_ITEMHIDE);
        }
    };
    /**
     * Enables/Disables the specified Accordion item.
     *
     * @param  {number} index - Number value that determines which item should be enabled/disabled.
     * @param  {boolean} isEnable - Boolean value that determines the action as enable (true) or disable (false).
     * If the `isEnable` value is true, the item is enabled or else it is disabled.
     * @returns {void}.
     */
    Accordion.prototype.enableItem = function (index, isEnable) {
        var itemEle = this.getItemElements();
        var ele = itemEle[parseInt(index.toString(), 10)];
        if (isNullOrUndefined(ele)) {
            return;
        }
        var eleHeader = ele.firstElementChild;
        if (isEnable) {
            this.remove(ele, CLS_DISABLE$3);
            attributes(eleHeader, { 'tabindex': '0', 'aria-disabled': 'false' });
            eleHeader.focus();
        }
        else {
            if (ele.classList.contains(CLS_ACTIVE)) {
                this.expandItem(false, index);
                this.eleMoveFocus('movedown', this.element, eleHeader);
            }
            this.add(ele, CLS_DISABLE$3);
            eleHeader.setAttribute('aria-disabled', 'true');
            eleHeader.removeAttribute('tabindex');
        }
    };
    /**
     * Expands/Collapses the specified Accordion item.
     *
     * @param  {boolean} isExpand - Boolean value that determines the action as expand or collapse.
     * @param  {number} index - Number value that determines which item should be expanded/collapsed.`index` is optional parameter.
     * Without Specifying index, based on the `isExpand` value all Accordion item can be expanded or collapsed.
     * @returns {void}.
     */
    Accordion.prototype.expandItem = function (isExpand, index) {
        var _this = this;
        var itemEle = this.getItemElements();
        if (isNullOrUndefined(index)) {
            if (this.expandMode === 'Single' && isExpand) {
                var ele = itemEle[itemEle.length - 1];
                this.itemExpand(isExpand, ele, this.getIndexByItem(ele));
            }
            else {
                var item = select('#' + this.lastActiveItemId, this.element);
                [].slice.call(itemEle).forEach(function (el) {
                    _this.itemExpand(isExpand, el, _this.getIndexByItem(el));
                    el.classList.remove(CLS_EXPANDSTATE);
                });
                var expandedItem = select('.' + CLS_EXPANDSTATE, this.element);
                if (expandedItem) {
                    expandedItem.classList.remove(CLS_EXPANDSTATE);
                }
                if (item) {
                    item.classList.add(CLS_EXPANDSTATE);
                }
            }
        }
        else {
            var ele = itemEle[parseInt(index.toString(), 10)];
            if (isNullOrUndefined(ele) || !ele.classList.contains(CLS_SLCT) || (ele.classList.contains(CLS_ACTIVE) && isExpand)) {
                return;
            }
            else {
                if (this.expandMode === 'Single') {
                    this.expandItem(false);
                }
                this.itemExpand(isExpand, ele, index);
            }
        }
    };
    Accordion.prototype.itemExpand = function (isExpand, ele, index) {
        var ctn = ele.children[1];
        if (ele.classList.contains(CLS_DISABLE$3)) {
            return;
        }
        if (isNullOrUndefined(ctn) && isExpand) {
            ctn = this.contentRendering(index);
            ele.appendChild(ctn);
            this.ariaAttrUpdate(ele);
            this.expand(ctn);
        }
        else if (!isNullOrUndefined(ctn)) {
            if (isExpand) {
                this.expand(ctn);
            }
            else {
                this.collapse(ctn);
            }
        }
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Accordion.prototype.destroyItems = function () {
        this.restoreContent(null);
        if (this.isReact || this.isAngular || this.isVue) {
            this.clearTemplate();
        }
        [].slice.call(this.element.querySelectorAll('.' + CLS_ITEM$1)).forEach(function (el) {
            detach(el);
        });
    };
    Accordion.prototype.restoreContent = function (index) {
        var ctnElePos;
        if (isNullOrUndefined(index)) {
            ctnElePos = this.element;
        }
        else {
            ctnElePos = this.element.querySelectorAll('.' + CLS_ITEM$1)[parseInt(index.toString(), 10)];
        }
        this.templateEle.forEach(function (eleStr) {
            if (!isNullOrUndefined(ctnElePos.querySelector(eleStr))) {
                document.body.appendChild(ctnElePos.querySelector(eleStr)).style.display = 'none';
            }
        });
    };
    Accordion.prototype.updateItem = function (item, index) {
        if (!isNullOrUndefined(item)) {
            var items = this.getItems();
            var itemObj = items[parseInt(index.toString(), 10)];
            items.splice(index, 1);
            this.restoreContent(index);
            var header = select('.' + CLS_HEADERCTN, item);
            var content = select('.' + CLS_CTENT, item);
            if (this.isReact || this.isAngular) {
                this.clearAccordionTemplate(header, 'header', CLS_HEADERCTN);
                this.clearAccordionTemplate(content, 'content', CLS_CTENT);
            }
            detach(item);
            this.addItem(itemObj, index);
        }
    };
    Accordion.prototype.setTemplate = function (template, toElement, index) {
        this.fetchElement(toElement, template, index);
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Accordion.prototype.clearAccordionTemplate = function (templateEle, templateName, className) {
        if (this.registeredTemplate && this.registeredTemplate["" + templateName]) {
            var registeredTemplates = this.registeredTemplate;
            for (var index = 0; index < registeredTemplates["" + templateName].length; index++) {
                var registeredItem = registeredTemplates["" + templateName][parseInt(index.toString(), 10)].rootNodes[0];
                var closestItem = closest(registeredItem, '.' + className);
                if (!isNullOrUndefined(closestItem) && closestItem === templateEle || isNullOrUndefined(registeredItem.parentNode)) {
                    this.clearTemplate([templateName], [registeredTemplates["" + templateName][parseInt(index.toString(), 10)]]);
                    break;
                }
            }
        }
        else if (this.portals && this.portals.length > 0) {
            var portals = this.portals;
            for (var index = 0; index < portals.length; index++) {
                var portalItem = portals[parseInt(index.toString(), 10)];
                var closestItem = closest(portalItem.containerInfo, '.' + className);
                if (!isNullOrUndefined(closestItem) && closestItem === templateEle) {
                    this.clearTemplate([templateName], index);
                    break;
                }
            }
        }
    };
    Accordion.prototype.getPersistData = function () {
        var keyEntity = ['expandedIndices'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Gets called when the model property changes.The data that describes the old and new values of the property that changed.
     *
     * @param  {AccordionModel} newProp - It contains the new value of data.
     * @param  {AccordionModel} oldProp - It contains the old value of data.
     * @returns {void}
     * @private
     */
    Accordion.prototype.onPropertyChanged = function (newProp, oldProp) {
        var acrdn = this.element;
        var isRefresh = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'items':
                    if (!(newProp.items instanceof Array && oldProp.items instanceof Array)) {
                        var changedProp = Object.keys(newProp.items);
                        for (var j = 0; j < changedProp.length; j++) {
                            var index = parseInt(Object.keys(newProp.items)[parseInt(j.toString(), 10)], 10);
                            var property = Object.keys(newProp.items[parseInt(index.toString(), 10)]);
                            for (var k = 0; k < property.length; k++) {
                                var item = selectAll('.' + CLS_ITEM$1, this.element)[parseInt(index.toString(), 10)];
                                var oldVal = Object(oldProp.items[parseInt(index.toString(), 10)])["" + property[parseInt(k.toString(), 10)]];
                                var newVal = Object(newProp.items[parseInt(index.toString(), 10)])["" + property[parseInt(k.toString(), 10)]];
                                var temp = property[parseInt(k.toString(), 10)];
                                var content = select('.' + CLS_CTENT, item);
                                if (temp === 'header' || temp === 'iconCss' || temp === 'expanded' || ((temp === 'content') && (oldVal === ''))) {
                                    this.updateItem(item, index);
                                }
                                if (property[parseInt(k.toString(), 10)] === 'cssClass' && !isNullOrUndefined(item)) {
                                    if (oldVal) {
                                        removeClass([item], oldVal.split(' '));
                                    }
                                    if (newVal) {
                                        addClass([item], newVal.split(' '));
                                    }
                                }
                                if (property[parseInt(k.toString(), 10)] === 'visible' && !isNullOrUndefined(item)) {
                                    if (Object(newProp.items[parseInt(index.toString(), 10)])["" + property[parseInt(k.toString(), 10)]] === false) {
                                        item.classList.add(CLS_ITEMHIDE);
                                    }
                                    else {
                                        item.classList.remove(CLS_ITEMHIDE);
                                    }
                                }
                                if (property[parseInt(k.toString(), 10)] === 'disabled' && !isNullOrUndefined(item)) {
                                    this.enableItem(index, !newVal);
                                }
                                if (property.indexOf('header') < 0 && property[parseInt(k.toString(), 10)] === 'content'
                                    && !isNullOrUndefined(item) && item.children.length === 2) {
                                    if (typeof newVal === 'function') {
                                        if (this.isAngular || this.isReact) {
                                            this.clearAccordionTemplate(content, property[parseInt(k.toString(), 10)], CLS_CTENT);
                                        }
                                        var activeContent = item.querySelector('.' + CLS_CTENT);
                                        activeContent.innerHTML = '';
                                        this.setTemplate(newVal, activeContent, index);
                                    }
                                    else {
                                        if (item.classList.contains(CLS_SLCTED)) {
                                            this.expandItem(false, index);
                                        }
                                        detach(item.querySelector('.' + CLS_CONTENT));
                                    }
                                }
                            }
                        }
                    }
                    else {
                        isRefresh = true;
                    }
                    break;
                case 'dataSource':
                case 'expandedIndices':
                    if (this.expandedIndices === null) {
                        this.expandedIndices = [];
                    }
                    isRefresh = true;
                    break;
                case 'headerTemplate':
                    this.initializeHeaderTemplate();
                    isRefresh = true;
                    break;
                case 'itemTemplate':
                    this.initializeItemTemplate();
                    isRefresh = true;
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        this.add(acrdn, CLS_RTL$3);
                    }
                    else {
                        this.remove(acrdn, CLS_RTL$3);
                    }
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(newProp.height) });
                    break;
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(newProp.width) });
                    break;
                case 'expandMode':
                    if (newProp.expandMode === 'Single' && !isNullOrUndefined(this.expandedIndices) && this.expandedIndices.length > 1) {
                        this.expandItem(false);
                    }
                    break;
            }
        }
        if (isRefresh) {
            this.initExpand = [];
            if (!isNullOrUndefined(this.expandedIndices) && this.expandedIndices.length > 0) {
                this.initExpand = this.expandedIndices;
            }
            this.destroyItems();
            this.renderItems();
            this.initItemExpand();
        }
    };
    __decorate$4([
        Collection([], AccordionItem)
    ], Accordion.prototype, "items", void 0);
    __decorate$4([
        Property([])
    ], Accordion.prototype, "dataSource", void 0);
    __decorate$4([
        Property()
    ], Accordion.prototype, "itemTemplate", void 0);
    __decorate$4([
        Property()
    ], Accordion.prototype, "headerTemplate", void 0);
    __decorate$4([
        Property('100%')
    ], Accordion.prototype, "width", void 0);
    __decorate$4([
        Property('auto')
    ], Accordion.prototype, "height", void 0);
    __decorate$4([
        Property([])
    ], Accordion.prototype, "expandedIndices", void 0);
    __decorate$4([
        Property('Multiple')
    ], Accordion.prototype, "expandMode", void 0);
    __decorate$4([
        Property(true)
    ], Accordion.prototype, "enableHtmlSanitizer", void 0);
    __decorate$4([
        Complex({}, AccordionAnimationSettings)
    ], Accordion.prototype, "animation", void 0);
    __decorate$4([
        Event()
    ], Accordion.prototype, "clicked", void 0);
    __decorate$4([
        Event()
    ], Accordion.prototype, "expanding", void 0);
    __decorate$4([
        Event()
    ], Accordion.prototype, "expanded", void 0);
    __decorate$4([
        Event()
    ], Accordion.prototype, "created", void 0);
    __decorate$4([
        Event()
    ], Accordion.prototype, "destroyed", void 0);
    Accordion = __decorate$4([
        NotifyPropertyChanges
    ], Accordion);
    return Accordion;
}(Component));

var __extends$5 = (undefined && undefined.__extends) || (function () {
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
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The ContextMenu is a graphical user interface that appears on the user right click/touch hold operation.
 * ```html
 * <div id = 'target'></div>
 * <ul id = 'contextmenu'></ul>
 * ```
 * ```typescript
 * <script>
 * var contextMenuObj = new ContextMenu({items: [{ text: 'Cut' }, { text: 'Copy' },{ text: 'Paste' }], target: '#target'});
 * </script>
 * ```
 */
var ContextMenu = /** @class */ (function (_super) {
    __extends$5(ContextMenu, _super);
    /**
     * Constructor for creating the widget.
     *
     * @private
     * @param {ContextMenuModel} options - Specifies the context menu model
     * @param {string} element - Specifies the element
     */
    function ContextMenu(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * For internal use only - prerender processing.
     *
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.preRender = function () {
        this.isMenu = false;
        this.element.id = this.element.id || getUniqueID('ej2-contextmenu');
        _super.prototype.preRender.call(this);
    };
    ContextMenu.prototype.initialize = function () {
        this.template = this.itemTemplate ? this.itemTemplate : null;
        _super.prototype.initialize.call(this);
        attributes(this.element, { 'role': 'menubar', 'tabindex': '0' });
        this.element.style.zIndex = getZindexPartial(this.element).toString();
    };
    /**
     * This method is used to open the ContextMenu in specified position.
     *
     * @param {number} top - To specify ContextMenu vertical positioning.
     * @param {number} left - To specify ContextMenu horizontal positioning.
     * @param {HTMLElement} target - To calculate z-index for ContextMenu based upon the specified target.
     * @function open
     * @returns {void}
     */
    ContextMenu.prototype.open = function (top, left, target) {
        _super.prototype.openMenu.call(this, null, null, top, left, null, target);
    };
    /**
     * Closes the ContextMenu if it is opened.
     *
     * @function close
     * @returns {void}
     */
    ContextMenu.prototype.close = function () {
        _super.prototype.closeMenu.call(this);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {ContextMenuModel} newProp - Specifies new properties
     * @param {ContextMenuModel} oldProp - Specifies old properties
     * @returns {void}
     */
    ContextMenu.prototype.onPropertyChanged = function (newProp, oldProp) {
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'filter':
                    this.close();
                    this.filter = newProp.filter;
                    break;
                case 'target':
                    this.unWireEvents(oldProp.target);
                    this.wireEvents();
                    break;
                case 'itemTemplate':
                    this.itemTemplate = newProp.itemTemplate;
                    this.refresh();
            }
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Module Name
     * @private
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextmenu';
    };
    __decorate$5([
        Property('')
    ], ContextMenu.prototype, "target", void 0);
    __decorate$5([
        Property('')
    ], ContextMenu.prototype, "filter", void 0);
    __decorate$5([
        Collection([], MenuItem)
    ], ContextMenu.prototype, "items", void 0);
    __decorate$5([
        Property(null)
    ], ContextMenu.prototype, "itemTemplate", void 0);
    __decorate$5([
        Property(false)
    ], ContextMenu.prototype, "enableScrolling", void 0);
    ContextMenu = __decorate$5([
        NotifyPropertyChanges
    ], ContextMenu);
    return ContextMenu;
}(MenuBase));

var __extends$6 = (undefined && undefined.__extends) || (function () {
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
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var VMENU = 'e-vertical';
var SCROLLABLE = 'e-scrollable';
var HAMBURGER = 'e-hamburger';
/**
 * The Menu is a graphical user interface that serve as navigation headers for your application or site.
 * ```html
 * <ul id = 'menu'></ul>
 * ```
 * ```typescript
 * <script>
 * var menuObj = new Menu({ items: [{ text: 'Home' }, { text: 'Contact Us' },{ text: 'Login' }]});
 * menuObj.appendTo("#menu");
 * </script>
 * ```
 */
var Menu = /** @class */ (function (_super) {
    __extends$6(Menu, _super);
    /**
     * Constructor for creating the component.
     *
     * @private
     * @param {MenuModel} options - Specifies the menu model
     * @param {string} element - Specifies the element
     */
    function Menu(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.tempItems = [];
        return _this;
    }
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    Menu.prototype.getModuleName = function () {
        return 'menu';
    };
    /**
     * For internal use only - prerender processing.
     *
     * @private
     * @returns {void}
     */
    Menu.prototype.preRender = function () {
        this.isMenu = true;
        this.element.id = this.element.id || getUniqueID('ej2-menu');
        if (this.template) {
            try {
                if (typeof this.template !== 'function' && document.querySelectorAll(this.template).length) {
                    this.template = document.querySelector(this.template).innerHTML.trim();
                    this.clearChanges();
                }
            }
            catch (e) {
                /* action on catch */
            }
            this.updateMenuItems(this.items);
        }
        else {
            this.updateMenuItems(this.items);
        }
        _super.prototype.preRender.call(this);
    };
    Menu.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        attributes(this.element, { 'role': 'menubar', 'tabindex': '0' });
        if (this.orientation === 'Vertical') {
            this.element.classList.add(VMENU);
            if (this.hamburgerMode && !this.target) {
                this.element.previousElementSibling.classList.add(VMENU);
            }
            this.element.setAttribute('aria-orientation', 'vertical');
        }
        else {
            if (Browser.isDevice && !this.enableScrolling) {
                this.element.parentElement.classList.add(SCROLLABLE);
            }
        }
        if (this.hamburgerMode) {
            this.element.parentElement.classList.add(HAMBURGER);
            if (this.orientation === 'Horizontal') {
                this.element.classList.add('e-hide-menu');
            }
        }
    };
    Menu.prototype.updateMenuItems = function (items) {
        this.tempItems = items;
        this.items = [];
        this.tempItems.map(this.createMenuItems, this);
        this.setProperties({ items: this.items }, true);
        this.tempItems = [];
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {MenuModel} newProp - Specifies the new properties.
     * @param {MenuModel} oldProp - Specifies the old properties.
     * @returns {void}
     */
    Menu.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'orientation':
                    if (newProp.orientation === 'Vertical') {
                        this.element.classList.add(VMENU);
                        if (this.hamburgerMode) {
                            if (!this.target) {
                                this.element.previousElementSibling.classList.add(VMENU);
                            }
                            this.element.classList.remove('e-hide-menu');
                        }
                        this.element.setAttribute('aria-orientation', 'vertical');
                    }
                    else {
                        this.element.classList.remove(VMENU);
                        if (this.hamburgerMode) {
                            if (!this.target) {
                                this.element.previousElementSibling.classList.remove(VMENU);
                            }
                            this.element.classList.add('e-hide-menu');
                        }
                        this.element.removeAttribute('aria-orientation');
                    }
                    break;
                case 'items':
                    if (!Object.keys(oldProp.items).length) {
                        this.updateMenuItems(newProp.items);
                    }
                    break;
                case 'hamburgerMode':
                    if (!this.element.previousElementSibling) {
                        _super.prototype.createHeaderContainer.call(this);
                    }
                    if (newProp.hamburgerMode) {
                        this.element.parentElement.classList.add(HAMBURGER);
                        [].slice.call(this.element.getElementsByClassName('e-blankicon')).forEach(function (li) {
                            li.style[_this.enableRtl ? 'paddingRight' : 'paddingLeft'] = '';
                        });
                    }
                    else {
                        this.element.parentElement.classList.remove(HAMBURGER);
                        if (this.orientation === 'Vertical') {
                            this.setBlankIconStyle(this.element);
                        }
                    }
                    if (this.orientation === 'Vertical') {
                        if (!this.target) {
                            this.element.previousElementSibling.classList.add(VMENU);
                        }
                        this.element.classList.remove('e-hide-menu');
                    }
                    else {
                        if (this.target) {
                            this.element.previousElementSibling.classList.add(VMENU);
                        }
                        else {
                            this.element.previousElementSibling.classList.remove(VMENU);
                        }
                        this.element.classList[newProp.hamburgerMode ? 'add' : 'remove']('e-hide-menu');
                    }
                    break;
                case 'title':
                    if (this.hamburgerMode && this.element.previousElementSibling) {
                        newProp.title = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(newProp.title) : newProp.title;
                        this.element.previousElementSibling.querySelector('.e-menu-title').innerHTML = newProp.title;
                    }
                    break;
                case 'target':
                    if (this.hamburgerMode) {
                        this.unWireEvents(oldProp.target);
                        this.wireEvents();
                        if (this.orientation === 'Horizontal') {
                            if (!newProp.target) {
                                if (!this.element.previousElementSibling) {
                                    _super.prototype.createHeaderContainer.call(this);
                                }
                                this.element.previousElementSibling.classList.remove(VMENU);
                            }
                            else {
                                this.element.previousElementSibling.classList.add(VMENU);
                            }
                            this.element.classList.add('e-hide-menu');
                        }
                    }
                    break;
                case 'template':
                    this.template = newProp.template;
                    this.refresh();
                    break;
            }
        }
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
    };
    Menu.prototype.createMenuItems = function (item) {
        var idx;
        var i;
        var items = this.items;
        var pIdField = this.getField('parentId');
        if (item["" + pIdField]) {
            idx = this.getIndex(item["" + pIdField].toString(), true);
            for (i = 0; i < idx.length; i++) {
                if (!items[idx[i]].items) {
                    items[idx[i]].items = [];
                }
                items = items[idx[i]].items;
            }
            items.push(item);
        }
        else {
            this.items.push(item);
        }
    };
    /**
     * This method is used to open the Menu in hamburger mode.
     *
     * @function open
     * @returns {void}
     */
    Menu.prototype.open = function () {
        _super.prototype.openHamburgerMenu.call(this);
    };
    /**
     * Closes the Menu if it is opened in hamburger mode.
     *
     * @function close
     * @returns {void}
     */
    Menu.prototype.close = function () {
        _super.prototype.closeHamburgerMenu.call(this);
    };
    __decorate$6([
        Property('Horizontal')
    ], Menu.prototype, "orientation", void 0);
    __decorate$6([
        Property('')
    ], Menu.prototype, "target", void 0);
    __decorate$6([
        Property(null)
    ], Menu.prototype, "template", void 0);
    __decorate$6([
        Property(false)
    ], Menu.prototype, "enableScrolling", void 0);
    __decorate$6([
        Property(false)
    ], Menu.prototype, "hamburgerMode", void 0);
    __decorate$6([
        Property('Menu')
    ], Menu.prototype, "title", void 0);
    __decorate$6([
        Property(true)
    ], Menu.prototype, "enableHtmlSanitizer", void 0);
    __decorate$6([
        Complex({ itemId: 'id', text: 'text', parentId: 'parentId', iconCss: 'iconCss', url: 'url', separator: 'separator', children: 'items' }, FieldSettings)
    ], Menu.prototype, "fields", void 0);
    Menu = __decorate$6([
        NotifyPropertyChanges
    ], Menu);
    return Menu;
}(MenuBase));

var __extends$7 = (undefined && undefined.__extends) || (function () {
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
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CLS_TAB = 'e-tab';
var CLS_HEADER$1 = 'e-tab-header';
var CLS_BLA_TEM = 'blazor-template';
var CLS_CONTENT$1 = 'e-content';
var CLS_NEST$1 = 'e-nested';
var CLS_ITEMS$1 = 'e-items';
var CLS_ITEM$2 = 'e-item';
var CLS_TEMPLATE$1 = 'e-template';
var CLS_RTL$4 = 'e-rtl';
var CLS_ACTIVE$1 = 'e-active';
var CLS_DISABLE$4 = 'e-disable';
var CLS_HIDDEN$1 = 'e-hidden';
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
var CLS_OVERLAY$2 = 'e-overlay';
var CLS_HSCRCNT = 'e-hscroll-content';
var CLS_VSCRCNT = 'e-vscroll-content';
var CLS_VTAB = 'e-vertical-tab';
var CLS_VERTICAL$1 = 'e-vertical';
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
    __extends$7(TabActionSettings, _super);
    function TabActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$7([
        Property('SlideLeftIn')
    ], TabActionSettings.prototype, "effect", void 0);
    __decorate$7([
        Property(600)
    ], TabActionSettings.prototype, "duration", void 0);
    __decorate$7([
        Property('ease')
    ], TabActionSettings.prototype, "easing", void 0);
    return TabActionSettings;
}(ChildProperty));
/**
 * Objects used for configuring the Tab animation properties.
 */
var TabAnimationSettings = /** @class */ (function (_super) {
    __extends$7(TabAnimationSettings, _super);
    function TabAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$7([
        Complex({ effect: 'SlideLeftIn', duration: 600, easing: 'ease' }, TabActionSettings)
    ], TabAnimationSettings.prototype, "previous", void 0);
    __decorate$7([
        Complex({ effect: 'SlideRightIn', duration: 600, easing: 'ease' }, TabActionSettings)
    ], TabAnimationSettings.prototype, "next", void 0);
    return TabAnimationSettings;
}(ChildProperty));
/**
 * Objects used for configuring the Tab item header properties.
 */
var Header = /** @class */ (function (_super) {
    __extends$7(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$7([
        Property('')
    ], Header.prototype, "text", void 0);
    __decorate$7([
        Property('')
    ], Header.prototype, "iconCss", void 0);
    __decorate$7([
        Property('left')
    ], Header.prototype, "iconPosition", void 0);
    return Header;
}(ChildProperty));
/**
 * An array of object that is used to configure the Tab.
 */
var TabItem = /** @class */ (function (_super) {
    __extends$7(TabItem, _super);
    function TabItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$7([
        Complex({}, Header)
    ], TabItem.prototype, "header", void 0);
    __decorate$7([
        Property(null)
    ], TabItem.prototype, "headerTemplate", void 0);
    __decorate$7([
        Property('')
    ], TabItem.prototype, "content", void 0);
    __decorate$7([
        Property('')
    ], TabItem.prototype, "cssClass", void 0);
    __decorate$7([
        Property(false)
    ], TabItem.prototype, "disabled", void 0);
    __decorate$7([
        Property(true)
    ], TabItem.prototype, "visible", void 0);
    __decorate$7([
        Property()
    ], TabItem.prototype, "id", void 0);
    __decorate$7([
        Property(-1)
    ], TabItem.prototype, "tabIndex", void 0);
    return TabItem;
}(ChildProperty));
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
    __extends$7(Tab, _super);
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
        if (!isNullOrUndefined(this.tbObj)) {
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
            var cntEle = select('.' + CLS_TAB + ' > .' + CLS_CONTENT$1, this.element);
            this.element.classList.remove(CLS_TEMPLATE$1);
            if (!isNullOrUndefined(cntEle)) {
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
        if (!isNullOrUndefined(this.tbObj)) {
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
        var nested = closest(this.element, '.' + CLS_CONTENT$1);
        this.prevIndex = 0;
        this.isNested = false;
        this.isPopup = false;
        this.initRender = true;
        this.isSwiped = false;
        this.itemIndexArray = [];
        this.templateEle = [];
        if (this.allowDragAndDrop) {
            this.dragArea = !isNullOrUndefined(this.dragArea) ? this.dragArea : '#' + this.element.id + ' ' + ('.' + CLS_HEADER$1);
        }
        if (!isNullOrUndefined(nested)) {
            nested.parentElement.classList.add(CLS_NEST$1);
            this.isNested = true;
        }
        var name = Browser.info.name;
        var css = (name === 'msie') ? 'e-ie' : (name === 'edge') ? 'e-edge' : (name === 'safari') ? 'e-safari' : '';
        setStyleAttribute(this.element, { 'width': formatUnit(this.width), 'height': formatUnit(this.height) });
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
            if (isNullOrUndefined(item.id) && !isNullOrUndefined(item.setProperties)) {
                item.setProperties({ id: TABITEMPREFIX + index.toString() }, true);
            }
        });
        if (this.items.length > 0 && ele.children.length === 0) {
            ele.appendChild(this.createElement('div', { className: CLS_CONTENT$1 }));
            this.setOrientation(this.headerPlacement, this.createElement('div', { className: CLS_HEADER$1 }));
            this.isTemplate = false;
        }
        else if (this.element.children.length > 0) {
            this.isTemplate = true;
            ele.classList.add(CLS_TEMPLATE$1);
            var header = ele.querySelector('.' + CLS_HEADER$1);
            if (header && this.headerPlacement === 'Bottom') {
                this.setOrientation(this.headerPlacement, header);
            }
        }
        if (!isNullOrUndefined(select('.' + CLS_HEADER$1, this.element)) && !isNullOrUndefined(select('.' + CLS_CONTENT$1, this.element))) {
            this.renderHeader();
            this.tbItems = select('.' + CLS_HEADER$1 + ' .' + CLS_TB_ITEMS, this.element);
            if (!isNullOrUndefined(this.tbItems)) {
                rippleEffect(this.tbItems, { selector: '.e-tab-wrap' });
            }
            this.renderContent();
            if (selectAll('.' + CLS_TB_ITEM, this.element).length > 0) {
                this.tbItems = select('.' + CLS_HEADER$1 + ' .' + CLS_TB_ITEMS, this.element);
                this.bdrLine = this.createElement('div', { className: CLS_INDICATOR + ' ' + CLS_HIDDEN$1 + ' ' + CLS_IGNORE });
                var scrCnt = select('.' + this.scrCntClass, this.tbItems);
                if (!isNullOrUndefined(scrCnt)) {
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
            if (this.element.children.length > 1 && this.element.children[1].classList.contains(CLS_HEADER$1)) {
                this.setProperties({ headerPlacement: 'Bottom' }, true);
            }
            var count = this.hdrEle.children.length;
            var hdrItems = [];
            for (var i = 0; i < count; i++) {
                hdrItems.push(this.hdrEle.children.item(i));
            }
            if (count > 0) {
                var tabItems_1 = this.createElement('div', { className: CLS_ITEMS$1 });
                this.hdrEle.appendChild(tabItems_1);
                hdrItems.forEach(function (item, index) {
                    _this.lastIndex = index;
                    var attr = {
                        className: CLS_ITEM$2, id: CLS_ITEM$2 + _this.tabId + '_' + index
                    };
                    var txt = _this.createElement('span', {
                        className: CLS_TEXT, attrs: { 'role': 'presentation' }
                    }).outerHTML;
                    var cont = _this.createElement('div', {
                        className: CLS_TEXT_WRAP, innerHTML: txt + _this.btnCls.outerHTML
                    }).outerHTML;
                    var wrap = _this.createElement('div', {
                        className: CLS_WRAP, innerHTML: cont,
                        attrs: { role: 'tab', tabIndex: '-1', 'aria-selected': 'false', 'aria-controls': CLS_CONTENT$1 + _this.tabId + '_' + index, 'aria-disabled': 'false' }
                    });
                    wrap.querySelector('.' + CLS_TEXT).appendChild(item);
                    tabItems_1.appendChild(_this.createElement('div', attr));
                    selectAll('.' + CLS_ITEM$2, tabItems_1)[index].appendChild(wrap);
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
        if (!isNullOrUndefined(this.element.getAttribute('aria-label'))) {
            this.hdrEle.setAttribute('aria-label', this.element.getAttribute('aria-label'));
            this.element.removeAttribute('aria-label');
        }
        else if (!isNullOrUndefined(this.element.getAttribute('aria-labelledby'))) {
            this.hdrEle.setAttribute('aria-labelledby', this.element.getAttribute('aria-labelledby'));
            this.element.removeAttribute('aria-labelledby');
        }
        this.setCloseButton(this.showCloseButton);
        var toolbarHeader = this.tbObj.element.querySelector('.' + CLS_TB_ITEMS);
        if (!isNullOrUndefined(toolbarHeader)) {
            if (isNullOrUndefined(toolbarHeader.id) || toolbarHeader.id === '') {
                toolbarHeader.id = this.element.id + '_' + 'tab_header_items';
            }
        }
    };
    Tab.prototype.createContentElement = function (index) {
        var contentElement = this.createElement('div', {
            id: CLS_CONTENT$1 + this.tabId + '_' + index, className: CLS_ITEM$2,
            attrs: { 'role': 'tabpanel', 'aria-labelledby': CLS_ITEM$2 + this.tabId + '_' + index }
        });
        if (['Dynamic', 'Demand'].indexOf(this.loadOn) !== -1 ||
            (this.loadOn === 'Init' && index === this.selectedItem)) {
            addClass([contentElement], CLS_ACTIVE$1);
        }
        return contentElement;
    };
    Tab.prototype.renderContent = function () {
        this.cntEle = select('.' + CLS_CONTENT$1, this.element);
        var hdrItem = selectAll('.' + CLS_TB_ITEM, this.element);
        if (this.isTemplate) {
            this.cnt = (this.cntEle.children.length > 0) ? this.cntEle.innerHTML : '';
            var contents = this.cntEle.children;
            for (var i = 0; i < hdrItem.length; i++) {
                if (contents.length - 1 >= i) {
                    addClass([contents.item(i)], CLS_ITEM$2);
                    attributes(contents.item(i), { 'role': 'tabpanel', 'aria-labelledby': CLS_ITEM$2 + this.tabId + '_' + i });
                    contents.item(i).id = CLS_CONTENT$1 + this.tabId + '_' + i;
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
        if (!isNullOrUndefined(this.cntEle)) {
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
        items.forEach(function (item, i) {
            var pos = (isNullOrUndefined(item.header) || isNullOrUndefined(item.header.iconPosition)) ? '' : item.header.iconPosition;
            var css = (isNullOrUndefined(item.header) || isNullOrUndefined(item.header.iconCss)) ? '' : item.header.iconCss;
            if ((isNullOrUndefined(item.headerTemplate)) && (isNullOrUndefined(item.header) || isNullOrUndefined(item.header.text) ||
                ((item.header.text.length === 0)) && (css === ''))) {
                spliceArray.push(i);
                return;
            }
            var txt = item.headerTemplate || item.header.text;
            if (typeof txt === 'string' && _this.enableHtmlSanitizer) {
                txt = SanitizeHtmlHelper.sanitize(txt);
            }
            var itemIndex;
            if (_this.isReplace && !isNullOrUndefined(_this.tbId) && _this.tbId !== '') {
                itemIndex = parseInt(_this.tbId.substring(_this.tbId.lastIndexOf('_') + 1), 10);
                _this.tbId = '';
            }
            else {
                itemIndex = index + i;
            }
            _this.lastIndex = ((tbItems.length === 0) ? i : ((_this.isReplace) ? (itemIndex) : (maxId + 1 + i)));
            var disabled = (item.disabled) ? ' ' + CLS_DISABLE$4 + ' ' + CLS_OVERLAY$2 : '';
            var hidden = (item.visible === false) ? ' ' + CLS_HIDDEN$1 : '';
            txtWrapEle = _this.createElement('div', { className: CLS_TEXT, attrs: { 'role': 'presentation' } });
            var tHtml = ((txt instanceof Object) ? txt.outerHTML : txt);
            var txtEmpty = (!isNullOrUndefined(tHtml) && tHtml !== '');
            if (!isNullOrUndefined(txt.tagName)) {
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
            var tabIndex = isNullOrUndefined(item.tabIndex) ? '-1' : item.tabIndex.toString();
            var wrapAttrs = (item.disabled) ? { role: 'tab', 'aria-disabled': 'true' } : { tabIndex: tabIndex, 'data-tabindex': tabIndex, role: 'tab', 'aria-selected': 'false', 'aria-disabled': 'false' };
            tCont.appendChild(_this.btnCls.cloneNode(true));
            var wrap = _this.createElement('div', { className: CLS_WRAP, attrs: wrapAttrs });
            wrap.appendChild(tCont);
            if (_this.itemIndexArray instanceof Array) {
                _this.itemIndexArray.splice((index + i), 0, CLS_ITEM$2 + _this.tabId + '_' + _this.lastIndex);
            }
            var attrObj = {
                id: CLS_ITEM$2 + _this.tabId + '_' + _this.lastIndex, 'data-id': item.id
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
            var tabItems = selectAll('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1, tabHeader);
            [].slice.call(tabItems).forEach(function (node) { return node.classList.remove(CLS_ACTIVE$1); });
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
        if (!isNullOrUndefined(ripEle)) {
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
        var trg = select('.' + CLS_HEADER$1, this.element);
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
        var checkRTL = this.enableRtl || this.element.classList.contains(CLS_RTL$4);
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
        if (!isNullOrUndefined(animateObj)) {
            animateObj.begin = function () {
                setStyleAttribute(oldCnt, { 'position': 'absolute' });
                oldCnt.classList.add(CLS_PROGRESS);
                oldCnt.classList.add('e-view');
            };
            animateObj.end = function () {
                oldCnt.style.display = 'none';
                oldCnt.classList.remove(CLS_ACTIVE$1);
                oldCnt.classList.remove(CLS_PROGRESS);
                oldCnt.classList.remove('e-view');
                setStyleAttribute(oldCnt, { 'display': '', 'position': '' });
                if (oldCnt.childNodes.length === 0 && !_this.isTemplate) {
                    detach(oldCnt);
                }
            };
            new Animation(animateObj).animate(oldCnt);
        }
        else {
            oldCnt.classList.remove(CLS_ACTIVE$1);
        }
    };
    Tab.prototype.triggerAnimation = function (id, value) {
        var _this = this;
        var prevIndex = this.prevIndex;
        var oldCnt;
        var itemCollection = [].slice.call(this.element.querySelector('.' + CLS_CONTENT$1).children);
        itemCollection.forEach(function (item) {
            if (item.id === _this.prevActiveEle) {
                oldCnt = item;
            }
        });
        var prevEle = this.tbItem[prevIndex];
        var newCnt = this.getTrgContent(this.cntEle, this.extIndex(id));
        if (isNullOrUndefined(oldCnt) && !isNullOrUndefined(prevEle)) {
            var idNo = this.extIndex(prevEle.id);
            oldCnt = this.getTrgContent(this.cntEle, idNo);
        }
        if (!isNullOrUndefined(newCnt)) {
            this.prevActiveEle = newCnt.id;
        }
        var isPrevent = isNullOrUndefined(this.animation) || isNullOrUndefined(this.animation.next.effect) || isNullOrUndefined(this.animation.previous.effect)
            || this.animation.previous.effect === 'None' || this.animation.next.effect === 'None';
        if (this.initRender || value === false || isPrevent) {
            if (oldCnt && oldCnt !== newCnt) {
                oldCnt.classList.remove(CLS_ACTIVE$1);
            }
            return;
        }
        var cnt = select('.' + CLS_CONTENT$1, this.element);
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
            newCnt.classList.add(CLS_ACTIVE$1);
        };
        if (!this.initRender && !isNullOrUndefined(oldCnt)) {
            this.triggerPrevAnimation(oldCnt, prevIndex);
        }
        this.isPopup = false;
        if (animateObj.name === '') {
            newCnt.classList.add(CLS_ACTIVE$1);
        }
        else {
            new Animation(animateObj).animate(newCnt);
        }
    };
    Tab.prototype.keyPressed = function (trg) {
        var trgParent = closest(trg, '.' + CLS_HEADER$1 + ' .' + CLS_TB_ITEM);
        var trgIndex = this.getEleIndex(trgParent);
        if (!isNullOrUndefined(this.popEle) && trg.classList.contains('e-hor-nav')) {
            (this.popEle.classList.contains(CLS_POPUP_OPEN)) ? this.popObj.hide(this.hide) : this.popObj.show(this.show);
        }
        else if (trg.classList.contains('e-scroll-nav')) {
            trg.click();
        }
        else {
            if (!isNullOrUndefined(trgParent) && trgParent.classList.contains(CLS_ACTIVE$1) === false) {
                this.selectTab(trgIndex, null, true);
                if (!isNullOrUndefined(this.popEle)) {
                    this.popObj.hide(this.hide);
                }
            }
        }
    };
    Tab.prototype.getTabHeader = function () {
        if (isNullOrUndefined(this.element)) {
            return undefined;
        }
        var headers = [].slice.call(this.element.children).filter(function (e) { return e.classList.contains(CLS_HEADER$1); });
        if (headers.length > 0) {
            return headers[0];
        }
        else {
            var wrap = [].slice.call(this.element.children).filter(function (e) { return !e.classList.contains(CLS_BLA_TEM); })[0];
            if (!wrap) {
                return undefined;
            }
            return [].slice.call(wrap.children).filter(function (e) { return e.classList.contains(CLS_HEADER$1); })[0];
        }
    };
    Tab.prototype.getEleIndex = function (item) {
        return Array.prototype.indexOf.call(selectAll('.' + CLS_TB_ITEM, this.getTabHeader()), item);
    };
    Tab.prototype.extIndex = function (id) {
        return id.replace(CLS_ITEM$2 + this.tabId + '_', '');
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
            if (!isNullOrUndefined(_this.element.querySelector(eleStr))) {
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
        if (!isNullOrUndefined(templateFn)) {
            templateFUN = templateFn({}, this, prop);
        }
        if (!isNullOrUndefined(templateFn) && templateFUN.length > 0) {
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
        cnt = isNullOrUndefined(cnt) ? '' : cnt;
        if (typeof cnt === 'string' || isNullOrUndefined(cnt.innerHTML)) {
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
        if (!isNullOrUndefined(eleStr)) {
            if (this.templateEle.indexOf(cnt.toString()) === -1) {
                this.templateEle.push(cnt.toString());
            }
        }
    };
    Tab.prototype.getTrgContent = function (cntEle, no) {
        var ele;
        if (this.element.classList.contains(CLS_NEST$1)) {
            ele = select('.' + CLS_NEST$1 + '> .' + CLS_CONTENT$1 + ' > #' + CLS_CONTENT$1 + this.tabId + '_' + no, this.element);
        }
        else {
            ele = this.findEle(cntEle.children, CLS_CONTENT$1 + this.tabId + '_' + no);
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
            addClass([this.hdrEle], [CLS_VERTICAL$1, tbPos]);
            if (!this.element.classList.contains(CLS_NEST$1)) {
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
        var activeTab = this.hdrEle.querySelector('.' + CLS_ACTIVE$1);
        var isVertical = this.hdrEle.classList.contains(CLS_VERTICAL$1) ? true : false;
        removeClass([this.element], [CLS_VTAB]);
        removeClass([this.hdrEle], [CLS_VERTICAL$1, CLS_VLEFT, CLS_VRIGHT]);
        if (isVertical !== this.isVertical()) {
            this.changeToolbarOrientation();
            if (!isNullOrUndefined(activeTab) && activeTab.classList.contains(CLS_TB_POPUP)) {
                this.popupHandler(activeTab);
            }
        }
        this.addVerticalClass();
        this.setActiveBorder();
        this.focusItem();
    };
    Tab.prototype.focusItem = function () {
        var curActItem = select(' #' + CLS_ITEM$2 + this.tabId + '_' + this.selectedItem, this.hdrEle);
        if (!isNullOrUndefined(curActItem)) {
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
        var contentPos = Array.prototype.indexOf.call(this.element.children, this.element.querySelector('.' + CLS_CONTENT$1));
        if (place === 'Bottom' && (contentPos > headerPos)) {
            this.element.appendChild(ele);
        }
        else {
            removeClass([ele], [CLS_HBOTTOM]);
            this.element.insertBefore(ele, select('.' + CLS_CONTENT$1, this.element));
        }
    };
    Tab.prototype.setCssClass = function (ele, cls, val) {
        if (cls === '' || isNullOrUndefined(cls)) {
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
        if (isNullOrUndefined(this.cntEle)) {
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
                    setStyleAttribute(this.cntEle, { 'height': (this.element.clientHeight - hdrEle.offsetHeight) + 'px' });
                }
            }
        }
        else if (this.heightAdjustMode === 'Fill') {
            addClass([this.element], [CLS_FILL]);
            setStyleAttribute(this.element, { 'height': '100%' });
            this.loadContentElement();
            this.cntEle.style.height = 'calc(100% - ' + this.hdrEle.offsetHeight + 'px)';
        }
        else if (this.heightAdjustMode === 'Auto') {
            if (this.isTemplate === true) {
                var cnt = selectAll('.' + CLS_CONTENT$1 + ' > .' + CLS_ITEM$2, this.element);
                for (var i = 0; i < cnt.length; i++) {
                    cnt[i].style.display = 'block';
                    cnt[i].style.visibility = 'visible';
                    this.maxHeight = Math.max(this.maxHeight, this.getHeight(cnt[i]));
                    cnt[i].style.removeProperty('display');
                    cnt[i].style.removeProperty('visibility');
                }
            }
            else {
                this.cntEle = select('.' + CLS_CONTENT$1, this.element);
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
                    ele.classList.remove(CLS_ACTIVE$1);
                }
            }
            setStyleAttribute(this.cntEle, { 'height': this.maxHeight + 'px' });
        }
        else {
            this.loadContentElement();
            setStyleAttribute(this.cntEle, { 'height': 'auto' });
        }
    };
    Tab.prototype.getHeight = function (ele) {
        var cs = window.getComputedStyle(ele);
        return ele.offsetHeight + parseFloat(cs.getPropertyValue('padding-top')) + parseFloat(cs.getPropertyValue('padding-bottom')) +
            parseFloat(cs.getPropertyValue('margin-top')) + parseFloat(cs.getPropertyValue('margin-bottom'));
    };
    Tab.prototype.setActiveBorder = function () {
        var trgHdrEle = this.getTabHeader();
        var trg = select('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1, trgHdrEle);
        if (isNullOrUndefined(trg)) {
            return;
        }
        if (!this.reorderActiveTab) {
            if (trg.classList.contains(CLS_TB_POPUP) && !this.bdrLine.classList.contains(CLS_HIDDEN$1)) {
                this.bdrLine.classList.add(CLS_HIDDEN$1);
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
            setStyleAttribute(bar, { 'left': '', 'right': '' });
            var tbHeight = (isNullOrUndefined(scrollCnt)) ? this.tbItems.offsetHeight : scrollCnt.offsetHeight;
            if (tbHeight !== 0) {
                setStyleAttribute(bar, { 'top': trg.offsetTop + 'px', 'height': trg.offsetHeight + 'px' });
            }
            else {
                setStyleAttribute(bar, { 'top': 0, 'height': 0 });
            }
        }
        else {
            if (this.overflowMode === 'MultiRow') {
                var top_1 = this.headerPlacement === 'Bottom' ? trg.offsetTop : trg.offsetHeight + trg.offsetTop;
                setStyleAttribute(bar, { 'top': top_1 + 'px', 'height': '' });
            }
            else {
                setStyleAttribute(bar, { 'top': '', 'height': '' });
            }
            var tbWidth = (isNullOrUndefined(scrollCnt)) ? this.tbItems.offsetWidth : scrollCnt.offsetWidth;
            if (tbWidth !== 0) {
                setStyleAttribute(bar, { 'left': trg.offsetLeft + 'px', 'right': tbWidth - (trg.offsetLeft + trg.offsetWidth) + 'px' });
            }
            else {
                setStyleAttribute(bar, { 'left': 'auto', 'right': 'auto' });
            }
        }
        if (!isNullOrUndefined(this.bdrLine) && !trg.classList.contains(CLS_TB_POPUP)) {
            this.bdrLine.classList.remove(CLS_HIDDEN$1);
        }
    };
    Tab.prototype.setActive = function (value, skipDataBind, isInteracted) {
        if (skipDataBind === void 0) { skipDataBind = false; }
        if (isInteracted === void 0) { isInteracted = false; }
        this.tbItem = selectAll('.' + CLS_TB_ITEM, this.getTabHeader());
        var trg = this.tbItem[value];
        if (value < 0 || isNaN(value) || this.tbItem.length === 0 || !isNullOrUndefined(trg) && trg.classList.contains(CLS_DISABLE$4)) {
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
        if (trg.classList.contains(CLS_ACTIVE$1)) {
            this.setActiveBorder();
            return;
        }
        if (!this.isTemplate) {
            attributes(trg.firstElementChild, { 'aria-controls': CLS_CONTENT$1 + this.tabId + '_' + this.extIndex(trg.id) });
        }
        var id = trg.id;
        this.removeActiveClass();
        trg.classList.add(CLS_ACTIVE$1);
        trg.firstElementChild.setAttribute('aria-selected', 'true');
        var no = Number(this.extIndex(id));
        if (isNullOrUndefined(this.prevActiveEle)) {
            this.prevActiveEle = CLS_CONTENT$1 + this.tabId + '_' + no;
        }
        if (this.isTemplate) {
            if (select('.' + CLS_CONTENT$1, this.element).children.length > 0) {
                var trg_1 = this.findEle(select('.' + CLS_CONTENT$1, this.element).children, CLS_CONTENT$1 + this.tabId + '_' + no);
                if (!isNullOrUndefined(trg_1)) {
                    trg_1.classList.add(CLS_ACTIVE$1);
                }
                this.triggerAnimation(id, this.enableAnimation);
            }
        }
        else {
            this.cntEle = select('.' + CLS_TAB + ' > .' + CLS_CONTENT$1, this.element);
            while (this.loadOn === 'Dynamic' && this.cntEle.firstElementChild) {
                this.cntEle.removeChild(this.cntEle.firstElementChild);
            }
            var item = this.getTrgContent(this.cntEle, this.extIndex(id));
            if (isNullOrUndefined(item)) {
                this.cntEle.appendChild(this.createElement('div', {
                    id: CLS_CONTENT$1 + this.tabId + '_' + this.extIndex(id), className: CLS_ITEM$2 + ' ' + CLS_ACTIVE$1,
                    attrs: { role: 'tabpanel', 'aria-labelledby': CLS_ITEM$2 + this.tabId + '_' + this.extIndex(id) }
                }));
                var eleTrg = this.getTrgContent(this.cntEle, this.extIndex(id));
                var itemIndex = Array.prototype.indexOf.call(this.itemIndexArray, id);
                this.getContent(eleTrg, this.items[itemIndex].content, 'render', itemIndex);
            }
            else {
                item.classList.add(CLS_ACTIVE$1);
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
                selectedContent: select('#' + CLS_CONTENT$1 + this.tabId + '_' + this.selectingID, this.content),
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
        this.setCssClass(this.element, CLS_RTL$4, value);
        this.refreshActiveBorder();
    };
    Tab.prototype.refreshActiveBorder = function () {
        if (!isNullOrUndefined(this.bdrLine)) {
            this.bdrLine.classList.add(CLS_HIDDEN$1);
        }
        this.setActiveBorder();
    };
    Tab.prototype.showPopup = function (config) {
        var tbPop = select('.e-popup.e-toolbar-pop', this.hdrEle);
        if (tbPop && tbPop.classList.contains('e-popup-close')) {
            var tbPopObj = (tbPop && tbPop.ej2_instances[0]);
            tbPopObj.position.X = (this.headerPlacement === 'Left' || this.element.classList.contains(CLS_RTL$4)) ? 'left' : 'right';
            tbPopObj.dataBind();
            tbPopObj.show(config);
        }
    };
    Tab.prototype.bindDraggable = function () {
        var _this = this;
        if (this.allowDragAndDrop) {
            var tabHeader = this.element.querySelector('.' + CLS_HEADER$1);
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
        if (!isNullOrUndefined(this.cntEle)) {
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
        if (!isNullOrUndefined(this.keyModule)) {
            this.keyModule.destroy();
        }
        if (!isNullOrUndefined(this.tabKeyModule)) {
            this.tabKeyModule.destroy();
        }
        if (!isNullOrUndefined(this.cntEle) && !isNullOrUndefined(this.touchModule)) {
            this.touchModule.destroy();
            this.touchModule = null;
        }
        window.removeEventListener('resize', this.resizeContext);
        EventHandler.remove(this.element, 'mouseover', this.hoverHandler);
        EventHandler.remove(this.element, 'keydown', this.spaceKeyDown);
        this.element.classList.remove(CLS_RTL$4);
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
            if (!isNullOrUndefined(trgParent) && (trgIndex !== this.selectedItem)) {
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
                if (!this.tbItem[k].classList.contains(CLS_HIDDEN$1)) {
                    this.selectTab(k, null, true);
                    break;
                }
            }
        }
        else if (e.swipeDirection === 'Left' && (this.selectedItem !== selectAll('.' + CLS_TB_ITEM, this.element).length - 1)) {
            for (var i = this.selectedItem + 1; i < this.tbItem.length; i++) {
                if (!this.tbItem[i].classList.contains(CLS_HIDDEN$1)) {
                    this.selectTab(i, null, true);
                    break;
                }
            }
        }
        this.isSwiped = false;
    };
    Tab.prototype.spaceKeyDown = function (e) {
        if ((e.keyCode === 32 && e.which === 32) || (e.keyCode === 35 && e.which === 35)) {
            var clstHead = closest(e.target, '.' + CLS_HEADER$1);
            if (!isNullOrUndefined(clstHead)) {
                e.preventDefault();
            }
        }
    };
    Tab.prototype.keyHandler = function (e) {
        if (this.element.classList.contains(CLS_DISABLE$4)) {
            return;
        }
        this.element.classList.add(CLS_FOCUS);
        var trg = e.target;
        var tabHeader = this.getTabHeader();
        var actEle = select('.' + CLS_ACTIVE$1, tabHeader);
        this.popEle = select('.' + CLS_TB_POP, tabHeader);
        if (!isNullOrUndefined(this.popEle)) {
            this.popObj = this.popEle.ej2_instances[0];
        }
        var item = closest(document.activeElement, '.' + CLS_TB_ITEM);
        var trgParent = closest(trg, '.' + CLS_TB_ITEM);
        switch (e.action) {
            case 'space':
            case 'enter':
                if (trg.parentElement.classList.contains(CLS_DISABLE$4)) {
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
                    && closest(trg, '.' + CLS_TB_ITEM).classList.contains(CLS_ACTIVE$1) === false) {
                    trg.setAttribute('tabindex', trg.getAttribute('data-tabindex'));
                }
                if (this.popObj && isVisible(this.popObj.element)) {
                    this.popObj.hide(this.hide);
                }
                if (!isNullOrUndefined(actEle) && actEle.children.item(0).getAttribute('tabindex') === '-1') {
                    actEle.children.item(0).setAttribute('tabindex', '0');
                }
                break;
            case 'moveLeft':
            case 'moveRight':
                if (!isNullOrUndefined(item)) {
                    this.refreshItemVisibility(item);
                }
                break;
            case 'openPopup':
                e.preventDefault();
                if (!isNullOrUndefined(this.popEle) && this.popEle.classList.contains(CLS_POPUP_CLOSE)) {
                    this.popObj.show(this.show);
                }
                break;
            case 'delete':
                if (this.showCloseButton === true && !isNullOrUndefined(trgParent)) {
                    var nxtSib = trgParent.nextSibling;
                    if (!isNullOrUndefined(nxtSib) && nxtSib.classList.contains(CLS_TB_ITEM)) {
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
        if (!this.isVertical() && !isNullOrUndefined(scrCnt)) {
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
        if (!isNullOrUndefined(trg.classList) && trg.classList.contains(CLS_ICON_CLOSE)) {
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
                    if (hdr && !isNullOrUndefined(hdr.id) && hdr.id !== '') {
                        itemIndex = this.getIndexFromEle(hdr.id);
                    }
                    else {
                        itemIndex = index;
                    }
                    var hdrItem = select('.' + CLS_TB_ITEMS + ' #' + CLS_ITEM$2 + this.tabId + '_' + itemIndex, this.element);
                    var cntItem = select('.' + CLS_CONTENT$1 + ' #' + CLS_CONTENT$1 + this.tabId + '_' + itemIndex, this.element);
                    if (properties[j] === 'header' || properties[j] === 'headerTemplate') {
                        var icon = (isNullOrUndefined(this.items[index].header) ||
                            isNullOrUndefined(this.items[index].header.iconCss)) ? '' : this.items[index].header.iconCss;
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
                            var isHiddenEle = hdrItem.classList.contains(CLS_HIDDEN$1);
                            detach(hdrItem);
                            this.isReplace = true;
                            this.addTab(arr, index);
                            if (isHiddenEle) {
                                this.hideTab(index);
                            }
                            this.isReplace = false;
                        }
                    }
                    if (properties[j] === 'content' && !isNullOrUndefined(cntItem)) {
                        var strVal = typeof newVal === 'string' || isNullOrUndefined(newVal.innerHTML);
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
                            this.clearTabTemplate(cntItem, properties[j], CLS_ITEM$2);
                            cntItem.innerHTML = '';
                            this.templateCompile(cntItem, newVal, index);
                        }
                        else if (typeof newVal !== 'function') {
                            cntItem.innerHTML = newVal;
                        }
                    }
                    if (properties[j] === 'cssClass') {
                        if (!isNullOrUndefined(hdrItem)) {
                            hdrItem.classList.remove(oldVal);
                            hdrItem.classList.add(newVal);
                        }
                        if (!isNullOrUndefined(cntItem)) {
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
            if (isNullOrUndefined(this.tbObj)) {
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
                var selectElement = select('.' + CLS_TAB + ' > .' + CLS_CONTENT$1, this.element);
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
                if (!isNullOrUndefined(e.target.closest('.' + CLS_TAB)) && !e.target.closest('.' + CLS_TAB).isEqualNode(_this.element) &&
                    _this.dragArea !== '.' + CLS_HEADER$1) {
                    _this.trigger('dragging', dragArgs);
                }
                else {
                    if (!(e.target.closest(_this.dragArea)) && _this.overflowMode !== 'Popup') {
                        document.body.style.cursor = 'not-allowed';
                        addClass([_this.cloneElement], CLS_HIDDEN$1);
                        if (_this.dragItem.classList.contains(CLS_HIDDEN$1)) {
                            removeClass([_this.dragItem], CLS_HIDDEN$1);
                        }
                        _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = 'visible';
                    }
                    else {
                        document.body.style.cursor = '';
                        _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = 'hidden';
                        if (_this.cloneElement.classList.contains(CLS_HIDDEN$1)) {
                            removeClass([_this.cloneElement], CLS_HIDDEN$1);
                        }
                    }
                    if (_this.overflowMode === 'Scrollable' && !isNullOrUndefined(_this.element.querySelector('.e-hscroll'))) {
                        var scrollRightNavEle = _this.element.querySelector('.e-scroll-right-nav');
                        var scrollLeftNavEle = _this.element.querySelector('.e-scroll-left-nav');
                        var hscrollBar = _this.element.querySelector('.e-hscroll-bar');
                        if (!isNullOrUndefined(scrollRightNavEle) && Math.abs((scrollRightNavEle.offsetWidth / 2) +
                            scrollRightNavEle.offsetLeft) > _this.cloneElement.offsetLeft + _this.cloneElement.offsetWidth) {
                            hscrollBar.scrollLeft -= 10;
                        }
                        if (!isNullOrUndefined(scrollLeftNavEle) && Math.abs((scrollLeftNavEle.offsetLeft + scrollLeftNavEle.offsetWidth) -
                            _this.cloneElement.offsetLeft) > (scrollLeftNavEle.offsetWidth / 2)) {
                            hscrollBar.scrollLeft += 10;
                        }
                    }
                    _this.cloneElement.style.pointerEvents = 'none';
                    dropItem = closest(e.target, '.' + CLS_TB_ITEM + '.e-draggable');
                    var scrollContentWidth = 0;
                    if (_this.overflowMode === 'Scrollable' && !isNullOrUndefined(_this.element.querySelector('.e-hscroll'))) {
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
            if (this.element.querySelector('.' + CLS_HEADER$1).classList.contains(CLS_CLOSE_SHOW)) {
                addClass([this.cloneElement], CLS_CLOSE_SHOW);
            }
            removeClass([this.cloneElement.querySelector('.' + CLS_WRAP)], 'e-ripple');
            if (!isNullOrUndefined(this.cloneElement.querySelector('.e-ripple-element'))) {
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
                addClass([_this.tbItems.querySelector('.' + CLS_INDICATOR)], CLS_HIDDEN$1);
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
                    _this.selectedItem = isNullOrUndefined(_this.droppedIndex) ? _this.getEleIndex(_this.dragItem) : _this.droppedIndex;
                    _this.refresh();
                }
                else {
                    _this.dragItem.querySelector('.' + CLS_WRAP).style.visibility = '';
                    removeClass([_this.tbItems.querySelector('.' + CLS_INDICATOR)], CLS_HIDDEN$1);
                    _this.droppedIndex = isNullOrUndefined(_this.droppedIndex) ? _this.getEleIndex(_this.dragItem) : _this.droppedIndex;
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
        if (isNullOrUndefined(tbItems)) {
            return;
        }
        if (value === true) {
            tbItems.classList.remove(CLS_DISABLE$4, CLS_OVERLAY$2);
            tbItems.firstElementChild.setAttribute('tabindex', tbItems.firstElementChild.getAttribute('data-tabindex'));
        }
        else {
            tbItems.classList.add(CLS_DISABLE$4, CLS_OVERLAY$2);
            tbItems.firstElementChild.removeAttribute('tabindex');
            if (tbItems.classList.contains(CLS_ACTIVE$1)) {
                this.select(index + 1);
            }
        }
        if (!isNullOrUndefined(this.items[index])) {
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
            if (items && items.length !== 0 && this.element && this.element.classList.contains(CLS_HIDDEN$1)) {
                this.element.classList.remove(CLS_HIDDEN$1);
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
        this.hdrEle = select('.' + CLS_HEADER$1, this.element);
        if (isNullOrUndefined(this.hdrEle)) {
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
            if (isNullOrUndefined(index)) {
                index = itemsCount - 1;
            }
            if (itemsCount < index || index < 0 || isNaN(index)) {
                return;
            }
            if (itemsCount === 0 && !isNullOrUndefined(this.hdrEle)) {
                this.hdrEle.style.display = '';
            }
            if (!isNullOrUndefined(this.bdrLine)) {
                this.bdrLine.classList.add(CLS_HIDDEN$1);
            }
            this.tbItems = select('.' + CLS_TB_ITEMS, this.getTabHeader());
            this.isAdd = true;
            var tabItems_2 = this.parseObject(items, index);
            this.isAdd = false;
            var i_1 = 0;
            var textValue_1;
            items.forEach(function (item, place) {
                textValue_1 = item.headerTemplate || item.header.text;
                if (!(isNullOrUndefined(item.headerTemplate || item.header) || isNullOrUndefined(textValue_1) ||
                    (textValue_1.length === 0) && !isNullOrUndefined(item.header) && isNullOrUndefined(item.header.iconCss))) {
                    if (tabItems_2[place]) {
                        if (isNullOrUndefined(item.id)) {
                            item.id = CLS_ITEM$2 + _this.tabId + '_' + TABITEMPREFIX + (lastEleIndex + place).toString();
                        }
                        tabItems_2[place].htmlAttributes['data-id'] = item.id;
                    }
                    _this.items.splice((index + i_1), 0, item);
                    i_1++;
                }
                if (!isNullOrUndefined(item.header) && !isNullOrUndefined(item.header.text) && (_this.isTemplate || _this.loadOn === 'Init')) {
                    var no = lastEleIndex + place;
                    var ele = _this.createElement('div', {
                        id: CLS_CONTENT$1 + _this.tabId + '_' + no, className: CLS_ITEM$2,
                        attrs: { role: 'tabpanel', 'aria-labelledby': CLS_ITEM$2 + '_' + no }
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
        if (isNullOrUndefined(trg)) {
            return;
        }
        var removeArgs = { removedItem: trg, removedIndex: index, cancel: false };
        this.trigger('removing', removeArgs, function (tabRemovingArgs) {
            if (!tabRemovingArgs.cancel) {
                var header = select('#' + CLS_ITEM$2 + _this.tabId + '_' + _this.extIndex(trg.id), select('.' + CLS_TB_ITEMS, _this.element));
                if (!isNullOrUndefined(header)) {
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
                var cntTrg = select('#' + CLS_CONTENT$1 + _this.tabId + '_' + _this.extIndex(trg.id), select('.' + CLS_CONTENT$1, _this.element));
                if (!isNullOrUndefined(cntTrg)) {
                    _this.clearTabTemplate(cntTrg, 'content', CLS_ITEM$2);
                    detach(cntTrg);
                }
                _this.trigger('removed', tabRemovingArgs);
                if (_this.draggableItems && _this.draggableItems.length > 0) {
                    _this.draggableItems[index].destroy();
                    _this.draggableItems[index] = null;
                    _this.draggableItems.splice(index, 1);
                }
                if (trg.classList.contains(CLS_ACTIVE$1)) {
                    index = (index > selectAll('.' + CLS_TB_ITEM + ':not(.' + CLS_TB_POPUP + ')', _this.element).length - 1) ? index - 1 : index;
                    _this.enableAnimation = false;
                    _this.tbItem = selectAll('.' + CLS_TB_ITEM, _this.getTabHeader());
                    index = _this.getSelectingTabIndex(index);
                    index = !isNaN(index) && index >= 0 && _this.tbItem.length > index ? index : 0;
                    var tabItem = _this.tbItem[index];
                    if (tabItem) {
                        if (tabItem.classList.contains(CLS_HIDDEN$1)) {
                            tabItem.classList.remove(CLS_HIDDEN$1);
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
                    var cnt = select('.' + CLS_CONTENT$1, _this.element);
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
        if (isNullOrUndefined(item)) {
            return;
        }
        if (isNullOrUndefined(value)) {
            value = true;
        }
        this.bdrLine.classList.add(CLS_HIDDEN$1);
        if (value === true) {
            item.classList.add(CLS_HIDDEN$1);
            items = selectAll('.' + CLS_TB_ITEM + ':not(.' + CLS_HIDDEN$1 + ')', this.tbItems);
            if (items.length !== 0 && item.classList.contains(CLS_ACTIVE$1)) {
                if (index !== 0) {
                    for (var i = index - 1; i >= 0; i--) {
                        if (!this.tbItem[i].classList.contains(CLS_HIDDEN$1)) {
                            this.select(i);
                            break;
                        }
                        else if (i === 0) {
                            for (var k = index + 1; k < this.tbItem.length; k++) {
                                if (!this.tbItem[k].classList.contains(CLS_HIDDEN$1)) {
                                    this.select(k);
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    for (var k = index + 1; k < this.tbItem.length; k++) {
                        if (!this.tbItem[k].classList.contains(CLS_HIDDEN$1)) {
                            this.select(k);
                            break;
                        }
                    }
                }
            }
            else if (items.length === 0) {
                this.element.classList.add(CLS_HIDDEN$1);
            }
        }
        else {
            this.element.classList.remove(CLS_HIDDEN$1);
            items = selectAll('.' + CLS_TB_ITEM + ':not(.' + CLS_HIDDEN$1 + ')', this.tbItems);
            item.classList.remove(CLS_HIDDEN$1);
            if (items.length === 0) {
                this.select(index);
            }
        }
        this.setActiveBorder();
        if (!isNullOrUndefined(this.items[index])) {
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
        this.content = select('.' + CLS_CONTENT$1, this.element);
        this.prevItem = this.tbItem[this.prevIndex];
        if (isNullOrUndefined(this.selectedItem) || (this.selectedItem < 0) || (this.tbItem.length <= this.selectedItem) || isNaN(this.selectedItem)) {
            this.selectedItem = 0;
        }
        else {
            this.selectedID = this.extIndex(this.tbItem[this.selectedItem].id);
        }
        var trg = this.tbItem[args];
        if (isNullOrUndefined(trg)) {
            this.selectedID = '0';
        }
        else {
            this.selectingID = this.extIndex(trg.id);
        }
        if (!isNullOrUndefined(this.prevItem) && !this.prevItem.classList.contains(CLS_DISABLE$4)) {
            this.prevItem.children.item(0).setAttribute('tabindex', this.prevItem.firstElementChild.getAttribute('tabindex'));
        }
        var eventArg = {
            event: event,
            previousItem: this.prevItem,
            previousIndex: this.prevIndex,
            selectedItem: this.tbItem[this.selectedItem],
            selectedIndex: this.selectedItem,
            selectedContent: !isNullOrUndefined(this.content) ?
                select('#' + CLS_CONTENT$1 + this.tabId + '_' + this.selectedID, this.content) : null,
            selectingItem: trg,
            selectingIndex: args,
            selectingContent: !isNullOrUndefined(this.content) ?
                select('#' + CLS_CONTENT$1 + this.tabId + '_' + this.selectingID, this.content) : null,
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
        if (!isNullOrUndefined(this.tbItem[args]) && (this.tbItem[args].classList.contains(CLS_DISABLE$4) ||
            this.tbItem[args].classList.contains(CLS_HIDDEN$1))) {
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
                    if ((!isNullOrUndefined(this.items) && this.items.length > 0) && this.allowDragAndDrop) {
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
        this.setCssClass(this.element, CLS_DISABLE$4, value);
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
                    setStyleAttribute(this.element, { width: formatUnit(newProp.width) });
                    break;
                case 'height':
                    setStyleAttribute(this.element, { height: formatUnit(newProp.height) });
                    this.setContentHeight(false);
                    break;
                case 'cssClass':
                    var headerEle = this.element.querySelector('.' + CLS_HEADER$1);
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
            if (this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1)) {
                detach(this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1).children[0]);
                detach(this.element.querySelector('.' + CLS_CONTENT$1).querySelector('.' + CLS_ACTIVE$1).children[0]);
                var item = this.items[this.selectedItem];
                var pos = (isNullOrUndefined(item.header) || isNullOrUndefined(item.header.iconPosition)) ? '' : item.header.iconPosition;
                var css = (isNullOrUndefined(item.header) || isNullOrUndefined(item.header.iconCss)) ? '' : item.header.iconCss;
                var text = item.headerTemplate || item.header.text;
                var txtWrap = this.createElement('div', { className: CLS_TEXT, attrs: { 'role': 'presentation' } });
                if (!isNullOrUndefined(text.tagName)) {
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
                var tabIndex = isNullOrUndefined(item.tabIndex) ? '-1' : item.tabIndex.toString();
                var wrapAtt = (item.disabled) ? {} : { tabIndex: tabIndex, 'data-tabindex': tabIndex, role: 'tab', 'aria-selected': 'true', 'aria-disabled': 'false' };
                tConts.appendChild(this.btnCls.cloneNode(true));
                var wraper = this.createElement('div', { className: CLS_WRAP, attrs: wrapAtt });
                wraper.appendChild(tConts);
                if (pos === 'top' || pos === 'bottom') {
                    this.element.classList.add('e-vertical-icon');
                }
                this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1).appendChild(wraper);
                var crElem = this.createElement('div');
                var cnt = item.content;
                var eleStr = void 0;
                if (typeof cnt === 'string' || isNullOrUndefined(cnt.innerHTML)) {
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
                if (!isNullOrUndefined(eleStr)) {
                    if (this.templateEle.indexOf(cnt.toString()) === -1) {
                        this.templateEle.push(cnt.toString());
                    }
                }
                this.element.querySelector('.' + CLS_ITEM$2 + '.' + CLS_ACTIVE$1).appendChild(crElem);
            }
        }
        else {
            var tabItems = this.element.querySelector('.' + CLS_TB_ITEMS);
            var element = this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1);
            var index = this.getIndexFromEle(element.id);
            var header = element.innerText;
            var detachContent = this.element.querySelector('.' + CLS_CONTENT$1).querySelector('.' + CLS_ACTIVE$1).children[0];
            var mainContents = detachContent.innerHTML;
            detach(element);
            detach(detachContent);
            var attr = {
                className: CLS_TB_ITEM + ' ' + CLS_TEMPLATE$1 + ' ' + CLS_ACTIVE$1, id: CLS_ITEM$2 + this.tabId + '_' + index
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
                attrs: { tabIndex: tabIndex, 'data-tabindex': tabIndex, role: 'tab', 'aria-controls': CLS_CONTENT$1 + this.tabId + '_' + index, 'aria-selected': 'true', 'aria-disabled': 'false' }
            });
            tabItems.insertBefore(this.createElement('div', attr), tabItems.children[index + 1]);
            this.element.querySelector('.' + CLS_TB_ITEM + '.' + CLS_ACTIVE$1).appendChild(wrap);
            var crElem = this.createElement('div', { innerHTML: mainContents });
            this.element.querySelector('.' + CLS_CONTENT$1).querySelector('.' + CLS_ACTIVE$1).appendChild(crElem);
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
            setStyleAttribute(this.cntEle, { 'height': (this.element.clientHeight - hdrEle.offsetHeight) + 'px' });
        }
        var activeEle = select('.' + CLS_TB_ITEM + '.' + CLS_TB_POPUP + '.' + CLS_ACTIVE$1, this.element);
        if (!isNullOrUndefined(activeEle) && this.reorderActiveTab) {
            this.select(this.getEleIndex(activeEle));
        }
        this.refreshActiveBorder();
    };
    __decorate$7([
        Collection([], TabItem)
    ], Tab.prototype, "items", void 0);
    __decorate$7([
        Property('100%')
    ], Tab.prototype, "width", void 0);
    __decorate$7([
        Property('Both')
    ], Tab.prototype, "swipeMode", void 0);
    __decorate$7([
        Property('auto')
    ], Tab.prototype, "height", void 0);
    __decorate$7([
        Property('')
    ], Tab.prototype, "cssClass", void 0);
    __decorate$7([
        Property(0)
    ], Tab.prototype, "selectedItem", void 0);
    __decorate$7([
        Property('Top')
    ], Tab.prototype, "headerPlacement", void 0);
    __decorate$7([
        Property('Content')
    ], Tab.prototype, "heightAdjustMode", void 0);
    __decorate$7([
        Property('Scrollable')
    ], Tab.prototype, "overflowMode", void 0);
    __decorate$7([
        Property('Demand')
    ], Tab.prototype, "loadOn", void 0);
    __decorate$7([
        Property(false)
    ], Tab.prototype, "enablePersistence", void 0);
    __decorate$7([
        Property(true)
    ], Tab.prototype, "enableHtmlSanitizer", void 0);
    __decorate$7([
        Property(false)
    ], Tab.prototype, "showCloseButton", void 0);
    __decorate$7([
        Property(true)
    ], Tab.prototype, "reorderActiveTab", void 0);
    __decorate$7([
        Property()
    ], Tab.prototype, "scrollStep", void 0);
    __decorate$7([
        Property()
    ], Tab.prototype, "dragArea", void 0);
    __decorate$7([
        Property(false)
    ], Tab.prototype, "allowDragAndDrop", void 0);
    __decorate$7([
        Property(true)
    ], Tab.prototype, "clearTemplates", void 0);
    __decorate$7([
        Complex({}, TabAnimationSettings)
    ], Tab.prototype, "animation", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "created", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "adding", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "added", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "selecting", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "selected", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "removing", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "removed", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "onDragStart", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "dragging", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "dragged", void 0);
    __decorate$7([
        Event()
    ], Tab.prototype, "destroyed", void 0);
    Tab = __decorate$7([
        NotifyPropertyChanges
    ], Tab);
    return Tab;
}(Component));

var __extends$8 = (undefined && undefined.__extends) || (function () {
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
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ROOT = 'e-treeview';
var CONTROL = 'e-control';
var COLLAPSIBLE = 'e-icon-collapsible';
var EXPANDABLE = 'e-icon-expandable';
var LISTITEM = 'e-list-item';
var LISTTEXT = 'e-list-text';
var LISTWRAP = 'e-text-wrap';
var IELISTWRAP = 'e-ie-wrap';
var PARENTITEM = 'e-list-parent';
var HOVER = 'e-hover';
var ACTIVE = 'e-active';
var LOAD = 'e-icons-spinner';
var PROCESS = 'e-process';
var ICON = 'e-icons';
var TEXTWRAP = 'e-text-content';
var INPUT = 'e-input';
var INPUTGROUP = 'e-input-group';
var TREEINPUT = 'e-tree-input';
var EDITING = 'e-editing';
var RTL$1 = 'e-rtl';
var INTERACTION = 'e-interaction';
var DRAGITEM = 'e-drag-item';
var DROPPABLE = 'e-droppable';
var DRAGGING = 'e-dragging';
var SIBLING = 'e-sibling';
var DROPIN = 'e-drop-in';
var DROPNEXT = 'e-drop-next';
var DROPOUT = 'e-drop-out';
var NODROP = 'e-no-drop';
var FULLROWWRAP = 'e-fullrow-wrap';
var FULLROW = 'e-fullrow';
var SELECTED$1 = 'e-selected';
var EXPANDED = 'e-expanded';
var NODECOLLAPSED = 'e-node-collapsed';
var DISABLE = 'e-disable';
var DROPCOUNT = 'e-drop-count';
var CHECK = 'e-check';
var INDETERMINATE = 'e-stop';
var CHECKBOXWRAP = 'e-treeview-checkbox';
var CHECKBOXFRAME = 'e-frame';
var CHECKBOXRIPPLE = 'e-ripple-container';
var RIPPLE = 'e-ripple';
var RIPPLEELMENT = 'e-ripple-element';
var FOCUS = 'e-node-focus';
var IMAGE = 'e-list-img';
var BIGGER = 'e-bigger';
var SMALL = 'e-small';
var CHILD = 'e-has-child';
var ITEM_ANIMATION_ACTIVE = 'e-animation-active';
var DISABLED$1 = 'e-disabled';
var PREVENTSELECT = 'e-prevent';
var treeAriaAttr = {
    treeRole: 'group',
    itemRole: 'treeitem',
    listRole: 'group',
    itemText: '',
    wrapperRole: ''
};
/**
 * Configures the fields to bind to the properties of node in the TreeView component.
 */
var FieldsSettings = /** @class */ (function (_super) {
    __extends$8(FieldsSettings, _super);
    function FieldsSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property('child')
    ], FieldsSettings.prototype, "child", void 0);
    __decorate$8([
        Property([])
    ], FieldsSettings.prototype, "dataSource", void 0);
    __decorate$8([
        Property('expanded')
    ], FieldsSettings.prototype, "expanded", void 0);
    __decorate$8([
        Property('hasChildren')
    ], FieldsSettings.prototype, "hasChildren", void 0);
    __decorate$8([
        Property('htmlAttributes')
    ], FieldsSettings.prototype, "htmlAttributes", void 0);
    __decorate$8([
        Property('iconCss')
    ], FieldsSettings.prototype, "iconCss", void 0);
    __decorate$8([
        Property('id')
    ], FieldsSettings.prototype, "id", void 0);
    __decorate$8([
        Property('imageUrl')
    ], FieldsSettings.prototype, "imageUrl", void 0);
    __decorate$8([
        Property('isChecked')
    ], FieldsSettings.prototype, "isChecked", void 0);
    __decorate$8([
        Property('parentID')
    ], FieldsSettings.prototype, "parentID", void 0);
    __decorate$8([
        Property(null)
    ], FieldsSettings.prototype, "query", void 0);
    __decorate$8([
        Property('selectable')
    ], FieldsSettings.prototype, "selectable", void 0);
    __decorate$8([
        Property('selected')
    ], FieldsSettings.prototype, "selected", void 0);
    __decorate$8([
        Property(null)
    ], FieldsSettings.prototype, "tableName", void 0);
    __decorate$8([
        Property('text')
    ], FieldsSettings.prototype, "text", void 0);
    __decorate$8([
        Property('tooltip')
    ], FieldsSettings.prototype, "tooltip", void 0);
    __decorate$8([
        Property('navigateUrl')
    ], FieldsSettings.prototype, "navigateUrl", void 0);
    return FieldsSettings;
}(ChildProperty));
/**
 * Configures animation settings for the TreeView component.
 */
var ActionSettings = /** @class */ (function (_super) {
    __extends$8(ActionSettings, _super);
    function ActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property('SlideDown')
    ], ActionSettings.prototype, "effect", void 0);
    __decorate$8([
        Property(400)
    ], ActionSettings.prototype, "duration", void 0);
    __decorate$8([
        Property('linear')
    ], ActionSettings.prototype, "easing", void 0);
    return ActionSettings;
}(ChildProperty));
/**
 * Configures the animation settings for expanding and collapsing nodes in TreeView.
 */
var NodeAnimationSettings = /** @class */ (function (_super) {
    __extends$8(NodeAnimationSettings, _super);
    function NodeAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Complex({ effect: 'SlideUp', duration: 400, easing: 'linear' }, ActionSettings)
    ], NodeAnimationSettings.prototype, "collapse", void 0);
    __decorate$8([
        Complex({ effect: 'SlideDown', duration: 400, easing: 'linear' }, ActionSettings)
    ], NodeAnimationSettings.prototype, "expand", void 0);
    return NodeAnimationSettings;
}(ChildProperty));
/**
 * The TreeView component is used to represent hierarchical data in a tree like structure with advanced
 * functions to perform edit, drag and drop, selection with check-box, and more.
 * ```html
 * <div id="tree"></div>
 * ```
 * ```typescript
 * let treeObj: TreeView = new TreeView();
 * treeObj.appendTo('#tree');
 * ```
 */
var TreeView = /** @class */ (function (_super) {
    __extends$8(TreeView, _super);
    function TreeView(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isRefreshed = false;
        _this.preventExpand = false;
        _this.checkedElement = [];
        _this.disableNode = [];
        _this.validArr = [];
        _this.validNodes = [];
        _this.expandChildren = [];
        _this.isFieldChange = false;
        _this.changeDataSource = false;
        _this.hasTemplate = false;
        _this.isFirstRender = false;
        // Specifies whether the node is dropped or not
        _this.isNodeDropped = false;
        _this.isInteracted = false;
        _this.isRightClick = false;
        _this.mouseDownStatus = false;
        _this.isDropIn = false;
        _this.OldCheckedData = [];
        _this.isHiddenItem = false;
        return _this;
    }
    TreeView_1 = TreeView;
    /**
     * Get component name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    TreeView.prototype.getModuleName = function () {
        return 'treeview';
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     */
    TreeView.prototype.preRender = function () {
        var _this = this;
        this.checkActionNodes = [];
        this.parentNodeCheck = [];
        this.dragStartAction = false;
        this.isAnimate = false;
        this.keyConfigs = {
            escape: 'escape',
            end: 'end',
            enter: 'enter',
            f2: 'f2',
            home: 'home',
            moveDown: 'downarrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            ctrlDown: 'ctrl+downarrow',
            ctrlUp: 'ctrl+uparrow',
            ctrlEnter: 'ctrl+enter',
            ctrlHome: 'ctrl+home',
            ctrlEnd: 'ctrl+end',
            ctrlA: 'ctrl+A',
            shiftDown: 'shift+downarrow',
            shiftUp: 'shift+uparrow',
            shiftEnter: 'shift+enter',
            shiftHome: 'shift+home',
            shiftEnd: 'shift+end',
            csDown: 'ctrl+shift+downarrow',
            csUp: 'ctrl+shift+uparrow',
            csEnter: 'ctrl+shift+enter',
            csHome: 'ctrl+shift+home',
            csEnd: 'ctrl+shift+end',
            space: 'space',
            shiftSpace: 'shift+space',
            ctrlSpace: 'ctrl+space'
        };
        this.listBaseOption = {
            expandCollapse: true,
            showIcon: true,
            expandIconClass: EXPANDABLE,
            ariaAttributes: treeAriaAttr,
            expandIconPosition: 'Left',
            itemCreated: function (e) {
                _this.beforeNodeCreate(e);
            },
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            itemNavigable: this.fullRowNavigable
        };
        this.updateListProp(this.fields);
        this.aniObj = new Animation({});
        this.treeList = [];
        this.isLoaded = false;
        this.isInitalExpand = false;
        this.expandChildren = [];
        this.index = 0;
        this.setTouchClass();
        this.DDTTreeData = JSON.parse(JSON.stringify(this.fields.dataSource));
        if (isNullOrUndefined(this.selectedNodes)) {
            this.setProperties({ selectedNodes: [] }, true);
        }
        if (isNullOrUndefined(this.checkedNodes)) {
            this.setProperties({ checkedNodes: [] }, true);
        }
        if (isNullOrUndefined(this.expandedNodes)) {
            this.setProperties({ expandedNodes: [] }, true);
        }
        else {
            this.isInitalExpand = true;
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - returns the persisted data
     * @hidden
     */
    TreeView.prototype.getPersistData = function () {
        var keyEntity = ['selectedNodes', 'checkedNodes', 'expandedNodes'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    TreeView.prototype.render = function () {
        this.initialRender = true;
        this.initialize();
        this.setDataBinding(false);
        this.setDisabledMode();
        this.setExpandOnType();
        if (!this.disabled) {
            this.setRipple();
        }
        this.wireEditingEvents(this.allowEditing);
        this.setDragAndDrop(this.allowDragAndDrop);
        if (!this.disabled) {
            this.wireEvents();
        }
        this.initialRender = false;
        this.renderComplete();
    };
    TreeView.prototype.initialize = function () {
        this.element.setAttribute('role', 'tree');
        if (!isNullOrUndefined(this.fields.dataSource) && Array.isArray(this.fields.dataSource) && this.fields.dataSource.length !== 0) {
            this.element.setAttribute('aria-activedescendant', this.element.id + '_active');
        }
        this.setCssClass(null, this.cssClass);
        this.setEnableRtl();
        this.setFullRow(this.fullRowSelect);
        this.setTextWrap();
        this.nodeTemplateFn = this.templateComplier(this.nodeTemplate);
    };
    TreeView.prototype.setDisabledMode = function () {
        if (this.disabled) {
            this.element.classList.add(DISABLED$1);
            this.element.setAttribute('aria-disabled', 'true');
        }
        else {
            this.element.classList.remove(DISABLED$1);
            this.element.setAttribute('aria-disabled', 'false');
        }
    };
    TreeView.prototype.setEnableRtl = function () {
        (this.enableRtl ? addClass : removeClass)([this.element], RTL$1);
    };
    TreeView.prototype.setRipple = function () {
        var tempStr = '.' + FULLROW + ',.' + TEXTWRAP;
        var rippleModel = {
            selector: tempStr,
            ignore: '.' + TEXTWRAP + ' > .' + ICON + ',.' + INPUTGROUP + ',.' + INPUT + ', .' + CHECKBOXWRAP
        };
        this.rippleFn = rippleEffect(this.element, rippleModel);
        var iconModel = {
            selector: '.' + TEXTWRAP + ' > .' + ICON,
            isCenterRipple: true
        };
        this.rippleIconFn = rippleEffect(this.element, iconModel);
    };
    TreeView.prototype.setFullRow = function (isEnabled) {
        (isEnabled ? addClass : removeClass)([this.element], FULLROWWRAP);
    };
    TreeView.prototype.setMultiSelect = function (isEnabled) {
        if (isEnabled) {
            this.element.setAttribute('aria-multiselectable', 'true');
        }
        else {
            this.element.setAttribute('aria-multiselectable', 'false');
        }
    };
    TreeView.prototype.templateComplier = function (template) {
        if (template) {
            this.hasTemplate = true;
            this.element.classList.add(INTERACTION);
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (e) {
                return compile(template);
            }
        }
        this.element.classList.remove(INTERACTION);
        return undefined;
    };
    TreeView.prototype.setDataBinding = function (changeDataSource) {
        var _this = this;
        this.treeList.push('false');
        if (this.fields.dataSource instanceof DataManager) {
            this.isOffline = this.fields.dataSource.dataSource.offline;
            if (this.fields.dataSource.ready) {
                this.fields.dataSource.ready.then(function (e) {
                    _this.isOffline = _this.fields.dataSource.dataSource.offline;
                    if (_this.fields.dataSource instanceof DataManager && _this.isOffline) {
                        _this.treeList.pop();
                        _this.treeData = e.result;
                        _this.isNumberTypeId = _this.getType();
                        _this.setRootData();
                        _this.renderItems(true);
                        if (_this.treeList.length === 0 && !_this.isLoaded) {
                            _this.finalize();
                        }
                    }
                }).catch(function (e) {
                    _this.trigger('actionFailure', { error: e });
                });
            }
            else {
                this.fields.dataSource.executeQuery(this.getQuery(this.fields)).then(function (e) {
                    _this.treeList.pop();
                    _this.treeData = e.result;
                    _this.isNumberTypeId = _this.getType();
                    _this.setRootData();
                    if (changeDataSource) {
                        _this.changeDataSource = true;
                    }
                    _this.renderItems(true);
                    _this.changeDataSource = false;
                    if (_this.treeList.length === 0 && !_this.isLoaded) {
                        _this.finalize();
                    }
                }).catch(function (e) {
                    _this.trigger('actionFailure', { error: e });
                });
            }
        }
        else {
            this.treeList.pop();
            if (isNullOrUndefined(this.fields.dataSource)) {
                this.rootData = this.treeData = [];
            }
            else {
                this.treeData = JSON.parse(JSON.stringify(this.fields.dataSource));
                this.setRootData();
            }
            this.isNumberTypeId = this.getType();
            this.renderItems(false);
        }
        if (this.treeList.length === 0 && !this.isLoaded) {
            this.finalize();
        }
    };
    TreeView.prototype.getQuery = function (mapper, value) {
        if (value === void 0) { value = null; }
        var columns = [];
        var query;
        if (!mapper.query) {
            query = new Query();
            var prop = this.getActualProperties(mapper);
            for (var _i = 0, _a = Object.keys(prop); _i < _a.length; _i++) {
                var col = _a[_i];
                if (col !== 'dataSource' && col !== 'tableName' && col !== 'child' && !!mapper["" + col]
                    && col !== 'url' && columns.indexOf(mapper["" + col]) === -1) {
                    columns.push(mapper["" + col]);
                }
            }
            query.select(columns);
            if (Object.prototype.hasOwnProperty.call(prop, 'tableName')) {
                query.from(mapper.tableName);
            }
        }
        else {
            query = mapper.query.clone();
        }
        ListBase.addSorting(this.sortOrder, mapper.text, query);
        if (!isNullOrUndefined(value) && !isNullOrUndefined(mapper.parentID)) {
            query.where(mapper.parentID, 'equal', (this.isNumberTypeId ? parseFloat(value) : value));
        }
        return query;
    };
    TreeView.prototype.getType = function () {
        return this.treeData[0] ? ((typeof getValue(this.fields.id, this.treeData[0]) === 'number') ? true : false) : false;
    };
    TreeView.prototype.setRootData = function () {
        this.dataType = this.getDataType(this.treeData, this.fields);
        if (this.dataType === 1) {
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
            var rootItems = this.getChildNodes(this.treeData, undefined, true);
            if (isNullOrUndefined(rootItems)) {
                this.rootData = [];
            }
            else {
                this.rootData = rootItems;
            }
        }
        else {
            this.rootData = this.treeData;
        }
    };
    TreeView.prototype.isChildObject = function () {
        if (typeof this.fields.child === 'object') {
            return true;
        }
        else {
            return false;
        }
    };
    TreeView.prototype.renderItems = function (isSorted) {
        this.listBaseOption.ariaAttributes.level = 1;
        var sortedData = this.getSortedData(this.rootData);
        this.ulElement = ListBase.createList(this.createElement, isSorted ? this.rootData : sortedData, this.listBaseOption);
        this.element.appendChild(this.ulElement);
        var rootNodes = this.ulElement.querySelectorAll('.e-list-item');
        if (this.loadOnDemand === false) {
            var i = 0;
            while (i < rootNodes.length) {
                this.renderChildNodes(rootNodes[parseInt(i.toString(), 10)], true, null, true);
                i++;
            }
        }
        var parentEle = selectAll('.' + PARENTITEM, this.element);
        if ((parentEle.length === 1 && (rootNodes && rootNodes.length !== 0)) || this.loadOnDemand) {
            this.finalizeNode(this.element);
        }
        this.parentNodeCheck = [];
        this.parentCheckData = [];
        this.updateCheckedStateFromDS();
        if (this.autoCheck && this.showCheckBox && !this.isLoaded) {
            this.updateParentCheckState();
        }
    };
    /**
     * Update the checkedNodes from datasource at initial rendering
     *
     * @returns {void}
     */
    TreeView.prototype.updateCheckedStateFromDS = function () {
        this.validNodes = [];
        if (this.treeData && this.showCheckBox) {
            if (this.dataType === 1) {
                var mapper = this.fields;
                var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.isChecked, 'equal', true, false));
                for (var i = 0; i < resultData.length; i++) {
                    var resultId = resultData[parseInt(i.toString(), 10)][this.fields.id]
                        ? resultData[parseInt(i.toString(), 10)][this.fields.id].toString()
                        : null;
                    if (this.checkedNodes.indexOf(resultId) === -1 && !(this.isLoaded)) {
                        this.checkDisabledState(resultId, resultData[i]);
                    }
                    if (resultData[parseInt(i.toString(), 10)][this.fields.hasChildren]) {
                        var id = resultData[parseInt(i.toString(), 10)][this.fields.id];
                        var childData = new DataManager(this.treeData).
                            executeLocal(new Query().where(mapper.parentID, 'equal', id, false));
                        for (var child = 0; child < childData.length; child++) {
                            var childId = childData[parseInt(child.toString(), 10)][this.fields.id]
                                ? childData[parseInt(child.toString(), 10)][this.fields.id].toString()
                                : null;
                            if (this.checkedNodes.indexOf(childId) === -1 && this.autoCheck) {
                                this.checkDisabledState(childId, childData[child]);
                            }
                        }
                    }
                }
                for (var i = 0; i < this.checkedNodes.length; i++) {
                    var mapper_1 = this.fields;
                    var checkState = new DataManager(this.treeData).
                        executeLocal(new Query().where(mapper_1.id, 'equal', this.checkedNodes[parseInt(i.toString(), 10)], true));
                    if (checkState[0] && this.autoCheck) {
                        this.getCheckedNodeDetails(mapper_1, checkState);
                        this.checkIndeterminateState(checkState[0]);
                    }
                    if (checkState.length > 0) {
                        var checkedId = checkState[0][this.fields.id] ? checkState[0][this.fields.id].toString() : null;
                        if (this.checkedNodes.indexOf(checkedId) > -1 && this.validNodes.indexOf(checkedId) === -1) {
                            this.validNodes.push(checkedId);
                        }
                    }
                    var checkedData = new DataManager(this.treeData).
                        executeLocal(new Query().where(mapper_1.parentID, 'equal', this.checkedNodes[parseInt(i.toString(), 10)], true));
                    for (var index = 0; index < checkedData.length; index++) {
                        var checkedId = checkedData[parseInt(index.toString(), 10)][this.fields.id]
                            ? checkedData[parseInt(index.toString(), 10)][this.fields.id].toString()
                            : null;
                        if (this.checkedNodes.indexOf(checkedId) === -1 && this.autoCheck) {
                            this.checkDisabledState(checkedId, checkedData[index]);
                        }
                        if (this.checkedNodes.indexOf(checkedId) > -1 && this.validNodes.indexOf(checkedId) === -1) {
                            this.validNodes.push(checkedId);
                        }
                    }
                }
            }
            else if (this.dataType === 2 || (this.fields.dataSource instanceof DataManager &&
                this.isOffline)) {
                for (var index = 0; index < this.treeData.length; index++) {
                    var fieldId = this.treeData[parseInt(index.toString(), 10)][this.fields.id] ? this.treeData[parseInt(index.toString(), 10)][this.fields.id].toString() : '';
                    if (this.treeData[parseInt(index.toString(), 10)][this.fields.isChecked] &&
                        !(this.isLoaded) && this.checkedNodes.indexOf(fieldId) === -1) {
                        this.checkDisabledState(fieldId, this.treeData[index]);
                    }
                    if (this.checkedNodes.indexOf(fieldId) > -1 && this.validNodes.indexOf(fieldId) === -1) {
                        this.validNodes.push(fieldId);
                    }
                    var childItems = getValue(this.fields.child.toString(), this.treeData[parseInt(index.toString(), 10)]);
                    if (childItems) {
                        this.updateChildCheckState(childItems, this.treeData[parseInt(index.toString(), 10)]);
                    }
                }
                this.validNodes = (this.enablePersistence) ? this.checkedNodes : this.validNodes;
            }
            this.setProperties({ checkedNodes: this.validNodes }, true);
        }
    };
    /**
     * To check whether the list data has sub child and to change the parent check state accordingly
     *
     * @param {FieldsSettingsModel} mapper - The mapper object containing field settings.
     * @param {Object[]} checkNodes - The array of checked nodes.
     * @returns {void}
     * @private
     */
    TreeView.prototype.getCheckedNodeDetails = function (mapper, checkNodes) {
        var id = checkNodes[0][this.fields.parentID] ? checkNodes[0][this.fields.parentID].toString() : null;
        var count = 0;
        var element = this.element.querySelector('[data-uid="' + checkNodes[0][this.fields.id] + '"]');
        var parentEle = this.element.querySelector('[data-uid="' + checkNodes[0][this.fields.parentID] + '"]');
        if (!element && !parentEle) {
            if (this.parentNodeCheck.indexOf(id) === -1) {
                this.parentNodeCheck.push(id);
            }
            var childNodes = this.getChildNodes(this.treeData, id);
            for (var i = 0; i < childNodes.length; i++) {
                var childId = childNodes[parseInt(i.toString(), 10)][this.fields.id]
                    ? childNodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                    : null;
                if (this.checkedNodes.indexOf(childId) !== -1) {
                    count++;
                }
                if (count === childNodes.length && this.checkedNodes.indexOf(id) === -1) {
                    this.checkDisabledState(id);
                }
            }
            var preElement = new DataManager(this.treeData).
                executeLocal(new Query().where(mapper.id, 'equal', id, true));
            this.getCheckedNodeDetails(mapper, preElement);
        }
        else if (parentEle) {
            var check = select('.' + CHECK, parentEle);
            if (!check) {
                this.changeState(parentEle, 'indeterminate', null, true, true);
            }
        }
    };
    /**
     * Update the checkedNodes and parent state when all the child Nodes are in checkedstate at initial rendering
     *
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateParentCheckState = function () {
        var indeterminate = selectAll('.' + INDETERMINATE, this.element);
        var childCheckedElement;
        var data = this.treeData;
        if (this.element.classList.contains('e-filtering')) {
            data = this.DDTTreeData;
        }
        for (var i = 0; i < indeterminate.length; i++) {
            var node = closest(indeterminate[parseInt(i.toString(), 10)], '.' + LISTITEM);
            var nodeId = node.getAttribute('data-uid').toString();
            var OldCheckedNodes = void 0;
            if (this.element.classList.contains('e-filtering')) {
                OldCheckedNodes = new DataManager(this.OldCheckedData).executeLocal(new Query().where('parentID', 'equal', nodeId, true));
            }
            if (this.dataType === 1) {
                childCheckedElement = new DataManager(data).
                    executeLocal(new Query().where(this.fields.parentID, 'equal', nodeId, true));
            }
            else {
                childCheckedElement = this.getChildNodes(data, nodeId);
            }
            var count = 0;
            if (childCheckedElement) {
                var _loop_1 = function (j) {
                    var childId = childCheckedElement[parseInt(j.toString(), 10)][this_1.fields.id].toString();
                    if (this_1.checkedNodes.indexOf(childId) !== -1) {
                        count++;
                    }
                    else if (this_1.element.classList.contains('e-filtering') && OldCheckedNodes.findIndex(function (e) { return e['id'] === childId; }) !== -1) {
                        count++;
                    }
                };
                var this_1 = this;
                for (var j = 0; j < childCheckedElement.length; j++) {
                    _loop_1(j);
                }
                if (count === childCheckedElement.length) {
                    var nodeCheck = node.getAttribute('data-uid');
                    if (this.checkedNodes.indexOf(nodeCheck) === -1) {
                        this.checkDisabledState(nodeCheck);
                    }
                    this.changeState(node, 'check', null, true, true);
                }
                else if (count === 0 && this.checkedNodes.length === 0) {
                    this.changeState(node, 'uncheck', null, true, true);
                }
            }
        }
    };
    /**
     * Change the parent to indeterminate state whenever the child is in checked state which is not rendered in DOM
     *
     * @param {Object} data - The data object to check for indeterminate state.
     * @returns {void}
     * @private
     */
    TreeView.prototype.checkIndeterminateState = function (data) {
        var element;
        if (this.dataType === 1) {
            element = this.element.querySelector('[data-uid="' + data[this.fields.parentID] + '"]');
        }
        else {
            element = this.element.querySelector('[data-uid="' + data[this.fields.id] + '"]');
        }
        if (element) {
            var ariaChecked = element.getAttribute('aria-checked');
            if (ariaChecked !== 'true') {
                this.changeState(element, 'indeterminate', null, true, true);
            }
        }
        else if (this.dataType === 2) {
            if (this.parentNodeCheck.indexOf(data[this.fields.id].toString()) === -1) {
                this.parentNodeCheck.push(data[this.fields.id].toString());
            }
        }
    };
    /**
     * Update the checkedNodes for child and subchild from datasource (hierarchical datasource) at initial rendering
     *
     * @param {Object[]} childItems - The array of child items to update the checked state.
     * @param {Object} treeData - The tree data object containing field values.
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateChildCheckState = function (childItems, treeData) {
        var count = 0;
        var checkedParent = treeData[this.fields.id] ? treeData[this.fields.id].toString() : '';
        for (var index = 0; index < childItems.length; index++) {
            var checkedChild = childItems[parseInt(index.toString(), 10)][this.fields.id] ? childItems[parseInt(index.toString(), 10)][this.fields.id].toString() : '';
            if (childItems[parseInt(index.toString(), 10)][this.fields.isChecked] &&
                !(this.isLoaded) && this.checkedNodes.indexOf(checkedChild) === -1) {
                this.checkDisabledState(checkedChild, childItems[index]);
            }
            if (this.checkedNodes.indexOf(checkedParent) !== -1 && this.checkedNodes.indexOf(checkedChild) === -1 && this.autoCheck) {
                this.checkDisabledState(checkedChild, childItems[index]);
            }
            if (this.checkedNodes.indexOf(checkedChild) !== -1 && this.autoCheck) {
                count++;
            }
            if (this.checkedNodes.indexOf(checkedChild) > -1 && this.validNodes.indexOf(checkedChild) === -1) {
                this.validNodes.push(checkedChild);
            }
            var subChildItems = getValue(this.fields.child.toString(), childItems[parseInt(index.toString(), 10)]);
            if (subChildItems && subChildItems.length) {
                if (this.parentCheckData.indexOf(treeData) === -1) {
                    this.parentCheckData.push(treeData);
                }
                this.updateChildCheckState(subChildItems, childItems[parseInt(index.toString(), 10)]);
            }
            if (count === childItems.length && this.autoCheck && this.checkedNodes.indexOf(checkedParent) === -1) {
                this.checkDisabledState(checkedParent, treeData);
            }
        }
        if (count !== 0 && this.autoCheck) {
            this.checkIndeterminateState(treeData);
            for (var len = 0; len < this.parentCheckData.length; len++) {
                if ((treeData !== this.parentCheckData[parseInt(len.toString(), 10)]) &&
                    (this.parentCheckData[parseInt(len.toString(), 10)])) {
                    this.checkIndeterminateState(this.parentCheckData[parseInt(len.toString(), 10)]);
                }
            }
        }
        this.parentCheckData = [];
    };
    TreeView.prototype.beforeNodeCreate = function (e) {
        if (this.showCheckBox) {
            var checkboxEle = createCheckBox(this.createElement, true, { cssClass: this.touchClass });
            checkboxEle.classList.add(CHECKBOXWRAP);
            var icon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, e.item);
            var id = e.item.getAttribute('data-uid');
            e.item.childNodes[0].insertBefore(checkboxEle, e.item.childNodes[0].childNodes[isNullOrUndefined(icon) ? 0 : 1]);
            var checkValue = getValue(e.fields.isChecked, e.curData);
            if (this.checkedNodes.indexOf(id) > -1) {
                select('.' + CHECKBOXFRAME, checkboxEle).classList.add(CHECK);
                e.item.setAttribute('aria-checked', 'true');
                this.addCheck(e.item);
            }
            else if (!isNullOrUndefined(checkValue) && checkValue.toString() === 'true') {
                select('.' + CHECKBOXFRAME, checkboxEle).classList.add(CHECK);
                e.item.setAttribute('aria-checked', 'true');
                this.addCheck(e.item);
            }
            else {
                e.item.setAttribute('aria-checked', 'false');
            }
            var frame = select('.' + CHECKBOXFRAME, checkboxEle);
            EventHandler.add(frame, 'mousedown', this.frameMouseHandler, this);
            EventHandler.add(frame, 'mouseup', this.frameMouseHandler, this);
        }
        if (this.fullRowSelect) {
            this.createFullRow(e.item);
        }
        if (this.allowMultiSelection && !e.item.classList.contains(SELECTED$1)) {
            e.item.setAttribute('aria-selected', 'false');
        }
        var fields = e.fields;
        this.addActionClass(e, fields.selected, SELECTED$1);
        this.addActionClass(e, fields.expanded, EXPANDED);
        e.item.setAttribute('tabindex', '-1');
        EventHandler.add(e.item, 'focus', this.focusIn, this);
        if (!isNullOrUndefined(this.nodeTemplateFn)) {
            var textEle = e.item.querySelector('.' + LISTTEXT);
            var dataId = e.item.getAttribute('data-uid');
            textEle.innerHTML = '';
            this.renderNodeTemplate(e.curData, textEle, dataId);
        }
        var eventArgs = {
            node: e.item,
            nodeData: e.curData,
            text: e.text
        };
        if (!this.isRefreshed) {
            this.trigger('drawNode', eventArgs);
            if (e.curData[this.fields.selectable] === false && !this.showCheckBox) {
                e.item.classList.add(PREVENTSELECT);
                var firstChild = e.item.firstElementChild;
                firstChild.style.cursor = 'not-allowed';
            }
        }
    };
    TreeView.prototype.frameMouseHandler = function (e) {
        var rippleSpan = select('.' + CHECKBOXRIPPLE, e.target.parentElement);
        rippleMouseHandler(e, rippleSpan);
    };
    TreeView.prototype.addActionClass = function (e, action, cssClass) {
        var data = e.curData;
        var actionValue = getValue(action, data);
        if (!isNullOrUndefined(actionValue) && actionValue.toString() !== 'false') {
            e.item.classList.add(cssClass);
        }
    };
    TreeView.prototype.getDataType = function (ds, mapper) {
        if (this.fields.dataSource instanceof DataManager) {
            for (var i = 0; i < ds.length; i++) {
                if (this.isOffline) {
                    if ((typeof mapper.child === 'string') && isNullOrUndefined(getValue(mapper.child, ds[parseInt(i.toString(), 10)])) && !isNullOrUndefined(getValue(mapper.parentID, ds[parseInt(i.toString(), 10)]))) {
                        return 1;
                    }
                }
                else if ((typeof mapper.child === 'string') && isNullOrUndefined(getValue(mapper.child, ds[parseInt(i.toString(), 10)]))) {
                    return 1;
                }
            }
            return 2;
        }
        for (var i = 0, len = ds.length; i < len; i++) {
            if ((typeof mapper.child === 'string') && (!isNullOrUndefined(getValue(mapper.child, ds[parseInt(i.toString(), 10)])) || (Object.prototype.hasOwnProperty.call(ds[parseInt(i.toString(), 10)], mapper.child)))) {
                return 2;
            }
            if (this.isChildObject()) {
                return 2;
            }
            if (!isNullOrUndefined(getValue(mapper.parentID, ds[parseInt(i.toString(), 10)])) ||
                !isNullOrUndefined(getValue(mapper.hasChildren, ds[parseInt(i.toString(), 10)]))) {
                return 1;
            }
        }
        return 1;
    };
    TreeView.prototype.getGroupedData = function (dataSource, groupBy) {
        var cusQuery = new Query().group(groupBy);
        var ds = ListBase.getDataSource(dataSource, cusQuery);
        var grpItem = [];
        for (var j = 0; j < ds.length; j++) {
            var itemObj = ds[parseInt(j.toString(), 10)].items;
            grpItem.push(itemObj);
        }
        return grpItem;
    };
    TreeView.prototype.getSortedData = function (list) {
        if (list && this.sortOrder !== 'None') {
            list = ListBase.getDataSource(list, ListBase.addSorting(this.sortOrder, this.fields.text));
        }
        return list;
    };
    TreeView.prototype.finalizeNode = function (element, isFromExpandAll, expandChild) {
        var _this = this;
        if (!isFromExpandAll) {
            this.updateAttributes(element);
        }
        if (!expandChild) {
            var eNodes = selectAll('.' + EXPANDED, element);
            if (!this.loadOnDemand && this.fields.dataSource instanceof DataManager) {
                this.isInitalExpand = this.treeData.filter(function (e) { return e[_this.fields.expanded] === true; }).length > 0
                    ? true
                    : this.isInitalExpand;
            }
            if (!this.isInitalExpand) {
                for (var i = 0; i < eNodes.length; i++) {
                    this.renderChildNodes(eNodes[parseInt(i.toString(), 10)]);
                }
            }
            removeClass(eNodes, EXPANDED);
        }
        if (!isFromExpandAll) {
            this.updateList();
        }
        if (this.isLoaded) {
            this.updateCheckedProp();
        }
    };
    TreeView.prototype.updateAttributes = function (element) {
        var iNodes = selectAll('.' + IMAGE, element);
        for (var k = 0; k < iNodes.length; k++) {
            iNodes[parseInt(k.toString(), 10)].setAttribute('alt', IMAGE);
        }
        if (this.isLoaded) {
            var sNodes = selectAll('.' + SELECTED$1, element);
            for (var i = 0; i < sNodes.length; i++) {
                this.selectNode(sNodes[parseInt(i.toString(), 10)], null);
                break;
            }
            removeClass(sNodes, SELECTED$1);
        }
        var cNodes = selectAll('.' + LISTITEM + ':not(.' + EXPANDED + ')', element);
        for (var j = 0; j < cNodes.length; j++) {
            var icon = select('div.' + ICON, cNodes[parseInt(j.toString(), 10)]);
            if (icon && icon.classList.contains(EXPANDABLE)) {
                this.disableExpandAttr(cNodes[parseInt(j.toString(), 10)]);
            }
        }
    };
    TreeView.prototype.updateCheckedProp = function () {
        if (this.showCheckBox) {
            var nodes = [].concat([], this.checkedNodes);
            this.setProperties({ checkedNodes: nodes }, true);
        }
    };
    TreeView.prototype.ensureIndeterminate = function () {
        if (this.autoCheck) {
            var liElement = selectAll('li', this.element);
            var ulElement = void 0;
            for (var i = 0; i < liElement.length; i++) {
                if (liElement[parseInt(i.toString(), 10)].classList.contains(LISTITEM)) {
                    ulElement = select('.' + PARENTITEM, liElement[parseInt(i.toString(), 10)]);
                    if (ulElement) {
                        this.ensureParentCheckState(liElement[parseInt(i.toString(), 10)]);
                    }
                    else {
                        this.ensureChildCheckState(liElement[parseInt(i.toString(), 10)]);
                    }
                }
            }
        }
        else {
            var indeterminate = selectAll('.' + INDETERMINATE, this.element);
            for (var i = 0; i < indeterminate.length; i++) {
                indeterminate[parseInt(i.toString(), 10)].classList.remove(INDETERMINATE);
            }
        }
    };
    TreeView.prototype.ensureParentCheckState = function (element) {
        if (!isNullOrUndefined(element)) {
            if (element.classList.contains(ROOT)) {
                return;
            }
            var ulElement = element;
            if (element.classList.contains(LISTITEM)) {
                ulElement = select('.' + PARENTITEM, element);
            }
            var checkedNodes = selectAll('.' + CHECKBOXWRAP + ' .' + CHECK, ulElement);
            var indeterminateNodes = selectAll('.' + INDETERMINATE, ulElement);
            var nodes = selectAll(this.checkDisabledChildren ? '.' + LISTITEM : '.' + LISTITEM + ':not(.' + DISABLE + ')', ulElement);
            var checkBoxEle = element.getElementsByClassName(CHECKBOXWRAP)[0];
            var count = nodes.length;
            var checkedCount = checkedNodes.length;
            var matchedChildNodes = [];
            var oldChildCount = [];
            var dataUid_1 = element.getAttribute('data-uid');
            var rootNodeChecked_1 = true;
            var childNodeChecked_1 = false;
            nodes.forEach(function (childNode) {
                if (childNode instanceof HTMLElement) {
                    var ariaChecked = childNode.getAttribute('aria-checked');
                    if (ariaChecked === 'true') {
                        childNodeChecked_1 = true;
                    }
                    else {
                        rootNodeChecked_1 = false;
                    }
                }
            });
            var parentNodeChecked = false;
            if (this.element.classList.contains('e-filtering')) {
                var oldCheckedNodes = new DataManager(this.OldCheckedData).executeLocal(new Query().where('parentID', 'equal', dataUid_1, true));
                checkedCount = oldCheckedNodes.length;
                var parentNode = new DataManager(this.OldCheckedData).executeLocal(new Query().where('hasChildren', 'equal', true, true));
                if (parentNode.length > 0 && childNodeChecked_1 && ((this.OldCheckedData.some(function (oldNode) { return oldNode.id === dataUid_1; })) ||
                    this.parentNodeCheck.indexOf(dataUid_1) !== -1)) {
                    checkedCount = parentNode.length;
                    parentNodeChecked = true;
                }
                var childItems = [];
                if (this.dataType === 1) {
                    childItems = new DataManager(this.DDTTreeData).executeLocal(new Query().where(this.fields.parentID, 'equal', dataUid_1, true));
                }
                else {
                    childItems = this.getChildNodes(this.DDTTreeData, dataUid_1);
                }
                count = childItems.length;
            }
            if (this.autoCheck && this.showCheckBox && !(this.fields.dataSource instanceof DataManager)) {
                var selectedChildNodeDetails = this.getSelectedChildNodeDetails(dataUid_1);
                matchedChildNodes = selectedChildNodeDetails;
                oldChildCount = new DataManager(this.checkActionNodes)
                    .executeLocal(new Query().where('parentID', 'equal', dataUid_1, true));
            }
            if (count === 0 && checkedCount === 0) {
                return;
            }
            else if (count === checkedCount || ((parentNodeChecked && count > 0) && ((oldChildCount.length === matchedChildNodes.length)
                || (oldChildCount.length !== matchedChildNodes.length))
                && (oldChildCount.length !== 0 && matchedChildNodes.length !== 0) && rootNodeChecked_1
                && (this.autoCheck && this.showCheckBox))) {
                this.changeState(checkBoxEle, 'check', null, true, true);
            }
            else if ((checkedCount > 0 && !parentNodeChecked && (this.autoCheck && this.showCheckBox))) {
                this.changeState(checkBoxEle, 'indeterminate', null, true, true);
            }
            else if (checkedCount > 0 || indeterminateNodes.length > 0) {
                this.changeState(checkBoxEle, 'indeterminate', null, true, true);
            }
            else if (checkedCount === 0) {
                this.changeState(checkBoxEle, 'uncheck', null, true, true);
            }
            var parentUL = closest(element, '.' + PARENTITEM);
            if (!isNullOrUndefined(parentUL)) {
                var currentParent = closest(parentUL, '.' + LISTITEM);
                this.ensureParentCheckState(currentParent);
            }
        }
    };
    TreeView.prototype.getSelectedChildNodeDetails = function (dataUid) {
        var _this = this;
        var childKey = typeof this.fields.child === 'string' ? this.fields.child : null;
        var dataId = this.fields.id;
        var parentKey = this.fields.parentID;
        var matchesDataUid = function (childNode) {
            if (!isNullOrUndefined(childKey) && childKey in childNode && Array.isArray(childNode[childKey])) {
                var matchNode = childNode[dataId];
                if (!isNullOrUndefined(matchNode)) {
                    return matchNode.toString() === dataUid;
                }
            }
            else {
                var childNodePid = childNode[parentKey];
                if (!isNullOrUndefined(childNodePid)) {
                    return childNodePid.toString() === dataUid;
                }
            }
            return false;
        };
        return this.checkedNodes
            .map(function (checkedNodeId) {
            return _this.getNodeObject(checkedNodeId);
        })
            .filter(function (childNode) {
            if (childNode && typeof childNode === 'object' && (childKey in childNode)) {
                return matchesDataUid(childNode);
            }
            else if (_this.dataType !== 2 && typeof childNode === 'object' && (parentKey in childNode || childKey in childNode)) {
                return matchesDataUid(childNode);
            }
            return false;
        });
    };
    TreeView.prototype.ensureChildCheckState = function (element, e, isFromExpandAll) {
        var _this = this;
        if (!isNullOrUndefined(element)) {
            var childElement = select('.' + PARENTITEM, element);
            var checkBoxes = void 0;
            if (!isNullOrUndefined(childElement)) {
                var childCheck = Array.from(childElement.querySelectorAll('li'));
                checkBoxes = selectAll('.' + CHECKBOXWRAP, childElement);
                if (this.isFilter) {
                    checkBoxes = Array.from(checkBoxes).filter(function (checkbox) {
                        var dataUID = checkbox.closest('li').getAttribute('data-uid');
                        return dataUID !== null && _this.checkedNodes.indexOf(dataUID) !== -1;
                    });
                    childCheck = Array.from(childCheck).filter(function (li) {
                        var childIds = li.getAttribute('data-uid');
                        return childIds !== null && _this.checkedNodes.indexOf(childIds) !== -1;
                    });
                    if (checkBoxes.length === 0) {
                        checkBoxes = selectAll('.' + CHECKBOXWRAP, childElement);
                        childCheck = Array.from(childElement.querySelectorAll('li'));
                    }
                }
                var isChecked = element.getElementsByClassName(CHECKBOXFRAME)[0].classList.contains(CHECK);
                var parentCheck = element.getElementsByClassName(CHECKBOXFRAME)[0].classList.contains(INDETERMINATE);
                var checkedState = void 0;
                for (var index = 0; index < checkBoxes.length; index++) {
                    var childId = childCheck[parseInt(index.toString(), 10)].getAttribute('data-uid');
                    if (!isNullOrUndefined(this.currentLoadData) &&
                        !isNullOrUndefined(getValue(this.fields.isChecked, this.currentLoadData[parseInt(index.toString(), 10)]))) {
                        checkedState = getValue(this.fields.isChecked, this.currentLoadData[parseInt(index.toString(), 10)]) ? 'check' : 'uncheck';
                        if (this.ele !== -1) {
                            checkedState = isChecked ? 'check' : 'uncheck';
                        }
                        if ((checkedState === 'uncheck') && (!isUndefined(this.parentNodeCheck) && this.autoCheck
                            && this.parentNodeCheck.indexOf(childId) !== -1)) {
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(childId), 1);
                            checkedState = 'indeterminate';
                        }
                    }
                    else {
                        var isNodeChecked = checkBoxes[parseInt(index.toString(), 10)]
                            .getElementsByClassName(CHECKBOXFRAME)[0]
                            .classList.contains(CHECK);
                        if (isChecked) {
                            checkedState = 'check';
                        }
                        else if (isNodeChecked && !this.isLoaded) {
                            checkedState = 'check';
                        }
                        else if (this.checkedNodes.indexOf(childId) !== -1 && this.isLoaded && (parentCheck || isChecked)) {
                            checkedState = 'check';
                        }
                        else if (childCheck[parseInt(index.toString(), 10)].classList.contains(CHILD) &&
                            (!isUndefined(this.parentNodeCheck) && this.autoCheck
                                && (isChecked || parentCheck) && this.parentNodeCheck.indexOf(childId) !== -1)) {
                            checkedState = 'indeterminate';
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(childId), 1);
                        }
                        else if (this.dataType === 1 && (!isUndefined(this.parentNodeCheck) && this.autoCheck &&
                            (isChecked || parentCheck) && this.parentNodeCheck.indexOf(childId) !== -1)) {
                            checkedState = 'indeterminate';
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(childId), 1);
                        }
                        else {
                            checkedState = 'uncheck';
                        }
                    }
                    this.changeState(checkBoxes[parseInt(index.toString(), 10)], checkedState, e, true, true);
                }
            }
            if (this.autoCheck && this.isLoaded && !isFromExpandAll) {
                this.updateParentCheckState();
            }
        }
    };
    TreeView.prototype.doCheckBoxAction = function (nodes, doCheck) {
        if (!isNullOrUndefined(nodes)) {
            nodes.reverse();
            for (var len = nodes.length - 1; len >= 0; len--) {
                var liEle = this.getElement(nodes[parseInt(len.toString(), 10)]);
                if (isNullOrUndefined(liEle)) {
                    var node = nodes[len - nodes.length] ? nodes[len - nodes.length].toString()
                        : nodes[parseInt(len.toString(), 10)]
                            ? nodes[parseInt(len.toString(), 10)].toString()
                            : null;
                    if (node !== '' && doCheck && node) {
                        this.setValidCheckedNode(node, nodes);
                        this.dynamicCheckState(node, doCheck);
                    }
                    else if (this.checkedNodes.indexOf(node) !== -1 && node !== '' && !doCheck) {
                        this.checkedNodes.splice(this.checkedNodes.indexOf(node), 1);
                        var childItems = this.getChildNodes(this.treeData, node);
                        if (childItems) {
                            for (var i = 0; i < childItems.length; i++) {
                                var id = childItems[parseInt(i.toString(), 10)][this.fields.id]
                                    ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString()
                                    : null;
                                if (this.checkedNodes.indexOf(id) !== -1) {
                                    this.checkedNodes.splice(this.checkedNodes.indexOf(id), 1);
                                    var ele = this.element.querySelector('[data-uid="' + id + '"]');
                                    if (ele) {
                                        this.changeState(ele, 'uncheck', null);
                                    }
                                }
                            }
                            if (this.parentNodeCheck.indexOf(node) !== -1) {
                                this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(node), 1);
                            }
                        }
                        if (node) {
                            this.dynamicCheckState(node, doCheck);
                        }
                        this.updateField(this.treeData, this.fields, node, 'isChecked', null);
                    }
                    continue;
                }
                var checkBox = select('.' + PARENTITEM + ' .' + CHECKBOXWRAP, liEle);
                this.validateCheckNode(checkBox, !doCheck, liEle, null);
            }
        }
        else {
            var checkBoxes = selectAll('.' + CHECKBOXWRAP, this.element);
            if (this.loadOnDemand) {
                for (var index = 0; index < checkBoxes.length; index++) {
                    var liEle = closest(checkBoxes[parseInt(index.toString(), 10)], '.' + LISTITEM);
                    this.updateFieldChecked(checkBoxes[parseInt(index.toString(), 10)], doCheck);
                    this.changeState(checkBoxes[parseInt(index.toString(), 10)], doCheck ? 'check' : 'uncheck', null, null, null, doCheck);
                    this.updateOldCheckedData([this.getNodeData(liEle)]);
                }
            }
            else {
                for (var index = 0; index < checkBoxes.length; index++) {
                    var liEle = closest(checkBoxes[parseInt(index.toString(), 10)], '.' + LISTITEM);
                    this.updateFieldChecked(checkBoxes[parseInt(index.toString(), 10)], doCheck);
                    this.changeState(checkBoxes[parseInt(index.toString(), 10)], doCheck ? 'check' : 'uncheck');
                    this.updateOldCheckedData([this.getNodeData(liEle)]);
                }
            }
        }
        if (nodes) {
            for (var j = 0; j < nodes.length - 1; j++) {
                var node = nodes[parseInt(j.toString(), 10)] ? nodes[parseInt(j.toString(), 10)].toString() : '';
                if (!doCheck) {
                    this.updateField(this.treeData, this.fields, node, 'isChecked', null);
                }
            }
        }
        if (this.autoCheck) {
            this.updateParentCheckState();
        }
    };
    TreeView.prototype.updateFieldChecked = function (checkbox, doCheck) {
        var currLi = closest(checkbox, '.' + LISTITEM);
        var id = currLi.getAttribute('data-uid');
        var nodeDetails = this.getNodeData(currLi);
        if (nodeDetails.isChecked === 'true' && !doCheck) {
            this.updateField(this.treeData, this.fields, id, 'isChecked', null);
        }
    };
    /**
     * Changes the parent and child  check state while changing the checkedNodes via setmodel
     *
     * @param {string} node - The unique identifier of the node.
     * @param {boolean} doCheck - A boolean value indicating whether to check or uncheck the node.
     * @returns {void}
     * @private
     */
    TreeView.prototype.dynamicCheckState = function (node, doCheck) {
        if (this.dataType === 1) {
            var count = 0;
            var resultId = new DataManager(this.treeData).executeLocal(new Query().where(this.fields.id, 'equal', node, true));
            if (resultId[0]) {
                var id = resultId[0][this.fields.id] ? resultId[0][this.fields.id].toString() : null;
                var parent_1 = resultId[0][this.fields.parentID] ? resultId[0][this.fields.parentID].toString() : null;
                var parentElement = this.element.querySelector('[data-uid="' + parent_1 + '"]');
                var element = this.element.querySelector('[data-uid="' + id + '"]');
                var childNodes = this.getChildNodes(this.treeData, parent_1);
                if (childNodes) {
                    for (var i = 0; i < childNodes.length; i++) {
                        var childId = childNodes[parseInt(i.toString(), 10)][this.fields.id]
                            ? childNodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                            : null;
                        if (this.checkedNodes.indexOf(childId) !== -1) {
                            count++;
                        }
                    }
                }
                if (this.checkedNodes.indexOf(node) !== -1 && parentElement && (id === node) && this.autoCheck) {
                    this.changeState(parentElement, 'indeterminate', null);
                }
                else if (this.checkedNodes.indexOf(node) === -1 && element && (id === node) && !doCheck) {
                    this.changeState(element, 'uncheck', null);
                }
                else if (this.checkedNodes.indexOf(node) !== -1 && element && (id === node) && doCheck) {
                    this.changeState(element, 'check', null);
                }
                else if (this.checkedNodes.indexOf(node) === -1 && !element && parentElement && (id === node) && this.autoCheck
                    && count !== 0) {
                    this.changeState(parentElement, 'indeterminate', null);
                }
                else if (this.checkedNodes.indexOf(node) === -1 && !element && parentElement && (id === node) && this.autoCheck
                    && count === 0) {
                    this.changeState(parentElement, 'uncheck', null);
                }
                else if (!element && !parentElement && (id === node) && this.autoCheck) {
                    this.updateIndeterminate(node, doCheck);
                }
            }
        }
        else if (this.dataType === 2 || (this.fields.dataSource instanceof DataManager &&
            this.isOffline)) {
            var id = void 0;
            var parentElement = void 0;
            var check = void 0;
            for (var i = 0; i < this.treeData.length; i++) {
                id = this.treeData[parseInt(i.toString(), 10)][this.fields.id] ? this.treeData[parseInt(i.toString(), 10)][this.fields.id].toString() : '';
                parentElement = this.element.querySelector('[data-uid="' + id + '"]');
                check = parentElement ? select('.' + CHECK, parentElement) : null;
                if (this.checkedNodes.indexOf(id) === -1 && parentElement && check && !doCheck) {
                    this.changeState(parentElement, 'uncheck', null);
                }
                var subChild = getValue(this.fields.child.toString(), this.treeData[parseInt(i.toString(), 10)]);
                if (subChild) {
                    this.updateChildIndeterminate(subChild, id, node, doCheck, id);
                }
            }
        }
    };
    /**
     * updates the parent and child  check state while changing the checkedNodes via setmodel for listData
     *
     * @param {string} node - The unique identifier of the node.
     * @param {boolean} doCheck - A boolean value indicating whether to check or uncheck the node.
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateIndeterminate = function (node, doCheck) {
        var indeterminateData = this.getTreeData(node);
        var count = 0;
        var parent;
        if (this.dataType === 1) {
            parent = indeterminateData[0][this.fields.parentID] ? indeterminateData[0][this.fields.parentID].toString() : null;
        }
        var childNodes = this.getChildNodes(this.treeData, parent);
        if (childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var childId = childNodes[parseInt(i.toString(), 10)][this.fields.id]
                    ? childNodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                    : null;
                if (this.checkedNodes.indexOf(childId) !== -1) {
                    count++;
                }
            }
        }
        var parentElement = this.element.querySelector('[data-uid="' + parent + '"]');
        if (parentElement && doCheck) {
            this.changeState(parentElement, 'indeterminate', null);
        }
        else if (!doCheck && parentElement && this.parentNodeCheck.indexOf(parent) === -1 && count !== 0) {
            this.changeState(parentElement, 'indeterminate', null);
        }
        else if (!doCheck && parentElement && this.parentNodeCheck.indexOf(parent) === -1 && count === 0) {
            this.changeState(parentElement, 'uncheck', null);
        }
        else if (!parentElement) {
            if (!doCheck && this.checkedNodes.indexOf(parent) === -1 && this.parentNodeCheck.indexOf(parent) !== -1) {
                this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(parent), 1);
            }
            else if (doCheck && this.checkedNodes.indexOf(parent) === -1 && this.parentNodeCheck.indexOf(parent) === -1) {
                this.parentNodeCheck.push(parent);
            }
            else if (!doCheck && this.checkedNodes.indexOf(parent) !== -1 && this.parentNodeCheck.indexOf(parent) === -1
                && count !== 0) {
                this.parentNodeCheck.push(parent);
            }
            this.updateIndeterminate(parent, doCheck);
            if (this.checkedNodes.indexOf(parent) !== -1 && !doCheck) {
                this.checkedNodes.splice(this.checkedNodes.indexOf(parent), 1);
            }
        }
    };
    /**
     * updates the parent and child  check state while changing the checkedNodes via setmodel for hierarchical data
     *
     * @param {Object[]} subChild - Array of child nodes
     * @param {string} parent - Parent identifier
     * @param {string} node - Current node identifier
     * @param {boolean} doCheck - Boolean indicating whether to perform a check
     * @param {string} [child] - Optional child identifier
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateChildIndeterminate = function (subChild, parent, node, doCheck, child) {
        var count = 0;
        for (var j = 0; j < subChild.length; j++) {
            var subId = subChild[parseInt(j.toString(), 10)][this.fields.id] ? subChild[parseInt(j.toString(), 10)][this.fields.id].toString() : '';
            if (this.checkedNodes.indexOf(subId) !== -1) {
                count++;
            }
            var parentElement = this.element.querySelector('[data-uid="' + parent + '"]');
            var indeterminate = parentElement ? select('.' + INDETERMINATE, parentElement) : null;
            var check = parentElement ? select('.' + CHECK, parentElement) : null;
            var element = this.element.querySelector('[data-uid="' + subId + '"]');
            var childElementCheck = element ? select('.' + CHECK, element) : null;
            if (this.checkedNodes.indexOf(node) !== -1 && parentElement && (subId === node) && this.autoCheck) {
                this.changeState(parentElement, 'indeterminate', null);
            }
            else if (this.checkedNodes.indexOf(node) === -1 && parentElement && !element && (subId === node) && !doCheck) {
                if (this.autoCheck) {
                    this.changeState(parentElement, 'uncheck', null);
                }
                else {
                    if (count !== 0) {
                        this.changeState(parentElement, 'indeterminate', null);
                    }
                    else {
                        this.changeState(parentElement, 'uncheck', null);
                    }
                }
            }
            else if (this.checkedNodes.indexOf(node) === -1 && element && (subId === node) && !doCheck) {
                this.changeState(element, 'uncheck', null);
            }
            else if (this.checkedNodes.indexOf(node) === -1 && indeterminate && (subId === node) && this.autoCheck && count === 0
                && !doCheck) {
                indeterminate.classList.remove(INDETERMINATE);
            }
            else if (this.checkedNodes.indexOf(node) === -1 && !element && check && (subId === node) && count === 0) {
                this.changeState(parentElement, 'uncheck', null);
            }
            else if (this.checkedNodes.indexOf(subId) === -1 && element && childElementCheck && count === 0) {
                this.changeState(element, 'uncheck', null);
            }
            else if (!element && !parentElement && (subId === node) || (this.parentNodeCheck.indexOf(parent) !== -1) && this.autoCheck) {
                var childElement = this.element.querySelector('[data-uid="' + child + '"]');
                if (doCheck && count !== 0) {
                    this.changeState(childElement, 'indeterminate', null);
                }
                else if (doCheck && count === subChild.length && this.checkedNodes.indexOf(parent) === -1) {
                    this.checkDisabledState(parent);
                }
                else if (!doCheck && count === 0 && this.parentNodeCheck.indexOf(parent) !== -1) {
                    this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(parent));
                }
                if (this.parentNodeCheck.indexOf(parent) === -1) {
                    this.parentNodeCheck.push(parent);
                }
            }
            var innerChild = getValue(this.fields.child.toString(), subChild[parseInt(j.toString(), 10)]);
            if (innerChild) {
                this.updateChildIndeterminate(innerChild, subId, node, doCheck, child);
            }
        }
    };
    TreeView.prototype.changeState = function (wrapper, state, e, isPrevent, isAdd, doCheck) {
        var _this = this;
        var eventArgs;
        var currLi = closest(wrapper, '.' + LISTITEM);
        if (!this.checkDisabledChildren && currLi && (currLi.classList.contains(DISABLE)
            || (this.disableNode && this.disableNode.indexOf(currLi.getAttribute('data-uid')) !== -1))) {
            return;
        }
        if (wrapper === currLi) {
            wrapper = select('.' + CHECKBOXWRAP, currLi);
        }
        if (!isPrevent) {
            this.checkActionNodes = [];
            eventArgs = this.getCheckEvent(currLi, state, e);
            this.trigger('nodeChecking', eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    _this.nodeCheckAction(wrapper, state, currLi, observedArgs, e, isPrevent, isAdd, doCheck);
                }
            });
        }
        else {
            this.nodeCheckAction(wrapper, state, currLi, eventArgs, e, isPrevent, isAdd, doCheck);
        }
    };
    TreeView.prototype.nodeCheckAction = function (wrapper, state, currLi, eventArgs, e, isPrevent, isAdd, doCheck) {
        var ariaState;
        var frameSpan = wrapper.getElementsByClassName(CHECKBOXFRAME)[0];
        if (state === 'check' && !frameSpan.classList.contains(CHECK)) {
            frameSpan.classList.remove(INDETERMINATE);
            frameSpan.classList.add(CHECK);
            this.addCheck(currLi);
            ariaState = 'true';
        }
        else if (state === 'uncheck' && (frameSpan.classList.contains(CHECK) || frameSpan.classList.contains(INDETERMINATE))) {
            removeClass([frameSpan], [CHECK, INDETERMINATE]);
            this.removeCheck(currLi);
            ariaState = 'false';
        }
        else if (state === 'indeterminate' && this.autoCheck) {
            frameSpan.classList.remove(CHECK);
            frameSpan.classList.add(INDETERMINATE);
            this.removeCheck(currLi);
            ariaState = 'mixed';
        }
        ariaState = state === 'check' ? 'true' : state === 'uncheck' ? 'false' : ariaState;
        if (!isNullOrUndefined(ariaState)) {
            currLi.setAttribute('aria-checked', ariaState);
        }
        if (isAdd) {
            var data = [].concat([], this.checkActionNodes);
            eventArgs = this.getCheckEvent(currLi, state, e);
            if (isUndefined(isPrevent)) {
                eventArgs.data = data;
            }
        }
        if (doCheck !== undefined) {
            this.ensureStateChange(currLi, doCheck);
        }
        if (!isPrevent) {
            if (!isNullOrUndefined(ariaState)) {
                currLi.setAttribute('aria-checked', ariaState);
                eventArgs.data[0].checked = ariaState;
                this.trigger('nodeChecked', eventArgs);
                this.checkActionNodes = [];
            }
        }
    };
    TreeView.prototype.addCheck = function (liEle) {
        var id = liEle.getAttribute('data-uid');
        if (!isNullOrUndefined(id) && this.checkedNodes.indexOf(id) === -1) {
            this.checkDisabledState(id);
        }
    };
    TreeView.prototype.removeCheck = function (liEle) {
        var index = this.checkedNodes.indexOf(liEle.getAttribute('data-uid'));
        if (index > -1) {
            this.checkedNodes.splice(index, 1);
        }
    };
    TreeView.prototype.getCheckEvent = function (currLi, action, e) {
        this.checkActionNodes.push(this.getNodeData(currLi));
        var nodeData = this.checkActionNodes;
        return { action: action, cancel: false, isInteracted: isNullOrUndefined(e) ? false : true, node: currLi, data: nodeData };
    };
    TreeView.prototype.finalize = function () {
        var firstUl = select('.' + PARENTITEM, this.element);
        if (!isNullOrUndefined(firstUl)) {
            firstUl.setAttribute('role', treeAriaAttr.treeRole);
            this.setMultiSelect(this.allowMultiSelection);
            this.setNodeFocusable();
            if (this.allowTextWrap) {
                this.updateWrap();
            }
            this.renderReactTemplates();
            this.hasPid = this.rootData[0] ? Object.prototype.hasOwnProperty.call(this.rootData[0], this.fields.parentID) : false;
            this.doExpandAction();
        }
    };
    TreeView.prototype.setTextWrap = function () {
        (this.allowTextWrap ? addClass : removeClass)([this.element], LISTWRAP);
        if (Browser.isIE) {
            (this.allowTextWrap ? addClass : removeClass)([this.element], IELISTWRAP);
        }
    };
    TreeView.prototype.updateWrap = function (ulEle) {
        if (!this.fullRowSelect) {
            return;
        }
        var liEle = ulEle ? selectAll('.' + LISTITEM, ulEle) : this.liList;
        var length = liEle.length;
        for (var i = 0; i < length; i++) {
            this.calculateWrap(liEle[parseInt(i.toString(), 10)]);
        }
    };
    TreeView.prototype.calculateWrap = function (liEle) {
        var element = select('.' + FULLROW, liEle);
        if (element && element.nextElementSibling) {
            element.style.height = this.allowTextWrap ? element.nextElementSibling.offsetHeight + 'px' : '';
        }
    };
    TreeView.prototype.doExpandAction = function () {
        var _this = this;
        var eUids = this.expandedNodes;
        if (!this.loadOnDemand && this.fields.dataSource instanceof DataManager) {
            this.isInitalExpand = this.treeData.filter(function (e) { return e[_this.fields.expanded] === true; }).length > 0
                ? true
                : this.isInitalExpand;
        }
        if (this.isInitalExpand && eUids.length > 0) {
            this.setProperties({ expandedNodes: [] }, true);
            if (this.fields.dataSource instanceof DataManager) {
                this.expandGivenNodes(eUids);
            }
            else {
                for (var i = 0; i < eUids.length; i++) {
                    var eNode = select('[data-uid="' + eUids[parseInt(i.toString(), 10)] + '"]', this.element);
                    if (!isNullOrUndefined(eNode)) {
                        var icon = select('.' + EXPANDABLE, select('.' + TEXTWRAP, eNode));
                        if (!isNullOrUndefined(icon)) {
                            this.expandAction(eNode, icon, null);
                        }
                    }
                    else {
                        if (eUids[parseInt(i.toString(), 10)] && this.expandChildren.indexOf(eUids[parseInt(i.toString(), 10)]) === -1) {
                            this.expandChildren.push(eUids[parseInt(i.toString(), 10)].toString());
                        }
                        continue;
                    }
                }
                this.afterFinalized();
            }
        }
        else {
            this.afterFinalized();
        }
    };
    TreeView.prototype.expandGivenNodes = function (arr) {
        var _this = this;
        this.expandCallback(arr[this.index], function () {
            _this.index++;
            if (_this.index < arr.length) {
                _this.expandGivenNodes(arr);
            }
            else {
                _this.afterFinalized();
            }
        });
        if (this.index > 0) {
            this.index = 0;
        }
    };
    TreeView.prototype.expandCallback = function (eUid, callback) {
        var eNode = select('[data-uid="' + eUid + '"]', this.element);
        if (!isNullOrUndefined(eNode)) {
            var icon = select('.' + EXPANDABLE, select('.' + TEXTWRAP, eNode));
            if (!isNullOrUndefined(icon)) {
                this.expandAction(eNode, icon, null, false, callback);
            }
            callback();
        }
        else {
            callback();
        }
    };
    TreeView.prototype.afterFinalized = function () {
        this.doSelectionAction();
        this.updateCheckedProp();
        this.isAnimate = true;
        this.isInitalExpand = false;
        if ((!this.isLoaded || this.isFieldChange) && !this.isNodeDropped) {
            var eventArgs = { data: this.treeData };
            this.trigger('dataBound', eventArgs);
        }
        this.isLoaded = true;
        this.isNodeDropped = false;
    };
    TreeView.prototype.doSelectionAction = function () {
        var sNodes = selectAll('.' + SELECTED$1, this.element);
        var sUids = this.selectedNodes;
        if (sUids.length > 0) {
            this.setProperties({ selectedNodes: [] }, true);
            for (var i = 0; i < sUids.length; i++) {
                var sNode = select('[data-uid="' + sUids[parseInt(i.toString(), 10)] + '"]', this.element);
                if (sNode && !(sNode.classList.contains('e-active'))) {
                    this.selectNode(sNode, null, true);
                }
                else {
                    this.selectedNodes.push(sUids[parseInt(i.toString(), 10)]);
                }
                if (!this.allowMultiSelection) {
                    break;
                }
            }
        }
        else {
            this.selectGivenNodes(sNodes);
        }
        removeClass(sNodes, SELECTED$1);
    };
    TreeView.prototype.selectGivenNodes = function (sNodes) {
        for (var i = 0; i < sNodes.length; i++) {
            if (!sNodes[parseInt(i.toString(), 10)].classList.contains('e-disable')) {
                this.selectNode(sNodes[parseInt(i.toString(), 10)], null, true);
            }
            if (!this.allowMultiSelection) {
                break;
            }
        }
    };
    TreeView.prototype.clickHandler = function (event) {
        var target = Browser.isDevice && event.originalEvent.changedTouches && !Browser.isIos
            ? document.elementFromPoint(event.originalEvent.changedTouches[0].clientX, event.originalEvent.changedTouches[0].clientY)
            : event.originalEvent.target;
        EventHandler.remove(this.element, 'contextmenu', this.preventContextMenu);
        if (!target || this.dragStartAction) {
            return;
        }
        else {
            var classList = target.classList;
            var li = closest(target, '.' + LISTITEM);
            if (!li || (li.classList.contains(PREVENTSELECT) && !(classList.contains(EXPANDABLE) || classList.contains(COLLAPSIBLE)))) {
                return;
            }
            else if (event.originalEvent.which !== 3) {
                var rippleElement = select('.' + RIPPLEELMENT, li);
                var rippleIcons = select('.' + ICON, li);
                this.removeHover();
                this.setFocusElement(li);
                if (this.showCheckBox && !li.classList.contains('e-disable')) {
                    var checkWrapper = closest(target, '.' + CHECKBOXWRAP);
                    if (!isNullOrUndefined(checkWrapper)) {
                        var checkElement = select('.' + CHECKBOXFRAME, checkWrapper);
                        this.validateCheckNode(checkWrapper, checkElement.classList.contains(CHECK), li, event.originalEvent);
                        this.triggerClickEvent(event.originalEvent, li);
                        return;
                    }
                }
                if (classList.contains(EXPANDABLE)) {
                    this.expandAction(li, target, event);
                }
                else if (classList.contains(COLLAPSIBLE)) {
                    this.collapseNode(li, target, event);
                }
                else if (rippleElement && rippleIcons) {
                    if (rippleIcons.classList.contains(RIPPLE) && rippleIcons.classList.contains(EXPANDABLE)) {
                        this.expandAction(li, rippleIcons, event);
                    }
                    else if (rippleIcons.classList.contains(RIPPLE) && rippleIcons.classList.contains(COLLAPSIBLE)) {
                        this.collapseNode(li, rippleIcons, event);
                    }
                    else if (!classList.contains(PARENTITEM) && !classList.contains(LISTITEM)) {
                        this.toggleSelect(li, event.originalEvent, false);
                    }
                }
                else {
                    if (!classList.contains(PARENTITEM) && !classList.contains(LISTITEM)) {
                        this.toggleSelect(li, event.originalEvent, false);
                    }
                }
            }
            if (event.originalEvent.which === 3) {
                this.isRightClick = true;
            }
            this.triggerClickEvent(event.originalEvent, li);
        }
    };
    TreeView.prototype.nodeCheckedEvent = function (wrapper, isCheck, e) {
        var eventArgs = this.getCheckEvent(wrapper, isCheck ? 'uncheck' : 'check', e);
        eventArgs.data = eventArgs.data.splice(0, eventArgs.data.length - 1);
        this.trigger('nodeChecked', eventArgs);
    };
    TreeView.prototype.updateOldCheckedData = function (data) {
        var _this = this;
        var dataManager = new DataManager(data);
        var childItems = dataManager.executeLocal(new Query().where('isChecked', 'equal', 'true', true));
        var uncheckedItems = dataManager.executeLocal(new Query().where('isChecked', 'equal', 'false', true));
        if (uncheckedItems.length > 0) {
            var index = this.OldCheckedData.findIndex(function (e) { return e['id'] === uncheckedItems[0]['id']; });
            if (index !== -1) {
                this.OldCheckedData.splice(index, 1);
                var childNodes = this.OldCheckedData.filter(function (e) { return e['parentID'] === uncheckedItems[0]['id']; });
                if (childNodes.length > 0) {
                    childNodes.forEach(function (child) {
                        var childIndex = _this.OldCheckedData.findIndex(function (e) { return e['id'] === child.id; });
                        if (childIndex !== -1) {
                            _this.OldCheckedData.splice(childIndex, 1);
                        }
                    });
                }
                return;
            }
        }
        if (childItems.length > 0) {
            var index = this.OldCheckedData.findIndex(function (e) { return e['id'] === childItems[0]['id']; });
            if (index === -1) {
                this.OldCheckedData.push(childItems[0]);
                return;
            }
        }
    };
    TreeView.prototype.triggerClickEvent = function (e, li) {
        var eventArgs = {
            event: e,
            node: li
        };
        this.trigger('nodeClicked', eventArgs);
    };
    TreeView.prototype.expandNode = function (currLi, icon, loaded) {
        var _this = this;
        this.renderReactTemplates();
        if (icon.classList.contains(LOAD)) {
            this.hideSpinner(icon);
        }
        if (!this.initialRender) {
            icon.classList.add('interaction');
        }
        if (loaded !== true || (loaded === true && currLi.classList.contains('e-expanded'))) {
            if (this.preventExpand !== true) {
                removeClass([icon], EXPANDABLE);
                addClass([icon], COLLAPSIBLE);
                var start_1 = 0;
                var end_1 = 0;
                var ul_1 = select('.' + PARENTITEM, currLi);
                var liEle_1 = currLi;
                if (this.isAnimate && !this.isRefreshed) {
                    this.setHeight(liEle_1, ul_1);
                    var activeElement_1 = select('.' + LISTITEM + '.' + ACTIVE, currLi);
                    this.aniObj.animate(ul_1, {
                        name: this.animation.expand.effect,
                        duration: (this.animation.expand.duration === 0 && animationMode === 'Enable') ? 400 : this.animation.expand.duration,
                        timingFunction: this.animation.expand.easing,
                        begin: function () {
                            liEle_1.style.overflow = 'hidden';
                            if (!isNullOrUndefined(activeElement_1) && activeElement_1 instanceof HTMLElement) {
                                activeElement_1.classList.add(ITEM_ANIMATION_ACTIVE);
                            }
                            start_1 = liEle_1.offsetHeight;
                            end_1 = select('.' + TEXTWRAP, currLi).offsetHeight;
                        },
                        progress: function (args) {
                            args.element.style.display = 'block';
                            _this.animateHeight(args, start_1, end_1);
                        },
                        end: function (args) {
                            args.element.style.display = 'block';
                            if (!isNullOrUndefined(activeElement_1) && activeElement_1 instanceof HTMLElement) {
                                activeElement_1.classList.remove(ITEM_ANIMATION_ACTIVE);
                            }
                            _this.expandedNode(liEle_1, ul_1, icon);
                        }
                    });
                }
                else {
                    this.expandedNode(liEle_1, ul_1, icon);
                }
            }
        }
        else {
            var ul = select('.' + PARENTITEM, currLi);
            ul.style.display = 'none';
            if (this.fields.dataSource instanceof DataManager === true) {
                this.preventExpand = false;
            }
        }
        if (this.initialRender) {
            icon.classList.add('interaction');
        }
    };
    TreeView.prototype.expandedNode = function (currLi, ul, icon) {
        ul.style.display = 'block';
        currLi.style.display = 'block';
        currLi.style.overflow = '';
        currLi.style.height = '';
        removeClass([icon], PROCESS);
        this.addExpand(currLi);
        if (this.allowTextWrap && this.isLoaded && this.isFirstRender) {
            this.updateWrap(currLi);
            this.isFirstRender = false;
        }
        if (this.isLoaded && this.expandArgs && !this.isRefreshed) {
            this.expandArgs = this.getExpandEvent(currLi, null);
            this.expandArgs.isInteracted = this.isInteracted;
            this.trigger('nodeExpanded', this.expandArgs);
        }
        if (this.isHiddenItem) {
            this.collapseAll([this.getNodeData(currLi).id]);
        }
    };
    TreeView.prototype.addExpand = function (liEle) {
        liEle.setAttribute('aria-expanded', 'true');
        removeClass([liEle], NODECOLLAPSED);
        var id = liEle.getAttribute('data-uid');
        if (!isNullOrUndefined(id) && this.expandedNodes.indexOf(id) === -1) {
            this.expandedNodes.push(id);
        }
    };
    TreeView.prototype.collapseNode = function (currLi, icon, e) {
        var _this = this;
        if (icon.classList.contains(PROCESS)) {
            return;
        }
        else {
            addClass([icon], PROCESS);
        }
        var colArgs;
        if (this.isLoaded) {
            colArgs = this.getExpandEvent(currLi, e);
            this.isInteracted = colArgs.isInteracted;
            this.trigger('nodeCollapsing', colArgs, function (observedArgs) {
                if (observedArgs.cancel) {
                    removeClass([icon], PROCESS);
                }
                else {
                    _this.nodeCollapseAction(currLi, icon, observedArgs);
                }
            });
        }
        else {
            this.nodeCollapseAction(currLi, icon, colArgs);
        }
    };
    TreeView.prototype.nodeCollapseAction = function (currLi, icon, colArgs) {
        var _this = this;
        removeClass([icon], COLLAPSIBLE);
        addClass([icon], EXPANDABLE);
        var start = 0;
        var end = 0;
        var ul = select('.' + PARENTITEM, currLi);
        var liEle = currLi;
        var activeElement = select('.' + LISTITEM + '.' + ACTIVE, currLi);
        if (this.isAnimate) {
            this.aniObj.animate(ul, {
                name: this.animation.collapse.effect,
                duration: (this.animation.collapse.duration === 0 && animationMode === 'Enable') ? 400 : this.animation.collapse.duration,
                timingFunction: this.animation.collapse.easing,
                begin: function () {
                    liEle.style.overflow = 'hidden';
                    if (!isNullOrUndefined(activeElement) && activeElement instanceof HTMLElement) {
                        activeElement.classList.add(ITEM_ANIMATION_ACTIVE);
                    }
                    start = select('.' + TEXTWRAP, currLi).offsetHeight;
                    end = liEle.offsetHeight;
                },
                progress: function (args) {
                    _this.animateHeight(args, start, end);
                },
                end: function (args) {
                    args.element.style.display = 'none';
                    if (!isNullOrUndefined(activeElement) && activeElement instanceof HTMLElement) {
                        activeElement.classList.remove(ITEM_ANIMATION_ACTIVE);
                    }
                    _this.collapsedNode(liEle, ul, icon, colArgs);
                }
            });
        }
        else {
            this.collapsedNode(liEle, ul, icon, colArgs);
        }
    };
    TreeView.prototype.collapsedNode = function (liEle, ul, icon, colArgs) {
        ul.style.display = 'none';
        liEle.style.overflow = '';
        liEle.style.height = '';
        removeClass([icon], PROCESS);
        this.removeExpand(liEle);
        if (this.isLoaded) {
            colArgs = this.getExpandEvent(liEle, null);
            colArgs.isInteracted = this.isInteracted;
            this.trigger('nodeCollapsed', colArgs);
        }
    };
    TreeView.prototype.removeExpand = function (liEle, toRemove) {
        if (toRemove) {
            liEle.removeAttribute('aria-expanded');
        }
        else {
            this.disableExpandAttr(liEle);
        }
        var index = this.expandedNodes.indexOf(liEle.getAttribute('data-uid'));
        if (index > -1) {
            this.expandedNodes.splice(index, 1);
        }
    };
    TreeView.prototype.disableExpandAttr = function (liEle) {
        liEle.setAttribute('aria-expanded', 'false');
        addClass([liEle], NODECOLLAPSED);
    };
    TreeView.prototype.setHeight = function (currLi, ul) {
        ul.style.display = 'block';
        ul.style.visibility = 'hidden';
        currLi.style.height = currLi.offsetHeight + 'px';
        ul.style.display = 'none';
        ul.style.visibility = '';
    };
    TreeView.prototype.animateHeight = function (args, start, end) {
        if (isNullOrUndefined(args.element.parentElement)) {
            return;
        }
        var remaining = (args.duration - args.timeStamp) / args.duration;
        var currentHeight = (end - start) * remaining + start;
        args.element.parentElement.style.height = currentHeight + 'px';
    };
    TreeView.prototype.renderChildNodes = function (parentLi, expandChild, callback, loaded, isFromExpandAll) {
        var _this = this;
        var eicon = select('div.' + ICON, parentLi);
        if (isNullOrUndefined(eicon)) {
            return;
        }
        this.showSpinner(eicon);
        var childItems;
        if (this.fields.dataSource instanceof DataManager) {
            var level = this.parents(parentLi, '.' + PARENTITEM).length;
            var mapper_2 = this.getChildFields(this.fields, level, 1);
            if (isNullOrUndefined(mapper_2) || isNullOrUndefined(mapper_2.dataSource)) {
                detach(eicon);
                this.removeExpand(parentLi, true);
                return;
            }
            this.treeList.push('false');
            if (this.fields.dataSource instanceof DataManager && this.isOffline) {
                this.treeList.pop();
                childItems = this.getChildNodes(this.treeData, parentLi.getAttribute('data-uid'));
                this.loadChild(childItems, mapper_2, eicon, parentLi, expandChild, callback, loaded);
            }
            else {
                mapper_2.dataSource.executeQuery(this.getQuery(mapper_2, parentLi.getAttribute('data-uid'))).then(function (e) {
                    _this.treeList.pop();
                    childItems = e.result;
                    if (_this.dataType === 1) {
                        _this.dataType = 2;
                    }
                    _this.loadChild(childItems, mapper_2, eicon, parentLi, expandChild, callback, loaded);
                }).catch(function (e) {
                    _this.trigger('actionFailure', { error: e });
                });
            }
        }
        else {
            childItems = this.getChildNodes(this.treeData, parentLi.getAttribute('data-uid'), false, parseFloat(parentLi.getAttribute('aria-level')) + 1);
            this.currentLoadData = this.getSortedData(childItems);
            if (isNullOrUndefined(childItems) || childItems.length === 0) {
                detach(eicon);
                if (eicon.classList.contains(LOAD)) {
                    this.hideSpinner(eicon);
                }
                this.removeExpand(parentLi, true);
                return;
            }
            else {
                this.listBaseOption.ariaAttributes.level = parseFloat(parentLi.getAttribute('aria-level')) + 1;
                parentLi.appendChild(ListBase.createList(this.createElement, this.currentLoadData, this.listBaseOption));
                this.expandNode(parentLi, eicon, loaded);
                this.setSelectionForChildNodes(childItems);
                this.ensureCheckNode(parentLi, isFromExpandAll);
                this.finalizeNode(parentLi, isFromExpandAll, expandChild);
                this.disableTreeNodes(childItems);
                this.renderSubChild(parentLi, expandChild, loaded, isFromExpandAll);
            }
        }
    };
    TreeView.prototype.loadChild = function (childItems, mapper, eicon, parentLi, expandChild, callback, loaded) {
        this.currentLoadData = childItems;
        if (isNullOrUndefined(childItems) || childItems.length === 0) {
            detach(eicon);
            this.removeExpand(parentLi, true);
        }
        else {
            this.updateListProp(mapper);
            if (this.fields.dataSource instanceof DataManager && !this.isOffline) {
                var id = parentLi.getAttribute('data-uid');
                var nodeData = this.getNodeObject(id);
                setValue('child', childItems, nodeData);
            }
            this.listBaseOption.ariaAttributes.level = parseFloat(parentLi.getAttribute('aria-level')) + 1;
            parentLi.appendChild(ListBase.createList(this.createElement, childItems, this.listBaseOption));
            this.expandNode(parentLi, eicon, loaded);
            this.setSelectionForChildNodes(childItems);
            this.ensureCheckNode(parentLi);
            this.finalizeNode(parentLi);
            this.disableTreeNodes(childItems);
            this.renderSubChild(parentLi, expandChild, loaded);
        }
        if (callback) {
            callback();
        }
        if (expandChild) {
            this.expandedNodes.push(parentLi.getAttribute('data-uid'));
        }
        if (this.treeList.length === 0 && !this.isLoaded) {
            this.finalize();
        }
    };
    TreeView.prototype.disableTreeNodes = function (childItems) {
        if (isNullOrUndefined(this.disableNode) || this.disableNode.length === 0) {
            return;
        }
        var i = 0;
        while (i < childItems.length) {
            var id = childItems[parseInt(i.toString(), 10)][this.fields.id]
                ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString()
                : null;
            if (this.disableNode !== undefined && this.disableNode.indexOf(id) !== -1) {
                this.doDisableAction([id]);
            }
            i++;
        }
    };
    /**
     * Sets the child Item in selectedState while rendering the child node
     *
     * @param {Object[]} nodes - Array of nodes
     * @returns {void}
     */
    TreeView.prototype.setSelectionForChildNodes = function (nodes) {
        if (isNullOrUndefined(this.selectedNodes) || this.selectedNodes.length === 0) {
            return;
        }
        var i;
        for (i = 0; i < nodes.length; i++) {
            var id = nodes[parseInt(i.toString(), 10)][this.fields.id]
                ? nodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                : null;
            if (this.selectedNodes !== undefined && this.selectedNodes.indexOf(id) !== -1) {
                this.doSelectionAction();
            }
        }
    };
    TreeView.prototype.ensureCheckNode = function (element, isFromExpandAll) {
        if (this.showCheckBox) {
            this.ele = (this.checkedElement) ? this.checkedElement.indexOf(element.getAttribute('data-uid')) : null;
            if (this.autoCheck) {
                this.ensureChildCheckState(element, null, isFromExpandAll);
                if (isFromExpandAll ? (select('.' + CHECK, this.element) || select('.' + INDETERMINATE, this.element)) : true) {
                    this.ensureParentCheckState(element);
                }
            }
        }
        this.currentLoadData = null;
    };
    TreeView.prototype.getFields = function (mapper, nodeLevel, dataLevel) {
        if (nodeLevel === dataLevel) {
            return mapper;
        }
        else {
            return this.getFields(this.getChildMapper(mapper), nodeLevel, dataLevel + 1);
        }
    };
    TreeView.prototype.getChildFields = function (mapper, nodeLevel, dataLevel) {
        if (nodeLevel === dataLevel) {
            return this.getChildMapper(mapper);
        }
        else {
            return this.getChildFields(this.getChildMapper(mapper), nodeLevel, dataLevel + 1);
        }
    };
    TreeView.prototype.getChildMapper = function (mapper) {
        return (typeof mapper.child === 'string' || isNullOrUndefined(mapper.child)) ? mapper : mapper.child;
    };
    TreeView.prototype.getChildNodes = function (obj, parentId, isRoot, level) {
        var _this = this;
        if (isRoot === void 0) { isRoot = false; }
        var childNodes;
        if (isNullOrUndefined(obj)) {
            return childNodes;
        }
        if (this.dataType === 1) {
            return this.getChildGroup(this.groupedData, parentId, isRoot);
        }
        if (typeof this.fields.child === 'string') {
            return this.findChildNodes(obj, this.fields.id, parentId) || this.findNestedChildNodes(obj, parentId, level) || [];
        }
        if (this.isChildObject()) {
            var tempField = !isNullOrUndefined(level) ? this.fields : this.fields.child;
            var i = 1;
            while (i < level) {
                if (!isNullOrUndefined(tempField.child)) {
                    tempField = tempField.child;
                }
                else {
                    break;
                }
                i++;
            }
            this.updateListProp(tempField);
            var index = obj.findIndex(function (data) {
                return getValue(_this.fields.id, data) &&
                    getValue(_this.fields.id, data).toString() === parentId;
            });
            if (index !== -1) {
                return getValue('child', obj[parseInt(index.toString(), 10)]);
            }
            if (index === -1) {
                for (var i_1 = 0, objlen = obj.length; i_1 < objlen; i_1++) {
                    var tempArray = getValue('child', obj[parseInt(i_1.toString(), 10)]);
                    var childIndex = !isNullOrUndefined(tempArray)
                        ? tempArray.findIndex(function (data) {
                            return getValue(_this.fields.child.id, data) &&
                                getValue(_this.fields.child.id, data).toString() === parentId;
                        })
                        : -1;
                    if (childIndex !== -1) {
                        return getValue('child', tempArray[parseInt(childIndex.toString(), 10)]);
                    }
                    else if (!isNullOrUndefined(tempArray)) {
                        childNodes = this.getChildNodes(tempArray, parentId, false, level);
                        if (childNodes !== undefined) {
                            break;
                        }
                    }
                }
            }
        }
        return childNodes;
    };
    TreeView.prototype.findChildNodes = function (items, idField, parentId) {
        var index = items.findIndex(function (data) {
            var value = getValue(idField, data);
            return value && value.toString() === parentId;
        });
        if (index !== -1) {
            return getValue(this.fields.child, items[index]);
        }
        return null;
    };
    TreeView.prototype.findNestedChildNodes = function (items, parentId, level) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var tempArray = getValue(this.fields.child, item);
            if (!isNullOrUndefined(tempArray)) {
                var childNodes = this.findChildNodes(tempArray, this.fields.id, parentId);
                if (childNodes) {
                    return childNodes;
                }
                var nestedChildNodes = this.getChildNodes(tempArray, parentId, false, level);
                if (nestedChildNodes && nestedChildNodes.length > 0) {
                    return nestedChildNodes;
                }
            }
        }
        return undefined;
    };
    TreeView.prototype.getChildGroup = function (data, parentId, isRoot) {
        var childNodes;
        if (isNullOrUndefined(data)) {
            return childNodes;
        }
        for (var i = 0, objlen = data.length; i < objlen; i++) {
            if (!isNullOrUndefined(data[parseInt(i.toString(), 10)][0]) &&
                !isNullOrUndefined(getValue(this.fields.parentID, data[parseInt(i.toString(), 10)][0]))) {
                if (getValue(this.fields.parentID, data[parseInt(i.toString(), 10)][0]).toString() === parentId) {
                    return data[parseInt(i.toString(), 10)];
                }
            }
            else if (isRoot) {
                return data[parseInt(i.toString(), 10)];
            }
            else {
                return [];
            }
        }
        return childNodes;
    };
    TreeView.prototype.renderSubChild = function (element, expandChild, loaded, isFromExpandAll) {
        if (expandChild) {
            var cIcons = selectAll('.' + EXPANDABLE, element);
            for (var i = 0, len = cIcons.length; i < len; i++) {
                var icon = cIcons[parseInt(i.toString(), 10)];
                if (element.querySelector('.e-icons') !== cIcons[parseInt(i.toString(), 10)]) {
                    var curLi = closest(icon, '.' + LISTITEM);
                    this.expandArgs = this.getExpandEvent(curLi, null);
                    if (loaded !== true) {
                        this.trigger('nodeExpanding', this.expandArgs);
                    }
                    this.renderChildNodes(curLi, expandChild, null, loaded, isFromExpandAll);
                }
            }
        }
    };
    TreeView.prototype.toggleSelect = function (li, e, multiSelect) {
        if (!li.classList.contains('e-disable')) {
            if (this.allowMultiSelection && ((e && e.ctrlKey) || multiSelect) && this.isActive(li)) {
                this.unselectNode(li, e);
            }
            else {
                this.selectNode(li, e, multiSelect);
            }
        }
    };
    TreeView.prototype.isActive = function (li) {
        return li.classList.contains(ACTIVE) ? true : false;
    };
    TreeView.prototype.selectNode = function (li, e, multiSelect) {
        var _this = this;
        if (isNullOrUndefined(li) || (!this.allowMultiSelection && this.isActive(li) && !isNullOrUndefined(e))) {
            this.setFocusElement(li);
            return;
        }
        var eventArgs;
        if (this.isLoaded) {
            eventArgs = this.getSelectEvent(li, 'select', e);
            this.trigger('nodeSelecting', eventArgs, function (observedArgs) {
                if ((!observedArgs.cancel) && !observedArgs.node.classList.contains(PREVENTSELECT)) {
                    _this.nodeSelectAction(li, e, observedArgs, multiSelect);
                }
            });
        }
        else {
            this.nodeSelectAction(li, e, eventArgs, multiSelect);
        }
    };
    TreeView.prototype.nodeSelectAction = function (li, e, eventArgs, multiSelect) {
        if (!this.allowMultiSelection || (!multiSelect && (!e || (e && !(e.ctrlKey || e.metaKey))))) {
            this.removeSelectAll();
        }
        if (this.allowMultiSelection && e && e.shiftKey) {
            if (!this.startNode) {
                this.startNode = li;
            }
            var startIndex = this.liList.indexOf(this.startNode);
            var endIndex = this.liList.indexOf(li);
            if (startIndex > endIndex) {
                var temp = startIndex;
                startIndex = endIndex;
                endIndex = temp;
            }
            for (var i = startIndex; i <= endIndex; i++) {
                var currNode = this.liList[parseInt(i.toString(), 10)];
                if (isVisible(currNode) && !currNode.classList.contains('e-disable')) {
                    this.addSelect(currNode);
                }
            }
        }
        else {
            this.startNode = li;
            this.addSelect(li);
        }
        if (this.isLoaded) {
            eventArgs.nodeData = this.getNodeData(li);
            this.trigger('nodeSelected', eventArgs);
            this.isRightClick = false;
        }
        this.isRightClick = false;
    };
    TreeView.prototype.unselectNode = function (li, e) {
        var _this = this;
        var eventArgs;
        if (this.isLoaded) {
            eventArgs = this.getSelectEvent(li, 'un-select', e);
            this.trigger('nodeSelecting', eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    _this.nodeUnselectAction(li, observedArgs);
                }
            });
        }
        else {
            this.nodeUnselectAction(li, eventArgs);
        }
    };
    TreeView.prototype.nodeUnselectAction = function (li, eventArgs) {
        this.removeSelect(li);
        this.setFocusElement(li);
        if (this.isLoaded) {
            eventArgs.nodeData = this.getNodeData(li);
            this.trigger('nodeSelected', eventArgs);
        }
    };
    TreeView.prototype.setFocusElement = function (li) {
        if (!isNullOrUndefined(li)) {
            var focusedNode = this.getFocusedNode();
            if (focusedNode) {
                removeClass([focusedNode], FOCUS);
                focusedNode.setAttribute('tabindex', '-1');
            }
            addClass([li], FOCUS);
            li.setAttribute('tabindex', '0');
            EventHandler.add(li, 'blur', this.focusOut, this);
            this.updateIdAttr(focusedNode, li);
        }
    };
    TreeView.prototype.addSelect = function (liEle) {
        liEle.setAttribute('aria-selected', 'true');
        addClass([liEle], ACTIVE);
        var id = liEle.getAttribute('data-uid');
        if (!isNullOrUndefined(id) && this.selectedNodes.indexOf(id) === -1) {
            this.selectedNodes.push(id);
        }
    };
    TreeView.prototype.removeSelect = function (liEle) {
        if (this.allowMultiSelection) {
            liEle.setAttribute('aria-selected', 'false');
        }
        else {
            liEle.removeAttribute('aria-selected');
        }
        removeClass([liEle], ACTIVE);
        var index = this.selectedNodes.indexOf(liEle.getAttribute('data-uid'));
        if (index > -1) {
            this.selectedNodes.splice(index, 1);
        }
    };
    TreeView.prototype.removeSelectAll = function () {
        var selectedLI = this.element.querySelectorAll('.' + ACTIVE);
        for (var _i = 0, selectedLI_1 = selectedLI; _i < selectedLI_1.length; _i++) {
            var ele = selectedLI_1[_i];
            if (this.allowMultiSelection) {
                ele.setAttribute('aria-selected', 'false');
            }
            else {
                ele.removeAttribute('aria-selected');
            }
        }
        removeClass(selectedLI, ACTIVE);
        this.setProperties({ selectedNodes: [] }, true);
    };
    TreeView.prototype.getSelectEvent = function (currLi, action, e) {
        var nodeData = this.getNodeData(currLi);
        return { action: action, cancel: false, isInteracted: isNullOrUndefined(e) ? false : true, node: currLi, nodeData: nodeData };
    };
    TreeView.prototype.setExpandOnType = function () {
        this.expandOnType = (this.expandOn === 'Auto') ? (Browser.isDevice ? 'Click' : 'DblClick') : this.expandOn;
    };
    TreeView.prototype.expandHandler = function (e) {
        var target = Browser.isDevice && e.originalEvent.changedTouches && !Browser.isIos
            ? document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY)
            : e.originalEvent.target;
        if (!target || target.classList.contains(INPUT) || target.classList.contains(ROOT) ||
            target.classList.contains(PARENTITEM) || target.classList.contains(LISTITEM) ||
            target.classList.contains(ICON) || this.showCheckBox && closest(target, '.' + CHECKBOXWRAP)) {
            return;
        }
        else {
            this.expandCollapseAction(closest(target, '.' + LISTITEM), e);
        }
    };
    TreeView.prototype.expandCollapseAction = function (currLi, e) {
        var icon = select('div.' + ICON, currLi);
        if (!icon || icon.classList.contains(PROCESS)) {
            return;
        }
        else {
            var classList = icon.classList;
            if (classList.contains(EXPANDABLE)) {
                this.expandAction(currLi, icon, e);
            }
            else if (classList.contains(COLLAPSIBLE)) {
                this.collapseNode(currLi, icon, e);
            }
        }
    };
    TreeView.prototype.expandAction = function (currLi, icon, e, expandChild, callback, isFromExpandAll) {
        var _this = this;
        if (icon.classList.contains(PROCESS)) {
            return;
        }
        else {
            addClass([icon], PROCESS);
        }
        if (this.isLoaded && !this.isRefreshed) {
            this.expandArgs = this.getExpandEvent(currLi, e);
            this.isInteracted = this.expandArgs.isInteracted;
            this.trigger('nodeExpanding', this.expandArgs, function (observedArgs) {
                if (observedArgs.cancel) {
                    removeClass([icon], PROCESS);
                }
                else {
                    _this.nodeExpandAction(currLi, icon, expandChild, callback, isFromExpandAll);
                }
            });
        }
        else {
            this.nodeExpandAction(currLi, icon, expandChild, callback, isFromExpandAll);
        }
    };
    TreeView.prototype.nodeExpandAction = function (currLi, icon, expandChild, callback, isFromExpandAll) {
        var ul = select('.' + PARENTITEM, currLi);
        if (ul && ul.nodeName === 'UL') {
            this.expandNode(currLi, icon);
        }
        else {
            this.isFirstRender = true;
            this.renderChildNodes(currLi, expandChild, callback, null, isFromExpandAll);
            var liEles = selectAll('.' + LISTITEM, currLi);
            for (var i = 0; i < liEles.length; i++) {
                var id = this.getId(liEles[parseInt(i.toString(), 10)]);
                if (this.expandChildren.indexOf(id) !== -1 && this.expandChildren !== undefined) {
                    var icon_1 = select('.' + EXPANDABLE, select('.' + TEXTWRAP, liEles[parseInt(i.toString(), 10)]));
                    if (!isNullOrUndefined(icon_1)) {
                        this.expandAction(liEles[parseInt(i.toString(), 10)], icon_1, null);
                    }
                    this.expandChildren.splice(this.expandChildren.indexOf(id), 1);
                }
            }
        }
    };
    TreeView.prototype.keyActionHandler = function (e) {
        var _this = this;
        var target = e.target;
        var focusedNode = this.getFocusedNode();
        if (target && target.classList.contains(INPUT)) {
            var inpEle = target;
            if (e.action === 'enter') {
                inpEle.blur();
            }
            else if (e.action === 'escape') {
                inpEle.value = this.oldText;
                inpEle.blur();
            }
            return;
        }
        e.preventDefault();
        var eventArgs = {
            cancel: false,
            event: e,
            node: focusedNode
        };
        this.trigger('keyPress', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                switch (e.action) {
                    case 'space':
                        if (_this.showCheckBox) {
                            _this.checkNode(e);
                        }
                        else {
                            _this.toggleSelect(focusedNode, e);
                        }
                        break;
                    case 'moveRight':
                        _this.openNode(_this.enableRtl ? false : true, e);
                        break;
                    case 'moveLeft':
                        _this.openNode(_this.enableRtl ? true : false, e);
                        break;
                    case 'shiftDown':
                        _this.shiftKeySelect(true, e);
                        break;
                    case 'moveDown':
                    case 'ctrlDown':
                    case 'csDown':
                        _this.navigateNode(true);
                        break;
                    case 'shiftUp':
                        _this.shiftKeySelect(false, e);
                        break;
                    case 'moveUp':
                    case 'ctrlUp':
                    case 'csUp':
                        _this.navigateNode(false);
                        break;
                    case 'home':
                    case 'shiftHome':
                    case 'ctrlHome':
                    case 'csHome':
                        _this.navigateRootNode(true);
                        break;
                    case 'end':
                    case 'shiftEnd':
                    case 'ctrlEnd':
                    case 'csEnd':
                        _this.navigateRootNode(false);
                        break;
                    case 'enter':
                    case 'ctrlEnter':
                    case 'shiftEnter':
                    case 'csEnter':
                    case 'shiftSpace':
                    case 'ctrlSpace':
                        _this.toggleSelect(focusedNode, e);
                        break;
                    case 'f2':
                        if (_this.allowEditing && !focusedNode.classList.contains('e-disable')) {
                            _this.createTextbox(focusedNode);
                        }
                        break;
                    case 'ctrlA':
                        if (_this.allowMultiSelection) {
                            var sNodes = selectAll('.' + LISTITEM + ':not(.' + ACTIVE + ')', _this.element);
                            _this.selectGivenNodes(sNodes);
                        }
                        break;
                }
            }
        });
    };
    TreeView.prototype.navigateToFocus = function (isUp) {
        var focusNode = this.getFocusedNode().querySelector('.' + TEXTWRAP);
        var pos = focusNode.getBoundingClientRect();
        var parent = this.getScrollParent(this.element);
        if (!isNullOrUndefined(parent)) {
            var parentPos = parent.getBoundingClientRect();
            if (pos.bottom > parentPos.bottom) {
                parent.scrollTop += pos.bottom - parentPos.bottom;
            }
            else if (pos.top < parentPos.top) {
                parent.scrollTop -= parentPos.top - pos.top;
            }
        }
        var isVisible = this.isVisibleInViewport(focusNode);
        if (!isVisible) {
            focusNode.scrollIntoView(isUp);
        }
    };
    TreeView.prototype.isVisibleInViewport = function (txtWrap) {
        var pos = txtWrap.getBoundingClientRect();
        return (pos.top >= 0 && pos.left >= 0 && pos.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            pos.right <= (window.innerWidth || document.documentElement.clientWidth));
    };
    TreeView.prototype.getScrollParent = function (node) {
        if (isNullOrUndefined(node)) {
            return null;
        }
        return (node.scrollHeight > node.clientHeight) ? node : this.getScrollParent(node.parentElement);
    };
    TreeView.prototype.shiftKeySelect = function (isTowards, e) {
        if (this.allowMultiSelection) {
            var focusedNode = this.getFocusedNode();
            var nextNode = isTowards ? this.getNextNode(focusedNode) : this.getPrevNode(focusedNode);
            this.removeHover();
            this.setFocusElement(nextNode);
            this.toggleSelect(nextNode, e, false);
            this.navigateToFocus(!isTowards);
        }
        else {
            this.navigateNode(isTowards);
        }
    };
    TreeView.prototype.checkNode = function (e) {
        var focusedNode = this.getFocusedNode();
        var checkWrap = select('.' + CHECKBOXWRAP, focusedNode);
        var isChecked = select(' .' + CHECKBOXFRAME, checkWrap).classList.contains(CHECK);
        if (!focusedNode.classList.contains('e-disable')) {
            if (focusedNode.getElementsByClassName('e-checkbox-disabled').length === 0) {
                this.validateCheckNode(checkWrap, isChecked, focusedNode, e);
            }
        }
    };
    TreeView.prototype.validateCheckNode = function (checkWrap, isCheck, li, e) {
        var _this = this;
        var currLi = closest(checkWrap, '.' + LISTITEM);
        this.checkActionNodes = [];
        var ariaState = !isCheck ? 'true' : 'false';
        if (!isNullOrUndefined(ariaState)) {
            currLi.setAttribute('aria-checked', ariaState);
        }
        var eventArgs = this.getCheckEvent(currLi, isCheck ? 'uncheck' : 'check', e);
        this.trigger('nodeChecking', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                _this.nodeCheckingAction(checkWrap, isCheck, li, observedArgs, e);
            }
        });
    };
    TreeView.prototype.nodeCheckingAction = function (checkWrap, isCheck, li, eventArgs, e) {
        if (this.checkedElement.indexOf(li.getAttribute('data-uid')) === -1) {
            this.checkedElement.push(li.getAttribute('data-uid'));
            if (this.autoCheck) {
                var child = this.getChildNodes(this.treeData, li.getAttribute('data-uid'));
                if (child !== null) {
                    this.allCheckNode(child, this.checkedElement, null, null, false);
                }
                else {
                    child = null;
                }
            }
        }
        this.changeState(checkWrap, isCheck ? 'uncheck' : 'check', e, true);
        if (this.autoCheck) {
            this.ensureChildCheckState(li);
            this.updateOldCheckedData([this.getNodeData(li)]);
            this.ensureParentCheckState(closest(closest(li, '.' + PARENTITEM), '.' + LISTITEM));
            var doCheck = void 0;
            if (eventArgs.action === 'check') {
                doCheck = true;
            }
            else if (eventArgs.action === 'uncheck') {
                doCheck = false;
            }
            this.ensureStateChange(li, doCheck);
        }
        this.nodeCheckedEvent(checkWrap, isCheck, e);
    };
    /**
     * Update checkedNodes when UI interaction happens before the child node renders in DOM
     *
     * @param {Element} li - The list item element
     * @param {boolean} [doCheck] - Optional parameter to specify whether to perform a check
     * @returns {void}
     */
    TreeView.prototype.ensureStateChange = function (li, doCheck) {
        var _this = this;
        var childElement = select('.' + PARENTITEM, li);
        var parentIndex = li.getAttribute('data-uid');
        var mapper = this.fields;
        if (this.dataType === 1 && this.autoCheck) {
            var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.parentID, 'equal', parentIndex, true));
            var childMatchesCheckedNodes = resultData.filter(function (item) {
                return _this.checkedNodes.indexOf(item[mapper.id].toString()) !== -1;
            }, this);
            if (this.checkedNodes.indexOf(parentIndex) !== -1 && childMatchesCheckedNodes.length !== resultData.length && this.isFilter) {
                if (childMatchesCheckedNodes.length > 0) {
                    resultData = childMatchesCheckedNodes;
                }
            }
            for (var i = 0; i < resultData.length; i++) {
                var resultId = resultData[parseInt(i.toString(), 10)][this.fields.id]
                    ? resultData[parseInt(i.toString(), 10)][this.fields.id].toString()
                    : null;
                var isCheck = resultData[parseInt(i.toString(), 10)][this.fields.isChecked]
                    ? resultData[parseInt(i.toString(), 10)][this.fields.isChecked].toString()
                    : null;
                if (this.checkedNodes.indexOf(parentIndex) !== -1 && this.checkedNodes.indexOf(resultId) === -1) {
                    this.checkDisabledState(resultId, resultData[i]);
                    var childItems = this.getChildNodes(this.treeData, resultId);
                    this.getChildItems(childItems, doCheck);
                    if (this.parentNodeCheck.indexOf(resultId) !== -1) {
                        this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(resultId), 1);
                    }
                }
                else if (this.checkedNodes.indexOf(parentIndex) === -1 && childElement === null &&
                    this.checkedNodes.indexOf(resultId) !== -1) {
                    this.checkedNodes.splice(this.checkedNodes.indexOf(resultId), 1);
                    if (isCheck === 'true') {
                        this.updateField(this.treeData, this.fields, resultId, 'isChecked', null);
                    }
                    if (this.checkedNodes.indexOf(parentIndex) === -1 && childElement === null ||
                        this.parentNodeCheck.indexOf(resultId) !== -1) {
                        var childNodes = this.getChildNodes(this.treeData, resultId);
                        this.getChildItems(childNodes, doCheck);
                        if (this.parentNodeCheck.indexOf(resultId) !== -1) {
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(resultId), 1);
                        }
                    }
                }
                else {
                    var childItems = this.getChildNodes(this.treeData, resultId);
                    this.getChildItems(childItems, doCheck);
                }
            }
        }
        else if (this.dataType === 1 && !this.autoCheck) {
            if (!doCheck) {
                var checkedData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.isChecked, 'equal', true, false));
                for (var i = 0; i < checkedData.length; i++) {
                    var id = checkedData[parseInt(i.toString(), 10)][this.fields.id]
                        ? checkedData[parseInt(i.toString(), 10)][this.fields.id].toString()
                        : null;
                    if (this.checkedNodes.indexOf(id) !== -1) {
                        this.checkedNodes.splice(this.checkedNodes.indexOf(id), 1);
                    }
                    this.updateField(this.treeData, this.fields, id, 'isChecked', null);
                }
                this.checkedNodes = [];
            }
            else {
                for (var i = 0; i < this.treeData.length; i++) {
                    var checkedId = this.treeData[parseInt(i.toString(), 10)][this.fields.id]
                        ? this.treeData[parseInt(i.toString(), 10)][this.fields.id].toString()
                        : null;
                    if (this.checkedNodes.indexOf(checkedId) === -1) {
                        this.checkDisabledState(checkedId, this.treeData[i]);
                    }
                }
            }
        }
        else {
            var childItems = this.getChildNodes(this.treeData, parentIndex);
            if (childItems) {
                var filteredChildItems = childItems.filter(function (item) {
                    var itemValue = String(item[Object.keys(item)[0]]);
                    return _this.checkedNodes.indexOf(itemValue) !== -1;
                });
                if (filteredChildItems.length > 0 && childItems.length && this.isFilter) {
                    childItems = filteredChildItems;
                }
                this.childStateChange(childItems, parentIndex, childElement, doCheck);
            }
        }
    };
    TreeView.prototype.checkDisabledState = function (resultId, currentItem) {
        var requiresUpdate = this.checkDisabledChildren;
        if (!requiresUpdate) {
            var shouldPreventUpdate = true;
            if (this.loadOnDemand && this.fields.htmlAttributes) {
                currentItem = isNullOrUndefined(currentItem) ? currentItem : this.getNodeObject(resultId);
                if (!isNullOrUndefined(currentItem)) {
                    var htmlAttributes = currentItem[this.fields.htmlAttributes];
                    if (htmlAttributes && !isNullOrUndefined(htmlAttributes.class) && htmlAttributes.class.indexOf(DISABLE) !== -1) {
                        shouldPreventUpdate = false;
                    }
                }
            }
            var liElement = select("[data-uid=\"" + resultId + "\"]", this.element);
            requiresUpdate = liElement ? !liElement.classList.contains(DISABLE)
                : (this.disableNode.indexOf(resultId) === -1 && shouldPreventUpdate);
        }
        if (requiresUpdate) {
            this.checkedNodes.push(resultId);
        }
    };
    TreeView.prototype.getChildItems = function (childItems, doCheck) {
        for (var i = 0; i < childItems.length; i++) {
            var childId = childItems[parseInt(i.toString(), 10)][this.fields.id]
                ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString()
                : null;
            var childIsCheck = childItems[parseInt(i.toString(), 10)][this.fields.isChecked]
                ? childItems[parseInt(i.toString(), 10)][this.fields.isChecked].toString()
                : null;
            if (this.checkedNodes.indexOf(childId) !== -1 && !doCheck) {
                this.checkedNodes.splice(this.checkedNodes.indexOf(childId), 1);
            }
            if (this.checkedNodes.indexOf(childId) === -1 && doCheck) {
                this.checkDisabledState(childId, childItems[i]);
            }
            if (childIsCheck === 'true' && !doCheck) {
                this.updateField(this.treeData, this.fields, childId, 'isChecked', null);
            }
            var subChildItems = this.getChildNodes(this.treeData, childId);
            if (subChildItems.length > 0) {
                this.getChildItems(subChildItems, doCheck);
            }
        }
    };
    /**
     * Update checkedNodes when UI interaction happens before the child node renders in DOM for hierarchical DS
     *
     * @param {Object[]} childItems - Array of child items
     * @param {string} parent - Parent identifier
     * @param {Element} childElement - Child DOM element
     * @param {boolean} [doCheck] - Optional parameter to specify whether to perform a check
     * @returns {void}
     */
    TreeView.prototype.childStateChange = function (childItems, parent, childElement, doCheck) {
        for (var i = 0; i < childItems.length; i++) {
            var checkedChild = childItems[parseInt(i.toString(), 10)][this.fields.id] ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString() : '';
            var isCheck = childItems[parseInt(i.toString(), 10)][this.fields.isChecked]
                ? childItems[parseInt(i.toString(), 10)][this.fields.isChecked].toString()
                : null;
            if (this.autoCheck) {
                if (this.checkedNodes.indexOf(parent) !== -1 && this.checkedNodes.indexOf(checkedChild) === -1) {
                    this.checkDisabledState(checkedChild, childItems[i]);
                    if (this.parentNodeCheck.indexOf(checkedChild) !== -1) {
                        this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(checkedChild), 1);
                    }
                }
                else if (this.checkedNodes.indexOf(parent) === -1 && this.checkedNodes.indexOf(checkedChild) !== -1 && !doCheck) {
                    this.checkedNodes.splice(this.checkedNodes.indexOf(checkedChild), 1);
                    if (isCheck === 'true') {
                        this.updateField(this.treeData, this.fields, checkedChild, 'isChecked', null);
                    }
                }
            }
            else if (!this.autoCheck) {
                if (!doCheck) {
                    if (this.checkedNodes.indexOf(checkedChild) !== -1) {
                        this.checkedNodes.splice(this.checkedNodes.indexOf(checkedChild), 1);
                    }
                    this.updateField(this.treeData, this.fields, checkedChild, 'isChecked', null);
                    this.checkedNodes = [];
                }
                else {
                    if (this.checkedNodes.indexOf(checkedChild) === -1) {
                        this.checkDisabledState(checkedChild, childItems[i]);
                    }
                }
            }
            var subChild = this.getChildNodes([childItems[parseInt(i.toString(), 10)]], checkedChild);
            if (subChild) {
                this.childStateChange(subChild, parent, childElement, doCheck);
            }
        }
    };
    //This method can be used to get all child nodes of a parent by passing the children of a parent along with 'validateCheck' set to false
    TreeView.prototype.allCheckNode = function (child, newCheck, checked, childCheck, validateCheck) {
        if (child) {
            for (var length_1 = 0; length_1 < child.length; length_1++) {
                var childId = getValue(this.fields.id, child[parseInt(length_1.toString(), 10)]);
                var check = this.element.querySelector('[data-uid="' + childId + '"]');
                //Validates isChecked case while no UI interaction has been performed on the node or it's parent
                if (validateCheck !== false && this.checkedElement.indexOf(childId.toString()) === -1) {
                    if (((check === null && !isNullOrUndefined(child[parseInt(length_1.toString(), 10)][this.fields.isChecked]) &&
                        newCheck.indexOf(childId.toString()) === -1)
                        || childCheck === 0 || checked === 2)) {
                        if (child[parseInt(length_1.toString(), 10)][this.fields.isChecked] !== false || checked === 2) {
                            newCheck.push(childId.toString());
                        }
                        else {
                            childCheck = null;
                        }
                        childCheck = (child[parseInt(length_1.toString(), 10)][this.fields.isChecked] !== false || checked === 2) ? 0 : null;
                    }
                }
                //Pushes child checked node done thro' UI interaction
                if (newCheck.indexOf(childId.toString()) === -1 && isNullOrUndefined(checked)) {
                    newCheck.push(childId.toString());
                }
                var hierChildId = getValue(this.fields.child.toString(), child[parseInt(length_1.toString(), 10)]);
                //Gets if any next level children are available for child nodes
                if (getValue(this.fields.hasChildren, child[parseInt(length_1.toString(), 10)]) === true || hierChildId) {
                    var id = getValue(this.fields.id, child[parseInt(length_1.toString(), 10)]);
                    var childId_1 = void 0;
                    if (this.dataType === 1) {
                        childId_1 = this.getChildNodes(this.treeData, id.toString());
                    }
                    else {
                        childId_1 = hierChildId;
                    }
                    if (childId_1) {
                        if (isNullOrUndefined(validateCheck)) {
                            this.allCheckNode(childId_1, newCheck, checked, childCheck);
                        }
                        else {
                            this.allCheckNode(childId_1, newCheck, checked, childCheck, validateCheck);
                        }
                        childCheck = null;
                    }
                }
                childCheck = null;
            }
        }
    };
    TreeView.prototype.openNode = function (toBeOpened, e) {
        var focusedNode = this.getFocusedNode();
        var icon = select('div.' + ICON, focusedNode);
        if (toBeOpened) {
            if (!icon) {
                return;
            }
            else if (icon.classList.contains(EXPANDABLE)) {
                this.expandAction(focusedNode, icon, e);
            }
            else {
                this.focusNextNode(focusedNode, true);
            }
        }
        else {
            if (icon && icon.classList.contains(COLLAPSIBLE)) {
                this.collapseNode(focusedNode, icon, e);
            }
            else {
                var parentLi = closest(closest(focusedNode, '.' + PARENTITEM), '.' + LISTITEM);
                if (!parentLi) {
                    return;
                }
                else {
                    if (!parentLi.classList.contains('e-disable')) {
                        this.setFocus(focusedNode, parentLi);
                        this.navigateToFocus(true);
                    }
                }
            }
        }
    };
    TreeView.prototype.navigateNode = function (isTowards) {
        var focusedNode = this.getFocusedNode();
        this.focusNextNode(focusedNode, isTowards);
    };
    TreeView.prototype.navigateRootNode = function (isBackwards) {
        var focusedNode = this.getFocusedNode();
        var rootNode = isBackwards ? this.getRootNode() : this.getEndNode();
        if (!rootNode.classList.contains('e-disable')) {
            this.setFocus(focusedNode, rootNode);
            this.navigateToFocus(isBackwards);
        }
    };
    TreeView.prototype.getFocusedNode = function () {
        var selectedItem;
        var fNode = select('.' + LISTITEM + '[tabindex="0"]', this.element);
        if (!isNullOrUndefined(fNode)) {
            var ariaChecked = fNode.getAttribute('aria-checked');
            if (ariaChecked === 'mixed' || ariaChecked === 'false') {
                this.isFilter = false;
            }
        }
        if (isNullOrUndefined(fNode)) {
            selectedItem = select('.' + LISTITEM, this.element);
        }
        return isNullOrUndefined(fNode) ? (isNullOrUndefined(selectedItem) ? this.element.firstElementChild : selectedItem) : fNode;
    };
    TreeView.prototype.focusNextNode = function (li, isTowards) {
        var nextNode = isTowards ? this.getNextNode(li) : this.getPrevNode(li);
        this.setFocus(li, nextNode);
        this.navigateToFocus(!isTowards);
        if (nextNode.classList.contains('e-disable')) {
            var lastChild = nextNode.lastChild;
            if (nextNode.previousSibling == null && nextNode.classList.contains('e-level-1')) {
                this.focusNextNode(nextNode, true);
            }
            else if (nextNode.nextSibling == null && nextNode.classList.contains('e-node-collapsed')) {
                this.focusNextNode(nextNode, false);
            }
            else if (nextNode.nextSibling == null && lastChild.classList.contains(TEXTWRAP)) {
                this.focusNextNode(nextNode, false);
            }
            else {
                this.focusNextNode(nextNode, isTowards);
            }
        }
    };
    TreeView.prototype.getNextNode = function (li) {
        var index = this.liList.indexOf(li);
        var nextNode;
        do {
            index++;
            nextNode = this.liList[parseInt(index.toString(), 10)];
            if (isNullOrUndefined(nextNode)) {
                return li;
            }
        } while (!isVisible(nextNode));
        return nextNode;
    };
    TreeView.prototype.getPrevNode = function (li) {
        var index = this.liList.indexOf(li);
        var prevNode;
        do {
            index--;
            prevNode = this.liList[parseInt(index.toString(), 10)];
            if (isNullOrUndefined(prevNode)) {
                return li;
            }
        } while (!isVisible(prevNode));
        return prevNode;
    };
    TreeView.prototype.getRootNode = function () {
        var index = 0;
        var rootNode;
        do {
            rootNode = this.liList[parseInt(index.toString(), 10)];
            index++;
        } while (!isVisible(rootNode));
        return rootNode;
    };
    TreeView.prototype.getEndNode = function () {
        var index = this.liList.length - 1;
        var endNode;
        do {
            endNode = this.liList[parseInt(index.toString(), 10)];
            index--;
        } while (!isVisible(endNode));
        return endNode;
    };
    TreeView.prototype.setFocus = function (preNode, nextNode) {
        removeClass([preNode], FOCUS);
        preNode.setAttribute('tabindex', '-1');
        if (!nextNode.classList.contains('e-disable')) {
            addClass([nextNode], FOCUS);
            nextNode.setAttribute('tabindex', '0');
            nextNode.focus();
            EventHandler.add(nextNode, 'blur', this.focusOut, this);
            this.updateIdAttr(preNode, nextNode);
        }
    };
    TreeView.prototype.updateIdAttr = function (preNode, nextNode) {
        this.element.removeAttribute('aria-activedescendant');
        if (preNode) {
            preNode.removeAttribute('id');
        }
        nextNode.setAttribute('id', this.element.id + '_active');
        this.element.setAttribute('aria-activedescendant', this.element.id + '_active');
    };
    TreeView.prototype.focusIn = function () {
        if (!this.mouseDownStatus) {
            var focusedElement = this.getFocusedNode();
            if (focusedElement.classList.contains('e-disable')) {
                focusedElement.setAttribute('tabindex', '-1');
                this.navigateNode(true);
            }
            else {
                focusedElement.setAttribute('tabindex', '0');
                addClass([focusedElement], FOCUS);
                EventHandler.add(focusedElement, 'blur', this.focusOut, this);
            }
            this.mouseDownStatus = false;
        }
    };
    TreeView.prototype.focusOut = function (event) {
        var focusedElement = this.getFocusedNode();
        if (event.target === focusedElement) {
            removeClass([focusedElement], FOCUS);
            EventHandler.remove(focusedElement, 'blur', this.focusOut);
        }
    };
    TreeView.prototype.onMouseOver = function (e) {
        if (Browser.isDevice) {
            return;
        }
        var target = e.target;
        var classList = target.classList;
        var currentLi = closest(target, '.' + LISTITEM);
        if (!currentLi || classList.contains(PARENTITEM) || classList.contains(LISTITEM)) {
            this.removeHover();
            return;
        }
        else {
            if (currentLi && !currentLi.classList.contains('e-disable')) {
                this.setHover(currentLi);
            }
        }
    };
    TreeView.prototype.setHover = function (li) {
        if (!li.classList.contains(HOVER) && !li.classList.contains(PREVENTSELECT)) {
            this.removeHover();
            addClass([li], HOVER);
        }
    };
    TreeView.prototype.onMouseLeave = function () {
        this.removeHover();
    };
    TreeView.prototype.removeHover = function () {
        var hoveredNode = selectAll('.' + HOVER, this.element);
        if (hoveredNode && hoveredNode.length) {
            removeClass(hoveredNode, HOVER);
        }
    };
    TreeView.prototype.getNodeData = function (currLi, fromDS) {
        if (!isNullOrUndefined(currLi) && currLi.classList.contains(LISTITEM) &&
            !isNullOrUndefined(closest(currLi, '.' + CONTROL)) && closest(currLi, '.' + CONTROL).classList.contains(ROOT)) {
            var id = currLi.getAttribute('data-uid');
            var text = this.getText(currLi, fromDS);
            var pNode = closest(currLi.parentNode, '.' + LISTITEM);
            var pid = pNode ? pNode.getAttribute('data-uid') : null;
            var selected = currLi.classList.contains(ACTIVE);
            var selectable = currLi.classList.contains(PREVENTSELECT) ? false : true;
            var expanded = (currLi.getAttribute('aria-expanded') === 'true') ? true : false;
            var hasChildren = currLi.getAttribute('aria-expanded') !== null ? true : (select('.' + EXPANDABLE, currLi) || select('.' + COLLAPSIBLE, currLi)) != null ? true : false;
            var checked = null;
            var checkboxElement = select('.' + CHECKBOXWRAP, currLi);
            if (this.showCheckBox && checkboxElement) {
                checked = currLi.getAttribute('aria-checked');
            }
            return {
                id: id, text: text, parentID: pid, selected: selected, selectable: selectable, expanded: expanded,
                isChecked: checked, hasChildren: hasChildren
            };
        }
        return { id: '', text: '', parentID: '', selected: false, expanded: false, isChecked: '', hasChildren: false };
    };
    TreeView.prototype.getText = function (currLi, fromDS) {
        if (fromDS) {
            var nodeData = this.getNodeObject(currLi.getAttribute('data-uid'));
            var level = parseFloat(currLi.getAttribute('aria-level'));
            var nodeFields = this.getFields(this.fields, level, 1);
            return getValue(nodeFields.text, nodeData);
        }
        return select('.' + LISTTEXT, currLi).textContent;
    };
    TreeView.prototype.getExpandEvent = function (currLi, e) {
        var nodeData = this.getNodeData(currLi);
        return { cancel: false, isInteracted: isNullOrUndefined(e) ? false : true, node: currLi, nodeData: nodeData, event: e };
    };
    TreeView.prototype.renderNodeTemplate = function (data, textEle, dataId) {
        var tempArr = this.nodeTemplateFn(data, this, 'nodeTemplate' + dataId, this.element.id + 'nodeTemplate', this.isStringTemplate, undefined, textEle, this.root);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, textEle);
        }
    };
    TreeView.prototype.destroyTemplate = function (liEle) {
        this.clearTemplate(['nodeTemplate' + liEle.getAttribute('data-uid')]);
    };
    TreeView.prototype.reRenderNodes = function () {
        this.updateListProp(this.fields);
        if (Browser.isIE) {
            this.ulElement = this.element.querySelector('.e-list-parent.e-ul');
            this.ulElement.parentElement.removeChild(this.ulElement);
        }
        else {
            this.element.innerHTML = '';
        }
        if (!isNullOrUndefined(this.nodeTemplateFn)) {
            this.clearTemplate();
        }
        this.setTouchClass();
        this.setProperties({ selectedNodes: [], checkedNodes: [], expandedNodes: [] }, true);
        this.checkedElement = [];
        this.isLoaded = false;
        this.setDataBinding(true);
    };
    TreeView.prototype.setCssClass = function (oldClass, newClass) {
        if (!isNullOrUndefined(oldClass) && oldClass !== '') {
            removeClass([this.element], oldClass.split(' '));
        }
        if (!isNullOrUndefined(newClass) && newClass !== '') {
            addClass([this.element], newClass.split(' '));
        }
    };
    TreeView.prototype.editingHandler = function (e) {
        var target = e.target;
        if (!target || target.classList.contains(ROOT) || target.classList.contains(PARENTITEM) ||
            target.classList.contains(LISTITEM) || target.classList.contains(ICON) ||
            target.classList.contains(INPUT) || target.classList.contains(INPUTGROUP)) {
            return;
        }
        else {
            var liEle = closest(target, '.' + LISTITEM);
            this.createTextbox(liEle);
        }
    };
    TreeView.prototype.createTextbox = function (liEle) {
        var _this = this;
        var oldInpEle = select('.' + TREEINPUT, this.element);
        if (oldInpEle) {
            oldInpEle.blur();
        }
        var textEle = select('.' + LISTTEXT, liEle);
        this.updateOldText(liEle);
        var innerEle = this.createElement('input', { className: TREEINPUT, attrs: { value: this.oldText } });
        var eventArgs = this.getEditEvent(liEle, null, innerEle.outerHTML);
        this.trigger('nodeEditing', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                var inpWidth = textEle.offsetWidth + 5;
                var widthSize_1 = inpWidth + 'px';
                addClass([liEle], EDITING);
                if (!isNullOrUndefined(_this.nodeTemplateFn)) {
                    _this.destroyTemplate(liEle);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (_this.isReact) {
                    setTimeout(function () {
                        _this.renderTextBox(eventArgs, textEle, widthSize_1);
                    }, 5);
                }
                else {
                    _this.renderTextBox(eventArgs, textEle, widthSize_1);
                }
            }
        });
    };
    TreeView.prototype.renderTextBox = function (eventArgs, textEle, widthSize) {
        textEle.innerHTML = eventArgs.innerHtml;
        var inpEle = select('.' + TREEINPUT, textEle);
        this.inputObj = Input.createInput({
            element: inpEle,
            properties: {
                enableRtl: this.enableRtl
            }
        }, this.createElement);
        this.inputObj.container.style.width = widthSize;
        inpEle.focus();
        var inputEle = inpEle;
        inputEle.setSelectionRange(0, inputEle.value.length);
        this.wireInputEvents(inpEle);
    };
    TreeView.prototype.updateOldText = function (liEle) {
        var id = liEle.getAttribute('data-uid');
        this.editData = this.getNodeObject(id);
        var level = parseFloat(liEle.getAttribute('aria-level'));
        this.editFields = this.getFields(this.fields, level, 1);
        this.oldText = getValue(this.editFields.text, this.editData);
    };
    TreeView.prototype.inputFocusOut = function (e) {
        if (!select('.' + TREEINPUT, this.element)) {
            return;
        }
        var target = e.target;
        var newText = target.value;
        var txtEle = closest(target, '.' + LISTTEXT);
        var liEle = closest(target, '.' + LISTITEM);
        detach(this.inputObj.container);
        Input.destroy({ element: target, properties: this.properties });
        if (this.fields.dataSource instanceof DataManager && !this.isOffline) {
            this.crudOperation('update', null, liEle, newText, null, null, true);
        }
        else {
            this.appendNewText(liEle, txtEle, newText, true);
        }
        EventHandler.remove(target, 'blur', this.inputFocusOut);
        this.inputObj = null;
        detach(target);
        target = null;
    };
    TreeView.prototype.appendNewText = function (liEle, txtEle, newText, isInput) {
        var _this = this;
        var eventArgs = this.getEditEvent(liEle, newText, null);
        this.trigger('nodeEdited', eventArgs, function (observedArgs) {
            newText = observedArgs.cancel ? observedArgs.oldText : observedArgs.newText;
            _this.updateText(liEle, txtEle, newText, isInput);
            if (observedArgs.oldText !== newText) {
                _this.triggerEvent('nodeEdited', [_this.getNode(liEle)]);
            }
        });
    };
    TreeView.prototype.updateText = function (liEle, txtEle, newText, isInput) {
        var newData = setValue(this.editFields.text, newText, this.editData);
        if (!isNullOrUndefined(this.nodeTemplateFn)) {
            txtEle.innerText = '';
            var dataId = liEle.getAttribute('data-uid');
            this.renderNodeTemplate(newData, txtEle, dataId);
            this.renderReactTemplates();
        }
        else {
            if (this.enableHtmlSanitizer) {
                txtEle.innerText = SanitizeHtmlHelper.sanitize(newText);
            }
            else {
                txtEle.innerHTML = newText;
            }
        }
        if (isInput) {
            removeClass([liEle], EDITING);
            liEle.focus();
            EventHandler.add(liEle, 'blur', this.focusOut, this);
            addClass([liEle], FOCUS);
        }
        if (this.allowTextWrap) {
            this.calculateWrap(liEle);
        }
    };
    TreeView.prototype.getElement = function (ele) {
        if (isNullOrUndefined(ele)) {
            return null;
        }
        else if (typeof ele === 'string') {
            return this.element.querySelector('[data-uid="' + ele + '"]');
        }
        else if (typeof ele === 'object') {
            return getElement(ele);
        }
        else {
            return null;
        }
    };
    TreeView.prototype.getId = function (ele) {
        if (isNullOrUndefined(ele)) {
            return null;
        }
        else if (typeof ele === 'string') {
            return ele;
        }
        else if (typeof ele === 'object') {
            return (getElement(ele)).getAttribute('data-uid');
        }
        else {
            return null;
        }
    };
    TreeView.prototype.getEditEvent = function (liEle, newText, inpEle) {
        var data = this.getNodeData(liEle);
        return { cancel: false, newText: newText, node: liEle, nodeData: data, oldText: this.oldText, innerHtml: inpEle };
    };
    TreeView.prototype.getNodeObject = function (id) {
        var childNodes;
        if (isNullOrUndefined(id)) {
            return childNodes;
        }
        else if (this.dataType === 1) {
            for (var i = 0, objlen = this.treeData.length; i < objlen; i++) {
                var dataId = getValue(this.fields.id, this.treeData[parseInt(i.toString(), 10)]);
                if (!isNullOrUndefined(this.treeData[parseInt(i.toString(), 10)]) && !isNullOrUndefined(dataId) && dataId.toString() === id) {
                    return this.treeData[parseInt(i.toString(), 10)];
                }
            }
        }
        else {
            return this.getChildNodeObject(this.treeData, this.fields, id);
        }
        return childNodes;
    };
    TreeView.prototype.getChildNodeObject = function (obj, mapper, id) {
        var newList;
        if (isNullOrUndefined(obj)) {
            return newList;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var dataId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && dataId && dataId.toString() === id) {
                return obj[parseInt(i.toString(), 10)];
            }
            else if (typeof mapper.child === 'string' && !isNullOrUndefined(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var childData = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                newList = this.getChildNodeObject(childData, this.getChildMapper(mapper), id);
                if (newList !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var child = 'child';
                newList = this.getChildNodeObject(getValue(child, obj[parseInt(i.toString(), 10)]), this.getChildMapper(mapper), id);
                if (newList !== undefined) {
                    break;
                }
            }
            else if (this.isChildObject()) {
                var children = 'child';
                var childData = getValue(children, obj[parseInt(i.toString(), 10)]);
                newList = this.getChildNodeObject(childData, this.getChildMapper(mapper), id);
                if (newList !== undefined) {
                    break;
                }
            }
        }
        return newList;
    };
    TreeView.prototype.setDragAndDrop = function (toBind) {
        if (toBind && !this.disabled) {
            this.initializeDrag();
        }
        else {
            this.destroyDrag();
        }
    };
    TreeView.prototype.initializeDrag = function () {
        var _this = this;
        var virtualEle;
        this.dragObj = new Draggable(this.element, {
            enableTailMode: true, enableAutoScroll: true,
            dragArea: this.dragArea,
            dragTarget: '.' + TEXTWRAP,
            enableTapHold: true,
            tapHoldThreshold: 100,
            helper: function (e) {
                _this.dragTarget = e.sender.target;
                var dragRoot = closest(_this.dragTarget, '.' + ROOT);
                var dragWrap = closest(_this.dragTarget, '.' + TEXTWRAP);
                _this.dragLi = closest(_this.dragTarget, '.' + LISTITEM);
                if (_this.fullRowSelect && !dragWrap && _this.dragTarget.classList.contains(FULLROW)) {
                    dragWrap = _this.dragTarget.nextElementSibling;
                }
                if (!_this.dragTarget || !e.element.isSameNode(dragRoot) || !dragWrap ||
                    _this.dragTarget.classList.contains(ROOT) || _this.dragTarget.classList.contains(PARENTITEM) ||
                    _this.dragTarget.classList.contains(LISTITEM) || _this.dragLi.classList.contains('e-disable')) {
                    return false;
                }
                var cloneEle = (dragWrap.cloneNode(true));
                if (isNullOrUndefined(select('div.' + ICON, cloneEle))) {
                    var icon = _this.createElement('div', { className: ICON + ' ' + EXPANDABLE });
                    cloneEle.insertBefore(icon, cloneEle.children[0]);
                }
                var cssClass = DRAGITEM + ' ' + ROOT + ' ' + _this.cssClass + ' ' + (_this.enableRtl ? RTL$1 : '');
                virtualEle = _this.createElement('div', { className: cssClass });
                virtualEle.appendChild(cloneEle);
                var nLen = _this.selectedNodes.length;
                if (nLen > 1 && _this.allowMultiSelection && _this.dragLi.classList.contains(ACTIVE)) {
                    var cNode = _this.createElement('span', { className: DROPCOUNT, innerHTML: '' + nLen });
                    virtualEle.appendChild(cNode);
                }
                document.body.appendChild(virtualEle);
                document.body.style.cursor = '';
                _this.dragData = _this.getNodeData(_this.dragLi);
                return virtualEle;
            },
            dragStart: function (e) {
                addClass([_this.element], DRAGGING);
                var listItem = closest(e.target, '.e-list-item');
                var level;
                if (listItem) {
                    level = parseInt(listItem.getAttribute('aria-level'), 10);
                }
                var eventArgs = _this.getDragEvent(e.event, _this, null, e.target, null, virtualEle, level);
                if (eventArgs.draggedNode.classList.contains(EDITING)) {
                    _this.dragObj.intDestroy(e.event);
                    _this.dragCancelAction(virtualEle);
                }
                else {
                    _this.trigger('nodeDragStart', eventArgs, function (observedArgs) {
                        if (observedArgs.cancel) {
                            _this.dragObj.intDestroy(e.event);
                            _this.dragCancelAction(virtualEle);
                        }
                        else {
                            _this.dragStartAction = true;
                        }
                    });
                }
            },
            drag: function (e) {
                _this.dragObj.setProperties({ cursorAt: { top: (!isNullOrUndefined(e.event.targetTouches) || Browser.isDevice) ? 60 : -20 } });
                _this.dragAction(e, virtualEle);
            },
            dragStop: function (e) {
                removeClass([_this.element], DRAGGING);
                if (!e.target.classList.contains('e-sibling')) {
                    _this.removeVirtualEle();
                }
                var dropTarget = e.target;
                var preventTargetExpand = false;
                var dropRoot = (closest(dropTarget, '.' + DROPPABLE));
                if (!dropTarget || !dropRoot) {
                    detach(e.helper);
                    document.body.style.cursor = '';
                }
                var listItem = closest(dropTarget, '.e-list-item');
                var level;
                if (listItem) {
                    level = parseInt(listItem.getAttribute('aria-level'), 10);
                }
                var eventArgs = _this.getDragEvent(e.event, _this, dropTarget, dropTarget, null, e.helper, level);
                eventArgs.preventTargetExpand = preventTargetExpand;
                _this.trigger('nodeDragStop', eventArgs, function (observedArgs) {
                    _this.dragParent = observedArgs.draggedParentNode;
                    _this.preventExpand = observedArgs.preventTargetExpand;
                    if (observedArgs.cancel) {
                        if (e.helper.parentNode) {
                            detach(e.helper);
                        }
                        document.body.style.cursor = '';
                        if (dropTarget.classList.contains('e-sibling')) {
                            _this.removeVirtualEle();
                        }
                    }
                    _this.dragStartAction = false;
                });
            }
        });
        this.dropObj = new Droppable(this.element, {
            out: function (e) {
                if (!isNullOrUndefined(e) && !e.target.classList.contains(SIBLING) &&
                    (_this.dropObj.dragData.default && _this.dropObj.dragData.default.helper.classList.contains(ROOT))) {
                    document.body.style.cursor = 'not-allowed';
                }
            },
            over: function () {
                document.body.style.cursor = '';
            },
            drop: function (e) {
                _this.dropAction(e);
                _this.removeVirtualEle();
            }
        });
    };
    TreeView.prototype.dragCancelAction = function (virtualEle) {
        detach(virtualEle);
        removeClass([this.element], DRAGGING);
        this.dragStartAction = false;
    };
    TreeView.prototype.getOffsetX = function (event, target) {
        var touchList = event.changedTouches;
        if (touchList && touchList.length > 0) {
            return touchList[0].clientX - target.getBoundingClientRect().left;
        }
        else {
            return event.offsetX;
        }
    };
    TreeView.prototype.getOffsetY = function (event, target) {
        var touchList = event.changedTouches;
        if (touchList && touchList.length > 0) {
            return touchList[0].clientY - target.getBoundingClientRect().top;
        }
        else {
            return event.offsetY;
        }
    };
    TreeView.prototype.dragAction = function (e, virtualEle) {
        var dropRoot = closest(e.target, '.' + DROPPABLE);
        var dropWrap = closest(e.target, '.' + TEXTWRAP);
        var icon = select('div.' + ICON, virtualEle);
        removeClass([icon], [DROPIN, DROPNEXT, DROPOUT, NODROP]);
        this.isDropIn = false;
        this.removeVirtualEle();
        document.body.style.cursor = '';
        var classList = e.target.classList;
        var event = e.event;
        var offsetY = this.getOffsetY(event, e.target);
        var offsetX = this.getOffsetX(event, e.target);
        if (this.fullRowSelect && !dropWrap && !isNullOrUndefined(classList) && classList.contains(FULLROW)) {
            dropWrap = e.target.nextElementSibling;
        }
        if (dropRoot) {
            var dropLi = closest(e.target, '.' + LISTITEM);
            var checkWrapper = closest(e.target, '.' + CHECKBOXWRAP);
            var collapse = closest(e.target, '.' + COLLAPSIBLE);
            var expand = closest(e.target, '.' + EXPANDABLE);
            if (!dropRoot.classList.contains(ROOT) || (dropWrap &&
                (!dropLi.isSameNode(this.dragLi) && !this.isDescendant(this.dragLi, dropLi)))) {
                if (this.hasTemplate && dropLi) {
                    var templateTarget = select(this.fullRowSelect ? '.' + FULLROW : '.' + TEXTWRAP, dropLi);
                    if ((e && (!expand && !collapse) && offsetY < 7 && !checkWrapper) ||
                        (((expand && offsetY < 5) || (collapse && offsetX < 3)))) {
                        var index = this.fullRowSelect ? (1) : (0);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else if ((e && (!expand && !collapse) &&
                        !checkWrapper && templateTarget && offsetY > templateTarget.offsetHeight - 10) ||
                        ((expand && offsetY > 19) || (collapse && offsetX > 19))) {
                        var index = this.fullRowSelect ? (2) : (1);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else {
                        addClass([icon], DROPIN);
                        this.isDropIn = true;
                    }
                }
                else {
                    if ((dropLi && e && (!expand && !collapse) && (offsetY < 7) && !checkWrapper) ||
                        (((expand && offsetY < 5) || (collapse && offsetX < 3)))) {
                        var index = this.fullRowSelect ? (1) : (0);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else if ((dropLi && e && (!expand && !collapse) &&
                        (e.target.offsetHeight > 0 && offsetY > (e.target.offsetHeight - 10)) && !checkWrapper) ||
                        (((expand && offsetY > 19) || (collapse && offsetX > 19)))) {
                        var index = this.fullRowSelect ? (2) : (1);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else {
                        addClass([icon], DROPIN);
                        this.isDropIn = true;
                    }
                }
            }
            else if (e.target.nodeName === 'LI' && (!dropLi.isSameNode(this.dragLi) && !this.isDescendant(this.dragLi, dropLi))) {
                addClass([icon], DROPNEXT);
                this.renderVirtualEle(e);
            }
            else if (e.target.classList.contains(SIBLING)) {
                addClass([icon], DROPNEXT);
            }
            else {
                addClass([icon], DROPOUT);
            }
        }
        else {
            addClass([icon], NODROP);
            document.body.style.cursor = 'not-allowed';
        }
        var listItem = closest(e.target, '.e-list-item');
        var level;
        if (listItem) {
            level = parseInt(listItem.getAttribute('aria-level'), 10);
        }
        var eventArgs = this.getDragEvent(e.event, this, e.target, e.target, null, virtualEle, level);
        if (eventArgs.dropIndicator) {
            removeClass([icon], eventArgs.dropIndicator);
        }
        this.trigger('nodeDragging', eventArgs);
        if (eventArgs.dropIndicator) {
            addClass([icon], eventArgs.dropIndicator);
        }
    };
    TreeView.prototype.appendIndicator = function (dropLi, icon, index) {
        addClass([icon], DROPNEXT);
        var virEle = this.createElement('div', { className: SIBLING });
        dropLi.insertBefore(virEle, dropLi.children[parseInt(index.toString(), 10)]);
    };
    TreeView.prototype.dropAction = function (e) {
        var event = e.event;
        var offsetY = this.getOffsetY(event, e.target);
        var dropTarget = e.target;
        var dragObj;
        var level;
        var drop = false;
        var nodeData = [];
        var liArray = [];
        var dragInstance = e.dragData.draggable;
        for (var i = 0; i < dragInstance.ej2_instances.length; i++) {
            if (dragInstance.ej2_instances[parseInt(i.toString(), 10)] instanceof TreeView_1) {
                dragObj = dragInstance.ej2_instances[parseInt(i.toString(), 10)];
                break;
            }
        }
        if (dragObj && dragObj.dragTarget) {
            var dragTarget = dragObj.dragTarget;
            var dragLi = (closest(dragTarget, '.' + LISTITEM));
            var dropLi = (closest(dropTarget, '.' + LISTITEM));
            liArray.push(dragLi);
            if (dropLi == null && dropTarget.classList.contains(ROOT)) {
                dropLi = dropTarget.firstElementChild;
            }
            detach(e.droppedElement);
            document.body.style.cursor = '';
            if (!dropLi || dropLi.isSameNode(dragLi) || this.isDescendant(dragLi, dropLi)) {
                if (this.fields.dataSource instanceof DataManager === false) {
                    this.preventExpand = false;
                }
                return;
            }
            if (dragObj.allowMultiSelection && dragLi.classList.contains(ACTIVE)) {
                var sNodes = selectAll('.' + ACTIVE, dragObj.element);
                liArray = sNodes;
                if (e.target.offsetHeight <= 33 && offsetY > e.target.offsetHeight - 10 && offsetY > 6) {
                    for (var i = sNodes.length - 1; i >= 0; i--) {
                        if (dropLi.isSameNode(sNodes[parseInt(i.toString(), 10)]) ||
                            this.isDescendant(sNodes[parseInt(i.toString(), 10)], dropLi)) {
                            continue;
                        }
                        this.appendNode(dropTarget, sNodes[parseInt(i.toString(), 10)], dropLi, e, dragObj, offsetY);
                    }
                }
                else {
                    for (var i = 0; i < sNodes.length; i++) {
                        if (dropLi.isSameNode(sNodes[parseInt(i.toString(), 10)]) ||
                            this.isDescendant(sNodes[parseInt(i.toString(), 10)], dropLi)) {
                            continue;
                        }
                        this.appendNode(dropTarget, sNodes[parseInt(i.toString(), 10)], dropLi, e, dragObj, offsetY);
                    }
                }
            }
            else {
                this.appendNode(dropTarget, dragLi, dropLi, e, dragObj, offsetY);
            }
            level = parseInt(dragLi.getAttribute('aria-level'), 10);
            drop = true;
        }
        if (this.fields.dataSource instanceof DataManager === false) {
            this.preventExpand = false;
        }
        for (var i = 0; i < liArray.length; i++) {
            nodeData.push(this.getNode(liArray[parseInt(i.toString(), 10)]));
        }
        this.trigger('nodeDropped', this.getDragEvent(e.event, dragObj, dropTarget, e.target, e.dragData.draggedElement, null, level, drop));
        if (dragObj.element.id !== this.element.id) {
            dragObj.triggerEvent('nodeDropped', nodeData);
            this.isNodeDropped = true;
            this.fields.dataSource = this.treeData;
        }
        this.triggerEvent('nodeDropped', nodeData);
    };
    TreeView.prototype.appendNode = function (dropTarget, dragLi, dropLi, e, dragObj, offsetY) {
        var checkWrapper = closest(dropTarget, '.' + CHECKBOXWRAP);
        var collapse = closest(e.target, '.' + COLLAPSIBLE);
        var expand = closest(e.target, '.' + EXPANDABLE);
        if (!dragLi.classList.contains('e-disable') && !checkWrapper && ((expand && e.event.offsetY < 5) || (collapse && e.event.offsetX < 3) || (expand && e.event.offsetY > 19) || (collapse && e.event.offsetX > 19) || (!expand && !collapse))) {
            if (dropTarget.nodeName === 'LI') {
                this.dropAsSiblingNode(dragLi, dropLi, e, dragObj);
            }
            else if (dropTarget.firstElementChild && dropTarget.classList.contains(ROOT)) {
                if (dropTarget.firstElementChild.nodeName === 'UL') {
                    this.dropAsSiblingNode(dragLi, dropLi, e, dragObj);
                }
            }
            else if ((dropTarget.classList.contains('e-icon-collapsible')) || (dropTarget.classList.contains('e-icon-expandable'))) {
                this.dropAsSiblingNode(dragLi, dropLi, e, dragObj);
            }
            else {
                this.dropAsChildNode(dragLi, dropLi, dragObj, null, e, offsetY, null, dropTarget);
            }
        }
        else {
            this.dropAsChildNode(dragLi, dropLi, dragObj, null, e, offsetY, true, dropTarget);
        }
        if (this.showCheckBox) {
            this.ensureIndeterminate();
        }
    };
    TreeView.prototype.dropAsSiblingNode = function (dragLi, dropLi, e, dragObj) {
        var dropUl = closest(dropLi, '.' + PARENTITEM);
        var dragParentUl = closest(dragLi, '.' + PARENTITEM);
        var dragParentLi = closest(dragParentUl, '.' + LISTITEM);
        var pre;
        if (e.target.offsetHeight > 0 && e.event.offsetY > e.target.offsetHeight - 2) {
            pre = false;
        }
        else if (e.event.offsetY < 2) {
            pre = true;
        }
        else if (e.target.classList.contains('e-icon-expandable') || (e.target.classList.contains('e-icon-collapsible'))) {
            if ((e.event.offsetY < 5) || (e.event.offsetX < 3)) {
                pre = true;
            }
            else if ((e.event.offsetY > 15) || (e.event.offsetX > 17)) {
                pre = false;
            }
        }
        if ((e.target.classList.contains('e-icon-expandable')) || (e.target.classList.contains('e-icon-collapsible'))) {
            var target = e.target.closest('li');
            dropUl.insertBefore(dragLi, pre ? target : target.nextElementSibling);
        }
        else {
            dropUl.insertBefore(dragLi, pre ? e.target : e.target.nextElementSibling);
        }
        this.moveData(dragLi, dropLi, dropUl, pre, dragObj);
        this.updateElement(dragParentUl, dragParentLi);
        this.updateAriaLevel(dragLi);
        if (dragObj.element.id === this.element.id) {
            this.updateList();
        }
        else {
            dragObj.updateInstance();
            this.updateInstance();
        }
    };
    TreeView.prototype.dropAsChildNode = function (dragLi, dropLi, dragObj, index, e, pos, isCheck, dropTarget) {
        var dragParentUl = closest(dragLi, '.' + PARENTITEM);
        var dragParentLi = closest(dragParentUl, '.' + LISTITEM);
        var dropParentUl = closest(dropLi, '.' + PARENTITEM);
        var templateTarget;
        if (e && e.target) {
            templateTarget = select(this.fullRowSelect ? '.' + FULLROW : '.' + TEXTWRAP, dropLi);
        }
        if (e && ((pos < 7 && !dropTarget.classList.contains('e-sibling')) || (dropTarget.classList.contains('e-sibling') && !dropLi.lastChild.classList.contains('e-sibling'))) && !isCheck) {
            dropParentUl.insertBefore(dragLi, dropLi);
            this.moveData(dragLi, dropLi, dropParentUl, true, dragObj);
        }
        else if (e && (e.target.offsetHeight > 0 && pos > (e.target.offsetHeight - 10)) && !isCheck && !this.hasTemplate) {
            dropParentUl.insertBefore(dragLi, dropLi.nextElementSibling);
            this.moveData(dragLi, dropLi, dropParentUl, false, dragObj);
        }
        else if (this.hasTemplate && templateTarget && pos > templateTarget.offsetHeight - 10 && !isCheck) {
            dropParentUl.insertBefore(dragLi, dropLi.nextElementSibling);
            this.moveData(dragLi, dropLi, dropParentUl, false, dragObj);
        }
        else {
            var dropUl = this.expandParent(dropLi);
            var childLi = !isNullOrUndefined(index) ? dropUl.childNodes[parseInt(index.toString(), 10)] : null;
            dropUl.insertBefore(dragLi, childLi);
            this.moveData(dragLi, childLi, dropUl, true, dragObj);
        }
        this.updateElement(dragParentUl, dragParentLi);
        this.updateAriaLevel(dragLi);
        if (dragObj.element.id === this.element.id) {
            this.updateList();
        }
        else {
            dragObj.updateInstance();
            this.updateInstance();
        }
    };
    TreeView.prototype.moveData = function (dragLi, dropLi, dropUl, pre, dragObj) {
        var dropParentLi = closest(dropUl, '.' + LISTITEM);
        var id = this.getId(dragLi);
        var removedData = dragObj.updateChildField(dragObj.treeData, dragObj.fields, id, null, null, true);
        var refId = this.getId(dropLi);
        var index = this.getDataPos(this.treeData, this.fields, refId);
        var parentId = this.getId(dropParentLi);
        if (this.dataType === 1) {
            this.updateField(this.treeData, this.fields, parentId, 'hasChildren', true);
            var pos = isNullOrUndefined(index) ? this.treeData.length : (pre ? index : index + 1);
            if (isNullOrUndefined(parentId) && !this.hasPid) {
                delete removedData[0][this.fields.parentID];
            }
            else {
                var currPid = this.isNumberTypeId ? parseFloat(parentId) : parentId;
                setValue(this.fields.parentID, currPid, removedData[0]);
            }
            this.treeData.splice(pos, 0, removedData[0]);
            if (dragObj.element.id !== this.element.id) {
                var childData = dragObj.removeChildNodes(id);
                pos++;
                for (var i = 0, len = childData.length; i < len; i++) {
                    this.treeData.splice(pos, 0, childData[parseInt(i.toString(), 10)]);
                    pos++;
                }
                dragObj.groupedData = dragObj.getGroupedData(dragObj.treeData, dragObj.fields.parentID);
            }
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        else {
            this.addChildData(this.treeData, this.fields, parentId, removedData, pre ? index : index + 1);
        }
    };
    TreeView.prototype.expandParent = function (dropLi) {
        var dropIcon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, dropLi);
        if (dropIcon && dropIcon.classList.contains(EXPANDABLE) && this.preventExpand !== true) {
            this.expandAction(dropLi, dropIcon, null);
        }
        var dropUl = select('.' + PARENTITEM, dropLi);
        if (this.preventExpand === true && !dropUl && dropIcon) {
            this.renderChildNodes(dropLi);
        }
        dropUl = select('.' + PARENTITEM, dropLi);
        if (!isNullOrUndefined(dropUl) && (this.preventExpand && !(dropLi.getAttribute('aria-expanded') === 'true'))) {
            dropUl.style.display = 'none';
        }
        if (!isNullOrUndefined(dropUl) && this.preventExpand === false) {
            dropUl.style.display = 'block';
        }
        if (isNullOrUndefined(dropUl) && this.preventExpand === true) {
            if (isNullOrUndefined(dropIcon)) {
                ListBase.generateIcon(this.createElement, dropLi, EXPANDABLE, this.listBaseOption);
            }
            var icon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, dropLi);
            if (icon) {
                icon.classList.add('e-icon-expandable');
            }
            dropUl = ListBase.generateUL(this.createElement, [], null, this.listBaseOption);
            dropLi.appendChild(dropUl);
            if (icon) {
                removeClass([icon], COLLAPSIBLE);
            }
            else {
                ListBase.generateIcon(this.createElement, dropLi, EXPANDABLE, this.listBaseOption);
            }
            dropLi.setAttribute('aria-expanded', 'false');
            dropUl.style.display = 'none';
        }
        if (isNullOrUndefined(dropUl)) {
            var args = this.expandArgs;
            if (isNullOrUndefined(args) || (args && args.name !== 'nodeExpanding')) {
                this.trigger('nodeExpanding', this.getExpandEvent(dropLi, null));
            }
            if (isNullOrUndefined(dropIcon)) {
                ListBase.generateIcon(this.createElement, dropLi, COLLAPSIBLE, this.listBaseOption);
            }
            var icon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, dropLi);
            if (icon) {
                removeClass([icon], EXPANDABLE);
            }
            else {
                ListBase.generateIcon(this.createElement, dropLi, COLLAPSIBLE, this.listBaseOption);
                icon = select('div.' + ICON, dropLi);
                removeClass([icon], EXPANDABLE);
            }
            dropUl = ListBase.generateUL(this.createElement, [], null, this.listBaseOption);
            dropLi.appendChild(dropUl);
            this.addExpand(dropLi);
            this.trigger('nodeExpanded', this.getExpandEvent(dropLi, null));
        }
        var collapseIcon = select('div.' + COLLAPSIBLE, dropLi);
        if (!isNullOrUndefined(dropUl) && collapseIcon && (this.preventExpand && !(dropLi.getAttribute('aria-expanded') === 'true'))) {
            removeClass([collapseIcon], COLLAPSIBLE);
            dropLi.setAttribute('aria-expanded', 'false');
            addClass([collapseIcon], EXPANDABLE);
        }
        return dropUl;
    };
    TreeView.prototype.updateElement = function (dragParentUl, dragParentLi) {
        if (dragParentLi && dragParentUl.childElementCount === 0) {
            var dragIcon = select('div.' + ICON, dragParentLi);
            detach(dragParentUl);
            detach(dragIcon);
            var parentId = this.getId(dragParentLi);
            this.updateField(this.treeData, this.fields, parentId, 'hasChildren', false);
            this.removeExpand(dragParentLi, true);
        }
    };
    TreeView.prototype.updateAriaLevel = function (dragLi) {
        var level = this.parents(dragLi, '.' + PARENTITEM).length;
        dragLi.setAttribute('aria-level', '' + level);
        this.updateChildAriaLevel(select('.' + PARENTITEM, dragLi), level + 1);
    };
    TreeView.prototype.updateChildAriaLevel = function (element, level) {
        if (!isNullOrUndefined(element)) {
            var cNodes = element.childNodes;
            for (var i = 0, len = cNodes.length; i < len; i++) {
                var liEle = cNodes[parseInt(i.toString(), 10)];
                liEle.setAttribute('aria-level', '' + level);
                this.updateChildAriaLevel(select('.' + PARENTITEM, liEle), level + 1);
            }
        }
    };
    TreeView.prototype.renderVirtualEle = function (e) {
        var pre;
        var event = e.event;
        var offsetY = this.getOffsetY(event, e.target);
        if (offsetY > e.target.offsetHeight - 2) {
            pre = false;
        }
        else if (offsetY < 2) {
            pre = true;
        }
        var virEle = this.createElement('div', { className: SIBLING });
        var index = this.fullRowSelect ? (pre ? 1 : 2) : (pre ? 0 : 1);
        e.target.insertBefore(virEle, e.target.children[parseInt(index.toString(), 10)]);
    };
    TreeView.prototype.removeVirtualEle = function () {
        var sibEle = select('.' + SIBLING);
        if (sibEle) {
            detach(sibEle);
        }
    };
    TreeView.prototype.destroyDrag = function () {
        if (this.dragObj && this.dropObj) {
            this.dragObj.destroy();
            this.dropObj.destroy();
        }
    };
    TreeView.prototype.getDragEvent = function (event, obj, dropTarget, target, dragNode, cloneEle, level, drop) {
        var dropLi = dropTarget ? closest(dropTarget, '.' + LISTITEM) : null;
        var dropData = dropLi ? this.getNodeData(dropLi) : null;
        var draggedNode = obj ? obj.dragLi : dragNode;
        var draggedNodeData = obj ? obj.dragData : null;
        var newParent = dropTarget ? this.parents(dropTarget, '.' + LISTITEM) : null;
        var dragLiParent = obj.dragLi.parentElement;
        var dragParent = obj.dragLi ? closest(dragLiParent, '.' + LISTITEM) : null;
        var targetParent = null;
        var indexValue = null;
        var iconCss = [DROPNEXT, DROPIN, DROPOUT, NODROP];
        var iconClass = null;
        var node = (drop === true) ? draggedNode : dropLi;
        var index = node ? closest(node, '.e-list-parent') : null;
        var i = 0;
        var position = null;
        dragParent = (obj.dragLi && dragParent === null) ? closest(dragLiParent, '.' + ROOT) : dragParent;
        dragParent = (drop === true) ? this.dragParent : dragParent;
        if (cloneEle) {
            while (i < 4) {
                if (select('.' + ICON, cloneEle).classList.contains(iconCss[parseInt(i.toString(), 10)])) {
                    iconClass = iconCss[parseInt(i.toString(), 10)];
                    break;
                }
                i++;
            }
        }
        if (index) {
            var dropTar = 0;
            for (i = 0; i < index.childElementCount; i++) {
                dropTar = (drop !== true && index.children[parseInt(i.toString(), 10)] === draggedNode && dropLi !== draggedNode)
                    ? ++dropTar
                    : dropTar;
                if ((drop !== true && index.children[parseInt(i.toString(), 10)].classList.contains('e-hover'))) {
                    indexValue = (event.offsetY >= 23) ? i + 1 : i;
                    break;
                }
                else if (index.children[parseInt(i.toString(), 10)] === node) {
                    indexValue = (event.offsetY >= 23) ? i : i;
                    break;
                }
            }
            indexValue = (dropTar !== 0) ? --indexValue : indexValue;
            position = this.isDropIn ? 'Inside' : ((event.offsetY < 7) ? 'Before' : 'After');
        }
        if (dropTarget) {
            if (newParent.length === 0) {
                targetParent = null;
            }
            else if (dropTarget.classList.contains(LISTITEM)) {
                targetParent = newParent[0];
            }
            else {
                targetParent = newParent[1];
            }
        }
        if (dropLi === draggedNode) {
            targetParent = dropLi;
        }
        if (dropTarget && target.offsetHeight <= 33 && event.offsetY < target.offsetHeight - 10 && event.offsetY > 6) {
            targetParent = dropLi;
            if (drop !== true) {
                level = ++level;
                var parent_2 = targetParent ? select('.e-list-parent', targetParent) : null;
                indexValue = (parent_2) ? parent_2.children.length : 0;
                if (!(this.fields.dataSource instanceof DataManager) && parent_2 === null && targetParent) {
                    var parent_3 = targetParent.hasAttribute('data-uid') ?
                        this.getChildNodes(this.fields.dataSource, targetParent.getAttribute('data-uid').toString()) : null;
                    indexValue = (parent_3) ? parent_3.length : 0;
                }
            }
        }
        return {
            cancel: false,
            clonedNode: cloneEle,
            event: event,
            draggedNode: draggedNode,
            draggedNodeData: draggedNodeData,
            droppedNode: dropLi,
            droppedNodeData: dropData,
            dropIndex: indexValue,
            dropLevel: level,
            draggedParentNode: dragParent,
            dropTarget: targetParent,
            dropIndicator: iconClass,
            target: target,
            position: position
        };
    };
    TreeView.prototype.addFullRow = function (toAdd) {
        var len = this.liList.length;
        if (toAdd) {
            for (var i = 0; i < len; i++) {
                this.createFullRow(this.liList[parseInt(i.toString(), 10)]);
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                var rowDiv = select('.' + FULLROW, this.liList[parseInt(i.toString(), 10)]);
                detach(rowDiv);
            }
        }
    };
    TreeView.prototype.createFullRow = function (item) {
        var rowDiv = this.createElement('div', { className: FULLROW });
        item.insertBefore(rowDiv, item.childNodes[0]);
    };
    TreeView.prototype.addMultiSelect = function (toAdd) {
        if (toAdd) {
            var liEles = selectAll('.' + LISTITEM + ':not([aria-selected="true"])', this.element);
            for (var _i = 0, liEles_1 = liEles; _i < liEles_1.length; _i++) {
                var ele = liEles_1[_i];
                ele.setAttribute('aria-selected', 'false');
            }
        }
        else {
            var liEles = selectAll('.' + LISTITEM + '[aria-selected="false"]', this.element);
            for (var _a = 0, liEles_2 = liEles; _a < liEles_2.length; _a++) {
                var ele = liEles_2[_a];
                ele.removeAttribute('aria-selected');
            }
        }
    };
    TreeView.prototype.collapseByLevel = function (element, level, excludeHiddenNodes, currentLevel) {
        currentLevel = isNullOrUndefined(currentLevel) ? 1 : currentLevel;
        if (level > 0 && !isNullOrUndefined(element)) {
            var cNodes = this.getVisibleNodes(excludeHiddenNodes, element.childNodes);
            for (var i = 0, len = cNodes.length; i < len; i++) {
                var liEle = cNodes[parseInt(i.toString(), 10)];
                var icon = select('.' + COLLAPSIBLE, select('.' + TEXTWRAP, liEle));
                if (currentLevel >= level && !isNullOrUndefined(icon)) {
                    this.collapseNode(liEle, icon, null);
                }
                this.collapseByLevel(select('.' + PARENTITEM, liEle), level, excludeHiddenNodes, currentLevel + 1);
            }
        }
    };
    TreeView.prototype.collapseAllNodes = function (excludeHiddenNodes) {
        var cIcons = this.getVisibleNodes(excludeHiddenNodes, selectAll('.' + COLLAPSIBLE, this.element));
        for (var i = 0, len = cIcons.length; i < len; i++) {
            var icon = cIcons[parseInt(i.toString(), 10)];
            var liEle = closest(icon, '.' + LISTITEM);
            this.collapseNode(liEle, icon, null);
        }
    };
    TreeView.prototype.expandByLevel = function (element, level, excludeHiddenNodes) {
        if (level > 0 && !isNullOrUndefined(element)) {
            var eNodes = this.getVisibleNodes(excludeHiddenNodes, element.childNodes);
            for (var i = 0, len = eNodes.length; i < len; i++) {
                var liEle = eNodes[parseInt(i.toString(), 10)];
                var icon = select('.' + EXPANDABLE, select('.' + TEXTWRAP, liEle));
                if (!isNullOrUndefined(icon)) {
                    this.expandAction(liEle, icon, null);
                }
                this.expandByLevel(select('.' + PARENTITEM, liEle), level - 1, excludeHiddenNodes);
            }
        }
    };
    TreeView.prototype.expandAllNodes = function (excludeHiddenNodes) {
        var eIcons = this.getVisibleNodes(excludeHiddenNodes, selectAll('.' + EXPANDABLE, this.element));
        for (var _i = 0, eIcons_1 = eIcons; _i < eIcons_1.length; _i++) {
            var icon = eIcons_1[_i];
            var liEle = closest(icon, '.' + LISTITEM);
            this.expandAction(liEle, icon, null, true, null, true);
        }
    };
    TreeView.prototype.getVisibleNodes = function (excludeHiddenNodes, nodes) {
        var vNodes = Array.prototype.slice.call(nodes);
        if (excludeHiddenNodes) {
            for (var i = 0; i < vNodes.length; i++) {
                if (!isVisible(vNodes[parseInt(i.toString(), 10)])) {
                    vNodes.splice(i, 1);
                    i--;
                }
            }
        }
        return vNodes;
    };
    TreeView.prototype.removeNode = function (node) {
        var dragParentUl = closest(node, '.' + PARENTITEM);
        var dragParentLi = closest(dragParentUl, '.' + LISTITEM);
        if (!isNullOrUndefined(this.nodeTemplateFn)) {
            this.destroyTemplate(node);
        }
        detach(node);
        this.updateElement(dragParentUl, dragParentLi);
        this.removeData(node);
    };
    TreeView.prototype.updateInstance = function () {
        this.updateList();
        this.updateSelectedNodes();
        this.updateExpandedNodes();
    };
    TreeView.prototype.updateList = function () {
        this.liList = Array.prototype.slice.call(selectAll('.' + LISTITEM, this.element));
    };
    TreeView.prototype.updateSelectedNodes = function () {
        this.setProperties({ selectedNodes: [] }, true);
        var sNodes = selectAll('.' + ACTIVE, this.element);
        this.selectGivenNodes(sNodes);
    };
    TreeView.prototype.updateExpandedNodes = function () {
        this.setProperties({ expandedNodes: [] }, true);
        var eNodes = selectAll('[aria-expanded="true"]', this.element);
        for (var i = 0, len = eNodes.length; i < len; i++) {
            this.addExpand(eNodes[parseInt(i.toString(), 10)]);
        }
    };
    TreeView.prototype.removeData = function (node) {
        if (this.dataType === 1) {
            var dm = new DataManager(this.treeData);
            var id = this.getId(node);
            var data = {};
            var newId = this.isNumberTypeId ? parseFloat(id) : id;
            data[this.fields.id] = newId;
            dm.remove(this.fields.id, data);
            this.removeChildNodes(id);
        }
        else {
            var id = this.getId(node);
            this.updateChildField(this.treeData, this.fields, id, null, null, true);
        }
    };
    TreeView.prototype.removeChildNodes = function (parentId) {
        var cNodes = this.getChildGroup(this.groupedData, parentId, false);
        var childData = [];
        if (cNodes) {
            for (var i = 0, len = cNodes.length; i < len; i++) {
                var dm = new DataManager(this.treeData);
                var id = getValue(this.fields.id, cNodes[parseInt(i.toString(), 10)]).toString();
                var data = {};
                var currId = this.isNumberTypeId ? parseFloat(id) : id;
                data[this.fields.id] = currId;
                var nodeData = dm.remove(this.fields.id, data);
                childData.push(nodeData[0]);
                this.removeChildNodes(id);
            }
        }
        return childData;
    };
    TreeView.prototype.doGivenAction = function (nodes, selector, toExpand) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            var liEle = this.getElement(nodes[parseInt(i.toString(), 10)]);
            if (isNullOrUndefined(liEle)) {
                continue;
            }
            var icon = select('.' + selector, select('.' + TEXTWRAP, liEle));
            if (!isNullOrUndefined(icon)) {
                if (toExpand) {
                    this.expandAction(liEle, icon, null);
                }
                else {
                    this.collapseNode(liEle, icon, null);
                }
            }
        }
    };
    TreeView.prototype.addGivenNodes = function (nodes, dropLi, index, isRemote, dropEle) {
        if (nodes.length === 0) {
            return;
        }
        var sNodes = this.getSortedData(nodes);
        var level = dropLi ? parseFloat(dropLi.getAttribute('aria-level')) + 1 : 1;
        if (isRemote) {
            this.updateMapper(level);
        }
        var li = ListBase.createListItemFromJson(this.createElement, sNodes, this.listBaseOption, level);
        var id = this.getId(dropLi);
        var dropIcon1;
        if (!isNullOrUndefined(dropLi)) {
            dropIcon1 = select('div.' + ICON, dropLi);
        }
        if (this.dataType === 1 && dropIcon1 && dropIcon1.classList.contains(EXPANDABLE) && this.preventExpand && !isNullOrUndefined(this.element.offsetParent) && !this.element.offsetParent.parentElement.classList.contains('e-filemanager')) {
            this.preventExpand = true;
        }
        if (this.dataType !== 1) {
            this.addChildData(this.treeData, this.fields, id, nodes, index);
            this.isFirstRender = false;
        }
        var dropUl;
        if (!dropEle) {
            dropUl = dropLi ? this.expandParent(dropLi) : select('.' + PARENTITEM, this.element);
        }
        else {
            dropUl = dropEle;
        }
        var refNode = !isNullOrUndefined(index) ? dropUl.childNodes[parseInt(index.toString(), 10)] : null;
        if (!this.isFirstRender || this.dataType === 1) {
            var args = this.expandArgs;
            if (refNode || this.sortOrder === 'None') {
                for (var i = 0; i < li.length; i++) {
                    dropUl.insertBefore(li[parseInt(i.toString(), 10)], refNode);
                }
                if (this.dataType === 1 && !isNullOrUndefined(dropLi) && !this.preventExpand && !isNullOrUndefined(this.element.offsetParent) && !this.element.offsetParent.parentElement.classList.contains('e-filemanager')) {
                    this.preventExpand = false;
                    var dropIcon = select('div.' + ICON, dropLi);
                    if (dropIcon && dropIcon.classList.contains(EXPANDABLE) && (isNullOrUndefined(args) || args.name !== 'nodeExpanding')) {
                        this.expandAction(dropLi, dropIcon, null);
                    }
                }
            }
            if (!refNode && ((this.sortOrder === 'Ascending') || (this.sortOrder === 'Descending'))) {
                if (dropUl.childNodes.length === 0) {
                    for (var i = 0; i < li.length; i++) {
                        dropUl.insertBefore(li[parseInt(i.toString(), 10)], refNode);
                    }
                    if (this.dataType === 1 && !isNullOrUndefined(dropLi) && !this.preventExpand && !isNullOrUndefined(this.element.offsetParent) && !this.element.offsetParent.parentElement.classList.contains('e-filemanager')) {
                        this.preventExpand = false;
                        var dropIcon = select('div.' + ICON, dropLi);
                        if (dropIcon && dropIcon.classList.contains(EXPANDABLE) && (isNullOrUndefined(args) || args.name !== 'nodeExpanding')) {
                            this.expandAction(dropLi, dropIcon, null);
                        }
                    }
                }
                else {
                    var cNodes = dropUl.childNodes;
                    for (var i = 0; i < li.length; i++) {
                        for (var j = 0; j < cNodes.length; j++) {
                            var returnValue = (this.sortOrder === 'Ascending') ? cNodes[parseInt(j.toString(), 10)].textContent.toUpperCase() > li[parseInt(i.toString(), 10)].innerText.toUpperCase() : cNodes[parseInt(j.toString(), 10)].textContent.toUpperCase() < li[parseInt(i.toString(), 10)].innerText.toUpperCase();
                            if (returnValue) {
                                dropUl.insertBefore(li[parseInt(i.toString(), 10)], cNodes[parseInt(j.toString(), 10)]);
                                break;
                            }
                            dropUl.insertBefore(li[parseInt(i.toString(), 10)], cNodes[cNodes.length]);
                        }
                    }
                }
            }
        }
        if (this.dataType === 1) {
            this.updateField(this.treeData, this.fields, id, 'hasChildren', true);
            var refId = this.getId(refNode);
            var pos = isNullOrUndefined(refId) ? this.treeData.length : this.getDataPos(this.treeData, this.fields, refId);
            for (var j = 0; j < nodes.length; j++) {
                if (!isNullOrUndefined(id)) {
                    var currId = this.isNumberTypeId ? parseFloat(id) : id;
                    setValue(this.fields.parentID, currId, nodes[parseInt(j.toString(), 10)]);
                }
                this.treeData.splice(pos, 0, nodes[parseInt(j.toString(), 10)]);
                pos++;
            }
        }
        this.finalizeNode(dropUl);
    };
    TreeView.prototype.updateMapper = function (level) {
        var mapper = (level === 1) ? this.fields : this.getChildFields(this.fields, level - 1, 1);
        this.updateListProp(mapper);
    };
    TreeView.prototype.updateListProp = function (mapper) {
        var prop = this.getActualProperties(mapper);
        this.listBaseOption.fields = prop;
        this.listBaseOption.fields.url = Object.prototype.hasOwnProperty.call(prop, 'navigateUrl') ? prop.navigateUrl : 'navigateUrl';
    };
    TreeView.prototype.getDataPos = function (obj, mapper, id) {
        var pos = null;
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && nodeId && nodeId.toString() === id) {
                return i;
            }
            else if (typeof mapper.child === 'string' && !isNullOrUndefined(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var data = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                pos = this.getDataPos(data, this.getChildMapper(mapper), id);
                if (pos !== null) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var items = getValue('child', obj[parseInt(i.toString(), 10)]);
                pos = this.getDataPos(items, this.getChildMapper(mapper), id);
                if (pos !== null) {
                    break;
                }
            }
        }
        return pos;
    };
    TreeView.prototype.addChildData = function (obj, mapper, id, data, index) {
        var updated;
        if (isNullOrUndefined(id)) {
            index = isNullOrUndefined(index) ? obj.length : index;
            for (var k = 0, len = data.length; k < len; k++) {
                obj.splice(index, 0, data[parseInt(k.toString(), 10)]);
                index++;
            }
            return updated;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && nodeId && nodeId.toString() === id) {
                if ((typeof mapper.child === 'string' && (Object.prototype.hasOwnProperty.call(obj[parseInt(i.toString(), 10)], mapper.child) && obj[parseInt(i.toString(), 10)][mapper.child] !== null)) ||
                    ((this.fields.dataSource instanceof DataManager) && Object.prototype.hasOwnProperty.call(obj[parseInt(i.toString(), 10)], 'child'))) {
                    var key = (typeof mapper.child === 'string') ? mapper.child : 'child';
                    var childData = getValue(key, obj[parseInt(i.toString(), 10)]);
                    if (isNullOrUndefined(childData)) {
                        childData = [];
                    }
                    index = isNullOrUndefined(index) ? childData.length : index;
                    for (var k = 0, len = data.length; k < len; k++) {
                        childData.splice(index, 0, data[parseInt(k.toString(), 10)]);
                        index++;
                    }
                }
                else {
                    var key = (typeof mapper.child === 'string') ? mapper.child : 'child';
                    obj[parseInt(i.toString(), 10)]["" + key] = data;
                }
                return true;
            }
            else if (typeof mapper.child === 'string' && !isNullOrUndefined(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var childObj = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                updated = this.addChildData(childObj, this.getChildMapper(mapper), id, data, index);
                if (updated !== undefined) {
                    break;
                }
            }
            else if ((this.fields.dataSource instanceof DataManager) && !isNullOrUndefined(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var childData = getValue('child', obj[parseInt(i.toString(), 10)]);
                updated = this.addChildData(childData, this.getChildMapper(mapper), id, data, index);
                if (updated !== undefined) {
                    break;
                }
            }
        }
        return updated;
    };
    TreeView.prototype.doDisableAction = function (nodes) {
        var validNodes = this.nodeType(nodes);
        var validID = this.checkValidId(validNodes);
        this.validArr = [];
        for (var i = 0, len = validID.length; i < len; i++) {
            var id = validID[parseInt(i.toString(), 10)][this.fields.id].toString();
            if (id && this.disableNode.indexOf(id) === -1) {
                this.disableNode.push(id);
            }
            var liEle = this.getElement(id);
            if (liEle) {
                liEle.setAttribute('aria-disabled', 'true');
                addClass([liEle], DISABLE);
            }
        }
    };
    TreeView.prototype.doEnableAction = function (nodes) {
        var strNodes = this.nodeType(nodes);
        for (var i = 0, len = strNodes.length; i < len; i++) {
            var liEle = this.getElement(strNodes[parseInt(i.toString(), 10)]);
            var id = strNodes[parseInt(i.toString(), 10)];
            if (id && this.disableNode.indexOf(id) !== -1) {
                this.disableNode.splice(this.disableNode.indexOf(id), 1);
            }
            if (liEle) {
                liEle.removeAttribute('aria-disabled');
                removeClass([liEle], DISABLE);
            }
        }
    };
    TreeView.prototype.nodeType = function (nodes) {
        var validID = [];
        for (var i = 0, len = nodes.length; i < len; i++) {
            var id = void 0;
            if (typeof nodes[parseInt(i.toString(), 10)] == 'string') {
                id = (nodes[parseInt(i.toString(), 10)]) ? nodes[parseInt(i.toString(), 10)].toString() : null;
            }
            else if (typeof nodes[parseInt(i.toString(), 10)] === 'object') {
                id = nodes[parseInt(i.toString(), 10)] ? nodes[parseInt(i.toString(), 10)].getAttribute('data-uid').toString() : null;
            }
            if (validID.indexOf(id) === -1) {
                validID.push(id);
            }
        }
        return validID;
    };
    TreeView.prototype.checkValidId = function (node) {
        var _this = this;
        if (this.dataType === 1) {
            this.validArr = this.treeData.filter(function (data) {
                return node.indexOf(data[_this.fields.id] ? data[_this.fields.id].toString() : null) !== -1;
            });
        }
        else if (this.dataType === 2) {
            for (var k = 0; k < this.treeData.length; k++) {
                var id = this.treeData[parseInt(k.toString(), 10)][this.fields.id]
                    ? this.treeData[parseInt(k.toString(), 10)][this.fields.id].toString()
                    : null;
                if (node.indexOf(id) !== -1) {
                    this.validArr.push(this.treeData[parseInt(k.toString(), 10)]);
                }
                var childItems = getValue(this.fields.child.toString(), this.treeData[parseInt(k.toString(), 10)]);
                if (childItems) {
                    this.filterNestedChild(childItems, node);
                }
            }
        }
        return this.validArr;
    };
    TreeView.prototype.filterNestedChild = function (treeData, nodes) {
        for (var k = 0; k < treeData.length; k++) {
            var id = treeData[parseInt(k.toString(), 10)][this.fields.id]
                ? treeData[parseInt(k.toString(), 10)][this.fields.id].toString()
                : null;
            if (nodes.indexOf(id) !== -1) {
                this.validArr.push(treeData[parseInt(k.toString(), 10)]);
            }
            var childItems = getValue(this.fields.child.toString(), treeData[parseInt(k.toString(), 10)]);
            if (childItems) {
                this.filterNestedChild(childItems, nodes);
            }
        }
    };
    TreeView.prototype.setTouchClass = function () {
        var ele = closest(this.element, '.' + BIGGER);
        this.touchClass = isNullOrUndefined(ele) ? '' : SMALL;
    };
    TreeView.prototype.updatePersistProp = function () {
        this.removeField(this.treeData, this.fields, ['selected', 'expanded']);
        var sleNodes = this.selectedNodes;
        for (var l = 0, slelen = sleNodes.length; l < slelen; l++) {
            this.updateField(this.treeData, this.fields, sleNodes[parseInt(l.toString(), 10)], 'selected', true);
        }
        var enodes = this.expandedNodes;
        for (var k = 0, nodelen = enodes.length; k < nodelen; k++) {
            this.updateField(this.treeData, this.fields, enodes[parseInt(k.toString(), 10)], 'expanded', true);
        }
        if (this.showCheckBox) {
            this.removeField(this.treeData, this.fields, ['isChecked']);
            var cnodes = this.checkedNodes;
            for (var m = 0, nodelen = cnodes.length; m < nodelen; m++) {
                this.updateField(this.treeData, this.fields, cnodes[parseInt(m.toString(), 10)], 'isChecked', true);
            }
        }
    };
    TreeView.prototype.removeField = function (obj, mapper, names) {
        if (isNullOrUndefined(obj) || isNullOrUndefined(mapper)) {
            return;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            for (var j = 0; j < names.length; j++) {
                var field = this.getMapperProp(mapper, names[parseInt(j.toString(), 10)]);
                if (!isNullOrUndefined(obj[parseInt(i.toString(), 10)]["" + field])) {
                    delete obj[parseInt(i.toString(), 10)]["" + field];
                }
            }
            if (typeof mapper.child === 'string' && !isNullOrUndefined(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                this.removeField(getValue(mapper.child, obj[parseInt(i.toString(), 10)]), this.getChildMapper(mapper), names);
            }
            else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                this.removeField(getValue('child', obj[parseInt(i.toString(), 10)]), this.getChildMapper(mapper), names);
            }
        }
    };
    TreeView.prototype.getMapperProp = function (mapper, fieldName) {
        switch (fieldName) {
            case 'selected':
                return !isNullOrUndefined(mapper.selected) ? mapper.selected : 'selected';
            case 'expanded':
                return !isNullOrUndefined(mapper.expanded) ? mapper.expanded : 'expanded';
            case 'isChecked':
                return !isNullOrUndefined(mapper.isChecked) ? mapper.isChecked : 'isChecked';
            case 'hasChildren':
                return !isNullOrUndefined(mapper.hasChildren) ? mapper.hasChildren : 'hasChildren';
            default:
                return fieldName;
        }
    };
    TreeView.prototype.updateField = function (obj, mapper, id, key, value) {
        if (isNullOrUndefined(id)) {
            return;
        }
        else if (this.dataType === 1) {
            var newId = this.isNumberTypeId ? parseFloat(id) : id;
            var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.id, 'equal', newId, false));
            setValue(this.getMapperProp(mapper, key), value, resultData[0]);
        }
        else {
            this.updateChildField(obj, mapper, id, key, value);
        }
    };
    TreeView.prototype.updateChildField = function (obj, mapper, id, key, value, remove) {
        var removedData;
        if (isNullOrUndefined(obj)) {
            return removedData;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && !isNullOrUndefined(nodeId) && nodeId.toString() === id) {
                if (remove) {
                    removedData = obj.splice(i, 1);
                }
                else {
                    setValue(this.getMapperProp(mapper, key), value, obj[parseInt(i.toString(), 10)]);
                    removedData = [];
                }
                return removedData;
            }
            else if (typeof mapper.child === 'string' && !isNullOrUndefined(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var childData = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                removedData = this.updateChildField(childData, this.getChildMapper(mapper), id, key, value, remove);
                if (removedData !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var childItems = getValue('child', obj[parseInt(i.toString(), 10)]);
                removedData = this.updateChildField(childItems, this.getChildMapper(mapper), id, key, value, remove);
                if (removedData !== undefined) {
                    break;
                }
            }
        }
        return removedData;
    };
    TreeView.prototype.triggerEvent = function (action, node) {
        this.renderReactTemplates();
        if (action === 'addNodes') {
            var nodeData = [];
            for (var i = 0; i < node.length; i++) {
                nodeData.push(this.getNode(this.getElement(isNullOrUndefined(node[parseInt(i.toString(), 10)][this.fields.id])
                    ? getValue(this.fields.id, node[parseInt(i.toString(), 10)]).toString()
                    : null)));
            }
            node = nodeData;
        }
        var eventArgs = { data: this.treeData, action: action, nodeData: node };
        this.trigger('dataSourceChanged', eventArgs);
    };
    TreeView.prototype.wireInputEvents = function (inpEle) {
        EventHandler.add(inpEle, 'blur', this.inputFocusOut, this);
    };
    TreeView.prototype.wireEditingEvents = function (toBind) {
        var _this = this;
        if (toBind && !this.disabled) {
            this.touchEditObj = new Touch(this.element, {
                tap: function (e) {
                    if (_this.isDoubleTapped(e) && e.tapCount === 2) {
                        e.originalEvent.preventDefault();
                        _this.editingHandler(e.originalEvent);
                    }
                }
            });
        }
        else {
            if (this.touchEditObj) {
                this.touchEditObj.destroy();
            }
        }
    };
    TreeView.prototype.wireClickEvent = function (toBind) {
        var _this = this;
        if (toBind) {
            this.touchClickObj = new Touch(this.element, {
                tap: function (e) {
                    _this.clickHandler(e);
                }
            });
        }
        else {
            if (this.touchClickObj) {
                this.touchClickObj.destroy();
            }
        }
    };
    TreeView.prototype.wireExpandOnEvent = function (toBind) {
        var _this = this;
        if (toBind) {
            this.touchExpandObj = new Touch(this.element, {
                tap: function (e) {
                    if ((_this.expandOnType === 'Click' || (_this.expandOnType === 'DblClick' && _this.isDoubleTapped(e) && e.tapCount === 2))
                        && e.originalEvent.which !== 3) {
                        _this.expandHandler(e);
                    }
                }
            });
        }
        else {
            if (this.touchExpandObj) {
                this.touchExpandObj.destroy();
            }
        }
    };
    TreeView.prototype.mouseDownHandler = function (e) {
        this.mouseDownStatus = true;
        if (e.shiftKey || e.ctrlKey) {
            e.preventDefault();
        }
        if (e.ctrlKey && this.allowMultiSelection) {
            EventHandler.add(this.element, 'contextmenu', this.preventContextMenu, this);
        }
    };
    TreeView.prototype.preventContextMenu = function (e) {
        e.preventDefault();
    };
    TreeView.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'mousedown', this.mouseDownHandler, this);
        this.wireClickEvent(true);
        if (this.expandOnType !== 'None') {
            this.wireExpandOnEvent(true);
        }
        EventHandler.add(this.element, 'mouseover', this.onMouseOver, this);
        EventHandler.add(this.element, 'mouseout', this.onMouseLeave, this);
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    TreeView.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'mousedown', this.mouseDownHandler);
        this.wireClickEvent(false);
        this.wireExpandOnEvent(false);
        EventHandler.remove(this.element, 'mouseover', this.onMouseOver);
        EventHandler.remove(this.element, 'mouseout', this.onMouseLeave);
        if (!this.disabled) {
            this.keyboardModule.destroy();
        }
    };
    TreeView.prototype.parents = function (element, selector) {
        var matched = [];
        var el = element.parentNode;
        while (!isNullOrUndefined(el)) {
            if (matches(el, selector)) {
                matched.push(el);
            }
            el = el.parentNode;
        }
        return matched;
    };
    TreeView.prototype.isDoubleTapped = function (e) {
        var target = e.originalEvent.target;
        var secondTap;
        if (target && e.tapCount) {
            if (e.tapCount === 1) {
                this.firstTap = closest(target, '.' + LISTITEM);
            }
            else if (e.tapCount === 2) {
                secondTap = closest(target, '.' + LISTITEM);
            }
        }
        return (this.firstTap === secondTap);
    };
    TreeView.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (!isNullOrUndefined(node)) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    TreeView.prototype.showSpinner = function (element) {
        addClass([element], LOAD);
        createSpinner({
            target: element,
            width: Browser.isDevice ? 16 : 14
        }, this.createElement);
        showSpinner(element);
    };
    TreeView.prototype.hideSpinner = function (element) {
        hideSpinner(element);
        element.innerHTML = '';
        removeClass([element], LOAD);
    };
    TreeView.prototype.setCheckedNodes = function (nodes) {
        nodes = JSON.parse(JSON.stringify(nodes));
        if (nodes.length > 1 && typeof this.nodeChecked === 'function' && this.nodeChecked.length > 0) {
            this.isFilter = true;
        }
        this.uncheckAll(this.checkedNodes);
        this.setIndeterminate(nodes);
        if (nodes.length > 0) {
            this.checkAll(nodes);
        }
    };
    /**
     * Checks whether the checkedNodes entered are valid and sets the valid checkedNodes while changing via setmodel
     *
     * @param {string} node - The unique identifier of the node.
     * @param {string[]} [nodes=[]] - The list of node IDs to check.
     * @returns {void}
     * @private
     */
    TreeView.prototype.setValidCheckedNode = function (node, nodes) {
        if (nodes === void 0) { nodes = []; }
        if (this.dataType === 1) {
            var mapper = this.fields;
            var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.id, 'equal', node, true));
            if (resultData[0]) {
                this.setChildCheckState(resultData, node, resultData[0], nodes);
                if (this.autoCheck) {
                    var parent_4 = resultData[0][this.fields.parentID] ? resultData[0][this.fields.parentID].toString() : null;
                    var childNodes = this.getChildNodes(this.treeData, parent_4);
                    var count = 0;
                    for (var len = 0; len < childNodes.length; len++) {
                        var childId = childNodes[parseInt(len.toString(), 10)][this.fields.id].toString();
                        if (this.checkedNodes.indexOf(childId) !== -1) {
                            count++;
                        }
                    }
                    if (count === childNodes.length && this.checkedNodes.indexOf(parent_4) === -1 && parent_4) {
                        this.checkDisabledState(parent_4);
                    }
                }
            }
        }
        else if (this.dataType === 2) {
            for (var a = 0; a < this.treeData.length; a++) {
                var index = this.treeData[parseInt(a.toString(), 10)][this.fields.id] ? this.treeData[parseInt(a.toString(), 10)][this.fields.id].toString() : '';
                if (index === node && this.checkedNodes.indexOf(node) === -1) {
                    this.checkDisabledState(node);
                    break;
                }
                var childItems = getValue(this.fields.child.toString(), this.treeData[parseInt(a.toString(), 10)]);
                if (childItems) {
                    this.setChildCheckState(childItems, node, this.treeData[parseInt(a.toString(), 10)], nodes);
                }
            }
        }
    };
    /**
     * Checks whether the checkedNodes entered are valid and sets the valid checkedNodes while changing via setmodel(for hierarchical DS)
     *
     * @param {Object[]} childItems - The child items to check.
     * @param {string} node - The node to set the check state for.
     * @param {Object} [treeData] - The optional tree data.
     * @param {string[]} [nodes=[]] - The list of node IDs to check.
     * @returns {void}
     * @private
     */
    TreeView.prototype.setChildCheckState = function (childItems, node, treeData, nodes) {
        if (nodes === void 0) { nodes = []; }
        var checkedParent;
        var count = 0;
        if (this.dataType === 1) {
            if (treeData) {
                checkedParent = treeData[this.fields.id] ? treeData[this.fields.id].toString() : null;
            }
            for (var index = 0; index < childItems.length; index++) {
                var checkNode = childItems[parseInt(index.toString(), 10)][this.fields.id]
                    ? childItems[parseInt(index.toString(), 10)][this.fields.id].toString()
                    : null;
                if (treeData && checkedParent && this.autoCheck) {
                    if (this.checkedNodes.indexOf(checkedParent) !== -1 && this.checkedNodes.indexOf(checkNode) === -1) {
                        this.checkDisabledState(checkNode, childItems[index]);
                    }
                }
                if (checkNode === node && this.checkedNodes.indexOf(node) === -1) {
                    this.checkDisabledState(node);
                }
                var subChildItems = this.getChildNodes(this.treeData, checkNode);
                var isParentNodeCheck = (nodes.length === 1 && nodes[0] === checkNode);
                if (subChildItems.length === node.length || isParentNodeCheck) {
                    this.setChildCheckState(subChildItems, node, treeData);
                }
            }
        }
        else {
            if (treeData) {
                checkedParent = treeData[this.fields.id] ? treeData[this.fields.id].toString() : '';
            }
            for (var index = 0; index < childItems.length; index++) {
                var checkedChild = childItems[parseInt(index.toString(), 10)][this.fields.id] ? childItems[parseInt(index.toString(), 10)][this.fields.id].toString() : '';
                var isParentNodeCheck = ([node].length === 1 && nodes.length === 0);
                if (treeData && checkedParent && this.autoCheck) {
                    if (this.checkedNodes.indexOf(checkedParent) !== -1 && this.checkedNodes.indexOf(checkedChild) === -1
                        && (checkedChild === node || isParentNodeCheck)) {
                        this.checkDisabledState(checkedChild, childItems[index]);
                    }
                }
                if (checkedChild === node && this.checkedNodes.indexOf(node) === -1) {
                    this.checkDisabledState(node);
                }
                var subChildItems = getValue(this.fields.child.toString(), childItems[parseInt(index.toString(), 10)]);
                if (subChildItems) {
                    this.setChildCheckState(subChildItems, node, childItems[parseInt(index.toString(), 10)]);
                }
                if (this.checkedNodes.indexOf(checkedChild) !== -1 && this.autoCheck) {
                    count++;
                }
                if (count === childItems.length && this.checkedNodes.indexOf(checkedParent) === -1 && this.autoCheck) {
                    this.checkDisabledState(checkedParent, treeData);
                }
            }
        }
    };
    TreeView.prototype.setIndeterminate = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.setValidCheckedNode(nodes[parseInt(i.toString(), 10)], nodes);
        }
    };
    TreeView.prototype.updatePosition = function (id, newData, isRefreshChild, childValue) {
        if (this.dataType === 1) {
            var pos = this.getDataPos(this.treeData, this.fields, id);
            this.treeData.splice(pos, 1, newData);
            if (isRefreshChild) {
                this.removeChildNodes(id);
                for (var j = 0; j < childValue.length; j++) {
                    this.treeData.splice(pos, 0, childValue[parseInt(j.toString(), 10)]);
                    pos++;
                }
            }
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        else {
            this.updateChildPosition(this.treeData, this.fields, id, [newData], undefined);
        }
    };
    TreeView.prototype.updateChildPosition = function (treeData, mapper, currID, newData, index) {
        var found;
        for (var i = 0, objlen = treeData.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, treeData[parseInt(i.toString(), 10)]);
            if (treeData[parseInt(i.toString(), 10)] && nodeId && nodeId.toString() === currID) {
                treeData[parseInt(i.toString(), 10)] = newData[0];
                return true;
            }
            else if (typeof mapper.child === 'string' && !isNullOrUndefined(getValue(mapper.child, treeData[parseInt(i.toString(), 10)]))) {
                var childObj = getValue(mapper.child, treeData[parseInt(i.toString(), 10)]);
                found = this.updateChildPosition(childObj, this.getChildMapper(mapper), currID, newData, index);
                if (found !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue('child', treeData[parseInt(i.toString(), 10)]))) {
                var childData = getValue('child', treeData[parseInt(i.toString(), 10)]);
                found = this.updateChildPosition(childData, this.getChildMapper(mapper), currID, newData, index);
                if (found !== undefined) {
                    break;
                }
            }
        }
        return found;
    };
    TreeView.prototype.dynamicState = function () {
        this.setDragAndDrop(this.allowDragAndDrop);
        this.wireEditingEvents(this.allowEditing);
        if (!this.disabled) {
            this.wireEvents();
            this.setRipple();
        }
        else {
            this.unWireEvents();
            this.rippleFn();
            this.rippleIconFn();
        }
    };
    TreeView.prototype.crudOperation = function (operation, nodes, target, newText, newNode, index, prevent) {
        var _this = this;
        var data = this.fields.dataSource;
        var matchedArr = [];
        var query = this.getQuery(this.fields);
        var key = this.fields.id;
        var crud;
        var changes = {
            addedRecords: [],
            deletedRecords: [],
            changedRecords: []
        };
        var nodesID = [];
        if (nodes) {
            nodesID = this.nodeType(nodes);
        }
        else if (target) {
            if (typeof target == 'string') {
                nodesID[0] = target.toString();
            }
            else if (typeof target === 'object') {
                nodesID[0] = target.getAttribute('data-uid').toString();
            }
        }
        for (var i = 0, len = nodesID.length; i < len; i++) {
            var liEle = this.getElement(nodesID[parseInt(i.toString(), 10)]);
            if (isNullOrUndefined(liEle)) {
                continue;
            }
            var removedData = this.getNodeObject(nodesID[parseInt(i.toString(), 10)]);
            matchedArr.push(removedData);
        }
        switch (operation) {
            case 'delete':
                if (nodes.length === 1) {
                    crud = data.remove(key, matchedArr[0], query.fromTable, query);
                }
                else {
                    changes.deletedRecords = matchedArr;
                    crud = data.saveChanges(changes, key, query.fromTable, query);
                }
                crud.then(function () { return _this.deleteSuccess(nodesID); })
                    .catch(function (e) { return _this.dmFailure(e); });
                break;
            case 'update':
                matchedArr[0][this.fields.text] = newText;
                crud = data.update(key, matchedArr[0], query.fromTable, query);
                crud.then(function () { return _this.editSucess(target, newText, prevent); })
                    .catch(function (e) { return _this.dmFailure(e, target, prevent); });
                break;
            case 'insert':
                if (newNode.length === 1) {
                    crud = data.insert(newNode[0], query.fromTable, query);
                }
                else {
                    var arr = [];
                    for (var i = 0, len = newNode.length; i < len; i++) {
                        arr.push(newNode[parseInt(i.toString(), 10)]);
                    }
                    changes.addedRecords = arr;
                    crud = data.saveChanges(changes, key, query.fromTable, query);
                }
                crud.then(function () {
                    var dropLi = _this.getElement(target);
                    _this.addSuccess(newNode, dropLi, index);
                    _this.preventExpand = false;
                }).catch(function (e) { return _this.dmFailure(e); });
                break;
        }
    };
    TreeView.prototype.deleteSuccess = function (nodes) {
        var nodeData = [];
        for (var i = 0, len = nodes.length; i < len; i++) {
            var liEle = this.getElement(nodes[parseInt(i.toString(), 10)]);
            nodeData.push(this.getNode(liEle));
            if (isNullOrUndefined(liEle)) {
                continue;
            }
            this.removeNode(liEle);
        }
        this.updateInstance();
        if (this.dataType === 1) {
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        this.triggerEvent('removeNode', nodeData);
    };
    TreeView.prototype.editSucess = function (target, newText, prevent) {
        var liEle = this.getElement(target);
        var txtEle = select('.' + LISTTEXT, liEle);
        this.appendNewText(liEle, txtEle, newText, prevent);
    };
    TreeView.prototype.addSuccess = function (nodes, dropLi, index) {
        var _this = this;
        var dropUl;
        var icon = dropLi ? dropLi.querySelector('.' + ICON) : null;
        if (dropLi && icon && icon.classList.contains(EXPANDABLE) &&
            dropLi.querySelector('.' + PARENTITEM) === null) {
            this.renderChildNodes(dropLi, null, function () {
                dropUl = dropLi.querySelector('.' + PARENTITEM);
                _this.addGivenNodes(nodes, dropLi, index, true, dropUl);
                _this.triggerEvent('addNodes', nodes);
            });
        }
        else {
            this.addGivenNodes(nodes, dropLi, index, true);
            this.triggerEvent('addNodes', nodes);
        }
    };
    TreeView.prototype.dmFailure = function (e, target, prevent) {
        if (target) {
            this.updatePreviousText(target, prevent);
        }
        this.trigger('actionFailure', { error: e });
    };
    TreeView.prototype.updatePreviousText = function (target, prevent) {
        var liEle = this.getElement(target);
        var txtEle = select('.' + LISTTEXT, liEle);
        this.updateText(liEle, txtEle, this.oldText, prevent);
    };
    TreeView.prototype.getHierarchicalParentId = function (node, data, parentsID) {
        var _this = this;
        var index = data.findIndex(function (data) {
            return data[_this.fields.id] && data[_this.fields.id].toString() === node;
        });
        if (index === -1) {
            for (var i = 0; i < data.length; i++) {
                var childItems = getValue(this.fields.child.toString(), data[parseInt(i.toString(), 10)]);
                if (!isNullOrUndefined(childItems)) {
                    index = childItems.findIndex(function (data) {
                        return data[_this.fields.id] && data[_this.fields.id].toString() === node;
                    });
                    if (index === -1) {
                        this.getHierarchicalParentId(node, childItems, parentsID);
                    }
                    else {
                        parentsID.push(data[parseInt(i.toString(), 10)][this.fields.id].toString());
                        this.getHierarchicalParentId(data[parseInt(i.toString(), 10)][this.fields.id].toString(), this.treeData, parentsID);
                        break;
                    }
                }
            }
        }
        return parentsID;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeViewModel} newProp - The new property value.
     * @param {TreeViewModel} oldProp - The old property value.
     * @returns {void}
     * @private
     */
    TreeView.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowDragAndDrop':
                    this.setDragAndDrop(this.allowDragAndDrop);
                    break;
                case 'dragArea':
                    if (this.allowDragAndDrop) {
                        this.dragObj.dragArea = this.dragArea;
                    }
                    break;
                case 'allowEditing':
                    this.wireEditingEvents(this.allowEditing);
                    break;
                case 'allowMultiSelection':
                    if (this.selectedNodes.length > 1) {
                        var sNode = this.getElement(this.selectedNodes[0]);
                        this.isLoaded = false;
                        this.removeSelectAll();
                        this.selectNode(sNode, null);
                        this.isLoaded = true;
                    }
                    this.setMultiSelect(this.allowMultiSelection);
                    this.addMultiSelect(this.allowMultiSelection);
                    break;
                case 'allowTextWrap':
                    this.setTextWrap();
                    this.updateWrap();
                    break;
                case 'checkedNodes':
                    if (JSON.stringify(oldProp.checkedNodes) !== JSON.stringify(newProp.checkedNodes)) {
                        if (this.showCheckBox) {
                            this.checkedNodes = oldProp.checkedNodes;
                            this.setCheckedNodes(newProp.checkedNodes);
                        }
                    }
                    break;
                case 'autoCheck':
                    if (this.showCheckBox) {
                        this.autoCheck = newProp.autoCheck;
                        this.ensureIndeterminate();
                    }
                    break;
                case 'cssClass':
                    this.setCssClass(oldProp.cssClass, newProp.cssClass);
                    break;
                case 'enableRtl':
                    this.setEnableRtl();
                    break;
                case 'expandedNodes':
                    this.isAnimate = false;
                    this.setProperties({ expandedNodes: [] }, true);
                    this.collapseAll();
                    this.isInitalExpand = true;
                    this.setProperties({ expandedNodes: isNullOrUndefined(newProp.expandedNodes) ? [] : newProp.expandedNodes }, true);
                    this.doExpandAction();
                    this.isInitalExpand = false;
                    this.isAnimate = true;
                    break;
                case 'expandOn':
                    this.wireExpandOnEvent(false);
                    this.setExpandOnType();
                    if (this.expandOnType !== 'None' && !this.disabled) {
                        this.wireExpandOnEvent(true);
                    }
                    break;
                case 'disabled':
                    this.setDisabledMode();
                    this.dynamicState();
                    break;
                case 'fields':
                    this.isAnimate = false;
                    this.isFieldChange = true;
                    this.initialRender = true;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (!this.isReact || this.isReact && !(this.fields.dataSource instanceof DataManager)) {
                        if (!this.element.classList.contains('e-filtering')) {
                            this.DDTTreeData = JSON.parse(JSON.stringify(this.fields.dataSource));
                        }
                        this.reRenderNodes();
                    }
                    this.initialRender = false;
                    this.isAnimate = true;
                    this.isFieldChange = false;
                    break;
                case 'fullRowSelect':
                    this.setFullRow(this.fullRowSelect);
                    this.addFullRow(this.fullRowSelect);
                    if (this.allowTextWrap) {
                        this.setTextWrap();
                        this.updateWrap();
                    }
                    break;
                case 'loadOnDemand':
                    if (this.loadOnDemand === false && !this.onLoaded) {
                        var nodes = this.element.querySelectorAll('li');
                        var i = 0;
                        while (i < nodes.length) {
                            if (nodes[parseInt(i.toString(), 10)].getAttribute('aria-expanded') !== 'true') {
                                this.renderChildNodes(nodes[parseInt(i.toString(), 10)], true, null, true);
                            }
                            i++;
                        }
                        this.onLoaded = true;
                    }
                    break;
                case 'nodeTemplate':
                    this.hasTemplate = false;
                    this.nodeTemplateFn = this.templateComplier(this.nodeTemplate);
                    this.reRenderNodes();
                    break;
                case 'selectedNodes':
                    this.removeSelectAll();
                    this.setProperties({ selectedNodes: newProp.selectedNodes }, true);
                    this.doSelectionAction();
                    break;
                case 'showCheckBox':
                case 'checkDisabledChildren':
                    this.reRenderNodes();
                    break;
                case 'sortOrder':
                    this.reRenderNodes();
                    break;
                case 'fullRowNavigable':
                    this.setProperties({ fullRowNavigable: newProp.fullRowNavigable }, true);
                    this.listBaseOption.itemNavigable = newProp.fullRowNavigable;
                    this.reRenderNodes();
                    break;
            }
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers. It also removes the attributes and classes.
     *
     * @returns {void}
     */
    TreeView.prototype.destroy = function () {
        this.clearTemplate();
        this.element.removeAttribute('aria-activedescendant');
        this.unWireEvents();
        this.wireEditingEvents(false);
        if (!this.disabled) {
            this.rippleFn();
            this.rippleIconFn();
        }
        this.setCssClass(this.cssClass, null);
        this.setDragAndDrop(false);
        this.setFullRow(false);
        if (this.ulElement && this.ulElement.parentElement) {
            this.ulElement.parentElement.removeChild(this.ulElement);
        }
        this.ulElement = null;
        this.liList = null;
        this.startNode = null;
        this.firstTap = null;
        this.expandArgs = null;
        this.dragLi = null;
        this.dragTarget = null;
        this.dragParent = null;
        this.dragObj = null;
        this.dropObj = null;
        this.inputObj = null;
        this.touchEditObj = null;
        this.touchExpandObj = null;
        this.touchClickObj = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Adds the collection of TreeView nodes based on target and index position. If target node is not specified,
     * then the nodes are added as children of the given parentID or in the root level of TreeView.
     *
     * @param  { object } nodes - Specifies the array of JSON data that has to be added.
     * @param  { string | Element } target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  { number } index - Specifies the index to place the newly added nodes in the target element.
     * @param { boolean } preventTargetExpand - If set to true, the target parent node will be prevented from auto expanding.
     * @returns {void}
     */
    TreeView.prototype.addNodes = function (nodes, target, index, preventTargetExpand) {
        if (isNullOrUndefined(nodes)) {
            return;
        }
        nodes = JSON.parse(JSON.stringify(nodes));
        var dropLi = this.getElement(target);
        this.preventExpand = preventTargetExpand;
        if (this.fields.dataSource instanceof DataManager) {
            if (!this.isOffline) {
                this.crudOperation('insert', null, target, null, nodes, index, this.preventExpand);
            }
            else {
                this.addSuccess(nodes, dropLi, index);
            }
        }
        else if (this.dataType === 2) {
            this.addGivenNodes(nodes, dropLi, index);
        }
        else {
            if (dropLi) {
                this.addGivenNodes(nodes, dropLi, index);
            }
            else {
                nodes = this.getSortedData(nodes);
                for (var i = 0; i < nodes.length; i++) {
                    var pid = getValue(this.fields.parentID, nodes[parseInt(i.toString(), 10)]);
                    dropLi = pid ? this.getElement(pid.toString()) : pid;
                    if (!isNullOrUndefined(pid) && isNullOrUndefined(dropLi)) {
                        this.isHiddenItem = true;
                        this.preventExpand = false;
                        this.ensureVisible(pid);
                        this.preventExpand = preventTargetExpand;
                        this.isHiddenItem = false;
                        dropLi = this.getElement(pid.toString());
                    }
                    this.addGivenNodes([nodes[parseInt(i.toString(), 10)]], dropLi, index);
                }
            }
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        this.setNodeFocusable();
        this.updateCheckedStateFromDS();
        if (this.showCheckBox && dropLi) {
            this.ensureParentCheckState(dropLi);
        }
        if ((this.fields.dataSource instanceof DataManager === false)) {
            this.preventExpand = false;
            this.triggerEvent('addNodes', nodes);
        }
    };
    /**
     * Editing can also be enabled by using the `beginEdit` property, instead of clicking on the
     * TreeView node. On passing the node ID or element through this property, the edit textBox
     * will be created for the particular node thus allowing us to edit it.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @returns {void}
     */
    TreeView.prototype.beginEdit = function (node) {
        var ele = this.getElement(node);
        if (isNullOrUndefined(ele) || this.disabled) {
            return;
        }
        this.createTextbox(ele);
    };
    /**
     * Checks all the unchecked nodes. You can also check specific nodes by passing array of unchecked nodes
     * as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.checkAll = function (nodes) {
        if (this.showCheckBox) {
            this.doCheckBoxAction(nodes, true);
        }
    };
    /**
     * Collapses all the expanded TreeView nodes. You can collapse specific nodes by passing array of nodes as argument to this method.
     * You can also collapse all the nodes excluding the hidden nodes by setting **excludeHiddenNodes** to true. If you want to collapse
     * a specific level of nodes, set **level** as argument to collapseAll method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/ array of TreeView node.
     * @param  {number} level - TreeView nodes will collapse up to the given level.
     * @param  {boolean} excludeHiddenNodes - Whether or not to exclude hidden nodes of TreeView when collapsing all nodes.
     * @returns {void}
     */
    TreeView.prototype.collapseAll = function (nodes, level, excludeHiddenNodes) {
        if (!isNullOrUndefined(nodes)) {
            this.doGivenAction(nodes, COLLAPSIBLE, false);
        }
        else {
            if (level > 0) {
                this.collapseByLevel(select('.' + PARENTITEM, this.element), level, excludeHiddenNodes);
            }
            else {
                this.collapseAllNodes(excludeHiddenNodes);
            }
        }
    };
    /**
     * Disables the collection of nodes by passing the ID of nodes or node elements in the array.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @returns {void}
     */
    TreeView.prototype.disableNodes = function (nodes) {
        if (!isNullOrUndefined(nodes)) {
            this.doDisableAction(nodes);
        }
    };
    /**
     * Enables the collection of disabled nodes by passing the ID of nodes or node elements in the array.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @returns {void}
     */
    TreeView.prototype.enableNodes = function (nodes) {
        if (!isNullOrUndefined(nodes)) {
            this.doEnableAction(nodes);
        }
    };
    /**
     * Ensures visibility of the TreeView node by using node ID or node element.
     * When many TreeView nodes are present and we need to find a particular node, `ensureVisible` property
     * helps bring the node to visibility by expanding the TreeView and scrolling to the specific node.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView nodes.
     * @returns {void}
     */
    TreeView.prototype.ensureVisible = function (node) {
        var parentsId = [];
        if (this.dataType === 1) {
            var nodeData = this.getTreeData(node);
            while (nodeData.length !== 0 && !isNullOrUndefined(nodeData[0][this.fields.parentID])) {
                parentsId.push(nodeData[0][this.fields.parentID].toString());
                nodeData = this.getTreeData(nodeData[0][this.fields.parentID].toString());
            }
        }
        else if (this.dataType === 2) {
            parentsId = this.getHierarchicalParentId(node, this.treeData, parentsId);
        }
        this.expandAll(parentsId.reverse(), null, null, this.isHiddenItem);
        var liEle = this.getElement(node);
        if (!isNullOrUndefined(liEle)) {
            if (typeof node == 'object') {
                var parents = this.parents(liEle, '.' + LISTITEM);
                this.expandAll(parents);
            }
            setTimeout(function () { liEle.scrollIntoView({ behavior: 'smooth' }); }, 450);
        }
    };
    /**
     * Expands all the collapsed TreeView nodes. You can expand the specific nodes by passing the array of collapsed nodes
     * as argument to this method. You can also expand all the collapsed nodes by excluding the hidden nodes by setting
     * **excludeHiddenNodes** to true to this method. To expand a specific level of nodes, set **level** as argument to expandAll method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @param  {number} level - TreeView nodes will expand up to the given level.
     * @param  {boolean} excludeHiddenNodes - Whether or not to exclude hidden nodes when expanding all nodes.
     * @param  {boolean} preventAnimation - Prevent the expand animation when expanding all nodes.
     * @returns {void}
     */
    TreeView.prototype.expandAll = function (nodes, level, excludeHiddenNodes, preventAnimation) {
        this.isAnimate = !preventAnimation;
        if (!isNullOrUndefined(nodes)) {
            this.doGivenAction(nodes, EXPANDABLE, true);
        }
        else {
            if (level > 0) {
                this.expandByLevel(select('.' + PARENTITEM, this.element), level, excludeHiddenNodes);
            }
            else {
                this.expandAllNodes(excludeHiddenNodes);
                if (!this.loadOnDemand || this.element.classList.contains('e-filtering')) {
                    this.updateAttributes(this.element);
                    this.updateList();
                }
            }
        }
        this.isAnimate = true;
    };
    /**
     * Gets all the checked nodes including child, whether it is loaded or not.
     *
     * @returns {string[]} - An array of strings representing the unique identifiers of checked nodes.
     */
    TreeView.prototype.getAllCheckedNodes = function () {
        var checkNodes = this.checkedNodes;
        return checkNodes;
    };
    /**
     * Gets all the disabled nodes including child, whether it is loaded or not.
     *
     * @returns {string[]} An array of strings representing the unique identifiers of disabled nodes.
     */
    TreeView.prototype.getDisabledNodes = function () {
        var disabledNodes = this.disableNode;
        return disabledNodes;
    };
    /**
     * Gets the node's data such as id, text, parentID, selected, isChecked, and expanded by passing the node element or it's ID.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @returns {Object} - The data associated with the specified node.
     */
    TreeView.prototype.getNode = function (node) {
        var ele = this.getElement(node);
        return this.getNodeData(ele, true);
    };
    /**
     * To get the updated data source of TreeView after performing some operation like drag and drop, node editing,
     * node selecting/unSelecting, node expanding/collapsing, node checking/unChecking, adding and removing node.
     * * If you pass the ID of TreeView node as arguments for this method then it will return the updated data source
     * of the corresponding node otherwise it will return the entire updated data source of TreeView.
     * * The updated data source also contains custom attributes if you specified in data source.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @isGenericType true
     * @returns {Object} - The tree data associated with the specified node or element.
     */
    TreeView.prototype.getTreeData = function (node) {
        var id = this.getId(node);
        this.updatePersistProp();
        if (isNullOrUndefined(id)) {
            return this.treeData;
        }
        else {
            var data = this.getNodeObject(id);
            return isNullOrUndefined(data) ? [] : [data];
        }
    };
    /**
     * Moves the collection of nodes within the same TreeView based on target or its index position.
     *
     * @param  {string[] | Element[]} sourceNodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @param  {string | Element} target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  {number} index - Specifies the index to place the moved nodes in the target element.
     * @param { boolean } preventTargetExpand - If set to true, the target parent node will be prevented from auto expanding.
     * @returns {void}
     */
    TreeView.prototype.moveNodes = function (sourceNodes, target, index, preventTargetExpand) {
        if (isNullOrUndefined(sourceNodes) || sourceNodes.length === 0) {
            return;
        }
        var dropLi = this.getElement(target);
        var nodeData = [];
        if (isNullOrUndefined(dropLi)) {
            this.isHiddenItem = true;
            this.ensureVisible(target);
            this.isHiddenItem = false;
            dropLi = this.getElement(target);
        }
        for (var i = 0; i < sourceNodes.length; i++) {
            var dragLi = this.getElement(sourceNodes[parseInt(i.toString(), 10)]);
            nodeData.push(this.getNode(dragLi));
            if (isNullOrUndefined(dragLi) || dropLi.isSameNode(dragLi) || this.isDescendant(dragLi, dropLi)) {
                continue;
            }
            this.preventExpand = preventTargetExpand;
            this.dropAsChildNode(dragLi, dropLi, this, index, null, null, null, dropLi);
        }
        if (this.fields.dataSource instanceof DataManager === false) {
            this.preventExpand = false;
        }
        this.triggerEvent('moveNodes', nodeData);
    };
    /**
     * Refreshes a particular node of the TreeView.
     *
     * @param  {string | Element} target - Specifies the ID of TreeView node or TreeView node as target element.
     * @param  {Object[]} newData - Specifies the new data of TreeView node.
     * @returns {void}
     * ```typescript
     * var treeObj = document.getElementById("treeview").ej2_instances[0];
     * var data = treeObj.getTreeData("01");
     * var newData = {
     *   id: data[0].id,
     *   name: "new Text",
     * };
     * treeObj.refreshNode("01", [newData]);
     * ```
     */
    TreeView.prototype.refreshNode = function (target, newData) {
        if (isNullOrUndefined(target) || isNullOrUndefined(newData)) {
            return;
        }
        var isRefreshChild = false;
        if (this.dataType === 1 && newData.length > 1) {
            isRefreshChild = true;
        }
        else if (this.dataType === 2 && newData.length === 1) {
            var updatedChildValue = getValue(this.fields.child.toString(), newData[0]);
            if (!isNullOrUndefined(updatedChildValue)) {
                isRefreshChild = true;
            }
        }
        var liEle = this.getElement(target);
        var id = liEle ? liEle.getAttribute('data-uid') : ((target) ? target.toString() : null);
        this.refreshData = this.getNodeObject(id);
        newData = JSON.parse(JSON.stringify(newData));
        var newNodeData;
        var parentData;
        if (this.dataType === 1 && isRefreshChild) {
            for (var k = 0; k < newData.length; k++) {
                if (isNullOrUndefined(newData[parseInt(k.toString(), 10)][this.fields.parentID])) {
                    parentData = newData[parseInt(k.toString(), 10)];
                    newData.splice(k, 1);
                    break;
                }
            }
            newNodeData = extend({}, this.refreshData, parentData);
        }
        else {
            newNodeData = extend({}, this.refreshData, newData[0]);
        }
        if (isNullOrUndefined(liEle)) {
            this.updatePosition(id, newNodeData, isRefreshChild, newData);
            return;
        }
        this.isRefreshed = true;
        var level = parseFloat(liEle.getAttribute('aria-level'));
        var newliEle = ListBase.createListItemFromJson(this.createElement, [newNodeData], this.listBaseOption, level);
        var ul = select('.' + PARENTITEM, liEle);
        var childItems = getValue(this.fields.child.toString(), newNodeData);
        if ((isRefreshChild && ul) || (isRefreshChild && !isNullOrUndefined(childItems))) {
            var parentEle = liEle.parentElement;
            var index = Array.prototype.indexOf.call(parentEle.childNodes, liEle);
            remove(liEle);
            parentEle.insertBefore(newliEle[0], parentEle.childNodes[parseInt(index.toString(), 10)]);
            this.updatePosition(id, newNodeData, isRefreshChild, newData);
            if (isRefreshChild && ul) {
                this.expandAll([id]);
            }
        }
        else {
            var txtEle = select('.' + TEXTWRAP, liEle);
            var newTextEle = select('.' + TEXTWRAP, newliEle[0]);
            var icon = select('div.' + ICON, txtEle);
            var newIcon = select('div.' + ICON, newTextEle);
            if (icon && newIcon) {
                if (newIcon.classList.contains(EXPANDABLE) && icon.classList.contains(COLLAPSIBLE)) {
                    removeClass([newIcon], EXPANDABLE);
                    addClass([newIcon], COLLAPSIBLE);
                }
                else if (newIcon.classList.contains(COLLAPSIBLE) && icon.classList.contains(EXPANDABLE)) {
                    removeClass([newIcon], COLLAPSIBLE);
                    addClass([newIcon], EXPANDABLE);
                }
                else if (icon.classList.contains('interaction')) {
                    addClass([newIcon], 'interaction');
                }
            }
            remove(txtEle);
            var fullEle = select('.' + FULLROW, liEle);
            fullEle.parentNode.insertBefore(newTextEle, fullEle.nextSibling);
            this.updatePosition(id, newNodeData, isRefreshChild, newData);
        }
        liEle = this.getElement(target);
        if (newNodeData[this.fields.tooltip]) {
            liEle.setAttribute('title', newNodeData[this.fields.tooltip]);
        }
        if (Object.prototype.hasOwnProperty.call(newNodeData, this.fields.htmlAttributes) && newNodeData[this.fields.htmlAttributes]) {
            var attr = {};
            merge(attr, newNodeData[this.fields.htmlAttributes]);
            if (attr.class) {
                addClass([liEle], attr.class.split(' '));
                delete attr.class;
            }
            else {
                attributes(liEle, attr);
            }
        }
        if (this.selectedNodes.indexOf(id) !== -1) {
            liEle.setAttribute('aria-selected', 'true');
            addClass([liEle], ACTIVE);
        }
        this.isRefreshed = false;
        this.triggerEvent('refreshNode', [this.getNode(liEle)]);
    };
    /**
     * Removes the collection of TreeView nodes by passing the array of node details as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.removeNodes = function (nodes) {
        if (!isNullOrUndefined(nodes)) {
            if (this.fields.dataSource instanceof DataManager && !this.isOffline) {
                this.crudOperation('delete', nodes);
            }
            else {
                this.deleteSuccess(nodes);
            }
        }
    };
    /**
     * Replaces the text of the TreeView node with the given text only when the `allowEditing` property is enabled.
     *
     * @param  {string | Element} target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  {string} newText - Specifies the new text of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.updateNode = function (target, newText) {
        var _this = this;
        if (isNullOrUndefined(target) || isNullOrUndefined(newText) || !this.allowEditing) {
            return;
        }
        var liEle = this.getElement(target);
        if (isNullOrUndefined(liEle)) {
            return;
        }
        var txtEle = select('.' + LISTTEXT, liEle);
        this.updateOldText(liEle);
        var eventArgs = this.getEditEvent(liEle, null, null);
        this.trigger('nodeEditing', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                if (_this.fields.dataSource instanceof DataManager && !_this.isOffline) {
                    _this.crudOperation('update', null, target, newText, null, null, false);
                }
                else {
                    _this.appendNewText(liEle, txtEle, newText, false);
                }
            }
        });
    };
    /**
     * Unchecks all the checked nodes. You can also uncheck the specific nodes by passing array of checked nodes
     * as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.uncheckAll = function (nodes) {
        if (this.showCheckBox) {
            this.doCheckBoxAction(nodes, false);
        }
    };
    TreeView.prototype.setNodeFocusable = function () {
        var firstNode = select('.' + LISTITEM, this.element);
        if (firstNode) {
            firstNode.setAttribute('tabindex', '0');
            this.updateIdAttr(null, firstNode);
        }
    };
    var TreeView_1;
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "allowDragAndDrop", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "allowEditing", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "allowMultiSelection", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "allowTextWrap", void 0);
    __decorate$8([
        Complex({}, NodeAnimationSettings)
    ], TreeView.prototype, "animation", void 0);
    __decorate$8([
        Property()
    ], TreeView.prototype, "checkedNodes", void 0);
    __decorate$8([
        Property(true)
    ], TreeView.prototype, "checkDisabledChildren", void 0);
    __decorate$8([
        Property('')
    ], TreeView.prototype, "cssClass", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "disabled", void 0);
    __decorate$8([
        Property(null)
    ], TreeView.prototype, "dragArea", void 0);
    __decorate$8([
        Property(true)
    ], TreeView.prototype, "enableHtmlSanitizer", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "enablePersistence", void 0);
    __decorate$8([
        Property()
    ], TreeView.prototype, "expandedNodes", void 0);
    __decorate$8([
        Property('Auto')
    ], TreeView.prototype, "expandOn", void 0);
    __decorate$8([
        Complex({}, FieldsSettings)
    ], TreeView.prototype, "fields", void 0);
    __decorate$8([
        Property(true)
    ], TreeView.prototype, "fullRowSelect", void 0);
    __decorate$8([
        Property(true)
    ], TreeView.prototype, "loadOnDemand", void 0);
    __decorate$8([
        Property()
    ], TreeView.prototype, "locale", void 0);
    __decorate$8([
        Property()
    ], TreeView.prototype, "nodeTemplate", void 0);
    __decorate$8([
        Property()
    ], TreeView.prototype, "selectedNodes", void 0);
    __decorate$8([
        Property('None')
    ], TreeView.prototype, "sortOrder", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "showCheckBox", void 0);
    __decorate$8([
        Property(true)
    ], TreeView.prototype, "autoCheck", void 0);
    __decorate$8([
        Property(false)
    ], TreeView.prototype, "fullRowNavigable", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "actionFailure", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "created", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "dataBound", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "dataSourceChanged", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "drawNode", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "destroyed", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "keyPress", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeChecked", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeChecking", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeClicked", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeCollapsed", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeCollapsing", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeDragging", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeDragStart", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeDragStop", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeDropped", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeEdited", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeEditing", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeExpanded", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeExpanding", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeSelected", void 0);
    __decorate$8([
        Event()
    ], TreeView.prototype, "nodeSelecting", void 0);
    TreeView = TreeView_1 = __decorate$8([
        NotifyPropertyChanges
    ], TreeView);
    return TreeView;
}(Component));

var __extends$9 = (undefined && undefined.__extends) || (function () {
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
var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CONTROL$1 = 'e-control';
var ROOT$1 = 'e-sidebar';
var DOCKER = 'e-dock';
var CLOSE = 'e-close';
var OPEN = 'e-open';
var TRASITION = 'e-transition';
var DEFAULTBACKDROP = 'e-sidebar-overlay';
var RTL$2 = 'e-rtl';
var RIGHT = 'e-right';
var LEFT = 'e-left';
var OVER = 'e-over';
var PUSH = 'e-push';
var SLIDE = 'e-slide';
var VISIBILITY = 'e-visibility';
var DISPLAY = 'e-sidebar-display';
var MAINCONTENTANIMATION = 'e-content-animation';
var DISABLEANIMATION = 'e-disable-animation';
var CONTEXT = 'e-sidebar-context';
var SIDEBARABSOLUTE = 'e-sidebar-absolute';
/**
 * Sidebar is an expandable or collapsible
 * component that typically act as a side container to place the primary or secondary content alongside of the main content.
 * ```html
 * <aside id="sidebar">
 * </aside>
 * ```
 * ```typescript
 * <script>
 *   let sidebarObject: Sidebar = new Sidebar();
 *   sidebarObject.appendTo("#sidebar");
 * </script>
 * ```
 */
var Sidebar = /** @class */ (function (_super) {
    __extends$9(Sidebar, _super);
    function Sidebar(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.documentClickContext = _this.documentclickHandler.bind(_this);
        return _this;
    }
    Sidebar.prototype.preRender = function () {
        this.setWidth();
    };
    Sidebar.prototype.render = function () {
        this.initialize();
        this.wireEvents();
        this.renderComplete();
    };
    Sidebar.prototype.initialize = function () {
        this.setTarget();
        this.addClass();
        this.setZindex();
        if (this.enableDock) {
            this.setDock();
        }
        if (this.isOpen) {
            this.show();
            this.firstRender = true;
        }
        else {
            this.setMediaQuery();
        }
        this.checkType(true);
        this.setType(this.type);
        this.setCloseOnDocumentClick();
        this.setEnableRTL();
        if (Browser.isDevice) {
            this.windowWidth = window.innerWidth;
        }
    };
    Sidebar.prototype.setEnableRTL = function () {
        (this.enableRtl ? addClass : removeClass)([this.element], RTL$2);
    };
    Sidebar.prototype.setTarget = function () {
        this.targetEle = this.element.nextElementSibling;
        this.sidebarEleCopy = this.element.cloneNode(true);
        if (typeof (this.target) === 'string') {
            this.setProperties({ target: document.querySelector(this.target) }, true);
        }
        if (this.target) {
            this.target.insertBefore(this.element, this.target.children[0]);
            addClass([this.element], SIDEBARABSOLUTE);
            addClass([this.target], CONTEXT);
            this.targetEle = this.getTargetElement();
        }
    };
    Sidebar.prototype.getTargetElement = function () {
        var siblingElement = this.element.nextElementSibling;
        while (!isNullOrUndefined(siblingElement)) {
            if (!siblingElement.classList.contains(ROOT$1)) {
                break;
            }
            siblingElement = siblingElement.nextElementSibling;
        }
        return siblingElement;
    };
    Sidebar.prototype.setCloseOnDocumentClick = function () {
        if (this.closeOnDocumentClick) {
            document.addEventListener('mousedown', this.documentClickContext);
            document.addEventListener('touchstart', this.documentClickContext);
        }
        else {
            document.removeEventListener('mousedown', this.documentClickContext);
            document.removeEventListener('touchstart', this.documentClickContext);
        }
    };
    Sidebar.prototype.setWidth = function () {
        if (this.enableDock && this.position === 'Left') {
            setStyleAttribute(this.element, { 'width': this.setDimension(this.dockSize) });
        }
        else if (this.enableDock && this.position === 'Right') {
            setStyleAttribute(this.element, { 'width': this.setDimension(this.dockSize) });
        }
        else if (!this.enableDock) {
            setStyleAttribute(this.element, { 'width': this.setDimension(this.width) });
        }
    };
    Sidebar.prototype.setDimension = function (width) {
        if (typeof width === 'number') {
            width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            width = (width.match(/px|%|em/)) ? width : formatUnit(width);
        }
        else {
            width = '100%';
        }
        return width;
    };
    Sidebar.prototype.setZindex = function () {
        setStyleAttribute(this.element, { 'z-index': '' + this.zIndex });
    };
    Sidebar.prototype.addClass = function () {
        if (this.element.tagName === 'EJS-SIDEBAR') {
            addClass([this.element], DISPLAY);
        }
        var classELement = document.querySelector('.e-main-content');
        if (!isNullOrUndefined(classELement || this.targetEle)) {
            addClass([classELement || this.targetEle], [MAINCONTENTANIMATION]);
        }
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : null;
        if (!this.enableDock && this.type !== 'Auto') {
            addClass([this.element], [VISIBILITY]);
        }
        removeClass([this.element], [OPEN, CLOSE, RIGHT, LEFT, SLIDE, PUSH, OVER]);
        this.element.classList.add(ROOT$1);
        addClass([this.element], (this.position === 'Right') ? RIGHT : LEFT);
        if (this.enableDock) {
            addClass([this.element], DOCKER);
        }
        if (!isNullOrUndefined(this.tabIndex)) {
            this.element.setAttribute('tabindex', this.tabIndex);
        }
        if (this.type === 'Auto' && !Browser.isDevice && this.checkMediaQuery()) {
            this.show();
        }
        else if (!this.isOpen) {
            addClass([this.element], [CLOSE, DISABLEANIMATION]);
        }
    };
    Sidebar.prototype.checkType = function (val) {
        if (!(this.type === 'Push' || this.type === 'Over' || this.type === 'Slide')) {
            this.type = 'Auto';
        }
        else {
            if (!this.element.classList.contains(CLOSE) && !val) {
                this.hide();
            }
        }
    };
    Sidebar.prototype.transitionEnd = function (e) {
        this.setDock();
        if (!isNullOrUndefined(e) && !this.firstRender) {
            this.triggerChange();
        }
        this.firstRender = false;
        EventHandler.remove(this.element, 'transitionend', this.transitionEnd);
    };
    Sidebar.prototype.destroyBackDrop = function () {
        var sibling = document.querySelector('.e-main-content') || this.targetEle;
        if (this.target && this.showBackdrop && sibling && !isNullOrUndefined(this.defaultBackdropDiv)) {
            removeClass([this.defaultBackdropDiv], DEFAULTBACKDROP);
        }
        else if (this.showBackdrop && this.modal) {
            this.modal.style.display = 'none';
            this.modal.outerHTML = '';
            this.modal = null;
        }
    };
    /**
     * Hide the Sidebar component, if it is in an open state.
     *
     * @param {Event} e - The event triggering the hide action.
     * @returns {void}
     *
     */
    Sidebar.prototype.hide = function (e) {
        var _this = this;
        var closeArguments = {
            model: this,
            element: this.element,
            cancel: false,
            isInteracted: !isNullOrUndefined(e),
            event: (e || null)
        };
        this.trigger('close', closeArguments, function (observedcloseArgs) {
            if (!observedcloseArgs.cancel) {
                if (_this.element.classList.contains(CLOSE)) {
                    return;
                }
                if (_this.element.classList.contains(OPEN) && !_this.animate) {
                    _this.triggerChange();
                }
                addClass([_this.element], CLOSE);
                removeClass([_this.element], OPEN);
                setStyleAttribute(_this.element, { 'width': formatUnit(_this.enableDock ? _this.dockSize : _this.width) });
                _this.setType(_this.type);
                var sibling = document.querySelector('.e-main-content') || _this.targetEle;
                if (!_this.enableDock && sibling) {
                    sibling.style.transform = 'translateX(' + 0 + 'px)';
                    sibling.style[_this.position === 'Left' ? 'marginLeft' : 'marginRight'] = '0px';
                }
                _this.destroyBackDrop();
                _this.setAnimation();
                if (_this.type === 'Slide') {
                    document.body.classList.remove('e-sidebar-overflow');
                }
                _this.setProperties({ isOpen: false }, true);
                if (_this.enableDock) {
                    setTimeout(function () { return _this.setTimeOut(); }, 50);
                }
                EventHandler.add(_this.element, 'transitionend', _this.transitionEnd, _this);
            }
        });
    };
    Sidebar.prototype.setTimeOut = function () {
        var sibling = document.querySelector('.e-main-content') || this.targetEle;
        var elementWidth = this.element.getBoundingClientRect().width;
        if (this.element.classList.contains(OPEN) && sibling && !(this.type === 'Over' && this.enableDock)) {
            if (this.position === 'Left') {
                sibling.style.marginLeft = this.setDimension(this.width === 'auto' ? elementWidth : this.width);
            }
            else {
                sibling.style.marginRight = this.setDimension(this.width === 'auto' ? elementWidth : this.width);
            }
        }
        else if (this.element.classList.contains(CLOSE) && sibling) {
            if (this.position === 'Left') {
                sibling.style.marginLeft = this.setDimension(this.dockSize === 'auto' ? elementWidth : this.dockSize);
            }
            else {
                sibling.style.marginRight = this.setDimension(this.dockSize === 'auto' ? elementWidth : this.dockSize);
            }
        }
    };
    /**
     * Shows the Sidebar component, if it is in closed state.
     *
     * @param {Event} e - The optional event triggering the show action.
     * @returns {void}
     */
    Sidebar.prototype.show = function (e) {
        var _this = this;
        var openArguments = {
            model: this,
            element: this.element,
            cancel: false,
            isInteracted: !isNullOrUndefined(e),
            event: (e || null)
        };
        this.trigger('open', openArguments, function (observedopenArgs) {
            if (!observedopenArgs.cancel) {
                removeClass([_this.element], [VISIBILITY, DISABLEANIMATION]);
                if (_this.element.classList.contains(OPEN)) {
                    return;
                }
                if (_this.element.classList.contains(CLOSE) && !_this.animate) {
                    _this.triggerChange();
                }
                addClass([_this.element], [OPEN, TRASITION]);
                setStyleAttribute(_this.element, { 'transform': '' });
                removeClass([_this.element], CLOSE);
                setStyleAttribute(_this.element, { 'width': formatUnit(_this.width) });
                _this.setType(_this.type);
                _this.createBackDrop();
                _this.setAnimation();
                if (_this.type === 'Slide') {
                    document.body.classList.add('e-sidebar-overflow');
                }
                _this.setProperties({ isOpen: true }, true);
                EventHandler.add(_this.element, 'transitionend', _this.transitionEnd, _this);
            }
        });
    };
    Sidebar.prototype.setAnimation = function () {
        if (this.animate) {
            removeClass([this.element], DISABLEANIMATION);
        }
        else {
            addClass([this.element], DISABLEANIMATION);
        }
    };
    Sidebar.prototype.triggerChange = function () {
        var changeArguments = { name: 'change', element: this.element };
        this.trigger('change', changeArguments);
    };
    Sidebar.prototype.setDock = function () {
        if (this.enableDock && this.position === 'Left' && !this.getState()) {
            setStyleAttribute(this.element, { 'transform': 'translateX(' + -100 + '%) translateX(' + this.setDimension(this.dockSize) + ')' });
        }
        else if (this.enableDock && this.position === 'Right' && !this.getState()) {
            setStyleAttribute(this.element, { 'transform': 'translateX(' + 100 + '%) translateX(' + '-' + this.setDimension(this.dockSize) + ')' });
        }
        if (this.element.classList.contains(CLOSE) && this.enableDock) {
            setStyleAttribute(this.element, { 'width': this.setDimension(this.dockSize) });
        }
    };
    Sidebar.prototype.createBackDrop = function () {
        if (this.target && this.showBackdrop && this.getState()) {
            var targetString = this.target;
            var sibling = document.querySelector('.e-main-content') || this.targetEle;
            this.defaultBackdropDiv = this.createElement('div');
            addClass([this.defaultBackdropDiv], DEFAULTBACKDROP);
            setStyleAttribute(this.defaultBackdropDiv, { height: targetString.style.height });
            sibling.appendChild(this.defaultBackdropDiv);
        }
        else if (this.showBackdrop && !this.modal && this.getState()) {
            this.modal = this.createElement('div');
            this.modal.className = DEFAULTBACKDROP;
            this.modal.style.display = 'block';
            document.body.appendChild(this.modal);
        }
    };
    Sidebar.prototype.getPersistData = function () {
        return this.addOnPersist(['type', 'position', 'isOpen']);
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - returns module name.
     * @private
     *
     */
    Sidebar.prototype.getModuleName = function () {
        return 'sidebar';
    };
    /**
     * Shows or hides the Sidebar based on the current state.
     *
     * @returns {void}
     */
    Sidebar.prototype.toggle = function () {
        if (this.element.classList.contains(OPEN)) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    Sidebar.prototype.getState = function () {
        return this.element.classList.contains(OPEN) ? true : false;
    };
    Sidebar.prototype.setMediaQuery = function () {
        if (this.mediaQuery) {
            var media = false;
            if (typeof (this.mediaQuery) === 'string') {
                media = window.matchMedia(this.mediaQuery).matches;
            }
            else {
                media = (this.mediaQuery).matches;
            }
            if (media && this.windowWidth !== window.innerWidth) {
                this.show();
            }
            else if (this.getState() && this.windowWidth !== window.innerWidth) {
                this.hide();
            }
        }
    };
    Sidebar.prototype.checkMediaQuery = function () {
        if (isNullOrUndefined(this.mediaQuery)) {
            return true;
        }
        return (typeof (this.mediaQuery) === 'string') ?
            window.matchMedia(this.mediaQuery).matches : (this.mediaQuery).matches;
    };
    Sidebar.prototype.resize = function () {
        if (!isNullOrUndefined(this.width) && this.width !== 'auto' && typeof this.width === 'string' && !this.width.includes('px')) {
            this.setType(this.type);
        }
        if (this.type === 'Auto') {
            if (Browser.isDevice) {
                addClass([this.element], OVER);
            }
            else {
                addClass([this.element], PUSH);
            }
        }
        this.setMediaQuery();
        if (Browser.isDevice) {
            this.windowWidth = window.innerWidth;
        }
    };
    Sidebar.prototype.documentclickHandler = function (e) {
        if (closest(e.target, '.' + CONTROL$1 + '' + '.' + ROOT$1)) {
            return;
        }
        this.hide(e);
    };
    Sidebar.prototype.enableGestureHandler = function (args) {
        if (!this.isOpen && this.position === 'Left' && args.swipeDirection === 'Right' &&
            (args.startX <= 20 && args.distanceX >= 50 && args.velocity >= 0.5)) {
            this.show();
        }
        else if (this.isOpen && this.position === 'Left' && args.swipeDirection === 'Left') {
            this.hide(args.originalEvent);
        }
        else if (this.isOpen && this.position === 'Right' && args.swipeDirection === 'Right') {
            this.hide(args.originalEvent);
        }
        else if (!this.isOpen && this.position === 'Right' && args.swipeDirection === 'Left'
            && (window.innerWidth - args.startX <= 20 && args.distanceX >= 50 && args.velocity >= 0.5)) {
            this.show();
        }
    };
    Sidebar.prototype.setEnableGestures = function () {
        if (this.enableGestures) {
            this.mainContentEle = new Touch(document.body, { swipe: this.enableGestureHandler.bind(this) });
            this.sidebarEle = new Touch(this.element, { swipe: this.enableGestureHandler.bind(this) });
        }
        else {
            if (this.mainContentEle && this.sidebarEle) {
                this.mainContentEle.destroy();
                this.sidebarEle.destroy();
            }
        }
    };
    Sidebar.prototype.wireEvents = function () {
        this.setEnableGestures();
        EventHandler.add(window, 'resize', this.resize, this);
    };
    Sidebar.prototype.unWireEvents = function () {
        EventHandler.remove(window, 'resize', this.resize);
        EventHandler.remove(document, 'mousedown touchstart', this.documentclickHandler);
        if (this.mainContentEle) {
            this.mainContentEle.destroy();
        }
        if (this.sidebarEle) {
            this.sidebarEle.destroy();
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {SidebarModel} newProp - specifies newProp value.
     * @param {SidebarModel} oldProp - specifies oldProp value.
     * @returns {void}
     * @private
     *
     */
    Sidebar.prototype.onPropertyChanged = function (newProp, oldProp) {
        var sibling = document.querySelector('.e-main-content') || this.targetEle;
        var isRendered = this.isServerRendered;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'isOpen':
                    if (this.isOpen) {
                        this.show();
                    }
                    else {
                        this.hide();
                    }
                    break;
                case 'width':
                    this.setWidth();
                    if (!this.getState()) {
                        this.setDock();
                    }
                    break;
                case 'animate':
                    this.setAnimation();
                    break;
                case 'type':
                    this.checkType(false);
                    removeClass([this.element], [VISIBILITY]);
                    this.addClass();
                    addClass([this.element], this.type === 'Auto' ? (Browser.isDevice ? ['e-over'] :
                        ['e-push']) : ['e-' + this.type.toLowerCase()]);
                    break;
                case 'position':
                    this.element.style.transform = '';
                    this.setDock();
                    if (sibling) {
                        sibling.style[this.position === 'Left' ? 'marginRight' : 'marginLeft'] = '0px';
                    }
                    if (this.position === 'Right') {
                        removeClass([this.element], LEFT);
                        addClass([this.element], RIGHT);
                    }
                    else {
                        removeClass([this.element], RIGHT);
                        addClass([this.element], LEFT);
                    }
                    this.setType(this.type);
                    break;
                case 'showBackdrop':
                    if (this.showBackdrop) {
                        this.createBackDrop();
                    }
                    else {
                        if (this.modal) {
                            this.modal.style.display = 'none';
                            this.modal.outerHTML = '';
                            this.modal = null;
                        }
                    }
                    break;
                case 'target':
                    if (typeof (this.target) === 'string') {
                        this.setProperties({ target: document.querySelector(this.target) }, true);
                    }
                    if (isNullOrUndefined(this.target)) {
                        removeClass([this.element], SIDEBARABSOLUTE);
                        removeClass([oldProp.target], CONTEXT);
                        setStyleAttribute(sibling, { 'margin-left': 0, 'margin-right': 0 });
                        document.body.insertAdjacentElement('afterbegin', this.element);
                    }
                    this.isServerRendered = false;
                    _super.prototype.refresh.call(this);
                    this.isServerRendered = isRendered;
                    break;
                case 'closeOnDocumentClick':
                    this.setCloseOnDocumentClick();
                    break;
                case 'enableDock':
                    if (!this.getState()) {
                        this.setDock();
                    }
                    break;
                case 'zIndex':
                    this.setZindex();
                    break;
                case 'mediaQuery':
                    this.setMediaQuery();
                    break;
                case 'enableGestures':
                    this.setEnableGestures();
                    break;
                case 'enableRtl':
                    this.setEnableRTL();
                    break;
            }
        }
    };
    Sidebar.prototype.setType = function (type) {
        var elementWidth = this.element.getBoundingClientRect().width;
        this.setZindex();
        var sibling = document.querySelector('.e-main-content') || this.targetEle;
        if (sibling) {
            sibling.style.transform = 'translateX(' + 0 + 'px)';
            if (!Browser.isDevice && this.type !== 'Auto' && !(this.type === 'Over' && this.enableDock)) {
                sibling.style[this.position === 'Left' ? 'marginLeft' : 'marginRight'] = '0px';
            }
        }
        var margin = this.position === 'Left' ? elementWidth + 'px' : elementWidth + 'px';
        var eleWidth = this.position === 'Left' ? elementWidth : -(elementWidth);
        removeClass([this.element], [PUSH, OVER, SLIDE]);
        switch (type) {
            case 'Push':
                addClass([this.element], [PUSH]);
                if (sibling && (this.enableDock || this.element.classList.contains(OPEN))) {
                    sibling.style[this.position === 'Left' ? 'marginLeft' : 'marginRight'] = margin;
                }
                break;
            case 'Slide':
                addClass([this.element], [SLIDE]);
                if (sibling && (this.enableDock || this.element.classList.contains(OPEN))) {
                    sibling.style.transform = 'translateX(' + eleWidth + 'px)';
                }
                break;
            case 'Over':
                addClass([this.element], [OVER]);
                if (this.enableDock && (this.element.classList.contains(CLOSE) || this.isOpen)) {
                    if (sibling) {
                        sibling.style[this.position === 'Left' ? 'marginLeft' : 'marginRight'] = this.setDimension(this.dockSize);
                    }
                }
                break;
            case 'Auto':
                addClass([this.element], [TRASITION]);
                if (Browser.isDevice) {
                    if (sibling && (this.enableDock) && !this.getState()) {
                        sibling.style[this.position === 'Left' ? 'marginLeft' : 'marginRight'] = margin;
                        addClass([this.element], PUSH);
                    }
                    else {
                        addClass([this.element], OVER);
                    }
                }
                else {
                    addClass([this.element], PUSH);
                    if (sibling && (this.enableDock || this.element.classList.contains(OPEN))) {
                        sibling.style[this.position === 'Left' ? 'marginLeft' : 'marginRight'] = margin;
                    }
                }
                this.createBackDrop();
        }
    };
    /**
     * Removes the control from the DOM and detaches all its related event handlers. Also it removes the attributes and classes.
     *
     * @returns {void}
     *
     */
    Sidebar.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.target) {
            removeClass([this.target], CONTEXT);
        }
        this.destroyBackDrop();
        if (this.element) {
            removeClass([this.element], [OPEN, CLOSE, PUSH, SLIDE, OVER, LEFT, RIGHT, TRASITION, DISABLEANIMATION]);
            removeClass([this.element], SIDEBARABSOLUTE);
            this.element.style.width = '';
            this.element.style.zIndex = '';
            this.element.style.transform = '';
            if (!isNullOrUndefined(this.sidebarEleCopy.getAttribute('tabindex'))) {
                this.element.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.element.removeAttribute('tabindex');
            }
        }
        this.windowWidth = null;
        var sibling = document.querySelector('.e-main-content') || this.targetEle;
        if (!isNullOrUndefined(sibling)) {
            sibling.style.margin = '';
            sibling.style.transform = '';
        }
        this.unWireEvents();
    };
    __decorate$9([
        Property('auto')
    ], Sidebar.prototype, "dockSize", void 0);
    __decorate$9([
        Property(null)
    ], Sidebar.prototype, "mediaQuery", void 0);
    __decorate$9([
        Property(false)
    ], Sidebar.prototype, "enableDock", void 0);
    __decorate$9([
        Property('en-US')
    ], Sidebar.prototype, "locale", void 0);
    __decorate$9([
        Property(false)
    ], Sidebar.prototype, "enablePersistence", void 0);
    __decorate$9([
        Property(true)
    ], Sidebar.prototype, "enableGestures", void 0);
    __decorate$9([
        Property(false)
    ], Sidebar.prototype, "isOpen", void 0);
    __decorate$9([
        Property(false)
    ], Sidebar.prototype, "enableRtl", void 0);
    __decorate$9([
        Property(true)
    ], Sidebar.prototype, "animate", void 0);
    __decorate$9([
        Property('auto')
    ], Sidebar.prototype, "height", void 0);
    __decorate$9([
        Property(false)
    ], Sidebar.prototype, "closeOnDocumentClick", void 0);
    __decorate$9([
        Property('Left')
    ], Sidebar.prototype, "position", void 0);
    __decorate$9([
        Property(null)
    ], Sidebar.prototype, "target", void 0);
    __decorate$9([
        Property(false)
    ], Sidebar.prototype, "showBackdrop", void 0);
    __decorate$9([
        Property('Auto')
    ], Sidebar.prototype, "type", void 0);
    __decorate$9([
        Property('auto')
    ], Sidebar.prototype, "width", void 0);
    __decorate$9([
        Property(1000)
    ], Sidebar.prototype, "zIndex", void 0);
    __decorate$9([
        Event()
    ], Sidebar.prototype, "created", void 0);
    __decorate$9([
        Event()
    ], Sidebar.prototype, "close", void 0);
    __decorate$9([
        Event()
    ], Sidebar.prototype, "open", void 0);
    __decorate$9([
        Event()
    ], Sidebar.prototype, "change", void 0);
    __decorate$9([
        Event()
    ], Sidebar.prototype, "destroyed", void 0);
    Sidebar = __decorate$9([
        NotifyPropertyChanges
    ], Sidebar);
    return Sidebar;
}(Component));

var __extends$a = (undefined && undefined.__extends) || (function () {
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
var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ICONRIGHT = 'e-icon-right';
var ITEMTEXTCLASS = 'e-breadcrumb-text';
var ICONCLASS = 'e-breadcrumb-icon';
var MENUCLASS = 'e-breadcrumb-menu';
var ITEMCLASS = 'e-breadcrumb-item';
var POPUPCLASS = 'e-breadcrumb-popup';
var WRAPMODECLASS = 'e-breadcrumb-wrap-mode';
var SCROLLMODECLASS = 'e-breadcrumb-scroll-mode';
var TABINDEX = 'tabindex';
var DISABLEDCLASS = 'e-disabled';
var ARIADISABLED = 'aria-disabled';
var DOT = '.';
/**
 * Defines the Breadcrumb overflow modes.
 */
var BreadcrumbOverflowMode;
(function (BreadcrumbOverflowMode) {
    /**
     * Hidden mode shows the maximum number of items possible in the container space and hides the remaining items.
     * Clicking on a previous item will make the hidden item visible.
     */
    BreadcrumbOverflowMode["Hidden"] = "Hidden";
    /**
     * Collapsed mode shows the first and last Breadcrumb items and hides the remaining items with a collapsed icon.
     * When the collapsed icon is clicked, all items become visible and navigable.
     */
    BreadcrumbOverflowMode["Collapsed"] = "Collapsed";
    /**
     * Menu mode shows the number of Breadcrumb items that can be accommodated within the container space and creates a submenu with the remaining items.
     */
    BreadcrumbOverflowMode["Menu"] = "Menu";
    /**
     * Wrap mode wraps the items to multiple lines when the Breadcrumb’s width exceeds the container space.
     */
    BreadcrumbOverflowMode["Wrap"] = "Wrap";
    /**
     * Scroll mode shows an HTML scroll bar when the Breadcrumb’s width exceeds the container space.
     */
    BreadcrumbOverflowMode["Scroll"] = "Scroll";
    /**
     * None mode shows all the items in a single line.
     */
    BreadcrumbOverflowMode["None"] = "None";
})(BreadcrumbOverflowMode || (BreadcrumbOverflowMode = {}));
var BreadcrumbItem = /** @class */ (function (_super) {
    __extends$a(BreadcrumbItem, _super);
    function BreadcrumbItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$a([
        Property('')
    ], BreadcrumbItem.prototype, "text", void 0);
    __decorate$a([
        Property('')
    ], BreadcrumbItem.prototype, "id", void 0);
    __decorate$a([
        Property('')
    ], BreadcrumbItem.prototype, "url", void 0);
    __decorate$a([
        Property(null)
    ], BreadcrumbItem.prototype, "iconCss", void 0);
    __decorate$a([
        Property(false)
    ], BreadcrumbItem.prototype, "disabled", void 0);
    return BreadcrumbItem;
}(ChildProperty));
/**
 * Breadcrumb is a graphical user interface that helps to identify or highlight the current location within a hierarchical structure of websites.
 * The aim is to make the user aware of their current position in a hierarchy of website links.
 * ```html
 * <nav id='breadcrumb'></nav>
 * ```
 * ```typescript
 * <script>
 * var breadcrumbObj = new Breadcrumb({ items: [{ text: 'Home', url: '/' }, { text: 'Index', url: './index.html }]});
 * breadcrumbObj.appendTo("#breadcrumb");
 * </script>
 * ```
 */
var Breadcrumb = /** @class */ (function (_super) {
    __extends$a(Breadcrumb, _super);
    /**
     * Constructor for creating the widget.
     *
     * @private
     * @param {BreadcrumbModel} options - Specifies the Breadcrumb model.
     * @param {string | HTMLElement} element - Specifies the element.
     */
    function Breadcrumb(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isPopupCreated = false;
        return _this;
    }
    /**
     * @private
     * @returns {void}
     */
    Breadcrumb.prototype.preRender = function () {
        // pre render code
    };
    /**
     * Initialize the control rendering.
     *
     * @private
     * @returns {void}
     */
    Breadcrumb.prototype.render = function () {
        this.initialize();
        this.renderItems(this.items);
        this.wireEvents();
    };
    Breadcrumb.prototype.initialize = function () {
        this._maxItems = this.maxItems;
        if (isNullOrUndefined(this.element.getAttribute('aria-label'))) {
            this.element.setAttribute('aria-label', 'breadcrumb');
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        if (this.disabled) {
            this.element.classList.add(DISABLEDCLASS);
            this.element.setAttribute(ARIADISABLED, 'true');
        }
        if (this.overflowMode === 'Wrap') {
            this.element.classList.add(WRAPMODECLASS);
        }
        else if (this.overflowMode === 'Scroll') {
            this.element.classList.add(SCROLLMODECLASS);
        }
        this.initItems();
        this.initPvtProps();
    };
    Breadcrumb.prototype.initPvtProps = function () {
        if (this.overflowMode === 'Hidden' && this._maxItems > 0) {
            this.endIndex = this.getEndIndex();
            this.startIndex = this.endIndex + 1 - (this._maxItems - 1);
        }
        if (this.overflowMode === 'Menu') {
            if (this._maxItems >= 0) {
                this.startIndex = this._maxItems > 1 ? 1 : 0;
                this.endIndex = this.getEndIndex();
                this.popupUl = this.createElement('ul', { attrs: { TABINDEX: '0', 'role': 'menu' } });
            }
            else {
                this.startIndex = this.endIndex = null;
            }
        }
    };
    Breadcrumb.prototype.getEndIndex = function () {
        var _this = this;
        var endIndex;
        if (this.activeItem) {
            this.items.forEach(function (item, idx) {
                if (item.url === _this.activeItem || item.text === _this.activeItem) {
                    endIndex = idx;
                }
            });
        }
        else {
            endIndex = this.items.length - 1;
        }
        return endIndex;
    };
    Breadcrumb.prototype.initItems = function () {
        if (!this.items.length) {
            var baseUri = void 0;
            var uri = void 0;
            var items = [];
            if (this.url) {
                var url = new URL(this.url, window.location.origin);
                baseUri = url.origin + '/';
                uri = url.href.split(baseUri)[1].split('/');
            }
            else {
                baseUri = window.location.origin + '/';
                uri = window.location.href.split(baseUri)[1].split('/');
            }
            items.push({ iconCss: 'e-icons e-home', url: baseUri });
            for (var i = 0; i < uri.length; i++) {
                if (uri[i]) {
                    items.push({ text: uri[i], url: baseUri + uri[i] });
                    baseUri += uri[i] + '/';
                }
            }
            this.setProperties({ items: items }, true);
        }
    };
    Breadcrumb.prototype.renderItems = function (items) {
        var _this = this;
        var item;
        var isSingleLevel;
        var isIconRight = this.element.classList.contains(ICONRIGHT);
        var itemsLength = items.length;
        if (itemsLength) {
            var isActiveItem = void 0;
            var isLastItem = void 0;
            var isLastItemInPopup_1;
            var j_1 = 0;
            var wrapDiv = void 0;
            var len = (itemsLength * 2) - 1;
            var isItemCancelled_1 = false;
            var ol = this.createElement('ol', { className: this.overflowMode === 'Wrap' ? 'e-breadcrumb-wrapped-ol' : '' });
            var firstOl = this.createElement('ol', { className: this.overflowMode === 'Wrap' ? 'e-breadcrumb-first-ol' : '' });
            var showIcon = this.hasField(items, 'iconCss');
            var isCollasped = (this.overflowMode === 'Collapsed' && this._maxItems > 0 && itemsLength > this._maxItems && !this.isExpanded);
            var isDefaultOverflowMode_1 = (this.overflowMode === 'Hidden' && this._maxItems > 0);
            if (this.overflowMode === 'Menu' && this.popupUl) {
                this.popupUl.innerHTML = '';
            }
            var listBaseOptions = {
                moduleName: this.getModuleName(),
                showIcon: showIcon,
                itemNavigable: true,
                itemCreated: function (args) {
                    var isLastItem = args.curData.isLastItem;
                    if (isLastItem && args.item.children.length && !_this.itemTemplate) {
                        delete args.curData.isLastItem;
                        if (!isLastItemInPopup_1 && !_this.enableActiveItemNavigation) {
                            args.item.innerHTML = _this.createElement('span', { className: ITEMTEXTCLASS, innerHTML: args.item.children[0].innerHTML }).outerHTML;
                        }
                    }
                    if (args.curData.iconCss && !args.curData.text && !_this.itemTemplate) {
                        args.item.classList.add('e-icon-item');
                    }
                    if (isDefaultOverflowMode_1) {
                        args.item.setAttribute('item-index', j_1.toString());
                    }
                    var eventArgs = {
                        item: extend({}, args.curData.properties ?
                            args.curData.properties : args.curData), element: args.item, cancel: false
                    };
                    _this.trigger('beforeItemRender', eventArgs);
                    isItemCancelled_1 = eventArgs.cancel;
                    var containsRightIcon = (isIconRight || eventArgs.element.classList.contains(ICONRIGHT));
                    if (containsRightIcon && args.curData.iconCss && !_this.itemTemplate) {
                        args.item.querySelector('.e-anchor-wrap').appendChild(args.item.querySelector(DOT + ICONCLASS));
                    }
                    if (eventArgs.item.disabled) {
                        args.item.setAttribute(ARIADISABLED, 'true');
                        args.item.classList.add(DISABLEDCLASS);
                    }
                    if (eventArgs.item.id) {
                        args.item.setAttribute('id', eventArgs.item.id);
                    }
                    if ((eventArgs.item.disabled || _this.disabled) && args.item.children.length && !_this.itemTemplate) {
                        args.item.children[0].setAttribute(TABINDEX, '-1');
                    }
                    if (args.curData.isEmptyUrl) {
                        args.item.children[0].removeAttribute('href');
                        if ((!isLastItem || (isLastItem && _this.enableActiveItemNavigation)) && !(eventArgs.item.disabled
                            || _this.disabled)) {
                            args.item.children[0].setAttribute(TABINDEX, '0');
                            EventHandler.add(args.item.children[0], 'keydown', _this.keyDownHandler, _this);
                        }
                    }
                    args.item.removeAttribute('role');
                    if (isLastItem) {
                        args.item.setAttribute('data-active-item', '');
                    }
                    if (!_this.itemTemplate) {
                        _this.beforeItemRenderChanges(args.curData, eventArgs.item, args.item, containsRightIcon);
                    }
                }
            };
            for (var i = 0; i < len; (i % 2 && j_1++), i++) {
                isActiveItem = (this.activeItem && (this.activeItem === items[j_1].url ||
                    this.activeItem === items[j_1].text));
                if (isCollasped && i > 1 && i < len - 2) {
                    continue;
                }
                else if (isDefaultOverflowMode_1 && ((j_1 < this.startIndex || j_1 > this.endIndex)
                    && (i % 2 ? j_1 !== this.startIndex - 1 : true)) && j_1 !== 0) {
                    continue;
                }
                if (i % 2) {
                    // separator item
                    wrapDiv = this.createElement('div', { className: 'e-breadcrumb-item-wrapper' });
                    if ((this.separatorTemplate && this.separatorTemplate === '/') || isNullOrUndefined(this.separatorTemplate)) {
                        listBaseOptions.template = initializeCSPTemplate(function () {
                            return '/';
                        });
                    }
                    else {
                        listBaseOptions.template = this.separatorTemplate;
                    }
                    listBaseOptions.itemClass = 'e-breadcrumb-separator';
                    isSingleLevel = false;
                    item = [{ previousItem: items[j_1], nextItem: items[j_1 + 1] }];
                }
                else {
                    // list item
                    listBaseOptions.itemClass = '';
                    if (this.itemTemplate) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        listBaseOptions.template = this.itemTemplate;
                        isSingleLevel = false;
                    }
                    else {
                        isSingleLevel = true;
                    }
                    item = [extend({}, items[j_1].properties ?
                            items[j_1].properties
                            : items[j_1])];
                    if (!item[0].url && !this.itemTemplate) {
                        item = [extend({}, item[0], { isEmptyUrl: true, url: '#' })];
                    }
                    isLastItem = (isDefaultOverflowMode_1 || this.overflowMode === 'Menu') && (j_1 === this.endIndex);
                    if (((i === len - 1 || isLastItem) && !this.itemTemplate) || isActiveItem) {
                        item[0].isLastItem = true;
                    }
                }
                var parent_1 = ol;
                var lastPopupItemIdx = this.startIndex + this.endIndex - this._maxItems;
                if (this.overflowMode === 'Menu' && ((j_1 >= this.startIndex && (j_1 <= lastPopupItemIdx && (i % 2 ? !(j_1 === lastPopupItemIdx) : true)) && this.endIndex >= this._maxItems && this._maxItems > 0) || this._maxItems === 0)) {
                    if (i % 2) {
                        continue;
                    }
                    else {
                        parent_1 = this.popupUl;
                        if (isLastItem) {
                            isLastItemInPopup_1 = true;
                        }
                    }
                }
                else if (this.overflowMode === 'Wrap') {
                    if (i === 0) {
                        parent_1 = firstOl;
                    }
                    else {
                        parent_1 = wrapDiv;
                    }
                }
                var li = ListBase.createList(this.createElement, item, listBaseOptions, isSingleLevel, this).childNodes;
                if (!isItemCancelled_1) {
                    append(li, parent_1);
                }
                else if (isDefaultOverflowMode_1 || isCollasped || this.overflowMode === 'Menu' || this.overflowMode === 'Wrap') {
                    items.splice(j_1, 1);
                    this.initPvtProps();
                    return this.reRenderItems();
                }
                else if ((i === len - 1 || isLastItem)) {
                    remove(parent_1.lastElementChild);
                }
                if (this.overflowMode === 'Wrap' && i !== 0 && i % 2 === 0) {
                    ol.appendChild(wrapDiv);
                }
                if (isCollasped && i === 1) {
                    var li_1 = this.createElement('li', { className: 'e-icons e-breadcrumb-collapsed', attrs: { TABINDEX: '0' } });
                    EventHandler.add(li_1, 'keyup', this.expandHandler, this);
                    ol.appendChild(li_1);
                }
                if (this.overflowMode === 'Menu' && this.startIndex === i && this.endIndex >= this._maxItems && this._maxItems >= 0) {
                    var menu = this.getMenuElement();
                    EventHandler.add(menu, 'keyup', this.keyDownHandler, this);
                    ol.appendChild(menu);
                }
                if (isActiveItem || isLastItem) {
                    break;
                }
                if (isItemCancelled_1) {
                    i++;
                }
            }
            if (this.isReact) {
                this.renderReactTemplates();
                setTimeout(function () {
                    _this.calculateMaxItems();
                }, 5);
            }
            if (this.overflowMode === 'Wrap') {
                this.element.appendChild(firstOl);
            }
            this.element.appendChild(ol);
            if (!this.isReact) {
                this.calculateMaxItems();
            }
        }
    };
    Breadcrumb.prototype.calculateMaxItems = function () {
        if (this.overflowMode === 'Hidden' || this.overflowMode === 'Collapsed' || this.overflowMode === 'Menu') {
            var maxItems = void 0;
            var width = this.element.offsetWidth;
            var liElems = [].slice.call(this.element.children[0].children).reverse();
            var liWidth = this.overflowMode === 'Menu' ? 0 : liElems[liElems.length - 1].offsetWidth + (liElems[liElems.length - 2] ? liElems[liElems.length - 2].offsetWidth : 0);
            if (this.overflowMode === 'Menu') {
                var menuEle = this.getMenuElement();
                this.element.appendChild(menuEle);
                liWidth += menuEle.offsetWidth;
                remove(menuEle);
            }
            for (var i = 0; i < liElems.length - 2; i++) {
                if (liWidth > width) {
                    maxItems = Math.ceil((i - 1) / 2) + ((this.overflowMode === 'Menu' && i <= 2) ? 0 : 1);
                    if (((this.maxItems > maxItems && !(this.maxItems > -1 && maxItems === -1)) ||
                        this.maxItems === -1) && this._maxItems !== maxItems) {
                        this._maxItems = maxItems;
                        this.initPvtProps();
                        return this.reRenderItems();
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.overflowMode === 'Menu' && i === 2) {
                        liWidth += liElems[liElems.length - 1].offsetWidth + liElems[liElems.length - 2].offsetWidth;
                        if (liWidth > width) {
                            this._maxItems = 1;
                            this.initPvtProps();
                            return this.reRenderItems();
                        }
                    }
                    if (!(this.overflowMode === 'Menu' && liElems[i].classList.contains(MENUCLASS))) {
                        liWidth += liElems[i].offsetWidth;
                    }
                }
            }
        }
        else if ((this.overflowMode === 'Wrap' || this.overflowMode === 'Scroll') && this._maxItems > 0) {
            var width = 0;
            var liElems = this.element.querySelectorAll(DOT + ITEMCLASS);
            if (liElems.length > this._maxItems + this._maxItems - 1) {
                for (var i = this.overflowMode === 'Wrap' ? 1 : 0; i < this._maxItems + this._maxItems - 1; i++) {
                    width += liElems[i].offsetWidth;
                }
                width = width + 5 + (parseInt(getComputedStyle(this.element.children[0]).paddingLeft, 10) * 2);
                if (this.overflowMode === 'Wrap') {
                    this.element.querySelector('.e-breadcrumb-wrapped-ol').style.width = width + 'px';
                }
                else {
                    this.element.style.width = width + 'px';
                }
            }
        }
    };
    Breadcrumb.prototype.hasField = function (items, field) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i]["" + field]) {
                return true;
            }
        }
        return false;
    };
    Breadcrumb.prototype.getMenuElement = function () {
        return this.createElement('li', { className: 'e-icons e-breadcrumb-menu', attrs: { TABINDEX: '0' } });
    };
    Breadcrumb.prototype.beforeItemRenderChanges = function (prevItem, currItem, elem, isRightIcon) {
        var wrapElem = elem.querySelector('.e-anchor-wrap');
        if (wrapElem) {
            wrapElem.parentElement.setAttribute('aria-label', 'home');
        }
        if (currItem.text !== prevItem.text && wrapElem) {
            wrapElem.childNodes.forEach(function (child) {
                if (child.nodeType === Node.TEXT_NODE) {
                    child.textContent = currItem.text;
                }
            });
        }
        if (currItem.iconCss !== prevItem.iconCss && wrapElem) { // wrapElem - for checking it is item not a separator
            var iconElem = elem.querySelector(DOT + ICONCLASS);
            if (iconElem) {
                if (currItem.iconCss) {
                    removeClass([iconElem], prevItem.iconCss.split(' '));
                    addClass([iconElem], currItem.iconCss.split(' '));
                }
                else {
                    remove(iconElem);
                }
            }
            else if (currItem.iconCss) {
                var iconElem_1 = this.createElement('span', { className: ICONCLASS + ' ' + currItem.iconCss });
                if (isRightIcon) {
                    append([iconElem_1], wrapElem);
                }
                else {
                    wrapElem.insertBefore(iconElem_1, wrapElem.childNodes[0]);
                }
            }
        }
        if (currItem.url !== prevItem.url && this.enableNavigation) {
            var anchor = elem.querySelector('a.' + ITEMTEXTCLASS);
            if (anchor) {
                if (currItem.url) {
                    anchor.setAttribute('href', currItem.url);
                }
                else {
                    anchor.removeAttribute('href');
                }
            }
        }
    };
    Breadcrumb.prototype.reRenderItems = function () {
        if (this.overflowMode === 'Menu' && this.popupObj && this.popupObj.element.classList.contains('e-popup-open') && this.popupObj.element.querySelector('.e-edit-template')) {
            this.popupObj.hide();
            this.popupObj.destroy();
            this.isPopupCreated = false;
            detach(this.popupObj.element);
        }
        this.element.innerHTML = '';
        this.renderItems(this.items);
    };
    Breadcrumb.prototype.clickHandler = function (e) {
        var li = closest(e.target, DOT + ITEMCLASS + ':not(.e-breadcrumb-separator)');
        if (!this.enableNavigation) {
            e.preventDefault();
        }
        if (li && (closest(e.target, DOT + ITEMTEXTCLASS) || this.itemTemplate)) {
            var idx = void 0;
            if (this.overflowMode === 'Wrap') {
                idx = [].slice.call(this.element.querySelectorAll(DOT + ITEMCLASS)).indexOf(li);
            }
            else {
                idx = [].slice.call(li.parentElement.children).indexOf(li);
            }
            if (this.overflowMode === 'Menu') {
                if (closest(e.target, DOT + POPUPCLASS)) {
                    idx += this.startIndex;
                    this.endIndex = idx;
                    if (e.type === 'keydown') {
                        this.documentClickHandler(e);
                    }
                }
                else if (this.element.querySelector(DOT + MENUCLASS)) {
                    if (idx > [].slice.call(this.element.children[0].children).indexOf(this.element.querySelector(DOT + MENUCLASS))) {
                        idx += (this.popupUl.childElementCount * 2) - 2;
                        idx = Math.floor(idx / 2);
                        this.endIndex = idx;
                    }
                    else {
                        this.startIndex = this.endIndex = idx;
                    }
                }
                else {
                    idx = Math.floor(idx / 2);
                    this.startIndex = this.endIndex = idx;
                }
            }
            else {
                idx = Math.floor(idx / 2);
            }
            if (this.overflowMode === 'Hidden' && this._maxItems > 0 && this.endIndex !== 0) {
                idx = parseInt(li.getAttribute('item-index'), 10);
                if (this.startIndex > 1) {
                    this.startIndex -= (this.endIndex - idx);
                }
                this.endIndex = idx;
            }
            var itemClickArgs = { element: li,
                item: this.items[idx], event: e, cancel: false };
            this.trigger('itemClick', itemClickArgs);
            if (itemClickArgs.cancel) {
                return;
            }
            if (this.items[idx]) {
                this.activeItem = this.items[idx].url || this.items[idx].text;
            }
            this.dataBind();
        }
        if (e.target.classList.contains('e-breadcrumb-collapsed')) {
            this.isExpanded = true;
            this.reRenderItems();
        }
        if (e.target.classList.contains(MENUCLASS) && !this.isPopupCreated) {
            this.renderPopup();
        }
    };
    Breadcrumb.prototype.renderPopup = function () {
        var _this = this;
        var wrapper = this.createElement('div', { className: POPUPCLASS + ' ' + this.cssClass + (this.enableRtl ? ' e-rtl' : '') });
        document.body.appendChild(wrapper);
        this.isPopupCreated = true;
        this.popupObj = new Popup(wrapper, {
            content: this.popupUl,
            relateTo: this.element.querySelector(DOT + MENUCLASS),
            enableRtl: this.enableRtl,
            position: { X: 'left', Y: 'bottom' },
            collision: { X: 'fit', Y: 'flip' },
            open: function () {
                if (_this.popupUl) {
                    _this.popupUl.focus();
                }
            }
        });
        this.popupWireEvents();
        this.popupObj.show();
    };
    Breadcrumb.prototype.documentClickHandler = function (e) {
        if (this.overflowMode === 'Menu' && this.popupObj && this.popupObj.element.classList.contains('e-popup-open') && !closest(e.target, DOT + MENUCLASS) && !closest(e.target, DOT + 'e-edit-template')) {
            this.popupObj.hide();
            this.popupObj.destroy();
            this.isPopupCreated = false;
            detach(this.popupObj.element);
        }
    };
    Breadcrumb.prototype.resize = function () {
        this._maxItems = this.maxItems;
        this.initPvtProps();
        this.reRenderItems();
    };
    Breadcrumb.prototype.expandHandler = function (e) {
        if (e.key === 'Enter') {
            this.isExpanded = true;
            this.reRenderItems();
        }
    };
    Breadcrumb.prototype.keyDownHandler = function (e) {
        if (e.key === 'Enter') {
            this.clickHandler(e);
        }
    };
    Breadcrumb.prototype.popupKeyDownHandler = function (e) {
        if (e.key === 'Escape') {
            this.documentClickHandler(e);
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {BreadcrumbModel} newProp - Specifies the new properties.
     * @param {BreadcrumbModel} oldProp - Specifies the old properties.
     * @returns {void}
     */
    Breadcrumb.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'items':
                case 'enableActiveItemNavigation':
                    this.reRenderItems();
                    break;
                case 'activeItem':
                    this._maxItems = this.maxItems;
                    this.initPvtProps();
                    this.reRenderItems();
                    break;
                case 'overflowMode':
                case 'maxItems':
                    this._maxItems = this.maxItems;
                    this.initPvtProps();
                    this.reRenderItems();
                    if (oldProp.overflowMode === 'Wrap') {
                        this.element.classList.remove(WRAPMODECLASS);
                    }
                    else if (newProp.overflowMode === 'Wrap') {
                        this.element.classList.add(WRAPMODECLASS);
                    }
                    if (oldProp.overflowMode === 'Scroll') {
                        this.element.classList.remove(SCROLLMODECLASS);
                    }
                    else if (newProp.overflowMode === 'Scroll') {
                        this.element.classList.add(SCROLLMODECLASS);
                    }
                    break;
                case 'url':
                    this.initItems();
                    this.reRenderItems();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    if ((oldProp.cssClass && oldProp.cssClass.indexOf(ICONRIGHT) > -1) && !(newProp.cssClass &&
                        newProp.cssClass.indexOf(ICONRIGHT) > -1) || !(oldProp.cssClass && oldProp.cssClass.indexOf(ICONRIGHT) > -1) &&
                        (newProp.cssClass && newProp.cssClass.indexOf(ICONRIGHT) > -1)) {
                        this.reRenderItems();
                    }
                    break;
                case 'enableRtl':
                    this.element.classList.toggle('e-rtl');
                    break;
                case 'disabled':
                    this.element.classList.toggle(DISABLEDCLASS);
                    this.element.setAttribute(ARIADISABLED, newProp.disabled + '');
                    break;
            }
        }
    };
    Breadcrumb.prototype.wireEvents = function () {
        this.delegateClickHanlder = this.documentClickHandler.bind(this);
        EventHandler.add(document, 'click', this.delegateClickHanlder, this);
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        window.addEventListener('resize', this.resize.bind(this));
    };
    Breadcrumb.prototype.popupWireEvents = function () {
        EventHandler.add(this.popupObj.element, 'click', this.clickHandler, this);
        EventHandler.add(this.popupObj.element, 'keydown', this.popupKeyDownHandler, this);
    };
    Breadcrumb.prototype.unWireEvents = function () {
        EventHandler.remove(document, 'click', this.delegateClickHanlder);
        EventHandler.remove(this.element, 'click', this.clickHandler);
        window.removeEventListener('resize', this.resize.bind(this));
        if (this.popupObj) {
            EventHandler.remove(this.popupObj.element, 'click', this.clickHandler);
            EventHandler.remove(this.popupObj.element, 'keydown', this.popupKeyDownHandler);
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Breadcrumb.prototype.getPersistData = function () {
        return this.addOnPersist(['activeItem']);
    };
    /**
     * Get module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    Breadcrumb.prototype.getModuleName = function () {
        return 'breadcrumb';
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    Breadcrumb.prototype.destroy = function () {
        var _this = this;
        if (this.popupObj && this.popupObj.element.classList.contains('e-popup-open')) {
            this.popupObj.destroy();
            this.isPopupCreated = false;
            detach(this.popupObj.element);
        }
        var classes = [];
        var attributes = ['aria-label'];
        if (this.cssClass) {
            classes.concat(this.cssClass.split(' '));
        }
        if (this.enableRtl) {
            classes.push('e-rtl');
        }
        if (this.disabled) {
            classes.push(DISABLEDCLASS);
            attributes.push(ARIADISABLED);
        }
        if (this.overflowMode === 'Wrap') {
            classes.push(WRAPMODECLASS);
        }
        else if (this.overflowMode === 'Scroll') {
            classes.push(SCROLLMODECLASS);
        }
        this.unWireEvents();
        this.element.innerHTML = '';
        removeClass([this.element], classes);
        attributes.forEach(function (attribute) {
            _this.element.removeAttribute(attribute);
        });
        _super.prototype.destroy.call(this);
    };
    __decorate$a([
        Property('')
    ], Breadcrumb.prototype, "url", void 0);
    __decorate$a([
        Collection([], BreadcrumbItem)
    ], Breadcrumb.prototype, "items", void 0);
    __decorate$a([
        Property('')
    ], Breadcrumb.prototype, "activeItem", void 0);
    __decorate$a([
        Property(-1)
    ], Breadcrumb.prototype, "maxItems", void 0);
    __decorate$a([
        Property('Menu')
    ], Breadcrumb.prototype, "overflowMode", void 0);
    __decorate$a([
        Property('')
    ], Breadcrumb.prototype, "cssClass", void 0);
    __decorate$a([
        Property(null)
    ], Breadcrumb.prototype, "itemTemplate", void 0);
    __decorate$a([
        Property('/')
    ], Breadcrumb.prototype, "separatorTemplate", void 0);
    __decorate$a([
        Property(true)
    ], Breadcrumb.prototype, "enableNavigation", void 0);
    __decorate$a([
        Property(false)
    ], Breadcrumb.prototype, "enableActiveItemNavigation", void 0);
    __decorate$a([
        Property(false)
    ], Breadcrumb.prototype, "disabled", void 0);
    __decorate$a([
        Property('')
    ], Breadcrumb.prototype, "locale", void 0);
    __decorate$a([
        Event()
    ], Breadcrumb.prototype, "beforeItemRender", void 0);
    __decorate$a([
        Event()
    ], Breadcrumb.prototype, "itemClick", void 0);
    __decorate$a([
        Event()
    ], Breadcrumb.prototype, "created", void 0);
    Breadcrumb = __decorate$a([
        NotifyPropertyChanges
    ], Breadcrumb);
    return Breadcrumb;
}(Component));

var __extends$b = (undefined && undefined.__extends) || (function () {
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
var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Constant variables
var CLS_CAROUSEL = 'e-carousel';
var CLS_ACTIVE$2 = 'e-active';
var CLS_RTL$5 = 'e-rtl';
var CLS_PARTIAL = 'e-partial';
var CLS_SWIPE = 'e-swipe';
var CLS_SLIDE_CONTAINER = 'e-carousel-slide-container';
var CLS_ITEMS$2 = 'e-carousel-items';
var CLS_CLONED = 'e-cloned';
var CLS_ITEM$3 = 'e-carousel-item';
var CLS_PREVIOUS = 'e-previous';
var CLS_NEXT = 'e-next';
var CLS_PREV_ICON = 'e-previous-icon';
var CLS_NEXT_ICON = 'e-next-icon';
var CLS_NAVIGATORS = 'e-carousel-navigators';
var CLS_INDICATORS = 'e-carousel-indicators';
var CLS_INDICATOR_BARS = 'e-indicator-bars';
var CLS_INDICATOR_BAR = 'e-indicator-bar';
var CLS_INDICATOR$1 = 'e-indicator';
var CLS_ICON$1 = 'e-icons';
var CLS_PLAY_PAUSE = 'e-play-pause';
var CLS_PLAY_ICON = 'e-play-icon';
var CLS_PAUSE_ICON = 'e-pause-icon';
var CLS_PREV_BUTTON = 'e-previous-button';
var CLS_NEXT_BUTTON = 'e-next-button';
var CLS_PLAY_BUTTON = 'e-play-button';
var CLS_FLAT = 'e-flat';
var CLS_ROUND = 'e-round';
var CLS_HOVER_ARROWS = 'e-hover-arrows';
var CLS_HOVER = 'e-carousel-hover';
var CLS_TEMPLATE$2 = 'e-template';
var CLS_SLIDE_ANIMATION = 'e-carousel-slide-animation';
var CLS_FADE_ANIMATION = 'e-carousel-fade-animation';
var CLS_CUSTOM_ANIMATION = 'e-carousel-custom-animation';
var CLS_ANIMATION_NONE = 'e-carousel-animation-none';
var CLS_PREV_SLIDE = 'e-prev';
var CLS_NEXT_SLIDE = 'e-next';
var CLS_TRANSITION_START = 'e-transition-start';
var CLS_TRANSITION_END = 'e-transition-end';
/**
 * Specifies the action (touch & mouse) which enables the slide swiping action in carousel.
 * * Touch - Enables or disables the swiping action in touch interaction.
 * * Mouse - Enables or disables the swiping action in mouse interaction.
 *
 * @aspNumberEnum
 */
var CarouselSwipeMode;
(function (CarouselSwipeMode) {
    /** Enables or disables the swiping action in touch interaction. */
    CarouselSwipeMode[CarouselSwipeMode["Touch"] = 1] = "Touch";
    /** Enables or disables the swiping action in mouse interaction. */
    CarouselSwipeMode[CarouselSwipeMode["Mouse"] = 2] = "Mouse";
})(CarouselSwipeMode || (CarouselSwipeMode = {}));
/** Specifies the carousel individual item. */
var CarouselItem = /** @class */ (function (_super) {
    __extends$b(CarouselItem, _super);
    function CarouselItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$b([
        Property()
    ], CarouselItem.prototype, "cssClass", void 0);
    __decorate$b([
        Property()
    ], CarouselItem.prototype, "interval", void 0);
    __decorate$b([
        Property()
    ], CarouselItem.prototype, "template", void 0);
    __decorate$b([
        Property()
    ], CarouselItem.prototype, "htmlAttributes", void 0);
    return CarouselItem;
}(ChildProperty));
var Carousel = /** @class */ (function (_super) {
    __extends$b(Carousel, _super);
    /**
     * Constructor for creating the Carousel widget
     *
     * @param {CarouselModel} options Accepts the carousel model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    function Carousel(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isSwipe = false;
        return _this;
    }
    Carousel.prototype.getModuleName = function () {
        return CLS_CAROUSEL.replace('e-', '');
    };
    Carousel.prototype.getPersistData = function () {
        return this.addOnPersist(['selectedIndex']);
    };
    Carousel.prototype.preRender = function () {
        this.keyConfigs = {
            home: 'home',
            end: 'end',
            space: 'space',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            moveDown: 'downarrow'
        };
        var defaultLocale = {
            nextSlide: 'Next slide',
            of: 'of',
            pauseSlideTransition: 'Pause slide transition',
            playSlideTransition: 'Play slide transition',
            previousSlide: 'Previous slide',
            slide: 'Slide',
            slideShow: 'Slide show'
        };
        this.localeObj = new L10n(this.getModuleName(), defaultLocale, this.locale);
    };
    Carousel.prototype.render = function () {
        this.initialize();
        this.renderSlides();
        this.renderNavigators();
        this.renderPlayButton();
        this.renderIndicators();
        this.applyAnimation();
        this.wireEvents();
    };
    Carousel.prototype.onPropertyChanged = function (newProp, oldProp) {
        var target;
        var rtlElement;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'animationEffect':
                    this.applyAnimation();
                    break;
                case 'cssClass':
                    classList(this.element, [newProp.cssClass], [oldProp.cssClass]);
                    break;
                case 'selectedIndex':
                    this.setActiveSlide(this.selectedIndex, oldProp.selectedIndex > this.selectedIndex ? 'Previous' : 'Next');
                    this.autoSlide();
                    break;
                case 'htmlAttributes':
                    if (!isNullOrUndefined(this.htmlAttributes)) {
                        this.setHtmlAttributes(this.htmlAttributes, this.element);
                    }
                    break;
                case 'enableTouchSwipe':
                    if (!this.enableTouchSwipe && this.touchModule) {
                        this.touchModule.destroy();
                    }
                    if (this.element.querySelector("." + CLS_ITEMS$2)) {
                        this.renderTouchActions();
                    }
                    break;
                case 'loop':
                    if (this.loop && isNullOrUndefined(this.autoSlideInterval)) {
                        this.applySlideInterval();
                    }
                    this.handleNavigatorsActions(this.selectedIndex);
                    if (this.partialVisible || !(this.swipeMode === (~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse))) {
                        this.reRenderSlides();
                    }
                    break;
                case 'allowKeyboardInteraction':
                    if (this.keyModule) {
                        this.keyModule.destroy();
                        this.keyModule = null;
                    }
                    if (newProp.allowKeyboardInteraction) {
                        this.renderKeyboardActions();
                    }
                    break;
                case 'enableRtl':
                    rtlElement = [].slice.call(this.element.querySelectorAll("." + CLS_PREV_BUTTON + ",\n                ." + CLS_NEXT_BUTTON + ", ." + CLS_PLAY_BUTTON));
                    rtlElement.push(this.element);
                    if (this.enableRtl) {
                        addClass(rtlElement, CLS_RTL$5);
                    }
                    else {
                        removeClass(rtlElement, CLS_RTL$5);
                    }
                    if (this.partialVisible || !(this.swipeMode === (~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse))) {
                        var cloneCount = this.loop ? this.getNumOfItems() : 0;
                        var slideWidth = this.itemsContainer.firstElementChild.clientWidth;
                        this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex + cloneCount);
                    }
                    break;
                case 'buttonsVisibility':
                    target = this.element.querySelector("." + CLS_NAVIGATORS);
                    if (target) {
                        switch (this.buttonsVisibility) {
                            case 'Hidden':
                                this.resetTemplates(['previousButtonTemplate', 'nextButtonTemplate']);
                                remove(target);
                                break;
                            case 'VisibleOnHover':
                                addClass([].slice.call(target.childNodes), CLS_HOVER_ARROWS);
                                break;
                            case 'Visible':
                                removeClass([].slice.call(target.childNodes), CLS_HOVER_ARROWS);
                                break;
                        }
                    }
                    else {
                        this.renderNavigators();
                        this.renderPlayButton();
                    }
                    break;
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(this.width) });
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(this.height) });
                    break;
                case 'autoPlay':
                    if (this.showPlayButton && isNullOrUndefined(this.playButtonTemplate)) {
                        this.playButtonClickHandler(null, true);
                    }
                    this.autoSlide();
                    break;
                case 'interval':
                    this.autoSlide();
                    break;
                case 'showIndicators':
                case 'indicatorsType':
                    target = this.element.querySelector("." + CLS_INDICATORS);
                    if (target) {
                        this.resetTemplates(['indicatorsTemplate']);
                        remove(target);
                    }
                    this.renderIndicators();
                    break;
                case 'showPlayButton':
                    target = this.element.querySelector("." + CLS_PLAY_PAUSE);
                    if (!this.showPlayButton && target) {
                        remove(target);
                        this.resetTemplates(['playButtonTemplate']);
                    }
                    this.renderPlayButton();
                    break;
                case 'items':
                case 'dataSource': {
                    var selectedData = prop === 'dataSource' ? this.dataSource : this.items;
                    if (!isNullOrUndefined(selectedData) && selectedData.length > 0 && this.selectedIndex >= selectedData.length) {
                        this.setActiveSlide(selectedData.length - 1, 'Previous');
                        this.autoSlide();
                    }
                    this.reRenderSlides();
                    this.reRenderIndicators();
                    break;
                }
                case 'partialVisible':
                    if (this.partialVisible) {
                        addClass([this.element], CLS_PARTIAL);
                    }
                    else {
                        removeClass([this.element], CLS_PARTIAL);
                    }
                    this.reRenderSlides();
                    break;
                case 'swipeMode':
                    EventHandler.remove(this.element, 'mousedown touchstart', this.swipeStart);
                    EventHandler.remove(this.element, 'mousemove touchmove', this.swiping);
                    EventHandler.remove(this.element, 'mouseup touchend', this.swipStop);
                    this.swipeModehandlers();
                    this.reRenderSlides();
                    break;
            }
        }
    };
    Carousel.prototype.reRenderSlides = function () {
        var target = this.element.querySelector("." + CLS_ITEMS$2);
        if (target) {
            this.resetTemplates(['itemTemplate']);
            remove(target);
        }
        this.renderSlides();
    };
    Carousel.prototype.reRenderIndicators = function () {
        var target = this.element.querySelector("." + CLS_INDICATORS);
        if (target) {
            this.resetTemplates(['indicatorsTemplate']);
            remove(target);
        }
        this.renderIndicators();
    };
    Carousel.prototype.initialize = function () {
        var carouselClasses = [];
        carouselClasses.push(CLS_CAROUSEL);
        if (this.cssClass) {
            carouselClasses.push(this.cssClass);
        }
        if (this.enableRtl) {
            carouselClasses.push(CLS_RTL$5);
        }
        if (this.partialVisible) {
            carouselClasses.push(CLS_PARTIAL);
        }
        if (!(this.swipeMode === (~CarouselSwipeMode.Touch & ~CarouselSwipeMode.Mouse))) {
            carouselClasses.push(CLS_SWIPE);
        }
        addClass([this.element], carouselClasses);
        setStyleAttribute(this.element, { 'width': formatUnit(this.width), 'height': formatUnit(this.height) });
        attributes(this.element, { 'role': 'group', 'aria-roledescription': 'carousel', 'aria-label': this.localeObj.getConstant('slideShow') });
        if (!isNullOrUndefined(this.htmlAttributes)) {
            this.setHtmlAttributes(this.htmlAttributes, this.element);
        }
    };
    Carousel.prototype.renderSlides = function () {
        var _this = this;
        var slideContainer = this.element.querySelector('.' + CLS_SLIDE_CONTAINER);
        if (!slideContainer) {
            slideContainer = this.createElement('div', { className: CLS_SLIDE_CONTAINER, attrs: { 'tabindex': '0', 'role': 'tabpanel' } });
            this.element.appendChild(slideContainer);
        }
        this.itemsContainer = this.createElement('div', { className: CLS_ITEMS$2, attrs: { 'aria-live': this.autoPlay ? 'off' : 'polite' } });
        slideContainer.appendChild(this.itemsContainer);
        var numOfItems = this.getNumOfItems();
        if (numOfItems > 0 && this.loop) {
            if (this.items.length > 0) {
                this.items.slice(-numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, item.template, index, _this.itemsContainer, true);
                });
            }
            else if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0) {
                this.dataSource.slice(-numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, _this.itemTemplate, index, _this.itemsContainer, true);
                });
            }
        }
        if (this.items.length > 0) {
            this.slideItems = this.items;
            this.items.forEach(function (item, index) {
                _this.renderSlide(item, item.template, index, _this.itemsContainer);
            });
        }
        else if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0) {
            this.slideItems = this.dataSource;
            this.dataSource.forEach(function (item, index) {
                _this.renderSlide(item, _this.itemTemplate, index, _this.itemsContainer);
            });
        }
        if (numOfItems > 0 && this.loop) {
            if (this.items.length > 0) {
                this.items.slice(0, numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, item.template, index, _this.itemsContainer, true);
                });
            }
            else if (!isNullOrUndefined(this.dataSource) && this.dataSource.length > 0) {
                this.dataSource.slice(0, numOfItems).forEach(function (item, index) {
                    _this.renderSlide(item, _this.itemTemplate, index, _this.itemsContainer, true);
                });
            }
        }
        this.renderTemplates();
        this.itemsContainer.style.setProperty('--carousel-items-count', "" + this.itemsContainer.children.length);
        var slideWidth = isNullOrUndefined(this.itemsContainer.firstElementChild) ? 0 :
            this.itemsContainer.firstElementChild.clientWidth;
        this.itemsContainer.style.transitionProperty = 'none';
        var cloneCount = this.loop ? numOfItems : 0;
        this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex + cloneCount);
        this.autoSlide();
        this.renderTouchActions();
        this.renderKeyboardActions();
    };
    Carousel.prototype.getTranslateX = function (slideWidth, count) {
        if (count === void 0) { count = 1; }
        return this.enableRtl ? "translateX(" + (slideWidth) * (count) + "px)" :
            "translateX(" + -(slideWidth) * (count) + "px)";
    };
    Carousel.prototype.renderSlide = function (item, itemTemplate, index, container, isClone) {
        if (isClone === void 0) { isClone = false; }
        var itemEle = this.createElement('div', {
            id: getUniqueID('carousel_item'),
            className: CLS_ITEM$3 + " " + (item.cssClass ? item.cssClass : '') + " " + (this.selectedIndex === index && !isClone ? CLS_ACTIVE$2 : ''),
            attrs: {
                'aria-hidden': this.selectedIndex === index && !isClone ? 'false' : 'true', 'data-index': index.toString(),
                'role': 'group', 'aria-roledescription': 'slide'
            }
        });
        if (isClone) {
            itemEle.classList.add(CLS_CLONED);
        }
        if (!(this.selectedIndex === index && !isClone)) {
            itemEle.setAttribute('inert', 'true');
        }
        if (!isNullOrUndefined(item.htmlAttributes)) {
            this.setHtmlAttributes(item.htmlAttributes, itemEle);
        }
        var templateId = this.element.id + '_template';
        var template = this.templateParser(itemTemplate)(item, this, 'itemTemplate', templateId, false);
        append(template, itemEle);
        container.appendChild(itemEle);
    };
    Carousel.prototype.renderNavigators = function () {
        if (this.buttonsVisibility === 'Hidden') {
            return;
        }
        var navigators = this.createElement('div', { className: CLS_NAVIGATORS });
        var itemsContainer = this.element.querySelector("." + CLS_SLIDE_CONTAINER);
        itemsContainer.insertAdjacentElement('afterend', navigators);
        if (!isNullOrUndefined(this.slideItems) && this.slideItems.length > 1) {
            this.renderNavigatorButton('Previous');
            this.renderNavigatorButton('Next');
        }
        this.renderTemplates();
    };
    Carousel.prototype.renderNavigatorButton = function (direction) {
        var buttonContainer = this.createElement('div', {
            className: (direction === 'Previous' ? CLS_PREVIOUS : CLS_NEXT) + ' ' + (this.buttonsVisibility === 'VisibleOnHover' ? CLS_HOVER_ARROWS : '')
        });
        if (direction === 'Previous' && this.previousButtonTemplate) {
            addClass([buttonContainer], CLS_TEMPLATE$2);
            var templateId = this.element.id + '_previousButtonTemplate';
            var template = this.templateParser(this.previousButtonTemplate)({ type: 'Previous' }, this, 'previousButtonTemplate', templateId, false);
            append(template, buttonContainer);
        }
        else if (direction === 'Next' && this.nextButtonTemplate) {
            addClass([buttonContainer], CLS_TEMPLATE$2);
            var templateId = this.element.id + '_nextButtonTemplate';
            var template = this.templateParser(this.nextButtonTemplate)({ type: 'Next' }, this, 'nextButtonTemplate', templateId, false);
            append(template, buttonContainer);
        }
        else {
            var button = this.createElement('button', {
                attrs: { 'aria-label': this.localeObj.getConstant(direction === 'Previous' ? 'previousSlide' : 'nextSlide'), 'type': 'button' }
            });
            var buttonObj = new Button({
                cssClass: CLS_FLAT + ' ' + CLS_ROUND + ' ' + (direction === 'Previous' ? CLS_PREV_BUTTON : CLS_NEXT_BUTTON),
                iconCss: CLS_ICON$1 + ' ' + (direction === 'Previous' ? CLS_PREV_ICON : CLS_NEXT_ICON),
                enableRtl: this.enableRtl,
                disabled: !this.loop && this.selectedIndex === (direction === 'Previous' ? 0 : this.slideItems.length - 1)
            });
            buttonObj.appendTo(button);
            buttonContainer.appendChild(button);
        }
        this.element.querySelector('.' + CLS_NAVIGATORS).appendChild(buttonContainer);
        EventHandler.add(buttonContainer, 'click', this.navigatorClickHandler, this);
    };
    Carousel.prototype.renderPlayButton = function () {
        if (isNullOrUndefined(this.slideItems) || this.buttonsVisibility === 'Hidden' || !this.showPlayButton || this.slideItems.length <= 1) {
            return;
        }
        var playPauseWrap = this.createElement('div', {
            className: CLS_PLAY_PAUSE + ' ' + (this.buttonsVisibility === 'VisibleOnHover' ? CLS_HOVER_ARROWS : '')
        });
        if (this.playButtonTemplate) {
            addClass([playPauseWrap], CLS_TEMPLATE$2);
            var templateId = this.element.id + '_playButtonTemplate';
            var template = this.templateParser(this.playButtonTemplate)({}, this, 'playButtonTemplate', templateId, false);
            append(template, playPauseWrap);
        }
        else {
            var playButton = this.createElement('button', {
                attrs: { 'aria-label': this.localeObj.getConstant(this.autoPlay ? 'pauseSlideTransition' : 'playSlideTransition'), 'type': 'button' }
            });
            var isLastSlide = this.selectedIndex === this.slideItems.length - 1 && !this.loop;
            var buttonObj = new Button({
                cssClass: CLS_FLAT + ' ' + CLS_ROUND + ' ' + CLS_PLAY_BUTTON,
                iconCss: CLS_ICON$1 + ' ' + (this.autoPlay && !isLastSlide ? CLS_PAUSE_ICON : CLS_PLAY_ICON),
                isToggle: true,
                enableRtl: this.enableRtl
            });
            if (isLastSlide) {
                this.setProperties({ autoPlay: false }, true);
                playButton.setAttribute('aria-label', this.localeObj.getConstant('playSlideTransition'));
                this.itemsContainer.setAttribute('aria-live', 'polite');
            }
            buttonObj.appendTo(playButton);
            playPauseWrap.appendChild(playButton);
        }
        var navigators = this.element.querySelector("." + CLS_NAVIGATORS);
        navigators.insertBefore(playPauseWrap, navigators.lastElementChild);
        this.renderTemplates();
        EventHandler.add(playPauseWrap, 'click', this.playButtonClickHandler, this);
    };
    Carousel.prototype.renderIndicators = function () {
        var _this = this;
        if (!this.showIndicators || isNullOrUndefined(this.indicatorsType)) {
            return;
        }
        var indicatorClass = 'e-default';
        if (!this.indicatorsTemplate) {
            indicatorClass = "e-" + this.indicatorsType.toLowerCase();
        }
        var indicatorWrap = this.createElement('div', { className: CLS_INDICATORS + " " + indicatorClass });
        var indicatorBars = this.createElement('div', { className: CLS_INDICATOR_BARS });
        indicatorWrap.appendChild(indicatorBars);
        var progress;
        if (this.slideItems) {
            switch (this.indicatorsType) {
                case 'Fraction':
                    if (this.indicatorsTemplate) {
                        this.renderIndicatorTemplate(indicatorBars, this.selectedIndex + 1);
                    }
                    else {
                        indicatorBars.innerText = this.selectedIndex + 1 + " / " + this.slideItems.length;
                    }
                    break;
                case 'Progress':
                    if (this.indicatorsTemplate) {
                        this.renderIndicatorTemplate(indicatorBars, this.selectedIndex + 1);
                    }
                    else {
                        progress = this.createElement('div', { className: CLS_INDICATOR_BAR });
                        progress.style.setProperty('--carousel-items-current', "" + (this.selectedIndex + 1));
                        progress.style.setProperty('--carousel-items-count', "" + this.slideItems.length);
                        indicatorBars.appendChild(progress);
                    }
                    break;
                case 'Default':
                case 'Dynamic':
                    this.slideItems.forEach(function (item, index) {
                        var indicatorBar = _this.createElement('div', {
                            className: CLS_INDICATOR_BAR + ' ' + (_this.selectedIndex === index ? CLS_ACTIVE$2 : _this.selectedIndex - 1 === index ? CLS_PREV_SLIDE : _this.selectedIndex + 1 === index ? CLS_NEXT_SLIDE : ''),
                            attrs: { 'data-index': index.toString(), 'aria-current': _this.selectedIndex === index ? 'true' : 'false' }
                        });
                        indicatorBar.style.setProperty('--carousel-items-current', "" + _this.selectedIndex);
                        if (_this.indicatorsTemplate) {
                            _this.renderIndicatorTemplate(indicatorBar, index);
                        }
                        else if (_this.indicatorsType === 'Default') {
                            var indicator = _this.createElement('button', { className: CLS_INDICATOR$1, attrs: { 'type': 'button', 'aria-label': _this.localeObj.getConstant('slide') + ' ' + (index + 1) + ' ' + _this.localeObj.getConstant('of') + ' ' + _this.slideItems.length } });
                            indicatorBar.appendChild(indicator);
                            indicator.appendChild(_this.createElement('div', {}));
                            var buttonObj = new Button({ cssClass: 'e-flat e-small' });
                            buttonObj.appendTo(indicator);
                        }
                        indicatorBars.appendChild(indicatorBar);
                        if (_this.indicatorsType === 'Default') {
                            EventHandler.add(indicatorBar, 'click', _this.indicatorClickHandler, _this);
                        }
                    });
                    break;
            }
        }
        this.element.appendChild(indicatorWrap);
    };
    Carousel.prototype.renderIndicatorTemplate = function (indicatorBar, index) {
        if (index === void 0) { index = 0; }
        addClass([indicatorBar], CLS_TEMPLATE$2);
        var templateId = this.element.id + '_indicatorsTemplate';
        var template = this.templateParser(this.indicatorsTemplate)({ index: index, selectedIndex: this.selectedIndex }, this, 'indicatorsTemplate', templateId, false);
        append(template, indicatorBar);
    };
    Carousel.prototype.renderKeyboardActions = function () {
        if (!this.allowKeyboardInteraction) {
            return;
        }
        this.keyModule = new KeyboardEvents(this.element, { keyAction: this.keyHandler.bind(this), keyConfigs: this.keyConfigs });
    };
    Carousel.prototype.renderTouchActions = function () {
        if (!this.enableTouchSwipe) {
            return;
        }
        this.touchModule = new Touch(this.element, { swipe: this.swipeHandler.bind(this) });
    };
    Carousel.prototype.applyAnimation = function () {
        removeClass([this.element], [CLS_CUSTOM_ANIMATION, CLS_FADE_ANIMATION, CLS_SLIDE_ANIMATION, CLS_ANIMATION_NONE]);
        switch (this.animationEffect) {
            case 'Slide':
                addClass([this.element], CLS_SLIDE_ANIMATION);
                break;
            case 'Fade':
                addClass([this.element], CLS_FADE_ANIMATION);
                break;
            case 'None':
                addClass([this.element], CLS_ANIMATION_NONE);
                break;
            case 'Custom':
                addClass([this.element], CLS_CUSTOM_ANIMATION);
                break;
        }
    };
    Carousel.prototype.autoSlide = function () {
        if (isNullOrUndefined(this.slideItems) || this.slideItems.length <= 1) {
            return;
        }
        this.resetSlideInterval();
        this.applySlideInterval();
    };
    Carousel.prototype.autoSlideChange = function () {
        var activeSlide = this.element.querySelector("." + CLS_ITEM$3 + "." + CLS_ACTIVE$2)
            || this.element.querySelector("." + CLS_INDICATORS + " ." + CLS_ACTIVE$2);
        if (isNullOrUndefined(activeSlide)) {
            return;
        }
        var activeIndex = parseInt(activeSlide.dataset.index, 10);
        if (!this.loop && activeIndex === this.slideItems.length - 1) {
            this.resetSlideInterval();
        }
        else {
            var index = (activeIndex + 1) % this.slideItems.length;
            if (!this.element.classList.contains(CLS_HOVER)) {
                this.setActiveSlide(index, 'Next');
            }
            this.autoSlide();
        }
    };
    Carousel.prototype.applySlideInterval = function () {
        var _this = this;
        if (!this.autoPlay || this.element.classList.contains(CLS_HOVER)) {
            return;
        }
        var itemInterval = this.interval;
        if (this.items.length > 0 && !isNullOrUndefined(this.items[this.selectedIndex || 0].interval)) {
            itemInterval = this.items[this.selectedIndex || 0].interval;
        }
        this.autoSlideInterval = setInterval(function () { return _this.autoSlideChange(); }, itemInterval);
    };
    Carousel.prototype.resetSlideInterval = function () {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
    };
    Carousel.prototype.getSlideIndex = function (direction) {
        var currentIndex = this.selectedIndex || 0;
        if (direction === 'Previous') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = this.slideItems.length - 1;
            }
        }
        else {
            currentIndex++;
            if (currentIndex === this.slideItems.length) {
                currentIndex = 0;
            }
        }
        return currentIndex;
    };
    Carousel.prototype.setActiveSlide = function (currentIndex, direction, isSwiped) {
        var _this = this;
        if (isSwiped === void 0) { isSwiped = false; }
        if (this.element.querySelectorAll("." + CLS_ITEM$3 + "." + CLS_PREV_SLIDE + ",." + CLS_ITEM$3 + "." + CLS_NEXT_SLIDE).length > 0) {
            return;
        }
        currentIndex = isNullOrUndefined(currentIndex) ? 0 : currentIndex;
        var allSlides = [].slice.call(this.element.querySelectorAll("." + CLS_ITEM$3 + ":not(.e-cloned)"));
        var activeSlide = this.element.querySelector("." + CLS_ITEM$3 + "." + CLS_ACTIVE$2);
        if (isNullOrUndefined(activeSlide) && this.showIndicators) {
            var activeIndicator = this.element.querySelector("." + CLS_INDICATOR_BAR + "." + CLS_ACTIVE$2);
            var activeIndex_1 = parseInt(activeIndicator.dataset.index, 10);
            addClass([allSlides[parseInt(activeIndex_1.toString(), 10)]], CLS_ACTIVE$2);
            return;
        }
        else if (isNullOrUndefined(activeSlide)) {
            addClass([allSlides[parseInt(currentIndex.toString(), 10)]], CLS_ACTIVE$2);
            return;
        }
        var activeIndex = parseInt(activeSlide.dataset.index, 10);
        var currentSlide = allSlides[parseInt(currentIndex.toString(), 10)];
        var eventArgs = {
            currentIndex: activeIndex,
            nextIndex: currentIndex,
            currentSlide: activeSlide,
            nextSlide: currentSlide,
            slideDirection: direction,
            isSwiped: isSwiped,
            cancel: false
        };
        this.trigger('slideChanging', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            _this.setProperties({ selectedIndex: currentIndex }, true);
            attributes(args.currentSlide, { 'aria-hidden': 'true' });
            args.currentSlide.setAttribute('inert', 'true');
            attributes(args.nextSlide, { 'aria-hidden': 'false' });
            args.nextSlide.removeAttribute('inert');
            _this.refreshIndicators(activeIndex, currentIndex);
            _this.slideChangedEventArgs = {
                currentIndex: args.nextIndex,
                previousIndex: args.currentIndex,
                currentSlide: args.nextSlide,
                previousSlide: args.currentSlide,
                slideDirection: direction,
                isSwiped: isSwiped
            };
            var slideWidth = allSlides[parseInt(currentIndex.toString(), 10)].clientWidth;
            var numOfItems = _this.getNumOfItems();
            if (!_this.isSwipe) {
                _this.itemsContainer.style.transitionDuration = '0.6s';
            }
            _this.isSwipe = false;
            if ((_this.animationEffect === 'Fade')) {
                _this.itemsContainer.classList.add('e-fade-in-out');
            }
            else {
                _this.itemsContainer.style.transitionProperty = 'transform';
            }
            if (_this.loop) {
                if (_this.slideChangedEventArgs.currentIndex === 0 && _this.slideChangedEventArgs.slideDirection === 'Next') {
                    _this.itemsContainer.style.transform = _this.getTranslateX(slideWidth, allSlides.length + numOfItems);
                }
                else if (_this.slideChangedEventArgs.currentIndex === _this.slideItems.length - 1 && _this.slideChangedEventArgs.slideDirection === 'Previous') {
                    _this.itemsContainer.style.transform = _this.partialVisible ? _this.getTranslateX(slideWidth) : 'translateX(0px)';
                }
                else {
                    _this.itemsContainer.style.transform = _this.getTranslateX(slideWidth, currentIndex + numOfItems);
                }
            }
            else {
                _this.itemsContainer.style.transform = _this.getTranslateX(slideWidth, currentIndex);
            }
            if (_this.animationEffect === 'Slide') {
                if (direction === 'Previous') {
                    addClass([args.nextSlide], CLS_PREV_SLIDE);
                    args.nextSlide.setAttribute('data-slide-height', args.nextSlide.offsetHeight.toString());
                    addClass([args.currentSlide, args.nextSlide], CLS_TRANSITION_END);
                }
                else {
                    addClass([args.nextSlide], CLS_NEXT_SLIDE);
                    args.nextSlide.setAttribute('data-slide-height', args.nextSlide.offsetHeight.toString());
                    addClass([args.currentSlide, args.nextSlide], CLS_TRANSITION_START);
                }
            }
            else if (_this.animationEffect === 'Fade') {
                removeClass([args.currentSlide], CLS_ACTIVE$2);
                addClass([args.nextSlide], CLS_ACTIVE$2);
            }
            else if (_this.animationEffect === 'Custom') {
                if (direction === 'Previous') {
                    addClass([args.nextSlide], CLS_NEXT_SLIDE);
                    addClass([args.currentSlide], CLS_PREV_SLIDE);
                }
                else {
                    addClass([args.currentSlide], CLS_PREV_SLIDE);
                    addClass([args.nextSlide], CLS_NEXT_SLIDE);
                }
            }
            else {
                _this.onTransitionEnd();
            }
            _this.handleNavigatorsActions(currentIndex);
        });
    };
    Carousel.prototype.onTransitionEnd = function () {
        var _this = this;
        removeClass(this.element.querySelectorAll("." + CLS_ITEMS$2), 'e-fade-in-out');
        var numOfItems = this.getNumOfItems();
        if (this.slideChangedEventArgs) {
            this.itemsContainer.style.transitionProperty = 'none';
            if (this.loop && (this.slideChangedEventArgs.currentIndex === 0 && this.slideChangedEventArgs.slideDirection === 'Next' ||
                this.slideChangedEventArgs.currentIndex === this.slideItems.length - 1 && this.slideChangedEventArgs.slideDirection === 'Previous')) {
                var slideWidth = this.slideChangedEventArgs.currentSlide.clientWidth;
                this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.slideChangedEventArgs.currentIndex + numOfItems);
            }
            addClass([this.slideChangedEventArgs.currentSlide], CLS_ACTIVE$2);
            removeClass([this.slideChangedEventArgs.previousSlide], CLS_ACTIVE$2);
            this.trigger('slideChanged', this.slideChangedEventArgs, function () {
                removeClass(_this.element.querySelectorAll("." + CLS_ITEM$3), [CLS_PREV_SLIDE, CLS_NEXT_SLIDE, CLS_TRANSITION_START, CLS_TRANSITION_END]);
                _this.slideChangedEventArgs = null;
            });
        }
    };
    Carousel.prototype.refreshIndicators = function (activeIndex, currentIndex) {
        var _this = this;
        var slideIndicator = this.element.querySelector("." + CLS_INDICATOR_BARS);
        if (isNullOrUndefined(slideIndicator)) {
            return;
        }
        var indicators = [].slice.call(slideIndicator.childNodes);
        switch (this.indicatorsType) {
            case 'Default':
            case 'Dynamic':
                attributes(indicators[parseInt(activeIndex.toString(), 10)], { 'aria-current': 'false' });
                attributes(indicators[parseInt(currentIndex.toString(), 10)], { 'aria-current': 'true' });
                removeClass(indicators, [CLS_ACTIVE$2, CLS_PREV_SLIDE, CLS_NEXT_SLIDE]);
                addClass([indicators[parseInt(currentIndex.toString(), 10)]], CLS_ACTIVE$2);
                if (indicators[currentIndex - 1]) {
                    addClass([indicators[currentIndex - 1]], CLS_PREV_SLIDE);
                }
                if (indicators[currentIndex + 1]) {
                    addClass([indicators[currentIndex + 1]], CLS_NEXT_SLIDE);
                }
                indicators.forEach(function (item) { return item.style.setProperty('--carousel-items-current', "" + _this.selectedIndex); });
                break;
            case 'Fraction':
                if (this.indicatorsTemplate) {
                    if (slideIndicator.children.length > 0) {
                        slideIndicator.removeChild(slideIndicator.firstElementChild);
                    }
                    this.renderIndicatorTemplate(slideIndicator, currentIndex + 1);
                }
                else {
                    slideIndicator.innerText = this.selectedIndex + 1 + " / " + this.slideItems.length;
                }
                break;
            case 'Progress':
                if (this.indicatorsTemplate) {
                    if (slideIndicator.children.length > 0) {
                        slideIndicator.removeChild(slideIndicator.firstElementChild);
                    }
                    this.renderIndicatorTemplate(slideIndicator, currentIndex + 1);
                }
                else {
                    slideIndicator.firstElementChild.style.setProperty('--carousel-items-current', "" + (this.selectedIndex + 1));
                }
                break;
        }
    };
    Carousel.prototype.setHtmlAttributes = function (attribute, element) {
        var keys = Object.keys(attribute);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key === 'class') {
                addClass([element], attribute["" + key]);
            }
            else {
                element.setAttribute(key, attribute["" + key]);
            }
        }
    };
    Carousel.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return compile(template);
            }
        }
        return undefined;
    };
    Carousel.prototype.getNavigatorState = function (target, isPrevious) {
        var button = target.querySelector("." + (isPrevious ? CLS_PREV_BUTTON : CLS_NEXT_BUTTON));
        if (button) {
            var buttonObj = getInstance(button, Button);
            return buttonObj.disabled;
        }
        return false;
    };
    Carousel.prototype.navigatorClickHandler = function (e) {
        var target = e.currentTarget;
        var isDisabled = this.getNavigatorState(target, target.classList.contains(CLS_PREVIOUS));
        if (isDisabled) {
            return;
        }
        var direction = target.classList.contains(CLS_PREVIOUS) ? 'Previous' : 'Next';
        this.setActiveSlide(this.getSlideIndex(direction), direction);
        this.autoSlide();
    };
    Carousel.prototype.indicatorClickHandler = function (e) {
        var target = closest(e.target, "." + CLS_INDICATOR_BAR);
        var index = parseInt(target.dataset.index, 10);
        if (this.selectedIndex !== index) {
            this.setActiveSlide(index, this.selectedIndex > index ? 'Previous' : 'Next');
            this.autoSlide();
        }
    };
    Carousel.prototype.playButtonClickHandler = function (e, isPropertyChange) {
        if (isPropertyChange === void 0) { isPropertyChange = false; }
        var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
        if (playButton) {
            var buttonObj = getInstance(playButton, Button);
            if (!isPropertyChange) {
                this.setProperties({ autoPlay: !this.autoPlay }, true);
            }
            playButton.setAttribute('aria-label', this.localeObj.getConstant(this.autoPlay ? 'pauseSlideTransition' : 'playSlideTransition'));
            buttonObj.iconCss = CLS_ICON$1 + ' ' + (this.autoPlay ? CLS_PAUSE_ICON : CLS_PLAY_ICON);
            buttonObj.dataBind();
            this.itemsContainer.setAttribute('aria-live', this.autoPlay ? 'off' : 'polite');
            if (this.autoPlay && !this.loop && this.selectedIndex === this.slideItems.length - 1) {
                this.setActiveSlide(0, 'Next');
            }
            this.autoSlide();
        }
    };
    Carousel.prototype.keyHandler = function (e) {
        if (!this.allowKeyboardInteraction) {
            return;
        }
        var direction;
        var slideIndex;
        var isSlideTransition = false;
        var target = e.target;
        e.preventDefault();
        switch (e.action) {
            case 'space':
                if (this.showIndicators && target.classList.contains(CLS_INDICATOR$1)) {
                    target.click();
                }
                else if (target.classList.contains(CLS_CAROUSEL) || target.classList.contains(CLS_PLAY_BUTTON)) {
                    this.playButtonClickHandler(e);
                }
                else if (target.classList.contains(CLS_NEXT_BUTTON)) {
                    this.next();
                }
                else if (target.classList.contains(CLS_PREV_BUTTON)) {
                    this.prev();
                }
                break;
            case 'end':
                slideIndex = this.slideItems.length - 1;
                direction = 'Next';
                isSlideTransition = true;
                break;
            case 'home':
                slideIndex = 0;
                direction = 'Previous';
                isSlideTransition = true;
                break;
            case 'moveUp':
            case 'moveLeft':
            case 'moveDown':
            case 'moveRight':
                if (this.showIndicators && isNullOrUndefined(this.indicatorsTemplate)) {
                    this.element.focus();
                }
                direction = (e.action === 'moveUp' || e.action === 'moveLeft') ? 'Previous' : 'Next';
                slideIndex = this.getSlideIndex(direction);
                isSlideTransition = !this.isSuspendSlideTransition(slideIndex, direction);
                break;
        }
        if (isSlideTransition) {
            this.setActiveSlide(slideIndex, direction);
            this.autoSlide();
            isSlideTransition = false;
        }
    };
    Carousel.prototype.swipeHandler = function (e) {
        if (this.element.classList.contains(CLS_HOVER) || isNullOrUndefined(this.slideItems) || this.slideItems.length <= 1) {
            return;
        }
        var direction = (e.swipeDirection === 'Right') ? 'Previous' : 'Next';
        var slideIndex = this.getSlideIndex(direction);
        if (!this.isSuspendSlideTransition(slideIndex, direction)) {
            this.setActiveSlide(slideIndex, direction, true);
            this.autoSlide();
        }
    };
    Carousel.prototype.isSuspendSlideTransition = function (index, direction) {
        return !this.loop && (direction === 'Next' && index === 0 || direction === 'Previous' && index === this.slideItems.length - 1);
    };
    Carousel.prototype.handleNavigatorsActions = function (index) {
        if (this.buttonsVisibility === 'Hidden') {
            return;
        }
        if (this.showPlayButton) {
            var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
            var isLastSlide = this.selectedIndex === this.slideItems.length - 1 && !this.loop;
            var isButtonUpdate = isNullOrUndefined(this.playButtonTemplate) && playButton && isLastSlide;
            if (isNullOrUndefined(this.playButtonTemplate) && playButton && !isLastSlide) {
                isButtonUpdate = !playButton.classList.contains(CLS_ACTIVE$2);
            }
            if (isButtonUpdate) {
                this.setProperties({ autoPlay: !isLastSlide }, true);
                playButton.setAttribute('aria-label', this.localeObj.getConstant(this.autoPlay ? 'pauseSlideTransition' : 'playSlideTransition'));
                this.itemsContainer.setAttribute('aria-live', this.autoPlay ? 'off' : 'polite');
                var buttonObj = getInstance(playButton, Button);
                buttonObj.iconCss = CLS_ICON$1 + ' ' + (this.autoPlay ? CLS_PAUSE_ICON : CLS_PLAY_ICON);
                buttonObj.dataBind();
            }
        }
        var prevButton = this.element.querySelector("." + CLS_PREV_BUTTON);
        if (prevButton && isNullOrUndefined(this.previousButtonTemplate)) {
            var buttonObj = getInstance(prevButton, Button);
            buttonObj.disabled = !this.loop && index === 0;
            buttonObj.dataBind();
        }
        var nextButton = this.element.querySelector("." + CLS_NEXT_BUTTON);
        if (nextButton && isNullOrUndefined(this.nextButtonTemplate)) {
            var buttonObj = getInstance(nextButton, Button);
            buttonObj.disabled = !this.loop && index === this.slideItems.length - 1;
            buttonObj.dataBind();
        }
    };
    Carousel.prototype.onHoverActions = function (e) {
        var navigator = this.element.querySelector("." + CLS_NAVIGATORS);
        switch (e.type) {
            case 'mouseenter':
                if (this.buttonsVisibility === 'VisibleOnHover' && navigator) {
                    removeClass([].slice.call(navigator.childNodes), CLS_HOVER_ARROWS);
                }
                if (this.pauseOnHover) {
                    addClass([this.element], CLS_HOVER);
                }
                break;
            case 'mouseleave':
                if (this.buttonsVisibility === 'VisibleOnHover' && navigator) {
                    addClass([].slice.call(navigator.childNodes), CLS_HOVER_ARROWS);
                }
                removeClass([this.element], CLS_HOVER);
                if (this.isSwipe) {
                    this.swipStop();
                }
                break;
        }
        this.autoSlide();
    };
    Carousel.prototype.onFocusActions = function (e) {
        switch (e.type) {
            case 'focusin':
                addClass([this.element], CLS_HOVER);
                break;
            case 'focusout':
                removeClass([this.element], CLS_HOVER);
                break;
        }
        this.autoSlide();
    };
    Carousel.prototype.destroyButtons = function () {
        var buttonCollections = [].slice.call(this.element.querySelectorAll('.e-control.e-btn'));
        for (var _i = 0, buttonCollections_1 = buttonCollections; _i < buttonCollections_1.length; _i++) {
            var button = buttonCollections_1[_i];
            var instance = getInstance(button, Button);
            if (instance) {
                instance.destroy();
            }
        }
    };
    Carousel.prototype.getNumOfItems = function () {
        return this.partialVisible ? 2 : 1;
    };
    Carousel.prototype.getTranslateValue = function (element) {
        var style = getComputedStyle(element);
        return window.WebKitCSSMatrix ?
            new WebKitCSSMatrix(style.webkitTransform).m41 : 0;
    };
    Carousel.prototype.swipeStart = function (e) {
        if (!this.timeStampStart) {
            this.timeStampStart = Date.now();
        }
        e.preventDefault();
        this.isSwipe = false;
        this.itemsContainer.classList.add('e-swipe-start');
        this.prevPageX = e.touches ? e.touches[0].pageX : e.pageX;
        this.initialTranslate = this.getTranslateValue(this.itemsContainer);
    };
    Carousel.prototype.swiping = function (e) {
        if (!this.itemsContainer.classList.contains('e-swipe-start')) {
            return;
        }
        this.isSwipe = true;
        e.preventDefault();
        var pageX = e.touches ? e.touches[0].pageX : e.pageX;
        var positionDiff = this.prevPageX - (pageX);
        if (!this.loop && ((this.enableRtl && ((this.selectedIndex === 0 && positionDiff > 0) ||
            (this.selectedIndex === this.itemsContainer.childElementCount - 1 && positionDiff < 0))) ||
            (!this.enableRtl && ((this.selectedIndex === 0 && positionDiff < 0) ||
                (this.selectedIndex === this.itemsContainer.childElementCount - 1 && positionDiff > 0))))) {
            return;
        }
        this.itemsContainer.style.transform = "translateX(" + (this.initialTranslate + (this.enableRtl ? positionDiff : -positionDiff)) + "px)";
    };
    Carousel.prototype.swipStop = function () {
        var time = Date.now() - this.timeStampStart;
        var distanceX = this.getTranslateValue(this.itemsContainer) - this.initialTranslate;
        distanceX = distanceX < 0 ? distanceX * -1 : distanceX;
        if (this.isSwipe) {
            var offsetDist = distanceX * (Browser.isDevice ? 6 : 1.66);
            this.itemsContainer.style.transitionDuration = (((Browser.isDevice ? distanceX : offsetDist) / time) / 10) + 's';
        }
        var slideWidth = this.itemsContainer.firstElementChild.clientWidth;
        var threshold = slideWidth / 2;
        this.itemsContainer.classList.remove('e-swipe-start');
        var value = this.getTranslateValue(this.itemsContainer);
        if (value - this.initialTranslate < -threshold) {
            this.swipeNavigation(!this.enableRtl);
        }
        else if (value - this.initialTranslate > threshold) {
            this.swipeNavigation(this.enableRtl);
        }
        else {
            this.itemsContainer.style.transform = "translateX(" + this.initialTranslate + "px)";
            if (this.animationEffect === 'Fade') {
                this.itemsContainer.classList.add('e-fade-in-out');
            }
        }
    };
    Carousel.prototype.swipeNavigation = function (isRtl) {
        if (isRtl) {
            this.next();
        }
        else {
            this.prev();
        }
    };
    Carousel.prototype.swipeModehandlers = function () {
        if ((this.swipeMode & CarouselSwipeMode.Touch) === CarouselSwipeMode.Touch) {
            EventHandler.add(this.itemsContainer, 'touchstart', this.swipeStart, this);
            EventHandler.add(this.itemsContainer, 'touchmove', this.swiping, this);
            EventHandler.add(this.itemsContainer, 'touchend', this.swipStop, this);
        }
        if ((this.swipeMode & CarouselSwipeMode.Mouse) === CarouselSwipeMode.Mouse) {
            EventHandler.add(this.itemsContainer, 'mousedown', this.swipeStart, this);
            EventHandler.add(this.itemsContainer, 'mousemove', this.swiping, this);
            EventHandler.add(this.itemsContainer, 'mouseup', this.swipStop, this);
        }
        if ((this.swipeMode === 0) && (this.swipeMode & CarouselSwipeMode.Mouse & CarouselSwipeMode.Touch) ===
            (CarouselSwipeMode.Mouse & CarouselSwipeMode.Touch)) {
            EventHandler.add(this.itemsContainer, 'mousedown touchstart', this.swipeStart, this);
            EventHandler.add(this.itemsContainer, 'mousemove touchmove', this.swiping, this);
            EventHandler.add(this.itemsContainer, 'mouseup touchend', this.swipStop, this);
        }
    };
    Carousel.prototype.resizeHandler = function () {
        if (this.itemsContainer && this.itemsContainer.firstElementChild) {
            var numOfItems = this.getNumOfItems();
            var slideWidth = this.itemsContainer.firstElementChild.clientWidth;
            if (this.loop) {
                this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex + numOfItems);
            }
            else {
                this.itemsContainer.style.transform = this.getTranslateX(slideWidth, this.selectedIndex);
            }
        }
    };
    Carousel.prototype.wireEvents = function () {
        if (this.animationEffect !== 'Custom' && this.enableTouchSwipe) {
            this.swipeModehandlers();
        }
        EventHandler.add(this.element, 'focusin focusout', this.onFocusActions, this);
        EventHandler.add(this.element, 'mouseenter mouseleave', this.onHoverActions, this);
        EventHandler.add(this.element.firstElementChild, 'animationend', this.onTransitionEnd, this);
        EventHandler.add(this.element.firstElementChild, 'transitionend', this.onTransitionEnd, this);
        EventHandler.add(window, 'resize', this.resizeHandler, this);
    };
    Carousel.prototype.unWireEvents = function () {
        var _this = this;
        var indicators = [].slice.call(this.element.querySelectorAll("." + CLS_INDICATOR_BAR));
        indicators.forEach(function (indicator) {
            EventHandler.remove(indicator, 'click', _this.indicatorClickHandler);
        });
        var navigators = [].slice.call(this.element.querySelectorAll("." + CLS_PREVIOUS + ",." + CLS_NEXT));
        navigators.forEach(function (navigator) {
            EventHandler.remove(navigator, 'click', _this.navigatorClickHandler);
        });
        var playIcon = this.element.querySelector("." + CLS_PLAY_PAUSE);
        if (playIcon) {
            EventHandler.remove(playIcon, 'click', this.playButtonClickHandler);
        }
        EventHandler.remove(this.element.firstElementChild, 'animationend', this.onTransitionEnd);
        EventHandler.remove(this.element.firstElementChild, 'transitionend', this.onTransitionEnd);
        EventHandler.clearEvents(this.element);
        EventHandler.clearEvents(this.itemsContainer);
        EventHandler.remove(window, 'resize', this.resizeHandler);
    };
    /**
     * Method to transit from the current slide to the previous slide.
     *
     * @returns {void}
     */
    Carousel.prototype.prev = function () {
        if (!this.loop && this.selectedIndex === 0) {
            return;
        }
        var index = (this.selectedIndex === 0) ? this.slideItems.length - 1 : this.selectedIndex - 1;
        this.setActiveSlide(index, 'Previous');
        this.autoSlide();
    };
    /**
     * Method to transit from the current slide to the next slide.
     *
     * @returns {void}
     */
    Carousel.prototype.next = function () {
        if (!this.loop && this.selectedIndex === this.slideItems.length - 1) {
            return;
        }
        var index = (this.selectedIndex === this.slideItems.length - 1) ? 0 : this.selectedIndex + 1;
        this.setActiveSlide(index, 'Next');
        this.autoSlide();
    };
    /**
     * Method to play the slides programmatically.
     *
     * @returns {void}
     */
    Carousel.prototype.play = function () {
        var playIcon = this.element.querySelector("." + CLS_PLAY_ICON);
        if (this.showPlayButton && playIcon) {
            classList(playIcon, [CLS_PAUSE_ICON], [CLS_PLAY_ICON]);
            var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
            playButton.setAttribute('aria-label', this.localeObj.getConstant('pauseSlideTransition'));
        }
        this.setProperties({ autoPlay: true }, true);
        this.itemsContainer.setAttribute('aria-live', 'off');
        this.applySlideInterval();
    };
    /**
     * Method to pause the slides programmatically.
     *
     * @returns {void}
     */
    Carousel.prototype.pause = function () {
        var pauseIcon = this.element.querySelector("." + CLS_PAUSE_ICON);
        if (this.showPlayButton && pauseIcon) {
            var playButton = this.element.querySelector("." + CLS_PLAY_BUTTON);
            playButton.setAttribute('aria-label', this.localeObj.getConstant('playSlideTransition'));
            classList(pauseIcon, [CLS_PLAY_ICON], [CLS_PAUSE_ICON]);
        }
        this.setProperties({ autoPlay: false }, true);
        this.itemsContainer.setAttribute('aria-live', 'off');
        this.resetSlideInterval();
    };
    /**
     * Method to render react and angular templates
     *
     * @returns {void}
     * @private
     */
    Carousel.prototype.renderTemplates = function () {
        if (this.isAngular || this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * Method to reset react and angular templates
     *
     * @param {string[]} templates Accepts the template ID
     * @returns {void}
     * @private
     */
    Carousel.prototype.resetTemplates = function (templates) {
        if (this.isAngular || this.isReact) {
            this.clearTemplate(templates);
        }
    };
    /**
     * Method for destroy the carousel component.
     *
     * @returns {void}
     */
    Carousel.prototype.destroy = function () {
        var _this = this;
        this.resetTemplates();
        if (this.touchModule) {
            this.touchModule.destroy();
            this.touchModule = null;
        }
        if (this.keyModule) {
            this.keyModule.destroy();
            this.keyModule = null;
        }
        this.resetSlideInterval();
        this.destroyButtons();
        this.unWireEvents();
        [].slice.call(this.element.children).forEach(function (ele) { _this.element.removeChild(ele); });
        removeClass([this.element], [CLS_CAROUSEL, this.cssClass, CLS_RTL$5, CLS_SWIPE]);
        ['role', 'style'].forEach(function (attr) { _this.element.removeAttribute(attr); });
        this.itemsContainer = null;
        _super.prototype.destroy.call(this);
    };
    __decorate$b([
        Collection([], CarouselItem)
    ], Carousel.prototype, "items", void 0);
    __decorate$b([
        Property('Slide')
    ], Carousel.prototype, "animationEffect", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "previousButtonTemplate", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "nextButtonTemplate", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "indicatorsTemplate", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "playButtonTemplate", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "cssClass", void 0);
    __decorate$b([
        Property([])
    ], Carousel.prototype, "dataSource", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "itemTemplate", void 0);
    __decorate$b([
        Property(0)
    ], Carousel.prototype, "selectedIndex", void 0);
    __decorate$b([
        Property('100%')
    ], Carousel.prototype, "width", void 0);
    __decorate$b([
        Property('100%')
    ], Carousel.prototype, "height", void 0);
    __decorate$b([
        Property(5000)
    ], Carousel.prototype, "interval", void 0);
    __decorate$b([
        Property(true)
    ], Carousel.prototype, "autoPlay", void 0);
    __decorate$b([
        Property(true)
    ], Carousel.prototype, "pauseOnHover", void 0);
    __decorate$b([
        Property(true)
    ], Carousel.prototype, "loop", void 0);
    __decorate$b([
        Property(false)
    ], Carousel.prototype, "showPlayButton", void 0);
    __decorate$b([
        Property(true)
    ], Carousel.prototype, "enableTouchSwipe", void 0);
    __decorate$b([
        Property(true)
    ], Carousel.prototype, "allowKeyboardInteraction", void 0);
    __decorate$b([
        Property(true)
    ], Carousel.prototype, "showIndicators", void 0);
    __decorate$b([
        Property('Default')
    ], Carousel.prototype, "indicatorsType", void 0);
    __decorate$b([
        Property('Visible')
    ], Carousel.prototype, "buttonsVisibility", void 0);
    __decorate$b([
        Property(false)
    ], Carousel.prototype, "partialVisible", void 0);
    __decorate$b([
        Property(CarouselSwipeMode.Touch)
    ], Carousel.prototype, "swipeMode", void 0);
    __decorate$b([
        Property()
    ], Carousel.prototype, "htmlAttributes", void 0);
    __decorate$b([
        Event()
    ], Carousel.prototype, "slideChanging", void 0);
    __decorate$b([
        Event()
    ], Carousel.prototype, "slideChanged", void 0);
    Carousel = __decorate$b([
        NotifyPropertyChanges
    ], Carousel);
    return Carousel;
}(Component));

var __extends$c = (undefined && undefined.__extends) || (function () {
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
var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Constant variables
var CLS_APPBAR = 'e-appbar';
var CLS_HORIZONTAL_BOTTOM = 'e-horizontal-bottom';
var CLS_STICKY = 'e-sticky';
var CLS_PROMINENT = 'e-prominent';
var CLS_DENSE = 'e-dense';
var CLS_RTL$6 = 'e-rtl';
var CLS_LIGHT = 'e-light';
var CLS_DARK = 'e-dark';
var CLS_PRIMARY = 'e-primary';
var CLS_INHERIT = 'e-inherit';
/**
 * The AppBar displays the information and actions related to the current application screen. It is used to show branding, screen titles, navigation, and actions.
 * Support to inherit colors from AppBar provided to <c>Button</c>, <c>DropDownButton</c>, <c>Menu</c> and <c>TextBox</c>.
 * Set <c>CssClass</c> property with <code>e-inherit</code> CSS class to inherit the background and color from AppBar.
 */
var AppBar = /** @class */ (function (_super) {
    __extends$c(AppBar, _super);
    /**
     * Constructor for creating the AppBar widget
     *
     * @param {AppBarModel} options Accepts the AppBar model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    function AppBar(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    AppBar.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.element.classList.remove(CLS_APPBAR);
        this.element.removeAttribute('style');
        this.element.removeAttribute('role');
    };
    AppBar.prototype.getModuleName = function () {
        return 'appbar';
    };
    AppBar.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    AppBar.prototype.preRender = function () {
        // pre render code
    };
    AppBar.prototype.render = function () {
        this.element.classList.add(CLS_APPBAR);
        if (this.element.tagName !== 'HEADER') {
            this.element.setAttribute('role', 'banner');
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
        if (this.position === 'Bottom') {
            this.element.classList.add(CLS_HORIZONTAL_BOTTOM);
        }
        if (this.isSticky) {
            this.element.classList.add(CLS_STICKY);
        }
        if (this.enableRtl) {
            this.element.classList.add(CLS_RTL$6);
        }
        this.setHeightMode();
        this.setColorMode();
        if (!isNullOrUndefined(this.htmlAttributes)) {
            this.setHtmlAttributes(this.htmlAttributes, this.element);
        }
    };
    AppBar.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'mode':
                    removeClass([this.element], [CLS_DENSE, CLS_PROMINENT]);
                    this.setHeightMode();
                    break;
                case 'position':
                    if (this.position === 'Bottom') {
                        addClass([this.element], CLS_HORIZONTAL_BOTTOM);
                    }
                    else {
                        removeClass([this.element], CLS_HORIZONTAL_BOTTOM);
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.split(' '));
                    }
                    break;
                case 'isSticky':
                    if (this.isSticky) {
                        addClass([this.element], CLS_STICKY);
                    }
                    else {
                        removeClass([this.element], CLS_STICKY);
                    }
                    break;
                case 'htmlAttributes':
                    if (!isNullOrUndefined(this.htmlAttributes)) {
                        if (!isNullOrUndefined(oldProp.htmlAttributes)) {
                            var keys = Object.keys(oldProp.htmlAttributes);
                            for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
                                var key = keys_1[_b];
                                if (key === 'class') {
                                    removeClass([this.element], oldProp.htmlAttributes["" + key]);
                                }
                                else {
                                    this.element.removeAttribute(key);
                                }
                            }
                        }
                        this.setHtmlAttributes(newProp.htmlAttributes, this.element);
                    }
                    break;
                case 'colorMode':
                    removeClass([this.element], [CLS_DARK, CLS_PRIMARY, CLS_INHERIT, CLS_LIGHT]);
                    this.setColorMode();
                    break;
                case 'enableRtl':
                    if (this.enableRtl) {
                        addClass([this.element], CLS_RTL$6);
                    }
                    else {
                        removeClass([this.element], CLS_RTL$6);
                    }
                    break;
            }
        }
    };
    AppBar.prototype.setHtmlAttributes = function (attribute, element) {
        var keys = Object.keys(attribute);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (key === 'class') {
                addClass([element], attribute["" + key]);
            }
            else {
                element.setAttribute(key, attribute["" + key]);
            }
        }
    };
    AppBar.prototype.setHeightMode = function () {
        if (this.mode === 'Prominent') {
            this.element.classList.add(CLS_PROMINENT);
        }
        else if (this.mode === 'Dense') {
            this.element.classList.add(CLS_DENSE);
        }
    };
    AppBar.prototype.setColorMode = function () {
        switch (this.colorMode) {
            case 'Light':
                this.element.classList.add(CLS_LIGHT);
                break;
            case 'Dark':
                this.element.classList.add(CLS_DARK);
                break;
            case 'Primary':
                this.element.classList.add(CLS_PRIMARY);
                break;
            case 'Inherit':
                this.element.classList.add(CLS_INHERIT);
                break;
        }
    };
    __decorate$c([
        Property('Regular')
    ], AppBar.prototype, "mode", void 0);
    __decorate$c([
        Property('Top')
    ], AppBar.prototype, "position", void 0);
    __decorate$c([
        Property()
    ], AppBar.prototype, "cssClass", void 0);
    __decorate$c([
        Property(false)
    ], AppBar.prototype, "isSticky", void 0);
    __decorate$c([
        Property()
    ], AppBar.prototype, "htmlAttributes", void 0);
    __decorate$c([
        Property('Light')
    ], AppBar.prototype, "colorMode", void 0);
    __decorate$c([
        Event()
    ], AppBar.prototype, "created", void 0);
    __decorate$c([
        Event()
    ], AppBar.prototype, "destroyed", void 0);
    AppBar = __decorate$c([
        NotifyPropertyChanges
    ], AppBar);
    return AppBar;
}(Component));

var __extends$d = (undefined && undefined.__extends) || (function () {
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
var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PROGRESSVALUE = '--progress-value';
var PROGRESSPOS = '--progress-position';
var VERTICALSTEP = 'e-vertical';
var HORIZSTEP = 'e-horizontal';
var ITEMLIST = 'e-stepper-steps';
/**
 * Defines the status of the step.
 */
var StepStatus;
(function (StepStatus) {
    /**
     * Shows the status of the step is not started.
     */
    StepStatus["NotStarted"] = "NotStarted";
    /**
     * Shows the step is in progress.
     */
    StepStatus["InProgress"] = "InProgress";
    /**
     * Shows the status of the step is completed.
     */
    StepStatus["Completed"] = "Completed";
})(StepStatus || (StepStatus = {}));
/**
 * Specifies the steps of the Stepper.
 */
var Step = /** @class */ (function (_super) {
    __extends$d(Step, _super);
    function Step() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$d([
        Property('')
    ], Step.prototype, "cssClass", void 0);
    __decorate$d([
        Property(false)
    ], Step.prototype, "disabled", void 0);
    __decorate$d([
        Property('')
    ], Step.prototype, "iconCss", void 0);
    __decorate$d([
        Property(null)
    ], Step.prototype, "isValid", void 0);
    __decorate$d([
        Property('')
    ], Step.prototype, "label", void 0);
    __decorate$d([
        Property(false)
    ], Step.prototype, "optional", void 0);
    __decorate$d([
        Property(StepStatus.NotStarted)
    ], Step.prototype, "status", void 0);
    __decorate$d([
        Property('')
    ], Step.prototype, "text", void 0);
    return Step;
}(ChildProperty));
/**
 * Defines the orientation type of the Stepper.
 */
var StepperOrientation;
(function (StepperOrientation) {
    /**
     * Steps are displayed horizontally.
     */
    StepperOrientation["Horizontal"] = "Horizontal";
    /**
     * Steps are displayed vertically.
     */
    StepperOrientation["Vertical"] = "Vertical";
})(StepperOrientation || (StepperOrientation = {}));
/**
 * StepperBase component act as base class to the stepper component.
 */
var StepperBase = /** @class */ (function (_super) {
    __extends$d(StepperBase, _super);
    /**
     * * Constructor for Base class
     *
     * @param {StepperBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function StepperBase(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    StepperBase.prototype.preRender = function () {
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    StepperBase.prototype.getModuleName = function () {
        return 'stepperBase';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    StepperBase.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    StepperBase.prototype.render = function () {
    };
    StepperBase.prototype.updateOrientaion = function (wrapper) {
        if (wrapper.classList.contains(HORIZSTEP) || wrapper.classList.contains(VERTICALSTEP)) {
            wrapper.classList.remove(HORIZSTEP, VERTICALSTEP);
        }
        if (!(isNullOrUndefined(this.orientation))) {
            wrapper.classList.add('e-' + this.orientation.toLocaleLowerCase());
        }
    };
    StepperBase.prototype.renderProgressBar = function (wrapper) {
        this.progressStep = this.createElement('div', { className: 'e-stepper-progressbar' });
        this.progressbar = this.createElement('div', { className: 'e-progressbar-value' });
        var beforeLabel = (wrapper.querySelector('li').querySelector('.e-step-label-container'));
        this.progressStep.appendChild(this.progressbar);
        wrapper.prepend(this.progressStep);
        this.progressbar.style.setProperty(PROGRESSVALUE, (0) + '%');
        if (wrapper.classList.contains(VERTICALSTEP)) {
            if (wrapper.classList.contains('e-label-bottom') || wrapper.classList.contains('e-label-top')) {
                var stepsContainer = (wrapper.querySelector('.' + ITEMLIST));
                this.progressStep.style.setProperty(PROGRESSPOS, (stepsContainer.offsetWidth / 2) + 'px');
            }
            else {
                this.progressStep.style.setProperty(PROGRESSPOS, ((this.progressBarPosition / 2) - 1) + 'px');
            }
        }
        if (beforeLabel && (beforeLabel.classList.contains('e-label-before'))) {
            this.progressStep.style.setProperty(PROGRESSPOS, (((this.progressBarPosition) - 1)) + 5 + 'px');
        }
        if (wrapper.classList.contains(HORIZSTEP)) {
            this.setProgressPosition(wrapper);
        }
    };
    StepperBase.prototype.setProgressPosition = function (wrapper, isResize) {
        var stepItemContainer = (wrapper.querySelector('.e-step-container'));
        var stepItemEle = stepItemContainer.firstElementChild;
        if (isResize !== true) {
            var topPos = 0;
            if (wrapper.classList.contains('e-label-before')) {
                topPos = (stepItemContainer.offsetParent.offsetHeight - (stepItemEle.offsetHeight / 2) - 1);
            }
            else {
                topPos = (stepItemEle.offsetHeight / 2);
            }
            this.progressStep.style.setProperty('--progress-top-position', topPos + 'px');
        }
        var lastEle = wrapper.querySelector('.' + ITEMLIST).lastChild.firstChild;
        if (wrapper.classList.contains('e-rtl')) {
            var leftPost = ((stepItemEle.offsetLeft + stepItemEle.offsetWidth) - wrapper.querySelector('.' + ITEMLIST).offsetWidth);
            this.progressStep.style.setProperty('--progress-left-position', Math.abs(leftPost) + 'px');
            this.progressStep.style.setProperty('--progress-bar-width', Math.abs(lastEle.offsetLeft - stepItemEle.offsetLeft) + 'px');
        }
        else {
            this.progressStep.style.setProperty('--progress-left-position', (stepItemEle.offsetLeft + 1) + 'px');
            this.progressStep.style.setProperty('--progress-bar-width', ((lastEle.offsetWidth + lastEle.offsetLeft - 2) - (stepItemEle.offsetLeft + 2)) + 'px');
        }
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param  {StepperBaseModel} newProp - Specifies new properties
     * @param  {StepperBaseModel} oldProp - Specifies old properties
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    StepperBase.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    __decorate$d([
        Collection([], Step)
    ], StepperBase.prototype, "steps", void 0);
    __decorate$d([
        Property('')
    ], StepperBase.prototype, "cssClass", void 0);
    __decorate$d([
        Property(false)
    ], StepperBase.prototype, "readOnly", void 0);
    __decorate$d([
        Property(StepperOrientation.Horizontal)
    ], StepperBase.prototype, "orientation", void 0);
    __decorate$d([
        Event()
    ], StepperBase.prototype, "created", void 0);
    StepperBase = __decorate$d([
        NotifyPropertyChanges
    ], StepperBase);
    return StepperBase;
}(Component));

var __extends$e = (undefined && undefined.__extends) || (function () {
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
var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ITEMCONTAINER = 'e-step-container';
var ITEMLIST$1 = 'e-stepper-steps';
var ICONCSS = 'e-indicator';
var TEXTCSS = 'e-step-text-container';
var STEPLABEL = 'e-step-label-container';
var OPTIONAL = 'e-step-label-optional';
var SELECTED$2 = 'e-step-selected';
var INPROGRESS = 'e-step-inprogress';
var NOTSTARTED = 'e-step-notstarted';
var FOCUS$1 = 'e-step-focus';
var COMPLETED = 'e-step-completed';
var DISABLED$2 = 'e-step-disabled';
var READONLY = 'e-stepper-readonly';
var PROGRESSVALUE$1 = '--progress-value';
var RTL$3 = 'e-rtl';
var TEMPLATE = 'e-step-template';
var LABELAFTER = 'e-label-after';
var LABELBEFORE = 'e-label-before';
var VERTICALSTEP$1 = 'e-vertical';
var HORIZSTEP$1 = 'e-horizontal';
var STEPICON = 'e-step-item';
var STEPTEXT = 'e-step-text';
var TEXT = 'e-text';
var STEPSLABEL = 'e-step-label';
var LABEL = 'e-label';
var STEPINDICATOR = 'e-step-type-indicator';
var LABELINDICATOR = 'e-step-type-label';
var INDICATORICON = 'e-step-indicator';
var STEPPERTOOLTIP = 'e-stepper-tooltip';
var STEPPERIPROGRESSTIP = 'e-step-inprogress-tip';
var LINEARSTEP = 'e-linear';
var PREVSTEP = 'e-previous';
var NEXTSTEP = 'e-next';
/**
 * Defines the step progress animation of the Stepper.
 */
var StepperAnimationSettings = /** @class */ (function (_super) {
    __extends$e(StepperAnimationSettings, _super);
    function StepperAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$e([
        Property(true)
    ], StepperAnimationSettings.prototype, "enable", void 0);
    __decorate$e([
        Property(2000)
    ], StepperAnimationSettings.prototype, "duration", void 0);
    __decorate$e([
        Property(0)
    ], StepperAnimationSettings.prototype, "delay", void 0);
    return StepperAnimationSettings;
}(ChildProperty));
/**
 * Defines the label position in the Stepper.
 */
var StepLabelPosition;
(function (StepLabelPosition) {
    /**
     * Displays the label on top position regardless of the Stepper's orientation.
     */
    StepLabelPosition["Top"] = "Top";
    /**
     * Displays the label on bottom position regardless of the Stepper's orientation.
     */
    StepLabelPosition["Bottom"] = "Bottom";
    /**
     * Displays the label on left side regardless of the Stepper's orientation.
     */
    StepLabelPosition["Start"] = "Start";
    /**
     * Displays the label on right side regardless of the Stepper's orientation.
     */
    StepLabelPosition["End"] = "End";
})(StepLabelPosition || (StepLabelPosition = {}));
/**
 * Defines whether steps are display with only indicator, only labels or combination of both.
 */
var StepType;
(function (StepType) {
    /**
     * Steps are shown indicator with label defined.
     */
    StepType["Default"] = "Default";
    /**
     * Steps are shown with only label.
     */
    StepType["Label"] = "Label";
    /**
     * Steps are shown with only indicator.
     */
    StepType["Indicator"] = "Indicator";
})(StepType || (StepType = {}));
/**
 * The Stepper component visualizes several steps and indicates the current progress by highlighting already completed steps.
 *
 * ```html
 * <nav id="stepper"></nav>
 * ```
 * ```typescript
 * <script>
 *   let stepperObj: Stepper = new Stepper({steps : [{}, {}, {}, {}, {}]});
 *   stepperObj.appendTo('#stepper');
 * </script>
 * ```
 */
var Stepper = /** @class */ (function (_super) {
    __extends$e(Stepper, _super);
    /**
     * * Constructor for creating the Stepper component.
     *
     * @param {StepperModel} options - Specifies the Stepper model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function Stepper(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.stepperItemElements = [];
        return _this;
    }
    Stepper.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        var localeText = { optional: 'Optional' };
        this.l10n = new L10n('stepper', localeText, this.locale);
        this.keyConfigs = {
            downarrow: 'downarrow',
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            uparrow: 'uparrow',
            space: 'space',
            enter: 'enter',
            home: 'home',
            end: 'end',
            tab: 'tab',
            shiftTab: 'shift+tab',
            escape: 'escape'
        };
        this.tooltipOpen = false;
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    Stepper.prototype.getModuleName = function () {
        return 'stepper';
    };
    Stepper.prototype.render = function () {
        this.initialize();
        this.navigationHandler(this.activeStep, null, false);
        this.updateStepperStatus(true);
    };
    Stepper.prototype.initialize = function () {
        this.element.setAttribute('aria-label', this.element.id);
        this.updatePosition();
        this.stepperItemList = this.createElement('ol', { className: ITEMLIST$1 });
        this.updateOrientaion(this.element);
        this.updateStepType();
        this.element.appendChild(this.stepperItemList);
        if (this.cssClass) {
            addClass([this.element], this.cssClass.trim().split(' '));
        }
        if (this.readOnly) {
            this.element.classList.add(READONLY);
        }
        if (this.enableRtl) {
            this.element.classList.add(RTL$3);
        }
        this.wireEvents();
        this.updateTemplateFunction();
        this.renderItems();
        if (this.steps.length > 0) {
            this.initiateProgressBar();
            this.checkValidStep();
            this.updateAnimation();
            this.updateTooltip();
            this.wireKeyboardEvent();
        }
    };
    Stepper.prototype.initiateProgressBar = function () {
        var _this = this;
        if (this.steps.length > 1) {
            if (this.isAngular && this.template) {
                setTimeout(function () { _this.renderProgressBar(_this.element); });
            }
            else {
                this.renderProgressBar(this.element);
            }
        }
    };
    Stepper.prototype.updatePosition = function () {
        this.progressBarPosition = this.beforeLabelWidth = this.textEleWidth = 0;
    };
    Stepper.prototype.renderDefault = function (index) {
        var step = this.steps[parseInt(index.toString(), 10)];
        return !step.iconCss && !step.text && !step.label;
    };
    Stepper.prototype.updateAnimation = function () {
        var progressEle = this.element.querySelector('.e-progressbar-value');
        if (this.animation.enable) {
            if (this.animation.duration >= 0) {
                if (progressEle) {
                    progressEle.style.setProperty('--duration', ((this.animation.duration) + 'ms'));
                }
            }
            if (this.animation.delay >= 0) {
                if (progressEle) {
                    progressEle.style.setProperty('--delay', ((this.animation.delay) + 'ms'));
                }
            }
        }
        else {
            if (progressEle) {
                progressEle.style.setProperty('--delay', (0 + 'ms'));
                progressEle.style.setProperty('--duration', (0 + 'ms'));
            }
        }
    };
    Stepper.prototype.updateStepType = function () {
        if (!isNullOrUndefined(this.stepType)) {
            var stepTypeLower = this.stepType.toLowerCase();
            var validStepTypes = ['indicator', 'label', 'default'];
            if (validStepTypes.indexOf(stepTypeLower) !== -1) {
                if (stepTypeLower !== 'default') {
                    this.element.classList.add('e-step-type-' + stepTypeLower);
                }
                if ((stepTypeLower === 'indicator' || stepTypeLower === 'label') && this.labelContainer) {
                    this.clearLabelPosition();
                }
            }
        }
    };
    Stepper.prototype.wireEvents = function () {
        EventHandler.add(window, 'resize', this.updateResize, this);
        EventHandler.add(window, 'click', this.updateStepFocus, this);
    };
    Stepper.prototype.unWireEvents = function () {
        EventHandler.remove(window, 'resize', this.updateResize);
        EventHandler.remove(window, 'click', this.updateStepFocus);
    };
    Stepper.prototype.updateResize = function () {
        if (this.stepperItemList && this.progressbar && this.element.classList.contains(HORIZSTEP$1)) {
            this.setProgressPosition(this.element, true);
        }
        this.navigateToStep(this.activeStep, null, null, false, false);
    };
    Stepper.prototype.updateStepFocus = function () {
        if (this.isKeyNavFocus) {
            this.isKeyNavFocus = false;
            var isFocus = this.element.querySelector('.' + FOCUS$1);
            if (isFocus) {
                isFocus.classList.remove(FOCUS$1);
                this.element.classList.remove('e-steps-focus');
            }
        }
    };
    Stepper.prototype.updateStepperStatus = function (isInitial) {
        for (var index = 0; index < this.steps.length; index++) {
            var item = this.steps[parseInt(index.toString(), 10)];
            var status_1 = item.status.toLowerCase();
            if (isInitial && this.activeStep === 0 && index === 0) {
                var prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                item.status = StepStatus.InProgress;
                this.isProtectedOnChange = prevOnChange;
            }
            if (item && status_1 !== 'notstarted' && index === this.activeStep) {
                for (var i = 0; i < this.steps.length; i++) {
                    var itemElement = this.stepperItemElements[parseInt(i.toString(), 10)];
                    itemElement.classList.remove(SELECTED$2, INPROGRESS, COMPLETED, NOTSTARTED);
                    var prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    if (status_1 === 'completed') {
                        this.updateStatusClass(i, index, itemElement);
                    }
                    else {
                        this.updateStatusClass(i, index, itemElement, true);
                    }
                    this.isProtectedOnChange = prevOnChange;
                }
            }
            else if (item && status_1 !== 'notstarted' && index !== this.activeStep) {
                this.navigationHandler(this.activeStep, null, true);
            }
        }
    };
    Stepper.prototype.updateStatusClass = function (currentStep, index, ele, isInprogress) {
        var stepItem = this.steps[parseInt(currentStep.toString(), 10)];
        if (currentStep < index) {
            ele.classList.add(COMPLETED);
            stepItem.status = StepStatus.Completed;
        }
        else if (currentStep === index) {
            ele.classList.add(isInprogress ? INPROGRESS : COMPLETED, SELECTED$2);
        }
        else {
            ele.classList.add(NOTSTARTED);
        }
    };
    Stepper.prototype.renderItems = function () {
        var _this = this;
        var _a;
        var isHorizontal = this.element.classList.contains(HORIZSTEP$1);
        var isVertical = this.element.classList.contains(VERTICALSTEP$1);
        var labelPositionLower = !isNullOrUndefined(this.labelPosition) ? this.labelPosition.toLowerCase() : '';
        for (var index = 0; index < this.steps.length; index++) {
            this.stepperItemContainer = this.createElement('li', { className: ITEMCONTAINER });
            var stepSpan = this.createElement('span', { className: 'e-step' });
            var item = this.steps[parseInt(index.toString(), 10)];
            var isItemLabel = item.label ? true : false;
            var isItemText = item.text ? true : false;
            var isIndicator = this.element.classList.contains(STEPINDICATOR);
            this.stepperItemContainer.classList[(index === 0) ? 'add' : 'remove'](SELECTED$2, INPROGRESS);
            this.stepperItemContainer.classList[(index !== 0) ? 'add' : 'remove'](NOTSTARTED);
            if (isHorizontal) {
                this.stepperItemContainer.style.setProperty('--max-width', 100 / this.steps.length + '%');
            }
            if (this.renderDefault(index) && (isNullOrUndefined(this.template) || this.template === '')) {
                var isIndicator_1 = !this.element.classList.contains('e-step-type-default') && this.stepType.toLowerCase() === 'indicator';
                if (isIndicator_1) {
                    stepSpan.classList.add('e-icons', INDICATORICON);
                }
                if (!isIndicator_1 && item.isValid == null) {
                    stepSpan.classList.add('e-step-content');
                    stepSpan.innerHTML = (index + 1).toString();
                }
                this.stepperItemContainer.appendChild(stepSpan);
            }
            else if (isNullOrUndefined(this.template) || this.template === '') {
                var isRender = true;
                if ((item.iconCss || (!item.iconCss && isItemText && isItemLabel)) && (((!isItemText && !isItemLabel) ||
                    !this.element.classList.contains(LABELINDICATOR)))) {
                    if (item.iconCss) {
                        var itemIcon = item.iconCss.trim().split(' ');
                        (_a = stepSpan.classList).add.apply(_a, [ICONCSS].concat(itemIcon));
                        this.stepperItemContainer.classList.add(STEPICON);
                    }
                    else if (!item.iconCss && isItemText && isItemLabel) {
                        stepSpan.classList.add(ICONCSS);
                        stepSpan.innerHTML = item.text;
                        this.stepperItemContainer.classList.add(STEPICON);
                    }
                    this.stepperItemContainer.appendChild(stepSpan);
                    if (((isHorizontal && (labelPositionLower === 'start' || labelPositionLower === 'end') && isItemLabel) ||
                        (isVertical && (labelPositionLower === 'top' || labelPositionLower === 'bottom') && isItemLabel)) && !isIndicator) {
                        this.element.classList.add('e-label-' + labelPositionLower);
                        this.createTextLabelElement(item.label);
                        isRender = false;
                    }
                }
                if (isItemText && (!item.iconCss || !isIndicator) && isRender &&
                    !(item.iconCss && isItemLabel)) {
                    if ((!item.iconCss && isIndicator) ||
                        ((!item.iconCss || this.element.classList.contains(LABELINDICATOR)) && !isItemLabel)) {
                        if (!item.iconCss && !isItemLabel) {
                            this.element.classList.add('e-step-type-indicator');
                        }
                        this.checkValidState(item, stepSpan);
                        isItemLabel = false;
                    }
                    else {
                        if (!isItemLabel) {
                            this.createTextLabelElement(item.text);
                        }
                        if (isItemLabel && this.element.classList.contains(LABELINDICATOR)) {
                            var textSpan = this.createElement('span', { className: TEXT });
                            textSpan.innerText = item.label;
                        }
                        isItemText = isItemLabel ? false : true;
                    }
                }
                if (isItemLabel && isItemLabel && (!item.iconCss || !isIndicator) && isRender) {
                    if (!item.iconCss && !isItemText && isIndicator) {
                        this.checkValidState(item, stepSpan, true);
                    }
                    else if ((!((this.element.classList.contains(LABELINDICATOR)) && isItemText)) ||
                        (this.element.classList.contains(LABELINDICATOR) && isItemLabel)) {
                        this.createTextLabelElement(item.label, true);
                        this.updateLabelPosition();
                        if ((!item.iconCss && !isItemText && !this.stepperItemContainer.classList.contains(STEPICON)) ||
                            this.element.classList.contains(LABELINDICATOR)) {
                            this.stepperItemContainer.classList.add('e-step-label-only');
                            if (item.isValid !== null) {
                                var iconSpan = this.createElement('span', { className: 'e-step-validation-icon e-icons' });
                                this.labelContainer.appendChild(iconSpan);
                            }
                        }
                    }
                }
            }
            if (item.optional) {
                var optionalSpan = this.createElement('span', { className: OPTIONAL });
                this.l10n.setLocale(this.locale);
                var optionalContent = this.l10n.getConstant('optional');
                optionalSpan.innerText = optionalContent;
                if (isItemLabel && (this.labelContainer && ((this.element.classList.contains(LABELAFTER) && !this.stepperItemContainer.classList.contains('e-step-label-only'))
                    || (isHorizontal && this.element.classList.contains(LABELBEFORE) && !this.stepperItemContainer.classList.contains('e-step-label-only'))))
                    || (isVertical && this.element.classList.contains(LABELBEFORE))) {
                    this.labelContainer.appendChild(optionalSpan);
                }
                else {
                    this.stepperItemContainer.appendChild(optionalSpan);
                }
                if (item.isValid !== null) {
                    this.stepperItemContainer.classList.add(item.isValid ? 'e-step-valid' : 'e-step-error');
                }
            }
            if (item.cssClass) {
                addClass([this.stepperItemContainer], item.cssClass.trim().split(' '));
            }
            if (item.disabled) {
                this.stepperItemContainer.classList[item.disabled ? 'add' : 'remove'](DISABLED$2);
                attributes(this.stepperItemContainer, { 'tabindex': '-1', 'aria-disabled': 'true' });
            }
            if (item.isValid !== null) {
                if (item.isValid) {
                    this.stepperItemContainer.classList.add('e-step-valid');
                }
                else {
                    this.stepperItemContainer.classList.add('e-step-error');
                }
            }
            this.renderItemContent(index, false);
            if (this.stepperItemContainer.classList.contains(INPROGRESS)) {
                attributes(this.stepperItemContainer, { 'tabindex': '0', 'aria-current': 'true' });
            }
            else {
                attributes(this.stepperItemContainer, { 'tabindex': '-1' });
            }
            this.wireItemsEvents(this.stepperItemContainer, index);
            this.stepperItemElements.push(this.stepperItemContainer);
            var eventArgs = { element: this.stepperItemContainer, index: index };
            this.trigger('beforeStepRender', eventArgs, function (args) {
                _this.stepperItemList.appendChild(args.element);
            });
            if (isVertical) {
                if (this.isAngular && this.template) {
                    setTimeout(function () { _this.calculateProgressBarPosition(); });
                }
                else {
                    this.calculateProgressBarPosition();
                }
            }
        }
        if (isVertical) {
            if (this.element.classList.contains(LABELBEFORE)) {
                var listItems = this.stepperItemList.querySelectorAll('.' + LABEL);
                for (var i = 0; i < listItems.length; i++) {
                    var labelEle = listItems[parseInt((i).toString(), 10)];
                    labelEle.style.setProperty('--label-width', (this.beforeLabelWidth) + 5 + 'px');
                }
            }
        }
    };
    Stepper.prototype.createTextLabelElement = function (content, isLabelEle) {
        if (isLabelEle === void 0) { isLabelEle = false; }
        var spanEle = this.createElement('span', { className: isLabelEle ? LABEL : TEXTCSS + " " + TEXT });
        spanEle.innerText = content;
        if (isLabelEle) {
            this.labelContainer = this.createElement('span', { className: STEPLABEL });
            this.labelContainer.appendChild(spanEle);
        }
        else {
            this.stepperItemContainer.appendChild(spanEle);
        }
        this.stepperItemContainer.classList.add(isLabelEle ? STEPSLABEL : STEPTEXT);
    };
    Stepper.prototype.calculateProgressBarPosition = function () {
        var isBeforeLabel = (this.element.classList.contains(LABELBEFORE)) ? true : false;
        var iconOnly = (this.stepperItemContainer.classList.contains(STEPICON) &&
            !this.stepperItemContainer.classList.contains(STEPTEXT) &&
            !this.stepperItemContainer.classList.contains(STEPSLABEL));
        var textEle = (this.stepperItemContainer.querySelector('.' + TEXTCSS));
        if (textEle) {
            this.textEleWidth = this.textEleWidth < textEle.offsetWidth ? textEle.offsetWidth : this.textEleWidth;
        }
        if (isBeforeLabel) {
            var labelWidth = this.stepperItemContainer.querySelector('.' + LABEL).offsetWidth + 15;
            this.beforeLabelWidth = Math.max(this.beforeLabelWidth, labelWidth);
            var iconEle = this.element.querySelector('ol').lastChild.querySelector('.' + ICONCSS);
            var textEle_1 = this.stepperItemContainer.querySelector('.' + TEXTCSS);
            if (iconEle || textEle_1) {
                var itemWidth = this.beforeLabelWidth + ((this.stepperItemContainer.querySelector('.' + ICONCSS)
                    || textEle_1).offsetWidth / 2);
                this.progressBarPosition = Math.max(this.progressBarPosition, itemWidth);
            }
            else {
                this.progressBarPosition = Math.max(this.progressBarPosition, (this.beforeLabelWidth / 2));
            }
        }
        else {
            var lastChild = this.element.querySelector('ol').lastChild;
            var lastChildWidth = iconOnly ? this.stepperItemContainer.offsetWidth :
                lastChild.firstChild.offsetWidth;
            this.progressBarPosition = Math.max(this.progressBarPosition, lastChildWidth);
        }
    };
    Stepper.prototype.checkValidState = function (item, stepSpan, isLabel) {
        if (item.isValid == null) {
            stepSpan.classList.add('e-step-content');
            if (isLabel) {
                stepSpan.innerHTML = item.label;
            }
            else {
                stepSpan.innerHTML = item.label ? item.label : item.text;
            }
            this.stepperItemContainer.appendChild(stepSpan);
        }
        else {
            stepSpan.classList.add(ICONCSS);
            this.stepperItemContainer.appendChild(stepSpan);
            this.stepperItemContainer.classList.add(STEPICON);
        }
    };
    Stepper.prototype.updateCurrentLabel = function () {
        var labelPos = this.labelPosition.toLowerCase();
        var currentLabelPos = this.element.classList.contains(HORIZSTEP$1)
            ? (labelPos === 'top' ? 'before' : labelPos === 'bottom' ? 'after' : labelPos)
            : (labelPos === 'start' ? 'before' : labelPos === 'end' ? 'after' : labelPos);
        return currentLabelPos;
    };
    Stepper.prototype.updateLabelPosition = function () {
        this.clearLabelPosition();
        this.labelContainer.classList.add('e-label-' + this.updateCurrentLabel());
        if (this.labelPosition.toLowerCase() === 'start' && this.orientation.toLowerCase() === 'vertical') {
            if (this.stepperItemContainer.firstChild) {
                this.stepperItemContainer.firstChild.before(this.labelContainer);
            }
            else {
                this.stepperItemContainer.appendChild(this.labelContainer);
            }
        }
        else {
            this.stepperItemContainer.appendChild(this.labelContainer);
        }
        this.element.classList.add('e-label-' + this.updateCurrentLabel());
    };
    Stepper.prototype.clearLabelPosition = function () {
        var removeCss = this.labelContainer.classList.value.match(/(e-label-[after|before]+)/g);
        if (removeCss) {
            removeClass([this.labelContainer], removeCss);
            removeClass([this.element], removeCss);
        }
    };
    Stepper.prototype.checkValidStep = function () {
        var isStepIndicator = this.element.classList.contains(STEPINDICATOR);
        var _loop_1 = function (index) {
            var item = this_1.steps[parseInt(index.toString(), 10)];
            var itemElement = this_1.stepperItemElements[parseInt(index.toString(), 10)];
            if (item.isValid !== null) {
                var indicatorEle = void 0;
                var iconEle_1;
                if (isStepIndicator && !item.iconCss) {
                    indicatorEle = itemElement.querySelector('.' + ICONCSS);
                }
                else {
                    iconEle_1 = itemElement.querySelector('.' + ICONCSS);
                }
                if (!indicatorEle && isStepIndicator && this_1.renderDefault(index)) {
                    indicatorEle = itemElement.querySelector('.' + INDICATORICON);
                }
                var textLabelIcon = itemElement.querySelector('.e-step-validation-icon');
                var itemIcon = item.iconCss.trim().split(' ');
                var validStep = itemElement.classList.contains('e-step-valid');
                var validIconClass = validStep ? 'e-check' : 'e-circle-info';
                if (indicatorEle) {
                    indicatorEle.classList.remove(INDICATORICON);
                    if (indicatorEle.innerHTML !== '') {
                        indicatorEle.innerHTML = '';
                    }
                    indicatorEle.classList.add('e-icons', validIconClass, ICONCSS);
                }
                if (this_1.renderDefault(index) && !isStepIndicator) {
                    var stepSpan = itemElement.querySelector('.e-step');
                    stepSpan.classList.add('e-icons', validIconClass, ICONCSS);
                }
                if (iconEle_1) {
                    if (iconEle_1.innerHTML !== '') {
                        iconEle_1.innerHTML = '';
                    }
                    else if (itemIcon.length > 0) {
                        itemIcon.forEach(function (icon) { iconEle_1.classList.remove(icon); });
                    }
                    iconEle_1.classList.add('e-icons', validIconClass);
                }
                if (textLabelIcon) {
                    textLabelIcon.classList.add(validStep ? 'e-circle-check' : 'e-circle-info');
                    if (this_1.element.classList.contains(VERTICALSTEP$1)) {
                        var labelEle = itemElement.querySelector('.' + LABEL);
                        var textEle = itemElement.querySelector('.' + TEXT);
                        var itemWidth = textEle ? textEle.offsetWidth + textEle.getBoundingClientRect().left :
                            labelEle.offsetWidth + labelEle.getBoundingClientRect().left;
                        var validationIcon = itemElement.querySelector('.e-step-validation-icon');
                        validationIcon.style.setProperty('--icon-position', (itemWidth + 20) + 'px');
                    }
                }
            }
        };
        var this_1 = this;
        for (var index = 0; index < this.steps.length; index++) {
            _loop_1(index);
        }
    };
    Stepper.prototype.updateTooltip = function () {
        if (this.showTooltip) {
            this.tooltipObj = new Tooltip({
                target: '.e-step-container', windowCollision: true,
                opensOn: 'Custom', cssClass: this.cssClass ? (STEPPERTOOLTIP + ' ' + this.cssClass) : STEPPERTOOLTIP,
                position: 'TopCenter'
            });
            this.tooltipObj.appendTo(this.stepperItemList);
        }
        else {
            if (!isNullOrUndefined(this.tooltipObj)) {
                this.tooltipObj.destroy();
                this.tooltipObj = null;
            }
        }
    };
    Stepper.prototype.wireItemsEvents = function (itemElement, index) {
        EventHandler.add(itemElement, 'click', this.linearModeHandler.bind(this, itemElement, index), this);
        EventHandler.add(itemElement, 'mouseover', this.openStepperTooltip.bind(this, index), this);
        EventHandler.add(itemElement, 'mouseleave', this.closeStepperTooltip, this);
    };
    Stepper.prototype.unWireItemsEvents = function () {
        for (var index = 0; index < this.steps.length; index++) {
            var itemElement = this.stepperItemElements[parseInt(index.toString(), 10)];
            EventHandler.remove(itemElement, 'click', this.linearModeHandler.bind(this, itemElement, index));
            EventHandler.remove(itemElement, 'mouseover', this.openStepperTooltip.bind(this, index));
            EventHandler.remove(itemElement, 'mouseleave', this.closeStepperTooltip);
        }
    };
    Stepper.prototype.linearModeHandler = function (itemElement, index, e) {
        if (this.linear) {
            var linearModeValue = index - this.activeStep;
            if (Math.abs(linearModeValue) === 1) {
                this.stepClickHandler(index, e, itemElement);
            }
        }
        else {
            this.stepClickHandler(index, e, itemElement);
        }
    };
    Stepper.prototype.openStepperTooltip = function (index) {
        var currentStep = this.steps[parseInt(index.toString(), 10)];
        if (this.showTooltip && (currentStep.label || currentStep.text)) {
            if (!this.tooltipOpen) {
                this.updateTooltipContent(index);
                this.tooltipObj.open(this.stepperItemElements[parseInt((index).toString(), 10)]);
                if (this.stepType.toLocaleLowerCase() !== 'label' && ((this.stepType.toLocaleLowerCase() === 'indicator') ||
                    (currentStep.label !== '' && currentStep.iconCss !== '') || (currentStep.label === null && currentStep.iconCss === '' && currentStep.text !== ''))) {
                    var tooltipPopupClass = currentStep.status.toLowerCase() === 'inprogress' ?
                        STEPPERTOOLTIP + " " + STEPPERIPROGRESSTIP + " " + (this.cssClass ? this.cssClass : '') : STEPPERTOOLTIP + " " + (this.cssClass ? this.cssClass : '');
                    this.tooltipObj.setProperties({ cssClass: tooltipPopupClass.trim() });
                }
                this.tooltipOpen = true;
            }
        }
    };
    Stepper.prototype.closeStepperTooltip = function () {
        if (this.tooltipOpen) {
            this.tooltipObj.close();
            this.tooltipOpen = false;
        }
    };
    Stepper.prototype.updateTooltipContent = function (index) {
        if (this.showTooltip) {
            if (this.isReact) {
                this.clearTemplate(['stepperTooltipTemplate']);
            }
            var content = void 0;
            var currentStep = this.steps[parseInt(index.toString(), 10)];
            if (this.tooltipTemplate) {
                content = this.createElement('span', { className: 'e-stepper-tooltip-content' });
                var templateFunction = this.getTemplateFunction(this.tooltipTemplate);
                append(templateFunction({ value: currentStep }, this, 'stepperTooltipTemplate', (this.element.id + 'tooltipTemplate'), this.isStringTemplate), content);
                this.tooltipObj.setProperties({ content: content }, true);
            }
            else {
                var content_1 = currentStep.label ? currentStep.label : currentStep.text;
                this.tooltipObj.setProperties({ content: initializeCSPTemplate(function () { return content_1; }) }, true);
            }
            this.renderReactTemplates();
        }
    };
    Stepper.prototype.stepClickHandler = function (index, e, itemElement) {
        var clickEventArgs = {
            element: itemElement, event: e, previousStep: this.activeStep,
            activeStep: index
        };
        this.trigger('stepClick', clickEventArgs);
        this.navigateToStep(index, e, itemElement, true);
    };
    Stepper.prototype.updateTemplateFunction = function () {
        this.templateFunction = this.template ? this.getTemplateFunction(this.template) : null;
    };
    Stepper.prototype.renderItemContent = function (index, isrerender) {
        var listItems = this.stepperItemList.querySelectorAll('li');
        if (isrerender) {
            this.removeItemContent(listItems[parseInt((index).toString(), 10)]);
        }
        if (this.template) {
            if (isrerender) {
                listItems[parseInt((index).toString(), 10)].classList.add(TEMPLATE);
            }
            else {
                this.stepperItemContainer.classList.add(TEMPLATE);
            }
            var item = this.steps[parseInt(index.toString(), 10)];
            append(this.templateFunction({ step: item, currentStep: index }, this, 'stepperTemplate', (this.element.id + '_stepperTemplate'), this.isStringTemplate), isrerender ? listItems[parseInt((index).toString(), 10)] : this.stepperItemContainer);
        }
        this.renderReactTemplates();
    };
    Stepper.prototype.removeItemContent = function (ele) {
        ele.classList.remove(TEMPLATE);
        var firstChild = ele.firstElementChild;
        for (var i = 0; i < ele.childElementCount; i++) {
            firstChild.remove();
        }
    };
    Stepper.prototype.updateContent = function () {
        if (this.isReact) {
            this.clearTemplate(['stepperTemplate']);
        }
        for (var i = 0; i < this.steps.length; i++) {
            this.renderItemContent(i, true);
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    Stepper.prototype.getTemplateFunction = function (template) {
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return compile(content);
        }
        else {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    Stepper.prototype.navigateToStep = function (index, e, itemElement, isInteracted, isUpdated) {
        var _this = this;
        var eventArgs = {
            element: itemElement, event: e, isInteracted: isInteracted,
            previousStep: this.activeStep, activeStep: index, cancel: false
        };
        if (isUpdated !== false) {
            var previousStep_1 = this.activeStep;
            this.trigger('stepChanging', eventArgs, function (args) {
                if (args.cancel) {
                    return;
                }
                _this.navigationHandler(index);
                var eventArgs = {
                    element: itemElement, event: e, isInteracted: isInteracted,
                    previousStep: previousStep_1, activeStep: _this.activeStep
                };
                _this.trigger('stepChanged', eventArgs);
            });
        }
        else {
            this.navigationHandler(index);
        }
    };
    Stepper.prototype.navigationHandler = function (index, stepStatus, isUpdated) {
        index = Math.min(index, this.steps.length - 1);
        var Itemslength = this.stepperItemElements.length;
        if (index >= 0 && index < Itemslength - 1) {
            index = this.stepperItemElements[parseInt(index.toString(), 10)].classList.contains(DISABLED$2) ? this.activeStep : index;
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.activeStep = parseInt(index.toString(), 10);
        this.isProtectedOnChange = prevOnChange;
        for (var i = 0; i < this.steps.length; i++) {
            var itemElement = this.stepperItemElements[parseInt(i.toString(), 10)];
            var item = this.steps[parseInt(i.toString(), 10)];
            itemElement.classList.remove(SELECTED$2, INPROGRESS, COMPLETED, NOTSTARTED);
            if (i === this.activeStep) {
                itemElement.classList.add(SELECTED$2);
            }
            if (this.activeStep >= 0 && this.progressbar) {
                if (this.element.classList.contains(HORIZSTEP$1)) {
                    this.calculateProgressbarPos();
                }
                else {
                    this.progressbar.style.setProperty(PROGRESSVALUE$1, ((100 / (this.steps.length - 1)) * index) + '%');
                }
            }
            else if (this.activeStep < 0 && this.progressbar) {
                this.progressbar.style.setProperty(PROGRESSVALUE$1, 0 + '%');
            }
            if (i === this.activeStep) {
                itemElement.classList.add(INPROGRESS);
            }
            else if (this.activeStep > 0 && i < this.activeStep) {
                itemElement.classList.add(COMPLETED);
            }
            else {
                itemElement.classList.add(NOTSTARTED);
            }
            if (itemElement.classList.contains(INPROGRESS)) {
                attributes(itemElement, { 'tabindex': '0', 'aria-current': 'true' });
            }
            else {
                attributes(itemElement, { 'tabindex': '-1', 'aria-current': 'false' });
            }
            var prevOnChange_1 = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            if (isUpdated !== false) {
                if (i < this.activeStep || (this.steps.length - 1 === this.activeStep && item.status.toLowerCase() === 'completed')) {
                    item.status = StepStatus.Completed;
                }
                else if (i === this.activeStep) {
                    item.status = StepStatus.InProgress;
                }
                else if (i > this.activeStep) {
                    item.status = StepStatus.NotStarted;
                }
                if (stepStatus && this.activeStep === i) {
                    item.status = stepStatus;
                }
                if (item.status.toLowerCase() === 'completed') {
                    itemElement.classList.remove(SELECTED$2, INPROGRESS, NOTSTARTED);
                    itemElement.classList.add(COMPLETED);
                }
                if (item.status.toLowerCase() === 'notstarted') {
                    itemElement.classList.remove(SELECTED$2, INPROGRESS, COMPLETED);
                    itemElement.classList.add(NOTSTARTED);
                }
            }
            this.isProtectedOnChange = prevOnChange_1;
            this.updateIndicatorStatus(i, itemElement);
        }
        this.updateStepInteractions();
    };
    Stepper.prototype.calculateProgressbarPos = function () {
        var _this = this;
        if ((this.element.classList.contains(LABELBEFORE) || this.element.classList.contains(LABELAFTER)) &&
            !this.element.classList.contains(STEPINDICATOR) &&
            this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].classList.contains(STEPICON)) {
            var progressPos = this.element.querySelector('.e-stepper-progressbar');
            var selectedEle = this.stepperItemElements[parseInt(this.activeStep.toString(), 10)]
                .firstChild;
            var value = this.activeStep === 0 ? 0 : (selectedEle.offsetLeft - progressPos.offsetLeft +
                (selectedEle.offsetWidth / 2)) / progressPos.offsetWidth * 100;
            if (this.element.classList.contains(RTL$3)) {
                value = (progressPos.getBoundingClientRect().right - selectedEle.getBoundingClientRect().right +
                    (selectedEle.offsetWidth / 2)) / progressPos.offsetWidth * 100;
                this.progressbar.style.setProperty(PROGRESSVALUE$1, (value) + '%');
            }
            else {
                this.progressbar.style.setProperty(PROGRESSVALUE$1, (value) + '%');
            }
        }
        else {
            var totalLiWidth_1 = 0;
            var activeLiWidth_1 = 0;
            this.stepperItemElements.forEach(function (element, index) {
                var itemWidth = element.offsetWidth;
                totalLiWidth_1 += itemWidth;
                if (index <= _this.activeStep) {
                    activeLiWidth_1 += (index === _this.activeStep && index !== 0) ? (itemWidth / 2) : itemWidth;
                }
            });
            var spaceWidth = (this.stepperItemList.offsetWidth - totalLiWidth_1) /
                (this.stepperItemElements.length - 1);
            var progressValue = ((activeLiWidth_1 + (spaceWidth * this.activeStep)) /
                this.stepperItemList.offsetWidth) * 100;
            this.progressbar.style.setProperty(PROGRESSVALUE$1, (progressValue) + '%');
        }
    };
    Stepper.prototype.updateIndicatorStatus = function (index, itemElement) {
        if (this.renderDefault(index) && this.element.classList.contains(STEPINDICATOR) && !itemElement.classList.contains('e-step-valid')
            && !itemElement.classList.contains('e-step-error')) {
            if (itemElement.classList.contains(COMPLETED)) {
                itemElement.firstChild.classList.remove('e-icons', 'e-step-indicator');
                itemElement.firstChild.classList.add(ICONCSS, 'e-icons', 'e-check');
            }
            else if (itemElement.classList.contains(INPROGRESS) || itemElement.classList.contains(NOTSTARTED)) {
                itemElement.firstChild.classList.remove(ICONCSS, 'e-icons', 'e-check');
                itemElement.firstChild.classList.add('e-icons', 'e-step-indicator');
            }
        }
    };
    Stepper.prototype.updateStepInteractions = function () {
        var _this = this;
        this.element.classList.toggle(LINEARSTEP, this.linear);
        this.stepperItemElements.forEach(function (step, index) {
            step.classList.toggle(PREVSTEP, (index === _this.activeStep - 1));
            step.classList.toggle(NEXTSTEP, (index === _this.activeStep + 1));
        });
    };
    Stepper.prototype.removeItemElements = function () {
        for (var i = 0; i < this.stepperItemElements.length; i++) {
            remove(this.stepperItemElements[parseInt(i.toString(), 10)]);
        }
        this.stepperItemElements = [];
    };
    /**
     * Move to next step from current step in Stepper.
     *
     * @returns {void}
     */
    Stepper.prototype.nextStep = function () {
        if (this.activeStep !== this.steps.length - 1) {
            this.navigateToStep(this.activeStep + 1, null, null, false);
        }
    };
    /**
     * Move to previous step from current step in Stepper.
     *
     * @returns {void}
     */
    Stepper.prototype.previousStep = function () {
        if (this.activeStep > 0) {
            this.navigateToStep(this.activeStep - 1, null, null, false);
        }
    };
    /**
     * Reset the state of the Stepper and move to the first step.
     *
     * @returns {void}
     */
    Stepper.prototype.reset = function () {
        if (this.activeStep === 0) {
            this.updateStepInteractions();
        }
        else {
            var isDisabled = this.stepperItemElements[0].classList.contains(DISABLED$2) ? true : false;
            this.navigateToStep(isDisabled ? -1 : 0, null, null, false);
        }
    };
    /**
     * Refreshes the position of the progress bar programmatically when the dimensions of the parent container are changed.
     *
     * @returns {void}
     */
    Stepper.prototype.refreshProgressbar = function () {
        if (this.stepperItemList && this.progressbar) {
            this.setProgressPosition(this.element);
        }
        this.navigateToStep(this.activeStep, null, null, false, false);
    };
    Stepper.prototype.updateElementClassArray = function () {
        var classArray = [RTL$3, READONLY, 'e-steps-focus', LABELAFTER, LABELBEFORE, 'e-label-top',
            'e-label-bottom', 'e-label-start', 'e-label-end', STEPINDICATOR, LABELINDICATOR, VERTICALSTEP$1, HORIZSTEP$1, LINEARSTEP];
        removeClass([this.element], classArray);
    };
    /**
     * Destroy the stepper control.
     *
     * @returns {void}
     */
    Stepper.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.unWireItemsEvents();
        // unwires the events and detach the li elements
        this.removeItemElements();
        this.clearTemplate();
        if (this.stepperItemList) {
            remove(this.stepperItemList);
        }
        this.stepperItemList = null;
        if (this.progressStep) {
            remove(this.progressStep);
        }
        this.progressStep = null;
        this.progressbar = null;
        this.progressBarPosition = null;
        this.stepperItemContainer = null;
        this.textContainer = null;
        this.labelContainer = null;
        this.updateElementClassArray();
        this.element.removeAttribute('aria-label');
        if (this.showTooltip) {
            this.tooltipObj.destroy();
            this.tooltipObj = null;
        }
        if (this.keyboardModuleStepper) {
            this.keyboardModuleStepper.destroy();
        }
        this.keyboardModuleStepper = null;
    };
    Stepper.prototype.wireKeyboardEvent = function () {
        this.keyboardModuleStepper = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    Stepper.prototype.keyActionHandler = function (e) {
        if (this.readOnly) {
            return;
        }
        switch (e.action) {
            case 'uparrow':
            case 'downarrow':
            case 'leftarrow':
            case 'rightarrow':
            case 'tab':
            case 'shiftTab':
                this.handleNavigation(this.enableRtl && this.element.classList.contains(HORIZSTEP$1) ? (e.action === 'leftarrow' || e.action === 'tab' || e.action === 'uparrow') : (e.action === 'rightarrow' || e.action === 'tab' || e.action === 'downarrow'), e);
                break;
            case 'space':
            case 'enter':
            case 'escape':
                this.handleNavigation(null, e);
                break;
            case 'home':
            case 'end':
                this.handleNavigation(null, e, this.enableRtl);
                break;
        }
    };
    Stepper.prototype.handleNavigation = function (isNextStep, e, isRTL) {
        this.isKeyNavFocus = true;
        this.element.classList.add('e-steps-focus');
        var focusedEle = this.element.querySelector('.' + FOCUS$1);
        if (!focusedEle) {
            focusedEle = this.element.querySelector('.' + SELECTED$2);
        }
        var stepItems = Array.prototype.slice.call(this.stepperItemList.children);
        var index = stepItems.indexOf(focusedEle);
        if (e.action === 'tab' || e.action === 'shiftTab' || e.action === 'downarrow' || e.action === 'uparrow' || e.action === 'space' || e.action === 'home' || e.action === 'end') {
            if ((e.action === 'tab' && index === stepItems.length - 1) || (e.action === 'shiftTab' && index === 0)) {
                if (focusedEle.classList.contains(FOCUS$1)) {
                    this.updateStepFocus();
                    return;
                }
            }
            else {
                e.preventDefault();
            }
        }
        if (e.action === 'escape') {
            stepItems[parseInt(index.toString(), 10)].classList.remove(FOCUS$1);
            this.element.classList.remove('e-steps-focus');
        }
        if (!(e.action === 'space' || e.action === 'enter')) {
            var prevIndex = index;
            index = isNextStep ? index + 1 : index - 1;
            while ((index >= 0 && index < stepItems.length) && stepItems[parseInt(index.toString(), 10)].classList.contains(DISABLED$2)) {
                index = isNextStep ? index + 1 : index - 1;
            }
            index = (index < 0) ? 0 : (index > stepItems.length - 1) ? stepItems.length - 1 : index;
            if (stepItems[parseInt(prevIndex.toString(), 10)].classList.contains(FOCUS$1)) {
                stepItems[parseInt(prevIndex.toString(), 10)].classList.remove(FOCUS$1);
            }
            if ((e.action === 'home' || e.action === 'end')) {
                if (e.action === 'home') {
                    index = isRTL ? stepItems.length - 1 : 0;
                }
                else {
                    index = isRTL ? 0 : stepItems.length - 1;
                }
            }
            if (index >= 0 && index < stepItems.length) {
                stepItems[parseInt(index.toString(), 10)].classList.add(FOCUS$1);
            }
        }
        else if ((e.action === 'space' || e.action === 'enter')) {
            var isupdateFocus = false;
            if (this.linear) {
                var linearModeValue = this.activeStep - index;
                if (Math.abs(linearModeValue) === 1) {
                    this.navigateToStep(index, null, null, true);
                    isupdateFocus = true;
                }
            }
            else {
                this.navigateToStep(index, null, null, true);
                isupdateFocus = true;
            }
            if (isupdateFocus) {
                this.updateStepFocus();
                this.stepperItemElements[index].focus();
            }
        }
    };
    Stepper.prototype.renderStepperItems = function (isUpdate, isStepType) {
        this.updateElementClassArray();
        this.removeItemElements();
        this.element.querySelector('.e-stepper-progressbar').remove();
        if (isUpdate) {
            this.updatePosition();
        }
        if (isStepType) {
            this.updateStepType();
        }
        if (this.readOnly && !this.element.classList.contains(READONLY)) {
            this.element.classList.add(READONLY);
        }
        if (this.enableRtl && !this.element.classList.contains(RTL$3)) {
            this.element.classList.add(RTL$3);
        }
        this.updateOrientaion(this.element);
        this.renderItems();
        this.renderProgressBar(this.element);
        this.checkValidStep();
        this.updateAnimation();
        this.navigateToStep(this.activeStep, null, this.stepperItemElements[this.activeStep], true);
    };
    Stepper.prototype.updateDynamicSteps = function (steps, prevSteps) {
        if (!(steps instanceof Array && prevSteps instanceof Array)) {
            var stepCounts = Object.keys(steps);
            for (var i = 0; i < stepCounts.length; i++) {
                var index = parseInt(Object.keys(steps)[i], 10);
                var changedPropsCount = Object.keys(steps[index]).length;
                for (var j = 0; j < changedPropsCount; j++) {
                    var property = Object.keys(steps[index])[j];
                    if (property === 'status') {
                        if (this.activeStep === index) {
                            this.navigationHandler(index, steps[index].status);
                        }
                        else {
                            this.steps[index].status = prevSteps[index].status;
                        }
                    }
                    else {
                        this.removeItemElements();
                        this.renderItems();
                        this.updateStepperStatus();
                    }
                    if (property === 'label' && (this.steps[index].iconCss || this.steps[index].text) &&
                        this.stepType.toLowerCase() === 'default') {
                        this.refreshProgressbar();
                    }
                    this.updateStepInteractions();
                    this.checkValidStep();
                }
            }
        }
        else {
            this.renderStepperItems(true, true);
        }
    };
    Stepper.prototype.updateDynamicActiveStep = function (activeStep, preActiveStep) {
        this.activeStep = (activeStep > this.steps.length - 1 || activeStep < -1) ? preActiveStep : this.activeStep;
        if (this.activeStep >= 0 && this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].classList.contains(DISABLED$2)) {
            this.activeStep = preActiveStep;
        }
        if (this.linear) {
            var linearModeValue = preActiveStep - this.activeStep;
            if (Math.abs(linearModeValue) === 1) {
                this.navigateToStep(this.activeStep, null, null, true);
            }
        }
        else {
            this.navigateToStep(this.activeStep, null, this.stepperItemElements[this.activeStep], true);
        }
    };
    Stepper.prototype.updateDynamicCssClass = function (cssClass, prevCssClass) {
        if (prevCssClass) {
            removeClass([this.element], prevCssClass.trim().split(' '));
        }
        if (cssClass) {
            addClass([this.element], cssClass.trim().split(' '));
        }
        if (this.tooltipObj) {
            this.tooltipObj.setProperties({ cssClass: this.cssClass ? (STEPPERTOOLTIP + ' ' + this.cssClass) : STEPPERTOOLTIP });
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {StepperModel} newProp - Specifies new properties
     * @param  {StepperModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Stepper.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'steps': {
                    this.updateDynamicSteps(newProp.steps, oldProp.steps);
                    break;
                }
                case 'orientation':
                    this.updateOrientaion(this.element);
                    this.renderStepperItems(true);
                    break;
                case 'activeStep':
                    this.updateDynamicActiveStep(newProp.activeStep, oldProp.activeStep);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL$3);
                    break;
                case 'readOnly':
                    this.element.classList[this.readOnly ? 'add' : 'remove'](READONLY);
                    break;
                case 'cssClass':
                    this.updateDynamicCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'labelPosition':
                    this.renderStepperItems(true);
                    break;
                case 'showTooltip':
                    this.updateTooltip();
                    break;
                case 'stepType':
                    this.renderStepperItems(true, true);
                    break;
                case 'template':
                    this.updateTemplateFunction();
                    this.updateContent();
                    break;
                case 'animation':
                    this.updateAnimation();
                    break;
                case 'linear':
                    this.updateStepInteractions();
                    break;
            }
        }
    };
    __decorate$e([
        Property(0)
    ], Stepper.prototype, "activeStep", void 0);
    __decorate$e([
        Complex({}, StepperAnimationSettings)
    ], Stepper.prototype, "animation", void 0);
    __decorate$e([
        Property(false)
    ], Stepper.prototype, "linear", void 0);
    __decorate$e([
        Property(false)
    ], Stepper.prototype, "showTooltip", void 0);
    __decorate$e([
        Property('')
    ], Stepper.prototype, "template", void 0);
    __decorate$e([
        Property('')
    ], Stepper.prototype, "tooltipTemplate", void 0);
    __decorate$e([
        Property(StepLabelPosition.Bottom)
    ], Stepper.prototype, "labelPosition", void 0);
    __decorate$e([
        Property(StepType.Default)
    ], Stepper.prototype, "stepType", void 0);
    __decorate$e([
        Event()
    ], Stepper.prototype, "stepChanged", void 0);
    __decorate$e([
        Event()
    ], Stepper.prototype, "stepChanging", void 0);
    __decorate$e([
        Event()
    ], Stepper.prototype, "stepClick", void 0);
    __decorate$e([
        Event()
    ], Stepper.prototype, "beforeStepRender", void 0);
    Stepper = __decorate$e([
        NotifyPropertyChanges
    ], Stepper);
    return Stepper;
}(StepperBase));

export { Accordion, AccordionActionSettings, AccordionAnimationSettings, AccordionItem, ActionSettings, AppBar, Breadcrumb, BreadcrumbItem, BreadcrumbOverflowMode, Carousel, CarouselItem, CarouselSwipeMode, ContextMenu, FieldSettings, FieldsSettings, HScroll, Header, Item, Menu, MenuAnimationSettings, MenuItem, NodeAnimationSettings, Sidebar, Step, StepLabelPosition, StepStatus, StepType, Stepper, StepperAnimationSettings, StepperBase, StepperOrientation, Tab, TabActionSettings, TabAnimationSettings, TabItem, Toolbar, TreeView, VScroll, addScrolling, destroyScroll };
//# sourceMappingURL=ej2-navigations.es5.js.map
