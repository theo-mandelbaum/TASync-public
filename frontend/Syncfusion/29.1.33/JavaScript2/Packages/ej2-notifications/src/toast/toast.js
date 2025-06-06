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
import { Component, Property, ChildProperty, NotifyPropertyChanges, Animation, createElement, animationMode, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { Browser, isNullOrUndefined as isNOU, getUniqueID, formatUnit, EventHandler } from '@syncfusion/ej2-base';
import { Collection, Complex, setStyleAttribute, Event, detach, L10n } from '@syncfusion/ej2-base';
import { attributes, extend, closest, compile as templateCompiler, classList, isUndefined } from '@syncfusion/ej2-base';
import { Touch, isBlazor, SanitizeHtmlHelper, removeClass } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { getZindexPartial } from '@syncfusion/ej2-popups';
var ROOT = 'e-toast';
var CONTAINER = 'e-toast-container';
var TITLE = 'e-toast-title';
var WIDTHFULL = 'e-toast-full-width';
var CONTENT = 'e-toast-content';
var MESSAGE = 'e-toast-message';
var ICON = 'e-toast-icon';
var PROGRESS = 'e-toast-progress';
var ACTIOBUTTONS = 'e-toast-actions';
var CLOSEBTN = 'e-toast-close-icon';
var RTL = 'e-rtl';
var TOAST_BLAZOR_HIDDEN = 'e-blazor-toast-hidden';
/**
 * An object that is used to configure the Toast X Y positions.
 */
var ToastPosition = /** @class */ (function (_super) {
    __extends(ToastPosition, _super);
    function ToastPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Left')
    ], ToastPosition.prototype, "X", void 0);
    __decorate([
        Property('Top')
    ], ToastPosition.prototype, "Y", void 0);
    return ToastPosition;
}(ChildProperty));
export { ToastPosition };
/**
 * An object that is used to configure the action button model properties and event.
 */
var ButtonModelProps = /** @class */ (function (_super) {
    __extends(ButtonModelProps, _super);
    function ButtonModelProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ButtonModelProps.prototype, "model", void 0);
    __decorate([
        Property(null)
    ], ButtonModelProps.prototype, "click", void 0);
    return ButtonModelProps;
}(ChildProperty));
export { ButtonModelProps };
/**
 * An object that is used to configure the animation object of Toast.
 */
var ToastAnimations = /** @class */ (function (_super) {
    __extends(ToastAnimations, _super);
    function ToastAnimations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('FadeIn')
    ], ToastAnimations.prototype, "effect", void 0);
    __decorate([
        Property(600)
    ], ToastAnimations.prototype, "duration", void 0);
    __decorate([
        Property('ease')
    ], ToastAnimations.prototype, "easing", void 0);
    return ToastAnimations;
}(ChildProperty));
export { ToastAnimations };
/**
 * An object that is used to configure the show/hide animation settings of Toast.
 */
