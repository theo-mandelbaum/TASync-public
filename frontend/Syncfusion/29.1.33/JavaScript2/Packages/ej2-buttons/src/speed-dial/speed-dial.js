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
import { Event, ChildProperty, Collection, Complex, Component, NotifyPropertyChanges, Property, getUniqueID, EventHandler, isRippleEnabled, removeClass, addClass, attributes, animationMode } from '@syncfusion/ej2-base';
import { select, extend, deleteObject, KeyboardEvents, append, rippleEffect, remove, closest, selectAll, isNullOrUndefined, compile, formatUnit, Animation } from '@syncfusion/ej2-base';
import { Fab } from './../floating-action-button/index';
var topPosition = ['TopLeft', 'TopCenter', 'TopRight'];
var bottomPosition = ['BottomLeft', 'BottomCenter', 'BottomRight'];
var leftPosition = ['TopLeft', 'MiddleLeft', 'BottomLeft'];
var rightPosition = ['TopRight', 'MiddleRight', 'BottomRight'];
var SDHIDDEN = 'e-speeddial-hidden';
var FIXEDSD = 'e-speeddial-fixed';
var SPEEDDIAL = 'e-speeddial';
var RTLCLASS = 'e-rtl';
var HOVERSD = 'e-speeddial-hover-open';
var RADIALSD = 'e-speeddial-radial';
var LINEARSD = 'e-speeddial-linear';
var TEMPLATESD = 'e-speeddial-template';
var SDTEMPLATECONTAINER = 'e-speeddial-template-container';
var SDOVERLAY = 'e-speeddial-overlay';
var SDPOPUP = 'e-speeddial-popup';
var SDUL = 'e-speeddial-ul';
var SDLI = 'e-speeddial-li';
var SDACTIVELI = 'e-speeddial-li-active';
var SDLIICON = 'e-speeddial-li-icon';
var SDLITEXT = 'e-speeddial-li-text';
var SDLITEXTONLY = 'e-speeddial-text-li';
var DISABLED = 'e-disabled';
var SDVERTICALBOTTOM = 'e-speeddial-vert-bottom';
var SDVERTICALRIGHT = 'e-speeddial-vert-right';
var SDHORIZONTALTOP = 'e-speeddial-horz-top';
var SDHORIZONTALLEFT = 'e-speeddial-horz-left';
var SDHORIZONTALRIGHT = 'e-speeddial-horz-right';
var SDOVERFLOW = 'e-speeddial-overflow';
var SDVERTOVERFLOW = 'e-speeddial-vert-overflow';
var SDHORZOVERFLOW = 'e-speeddial-horz-overflow';
var SDTOP = 'e-speeddial-top';
var SDBOTTOM = 'e-speeddial-bottom';
var SDRIGHT = 'e-speeddial-right';
var SDLEFT = 'e-speeddial-left';
var SDMIDDLE = 'e-speeddial-middle';
var SDCENTER = 'e-speeddial-center';
var SDTOPLEFT = 'e-speeddial-top-left';
var SDBOTTOMRIGHT = 'e-speeddial-bottom-right';
var SDTOPRIGHT = 'e-speeddial-top-right';
var SDBOTTOMLEFT = 'e-speeddial-bottom-left';
var SDVERTDIST = '--speeddialVertDist';
var SDHORZDIST = '--speeddialHorzDist';
var SDRADICALANGLE = '--speeddialRadialAngle';
var SDRADICALOFFSET = '--speeddialRadialOffset';
var SDRADICALMINHEIGHT = '--speeddialRadialMinHeight';
var SDRADICALMINWIDTH = '--speeddialRadialMinWidth';
var SDOVERFLOWLIMIT = '--speeddialOverflowLimit';
var SDRADICALHORZDIST = '--speeddialRadialHorzDist';
/**
 * Defines the display mode of speed dial action items in SpeedDial
 */
export var SpeedDialMode;
(function (SpeedDialMode) {
    /**
     * SpeedDial items are displayed in linear order like list.
     */
    SpeedDialMode["Linear"] = "Linear";
    /**
     * SpeedDial items are displayed like radial menu in radial direction (circular direction).
     */
    SpeedDialMode["Radial"] = "Radial";
})(SpeedDialMode || (SpeedDialMode = {}));
/**
 * Defines the speed dial action items display direction when mode is Linear.
 */
export var LinearDirection;
(function (LinearDirection) {
    /**
     * Speed dial action items are displayed vertically above the button of Speed Dial.
     */
    LinearDirection["Up"] = "Up";
    /**
     * Speed dial action items are displayed vertically below the button of Speed Dial.
     */
    LinearDirection["Down"] = "Down";
    /**
     * Speed dial action items are displayed horizontally on the button's right side.
     */
    LinearDirection["Right"] = "Right";
    /**
     * Speed dial action items are displayed horizontally on the button's left side.
     */
    LinearDirection["Left"] = "Left";
    /**
     * Speed dial action items are displayed vertically above or below the button of Speed Dial based on the position.
     * If Position is TopRight, TopLeft, TopCenter, the items are displayed vertically below the button else above the button.
     */
    LinearDirection["Auto"] = "Auto";
})(LinearDirection || (LinearDirection = {}));
/**
 * Defines the speed dial action items  order, when mode is Radial.
 */
export var RadialDirection;
(function (RadialDirection) {
    /**
     * SpeedDial items are arranged in clockwise direction.
     */
    RadialDirection["Clockwise"] = "Clockwise";
    /**
     * SpeedDial items are shown in anti-clockwise direction.
     */
    RadialDirection["AntiClockwise"] = "AntiClockwise";
    /**
     * SpeedDial items are shown clockwise or anti-clockwise based on the position.
     */
    RadialDirection["Auto"] = "Auto";
})(RadialDirection || (RadialDirection = {}));
/**
 * Defines the animation effect applied when open and close the speed dial items.
 */
export var SpeedDialAnimationEffect;
(function (SpeedDialAnimationEffect) {
    /**
     * SpeedDial open/close actions occur with the Fade animation effect.
     */
    SpeedDialAnimationEffect["Fade"] = "Fade";
    /**
     * SpeedDial open/close actions occur with the FadeZoom animation effect.
     */
    SpeedDialAnimationEffect["FadeZoom"] = "FadeZoom";
    /**
     * SpeedDial open/close actions occur with the FlipLeftDown animation effect.
     */
    SpeedDialAnimationEffect["FlipLeftDown"] = "FlipLeftDown";
    /**
     * SpeedDial open/close actions occur with the FlipLeftUp animation effect.
     */
    SpeedDialAnimationEffect["FlipLeftUp"] = "FlipLeftUp";
    /**
     * SpeedDial open/close actions occur with the FlipRightDown animation effect.
     */
    SpeedDialAnimationEffect["FlipRightDown"] = "FlipRightDown";
    /**
     * SpeedDial open/close actions occur with the FlipRightUp animation effect.
     */
    SpeedDialAnimationEffect["FlipRightUp"] = "FlipRightUp";
    /**
     * SpeedDial open/close actions occur with the FlipXDown animation effect.
     */
    SpeedDialAnimationEffect["FlipXDown"] = "FlipXDown";
    /**
     * SpeedDial open/close actions occur with the FlipXUp animation effect.
     */
    SpeedDialAnimationEffect["FlipXUp"] = "FlipXUp";
    /**
     * SpeedDial open/close actions occur with the FlipYLeft animation effect.
     */
    SpeedDialAnimationEffect["FlipYLeft"] = "FlipYLeft";
    /**
     * SpeedDial open/close actions occur with the FlipYRight animation effect.
     */
    SpeedDialAnimationEffect["FlipYRight"] = "FlipYRight";
    /**
     * SpeedDial open/close actions occur with the SlideBottom animation effect.
     */
    SpeedDialAnimationEffect["SlideBottom"] = "SlideBottom";
    /**
     * SpeedDial open/close actions occur with the SlideLeft animation effect.
     */
    SpeedDialAnimationEffect["SlideLeft"] = "SlideLeft";
    /**
     * SpeedDial open/close actions occur with the SlideRight animation effect.
     */
    SpeedDialAnimationEffect["SlideRight"] = "SlideRight";
    /**
     * SpeedDial open/close actions occur with the SlideTop animation effect.
     */
    SpeedDialAnimationEffect["SlideTop"] = "SlideTop";
    /**
     * SpeedDial open/close actions occur with the Zoom animation effect.
     */
    SpeedDialAnimationEffect["Zoom"] = "Zoom";
    /**
     * SpeedDial open/close actions occur without any animation effect.
     */
    SpeedDialAnimationEffect["None"] = "None";
})(SpeedDialAnimationEffect || (SpeedDialAnimationEffect = {}));
/**
 * AProvides options to customize the animation applied while opening and closing the popup of SpeedDial.
 */
