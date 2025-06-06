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
import { Component, ChildProperty, Collection, Event, NotifyPropertyChanges, Property, getUniqueID, attributes, select, compile, remove, removeClass, append, isNullOrUndefined } from '@syncfusion/ej2-base';
var ITEMLISTCONTAINER = 'e-timeline-items';
var ITEMCONTAINER = 'e-timeline-item';
var OPPOSITECONTENT = 'e-opposite-content';
var DOTCONTAINER = 'e-dot-item';
var DOTCONTENT = 'e-dot';
var CONTENT = 'e-content';
var ITEMCONNECTOR = 'e-connector';
var VERTICAL = 'e-vertical';
var HORIZONTAL = 'e-horizontal';
var TIMELINEREVERSE = 'e-timeline-reverse';
var RTL = 'e-rtl';
var DISABLED = 'e-item-disabled';
var TEMPLATE = 'e-item-template';
/**
 * Defines the orientation type of the Timeline.
 */
export var TimelineOrientation;
(function (TimelineOrientation) {
    /**
     * Items are displayed horizontally.
     */
    TimelineOrientation["Horizontal"] = "Horizontal";
    /**
     * Items are displayed vertically.
     */
    TimelineOrientation["Vertical"] = "Vertical";
})(TimelineOrientation || (TimelineOrientation = {}));
/**
 * Specifies the alignment of item content within the Timeline.
 */
export var TimelineAlign;
(function (TimelineAlign) {
    /**
     * Aligns item content to the top and opposite content to the bottom when the Timeline is in a horizontal orientation, or the content to the left and opposite content to the right when the Timeline is in a vertical orientation.
     */
    TimelineAlign["Before"] = "Before";
    /**
     * Aligns item content to the bottom and opposite content to the top when the Timeline is in a horizontal orientation, or the content to the right and opposite content to the left when the Timeline is in a vertical orientation.
     */
    TimelineAlign["After"] = "After";
    /**
     * Aligns item content alternatively, regardless of the Timeline's orientation.
     */
    TimelineAlign["Alternate"] = "Alternate";
    /**
     * Aligns item content in alternate reverse, regardless of the Timeline's orientation.
     */
    TimelineAlign["AlternateReverse"] = "AlternateReverse";
})(TimelineAlign || (TimelineAlign = {}));
/**
 * Specifies the items of the Timeline.
 */
