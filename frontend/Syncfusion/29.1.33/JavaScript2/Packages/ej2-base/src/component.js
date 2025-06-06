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
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { isUndefined, getValue, isNullOrUndefined, setValue, uniqueID, isBlazor } from './util';
import { ModuleLoader } from './module-loader';
import { Base } from './base';
import { Observer } from './observer';
import { ChildProperty } from './child-property';
import { Property, NotifyPropertyChanges } from './notify-property-change';
import { onIntlChange, rightToLeft, defaultCulture } from './internationalization';
import { createElement, addClass, removeClass, select } from './dom';
var componentCount = 0;
var lastPageID;
var lastHistoryLen = 0;
// Decalre the static variable to count the instance
// Decalre the static variable to find if control limit exceed or not
// We have added styles to inline type so here declare the static variable to detect if banner is added or not
export var versionBasedStatePersistence = false;
/**
 * To enable or disable version based statePersistence functionality for all components globally.
 *
 * @param {boolean} status - Optional argument Specifies the status value to enable or disable versionBasedStatePersistence option.
 * @returns {void}
 */
export function enableVersionBasedPersistence(status) {
    versionBasedStatePersistence = status;
}
/**
 * Base class for all Essential JavaScript components
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /**
     * Initialize the constructor for component base
     *
     * @param {Object} options ?
     * @param {string} selector ?
     */
    function Component(options, selector) {
        var _this = _super.call(this, options, selector) || this;
        _this.randomId = uniqueID();
        /**
         * string template option for Blazor template rendering
         *
         * @private
         */
        _this.isStringTemplate = false;
        _this.needsID = false;
        _this.isReactHybrid = false;
        _this.isAngular = false;
        _this.isReact = false;
        _this.isVue = false;
        if (isNullOrUndefined(_this.enableRtl)) {
            _this.setProperties({ 'enableRtl': rightToLeft }, true);
        }
        if (isNullOrUndefined(_this.locale)) {
            _this.setProperties({ 'locale': defaultCulture }, true);
        }
        _this.moduleLoader = new ModuleLoader(_this);
        _this.localObserver = new Observer(_this);
        onIntlChange.on('notifyExternalChange', _this.detectFunction, _this, _this.randomId);
        // Based on the considered control list we have count the instance
        if (!isUndefined(selector)) {
            _this.appendTo();
        }
        return _this;
    }
    Component.prototype.requiredModules = function () {
        return [];
    };
    /**
     * Destroys the sub modules while destroying the widget
     *
     * @returns {void} ?
     */
    Component.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.enablePersistence) {
            this.setPersistData();
            this.detachUnloadEvent();
        }
        this.localObserver.destroy();
        if (this.refreshing) {
            return;
        }
        removeClass([this.element], ['e-control']);
        this.trigger('destroyed', { cancel: false });
        _super.prototype.destroy.call(this);
        this.moduleLoader.clean();
        onIntlChange.off('notifyExternalChange', this.detectFunction, this.randomId);
    };
    /**
     * Applies all the pending property changes and render the component again.
     *
     * @returns {void} ?
     */
    Component.prototype.refresh = function () {
        this.refreshing = true;
        this.moduleLoader.clean();
        this.destroy();
        this.clearChanges();
        this.localObserver = new Observer(this);
        this.preRender();
        this.injectModules();
        this.render();
        this.refreshing = false;
    };
    Component.prototype.accessMount = function () {
        if (this.mount && !this.isReactHybrid) {
            this.mount();
        }
    };
    /**
     * Returns the route element of the component
     *
     * @returns {HTMLElement} ?
     */
    Component.prototype.getRootElement = function () {
        if (this.isReactHybrid) {
            return this.actualElement;
        }
        else {
            return this.element;
        }
    };
    /**
     * Returns the persistence data for component
     *
     * @returns {any} ?
     */
    Component.prototype.getLocalData = function () {
        var eleId = this.getModuleName() + this.element.id;
        if (versionBasedStatePersistence) {
            return window.localStorage.getItem(eleId + this.ej2StatePersistenceVersion);
        }
        else {
            return window.localStorage.getItem(eleId);
        }
    };
    /**
     * Adding unload event to persist data when enable persistence true
     *
     * @returns {void}
     */
    Component.prototype.attachUnloadEvent = function () {
        this.handleUnload = this.handleUnload.bind(this);
        window.addEventListener('pagehide', this.handleUnload);
    };
    /**
     * Handling unload event to persist data when enable persistence true
     *
     * @returns {void}
     */
    Component.prototype.handleUnload = function () {
        this.setPersistData();
    };
    /**
     * Removing unload event to persist data when enable persistence true
     *
     * @returns {void}
     */
    Component.prototype.detachUnloadEvent = function () {
        window.removeEventListener('pagehide', this.handleUnload);
    };
    /**
     * Appends the control within the given HTML element
     *
     * @param {string | HTMLElement} selector - Target element where control needs to be appended
     * @returns {void} ?
     */
    Component.prototype.appendTo = function (selector) {
        if (!isNullOrUndefined(selector) && typeof (selector) === 'string') {
            this.element = select(selector, document);
        }
        else if (!isNullOrUndefined(selector)) {
            this.element = selector;
        }
        if (!isNullOrUndefined(this.element)) {
            var moduleClass = 'e-' + this.getModuleName().toLowerCase();
            addClass([this.element], ['e-control', moduleClass]);
            this.isProtectedOnChange = false;
            if (this.needsID && !this.element.id) {
                this.element.id = this.getUniqueID(this.getModuleName());
            }
            if (this.enablePersistence) {
                this.mergePersistData();
                this.attachUnloadEvent();
            }
            var inst = getValue('ej2_instances', this.element);
            if (!inst || inst.indexOf(this) === -1) {
                _super.prototype.addInstance.call(this);
            }
            this.preRender();
            this.injectModules();
            // Throw a warning for the required modules to be injected.
            var ignoredComponents = {
                schedule: 'all',
                diagram: 'all',
                PdfViewer: 'all',
                grid: ['logger'],
                richtexteditor: ['link', 'table', 'image', 'audio', 'video', 'formatPainter', 'emojiPicker', 'pasteCleanup', 'htmlEditor', 'toolbar', 'importExport'],
                treegrid: ['filter'],
                gantt: ['tooltip'],
                chart: ['Export', 'Zoom'],
                accumulationchart: ['Export'],
                'query-builder': 'all'
            };
            var component = this.getModuleName();
            if (this.requiredModules && (!ignoredComponents["" + component] || ignoredComponents["" + component] !== 'all')) {
                var modulesRequired = this.requiredModules();
                for (var _i = 0, _a = this.moduleLoader.getNonInjectedModules(modulesRequired); _i < _a.length; _i++) {
                    var module = _a[_i];
                    var moduleName = module.name ? module.name : module.member;
                    if (ignoredComponents["" + component] && ignoredComponents["" + component].indexOf(module.member) !== -1) {
                        continue;
                    }
                    var componentName = component.charAt(0).toUpperCase() + component.slice(1); // To capitalize the component name
                    console.warn("[WARNING] :: Module \"" + moduleName + "\" is not available in " + componentName + " component! You either misspelled the module name or forgot to load it.");
                }
            }
            // Checked weather cases are valid or not. If control leads to more than five counts
            this.render();
            if (!this.mount) {
                this.trigger('created');
            }
            else {
                this.accessMount();
            }
        }
    };
    /**
     * It is used to process the post rendering functionalities to a component.
     *
     * @param {Node} wrapperElement ?
     * @returns {void} ?
     */
    Component.prototype.renderComplete = function (wrapperElement) {
        if (isBlazor()) {
            var sfBlazor = 'sfBlazor';
            window["" + sfBlazor].renderComplete(this.element, wrapperElement);
        }
        this.isRendered = true;
    };
    /**
     * When invoked, applies the pending property changes immediately to the component.
     *
     * @returns {void} ?
     */
    Component.prototype.dataBind = function () {
        this.injectModules();
        _super.prototype.dataBind.call(this);
    };
    /**
     * Attach one or more  event handler to the current component context.
     * It is used for internal handling event internally within the component only.
     *
     * @param {BoundOptions[]| string} event - It is  optional type either to  Set the collection of event list or the eventName.
     * @param {Function} handler - optional parameter Specifies the handler to run when the event occurs
     * @param {Object} context - optional parameter Specifies the context to be bind in the handler.
     * @returns {void} ?
     * @private
     */
    Component.prototype.on = function (event, handler, context) {
        if (typeof event === 'string') {
            this.localObserver.on(event, handler, context);
        }
        else {
            for (var _i = 0, event_1 = event; _i < event_1.length; _i++) {
                var arg = event_1[_i];
                this.localObserver.on(arg.event, arg.handler, arg.context);
            }
        }
    };
    /**
     * To remove one or more event handler that has been attached with the on() method.
     *
     * @param {BoundOptions[]| string} event - It is  optional type either to  Set the collection of event list or the eventName.
     * @param {Function} handler - optional parameter Specifies the function to run when the event occurs
     * @returns {void} ?
     * @private
     */
    Component.prototype.off = function (event, handler) {
        if (typeof event === 'string') {
            this.localObserver.off(event, handler);
        }
        else {
            for (var _i = 0, event_2 = event; _i < event_2.length; _i++) {
                var arg = event_2[_i];
                this.localObserver.off(arg.event, arg.handler);
            }
        }
    };
    /**
     * To notify the handlers in the specified event.
     *
     * @param {string} property - Specifies the event to be notify.
     * @param {Object} argument - Additional parameters to pass while calling the handler.
     * @returns {void} ?
     * @private
     */
    Component.prototype.notify = function (property, argument) {
        if (this.isDestroyed !== true) {
            this.localObserver.notify(property, argument);
        }
    };
    /**
     * Get injected modules
     *
     * @returns {Function} ?
     * @private
     */
    Component.prototype.getInjectedModules = function () {
        return this.injectedModules;
    };
    /**
     * Dynamically injects the required modules to the component.
     *
     * @param {Function} moduleList ?
     * @returns {void} ?
     */
    Component.Inject = function () {
        var moduleList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moduleList[_i] = arguments[_i];
        }
        if (!this.prototype.injectedModules) {
            this.prototype.injectedModules = [];
        }
        for (var i = 0; i < moduleList.length; i++) {
            if (this.prototype.injectedModules.indexOf(moduleList[parseInt(i.toString(), 10)]) === -1) {
                this.prototype.injectedModules.push(moduleList[parseInt(i.toString(), 10)]);
            }
        }
    };
    /**
     * This is a instance method to create an element.
     *
     * @param {string} tagName ?
     * @param {ElementProperties} prop ?
     * @param {boolean} isVDOM ?
     * @returns {any} ?
     * @private
     */
    Component.prototype.createElement = function (tagName, prop, isVDOM) {
        return createElement(tagName, prop);
    };
    /**
     *
     * @param {Function} handler - handler to be triggered after state Updated.
     * @param {any} argument - Arguments to be passed to caller.
     * @returns {void} .
     * @private
     */
    Component.prototype.triggerStateChange = function (handler, argument) {
        if (this.isReactHybrid) {
            this.setState();
            this.currentContext = { calls: handler, args: argument };
        }
    };
    Component.prototype.injectModules = function () {
        if (this.injectedModules && this.injectedModules.length) {
            this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
        }
    };
    Component.prototype.detectFunction = function (args) {
        var prop = Object.keys(args);
        if (prop.length) {
            this[prop[0]] = args[prop[0]];
        }
    };
    Component.prototype.mergePersistData = function () {
        var data;
        if (versionBasedStatePersistence) {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id + this.ej2StatePersistenceVersion);
        }
        else {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        }
        if (!(isNullOrUndefined(data) || (data === ''))) {
            this.setProperties(JSON.parse(data), true);
        }
    };
    Component.prototype.setPersistData = function () {
        if (!this.isDestroyed) {
            if (versionBasedStatePersistence) {
                window.localStorage.setItem(this.getModuleName() +
                    this.element.id + this.ej2StatePersistenceVersion, this.getPersistData());
            }
            else {
                window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
            }
        }
    };
    Component.prototype.renderReactTemplates = function (callback) {
        if (!isNullOrUndefined(callback)) {
            callback();
        }
    };
    Component.prototype.clearTemplate = function (templateName, index) {
        //No Code
    };
    Component.prototype.getUniqueID = function (definedName) {
        if (this.isHistoryChanged()) {
            componentCount = 0;
        }
        lastPageID = this.pageID(location.href);
        lastHistoryLen = history.length;
        return definedName + '_' + lastPageID + '_' + componentCount++;
    };
    Component.prototype.pageID = function (url) {
        var hash = 0;
        if (url.length === 0) {
            return hash;
        }
        for (var i = 0; i < url.length; i++) {
            var char = url.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };
    Component.prototype.isHistoryChanged = function () {
        return lastPageID !== this.pageID(location.href) || lastHistoryLen !== history.length;
    };
    Component.prototype.addOnPersist = function (options) {
        var _this = this;
        var persistObj = {};
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var key = options_1[_i];
            var objValue = getValue(key, this);
            if (!isUndefined(objValue)) {
                setValue(key, this.getActualProperties(objValue), persistObj);
            }
        }
        return JSON.stringify(persistObj, function (key, value) {
            return _this.getActualProperties(value);
        });
    };
    Component.prototype.getActualProperties = function (obj) {
        if (obj instanceof ChildProperty) {
            return getValue('properties', obj);
        }
        else {
            return obj;
        }
    };
    Component.prototype.ignoreOnPersist = function (options) {
        return JSON.stringify(this.iterateJsonProperties(this.properties, options));
    };
    Component.prototype.iterateJsonProperties = function (obj, ignoreList) {
        var newObj = {};
        var _loop_1 = function (key) {
            if (ignoreList.indexOf(key) === -1) {
                var value = obj["" + key];
                if (typeof value === 'object' && !(value instanceof Array)) {
                    var newList = ignoreList.filter(function (str) {
                        var regExp = RegExp;
                        return new regExp(key + '.').test(str);
                    }).map(function (str) {
                        return str.replace(key + '.', '');
                    });
                    newObj["" + key] = this_1.iterateJsonProperties(this_1.getActualProperties(value), newList);
                }
                else {
                    newObj["" + key] = value;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
        return newObj;
    };
    __decorate([
        Property(false)
    ], Component.prototype, "enablePersistence", void 0);
    __decorate([
        Property()
    ], Component.prototype, "enableRtl", void 0);
    __decorate([
        Property()
    ], Component.prototype, "locale", void 0);
    Component = __decorate([
        NotifyPropertyChanges
    ], Component);
    return Component;
}(Base));
export { Component };
//Function handling for page navigation detection
/* istanbul ignore next */
(function () {
    if (typeof window !== 'undefined') {
        window.addEventListener('popstate', 
        /* istanbul ignore next */
        function () {
            componentCount = 0;
        });
    }
})();
