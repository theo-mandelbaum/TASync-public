import { extend, deleteObject, addClass, isNullOrUndefined, Property, ChildProperty, attributes, getComponent, select, getUniqueID, append, SanitizeHtmlHelper, compile, detach, removeClass, EventHandler, rippleEffect, isRippleEnabled, closest, Animation, formatUnit, classList, Collection, Complex, Event, NotifyPropertyChanges, Component, getValue, setValue, remove, KeyboardEvents, getInstance, createElement, animationMode } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Popup, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

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
/**
 * @param {Object} props - Specifies the properties
 * @param {string[]} model - Specifies the model
 * @returns {Object} Component Model
 */
function getModel(props, model) {
    var obj = extend({}, props);
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var prop = _a[_i];
        if ((model).indexOf(prop) < 0) {
            deleteObject(obj, prop);
        }
    }
    return obj;
}
/** @hidden
 * @param {HTMLElement} ul - Specifies the UL element
 * @param {number} keyCode - Specifies the keycode
 * @returns {void}
 */
function upDownKeyHandler(ul, keyCode) {
    var defaultIdx = keyCode === 40 ? 0 : ul.childElementCount - 1;
    var liIdx = defaultIdx;
    var li;
    var selectedLi = ul.querySelector('.e-selected');
    if (selectedLi) {
        selectedLi.classList.remove('e-selected');
    }
    for (var i = 0, len = ul.children.length; i < len; i++) {
        if (ul.children[i].classList.contains('e-focused')) {
            li = ul.children[i];
            liIdx = i;
            li.classList.remove('e-focused');
            if (keyCode === 40) {
                liIdx++;
            }
            else {
                liIdx--;
            }
            if (liIdx === (keyCode === 40 ? ul.childElementCount : -1)) {
                liIdx = defaultIdx;
            }
        }
    }
    li = ul.children[liIdx];
    liIdx = isValidLI(ul, li, liIdx, keyCode);
    if (liIdx !== -1) {
        addClass([ul.children[liIdx]], 'e-focused');
        ul.children[liIdx].focus();
    }
}
/**
 * Get Valid LI element
 *
 * @param {HTMLElement} ul - Specifies the UL element
 * @param {Element} li - Specifies the LI element
 * @param {number} index - Specifies the index
 * @param {number} keyCode - Specifies the keycode
 * @param {number} count - Specifies the count
 * @returns {number} - Index
 */
function isValidLI(ul, li, index, keyCode, count) {
    if (count === void 0) { count = 0; }
    if (li.classList.contains('e-separator') || li.classList.contains('e-disabled')) {
        if (index === (keyCode === 40 ? ul.childElementCount - 1 : 0)) {
            index = keyCode === 40 ? 0 : ul.childElementCount - 1;
        }
        else {
            if (keyCode === 40) {
                index++;
            }
            else {
                index--;
            }
        }
    }
    li = ul.children[index];
    if (li.classList.contains('e-separator') || li.classList.contains('e-disabled')) {
        count++;
        if (count === ul.childElementCount) {
            return index = -1;
        }
        index = isValidLI(ul, li, index, keyCode, count);
    }
    return index;
}
/** @hidden
 * @param {HTMLElement} popup - Specifies the popup element.
 * @param {boolean} blankIcon - Specifies the blankIcon value.
 * @returns {void}
 */
function setBlankIconStyle(popup, blankIcon) {
    var blankIconList = [].slice.call(popup.getElementsByClassName('e-blank-icon'));
    if (blankIcon) {
        var menuItem = [].slice.call(popup.getElementsByClassName('e-item'));
        menuItem.forEach(function (li) {
            if (li.style.paddingLeft || li.style.paddingRight) {
                li.removeAttribute('style');
            }
        });
    }
    if (!blankIconList.length) {
        return;
    }
    var iconLi = popup.querySelector('.e-item:not(.e-blank-icon):not(.e-separator)');
    if (isNullOrUndefined(iconLi)) {
        return;
    }
    if (iconLi.classList.contains('e-url')) {
        iconLi = iconLi.querySelector('.e-menu-url');
    }
    var icon = iconLi.querySelector('.e-menu-icon');
    var cssProp;
    var enableRtl = popup.classList.contains('e-rtl');
    if (enableRtl) {
        cssProp = { padding: 'paddingRight', margin: 'marginLeft' };
    }
    else {
        cssProp = { padding: 'paddingLeft', margin: 'marginRight' };
    }
    /* eslint-disable */
    var size = parseInt(getComputedStyle(icon).fontSize, 10) + parseInt((enableRtl ? getComputedStyle(icon)[cssProp.margin] : getComputedStyle(icon)[cssProp.margin]), 10)
        + parseInt(getComputedStyle(iconLi).paddingLeft, 10) + "px";
    blankIconList.forEach(function (li) {
        if (li.classList.contains('e-url') && li.querySelector('.e-menu-url')) {
            li.querySelector('.e-menu-url').style[cssProp.padding] = size;
        }
        else {
            li.style[cssProp.padding] = size;
        }
    });
    /* eslint-enable */
}
/**
 * Defines the items of Split Button/DropDownButton.
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Item.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], Item.prototype, "id", void 0);
    __decorate([
        Property(false)
    ], Item.prototype, "separator", void 0);
    __decorate([
        Property('')
    ], Item.prototype, "text", void 0);
    __decorate([
        Property('')
    ], Item.prototype, "url", void 0);
    __decorate([
        Property(false)
    ], Item.prototype, "disabled", void 0);
    return Item;
}(ChildProperty));

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
var classNames = {
    DISABLED: 'e-disabled',
    FOCUS: 'e-focused',
    ICON: 'e-menu-icon',
    ITEM: 'e-item',
    POPUP: 'e-dropdown-popup',
    RTL: 'e-rtl',
    SEPARATOR: 'e-separator',
    VERTICAL: 'e-vertical',
    POPUPWIDTH: 'e-dropdown-popup-width'
};
/**
 * Animation configuration settings.
 */
var DropDownMenuAnimationSettings = /** @class */ (function (_super) {
    __extends$1(DropDownMenuAnimationSettings, _super);
    function DropDownMenuAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('SlideDown')
    ], DropDownMenuAnimationSettings.prototype, "effect", void 0);
    __decorate$1([
        Property(400)
    ], DropDownMenuAnimationSettings.prototype, "duration", void 0);
    __decorate$1([
        Property('ease')
    ], DropDownMenuAnimationSettings.prototype, "easing", void 0);
    return DropDownMenuAnimationSettings;
}(ChildProperty));
/**
 * DropDownButton component is used to toggle contextual overlays for displaying list of action items.
 * It can contain both text and images.
 * ```html
 * <button id="element">DropDownButton</button>
 * ```
 * ```typescript
 * <script>
 * var dropDownButtonObj = new DropDownButton({items: [{ text: 'Action1' }, { text: 'Action2' },{ text: 'Action3' }]);
 * dropDownButtonObj.appendTo("#element");
 * </script>
 * ```
 */