var TimelineItem = /** @class */ (function (_super) {
    __extends(TimelineItem, _super);
    function TimelineItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], TimelineItem.prototype, "dotCss", void 0);
    __decorate([
        Property('')
    ], TimelineItem.prototype, "content", void 0);
    __decorate([
        Property('')
    ], TimelineItem.prototype, "oppositeContent", void 0);
    __decorate([
        Property(false)
    ], TimelineItem.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], TimelineItem.prototype, "cssClass", void 0);
    return TimelineItem;
}(ChildProperty));
export { TimelineItem };
/**
 * The Timeline component presents a series of events or activities in chronological order, allowing users to track the progression of time.
 *
 * ```html
 * <div id="timeline"></div>
 * ```
 * ```typescript
 * <script>
 *   let timelineObj: Timeline = new Timeline({items : [{}, {}, {}, {}, {}]});
 *   timelineObj.appendTo('#timeline');
 * </script>
 * ```
 */
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    /**
     * * Constructor for creating the Timeline component.
     *
     * @param {TimelineModel} options - Specifies the Timeline model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function Timeline(options, element) {
        return _super.call(this, options, element) || this;
    }
    Timeline.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    Timeline.prototype.getModuleName = function () {
        return 'timeline';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    Timeline.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    Timeline.prototype.render = function () {
        attributes(this.element, { 'role': 'navigation', 'aria-label': this.element.id });
        this.timelineListEle = this.createElement('ol', { className: ITEMLISTCONTAINER });
        this.updateOrientation();
        this.updateCssClass(this.cssClass);
        this.updateAlign();
        this.updateReverse();
        this.updateRtl();
        this.updateTemplateFunction();
        this.renderItems();
        this.element.appendChild(this.timelineListEle);
    };
    Timeline.prototype.updateOrientation = function () {
        if (!(isNullOrUndefined(this.orientation))) {
            var orientation_1 = this.orientation.toLowerCase();
            if (orientation_1 === 'horizontal' || orientation_1 === 'vertical') {
                this.element.classList.remove(HORIZONTAL, VERTICAL);
                this.element.classList.add('e-' + orientation_1);
            }
        }
    };
    Timeline.prototype.updateCssClass = function (addCss, removeCss) {
        if (removeCss === void 0) { removeCss = ''; }
        var _a, _b;
        var cssClasses;
        if (removeCss) {
            cssClasses = removeCss.trim().split(' ');
            (_a = this.element.classList).remove.apply(_a, cssClasses);
        }
        if (addCss) {
            cssClasses = addCss.trim().split(' ');
            (_b = this.element.classList).add.apply(_b, cssClasses);
        }
    };
    Timeline.prototype.updateRtl = function () {
        this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL);
    };
    Timeline.prototype.updateAlign = function () {
        if (!(isNullOrUndefined(this.align))) {
            var align = this.align.toLowerCase();
            if (align === 'before' || align === 'after' || align === 'alternate' || align === 'alternatereverse') {
                this.element.classList.remove('e-align-before', 'e-align-after', 'e-align-alternate', 'e-align-alternatereverse');
                this.element.classList.add('e-align-' + align);
            }
        }
    };
    Timeline.prototype.updateReverse = function () {
        this.element.classList[this.reverse ? 'add' : 'remove'](TIMELINEREVERSE);
    };
    Timeline.prototype.renderItems = function () {
        var _this = this;
        var _a;
        this.haveOneSidecontent();
        for (var index = 0; index < this.items.length; index++) {
            var item = this.items[parseInt(index.toString(), 10)];
            var timelineItem = this.createElement('li', { className: ITEMCONTAINER + ' ' + ITEMCONNECTOR });
            if (!this.template) {
                var oppositeTextEle = this.createElement('div', { className: OPPOSITECONTENT });
                if (item.oppositeContent) {
                    this.updateItemContent(false, item, index, oppositeTextEle);
                }
                timelineItem.appendChild(oppositeTextEle);
                var dotContainer = this.createElement('div', { className: DOTCONTAINER });
                var dotEleCss = item.dotCss ? DOTCONTENT + ' ' + item.dotCss.trim() : DOTCONTENT;
                var dotEle = this.createElement('div', { className: dotEleCss });
                dotContainer.appendChild(dotEle);
                timelineItem.appendChild(dotContainer);
                var contentEle = this.createElement('div', { className: CONTENT });
                if (item.content) {
                    this.updateItemContent(true, item, index, contentEle);
                }
                timelineItem.appendChild(contentEle);
                if (item.cssClass) {
                    (_a = timelineItem.classList).add.apply(_a, item.cssClass.trim().split(' '));
                }
                if (item.disabled) {
                    timelineItem.classList.add(DISABLED);
                }
            }
            else {
                this.renderItemContent(index, false, timelineItem);
            }
            var eventArgs = { element: timelineItem, index: index };
            this.trigger('beforeItemRender', eventArgs, function (args) { _this.timelineListEle.appendChild(args.element); });
        }
    };
    Timeline.prototype.haveOneSidecontent = function () {
        var haveContent = false;
        var haveOppContent = false;
        for (var index = 0; index < this.items.length; index++) {
            var item = this.items[parseInt(index.toString(), 10)];
            if (!haveContent) {
                (haveContent = item.content.length > 0 || !isNullOrUndefined(item.content));
            }
            if (!haveOppContent) {
                (haveOppContent = item.oppositeContent.length > 0 || !isNullOrUndefined(item.content));
            }
        }
        this.element.classList.remove('e-content-only', 'e-opposite-content-only');
        if (haveContent && !haveOppContent) {
            this.element.classList.add('e-content-only');
        }
        if (haveOppContent && !haveContent) {
            this.element.classList.add('e-opposite-content-only');
        }
    };
    Timeline.prototype.updateItemContent = function (isContent, item, index, contentEle) {
        var notCompile = !(this.isReact || this.isVue);
        var ctn = this.getTemplateFunction(isContent ? item.content : item.oppositeContent, notCompile);
        if (typeof ctn === 'string') {
            contentEle.innerText = ctn;
        }
        else {
            append(ctn({ item: item, itemIndex: index }, this), contentEle);
        }
    };
    Timeline.prototype.updateTemplateFunction = function () {
        this.templateFunction = this.template ? this.getTemplateFunction(this.template, false) : null;
    };
    Timeline.prototype.renderItemContent = function (index, isrerender, timelineItem) {
        var listItems = this.timelineListEle.querySelectorAll('li');
        if (isrerender) {
            this.removeItemContent(listItems[parseInt((index).toString(), 10)]);
        }
        if (this.template) {
            if (isrerender) {
                listItems[parseInt((index).toString(), 10)].classList.add(TEMPLATE);
            }
            else {
                timelineItem.classList.add(TEMPLATE);
            }
            var item = this.items[parseInt(index.toString(), 10)];
            append(this.templateFunction({ item: item, itemIndex: index }, this, 'timelineTemplate', (this.element.id + '_timelineTemplate'), this.isStringTemplate), isrerender ? listItems[parseInt((index).toString(), 10)] : timelineItem);
        }
        this.renderReactTemplates();
    };
    Timeline.prototype.removeItemContent = function (ele) {
        ele.classList.remove(TEMPLATE);
        var firstChild = ele.firstElementChild;
        for (var i = 0; i < ele.childElementCount; i++) {
            firstChild.remove();
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    Timeline.prototype.getTemplateFunction = function (template, notCompile) {
        if (notCompile === void 0) { notCompile = true; }
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                    notCompile = false;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return notCompile ? content : compile(content);
        }
        else {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    Timeline.prototype.removeItemElements = function () {
        var listItems = this.timelineListEle.querySelectorAll('li');
        for (var i = 0; i < listItems.length; i++) {
            remove(listItems[parseInt(i.toString(), 10)]);
        }
    };
    Timeline.prototype.updateElementClassArray = function () {
        var classArray = [RTL, 'e-align-before', 'e-align-after', 'e-outline', 'e-fill', 'e-align-alternate',
            'e-align-alternatereverse', TIMELINEREVERSE, HORIZONTAL, VERTICAL];
        removeClass([this.element], classArray);
    };
    Timeline.prototype.updateContent = function () {
        if (this.isReact) {
            this.clearTemplate(['timelineTemplate']);
        }
        for (var i = 0; i < this.items.length; i++) {
            this.renderItemContent(i, true);
        }
    };
    Timeline.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // unwires the events and detach the li elements
        this.removeItemElements();
        this.element.removeAttribute('role');
        this.element.removeAttribute('aria-label');
        this.clearTemplate();
        if (this.timelineListEle) {
            remove(this.timelineListEle);
        }
        this.timelineListEle = null;
        this.updateElementClassArray();
    };
    Timeline.prototype.updateItems = function (newProp, oldPropItems, index, item) {
        var _a, _b, _c, _d;
        var timelineItemElements = this.timelineListEle.querySelectorAll('li');
        var dotEle;
        var contentEle;
        var oppositeEle;
        switch (newProp) {
            case 'dotCss':
                dotEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + DOTCONTENT);
                if (oldPropItems.dotCss !== '') {
                    (_a = dotEle.classList).remove.apply(_a, oldPropItems.dotCss.trim().split(' '));
                }
                if (item.dotCss !== '') {
                    (_b = dotEle.classList).add.apply(_b, this.items[parseInt(index.toString(), 10)].dotCss.trim().split(' '));
                }
                break;
            case 'content':
                contentEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + CONTENT);
                contentEle.innerText = '';
                this.updateItemContent(true, item, index, contentEle);
                this.haveOneSidecontent();
                break;
            case 'oppositeContent':
                oppositeEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + OPPOSITECONTENT);
                oppositeEle.innerText = '';
                this.updateItemContent(false, item, index, oppositeEle);
                this.haveOneSidecontent();
                break;
            case 'disabled':
                timelineItemElements[parseInt(index.toString(), 10)].classList[this.items[parseInt(index.toString(), 10)].disabled ? 'add' : 'remove'](DISABLED);
                break;
            case 'cssClass':
                if (oldPropItems.cssClass !== '') {
                    (_c = timelineItemElements[parseInt(index.toString(), 10)].classList).remove.apply(_c, oldPropItems.cssClass.trim().split(' '));
                }
                if (item.cssClass !== '') {
                    (_d = timelineItemElements[parseInt(index.toString(), 10)].classList).add.apply(_d, item.cssClass.trim().split(' '));
                }
                break;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {TimelineModel} newProp - Specifies new properties
     * @param  {TimelineModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Timeline.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'items':
                    if (Array.isArray(newProp.items)) {
                        this.removeItemElements();
                        this.renderItems();
                    }
                    else {
                        var itemLength = Object.keys(newProp.items).length;
                        for (var i = 0; i < itemLength; i++) {
                            var itemPropLength = parseInt(Object.keys(newProp.items)[i], 10);
                            for (var j = 0; j < Object.keys(newProp.items[itemPropLength]).length; j++) {
                                var property = Object.keys(newProp.items[itemPropLength])[j];
                                this.updateItems(property, oldProp.items[itemPropLength], itemPropLength, newProp.items[itemPropLength]);
                            }
                        }
                    }
                    break;
                case 'orientation':
                    this.updateOrientation();
                    break;
                case 'align':
                    this.updateAlign();
                    break;
                case 'enableRtl':
                    this.updateRtl();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'reverse':
                    this.element.classList[this.reverse ? 'add' : 'remove'](TIMELINEREVERSE);
                    break;
                case 'template':
                    this.updateTemplateFunction();
                    this.updateContent();
                    break;
            }
        }
    };
    __decorate([
        Property(TimelineOrientation.Vertical)
    ], Timeline.prototype, "orientation", void 0);
    __decorate([
        Property(TimelineAlign.After)
    ], Timeline.prototype, "align", void 0);
    __decorate([
        Collection([], TimelineItem)
    ], Timeline.prototype, "items", void 0);
    __decorate([
        Property('')
    ], Timeline.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], Timeline.prototype, "reverse", void 0);
    __decorate([
        Property('')
    ], Timeline.prototype, "template", void 0);
    __decorate([
        Event()
    ], Timeline.prototype, "created", void 0);
    __decorate([
        Event()
    ], Timeline.prototype, "beforeItemRender", void 0);
    Timeline = __decorate([
        NotifyPropertyChanges
    ], Timeline);
    return Timeline;
}(Component));
export { Timeline };
