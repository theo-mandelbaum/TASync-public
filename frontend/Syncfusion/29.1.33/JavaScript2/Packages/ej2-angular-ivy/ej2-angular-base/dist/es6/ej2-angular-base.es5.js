import { isNullOrUndefined, getValue, setValue as setValue$1, createElement, attributes, isUndefined, isObject, getTemplateEngine, setTemplateEngine } from '@syncfusion/ej2-base';
import { EventEmitter } from '@angular/core';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
/**
 * Angular Utility Module
 *
 * @param {Function} derivedClass The derived class to which mixins are applied.
 * @param {Function[]} baseClass An array of base classes whose methods are applied as mixins.
 * @returns {void}
 */
function applyMixins(derivedClass, baseClass) {
    baseClass.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
            if (!Object.prototype.hasOwnProperty.call(derivedClass.prototype, name) || (baseClass.isFormBase && name !== 'constructor')) {
                derivedClass.prototype["".concat(name)] = baseClass.prototype["".concat(name)];
            }
        });
    });
}
/**
 * Decorator function to apply mixins to a derived class.
 *
 * @param {Function[]} baseClass - An array of mixin classes to be applied to the derived class.
 * @returns {ClassDecorator} The decorator function.
 */
function ComponentMixins(baseClass) {
    return function (derivedClass) {
        applyMixins(derivedClass, baseClass);
    };
}
/**
 * Registers events.
 *
 * @private
 * @param {string[]} eventList - The list of events to register.
 * @param {any} obj - The object on which to register the events.
 * @param {boolean} [direct] - Whether to register events directly on the object or not.
 * @returns {void}
 */
function registerEvents(eventList, obj, direct) {
    var ngEventsEmitter = {};
    if (eventList && eventList.length) {
        for (var _i = 0, eventList_1 = eventList; _i < eventList_1.length; _i++) {
            var event_1 = eventList_1[_i];
            if (direct === true) {
                obj.propCollection["".concat(event_1)] = new EventEmitter(false);
                obj["".concat(event_1)] = obj.propCollection["".concat(event_1)];
            }
            else {
                ngEventsEmitter["".concat(event_1)] = new EventEmitter(false);
            }
        }
        if (direct !== true) {
            obj.setProperties(ngEventsEmitter, true);
        }
    }
}
/**
 * Clears registered templates.
 *
 * @private
 * @param {any} _this - The context object.
 * @param {string[]} [templateNames] - Optional. An array of template names to clear.
 * @param {any[]} [index] - Optional. An array of indices specifying templates to clear.
 * @returns {void}
 */
function clearTemplate(_this, templateNames, index) {
    var _a;
    var regTemplates = Object.keys(_this.registeredTemplate);
    if (regTemplates.length) {
        /* istanbul ignore next */
        var regProperties = templateNames && templateNames.filter(function (val) {
            return (/\./g.test(val) ? false : true);
        });
        var tabaccordionTemp = /tab|accordion|toolbar/.test((_a = _this.getModuleName) === null || _a === void 0 ? void 0 : _a.call(_this));
        for (var _i = 0, _b = (regProperties && regProperties || regTemplates); _i < _b.length; _i++) {
            var registeredTemplate = _b[_i];
            /* istanbul ignore next */
            if (index && index.length) {
                for (var e = 0; e < index.length; e++) {
                    if (tabaccordionTemp) {
                        for (var m = 0; m < _this.registeredTemplate["".concat(registeredTemplate)].length; m++) {
                            var value = _this.registeredTemplate["".concat(registeredTemplate)][parseInt(m.toString(), 10)];
                            if (value && value === index["".concat(e)]) {
                                value.destroy();
                                _this.registeredTemplate["".concat(registeredTemplate)].splice(m, 1);
                            }
                        }
                    }
                    else {
                        for (var m = 0; m < _this.registeredTemplate.template.length; m++) {
                            var value = _this.registeredTemplate.template[parseInt(m.toString(), 10)].rootNodes[0];
                            if (value === index["".concat(e)]) {
                                var rt = _this.registeredTemplate["".concat(registeredTemplate)];
                                rt[parseInt(m.toString(), 10)].destroy();
                            }
                        }
                    }
                }
            }
            else {
                if (_this.registeredTemplate["".concat(registeredTemplate)]) {
                    for (var _c = 0, _d = _this.registeredTemplate["".concat(registeredTemplate)]; _c < _d.length; _c++) {
                        var rt = _d[_c];
                        if (!rt.destroyed) {
                            if (rt._view) {
                                var pNode = rt._view.renderer.parentNode(rt.rootNodes[0]);
                                if (!isNullOrUndefined(pNode)) {
                                    for (var m = 0; m < rt.rootNodes.length; m++) {
                                        pNode.appendChild(rt.rootNodes[parseInt(m.toString(), 10)]);
                                    }
                                }
                            }
                            rt.destroy();
                        }
                    }
                }
            }
            if (!tabaccordionTemp || !index) {
                delete _this.registeredTemplate["".concat(registeredTemplate)];
            }
        }
    }
    var _loop_1 = function (tagObject) {
        if (tagObject.instance) {
            /* istanbul ignore next */
            tagObject.instance.clearTemplate((templateNames && templateNames.filter(function (val) {
                var regExp = RegExp;
                return (new regExp(tagObject.name).test(val) ? true : false);
            })));
        }
    };
    for (var _e = 0, _f = _this.tagObjects; _e < _f.length; _e++) {
        var tagObject = _f[_e];
        _loop_1(tagObject);
    }
}
/**
 * To set value for the nameSpace in desired object.
 *
 * @param {string} nameSpace - String value to get the inner object.
 * @param {any} value - Value that you need to set.
 * @param {any} object - Object to get the inner object value.
 * @returns {void}
 * @private
 */
