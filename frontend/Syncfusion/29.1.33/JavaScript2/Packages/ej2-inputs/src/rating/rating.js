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
import { addClass, Event, attributes, compile, Component, EventHandler, getUniqueID, select, Browser, append } from '@syncfusion/ej2-base';
import { isNullOrUndefined, KeyboardEvents, NotifyPropertyChanges, Property, remove, removeClass, initializeCSPTemplate, closest } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
var ICONCSS = 'e-rating-icon e-icons e-star-filled';
var ITEMLIST = 'e-rating-item-list';
var ITEMCONTAINER = 'e-rating-item-container';
var SELECTED = 'e-rating-selected';
var INTERMEDIATE = 'e-rating-intermediate';
var LABEL = 'e-rating-label';
var RESET = 'e-icons e-reset';
var HIDDEN = 'e-rating-hidden';
var DISABLED = 'e-disabled';
var READONLY = 'e-rating-readonly';
var RTL = 'e-rtl';
var ANIMATION = 'e-rating-animation';
var FULLTEMPLATE = 'e-rating-full';
var EMPTYTEMPLATE = 'e-rating-empty';
var SELECTEDVALUE = 'e-selected-value';
var RATINGVALUE = '--rating-value';
/**
 * Defines where to position the label in rating
 */
export var LabelPosition;
(function (LabelPosition) {
    /**
     * The label is positioned at the top center of the rating component.
     */
    LabelPosition["Top"] = "Top";
    /**
     * The label is positioned at the bottom center of the rating component.
     */
    LabelPosition["Bottom"] = "Bottom";
    /**
     * The label is positioned at the left side of the rating component.
     */
    LabelPosition["Left"] = "Left";
    /**
     * The label is positioned at the right side of the rating component.
     */
    LabelPosition["Right"] = "Right";
})(LabelPosition || (LabelPosition = {}));
/**
 * Defines the precision type of the rating.
 * It is used to component the granularity of the rating, allowing users to provide ratings with varying levels of precision.
 */
export var PrecisionType;
(function (PrecisionType) {
    /**
     * The rating is increased in whole number increments.
     */
    PrecisionType["Full"] = "Full";
    /**
     * The rating is increased in increments of 0.5 (half).
     */
    PrecisionType["Half"] = "Half";
    /**
     * The rating is increased in increments of 0.25 (quarter).
     */
    PrecisionType["Quarter"] = "Quarter";
    /**
     * The rating is increased in increments of 0.1.
     */
    PrecisionType["Exact"] = "Exact";
})(PrecisionType || (PrecisionType = {}));
/**
 * The Rating component allows the user to rate something by clicking on a set of symbols on a numeric scale.
 * This allows users to provide feedback or ratings for products, services, or content.
 *
 * ```html
 * <input id="rating">
 * ```
 * ```typescript
 * <script>
 *   let ratingObj: Rating = new Rating();
 *   ratingObj.appendTo('#rating');
 * </script>
 * ```
 */