var ToastAnimationSettings = /** @class */ (function (_super) {
    __extends(ToastAnimationSettings, _super);
    function ToastAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({ effect: 'FadeIn', duration: 600, easing: 'ease' }, ToastAnimations)
    ], ToastAnimationSettings.prototype, "show", void 0);
    __decorate([
        Complex({ effect: 'FadeOut', duration: 600, easing: 'ease' }, ToastAnimations)
    ], ToastAnimationSettings.prototype, "hide", void 0);
    return ToastAnimationSettings;
}(ChildProperty));
export { ToastAnimationSettings };
/**
 * The Toast is a notification pop-up that showing on desired position which can provide an information to the user.
 * ```html
 * <div id="toast"/>
 * <script>
 *   var toastObj = new Toast();
 *   toastObj.appendTo("#toast");
 * </script>
 * ```
 */
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    /**
     * Initializes a new instance of the Toast class.
     *
     * @param {ToastModel} options  - Specifies Toast model properties as options.
     * @param {HTMLElement} element  - Specifies the element that is rendered as a Toast.
     */
    function Toast(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.toastCollection = [];
        _this.needsID = true;
        return _this;
    }
    /**
     * Gets the Component module name.
     *
     * @returns {string} - returns the string
     * @private
     */
    Toast.prototype.getModuleName = function () {
        return 'toast';
    };
    /**
     * Gets the persisted state properties of the Component.
     *
     * @returns {string} - returns the string
     */
    Toast.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers, attributes and classes.
     *
     * @returns {void}
     */
    Toast.prototype.destroy = function () {
        this.hide('All');
        this.element.classList.remove(CONTAINER);
        setStyleAttribute(this.element, { 'position': '', 'z-index': '' });
        if (!isNOU(this.refElement) && !isNOU(this.refElement.parentElement)) {
            this.refElement.parentElement.insertBefore(this.element, this.refElement);
            detach(this.refElement);
            this.refElement = undefined;
        }
        if (!this.isBlazorServer()) {
            _super.prototype.destroy.call(this);
        }
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    Toast.prototype.preRender = function () {
        //There is no event handler
        this.isDevice = Browser.isDevice;
        if (this.width === '300px') {
            this.width = (this.isDevice && screen.width < 768) ? '100%' : '300px';
        }
        if (isNOU(this.target)) {
            this.target = document.body;
        }
        if (this.enableRtl && !this.isBlazorServer()) {
            this.element.classList.add(RTL);
        }
    };
    /**
     * Initialize the component rendering
     *
     * @returns {void}
     * @private
     */
    Toast.prototype.render = function () {
        this.progressObj = [];
        this.intervalId = [];
        this.contentTemplate = null;
        this.toastTemplate = null;
        this.renderComplete();
        this.initRenderClass = this.element.className;
    };
    /**
     * To show Toast element on a document with the relative position.
     *
     * @param  {ToastModel} toastObj - To show Toast element on screen.
     * @returns {void}
     * @deprecated
     */
    Toast.prototype.show = function (toastObj) {
        var collectionObj;
        if (!isNOU(toastObj)) {
            this.templateChanges(toastObj);
            collectionObj = JSON.parse(JSON.stringify(toastObj));
            extend(this, this, toastObj);
        }
        if (isNOU(this.toastContainer)) {
            this.toastContainer = this.getContainer();
            var target = typeof (this.target) === 'string' ? document.querySelector(this.target) :
                (typeof (this.target) === 'object' ? this.target : document.body);
            if (isNOU(target)) {
                return;
            }
            if (target.tagName === 'BODY') {
                this.toastContainer.style.position = 'fixed';
            }
            else {
                this.toastContainer.style.position = 'absolute';
                target.style.position = 'relative';
            }
            this.setPositioning(this.position);
            target.appendChild(this.toastContainer);
        }
        if (this.isBlazorServer() && this.element.classList.contains('e-control')) {
            this.isToastModel(toastObj);
            return;
        }
        this.toastEle = this.createElement('div', { className: ROOT, id: getUniqueID('toast') });
        this.setWidthHeight();
        this.setCSSClass(this.cssClass);
        if (isNOU(this.template) || this.template === '') {
            this.personalizeToast();
        }
        else {
            this.templateRendering();
        }
        this.setProgress();
        this.setCloseButton();
        this.setAria();
        this.appendToTarget(toastObj);
        if (this.isDevice && screen.width < 768) {
            new Touch(this.toastEle, { swipe: this.swipeHandler.bind(this) });
        }
        if (!isNOU(collectionObj)) {
            extend(collectionObj, { element: [this.toastEle] }, true);
            this.toastCollection.push(collectionObj);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * @param {string} id - specifies the id
     * @param {ToastModel} toastObj - specifies the model
     * @returns {void}
     * @hidden
     * @deprecated
     * This method applicable for blazor alone.
     */
    Toast.prototype.showToast = function (id, toastObj) {
        this.toastEle = this.element.querySelector('#' + id);
        this.show(toastObj);
    };
    Toast.prototype.isToastModel = function (toastObj) {
        this.toastContainer = this.element;
        this.setPositioning(this.position);
        var proxy = null || this;
        if (!isNOU(proxy.element.lastElementChild)) {
            this.setProgress();
        }
        this.setAria();
        this.appendToTarget(toastObj);
    };
    Toast.prototype.swipeHandler = function (e) {
        var toastEle = closest(e.originalEvent.target, '.' + ROOT + ':not(.' + CONTAINER + ')');
        var hideAnimation = this.animation.hide.effect;
        if (!isNOU(toastEle)) {
            if (e.swipeDirection === 'Right') {
                this.animation.hide.effect = 'SlideRightOut';
                this.hideToast('swipe', toastEle);
            }
            else if (e.swipeDirection === 'Left') {
                this.animation.hide.effect = 'SlideLeftOut';
                this.hideToast('swipe', toastEle);
            }
            this.animation.hide.effect = hideAnimation;
        }
    };
    Toast.prototype.templateChanges = function (toastObj) {
        if (!isUndefined(toastObj.content) && !isNOU(this.contentTemplate) && this.content !== toastObj.content) {
            this.clearContentTemplate();
        }
        if (!isUndefined(toastObj.template) && !isNOU(this.toastTemplate) && this.template !== toastObj.template) {
            this.clearToastTemplate();
        }
    };
    Toast.prototype.setCSSClass = function (cssClass) {
        if (cssClass) {
            var split = cssClass.indexOf(',') !== -1 ? ',' : ' ';
            classList(this.toastEle, cssClass.split(split), []);
            if (this.toastContainer) {
                classList(this.toastContainer, cssClass.split(split), []);
            }
        }
    };
    Toast.prototype.setWidthHeight = function () {
        if (this.width === '300px') {
            this.toastEle.style.width = formatUnit(this.width);
        }
        else if (this.width === '100%') {
            this.toastContainer.classList.add(WIDTHFULL);
        }
        else {
            this.toastEle.style.width = formatUnit(this.width);
            this.toastContainer.classList.remove(WIDTHFULL);
        }
        this.toastEle.style.height = formatUnit(this.height);
    };
    Toast.prototype.templateRendering = function () {
        this.fetchEle(this.toastEle, this.template, 'template');
    };
    /**
     * @param {string} value - specifies the string value.
     * @returns {string} - returns the string
     * @hidden
     */
    Toast.prototype.sanitizeHelper = function (value) {
        if (this.enableHtmlSanitizer) {
            var item = SanitizeHtmlHelper.beforeSanitize();
            var beforeEvent = {
                cancel: false,
                helper: null
            };
            extend(item, item, beforeEvent);
            this.trigger('beforeSanitizeHtml', item);
            if (item.cancel && !isNOU(item.helper)) {
                value = item.helper(value);
            }
            else if (!item.cancel) {
                value = SanitizeHtmlHelper.serializeValue(item, value);
            }
        }
        return value;
    };
    /**
     * To Hide Toast element on a document.
     * To Hide all toast element when passing 'All'.
     *
     * @param  {HTMLElement} element - To Hide Toast element on screen.
     * @returns {void}
     */
    Toast.prototype.hide = function (element) {
        this.hideToast('', element);
    };
    Toast.prototype.hideToast = function (interactionType, element) {
        if (isNOU(this.toastContainer) || this.toastContainer.childElementCount === 0) {
            return;
        }
        if (typeof element === 'string' && element === 'All') {
            for (var i = 0; i < this.toastContainer.childElementCount; i++) {
                this.destroyToast(this.toastContainer.children[i], interactionType);
            }
            return;
        }
        if (isNOU(element)) {
            element = (this.newestOnTop ? this.toastContainer.lastElementChild : this.toastContainer.firstElementChild);
        }
        this.destroyToast(element, interactionType);
    };
    Toast.prototype.fetchEle = function (ele, value, prob) {
        value = typeof (value) === 'string' ? this.sanitizeHelper(value) : value;
        var templateFn;
        var tempVar;
        var tmpArray;
        var templateProps;
        if (ele.classList.contains(TITLE)) {
            templateProps = this.element.id + 'title';
        }
        else if (ele.classList.contains(CONTENT)) {
            templateProps = this.element.id + 'content';
        }
        else {
            templateProps = this.element.id + 'template';
        }
        if (prob === 'content') {
            tempVar = this.contentTemplate;
        }
        else {
            tempVar = this.toastTemplate;
        }
        if (!isNOU(tempVar)) {
            ele.appendChild(tempVar.cloneNode(true));
            return ele;
        }
        try {
            if (typeof value !== 'function' && document.querySelectorAll(value).length > 0) {
                var elem = null;
                if (prob !== 'title') {
                    elem = document.querySelector(value);
                    ele.appendChild(elem);
                    elem.style.display = '';
                }
                var clo = isNOU(elem) ? tempVar : elem.cloneNode(true);
                if (prob === 'content') {
                    this.contentTemplate = clo;
                }
                else {
                    this.toastTemplate = clo;
                }
            }
            else {
                templateFn = templateCompiler(value);
            }
        }
        catch (e) {
            templateFn = typeof value == 'object' ? templateCompiler(value) : templateCompiler(initializeCSPTemplate(function () { return value; }));
        }
        if (!isNOU(templateFn)) {
            if (!this.isBlazorServer()) {
                tmpArray = templateFn({}, this, prob, null, true);
            }
            else {
                var isString = true;
                tmpArray = templateFn({}, this, prob, templateProps, isString);
            }
        }
        if (!isNOU(tmpArray) && tmpArray.length > 0 && !(isNOU(tmpArray[0].tagName) && tmpArray.length === 1)) {
            [].slice.call(tmpArray).forEach(function (el) {
                if (!isNOU(el.tagName)) {
                    el.style.display = '';
                }
                ele.appendChild(el);
            });
        }
        else if (typeof value !== 'function' && ele.childElementCount === 0) {
            ele.innerHTML = value;
        }
        return ele;
    };
    Toast.prototype.clearProgress = function (intervalId) {
        if (!isNOU(this.intervalId[intervalId])) {
            clearInterval(this.intervalId[intervalId]);
            delete this.intervalId[intervalId];
        }
        if (!isNOU(this.progressObj[intervalId])) {
            clearInterval(this.progressObj[intervalId].intervalId);
            delete this.progressObj[intervalId];
        }
    };
    Toast.prototype.removeToastContainer = function (isClosed) {
        if (isClosed && this.toastContainer.classList.contains('e-toast-util')) {
            detach(this.toastContainer);
        }
    };
    Toast.prototype.clearContainerPos = function (isClosed) {
        var _this = this;
        if (this.isBlazorServer()) {
            this.toastContainer = null;
            return;
        }
        if (this.customPosition) {
            setStyleAttribute(this.toastContainer, { 'left': '', 'top': '' });
            this.removeToastContainer(isClosed);
            this.toastContainer = null;
            this.customPosition = false;
        }
        else {
            [ROOT + '-top-left',
                ROOT + '-top-right',
                ROOT + '-bottom-left',
                ROOT + '-bottom-right',
                ROOT + '-bottom-center',
                ROOT + '-top-center',
                ROOT + '-full-width'].forEach(function (pos) {
                if (!isNOU(_this.toastContainer) && _this.toastContainer.classList.contains(pos)) {
                    _this.toastContainer.classList.remove(pos);
                }
            });
            this.removeToastContainer(isClosed);
            this.toastContainer = null;
        }
        if (!isNOU(this.contentTemplate)) {
            this.clearContentTemplate();
        }
        if (!isNOU(this.toastTemplate)) {
            this.clearToastTemplate();
        }
    };
    Toast.prototype.clearContentTemplate = function () {
        this.contentTemplate.style.display = 'none';
        document.body.appendChild(this.contentTemplate);
        this.contentTemplate = null;
    };
    Toast.prototype.clearToastTemplate = function () {
        this.toastTemplate.style.display = 'none';
        document.body.appendChild(this.toastTemplate);
        this.toastTemplate = null;
    };
    Toast.prototype.isBlazorServer = function () {
        return (isBlazor() && this.isServerRendered);
    };
    Toast.prototype.destroyToast = function (toastEle, interactionType) {
        var _this = this;
        var toastObj;
        for (var i = 0; i < this.toastCollection.length; i++) {
            if (this.toastCollection[i].element[0] === toastEle) {
                toastObj = this.toastCollection[i];
                this.toastCollection.splice(i, 1);
            }
        }
        var toastBeforeClose = {
            options: this,
            cancel: false,
            type: interactionType,
            element: toastEle,
            toastContainer: this.toastContainer
        };
        var hideAnimate = this.animation.hide;
        var animate = {
            duration: hideAnimate.duration, name: (hideAnimate.effect === 'None' && animationMode === 'Enable') ? 'FadeOut' : hideAnimate.effect, timingFunction: hideAnimate.easing
        };
        var intervalId = parseInt(toastEle.id.split('toast_')[1], 10);
        var toastClose = this.isBlazorServer() ? {
            options: toastObj,
            toastContainer: this.toastContainer
        } : {
            options: toastObj,
            toastContainer: this.toastContainer,
            toastObj: this
        };
        this.trigger('beforeClose', toastBeforeClose, function (toastBeforeCloseArgs) {
            if (!toastBeforeCloseArgs.cancel) {
                if (!isNOU(_this.progressObj[intervalId]) && !isNOU(toastEle.querySelector('.' + PROGRESS))) {
                    _this.progressObj[intervalId].progressEle.style.width = '0%';
                }
                animate.end = function () {
                    _this.clearProgress(intervalId);
                    if (!_this.isBlazorServer() || isNOU(toastObj)) {
                        detach(toastEle);
                    }
                    _this.trigger('close', toastClose);
                    if (_this.toastContainer.childElementCount === 0) {
                        _this.clearContainerPos(true);
                    }
                    hideAnimate = null;
                    animate = null;
                };
                new Animation(animate).animate(toastEle);
            }
        });
    };
    Toast.prototype.personalizeToast = function () {
        this.setIcon();
        this.setTitle();
        this.setContent();
        this.actionButtons();
    };
    Toast.prototype.setAria = function () {
        attributes(this.toastEle, { 'role': 'alert' });
    };
    Toast.prototype.setPositioning = function (pos) {
        if (this.isBlazorServer()) {
            return;
        }
        if (!isNaN(parseFloat(pos.X)) || !isNaN(parseFloat(pos.Y))) {
            this.customPosition = true;
            setStyleAttribute(this.toastContainer, { 'left': formatUnit(pos.X), 'top': formatUnit(pos.Y) });
        }
        else {
            this.toastContainer.classList.add(ROOT + '-' + pos.Y.toString().toLowerCase() + '-' + pos.X.toString().toLowerCase());
        }
    };
    Toast.prototype.setCloseButton = function () {
        if (!this.showCloseButton) {
            return;
        }
        var localeText = { close: 'Close' };
        this.l10n = new L10n('toast', localeText, this.locale);
        this.l10n.setLocale(this.locale);
        var closeIconTitle = this.l10n.getConstant('close');
        var closeBtn = this.createElement('div', { className: CLOSEBTN + ' e-icons ', attrs: { tabindex: '0', 'aria-label': closeIconTitle, 'role': 'button' } });
        this.toastEle.classList.add('e-toast-header-close-icon');
        this.toastEle.appendChild(closeBtn);
    };
    Toast.prototype.setProgress = function () {
        if (this.timeOut > 0) {
            var id = parseInt(this.toastEle.id.split('toast_')[1], 10);
            this.intervalId[id] = window.setTimeout(this.destroyToast.bind(this, this.toastEle), this.timeOut);
            this.progressObj[id] = { hideEta: null, intervalId: null, maxHideTime: null,
                element: null, timeOutId: null, progressEle: null };
            this.progressObj[id].maxHideTime = parseFloat(this.timeOut + '');
            this.progressObj[id].hideEta = new Date().getTime() + this.progressObj[id].maxHideTime;
            this.progressObj[id].element = this.toastEle;
            if (this.extendedTimeout > 0) {
                EventHandler.add(this.toastEle, 'mouseover', this.toastHoverAction.bind(this, id));
                EventHandler.add(this.toastEle, 'mouseleave', this.delayedToastProgress.bind(this, id));
                this.progressObj[id].timeOutId = this.intervalId[id];
            }
            if (this.showProgressBar) {
                this.progressBarEle = this.createElement('div', { className: PROGRESS });
                this.toastEle.insertBefore(this.progressBarEle, this.toastEle.children[0]);
                this.progressObj[id].intervalId =
                    setInterval(this.updateProgressBar.bind(this, this.progressObj[id]), 10);
                this.progressObj[id].progressEle = this.progressBarEle;
            }
        }
    };
    Toast.prototype.toastHoverAction = function (id) {
        clearTimeout(this.progressObj[id].timeOutId);
        clearInterval(this.progressObj[id].intervalId);
        this.progressObj[id].hideEta = 0;
        var toastEle = this.progressObj[id].element;
        if (!isNOU(toastEle.querySelector('.' + PROGRESS))) {
            this.progressObj[id].progressEle.style.width = '0%';
        }
    };
    Toast.prototype.delayedToastProgress = function (id) {
        var progress = this.progressObj[id];
        if (!isNOU(progress)) {
            var toastEle = progress.element;
            progress.timeOutId = window.setTimeout(this.destroyToast.bind(this, toastEle), this.extendedTimeout);
            progress.maxHideTime = parseFloat(this.extendedTimeout + '');
            progress.hideEta = new Date().getTime() + progress.maxHideTime;
            if (!isNOU(toastEle.querySelector('.' + PROGRESS))) {
                progress.intervalId = setInterval(this.updateProgressBar.bind(this, progress), 10);
            }
        }
    };
    Toast.prototype.updateProgressBar = function (progressObj) {
        var percentage = ((progressObj.hideEta - (new Date().getTime())) / progressObj.maxHideTime) * 100;
        percentage = this.progressDirection === 'Ltr' ? 100 - percentage : percentage;
        progressObj.progressEle.style.width = percentage + '%';
    };
    Toast.prototype.setIcon = function () {
        if (isNOU(this.icon) || this.icon.length === 0) {
            return;
        }
        var iconEle = this.createElement('div', { className: ICON + ' e-icons ' + this.icon });
        this.toastEle.classList.add('e-toast-header-icon');
        this.toastEle.appendChild(iconEle);
    };
    Toast.prototype.setTitle = function () {
        if (isNOU(this.title)) {
            return;
        }
        var titleEle = this.createElement('div', { className: TITLE });
        titleEle = this.fetchEle(titleEle, this.title, 'title');
        var msgContainer = this.createElement('div', { className: MESSAGE });
        msgContainer.appendChild(titleEle);
        this.toastEle.appendChild(msgContainer);
    };
    Toast.prototype.setContent = function () {
        var contentEle = this.createElement('div', { className: CONTENT });
        var ele = this.element;
        if (isNOU(this.content) || this.content === '') {
            var isContent = this.element.innerHTML.replace(/\s/g, '') !== '';
            if ((ele.children.length > 0 || isContent) && !(ele.firstElementChild && ele.firstElementChild.classList.contains(ROOT))) {
                this.innerEle = document.createDocumentFragment();
                var tempEle_1 = this.createElement('div');
                while (ele.childNodes.length !== 0) {
                    this.innerEle.appendChild(this.element.childNodes[0]);
                }
                contentEle.appendChild(this.innerEle);
                [].slice.call(contentEle.children).forEach(function (ele) {
                    tempEle_1.appendChild(ele.cloneNode(true));
                });
                this.content = tempEle_1;
                this.appendMessageContainer(contentEle);
            }
        }
        else {
            if (typeof (this.content) === 'object' && !isNOU(this.content.tagName)) {
                contentEle.appendChild(this.content);
                this.content = this.content.cloneNode(true);
                this.appendMessageContainer(contentEle);
            }
            else {
                contentEle = this.fetchEle(contentEle, this.content, 'content');
                this.appendMessageContainer(contentEle);
            }
        }
    };
    Toast.prototype.appendMessageContainer = function (element) {
        if (this.toastEle.querySelectorAll('.' + MESSAGE).length > 0) {
            this.toastEle.querySelector('.' + MESSAGE).appendChild(element);
        }
        else {
            var msgContainer = this.createElement('div', { className: MESSAGE });
            msgContainer.appendChild(element);
            this.toastEle.appendChild(msgContainer);
        }
    };
    Toast.prototype.actionButtons = function () {
        var _this = this;
        var actionBtnContainer = this.createElement('div', { className: ACTIOBUTTONS });
        [].slice.call(this.buttons).forEach(function (actionBtn) {
            if (isNOU(actionBtn.model)) {
                return;
            }
            var btnDom = _this.createElement('button');
            btnDom.setAttribute('type', 'button');
            if (isNOU(actionBtn.model.cssClass) || actionBtn.model.cssClass.length === 0) {
                actionBtn.model.cssClass = 'e-primary' + ' ' + _this.cssClass;
            }
            btnDom.classList.add('e-small');
            new Button(actionBtn.model, btnDom);
            if (!isNOU(actionBtn.click) && typeof (actionBtn.click) === 'function') {
                EventHandler.add(btnDom, 'click', actionBtn.click);
            }
            actionBtnContainer.appendChild(btnDom);
        });
        if (actionBtnContainer.childElementCount > 0) {
            this.appendMessageContainer(actionBtnContainer);
        }
    };
    Toast.prototype.appendToTarget = function (toastObj) {
        var _this = this;
        var toastBeforeOpen = this.isBlazorServer() ? {
            options: toastObj,
            element: this.toastEle,
            cancel: false
        } : {
            options: toastObj,
            toastObj: this,
            element: this.toastEle,
            cancel: false
        };
        this.trigger('beforeOpen', toastBeforeOpen, function (toastBeforeOpenArgs) {
            if (!toastBeforeOpenArgs.cancel) {
                if (!_this.isBlazorServer()) {
                    _this.toastEle.style.display = 'none';
                }
                if (_this.newestOnTop && _this.toastContainer.childElementCount !== 0) {
                    _this.toastContainer.insertBefore(_this.toastEle, _this.toastContainer.children[0]);
                }
                else if (!_this.isBlazorServer()) {
                    _this.toastContainer.appendChild(_this.toastEle);
                }
                removeClass([_this.toastEle], TOAST_BLAZOR_HIDDEN);
                EventHandler.add(_this.toastEle, 'click', _this.clickHandler, _this);
                EventHandler.add(_this.toastEle, 'keydown', _this.keyDownHandler, _this);
                _this.toastContainer.style.zIndex = getZindexPartial(_this.toastContainer) + '';
                _this.displayToast(_this.toastEle, toastObj);
            }
            else if (_this.isBlazorServer()) {
                var intervalId = parseInt(_this.toastEle.id.split('toast_')[1], 10);
                _this.clearProgress(intervalId);
                detach(_this.toastEle);
                if (_this.toastContainer.childElementCount === 0) {
                    _this.clearContainerPos();
                }
            }
        });
    };
    Toast.prototype.clickHandler = function (e) {
        var _this = this;
        if (!this.isBlazorServer()) {
            e.stopPropagation();
        }
        var target = e.target;
        var toastEle = closest(target, '.' + ROOT);
        var clickArgs = this.isBlazorServer() ? {
            element: toastEle, cancel: false, clickToClose: false, originalEvent: e
        } : {
            element: toastEle, cancel: false, clickToClose: false, originalEvent: e, toastObj: this
        };
        var isCloseIcon = target.classList.contains(CLOSEBTN);
        this.trigger('click', clickArgs, function (toastClickArgs) {
            if ((isCloseIcon && !toastClickArgs.cancel) || toastClickArgs.clickToClose) {
                _this.destroyToast(toastEle, 'click');
            }
        });
    };
    Toast.prototype.keyDownHandler = function (e) {
        if (e.target.classList.contains(CLOSEBTN) &&
            (e.keyCode === 13 || e.keyCode === 32)) {
            var target = e.target;
            var toastEle = closest(target, '.' + ROOT);
            this.destroyToast(toastEle, 'key');
        }
    };
    Toast.prototype.displayToast = function (toastEle, toastObj) {
        var _this = this;
        var showAnimate = this.animation.show;
        var animate = {
            duration: showAnimate.duration, name: (showAnimate.effect === 'None' && animationMode === 'Enable') ? 'FadeIn' : showAnimate.effect, timingFunction: showAnimate.easing
        };
        var toastOpen = this.isBlazorServer() ? {
            options: toastObj,
            element: this.toastEle
        } : {
            options: toastObj,
            toastObj: this,
            element: this.toastEle
        };
        animate.begin = function () {
            toastEle.style.display = '';
        };
        animate.end = function () {
            _this.trigger('open', toastOpen);
        };
        new Animation(animate).animate(toastEle);
    };
    Toast.prototype.getContainer = function () {
        this.element.classList.add(CONTAINER);
        return this.element;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {ToastModel} newProp - specifies the new property
     * @param {ToastModel} oldProp - specifies the old property
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line
    Toast.prototype.onPropertyChanged = function (newProp, oldProp) {
        var container = this.element;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        container.classList.add(RTL);
                    }
                    else {
                        container.classList.remove(RTL);
                    }
                    break;
            }
        }
    };
    __decorate([
        Property('300px')
    ], Toast.prototype, "width", void 0);
    __decorate([
        Property('auto')
    ], Toast.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], Toast.prototype, "title", void 0);
    __decorate([
        Property(null)
    ], Toast.prototype, "content", void 0);
    __decorate([
        Property(true)
    ], Toast.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(null)
    ], Toast.prototype, "icon", void 0);
    __decorate([
        Property(null)
    ], Toast.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], Toast.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], Toast.prototype, "newestOnTop", void 0);
    __decorate([
        Property(false)
    ], Toast.prototype, "showCloseButton", void 0);
    __decorate([
        Property(false)
    ], Toast.prototype, "showProgressBar", void 0);
    __decorate([
        Property(5000)
    ], Toast.prototype, "timeOut", void 0);
    __decorate([
        Property('Rtl')
    ], Toast.prototype, "progressDirection", void 0);
    __decorate([
        Property(1000)
    ], Toast.prototype, "extendedTimeout", void 0);
    __decorate([
        Complex({}, ToastAnimationSettings)
    ], Toast.prototype, "animation", void 0);
    __decorate([
        Complex({}, ToastPosition)
    ], Toast.prototype, "position", void 0);
    __decorate([
        Collection([{}], ButtonModelProps)
    ], Toast.prototype, "buttons", void 0);
    __decorate([
        Property(null)
    ], Toast.prototype, "target", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "created", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "open", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "close", void 0);
    __decorate([
        Event()
    ], Toast.prototype, "click", void 0);
    Toast = __decorate([
        NotifyPropertyChanges
    ], Toast);
    return Toast;
}(Component));
export { Toast };
/**
 * Base for creating Toast through utility method.
 */