function setValue(nameSpace, value, object) {
    var keys = nameSpace.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    /* istanbul ignore next */
    var fromObj = object || {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[parseInt(i.toString(), 10)];
        if (i + 1 === keys.length) {
            fromObj["".concat(key)] = value === undefined ? {} : value;
        }
        else if (fromObj["".concat(key)] === undefined) {
            fromObj["".concat(key)] = {};
        }
        fromObj = fromObj["".concat(key)];
    }
    return fromObj;
}

var refRegex = /Ref$/;
var ComplexBase = /** @__PURE__ @class */ (function () {
    function ComplexBase() {
        this.hasChanges = false;
        this.propCollection = {};
        this.dataSource = {};
        this.tags = [];
        this.tagObjects = [];
    }
    ComplexBase.prototype.ngOnInit = function () {
        this.registeredTemplate = {};
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            var objInstance = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
            if (objInstance) {
                this.tagObjects.push({ instance: objInstance, name: tag });
            }
        }
        var templateProperties = Object.keys(this);
        for (var i = 0; i < templateProperties.length; i++) {
            var tempProp = getValue(templateProperties[parseInt(i.toString(), 10)], this);
            if (typeof tempProp === 'object' && tempProp && tempProp.elementRef) {
                if (!getValue(templateProperties[parseInt(i.toString(), 10)].indexOf('Ref') !== -1 ? templateProperties[parseInt(i.toString(), 10)] : templateProperties[parseInt(i.toString(), 10)] + 'Ref', this)) {
                    setValue$1(templateProperties[parseInt(i.toString(), 10)].indexOf('Ref') !== -1 ? templateProperties[parseInt(i.toString(), 10)] : templateProperties[parseInt(i.toString(), 10)] + 'Ref', tempProp, this);
                }
                if (getValue('viewContainerRef', this) && !getValue('_viewContainerRef', tempProp.elementRef.nativeElement) && !getValue('propName', tempProp.elementRef.nativeElement)) {
                    setValue$1('_viewContainerRef', getValue('viewContainerRef', this), tempProp.elementRef.nativeElement);
                    setValue$1('propName', templateProperties[parseInt(i.toString(), 10)].replace('Ref', ''), tempProp.elementRef.nativeElement);
                }
            }
        }
        templateProperties = Object.keys(this);
        templateProperties = templateProperties.filter(function (val) {
            return /Ref$/i.test(val);
        });
        for (var _b = 0, templateProperties_1 = templateProperties; _b < templateProperties_1.length; _b++) {
            var tempName = templateProperties_1[_b];
            var propName = tempName.replace('Ref', '');
            setValue$1(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
        }
        // Angular 9 compatibility to overcome ngOnchange not get triggered issue
        // To Update properties to "this.propCollection"
        var propList = Object.keys(this);
        /* istanbul ignore next */
        if (this.directivePropList) {
            for (var k = 0; k < this.directivePropList.length; k++) {
                var dirPropName = this.directivePropList[parseInt(k.toString(), 10)];
                if (propList.indexOf(dirPropName) !== -1 && (getValue(dirPropName, this) === false || getValue(dirPropName, this))) {
                    setValue$1(dirPropName, getValue(dirPropName, this), this.propCollection);
                }
            }
            this.hasChanges = true;
        }
        this.isInitChanges = true;
    };
    ComplexBase.prototype.registerEvents = function (eventList) {
        registerEvents(eventList, this, true);
    };
    ComplexBase.prototype.ngOnChanges = function (changes) {
        for (var _i = 0, _a = Object.keys(changes); _i < _a.length; _i++) {
            var propName = _a[_i];
            var changedVal = changes["".concat(propName)];
            this.propCollection["".concat(propName)] = changedVal.currentValue;
        }
        this.isUpdated = false;
        this.hasChanges = true;
    };
    /* istanbul ignore next */
    ComplexBase.prototype.clearTemplate = function (templateNames) {
        clearTemplate(this, templateNames);
    };
    ComplexBase.prototype.getProperties = function () {
        /* istanbul ignore next */
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var tagObject = _a[_i];
            this.propCollection[tagObject.name] = tagObject.instance.getProperties();
        }
        return this.propCollection;
    };
    ComplexBase.prototype.isChanged = function () {
        var result = this.hasChanges;
        if (!isNullOrUndefined(this.propCollection[this.property])) {
            var tempProps = this.propCollection[this.property];
            var props = Object.keys(tempProps[0]);
            for (var d = 0; d < props.length; d++) {
                if (!isNullOrUndefined(this.propCollection[props[parseInt(d.toString(), 10)]])) {
                    var val = getValue(props[parseInt(d.toString(), 10)], this);
                    var propVal = this.propCollection[this.property][0][props[parseInt(d.toString(), 10)]];
                    if (!isNullOrUndefined(val) && this.propCollection[props[parseInt(d.toString(), 10)]] !== val
                        && propVal !== val) {
                        setValue$1(props[parseInt(d.toString(), 10)], val, this.propCollection[this.property][0]);
                        setValue$1(props[parseInt(d.toString(), 10)], val, this.propCollection);
                        this.hasChanges = true;
                        this.isUpdated = false;
                    }
                }
            }
        }
        /* istanbul ignore next */
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var item = _a[_i];
            result = result || item.instance.hasChanges;
        }
        return result || this.hasChanges;
    };
    ComplexBase.prototype.ngAfterContentChecked = function () {
        this.hasChanges = this.isChanged();
        if (this.isInitChanges || this.hasChanges) {
            var templateProperties = Object.keys(this);
            templateProperties = templateProperties.filter(function (val) {
                return refRegex.test(val);
            });
            for (var _i = 0, templateProperties_2 = templateProperties; _i < templateProperties_2.length; _i++) {
                var tempName = templateProperties_2[_i];
                var propName = tempName.replace('Ref', '');
                setValue$1(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
            }
        }
    };
    ComplexBase.prototype.ngAfterViewChecked = function () {
        /* istanbul ignore next */
        if (this.isUpdated) {
            this.hasChanges = false;
        }
    };
    ComplexBase.prototype.ngAfterViewInit = function () {
        /* istanbul ignore next */
        this.isInitChanges = false;
    };
    ComplexBase.prototype.ngOnDestroy = function () {
        /* istanbul ignore next */
        this.directivePropList = [];
    };
    return ComplexBase;
}());
var ArrayBase = /** @__PURE__ @class */ (function () {
    function ArrayBase(propertyName) {
        this.list = [];
        this.hasChanges = false;
        this.propertyName = propertyName;
    }
    ArrayBase.prototype.ngOnInit = function () {
        this.isInitChanges = true;
    };
    ArrayBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        var index = 0;
        /* istanbul ignore next */
        this.list = this.children.map(function (child) {
            child.dirIndex = index++;
            child.property = _this.propertyName;
            return child;
        });
        this.hasChanges = true;
    };
    ArrayBase.prototype.getProperties = function () {
        var onlyProp = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            onlyProp.push(item.getProperties());
        }
        return onlyProp;
    };
    ArrayBase.prototype.isChanged = function () {
        var _this = this;
        var result = false;
        var index = 0;
        var isSourceChanged = false;
        var childrenDataSource = this.children.map(function (child) {
            return child;
        });
        /* istanbul ignore next */
        if (this.list.length === this.children.length) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[parseInt(i.toString(), 10)].propCollection.dataSource) {
                    if (this.list[parseInt(i.toString(), 10)].dataSource &&
                        this.list[parseInt(i.toString(), 10)].propCollection.dataSource
                            !== this.list[parseInt(i.toString(), 10)].dataSource) {
                        this.list[parseInt(i.toString(), 10)].propCollection.dataSource = this.list[parseInt(i.toString(), 10)].dataSource;
                        this.list[parseInt(i.toString(), 10)].hasChanges = true;
                    }
                    if (this.list[parseInt(i.toString(), 10)].property !== 'series') {
                        isSourceChanged = (JSON.stringify(this.list[parseInt(i.toString(), 10)].propCollection.dataSource) !==
                            JSON.stringify(childrenDataSource[parseInt(i.toString(), 10)].propCollection.dataSource));
                    }
                }
                isSourceChanged = this.list[parseInt(i.toString(), 10)].hasChanges
                    !== childrenDataSource[parseInt(i.toString(), 10)].hasChanges;
            }
        }
        this.hasNewChildren = (this.list.length !== this.children.length || isSourceChanged) ? true : null;
        if (this.hasNewChildren) {
            this.list = this.children.map(function (child) {
                child.dirIndex = index++;
                child.property = _this.propertyName;
                return child;
            });
        }
        /* istanbul ignore end */
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            result = result || item.hasChanges;
        }
        return !!this.list.length && result;
    };
    ArrayBase.prototype.clearTemplate = function (templateNames) {
        var _this = this;
        /* istanbul ignore next */
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            item.clearTemplate(templateNames && templateNames.map(function (val) {
                var regExp = RegExp;
                return new regExp(_this.propertyName).test(val) ? val.replace(_this.propertyName + '.', '') : val;
            }));
        }
    };
    ArrayBase.prototype.ngAfterContentChecked = function () {
        this.hasChanges = this.isChanged();
        for (var i = 0; i < this.list.length; i++) {
            if (getValue('childColumns', this.list[parseInt(i.toString(), 10)]) && getValue('property', this.list[parseInt(i.toString(), 10)]) === 'columns') {
                setValue$1('columns', getValue('childColumns', this.list[parseInt(i.toString(), 10)]).getProperties(), this.list[parseInt(i.toString(), 10)].propCollection);
            }
            this.list[parseInt(i.toString(), 10)].isUpdated = true;
        }
    };
    ArrayBase.prototype.ngAfterViewInit = function () {
        this.isInitChanges = false;
    };
    ArrayBase.prototype.ngOnDestroy = function () {
        this.list = [];
    };
    return ArrayBase;
}());

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
var ComponentBase = /** @__PURE__ @class */ (function () {
    function ComponentBase() {
        this.isProtectedOnChange = true;
        this.isFormInit = true;
    }
    ComponentBase.prototype.saveChanges = function (key, newValue, oldValue) {
        if (this.isProtectedOnChange) {
            return;
        }
        this.oldProperties["".concat(key)] = oldValue;
        this.changedProperties["".concat(key)] = newValue;
        this.finalUpdate();
        var changeTime = setTimeout(this.dataBind.bind(this));
        var clearUpdate = function () {
            clearTimeout(changeTime);
        };
        this.finalUpdate = clearUpdate;
    };
    ComponentBase.prototype.ngOnInit = function (isTempRef) {
        var tempOnThis = isTempRef || this;
        tempOnThis.registeredTemplate = {};
        tempOnThis.ngBoundedEvents = {};
        tempOnThis.isAngular = true;
        tempOnThis.isFormInit = true;
        /* istanbul ignore next */
        if (isTempRef) {
            this.tags = isTempRef.tags;
        }
        tempOnThis.tags = this.tags || [];
        tempOnThis.complexTemplate = this.complexTemplate || [];
        tempOnThis.tagObjects = [];
        tempOnThis.ngAttr = this.getAngularAttr(tempOnThis.element);
        /* istanbul ignore next */
        tempOnThis.createElement = function (tagName, prop) {
            var ele = tempOnThis.srenderer ? tempOnThis.srenderer.createElement(tagName) : createElement(tagName);
            if (typeof (prop) === 'undefined') {
                return ele;
            }
            ele.innerHTML = (prop.innerHTML ? prop.innerHTML : '');
            if (prop.className !== undefined) {
                ele.className = prop.className;
            }
            if (prop.id !== undefined) {
                ele.id = prop.id;
            }
            if (prop.styles !== undefined) {
                ele.setAttribute('style', prop.styles);
            }
            if (tempOnThis.ngAttr !== undefined) {
                ele.setAttribute(tempOnThis.ngAttr, '');
            }
            if (prop.attrs !== undefined) {
                attributes(ele, prop.attrs);
            }
            return ele;
        };
        for (var _i = 0, _a = tempOnThis.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            var tagObject = {
                instance: getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), tempOnThis),
                name: tag
            };
            tempOnThis.tagObjects.push(tagObject);
        }
        var complexTemplates = Object.keys(tempOnThis);
        for (var i = 0; i < complexTemplates.length; i++) {
            var compProp = getValue(complexTemplates[parseInt(i.toString(), 10)], tempOnThis);
            if (typeof compProp === 'object' && compProp && compProp.elementRef) {
                if (typeof compProp === 'object' && compProp && compProp.elementRef && complexTemplates[parseInt(i.toString(), 10)].indexOf('_') !== -1 && complexTemplates[parseInt(i.toString(), 10)].indexOf('Ref') === -1) {
                    setValue$1(complexTemplates[parseInt(i.toString(), 10)] + 'Ref', compProp, tempOnThis);
                }
                if (tempOnThis.viewContainerRef && !getValue('_viewContainerRef', compProp.elementRef.nativeElement) && !getValue('propName', compProp.elementRef.nativeElement)) {
                    setValue$1('_viewContainerRef', tempOnThis.viewContainerRef, compProp.elementRef.nativeElement);
                    setValue$1('propName', complexTemplates[parseInt(i.toString(), 10)].replace('Ref', ''), compProp.elementRef.nativeElement);
                }
            }
        }
        complexTemplates = Object.keys(tempOnThis);
        complexTemplates = complexTemplates.filter(function (val) {
            return /Ref$/i.test(val) && /_/i.test(val);
        });
        for (var _b = 0, complexTemplates_1 = complexTemplates; _b < complexTemplates_1.length; _b++) {
            var tempName = complexTemplates_1[_b];
            var propName = tempName.replace('Ref', '');
            var val = {};
            setValue$1(propName.replace('_', '.'), getValue(propName, tempOnThis), val);
            tempOnThis.setProperties(val, true);
        }
    };
    ComponentBase.prototype.getAngularAttr = function (ele) {
        var attributes = ele.attributes;
        var length = attributes.length;
        var ngAr;
        for (var i = 0; i < length; i++) {
            /* istanbul ignore next */
            if (/_ngcontent/g.test(attributes[parseInt(i.toString(), 10)].name)) {
                ngAr = attributes[parseInt(i.toString(), 10)].name;
            }
        }
        return ngAr;
    };
    ComponentBase.prototype.ngAfterViewInit = function (isTempRef) {
        var tempAfterViewThis = isTempRef || this;
        var regExp = /ejs-tab|ejs-accordion/g;
        /* istanbul ignore next */
        if (regExp.test(tempAfterViewThis.ngEle.nativeElement.outerHTML)) {
            tempAfterViewThis.ngEle.nativeElement.style.visibility = 'hidden';
        }
        /**
         * Root level template properties are not getting rendered,
         * Due to ngonchanges not get triggered.
         * so that we have set template value for root level template properties,
         * for example: refer below syntax
         * ```html
         * <ejs-grid>
         * <e-column></e-column>
         * <ng-template #editSettingsTemplate></ng-template>
         * </ejs-grid>
         * ```
         */
        var templateProperties = Object.keys(tempAfterViewThis);
        templateProperties = templateProperties.filter(function (val) {
            return /Ref$/i.test(val);
        });
        var ngtempRef = tempAfterViewThis.getModuleName() === 'DocumentEditor';
        for (var _i = 0, templateProperties_1 = templateProperties; _i < templateProperties_1.length; _i++) {
            var tempName = templateProperties_1[_i];
            var propName = tempName.replace('Ref', '');
            setValue$1(propName.replace('_', '.'), getValue(propName + 'Ref', tempAfterViewThis), tempAfterViewThis);
        }
        // Used setTimeout for template binding
        // Refer Link: https://github.com/angular/angular/issues/6005
        var appendToComponent = function (tempAfterViewThis) {
            /* istanbul ignore else  */
            if (typeof window !== 'undefined' && tempAfterViewThis.element) {
                tempAfterViewThis.appendTo(tempAfterViewThis.element);
                tempAfterViewThis.ngEle.nativeElement.style.visibility = '';
            }
        };
        if (!ngtempRef && !tempAfterViewThis.getModuleName().includes('btn')) {
            setTimeout(function () {
                appendToComponent(tempAfterViewThis);
            });
        }
        else {
            appendToComponent(tempAfterViewThis);
        }
    };
    ComponentBase.prototype.ngOnDestroy = function (isTempRef) {
        var tempOnDestroyThis = isTempRef || this;
        /* istanbul ignore else  */
        setTimeout(function () {
            if (typeof window !== 'undefined' && (tempOnDestroyThis.element.classList.contains('e-control'))) {
                if (tempOnDestroyThis.ngOnFocus !== undefined && tempOnDestroyThis.ngOnBlur !== undefined) {
                    var ele = tempOnDestroyThis.inputElement || tempOnDestroyThis.element;
                    ele.removeEventListener('focus', tempOnDestroyThis.ngOnFocusBound);
                    ele.removeEventListener('blur', tempOnDestroyThis.ngOnBlurBound);
                    tempOnDestroyThis.ngOnFocusBound = null;
                    tempOnDestroyThis.ngOnBlurBound = null;
                }
                tempOnDestroyThis.destroy();
                tempOnDestroyThis.clearTemplate(null);
                // removing bounded events and tagobjects from component after destroy
                setTimeout(function () {
                    for (var _i = 0, _a = Object.keys(tempOnDestroyThis); _i < _a.length; _i++) {
                        var key = _a[_i];
                        var value = tempOnDestroyThis["".concat(key)];
                        if (value && /object/.test(typeof value) && Object.keys(value).length !== 0) {
                            if (/properties|changedProperties|childChangedProperties|oldProperties|moduleLoader/.test(key)) {
                                for (var _b = 0, _c = Object.keys(tempOnDestroyThis["".concat(key)]); _b < _c.length; _b++) {
                                    var propKey = _c[_b];
                                    var propValue = value["".concat(propKey)];
                                    if (propValue && /object/.test(typeof propValue) && Object.keys(propValue).length !== 0 && (propValue.parent || propValue.parentObj)) {
                                        tempOnDestroyThis["".concat(key)]["".concat(propKey)] = null;
                                    }
                                }
                            }
                            else {
                                if (value.parent || value.parentObj) {
                                    tempOnDestroyThis["".concat(key)] = null;
                                }
                            }
                        }
                    }
                });
            }
        });
    };
    ComponentBase.prototype.clearTemplate = function (templateNames, index) {
        clearTemplate(this, templateNames, index);
    };
    ComponentBase.prototype.ngAfterContentChecked = function (isTempRef) {
        var tempAfterContentThis = isTempRef || this;
        for (var _i = 0, _a = tempAfterContentThis.tagObjects; _i < _a.length; _i++) {
            var tagObject = _a[_i];
            if (!isUndefined(tagObject.instance) &&
                (tagObject.instance.isInitChanges || tagObject.instance.hasChanges || tagObject.instance.hasNewChildren)) {
                var propObj = {};
                if (tagObject.instance.isInitChanges) {
                    // For angular 9 compatibility
                    // Not able to get complex directive properties reference ni Onint hook
                    // So we have constructed property here and used
                    var complexDirProps = void 0;
                    var list = getValue('instance.list', tagObject);
                    if (list && list.length) {
                        complexDirProps = list[0].directivePropList;
                    }
                    var skip = true;
                    if (tempAfterContentThis.getModuleName && tempAfterContentThis.getModuleName() === 'gantt') {
                        skip = false;
                    }
                    if (complexDirProps && skip && complexDirProps.indexOf(tagObject.instance.propertyName) === -1) {
                        var compDirPropList = Object.keys(tagObject.instance.list[0].propCollection);
                        for (var h = 0; h < tagObject.instance.list.length; h++) {
                            tagObject.instance.list["".concat(h)].propCollection[tagObject.instance.propertyName] = [];
                            var obj = {};
                            for (var k = 0; k < compDirPropList.length; k++) {
                                var complexPropName = compDirPropList[parseInt(k.toString(), 10)];
                                obj["".concat(complexPropName)] = tagObject.instance.list["".concat(h)].propCollection["".concat(complexPropName)];
                            }
                            var _loop_1 = function (i) {
                                var tag = tagObject.instance.list["".concat(h)].tags[parseInt(i.toString(), 10)];
                                var childObj = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), tagObject.instance.list["".concat(h)]);
                                if (childObj) {
                                    var innerchildObj = tagObject.instance.list["".concat(h)]['child' + tag.substring(0, 1).toUpperCase() + tag.substring(1)];
                                    // Update the inner child tag objects
                                    var updateChildTag_1 = function (innerchild) {
                                        var innerLevelTag = [];
                                        if (innerchild) {
                                            for (var j = 0; j < innerchild.list.length; j++) {
                                                var innerTag = innerchild.list[0].tags[0];
                                                if (innerTag) {
                                                    var innerchildTag = getValue('child' + innerTag.substring(0, 1).toUpperCase() + innerTag.substring(1), innerchild.list[parseInt(j.toString(), 10)]);
                                                    if (innerchildTag) {
                                                        innerchild.list[parseInt(j.toString(), 10)].tagObjects
                                                            .push({ instance: innerchildTag, name: innerTag });
                                                        innerLevelTag.push(innerchildTag);
                                                    }
                                                }
                                            }
                                        }
                                        // check for inner level tag
                                        if (innerLevelTag.length !== 0) {
                                            for (var l = 0; l < innerLevelTag.length; l++) {
                                                updateChildTag_1(innerLevelTag[parseInt(l.toString(), 10)]);
                                            }
                                        }
                                    };
                                    updateChildTag_1(innerchildObj);
                                    tagObject.instance.list["".concat(h)].tagObjects.push({ instance: childObj, name: tag });
                                }
                            };
                            for (var i = 0; i < tagObject.instance.list["".concat(h)].tags.length; i++) {
                                _loop_1(i);
                            }
                            tagObject.instance.list["".concat(h)].propCollection[tagObject.instance.propertyName].push(obj);
                        }
                    }
                    // End angular 9 compatibility
                    propObj[tagObject.name] = tagObject.instance.getProperties();
                    tempAfterContentThis.setProperties(propObj, tagObject.instance.isInitChanges);
                }
                else {
                    /* istanbul ignore next */
                    var hasDiffLength = false;
                    if ((tempAfterContentThis[tagObject.name].length !== tagObject.instance.list.length) || (/diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName()))) {
                        tempAfterContentThis[tagObject.name] = tagObject.instance.list;
                        hasDiffLength = true;
                    }
                    for (var _b = 0, _c = tagObject.instance.list; _b < _c.length; _b++) {
                        var list = _c[_b];
                        if (list.tags) {
                            for (var _d = 0, _e = list.tags; _d < _e.length; _d++) {
                                var tag = _e[_d];
                                var innerChild = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), list);
                                if (innerChild) {
                                    list.tagObjects.push({ instance: innerChild, name: tag });
                                }
                            }
                        }
                        var curIndex = tagObject.instance.list.indexOf(list);
                        var curChild = getValue(tagObject.name, tempAfterContentThis)["".concat(curIndex)];
                        var complexTemplates = Object.keys(curChild);
                        complexTemplates = complexTemplates.filter(function (val) {
                            return /Ref$/i.test(val);
                        });
                        if (curChild.properties && Object.keys(curChild.properties).length !== 0) {
                            for (var _f = 0, complexTemplates_2 = complexTemplates; _f < complexTemplates_2.length; _f++) {
                                var complexPropName = complexTemplates_2[_f];
                                complexPropName = complexPropName.replace(/Ref/, '');
                                curChild.properties["".concat(complexPropName)] = !curChild.properties["".concat(complexPropName)] ?
                                    curChild.propCollection["".concat(complexPropName)] : curChild.properties["".concat(complexPropName)];
                            }
                        }
                        if (!isUndefined(curChild) && !isUndefined(curChild.setProperties)) {
                            if (/diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName())) {
                                curChild.setProperties(list.getProperties(), true);
                            }
                            else {
                                curChild.setProperties(list.getProperties());
                            }
                        }
                        list.isUpdated = true;
                    }
                    if ((/grid/.test(tempAfterContentThis.getModuleName()) && hasDiffLength) || /chart/.test(tempAfterContentThis.getModuleName())) {
                        propObj[tagObject.name] = tagObject.instance.getProperties();
                        tempAfterContentThis.setProperties(propObj, tagObject.instance.isInitChanges);
                    }
                }
            }
        }
    };
    ComponentBase.prototype.registerEvents = function (eventList) {
        registerEvents(eventList, this);
    };
    ComponentBase.prototype.twoWaySetter = function (newVal, prop) {
        var oldVal = getValue(prop, this.properties);
        if (oldVal === newVal) {
            return;
        }
        this.saveChanges(prop, newVal, oldVal);
        setValue$1(prop, (isNullOrUndefined(newVal) ? null : newVal), this.properties);
        getValue(prop + 'Change', this).emit(newVal);
    };
    ComponentBase.prototype.addTwoWay = function (propList) {
        var _this = this;
        var _loop_2 = function (prop) {
            getValue(prop, this_1);
            Object.defineProperty(this_1, prop, {
                get: function () {
                    return getValue(prop, _this.properties);
                },
                set: function (newVal) { return _this.twoWaySetter(newVal, prop); }
            });
            setValue$1(prop + 'Change', new EventEmitter(), this_1);
        };
        var this_1 = this;
        for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
            var prop = propList_1[_i];
            _loop_2(prop);
        }
    };
    ComponentBase.prototype.addEventListener = function (eventName, handler) {
        var eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            if (!this.ngBoundedEvents["".concat(eventName)]) {
                this.ngBoundedEvents["".concat(eventName)] = new Map();
            }
            this.ngBoundedEvents["".concat(eventName)].set(handler, eventObj.subscribe(handler));
        }
    };
    ComponentBase.prototype.removeEventListener = function (eventName, handler) {
        var eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            this.ngBoundedEvents["".concat(eventName)].get(handler).unsubscribe();
        }
    };
    ComponentBase.prototype.trigger = function (eventName, eventArgs, success) {
        var eventObj = getValue(eventName, this);
        var prevDetection = this.isProtectedOnChange;
        this.isProtectedOnChange = false;
        if (eventArgs) {
            eventArgs.name = eventName;
        }
        if (!isUndefined(eventObj)) {
            eventObj.next(eventArgs);
        }
        var localEventObj = getValue('local' + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
        if (!isUndefined(localEventObj)) {
            localEventObj.call(this, eventArgs);
        }
        this.isProtectedOnChange = prevDetection;
        /* istanbul ignore else  */
        if (success) {
            this.preventChange = this.isPreventChange;
            success.call(this, eventArgs);
        }
        this.isPreventChange = false;
    };
    return ComponentBase;
}());

