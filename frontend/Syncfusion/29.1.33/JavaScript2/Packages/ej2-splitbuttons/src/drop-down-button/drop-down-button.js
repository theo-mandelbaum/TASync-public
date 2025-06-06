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
import { Collection, Event, NotifyPropertyChanges, detach, Property, EventHandler, isRippleEnabled, isNullOrUndefined, append, formatUnit, Animation } from '@syncfusion/ej2-base';
import { addClass, getUniqueID, rippleEffect, getComponent, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { attributes, Component, closest, select, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { classList, removeClass, compile } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { upDownKeyHandler } from './../common/common';
import { getModel, Item, setBlankIconStyle } from './../common/common';
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
    __extends(DropDownMenuAnimationSettings, _super);
    function DropDownMenuAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('SlideDown')
    ], DropDownMenuAnimationSettings.prototype, "effect", void 0);
    __decorate([
        Property(400)
    ], DropDownMenuAnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property('ease')
    ], DropDownMenuAnimationSettings.prototype, "easing", void 0);
    return DropDownMenuAnimationSettings;
}(ChildProperty));
export { DropDownMenuAnimationSettings };
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
    __extends(DropDownButton, _super);
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
        var isReact = false;
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
                    isReact = true;
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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    isReact = true;
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
    __decorate([
        Property('')
    ], DropDownButton.prototype, "content", void 0);
    __decorate([
        Property('')
    ], DropDownButton.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], DropDownButton.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], DropDownButton.prototype, "iconCss", void 0);
    __decorate([
        Property('Left')
    ], DropDownButton.prototype, "iconPosition", void 0);
    __decorate([
        Property(true)
    ], DropDownButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Collection([], Item)
    ], DropDownButton.prototype, "items", void 0);
    __decorate([
        Property(false)
    ], DropDownButton.prototype, "createPopupOnClick", void 0);
    __decorate([
        Property('')
    ], DropDownButton.prototype, "target", void 0);
    __decorate([
        Property('')
    ], DropDownButton.prototype, "closeActionEvents", void 0);
    __decorate([
        Property(null)
    ], DropDownButton.prototype, "itemTemplate", void 0);
    __decorate([
        Property('auto')
    ], DropDownButton.prototype, "popupWidth", void 0);
    __decorate([
        Complex({ effect: 'None' }, DropDownMenuAnimationSettings)
    ], DropDownButton.prototype, "animationSettings", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "beforeItemRender", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "close", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "open", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "select", void 0);
    __decorate([
        Event()
    ], DropDownButton.prototype, "created", void 0);
    DropDownButton = __decorate([
        NotifyPropertyChanges
    ], DropDownButton);
    return DropDownButton;
}(Component));
export { DropDownButton };
