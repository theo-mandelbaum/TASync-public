import { ChildProperty, Property, Complex, Component, setStyleAttribute, isNullOrUndefined, detach, Browser, extend, getUniqueID, Touch, closest, isUndefined, classList, formatUnit, SanitizeHtmlHelper, compile, initializeCSPTemplate, isBlazor, animationMode, Animation, attributes, L10n, EventHandler, removeClass, Collection, Event, NotifyPropertyChanges, createElement, append, addClass } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { getZindexPartial } from '@syncfusion/ej2-popups';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ROOT = 'e-toast';
const CONTAINER = 'e-toast-container';
const TITLE = 'e-toast-title';
const WIDTHFULL = 'e-toast-full-width';
const CONTENT = 'e-toast-content';
const MESSAGE = 'e-toast-message';
const ICON = 'e-toast-icon';
const PROGRESS = 'e-toast-progress';
const ACTIOBUTTONS = 'e-toast-actions';
const CLOSEBTN = 'e-toast-close-icon';
const RTL = 'e-rtl';
const TOAST_BLAZOR_HIDDEN = 'e-blazor-toast-hidden';
/**
 * An object that is used to configure the Toast X Y positions.
 */
class ToastPosition extends ChildProperty {
}
__decorate([
    Property('Left')
], ToastPosition.prototype, "X", void 0);
__decorate([
    Property('Top')
], ToastPosition.prototype, "Y", void 0);
/**
 * An object that is used to configure the action button model properties and event.
 */
class ButtonModelProps extends ChildProperty {
}
__decorate([
    Property(null)
], ButtonModelProps.prototype, "model", void 0);
__decorate([
    Property(null)
], ButtonModelProps.prototype, "click", void 0);
/**
 * An object that is used to configure the animation object of Toast.
 */