var DropDownButton = /** @class */ (function (_super) {
    __extends$1(DropDownButton, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {DropDownButtonModel} options - Specifies dropdown button model
     * @param  {string|HTMLButtonElement} element - Specifies element
     * @hidden
     */
    function DropDownButton(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isPopupCreated = true;
        return _this;
    }
    DropDownButton.prototype.preRender = function () {
        /** */
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    DropDownButton.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * To open/close DropDownButton popup based on current state of the DropDownButton.
     *
     * @returns {void}
     */
    DropDownButton.prototype.toggle = function () {
        if (this.canOpen()) {
            this.openPopUp();
        }
        else if (this.createPopupOnClick && !this.isPopupCreated) {
            this.createPopup();
            this.openPopUp();
        }
        else {
            this.closePopup();
        }
    };
    /**
     * Initialize the Component rendering
     *
     * @returns {void}
     * @private
     */
    DropDownButton.prototype.render = function () {
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
        this.renderComplete();
    };
    /**
     * Adds a new item to the menu. By default, new item appends to the list as the last item,
     * but you can insert based on the text parameter.
     *
     * @param  { ItemModel[] } items - Specifies an array of JSON data.
     * @param { string } text - Specifies the text to insert the newly added item in the menu.
     * @returns {void}.
     */
    DropDownButton.prototype.addItems = function (items, text) {
        var newItem;
        var idx = this.items.length;
        for (var j = 0, len = this.items.length; j < len; j++) {
            if (text === this.items[j].text) {
                idx = j;
                break;
            }
        }
        for (var i = items.length - 1; i >= 0; i--) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newItem = new Item(this, 'items', items[i], true);
            this.items.splice(idx, 0, newItem);
        }
        if (!this.canOpen()) {
            this.createItems();
        }
    };
    /**
     * Removes the items from the menu.
     *
     * @param  { string[] } items - Specifies an array of string to remove the items.
     * @param { string } isUniqueId - Set `true` if specified items is a collection of unique id.
     * @returns {void}.
     */
    DropDownButton.prototype.removeItems = function (items, isUniqueId) {
        var refresh = false;
        for (var i = 0, len = items.length; i < len; i++) {
            for (var j = 0, len_1 = this.items.length; j < len_1; j++) {
                if (items[i] === (isUniqueId ? this.items[j].id : this.items[j].text)) {
                    this.items.splice(j, 1);
                    refresh = true;
                    break;
                }
            }
        }
        if (refresh && this.getULElement()) {
            this.createItems();
        }
    };
    DropDownButton.prototype.createPopup = function () {
        var _a;
        var div = this.createElement('div', {
            className: this.popupWidth !== 'auto' ? classNames.POPUP + " " + classNames.POPUPWIDTH : classNames.POPUP,
            id: this.element.id + '-popup'
        });
        document.body.appendChild(div);
        this.dropDown = new Popup(div, {
            width: this.popupWidth,
            relateTo: this.element,
            collision: { X: 'fit', Y: 'flip' },
            position: { X: 'left', Y: 'bottom' },
            targetType: 'relative',
            content: this.target ? this.getTargetElement() : '',
            enableRtl: this.enableRtl
        });
        this.dropDown.element.setAttribute('role', 'dialog');
        this.dropDown.element.setAttribute('aria-label', 'dropdown menu');
        if (!isNullOrUndefined(this.popupContent)) {
            this.popupContent.style.display = '';
        }
        if (this.dropDown.element.style.position === 'fixed') {
            this.dropDown.refreshPosition(this.element);
        }
        this.dropDown.hide();
        attributes(this.element, (_a = {},
            _a['aria-haspopup'] = this.items.length || this.target ? 'true' : 'false',
            _a['aria-expanded'] = 'false',
            _a['type'] = 'button',
            _a));
        if (this.cssClass) {
            addClass([div], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        this.isPopupCreated = true;
        if (this.createPopupOnClick) {
            var splitButton = getComponent(this.activeElem[0], 'split-btn');
            if (splitButton) {
                splitButton.isPopupCreated = true;
            }
        }
    };
    DropDownButton.prototype.getTargetElement = function () {
        if (this.createPopupOnClick && !this.isColorPicker() && !isNullOrUndefined(this.popupContent)) {
            return this.popupContent;
        }
        return typeof (this.target) === 'string' ? select(this.target) : this.target;
    };
    DropDownButton.prototype.createItems = function (appendItems) {
        var _this = this;
        var items = this.items;
        var showIcon = this.hasIcon(this.items, 'iconCss');
        var span;
        var item;
        var li;
        var eventArgs;
        var ul = this.getULElement();
        if (ul) {
            ul.innerHTML = '';
        }
        else {
            ul = this.createElement('ul', {
                attrs: { 'role': 'menu', 'tabindex': '0' }
            });
        }
        if (this.itemTemplate) {
            var compiledTemplate_1 = this.compiletemplate(this.itemTemplate);
            items.forEach(function (item) {
                var li = _this.createElement('li', {
                    className: item.separator ? classNames.ITEM + ' ' + classNames.SEPARATOR : classNames.ITEM,
                    attrs: item.separator
                        ? { 'role': 'separator', 'tabindex': '-1', 'aria-label': 'separator', 'aria-hidden': 'true' }
                        : { 'role': 'menuitem', 'tabindex': '-1', 'aria-label': item.text },
                    id: item.id ? item.id : getUniqueID('e-' + _this.getModuleName() + '-item')
                });
                var compiledElement = compiledTemplate_1(item, _this, 'template', null, false, null, li);
                if (compiledElement) {
                    append(compiledElement, li);
                }
                if (item.disabled) {
                    li.classList.add('e-disabled');
                }
                var eventArgs = { item: item, element: li };
                _this.trigger('beforeItemRender', eventArgs);
                if (eventArgs.item.disabled !== item.disabled) {
                    li.classList[eventArgs.item.disabled ? 'add' : 'remove']('e-disabled');
                }
                ul.appendChild(li);
            });
            if (this.isReact) {
                this.renderReactTemplates();
            }
        }
        else {
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                if (this.enableHtmlSanitizer) {
                    item.text = SanitizeHtmlHelper.sanitize(item.text);
                }
                var tempItem = item.text;
                li = this.createElement('li', {
                    innerHTML: item.url ? '' : tempItem,
                    className: item.separator ? classNames.ITEM + ' ' + classNames.SEPARATOR : classNames.ITEM,
                    attrs: item.separator ? { 'role': 'separator', 'tabindex': '-1', 'aria-label': 'separator', 'aria-hidden': 'true' } : { 'role': 'menuitem', 'tabindex': '-1', 'aria-label': tempItem },
                    id: item.id ? item.id : getUniqueID('e-' + this.getModuleName() + '-item')
                });
                if (this.enableHtmlSanitizer) {
                    li.textContent = item.url ? '' : tempItem;
                }
                else {
                    li.innerHTML = item.url ? '' : tempItem;
                }
                if (item.url) {
                    li.appendChild(this.createAnchor(item));
                    li.classList.add('e-url');
                }
                if (item.iconCss) {
                    span = this.createElement('span', { className: classNames.ICON + ' ' + item.iconCss });
                    if (item.url) {
                        li.childNodes[0].appendChild(span);
                    }
                    else {
                        li.insertBefore(span, li.childNodes[0]);
                    }
                }
                else {
                    if (showIcon && !item.separator) {
                        li.classList.add('e-blank-icon');
                    }
                }
                var beforeDisabled = item.disabled;
                if (item.disabled) {
                    li.classList.add('e-disabled');
                }
                eventArgs = { item: item, element: li };
                this.trigger('beforeItemRender', eventArgs);
                var afterDisabled = eventArgs.item.disabled;
                if (beforeDisabled !== afterDisabled) {
                    if (eventArgs.item.disabled) {
                        li.classList.add('e-disabled');
                    }
                    else {
                        li.classList.remove('e-disabled');
                    }
                }
                ul.appendChild(li);
            }
        }
        if (appendItems) {
            this.getPopUpElement().appendChild(ul);
        }
        if (showIcon) {
            setBlankIconStyle(this.getPopUpElement());
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropDownButton.prototype.compiletemplate = function (template) {
        if (!this.itemTemplate) {
            return undefined;
        }
        try {
            if (typeof this.itemTemplate !== 'function') {
                var templateElement = document.querySelector(this.itemTemplate);
                if (templateElement) {
                    return compile(templateElement.innerHTML.trim());
                }
            }
            return compile(template);
        }
        catch (_a) {
            return compile(template);
        }
    };
    DropDownButton.prototype.hasIcon = function (items, field) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i]["" + field]) {
                return true;
            }
        }
        return false;
    };
    DropDownButton.prototype.createAnchor = function (item) {
        var tempItem = item.text;
        var anchor = this.createElement('a', { className: 'e-menu-text e-menu-url', attrs: { 'href': item.url } });
        if (this.enableHtmlSanitizer) {
            anchor.textContent = tempItem;
        }
        else {
            anchor.innerHTML = tempItem;
        }
        return anchor;
    };
    DropDownButton.prototype.initialize = function () {
        this.button = new Button({
            iconCss: this.iconCss, iconPosition: this.iconPosition, cssClass: this.cssClass, content: this.content,
            disabled: this.disabled, enableRtl: this.enableRtl, enablePersistence: this.enablePersistence
        });
        this.button.createElement = this.createElement;
        this.button.appendTo(this.element);
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.appendArrowSpan();
        this.setActiveElem([this.element]);
        this.element.setAttribute('tabindex', '0');
        this.element.setAttribute('aria-label', this.element.textContent ? this.element.textContent : 'dropdownbutton');
        if ((this.target && !this.isColorPicker() && !this.createPopupOnClick) || !this.createPopupOnClick) {
            this.createPopup();
        }
        else {
            this.isPopupCreated = false;
            if (this.target && !this.isColorPicker() && this.createPopupOnClick) {
                this.popupContent = this.getTargetElement();
                this.popupContent.style.display = 'none';
            }
        }
    };
    DropDownButton.prototype.isColorPicker = function () {
        if (!this.element) {
            return false;
        }
        var prevElem = this.element.previousSibling;
        if (prevElem && prevElem.classList && prevElem.classList.contains('e-split-colorpicker')) {
            return true;
        }
        return false;
    };
    DropDownButton.prototype.appendArrowSpan = function () {
        this.cssClass = isNullOrUndefined(this.cssClass) ? '' : this.cssClass;
        this.element.appendChild(this.createElement('span', {
            className: 'e-btn-icon e-icons ' + 'e-icon-' + (this.cssClass.indexOf(classNames.VERTICAL) > -1
                ? 'bottom' : 'right') + ' e-caret'
        }));
    };
    DropDownButton.prototype.setActiveElem = function (elem) {
        this.activeElem = elem;
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    DropDownButton.prototype.getModuleName = function () {
        return 'dropdown-btn';
    };
    DropDownButton.prototype.canOpen = function () {
        var val = false;
        if (this.isPopupCreated) {
            val = this.getPopUpElement().classList.contains('e-popup-close');
        }
        return val;
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    DropDownButton.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        if (this.getModuleName() === 'dropdown-btn') {
            var classList_1;
            if (this.element.querySelector('span.e-caret')) {
                detach(this.element.querySelector('span.e-caret'));
            }
            if (this.cssClass) {
                classList_1 = this.cssClass.split(' ');
            }
            this.button.destroy();
            if (classList_1) {
                removeClass([this.element], classList_1);
            }
            removeClass(this.activeElem, ['e-active']);
            var attrList = this.element.getAttribute('class') ? ['aria-haspopup', 'aria-expanded', 'aria-owns', 'type']
                : ['aria-haspopup', 'aria-expanded', 'aria-owns', 'type', 'class'];
            attrList.forEach(function (key) {
                _this.element.removeAttribute(key);
            });
            this.popupUnWireEvents();
            this.destroyPopup();
            this.isPopupCreated = false;
            if (!this.disabled) {
                this.unWireEvents();
            }
        }
    };
    DropDownButton.prototype.destroyPopup = function () {
        if (this.isPopupCreated) {
            this.dropDown.destroy();
            if (this.getPopUpElement()) {
                var popupEle = document.getElementById(this.getPopUpElement().id);
                if (popupEle) {
                    removeClass([popupEle], ['e-popup-open', 'e-popup-close']);
                    detach(popupEle);
                }
            }
            EventHandler.remove(this.getPopUpElement(), 'click', this.clickHandler);
            EventHandler.remove(this.getPopUpElement(), 'keydown', this.keyBoardHandler);
            if (this.isPopupCreated && this.dropDown) {
                this.dropDown.element = null;
                this.dropDown = undefined;
            }
        }
        this.isPopupCreated = false;
        var splitButton = getComponent(this.activeElem[0], 'split-btn');
        if (this.createPopupOnClick && splitButton) {
            var dropDownButton = getComponent(this.activeElem[1], 'dropdown-btn');
            if (dropDownButton) {
                dropDownButton.isPopupCreated = false;
            }
        }
    };
    DropDownButton.prototype.getPopUpElement = function () {
        var val = null;
        if (!this.dropDown && this.activeElem[0].classList.contains('e-split-btn')) {
            var dropDownBtn = getComponent(this.activeElem[1], 'dropdown-btn');
            if (dropDownBtn) {
                this.dropDown = dropDownBtn.dropDown;
            }
        }
        if (this.dropDown) {
            val = this.dropDown.element;
        }
        return val;
    };
    DropDownButton.prototype.getULElement = function () {
        var val = null;
        if (this.getPopUpElement()) {
            val = this.getPopUpElement().children[0];
        }
        return val;
    };
    DropDownButton.prototype.wireEvents = function () {
        this.delegateMousedownHandler = this.mousedownHandler.bind(this);
        if (!this.createPopupOnClick) {
            EventHandler.add(document, 'mousedown touchstart', this.delegateMousedownHandler, this);
        }
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyBoardHandler, this);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.add(window, 'resize', this.windowResize, this);
    };
    DropDownButton.prototype.windowResize = function () {
        if (!this.canOpen() && this.dropDown) {
            this.dropDown.refreshPosition(this.element);
        }
    };
    DropDownButton.prototype.popupWireEvents = function () {
        if (!this.delegateMousedownHandler) {
            this.delegateMousedownHandler = this.mousedownHandler.bind(this);
        }
        var popupElement = this.getPopUpElement();
        if (this.createPopupOnClick) {
            EventHandler.add(document, 'mousedown touchstart', this.delegateMousedownHandler, this);
        }
        if (popupElement) {
            EventHandler.add(popupElement, 'click', this.clickHandler, this);
            EventHandler.add(popupElement, 'keydown', this.keyBoardHandler, this);
            if (this.closeActionEvents) {
                EventHandler.add(popupElement, this.closeActionEvents, this.focusoutHandler, this);
            }
        }
        this.rippleFn = rippleEffect(popupElement, { selector: '.' + classNames.ITEM });
    };
    DropDownButton.prototype.popupUnWireEvents = function () {
        var popupElement = this.getPopUpElement();
        if (this.createPopupOnClick) {
            EventHandler.remove(document, 'mousedown touchstart', this.delegateMousedownHandler);
        }
        if (popupElement && popupElement.parentElement) {
            EventHandler.remove(popupElement, 'click', this.clickHandler);
            EventHandler.remove(popupElement, 'keydown', this.keyBoardHandler);
            if (this.closeActionEvents) {
                EventHandler.remove(popupElement, this.closeActionEvents, this.focusoutHandler);
            }
        }
        if (isRippleEnabled && this.rippleFn) {
            this.rippleFn();
        }
    };
    /**
     * Handles the keyboard interactions.
     *
     * @param {KeyboardEventArgs} e - Specifies keyboard event args.
     * @returns {void}
     * @hidden
     */
    DropDownButton.prototype.keyBoardHandler = function (e) {
        if (e.target === this.element && (e.keyCode === 9 || (!e.altKey && e.keyCode === 40) || e.keyCode === 38)) {
            return;
        }
        switch (e.keyCode) {
            case 38:
            case 40:
                if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
                    this.keyEventHandler(e);
                }
                else {
                    this.upDownKeyHandler(e);
                }
                break;
            case 9:
            case 13:
            case 27:
            case 32:
                this.keyEventHandler(e);
                break;
        }
    };
    DropDownButton.prototype.isSafari = function () {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    };
    DropDownButton.prototype.upDownKeyHandler = function (e) {
        if (this.target && (e.keyCode === 38 || e.keyCode === 40)) {
            return;
        }
        e.preventDefault();
        upDownKeyHandler(this.getULElement(), e.keyCode);
    };
    DropDownButton.prototype.keyEventHandler = function (e) {
        if (this.target && (e.keyCode === 13 || e.keyCode === 9)) {
            return;
        }
        if (e.keyCode === 13 && this.activeElem[0].classList.contains('e-split-btn')) {
            this.triggerSelect(e);
            this.activeElem[0].focus();
            return;
        }
        if (e.target && e.target.className.indexOf('e-edit-template') > -1 && e.keyCode === 32) {
            return;
        }
        if (e.keyCode !== 9) {
            e.preventDefault();
        }
        if (e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 9) {
            if (!this.canOpen()) {
                this.closePopup(e, this.element);
            }
        }
        else {
            this.clickHandler(e);
        }
    };
    DropDownButton.prototype.getLI = function (elem) {
        return elem.tagName === 'LI' ? elem : closest(elem, 'li');
    };
    DropDownButton.prototype.mousedownHandler = function (e) {
        var trgt = e.target;
        if (this.dropDown && !this.canOpen() && this.getPopUpElement() && !(closest(trgt, '[id="' + this.getPopUpElement().id + '"]')
            || closest(trgt, '[id="' + this.element.id + '"]'))) {
            this.closePopup(e);
        }
    };
    DropDownButton.prototype.focusoutHandler = function (e) {
        if (this.isPopupCreated && !this.canOpen()) {
            var liTarget = (e.relatedTarget || e.target);
            if (liTarget && liTarget.className.indexOf('e-item') > -1) {
                var li = this.getLI(liTarget);
                if (li) {
                    var liIdx = Array.prototype.indexOf.call(this.getULElement().children, li);
                    var item = this.items[liIdx];
                    if (item) {
                        var selectEventArgs = { element: li, item: item, event: e };
                        this.trigger('select', selectEventArgs);
                    }
                }
            }
            this.closePopup(e);
        }
    };
    DropDownButton.prototype.clickHandler = function (e) {
        var trgt = e.target;
        if (closest(trgt, '[id="' + this.element.id + '"]')) {
            if (!this.createPopupOnClick || (this.target && this.target !== '' && !this.isColorPicker() && !this.createPopupOnClick)) {
                if (this.getPopUpElement().classList.contains('e-popup-close')) {
                    this.openPopUp(e);
                }
                else {
                    this.closePopup(e);
                }
            }
            else if (this.isPopupCreated) {
                this.closePopup(e, this.activeElem[0]);
            }
            else {
                this.createPopup();
                this.openPopUp(e);
            }
        }
        else {
            if (closest(trgt, '[id="' + this.getPopUpElement().id + '"]')) {
                var li = this.getLI(e.target);
                if (li) {
                    this.triggerSelect(e);
                    this.closePopup(e, this.activeElem[0]);
                }
            }
        }
    };
    DropDownButton.prototype.triggerSelect = function (e) {
        var eventArgs;
        var liIdx;
        var item;
        var li = this.getLI(e.target);
        if (li) {
            liIdx = Array.prototype.indexOf.call(this.getULElement().children, li);
            item = this.items[liIdx];
            if (item) {
                eventArgs = { element: li, item: item, event: e };
                this.trigger('select', eventArgs);
            }
        }
    };
    DropDownButton.prototype.openPopUp = function (e) {
        var _this = this;
        if (e === void 0) { e = null; }
        var popupElem = this.getPopUpElement();
        if (this.activeElem[0] && this.activeElem[0].classList.contains('e-dropdown-btn') && popupElem.style.width && popupElem.style.width !== 'auto') {
            this.setWidth(popupElem);
        }
        if (!this.target) {
            this.createItems(true);
        }
        else {
            if (this.activeElem.length > 1) {
                var splitButton = getComponent(this.activeElem[0], 'split-btn');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (splitButton.isReact && popupElem.childNodes.length < 1) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (splitButton.appendReactElement) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        splitButton.appendReactElement(this.getTargetElement(), this.getPopUpElement());
                    }
                    this.renderReactTemplates();
                }
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (this.isReact && popupElem.childNodes.length < 1) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (this.appendReactElement) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.appendReactElement(this.getTargetElement(), this.getPopUpElement());
                    }
                    this.renderReactTemplates();
                }
            }
        }
        var ul = this.getULElement();
        this.popupWireEvents();
        var beforeOpenArgs = { element: ul, items: this.items, event: e, cancel: false };
        this.trigger('beforeOpen', beforeOpenArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                var ul_1 = _this.getULElement();
                var animationOptions = _this.animationSettings.effect !== 'None' ? {
                    name: _this.animationSettings.effect, duration: _this.animationSettings.duration,
                    timingFunction: _this.animationSettings.easing
                } : null;
                if (animationOptions) {
                    _this.animatePopup(animationOptions, ul_1);
                }
                _this.dropDown.show(null, _this.element);
                addClass([_this.element], 'e-active');
                _this.element.setAttribute('aria-expanded', 'true');
                _this.element.setAttribute('aria-owns', _this.getPopUpElement().id);
                if (ul_1 && !_this.isSafari()) {
                    ul_1.focus();
                }
                if (_this.enableRtl && ul_1.parentElement.style.left !== '0px') {
                    var wrapperWidth = void 0;
                    if (_this.element.parentElement && _this.element.parentElement.classList.contains('e-split-btn-wrapper')) {
                        wrapperWidth = _this.element.parentElement.offsetWidth;
                    }
                    else {
                        wrapperWidth = _this.element.offsetWidth;
                    }
                    var popupRect = ul_1.parentElement.offsetWidth - wrapperWidth;
                    var popupLeft = parseFloat(ul_1.parentElement.style.left) - popupRect;
                    if (popupLeft < 0) {
                        popupLeft = 0;
                    }
                    ul_1.parentElement.style.left = popupLeft + 'px';
                }
                var openArgs = { element: ul_1, items: _this.items };
                _this.trigger('open', openArgs);
                if (ul_1 && _this.isSafari()) {
                    ul_1.focus();
                }
            }
        });
    };
    DropDownButton.prototype.animatePopup = function (animationOptions, element) {
        new Animation(animationOptions).animate(element, {
            begin: function (args) {
                args.element.parentElement.style.height = args.element.parentElement.offsetHeight + 'px';
            }
        });
    };
    DropDownButton.prototype.setWidth = function (popupElem) {
        var width = formatUnit(popupElem.style.width);
        if (width.indexOf('%') > -1) {
            var btnWidth = this.element.offsetWidth * parseFloat(width) / 100;
            popupElem.style.width = btnWidth + "px";
        }
    };
    DropDownButton.prototype.closePopup = function (e, focusEle) {
        var _this = this;
        if (e === void 0) { e = null; }
        var ul = this.getULElement();
        var beforeCloseArgs = { element: ul, items: this.items, event: e, cancel: false };
        this.trigger('beforeClose', beforeCloseArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                var popupElement = _this.getPopUpElement();
                if (popupElement) {
                    EventHandler.remove(popupElement, 'keydown', _this.keyBoardHandler);
                }
                _this.popupUnWireEvents();
                var ul_2 = _this.getULElement();
                var selectedLi = void 0;
                if (ul_2) {
                    selectedLi = ul_2.querySelector('.e-selected');
                }
                if (selectedLi) {
                    selectedLi.classList.remove('e-selected');
                }
                if (_this.dropDown) {
                    _this.dropDown.hide();
                }
                removeClass(_this.activeElem, 'e-active');
                _this.element.setAttribute('aria-expanded', 'false');
                _this.element.removeAttribute('aria-owns');
                if (focusEle) {
                    if (!_this.isSafari()) {
                        focusEle.focus();
                    }
                    else {
                        focusEle.focus({ preventScroll: true });
                    }
                }
                var closeArgs = { element: ul_2, items: _this.items };
                _this.trigger('close', closeArgs);
                if (!_this.target && ul_2) {
                    detach(ul_2);
                }
                if (!_this.target || _this.isColorPicker() || (_this.target && !_this.isColorPicker())) {
                    if (_this.createPopupOnClick) {
                        _this.destroyPopup();
                    }
                }
            }
            else {
                if (ul) {
                    ul.focus();
                }
            }
        });
    };
    DropDownButton.prototype.unWireEvents = function () {
        if (!this.createPopupOnClick) {
            EventHandler.remove(document, 'mousedown touchstart', this.delegateMousedownHandler);
        }
        EventHandler.remove(this.element, 'click', this.clickHandler);
        EventHandler.remove(this.element, 'keydown', this.keyBoardHandler);
        if (this.isPopupCreated) {
            EventHandler.remove(this.getPopUpElement(), 'click', this.clickHandler);
            EventHandler.remove(this.getPopUpElement(), 'keydown', this.keyBoardHandler);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventHandler.remove(window, 'resize', this.windowResize);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {DropDownButtonModel} newProp - Specifies new properties
     * @param  {DropDownButtonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    DropDownButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var btnModel = ['content', 'cssClass', 'iconCss', 'iconPosition', 'disabled', 'enableRtl'];
        this.button.setProperties(getModel(newProp, btnModel));
        var popupElement;
        if (this.isPopupCreated) {
            popupElement = this.getPopUpElement();
            this.dropDown.setProperties(getModel(newProp, ['enableRtl']));
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'content':
                    if (!this.element.querySelector('span.e-caret')) {
                        this.appendArrowSpan();
                    }
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.unWireEvents();
                        if (this.isPopupCreated && !this.canOpen()) {
                            this.closePopup();
                        }
                    }
                    else {
                        this.wireEvents();
                    }
                    break;
                case 'cssClass':
                    oldProp.cssClass = isNullOrUndefined(oldProp.cssClass) ? '' : oldProp.cssClass;
                    if (newProp.cssClass.indexOf(classNames.VERTICAL) > -1 || oldProp.cssClass.indexOf(classNames.VERTICAL) > -1) {
                        if (!this.element.querySelector('span.e-caret')) {
                            this.appendArrowSpan();
                        }
                        var arrowSpan = this.element.querySelector('span.e-caret');
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        newProp.cssClass.indexOf(classNames.VERTICAL) > -1 ? classList(arrowSpan, ['e-icon-bottom'], ['e-icon-right'])
                            : classList(arrowSpan, ['e-icon-right'], ['e-icon-bottom']);
                    }
                    if (this.isPopupCreated) {
                        if (oldProp.cssClass) {
                            removeClass([popupElement], oldProp.cssClass.split(' '));
                        }
                        if (newProp.cssClass) {
                            addClass([popupElement], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                        }
                    }
                    break;
                case 'target':
                    this.dropDown.content = this.getTargetElement();
                    this.dropDown.dataBind();
                    break;
                case 'items':
                    if (this.isPopupCreated && this.getULElement()) {
                        this.createItems();
                    }
                    break;
                case 'createPopupOnClick':
                    if (newProp.createPopupOnClick) {
                        this.destroyPopup();
                    }
                    else {
                        this.createPopup();
                    }
                    break;
            }
        }
    };
    /**
     * Sets the focus to DropDownButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    DropDownButton.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate$1([
        Property('')
    ], DropDownButton.prototype, "content", void 0);
    __decorate$1([
        Property('')
    ], DropDownButton.prototype, "cssClass", void 0);
    __decorate$1([
        Property(false)
    ], DropDownButton.prototype, "disabled", void 0);
    __decorate$1([
        Property('')
    ], DropDownButton.prototype, "iconCss", void 0);
    __decorate$1([
        Property('Left')
    ], DropDownButton.prototype, "iconPosition", void 0);
    __decorate$1([
        Property(true)
    ], DropDownButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate$1([
        Collection([], Item)
    ], DropDownButton.prototype, "items", void 0);
    __decorate$1([
        Property(false)
    ], DropDownButton.prototype, "createPopupOnClick", void 0);
    __decorate$1([
        Property('')
    ], DropDownButton.prototype, "target", void 0);
    __decorate$1([
        Property('')
    ], DropDownButton.prototype, "closeActionEvents", void 0);
    __decorate$1([
        Property(null)
    ], DropDownButton.prototype, "itemTemplate", void 0);
    __decorate$1([
        Property('auto')
    ], DropDownButton.prototype, "popupWidth", void 0);
    __decorate$1([
        Complex({ effect: 'None' }, DropDownMenuAnimationSettings)
    ], DropDownButton.prototype, "animationSettings", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "beforeItemRender", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "beforeOpen", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "beforeClose", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "close", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "open", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "select", void 0);
    __decorate$1([
        Event()
    ], DropDownButton.prototype, "created", void 0);
    DropDownButton = __decorate$1([
        NotifyPropertyChanges
    ], DropDownButton);
    return DropDownButton;
}(Component));

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
var RTL = 'e-rtl';
var TAGNAME = 'EJS-SPLITBUTTON';
/**
 * SplitButton component has primary and secondary button. Primary button is used to select
 * default action and secondary button is used to toggle contextual overlays for displaying list of
 * action items. It can contain both text and images.
 * ```html
 * <button id="element"></button>
 * ```
 * ```typescript
 * <script>
 * var splitBtnObj = new SplitButton({content: 'SplitButton'});
 * splitBtnObj.appendTo("#element");
 * </script>
 * ```
 */
var SplitButton = /** @class */ (function (_super) {
    __extends$2(SplitButton, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {SplitButtonModel} options - Specifies the splitbutton model
     * @param  {string|HTMLButtonElement} element - Specifies the element
     * @hidden
     */
    function SplitButton(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize Angular support.
     *
     * @private
     * @returns {void}
     */
    SplitButton.prototype.preRender = function () {
        var ele = this.element;
        if (ele.tagName === TAGNAME) {
            var ejInstance = getValue('ej2_instances', ele);
            var btn = this.createElement('button', { attrs: { 'type': 'button' } });
            var wrapper = this.createElement(TAGNAME, { className: 'e-' + this.getModuleName() + '-wrapper' });
            for (var idx = 0, len = ele.attributes.length; idx < len; idx++) {
                btn.setAttribute(ele.attributes[idx].nodeName, ele.attributes[idx].nodeValue);
            }
            ele.parentNode.insertBefore(wrapper, ele);
            detach(ele);
            ele = btn;
            wrapper.appendChild(ele);
            setValue('ej2_instances', ejInstance, ele);
            this.wrapper = wrapper;
            this.element = ele;
        }
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * Initialize the Component rendering.
     *
     * @returns {void}
     * @private
     */
    SplitButton.prototype.render = function () {
        this.initWrapper();
        this.createPrimaryButton();
        this.renderControl();
    };
    SplitButton.prototype.renderControl = function () {
        this.createSecondaryButton();
        this.setActiveElem([this.element, this.secondaryBtnObj.element]);
        this.setAria();
        this.wireEvents();
        this.renderComplete();
    };
    /**
     * Adds a new item to the menu. By default, new item appends to the list as the last item,
     * but you can insert based on the text parameter.
     *
     * @param  { ItemModel[] } items - Specifies an array of JSON data.
     * @param { string } text - Specifies the text to insert the newly added item in the menu.
     * @returns {void}.
     */
    SplitButton.prototype.addItems = function (items, text) {
        _super.prototype.addItems.call(this, items, text);
        this.secondaryBtnObj.items = this.items;
    };
    /**
     * Removes the items from the menu.
     *
     * @param  { string[] } items - Specifies an array of string to remove the items.
     * @param { string } isUniqueId - Set `true` if specified items is a collection of unique id.
     * @returns {void}.
     */
    SplitButton.prototype.removeItems = function (items, isUniqueId) {
        _super.prototype.removeItems.call(this, items, isUniqueId);
        this.secondaryBtnObj.items = this.items;
    };
    SplitButton.prototype.initWrapper = function () {
        if (!this.wrapper) {
            this.wrapper = this.createElement('div', { className: 'e-' + this.getModuleName() + '-wrapper' });
            this.element.parentNode.insertBefore(this.wrapper, this.element);
        }
        this.element.classList.remove('e-' + this.getModuleName());
        if (this.enableRtl) {
            this.wrapper.classList.add(RTL);
        }
        if (this.cssClass) {
            addClass([this.wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
    };
    SplitButton.prototype.createPrimaryButton = function () {
        var btnModel = {
            cssClass: this.cssClass,
            enableRtl: this.enableRtl,
            iconCss: this.iconCss,
            iconPosition: this.iconPosition,
            content: this.content,
            disabled: this.disabled
        };
        this.primaryBtnObj = new Button(btnModel);
        this.primaryBtnObj.createElement = this.createElement;
        this.primaryBtnObj.appendTo(this.element);
        this.element.classList.add('e-' + this.getModuleName());
        this.element.type = 'button';
        this.wrapper.appendChild(this.element);
    };
    SplitButton.prototype.createSecondaryButton = function () {
        var _this = this;
        var btnElem = this.createElement('button', {
            className: 'e-icon-btn',
            attrs: { 'tabindex': '-1' },
            id: this.element.id + '_dropdownbtn'
        });
        this.wrapper.appendChild(btnElem);
        var dropDownBtnModel = {
            cssClass: this.cssClass,
            disabled: this.disabled,
            enableRtl: this.enableRtl,
            items: this.items,
            target: this.target,
            createPopupOnClick: this.createPopupOnClick
        };
        dropDownBtnModel.beforeItemRender = function (args) {
            if (_this.createPopupOnClick) {
                _this.secondaryBtnObj.dropDown.relateTo = _this.wrapper;
                _this.dropDown = _this.secondaryBtnObj.dropDown;
            }
            _this.trigger('beforeItemRender', args);
        };
        dropDownBtnModel.open = function (args) {
            _this.trigger('open', args);
        };
        dropDownBtnModel.close = function (args) {
            _this.trigger('close', args);
        };
        dropDownBtnModel.select = function (args) {
            _this.trigger('select', args);
        };
        dropDownBtnModel.beforeOpen = function (args) {
            if (_this.createPopupOnClick && _this.items.length === 0) {
                _this.secondaryBtnObj.dropDown.relateTo = _this.wrapper;
                _this.dropDown = _this.secondaryBtnObj.dropDown;
            }
            var callBackPromise = new Deferred();
            _this.trigger('beforeOpen', args, function (observedArgs) {
                callBackPromise.resolve(observedArgs);
            });
            return callBackPromise;
        };
        dropDownBtnModel.beforeClose = function (args) {
            var callBackPromise = new Deferred();
            _this.trigger('beforeClose', args, function (observedArgs) {
                callBackPromise.resolve(observedArgs);
            });
            return callBackPromise;
        };
        this.secondaryBtnObj = new DropDownButton(dropDownBtnModel);
        this.secondaryBtnObj.createElement = this.createElement;
        this.secondaryBtnObj.appendTo(btnElem);
        if (!this.createPopupOnClick) {
            this.secondaryBtnObj.dropDown.relateTo = this.wrapper;
            this.dropDown = this.secondaryBtnObj.dropDown;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.isPopupCreated = this.secondaryBtnObj.isPopupCreated;
        this.secondaryBtnObj.activeElem = [this.element, this.secondaryBtnObj.element];
        this.secondaryBtnObj.element.querySelector('.e-btn-icon').classList.remove('e-icon-right');
        if (this.disabled) {
            this.wrapper.classList.add('e-splitbtn-disabled');
        }
    };
    SplitButton.prototype.setAria = function () {
        attributes(this.element, {
            'aria-expanded': 'false', 'aria-haspopup': 'true',
            'aria-label': this.element.textContent ? this.element.textContent + ' splitbutton' : 'splitbutton', 'aria-owns': this.element.id + '_dropdownbtn-popup'
        });
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    SplitButton.prototype.getModuleName = function () {
        return 'split-btn';
    };
    /**
     * To open/close SplitButton popup based on current state of the SplitButton.
     *
     * @returns {void}
     */
    SplitButton.prototype.toggle = function () {
        this.secondaryBtnObj.toggle();
    };
    SplitButton.prototype.destroy = function () {
        var _this = this;
        var classList = [RTL];
        if (this.cssClass) {
            classList = classList.concat(this.cssClass.split(' '));
        }
        if (this.element) {
            var element = document.getElementById(this.element.id);
            if (element && element.parentElement === this.wrapper) {
                if (this.wrapper.tagName === TAGNAME) {
                    this.wrapper.innerHTML = '';
                    removeClass([this.wrapper], ['e-rtl', 'e-' + this.getModuleName() + '-wrapper']);
                    removeClass([this.wrapper], this.cssClass.split(' '));
                }
                else {
                    removeClass([this.element], classList);
                    ['aria-label', 'aria-haspopup', 'aria-expanded', 'aria-owns', 'type'].forEach(function (key) {
                        _this.element.removeAttribute(key);
                    });
                    this.wrapper.parentNode.insertBefore(this.element, this.wrapper);
                    remove(this.wrapper);
                }
                this.unWireEvents();
            }
        }
        this.primaryBtnObj.destroy();
        this.secondaryBtnObj.destroy();
        _super.prototype.destroy.call(this);
        if (this.element && !this.element.getAttribute('class')) {
            this.element.removeAttribute('class');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.refreshing && this.isAngular) {
            this.element = this.wrapper;
            ['e-control', 'e-split-btn', 'e-lib'].forEach(function (key) {
                _this.element.classList.add(key);
            });
            setValue('ej2_instances', [this], this.element);
        }
        this.wrapper = null;
    };
    SplitButton.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.primaryBtnClickHandler, this);
        new KeyboardEvents(this.element, {
            keyAction: this.btnKeyBoardHandler.bind(this),
            keyConfigs: {
                altdownarrow: 'alt+downarrow',
                enter: 'enter'
            }
        });
    };
    SplitButton.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.primaryBtnClickHandler);
        getInstance(this.element, KeyboardEvents).destroy();
    };
    SplitButton.prototype.primaryBtnClickHandler = function () {
        this.trigger('click', { element: this.element });
    };
    SplitButton.prototype.btnKeyBoardHandler = function (e) {
        switch (e.action) {
            case 'altdownarrow':
                this.clickHandler(e);
                break;
            case 'enter':
                this.clickHandler(e);
                if (this.getPopUpElement() && !this.getPopUpElement().classList.contains('e-popup-close')) {
                    this.element.classList.remove('e-active');
                    this.secondaryBtnObj.element.classList.add('e-active');
                }
                else {
                    this.secondaryBtnObj.element.classList.remove('e-active');
                }
                break;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SplitButtonModel} newProp - Specifies new properties
     * @param  {SplitButtonModel} oldProp - Specifies old properties
     * @returns {void}
     */
    SplitButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var model = ['content', 'iconCss', 'iconPosition', 'cssClass', 'disabled', 'enableRtl'];
        this.primaryBtnObj.setProperties(getModel(newProp, model));
        model = ['beforeOpen', 'beforeItemRender', 'select', 'open',
            'close', 'cssClass', 'disabled', 'enableRtl', 'createPopupOnClick'];
        if (Object.keys(newProp).indexOf('items') > -1) {
            this.secondaryBtnObj.items = newProp.items;
            this.secondaryBtnObj.dataBind();
        }
        this.secondaryBtnObj.setProperties(getModel(newProp, model));
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.wrapper], oldProp.cssClass.split(' '));
                    }
                    addClass([this.wrapper], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        addClass([this.wrapper], RTL);
                    }
                    else {
                        removeClass([this.wrapper], RTL);
                    }
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        addClass([this.wrapper], 'e-splitbtn-disabled');
                    }
                    else {
                        removeClass([this.wrapper], 'e-splitbtn-disabled');
                    }
            }
        }
    };
    /**
     * Sets the focus to SplitButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    SplitButton.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate$2([
        Property('')
    ], SplitButton.prototype, "content", void 0);
    __decorate$2([
        Property('')
    ], SplitButton.prototype, "cssClass", void 0);
    __decorate$2([
        Property(false)
    ], SplitButton.prototype, "disabled", void 0);
    __decorate$2([
        Property('')
    ], SplitButton.prototype, "iconCss", void 0);
    __decorate$2([
        Property('Left')
    ], SplitButton.prototype, "iconPosition", void 0);
    __decorate$2([
        Property(false)
    ], SplitButton.prototype, "createPopupOnClick", void 0);
    __decorate$2([
        Collection([], Item)
    ], SplitButton.prototype, "items", void 0);
    __decorate$2([
        Property('')
    ], SplitButton.prototype, "target", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "beforeItemRender", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "beforeOpen", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "beforeClose", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "click", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "close", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "open", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "select", void 0);
    __decorate$2([
        Event()
    ], SplitButton.prototype, "created", void 0);
    SplitButton = __decorate$2([
        NotifyPropertyChanges
    ], SplitButton);
    return SplitButton;
}(DropDownButton));
/**
 * Deferred is used to handle asynchronous operation.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        /**
         * Promise is an object that represents a value that may not be available yet, but will be resolved at some point in the future.
         */
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        /**
         * Defines the callback function triggers when the Deferred object is rejected.
         */
        this.catch = this.promise.catch.bind(this.promise);
        /**
         * Defines the callback function triggers when the Deferred object is resolved.
         */
        this.then = this.promise.then.bind(this.promise);
    }
    return Deferred;
}());