var SpeedDialAnimationSettings = /** @class */ (function (_super) {
    __extends(SpeedDialAnimationSettings, _super);
    function SpeedDialAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Fade')
    ], SpeedDialAnimationSettings.prototype, "effect", void 0);
    __decorate([
        Property(400)
    ], SpeedDialAnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], SpeedDialAnimationSettings.prototype, "delay", void 0);
    return SpeedDialAnimationSettings;
}(ChildProperty));
export { SpeedDialAnimationSettings };
/**
 * Provides the options to customize the speed dial action buttons when mode of SpeedDial is Radial.
 */
var RadialSettings = /** @class */ (function (_super) {
    __extends(RadialSettings, _super);
    function RadialSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Auto')
    ], RadialSettings.prototype, "direction", void 0);
    __decorate([
        Property(-1)
    ], RadialSettings.prototype, "endAngle", void 0);
    __decorate([
        Property('100px')
    ], RadialSettings.prototype, "offset", void 0);
    __decorate([
        Property(-1)
    ], RadialSettings.prototype, "startAngle", void 0);
    return RadialSettings;
}(ChildProperty));
export { RadialSettings };
/**
 * Defines the items of Floating Action Button.
 */
var SpeedDialItem = /** @class */ (function (_super) {
    __extends(SpeedDialItem, _super);
    function SpeedDialItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], SpeedDialItem.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], SpeedDialItem.prototype, "id", void 0);
    __decorate([
        Property('')
    ], SpeedDialItem.prototype, "text", void 0);
    __decorate([
        Property('')
    ], SpeedDialItem.prototype, "title", void 0);
    __decorate([
        Property(false)
    ], SpeedDialItem.prototype, "disabled", void 0);
    return SpeedDialItem;
}(ChildProperty));
export { SpeedDialItem };
/**
 * The SpeedDial component that appears in front of all the contents of the page and displays list of action buttons on click which is an extended version of FAB.
 * The button of speed dial is positioned in relative to a view port of browser or the .
 * It can display a menu of related actions or a custom content popupTemplate>.
 *
 */
