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
import { setStyleAttribute, addClass, removeClass, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { isNullOrUndefined, formatUnit } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { calculatePosition, calculateRelativeBasedPosition } from '../common/position';
import { Animation, Property, Event, Component } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { EventHandler } from '@syncfusion/ej2-base';
import { flip, fit, isCollide, destroy as collisionDestroy, getTransformElement, getZoomValue } from '../common/collision';
/**
 * Specifies the offset position values.
 */
var PositionData = /** @class */ (function (_super) {
    __extends(PositionData, _super);
    function PositionData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('left')
    ], PositionData.prototype, "X", void 0);
    __decorate([
        Property('top')
    ], PositionData.prototype, "Y", void 0);
    return PositionData;
}(ChildProperty));
export { PositionData };
// don't use space in classNames
var CLASSNAMES = {
    ROOT: 'e-popup',
    RTL: 'e-rtl',
    OPEN: 'e-popup-open',
    CLOSE: 'e-popup-close'
};
/**
 * Represents the Popup Component
 * ```html
 * <div id="popup" style="position:absolute;height:100px;width:100px;">
 * <div style="margin:35px 25px;">Popup Content</div></div>
 * ```
 * ```typescript
 * <script>
 *   var popupObj = new Popup();
 *   popupObj.appendTo("#popup");
 * </script>
 * ```
 */
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(element, options) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {PopupModel} newProp - specifies the new property
     * @param {PopupModel} oldProp - specifies the old property
     * @private
     * @returns {void}
     */
    Popup.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(newProp.width) });
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(newProp.height) });
                    break;
                case 'zIndex':
                    setStyleAttribute(this.element, { 'zIndex': newProp.zIndex });
                    break;
                case 'enableRtl':
                    this.setEnableRtl();
                    break;
                case 'position':
                case 'relateTo':
                    this.refreshPosition();
                    break;
                case 'offsetX': {
                    var x = newProp.offsetX - oldProp.offsetX;
                    this.element.style.left = (parseInt(this.element.style.left, 10) + (x)).toString() + 'px';
                    break;
                }
                case 'offsetY': {
                    var y = newProp.offsetY - oldProp.offsetY;
                    this.element.style.top = (parseInt(this.element.style.top, 10) + (y)).toString() + 'px';
                    break;
                }
                case 'content':
                    this.setContent();
                    break;
                case 'actionOnScroll':
                    if (newProp.actionOnScroll !== 'none') {
                        this.wireScrollEvents();
                    }
                    else {
                        this.unwireScrollEvents();
                    }
                    break;
            }
        }
    };
    /**
     * gets the Component module name.
     *
     * @returns {void}
     * @private
     */
    Popup.prototype.getModuleName = function () {
        return 'popup';
    };
    /**
     * To resolve if any collision occurs.
     *
     * @returns {void}
     */
    Popup.prototype.resolveCollision = function () {
        this.checkCollision();
    };
    /**
     * gets the persisted state properties of the Component.
     *
     * @returns {void}
     */
    Popup.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * To destroy the control.
     *
     * @returns {void}
     */
    Popup.prototype.destroy = function () {
        if (this.element.classList.contains('e-popup-open')) {
            this.unwireEvents();
        }
        this.element.classList.remove(CLASSNAMES.ROOT, CLASSNAMES.RTL, CLASSNAMES.OPEN, CLASSNAMES.CLOSE);
        this.content = null;
        this.relateTo = null;
        collisionDestroy();
        _super.prototype.destroy.call(this);
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Popup.prototype.render = function () {
        this.element.classList.add(CLASSNAMES.ROOT);
        var styles = {};
        if (this.zIndex !== 1000) {
            styles.zIndex = this.zIndex;
        }
        if (this.width !== 'auto') {
            styles.width = formatUnit(this.width);
        }
        if (this.height !== 'auto') {
            styles.height = formatUnit(this.height);
        }
        setStyleAttribute(this.element, styles);
        this.fixedParent = false;
        this.setEnableRtl();
        this.setContent();
    };
    Popup.prototype.wireEvents = function () {
        if (Browser.isDevice) {
            EventHandler.add(window, 'orientationchange', this.orientationOnChange, this);
        }
        if (this.actionOnScroll !== 'none') {
            this.wireScrollEvents();
        }
    };
    Popup.prototype.wireScrollEvents = function () {
        if (this.getRelateToElement()) {
            for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
                var parent_1 = _a[_i];
                EventHandler.add(parent_1, 'scroll', this.scrollRefresh, this);
            }
        }
    };
    Popup.prototype.unwireEvents = function () {
        if (Browser.isDevice) {
            EventHandler.remove(window, 'orientationchange', this.orientationOnChange);
        }
        if (this.actionOnScroll !== 'none') {
            this.unwireScrollEvents();
        }
    };
    Popup.prototype.unwireScrollEvents = function () {
        if (this.getRelateToElement()) {
            for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
                var parent_2 = _a[_i];
                EventHandler.remove(parent_2, 'scroll', this.scrollRefresh);
            }
        }
    };
    Popup.prototype.getRelateToElement = function () {
        var relateToElement = this.relateTo === '' || isNullOrUndefined(this.relateTo) ?
            document.body : this.relateTo;
        this.setProperties({ relateTo: relateToElement }, true);
        return ((typeof this.relateTo) === 'string') ?
            document.querySelector(this.relateTo) : this.relateTo;
    };
    Popup.prototype.scrollRefresh = function (e) {
        if (this.actionOnScroll === 'reposition') {
            if (!isNullOrUndefined(this.element) && !(this.element.offsetParent === e.target ||
                (this.element.offsetParent && this.element.offsetParent.tagName === 'BODY' &&
                    e.target.parentElement == null))) {
                this.refreshPosition();
            }
        }
        else if (this.actionOnScroll === 'hide') {
            this.hide();
        }
        if (this.actionOnScroll !== 'none') {
            if (this.getRelateToElement()) {
                var targetVisible = this.isElementOnViewport(this.getRelateToElement(), e.target);
                if (!targetVisible && !this.targetInvisibleStatus) {
                    this.trigger('targetExitViewport');
                    this.targetInvisibleStatus = true;
                }
                else if (targetVisible) {
                    this.targetInvisibleStatus = false;
                }
            }
        }
    };
    /**
     * This method is to get the element visibility on viewport when scroll
     * the page. This method will returns true even though 1 px of element
     * part is in visible.
     *
     * @param {HTMLElement} relateToElement - specifies the element
     * @param {HTMLElement} scrollElement - specifies the scroll element
     * @returns {boolean} - retruns the boolean
     */
    // eslint-disable-next-line
    Popup.prototype.isElementOnViewport = function (relateToElement, scrollElement) {
        var scrollParents = this.getScrollableParent(relateToElement);
        for (var parent_3 = 0; parent_3 < scrollParents.length; parent_3++) {
            if (this.isElementVisible(relateToElement, scrollParents[parent_3])) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    };
    Popup.prototype.isElementVisible = function (relateToElement, scrollElement) {
        var rect = this.checkGetBoundingClientRect(relateToElement);
        if (!rect.height || !rect.width) {
            return false;
        }
        if (!isNullOrUndefined(this.checkGetBoundingClientRect(scrollElement))) {
            var parent_4 = scrollElement.getBoundingClientRect();
            return !(rect.bottom < parent_4.top) &&
                (!(rect.bottom > parent_4.bottom) &&
                    (!(rect.right > parent_4.right) &&
                        !(rect.left < parent_4.left)));
        }
        else {
            var win = window;
            var windowView = {
                top: win.scrollY,
                left: win.scrollX,
                right: win.scrollX + win.outerWidth,
                bottom: win.scrollY + win.outerHeight
            };
            var off = calculatePosition(relateToElement);
            var ele = {
                top: off.top,
                left: off.left,
                right: off.left + rect.width,
                bottom: off.top + rect.height
            };
            var elementView = {
                top: windowView.bottom - ele.top,
                left: windowView.right - ele.left,
                bottom: ele.bottom - windowView.top,
                right: ele.right - windowView.left
            };
            return elementView.top > 0
                && elementView.left > 0
                && elementView.right > 0
                && elementView.bottom > 0;
        }
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    Popup.prototype.preRender = function () {
        //There is no event handler
    };
    Popup.prototype.setEnableRtl = function () {
        this.reposition();
        if (this.enableRtl) {
            this.element.classList.add(CLASSNAMES.RTL);
        }
        else {
            this.element.classList.remove(CLASSNAMES.RTL);
        }
    };
    Popup.prototype.setContent = function () {
        if (!isNullOrUndefined(this.content)) {
            this.element.innerHTML = '';
            if (typeof (this.content) === 'string') {
                this.element.textContent = this.content;
            }
            else {
                var relateToElem = this.getRelateToElement();
                // eslint-disable-next-line
                var props = this.content.props;
                if (!relateToElem.classList.contains('e-dropdown-btn') || isNullOrUndefined(props)) {
                    this.element.appendChild(this.content);
                }
            }
        }
    };
    Popup.prototype.orientationOnChange = function () {
        var _this = this;
        setTimeout(function () {
            _this.refreshPosition();
        }, 200);
    };
    /**
     * Based on the `relative` element and `offset` values, `Popup` element position will refreshed.
     *
     * @param {HTMLElement} target - The target element.
     * @param {boolean} collision - Specifies whether to check for collision.
     * @returns {void}
     */
    Popup.prototype.refreshPosition = function (target, collision) {
        if (!isNullOrUndefined(target)) {
            this.checkFixedParent(target);
        }
        this.reposition();
        if (!collision) {
            this.checkCollision();
        }
    };
    Popup.prototype.reposition = function () {
        var pos;
        var position;
        var relateToElement = this.getRelateToElement();
        if (typeof this.position.X === 'number' && typeof this.position.Y === 'number') {
            pos = { left: this.position.X, top: this.position.Y };
        }
        else if ((typeof this.position.X === 'string' && typeof this.position.Y === 'number') ||
            (typeof this.position.X === 'number' && typeof this.position.Y === 'string')) {
            var parentDisplay = void 0;
            var display = this.element.style.display;
            this.element.style.display = 'block';
            if (this.element.classList.contains('e-dlg-modal')) {
                parentDisplay = this.element.parentElement.style.display;
                this.element.parentElement.style.display = 'block';
            }
            position = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY);
            if (typeof this.position.X === 'string') {
                pos = { left: position.left, top: this.position.Y };
            }
            else {
                pos = { left: this.position.X, top: position.top };
            }
            this.element.style.display = display;
            if (this.element.classList.contains('e-dlg-modal')) {
                this.element.parentElement.style.display = parentDisplay;
            }
        }
        else if (relateToElement) {
            var height = this.element.clientHeight;
            var display = this.element.style.display;
            this.element.style.display = 'block';
            pos = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY, height);
            this.element.style.display = display;
        }
        else {
            pos = { left: 0, top: 0 };
        }
        if (!isNullOrUndefined(pos)) {
            this.element.style.left = pos.left + 'px';
            this.element.style.top = pos.top + 'px';
        }
    };
    Popup.prototype.checkGetBoundingClientRect = function (ele) {
        var eleRect;
        try {
            eleRect = ele.getBoundingClientRect();
            return eleRect;
        }
        catch (error) {
            return null;
        }
    };
    Popup.prototype.getAnchorPosition = function (anchorEle, ele, position, offsetX, offsetY, height) {
        if (height === void 0) { height = 0; }
        var eleRect = this.checkGetBoundingClientRect(ele);
        var anchorRect = this.checkGetBoundingClientRect(anchorEle);
        if (isNullOrUndefined(eleRect) || isNullOrUndefined(anchorRect)) {
            return null;
        }
        var anchor = anchorEle;
        var anchorPos = { left: 0, top: 0 };
        if (ele.offsetParent && ele.offsetParent.tagName === 'BODY' && anchorEle.tagName === 'BODY') {
            anchorPos = calculatePosition(anchorEle);
        }
        else {
            if ((ele.classList.contains('e-dlg-modal') && anchor.tagName !== 'BODY')) {
                ele = ele.parentElement;
            }
            anchorPos = calculateRelativeBasedPosition(anchor, ele);
        }
        switch (position.X) {
            default:
            case 'left':
                break;
            case 'center':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.left += (window.innerWidth / 2 - eleRect.width / 2);
                }
                else if (this.targetType === 'container') {
                    anchorPos.left += (anchorRect.width / 2 - eleRect.width / 2);
                }
                else {
                    anchorPos.left += (anchorRect.width / 2);
                }
                break;
            case 'right':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.left += (window.innerWidth - eleRect.width);
                }
                else if (this.targetType === 'container') {
                    var scaleX = 1;
                    var tranformElement = getTransformElement(ele);
                    if (tranformElement) {
                        var transformStyle = getComputedStyle(tranformElement).transform;
                        if (transformStyle !== 'none') {
                            var matrix = new DOMMatrix(transformStyle);
                            scaleX = matrix.a;
                        }
                        var zoomStyle = getComputedStyle(tranformElement).zoom;
                        if (zoomStyle !== 'none') {
                            var bodyZoom = getZoomValue(document.body);
                            scaleX = bodyZoom * scaleX;
                        }
                    }
                    anchorPos.left += ((anchorRect.width - eleRect.width) / scaleX);
                }
                else {
                    anchorPos.left += (anchorRect.width);
                }
                break;
        }
        switch (position.Y) {
            default:
            case 'top':
                break;
            case 'center':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.top += (window.innerHeight / 2 - eleRect.height / 2);
                }
                else if (this.targetType === 'container') {
                    anchorPos.top += (anchorRect.height / 2 - eleRect.height / 2);
                }
                else {
                    anchorPos.top += (anchorRect.height / 2);
                }
                break;
            case 'bottom':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.top += (window.innerHeight - eleRect.height);
                }
                else if (this.targetType === 'container' && !ele.classList.contains('e-dialog')) {
                    anchorPos.top += (anchorRect.height - eleRect.height);
                }
                else if (this.targetType === 'container' && ele.classList.contains('e-dialog')) {
                    anchorPos.top += (anchorRect.height - height);
                }
                else {
                    anchorPos.top += (anchorRect.height);
                }
                break;
        }
        anchorPos.left += offsetX;
        anchorPos.top += offsetY;
        return anchorPos;
    };
    Popup.prototype.callFlip = function (param) {
        var relateToElement = this.getRelateToElement();
        flip(this.element, relateToElement, this.offsetX, this.offsetY, this.position.X, this.position.Y, this.viewPortElement, param, this.fixedParent);
    };
    Popup.prototype.callFit = function (param) {
        if (isCollide(this.element, this.viewPortElement).length !== 0) {
            if (isNullOrUndefined(this.viewPortElement)) {
                var data = fit(this.element, this.viewPortElement, param);
                if (param.X) {
                    this.element.style.left = data.left + 'px';
                }
                if (param.Y) {
                    this.element.style.top = data.top + 'px';
                }
            }
            else {
                var elementRect = this.checkGetBoundingClientRect(this.element);
                var viewPortRect = this.checkGetBoundingClientRect(this.viewPortElement);
                if (isNullOrUndefined(elementRect) || isNullOrUndefined(viewPortRect)) {
                    return null;
                }
                if (param && param.Y === true) {
                    if (viewPortRect.top > elementRect.top) {
                        this.element.style.top = '0px';
                    }
                    else if (viewPortRect.bottom < elementRect.bottom) {
                        this.element.style.top = parseInt(this.element.style.top, 10) - (elementRect.bottom - viewPortRect.bottom) + 'px';
                    }
                }
                if (param && param.X === true) {
                    if (viewPortRect.right < elementRect.right) {
                        this.element.style.left = parseInt(this.element.style.left, 10) - (elementRect.right - viewPortRect.right) + 'px';
                    }
                    else if (viewPortRect.left > elementRect.left) {
                        this.element.style.left = parseInt(this.element.style.left, 10) + (viewPortRect.left - elementRect.left) + 'px';
                    }
                }
            }
        }
    };
    Popup.prototype.checkCollision = function () {
        var horz = this.collision.X;
        var vert = this.collision.Y;
        if (horz === 'none' && vert === 'none') {
            return;
        }
        if (horz === 'flip' && vert === 'flip') {
            this.callFlip({ X: true, Y: true });
        }
        else if (horz === 'fit' && vert === 'fit') {
            this.callFit({ X: true, Y: true });
        }
        else {
            if (horz === 'flip') {
                this.callFlip({ X: true, Y: false });
            }
            else if (vert === 'flip') {
                this.callFlip({ Y: true, X: false });
            }
            if (horz === 'fit') {
                this.callFit({ X: true, Y: false });
            }
            else if (vert === 'fit') {
                this.callFit({ X: false, Y: true });
            }
        }
    };
    /**
     * Shows the popup element from screen.
     *
     * @returns {void}
     * @param {AnimationModel} animationOptions - specifies the model
     * @param { HTMLElement } relativeElement - To calculate the zIndex value dynamically.
     */
    Popup.prototype.show = function (animationOptions, relativeElement) {
        var _this = this;
        this.wireEvents();
        if (this.zIndex === 1000 || !isNullOrUndefined(relativeElement)) {
            var zIndexElement = (isNullOrUndefined(relativeElement)) ? this.element : relativeElement;
            this.zIndex = getZindexPartial(zIndexElement);
            setStyleAttribute(this.element, { 'zIndex': this.zIndex });
        }
        animationOptions = (!isNullOrUndefined(animationOptions) && typeof animationOptions === 'object') ?
            animationOptions : this.showAnimation;
        if (this.collision.X !== 'none' || this.collision.Y !== 'none') {
            removeClass([this.element], CLASSNAMES.CLOSE);
            addClass([this.element], CLASSNAMES.OPEN);
            this.checkCollision();
            removeClass([this.element], CLASSNAMES.OPEN);
            addClass([this.element], CLASSNAMES.CLOSE);
        }
        if (!isNullOrUndefined(animationOptions)) {
            animationOptions.begin = function () {
                if (!_this.isDestroyed) {
                    removeClass([_this.element], CLASSNAMES.CLOSE);
                    addClass([_this.element], CLASSNAMES.OPEN);
                }
            };
            animationOptions.end = function () {
                if (!_this.isDestroyed) {
                    _this.trigger('open');
                }
            };
            new Animation(animationOptions).animate(this.element);
        }
        else {
            removeClass([this.element], CLASSNAMES.CLOSE);
            addClass([this.element], CLASSNAMES.OPEN);
            this.trigger('open');
        }
    };
    /**
     * Hides the popup element from screen.
     *
     * @param {AnimationModel} animationOptions - To give the animation options.
     * @returns {void}
     */
    Popup.prototype.hide = function (animationOptions) {
        var _this = this;
        animationOptions = (!isNullOrUndefined(animationOptions) && typeof animationOptions === 'object') ?
            animationOptions : this.hideAnimation;
        if (!isNullOrUndefined(animationOptions)) {
            animationOptions.end = function () {
                if (!_this.isDestroyed) {
                    removeClass([_this.element], CLASSNAMES.OPEN);
                    addClass([_this.element], CLASSNAMES.CLOSE);
                    _this.trigger('close');
                }
            };
            new Animation(animationOptions).animate(this.element);
        }
        else {
            removeClass([this.element], CLASSNAMES.OPEN);
            addClass([this.element], CLASSNAMES.CLOSE);
            this.trigger('close');
        }
        this.unwireEvents();
    };
    /**
     * Gets scrollable parent elements for the given element.
     *
     * @returns {void}
     * @param { HTMLElement } element - Specify the element to get the scrollable parents of it.
     */
    Popup.prototype.getScrollableParent = function (element) {
        this.checkFixedParent(element);
        return getScrollableParent(element, this.fixedParent);
    };
    Popup.prototype.checkFixedParent = function (element) {
        var parent = element.parentElement;
        while (parent && parent.tagName !== 'HTML') {
            var parentStyle = getComputedStyle(parent);
            if ((parentStyle.position === 'fixed' || parentStyle.position === 'sticky') && !isNullOrUndefined(this.element) && this.element.offsetParent &&
                this.element.offsetParent.tagName === 'BODY' && getComputedStyle(this.element.offsetParent).overflow !== 'hidden') {
                this.element.style.top = window.scrollY > parseInt(this.element.style.top, 10) ?
                    formatUnit(window.scrollY - parseInt(this.element.style.top, 10))
                    : formatUnit(parseInt(this.element.style.top, 10) - window.scrollY);
                this.element.style.position = 'fixed';
                this.fixedParent = true;
            }
            parent = parent.parentElement;
            if (!isNullOrUndefined(this.element) && isNullOrUndefined(this.element.offsetParent) && parentStyle.position === 'fixed'
                && this.element.style.position === 'fixed') {
                this.fixedParent = true;
            }
        }
    };
    __decorate([
        Property('auto')
    ], Popup.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], Popup.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Popup.prototype, "content", void 0);
    __decorate([
        Property('container')
    ], Popup.prototype, "targetType", void 0);
    __decorate([
        Property(null)
    ], Popup.prototype, "viewPortElement", void 0);
    __decorate([
        Property({ X: 'none', Y: 'none' })
    ], Popup.prototype, "collision", void 0);
    __decorate([
        Property('')
    ], Popup.prototype, "relateTo", void 0);
    __decorate([
        Complex({}, PositionData)
    ], Popup.prototype, "position", void 0);
    __decorate([
        Property(0)
    ], Popup.prototype, "offsetX", void 0);
    __decorate([
        Property(0)
    ], Popup.prototype, "offsetY", void 0);
    __decorate([
        Property(1000)
    ], Popup.prototype, "zIndex", void 0);
    __decorate([
        Property(false)
    ], Popup.prototype, "enableRtl", void 0);
    __decorate([
        Property('reposition')
    ], Popup.prototype, "actionOnScroll", void 0);
    __decorate([
        Property(null)
    ], Popup.prototype, "showAnimation", void 0);
    __decorate([
        Property(null)
    ], Popup.prototype, "hideAnimation", void 0);
    __decorate([
        Event()
    ], Popup.prototype, "open", void 0);
    __decorate([
        Event()
    ], Popup.prototype, "close", void 0);
    __decorate([
        Event()
    ], Popup.prototype, "targetExitViewport", void 0);
    Popup = __decorate([
        NotifyPropertyChanges
    ], Popup);
    return Popup;
}(Component));
export { Popup };
/**
 * Gets scrollable parent elements for the given element.
 *
 * @param { HTMLElement } element - Specify the element to get the scrollable parents of it.
 * @param {boolean} fixedParent - specifies the parent element
 * @private
 * @returns {void}
 */