/**
 * Initialize ButtonGroup CSS component with specified properties.
 * ```html
 * <div id='buttongroup'>
 * <button></button>
 * <button></button>
 * <button></button>
 * </div>
 * ```
 * ```typescript
 * createButtonGroup('#buttongroup', {
 *   cssClass: 'e-outline',
 *   buttons: [
 *       { content: 'Day' },
 *       { content: 'Week' },
 *       { content: 'Work Week'}
 *   ]
 * });
 * ```
 *
 * @param {string} selector
 * @param {CreateButtonGroupModel} options
 * @returns HTMLElement
 */
/**
 * Creates button group.
 *
 * @param {string} selector - Specifies the selector.
 * @param {CreateButtonGroupModel} options - Specifies the button group model.
 * @param {Function} createElement - Specifies the element.
 * @returns {HTMLElement} - Button group element.
 */
function createButtonGroup(selector, options, createElement$1) {
    if (options === void 0) { options = {}; }
    var child;
    var btnElem;
    var nextChild;
    var btnModel;
    if (isNullOrUndefined(createElement$1)) {
        createElement$1 = createElement;
    }
    var wrapper = document.querySelector(selector);
    addClass([wrapper], ['e-btn-group', 'e-css']);
    wrapper.setAttribute('role', 'group');
    var childs = wrapper.children;
    options.buttons = options.buttons || [];
    for (var i = 0, j = 0; j < childs.length; i++, j++) {
        child = childs[j];
        btnModel = options.buttons[i];
        if (btnModel !== null) {
            if (child.tagName === 'BUTTON') {
                btnElem = child;
            }
            else {
                btnElem = createElement$1('label');
                nextChild = childs[j + 1];
                if (nextChild) {
                    wrapper.insertBefore(btnElem, nextChild);
                }
                else {
                    wrapper.appendChild(btnElem);
                }
                if (child.id) {
                    btnElem.setAttribute('for', child.id);
                }
                if (btnModel && btnModel.disabled) {
                    child.disabled = true;
                }
                j++;
            }
            if (options.cssClass && btnModel && !btnModel.cssClass) {
                btnModel.cssClass = options.cssClass;
            }
            new Button(btnModel || {}, btnElem);
        }
    }
    return wrapper;
}

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
var HIDESPINNER = 'e-hide-spinner';
var PROGRESS = 'e-progress';
var PROGRESSACTIVE = 'e-progress-active';
var CONTENTCLS = 'e-btn-content';
/**
 * Defines the spin settings.
 */