/**
 * Angular Form Base Module
 */
var FormBase = /** @__PURE__ @class */ (function () {
    function FormBase() {
    }
    FormBase.prototype.propagateChange = function (_) { return; };
    FormBase.prototype.propagateTouch = function () { return; };
    FormBase.prototype.localChange = function (e) {
        var value = (e.checked === undefined ? e.value : e.checked);
        this.objCheck = isObject(value);
        if (this.isUpdated === true) {
            this.angularValue = this.oldValue;
        }
        if (this.objCheck === true) {
            this.duplicateValue = JSON.stringify(value);
            this.duplicateAngularValue = JSON.stringify(this.angularValue);
            if (this.duplicateValue !== this.duplicateAngularValue && this.propagateChange !== undefined && value !== undefined) {
                // Update angular from our control
                this.propagateChange(value);
                this.angularValue = value;
            }
        }
        else {
            if (value !== this.angularValue && this.propagateChange !== undefined && value !== undefined) {
                // While reset form using reset() method ng-dirty not get updated, so while value is empty just update angularValue only
                if (value !== '' && value !== null) {
                    // Update angular from our control
                    this.propagateChange(value);
                    this.angularValue = value;
                }
                else {
                    var optionalValue = value;
                    this.propagateChange(optionalValue);
                    this.angularValue = value;
                }
            }
        }
        this.cdr.markForCheck();
    };
    FormBase.prototype.registerOnChange = function (registerFunction) {
        this.propagateChange = registerFunction;
    };
    FormBase.prototype.registerOnTouched = function (registerFunction) {
        this.propagateTouch = registerFunction;
    };
    FormBase.prototype.twoWaySetter = function (newVal, prop) {
        var oldVal = this.oldValue || getValue(prop, this.properties);
        var ele = this.inputElement || this.element;
        if (ele && oldVal === newVal && this.value === newVal &&
            (ele.value === undefined || ele.value === '')) {
            return;
        }
        this.saveChanges(prop, newVal, oldVal);
        setValue$1(prop, (isNullOrUndefined(newVal) ? null : newVal), this.properties);
        getValue(prop + 'Change', this).emit(newVal);
    };
    FormBase.prototype.ngAfterViewInit = function (isTempRef) {
        var tempFormAfterViewThis = isTempRef || this;
        // Used setTimeout for template binding
        // Refer Link: https://github.com/angular/angular/issues/6005
        // Removed setTimeout, Because we have called markForCheck() method in Angular Template Compiler
        /* istanbul ignore else */
        tempFormAfterViewThis.ngOnBlurBound = this.ngOnBlur.bind(this);
        tempFormAfterViewThis.ngOnFocusBound = this.ngOnFocus.bind(this);
        if (typeof window !== 'undefined') {
            if ((tempFormAfterViewThis.getModuleName()).includes('dropdowntree')) {
                setTimeout(function () {
                    tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
                });
            }
            else {
                tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
            }
            var ele = tempFormAfterViewThis.inputElement || tempFormAfterViewThis.element;
            ele.addEventListener('focus', tempFormAfterViewThis.ngOnFocusBound);
            ele.addEventListener('blur', tempFormAfterViewThis.ngOnBlurBound);
        }
        this.isFormInit = false;
    };
    FormBase.prototype.setDisabledState = function (disabled) {
        this.enabled = !disabled;
        this.disabled = disabled;
    };
    FormBase.prototype.writeValue = function (value) {
        var regExp = /ejs-radiobutton/g;
        //update control value from angular
        if (this.checked === undefined) {
            this.value = value;
        }
        else {
            // To resolve boolean type formControl value is not working for radio button control.
            /* istanbul ignore next */
            if (this.ngEle) {
                if (typeof value === 'boolean') {
                    if (regExp.test(this.ngEle.nativeElement.outerHTML)) {
                        this.checked = value === this.value;
                    }
                    else {
                        this.checked = value;
                    }
                }
                else {
                    this.checked = value === this.value;
                }
            }
        }
        this.angularValue = value;
        this.isUpdated = true;
        // When binding Html textbox value to syncfusion textbox, change event triggered dynamically.
        // To prevent change event, trigger change in component side based on `preventChange` value
        this.preventChange = this.isFormInit ? false : true;
        this.cdr.markForCheck();
        if (value === null) {
            return;
        }
    };
    FormBase.prototype.ngOnFocus = function (e) {
        /* istanbul ignore else */
        if (this.skipFromEvent !== true) {
            this.focus.emit(e);
        }
        this.cdr.markForCheck();
    };
    FormBase.prototype.ngOnBlur = function (e) {
        this.propagateTouch();
        /* istanbul ignore else */
        if (this.skipFromEvent !== true) {
            this.blur.emit(e);
        }
        this.cdr.markForCheck();
    };
    FormBase.isFormBase = true;
    return FormBase;
}());