export function getScrollableParent(element, fixedParent) {
    var eleStyle = getComputedStyle(element);
    var scrollParents = [];
    var overflowRegex = /(auto|scroll)/;
    var parent = element.parentElement;
    while (parent && parent.tagName !== 'HTML') {
        var parentStyle = getComputedStyle(parent);
        if (!(eleStyle.position === 'absolute' && parentStyle.position === 'static')
            && overflowRegex.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
            scrollParents.push(parent);
        }
        parent = parent.parentElement;
    }
    if (!fixedParent) {
        scrollParents.push(document);
    }
    return scrollParents;
}
/**
 * Gets the maximum z-index of the given element.
 *
 * @returns {void}
 * @param { HTMLElement } element - Specify the element to get the maximum z-index of it.
 * @private
 */
export function getZindexPartial(element) {
    // upto body traversal
    var parent = element.parentElement;
    var parentZindex = [];
    while (parent) {
        if (parent.tagName !== 'BODY') {
            var index = document.defaultView.getComputedStyle(parent, null).getPropertyValue('z-index');
            var position = document.defaultView.getComputedStyle(parent, null).getPropertyValue('position');
            if (index !== 'auto' && position !== 'static') {
                parentZindex.push(index);
            }
            parent = parent.parentElement;
        }
        else {
            break;
        }
    }
    var childrenZindex = [];
    for (var i = 0; i < document.body.children.length; i++) {
        if (!element.isEqualNode(document.body.children[i])) {
            var index = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue('z-index');
            var position = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue('position');
            if (index !== 'auto' && position !== 'static') {
                childrenZindex.push(index);
            }
        }
    }
    childrenZindex.push('999');
    var siblingsZindex = [];
    if (!isNullOrUndefined(element.parentElement) && element.parentElement.tagName !== 'BODY') {
        var childNodes = [].slice.call(element.parentElement.children);
        for (var i = 0; i < childNodes.length; i++) {
            if (!element.isEqualNode(childNodes[i])) {
                var index = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue('z-index');
                var position = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue('position');
                if (index !== 'auto' && position !== 'static') {
                    siblingsZindex.push(index);
                }
            }
        }
    }
    var finalValue = parentZindex.concat(childrenZindex, siblingsZindex);
    // eslint-disable-next-line
    var currentZindexValue = Math.max.apply(Math, finalValue) + 1;
    return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}
/**
 * Gets the maximum z-index of the page.
 *
 * @returns {void}
 * @param { HTMLElement } tagName - Specify the tagName to get the maximum z-index of it.
 * @private
 */
export function getMaxZindex(tagName) {
    if (tagName === void 0) { tagName = ['*']; }
    var maxZindex = [];
    for (var i = 0; i < tagName.length; i++) {
        var elements = document.getElementsByTagName(tagName[i]);
        for (var i_1 = 0; i_1 < elements.length; i_1++) {
            var index = document.defaultView.getComputedStyle(elements[i_1], null).getPropertyValue('z-index');
            var position = document.defaultView.getComputedStyle(elements[i_1], null).getPropertyValue('position');
            if (index !== 'auto' && position !== 'static') {
                maxZindex.push(index);
            }
        }
    }
    // eslint-disable-next-line
    var currentZindexValue = Math.max.apply(Math, maxZindex) + 1;
    return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}
