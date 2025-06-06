import { isNullOrUndefined, createElement, addClass, attributes, removeClass, formatUnit, remove, detach, classList, closest, getValue, setValue, L10n, getUniqueID, Internationalization, EventHandler, Browser, merge, getNumericObject, Property, Event, NotifyPropertyChanges, Component, extend, ChildProperty, setStyleAttribute, SanitizeHtmlHelper, initializeCSPTemplate, Collection, Complex, onIntlChange, select, selectAll, Base, KeyboardEvents, Ajax, append, Animation, compile, rippleEffect, getInstance } from '@syncfusion/ej2-base';
import { Tooltip, getZindexPartial, createSpinner, showSpinner, hideSpinner, isCollide, Popup } from '@syncfusion/ej2-popups';
import { SplitButton, Deferred, getModel } from '@syncfusion/ej2-splitbuttons';
import { Button } from '@syncfusion/ej2-buttons';

/* eslint-disable valid-jsdoc, jsdoc/require-jsdoc, jsdoc/require-returns, jsdoc/require-param */
var CLASSNAMES = {
    RTL: 'e-rtl',
    DISABLE: 'e-disabled',
    INPUT: 'e-input',
    TEXTAREA: 'e-multi-line-input',
    INPUTGROUP: 'e-input-group',
    FLOATINPUT: 'e-float-input',
    FLOATLINE: 'e-float-line',
    FLOATTEXT: 'e-float-text',
    FLOATTEXTCONTENT: 'e-float-text-content',
    CLEARICON: 'e-clear-icon',
    CLEARICONHIDE: 'e-clear-icon-hide',
    LABELTOP: 'e-label-top',
    LABELBOTTOM: 'e-label-bottom',
    NOFLOATLABEL: 'e-no-float-label',
    INPUTCUSTOMTAG: 'e-input-custom-tag',
    FLOATCUSTOMTAG: 'e-float-custom-tag'
};
/**
 * Defines the constant attributes for the input element container.
 */
var containerAttributes = ['title', 'style', 'class'];
/**
 * Defines the constant focus class for the input element.
 */
var TEXTBOX_FOCUS = 'e-input-focus';
/**
 * Base for Input creation through util methods.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var Input;
(function (Input) {
    var floatType;
    var isBindClearAction = true;
    /**
     * Create a wrapper to input element with multiple span elements and set the basic properties to input based components.
     * ```
     * E.g : Input.createInput({ element: element, floatLabelType : "Auto", properties: { placeholder: 'Search' } });
     * ```
     *
     */
    function createInput(args, internalCreateElement) {
        args.element.__eventHandlers = {};
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        var inputObject = { container: null, buttons: [], clearButton: null };
        floatType = args.floatLabelType;
        isBindClearAction = args.bindClearAction;
        if (isNullOrUndefined(args.floatLabelType) || args.floatLabelType === 'Never') {
            inputObject.container = createInputContainer(args, CLASSNAMES.INPUTGROUP, CLASSNAMES.INPUTCUSTOMTAG, 'span', makeElement);
            args.element.parentNode.insertBefore(inputObject.container, args.element);
            addClass([args.element], CLASSNAMES.INPUT);
            inputObject.container.appendChild(args.element);
        }
        else {
            createFloatingInput(args, inputObject, makeElement);
        }
        bindInitialEvent(args);
        if (!isNullOrUndefined(args.properties) && !isNullOrUndefined(args.properties.showClearButton) &&
            args.properties.showClearButton) {
            setClearButton(args.properties.showClearButton, args.element, inputObject, true, makeElement);
            inputObject.clearButton.setAttribute('role', 'button');
            if (inputObject.container.classList.contains(CLASSNAMES.FLOATINPUT)) {
                addClass([inputObject.container], CLASSNAMES.INPUTGROUP);
            }
        }
        if (!isNullOrUndefined(args.buttons)) {
            for (var i = 0; i < args.buttons.length; i++) {
                inputObject.buttons.push(appendSpan(args.buttons[i], inputObject.container, makeElement));
            }
        }
        if (!isNullOrUndefined(args.element) && args.element.tagName === 'TEXTAREA') {
            addClass([inputObject.container], CLASSNAMES.TEXTAREA);
        }
        validateInputType(inputObject.container, args.element);
        inputObject = setPropertyValue(args, inputObject);
        createSpanElement(inputObject.container, makeElement);
        return inputObject;
    }
    Input.createInput = createInput;
    function bindFocusEventHandler(args) {
        var parent = getParentNode(args.element);
        if (parent.classList.contains('e-input-group') || parent.classList.contains('e-outline') || parent.classList.contains('e-filled')) {
            parent.classList.add('e-input-focus');
        }
        if (args.floatLabelType !== 'Never') {
            setTimeout(function () {
                Input.calculateWidth(args.element, parent);
            }, 80);
        }
    }
    function bindBlurEventHandler(args) {
        var parent = getParentNode(args.element);
        if (parent.classList.contains('e-input-group') || parent.classList.contains('e-outline') || parent.classList.contains('e-filled')) {
            parent.classList.remove('e-input-focus');
        }
        if (args.floatLabelType !== 'Never') {
            setTimeout(function () {
                Input.calculateWidth(args.element, parent);
            }, 80);
        }
    }
    function bindInputEventHandler(args) {
        checkInputValue(args.floatLabelType, args.element);
    }
    function bindInitialEvent(args) {
        checkInputValue(args.floatLabelType, args.element);
        var focusHandler = function () { return bindFocusEventHandler(args); };
        var blurHandler = function () { return bindBlurEventHandler(args); };
        var inputHandler = function () { return bindInputEventHandler(args); };
        args.element.addEventListener('focus', focusHandler);
        args.element.addEventListener('blur', blurHandler);
        args.element.addEventListener('input', inputHandler);
        args.element.__eventHandlers['inputFocusHandler'] = { focusHandler: focusHandler };
        args.element.__eventHandlers['inputBlurHandler'] = { blurHandler: blurHandler };
        args.element.__eventHandlers['inputHandler'] = { inputHandler: inputHandler };
    }
    Input.bindInitialEvent = bindInitialEvent;
    function unbindInitialEvent(args) {
        if (!isNullOrUndefined(args.element)) {
            if (!isNullOrUndefined(args.element.__eventHandlers)) {
                if (!isNullOrUndefined(args.element.__eventHandlers['inputFocusHandler'])
                    && !isNullOrUndefined(args.element.__eventHandlers['inputBlurHandler'])
                    && !isNullOrUndefined(args.element.__eventHandlers['inputHandler'])) {
                    var focusHandler_1 = args.element.__eventHandlers['inputFocusHandler'].focusHandler;
                    var blurHandler_1 = args.element.__eventHandlers['inputBlurHandler'].blurHandler;
                    var inputHandler_1 = args.element.__eventHandlers['inputHandler'].inputHandler;
                    args.element.removeEventListener('focus', focusHandler_1);
                    args.element.removeEventListener('blur', blurHandler_1);
                    args.element.removeEventListener('input', inputHandler_1);
                    // Clean up stored bound functions
                    delete args.element.__eventHandlers['inputFocusHandler'];
                    delete args.element.__eventHandlers['inputBlurHandler'];
                    delete args.element.__eventHandlers['inputHandler'];
                }
            }
        }
    }
    function checkInputValue(floatLabelType, inputElement) {
        var inputValue = inputElement.value;
        var inputParent = inputElement.parentElement;
        var grandParent = inputParent && inputParent.parentElement;
        if (inputValue !== '' && !isNullOrUndefined(inputValue)) {
            if (inputParent && inputParent.classList.contains('e-input-group')) {
                inputParent.classList.add('e-valid-input');
            }
            else if (grandParent && grandParent.classList.contains('e-input-group')) {
                grandParent.classList.add('e-valid-input');
            }
        }
        else if (floatLabelType !== 'Always') {
            if (inputParent && inputParent.classList.contains('e-input-group')) {
                inputParent.classList.remove('e-valid-input');
            }
            else if (grandParent && grandParent.classList.contains('e-input-group')) {
                grandParent.classList.remove('e-valid-input');
            }
        }
    }
    function _focusFn() {
        var label = getParentNode(this).getElementsByClassName('e-float-text')[0];
        if (!isNullOrUndefined(label)) {
            addClass([label], CLASSNAMES.LABELTOP);
            if (label.classList.contains(CLASSNAMES.LABELBOTTOM)) {
                removeClass([label], CLASSNAMES.LABELBOTTOM);
            }
        }
    }
    function _blurFn() {
        var parent = getParentNode(this);
        if ((parent.getElementsByTagName('textarea')[0]) ? parent.getElementsByTagName('textarea')[0].value === '' :
            parent.getElementsByTagName('input')[0].value === '') {
            var label = parent.getElementsByClassName('e-float-text')[0];
            if (!isNullOrUndefined(label)) {
                if (label.classList.contains(CLASSNAMES.LABELTOP)) {
                    removeClass([label], CLASSNAMES.LABELTOP);
                }
                addClass([label], CLASSNAMES.LABELBOTTOM);
            }
        }
    }
    function wireFloatingEvents(element) {
        element.addEventListener('focus', _focusFn);
        element.addEventListener('blur', _blurFn);
    }
    Input.wireFloatingEvents = wireFloatingEvents;
    function unwireFloatingEvents(element) {
        if (!isNullOrUndefined(element)) {
            element.removeEventListener('focus', _focusFn);
            element.removeEventListener('blur', _blurFn);
        }
    }
    function inputEventHandler(args) {
        validateLabel(args.element, args.floatLabelType);
    }
    function blurEventHandler(args) {
        validateLabel(args.element, args.floatLabelType);
    }
    function createFloatingInput(args, inputObject, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        if (args.floatLabelType === 'Auto') {
            wireFloatingEvents(args.element);
        }
        if (isNullOrUndefined(inputObject.container)) {
            inputObject.container = createInputContainer(args, CLASSNAMES.FLOATINPUT, CLASSNAMES.FLOATCUSTOMTAG, 'div', makeElement);
            inputObject.container.classList.add(CLASSNAMES.INPUTGROUP);
            if (args.element.parentNode) {
                args.element.parentNode.insertBefore(inputObject.container, args.element);
            }
        }
        else {
            if (!isNullOrUndefined(args.customTag)) {
                inputObject.container.classList.add(CLASSNAMES.FLOATCUSTOMTAG);
            }
            inputObject.container.classList.add(CLASSNAMES.FLOATINPUT);
        }
        var floatLinelement = makeElement('span', { className: CLASSNAMES.FLOATLINE });
        var floatLabelElement = makeElement('label', { className: CLASSNAMES.FLOATTEXT });
        if (!isNullOrUndefined(args.element.id) && args.element.id !== '') {
            floatLabelElement.id = 'label_' + args.element.id.replace(/ /g, '_');
            attributes(args.element, { 'aria-labelledby': floatLabelElement.id });
        }
        if (!isNullOrUndefined(args.element.placeholder) && args.element.placeholder !== '') {
            floatLabelElement.innerText = encodePlaceHolder(args.element.placeholder);
            args.element.removeAttribute('placeholder');
        }
        if (!isNullOrUndefined(args.properties) && !isNullOrUndefined(args.properties.placeholder) &&
            args.properties.placeholder !== '') {
            floatLabelElement.innerText = encodePlaceHolder(args.properties.placeholder);
        }
        if (!floatLabelElement.innerText) {
            inputObject.container.classList.add(CLASSNAMES.NOFLOATLABEL);
        }
        if (inputObject.container.classList.contains('e-float-icon-left')) {
            var inputWrap = inputObject.container.querySelector('.e-input-in-wrap');
            inputWrap.appendChild(args.element);
            inputWrap.appendChild(floatLinelement);
            inputWrap.appendChild(floatLabelElement);
        }
        else {
            inputObject.container.appendChild(args.element);
            inputObject.container.appendChild(floatLinelement);
            inputObject.container.appendChild(floatLabelElement);
        }
        updateLabelState(args.element.value, floatLabelElement);
        if (args.floatLabelType === 'Always') {
            if (floatLabelElement.classList.contains(CLASSNAMES.LABELBOTTOM)) {
                removeClass([floatLabelElement], CLASSNAMES.LABELBOTTOM);
            }
            addClass([floatLabelElement], CLASSNAMES.LABELTOP);
        }
        if (args.floatLabelType === 'Auto') {
            var inputFloatHandler = function () { return inputEventHandler(args); };
            var blurFloatHandler = function () { return blurEventHandler(args); };
            // Add event listeners using the defined functions
            args.element.addEventListener('input', inputFloatHandler);
            args.element.addEventListener('blur', blurFloatHandler);
            // Store the event handler functions to remove them later
            args.element.__eventHandlers['floatInputHandler'] = { inputFloatHandler: inputFloatHandler };
            args.element.__eventHandlers['floatBlurHandler'] = { blurFloatHandler: blurFloatHandler };
        }
        else {
            unWireFloatLabelEvents(args);
        }
        if (!isNullOrUndefined(args.element.getAttribute('id'))) {
            floatLabelElement.setAttribute('for', args.element.getAttribute('id'));
        }
    }
    function unWireFloatLabelEvents(args) {
        if (!isNullOrUndefined(args.element) &&
            !isNullOrUndefined(args.element.__eventHandlers)
            && !isNullOrUndefined(args.element.__eventHandlers['floatInputHandler'])
            && !isNullOrUndefined(args.element.__eventHandlers['floatBlurHandler'])) {
            var inputFloatHandler = args.element.__eventHandlers['floatInputHandler'].inputFloatHandler;
            var blurFloatHandler = args.element.__eventHandlers['floatBlurHandler'].blurFloatHandler;
            // Remove the event listeners using the defined functions
            args.element.removeEventListener('input', inputFloatHandler);
            args.element.removeEventListener('blur', blurFloatHandler);
            // Clean up stored event handler functions
            delete args.element.__eventHandlers['floatInputHandler'];
            delete args.element.__eventHandlers['floatBlurHandler'];
        }
    }
    function checkFloatLabelType(type, container) {
        if (type === 'Always' && container.classList.contains('e-outline')) {
            container.classList.add('e-valid-input');
        }
    }
    function setPropertyValue(args, inputObject) {
        if (!isNullOrUndefined(args.properties)) {
            for (var _i = 0, _a = Object.keys(args.properties); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'cssClass':
                        setCssClass(args.properties.cssClass, [inputObject.container]);
                        checkFloatLabelType(args.floatLabelType, inputObject.container);
                        break;
                    case 'enabled':
                        setEnabled(args.properties.enabled, args.element, args.floatLabelType, inputObject.container);
                        break;
                    case 'enableRtl':
                        setEnableRtl(args.properties.enableRtl, [inputObject.container]);
                        break;
                    case 'placeholder':
                        setPlaceholder(args.properties.placeholder, args.element);
                        break;
                    case 'readonly':
                        setReadonly(args.properties.readonly, args.element);
                        break;
                }
            }
        }
        return inputObject;
    }
    function updateIconState(value, button, readonly) {
        if (!isNullOrUndefined(button)) {
            if (value && !readonly) {
                removeClass([button], CLASSNAMES.CLEARICONHIDE);
            }
            else {
                addClass([button], CLASSNAMES.CLEARICONHIDE);
            }
        }
    }
    function updateLabelState(value, label, element) {
        if (element === void 0) { element = null; }
        if (value) {
            addClass([label], CLASSNAMES.LABELTOP);
            if (label.classList.contains(CLASSNAMES.LABELBOTTOM)) {
                removeClass([label], CLASSNAMES.LABELBOTTOM);
            }
        }
        else {
            var isNotFocused = element != null ? element !== document.activeElement : true;
            if (isNotFocused) {
                if (label.classList.contains(CLASSNAMES.LABELTOP)) {
                    removeClass([label], CLASSNAMES.LABELTOP);
                }
                addClass([label], CLASSNAMES.LABELBOTTOM);
            }
        }
    }
    function getParentNode(element) {
        var parentNode = isNullOrUndefined(element.parentNode) ? element
            : element.parentNode;
        if (parentNode && parentNode.classList.contains('e-input-in-wrap')) {
            parentNode = parentNode.parentNode;
        }
        return parentNode;
    }
    /**
     * To create clear button.
     */
    function createClearButton(element, inputObject, initial, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        var button = makeElement('span', { className: CLASSNAMES.CLEARICON });
        var container = inputObject.container;
        if (!isNullOrUndefined(initial)) {
            container.appendChild(button);
        }
        else {
            var baseElement = inputObject.container.classList.contains(CLASSNAMES.FLOATINPUT) ?
                inputObject.container.querySelector('.' + CLASSNAMES.FLOATTEXT) : element;
            baseElement.insertAdjacentElement('afterend', button);
        }
        addClass([button], CLASSNAMES.CLEARICONHIDE);
        wireClearBtnEvents(element, button);
        button.setAttribute('aria-label', 'close');
        return button;
    }
    function clickHandler(event, element, button) {
        if (!(element.classList.contains(CLASSNAMES.DISABLE) || element.readOnly)) {
            event.preventDefault();
            if (element !== document.activeElement) {
                element.focus();
            }
            element.value = '';
            addClass([button], CLASSNAMES.CLEARICONHIDE);
        }
    }
    function inputHandler(element, button) {
        updateIconState(element.value, button);
    }
    function focusHandler(element, button) {
        updateIconState(element.value, button, element.readOnly);
    }
    function blurHandler(element, button) {
        setTimeout(function () {
            if (!isNullOrUndefined(button)) {
                addClass([button], CLASSNAMES.CLEARICONHIDE);
                button = !isNullOrUndefined(element) && element.classList.contains('e-combobox') ? null : button;
            }
        }, 200);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function wireClearBtnEvents(element, button, container) {
        if (isBindClearAction === undefined || isBindClearAction) {
            var clickHandlerEvent = function (e) { return clickHandler(e, element, button); };
            button.addEventListener('click', clickHandlerEvent);
            element.__eventHandlers['clearClickHandler'] = { clickHandlerEvent: clickHandlerEvent };
        }
        var inputHandlerEvent = function () { return inputHandler(element, button); };
        var focusHandlerEvent = function () { return focusHandler(element, button); };
        var blurHandlerEvent = function () { return blurHandler(element, button); };
        element.addEventListener('input', inputHandlerEvent);
        element.addEventListener('focus', focusHandlerEvent);
        element.addEventListener('blur', blurHandlerEvent);
        // Store the bound functions to remove them later
        element.__eventHandlers['clearInputHandler'] = { inputHandlerEvent: inputHandlerEvent };
        element.__eventHandlers['clearFocusHandler'] = { focusHandlerEvent: focusHandlerEvent };
        element.__eventHandlers['clearBlurHandler'] = { blurHandlerEvent: blurHandlerEvent };
    }
    Input.wireClearBtnEvents = wireClearBtnEvents;
    function unWireClearBtnEvents(element, button) {
        if (!isNullOrUndefined(element) &&
            !isNullOrUndefined(element.__eventHandlers)) {
            if (!isNullOrUndefined(element.__eventHandlers['clearClickHandler'])) {
                var clickHandlerEvent = element.__eventHandlers['clearClickHandler'].clickHandlerEvent;
                if (isBindClearAction === undefined || isBindClearAction) {
                    if (!isNullOrUndefined(button)) {
                        button.removeEventListener('click', clickHandlerEvent);
                    }
                }
                delete element.__eventHandlers['clearClickHandler'];
            }
            if (!isNullOrUndefined(element.__eventHandlers['clearInputHandler'])
                && !isNullOrUndefined(element.__eventHandlers['clearFocusHandler'])
                && !isNullOrUndefined(element.__eventHandlers['clearBlurHandler'])) {
                var inputHandlerEvent = element.__eventHandlers['clearInputHandler'].inputHandlerEvent;
                var focusHandlerEvent = element.__eventHandlers['clearFocusHandler'].focusHandlerEvent;
                var blurHandlerEvent = element.__eventHandlers['clearBlurHandler'].blurHandlerEvent;
                element.removeEventListener('input', inputHandlerEvent);
                element.removeEventListener('focus', focusHandlerEvent);
                element.removeEventListener('blur', blurHandlerEvent);
                // Clean up stored Event functions
                delete element.__eventHandlers['clearInputHandler'];
                delete element.__eventHandlers['clearFocusHandler'];
                delete element.__eventHandlers['clearBlurHandler'];
            }
        }
    }
    function destroy(args, button) {
        if (button === void 0) { button = null; }
        unbindInitialEvent(args);
        if (args.floatLabelType === 'Auto') {
            unWireFloatLabelEvents(args);
        }
        if (args.properties.showClearButton) {
            unWireClearBtnEvents(args.element, button);
        }
        if (!isNullOrUndefined(args.buttons)) {
            _internalRipple(false, null, args.buttons);
        }
        unwireFloatingEvents(args.element);
        if (!isNullOrUndefined(args.element)) {
            delete args.element.__eventHandlers;
            if (args.element.classList.contains(CLASSNAMES.INPUT)) {
                args.element.classList.remove(CLASSNAMES.INPUT);
            }
        }
    }
    Input.destroy = destroy;
    function validateLabel(element, floatLabelType) {
        var parent = getParentNode(element);
        if (parent.classList.contains(CLASSNAMES.FLOATINPUT) && floatLabelType === 'Auto') {
            var label = getParentNode(element).getElementsByClassName('e-float-text')[0];
            updateLabelState(element.value, label, element);
        }
    }
    /**
     * To create input box contianer.
     */
    function createInputContainer(args, className, tagClass, tag, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        var container;
        if (!isNullOrUndefined(args.customTag)) {
            container = makeElement(args.customTag, { className: className });
            container.classList.add(tagClass);
        }
        else {
            container = makeElement(tag, { className: className });
        }
        container.classList.add('e-control-wrapper');
        return container;
    }
    function encodePlaceHolder(placeholder) {
        var result = '';
        if (!isNullOrUndefined(placeholder) && placeholder !== '') {
            var spanEle = document.createElement('span');
            spanEle.innerHTML = '<input  placeholder="' + placeholder + '"/>';
            var hiddenInput = (spanEle.children[0]);
            result = hiddenInput.placeholder;
        }
        return result;
    }
    /**
     * Sets the value to the input element.
     * ```
     * E.g : Input.setValue('content', element, "Auto", true );
     * ```
     *
     * @param {string} value - Specify the value of the input element.
     * @param {HTMLInputElement | HTMLTextAreaElement} element - The element on which the specified value is updated.
     * @param {string} floatLabelType - Specify the float label type of the input element.
     * @param {boolean} clearButton - Boolean value to specify whether the clear icon is enabled / disabled on the input.
     */
    function setValue(value, element, floatLabelType, clearButton) {
        element.value = value;
        if (floatLabelType !== 'Never') {
            calculateWidth(element, element.parentElement);
        }
        if ((!isNullOrUndefined(floatLabelType)) && floatLabelType === 'Auto') {
            validateLabel(element, floatLabelType);
        }
        if (!isNullOrUndefined(clearButton) && clearButton) {
            var parentElement = getParentNode(element);
            if (!isNullOrUndefined(parentElement)) {
                var button = parentElement.getElementsByClassName(CLASSNAMES.CLEARICON)[0];
                if (!isNullOrUndefined(button)) {
                    if (element.value && !isNullOrUndefined(parentElement) && parentElement.classList.contains('e-input-focus')) {
                        removeClass([button], CLASSNAMES.CLEARICONHIDE);
                    }
                    else {
                        addClass([button], CLASSNAMES.CLEARICONHIDE);
                    }
                }
            }
        }
        checkInputValue(floatLabelType, element);
    }
    Input.setValue = setValue;
    /**
     * Sets the single or multiple cssClass to wrapper of input element.
     * ```
     * E.g : Input.setCssClass('e-custom-class', [element]);
     * ```
     *
     * @param {string} cssClass - Css class names which are needed to add.
     * @param {Element[] | NodeList} elements - The elements which are needed to add / remove classes.
     * @param {string} oldClass
     * - Css class names which are needed to remove. If old classes are need to remove, can give this optional parameter.
     */
    function setCssClass(cssClass, elements, oldClass) {
        if (!isNullOrUndefined(oldClass) && oldClass !== '') {
            removeClass(elements, oldClass.split(' '));
        }
        if (!isNullOrUndefined(cssClass) && cssClass !== '') {
            addClass(elements, cssClass.split(' '));
        }
    }
    Input.setCssClass = setCssClass;
    /**
     * Set the width to the placeholder when it overflows on the button such as spinbutton, clearbutton, icon etc
     * ```
     * E.g : Input.calculateWidth(element, container);
     * ```
     *
     * @param {any} element - Input element which is need to add.
     * @param {HTMLElement} container - The parent element which is need to get the label span to calculate width
     */
    function calculateWidth(element, container, moduleName) {
        if (moduleName !== 'multiselect' && !_isElementVisible(element)) {
            return;
        }
        var elementWidth = moduleName === 'multiselect' ? element : element.clientWidth - parseInt(getComputedStyle(element, null).getPropertyValue('padding-left'), 10);
        if (!isNullOrUndefined(container) && !isNullOrUndefined(container.getElementsByClassName('e-float-text-content')[0])) {
            if (container.getElementsByClassName('e-float-text-content')[0].classList.contains('e-float-text-overflow')) {
                container.getElementsByClassName('e-float-text-content')[0].classList.remove('e-float-text-overflow');
            }
            if (elementWidth < container.getElementsByClassName('e-float-text-content')[0].clientWidth || elementWidth === container.getElementsByClassName('e-float-text-content')[0].clientWidth) {
                container.getElementsByClassName('e-float-text-content')[0].classList.add('e-float-text-overflow');
            }
        }
    }
    Input.calculateWidth = calculateWidth;
    /**
     * Set the width to the wrapper of input element.
     * ```
     * E.g : Input.setWidth('200px', container);
     * ```
     *
     * @param {number | string} width - Width value which is need to add.
     * @param {HTMLElement} container - The element on which the width is need to add.
     */
    function setWidth(width, container) {
        if (typeof width === 'number') {
            container.style.width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            container.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
        }
        calculateWidth(container.firstChild, container);
    }
    Input.setWidth = setWidth;
    /**
     * Set the placeholder attribute to the input element.
     * ```
     * E.g : Input.setPlaceholder('Search here', element);
     * ```
     *
     * @param {string} placeholder - Placeholder value which is need to add.
     * @param {HTMLInputElement | HTMLTextAreaElement} element - The element on which the placeholder is need to add.
     */
    function setPlaceholder(placeholder, element) {
        placeholder = encodePlaceHolder(placeholder);
        var parentElement = getParentNode(element);
        if (parentElement.classList.contains(CLASSNAMES.FLOATINPUT)) {
            if (!isNullOrUndefined(placeholder) && placeholder !== '') {
                var floatTextContent = parentElement.getElementsByClassName('e-float-text-content')[0];
                if (floatTextContent && floatTextContent.children[0]) {
                    floatTextContent.children[0].textContent = placeholder;
                }
                else {
                    parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = placeholder;
                }
                parentElement.classList.remove(CLASSNAMES.NOFLOATLABEL);
                element.removeAttribute('placeholder');
            }
            else {
                parentElement.classList.add(CLASSNAMES.NOFLOATLABEL);
                var floatTextContent = parentElement.getElementsByClassName('e-float-text-content')[0];
                if (floatTextContent) {
                    floatTextContent.children[0].textContent = '';
                }
                else {
                    parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = '';
                }
            }
        }
        else {
            if (!isNullOrUndefined(placeholder) && placeholder !== '') {
                attributes(element, { 'placeholder': placeholder });
            }
            else {
                element.removeAttribute('placeholder');
            }
        }
    }
    Input.setPlaceholder = setPlaceholder;
    /**
     * Set the read only attribute to the input element
     * ```
     * E.g : Input.setReadonly(true, element);
     * ```
     *
     * @param {boolean} isReadonly
     * - Boolean value to specify whether to set read only. Setting "True" value enables read only.
     * @param {HTMLInputElement | HTMLTextAreaElement} element
     * - The element which is need to enable read only.
     */
    function setReadonly(isReadonly, element, floatLabelType) {
        if (isReadonly) {
            attributes(element, { readonly: '' });
        }
        else {
            element.removeAttribute('readonly');
        }
        if (!isNullOrUndefined(floatLabelType)) {
            validateLabel(element, floatLabelType);
        }
    }
    Input.setReadonly = setReadonly;
    /**
     * Displays the element direction from right to left when its enabled.
     * ```
     * E.g : Input.setEnableRtl(true, [inputObj.container]);
     * ```
     *
     * @param {boolean} isRtl
     * - Boolean value to specify whether to set RTL. Setting "True" value enables the RTL mode.
     * @param {Element[] | NodeList} elements
     * - The elements that are needed to enable/disable RTL.
     */
    function setEnableRtl(isRtl, elements) {
        if (isRtl) {
            addClass(elements, CLASSNAMES.RTL);
        }
        else {
            removeClass(elements, CLASSNAMES.RTL);
        }
    }
    Input.setEnableRtl = setEnableRtl;
    /**
     * Enables or disables the given input element.
     * ```
     * E.g : Input.setEnabled(false, element);
     * ```
     *
     * @param {boolean} isEnable
     * - Boolean value to specify whether to enable or disable.
     * @param {HTMLInputElement | HTMLTextAreaElement} element
     * - Element to be enabled or disabled.
     */
    function setEnabled(isEnable, element, floatLabelType, inputContainer) {
        var disabledAttrs = { 'disabled': '', 'aria-disabled': 'true' };
        var considerWrapper = isNullOrUndefined(inputContainer) ? false : true;
        if (isEnable) {
            element.classList.remove(CLASSNAMES.DISABLE);
            removeAttributes(disabledAttrs, element);
            if (considerWrapper) {
                removeClass([inputContainer], CLASSNAMES.DISABLE);
            }
        }
        else {
            element.classList.add(CLASSNAMES.DISABLE);
            addAttributes(disabledAttrs, element);
            if (considerWrapper) {
                addClass([inputContainer], CLASSNAMES.DISABLE);
            }
        }
        if (!isNullOrUndefined(floatLabelType)) {
            validateLabel(element, floatLabelType);
        }
    }
    Input.setEnabled = setEnabled;
    function setClearButton(isClear, element, inputObject, initial, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        if (isClear) {
            inputObject.clearButton = createClearButton(element, inputObject, initial, makeElement);
        }
        else {
            remove(inputObject.clearButton);
            inputObject.clearButton = null;
        }
    }
    Input.setClearButton = setClearButton;
    /**
     * Removing the multiple attributes from the given element such as "disabled","id" , etc.
     * ```
     * E.g : Input.removeAttributes({ 'disabled': 'disabled', 'aria-disabled': 'true' }, element);
     * ```
     *
     * @param {string} attrs
     * - Array of attributes which are need to removed from the element.
     * @param {HTMLInputElement | HTMLElement} element
     * - Element on which the attributes are needed to be removed.
     */
    function removeAttributes(attrs, element) {
        for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
            var key = _a[_i];
            var parentElement = getParentNode(element);
            if (key === 'disabled') {
                element.classList.remove(CLASSNAMES.DISABLE);
            }
            if (key === 'disabled' && parentElement.classList.contains(CLASSNAMES.INPUTGROUP)) {
                parentElement.classList.remove(CLASSNAMES.DISABLE);
            }
            if (key === 'placeholder' && parentElement.classList.contains(CLASSNAMES.FLOATINPUT)) {
                parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = '';
            }
            else {
                element.removeAttribute(key);
            }
        }
    }
    Input.removeAttributes = removeAttributes;
    /**
     * Adding the multiple attributes to the given element such as "disabled","id" , etc.
     * ```
     * E.g : Input.addAttributes({ 'id': 'inputpopup' }, element);
     * ```
     *
     * @param {string} attrs
     * - Array of attributes which is added to element.
     * @param {HTMLInputElement | HTMLElement} element
     * - Element on which the attributes are needed to be added.
     */
    function addAttributes(attrs, element) {
        for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
            var key = _a[_i];
            var parentElement = getParentNode(element);
            if (key === 'disabled') {
                element.classList.add(CLASSNAMES.DISABLE);
            }
            if (key === 'disabled' && parentElement.classList.contains(CLASSNAMES.INPUTGROUP)) {
                parentElement.classList.add(CLASSNAMES.DISABLE);
            }
            if (key === 'placeholder' && parentElement.classList.contains(CLASSNAMES.FLOATINPUT)) {
                parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = attrs["" + key];
            }
            else {
                element.setAttribute(key, attrs["" + key]);
            }
        }
    }
    Input.addAttributes = addAttributes;
    function removeFloating(input) {
        var container = input.container;
        if (!isNullOrUndefined(container) && container.classList.contains(CLASSNAMES.FLOATINPUT)) {
            var inputEle = container.querySelector('textarea') ? container.querySelector('textarea') :
                container.querySelector('input');
            var placeholder = container.querySelector('.' + CLASSNAMES.FLOATTEXT).textContent;
            var clearButton = container.querySelector('.e-clear-icon') !== null;
            detach(container.querySelector('.' + CLASSNAMES.FLOATLINE));
            detach(container.querySelector('.' + CLASSNAMES.FLOATTEXT));
            classList(container, [CLASSNAMES.INPUTGROUP], [CLASSNAMES.FLOATINPUT]);
            unwireFloatingEvents(inputEle);
            attributes(inputEle, { 'placeholder': placeholder });
            inputEle.classList.add(CLASSNAMES.INPUT);
            if (!clearButton && inputEle.tagName === 'INPUT') {
                inputEle.removeAttribute('required');
            }
        }
    }
    Input.removeFloating = removeFloating;
    function addFloating(input, type, placeholder, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        var container = closest(input, '.' + CLASSNAMES.INPUTGROUP);
        floatType = type;
        var customTag = container.tagName;
        customTag = customTag !== 'DIV' && customTag !== 'SPAN' ? customTag : null;
        var args = { element: input, floatLabelType: type,
            customTag: customTag, properties: { placeholder: placeholder } };
        if (type !== 'Never') {
            var iconEle = container.querySelector('.e-clear-icon');
            var inputObj = { container: container };
            input.classList.remove(CLASSNAMES.INPUT);
            createFloatingInput(args, inputObj, makeElement);
            createSpanElement(inputObj.container, makeElement);
            calculateWidth(args.element, inputObj.container);
            var isPrependIcon = container.classList.contains('e-float-icon-left');
            if (isNullOrUndefined(iconEle)) {
                if (isPrependIcon) {
                    var inputWrap = container.querySelector('.e-input-in-wrap');
                    iconEle = inputWrap.querySelector('.e-input-group-icon');
                }
                else {
                    iconEle = container.querySelector('.e-input-group-icon');
                }
            }
            if (isNullOrUndefined(iconEle)) {
                if (isPrependIcon) {
                    iconEle = container.querySelector('.e-input-group-icon');
                }
            }
            else {
                var floatLine = container.querySelector('.' + CLASSNAMES.FLOATLINE);
                var floatText = container.querySelector('.' + CLASSNAMES.FLOATTEXT);
                var wrapper = isPrependIcon ? container.querySelector('.e-input-in-wrap') : container;
                wrapper.insertBefore(input, iconEle);
                wrapper.insertBefore(floatLine, iconEle);
                wrapper.insertBefore(floatText, iconEle);
            }
        }
        else {
            unWireFloatLabelEvents(args);
        }
        checkFloatLabelType(type, input.parentElement);
    }
    Input.addFloating = addFloating;
    /**
     * Create the span inside the label and add the label text into the span textcontent
     * ```
     * E.g : Input.createSpanElement(inputObject, makeElement);
     * ```
     *
     * @param {Element} inputObject
     * - Element which is need to get the label
     * @param {createElementParams} makeElement
     * - Element which is need to create the span
     */
    function createSpanElement(inputObject, makeElement) {
        if (inputObject.classList.contains('e-outline') && inputObject.getElementsByClassName('e-float-text')[0]) {
            var labelSpanElement = makeElement('span', { className: CLASSNAMES.FLOATTEXTCONTENT });
            labelSpanElement.innerHTML = inputObject.getElementsByClassName('e-float-text')[0].innerHTML;
            inputObject.getElementsByClassName('e-float-text')[0].innerHTML = '';
            inputObject.getElementsByClassName('e-float-text')[0].appendChild(labelSpanElement);
        }
    }
    Input.createSpanElement = createSpanElement;
    /**
     * Enable or Disable the ripple effect on the icons inside the Input. Ripple effect is only applicable for material theme.
     * ```
     * E.g : Input.setRipple(true, [inputObjects]);
     * ```
     *
     * @param {boolean} isRipple
     * - Boolean value to specify whether to enable the ripple effect.
     * @param {InputObject[]} inputObj
     * - Specify the collection of input objects.
     */
    function setRipple(isRipple, inputObj) {
        for (var i = 0; i < inputObj.length; i++) {
            _internalRipple(isRipple, inputObj[parseInt(i.toString(), 10)].container);
        }
    }
    Input.setRipple = setRipple;
    function _internalRipple(isRipple, container, button) {
        var argsButton = [];
        argsButton.push(button);
        var buttons = isNullOrUndefined(button) ?
            container.querySelectorAll('.e-input-group-icon') : argsButton;
        if (isRipple && buttons.length > 0) {
            for (var index = 0; index < buttons.length; index++) {
                buttons[parseInt(index.toString(), 10)].addEventListener('mousedown', _onMouseDownRipple, false);
                buttons[parseInt(index.toString(), 10)].addEventListener('mouseup', _onMouseUpRipple, false);
            }
        }
        else if (buttons.length > 0) {
            for (var index = 0; index < buttons.length; index++) {
                buttons[parseInt(index.toString(), 10)].removeEventListener('mousedown', _onMouseDownRipple, this);
                buttons[parseInt(index.toString(), 10)].removeEventListener('mouseup', _onMouseUpRipple, this);
            }
        }
    }
    function _onMouseRipple(container, button) {
        if (!container.classList.contains('e-disabled') && !container.querySelector('input').readOnly) {
            button.classList.add('e-input-btn-ripple');
        }
    }
    function _isElementVisible(element) {
        if (!element) {
            return false;
        }
        // Check if the element or any of its parents are hidden using display: none
        var currentElement = element;
        while (currentElement && currentElement !== document.body) {
            var style = window.getComputedStyle(currentElement);
            if (style.display === 'none') {
                return false;
            }
            currentElement = currentElement.parentElement;
        }
        // If none of the elements have display: none, the element is considered visible
        return true;
    }
    function _onMouseDownRipple() {
        var ele =  this;
        var parentEle = this.parentElement;
        while (!parentEle.classList.contains('e-input-group')) {
            parentEle = parentEle.parentElement;
        }
        _onMouseRipple(parentEle, ele);
    }
    function _onMouseUpRipple() {
        var ele =  this;
        setTimeout(function () {
            ele.classList.remove('e-input-btn-ripple');
        }, 500);
    }
    function createIconEle(iconClass, makeElement) {
        var button = makeElement('span', { className: iconClass });
        button.classList.add('e-input-group-icon');
        return button;
    }
    /**
     * Creates a new span element with the given icons added and append it in container element.
     * ```
     * E.g : Input.addIcon('append', 'e-icon-spin', inputObj.container, inputElement);
     * ```
     *
     * @param {string} position - Specify the icon placement on the input.Possible values are append and prepend.
     * @param {string | string[]} icons - Icon classes which are need to add to the span element which is going to created.
     * Span element acts as icon or button element for input.
     * @param {HTMLElement} container - The container on which created span element is going to append.
     * @param {HTMLElement} input - The inputElement on which created span element is going to prepend.
     */
    function addIcon(position, icons, container, input, internalCreate) {
        var result = typeof (icons) === 'string' ? icons.split(',')
            : icons;
        if (position.toLowerCase() === 'append') {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var icon = result_1[_i];
                appendSpan(icon, container, internalCreate);
            }
        }
        else {
            for (var _a = 0, result_2 = result; _a < result_2.length; _a++) {
                var icon = result_2[_a];
                prependSpan(icon, container, input, internalCreate);
            }
        }
        if (container.getElementsByClassName('e-input-group-icon')[0] && container.getElementsByClassName('e-float-text-overflow')[0]) {
            container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
    }
    Input.addIcon = addIcon;
    /**
     * Creates a new span element with the given icons added and prepend it in input element.
     * ```
     * E.g : Input.prependSpan('e-icon-spin', inputObj.container, inputElement);
     * ```
     *
     * @param {string} iconClass - Icon classes which are need to add to the span element which is going to created.
     * Span element acts as icon or button element for input.
     * @param {HTMLElement} container - The container on which created span element is going to append.
     * @param {HTMLElement} inputElement - The inputElement on which created span element is going to prepend.
     */
    function prependSpan(iconClass, container, inputElement, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        var button = createIconEle(iconClass, makeElement);
        container.classList.add('e-float-icon-left');
        var innerWrapper = container.querySelector('.e-input-in-wrap');
        if (isNullOrUndefined(innerWrapper)) {
            innerWrapper = makeElement('span', { className: 'e-input-in-wrap' });
            inputElement.parentNode.insertBefore(innerWrapper, inputElement);
            var result = container.querySelectorAll(inputElement.tagName + ' ~ *');
            innerWrapper.appendChild(inputElement);
            for (var i = 0; i < result.length; i++) {
                var element = result[parseInt(i.toString(), 10)];
                var parentElement = innerWrapper.parentElement;
                if (!(element.classList.contains('e-float-line')) || (!(parentElement && parentElement.classList.contains('e-filled')) && parentElement)) {
                    innerWrapper.appendChild(element);
                }
            }
        }
        innerWrapper.parentNode.insertBefore(button, innerWrapper);
        _internalRipple(true, container, button);
        return button;
    }
    Input.prependSpan = prependSpan;
    /**
     * Creates a new span element with the given icons added and append it in container element.
     * ```
     * E.g : Input.appendSpan('e-icon-spin', inputObj.container);
     * ```
     *
     * @param {string} iconClass - Icon classes which are need to add to the span element which is going to created.
     * Span element acts as icon or button element for input.
     * @param {HTMLElement} container - The container on which created span element is going to append.
     */
    function appendSpan(iconClass, container, internalCreateElement) {
        var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
        var button = createIconEle(iconClass, makeElement);
        var wrap = (container.classList.contains('e-float-icon-left')) ? container.querySelector('.e-input-in-wrap') :
            container;
        wrap.appendChild(button);
        _internalRipple(true, container, button);
        return button;
    }
    Input.appendSpan = appendSpan;
    function validateInputType(containerElement, input) {
        if (input.type === 'hidden') {
            containerElement.classList.add('e-hidden');
        }
        else if (containerElement.classList.contains('e-hidden')) {
            containerElement.classList.remove('e-hidden');
        }
    }
    Input.validateInputType = validateInputType;
    function updateHTMLAttributesToElement(htmlAttributes, element) {
        if (!isNullOrUndefined(htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (containerAttributes.indexOf(key) < 0) {
                    element.setAttribute(key, htmlAttributes["" + key]);
                }
            }
        }
    }
    Input.updateHTMLAttributesToElement = updateHTMLAttributesToElement;
    function updateCssClass(newClass, oldClass, container) {
        setCssClass(getInputValidClassList(newClass), [container], getInputValidClassList(oldClass));
    }
    Input.updateCssClass = updateCssClass;
    function getInputValidClassList(inputClassName) {
        var result = inputClassName;
        if (!isNullOrUndefined(inputClassName) && inputClassName !== '') {
            result = (inputClassName.replace(/\s+/g, ' ')).trim();
        }
        return result;
    }
    Input.getInputValidClassList = getInputValidClassList;
    function updateHTMLAttributesToWrapper(htmlAttributes, container) {
        if (!isNullOrUndefined(htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (containerAttributes.indexOf(key) > -1) {
                    if (key === 'class') {
                        var updatedClassValues = this.getInputValidClassList(htmlAttributes["" + key]);
                        if (updatedClassValues !== '') {
                            addClass([container], updatedClassValues.split(' '));
                        }
                    }
                    else if (key === 'style') {
                        var setStyle = container.getAttribute(key);
                        setStyle = !isNullOrUndefined(setStyle) ? (setStyle + htmlAttributes["" + key]) :
                            htmlAttributes["" + key];
                        container.setAttribute(key, setStyle);
                    }
                    else {
                        container.setAttribute(key, htmlAttributes["" + key]);
                    }
                }
            }
        }
    }
    Input.updateHTMLAttributesToWrapper = updateHTMLAttributesToWrapper;
    function isBlank(inputString) {
        return (!inputString || /^\s*$/.test(inputString));
    }
    Input.isBlank = isBlank;
})(Input || (Input = {}));
/* eslint-enable valid-jsdoc, jsdoc/require-jsdoc, jsdoc/require-returns, jsdoc/require-param */

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
var ROOT = 'e-control-wrapper e-numeric';
var SPINICON = 'e-input-group-icon';
var SPINUP = 'e-spin-up';
var SPINDOWN = 'e-spin-down';
var ERROR = 'e-error';
var INCREMENT = 'increment';
var DECREMENT = 'decrement';
var INTREGEXP = new RegExp('^(-)?(\\d*)$');
var DECIMALSEPARATOR = '.';
var COMPONENT = 'e-numerictextbox';
var CONTROL = 'e-control';
var NUMERIC_FOCUS = 'e-input-focus';
var HIDDENELEMENT = 'e-numeric-hidden';
var wrapperAttributes = ['title', 'style', 'class'];
var selectionTimeOut = 0;
/**
 * Represents the NumericTextBox component that allows the user to enter only numeric values.
 * ```html
 * <input type='text' id="numeric"/>
 * ```
 * ```typescript
 * <script>
 *   var numericObj = new NumericTextBox({ value: 10 });
 *   numericObj.appendTo("#numeric");
 * </script>
 * ```
 */
var NumericTextBox = /** @class */ (function (_super) {
    __extends(NumericTextBox, _super);
    /**
     *
     * @param {NumericTextBoxModel} options - Specifies the NumericTextBox model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function NumericTextBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.preventChange = false;
        _this.isDynamicChange = false;
        _this.numericOptions = options;
        return _this;
    }
    NumericTextBox.prototype.preRender = function () {
        this.isPrevFocused = false;
        this.decimalSeparator = '.';
        // eslint-disable-next-line no-useless-escape
        this.intRegExp = new RegExp('/^(-)?(\d*)$/');
        this.isCalled = false;
        var ejInstance = getValue('ej2_instances', this.element);
        this.cloneElement = this.element.cloneNode(true);
        removeClass([this.cloneElement], [CONTROL, COMPONENT, 'e-lib']);
        this.angularTagName = null;
        this.formEle = closest(this.element, 'form');
        if (this.element.tagName === 'EJS-NUMERICTEXTBOX') {
            this.angularTagName = this.element.tagName;
            var input = this.createElement('input');
            var index = 0;
            for (index; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (attributeName !== 'id' && attributeName !== 'class') {
                    input.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
                    input.innerHTML = this.element.innerHTML;
                }
                else if (attributeName === 'class') {
                    input.setAttribute(attributeName, this.element.className.split(' ').filter(function (item) { return item.indexOf('ng-') !== 0; }).join(' '));
                }
            }
            if (this.element.hasAttribute('name')) {
                this.element.removeAttribute('name');
            }
            this.element.classList.remove('e-control', 'e-numerictextbox');
            this.element.appendChild(input);
            this.element = input;
            setValue('ej2_instances', ejInstance, this.element);
        }
        attributes(this.element, { 'role': 'spinbutton', 'tabindex': '0', 'autocomplete': 'off' });
        var localeText = {
            incrementTitle: 'Increment value', decrementTitle: 'Decrement value', placeholder: this.placeholder
        };
        this.l10n = new L10n('numerictextbox', localeText, this.locale);
        if (this.l10n.getConstant('placeholder') !== '') {
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (!this.element.hasAttribute('id')) {
            this.element.setAttribute('id', getUniqueID('numerictextbox'));
        }
        this.isValidState = true;
        this.inputStyle = null;
        this.inputName = null;
        this.cultureInfo = {};
        this.initCultureInfo();
        this.initCultureFunc();
        this.prevValue = this.value;
        this.updateHTMLAttrToElement();
        this.checkAttributes(false);
        if (this.formEle) {
            this.inputEleValue = this.value;
        }
        this.validateMinMax();
        this.validateStep();
        if (this.placeholder === null) {
            this.updatePlaceholder();
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    NumericTextBox.prototype.render = function () {
        if (this.element.tagName.toLowerCase() === 'input') {
            this.createWrapper();
            if (this.showSpinButton) {
                this.spinBtnCreation();
            }
            this.setElementWidth(this.width);
            if (!this.container.classList.contains('e-input-group')) {
                this.container.classList.add('e-input-group');
            }
            this.changeValue(this.value === null || isNaN(this.value) ?
                null : this.strictMode ? this.trimValue(this.value) : this.value);
            this.wireEvents();
            if (this.value !== null && !isNaN(this.value)) {
                if (this.decimals) {
                    this.setProperties({ value: this.roundNumber(this.value, this.decimals) }, true);
                }
            }
            if (this.element.getAttribute('value') || this.value) {
                this.element.setAttribute('value', this.element.value);
                this.hiddenInput.setAttribute('value', this.hiddenInput.value);
            }
            this.elementPrevValue = this.element.value;
            if (this.element.hasAttribute('data-val')) {
                this.element.setAttribute('data-val', 'false');
            }
            if (!this.element.hasAttribute('aria-labelledby') && !this.element.hasAttribute('placeholder') && !this.element.hasAttribute('aria-label')) {
                this.element.setAttribute('aria-label', 'numerictextbox');
            }
            if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
                this.enabled = false;
            }
            this.renderComplete();
        }
    };
    NumericTextBox.prototype.checkAttributes = function (isDynamic) {
        var attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['value', 'min', 'max', 'step', 'disabled', 'readonly', 'style', 'name', 'placeholder'];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.element.getAttribute(prop) === 'disabled' || this.element.getAttribute(prop) === ''
                                || this.element.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.element.getAttribute(prop) === 'readonly' || this.element.getAttribute(prop) === ''
                                || this.element.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['value'] === undefined)) || isDynamic) {
                            var setNumber = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            this.setProperties(setValue(prop, setNumber, {}), !isDynamic);
                        }
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['min'] === undefined)) || isDynamic) {
                            var minValue = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if (minValue !== null && !isNaN(minValue)) {
                                this.setProperties(setValue(prop, minValue, {}), !isDynamic);
                            }
                        }
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['max'] === undefined)) || isDynamic) {
                            var maxValue = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if (maxValue !== null && !isNaN(maxValue)) {
                                this.setProperties(setValue(prop, maxValue, {}), !isDynamic);
                            }
                        }
                        break;
                    case 'step':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['step'] === undefined)) || isDynamic) {
                            var stepValue = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if (stepValue !== null && !isNaN(stepValue)) {
                                this.setProperties(setValue(prop, stepValue, {}), !isDynamic);
                            }
                        }
                        break;
                    case 'style':
                        this.inputStyle = this.element.getAttribute(prop);
                        break;
                    case 'name':
                        this.inputName = this.element.getAttribute(prop);
                        break;
                    default:
                        {
                            var value = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if ((value !== null && !isNaN(value)) || (prop === 'value')) {
                                this.setProperties(setValue(prop, value, {}), true);
                            }
                        }
                        break;
                }
            }
        }
    };
    NumericTextBox.prototype.updatePlaceholder = function () {
        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
    };
    NumericTextBox.prototype.initCultureFunc = function () {
        this.instance = new Internationalization(this.locale);
    };
    NumericTextBox.prototype.initCultureInfo = function () {
        this.cultureInfo.format = this.format;
        if (getValue('currency', this) !== null) {
            setValue('currency', this.currency, this.cultureInfo);
            this.setProperties({ currencyCode: this.currency }, true);
        }
    };
    /* Wrapper creation */
    NumericTextBox.prototype.createWrapper = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = this.getNumericValidClassList(this.cssClass);
        }
        var inputObj = Input.createInput({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValue,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton,
                enabled: this.enabled
            }
        }, this.createElement);
        this.inputWrapper = inputObj;
        this.container = inputObj.container;
        this.container.setAttribute('class', ROOT + ' ' + this.container.getAttribute('class'));
        this.updateHTMLAttrToWrapper();
        if (this.readonly) {
            attributes(this.element, { 'aria-readonly': 'true' });
        }
        this.hiddenInput = (this.createElement('input', { attrs: { type: 'text',
                'validateHidden': 'true', 'aria-label': 'hidden', 'class': HIDDENELEMENT } }));
        this.inputName = this.inputName !== null ? this.inputName : this.element.id;
        this.element.removeAttribute('name');
        if (this.isAngular && this.angularTagName === 'EJS-NUMERICTEXTBOX' && this.cloneElement.id.length > 0) {
            attributes(this.hiddenInput, { 'name': this.cloneElement.id });
        }
        else {
            attributes(this.hiddenInput, { 'name': this.inputName });
        }
        this.container.insertBefore(this.hiddenInput, this.container.childNodes[1]);
        this.updateDataAttribute(false);
        if (this.inputStyle !== null) {
            attributes(this.container, { 'style': this.inputStyle });
        }
    };
    NumericTextBox.prototype.updateDataAttribute = function (isDynamic) {
        var attr = {};
        if (!isDynamic) {
            for (var a = 0; a < this.element.attributes.length; a++) {
                attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
            }
        }
        else {
            attr = this.htmlAttributes;
        }
        for (var _i = 0, _a = Object.keys(attr); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.indexOf('data') === 0) {
                this.hiddenInput.setAttribute(key, attr["" + key]);
            }
        }
    };
    NumericTextBox.prototype.updateHTMLAttrToElement = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var pro = _a[_i];
                if (wrapperAttributes.indexOf(pro) < 0) {
                    this.element.setAttribute(pro, this.htmlAttributes["" + pro]);
                }
            }
        }
    };
    NumericTextBox.prototype.updateCssClass = function (newClass, oldClass) {
        Input.setCssClass(this.getNumericValidClassList(newClass), [this.container], this.getNumericValidClassList(oldClass));
    };
    NumericTextBox.prototype.getNumericValidClassList = function (numericClassName) {
        var result = numericClassName;
        if (!isNullOrUndefined(numericClassName) && numericClassName !== '') {
            result = (numericClassName.replace(/\s+/g, ' ')).trim();
        }
        return result;
    };
    NumericTextBox.prototype.updateHTMLAttrToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var pro = _a[_i];
                if (wrapperAttributes.indexOf(pro) > -1) {
                    if (pro === 'class') {
                        var updatedClassValue = this.getNumericValidClassList(this.htmlAttributes["" + pro]);
                        if (updatedClassValue !== '') {
                            addClass([this.container], updatedClassValue.split(' '));
                        }
                    }
                    else if (pro === 'style') {
                        var numericStyle = this.container.getAttribute(pro);
                        numericStyle = !isNullOrUndefined(numericStyle) ? (numericStyle + this.htmlAttributes["" + pro]) :
                            this.htmlAttributes["" + pro];
                        this.container.setAttribute(pro, numericStyle);
                    }
                    else {
                        this.container.setAttribute(pro, this.htmlAttributes["" + pro]);
                    }
                }
            }
        }
    };
    NumericTextBox.prototype.setElementWidth = function (width) {
        if (!isNullOrUndefined(width)) {
            if (typeof width === 'number') {
                this.container.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                this.container.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
            }
        }
    };
    /* Spinner creation */
    NumericTextBox.prototype.spinBtnCreation = function () {
        this.spinDown = Input.appendSpan(SPINICON + ' ' + SPINDOWN, this.container, this.createElement);
        attributes(this.spinDown, {
            'title': this.l10n.getConstant('decrementTitle')
        });
        this.spinUp = Input.appendSpan(SPINICON + ' ' + SPINUP, this.container, this.createElement);
        attributes(this.spinUp, {
            'title': this.l10n.getConstant('incrementTitle')
        });
        this.wireSpinBtnEvents();
    };
    NumericTextBox.prototype.validateMinMax = function () {
        if (!(typeof (this.min) === 'number' && !isNaN(this.min))) {
            this.setProperties({ min: -(Number.MAX_VALUE) }, true);
        }
        if (!(typeof (this.max) === 'number' && !isNaN(this.max))) {
            this.setProperties({ max: Number.MAX_VALUE }, true);
        }
        if (this.decimals !== null) {
            if (this.min !== -(Number.MAX_VALUE)) {
                this.setProperties({ min: this.instance.getNumberParser({ format: 'n' })(this.formattedValue(this.decimals, this.min)) }, true);
            }
            if (this.max !== (Number.MAX_VALUE)) {
                this.setProperties({ max: this.instance.getNumberParser({ format: 'n' })(this.formattedValue(this.decimals, this.max)) }, true);
            }
        }
        this.setProperties({ min: this.min > this.max ? this.max : this.min }, true);
        if (this.min !== -(Number.MAX_VALUE)) {
            attributes(this.element, { 'aria-valuemin': this.min.toString() });
        }
        if (this.max !== (Number.MAX_VALUE)) {
            attributes(this.element, { 'aria-valuemax': this.max.toString() });
        }
    };
    NumericTextBox.prototype.formattedValue = function (decimals, value) {
        return this.instance.getNumberFormat({
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals, useGrouping: false
        })(value);
    };
    NumericTextBox.prototype.validateStep = function () {
        if (this.decimals !== null) {
            this.setProperties({ step: this.instance.getNumberParser({ format: 'n' })(this.formattedValue(this.decimals, this.step)) }, true);
        }
    };
    NumericTextBox.prototype.action = function (operation, event) {
        this.isInteract = true;
        var value = this.isFocused ? this.instance.getNumberParser({ format: 'n' })(this.element.value) : this.value;
        this.changeValue(this.performAction(value, this.step, operation));
        this.raiseChangeEvent(event);
    };
    NumericTextBox.prototype.checkErrorClass = function () {
        if (this.isValidState) {
            removeClass([this.container], ERROR);
        }
        else {
            addClass([this.container], ERROR);
        }
        attributes(this.element, { 'aria-invalid': this.isValidState ? 'false' : 'true' });
    };
    NumericTextBox.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    };
    NumericTextBox.prototype.resetHandler = function (e) {
        e.preventDefault();
        if (!(this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) || this.inputWrapper.container.classList.contains('e-static-clear')) {
            this.clear(e);
        }
        this.isInteract = true;
        this.raiseChangeEvent(e);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    NumericTextBox.prototype.clear = function (event) {
        this.setProperties({ value: null }, true);
        this.setElementValue('');
        this.hiddenInput.value = '';
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NumericTextBox.prototype.resetFormHandler = function () {
        if (this.element.tagName === 'EJS-NUMERICTEXTBOX') {
            this.updateValue(null);
        }
        else {
            this.updateValue(this.inputEleValue);
        }
    };
    NumericTextBox.prototype.setSpinButton = function () {
        if (!isNullOrUndefined(this.spinDown)) {
            attributes(this.spinDown, {
                'title': this.l10n.getConstant('decrementTitle'),
                'aria-label': this.l10n.getConstant('decrementTitle')
            });
        }
        if (!isNullOrUndefined(this.spinUp)) {
            attributes(this.spinUp, {
                'title': this.l10n.getConstant('incrementTitle'),
                'aria-label': this.l10n.getConstant('incrementTitle')
            });
        }
    };
    NumericTextBox.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'blur', this.focusOutHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'input', this.inputHandler, this);
        EventHandler.add(this.element, 'keypress', this.keyPressHandler, this);
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        EventHandler.add(this.element, 'paste', this.pasteHandler, this);
        if (this.enabled) {
            this.bindClearEvent();
            if (this.formEle) {
                EventHandler.add(this.formEle, 'reset', this.resetFormHandler, this);
            }
        }
    };
    NumericTextBox.prototype.wireSpinBtnEvents = function () {
        /* bind spin button events */
        EventHandler.add(this.spinUp, Browser.touchStartEvent, this.mouseDownOnSpinner, this);
        EventHandler.add(this.spinDown, Browser.touchStartEvent, this.mouseDownOnSpinner, this);
        EventHandler.add(this.spinUp, Browser.touchEndEvent, this.mouseUpOnSpinner, this);
        EventHandler.add(this.spinDown, Browser.touchEndEvent, this.mouseUpOnSpinner, this);
        EventHandler.add(this.spinUp, Browser.touchMoveEvent, this.touchMoveOnSpinner, this);
        EventHandler.add(this.spinDown, Browser.touchMoveEvent, this.touchMoveOnSpinner, this);
    };
    NumericTextBox.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'blur', this.focusOutHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        EventHandler.remove(this.element, 'input', this.inputHandler);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'keypress', this.keyPressHandler);
        EventHandler.remove(this.element, 'change', this.changeHandler);
        EventHandler.remove(this.element, 'paste', this.pasteHandler);
        if (this.formEle) {
            EventHandler.remove(this.formEle, 'reset', this.resetFormHandler);
        }
    };
    NumericTextBox.prototype.unwireSpinBtnEvents = function () {
        /* unbind spin button events */
        EventHandler.remove(this.spinUp, Browser.touchStartEvent, this.mouseDownOnSpinner);
        EventHandler.remove(this.spinDown, Browser.touchStartEvent, this.mouseDownOnSpinner);
        EventHandler.remove(this.spinUp, Browser.touchEndEvent, this.mouseUpOnSpinner);
        EventHandler.remove(this.spinDown, Browser.touchEndEvent, this.mouseUpOnSpinner);
        EventHandler.remove(this.spinUp, Browser.touchMoveEvent, this.touchMoveOnSpinner);
        EventHandler.remove(this.spinDown, Browser.touchMoveEvent, this.touchMoveOnSpinner);
    };
    NumericTextBox.prototype.changeHandler = function (event) {
        event.stopPropagation();
        if (!this.element.value.length) {
            this.setProperties({ value: null }, true);
        }
        var parsedInput = this.instance.getNumberParser({ format: 'n' })(this.element.value);
        this.updateValue(parsedInput, event);
    };
    NumericTextBox.prototype.raiseChangeEvent = function (event) {
        this.inputValue = (isNullOrUndefined(this.inputValue) || isNaN(this.inputValue)) ? null : this.inputValue;
        if (this.prevValue !== this.value || this.prevValue !== this.inputValue) {
            var eventArgs = {};
            this.changeEventArgs = { value: this.value, previousValue: this.prevValue, isInteracted: this.isInteract,
                isInteraction: this.isInteract, event: event };
            if (event) {
                this.changeEventArgs.event = event;
            }
            if (this.changeEventArgs.event === undefined) {
                this.changeEventArgs.isInteracted = false;
                this.changeEventArgs.isInteraction = false;
            }
            merge(eventArgs, this.changeEventArgs);
            this.prevValue = this.value;
            this.isInteract = false;
            this.elementPrevValue = this.element.value;
            this.preventChange = false;
            this.trigger('change', eventArgs);
        }
    };
    NumericTextBox.prototype.pasteHandler = function () {
        var _this = this;
        if (!this.enabled || this.readonly) {
            return;
        }
        var beforeUpdate = this.element.value;
        setTimeout(function () {
            if (!_this.numericRegex().test(_this.element.value)) {
                _this.setElementValue(beforeUpdate);
            }
        });
    };
    NumericTextBox.prototype.preventHandler = function () {
        var _this = this;
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        setTimeout(function () {
            if (_this.element.selectionStart > 0) {
                var currentPos = _this.element.selectionStart;
                var prevPos = _this.element.selectionStart - 1;
                var start = 0;
                var valArray = _this.element.value.split('');
                var numericObject = getNumericObject(_this.locale);
                var decimalSeparator = getValue('decimal', numericObject);
                var ignoreKeyCode = decimalSeparator.charCodeAt(0);
                if (_this.element.value[prevPos] === ' ' && _this.element.selectionStart > 0 && !iOS) {
                    if (isNullOrUndefined(_this.prevVal)) {
                        _this.element.value = _this.element.value.trim();
                    }
                    else if (prevPos !== 0) {
                        _this.element.value = _this.prevVal;
                    }
                    else if (prevPos === 0) {
                        _this.element.value = _this.element.value.trim();
                    }
                    _this.element.setSelectionRange(prevPos, prevPos);
                }
                else if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1])) &&
                    _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) !== 45) {
                    if ((valArray.indexOf(_this.element.value[_this.element.selectionStart - 1]) !==
                        valArray.lastIndexOf(_this.element.value[_this.element.selectionStart - 1]) &&
                        _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) === ignoreKeyCode) ||
                        _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) !== ignoreKeyCode) {
                        _this.element.value = _this.element.value.substring(0, prevPos) +
                            _this.element.value.substring(currentPos, _this.element.value.length);
                        _this.element.setSelectionRange(prevPos, prevPos);
                        if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1])) && _this.element.selectionStart > 0
                            && _this.element.value.length) {
                            _this.preventHandler();
                        }
                    }
                }
                else if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 2])) && _this.element.selectionStart > 1 &&
                    _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) !== 45) {
                    if ((valArray.indexOf(_this.element.value[_this.element.selectionStart - 2]) !==
                        valArray.lastIndexOf(_this.element.value[_this.element.selectionStart - 2]) &&
                        _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) === ignoreKeyCode) ||
                        _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) !== ignoreKeyCode) {
                        _this.element.setSelectionRange(prevPos, prevPos);
                        _this.nextEle = _this.element.value[_this.element.selectionStart];
                        _this.cursorPosChanged = true;
                        _this.preventHandler();
                    }
                }
                if (_this.cursorPosChanged === true && _this.element.value[_this.element.selectionStart] === _this.nextEle &&
                    isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1]))) {
                    _this.element.setSelectionRange(_this.element.selectionStart + 1, _this.element.selectionStart + 1);
                    _this.cursorPosChanged = false;
                    _this.nextEle = null;
                }
                if (_this.element.value.trim() === '') {
                    _this.element.setSelectionRange(start, start);
                }
                if (_this.element.selectionStart > 0) {
                    if ((_this.element.value[_this.element.selectionStart - 1].charCodeAt(0) === 45) && _this.element.selectionStart > 1) {
                        if (!isNullOrUndefined(_this.prevVal)) {
                            _this.element.value = _this.prevVal;
                        }
                        _this.element.setSelectionRange(_this.element.selectionStart, _this.element.selectionStart);
                    }
                    if (_this.element.value[_this.element.selectionStart - 1] === decimalSeparator &&
                        _this.decimals === 0 &&
                        _this.validateDecimalOnType) {
                        _this.element.value = _this.element.value.substring(0, prevPos) +
                            _this.element.value.substring(currentPos, _this.element.value.length);
                    }
                }
                _this.prevVal = _this.element.value;
            }
        });
    };
    NumericTextBox.prototype.keyUpHandler = function () {
        if (!this.enabled || this.readonly) {
            return;
        }
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (!iOS && Browser.isDevice) {
            this.preventHandler();
        }
        var parseValue = this.instance.getNumberParser({ format: 'n' })(this.element.value);
        parseValue = parseValue === null || isNaN(parseValue) ? null : parseValue;
        this.hiddenInput.value = parseValue || parseValue === 0 ? parseValue.toString() : null;
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NumericTextBox.prototype.inputHandler = function (event) {
        var numerictextboxObj =  this;
        if (!this.enabled || this.readonly) {
            return;
        }
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        var fireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if ((fireFox || iOS) && Browser.isDevice) {
            this.preventHandler();
        }
        /* istanbul ignore next */
        if (this.isAngular
            && this.element.value !== getValue('decimal', getNumericObject(this.locale))
            && this.element.value !== getValue('minusSign', getNumericObject(this.locale))) {
            var parsedValue = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            parsedValue = isNaN(parsedValue) ? null : parsedValue;
            numerictextboxObj.localChange({ value: parsedValue });
            this.preventChange = true;
        }
        if (this.isVue) {
            var current = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            var previous = this.instance.getNumberParser({ format: 'n' })(this.elementPrevValue);
            //EJ2-54963-if type "." or ".0" or "-.0" it converts to "0" automatically when binding v-model
            var nonZeroRegex = new RegExp('[^0-9]+$');
            if (nonZeroRegex.test(this.element.value) ||
                ((this.elementPrevValue.indexOf('.') !== -1 || this.elementPrevValue.indexOf('-') !== -1) &&
                    this.element.value[this.element.value.length - 1] === '0')) {
                current = this.value;
            }
            var eventArgs = {
                event: event,
                value: (current === null || isNaN(current) ? null : current),
                previousValue: (previous === null || isNaN(previous) ? null : previous)
            };
            this.preventChange = true;
            this.elementPrevValue = this.element.value;
            this.trigger('input', eventArgs);
        }
    };
    NumericTextBox.prototype.keyDownHandler = function (event) {
        if (!this.readonly) {
            switch (event.keyCode) {
                case 38:
                    event.preventDefault();
                    this.action(INCREMENT, event);
                    break;
                case 40:
                    event.preventDefault();
                    this.action(DECREMENT, event);
                    break;
            }
        }
    };
    NumericTextBox.prototype.performAction = function (value, step, operation) {
        if (value === null || isNaN(value)) {
            value = 0;
        }
        var updatedValue = operation === INCREMENT ? value + step : value - step;
        updatedValue = this.correctRounding(value, step, updatedValue);
        return this.strictMode ? this.trimValue(updatedValue) : updatedValue;
    };
    NumericTextBox.prototype.correctRounding = function (value, step, result) {
        var floatExp = new RegExp('[,.](.*)');
        var floatValue = floatExp.test(value.toString());
        var floatStep = floatExp.test(step.toString());
        if (floatValue || floatStep) {
            var valueCount = floatValue ? floatExp.exec(value.toString())[0].length : 0;
            var stepCount = floatStep ? floatExp.exec(step.toString())[0].length : 0;
            var max = Math.max(valueCount, stepCount);
            return value = this.roundValue(result, max);
        }
        return result;
    };
    NumericTextBox.prototype.roundValue = function (result, precision) {
        precision = precision || 0;
        var divide = Math.pow(10, precision);
        return result *= divide, result = Math.round(result) / divide;
    };
    NumericTextBox.prototype.updateValue = function (value, event) {
        if (event) {
            this.isInteract = true;
        }
        if (value !== null && !isNaN(value)) {
            if (this.decimals) {
                value = this.roundNumber(value, this.decimals);
            }
        }
        this.inputValue = value;
        this.changeValue(value === null || isNaN(value) ? null : this.strictMode ? this.trimValue(value) : value);
        /* istanbul ignore next */
        if (!this.isDynamicChange) {
            this.raiseChangeEvent(event);
        }
    };
    NumericTextBox.prototype.updateCurrency = function (prop, propVal) {
        setValue(prop, propVal, this.cultureInfo);
        this.updateValue(this.value);
    };
    NumericTextBox.prototype.changeValue = function (value) {
        if (!(value || value === 0)) {
            value = null;
            this.setProperties({ value: value }, true);
        }
        else {
            var numberOfDecimals = this.getNumberOfDecimals(value);
            this.setProperties({ value: this.roundNumber(value, numberOfDecimals) }, true);
        }
        this.modifyText();
        if (!this.strictMode) {
            this.validateState();
        }
    };
    NumericTextBox.prototype.modifyText = function () {
        if (this.value || this.value === 0) {
            var value = this.formatNumber();
            var elementValue = this.isFocused ? value : this.instance.getNumberFormat(this.cultureInfo)(this.value);
            this.setElementValue(elementValue);
            attributes(this.element, { 'aria-valuenow': value });
            if (!isNullOrUndefined(this.hiddenInput)) {
                this.hiddenInput.value = this.value.toString();
                if (this.value !== null && this.serverDecimalSeparator) {
                    this.hiddenInput.value = this.hiddenInput.value.replace('.', this.serverDecimalSeparator);
                }
            }
        }
        else {
            this.setElementValue('');
            this.element.removeAttribute('aria-valuenow');
            this.hiddenInput.value = null;
        }
    };
    NumericTextBox.prototype.setElementValue = function (val, element) {
        Input.setValue(val, (element ? element : this.element), this.floatLabelType, this.showClearButton);
    };
    NumericTextBox.prototype.validateState = function () {
        this.isValidState = true;
        if (this.value || this.value === 0) {
            this.isValidState = !(this.value > this.max || this.value < this.min);
        }
        this.checkErrorClass();
    };
    NumericTextBox.prototype.getNumberOfDecimals = function (value) {
        var numberOfDecimals;
        // eslint-disable-next-line no-useless-escape
        var EXPREGEXP = new RegExp('[eE][\-+]?([0-9]+)');
        var valueString = value.toString();
        if (EXPREGEXP.test(valueString)) {
            var result = EXPREGEXP.exec(valueString);
            if (!isNullOrUndefined(result)) {
                valueString = value.toFixed(Math.min(parseInt(result[1], 10), 20));
            }
        }
        var decimalPart = valueString.split('.')[1];
        numberOfDecimals = !decimalPart || !decimalPart.length ? 0 : decimalPart.length;
        if (this.decimals !== null) {
            numberOfDecimals = numberOfDecimals < this.decimals ? numberOfDecimals : this.decimals;
        }
        return numberOfDecimals;
    };
    NumericTextBox.prototype.formatNumber = function () {
        var numberOfDecimals = this.getNumberOfDecimals(this.value);
        return this.instance.getNumberFormat({
            maximumFractionDigits: numberOfDecimals,
            minimumFractionDigits: numberOfDecimals, useGrouping: false
        })(this.value);
    };
    NumericTextBox.prototype.trimValue = function (value) {
        if (value > this.max) {
            return this.max;
        }
        if (value < this.min) {
            return this.min;
        }
        return value;
    };
    NumericTextBox.prototype.roundNumber = function (value, precision) {
        var result = value;
        var decimals = precision || 0;
        var result1 = result.toString().split('e');
        result = Math.round(Number(result1[0] + 'e' + (result1[1] ? (Number(result1[1]) + decimals) : decimals)));
        var result2 = result.toString().split('e');
        result = Number(result2[0] + 'e' + (result2[1] ? (Number(result2[1]) - decimals) : -decimals));
        return Number(result.toFixed(decimals));
    };
    NumericTextBox.prototype.cancelEvent = function (event) {
        event.preventDefault();
        return false;
    };
    NumericTextBox.prototype.keyPressHandler = function (event) {
        if (!this.enabled || this.readonly) {
            return true;
        }
        if (!Browser.isDevice && Browser.info.version === '11.0' && event.keyCode === 13) {
            var parsedInput = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            this.updateValue(parsedInput, event);
            return true;
        }
        if (event.which === 0 || event.metaKey || event.ctrlKey || event.keyCode === 8 || event.keyCode === 13) {
            return true;
        }
        var currentChar = String.fromCharCode(event.which);
        var decimalSeparator = getValue('decimal', getNumericObject(this.locale));
        var isAlterNumPadDecimalChar = event.code === 'NumpadDecimal' && currentChar !== decimalSeparator;
        //EJ2-59813-replace the culture decimal separator value with numberpad decimal separator value when culture decimal separator and numberpad decimal separator are different
        if (isAlterNumPadDecimalChar) {
            currentChar = decimalSeparator;
        }
        var text = this.element.value;
        text = text.substring(0, this.element.selectionStart) + currentChar + text.substring(this.element.selectionEnd);
        if (!this.numericRegex().test(text)) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        else {
            //EJ2-59813-update the numberpad decimal separator and update the cursor position
            if (isAlterNumPadDecimalChar) {
                var start = this.element.selectionStart + 1;
                this.element.value = text;
                this.element.setSelectionRange(start, start);
                event.preventDefault();
                event.stopPropagation();
            }
            return true;
        }
    };
    NumericTextBox.prototype.numericRegex = function () {
        var numericObject = getNumericObject(this.locale);
        var decimalSeparator = getValue('decimal', numericObject);
        var fractionRule = '*';
        if (decimalSeparator === DECIMALSEPARATOR) {
            decimalSeparator = '\\' + decimalSeparator;
        }
        if (this.decimals === 0 && this.validateDecimalOnType) {
            return INTREGEXP;
        }
        if (this.decimals && this.validateDecimalOnType) {
            fractionRule = '{0,' + this.decimals + '}';
        }
        /* eslint-disable-next-line security/detect-non-literal-regexp */
        return new RegExp('^\\s*(-)?(((\\d+(' + decimalSeparator + '\\d' + fractionRule +
            ')?)|(' + decimalSeparator + '\\d' + fractionRule + ')))?$');
    };
    NumericTextBox.prototype.mouseWheel = function (event) {
        event.preventDefault();
        var delta;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var rawEvent = event;
        if (rawEvent.wheelDelta) {
            delta = rawEvent.wheelDelta / 120;
        }
        else if (rawEvent.detail) {
            delta = -rawEvent.detail / 3;
        }
        if (delta > 0) {
            this.action(INCREMENT, event);
        }
        else if (delta < 0) {
            this.action(DECREMENT, event);
        }
        this.cancelEvent(event);
    };
    NumericTextBox.prototype.focusHandler = function (event) {
        var _this = this;
        clearTimeout(selectionTimeOut);
        this.focusEventArgs = { event: event, value: this.value, container: this.container };
        this.trigger('focus', this.focusEventArgs);
        if (!this.enabled || this.readonly) {
            return;
        }
        this.isFocused = true;
        this.prevValue = this.value;
        if ((this.value || this.value === 0)) {
            var formatValue_1 = this.formatNumber();
            this.setElementValue(formatValue_1);
            if (!this.isPrevFocused) {
                if (!Browser.isDevice && Browser.info.version === '11.0') {
                    this.element.setSelectionRange(0, formatValue_1.length);
                }
                else {
                    var delay = (Browser.isDevice && Browser.isIos) ? 600 : 0;
                    selectionTimeOut = setTimeout(function () {
                        _this.element.setSelectionRange(0, formatValue_1.length);
                    }, delay);
                }
            }
        }
        if (!Browser.isDevice) {
            EventHandler.add(this.element, 'mousewheel DOMMouseScroll', this.mouseWheel, this);
        }
    };
    NumericTextBox.prototype.focusOutHandler = function (event) {
        var _this = this;
        this.blurEventArgs = { event: event, value: this.value, container: this.container };
        this.trigger('blur', this.blurEventArgs);
        if (!this.enabled || this.readonly) {
            return;
        }
        if (this.isPrevFocused) {
            event.preventDefault();
            if (Browser.isDevice) {
                var value_1 = this.element.value;
                this.element.focus();
                this.isPrevFocused = false;
                var ele_1 = this.element;
                setTimeout(function () {
                    _this.setElementValue(value_1, ele_1);
                }, 200);
            }
        }
        else {
            this.isFocused = false;
            if (!this.element.value.length) {
                this.setProperties({ value: null }, true);
            }
            var parsedInput = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            this.updateValue(parsedInput);
            if (!Browser.isDevice) {
                EventHandler.remove(this.element, 'mousewheel DOMMouseScroll', this.mouseWheel);
            }
        }
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var focusEvent = document.createEvent('FocusEvent');
            focusEvent.initEvent('focusout', false, true);
            element.dispatchEvent(focusEvent);
        }
    };
    NumericTextBox.prototype.mouseDownOnSpinner = function (event) {
        var _this = this;
        if (this.isFocused) {
            this.isPrevFocused = true;
            event.preventDefault();
        }
        if (!this.getElementData(event)) {
            return;
        }
        this.getElementData(event);
        var target = event.currentTarget;
        var action = (target.classList.contains(SPINUP)) ? INCREMENT : DECREMENT;
        EventHandler.add(target, 'mouseleave', this.mouseUpClick, this);
        this.timeOut = setInterval(function () {
            _this.isCalled = true;
            _this.action(action, event);
        }, 150);
        EventHandler.add(document, 'mouseup', this.mouseUpClick, this);
    };
    NumericTextBox.prototype.touchMoveOnSpinner = function (event) {
        var target;
        if (event.type === 'touchmove') {
            var touchEvent = event.touches;
            target = touchEvent.length && document.elementFromPoint(touchEvent[0].pageX, touchEvent[0].pageY);
        }
        else {
            target = document.elementFromPoint(event.clientX, event.clientY);
        }
        if (!(target.classList.contains(SPINICON))) {
            clearInterval(this.timeOut);
        }
    };
    NumericTextBox.prototype.mouseUpOnSpinner = function (event) {
        this.prevValue = this.value;
        if (this.isPrevFocused) {
            this.element.focus();
            if (!Browser.isDevice) {
                this.isPrevFocused = false;
            }
        }
        if (!Browser.isDevice) {
            event.preventDefault();
        }
        if (!this.getElementData(event)) {
            return;
        }
        var target = event.currentTarget;
        var action = (target.classList.contains(SPINUP)) ? INCREMENT : DECREMENT;
        EventHandler.remove(target, 'mouseleave', this.mouseUpClick);
        if (!this.isCalled) {
            this.action(action, event);
        }
        this.isCalled = false;
        EventHandler.remove(document, 'mouseup', this.mouseUpClick);
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NumericTextBox.prototype.getElementData = function (event) {
        if ((event.which && event.which === 3) || (event.button && event.button === 2)
            || !this.enabled || this.readonly) {
            return false;
        }
        clearInterval(this.timeOut);
        return true;
    };
    NumericTextBox.prototype.floatLabelTypeUpdate = function () {
        Input.removeFloating(this.inputWrapper);
        var hiddenInput = this.hiddenInput;
        this.hiddenInput.remove();
        Input.addFloating(this.element, this.floatLabelType, this.placeholder, this.createElement);
        this.container.insertBefore(hiddenInput, this.container.childNodes[1]);
    };
    NumericTextBox.prototype.mouseUpClick = function (event) {
        event.stopPropagation();
        clearInterval(this.timeOut);
        this.isCalled = false;
        if (this.spinUp) {
            EventHandler.remove(this.spinUp, 'mouseleave', this.mouseUpClick);
        }
        if (this.spinDown) {
            EventHandler.remove(this.spinDown, 'mouseleave', this.mouseUpClick);
        }
    };
    /**
     * Increments the NumericTextBox value with the specified step value.
     *
     * @param {number} step - Specifies the value used to increment the NumericTextBox value.
     * if its not given then numeric value will be incremented based on the step property value.
     * @returns {void}
     */
    NumericTextBox.prototype.increment = function (step) {
        if (step === void 0) { step = this.step; }
        this.isInteract = false;
        this.changeValue(this.performAction(this.value, step, INCREMENT));
        this.raiseChangeEvent();
    };
    /**
     * Decrements the NumericTextBox value with specified step value.
     *
     * @param {number} step - Specifies the value used to decrement the NumericTextBox value.
     * if its not given then numeric value will be decremented based on the step property value.
     * @returns {void}
     */
    NumericTextBox.prototype.decrement = function (step) {
        if (step === void 0) { step = this.step; }
        this.isInteract = false;
        this.changeValue(this.performAction(this.value, step, DECREMENT));
        this.raiseChangeEvent();
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    NumericTextBox.prototype.destroy = function () {
        this.unwireEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        detach(this.hiddenInput);
        if (this.showSpinButton) {
            this.unwireSpinBtnEvents();
            detach(this.spinUp);
            detach(this.spinDown);
        }
        var attrArray = ['aria-labelledby', 'role', 'autocomplete', 'aria-readonly',
            'aria-disabled', 'autocapitalize', 'spellcheck', 'aria-autocomplete', 'tabindex',
            'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-invalid'];
        for (var i = 0; i < attrArray.length; i++) {
            this.element.removeAttribute(attrArray[i]);
        }
        this.element.classList.remove('e-input');
        this.container.insertAdjacentElement('afterend', this.element);
        detach(this.container);
        this.spinUp = null;
        this.spinDown = null;
        this.container = null;
        this.hiddenInput = null;
        this.changeEventArgs = null;
        this.blurEventArgs = null;
        this.focusEventArgs = null;
        this.inputWrapper = null;
        Input.destroy({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        _super.prototype.destroy.call(this);
    };
    /**
     * Returns the value of NumericTextBox with the format applied to the NumericTextBox.
     *
     * @returns {string} - Returns the formatted value of the NumericTextBox.
     */
    NumericTextBox.prototype.getText = function () {
        return this.element.value;
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    NumericTextBox.prototype.focusIn = function () {
        if (document.activeElement !== this.element && this.enabled) {
            this.element.focus();
            addClass([this.container], [NUMERIC_FOCUS]);
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    NumericTextBox.prototype.focusOut = function () {
        if (document.activeElement === this.element && this.enabled) {
            this.element.blur();
            removeClass([this.container], [NUMERIC_FOCUS]);
        }
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the persisted data.
     */
    NumericTextBox.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {NumericTextBoxModel} newProp - Returns the dynamic property value of the component.
     * @param {NumericTextBoxModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    NumericTextBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                    this.setElementWidth(newProp.width);
                    Input.calculateWidth(this.element, this.container);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enabled':
                    Input.setEnabled(newProp.enabled, this.element);
                    this.bindClearEvent();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(newProp.enableRtl, [this.container]);
                    break;
                case 'readonly':
                    Input.setReadonly(newProp.readonly, this.element);
                    if (this.readonly) {
                        attributes(this.element, { 'aria-readonly': 'true' });
                    }
                    else {
                        this.element.removeAttribute('aria-readonly');
                    }
                    break;
                case 'htmlAttributes':
                    this.updateHTMLAttrToElement();
                    this.updateHTMLAttrToWrapper();
                    this.updateDataAttribute(true);
                    this.checkAttributes(true);
                    Input.validateInputType(this.container, this.element);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.element);
                    Input.calculateWidth(this.element, this.container);
                    break;
                case 'step':
                    this.step = newProp.step;
                    this.validateStep();
                    break;
                case 'showSpinButton':
                    this.updateSpinButton(newProp);
                    break;
                case 'showClearButton':
                    this.updateClearButton(newProp);
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    this.floatLabelTypeUpdate();
                    break;
                case 'value':
                    this.isDynamicChange = (this.isAngular || this.isVue) && this.preventChange;
                    this.updateValue(newProp.value);
                    if (this.isDynamicChange) {
                        this.preventChange = false;
                        this.isDynamicChange = false;
                    }
                    break;
                case 'min':
                case 'max':
                    setValue(prop, getValue(prop, newProp), this);
                    this.validateMinMax();
                    this.updateValue(this.value);
                    break;
                case 'strictMode':
                    this.strictMode = newProp.strictMode;
                    this.updateValue(this.value);
                    this.validateState();
                    break;
                case 'locale':
                    this.initCultureFunc();
                    this.l10n.setLocale(this.locale);
                    this.setSpinButton();
                    this.updatePlaceholder();
                    Input.setPlaceholder(this.placeholder, this.element);
                    this.updateValue(this.value);
                    break;
                case 'currency':
                    {
                        var propVal = getValue(prop, newProp);
                        this.setProperties({ currencyCode: propVal }, true);
                        this.updateCurrency(prop, propVal);
                    }
                    break;
                case 'currencyCode':
                    {
                        var propValue = getValue(prop, newProp);
                        this.setProperties({ currency: propValue }, true);
                        this.updateCurrency('currency', propValue);
                    }
                    break;
                case 'format':
                    setValue(prop, getValue(prop, newProp), this);
                    this.initCultureInfo();
                    this.updateValue(this.value);
                    break;
                case 'decimals':
                    this.decimals = newProp.decimals;
                    this.updateValue(this.value);
            }
        }
    };
    NumericTextBox.prototype.updateClearButton = function (newProp) {
        Input.setClearButton(newProp.showClearButton, this.element, this.inputWrapper, undefined, this.createElement);
        this.bindClearEvent();
    };
    NumericTextBox.prototype.updateSpinButton = function (newProp) {
        if (newProp.showSpinButton) {
            this.spinBtnCreation();
        }
        else {
            detach(this.spinUp);
            detach(this.spinDown);
        }
    };
    /**
     * Gets the component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    NumericTextBox.prototype.getModuleName = function () {
        return 'numerictextbox';
    };
    __decorate([
        Property('')
    ], NumericTextBox.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "value", void 0);
    __decorate([
        Property(-(Number.MAX_VALUE))
    ], NumericTextBox.prototype, "min", void 0);
    __decorate([
        Property(Number.MAX_VALUE)
    ], NumericTextBox.prototype, "max", void 0);
    __decorate([
        Property(1)
    ], NumericTextBox.prototype, "step", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "placeholder", void 0);
    __decorate([
        Property({})
    ], NumericTextBox.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(true)
    ], NumericTextBox.prototype, "showSpinButton", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "readonly", void 0);
    __decorate([
        Property(true)
    ], NumericTextBox.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "showClearButton", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "enablePersistence", void 0);
    __decorate([
        Property('n2')
    ], NumericTextBox.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "decimals", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "currency", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "currencyCode", void 0);
    __decorate([
        Property(true)
    ], NumericTextBox.prototype, "strictMode", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "validateDecimalOnType", void 0);
    __decorate([
        Property('Never')
    ], NumericTextBox.prototype, "floatLabelType", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "created", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "change", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "focus", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "blur", void 0);
    NumericTextBox = __decorate([
        NotifyPropertyChanges
    ], NumericTextBox);
    return NumericTextBox;
}(Component));

/* eslint-disable valid-jsdoc, jsdoc/require-jsdoc, jsdoc/require-returns, jsdoc/require-param */
var ERROR$1 = 'e-error';
var INPUTGROUP = 'e-input-group';
var FLOATINPUT = 'e-float-input';
var UTILMASK = 'e-utility-mask';
var TOPLABEL = 'e-label-top';
var BOTTOMLABEL = 'e-label-bottom';
/**
 * @hidden
 * Built-in masking elements collection.
 */
var regularExpressions = {
    '0': '[0-9]',
    '9': '[0-9 ]',
    '#': '[0-9 +-]',
    'L': '[A-Za-z]',
    '?': '[A-Za-z ]',
    '&': '[^\x7f ]+',
    'C': '[^\x7f]+',
    'A': '[A-Za-z0-9]',
    'a': '[A-Za-z0-9 ]'
};
/**
 * Generate required masking elements to the MaskedTextBox from user mask input.
 *
 * @hidden
 */
function createMask() {
    attributes(this.element, {
        'role': 'textbox', 'autocomplete': 'off', 'autocapitalize': 'off',
        'spellcheck': 'false', 'aria-live': 'assertive'
    });
    if (this.mask) {
        var splitMask = this.mask.split(']');
        for (var i = 0; i < splitMask.length; i++) {
            if (splitMask[i][splitMask[i].length - 1] === '\\') {
                splitMask[i] = splitMask[i] + ']';
                var splitInnerMask = splitMask[i].split('[');
                for (var j = 0; j < splitInnerMask.length; j++) {
                    if (splitInnerMask[j][splitInnerMask[j].length - 1] === '\\') {
                        splitInnerMask[j] = splitInnerMask[j] + '[';
                    }
                    pushIntoRegExpCollec.call(this, splitInnerMask[j]);
                }
            }
            else {
                var splitInnerMask = splitMask[i].split('[');
                if (splitInnerMask.length > 1) {
                    var chkSpace = false;
                    for (var j = 0; j < splitInnerMask.length; j++) {
                        if (splitInnerMask[j] === '\\') {
                            this.customRegExpCollec.push('[');
                            this.hiddenMask += splitInnerMask[j] + '[';
                        }
                        else if (splitInnerMask[j] === '') {
                            chkSpace = true;
                        }
                        else if ((splitInnerMask[j] !== '' && chkSpace) || j === splitInnerMask.length - 1) {
                            this.customRegExpCollec.push('[' + splitInnerMask[j] + ']');
                            this.hiddenMask += this.promptChar;
                            chkSpace = false;
                        }
                        else {
                            pushIntoRegExpCollec.call(this, splitInnerMask[j]);
                        }
                    }
                }
                else {
                    pushIntoRegExpCollec.call(this, splitInnerMask[0]);
                }
            }
        }
        this.escapeMaskValue = this.hiddenMask;
        this.promptMask = this.hiddenMask.replace(/[09?LCAa#&]/g, this.promptChar);
        if (!isNullOrUndefined(this.customCharacters)) {
            for (var i = 0; i < this.promptMask.length; i++) {
                if (!isNullOrUndefined(this.customCharacters[this.promptMask[i]])) {
                    /* eslint-disable-next-line security/detect-non-literal-regexp */
                    this.promptMask = this.promptMask.replace(new RegExp(this.promptMask[i], 'g'), this.promptChar);
                }
            }
        }
        var escapeNumber = 0;
        if (this.hiddenMask.match(new RegExp(/\\/))) {
            for (var i = 0; i < this.hiddenMask.length; i++) {
                var j = 0;
                if (i >= 1) {
                    j = i;
                }
                escapeNumber = this.hiddenMask.length - this.promptMask.length;
                j = j - escapeNumber;
                if ((i > 0 && this.hiddenMask[i - 1] !== '\\') && (this.hiddenMask[i] === '>' ||
                    this.hiddenMask[i] === '<' || this.hiddenMask[i] === '|')) {
                    this.promptMask = this.promptMask.substring(0, j) +
                        this.promptMask.substring((i + 1) - escapeNumber, this.promptMask.length);
                    this.escapeMaskValue = this.escapeMaskValue.substring(0, j) +
                        this.escapeMaskValue.substring((i + 1) - escapeNumber, this.escapeMaskValue.length);
                }
                if (this.hiddenMask[i] === '\\') {
                    this.promptMask = this.promptMask.substring(0, j) + this.hiddenMask[i + 1] +
                        this.promptMask.substring((i + 2) - escapeNumber, this.promptMask.length);
                    this.escapeMaskValue = this.escapeMaskValue.substring(0, j) + this.escapeMaskValue[i + 1] +
                        this.escapeMaskValue.substring((i + 2) - escapeNumber, this.escapeMaskValue.length);
                }
            }
        }
        else {
            this.promptMask = this.promptMask.replace(/[>|<]/g, '');
            this.escapeMaskValue = this.hiddenMask.replace(/[>|<]/g, '');
        }
        attributes(this.element, { 'aria-invalid': 'false' });
    }
}
/**
 * Apply mask ability with masking elements to the MaskedTextBox.
 *
 * @hidden
 */
function applyMask() {
    setElementValue.call(this, this.promptMask);
    setMaskValue.call(this, this.value);
}
/**
 * To wire required events to the MaskedTextBox.
 *
 * @hidden
 */
function wireEvents() {
    EventHandler.add(this.element, 'keydown', maskInputKeyDownHandler, this);
    EventHandler.add(this.element, 'keypress', maskInputKeyPressHandler, this);
    EventHandler.add(this.element, 'keyup', maskInputKeyUpHandler, this);
    EventHandler.add(this.element, 'input', maskInputHandler, this);
    EventHandler.add(this.element, 'focus', maskInputFocusHandler, this);
    EventHandler.add(this.element, 'blur', maskInputBlurHandler, this);
    EventHandler.add(this.element, 'paste', maskInputPasteHandler, this);
    EventHandler.add(this.element, 'cut', maskInputCutHandler, this);
    EventHandler.add(this.element, 'drop', maskInputDropHandler, this);
    EventHandler.add(this.element, 'mousedown', maskInputMouseDownHandler, this);
    EventHandler.add(this.element, 'mouseup', maskInputMouseUpHandler, this);
    if (this.enabled) {
        bindClearEvent.call(this);
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', resetFormHandler, this);
        }
    }
}
/**
 * To unwire events attached to the MaskedTextBox.
 *
 * @hidden
 */
function unwireEvents() {
    EventHandler.remove(this.element, 'keydown', maskInputKeyDownHandler);
    EventHandler.remove(this.element, 'keypress', maskInputKeyPressHandler);
    EventHandler.remove(this.element, 'keyup', maskInputKeyUpHandler);
    EventHandler.remove(this.element, 'input', maskInputHandler);
    EventHandler.remove(this.element, 'focus', maskInputFocusHandler);
    EventHandler.remove(this.element, 'blur', maskInputBlurHandler);
    EventHandler.remove(this.element, 'paste', maskInputPasteHandler);
    EventHandler.remove(this.element, 'cut', maskInputCutHandler);
    EventHandler.remove(this.element, 'drop', maskInputDropHandler);
    EventHandler.remove(this.element, 'mousedown', maskInputMouseDownHandler);
    EventHandler.remove(this.element, 'mouseup', maskInputMouseUpHandler);
    if (this.formElement) {
        EventHandler.remove(this.formElement, 'reset', resetFormHandler);
    }
}
/**
 * To bind required events to the MaskedTextBox clearButton.
 *
 * @hidden
 */
function bindClearEvent() {
    if (this.showClearButton) {
        EventHandler.add(this.inputObj.clearButton, 'mousedown touchstart', resetHandler, this);
    }
}
function resetHandler(e) {
    e.preventDefault();
    if (!this.inputObj.clearButton.classList.contains('e-clear-icon-hide') || (this.inputObj.container.classList.contains('e-static-clear'))) {
        clear.call(this, e);
        this.value = '';
    }
}
function clear(event) {
    var value = this.element.value;
    setElementValue.call(this, this.promptMask);
    this.redoCollec.unshift({
        value: this.promptMask, startIndex: this.element.selectionStart, endIndex: this.element.selectionEnd
    });
    triggerMaskChangeEvent.call(this, event, value);
    this.element.setSelectionRange(0, 0);
}
function resetFormHandler() {
    if (this.element.tagName === 'EJS-MASKEDTEXTBOX') {
        setElementValue.call(this, this.promptMask);
    }
    else {
        this.value = this.initInputValue;
    }
}
/**
 * To get masked value from the MaskedTextBox.
 *
 * @hidden
 */
function unstrippedValue(element) {
    return element.value;
}
/**
 * To extract raw value from the MaskedTextBox.
 *
 * @hidden
 */
function strippedValue(element, maskValues) {
    var value = '';
    var k = 0;
    var checkMask = false;
    var maskValue = (!isNullOrUndefined(maskValues)) ? maskValues : (!isNullOrUndefined(element) &&
        !isNullOrUndefined(this)) ? element.value : maskValues;
    if (maskValue !== this.promptMask) {
        for (var i = 0; i < this.customRegExpCollec.length; i++) {
            if (checkMask) {
                checkMask = false;
            }
            if (this.customRegExpCollec[k] === '>' || this.customRegExpCollec[k] === '<' ||
                this.customRegExpCollec[k] === '|' || this.customRegExpCollec[k] === '\\') {
                --i;
                checkMask = true;
            }
            if (!checkMask) {
                if ((maskValue[i] !== this.promptChar) && (!isNullOrUndefined(this.customRegExpCollec[k]) &&
                    ((this._callPasteHandler || (!isNullOrUndefined(this.regExpCollec[this.customRegExpCollec[k]]) &&
                        !this.maskedRegExp.includes(this.customRegExpCollec[k]))) ||
                        (this.customRegExpCollec[k].length > 2 && this.customRegExpCollec[k][0] === '[' &&
                            this.customRegExpCollec[k][this.customRegExpCollec[k].length - 1] === ']') ||
                        (!isNullOrUndefined(this.customCharacters) &&
                            (!isNullOrUndefined(this.customCharacters[this.customRegExpCollec[k]]))))) && (maskValue !== '')) {
                    value += maskValue[i];
                }
            }
            ++k;
        }
    }
    if (this.mask === null || this.mask === '' && this.value !== undefined) {
        value = maskValue;
    }
    return value;
}
function pushIntoRegExpCollec(value) {
    for (var k = 0; k < value.length; k++) {
        this.hiddenMask += value[k];
        if (value[k] !== '\\') {
            this.customRegExpCollec.push(value[k]);
        }
        else if (value[k] === '\\' && !isNullOrUndefined(this.regExpCollec[value[k + 1]])) {
            this.maskedRegExp.push(value[k + 1]);
        }
    }
}
function maskInputMouseDownHandler() {
    this.isClicked = true;
}
function maskInputMouseUpHandler() {
    this.isClicked = false;
}
function maskInputFocusHandler(event) {
    var _this = this;
    var inputElement = this.element;
    var startIndex = 0;
    var modelValue = strippedValue.call(this, inputElement);
    var toAllowForward = false;
    var toAllowBackward = false;
    var eventArgs = {
        selectionStart: inputElement.selectionStart,
        event: event,
        value: this.value,
        maskedValue: inputElement.value,
        container: !isNullOrUndefined(this.inputObj) ? this.inputObj.container : this.inputObj,
        selectionEnd: inputElement.selectionEnd
    };
    if (!this.isClicked) {
        triggerFocus.call(this, eventArgs, inputElement);
    }
    if (this.mask) {
        if (!(!(modelValue === null || modelValue === '') || this.floatLabelType === 'Always' ||
            this.placeholder === null || this.placeholder === '')) {
            inputElement.value = this.promptMask;
        }
        setTimeout(function () {
            if (inputElement.selectionStart === _this.promptMask.length ||
                inputElement.value[inputElement.selectionStart] === _this.promptChar) {
                toAllowForward = true;
            }
            else {
                for (var i = inputElement.selectionStart; i < _this.promptMask.length; i++) {
                    if (inputElement.value[i] !== _this.promptChar) {
                        if ((inputElement.value[i] !== _this.promptMask[i])) {
                            toAllowForward = false;
                            break;
                        }
                    }
                    else {
                        toAllowForward = true;
                        break;
                    }
                }
            }
        });
        setTimeout(function () {
            var backSelectionStart = inputElement.selectionStart - 1;
            if (backSelectionStart === _this.promptMask.length - 1 ||
                inputElement.value[backSelectionStart] === _this.promptChar) {
                toAllowBackward = true;
            }
            else {
                for (var i = backSelectionStart; i >= 0; i--) {
                    if (inputElement.value[i] !== _this.promptChar) {
                        if ((inputElement.value[i] !== _this.promptMask[i])) {
                            toAllowBackward = false;
                            break;
                        }
                    }
                    else {
                        toAllowBackward = true;
                        break;
                    }
                }
            }
        });
        if ((this.isClicked || (this.floatLabelType !== 'Always' &&
            ((modelValue === null || modelValue === '') &&
                (this.placeholder !== null && this.placeholder !== ''))))) {
            for (startIndex = 0; startIndex < this.promptMask.length; startIndex++) {
                if (inputElement.value[startIndex] === this.promptChar) {
                    setTimeout(function () {
                        if (toAllowForward || toAllowBackward) {
                            inputElement.selectionEnd = startIndex;
                            inputElement.selectionStart = startIndex;
                        }
                        eventArgs = {
                            selectionStart: inputElement.selectionStart,
                            event: event,
                            value: _this.value,
                            maskedValue: inputElement.value,
                            container: !isNullOrUndefined(_this.inputObj) ? _this.inputObj.container : _this.inputObj,
                            selectionEnd: inputElement.selectionEnd
                        };
                        triggerFocus.call(_this, eventArgs, inputElement);
                    }, 110);
                    break;
                }
            }
            if (isNullOrUndefined(inputElement.value.match(escapeRegExp(this.promptChar)))) {
                eventArgs = {
                    selectionStart: inputElement.selectionStart,
                    event: event,
                    value: this.value,
                    maskedValue: inputElement.value,
                    container: !isNullOrUndefined(this.inputObj) ? this.inputObj.container : this.inputObj,
                    selectionEnd: inputElement.selectionEnd
                };
                triggerFocus.call(this, eventArgs, inputElement);
            }
            this.isClicked = false;
        }
    }
}
function triggerFocus(eventArgs, inputElement) {
    this.trigger('focus', eventArgs, function (eventArgs) {
        inputElement.selectionStart = eventArgs.selectionStart;
        inputElement.selectionEnd = eventArgs.selectionEnd;
    });
}
function escapeRegExp(text) {
    return !isNullOrUndefined(text) ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : text;
}
function maskInputBlurHandler(event) {
    this.blurEventArgs = {
        event: event,
        value: this.value,
        maskedValue: this.element.value,
        container: !isNullOrUndefined(this.inputObj) ? this.inputObj.container : this.inputObj
    };
    this.trigger('blur', this.blurEventArgs);
    if (this.mask) {
        this.isFocus = false;
        if (this.placeholder && this.element.value === this.promptMask && this.floatLabelType !== 'Always') {
            setElementValue.call(this, '');
            var labelElement = this.element.parentNode.querySelector('.e-float-text');
            if (this.floatLabelType === 'Auto' && !isNullOrUndefined(labelElement) && labelElement.classList.contains(TOPLABEL)) {
                removeClass([labelElement], TOPLABEL);
            }
        }
    }
}
function maskInputPasteHandler(event) {
    var _this = this;
    if (this.mask && !this.readonly) {
        var sIndex_1 = this.element.selectionStart;
        var eIndex_1 = this.element.selectionEnd;
        var oldValue_1 = this.element.value;
        setElementValue.call(this, '');
        this._callPasteHandler = true;
        setTimeout(function () {
            var value = _this.element.value.replace(/ /g, '');
            if (_this.redoCollec.length > 0 && _this.redoCollec[0].value === _this.element.value) {
                value = strippedValue.call(_this, _this.element);
            }
            setElementValue.call(_this, oldValue_1);
            _this.element.selectionStart = sIndex_1;
            _this.element.selectionEnd = eIndex_1;
            var i = 0;
            _this.maskKeyPress = true;
            do {
                validateValue.call(_this, value[i], false, null);
                ++i;
            } while (i < value.length);
            _this.maskKeyPress = false;
            _this._callPasteHandler = false;
            if (_this.element.value === oldValue_1) {
                var i_1 = 0;
                _this.maskKeyPress = true;
                do {
                    validateValue.call(_this, value[i_1], false, null);
                    ++i_1;
                } while (i_1 < value.length);
                _this.maskKeyPress = false;
            }
            else {
                triggerMaskChangeEvent.call(_this, event, oldValue_1);
            }
        }, 1);
    }
}
function maskInputCutHandler(event) {
    var _this = this;
    if (this.mask && !this.readonly) {
        var preValue_1 = this.element.value;
        var sIndex_2 = this.element.selectionStart;
        var eIndex = this.element.selectionEnd;
        this.undoCollec.push({ value: this.element.value, startIndex: this.element.selectionStart, endIndex: this.element.selectionEnd });
        var value_1 = this.element.value.substring(0, sIndex_2) + this.promptMask.substring(sIndex_2, eIndex) +
            this.element.value.substring(eIndex);
        setTimeout(function () {
            setElementValue.call(_this, value_1);
            _this.element.selectionStart = _this.element.selectionEnd = sIndex_2;
            if (_this.element.value !== preValue_1) {
                triggerMaskChangeEvent.call(_this, event, null);
            }
        }, 0);
    }
}
function maskInputDropHandler(event) {
    event.preventDefault();
}
function maskInputHandler(event) {
    if (Browser.isIE === true && this.element.value === '' && this.floatLabelType === 'Never') {
        return;
    }
    var eventArgs = { ctrlKey: false, keyCode: 229 };
    extend(event, eventArgs);
    if (this.mask) {
        if (this.element.value === '') {
            this.redoCollec.unshift({
                value: this.promptMask, startIndex: this.element.selectionStart, endIndex: this.element.selectionEnd
            });
        }
        if (this.element.value.length === 1) {
            this.element.value = this.element.value + this.promptMask;
            this.element.setSelectionRange(1, 1);
        }
        if (!this._callPasteHandler) {
            removeMaskInputValues.call(this, event);
        }
        if (this.element.value.length > this.promptMask.length) {
            var startIndex = this.element.selectionStart;
            var addedValues = this.element.value.length - this.promptMask.length;
            var value = this.element.value.substring(startIndex - addedValues, startIndex);
            this.maskKeyPress = false;
            var i = 0;
            do {
                validateValue.call(this, value[i], event.ctrlKey, event);
                ++i;
            } while (i < value.length);
            if (this.element.value !== this.preEleVal) {
                triggerMaskChangeEvent.call(this, event, null);
            }
        }
        var val = strippedValue.call(this, this.element);
        this.prevValue = val;
        this.value = val;
        if (val === '') {
            setElementValue.call(this, this.promptMask);
            this.element.setSelectionRange(0, 0);
        }
    }
}
function maskInputKeyDownHandler(event) {
    if (this.mask && !this.readonly) {
        if (event.keyCode !== 229) {
            if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
                event.preventDefault();
            }
            removeMaskInputValues.call(this, event);
        }
        var startValue = this.element.value;
        if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
            var collec = void 0;
            if (event.keyCode === 90 && this.undoCollec.length > 0 && startValue !== this.undoCollec[this.undoCollec.length - 1].value) {
                collec = this.undoCollec[this.undoCollec.length - 1];
                this.redoCollec.unshift({
                    value: this.element.value, startIndex: this.element.selectionStart,
                    endIndex: this.element.selectionEnd
                });
                setElementValue.call(this, collec.value);
                this.element.selectionStart = collec.startIndex;
                this.element.selectionEnd = collec.endIndex;
                this.undoCollec.splice(this.undoCollec.length - 1, 1);
            }
            else if (event.keyCode === 89 && this.redoCollec.length > 0 && startValue !== this.redoCollec[0].value) {
                collec = this.redoCollec[0];
                this.undoCollec.push({
                    value: this.element.value, startIndex: this.element.selectionStart,
                    endIndex: this.element.selectionEnd
                });
                setElementValue.call(this, collec.value);
                this.element.selectionStart = collec.startIndex;
                this.element.selectionEnd = collec.endIndex;
                this.redoCollec.splice(0, 1);
            }
        }
    }
}
function mobileRemoveFunction() {
    var collec;
    var sIndex = this.element.selectionStart;
    var eIndex = this.element.selectionEnd;
    if (this.redoCollec.length > 0) {
        collec = this.redoCollec[0];
        setElementValue.call(this, collec.value);
        if ((collec.startIndex - sIndex) === 1) {
            this.element.selectionStart = collec.startIndex;
            this.element.selectionEnd = collec.endIndex;
        }
        else {
            this.element.selectionStart = sIndex + 1;
            this.element.selectionEnd = eIndex + 1;
        }
    }
    else {
        setElementValue.call(this, this.promptMask);
        this.element.selectionStart = this.element.selectionEnd = sIndex;
    }
}
function autoFillMaskInputValues(isRemove, oldEventVal, event) {
    if (event.type === 'input') {
        isRemove = false;
        oldEventVal = this.element.value;
        setElementValue.call(this, this.promptMask);
        setMaskValue.call(this, oldEventVal);
    }
    return isRemove;
}
function removeMaskInputValues(event) {
    var isRemove = false;
    var oldEventVal;
    var isDeleted = false;
    if (this.element.value.length < this.promptMask.length) {
        isRemove = true;
        oldEventVal = this.element.value;
        isRemove = autoFillMaskInputValues.call(this, isRemove, oldEventVal, event);
        mobileRemoveFunction.call(this);
    }
    if (this.element.value.length >= this.promptMask.length && event.type === 'input') {
        isRemove = autoFillMaskInputValues.call(this, isRemove, oldEventVal, event);
    }
    var initStartIndex = this.element.selectionStart;
    var initEndIndex = this.element.selectionEnd;
    var startIndex = this.element.selectionStart;
    var endIndex = this.element.selectionEnd;
    var maskValue = this.hiddenMask.replace(/[>|\\<]/g, '');
    var curMask = maskValue[startIndex - 1];
    var deleteEndIndex = this.element.selectionEnd;
    if (isRemove || event.keyCode === 8 || event.keyCode === 46) {
        this.undoCollec.push({ value: this.element.value, startIndex: this.element.selectionStart, endIndex: endIndex });
        var multipleDel = false;
        var preValue = this.element.value;
        if (startIndex > 0 || ((event.keyCode === 8 || event.keyCode === 46) && startIndex < this.element.value.length
            && ((this.element.selectionEnd - startIndex) !== this.element.value.length))) {
            var index = startIndex;
            if (startIndex !== endIndex) {
                startIndex = endIndex;
                if (event.keyCode === 46) {
                    multipleDel = true;
                }
            }
            else if (event.keyCode === 46) {
                ++index;
            }
            else {
                --index;
            }
            for (var k = startIndex; (event.keyCode === 8 || isRemove || multipleDel) ? k > index : k < index; (event.keyCode === 8 || isRemove || multipleDel) ? k-- : k++) {
                for (var i = startIndex; (event.keyCode === 8 || isRemove || multipleDel) ? i > 0 : i < this.element.value.length; (event.keyCode === 8 || isRemove || multipleDel) ? i-- : i++) {
                    var sIndex = void 0;
                    if (((event.keyCode === 8 || multipleDel) && ((initStartIndex !== initEndIndex && initStartIndex !== startIndex) ||
                        (initStartIndex === initEndIndex))) || isRemove) {
                        curMask = maskValue[i - 1];
                        sIndex = startIndex - 1;
                    }
                    else {
                        curMask = maskValue[i];
                        sIndex = startIndex;
                        ++startIndex;
                    }
                    var oldValue = this.element.value[sIndex];
                    if ((isNullOrUndefined(this.regExpCollec["" + curMask]) && (!isNullOrUndefined(this.customCharacters)
                        && isNullOrUndefined(this.customCharacters["" + curMask]))
                        && ((this.hiddenMask[sIndex] !== this.promptChar && this.customRegExpCollec[sIndex][0] !== '['
                            && this.customRegExpCollec[sIndex][this.customRegExpCollec[sIndex].length - 1] !== ']')))
                        || (this.promptMask[sIndex] !== this.promptChar && isNullOrUndefined(this.customCharacters))) {
                        this.element.selectionStart = this.element.selectionEnd = sIndex;
                        event.preventDefault();
                        if (event.keyCode === 46 && !multipleDel) {
                            ++this.element.selectionStart;
                        }
                    }
                    else {
                        var value = this.element.value;
                        var prompt_1 = this.promptChar;
                        var elementValue = value.substring(0, sIndex) + prompt_1 + value.substring(startIndex, value.length);
                        setElementValue.call(this, elementValue);
                        event.preventDefault();
                        if (event.keyCode === 46 && !multipleDel) {
                            sIndex++;
                        }
                        this.element.selectionStart = this.element.selectionEnd = sIndex;
                        isDeleted = true;
                    }
                    startIndex = this.element.selectionStart;
                    if ((!isDeleted && event.keyCode === 8) || multipleDel || (!isDeleted && !(event.keyCode === 46))) {
                        sIndex = startIndex - 1;
                    }
                    else {
                        sIndex = startIndex;
                        isDeleted = false;
                    }
                    oldValue = this.element.value[sIndex];
                    if (((initStartIndex !== initEndIndex) && (this.element.selectionStart === initStartIndex))
                        || (this.promptMask[sIndex] === this.promptChar) || ((oldValue !== this.promptMask[sIndex]) &&
                        (this.promptMask[sIndex] !== this.promptChar) && !isNullOrUndefined(this.customCharacters))) {
                        break;
                    }
                }
            }
        }
        if (event.keyCode === 46 && multipleDel && isDeleted) {
            this.element.selectionStart = this.element.selectionEnd = deleteEndIndex;
        }
        if (this.element.selectionStart === 0 && (this.element.selectionEnd === this.element.value.length)) {
            setElementValue.call(this, this.promptMask);
            event.preventDefault();
            this.element.selectionStart = this.element.selectionEnd = startIndex;
        }
        this.redoCollec.unshift({
            value: this.element.value, startIndex: this.element.selectionStart,
            endIndex: this.element.selectionEnd
        });
        if (this.element.value !== preValue) {
            triggerMaskChangeEvent.call(this, event, oldEventVal);
        }
    }
}
function maskInputKeyPressHandler(event) {
    if (this.mask && !this.readonly) {
        var oldValue = this.element.value;
        if (!(event.ctrlKey || event.metaKey) || ((event.ctrlKey || event.metaKey) && event.code !== 'KeyA' && event.code !== 'KeyY'
            && event.code !== 'KeyZ' && event.code !== 'KeyX' && event.code !== 'KeyC' && event.code !== 'KeyV')) {
            this.maskKeyPress = true;
            var key = event.key;
            if (key === 'Spacebar') {
                key = String.fromCharCode(event.keyCode);
            }
            if (!key) {
                this.isIosInvalid = true;
                validateValue.call(this, String.fromCharCode(event.keyCode), event.ctrlKey, event);
                event.preventDefault();
                this.isIosInvalid = false;
            }
            else if (key && key.length === 1) {
                validateValue.call(this, key, event.ctrlKey, event);
                event.preventDefault();
            }
            if (event.keyCode === 32 && key === ' ' && this.promptChar === ' ') {
                this.element.selectionStart = this.element.selectionEnd = this.element.selectionStart - key.length;
            }
        }
        if (this.element.value !== oldValue) {
            triggerMaskChangeEvent.call(this, event, oldValue);
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function triggerMaskChangeEvent(event, oldValue) {
    var prevOnChange = this.isProtectedOnChange;
    if (!isNullOrUndefined(this.changeEventArgs) && !this.isInitial) {
        var eventArgs = {};
        this.changeEventArgs = { value: this.element.value, maskedValue: this.element.value, isInteraction: false, isInteracted: false };
        if (this.mask) {
            this.changeEventArgs.value = strippedValue.call(this, this.element);
        }
        if (!isNullOrUndefined(event)) {
            this.changeEventArgs.isInteracted = true;
            this.changeEventArgs.isInteraction = true;
            this.changeEventArgs.event = event;
        }
        this.isProtectedOnChange = true;
        this.value = this.changeEventArgs.value;
        this.isProtectedOnChange = prevOnChange;
        merge(eventArgs, this.changeEventArgs);
        /* istanbul ignore next */
        if (this.isAngular && this.preventChange) {
            this.preventChange = false;
        }
        else {
            this.trigger('change', eventArgs);
        }
    }
    this.preEleVal = this.element.value;
    this.prevValue = strippedValue.call(this, this.element);
}
function maskInputKeyUpHandler(event) {
    if (this.mask && !this.readonly) {
        var collec = void 0;
        if (!this.maskKeyPress && event.keyCode === 229) {
            var oldEventVal = void 0;
            if (this.element.value.length === 1) {
                this.element.value = this.element.value + this.promptMask;
                this.element.setSelectionRange(1, 1);
            }
            if (this.element.value.length > this.promptMask.length) {
                var startIndex = this.element.selectionStart;
                var addedValues = this.element.value.length - this.promptMask.length;
                var val_1 = this.element.value.substring(startIndex - addedValues, startIndex);
                if (this.undoCollec.length > 0) {
                    collec = this.undoCollec[this.undoCollec.length - 1];
                    var startIndex_1 = this.element.selectionStart;
                    oldEventVal = collec.value;
                    var oldVal = collec.value.substring(startIndex_1 - addedValues, startIndex_1);
                    collec = this.redoCollec[0];
                    val_1 = val_1.trim();
                    var isSpace = Browser.isAndroid && val_1 === '';
                    if (!isSpace && oldVal !== val_1 && collec.value.substring(startIndex_1 - addedValues, startIndex_1) !== val_1) {
                        validateValue.call(this, val_1, event.ctrlKey, event);
                    }
                    else if (isSpace) {
                        preventUnsupportedValues.call(this, event, startIndex_1 - 1, this.element.selectionEnd - 1, val_1, event.ctrlKey, false);
                    }
                }
                else {
                    oldEventVal = this.promptMask;
                    validateValue.call(this, val_1, event.ctrlKey, event);
                }
                this.maskKeyPress = false;
                triggerMaskChangeEvent.call(this, event, oldEventVal);
            }
        }
        else {
            removeMaskError.call(this);
        }
        var val = strippedValue.call(this, this.element);
        if (!((this.element.selectionStart === 0) && (this.promptMask === this.element.value) && val === '')
            || (val === '' && this.value !== val)) {
            this.prevValue = val;
            this.value = val;
        }
    }
    else {
        triggerMaskChangeEvent.call(this, event);
    }
    if (this.element.selectionStart === 0 && this.element.selectionEnd === 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var temp_1 = this.element;
        setTimeout(function () {
            temp_1.setSelectionRange(0, 0);
        }, 0);
    }
}
function mobileSwipeCheck(key) {
    if (key.length > 1 && ((this.promptMask.length + key.length) < this.element.value.length)) {
        var elementValue = this.redoCollec[0].value.substring(0, this.redoCollec[0].startIndex) + key +
            this.redoCollec[0].value.substring(this.redoCollec[0].startIndex, this.redoCollec[0].value.length);
        setElementValue.call(this, elementValue);
        this.element.selectionStart = this.element.selectionEnd = this.redoCollec[0].startIndex + key.length;
    }
    this.element.selectionStart = this.element.selectionStart - key.length;
    this.element.selectionEnd = this.element.selectionEnd - key.length;
}
function mobileValidation(key) {
    if (!this.maskKeyPress) {
        mobileSwipeCheck.call(this, key);
    }
}
function validateValue(key, isCtrlKey, event) {
    mobileValidation.call(this, key);
    if (isNullOrUndefined(this) || isNullOrUndefined(key)) {
        return;
    }
    var startIndex = this.element.selectionStart;
    var initStartIndex = startIndex;
    var curMask;
    var allowText = false;
    var value = this.element.value;
    var eventOldVal;
    var prevSupport = false;
    var isEqualVal = false;
    for (var k = 0; k < key.length; k++) {
        var keyValue = key[k];
        startIndex = this.element.selectionStart;
        if (!this.maskKeyPress && initStartIndex === startIndex) {
            startIndex = startIndex + k;
        }
        if ((!this.maskKeyPress || startIndex < this.promptMask.length)) {
            for (var i = startIndex; i < this.promptMask.length; i++) {
                var maskValue = this.escapeMaskValue;
                curMask = maskValue[startIndex];
                if (this.hiddenMask[startIndex] === '\\' && this.hiddenMask[startIndex + 1] === key) {
                    isEqualVal = true;
                }
                if ((isNullOrUndefined(this.regExpCollec["" + curMask]) && (isNullOrUndefined(this.customCharacters)
                    || (!isNullOrUndefined(this.customCharacters) && isNullOrUndefined(this.customCharacters["" + curMask])))
                    && ((this.hiddenMask[startIndex] !== this.promptChar && this.customRegExpCollec[startIndex][0] !== '['
                        && this.customRegExpCollec[startIndex][this.customRegExpCollec[startIndex].length - 1] !== ']')))
                    || ((this.promptMask[startIndex] !== this.promptChar) && isNullOrUndefined(this.customCharacters))
                    || (this.promptChar === curMask && this.escapeMaskValue === this.mask)) {
                    this.element.selectionStart = this.element.selectionEnd = startIndex + 1;
                    startIndex = this.element.selectionStart;
                    curMask = this.hiddenMask[startIndex];
                }
            }
            if (!isNullOrUndefined(this.customCharacters) && !isNullOrUndefined(this.customCharacters["" + curMask])) {
                var customValStr = this.customCharacters["" + curMask];
                var customValArr = customValStr.split(',');
                for (var i = 0; i < customValArr.length; i++) {
                    /* eslint-disable-next-line security/detect-non-literal-regexp */
                    if (keyValue.match(new RegExp('[' + customValArr[i] + ']'))) {
                        allowText = true;
                        break;
                    }
                }
                /* eslint-disable-next-line security/detect-non-literal-regexp */
            }
            else if (!isNullOrUndefined(this.regExpCollec["" + curMask]) && keyValue.match(new RegExp(this.regExpCollec["" + curMask]))
                && this.promptMask[startIndex] === this.promptChar) {
                allowText = true;
            }
            else if (this.promptMask[startIndex] === this.promptChar && this.customRegExpCollec[startIndex][0] === '['
                && this.customRegExpCollec[startIndex][this.customRegExpCollec[startIndex].length - 1] === ']'
                /* eslint-disable-next-line security/detect-non-literal-regexp */
                && keyValue.match(new RegExp(this.customRegExpCollec[startIndex]))) {
                allowText = true;
            }
            if ((!this.maskKeyPress || startIndex < this.hiddenMask.length) && allowText) {
                if (k === 0) {
                    if (this.maskKeyPress) {
                        this.undoCollec.push({ value: value, startIndex: startIndex, endIndex: startIndex });
                    }
                    else {
                        var sIndex = this.element.selectionStart;
                        var eIndex = this.element.selectionEnd;
                        if (this.redoCollec.length > 0) {
                            eventOldVal = this.redoCollec[0].value;
                            setElementValue.call(this, eventOldVal);
                            this.undoCollec.push(this.redoCollec[0]);
                        }
                        else {
                            this.undoCollec.push({ value: this.promptMask, startIndex: startIndex, endIndex: startIndex });
                            eventOldVal = this.promptMask;
                            setElementValue.call(this, eventOldVal);
                        }
                        this.element.selectionStart = sIndex;
                        this.element.selectionEnd = eIndex;
                    }
                }
                startIndex = this.element.selectionStart;
                applySupportedValues.call(this, event, startIndex, keyValue, eventOldVal, isEqualVal);
                prevSupport = true;
                if (k === key.length - 1) {
                    this.redoCollec.unshift({
                        value: this.element.value, startIndex: this.element.selectionStart, endIndex: this.element.selectionEnd
                    });
                }
                allowText = false;
            }
            else {
                startIndex = this.element.selectionStart;
                preventUnsupportedValues.call(this, event, startIndex, initStartIndex, key, isCtrlKey, prevSupport);
            }
            if (k === key.length - 1 && !allowText) {
                if (!Browser.isAndroid || (Browser.isAndroid && startIndex < this.promptMask.length)) {
                    this.redoCollec.unshift({
                        value: this.element.value, startIndex: this.element.selectionStart, endIndex: this.element.selectionEnd
                    });
                }
            }
        }
        else {
            if (key.length === 1 && !isCtrlKey && !isNullOrUndefined(event)) {
                addMaskErrorClass.call(this);
            }
        }
    }
}
function applySupportedValues(event, startIndex, keyValue, eventOldVal, isEqualVal) {
    if (this.hiddenMask.length > this.promptMask.length) {
        keyValue = changeToLowerUpperCase.call(this, keyValue, this.element.value);
    }
    if (!isEqualVal) {
        var value = this.element.value;
        var elementValue = value.substring(0, startIndex) + keyValue + value.substring(startIndex + 1, value.length);
        setElementValue.call(this, elementValue);
        this.element.selectionStart = this.element.selectionEnd = startIndex + 1;
    }
}
function preventUnsupportedValues(event, sIdx, idx, key, ctrl, chkSupport) {
    if (!this.maskKeyPress) {
        var value = this.element.value;
        if (sIdx >= this.promptMask.length) {
            setElementValue.call(this, value.substring(0, sIdx));
        }
        else {
            if (idx === sIdx) {
                setElementValue.call(this, value.substring(0, sIdx) + value.substring(sIdx + 1, value.length));
            }
            else {
                if (this.promptMask.length === this.element.value.length) {
                    setElementValue.call(this, value.substring(0, sIdx) + value.substring(sIdx, value.length));
                }
                else {
                    setElementValue.call(this, value.substring(0, idx) + value.substring(idx + 1, value.length));
                }
            }
            this.element.selectionStart = this.element.selectionEnd = (chkSupport ||
                this.element.value[idx] !== this.promptChar) ? sIdx : idx;
        }
        addMaskErrorClass.call(this);
    }
    if (key.length === 1 && !ctrl && !isNullOrUndefined(event)) {
        addMaskErrorClass.call(this);
    }
}
function addMaskErrorClass() {
    var _this = this;
    var parentElement = this.element.parentNode;
    var timer = 200;
    if (parentElement.classList.contains(INPUTGROUP) || parentElement.classList.contains(FLOATINPUT)) {
        addClass([parentElement], ERROR$1);
    }
    else {
        addClass([this.element], ERROR$1);
    }
    if (this.isIosInvalid === true) {
        timer = 400;
    }
    attributes(this.element, { 'aria-invalid': 'true' });
    setTimeout(function () {
        if (!_this.maskKeyPress) {
            removeMaskError.call(_this);
        }
    }, timer);
}
function removeMaskError() {
    var parentElement = this.element.parentNode;
    if (!isNullOrUndefined(parentElement)) {
        removeClass([parentElement], ERROR$1);
    }
    removeClass([this.element], ERROR$1);
    attributes(this.element, { 'aria-invalid': 'false' });
}
/**
 * Validates user input using masking elements '<' , '>' and '|'.
 *
 * @hidden
 */
function changeToLowerUpperCase(key, value) {
    var promptMask;
    var i;
    var curVal = value;
    var caseCount = 0;
    for (i = 0; i < this.hiddenMask.length; i++) {
        if (this.hiddenMask[i] === '\\') {
            promptMask = curVal.substring(0, i) + '\\' + curVal.substring(i, curVal.length);
        }
        if (this.hiddenMask[i] === '>' || this.hiddenMask[i] === '<' || this.hiddenMask[i] === '|') {
            if (this.hiddenMask[i] !== curVal[i]) {
                promptMask = curVal.substring(0, i) + this.hiddenMask[i] + curVal.substring(i, curVal.length);
            }
            ++caseCount;
        }
        if (promptMask) {
            if (((promptMask[i] === this.promptChar) && (i > this.element.selectionStart)) ||
                (this.element.value.indexOf(this.promptChar) < 0 && (this.element.selectionStart + caseCount) === i)) {
                caseCount = 0;
                break;
            }
            curVal = promptMask;
        }
    }
    while (i >= 0 && promptMask) {
        if (i === 0 || promptMask[i - 1] !== '\\') {
            if (promptMask[i] === '>') {
                key = key.toUpperCase();
                break;
            }
            else if (promptMask[i] === '<') {
                key = key.toLowerCase();
                break;
            }
            else if (promptMask[i] === '|') {
                break;
            }
        }
        --i;
    }
    return key;
}
/**
 * To set updated values in the MaskedTextBox.
 *
 * @hidden
 */
function setMaskValue(val) {
    if (this.mask && val !== undefined && (this.prevValue === undefined || this.prevValue !== val)) {
        this.maskKeyPress = true;
        setElementValue.call(this, this.promptMask);
        if (val !== '' && !(val === null && this.floatLabelType === 'Never' && this.placeholder)) {
            this.element.selectionStart = 0;
            this.element.selectionEnd = 0;
        }
        if (val !== null) {
            for (var i = 0; i < val.length; i++) {
                validateValue.call(this, val[i], false, null);
            }
        }
        var newVal = strippedValue.call(this, this.element);
        this.prevValue = newVal;
        this.value = newVal;
        triggerMaskChangeEvent.call(this, null, null);
        this.maskKeyPress = false;
        var labelElement = this.element.parentNode.querySelector('.e-float-text');
        if (this.element.value === this.promptMask && this.floatLabelType === 'Auto' && this.placeholder &&
            !isNullOrUndefined(labelElement) && labelElement.classList.contains(TOPLABEL) && !this.isFocus) {
            removeClass([labelElement], TOPLABEL);
            addClass([labelElement], BOTTOMLABEL);
            setElementValue.call(this, '');
        }
    }
    if (this.mask === null || this.mask === '' && this.value !== undefined) {
        setElementValue.call(this, this.value);
    }
}
/**
 * To set updated values in the input element.
 *
 * @hidden
 */
function setElementValue(val, element) {
    if (!this.isFocus && this.floatLabelType === 'Auto' && this.placeholder && isNullOrUndefined(this.value)) {
        val = '';
    }
    var value = strippedValue.call(this, (element ? element : this.element), val);
    if (value === null || value === '') {
        Input.setValue(val, (element ? element : this.element), this.floatLabelType, false);
        if (this.showClearButton) {
            this.inputObj.clearButton.classList.add('e-clear-icon-hide');
        }
    }
    else {
        Input.setValue(val, (element ? element : this.element), this.floatLabelType, this.showClearButton);
    }
}
/**
 * Provide mask support to input textbox through utility method.
 *
 * @hidden
 */
function maskInput(args) {
    var inputEle = getMaskInput(args);
    applyMask.call(inputEle);
    var val = strippedValue.call(this, this.element);
    this.prevValue = val;
    this.value = val;
    if (args.mask) {
        unwireEvents.call(inputEle);
        wireEvents.call(inputEle);
    }
}
function getMaskInput(args) {
    addClass([args.element], UTILMASK);
    var inputEle = {
        element: args.element,
        mask: args.mask,
        promptMask: '',
        hiddenMask: '',
        escapeMaskValue: '',
        promptChar: args.promptChar ? (args.promptChar.length > 1) ? args.promptChar = args.promptChar[0]
            : args.promptChar : '_',
        value: args.value ? args.value : null,
        regExpCollec: regularExpressions,
        customRegExpCollec: [],
        customCharacters: args.customCharacters,
        undoCollec: [],
        redoCollec: [],
        maskKeyPress: false,
        prevValue: ''
    };
    createMask.call(inputEle);
    return inputEle;
}
/**
 * Gets raw value of the textbox which has been masked through utility method.
 *
 * @hidden
 */
function getVal(args) {
    return strippedValue.call(getUtilMaskEle(args), args.element);
}
/**
 * Gets masked value of the textbox which has been masked through utility method.
 *
 * @hidden
 */
function getMaskedVal(args) {
    return unstrippedValue.call(getUtilMaskEle(args), args.element);
}
function getUtilMaskEle(args) {
    var inputEle;
    if (!isNullOrUndefined(args) && args.element.classList.contains(UTILMASK)) {
        inputEle = getMaskInput(args);
    }
    return inputEle;
}
/**
 * Arguments to perform undo and redo functionalities.
 *
 * @hidden
 */
var MaskUndo = /** @class */ (function () {
    function MaskUndo() {
    }
    return MaskUndo;
}());
/* eslint-enable valid-jsdoc, jsdoc/require-jsdoc, jsdoc/require-returns, jsdoc/require-param */

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
var ROOT$1 = 'e-control-wrapper e-mask';
var INPUT = 'e-input';
var COMPONENT$1 = 'e-maskedtextbox';
var CONTROL$1 = 'e-control';
var MASKINPUT_FOCUS = 'e-input-focus';
var wrapperAttr = ['title', 'style', 'class'];
/**
 * The MaskedTextBox allows the user to enter the valid input only based on the provided mask.
 * ```html
 * <input id="mask" type="text" />
 * ```
 * ```typescript
 * <script>
 * var maskObj = new MaskedTextBox({ mask: "(999) 9999-999" });
 * maskObj.appendTo('#mask');
 * </script>
 * ```
 */
var MaskedTextBox = /** @class */ (function (_super) {
    __extends$1(MaskedTextBox, _super);
    /**
     *
     * @param {MaskedTextBoxModel} options - Specifies the MaskedTextBox model.
     * @param {string | HTMLElement | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function MaskedTextBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.initInputValue = '';
        _this.preventChange = false;
        _this.isClicked = false;
        _this.maskOptions = options;
        return _this;
    }
    /**
     * Gets the component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    MaskedTextBox.prototype.getModuleName = function () {
        return 'maskedtextbox';
    };
    /**
     * Initializes the event handler
     *
     * @returns {void}
     * @private
     */
    MaskedTextBox.prototype.preRender = function () {
        this.promptMask = '';
        this.hiddenMask = '';
        this.escapeMaskValue = '';
        this.regExpCollec = regularExpressions;
        this.customRegExpCollec = [];
        this.maskedRegExp = [];
        this.undoCollec = [];
        this.redoCollec = [];
        this.changeEventArgs = {};
        this.focusEventArgs = {};
        this.blurEventArgs = {};
        this.maskKeyPress = false;
        this.isFocus = false;
        this.isInitial = false;
        this.isIosInvalid = false;
        var ejInstance = getValue('ej2_instances', this.element);
        this.cloneElement = this.element.cloneNode(true);
        removeClass([this.cloneElement], [CONTROL$1, COMPONENT$1, 'e-lib']);
        this.angularTagName = null;
        this.formElement = closest(this.element, 'form');
        if (this.element.tagName === 'EJS-MASKEDTEXTBOX') {
            this.angularTagName = this.element.tagName;
            var input = this.createElement('input');
            for (var i = 0; i < this.element.attributes.length; i++) {
                input.setAttribute(this.element.attributes[i].nodeName, this.element.attributes[i].nodeValue);
                input.innerHTML = this.element.innerHTML;
            }
            if (this.element.hasAttribute('id')) {
                this.element.removeAttribute('id');
            }
            if (this.element.hasAttribute('name')) {
                this.element.removeAttribute('name');
            }
            this.element.classList.remove('e-control', 'e-maskedtextbox');
            this.element.classList.add('e-mask-container');
            this.element.appendChild(input);
            this.element = input;
            setValue('ej2_instances', ejInstance, this.element);
        }
        this.updateHTMLAttrToElement();
        this.checkHtmlAttributes(false);
        if (this.formElement) {
            this.initInputValue = this.value;
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string}
     */
    MaskedTextBox.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Initializes the component rendering.
     *
     * @returns {void}
     * @private
     */
    MaskedTextBox.prototype.render = function () {
        if (this.element.tagName.toLowerCase() === 'input') {
            if (this.floatLabelType === 'Never') {
                addClass([this.element], INPUT);
            }
            this.createWrapper();
            this.updateHTMLAttrToWrapper();
            if (this.element.name === '') {
                this.element.setAttribute('name', this.element.id);
            }
            this.isInitial = true;
            this.resetMaskedTextBox();
            this.isInitial = false;
            this.setMaskPlaceholder(true, false);
            this.setWidth(this.width);
            this.preEleVal = this.element.value;
            if (!Browser.isDevice && (Browser.info.version === '11.0' || Browser.info.name === 'edge')) {
                this.element.blur();
            }
            if (Browser.isDevice && Browser.isIos) {
                this.element.blur();
            }
            if (this.element.getAttribute('value') || this.value) {
                this.element.setAttribute('value', this.element.value);
            }
            if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
                this.enabled = false;
            }
            if (!this.element.hasAttribute('aria-labelledby') && !this.element.hasAttribute('placeholder') && !this.element.hasAttribute('aria-label')) {
                this.element.setAttribute('aria-label', 'maskedtextbox');
            }
            this.renderComplete();
        }
    };
    MaskedTextBox.prototype.updateHTMLAttrToElement = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (wrapperAttr.indexOf(key) < 0) {
                    this.element.setAttribute(key, this.htmlAttributes["" + key]);
                }
            }
        }
    };
    MaskedTextBox.prototype.updateCssClass = function (newClass, oldClass) {
        Input.setCssClass(this.getValidClassList(newClass), [this.inputObj.container], this.getValidClassList(oldClass));
    };
    MaskedTextBox.prototype.getValidClassList = function (maskClassName) {
        var result = maskClassName;
        if (!isNullOrUndefined(maskClassName) && maskClassName !== '') {
            result = (maskClassName.replace(/\s+/g, ' ')).trim();
        }
        return result;
    };
    MaskedTextBox.prototype.updateHTMLAttrToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (wrapperAttr.indexOf(key) > -1) {
                    if (key === 'class') {
                        var updatedClassValues = (this.htmlAttributes["" + key].replace(/\s+/g, ' ')).trim();
                        if (updatedClassValues !== '') {
                            addClass([this.inputObj.container], updatedClassValues.split(' '));
                        }
                    }
                    else if (key === 'style') {
                        var maskStyle = this.inputObj.container.getAttribute(key);
                        maskStyle = !isNullOrUndefined(maskStyle) ? (maskStyle + this.htmlAttributes["" + key]) :
                            this.htmlAttributes["" + key];
                        this.inputObj.container.setAttribute(key, maskStyle);
                    }
                    else {
                        this.inputObj.container.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                }
            }
        }
    };
    MaskedTextBox.prototype.resetMaskedTextBox = function () {
        this.promptMask = '';
        this.hiddenMask = '';
        this.escapeMaskValue = '';
        this.customRegExpCollec = [];
        this.undoCollec = [];
        this.redoCollec = [];
        if (this.promptChar && this.promptChar.length > 1) {
            this.promptChar = this.promptChar[0];
        }
        createMask.call(this);
        applyMask.call(this);
        if (this.mask === null || this.mask === '' && this.value !== undefined) {
            setElementValue.call(this, this.value);
        }
        var val = strippedValue.call(this, this.element);
        this.prevValue = val;
        this.value = val;
        if (!this.isInitial) {
            unwireEvents.call(this);
        }
        wireEvents.call(this);
    };
    MaskedTextBox.prototype.setMaskPlaceholder = function (setVal, dynamicPlaceholder) {
        if (dynamicPlaceholder || this.placeholder) {
            Input.setPlaceholder(this.placeholder, this.element);
            if ((this.element.value === this.promptMask && setVal && this.floatLabelType !== 'Always') ||
                this.element.value === this.promptMask && this.floatLabelType === 'Never') {
                setElementValue.call(this, '');
            }
        }
    };
    MaskedTextBox.prototype.setWidth = function (width) {
        if (!isNullOrUndefined(width)) {
            if (typeof width === 'number') {
                this.inputObj.container.style.width = formatUnit(width);
                this.element.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                var elementWidth = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
                this.inputObj.container.style.width = elementWidth;
                this.element.style.width = elementWidth;
            }
        }
    };
    MaskedTextBox.prototype.checkHtmlAttributes = function (isDynamic) {
        var attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes)
            : ['placeholder', 'disabled', 'value', 'readonly'];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var key = attributes_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(key))) {
                switch (key) {
                    case 'placeholder':
                        if ((isNullOrUndefined(this.maskOptions) || (this.maskOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'disabled':
                        if ((isNullOrUndefined(this.maskOptions) || (this.maskOptions['enabled'] === undefined)) || isDynamic) {
                            var isEnabled = this.element.getAttribute(key) === 'disabled' || this.element.getAttribute(key) === '' ||
                                this.element.getAttribute(key) === 'true' ? false : true;
                            this.setProperties({ enabled: isEnabled }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.maskOptions) || (this.maskOptions['value'] === undefined)) || isDynamic) {
                            this.setProperties({ value: this.element.value }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.maskOptions) || (this.maskOptions['readonly'] === undefined)) || isDynamic) {
                            var isReadonly = this.element.getAttribute(key) === 'readonly' || this.element.getAttribute(key) === ''
                                || this.element.getAttribute(key) === 'true' ? true : false;
                            this.setProperties({ readonly: isReadonly }, !isDynamic);
                        }
                        break;
                }
            }
        }
    };
    MaskedTextBox.prototype.createWrapper = function () {
        var updatedCssClassValues = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValues = this.getValidClassList(this.cssClass);
        }
        this.inputObj = Input.createInput({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: {
                enableRtl: this.enableRtl,
                cssClass: updatedCssClassValues,
                enabled: this.enabled,
                readonly: this.readonly,
                placeholder: this.placeholder,
                showClearButton: this.showClearButton
            }
        }, this.createElement);
        this.inputObj.container.setAttribute('class', ROOT$1 + ' ' + this.inputObj.container.getAttribute('class'));
    };
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {MaskedTextBoxModel} newProp - Returns the dynamic property value of the component.
     * @param {MaskedTextBoxModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @hidden
     */
    MaskedTextBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'value':
                    setMaskValue.call(this, this.value);
                    if (this.placeholder && !this.isFocus) {
                        this.setMaskPlaceholder(false, false);
                    }
                    if (this.value === '' && oldProp.value != null) {
                        this.element.selectionStart = 0;
                        this.element.selectionEnd = 0;
                    }
                    break;
                case 'placeholder':
                    this.setMaskPlaceholder(true, true);
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    Input.calculateWidth(this.element, this.inputObj.container);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enabled':
                    Input.setEnabled(newProp.enabled, this.element, this.floatLabelType, this.inputObj.container);
                    break;
                case 'readonly':
                    Input.setReadonly(newProp.readonly, this.element);
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(newProp.enableRtl, [this.inputObj.container]);
                    break;
                case 'customCharacters':
                    this.customCharacters = newProp.customCharacters;
                    this.resetMaskedTextBox();
                    break;
                case 'showClearButton':
                    Input.setClearButton(newProp.showClearButton, this.element, this.inputObj, undefined, this.createElement);
                    bindClearEvent.call(this);
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputObj);
                    Input.addFloating(this.element, this.floatLabelType, this.placeholder, this.createElement);
                    break;
                case 'htmlAttributes':
                    this.updateHTMLAttrToElement();
                    this.updateHTMLAttrToWrapper();
                    this.checkHtmlAttributes(true);
                    break;
                case 'mask':
                    {
                        var strippedValue_1 = this.value;
                        this.mask = newProp.mask;
                        this.maskedRegExp = [];
                        this.updateValue(strippedValue_1);
                    }
                    break;
                case 'promptChar': {
                    if (newProp.promptChar.length > 1) {
                        newProp.promptChar = newProp.promptChar[0];
                    }
                    if (newProp.promptChar) {
                        this.promptChar = newProp.promptChar;
                    }
                    else {
                        this.promptChar = '_';
                    }
                    /* eslint-disable-next-line security/detect-non-literal-regexp */
                    var value = this.element.value.replace(new RegExp('[' + oldProp.promptChar + ']', 'g'), this.promptChar);
                    if (this.promptMask === this.element.value) {
                        /* eslint-disable-next-line security/detect-non-literal-regexp */
                        value = this.promptMask.replace(new RegExp('[' + oldProp.promptChar + ']', 'g'), this.promptChar);
                    }
                    /* eslint-disable-next-line security/detect-non-literal-regexp */
                    this.promptMask = this.promptMask.replace(new RegExp('[' + oldProp.promptChar + ']', 'g'), this.promptChar);
                    this.undoCollec = this.redoCollec = [];
                    setElementValue.call(this, value);
                    break;
                }
            }
        }
        this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
    };
    MaskedTextBox.prototype.updateValue = function (strippedVal) {
        this.resetMaskedTextBox();
        setMaskValue.call(this, strippedVal);
    };
    /**
     * Gets the value of the MaskedTextBox with the masked format.
     * By using `value` property, you can get the raw value of maskedtextbox without literals and prompt characters.
     *
     * @returns {string} Returns the value with the masked format.
     */
    MaskedTextBox.prototype.getMaskedValue = function () {
        return unstrippedValue.call(this, this.element);
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    MaskedTextBox.prototype.focusIn = function () {
        if (document.activeElement !== this.element && this.enabled) {
            this.isFocus = true;
            this.element.focus();
            addClass([this.inputObj.container], [MASKINPUT_FOCUS]);
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    MaskedTextBox.prototype.focusOut = function () {
        if (document.activeElement === this.element && this.enabled) {
            this.isFocus = false;
            this.element.blur();
            removeClass([this.inputObj.container], [MASKINPUT_FOCUS]);
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    MaskedTextBox.prototype.destroy = function () {
        unwireEvents.call(this);
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        var attrArray = ['aria-labelledby', 'role', 'autocomplete', 'aria-readonly',
            'aria-disabled', 'autocapitalize', 'spellcheck', 'aria-autocomplete', 'aria-live', 'aria-invalid'];
        for (var i = 0; i < attrArray.length; i++) {
            this.element.removeAttribute(attrArray[i]);
        }
        this.element.classList.remove('e-input');
        if (this.inputObj) {
            this.inputObj.container.insertAdjacentElement('afterend', this.element);
            detach(this.inputObj.container);
        }
        this.blurEventArgs = null;
        Input.destroy({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        this.changeEventArgs = null;
        this.inputObj = null;
        _super.prototype.destroy.call(this);
    };
    __decorate$1([
        Property(null)
    ], MaskedTextBox.prototype, "cssClass", void 0);
    __decorate$1([
        Property(null)
    ], MaskedTextBox.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], MaskedTextBox.prototype, "placeholder", void 0);
    __decorate$1([
        Property('Never')
    ], MaskedTextBox.prototype, "floatLabelType", void 0);
    __decorate$1([
        Property({})
    ], MaskedTextBox.prototype, "htmlAttributes", void 0);
    __decorate$1([
        Property(true)
    ], MaskedTextBox.prototype, "enabled", void 0);
    __decorate$1([
        Property(false)
    ], MaskedTextBox.prototype, "readonly", void 0);
    __decorate$1([
        Property(false)
    ], MaskedTextBox.prototype, "showClearButton", void 0);
    __decorate$1([
        Property(false)
    ], MaskedTextBox.prototype, "enablePersistence", void 0);
    __decorate$1([
        Property(null)
    ], MaskedTextBox.prototype, "mask", void 0);
    __decorate$1([
        Property('_')
    ], MaskedTextBox.prototype, "promptChar", void 0);
    __decorate$1([
        Property(null)
    ], MaskedTextBox.prototype, "value", void 0);
    __decorate$1([
        Property(null)
    ], MaskedTextBox.prototype, "customCharacters", void 0);
    __decorate$1([
        Event()
    ], MaskedTextBox.prototype, "created", void 0);
    __decorate$1([
        Event()
    ], MaskedTextBox.prototype, "destroyed", void 0);
    __decorate$1([
        Event()
    ], MaskedTextBox.prototype, "change", void 0);
    __decorate$1([
        Event()
    ], MaskedTextBox.prototype, "focus", void 0);
    __decorate$1([
        Event()
    ], MaskedTextBox.prototype, "blur", void 0);
    MaskedTextBox = __decorate$1([
        NotifyPropertyChanges
    ], MaskedTextBox);
    return MaskedTextBox;
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
/**
 * Configures the ticks data of the Slider.
 */
var TicksData = /** @class */ (function (_super) {
    __extends$2(TicksData, _super);
    function TicksData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('None')
    ], TicksData.prototype, "placement", void 0);
    __decorate$2([
        Property(10)
    ], TicksData.prototype, "largeStep", void 0);
    __decorate$2([
        Property(1)
    ], TicksData.prototype, "smallStep", void 0);
    __decorate$2([
        Property(false)
    ], TicksData.prototype, "showSmallTicks", void 0);
    __decorate$2([
        Property(null)
    ], TicksData.prototype, "format", void 0);
    return TicksData;
}(ChildProperty));
/**
 * It illustrates the color track data in slider.
 * {% codeBlock src='slider/colorrange/index.md' %}{% endcodeBlock %}
 */
var ColorRangeData = /** @class */ (function (_super) {
    __extends$2(ColorRangeData, _super);
    function ColorRangeData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(null)
    ], ColorRangeData.prototype, "color", void 0);
    __decorate$2([
        Property(null)
    ], ColorRangeData.prototype, "start", void 0);
    __decorate$2([
        Property(null)
    ], ColorRangeData.prototype, "end", void 0);
    return ColorRangeData;
}(ChildProperty));
/**
 * It illustrates the limit data in slider.
 * {% codeBlock src='slider/limits/index.md' %}{% endcodeBlock %}
 */
var LimitData = /** @class */ (function (_super) {
    __extends$2(LimitData, _super);
    function LimitData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(false)
    ], LimitData.prototype, "enabled", void 0);
    __decorate$2([
        Property(null)
    ], LimitData.prototype, "minStart", void 0);
    __decorate$2([
        Property(null)
    ], LimitData.prototype, "minEnd", void 0);
    __decorate$2([
        Property(null)
    ], LimitData.prototype, "maxStart", void 0);
    __decorate$2([
        Property(null)
    ], LimitData.prototype, "maxEnd", void 0);
    __decorate$2([
        Property(false)
    ], LimitData.prototype, "startHandleFixed", void 0);
    __decorate$2([
        Property(false)
    ], LimitData.prototype, "endHandleFixed", void 0);
    return LimitData;
}(ChildProperty));
/**
 * It illustrates the tooltip data in slider.
 */
var TooltipData = /** @class */ (function (_super) {
    __extends$2(TooltipData, _super);
    function TooltipData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('')
    ], TooltipData.prototype, "cssClass", void 0);
    __decorate$2([
        Property('Before')
    ], TooltipData.prototype, "placement", void 0);
    __decorate$2([
        Property('Focus')
    ], TooltipData.prototype, "showOn", void 0);
    __decorate$2([
        Property(false)
    ], TooltipData.prototype, "isVisible", void 0);
    __decorate$2([
        Property(null)
    ], TooltipData.prototype, "format", void 0);
    return TooltipData;
}(ChildProperty));
var bootstrapTooltipOffset = 6;
var bootstrap4TooltipOffset = 3;
var tolerance = 1e-10;
var classNames = {
    root: 'e-slider',
    rtl: 'e-rtl',
    sliderHiddenInput: 'e-slider-input',
    controlWrapper: 'e-control-wrapper',
    sliderHandle: 'e-handle',
    rangeBar: 'e-range',
    sliderButton: 'e-slider-button',
    firstButton: 'e-first-button',
    secondButton: 'e-second-button',
    scale: 'e-scale',
    tick: 'e-tick',
    large: 'e-large',
    tickValue: 'e-tick-value',
    sliderTooltip: 'e-slider-tooltip',
    sliderHover: 'e-slider-hover',
    sliderFirstHandle: 'e-handle-first',
    sliderSecondHandle: 'e-handle-second',
    sliderDisabled: 'e-disabled',
    sliderContainer: 'e-slider-container',
    horizontalTooltipBefore: 'e-slider-horizontal-before',
    horizontalTooltipAfter: 'e-slider-horizontal-after',
    verticalTooltipBefore: 'e-slider-vertical-before',
    verticalTooltipAfter: 'e-slider-vertical-after',
    materialTooltip: 'e-material-tooltip',
    materialTooltipOpen: 'e-material-tooltip-open',
    materialTooltipActive: 'e-tooltip-active',
    materialSlider: 'e-material-slider',
    sliderTrack: 'e-slider-track',
    sliderHorizantalColor: 'e-slider-horizantal-color',
    sliderVerticalColor: 'e-slider-vertical-color',
    sliderHandleFocused: 'e-handle-focused',
    verticalSlider: 'e-vertical',
    horizontalSlider: 'e-horizontal',
    sliderHandleStart: 'e-handle-start',
    sliderTooltipStart: 'e-material-tooltip-start',
    sliderTabHandle: 'e-tab-handle',
    sliderButtonIcon: 'e-button-icon',
    sliderSmallSize: 'e-small-size',
    sliderTickPosition: 'e-tick-pos',
    sliderFirstTick: 'e-first-tick',
    sliderLastTick: 'e-last-tick',
    sliderButtonClass: 'e-slider-btn',
    sliderTooltipWrapper: 'e-tooltip-wrap',
    sliderTabTrack: 'e-tab-track',
    sliderTabRange: 'e-tab-range',
    sliderActiveHandle: 'e-handle-active',
    sliderMaterialHandle: 'e-material-handle',
    sliderMaterialRange: 'e-material-range',
    sliderMaterialDefault: 'e-material-default',
    materialTooltipShow: 'e-material-tooltip-show',
    materialTooltipHide: 'e-material-tooltip-hide',
    readonly: 'e-read-only',
    limits: 'e-limits',
    limitBarDefault: 'e-limit-bar',
    limitBarFirst: 'e-limit-first',
    limitBarSecond: 'e-limit-second',
    dragHorizontal: 'e-drag-horizontal',
    dragVertical: 'e-drag-vertical'
};
/**
 * The Slider component allows the user to select a value or range
 * of values in-between a min and max range, by dragging the handle over the slider bar.
 * ```html
 * <div id='slider'></div>
 * ```
 * ```typescript
 * <script>
 *   var sliderObj = new Slider({ value: 10 });
 *   sliderObj.appendTo('#slider');
 * </script>
 * ```
 */
var Slider = /** @class */ (function (_super) {
    __extends$2(Slider, _super);
    function Slider(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.horDir = 'left';
        _this.verDir = 'bottom';
        _this.transition = {
            handle: 'left .4s cubic-bezier(.25, .8, .25, 1), right .4s cubic-bezier(.25, .8, .25, 1), ' +
                'top .4s cubic-bezier(.25, .8, .25, 1) , bottom .4s cubic-bezier(.25, .8, .25, 1)',
            rangeBar: 'all .4s cubic-bezier(.25, .8, .25, 1)'
        };
        _this.transitionOnMaterialTooltip = {
            handle: 'left 1ms ease-out, right 1ms ease-out, bottom 1ms ease-out, top 1ms ease-out',
            rangeBar: 'left 1ms ease-out, right 1ms ease-out, bottom 1ms ease-out, width 1ms ease-out, height 1ms ease-out'
        };
        _this.scaleTransform = 'transform .4s cubic-bezier(.25, .8, .25, 1)';
        _this.customAriaText = null;
        _this.drag = true;
        _this.isDragComplete = false;
        _this.initialTooltip = true;
        return _this;
    }
    Slider.prototype.preRender = function () {
        var localeText = { incrementTitle: 'Increase', decrementTitle: 'Decrease' };
        this.l10n = new L10n('slider', localeText, this.locale);
        this.isElementFocused = false;
        this.tickElementCollection = [];
        this.tooltipFormatInfo = {};
        this.ticksFormatInfo = {};
        this.initCultureInfo();
        this.initCultureFunc();
        this.formChecker();
    };
    Slider.prototype.formChecker = function () {
        var formElement = closest(this.element, 'form');
        if (formElement) {
            this.isForm = true;
            // this condition needs to be checked, if the slider is going to be refreshed by `refresh()`
            // then we need to revert the slider `value` back to `formResetValue` to preserve the initial value
            if (!isNullOrUndefined(this.formResetValue)) {
                this.setProperties({ 'value': this.formResetValue }, true);
            }
            this.formResetValue = this.value;
            if (this.type === 'Range' &&
                (isNullOrUndefined(this.formResetValue) || typeof (this.formResetValue) !== 'object')) {
                this.formResetValue = [parseFloat(formatUnit(this.min)), parseFloat(formatUnit(this.max))];
            }
            else if (isNullOrUndefined(this.formResetValue)) {
                this.formResetValue = parseFloat(formatUnit(this.min));
            }
            this.formElement = formElement;
        }
        else {
            this.isForm = false;
        }
    };
    Slider.prototype.initCultureFunc = function () {
        this.internationalization = new Internationalization(this.locale);
    };
    Slider.prototype.initCultureInfo = function () {
        this.tooltipFormatInfo.format = (!isNullOrUndefined(this.tooltip.format)) ? this.tooltip.format : null;
        this.ticksFormatInfo.format = (!isNullOrUndefined(this.ticks.format)) ? this.ticks.format : null;
    };
    Slider.prototype.formatString = function (value, formatInfo) {
        var formatValue = null;
        var formatString = null;
        if ((value || value === 0)) {
            formatValue = this.formatNumber(value);
            var numberOfDecimals = this.numberOfDecimals(value);
            formatString = this.internationalization.getNumberFormat(formatInfo)(this.makeRoundNumber(value, numberOfDecimals));
        }
        return { elementVal: formatValue, formatString: formatString };
    };
    Slider.prototype.formatNumber = function (value) {
        var numberOfDecimals = this.numberOfDecimals(value);
        return this.internationalization.getNumberFormat({
            maximumFractionDigits: numberOfDecimals,
            minimumFractionDigits: numberOfDecimals, useGrouping: false
        })(value);
    };
    Slider.prototype.numberOfDecimals = function (value) {
        var decimalPart = value.toString().split('.')[1];
        var numberOfDecimals = !decimalPart || !decimalPart.length ? 0 : decimalPart.length;
        return numberOfDecimals;
    };
    Slider.prototype.makeRoundNumber = function (value, precision) {
        var decimals = precision || 0;
        return Number(value.toFixed(decimals));
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Slider.prototype.render = function () {
        var _this = this;
        this.initialize();
        this.initRender();
        this.wireEvents();
        this.setZindex();
        this.renderComplete();
        if (this.element.tagName === 'EJS-SLIDER') {
            if (this.getTheme(this.sliderContainer) === 'none') {
                setTimeout(function () {
                    _this.refresh();
                }, 0);
            }
        }
    };
    Slider.prototype.initialize = function () {
        addClass([this.element], classNames.root);
        this.setCSSClass();
    };
    Slider.prototype.setElementWidth = function (width) {
        if (!isNullOrUndefined(width) && !isNullOrUndefined(this.sliderContainer)) {
            if (typeof width === 'number') {
                this.sliderContainer.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                this.sliderContainer.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
            }
        }
    };
    Slider.prototype.setCSSClass = function (oldCSSClass) {
        if (oldCSSClass) {
            removeClass([this.element], oldCSSClass.split(' '));
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    };
    Slider.prototype.setEnabled = function () {
        if (!this.enabled) {
            addClass([this.sliderContainer], [classNames.sliderDisabled]);
            if (this.tooltip.isVisible && this.tooltipElement && this.tooltip.showOn === 'Always') {
                this.tooltipElement.classList.add(classNames.sliderDisabled);
            }
            this.unwireEvents();
        }
        else {
            removeClass([this.sliderContainer], [classNames.sliderDisabled]);
            if (this.tooltip.isVisible && this.tooltipElement && this.tooltip.showOn === 'Always') {
                this.tooltipElement.classList.remove(classNames.sliderDisabled);
            }
            this.wireEvents();
        }
    };
    Slider.prototype.getTheme = function (container) {
        var theme = window.getComputedStyle(container, ':after').getPropertyValue('content');
        return theme.replace(/['"]+/g, '');
    };
    /**
     * Initialize the rendering
     *
     * @returns {void}
     * @private
     */
    Slider.prototype.initRender = function () {
        this.sliderContainer = this.createElement('div', { className: classNames.sliderContainer + ' ' + classNames.controlWrapper });
        this.element.parentNode.insertBefore(this.sliderContainer, this.element);
        this.sliderContainer.appendChild(this.element);
        this.sliderTrack = this.createElement('div', { className: classNames.sliderTrack });
        this.element.appendChild(this.sliderTrack);
        this.setElementWidth(this.width);
        this.element.tabIndex = -1;
        this.getThemeInitialization();
        this.setHandler();
        this.createRangeBar();
        if (this.limits.enabled) {
            this.createLimitBar();
        }
        this.setOrientClass();
        this.hiddenInput = (this.createElement('input', {
            attrs: {
                type: 'hidden', value: (isNullOrUndefined(this.value) ? (isNullOrUndefined(this.min) ? '0' : this.min.toString()) : this.value.toString()),
                name: this.element.getAttribute('name') || this.element.getAttribute('id') ||
                    '_' + (Math.random() * 1000).toFixed(0) + 'slider', class: classNames.sliderHiddenInput
            }
        }));
        this.hiddenInput.tabIndex = -1;
        this.sliderContainer.appendChild(this.hiddenInput);
        if (this.showButtons) {
            this.setButtons();
        }
        this.setEnableRTL();
        if (this.type === 'Range') {
            this.rangeValueUpdate();
        }
        else {
            this.value = isNullOrUndefined(this.value) ? (isNullOrUndefined(this.min) ? 0 :
                parseFloat(formatUnit(this.min.toString()))) : this.value;
        }
        this.previousVal = this.type !== 'Range' ? this.checkHandleValue(parseFloat(formatUnit(this.value.toString()))) :
            [this.checkHandleValue(parseFloat(formatUnit(this.value[0].toString()))),
                this.checkHandleValue(parseFloat(formatUnit(this.value[1].toString())))];
        this.previousChanged = this.previousVal;
        if (!isNullOrUndefined(this.element.hasAttribute('name'))) {
            this.element.removeAttribute('name');
        }
        this.setValue();
        if (this.limits.enabled) {
            this.setLimitBar();
        }
        if (this.ticks.placement !== 'None') {
            this.renderScale();
        }
        if (this.tooltip.isVisible) {
            this.renderTooltip();
        }
        if (!this.enabled) {
            addClass([this.sliderContainer], [classNames.sliderDisabled]);
        }
        else {
            removeClass([this.sliderContainer], [classNames.sliderDisabled]);
        }
        if (this.readonly) {
            addClass([this.sliderContainer], [classNames.readonly]);
        }
        else {
            removeClass([this.sliderContainer], [classNames.readonly]);
        }
    };
    Slider.prototype.getThemeInitialization = function () {
        this.isMaterial = this.getTheme(this.sliderContainer) === 'material'
            || this.getTheme(this.sliderContainer) === 'material-dark';
        this.isMaterial3 = this.getTheme(this.sliderContainer) === 'Material3'
            || this.getTheme(this.sliderContainer) === 'Material3-dark';
        this.isBootstrap = this.getTheme(this.sliderContainer) === 'bootstrap'
            || this.getTheme(this.sliderContainer) === 'bootstrap-dark';
        this.isBootstrap4 = this.getTheme(this.sliderContainer) === 'bootstrap4';
        this.isTailwind = this.getTheme(this.sliderContainer) === 'tailwind' || this.getTheme(this.sliderContainer) === 'tailwind-dark';
        this.isTailwind3 = this.getTheme(this.sliderContainer) === 'tailwind3' || this.getTheme(this.sliderContainer) === 'tailwind3-dark';
        this.isBootstrap5 = this.getTheme(this.sliderContainer) === 'bootstrap5';
        this.isFluent = this.getTheme(this.sliderContainer) === 'FluentUI';
        this.isFluent2 = this.getTheme(this.sliderContainer) === 'fluent2';
        this.isBootstrap5Dot3 = this.getTheme(this.sliderContainer) === 'bootstrap5.3';
        this.isMaterialTooltip = (this.isMaterial || this.isMaterial3) && this.type !== 'Range' && this.tooltip.isVisible;
    };
    Slider.prototype.createRangeBar = function () {
        if (this.type !== 'Default') {
            this.rangeBar = (this.createElement('div', { attrs: { class: classNames.rangeBar } }));
            this.element.appendChild(this.rangeBar);
            if (this.drag && this.type === 'Range') {
                if (this.orientation === 'Horizontal') {
                    this.rangeBar.classList.add(classNames.dragHorizontal);
                }
                else {
                    this.rangeBar.classList.add(classNames.dragVertical);
                }
            }
        }
    };
    Slider.prototype.createLimitBar = function () {
        var firstElementClassName = this.type !== 'Range' ? classNames.limitBarDefault :
            classNames.limitBarFirst;
        firstElementClassName += ' ' + classNames.limits;
        this.limitBarFirst = (this.createElement('div', {
            attrs: { class: firstElementClassName }
        }));
        this.element.appendChild(this.limitBarFirst);
        if (this.type === 'Range') {
            this.limitBarSecond = (this.createElement('div', {
                attrs: {
                    class: classNames.limitBarSecond + ' ' + classNames.limits
                }
            }));
            this.element.appendChild(this.limitBarSecond);
        }
    };
    Slider.prototype.setOrientClass = function () {
        if (this.orientation !== 'Vertical') {
            this.sliderContainer.classList.remove(classNames.verticalSlider);
            this.sliderContainer.classList.add(classNames.horizontalSlider);
            this.firstHandle.setAttribute('aria-orientation', 'horizontal');
            if (this.type === 'Range') {
                this.secondHandle.setAttribute('aria-orientation', 'horizontal');
            }
        }
        else {
            this.sliderContainer.classList.remove(classNames.horizontalSlider);
            this.sliderContainer.classList.add(classNames.verticalSlider);
            this.firstHandle.setAttribute('aria-orientation', 'vertical');
            if (this.type === 'Range') {
                this.secondHandle.setAttribute('aria-orientation', 'vertical');
            }
        }
    };
    Slider.prototype.setAriaAttributes = function (element) {
        var _this = this;
        var min = this.min;
        var max = this.max;
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            min = this.customValues[0];
            max = this.customValues[this.customValues.length - 1];
        }
        if (this.type !== 'Range') {
            attributes(element, {
                'aria-valuemin': isNullOrUndefined(min) ? '0' : min.toString(), 'aria-valuemax': (isNullOrUndefined(max) ? '100' : max.toString())
            });
        }
        else {
            var range = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ?
                [[min.toString(), (this.customValues[this.value[1]]).toString()],
                    [(this.customValues[this.value[0]]).toString(), max.toString()]] :
                [[min.toString(), this.value[1].toString()], [this.value[0].toString(), max.toString()]];
            range.forEach(function (range, index) {
                var element = index === 0 ? _this.firstHandle : _this.secondHandle;
                if (element) {
                    attributes(element, {
                        'aria-valuemin': range[0], 'aria-valuemax': range[1]
                    });
                }
            });
        }
    };
    Slider.prototype.createSecondHandle = function () {
        this.secondHandle = this.createElement('div', {
            attrs: {
                class: classNames.sliderHandle, 'role': 'slider', tabIndex: '0', 'aria-label': 'slider'
            }
        });
        this.secondHandle.classList.add(classNames.sliderSecondHandle);
        this.element.appendChild(this.secondHandle);
    };
    Slider.prototype.createFirstHandle = function () {
        this.firstHandle = this.createElement('div', {
            attrs: {
                class: classNames.sliderHandle, 'role': 'slider', tabIndex: '0', 'aria-label': 'slider'
            }
        });
        this.firstHandle.classList.add(classNames.sliderFirstHandle);
        this.element.appendChild(this.firstHandle);
        if (this.isMaterialTooltip) {
            this.materialHandle = this.createElement('div', {
                attrs: {
                    class: classNames.sliderHandle + ' ' +
                        classNames.sliderMaterialHandle
                }
            });
            this.element.appendChild(this.materialHandle);
        }
    };
    Slider.prototype.wireFirstHandleEvt = function (destroy) {
        if (!destroy) {
            EventHandler.add(this.firstHandle, 'mousedown touchstart', this.handleFocus, this);
            EventHandler.add(this.firstHandle, 'transitionend', this.transitionEnd, this);
            EventHandler.add(this.firstHandle, 'mouseenter touchenter', this.handleOver, this);
            EventHandler.add(this.firstHandle, 'mouseleave touchend', this.handleLeave, this);
        }
        else {
            EventHandler.remove(this.firstHandle, 'mousedown touchstart', this.handleFocus);
            EventHandler.remove(this.firstHandle, 'transitionend', this.transitionEnd);
            EventHandler.remove(this.firstHandle, 'mouseenter touchenter', this.handleOver);
            EventHandler.remove(this.firstHandle, 'mouseleave touchend', this.handleLeave);
        }
    };
    Slider.prototype.wireSecondHandleEvt = function (destroy) {
        if (!destroy) {
            EventHandler.add(this.secondHandle, 'mousedown touchstart', this.handleFocus, this);
            EventHandler.add(this.secondHandle, 'transitionend', this.transitionEnd, this);
            EventHandler.add(this.secondHandle, 'mouseenter touchenter', this.handleOver, this);
            EventHandler.add(this.secondHandle, 'mouseleave touchend', this.handleLeave, this);
        }
        else {
            EventHandler.remove(this.secondHandle, 'mousedown touchstart', this.handleFocus);
            EventHandler.remove(this.secondHandle, 'transitionend', this.transitionEnd);
            EventHandler.remove(this.secondHandle, 'mouseenter touchenter', this.handleOver);
            EventHandler.remove(this.secondHandle, 'mouseleave touchend', this.handleLeave);
        }
    };
    Slider.prototype.handleStart = function () {
        if (this.type !== 'Range') {
            this.firstHandle.classList[this.handlePos1 === 0 ? 'add' : 'remove'](classNames.sliderHandleStart);
            if (this.isMaterialTooltip) {
                this.materialHandle.classList[this.handlePos1 === 0 ? 'add' : 'remove'](classNames.sliderHandleStart);
                if (this.tooltipElement) {
                    this.tooltipElement.classList[this.handlePos1 === 0 ? 'add' : 'remove'](classNames.sliderTooltipStart);
                }
            }
        }
    };
    Slider.prototype.transitionEnd = function (e) {
        if (e.propertyName !== 'transform') {
            this.handleStart();
            if (!this.enableAnimation) {
                this.getHandle().style.transition = 'none';
            }
            if (this.type !== 'Default') {
                this.rangeBar.style.transition = 'none';
            }
            if ((this.isMaterial || this.isMaterial3) && this.tooltip.isVisible && this.type === 'Default') {
                this.tooltipElement.style.transition = this.transition.handle;
            }
            this.tooltipToggle(this.getHandle());
            this.closeTooltip();
        }
    };
    Slider.prototype.handleFocusOut = function () {
        if (this.firstHandle.classList.contains(classNames.sliderHandleFocused)) {
            this.firstHandle.classList.remove(classNames.sliderHandleFocused);
        }
        if (this.type === 'Range') {
            if (this.secondHandle.classList.contains(classNames.sliderHandleFocused)) {
                this.secondHandle.classList.remove(classNames.sliderHandleFocused);
            }
        }
    };
    Slider.prototype.handleFocus = function (e) {
        this.focusSliderElement();
        this.sliderBarClick(e);
        if (e.currentTarget === this.firstHandle) {
            this.firstHandle.classList.add(classNames.sliderHandleFocused);
            this.firstHandle.classList.add(classNames.sliderTabHandle);
        }
        else {
            this.secondHandle.classList.add(classNames.sliderHandleFocused);
            this.secondHandle.classList.add(classNames.sliderTabHandle);
        }
        EventHandler.add(document, 'mousemove touchmove', this.sliderBarMove, this);
        EventHandler.add(document, 'mouseup touchend', this.sliderBarUp, this);
    };
    Slider.prototype.handleOver = function (e) {
        if (this.tooltip.isVisible && this.tooltip.showOn === 'Hover') {
            this.tooltipToggle(e.currentTarget);
        }
        if (this.type === 'Default') {
            this.tooltipToggle(this.getHandle());
        }
    };
    Slider.prototype.handleLeave = function (e) {
        if (this.tooltip.isVisible && this.tooltip.showOn === 'Hover' &&
            !e.currentTarget.classList.contains(classNames.sliderHandleFocused) &&
            !e.currentTarget.classList.contains(classNames.sliderTabHandle)) {
            this.closeTooltip();
        }
    };
    Slider.prototype.setHandler = function () {
        this.createFirstHandle();
        if (this.type === 'Range') {
            this.createSecondHandle();
        }
    };
    Slider.prototype.setEnableRTL = function () {
        if (this.enableRtl && this.orientation !== 'Vertical') {
            addClass([this.sliderContainer], classNames.rtl);
        }
        else {
            removeClass([this.sliderContainer], classNames.rtl);
        }
        var preDir = (this.orientation !== 'Vertical') ? this.horDir : this.verDir;
        if (this.enableRtl) {
            this.horDir = 'right';
            this.verDir = 'bottom';
        }
        else {
            this.horDir = 'left';
            this.verDir = 'bottom';
        }
        var currDir = (this.orientation !== 'Vertical') ? this.horDir : this.verDir;
        if (preDir !== currDir) {
            if (this.orientation === 'Horizontal') {
                setStyleAttribute(this.firstHandle, { 'right': '', 'left': 'auto' });
                if (this.type === 'Range') {
                    setStyleAttribute(this.secondHandle, { 'top': '', 'left': 'auto' });
                }
            }
        }
        this.setBarColor();
    };
    Slider.prototype.tooltipValue = function () {
        var _this = this;
        var text;
        var args = {
            value: this.value,
            text: ''
        };
        if (this.initialTooltip) {
            this.initialTooltip = false;
            this.setTooltipContent();
            args.text = text = (typeof (this.tooltipObj.content) === 'function' ? this.tooltipObj.content() : this.tooltipObj.content);
            this.trigger('tooltipChange', args, function (observedArgs) {
                _this.addTooltipClass(observedArgs.text);
                if (text !== observedArgs.text) {
                    _this.customAriaText = observedArgs.text;
                    if (_this.enableHtmlSanitizer) {
                        observedArgs.text = SanitizeHtmlHelper.sanitize(observedArgs.text.toString());
                    }
                    else {
                        observedArgs.text = observedArgs.text.toString();
                    }
                    var contentTemp = function () {
                        return observedArgs.text;
                    };
                    _this.tooltipObj.content = initializeCSPTemplate(contentTemp);
                    _this.setAriaAttrValue(_this.firstHandle);
                    if (_this.type === 'Range') {
                        _this.setAriaAttrValue(_this.secondHandle);
                    }
                }
            });
            if (this.isMaterialTooltip) {
                this.setPreviousVal('change', this.value);
            }
        }
    };
    Slider.prototype.setTooltipContent = function () {
        var content = this.formatContent(this.tooltipFormatInfo, false);
        var contentTemp = function () {
            return content;
        };
        this.tooltipObj.content = initializeCSPTemplate(contentTemp);
    };
    Slider.prototype.formatContent = function (formatInfo, ariaContent) {
        var content = '';
        var handle1 = this.handleVal1;
        var handle2 = this.handleVal2;
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            handle1 = this.customValues[this.handleVal1];
            handle2 = this.customValues[this.handleVal2];
        }
        if (!ariaContent) {
            if (this.type === 'Range') {
                if (this.enableRtl && this.orientation !== 'Vertical') {
                    content = (!isNullOrUndefined(formatInfo.format)) ? (this.formatString(handle2, formatInfo)
                        .formatString + ' - ' + this.formatString(handle1, formatInfo).formatString) :
                        (handle2.toString() + ' - ' + handle1.toString());
                }
                else {
                    content = (!isNullOrUndefined(formatInfo.format)) ? (this.formatString(handle1, formatInfo)
                        .formatString + ' - ' + this.formatString(handle2, formatInfo).formatString) :
                        (handle1.toString() + ' - ' + handle2.toString());
                }
            }
            else {
                if (!isNullOrUndefined(handle1)) {
                    content = (!isNullOrUndefined(formatInfo.format)) ?
                        this.formatString(handle1, formatInfo).formatString : handle1.toString();
                }
            }
            return content;
        }
        else {
            if (this.type === 'Range') {
                if (this.enableRtl && this.orientation !== 'Vertical') {
                    content = (!isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format)) ?
                        (this.formatString(handle2, formatInfo).elementVal + ' - ' +
                            this.formatString(handle1, formatInfo).elementVal) :
                        (handle2.toString() + ' - ' + handle1.toString());
                }
                else {
                    content = (!isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format)) ?
                        (this.formatString(handle1, formatInfo).elementVal + ' - ' +
                            this.formatString(handle2, formatInfo).elementVal) :
                        (handle1.toString() + ' - ' + handle2.toString());
                }
            }
            else {
                if (!isNullOrUndefined(handle1)) {
                    content = (!isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format)) ?
                        this.formatString(handle1, formatInfo).elementVal : handle1.toString();
                }
            }
            return content;
        }
    };
    Slider.prototype.addTooltipClass = function (content) {
        if (this.isMaterialTooltip) {
            var count = content.toString().length;
            if (!this.tooltipElement) {
                var cssClass = count > 4 ? classNames.sliderMaterialRange : classNames.sliderMaterialDefault;
                this.tooltipObj.cssClass = classNames.sliderTooltip + ' ' + cssClass;
            }
            else {
                var cssClass = count > 4 ?
                    { oldCss: classNames.sliderMaterialDefault, newCss: classNames.sliderMaterialRange } :
                    { oldCss: classNames.sliderMaterialRange, newCss: classNames.sliderMaterialDefault };
                this.tooltipElement.classList.remove(cssClass.oldCss);
                if (!this.tooltipElement.classList.contains(cssClass.newCss)) {
                    this.tooltipElement.classList.add(cssClass.newCss);
                    this.tooltipElement.style.transform = count > 4 ? 'scale(1)' :
                        this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
                }
            }
        }
    };
    Slider.prototype.tooltipPlacement = function () {
        return this.orientation === 'Horizontal' ? (this.tooltip.placement === 'Before' ? 'TopCenter' : 'BottomCenter') :
            (this.tooltip.placement === 'Before' ? 'LeftCenter' : 'RightCenter');
    };
    Slider.prototype.tooltipBeforeOpen = function (args) {
        this.tooltipElement = args.element;
        if (this.tooltip.cssClass) {
            addClass([this.tooltipElement], this.tooltip.cssClass.split(' ').filter(function (css) { return css; }));
        }
        args.target.removeAttribute('aria-describedby');
        if (this.isMaterialTooltip) {
            this.tooltipElement.firstElementChild.classList.add(classNames.materialTooltipHide);
            this.handleStart();
            this.setTooltipTransform();
        }
    };
    Slider.prototype.tooltipCollision = function (position) {
        if (this.isBootstrap || this.isBootstrap4 || ((this.isMaterial || this.isMaterial3) && !this.isMaterialTooltip)) {
            var tooltipOffsetValue = this.isBootstrap4 ? bootstrap4TooltipOffset : bootstrapTooltipOffset;
            switch (position) {
                case 'TopCenter':
                    this.tooltipObj.setProperties({ 'offsetY': -(tooltipOffsetValue) }, false);
                    break;
                case 'BottomCenter':
                    this.tooltipObj.setProperties({ 'offsetY': tooltipOffsetValue }, false);
                    break;
                case 'LeftCenter':
                    this.tooltipObj.setProperties({ 'offsetX': -(tooltipOffsetValue) }, false);
                    break;
                case 'RightCenter':
                    this.tooltipObj.setProperties({ 'offsetX': tooltipOffsetValue }, false);
                    break;
            }
        }
    };
    Slider.prototype.materialTooltipEventCallBack = function (event) {
        this.sliderBarClick(event);
        EventHandler.add(document, 'mousemove touchmove', this.sliderBarMove, this);
        EventHandler.add(document, 'mouseup touchend', this.sliderBarUp, this);
    };
    Slider.prototype.wireMaterialTooltipEvent = function (destroy) {
        if (this.isMaterialTooltip) {
            if (!destroy) {
                EventHandler.add(this.tooltipElement, 'mousedown touchstart', this.materialTooltipEventCallBack, this);
            }
            else {
                EventHandler.remove(this.tooltipElement, 'mousedown touchstart', this.materialTooltipEventCallBack);
            }
        }
    };
    Slider.prototype.tooltipPositionCalculation = function (position) {
        var cssClass;
        switch (position) {
            case 'TopCenter':
                cssClass = classNames.horizontalTooltipBefore;
                break;
            case 'BottomCenter':
                cssClass = classNames.horizontalTooltipAfter;
                break;
            case 'LeftCenter':
                cssClass = classNames.verticalTooltipBefore;
                break;
            case 'RightCenter':
                cssClass = classNames.verticalTooltipAfter;
                break;
        }
        return cssClass;
    };
    Slider.prototype.getTooltipTransformProperties = function (className) {
        var transformProperties;
        if (this.tooltipElement) {
            var position = this.orientation === 'Horizontal' ?
                ((this.tooltipElement.clientHeight + 14) - (this.tooltipElement.clientHeight / 2)) :
                ((this.tooltipElement.clientWidth + 14) - (this.tooltipElement.clientWidth / 2));
            transformProperties = this.orientation === 'Horizontal' ?
                (className === classNames.horizontalTooltipBefore ? { rotate: 'rotate(45deg)', translate: "translateY(" + position + "px)" } :
                    { rotate: 'rotate(225deg)', translate: "translateY(" + -(position) + "px)" }) :
                (className === classNames.verticalTooltipBefore ? { rotate: 'rotate(-45deg)', translate: "translateX(" + position + "px)" } :
                    { rotate: 'rotate(-225deg)', translate: "translateX(" + (-position) + "px)" });
        }
        return transformProperties;
    };
    Slider.prototype.openMaterialTooltip = function () {
        var _this = this;
        if (this.isMaterialTooltip) {
            this.refreshTooltip(this.firstHandle);
            var tooltipContentElement = this.tooltipElement.firstElementChild;
            tooltipContentElement.classList.remove(classNames.materialTooltipHide);
            tooltipContentElement.classList.add(classNames.materialTooltipShow);
            this.firstHandle.style.cursor = 'default';
            this.tooltipElement.style.transition = this.scaleTransform;
            this.tooltipElement.classList.add(classNames.materialTooltipOpen);
            this.materialHandle.style.transform = 'scale(0)';
            if (tooltipContentElement.innerText.length > 4) {
                this.tooltipElement.style.transform = 'scale(1)';
            }
            else {
                this.tooltipElement.style.transform = this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
            }
            if (this.type === 'Default') {
                setTimeout(function () { if (_this.tooltipElement) {
                    _this.tooltipElement.style.transition = _this.transition.handle;
                } }, 2500);
            }
            else {
                setTimeout(function () { if (_this.tooltipElement) {
                    _this.tooltipElement.style.transition = 'none';
                } }, 2500);
            }
        }
    };
    Slider.prototype.closeMaterialTooltip = function () {
        var _this = this;
        if (this.isMaterialTooltip) {
            var tooltipContentElement = this.tooltipElement.firstElementChild;
            this.tooltipElement.style.transition = this.scaleTransform;
            tooltipContentElement.classList.remove(classNames.materialTooltipShow);
            tooltipContentElement.classList.add(classNames.materialTooltipHide);
            this.firstHandle.style.cursor = '-webkit-grab';
            this.firstHandle.style.cursor = 'grab';
            if (this.materialHandle) {
                this.materialHandle.style.transform = 'scale(1)';
            }
            this.tooltipElement.classList.remove(classNames.materialTooltipOpen);
            this.setTooltipTransform();
            this.tooltipTarget = undefined;
            setTimeout(function () { if (_this.tooltipElement) {
                _this.tooltipElement.style.transition = 'none';
            } }, 2500);
        }
    };
    Slider.prototype.checkTooltipPosition = function (args) {
        var tooltipClass = this.tooltipPositionCalculation(args.collidedPosition);
        if (this.tooltipCollidedPosition === undefined ||
            this.tooltipCollidedPosition !== args.collidedPosition || !args.element.classList.contains(tooltipClass)) {
            if (this.isMaterialTooltip) {
                if (tooltipClass !== undefined) {
                    args.element.classList.remove(this.previousTooltipClass);
                    args.element.classList.add(tooltipClass);
                    this.previousTooltipClass = tooltipClass;
                }
                if (args.element.style.transform && args.element.classList.contains(classNames.materialTooltipOpen) &&
                    args.element.firstElementChild.innerText.length <= 4) {
                    args.element.style.transform = this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
                }
            }
            this.tooltipCollidedPosition = args.collidedPosition;
        }
        if (this.isMaterialTooltip && this.tooltipElement && this.tooltipElement.style.transform.indexOf('translate') !== -1) {
            this.setTooltipTransform();
        }
    };
    Slider.prototype.setTooltipTransform = function () {
        var transformProperties = this.getTooltipTransformProperties(this.previousTooltipClass);
        if (isNullOrUndefined(this.tooltipElement)) {
            return;
        }
        if (this.tooltipElement.firstElementChild.innerText.length > 4) {
            this.tooltipElement.style.transform = transformProperties.translate + " scale(0.01)";
        }
        else {
            this.tooltipElement.style.transform = transformProperties.translate + " " + transformProperties.rotate + " scale(0.01)";
        }
    };
    Slider.prototype.renderTooltip = function () {
        this.tooltipObj = new Tooltip({
            showTipPointer: this.isBootstrap || this.isMaterial || this.isMaterial3 || this.isBootstrap4 || this.isTailwind
                || this.isTailwind3 || this.isBootstrap5 || this.isFluent || this.isFluent2 || this.isBootstrap5Dot3,
            cssClass: classNames.sliderTooltip,
            height: (this.isMaterial || this.isMaterial3) ? 30 : 'auto',
            animation: { open: { effect: 'None' }, close: { effect: 'FadeOut', duration: 500 } },
            opensOn: 'Custom',
            beforeOpen: this.tooltipBeforeOpen.bind(this),
            beforeCollision: this.checkTooltipPosition.bind(this),
            beforeClose: this.tooltipBeforeClose.bind(this),
            enableHtmlSanitizer: this.enableHtmlSanitizer
        });
        this.tooltipObj.appendTo(this.firstHandle);
        this.initializeTooltipProps();
    };
    Slider.prototype.initializeTooltipProps = function () {
        var tooltipShowOn = (this.tooltip.showOn === 'Auto' ? 'Hover' : this.tooltip.showOn);
        this.setProperties({ tooltip: { showOn: tooltipShowOn } }, true);
        this.tooltipObj.position = this.tooltipPlacement();
        this.tooltipCollision(this.tooltipObj.position);
        [this.firstHandle, this.rangeBar, this.secondHandle].forEach(function (handle) {
            if (!isNullOrUndefined(handle)) {
                handle.style.transition = 'none';
            }
        });
        if (this.isMaterialTooltip) {
            this.sliderContainer.classList.add(classNames.materialSlider);
            this.tooltipValue();
            this.tooltipObj.animation.close.effect = 'None';
            this.tooltipObj.open(this.firstHandle);
        }
    };
    Slider.prototype.tooltipBeforeClose = function () {
        this.tooltipElement = undefined;
        this.tooltipCollidedPosition = undefined;
    };
    Slider.prototype.setButtons = function () {
        this.firstBtn = this.createElement('div', { className: classNames.sliderButton + ' ' + classNames.firstButton });
        this.firstBtn.appendChild(this.createElement('span', { className: classNames.sliderButtonIcon }));
        if (this.isTailwind || this.isTailwind3) {
            this.firstBtn.querySelector('span').classList.add('e-icons');
        }
        this.firstBtn.tabIndex = -1;
        this.secondBtn = this.createElement('div', { className: classNames.sliderButton + ' ' + classNames.secondButton });
        this.secondBtn.appendChild(this.createElement('span', { className: classNames.sliderButtonIcon }));
        if (this.isTailwind || this.isTailwind3) {
            this.secondBtn.querySelector('span').classList.add('e-icons');
        }
        this.secondBtn.tabIndex = -1;
        this.sliderContainer.classList.add(classNames.sliderButtonClass);
        this.sliderContainer.appendChild(this.firstBtn);
        this.sliderContainer.appendChild(this.secondBtn);
        this.sliderContainer.appendChild(this.element);
        this.buttonTitle();
    };
    Slider.prototype.buttonTitle = function () {
        var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
        this.l10n.setLocale(this.locale);
        var decrementTitle = this.l10n.getConstant('decrementTitle');
        var incrementTitle = this.l10n.getConstant('incrementTitle');
        attributes(enabledRTL ? this.secondBtn : this.firstBtn, { 'aria-label': decrementTitle, title: decrementTitle });
        attributes(enabledRTL ? this.firstBtn : this.secondBtn, { 'aria-label': incrementTitle, title: incrementTitle });
    };
    Slider.prototype.buttonFocusOut = function () {
        if (this.isMaterial || this.isMaterial3) {
            this.getHandle().classList.remove('e-large-thumb-size');
        }
    };
    Slider.prototype.repeatButton = function (args) {
        var hVal = this.handleValueUpdate();
        var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
        var value;
        if (args.target.parentElement.classList.contains(classNames.firstButton)
            || args.target.classList.contains(classNames.firstButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
        }
        else if (args.target.parentElement.classList.contains(classNames.secondButton)
            || (args.target.classList.contains(classNames.secondButton))) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
        }
        if (this.limits.enabled) {
            value = this.getLimitCorrectedValues(value);
        }
        if (value >= this.min && value <= this.max) {
            this.changeHandleValue(value);
            this.tooltipToggle(this.getHandle());
        }
    };
    Slider.prototype.repeatHandlerMouse = function (args) {
        args.preventDefault();
        if (args.type === ('mousedown') || args.type === ('touchstart')) {
            this.buttonClick(args);
            this.repeatInterval = setInterval(this.repeatButton.bind(this), 180, args);
        }
    };
    Slider.prototype.materialChange = function () {
        if (!this.getHandle().classList.contains('e-large-thumb-size')) {
            this.getHandle().classList.add('e-large-thumb-size');
        }
    };
    Slider.prototype.focusHandle = function () {
        if (!this.getHandle().classList.contains(classNames.sliderTabHandle)) {
            this.getHandle().classList.add(classNames.sliderTabHandle);
        }
    };
    Slider.prototype.repeatHandlerUp = function (e) {
        this.changeEvent('changed', e);
        this.closeTooltip();
        clearInterval(this.repeatInterval);
        this.getHandle().focus();
    };
    Slider.prototype.customTickCounter = function (bigNum) {
        var tickCount = 4;
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            if (bigNum > 4) {
                tickCount = 3;
            }
            if (bigNum > 7) {
                tickCount = 2;
            }
            if (bigNum > 14) {
                tickCount = 1;
            }
            if (bigNum > 28) {
                tickCount = 0;
            }
        }
        return tickCount;
    };
    Slider.prototype.renderScale = function () {
        var orien = this.orientation === 'Vertical' ? 'v' : 'h';
        this.ul = this.createElement('ul', {
            className: classNames.scale + ' ' + 'e-' + orien + '-scale ' + classNames.tick + '-' + this.ticks.placement.toLowerCase(),
            attrs: { role: 'presentation', 'aria-hidden': 'true' }
        });
        this.ul.style.zIndex = '-1';
        if (Browser.isAndroid && orien === 'h') {
            this.ul.classList.add(classNames.sliderTickPosition);
        }
        var smallStep = this.ticks.smallStep;
        if (!this.ticks.showSmallTicks) {
            if (this.ticks.largeStep > 0) {
                smallStep = this.ticks.largeStep;
            }
            else {
                smallStep = (parseFloat(formatUnit(this.max))) - (parseFloat(formatUnit(this.min)));
            }
        }
        else if (smallStep <= 0) {
            smallStep = parseFloat(formatUnit(this.step));
        }
        var min = parseFloat(formatUnit(this.min));
        var max = parseFloat(formatUnit(this.max));
        var steps = parseFloat(formatUnit(smallStep));
        var bigNum = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 && this.customValues.length - 1;
        var customStep = this.customTickCounter(bigNum);
        var count = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ?
            (bigNum * customStep) + bigNum : Math.abs((max - min) / steps);
        this.element.appendChild(this.ul);
        var li;
        var start = parseFloat(this.min.toString());
        if (orien === 'v') {
            start = parseFloat(this.max.toString());
        }
        var left = 0;
        var islargeTick;
        var tickWidth = 100 / count;
        if (tickWidth === Infinity) {
            tickWidth = 5;
        }
        for (var i = 0, y = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ?
            this.customValues.length - 1 : 0, k = 0; i <= count; i++) {
            li = (this.createElement('li', {
                attrs: {
                    class: classNames.tick, role: 'presentation',
                    'aria-hidden': 'true'
                }
            }));
            if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
                islargeTick = i % (customStep + 1) === 0;
                if (islargeTick) {
                    if (orien === 'h') {
                        start = this.customValues[k];
                        k++;
                    }
                    else {
                        start = this.customValues[y];
                        y--;
                    }
                    li.setAttribute('title', start.toString());
                }
            }
            else {
                li.setAttribute('title', start.toString());
                if (this.numberOfDecimals(this.max) === 0 && this.numberOfDecimals(this.min) === 0 &&
                    this.numberOfDecimals(this.step) === 0) {
                    if (orien === 'h') {
                        var reminder = (start - parseFloat(this.min.toString())) % this.ticks.largeStep;
                        islargeTick = (Math.abs(reminder) < tolerance || Math.abs(this.ticks.largeStep - reminder) < tolerance);
                    }
                    else {
                        var reminder = Math.abs(start - parseFloat(this.max.toString())) % this.ticks.largeStep;
                        islargeTick = (Math.abs(reminder) < tolerance || Math.abs(this.ticks.largeStep - reminder) < tolerance);
                    }
                }
                else {
                    var largestep = this.ticks.largeStep;
                    var startValue = start;
                    if (orien === 'h') {
                        var reminder = ((startValue - min) % largestep);
                        islargeTick = Math.abs(reminder) < tolerance || Math.abs(largestep - reminder) < tolerance;
                    }
                    else {
                        var reminder = Math.abs(startValue - parseFloat(max.toString())) % largestep;
                        islargeTick = Math.abs(reminder) < tolerance || Math.abs(largestep - reminder) < tolerance;
                    }
                }
            }
            if (islargeTick) {
                li.classList.add(classNames.large);
            }
            if (orien === 'h') {
                li.style.width = tickWidth + '%';
            }
            else {
                li.style.height = tickWidth + '%';
            }
            var repeat = islargeTick ? (this.ticks.placement === 'Both' ? 2 : 1) : 0;
            if (islargeTick) {
                for (var j = 0; j < repeat; j++) {
                    this.createTick(li, start);
                }
            }
            else if (isNullOrUndefined(this.customValues)) {
                this.formatTicksValue(li, start);
            }
            this.ul.appendChild(li);
            this.tickElementCollection.push(li);
            var decimalPoints = void 0;
            if (isNullOrUndefined(this.customValues)) {
                if (this.numberOfDecimals(smallStep) > this.numberOfDecimals(start)) {
                    decimalPoints = this.numberOfDecimals(smallStep);
                }
                else {
                    decimalPoints = this.numberOfDecimals(start);
                }
                if (orien === 'h') {
                    start = this.makeRoundNumber(start + smallStep, decimalPoints);
                }
                else {
                    if (this.min > this.max) {
                        start = this.makeRoundNumber(start + smallStep, decimalPoints);
                    }
                    else {
                        start = this.makeRoundNumber(start - smallStep, decimalPoints);
                    }
                }
                left = this.makeRoundNumber(left + smallStep, decimalPoints);
            }
        }
        this.ticksAlignment(orien, tickWidth);
    };
    Slider.prototype.ticksAlignment = function (orien, tickWidth, triggerEvent) {
        if (triggerEvent === void 0) { triggerEvent = true; }
        this.firstChild = this.ul.firstElementChild;
        this.lastChild = this.ul.lastElementChild;
        this.firstChild.classList.add(classNames.sliderFirstTick);
        this.lastChild.classList.add(classNames.sliderLastTick);
        this.sliderContainer.classList.add(classNames.scale + '-' + this.ticks.placement.toLowerCase());
        if (orien === 'h') {
            this.firstChild.style.width = tickWidth / 2 + '%';
            this.lastChild.style.width = tickWidth / 2 + '%';
        }
        else {
            this.firstChild.style.height = tickWidth / 2 + '%';
            this.lastChild.style.height = tickWidth / 2 + '%';
        }
        var eventArgs = { ticksWrapper: this.ul, tickElements: this.tickElementCollection };
        if (triggerEvent) {
            this.trigger('renderedTicks', eventArgs);
        }
        this.scaleAlignment();
    };
    Slider.prototype.createTick = function (li, start) {
        var span = this.createElement('span', {
            className: classNames.tickValue + ' ' + classNames.tick + '-' + this.ticks.placement.toLowerCase(),
            attrs: { role: 'presentation', 'aria-hidden': 'true' }
        });
        li.appendChild(span);
        if (isNullOrUndefined(this.customValues)) {
            this.formatTicksValue(li, start, span);
        }
        else {
            if (this.enableHtmlSanitizer) {
                span.innerHTML = SanitizeHtmlHelper.sanitize(start.toString());
            }
            else {
                span.innerHTML = start.toString();
            }
        }
    };
    Slider.prototype.formatTicksValue = function (li, start, spanElement) {
        var _this = this;
        var tickText = this.formatNumber(start);
        var text = !isNullOrUndefined(this.ticks) && !isNullOrUndefined(this.ticks.format) ?
            this.formatString(start, this.ticksFormatInfo).formatString : tickText;
        var eventArgs = { value: start, text: text, tickElement: li };
        this.trigger('renderingTicks', eventArgs, function (observedArgs) {
            li.setAttribute('title', observedArgs.text.toString());
            if (spanElement) {
                if (_this.enableHtmlSanitizer) {
                    spanElement.innerHTML = SanitizeHtmlHelper.sanitize(observedArgs.text.toString());
                }
                else {
                    spanElement.innerHTML = observedArgs.text.toString();
                }
            }
        });
    };
    Slider.prototype.scaleAlignment = function () {
        this.tickValuePosition();
        if (this.orientation === 'Vertical') {
            if (this.element.getBoundingClientRect().width <= 15) {
                this.sliderContainer.classList.add(classNames.sliderSmallSize);
            }
            else {
                this.sliderContainer.classList.remove(classNames.sliderSmallSize);
            }
        }
        else {
            if (this.element.getBoundingClientRect().height <= 15) {
                this.sliderContainer.classList.add(classNames.sliderSmallSize);
            }
            else {
                this.sliderContainer.classList.remove(classNames.sliderSmallSize);
            }
        }
    };
    Slider.prototype.tickValuePosition = function () {
        this.firstChild = this.element.querySelector('ul').children[0];
        var first = this.firstChild.getBoundingClientRect();
        var firstChild;
        var otherChild;
        var smallStep = this.ticks.smallStep;
        var count = Math.abs((parseFloat(formatUnit(this.max))) - (parseFloat(formatUnit(this.min)))) / smallStep;
        if (this.firstChild.children.length > 0) {
            firstChild = this.firstChild.children[0].getBoundingClientRect();
        }
        var tickElements = [this.sliderContainer.querySelectorAll('.' + classNames.tick + '.' +
                classNames.large + ' .' + classNames.tickValue)];
        var other;
        if (this.ticks.placement === 'Both') {
            other = [].slice.call(tickElements[0], 2);
        }
        else {
            other = [].slice.call(tickElements[0], 1);
        }
        var tickWidth = this.orientation === 'Vertical' ?
            (first.height * 2) : (first.width * 2);
        for (var i = 0; i < this.firstChild.children.length; i++) {
            if (this.orientation === 'Vertical') {
                this.firstChild.children[i].style.top = -(firstChild.height / 2) + 'px';
            }
            else {
                if (!this.enableRtl) {
                    this.firstChild.children[i].style.left = -(firstChild.width / 2) + 'px';
                }
                else {
                    this.firstChild.children[i].style.left = (tickWidth -
                        this.firstChild.children[i].getBoundingClientRect().width) / 2 + 'px';
                }
            }
        }
        for (var i = 0; i < other.length; i++) {
            otherChild = other[i].getBoundingClientRect();
            if (this.orientation === 'Vertical') {
                setStyleAttribute(other[i], { top: (tickWidth - otherChild.height) / 2 + 'px' });
            }
            else {
                setStyleAttribute(other[i], { left: (tickWidth - otherChild.width) / 2 + 'px' });
            }
        }
        if (this.enableRtl && this.lastChild.children.length && count !== 0) {
            this.lastChild.children[0].style.left = -(this.lastChild.getBoundingClientRect().width / 2) + 'px';
            if (this.ticks.placement === 'Both') {
                this.lastChild.children[1].style.left = -(this.lastChild.getBoundingClientRect().width / 2) + 'px';
            }
        }
        if (count === 0) {
            if (this.orientation === 'Horizontal') {
                if (!this.enableRtl) {
                    this.firstChild.classList.remove(classNames.sliderLastTick);
                    this.firstChild.style.left = this.firstHandle.style.left;
                }
                else {
                    this.firstChild.classList.remove(classNames.sliderLastTick);
                    this.firstChild.style.right = this.firstHandle.style.right;
                    this.firstChild.children[0].style.left =
                        (this.firstChild.getBoundingClientRect().width / 2) + 2 + 'px';
                    if (this.ticks.placement === 'Both') {
                        this.firstChild.children[1].style.left =
                            (this.firstChild.getBoundingClientRect().width / 2) + 2 + 'px';
                    }
                }
            }
            if (this.orientation === 'Vertical') {
                this.firstChild.classList.remove(classNames.sliderLastTick);
            }
        }
    };
    Slider.prototype.setAriaAttrValue = function (element) {
        var ariaValueText;
        var isTickFormatted = ((!isNullOrUndefined(this.ticks) && !isNullOrUndefined(this.ticks.format))) ? true : false;
        var text = !isTickFormatted ?
            this.formatContent(this.ticksFormatInfo, false) : this.formatContent(this.tooltipFormatInfo, false);
        var valuenow = isTickFormatted ? this.formatContent(this.ticksFormatInfo, true) :
            this.formatContent(this.tooltipFormatInfo, true);
        text = (!this.customAriaText) ? (text) : (this.customAriaText);
        if (text.split(' - ').length === 2) {
            ariaValueText = text.split(' - ');
        }
        else {
            ariaValueText = [text, text];
        }
        this.setAriaAttributes(element);
        if (this.type !== 'Range') {
            attributes(element, { 'aria-valuenow': valuenow, 'aria-valuetext': text });
        }
        else {
            if (!this.enableRtl) {
                if (element === this.firstHandle) {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[0], 'aria-valuetext': ariaValueText[0] });
                }
                else {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[1], 'aria-valuetext': ariaValueText[1] });
                }
            }
            else {
                if (element === this.firstHandle) {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[1], 'aria-valuetext': ariaValueText[1] });
                }
                else {
                    attributes(element, { 'aria-valuenow': valuenow.split(' - ')[0], 'aria-valuetext': ariaValueText[0] });
                }
            }
        }
    };
    Slider.prototype.handleValueUpdate = function () {
        var hVal;
        if (this.type === 'Range') {
            if (this.activeHandle === 1) {
                hVal = this.handleVal1;
            }
            else {
                hVal = this.handleVal2;
            }
        }
        else {
            hVal = this.handleVal1;
        }
        return hVal;
    };
    Slider.prototype.getLimitCorrectedValues = function (value) {
        if (this.type === 'MinRange' || this.type === 'Default') {
            value = (this.getLimitValueAndPosition(value, this.limits.minStart, this.limits.minEnd))[0];
        }
        else {
            if (this.activeHandle === 1) {
                value = (this.getLimitValueAndPosition(value, this.limits.minStart, this.limits.minEnd))[0];
            }
            else {
                value = (this.getLimitValueAndPosition(value, this.limits.maxStart, this.limits.maxEnd))[0];
            }
        }
        return value;
    };
    Slider.prototype.focusSliderElement = function () {
        if (!this.isElementFocused) {
            this.element.focus();
            this.isElementFocused = true;
        }
    };
    Slider.prototype.buttonClick = function (args) {
        this.focusSliderElement();
        var value;
        var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
        var hVal = this.handleValueUpdate();
        if ((args.keyCode === 40) || (args.keyCode === 37)
            || args.currentTarget.classList.contains(classNames.firstButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
        }
        else if ((args.keyCode === 38) || (args.keyCode === 39) ||
            args.currentTarget.classList.contains(classNames.secondButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.step.toString()), false);
            }
            else {
                value = this.add(hVal, parseFloat(this.step.toString()), true);
            }
        }
        else if ((args.keyCode === 33
            || args.currentTarget.classList.contains(classNames.firstButton))) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), false);
            }
            else {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), true);
            }
        }
        else if ((args.keyCode === 34) ||
            args.currentTarget.classList.contains(classNames.secondButton)) {
            if (enabledRTL) {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), true);
            }
            else {
                value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), false);
            }
        }
        else if ((args.keyCode === 36)) {
            value = parseFloat(this.min < this.max ? this.min.toString() : this.max.toString());
        }
        else if ((args.keyCode === 35)) {
            value = parseFloat(this.min < this.max ? this.max.toString() : this.min.toString());
        }
        if (this.limits.enabled) {
            value = this.getLimitCorrectedValues(value);
        }
        this.changeHandleValue(value);
        if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible &&
            !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
            this.materialChange();
        }
        this.tooltipToggle(this.getHandle());
        this.getHandle().focus();
        this.focusHandle();
        if (args.currentTarget.classList.contains(classNames.firstButton)) {
            EventHandler.add(this.firstBtn, 'mouseup touchend', this.buttonUp, this);
        }
        if (args.currentTarget.classList.contains(classNames.secondButton)) {
            EventHandler.add(this.secondBtn, 'mouseup touchend', this.buttonUp, this);
        }
    };
    Slider.prototype.tooltipToggle = function (target) {
        if (this.isMaterialTooltip) {
            if (!this.tooltipElement.classList.contains(classNames.materialTooltipOpen)) {
                this.openMaterialTooltip();
            }
            else {
                this.refreshTooltip(this.firstHandle);
            }
        }
        else {
            if (!this.tooltipElement) {
                this.openTooltip(target);
            }
            else {
                this.refreshTooltip(target);
            }
        }
    };
    Slider.prototype.buttonUp = function (args) {
        if (args.currentTarget.classList.contains(classNames.firstButton)) {
            EventHandler.remove(this.firstBtn, 'mouseup touchend', this.buttonUp);
        }
        if (args.currentTarget.classList.contains(classNames.secondButton)) {
            EventHandler.remove(this.secondBtn, 'mouseup touchend', this.buttonUp);
        }
    };
    Slider.prototype.setRangeBar = function () {
        if (this.orientation === 'Horizontal' && !isNullOrUndefined(this.rangeBar)) {
            if (this.type === 'MinRange') {
                if (this.enableRtl) {
                    this.rangeBar.style.right = '0px';
                }
                else {
                    this.rangeBar.style.left = '0px';
                }
                setStyleAttribute(this.rangeBar, { 'width': isNullOrUndefined(this.handlePos1) ? 0 : this.handlePos1 + 'px' });
            }
            else {
                if (this.enableRtl) {
                    this.rangeBar.style.right = this.handlePos1 + 'px';
                }
                else {
                    this.rangeBar.style.left = this.handlePos1 + 'px';
                }
                setStyleAttribute(this.rangeBar, { 'width': this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
        else if (!isNullOrUndefined(this.rangeBar)) {
            if (this.type === 'MinRange') {
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos1 + 'px' : '0px';
                setStyleAttribute(this.rangeBar, { 'height': isNullOrUndefined(this.handlePos1) ? 0 : this.min > this.max ? this.element.clientHeight - this.handlePos1 + 'px' : this.handlePos1 + 'px' });
            }
            else {
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos2 + 'px' : this.handlePos1 + 'px';
                setStyleAttribute(this.rangeBar, { 'height': this.min > this.max ? this.handlePos1 - this.handlePos2 + 'px' : this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
    };
    Slider.prototype.checkValidValueAndPos = function (value) {
        value = this.checkHandleValue(value);
        value = this.checkHandlePosition(value);
        return value;
    };
    Slider.prototype.setLimitBarPositions = function (fromMinPostion, fromMaxpostion, toMinPostion, toMaxpostion) {
        if (this.orientation === 'Horizontal') {
            if (!this.enableRtl) {
                this.limitBarFirst.style.left = fromMinPostion + 'px';
                this.limitBarFirst.style.width = (fromMaxpostion - fromMinPostion) + 'px';
            }
            else {
                this.limitBarFirst.style.right = fromMinPostion + 'px';
                this.limitBarFirst.style.width = (fromMaxpostion - fromMinPostion) + 'px';
            }
        }
        else {
            this.limitBarFirst.style.bottom = (this.min < this.max ? fromMinPostion : fromMaxpostion) + 'px';
            this.limitBarFirst.style.height = (this.min < this.max ? (fromMaxpostion - fromMinPostion) : (fromMinPostion - fromMaxpostion)) + 'px';
        }
        if (this.type === 'Range') {
            if (this.orientation === 'Horizontal') {
                if (!this.enableRtl) {
                    this.limitBarSecond.style.left = toMinPostion + 'px';
                    this.limitBarSecond.style.width = (toMaxpostion - toMinPostion) + 'px';
                }
                else {
                    this.limitBarSecond.style.right = toMinPostion + 'px';
                    this.limitBarSecond.style.width = (toMaxpostion - toMinPostion) + 'px';
                }
            }
            else {
                this.limitBarSecond.style.bottom = (this.min < this.max ? toMinPostion : toMaxpostion) + 'px';
                this.limitBarSecond.style.height = (this.min < this.max ? (toMaxpostion - toMinPostion) : (toMinPostion - toMaxpostion)) + 'px';
            }
        }
    };
    Slider.prototype.setLimitBar = function () {
        if (this.type === 'Default' || this.type === 'MinRange') {
            var fromPosition = (this.getLimitValueAndPosition(this.limits.minStart, this.limits.minStart, this.limits.minEnd, true))[0];
            fromPosition = this.checkValidValueAndPos(fromPosition);
            var toPosition = (this.getLimitValueAndPosition(this.limits.minEnd, this.limits.minStart, this.limits.minEnd, true))[0];
            toPosition = this.checkValidValueAndPos(toPosition);
            this.setLimitBarPositions(fromPosition, toPosition);
        }
        else if (this.type === 'Range') {
            var fromMinPostion = (this.getLimitValueAndPosition(this.limits.minStart, this.limits.minStart, this.limits.minEnd, true))[0];
            fromMinPostion = this.checkValidValueAndPos(fromMinPostion);
            var fromMaxpostion = (this.getLimitValueAndPosition(this.limits.minEnd, this.limits.minStart, this.limits.minEnd, true))[0];
            fromMaxpostion = this.checkValidValueAndPos(fromMaxpostion);
            var toMinPostion = (this.getLimitValueAndPosition(this.limits.maxStart, this.limits.maxStart, this.limits.maxEnd, true))[0];
            toMinPostion = this.checkValidValueAndPos(toMinPostion);
            var toMaxpostion = (this.getLimitValueAndPosition(this.limits.maxEnd, this.limits.maxStart, this.limits.maxEnd, true))[0];
            toMaxpostion = this.checkValidValueAndPos(toMaxpostion);
            this.setLimitBarPositions(fromMinPostion, fromMaxpostion, toMinPostion, toMaxpostion);
        }
    };
    Slider.prototype.getLimitValueAndPosition = function (currentValue, minValue, maxValue, limitBar) {
        if (isNullOrUndefined(minValue)) {
            minValue = this.min < this.max ? this.min : this.max;
            if (isNullOrUndefined(currentValue) && limitBar) {
                currentValue = minValue;
            }
        }
        if (isNullOrUndefined(maxValue)) {
            maxValue = this.min < this.max ? this.max : this.min;
            if (isNullOrUndefined(currentValue) && limitBar) {
                currentValue = maxValue;
            }
        }
        if (currentValue < minValue) {
            currentValue = minValue;
        }
        if (currentValue > maxValue) {
            currentValue = maxValue;
        }
        return [currentValue, this.checkHandlePosition(currentValue)];
    };
    Slider.prototype.setValue = function () {
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
            this.min = 0;
            this.max = this.customValues.length - 1;
            this.setBarColor();
        }
        this.setAriaAttributes(this.firstHandle);
        this.handleVal1 = isNullOrUndefined(this.value) ? this.checkHandleValue(parseFloat(this.min.toString())) :
            this.checkHandleValue(parseFloat(this.value.toString()));
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        this.preHandlePos1 = this.handlePos1;
        if (isNullOrUndefined(this.activeHandle)) {
            this.activeHandle = this.type === 'Range' ? 2 : 1;
        }
        if (this.type === 'Default' || this.type === 'MinRange') {
            if (this.limits.enabled) {
                var values = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
                this.handleVal1 = values[0];
                this.handlePos1 = values[1];
                this.preHandlePos1 = this.handlePos1;
            }
            this.setHandlePosition(null);
            this.handleStart();
            this.value = this.handleVal1;
            this.setAriaAttrValue(this.firstHandle);
            this.changeEvent('changed', null);
        }
        else {
            this.validateRangeValue();
        }
        if (this.type !== 'Default') {
            this.setRangeBar();
        }
        if (this.limits.enabled) {
            this.setLimitBar();
        }
    };
    Slider.prototype.rangeValueUpdate = function () {
        if (this.value === null || typeof (this.value) !== 'object') {
            this.value = [parseFloat(formatUnit(this.min)), parseFloat(formatUnit(this.max))];
        }
    };
    Slider.prototype.validateRangeValue = function () {
        this.rangeValueUpdate();
        this.setRangeValue();
    };
    Slider.prototype.modifyZindex = function () {
        if (this.type === 'Range' && !isNullOrUndefined(this.firstHandle) && !isNullOrUndefined(this.secondHandle)) {
            if (this.activeHandle === 1) {
                this.firstHandle.style.zIndex = (this.zIndex + 4) + '';
                this.secondHandle.style.zIndex = (this.zIndex + 3) + '';
            }
            else {
                this.firstHandle.style.zIndex = (this.zIndex + 3) + '';
                this.secondHandle.style.zIndex = (this.zIndex + 4) + '';
            }
        }
        else if (this.isMaterialTooltip && this.tooltipElement) {
            this.tooltipElement.style.zIndex = getZindexPartial(this.element) + '';
        }
    };
    Slider.prototype.setHandlePosition = function (event) {
        var _this = this;
        var handle;
        var pos = (this.activeHandle === 1) ? this.handlePos1 : this.handlePos2;
        if (this.isMaterialTooltip) {
            handle = [this.firstHandle, this.materialHandle];
        }
        else {
            handle = [this.getHandle()];
        }
        this.handleStart();
        handle.forEach(function (handle) {
            if (isNullOrUndefined(handle)) {
                return;
            }
            if (_this.orientation === 'Horizontal') {
                if (_this.enableRtl) {
                    handle.style.right = pos + "px";
                }
                else {
                    handle.style.left = pos + "px";
                }
            }
            else {
                handle.style.bottom = pos + "px";
            }
        });
        this.changeEvent('change', event);
    };
    Slider.prototype.getHandle = function () {
        return (this.activeHandle === 1) ? this.firstHandle : this.secondHandle;
    };
    Slider.prototype.setRangeValue = function () {
        this.updateRangeValue();
        this.activeHandle = 1;
        this.setHandlePosition(null);
        this.activeHandle = 2;
        this.setHandlePosition(null);
        this.activeHandle = 1;
    };
    Slider.prototype.changeEvent = function (eventName, e) {
        var previous = eventName === 'change' ? this.previousVal : this.previousChanged;
        if (this.type !== 'Range') {
            this.setProperties({ 'value': this.handleVal1 }, true);
            if (previous !== this.value && (!this.isMaterialTooltip || !this.initialTooltip)) {
                this.trigger(eventName, this.changeEventArgs(eventName, e));
                this.initialTooltip = true;
                this.setPreviousVal(eventName, this.value);
            }
            this.setAriaAttrValue(this.firstHandle);
        }
        else {
            var value = this.value = [this.handleVal1, this.handleVal2];
            this.setProperties({ 'value': value }, true);
            if (previous.length === this.value.length
                && this.value[0] !== previous[0] || this.value[1] !== previous[1]) {
                this.initialTooltip = false;
                this.trigger(eventName, this.changeEventArgs(eventName, e));
                this.initialTooltip = true;
                this.setPreviousVal(eventName, this.value);
            }
            this.setAriaAttrValue(this.getHandle());
        }
        this.hiddenInput.value = this.value.toString();
    };
    Slider.prototype.changeEventArgs = function (eventName, e) {
        var eventArgs;
        if (this.tooltip.isVisible && this.tooltipObj && this.initialTooltip) {
            this.tooltipValue();
            eventArgs = {
                value: this.value,
                previousValue: eventName === 'change' ? this.previousVal : this.previousChanged,
                action: eventName, text: (typeof (this.tooltipObj.content) === 'function' ? this.tooltipObj.content() : this.tooltipObj.content), isInteracted: isNullOrUndefined(e) ? false : true
            };
        }
        else {
            eventArgs = {
                value: this.value,
                previousValue: eventName === 'change' ? this.previousVal : this.previousChanged,
                action: eventName, text: isNullOrUndefined(this.ticksFormatInfo.format) ? this.value.toString() :
                    (this.type !== 'Range' ? this.formatString(this.value, this.ticksFormatInfo).formatString :
                        (this.formatString(this.value[0], this.ticksFormatInfo).formatString + ' - ' +
                            this.formatString(this.value[1], this.ticksFormatInfo).formatString)),
                isInteracted: isNullOrUndefined(e) ? false : true
            };
        }
        return eventArgs;
    };
    Slider.prototype.setPreviousVal = function (eventName, value) {
        if (eventName === 'change') {
            this.previousVal = value;
        }
        else {
            this.previousChanged = value;
        }
    };
    Slider.prototype.updateRangeValue = function () {
        var values = this.value.toString().split(',').map(Number);
        if ((this.enableRtl && this.orientation !== 'Vertical') || this.rtl) {
            this.value = [values[1], values[0]];
        }
        else {
            this.value = [values[0], values[1]];
        }
        if (this.enableRtl && this.orientation !== 'Vertical') {
            this.handleVal1 = this.checkHandleValue(this.value[1]);
            this.handleVal2 = this.checkHandleValue(this.value[0]);
        }
        else {
            this.handleVal1 = this.checkHandleValue(this.value[0]);
            this.handleVal2 = this.checkHandleValue(this.value[1]);
        }
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        this.handlePos2 = this.checkHandlePosition(this.handleVal2);
        if (this.min < this.max && this.handlePos1 > this.handlePos2) {
            this.handlePos1 = this.handlePos2;
            this.handleVal1 = this.handleVal2;
        }
        if (this.min > this.max && this.handlePos1 < this.handlePos2) {
            this.handlePos2 = this.handlePos1;
            this.handleVal2 = this.handleVal1;
        }
        this.preHandlePos1 = this.handlePos1;
        this.preHandlePos2 = this.handlePos2;
        if (this.limits.enabled) {
            this.activeHandle = 1;
            var values_1 = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
            this.handleVal1 = values_1[0];
            this.handlePos1 = values_1[1];
            this.preHandlePos1 = this.handlePos1;
            this.activeHandle = 2;
            values_1 = this.getLimitValueAndPosition(this.handleVal2, this.limits.maxStart, this.limits.maxEnd);
            this.handleVal2 = values_1[0];
            this.handlePos2 = values_1[1];
            this.preHandlePos2 = this.handlePos2;
        }
    };
    Slider.prototype.checkHandlePosition = function (value) {
        var pos;
        value = (100 *
            (value - (parseFloat(formatUnit(this.min))))) / ((parseFloat(formatUnit(this.max))) - (parseFloat(formatUnit(this.min))));
        if (this.orientation === 'Horizontal') {
            pos = this.element.getBoundingClientRect().width * (value / 100);
        }
        else {
            pos = this.element.getBoundingClientRect().height * (value / 100);
        }
        if (((parseFloat(formatUnit(this.max))) === (parseFloat(formatUnit(this.min))))) {
            if (this.orientation === 'Horizontal') {
                pos = this.element.getBoundingClientRect().width;
            }
            else {
                pos = this.element.getBoundingClientRect().height;
            }
        }
        return pos;
    };
    Slider.prototype.checkHandleValue = function (value) {
        if (this.min === this.max) {
            return (parseFloat(formatUnit(this.max)));
        }
        var handle = this.tempStartEnd();
        if (value < handle.start) {
            value = handle.start;
        }
        else if (value > handle.end) {
            value = handle.end;
        }
        return value;
    };
    /**
     * It is used to reposition slider.
     *
     * @returns {void}
     */
    Slider.prototype.reposition = function () {
        var _this = this;
        if (!isNullOrUndefined(this.firstHandle)) {
            this.firstHandle.style.transition = 'none';
        }
        if (this.type !== 'Default' && !isNullOrUndefined(this.rangeBar)) {
            this.rangeBar.style.transition = 'none';
        }
        if (this.type === 'Range' && !isNullOrUndefined(this.secondHandle)) {
            this.secondHandle.style.transition = 'none';
        }
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        if (this.handleVal2) {
            this.handlePos2 = this.checkHandlePosition(this.handleVal2);
        }
        if (this.orientation === 'Horizontal') {
            if (this.enableRtl) {
                this.firstHandle.style.right = this.handlePos1 + "px";
            }
            else {
                this.firstHandle.style.left = this.handlePos1 + "px";
            }
            if (this.isMaterialTooltip && !isNullOrUndefined(this.materialHandle)) {
                if (this.enableRtl) {
                    this.materialHandle.style.right = this.handlePos1 + "px";
                }
                else {
                    this.materialHandle.style.left = this.handlePos1 + "px";
                }
            }
            if (this.type === 'MinRange' && !isNullOrUndefined(this.rangeBar)) {
                if (this.enableRtl) {
                    this.rangeBar.style.right = '0px';
                }
                else {
                    this.rangeBar.style.left = '0px';
                }
                setStyleAttribute(this.rangeBar, { 'width': isNullOrUndefined(this.handlePos1) ? 0 : this.handlePos1 + 'px' });
            }
            else if (this.type === 'Range' && !isNullOrUndefined(this.secondHandle) && !isNullOrUndefined(this.rangeBar)) {
                if (this.enableRtl) {
                    this.secondHandle.style.right = this.handlePos2 + "px";
                    this.rangeBar.style.right = this.handlePos1 + 'px';
                }
                else {
                    this.secondHandle.style.left = this.handlePos2 + "px";
                    this.rangeBar.style.left = this.handlePos1 + 'px';
                }
                setStyleAttribute(this.rangeBar, { 'width': this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
        else {
            this.firstHandle.style.bottom = this.handlePos1 + "px";
            if (this.isMaterialTooltip) {
                this.materialHandle.style.bottom = this.handlePos1 + "px";
            }
            if (this.type === 'MinRange') {
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos1 + 'px' : '0px';
                setStyleAttribute(this.rangeBar, { 'height': isNullOrUndefined(this.handlePos1) ? 0 : this.min > this.max ? this.element.clientHeight - this.handlePos1 + 'px' : this.handlePos1 + 'px' });
            }
            else if (this.type === 'Range') {
                this.secondHandle.style.bottom = this.handlePos2 + "px";
                this.rangeBar.style.bottom = this.min > this.max ? this.handlePos2 + 'px' : this.handlePos1 + 'px';
                setStyleAttribute(this.rangeBar, { 'height': this.min > this.max ? this.handlePos1 - this.handlePos2 + 'px' : this.handlePos2 - this.handlePos1 + 'px' });
            }
        }
        if (this.limits.enabled) {
            this.setLimitBar();
        }
        if (this.ticks.placement !== 'None' && this.ul) {
            this.removeElement(this.ul);
            this.ul = undefined;
            this.renderScale();
        }
        this.handleStart();
        if (!this.tooltip.isVisible) {
            setTimeout(function () {
                if (!isNullOrUndefined(_this.firstHandle)) {
                    _this.firstHandle.style.transition = _this.scaleTransform;
                }
                if (_this.type === 'Range' && !isNullOrUndefined(_this.secondHandle)) {
                    _this.secondHandle.style.transition = _this.scaleTransform;
                }
            });
        }
        this.refreshTooltip(this.tooltipTarget);
        this.setBarColor();
    };
    Slider.prototype.changeHandleValue = function (value) {
        var position = null;
        if (this.activeHandle === 1) {
            if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                this.handleVal1 = this.checkHandleValue(value);
                this.handlePos1 = this.checkHandlePosition(this.handleVal1);
                if (this.type === 'Range' && ((this.handlePos1 > this.handlePos2 && this.min < this.max) || (this.handlePos1 < this.handlePos2 && this.min > this.max))) {
                    this.handlePos1 = this.handlePos2;
                    this.handleVal1 = this.handleVal2;
                }
                if (this.handlePos1 !== this.preHandlePos1) {
                    position = this.preHandlePos1 = this.handlePos1;
                }
            }
            this.modifyZindex();
        }
        else {
            if (!(this.limits.enabled && this.limits.endHandleFixed)) {
                this.handleVal2 = this.checkHandleValue(value);
                this.handlePos2 = this.checkHandlePosition(this.handleVal2);
                if (this.type === 'Range' && ((this.handlePos2 < this.handlePos1 && this.min < this.max) || (this.handlePos2 > this.handlePos1 && this.min > this.max))) {
                    this.handlePos2 = this.handlePos1;
                    this.handleVal2 = this.handleVal1;
                }
                if (this.handlePos2 !== this.preHandlePos2) {
                    position = this.preHandlePos2 = this.handlePos2;
                }
            }
            this.modifyZindex();
        }
        if (position !== null) {
            if (this.type !== 'Default') {
                this.setRangeBar();
            }
            this.setHandlePosition(null);
        }
    };
    Slider.prototype.tempStartEnd = function () {
        if (this.min > this.max) {
            return {
                start: this.max,
                end: this.min
            };
        }
        else {
            return {
                start: this.min,
                end: this.max
            };
        }
    };
    Slider.prototype.xyToPosition = function (position) {
        var pos;
        if (this.min === this.max) {
            return 100;
        }
        if (this.orientation === 'Horizontal') {
            var left = position.x - this.element.getBoundingClientRect().left;
            var num = this.element.offsetWidth / 100;
            this.val = (left / num);
        }
        else {
            var top_1 = position.y - this.element.getBoundingClientRect().top;
            var num = this.element.offsetHeight / 100;
            this.val = 100 - (top_1 / num);
        }
        var val = this.stepValueCalculation(this.val);
        if (val < 0) {
            val = 0;
        }
        else if (val > 100) {
            val = 100;
        }
        if (this.enableRtl && this.orientation !== 'Vertical') {
            val = 100 - val;
        }
        if (this.orientation === 'Horizontal') {
            pos = this.element.getBoundingClientRect().width * (val / 100);
        }
        else {
            pos = this.element.getBoundingClientRect().height * (val / 100);
        }
        return pos;
    };
    Slider.prototype.stepValueCalculation = function (value) {
        if (this.step === 0) {
            this.step = 1;
        }
        var percentStep = (parseFloat(formatUnit(this.step))) / ((parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min))) / 100);
        var remain = value % Math.abs(percentStep);
        if (remain !== 0) {
            if ((percentStep / 2) > remain) {
                value -= remain;
            }
            else {
                value += Math.abs(percentStep) - remain;
            }
        }
        return value;
    };
    Slider.prototype.add = function (a, b, addition) {
        var x = Math.pow(10,  3);
        var val;
        if (addition) {
            val = (Math.round(a * x) + Math.round(b * x)) / x;
        }
        else {
            val = (Math.round(a * x) - Math.round(b * x)) / x;
        }
        return val;
    };
    Slider.prototype.positionToValue = function (pos) {
        var val;
        var diff = parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min));
        if (this.orientation === 'Horizontal') {
            val = (pos / this.element.getBoundingClientRect().width) * diff;
        }
        else {
            val = (pos / this.element.getBoundingClientRect().height) * diff;
        }
        var total = this.add(val, parseFloat(this.min.toString()), true);
        return (total);
    };
    Slider.prototype.sliderBarClick = function (evt) {
        evt.preventDefault();
        var pos;
        if (evt.type === 'mousedown' || evt.type === 'mouseup' || evt.type === 'click') {
            pos = { x: evt.clientX, y: evt.clientY };
        }
        else if (evt.type === 'touchend' || evt.type === 'touchstart') {
            pos = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
        }
        var handlepos = this.xyToPosition(pos);
        var handleVal = this.positionToValue(handlepos);
        if (this.type === 'Range' && (this.min < (this.max) && (this.handlePos2 - handlepos) < (handlepos - this.handlePos1) || (this.min > this.max) && (this.handlePos1 - handlepos) > (handlepos - this.handlePos2))) {
            this.activeHandle = 2;
            if (!(this.limits.enabled && this.limits.endHandleFixed)) {
                if (this.limits.enabled) {
                    var value = this.getLimitValueAndPosition(handleVal, this.limits.maxStart, this.limits.maxEnd);
                    handleVal = value[0];
                    handlepos = value[1];
                }
                this.secondHandle.classList.add(classNames.sliderActiveHandle);
                this.handlePos2 = this.preHandlePos2 = handlepos;
                this.handleVal2 = handleVal;
            }
            this.modifyZindex();
            this.secondHandle.focus();
        }
        else {
            this.activeHandle = 1;
            if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                if (this.limits.enabled) {
                    var value = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                    handleVal = value[0];
                    handlepos = value[1];
                }
                this.firstHandle.classList.add(classNames.sliderActiveHandle);
                this.handlePos1 = this.preHandlePos1 = handlepos;
                this.handleVal1 = handleVal;
            }
            this.modifyZindex();
            this.firstHandle.focus();
        }
        if (this.isMaterialTooltip) {
            this.tooltipElement.classList.add(classNames.materialTooltipActive);
        }
        var focusedElement = this.element.querySelector('.' + classNames.sliderTabHandle);
        if (focusedElement && this.getHandle() !== focusedElement) {
            focusedElement.classList.remove(classNames.sliderTabHandle);
        }
        var handle = this.activeHandle === 1 ? this.firstHandle : this.secondHandle;
        var behindElement;
        if ((evt.type === 'click' || evt.type === 'mousedown') && evt.target === handle) {
            var eventX = evt.clientX, eventY = evt.clientY;
            behindElement = document.elementFromPoint(eventX, eventY);
        }
        if (!this.checkRepeatedValue(handleVal)) {
            return;
        }
        var transition = (this.isMaterial || this.isMaterial3) && this.tooltip.isVisible ?
            this.transitionOnMaterialTooltip : this.transition;
        this.getHandle().style.transition = transition.handle;
        if (this.type !== 'Default') {
            this.rangeBar.style.transition = transition.rangeBar;
        }
        this.setHandlePosition(evt);
        if (this.isMaterialTooltip) {
            this.initialTooltip = false;
        }
        if (evt.target !== handle) {
            this.changeEvent('changed', evt);
        }
        if (this.type !== 'Default') {
            this.setRangeBar();
        }
    };
    Slider.prototype.handleValueAdjust = function (handleValue, assignValue, handleNumber) {
        if (handleNumber === 1) {
            this.handleVal1 = assignValue;
            this.handleVal2 = this.handleVal1 + this.minDiff;
        }
        else if (handleNumber === 2) {
            this.handleVal2 = assignValue;
            this.handleVal1 = this.handleVal2 - this.minDiff;
        }
        this.handlePos1 = this.checkHandlePosition(this.handleVal1);
        this.handlePos2 = this.checkHandlePosition(this.handleVal2);
    };
    Slider.prototype.dragRangeBarMove = function (event) {
        var _a, _b;
        if (event.type !== 'touchmove') {
            event.preventDefault();
        }
        this.rangeBarDragged = true;
        var pos;
        this.rangeBar.style.transition = 'none';
        this.firstHandle.style.transition = 'none';
        this.secondHandle.style.transition = 'none';
        var xPostion;
        var yPostion;
        if (event.type === 'mousemove') {
            _a = [event.clientX, event.clientY], xPostion = _a[0], yPostion = _a[1];
        }
        else {
            _b = [event.changedTouches[0].clientX, event.changedTouches[0].clientY], xPostion = _b[0], yPostion = _b[1];
        }
        if (!(this.limits.enabled && this.limits.startHandleFixed) && !(this.limits.enabled && this.limits.endHandleFixed)) {
            if (!this.enableRtl) {
                pos = { x: xPostion - this.firstPartRemain, y: yPostion + this.secondPartRemain };
            }
            else {
                pos = { x: xPostion + this.secondPartRemain, y: yPostion + this.secondPartRemain };
            }
            if (this.min > this.max) {
                this.handlePos2 = this.xyToPosition(pos);
                this.handleVal2 = this.positionToValue(this.handlePos2);
            }
            else {
                this.handlePos1 = this.xyToPosition(pos);
                this.handleVal1 = this.positionToValue(this.handlePos1);
            }
            if (!this.enableRtl) {
                pos = { x: xPostion + this.secondPartRemain, y: yPostion - this.firstPartRemain };
            }
            else {
                pos = { x: xPostion - this.firstPartRemain, y: yPostion - this.firstPartRemain };
            }
            if (this.min > this.max) {
                this.handlePos1 = this.xyToPosition(pos);
                this.handleVal1 = this.positionToValue(this.handlePos1);
            }
            else {
                this.handlePos2 = this.xyToPosition(pos);
                this.handleVal2 = this.positionToValue(this.handlePos2);
            }
            if (this.limits.enabled) {
                var value = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
                this.handleVal1 = value[0];
                this.handlePos1 = value[1];
                if (this.handleVal1 === this.limits.minEnd) {
                    this.handleValueAdjust(this.handleVal1, this.limits.minEnd, 1);
                }
                if (this.handleVal1 === this.limits.minStart) {
                    this.handleValueAdjust(this.handleVal1, this.limits.minStart, 1);
                }
                value = this.getLimitValueAndPosition(this.handleVal2, this.limits.maxStart, this.limits.maxEnd);
                this.handleVal2 = value[0];
                this.handlePos2 = value[1];
                if (this.handleVal2 === this.limits.maxStart) {
                    this.handleValueAdjust(this.handleVal2, this.limits.maxStart, 2);
                }
                if (this.handleVal2 === this.limits.maxEnd) {
                    this.handleValueAdjust(this.handleVal2, this.limits.maxEnd, 2);
                }
            }
            if (this.handleVal2 === (this.min > this.max ? this.min : this.max)) {
                this.handleValueAdjust(this.handleVal2, (this.min > this.max ? this.min : this.max), 2);
            }
            if (this.handleVal1 === (this.min > this.max ? this.max : this.min)) {
                this.handleValueAdjust(this.handleVal1, (this.min > this.max ? this.max : this.min), 1);
            }
        }
        this.activeHandle = 1;
        this.setHandlePosition(event);
        this.activeHandle = 2;
        this.setHandlePosition(event);
        this.tooltipToggle(this.rangeBar);
        this.setRangeBar();
    };
    Slider.prototype.sliderBarUp = function (event) {
        this.changeEvent('changed', event);
        this.handleFocusOut();
        this.firstHandle.classList.remove(classNames.sliderActiveHandle);
        if (this.type === 'Range') {
            this.initialTooltip = false;
            this.secondHandle.classList.remove(classNames.sliderActiveHandle);
        }
        this.closeTooltip();
        if (this.isMaterial || this.isMaterial3) {
            this.getHandle().classList.remove('e-large-thumb-size');
            if (this.isMaterialTooltip) {
                this.tooltipElement.classList.remove(classNames.materialTooltipActive);
            }
        }
        EventHandler.remove(document, 'mousemove touchmove', this.sliderBarMove);
        EventHandler.remove(document, 'mouseup touchend', this.sliderBarUp);
    };
    Slider.prototype.sliderBarMove = function (evt) {
        if (evt.type !== 'touchmove') {
            evt.preventDefault();
        }
        var pos;
        if (evt.type === 'mousemove') {
            pos = { x: evt.clientX, y: evt.clientY };
        }
        else {
            pos = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
        }
        var handlepos = this.xyToPosition(pos);
        var handleVal = this.positionToValue(handlepos);
        handlepos = Math.round(handlepos);
        if (this.type !== 'Range' && this.activeHandle === 1) {
            if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                if (this.limits.enabled) {
                    var valueAndPostion = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                    handlepos = valueAndPostion[1];
                    handleVal = valueAndPostion[0];
                }
                this.handlePos1 = handlepos;
                this.handleVal1 = handleVal;
            }
            this.firstHandle.classList.add(classNames.sliderActiveHandle);
        }
        if (this.type === 'Range') {
            if (this.activeHandle === 1) {
                this.firstHandle.classList.add(classNames.sliderActiveHandle);
                if (!(this.limits.enabled && this.limits.startHandleFixed)) {
                    if ((this.min < this.max && handlepos > this.handlePos2 || (this.min > this.max && handlepos < this.handlePos2))) {
                        handlepos = this.handlePos2;
                        handleVal = this.handleVal2;
                    }
                    if (handlepos !== this.preHandlePos1) {
                        if (this.limits.enabled) {
                            var value = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                            handleVal = value[0];
                            handlepos = value[1];
                        }
                        this.handlePos1 = this.preHandlePos1 = handlepos;
                        this.handleVal1 = handleVal;
                        this.activeHandle = 1;
                    }
                }
            }
            else if (this.activeHandle === 2) {
                this.secondHandle.classList.add(classNames.sliderActiveHandle);
                if (!(this.limits.enabled && this.limits.endHandleFixed)) {
                    if ((this.min < this.max && handlepos < this.handlePos1) || (this.min > this.max && handlepos > this.handlePos1)) {
                        handlepos = this.handlePos1;
                        handleVal = this.handleVal1;
                    }
                    if (handlepos !== this.preHandlePos2) {
                        if (this.limits.enabled) {
                            var value = this.getLimitValueAndPosition(handleVal, this.limits.maxStart, this.limits.maxEnd);
                            handleVal = value[0];
                            handlepos = value[1];
                        }
                        this.handlePos2 = this.preHandlePos2 = handlepos;
                        this.handleVal2 = handleVal;
                        this.activeHandle = 2;
                    }
                }
            }
        }
        if (!this.checkRepeatedValue(handleVal)) {
            return;
        }
        this.getHandle().style.transition = this.scaleTransform;
        if (this.type !== 'Default') {
            this.rangeBar.style.transition = 'none';
        }
        this.setHandlePosition(evt);
        if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible &&
            !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
            this.materialChange();
        }
        this.tooltipToggle(this.getHandle());
        if (this.type !== 'Default') {
            this.setRangeBar();
        }
    };
    Slider.prototype.dragRangeBarUp = function (event) {
        if (!this.rangeBarDragged) {
            this.focusSliderElement();
            this.sliderBarClick(event);
        }
        else {
            this.isDragComplete = true;
        }
        this.changeEvent('changed', event);
        this.closeTooltip();
        EventHandler.remove(document, 'mousemove touchmove', this.dragRangeBarMove);
        EventHandler.remove(document, 'mouseup touchend', this.dragRangeBarUp);
        this.rangeBarDragged = false;
    };
    Slider.prototype.checkRepeatedValue = function (currentValue) {
        if (this.type === 'Range') {
            var previousVal = this.enableRtl && this.orientation !== 'Vertical' ? (this.activeHandle === 1 ?
                this.previousVal[1] : this.previousVal[0]) :
                (this.activeHandle === 1 ? this.previousVal[0] : this.previousVal[1]);
            if (currentValue === previousVal) {
                return 0;
            }
        }
        else {
            if (currentValue === this.previousVal) {
                return 0;
            }
        }
        return 1;
    };
    Slider.prototype.refreshTooltip = function (target) {
        if (this.tooltip.isVisible && this.tooltipObj) {
            this.tooltipValue();
            if (target) {
                this.tooltipObj.refresh(target);
                this.tooltipTarget = target;
            }
        }
    };
    Slider.prototype.openTooltip = function (target) {
        if (this.tooltip.isVisible && this.tooltipObj && !this.isMaterialTooltip) {
            this.tooltipValue();
            this.tooltipObj.open(target);
            this.tooltipTarget = target;
        }
    };
    Slider.prototype.closeTooltip = function () {
        if (this.tooltip.isVisible && this.tooltipObj && this.tooltip.showOn !== 'Always' && !this.isMaterialTooltip) {
            this.tooltipValue();
            this.tooltipObj.close();
            this.tooltipTarget = undefined;
        }
    };
    Slider.prototype.keyDown = function (event) {
        switch (event.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
            case 33:
            case 34:
            case 36:
            case 35:
                event.preventDefault();
                this.buttonClick(event);
                break;
        }
    };
    Slider.prototype.wireButtonEvt = function (destroy) {
        if (!destroy) {
            EventHandler.add(this.firstBtn, 'mouseleave touchleave', this.buttonFocusOut, this);
            EventHandler.add(this.secondBtn, 'mouseleave touchleave', this.buttonFocusOut, this);
            EventHandler.add(this.firstBtn, 'mousedown touchstart', this.repeatHandlerMouse, this);
            EventHandler.add(this.firstBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp, this);
            EventHandler.add(this.secondBtn, 'mousedown touchstart', this.repeatHandlerMouse, this);
            EventHandler.add(this.secondBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp, this);
            EventHandler.add(this.firstBtn, 'focusout', this.sliderFocusOut, this);
            EventHandler.add(this.secondBtn, 'focusout', this.sliderFocusOut, this);
        }
        else {
            EventHandler.remove(this.firstBtn, 'mouseleave touchleave', this.buttonFocusOut);
            EventHandler.remove(this.secondBtn, 'mouseleave touchleave', this.buttonFocusOut);
            EventHandler.remove(this.firstBtn, 'mousedown touchstart', this.repeatHandlerMouse);
            EventHandler.remove(this.firstBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp);
            EventHandler.remove(this.secondBtn, 'mousedown touchstart', this.repeatHandlerMouse);
            EventHandler.remove(this.secondBtn, 'mouseup mouseleave touchup touchend', this.repeatHandlerUp);
            EventHandler.remove(this.firstBtn, 'focusout', this.sliderFocusOut);
            EventHandler.remove(this.secondBtn, 'focusout', this.sliderFocusOut);
        }
    };
    Slider.prototype.rangeBarMousedown = function (event) {
        var _a, _b;
        event.preventDefault();
        this.focusSliderElement();
        if (this.type === 'Range' && this.drag && event.target === this.rangeBar) {
            var xPostion = void 0;
            var yPostion = void 0;
            if (event.type === 'mousedown') {
                _a = [event.clientX, event.clientY], xPostion = _a[0], yPostion = _a[1];
            }
            else if (event.type === 'touchstart') {
                _b = [event.changedTouches[0].clientX, event.changedTouches[0].clientY], xPostion = _b[0], yPostion = _b[1];
            }
            if (this.orientation === 'Horizontal') {
                this.firstPartRemain = xPostion - this.rangeBar.getBoundingClientRect().left;
                this.secondPartRemain = this.rangeBar.getBoundingClientRect().right - xPostion;
            }
            else {
                this.firstPartRemain = yPostion - this.rangeBar.getBoundingClientRect().top;
                this.secondPartRemain = this.rangeBar.getBoundingClientRect().bottom - yPostion;
            }
            this.minDiff = this.handleVal2 - this.handleVal1;
            this.tooltipToggle(this.rangeBar);
            var focusedElement = this.element.querySelector('.' + classNames.sliderTabHandle);
            if (focusedElement) {
                focusedElement.classList.remove(classNames.sliderTabHandle);
            }
            EventHandler.add(document, 'mousemove touchmove', this.dragRangeBarMove, this);
            EventHandler.add(document, 'mouseup touchend', this.dragRangeBarUp, this);
        }
    };
    Slider.prototype.elementClick = function (event) {
        if (this.isDragComplete) {
            this.isDragComplete = false;
            return;
        }
        event.preventDefault();
        this.focusSliderElement();
        this.sliderBarClick(event);
        this.focusHandle();
    };
    Slider.prototype.wireEvents = function () {
        this.onresize = this.reposition.bind(this);
        window.addEventListener('resize', this.onresize);
        if (this.enabled && !this.readonly) {
            EventHandler.add(this.element, 'click', this.elementClick, this);
            if (this.type === 'Range' && this.drag) {
                EventHandler.add(this.rangeBar, 'mousedown touchstart', this.rangeBarMousedown, this);
            }
            EventHandler.add(this.sliderContainer, 'keydown', this.keyDown, this);
            EventHandler.add(this.sliderContainer, 'keyup', this.keyUp, this);
            EventHandler.add(this.element, 'focusout', this.sliderFocusOut, this);
            EventHandler.add(this.sliderContainer, 'mouseover mouseout touchstart touchend', this.hover, this);
            this.wireFirstHandleEvt(false);
            if (this.type === 'Range') {
                this.wireSecondHandleEvt(false);
            }
            if (this.showButtons) {
                this.wireButtonEvt(false);
            }
            this.wireMaterialTooltipEvent(false);
            if (this.isForm) {
                EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
            }
        }
    };
    Slider.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.elementClick);
        if (this.type === 'Range' && this.drag) {
            EventHandler.remove(this.rangeBar, 'mousedown touchstart', this.rangeBarMousedown);
        }
        EventHandler.remove(this.sliderContainer, 'keydown', this.keyDown);
        EventHandler.remove(this.sliderContainer, 'keyup', this.keyUp);
        EventHandler.remove(this.element, 'focusout', this.sliderFocusOut);
        EventHandler.remove(this.sliderContainer, 'mouseover mouseout touchstart touchend', this.hover);
        this.wireFirstHandleEvt(true);
        if (this.type === 'Range') {
            this.wireSecondHandleEvt(true);
        }
        if (this.showButtons) {
            this.wireButtonEvt(true);
        }
        this.wireMaterialTooltipEvent(true);
        EventHandler.remove(this.element, 'reset', this.formResetHandler);
    };
    Slider.prototype.formResetHandler = function () {
        this.setProperties({ 'value': this.formResetValue }, true);
        this.setValue();
    };
    Slider.prototype.keyUp = function (event) {
        if (event.keyCode === 9 && event.target.classList.contains(classNames.sliderHandle)) {
            this.focusSliderElement();
            if (!event.target.classList.contains(classNames.sliderTabHandle)) {
                if (this.element.querySelector('.' + classNames.sliderTabHandle)) {
                    this.element.querySelector('.' + classNames.sliderTabHandle).classList.remove(classNames.sliderTabHandle);
                }
                event.target.classList.add(classNames.sliderTabHandle);
                var parentElement = event.target.parentElement;
                if (parentElement === this.element) {
                    parentElement.querySelector('.' + classNames.sliderTrack).classList.add(classNames.sliderTabTrack);
                    if (this.type === 'Range' || this.type === 'MinRange') {
                        parentElement.querySelector('.' + classNames.rangeBar).classList.add(classNames.sliderTabRange);
                    }
                }
                if (this.type === 'Range') {
                    var previousSibling = event.target.previousSibling;
                    if (previousSibling && previousSibling.classList.contains(classNames.sliderHandle)) {
                        this.activeHandle = 2;
                    }
                    else {
                        this.activeHandle = 1;
                    }
                }
                this.getHandle().focus();
                this.tooltipToggle(this.getHandle());
            }
        }
        this.closeTooltip();
        this.changeEvent('changed', event);
    };
    Slider.prototype.hover = function (event) {
        if (!isNullOrUndefined(event)) {
            if (event.type === 'mouseover' || event.type === 'touchmove' || event.type === 'mousemove' ||
                event.type === 'pointermove' || event.type === 'touchstart') {
                this.sliderContainer.classList.add(classNames.sliderHover);
            }
            else {
                this.sliderContainer.classList.remove(classNames.sliderHover);
                var curTarget = event.currentTarget;
                if (this.tooltip.isVisible && this.tooltip.showOn !== 'Always' && this.tooltipObj && this.isMaterialTooltip &&
                    !curTarget.classList.contains(classNames.sliderHandleFocused) &&
                    !curTarget.classList.contains(classNames.sliderTabHandle)) {
                    this.closeMaterialTooltip();
                }
            }
        }
    };
    Slider.prototype.sliderFocusOut = function (event) {
        if (event.relatedTarget !== this.secondHandle && event.relatedTarget !== this.firstHandle &&
            event.relatedTarget !== this.element && event.relatedTarget !== this.firstBtn && event.relatedTarget !== this.secondBtn) {
            this.closeMaterialTooltip();
            this.closeTooltip();
            if (this.element.querySelector('.' + classNames.sliderTabHandle)) {
                this.element.querySelector('.' + classNames.sliderTabHandle).classList.remove(classNames.sliderTabHandle);
            }
            if (this.element.querySelector('.' + classNames.sliderTabTrack)) {
                this.element.querySelector('.' + classNames.sliderTabTrack).classList.remove(classNames.sliderTabTrack);
                if ((this.type === 'Range' || this.type === 'MinRange') &&
                    this.element.querySelector('.' + classNames.sliderTabRange)) {
                    this.element.querySelector('.' + classNames.sliderTabRange).classList.remove(classNames.sliderTabRange);
                }
            }
            this.hiddenInput.focus();
            this.hiddenInput.blur();
            this.isElementFocused = false;
        }
    };
    Slider.prototype.removeElement = function (element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };
    Slider.prototype.changeSliderType = function (type, args) {
        if (this.isMaterialTooltip && this.materialHandle) {
            this.sliderContainer.classList.remove(classNames.materialSlider);
            this.removeElement(this.materialHandle);
            this.materialHandle = undefined;
        }
        this.removeElement(this.firstHandle);
        this.firstHandle = undefined;
        if (type !== 'Default') {
            if (type === 'Range') {
                this.removeElement(this.secondHandle);
                this.secondHandle = undefined;
            }
            this.removeElement(this.rangeBar);
            this.rangeBar = undefined;
        }
        if (this.tooltip.isVisible && !isNullOrUndefined(this.tooltipObj)) {
            this.tooltipObj.destroy();
            this.tooltipElement = undefined;
            this.tooltipCollidedPosition = undefined;
        }
        if (this.limits.enabled) {
            if (type === 'MinRange' || type === 'Default') {
                if (!isNullOrUndefined(this.limitBarFirst)) {
                    this.removeElement(this.limitBarFirst);
                    this.limitBarFirst = undefined;
                }
            }
            else {
                if (!isNullOrUndefined(this.limitBarSecond)) {
                    this.removeElement(this.limitBarSecond);
                    this.limitBarSecond = undefined;
                }
            }
        }
        this.activeHandle = 1;
        this.getThemeInitialization();
        if (this.type === 'Range') {
            this.rangeValueUpdate();
        }
        this.createRangeBar();
        if (this.limits.enabled) {
            this.createLimitBar();
        }
        this.setHandler();
        this.setOrientClass();
        this.wireFirstHandleEvt(!this.enabled);
        if (this.type === 'Range') {
            this.wireSecondHandleEvt(!this.enabled);
        }
        this.setValue();
        if (this.tooltip.isVisible) {
            this.renderTooltip();
            this.wireMaterialTooltipEvent(false);
        }
        this.setBarColor();
        if (args !== 'tooltip') {
            this.updateConfig();
        }
        if (this.readonly) {
            this.sliderContainer.classList.remove(classNames.readonly);
            this.setReadOnly();
        }
    };
    Slider.prototype.changeRtl = function () {
        if (!this.enableRtl && this.type === 'Range') {
            this.value = [this.handleVal2, this.handleVal1];
        }
        this.updateConfig();
        if (this.tooltip.isVisible) {
            this.tooltipObj.refresh(this.firstHandle);
        }
        if (this.showButtons) {
            var enabledRTL = this.enableRtl && this.orientation !== 'Vertical';
            attributes(enabledRTL ? this.secondBtn : this.firstBtn, { 'aria-label': 'Decrease', title: 'Decrease' });
            attributes(enabledRTL ? this.firstBtn : this.secondBtn, { 'aria-label': 'Increase', title: 'Increase' });
        }
    };
    Slider.prototype.changeOrientation = function () {
        this.changeSliderType(this.type, 'null');
    };
    Slider.prototype.updateConfig = function () {
        this.setEnableRTL();
        this.setValue();
        if (this.tooltip.isVisible) {
            this.refreshTooltip(this.tooltipTarget);
        }
        if (this.ticks.placement !== 'None') {
            if (this.ul) {
                this.removeElement(this.ul);
                this.ul = undefined;
                this.renderScale();
            }
        }
        this.limitsPropertyChange();
    };
    Slider.prototype.limitsPropertyChange = function () {
        if (this.limits.enabled) {
            if (isNullOrUndefined(this.limitBarFirst) && this.type !== 'Range') {
                this.createLimitBar();
            }
            if (isNullOrUndefined(this.limitBarFirst) && isNullOrUndefined(this.limitBarSecond) && this.type === 'Range') {
                this.createLimitBar();
            }
            this.setLimitBar();
            this.setValue();
        }
        else {
            if (!isNullOrUndefined(this.limitBarFirst)) {
                detach(this.limitBarFirst);
            }
            if (!isNullOrUndefined(this.limitBarSecond)) {
                detach(this.limitBarSecond);
            }
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string
     * @private
     */
    Slider.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    Slider.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unwireEvents();
        window.removeEventListener('resize', this.onresize);
        removeClass([this.sliderContainer], [classNames.sliderDisabled]);
        this.firstHandle.removeAttribute('aria-orientation');
        if (this.type === 'Range') {
            this.secondHandle.removeAttribute('aria-orientation');
        }
        if (this.sliderContainer.parentNode) {
            this.sliderContainer.parentNode.insertBefore(this.element, this.sliderContainer);
        }
        detach(this.sliderContainer);
        if (this.tooltip.isVisible) {
            this.tooltipObj.destroy();
        }
        this.element.innerHTML = '';
        this.hiddenInput = null;
        this.sliderContainer = null;
        this.sliderTrack = null;
        this.rangeBar = null;
        this.firstHandle = null;
        this.secondHandle = null;
        this.tickElementCollection = null;
        this.ul = null;
        this.firstBtn = null;
        this.secondBtn = null;
        this.materialHandle = null;
        this.tooltipObj = null;
        this.tooltipTarget = null;
        this.limitBarFirst = null;
        this.limitBarSecond = null;
        this.firstChild = null;
        this.lastChild = null;
        this.tooltipElement = null;
    };
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {SliderModel} newProp - Specifies the new properties
     * @param {SliderModel} oldProp - Specifies the old properties
     * @returns {void}
     * @private
     */
    Slider.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    this.setCSSClass(oldProp.cssClass);
                    break;
                case 'value':
                    if (newProp && oldProp) {
                        var value = isNullOrUndefined(newProp.value) ?
                            (this.type === 'Range' ? [this.min, this.max] : this.min) : newProp.value;
                        this.setProperties({ 'value': value }, true);
                        if (!isNullOrUndefined(oldProp.value) && oldProp.value.toString() !== value.toString()) {
                            this.setValue();
                            this.refreshTooltip(this.tooltipTarget);
                            if (this.type === 'Range') {
                                if (isNullOrUndefined(newProp.value) || oldProp.value[1] === value[1]) {
                                    this.activeHandle = 1;
                                }
                                else {
                                    this.activeHandle = 2;
                                }
                            }
                        }
                    }
                    break;
                case 'min':
                case 'step':
                case 'max':
                    this.setMinMaxValue();
                    break;
                case 'tooltip':
                    if (!isNullOrUndefined(newProp.tooltip) && !isNullOrUndefined(oldProp.tooltip)) {
                        this.initialTooltip = true;
                        this.setTooltip(prop);
                        if (!this.showButtons) {
                            this.wireEvents();
                        }
                    }
                    break;
                case 'type':
                    if (!isNullOrUndefined(oldProp) && Object.keys(oldProp).length
                        && !isNullOrUndefined(oldProp.type)) {
                        this.changeSliderType(oldProp.type, prop);
                        this.setZindex();
                    }
                    break;
                case 'enableRtl':
                    if (oldProp.enableRtl !== newProp.enableRtl && this.orientation !== 'Vertical') {
                        this.rtl = oldProp.enableRtl;
                        this.changeRtl();
                    }
                    break;
                case 'limits':
                    this.limitsPropertyChange();
                    break;
                case 'orientation':
                    this.changeOrientation();
                    break;
                case 'ticks':
                    if (!isNullOrUndefined(this.sliderContainer.querySelector('.' + classNames.scale))) {
                        detach(this.ul);
                        Array.prototype.forEach.call(this.sliderContainer.classList, function (className) {
                            if (className.match(/e-scale-/)) {
                                _this.sliderContainer.classList.remove(className);
                            }
                        });
                    }
                    if (this.ticks.placement !== 'None') {
                        this.renderScale();
                        this.setZindex();
                    }
                    break;
                case 'locale':
                    if (this.showButtons) {
                        this.buttonTitle();
                    }
                    break;
                case 'showButtons':
                    if (newProp.showButtons) {
                        this.setButtons();
                        this.reposition();
                        if (this.enabled && !this.readonly) {
                            this.wireButtonEvt(false);
                        }
                    }
                    else {
                        if (this.firstBtn && this.secondBtn) {
                            this.sliderContainer.removeChild(this.firstBtn);
                            this.sliderContainer.removeChild(this.secondBtn);
                            this.sliderContainer.classList.remove(classNames.sliderButtonClass);
                            this.firstBtn = undefined;
                            this.secondBtn = undefined;
                            this.reposition();
                        }
                    }
                    break;
                case 'enabled':
                    this.setEnabled();
                    break;
                case 'readonly':
                    this.setReadOnly();
                    break;
                case 'customValues':
                    this.setValue();
                    this.reposition();
                    break;
                case 'colorRange':
                    this.reposition();
                    break;
                case 'width':
                    this.setElementWidth(newProp.width);
                    this.setMinMaxValue();
                    if (this.limits) {
                        this.limitsPropertyChange();
                    }
                    break;
            }
        }
    };
    Slider.prototype.setReadOnly = function () {
        if (this.readonly) {
            this.unwireEvents();
            this.sliderContainer.classList.add(classNames.readonly);
        }
        else {
            this.wireEvents();
            this.sliderContainer.classList.remove(classNames.readonly);
        }
    };
    Slider.prototype.setMinMaxValue = function () {
        var _this = this;
        this.setValue();
        this.refreshTooltip(this.tooltipTarget);
        if (!isNullOrUndefined(this.sliderContainer.querySelector('.' + classNames.scale))) {
            if (this.ul) {
                detach(this.ul);
                Array.prototype.forEach.call(this.sliderContainer.classList, function (className) {
                    if (className.match(/e-scale-/)) {
                        _this.sliderContainer.classList.remove(className);
                    }
                });
            }
        }
        if (this.ticks.placement !== 'None') {
            this.renderScale();
            this.setZindex();
        }
    };
    Slider.prototype.setZindex = function () {
        this.zIndex = 6;
        if (!isNullOrUndefined(this.ticks) && this.ticks.placement !== 'None' && !isNullOrUndefined(this.ul) && !isNullOrUndefined(this.element)) {
            this.ul.style.zIndex = (this.zIndex + -7) + '';
            this.element.style.zIndex = (this.zIndex + 2) + '';
        }
        if (!this.isMaterial && !this.isMaterial3 && !isNullOrUndefined(this.ticks) && this.ticks.placement === 'Both') {
            this.element.style.zIndex = (this.zIndex + 2) + '';
        }
        if (!isNullOrUndefined(this.firstHandle)) {
            this.firstHandle.style.zIndex = (this.zIndex + 3) + '';
        }
        if (this.type === 'Range' && !isNullOrUndefined(this.secondHandle)) {
            this.secondHandle.style.zIndex = (this.zIndex + 4) + '';
        }
    };
    Slider.prototype.setTooltip = function (args) {
        this.changeSliderType(this.type, args);
    };
    Slider.prototype.setBarColor = function () {
        var trackPosition;
        var trackClassName;
        var child = this.sliderTrack.lastElementChild;
        while (child) {
            this.sliderTrack.removeChild(child);
            child = this.sliderTrack.lastElementChild;
        }
        for (var i = 0; i < this.colorRange.length; i++) {
            if (!isNullOrUndefined(this.colorRange[i].start) && !isNullOrUndefined(this.colorRange[i].end)) {
                if (this.colorRange[i].end > this.colorRange[i].start) {
                    if (this.colorRange[i].start < this.min) {
                        this.colorRange[i].start = this.min;
                    }
                    if (this.colorRange[i].end > this.max) {
                        this.colorRange[i].end = this.max;
                    }
                    var startingPosition = this.checkHandlePosition(this.colorRange[i].start);
                    var endPosition = this.checkHandlePosition(this.colorRange[i].end);
                    var trackContainer = this.createElement('div');
                    trackContainer.style.backgroundColor = this.colorRange[i].color;
                    trackContainer.style.border = '1px solid ' + this.colorRange[i].color;
                    if (this.orientation === 'Horizontal') {
                        trackClassName = classNames.sliderHorizantalColor;
                        if (this.enableRtl) {
                            if (isNullOrUndefined(this.customValues)) {
                                trackPosition =
                                    this.checkHandlePosition(this.max) - this.checkHandlePosition(this.colorRange[i].end);
                            }
                            else {
                                trackPosition = this.checkHandlePosition(this.customValues.length - this.colorRange[i].end - 1);
                            }
                        }
                        else {
                            trackPosition = this.checkHandlePosition(this.colorRange[i].start);
                        }
                        trackContainer.style.width = endPosition - startingPosition + 'px';
                        trackContainer.style.left = trackPosition + 'px';
                    }
                    else {
                        trackClassName = classNames.sliderVerticalColor;
                        trackPosition = this.checkHandlePosition(this.colorRange[i].start);
                        trackContainer.style.height = endPosition - startingPosition + 'px';
                        trackContainer.style.bottom = trackPosition + 'px';
                    }
                    trackContainer.classList.add(trackClassName);
                    this.sliderTrack.appendChild(trackContainer);
                }
            }
        }
    };
    /**
     * Gets the component name
     *
     * @returns {string} - Returns the string
     * @private
     */
    Slider.prototype.getModuleName = function () {
        return 'slider';
    };
    __decorate$2([
        Property(null)
    ], Slider.prototype, "value", void 0);
    __decorate$2([
        Property(null)
    ], Slider.prototype, "customValues", void 0);
    __decorate$2([
        Property(1)
    ], Slider.prototype, "step", void 0);
    __decorate$2([
        Property(null)
    ], Slider.prototype, "width", void 0);
    __decorate$2([
        Property(0)
    ], Slider.prototype, "min", void 0);
    __decorate$2([
        Property(100)
    ], Slider.prototype, "max", void 0);
    __decorate$2([
        Property(false)
    ], Slider.prototype, "readonly", void 0);
    __decorate$2([
        Property('Default')
    ], Slider.prototype, "type", void 0);
    __decorate$2([
        Collection([{}], ColorRangeData)
    ], Slider.prototype, "colorRange", void 0);
    __decorate$2([
        Complex({}, TicksData)
    ], Slider.prototype, "ticks", void 0);
    __decorate$2([
        Complex({}, LimitData)
    ], Slider.prototype, "limits", void 0);
    __decorate$2([
        Property(true)
    ], Slider.prototype, "enabled", void 0);
    __decorate$2([
        Complex({}, TooltipData)
    ], Slider.prototype, "tooltip", void 0);
    __decorate$2([
        Property(false)
    ], Slider.prototype, "showButtons", void 0);
    __decorate$2([
        Property(true)
    ], Slider.prototype, "enableAnimation", void 0);
    __decorate$2([
        Property('Horizontal')
    ], Slider.prototype, "orientation", void 0);
    __decorate$2([
        Property('')
    ], Slider.prototype, "cssClass", void 0);
    __decorate$2([
        Property(true)
    ], Slider.prototype, "enableHtmlSanitizer", void 0);
    __decorate$2([
        Event()
    ], Slider.prototype, "created", void 0);
    __decorate$2([
        Event()
    ], Slider.prototype, "change", void 0);
    __decorate$2([
        Event()
    ], Slider.prototype, "changed", void 0);
    __decorate$2([
        Event()
    ], Slider.prototype, "renderingTicks", void 0);
    __decorate$2([
        Event()
    ], Slider.prototype, "renderedTicks", void 0);
    __decorate$2([
        Event()
    ], Slider.prototype, "tooltipChange", void 0);
    Slider = __decorate$2([
        NotifyPropertyChanges
    ], Slider);
    return Slider;
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
/**
 * global declarations
 */
var regex = {
    /* eslint-disable no-useless-escape */
    EMAIL: new RegExp('^[A-Za-z0-9._%+-]{1,}@[A-Za-z0-9._%+-]{1,}([.]{1}[a-zA-Z0-9]{2,}' +
        '|[.]{1}[a-zA-Z0-9]{2,4}[.]{1}[a-zA-Z0-9]{2,4})$'),
    /* eslint-disable-next-line security/detect-unsafe-regex */
    URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/m,
    DATE_ISO: new RegExp('^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$'),
    DIGITS: new RegExp('^[0-9]*$'),
    PHONE: new RegExp('^[+]?[0-9]{9,13}$'),
    CREDITCARD: new RegExp('^\\d{13,16}$')
    /* eslint-enable no-useless-escape */
};
/**
 * ErrorOption values
 *
 * @private
 */
var ErrorOption;
(function (ErrorOption) {
    /**
     * Defines the error message.
     */
    ErrorOption[ErrorOption["Message"] = 0] = "Message";
    /**
     * Defines the error element type.
     */
    ErrorOption[ErrorOption["Label"] = 1] = "Label";
})(ErrorOption || (ErrorOption = {}));
/**
 * FormValidator class enables you to validate the form fields based on your defined rules
 * ```html
 * <form id='formId'>
 *  <input type='text' name='Name' />
 *  <input type='text' name='Age' />
 * </form>
 * <script>
 *   let formObject = new FormValidator('#formId', {
 *      rules: { Name: { required: true }, Age: { range: [18, 30] } };
 *   });
 *   formObject.validate();
 * </script>
 * ```
 */
var FormValidator = /** @class */ (function (_super) {
    __extends$3(FormValidator, _super);
    /**
     * Initializes the FormValidator.
     *
     * @param {string | HTMLFormElement} element - Specifies the element to render as component.
     * @param {FormValidatorModel} options - Specifies the FormValidator model.
     * @private
     */
    function FormValidator(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.validated = [];
        _this.errorRules = [];
        _this.allowSubmit = false;
        _this.required = 'required';
        _this.infoElement = null;
        _this.inputElement = null;
        _this.selectQuery = 'input:not([type=reset]):not([type=button]), select, textarea';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.localyMessage = {};
        /**
         * Specifies the default messages for validation rules.
         *
         * @default { List of validation message }
         */
        _this.defaultMessages = {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            url: 'Please enter a valid URL.',
            date: 'Please enter a valid date.',
            dateIso: 'Please enter a valid date ( ISO ).',
            creditcard: 'Please enter valid card number',
            number: 'Please enter a valid number.',
            digits: 'Please enter only digits.',
            maxLength: 'Please enter no more than {0} characters.',
            minLength: 'Please enter at least {0} characters.',
            rangeLength: 'Please enter a value between {0} and {1} characters long.',
            range: 'Please enter a value between {0} and {1}.',
            max: 'Please enter a value less than or equal to {0}.',
            min: 'Please enter a value greater than or equal to {0}.',
            regex: 'Please enter a correct value.',
            tel: 'Please enter a valid phone number.',
            pattern: 'Please enter a correct pattern value.',
            equalTo: 'Please enter the valid match text'
        };
        if (typeof _this.rules === 'undefined') {
            _this.rules = {};
        }
        _this.l10n = new L10n('formValidator', _this.defaultMessages, _this.locale);
        if (_this.locale) {
            _this.localeFunc();
        }
        onIntlChange.on('notifyExternalChange', _this.afterLocalization, _this);
        element = typeof element === 'string' ? select(element, document) : element;
        // Set novalidate to prevent default HTML5 form validation
        if (_this.element != null) {
            _this.element.setAttribute('novalidate', '');
            _this.inputElements = selectAll(_this.selectQuery, _this.element);
            _this.createHTML5Rules();
            _this.wireEvents();
        }
        else {
            return undefined;
        }
        return _this;
    }
    FormValidator_1 = FormValidator;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /**
     * Add validation rules to the corresponding input element based on `name` attribute.
     *
     * @param {string} name `name` of form field.
     * @param {Object} rules Validation rules for the corresponding element.
     * @returns {void}
     */
    FormValidator.prototype.addRules = function (name, rules) {
        if (name) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.rules.hasOwnProperty(name)) {
                extend(this.rules["" + name], rules, {});
            }
            else {
                this.rules["" + name] = rules;
            }
        }
    };
    /**
     * Remove validation to the corresponding field based on name attribute.
     * When no parameter is passed, remove all the validations in the form.
     *
     * @param {string} name Input name attribute value.
     * @param {string[]} rules List of validation rules need to be remove from the corresponding element.
     * @returns {void}
     */
    FormValidator.prototype.removeRules = function (name, rules) {
        if (!name && !rules) {
            this.rules = {};
        }
        else if (this.rules["" + name] && !rules) {
            delete this.rules["" + name];
        }
        else if (!isNullOrUndefined(this.rules["" + name] && rules)) {
            for (var i = 0; i < rules.length; i++) {
                delete this.rules["" + name][rules[parseInt(i.toString(), 10)]];
            }
        }
        else {
            return;
        }
    };
    /**
     * Validate the current form values using defined rules.
     * Returns `true` when the form is valid otherwise `false`
     *
     * @param {string} selected - Optional parameter to validate specified element.
     * @returns {boolean} - Returns form validation status.
     */
    FormValidator.prototype.validate = function (selected) {
        var rules = Object.keys(this.rules);
        if (selected && rules.length) {
            this.validateRules(selected);
            //filter the selected element it don't have any valid input element
            return rules.indexOf(selected) !== -1 && this.errorRules.filter(function (data) {
                return data.name === selected;
            }).length === 0;
        }
        else {
            this.errorRules = [];
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var name_1 = rules_1[_i];
                this.validateRules(name_1);
            }
            return this.errorRules.length === 0;
        }
    };
    /**
     * Reset the value of all the fields in form.
     *
     * @returns {void}
     */
    FormValidator.prototype.reset = function () {
        this.element.reset();
        this.clearForm();
    };
    /**
     * Get input element by name.
     *
     * @param {string} name - Input element name attribute value.
     * @returns {HTMLInputElement} - Returns the input element.
     */
    FormValidator.prototype.getInputElement = function (name) {
        this.inputElement = (select('[name="' + name + '"]', this.element));
        return this.inputElement;
    };
    /**
     * Destroy the form validator object and error elements.
     *
     * @returns {void}
     */
    FormValidator.prototype.destroy = function () {
        this.reset();
        this.unwireEvents();
        this.rules = {};
        var elements = selectAll('.' + this.errorClass + ', .' + this.validClass, this.element);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            detach(element);
        }
        _super.prototype.destroy.call(this);
        this.infoElement = null;
        onIntlChange.off('notifyExternalChange', this.afterLocalization);
    };
    /**
     * @param {FormValidatorModel} newProp - Returns the dynamic property value of the component.
     * @param {FormValidatorModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FormValidator.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'locale':
                    this.localeFunc();
                    break;
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormValidator.prototype.localeFunc = function () {
        for (var _i = 0, _a = Object.keys(this.defaultMessages); _i < _a.length; _i++) {
            var key = _a[_i];
            this.l10n.setLocale(this.locale);
            var value = this.l10n.getConstant(key);
            this.localyMessage["" + key] = value;
        }
    };
    /**
     * @private
     * @returns {string} - Returns the component name.
     */
    FormValidator.prototype.getModuleName = function () {
        return 'formvalidator';
    };
    /**
     * @param {any} args - Specifies the culture name.
     * @returns {void}
     * @private
     */
    FormValidator.prototype.afterLocalization = function (args) {
        this.locale = args.locale;
        this.localeFunc();
    };
    /**
     * Allows you to refresh the form validator base events to the elements inside the form.
     *
     * @returns {void}
     */
    FormValidator.prototype.refresh = function () {
        this.unwireEvents();
        this.inputElements = selectAll(this.selectQuery, this.element);
        this.wireEvents();
    };
    FormValidator.prototype.clearForm = function () {
        this.errorRules = [];
        this.validated = [];
        var elements = selectAll(this.selectQuery, this.element);
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            var input = element;
            input.removeAttribute('aria-invalid');
            var inputParent = input.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                (input.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                inputParent.classList.remove(this.errorClass);
            }
            else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                grandParent.classList.contains('e-wrapper'))) {
                grandParent.classList.remove(this.errorClass);
            }
            else {
                input.classList.remove(this.errorClass);
            }
            if (input.name.length > 0) {
                this.getInputElement(input.name);
                this.getErrorElement(input.name);
                this.hideMessage(input.name);
            }
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                (input.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                inputParent.classList.remove(this.validClass);
            }
            else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                grandParent.classList.contains('e-wrapper'))) {
                grandParent.classList.remove(this.validClass);
            }
            else {
                input.classList.remove(this.validClass);
            }
        }
    };
    FormValidator.prototype.createHTML5Rules = function () {
        var defRules = ['required', 'validateHidden', 'regex', 'rangeLength', 'maxLength', 'minLength', 'dateIso', 'digits',
            'pattern', 'data-val-required', 'type', 'data-validation', 'min', 'max', 'range', 'equalTo', 'data-val-minlength-min',
            'data-val-equalto-other', 'data-val-maxlength-max', 'data-val-range-min', 'data-val-regex-pattern', 'data-val-length-max',
            'data-val-creditcard', 'data-val-phone'];
        var acceptedTypes = ['hidden', 'email', 'url', 'date', 'number', 'tel'];
        for (var _i = 0, _a = (this.inputElements); _i < _a.length; _i++) {
            var input = _a[_i];
            // Default attribute rules
            var allRule = {};
            for (var _b = 0, defRules_1 = defRules; _b < defRules_1.length; _b++) {
                var rule = defRules_1[_b];
                if (input.getAttribute(rule) !== null) {
                    switch (rule) {
                        case 'required':
                            this.defRule(input, allRule, rule, input.required);
                            break;
                        case 'data-validation':
                            rule = input.getAttribute(rule);
                            this.defRule(input, allRule, rule, true);
                            break;
                        case 'type':
                            if (acceptedTypes.indexOf(input.type) !== -1) {
                                this.defRule(input, allRule, input.type, true);
                            }
                            break;
                        case 'rangeLength':
                        case 'range':
                            this.defRule(input, allRule, rule, JSON.parse(input.getAttribute(rule)));
                            break;
                        case 'equalTo':
                            {
                                var id = input.getAttribute(rule);
                                this.defRule(input, allRule, rule, id);
                            }
                            break;
                        default:
                            if (input.getAttribute('data-val') === 'true') {
                                this.annotationRule(input, allRule, rule, input.getAttribute(rule));
                            }
                            else {
                                this.defRule(input, allRule, rule, input.getAttribute(rule));
                            }
                    }
                }
            }
            //adding pattern type validation
            if (Object.keys(allRule).length !== 0) {
                this.addRules(input.name, allRule);
            }
        }
    };
    FormValidator.prototype.annotationRule = function (input, ruleCon, ruleName, value) {
        var annotationRule = ruleName.split('-');
        var rulesList = ['required', 'creditcard', 'phone', 'maxlength', 'minlength', 'range', 'regex', 'equalto'];
        var ruleFirstName = annotationRule[annotationRule.length - 1];
        var ruleSecondName = annotationRule[annotationRule.length - 2];
        if (rulesList.indexOf(ruleFirstName) !== -1) {
            switch (ruleFirstName) {
                case 'required':
                    this.defRule(input, ruleCon, 'required', value);
                    break;
                case 'creditcard':
                    this.defRule(input, ruleCon, 'creditcard', value);
                    break;
                case 'phone':
                    this.defRule(input, ruleCon, 'tel', value);
                    break;
            }
        }
        else if (rulesList.indexOf(ruleSecondName) !== -1) {
            switch (ruleSecondName) {
                case 'maxlength':
                    this.defRule(input, ruleCon, 'maxLength', value);
                    break;
                case 'minlength':
                    this.defRule(input, ruleCon, 'minLength', value);
                    break;
                case 'range':
                    {
                        var minvalue = input.getAttribute('data-val-range-min');
                        var maxvalue = input.getAttribute('data-val-range-max');
                        this.defRule(input, ruleCon, 'range', [minvalue, maxvalue]);
                    }
                    break;
                case 'equalto':
                    {
                        var id = input.getAttribute(ruleName).split('.');
                        this.defRule(input, ruleCon, 'equalTo', id[id.length - 1]);
                    }
                    break;
                case 'regex':
                    this.defRule(input, ruleCon, 'regex', value);
                    break;
            }
        }
    };
    FormValidator.prototype.defRule = function (input, ruleCon, ruleName, value) {
        var message = input.getAttribute('data-' + ruleName + '-message');
        var annotationMessage = input.getAttribute('data-val-' + ruleName);
        var customMessage;
        if (this.rules[input.name] && ruleName !== 'validateHidden' && ruleName !== 'hidden') {
            this.getInputElement(input.name);
            customMessage = this.getErrorMessage(this.rules[input.name]["" + ruleName], ruleName);
        }
        if (message) {
            value = [value, message];
        }
        else if (annotationMessage) {
            value = [value, annotationMessage];
        }
        else if (customMessage) {
            value = [value, customMessage];
        }
        ruleCon["" + ruleName] = value;
    };
    // Wire events to the form elements
    FormValidator.prototype.wireEvents = function () {
        for (var _i = 0, _a = (this.inputElements); _i < _a.length; _i++) {
            var input = _a[_i];
            if (FormValidator_1.isCheckable(input)) {
                EventHandler.add(input, 'click', this.clickHandler, this);
            }
            else if (input.tagName === 'SELECT') {
                EventHandler.add(input, 'change', this.changeHandler, this);
            }
            else {
                EventHandler.add(input, 'focusout', this.focusOutHandler, this);
                EventHandler.add(input, 'keyup', this.keyUpHandler, this);
            }
        }
        EventHandler.add(this.element, 'submit', this.submitHandler, this);
        EventHandler.add(this.element, 'reset', this.resetHandler, this);
    };
    // UnWire events to the form elements
    FormValidator.prototype.unwireEvents = function () {
        for (var _i = 0, _a = (this.inputElements); _i < _a.length; _i++) {
            var input = _a[_i];
            EventHandler.clearEvents(input);
        }
        EventHandler.remove(this.element, 'submit', this.submitHandler);
        EventHandler.remove(this.element, 'reset', this.resetHandler);
    };
    // Handle input element focusout event
    FormValidator.prototype.focusOutHandler = function (e) {
        this.trigger('focusout', e);
        //FormValidator.triggerCallback(this.focusout, e);
        var element = e.target;
        if (this.rules[element.name]) {
            if (this.rules[element.name][this.required] || element.value.length > 0) {
                this.validate(element.name);
            }
            else if (this.validated.indexOf(element.name) === -1) {
                this.validated.push(element.name);
            }
        }
    };
    // Handle input element keyup event
    FormValidator.prototype.keyUpHandler = function (e) {
        this.trigger('keyup', e);
        var element = e.target;
        // List of keys need to prevent while validation
        var excludeKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
        if (e.which === 9 && (!this.rules[element.name] || (this.rules[element.name] && !this.rules[element.name][this.required]))) {
            return;
        }
        if (this.validated.indexOf(element.name) !== -1 && this.rules[element.name] && excludeKeys.indexOf(e.which) === -1) {
            this.validate(element.name);
        }
    };
    // Handle input click event
    FormValidator.prototype.clickHandler = function (e) {
        this.trigger('click', e);
        var element = e.target;
        // If element type is not submit allow validation
        if (element.type !== 'submit') {
            this.validate(element.name);
        }
        else if (element.getAttribute('formnovalidate') !== null) {
            // Prevent form validation, if submit button has formnovalidate attribute
            this.allowSubmit = true;
        }
    };
    // Handle input change event
    FormValidator.prototype.changeHandler = function (e) {
        this.trigger('change', e);
        var element = e.target;
        this.validate(element.name);
    };
    // Handle form submit event
    FormValidator.prototype.submitHandler = function (e) {
        this.trigger('submit', e);
        //FormValidator.triggerCallback(this.submit, e);
        // Prevent form submit if validation failed
        if (!this.allowSubmit && !this.validate()) {
            e.preventDefault();
        }
        else {
            this.allowSubmit = false;
        }
    };
    // Handle form reset
    FormValidator.prototype.resetHandler = function () {
        this.clearForm();
    };
    // Validate each rule based on input element name
    FormValidator.prototype.validateRules = function (name) {
        if (!this.rules["" + name]) {
            return;
        }
        var rules = Object.keys(this.rules["" + name]);
        var hiddenType = false;
        var validateHiddenType = false;
        var vhPos = rules.indexOf('validateHidden');
        var hPos = rules.indexOf('hidden');
        this.getInputElement(name);
        if (hPos !== -1) {
            hiddenType = true;
        }
        if (vhPos !== -1) {
            validateHiddenType = true;
        }
        if (!hiddenType || (hiddenType && validateHiddenType)) {
            if (vhPos !== -1) {
                rules.splice(vhPos, 1);
            }
            if (hPos !== -1) {
                rules.splice((hPos - 1), 1);
            }
            this.getErrorElement(name);
            for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
                var rule = rules_2[_i];
                var errorMessage = this.getErrorMessage(this.rules["" + name]["" + rule], rule);
                var errorRule = { name: name, message: errorMessage };
                var eventArgs = {
                    inputName: name,
                    element: this.inputElement,
                    message: errorMessage
                };
                if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
                    this.removeErrorRules(name);
                    this.errorRules.push(errorRule);
                    // Set aria attributes to invalid elements
                    this.inputElement.setAttribute('aria-invalid', 'true');
                    this.inputElement.setAttribute('aria-describedby', this.inputElement.id + '-info');
                    var inputParent = this.inputElement.parentElement;
                    var grandParent = inputParent.parentElement;
                    if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                        (this.inputElement.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                        inputParent.classList.add(this.errorClass);
                        inputParent.classList.remove(this.validClass);
                    }
                    else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                        grandParent.classList.contains('e-wrapper'))) {
                        grandParent.classList.add(this.errorClass);
                        grandParent.classList.remove(this.validClass);
                    }
                    else {
                        this.inputElement.classList.add(this.errorClass);
                        this.inputElement.classList.remove(this.validClass);
                    }
                    if (!this.infoElement) {
                        this.createErrorElement(name, errorRule.message, this.inputElement);
                    }
                    else {
                        this.showMessage(errorRule);
                    }
                    eventArgs.errorElement = this.infoElement;
                    eventArgs.status = 'failure';
                    if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                        (this.inputElement.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                        inputParent.classList.add(this.errorClass);
                        inputParent.classList.remove(this.validClass);
                    }
                    else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                        grandParent.classList.contains('e-wrapper'))) {
                        grandParent.classList.add(this.errorClass);
                        grandParent.classList.remove(this.validClass);
                    }
                    else {
                        this.inputElement.classList.add(this.errorClass);
                        this.inputElement.classList.remove(this.validClass);
                    }
                    this.optionalValidationStatus(name, eventArgs);
                    this.trigger('validationComplete', eventArgs);
                    // Set aria-required to required rule elements
                    if (rule === 'required') {
                        this.inputElement.setAttribute('aria-required', 'true');
                    }
                    break;
                }
                else {
                    this.hideMessage(name);
                    eventArgs.status = 'success';
                    this.trigger('validationComplete', eventArgs);
                }
            }
        }
        else {
            return;
        }
    };
    // Update the optional validation status
    FormValidator.prototype.optionalValidationStatus = function (name, refer) {
        if (!this.rules["" + name][this.required] && !this.inputElement.value.length && !isNullOrUndefined(this.infoElement)) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            refer.status = '';
            this.hideMessage(name);
        }
    };
    // Check the input element whether it's value satisfy the validation rule or not
    FormValidator.prototype.isValid = function (name, rule) {
        var params = this.rules["" + name]["" + rule];
        var param = (params instanceof Array && typeof params[1] === 'string') ? params[0] : params;
        var currentRule = this.rules["" + name]["" + rule];
        var dateFormat = ((rule === 'min' || rule === 'max') && this.rules['' + name].date &&
            typeof (this.rules['' + name].date) === 'string') ? this.rules['' + name].date : null;
        var args = { value: this.inputElement.value,
            param: param, element: this.inputElement, formElement: this.element, format: dateFormat, culture: this.locale };
        this.trigger('validationBegin', args);
        if (!args.param && rule === 'required') {
            return true;
        }
        if (currentRule && typeof currentRule[0] === 'function') {
            var fn = currentRule[0];
            return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
        }
        else if (FormValidator_1.isCheckable(this.inputElement)) {
            if (rule !== 'required') {
                return true;
            }
            return selectAll('input[name="' + name + '"]:checked', this.element).length > 0;
        }
        else {
            return FormValidator_1.checkValidator["" + rule](args);
        }
    };
    // Return default error message or custom error message
    FormValidator.prototype.getErrorMessage = function (ruleValue, rule) {
        var message = this.inputElement.getAttribute('data-' + rule + '-message') ?
            this.inputElement.getAttribute('data-' + rule + '-message') :
            (ruleValue instanceof Array && typeof ruleValue[1] === 'string') ? ruleValue[1] :
                (Object.keys(this.localyMessage).length !== 0) ? this.localyMessage["" + rule] : this.defaultMessages["" + rule];
        var formats = message.match(/{(\d)}/g);
        if (!isNullOrUndefined(formats)) {
            for (var i = 0; i < formats.length; i++) {
                var value = ruleValue instanceof Array ? ruleValue[parseInt(i.toString(), 10)] : ruleValue;
                message = message.replace(formats[parseInt(i.toString(), 10)], value);
            }
        }
        return message;
    };
    // Create error element based on name and error message
    FormValidator.prototype.createErrorElement = function (name, message, input) {
        var errorElement = createElement(this.errorElement, {
            className: this.errorClass,
            innerHTML: message,
            attrs: { for: name }
        });
        // Create message design if errorOption is message
        if (this.errorOption === ErrorOption.Message) {
            errorElement.classList.remove(this.errorClass);
            errorElement.classList.add('e-message');
            errorElement = createElement(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
        }
        errorElement.id = this.inputElement.name + '-info';
        // Append error message into MVC error message element
        if (this.element.querySelector('[data-valmsg-for="' + input.id + '"]')) {
            this.element.querySelector('[data-valmsg-for="' + input.id + '"]').appendChild(errorElement);
        }
        else if (input.hasAttribute('data-msg-containerid') === true) {
            // Append error message into custom div element
            var containerId = input.getAttribute('data-msg-containerid');
            var divElement = select('#' + containerId, this.element);
            divElement.appendChild(errorElement);
        }
        else if (this.customPlacement != null) {
            // Call custom placement function if customPlacement is not null
            this.customPlacement.call(this, this.inputElement, errorElement);
        }
        else {
            var inputParent = this.inputElement.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper')) {
                grandParent.insertBefore(errorElement, inputParent.nextSibling);
            }
            else if (grandParent.classList.contains('e-control-wrapper') || grandParent.classList.contains('e-wrapper')) {
                grandParent.parentElement.insertBefore(errorElement, grandParent.nextSibling);
            }
            else {
                inputParent.insertBefore(errorElement, this.inputElement.nextSibling);
            }
        }
        errorElement.style.display = 'block';
        this.getErrorElement(name);
        this.validated.push(name);
        this.checkRequired(name);
    };
    // Get error element by name
    FormValidator.prototype.getErrorElement = function (name) {
        this.infoElement = select(this.errorElement + '.' + this.errorClass, this.inputElement.parentElement);
        if (!this.infoElement) {
            this.infoElement = select(this.errorElement + '.' + this.errorClass + '[for="' + name + '"]', this.element);
        }
        return this.infoElement;
    };
    // Remove existing rule from errorRules object
    FormValidator.prototype.removeErrorRules = function (name) {
        for (var i = 0; i < this.errorRules.length; i++) {
            var rule = this.errorRules[parseInt(i.toString(), 10)];
            if (rule.name === name) {
                this.errorRules.splice(i, 1);
            }
        }
    };
    // Show error message to the input element
    FormValidator.prototype.showMessage = function (errorRule) {
        this.infoElement.style.display = 'block';
        this.infoElement.innerHTML = errorRule.message;
        this.checkRequired(errorRule.name);
    };
    // Hide error message based on input name
    FormValidator.prototype.hideMessage = function (name) {
        if (this.infoElement) {
            this.infoElement.style.display = 'none';
            this.removeErrorRules(name);
            var inputParent = this.inputElement.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                (this.inputElement.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                inputParent.classList.add(this.validClass);
                inputParent.classList.remove(this.errorClass);
            }
            else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') || grandParent.classList.contains('e-wrapper'))) {
                grandParent.classList.add(this.validClass);
                grandParent.classList.remove(this.errorClass);
            }
            else {
                this.inputElement.classList.add(this.validClass);
                this.inputElement.classList.remove(this.errorClass);
            }
            this.inputElement.setAttribute('aria-invalid', 'false');
        }
    };
    // Check whether the input element have required rule and its value is not empty
    FormValidator.prototype.checkRequired = function (name) {
        if (!this.rules["" + name][this.required] && !this.inputElement.value.length && !isNullOrUndefined(this.infoElement)) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            this.hideMessage(name);
        }
    };
    // Return boolean result if the input have checkable or submit types
    FormValidator.isCheckable = function (input) {
        var inputType = input.getAttribute('type');
        return inputType && (inputType === 'checkbox' || inputType === 'radio' || inputType === 'submit');
    };
    var FormValidator_1;
    // List of function to validate the rules
    FormValidator.checkValidator = {
        required: function (option) {
            return !isNaN(Date.parse(option.value)) ? !isNaN(new Date(option.value).getTime()) : option.value.toString().length > 0;
        },
        email: function (option) {
            return regex.EMAIL.test(option.value);
        },
        url: function (option) {
            return regex.URL.test(option.value);
        },
        dateIso: function (option) {
            return regex.DATE_ISO.test(option.value);
        },
        tel: function (option) {
            return regex.PHONE.test(option.value);
        },
        creditcard: function (option) {
            return regex.CREDITCARD.test(option.value);
        },
        number: function (option) {
            return !isNaN(Number(option.value)) && String(option.value).indexOf(' ') === -1;
        },
        digits: function (option) {
            return regex.DIGITS.test(option.value);
        },
        maxLength: function (option) {
            return option.value.length <= Number(option.param);
        },
        minLength: function (option) {
            return option.value.length >= Number(option.param);
        },
        rangeLength: function (option) {
            var param = option.param;
            return option.value.length >= param[0] && option.value.length <= param[1];
        },
        range: function (option) {
            var param = option.param;
            return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
        },
        date: function (option) {
            if (!isNullOrUndefined(option.param) && (typeof (option.param) === 'string' && option.param !== '')) {
                var globalize = option.culture && option.culture !== '' ? new Internationalization(option.culture) : new Internationalization;
                var dateOptions = { format: option.param.toString(), type: 'dateTime', skeleton: 'yMd' };
                var dateValue = globalize.parseDate(option.value, dateOptions);
                return (!isNullOrUndefined(dateValue) && dateValue instanceof Date && !isNaN(+dateValue));
            }
            else {
                return !isNaN(new Date(option.value).getTime());
            }
        },
        max: function (option) {
            if (!isNaN(Number(option.value))) {
                // Maximum rule validation for number
                return +option.value <= +option.param;
            }
            // Maximum rule validation for date
            if (option.format && option.format !== '') {
                var globalize = option.culture && option.culture !== '' ? new Internationalization(option.culture) : new Internationalization;
                var dateOptions = { format: option.format.toString(), type: 'dateTime', skeleton: 'yMd' };
                var dateValue = globalize.parseDate(option.value, dateOptions);
                var maxValue = (typeof (option.param) === 'string') ? globalize.parseDate(JSON.parse(JSON.stringify(option.param)), dateOptions) : option.param;
                return new Date(dateValue).getTime() <= new Date(maxValue).getTime();
            }
            else {
                return new Date(option.value).getTime() <= new Date(JSON.parse(JSON.stringify(option.param))).getTime();
            }
        },
        min: function (option) {
            if (!isNaN(Number(option.value))) {
                // Minimum rule validation for number
                return +option.value >= +option.param;
            }
            else if ((option.value).indexOf(',') !== -1) {
                var uNum = (option.value).replace(/,/g, '');
                return parseFloat(uNum) >= Number(option.param); // Convert option.param to a number
            }
            else {
                // Minimum rule validation for date
                if (option.format && option.format !== '') {
                    var globalize = option.culture && option.culture !== '' ? new Internationalization(option.culture) : new Internationalization;
                    var dateOptions = { format: option.format.toString(), type: 'dateTime', skeleton: 'yMd' };
                    var dateValue = globalize.parseDate(option.value, dateOptions);
                    var minValue = (typeof (option.param) === 'string') ? globalize.parseDate(JSON.parse(JSON.stringify(option.param)), dateOptions) : option.param;
                    return new Date(dateValue).getTime() >= new Date(minValue).getTime();
                }
                else {
                    return new Date(option.value).getTime() >= new Date(JSON.parse(JSON.stringify(option.param))).getTime();
                }
            }
        },
        regex: function (option) {
            /* eslint-disable-next-line security/detect-non-literal-regexp */
            return new RegExp(option.param).test(option.value);
        },
        equalTo: function (option) {
            var compareTo = option.formElement.querySelector('#' + option.param);
            option.param = compareTo.value;
            return option.param === option.value;
        }
    };
    __decorate$3([
        Property('')
    ], FormValidator.prototype, "locale", void 0);
    __decorate$3([
        Property('e-hidden')
    ], FormValidator.prototype, "ignore", void 0);
    __decorate$3([
        Property()
    ], FormValidator.prototype, "rules", void 0);
    __decorate$3([
        Property('e-error')
    ], FormValidator.prototype, "errorClass", void 0);
    __decorate$3([
        Property('e-valid')
    ], FormValidator.prototype, "validClass", void 0);
    __decorate$3([
        Property('label')
    ], FormValidator.prototype, "errorElement", void 0);
    __decorate$3([
        Property('div')
    ], FormValidator.prototype, "errorContainer", void 0);
    __decorate$3([
        Property(ErrorOption.Label)
    ], FormValidator.prototype, "errorOption", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "focusout", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "keyup", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "click", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "change", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "submit", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "validationBegin", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "validationComplete", void 0);
    __decorate$3([
        Event()
    ], FormValidator.prototype, "customPlacement", void 0);
    FormValidator = FormValidator_1 = __decorate$3([
        NotifyPropertyChanges
    ], FormValidator);
    return FormValidator;
}(Base));

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
var CONTROL_WRAPPER = 'e-upload e-control-wrapper';
var INPUT_WRAPPER = 'e-file-select';
var DROP_AREA = 'e-file-drop';
var DROP_WRAPPER = 'e-file-select-wrap';
var LIST_PARENT = 'e-upload-files';
var FILE = 'e-upload-file-list';
var STATUS = 'e-file-status';
var ACTION_BUTTONS = 'e-upload-actions';
var UPLOAD_BUTTONS = 'e-file-upload-btn e-css e-btn e-flat e-primary';
var CLEAR_BUTTONS = 'e-file-clear-btn e-css e-btn e-flat';
var FILE_NAME = 'e-file-name';
var FILE_TYPE = 'e-file-type';
var FILE_SIZE = 'e-file-size';
var REMOVE_ICON = 'e-file-remove-btn';
var DELETE_ICON = 'e-file-delete-btn';
var SPINNER_PANE = 'e-spinner-pane';
var ABORT_ICON = 'e-file-abort-btn';
var RETRY_ICON = 'e-file-reload-btn';
var DRAG_HOVER = 'e-upload-drag-hover';
var PROGRESS_WRAPPER = 'e-upload-progress-wrap';
var PROGRESSBAR = 'e-upload-progress-bar';
var PROGRESSBAR_TEXT = 'e-progress-bar-text';
var UPLOAD_INPROGRESS = 'e-upload-progress';
var UPLOAD_SUCCESS = 'e-upload-success';
var UPLOAD_FAILED = 'e-upload-fails';
var TEXT_CONTAINER = 'e-file-container';
var VALIDATION_FAILS = 'e-validation-fails';
var RTL = 'e-rtl';
var DISABLED = 'e-disabled';
var RTL_CONTAINER = 'e-rtl-container';
var ICON_FOCUSED = 'e-clear-icon-focus';
var PROGRESS_INNER_WRAPPER = 'e-progress-inner-wrap';
var PAUSE_UPLOAD = 'e-file-pause-btn';
var RESUME_UPLOAD = 'e-file-play-btn';
var RESTRICT_RETRY = 'e-restrict-retry';
var wrapperAttr$1 = ['title', 'style', 'class'];
var FORM_UPLOAD = 'e-form-upload';
var HIDDEN_INPUT = 'e-hidden-file-input';
var INVALID_FILE = 'e-file-invalid';
var INFORMATION = 'e-file-information';
var FilesProp = /** @class */ (function (_super) {
    __extends$4(FilesProp, _super);
    function FilesProp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('')
    ], FilesProp.prototype, "name", void 0);
    __decorate$4([
        Property(null)
    ], FilesProp.prototype, "size", void 0);
    __decorate$4([
        Property('')
    ], FilesProp.prototype, "type", void 0);
    return FilesProp;
}(ChildProperty));
var ButtonsProps = /** @class */ (function (_super) {
    __extends$4(ButtonsProps, _super);
    function ButtonsProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('Browse...')
    ], ButtonsProps.prototype, "browse", void 0);
    __decorate$4([
        Property('Upload')
    ], ButtonsProps.prototype, "upload", void 0);
    __decorate$4([
        Property('Clear')
    ], ButtonsProps.prototype, "clear", void 0);
    return ButtonsProps;
}(ChildProperty));
var AsyncSettings = /** @class */ (function (_super) {
    __extends$4(AsyncSettings, _super);
    function AsyncSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property('')
    ], AsyncSettings.prototype, "saveUrl", void 0);
    __decorate$4([
        Property('')
    ], AsyncSettings.prototype, "removeUrl", void 0);
    __decorate$4([
        Property(0)
    ], AsyncSettings.prototype, "chunkSize", void 0);
    __decorate$4([
        Property(3)
    ], AsyncSettings.prototype, "retryCount", void 0);
    __decorate$4([
        Property(500)
    ], AsyncSettings.prototype, "retryAfterDelay", void 0);
    return AsyncSettings;
}(ChildProperty));
/**
 * The uploader component allows to upload images, documents, and other files from local to server.
 * ```html
 * <input type='file' name='images[]' id='upload'/>
 * ```
 * ```typescript
 * <script>
 *   var uploadObj = new Uploader();
 *   uploadObj.appendTo('#upload');
 * </script>
 * ```
 */
var Uploader = /** @class */ (function (_super) {
    __extends$4(Uploader, _super);
    /**
     * Triggers when change the Uploader value.
     *
     * @param {UploaderModel} options - Specifies the Uploader model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function Uploader(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.initialAttr = { accept: null, multiple: false, disabled: false };
        _this.uploadedFilesData = [];
        _this.base64String = [];
        _this.isForm = false;
        _this.allTypes = false;
        _this.pausedData = [];
        _this.uploadMetaData = [];
        _this.tabIndex = '0';
        _this.btnTabIndex = '0';
        _this.disableKeyboardNavigation = false;
        _this.count = -1;
        _this.actionCompleteCount = 0;
        _this.flag = true;
        _this.selectedFiles = [];
        _this.uploaderName = 'UploadFiles';
        _this.fileStreams = [];
        _this.newFileRef = 0;
        _this.isFirstFileOnSelection = false;
        _this.dragCounter = 0;
        /**
         * Get the file item(li) which are shown in file list.
         *
         * @private
         */
        _this.fileList = [];
        /**
         * Get the data of files which are shown in file list.
         *
         * @private
         */
        _this.filesData = [];
        _this.uploaderOptions = options;
        return _this;
    }
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {UploaderModel} newProp - Returns the dynamic property value of the component.
     * @param {UploaderModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    Uploader.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowedExtensions':
                    this.setExtensions(this.allowedExtensions);
                    this.clearAll();
                    break;
                case 'enabled':
                    this.setControlStatus();
                    break;
                case 'multiple':
                    this.setMultipleSelection();
                    break;
                case 'enableRtl':
                    this.setRTL();
                    this.reRenderFileList();
                    break;
                case 'buttons':
                    this.buttons.browse = isNullOrUndefined(this.buttons.browse) ? '' : this.buttons.browse;
                    this.buttons.clear = isNullOrUndefined(this.buttons.clear) ? '' : this.buttons.clear;
                    this.buttons.upload = isNullOrUndefined(this.buttons.upload) ? '' : this.buttons.upload;
                    this.renderButtonTemplates();
                    break;
                case 'dropArea':
                    this.unBindDropEvents();
                    this.updateDropArea();
                    break;
                case 'htmlAttributes':
                    this.updateHTMLAttrToElement();
                    this.updateHTMLAttrToWrapper();
                    this.checkHTMLAttributes(true);
                    break;
                case 'files':
                    this.renderPreLoadFiles();
                    break;
                case 'directoryUpload':
                    this.updateDirectoryAttributes();
                    break;
                case 'template':
                    if (this.isReact) {
                        this.reRenderFileList();
                    }
                    else {
                        this.clearAll();
                    }
                    break;
                case 'minFileSize':
                case 'maxFileSize':
                case 'autoUpload':
                    this.clearAll();
                    break;
                case 'sequentialUpload':
                    this.clearAll();
                    break;
                case 'locale':
                    this.l10n.setLocale(this.locale);
                    this.setLocalizedTexts();
                    this.preLocaleObj = getValue('currentLocale', this.l10n);
                    break;
                case 'cssClass':
                    this.setCSSClass(oldProp.cssClass);
                    break;
            }
        }
    };
    Uploader.prototype.setLocalizedTexts = function () {
        if (isNullOrUndefined(this.template)) {
            if (typeof (this.buttons.browse) === 'string') {
                this.browseButton.innerText = (this.buttons.browse === 'Browse...') ?
                    this.localizedTexts('Browse') : this.buttons.browse;
                this.browseButton.setAttribute('title', this.browseButton.innerText);
                if (this.uploadWrapper && !isNullOrUndefined(this.uploadWrapper.querySelector('.' + DROP_AREA))) {
                    this.uploadWrapper.querySelector('.' + DROP_AREA).innerHTML = this.localizedTexts('dropFilesHint');
                }
            }
            this.updateFileList();
        }
    };
    Uploader.prototype.getKeyValue = function (val) {
        var keyValue;
        for (var _i = 0, _a = Object.keys(this.preLocaleObj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.preLocaleObj["" + key] === val) {
                keyValue = key;
            }
        }
        return keyValue;
    };
    Uploader.prototype.updateFileList = function () {
        var element;
        /* istanbul ignore next */
        if (this.fileList.length > 0 && !isNullOrUndefined(this.uploadWrapper.querySelector('.' + LIST_PARENT))) {
            for (var i = 0; i < this.fileList.length; i++) {
                element = this.fileList[i].querySelector('.e-file-status');
                element.innerHTML = this.localizedTexts(this.getKeyValue(this.filesData[i].status));
                this.filesData[i].status = this.localizedTexts(this.getKeyValue(this.filesData[i].status));
                if (this.fileList[i].classList.contains(UPLOAD_SUCCESS)) {
                    this.fileList[i].querySelector('.e-icons').setAttribute('title', this.localizedTexts('delete'));
                }
                if (this.fileList[i].querySelector('.e-file-play-btn')) {
                    this.fileList[i].querySelector('.e-icons').setAttribute('title', this.localizedTexts('resume'));
                }
                if (this.fileList[i].querySelector('.e-file-remove-btn')) {
                    this.fileList[i].querySelector('.e-icons').setAttribute('title', this.localizedTexts('remove'));
                }
                if (this.fileList[i].querySelector('.e-file-reload-btn')) {
                    this.fileList[i].querySelector('.e-icons').setAttribute('title', this.localizedTexts('retry'));
                }
                if (!this.autoUpload) {
                    this.uploadButton.innerText = (this.buttons.upload === 'Upload') ?
                        this.localizedTexts('Upload') : this.buttons.upload;
                    this.uploadButton.setAttribute('title', this.localizedTexts('Upload'));
                    this.clearButton.innerText = (this.buttons.clear === 'Clear') ?
                        this.localizedTexts('Clear') : this.buttons.clear;
                    this.clearButton.setAttribute('title', this.localizedTexts('Clear'));
                }
            }
        }
    };
    Uploader.prototype.reRenderFileList = function () {
        if (this.listParent) {
            detach(this.listParent);
            this.listParent = null;
            this.fileList = [];
            this.internalCreateFileList(this.filesData);
            if (this.actionButtons) {
                this.removeActionButtons();
                this.renderActionButtons();
                this.checkActionButtonStatus();
            }
        }
    };
    Uploader.prototype.preRender = function () {
        this.localeText = { Browse: 'Browse...', Clear: 'Clear', Upload: 'Upload', invalidFileName: 'File Name is not allowed',
            dropFilesHint: 'Or drop files here', invalidMaxFileSize: 'File size is too large',
            invalidMinFileSize: 'File size is too small', invalidFileType: 'File type is not allowed',
            uploadFailedMessage: 'File failed to upload', uploadSuccessMessage: 'File uploaded successfully',
            removedSuccessMessage: 'File removed successfully', removedFailedMessage: 'Unable to remove file', inProgress: 'Uploading',
            readyToUploadMessage: 'Ready to upload', abort: 'Abort', remove: 'Remove', cancel: 'Cancel', delete: 'Delete file',
            pauseUpload: 'File upload paused', pause: 'Pause', resume: 'Resume', retry: 'Retry',
            fileUploadCancel: 'File upload canceled', invalidFileSelection: 'Invalid files selected', totalFiles: 'Total files',
            size: 'Size'
        };
        this.l10n = new L10n('uploader', this.localeText, this.locale);
        this.preLocaleObj = getValue('currentLocale', this.l10n);
        this.formRendered();
        this.updateHTMLAttrToElement();
        this.checkHTMLAttributes(false);
        var ejInstance = getValue('ej2_instances', this.element);
        /* istanbul ignore next */
        if (this.element.tagName === 'EJS-UPLOADER') {
            var inputElement = this.createElement('input', { attrs: { type: 'file' } });
            var index = 0;
            for (index; index < this.element.attributes.length; index++) {
                if (this.element.attributes[index].nodeName !== 'id') {
                    inputElement.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
                }
                else if (this.element.attributes[index].nodeName === 'id') {
                    inputElement.setAttribute(this.element.attributes[index].nodeName, getUniqueID('uploader'));
                }
                inputElement.innerHTML = this.element.innerHTML;
            }
            if (!inputElement.hasAttribute('name')) {
                inputElement.setAttribute('name', 'UploadFiles');
            }
            this.element.appendChild(inputElement);
            this.element = inputElement;
            setValue('ej2_instances', ejInstance, this.element);
        }
        /* istanbul ignore next */
        if (ejInstance[0].isPureReactComponent) {
            if (!isNullOrUndefined(ejInstance[0].props.name)) {
                this.element.setAttribute('name', ejInstance[0].props.name);
            }
            else if (!isNullOrUndefined(ejInstance[0].props.id) && isNullOrUndefined(ejInstance[0].props.name)) {
                this.element.setAttribute('name', ejInstance[0].props.id);
            }
            else {
                this.element.setAttribute('name', 'UploadFiles');
            }
        }
        if (isNullOrUndefined(this.element.getAttribute('name'))) {
            this.element.setAttribute('name', this.element.getAttribute('id'));
        }
        if (!this.element.hasAttribute('type')) {
            this.element.setAttribute('type', 'file');
        }
        this.updateDirectoryAttributes();
        this.keyConfigs = {
            enter: 'enter'
        };
        if (this.element.hasAttribute('tabindex')) {
            this.tabIndex = this.element.getAttribute('tabindex');
        }
        this.browserName = Browser.info.name;
        this.uploaderName = this.element.getAttribute('name');
    };
    Uploader.prototype.formRendered = function () {
        var parentEle = closest(this.element, 'form');
        if (!isNullOrUndefined(parentEle)) {
            for (; parentEle && parentEle !== document.documentElement; parentEle = parentEle.parentElement) {
                if (parentEle.tagName === 'FORM') {
                    this.isForm = true;
                    this.formElement = parentEle;
                    parentEle.setAttribute('enctype', 'multipart/form-data');
                    parentEle.setAttribute('encoding', 'multipart/form-data');
                }
            }
        }
    };
    Uploader.prototype.getPersistData = function () {
        return this.addOnPersist(['filesData']);
    };
    /**
     * Return the module name of the component.
     *
     * @returns {string} Returns the component name.
     */
    Uploader.prototype.getModuleName = function () {
        return 'uploader';
    };
    Uploader.prototype.updateDirectoryAttributes = function () {
        if (this.directoryUpload) {
            this.element.setAttribute('directory', 'true');
            this.element.setAttribute('webkitdirectory', 'true');
        }
        else {
            this.element.removeAttribute('directory');
            this.element.removeAttribute('webkitdirectory');
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    Uploader.prototype.render = function () {
        this.renderBrowseButton();
        this.initializeUpload();
        this.updateHTMLAttrToWrapper();
        this.wireEvents();
        this.setMultipleSelection();
        this.setExtensions(this.allowedExtensions);
        this.setRTL();
        this.renderPreLoadFiles();
        this.setControlStatus();
        this.setCSSClass();
    };
    Uploader.prototype.renderBrowseButton = function () {
        this.browseButton = this.createElement('button', { className: 'e-css e-btn', attrs: { 'type': 'button' } });
        this.browseButton.setAttribute('tabindex', this.tabIndex);
        if (typeof (this.buttons.browse) === 'string') {
            this.browseButton.textContent = (this.buttons.browse === 'Browse...') ?
                this.localizedTexts('Browse') : this.buttons.browse;
            this.browseButton.setAttribute('title', this.browseButton.innerText);
        }
        else {
            this.browseButton.appendChild(this.buttons.browse);
        }
        this.element.setAttribute('aria-label', 'Uploader');
    };
    Uploader.prototype.renderActionButtons = function () {
        this.element.setAttribute('tabindex', '-1');
        this.actionButtons = this.createElement('div', { className: ACTION_BUTTONS });
        this.uploadButton = this.createElement('button', { className: UPLOAD_BUTTONS,
            attrs: { 'type': 'button', 'tabindex': this.btnTabIndex, 'aria-label': this.localizedTexts('Upload') } });
        this.clearButton = this.createElement('button', { className: CLEAR_BUTTONS,
            attrs: { 'type': 'button', 'tabindex': this.btnTabIndex, 'aria-label': this.localizedTexts('Clear') } });
        this.actionButtons.appendChild(this.clearButton);
        this.actionButtons.appendChild(this.uploadButton);
        this.renderButtonTemplates();
        this.uploadWrapper.appendChild(this.actionButtons);
        this.browseButton.blur();
        if (!this.isPreloadFiles) {
            this.uploadButton.focus();
        }
        this.wireActionButtonEvents();
    };
    /* istanbul ignore next */
    Uploader.prototype.serverActionButtonsEventBind = function (element) {
        if (element && !this.isForm) {
            this.browseButton.blur();
            this.actionButtons = element;
            this.uploadButton = this.actionButtons.querySelector('.e-file-upload-btn');
            this.clearButton = this.actionButtons.querySelector('.e-file-clear-btn');
            this.uploadButton.focus();
            this.unwireActionButtonEvents();
            this.wireActionButtonEvents();
            this.checkActionButtonStatus();
        }
    };
    Uploader.prototype.wireActionButtonEvents = function () {
        EventHandler.add(this.uploadButton, 'click', this.uploadButtonClick, this);
        EventHandler.add(this.clearButton, 'click', this.clearButtonClick, this);
    };
    Uploader.prototype.unwireActionButtonEvents = function () {
        EventHandler.remove(this.uploadButton, 'click', this.uploadButtonClick);
        EventHandler.remove(this.clearButton, 'click', this.clearButtonClick);
    };
    Uploader.prototype.removeActionButtons = function () {
        if (this.actionButtons) {
            this.unwireActionButtonEvents();
            detach(this.actionButtons);
            this.actionButtons = null;
        }
    };
    Uploader.prototype.renderButtonTemplates = function () {
        if (typeof (this.buttons.browse) === 'string') {
            this.browseButton.textContent = (this.buttons.browse === 'Browse...') ?
                this.localizedTexts('Browse') : this.buttons.browse;
            this.browseButton.setAttribute('title', this.browseButton.textContent);
        }
        else {
            this.browseButton.innerHTML = '';
            this.browseButton.appendChild(this.buttons.browse);
        }
        if (this.uploadButton) {
            var uploadText = isNullOrUndefined(this.buttons.upload) ? 'Upload' : this.buttons.upload;
            this.buttons.upload = uploadText;
            if (typeof (this.buttons.upload) === 'string') {
                this.uploadButton.textContent = (this.buttons.upload === 'Upload') ?
                    this.localizedTexts('Upload') : this.buttons.upload;
                this.uploadButton.setAttribute('title', this.uploadButton.textContent);
            }
            else {
                this.uploadButton.innerHTML = '';
                this.uploadButton.appendChild(this.buttons.upload);
            }
        }
        if (this.clearButton) {
            var clearText = isNullOrUndefined(this.buttons.clear) ? 'Clear' : this.buttons.clear;
            this.buttons.clear = clearText;
            if (typeof (this.buttons.clear) === 'string') {
                this.clearButton.textContent = (this.buttons.clear === 'Clear') ?
                    this.localizedTexts('Clear') : this.buttons.clear;
                this.clearButton.setAttribute('title', this.clearButton.textContent);
            }
            else {
                this.clearButton.innerHTML = '';
                this.clearButton.appendChild(this.buttons.clear);
            }
        }
    };
    Uploader.prototype.initializeUpload = function () {
        this.element.setAttribute('tabindex', '-1');
        var inputWrapper = this.createElement('span', { className: INPUT_WRAPPER });
        this.element.parentElement.insertBefore(inputWrapper, this.element);
        this.dropAreaWrapper = this.createElement('div', { className: DROP_WRAPPER });
        this.element.parentElement.insertBefore(this.dropAreaWrapper, this.element);
        inputWrapper.appendChild(this.element);
        this.dropAreaWrapper.appendChild(this.browseButton);
        this.dropAreaWrapper.appendChild(inputWrapper);
        this.uploadWrapper = this.createElement('div', { className: CONTROL_WRAPPER });
        this.dropAreaWrapper.parentElement.insertBefore(this.uploadWrapper, this.dropAreaWrapper);
        this.uploadWrapper.appendChild(this.dropAreaWrapper);
        this.setDropArea();
    };
    Uploader.prototype.renderPreLoadFiles = function () {
        if (this.files.length) {
            if (this.enablePersistence && this.filesData.length) {
                this.internalCreateFileList(this.filesData);
                return;
            }
            if (isNullOrUndefined(this.files[0].size)) {
                return;
            }
            this.isPreloadFiles = true;
            var files = [].slice.call(this.files);
            var filesData = [];
            if (!this.multiple) {
                this.clearData();
                files = [files[0]];
            }
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var data = files_1[_i];
                var fileData = {
                    name: data.name + '.' + data.type.split('.')[data.type.split('.').length - 1],
                    rawFile: '',
                    size: data.size,
                    status: this.localizedTexts('uploadSuccessMessage'),
                    type: data.type,
                    validationMessages: { minSize: '', maxSize: '' },
                    statusCode: '2'
                };
                filesData.push(fileData);
                this.filesData.push(fileData);
            }
            this.internalCreateFileList(filesData);
            if (!this.autoUpload && this.listParent && !this.actionButtons && (!this.isForm || this.allowUpload()) && this.showFileList) {
                this.renderActionButtons();
            }
            this.checkActionButtonStatus();
            if (this.sequentialUpload) {
                this.count = this.filesData.length - 1;
            }
            this.isPreloadFiles = false;
        }
    };
    Uploader.prototype.checkActionButtonStatus = function () {
        if (this.actionButtons) {
            var length_1 = this.uploadWrapper.querySelectorAll('.' + VALIDATION_FAILS).length +
                this.uploadWrapper.querySelectorAll('.e-upload-fails:not(.e-upload-progress)').length +
                this.uploadWrapper.querySelectorAll('span.' + UPLOAD_SUCCESS).length +
                this.uploadWrapper.querySelectorAll('span.' + UPLOAD_INPROGRESS).length;
            if (length_1 > 0 && length_1 === this.uploadWrapper.querySelectorAll('li').length) {
                this.uploadButton.setAttribute('disabled', 'disabled');
            }
            else {
                this.uploadButton.removeAttribute('disabled');
            }
        }
    };
    Uploader.prototype.setDropArea = function () {
        var dropTextArea = this.dropAreaWrapper.querySelector('.e-file-drop');
        if (this.dropArea) {
            this.dropZoneElement = (typeof (this.dropArea) !== 'string') ? this.dropArea :
                select(this.dropArea, document);
            var element = this.element;
            var enableDropText = false;
            while (element.parentNode) {
                element = element.parentNode;
                if (element === this.dropZoneElement) {
                    enableDropText = true;
                    if (!dropTextArea) {
                        this.createDropTextHint();
                    }
                    else {
                        dropTextArea.innerHTML = this.localizedTexts('dropFilesHint');
                    }
                }
            }
            if (!enableDropText && dropTextArea) {
                remove(dropTextArea);
            }
        }
        else if (!isNullOrUndefined(this.uploaderOptions) && this.uploaderOptions.dropArea === undefined) {
            this.createDropTextHint();
            this.dropZoneElement = this.uploadWrapper;
            this.setProperties({ dropArea: this.uploadWrapper }, true);
        }
        this.bindDropEvents();
    };
    Uploader.prototype.updateDropArea = function () {
        if (this.dropArea) {
            this.setDropArea();
        }
        else {
            this.dropZoneElement = null;
            var dropTextArea = this.dropAreaWrapper.querySelector('.e-file-drop');
            if (dropTextArea) {
                remove(dropTextArea);
            }
        }
    };
    Uploader.prototype.createDropTextHint = function () {
        var fileDropArea = this.createElement('span', { className: DROP_AREA });
        fileDropArea.innerHTML = this.localizedTexts('dropFilesHint');
        this.dropAreaWrapper.appendChild(fileDropArea);
    };
    Uploader.prototype.updateHTMLAttrToElement = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var pro = _a[_i];
                if (wrapperAttr$1.indexOf(pro) < 0) {
                    this.element.setAttribute(pro, this.htmlAttributes["" + pro]);
                }
            }
        }
    };
    Uploader.prototype.updateHTMLAttrToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var pro = _a[_i];
                if (wrapperAttr$1.indexOf(pro) > -1) {
                    if (pro === 'class') {
                        var updatedClassValues = (this.htmlAttributes["" + pro].replace(/\s+/g, ' ')).trim();
                        if (updatedClassValues !== '') {
                            addClass([this.uploadWrapper], updatedClassValues.split(' '));
                        }
                    }
                    else if (pro === 'style') {
                        var uploadStyle = this.uploadWrapper.getAttribute(pro);
                        uploadStyle = !isNullOrUndefined(uploadStyle) ? (uploadStyle + this.htmlAttributes["" + pro]) :
                            this.htmlAttributes["" + pro];
                        this.uploadWrapper.setAttribute(pro, uploadStyle);
                    }
                    else {
                        this.uploadWrapper.setAttribute(pro, this.htmlAttributes["" + pro]);
                    }
                }
            }
        }
    };
    Uploader.prototype.setMultipleSelection = function () {
        if (this.multiple && !this.element.hasAttribute('multiple')) {
            var newAttr = document.createAttribute('multiple');
            newAttr.value = 'multiple';
            this.element.setAttributeNode(newAttr);
        }
        else if (!this.multiple) {
            this.element.removeAttribute('multiple');
        }
    };
    Uploader.prototype.checkAutoUpload = function (fileData) {
        if (this.autoUpload) {
            if (this.sequentialUpload) {
                /* istanbul ignore next */
                this.sequenceUpload(fileData);
            }
            else {
                this.upload(fileData);
            }
            this.removeActionButtons();
        }
        else if (!this.actionButtons) {
            this.renderActionButtons();
        }
        this.checkActionButtonStatus();
    };
    Uploader.prototype.sequenceUpload = function (fileData) {
        if (this.filesData.length - fileData.length === 0 ||
            this.filesData[(this.filesData.length - fileData.length - 1)].statusCode !== '1') {
            if (this.multiple || this.count < 0) {
                ++this.count;
            }
            var isFileListCreated = this.showFileList ? false : true;
            if (typeof this.filesData[this.count] === 'object') {
                this.isFirstFileOnSelection = false;
                this.upload(this.filesData[this.count], isFileListCreated);
                if (this.filesData[this.count].statusCode === '0') {
                    this.sequenceUpload(fileData);
                }
            }
            else {
                --this.count;
            }
        }
    };
    Uploader.prototype.setCSSClass = function (oldCSSClass) {
        var updatedOldCssClass = oldCSSClass;
        if (!isNullOrUndefined(oldCSSClass)) {
            updatedOldCssClass = (oldCSSClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(oldCSSClass) && updatedOldCssClass !== '') {
            removeClass([this.uploadWrapper], updatedOldCssClass.split(' '));
        }
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(this.cssClass) && updatedCssClassValue !== '') {
            addClass([this.uploadWrapper], updatedCssClassValue.split(updatedCssClassValue.indexOf(',') > -1 ? ',' : ' '));
        }
    };
    Uploader.prototype.wireEvents = function () {
        EventHandler.add(this.browseButton, 'click', this.browseButtonClick, this);
        EventHandler.add(this.element, 'change', this.onSelectFiles, this);
        EventHandler.add(document, 'click', this.removeFocus, this);
        this.keyboardModule = new KeyboardEvents(this.uploadWrapper, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        if (this.isForm) {
            EventHandler.add(this.formElement, 'reset', this.resetForm, this);
        }
    };
    Uploader.prototype.unWireEvents = function () {
        EventHandler.remove(this.browseButton, 'click', this.browseButtonClick);
        EventHandler.remove(this.element, 'change', this.onSelectFiles);
        EventHandler.remove(document, 'click', this.removeFocus);
        if (this.isForm) {
            EventHandler.remove(this.formElement, 'reset', this.resetForm);
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
    };
    Uploader.prototype.resetForm = function () {
        this.clearAll();
    };
    Uploader.prototype.keyActionHandler = function (e) {
        var targetElement = e.target;
        switch (e.action) {
            case 'enter':
                if (e.target === this.clearButton) {
                    this.clearButtonClick();
                }
                else if (e.target === this.uploadButton) {
                    this.uploadButtonClick();
                }
                else if (e.target === this.browseButton) {
                    this.browseButtonClick();
                }
                else if (targetElement.classList.contains(PAUSE_UPLOAD)) {
                    var metaData = this.getCurrentMetaData(null, e);
                    metaData.file.statusCode = '4';
                    metaData.file.status = this.localizedTexts('pauseUpload');
                    this.abortUpload(metaData, false);
                }
                else if (targetElement.classList.contains(RESUME_UPLOAD)) {
                    this.resumeUpload(this.getCurrentMetaData(null, e), e);
                }
                else if (targetElement.classList.contains(RETRY_ICON)) {
                    var metaData = this.getCurrentMetaData(null, e);
                    if (!isNullOrUndefined(metaData)) {
                        metaData.file.statusCode = '1';
                        metaData.file.status = this.localizedTexts('readyToUploadMessage');
                        this.chunkUpload(metaData.file);
                    }
                    else {
                        var target = e.target.parentElement;
                        var fileData = this.filesData[this.fileList.indexOf(target)];
                        this.retry(fileData);
                    }
                }
                else {
                    this.removeFiles(e);
                    if (!targetElement.classList.contains(ABORT_ICON)) {
                        this.browseButton.focus();
                    }
                }
                e.preventDefault();
                e.stopPropagation();
                break;
        }
    };
    Uploader.prototype.getCurrentMetaData = function (fileInfo, e) {
        var fileData;
        var targetMetaData;
        if (isNullOrUndefined(fileInfo)) {
            var target = e.target.parentElement;
            fileData = this.filesData[this.fileList.indexOf(target)];
        }
        else {
            fileData = fileInfo;
        }
        for (var i = 0; i < this.uploadMetaData.length; i++) {
            if (this.uploadMetaData[i].file.name === fileData.name) {
                targetMetaData = this.uploadMetaData[i];
            }
        }
        return targetMetaData;
    };
    Uploader.prototype.removeFocus = function () {
        if (this.uploadWrapper && this.listParent && this.listParent.querySelector('.' + ICON_FOCUSED)) {
            document.activeElement.blur();
            this.listParent.querySelector('.' + ICON_FOCUSED).classList.remove(ICON_FOCUSED);
        }
    };
    Uploader.prototype.browseButtonClick = function () {
        this.element.click();
    };
    Uploader.prototype.uploadButtonClick = function () {
        if (this.sequentialUpload) {
            this.sequenceUpload(this.filesData);
        }
        else {
            this.upload(this.filesData);
        }
    };
    Uploader.prototype.clearButtonClick = function () {
        this.clearAll();
        /* istanbul ignore next */
        if (this.sequentialUpload) {
            this.count = -1;
        }
        this.actionCompleteCount = 0;
    };
    Uploader.prototype.bindDropEvents = function () {
        if (this.dropZoneElement) {
            EventHandler.add(this.dropZoneElement, 'drop', this.dropElement, this);
            EventHandler.add(this.dropZoneElement, 'dragover', this.dragHover, this);
            EventHandler.add(this.dropZoneElement, 'dragleave', this.onDragLeave, this);
            EventHandler.add(this.dropZoneElement, 'paste', this.onPasteFile, this);
            EventHandler.add(this.dropZoneElement, 'dragenter', this.onDragEnter, this);
        }
    };
    Uploader.prototype.unBindDropEvents = function () {
        if (this.dropZoneElement) {
            EventHandler.remove(this.dropZoneElement, 'drop', this.dropElement);
            EventHandler.remove(this.dropZoneElement, 'dragover', this.dragHover);
            EventHandler.remove(this.dropZoneElement, 'dragleave', this.onDragLeave);
            EventHandler.remove(this.dropZoneElement, 'dragenter', this.onDragEnter);
        }
    };
    Uploader.prototype.onDragEnter = function (e) {
        if (!this.enabled) {
            return;
        }
        this.dropZoneElement.classList.add(DRAG_HOVER);
        this.dragCounter = this.dragCounter + 1;
        e.preventDefault();
        e.stopPropagation();
    };
    Uploader.prototype.onDragLeave = function () {
        if (!this.enabled) {
            return;
        }
        this.dragCounter = this.dragCounter - 1;
        if (!this.dragCounter) {
            this.dropZoneElement.classList.remove(DRAG_HOVER);
        }
    };
    Uploader.prototype.dragHover = function (e) {
        if (!this.enabled) {
            return;
        }
        if (this.dropEffect !== 'Default') {
            e.dataTransfer.dropEffect = this.dropEffect.toLowerCase();
        }
        e.preventDefault();
        e.stopPropagation();
    };
    /* istanbul ignore next */
    Uploader.prototype.dropElement = function (e) {
        this.dragCounter = 0;
        this.dropZoneElement.classList.remove(DRAG_HOVER);
        this.onSelectFiles(e);
        e.preventDefault();
        e.stopPropagation();
    };
    /* istanbul ignore next */
    Uploader.prototype.onPasteFile = function (event) {
        var item = event.clipboardData.items;
        if (event.type === 'paste' && this.browserName !== 'msie' && this.browserName !== 'edge' && this.browserName !== 'safari') {
            this.element.files = event.clipboardData.files;
        }
        if (item.length !== 1 && !this.multiple) {
            return;
        }
        for (var file = 0; file < item.length; file++) {
            var pasteFile = [].slice.call(item)[file];
            if (!isNullOrUndefined(pasteFile.getAsFile()) && ((pasteFile.kind === 'file') || pasteFile.type.match('^image/'))) {
                this.renderSelectedFiles(event, [pasteFile.getAsFile()], false, true);
            }
        }
    };
    Uploader.prototype.getSelectedFiles = function (index) {
        var data = [];
        var liElement = this.fileList[index];
        var allFiles = this.getFilesData();
        var nameElements = +liElement.getAttribute('data-files-count');
        var startIndex = 0;
        for (var i = 0; i < index; i++) {
            startIndex += (+this.fileList[i].getAttribute('data-files-count'));
        }
        for (var j = startIndex; j < (startIndex + nameElements); j++) {
            data.push(allFiles[j]);
        }
        return data;
    };
    Uploader.prototype.removeFiles = function (args) {
        if (!this.enabled) {
            return;
        }
        var selectedElement = args.target.parentElement;
        var index = this.fileList.indexOf(selectedElement);
        var liElement = this.fileList[index];
        var formUpload = this.isFormUpload();
        var fileData = formUpload ? this.getSelectedFiles(index) : this.getFilesInArray(this.filesData[index]);
        if (isNullOrUndefined(fileData)) {
            return;
        }
        if (args.target.classList.contains(ABORT_ICON) && !formUpload) {
            fileData[0].statusCode = '5';
            if (!isNullOrUndefined(liElement)) {
                var spinnerTarget = liElement.querySelector('.' + ABORT_ICON);
                createSpinner({ target: spinnerTarget, width: '20px' });
                showSpinner(spinnerTarget);
            }
            if (this.sequentialUpload) {
                /* istanbul ignore next */
                this.uploadSequential();
            }
            if (!(liElement.classList.contains(RESTRICT_RETRY))) {
                this.checkActionComplete(true);
            }
        }
        else if (!closest(args.target, '.' + SPINNER_PANE)) {
            this.remove(fileData, false, false, true, args);
        }
        if (this.isForm && liElement && liElement.classList.contains(INVALID_FILE)) {
            this.element.value = '';
        }
        this.checkActionButtonStatus();
        if (this.actionButtons && this.clearButton && this.uploadWrapper) {
            var progressBarElements = this.uploadWrapper.querySelectorAll('.e-upload-progress-bar.e-upload-progress:not(.e-upload-success):not(.e-upload-fails)');
            if (progressBarElements.length === 1 && selectedElement.contains(progressBarElements[0])
                && this.clearButton.hasAttribute('disabled')) {
                this.clearButton.removeAttribute('disabled');
            }
        }
    };
    Uploader.prototype.removeFilesData = function (file, customTemplate) {
        var index;
        if (customTemplate) {
            if (!this.showFileList) {
                index = this.filesData.indexOf(file);
                this.filesData.splice(index, 1);
            }
            return;
        }
        var selectedElement = this.getLiElement(file);
        if (isNullOrUndefined(selectedElement)) {
            return;
        }
        this.element.value = '';
        detach(selectedElement);
        index = this.fileList.indexOf(selectedElement);
        this.fileList.splice(index, 1);
        this.filesData.splice(index, 1);
        if (this.fileList.length === 0 && !isNullOrUndefined(this.listParent)) {
            detach(this.listParent);
            this.listParent = null;
            this.removeActionButtons();
        }
        if (this.sequentialUpload) {
            /* istanbul ignore next */
            if (index <= this.count) {
                --this.count;
            }
        }
    };
    Uploader.prototype.removeUploadedFile = function (file, eventArgs, removeDirectly, custom) {
        var _this = this;
        var selectedFiles = file;
        var ajax = new Ajax(this.asyncSettings.removeUrl, 'POST', true, null);
        ajax.emitError = false;
        var formData = new FormData();
        ajax.beforeSend = function (e) {
            eventArgs.currentRequest = ajax.httpRequest;
            if (!removeDirectly) {
                _this.trigger('removing', eventArgs, function (eventArgs) {
                    if (eventArgs.cancel) {
                        e.cancel = true;
                    }
                    else {
                        _this.removingEventCallback(eventArgs, formData, selectedFiles, file);
                    }
                });
            }
            else {
                _this.removingEventCallback(eventArgs, formData, selectedFiles, file);
            }
        };
        ajax.onLoad = function (e) {
            _this.removeCompleted(e, selectedFiles, custom);
            return {};
        };
        /* istanbul ignore next */
        ajax.onError = function (e) {
            _this.removeFailed(e, selectedFiles, custom);
            return {};
        };
        ajax.send(formData);
    };
    Uploader.prototype.removingEventCallback = function (eventArgs, formData, selectedFiles, file) {
        /* istanbul ignore next */
        var name = this.element.getAttribute('name');
        var liElement = this.getLiElement(file);
        if (!isNullOrUndefined(liElement) && (!isNullOrUndefined(liElement.querySelector('.' + DELETE_ICON)) ||
            !isNullOrUndefined(liElement.querySelector('.' + REMOVE_ICON)))) {
            var spinnerTarget = liElement.querySelector('.' + DELETE_ICON) ?
                liElement.querySelector('.' + DELETE_ICON) :
                liElement.querySelector('.' + REMOVE_ICON);
            createSpinner({ target: spinnerTarget, width: '20px' });
            showSpinner(spinnerTarget);
        }
        if (eventArgs.postRawFile && !isNullOrUndefined(selectedFiles.rawFile) && selectedFiles.rawFile !== '') {
            formData.append(name, selectedFiles.rawFile, selectedFiles.name);
        }
        else {
            formData.append(name, selectedFiles.name);
        }
        this.updateFormData(formData, eventArgs.customFormData);
    };
    /* istanbul ignore next */
    Uploader.prototype.updateFormData = function (formData, customData) {
        if (customData.length > 0 && customData[0]) {
            var _loop_1 = function (i) {
                var data = customData[i];
                // eslint-disable-next-line @typescript-eslint/tslint/config
                var value = Object.keys(data).map(function (e) {
                    return data["" + e];
                });
                formData.append(Object.keys(data)[0], value);
            };
            for (var i = 0; i < customData.length; i++) {
                _loop_1(i);
            }
        }
    };
    /* istanbul ignore next */
    Uploader.prototype.updateCustomheader = function (request, currentRequest) {
        if (currentRequest.length > 0 && currentRequest[0]) {
            var _loop_2 = function (i) {
                var data = currentRequest[i];
                // eslint-disable-next-line @typescript-eslint/tslint/config
                var value = Object.keys(data).map(function (e) {
                    return data["" + e];
                });
                request.setRequestHeader(Object.keys(data)[0], value);
            };
            for (var i = 0; i < currentRequest.length; i++) {
                _loop_2(i);
            }
        }
    };
    Uploader.prototype.removeCompleted = function (e, files, customTemplate) {
        var response = e && e.currentTarget ? this.getResponse(e) : null;
        var status = e.target;
        if (status.readyState === 4 && status.status >= 200 && status.status <= 299) {
            var args = {
                e: e, response: response, operation: 'remove', file: this.updateStatus(files, this.localizedTexts('removedSuccessMessage'), '2')
            };
            this.trigger('success', args);
            this.removeFilesData(files, customTemplate);
            var index = this.uploadedFilesData.indexOf(files);
            this.uploadedFilesData.splice(index, 1);
            this.trigger('change', { files: this.uploadedFilesData });
        }
        else {
            this.removeFailed(e, files, customTemplate);
        }
    };
    Uploader.prototype.removeFailed = function (e, files, customTemplate) {
        var response = e && e.currentTarget ? this.getResponse(e) : null;
        var args = {
            e: e, response: response, operation: 'remove', file: this.updateStatus(files, this.localizedTexts('removedFailedMessage'), '0')
        };
        if (!customTemplate) {
            var index = this.filesData.indexOf(files);
            var rootElement = this.fileList[index];
            if (rootElement) {
                rootElement.classList.remove(UPLOAD_SUCCESS);
                rootElement.classList.add(UPLOAD_FAILED);
                var statusElement = rootElement.querySelector('.' + STATUS);
                if (statusElement) {
                    statusElement.classList.remove(UPLOAD_SUCCESS);
                    statusElement.classList.add(UPLOAD_FAILED);
                }
            }
            this.checkActionButtonStatus();
        }
        this.trigger('failure', args);
        var liElement = this.getLiElement(files);
        /* istanbul ignore next */
        if (!isNullOrUndefined(liElement) && !isNullOrUndefined(liElement.querySelector('.' + DELETE_ICON))) {
            var spinnerTarget = liElement.querySelector('.' + DELETE_ICON);
            hideSpinner(spinnerTarget);
            detach(liElement.querySelector('.e-spinner-pane'));
        }
    };
    /* istanbul ignore next */
    Uploader.prototype.getFilesFromFolder = function (event) {
        this.filesEntries = [];
        var items = this.multiple ?
            event.dataTransfer.items : [event.dataTransfer.items[0]];
        var validDirectoryUpload = this.checkDirectoryUpload(items);
        if (!validDirectoryUpload) {
            return;
        }
        var _loop_3 = function (i) {
            var item = items[i].webkitGetAsEntry();
            if (item.isFile) {
                var files_2 = [];
                (item).file(function (fileObj) {
                    var path = item.fullPath;
                    files_2.push({ 'path': path, 'file': fileObj });
                });
                this_1.renderSelectedFiles(event, files_2, true);
            }
            else if (item.isDirectory) {
                this_1.traverseFileTree(item, event);
            }
        };
        var this_1 = this;
        for (var i = 0; i < items.length; i++) {
            _loop_3(i);
        }
    };
    /* istanbul ignore next */
    Uploader.prototype.checkDirectoryUpload = function (items) {
        for (var i = 0; items && i < items.length; i++) {
            var item = items[i].webkitGetAsEntry();
            if (item.isDirectory) {
                return true;
            }
        }
        return false;
    };
    /* istanbul ignore next */
    Uploader.prototype.traverseFileTree = function (item, event) {
        if (item.isFile) {
            this.filesEntries.push(item);
        }
        else if (item.isDirectory) {
            var directoryReader = item.createReader();
            this.readFileFromDirectory(directoryReader, event);
        }
    };
    /* istanbul ignore next */
    Uploader.prototype.readFileFromDirectory = function (directoryReader, event) {
        var _this = this;
        directoryReader.readEntries(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                _this.traverseFileTree(entries[i], event);
            }
            _this.pushFilesEntries(event);
            if (entries.length) {
                _this.readFileFromDirectory(directoryReader);
            }
        });
    };
    Uploader.prototype.pushFilesEntries = function (event) {
        var _this = this;
        var files = [];
        var _loop_4 = function (i) {
            this_2.filesEntries[i].file(function (fileObj) {
                if (_this.filesEntries.length) {
                    var path = _this.filesEntries[i].fullPath;
                    files.push({ 'path': path, 'file': fileObj });
                    if (i === _this.filesEntries.length - 1) {
                        _this.filesEntries = [];
                        _this.renderSelectedFiles(event, files, true);
                    }
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < this.filesEntries.length; i++) {
            _loop_4(i);
        }
    };
    Uploader.prototype.onSelectFiles = function (args) {
        if (!this.enabled) {
            return;
        }
        var targetFiles;
        /* istanbul ignore next */
        if (args.type === 'drop') {
            if (this.directoryUpload) {
                this.getFilesFromFolder(args);
            }
            else {
                var files = this.sortFilesList = args.dataTransfer.files;
                if (this.browserName !== 'msie' && this.browserName !== 'edge' && this.browserName !== 'safari') {
                    this.element.files = files;
                }
                if (files.length > 0) {
                    targetFiles = this.multiple ? this.sortFileList(files) : [files[0]];
                    this.renderSelectedFiles(args, targetFiles);
                }
            }
        }
        else {
            targetFiles = [].slice.call(args.target.files);
            this.renderSelectedFiles(args, targetFiles);
        }
        if (this.isAngular || this.isReact) {
            args.stopPropagation();
        }
    };
    /* istanbul ignore next */
    Uploader.prototype.getBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function () { return resolve(fileReader.result); };
            fileReader.onerror = function (error) { return reject(error); };
        });
    };
    /* istanbul ignore next */
    /* tslint:ignore */
    Uploader.prototype.renderSelectedFiles = function (args, targetFiles, directory, paste) {
        var _this = this;
        this.base64String = [];
        var eventArgs = {
            event: args,
            cancel: false,
            filesData: [],
            isModified: false,
            modifiedFilesData: [],
            progressInterval: '',
            isCanceled: false,
            currentRequest: null,
            customFormData: null
        };
        /* istanbul ignore next */
        if (targetFiles.length < 1) {
            eventArgs.isCanceled = true;
            this.trigger('selected', eventArgs);
            return;
        }
        this.flag = true;
        var fileData = [];
        if (!this.multiple) {
            this.clearData(true);
            this.actionCompleteCount = 0;
            targetFiles = [targetFiles[0]];
        }
        for (var i = 0; i < targetFiles.length; i++) {
            var file = directory ? targetFiles[i].file : targetFiles[i];
            this.updateInitialFileDetails(args, targetFiles, file, i, fileData, directory, paste);
        }
        eventArgs.filesData = fileData;
        if (!isNullOrUndefined(this.allowedExtensions) && this.allowedExtensions.indexOf('*') > -1) {
            this.allTypes = true;
        }
        if (this.enableHtmlSanitizer) {
            for (var i = 0; i < fileData.length; i++) {
                var sanitizeFile = SanitizeHtmlHelper.beforeSanitize();
                var sanitizeFileName = SanitizeHtmlHelper.serializeValue(sanitizeFile, fileData[parseInt(i.toString(), 10)].name);
                var currentFileName = fileData[parseInt(i.toString(), 10)].name;
                var isUTF8 = false;
                for (var i_1 = 0; i_1 < currentFileName.length; i_1++) {
                    if (currentFileName.charCodeAt(i_1) > 127) {
                        isUTF8 = true;
                        break;
                    }
                }
                var htmlTagRegex = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
                var hasHTMLString = htmlTagRegex.test(currentFileName);
                if ((sanitizeFileName !== fileData[parseInt(i.toString(), 10)].name) && !(isUTF8 && !hasHTMLString)) {
                    var encodedFileName = targetFiles[parseInt(i.toString(), 10)].name.replace(/[\u00A0-\u9999<>\\&]/g, function (i) {
                        return '&#' + i.charCodeAt(0) + ';';
                    });
                    fileData[parseInt(i.toString(), 10)].name = encodedFileName;
                    fileData[parseInt(i.toString(), 10)].status = this.localizedTexts('invalidFileName');
                    fileData[parseInt(i.toString(), 10)].statusCode = '0';
                }
            }
        }
        if (!this.allTypes) {
            fileData = this.checkExtension(fileData);
        }
        this.trigger('selected', eventArgs, function (eventArgs) {
            _this._internalRenderSelect(eventArgs, fileData);
        });
    };
    Uploader.prototype.updateInitialFileDetails = function (args, targetFiles, file, i, fileData, directory, paste) {
        var fileName = directory ? targetFiles[i].path.substring(1, targetFiles[i].path.length) : paste ?
            getUniqueID(file.name.substring(0, file.name.lastIndexOf('.'))) + '.' + this.getFileType(file.name) :
            this.directoryUpload ? targetFiles[i].webkitRelativePath : file.name;
        var fileDetails = {
            name: fileName,
            rawFile: file,
            size: file.size,
            status: this.localizedTexts('readyToUploadMessage'),
            type: this.getFileType(file.name),
            validationMessages: this.validatedFileSize(file.size),
            statusCode: '1',
            id: getUniqueID(file.name.substring(0, file.name.lastIndexOf('.'))) + '.' + this.getFileType(file.name)
        };
        /* istanbul ignore next */
        if (paste) {
            fileDetails.fileSource = 'paste';
        }
        fileDetails.status = fileDetails.validationMessages.minSize !== '' ? this.localizedTexts('invalidMinFileSize') :
            fileDetails.validationMessages.maxSize !== '' ? this.localizedTexts('invalidMaxFileSize') : fileDetails.status;
        if (fileDetails.validationMessages.minSize !== '' || fileDetails.validationMessages.maxSize !== '') {
            fileDetails.statusCode = '0';
            this.checkActionComplete(true);
        }
        fileData.push(fileDetails);
    };
    Uploader.prototype._internalRenderSelect = function (eventArgs, fileData) {
        if (!eventArgs.cancel) {
            /* istanbul ignore next */
            this.selectedFiles = this.selectedFiles.concat(fileData);
            this.btnTabIndex = this.disableKeyboardNavigation ? '-1' : '0';
            if (this.showFileList) {
                if (eventArgs.isModified && eventArgs.modifiedFilesData.length > 0) {
                    for (var j = 0; j < eventArgs.modifiedFilesData.length; j++) {
                        for (var k = 0; k < fileData.length; k++) {
                            if (eventArgs.modifiedFilesData[j].id === fileData[k].id) {
                                eventArgs.modifiedFilesData[j].rawFile = fileData[k].rawFile;
                            }
                        }
                    }
                    var dataFiles = this.allTypes ? eventArgs.modifiedFilesData :
                        this.checkExtension(eventArgs.modifiedFilesData);
                    this.updateSortedFileList(dataFiles);
                    this.filesData = this.filesData.concat(dataFiles);
                    if (!this.isForm || this.allowUpload()) {
                        this.checkAutoUpload(dataFiles);
                    }
                }
                else {
                    this.internalCreateFileList(fileData);
                    if (this.autoUpload && this.sequenceUpload && this.sequentialUpload && this.filesData.length > 0 && this.filesData[this.filesData.length - 1].statusCode !== '2' && this.filesData[this.filesData.length - 1].statusCode !== '0') {
                        this.filesData = this.filesData.concat(fileData);
                        return;
                    }
                    this.filesData = this.filesData.concat(fileData);
                    if (!this.isForm || this.allowUpload()) {
                        this.checkAutoUpload(fileData);
                    }
                }
                if (!isNullOrUndefined(eventArgs.progressInterval) && eventArgs.progressInterval !== '') {
                    this.progressInterval = eventArgs.progressInterval;
                }
            }
            else {
                this.filesData = this.filesData.concat(fileData);
                if (this.autoUpload) {
                    this.upload(this.filesData, true);
                }
            }
            this.raiseActionComplete();
            this.isFirstFileOnSelection = true;
        }
    };
    Uploader.prototype.allowUpload = function () {
        var allowFormUpload = false;
        if (this.isForm && (!isNullOrUndefined(this.asyncSettings.saveUrl) && this.asyncSettings.saveUrl !== '')) {
            allowFormUpload = true;
        }
        return allowFormUpload;
    };
    Uploader.prototype.isFormUpload = function () {
        var isFormUpload = false;
        if (this.isForm && ((isNullOrUndefined(this.asyncSettings.saveUrl) || this.asyncSettings.saveUrl === '')
            && (isNullOrUndefined(this.asyncSettings.removeUrl) || this.asyncSettings.removeUrl === ''))) {
            isFormUpload = true;
        }
        return isFormUpload;
    };
    Uploader.prototype.clearData = function (singleUpload) {
        if (!isNullOrUndefined(this.listParent)) {
            detach(this.listParent);
            this.listParent = null;
        }
        if (this.browserName !== 'msie' && !singleUpload) {
            this.element.value = '';
        }
        this.fileList = [];
        this.filesData = [];
        this.removeActionButtons();
    };
    Uploader.prototype.updateSortedFileList = function (filesData) {
        var previousListClone = this.createElement('div', { id: 'clonewrapper' });
        var added = -1;
        if (this.listParent) {
            for (var i = 0; i < this.listParent.querySelectorAll('li').length; i++) {
                var liElement = this.listParent.querySelectorAll('li')[i];
                previousListClone.appendChild(liElement.cloneNode(true));
            }
            this.removeActionButtons();
            var oldList = [].slice.call(previousListClone.childNodes);
            this.createParentUL();
            for (var index = 0; index < filesData.length; index++) {
                for (var j = 0; j < this.filesData.length; j++) {
                    if (this.filesData[j].name === filesData[index].name) {
                        this.listParent.appendChild(oldList[j]);
                        EventHandler.add(oldList[j].querySelector('.e-icons'), 'click', this.removeFiles, this);
                        this.fileList.push(oldList[j]);
                        added = index;
                    }
                }
                if (added !== index) {
                    this.internalCreateFileList([filesData[index]]);
                }
            }
        }
        else {
            this.internalCreateFileList(filesData);
        }
    };
    Uploader.prototype.isBlank = function (str) {
        return (!str || /^\s*$/.test(str));
    };
    Uploader.prototype.checkGenericExtension = function (genericType, fileExtension) {
        var validExtensions = [];
        switch (genericType.toLowerCase()) {
            case 'image/*':
                validExtensions.push('jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'heic');
                break;
            case 'audio/*':
                validExtensions.push('mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a');
                break;
            case 'video/*':
                validExtensions.push('mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'webm', 'mpeg');
                break;
            case 'application/*':
                validExtensions.push('doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z', 'tar', 'pdf');
                break;
            case 'text/*':
                validExtensions.push('txt', 'csv', 'html', 'css', 'js', 'json', 'xml', 'md');
                break;
        }
        return validExtensions.includes(fileExtension.toLowerCase());
    };
    Uploader.prototype.checkExtension = function (files) {
        var dropFiles = files;
        if (!this.isBlank(this.allowedExtensions)) {
            var allowedExtensions = [];
            var extensions = !isNullOrUndefined(allowedExtensions) ? this.allowedExtensions.split(',') : [''];
            for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
                var extension = extensions_1[_i];
                allowedExtensions.push(extension.trim().toLocaleLowerCase());
            }
            for (var i = 0; i < files.length; i++) {
                var checkFileType = files[i].type.indexOf('.') !== -1 ?
                    files[i].type.replace('.', '') : files[i].type;
                if (allowedExtensions[0].indexOf('/*') !== -1) {
                    var isValidExtension = this.checkGenericExtension(allowedExtensions[0], checkFileType);
                    if (!isValidExtension) {
                        files[i].status = this.localizedTexts('invalidFileType');
                        files[i].statusCode = '0';
                    }
                }
                else if ((allowedExtensions.indexOf(('.' + checkFileType).toLocaleLowerCase()) === -1)) {
                    files[i].status = this.localizedTexts('invalidFileType');
                    files[i].statusCode = '0';
                }
            }
        }
        return dropFiles;
    };
    Uploader.prototype.validatedFileSize = function (fileSize) {
        var minSizeError = '';
        var maxSizeError = '';
        if (fileSize < this.minFileSize) {
            minSizeError = this.localizedTexts('invalidMinFileSize');
        }
        else if (fileSize > this.maxFileSize) {
            maxSizeError = this.localizedTexts('invalidMaxFileSize');
        }
        else {
            minSizeError = '';
            maxSizeError = '';
        }
        var errorMessage = { minSize: minSizeError, maxSize: maxSizeError };
        return errorMessage;
    };
    Uploader.prototype.isPreLoadFile = function (fileData) {
        var isPreload = false;
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].name === fileData.name.slice(0, fileData.name.lastIndexOf('.')) &&
                this.files[i].type === fileData.type) {
                isPreload = true;
            }
        }
        return isPreload;
    };
    Uploader.prototype.createCustomfileList = function (fileData) {
        this.createParentUL();
        for (var _i = 0, fileData_1 = fileData; _i < fileData_1.length; _i++) {
            var listItem = fileData_1[_i];
            var listElement = this.createElement('li', { className: FILE, attrs: { 'data-file-name': listItem.name } });
            this.uploadTemplateFn = this.templateComplier(this.template);
            var liTempCompiler = this.uploadTemplateFn(listItem, this, 'template', this.element.id + 'Template', this.isStringTemplate, null, listElement);
            if (liTempCompiler) {
                var fromElements = [].slice.call(liTempCompiler);
                append(fromElements, listElement);
            }
            var index = fileData.indexOf(listItem);
            var eventArgs = {
                element: listElement,
                fileInfo: listItem,
                index: index,
                isPreload: this.isPreLoadFile(listItem)
            };
            var eventsArgs = {
                element: listElement,
                fileInfo: listItem,
                index: index,
                isPreload: this.isPreLoadFile(listItem)
            };
            this.trigger('rendering', eventArgs);
            this.trigger('fileListRendering', eventsArgs);
            this.listParent.appendChild(listElement);
            this.fileList.push(listElement);
        }
        this.renderReactTemplates();
    };
    Uploader.prototype.createParentUL = function () {
        if (isNullOrUndefined(this.listParent)) {
            this.listParent = this.createElement('ul', { className: LIST_PARENT });
            this.uploadWrapper.appendChild(this.listParent);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Uploader.prototype.formFileList = function (fileData, files) {
        var fileList = this.createElement('li', { className: FILE });
        fileList.setAttribute('data-files-count', fileData.length + '');
        var fileContainer = this.createElement('span', { className: TEXT_CONTAINER });
        var statusMessage;
        for (var _i = 0, fileData_2 = fileData; _i < fileData_2.length; _i++) {
            var listItem = fileData_2[_i];
            var fileNameEle = this.createElement('span', { className: FILE_NAME });
            fileNameEle.innerHTML = this.getFileNameOnly(listItem.name);
            var fileTypeEle = this.createElement('span', { className: FILE_TYPE });
            var fileType = this.getFileType(listItem.name);
            fileTypeEle.innerHTML = '.' + fileType;
            if (!fileType) {
                fileTypeEle.classList.add('e-hidden');
            }
            if (!this.enableRtl) {
                fileContainer.appendChild(fileNameEle);
                fileContainer.appendChild(fileTypeEle);
            }
            else {
                var rtlContainer = this.createElement('span', { className: RTL_CONTAINER });
                rtlContainer.appendChild(fileTypeEle);
                rtlContainer.appendChild(fileNameEle);
                fileContainer.appendChild(rtlContainer);
            }
            this.truncateName(fileNameEle);
            statusMessage = this.formValidateFileInfo(listItem, fileList);
        }
        fileList.appendChild(fileContainer);
        this.setListToFileInfo(fileData, fileList);
        var index = this.listParent.querySelectorAll('li').length;
        var infoEle = this.createElement('span');
        if (fileList.classList.contains(INVALID_FILE)) {
            infoEle.classList.add(STATUS);
            infoEle.classList.add(INVALID_FILE);
            infoEle.innerText = fileData.length > 1 ? this.localizedTexts('invalidFileSelection') : statusMessage;
        }
        else {
            infoEle.classList.add(fileData.length > 1 ? INFORMATION : FILE_SIZE);
            infoEle.innerText = fileData.length > 1 ? this.localizedTexts('totalFiles') + ': ' + fileData.length + ' , '
                + this.localizedTexts('size') + ': ' +
                this.bytesToSize(this.getFileSize(fileData)) : this.bytesToSize(fileData[0].size);
            this.createFormInput(fileData);
        }
        fileContainer.appendChild(infoEle);
        if (isNullOrUndefined(fileList.querySelector('.e-icons'))) {
            var iconElement = this.createElement('span', { className: 'e-icons', attrs: { 'tabindex': this.btnTabIndex } });
            /* istanbul ignore next */
            if (this.browserName === 'msie') {
                iconElement.classList.add('e-msie');
            }
            iconElement.setAttribute('title', this.localizedTexts('remove'));
            fileList.appendChild(fileContainer);
            fileList.appendChild(iconElement);
            EventHandler.add(iconElement, 'click', this.removeFiles, this);
            iconElement.classList.add(REMOVE_ICON);
        }
        var eventArgs = {
            element: fileList,
            fileInfo: this.mergeFileInfo(fileData, fileList),
            index: index,
            isPreload: this.isPreLoadFile(this.mergeFileInfo(fileData, fileList))
        };
        var eventsArgs = {
            element: fileList,
            fileInfo: this.mergeFileInfo(fileData, fileList),
            index: index,
            isPreload: this.isPreLoadFile(this.mergeFileInfo(fileData, fileList))
        };
        this.trigger('rendering', eventArgs);
        this.trigger('fileListRendering', eventsArgs);
        this.listParent.appendChild(fileList);
        this.fileList.push(fileList);
    };
    Uploader.prototype.formValidateFileInfo = function (listItem, fileList) {
        var statusMessage = listItem.status;
        var validationMessages = this.validatedFileSize(listItem.size);
        if (validationMessages.minSize !== '' || validationMessages.maxSize !== '') {
            this.addInvalidClass(fileList);
            statusMessage = validationMessages.minSize !== '' ? this.localizedTexts('invalidMinFileSize') :
                validationMessages.maxSize !== '' ? this.localizedTexts('invalidMaxFileSize') : statusMessage;
        }
        var typeValidationMessage = this.checkExtension(this.getFilesInArray(listItem))[0].status;
        if (typeValidationMessage === this.localizedTexts('invalidFileType')) {
            this.addInvalidClass(fileList);
            statusMessage = typeValidationMessage;
        }
        return statusMessage;
    };
    Uploader.prototype.addInvalidClass = function (fileList) {
        fileList.classList.add(INVALID_FILE);
    };
    Uploader.prototype.createFormInput = function (fileData) {
        if (this.browserName !== 'safari') {
            var inputElement = this.element.cloneNode(true);
            inputElement.classList.add(HIDDEN_INPUT);
            for (var _i = 0, fileData_3 = fileData; _i < fileData_3.length; _i++) {
                var listItem = fileData_3[_i];
                listItem.input = inputElement;
            }
            inputElement.setAttribute('id', getUniqueID('hiddenUploader'));
            inputElement.setAttribute('name', this.uploaderName);
            this.uploadWrapper.querySelector('.' + INPUT_WRAPPER).appendChild(inputElement);
            if (this.browserName !== 'msie' && this.browserName !== 'edge') {
                this.element.value = '';
            }
        }
    };
    Uploader.prototype.getFileSize = function (fileData) {
        var fileSize = 0;
        for (var _i = 0, fileData_4 = fileData; _i < fileData_4.length; _i++) {
            var file = fileData_4[_i];
            fileSize += file.size;
        }
        return fileSize;
    };
    Uploader.prototype.mergeFileInfo = function (fileData, fileList) {
        var result = {
            name: '',
            rawFile: '',
            size: 0,
            status: '',
            type: '',
            validationMessages: { minSize: '', maxSize: '' },
            statusCode: '1',
            list: fileList
        };
        var fileNames = [];
        var type = '';
        for (var _i = 0, fileData_5 = fileData; _i < fileData_5.length; _i++) {
            var listItem = fileData_5[_i];
            fileNames.push(listItem.name);
            type = listItem.type;
        }
        result.name = fileNames.join(', ');
        result.size = this.getFileSize(fileData);
        result.type = type;
        result.status = this.statusForFormUpload(fileData, fileList);
        return result;
    };
    Uploader.prototype.statusForFormUpload = function (fileData, fileList) {
        var isValid = true;
        var statusMessage;
        for (var _i = 0, fileData_6 = fileData; _i < fileData_6.length; _i++) {
            var listItem = fileData_6[_i];
            statusMessage = listItem.status;
            var validationMessages = this.validatedFileSize(listItem.size);
            if (validationMessages.minSize !== '' || validationMessages.maxSize !== '') {
                isValid = false;
                statusMessage = validationMessages.minSize !== '' ? this.localizedTexts('invalidMinFileSize') :
                    validationMessages.maxSize !== '' ? this.localizedTexts('invalidMaxFileSize') : statusMessage;
            }
            var typeValidationMessage = this.checkExtension(this.getFilesInArray(listItem))[0].status;
            if (typeValidationMessage === this.localizedTexts('invalidFileType')) {
                isValid = false;
                statusMessage = typeValidationMessage;
            }
        }
        if (!isValid) {
            fileList.classList.add(INVALID_FILE);
            statusMessage = fileData.length > 1 ? this.localizedTexts('invalidFileSelection') : statusMessage;
        }
        else {
            statusMessage = this.localizedTexts('totalFiles') + ': ' + fileData.length + ' , '
                + this.localizedTexts('size') + ': ' +
                this.bytesToSize(this.getFileSize(fileData));
        }
        return statusMessage;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Uploader.prototype.formCustomFileList = function (fileData, files) {
        this.createParentUL();
        var fileList = this.createElement('li', { className: FILE });
        fileList.setAttribute('data-files-count', fileData.length + '');
        this.setListToFileInfo(fileData, fileList);
        var result = this.mergeFileInfo(fileData, fileList);
        fileList.setAttribute('data-file-name', result.name);
        this.uploadTemplateFn = this.templateComplier(this.template);
        var liTempCompiler = this.uploadTemplateFn(result, this, 'template', this.element.id + 'Template', this.isStringTemplate, null, fileList);
        if (liTempCompiler) {
            var fromElements = [].slice.call(liTempCompiler);
            append(fromElements, fileList);
        }
        var index = this.listParent.querySelectorAll('li').length;
        if (!fileList.classList.contains(INVALID_FILE)) {
            this.createFormInput(fileData);
        }
        var eventArgs = {
            element: fileList,
            fileInfo: result,
            index: index,
            isPreload: this.isPreLoadFile(result)
        };
        var eventsArgs = {
            element: fileList,
            fileInfo: result,
            index: index,
            isPreload: this.isPreLoadFile(result)
        };
        this.trigger('rendering', eventArgs);
        this.trigger('fileListRendering', eventsArgs);
        this.listParent.appendChild(fileList);
        this.fileList.push(fileList);
        this.renderReactTemplates();
    };
    /**
     * Create the file list for specified files data.
     *
     * @param { FileInfo[] } fileData - Specifies the files data for file list creation.
     * @returns {void}
     */
    Uploader.prototype.createFileList = function (fileData) {
        this.filesData = this.filesData && this.filesData.length > 0 ? this.filesData.concat(fileData) : fileData;
        this.internalCreateFileList(fileData);
    };
    Uploader.prototype.internalCreateFileList = function (fileData) {
        this.createParentUL();
        if (this.template !== '' && !isNullOrUndefined(this.template)) {
            if (this.isFormUpload()) {
                this.uploadWrapper.classList.add(FORM_UPLOAD);
                this.formCustomFileList(fileData, this.element.files);
            }
            else {
                this.createCustomfileList(fileData);
            }
        }
        else if (this.isFormUpload()) {
            this.uploadWrapper.classList.add(FORM_UPLOAD);
            this.formFileList(fileData, this.element.files);
        }
        else {
            for (var _i = 0, fileData_7 = fileData; _i < fileData_7.length; _i++) {
                var listItem = fileData_7[_i];
                var liElement = this.createElement('li', {
                    className: FILE,
                    attrs: { 'data-file-name': listItem.name, 'data-files-count': '1' }
                });
                var textContainer = this.createElement('span', { className: TEXT_CONTAINER });
                var textElement = this.createElement('span', { className: FILE_NAME, attrs: { 'title': listItem.name } });
                textElement.innerHTML = this.getFileNameOnly(listItem.name);
                var fileExtension = this.createElement('span', { className: FILE_TYPE });
                var fileType = this.getFileType(listItem.name);
                fileExtension.innerHTML = '.' + fileType;
                if (!fileType) {
                    fileExtension.classList.add('e-hidden');
                }
                if (!this.enableRtl) {
                    textContainer.appendChild(textElement);
                    textContainer.appendChild(fileExtension);
                }
                else {
                    var rtlContainer = this.createElement('span', { className: RTL_CONTAINER });
                    rtlContainer.appendChild(fileExtension);
                    rtlContainer.appendChild(textElement);
                    textContainer.appendChild(rtlContainer);
                }
                var fileSize = this.createElement('span', { className: FILE_SIZE });
                fileSize.innerHTML = this.bytesToSize(listItem.size);
                textContainer.appendChild(fileSize);
                var statusElement = this.createElement('span', { className: STATUS });
                textContainer.appendChild(statusElement);
                statusElement.innerHTML = listItem.status;
                liElement.appendChild(textContainer);
                var iconElement = this.createElement('span', { className: ' e-icons',
                    attrs: { 'tabindex': this.btnTabIndex } });
                /* istanbul ignore next */
                if (this.browserName === 'msie') {
                    iconElement.classList.add('e-msie');
                }
                iconElement.setAttribute('title', this.localizedTexts('remove'));
                liElement.appendChild(iconElement);
                EventHandler.add(iconElement, 'click', this.removeFiles, this);
                if (listItem.statusCode === '2') {
                    statusElement.classList.add(UPLOAD_SUCCESS);
                    iconElement.classList.add(DELETE_ICON);
                    iconElement.setAttribute('title', this.localizedTexts('delete'));
                    iconElement.setAttribute('aria-label', this.localizedTexts('delete'));
                }
                else if (listItem.statusCode !== '1') {
                    statusElement.classList.remove(UPLOAD_SUCCESS);
                    statusElement.classList.add(VALIDATION_FAILS);
                }
                if (this.autoUpload && listItem.statusCode === '1' && this.asyncSettings.saveUrl !== '') {
                    statusElement.innerHTML = '';
                }
                if (!iconElement.classList.contains(DELETE_ICON)) {
                    iconElement.classList.add(REMOVE_ICON);
                    iconElement.setAttribute('aria-label', this.localizedTexts('remove'));
                }
                var index = fileData.indexOf(listItem);
                var eventArgs = {
                    element: liElement,
                    fileInfo: listItem,
                    index: index,
                    isPreload: this.isPreLoadFile(listItem)
                };
                var eventsArgs = {
                    element: liElement,
                    fileInfo: listItem,
                    index: index,
                    isPreload: this.isPreLoadFile(listItem)
                };
                this.trigger('rendering', eventArgs);
                this.trigger('fileListRendering', eventsArgs);
                this.listParent.appendChild(liElement);
                this.fileList.push(liElement);
                this.truncateName(textElement);
                var preventActionComplete = this.flag;
                if (this.isPreLoadFile(listItem)) {
                    this.flag = false;
                    this.checkActionComplete(true);
                    this.flag = preventActionComplete;
                }
            }
        }
    };
    Uploader.prototype.getSlicedName = function (nameElement) {
        var text = nameElement.textContent;
        nameElement.dataset.tail = text.slice(text.length - 10);
    };
    Uploader.prototype.setListToFileInfo = function (fileData, fileList) {
        for (var _i = 0, fileData_8 = fileData; _i < fileData_8.length; _i++) {
            var listItem = fileData_8[_i];
            listItem.list = fileList;
        }
    };
    Uploader.prototype.truncateName = function (name) {
        var nameElement = name;
        if (this.browserName !== 'edge' && nameElement.offsetWidth < nameElement.scrollWidth) {
            this.getSlicedName(nameElement);
            /* istanbul ignore next */
        }
        else if (nameElement.offsetWidth + 1 < nameElement.scrollWidth) {
            this.getSlicedName(nameElement);
        }
    };
    Uploader.prototype.getFileType = function (name) {
        var extension;
        var index = name.lastIndexOf('.');
        if (index >= 0) {
            extension = name.substring(index + 1);
        }
        return extension ? extension : '';
    };
    Uploader.prototype.getFileNameOnly = function (name) {
        var type = this.getFileType(name);
        var names = name.split('.' + type);
        return type = names[0];
    };
    Uploader.prototype.setInitialAttributes = function () {
        if (this.initialAttr.accept) {
            this.element.setAttribute('accept', this.initialAttr.accept);
        }
        if (this.initialAttr.disabled) {
            this.element.setAttribute('disabled', 'disabled');
        }
        if (this.initialAttr.multiple) {
            var newAttr = document.createAttribute('multiple');
            this.element.setAttributeNode(newAttr);
        }
    };
    Uploader.prototype.filterfileList = function (files) {
        var filterFiles = [];
        var li;
        for (var i = 0; i < files.length; i++) {
            li = this.getLiElement(files[i]);
            if (!isNullOrUndefined(li) && !li.classList.contains(UPLOAD_SUCCESS)) {
                filterFiles.push(files[i]);
            }
            else if (!this.showFileList && files[i].status !== 'File uploaded successfully') {
                filterFiles.push(files[i]);
            }
        }
        return filterFiles;
    };
    Uploader.prototype.updateStatus = function (files, status, statusCode, updateLiStatus) {
        if (updateLiStatus === void 0) { updateLiStatus = true; }
        if (!(status === '' || isNullOrUndefined(status)) && !(statusCode === '' || isNullOrUndefined(statusCode))) {
            files.status = status;
            files.statusCode = statusCode;
        }
        if (updateLiStatus) {
            var li = this.getLiElement(files);
            if (!isNullOrUndefined(li)) {
                if (!isNullOrUndefined(li.querySelector('.' + STATUS)) && !((status === '' || isNullOrUndefined(status)))) {
                    li.querySelector('.' + STATUS).textContent = status;
                }
            }
        }
        return files;
    };
    Uploader.prototype.getLiElement = function (files) {
        var index;
        for (var i = 0; i < this.filesData.length; i++) {
            if (!isNullOrUndefined(files) && ((!isNullOrUndefined(this.filesData[i].id) &&
                !isNullOrUndefined(files.id)) ? (this.filesData[i].name === files.name &&
                this.filesData[i].id === files.id) : this.filesData[i].name === files.name)) {
                index = i;
            }
        }
        return this.fileList[index];
    };
    Uploader.prototype.createProgressBar = function (liElement) {
        var progressbarWrapper = this.createElement('span', { className: PROGRESS_WRAPPER });
        var progressBar = this.createElement('progressbar', { className: PROGRESSBAR, attrs: { value: '0', max: '100' } });
        var progressbarInnerWrapper = this.createElement('span', { className: PROGRESS_INNER_WRAPPER });
        progressBar.setAttribute('style', 'width: 0%');
        var progressbarText = this.createElement('span', { className: PROGRESSBAR_TEXT });
        progressbarText.textContent = '0%';
        progressbarInnerWrapper.appendChild(progressBar);
        progressbarWrapper.appendChild(progressbarInnerWrapper);
        progressbarWrapper.appendChild(progressbarText);
        liElement.querySelector('.' + TEXT_CONTAINER).appendChild(progressbarWrapper);
    };
    /* istanbul ignore next */
    Uploader.prototype.updateProgressbar = function (e, li) {
        if (!isNaN(Math.round((e.loaded / e.total) * 100)) && !isNullOrUndefined(li.querySelector('.' + PROGRESSBAR))) {
            if (!isNullOrUndefined(this.progressInterval) && this.progressInterval !== '') {
                var value = (Math.round((e.loaded / e.total) * 100)) % parseInt(this.progressInterval, 10);
                if (value === 0 || value === 100) {
                    this.changeProgressValue(li, Math.round((e.loaded / e.total) * 100).toString() + '%');
                }
            }
            else {
                this.changeProgressValue(li, Math.round((e.loaded / e.total) * 100).toString() + '%');
            }
        }
    };
    Uploader.prototype.changeProgressValue = function (li, progressValue) {
        li.querySelector('.' + PROGRESSBAR).setAttribute('style', 'width:' + progressValue);
        li.querySelector('.' + PROGRESSBAR_TEXT).textContent = progressValue;
    };
    Uploader.prototype.uploadInProgress = function (e, files, customUI, request) {
        var li = this.getLiElement(files);
        if (isNullOrUndefined(li) && (!customUI)) {
            return;
        }
        if (!isNullOrUndefined(li)) {
            /* istanbul ignore next */
            if (files.statusCode === '5') {
                this.cancelUploadingFile(files, e, request, li);
            }
            if (!(li.querySelectorAll('.' + PROGRESS_WRAPPER).length > 0) && li.querySelector('.' + STATUS)) {
                li.querySelector('.' + STATUS).classList.add(UPLOAD_INPROGRESS);
                this.createProgressBar(li);
                this.updateProgressBarClasses(li, UPLOAD_INPROGRESS);
                li.querySelector('.' + STATUS).classList.remove(UPLOAD_FAILED);
            }
            this.updateProgressbar(e, li);
            var iconEle = li.querySelector('.' + REMOVE_ICON);
            if (!isNullOrUndefined(iconEle)) {
                iconEle.classList.add(ABORT_ICON, UPLOAD_INPROGRESS);
                iconEle.setAttribute('title', this.localizedTexts('abort'));
                iconEle.classList.remove(REMOVE_ICON);
            }
        }
        else {
            this.cancelUploadingFile(files, e, request);
        }
        var args = { e: e, operation: 'upload', file: this.updateStatus(files, this.localizedTexts('inProgress'), '3') };
        this.trigger('progress', args);
    };
    /* istanbul ignore next */
    Uploader.prototype.cancelUploadingFile = function (files, e, request, li) {
        var _this = this;
        if (files.statusCode === '5') {
            var eventArgs = {
                event: e,
                fileData: files,
                cancel: false,
                customFormData: [],
                currentRequest: null
            };
            this.trigger('canceling', eventArgs, function (eventArgs) {
                if (eventArgs.cancel) {
                    files.statusCode = '3';
                    if (!isNullOrUndefined(li)) {
                        var spinnerTarget = li.querySelector('.' + ABORT_ICON);
                        if (!isNullOrUndefined(spinnerTarget)) {
                            hideSpinner(spinnerTarget);
                            detach(li.querySelector('.e-spinner-pane'));
                        }
                    }
                }
                else {
                    request.emitError = false;
                    request.httpRequest.abort();
                    var formData = new FormData();
                    if (files.statusCode === '5') {
                        var name_1 = _this.element.getAttribute('name');
                        formData.append(name_1, files.name);
                        formData.append('cancel-uploading', files.name);
                        _this.updateFormData(formData, eventArgs.customFormData);
                        var ajax_1 = new Ajax(_this.asyncSettings.removeUrl, 'POST', true, null);
                        ajax_1.emitError = false;
                        ajax_1.beforeSend = function (e) {
                            if (eventArgs.currentRequest) {
                                _this.updateCustomheader(ajax_1.httpRequest, eventArgs.currentRequest);
                            }
                        };
                        ajax_1.onLoad = function (e) {
                            _this.removecanceledFile(e, files);
                            return {};
                        };
                        ajax_1.send(formData);
                    }
                }
            });
        }
    };
    Uploader.prototype.removecanceledFile = function (e, file) {
        var liElement = this.getLiElement(file);
        if (isNullOrUndefined(liElement) || liElement.querySelector('.' + RETRY_ICON) || isNullOrUndefined(liElement.querySelector('.' + ABORT_ICON))) {
            return;
        }
        this.updateStatus(file, this.localizedTexts('fileUploadCancel'), '5');
        this.renderFailureState(e, file, liElement);
        var spinnerTarget = liElement.querySelector('.' + REMOVE_ICON);
        if (!isNullOrUndefined(liElement)) {
            hideSpinner(spinnerTarget);
            if (!isNullOrUndefined(liElement.querySelector('.e-spinner-pane'))) {
                detach(liElement.querySelector('.e-spinner-pane'));
            }
        }
        var requestResponse = e && e.currentTarget ? this.getResponse(e) : null;
        var args = { event: e, response: requestResponse, operation: 'cancel', file: file };
        this.trigger('success', args);
    };
    Uploader.prototype.renderFailureState = function (e, file, liElement) {
        var _this = this;
        this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
        this.removeProgressbar(liElement, 'failure');
        if (!isNullOrUndefined(liElement.querySelector('.e-file-status'))) {
            liElement.querySelector('.e-file-status').classList.add(UPLOAD_FAILED);
        }
        var deleteIcon = liElement.querySelector('.' + ABORT_ICON);
        if (isNullOrUndefined(deleteIcon)) {
            return;
        }
        deleteIcon.classList.remove(ABORT_ICON, UPLOAD_INPROGRESS);
        deleteIcon.classList.add(REMOVE_ICON);
        deleteIcon.setAttribute('title', this.localizedTexts('remove'));
        this.pauseButton = this.createElement('span', { className: 'e-icons e-file-reload-btn', attrs: { 'tabindex': this.btnTabIndex } });
        deleteIcon.parentElement.insertBefore(this.pauseButton, deleteIcon);
        this.pauseButton.setAttribute('title', this.localizedTexts('retry'));
        this.pauseButton.setAttribute('aria-label', this.localizedTexts('retry'));
        var retryElement = liElement.querySelector('.' + RETRY_ICON);
        /* istanbul ignore next */
        retryElement.addEventListener('click', function (e) {
            _this.reloadcanceledFile(e, file, liElement, false);
        }, false);
    };
    Uploader.prototype.reloadcanceledFile = function (e, file, liElement, custom) {
        file.statusCode = '1';
        file.status = this.localizedTexts('readyToUploadMessage');
        if (!custom) {
            if (!isNullOrUndefined(liElement.querySelector('.' + STATUS))) {
                liElement.querySelector('.' + STATUS).classList.remove(UPLOAD_FAILED);
            }
            if (!isNullOrUndefined(liElement.querySelector('.' + RETRY_ICON))) {
                detach(liElement.querySelector('.' + RETRY_ICON));
            }
            this.pauseButton = null;
        }
        /* istanbul ignore next */
        if (!isNullOrUndefined(liElement)) {
            liElement.classList.add(RESTRICT_RETRY);
        }
        this.upload([file]);
    };
    /* istanbul ignore next */
    Uploader.prototype.uploadComplete = function (e, file, customUI) {
        var status = e.target;
        if (status.readyState === 4 && status.status >= 200 && status.status <= 299) {
            var li = this.getLiElement(file);
            if (isNullOrUndefined(li) && (!customUI || isNullOrUndefined(customUI)) && this.showFileList) {
                return;
            }
            if (!isNullOrUndefined(li)) {
                this.updateProgressBarClasses(li, UPLOAD_SUCCESS);
                this.removeProgressbar(li, 'success');
                var iconEle = li.querySelector('.' + ABORT_ICON);
                if (!isNullOrUndefined(iconEle)) {
                    iconEle.classList.add(DELETE_ICON);
                    iconEle.setAttribute('title', this.localizedTexts('delete'));
                    iconEle.setAttribute('aria-label', this.localizedTexts('delete'));
                    iconEle.classList.remove(ABORT_ICON);
                    iconEle.classList.remove(UPLOAD_INPROGRESS);
                }
            }
            this.raiseSuccessEvent(e, file);
        }
        else {
            this.uploadFailed(e, file);
        }
    };
    Uploader.prototype.getResponse = function (e) {
        var target = e.currentTarget;
        var response = {
            readyState: target.readyState,
            statusCode: target.status,
            statusText: target.statusText,
            headers: target.getAllResponseHeaders(),
            withCredentials: target.withCredentials
        };
        return response;
    };
    Uploader.prototype.raiseSuccessEvent = function (e, file) {
        var _this = this;
        var response = e && e.currentTarget ? this.getResponse(e) : null;
        var statusMessage = this.localizedTexts('uploadSuccessMessage');
        var args = {
            e: e, response: response, operation: 'upload', file: this.updateStatus(file, statusMessage, '2', false), statusText: statusMessage
        };
        var liElement = this.getLiElement(file);
        if (!isNullOrUndefined(liElement)) {
            var spinnerEle = liElement.querySelector('.' + SPINNER_PANE);
            if (!isNullOrUndefined(spinnerEle)) {
                hideSpinner(liElement);
                detach(spinnerEle);
            }
        }
        this.trigger('success', args, function (args) {
            _this.updateStatus(file, args.statusText, '2');
            if (_this.multiple) {
                _this.uploadedFilesData.push(file);
            }
            else {
                _this.uploadedFilesData = [file];
            }
            _this.trigger('change', { file: _this.uploadedFilesData });
            _this.checkActionButtonStatus();
            if (_this.fileList.length > 0) {
                if ((!(_this.getLiElement(file)).classList.contains(RESTRICT_RETRY))) {
                    _this.uploadSequential();
                    _this.checkActionComplete(true);
                }
                else {
                    /* istanbul ignore next */
                    (_this.getLiElement(file)).classList.remove(RESTRICT_RETRY);
                }
            }
            else if (!_this.showFileList) {
                _this.checkActionComplete(true);
            }
        });
    };
    Uploader.prototype.uploadFailed = function (e, file) {
        var _this = this;
        var li = this.getLiElement(file);
        var response = e && e.currentTarget ? this.getResponse(e) : null;
        var statusMessage = this.localizedTexts('uploadFailedMessage');
        var args = {
            e: e, response: response, operation: 'upload', file: this.updateStatus(file, statusMessage, '0', false), statusText: statusMessage
        };
        if (!isNullOrUndefined(li)) {
            this.renderFailureState(e, file, li);
        }
        this.trigger('failure', args, function (args) {
            _this.updateStatus(file, args.statusText, '0');
            _this.checkActionButtonStatus();
            _this.uploadSequential();
            _this.checkActionComplete(true);
        });
    };
    Uploader.prototype.uploadSequential = function () {
        if (this.sequentialUpload) {
            if (this.autoUpload) {
                /* istanbul ignore next */
                this.checkAutoUpload(this.filesData);
            }
            else {
                this.uploadButtonClick();
            }
        }
    };
    Uploader.prototype.checkActionComplete = function (increment) {
        if (increment) {
            ++this.actionCompleteCount;
        }
        else {
            --this.actionCompleteCount;
        }
        this.raiseActionComplete();
    };
    Uploader.prototype.raiseActionComplete = function () {
        if ((this.filesData.length === this.actionCompleteCount) && this.flag) {
            this.flag = false;
            var eventArgs = {
                fileData: []
            };
            eventArgs.fileData = this.getSelectedFileStatus(this.selectedFiles);
            this.trigger('actionComplete', eventArgs);
        }
    };
    Uploader.prototype.getSelectedFileStatus = function (selectedFiles) {
        var matchFiles = [];
        var matchFilesIndex = 0;
        for (var selectFileIndex = 0; selectFileIndex < selectedFiles.length; selectFileIndex++) {
            var selectedFileData = selectedFiles[selectFileIndex];
            for (var fileDataIndex = 0; fileDataIndex < this.filesData.length; fileDataIndex++) {
                if (this.filesData[fileDataIndex].name === selectedFileData.name &&
                    this.filesData[fileDataIndex].status === selectedFileData.status) {
                    matchFiles[matchFilesIndex] = this.filesData[fileDataIndex];
                    ++matchFilesIndex;
                    break;
                }
            }
        }
        return matchFiles;
    };
    Uploader.prototype.updateProgressBarClasses = function (li, className) {
        var progressBar = li.querySelector('.' + PROGRESSBAR);
        if (!isNullOrUndefined(progressBar)) {
            progressBar.classList.add(className);
            if (this.actionButtons && this.clearButton && this.uploadWrapper) {
                if (className === 'e-upload-progress' && !this.clearButton.hasAttribute('disabled')) {
                    this.clearButton.setAttribute('disabled', 'disabled');
                }
                else if ((className === 'e-upload-success' || className === 'e-upload-fails') && this.uploadWrapper.querySelectorAll('.e-upload-progress-bar.e-upload-progress:not(.e-upload-success):not(.e-upload-fails)').length === 0 &&
                    this.clearButton.hasAttribute('disabled')) {
                    this.clearButton.removeAttribute('disabled');
                }
            }
        }
    };
    Uploader.prototype.removeProgressbar = function (li, callType) {
        var _this = this;
        if (!isNullOrUndefined(li.querySelector('.' + PROGRESS_WRAPPER))) {
            this.progressAnimation = new Animation({ duration: 1250 });
            this.progressAnimation.animate(li.querySelector('.' + PROGRESS_WRAPPER), { name: 'FadeOut' });
            this.progressAnimation.animate(li.querySelector('.' + PROGRESSBAR_TEXT), { name: 'FadeOut' });
            setTimeout(function () {
                _this.animateProgressBar(li, callType);
            }, 750);
        }
    };
    /* istanbul ignore next */
    Uploader.prototype.animateProgressBar = function (li, callType) {
        if (callType === 'success') {
            li.classList.add(UPLOAD_SUCCESS);
            if (!isNullOrUndefined(li.querySelector('.' + STATUS))) {
                li.querySelector('.' + STATUS).classList.remove(UPLOAD_INPROGRESS);
                this.progressAnimation.animate(li.querySelector('.' + STATUS), { name: 'FadeIn' });
                li.querySelector('.' + STATUS).classList.add(UPLOAD_SUCCESS);
            }
        }
        else {
            if (!isNullOrUndefined(li.querySelector('.' + STATUS))) {
                li.querySelector('.' + STATUS).classList.remove(UPLOAD_INPROGRESS);
                this.progressAnimation.animate(li.querySelector('.' + STATUS), { name: 'FadeIn' });
                li.querySelector('.' + STATUS).classList.add(UPLOAD_FAILED);
            }
        }
        if (li.querySelector('.' + PROGRESS_WRAPPER)) {
            detach(li.querySelector('.' + PROGRESS_WRAPPER));
        }
    };
    Uploader.prototype.setExtensions = function (extensions) {
        if (extensions !== '' && !isNullOrUndefined(extensions)) {
            this.element.setAttribute('accept', extensions);
        }
        else {
            this.element.removeAttribute('accept');
        }
    };
    Uploader.prototype.templateComplier = function (uploadTemplate) {
        if (uploadTemplate) {
            try {
                if (typeof uploadTemplate !== 'function' && selectAll(uploadTemplate, document).length) {
                    return compile(select(uploadTemplate, document).innerHTML.trim());
                }
                else {
                    return compile(uploadTemplate);
                }
            }
            catch (exception) {
                return compile(uploadTemplate);
            }
        }
        return undefined;
    };
    Uploader.prototype.setRTL = function () {
        if (this.enableRtl) {
            addClass([this.uploadWrapper], RTL);
        }
        else {
            removeClass([this.uploadWrapper], RTL);
        }
    };
    Uploader.prototype.localizedTexts = function (localeText) {
        this.l10n.setLocale(this.locale);
        return this.l10n.getConstant(localeText);
    };
    Uploader.prototype.setControlStatus = function () {
        if (!this.enabled) {
            this.uploadWrapper.classList.add(DISABLED);
            this.element.setAttribute('disabled', 'disabled');
            this.browseButton.setAttribute('disabled', 'disabled');
            if (!isNullOrUndefined(this.clearButton)) {
                this.clearButton.setAttribute('disabled', 'disabled');
            }
            if (!isNullOrUndefined(this.uploadButton)) {
                this.uploadButton.setAttribute('disabled', 'disabled');
            }
        }
        else {
            if (this.uploadWrapper.classList.contains(DISABLED)) {
                this.uploadWrapper.classList.remove(DISABLED);
            }
            if (!isNullOrUndefined(this.browseButton) && this.element.hasAttribute('disabled')) {
                this.element.removeAttribute('disabled');
                this.browseButton.removeAttribute('disabled');
            }
            if (!isNullOrUndefined(this.clearButton) && this.clearButton.hasAttribute('disabled')) {
                this.clearButton.removeAttribute('disabled');
            }
            if (!isNullOrUndefined(this.uploadButton) && this.uploadButton.hasAttribute('disabled')) {
                this.uploadButton.hasAttribute('disabled');
            }
        }
    };
    Uploader.prototype.checkHTMLAttributes = function (isDynamic) {
        var attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['accept', 'multiple', 'disabled'];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(prop))) {
                switch (prop) {
                    case 'accept':
                        if ((isNullOrUndefined(this.uploaderOptions) || (this.uploaderOptions['allowedExtensions'] === undefined))
                            || isDynamic) {
                            this.setProperties({ allowedExtensions: this.element.getAttribute('accept') }, !isDynamic);
                            this.initialAttr.accept = this.allowedExtensions;
                        }
                        break;
                    case 'multiple':
                        if ((isNullOrUndefined(this.uploaderOptions) || (this.uploaderOptions['multiple'] === undefined)) || isDynamic) {
                            var isMutiple = this.element.getAttribute(prop) === 'multiple' ||
                                this.element.getAttribute(prop) === '' || this.element.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ multiple: isMutiple }, !isDynamic);
                            this.initialAttr.multiple = true;
                        }
                        break;
                    case 'disabled':
                        if ((isNullOrUndefined(this.uploaderOptions) || (this.uploaderOptions['enabled'] === undefined)) || isDynamic) {
                            var isDisabled = this.element.getAttribute(prop) === 'disabled' ||
                                this.element.getAttribute(prop) === '' || this.element.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: isDisabled }, !isDynamic);
                            this.initialAttr.disabled = true;
                        }
                }
            }
        }
    };
    Uploader.prototype.chunkUpload = function (file, custom, fileIndex) {
        var start = 0;
        var end = Math.min(this.asyncSettings.chunkSize, file.size);
        var index = 0;
        var blob = file.rawFile.slice(start, end);
        var metaData = { chunkIndex: index, blob: blob, file: file, start: start, end: end, retryCount: 0, request: null };
        this.sendRequest(file, metaData, custom, fileIndex);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Uploader.prototype.sendRequest = function (file, metaData, custom, fileIndex) {
        var _this = this;
        var formData = new FormData();
        var blob = file.rawFile.slice(metaData.start, metaData.end);
        formData.append(this.uploaderName, blob, file.name);
        formData.append('chunk-index', metaData.chunkIndex.toString());
        formData.append('chunkIndex', metaData.chunkIndex.toString());
        var totalChunk = Math.max(Math.ceil(file.size / this.asyncSettings.chunkSize), 1);
        formData.append('total-chunk', totalChunk.toString());
        formData.append('totalChunk', totalChunk.toString());
        var ajax = new Ajax({ url: this.asyncSettings.saveUrl, type: 'POST', async: true, contentType: null });
        ajax.emitError = false;
        ajax.onLoad = function (e) {
            _this.chunkUploadComplete(e, metaData, custom);
            return {};
        };
        ajax.onUploadProgress = function (e) {
            _this.chunkUploadInProgress(e, metaData, custom);
            return {};
        };
        var eventArgs = {
            fileData: file,
            customFormData: [],
            cancel: false,
            chunkSize: this.asyncSettings.chunkSize === 0 ? null : this.asyncSettings.chunkSize
        };
        ajax.beforeSend = function (e) {
            eventArgs.currentRequest = ajax.httpRequest;
            eventArgs.currentChunkIndex = metaData.chunkIndex;
            if (eventArgs.currentChunkIndex === 0) {
                // This event is currently not required but to avoid breaking changes for previous customer, we have included.
                _this.trigger('uploading', eventArgs, function (eventArgs) {
                    _this.uploadingEventCallback(formData, eventArgs, e, file);
                });
            }
            else {
                _this.trigger('chunkUploading', eventArgs, function (eventArgs) {
                    _this.uploadingEventCallback(formData, eventArgs, e, file);
                });
            }
        };
        /* istanbul ignore next */
        ajax.onError = function (e) {
            _this.chunkUploadFailed(e, metaData, custom);
            return {};
        };
        ajax.send(formData);
        metaData.request = ajax;
    };
    Uploader.prototype.uploadingEventCallback = function (formData, eventArgs, e, file) {
        if (eventArgs.cancel) {
            this.eventCancelByArgs(e, eventArgs, file);
        }
        else {
            this.updateFormData(formData, eventArgs.customFormData);
        }
    };
    Uploader.prototype.eventCancelByArgs = function (e, eventArgs, file) {
        var _this = this;
        e.cancel = true;
        if (eventArgs.fileData.statusCode === '5') {
            return;
        }
        eventArgs.fileData.statusCode = '5';
        eventArgs.fileData.status = this.localizedTexts('fileUploadCancel');
        var liElement = this.getLiElement(eventArgs.fileData);
        if (liElement) {
            if (!isNullOrUndefined(liElement.querySelector('.' + STATUS))) {
                liElement.querySelector('.' + STATUS).innerHTML = this.localizedTexts('fileUploadCancel');
                liElement.querySelector('.' + STATUS).classList.add(UPLOAD_FAILED);
            }
            this.pauseButton = this.createElement('span', { className: 'e-icons e-file-reload-btn', attrs: { 'tabindex': this.btnTabIndex } });
            var removeIcon = liElement.querySelector('.' + REMOVE_ICON);
            if (removeIcon) {
                removeIcon.parentElement.insertBefore(this.pauseButton, removeIcon);
            }
            this.pauseButton.setAttribute('title', this.localizedTexts('retry'));
            /* istanbul ignore next */
            this.pauseButton.addEventListener('click', function (e) {
                _this.reloadcanceledFile(e, file, liElement);
            }, false);
            this.checkActionButtonStatus();
        }
    };
    Uploader.prototype.checkChunkUpload = function () {
        return (this.asyncSettings.chunkSize <= 0 || isNullOrUndefined(this.asyncSettings.chunkSize)) ? false : true;
    };
    Uploader.prototype.chunkUploadComplete = function (e, metaData, custom) {
        var _this = this;
        var response = e.target;
        var liElement;
        if (response.readyState === 4 && response.status >= 200 && response.status < 300) {
            var requestResponse = e && e.currentTarget ? this.getResponse(e) : null;
            var totalChunk = Math.max(Math.ceil(metaData.file.size / this.asyncSettings.chunkSize), 1);
            var eventArgs = {
                event: e,
                file: metaData.file,
                chunkIndex: metaData.chunkIndex,
                totalChunk: totalChunk,
                chunkSize: this.asyncSettings.chunkSize,
                response: requestResponse
            };
            this.trigger('chunkSuccess', eventArgs);
            if (isNullOrUndefined(custom) || !custom) {
                liElement = this.getLiElement(metaData.file);
            }
            this.updateMetaData(metaData);
            if (metaData.end === metaData.file.size) {
                metaData.file.statusCode = '3';
            }
            if (metaData.file.statusCode === '5') {
                var eventArgs_1 = { event: e, fileData: metaData.file, cancel: false, customFormData: [] };
                this.trigger('canceling', eventArgs_1, function (eventArgs) {
                    /* istanbul ignore next */
                    if (eventArgs.cancel) {
                        metaData.file.statusCode = '3';
                        var spinnerTarget = liElement.querySelector('.' + ABORT_ICON);
                        if (!isNullOrUndefined(liElement) && !isNullOrUndefined(spinnerTarget)) {
                            hideSpinner(spinnerTarget);
                            detach(liElement.querySelector('.e-spinner-pane'));
                        }
                        _this.sendNextRequest(metaData);
                    }
                    else {
                        metaData.request.emitError = false;
                        response.abort();
                        var formData = new FormData();
                        var name_2 = _this.element.getAttribute('name');
                        formData.append(name_2, metaData.file.name);
                        formData.append('cancel-uploading', metaData.file.name);
                        formData.append('cancelUploading', metaData.file.name);
                        _this.updateFormData(formData, eventArgs.customFormData);
                        var ajax = new Ajax(_this.asyncSettings.removeUrl, 'POST', true, null);
                        ajax.emitError = false;
                        ajax.onLoad = function (e) {
                            _this.removeChunkFile(e, metaData, custom);
                            return {};
                        };
                        ajax.send(formData);
                    }
                });
            }
            else {
                if ((totalChunk - 1) === metaData.chunkIndex && totalChunk > metaData.chunkIndex) {
                    var index = this.pausedData.indexOf(metaData);
                    if (index >= 0) {
                        this.pausedData.splice(index, 1);
                    }
                    if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom) && liElement) {
                        if (liElement && !isNullOrUndefined(liElement.querySelector('.' + PAUSE_UPLOAD))) {
                            detach(liElement.querySelector('.' + PAUSE_UPLOAD));
                        }
                        this.removeChunkProgressBar(metaData);
                    }
                    this.raiseSuccessEvent(e, metaData.file);
                    return;
                }
                if (metaData.file.statusCode !== '4') {
                    this.sendNextRequest(metaData);
                }
            }
        }
        else {
            this.chunkUploadFailed(e, metaData);
        }
    };
    Uploader.prototype.sendNextRequest = function (metaData) {
        metaData.start = metaData.end;
        metaData.end += this.asyncSettings.chunkSize;
        metaData.end = Math.min(metaData.end, metaData.file.size);
        metaData.chunkIndex += 1;
        this.sendRequest(metaData.file, metaData);
    };
    Uploader.prototype.removeChunkFile = function (e, metaData, custom) {
        if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) && !custom)) {
            var liElement = this.getLiElement(metaData.file);
            var deleteIcon = liElement.querySelector('.' + ABORT_ICON);
            var spinnerTarget = deleteIcon;
            this.updateStatus(metaData.file, this.localizedTexts('fileUploadCancel'), '5');
            this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
            this.removeProgressbar(liElement, 'failure');
            if (deleteIcon) {
                deleteIcon.classList.remove(ABORT_ICON);
                deleteIcon.classList.add(REMOVE_ICON);
                deleteIcon.setAttribute('title', this.localizedTexts('remove'));
            }
            var pauseIcon = liElement.querySelector('.' + PAUSE_UPLOAD);
            if (pauseIcon) {
                pauseIcon.classList.add(RETRY_ICON);
                pauseIcon.classList.remove(PAUSE_UPLOAD);
                pauseIcon.setAttribute('title', this.localizedTexts('retry'));
            }
            if (!isNullOrUndefined(liElement) && !isNullOrUndefined(deleteIcon)
                && !isNullOrUndefined(liElement.querySelector('.e-spinner-pane'))) {
                hideSpinner(spinnerTarget);
                detach(liElement.querySelector('.e-spinner-pane'));
            }
        }
    };
    Uploader.prototype.pauseUpload = function (metaData, e, custom) {
        metaData.file.statusCode = '4';
        metaData.file.status = this.localizedTexts('pause');
        this.updateMetaData(metaData);
        var eventArgs = {
            event: e ? e : null,
            file: metaData.file,
            chunkIndex: metaData.chunkIndex,
            chunkCount: Math.round(metaData.file.size / this.asyncSettings.chunkSize),
            chunkSize: this.asyncSettings.chunkSize
        };
        this.abortUpload(metaData, custom, eventArgs);
        if (this.sequentialUpload) {
            this.uploadSequential();
        }
    };
    Uploader.prototype.abortUpload = function (metaData, custom, eventArgs) {
        if (metaData.file.statusCode !== '4') {
            metaData.request.emitError = false;
            metaData.request.httpRequest.abort();
        }
        var liElement = this.getLiElement(metaData.file);
        if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom)) {
            var targetElement = liElement.querySelector('.' + PAUSE_UPLOAD);
            targetElement.classList.remove(PAUSE_UPLOAD);
            targetElement.classList.add(RESUME_UPLOAD);
            targetElement.setAttribute('title', this.localizedTexts('resume'));
            targetElement.nextElementSibling.classList.add(REMOVE_ICON);
            targetElement.nextElementSibling.classList.remove(ABORT_ICON);
            targetElement.nextElementSibling.setAttribute('title', this.localizedTexts('remove'));
        }
        for (var i = 0; i < this.pausedData.length; i++) {
            if (this.pausedData[i].file.name === metaData.file.name) {
                this.pausedData.splice(i, 1);
            }
        }
        this.pausedData.push(metaData);
        this.trigger('pausing', eventArgs);
    };
    Uploader.prototype.resumeUpload = function (metaData, e, custom) {
        var liElement = this.getLiElement(metaData.file);
        var targetElement;
        if (!isNullOrUndefined(liElement)) {
            targetElement = liElement.querySelector('.' + RESUME_UPLOAD);
        }
        if (!isNullOrUndefined(targetElement) && (isNullOrUndefined(custom) || !custom)) {
            targetElement.classList.remove(RESUME_UPLOAD);
            targetElement.classList.add(PAUSE_UPLOAD);
            targetElement.setAttribute('title', this.localizedTexts('pause'));
            targetElement.nextElementSibling.classList.remove(REMOVE_ICON);
            targetElement.nextElementSibling.classList.add(ABORT_ICON);
            targetElement.nextElementSibling.setAttribute('title', this.localizedTexts('abort'));
        }
        metaData.file.status = this.localizedTexts('inProgress');
        metaData.file.statusCode = '3';
        this.updateMetaData(metaData);
        var eventArgs = {
            event: e ? e : null,
            file: metaData.file,
            chunkIndex: metaData.chunkIndex,
            chunkCount: Math.round(metaData.file.size / this.asyncSettings.chunkSize),
            chunkSize: this.asyncSettings.chunkSize
        };
        this.trigger('resuming', eventArgs);
        for (var i = 0; i < this.pausedData.length; i++) {
            if (this.pausedData[i].end === this.pausedData[i].file.size) {
                this.chunkUploadComplete(e, metaData, custom);
            }
            else {
                if (this.pausedData[i].file.name === metaData.file.name) {
                    this.pausedData[i].start = this.pausedData[i].end;
                    this.pausedData[i].end = this.pausedData[i].end + this.asyncSettings.chunkSize;
                    this.pausedData[i].end = Math.min(this.pausedData[i].end, this.pausedData[i].file.size);
                    this.pausedData[i].chunkIndex = this.pausedData[i].chunkIndex + 1;
                    this.sendRequest(this.pausedData[i].file, this.pausedData[i], custom);
                }
            }
        }
    };
    Uploader.prototype.updateMetaData = function (metaData) {
        if (this.uploadMetaData.indexOf(metaData) === -1) {
            this.uploadMetaData.push(metaData);
        }
        else {
            this.uploadMetaData.splice(this.uploadMetaData.indexOf(metaData), 1);
            this.uploadMetaData.push(metaData);
        }
    };
    Uploader.prototype.removeChunkProgressBar = function (metaData) {
        var liElement = this.getLiElement(metaData.file);
        if (!isNullOrUndefined(liElement)) {
            this.updateProgressBarClasses(liElement, UPLOAD_SUCCESS);
            this.removeProgressbar(liElement, 'success');
            var cancelButton = liElement.querySelector('.' + ABORT_ICON);
            if (!isNullOrUndefined(cancelButton)) {
                cancelButton.classList.add(DELETE_ICON);
                cancelButton.setAttribute('title', this.localizedTexts('delete'));
                cancelButton.classList.remove(ABORT_ICON, UPLOAD_INPROGRESS);
            }
        }
    };
    Uploader.prototype.chunkUploadFailed = function (e, metaData, custom) {
        var _this = this;
        var chunkCount = Math.max(Math.ceil(metaData.file.size / this.asyncSettings.chunkSize), 1);
        var liElement;
        if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom)) {
            liElement = this.getLiElement(metaData.file);
        }
        var requestResponse = e && e.currentTarget ? this.getResponse(e) : null;
        var eventArgs = {
            event: e,
            file: metaData.file,
            chunkIndex: metaData.chunkIndex,
            totalChunk: chunkCount,
            chunkSize: this.asyncSettings.chunkSize,
            cancel: false,
            response: requestResponse
        };
        this.trigger('chunkFailure', eventArgs, function (eventArgs) {
            // To prevent triggering of failure event
            if (!eventArgs.cancel) {
                if (metaData.retryCount < _this.asyncSettings.retryCount) {
                    setTimeout(function () {
                        _this.retryRequest(liElement, metaData, custom);
                    }, _this.asyncSettings.retryAfterDelay);
                }
                else {
                    if (!isNullOrUndefined(liElement)) {
                        var pauseButton = liElement.querySelector('.' + PAUSE_UPLOAD) ?
                            liElement.querySelector('.' + PAUSE_UPLOAD) : liElement.querySelector('.' + RESUME_UPLOAD);
                        if (!isNullOrUndefined(pauseButton)) {
                            pauseButton.classList.add(RETRY_ICON);
                            pauseButton.classList.remove(PAUSE_UPLOAD, RESUME_UPLOAD);
                        }
                        _this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
                        _this.removeProgressbar(liElement, 'failure');
                        liElement.querySelector('.e-icons').classList.remove(UPLOAD_INPROGRESS);
                        var iconElement = liElement.querySelector('.' + ABORT_ICON) ?
                            liElement.querySelector('.' + ABORT_ICON) : liElement.querySelector('.' + REMOVE_ICON);
                        iconElement.classList.remove(ABORT_ICON);
                        if (!isNullOrUndefined(liElement.querySelector('.' + PAUSE_UPLOAD))) {
                            detach(liElement.querySelector('.' + PAUSE_UPLOAD));
                        }
                        if (metaData.start > 0) {
                            iconElement.classList.add(DELETE_ICON);
                            iconElement.setAttribute('title', _this.localizedTexts('delete'));
                        }
                        else {
                            iconElement.classList.add(REMOVE_ICON);
                            iconElement.setAttribute('title', _this.localizedTexts('remove'));
                        }
                    }
                    metaData.retryCount = 0;
                    var file_1 = metaData.file;
                    var failureMessage = _this.localizedTexts('uploadFailedMessage');
                    var args = {
                        e: e, response: requestResponse,
                        operation: 'upload',
                        file: _this.updateStatus(file_1, failureMessage, '0', false),
                        statusText: failureMessage
                    };
                    _this.trigger('failure', args, function (args) {
                        _this.updateStatus(file_1, args.statusText, '0');
                        _this.uploadSequential();
                        _this.checkActionComplete(true);
                    });
                }
            }
        });
    };
    Uploader.prototype.retryRequest = function (liElement, metaData, custom) {
        if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom) && liElement) {
            this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
        }
        metaData.retryCount += 1;
        this.sendRequest(metaData.file, metaData);
    };
    Uploader.prototype.checkPausePlayAction = function (e) {
        var targetElement = e.target;
        var selectedElement = e.target.parentElement;
        var index = this.fileList.indexOf(selectedElement);
        var fileData = this.filesData[index];
        var metaData = this.getCurrentMetaData(fileData);
        if (targetElement.classList.contains(PAUSE_UPLOAD)) {
            /* istanbul ignore next */
            this.pauseUpload(metaData, e);
        }
        else if (targetElement.classList.contains(RESUME_UPLOAD)) {
            /* istanbul ignore next */
            this.resumeUpload(metaData, e);
        }
        else if (targetElement.classList.contains(RETRY_ICON)) {
            if (metaData.file.status === this.localizedTexts('fileUploadCancel')) {
                this.retryUpload(metaData, false);
            }
            else {
                this.retryUpload(metaData, true);
            }
        }
    };
    Uploader.prototype.retryUpload = function (metaData, fromcanceledStage) {
        if (fromcanceledStage) {
            metaData.end = metaData.end + this.asyncSettings.chunkSize;
            metaData.start = metaData.start + this.asyncSettings.chunkSize;
            this.sendRequest(metaData.file, metaData);
        }
        else {
            metaData.file.statusCode = '1';
            metaData.file.status = this.localizedTexts('readyToUploadMessage');
            this.chunkUpload(metaData.file);
        }
        /* istanbul ignore next */
        (this.getLiElement(metaData.file)).classList.add(RESTRICT_RETRY);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Uploader.prototype.chunkUploadInProgress = function (e, metaData, custom) {
        var _this = this;
        if (metaData.file.statusCode === '4') {
            return;
        }
        if (metaData.file.statusCode !== '4' && metaData.file.statusCode !== '5') {
            metaData.file.statusCode = '3';
            metaData.file.status = this.localizedTexts('inProgress');
        }
        this.updateMetaData(metaData);
        var liElement = this.getLiElement(metaData.file);
        if (isNullOrUndefined(liElement)) {
            return;
        }
        var retryElement = liElement.querySelector('.' + RETRY_ICON);
        if (!isNullOrUndefined(retryElement)) {
            retryElement.classList.add(PAUSE_UPLOAD);
            retryElement.setAttribute('title', this.localizedTexts('pause'));
            retryElement.classList.remove(RETRY_ICON);
        }
        if (!isNullOrUndefined(liElement)) {
            if (!(liElement.querySelectorAll('.' + PROGRESS_WRAPPER).length > 0)) {
                var statusElement = liElement.querySelector('.' + STATUS);
                if (isNullOrUndefined(this.template)) {
                    statusElement.classList.add(UPLOAD_INPROGRESS);
                    statusElement.classList.remove(UPLOAD_FAILED);
                    this.createProgressBar(liElement);
                    this.updateProgressBarClasses(liElement, UPLOAD_INPROGRESS);
                }
                var clearIcon = liElement.querySelector('.' + REMOVE_ICON) ? liElement.querySelector('.' + REMOVE_ICON) :
                    liElement.querySelector('.' + DELETE_ICON);
                if (!isNullOrUndefined(clearIcon)) {
                    clearIcon.classList.add(ABORT_ICON);
                    clearIcon.setAttribute('title', this.localizedTexts('abort'));
                    clearIcon.classList.remove(REMOVE_ICON);
                }
            }
            if (!isNaN(Math.round((e.loaded / e.total) * 100)) && isNullOrUndefined(this.template) && metaData.file.statusCode !== '4') {
                var progressVal = void 0;
                var totalChunks = Math.ceil(metaData.file.size / this.asyncSettings.chunkSize) - 1;
                if (this.asyncSettings.chunkSize && totalChunks) {
                    progressVal = Math.round(metaData.chunkIndex / totalChunks * 100);
                    this.changeProgressValue(liElement, progressVal.toString() + '%');
                }
            }
            if (metaData.chunkIndex === 0) {
                this.checkActionButtonStatus();
            }
        }
        if (isNullOrUndefined(liElement.querySelector('.' + PAUSE_UPLOAD)) && isNullOrUndefined(this.template)
            && isNullOrUndefined(liElement.querySelector('.' + DELETE_ICON))) {
            this.pauseButton = this.createElement('span', { className: 'e-icons e-file-pause-btn', attrs: { 'tabindex': this.btnTabIndex } });
            if (this.browserName === 'msie') {
                this.pauseButton.classList.add('e-msie');
            }
            var abortIcon = liElement.querySelector('.' + ABORT_ICON);
            abortIcon.parentElement.insertBefore(this.pauseButton, abortIcon);
            this.pauseButton.setAttribute('title', this.localizedTexts('pause'));
            this.pauseButton.addEventListener('click', function (e) {
                _this.checkPausePlayAction(e);
            }, false);
        }
    };
    /**
     * It is used to convert bytes value into kilobytes or megabytes depending on the size based
     * on [binary prefix](https://en.wikipedia.org/wiki/Binary_prefix).
     *
     * @param { number } bytes - Specifies the file size in bytes.
     * @returns {string} - Returns the file size.
     */
    Uploader.prototype.bytesToSize = function (bytes) {
        var i = -1;
        if (!bytes) {
            return '0.0 KB';
        }
        do {
            bytes = bytes / 1024;
            i++;
        } while (bytes > 99);
        if (i >= 2) {
            bytes = bytes * 1024;
            i = 1;
        }
        return Math.max(bytes, 0).toFixed(1) + ' ' + ['KB', 'MB'][i];
    };
    /**
     * Allows you to sort the file data alphabetically based on its file name clearly.
     *
     * @param { FileList } filesData - specifies the files data for upload.
     * @returns {File[]}
     */
    /* istanbul ignore next */
    Uploader.prototype.sortFileList = function (filesData) {
        filesData = filesData ? filesData : this.sortFilesList;
        var files = filesData;
        var fileNames = [];
        for (var i = 0; i < files.length; i++) {
            fileNames.push(files[i].name);
        }
        var sortedFileNames = fileNames.sort();
        var sortedFilesData = [];
        for (var _i = 0, sortedFileNames_1 = sortedFileNames; _i < sortedFileNames_1.length; _i++) {
            var name_3 = sortedFileNames_1[_i];
            for (var i = 0; i < files.length; i++) {
                if (name_3 === files[i].name) {
                    sortedFilesData.push(files[i]);
                }
            }
        }
        return sortedFilesData;
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers. Also it removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    Uploader.prototype.destroy = function () {
        this.element.value = null;
        this.clearTemplate();
        this.clearAll();
        this.unWireEvents();
        this.unBindDropEvents();
        if (this.multiple) {
            this.element.removeAttribute('multiple');
        }
        if (!this.enabled) {
            this.element.removeAttribute('disabled');
        }
        this.element.removeAttribute('accept');
        this.setInitialAttributes();
        var attributes = ['aria-label', 'directory', 'webkitdirectory', 'tabindex'];
        for (var _i = 0, attributes_2 = attributes; _i < attributes_2.length; _i++) {
            var key = attributes_2[_i];
            this.element.removeAttribute(key);
        }
        if (!isNullOrUndefined(this.uploadWrapper)) {
            this.uploadWrapper.parentElement.appendChild(this.element);
            detach(this.uploadWrapper);
        }
        this.uploadWrapper = null;
        this.uploadWrapper = null;
        this.browseButton = null;
        this.dropAreaWrapper = null;
        this.dropZoneElement = null;
        this.dropArea = null;
        this.keyboardModule = null;
        this.clearButton = null;
        this.uploadButton = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Allows you to call the upload process manually by calling save URL action.
     * To process the selected files (added in upload queue), pass an empty argument otherwise
     * upload the specific file based on its argument.
     *
     * @param { FileInfo | FileInfo[] } files - Specifies the files data for upload.
     * @param {boolean} custom - Specifies whether the uploader is rendered with custom file list.
     * @returns {void}
     */
    Uploader.prototype.upload = function (files, custom) {
        var _this = this;
        files = files ? files : this.filesData;
        if (this.sequentialUpload && (this.isFirstFileOnSelection || custom)) {
            this.sequenceUpload(files);
        }
        else {
            var uploadFiles_1 = this.getFilesInArray(files);
            var eventArgs = {
                customFormData: [],
                currentRequest: null,
                cancel: false
            };
            this.trigger('beforeUpload', eventArgs, function (eventArgs) {
                if (!eventArgs.cancel) {
                    _this.customFormDatas = (eventArgs.customFormData && eventArgs.customFormData.length > 0) ?
                        eventArgs.customFormData : _this.customFormDatas;
                    _this.uploadFiles(uploadFiles_1, custom);
                }
            });
        }
    };
    Uploader.prototype.getFilesInArray = function (files) {
        var uploadFiles = [];
        if (files) {
            if (files instanceof Array) {
                uploadFiles = files;
            }
            else {
                uploadFiles.push(files);
            }
        }
        return uploadFiles;
    };
    /* istanbul ignore next */
    Uploader.prototype.serverReadFileBase64 = function (fileIndex, position, totalCount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var file = _this.fileStreams[fileIndex].rawFile;
            try {
                var reader = new FileReader();
                reader.onload = (function (args) {
                    return function () {
                        try {
                            var contents = args.result;
                            var data = contents ? contents.split(';base64,')[1] : null;
                            resolve(data);
                        }
                        catch (e) {
                            reject(e);
                        }
                    };
                })(reader);
                reader.readAsDataURL(file.slice(position, position + totalCount));
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* istanbul ignore next */
    Uploader.prototype.uploadFileCount = function (ele) {
        /* eslint-enable @typescript-eslint/no-unused-vars */
        var files = this.filesData;
        if (!files || files.length === 0) {
            return -1;
        }
        var result = files.length;
        return result;
    };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* istanbul ignore next */
    Uploader.prototype.getFileRead = function (index, ele) {
        /* eslint-enable @typescript-eslint/no-unused-vars */
        var files = this.filesData;
        if (!files || files.length === 0) {
            return -1;
        }
        var file = files[index];
        var fileCount = this.newFileRef++;
        this.fileStreams[fileCount] = file;
        return fileCount;
    };
    Uploader.prototype.uploadFiles = function (files, custom) {
        var selectedFiles = [];
        if (this.asyncSettings.saveUrl === '' || isNullOrUndefined(this.asyncSettings.saveUrl)) {
            return;
        }
        if (!custom || isNullOrUndefined(custom)) {
            if (!this.multiple) {
                var file = [];
                file.push(files[0]);
                selectedFiles = this.filterfileList(file);
            }
            else {
                selectedFiles = this.filterfileList(files);
            }
        }
        else {
            selectedFiles = files;
        }
        for (var i = 0; i < selectedFiles.length; i++) {
            this.uploadFilesRequest(selectedFiles, i, custom);
        }
    };
    Uploader.prototype.uploadFilesRequest = function (selectedFiles, i, custom) {
        var _this = this;
        var chunkEnabled = this.checkChunkUpload();
        var ajax = new Ajax(this.asyncSettings.saveUrl, 'POST', true, null);
        ajax.emitError = false;
        var eventArgs = {
            fileData: selectedFiles[i],
            customFormData: [],
            cancel: false
        };
        var formData = new FormData();
        ajax.beforeSend = function (e) {
            eventArgs.currentRequest = ajax.httpRequest;
            _this.trigger('uploading', eventArgs, function (eventArgs) {
                /* istanbul ignore next */
                if (eventArgs.cancel) {
                    _this.eventCancelByArgs(e, eventArgs, selectedFiles[i]);
                }
                if (_this.customFormDatas && _this.customFormDatas.length > 0) {
                    _this.updateFormData(formData, _this.customFormDatas);
                }
                _this.updateFormData(formData, eventArgs.customFormData);
            });
        };
        if (selectedFiles[i].statusCode === '1') {
            var name_4 = this.element.getAttribute('name');
            formData.append(name_4, selectedFiles[i].rawFile, selectedFiles[i].name);
            if (chunkEnabled && selectedFiles[i].size > this.asyncSettings.chunkSize) {
                this.chunkUpload(selectedFiles[i], custom, i);
            }
            else {
                ajax.onLoad = function (e) {
                    if (eventArgs.cancel) {
                        return {};
                    }
                    else {
                        _this.uploadComplete(e, selectedFiles[i], custom);
                        return {};
                    }
                };
                ajax.onUploadProgress = function (e) {
                    if (eventArgs.cancel) {
                        return {};
                    }
                    else {
                        _this.uploadInProgress(e, selectedFiles[i], custom, ajax);
                        return {};
                    }
                };
                /* istanbul ignore next */
                ajax.onError = function (e) {
                    _this.uploadFailed(e, selectedFiles[i]);
                    return {};
                };
                ajax.send(formData);
            }
        }
    };
    Uploader.prototype.spliceFiles = function (liIndex) {
        var liElement = this.fileList[liIndex];
        var allFiles = this.getFilesData();
        var nameElements = +liElement.getAttribute('data-files-count');
        var startIndex = 0;
        for (var i = 0; i < liIndex; i++) {
            startIndex += (+this.fileList[i].getAttribute('data-files-count'));
        }
        var endIndex = (startIndex + nameElements) - 1;
        for (var j = endIndex; j >= startIndex; j--) {
            allFiles.splice(j, 1);
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Remove the uploaded file from server manually by calling the remove URL action.
     * If you pass an empty argument to this method, the complete file list can be cleared,
     * otherwise remove the specific file based on its argument (“file_data”).
     *
     * @param { FileInfo | FileInfo[] } fileData - specifies the files data to remove from file list/server.
     * @param { boolean } customTemplate - Set true if the component rendering with customize template.
     * @param { boolean } removeDirectly - Set true if files remove without removing event.
     * @param { boolean } postRawFile - Set false, to post file name only to the remove action.
     * @returns {void}
     */
    Uploader.prototype.remove = function (fileData, customTemplate, removeDirectly, postRawFile, args) {
        var _this = this;
        if (isNullOrUndefined(postRawFile)) {
            postRawFile = true;
        }
        var eventArgs = {
            event: args,
            cancel: false,
            filesData: [],
            customFormData: [],
            postRawFile: postRawFile,
            currentRequest: null
        };
        var beforeEventArgs = {
            cancel: false,
            customFormData: [],
            currentRequest: null
        };
        this.trigger('beforeRemove', beforeEventArgs, function (beforeEventArgs) {
            if (!beforeEventArgs.cancel) {
                if (_this.isFormUpload()) {
                    eventArgs.filesData = fileData;
                    _this.trigger('removing', eventArgs, function (eventArgs) {
                        if (!eventArgs.cancel) {
                            var removingFiles = _this.getFilesInArray(fileData);
                            var isLiRemoved = false;
                            var liIndex = void 0;
                            for (var _i = 0, removingFiles_1 = removingFiles; _i < removingFiles_1.length; _i++) {
                                var data = removingFiles_1[_i];
                                if (!isLiRemoved) {
                                    liIndex = _this.fileList.indexOf(data.list);
                                }
                                if (liIndex > -1) {
                                    var inputElement = !isNullOrUndefined(data.input) ? data.input : null;
                                    if (inputElement) {
                                        detach(inputElement);
                                    }
                                    _this.spliceFiles(liIndex);
                                    detach(_this.fileList[liIndex]);
                                    _this.fileList.splice(liIndex, 1);
                                    isLiRemoved = true;
                                    liIndex = -1;
                                }
                            }
                        }
                    });
                }
                else if (_this.isForm && (isNullOrUndefined(_this.asyncSettings.removeUrl) || _this.asyncSettings.removeUrl === '')) {
                    eventArgs.filesData = _this.getFilesData();
                    _this.trigger('removing', eventArgs, function (eventArgs) {
                        if (!eventArgs.cancel) {
                            _this.clearAll();
                        }
                    });
                }
                else {
                    var removeFiles = [];
                    fileData = !isNullOrUndefined(fileData) ? fileData : _this.filesData;
                    if (fileData instanceof Array) {
                        removeFiles = fileData;
                    }
                    else {
                        removeFiles.push(fileData);
                    }
                    eventArgs.filesData = removeFiles;
                    var removeUrl = _this.asyncSettings.removeUrl;
                    var validUrl = (removeUrl === '' || isNullOrUndefined(removeUrl)) ? false : true;
                    var _loop_5 = function (files) {
                        var fileUploadedIndex = _this.uploadedFilesData.indexOf(files);
                        if ((files.statusCode === '2' || files.statusCode === '4' || (files.statusCode === '0' &&
                            fileUploadedIndex !== -1)) && validUrl) {
                            _this.removeUploadedFile(files, eventArgs, removeDirectly, customTemplate);
                        }
                        else {
                            if (!removeDirectly) {
                                _this.trigger('removing', eventArgs, function (eventArgs) {
                                    if (!eventArgs.cancel) {
                                        _this.removeFilesData(files, customTemplate);
                                    }
                                });
                            }
                            else {
                                _this.removeFilesData(files, customTemplate);
                            }
                        }
                        if (args && !args.target.classList.contains(REMOVE_ICON)) {
                            _this.checkActionComplete(false);
                        }
                    };
                    for (var _i = 0, removeFiles_1 = removeFiles; _i < removeFiles_1.length; _i++) {
                        var files = removeFiles_1[_i];
                        _loop_5(files);
                    }
                }
            }
        });
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    /**
     * Clear all the file entries from list that can be uploaded files or added in upload queue.
     *
     * @returns {void}
     */
    Uploader.prototype.clearAll = function () {
        var _this = this;
        if (isNullOrUndefined(this.listParent)) {
            if (this.browserName !== 'msie') {
                this.element.value = '';
            }
            this.filesData = [];
            return;
        }
        var eventArgs = {
            cancel: false,
            filesData: this.filesData
        };
        this.trigger('clearing', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel) {
                _this.clearData();
                _this.actionCompleteCount = 0;
                _this.count = -1;
            }
        });
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Get the data of files which are shown in file list.
     *
     * @param { number } index - specifies the file list item(li) index.
     * @returns {FileInfo[]}
     */
    Uploader.prototype.getFilesData = function (index) {
        if (isNullOrUndefined(index)) {
            return this.filesData;
        }
        else {
            return this.getSelectedFiles(index);
        }
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Pauses the in-progress chunked upload based on the file data.
     *
     * @param { FileInfo | FileInfo[] } fileData - specifies the files data to pause from uploading.
     * @param { boolean } custom - Set true if used custom UI.
     * @returns {void}
     */
    Uploader.prototype.pause = function (fileData, custom) {
        fileData = fileData ? fileData : this.filesData;
        var fileDataFiles = this.getFilesInArray(fileData);
        this.pauseUploading(fileDataFiles, custom);
    };
    Uploader.prototype.pauseUploading = function (fileData, custom) {
        var files = this.getFiles(fileData);
        for (var i = 0; i < files.length; i++) {
            if (files[i].statusCode === '3') {
                this.pauseUpload(this.getCurrentMetaData(files[i], null), null, custom);
            }
        }
    };
    Uploader.prototype.getFiles = function (fileData) {
        var files = [];
        if (!isNullOrUndefined(fileData) && !(fileData instanceof Array)) {
            files.push(fileData);
        }
        else {
            files = fileData;
        }
        return files;
    };
    /**
     * Resumes the chunked upload that is previously paused based on the file data.
     *
     * @param { FileInfo | FileInfo[] } fileData - specifies the files data to resume the paused file.
     * @param { boolean } custom - Set true if used custom UI.
     * @returns {void}
     */
    Uploader.prototype.resume = function (fileData, custom) {
        fileData = fileData ? fileData : this.filesData;
        var fileDataFiles = this.getFilesInArray(fileData);
        this.resumeFiles(fileDataFiles, custom);
    };
    Uploader.prototype.resumeFiles = function (fileData, custom) {
        var files = this.getFiles(fileData);
        for (var i = 0; i < files.length; i++) {
            if (files[i].statusCode === '4') {
                this.resumeUpload(this.getCurrentMetaData(files[i], null), null, custom);
            }
        }
    };
    /**
     * Retries the canceled or failed file upload based on the file data.
     *
     * @param { FileInfo | FileInfo[] } fileData - specifies the files data to retry the canceled or failed file.
     * @param { boolean } fromcanceledStage - Set true to retry from canceled stage and set false to retry from initial stage.
     * @param {boolean} custom -Specifies whether the uploader is rendered with custom file list.
     * @returns {void}
     */
    Uploader.prototype.retry = function (fileData, fromcanceledStage, custom) {
        fileData = fileData ? fileData : this.filesData;
        var fileDataFiles = this.getFilesInArray(fileData);
        if (this.sequentialUpload && this.isFirstFileOnSelection) {
            this.isFirstFileOnSelection = false;
        }
        this.retryFailedFiles(fileDataFiles, fromcanceledStage, custom);
    };
    Uploader.prototype.retryFailedFiles = function (fileData, fromcanceledStage, custom) {
        var files = this.getFiles(fileData);
        for (var i = 0; i < files.length; i++) {
            if (files[i].statusCode === '5' || files[i].statusCode === '0') {
                if (this.asyncSettings.chunkSize > 0 && this.getCurrentMetaData(files[i], null)) {
                    this.retryUpload(this.getCurrentMetaData(files[i], null), fromcanceledStage);
                }
                else {
                    var liElement = void 0;
                    if (!custom) {
                        liElement = this.fileList[this.filesData.indexOf(files[i])];
                    }
                    this.reloadcanceledFile(null, files[i], liElement, custom);
                }
            }
        }
    };
    /**
     * Stops the in-progress chunked upload based on the file data.
     * When the file upload is canceled, the partially uploaded file is removed from server.
     *
     * @param { FileInfo | FileInfo[] } fileData - specifies the files data to cancel the progressing file.
     * @returns {void}
     */
    Uploader.prototype.cancel = function (fileData) {
        fileData = fileData ? fileData : this.filesData;
        var cancelingFiles = this.getFilesInArray(fileData);
        this.cancelUpload(cancelingFiles);
    };
    Uploader.prototype.cancelUpload = function (fileData) {
        var files = this.getFiles(fileData);
        if (this.asyncSettings.chunkSize > 0) {
            for (var i = 0; i < files.length; i++) {
                if (files[i].statusCode === '3') {
                    var metaData = this.getCurrentMetaData(files[i], null);
                    metaData.file.statusCode = '5';
                    metaData.file.status = this.localizedTexts('fileUploadCancel');
                    this.updateMetaData(metaData);
                    this.showHideUploadSpinner(files[i]);
                }
            }
        }
        else {
            for (var i = 0; i < files.length; i++) {
                if (files[i].statusCode === '3') {
                    files[i].statusCode = '5';
                    files[i].status = this.localizedTexts('fileUploadCancel');
                    this.showHideUploadSpinner(files[i]);
                }
            }
        }
    };
    Uploader.prototype.showHideUploadSpinner = function (files) {
        var liElement = this.getLiElement(files);
        if (!isNullOrUndefined(liElement) && isNullOrUndefined(this.template)) {
            var spinnerTarget = liElement.querySelector('.' + ABORT_ICON);
            createSpinner({ target: spinnerTarget, width: '20px' });
            showSpinner(spinnerTarget);
        }
    };
    __decorate$4([
        Complex({ saveUrl: '', removeUrl: '' }, AsyncSettings)
    ], Uploader.prototype, "asyncSettings", void 0);
    __decorate$4([
        Property(false)
    ], Uploader.prototype, "sequentialUpload", void 0);
    __decorate$4([
        Property({})
    ], Uploader.prototype, "htmlAttributes", void 0);
    __decorate$4([
        Property('')
    ], Uploader.prototype, "cssClass", void 0);
    __decorate$4([
        Property(true)
    ], Uploader.prototype, "enabled", void 0);
    __decorate$4([
        Property(null)
    ], Uploader.prototype, "template", void 0);
    __decorate$4([
        Property(true)
    ], Uploader.prototype, "multiple", void 0);
    __decorate$4([
        Property(true)
    ], Uploader.prototype, "autoUpload", void 0);
    __decorate$4([
        Property(true)
    ], Uploader.prototype, "enableHtmlSanitizer", void 0);
    __decorate$4([
        Complex({}, ButtonsProps)
    ], Uploader.prototype, "buttons", void 0);
    __decorate$4([
        Property('')
    ], Uploader.prototype, "allowedExtensions", void 0);
    __decorate$4([
        Property(0)
    ], Uploader.prototype, "minFileSize", void 0);
    __decorate$4([
        Property(30000000)
    ], Uploader.prototype, "maxFileSize", void 0);
    __decorate$4([
        Property(null)
    ], Uploader.prototype, "dropArea", void 0);
    __decorate$4([
        Collection([{}], FilesProp)
    ], Uploader.prototype, "files", void 0);
    __decorate$4([
        Property(true)
    ], Uploader.prototype, "showFileList", void 0);
    __decorate$4([
        Property(false)
    ], Uploader.prototype, "directoryUpload", void 0);
    __decorate$4([
        Property('Default')
    ], Uploader.prototype, "dropEffect", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "created", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "actionComplete", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "rendering", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "beforeUpload", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "fileListRendering", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "selected", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "uploading", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "success", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "failure", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "removing", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "beforeRemove", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "clearing", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "progress", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "change", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "chunkSuccess", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "chunkFailure", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "chunkUploading", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "canceling", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "pausing", void 0);
    __decorate$4([
        Event()
    ], Uploader.prototype, "resuming", void 0);
    Uploader = __decorate$4([
        NotifyPropertyChanges
    ], Uploader);
    return Uploader;
}(Component));
/* eslint-enable @typescript-eslint/no-explicit-any */

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
var APPLY = 'e-apply';
var CANCEL = 'e-cancel';
var CURRENT = 'e-current';
var CONTAINER = 'e-container';
var CTRLBTN = 'e-ctrl-btn';
var CTRLSWITCH = 'e-switch-ctrl-btn';
var DISABLED$1 = 'e-disabled';
var FORMATSWITCH = 'e-value-switch-btn';
var HANDLER = 'e-handler';
var HEX = 'e-hex';
var HIDEHEX = 'e-hide-hex-value';
var HIDEOPACITY = 'e-hide-opacity';
var HIDERGBA = 'e-hide-switchable-value';
var HIDEVALUE = 'e-hide-value';
var HIDEVALUESWITCH = 'e-hide-valueswitcher';
var HSVAREA = 'e-hsv-color';
var HSVCONTAINER = 'e-hsv-container';
var INPUTWRAPPER = 'e-selected-value';
var MODESWITCH = 'e-mode-switch-btn';
var NOCOLOR = 'e-nocolor-item';
var OPACITY = 'e-opacity-value';
var PALETTES = 'e-palette';
var PALETTECONTENT = 'e-color-palette';
var PICKERCONTENT = 'e-color-picker';
var PREVIEW = 'e-preview-container';
var PREVIOUS = 'e-previous';
var RTL$1 = 'e-rtl';
var SHOWVALUE = 'e-show-value';
var SELECT = 'e-selected';
var SPLITPREVIEW = 'e-split-preview';
var TILE = 'e-tile';
var presets = {
    default: ['#000000', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#ffeb3b',
        '#ffffff', '#ffebee', '#fce4ec', '#f3e5f5', '#ede7f6', '#e3f2fd', '#e1f5fe', '#e0f7fa', '#e0f2f1', '#fffde7',
        '#f2f2f2', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#fff9c4',
        '#e6e6e6', '#ef9a9a', '#f48fb1', '#ce93d8', '#b39ddb', '#90caf9', '#81d4fa', '#80deea', '#80cbc4', '#fff59d',
        '#cccccc', '#e57373', '#f06292', '#ba68c8', '#9575cd', '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#fff176',
        '#b3b3b3', '#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#42a5f5', '#29b6f6', '#26c6da', '#26a69a', '#ffee58',
        '#999999', '#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#1e88e5', '#039be5', '#00acc1', '#00897b', '#fdd835',
        '#808080', '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#1976d2', '#0288d1', '#0097a7', '#00796b', '#fbc02d',
        '#666666', '#c62828', '#ad1457', '#6a1b9a', '#4527a0', '#1565c0', '#0277bd', '#00838f', '#00695c', '#f9a825',
        '#4d4d4d', '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#0d47a1', '#01579b', '#006064', '#004d40', '#f57f17']
};
/**
 * ColorPicker component is a user interface to select and adjust color values. It provides supports for various
 * color specification like Red Green Blue, Hue Saturation Value and Hex codes.
 * ```html
 * <input type="color" id="color-picker">
 * ```
 * ```typescript
 * <script>
 *   let colorPickerObj: ColorPicker = new ColorPicker(null , "#color-picker");
 * </script>
 * ```
 */
var ColorPicker = /** @class */ (function (_super) {
    __extends$5(ColorPicker, _super);
    function ColorPicker(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.recentColors = [];
        return _this;
    }
    ColorPicker.prototype.preRender = function () {
        var ele = this.element;
        this.formElement = closest(this.element, 'form');
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
        var localeText = { Apply: 'Apply', Cancel: 'Cancel', ModeSwitcher: 'Switch Mode', RecentColors: 'Recent colors' };
        this.l10n = new L10n('colorpicker', localeText, this.locale);
        if (ele.getAttribute('ejs-for') && !ele.getAttribute('name')) {
            ele.setAttribute('name', ele.id);
        }
    };
    /**
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    ColorPicker.prototype.render = function () {
        this.initWrapper();
        if (this.inline) {
            this.createWidget();
        }
        else {
            this.createSplitBtn();
        }
        if (!this.enableOpacity) {
            addClass([this.container.parentElement], HIDEOPACITY);
        }
        this.renderComplete();
    };
    ColorPicker.prototype.initWrapper = function () {
        var wrapper = this.createElement('div', { className: 'e-' + this.getModuleName() + '-wrapper' });
        this.element.parentNode.insertBefore(wrapper, this.element);
        wrapper.appendChild(this.element);
        attributes(this.element, { 'tabindex': '-1', 'spellcheck': 'false', 'aria-label': 'colorpicker' });
        this.container = this.createElement('div', { className: CONTAINER });
        this.getWrapper().appendChild(this.container);
        var value = this.value ? this.roundValue(this.value).toLowerCase() : '#008000ff';
        if (this.noColor && this.mode === 'Palette' && this.value === '') {
            value = '';
        }
        var slicedValue = value.slice(0, 7);
        if (isNullOrUndefined(this.initialInputValue)) {
            this.initialInputValue = slicedValue;
        }
        this.element.value = slicedValue;
        if (this.enableOpacity) {
            this.setProperties({ 'value': value }, true);
        }
        else {
            this.setProperties({ 'value': slicedValue }, true);
        }
        if (this.enableRtl) {
            wrapper.classList.add(RTL$1);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        this.tileRipple = rippleEffect(this.container, { selector: '.' + TILE });
        this.ctrlBtnRipple = rippleEffect(this.container, { selector: '.e-btn' });
    };
    ColorPicker.prototype.getWrapper = function () {
        return this.element.parentElement;
    };
    ColorPicker.prototype.createWidget = function () {
        if (this.mode === 'Palette') {
            this.createPalette();
            if (!this.inline) {
                this.firstPaletteFocus();
            }
        }
        else {
            this.createPicker();
            if (!this.inline) {
                this.getDragHandler().focus();
            }
        }
        this.isRgb = true;
        this.createInput();
        this.createCtrlBtn();
        if (!this.disabled) {
            this.wireEvents();
        }
        if (this.inline && this.disabled) {
            this.toggleDisabled(true);
        }
        if (Browser.isDevice) {
            this.refreshPopupPos();
        }
    };
    ColorPicker.prototype.createSplitBtn = function () {
        var _this = this;
        var splitButton = this.createElement('button', { className: 'e-split-colorpicker' });
        this.getWrapper().appendChild(splitButton);
        this.splitBtn = new SplitButton({
            iconCss: 'e-selected-color',
            target: this.container,
            disabled: this.disabled,
            enableRtl: this.enableRtl,
            createPopupOnClick: this.createPopupOnClick,
            open: this.onOpen.bind(this),
            click: function () {
                var ev = new MouseEvent('click', { bubbles: true, cancelable: false });
                _this.trigger('change', {
                    currentValue: { hex: _this.value.slice(0, 7), rgba: _this.convertToRgbString(_this.hexToRgb(_this.value)) },
                    previousValue: { hex: null, rgba: null }, value: _this.value, event: ev
                });
            }
        });
        this.splitBtn.createElement = this.createElement;
        this.splitBtn.appendTo(splitButton);
        this.splitBtn.element.setAttribute('aria-label', 'colorpicker');
        var preview = this.createElement('span', { className: SPLITPREVIEW });
        select('.e-selected-color', splitButton).appendChild(preview);
        preview.style.backgroundColor = this.convertToRgbString(this.hexToRgb(this.value));
        var popupEle = this.getPopupEle();
        addClass([popupEle], 'e-colorpicker-popup');
        if (this.cssClass) {
            addClass([popupEle], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (Browser.isDevice && !this.createPopupOnClick) {
            var popupInst = this.getPopupInst();
            popupInst.relateTo = document.body;
            popupInst.position = { X: 'center', Y: 'center' };
            popupInst.targetType = 'container';
            popupInst.collision = { X: 'fit', Y: 'fit' };
            popupInst.offsetY = 4;
            popupEle.style.zIndex = getZindexPartial(this.splitBtn.element).toString();
        }
        this.bindCallBackEvent();
    };
    ColorPicker.prototype.onOpen = function () {
        this.trigger('open', { element: this.container });
        if (!Browser.isDevice) {
            var popupInst = this.getPopupInst();
            var collision = isCollide(popupInst.element);
            if (collision.length > 0) {
                popupInst.collision = { X: 'flip', Y: 'fit' };
                popupInst.position = { X: 'right', Y: 'bottom' };
                popupInst.targetType = 'container';
            }
        }
    };
    ColorPicker.prototype.getPopupInst = function () {
        return getInstance(this.getPopupEle(), Popup);
    };
    ColorPicker.prototype.bindCallBackEvent = function () {
        var _this = this;
        this.splitBtn.beforeOpen = function (args) {
            var callBackPromise = new Deferred();
            _this.trigger('beforeOpen', args, function (observeOpenArgs) {
                if (!observeOpenArgs.cancel) {
                    var popupEle = _this.getPopupEle();
                    popupEle.style.top = formatUnit(0 + pageYOffset);
                    popupEle.style.left = formatUnit(0 + pageXOffset);
                    popupEle.style.display = 'block';
                    _this.createWidget();
                    popupEle.style.display = '';
                    if (Browser.isDevice) {
                        if (_this.createPopupOnClick) {
                            var popupInst = _this.getPopupInst();
                            popupInst.relateTo = document.body;
                            popupInst.position = { X: 'center', Y: 'center' };
                            popupInst.targetType = 'container';
                            popupInst.collision = { X: 'fit', Y: 'fit' };
                            popupInst.offsetY = 4;
                            popupEle.style.zIndex = getZindexPartial(_this.splitBtn.element).toString();
                        }
                        _this.modal = _this.createElement('div');
                        _this.modal.className = 'e-' + _this.getModuleName() + ' e-modal';
                        _this.modal.style.display = 'none';
                        document.body.insertBefore(_this.modal, popupEle);
                        document.body.className += ' e-colorpicker-overflow';
                        _this.modal.style.display = 'block';
                        _this.modal.style.zIndex = (Number(popupEle.style.zIndex) - 1).toString();
                    }
                }
                args.cancel = observeOpenArgs.cancel;
                callBackPromise.resolve(observeOpenArgs);
            });
            return callBackPromise;
        };
        this.splitBtn.beforeClose = function (args) {
            var callBackPromise = new Deferred();
            if (!isNullOrUndefined(args.event)) {
                var beforeCloseArgs = { element: _this.container, event: args.event, cancel: false };
                _this.trigger('beforeClose', beforeCloseArgs, function (observedCloseArgs) {
                    if (Browser.isDevice && args.event.target === _this.modal) {
                        observedCloseArgs.cancel = true;
                    }
                    if (!observedCloseArgs.cancel) {
                        _this.onPopupClose();
                    }
                    args.cancel = observedCloseArgs.cancel;
                    callBackPromise.resolve(observedCloseArgs);
                });
            }
            else {
                callBackPromise.resolve(args);
            }
            return callBackPromise;
        };
    };
    ColorPicker.prototype.onPopupClose = function () {
        this.unWireEvents();
        this.destroyOtherComp();
        this.container.style.width = '';
        select('.' + SPLITPREVIEW, this.splitBtn.element).style.backgroundColor
            = this.convertToRgbString(this.hexToRgb(this.value));
        this.container.innerHTML = '';
        removeClass([this.container], [PICKERCONTENT, PALETTECONTENT]);
        if (Browser.isDevice && this.modal) {
            removeClass([document.body], 'e-colorpicker-overflow');
            this.modal.style.display = 'none';
            this.modal.outerHTML = '';
            this.modal = null;
        }
    };
    ColorPicker.prototype.createPalette = function () {
        classList(this.container, [PALETTECONTENT], [PICKERCONTENT]);
        if (this.presetColors) {
            var paletteGroup = this.createElement('div', { className: 'e-custom-palette' });
            this.appendElement(paletteGroup);
            var keys = Object.keys(this.presetColors);
            if (keys.length === 1) {
                this.appendPalette(this.presetColors[keys[0]], keys[0], paletteGroup);
            }
            else {
                for (var i = 0, len = keys.length; i < len; i++) {
                    this.appendPalette(this.presetColors[keys[i]], keys[i], paletteGroup);
                }
            }
            if (selectAll('.e-row', paletteGroup).length > 10) {
                addClass([paletteGroup], 'e-palette-group');
            }
        }
        else {
            this.appendPalette(presets.default, 'default');
        }
        if (this.mode === 'Palette' && !this.modeSwitcher && this.noColor) {
            this.setNoColor();
        }
        if (this.showRecentColors && this.recentColors && this.recentColors.length > 0) {
            this.renderRecentColor();
        }
        var width = parseInt(getComputedStyle(this.container).borderBottomWidth, 10);
        this.container.style.width = formatUnit(this.container.children[0].offsetWidth + width + width);
        this.rgb = this.hexToRgb(this.roundValue(this.value));
        this.hsv = this.rgbToHsv.apply(this, this.rgb);
    };
    ColorPicker.prototype.renderRecentColor = function () {
        var _this = this;
        var recentClrWpr = this.container.querySelector('.e-clr-pal-rec-wpr');
        if (recentClrWpr) {
            detach(recentClrWpr);
        }
        var recentColorWrapper = this.createElement('div', { className: 'e-clr-pal-rec-wpr' });
        var refEle = this.container.querySelector('.e-switch-ctrl-btn');
        if (refEle) {
            this.container.insertBefore(recentColorWrapper, refEle);
        }
        else {
            this.container.appendChild(recentColorWrapper);
        }
        var recentClrSpan = this.createElement('label', { className: 'e-recent-clr-span' });
        recentClrSpan.textContent = this.l10n.getConstant('RecentColors');
        recentColorWrapper.appendChild(recentClrSpan);
        if (this.recentColors.length > 0) {
            this.recentColors = this.recentColors.filter(function (item, index) { return _this.recentColors.indexOf(item) === index; });
            while (this.recentColors.length > 10) {
                this.recentColors.pop();
            }
            this.appendPalette(this.recentColors, 'recent-color', recentColorWrapper);
        }
    };
    ColorPicker.prototype.firstPaletteFocus = function () {
        if (!select('.' + SELECT, this.container.children[0])) {
            selectAll('.' + PALETTES, this.container)[0].focus();
        }
    };
    ColorPicker.prototype.appendPalette = function (colors, key, refEle) {
        var palette = this.createElement('div', { className: PALETTES, attrs: { 'tabindex': '0', 'role': 'grid' } });
        if (key === 'recent-color') {
            palette.classList.add('e-recent-palette');
        }
        if (refEle) {
            refEle.appendChild(palette);
        }
        else {
            this.appendElement(palette);
        }
        var row;
        var tile;
        var roundedColor;
        for (var i = 0, len = colors.length; i < len; i++) {
            if (i === 0 || i % this.columns === 0) {
                row = this.createElement('div', {
                    className: 'e-row', attrs: { 'role': 'row' }
                });
                palette.appendChild(row);
            }
            roundedColor = this.roundValue(colors[i]).toLowerCase();
            tile = this.createElement('span', {
                className: TILE, attrs: { 'role': 'gridcell', 'aria-label': roundedColor, 'aria-selected': 'false' }
            });
            this.trigger('beforeTileRender', { element: tile, presetName: key, value: colors[i] });
            row.appendChild(tile);
            if (this.value === roundedColor && key !== 'recent-color') {
                this.addTileSelection(tile);
                palette.focus();
            }
            tile.style.backgroundColor = this.convertToRgbString(this.hexToRgb(roundedColor));
        }
    };
    ColorPicker.prototype.setNoColor = function () {
        var noColorEle = this.container.querySelector('.e-row').children[0];
        noColorEle.classList.add(NOCOLOR);
        if (!this.value) {
            noColorEle.classList.add(SELECT);
            closest(noColorEle, '.' + PALETTES).focus();
        }
        ['aria-selected', 'aria-label'].forEach(function (attr) { noColorEle.removeAttribute(attr); });
        noColorEle.style.backgroundColor = '';
    };
    ColorPicker.prototype.appendElement = function (ele, insertPos) {
        if (insertPos === void 0) { insertPos = 0; }
        var refEle = this.container.children[insertPos];
        if (refEle) {
            this.container.insertBefore(ele, refEle);
        }
        else {
            this.container.appendChild(ele);
        }
    };
    ColorPicker.prototype.addTileSelection = function (ele) {
        if (ele) {
            ele.classList.add(SELECT);
            ele.setAttribute('aria-selected', 'true');
        }
    };
    ColorPicker.prototype.createPicker = function () {
        classList(this.container, [PICKERCONTENT], [PALETTECONTENT]);
        var hsvContainer = this.createElement('div', { className: HSVCONTAINER });
        this.appendElement(hsvContainer);
        hsvContainer.appendChild(this.createElement('div', { className: HSVAREA }));
        var dragHandler = this.createElement('span', { className: HANDLER, attrs: { 'tabindex': '0' } });
        hsvContainer.appendChild(dragHandler);
        if (this.value === null || this.value === '') {
            this.value = '#008000ff';
        }
        this.rgb = this.hexToRgb(this.value);
        this.hsv = this.rgbToHsv.apply(this, this.rgb);
        this.setHsvContainerBg();
        this.setHandlerPosition();
        this.createSlider();
        this.createDragTooltip();
    };
    ColorPicker.prototype.setHsvContainerBg = function (h) {
        if (h === void 0) { h = this.hsv[0]; }
        this.getHsvContainer().style.backgroundColor = this.convertToRgbString(this.hsvToRgb(h, 100, 100, 1));
    };
    ColorPicker.prototype.getHsvContainer = function () {
        return select('.' + HSVCONTAINER, this.container);
    };
    ColorPicker.prototype.setHandlerPosition = function () {
        var dragHandler = this.getDragHandler();
        var hsvArea = select('.' + HSVAREA, this.container);
        if (this.enableRtl) {
            dragHandler.style.left = formatUnit((hsvArea.offsetWidth - dragHandler.offsetWidth / 2.5) * Math.abs(100 - this.hsv[1]) / 100);
        }
        else {
            dragHandler.style.left = formatUnit((hsvArea.offsetWidth - dragHandler.offsetWidth / 2.5) * this.hsv[1] / 100);
        }
        dragHandler.style.top = formatUnit((hsvArea.offsetHeight - dragHandler.offsetHeight / 2.5) * (100 - this.hsv[2]) / 100);
    };
    ColorPicker.prototype.createSlider = function () {
        var sliderPreviewWrapper = this.createElement('div', { className: 'e-slider-preview' });
        this.appendElement(sliderPreviewWrapper, 1);
        this.createPreview(sliderPreviewWrapper);
        var sliderWrapper = this.createElement('div', { className: 'e-colorpicker-slider' });
        sliderPreviewWrapper.insertBefore(sliderWrapper, sliderPreviewWrapper.children[0]);
        var slider = this.createElement('div', { className: 'e-hue-slider' });
        sliderWrapper.appendChild(slider);
        this.hueSlider = new Slider({
            value: this.hsv[0],
            min: 0,
            max: 359,
            enableRtl: this.enableRtl,
            enabled: !this.disabled,
            change: this.hueChange.bind(this)
        });
        this.hueSlider.createElement = this.createElement;
        this.hueSlider.appendTo(slider);
        if (this.enableOpacity) {
            slider = this.createElement('div', { className: 'e-opacity-slider' });
            sliderWrapper.appendChild(slider);
            this.createOpacitySlider(slider);
        }
    };
    ColorPicker.prototype.createOpacitySlider = function (slider) {
        this.opacitySlider = new Slider({
            value: this.rgb[3] * 100,
            min: 0,
            max: 100,
            enableRtl: this.enableRtl,
            enabled: !this.disabled,
            change: this.opacityChange.bind(this)
        });
        this.opacitySlider.createElement = this.createElement;
        this.opacitySlider.appendTo(slider);
        var opacityBgTrack = this.createElement('div', { className: 'e-opacity-empty-track' });
        slider.appendChild(opacityBgTrack);
        this.updateOpacitySliderBg();
    };
    ColorPicker.prototype.updateOpacitySliderBg = function () {
        var direction = this.enableRtl ? 'to left' : 'to right';
        var opacityEle = select('.e-opacity-empty-track', this.opacitySlider.element);
        if (opacityEle) {
            opacityEle.style.background =
                'linear-gradient(' + direction + ', rgba(' + this.rgb.slice(0, 3) + ', 0) 0%, ' +
                    this.convertToRgbString(this.rgb.slice(0, 3)) + ' 100%)';
        }
    };
    ColorPicker.prototype.hueChange = function (args) {
        this.hsv[0] = args.value;
        this.setHsvContainerBg();
        this.convertToOtherFormat();
    };
    ColorPicker.prototype.opacityChange = function (args) {
        var value = args.value;
        var pValue = this.rgbToHex(this.rgb);
        this.hsv[3] = value / 100;
        this.rgb[3] = value / 100;
        var cValue = this.rgbToHex(this.rgb);
        this.updateOpacityInput(value);
        var rgb = this.convertToRgbString(this.rgb);
        this.updatePreview(rgb);
        this.triggerEvent(cValue, pValue, rgb);
    };
    ColorPicker.prototype.updateOpacityInput = function (value) {
        if (this.enableOpacity && !this.getWrapper().classList.contains(HIDEVALUE)) {
            var opacityTextBoxInst = getInstance(select('.' + OPACITY, this.container), NumericTextBox);
            opacityTextBoxInst.value = value;
            opacityTextBoxInst.dataBind();
        }
    };
    ColorPicker.prototype.createPreview = function (parentEle) {
        var previewContainer = this.createElement('div', { className: PREVIEW });
        parentEle.appendChild(previewContainer);
        var preview = this.createElement('span', { className: 'e-preview ' + CURRENT });
        previewContainer.appendChild(preview);
        var colorValue = this.convertToRgbString(this.rgb);
        preview.style.backgroundColor = colorValue;
        preview = this.createElement('span', { className: 'e-preview ' + PREVIOUS });
        previewContainer.appendChild(preview);
        preview.style.backgroundColor = colorValue;
    };
    ColorPicker.prototype.isPicker = function () {
        return !this.container.classList.contains(PALETTECONTENT);
    };
    ColorPicker.prototype.getPopupEle = function () {
        return this.container.parentElement;
    };
    ColorPicker.prototype.createNumericInput = function (element, value, label, max) {
        var _this = this;
        var numericInput = new NumericTextBox({
            value: value,
            placeholder: label,
            min: 0,
            max: max,
            format: '###.##',
            showSpinButton: false,
            floatLabelType: 'Always',
            enableRtl: this.enableRtl,
            enabled: !this.disabled,
            readonly: this.isPicker() ? false : true,
            change: function (args) {
                if (args.event) {
                    _this.inputHandler(args.event);
                }
            }
        });
        numericInput.createElement = this.createElement;
        numericInput.appendTo(element);
    };
    ColorPicker.prototype.createInput = function () {
        var isPicker = this.isPicker();
        var wrapper = this.getWrapper();
        if ((isPicker && !wrapper.classList.contains(HIDEVALUE)) || (!isPicker && wrapper.classList.contains(SHOWVALUE))) {
            var inputWrap = this.createElement('div', { className: INPUTWRAPPER });
            if (isPicker) {
                this.appendElement(inputWrap, 2);
            }
            else {
                this.appendElement(inputWrap, 1);
            }
            var container = this.createElement('div', { className: 'e-input-container' });
            inputWrap.appendChild(container);
            if (!wrapper.classList.contains(HIDEVALUESWITCH)) {
                this.appendValueSwitchBtn(inputWrap);
            }
            if (!wrapper.classList.contains(HIDEHEX)) {
                var hexInput = this.createElement('input', {
                    className: HEX,
                    attrs: { 'maxlength': '7', 'spellcheck': 'false', 'aria-label': 'HEX' }
                });
                container.appendChild(hexInput);
                Input.createInput({
                    element: hexInput,
                    floatLabelType: 'Always',
                    properties: {
                        placeholder: 'HEX',
                        enableRtl: this.enableRtl,
                        enabled: !this.disabled,
                        readonly: this.isPicker() ? false : true
                    }
                }, this.createElement);
                Input.setValue(this.value.slice(0, 7), hexInput);
                hexInput.addEventListener('input', this.inputHandler.bind(this));
            }
            if (!wrapper.classList.contains(HIDERGBA)) {
                var label = void 0;
                var value = void 0;
                if (this.isRgb) {
                    label = 'RGB';
                    value = this.rgb;
                }
                else {
                    label = 'HSV';
                    value = this.hsv;
                }
                var clsName = ['rh', 'gs', 'bv'];
                for (var i = 0; i < 3; i++) {
                    this.createNumericInput(container.appendChild(this.createElement('input', { className: 'e-' + clsName[i] + '-value' })), value[i], label[i], 255);
                }
                if (this.enableOpacity) {
                    this.appendOpacityValue(container);
                }
            }
        }
    };
    ColorPicker.prototype.appendOpacityValue = function (container) {
        this.createNumericInput(container.appendChild(this.createElement('input', { className: OPACITY })), this.rgb[3] * 100, 'A', 100);
    };
    ColorPicker.prototype.appendValueSwitchBtn = function (targetEle) {
        var valueSwitchBtn = this.createElement('button', {
            className: 'e-icons e-css e-btn e-flat e-icon-btn ' + FORMATSWITCH,
            attrs: { 'title': 'Toggle format' }
        });
        targetEle.appendChild(valueSwitchBtn);
        if (this.isPicker() && !this.getWrapper().classList.contains(HIDERGBA)) {
            valueSwitchBtn.addEventListener('click', this.formatSwitchHandler.bind(this));
        }
    };
    ColorPicker.prototype.createCtrlBtn = function () {
        if (this.modeSwitcher || this.showButtons) {
            this.l10n.setLocale(this.locale);
            var btnWrapper = this.createElement('div', { className: CTRLSWITCH });
            this.container.appendChild(btnWrapper);
            if (this.showButtons) {
                var controlBtnWrapper = this.createElement('div', { className: CTRLBTN });
                btnWrapper.appendChild(controlBtnWrapper);
                var apply = this.l10n.getConstant('Apply');
                controlBtnWrapper.appendChild(this.createElement('button', {
                    innerHTML: apply,
                    className: 'e-btn e-css e-flat e-primary e-small ' + APPLY,
                    attrs: { 'title': apply }
                }));
                var cancel = this.l10n.getConstant('Cancel');
                controlBtnWrapper.appendChild(this.createElement('button', {
                    innerHTML: cancel,
                    className: 'e-btn e-css e-flat e-small ' + CANCEL,
                    attrs: { 'title': cancel }
                }));
            }
            if (this.modeSwitcher) {
                this.appendModeSwitchBtn();
            }
        }
    };
    ColorPicker.prototype.appendModeSwitchBtn = function () {
        var modeSwitcher = this.createElement('button', {
            className: 'e-icons e-btn e-flat e-icon-btn ' + MODESWITCH, attrs: { title: this.l10n.getConstant('ModeSwitcher') }
        });
        select('.' + CTRLSWITCH, this.container).insertBefore(modeSwitcher, select('.' + CTRLBTN, this.container));
    };
    ColorPicker.prototype.createDragTooltip = function () {
        var _this = this;
        var tooltip = new Tooltip({
            opensOn: 'Custom',
            showTipPointer: false,
            cssClass: 'e-color-picker-tooltip',
            htmlAttributes: { title: 'tooltip' },
            beforeOpen: function (args) {
                _this.tooltipEle = args.element;
            },
            animation: { open: { effect: 'None' }, close: { effect: 'None' } }
        });
        tooltip.createElement = this.createElement;
        tooltip.appendTo(this.container);
        tooltip.open(this.container);
        this.tooltipEle.style.zIndex = getZindexPartial(this.tooltipEle).toString();
        this.tooltipEle.setAttribute('aria-label', 'colorpicker-tooltip');
        select('.e-tip-content', this.tooltipEle).appendChild(this.createElement('div', { className: 'e-tip-transparent' }));
    };
    ColorPicker.prototype.getTooltipInst = function () {
        return getInstance(this.container, Tooltip);
    };
    ColorPicker.prototype.setTooltipOffset = function (value) {
        this.getTooltipInst().offsetY = value;
    };
    ColorPicker.prototype.toggleDisabled = function (enable) {
        if (enable) {
            this.getWrapper().classList.add(DISABLED$1);
        }
        else {
            this.getWrapper().classList.remove(DISABLED$1);
        }
        if (this.showButtons) {
            ([].slice.call(selectAll('.e-btn', this.container))).forEach(function (ele) {
                if (enable) {
                    attributes(ele, { 'disabled': '' });
                }
                else {
                    ele.removeAttribute('disabled');
                }
            });
        }
    };
    ColorPicker.prototype.convertToRgbString = function (rgb) {
        return rgb.length ? rgb.length === 4 ? 'rgba(' + rgb.join() + ')' : 'rgb(' + rgb.join() + ')' : '';
    };
    ColorPicker.prototype.convertToHsvString = function (hsv) {
        return hsv.length === 4 ? 'hsva(' + hsv.join() + ')' : 'hsv(' + hsv.join() + ')';
    };
    ColorPicker.prototype.updateHsv = function () {
        this.hsv[1] = this.hsv[1] > 100 ? 100 : this.hsv[1];
        this.hsv[2] = this.hsv[2] > 100 ? 100 : this.hsv[2];
        this.setHandlerPosition();
    };
    ColorPicker.prototype.convertToOtherFormat = function (isKey, e) {
        if (isKey === void 0) { isKey = false; }
        var pValue = this.rgbToHex(this.rgb);
        this.rgb = this.hsvToRgb.apply(this, this.hsv);
        var cValue = this.rgbToHex(this.rgb);
        var rgba = this.convertToRgbString(this.rgb);
        this.updatePreview(rgba);
        this.updateInput(cValue);
        this.triggerEvent(cValue, pValue, rgba, isKey, e);
    };
    ColorPicker.prototype.updateInput = function (value) {
        var wrapper = this.getWrapper();
        if (!wrapper.classList.contains(HIDEVALUE)) {
            if (!wrapper.classList.contains(HIDEHEX)) {
                Input.setValue(value.substr(0, 7), select('.' + HEX, this.container));
            }
            if (!wrapper.classList.contains(HIDERGBA)) {
                if (this.isRgb) {
                    this.updateValue(this.rgb, false);
                }
                else {
                    this.updateValue(this.hsv, false);
                }
            }
        }
    };
    ColorPicker.prototype.updatePreview = function (value) {
        if (this.enableOpacity) {
            this.updateOpacitySliderBg();
        }
        select('.e-tip-transparent', this.tooltipEle).style.backgroundColor = value;
        select('.' + PREVIEW + ' .' + CURRENT, this.container).style.backgroundColor = value;
        select('.' + PREVIEW + ' .' + PREVIOUS, this.container).style.backgroundColor
            = this.convertToRgbString(this.hexToRgb(this.value));
    };
    ColorPicker.prototype.getDragHandler = function () {
        return select('.' + HANDLER, this.container);
    };
    ColorPicker.prototype.removeTileSelection = function () {
        var selectedEle = [].slice.call(selectAll('.' + SELECT, this.container));
        selectedEle.forEach(function (ele) {
            ele.classList.remove(SELECT);
            ele.setAttribute('aria-selected', 'false');
        });
    };
    ColorPicker.prototype.convertRgbToNumberArray = function (value) {
        return (value.slice(value.indexOf('(') + 1, value.indexOf(')'))).split(',').map(function (n, i) {
            return (i !== 3) ? parseInt(n, 10) : parseFloat(n);
        });
    };
    /**
     * To get color value in specified type.
     *
     * @param {string} value - Specify the color value.
     * @param {string} type - Specify the type to which the specified color needs to be converted.
     * @method getValue
     * @returns {string} - Color value
     */
    ColorPicker.prototype.getValue = function (value, type) {
        if (!value) {
            value = this.value;
        }
        type = !type ? 'hex' : type.toLowerCase();
        if (value[0] === 'r') {
            var cValue = this.convertRgbToNumberArray(value);
            if (type === 'hex' || type === 'hexa') {
                var hex = this.rgbToHex(cValue);
                return type === 'hex' ? hex.slice(0, 7) : hex;
            }
            else {
                if (type === 'hsv') {
                    return this.convertToHsvString(this.rgbToHsv.apply(this, cValue.slice(0, 3)));
                }
                else {
                    if (type === 'hsva') {
                        return this.convertToHsvString(this.rgbToHsv.apply(this, cValue));
                    }
                    else {
                        return 'null';
                    }
                }
            }
        }
        else {
            if (value[0] === 'h') {
                var cValue = this.hsvToRgb.apply(this, this.convertRgbToNumberArray(value));
                if (type === 'rgba') {
                    return this.convertToRgbString(cValue);
                }
                else {
                    if (type === 'hex' || type === 'hexa') {
                        var hex = this.rgbToHex(cValue);
                        return type === 'hex' ? hex.slice(0, 7) : hex;
                    }
                    else {
                        if (type === 'rgb') {
                            return this.convertToRgbString(cValue.slice(0, 3));
                        }
                        else {
                            return 'null';
                        }
                    }
                }
            }
            else {
                value = this.roundValue(value);
                var rgb = this.hexToRgb(value);
                if (type === 'rgb' || type === 'hsv') {
                    rgb = rgb.slice(0, 3);
                }
                if (type === 'rgba' || type === 'rgb') {
                    return this.convertToRgbString(rgb);
                }
                else {
                    if (type === 'hsva' || type === 'hsv') {
                        return this.convertToHsvString(this.rgbToHsv.apply(this, rgb));
                    }
                    else {
                        if (type === 'hex') {
                            return value.slice(0, 7);
                        }
                        else {
                            if (type === 'a') {
                                return rgb[3].toString();
                            }
                            else {
                                return 'null';
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * To show/hide ColorPicker popup based on current state of the SplitButton.
     *
     * @method toggle
     * @returns {void}
     */
    ColorPicker.prototype.toggle = function () {
        if (this.container.parentElement.classList.contains('e-popup-close')) {
            this.splitBtn.toggle();
        }
        else {
            this.closePopup(null);
        }
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    ColorPicker.prototype.getModuleName = function () {
        return 'colorpicker';
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    ColorPicker.prototype.getPersistData = function () {
        return this.addOnPersist(['value']);
    };
    ColorPicker.prototype.wireEvents = function () {
        if (this.isPicker()) {
            var dragHandler = this.getDragHandler();
            EventHandler.add(dragHandler, 'keydown', this.pickerKeyDown, this);
            var ctrlBtn = select('.' + CTRLBTN, this.container);
            if (ctrlBtn) {
                EventHandler.add(ctrlBtn, 'keydown', this.ctrlBtnKeyDown, this);
            }
            EventHandler.add(this.getHsvContainer(), 'mousedown touchstart', this.handlerDown, this);
            if (this.modeSwitcher || this.showButtons) {
                this.addCtrlSwitchEvent();
            }
            EventHandler.add(select('.' + PREVIOUS, this.container), 'click', this.previewHandler, this);
        }
        else {
            EventHandler.add(this.container, 'click', this.paletteClickHandler, this);
            EventHandler.add(this.container, 'keydown', this.paletteKeyDown, this);
        }
    };
    ColorPicker.prototype.formResetHandler = function () {
        this.value = this.initialInputValue;
        attributes(this.element, { 'value': this.initialInputValue });
    };
    ColorPicker.prototype.addCtrlSwitchEvent = function () {
        var ctrlSwitchBtn = select('.' + CTRLSWITCH, this.container);
        if (ctrlSwitchBtn) {
            EventHandler.add(ctrlSwitchBtn, 'click', this.btnClickHandler, this);
        }
    };
    ColorPicker.prototype.ctrlBtnKeyDown = function (e) {
        if (e.keyCode === 13) {
            var applyBtn = select('.' + APPLY, this.container);
            if (applyBtn) {
                var cValue = this.rgbToHex(this.rgb);
                this.triggerChangeEvent(cValue);
            }
            this.splitBtn.element.focus();
        }
    };
    ColorPicker.prototype.pickerKeyDown = function (e) {
        switch (e.keyCode) {
            case 39:
                this.handlerDragPosition(1, this.enableRtl ? -1 : 1, e);
                break;
            case 37:
                this.handlerDragPosition(1, this.enableRtl ? 1 : -1, e);
                break;
            case 38:
                this.handlerDragPosition(2, 1, e);
                break;
            case 40:
                this.handlerDragPosition(2, -1, e);
                break;
            case 13: {
                e.preventDefault();
                var cValue = this.rgbToHex(this.rgb);
                this.enterKeyHandler(cValue);
            }
        }
    };
    ColorPicker.prototype.enterKeyHandler = function (value) {
        this.triggerChangeEvent(value);
        if (!this.inline) {
            this.splitBtn.element.focus();
        }
    };
    ColorPicker.prototype.closePopup = function (e) {
        var _this = this;
        var beforeCloseArgs = { element: this.container, event: e, cancel: false };
        this.trigger('beforeClose', beforeCloseArgs, function (observedcloseArgs) {
            if (!observedcloseArgs.cancel) {
                _this.splitBtn.toggle();
                _this.onPopupClose();
            }
        });
    };
    ColorPicker.prototype.triggerChangeEvent = function (value, e) {
        var hex = value.slice(0, 7);
        this.trigger('change', {
            currentValue: { hex: hex, rgba: this.convertToRgbString(this.rgb) }, event: e,
            previousValue: { hex: this.value.slice(0, 7), rgba: this.convertToRgbString(this.hexToRgb(this.value)) },
            value: this.enableOpacity ? value : hex
        });
        if (this.showRecentColors) {
            this.recentColors.unshift(hex);
            if (this.inline) {
                this.renderRecentColor();
            }
        }
        if (this.enableOpacity) {
            this.setProperties({ 'value': value }, true);
        }
        else {
            this.setProperties({ 'value': hex }, true);
        }
        this.element.value = hex ? hex : '#000000';
    };
    ColorPicker.prototype.handlerDragPosition = function (prob, value, e) {
        e.preventDefault();
        this.hsv[prob] += value * (e.ctrlKey ? 1 : 3);
        if (this.hsv[prob] < 0) {
            this.hsv[prob] = 0;
        }
        this.updateHsv();
        this.convertToOtherFormat(true, e);
    };
    ColorPicker.prototype.handlerDown = function (e) {
        e.preventDefault();
        if (e.type === 'mousedown') {
            this.clientX = Math.abs(e.pageX - pageXOffset);
            this.clientY = Math.abs(e.pageY - pageYOffset);
            this.setTooltipOffset(8);
        }
        else {
            this.clientX = Math.abs(e.changedTouches[0].pageX - pageXOffset);
            this.clientY = Math.abs(e.changedTouches[0].pageY - pageYOffset);
            this.setTooltipOffset(-8);
        }
        this.setHsv(this.clientX, this.clientY);
        this.getDragHandler().style.transition = 'left .4s cubic-bezier(.25, .8, .25, 1), top .4s cubic-bezier(.25, .8, .25, 1)';
        this.updateHsv();
        this.convertToOtherFormat(false, e);
        this.getDragHandler().focus();
        EventHandler.add(document, 'mousemove touchmove', this.handlerMove, this);
        EventHandler.add(document, 'mouseup touchend', this.handlerEnd, this);
    };
    ColorPicker.prototype.handlerMove = function (e) {
        if (e.type !== 'touchmove') {
            e.preventDefault();
        }
        var x;
        var y;
        if (e.type === 'mousemove') {
            x = Math.abs(e.pageX - pageXOffset);
            y = Math.abs(e.pageY - pageYOffset);
        }
        else {
            x = Math.abs(e.changedTouches[0].pageX - pageXOffset);
            y = Math.abs(e.changedTouches[0].pageY - pageYOffset);
        }
        this.setHsv(x, y);
        var dragHandler = this.getDragHandler();
        this.updateHsv();
        this.convertToOtherFormat(false, e);
        this.getTooltipInst().refresh(dragHandler);
        if (!this.tooltipEle.style.transform) {
            if (Math.abs(this.clientX - x) > 8 || Math.abs(this.clientY - y) > 8) {
                select('.' + HSVAREA, this.container).style.cursor = 'pointer';
                dragHandler.style.transition = 'none';
                if (!this.inline) {
                    this.tooltipEle.style.zIndex = (parseInt(this.getPopupEle().style.zIndex, 10) + 1).toString();
                }
                this.tooltipEle.style.transform = 'rotate(45deg)';
                dragHandler.classList.add('e-hide-handler');
            }
        }
    };
    ColorPicker.prototype.setHsv = function (clientX, clientY) {
        var ele = select('.' + HSVAREA, this.container);
        var position = ele.getBoundingClientRect();
        if (this.enableRtl) {
            clientX = clientX > position.right ? 0 : Math.abs(clientX - position.right);
        }
        else {
            clientX = clientX > position.left ? Math.abs(clientX - position.left) : 0;
        }
        clientY = clientY > position.top ? Math.abs(clientY - position.top) : 0;
        this.hsv[2] = Math.round(Number(100 * (ele.offsetHeight -
            Math.max(0, Math.min(ele.offsetHeight, (clientY - ele.offsetTop)))) / ele.offsetHeight) * 10) / 10;
        this.hsv[1] =
            Math.round(Number(100 * (Math.max(0, Math.min(ele.offsetWidth, (clientX - ele.offsetLeft)))) / ele.offsetWidth) * 10) / 10;
    };
    ColorPicker.prototype.handlerEnd = function (e) {
        if (e.type !== 'touchend') {
            e.preventDefault();
        }
        EventHandler.remove(document, 'mousemove touchmove', this.handlerMove);
        EventHandler.remove(document, 'mouseup touchend', this.handlerEnd);
        var dragHandler = this.getDragHandler();
        select('.' + HSVAREA, this.container).style.cursor = '';
        if (this.tooltipEle.style.transform) {
            this.tooltipEle.style.transform = '';
            dragHandler.classList.remove('e-hide-handler');
        }
        if (!this.inline && !this.showButtons) {
            this.closePopup(e);
        }
    };
    ColorPicker.prototype.btnClickHandler = function (e) {
        var target = e.target;
        if (closest(target, '.' + MODESWITCH)) {
            e.stopPropagation();
            this.switchToPalette();
        }
        else {
            if (target.classList.contains(APPLY) || target.classList.contains(CANCEL)) {
                this.ctrlBtnClick(target, e);
            }
        }
    };
    ColorPicker.prototype.switchToPalette = function () {
        this.trigger('beforeModeSwitch', { element: this.container, mode: 'Palette' });
        this.unWireEvents();
        this.destroyOtherComp();
        detach(select('.e-slider-preview', this.container));
        if (!this.getWrapper().classList.contains(HIDEVALUE)) {
            remove(select('.' + INPUTWRAPPER, this.container));
        }
        detach(this.getHsvContainer());
        this.createPalette();
        this.firstPaletteFocus();
        this.createInput();
        this.refreshPopupPos();
        //for image editor popup position refreshing
        if (this.element.parentElement && this.element.parentElement.parentElement && this.element.parentElement.parentElement.classList.contains('e-ie-ddb-popup')) {
            this.refreshImageEditorPopupPos();
        }
        this.wireEvents();
        this.trigger('onModeSwitch', { element: this.container, mode: 'Palette' });
    };
    //for image editor popup position refreshing
    ColorPicker.prototype.refreshImageEditorPopupPos = function () {
        if (Browser.isDevice) {
            var popupEle = this.getPopupEle();
            popupEle.style.left = formatUnit(0 + pageXOffset);
            popupEle.style.top = formatUnit(0 + pageYOffset);
            var btnElem = document.querySelector("#" + this.element.parentElement.parentElement.id.split('-popup')[0]);
            if (btnElem) {
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                popupEle.parentElement.ej2_instances[0].refreshPosition(btnElem);
            }
        }
    };
    ColorPicker.prototype.refreshPopupPos = function () {
        if (!this.inline) {
            var popupEle = this.getPopupEle();
            popupEle.style.left = formatUnit(0 + pageXOffset);
            popupEle.style.top = formatUnit(0 + pageYOffset);
            this.getPopupInst().refreshPosition(this.splitBtn.element.parentElement);
        }
    };
    ColorPicker.prototype.formatSwitchHandler = function () {
        if (this.isRgb) {
            this.updateValue(this.hsv, true, 3, [360, 100, 100]);
            this.isRgb = false;
        }
        else {
            this.updateValue(this.rgb, true, 2);
            this.isRgb = true;
        }
    };
    ColorPicker.prototype.updateValue = function (value, format, idx, max) {
        var clsName = ['e-rh-value', 'e-gs-value', 'e-bv-value'];
        var inst;
        for (var i = 0, len = clsName.length; i < len; i++) {
            inst = getInstance(select('.' + clsName[i], this.container), NumericTextBox);
            inst.value = Math.round(value[i]);
            if (format) {
                inst.placeholder = clsName[i].substr(idx, 1).toUpperCase();
                inst.max = max ? max[i] : 255;
            }
            inst.dataBind();
        }
    };
    ColorPicker.prototype.previewHandler = function (e) {
        var target = e.target;
        var pValue = this.rgbToHex(this.rgb);
        this.rgb = this.convertRgbToNumberArray(target.style.backgroundColor);
        if (!this.rgb[3]) {
            this.rgb[3] = 1;
        }
        var cValue = this.rgbToHex(this.rgb);
        var hsv = this.rgbToHsv.apply(this, this.rgb);
        if (hsv[0] !== this.hsv[0]) {
            this.hueSlider.setProperties({ 'value': hsv[0] }, true);
            this.hueSlider.refresh();
        }
        this.setHsvContainerBg(hsv[0]);
        if (this.enableOpacity && hsv[3] !== this.hsv[3]) {
            this.opacitySlider.setProperties({ 'value': hsv[3] * 100 }, true);
            this.opacitySlider.refresh();
            this.updateOpacitySliderBg();
        }
        this.hsv = hsv;
        this.setHandlerPosition();
        this.updateInput(cValue);
        select('.' + PREVIEW + ' .' + CURRENT, this.container).style.backgroundColor = this.convertToRgbString(this.rgb);
        this.triggerEvent(cValue, pValue, this.convertToRgbString(this.rgb), false, e);
    };
    ColorPicker.prototype.paletteClickHandler = function (e) {
        e.preventDefault();
        var target = e.target;
        if (target.classList.contains(TILE)) {
            this.removeTileSelection();
            this.addTileSelection(target);
            if (target.classList.contains(NOCOLOR)) {
                this.noColorTile();
            }
            else {
                var cValue = target.getAttribute('aria-label');
                var pValue = this.rgbToHex(this.rgb);
                this.rgb = this.hexToRgb(this.roundValue(cValue));
                this.hsv = this.rgbToHsv.apply(this, this.rgb);
                if (this.getWrapper().classList.contains(SHOWVALUE)) {
                    this.updateInput(cValue);
                }
                this.triggerEvent(cValue, pValue, this.convertToRgbString(this.rgb), false, e);
            }
            if (!this.inline && !this.showButtons) {
                this.closePopup(e);
            }
        }
        else {
            if (closest(target, '.' + MODESWITCH)) {
                this.switchToPicker();
            }
            else {
                if (target.classList.contains(APPLY) || target.classList.contains(CANCEL)) {
                    this.ctrlBtnClick(target, e);
                }
                else {
                    if (this.getWrapper().classList.contains(SHOWVALUE) && closest(target, '.' + FORMATSWITCH)) {
                        this.formatSwitchHandler();
                    }
                }
            }
        }
    };
    ColorPicker.prototype.noColorTile = function (isKey) {
        if (isKey === void 0) { isKey = false; }
        var pValue = this.rgbToHex(this.rgb);
        this.rgb = [];
        this.hsv = [];
        this.triggerEvent('', pValue, '', isKey);
    };
    ColorPicker.prototype.switchToPicker = function () {
        var wrapper = this.getWrapper();
        this.trigger('beforeModeSwitch', { element: this.container, mode: 'Picker' });
        this.unWireEvents();
        ([].slice.call(selectAll('.' + PALETTES, this.container))).forEach(function (ele) {
            detach(ele);
        });
        if (this.container.querySelector('.e-clr-pal-rec-wpr')) {
            detach(this.container.querySelector('.e-clr-pal-rec-wpr'));
        }
        if (wrapper.classList.contains(SHOWVALUE)) {
            detach(select('.' + INPUTWRAPPER, this.container));
        }
        this.container.style.width = '';
        var grpEle = select('.e-custom-palette', this.container);
        if (this.presetColors) {
            remove(grpEle);
        }
        this.createPicker();
        this.getDragHandler().focus();
        this.createInput();
        this.refreshPopupPos();
        //for image editor popup position refreshing
        if (this.element.parentElement && this.element.parentElement.parentElement && this.element.parentElement.parentElement.classList.contains('e-ie-ddb-popup')) {
            this.refreshImageEditorPopupPos();
        }
        this.wireEvents();
        this.trigger('onModeSwitch', { element: this.container, mode: 'Picker' });
    };
    ColorPicker.prototype.ctrlBtnClick = function (ele, e) {
        if (ele.classList.contains(APPLY)) {
            var cValue = this.rgbToHex(this.rgb);
            this.triggerChangeEvent(cValue, e);
        }
        if (!this.inline) {
            this.closePopup(e);
            this.splitBtn.element.focus();
        }
        else if (ele.classList.contains(CANCEL)) {
            var beforeCloseArgs = { element: this.container, event: e, cancel: false };
            this.trigger('beforeClose', beforeCloseArgs);
        }
    };
    ColorPicker.prototype.paletteKeyDown = function (e) {
        var target = e.target;
        if (!target.classList.contains(PALETTES)) {
            return;
        }
        var selectedEle;
        var idx;
        var tiles = [].slice.call(selectAll('.' + TILE, target));
        var prevSelectedEle = (tiles.filter(function (tile) { return tile.classList.contains('e-selected'); })).pop();
        switch (!e.altKey && e.keyCode) {
            case 39:
                e.preventDefault();
                selectedEle = prevSelectedEle ? tiles[this.tilePosition(tiles, prevSelectedEle, this.enableRtl ? -1 : 1)]
                    : tiles[this.enableRtl ? tiles.length - 1 : 0];
                this.keySelectionChanges(selectedEle);
                break;
            case 37:
                e.preventDefault();
                selectedEle = prevSelectedEle ? tiles[this.tilePosition(tiles, prevSelectedEle, this.enableRtl ? 1 : -1)]
                    : tiles[this.enableRtl ? 0 : tiles.length - 1];
                this.keySelectionChanges(selectedEle);
                break;
            case 38:
                e.preventDefault();
                idx = prevSelectedEle ? this.tilePosition(tiles, prevSelectedEle, -this.columns) : 0;
                selectedEle = tiles[idx] ? tiles[idx] : tiles[idx - this.columns];
                this.keySelectionChanges(selectedEle);
                break;
            case 40:
                e.preventDefault();
                idx = prevSelectedEle ? this.tilePosition(tiles, prevSelectedEle, this.columns) : tiles.length - 1;
                if (tiles[idx]) {
                    selectedEle = tiles[idx];
                }
                else {
                    idx %= tiles.length;
                    idx += tiles[tiles.length - 1].parentElement.childElementCount;
                    selectedEle = tiles[idx];
                }
                this.keySelectionChanges(selectedEle);
                break;
            case 13:
                e.preventDefault();
                if (prevSelectedEle) {
                    var cValue = prevSelectedEle.getAttribute('aria-label');
                    this.enterKeyHandler(cValue ? cValue : '');
                }
                break;
        }
    };
    ColorPicker.prototype.keySelectionChanges = function (newEle) {
        this.removeTileSelection();
        this.addTileSelection(newEle);
        if (newEle.classList.contains(NOCOLOR)) {
            this.noColorTile(true);
        }
        else {
            var cValue = newEle.getAttribute('aria-label');
            var pValue = this.rgbToHex(this.rgb);
            this.rgb = this.hexToRgb(cValue);
            this.hsv = this.rgbToHsv.apply(this, this.rgb);
            if (this.getWrapper().classList.contains(SHOWVALUE)) {
                this.updateInput(cValue);
            }
            this.triggerEvent(cValue, pValue, this.convertToRgbString(this.rgb), true);
        }
    };
    ColorPicker.prototype.tilePosition = function (items, element, cIdx) {
        items = Array.prototype.slice.call(items);
        var n = items.length;
        var emptyCount = this.columns - items[n - 1].parentElement.childElementCount;
        var idx = items.indexOf(element);
        idx += cIdx;
        if (idx < 0) {
            idx += n + emptyCount;
        }
        else {
            idx %= n + emptyCount;
        }
        return idx;
    };
    ColorPicker.prototype.inputHandler = function (e) {
        var target = e.target;
        if (!target.value.length) {
            return;
        }
        var hsv;
        var pValue;
        var label = select('.e-float-text', target.parentElement).textContent;
        switch (label) {
            case 'HEX': {
                var value = '';
                if ((target.value[0] === '#' && target.value.length !== 5) || (target.value[0] !== '#' && target.value.length !== 4)) {
                    value = this.roundValue(target.value);
                }
                if (value.length === 9) {
                    pValue = this.rgbToHex(this.rgb);
                    this.rgb = this.hexToRgb(value + value.substr(-2));
                    this.inputValueChange(this.rgbToHsv.apply(this, this.rgb), pValue, target.value, e);
                }
                else {
                    return;
                }
                break;
            }
            case 'R':
                if (this.rgb[0] !== Number(target.value)) {
                    pValue = this.rgbToHex(this.rgb);
                    this.rgb[0] = Number(target.value);
                    hsv = this.rgbToHsv.apply(this, this.rgb);
                    this.inputValueChange(hsv, pValue, null, e);
                }
                break;
            case 'G':
                if (this.rgb[1] !== Number(target.value)) {
                    pValue = this.rgbToHex(this.rgb);
                    this.rgb[1] = Number(target.value);
                    hsv = this.rgbToHsv.apply(this, this.rgb);
                    this.inputValueChange(hsv, pValue, null, e);
                }
                break;
            case 'B':
                if (this.rgb[2] !== Number(target.value)) {
                    pValue = this.rgbToHex(this.rgb);
                    this.rgb[2] = Number(target.value);
                    hsv = this.rgbToHsv.apply(this, this.rgb);
                    this.inputValueChange(hsv, pValue, null, e);
                }
                break;
            case 'H':
                this.hueSlider.value = Number(target.value);
                break;
            case 'S':
                if (this.hsv[1] !== Number(target.value)) {
                    this.hsv[1] = Number(target.value);
                    this.updateHsv();
                    this.convertToOtherFormat(false, e);
                }
                break;
            case 'V':
                if (this.hsv[2] !== Number(target.value)) {
                    this.hsv[2] = Number(target.value);
                    this.updateHsv();
                    this.convertToOtherFormat(false, e);
                }
                break;
            case 'A':
                this.opacitySlider.value = Number(target.value);
                break;
        }
    };
    ColorPicker.prototype.inputValueChange = function (hsv, pValue, value, e) {
        if (hsv[0] !== this.hsv[0]) {
            this.hueSlider.setProperties({ 'value': hsv[0] }, true);
            this.hueSlider.refresh();
            this.setHsvContainerBg(hsv[0]);
        }
        this.hsv = hsv;
        var cValue = this.rgbToHex(this.rgb);
        this.setHandlerPosition();
        this.updateInput(value ? value : cValue);
        var rgba = this.convertToRgbString(this.rgb);
        this.updatePreview(rgba);
        this.triggerEvent(cValue, pValue, rgba, false, e);
    };
    ColorPicker.prototype.triggerEvent = function (cValue, pValue, rgba, isKey, e) {
        if (isKey === void 0) { isKey = false; }
        var hex = cValue.slice(0, 7);
        if (isNullOrUndefined(e)) {
            e = new MouseEvent('click', { bubbles: true, cancelable: false });
        }
        if (!this.showButtons && !isKey) {
            this.trigger('change', { currentValue: { hex: hex, rgba: rgba }, event: e,
                previousValue: { hex: this.value.slice(0, 7), rgba: this.convertToRgbString(this.hexToRgb(this.value)) }, value: cValue });
            if (this.showRecentColors) {
                this.recentColors.unshift(hex);
                if (this.inline) {
                    this.renderRecentColor();
                }
            }
            if (this.enableOpacity) {
                this.setProperties({ 'value': cValue }, true);
            }
            else {
                this.setProperties({ 'value': hex }, true);
            }
            this.element.value = hex ? hex : '#000000';
        }
        else {
            this.trigger('select', {
                currentValue: { hex: hex, rgba: rgba }, event: e,
                previousValue: { hex: pValue.slice(0, 7), rgba: this.convertToRgbString(this.hexToRgb(pValue)) }
            });
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    ColorPicker.prototype.destroy = function () {
        var _this = this;
        var wrapper = this.getWrapper();
        _super.prototype.destroy.call(this);
        ['tabindex', 'spellcheck'].forEach(function (attr) { _this.element.removeAttribute(attr); });
        if (this.inline) {
            this.unWireEvents();
            this.destroyOtherComp();
        }
        else {
            if (this.isPopupOpen()) {
                this.unWireEvents();
                this.destroyOtherComp();
            }
            this.splitBtn.destroy();
            this.splitBtn = null;
        }
        this.tileRipple();
        this.tileRipple = null;
        this.ctrlBtnRipple();
        this.ctrlBtnRipple = null;
        if (this.element.nextElementSibling) {
            detach(this.element.nextElementSibling);
        }
        if (wrapper) {
            wrapper.parentElement.insertBefore(this.element, wrapper);
            detach(wrapper);
        }
        this.container = null;
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
    };
    ColorPicker.prototype.destroyOtherComp = function () {
        if (this.isPicker()) {
            var popup = closest(this.hueSlider.element, '.e-color-picker');
            var numericElemColl = popup.querySelectorAll('.e-numerictextbox');
            for (var i = 0; i < numericElemColl.length; i++) {
                getInstance(numericElemColl[i], NumericTextBox).destroy();
            }
            this.hueSlider.destroy();
            if (this.enableOpacity) {
                this.opacitySlider.destroy();
                this.opacitySlider = null;
            }
            this.hueSlider = null;
            var tooltipInst = this.getTooltipInst();
            tooltipInst.close();
            tooltipInst.destroy();
            this.tooltipEle = null;
        }
    };
    ColorPicker.prototype.isPopupOpen = function () {
        return this.getPopupEle().classList.contains('e-popup-open');
    };
    ColorPicker.prototype.unWireEvents = function () {
        if (this.isPicker()) {
            var dragHandler = this.getDragHandler();
            EventHandler.remove(dragHandler, 'keydown', this.pickerKeyDown);
            var ctrlBtn = select('.' + CTRLBTN, this.container);
            if (ctrlBtn) {
                EventHandler.remove(ctrlBtn, 'keydown', this.ctrlBtnKeyDown);
            }
            EventHandler.remove(this.getHsvContainer(), 'mousedown touchstart', this.handlerDown);
            if (this.modeSwitcher || this.showButtons) {
                EventHandler.remove(select('.' + CTRLSWITCH, this.container), 'click', this.btnClickHandler);
            }
            EventHandler.remove(select('.' + PREVIOUS, this.container), 'click', this.previewHandler);
        }
        else {
            EventHandler.remove(this.container, 'click', this.paletteClickHandler);
            EventHandler.remove(this.container, 'keydown', this.paletteKeyDown);
        }
    };
    ColorPicker.prototype.roundValue = function (value) {
        if (!value) {
            return '';
        }
        if (value[0] !== '#') {
            value = '#' + value;
        }
        var len = value.length;
        if (len === 4) {
            value += 'f';
            len = 5;
        }
        if (len === 5) {
            var tempValue = '';
            for (var i = 1, len_1 = value.length; i < len_1; i++) {
                tempValue += (value.charAt(i) + value.charAt(i));
            }
            value = '#' + tempValue;
            len = 9;
        }
        if (len === 7) {
            value += 'ff';
        }
        return value;
    };
    ColorPicker.prototype.hexToRgb = function (hex) {
        if (!hex) {
            return [];
        }
        hex = hex.trim();
        if (hex.length !== 9) {
            hex = this.roundValue(hex);
        }
        var opacity = Number((parseInt(hex.slice(-2), 16) / 255).toFixed(2));
        hex = hex.slice(1, 7);
        var bigInt = parseInt(hex, 16);
        var h = [];
        h.push((bigInt >> 16) & 255);
        h.push((bigInt >> 8) & 255);
        h.push(bigInt & 255);
        h.push(opacity);
        return h;
    };
    ColorPicker.prototype.rgbToHsv = function (r, g, b, opacity) {
        if (this.rgb && !this.rgb.length) {
            return [];
        }
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h;
        var v = max;
        var d = max - min;
        var s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        var hsv = [Math.round(h * 360), Math.round(s * 1000) / 10, Math.round(v * 1000) / 10];
        if (!isNullOrUndefined(opacity)) {
            hsv.push(opacity);
        }
        return hsv;
    };
    ColorPicker.prototype.hsvToRgb = function (h, s, v, opacity) {
        var r;
        var g;
        var b;
        s /= 100;
        v /= 100;
        if (s === 0) {
            r = g = b = v;
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), opacity];
        }
        h /= 60;
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
        }
        var rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        if (!isNullOrUndefined(opacity)) {
            rgb.push(opacity);
        }
        return rgb;
    };
    ColorPicker.prototype.rgbToHex = function (rgb) {
        return rgb.length ? ('#' + this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]) +
            (!isNullOrUndefined(rgb[3]) ? (rgb[3] !== 0 ? (Math.round(rgb[3] * 255) + 0x10000).toString(16).substr(-2) : '00') : '')) : '';
    };
    ColorPicker.prototype.hex = function (x) {
        return ('0' + x.toString(16)).slice(-2);
    };
    ColorPicker.prototype.changeModeSwitcherProp = function (prop) {
        var ctrlSwitchWrapper = select('.' + CTRLSWITCH, this.container);
        if (prop) {
            if (ctrlSwitchWrapper) {
                this.appendModeSwitchBtn();
            }
            else {
                this.createCtrlBtn();
                if (this.isPicker() && !this.disabled) {
                    this.addCtrlSwitchEvent();
                }
            }
        }
        else {
            if (ctrlSwitchWrapper) {
                if (this.showButtons) {
                    detach(select('.' + MODESWITCH, ctrlSwitchWrapper));
                }
                else {
                    remove(ctrlSwitchWrapper);
                }
            }
        }
    };
    ColorPicker.prototype.changeShowBtnProps = function (prop) {
        var ctrlBtnWrapper = select('.' + CTRLSWITCH, this.container);
        if (prop) {
            if (ctrlBtnWrapper) {
                remove(ctrlBtnWrapper);
            }
            this.createCtrlBtn();
            if (this.isPicker() && !this.disabled) {
                this.addCtrlSwitchEvent();
            }
        }
        else {
            if (this.modeSwitcher) {
                detach(select('.' + CTRLBTN, ctrlBtnWrapper));
            }
            else {
                remove(ctrlBtnWrapper);
            }
        }
    };
    ColorPicker.prototype.changeValueProp = function (newProp) {
        if (this.isPicker()) {
            this.rgb = this.hexToRgb(newProp);
            this.hsv = this.rgbToHsv.apply(this, this.rgb);
            this.setHandlerPosition();
            detach(closest(this.hueSlider.element, '.e-slider-preview'));
            this.createSlider();
            this.setHsvContainerBg();
            this.updateInput(newProp);
            if (this.rgb.length === 4) {
                this.updateOpacityInput(this.rgb[3] * 100);
            }
        }
        else {
            this.removeTileSelection();
            var ele = this.container.querySelector('span[aria-label="' + this.roundValue(newProp) + '"]');
            if (ele) {
                this.addTileSelection(ele);
            }
        }
    };
    ColorPicker.prototype.setInputEleProps = function () {
        remove(select('.' + INPUTWRAPPER, this.container));
        this.createInput();
    };
    ColorPicker.prototype.changeDisabledProp = function (newProp) {
        if (this.isPicker()) {
            this.hueSlider.enabled = !newProp;
            this.opacitySlider.enabled = !newProp;
            this.setInputEleProps();
        }
        if (newProp) {
            this.toggleDisabled(true);
            this.unWireEvents();
        }
        else {
            this.toggleDisabled(false);
            this.wireEvents();
        }
    };
    ColorPicker.prototype.changeCssClassProps = function (newProp, oldProp) {
        var wrapper = this.getWrapper();
        var popupWrapper = this.getPopupEle();
        if (oldProp) {
            removeClass([wrapper, popupWrapper], oldProp.split(' '));
        }
        if (newProp) {
            addClass([wrapper, popupWrapper], newProp.replace(/\s+/g, ' ').trim().split(' '));
        }
    };
    ColorPicker.prototype.changeRtlProps = function (newProp) {
        if (newProp) {
            addClass([this.getWrapper()], 'e-rtl');
        }
        else {
            removeClass([this.getWrapper()], 'e-rtl');
        }
    };
    ColorPicker.prototype.changePaletteProps = function () {
        detach(this.container.children[0]);
        this.container.style.width = '';
        this.createPalette();
    };
    ColorPicker.prototype.changeOpacityProps = function (newProp) {
        var wrapper = this.getWrapper();
        if (newProp) {
            removeClass([this.container.parentElement], HIDEOPACITY);
            this.createOpacitySlider(select('.e-colorpicker-slider', this.container).appendChild(this.createElement('div', { className: 'e-opacity-slider' })));
            if (!wrapper.classList.contains(HIDEVALUE) && !wrapper.classList.contains(HIDERGBA)) {
                this.appendOpacityValue(select('.e-input-container', this.container));
            }
        }
        else {
            addClass([this.container.parentElement], HIDEOPACITY);
            this.opacitySlider.destroy();
            remove(this.opacitySlider.element);
            this.opacitySlider = null;
            if (!wrapper.classList.contains(HIDEVALUE) && !wrapper.classList.contains(HIDERGBA)) {
                remove(select('.' + OPACITY, this.container).parentElement);
            }
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {ColorPickerModel} newProp - Specifies new properties
     * @param  {ColorPickerModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    ColorPicker.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        if (!isNullOrUndefined(newProp.value)) {
            var value = this.roundValue(newProp.value);
            if (value.length === 9) {
                this.element.value = this.roundValue(value).slice(0, 7);
                var preview = this.splitBtn && select('.' + SPLITPREVIEW, this.splitBtn.element);
                if (preview) {
                    preview.style.backgroundColor = this.convertToRgbString(this.hexToRgb(newProp.value));
                }
            }
            else if (this.noColor && this.mode === 'Palette' && this.value === '') {
                var preview = this.splitBtn && select('.' + SPLITPREVIEW, this.splitBtn.element);
                preview.style.backgroundColor = '';
            }
            else {
                this.value = oldProp.value;
            }
        }
        if (!this.inline && isNullOrUndefined(newProp.inline)) {
            var otherCompModel = ['disabled', 'enableRtl'];
            this.splitBtn.setProperties(getModel(newProp, otherCompModel));
            if (!this.isPopupOpen()) {
                this.changeCssClassProps(newProp.cssClass, oldProp.cssClass);
                this.changeRtlProps(newProp.enableRtl);
                return;
            }
        }
        var _loop_1 = function (prop) {
            switch (prop) {
                case 'inline':
                    if (newProp.inline) {
                        this_1.getWrapper().appendChild(this_1.container);
                        this_1.splitBtn.destroy();
                        detach(this_1.element.nextElementSibling);
                        if (!this_1.container.children.length) {
                            this_1.createWidget();
                        }
                    }
                    else {
                        this_1.destroyOtherComp();
                        this_1.unWireEvents();
                        this_1.container.innerHTML = '';
                        this_1.createSplitBtn();
                    }
                    break;
                case 'cssClass': {
                    this_1.changeCssClassProps(newProp.cssClass, oldProp.cssClass);
                    var props = newProp.cssClass.split(' ').concat(oldProp.cssClass.split(' '));
                    props = props.reduce(function (a, b) { if (a.indexOf(b) < 0) {
                        a.push(b);
                    } return a; }, []);
                    var count_1 = 0;
                    props.forEach(function (cls) {
                        if (count_1 === 0 &&
                            (cls === HIDEVALUE || cls === HIDEVALUESWITCH || cls === SHOWVALUE || cls === HIDEHEX || cls === HIDERGBA)) {
                            var inputWrap = select('.' + INPUTWRAPPER, _this.container);
                            if (inputWrap) {
                                remove(select('.' + INPUTWRAPPER, _this.container));
                            }
                            _this.createInput();
                            count_1++;
                        }
                    });
                    break;
                }
                case 'enableRtl':
                    if (this_1.isPicker()) {
                        this_1.hueSlider.enableRtl = newProp.enableRtl;
                        if (this_1.enableOpacity) {
                            this_1.opacitySlider.enableRtl = newProp.enableRtl;
                        }
                        this_1.setInputEleProps();
                    }
                    this_1.changeRtlProps(newProp.enableRtl);
                    break;
                case 'disabled':
                    this_1.changeDisabledProp(newProp.disabled);
                    break;
                case 'value':
                    if (this_1.value !== oldProp.value) {
                        this_1.changeValueProp(newProp.value);
                    }
                    break;
                case 'showButtons':
                    this_1.changeShowBtnProps(newProp.showButtons);
                    break;
                case 'mode':
                    if (newProp.mode === 'Picker') {
                        this_1.switchToPicker();
                    }
                    else {
                        this_1.switchToPalette();
                    }
                    break;
                case 'modeSwitcher':
                    this_1.changeModeSwitcherProp(newProp.modeSwitcher);
                    break;
                case 'columns':
                case 'presetColors':
                    if (!this_1.isPicker()) {
                        this_1.changePaletteProps();
                    }
                    break;
                case 'noColor':
                    if (newProp.noColor) {
                        if (this_1.mode === 'Palette' && !this_1.modeSwitcher) {
                            this_1.setNoColor();
                        }
                    }
                    else {
                        this_1.changePaletteProps();
                    }
                    break;
                case 'enableOpacity':
                    this_1.changeOpacityProps(newProp.enableOpacity);
                    break;
                case 'showRecentColors':
                    if (!newProp.showRecentColors) {
                        var recentClrWpr = this_1.container.querySelector('.e-clr-pal-rec-wpr');
                        if (recentClrWpr) {
                            detach(recentClrWpr);
                        }
                    }
                    this_1.recentColors = [];
                    break;
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            _loop_1(prop);
        }
    };
    /**
     * Sets the focus to Colorpicker
     * its native method
     *
     * @public
     * @returns {void}
     */
    ColorPicker.prototype.focusIn = function () {
        this.element.parentElement.focus();
    };
    __decorate$5([
        Property('#008000ff')
    ], ColorPicker.prototype, "value", void 0);
    __decorate$5([
        Property('')
    ], ColorPicker.prototype, "cssClass", void 0);
    __decorate$5([
        Property(false)
    ], ColorPicker.prototype, "disabled", void 0);
    __decorate$5([
        Property('Picker')
    ], ColorPicker.prototype, "mode", void 0);
    __decorate$5([
        Property(true)
    ], ColorPicker.prototype, "modeSwitcher", void 0);
    __decorate$5([
        Property(null)
    ], ColorPicker.prototype, "presetColors", void 0);
    __decorate$5([
        Property(true)
    ], ColorPicker.prototype, "showButtons", void 0);
    __decorate$5([
        Property(10)
    ], ColorPicker.prototype, "columns", void 0);
    __decorate$5([
        Property(false)
    ], ColorPicker.prototype, "inline", void 0);
    __decorate$5([
        Property(false)
    ], ColorPicker.prototype, "noColor", void 0);
    __decorate$5([
        Property(false)
    ], ColorPicker.prototype, "enablePersistence", void 0);
    __decorate$5([
        Property(true)
    ], ColorPicker.prototype, "enableOpacity", void 0);
    __decorate$5([
        Property(false)
    ], ColorPicker.prototype, "createPopupOnClick", void 0);
    __decorate$5([
        Property(false)
    ], ColorPicker.prototype, "showRecentColors", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "select", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "change", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "beforeTileRender", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "beforeOpen", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "open", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "beforeClose", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "beforeModeSwitch", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "onModeSwitch", void 0);
    __decorate$5([
        Event()
    ], ColorPicker.prototype, "created", void 0);
    ColorPicker = __decorate$5([
        NotifyPropertyChanges
    ], ColorPicker);
    return ColorPicker;
}(Component));

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
var HIDE_CLEAR = 'e-clear-icon-hide';
/**
 * Represents the TextBox component that allows the user to enter the values based on it's type.
 * ```html
 * <input name='images' id='textbox'/>
 * ```
 * ```typescript
 * <script>
 *   var textboxObj = new TextBox();
 *   textboxObj.appendTo('#textbox');
 * </script>
 * ```
 */
var TextBox = /** @class */ (function (_super) {
    __extends$6(TextBox, _super);
    /**
     *
     * @param {TextBoxModel} options - Specifies the TextBox model.
     * @param {string | HTMLInputElement | HTMLTextAreaElement} element - Specifies the element to render as component.
     * @private
     */
    function TextBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.previousValue = null;
        _this.isHiddenInput = false;
        _this.isForm = false;
        _this.inputPreviousValue = null;
        _this.textboxOptions = options;
        return _this;
    }
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {TextBoxModel} newProp - Returns the dynamic property value of the component.
     * @param {TextBoxModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    TextBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'floatLabelType':
                    Input.removeFloating(this.textboxWrapper);
                    Input.addFloating(this.respectiveElement, this.floatLabelType, this.placeholder);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
                    this.bindClearEvent();
                    break;
                case 'width':
                    Input.setWidth(newProp.width, this.textboxWrapper.container);
                    break;
                case 'value':
                    {
                        var prevOnChange = this.isProtectedOnChange;
                        this.isProtectedOnChange = true;
                        if (!Input.isBlank(this.value)) {
                            this.value = this.value.toString();
                        }
                        this.isProtectedOnChange = prevOnChange;
                        Input.setValue(this.value, this.respectiveElement, this.floatLabelType, this.showClearButton);
                        if (this.isHiddenInput) {
                            this.element.value = this.respectiveElement.value;
                        }
                        this.inputPreviousValue = this.respectiveElement.value;
                        /* istanbul ignore next */
                        if ((this.isAngular || this.isVue) && this.preventChange === true) {
                            this.previousValue = this.isAngular ? this.value : this.previousValue;
                            this.preventChange = false;
                        }
                        else if (isNullOrUndefined(this.isAngular) || !this.isAngular
                            || (this.isAngular && !this.preventChange) || (this.isAngular && isNullOrUndefined(this.preventChange))) {
                            this.raiseChangeEvent();
                        }
                    }
                    break;
                case 'htmlAttributes':
                    {
                        this.updateHTMLAttributesToElement();
                        this.updateHTMLAttributesToWrapper();
                        this.checkAttributes(true);
                        if (this.multiline && !isNullOrUndefined(this.textarea)) {
                            Input.validateInputType(this.textboxWrapper.container, this.textarea);
                        }
                        else {
                            Input.validateInputType(this.textboxWrapper.container, this.element);
                        }
                    }
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.respectiveElement);
                    break;
                case 'type':
                    if (this.respectiveElement.tagName !== 'TEXTAREA') {
                        this.respectiveElement.setAttribute('type', this.type);
                        Input.validateInputType(this.textboxWrapper.container, this.element);
                        this.raiseChangeEvent();
                    }
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.respectiveElement, this.textboxWrapper);
                    this.bindClearEvent();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.textboxWrapper.container]);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.respectiveElement);
                    Input.calculateWidth(this.respectiveElement, this.textboxWrapper.container);
                    break;
                case 'autocomplete':
                    if (this.autocomplete !== 'on' && this.autocomplete !== '') {
                        this.respectiveElement.autocomplete = this.autocomplete;
                    }
                    else {
                        this.removeAttributes(['autocomplete']);
                    }
                    break;
                case 'cssClass':
                    Input.updateCssClass(newProp.cssClass, oldProp.cssClass, this.textboxWrapper.container);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.respectiveElement);
                    break;
            }
        }
    };
    /**
     * Gets the component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    TextBox.prototype.getModuleName = function () {
        return 'textbox';
    };
    TextBox.prototype.preRender = function () {
        this.cloneElement = this.element.cloneNode(true);
        this.formElement = closest(this.element, 'form');
        if (!isNullOrUndefined(this.formElement)) {
            this.isForm = true;
        }
        /* istanbul ignore next */
        if (this.element.tagName === 'EJS-TEXTBOX') {
            var ejInstance = getValue('ej2_instances', this.element);
            var inputElement = this.multiline ?
                this.createElement('textarea') :
                this.createElement('input');
            var index = 0;
            for (index; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (attributeName !== 'id' && attributeName !== 'class') {
                    inputElement.setAttribute(attributeName, this.element.attributes[index].nodeValue);
                    inputElement.innerHTML = this.element.innerHTML;
                    if (attributeName === 'name') {
                        this.element.removeAttribute('name');
                    }
                }
                else if (attributeName === 'class') {
                    inputElement.setAttribute(attributeName, this.element.className.split(' ').filter(function (item) { return item.indexOf('ng-') !== 0; }).join(' '));
                }
            }
            this.element.appendChild(inputElement);
            this.element = inputElement;
            setValue('ej2_instances', ejInstance, this.element);
        }
        this.updateHTMLAttributesToElement();
        this.checkAttributes(false);
        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['value'] === undefined)) && this.element.value !== '') {
            this.setProperties({ value: this.element.value }, true);
        }
        if (this.element.tagName !== 'TEXTAREA') {
            this.element.setAttribute('type', this.type);
        }
        if (this.type === 'text' || (this.element.tagName === 'INPUT' && this.multiline && this.isReact)) {
            this.element.setAttribute('role', 'textbox');
        }
        this.globalize = new Internationalization(this.locale);
        var localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('textbox', localeText, this.locale);
        if (this.l10n.getConstant('placeholder') !== '') {
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (!this.element.hasAttribute('id')) {
            this.element.setAttribute('id', getUniqueID('textbox'));
        }
        if (!this.element.hasAttribute('name')) {
            this.element.setAttribute('name', this.element.getAttribute('id'));
        }
        if (this.element.tagName === 'INPUT' && this.multiline) {
            this.isHiddenInput = true;
            this.textarea = this.createElement('textarea');
            this.element.parentNode.insertBefore(this.textarea, this.element);
            this.element.setAttribute('type', 'hidden');
            this.textarea.setAttribute('name', this.element.getAttribute('name'));
            this.element.removeAttribute('name');
            this.textarea.setAttribute('role', this.element.getAttribute('role'));
            this.element.removeAttribute('role');
            this.textarea.setAttribute('id', getUniqueID('textarea'));
            var apiAttributes = ['placeholder', 'disabled', 'value', 'readonly', 'type', 'autocomplete'];
            for (var index = 0; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (this.element.hasAttribute(attributeName) && containerAttributes.indexOf(attributeName) < 0 &&
                    !(attributeName === 'id' || attributeName === 'type' || attributeName === 'e-mappinguid')) {
                    // e-mappinguid attribute is handled for Grid component.
                    this.textarea.setAttribute(attributeName, this.element.attributes[index].nodeValue);
                    if (apiAttributes.indexOf(attributeName) < 0) {
                        this.element.removeAttribute(attributeName);
                        index--;
                    }
                }
            }
        }
    };
    TextBox.prototype.checkAttributes = function (isDynamic) {
        var attrs = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['placeholder', 'disabled', 'value', 'readonly', 'type', 'autocomplete'];
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var key = attrs_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(key))) {
                switch (key) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.element.getAttribute(key) === 'disabled' || this.element.getAttribute(key) === '' ||
                                this.element.getAttribute(key) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.element.getAttribute(key) === 'readonly' || this.element.getAttribute(key) === ''
                                || this.element.getAttribute(key) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'autocomplete':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['autocomplete'] === undefined)) || isDynamic) {
                            var autoCompleteTxt = this.element.autocomplete === 'off' ? 'off' : 'on';
                            this.setProperties({ autocomplete: autoCompleteTxt }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if (((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['value'] === undefined)) || isDynamic) && this.element.value !== '') {
                            this.setProperties({ value: this.element.value }, !isDynamic);
                        }
                        break;
                    case 'type':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['type'] === undefined)) || isDynamic) {
                            this.setProperties({ type: this.element.type }, !isDynamic);
                        }
                        break;
                }
            }
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    TextBox.prototype.render = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = Input.getInputValidClassList(this.cssClass);
        }
        this.respectiveElement = (this.isHiddenInput) ? this.textarea : this.element;
        this.textboxWrapper = Input.createInput({
            element: this.respectiveElement,
            floatLabelType: this.floatLabelType,
            properties: {
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                cssClass: updatedCssClassValue,
                readonly: this.readonly,
                placeholder: this.placeholder,
                showClearButton: this.showClearButton
            }
        });
        this.updateHTMLAttributesToWrapper();
        if (this.isHiddenInput) {
            this.respectiveElement.parentNode.insertBefore(this.element, this.respectiveElement);
        }
        this.wireEvents();
        if (!isNullOrUndefined(this.value)) {
            Input.setValue(this.value, this.respectiveElement, this.floatLabelType, this.showClearButton);
            if (this.isHiddenInput) {
                this.element.value = this.respectiveElement.value;
            }
        }
        if (!isNullOrUndefined(this.value)) {
            this.initialValue = this.value;
            this.setInitialValue();
        }
        if (this.autocomplete !== 'on' && this.autocomplete !== '') {
            this.respectiveElement.autocomplete = this.autocomplete;
        }
        else if (!isNullOrUndefined(this.textboxOptions) && (this.textboxOptions['autocomplete'] !== undefined)) {
            this.removeAttributes(['autocomplete']);
        }
        this.previousValue = this.value;
        this.inputPreviousValue = this.value;
        this.respectiveElement.defaultValue = this.respectiveElement.value;
        Input.setWidth(this.width, this.textboxWrapper.container);
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        if (!this.element.hasAttribute('aria-labelledby') && !this.element.hasAttribute('placeholder') && !this.element.hasAttribute('aria-label')) {
            this.element.setAttribute('aria-label', 'textbox');
        }
        this.renderComplete();
    };
    TextBox.prototype.updateHTMLAttributesToWrapper = function () {
        Input.updateHTMLAttributesToWrapper(this.htmlAttributes, this.textboxWrapper.container);
    };
    TextBox.prototype.updateHTMLAttributesToElement = function () {
        Input.updateHTMLAttributesToElement(this.htmlAttributes, this.respectiveElement ? this.respectiveElement :
            (this.multiline && !isNullOrUndefined(this.textarea) ? this.textarea : this.element));
    };
    TextBox.prototype.setInitialValue = function () {
        if (!this.isAngular) {
            this.respectiveElement.setAttribute('value', this.initialValue);
        }
    };
    TextBox.prototype.wireEvents = function () {
        EventHandler.add(this.respectiveElement, 'focus', this.focusHandler, this);
        EventHandler.add(this.respectiveElement, 'blur', this.focusOutHandler, this);
        EventHandler.add(this.respectiveElement, 'keydown', this.keydownHandler, this);
        EventHandler.add(this.respectiveElement, 'input', this.inputHandler, this);
        EventHandler.add(this.respectiveElement, 'change', this.changeHandler, this);
        if (this.isForm) {
            EventHandler.add(this.formElement, 'reset', this.resetForm, this);
        }
        this.bindClearEvent();
        if (!isNullOrUndefined(this.textboxWrapper.container.querySelector('.e-float-text')) && this.floatLabelType === 'Auto'
            && this.textboxWrapper.container.classList.contains('e-autofill') &&
            this.textboxWrapper.container.classList.contains('e-outline')) {
            EventHandler.add((this.textboxWrapper.container.querySelector('.e-float-text')), 'animationstart', this.animationHandler, this);
        }
    };
    TextBox.prototype.animationHandler = function () {
        this.textboxWrapper.container.classList.add('e-valid-input');
        var label = this.textboxWrapper.container.querySelector('.e-float-text');
        if (!isNullOrUndefined(label)) {
            label.classList.add('e-label-top');
            if (label.classList.contains('e-label-bottom')) {
                label.classList.remove('e-label-bottom');
            }
        }
    };
    TextBox.prototype.resetValue = function (value) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = value;
        if (value == null && this.textboxWrapper.container.classList.contains('e-valid-input') && !(this.floatLabelType === 'Always' && this.textboxWrapper.container.classList.contains('e-outline'))) {
            this.textboxWrapper.container.classList.remove('e-valid-input');
        }
        this.isProtectedOnChange = prevOnChange;
    };
    TextBox.prototype.resetForm = function () {
        if (this.isAngular) {
            this.resetValue('');
        }
        else {
            this.resetValue(this.initialValue);
        }
        if (!isNullOrUndefined(this.textboxWrapper)) {
            var label = this.textboxWrapper.container.querySelector('.e-float-text');
            if (!isNullOrUndefined(label) && this.floatLabelType !== 'Always') {
                if ((isNullOrUndefined(this.initialValue) || this.initialValue === '')) {
                    label.classList.add('e-label-bottom');
                    label.classList.remove('e-label-top');
                }
                else if (this.initialValue !== '') {
                    label.classList.add('e-label-top');
                    label.classList.remove('e-label-bottom');
                }
            }
        }
    };
    TextBox.prototype.focusHandler = function (args) {
        var eventArgs = {
            container: this.textboxWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('focus', eventArgs);
    };
    TextBox.prototype.focusOutHandler = function (args) {
        if (!(this.previousValue === null && this.value === null && this.respectiveElement.value === '') &&
            (this.previousValue !== this.value)) {
            this.raiseChangeEvent(args, true);
        }
        var eventArgs = {
            container: this.textboxWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('blur', eventArgs);
    };
    TextBox.prototype.keydownHandler = function (args) {
        if ((args.keyCode === 13 || args.keyCode === 9) && !((this.previousValue === null || this.previousValue === '') && (this.value === null || this.value === '') && this.respectiveElement.value === '')) {
            this.setProperties({ value: this.respectiveElement.value }, true);
        }
    };
    TextBox.prototype.inputHandler = function (args) {
        var textboxObj =  this;
        var eventArgs = {
            event: args,
            value: this.respectiveElement.value,
            previousValue: this.inputPreviousValue,
            container: this.textboxWrapper.container
        };
        this.inputPreviousValue = this.respectiveElement.value;
        /* istanbul ignore next */
        if (this.isAngular) {
            textboxObj.localChange({ value: this.respectiveElement.value });
            this.preventChange = true;
        }
        if (this.isVue) {
            this.preventChange = true;
        }
        this.trigger('input', eventArgs);
        args.stopPropagation();
    };
    TextBox.prototype.changeHandler = function (args) {
        this.setProperties({ value: this.respectiveElement.value }, true);
        if (this.previousValue !== this.value) {
            this.raiseChangeEvent(args, true);
        }
        args.stopPropagation();
    };
    TextBox.prototype.raiseChangeEvent = function (event, interaction) {
        var eventArgs = {
            event: event,
            value: this.value,
            previousValue: this.previousValue,
            container: this.textboxWrapper.container,
            isInteraction: interaction ? interaction : false,
            isInteracted: interaction ? interaction : false
        };
        this.preventChange = false;
        this.trigger('change', eventArgs);
        this.previousValue = this.value;
        //EJ2CORE-738:For this task we update the textarea value to the input when input tag with multiline is present
        if (this.element.tagName === 'INPUT' && this.multiline && Browser.info.name === 'mozilla') {
            this.element.value = this.respectiveElement.value;
        }
    };
    TextBox.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            if (this.enabled) {
                EventHandler.add(this.textboxWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler, this);
            }
            else {
                EventHandler.remove(this.textboxWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler);
            }
        }
    };
    TextBox.prototype.resetInputHandler = function (event) {
        event.preventDefault();
        if (!(this.textboxWrapper.clearButton.classList.contains(HIDE_CLEAR)) || this.textboxWrapper.container.classList.contains('e-static-clear')) {
            Input.setValue('', this.respectiveElement, this.floatLabelType, this.showClearButton);
            if (this.isHiddenInput) {
                this.element.value = this.respectiveElement.value;
            }
            this.setProperties({ value: this.respectiveElement.value }, true);
            var eventArgs = {
                event: event,
                value: this.respectiveElement.value,
                previousValue: this.inputPreviousValue,
                container: this.textboxWrapper.container
            };
            this.trigger('input', eventArgs);
            this.inputPreviousValue = this.respectiveElement.value;
            this.raiseChangeEvent(event, true);
            if (closest(this.element, 'form')) {
                var element = this.element;
                var keyupEvent = document.createEvent('KeyboardEvent');
                keyupEvent.initEvent('keyup', false, true);
                element.dispatchEvent(keyupEvent);
            }
        }
    };
    TextBox.prototype.unWireEvents = function () {
        EventHandler.remove(this.respectiveElement, 'focus', this.focusHandler);
        EventHandler.remove(this.respectiveElement, 'blur', this.focusOutHandler);
        EventHandler.remove(this.respectiveElement, 'keydown', this.keydownHandler);
        EventHandler.remove(this.respectiveElement, 'input', this.inputHandler);
        EventHandler.remove(this.respectiveElement, 'change', this.changeHandler);
        if (this.isForm) {
            EventHandler.remove(this.formElement, 'reset', this.resetForm);
        }
        if (!isNullOrUndefined(this.textboxWrapper.container.querySelector('.e-float-text')) && this.floatLabelType === 'Auto'
            && this.textboxWrapper.container.classList.contains('e-outline') &&
            this.textboxWrapper.container.classList.contains('e-autofill')) {
            EventHandler.remove((this.textboxWrapper.container.querySelector('.e-float-text')), 'animationstart', this.animationHandler);
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also, it maintains the initial TextBox element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    TextBox.prototype.destroy = function () {
        this.unWireEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        if (this.element.tagName === 'INPUT' && this.multiline) {
            detach(this.textboxWrapper.container.getElementsByTagName('textarea')[0]);
            this.respectiveElement = this.element;
            this.element.removeAttribute('type');
        }
        this.respectiveElement.value = this.respectiveElement.defaultValue;
        this.respectiveElement.classList.remove('e-input');
        this.removeAttributes(['aria-disabled', 'aria-readonly', 'aria-labelledby']);
        if (!isNullOrUndefined(this.textboxWrapper)) {
            this.textboxWrapper.container.insertAdjacentElement('afterend', this.respectiveElement);
            detach(this.textboxWrapper.container);
        }
        this.textboxWrapper = null;
        Input.destroy({
            element: this.respectiveElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        _super.prototype.destroy.call(this);
    };
    /**
     * Adding the icons to the TextBox component.
     *
     * @param { string } position - Specify the icon placement on the TextBox. Possible values are append and prepend.
     * @param { string | string[] } icons - Icon classes which are need to add to the span element which is going to created.
     * Span element acts as icon or button element for TextBox.
     * @returns {void}
     */
    TextBox.prototype.addIcon = function (position, icons) {
        Input.addIcon(position, icons, this.textboxWrapper.container, this.respectiveElement, this.createElement);
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persisted data.
     */
    TextBox.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Adding the multiple attributes as key-value pair to the TextBox element.
     *
     * @param {string} attributes - Specifies the attributes to be add to TextBox element.
     * @returns {void}
     */
    TextBox.prototype.addAttributes = function (attributes) {
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: false }, true);
                Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: true }, true);
                Input.setReadonly(this.readonly, this.respectiveElement);
            }
            else if (key === 'class') {
                this.respectiveElement.classList.add(attributes["" + key]);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: attributes["" + key] }, true);
                Input.setPlaceholder(this.placeholder, this.respectiveElement);
            }
            else if (key === 'rows' && this.respectiveElement.tagName === 'TEXTAREA') {
                this.respectiveElement.setAttribute(key, attributes["" + key]);
            }
            else {
                this.respectiveElement.setAttribute(key, attributes["" + key]);
            }
        }
    };
    /**
     * Removing the multiple attributes as key-value pair to the TextBox element.
     *
     * @param { string[] } attributes - Specifies the attributes name to be removed from TextBox element.
     * @returns {void}
     */
    TextBox.prototype.removeAttributes = function (attributes) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var key = attributes_1[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: true }, true);
                Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: false }, true);
                Input.setReadonly(this.readonly, this.respectiveElement);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: null }, true);
                Input.setPlaceholder(this.placeholder, this.respectiveElement);
            }
            else {
                this.respectiveElement.removeAttribute(key);
            }
        }
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    TextBox.prototype.focusIn = function () {
        if (document.activeElement !== this.respectiveElement && this.enabled) {
            this.respectiveElement.focus();
            if (this.textboxWrapper.container.classList.contains('e-input-group')
                || this.textboxWrapper.container.classList.contains('e-outline')
                || this.textboxWrapper.container.classList.contains('e-filled')) {
                addClass([this.textboxWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    TextBox.prototype.focusOut = function () {
        if (document.activeElement === this.respectiveElement && this.enabled) {
            this.respectiveElement.blur();
            if (this.textboxWrapper.container.classList.contains('e-input-group')
                || this.textboxWrapper.container.classList.contains('e-outline')
                || this.textboxWrapper.container.classList.contains('e-filled')) {
                removeClass([this.textboxWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    __decorate$6([
        Property('text')
    ], TextBox.prototype, "type", void 0);
    __decorate$6([
        Property(false)
    ], TextBox.prototype, "readonly", void 0);
    __decorate$6([
        Property(null)
    ], TextBox.prototype, "value", void 0);
    __decorate$6([
        Property('Never')
    ], TextBox.prototype, "floatLabelType", void 0);
    __decorate$6([
        Property('')
    ], TextBox.prototype, "cssClass", void 0);
    __decorate$6([
        Property(null)
    ], TextBox.prototype, "placeholder", void 0);
    __decorate$6([
        Property('on')
    ], TextBox.prototype, "autocomplete", void 0);
    __decorate$6([
        Property({})
    ], TextBox.prototype, "htmlAttributes", void 0);
    __decorate$6([
        Property(false)
    ], TextBox.prototype, "multiline", void 0);
    __decorate$6([
        Property(true)
    ], TextBox.prototype, "enabled", void 0);
    __decorate$6([
        Property(false)
    ], TextBox.prototype, "showClearButton", void 0);
    __decorate$6([
        Property(false)
    ], TextBox.prototype, "enablePersistence", void 0);
    __decorate$6([
        Property(null)
    ], TextBox.prototype, "width", void 0);
    __decorate$6([
        Event()
    ], TextBox.prototype, "created", void 0);
    __decorate$6([
        Event()
    ], TextBox.prototype, "destroyed", void 0);
    __decorate$6([
        Event()
    ], TextBox.prototype, "change", void 0);
    __decorate$6([
        Event()
    ], TextBox.prototype, "blur", void 0);
    __decorate$6([
        Event()
    ], TextBox.prototype, "focus", void 0);
    __decorate$6([
        Event()
    ], TextBox.prototype, "input", void 0);
    TextBox = __decorate$6([
        NotifyPropertyChanges
    ], TextBox);
    return TextBox;
}(Component));

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
var HIDE_CLEAR$1 = 'e-clear-icon-hide';
var AUTO_WIDTH = 'e-auto-width';
var RESIZE_X = 'e-resize-x';
var RESIZE_Y = 'e-resize-y';
var RESIZE_XY = 'e-resize-xy';
var RESIZE_NONE = 'e-resize-none';
var TextArea = /** @class */ (function (_super) {
    __extends$7(TextArea, _super);
    function TextArea(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.previousValue = null;
        _this.isForm = false;
        _this.inputPreviousValue = null;
        _this.textareaOptions = options;
        return _this;
    }
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {TextAreaModel} newProp - Returns the dynamic property value of the component.
     * @param {TextAreaModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    TextArea.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'floatLabelType':
                    Input.removeFloating(this.textareaWrapper);
                    Input.addFloating(this.element, this.floatLabelType, this.placeholder);
                    if (this.floatLabelType === 'Never') {
                        this.element.removeAttribute('aria-labelledby');
                    }
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.element, this.floatLabelType, this.textareaWrapper.container);
                    this.bindClearEvent();
                    if (!this.enabled && this.resizeMode !== 'None') {
                        this.element.classList.remove(this.getCurrentResizeClass(this.resizeMode));
                        this.element.classList.add(RESIZE_NONE);
                    }
                    else {
                        this.element.classList.add(this.getCurrentResizeClass(this.resizeMode));
                    }
                    break;
                case 'width':
                    if (this.resizeMode !== 'None' && this.resizeMode !== 'Vertical') {
                        this.setElementWidth(newProp.width);
                        this.textareaWrapper.container.classList.add(AUTO_WIDTH);
                    }
                    else {
                        if (this.textareaWrapper.container.classList.contains(AUTO_WIDTH)) {
                            this.textareaWrapper.container.classList.remove(AUTO_WIDTH);
                        }
                        Input.setWidth(newProp.width, this.textareaWrapper.container);
                    }
                    break;
                case 'value':
                    {
                        var prevOnChange = this.isProtectedOnChange;
                        this.isProtectedOnChange = true;
                        if (!Input.isBlank(this.value)) {
                            this.value = this.value.toString();
                        }
                        this.isProtectedOnChange = prevOnChange;
                        Input.setValue(this.value, this.element, this.floatLabelType, this.showClearButton);
                        this.inputPreviousValue = this.element.value;
                        /* istanbul ignore next */
                        if ((this.isAngular || this.isVue) && this.preventChange === true) {
                            this.previousValue = this.isAngular ? this.value : this.previousValue;
                            this.preventChange = false;
                        }
                        else if (isNullOrUndefined(this.isAngular) || !this.isAngular
                            || (this.isAngular && !this.preventChange) || (this.isAngular && isNullOrUndefined(this.preventChange))) {
                            this.raiseChangeEvent();
                        }
                    }
                    break;
                case 'htmlAttributes':
                    {
                        this.updateHTMLAttributesToElement();
                        this.updateHTMLAttributesToWrapper();
                        this.checkAttributes(true);
                        Input.validateInputType(this.textareaWrapper.container, this.element);
                    }
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.element);
                    if (this.readonly) {
                        this.element.setAttribute('aria-readonly', 'true');
                    }
                    else {
                        this.element.removeAttribute('aria-readonly');
                    }
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.element, this.textareaWrapper);
                    this.bindClearEvent();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.textareaWrapper.container]);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.element);
                    Input.calculateWidth(this.element, this.textareaWrapper.container);
                    break;
                case 'cssClass':
                    Input.updateCssClass(newProp.cssClass, oldProp.cssClass, this.textareaWrapper.container);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.element);
                    break;
                case 'rows':
                    if (this.rows) {
                        this.element.setAttribute('rows', this.rows.toString());
                    }
                    break;
                case 'cols':
                    if (this.cols) {
                        this.element.setAttribute('cols', this.cols.toString());
                        if (this.width == null) {
                            this.textareaWrapper.container.classList.add(AUTO_WIDTH);
                        }
                    }
                    break;
                case 'maxLength':
                    if (this.maxLength) {
                        this.element.setAttribute('maxlength', this.maxLength.toString());
                    }
                    break;
                case 'resizeMode':
                    if (this.enabled) {
                        if (this.element.classList.contains(this.getCurrentResizeClass(oldProp.resizeMode))) {
                            this.element.classList.remove(this.getCurrentResizeClass(oldProp.resizeMode));
                        }
                        this.element.classList.add(this.getCurrentResizeClass(this.resizeMode));
                        if (this.element.style.width && (this.resizeMode === 'None' || this.resizeMode === 'Vertical')) {
                            Input.setWidth(this.element.style.width, this.textareaWrapper.container);
                        }
                        else {
                            var currentWidth = this.element.offsetWidth;
                            this.element.style.width = currentWidth + 'px';
                            if (this.textareaWrapper.container.style.width) {
                                this.textareaWrapper.container.style.width = '';
                            }
                        }
                        this.setWrapperWidth();
                    }
                    break;
            }
        }
    };
    TextArea.prototype.preRender = function () {
        this.formElement = closest(this.element, 'form');
        if (!isNullOrUndefined(this.formElement)) {
            this.isForm = true;
        }
        /* istanbul ignore next */
        if (this.element.tagName === 'EJS-TEXTAREA' || this.element.tagName === 'EJS-SMARTTEXTAREA') {
            var ejInstance = getValue('ej2_instances', this.element);
            var inputElement = this.createElement('textarea');
            var index = 0;
            for (index; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (attributeName !== 'id' && attributeName !== 'class') {
                    inputElement.setAttribute(attributeName, this.element.attributes[index].nodeValue);
                    inputElement.innerHTML = this.element.innerHTML;
                    if (attributeName === 'name') {
                        this.element.removeAttribute('name');
                    }
                }
                else if (attributeName === 'class') {
                    inputElement.setAttribute(attributeName, this.element.className.split(' ').filter(function (item) { return item.indexOf('ng-') !== 0; }).join(' '));
                }
            }
            this.element.appendChild(inputElement);
            this.element = inputElement;
            setValue('ej2_instances', ejInstance, this.element);
        }
        this.updateHTMLAttributesToElement();
        this.checkAttributes(false);
        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['value'] === undefined)) && this.element.value !== '') {
            this.setProperties({ value: this.element.value }, true);
        }
        this.globalize = new Internationalization(this.locale);
        var localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('textarea', localeText, this.locale);
        if (this.l10n.getConstant('placeholder') !== '') {
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (!this.element.hasAttribute('id')) {
            this.element.setAttribute('id', getUniqueID('textbox'));
        }
        if (!this.element.hasAttribute('name')) {
            this.element.setAttribute('name', this.element.getAttribute('id'));
        }
        if (this.rows) {
            this.element.setAttribute('rows', this.rows.toString());
        }
        if (this.cols) {
            this.element.setAttribute('cols', this.cols.toString());
        }
        if (this.maxLength) {
            this.element.setAttribute('maxlength', this.maxLength.toString());
        }
        if (!this.element.style.resize && this.enabled) {
            this.element.classList.add(this.getCurrentResizeClass(this.resizeMode));
        }
        if (this.enabled) {
            this.element.setAttribute('aria-multiline', 'true');
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    TextArea.prototype.render = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = Input.getInputValidClassList(this.cssClass);
        }
        this.textareaWrapper = Input.createInput({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: {
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                cssClass: updatedCssClassValue,
                readonly: this.readonly,
                placeholder: this.placeholder,
                showClearButton: this.showClearButton
            }
        });
        this.updateHTMLAttributesToWrapper();
        this.wireEvents();
        if (!isNullOrUndefined(this.value)) {
            Input.setValue(this.value, this.element, this.floatLabelType, this.showClearButton);
        }
        if (!isNullOrUndefined(this.value)) {
            this.initialValue = this.value;
            if (!this.isAngular) {
                this.element.setAttribute('value', this.initialValue);
            }
        }
        this.previousValue = this.value;
        this.inputPreviousValue = this.value;
        this.element.defaultValue = this.element.value;
        Input.setWidth(this.width, this.textareaWrapper.container);
        this.setWrapperWidth();
        this.renderComplete();
    };
    TextArea.prototype.getModuleName = function () {
        return 'textarea';
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value.
     */
    TextArea.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    TextArea.prototype.checkAttributes = function (isDynamic) {
        var attrs = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['placeholder', 'disabled', 'value', 'readonly'];
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var key = attrs_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(key))) {
                switch (key) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.element.getAttribute(key) === 'disabled' || this.element.getAttribute(key) === '' ||
                                this.element.getAttribute(key) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.element.getAttribute(key) === 'readonly' || this.element.getAttribute(key) === ''
                                || this.element.getAttribute(key) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if (((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['value'] === undefined)) || isDynamic) && this.element.value !== '') {
                            this.setProperties({ value: this.element.value }, !isDynamic);
                        }
                        break;
                }
            }
        }
    };
    TextArea.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'blur', this.focusOutHandler, this);
        EventHandler.add(this.element, 'keydown', this.keydownHandler, this);
        EventHandler.add(this.element, 'input', this.inputHandler, this);
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        if (this.isForm) {
            EventHandler.add(this.formElement, 'reset', this.resetForm, this);
        }
        this.bindClearEvent();
    };
    TextArea.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'blur', this.focusOutHandler);
        EventHandler.remove(this.element, 'keydown', this.keydownHandler);
        EventHandler.remove(this.element, 'input', this.inputHandler);
        EventHandler.remove(this.element, 'change', this.changeHandler);
        if (this.isForm) {
            EventHandler.remove(this.formElement, 'reset', this.resetForm);
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also, it maintains the initial TextArea element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    TextArea.prototype.destroy = function () {
        this.unWireEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        this.element.value = this.element.defaultValue;
        this.element.classList.remove('e-input', RESIZE_X, RESIZE_Y, RESIZE_XY, RESIZE_NONE);
        this.removeAttributes(['aria-disabled', 'aria-readonly', 'aria-labelledby', 'aria-multiline']);
        if (!isNullOrUndefined(this.textareaWrapper)) {
            this.textareaWrapper.container.insertAdjacentElement('afterend', this.element);
            detach(this.textareaWrapper.container);
        }
        this.textareaWrapper = null;
        Input.destroy({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        this.formElement = null;
        _super.prototype.destroy.call(this);
    };
    TextArea.prototype.focusHandler = function (args) {
        var eventArgs = {
            container: this.textareaWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('focus', eventArgs);
    };
    TextArea.prototype.focusOutHandler = function (args) {
        if (!(this.previousValue === null && this.value === null) &&
            (this.previousValue !== this.value)) {
            this.raiseChangeEvent(args, true);
        }
        var eventArgs = {
            container: this.textareaWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('blur', eventArgs);
    };
    TextArea.prototype.keydownHandler = function (args) {
        if ((args.keyCode === 13 || args.keyCode === 9) && !((this.previousValue === null || this.previousValue === '') && (this.value === null || this.value === '') && this.element.value === '')) {
            this.setProperties({ value: this.element.value }, true);
        }
    };
    TextArea.prototype.inputHandler = function (args) {
        var textareaObj =  this;
        var eventArgs = {
            event: args,
            value: this.element.value,
            previousValue: this.inputPreviousValue,
            container: this.textareaWrapper.container
        };
        this.inputPreviousValue = this.element.value;
        /* istanbul ignore next */
        if (this.isAngular) {
            textareaObj.localChange({ value: this.element.value });
            this.preventChange = true;
        }
        if (this.isVue) {
            this.preventChange = true;
        }
        this.trigger('input', eventArgs);
        args.stopPropagation();
    };
    TextArea.prototype.changeHandler = function (args) {
        this.setProperties({ value: this.element.value }, true);
        if (this.previousValue !== this.value) {
            this.raiseChangeEvent(args, true);
        }
        args.stopPropagation();
    };
    TextArea.prototype.raiseChangeEvent = function (event, interaction) {
        var eventArgs = {
            event: event,
            value: this.value,
            previousValue: this.previousValue,
            container: this.textareaWrapper.container,
            isInteraction: interaction ? interaction : false,
            isInteracted: interaction ? interaction : false
        };
        this.preventChange = false;
        this.trigger('change', eventArgs);
        this.previousValue = this.value;
    };
    TextArea.prototype.updateHTMLAttributesToWrapper = function () {
        Input.updateHTMLAttributesToWrapper(this.htmlAttributes, this.textareaWrapper.container);
    };
    TextArea.prototype.updateHTMLAttributesToElement = function () {
        Input.updateHTMLAttributesToElement(this.htmlAttributes, this.element);
    };
    TextArea.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            if (this.enabled) {
                EventHandler.add(this.textareaWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler, this);
            }
            else {
                EventHandler.remove(this.textareaWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler);
            }
        }
    };
    TextArea.prototype.resetInputHandler = function (event) {
        event.preventDefault();
        if (!(this.textareaWrapper.clearButton.classList.contains(HIDE_CLEAR$1)) || this.textareaWrapper.container.classList.contains('e-static-clear')) {
            Input.setValue('', this.element, this.floatLabelType, this.showClearButton);
            this.setProperties({ value: this.element.value }, true);
        }
        var eventArgs = {
            event: event,
            value: this.element.value,
            previousValue: this.inputPreviousValue,
            container: this.textareaWrapper.container
        };
        this.trigger('input', eventArgs);
        this.inputPreviousValue = this.element.value;
        this.raiseChangeEvent(event, true);
        if (closest(this.element, 'form')) {
            var element = this.element;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    /**
     * Adding the multiple attributes as key-value pair to the TextArea element.
     *
     * @param {string} attributes - Specifies the attributes to be add to TextArea element.
     * @returns {void}
     */
    TextArea.prototype.addAttributes = function (attributes) {
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: false }, true);
                Input.setEnabled(this.enabled, this.element, this.floatLabelType, this.textareaWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: true }, true);
                Input.setReadonly(this.readonly, this.element);
            }
            else if (key === 'class') {
                this.element.classList.add(attributes["" + key]);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: attributes["" + key] }, true);
                Input.setPlaceholder(this.placeholder, this.element);
            }
            else {
                this.element.setAttribute(key, attributes["" + key]);
            }
        }
    };
    /**
     * Removing the multiple attributes as key-value pair to the TextArea element.
     *
     * @param { string[] } attributes - Specifies the attributes name to be removed from TextArea element.
     * @returns {void}
     */
    TextArea.prototype.removeAttributes = function (attributes) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var key = attributes_1[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: true }, true);
                Input.setEnabled(this.enabled, this.element, this.floatLabelType, this.textareaWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: false }, true);
                Input.setReadonly(this.readonly, this.element);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: null }, true);
                Input.setPlaceholder(this.placeholder, this.element);
            }
            else {
                this.element.removeAttribute(key);
            }
        }
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    TextArea.prototype.focusIn = function () {
        if (document.activeElement !== this.element && this.enabled) {
            this.element.focus();
            if (this.textareaWrapper.container.classList.contains('e-input-group')
                || this.textareaWrapper.container.classList.contains('e-outline')
                || this.textareaWrapper.container.classList.contains('e-filled')) {
                addClass([this.textareaWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    TextArea.prototype.focusOut = function () {
        if (document.activeElement === this.element && this.enabled) {
            this.element.blur();
            if (this.textareaWrapper.container.classList.contains('e-input-group')
                || this.textareaWrapper.container.classList.contains('e-outline')
                || this.textareaWrapper.container.classList.contains('e-filled')) {
                removeClass([this.textareaWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    /**
     * Sets up the width for the textarea wrapper.
     *
     * @returns {void}
     */
    TextArea.prototype.setWrapperWidth = function () {
        if (this.enabled && ((this.resizeMode !== 'None' && this.resizeMode !== 'Vertical') || (this.cols || this.element.getAttribute('cols')))) {
            if (this.resizeMode !== 'None' && this.resizeMode !== 'Vertical') {
                if (this.textareaWrapper.container.style.width) {
                    this.setElementWidth(this.textareaWrapper.container.style.width);
                    this.textareaWrapper.container.style.width = '';
                    this.textareaWrapper.container.classList.add(AUTO_WIDTH);
                }
            }
            this.textareaWrapper.container.classList.add(AUTO_WIDTH);
        }
        else {
            if (this.textareaWrapper.container.classList.contains(AUTO_WIDTH)) {
                this.textareaWrapper.container.classList.remove(AUTO_WIDTH);
            }
        }
    };
    TextArea.prototype.resetForm = function () {
        if (this.isAngular) {
            this.resetValue('');
        }
        else {
            this.resetValue(this.initialValue);
        }
        if (!isNullOrUndefined(this.textareaWrapper)) {
            var label = this.textareaWrapper.container.querySelector('.e-float-text');
            if (!isNullOrUndefined(label) && this.floatLabelType !== 'Always') {
                if ((isNullOrUndefined(this.initialValue) || this.initialValue === '')) {
                    label.classList.add('e-label-bottom');
                    label.classList.remove('e-label-top');
                }
                else if (this.initialValue !== '') {
                    label.classList.add('e-label-top');
                    label.classList.remove('e-label-bottom');
                }
            }
        }
    };
    TextArea.prototype.resetValue = function (value) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = value;
        if (value == null && this.textareaWrapper.container.classList.contains('e-valid-input') && !(this.floatLabelType === 'Always' && this.textareaWrapper.container.classList.contains('e-outline'))) {
            this.textareaWrapper.container.classList.remove('e-valid-input');
        }
        this.isProtectedOnChange = prevOnChange;
    };
    TextArea.prototype.setElementWidth = function (width) {
        if (typeof width === 'number') {
            this.element.style.width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            this.element.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
        }
    };
    TextArea.prototype.getCurrentResizeClass = function (resizeMode) {
        return resizeMode === 'None' ? RESIZE_NONE : (resizeMode === 'Both' ? RESIZE_XY : resizeMode === 'Horizontal' ? RESIZE_X : RESIZE_Y);
    };
    __decorate$7([
        Property(false)
    ], TextArea.prototype, "readonly", void 0);
    __decorate$7([
        Property(null)
    ], TextArea.prototype, "value", void 0);
    __decorate$7([
        Property('Never')
    ], TextArea.prototype, "floatLabelType", void 0);
    __decorate$7([
        Property('')
    ], TextArea.prototype, "cssClass", void 0);
    __decorate$7([
        Property(null)
    ], TextArea.prototype, "placeholder", void 0);
    __decorate$7([
        Property({})
    ], TextArea.prototype, "htmlAttributes", void 0);
    __decorate$7([
        Property(true)
    ], TextArea.prototype, "enabled", void 0);
    __decorate$7([
        Property(false)
    ], TextArea.prototype, "showClearButton", void 0);
    __decorate$7([
        Property(false)
    ], TextArea.prototype, "enablePersistence", void 0);
    __decorate$7([
        Property(null)
    ], TextArea.prototype, "width", void 0);
    __decorate$7([
        Property('Both')
    ], TextArea.prototype, "resizeMode", void 0);
    __decorate$7([
        Property(null)
    ], TextArea.prototype, "maxLength", void 0);
    __decorate$7([
        Property(null)
    ], TextArea.prototype, "cols", void 0);
    __decorate$7([
        Property(null)
    ], TextArea.prototype, "rows", void 0);
    __decorate$7([
        Event()
    ], TextArea.prototype, "created", void 0);
    __decorate$7([
        Event()
    ], TextArea.prototype, "destroyed", void 0);
    __decorate$7([
        Event()
    ], TextArea.prototype, "change", void 0);
    __decorate$7([
        Event()
    ], TextArea.prototype, "blur", void 0);
    __decorate$7([
        Event()
    ], TextArea.prototype, "focus", void 0);
    __decorate$7([
        Event()
    ], TextArea.prototype, "input", void 0);
    TextArea = __decorate$7([
        NotifyPropertyChanges
    ], TextArea);
    return TextArea;
}(Component));

var CaretPositionHelper = /** @class */ (function () {
    function CaretPositionHelper() {
    }
    CaretPositionHelper.createStyledDiv = function (target, htmlContent) {
        var div = document.createElement('div');
        var styles = {
            position: 'absolute',
            left: -9999,
            top: 0,
            zIndex: -2000
        };
        this.properties.forEach(function (prop) {
            styles["" + prop] = getComputedStyle(target)[prop];
        });
        Object.keys(styles).forEach(function (key) {
            div.style["" + key] = styles["" + key];
        });
        var scrollbarWidth = target.offsetWidth - target.clientWidth;
        div.style.width = (target.clientWidth + scrollbarWidth) + 'px';
        div.innerHTML = htmlContent;
        if (target && target.parentNode) {
            target.parentNode.insertBefore(div, target.nextSibling);
        }
        return div;
    };
    CaretPositionHelper.createCaretMarker = function (target, htmlContent) {
        var div = this.createStyledDiv(target, htmlContent);
        var marker = div.ownerDocument.getElementById('caret-position-marker');
        var position = {
            left: marker.offsetLeft,
            top: marker.offsetTop,
            height: marker.offsetHeight
        };
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        return position;
    };
    CaretPositionHelper.escapeHtml = function (value) {
        return value.replace(/<|>|`|"|&/g, '?').replace(/\r\n|\r|\n/g, '<br/>');
    };
    CaretPositionHelper.getCaretPosition = function (target) {
        var position = target.selectionStart || 0;
        var textBeforeCaret = target.value.slice(0, position);
        var textAfterCaret = target.value.slice(position);
        var content = "<span style=\"position: relative; display: inline;\">" + this.escapeHtml(textBeforeCaret) + "</span>";
        content += '<span id="caret-position-marker" style="position: relative; display: inline;">|</span>';
        content += "<span style=\"position: relative; display: inline;\">" + this.escapeHtml(textAfterCaret) + "</span>";
        var rect = this.createCaretMarker(target, content);
        rect.pos = position;
        return rect;
    };
    CaretPositionHelper.adjustScrollToCaretPosition = function (element) {
        var caretPosition = this.getCaretPosition(element);
        var lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
        if (caretPosition.top > element.clientHeight + element.scrollTop - lineHeight) {
            element.scrollTop = caretPosition.top - element.clientHeight + lineHeight;
        }
    };
    CaretPositionHelper.getTextAreaPosition = function (element) {
        var computedStyle = window.getComputedStyle(element);
        var position = this.getCaretPosition(element);
        return {
            top: position.top + parseFloat(computedStyle.borderTopWidth) + element.offsetTop - element.scrollTop,
            left: position.left + parseFloat(computedStyle.borderLeftWidth) + element.offsetLeft - element.scrollLeft - 0.25,
            height: position.height,
            elemStyle: computedStyle
        };
    };
    CaretPositionHelper.insertCharacter = function (element, text) {
        var start = element.selectionStart;
        var end = element.selectionEnd;
        element.value = element.value.substring(0, start) + text + element.value.substring(end);
        start += text.length;
        element.setSelectionRange(start, start);
    };
    CaretPositionHelper.properties = [
        'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopStyle',
        'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderTopWidth',
        'boxSizing', 'fontFamily', 'fontSize', 'fontWeight', 'height', 'letterSpacing',
        'lineHeight', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop',
        'outlineWidth', 'overflow', 'overflowX', 'overflowY', 'paddingBottom',
        'paddingLeft', 'paddingRight', 'paddingTop', 'textAlign', 'textOverflow',
        'textTransform', 'whiteSpace', 'wordBreak', 'wordWrap', 'width'
    ];
    return CaretPositionHelper;
}());

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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ChatMessageRole;
(function (ChatMessageRole) {
    ChatMessageRole["System"] = "system";
    ChatMessageRole["User"] = "user";
    ChatMessageRole["Assistant"] = "assistant";
})(ChatMessageRole || (ChatMessageRole = {}));
var SmartTextArea = /** @class */ (function (_super) {
    __extends$8(SmartTextArea, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {SmartTextArea} options - Specifies Smart text area model
     * @param {string | HTMLTextAreaElement} element - Specifies target element
     */
    function SmartTextArea(options, element) {
        return _super.call(this, options, element) || this;
    }
    SmartTextArea.prototype.render = function () {
        _super.prototype.render.call(this);
        if (!(this.element instanceof HTMLTextAreaElement)) {
            return;
        }
        this.textArea = this.element;
        var smartTextArea = createElement('smart-textarea');
        smartTextArea.classList.add('e-smart-textarea');
        this.textArea.after(smartTextArea);
        if (this.showSuggestionOnPopup !== 'None') {
            var suggestionState = this.showSuggestionOnPopup === 'Enable' ? 'false' : 'true';
            this.textArea.setAttribute('data-inline-suggestions', suggestionState);
        }
        this.suggestionDisplay = this.shouldShowInlineSuggestions(this.textArea) ?
            new InlineSuggestion(smartTextArea, this.textArea) : new ContextSuggestion(smartTextArea, this.textArea);
    };
    SmartTextArea.prototype.wireEvents = function () {
        var _this = this;
        _super.prototype.wireEvents.call(this);
        EventHandler.add(this.element, 'keyup', this.handleKeyUp, this);
        EventHandler.add(this.element, 'keydown', this.handleKeyDown, this);
        EventHandler.add(this.element, 'mousedown', this.removeExistingOrPendingSuggestion, this);
        EventHandler.add(this.element, 'focusout', this.removeExistingOrPendingSuggestion, this);
        this.element.addEventListener('scroll', (function () { return _this.suggestionDisplay.reject(); }), {
            passive: true
        });
    };
    SmartTextArea.prototype.unWireEvents = function () {
        var _this = this;
        _super.prototype.unWireEvents.call(this);
        EventHandler.remove(this.element, 'keyup', this.handleKeyUp);
        EventHandler.remove(this.element, 'keydown', this.handleKeyDown);
        EventHandler.remove(this.element, 'mousedown', this.removeExistingOrPendingSuggestion);
        EventHandler.remove(this.element, 'focusout', this.removeExistingOrPendingSuggestion);
        this.element.removeEventListener('scroll', (function () { return _this.suggestionDisplay.reject(); }));
    };
    SmartTextArea.prototype.keydownHandler = function () {
        // Overridden to prevent default behavior
    };
    SmartTextArea.prototype.shouldShowInlineSuggestions = function (textArea) {
        var inlineSuggestions = textArea.getAttribute('data-inline-suggestions');
        if (inlineSuggestions) {
            return inlineSuggestions.toLowerCase() === 'true';
        }
        return !('ontouchstart' in window);
    };
    SmartTextArea.prototype.handleKeyDown = function (event) {
        switch (event.key) {
            case 'Tab':
                if (this.suggestionDisplay.isShowing()) {
                    this.suggestionDisplay.accept();
                    event.preventDefault();
                }
                break;
            case 'Alt':
            case 'Control':
            case 'Shift':
            case 'Command':
                break;
            default:
                if (this.suggestionDisplay.isShowing() && this.suggestionDisplay.currentSuggestion.startsWith(event.key)) {
                    CaretPositionHelper.insertCharacter(this.textArea, event.key);
                    event.preventDefault();
                    this.suggestionDisplay.show(this.suggestionDisplay.currentSuggestion.substring(event.key.length));
                    CaretPositionHelper.adjustScrollToCaretPosition(this.textArea);
                }
                else {
                    this.removeExistingOrPendingSuggestion();
                }
                break;
        }
    };
    SmartTextArea.prototype.handleKeyUp = function () {
        var _this = this;
        if (!this.suggestionDisplay.isShowing()) {
            clearTimeout(this.typingDebounceTimeout);
            this.typingDebounceTimeout = setTimeout(function () { return _this.handleTypingPaused(); }, 350);
        }
    };
    SmartTextArea.prototype.handleTypingPaused = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (document.activeElement !== this.textArea) {
                            return [2 /*return*/];
                        }
                        if (!(this.textArea.selectionStart === this.textArea.selectionEnd &&
                            (this.textArea.selectionStart === this.textArea.value.length ||
                                this.textArea.value[this.textArea.selectionStart] === '\n'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requestSuggestionAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SmartTextArea.prototype.removeExistingOrPendingSuggestion = function () {
        clearTimeout(this.typingDebounceTimeout);
        if (this.pendingSuggestionAbort) {
            this.pendingSuggestionAbort.abort();
            this.pendingSuggestionAbort = null;
        }
        this.suggestionDisplay.reject();
    };
    SmartTextArea.prototype.createSuggestionPrompt = function (textBefore, textAfter) {
        var stringBuilder = 'Predict what text the user in the given ROLE would insert at the cursor position indicated by ^^^.\nOnly give predictions for which you have' +
            ' an EXTREMELY high confidence that the user would insert that EXACT text.\nDo not make up new information. If you are not sure, ' +
            'just reply with NO_PREDICTION.\n\nRULES:\n1. Reply with OK:, then in square brackets the predicted text, then END_INSERTION, and no other output.\n2. ' +
            'When a specific value or quantity cannot be inferred and would need to be provided, use the word NEED_INFO.\n3. ' +
            'If there is not enough information to predict any words that the user would type next, just reply with the word NO_PREDICTION.' +
            '\n4. NEVER invent new information. If you can not be sure what the user is about to type, ALWAYS stop the prediction with END_INSERTION.';
        var userPhrases = this.UserPhrases;
        if (userPhrases && userPhrases.length > 0) {
            stringBuilder += '\nAlways try to use variations on the following phrases as part of the predictions:\n';
            for (var _i = 0, userPhrases_1 = userPhrases; _i < userPhrases_1.length; _i++) {
                var phrase = userPhrases_1[_i];
                stringBuilder += "- " + phrase + "\n";
            }
        }
        var chatMessageList = [
            { role: ChatMessageRole.System, content: stringBuilder },
            { role: ChatMessageRole.User, content: 'ROLE: Family member sending a text\nUSER_TEXT: Hey, it is a nice day - the weather is ^^^' },
            { role: ChatMessageRole.Assistant, content: 'OK:[great!]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Customer service assistant\nUSER_TEXT: You can find more information on^^^\n\nAlternatively, phone us.' },
            { role: ChatMessageRole.Assistant, content: 'OK:[ our website at NEED_INFO]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Casual\nUSER_TEXT: Oh I see!\n\nWell sure thing, we can' },
            { role: ChatMessageRole.Assistant, content: 'OK:[ help you out with that!]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Storyteller\nUSER_TEXT: Sir Digby Chicken Caesar, also know^^^' },
            { role: ChatMessageRole.Assistant, content: 'OK:[n as NEED_INFO]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Customer support agent\nUSER_TEXT: Goodbye for now.^^^' },
            { role: ChatMessageRole.Assistant, content: 'NO_PREDICTION END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Pirate\nUSER_TEXT: Have you found^^^' },
            { role: ChatMessageRole.Assistant, content: 'OK:[ the treasure, me hearties?]END_INSERTION' },
            { role: ChatMessageRole.User, content: "ROLE: " + this.userRole + "\nUSER_TEXT: " + textBefore + "^^^" + textAfter }
        ];
        return {
            messages: chatMessageList,
            temperature: 0.0,
            maxTokens: 400,
            stopSequences: ['END_INSERTION', 'NEED_INFO'],
            frequencyPenalty: 0.0,
            presencePenalty: 0.0
        };
    };
    SmartTextArea.prototype.requestSuggestionAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestDetails, suggestionData, chatConfig, insertSuggestion, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pendingSuggestionAbort) {
                            this.pendingSuggestionAbort.abort();
                            return [2 /*return*/];
                        }
                        this.pendingSuggestionAbort = new AbortController();
                        requestDetails = {
                            textAreaValue: this.textArea.value,
                            cursorPosition: this.textArea.selectionStart
                        };
                        suggestionData = {
                            textBefore: requestDetails.textAreaValue.substring(0, requestDetails.cursorPosition),
                            textAfter: requestDetails.textAreaValue.substring(requestDetails.cursorPosition)
                        };
                        chatConfig = this.createSuggestionPrompt(suggestionData.textBefore, suggestionData.textAfter);
                        if (!(typeof this.aiSuggestionHandler === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.aiSuggestionHandler(chatConfig)];
                    case 1:
                        response = _a.sent();
                        insertSuggestion = this.validateSuggestion(response, suggestionData.textBefore);
                        _a.label = 2;
                    case 2:
                        if (insertSuggestion && requestDetails.textAreaValue === this.textArea.value &&
                            requestDetails.cursorPosition === this.textArea.selectionStart) {
                            if (!insertSuggestion.endsWith(' ')) {
                                insertSuggestion += ' ';
                            }
                            this.suggestionDisplay.show(insertSuggestion);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SmartTextArea.prototype.validateSuggestion = function (response, textBefore) {
        var suggestion;
        if (typeof response !== 'string' || response.length <= 5 || response.indexOf('OK:[') !== 0) {
            return '';
        }
        var endIndex = this.indexOfAny(response, ['.', '?', '!']);
        if (endIndex > 0 && response.length > endIndex + 1 && response[endIndex + 1] === ' ') {
            response = response.substring(0, endIndex + 1);
        }
        suggestion = response.substring(4).replace(/[\]\s]+$/, '');
        if (textBefore.length > 0 && textBefore[textBefore.length - 1] === ' ') {
            suggestion = suggestion.replace(/^\s+/, '');
        }
        return suggestion;
    };
    SmartTextArea.prototype.indexOfAny = function (str, chars) {
        for (var i = 0; i < str.length; i++) {
            if (chars.indexOf(str["" + i]) !== -1) {
                return i;
            }
        }
        return -1;
    };
    SmartTextArea.prototype.getModuleName = function () {
        return 'smarttextarea';
    };
    SmartTextArea.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.textArea = null;
        this.suggestionDisplay = null;
        this.typingDebounceTimeout = null;
    };
    __decorate$8([
        Property('')
    ], SmartTextArea.prototype, "userRole", void 0);
    __decorate$8([
        Property([])
    ], SmartTextArea.prototype, "UserPhrases", void 0);
    __decorate$8([
        Property()
    ], SmartTextArea.prototype, "aiSuggestionHandler", void 0);
    __decorate$8([
        Property('None')
    ], SmartTextArea.prototype, "showSuggestionOnPopup", void 0);
    return SmartTextArea;
}(TextArea));
var InlineSuggestion = /** @class */ (function () {
    function InlineSuggestion(smartTextArea, textArea) {
        this.owner = smartTextArea;
        this.textArea = textArea;
        this.latestSuggestionText = '';
        this.suggestionStartPos = null;
        this.suggestionEndPos = null;
        this.virtualCaret = null;
        this.originalValueProperty = this.getOriginalValueProperty(textArea, 'value');
    }
    Object.defineProperty(InlineSuggestion.prototype, "value", {
        get: function () {
            var value = this.originalValueProperty.get.call(this.textArea);
            return this.isShowing() ? value.substring(0, this.suggestionStartPos) + value.substring(this.suggestionEndPos) : value;
        },
        set: function (newValue) {
            this.originalValueProperty.set.call(this.textArea, newValue);
        },
        enumerable: true,
        configurable: true
    });
    InlineSuggestion.prototype.getOriginalValueProperty = function (obj, property) {
        while (obj) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, property);
            if (descriptor) {
                return descriptor;
            }
            obj = Object.getPrototypeOf(obj);
        }
        throw new Error("Property " + property + " not found on object or its prototype chain");
    };
    Object.defineProperty(InlineSuggestion.prototype, "valueIncludingSuggestion", {
        get: function () {
            return this.originalValueProperty.get.call(this.textArea);
        },
        set: function (newValue) {
            this.originalValueProperty.set.call(this.textArea, newValue);
        },
        enumerable: true,
        configurable: true
    });
    InlineSuggestion.prototype.isShowing = function () {
        return this.suggestionStartPos !== null;
    };
    InlineSuggestion.prototype.show = function (suggestionText) {
        this.latestSuggestionText = suggestionText;
        this.suggestionStartPos = this.textArea.selectionStart;
        this.suggestionEndPos = this.suggestionStartPos + suggestionText.length;
        this.textArea.setAttribute('data-suggestion-visible', '');
        this.valueIncludingSuggestion = this.valueIncludingSuggestion.substring(0, this.suggestionStartPos) +
            suggestionText +
            this.valueIncludingSuggestion.substring(this.suggestionStartPos);
        this.textArea.setSelectionRange(this.suggestionStartPos, this.suggestionEndPos);
        if (!this.virtualCaret) {
            this.virtualCaret = new VirtualCaret(this.owner, this.textArea);
        }
        this.virtualCaret.show();
    };
    Object.defineProperty(InlineSuggestion.prototype, "currentSuggestion", {
        get: function () {
            return this.latestSuggestionText;
        },
        enumerable: true,
        configurable: true
    });
    InlineSuggestion.prototype.accept = function () {
        this.textArea.setSelectionRange(this.suggestionEndPos, this.suggestionEndPos);
        this.suggestionStartPos = null;
        this.suggestionEndPos = null;
        if (this.virtualCaret) {
            this.virtualCaret.hide();
        }
        this.textArea.removeAttribute('data-suggestion-visible');
        CaretPositionHelper.adjustScrollToCaretPosition(this.textArea);
    };
    InlineSuggestion.prototype.reject = function () {
        if (!this.isShowing()) {
            return;
        }
        var selectionStart = this.textArea.selectionStart;
        var selectionEnd = this.textArea.selectionEnd;
        this.valueIncludingSuggestion = this.valueIncludingSuggestion.substring(0, this.suggestionStartPos) +
            this.valueIncludingSuggestion.substring(this.suggestionEndPos);
        if (this.suggestionStartPos === selectionStart && this.suggestionEndPos === selectionEnd) {
            this.textArea.setSelectionRange(selectionStart, selectionStart);
        }
        this.suggestionStartPos = null;
        this.suggestionEndPos = null;
        this.textArea.removeAttribute('data-suggestion-visible');
        if (this.virtualCaret) {
            this.virtualCaret.hide();
        }
    };
    return InlineSuggestion;
}());
var ContextSuggestion = /** @class */ (function () {
    function ContextSuggestion(container, textArea) {
        var _this = this;
        this.latestSuggestionText = '';
        this.showing = false;
        this.textArea = textArea;
        this.suggestionElement = document.createElement('div');
        this.suggestionElement.classList.add('smart-textarea-suggestion-overlay');
        this.suggestionElement.addEventListener('mousedown', function (event) { return _this.handleSuggestionClicked(event); });
        this.suggestionElement.addEventListener('touchend', function (event) { return _this.handleSuggestionClicked(event); });
        this.suggestionPrefixElement = document.createElement('span');
        this.suggestionTextElement = document.createElement('span');
        this.suggestionElement.appendChild(this.suggestionPrefixElement);
        this.suggestionElement.appendChild(this.suggestionTextElement);
        this.suggestionPrefixElement.style.opacity = '0.3';
        var computedStyle = window.getComputedStyle(this.textArea);
        this.suggestionElement.style.font = computedStyle.font;
        this.suggestionElement.style.marginTop = 1.4 * parseFloat(computedStyle.fontSize) + "px";
        container.appendChild(this.suggestionElement);
    }
    Object.defineProperty(ContextSuggestion.prototype, "currentSuggestion", {
        get: function () {
            return this.latestSuggestionText;
        },
        enumerable: true,
        configurable: true
    });
    ContextSuggestion.prototype.show = function (suggestionText) {
        this.latestSuggestionText = suggestionText;
        this.suggestionPrefixElement.textContent = suggestionText[0] !== ' ' ? this.getPrefixText(this.textArea, 20) : '';
        this.suggestionTextElement.textContent = suggestionText;
        var position = CaretPositionHelper.getTextAreaPosition(this.textArea);
        var style = this.suggestionElement.style;
        style.minWidth = null;
        this.suggestionElement.classList.add('smart-textarea-suggestion-overlay-visible');
        style.zIndex = this.textArea.style.zIndex + 1;
        style.top = position.top + "px";
        var leftPosition = position.left - this.suggestionPrefixElement.offsetWidth;
        if (!style.left || Math.abs(parseFloat(style.left) - leftPosition) > 10) {
            style.left = leftPosition + "px";
        }
        this.showing = true;
        var computedStyle = window.getComputedStyle(this.suggestionElement);
        var lineHeight = parseFloat(computedStyle.lineHeight);
        var paddingTop = parseFloat(computedStyle.paddingTop);
        var paddingBottom = parseFloat(computedStyle.paddingBottom);
        var lines = Math.round((this.suggestionElement.offsetHeight - paddingTop - paddingBottom) / lineHeight);
        if (lines > 2) {
            var elementWidth = this.suggestionElement.offsetWidth;
            style.minWidth = "calc(min(70vw, " + (lines * elementWidth) / 2 + "px))";
        }
        var rect = this.suggestionElement.getBoundingClientRect();
        if (rect.right > document.body.clientWidth - 20) {
            style.left = "calc(" + (parseFloat(style.left) - (rect.right - document.body.clientWidth)) + "px - 2rem)";
        }
    };
    ContextSuggestion.prototype.accept = function () {
        if (this.showing) {
            CaretPositionHelper.insertCharacter(this.textArea, this.currentSuggestion);
            CaretPositionHelper.adjustScrollToCaretPosition(this.textArea);
            this.hide();
        }
    };
    ContextSuggestion.prototype.reject = function () {
        this.hide();
    };
    ContextSuggestion.prototype.hide = function () {
        if (this.showing) {
            this.showing = false;
            this.suggestionElement.classList.remove('smart-textarea-suggestion-overlay-visible');
        }
    };
    ContextSuggestion.prototype.isShowing = function () {
        return this.showing;
    };
    ContextSuggestion.prototype.handleSuggestionClicked = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.accept();
    };
    ContextSuggestion.prototype.getPrefixText = function (textArea, maxLength) {
        var value = textArea.value;
        var selectionStart = textArea.selectionStart;
        for (var i = selectionStart - 1; i > selectionStart - maxLength; i--) {
            if (i < 0 || /\s/.test(value["" + i])) {
                return value.substring(i + 1, selectionStart);
            }
        }
        return '';
    };
    return ContextSuggestion;
}());
var VirtualCaret = /** @class */ (function () {
    function VirtualCaret(smartTextArea, textArea) {
        this.textArea = textArea;
        this.caretDiv = document.createElement('div');
        this.caretDiv.classList.add('smart-textarea-caret');
        smartTextArea.appendChild(this.caretDiv);
    }
    VirtualCaret.prototype.show = function () {
        var textAreaPosition = CaretPositionHelper.getTextAreaPosition(this.textArea);
        var caretStyle = this.caretDiv.style;
        caretStyle.display = 'block';
        caretStyle.top = textAreaPosition.top + 'px';
        caretStyle.left = textAreaPosition.left + 'px';
        caretStyle.height = textAreaPosition.height + 'px';
        caretStyle.zIndex = this.textArea.style.zIndex;
        caretStyle.backgroundColor = textAreaPosition.elemStyle.caretColor;
    };
    VirtualCaret.prototype.hide = function () {
        this.caretDiv.style.display = 'none';
    };
    return VirtualCaret;
}());

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
var SignatureBase = /** @class */ (function (_super) {
    __extends$9(SignatureBase, _super);
    function SignatureBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* minDistance(distance between the two point) was calaculated for smoothness.*/
        _this.minDistance = 5;
        _this.previous = 0;
        /* interval handles for the smoothness in the mouse move event.*/
        _this.interval = 30;
        _this.timeout = null;
        _this.isSignatureEmpty = true;
        _this.backgroundLoaded = null;
        _this.isBlazor = false;
        _this.isResponsive = false;
        _this.signPointsColl = [];
        _this.signRatioPointsColl = [];
        _this.canRedraw = true;
        return _this;
    }
    /**
     * To Initialize the component rendering
     *
     * @private
     * @param {HTMLCanvasElement} element - Specifies the canvas element.
     * @param {BlazorDotnetObject} dotnetRef - Specifies for blazor client to server communication.
     * @returns {void}
     */
    SignatureBase.prototype.initialize = function (element, dotnetRef) {
        this.clearArray = [];
        this.element = element;
        this.canvasContext = this.element.getContext('2d');
        this.canvasContext.canvas.tabIndex = -1;
        if (dotnetRef) {
            this.dotnetRef = dotnetRef;
            this.isBlazor = true;
            if (this.signatureValue) {
                this.loadPersistedSignature();
            }
        }
        this.setHTMLProperties();
        if (isNullOrUndefined(this.signatureValue)) {
            this.updateSnapCollection(true);
        }
        this.wireEvents();
        if (!this.isBlazor) {
            this.trigger('created', null);
        }
    };
    SignatureBase.prototype.wireEvents = function () {
        if (isNullOrUndefined(this.pointColl) && !this.isReadOnly && !this.disabled) {
            EventHandler.add(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler, this);
            EventHandler.add(this.canvasContext.canvas, 'keydown', this.keyboardHandler, this);
            window.addEventListener('resize', this.resizeHandler.bind(this));
        }
        else if (this.pointColl) {
            EventHandler.add(this.canvasContext.canvas, 'mousemove touchmove', this.mouseMoveHandler, this);
            EventHandler.add(this.canvasContext.canvas, 'mouseup touchend', this.mouseUpHandler, this);
            EventHandler.add(document, 'mouseup', this.mouseUpHandler, this);
        }
    };
    SignatureBase.prototype.unwireEvents = function (type) {
        if (type === 'mouseup' || type === 'touchend') {
            if (this.canvasContext) {
                EventHandler.remove(this.canvasContext.canvas, 'mousemove touchmove', this.mouseMoveHandler);
                EventHandler.remove(this.canvasContext.canvas, 'mouseup touchend', this.mouseUpHandler);
            }
            EventHandler.remove(document, 'mouseup', this.mouseUpHandler);
        }
        else {
            if (this.canvasContext) {
                EventHandler.remove(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler);
                EventHandler.remove(this.canvasContext.canvas, 'keydown', this.keyboardHandler);
            }
            window.removeEventListener('resize', this.resizeHandler);
        }
    };
    SignatureBase.prototype.setHTMLProperties = function () {
        // eslint-disable-next-line max-len
        if (this.element.height === 150 && this.element.width === 300 && this.element.offsetHeight !== 0 && this.element.offsetWidth !== 0) {
            this.element.height = this.element.offsetHeight;
            this.element.width = this.element.offsetWidth;
            this.isResponsive = true;
        }
        else if ((this.element.height !== this.element.offsetHeight - 1 || this.element.width !== this.element.offsetWidth - 1)
            && this.element.offsetHeight !== 0 && this.element.offsetWidth !== 0) {
            this.element.height = this.element.offsetHeight;
            this.element.width = this.element.offsetWidth;
        }
        this.canvasContext.fillStyle = this.strokeColor;
        this.tempCanvas = this.createElement('canvas', { className: 'e-' + this.getModuleName() + '-temp' });
        this.tempContext = this.tempCanvas.getContext('2d');
        this.tempCanvas.width = this.element.width;
        this.tempCanvas.height = this.element.height;
        if (this.backgroundImage) {
            this.canvasContext.canvas.style.backgroundImage = 'url(' + this.backgroundImage + ')';
            this.canvasContext.canvas.style.backgroundRepeat = 'no-repeat';
            if (this.saveWithBackground) {
                this.setBackgroundImage(this.backgroundImage, 'temp');
            }
        }
        else if (this.backgroundColor) {
            this.canvasContext.canvas.style.backgroundColor = this.backgroundColor;
        }
    };
    SignatureBase.prototype.mouseDownHandler = function (e) {
        if (e.buttons === 1 || e.buttons === 2 || e.type === 'touchstart') {
            if (e.type === 'touchstart') {
                e.preventDefault();
                e.stopPropagation();
            }
            this.beginStroke(e);
            this.wireEvents();
        }
    };
    SignatureBase.prototype.mouseMoveHandler = function (e) {
        if (e.buttons === 1 || e.buttons === 2 || e.type === 'touchmove') {
            if (e.type === 'touchmove') {
                e.preventDefault();
                e.stopPropagation();
            }
            if (this.interval) {
                this.updateStrokeWithThrottle(e);
            }
            else {
                this.updateStroke(e);
            }
        }
    };
    SignatureBase.prototype.mouseUpHandler = function (e) {
        var args = { actionName: 'strokeUpdate' };
        if (e.type === 'touchstart') {
            e.preventDefault();
            e.stopPropagation();
        }
        this.endDraw();
        this.updateSnapCollection();
        this.unwireEvents(e.type);
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'mouseUp');
        }
        this.signatureValue = this.snapColl[this.incStep];
        for (var i = 0; i < this.signPointsColl.length; i++) {
            this.signRatioPointsColl.push({ x: (this.signPointsColl[i].x / this.canvasContext.canvas.width),
                y: (this.signPointsColl[i].y / this.canvasContext.canvas.height) });
        }
        this.signPointsColl = [];
    };
    SignatureBase.prototype.keyboardHandler = function (e) {
        var _this = this;
        var args = { fileName: 'Signature', type: 'Png', cancel: false };
        switch (e.key) {
            case 'Delete':
                this.clear();
                break;
            case (e.ctrlKey && 's'):
                if (!this.isBlazor) {
                    this.trigger('beforeSave', args, function (observableSaveArgs) {
                        if (!args.cancel) {
                            _this.save(observableSaveArgs.type, observableSaveArgs.fileName);
                        }
                    });
                }
                else {
                    this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'beforeSave');
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                break;
            case (e.ctrlKey && 'z'):
                this.undo();
                break;
            case (e.ctrlKey && 'y'):
                this.redo();
                break;
        }
    };
    SignatureBase.prototype.resizeHandler = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (this.isResponsive && this.canRedraw && this.canvasContext && this.element) {
            this.canvasContext.canvas.width = this.element.offsetWidth;
            this.canvasContext.canvas.height = this.element.offsetHeight;
            this.canvasContext.scale(1, 1);
            this.canvasContext.fillStyle = this.strokeColor;
            var pointSize = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
            for (var i = 0; i < this.signRatioPointsColl.length; i++) {
                this.arcDraw((this.signRatioPointsColl[i].x * this.canvasContext.canvas.width), (this.signRatioPointsColl[i].y * this.canvasContext.canvas.height), pointSize);
            }
            this.signPointsColl = [];
            this.canvasContext.closePath();
            this.canvasContext.fill();
        }
        else if (this.canvasContext && this.element) {
            var restoreImg_1 = new Image();
            restoreImg_1.src = this.snapColl[this.incStep];
            restoreImg_1.onload = function () {
                proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
                proxy.canvasContext.drawImage(restoreImg_1, 0, 0, proxy.element.width, proxy.element.height);
            };
        }
    };
    SignatureBase.prototype.beginStroke = function (e) {
        this.internalRefresh();
        this.updateStroke(e);
    };
    SignatureBase.prototype.updateStroke = function (e) {
        var point = this.createPoint(e);
        this.addPoint(point);
    };
    SignatureBase.prototype.updateStrokeWithThrottle = function (args) {
        var now = Date.now();
        var remaining = this.interval - (now - this.previous);
        this.storedArgs = args;
        if (remaining <= 0 || remaining > this.interval) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.previous = now;
            this.updateStroke(this.storedArgs);
            if (!this.timeout) {
                this.storedArgs = null;
            }
        }
        else if (!this.timeout) {
            this.timeout = window.setTimeout(this.delay.bind(this), remaining);
        }
    };
    SignatureBase.prototype.delay = function () {
        this.previous = Date.now();
        this.timeout = null;
        this.updateStroke(this.storedArgs);
        if (!this.timeout) {
            this.storedArgs = null;
        }
    };
    SignatureBase.prototype.createPoint = function (e) {
        var rect = this.canvasContext.canvas.getBoundingClientRect();
        if (e.type === 'mousedown' || e.type === 'mousemove') {
            return this.point(e.clientX - rect.left, e.clientY - rect.top, new Date().getTime());
        }
        else {
            return this.point(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top, new Date().getTime());
        }
    };
    /* Returns the current point corrdinates(x, y) and time.*/
    SignatureBase.prototype.point = function (pointX, pointY, time) {
        this.pointX = pointX;
        this.pointY = pointY;
        this.time = time || new Date().getTime();
        return { x: this.pointX, y: this.pointY, time: this.time };
    };
    SignatureBase.prototype.addPoint = function (point) {
        var points = this.pointColl;
        var controlPoint1;
        var controlPoint2;
        var lastPoint = points.length > 0 && points[points.length - 1];
        var isLastPointTooClose = lastPoint ? this.distanceTo(lastPoint) <= this.minDistance : false;
        if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
            points.push(point);
            if (points.length > 2) {
                if (points.length === 3) {
                    points.unshift(points[0]);
                }
                controlPoint1 = (this.calculateCurveControlPoints(points[0], points[1], points[2])).controlPoint2;
                controlPoint2 = (this.calculateCurveControlPoints(points[1], points[2], points[3])).controlPoint1;
                this.startPoint = points[1];
                this.controlPoint1 = controlPoint1;
                this.controlPoint2 = controlPoint2;
                this.endPoint = points[2];
                this.startDraw();
                points.shift();
            }
        }
    };
    SignatureBase.prototype.startDraw = function () {
        var velocity;
        velocity = this.pointVelocityCalc(this.startPoint);
        velocity = this.velocity * velocity + (1 - this.velocity) * this.lastVelocity;
        var newWidth = Math.max(this.maxStrokeWidth / (velocity + 1), this.minStrokeWidth);
        this.curveDraw(this.lastWidth, newWidth);
        this.lastVelocity = velocity;
        this.lastWidth = newWidth;
    };
    SignatureBase.prototype.endDraw = function () {
        if (isNullOrUndefined(this.pointColl)) {
            return;
        }
        var canDrawCurve = this.pointColl.length > 2;
        var point = this.pointColl[0];
        if (!canDrawCurve && point) {
            this.strokeDraw(point);
        }
    };
    /* Calculate the Bezier (x, y) coordinate of the curve. */
    SignatureBase.prototype.curveDraw = function (startWidth, endWidth) {
        var context = this.canvasContext;
        var width;
        var i;
        var t1;
        var t2;
        var t3;
        var u1;
        var u2;
        var u3;
        var x;
        var y;
        var widthValue = endWidth - startWidth;
        var bezierLength = this.bezierLengthCalc();
        var drawSteps = Math.ceil(bezierLength) * 2;
        context.beginPath();
        for (i = 0; i < drawSteps; i++) {
            t1 = i / drawSteps;
            t2 = t1 * t1;
            t3 = t2 * t1;
            u1 = 1 - t1;
            u2 = u1 * u1;
            u3 = u2 * u1;
            x = u3 * this.startPoint.x;
            x += 3 * u2 * t1 * this.controlPoint1.x;
            x += 3 * u1 * t2 * this.controlPoint2.x;
            x += t3 * this.endPoint.x;
            y = u3 * this.startPoint.y;
            y += 3 * u2 * t1 * this.controlPoint1.y;
            y += 3 * u1 * t2 * this.controlPoint2.y;
            y += t3 * this.endPoint.y;
            width = Math.min(startWidth + t3 * widthValue, this.maxStrokeWidth);
            this.arcDraw(x, y, width);
        }
        context.closePath();
        context.fill();
        this.isSignatureEmpty = false;
    };
    SignatureBase.prototype.strokeDraw = function (point) {
        var context = this.canvasContext;
        var pointSize = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
        context.beginPath();
        this.arcDraw(point.x, point.y, pointSize);
        context.closePath();
        context.fill();
        this.isSignatureEmpty = false;
    };
    SignatureBase.prototype.arcDraw = function (x, y, size) {
        this.signPointsColl.push({ x: x, y: y });
        var context = this.canvasContext;
        context.moveTo(x, y);
        context.arc(x, y, size, 0, 2 * Math.PI, false);
    };
    /* Utility functions for Bezier algorithm*/
    SignatureBase.prototype.calculateCurveControlPoints = function (p1, p2, p3) {
        var dx1 = p1.x - p2.x;
        var dy1 = p1.y - p2.y;
        var dx2 = p2.x - p3.x;
        var dy2 = p2.y - p3.y;
        var m1 = { x: (p1.x + p2.x) / 2.0, y: (p1.y + p2.y) / 2.0 };
        var m2 = { x: (p2.x + p3.x) / 2.0, y: (p2.y + p3.y) / 2.0 };
        var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        var dxm = (m1.x - m2.x);
        var dym = (m1.y - m2.y);
        var k = l2 / (l1 + l2);
        var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
        var tx = p2.x - cm.x;
        var ty = p2.y - cm.y;
        return {
            controlPoint1: this.point(m1.x + tx, m1.y + ty, 0),
            controlPoint2: this.point(m2.x + tx, m2.y + ty, 0)
        };
    };
    /* Returns approximated bezier length of the curuve.*/
    SignatureBase.prototype.bezierLengthCalc = function () {
        var steps = 10;
        var length = 0;
        var i;
        var t;
        var pointx1;
        var pointy1;
        var pointx2;
        var pointy2;
        var pointx3;
        var pointy3;
        for (i = 0; i <= steps; i++) {
            t = i / steps;
            pointx1 = this.bezierPointCalc(t, this.startPoint.x, this.controlPoint1.x, this.controlPoint2.x, this.endPoint.x);
            pointy1 = this.bezierPointCalc(t, this.startPoint.y, this.controlPoint1.y, this.controlPoint2.y, this.endPoint.y);
            if (i > 0) {
                pointx3 = pointx1 - pointx2;
                pointy3 = pointy1 - pointy2;
                length += Math.sqrt(pointx3 * pointx3 + pointy3 * pointy3);
            }
            pointx2 = pointx1;
            pointy2 = pointy1;
        }
        return length;
    };
    /* Calculate parametric value of x or y given t and the
       four point(startpoint, controlpoint1, controlpoint2, endpoint) coordinates of a cubic bezier curve.*/
    SignatureBase.prototype.bezierPointCalc = function (t, startpoint, cp1, cp2, endpoint) {
        return startpoint * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * cp1 * (1.0 - t) * (1.0 - t) * t + 3.0 *
            cp2 * (1.0 - t) * t * t + endpoint * t * t * t;
    };
    /* Velocity between the current point and last point.*/
    SignatureBase.prototype.pointVelocityCalc = function (startPoint) {
        return (this.time !== startPoint.time) ? this.distanceTo(startPoint) / (this.time - startPoint.time) : 0;
    };
    /* Distance between the current point and last point.*/
    SignatureBase.prototype.distanceTo = function (start) {
        return Math.sqrt(Math.pow(this.pointX - start.x, 2) + Math.pow(this.pointY - start.y, 2));
    };
    SignatureBase.prototype.isRead = function (isRead) {
        if (isRead) {
            EventHandler.remove(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler);
        }
        else if (!this.disabled) {
            EventHandler.add(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler, this);
        }
    };
    SignatureBase.prototype.enableOrDisable = function (isDisable) {
        this.disabled = isDisable;
        if (isDisable) {
            this.canvasContext.canvas.style.filter = 'opacity(0.5)';
            this.isRead(true);
        }
        else {
            this.canvasContext.canvas.style.filter = '';
            this.isRead(false);
        }
    };
    SignatureBase.prototype.updateSnapCollection = function (isClear) {
        if (isNullOrUndefined(this.incStep)) {
            this.incStep = -1;
            this.incStep++;
            this.snapColl = [];
            this.clearArray = [];
        }
        else {
            this.incStep++;
        }
        if (this.incStep < this.snapColl.length) {
            this.snapColl.length = this.incStep;
        }
        if (this.incStep > 0) {
            var canvasNew = this.createElement('canvas', { className: 'e-' + this.getModuleName() + '-wrapper' });
            var canvasContextNew = canvasNew.getContext('2d');
            if (this.canvasContext) {
                canvasNew.width = this.canvasContext.canvas.width;
                canvasNew.height = this.canvasContext.canvas.height;
                canvasContextNew.drawImage(this.canvasContext.canvas, 0, 0, canvasNew.width, canvasNew.height);
                this.snapColl.push(canvasNew.toDataURL());
            }
        }
        else {
            this.snapColl.push(this.canvasContext.canvas.toDataURL());
        }
        if (isClear) {
            this.clearArray.push(this.incStep);
        }
    };
    SignatureBase.prototype.setBackgroundImage = function (imageSrc, type) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var imageObj = new Image();
        imageObj.crossOrigin = 'anonymous';
        imageObj.src = imageSrc;
        if (type === 'temp') {
            imageObj.onload = function () {
                proxy.tempContext.globalCompositeOperation = 'source-over';
                proxy.tempContext.drawImage(imageObj, 0, 0, proxy.element.width, proxy.element.height);
            };
        }
        else {
            imageObj.onload = function () {
                proxy.canvasContext.globalCompositeOperation = 'source-over';
                proxy.canvasContext.drawImage(imageObj, 0, 0, proxy.element.width, proxy.element.height);
                proxy.updateSnapCollection();
                proxy.saveBackground(true);
            };
            this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        }
    };
    SignatureBase.prototype.setBackgroundColor = function (color) {
        var canvasEle = this.canvasContext;
        canvasEle.strokeStyle = color;
        var i;
        var j;
        for (i = 1; i <= canvasEle.canvas.width; i++) {
            for (j = 1; j <= canvasEle.canvas.height; j++) {
                canvasEle.strokeRect(0, 0, i, j);
            }
        }
        this.updateSnapCollection();
    };
    SignatureBase.prototype.loadPersistedSignature = function () {
        if (isNullOrUndefined(this.signatureValue)) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var lastImage = new Image();
        lastImage.src = this.signatureValue;
        lastImage.onload = function () {
            proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
            proxy.canvasContext.drawImage(lastImage, 0, 0);
            proxy.updateSnapCollection();
        };
        this.isSignatureEmpty = false;
    };
    /**
     * To get the signature as Blob.
     *
     * @param {string} url - specify the url/base 64 string to get blob of the signature.
     * @returns {Blob}.
     */
    SignatureBase.prototype.getBlob = function (url) {
        var arr = url.split(',');
        var type = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: type });
    };
    SignatureBase.prototype.download = function (blob, fileName) {
        var blobUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = blobUrl;
        a.target = '_parent';
        a.download = fileName;
        (document.body || document.documentElement).appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    };
    SignatureBase.prototype.internalRefresh = function () {
        this.pointColl = [];
        this.lastVelocity = 0;
        this.lastWidth = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
    };
    /**
     * To refresh the signature.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.refresh = function () {
        this.isResponsive = false;
        this.setHTMLProperties();
        this.resizeHandler();
        this.internalRefresh();
    };
    /**
     * Erases all the signature strokes signed by user.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.clear = function () {
        var args = { actionName: 'clear' };
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        this.tempContext.clearRect(0, 0, this.tempContext.canvas.width, this.tempContext.canvas.height);
        if (this.saveWithBackground && this.backgroundImage) {
            this.setBackgroundImage(this.backgroundImage, 'temp');
        }
        this.internalRefresh();
        this.signRatioPointsColl = [];
        this.updateSnapCollection(true);
        this.isSignatureEmpty = this.canRedraw = true;
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'Clear');
        }
    };
    /**
     * Undo the last user action.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.undo = function () {
        var args = { actionName: 'undo' };
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (this.incStep > 0) {
            this.incStep--;
            var undoImg_1 = new Image();
            undoImg_1.src = this.snapColl[this.incStep];
            undoImg_1.onload = function () {
                proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
                proxy.canvasContext.drawImage(undoImg_1, 0, 0, proxy.element.width, proxy.element.height);
            };
        }
        this.isClear();
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'Undo');
        }
    };
    /**
     * Redo the last user action.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.redo = function () {
        var args = { actionName: 'redo' };
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (this.incStep < this.snapColl.length - 1) {
            this.incStep++;
            var redoImg_1 = new Image();
            redoImg_1.src = this.snapColl[this.incStep];
            redoImg_1.onload = function () {
                proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
                proxy.canvasContext.drawImage(redoImg_1, 0, 0, proxy.element.width, proxy.element.height);
            };
        }
        this.isClear();
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'Redo');
        }
    };
    SignatureBase.prototype.isClear = function () {
        if (this.clearArray) {
            var empty = false;
            for (var i = 0; i < this.clearArray.length; i++) {
                if (this.clearArray[i] === this.incStep) {
                    this.isSignatureEmpty = true;
                    empty = true;
                }
            }
            if (!empty) {
                this.isSignatureEmpty = false;
            }
        }
    };
    /**
     * To check whether the signature is empty or not.
     *
     * @returns {boolean}.
     */
    SignatureBase.prototype.isEmpty = function () {
        return this.isSignatureEmpty;
    };
    /**
     * To check whether the undo collection is empty or not.
     *
     * @returns {boolean}.
     */
    SignatureBase.prototype.canUndo = function () {
        return this.incStep > 0;
    };
    /**
     * To check whether the redo collection is empty or not.
     *
     * @returns {boolean}.
     */
    SignatureBase.prototype.canRedo = function () {
        return this.incStep < this.snapColl.length - 1;
    };
    /**
     * To draw the signature based on the given text, with the font family and font size.
     *
     * @param {string} text - specify text to be drawn as signature.
     * @param {string} fontFamily - specify font family of a signature.
     * @param {number} fontSize - specify font size of a signature.
     * @param {number} x- Specifies the x-coordinate to start the text of a signature. Default to the center point of the image if it not specified.
     * @param {number} y - Specifies the y-coordinate to start the text of a signature. Default to the center point of the image if it not specified.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.draw = function (text, fontFamily, fontSize, x, y) {
        var args = { actionName: 'draw-text' };
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        fontFamily = fontFamily || 'Arial';
        fontSize = fontSize || 30;
        this.canvasContext.font = fontSize + 'px ' + fontFamily;
        var startX = this.element.width / 2;
        var startY = this.element.height / 2;
        if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
            this.canvasContext.textAlign = 'center';
            this.canvasContext.textBaseline = 'middle';
        }
        else {
            startX = isNullOrUndefined(x) ? startX : x;
            startY = isNullOrUndefined(y) ? startY + fontSize / 2 : (y + fontSize / 2);
        }
        this.canvasContext.fillText(text, startX, startY);
        this.updateSnapCollection();
        this.isSignatureEmpty = false;
        this.trigger('change', args);
    };
    /**
     * To load the signature with the given base 64 string, height and width.
     *
     * @param {string} signature - specify the url/base 64 string to be drawn as signature.
     * @param {number} width - specify the width of the loaded signature image.
     * @param {number} height - specify the height of the loaded signature image.
     * @returns {void}.
     */
    SignatureBase.prototype.load = function (signature, width, height) {
        height = height || this.element.height;
        width = width || this.element.width;
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var bitmapImage = new Image();
        bitmapImage.src = signature;
        if (signature.slice(0, 4) !== 'data') {
            bitmapImage.crossOrigin = 'anonymous';
        }
        bitmapImage.onload = function () {
            Promise.all([
                createImageBitmap(bitmapImage, 0, 0, width, height)
            ]).then(function (results) {
                var tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                tempCanvas.getContext('2d').drawImage(results[0], 0, 0);
                if (signature.slice(0, 4) !== 'data') {
                    proxy.canvasContext.globalCompositeOperation = 'source-over';
                }
                proxy.canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, proxy.element.width, proxy.element.height);
                proxy.updateSnapCollection();
            });
        };
        this.isSignatureEmpty = this.canRedraw = false;
    };
    SignatureBase.prototype.saveBackground = function (savebg) {
        var imageSrc;
        if (savebg && this.backgroundImage) {
            imageSrc = this.snapColl[this.incStep - 1];
        }
        else {
            imageSrc = this.snapColl[this.incStep];
        }
        if (!savebg) {
            this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
            if (this.backgroundImage) {
                this.setBackgroundImage(this.backgroundImage);
            }
            else if (this.backgroundColor) {
                this.setBackgroundColor(this.backgroundColor);
                savebg = true;
            }
        }
        if (savebg) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var proxy_1 = this;
            var imageObj_1 = new Image();
            imageObj_1.crossOrigin = 'anonymous';
            imageObj_1.src = imageSrc;
            imageObj_1.onload = function () {
                proxy_1.backgroundLoaded = true;
                proxy_1.canvasContext.globalCompositeOperation = 'source-over';
                proxy_1.canvasContext.drawImage(imageObj_1, 0, 0, proxy_1.element.width, proxy_1.element.height);
                proxy_1.save(proxy_1.fileType, proxy_1.fileName);
            };
        }
    };
    /**
     * To save the signature with the given file type and file name.
     *
     * @param {SignatureFileType} type - specify type of the file to be saved a signature.
     * @param {string} fileName - specify name of the file to be saved a signature.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.save = function (type, fileName) {
        if (this.saveWithBackground && this.backgroundLoaded == null && (this.backgroundImage || this.backgroundColor)) {
            this.backgroundLoaded = false;
            this.fileType = type;
            this.fileName = fileName;
            this.saveBackground(false);
        }
        else if (type === 'Svg') {
            fileName = fileName || 'Signature';
            this.toSVG(fileName);
        }
        else if (type === 'Jpeg') {
            fileName = fileName || 'Signature';
            if (!this.saveWithBackground || this.saveWithBackground && !(this.backgroundImage || this.backgroundColor)) {
                this.toJPEG(fileName);
            }
            else {
                var dataURL = this.canvasContext.canvas.toDataURL('image/jpeg');
                this.download(this.getBlob(dataURL), fileName + '.' + 'jpeg');
            }
        }
        else {
            fileName = fileName || 'Signature';
            var dataURL = this.canvasContext.canvas.toDataURL('image/png');
            this.download(this.getBlob(dataURL), fileName + '.' + 'png');
        }
        if (this.saveWithBackground && this.backgroundLoaded) {
            this.resetSnap();
        }
    };
    SignatureBase.prototype.resetSnap = function () {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var restoreObj = new Image();
        restoreObj.src = this.snapColl[this.incStep - 1];
        restoreObj.onload = function () {
            proxy.canvasContext.drawImage(restoreObj, 0, 0, proxy.element.width, proxy.element.height);
            proxy.updateSnapCollection();
        };
        this.backgroundLoaded = null;
        this.snapColl.pop();
        this.incStep--;
        this.snapColl.pop();
        this.incStep--;
    };
    SignatureBase.prototype.toJPEG = function (fileName) {
        var _this = this;
        var imageSrc = this.snapColl[this.incStep];
        this.setBackgroundColor('#ffffff');
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var imageObj = new Image();
        imageObj.crossOrigin = 'anonymous';
        imageObj.src = imageSrc;
        imageObj.onload = function () {
            proxy.canvasContext.globalCompositeOperation = 'source-over';
            proxy.canvasContext.drawImage(imageObj, 0, 0, proxy.element.width, proxy.element.height);
            var dataURL = proxy.canvasContext.canvas.toDataURL('image/jpeg');
            proxy.download(proxy.getBlob(dataURL), fileName + '.' + 'jpeg');
            proxy.canvasContext.clearRect(0, 0, proxy.canvasContext.canvas.width, proxy.canvasContext.canvas.height);
            _this.resizeHandler();
        };
        this.snapColl.pop();
        this.incStep--;
    };
    SignatureBase.prototype.toSVG = function (fileName, dataUrl) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvasContext.canvas.width.toString());
        svg.setAttribute('height', this.canvasContext.canvas.height.toString());
        var XLinkNS = 'http://www.w3.org/1999/xlink';
        var img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttributeNS(null, 'height', this.canvasContext.canvas.height.toString());
        img.setAttributeNS(null, 'width', this.canvasContext.canvas.width.toString());
        img.setAttributeNS(XLinkNS, 'xlink:href', dataUrl);
        svg.appendChild(img);
        var prefix = 'data:image/svg+xml;base64,';
        var header = '<svg' + ' xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
            + (" width=\"" + this.canvasContext.canvas.width + "\"") + (" height=\"" + this.canvasContext.canvas.height + "\"") + '>';
        var footer = '</svg>';
        var body = svg.innerHTML;
        var data = header + body + footer;
        var svgDataUrl = prefix + btoa(data);
        if (fileName == null) {
            return svgDataUrl;
        }
        else {
            this.download(this.getBlob(svgDataUrl), fileName + '.' + 'svg');
            return null;
        }
    };
    /**
     * To save the signature as Blob.
     *
     * @returns {Blob}.
     */
    SignatureBase.prototype.saveAsBlob = function () {
        return this.getBlob(this.canvasContext.canvas.toDataURL('image/png'));
    };
    /**
     * Gets the signature as a Base 64 string.
     *
     * This method is used to retrieve the current signature on the canvas as a Base 64-encoded string, in the specified image format.
     *
     * @param {SignatureFileType} [type] - Specifies the type of the image format.
     * Can be one of 'Png', 'Jpeg', or 'Svg'. If not specified, the default is 'Png'.
     * @returns {string} - Returns the Base 64 string of the signature in the specified format.
     */
    SignatureBase.prototype.getSignature = function (type) {
        if (this.saveWithBackground && this.backgroundColor && !this.backgroundImage) {
            this.tempContext.fillStyle = this.backgroundColor;
            this.tempContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        }
        else if (!this.backgroundColor && !this.backgroundImage && type === 'Jpeg') {
            this.tempContext.fillStyle = '#fff';
            this.tempContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        }
        this.tempContext.drawImage(this.element, 0, 0);
        if (type === 'Jpeg') {
            return this.tempCanvas.toDataURL('image/jpeg');
        }
        else if (type === 'Svg') {
            return this.toSVG(null, this.tempCanvas.toDataURL('image/png'));
        }
        else {
            return this.tempCanvas.toDataURL('image/png');
        }
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    SignatureBase.prototype.getModuleName = function () {
        return 'signature';
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    SignatureBase.prototype.getPersistData = function () {
        this.signatureValue = this.snapColl[this.incStep];
        return this.addOnPersist(['signatureValue']);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    SignatureBase.prototype.destroy = function () {
        if (this.getModuleName() !== 'image-editor') {
            this.unwireEvents(null);
            removeClass([this.element], 'e-' + this.getModuleName());
            this.element.removeAttribute('tabindex');
            this.pointColl = null;
            this.tempContext = null;
            this.tempCanvas = null;
            this.canvasContext = null;
        }
        _super.prototype.destroy.call(this);
        this.element = null;
    };
    /**
     * Modified onPropertyChanged method for both blazor and EJ2 signature component.
     *
     * @private
     * @param {string} key - Specifies the property, which changed.
     * @param {string} value - Specifies the property value changed.
     * @returns {void}
     */
    SignatureBase.prototype.propertyChanged = function (key, value) {
        var canvasNew = this.canvasContext;
        switch (key) {
            case 'backgroundColor':
                canvasNew.canvas.style.backgroundColor = value;
                this.backgroundColor = value;
                break;
            case 'backgroundImage':
                canvasNew.canvas.style.backgroundImage = 'url(' + value + ')';
                this.backgroundImage = value;
                if (this.saveWithBackground) {
                    this.setBackgroundImage(this.backgroundImage, 'temp');
                }
                break;
            case 'strokeColor':
                canvasNew.fillStyle = value;
                this.strokeColor = value;
                break;
            case 'saveWithBackground':
                this.saveWithBackground = value;
                break;
            case 'maxStrokeWidth':
                this.maxStrokeWidth = value;
                break;
            case 'minStrokeWidth':
                this.minStrokeWidth = value;
                break;
            case 'velocity':
                this.velocity = value;
                break;
            case 'isReadOnly':
                this.isRead(value);
                break;
            case 'disabled':
                this.enableOrDisable(value);
                break;
        }
    };
    return SignatureBase;
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
var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The Signature component allows user to draw smooth signatures as vector outline of strokes using variable width bezier curve interpolation.
 * It allows to save signature as image.
 * You can use your finger, pen, or mouse on a tablet, touchscreen, etc., to draw your own signature on this Signature component.
 * Signature component is a user interface to draw the Signature or Text.
 * It provides supports for various Background color, Stroke color and Background Image.
 * ```html
 * <canvas id="signature"></canvas>
 * ```
 * ```typescript
 * <script>
 *   let signatureObj: Signature = new Signature(null , "#signature");
 * </script>
 * ```
 */
var Signature = /** @class */ (function (_super) {
    __extends$a(Signature, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {SignatureModel} options - Specifies the Signature model.
     * @param {string | HTMLCanvasElement} element - Specifies the element.
     * @private
     */
    function Signature(options, element) {
        return _super.call(this, options, element) || this;
    }
    Signature.prototype.preRender = function () {
        // pre render code snippets
    };
    /**
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    Signature.prototype.render = function () {
        this.initialize();
    };
    Signature.prototype.initialize = function () {
        this.element.setAttribute('role', 'img');
        this.element.setAttribute('aria-label', 'signature');
        addClass([this.element], 'e-' + this.getModuleName());
        _super.prototype.initialize.call(this, this.element);
        if (this.enablePersistence) {
            this.loadPersistedSignature();
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    Signature.prototype.getModuleName = function () {
        return _super.prototype.getModuleName.call(this);
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Signature.prototype.getPersistData = function () {
        return _super.prototype.getPersistData.call(this);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SignatureModel} newProp - Specifies new properties
     * @param  {SignatureModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Signature.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'backgroundColor':
                    _super.prototype.propertyChanged.call(this, prop, newProp.backgroundColor);
                    break;
                case 'backgroundImage':
                    _super.prototype.propertyChanged.call(this, prop, newProp.backgroundImage);
                    break;
                case 'strokeColor':
                    if (newProp.strokeColor !== oldProp.strokeColor) {
                        _super.prototype.propertyChanged.call(this, prop, newProp.strokeColor);
                    }
                    break;
                case 'maxStrokeWidth':
                    if (newProp.maxStrokeWidth !== oldProp.maxStrokeWidth) {
                        _super.prototype.propertyChanged.call(this, prop, newProp.maxStrokeWidth);
                    }
                    break;
                case 'minStrokeWidth':
                    if (newProp.minStrokeWidth !== oldProp.minStrokeWidth) {
                        _super.prototype.propertyChanged.call(this, prop, newProp.minStrokeWidth);
                    }
                    break;
                case 'velocity':
                    if (newProp.velocity !== oldProp.velocity) {
                        _super.prototype.propertyChanged.call(this, prop, newProp.velocity);
                    }
                    break;
                case 'saveWithBackground':
                    _super.prototype.propertyChanged.call(this, prop, newProp.saveWithBackground);
                    break;
                case 'isReadOnly':
                    _super.prototype.propertyChanged.call(this, prop, newProp.isReadOnly);
                    break;
                case 'disabled':
                    _super.prototype.propertyChanged.call(this, prop, newProp.disabled);
                    break;
            }
        }
    };
    __decorate$9([
        Property('')
    ], Signature.prototype, "backgroundColor", void 0);
    __decorate$9([
        Property('')
    ], Signature.prototype, "backgroundImage", void 0);
    __decorate$9([
        Property(false)
    ], Signature.prototype, "disabled", void 0);
    __decorate$9([
        Property(false)
    ], Signature.prototype, "isReadOnly", void 0);
    __decorate$9([
        Property(true)
    ], Signature.prototype, "saveWithBackground", void 0);
    __decorate$9([
        Property('#000000')
    ], Signature.prototype, "strokeColor", void 0);
    __decorate$9([
        Property(0.5)
    ], Signature.prototype, "minStrokeWidth", void 0);
    __decorate$9([
        Property(2)
    ], Signature.prototype, "maxStrokeWidth", void 0);
    __decorate$9([
        Property(0.7)
    ], Signature.prototype, "velocity", void 0);
    __decorate$9([
        Property('en-US')
    ], Signature.prototype, "locale", void 0);
    __decorate$9([
        Property(false)
    ], Signature.prototype, "enableRtl", void 0);
    __decorate$9([
        Property(false)
    ], Signature.prototype, "enablePersistence", void 0);
    __decorate$9([
        Event()
    ], Signature.prototype, "beforeSave", void 0);
    __decorate$9([
        Event()
    ], Signature.prototype, "change", void 0);
    __decorate$9([
        Event()
    ], Signature.prototype, "created", void 0);
    Signature = __decorate$9([
        NotifyPropertyChanges
    ], Signature);
    return Signature;
}(SignatureBase));

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
var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ICONCSS = 'e-rating-icon e-icons e-star-filled';
var ITEMLIST = 'e-rating-item-list';
var ITEMCONTAINER = 'e-rating-item-container';
var SELECTED = 'e-rating-selected';
var INTERMEDIATE = 'e-rating-intermediate';
var LABEL = 'e-rating-label';
var RESET = 'e-icons e-reset';
var HIDDEN = 'e-rating-hidden';
var DISABLED$2 = 'e-disabled';
var READONLY = 'e-rating-readonly';
var RTL$2 = 'e-rtl';
var ANIMATION = 'e-rating-animation';
var FULLTEMPLATE = 'e-rating-full';
var EMPTYTEMPLATE = 'e-rating-empty';
var SELECTEDVALUE = 'e-selected-value';
var RATINGVALUE = '--rating-value';
/**
 * Defines where to position the label in rating
 */
var LabelPosition;
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
var PrecisionType;
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
    __extends$b(Rating, _super);
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
            this.wrapper.classList.add(RTL$2);
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
        this.wrapper.classList[this.disabled ? 'add' : 'remove'](DISABLED$2);
        attributes(this.ratingItemList, { 'tabindex': (this.disabled) ? '-1' : '0' });
        this.updateResetButton();
    };
    Rating.prototype.updateResetButton = function () {
        if (this.allowReset) {
            if (this.resetElement) {
                this.resetElement.blur();
            }
            var isDisabled = (this.value <= this.min) || this.disabled;
            this.resetElement.classList[isDisabled ? 'add' : 'remove'](DISABLED$2);
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
        var ratingObj =  this;
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
                    this.wrapper.classList[this.enableRtl ? 'add' : 'remove'](RTL$2);
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
    __decorate$a([
        Property(false)
    ], Rating.prototype, "allowReset", void 0);
    __decorate$a([
        Property('')
    ], Rating.prototype, "cssClass", void 0);
    __decorate$a([
        Property(false)
    ], Rating.prototype, "disabled", void 0);
    __decorate$a([
        Property('')
    ], Rating.prototype, "emptyTemplate", void 0);
    __decorate$a([
        Property(true)
    ], Rating.prototype, "enableAnimation", void 0);
    __decorate$a([
        Property(false)
    ], Rating.prototype, "enableSingleSelection", void 0);
    __decorate$a([
        Property('')
    ], Rating.prototype, "fullTemplate", void 0);
    __decorate$a([
        Property(5)
    ], Rating.prototype, "itemsCount", void 0);
    __decorate$a([
        Property(LabelPosition.Right)
    ], Rating.prototype, "labelPosition", void 0);
    __decorate$a([
        Property('')
    ], Rating.prototype, "labelTemplate", void 0);
    __decorate$a([
        Property(0.0)
    ], Rating.prototype, "min", void 0);
    __decorate$a([
        Property(PrecisionType.Full)
    ], Rating.prototype, "precision", void 0);
    __decorate$a([
        Property(false)
    ], Rating.prototype, "readOnly", void 0);
    __decorate$a([
        Property(false)
    ], Rating.prototype, "showLabel", void 0);
    __decorate$a([
        Property(true)
    ], Rating.prototype, "showTooltip", void 0);
    __decorate$a([
        Property('')
    ], Rating.prototype, "tooltipTemplate", void 0);
    __decorate$a([
        Property(0.0)
    ], Rating.prototype, "value", void 0);
    __decorate$a([
        Property(true)
    ], Rating.prototype, "visible", void 0);
    __decorate$a([
        Event()
    ], Rating.prototype, "beforeItemRender", void 0);
    __decorate$a([
        Event()
    ], Rating.prototype, "created", void 0);
    __decorate$a([
        Event()
    ], Rating.prototype, "onItemHover", void 0);
    __decorate$a([
        Event()
    ], Rating.prototype, "valueChanged", void 0);
    Rating = __decorate$a([
        NotifyPropertyChanges
    ], Rating);
    return Rating;
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
var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var INPUTFIELD = 'e-otp-input-field';
var RTL$3 = 'e-rtl';
/**
 * Specifies the type of input for the Otp (One-Time Password) input component.
 */
var OtpInputType;
(function (OtpInputType) {
    /**
     * Specifies the type of input to be number for the Otp input.
     */
    OtpInputType["Number"] = "number";
    /**
     * Specifies the type of input to be text for the Otp input.
     */
    OtpInputType["Text"] = "text";
    /**
     * Specifies the type of input to be password for the Otp input.
     */
    OtpInputType["Password"] = "password";
})(OtpInputType || (OtpInputType = {}));
/**
 * Specifies the style variant for the Otp (One-Time Password) input component.
 */
var OtpInputStyle;
(function (OtpInputStyle) {
    /**
     * Specifies the style of the Otp input to be outlined.
     */
    OtpInputStyle["Outlined"] = "outlined";
    /**
     * Specifies the style of the Otp input to be underlined.
     */
    OtpInputStyle["Underlined"] = "underlined";
    /**
     * Specifies the style of the Otp input to be filled.
     */
    OtpInputStyle["Filled"] = "filled";
})(OtpInputStyle || (OtpInputStyle = {}));
/**
 * Enum for the case transformation options for OTP input text.
 *
 * @readonly
 * @enum {string}
 */
var TextTransform;
(function (TextTransform) {
    /**
     * No case transformation. The input text remains unchanged.
     */
    TextTransform["None"] = "none";
    /**
     * Convert the input text to uppercase.
     */
    TextTransform["Uppercase"] = "uppercase";
    /**
     * Convert the input text to lowercase.
     */
    TextTransform["Lowercase"] = "lowercase";
})(TextTransform || (TextTransform = {}));
/**
 * Represents the Otp component that allows the user to enter the otp values.
 * ```html
 * <div id='OTPInput'></div>
 * ```
 * ```typescript
 * <script>
 *   var OtpinputObj = new OtpInput();
 *   OtpinputObj.appendTo('#OTPInput');
 * </script>
 * ```
 */
var OtpInput = /** @class */ (function (_super) {
    __extends$c(OtpInput, _super);
    function OtpInput(options, element) {
        var _this = _super.call(this, options, element) || this;
        /* Private variables */
        _this.inputs = [];
        _this.previousValue = '';
        _this.separatorElements = [];
        _this.shouldFireFocus = true;
        _this.shouldFireBlur = true;
        _this.isFocusInCalled = false;
        _this.isFocusOutCalled = false;
        _this.handleWheelEvent = function (e) {
            e.preventDefault();
        };
        return _this;
    }
    OtpInput.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    OtpInput.prototype.render = function () {
        this.initialize();
    };
    OtpInput.prototype.initialize = function () {
        attributes(this.element, { 'role': 'group' });
        this.renderInputs();
        this.renderSeparator(1, this.inputs.length);
        this.addPlaceHolder();
        this.updateCssClass(this.cssClass);
        this.updateVariantClass();
        this.updateAriaLabel(this.ariaLabels);
        this.setElementAttributes(this.htmlAttributes, this.element);
        if (this.enableRtl) {
            this.element.classList.add(RTL$3);
        }
        this.previousValue = this.value.toString();
        if (this.autoFocus) {
            this.focusIn();
        }
    };
    OtpInput.prototype.renderInputs = function () {
        this.hiddenInputEle = this.createElement('input', {
            id: 'otpInput_hidden',
            attrs: {
                name: this.element.id,
                type: 'hidden',
                value: this.type === 'number' ? this.value.toString().replace(/\D/g, '') : this.value.toString(),
                autoComplete: 'off'
            }
        });
        this.element.appendChild(this.hiddenInputEle);
        for (var i = 0; i < this.length; i++) {
            this.createOtpInput(i);
        }
    };
    OtpInput.prototype.createOtpInput = function (index) {
        var valueContainer = this.getDefaultValue();
        var inputValue = '';
        if (valueContainer) {
            var valueAtIndex = valueContainer[parseInt(index.toString(), 10)];
            if (this.type === 'number') {
                if (!isNaN(Number(valueAtIndex))) {
                    inputValue = valueAtIndex;
                }
            }
            else {
                inputValue = valueAtIndex || '';
            }
        }
        var inputEle = this.createElement('input', {
            id: this.element.id + "-" + (index + 1),
            className: INPUTFIELD + ' ' + 'e-input',
            attrs: {
                maxlength: '1',
                type: this.type,
                inputmode: this.htmlAttributes['inputmode'] || (this.type === 'number' ? 'numeric' : 'text')
            }
        });
        if (this.disabled) {
            inputEle.setAttribute('disabled', 'disabled');
        }
        this.element.appendChild(inputEle);
        this.inputs.push(inputEle);
        if (inputValue) {
            inputEle.value = inputValue;
        }
        this.wireEvents(inputEle, index);
    };
    OtpInput.prototype.renderSeparator = function (index, length) {
        if (this.separator.length > 0) {
            for (var i = index; i < length; i++) {
                var separatorElement = this.createElement('span', {
                    className: 'e-otp-separator'
                });
                separatorElement.textContent = this.separator;
                this.separatorElements.push(separatorElement);
                this.element.insertBefore(separatorElement, this.inputs[parseInt(i.toString(), 10)]);
            }
        }
    };
    OtpInput.prototype.updateSeparatorValue = function () {
        var _this = this;
        if (this.separator === '') {
            this.separatorElements.forEach(function (element) { return remove(element); });
            this.separatorElements = [];
        }
        else {
            this.separatorElements.forEach(function (element) {
                element.textContent = _this.separator;
            });
        }
    };
    OtpInput.prototype.addPlaceHolder = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var placeholderValue = this.placeholder.length <= 1 ? this.placeholder : this.placeholder.charAt(i);
            this.setElementAttributes({ 'placeholder': placeholderValue }, this.inputs[parseInt(i.toString(), 10)]);
        }
    };
    OtpInput.prototype.updateInputType = function (inputType) {
        var inputMode = this.htmlAttributes['inputmode'] || (inputType === 'number' ? 'numeric' : 'text');
        this.inputs.forEach(function (input) {
            input.type = inputType;
            input.setAttribute('inputmode', inputMode);
        });
    };
    OtpInput.prototype.getDefaultValue = function () {
        var extractedValue = typeof this.value === 'number' ? this.value.toString() : this.value;
        if (this.textTransform) {
            extractedValue = this.getTransformedText(extractedValue);
        }
        // To remove the white space if present.
        var value = extractedValue.replace(/\s/g, '');
        return value.length > 0 ? value.split('') : undefined;
    };
    OtpInput.prototype.getTransformedText = function (transformingText) {
        var transformedText = this.textTransform.toLowerCase() === TextTransform.Lowercase ? transformingText.toLowerCase() :
            this.textTransform.toLowerCase() === TextTransform.Uppercase ? transformingText.toUpperCase() : transformingText;
        return transformedText;
    };
    OtpInput.prototype.handleInputChange = function (index, event) {
        var currentInputElement = this.inputs[parseInt(index.toString(), 10)];
        if (currentInputElement && index < this.length - 1 && currentInputElement.value.length > 0) {
            var nextInputElement = this.inputs[parseInt(index.toString(), 10) + 1];
            this.shouldFireFocus = this.shouldFireBlur = false;
            nextInputElement.focus();
            if (nextInputElement && nextInputElement.value.length > 0) {
                nextInputElement.select();
            }
        }
        var target = event.target;
        if (target.value.length > 1) {
            target.value = target.value.slice(0, 1);
        }
        if (this.textTransform) {
            target.value = this.getTransformedText(target.value);
        }
        this.triggerInputEvent(index, event);
        this.triggerValuechanged(event, true);
    };
    OtpInput.prototype.handleKeyAction = function (index, event) {
        if (event.key.length > 1 && !((index === 0 && event.key === 'Backspace') ||
            (index === this.length - 1 && event.key === 'Delete'))) {
            this.shouldFireFocus = this.shouldFireBlur = false;
        }
        var currentInputElement = this.inputs[parseInt(index.toString(), 10)];
        var previousInputElement = this.inputs[parseInt(index.toString(), 10) - 1];
        var nextInputElement = this.inputs[parseInt(index.toString(), 10) + 1];
        if (event.key === 'Delete') {
            var value = '';
            if (currentInputElement.value.length > 0) {
                value = currentInputElement.value;
                currentInputElement.value = '';
            }
            else if (index !== this.inputs.length - 1) {
                value = nextInputElement.value;
                nextInputElement.value = '';
                nextInputElement.focus();
            }
            if (value.length > 0) {
                this.triggerInputEvent(index, event);
            }
        }
        else if (event.key === 'Backspace') {
            if (index !== 0 && currentInputElement.value.length === 0) {
                var previousValue = previousInputElement.value;
                previousInputElement.value = '';
                previousInputElement.focus();
                if (previousValue.length > 0) {
                    this.triggerInputEvent(index, event);
                }
            }
        }
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            if (event.key === 'ArrowLeft' && index > 0) {
                previousInputElement.focus();
                previousInputElement.select();
            }
            else if (event.key === 'ArrowRight' && index < this.inputs.length - 1) {
                nextInputElement.focus();
                nextInputElement.select();
            }
            event.preventDefault();
        }
        else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
        else if (event.key !== 'Tab' && !event.shiftKey && !event.ctrlKey) {
            if (this.type === 'number' && (/\D/.test(event.key.toLocaleLowerCase()))) {
                event.preventDefault();
            }
        }
    };
    OtpInput.prototype.handleSelection = function (index) {
        var currentInputElement = this.inputs[parseInt(index.toString(), 10)];
        if (currentInputElement.value) {
            currentInputElement.select();
        }
    };
    OtpInput.prototype.handleFocus = function (index, event) {
        addClass([this.inputs[parseInt(index.toString(), 10)]], 'e-otp-input-focus');
        if (this.shouldFireFocus) {
            var eventArgs = {
                element: this.element,
                event: event,
                index: index,
                isInteracted: this.isFocusInCalled ? false : true,
                value: this.value
            };
            this.trigger('focus', eventArgs);
        }
        this.shouldFireFocus = true;
    };
    OtpInput.prototype.handleBlur = function (index, event) {
        removeClass([this.inputs[parseInt(index.toString(), 10)]], 'e-otp-input-focus');
        if (this.shouldFireBlur) {
            var eventArgs = {
                element: this.element,
                event: event,
                value: this.value,
                index: index,
                isInteracted: this.isFocusOutCalled ? false : true
            };
            this.trigger('blur', eventArgs);
        }
        this.shouldFireBlur = true;
    };
    OtpInput.prototype.handlePaste = function (index, event) {
        var clipboardData = event.clipboardData;
        if (clipboardData) {
            var pastedText = clipboardData.getData('text');
            var pastedValues = pastedText.split('');
            var pastedValueIndex = 0;
            for (var i = index; i < this.inputs.length; i++) {
                if (pastedValues.length > 0 && pastedValues[parseInt(pastedValueIndex.toString(), 10)]) {
                    this.inputs[parseInt(i.toString(), 10)].value = pastedValues[parseInt(pastedValueIndex.toString(), 10)];
                    pastedValueIndex++;
                    this.updateValueProperty();
                }
            }
            this.focusIn();
            this.triggerValuechanged(event, true);
        }
    };
    OtpInput.prototype.triggerInputEvent = function (index, event) {
        var previousValue = this.value.toString();
        this.updateValueProperty();
        var inputEventArgs = {
            element: this.element,
            event: event,
            previousValue: previousValue,
            value: this.value.toString(),
            index: index
        };
        this.trigger('input', inputEventArgs);
    };
    OtpInput.prototype.triggerValuechanged = function (event, isInteracted) {
        if (this.length === this.value.toString().length) {
            if (this.previousValue !== this.value) {
                var eventArgs = {
                    element: this.element,
                    event: event,
                    isInteracted: isInteracted ? isInteracted : false,
                    previousValue: this.previousValue,
                    value: this.value
                };
                this.trigger('valueChanged', eventArgs);
                this.previousValue = this.value.toString();
            }
        }
    };
    OtpInput.prototype.wireEvents = function (inputEle, index) {
        EventHandler.add(inputEle, 'focus', this.handleFocus.bind(this, index), this);
        EventHandler.add(inputEle, 'blur', this.handleBlur.bind(this, index), this);
        EventHandler.add(inputEle, 'input', this.handleInputChange.bind(this, index), this);
        EventHandler.add(inputEle, 'keydown', this.handleKeyAction.bind(this, index), this);
        EventHandler.add(inputEle, 'click', this.handleSelection.bind(this, index), this);
        EventHandler.add(inputEle, 'paste', this.handlePaste.bind(this, index), this);
        EventHandler.add(inputEle, 'wheel', this.handleWheelEvent, this);
    };
    OtpInput.prototype.unWireEvents = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var currentInputElement = this.inputs[parseInt(i.toString(), 10)];
            EventHandler.remove(currentInputElement, 'focus', this.handleFocus.bind(this, i));
            EventHandler.remove(currentInputElement, 'blur', this.handleBlur.bind(this, i));
            EventHandler.remove(currentInputElement, 'input', this.handleInputChange.bind(this, i));
            EventHandler.remove(currentInputElement, 'keydown', this.handleKeyAction.bind(this, i));
            EventHandler.remove(currentInputElement, 'click', this.handleSelection.bind(this, i));
            EventHandler.remove(currentInputElement, 'paste', this.handlePaste.bind(this, i));
            EventHandler.remove(currentInputElement, 'wheel', this.handleWheelEvent);
        }
    };
    OtpInput.prototype.updateValueProperty = function () {
        var value = '';
        this.inputs.forEach(function (input) {
            value += input.value;
        });
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = typeof this.value === 'number' ? parseInt(value, 10) : value;
        this.isProtectedOnChange = prevOnChange;
        this.hiddenInputEle.value = this.value.toString();
    };
    OtpInput.prototype.updateInputValue = function (previousValue) {
        var stringifiedValue = this.value.toString();
        if (this.textTransform) {
            stringifiedValue = this.getTransformedText(stringifiedValue);
        }
        var previousStringValue = previousValue.toString();
        for (var i = 0; i < this.inputs.length; i++) {
            if (previousStringValue.charAt(i) !== stringifiedValue.charAt(i)) {
                this.inputs[parseInt(i.toString(), 10)].value = stringifiedValue.charAt(i);
                this.hiddenInputEle.value = stringifiedValue;
            }
        }
        this.focusIn();
    };
    OtpInput.prototype.updateCssClass = function (addCss, removeCss) {
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
    OtpInput.prototype.updateVariantClass = function () {
        var variantClass = this.stylingMode.toLocaleLowerCase() === 'outlined' ? 'outline' : this.stylingMode.toLocaleLowerCase();
        var validClasses = ['underlined', 'filled', 'outline'];
        if (validClasses.indexOf(variantClass) !== -1) {
            removeClass([this.element], validClasses.map(function (cls) { return "e-" + cls; }));
            addClass([this.element], "e-" + variantClass);
        }
    };
    OtpInput.prototype.updateAriaLabel = function (customAriaLabel) {
        this.inputs.forEach(function (input, index) {
            var defaultLabel = "Enter Otp Character " + (index + 1);
            var ariaLabel = customAriaLabel && customAriaLabel.length > 0
                ? customAriaLabel[parseInt(index.toString(), 10)] || defaultLabel
                : defaultLabel;
            input.setAttribute('aria-label', ariaLabel);
        });
    };
    OtpInput.prototype.updateDisabledState = function () {
        var _this = this;
        this.inputs.forEach(function (input) {
            if (_this.disabled) {
                input.setAttribute('disabled', 'disabled');
            }
            else {
                input.removeAttribute('disabled');
            }
        });
    };
    OtpInput.prototype.setElementAttributes = function (htmlAttributes, element) {
        if (!isNullOrUndefined(htmlAttributes)) {
            for (var key in htmlAttributes) {
                if (key === 'class') {
                    var elementClass = htmlAttributes['class'].replace(/\s+/g, ' ').trim();
                    if (elementClass) {
                        addClass([element], elementClass.split(' '));
                    }
                }
                else if (key === 'inputmode') {
                    this.setInputMode(htmlAttributes["" + key]);
                }
                else if (key === 'name' && this.element.id === element.id) {
                    this.hiddenInputEle.setAttribute(key, htmlAttributes["" + key]);
                }
                else {
                    element.setAttribute(key, htmlAttributes["" + key]);
                }
            }
        }
    };
    OtpInput.prototype.setInputMode = function (inputModeValue) {
        for (var i = 0; i < this.inputs.length; i++) {
            this.inputs[parseInt(i.toString(), 10)].setAttribute('inputmode', inputModeValue);
        }
    };
    OtpInput.prototype.handleLengthChange = function (currentValue, previousValue) {
        var isLengthAdded = (currentValue - previousValue) > 0;
        if (isLengthAdded) {
            for (var i = previousValue; i < currentValue; i++) {
                this.createOtpInput(i);
            }
            this.renderSeparator(previousValue, currentValue);
            this.addPlaceHolder();
            this.updateAriaLabel(this.ariaLabels);
        }
        else {
            if (currentValue >= 0 && this.inputs.length > 0) {
                for (var i = currentValue; i < this.inputs.length; i++) {
                    remove(this.inputs[parseInt(i.toString(), 10)]);
                }
                this.inputs.splice(currentValue);
                if (this.separatorElements.length > 0) {
                    // separator should be completely removed when length is 0 or 1;
                    var index = currentValue === 0 ? 0 : currentValue - 1;
                    for (var i = index; i < this.separatorElements.length; i++) {
                        remove(this.separatorElements[parseInt(i.toString(), 10)]);
                    }
                    this.separatorElements.splice(index);
                }
            }
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    OtpInput.prototype.getModuleName = function () {
        return 'otpinput';
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    OtpInput.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Destroy the Otp input.
     *
     * @returns {void}
     */
    OtpInput.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.inputs.forEach(function (input) { remove(input); });
        this.separatorElements.forEach(function (separatorElement) { remove(separatorElement); });
        remove(this.hiddenInputEle);
        removeClass([this.element], ['e-underlined', 'e-filled', 'e-outline', 'e-rtl']);
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.trim().split(' '));
        }
        this.element.removeAttribute('role');
        this.inputs = [];
        this.separatorElements = [];
        this.hiddenInputEle = null;
    };
    /**
     * Sets the focus to the Otp input for interaction.
     *
     * @returns {void}
     */
    OtpInput.prototype.focusIn = function () {
        this.isFocusInCalled = true;
        var focusIndex = this.inputs.length - 1;
        for (var index = 0; index < this.inputs.length; index++) {
            if (!(this.inputs[parseInt(index.toString(), 10)].value.length > 0)) {
                focusIndex = index;
                break;
            }
        }
        this.inputs[parseInt(focusIndex.toString(), 10)].focus();
        this.isFocusInCalled = false;
    };
    /**
     * Remove the focus from Otp input, if it is in focus state.
     *
     * @returns {void}
     */
    OtpInput.prototype.focusOut = function () {
        this.isFocusOutCalled = true;
        this.inputs.forEach(function (input) {
            input.blur();
        });
        this.isFocusOutCalled = false;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {OtpInputModel} newProp - Specifies new properties
     * @param  {OtpInputModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    OtpInput.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'textTransform':
                    this.updateInputValue(this.value);
                    break;
                case 'value':
                    this.updateInputValue(oldProp.value);
                    this.triggerValuechanged();
                    break;
                case 'placeholder':
                    this.addPlaceHolder();
                    break;
                case 'disabled':
                    this.updateDisabledState();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'separator':
                    if (oldProp.separator === '') {
                        this.renderSeparator(1, this.inputs.length);
                    }
                    else {
                        this.updateSeparatorValue();
                    }
                    break;
                case 'htmlAttributes':
                    this.setElementAttributes(newProp.htmlAttributes, this.element);
                    break;
                case 'type':
                    this.updateInputType(newProp.type);
                    break;
                case 'stylingMode':
                    this.updateVariantClass();
                    break;
                case 'ariaLabels':
                    this.updateAriaLabel(newProp.ariaLabels);
                    break;
                case 'length':
                    this.handleLengthChange(newProp.length, oldProp.length);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL$3);
                    break;
                case 'autoFocus':
                    if (this.autoFocus) {
                        this.focusIn();
                    }
                    break;
            }
        }
    };
    __decorate$b([
        Property(4)
    ], OtpInput.prototype, "length", void 0);
    __decorate$b([
        Property('')
    ], OtpInput.prototype, "value", void 0);
    __decorate$b([
        Property(OtpInputType.Number)
    ], OtpInput.prototype, "type", void 0);
    __decorate$b([
        Property('')
    ], OtpInput.prototype, "separator", void 0);
    __decorate$b([
        Property('')
    ], OtpInput.prototype, "placeholder", void 0);
    __decorate$b([
        Property(OtpInputStyle.Outlined)
    ], OtpInput.prototype, "stylingMode", void 0);
    __decorate$b([
        Property(false)
    ], OtpInput.prototype, "disabled", void 0);
    __decorate$b([
        Property('')
    ], OtpInput.prototype, "cssClass", void 0);
    __decorate$b([
        Property(false)
    ], OtpInput.prototype, "autoFocus", void 0);
    __decorate$b([
        Property(TextTransform.None)
    ], OtpInput.prototype, "textTransform", void 0);
    __decorate$b([
        Property({})
    ], OtpInput.prototype, "htmlAttributes", void 0);
    __decorate$b([
        Property([])
    ], OtpInput.prototype, "ariaLabels", void 0);
    __decorate$b([
        Event()
    ], OtpInput.prototype, "created", void 0);
    __decorate$b([
        Event()
    ], OtpInput.prototype, "valueChanged", void 0);
    __decorate$b([
        Event()
    ], OtpInput.prototype, "focus", void 0);
    __decorate$b([
        Event()
    ], OtpInput.prototype, "blur", void 0);
    __decorate$b([
        Event()
    ], OtpInput.prototype, "input", void 0);
    OtpInput = __decorate$b([
        NotifyPropertyChanges
    ], OtpInput);
    return OtpInput;
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
var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configuration settings for the toggle button used in the SpeechToText component.
 */
var ButtonSettings = /** @class */ (function (_super) {
    __extends$d(ButtonSettings, _super);
    function ButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$c([
        Property('')
    ], ButtonSettings.prototype, "content", void 0);
    __decorate$c([
        Property('')
    ], ButtonSettings.prototype, "stopContent", void 0);
    __decorate$c([
        Property('')
    ], ButtonSettings.prototype, "iconCss", void 0);
    __decorate$c([
        Property('')
    ], ButtonSettings.prototype, "stopIconCss", void 0);
    __decorate$c([
        Property('Left')
    ], ButtonSettings.prototype, "iconPosition", void 0);
    __decorate$c([
        Property(false)
    ], ButtonSettings.prototype, "isPrimary", void 0);
    return ButtonSettings;
}(ChildProperty));
/**
 * Configuration settings for tooltips in the SpeechToText component.
 * This allows customization of the tooltip content and its positioning.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends$d(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$c([
        Property('Start listening')
    ], TooltipSettings.prototype, "content", void 0);
    __decorate$c([
        Property('Stop listening')
    ], TooltipSettings.prototype, "stopContent", void 0);
    __decorate$c([
        Property('TopCenter')
    ], TooltipSettings.prototype, "position", void 0);
    return TooltipSettings;
}(ChildProperty));
/**
 * Enum representing the operational states of the SpeechToText component.
 */
var SpeechToTextState;
(function (SpeechToTextState) {
    /**
     * Specifies the state where the SpeechToText component is inactive and not processing spoken input.
     */
    SpeechToTextState["Inactive"] = "Inactive";
    /**
     * Specifies the state where the SpeechToText component is actively listening to spoken input.
     */
    SpeechToTextState["Listening"] = "Listening";
    /**
     * Specifies the state where the SpeechToText component has stopped processing spoken input.
     */
    SpeechToTextState["Stopped"] = "Stopped";
})(SpeechToTextState || (SpeechToTextState = {}));
//#endregion
var SpeechToText = /** @class */ (function (_super) {
    __extends$d(SpeechToText, _super);
    //#endregion
    //#region Inherited methods
    /**
     * Constructor for creating the component
     *
     * @param {SpeechToTextModel} options - Specifies the SpeechToTextModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function SpeechToText(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.fullTranscript = '';
        _this.isClicked = false;
        _this.isUserInteracted = false;
        _this.hasStarted = false;
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    SpeechToText.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    SpeechToText.prototype.getDirective = function () {
        return 'EJS-SPEECHTOTEXT';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    SpeechToText.prototype.getModuleName = function () {
        return 'speech-to-text';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    SpeechToText.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    SpeechToText.prototype.render = function () {
        this.renderSpeechToText();
        this.initializeSpeechRecognition();
        if (!isNullOrUndefined(this.listeningState)) {
            this.handleStateChange();
        }
        this.wireEvents();
    };
    //#endregion
    //#region Private Methods
    SpeechToText.prototype.initializeLocale = function () {
        this.l10n = new L10n(this.getModuleName(), {
            abortedError: 'Speech recognition was aborted.',
            audioCaptureError: 'No microphone detected. Ensure your microphone is connected.',
            defaultError: 'An unknown error occurred.',
            networkError: 'Network error occurred. Check your internet connection.',
            noSpeechError: 'No speech detected. Please speak into the microphone.',
            notAllowedError: 'Microphone access denied. Allow microphone permissions.',
            serviceNotAllowedError: 'Speech recognition service is not allowed in this context.',
            unsupportedBrowserError: 'The browser does not support the SpeechRecognition API.',
            startAriaLabel: 'Press to start speaking and transcribe your words',
            stopAriaLabel: 'Press to stop speaking and end transcription',
            startTooltipText: 'Start listening',
            stopTooltipText: 'Stop listening'
        }, this.locale);
    };
    SpeechToText.prototype.renderSpeechToText = function () {
        this.initializeLocale();
        var iconCss = !isNullOrUndefined(this.buttonSettings.iconCss) && this.buttonSettings.iconCss !== '' ? this.buttonSettings.iconCss : 'e-icons e-listen-icon';
        this.buttonInst = new Button({
            iconCss: iconCss,
            isPrimary: this.buttonSettings.isPrimary,
            cssClass: this.updateButtonCssClass(),
            disabled: this.disabled,
            content: this.buttonSettings.content,
            iconPosition: this.buttonSettings.iconPosition,
            enableRtl: this.enableRtl
        });
        this.buttonInst.appendTo(this.element);
        this.updateTooltip();
        this.updateCssClass(this.cssClass, '');
        this.updateAriaLabel();
        if (!isNullOrUndefined(this.htmlAttributes)) {
            this.addHtmlAttributes(this.htmlAttributes);
        }
    };
    SpeechToText.prototype.updateAriaLabel = function () {
        var ariaLabel;
        if (this.htmlAttributes && this.htmlAttributes['aria-label']) {
            ariaLabel = this.htmlAttributes['aria-label'];
        }
        else {
            ariaLabel = this.micOn ? this.l10n.getConstant('stopAriaLabel') : this.l10n.getConstant('startAriaLabel');
        }
        this.element.setAttribute('aria-label', ariaLabel);
    };
    SpeechToText.prototype.updateCssClass = function (newClass, oldClass) {
        if (oldClass) {
            removeClass([this.element], oldClass.trim().split(' '));
        }
        if (newClass) {
            addClass([this.element], newClass.trim().split(' '));
        }
    };
    SpeechToText.prototype.updateButtonCssClass = function () {
        var content = this.isClicked ? this.buttonSettings.stopContent : this.buttonSettings.content;
        var cssClass;
        if (content === '') {
            cssClass = 'e-round';
        }
        if (this.micOn) {
            cssClass += ' e-listening-state';
        }
        return cssClass;
    };
    SpeechToText.prototype.updateTooltip = function () {
        if (this.showTooltip) {
            if (this.tooltipSettings) {
                if (this.tooltipSettings.content === 'Start listening') {
                    this.tooltipSettings.content = this.l10n.getConstant('startTooltipText');
                }
                if (this.tooltipSettings.stopContent === 'Stop listening') {
                    this.tooltipSettings.stopContent = this.l10n.getConstant('stopTooltipText');
                }
            }
            this.tooltipInst = new Tooltip({
                content: this.hasStarted ? this.tooltipSettings.stopContent : this.tooltipSettings.content,
                position: this.tooltipSettings.position,
                windowCollision: true,
                cssClass: this.cssClass ? ('e-speech-to-text-tooltip ' + this.cssClass) : 'e-speech-to-text-tooltip',
                opensOn: 'Hover',
                enableRtl: this.enableRtl
            });
            this.tooltipInst.appendTo(this.element);
        }
        else {
            if (!isNullOrUndefined(this.tooltipInst)) {
                this.tooltipInst.destroy();
                this.tooltipInst = null;
            }
        }
    };
    SpeechToText.prototype.handleStateChange = function () {
        if (this.disabled) {
            return;
        }
        if (this.listeningState === SpeechToTextState.Listening) {
            this.micOn = true;
            this.startSpeechRecognition();
        }
        else if (this.listeningState === SpeechToTextState.Inactive || this.listeningState === SpeechToTextState.Stopped) {
            if (this.micOn) {
                this.micOn = false;
                this.stopSpeechRecognition();
            }
            else {
                var prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                this.listeningState = SpeechToTextState.Inactive;
                this.isProtectedOnChange = prevOnChange;
            }
        }
    };
    SpeechToText.prototype.addHtmlAttributes = function (attrs) {
        if (attrs) {
            for (var attr in attrs) {
                if (Object.prototype.hasOwnProperty.call(attrs, attr)) {
                    this.element.setAttribute(attr, attrs[attr]);
                }
            }
        }
    };
    SpeechToText.prototype.removeHtmlAttributes = function (attrs) {
        if (attrs) {
            for (var attr in attrs) {
                if (Object.prototype.hasOwnProperty.call(attrs, attr)) {
                    this.element.removeAttribute(attr);
                }
            }
        }
    };
    SpeechToText.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.handleButtonClick, this);
    };
    SpeechToText.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.handleButtonClick);
    };
    SpeechToText.prototype.handleButtonClick = function (event) {
        this.isUserInteracted = true;
        this.micOn = !this.micOn;
        if (this.micOn) {
            this.startSpeechRecognition(event);
        }
        else {
            this.stopSpeechRecognition(event);
        }
    };
    SpeechToText.prototype.triggerUnSupportedError = function () {
        var eventArgs = {
            error: 'unsupported-browser',
            errorMessage: this.l10n.getConstant('unsupportedBrowserError')
        };
        this.trigger('onError', eventArgs);
    };
    SpeechToText.prototype.initializeSpeechRecognition = function () {
        var _this = this;
        var windowInst = window;
        var SpeechRecognition = windowInst.SpeechRecognition || windowInst.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.triggerUnSupportedError();
            return;
        }
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.lang = this.lang;
        this.recognition.interimResults = this.allowInterimResults;
        this.recognition.onstart = function (event) {
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.transcript = _this.fullTranscript = '';
            _this.isProtectedOnChange = prevOnChange;
            var eventArgs = {
                cancel: false,
                listeningState: SpeechToTextState.Listening,
                event: event,
                isInteracted: _this.isUserInteracted
            };
            _this.trigger('onStart', eventArgs, function () {
                if (!eventArgs.cancel) {
                    _this.handleStartRecognition();
                }
                else {
                    _this.recognition.abort();
                    _this.micOn = false;
                }
            });
        };
        this.recognition.onend = function (event) {
            if (_this.hasStarted) {
                _this.micOn = false;
                _this.handleStopRecognition(event);
            }
        };
        this.recognition.onerror = function (event) {
            var errorMessage = '';
            switch (event.error) {
                case 'not-allowed':
                    errorMessage = _this.l10n.getConstant('notAllowedError');
                    break;
                case 'audio-capture':
                    errorMessage = _this.l10n.getConstant('audioCaptureError');
                    break;
                case 'network':
                    errorMessage = _this.l10n.getConstant('networkError');
                    break;
                case 'no-speech':
                    errorMessage = _this.l10n.getConstant('noSpeechError');
                    break;
                case 'aborted':
                    errorMessage = _this.l10n.getConstant('abortedError');
                    break;
                case 'service-not-allowed':
                    errorMessage = _this.l10n.getConstant('serviceNotAllowedError');
                    break;
                default:
                    errorMessage = _this.l10n.getConstant('defaultError');
            }
            var eventArgs = {
                event: event,
                error: event.error,
                errorMessage: errorMessage
            };
            _this.trigger('onError', eventArgs);
            _this.isUserInteracted = false;
        };
        this.recognition.onresult = function (event) {
            var result = event.results[event.resultIndex];
            var interimTranscript = '';
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            if (result.isFinal) {
                _this.fullTranscript += result[0].transcript;
                _this.transcript = _this.fullTranscript;
            }
            else {
                interimTranscript += result[0].transcript;
                _this.transcript = _this.fullTranscript + interimTranscript;
            }
            var eventArgs = {
                event: event,
                transcript: _this.transcript,
                isInterimResult: !result.isFinal
            };
            _this.trigger('transcriptChanged', eventArgs, function () {
                if (eventArgs.transcript !== _this.transcript) {
                    var prevOnChange_1 = _this.isProtectedOnChange;
                    _this.isProtectedOnChange = true;
                    _this.transcript = _this.fullTranscript = eventArgs.transcript;
                    _this.isProtectedOnChange = prevOnChange_1;
                }
            });
            _this.isProtectedOnChange = prevOnChange;
        };
    };
    SpeechToText.prototype.handleStartRecognition = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.hasStarted = true;
        this.listeningState = SpeechToTextState.Listening;
        if (!isNullOrUndefined(this.tooltipInst)) {
            this.tooltipInst.content = this.tooltipSettings.stopContent;
        }
        this.updateAriaLabel();
        this.isClicked = true;
        this.buttonInst.cssClass = this.updateButtonCssClass();
        this.buttonInst.content = this.buttonSettings.stopContent;
        var iconCss = !isNullOrUndefined(this.buttonSettings.stopIconCss) && this.buttonSettings.stopIconCss !== '' ? this.buttonSettings.stopIconCss : 'e-icons e-listen-stop';
        this.buttonInst.iconCss = iconCss;
        this.isProtectedOnChange = prevOnChange;
    };
    SpeechToText.prototype.triggerUnSupportedStart = function (event) {
        var _this = this;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.transcript = '';
        this.isProtectedOnChange = prevOnChange;
        var eventArgs = {
            cancel: false,
            listeningState: SpeechToTextState.Listening,
            event: event,
            isInteracted: this.isUserInteracted
        };
        this.trigger('onStart', eventArgs, function () {
            if (!eventArgs.cancel) {
                _this.handleStartRecognition();
            }
        });
    };
    SpeechToText.prototype.startSpeechRecognition = function (event) {
        if (this.hasStarted) {
            return;
        }
        if (this.recognition) {
            this.recognition.start();
        }
        else {
            this.triggerUnSupportedStart(event);
        }
    };
    SpeechToText.prototype.stopSpeechRecognition = function (event) {
        if (this.recognition) {
            this.recognition.stop();
        }
        else {
            this.handleStopRecognition(event);
        }
    };
    SpeechToText.prototype.handleStopRecognition = function (event) {
        if (!this.hasStarted) {
            return;
        } // Ensure onStop is only processed if needed
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.listeningState = SpeechToTextState.Stopped;
        if (!isNullOrUndefined(this.tooltipInst)) {
            this.tooltipInst.content = this.tooltipSettings.content;
        }
        this.updateAriaLabel();
        this.isClicked = false;
        this.buttonInst.cssClass = this.updateButtonCssClass();
        this.buttonInst.content = this.buttonSettings.content;
        var eventArgs = {
            listeningState: SpeechToTextState.Stopped,
            event: event,
            isInteracted: this.isUserInteracted
        };
        this.trigger('onStop', eventArgs);
        this.listeningState = SpeechToTextState.Inactive;
        var iconCss = !isNullOrUndefined(this.buttonSettings.iconCss) && this.buttonSettings.iconCss !== '' ? this.buttonSettings.iconCss : 'e-icons e-listen-icon';
        this.buttonInst.iconCss = iconCss;
        this.hasStarted = false;
        this.isProtectedOnChange = prevOnChange;
    };
    SpeechToText.prototype.buttonSettingsChanges = function (oldModel, newModel) {
        if (oldModel.content !== newModel.content || oldModel.stopContent !== newModel.stopContent) {
            this.buttonInst.content = this.hasStarted ? this.buttonSettings.stopContent : this.buttonSettings.content;
            this.buttonInst.cssClass = this.updateButtonCssClass();
        }
        if (oldModel.iconCss !== newModel.iconCss || oldModel.stopIconCss !== newModel.stopIconCss) {
            var iconCss = !isNullOrUndefined(this.buttonSettings.iconCss) && this.buttonSettings.iconCss !== '' ? this.buttonSettings.iconCss : 'e-icons e-listen-icon';
            var stopIconCss = !isNullOrUndefined(this.buttonSettings.stopIconCss) && this.buttonSettings.stopIconCss !== '' ? this.buttonSettings.stopIconCss : 'e-icons e-listen-stop';
            this.buttonInst.iconCss = this.hasStarted ? stopIconCss : iconCss;
        }
        if (oldModel.iconPosition !== newModel.iconPosition) {
            this.buttonInst.iconPosition = this.buttonSettings.iconPosition;
        }
        if (oldModel.isPrimary !== newModel.isPrimary) {
            this.buttonInst.isPrimary = this.buttonSettings.isPrimary;
        }
    };
    SpeechToText.prototype.destroyAndNullify = function (obj) {
        if (obj) {
            obj.destroy();
            obj = null;
        }
    };
    //#endregion
    //#region Public Methods
    /**
     * Destroy the SpeechToText.
     *
     * @returns {void}
     */
    SpeechToText.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.destroyAndNullify(this.buttonInst);
        this.destroyAndNullify(this.tooltipInst);
        this.recognition = null;
        this.micOn = null;
        this.htmlAttributes = this.tooltipSettings = this.buttonSettings = null;
        this.element.classList.remove('e-rtl');
    };
    /**
     * Begins the audio capture process by listening to the user's microphone input.
     * This method initiates the speech-to-text process and continuously updates the `transcript` property with interim and final recognition results.
     *
     * @returns {void} No return value.
     */
    SpeechToText.prototype.startListening = function () {
        if (!this.disabled && !this.isClicked) {
            this.isUserInteracted = false;
            this.micOn = true;
            this.startSpeechRecognition();
        }
    };
    /**
     * Stops the audio capture process and finalizes the speech recognition.
     * This method ends the ongoing speech-to-text operation and completes the recognition process, storing the final transcription.
     * It is typically called to stop listening when the user is finished speaking.
     *
     * @returns {void} No return value.
     */
    SpeechToText.prototype.stopListening = function () {
        if (!this.disabled && this.isClicked) {
            this.isUserInteracted = false;
            this.micOn = false;
            this.stopSpeechRecognition();
        }
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {SpeechToTextModel} newProp - Specifies new properties
     * @param  {SpeechToTextModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    SpeechToText.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'lang':
                    if (this.recognition) {
                        this.recognition.lang = this.lang;
                    }
                    break;
                case 'allowInterimResults':
                    if (this.recognition) {
                        this.recognition.interimResults = this.allowInterimResults;
                    }
                    break;
                case 'buttonSettings':
                    this.buttonSettingsChanges(oldProp.buttonSettings, newProp.buttonSettings);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'disabled':
                    this.buttonInst.disabled = this.disabled;
                    this.handleStateChange();
                    break;
                case 'htmlAttributes':
                    this.removeHtmlAttributes(oldProp.htmlAttributes);
                    this.addHtmlAttributes(newProp.htmlAttributes);
                    break;
                case 'listeningState':
                    this.handleStateChange();
                    break;
                case 'tooltipSettings':
                case 'showTooltip':
                    this.updateTooltip();
                    break;
                case 'transcript':
                    this.transcript = this.fullTranscript = newProp.transcript;
                    break;
                case 'enableRtl':
                    this.buttonInst.enableRtl = this.tooltipInst.enableRtl = this.enableRtl;
                    break;
                case 'locale':
                    this.l10n.setLocale(this.locale);
                    this.updateAriaLabel();
                    this.updateTooltip();
                    break;
            }
        }
    };
    __decorate$c([
        Property('')
    ], SpeechToText.prototype, "transcript", void 0);
    __decorate$c([
        Property('')
    ], SpeechToText.prototype, "lang", void 0);
    __decorate$c([
        Property(true)
    ], SpeechToText.prototype, "allowInterimResults", void 0);
    __decorate$c([
        Property(true)
    ], SpeechToText.prototype, "showTooltip", void 0);
    __decorate$c([
        Property('Inactive')
    ], SpeechToText.prototype, "listeningState", void 0);
    __decorate$c([
        Complex({}, ButtonSettings)
    ], SpeechToText.prototype, "buttonSettings", void 0);
    __decorate$c([
        Complex({}, TooltipSettings)
    ], SpeechToText.prototype, "tooltipSettings", void 0);
    __decorate$c([
        Property(false)
    ], SpeechToText.prototype, "disabled", void 0);
    __decorate$c([
        Property('')
    ], SpeechToText.prototype, "cssClass", void 0);
    __decorate$c([
        Property({})
    ], SpeechToText.prototype, "htmlAttributes", void 0);
    __decorate$c([
        Event()
    ], SpeechToText.prototype, "created", void 0);
    __decorate$c([
        Event()
    ], SpeechToText.prototype, "onStart", void 0);
    __decorate$c([
        Event()
    ], SpeechToText.prototype, "onStop", void 0);
    __decorate$c([
        Event()
    ], SpeechToText.prototype, "onError", void 0);
    __decorate$c([
        Event()
    ], SpeechToText.prototype, "transcriptChanged", void 0);
    SpeechToText = __decorate$c([
        NotifyPropertyChanges
    ], SpeechToText);
    return SpeechToText;
}(Component));

export { AsyncSettings, ButtonSettings, ButtonsProps, ChatMessageRole, ColorPicker, ColorRangeData, ErrorOption, FilesProp, FormValidator, Input, LabelPosition, LimitData, MaskUndo, MaskedTextBox, NumericTextBox, OtpInput, OtpInputStyle, OtpInputType, PrecisionType, Rating, Signature, SignatureBase, Slider, SmartTextArea, SpeechToText, SpeechToTextState, TEXTBOX_FOCUS, TextArea, TextBox, TextTransform, TicksData, TooltipData, TooltipSettings, Uploader, applyMask, bindClearEvent, containerAttributes, createMask, escapeRegExp, getMaskedVal, getVal, maskInput, maskInputBlurHandler, maskInputDropHandler, maskInputFocusHandler, maskInputMouseDownHandler, maskInputMouseUpHandler, mobileRemoveFunction, regex, regularExpressions, setElementValue, setMaskValue, strippedValue, triggerFocus, unstrippedValue, unwireEvents, wireEvents };
//# sourceMappingURL=ej2-inputs.es5.js.map