var stringCompiler = getTemplateEngine();
/**
 * Angular Template Compiler
 *
 * @param {AngularElementType} templateEle - The element representing the template.
 * @param {Object} [helper] - Optional helper object.
 * @returns {Function} A function that compiles the template.
 */
function compile(templateEle, helper) {
    if (typeof templateEle === 'string' || (typeof templateEle === 'function' && templateEle.prototype && templateEle.prototype.CSPTemplate)) {
        return stringCompiler(templateEle, helper);
    }
    else {
        var contRef_1 = templateEle.elementRef.nativeElement._viewContainerRef;
        var pName_1 = templateEle.elementRef.nativeElement.propName;
        return function (data, component, propName) {
            var context = { $implicit: data };
            /* istanbul ignore next */
            var conRef = contRef_1 ? contRef_1 : component.viewContainerRef;
            var viewRef = conRef.createEmbeddedView(templateEle, context);
            if (/EJS-MENTION|EJS-DROPDOWNLIST/.test(getValue('currentInstance.element.nodeName', conRef)) ||
                (/E-TABITEM/.test(getValue('element.nativeElement.nodeName', conRef)) &&
                    getValue('currentInstance.headerTemplateRef', conRef))) {
                viewRef.detectChanges();
            }
            else {
                viewRef.markForCheck();
            }
            /* istanbul ignore next */
            var viewCollection = (component && component.registeredTemplate) ?
                component.registeredTemplate : getValue('currentInstance.registeredTemplate', conRef);
            propName = (propName && component.registeredTemplate) ? propName : pName_1;
            if (typeof viewCollection["".concat(propName)] === 'undefined') {
                viewCollection["".concat(propName)] = [];
            }
            viewCollection["".concat(propName)].push(viewRef);
            return viewRef.rootNodes;
        };
    }
}
/**
 * Property decorator for angular.
 *
 * @param {Object} [defaultValue] - Default value for the property.
 * @returns {PropertyDecorator} The decorator function.
 */