class ToastAnimations extends ChildProperty {
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
/**
 * An object that is used to configure the show/hide animation settings of Toast.
 */
class ToastAnimationSettings extends ChildProperty {
}
__decorate([
    Complex({ effect: 'FadeIn', duration: 600, easing: 'ease' }, ToastAnimations)
], ToastAnimationSettings.prototype, "show", void 0);
__decorate([
    Complex({ effect: 'FadeOut', duration: 600, easing: 'ease' }, ToastAnimations)
], ToastAnimationSettings.prototype, "hide", void 0);
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
let Toast = class Toast extends Component {
    /**
     * Initializes a new instance of the Toast class.
     *
     * @param {ToastModel} options  - Specifies Toast model properties as options.
     * @param {HTMLElement} element  - Specifies the element that is rendered as a Toast.
     */
    constructor(options, element) {
        super(options, element);
        this.toastCollection = [];
        this.needsID = true;
    }
    /**
     * Gets the Component module name.
     *
     * @returns {string} - returns the string
     * @private
     */
    getModuleName() {
        return 'toast';
    }
    /**
     * Gets the persisted state properties of the Component.
     *
     * @returns {string} - returns the string
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * Removes the component from the DOM and detaches all its related event handlers, attributes and classes.
     *
     * @returns {void}
     */
    destroy() {
        this.hide('All');
        this.element.classList.remove(CONTAINER);
        setStyleAttribute(this.element, { 'position': '', 'z-index': '' });
        if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
            this.refElement.parentElement.insertBefore(this.element, this.refElement);
            detach(this.refElement);
            this.refElement = undefined;
        }
        if (!this.isBlazorServer()) {
            super.destroy();
        }
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        //There is no event handler
        this.isDevice = Browser.isDevice;
        if (this.width === '300px') {
            this.width = (this.isDevice && screen.width < 768) ? '100%' : '300px';
        }
        if (isNullOrUndefined(this.target)) {
            this.target = document.body;
        }
        if (this.enableRtl && !this.isBlazorServer()) {
            this.element.classList.add(RTL);
        }
    }
    /**
     * Initialize the component rendering
     *
     * @returns {void}
     * @private
     */
    render() {
        this.progressObj = [];
        this.intervalId = [];
        this.contentTemplate = null;
        this.toastTemplate = null;
        this.renderComplete();
        this.initRenderClass = this.element.className;
    }
    /**
     * To show Toast element on a document with the relative position.
     *
     * @param  {ToastModel} toastObj - To show Toast element on screen.
     * @returns {void}
     * @deprecated
     */
    show(toastObj) {
        let collectionObj;
        if (!isNullOrUndefined(toastObj)) {
            this.templateChanges(toastObj);
            collectionObj = JSON.parse(JSON.stringify(toastObj));
            extend(this, this, toastObj);
        }
        if (isNullOrUndefined(this.toastContainer)) {
            this.toastContainer = this.getContainer();
            const target = typeof (this.target) === 'string' ? document.querySelector(this.target) :
                (typeof (this.target) === 'object' ? this.target : document.body);
            if (isNullOrUndefined(target)) {
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
        if (isNullOrUndefined(this.template) || this.template === '') {
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
        if (!isNullOrUndefined(collectionObj)) {
            extend(collectionObj, { element: [this.toastEle] }, true);
            this.toastCollection.push(collectionObj);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    }
    /**
     * @param {string} id - specifies the id
     * @param {ToastModel} toastObj - specifies the model
     * @returns {void}
     * @hidden
     * @deprecated
     * This method applicable for blazor alone.
     */
    showToast(id, toastObj) {
        this.toastEle = this.element.querySelector('#' + id);
        this.show(toastObj);
    }
    isToastModel(toastObj) {
        this.toastContainer = this.element;
        this.setPositioning(this.position);
        const proxy =  this;
        if (!isNullOrUndefined(proxy.element.lastElementChild)) {
            this.setProgress();
        }
        this.setAria();
        this.appendToTarget(toastObj);
    }
    swipeHandler(e) {
        const toastEle = closest(e.originalEvent.target, '.' + ROOT + ':not(.' + CONTAINER + ')');
        const hideAnimation = this.animation.hide.effect;
        if (!isNullOrUndefined(toastEle)) {
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
    }
    templateChanges(toastObj) {
        if (!isUndefined(toastObj.content) && !isNullOrUndefined(this.contentTemplate) && this.content !== toastObj.content) {
            this.clearContentTemplate();
        }
        if (!isUndefined(toastObj.template) && !isNullOrUndefined(this.toastTemplate) && this.template !== toastObj.template) {
            this.clearToastTemplate();
        }
    }
    setCSSClass(cssClass) {
        if (cssClass) {
            const split = cssClass.indexOf(',') !== -1 ? ',' : ' ';
            classList(this.toastEle, cssClass.split(split), []);
            if (this.toastContainer) {
                classList(this.toastContainer, cssClass.split(split), []);
            }
        }
    }
    setWidthHeight() {
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
    }
    templateRendering() {
        this.fetchEle(this.toastEle, this.template, 'template');
    }
    /**
     * @param {string} value - specifies the string value.
     * @returns {string} - returns the string
     * @hidden
     */
    sanitizeHelper(value) {
        if (this.enableHtmlSanitizer) {
            const item = SanitizeHtmlHelper.beforeSanitize();
            const beforeEvent = {
                cancel: false,
                helper: null
            };
            extend(item, item, beforeEvent);
            this.trigger('beforeSanitizeHtml', item);
            if (item.cancel && !isNullOrUndefined(item.helper)) {
                value = item.helper(value);
            }
            else if (!item.cancel) {
                value = SanitizeHtmlHelper.serializeValue(item, value);
            }
        }
        return value;
    }
    /**
     * To Hide Toast element on a document.
     * To Hide all toast element when passing 'All'.
     *
     * @param  {HTMLElement} element - To Hide Toast element on screen.
     * @returns {void}
     */
    hide(element) {
        this.hideToast('', element);
    }
    hideToast(interactionType, element) {
        if (isNullOrUndefined(this.toastContainer) || this.toastContainer.childElementCount === 0) {
            return;
        }
        if (typeof element === 'string' && element === 'All') {
            for (let i = 0; i < this.toastContainer.childElementCount; i++) {
                this.destroyToast(this.toastContainer.children[i], interactionType);
            }
            return;
        }
        if (isNullOrUndefined(element)) {
            element = (this.newestOnTop ? this.toastContainer.lastElementChild : this.toastContainer.firstElementChild);
        }
        this.destroyToast(element, interactionType);
    }
    fetchEle(ele, value, prob) {
        value = typeof (value) === 'string' ? this.sanitizeHelper(value) : value;
        let templateFn;
        let tempVar;
        let tmpArray;
        let templateProps;
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
        if (!isNullOrUndefined(tempVar)) {
            ele.appendChild(tempVar.cloneNode(true));
            return ele;
        }
        try {
            if (typeof value !== 'function' && document.querySelectorAll(value).length > 0) {
                let elem = null;
                if (prob !== 'title') {
                    elem = document.querySelector(value);
                    ele.appendChild(elem);
                    elem.style.display = '';
                }
                const clo = isNullOrUndefined(elem) ? tempVar : elem.cloneNode(true);
                if (prob === 'content') {
                    this.contentTemplate = clo;
                }
                else {
                    this.toastTemplate = clo;
                }
            }
            else {
                templateFn = compile(value);
            }
        }
        catch (e) {
            templateFn = typeof value == 'object' ? compile(value) : compile(initializeCSPTemplate(function () { return value; }));
        }
        if (!isNullOrUndefined(templateFn)) {
            if (!this.isBlazorServer()) {
                tmpArray = templateFn({}, this, prob, null, true);
            }
            else {
                const isString = true;
                tmpArray = templateFn({}, this, prob, templateProps, isString);
            }
        }
        if (!isNullOrUndefined(tmpArray) && tmpArray.length > 0 && !(isNullOrUndefined(tmpArray[0].tagName) && tmpArray.length === 1)) {
            [].slice.call(tmpArray).forEach((el) => {
                if (!isNullOrUndefined(el.tagName)) {
                    el.style.display = '';
                }
                ele.appendChild(el);
            });
        }
        else if (typeof value !== 'function' && ele.childElementCount === 0) {
            ele.innerHTML = value;
        }
        return ele;
    }
    clearProgress(intervalId) {
        if (!isNullOrUndefined(this.intervalId[intervalId])) {
            clearInterval(this.intervalId[intervalId]);
            delete this.intervalId[intervalId];
        }
        if (!isNullOrUndefined(this.progressObj[intervalId])) {
            clearInterval(this.progressObj[intervalId].intervalId);
            delete this.progressObj[intervalId];
        }
    }
    removeToastContainer(isClosed) {
        if (isClosed && this.toastContainer.classList.contains('e-toast-util')) {
            detach(this.toastContainer);
        }
    }
    clearContainerPos(isClosed) {
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
                ROOT + '-full-width'].forEach((pos) => {
                if (!isNullOrUndefined(this.toastContainer) && this.toastContainer.classList.contains(pos)) {
                    this.toastContainer.classList.remove(pos);
                }
            });
            this.removeToastContainer(isClosed);
            this.toastContainer = null;
        }
        if (!isNullOrUndefined(this.contentTemplate)) {
            this.clearContentTemplate();
        }
        if (!isNullOrUndefined(this.toastTemplate)) {
            this.clearToastTemplate();
        }
    }
    clearContentTemplate() {
        this.contentTemplate.style.display = 'none';
        document.body.appendChild(this.contentTemplate);
        this.contentTemplate = null;
    }
    clearToastTemplate() {
        this.toastTemplate.style.display = 'none';
        document.body.appendChild(this.toastTemplate);
        this.toastTemplate = null;
    }
    isBlazorServer() {
        return (isBlazor() && this.isServerRendered);
    }
    destroyToast(toastEle, interactionType) {
        let toastObj;
        for (let i = 0; i < this.toastCollection.length; i++) {
            if (this.toastCollection[i].element[0] === toastEle) {
                toastObj = this.toastCollection[i];
                this.toastCollection.splice(i, 1);
            }
        }
        const toastBeforeClose = {
            options: this,
            cancel: false,
            type: interactionType,
            element: toastEle,
            toastContainer: this.toastContainer
        };
        let hideAnimate = this.animation.hide;
        let animate = {
            duration: hideAnimate.duration, name: (hideAnimate.effect === 'None' && animationMode === 'Enable') ? 'FadeOut' : hideAnimate.effect, timingFunction: hideAnimate.easing
        };
        const intervalId = parseInt(toastEle.id.split('toast_')[1], 10);
        const toastClose = this.isBlazorServer() ? {
            options: toastObj,
            toastContainer: this.toastContainer
        } : {
            options: toastObj,
            toastContainer: this.toastContainer,
            toastObj: this
        };
        this.trigger('beforeClose', toastBeforeClose, (toastBeforeCloseArgs) => {
            if (!toastBeforeCloseArgs.cancel) {
                if (!isNullOrUndefined(this.progressObj[intervalId]) && !isNullOrUndefined(toastEle.querySelector('.' + PROGRESS))) {
                    this.progressObj[intervalId].progressEle.style.width = '0%';
                }
                animate.end = () => {
                    this.clearProgress(intervalId);
                    if (!this.isBlazorServer() || isNullOrUndefined(toastObj)) {
                        detach(toastEle);
                    }
                    this.trigger('close', toastClose);
                    if (this.toastContainer.childElementCount === 0) {
                        this.clearContainerPos(true);
                    }
                    hideAnimate = null;
                    animate = null;
                };
                new Animation(animate).animate(toastEle);
            }
        });
    }
    personalizeToast() {
        this.setIcon();
        this.setTitle();
        this.setContent();
        this.actionButtons();
    }
    setAria() {
        attributes(this.toastEle, { 'role': 'alert' });
    }
    setPositioning(pos) {
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
    }
    setCloseButton() {
        if (!this.showCloseButton) {
            return;
        }
        const localeText = { close: 'Close' };
        this.l10n = new L10n('toast', localeText, this.locale);
        this.l10n.setLocale(this.locale);
        const closeIconTitle = this.l10n.getConstant('close');
        const closeBtn = this.createElement('div', { className: CLOSEBTN + ' e-icons ', attrs: { tabindex: '0', 'aria-label': closeIconTitle, 'role': 'button' } });
        this.toastEle.classList.add('e-toast-header-close-icon');
        this.toastEle.appendChild(closeBtn);
    }
    setProgress() {
        if (this.timeOut > 0) {
            const id = parseInt(this.toastEle.id.split('toast_')[1], 10);
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
    }
    toastHoverAction(id) {
        clearTimeout(this.progressObj[id].timeOutId);
        clearInterval(this.progressObj[id].intervalId);
        this.progressObj[id].hideEta = 0;
        const toastEle = this.progressObj[id].element;
        if (!isNullOrUndefined(toastEle.querySelector('.' + PROGRESS))) {
            this.progressObj[id].progressEle.style.width = '0%';
        }
    }
    delayedToastProgress(id) {
        const progress = this.progressObj[id];
        if (!isNullOrUndefined(progress)) {
            const toastEle = progress.element;
            progress.timeOutId = window.setTimeout(this.destroyToast.bind(this, toastEle), this.extendedTimeout);
            progress.maxHideTime = parseFloat(this.extendedTimeout + '');
            progress.hideEta = new Date().getTime() + progress.maxHideTime;
            if (!isNullOrUndefined(toastEle.querySelector('.' + PROGRESS))) {
                progress.intervalId = setInterval(this.updateProgressBar.bind(this, progress), 10);
            }
        }
    }
    updateProgressBar(progressObj) {
        let percentage = ((progressObj.hideEta - (new Date().getTime())) / progressObj.maxHideTime) * 100;
        percentage = this.progressDirection === 'Ltr' ? 100 - percentage : percentage;
        progressObj.progressEle.style.width = percentage + '%';
    }
    setIcon() {
        if (isNullOrUndefined(this.icon) || this.icon.length === 0) {
            return;
        }
        const iconEle = this.createElement('div', { className: ICON + ' e-icons ' + this.icon });
        this.toastEle.classList.add('e-toast-header-icon');
        this.toastEle.appendChild(iconEle);
    }
    setTitle() {
        if (isNullOrUndefined(this.title)) {
            return;
        }
        let titleEle = this.createElement('div', { className: TITLE });
        titleEle = this.fetchEle(titleEle, this.title, 'title');
        const msgContainer = this.createElement('div', { className: MESSAGE });
        msgContainer.appendChild(titleEle);
        this.toastEle.appendChild(msgContainer);
    }
    setContent() {
        let contentEle = this.createElement('div', { className: CONTENT });
        const ele = this.element;
        if (isNullOrUndefined(this.content) || this.content === '') {
            const isContent = this.element.innerHTML.replace(/\s/g, '') !== '';
            if ((ele.children.length > 0 || isContent) && !(ele.firstElementChild && ele.firstElementChild.classList.contains(ROOT))) {
                this.innerEle = document.createDocumentFragment();
                const tempEle = this.createElement('div');
                while (ele.childNodes.length !== 0) {
                    this.innerEle.appendChild(this.element.childNodes[0]);
                }
                contentEle.appendChild(this.innerEle);
                [].slice.call(contentEle.children).forEach((ele) => {
                    tempEle.appendChild(ele.cloneNode(true));
                });
                this.content = tempEle;
                this.appendMessageContainer(contentEle);
            }
        }
        else {
            if (typeof (this.content) === 'object' && !isNullOrUndefined(this.content.tagName)) {
                contentEle.appendChild(this.content);
                this.content = this.content.cloneNode(true);
                this.appendMessageContainer(contentEle);
            }
            else {
                contentEle = this.fetchEle(contentEle, this.content, 'content');
                this.appendMessageContainer(contentEle);
            }
        }
    }
    appendMessageContainer(element) {
        if (this.toastEle.querySelectorAll('.' + MESSAGE).length > 0) {
            this.toastEle.querySelector('.' + MESSAGE).appendChild(element);
        }
        else {
            const msgContainer = this.createElement('div', { className: MESSAGE });
            msgContainer.appendChild(element);
            this.toastEle.appendChild(msgContainer);
        }
    }
    actionButtons() {
        const actionBtnContainer = this.createElement('div', { className: ACTIOBUTTONS });
        [].slice.call(this.buttons).forEach((actionBtn) => {
            if (isNullOrUndefined(actionBtn.model)) {
                return;
            }
            const btnDom = this.createElement('button');
            btnDom.setAttribute('type', 'button');
            if (isNullOrUndefined(actionBtn.model.cssClass) || actionBtn.model.cssClass.length === 0) {
                actionBtn.model.cssClass = 'e-primary' + ' ' + this.cssClass;
            }
            btnDom.classList.add('e-small');
            new Button(actionBtn.model, btnDom);
            if (!isNullOrUndefined(actionBtn.click) && typeof (actionBtn.click) === 'function') {
                EventHandler.add(btnDom, 'click', actionBtn.click);
            }
            actionBtnContainer.appendChild(btnDom);
        });
        if (actionBtnContainer.childElementCount > 0) {
            this.appendMessageContainer(actionBtnContainer);
        }
    }
    appendToTarget(toastObj) {
        const toastBeforeOpen = this.isBlazorServer() ? {
            options: toastObj,
            element: this.toastEle,
            cancel: false
        } : {
            options: toastObj,
            toastObj: this,
            element: this.toastEle,
            cancel: false
        };
        this.trigger('beforeOpen', toastBeforeOpen, (toastBeforeOpenArgs) => {
            if (!toastBeforeOpenArgs.cancel) {
                if (!this.isBlazorServer()) {
                    this.toastEle.style.display = 'none';
                }
                if (this.newestOnTop && this.toastContainer.childElementCount !== 0) {
                    this.toastContainer.insertBefore(this.toastEle, this.toastContainer.children[0]);
                }
                else if (!this.isBlazorServer()) {
                    this.toastContainer.appendChild(this.toastEle);
                }
                removeClass([this.toastEle], TOAST_BLAZOR_HIDDEN);
                EventHandler.add(this.toastEle, 'click', this.clickHandler, this);
                EventHandler.add(this.toastEle, 'keydown', this.keyDownHandler, this);
                this.toastContainer.style.zIndex = getZindexPartial(this.toastContainer) + '';
                this.displayToast(this.toastEle, toastObj);
            }
            else if (this.isBlazorServer()) {
                const intervalId = parseInt(this.toastEle.id.split('toast_')[1], 10);
                this.clearProgress(intervalId);
                detach(this.toastEle);
                if (this.toastContainer.childElementCount === 0) {
                    this.clearContainerPos();
                }
            }
        });
    }
    clickHandler(e) {
        if (!this.isBlazorServer()) {
            e.stopPropagation();
        }
        const target = e.target;
        const toastEle = closest(target, '.' + ROOT);
        const clickArgs = this.isBlazorServer() ? {
            element: toastEle, cancel: false, clickToClose: false, originalEvent: e
        } : {
            element: toastEle, cancel: false, clickToClose: false, originalEvent: e, toastObj: this
        };
        const isCloseIcon = target.classList.contains(CLOSEBTN);
        this.trigger('click', clickArgs, (toastClickArgs) => {
            if ((isCloseIcon && !toastClickArgs.cancel) || toastClickArgs.clickToClose) {
                this.destroyToast(toastEle, 'click');
            }
        });
    }
    keyDownHandler(e) {
        if (e.target.classList.contains(CLOSEBTN) &&
            (e.keyCode === 13 || e.keyCode === 32)) {
            const target = e.target;
            const toastEle = closest(target, '.' + ROOT);
            this.destroyToast(toastEle, 'key');
        }
    }
    displayToast(toastEle, toastObj) {
        const showAnimate = this.animation.show;
        const animate = {
            duration: showAnimate.duration, name: (showAnimate.effect === 'None' && animationMode === 'Enable') ? 'FadeIn' : showAnimate.effect, timingFunction: showAnimate.easing
        };
        const toastOpen = this.isBlazorServer() ? {
            options: toastObj,
            element: this.toastEle
        } : {
            options: toastObj,
            toastObj: this,
            element: this.toastEle
        };
        animate.begin = () => {
            toastEle.style.display = '';
        };
        animate.end = () => {
            this.trigger('open', toastOpen);
        };
        new Animation(animate).animate(toastEle);
    }
    getContainer() {
        this.element.classList.add(CONTAINER);
        return this.element;
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {ToastModel} newProp - specifies the new property
     * @param {ToastModel} oldProp - specifies the old property
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line
    onPropertyChanged(newProp, oldProp) {
        const container = this.element;
        for (const prop of Object.keys(newProp)) {
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
/**
 * Base for creating Toast through utility method.
 */
// eslint-disable-next-line
var ToastUtility;
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
        let toastContainerElement;
        if (document.querySelector('.' + CONTAINER)) {
            toastContainerElement = document.querySelector('.' + CONTAINER);
        }
        else {
            toastContainerElement = createElement('div', { 'className': ROOT + ' ' + CONTAINER + ' e-toast-util' });
            document.body.appendChild(toastContainerElement);
        }
        let untilToastsModel;
        if (typeof (content) === 'string') {
            let cssClass;
            let icon;
            if (!isNullOrUndefined(type)) {
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
                timeOut: !isNullOrUndefined(timeOut) ? timeOut : 5000
            };
        }
        else {
            untilToastsModel = content;
        }
        const toastObj = new Toast(untilToastsModel);
        toastObj.appendTo(toastContainerElement);
        toastObj.show();
        return toastObj;
    }
    ToastUtility.show = show;
})(ToastUtility || (ToastUtility = {}));

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the type of severity to display the message with distinctive icons and colors.
 */
var Severity;
(function (Severity) {
    /**
     * The message is displayed with icons and colors to denote it as a normal message.
     */
    Severity["Normal"] = "Normal";
    /**
     * The message is displayed with icons and colors to denote it as a success message.
     */
    Severity["Success"] = "Success";
    /**
     * The message is displayed with icons and colors to denote it as information.
     */
    Severity["Info"] = "Info";
    /**
     * The message is displayed with icons and colors to denote it as a warning message.
     */
    Severity["Warning"] = "Warning";
    /**
     * The message is displayed with icons and colors to denote it as an error message.
     */
    Severity["Error"] = "Error";
})(Severity || (Severity = {}));
/**
 * Specifies the predefined appearance variants for the component to display.
 */
var Variant;
(function (Variant) {
    /**
     * Denotes the severity is differentiated using text color and light background color.
     */
    Variant["Text"] = "Text";
    /**
     * Denotes the severity is differentiated using text color and border without background.
     */
    Variant["Outlined"] = "Outlined";
    /**
     * Denotes the severity is differentiated using text color and dark background color.
     */
    Variant["Filled"] = "Filled";
})(Variant || (Variant = {}));
const MSG_ICON = 'e-msg-icon';
const MSG_CLOSE_ICON = 'e-msg-close-icon';
const MSG_CONTENT = 'e-msg-content';
const MSG_CONTENT_CENTER = 'e-content-center';
const RTL$1 = 'e-rtl';
const SUCCESS = 'e-success';
const WARNING = 'e-warning';
const INFO = 'e-info';
const ERROR = 'e-error';
const OUTLINED = 'e-outlined';
const FILLED = 'e-filled';
const HIDE = 'e-hidden';
/**
 * The Message component displays messages with severity by differentiating icons and colors to denote the importance and context of the message to the end user.
 * ```html
 * <div id="msg"></div>
 * <script>
 *   var msgObj: Message = new Message({
 *      content: 'Editing is restricted',
 *      showCloseIcon: true
 *   })
 *   msgObj.appendTo('#msg');
 * </script>
 * ```
 *
 */
let Message = class Message extends Component {
    /**
     * Constructor for creating the Message component widget.
     *
     * @param {MessageModel}options - Specifies the Message component interface.
     * @param {HTMLElement}element - Specifies the target element.
     */
    constructor(options, element) {
        super(options, element);
        this.initialRender = true;
    }
    /**
     * Gets the Message component module name.
     *
     * @returns {string} - Returns the string.
     * @private
     */
    getModuleName() {
        return 'message';
    }
    /**
     * Get the persisted state properties of the Message component.
     *
     * @returns {string} - Returns the string.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * Method to initialize the variables for the Message component.
     *
     * @returns {void}
     * @private
     */
    preRender() {
        const localeText = { close: 'Close' };
        this.l10n = new L10n('message', localeText, this.locale);
    }
    /**
     * Method to initialize the Message component rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        this.innerContent = this.element.innerHTML;
        this.element.innerHTML = '';
        this.msgElement = this.createElement('div', { className: 'e-msg-content-wrap' });
        this.initialize();
        this.wireEvents();
        this.renderComplete();
        this.renderReactTemplates();
        this.initialRender = false;
    }
    initialize() {
        this.element.setAttribute('role', 'alert');
        this.setCssClass();
        this.setIcon();
        this.setContent();
        this.setCloseIcon();
        this.setSeverity();
        this.setVariant();
        this.setVisible();
        if (this.enableRtl) {
            this.element.classList.add(RTL$1);
        }
    }
    setIcon() {
        if (this.showIcon) {
            this.iconElement = this.createElement('span', { className: MSG_ICON });
            if (this.element.classList.contains(MSG_CONTENT_CENTER)) {
                this.msgElement.appendChild(this.iconElement);
            }
            else {
                this.element.appendChild(this.iconElement);
            }
        }
    }
    setCloseIcon() {
        if (this.showCloseIcon) {
            this.closeIcon = this.createElement('button', { attrs: { type: 'button', class: MSG_CLOSE_ICON } });
            this.element.appendChild(this.closeIcon);
            this.setTitle();
        }
    }
    setTitle() {
        this.l10n.setLocale(this.locale);
        const closeIconTitle = this.l10n.getConstant('close');
        this.closeIcon.setAttribute('title', closeIconTitle);
        this.closeIcon.setAttribute('aria-label', closeIconTitle);
    }
    setContent() {
        this.txtElement = this.createElement('div', { className: MSG_CONTENT });
        if (this.element.classList.contains(MSG_CONTENT_CENTER)) {
            this.msgElement.appendChild(this.txtElement);
            this.element.appendChild(this.msgElement);
        }
        else {
            this.element.appendChild(this.txtElement);
        }
        this.setTemplate();
    }
    setTemplate() {
        let templateFn;
        if (isNullOrUndefined(this.content) || this.content === '') {
            this.txtElement.innerHTML = this.innerContent;
        }
        else if (!isNullOrUndefined(this.content) && this.content !== '') {
            if ((typeof this.content === 'string') || (typeof this.content !== 'string')) {
                // eslint-disable-next-line
                if (this.isVue || typeof this.content !== 'string') {
                    templateFn = compile(this.content);
                    if (!isNullOrUndefined(templateFn)) {
                        let tempArr = templateFn({}, this, 'content', this.element.id + 'content', true);
                        if (tempArr) {
                            tempArr = Array.prototype.slice.call(tempArr);
                            append(tempArr, this.txtElement);
                            this.renderReactTemplates();
                        }
                    }
                }
                else {
                    this.txtElement.innerHTML = this.content;
                }
            }
        }
    }
    setSeverity() {
        const classList = [SUCCESS, WARNING, INFO, ERROR];
        removeClass([this.element], classList);
        if (this.severity === 'Success') {
            addClass([this.element], SUCCESS);
        }
        else if (this.severity === 'Warning') {
            addClass([this.element], WARNING);
        }
        else if (this.severity === 'Error') {
            addClass([this.element], ERROR);
        }
        else if (this.severity === 'Info') {
            addClass([this.element], INFO);
        }
    }
    setVariant() {
        const classList = [FILLED, OUTLINED];
        removeClass([this.element], classList);
        if (this.variant === 'Outlined') {
            addClass([this.element], OUTLINED);
        }
        else if (this.variant === 'Filled') {
            addClass([this.element], FILLED);
        }
    }
    setCssClass(oldCssClass) {
        if (oldCssClass) {
            removeClass([this.element], oldCssClass.split(' '));
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    }
    setVisible() {
        if (!this.visible) {
            addClass([this.element], HIDE);
            if (!this.initialRender) {
                this.trigger('closed', { event: event, isInteracted: false, element: this.element });
            }
        }
        else {
            removeClass([this.element], HIDE);
        }
    }
    clickHandler(event) {
        this.closeMessage(event);
    }
    keyboardHandler(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.closeMessage(event);
        }
    }
    closeMessage(event) {
        addClass([this.element], HIDE);
        this.setProperties({ visible: false }, true);
        const eventArgs = { event: event, isInteracted: true, element: this.element };
        this.trigger('closed', eventArgs);
    }
    wireEvents() {
        if (this.showCloseIcon) {
            EventHandler.add(this.closeIcon, 'click', this.clickHandler, this);
            EventHandler.add(this.closeIcon, 'keydown', this.keyboardHandler, this);
        }
    }
    unWireEvents() {
        if (this.showCloseIcon) {
            EventHandler.remove(this.closeIcon, 'click', this.clickHandler);
            EventHandler.remove(this.closeIcon, 'keydown', this.keyboardHandler);
        }
    }
    /**
     * Method to handle the dynamic changes of the Message component properties.
     *
     * @param {MessageModel} newProp - Specifies the new property.
     * @param {MessageModel} oldProp - Specifies the old property.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'cssClass':
                    this.setCssClass(oldProp.cssClass);
                    break;
                case 'content':
                    this.txtElement.innerHTML = '';
                    this.setTemplate();
                    break;
                case 'enableRtl':
                    if (!this.enableRtl) {
                        this.element.classList.remove(RTL$1);
                    }
                    else {
                        this.element.classList.add(RTL$1);
                    }
                    break;
                case 'locale':
                    if (this.showCloseIcon) {
                        this.setTitle();
                    }
                    break;
                case 'showIcon':
                    if (!this.showIcon && this.element.getElementsByClassName(MSG_ICON).length > 0) {
                        detach(this.iconElement);
                    }
                    if (this.showIcon) {
                        this.iconElement = this.createElement('span', { className: MSG_ICON });
                        this.element.insertBefore(this.iconElement, this.txtElement);
                    }
                    break;
                case 'showCloseIcon':
                    if (!this.showCloseIcon && !isNullOrUndefined(this.closeIcon)) {
                        this.unWireEvents();
                        detach(this.closeIcon);
                    }
                    else {
                        this.setCloseIcon();
                        this.wireEvents();
                    }
                    break;
                case 'severity':
                    this.setSeverity();
                    break;
                case 'variant':
                    this.setVariant();
                    break;
                case 'visible':
                    this.setVisible();
                    break;
            }
        }
    }
    /**
     * Method to destroy the Message component. It removes the component from the DOM and detaches all its bound events. It also removes the attributes and classes of the component.
     *
     * @returns {void}
     */
    destroy() {
        const cssClass = isNullOrUndefined(this.cssClass) ? [''] : this.cssClass.split(' ');
        const className = [SUCCESS, WARNING, INFO, ERROR, RTL$1, HIDE, OUTLINED, FILLED];
        const classList = (cssClass.length === 1 && cssClass[0] === '') ? className : className.concat(cssClass);
        removeClass([this.element], classList);
        this.element.removeAttribute('role');
        this.unWireEvents();
        if (!isNullOrUndefined(this.iconElement)) {
            detach(this.iconElement);
        }
        detach(this.txtElement);
        if (!isNullOrUndefined(this.closeIcon)) {
            detach(this.closeIcon);
        }
        super.destroy();
    }
};
__decorate$1([
    Property(null)
], Message.prototype, "content", void 0);
__decorate$1([
    Property('')
], Message.prototype, "cssClass", void 0);
__decorate$1([
    Property(true)
], Message.prototype, "showIcon", void 0);
__decorate$1([
    Property(false)
], Message.prototype, "showCloseIcon", void 0);
__decorate$1([
    Property('Normal')
], Message.prototype, "severity", void 0);
__decorate$1([
    Property('Text')
], Message.prototype, "variant", void 0);
__decorate$1([
    Property(true)
], Message.prototype, "visible", void 0);
__decorate$1([
    Event()
], Message.prototype, "created", void 0);
__decorate$1([
    Event()
], Message.prototype, "destroyed", void 0);
__decorate$1([
    Event()
], Message.prototype, "closed", void 0);
Message = __decorate$1([
    NotifyPropertyChanges
], Message);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const cssClassName = {
    TEXTSHAPE: 'e-skeleton-text',
    CIRCLESHAPE: 'e-skeleton-circle',
    SQUARESHAPE: 'e-skeleton-square',
    RECTANGLESHAPE: 'e-skeleton-rectangle',
    WAVEEFFECT: 'e-shimmer-wave',
    PULSEEFFECT: 'e-shimmer-pulse',
    FADEEFFECT: 'e-shimmer-fade',
    VISIBLENONE: 'e-visible-none'
};
/**
 * Defines the shape of Skeleton.
 */
var SkeletonType;
(function (SkeletonType) {
    /**
     * Defines the skeleton shape as text.
     */
    SkeletonType["Text"] = "Text";
    /**
     * Defines the skeleton shape as circle.
     */
    SkeletonType["Circle"] = "Circle";
    /**
     * Defines the skeleton shape as square.
     */
    SkeletonType["Square"] = "Square";
    /**
     * Defines the skeleton shape as rectangle.
     */
    SkeletonType["Rectangle"] = "Rectangle";
})(SkeletonType || (SkeletonType = {}));
/**
 * Defines the animation effect of Skeleton.
 */
var ShimmerEffect;
(function (ShimmerEffect) {
    /**
     * Defines the animation as shimmer wave effect.
     */
    ShimmerEffect["Wave"] = "Wave";
    /**
     * Defines the animation as fade effect.
     */
    ShimmerEffect["Fade"] = "Fade";
    /**
     * Defines the animation as pulse effect.
     */
    ShimmerEffect["Pulse"] = "Pulse";
    /**
     * Defines the animation as no effect.
     */
    ShimmerEffect["None"] = "None";
})(ShimmerEffect || (ShimmerEffect = {}));
/**
 * The Shimmer is a placeholder that animates a shimmer effect to let users know that the page’s content is loading at the moment.
 * In other terms, it simulates the layout of page content while loading the actual content.
 * ```html
 * <div id="skeletonCircle"></div>
 * ```
 * ```typescript
 * <script>
 * var skeletonObj = new Skeleton({ shape: 'Circle', width: "2rem" });
 * skeletonObj.appendTo("#skeletonCircle");
 * </script>
 * ```
 */
let Skeleton = class Skeleton extends Component {
    /**
     * Constructor for creating Skeleton component.
     *
     * @param {SkeletonModel} options - Defines the model of Skeleton class.
     * @param {HTMLElement} element - Defines the target HTML element.
     */
    constructor(options, element) {
        super(options, element);
    }
    /**
     * Get component module name.
     *
     * @returns {string} - Module name
     * @private
     */
    getModuleName() {
        return 'skeleton';
    }
    getPersistData() {
        return this.addOnPersist([]);
    }
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.updateCssClass();
        attributes(this.element, { role: 'alert', 'aria-busy': 'true', 'aria-live': 'polite', 'aria-label': this.label });
    }
    /**
     * Method for initialize the component rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        this.initialize();
    }
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'width':
                case 'height':
                    this.updateDimension();
                    break;
                case 'shape':
                    this.updateShape();
                    break;
                case 'shimmerEffect':
                    this.updateEffect();
                    break;
                case 'visible':
                    this.updateVisibility();
                    break;
                case 'label':
                    this.element.setAttribute('aria-label', this.label);
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    this.updateCssClass();
                    break;
            }
        }
    }
    /**
     * Method to destroys the Skeleton component.
     *
     * @returns {void}
     */
    destroy() {
        super.destroy();
        const attrs = ['role', 'aria-live', 'aria-busy', 'aria-label'];
        let cssClass = [];
        if (this.cssClass) {
            cssClass = cssClass.concat(this.cssClass.split(' '));
        }
        for (let i = 0; i < attrs.length; i++) {
            this.element.removeAttribute(attrs[parseInt(i.toString(), 10)]);
        }
        cssClass = cssClass.concat(this.element.classList.value.match(/(e-skeleton-[^\s]+)/g) || []);
        cssClass = cssClass.concat(this.element.classList.value.match(/(e-shimmer-[^\s]+)/g) || []);
        removeClass([this.element], cssClass);
    }
    initialize() {
        this.updateShape();
        this.updateEffect();
        this.updateVisibility();
    }
    updateShape() {
        if (!(isNullOrUndefined(this.shape))) {
            const shapeCss = cssClassName[this.shape.toUpperCase() + 'SHAPE'];
            const removeCss = (this.element.classList.value.match(/(e-skeleton-[^\s]+)/g) || []);
            this.updateDimension();
            if (removeCss) {
                removeClass([this.element], removeCss);
            }
            addClass([this.element], [shapeCss]);
        }
    }
    updateDimension() {
        const width = (!this.width && (['Text', 'Rectangle'].indexOf(this.shape) > -1)) ? '100%' : formatUnit(this.width);
        const height = ['Circle', 'Square'].indexOf(this.shape) > -1 ? width : formatUnit(this.height);
        this.element.style.width = width;
        this.element.style.height = height;
    }
    updateEffect() {
        const removeCss = (this.element.classList.value.match(/(e-shimmer-[^\s]+)/g) || []);
        if (removeCss) {
            removeClass([this.element], removeCss);
        }
        if (!(isNullOrUndefined(this.shimmerEffect))) {
            addClass([this.element], [cssClassName[this.shimmerEffect.toUpperCase() + 'EFFECT']]);
        }
    }
    updateVisibility() {
        this.element.classList[this.visible ? 'remove' : 'add'](cssClassName.VISIBLENONE);
    }
    updateCssClass() {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    }
};
__decorate$2([
    Property('')
], Skeleton.prototype, "width", void 0);
__decorate$2([
    Property('')
], Skeleton.prototype, "height", void 0);
__decorate$2([
    Property(true)
], Skeleton.prototype, "visible", void 0);
__decorate$2([
    Property('Text')
], Skeleton.prototype, "shape", void 0);
__decorate$2([
    Property('Wave')
], Skeleton.prototype, "shimmerEffect", void 0);
__decorate$2([
    Property('Loading...')
], Skeleton.prototype, "label", void 0);
__decorate$2([
    Property('')
], Skeleton.prototype, "cssClass", void 0);
Skeleton = __decorate$2([
    NotifyPropertyChanges
], Skeleton);

export { ButtonModelProps, Message, Severity, ShimmerEffect, Skeleton, SkeletonType, Toast, ToastAnimationSettings, ToastAnimations, ToastPosition, ToastUtility, Variant };
//# sourceMappingURL=ej2-notifications.es2015.js.map
