import { Component, Children, PureComponent, createElement } from 'react';
import { createPortal } from 'react-dom';
import { extend, isNullOrUndefined, setValue, getValue, isObject, onIntlChange, getTemplateEngine, setTemplateEngine } from '@syncfusion/ej2-base';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
const defaulthtmlkeys = ['alt', 'className', 'disabled', 'form', 'id',
    'readOnly', 'style', 'tabIndex', 'title', 'type', 'name',
    'onClick', 'onFocus', 'onBlur'];
const delayUpdate = ['accordion', 'tab', 'splitter'];
const isColEName = /\]/;
class ComponentBase extends Component {
    constructor() {
        super(...arguments);
        this.mountingState = false;
        this.attrKeys = [];
        this.cachedTimeOut = 0;
        this.isAppendCalled = false;
        this.initRenderCalled = false;
        this.isReactForeceUpdate = false;
        this.isReact = true;
        this.isshouldComponentUpdateCalled = false;
        this.isCreated = false;
    }
    // Lifecycle methods are changed by React team and so we can deprecate this method and use
    // Reference link:https://reactjs.org/docs/react-component.html#unsafe_componentWillMount
    componentDidMount() {
        this.refreshChild(true);
        this.canDelayUpdate = delayUpdate.indexOf(this.getModuleName()) !== -1;
        // Used timeout to resolve template binding
        // Reference link: https://github.com/facebook/react/issues/10309#issuecomment-318433235
        this.renderReactComponent();
        if (this.portals && this.portals.length) {
            this.mountingState = true;
            this.renderReactTemplates();
            this.mountingState = false;
        }
    }
    componentDidUpdate(prev) {
        if (!this.isshouldComponentUpdateCalled && this.initRenderCalled && !this.isReactForeceUpdate) {
            if (prev !== this.props) {
                this.isshouldComponentUpdateCalled = true;
                this.updateProperties(this.props, false, prev);
            }
        }
    }
    renderReactComponent() {
        const ele = this.reactElement;
        if (ele && !this.isAppendCalled) {
            this.isAppendCalled = true;
            this.appendTo(ele);
        }
    }
    // Lifecycle methods are changed by React team and so we can deprecate this method and use
    // Reference link:https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
    /**
     * @param {Object} nextProps - Specifies the property value.
     * @returns {boolean} - Returns boolean value.
     * @private
     */
    shouldComponentUpdate(nextProps) {
        this.isshouldComponentUpdateCalled = true;
        if (!this.initRenderCalled) {
            this.updateProperties(nextProps, true);
            return true;
        }
        if (!this.isAppendCalled) {
            clearTimeout(this.cachedTimeOut);
            this.isAppendCalled = true;
            this.appendTo(this.reactElement);
        }
        this.updateProperties(nextProps);
        return true;
    }
    updateProperties(nextProps, silent, prev) {
        const dProps = extend({}, nextProps);
        const keys = Object.keys(nextProps);
        const prevProps = extend({}, prev || this.props);
        // The statelessTemplates props value is taken from sample level property or default component property.
        const statelessTemplates = !isNullOrUndefined(prevProps['statelessTemplates']) ? prevProps['statelessTemplates'] :
            (!isNullOrUndefined(this['statelessTemplateProps']) ? this['statelessTemplateProps'] : []);
        for (const propkey of keys) {
            const isClassName = propkey === 'className';
            if (propkey === 'children') {
                continue;
            }
            if (!isClassName && !isNullOrUndefined(this.htmlattributes[`${propkey}`]) &&
                this.htmlattributes[`${propkey}`] !== dProps[`${propkey}`]) {
                this.htmlattributes[`${propkey}`] = dProps[`${propkey}`];
            }
            if (this.compareValues(prevProps[`${propkey}`], nextProps[`${propkey}`])) {
                delete dProps[`${propkey}`];
            }
            else if (this.attrKeys.indexOf(propkey) !== -1) {
                if (isClassName) {
                    this.clsName = true;
                    const propsClsName = prevProps[`${propkey}`].split(' ');
                    for (let i = 0; i < propsClsName.length; i++) {
                        this.element.classList.remove(propsClsName[parseInt(i.toString(), 10)]);
                    }
                    const dpropsClsName = dProps[`${propkey}`].split(' ');
                    for (let j = 0; j < dpropsClsName.length; j++) {
                        this.element.classList.add(dpropsClsName[parseInt(j.toString(), 10)]);
                    }
                }
                else if (propkey !== 'disabled' && !Object.prototype.hasOwnProperty.call(this.properties, propkey)) {
                    delete dProps[`${propkey}`];
                }
            }
            else if (propkey === 'value' && nextProps[`${propkey}`] === this[`${propkey}`]) {
                delete dProps[`${propkey}`];
            }
            else if (statelessTemplates.indexOf(propkey) > -1 && ((propkey === 'content' && typeof dProps[`${propkey}`] === 'function') || (nextProps[`${propkey}`].toString() === this[`${propkey}`].toString()))) {
                delete dProps[`${propkey}`];
            }
        }
        if (dProps['children']) {
            delete dProps['children'];
        }
        if (this.initRenderCalled && (this.canDelayUpdate || prevProps.delayUpdate)) {
            setTimeout(() => {
                this.refreshProperties(dProps, nextProps, silent);
            });
        }
        else {
            this.refreshProperties(dProps, nextProps, silent);
        }
    }
    refreshProperties(dProps, nextProps, silent) {
        const statelessTemplates = !isNullOrUndefined(this.props['statelessTemplates']) ? this.props['statelessTemplates'] : [];
        if (Object.keys(dProps).length) {
            if (!silent) {
                this.processComplexTemplate(dProps, this);
            }
            this.setProperties(dProps, silent);
        }
        if (statelessTemplates.indexOf('directiveTemplates') === -1) {
            this.refreshChild(silent, nextProps);
        }
    }
    processComplexTemplate(curObject, context) {
        const compTemplate = context.complexTemplate;
        if (compTemplate) {
            for (const prop in compTemplate) {
                if (Object.prototype.hasOwnProperty.call(compTemplate, prop)) {
                    const PropVal = compTemplate[`${prop}`];
                    if (curObject[`${prop}`]) {
                        setValue(PropVal, getValue(prop, curObject), curObject);
                    }
                }
            }
        }
    }
    getDefaultAttributes() {
        this.isReact = true;
        const propKeys = Object.keys(this.props);
        //let stringValue: string[] = ['autocomplete', 'dropdownlist', 'combobox'];
        const ignoreProps = ['children', 'statelessTemplates', 'immediateRender', 'isLegacyTemplate', 'delayUpdate'];
        // if ((stringValue.indexOf(this.getModuleName()) !== -1) && (!isNullOrUndefined(this.props["value"]))) {
        //     this.value = (<{ [key: string]: Object }>this.props)["value"];
        // }
        if (!this.htmlattributes) {
            this.htmlattributes = {};
        }
        this.attrKeys = defaulthtmlkeys.concat(this.controlAttributes || []);
        for (const prop of propKeys) {
            if (prop.indexOf('data-') !== -1 || prop.indexOf('aria-') !== -1 || this.attrKeys.indexOf(prop) !== -1 || (Object.keys(this.properties).indexOf(`${prop}`) === -1 && ignoreProps.indexOf(`${prop}`) === -1)) {
                if (this.htmlattributes[`${prop}`] !== this.props[`${prop}`]) {
                    this.htmlattributes[`${prop}`] = this.props[`${prop}`];
                }
            }
        }
        if (!this.htmlattributes.ref) {
            this.htmlattributes.ref = (ele) => {
                this.reactElement = ele;
            };
            const keycompoentns = ['autocomplete', 'combobox', 'dropdownlist', 'dropdowntree', 'multiselect',
                'listbox', 'colorpicker', 'numerictextbox', 'textbox', 'smarttextarea',
                'uploader', 'maskedtextbox', 'slider', 'datepicker', 'datetimepicker', 'daterangepicker', 'timepicker', 'checkbox', 'switch', 'radio', 'rating', 'textarea', 'multicolumncombobox'];
            if (keycompoentns.indexOf(this.getModuleName()) !== -1) {
                this.htmlattributes.key = '' + ComponentBase.reactUid;
                ComponentBase.reactUid++;
                if (this.type && !this.htmlattributes['type']) {
                    this.htmlattributes['type'] = this.multiline ? 'hidden' : this.type;
                }
                if (this.name && !this.htmlattributes['name']) {
                    this.htmlattributes['name'] = this.name;
                }
            }
        }
        if (this.clsName) {
            const clsList = this.element.classList;
            const className = this.htmlattributes['className'];
            for (let i = 0; i < clsList.length; i++) {
                if ((className.indexOf(clsList[parseInt(i.toString(), 10)]) === -1)) {
                    this.htmlattributes['className'] = this.htmlattributes['className'] + ' ' + clsList[parseInt(i.toString(), 10)];
                }
            }
        }
        return this.htmlattributes;
    }
    trigger(eventName, eventProp, successHandler) {
        if (this.isDestroyed !== true && this.modelObserver) {
            if (isColEName.test(eventName)) {
                const handler = getValue(eventName, this);
                if (handler) {
                    handler.call(this, eventProp);
                    if (successHandler) {
                        successHandler.call(this, eventProp);
                    }
                }
                else if (successHandler) {
                    successHandler.call(this, eventProp);
                }
            }
            if ((eventName === 'change' || eventName === 'input')) {
                if (this.props.onChange && eventProp.event) {
                    this.props.onChange.call(undefined, {
                        syntheticEvent: eventProp.event,
                        nativeEvent: { text: eventProp.value },
                        value: eventProp.value,
                        target: this
                    });
                }
            }
            const prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            if (eventName === 'created') {
                setTimeout(() => {
                    this.isCreated = true;
                    if (!this.isDestroyed) {
                        this.modelObserver.notify(eventName, eventProp, successHandler);
                    }
                }, 10);
            }
            else {
                this.modelObserver.notify(eventName, eventProp, successHandler);
            }
            this.isProtectedOnChange = prevDetection;
        }
    }
    compareValues(value1, value2) {
        const typeVal = typeof value1;
        const typeVal2 = typeof value2;
        if (typeVal === typeVal2) {
            if (value1 === value2) {
                return true;
            }
            if ((!isNullOrUndefined(value1) && value1.constructor) !== (!isNullOrUndefined(value2) && value2.constructor)) {
                return false;
            }
            if (value1 instanceof Date ||
                value1 instanceof RegExp ||
                value1 instanceof String ||
                value1 instanceof Number) {
                return value1.toString() === value2.toString();
            }
            if (isObject(value1) || Array.isArray(value1)) {
                let tempVal = value1;
                let tempVal2 = value2;
                if (isObject(tempVal)) {
                    tempVal = [value1];
                    tempVal2 = [value2];
                }
                return this.compareObjects(tempVal, tempVal2).status;
            }
            if (value1.moduleName &&
                value1.moduleName === value2.moduleName &&
                (value1.moduleName === 'query' ||
                    value1.moduleName === 'datamanager')) {
                if (JSON.stringify(value1) === JSON.stringify(value2)) {
                    return true;
                }
            }
        }
        return false;
    }
    compareObjects(oldProps, newProps, propName) {
        let status = true;
        const lenSimilarity = (oldProps.length === newProps.length);
        const diffArray = [];
        const templateProps = !isNullOrUndefined(this['templateProps']) ? this['templateProps'] : [];
        if (lenSimilarity) {
            for (let i = 0, len = newProps.length; i < len; i++) {
                const curObj = {};
                const oldProp = oldProps[parseInt(i.toString(), 10)];
                const newProp = newProps[parseInt(i.toString(), 10)];
                const keys = Object.keys(newProp);
                if (keys.length !== 0) {
                    for (const key of keys) {
                        const oldValue = oldProp[`${key}`];
                        const newValue = newProp[`${key}`];
                        if (key === 'items') {
                            for (let _j = 0; _j < newValue.length; _j++) {
                                if (this.getModuleName() === 'richtexteditor' && typeof (newValue[parseInt(_j.toString(), 10)]) === 'object') {
                                    return { status: true };
                                }
                            }
                        }
                        if (this.getModuleName() === 'grid' && key === 'field') {
                            curObj[`${key}`] = newValue;
                        }
                        if (!Object.prototype.hasOwnProperty.call(oldProp, key) || !((templateProps.length > 0 && templateProps.indexOf(`${key}`) === -1 && typeof (newValue) === 'function') ? this.compareValues(oldValue.toString(), newValue.toString()) : this.compareValues(oldValue, newValue))) {
                            if (!propName) {
                                return { status: false };
                            }
                            status = false;
                            curObj[`${key}`] = newValue;
                        }
                    }
                }
                else if (newProps[parseInt(i.toString(), 10)] === oldProps[parseInt(i.toString(), 10)]) {
                    status = true;
                }
                else {
                    if (!propName) {
                        return { status: false };
                    }
                    status = false;
                }
                if (this.getModuleName() === 'grid' && propName === 'columns' && isNullOrUndefined(curObj['field'])) {
                    curObj['field'] = undefined;
                }
                if (Object.keys(curObj).length) {
                    diffArray.push({ index: i, value: curObj, key: propName });
                }
            }
        }
        else {
            status = false;
        }
        return { status: status, changedProperties: diffArray };
    }
    refreshChild(silent, props) {
        if (this.checkInjectedModules) {
            const prevModule = this.getInjectedModules() || [];
            const curModule = this.getInjectedServices() || [];
            for (const mod of curModule) {
                if (prevModule.indexOf(mod) === -1) {
                    prevModule.push(mod);
                }
            }
            this.injectedModules = prevModule;
        }
        if (this.directivekeys) {
            let changedProps = [];
            let key = '';
            const directiveValue = this.validateChildren({}, this.directivekeys, (props || this.props));
            if (directiveValue && Object.keys(directiveValue).length) {
                if (!silent && this.skipRefresh) {
                    for (const fields of this.skipRefresh) {
                        delete directiveValue[`${fields}`];
                    }
                }
                if (this.prevProperties) {
                    const dKeys = Object.keys(this.prevProperties);
                    for (let i = 0; i < dKeys.length; i++) {
                        key = dKeys[parseInt(i.toString(), 10)];
                        if (!Object.prototype.hasOwnProperty.call(directiveValue, key)) {
                            continue;
                        }
                        const compareOutput = this.compareObjects(this.prevProperties[`${key}`], directiveValue[`${key}`], key);
                        if (compareOutput.status) {
                            delete directiveValue[`${key}`];
                        }
                        else {
                            if (compareOutput.changedProperties.length) {
                                changedProps = changedProps.concat(compareOutput.changedProperties);
                            }
                            const obj = {};
                            obj[`${key}`] = directiveValue[`${key}`];
                            this.prevProperties = extend(this.prevProperties, obj);
                        }
                    }
                }
                else {
                    this.prevProperties = extend({}, directiveValue, {}, true);
                }
                if (changedProps.length) {
                    if (this.getModuleName() === 'grid' && key === 'columns') {
                        for (let _c1 = 0, allColumns = this.columns; _c1 < allColumns.length; _c1++) {
                            const compareField1 = getValue('field', allColumns[parseInt(_c1.toString(), 10)]);
                            const compareField2 = getValue(_c1 + '.value.field', changedProps);
                            if (compareField1 === compareField2) {
                                const propInstance = getValue(changedProps[parseInt(_c1.toString(), 10)].key + '.' + changedProps[parseInt(_c1.toString(), 10)].index, this);
                                if (propInstance && propInstance.setProperties) {
                                    propInstance.setProperties(changedProps[parseInt(_c1.toString(), 10)].value);
                                }
                                else {
                                    extend(propInstance, changedProps[parseInt(_c1.toString(), 10)].value);
                                }
                            }
                            else {
                                this.setProperties(directiveValue, silent);
                            }
                        }
                    }
                    else {
                        for (const changes of changedProps) {
                            const propInstance = getValue(changes.key + '.' + changes.index, this);
                            if (propInstance && propInstance.setProperties) {
                                propInstance.setProperties(changes.value);
                            }
                            else {
                                extend(propInstance, changes.value);
                            }
                        }
                    }
                }
                else {
                    this.setProperties(directiveValue, silent);
                }
            }
        }
    }
    componentWillUnmount() {
        clearTimeout(this.cachedTimeOut);
        const modulesName = ['dropdowntree', 'checkbox'];
        const hasModule = ((!modulesName.indexOf(this.getModuleName())) ? document.body.contains(this.element) : true);
        if (this.initRenderCalled && this.isAppendCalled && this.element && hasModule && !this.isDestroyed && this.isCreated) {
            this.destroy();
        }
        onIntlChange.offIntlEvents();
    }
    appendReactElement(element, container) {
        const portal = createPortal(element, container);
        if (!this.portals) {
            this.portals = [portal];
        }
        else {
            this.portals.push(portal);
        }
    }
    renderReactTemplates(callback) {
        this.isReactForeceUpdate = true;
        if (callback) {
            this.forceUpdate(callback);
        }
        else {
            this.forceUpdate();
        }
        this.isReactForeceUpdate = false;
    }
    clearTemplate(templateNames, index, callback) {
        if (templateNames && templateNames.length) {
            Array.prototype.forEach.call(templateNames, (propName) => {
                this.portals.forEach((portal) => {
                    if (portal.propName === propName) ;
                });
                if (!isNullOrUndefined(index) && this.portals[index] && this.portals[index].propName === propName) {
                    this.portals.splice(index, 1);
                }
                else {
                    for (let i = 0; i < this.portals.length; i++) {
                        if (this.portals[parseInt(i.toString(), 10)].propName === propName) {
                            this.portals.splice(i, 1);
                            i--;
                        }
                    }
                }
            });
        }
        else {
            this.portals = [];
        }
        this.renderReactTemplates(callback);
    }
    validateChildren(childCache, mapper, props) {
        let flag = false;
        const childs = Children.toArray(props.children);
        for (const child of childs) {
            const ifield = this.getChildType(child);
            const key = mapper[`${ifield}`];
            if (ifield && mapper) {
                const childProps = this.getChildProps(Children.toArray(child.props.children), key);
                if (childProps.length) {
                    flag = true;
                    childCache[child.type.propertyName || ifield] = childProps;
                }
            }
        }
        if (flag) {
            return childCache;
        }
        return null;
    }
    getChildType(child) {
        if (child.type && child.type.isDirective) {
            return child.type.moduleName || '';
        }
        return '';
    }
    getChildProps(subChild, matcher) {
        const ret = [];
        for (const child of subChild) {
            let accessProp = false;
            let key;
            if (typeof matcher === 'string') {
                accessProp = true;
                key = matcher;
            }
            else {
                key = Object.keys(matcher)[0];
            }
            const prop = child.props;
            const field = this.getChildType(child);
            if (field === key) {
                if (accessProp || !prop.children) {
                    const cacheVal = extend({}, prop, {}, true);
                    this.processComplexTemplate(cacheVal, child.type);
                    ret.push(cacheVal);
                }
                else {
                    const cachedValue = this.validateChildren(extend({}, prop), matcher[`${key}`], prop) || prop;
                    if (cachedValue['children']) {
                        delete cachedValue['children'];
                    }
                    this.processComplexTemplate(cachedValue, child.type);
                    ret.push(cachedValue);
                }
            }
        }
        return ret;
    }
    getInjectedServices() {
        const childs = Children.toArray(this.props.children);
        for (const child of childs) {
            if (child.type && child.type.isService) {
                return child.props.services;
            }
        }
        return [];
    }
}
/**
 * @private
 */