var Rating = /** @class */ (function (_super) {
    __extends(Rating, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {RatingModel} options - Specifies the rating model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    function Rating(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.itemElements = [];
        return _this;
    }
    Rating.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.keyConfigs = {
            downarrow: 'downarrow',
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            uparrow: 'uparrow',
            space: 'space'
        };
        this.tooltipOpen = false;
        this.isTouchSelected = false;
        if (closest(this.element, 'form') && this.element.getAttribute('value')) {
            this.setProperties({ value: this.element.getAttribute('value') }, true);
        }
    };
    Rating.prototype.render = function () {
        this.initialize();
        this.updateMinValue();
        this.updateTemplateFunction();
        this.triggerChange(null, this.value, false, true);
        this.renderItems();
        this.displayLabel();
    };
    Rating.prototype.initialize = function () {
        this.wrapper = this.createElement('div', { className: 'e-' + this.getModuleName() + '-container ' });
        this.element.parentNode.insertBefore(this.wrapper, this.element);
        this.wrapper.appendChild(this.element);
        if ((this.element.getAttribute('name') == null)) {
            this.element.setAttribute('name', this.element.id);
        }
        attributes(this.element, { 'aria-label': 'rating' });
        this.renderItemList();
        this.updateReset();
        if (this.readOnly) {
            this.wrapper.classList.add(READONLY);
        }
        if (!this.visible) {
            this.wrapper.classList.add(HIDDEN);
        }
        if (this.enableRtl) {
            this.wrapper.classList.add(RTL);
        }
        if (this.enableAnimation) {
            this.wrapper.classList.add(ANIMATION);
        }
        if (this.cssClass) {
            addClass([this.wrapper], this.cssClass.split(' '));
        }
        this.updateTooltip();
        this.wireKeyboardEvent();
        this.updateDisabled();
    };
    Rating.prototype.updateDisabled = function () {
        this.wrapper.classList[this.disabled ? 'add' : 'remove'](DISABLED);
        attributes(this.ratingItemList, { 'tabindex': (this.disabled) ? '-1' : '0' });
        this.updateResetButton();
    };
    Rating.prototype.updateResetButton = function () {
        if (this.allowReset) {
            if (this.resetElement) {
                this.resetElement.blur();
            }
            var isDisabled = (this.value <= this.min) || this.disabled;
            this.resetElement.classList[isDisabled ? 'add' : 'remove'](DISABLED);
            attributes(this.resetElement, { 'tabindex': (isDisabled ? '-1' : '0'), 'aria-hidden': isDisabled.toString() });
        }
    };
    Rating.prototype.renderItemList = function () {
        var _this = this;
        this.ratingItemList = this.createElement('div', {
            className: ITEMLIST,
            id: this.element.id + '_item-list'
        });
        attributes(this.ratingItemList, { 'aria-label': 'rating', 'role': 'slider' });
        this.wrapper.appendChild(this.ratingItemList);
        EventHandler.add(this.ratingItemList, 'touchmove', function (e) { return _this.touchMoveHandler(e); }, this);
        EventHandler.add(this.ratingItemList, Browser.touchEndEvent, this.touchEndHandler, this);
    };
    Rating.prototype.touchMoveHandler = function (e) {
        if (!this.isTouchSelected) {
            this.wrapper.classList.add('e-rating-touch');
            this.isTouchSelected = true;
        }
        this.wrapper.classList.add('e-touch-select');
        var rect = this.ratingItemList.getBoundingClientRect();
        var x = e.touches[0].clientX - rect.x;
        var currValue = (x / rect.width) * this.itemsCount;
        currValue = (this.enableRtl) ? (this.itemsCount - currValue) : currValue;
        currValue = currValue < this.min ? this.min : currValue > this.itemsCount ? this.itemsCount : currValue;
        currValue = this.validateValue(currValue);
        var element = currValue === 0 ? null : this.itemElements[parseInt((Math.ceil(currValue) - 1).toString(), 10)];
        if (currValue === this.currentValue) {
            if (this.showTooltip && element) {
                this.openRatingTooltip(element, false);
            }
            return;
        }
        var previousValue = this.currentValue;
        this.triggerChange(e, currValue);
        this.updateCurrentValue(currValue);
        if (this.showTooltip) {
            if (element) {
                if (Math.ceil(currValue) !== Math.ceil(previousValue)) {
                    this.closeRatingTooltip();
                }
                this.openRatingTooltip(element, true);
            }
            else {
                this.closeRatingTooltip();
            }
        }
    };
    Rating.prototype.touchEndHandler = function () {
        this.closeRatingTooltip();
        this.wrapper.classList.remove('e-touch-select');
    };
    Rating.prototype.updateTemplateFunction = function () {
        this.emptyTemplateFunction = this.emptyTemplate ? this.getTemplateString(this.emptyTemplate) : null;
        this.fullTemplateFunction = this.fullTemplate ? this.getTemplateString(this.fullTemplate) : null;
    };
    Rating.prototype.renderItems = function () {
        var _this = this;
        for (var i = 0; i < this.itemsCount; i++) {
            var ratingItemContainer = this.createElement('span', { className: ITEMCONTAINER });
            var spanItem = this.createElement('span', { className: 'e-rating-item' });
            var ratingValue = this.getRatingValue(this.value, i);
            this.renderItemContent(spanItem, ratingValue, i, false);
            ratingItemContainer.appendChild(spanItem);
            this.wireItemsEvents(ratingItemContainer, i + 1);
            this.itemElements.push(ratingItemContainer);
            var eventArgs = { element: ratingItemContainer, value: i + 1 };
            this.trigger('beforeItemRender', eventArgs, function (args) {
                _this.ratingItemList.appendChild(args.element);
            });
        }
        attributes(this.ratingItemList, { 'aria-valuemax': this.itemsCount.toString() });
        this.updateItemValue(false);
    };
    Rating.prototype.renderItemContent = function (spanEle, val, index, isrerender) {
        if (isrerender) {
            this.removeItemContent(spanEle);
        }
        if (this.fullTemplate && val === 1) {
            spanEle.classList.add(FULLTEMPLATE);
            append(this.fullTemplateFunction({ index: index, ratingValue: val }, this, 'ratingFullTemplate', (this.element.id + 'fullTemplate'), this.isStringTemplate), spanEle);
        }
        else if (this.emptyTemplate) {
            spanEle.classList.add(EMPTYTEMPLATE);
            append(this.emptyTemplateFunction({ index: index, ratingValue: val }, this, 'ratingEmptyTemplate', (this.element.id + 'emptyTemplate'), this.isStringTemplate), spanEle);
        }
        else {
            addClass([spanEle], ICONCSS.split(' '));
        }
    };
    Rating.prototype.removeItemContent = function (spanEle) {
        spanEle.classList.remove(FULLTEMPLATE, EMPTYTEMPLATE);
        removeClass([spanEle], ICONCSS.split(' '));
        if (spanEle.firstChild) {
            spanEle.innerHTML = '';
        }
    };
    Rating.prototype.updateTooltip = function () {
        if (this.showTooltip) {
            this.tooltipObj = new Tooltip({
                target: '.e-rating-item-container', windowCollision: true,
                opensOn: 'Custom', cssClass: this.cssClass ? ('e-rating-tooltip ' + this.cssClass) : 'e-rating-tooltip'
            });
            this.tooltipObj.appendTo(this.ratingItemList);
        }
        else {
            if (!isNullOrUndefined(this.tooltipObj)) {
                this.tooltipObj.destroy();
                this.tooltipObj = null;
            }
        }
    };
    Rating.prototype.updateMinValue = function () {
        this.setProperties({ min: this.validateValue(this.min) }, true);
        if (this.min > 0 && this.value < this.min) {
            this.triggerChange(null, this.min, false);
        }
        attributes(this.ratingItemList, { 'aria-valuemin': this.min.toString() });
    };
    Rating.prototype.validateValue = function (currentValue) {
        if (currentValue > this.itemsCount) {
            currentValue = this.itemsCount;
        }
        else if (currentValue < 0) {
            currentValue = 0;
        }
        else {
            currentValue = ((this.precision === PrecisionType.Full) || this.enableSingleSelection) ? Math.round(currentValue) :
                (this.precision === PrecisionType.Half) ? (Math.round(currentValue * 2) / 2) :
                    (this.precision === PrecisionType.Quarter) ? (Math.round(currentValue * 4) / 4) : (Math.round(currentValue * 10) / 10);
        }
        return currentValue;
    };
    Rating.prototype.getRatingValue = function (value, i) {
        return (this.enableSingleSelection) ? (((value > i) && (value <= i + 1)) ? 1 : 0) :
            (value >= i + 1) ? 1 : ((value < i) ? 0 : (value - i));
    };
    Rating.prototype.updateItemValue = function (isUpdate) {
        if (isUpdate === void 0) { isUpdate = true; }
        if (isUpdate && this.isReact) {
            this.clearTemplate(['ratingEmptyTemplate', 'ratingFullTemplate']);
        }
        for (var i = 0; i < this.itemsCount; i++) {
            var itemElement = this.itemElements[parseInt(i.toString(), 10)];
            itemElement.classList.remove(SELECTED, INTERMEDIATE, SELECTEDVALUE);
            var ratingValue = this.getRatingValue(this.currentValue, i);
            if (ratingValue === 1) {
                itemElement.classList.add(SELECTED);
            }
            else if (ratingValue > 0) {
                itemElement.classList.add(INTERMEDIATE);
            }
            else if ((this.precision === PrecisionType.Full) && (i + 1 <= this.value) && (!this.enableSingleSelection)) {
                itemElement.classList.add(SELECTEDVALUE);
            }
            if (isUpdate) {
                this.updateItemContent(ratingValue, i);
            }
            itemElement.style.setProperty(RATINGVALUE, (ratingValue * 100) + '%');
            itemElement.classList[((this.value === 0) && (i === 0)) || (this.value === i + 1) || ((ratingValue > 0) && (ratingValue < 1)) ? 'add' : 'remove']('e-rating-focus');
        }
        if (isUpdate) {
            this.renderReactTemplates();
        }
        this.updateResetButton();
        attributes(this.ratingItemList, { 'aria-valuenow': this.currentValue.toString() });
        attributes(this.element, { 'value': this.value.toString() });
    };
    Rating.prototype.updateItemContent = function (ratingValue, index) {
        if (!this.fullTemplate && !this.emptyTemplate) {
            return;
        }
        var spanEle = this.itemElements[parseInt(index.toString(), 10)].querySelector('.e-rating-item');
        if (this.fullTemplate && ratingValue === 1) {
            if (!this.isReact && spanEle.classList.contains(FULLTEMPLATE)) {
                return;
            }
            this.removeItemContent(spanEle);
            spanEle.classList.add(FULLTEMPLATE);
            append(this.fullTemplateFunction({ ratingValue: ratingValue, index: index }, this, 'ratingFullTemplate', (this.element.id + 'fullTemplate' + index), this.isStringTemplate), spanEle);
        }
        else if (this.emptyTemplate) {
            if (!this.isReact && spanEle.classList.contains(EMPTYTEMPLATE)) {
                return;
            }
            this.removeItemContent(spanEle);
            spanEle.classList.add(EMPTYTEMPLATE);
            append(this.emptyTemplateFunction({ ratingValue: ratingValue, index: index }, this, 'ratingEmptyTemplate', (this.element.id + 'emptyTemplate' + index), this.isStringTemplate), spanEle);
        }
        else {
            this.removeItemContent(spanEle);
            addClass([spanEle], ICONCSS.split(' '));
        }
    };
    Rating.prototype.updateTooltipContent = function (isChange) {
        var _this = this;
        if (this.showTooltip) {
            if (this.isReact) {
                this.clearTemplate(['ratingTooltipTemplate']);
            }
            var content_1;
            if (this.tooltipTemplate) {
                content_1 = this.createElement('span', { className: 'e-rating-tooltip-content' });
                var templateFunction = this.getTemplateString(this.tooltipTemplate);
                append(templateFunction({ value: this.currentValue }, this, 'ratingTooltipTemplate', (this.element.id + 'tooltipTemplate'), this.isStringTemplate), content_1);
                this.tooltipObj.setProperties({ content: content_1 }, isChange);
                if (this.isAngular) {
                    setTimeout(function () {
                        var ratingSpan = _this.ratingItemList.querySelectorAll('.' + ITEMCONTAINER + '.' + SELECTED);
                        _this.tooltipObj.refresh(ratingSpan[ratingSpan.length - 1]);
                    });
                }
            }
            else {
                content_1 = this.currentValue.toString();
                this.tooltipObj.setProperties({ content: initializeCSPTemplate(function () { return content_1; }) }, isChange);
            }
            this.renderReactTemplates();
        }
    };
    Rating.prototype.getTemplateString = function (template) {
        var stringContent = '';
        try {
            if (typeof template !== 'function') {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    stringContent = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                }
                else {
                    stringContent = template;
                }
            }
            else {
                stringContent = template;
            }
        }
        catch (e) {
            stringContent = template;
        }
        return compile(stringContent);
    };
    Rating.prototype.displayLabel = function () {
        if (this.showLabel) {
            this.spanLabel = this.createElement('span', { className: LABEL });
            this.updateLabel();
            this.updateLabelPosition();
        }
        else {
            if (this.wrapper.contains(this.spanLabel)) {
                remove(this.spanLabel);
                this.spanLabel = null;
            }
        }
    };
    Rating.prototype.updateLabel = function () {
        if (this.showLabel) {
            if (this.labelTemplate) {
                if (this.isReact) {
                    this.clearTemplate(['ratingLabelTemplate']);
                }
                if (this.spanLabel.firstChild) {
                    this.spanLabel.innerHTML = '';
                }
                var templateFunction = this.getTemplateString(this.labelTemplate);
                append(templateFunction({ value: this.currentValue }, this, 'ratingLabelTemplate', (this.element.id + 'labelTemplate'), this.isStringTemplate), this.spanLabel);
                this.renderReactTemplates();
            }
            else {
                this.spanLabel.textContent = this.currentValue + ' / ' + this.itemsCount;
            }
        }
    };
    Rating.prototype.updateReset = function () {
        if (this.allowReset) {
            this.resetElement = this.createElement('span', {
                className: RESET,
                attrs: { 'aria-label': 'resetbutton', 'role': 'button' }
            });
            this.updateResetButton();
            EventHandler.add(this.resetElement, 'click', this.resetClicked, this);
            this.wrapper.insertBefore(this.resetElement, this.ratingItemList);
        }
        else {
            if (this.wrapper.contains(this.resetElement)) {
                remove(this.resetElement);
                this.resetElement = null;
            }
        }
    };
    Rating.prototype.updateLabelPosition = function () {
        this.clearLabelPosition();
        this.spanLabel.classList.add('e-label-' + this.labelPosition.toLowerCase());
        if (this.labelPosition === 'Left' || this.labelPosition === 'Top') {
            this.wrapper.firstChild.after(this.spanLabel);
        }
        else {
            this.wrapper.appendChild(this.spanLabel);
        }
    };
    Rating.prototype.clearLabelPosition = function () {
        var removeCss = this.spanLabel.classList.value.match(/(e-label-[top|bottom|right|left]+)/g);
        if (removeCss) {
            removeClass([this.spanLabel], removeCss);
        }
    };
    Rating.prototype.wireItemsEvents = function (itemElement, index) {
        var _this = this;
        EventHandler.add(itemElement, 'click', function (e) { return _this.clickHandler(e); }, this);
        EventHandler.add(itemElement, 'mousemove', function (e) { return _this.mouseMoveHandler(index, e); }, this);
        EventHandler.add(itemElement, 'mouseleave', this.mouseLeaveHandler, this);
    };
    Rating.prototype.clickHandler = function (e) {
        this.currentValue = (this.min > 0 && this.currentValue < this.min) ? this.min : this.currentValue;
        this.triggerChange(e, this.currentValue);
        this.updateItemValue();
        this.updateLabel();
        this.updateResetButton();
    };
    Rating.prototype.updateValueChange = function (e, val, isInteracted) {
        if (isInteracted === void 0) { isInteracted = true; }
        this.triggerChange(e, val, isInteracted);
        this.updateItemValue();
        this.updateLabel();
    };
    Rating.prototype.triggerChange = function (e, val, isInteracted, isInitial) {
        if (isInteracted === void 0) { isInteracted = true; }
        if (isInitial === void 0) { isInitial = false; }
        var ratingObj = null || this;
        val = this.validateValue(val);
        this.currentValue = val;
        if (this.currentValue === this.value) {
            return;
        }
        var eventArgs = { event: e, isInteracted: isInteracted, value: val, previousValue: this.value };
        this.setProperties({ value: val }, true);
        if (this.isAngular && !isInitial) {
            ratingObj.localChange({ value: val });
        }
        if (!isInitial) {
            this.trigger('valueChanged', eventArgs);
        }
    };
    Rating.prototype.mouseMoveHandler = function (index, e) {
        if (this.isTouchSelected) {
            this.wrapper.classList.remove('e-rating-touch');
            this.isTouchSelected = false;
        }
        var currValue = this.calculateCurrentValue(index, e);
        currValue = this.validateValue(currValue);
        var element = this.itemElements[parseInt((index - 1).toString(), 10)];
        if (currValue === this.currentValue) {
            this.openRatingTooltip(element, false);
            return;
        }
        this.updateCurrentValue(currValue);
        this.openRatingTooltip(element, true);
        var eventArgs = { element: element, event: e, value: currValue };
        this.trigger('onItemHover', eventArgs);
    };
    Rating.prototype.openRatingTooltip = function (element, isChange) {
        if (this.showTooltip) {
            if (!this.tooltipOpen) {
                this.updateTooltipContent(false);
                this.tooltipObj.open(element);
                this.tooltipOpen = true;
            }
            else if (isChange) {
                this.updateTooltipContent(true);
                this.tooltipObj.refresh(element);
            }
        }
    };
    Rating.prototype.closeRatingTooltip = function () {
        if (this.tooltipOpen) {
            this.tooltipObj.close();
            this.tooltipOpen = false;
        }
    };
    Rating.prototype.updateCurrentValue = function (currValue) {
        this.currentValue = currValue;
        this.updateItemValue();
        this.updateLabel();
    };
    Rating.prototype.mouseLeaveHandler = function () {
        this.closeRatingTooltip();
        this.updateCurrentValue(this.value);
    };
    Rating.prototype.calculateCurrentValue = function (index, args) {
        var currentValue = index;
        if (!(this.enableSingleSelection || (this.precision === PrecisionType.Full))) {
            currentValue = args.offsetX / this.itemElements[index - 1].clientWidth;
            currentValue = (this.enableRtl) ? (1 - currentValue) : currentValue;
            if (this.precision === PrecisionType.Quarter) {
                currentValue = currentValue <= 0.25 ? 0.25 : currentValue <= 0.5 ? 0.5 : currentValue < 0.75 ? 0.75 : 1.0;
            }
            else if (this.precision === PrecisionType.Half) {
                currentValue = currentValue <= 0.5 ? 0.5 : 1;
            }
            currentValue = currentValue + index - 1;
        }
        return currentValue;
    };
    /**
     * Reset’s the value to minimum.
     *
     * {% codeBlock src='rating/reset/index.md' %}{% endcodeBlock %}
     *
     * @returns {void}
     */
    Rating.prototype.reset = function () {
        this.resetClicked(null, false);
    };
    Rating.prototype.resetClicked = function (e, isInteracted) {
        if (isInteracted === void 0) { isInteracted = true; }
        this.updateValueChange(e, this.min, isInteracted);
        this.updateResetButton();
    };
    Rating.prototype.wireKeyboardEvent = function () {
        this.keyboardModuleRating = new KeyboardEvents(this.wrapper, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    Rating.prototype.keyActionHandler = function (e) {
        e.preventDefault();
        if (this.disabled || this.readOnly) {
            return;
        }
        if (e.target.classList.contains(ITEMLIST)) {
            switch (e.action) {
                case 'uparrow':
                    this.handleNavigation(e, true);
                    break;
                case 'downarrow':
                    this.handleNavigation(e, false);
                    break;
                case 'leftarrow':
                    this.handleNavigation(e, this.enableRtl);
                    break;
                case 'rightarrow':
                    this.handleNavigation(e, !this.enableRtl);
                    break;
            }
        }
        if (this.allowReset && e.target.classList.contains('e-reset')) {
            switch (e.action) {
                case 'space':
                    this.resetClicked(e);
                    break;
            }
        }
    };
    Rating.prototype.handleNavigation = function (e, isIncrease) {
        if ((!isIncrease && (this.value > this.min)) || (isIncrease && (this.value < this.itemsCount))) {
            var currentValue = (this.precision === PrecisionType.Full || this.enableSingleSelection) ? 1 :
                (this.precision === PrecisionType.Half) ? 0.5 : (this.precision === PrecisionType.Quarter) ? 0.25 :
                    Math.round(0.1 * 10) / 10;
            currentValue = isIncrease ? this.value + currentValue : this.value - currentValue;
            this.updateValueChange(e, (currentValue));
            this.updateResetButton();
        }
    };
    Rating.prototype.updateContent = function () {
        if (this.isReact) {
            this.clearTemplate(['ratingEmptyTemplate', 'ratingFullTemplate']);
        }
        for (var i = 0; i < this.itemsCount; i++) {
            var itemElement = this.itemElements[parseInt(i.toString(), 10)].firstElementChild;
            this.renderItemContent(itemElement, this.getRatingValue(this.value, i), i, true);
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    Rating.prototype.getModuleName = function () {
        return 'rating';
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Rating.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    Rating.prototype.removeItemElements = function () {
        for (var i = 0; i < this.itemElements.length; i++) {
            remove(this.itemElements[parseInt(i.toString(), 10)]);
        }
        this.itemElements = [];
    };
    /**
     * Destroys the Rating instance.
     *
     * @returns {void}
     */
    Rating.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        // unwires the events and detach the li elements
        this.removeItemElements();
        this.clearTemplate();
        if (this.spanLabel) {
            remove(this.spanLabel);
            this.spanLabel = null;
        }
        if (this.resetElement) {
            remove(this.resetElement);
            this.resetElement = null;
        }
        if (this.showTooltip) {
            this.tooltipObj.destroy();
            this.tooltipObj = null;
        }
        remove(this.ratingItemList);
        this.ratingItemList = null;
        this.wrapper.parentNode.insertBefore(this.element, this.wrapper);
        remove(this.wrapper);
        this.wrapper = null;
        this.keyboardModuleRating.destroy();
        this.keyboardModuleRating = null;
        ['value', 'aria-label', 'name'].forEach(function (attr) {
            _this.element.removeAttribute(attr);
        });
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {RatingModel} newProp - Specifies new properties
     * @param  {RatingModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Rating.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'value':
                    this.updateValueChange(null, (this.value > this.min) ? this.value : this.min, false);
                    break;
                case 'min':
                    this.updateMinValue();
                    this.updateItemValue();
                    this.updateLabel();
                    break;
                case 'showLabel':
                    this.displayLabel();
                    break;
                case 'visible':
                    this.wrapper.classList[!this.visible ? 'add' : 'remove'](HIDDEN);
                    break;
                case 'disabled':
                    this.updateDisabled();
                    break;
                case 'readOnly':
                    this.wrapper.classList[this.readOnly ? 'add' : 'remove'](READONLY);
                    break;
                case 'allowReset':
                    this.updateReset();
                    break;
                case 'enableRtl':
                    this.wrapper.classList[this.enableRtl ? 'add' : 'remove'](RTL);
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.wrapper], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.wrapper], newProp.cssClass.split(' '));
                    }
                    if (this.tooltipObj) {
                        this.tooltipObj.setProperties({ cssClass: this.cssClass ? ('e-rating-tooltip ' + this.cssClass) : 'e-rating-tooltip' });
                    }
                    break;
                case 'labelPosition':
                    this.updateLabelPosition();
                    break;
                case 'showTooltip':
                    this.updateTooltip();
                    break;
                case 'precision':
                    this.updateMinValue();
                    this.triggerChange(null, this.value, false);
                    this.updateItemValue();
                    this.updateLabel();
                    break;
                case 'enableSingleSelection':
                    //To validate the value against single selection and update the items, label + trigger change event if value changed
                    this.updateValueChange(null, this.currentValue, false);
                    break;
                case 'enableAnimation':
                    this.wrapper.classList[this.enableAnimation ? 'add' : 'remove'](ANIMATION);
                    break;
                case 'emptyTemplate':
                case 'fullTemplate':
                    this.updateTemplateFunction();
                    this.updateContent();
                    break;
                case 'labelTemplate':
                    this.updateLabel();
                    break;
                case 'itemsCount':
                    this.removeItemElements();
                    this.renderItems();
                    this.updateLabel();
                    break;
            }
        }
    };
    __decorate([
        Property(false)
    ], Rating.prototype, "allowReset", void 0);
    __decorate([
        Property('')
    ], Rating.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], Rating.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], Rating.prototype, "emptyTemplate", void 0);
    __decorate([
        Property(true)
    ], Rating.prototype, "enableAnimation", void 0);
    __decorate([
        Property(false)
    ], Rating.prototype, "enableSingleSelection", void 0);
    __decorate([
        Property('')
    ], Rating.prototype, "fullTemplate", void 0);
    __decorate([
        Property(5)
    ], Rating.prototype, "itemsCount", void 0);
    __decorate([
        Property(LabelPosition.Right)
    ], Rating.prototype, "labelPosition", void 0);
    __decorate([
        Property('')
    ], Rating.prototype, "labelTemplate", void 0);
    __decorate([
        Property(0.0)
    ], Rating.prototype, "min", void 0);
    __decorate([
        Property(PrecisionType.Full)
    ], Rating.prototype, "precision", void 0);
    __decorate([
        Property(false)
    ], Rating.prototype, "readOnly", void 0);
    __decorate([
        Property(false)
    ], Rating.prototype, "showLabel", void 0);
    __decorate([
        Property(true)
    ], Rating.prototype, "showTooltip", void 0);
    __decorate([
        Property('')
    ], Rating.prototype, "tooltipTemplate", void 0);
    __decorate([
        Property(0.0)
    ], Rating.prototype, "value", void 0);
    __decorate([
        Property(true)
    ], Rating.prototype, "visible", void 0);
    __decorate([
        Event()
    ], Rating.prototype, "beforeItemRender", void 0);
    __decorate([
        Event()
    ], Rating.prototype, "created", void 0);
    __decorate([
        Event()
    ], Rating.prototype, "onItemHover", void 0);
    __decorate([
        Event()
    ], Rating.prototype, "valueChanged", void 0);
    Rating = __decorate([
        NotifyPropertyChanges
    ], Rating);
    return Rating;
}(Component));
export { Rating };