var SpinSettings = /** @class */ (function (_super) {
    __extends$3(SpinSettings, _super);
    function SpinSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property(null)
    ], SpinSettings.prototype, "template", void 0);
    __decorate$3([
        Property(16)
    ], SpinSettings.prototype, "width", void 0);
    __decorate$3([
        Property('Left')
    ], SpinSettings.prototype, "position", void 0);
    return SpinSettings;
}(ChildProperty));
/**
 * Defines the animation settings.
 */
var AnimationSettings = /** @class */ (function (_super) {
    __extends$3(AnimationSettings, _super);
    function AnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property(400)
    ], AnimationSettings.prototype, "duration", void 0);
    __decorate$3([
        Property('None')
    ], AnimationSettings.prototype, "effect", void 0);
    __decorate$3([
        Property('ease')
    ], AnimationSettings.prototype, "easing", void 0);
    return AnimationSettings;
}(ChildProperty));
/**
 * The ProgressButton visualizes the progression of an operation to indicate the user
 * that a process is happening in the background with visual representation.
 * ```html
 * <button id="element"></button>
 * ```
 * ```typescript
 * <script>
 * var progressButtonObj = new ProgressButton({ content: 'Progress Button' });
 * progressButtonObj.appendTo("#element");
 * </script>
 * ```
 */
