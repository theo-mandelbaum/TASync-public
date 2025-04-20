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
    baseClass.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
            if (!Object.prototype.hasOwnProperty.call(derivedClass.prototype, name) || (baseClass.isFormBase && name !== 'constructor')) {
                derivedClass.prototype[`${name}`] = baseClass.prototype[`${name}`];
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
    const ngEventsEmitter = {};
    if (eventList && eventList.length) {
        for (const event of eventList) {
            if (direct === true) {
                obj.propCollection[`${event}`] = new EventEmitter(false);
                obj[`${event}`] = obj.propCollection[`${event}`];
            }
            else {
                ngEventsEmitter[`${event}`] = new EventEmitter(false);
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
    const regTemplates = Object.keys(_this.registeredTemplate);
    if (regTemplates.length) {
        /* istanbul ignore next */
        const regProperties = templateNames && templateNames.filter((val) => {
            return (/\./g.test(val) ? false : true);
        });
        const tabaccordionTemp = /tab|accordion|toolbar/.test((_a = _this.getModuleName) === null || _a === void 0 ? void 0 : _a.call(_this));
        for (const registeredTemplate of (regProperties && regProperties || regTemplates)) {
            /* istanbul ignore next */
            if (index && index.length) {
                for (let e = 0; e < index.length; e++) {
                    if (tabaccordionTemp) {
                        for (let m = 0; m < _this.registeredTemplate[`${registeredTemplate}`].length; m++) {
                            const value = _this.registeredTemplate[`${registeredTemplate}`][parseInt(m.toString(), 10)];
                            if (value && value === index[`${e}`]) {
                                value.destroy();
                                _this.registeredTemplate[`${registeredTemplate}`].splice(m, 1);
                            }
                        }
                    }
                    else {
                        for (let m = 0; m < _this.registeredTemplate.template.length; m++) {
                            const value = _this.registeredTemplate.template[parseInt(m.toString(), 10)].rootNodes[0];
                            if (value === index[`${e}`]) {
                                const rt = _this.registeredTemplate[`${registeredTemplate}`];
                                rt[parseInt(m.toString(), 10)].destroy();
                            }
                        }
                    }
                }
            }
            else {
                if (_this.registeredTemplate[`${registeredTemplate}`]) {
                    for (const rt of _this.registeredTemplate[`${registeredTemplate}`]) {
                        if (!rt.destroyed) {
                            if (rt._view) {
                                const pNode = rt._view.renderer.parentNode(rt.rootNodes[0]);
                                if (!isNullOrUndefined(pNode)) {
                                    for (let m = 0; m < rt.rootNodes.length; m++) {
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
                delete _this.registeredTemplate[`${registeredTemplate}`];
            }
        }
    }
    for (const tagObject of _this.tagObjects) {
        if (tagObject.instance) {
            /* istanbul ignore next */
            tagObject.instance.clearTemplate((templateNames && templateNames.filter((val) => {
                const regExp = RegExp;
                return (new regExp(tagObject.name).test(val) ? true : false);
            })));
        }
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
    const keys = nameSpace.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    /* istanbul ignore next */
    let fromObj = object || {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[parseInt(i.toString(), 10)];
        if (i + 1 === keys.length) {
            fromObj[`${key}`] = value === undefined ? {} : value;
        }
        else if (fromObj[`${key}`] === undefined) {
            fromObj[`${key}`] = {};
        }
        fromObj = fromObj[`${key}`];
    }
    return fromObj;
}

const refRegex = /Ref$/;
class ComplexBase {
    constructor() {
        this.hasChanges = false;
        this.propCollection = {};
        this.dataSource = {};
        this.tags = [];
        this.tagObjects = [];
    }
    ngOnInit() {
        this.registeredTemplate = {};
        for (const tag of this.tags) {
            const objInstance = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
            if (objInstance) {
                this.tagObjects.push({ instance: objInstance, name: tag });
            }
        }
        let templateProperties = Object.keys(this);
        for (let i = 0; i < templateProperties.length; i++) {
            const tempProp = getValue(templateProperties[parseInt(i.toString(), 10)], this);
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
        templateProperties = templateProperties.filter((val) => {
            return /Ref$/i.test(val);
        });
        for (const tempName of templateProperties) {
            const propName = tempName.replace('Ref', '');
            setValue$1(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
        }
        // Angular 9 compatibility to overcome ngOnchange not get triggered issue
        // To Update properties to "this.propCollection"
        const propList = Object.keys(this);
        /* istanbul ignore next */
        if (this.directivePropList) {
            for (let k = 0; k < this.directivePropList.length; k++) {
                const dirPropName = this.directivePropList[parseInt(k.toString(), 10)];
                if (propList.indexOf(dirPropName) !== -1 && (getValue(dirPropName, this) === false || getValue(dirPropName, this))) {
                    setValue$1(dirPropName, getValue(dirPropName, this), this.propCollection);
                }
            }
            this.hasChanges = true;
        }
        this.isInitChanges = true;
    }
    registerEvents(eventList) {
        registerEvents(eventList, this, true);
    }
    ngOnChanges(changes) {
        for (const propName of Object.keys(changes)) {
            const changedVal = changes[`${propName}`];
            this.propCollection[`${propName}`] = changedVal.currentValue;
        }
        this.isUpdated = false;
        this.hasChanges = true;
    }
    /* istanbul ignore next */
    clearTemplate(templateNames) {
        clearTemplate(this, templateNames);
    }
    getProperties() {
        /* istanbul ignore next */
        for (const tagObject of this.tagObjects) {
            this.propCollection[tagObject.name] = tagObject.instance.getProperties();
        }
        return this.propCollection;
    }
    isChanged() {
        let result = this.hasChanges;
        if (!isNullOrUndefined(this.propCollection[this.property])) {
            const tempProps = this.propCollection[this.property];
            const props = Object.keys(tempProps[0]);
            for (let d = 0; d < props.length; d++) {
                if (!isNullOrUndefined(this.propCollection[props[parseInt(d.toString(), 10)]])) {
                    const val = getValue(props[parseInt(d.toString(), 10)], this);
                    const propVal = this.propCollection[this.property][0][props[parseInt(d.toString(), 10)]];
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
        for (const item of this.tagObjects) {
            result = result || item.instance.hasChanges;
        }
        return result || this.hasChanges;
    }
    ngAfterContentChecked() {
        this.hasChanges = this.isChanged();
        if (this.isInitChanges || this.hasChanges) {
            let templateProperties = Object.keys(this);
            templateProperties = templateProperties.filter((val) => {
                return refRegex.test(val);
            });
            for (const tempName of templateProperties) {
                const propName = tempName.replace('Ref', '');
                setValue$1(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
            }
        }
    }
    ngAfterViewChecked() {
        /* istanbul ignore next */
        if (this.isUpdated) {
            this.hasChanges = false;
        }
    }
    ngAfterViewInit() {
        /* istanbul ignore next */
        this.isInitChanges = false;
    }
    ngOnDestroy() {
        /* istanbul ignore next */
        this.directivePropList = [];
    }
}
class ArrayBase {
    constructor(propertyName) {
        this.list = [];
        this.hasChanges = false;
        this.propertyName = propertyName;
    }
    ngOnInit() {
        this.isInitChanges = true;
    }
    ngAfterContentInit() {
        let index = 0;
        /* istanbul ignore next */
        this.list = this.children.map((child) => {
            child.dirIndex = index++;
            child.property = this.propertyName;
            return child;
        });
        this.hasChanges = true;
    }
    getProperties() {
        const onlyProp = [];
        for (const item of this.list) {
            onlyProp.push(item.getProperties());
        }
        return onlyProp;
    }
    isChanged() {
        let result = false;
        let index = 0;
        let isSourceChanged = false;
        const childrenDataSource = this.children.map((child) => {
            return child;
        });
        /* istanbul ignore next */
        if (this.list.length === this.children.length) {
            for (let i = 0; i < this.list.length; i++) {
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
            this.list = this.children.map((child) => {
                child.dirIndex = index++;
                child.property = this.propertyName;
                return child;
            });
        }
        /* istanbul ignore end */
        for (const item of this.list) {
            result = result || item.hasChanges;
        }
        return !!this.list.length && result;
    }
    clearTemplate(templateNames) {
        /* istanbul ignore next */
        for (const item of this.list) {
            item.clearTemplate(templateNames && templateNames.map((val) => {
                const regExp = RegExp;
                return new regExp(this.propertyName).test(val) ? val.replace(this.propertyName + '.', '') : val;
            }));
        }
    }
    ngAfterContentChecked() {
        this.hasChanges = this.isChanged();
        for (let i = 0; i < this.list.length; i++) {
            if (getValue('childColumns', this.list[parseInt(i.toString(), 10)]) && getValue('property', this.list[parseInt(i.toString(), 10)]) === 'columns') {
                setValue$1('columns', getValue('childColumns', this.list[parseInt(i.toString(), 10)]).getProperties(), this.list[parseInt(i.toString(), 10)].propCollection);
            }
            this.list[parseInt(i.toString(), 10)].isUpdated = true;
        }
    }
    ngAfterViewInit() {
        this.isInitChanges = false;
    }
    ngOnDestroy() {
        this.list = [];
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
class ComponentBase {
    constructor() {
        this.isProtectedOnChange = true;
        this.isFormInit = true;
    }
    saveChanges(key, newValue, oldValue) {
        if (this.isProtectedOnChange) {
            return;
        }
        this.oldProperties[`${key}`] = oldValue;
        this.changedProperties[`${key}`] = newValue;
        this.finalUpdate();
        const changeTime = setTimeout(this.dataBind.bind(this));
        const clearUpdate = () => {
            clearTimeout(changeTime);
        };
        this.finalUpdate = clearUpdate;
    }
    ngOnInit(isTempRef) {
        const tempOnThis = isTempRef || this;
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
        tempOnThis.createElement = (tagName, prop) => {
            const ele = tempOnThis.srenderer ? tempOnThis.srenderer.createElement(tagName) : createElement(tagName);
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
        for (const tag of tempOnThis.tags) {
            const tagObject = {
                instance: getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), tempOnThis),
                name: tag
            };
            tempOnThis.tagObjects.push(tagObject);
        }
        let complexTemplates = Object.keys(tempOnThis);
        for (let i = 0; i < complexTemplates.length; i++) {
            const compProp = getValue(complexTemplates[parseInt(i.toString(), 10)], tempOnThis);
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
        complexTemplates = complexTemplates.filter((val) => {
            return /Ref$/i.test(val) && /_/i.test(val);
        });
        for (const tempName of complexTemplates) {
            const propName = tempName.replace('Ref', '');
            const val = {};
            setValue$1(propName.replace('_', '.'), getValue(propName, tempOnThis), val);
            tempOnThis.setProperties(val, true);
        }
    }
    getAngularAttr(ele) {
        const attributes = ele.attributes;
        const length = attributes.length;
        let ngAr;
        for (let i = 0; i < length; i++) {
            /* istanbul ignore next */
            if (/_ngcontent/g.test(attributes[parseInt(i.toString(), 10)].name)) {
                ngAr = attributes[parseInt(i.toString(), 10)].name;
            }
        }
        return ngAr;
    }
    ngAfterViewInit(isTempRef) {
        const tempAfterViewThis = isTempRef || this;
        const regExp = /ejs-tab|ejs-accordion/g;
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
        let templateProperties = Object.keys(tempAfterViewThis);
        templateProperties = templateProperties.filter((val) => {
            return /Ref$/i.test(val);
        });
        const ngtempRef = tempAfterViewThis.getModuleName() === 'DocumentEditor';
        for (const tempName of templateProperties) {
            const propName = tempName.replace('Ref', '');
            setValue$1(propName.replace('_', '.'), getValue(propName + 'Ref', tempAfterViewThis), tempAfterViewThis);
        }
        // Used setTimeout for template binding
        // Refer Link: https://github.com/angular/angular/issues/6005
        const appendToComponent = (tempAfterViewThis) => {
            /* istanbul ignore else  */
            if (typeof window !== 'undefined' && tempAfterViewThis.element) {
                tempAfterViewThis.appendTo(tempAfterViewThis.element);
                tempAfterViewThis.ngEle.nativeElement.style.visibility = '';
            }
        };
        if (!ngtempRef && !tempAfterViewThis.getModuleName().includes('btn')) {
            setTimeout(() => {
                appendToComponent(tempAfterViewThis);
            });
        }
        else {
            appendToComponent(tempAfterViewThis);
        }
    }
    ngOnDestroy(isTempRef) {
        const tempOnDestroyThis = isTempRef || this;
        /* istanbul ignore else  */
        setTimeout(() => {
            if (typeof window !== 'undefined' && (tempOnDestroyThis.element.classList.contains('e-control'))) {
                if (tempOnDestroyThis.ngOnFocus !== undefined && tempOnDestroyThis.ngOnBlur !== undefined) {
                    const ele = tempOnDestroyThis.inputElement || tempOnDestroyThis.element;
                    ele.removeEventListener('focus', tempOnDestroyThis.ngOnFocusBound);
                    ele.removeEventListener('blur', tempOnDestroyThis.ngOnBlurBound);
                    tempOnDestroyThis.ngOnFocusBound = null;
                    tempOnDestroyThis.ngOnBlurBound = null;
                }
                tempOnDestroyThis.destroy();
                tempOnDestroyThis.clearTemplate(null);
                // removing bounded events and tagobjects from component after destroy
                setTimeout(function () {
                    for (const key of Object.keys(tempOnDestroyThis)) {
                        const value = tempOnDestroyThis[`${key}`];
                        if (value && /object/.test(typeof value) && Object.keys(value).length !== 0) {
                            if (/properties|changedProperties|childChangedProperties|oldProperties|moduleLoader/.test(key)) {
                                for (const propKey of Object.keys(tempOnDestroyThis[`${key}`])) {
                                    const propValue = value[`${propKey}`];
                                    if (propValue && /object/.test(typeof propValue) && Object.keys(propValue).length !== 0 && (propValue.parent || propValue.parentObj)) {
                                        tempOnDestroyThis[`${key}`][`${propKey}`] = null;
                                    }
                                }
                            }
                            else {
                                if (value.parent || value.parentObj) {
                                    tempOnDestroyThis[`${key}`] = null;
                                }
                            }
                        }
                    }
                });
            }
        });
    }
    clearTemplate(templateNames, index) {
        clearTemplate(this, templateNames, index);
    }
    ngAfterContentChecked(isTempRef) {
        const tempAfterContentThis = isTempRef || this;
        for (const tagObject of tempAfterContentThis.tagObjects) {
            if (!isUndefined(tagObject.instance) &&
                (tagObject.instance.isInitChanges || tagObject.instance.hasChanges || tagObject.instance.hasNewChildren)) {
                const propObj = {};
                if (tagObject.instance.isInitChanges) {
                    // For angular 9 compatibility
                    // Not able to get complex directive properties reference ni Onint hook
                    // So we have constructed property here and used
                    let complexDirProps;
                    const list = getValue('instance.list', tagObject);
                    if (list && list.length) {
                        complexDirProps = list[0].directivePropList;
                    }
                    let skip = true;
                    if (tempAfterContentThis.getModuleName && tempAfterContentThis.getModuleName() === 'gantt') {
                        skip = false;
                    }
                    if (complexDirProps && skip && complexDirProps.indexOf(tagObject.instance.propertyName) === -1) {
                        const compDirPropList = Object.keys(tagObject.instance.list[0].propCollection);
                        for (let h = 0; h < tagObject.instance.list.length; h++) {
                            tagObject.instance.list[`${h}`].propCollection[tagObject.instance.propertyName] = [];
                            const obj = {};
                            for (let k = 0; k < compDirPropList.length; k++) {
                                const complexPropName = compDirPropList[parseInt(k.toString(), 10)];
                                obj[`${complexPropName}`] = tagObject.instance.list[`${h}`].propCollection[`${complexPropName}`];
                            }
                            for (let i = 0; i < tagObject.instance.list[`${h}`].tags.length; i++) {
                                const tag = tagObject.instance.list[`${h}`].tags[parseInt(i.toString(), 10)];
                                const childObj = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), tagObject.instance.list[`${h}`]);
                                if (childObj) {
                                    const innerchildObj = tagObject.instance.list[`${h}`]['child' + tag.substring(0, 1).toUpperCase() + tag.substring(1)];
                                    // Update the inner child tag objects
                                    const updateChildTag = (innerchild) => {
                                        const innerLevelTag = [];
                                        if (innerchild) {
                                            for (let j = 0; j < innerchild.list.length; j++) {
                                                const innerTag = innerchild.list[0].tags[0];
                                                if (innerTag) {
                                                    const innerchildTag = getValue('child' + innerTag.substring(0, 1).toUpperCase() + innerTag.substring(1), innerchild.list[parseInt(j.toString(), 10)]);
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
                                            for (let l = 0; l < innerLevelTag.length; l++) {
                                                updateChildTag(innerLevelTag[parseInt(l.toString(), 10)]);
                                            }
                                        }
                                    };
                                    updateChildTag(innerchildObj);
                                    tagObject.instance.list[`${h}`].tagObjects.push({ instance: childObj, name: tag });
                                }
                            }
                            tagObject.instance.list[`${h}`].propCollection[tagObject.instance.propertyName].push(obj);
                        }
                    }
                    // End angular 9 compatibility
                    propObj[tagObject.name] = tagObject.instance.getProperties();
                    tempAfterContentThis.setProperties(propObj, tagObject.instance.isInitChanges);
                }
                else {
                    /* istanbul ignore next */
                    let hasDiffLength = false;
                    if ((tempAfterContentThis[tagObject.name].length !== tagObject.instance.list.length) || (/diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName()))) {
                        tempAfterContentThis[tagObject.name] = tagObject.instance.list;
                        hasDiffLength = true;
                    }
                    for (const list of tagObject.instance.list) {
                        if (list.tags) {
                            for (const tag of list.tags) {
                                const innerChild = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), list);
                                if (innerChild) {
                                    list.tagObjects.push({ instance: innerChild, name: tag });
                                }
                            }
                        }
                        const curIndex = tagObject.instance.list.indexOf(list);
                        const curChild = getValue(tagObject.name, tempAfterContentThis)[`${curIndex}`];
                        let complexTemplates = Object.keys(curChild);
                        complexTemplates = complexTemplates.filter((val) => {
                            return /Ref$/i.test(val);
                        });
                        if (curChild.properties && Object.keys(curChild.properties).length !== 0) {
                            for (let complexPropName of complexTemplates) {
                                complexPropName = complexPropName.replace(/Ref/, '');
                                curChild.properties[`${complexPropName}`] = !curChild.properties[`${complexPropName}`] ?
                                    curChild.propCollection[`${complexPropName}`] : curChild.properties[`${complexPropName}`];
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
    }
    registerEvents(eventList) {
        registerEvents(eventList, this);
    }
    twoWaySetter(newVal, prop) {
        const oldVal = getValue(prop, this.properties);
        if (oldVal === newVal) {
            return;
        }
        this.saveChanges(prop, newVal, oldVal);
        setValue$1(prop, (isNullOrUndefined(newVal) ? null : newVal), this.properties);
        getValue(prop + 'Change', this).emit(newVal);
    }
    addTwoWay(propList) {
        for (const prop of propList) {
            getValue(prop, this);
            Object.defineProperty(this, prop, {
                get: () => {
                    return getValue(prop, this.properties);
                },
                set: (newVal) => this.twoWaySetter(newVal, prop)
            });
            setValue$1(prop + 'Change', new EventEmitter(), this);
        }
    }
    addEventListener(eventName, handler) {
        const eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            if (!this.ngBoundedEvents[`${eventName}`]) {
                this.ngBoundedEvents[`${eventName}`] = new Map();
            }
            this.ngBoundedEvents[`${eventName}`].set(handler, eventObj.subscribe(handler));
        }
    }
    removeEventListener(eventName, handler) {
        const eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            this.ngBoundedEvents[`${eventName}`].get(handler).unsubscribe();
        }
    }
    trigger(eventName, eventArgs, success) {
        const eventObj = getValue(eventName, this);
        const prevDetection = this.isProtectedOnChange;
        this.isProtectedOnChange = false;
        if (eventArgs) {
            eventArgs.name = eventName;
        }
        if (!isUndefined(eventObj)) {
            eventObj.next(eventArgs);
        }
        const localEventObj = getValue('local' + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
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
    }
}

/**
 * Angular Form Base Module
 */
class FormBase {
    propagateChange(_) { return; }
    propagateTouch() { return; }
    localChange(e) {
        const value = (e.checked === undefined ? e.value : e.checked);
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
                    const optionalValue = value;
                    this.propagateChange(optionalValue);
                    this.angularValue = value;
                }
            }
        }
        this.cdr.markForCheck();
    }
    registerOnChange(registerFunction) {
        this.propagateChange = registerFunction;
    }
    registerOnTouched(registerFunction) {
        this.propagateTouch = registerFunction;
    }
    twoWaySetter(newVal, prop) {
        const oldVal = this.oldValue || getValue(prop, this.properties);
        const ele = this.inputElement || this.element;
        if (ele && oldVal === newVal && this.value === newVal &&
            (ele.value === undefined || ele.value === '')) {
            return;
        }
        this.saveChanges(prop, newVal, oldVal);
        setValue$1(prop, (isNullOrUndefined(newVal) ? null : newVal), this.properties);
        getValue(prop + 'Change', this).emit(newVal);
    }
    ngAfterViewInit(isTempRef) {
        const tempFormAfterViewThis = isTempRef || this;
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
            const ele = tempFormAfterViewThis.inputElement || tempFormAfterViewThis.element;
            ele.addEventListener('focus', tempFormAfterViewThis.ngOnFocusBound);
            ele.addEventListener('blur', tempFormAfterViewThis.ngOnBlurBound);
        }
        this.isFormInit = false;
    }
    setDisabledState(disabled) {
        this.enabled = !disabled;
        this.disabled = disabled;
    }
    writeValue(value) {
        const regExp = /ejs-radiobutton/g;
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
    }
    ngOnFocus(e) {
        /* istanbul ignore else */
        if (this.skipFromEvent !== true) {
            this.focus.emit(e);
        }
        this.cdr.markForCheck();
    }
    ngOnBlur(e) {
        this.propagateTouch();
        /* istanbul ignore else */
        if (this.skipFromEvent !== true) {
            this.blur.emit(e);
        }
        this.cdr.markForCheck();
    }
}
FormBase.isFormBase = true;

const stringCompiler = getTemplateEngine();
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
        const contRef = templateEle.elementRef.nativeElement._viewContainerRef;
        const pName = templateEle.elementRef.nativeElement.propName;
        return (data, component, propName) => {
            const context = { $implicit: data };
            /* istanbul ignore next */
            const conRef = contRef ? contRef : component.viewContainerRef;
            const viewRef = conRef.createEmbeddedView(templateEle, context);
            if (/EJS-MENTION|EJS-DROPDOWNLIST/.test(getValue('currentInstance.element.nodeName', conRef)) ||
                (/E-TABITEM/.test(getValue('element.nativeElement.nodeName', conRef)) &&
                    getValue('currentInstance.headerTemplateRef', conRef))) {
                viewRef.detectChanges();
            }
            else {
                viewRef.markForCheck();
            }
            /* istanbul ignore next */
            const viewCollection = (component && component.registeredTemplate) ?
                component.registeredTemplate : getValue('currentInstance.registeredTemplate', conRef);
            propName = (propName && component.registeredTemplate) ? propName : pName;
            if (typeof viewCollection[`${propName}`] === 'undefined') {
                viewCollection[`${propName}`] = [];
            }
            viewCollection[`${propName}`].push(viewRef);
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
    return (target, key) => {
        const propertyDescriptor = {
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
//# sourceMappingURL=ej2-angular-base.es2015.js.map