ComponentBase.reactUid = 1;

/**
 * Apply mixins for the React components.
 *
 * @param {any} derivedClass ?
 * @param {any[]} baseClass ?
 * @returns {void} ?
 * @private
 */
function applyMixins(derivedClass, baseClass) {
    baseClass.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
            if (name !== 'isMounted' && name !== 'replaceState' && name !== 'render') {
                derivedClass.prototype[`${name}`] = baseClass.prototype[`${name}`];
            }
        });
    });
}

/**
 * Directory base
 */
class ComplexBase extends PureComponent {
    render() {
        return null;
    }
}
ComplexBase.isDirective = true;

/* eslint-disable @typescript-eslint/no-explicit-any */
class Inject extends PureComponent {
    render() {
        return null;
    }
}
Inject.isService = true;

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
/**
 * Compile the string value to DOM elements.
 */
const stringCompiler = getTemplateEngine();
/**
 * Compile the template property to the DOM elements.
 *
 * @param {any} templateElement ?
 * @param {Object} helper ?
 * @returns {Function} ?
 * @private
 */
function compile(templateElement, helper) {
    if (typeof templateElement === 'string' || (templateElement.prototype && templateElement.prototype.CSPTemplate && typeof templateElement === 'function')) {
        return stringCompiler(templateElement, helper);
    }
    else {
        return (data, component, prop, element) => {
            let actTemplate = templateElement;
            let actData = data;
            if (typeof actTemplate === 'object') {
                actTemplate = templateElement.template;
                actData = extend({}, data, templateElement.data || {});
            }
            let cEle;
            if (element) {
                cEle = element;
            }
            else {
                cEle = document.createElement('div');
            }
            const rele = createElement(actTemplate, actData);
            const portal = createPortal(rele, cEle);
            portal.propName = prop;
            if (!component.portals) {
                component.portals = [portal];
            }
            else {
                component.portals.push(portal);
            }
            if (!element) {
                return [cEle];
            }
        };
    }
}
setTemplateEngine({ compile: compile });

export { ComplexBase, ComponentBase, Inject, applyMixins, compile };
//# sourceMappingURL=ej2-react-base.es2015.js.map