// eslint-disable-next-line
export var ToastUtility;
(function (ToastUtility) {
    /**
     * To display a simple toast using the 'ToastUtility' with 'ToastModal' or
     * as string with toast content, type, timeOut.
     * ```
     * Eg : ToastUtility.show('Toast Content Message', 'Information', 7000);
     *
     * ```
     */
    /* istanbul ignore next */
    /**
     *
     * @param { ToastModel | string } content - Specifies the toast modal or the content of the Toast.
     * @param {string} type - Specifies the type of toast.
     * @param { number } timeOut - Specifies the timeOut of the toast.
     * @returns {Toast} - returns the element
     */
    function show(content, type, timeOut) {
        var toastContainerElement;
        if (document.querySelector('.' + CONTAINER)) {
            toastContainerElement = document.querySelector('.' + CONTAINER);
        }
        else {
            toastContainerElement = createElement('div', { 'className': ROOT + ' ' + CONTAINER + ' e-toast-util' });
            document.body.appendChild(toastContainerElement);
        }
        var untilToastsModel;
        if (typeof (content) === 'string') {
            var cssClass = void 0;
            var icon = void 0;
            if (!isNOU(type)) {
                switch (type) {
                    case 'Warning':
                        cssClass = 'e-toast-warning';
                        icon = 'e-toast-warning-icon';
                        break;
                    case 'Success':
                        cssClass = 'e-toast-success';
                        icon = 'e-toast-success-icon';
                        break;
                    case 'Error':
                        cssClass = 'e-toast-danger';
                        icon = 'e-toast-error-icon';
                        break;
                    case 'Information':
                        cssClass = 'e-toast-info';
                        icon = 'e-toast-info-icon';
                        break;
                }
            }
            else {
                cssClass = '';
                icon = '';
            }
            untilToastsModel = {
                content: content,
                cssClass: cssClass,
                icon: icon,
                timeOut: !isNOU(timeOut) ? timeOut : 5000
            };
        }
        else {
            untilToastsModel = content;
        }
        var toastObj = new Toast(untilToastsModel);
        toastObj.appendTo(toastContainerElement);
        toastObj.show();
        return toastObj;
    }
    ToastUtility.show = show;
})(ToastUtility || (ToastUtility = {}));