var ProgressButton = /** @class */ (function (_super) {
    __extends$3(ProgressButton, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param  {ProgressButtonModel} options - Specifies progress button model
     * @param  {string|HTMLButtonElement} element - Specifies element
     */
    function ProgressButton(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.step = 1;
        return _this;
    }
    ProgressButton.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
    };
    /**
     * Initialize the Component rendering
     *
     * @returns {void}
     * @private
     */
    ProgressButton.prototype.render = function () {
        _super.prototype.render.call(this);
        this.init();
        this.wireEvents();
        this.setAria();
        this.renderComplete();
    };
    /**
     * Starts the button progress at the specified percent.
     *
     * @param {number} percent - Starts the button progress at this percent.
     * @returns {void}
     */
    ProgressButton.prototype.start = function (percent) {
        this.isPaused = false;
        this.startProgress(percent ? percent : this.percent, this.progressTime);
    };
    /**
     * Stops the button progress.
     *
     * @returns {void}
     */
    ProgressButton.prototype.stop = function () {
        this.isPaused = true;
        cancelAnimationFrame(this.timerId);
    };
    /**
     * Complete the button progress.
     *
     * @returns {void}
     */
    ProgressButton.prototype.progressComplete = function () {
        this.isPaused = false;
        this.finishProgress();
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    ProgressButton.prototype.getModuleName = function () {
        return 'progress-btn';
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    ProgressButton.prototype.destroy = function () {
        var _this = this;
        var classList = [HIDESPINNER, PROGRESSACTIVE, 'e-round-corner', 'e-' + _super.prototype.getModuleName.call(this)];
        if (this.spinSettings.position) {
            classList.push('e-spin-' + this.spinSettings.position.toLowerCase());
        }
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.element.innerHTML = '';
        if (this.cssClass) {
            classList = classList.concat(this.cssClass.split(' '));
        }
        removeClass([this.element], classList);
        var css = this.element.getAttribute('class') ? ['aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow']
            : ['aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'class'];
        css.forEach(function (key) {
            _this.element.removeAttribute(key);
        });
        if (this.disabled) {
            this.element.removeAttribute('disabled');
        }
    };
    ProgressButton.prototype.init = function () {
        this.element.classList.add('e-' + _super.prototype.getModuleName.call(this));
        this.setContent();
        this.createSpinner();
        if (this.enableProgress) {
            this.createProgress();
        }
    };
    ProgressButton.prototype.createSpinner = function () {
        var spinner = this.createElement('span', { className: 'e-spinner' });
        this.setSpinPosition(spinner);
        createSpinner({
            target: spinner, width: this.spinSettings.width || 16, template: this.spinSettings.template
        }, this.createElement);
    };
    ProgressButton.prototype.getSpinner = function () {
        return this.element.getElementsByClassName('e-spinner')[0];
    };
    ProgressButton.prototype.getProgress = function () {
        return this.element.getElementsByClassName(PROGRESS)[0];
    };
    ProgressButton.prototype.setSpinPosition = function (ele) {
        var position = this.spinSettings.position || 'Left';
        if (position === 'Left' || position === 'Top') {
            this.element.insertBefore(ele, this.element.getElementsByClassName(CONTENTCLS)[0]);
        }
        else {
            this.element.appendChild(ele);
        }
        this.element.classList.add('e-spin-' + position.toLowerCase());
    };
    ProgressButton.prototype.createProgress = function () {
        this.element.appendChild(this.createElement('span', { className: PROGRESS }));
    };
    ProgressButton.prototype.setContent = function () {
        var cont;
        cont = this.element.innerHTML;
        if (this.enableHtmlSanitizer) {
            cont = SanitizeHtmlHelper.sanitize(this.element.innerHTML);
        }
        this.element.innerHTML = '';
        this.element.appendChild(this.createElement('span', { className: CONTENTCLS, innerHTML: cont }));
    };
    ProgressButton.prototype.clickHandler = function () {
        if (this.element.classList.contains(PROGRESSACTIVE)) {
            return;
        }
        this.startProgress();
    };
    ProgressButton.prototype.startProgress = function (percent, progressTime) {
        var clsList = this.element.classList;
        var isVertical = clsList.contains('e-vertical');
        clsList.add(PROGRESSACTIVE);
        if (!(clsList.contains(HIDESPINNER))) {
            showSpinner(this.element.querySelector('.e-spinner'));
        }
        this.startAnimate(Date.now(), progressTime ? progressTime : 0, progressTime ? Date.now() - (this.duration * 1 / 100) : Date.now(), percent ? percent : 0, 0, this.step, 0, isVertical);
        this.startContAnimate();
    };
    ProgressButton.prototype.startAnimate = function (timestamp, progressTime, prevTime, percent, prevPercent, step, prevProgressTime, isVertical) {
        var _this = this;
        try {
            var timeDiff = timestamp - prevTime;
            var stepTime = this.duration * step / 100;
            var timeDiffBuffer_1 = timeDiff ? (timeDiff < stepTime ? timeDiff - stepTime : timeDiff % stepTime) : 0;
            this.progressTime = progressTime = progressTime + timeDiff - timeDiffBuffer_1;
            prevTime = timestamp - timeDiffBuffer_1;
            percent = percent + (timeDiff - timeDiffBuffer_1) / this.duration * 100;
            prevPercent = ((progressTime - prevProgressTime) % stepTime === 0 || percent === 100) ? percent : prevPercent;
            var args = { percent: prevPercent, currentDuration: progressTime, step: step };
            this.eIsVertical = isVertical;
            if (percent === 0) {
                this.trigger('begin', args, function (observedArgs) {
                    _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
                });
            }
            else if (percent === 100 || progressTime === this.duration) {
                this.trigger('end', args, function (observedArgs) {
                    _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
                });
            }
            else {
                this.trigger('progress', args, function (observedArgs) {
                    _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
                });
            }
        }
        catch (e) {
            cancelAnimationFrame(this.timerId);
            this.trigger('fail', e);
        }
    };
    ProgressButton.prototype.successCallback = function (args, perc, pPerc, prgTim, pPrgTim, timDif, pTim) {
        var _this = this;
        var percent = perc;
        var prevPercent = pPerc;
        var timeDiffBuffer = timDif;
        var progressTime = prgTim;
        var prevProgressTime = pPrgTim;
        var prevTime = pTim;
        var isVertical = this.eIsVertical;
        if (percent !== args.percent && args.percent !== prevPercent) {
            percent = args.percent;
        }
        this.percent = percent;
        this.step = args.step;
        if ((progressTime - prevProgressTime) % (this.duration * args.step / 100) === 0 || percent === 100) {
            this.timerId = requestAnimationFrame(function () {
                if (_this.enableProgress && _this.getProgress()) {
                    _this.getProgress().style[isVertical ? 'height' : 'width'] = percent + '%';
                }
                _this.element.setAttribute('aria-valuenow', percent.toString());
            });
            prevPercent = percent;
            prevProgressTime = progressTime;
        }
        if (!this.isPaused) {
            if (progressTime < this.duration && percent < 100) {
                this.interval = window.setTimeout(function () {
                    _this.startAnimate(Date.now(), progressTime, prevTime, percent, prevPercent, args.step, prevProgressTime, isVertical);
                }, (this.duration / 100) - timeDiffBuffer);
            }
            else {
                this.interval = window.setTimeout(function () {
                    _this.progressTime = _this.percent = 0;
                    if (_this.enableProgress && _this.getProgress()) {
                        _this.getProgress().style[isVertical ? 'height' : 'width'] = '0%';
                    }
                    _this.element.setAttribute('aria-valuenow', '0');
                    _this.hideSpin();
                }, 100);
            }
        }
    };
    ProgressButton.prototype.startContAnimate = function () {
        var _this = this;
        var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
        if (this.animationSettings.effect !== 'None') {
            (new Animation({})).animate(ele, {
                duration: (this.animationSettings.duration === 0 && animationMode === 'Enable') ? 400 : this.animationSettings.duration,
                name: 'Progress' + this.animationSettings.effect,
                timingFunction: this.animationSettings.easing,
                begin: function () {
                    if (_this.spinSettings.position === 'Center') {
                        _this.setSpinnerSize();
                    }
                },
                end: function () {
                    ele.classList.add('e-animate-end');
                }
            });
        }
        else if (this.spinSettings.position === 'Center') {
            this.setSpinnerSize();
        }
    };
    ProgressButton.prototype.finishProgress = function () {
        var clsList = this.element.classList;
        var isVertical = clsList.contains('e-vertical');
        clsList.add(PROGRESSACTIVE);
        var count = 100;
        for (var i = this.percent; i < count; i++) {
            i += 10;
            if (i > 100) {
                i = 100;
            }
            if (this.enableProgress && this.getProgress()) {
                this.getProgress().style[isVertical ? 'height' : 'width'] = (this.percent < 100) ? (i + '%') : '100%';
            }
        }
        this.element.setAttribute('aria-valuenow', '0');
        this.hideSpin();
        var args = { step: this.step, currentDuration: this.progressTime, percent: 100 };
        clearTimeout(this.interval);
        this.trigger('end', args);
        this.progressTime = this.percent = 0;
    };
    ProgressButton.prototype.setSpinnerSize = function () {
        var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
        var spinner = this.getSpinner();
        spinner.style.width = Math.max(spinner.offsetWidth, ele.offsetWidth) + 'px';
        spinner.style.height = Math.max(spinner.offsetHeight, ele.offsetHeight) + 'px';
        ele.classList.add('e-cont-animate');
    };
    ProgressButton.prototype.hideSpin = function () {
        var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
        if (!(this.element.classList.contains(HIDESPINNER))) {
            hideSpinner(this.element.querySelector('.e-spinner'));
        }
        this.element.classList.remove(PROGRESSACTIVE);
        if (this.animationSettings.effect !== 'None') {
            cont.classList.remove('e-animate-end');
        }
        if (this.spinSettings.position === 'Center') {
            var ele = this.getSpinner();
            cont.classList.remove('e-cont-animate');
            ele.style.width = 'auto';
            ele.style.height = 'auto';
        }
    };
    ProgressButton.prototype.setIconSpan = function () {
        var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
        var iconSpan = this.element.getElementsByClassName('e-btn-icon')[0];
        if (cont.childNodes[0] && (this.iconPosition === 'Left' || this.iconPosition === 'Top')) {
            cont.insertBefore(iconSpan, cont.childNodes[0]);
        }
        else {
            cont.appendChild(iconSpan);
        }
    };
    ProgressButton.prototype.setAria = function () {
        attributes(this.element, {
            'aria-label': this.element.textContent + ' progress'
        });
    };
    ProgressButton.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.clickHandler, this);
    };
    ProgressButton.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.clickHandler);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {ProgressButtonModel} newProp - Specifies new properties
     * @param  {ProgressButtonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    ProgressButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var ele = this.element;
        var isSpinning = false;
        var clsList = this.element.querySelector('.e-spinner-pane').classList;
        if (clsList.contains('e-spin-show')) {
            isSpinning = true;
        }
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'content':
                    this.setContent();
                    this.createSpinner();
                    if (isSpinning) {
                        showSpinner(this.element.querySelector('.e-spinner'));
                        isSpinning = false;
                    }
                    if (this.enableProgress) {
                        this.createProgress();
                    }
                    ele.setAttribute('aria-label', ele.textContent + ' progress');
                    break;
                case 'iconCss':
                    if (!oldProp.iconCss) {
                        this.setIconSpan();
                    }
                    break;
                case 'iconPosition':
                    this.setIconSpan();
                    break;
                case 'enableProgress':
                    if (newProp.enableProgress) {
                        this.createProgress();
                    }
                    else {
                        remove(this.getProgress());
                    }
                    break;
                case 'spinSettings':
                    if (newProp.spinSettings.position) {
                        ele.classList.remove('e-spin-' + oldProp.spinSettings.position.toLowerCase());
                        this.setSpinPosition(this.getSpinner());
                    }
                    if (newProp.spinSettings.template || newProp.spinSettings.width) {
                        ele.removeChild(this.getSpinner());
                        this.createSpinner();
                    }
                    break;
            }
        }
    };
    /**
     * Sets the focus to ProgressButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    ProgressButton.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate$3([
        Property(false)
    ], ProgressButton.prototype, "enableProgress", void 0);
    __decorate$3([
        Property(2000)
    ], ProgressButton.prototype, "duration", void 0);
    __decorate$3([
        Property('Left')
    ], ProgressButton.prototype, "iconPosition", void 0);
    __decorate$3([
        Property('')
    ], ProgressButton.prototype, "iconCss", void 0);
    __decorate$3([
        Property(false)
    ], ProgressButton.prototype, "disabled", void 0);
    __decorate$3([
        Property(false)
    ], ProgressButton.prototype, "isPrimary", void 0);
    __decorate$3([
        Property('')
    ], ProgressButton.prototype, "cssClass", void 0);
    __decorate$3([
        Property('')
    ], ProgressButton.prototype, "content", void 0);
    __decorate$3([
        Property(false)
    ], ProgressButton.prototype, "isToggle", void 0);
    __decorate$3([
        Property(true)
    ], ProgressButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate$3([
        Complex({}, SpinSettings)
    ], ProgressButton.prototype, "spinSettings", void 0);
    __decorate$3([
        Complex({}, AnimationSettings)
    ], ProgressButton.prototype, "animationSettings", void 0);
    __decorate$3([
        Event()
    ], ProgressButton.prototype, "created", void 0);
    __decorate$3([
        Event()
    ], ProgressButton.prototype, "begin", void 0);
    __decorate$3([
        Event()
    ], ProgressButton.prototype, "progress", void 0);
    __decorate$3([
        Event()
    ], ProgressButton.prototype, "end", void 0);
    __decorate$3([
        Event()
    ], ProgressButton.prototype, "fail", void 0);
    ProgressButton = __decorate$3([
        NotifyPropertyChanges
    ], ProgressButton);
    return ProgressButton;
}(Button));

export { AnimationSettings, Deferred, DropDownButton, DropDownMenuAnimationSettings, Item, ProgressButton, SpinSettings, SplitButton, createButtonGroup, getModel, setBlankIconStyle, upDownKeyHandler };
//# sourceMappingURL=ej2-splitbuttons.es5.js.map