function Template(defaultValue) {
    return function (target, key) {
        var propertyDescriptor = {
            set: setter(key),
            get: getter(key, defaultValue),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
    };
}
/**
 * Creates a setter function for a given property key.
 *
 * @param {string} key - The property key.
 * @returns {Function} The setter function.
 */
function setter(key) {
    return function (val) {
        if (val === undefined) {
            return;
        }
        setValue$1(key + 'Ref', val, this);
        if (typeof val !== 'string') {
            val.elementRef.nativeElement._viewContainerRef = this.viewContainerRef;
            val.elementRef.nativeElement.propName = key;
        }
        else {
            if (this.saveChanges) {
                this.saveChanges(key, val, undefined);
                this.dataBind();
            }
        }
    };
}
/**
 * Returns a getter function for the specified key and default value.
 *
 * @param {string} key - The key for the property.
 * @param {Object} defaultValue - The default value for the property.
 * @returns {Function} The getter function.
 */
function getter(key, defaultValue) {
    return function () {
        /* istanbul ignore next */
        return getValue(key + 'Ref', this) || defaultValue;
    };
}
setTemplateEngine({ compile: compile });

export { ArrayBase, ComplexBase, ComponentBase, ComponentMixins, FormBase, Template, applyMixins, clearTemplate, compile, registerEvents, setValue };
//# sourceMappingURL=ej2-angular-base.es5.js.map