var SpeedDial = /** @class */ (function (_super) {
    __extends(SpeedDial, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {SpeedDialModel} options - Specifies the floating action button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    function SpeedDial(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isMenuOpen = false;
        _this.isClock = true;
        _this.isVertical = true;
        _this.isControl = false;
        _this.focusedIndex = -1;
        return _this;
    }
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    SpeedDial.prototype.render = function () {
        this.initialize();
    };
    SpeedDial.prototype.preRender = function () {
        this.keyConfigs = {
            space: 'space',
            enter: 'enter',
            end: 'end',
            home: 'home',
            moveDown: 'downarrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            esc: 'escape'
        };
        this.validateDirection();
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    SpeedDial.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    SpeedDial.prototype.getModuleName = function () {
        return 'speed-dial';
    };
    SpeedDial.prototype.initialize = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.fab = new Fab({
            content: this.content,
            cssClass: this.cssClass ? (SPEEDDIAL + ' ' + this.cssClass) : SPEEDDIAL,
            disabled: this.disabled,
            enablePersistence: this.enablePersistence,
            enableRtl: this.enableRtl,
            iconCss: this.openIconCss,
            iconPosition: this.iconPosition,
            position: this.position,
            target: this.target,
            visible: this.visible,
            isPrimary: this.isPrimary
        });
        this.fab.appendTo(this.element);
        if ((this.items.length > 0) || this.popupTemplate) {
            this.createPopup();
        }
        this.wireEvents();
    };
    SpeedDial.prototype.wireEvents = function () {
        EventHandler.add(window, 'resize', this.resizeHandler, this);
        EventHandler.add(document.body, 'click', this.bodyClickHandler, this);
        if (this.opensOnHover) {
            this.wireFabHover();
        }
        else {
            this.wireFabClick();
        }
    };
    SpeedDial.prototype.wirePopupEvents = function () {
        this.removeRippleEffect = rippleEffect(this.popupEle, { selector: '.' + SDLIICON });
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        this.popupKeyboardModule = new KeyboardEvents(this.popupEle, {
            keyAction: this.popupKeyActionHandler.bind(this),
            keyConfigs: { esc: 'escape' },
            eventName: 'keydown'
        });
        this.documentKeyboardModule = new KeyboardEvents(document.body, {
            keyAction: this.popupKeyActionHandler.bind(this),
            keyConfigs: { enter: 'enter', space: 'space' },
            eventName: 'keydown'
        });
        EventHandler.add(this.popupEle, 'click', this.popupClick, this);
        EventHandler.add(this.popupEle, 'mouseleave', this.popupMouseLeaveHandle, this);
    };
    SpeedDial.prototype.wireFabClick = function () {
        EventHandler.add(this.fab.element, 'click', this.fabClick, this);
    };
    SpeedDial.prototype.wireFabHover = function () {
        this.popupEle.classList.add(HOVERSD);
        EventHandler.add(this.fab.element, 'mouseover', this.mouseOverHandle, this);
        EventHandler.add(this.element, 'mouseleave', this.mouseLeaveHandle, this);
    };
    SpeedDial.prototype.createPopup = function () {
        var className = SDPOPUP + ' ' + SDHIDDEN;
        className = this.enableRtl ? className + ' ' + RTLCLASS : className;
        className = this.cssClass ? className + ' ' + this.cssClass : className;
        this.popupEle = this.createElement('div', {
            className: className,
            id: this.element.id + '_popup'
        });
        this.element.insertAdjacentElement('afterend', this.popupEle);
        attributes(this.element, { 'aria-expanded': 'false', 'aria-haspopup': 'true', 'aria-controls': this.popupEle.id });
        this.setPopupContent();
        if (this.modal) {
            this.createOverlay();
        }
        this.checkTarget();
        this.setPositionProps();
        this.wirePopupEvents();
    };
    SpeedDial.prototype.createOverlay = function () {
        this.overlayEle = this.createElement('div', {
            id: this.element.id + '_overlay',
            className: (SDOVERLAY + (this.isMenuOpen ? '' : ' ' + SDHIDDEN) + ' ' + this.cssClass).trim()
        });
        this.element.insertAdjacentElement('beforebegin', this.overlayEle);
    };
    SpeedDial.prototype.popupClick = function () {
        this.isControl = true;
    };
    //Checks and closes the speed dial if the click happened outside this speed dial.
    SpeedDial.prototype.bodyClickHandler = function (e) {
        if (this.isControl) {
            this.isControl = false;
            return;
        }
        if (this.isMenuOpen) {
            this.hidePopupEle(e);
        }
    };
    SpeedDial.prototype.fabClick = function (e) {
        this.isControl = true;
        if (this.isMenuOpen) {
            this.hidePopupEle(e);
        }
        else {
            this.showPopupEle(e);
        }
    };
    SpeedDial.prototype.setPopupContent = function () {
        this.popupEle.classList.remove(RADIALSD, LINEARSD, TEMPLATESD);
        if (!this.popupTemplate) {
            this.popupEle.classList.add((this.mode === 'Radial') ? RADIALSD : LINEARSD);
            this.createUl();
            this.createItems();
        }
        else {
            this.popupEle.classList.add(TEMPLATESD);
            this.appendTemplate();
        }
        this.renderReactTemplates();
    };
    SpeedDial.prototype.appendTemplate = function () {
        var templateContainer = this.createElement('div', { className: SDTEMPLATECONTAINER });
        append([templateContainer], this.popupEle);
        var templateFunction = this.getTemplateString(this.popupTemplate);
        append(templateFunction({}, this, 'fabPopupTemplate', (this.element.id + 'popupTemplate'), this.isStringTemplate), templateContainer);
    };
    SpeedDial.prototype.getTemplateString = function (template) {
        var stringContent = '';
        try {
            var tempEle = select(template);
            if (typeof template !== 'function' && tempEle) {
                //Return innerHTML incase of jsrenderer script else outerHTML
                stringContent = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
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
    SpeedDial.prototype.updatePopupTemplate = function () {
        if (this.popupEle) {
            if (this.popupEle.querySelector('.' + SDLI)) {
                this.clearItems();
                this.popupEle.classList.remove(RADIALSD, LINEARSD);
                this.popupEle.classList.add(TEMPLATESD);
            }
            while (this.popupEle.firstElementChild) {
                remove(this.popupEle.firstElementChild);
            }
            this.setPopupContent();
            this.updatePositionProperties();
        }
        else {
            this.createPopup();
        }
    };
    SpeedDial.prototype.createUl = function () {
        var popupUlEle = this.createElement('ul', {
            className: SDUL,
            id: this.element.id + '_ul',
            attrs: { 'role': 'menu' }
        });
        this.popupEle.appendChild(popupUlEle);
    };
    SpeedDial.prototype.createItems = function () {
        var _this = this;
        this.focusedIndex = -1;
        var ul = this.popupEle.querySelector('.' + SDUL);
        var _loop_1 = function (index) {
            var item = this_1.items[parseInt(index.toString(), 10)];
            var li = this_1.createElement('li', {
                className: SDLI + ' ' + SDHIDDEN,
                id: item.id ? item.id : (this_1.element.id + '_li_' + index),
                attrs: { 'role': 'menuitem' }
            });
            if (item.text) {
                li.setAttribute('aria-label', item.text);
            }
            if (this_1.itemTemplate) {
                var templateFunction = this_1.getTemplateString(this_1.itemTemplate);
                append(templateFunction(item, this_1, 'fabItemTemplate', (this_1.element.id + 'itemTemplate'), this_1.isStringTemplate), li);
            }
            else {
                if (item.iconCss) {
                    var iconSpan = this_1.createElement('span', {
                        className: SDLIICON + ' ' + item.iconCss
                    });
                    li.appendChild(iconSpan);
                }
                if (item.text) {
                    var textSpan = this_1.createElement('span', {
                        className: SDLITEXT
                    });
                    textSpan.innerText = item.text;
                    li.appendChild(textSpan);
                    if (!item.iconCss) {
                        li.classList.add(SDLITEXTONLY);
                    }
                }
            }
            if (item.disabled) {
                li.classList.add(DISABLED);
                li.setAttribute('aria-disabled', 'true');
            }
            else {
                EventHandler.add(li, 'click', function (e) { return _this.triggerItemClick(e, item); }, this_1);
            }
            if (item.title) {
                li.setAttribute('title', item.title);
            }
            var eventArgs = { element: li, item: item };
            this_1.trigger('beforeItemRender', eventArgs, function (args) {
                ul.appendChild(args.element);
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.items.length; index++) {
            _loop_1(index);
        }
    };
    SpeedDial.prototype.setRTL = function () {
        this.popupEle.classList[this.enableRtl ? 'add' : 'remove'](RTLCLASS);
        this.clearHorizontalPosition();
        if (!(this.popupTemplate || (this.mode === 'Radial'))) {
            this.setLinearHorizontalPosition();
        }
        else {
            if (!this.popupTemplate && this.mode === 'Radial') {
                this.setRadialPosition();
            }
            this.setHorizontalPosition();
        }
    };
    SpeedDial.prototype.checkTarget = function () {
        this.isFixed = true;
        if (this.target) {
            this.targetEle = (typeof this.target === 'string') ? select(this.target) : this.target;
            if (this.targetEle) {
                this.targetEle.appendChild(this.element);
                this.isFixed = false;
            }
        }
        if (this.isFixed) {
            if (this.popupEle) {
                this.popupEle.classList.add(FIXEDSD);
            }
            if (this.overlayEle) {
                this.overlayEle.classList.add(FIXEDSD);
            }
        }
        else {
            if (this.popupEle) {
                this.popupEle.classList.remove(FIXEDSD);
            }
            if (this.overlayEle) {
                this.overlayEle.classList.remove(FIXEDSD);
            }
        }
    };
    SpeedDial.prototype.setVisibility = function (val) {
        this.setProperties({ visible: val }, true);
        this.fab.setProperties({ visible: val });
    };
    SpeedDial.prototype.popupMouseLeaveHandle = function (e) {
        var target = e.relatedTarget;
        if (this.opensOnHover && !(target.classList.contains(SPEEDDIAL) || closest(target, '.' + SPEEDDIAL))) {
            this.hidePopupEle(e);
        }
    };
    SpeedDial.prototype.mouseOverHandle = function (e) {
        this.showPopupEle(e);
    };
    SpeedDial.prototype.mouseLeaveHandle = function (e) {
        var target = e.relatedTarget;
        if (!(target.classList.contains(SDPOPUP) || closest(target, '.' + SDPOPUP))) {
            this.hidePopupEle(e);
        }
    };
    SpeedDial.prototype.popupKeyActionHandler = function (e) {
        switch (e.action) {
            case 'esc':
                this.hidePopupEle(e);
                break;
            case 'enter':
            case 'space':
                if (this.isMenuOpen && e.target !== this.element) {
                    this.hidePopupEle(e);
                }
                break;
        }
    };
    SpeedDial.prototype.keyActionHandler = function (e) {
        e.preventDefault();
        switch (e.action) {
            case 'enter':
            case 'space':
                if (this.isMenuOpen) {
                    if (this.focusedIndex !== -1) {
                        this.triggerItemClick(e, this.items[this.focusedIndex]);
                    }
                    else {
                        this.hidePopupEle(e);
                    }
                }
                else {
                    this.showPopupEle(e);
                }
                break;
            case 'esc':
                this.hidePopupEle(e);
                break;
            default:
                if (this.popupTemplate || !this.isMenuOpen) {
                    break;
                }
                switch (e.action) {
                    case 'end':
                        this.focusLastElement();
                        break;
                    case 'home':
                        this.focusFirstElement();
                        break;
                    case 'moveRight':
                        if (this.mode === 'Radial') {
                            this.focusLeftRightElement(false);
                        }
                        else {
                            this.focusLinearElement(false);
                        }
                        break;
                    case 'moveDown':
                        if (this.mode === 'Radial') {
                            this.focusUpDownElement(false);
                        }
                        else {
                            this.focusLinearElement(false);
                        }
                        break;
                    case 'moveLeft':
                        if (this.mode === 'Radial') {
                            this.focusLeftRightElement(true);
                        }
                        else {
                            this.focusLinearElement(true);
                        }
                        break;
                    case 'moveUp':
                        if (this.mode === 'Radial') {
                            this.focusUpDownElement(true);
                        }
                        else {
                            this.focusLinearElement(true);
                        }
                        break;
                }
                break;
        }
    };
    SpeedDial.prototype.focusFirstElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = 0;
        while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED)) {
            index++;
            if (index > (ele.length - 1)) {
                return;
            }
        }
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial.prototype.focusLastElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = ele.length - 1;
        while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED)) {
            index--;
            if (index < 0) {
                return;
            }
        }
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    /*Linear*/
    SpeedDial.prototype.focusLinearElement = function (isLeftUp) {
        var isReversed = this.popupEle.classList.contains(SDVERTICALBOTTOM) ||
            this.popupEle.classList.contains(SDHORIZONTALRIGHT);
        /* Elements will be in reverse (RTL) order for these classes are present.
        Reversed  and Down or right is previous.
        Not reversed and Up or left is previous.
        ((isReversed && !isLeftUp)||(!isReversed && isLeftUp)) ==> isReversed!==isLeftUp */
        if (isReversed !== isLeftUp) {
            this.focusPrevElement();
        }
        else {
            this.focusNextElement();
        }
    };
    /*Radial*/
    SpeedDial.prototype.focusLeftRightElement = function (isLeft) {
        /*radialTop position  and left + anticlock or right + clock is previous
        other positions and right + anticlock or left + clock is previous
        ((isLeft && !this.isClock)||(!isLeft && this.isClock)) ==> isLeft!==this.isClock */
        var isradialTop = ['TopLeft', 'TopCenter', 'TopRight', 'MiddleLeft'].indexOf(this.position) !== -1;
        if ((isradialTop && (isLeft !== this.isClock)) || (!isradialTop && (isLeft === this.isClock))) {
            this.focusPrevElement();
        }
        else {
            this.focusNextElement();
        }
    };
    /*Radial*/
    SpeedDial.prototype.focusUpDownElement = function (isUp) {
        /*radialRight position  and up + anticlock or down + clock is previous
        other positions and down + anticlock or up + clock is previous
        ((isUp && !this.isClock)||(!isUp && this.isClock)) ==> isUp!==this.isClock */
        var isradialRight = ['TopRight', 'MiddleRight', 'BottomRight', 'BottomCenter'].indexOf(this.position) !== -1;
        if ((isradialRight && (isUp !== this.isClock)) || (!isradialRight && (isUp === this.isClock))) {
            this.focusPrevElement();
        }
        else {
            this.focusNextElement();
        }
    };
    SpeedDial.prototype.focusPrevElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = this.focusedIndex;
        do {
            index--;
            if (index < 0) {
                this.setFocus(-1);
                return;
            }
        } while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED));
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial.prototype.focusNextElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = this.focusedIndex;
        do {
            index++;
            if (index > (ele.length - 1)) {
                return;
            }
        } while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED));
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial.prototype.setFocus = function (index, ele) {
        this.removeFocus();
        if (ele) {
            ele.classList.add(SDACTIVELI);
        }
        this.focusedIndex = index;
    };
    SpeedDial.prototype.removeFocus = function () {
        var preEle = select('.' + SDACTIVELI, this.popupEle);
        if (preEle) {
            preEle.classList.remove(SDACTIVELI);
        }
    };
    SpeedDial.prototype.updatePositionProperties = function () {
        this.hidePopupEle();
        this.clearPosition();
        this.validateDirection();
        this.setPositionProps();
    };
    SpeedDial.prototype.setPositionProps = function () {
        if (this.popupTemplate) {
            this.setPosition();
        }
        else if ((this.mode === 'Radial')) {
            this.setRadialPosition();
            this.setPosition();
        }
        else {
            this.setLinearPosition();
            this.setMaxSize();
        }
    };
    SpeedDial.prototype.validateDirection = function () {
        switch (this.direction) {
            case 'Up':
                this.actualLinDirection = (topPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Up';
                break;
            case 'Down':
                this.actualLinDirection = (bottomPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Down';
                break;
            case 'Right':
                this.actualLinDirection = (rightPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Right';
                break;
            case 'Left':
                this.actualLinDirection = (leftPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Left';
                break;
            case 'Auto':
            default:
                this.actualLinDirection = 'Auto';
                break;
        }
        this.isVertical = !((this.actualLinDirection === 'Left') || (this.actualLinDirection === 'Right'));
    };
    SpeedDial.prototype.setMaxSize = function () {
        var top = this.element.offsetTop;
        var left = this.element.offsetLeft;
        var bottom = (this.isFixed ? window.innerHeight : this.targetEle.clientHeight) -
            this.element.offsetTop - this.element.offsetHeight;
        var right = (this.isFixed ? window.innerWidth : this.targetEle.clientWidth) -
            this.element.offsetLeft - this.element.offsetWidth;
        var limit = 0;
        var popupUlEle = this.popupEle.querySelector('.' + SDUL);
        if (this.isVertical) {
            limit = ((this.actualLinDirection === 'Up') || ((this.actualLinDirection === 'Auto') && (topPosition.indexOf(this.position) === -1))) ? top : bottom;
            if (limit < popupUlEle.offsetHeight) {
                this.popupEle.classList.add(SDOVERFLOW, SDVERTOVERFLOW);
                popupUlEle.style.setProperty(SDOVERFLOWLIMIT, limit + 'px');
            }
        }
        else {
            limit = this.enableRtl ? (this.direction === 'Right' ? left : right) : (this.direction === 'Right' ? right : left);
            if (limit < popupUlEle.offsetWidth) {
                this.popupEle.classList.add(SDOVERFLOW, SDHORZOVERFLOW);
                popupUlEle.style.setProperty(SDOVERFLOWLIMIT, limit + 'px');
            }
        }
    };
    SpeedDial.prototype.setLinearPosition = function () {
        var vertDist = 0;
        //Check whether the position value should be in top
        var isTop = (this.actualLinDirection === 'Down') || ((this.actualLinDirection === 'Auto') && (topPosition.indexOf(this.position) !== -1)) ||
            (!this.isVertical && (bottomPosition.indexOf(this.position) === -1));
        var elementOffSetHeight = this.element.offsetHeight / 2;
        var isMiddle = ['MiddleRight', 'MiddleCenter', 'MiddleLeft'].indexOf(this.position) !== -1;
        if (isTop) {
            vertDist = this.element.offsetTop + (this.isVertical ? this.element.offsetHeight : 0);
            if (isMiddle) {
                if (this.actualLinDirection === 'Right' || this.actualLinDirection === 'Left') {
                    vertDist = this.element.offsetTop - elementOffSetHeight;
                }
                if (this.actualLinDirection === 'Down') {
                    vertDist = vertDist - elementOffSetHeight;
                }
            }
            if (!this.isVertical) {
                this.popupEle.classList.add(SDHORIZONTALTOP);
            }
        }
        else {
            vertDist = this.isFixed ? window.document.documentElement.clientHeight : this.targetEle.clientHeight;
            vertDist = (vertDist - this.element.offsetTop - (this.isVertical ? 0 : this.element.offsetHeight));
            if (isMiddle) {
                if (this.actualLinDirection === 'Auto' || this.actualLinDirection === 'Up') {
                    vertDist = vertDist + elementOffSetHeight;
                }
            }
            if (this.isVertical) {
                this.popupEle.classList.add(SDVERTICALBOTTOM);
            }
        }
        this.popupEle.classList.add(isTop ? SDTOP : SDBOTTOM);
        this.popupEle.style.setProperty(SDVERTDIST, vertDist + 'px');
        this.setLinearHorizontalPosition();
    };
    SpeedDial.prototype.setLinearHorizontalPosition = function () {
        //Check whether the position value should be in left
        if ((this.actualLinDirection === 'Right') || (this.isVertical && (rightPosition.indexOf(this.position) === -1))) {
            if (this.enableRtl) {
                this.setRight();
            }
            else {
                this.setLeft();
            } //reverse the direction when RTL enabled
            if (!this.isVertical) {
                this.popupEle.classList.add(SDHORIZONTALLEFT);
            }
        }
        else {
            if (this.enableRtl) {
                this.setLeft();
            }
            else {
                this.setRight();
            } //reverse the direction when RTL enabled
            this.popupEle.classList.add(this.isVertical ? SDVERTICALRIGHT : SDHORIZONTALRIGHT);
        }
    };
    SpeedDial.prototype.setLeft = function () {
        var elementOffSetWidth = this.element.offsetWidth / 2;
        var isCenter = ['TopCenter', 'MiddleCenter', 'BottomCenter'].indexOf(this.position) !== -1;
        var horzDist = this.element.offsetLeft + (this.isVertical ? 0 : this.element.offsetWidth);
        if (isCenter) {
            if (this.actualLinDirection === 'Auto' || this.actualLinDirection === 'Down' || this.actualLinDirection === 'Up') {
                horzDist = this.element.offsetLeft - elementOffSetWidth;
            }
            else {
                horzDist = this.actualLinDirection === 'Right' ? this.element.offsetLeft + elementOffSetWidth : horzDist + elementOffSetWidth;
            }
        }
        this.popupEle.style.setProperty(SDHORZDIST, horzDist + 'px');
        this.popupEle.classList.add(SDLEFT);
    };
    SpeedDial.prototype.setRight = function () {
        var elementOffSetWidth = this.element.offsetWidth / 2;
        var isCenter = ['TopCenter', 'MiddleCenter', 'BottomCenter'].indexOf(this.position) !== -1;
        var horzDist = this.isFixed ? window.document.documentElement.clientWidth : this.targetEle.clientWidth;
        horzDist = (horzDist - this.element.offsetLeft - (this.isVertical ? this.element.offsetWidth : 0));
        if (isCenter && this.actualLinDirection === 'Left') {
            horzDist = horzDist + elementOffSetWidth;
        }
        if (this.popupEle.classList.contains('e-rtl') && isCenter) {
            horzDist = horzDist - elementOffSetWidth;
        }
        this.popupEle.style.setProperty(SDHORZDIST, horzDist + 'px');
        this.popupEle.classList.add(SDRIGHT);
    };
    SpeedDial.prototype.setPosition = function () {
        //Check for middle Position
        if (['MiddleLeft', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(SDMIDDLE);
            var yoffset = ((this.isFixed ? window.innerHeight : this.targetEle.clientHeight) - this.popupEle.offsetHeight) / 2;
            this.popupEle.style.setProperty(SDVERTDIST, yoffset + 'px');
        }
        this.popupEle.classList.add((bottomPosition.indexOf(this.position) === -1) ? SDTOP : SDBOTTOM);
        this.setHorizontalPosition();
    };
    SpeedDial.prototype.setHorizontalPosition = function () {
        //Check for Center Position
        if (['TopCenter', 'BottomCenter', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(SDCENTER);
            var xoffset = ((this.isFixed ? window.innerWidth : this.targetEle.clientWidth) - this.popupEle.offsetWidth) / 2;
            this.popupEle.style.setProperty(SDHORZDIST, xoffset + 'px');
        }
        var isRight = rightPosition.indexOf(this.position) !== -1;
        this.popupEle.classList.add((!(this.enableRtl || isRight) || (this.enableRtl && isRight)) ? SDLEFT : SDRIGHT);
    };
    SpeedDial.prototype.setCustomRadialPosition = function () {
        var viewportWidth = document.documentElement.clientWidth;
        var viewportHeight = document.documentElement.clientHeight;
        if (['TopLeft', 'BottomLeft', 'MiddleLeft'].indexOf(this.position) !== -1) {
            var horzDist = void 0;
            if (this.enableRtl) {
                if (this.isFixed) {
                    horzDist = viewportWidth - (this.element.offsetLeft + this.element.offsetWidth);
                }
                else {
                    horzDist = this.targetEle.clientWidth - (this.element.offsetLeft + this.element.offsetWidth);
                }
            }
            else {
                horzDist = this.element.offsetLeft;
            }
            this.popupEle.style.setProperty(SDRADICALHORZDIST, horzDist + 'px');
        }
        if (['TopLeft', 'TopCenter', 'TopRight'].indexOf(this.position) !== -1) {
            this.popupEle.style.top = this.element.offsetTop + 'px';
        }
        if (['TopRight', 'BottomRight', 'MiddleRight'].indexOf(this.position) !== -1) {
            var horzDist = void 0;
            if (this.enableRtl) {
                horzDist = this.element.offsetLeft;
            }
            else {
                if (this.isFixed) {
                    horzDist = viewportWidth - (this.element.offsetLeft + this.element.offsetWidth);
                }
                else {
                    horzDist = this.targetEle.clientWidth - (this.element.offsetLeft + this.element.offsetWidth);
                }
            }
            this.popupEle.style.setProperty(SDRADICALHORZDIST, horzDist + 'px');
        }
        if (['BottomLeft', 'BottomCenter', 'BottomRight'].indexOf(this.position) !== -1) {
            if (this.isFixed) {
                this.popupEle.style.bottom = viewportHeight - (this.element.offsetTop + this.element.offsetHeight) + 'px';
            }
            else {
                this.popupEle.style.bottom = this.targetEle.clientHeight - (this.element.offsetTop + this.element.offsetHeight) + 'px';
            }
        }
        if (['TopCenter', 'MiddleCenter', 'BottomCenter'].indexOf(this.position) !== -1) {
            var horzDist = void 0;
            if (this.enableRtl) {
                if (this.isFixed) {
                    horzDist = viewportWidth - (this.element.offsetLeft + this.element.offsetWidth) - this.popupEle.offsetWidth / 2;
                }
                else {
                    var targetEleWidth = this.targetEle.clientWidth;
                    var popupEleWidth = this.popupEle.offsetWidth;
                    horzDist = targetEleWidth - (this.element.offsetLeft + this.element.offsetWidth) - popupEleWidth / 2;
                }
            }
            else {
                horzDist = ((this.element.offsetLeft) - this.popupEle.offsetWidth / 2);
            }
            this.popupEle.style.setProperty(SDRADICALHORZDIST, horzDist + 'px');
        }
        if (['MiddleLeft', 'MiddleCenter', 'MiddleRight'].indexOf(this.position) !== -1) {
            this.popupEle.style.top = ((this.element.offsetTop) - this.popupEle.offsetHeight / 2) + 'px';
        }
    };
    SpeedDial.prototype.setRadialPosition = function () {
        this.setRadialCorner();
        var range = this.getActualRange();
        this.isClock = range.direction === 'Clockwise';
        var offset = formatUnit(range.offset);
        var li = selectAll('.' + SDLI, this.popupEle);
        this.popupEle.style.setProperty(SDRADICALOFFSET, offset);
        this.popupEle.style.setProperty(SDRADICALMINHEIGHT, li[0].offsetHeight + 'px');
        this.popupEle.style.setProperty(SDRADICALMINWIDTH, li[0].offsetWidth + 'px');
        var availableAngle = Math.abs(range.endAngle - range.startAngle);
        //Start and end will be same for Middle Center position, hence available angle will 0 or 360.
        var gaps = ((availableAngle === 360) || (availableAngle === 0)) ? li.length : li.length - 1;
        var perAngle = availableAngle / gaps;
        for (var i = 0; i < li.length; i++) {
            var ele = li[parseInt(i.toString(), 10)];
            var startAngle = range.startAngle;
            var angle = this.isClock ? ((startAngle) + (perAngle * i)) : ((startAngle) - (perAngle * i));
            angle = angle % 360; // removing the Zerp crossing changes.
            ele.style.setProperty(SDRADICALANGLE, angle + 'deg');
        }
    };
    SpeedDial.prototype.setRadialCorner = function () {
        //topLeftPosition
        if (['TopLeft', 'TopCenter', 'MiddleLeft', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDTOPRIGHT : SDTOPLEFT);
        }
        //topRightPosition
        if (['TopRight', 'TopCenter', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDTOPLEFT : SDTOPRIGHT);
        }
        //bottpmLeftPosition
        if (['BottomLeft', 'BottomCenter', 'MiddleLeft', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDBOTTOMRIGHT : SDBOTTOMLEFT);
        }
        //bottomRightPosition
        if (['BottomRight', 'BottomCenter', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDBOTTOMLEFT : SDBOTTOMRIGHT);
        }
    };
    // 0,360 is at right, 90 is at Bottom, 180 is at left, 270 is at top
    SpeedDial.prototype.getActualRange = function () {
        var range = { offset: this.radialSettings.offset };
        var start = this.radialSettings.startAngle;
        var end = this.radialSettings.endAngle;
        var isClockwise = false;
        switch (this.position) {
            case 'TopLeft':
            case 'TopRight':
                // Switch Left and Right for RTL mode.
                if (('TopLeft' === this.position) !== this.enableRtl) {
                    //TopLeft
                    isClockwise = this.radialSettings.direction === 'Clockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 0, 90, false);
                }
                else {
                    //TopRight
                    isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 90, 180, false);
                }
                break;
            case 'TopCenter':
                isClockwise = this.radialSettings.direction === 'Clockwise';
                this.checkAngleRange(start, end, range, isClockwise, 0, 180, false);
                break;
            case 'MiddleLeft':
            case 'MiddleRight':
                // Switch Left and Right for RTL mode.
                if (('MiddleLeft' === this.position) !== this.enableRtl) {
                    //MiddleLeft
                    isClockwise = this.radialSettings.direction === 'Clockwise';
                    /**Replace the value if not defined or greater than 360 or less than 0 or between 91 and  269*/
                    start = (isNullOrUndefined(start) || (start < 0) || (start > 360) || ((start > 90) && (start < 270))) ?
                        (isClockwise ? 270 : 90) : start;
                    end = (isNullOrUndefined(end) || (end < 0) || (end > 360) || ((end > 90) && (end < 270))) ?
                        (isClockwise ? 90 : 270) : end;
                    /**update for Zero Crossing */
                    start = start < 91 ? start + 360 : start;
                    end = end < 91 ? end + 360 : end;
                    var switchVal = (isClockwise && (end < start)) || (!isClockwise && (end > start));
                    range.startAngle = switchVal ? end : start;
                    range.endAngle = switchVal ? start : end;
                }
                else {
                    //MiddleRight
                    isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 90, 270, false);
                }
                break;
            case 'MiddleCenter':
                isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                /**Replace the value if not defined or greater than 360 or less than 0 */
                start = (isNullOrUndefined(start) || (start < 0) || (start > 360)) ? (isClockwise ? 0 : 360) : start;
                end = (isNullOrUndefined(end) || (end < 0) || (end > 360)) ? (isClockwise ? 360 : 0) : end;
                /**update for Zero Crossing */
                range.startAngle = (!isClockwise && (start <= end)) ? (start + 360) : start;
                range.endAngle = (isClockwise && (end <= start)) ? (end + 360) : end;
                break;
            case 'BottomLeft':
            case 'BottomRight':
                // Switch Left and Right for RTL mode.
                if (('BottomLeft' === this.position) !== this.enableRtl) {
                    //BottomLeft
                    isClockwise = this.radialSettings.direction === 'Clockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 270, 360, true);
                }
                else {
                    //BottomRight
                    isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 180, 270, true);
                }
                break;
            case 'BottomCenter':
                isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                this.checkAngleRange(start, end, range, isClockwise, 180, 360, true);
                break;
        }
        range.direction = isClockwise ? 'Clockwise' : 'AntiClockwise';
        return range;
    };
    SpeedDial.prototype.checkAngleRange = function (start, end, range, isClockwise, min, max, check0) {
        start = this.checkAngle(start, isClockwise, min, max, check0);
        end = this.checkAngle(end, !isClockwise, min, max, check0);
        /**Switch the values if both are values are in the range but not as per direction*/
        var switchVal = (isClockwise && (end < start)) || (!isClockwise && (end > start));
        range.startAngle = switchVal ? end : start;
        range.endAngle = switchVal ? start : end;
    };
    SpeedDial.prototype.checkAngle = function (val, isStart, min, max, check0) {
        if (isNullOrUndefined(val) || (val < 0) || (val > 360)) {
            return isStart ? min : max;
        }
        else {
            val = check0 ? ((val === 0) ? 360 : val) : ((val === 360) ? 0 : val);
            /**check whether the value is in the range if not replace them */
            return ((val >= min) && (val <= max)) ? val : isStart ? min : max;
        }
    };
    SpeedDial.prototype.clearPosition = function () {
        this.popupEle.style.removeProperty(SDRADICALOFFSET);
        this.popupEle.style.removeProperty(SDRADICALMINHEIGHT);
        this.popupEle.style.removeProperty(SDRADICALMINWIDTH);
        this.popupEle.classList.remove(SDTOPLEFT, SDTOPRIGHT, SDBOTTOMLEFT, SDBOTTOMRIGHT);
        this.popupEle.classList.remove(SDTOP, SDBOTTOM, SDMIDDLE);
        this.popupEle.classList.remove(SDHORIZONTALTOP, SDVERTICALBOTTOM);
        this.popupEle.style.removeProperty(SDVERTDIST);
        this.clearHorizontalPosition();
        this.clearOverflow();
    };
    SpeedDial.prototype.clearHorizontalPosition = function () {
        this.popupEle.style.removeProperty(SDHORZDIST);
        this.popupEle.style.removeProperty(SDRADICALHORZDIST);
        this.popupEle.style.removeProperty('top');
        this.popupEle.style.removeProperty('bottom');
        this.popupEle.classList.remove(SDRIGHT, SDLEFT, SDCENTER);
        this.popupEle.classList.remove(SDVERTICALRIGHT, SDHORIZONTALLEFT, SDHORIZONTALRIGHT);
    };
    SpeedDial.prototype.clearOverflow = function () {
        this.popupEle.classList.remove(SDOVERFLOW, SDVERTOVERFLOW, SDHORZOVERFLOW);
        this.popupEle.style.removeProperty(SDOVERFLOWLIMIT);
    };
    SpeedDial.prototype.hidePopupEle = function (e) {
        var _this = this;
        if (!this.popupEle || !this.isMenuOpen) {
            return;
        }
        var eventArgs = { element: this.popupEle, event: e, cancel: false };
        this.trigger('beforeClose', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            if (_this.animation.effect !== 'None') {
                var closeAnimation_1 = {
                    name: (_this.animation.effect + 'Out'),
                    timingFunction: 'easeOut'
                };
                var eleArray_1 = _this.popupTemplate ? [_this.popupEle.firstElementChild] : selectAll('.' + SDLI, _this.popupEle);
                var timeOutInterval_1 = _this.animation.duration / (eleArray_1.length + 1);
                closeAnimation_1.duration = 2 * timeOutInterval_1;
                /* To keep the animation smooth, start the animation of the second element when animation first element is half completed */
                var animateElement_1 = function (curIndex) {
                    var ele = eleArray_1[parseInt(curIndex.toString(), 10)];
                    closeAnimation_1.delay = (curIndex === eleArray_1.length - 1) ? _this.animation.delay : 0;
                    closeAnimation_1.begin = function () { if (curIndex === eleArray_1.length - 1) {
                        _this.startHide();
                    } };
                    closeAnimation_1.end = function () {
                        ele.classList.add(SDHIDDEN);
                        if (curIndex === 0) {
                            _this.endHide();
                        }
                    };
                    new Animation(closeAnimation_1).animate(ele);
                    if (curIndex !== 0) {
                        var index_1 = curIndex - 1;
                        setTimeout(function () {
                            animateElement_1(index_1);
                        }, timeOutInterval_1);
                    }
                };
                animateElement_1(eleArray_1.length - 1);
            }
            else {
                _this.startHide();
                if (!_this.popupTemplate) {
                    var ele = selectAll('.' + SDLI, _this.popupEle);
                    ele.forEach(function (element) { element.classList.add(SDHIDDEN); });
                }
                _this.endHide();
            }
        });
    };
    SpeedDial.prototype.startHide = function () {
        this.element.setAttribute('aria-expanded', 'false');
        this.removeFocus();
        this.isMenuOpen = false;
    };
    SpeedDial.prototype.endHide = function () {
        this.fab.setProperties({ iconCss: this.openIconCss });
        this.popupEle.classList.add(SDHIDDEN);
        if (this.popupTemplate) {
            this.setVisibility(true);
        }
        this.toggleOverlay();
        if (this.popupTemplate) {
            this.popupEle.removeAttribute('tabindex');
        }
        this.trigger('onClose', { element: this.popupEle });
    };
    SpeedDial.prototype.showPopupEle = function (e) {
        var _this = this;
        if (!this.popupEle || this.isMenuOpen) {
            return;
        }
        if (this.popupTemplate || (this.mode === 'Radial')) {
            this.setCustomRadialPosition();
        }
        else {
            this.setLinearPosition();
        }
        var eventArgs = { element: this.popupEle, event: e, cancel: false };
        this.trigger('beforeOpen', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            if (_this.animation.effect !== 'None' || (animationMode === 'Enable' && _this.animation.effect === 'None')) {
                if (animationMode === 'Enable' && _this.animation.effect === 'None') {
                    _this.animation.effect = 'Fade';
                }
                if (animationMode === 'Enable' && _this.animation.duration === 0) {
                    _this.animation.duration = 400;
                }
                var openAnimation_1 = {
                    name: (_this.animation.effect + 'In'),
                    timingFunction: 'easeIn'
                };
                var eleArray_2 = _this.popupTemplate ? [_this.popupEle.firstElementChild] : selectAll('.' + SDLI, _this.popupEle);
                var timeOutInterval_2 = _this.animation.duration / (eleArray_2.length + 1);
                openAnimation_1.duration = 2 * timeOutInterval_2;
                /* To keep the animation smooth, start the animation of the second element when animation first element is half completed */
                var animateElement_2 = function (curIndex) {
                    var ele = eleArray_2[parseInt(curIndex.toString(), 10)];
                    openAnimation_1.delay = (curIndex === 0) ? _this.animation.delay : 0;
                    openAnimation_1.begin = function () {
                        if (curIndex === 0) {
                            _this.startShow();
                        }
                        ele.classList.remove(SDHIDDEN);
                    };
                    openAnimation_1.end = function () { if (curIndex === eleArray_2.length - 1) {
                        _this.endShow();
                    } };
                    new Animation(openAnimation_1).animate(ele);
                    if (curIndex !== eleArray_2.length - 1) {
                        var index_2 = curIndex + 1;
                        setTimeout(function () {
                            animateElement_2(index_2);
                        }, timeOutInterval_2);
                    }
                };
                animateElement_2(0);
            }
            else {
                _this.startShow();
                if (!_this.popupTemplate) {
                    var ele = selectAll('.' + SDLI, _this.popupEle);
                    ele.forEach(function (element) { element.classList.remove(SDHIDDEN); });
                }
                _this.endShow();
            }
        });
    };
    SpeedDial.prototype.startShow = function () {
        this.element.setAttribute('aria-expanded', 'true');
        this.isMenuOpen = true;
        this.toggleOverlay();
        this.popupEle.classList.remove(SDHIDDEN);
        if (this.popupTemplate) {
            this.setVisibility(false);
        }
    };
    SpeedDial.prototype.endShow = function () {
        if (this.closeIconCss) {
            this.fab.setProperties({ iconCss: this.closeIconCss });
        }
        if (this.popupTemplate) {
            this.popupEle.setAttribute('tabindex', '1');
            this.popupEle.focus();
        }
        this.trigger('onOpen', { element: this.popupEle });
    };
    SpeedDial.prototype.toggleOverlay = function () {
        if (!this.overlayEle) {
            return;
        }
        this.overlayEle.classList[this.isMenuOpen ? 'remove' : 'add'](SDHIDDEN);
    };
    SpeedDial.prototype.removeOverlayEle = function () {
        if (!this.overlayEle) {
            return;
        }
        remove(this.overlayEle);
        this.overlayEle = undefined;
    };
    SpeedDial.prototype.updatePopupItems = function () {
        if (this.popupEle) {
            this.hidePopupEle();
            this.clearItems();
            this.createItems();
            this.updatePositionProperties();
        }
        else {
            this.createPopup();
        }
    };
    SpeedDial.prototype.handleResize = function (e) {
        if (!this.popupEle) {
            return;
        }
        this.hidePopupEle(e);
        this.clearOverflow();
        this.setPositionProps();
    };
    SpeedDial.prototype.triggerItemClick = function (e, item) {
        var target = e.target;
        target = target.classList.contains(SDLI) ? target : closest(target, '.' + SDLI);
        var eventArgs = { element: target, item: item, event: e };
        this.trigger('clicked', eventArgs);
        this.hidePopupEle(e);
    };
    /**
     * Opens the SpeedDial popup to display to display the speed dial items or the popupTemplate.
     *
     * @returns {void}
     */
    SpeedDial.prototype.show = function () {
        this.showPopupEle();
    };
    /**
     * Closes the SpeedDial popup.
     *
     *@returns {void}
     */
    SpeedDial.prototype.hide = function () {
        this.hidePopupEle();
    };
    /**
     * Refreshes the button position of speed dial. You can call this method to re-position button when the target is resized.
     *
     *@returns {void}
     */
    SpeedDial.prototype.refreshPosition = function () {
        this.resizeHandler();
    };
    SpeedDial.prototype.resizeHandler = function (e) {
        this.handleResize(e);
    };
    SpeedDial.prototype.clearItems = function () {
        var liList = selectAll('.' + SDLI, this.popupEle);
        liList.forEach(function (element) {
            remove(element);
        });
    };
    SpeedDial.prototype.unwireEvents = function () {
        EventHandler.remove(window, 'resize', this.resizeHandler);
        EventHandler.remove(document.body, 'click', this.bodyClickHandler);
        if (this.opensOnHover) {
            this.unwireFabHover();
        }
        else {
            this.unwireFabClick();
        }
    };
    SpeedDial.prototype.unwireFabClick = function () {
        EventHandler.remove(this.fab.element, 'click', this.fabClick);
    };
    SpeedDial.prototype.unwireFabHover = function () {
        this.popupEle.classList.remove(HOVERSD);
        EventHandler.remove(this.fab.element, 'mouseover', this.mouseOverHandle);
        EventHandler.remove(this.element, 'mouseleave', this.mouseLeaveHandle);
    };
    SpeedDial.prototype.unwirePopupEvents = function () {
        if (isRippleEnabled) {
            this.removeRippleEffect();
        }
        this.removeRippleEffect = null;
        this.keyboardModule.destroy();
        this.popupKeyboardModule.destroy();
        this.documentKeyboardModule.destroy();
        this.keyboardModule = null;
        this.popupKeyboardModule = null;
        this.documentKeyboardModule = null;
        EventHandler.remove(this.popupEle, 'click', this.popupClick);
        EventHandler.remove(this.popupEle, 'mouseleave', this.popupMouseLeaveHandle);
    };
    SpeedDial.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        this.unwireEvents();
        ['aria-expanded', 'aria-haspopup', 'aria-controls'].forEach(function (attr) {
            _this.element.removeAttribute(attr);
        });
        if (this.popupEle) {
            this.unwirePopupEvents();
            remove(this.popupEle);
            this.popupEle = undefined;
        }
        this.removeOverlayEle();
        this.fab.destroy();
        this.fab = undefined;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SpeedDialModel} newProp - Specifies new properties
     * @param  {SpeedDialModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    SpeedDial.prototype.onPropertyChanged = function (newProp, oldProp) {
        var fabProplist = ['content', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'iconPosition', 'position', 'target', 'template', 'title', 'visible', 'isPrimary'];
        var fabModel = extend({}, newProp);
        for (var _i = 0, _a = Object.keys(fabModel); _i < _a.length; _i++) {
            var prop = _a[_i];
            if ((fabProplist).indexOf(prop) < 0) {
                deleteObject(fabModel, prop);
            }
        }
        this.fab.setProperties(fabModel);
        for (var _b = 0, _c = Object.keys(newProp); _b < _c.length; _b++) {
            var prop = _c[_b];
            switch (prop) {
                case 'cssClass':
                    if (!this.popupEle) {
                        break;
                    }
                    if (oldProp.cssClass) {
                        removeClass(this.overlayEle ? [this.popupEle, this.overlayEle] : [this.popupEle], oldProp.cssClass.split(/\s+/).filter(function (c) { return c.length > 0; }));
                    }
                    if (newProp.cssClass) {
                        addClass(this.overlayEle ? [this.popupEle, this.overlayEle] : [this.popupEle], newProp.cssClass.split(/\s+/).filter(function (c) { return c.length > 0; }));
                    }
                    break;
                case 'visible':
                case 'disabled':
                    this.hide();
                    break;
                case 'enableRtl':
                    if (!this.popupEle) {
                        break;
                    }
                    this.setRTL();
                    break;
                case 'openIconCss':
                    if (!this.isMenuOpen) {
                        this.fab.setProperties({ iconCss: this.openIconCss });
                    }
                    break;
                case 'closeIconCss':
                    if (this.isMenuOpen) {
                        this.fab.setProperties({ iconCss: this.closeIconCss });
                    }
                    break;
                case 'position':
                    if (!this.popupEle) {
                        break;
                    }
                    this.updatePositionProperties();
                    break;
                case 'direction':
                    if (!this.popupEle || this.popupTemplate) {
                        break;
                    }
                    this.updatePositionProperties();
                    break;
                case 'popupTemplate':
                    this.updatePopupTemplate();
                    break;
                case 'target':
                    this.hidePopupEle();
                    this.checkTarget();
                    if (this.overlayEle) {
                        this.element.insertAdjacentElement('beforebegin', this.overlayEle);
                    }
                    if (!this.popupEle) {
                        break;
                    }
                    this.element.insertAdjacentElement('afterend', this.popupEle);
                    this.updatePositionProperties();
                    break;
                case 'items':
                case 'itemTemplate':
                    if (this.popupTemplate) {
                        break;
                    }
                    this.updatePopupItems();
                    break;
                case 'modal':
                    if (newProp.modal) {
                        this.createOverlay();
                    }
                    else {
                        this.removeOverlayEle();
                    }
                    break;
                case 'mode':
                    if (!this.popupEle || this.popupTemplate) {
                        break;
                    }
                    this.popupEle.classList.remove(RADIALSD, LINEARSD);
                    this.popupEle.classList.add((this.mode === 'Radial') ? RADIALSD : LINEARSD);
                    this.updatePositionProperties();
                    break;
                case 'radialSettings':
                    if (this.popupEle && (this.mode === 'Radial') && !this.popupTemplate) {
                        this.setRadialPosition();
                    }
                    break;
                case 'opensOnHover':
                    if (this.opensOnHover) {
                        this.unwireFabClick();
                        this.wireFabHover();
                    }
                    else {
                        this.unwireFabHover();
                        this.wireFabClick();
                    }
                    break;
            }
        }
    };
    __decorate([
        Complex({}, SpeedDialAnimationSettings)
    ], SpeedDial.prototype, "animation", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "content", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "closeIconCss", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "cssClass", void 0);
    __decorate([
        Property('Auto')
    ], SpeedDial.prototype, "direction", void 0);
    __decorate([
        Property(false)
    ], SpeedDial.prototype, "disabled", void 0);
    __decorate([
        Property('Left')
    ], SpeedDial.prototype, "iconPosition", void 0);
    __decorate([
        Collection([], SpeedDialItem)
    ], SpeedDial.prototype, "items", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "itemTemplate", void 0);
    __decorate([
        Property('Linear')
    ], SpeedDial.prototype, "mode", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "openIconCss", void 0);
    __decorate([
        Property(false)
    ], SpeedDial.prototype, "opensOnHover", void 0);
    __decorate([
        Property('BottomRight')
    ], SpeedDial.prototype, "position", void 0);
    __decorate([
        Property(false)
    ], SpeedDial.prototype, "modal", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "popupTemplate", void 0);
    __decorate([
        Complex({}, RadialSettings)
    ], SpeedDial.prototype, "radialSettings", void 0);
    __decorate([
        Property('')
    ], SpeedDial.prototype, "target", void 0);
    __decorate([
        Property(true)
    ], SpeedDial.prototype, "visible", void 0);
    __decorate([
        Property(true)
    ], SpeedDial.prototype, "isPrimary", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "beforeItemRender", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "created", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "clicked", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "onClose", void 0);
    __decorate([
        Event()
    ], SpeedDial.prototype, "onOpen", void 0);
    SpeedDial = __decorate([
        NotifyPropertyChanges
    ], SpeedDial);
    return SpeedDial;
}(Component));
export { SpeedDial };
