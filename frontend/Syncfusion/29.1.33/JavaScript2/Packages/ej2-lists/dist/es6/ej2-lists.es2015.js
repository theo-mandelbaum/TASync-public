import { isNullOrUndefined, getValue, extend, SanitizeHtmlHelper, prepend, merge, addClass, isVisible, attributes, append, compile, ChildProperty, Property, Component, detach, removeClass, formatUnit, animationMode, Animation, closest, EventHandler, Touch, remove, rippleEffect, Complex, Event, NotifyPropertyChanges, select, Base, isBlazor, getComponent, getUniqueID, Draggable, compareElementParent } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { createCheckBox } from '@syncfusion/ej2-buttons';

/* eslint-disable no-inner-declarations */
let cssClass = {
    li: 'e-list-item',
    ul: 'e-list-parent e-ul',
    group: 'e-list-group-item',
    icon: 'e-list-icon',
    text: 'e-list-text',
    check: 'e-list-check',
    checked: 'e-checked',
    selected: 'e-selected',
    expanded: 'e-expanded',
    textContent: 'e-text-content',
    hasChild: 'e-has-child',
    level: 'e-level',
    url: 'e-list-url',
    collapsible: 'e-icon-collapsible',
    disabled: 'e-disabled',
    image: 'e-list-img',
    iconWrapper: 'e-icon-wrapper',
    anchorWrap: 'e-anchor-wrap',
    navigable: 'e-navigable'
};
/**
 * Base List Generator
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var ListBase;
(function (ListBase) {
    /**
     *
     * Default mapped fields.
     */
    ListBase.defaultMappedFields = {
        id: 'id',
        text: 'text',
        url: 'url',
        value: 'value',
        isChecked: 'isChecked',
        enabled: 'enabled',
        expanded: 'expanded',
        selected: 'selected',
        iconCss: 'iconCss',
        child: 'child',
        isVisible: 'isVisible',
        hasChildren: 'hasChildren',
        tooltip: 'tooltip',
        htmlAttributes: 'htmlAttributes',
        urlAttributes: 'urlAttributes',
        imageAttributes: 'imageAttributes',
        imageUrl: 'imageUrl',
        groupBy: null,
        sortBy: null
    };
    const defaultAriaAttributes = {
        level: 1,
        listRole: 'presentation',
        itemRole: 'presentation',
        groupItemRole: 'group',
        itemText: 'list-item',
        wrapperRole: 'presentation'
    };
    const defaultListBaseOptions = {
        showCheckBox: false,
        showIcon: false,
        enableHtmlSanitizer: false,
        expandCollapse: false,
        fields: ListBase.defaultMappedFields,
        ariaAttributes: defaultAriaAttributes,
        listClass: '',
        itemClass: '',
        processSubChild: false,
        sortOrder: 'None',
        template: null,
        groupTemplate: null,
        headerTemplate: null,
        expandIconClass: 'e-icon-collapsible',
        moduleName: 'list',
        expandIconPosition: 'Right',
        itemNavigable: false
    };
    /**
     * Function helps to created and return the UL Li element based on your data.
     *
     * @param  {createElementParams} createElement - Specifies an array of JSON data.
     *
     * @param  {{Object}[]} dataSource - Specifies an array of JSON data.
     *
     * @param  {ListBaseOptions} [options] - Specifies the list options that need to provide.
     *
     * @param  {boolean} [isSingleLevel] - Specifies the list options that need to provide.
     *
     * @param  {any} [componentInstance] - Specifies the list options that need to provide.
     *
     * @returns  {createElement} createListFromJson - Specifies the list options that need to provide.
     */
    function createList(createElement, dataSource, options, isSingleLevel, componentInstance) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        const ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        const type = typeofData(dataSource).typeof;
        if (type === 'string' || type === 'number') {
            return createListFromArray(createElement, dataSource, isSingleLevel, options, componentInstance);
        }
        else {
            return createListFromJson(createElement, dataSource, options, ariaAttributes.level, isSingleLevel, componentInstance);
        }
    }
    ListBase.createList = createList;
    /**
     * Function helps to created an element list based on string array input .
     *
     * @param  {createElementParams} createElement - Specifies an array of JSON data.
     *
     * @param  {{Object}[]} dataSource - Specifies an array of JSON data.
     *
     * @param  {boolean} [isSingleLevel] - Specifies the list options that need to provide.
     *
     * @param  {ListBaseOptions} [options] - Specifies the list options that need to provide.
     *
     * @param  {any} [componentInstance] - Specifies the list options that need to provide.
     *
     * @returns  {createElement} generateUL - returns the list options that need to provide.
     */
    function createListFromArray(createElement, dataSource, isSingleLevel, options, componentInstance) {
        const subChild = createListItemFromArray(createElement, dataSource, isSingleLevel, options, componentInstance);
        return generateUL(createElement, subChild, null, options);
    }
    ListBase.createListFromArray = createListFromArray;
    /**
     * Function helps to created an element list based on string array input .
     *
     * @param  {createElementParams} createElement - Specifies an array of JSON data.
     *
     * @param  {{Object}[]} dataSource - Specifies an array of JSON data.
     *
     * @param  {boolean} [isSingleLevel] - Specifies the list options that need to provide.
     *
     * @param  {ListBaseOptions} [options] - Specifies the list options that need to provide.
     *
     * @param  {any} [componentInstance] - Specifies the list options that need to provide.
     *
     * @returns  {HTMLElement[]} subChild - returns the list options that need to provide.
     */
    function createListItemFromArray(createElement, dataSource, isSingleLevel, options, componentInstance) {
        const subChild = [];
        const curOpt = extend({}, defaultListBaseOptions, options);
        cssClass = getModuleClass(curOpt.moduleName);
        const id = generateId(); // generate id for drop-down-list option.
        for (let i = 0; i < dataSource.length; i++) {
            if (isNullOrUndefined(dataSource[i])) {
                continue;
            }
            let li;
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                const curData = {
                    dataSource: dataSource,
                    curData: dataSource[i],
                    text: dataSource[i],
                    options: curOpt
                };
                curOpt.itemCreating(curData);
            }
            if (isSingleLevel) {
                li = generateSingleLevelLI(createElement, dataSource[i], undefined, null, null, [], null, id, i, options);
            }
            else {
                li = generateLI(createElement, dataSource[i], undefined, null, null, options, componentInstance);
            }
            if (curOpt.itemCreated && typeof curOpt.itemCreated === 'function') {
                const curData = {
                    dataSource: dataSource,
                    curData: dataSource[i],
                    text: dataSource[i],
                    item: li,
                    options: curOpt
                };
                curOpt.itemCreated(curData);
            }
            subChild.push(li);
        }
        return subChild;
    }
    ListBase.createListItemFromArray = createListItemFromArray;
    /**
     * Function helps to created an element list based on array of JSON input .
     *
     * @param  {createElementParams} createElement - Specifies an array of JSON data.
     *
     * @param  {{Object}[]} dataSource - Specifies an array of JSON data.
     *
     * @param  {ListBaseOptions} [options] - Specifies the list options that need to provide.
     *
     * @param  {number} [level] - Specifies the list options that need to provide.
     *
     * @param  {boolean} [isSingleLevel] - Specifies the list options that need to provide.
     *
     * @param  {any} [componentInstance] - Specifies the list options that need to provide.
     *
     * @returns  {HTMLElement[]} child - returns the list options that need to provide.
     */
    function createListItemFromJson(createElement, dataSource, options, level, isSingleLevel, componentInstance) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        cssClass = getModuleClass(curOpt.moduleName);
        const fields = (componentInstance &&
            (componentInstance.getModuleName() === 'listview' || componentInstance.getModuleName() === 'multiselect'))
            ? curOpt.fields : extend({}, ListBase.defaultMappedFields, curOpt.fields);
        const ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        let id;
        let checkboxElement = [];
        if (level) {
            ariaAttributes.level = level;
        }
        const child = [];
        let li;
        let anchorElement;
        if (dataSource && dataSource.length && !isNullOrUndefined(typeofData(dataSource).item) &&
            !Object.prototype.hasOwnProperty.call(typeofData(dataSource).item, fields.id)) {
            id = generateId(); // generate id for drop-down-list option.
        }
        for (let i = 0; i < dataSource.length; i++) {
            let fieldData = getFieldValues(dataSource[i], fields);
            if (isNullOrUndefined(dataSource[i])) {
                continue;
            }
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                const curData = {
                    dataSource: dataSource,
                    curData: dataSource[i],
                    text: fieldData[fields.text],
                    options: curOpt,
                    fields: fields
                };
                curOpt.itemCreating(curData);
            }
            const curItem = dataSource[i];
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                fieldData = getFieldValues(dataSource[i], fields);
            }
            if (Object.prototype.hasOwnProperty.call(fieldData, fields.id) && !isNullOrUndefined(fieldData[fields.id])) {
                id = fieldData[fields.id];
            }
            const innerEle = [];
            if (curOpt.showCheckBox) {
                if (curOpt.itemNavigable && (fieldData[fields.url] || fieldData[fields.urlAttributes])) {
                    checkboxElement.push(createElement('input', { className: cssClass.check, attrs: { type: 'checkbox' } }));
                }
                else {
                    innerEle.push(createElement('input', { className: cssClass.check, attrs: { type: 'checkbox' } }));
                }
            }
            if (isSingleLevel === true) {
                if (curOpt.showIcon && Object.prototype.hasOwnProperty.call(fieldData, fields.iconCss)
                    && !isNullOrUndefined(fieldData[fields.iconCss])) {
                    innerEle.push(createElement('span', { className: cssClass.icon + ' ' + fieldData[fields.iconCss] }));
                }
                li = generateSingleLevelLI(createElement, curItem, fieldData, fields, curOpt.itemClass, innerEle, (Object.prototype.hasOwnProperty.call(curItem, 'isHeader') &&
                    curItem.isHeader) ? true : false, id, i, options);
                anchorElement = li.querySelector('.' + cssClass.anchorWrap);
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.tooltip)) {
                    let tooltipText = fieldData[fields.tooltip];
                    if (options && options.enableHtmlSanitizer) {
                        tooltipText = SanitizeHtmlHelper.sanitize(tooltipText);
                    }
                    else {
                        let tooltipTextElement = createElement('span', { innerHTML: tooltipText });
                        tooltipText = tooltipTextElement.innerText;
                        tooltipTextElement = null;
                    }
                    li.setAttribute('title', tooltipText);
                }
                if (curOpt.itemNavigable && checkboxElement.length) {
                    prepend(checkboxElement, li.firstElementChild);
                }
            }
            else {
                li = generateLI(createElement, curItem, fieldData, fields, curOpt.itemClass, options, componentInstance);
                li.classList.add(cssClass.level + '-' + ariaAttributes.level);
                li.setAttribute('aria-level', ariaAttributes.level.toString());
                if (ariaAttributes.groupItemRole === 'presentation' || ariaAttributes.itemRole === 'presentation') {
                    li.removeAttribute('aria-level');
                }
                anchorElement = li.querySelector('.' + cssClass.anchorWrap);
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.tooltip)) {
                    let tooltipText = fieldData[fields.tooltip];
                    if (options && options.enableHtmlSanitizer) {
                        tooltipText = SanitizeHtmlHelper.sanitize(tooltipText);
                    }
                    else {
                        let tooltipTextElement = createElement('span', { innerHTML: tooltipText });
                        tooltipText = tooltipTextElement.innerText;
                        tooltipTextElement = null;
                    }
                    li.setAttribute('title', tooltipText);
                }
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.htmlAttributes) && fieldData[fields.htmlAttributes]) {
                    const htmlAttributes = fieldData[fields.htmlAttributes];
                    // Check if 'class' attribute is present and not an empty string
                    if ('class' in htmlAttributes && typeof htmlAttributes['class'] === 'string' && htmlAttributes['class'].trim() === '') {
                        delete htmlAttributes['class'];
                    }
                    setAttribute(li, htmlAttributes);
                }
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.enabled) && fieldData[fields.enabled] === false) {
                    li.classList.add(cssClass.disabled);
                }
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.isVisible) && fieldData[fields.isVisible] === false) {
                    li.style.display = 'none';
                }
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.imageUrl) && !isNullOrUndefined(fieldData[fields.imageUrl])
                    && !curOpt.template) {
                    const attr = { src: fieldData[fields.imageUrl], alt: !isNullOrUndefined(fieldData.name) ? ('Displaying ' + fieldData.name + ' Image') : 'Displaying Image' };
                    merge(attr, fieldData[fields.imageAttributes]);
                    const imageElemnt = createElement('img', { className: cssClass.image, attrs: attr });
                    if (anchorElement) {
                        anchorElement.insertAdjacentElement('afterbegin', imageElemnt);
                    }
                    else {
                        prepend([imageElemnt], li.firstElementChild);
                    }
                }
                if (curOpt.showIcon && Object.prototype.hasOwnProperty.call(fieldData, fields.iconCss) &&
                    !isNullOrUndefined(fieldData[fields.iconCss]) && !curOpt.template) {
                    const iconElement = createElement('div', { className: cssClass.icon + ' ' + fieldData[fields.iconCss] });
                    if (anchorElement) {
                        anchorElement.insertAdjacentElement('afterbegin', iconElement);
                    }
                    else {
                        prepend([iconElement], li.firstElementChild);
                    }
                }
                if (innerEle.length) {
                    prepend(innerEle, li.firstElementChild);
                }
                if (curOpt.itemNavigable && checkboxElement.length) {
                    prepend(checkboxElement, li.firstElementChild);
                }
                processSubChild(createElement, fieldData, fields, dataSource, curOpt, li, ariaAttributes.level);
            }
            if (anchorElement) {
                addClass([li], [cssClass.navigable]);
            }
            if (curOpt.itemCreated && typeof curOpt.itemCreated === 'function') {
                const curData = {
                    dataSource: dataSource,
                    curData: dataSource[i],
                    text: fieldData[fields.text],
                    item: li,
                    options: curOpt,
                    fields: fields
                };
                curOpt.itemCreated(curData);
            }
            checkboxElement = [];
            child.push(li);
        }
        return child;
    }
    ListBase.createListItemFromJson = createListItemFromJson;
    /**
     * Function helps to created an element list based on array of JSON input .
     *
     * @param  {createElementParams} createElement - Specifies an array of JSON data.
     *
     * @param  {{Object}[]} dataSource - Specifies an array of JSON data.
     *
     * @param  {ListBaseOptions} [options] - Specifies the list options that need to provide.
     *
     * @param  {number} [level] - Specifies the list options that need to provide.
     *
     * @param  {boolean} [isSingleLevel] - Specifies the list options that need to provide.
     *
     * @param  {any} [componentInstance] - Specifies the list options that need to provide.
     *
     * @returns  {createElement} generateUL - Specifies the list options that need to provide.
     */
    function createListFromJson(createElement, dataSource, options, level, isSingleLevel, componentInstance) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        const li = createListItemFromJson(createElement, dataSource, options, level, isSingleLevel, componentInstance);
        return generateUL(createElement, li, curOpt.listClass, options);
    }
    ListBase.createListFromJson = createListFromJson;
    /**
     * Return the next or previous visible element.
     *
     * @param  {Element[]|NodeList} elementArray - An element array to find next or previous element.
     * @param  {Element} element - An element to find next or previous after this element.
     * @param  {boolean} [isPrevious] - Specify when the need get previous element from array.
     * @returns {Element|undefined} The next or previous visible element, or undefined if the element array is empty.
     */
    function getSiblingLI(elementArray, element, isPrevious) {
        cssClass = getModuleClass(defaultListBaseOptions.moduleName);
        if (!elementArray || !elementArray.length) {
            return void 0;
        }
        let siblingLI;
        let liIndex;
        const liCollections = Array.prototype.slice.call(elementArray);
        if (element) {
            liIndex = indexOf(element, liCollections);
        }
        else {
            liIndex = (isPrevious === true ? liCollections.length : -1);
        }
        siblingLI = liCollections[liIndex + (isPrevious === true ? -1 : 1)];
        while (siblingLI && (!isVisible(siblingLI) || siblingLI.classList.contains(cssClass.disabled))) {
            liIndex = liIndex + (isPrevious === true ? -1 : 1);
            siblingLI = liCollections[liIndex];
        }
        return siblingLI;
    }
    ListBase.getSiblingLI = getSiblingLI;
    /**
     * Return the index of the li element
     *
     * @param  {Element} item - An element to find next or previous after this element.
     * @param  {Element[]} elementArray - An element array to find index of given li.
     * @returns {number} - The index of the item in the element array, or undefined if either parameter is false.
     */
    function indexOf(item, elementArray) {
        if (!elementArray || !item) {
            return void 0;
        }
        else {
            let liCollections = elementArray;
            liCollections = Array.prototype.slice.call(elementArray);
            return liCollections.indexOf(item);
        }
    }
    ListBase.indexOf = indexOf;
    /**
     * Returns the grouped data from given dataSource.
     *
     * @param  {{Object}[]} dataSource - The JSON data which is necessary to process.
     * @param  {FieldsMapping} fields - Fields that are mapped from the data source.
     * @param  {SortOrder} [sortOrder='None'] - Specifies final result sort order. Defaults to 'None'.
     * @returns {Object[]} - The grouped data.
     */
    function groupDataSource(dataSource, fields, sortOrder = 'None') {
        const curFields = extend({}, ListBase.defaultMappedFields, fields);
        let cusQuery = new Query().group(curFields.groupBy);
        // need to remove once sorting issues fixed in DataManager
        cusQuery = addSorting(sortOrder, 'key', cusQuery);
        const ds = getDataSource(dataSource, cusQuery);
        dataSource = [];
        for (let j = 0; j < ds.length; j++) {
            const itemObj = ds[j].items;
            const grpItem = {};
            const hdr = 'isHeader';
            grpItem[curFields.text] = ds[j].key;
            grpItem[`${hdr}`] = true;
            let newtext = curFields.text;
            if (newtext === 'id') {
                newtext = 'text';
                grpItem[`${newtext}`] = ds[j].key;
            }
            grpItem._id = 'group-list-item-' + (ds[j].key ?
                ds[j].key.toString().trim() : 'undefined');
            grpItem.items = itemObj;
            dataSource.push(grpItem);
            for (let k = 0; k < itemObj.length; k++) {
                dataSource.push(itemObj[k]);
            }
        }
        return dataSource;
    }
    ListBase.groupDataSource = groupDataSource;
    /**
     * Returns a sorted query object.
     *
     * @param  {SortOrder} sortOrder - Specifies that sort order.
     * @param  {string} sortBy - Specifies sortBy fields.
     * @param  {Query} query - Pass if any existing query.
     * @returns {Query} - The updated query object with sorting applied.
     */
    function addSorting(sortOrder, sortBy, query = new Query()) {
        if (sortOrder === 'Ascending') {
            query.sortBy(sortBy, 'ascending', true);
        }
        else if (sortOrder === 'Descending') {
            query.sortBy(sortBy, 'descending', true);
        }
        else {
            for (let i = 0; i < query.queries.length; i++) {
                if (query.queries[i].fn === 'onSortBy') {
                    query.queries.splice(i, 1);
                }
            }
        }
        return query;
    }
    ListBase.addSorting = addSorting;
    /**
     * Return an array of JSON Data that processed based on queries.
     *
     * @param  {{Object}[]} dataSource - Specifies local JSON data source.
     *
     * @param  {Query} query - Specifies query that need to process.
     *
     * @returns {Object[]} - An array of objects representing the retrieved data.
     */
    function getDataSource(dataSource, query) {
        return new DataManager(dataSource)
            .executeLocal(query);
    }
    ListBase.getDataSource = getDataSource;
    /**
     * Created JSON data based the UL and LI element
     *
     * @param  {HTMLElement|Element} element - UL element that need to convert as a JSON
     * @param  {ListBaseOptions} [options] - Specifies ListBase option for fields.
     * @returns {Object[]} - An array of objects representing the JSON data.
     */
    function createJsonFromElement(element, options) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        const fields = extend({}, ListBase.defaultMappedFields, curOpt.fields);
        const curEle = element.cloneNode(true);
        const jsonAr = [];
        curEle.classList.add('json-parent');
        const childs = curEle.querySelectorAll('.json-parent>li');
        curEle.classList.remove('json-parent');
        for (let i = 0; i < childs.length; i++) {
            const li = childs[i];
            const anchor = li.querySelector('a');
            const ul = li.querySelector('ul');
            const json = {};
            const childNodes = anchor ? anchor.childNodes : li.childNodes;
            const keys = Object.keys(childNodes);
            for (let i = 0; i < childNodes.length; i++) {
                if (!(childNodes[Number(keys[i])]).hasChildNodes()) {
                    json[fields.text] = childNodes[Number(keys[i])].textContent;
                }
            }
            let attributes = getAllAttributes(li);
            if (attributes.id) {
                json[fields.id] = attributes.id;
                delete attributes.id;
            }
            else {
                json[fields.id] = generateId();
            }
            if (Object.keys(attributes).length) {
                json[fields.htmlAttributes] = attributes;
            }
            if (anchor) {
                attributes = getAllAttributes(anchor);
                if (Object.keys(attributes).length) {
                    json[fields.urlAttributes] = attributes;
                }
            }
            if (ul) {
                json[fields.child] = createJsonFromElement(ul, options);
            }
            jsonAr.push(json);
        }
        return jsonAr;
    }
    ListBase.createJsonFromElement = createJsonFromElement;
    /**
     * Determines the type of data in an array of objects, strings, or numbers.
     *
     * @param {Object[] | string[] | number[]} data - The array containing objects, strings, or numbers.
     * @returns {{typeof: (string | null), item: (Object | string | number)}} - An object containing the type of data and the corresponding item.
     */
    function typeofData(data) {
        let match = { typeof: null, item: null };
        for (let i = 0; i < data.length; i++) {
            if (!isNullOrUndefined(data[i])) {
                return match = { typeof: typeof data[i], item: data[i] };
            }
        }
        return match;
    }
    /**
     * Sets attributes on an HTML element.
     *
     * @param {HTMLElement} element - The HTML element to set attributes on.
     * @param {Object.<string, string>} elementAttributes - An object containing attribute names and their corresponding values.
     * @returns {void}
     */
    function setAttribute(element, elementAttributes) {
        const attr = {};
        merge(attr, elementAttributes);
        if (attr.class) {
            addClass([element], attr.class.split(' '));
            delete attr.class;
        }
        attributes(element, attr);
    }
    /**
     * Retrieves all attributes of an HTML element.
     *
     * @param {HTMLElement} element - The HTML element to retrieve attributes from.
     * @returns {Object.<string, string>} - An object containing attribute names as keys and their corresponding values as values.
     */
    function getAllAttributes(element) {
        const attributes = {};
        const attr = element.attributes;
        for (let index = 0; index < attr.length; index++) {
            attributes[attr[index].nodeName] = attr[index].nodeValue;
        }
        return attributes;
    }
    /**
     * Created UL element from content template.
     *
     * @param  {createElementParams} createElement - Specifies an array of JSON data.
     * @param  {string} template - that need to convert and generate li element.
     * @param  {{Object}[]} dataSource - Specifies local JSON data source.
     * @param  {FieldsMapping} [fields] - Specifies fields for mapping the dataSource.
     * @param  {ListBaseOptions} [options] - Specifies ListBase option for fields.
     * @param  {any} [componentInstance] - Specifies component instance.
     * @returns {HTMLElement} - The generated LI element.
     */
    function renderContentTemplate(createElement, template, dataSource, fields, options, componentInstance) {
        cssClass = getModuleClass(defaultListBaseOptions.moduleName);
        const ulElement = createElement('ul', { className: cssClass.ul, attrs: { role: 'presentation' } });
        const curOpt = extend({}, defaultListBaseOptions, options);
        const curFields = extend({}, ListBase.defaultMappedFields, fields);
        const compiledString = compileTemplate(template);
        const liCollection = [];
        let value;
        const id = generateId(); // generate id for drop-down-list option.
        for (let i = 0; i < dataSource.length; i++) {
            let fieldData = getFieldValues(dataSource[i], curFields);
            const curItem = dataSource[i];
            const isHeader = curItem.isHeader;
            if (typeof dataSource[i] === 'string' || typeof dataSource[i] === 'number') {
                value = curItem;
            }
            else {
                value = fieldData[curFields.value];
            }
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                const curData = {
                    dataSource: dataSource,
                    curData: curItem,
                    text: value,
                    options: curOpt,
                    fields: curFields
                };
                curOpt.itemCreating(curData);
            }
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                fieldData = getFieldValues(dataSource[i], curFields);
                if (typeof dataSource[i] === 'string' || typeof dataSource[i] === 'number') {
                    value = curItem;
                }
                else {
                    value = fieldData[curFields.value];
                }
            }
            const li = createElement('li', {
                id: id + '-' + i,
                className: isHeader ? cssClass.group : cssClass.li, attrs: { role: 'presentation' }
            });
            if (isHeader) {
                if (typeof dataSource[i] === 'string' || typeof dataSource[i] === 'number') {
                    li.innerText = curItem;
                }
                else {
                    li.innerText = fieldData[curFields.text];
                }
            }
            else {
                const currentID = isHeader ? curOpt.groupTemplateID : curOpt.templateID;
                if (isHeader) {
                    if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                        const compiledElement = compiledString(curItem, componentInstance, 'headerTemplate', currentID, !!curOpt.isStringTemplate, null, li);
                        if (compiledElement) {
                            append(compiledElement, li);
                        }
                    }
                    else {
                        append(compiledString(curItem, componentInstance, 'headerTemplate', currentID, !!curOpt.isStringTemplate), li);
                    }
                }
                else {
                    if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                        const compiledElement = compiledString(curItem, componentInstance, 'template', currentID, !!curOpt.isStringTemplate, null, li);
                        if (compiledElement) {
                            append(compiledElement, li);
                        }
                    }
                    else {
                        append(compiledString(curItem, componentInstance, 'template', currentID, !!curOpt.isStringTemplate), li);
                    }
                }
                li.setAttribute('data-value', isNullOrUndefined(value) ? 'null' : value);
                li.setAttribute('role', 'option');
            }
            if (curOpt.itemCreated && typeof curOpt.itemCreated === 'function') {
                const curData = {
                    dataSource: dataSource,
                    curData: curItem,
                    text: value,
                    item: li,
                    options: curOpt,
                    fields: curFields
                };
                curOpt.itemCreated(curData);
            }
            liCollection.push(li);
        }
        append(liCollection, ulElement);
        return ulElement;
    }
    ListBase.renderContentTemplate = renderContentTemplate;
    /**
     * Created header items from group template.
     *
     * @param  {string | Function} groupTemplate - that need to convert and generate li element.
     *
     * @param {{Object}[]} groupDataSource - Specifies local JSON data source.
     *
     * @param  {FieldsMapping} fields - Specifies fields for mapping the dataSource.
     *
     * @param  {Element[]} headerItems - Specifies ListBase header items.
     *
     * @param {ListBaseOptions} [options] - Optional ListBase options.
     *
     * @param {*} [componentInstance] - Optional component instance.
     *
     * @returns {Element[]} - An array of header elements with the rendered group template content.
     */
    function renderGroupTemplate(groupTemplate, 
    // tslint:disable-next-line
    groupDataSource, fields, headerItems, options, componentInstance) {
        const compiledString = compileTemplate(groupTemplate);
        const curFields = extend({}, ListBase.defaultMappedFields, fields);
        const curOpt = extend({}, defaultListBaseOptions, options);
        const category = curFields.groupBy;
        for (const header of headerItems) {
            const headerData = {};
            headerData[`${category}`] = header.textContent;
            header.innerHTML = '';
            if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                const compiledElement = compiledString(headerData, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate, null, header);
                if (compiledElement) {
                    append(compiledElement, header);
                }
            }
            else {
                append(compiledString(headerData, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate), header);
            }
        }
        return headerItems;
    }
    ListBase.renderGroupTemplate = renderGroupTemplate;
    /**
     * Generates a random hexadecimal ID string.
     *
     * @returns {string} - The generated ID string.
     */
    function generateId() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    ListBase.generateId = generateId;
    /**
     * Processes the sub-child elements and creates corresponding elements based on the provided field data and options.
     *
     * @param {Function} createElement - Function for creating elements.
     * @param {Object} fieldData - Field data containing sub-child information.
     * @param {FieldsMapping} fields - Field mappings.
     * @param {Object[]} ds - The data source array containing sub-child elements.
     * @param {ListBaseOptions} options - ListBase options.
     * @param {HTMLElement} element - The parent HTML element to append sub-child elements to.
     * @param {number} level - The level of the sub-child elements.
     * @returns {void}
     */
    function processSubChild(createElement, fieldData, fields, ds, options, element, level) {
        // Get SubList
        const subDS = fieldData[fields.child] || [];
        let hasChildren = fieldData[fields.hasChildren];
        //Create Sub child
        if (subDS.length) {
            hasChildren = true;
            element.classList.add(cssClass.hasChild);
            if (options.processSubChild) {
                const subLi = createListFromJson(createElement, subDS, options, ++level);
                element.appendChild(subLi);
            }
        }
        // Create expand and collapse node
        if (!!options.expandCollapse && hasChildren && !options.template) {
            element.firstElementChild.classList.add(cssClass.iconWrapper);
            const expandElement = options.expandIconPosition === 'Left' ? prepend : append;
            expandElement([createElement('div', { className: 'e-icons ' + options.expandIconClass })], element.querySelector('.' + cssClass.textContent));
        }
    }
    /**
     * Generates a single-level LI (list item) element based on the provided item and field data.
     *
     * @param {Function} createElement - Function for creating elements.
     * @param {string | Object | number} item - The item data.
     * @param {Object} fieldData - Field data mapped from the item.
     * @param {FieldsMapping} [fields] - Field mappings.
     * @param {string} [className] - Optional class name to add to the created LI element.
     * @param {HTMLElement[]} [innerElements] - Optional array of inner elements to append to the LI element.
     * @param {boolean} [grpLI] - Indicates if the LI element is a group item.
     * @param {string} [id] - The ID of the LI element.
     * @param {number} [index] - The index of the LI element.
     * @param {ListBaseOptions} [options] - Optional ListBase options.
     * @returns {HTMLElement} - The generated LI element.
     */
    function generateSingleLevelLI(createElement, item, fieldData, fields, className, innerElements, grpLI, id, index, options) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        const ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        let text = item;
        let value = item;
        let dataSource;
        if (typeof item !== 'string' && typeof item !== 'number' && typeof item !== 'boolean') {
            dataSource = item;
            text = (typeof fieldData[fields.text] === 'boolean' || typeof fieldData[fields.text] === 'number') ?
                fieldData[fields.text] : (fieldData[fields.text] || '');
            value = fieldData[fields.value];
        }
        let elementID;
        if (!isNullOrUndefined(dataSource) && !isNullOrUndefined(fieldData[fields.id])
            && fieldData[fields.id] !== '') {
            elementID = id;
        }
        else {
            elementID = id + '-' + index;
        }
        const li = createElement('li', {
            className: (grpLI === true ? cssClass.group : cssClass.li) + ' ' + (isNullOrUndefined(className) ? '' : className),
            id: elementID, attrs: (ariaAttributes.groupItemRole !== '' && ariaAttributes.itemRole !== '' ?
                { role: (grpLI === true ? ariaAttributes.groupItemRole : ariaAttributes.itemRole) } : {})
        });
        if (dataSource && Object.prototype.hasOwnProperty.call(fieldData, fields.enabled) && fieldData[fields.enabled].toString() === 'false') {
            li.classList.add(cssClass.disabled);
        }
        if (options && options.enableHtmlSanitizer) {
            text = SanitizeHtmlHelper.sanitize(text);
        }
        if (grpLI) {
            li.innerText = text;
        }
        else {
            li.setAttribute('data-value', isNullOrUndefined(value) ? 'null' : value);
            li.setAttribute('role', 'option');
            if (dataSource && Object.prototype.hasOwnProperty.call(fieldData, fields.htmlAttributes) && fieldData[fields.htmlAttributes]) {
                setAttribute(li, fieldData[fields.htmlAttributes]);
            }
            if (innerElements.length && !curOpt.itemNavigable) {
                append(innerElements, li);
            }
            if (dataSource && (fieldData[fields.url] || (fieldData[fields.urlAttributes] &&
                fieldData[fields.urlAttributes].href))) {
                li.appendChild(anchorTag(createElement, dataSource, fields, text, innerElements, curOpt.itemNavigable));
            }
            else {
                if (innerElements.length && curOpt.itemNavigable) {
                    append(innerElements, li);
                }
                li.appendChild(document.createTextNode(text));
            }
        }
        return li;
    }
    /**
     * Returns a set of CSS class names based on the provided module name.
     *
     * @param {string} moduleName - The name of the module.
     * @returns {ClassList} - The CSS class names associated with the module.
     */
    function getModuleClass(moduleName) {
        let moduleClass;
        // eslint-disable-next-line
        return moduleClass = {
            li: `e-${moduleName}-item`,
            ul: `e-${moduleName}-parent e-ul`,
            group: `e-${moduleName}-group-item`,
            icon: `e-${moduleName}-icon`,
            text: `e-${moduleName}-text`,
            check: `e-${moduleName}-check`,
            checked: 'e-checked',
            selected: 'e-selected',
            expanded: 'e-expanded',
            textContent: 'e-text-content',
            hasChild: 'e-has-child',
            level: 'e-level',
            url: `e-${moduleName}-url`,
            collapsible: 'e-icon-collapsible',
            disabled: 'e-disabled',
            image: `e-${moduleName}-img`,
            iconWrapper: 'e-icon-wrapper',
            anchorWrap: 'e-anchor-wrap',
            navigable: 'e-navigable'
        };
    }
    /**
     * Creates an anchor tag (<a>) element based on the provided data source, fields, and text.
     *
     * @param {Function} createElement - Function for creating elements.
     * @param {object} dataSource - The data source containing URL-related fields.
     * @param {FieldsMapping} fields - Field mappings for the data source.
     * @param {string} text - The text content of the anchor tag.
     * @param {HTMLElement[]} innerElements - Optional array of inner elements to append to the anchor tag.
     * @param {boolean} isFullNavigation - Indicates whether the anchor tag should be for full navigation.
     * @returns {HTMLElement} The created anchor tag element.
     */
    function anchorTag(createElement, dataSource, fields, text, innerElements, isFullNavigation) {
        const fieldData = getFieldValues(dataSource, fields);
        const attr = { href: fieldData[fields.url] };
        if (Object.prototype.hasOwnProperty.call(fieldData, fields.urlAttributes) && fieldData[fields.urlAttributes]) {
            merge(attr, fieldData[fields.urlAttributes]);
            attr.href = fieldData[fields.url] ? fieldData[fields.url] :
                fieldData[fields.urlAttributes].href;
        }
        let anchorTag;
        if (!isFullNavigation) {
            anchorTag = createElement('a', { className: cssClass.text + ' ' + cssClass.url, innerHTML: text });
        }
        else {
            anchorTag = createElement('a', { className: cssClass.text + ' ' + cssClass.url });
            const anchorWrapper = createElement('div', { className: cssClass.anchorWrap });
            if (innerElements && innerElements.length) {
                append(innerElements, anchorWrapper);
            }
            anchorWrapper.appendChild(document.createTextNode(text));
            append([anchorWrapper], anchorTag);
        }
        setAttribute(anchorTag, attr);
        return anchorTag;
    }
    /**
     * Generates an LI element based on the provided item and field data.
     *
     * @param {Function} createElement - Function for creating elements.
     * @param {string | Object | number} item - The item data.
     * @param {Object} fieldData - Field data mapped from the item.
     * @param {FieldsMapping} fields - Field mappings.
     * @param {string} [className] - Optional class name to add to the created LI element.
     * @param {ListBaseOptions} [options] - Optional ListBase options.
     * @param {*} [componentInstance] - Optional component instance.
     * @returns {HTMLElement} - The generated LI element.
     */
    function generateLI(createElement, item, fieldData, fields, className, options, componentInstance) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        const ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        let text = item;
        let uID;
        let grpLI;
        let dataSource;
        if (typeof item !== 'string' && typeof item !== 'number') {
            dataSource = item;
            text = fieldData[fields.text] || '';
            uID = (isNullOrUndefined(fieldData['_id'])) ? fieldData[fields.id] : fieldData['_id'];
            grpLI = (Object.prototype.hasOwnProperty.call(item, 'isHeader') && item.isHeader)
                ? true : false;
        }
        if (options && options.enableHtmlSanitizer) {
            text = SanitizeHtmlHelper.sanitize(text);
        }
        const li = createElement('li', {
            className: (grpLI === true ? cssClass.group : cssClass.li) + ' ' + (isNullOrUndefined(className) ? '' : className),
            attrs: (ariaAttributes.groupItemRole !== '' && ariaAttributes.itemRole !== '' ?
                { role: (grpLI === true ? ariaAttributes.groupItemRole : ariaAttributes.itemRole) } : {})
        });
        if (!isNullOrUndefined(uID) === true) {
            li.setAttribute('data-uid', uID);
        }
        else {
            li.setAttribute('data-uid', generateId());
        }
        if (grpLI && options && options.groupTemplate) {
            const compiledString = compileTemplate(options.groupTemplate);
            if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                const compiledElement = compiledString(item, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate, null, li);
                if (compiledElement) {
                    append(compiledElement, li);
                }
            }
            else {
                append(compiledString(item, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate), li);
            }
        }
        else if (!grpLI && options && options.template) {
            const compiledString = compileTemplate(options.template);
            if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                const compiledElement = compiledString(item, componentInstance, 'template', curOpt.templateID, !!curOpt.isStringTemplate, null, li);
                if (compiledElement) {
                    append(compiledElement, li);
                }
            }
            else {
                append(compiledString(item, componentInstance, 'template', curOpt.templateID, !!curOpt.isStringTemplate), li);
            }
        }
        else {
            const innerDiv = createElement('div', {
                className: cssClass.textContent,
                attrs: (ariaAttributes.wrapperRole !== '' ? { role: ariaAttributes.wrapperRole } : {})
            });
            if (dataSource && (fieldData[fields.url] || (fieldData[fields.urlAttributes] &&
                fieldData[fields.urlAttributes].href))) {
                innerDiv.appendChild(anchorTag(createElement, dataSource, fields, text, null, curOpt.itemNavigable));
            }
            else {
                const element = createElement('span', {
                    className: cssClass.text,
                    attrs: (ariaAttributes.itemText !== '' ? { role: ariaAttributes.itemText } : {})
                });
                if (options && options.enableHtmlSanitizer) {
                    element.innerText = text;
                }
                else {
                    element.innerHTML = text;
                }
                innerDiv.appendChild(element);
            }
            li.appendChild(innerDiv);
        }
        return li;
    }
    /**
     * Returns UL element based on the given LI element.
     *
     * @param {Function} createElement - Function for creating elements.
     *
     * @param  {HTMLElement[]} liElement - Specifies array of LI element.
     *
     * @param  {string} [className] - Specifies class name that need to be added in UL element.
     *
     * @param  {ListBaseOptions} [options] - Specifies ListBase options.
     *
     * @returns {HTMLElement} - The created UL element.
     */
    function generateUL(createElement, liElement, className, options) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        const ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        cssClass = getModuleClass(curOpt.moduleName);
        const ulElement = createElement('ul', {
            className: cssClass.ul + ' ' + (isNullOrUndefined(className) ? '' : className),
            attrs: (ariaAttributes.listRole !== '' ? { role: ariaAttributes.listRole } : {})
        });
        append(liElement, ulElement);
        return ulElement;
    }
    ListBase.generateUL = generateUL;
    /**
     * Returns LI element with additional DIV tag based on the given LI element.
     *
     * @param {Function} createElement - Function for creating elements.
     *
     * @param  {liElement} liElement - Specifies LI element.
     *
     * @param  {string} [className] - Specifies class name that need to be added in created DIV element.
     *
     * @param  {ListBaseOptions} [options] - Specifies ListBase options.
     *
     * @returns {HTMLElement} - The modified LI element.
     */
    function generateIcon(createElement, liElement, className, options) {
        const curOpt = extend({}, defaultListBaseOptions, options);
        cssClass = getModuleClass(curOpt.moduleName);
        const expandElement = curOpt.expandIconPosition === 'Left' ? prepend : append;
        expandElement([createElement('div', {
                className: 'e-icons ' + curOpt.expandIconClass + ' ' +
                    (isNullOrUndefined(className) ? '' : className)
            })], liElement.querySelector('.' + cssClass.textContent));
        return liElement;
    }
    ListBase.generateIcon = generateIcon;
})(ListBase || (ListBase = {}));
/**
 * Used to get dataSource item from complex data using fields.
 *
 * @param {Object} dataItem - Specifies an  JSON or String data.
 *
 * @param {FieldsMapping} fields - Fields that are mapped from the dataSource.
 * @returns {Object|string|number} - The retrieved field values.
 */
function getFieldValues(dataItem, fields) {
    const fieldData = {};
    if (isNullOrUndefined(dataItem) || typeof (dataItem) === 'string' || typeof (dataItem) === 'number'
        || !isNullOrUndefined(dataItem.isHeader)) {
        return dataItem;
    }
    else {
        for (const field of Object.keys(fields)) {
            const dataField = fields[`${field}`];
            const value = !isNullOrUndefined(dataField) &&
                typeof (dataField) === 'string' ? getValue(dataField, dataItem) : undefined;
            if (!isNullOrUndefined(value)) {
                fieldData[`${dataField}`] = value;
            }
        }
    }
    return fieldData;
}
/**
 * Compiles a template string or function into a compiled function.
 *
 * @param {string | Function} template - The template string or function to compile.
 * @returns {Function | undefined} - The compiled function, or undefined if the input is false.
 */
function compileTemplate(template) {
    if (template) {
        try {
            if (typeof template !== 'function' && document.querySelector(template)) {
                return compile(document.querySelector(template).innerHTML.trim());
            }
            else {
                return compile(template);
            }
        }
        catch (e) {
            return compile(template);
        }
    }
    return undefined;
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
// Effect Configuration Effect[] =  [fromViewBackward,fromViewForward,toViewBackward,toviewForward];
const effectsConfig = {
    'None': [],
    'SlideLeft': ['SlideRightOut', 'SlideLeftOut', 'SlideLeftIn', 'SlideRightIn'],
    'SlideDown': ['SlideTopOut', 'SlideBottomOut', 'SlideBottomIn', 'SlideTopIn'],
    'Zoom': ['FadeOut', 'FadeZoomOut', 'FadeZoomIn', 'FadeIn'],
    'Fade': ['FadeOut', 'FadeOut', 'FadeIn', 'FadeIn']
};
const effectsRTLConfig = {
    'None': [],
    'SlideLeft': ['SlideLeftOut', 'SlideRightOut', 'SlideRightIn', 'SlideLeftIn'],
    'SlideDown': ['SlideBottomOut', 'SlideTopOut', 'SlideTopIn', 'SlideBottomIn'],
    'Zoom': ['FadeZoomOut', 'FadeOut', 'FadeIn', 'FadeZoomIn'],
    'Fade': ['FadeOut', 'FadeOut', 'FadeIn', 'FadeIn']
};
// don't use space in classnames.
const classNames = {
    root: 'e-listview',
    hover: 'e-hover',
    selected: 'e-active',
    focused: 'e-focused',
    parentItem: 'e-list-parent',
    listItem: 'e-list-item',
    listIcon: 'e-list-icon',
    textContent: 'e-text-content',
    listItemText: 'e-list-text',
    groupListItem: 'e-list-group-item',
    hasChild: 'e-has-child',
    view: 'e-view',
    header: 'e-list-header',
    headerText: 'e-headertext',
    headerTemplateText: 'e-headertemplate-text',
    text: 'e-text',
    disable: 'e-disabled',
    container: 'e-list-container',
    icon: 'e-icons',
    backIcon: 'e-icon-back',
    backButton: 'e-back-button',
    checkboxWrapper: 'e-checkbox-wrapper',
    checkbox: 'e-checkbox',
    checked: 'e-check',
    checklist: 'e-checklist',
    checkboxIcon: 'e-frame',
    checkboxRight: 'e-checkbox-right',
    checkboxLeft: 'e-checkbox-left',
    listviewCheckbox: 'e-listview-checkbox',
    itemCheckList: 'e-checklist',
    virtualElementContainer: 'e-list-virtualcontainer'
};
const LISTVIEW_TEMPLATE_PROPERTY = 'Template';
const LISTVIEW_GROUPTEMPLATE_PROPERTY = 'GroupTemplate';
const LISTVIEW_HEADERTEMPLATE_PROPERTY = 'HeaderTemplate';
const swipeVelocity = 0.5;
/**
 * Represents the field settings of the ListView.
 */
class FieldSettings extends ChildProperty {
}
__decorate([
    Property('id')
], FieldSettings.prototype, "id", void 0);
__decorate([
    Property('text')
], FieldSettings.prototype, "text", void 0);
__decorate([
    Property('isChecked')
], FieldSettings.prototype, "isChecked", void 0);
__decorate([
    Property('isVisible')
], FieldSettings.prototype, "isVisible", void 0);
__decorate([
    Property('enabled')
], FieldSettings.prototype, "enabled", void 0);
__decorate([
    Property('iconCss')
], FieldSettings.prototype, "iconCss", void 0);
__decorate([
    Property('child')
], FieldSettings.prototype, "child", void 0);
__decorate([
    Property('tooltip')
], FieldSettings.prototype, "tooltip", void 0);
__decorate([
    Property('groupBy')
], FieldSettings.prototype, "groupBy", void 0);
__decorate([
    Property('text')
], FieldSettings.prototype, "sortBy", void 0);
__decorate([
    Property('htmlAttributes')
], FieldSettings.prototype, "htmlAttributes", void 0);
__decorate([
    Property('tableName')
], FieldSettings.prototype, "tableName", void 0);
/**
 * Represents the EJ2 ListView control.
 * ```html
 * <div id="listview">
 * <ul>
 * <li>Favorite</li>
 * <li>Documents</li>
 * <li>Downloads</li>
 * </ul>
 * </div>
 * ```
 * ```typescript
 *   var listviewObject = new ListView({});
 *   listviewObject.appendTo("#listview");
 * ```
 */
let ListView = class ListView extends Component {
    /**
     * Constructor for creating the widget
     *
     * @param options
     *
     * @param element
     */
    constructor(options, element) {
        super(options, element);
        this.previousSelectedItems = [];
        this.hiddenItems = [];
        this.enabledItems = [];
        this.disabledItems = [];
    }
    /**
     * @param newProp
     *
     * @param oldProp
     *
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'htmlAttributes':
                    this.setHTMLAttribute();
                    break;
                case 'cssClass':
                    this.setCSSClass(oldProp.cssClass);
                    break;
                case 'enable':
                    this.setEnable();
                    break;
                case 'width':
                case 'height':
                    this.setSize();
                    break;
                case 'enableRtl':
                    this.setEnableRTL();
                    break;
                case 'fields':
                    this.listBaseOption.fields = this.fields.properties;
                    if (this.enableVirtualization) {
                        this.virtualizationModule.reRenderUiVirtualization();
                    }
                    else {
                        this.reRender();
                    }
                    break;
                case 'headerTitle':
                    if (!this.curDSLevel.length) {
                        this.header(this.headerTitle, false, 'header');
                    }
                    break;
                case 'query':
                    if (this.enableVirtualization) {
                        this.virtualizationModule.reRenderUiVirtualization();
                    }
                    else {
                        this.reRender();
                    }
                    break;
                case 'showHeader':
                    this.header(this.headerTitle, false, 'header');
                    break;
                case 'enableVirtualization':
                    if (!isNullOrUndefined(this.contentContainer)) {
                        detach(this.contentContainer);
                    }
                    this.refresh();
                    break;
                case 'showCheckBox':
                case 'checkBoxPosition':
                    if (this.enableVirtualization) {
                        this.virtualizationModule.reRenderUiVirtualization();
                    }
                    else {
                        this.setCheckbox();
                    }
                    break;
                case 'dataSource':
                    this.previousScrollTop = this.element.scrollTop;
                    if (this.enableVirtualization) {
                        this.virtualizationModule.reRenderUiVirtualization();
                    }
                    else {
                        this.reRender();
                    }
                    break;
                case 'sortOrder':
                case 'template':
                    if (!this.enableVirtualization) {
                        this.refresh();
                    }
                    break;
                case 'showIcon':
                    if (this.enableVirtualization) {
                        this.virtualizationModule.reRenderUiVirtualization();
                    }
                    else {
                        this.listBaseOption.showIcon = this.showIcon;
                        this.curViewDS = this.getSubDS();
                        this.resetCurrentList();
                    }
                    break;
            }
        }
    }
    // Model Changes
    setHTMLAttribute() {
        if (!isNullOrUndefined(this.htmlAttributes) && Object.keys(this.htmlAttributes).length) {
            attributes(this.element, this.htmlAttributes);
        }
    }
    setCSSClass(oldCSSClass) {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' ').filter((css) => css));
        }
        if (oldCSSClass) {
            removeClass([this.element], oldCSSClass.split(' ').filter((css) => css));
        }
    }
    setSize() {
        this.element.style.height = formatUnit(this.height);
        this.element.style.width = formatUnit(this.width);
        this.isWindow = this.element.clientHeight ? false : true;
    }
    setEnable() {
        this.enableElement(this.element, this.enable);
    }
    setEnableRTL() {
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        else {
            this.element.classList.remove('e-rtl');
        }
    }
    enableElement(element, isEnabled) {
        if (isEnabled) {
            element.classList.remove(classNames.disable);
        }
        else {
            element.classList.add(classNames.disable);
        }
    }
    // Support Component Functions
    header(text, showBack, prop) {
        if (this.headerEle === undefined && this.showHeader) {
            this.headerEle = this.createElement('div', { className: classNames.header });
            const innerHeaderEle = this.createElement('span', { className: classNames.headerText });
            if (this.enableHtmlSanitizer) {
                this.setProperties({ headerTitle: SanitizeHtmlHelper.sanitize(this.headerTitle) }, true);
                innerHeaderEle.innerText = this.headerTitle;
            }
            else {
                innerHeaderEle.innerHTML = this.headerTitle;
            }
            const textEle = this.createElement('div', { className: classNames.text, innerHTML: innerHeaderEle.outerHTML });
            const hedBackButton = this.createElement('div', {
                className: classNames.icon + ' ' + classNames.backIcon + ' ' + classNames.backButton,
                attrs: { style: 'display:none;' }
            });
            this.headerEle.appendChild(hedBackButton);
            this.headerEle.appendChild(textEle);
            if (this.headerTemplate) {
                const compiledString = compile(this.headerTemplate);
                const headerTemplateEle = this.createElement('div', { className: classNames.headerTemplateText });
                const compiledElement = compiledString({}, this, prop, this.LISTVIEW_HEADERTEMPLATE_ID, null, null, this.headerEle);
                if (compiledElement) {
                    append(compiledElement, headerTemplateEle);
                }
                append([headerTemplateEle], this.headerEle);
                if (this.isReact) {
                    this.renderReactTemplates();
                }
            }
            if (this.headerTemplate && this.headerTitle) {
                textEle.classList.add('header');
            }
            this.element.classList.add('e-has-header');
            prepend([this.headerEle], this.element);
        }
        else if (this.headerEle) {
            if (this.showHeader) {
                this.headerEle.style.display = '';
                const textEle = this.headerEle.querySelector('.' + classNames.headerText);
                const hedBackButton = this.headerEle.querySelector('.' + classNames.backIcon);
                if (this.enableHtmlSanitizer) {
                    text = SanitizeHtmlHelper.sanitize(text);
                }
                textEle.innerHTML = text;
                if (this.headerTemplate && showBack) {
                    textEle.parentElement.classList.remove('header');
                    this.headerEle.querySelector('.' + classNames.headerTemplateText).classList.add('nested-header');
                }
                if (this.headerTemplate && !showBack) {
                    textEle.parentElement.classList.add('header');
                    this.headerEle.querySelector('.' + classNames.headerTemplateText).classList.remove('nested-header');
                    this.headerEle.querySelector('.' + classNames.headerTemplateText).classList.add('header');
                }
                if (showBack === true) {
                    hedBackButton.style.display = '';
                }
                else {
                    hedBackButton.style.display = 'none';
                }
            }
            else {
                this.headerEle.style.display = 'none';
            }
        }
    }
    // Animation Related Functions
    switchView(fromView, toView, reverse) {
        if (fromView && toView) {
            const fPos = fromView.style.position;
            const overflow = (this.element.style.overflow !== 'hidden') ? this.element.style.overflow : '';
            fromView.style.position = 'absolute';
            fromView.classList.add('e-view');
            let anim;
            let duration = this.animation.duration;
            if (this.animation.effect) {
                anim = (this.enableRtl ? effectsRTLConfig[this.animation.effect] : effectsConfig[this.animation.effect]);
            }
            else {
                const slideLeft = 'SlideLeft';
                anim = effectsConfig[`${slideLeft}`];
                reverse = this.enableRtl;
                duration = 0;
            }
            this.element.style.overflow = 'hidden';
            this.aniObj.animate(fromView, {
                name: (reverse === true ? anim[0] : anim[1]),
                duration: (duration === 0 && animationMode === 'Enable') ? 400 : duration,
                timingFunction: this.animation.easing,
                end: () => {
                    fromView.style.display = 'none';
                    this.element.style.overflow = overflow;
                    fromView.style.position = fPos;
                    fromView.classList.remove('e-view');
                }
            });
            toView.style.display = '';
            this.aniObj.animate(toView, {
                name: (reverse === true ? anim[2] : anim[3]),
                duration: (duration === 0 && animationMode === 'Enable') ? 400 : duration,
                timingFunction: this.animation.easing,
                end: () => {
                    this.trigger('actionComplete');
                }
            });
            this.curUL = toView;
        }
    }
    preRender() {
        if (this.template) {
            try {
                if (typeof this.template !== 'function' && document.querySelectorAll(this.template).length) {
                    this.setProperties({ template: document.querySelector(this.template).innerHTML.trim() }, true);
                }
            }
            catch (e) {
                compile(this.template);
            }
        }
        this.listBaseOption = {
            template: this.template,
            headerTemplate: this.headerTemplate,
            groupTemplate: this.groupTemplate, expandCollapse: true, listClass: '',
            ariaAttributes: {
                itemRole: 'listitem', listRole: 'list', itemText: '',
                groupItemRole: 'presentation', wrapperRole: 'presentation'
            },
            fields: (this.fields.properties),
            sortOrder: this.sortOrder,
            showIcon: this.showIcon,
            itemCreated: this.renderCheckbox.bind(this),
            templateID: `${this.element.id}${LISTVIEW_TEMPLATE_PROPERTY}`,
            groupTemplateID: `${this.element.id}${LISTVIEW_GROUPTEMPLATE_PROPERTY}`,
            enableHtmlSanitizer: this.enableHtmlSanitizer
        };
        this.initialization();
    }
    initialization() {
        this.curDSLevel = [];
        this.animateOptions = {};
        this.curViewDS = [];
        this.currentLiElements = [];
        this.isNestedList = false;
        this.selectedData = [];
        this.selectedId = this.enablePersistence ? this.selectedId : [];
        this.LISTVIEW_TEMPLATE_ID = `${this.element.id}${LISTVIEW_TEMPLATE_PROPERTY}`;
        this.LISTVIEW_GROUPTEMPLATE_ID = `${this.element.id}${LISTVIEW_GROUPTEMPLATE_PROPERTY}`;
        this.LISTVIEW_HEADERTEMPLATE_ID = `${this.element.id}${LISTVIEW_HEADERTEMPLATE_PROPERTY}`;
        this.aniObj = new Animation(this.animateOptions);
        this.removeElement(this.curUL);
        this.removeElement(this.ulElement);
        this.removeElement(this.headerEle);
        this.removeElement(this.contentContainer);
        this.curUL = this.ulElement = this.liCollection = this.headerEle = this.contentContainer = undefined;
    }
    renderCheckbox(args) {
        if (args.item.classList.contains(classNames.hasChild)) {
            this.isNestedList = true;
        }
        if (this.showCheckBox && args.item.classList.contains(classNames.listItem)) {
            let fieldData;
            const checkboxElement = createCheckBox(this.createElement, false, {
                checked: false, enableRtl: this.enableRtl,
                cssClass: classNames.listviewCheckbox
            });
            checkboxElement.setAttribute('role', 'checkbox');
            const frameElement = checkboxElement.querySelector('.' + classNames.checkboxIcon);
            args.item.classList.add(classNames.itemCheckList);
            args.item.firstElementChild.classList.add(classNames.checkbox);
            if (typeof this.dataSource[0] !== 'string' && typeof this.dataSource[0] !== 'number') {
                fieldData = getFieldValues(args.curData, this.listBaseOption.fields);
                if (this.enablePersistence && !isNullOrUndefined(this.selectedId)) {
                    const index = this.selectedId.findIndex((e) => e === fieldData[this.listBaseOption.fields.id].toString());
                    if (index !== -1) {
                        this.checkInternally(args, checkboxElement);
                    }
                }
                else if (fieldData[this.listBaseOption.fields.isChecked]) {
                    this.checkInternally(args, checkboxElement);
                }
            }
            else if (((typeof this.dataSource[0] === 'string' ||
                typeof this.dataSource[0] === 'number') && this.selectedData.indexOf(args.text) !== -1)) {
                this.checkInternally(args, checkboxElement);
            }
            checkboxElement.setAttribute('aria-checked', frameElement.classList.contains(classNames.checked) ? 'true' : 'false');
            checkboxElement.setAttribute('aria-label', args.text);
            if (this.checkBoxPosition === 'Left') {
                checkboxElement.classList.add(classNames.checkboxLeft);
                args.item.firstElementChild.classList.add(classNames.checkboxLeft);
                args.item.firstElementChild.insertBefore(checkboxElement, args.item.firstElementChild.childNodes[0]);
            }
            else {
                checkboxElement.classList.add(classNames.checkboxRight);
                args.item.firstElementChild.classList.add(classNames.checkboxRight);
                args.item.firstElementChild.appendChild(checkboxElement);
            }
            this.currentLiElements.push(args.item);
            if (this.checkBoxPosition === 'Left') {
                this.virtualCheckBox = args.item.firstElementChild.children[0];
            }
            else {
                this.virtualCheckBox = args.item.firstElementChild.lastElementChild;
            }
        }
    }
    checkInternally(args, checkboxElement) {
        args.item.classList.add(classNames.selected);
        checkboxElement.querySelector('.' + classNames.checkboxIcon).classList.add(classNames.checked);
        checkboxElement.setAttribute('aria-checked', 'true');
    }
    /**
     * Checks the specific list item by passing the unchecked fields as an argument to this method.
     *
     * @param  {Fields | HTMLElement | Element} item - It accepts Fields or HTML list element as an argument.
     */
    checkItem(item) {
        this.toggleCheckBase(item, true);
    }
    toggleCheckBase(item, checked) {
        if (this.showCheckBox) {
            let liElement = item;
            if (item instanceof Object && item.constructor !== HTMLLIElement) {
                liElement = this.getLiFromObjOrElement(item);
            }
            if (!isNullOrUndefined(liElement)) {
                const checkboxIcon = liElement.querySelector('.' + classNames.checkboxIcon);
                if (checked === true) {
                    liElement.classList.add(classNames.selected);
                }
                else {
                    liElement.classList.remove(classNames.selected);
                }
                if (checked === true) {
                    checkboxIcon.classList.add(classNames.checked);
                }
                else {
                    checkboxIcon.classList.remove(classNames.checked);
                }
                checkboxIcon.parentElement.setAttribute('aria-checked', checked ? 'true' : 'false');
            }
            this.setSelectedItemData(liElement);
            this.updateSelectedId();
        }
    }
    /**
     * Uncheck the specific list item by passing the checked fields as an argument to this method.
     *
     * @param  {Fields | HTMLElement | Element} item - It accepts Fields or HTML list element as an argument.
     */
    uncheckItem(item) {
        this.toggleCheckBase(item, false);
    }
    /**
     * Checks all the unchecked items in the ListView.
     */
    checkAllItems() {
        this.toggleAllCheckBase(true);
    }
    /**
     * Uncheck all the checked items in ListView.
     */
    uncheckAllItems() {
        this.toggleAllCheckBase(false);
    }
    toggleAllCheckBase(checked) {
        if (this.showCheckBox) {
            for (let i = 0; i < this.liCollection.length; i++) {
                const checkIcon = this.liCollection[i].querySelector('.' + classNames.checkboxIcon);
                if (checkIcon) {
                    if (checked) {
                        if (!checkIcon.classList.contains(classNames.checked)) {
                            this.checkItem(this.liCollection[i]);
                        }
                    }
                    else {
                        if (checkIcon.classList.contains(classNames.checked)) {
                            this.uncheckItem(this.liCollection[i]);
                        }
                    }
                }
            }
            if (this.enableVirtualization) {
                this.virtualizationModule.checkedItem(checked);
            }
            this.updateSelectedId();
        }
    }
    setCheckbox() {
        if (this.showCheckBox) {
            const liCollection = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.listItem));
            const args = {
                item: undefined, curData: undefined, dataSource: undefined, fields: undefined,
                options: undefined, text: ''
            };
            for (let i = 0; i < liCollection.length; i++) {
                const element = liCollection[i];
                args.item = element;
                args.curData = this.getItemData(element);
                if (element.querySelector('.' + classNames.checkboxWrapper)) {
                    this.removeElement(element.querySelector('.' + classNames.checkboxWrapper));
                }
                this.renderCheckbox(args);
                if (args.item.classList.contains(classNames.selected)) {
                    this.checkInternally(args, args.item.querySelector('.' + classNames.checkboxWrapper));
                }
            }
        }
        else {
            const liCollection = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.itemCheckList));
            for (let i = 0; i < liCollection.length; i++) {
                const element = liCollection[i];
                element.classList.remove(classNames.selected);
                element.firstElementChild.classList.remove(classNames.checkbox);
                this.removeElement(element.querySelector('.' + classNames.checkboxWrapper));
            }
            if (this.selectedItems) {
                this.selectedItems.item.classList.add(classNames.selected);
            }
        }
    }
    /**
     * Refresh the height of the list item only on enabling the virtualization property.
     */
    refreshItemHeight() {
        if (this.virtualizationModule) {
            this.virtualizationModule.refreshItemHeight();
        }
    }
    handleCheckboxState(li, checkIcon, checkboxElement, isCheckedBefore, isFocusedBefore, eventArgs, isSetCheckboxLI, textAreaFocus) {
        this.trigger('select', eventArgs, (observedArgs) => {
            if (observedArgs.cancel) {
                if (isSetCheckboxLI ? isCheckedBefore : !isCheckedBefore) {
                    checkIcon.classList.add(classNames.checked);
                    li.classList.add(classNames.selected);
                }
                else {
                    checkIcon.classList.remove(classNames.checked);
                    li.classList.remove(classNames.selected);
                }
                checkboxElement.setAttribute('aria-checked', isSetCheckboxLI ? (isCheckedBefore ? 'true' : 'false') : (isCheckedBefore ? 'false' : 'true'));
                merge(eventArgs, { isChecked: checkIcon.classList.contains(classNames.checked) });
                if (isFocusedBefore) {
                    li.classList.remove(classNames.focused);
                    if (textAreaFocus) {
                        textAreaFocus.classList.remove('e-focused');
                    }
                }
            }
        });
    }
    clickHandler(e) {
        if (Array.isArray(this.dataSource) && this.dataSource.length === 0) {
            return;
        }
        const target = e.target;
        this.targetElement = target;
        const classList = target.classList;
        let closestElement;
        if (classList.contains(classNames.backIcon) || classList.contains(classNames.headerText)) {
            if (this.showCheckBox && this.curDSLevel[this.curDSLevel.length - 1]) {
                this.uncheckAllItems();
            }
            this.back();
        }
        else {
            let li = closest(target.parentNode, '.' + classNames.listItem);
            if (li === null) {
                li = target;
            }
            this.removeFocus();
            if (this.enable && this.showCheckBox && this.isValidLI(li)) {
                if (e.target.classList.contains(classNames.checkboxIcon)) {
                    li.classList.add(classNames.focused);
                    if (isNullOrUndefined(li.querySelector('.' + classNames.checked))) {
                        const args = {
                            curData: undefined, dataSource: undefined, fields: undefined, options: undefined,
                            text: undefined, item: li
                        };
                        this.checkInternally(args, args.item.querySelector('.' + classNames.checkboxWrapper));
                    }
                    else {
                        this.uncheckItem(li);
                        li.classList.add(classNames.focused);
                    }
                    if (this.enableVirtualization) {
                        this.virtualizationModule.setCheckboxLI(li, e);
                    }
                    if (e) {
                        const eventArgs = this.selectEventData(li, e);
                        const checkIcon = li.querySelector('.' + classNames.checkboxIcon);
                        merge(eventArgs, { isChecked: checkIcon.classList.contains(classNames.checked) });
                        const checkboxElement = li.querySelector('.' + classNames.checkboxWrapper);
                        const isCheckedBefore = checkIcon.classList.contains(classNames.checked);
                        const isFocusedBefore = li.classList.contains(classNames.focused);
                        this.handleCheckboxState(li, checkIcon, checkboxElement, isCheckedBefore, isFocusedBefore, eventArgs, false);
                    }
                }
                else if (li.classList.contains(classNames.hasChild)) {
                    this.removeHover();
                    this.removeSelect();
                    this.removeSelect(li);
                    this.setSelectLI(li, e);
                    li.classList.remove(classNames.selected);
                }
                else {
                    this.setCheckboxLI(li, e);
                    if ((target.nodeName === 'INPUT') || (target.nodeName === 'TEXTAREA')) {
                        target.classList.add('e-focused');
                        this.targetElement = target;
                    }
                }
            }
            else {
                this.setSelectLI(li, e);
                if ((target.nodeName === 'INPUT') || (target.nodeName === 'TEXTAREA')) {
                    target.classList.add('e-focused');
                    this.targetElement = target;
                }
            }
            closestElement = closest(e.target, 'li');
            if (!isNullOrUndefined(closestElement)) {
                if (closestElement.classList.contains('e-has-child') &&
                    !e.target.parentElement.classList.contains('e-listview-checkbox')) {
                    closestElement.classList.add(classNames.disable);
                }
            }
        }
        this.updateSelectedId();
    }
    removeElement(element) {
        return element && element.parentNode && element.parentNode.removeChild(element);
    }
    hoverHandler(e) {
        const curLi = closest(e.target.parentNode, '.' + classNames.listItem);
        this.setHoverLI(curLi);
    }
    leaveHandler() {
        this.removeHover();
    }
    homeKeyHandler(e, end) {
        e.preventDefault();
        if (Object.keys(this.dataSource).length && this.curUL) {
            const li = this.curUL.querySelectorAll('.' + classNames.listItem);
            const focusedElement = this.curUL.querySelector('.' + classNames.focused) ||
                this.curUL.querySelector('.' + classNames.selected);
            if (focusedElement) {
                focusedElement.classList.remove(classNames.focused);
                if (!this.showCheckBox) {
                    focusedElement.classList.remove(classNames.selected);
                }
            }
            const index = !end ? 0 : li.length - 1;
            if (li[index].classList.contains(classNames.hasChild) || this.showCheckBox) {
                li[index].classList.add(classNames.focused);
            }
            else {
                this.setSelectLI(li[index], e);
            }
            if (li[index]) {
                this.element.setAttribute('aria-activedescendant', li[index].id.toString());
            }
            else {
                this.element.removeAttribute('aria-activedescendant');
            }
        }
    }
    onArrowKeyDown(e, prev) {
        let siblingLI;
        let li;
        const hasChild = !isNullOrUndefined(this.curUL.querySelector('.' + classNames.hasChild)) ? true : false;
        if (hasChild || this.showCheckBox) {
            li = this.curUL.querySelector('.' + classNames.focused) || this.curUL.querySelector('.' + classNames.selected);
            siblingLI = ListBase.getSiblingLI(this.curUL.querySelectorAll('.' + classNames.listItem), li, prev);
            if (!isNullOrUndefined(siblingLI)) {
                if (li) {
                    li.classList.remove(classNames.focused);
                    if (!this.showCheckBox) {
                        li.classList.remove(classNames.selected);
                    }
                }
                if (siblingLI.classList.contains(classNames.hasChild) || this.showCheckBox) {
                    siblingLI.classList.add(classNames.focused);
                }
                else {
                    this.setSelectLI(siblingLI, e);
                }
            }
        }
        else {
            li = this.curUL.querySelector('.' + classNames.selected);
            siblingLI = ListBase.getSiblingLI(this.curUL.querySelectorAll('.' + classNames.listItem), li, prev);
            this.setSelectLI(siblingLI, e);
        }
        if (siblingLI) {
            this.element.setAttribute('aria-activedescendant', siblingLI.id.toString());
        }
        else {
            this.element.removeAttribute('aria-activedescendant');
        }
        return siblingLI;
    }
    arrowKeyHandler(e, prev) {
        e.preventDefault();
        if (Object.keys(this.dataSource).length && this.curUL) {
            const siblingLI = this.onArrowKeyDown(e, prev);
            const elementTop = this.element.getBoundingClientRect().top;
            const elementHeight = this.element.getBoundingClientRect().height;
            const firstItemBounds = this.curUL.querySelector('.' + classNames.listItem).getBoundingClientRect();
            let heightDiff;
            let groupItemBounds;
            if (this.fields.groupBy) {
                groupItemBounds = this.curUL.querySelector('.' + classNames.groupListItem).getBoundingClientRect();
            }
            if (siblingLI) {
                const siblingTop = siblingLI.getBoundingClientRect().top;
                const siblingHeight = siblingLI.getBoundingClientRect().height;
                if (!prev) {
                    const height = this.isWindow ? window.innerHeight : elementHeight;
                    heightDiff = this.isWindow ? (siblingTop + siblingHeight) :
                        ((siblingTop - elementTop) + siblingHeight);
                    if (heightDiff > height) {
                        if (this.isWindow === true) {
                            window.scroll(0, pageYOffset + (heightDiff - height));
                        }
                        else {
                            this.element.scrollTop = this.element.scrollTop + (heightDiff - height);
                        }
                    }
                }
                else {
                    heightDiff = this.isWindow ? siblingTop : (siblingTop - elementTop);
                    if (heightDiff < 0) {
                        if (this.isWindow === true) {
                            window.scroll(0, pageYOffset + heightDiff);
                        }
                        else {
                            this.element.scrollTop = this.element.scrollTop + heightDiff;
                        }
                    }
                }
            }
            else if (this.enableVirtualization && prev && this.virtualizationModule.uiFirstIndex) {
                this.onUIScrolled = () => {
                    this.onArrowKeyDown(e, prev);
                    this.onUIScrolled = undefined;
                };
                heightDiff = this.virtualizationModule.listItemHeight;
                if (this.isWindow === true) {
                    window.scroll(0, pageYOffset - heightDiff);
                }
                else {
                    this.element.scrollTop = this.element.scrollTop - heightDiff;
                }
            }
            else if (prev) {
                if (this.showHeader && this.headerEle) {
                    const topHeight = groupItemBounds ? groupItemBounds.top : firstItemBounds.top;
                    const headerBounds = this.headerEle.getBoundingClientRect();
                    heightDiff = headerBounds.top < 0 ? (headerBounds.height - topHeight) : 0;
                    if (this.isWindow === true) {
                        window.scroll(0, pageYOffset - heightDiff);
                    }
                    else {
                        this.element.scrollTop = 0;
                    }
                }
                else if (this.fields.groupBy) {
                    heightDiff = this.isWindow ? (groupItemBounds.top < 0 ? groupItemBounds.top : 0) :
                        (elementTop - firstItemBounds.top) + groupItemBounds.height;
                    if (this.isWindow === true) {
                        window.scroll(0, pageYOffset + heightDiff);
                    }
                    else {
                        this.element.scrollTop = this.element.scrollTop - heightDiff;
                    }
                }
            }
        }
    }
    enterKeyHandler(e) {
        if (Object.keys(this.dataSource).length && this.curUL) {
            const hasChild = !isNullOrUndefined(this.curUL.querySelector('.' + classNames.hasChild)) ? true : false;
            const li = this.curUL.querySelector('.' + classNames.focused);
            if (hasChild && li) {
                li.classList.remove(classNames.focused);
                if (this.showCheckBox) {
                    this.removeSelect();
                    this.removeSelect(li);
                    this.removeHover();
                }
                this.setSelectLI(li, e);
            }
        }
    }
    spaceKeyHandler(e) {
        if (this.enable && this.showCheckBox && Object.keys(this.dataSource).length && this.curUL) {
            e.preventDefault();
            const li = this.curUL.querySelector('.' + classNames.focused);
            let checkboxElement;
            let checkIcon;
            if (!isNullOrUndefined(li) && isNullOrUndefined(li.querySelector('.' + classNames.checked))) {
                const args = {
                    curData: undefined, dataSource: undefined, fields: undefined, options: undefined,
                    text: undefined, item: li
                };
                checkboxElement = args.item.querySelector('.' + classNames.checkboxWrapper);
                this.checkInternally(args, checkboxElement);
                checkIcon = checkboxElement.querySelector('.' + classNames.checkboxIcon + '.' + classNames.icon);
            }
            else {
                this.uncheckItem(li);
            }
            const eventArgs = this.selectEventData(li, e);
            merge(eventArgs, { isChecked: checkIcon ? checkIcon.classList.contains(classNames.checked) : false });
            if (!isNullOrUndefined(li)) {
                const cbElement = li.querySelector('.' + classNames.checkboxWrapper);
                const checkboxIcon = li.querySelector('.' + classNames.checkboxIcon);
                const isCheckedBefore = checkboxIcon.classList.contains(classNames.checked);
                const isFocusedBefore = li.classList.contains(classNames.focused);
                this.handleCheckboxState(li, checkboxIcon, cbElement, isCheckedBefore, isFocusedBefore, eventArgs, false);
            }
            this.updateSelectedId();
        }
    }
    keyActionHandler(e) {
        switch (e.keyCode) {
            case 36:
                this.homeKeyHandler(e);
                break;
            case 35:
                this.homeKeyHandler(e, true);
                break;
            case 40:
                this.arrowKeyHandler(e);
                break;
            case 38:
                this.arrowKeyHandler(e, true);
                break;
            case 13:
                this.enterKeyHandler(e);
                break;
            case 8:
                if (this.showCheckBox && this.curDSLevel[this.curDSLevel.length - 1]) {
                    this.uncheckAllItems();
                }
                this.back();
                break;
            case 32:
                if (isNullOrUndefined(this.targetElement) || !(this.targetElement.classList.contains('e-focused'))) {
                    this.spaceKeyHandler(e);
                }
                break;
        }
    }
    swipeActionHandler(e) {
        if (e.swipeDirection === 'Right' && e.velocity > swipeVelocity && e.originalEvent.type === 'touchend') {
            if (this.showCheckBox && this.curDSLevel[this.curDSLevel.length - 1]) {
                this.uncheckAllItems();
            }
            this.back();
        }
    }
    focusout() {
        if (Object.keys(this.dataSource).length && this.curUL) {
            const focusedElement = this.curUL.querySelector('.' + classNames.focused);
            if (focusedElement) {
                focusedElement.classList.remove(classNames.focused);
                if (!this.showCheckBox && !isNullOrUndefined(this.selectedLI)) {
                    this.selectedLI.classList.add(classNames.selected);
                }
            }
        }
    }
    wireEvents() {
        EventHandler.add(this.element, 'keydown', this.keyActionHandler, this);
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'mouseover', this.hoverHandler, this);
        EventHandler.add(this.element, 'mouseout', this.leaveHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusout, this);
        this.touchModule = new Touch(this.element, { swipe: this.swipeActionHandler.bind(this) });
        if (!isNullOrUndefined(this.scroll)) {
            EventHandler.add(this.element, 'scroll', this.onListScroll, this);
        }
    }
    unWireEvents() {
        EventHandler.remove(this.element, 'keydown', this.keyActionHandler);
        EventHandler.remove(this.element, 'click', this.clickHandler);
        EventHandler.remove(this.element, 'mouseover', this.hoverHandler);
        EventHandler.remove(this.element, 'mouseout', this.leaveHandler);
        EventHandler.remove(this.element, 'mouseover', this.hoverHandler);
        EventHandler.remove(this.element, 'mouseout', this.leaveHandler);
        EventHandler.remove(this.element, 'focusout', this.focusout);
        if (!isNullOrUndefined(this.scroll)) {
            EventHandler.remove(this.element, 'scroll', this.onListScroll);
        }
        if (this.touchModule) {
            this.touchModule.destroy();
        }
        this.touchModule = null;
    }
    removeFocus() {
        const focusedLI = this.element.querySelectorAll('.' + classNames.focused);
        for (const ele of focusedLI) {
            ele.classList.remove(classNames.focused);
        }
    }
    removeHover() {
        const hoverLI = this.element.querySelector('.' + classNames.hover);
        if (hoverLI) {
            hoverLI.classList.remove(classNames.hover);
        }
    }
    removeSelect(li) {
        if (isNullOrUndefined(li)) {
            const selectedLI = this.element.querySelectorAll('.' + classNames.selected);
            for (const ele of selectedLI) {
                if (this.showCheckBox && ele.querySelector('.' + classNames.checked)) {
                    continue;
                }
                else {
                    ele.classList.remove(classNames.selected);
                }
            }
        }
        else {
            li.classList.remove(classNames.selected);
        }
    }
    isValidLI(li) {
        return (li && li.classList.contains(classNames.listItem)
            && !li.classList.contains(classNames.groupListItem)
            && !li.classList.contains(classNames.disable));
    }
    setCheckboxLI(li, e) {
        if (this.isValidLI(li) && this.enable && this.showCheckBox) {
            if (this.curUL.querySelector('.' + classNames.focused)) {
                this.curUL.querySelector('.' + classNames.focused).classList.remove(classNames.focused);
            }
            const textAreaFocus = li.querySelector('textarea') || li.querySelector('input');
            li.classList.add(classNames.focused);
            if (!isNullOrUndefined(e)) {
                if (e.target === textAreaFocus) {
                    textAreaFocus.classList.add('e-focused');
                }
            }
            const checkboxElement = li.querySelector('.' + classNames.checkboxWrapper);
            const checkIcon = checkboxElement.querySelector('.' + classNames.checkboxIcon + '.' + classNames.icon);
            this.removeHover();
            const isCheckedBefore = checkIcon.classList.contains(classNames.checked);
            const isFocusedBefore = li.classList.contains(classNames.focused);
            if (!isCheckedBefore) {
                checkIcon.classList.add(classNames.checked);
                li.classList.add(classNames.selected);
            }
            else {
                checkIcon.classList.remove(classNames.checked);
                li.classList.remove(classNames.selected);
            }
            checkboxElement.setAttribute('aria-checked', checkIcon.classList.contains(classNames.checked) ?
                'true' : 'false');
            const eventArgs = this.selectEventData(li, e);
            merge(eventArgs, { isChecked: checkIcon.classList.contains(classNames.checked) });
            if (this.enableVirtualization) {
                this.virtualizationModule.setCheckboxLI(li, e);
            }
            this.handleCheckboxState(li, checkIcon, checkboxElement, isCheckedBefore, isFocusedBefore, eventArgs, true, textAreaFocus);
            this.setSelectedItemData(li);
            this.renderSubList(li);
        }
    }
    selectEventData(li, e) {
        const data = this.getItemData(li);
        const fieldData = getFieldValues(data, this.listBaseOption.fields);
        let selectedItem;
        if (!isNullOrUndefined(data)
            && typeof this.dataSource[0] === 'string' || typeof this.dataSource[0] === 'number') {
            selectedItem = { item: li, text: li && li.innerText.trim(), data: this.dataSource };
        }
        else {
            selectedItem =
                {
                    item: li, text: fieldData && fieldData[this.listBaseOption.fields.text],
                    data: data
                };
        }
        const eventArgs = {};
        merge(eventArgs, selectedItem);
        if (e) {
            merge(eventArgs, {
                isInteracted: true,
                event: e,
                cancel: false,
                index: this.curUL && Array.prototype.indexOf.call(this.curUL.children, li)
            });
        }
        return eventArgs;
    }
    setSelectedItemData(li) {
        const data = this.getItemData(li);
        const fieldData = getFieldValues(data, this.listBaseOption.fields);
        if (!isNullOrUndefined(data) && ((typeof this.dataSource[0] === 'string') ||
            (typeof this.dataSource[0] === 'number'))) {
            this.selectedItems = {
                item: li,
                text: li && li.innerText.trim(),
                data: this.dataSource
            };
        }
        else {
            this.selectedItems = {
                item: li,
                text: fieldData && fieldData[this.listBaseOption.fields.text],
                data: data
            };
        }
    }
    setSelectLI(li, e) {
        if (this.isValidLI(li) && !li.classList.contains(classNames.selected) && this.enable) {
            if (!this.showCheckBox) {
                this.removeSelect();
            }
            li.classList.add(classNames.selected);
            this.removeHover();
            this.setSelectedItemData(li);
            if (this.enableVirtualization) {
                this.virtualizationModule.setSelectLI(li, e);
            }
            const eventArgs = this.selectEventData(li, e);
            this.trigger('select', eventArgs, (observedArgs) => {
                if (!observedArgs.cancel) {
                    this.selectedLI = li;
                    this.renderSubList(li);
                }
                else {
                    li.classList.remove(classNames.selected);
                    this.selectedLI = li;
                }
            });
        }
    }
    setHoverLI(li) {
        if (this.isValidLI(li) && !li.classList.contains(classNames.hover) && this.enable) {
            const lastLi = this.element.querySelectorAll('.' + classNames.hover);
            if (lastLi && lastLi.length) {
                removeClass(lastLi, classNames.hover);
            }
            if (!li.classList.contains(classNames.selected) || this.showCheckBox) {
                li.classList.add(classNames.hover);
            }
        }
    }
    //Data Source Related Functions
    getSubDS() {
        const levelKeys = this.curDSLevel;
        if (levelKeys.length) {
            let ds = this.localData;
            for (const key of levelKeys) {
                const field = {};
                field[this.fields.id] = key;
                this.curDSJSON = this.findItemFromDS(ds, field);
                const fieldData = getFieldValues(this.curDSJSON, this.listBaseOption.fields);
                ds = this.curDSJSON ? fieldData[this.fields.child] : ds;
            }
            return ds;
        }
        return this.localData;
    }
    getItemData(li) {
        const dataSource = this.dataSource instanceof DataManager ?
            this.localData : this.dataSource;
        const fields = this.getElementUID(li);
        let curDS;
        if (isNullOrUndefined(this.element.querySelector('.' + classNames.hasChild)) && this.fields.groupBy) {
            curDS = this.curViewDS;
        }
        else {
            curDS = dataSource;
        }
        return this.findItemFromDS(curDS, fields);
    }
    findItemFromDS(dataSource, fields, parent) {
        let resultJSON;
        if (dataSource && dataSource.length && fields) {
            dataSource.some((data) => {
                const fieldData = getFieldValues(data, this.listBaseOption.fields);
                //(!(fid) || id === fid) && (!(ftext) || text === ftext) && (!!fid || !!ftext)
                if ((fields[this.fields.id] || fields[this.fields.text]) &&
                    (!fields[this.fields.id] || (!isNullOrUndefined(fieldData[this.fields.id]) &&
                        fieldData[this.fields.id].toString()) === fields[this.fields.id].toString()) &&
                    (!fields[this.fields.text] || fieldData[this.fields.text] === fields[this.fields.text])) {
                    resultJSON = (parent ? dataSource : data);
                }
                else if (typeof data !== 'object' && dataSource.indexOf(data) !== -1) {
                    resultJSON = (parent ? dataSource : data);
                }
                else if (!isNullOrUndefined(fields[this.fields.id]) && isNullOrUndefined(fieldData[this.fields.id])) {
                    const li = this.element.querySelector('[data-uid="'
                        + fields[this.fields.id] + '"]');
                    if (li && li.innerText.trim() === fieldData[this.fields.text]) {
                        resultJSON = data;
                    }
                }
                else if (Object.prototype.hasOwnProperty.call(fieldData, this.fields.child) &&
                    fieldData[this.fields.child].length) {
                    resultJSON = this.findItemFromDS(fieldData[this.fields.child], fields, parent);
                }
                return !!resultJSON;
            });
        }
        else {
            resultJSON = dataSource;
        }
        return resultJSON;
    }
    getQuery() {
        const columns = [];
        const query = (this.query ? this.query : new Query());
        if (!this.query) {
            for (const column of Object.keys(this.fields.properties)) {
                if (column !== 'tableName' && !!(this.fields[`${column}`]) &&
                    this.fields[`${column}`] !==
                        ListBase.defaultMappedFields[`${column}`]
                    && columns.indexOf(this.fields[`${column}`]) === -1) {
                    columns.push(this.fields[`${column}`]);
                }
            }
            query.select(columns);
            if (Object.prototype.hasOwnProperty.call(this.fields.properties, 'tableName')) {
                query.from(this.fields.tableName);
            }
        }
        return query;
    }
    setViewDataSource(dataSource = this.localData) {
        const fieldValue = (isNullOrUndefined(this.fields.sortBy)) ? this.fields.text : this.fields.sortBy;
        const query = ListBase.addSorting(this.sortOrder, fieldValue);
        if (dataSource && this.fields.groupBy) {
            if (this.sortOrder !== 'None') {
                this.curViewDS = ListBase.groupDataSource(ListBase.getDataSource(dataSource, query), this.listBaseOption.fields, this.sortOrder);
            }
            else {
                this.curViewDS = ListBase.groupDataSource(dataSource, this.listBaseOption.fields, this.sortOrder);
            }
        }
        else if (dataSource && this.sortOrder !== 'None') {
            this.curViewDS = ListBase.getDataSource(dataSource, query);
        }
        else {
            this.curViewDS = dataSource;
        }
    }
    isInAnimation() {
        return this.curUL.classList.contains('.e-animate');
    }
    renderRemoteLists(e, listViewComponent) {
        if (this.isDestroyed) {
            return;
        }
        this.localData = e.result;
        listViewComponent.removeElement(listViewComponent.contentContainer);
        this.renderList();
        this.trigger('actionComplete', e);
    }
    triggerActionFailure(e) {
        if (this.isDestroyed) {
            return;
        }
        this.trigger('actionFailure', e);
    }
    setLocalData() {
        this.trigger('actionBegin');
        if (this.dataSource instanceof DataManager) {
            if (this.dataSource.ready) {
                this.dataSource.ready.then((e) => {
                    this.isOffline = this.dataSource.dataSource.offline;
                    if (this.dataSource instanceof DataManager && this.isOffline) {
                        this.renderRemoteLists(e, this);
                    }
                }).catch((e) => {
                    this.triggerActionFailure(e);
                });
            }
            else {
                this.dataSource.executeQuery(this.getQuery()).then((e) => {
                    this.renderRemoteLists(e, this);
                }).catch((e) => {
                    this.triggerActionFailure(e);
                });
            }
        }
        else if (!this.dataSource || !this.dataSource.length) {
            const ul = this.element.querySelector('ul');
            if (ul) {
                remove(ul);
                this.setProperties({ dataSource: ListBase.createJsonFromElement(ul) }, true);
                this.localData = this.dataSource;
                this.renderList();
                this.trigger('actionComplete', { data: this.localData });
            }
        }
        else {
            this.localData = this.dataSource;
            this.renderList();
            this.trigger('actionComplete', { data: this.localData });
        }
    }
    reRender() {
        this.removeElement(this.headerEle);
        this.removeElement(this.ulElement);
        this.removeElement(this.contentContainer);
        if (this.isReact) {
            this.clearTemplate();
        }
        if (Object.keys(window).indexOf('ejsInterop') === -1) {
            this.element.innerHTML = '';
        }
        this.headerEle = this.ulElement = this.liCollection = undefined;
        this.header();
        this.setLocalData();
    }
    resetCurrentList() {
        this.setViewDataSource(this.curViewDS);
        this.contentContainer.innerHTML = '';
        this.createList();
        this.renderIntoDom(this.curUL);
    }
    setAttributes(liElements) {
        for (let i = 0; i < liElements.length; i++) {
            const element = liElements[parseInt(i.toString(), 10)];
            if (element.classList.contains('e-list-item')) {
                element.setAttribute('id', this.element.id + '_' + element.getAttribute('data-uid'));
                element.setAttribute('tabindex', '-1');
            }
        }
    }
    createList() {
        this.currentLiElements = [];
        this.isNestedList = false;
        this.ulElement = this.curUL = ListBase.createList(this.createElement, this.curViewDS, this.listBaseOption, null, this);
        this.liCollection = this.curUL.querySelectorAll('.' + classNames.listItem);
        this.setAttributes(this.liCollection);
    }
    renderSubList(li) {
        this.liElement = li;
        const uID = li.getAttribute('data-uid');
        if (li.classList.contains(classNames.hasChild) && uID) {
            const ul = closest(li.parentNode, '.' + classNames.parentItem);
            let ele = this.element.querySelector('[pid=\'' + uID + '\']');
            this.curDSLevel.push(uID);
            this.setViewDataSource(this.getSubDS());
            if (this.enableVirtualization) {
                this.virtualizationModule.updateDOMItemCount();
            }
            if (!ele) {
                const data = this.curViewDS;
                ele = ListBase.createListFromJson(this.createElement, data, this.listBaseOption, this.curDSLevel.length, null, this);
                if (this.isReact) {
                    this.renderReactTemplates();
                }
                const lists = ele.querySelectorAll('.' + classNames.listItem);
                this.setAttributes(lists);
                ele.setAttribute('pID', uID);
                ele.style.display = 'none';
                this.renderIntoDom(ele);
            }
            this.switchView(ul, ele);
            this.liCollection = this.curUL.querySelectorAll('.' + classNames.listItem);
            if (this.selectedItems) {
                const fieldData = getFieldValues(this.selectedItems.data, this.listBaseOption.fields);
                this.header((fieldData[this.listBaseOption.fields.text]), true, 'header');
            }
            this.selectedLI = undefined;
        }
    }
    renderIntoDom(ele) {
        this.contentContainer.appendChild(ele);
    }
    renderList(data) {
        this.setViewDataSource(data);
        if (this.enableVirtualization) {
            if (Object.keys(this.dataSource).length) {
                if ((this.template || this.groupTemplate) && !this.virtualizationModule.isNgTemplate()) {
                    this.listBaseOption.itemCreated = this.virtualizationModule.createUIItem.bind(this.virtualizationModule);
                }
            }
            this.virtualizationModule.uiVirtualization();
        }
        else {
            this.createList();
            this.contentContainer = this.createElement('div', { className: classNames.container });
            this.element.appendChild(this.contentContainer);
            this.renderIntoDom(this.ulElement);
            if (this.isReact) {
                this.renderReactTemplates();
            }
        }
    }
    getElementUID(obj) {
        let fields = {};
        if (obj instanceof Element) {
            fields[this.fields.id] = obj.getAttribute('data-uid');
        }
        else {
            fields = obj;
        }
        return fields;
    }
    /**
     * Initializes the ListView component rendering.
     */
    render() {
        this.element.classList.add(classNames.root);
        attributes(this.element, { tabindex: '0' });
        this.setCSSClass();
        this.setEnableRTL();
        this.setEnable();
        this.setSize();
        this.wireEvents();
        this.header();
        this.setLocalData();
        this.setHTMLAttribute();
        this.rippleFn = rippleEffect(this.element, {
            selector: '.' + classNames.listItem
        });
        this.renderComplete();
        this.previousScrollTop = this.element.scrollTop;
    }
    /**
     * It is used to destroy the ListView component.
     */
    destroy() {
        if (this.isReact) {
            this.clearTemplate();
        }
        this.unWireEvents();
        const classAr = [classNames.root, classNames.disable, 'e-rtl',
            'e-has-header', 'e-lib'].concat(this.cssClass ? this.cssClass.split(' ').filter((css) => css) : []);
        removeClass([this.element], classAr);
        this.element.removeAttribute('role');
        this.element.removeAttribute('tabindex');
        this.curUL = this.ulElement = this.liCollection = this.headerEle = undefined;
        this.element.innerHTML = '';
        this.contentContainer = null;
        this.selectedItems = null;
        this.selectedLI = null;
        this.liElement = null;
        this.targetElement = null;
        this.currentLiElements = null;
        this.virtualCheckBox = null;
        super.destroy();
    }
    /**
     * Switches back from the navigated sub list item.
     */
    back() {
        const pID = this.curDSLevel[this.curDSLevel.length - 1];
        if (pID === undefined || this.isInAnimation()) {
            return;
        }
        this.curDSLevel.pop();
        this.setViewDataSource(this.getSubDS());
        if (this.enableVirtualization) {
            this.virtualizationModule.updateDOMItemCount();
        }
        let toUL = this.element.querySelector('[data-uid=\'' + pID + '\']');
        const fromUL = this.curUL;
        if (!toUL) {
            this.createList();
            this.renderIntoDom(this.ulElement);
            toUL = this.curUL;
        }
        else {
            toUL = toUL.parentElement;
        }
        const fieldData = getFieldValues(this.curDSJSON, this.listBaseOption.fields);
        const text = fieldData[this.fields.text];
        this.switchView(fromUL, toUL, true);
        this.removeFocus();
        const li = this.element.querySelector('[data-uid=\'' + pID + '\']');
        li.classList.remove(classNames.disable);
        li.classList.add(classNames.focused);
        if (!(this.showCheckBox && li.querySelector('.' + classNames.checkboxIcon).classList.contains(classNames.checked))) {
            li.classList.remove(classNames.selected);
        }
        this.liCollection = this.curUL.querySelectorAll('.' + classNames.listItem);
        if (this.enableHtmlSanitizer) {
            this.setProperties({ headerTitle: SanitizeHtmlHelper.sanitize(this.headerTitle) }, true);
        }
        this.header((this.curDSLevel.length ? text : this.headerTitle), (this.curDSLevel.length ? true : false), 'header');
    }
    /**
     * Selects the list item from the ListView by passing the elements or field object.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    selectItem(item) {
        if (this.enableVirtualization) {
            this.virtualizationModule.selectItem(item);
        }
        else if (this.showCheckBox) {
            this.setCheckboxLI(this.getLiFromObjOrElement(item));
        }
        else {
            if (isNullOrUndefined(item) === true) {
                this.removeSelect();
            }
            else {
                this.setSelectLI(this.getLiFromObjOrElement(item));
            }
        }
    }
    /**
     * This method allows for deselecting a list item within the ListView. The item to be deselected can be specified by passing the element or field object.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass an element Object or Fields as an Object with ID and Text fields.
     */
    unselectItem(item) {
        if (isNullOrUndefined(item)) {
            this.removeSelect();
        }
        else {
            const li = this.getLiFromObjOrElement(item);
            if (!isNullOrUndefined(li)) {
                this.removeSelect(li);
            }
        }
    }
    getLiFromObjOrElement(obj) {
        let li;
        const dataSource = this.dataSource instanceof DataManager ?
            this.localData : this.dataSource;
        if (!isNullOrUndefined(obj)) {
            if (typeof dataSource[0] === 'string' || typeof dataSource[0] === 'number') {
                if (obj instanceof Element) {
                    const uid = obj.getAttribute('data-uid').toString();
                    for (let i = 0; i < this.liCollection.length; i++) {
                        if (this.liCollection[parseInt(i.toString(), 10)].getAttribute('data-uid').toString() === uid) {
                            li = this.liCollection[parseInt(i.toString(), 10)];
                            break;
                        }
                    }
                }
                else {
                    Array.prototype.some.call(this.curUL.querySelectorAll('.' + classNames.listItem), (item) => {
                        if (item.innerText.trim() === obj.toString()) {
                            li = item;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
            else {
                const resultJSON = this.getItemData(obj);
                const fieldData = getFieldValues(resultJSON, this.listBaseOption.fields);
                if (resultJSON) {
                    li = this.element.querySelector('[data-uid="'
                        + fieldData[this.fields.id] + '"]');
                    if (!this.enableVirtualization && isNullOrUndefined(li)) {
                        const curLi = this.element.querySelectorAll('.' + classNames.listItem);
                        for (let i = 0; i < curLi.length; i++) {
                            if (curLi[parseInt(i.toString(), 10)].innerText.trim() ===
                                fieldData[this.fields.text]) {
                                li = curLi[parseInt(i.toString(), 10)];
                            }
                        }
                    }
                }
            }
        }
        return li;
    }
    /**
     * Selects multiple list items from the ListView.
     *
     * @param  {Fields[] | HTMLElement[] | Element[]} item - We can pass array of
     *  elements or array of fields Object with ID and Text fields.
     */
    selectMultipleItems(item) {
        if (!isNullOrUndefined(item)) {
            for (let i = 0; i < item.length; i++) {
                if (!isNullOrUndefined(item[parseInt(i.toString(), 10)])) {
                    this.selectItem(item[parseInt(i.toString(), 10)]);
                }
            }
        }
    }
    getParentId() {
        const parentId = [];
        if (this.isNestedList) {
            for (let i = this.curDSLevel.length - 1; i >= 0; i--) {
                parentId.push(this.curDSLevel[parseInt(i.toString(), 10)]);
            }
        }
        return parentId;
    }
    updateSelectedId() {
        this.selectedId = [];
        const liCollection = this.curUL.getElementsByClassName(classNames.selected);
        for (let i = 0; i < liCollection.length; i++) {
            const tempData = this.getItemData(liCollection[parseInt(i.toString(), 10)]);
            if (!isNullOrUndefined(tempData) && tempData[this.listBaseOption.fields.id]) {
                this.selectedId.push(tempData[this.listBaseOption.fields.id]);
            }
        }
    }
    /**
     * Gets the details of the currently selected item from the list items.
     *
     */
    getSelectedItems() {
        let finalValue;
        let isCompleted = false;
        this.selectedId = [];
        const dataSource = this.dataSource instanceof DataManager ?
            this.localData : this.dataSource;
        if (this.enableVirtualization && !isCompleted) {
            finalValue = this.virtualizationModule.getSelectedItems();
            isCompleted = true;
        }
        else if (this.showCheckBox && !isCompleted) {
            const liCollection = this.curUL.getElementsByClassName(classNames.selected);
            const liTextCollection = [];
            const liDataCollection = [];
            this.selectedId = [];
            const dataParent = [];
            for (let i = 0; i < liCollection.length; i++) {
                if (typeof dataSource[0] === 'string' || typeof dataSource[0] === 'number') {
                    liTextCollection.push(liCollection[parseInt(i.toString(), 10)].innerText.trim());
                }
                else {
                    const tempData = this.getItemData(liCollection[parseInt(i.toString(), 10)]);
                    const fieldData = getFieldValues(tempData, this.listBaseOption.fields);
                    if (this.isNestedList) {
                        dataParent.push({ data: tempData, parentId: this.getParentId() });
                    }
                    else {
                        liDataCollection.push(tempData);
                    }
                    if (fieldData) {
                        liTextCollection.push(fieldData[this.listBaseOption.fields.text]);
                        this.selectedId.push(fieldData[this.listBaseOption.fields.id]);
                    }
                    else {
                        liTextCollection.push(undefined);
                        this.selectedId.push(undefined);
                    }
                }
            }
            if ((typeof dataSource[0] === 'string'
                || typeof dataSource[0] === 'number')
                && !isCompleted) {
                finalValue = { item: liCollection, data: dataSource, text: liTextCollection };
                isCompleted = true;
            }
            if (this.isNestedList && !isCompleted) {
                finalValue = { item: liCollection, data: dataParent, text: liTextCollection };
                isCompleted = true;
            }
            else if (!isCompleted) {
                finalValue = { item: liCollection, data: liDataCollection, text: liTextCollection };
                isCompleted = true;
            }
        }
        else if (!isCompleted) {
            const liElement = this.element.getElementsByClassName(classNames.selected)[0];
            const fieldData = getFieldValues(this.getItemData(liElement), this.listBaseOption.fields);
            if ((typeof dataSource[0] === 'string'
                || typeof dataSource[0] === 'number')
                && !isCompleted) {
                finalValue = (!isNullOrUndefined(liElement)) ? {
                    item: liElement, data: dataSource,
                    text: liElement.innerText.trim()
                } : undefined;
                isCompleted = true;
            }
            else if (!isCompleted) {
                if (isNullOrUndefined(fieldData) || isNullOrUndefined(liElement)) {
                    finalValue = undefined;
                    isCompleted = true;
                }
                else {
                    this.selectedId.push(fieldData[this.listBaseOption.fields.id]);
                    finalValue = {
                        text: fieldData[this.listBaseOption.fields.text], item: liElement,
                        data: this.getItemData(liElement)
                    };
                    isCompleted = true;
                }
            }
        }
        return finalValue;
    }
    /**
     * Finds out an item details from the current list.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    findItem(item) {
        return this.getItemData(item);
    }
    /**
     * Enables the disabled list items by passing the Id and text fields.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    enableItem(item) {
        this.setItemState(item, true);
        if (this.enableVirtualization) {
            this.virtualizationModule.enableItem(item);
        }
    }
    /**
     * Disables the list items by passing the Id and text fields.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    disableItem(item) {
        this.setItemState(item, false);
        if (this.enableVirtualization) {
            this.virtualizationModule.disableItem(item);
        }
    }
    //A function that used to set state of the list item like enable, disable.
    setItemState(item, isEnable) {
        const resultJSON = this.getItemData(item);
        const fieldData = getFieldValues(resultJSON, this.listBaseOption.fields);
        if (resultJSON) {
            const li = this.element.querySelector('[data-uid="' + fieldData[this.fields.id] + '"]');
            if (isEnable) {
                if (li) {
                    li.classList.remove(classNames.disable);
                }
                delete resultJSON[this.fields.enabled];
            }
            else if (!isEnable) {
                if (li) {
                    li.classList.add(classNames.disable);
                }
                resultJSON[this.fields.enabled] = false;
            }
        }
    }
    /**
     * Shows the hide list item from the ListView.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    showItem(item) {
        this.showHideItem(item, false, '');
        if (this.enableVirtualization) {
            this.virtualizationModule.showItem(item);
        }
    }
    /**
     * Hides an list item from the ListView.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    hideItem(item) {
        this.showHideItem(item, true, 'none');
        if (this.enableVirtualization) {
            this.virtualizationModule.hideItem(item);
        }
    }
    showHideItem(obj, isHide, display) {
        const resultJSON = this.getItemData(obj);
        const fieldData = getFieldValues(resultJSON, this.listBaseOption.fields);
        if (resultJSON) {
            const li = this.element.querySelector('[data-uid="' + fieldData[this.fields.id] + '"]');
            if (li) {
                li.style.display = display;
            }
            if (isHide) {
                resultJSON[this.fields.isVisible] = false;
            }
            else {
                delete resultJSON[this.fields.isVisible];
            }
        }
    }
    /**
     * Adds the new list item(s) to the current ListView.
     * To add a new list item(s) in the ListView, we need to pass the `data` as an array of items that need
     * to be added and `fields` as the target item to which we need to add the given item(s) as its children.
     * For example fields: { text: 'Name', tooltip: 'Name', id:'id'}
     *
     * @param  {{Object}[]} data - JSON Array Data that need to add.
     *
     * @param  {Fields} fields - Target item to add the given data as its children (can be null).
     *
     * @param {number} index - Indicates the index where the data to be added.
     */
    addItem(data, fields = undefined, index) {
        const dataSource = this.dataSource instanceof DataManager
            ? this.localData : this.dataSource;
        this.addItemInternally(data, fields, dataSource, index);
    }
    addItemInternally(data, fields, dataSource, index) {
        if (data instanceof Array) {
            if (this.enableVirtualization) {
                this.virtualizationModule.addItem(data, fields, dataSource, index);
            }
            else {
                const ds = this.findItemFromDS(dataSource, fields);
                let child;
                if (ds) {
                    const fieldData = getFieldValues(ds, this.listBaseOption.fields);
                    child = fieldData[this.fields.child];
                    if (!child) {
                        child = [];
                    }
                    child = child.concat(data);
                }
                // check for whether target is nested level or top level in list
                if (ds instanceof Array) {
                    for (let i = 0; i < data.length; i++) {
                        dataSource = this.addItemAtIndex(index, dataSource, data[parseInt(i.toString(), 10)]);
                        this.setViewDataSource(dataSource);
                        // since it is top level target, get the content container's first child
                        // as it is always the top level UL
                        const targetUL = this.contentContainer
                            ? this.contentContainer.children[0]
                            : null;
                        // check for whether the list was previously empty or not, if it is
                        // proceed to call initial render
                        if (this.contentContainer && targetUL) {
                            this.addItemIntoDom(data[parseInt(i.toString(), 10)], targetUL, this.curViewDS);
                        }
                        else {
                            this.reRender();
                        }
                    }
                    this.liCollection = this.curUL.querySelectorAll('.' + classNames.listItem);
                }
                else {
                    // proceed as target item is in nested level, only if it is a valid target ds
                    if (ds) {
                        ds[this.fields.child] = child;
                        this.addItemInNestedList(ds, data);
                    }
                }
            }
        }
    }
    addItemAtIndex(index, newDataSource, itemData) {
        const isIndexValid = !(isNullOrUndefined(index)) && index >= 0 &&
            index < newDataSource.length && isNullOrUndefined(this.listBaseOption.fields.groupBy);
        if (isIndexValid) {
            newDataSource.splice(index, 0, itemData);
        }
        else {
            newDataSource.push(itemData);
        }
        return newDataSource;
    }
    addItemInNestedList(targetItemData, itemQueue) {
        const targetItemId = targetItemData[this.fields.id];
        const targetChildDS = targetItemData[this.fields.child];
        const isAlreadyRenderedUL = this.element.querySelector('[pid=\'' + targetItemId + '\']');
        const targetLi = this.element.querySelector('[data-uid=\'' + targetItemId + '\']');
        const targetUL = isAlreadyRenderedUL
            ? isAlreadyRenderedUL
            : targetLi
                ? closest(targetLi, 'ul')
                : null;
        const targetDS = isAlreadyRenderedUL ? targetChildDS : [targetItemData];
        const isTargetEmptyChild = targetLi ? !targetLi.classList.contains(classNames.hasChild) : false;
        // if li element is already rendered, that element needs to be refreshed so that
        // it becomes child viewable due to new child items are added now
        if (isTargetEmptyChild) {
            const targetRefreshedElement = ListBase.createListItemFromJson(this.createElement, targetDS, this.listBaseOption, null, null, this);
            this.setAttributes(targetRefreshedElement);
            targetUL.insertBefore(targetRefreshedElement[0], targetLi);
            detach(targetLi);
        }
        // if it is already rendered element, we need to create and append new elements
        if (isAlreadyRenderedUL && itemQueue) {
            for (let i = 0; i < itemQueue.length; i++) {
                targetDS.push(itemQueue[parseInt(i.toString(), 10)]);
                this.addItemIntoDom(itemQueue[parseInt(i.toString(), 10)], targetUL, targetDS);
            }
        }
    }
    addItemIntoDom(currentItem, targetUL, curViewDS) {
        const index = curViewDS.indexOf(currentItem);
        this.addListItem(currentItem, index, targetUL, curViewDS);
        const curItemDS = curViewDS[index - 1];
        if (curItemDS && curItemDS.isHeader && curItemDS.items.length === 1) {
            this.addListItem(curItemDS, (index - 1), targetUL, curViewDS);
        }
    }
    addListItem(dataSource, index, ulElement, curViewDS) {
        let target = this.getLiFromObjOrElement(curViewDS[index + 1]) ||
            this.getLiFromObjOrElement(curViewDS[index + 2]) || null;
        const li = ListBase.createListItemFromJson(this.createElement, [dataSource], this.listBaseOption, null, null, this);
        this.setAttributes(li);
        if (this.template && this.isReact) {
            this.renderReactTemplates();
        }
        if (this.fields.groupBy && curViewDS[index + 1] && curViewDS[index + 1].isHeader) {
            const targetEle = this.getLiFromObjOrElement(curViewDS[index - 1]);
            if (targetEle) {
                target = targetEle.nextElementSibling;
            }
        }
        ulElement.insertBefore(li[0], target);
    }
    /**
     * Removes the list item from the data source based on a passed
     *  element like fields: { text: 'Name', tooltip: 'Name', id:'id'}
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    removeItem(item) {
        const listDataSource = this.dataSource instanceof DataManager
            ? this.localData : this.dataSource;
        if (this.enableVirtualization) {
            this.virtualizationModule.removeItem(item);
        }
        else {
            this.removeItemFromList(item, listDataSource);
        }
    }
    removeItemFromList(obj, listDataSource) {
        const curViewDS = this.curViewDS;
        const fields = obj instanceof Element ? this.getElementUID(obj) : obj;
        const dataSource = this.findItemFromDS(listDataSource, fields, true);
        if (dataSource) {
            const data = this.findItemFromDS(dataSource, fields);
            const index = curViewDS.indexOf(data);
            const li = this.getLiFromObjOrElement(obj);
            let groupLi;
            this.validateNestedView(li);
            if (this.fields.groupBy && this.curViewDS[index - 1] &&
                curViewDS[index - 1].isHeader &&
                curViewDS[index - 1].items.length === 1) {
                if (li && li.previousElementSibling.classList.contains(classNames.groupListItem) &&
                    (isNullOrUndefined(li.nextElementSibling) || (li.nextElementSibling &&
                        li.nextElementSibling.classList.contains(classNames.groupListItem)))) {
                    groupLi = li.previousElementSibling;
                }
            }
            if (li) {
                detach(li);
            }
            if (groupLi) {
                detach(groupLi);
            }
            const foundData = (dataSource.length - 1) <= 0
                ? this.findParent(this.localData, this.fields.id, (value) => value === data[this.fields.id], null) : null;
            const dsIndex = dataSource.indexOf(data);
            dataSource.splice(dsIndex, 1);
            this.setViewDataSource(listDataSource);
            if (foundData
                && foundData.parent
                && Array.isArray(foundData.parent[this.fields.child])
                && foundData.parent[this.fields.child].length <= 0) {
                const parentLi = this.getLiFromObjOrElement(foundData.parent);
                if (parentLi) {
                    const li = ListBase.createListItemFromJson(this.createElement, [foundData.parent], this.listBaseOption, null, null, this);
                    this.setAttributes(li);
                    parentLi.parentElement.insertBefore(li[0], parentLi);
                    parentLi.parentElement.removeChild(parentLi);
                }
            }
            if (dataSource.length <= 0) {
                this.back();
            }
            this.liCollection = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.listItem));
        }
    }
    // validate before removing an element whether the current view is inside target element's child view
    validateNestedView(li) {
        const liID = li ? li.getAttribute('data-uid').toString().toLowerCase() : null;
        if (liID && this.curDSLevel && this.curDSLevel.length > 0) {
            while (this.curDSLevel.some((id) => id.toString().toLowerCase() === liID)) {
                this.back();
            }
        }
    }
    /**
     * Removes multiple items from the ListView by passing the array of elements or array of field objects.
     *
     * @param  {Fields[] | HTMLElement[] | Element[]} item - We can pass array of elements or array of field Object with ID and Text fields.
     */
    removeMultipleItems(item) {
        if (item.length) {
            for (let i = 0; i < item.length; i++) {
                this.removeItem(item[parseInt(i.toString(), 10)]);
            }
        }
    }
    findParent(dataSource, id, callback, parent) {
        if (Object.prototype.hasOwnProperty.call(dataSource, id) && callback(dataSource[id]) === true) {
            return extend({}, dataSource);
        }
        for (let i = 0; i < Object.keys(dataSource).length; i++) {
            if (dataSource[Object.keys(dataSource)[parseInt(i.toString(), 10)]]
                && typeof dataSource[Object.keys(dataSource)[parseInt(i.toString(), 10)]] === 'object') {
                const result = this.findParent(dataSource[Object.keys(dataSource)[parseInt(i.toString(), 10)]], id, callback, dataSource);
                if (result != null) {
                    if (!result.parent) {
                        result.parent = parent;
                    }
                    return result;
                }
            }
        }
        return null;
    }
    // Module Required function
    getModuleName() {
        return 'listview';
    }
    requiredModules() {
        const modules = [];
        if (this.enableVirtualization) {
            modules.push({ args: [this], member: 'virtualization', name: 'Virtualization' });
        }
        return modules;
    }
    onListScroll(e) {
        const args = { originalEvent: e, scrollDirection: 'Bottom', distanceY: this.element.scrollHeight - this.element.scrollTop };
        const currentScrollTop = this.element.scrollTop;
        if (currentScrollTop > this.previousScrollTop) {
            args.scrollDirection = 'Bottom';
            args.distanceY = this.element.scrollHeight - this.element.clientHeight - this.element.scrollTop;
            this.trigger('scroll', args);
        }
        else if (this.previousScrollTop > currentScrollTop) {
            args.scrollDirection = 'Top';
            args.distanceY = this.element.scrollTop;
            this.trigger('scroll', args);
        }
        this.previousScrollTop = currentScrollTop;
    }
    /**
     * Get the properties to be maintained in the persisted state.
     */
    getPersistData() {
        return this.addOnPersist(['cssClass', 'enableRtl', 'htmlAttributes',
            'enable', 'fields', 'animation', 'headerTitle',
            'sortOrder', 'showIcon', 'height', 'width', 'showCheckBox', 'checkBoxPosition', 'selectedId']);
    }
};
__decorate([
    Property('')
], ListView.prototype, "cssClass", void 0);
__decorate([
    Property(false)
], ListView.prototype, "enableVirtualization", void 0);
__decorate([
    Property({})
], ListView.prototype, "htmlAttributes", void 0);
__decorate([
    Property(true)
], ListView.prototype, "enable", void 0);
__decorate([
    Property([])
], ListView.prototype, "dataSource", void 0);
__decorate([
    Property()
], ListView.prototype, "query", void 0);
__decorate([
    Complex(ListBase.defaultMappedFields, FieldSettings)
], ListView.prototype, "fields", void 0);
__decorate([
    Property({ effect: 'SlideLeft', duration: 400, easing: 'ease' })
], ListView.prototype, "animation", void 0);
__decorate([
    Property('None')
], ListView.prototype, "sortOrder", void 0);
__decorate([
    Property(false)
], ListView.prototype, "showIcon", void 0);
__decorate([
    Property(false)
], ListView.prototype, "showCheckBox", void 0);
__decorate([
    Property('Left')
], ListView.prototype, "checkBoxPosition", void 0);
__decorate([
    Property('')
], ListView.prototype, "headerTitle", void 0);
__decorate([
    Property(false)
], ListView.prototype, "showHeader", void 0);
__decorate([
    Property(true)
], ListView.prototype, "enableHtmlSanitizer", void 0);
__decorate([
    Property('')
], ListView.prototype, "height", void 0);
__decorate([
    Property('')
], ListView.prototype, "width", void 0);
__decorate([
    Property(null)
], ListView.prototype, "template", void 0);
__decorate([
    Property(null)
], ListView.prototype, "headerTemplate", void 0);
__decorate([
    Property(null)
], ListView.prototype, "groupTemplate", void 0);
__decorate([
    Event()
], ListView.prototype, "select", void 0);
__decorate([
    Event()
], ListView.prototype, "actionBegin", void 0);
__decorate([
    Event()
], ListView.prototype, "actionComplete", void 0);
__decorate([
    Event()
], ListView.prototype, "actionFailure", void 0);
__decorate([
    Event()
], ListView.prototype, "scroll", void 0);
ListView = __decorate([
    NotifyPropertyChanges
], ListView);

const listElementCount = 1.5;
const windowElementCount = 3;
class Virtualization {
    constructor(instance) {
        this.elementDifference = 0;
        this.listViewInstance = instance;
    }
    /**
     * For internal use only.
     *
     * @private
     */
    isNgTemplate() {
        return !isNullOrUndefined(this.listViewInstance.templateRef) && typeof this.listViewInstance.templateRef !== 'string';
    }
    /**
     * Checks if the platform is a Vue and its template property is a function type.
     *
     * @returns {boolean} indicating the result of the check
     */
    isVueFunctionTemplate() {
        return this.listViewInstance.isVue && typeof this.listViewInstance.template === 'function';
    }
    /**
     * For internal use only.
     *
     * @private
     */
    uiVirtualization() {
        this.wireScrollEvent(false);
        const curViewDS = this.listViewInstance.curViewDS;
        const isRendered = this.listViewInstance.isRendered;
        const firstIndex = isRendered && !isNullOrUndefined(this.uiFirstIndex) && this.uiLastIndex <= Object.keys(curViewDS).length
            ? this.uiFirstIndex : 0;
        const firstDs = curViewDS.slice(firstIndex, firstIndex + 1);
        this.listViewInstance.ulElement = this.listViewInstance.curUL = ListBase.createList(this.listViewInstance.createElement, firstDs, this.listViewInstance.listBaseOption, null, this.listViewInstance);
        this.listViewInstance.contentContainer = this.listViewInstance.createElement('div', { className: classNames.container });
        this.listViewInstance.element.appendChild(this.listViewInstance.contentContainer);
        this.listViewInstance.contentContainer.appendChild(this.listViewInstance.ulElement);
        this.listItemHeight = this.listViewInstance.ulElement.firstElementChild.getBoundingClientRect().height;
        this.expectedDomItemCount = this.ValidateItemCount(10000);
        this.updateDOMItemCount();
        const lastIndex = isRendered && !isNullOrUndefined(this.uiLastIndex) && this.listDiff !== 0
            ? this.uiLastIndex : this.domItemCount - 1;
        this.uiFirstIndex = firstIndex;
        this.uiLastIndex = lastIndex;
        const otherDs = curViewDS.slice(firstIndex + 1, lastIndex + 1);
        const listItems = ListBase.createListItemFromJson(this.listViewInstance.createElement, otherDs, this.listViewInstance.listBaseOption, null, null, this.listViewInstance);
        append(listItems, this.listViewInstance.ulElement);
        this.listViewInstance.liCollection = this.listViewInstance.curUL.querySelectorAll('li');
        this.topElement = this.listViewInstance.createElement('div');
        this.listViewInstance.ulElement.insertBefore(this.topElement, this.listViewInstance.ulElement.firstElementChild);
        this.bottomElement = this.listViewInstance.createElement('div');
        this.listViewInstance.ulElement.insertBefore(this.bottomElement, null);
        this.totalHeight = (Object.keys(curViewDS).length * this.listItemHeight) - (this.domItemCount * this.listItemHeight);
        this.topElement.style.height = isRendered ? this.topElementHeight + 'px' : '0px';
        this.bottomElement.style.height = isRendered ? (this.totalHeight - this.topElementHeight) + 'px' : this.totalHeight + 'px';
        this.topElementHeight = isRendered ? this.topElementHeight : 0;
        this.bottomElementHeight = isRendered ? (this.totalHeight - this.topElementHeight) : this.totalHeight;
        this.listDiff = isRendered && Object.keys(curViewDS).length !== this.domItemCount ? this.listDiff : 0;
        if (isRendered) {
            this.listViewInstance.element.scrollTop = this.listViewInstance.previousScrollTop;
        }
        this.uiIndicesInitialization();
    }
    wireScrollEvent(destroy) {
        if (!destroy) {
            if (this.listViewInstance.isWindow) {
                this.onVirtualScroll = this.onVirtualUiScroll.bind(this);
                window.addEventListener('scroll', this.onVirtualScroll);
            }
            else {
                EventHandler.add(this.listViewInstance.element, 'scroll', this.onVirtualUiScroll, this);
            }
        }
        else {
            if (this.listViewInstance.isWindow === true) {
                window.removeEventListener('scroll', this.onVirtualScroll);
                window.removeEventListener('scroll', this.updateUl);
            }
            else {
                EventHandler.remove(this.listViewInstance.element, 'scroll', this.onVirtualUiScroll);
            }
        }
    }
    ValidateItemCount(dataSourceLength) {
        const height = parseFloat(formatUnit(this.listViewInstance.height));
        let itemCount;
        if (this.listViewInstance.isWindow) {
            itemCount = Math.round((window.innerHeight / this.listItemHeight) * windowElementCount);
        }
        else {
            if (typeof this.listViewInstance.height === 'string' && this.listViewInstance.height.indexOf('%') !== -1) {
                itemCount = Math.round((this.listViewInstance.element.getBoundingClientRect().height / this.listItemHeight) * listElementCount);
            }
            else {
                itemCount = Math.round((height / this.listItemHeight) * listElementCount);
            }
        }
        if (itemCount > dataSourceLength) {
            itemCount = dataSourceLength;
        }
        return itemCount;
    }
    updateDOMItemCount() {
        this.domItemCount = this.ValidateItemCount(Object.keys(this.listViewInstance.curViewDS).length);
    }
    uiIndicesInitialization() {
        this.uiIndices = { 'activeIndices': [], 'disabledItemIndices': [], 'hiddenItemIndices': [] };
        const data = this.listViewInstance.curViewDS;
        for (let i = 0; i < data.length; i++) {
            if (this.listViewInstance.showCheckBox && data[i][this.listViewInstance.fields.isChecked]) {
                this.uiIndices.activeIndices.push(i);
            }
            if (!isNullOrUndefined(data[parseInt(i.toString(), 10)][this.listViewInstance.fields.enabled]) &&
                !data[i][this.listViewInstance.fields.enabled]) {
                (this.uiIndices.disabledItemIndices.push(i));
            }
        }
        if (this.isNgTemplate()) {
            const items = this.listViewInstance.element.querySelectorAll('.' + classNames.listItem);
            for (let index = 0; index < items.length; index++) {
                items[index].context = this.listViewInstance.viewContainerRef.get(index).context;
            }
        }
    }
    refreshItemHeight() {
        if (this.listViewInstance.curViewDS.length) {
            const curViewDS = this.listViewInstance.curViewDS;
            this.listItemHeight = this.topElement.nextSibling.getBoundingClientRect().height;
            this.totalHeight = (Object.keys(curViewDS).length * this.listItemHeight) - (this.domItemCount * this.listItemHeight);
            this.bottomElementHeight = this.totalHeight;
            this.bottomElement.style.height = this.totalHeight + 'px';
        }
    }
    getscrollerHeight(startingHeight) {
        return this.listViewInstance.isWindow ? (((pageYOffset - startingHeight) <= 0) ? 0 :
            (pageYOffset - startingHeight)) : ((this.listViewInstance.element.scrollTop - startingHeight) <= 0) ? 0 :
            (this.listViewInstance.element.scrollTop - startingHeight);
    }
    onVirtualUiScroll() {
        let startingHeight;
        const curViewDS = this.listViewInstance.curViewDS;
        this.listItemHeight = select('.e-list-item', this.listViewInstance.element).getBoundingClientRect().height;
        this.totalHeight = (Object.keys(curViewDS).length * this.listItemHeight) - (this.domItemCount * this.listItemHeight);
        if (this.listViewInstance.isWindow) {
            startingHeight = this.listViewInstance.ulElement.getBoundingClientRect().top -
                document.documentElement.getBoundingClientRect().top;
        }
        else {
            startingHeight = this.listViewInstance.headerEle ? this.listViewInstance.headerEle.getBoundingClientRect().height : 0;
        }
        this.scrollPosition = isNullOrUndefined(this.scrollPosition) ? 0 : this.scrollPosition;
        const scroll = this.getscrollerHeight(startingHeight);
        this.topElementHeight = this.listItemHeight * Math.floor(scroll / this.listItemHeight);
        this.bottomElementHeight = this.totalHeight - this.topElementHeight;
        [this.topElementHeight, this.bottomElementHeight] = scroll <= this.totalHeight ?
            [this.topElementHeight, this.bottomElementHeight] : [this.totalHeight, 0];
        if (this.topElementHeight !== parseFloat(this.topElement.style.height)) {
            this.topElement.style.height = this.topElementHeight + 'px';
            this.bottomElement.style.height = this.bottomElementHeight + 'px';
            if (scroll > this.scrollPosition) {
                const listDiff = Math.round(((this.topElementHeight / this.listItemHeight) - this.listDiff));
                if (listDiff > (this.expectedDomItemCount + 5)) {
                    this.onLongScroll(listDiff, true);
                }
                else {
                    this.onNormalScroll(listDiff, true);
                }
            }
            else {
                const listDiff = Math.round((this.listDiff - (this.topElementHeight / this.listItemHeight)));
                if (listDiff > (this.expectedDomItemCount + 5)) {
                    this.onLongScroll(listDiff, false);
                }
                else {
                    this.onNormalScroll(listDiff, false);
                }
            }
        }
        this.listDiff = Math.round(this.topElementHeight / this.listItemHeight);
        if (typeof this.listViewInstance.onUIScrolled === 'function') {
            this.listViewInstance.onUIScrolled();
        }
        this.scrollPosition = scroll;
    }
    onLongScroll(listDiff, isScrollingDown) {
        let index = isScrollingDown ? (this.uiFirstIndex + listDiff) : (this.uiFirstIndex - listDiff);
        const elements = this.listViewInstance.ulElement.querySelectorAll('li');
        for (let i = 0; i < elements.length; i++) {
            this.updateUI(elements[i], index);
            index++;
        }
        this.uiLastIndex = isScrollingDown ? (this.uiLastIndex + listDiff) : (this.uiLastIndex - listDiff);
        this.uiFirstIndex = isScrollingDown ? (this.uiFirstIndex + listDiff) : (this.uiFirstIndex - listDiff);
    }
    onNormalScroll(listDiff, isScrollingDown) {
        if (isScrollingDown) {
            for (let i = 0; i < listDiff; i++) {
                const index = ++this.uiLastIndex;
                this.updateUI(this.topElement.nextElementSibling, index, this.bottomElement);
                this.uiFirstIndex++;
            }
        }
        else {
            for (let i = 0; i < listDiff; i++) {
                const index = --this.uiFirstIndex;
                const target = this.topElement.nextSibling;
                this.updateUI(this.bottomElement.previousElementSibling, index, target);
                this.uiLastIndex--;
            }
        }
    }
    updateUiContent(element, index) {
        const curViewDs = this.listViewInstance.curViewDS;
        if (typeof this.listViewInstance.dataSource[0] === 'string' ||
            typeof this.listViewInstance.dataSource[0] === 'number') {
            element.dataset.uid = ListBase.generateId();
            element.getElementsByClassName(classNames.listItemText)[0].innerHTML =
                this.listViewInstance.curViewDS[index].toString();
        }
        else {
            element.dataset.uid = (curViewDs[parseInt(index.toString(), 10)][this.listViewInstance.fields.id]) ?
                (curViewDs[parseInt(index.toString(), 10)][this.listViewInstance.fields.id]) : ListBase.generateId();
            element.getElementsByClassName(classNames.listItemText)[0].innerHTML =
                (curViewDs[parseInt(index.toString(), 10)][this.listViewInstance.fields.text]);
        }
        if (this.listViewInstance.showIcon) {
            if (element.querySelector('.' + classNames.listIcon)) {
                detach(element.querySelector('.' + classNames.listIcon));
            }
            if (this.listViewInstance.curViewDS[index][this.listViewInstance.fields.iconCss]) {
                const textContent = element.querySelector('.' + classNames.textContent);
                const curViewDS = this.listViewInstance.curViewDS[index];
                const iconCss = curViewDS[this.listViewInstance.fields.iconCss].toString();
                const target = this.listViewInstance.createElement('div', {
                    className: classNames.listIcon + ' ' + iconCss
                });
                textContent.insertBefore(target, element.querySelector('.' + classNames.listItemText));
            }
        }
        if (this.listViewInstance.showCheckBox && this.listViewInstance.fields.groupBy) {
            if (!this.checkListWrapper) {
                this.checkListWrapper = this.listViewInstance.curUL.querySelector('.' + classNames.checkboxWrapper).cloneNode(true);
            }
            const textContent = element.querySelector('.' + classNames.textContent);
            if (this.listViewInstance.curViewDS[index].isHeader) {
                if (element.querySelector('.' + classNames.checkboxWrapper)) {
                    element.classList.remove(classNames.checklist);
                    textContent.classList.remove(classNames.checkbox);
                    detach(element.querySelector('.' + classNames.checkboxWrapper));
                }
            }
            else {
                if (!element.querySelector('.' + classNames.checkboxWrapper)) {
                    element.classList.add(classNames.checklist);
                    textContent.classList.add(classNames.checkbox);
                    if (this.listViewInstance.checkBoxPosition === 'Left') {
                        textContent.classList.add('e-checkbox-left');
                    }
                    else {
                        textContent.classList.add('e-checkbox-right');
                    }
                    textContent.append(this.checkListWrapper.cloneNode(true));
                }
            }
        }
    }
    changeElementAttributes(element, index) {
        element.classList.remove(classNames.disable);
        if (this.uiIndices.disabledItemIndices.length && this.uiIndices.disabledItemIndices.indexOf(index) !== -1) {
            element.classList.add(classNames.disable);
        }
        element.style.display = '';
        if (this.uiIndices.hiddenItemIndices.length && this.uiIndices.hiddenItemIndices.indexOf(index) !== -1) {
            element.style.display = 'none';
        }
        if (this.listViewInstance.showCheckBox) {
            const checklistElement = element.querySelector('.' + classNames.checkboxWrapper);
            element.classList.remove(classNames.selected);
            element.classList.remove(classNames.focused);
            if (checklistElement) {
                checklistElement.removeAttribute('aria-checked');
                checklistElement.firstElementChild.classList.remove(classNames.checked);
            }
            if (this.uiIndices.activeIndices.length && this.uiIndices.activeIndices.indexOf(index) !== -1 &&
                !this.listViewInstance.curUL.querySelector(classNames.selected)) {
                element.classList.add(classNames.selected);
                checklistElement.firstElementChild.classList.add(classNames.checked);
                checklistElement.setAttribute('aria-checked', 'true');
                if (this.activeIndex === index) {
                    element.classList.add(classNames.focused);
                }
            }
        }
        else {
            element.classList.remove(classNames.selected);
            element.removeAttribute('aria-selected');
            if (!isNullOrUndefined(this.activeIndex) && this.activeIndex === index &&
                !this.listViewInstance.curUL.querySelector(classNames.selected)) {
                element.classList.add(classNames.selected);
                element.setAttribute('aria-selected', 'true');
            }
        }
        if (this.listViewInstance.fields.groupBy) {
            if (this.listViewInstance.curViewDS[index].isHeader) {
                if (element.classList.contains(classNames.listItem)) {
                    element.classList.remove(classNames.listItem);
                    element.setAttribute('role', 'group');
                    element.classList.add(classNames.groupListItem);
                }
            }
            else {
                if (element.classList.contains(classNames.groupListItem)) {
                    element.classList.remove(classNames.groupListItem);
                    element.setAttribute('role', 'listitem');
                    element.classList.add(classNames.listItem);
                }
            }
        }
    }
    findDSAndIndexFromId(ds, fields) {
        const resultJSON = {};
        fields = this.listViewInstance.getElementUID(fields);
        if (!isNullOrUndefined(fields)) {
            ds.some((data, index) => {
                if ((fields[this.listViewInstance.fields.id] &&
                    fields[this.listViewInstance.fields.id]
                        === (data[this.listViewInstance.fields.id] && data[this.listViewInstance.fields.id]) || fields === data)) {
                    resultJSON.index = index;
                    resultJSON.data = data;
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        return resultJSON;
    }
    getSelectedItems() {
        if (!isNullOrUndefined(this.activeIndex) || (this.listViewInstance.showCheckBox && this.uiIndices.activeIndices.length)) {
            const dataCollection = [];
            const textCollection = [];
            if (typeof this.listViewInstance.dataSource[0] === 'string' ||
                typeof this.listViewInstance.dataSource[0] === 'number') {
                const curViewDS = this.listViewInstance.curViewDS;
                if (this.listViewInstance.showCheckBox) {
                    const indices = this.uiIndices.activeIndices;
                    for (let i = 0; i < indices.length; i++) {
                        dataCollection.push(curViewDS[indices[i]]);
                    }
                    return {
                        text: dataCollection,
                        data: dataCollection,
                        index: this.uiIndices.activeIndices.map((index) => this.listViewInstance.dataSource.indexOf(curViewDS[index]))
                    };
                }
                else {
                    return {
                        text: curViewDS[this.activeIndex],
                        data: curViewDS[this.activeIndex],
                        index: this.listViewInstance.dataSource.indexOf(curViewDS[this.activeIndex])
                    };
                }
            }
            else {
                const curViewDS = this.listViewInstance.curViewDS;
                const text = this.listViewInstance.fields.text;
                if (this.listViewInstance.showCheckBox) {
                    const indexArray = this.uiIndices.activeIndices;
                    for (let i = 0; i < indexArray.length; i++) {
                        textCollection.push(curViewDS[indexArray[i]][`${text}`]);
                        dataCollection.push(curViewDS[indexArray[parseInt(i.toString(), 10)]]);
                    }
                    const dataSource = this.listViewInstance.dataSource instanceof DataManager
                        ? curViewDS : this.listViewInstance.dataSource;
                    return {
                        text: textCollection,
                        data: dataCollection,
                        index: this.uiIndices.activeIndices.map((index) => dataSource.indexOf(curViewDS[index]))
                    };
                }
                else {
                    const dataSource = this.listViewInstance.dataSource instanceof DataManager
                        ? curViewDS : this.listViewInstance.dataSource;
                    return {
                        text: curViewDS[this.activeIndex][this.listViewInstance.fields.text],
                        data: curViewDS[this.activeIndex],
                        index: dataSource.indexOf(curViewDS[this.activeIndex])
                    };
                }
            }
        }
        else {
            return undefined;
        }
    }
    selectItem(obj) {
        const resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            const isSelected = this.activeIndex === resutJSON.index;
            let isChecked;
            this.activeIndex = resutJSON.index;
            if (this.listViewInstance.showCheckBox) {
                if (this.uiIndices.activeIndices.indexOf(resutJSON.index) === -1) {
                    isChecked = true;
                    this.uiIndices.activeIndices.push(resutJSON.index);
                }
                else {
                    isChecked = false;
                    this.uiIndices.activeIndices.splice(this.uiIndices.activeIndices.indexOf(resutJSON.index), 1);
                }
                if (this.listViewInstance.curUL.querySelector('.' + classNames.focused)) {
                    this.listViewInstance.curUL.querySelector('.' + classNames.focused).classList.remove(classNames.focused);
                }
            }
            if (this.listViewInstance.getLiFromObjOrElement(obj)) {
                if (this.listViewInstance.showCheckBox) {
                    this.listViewInstance.setCheckboxLI(this.listViewInstance.getLiFromObjOrElement(obj));
                }
                else {
                    this.listViewInstance.setSelectLI(this.listViewInstance.getLiFromObjOrElement(obj));
                }
            }
            else {
                let eventArgs;
                if (typeof this.listViewInstance.dataSource[0] === 'string' ||
                    typeof this.listViewInstance.dataSource[0] === 'number') {
                    eventArgs = {
                        text: this.listViewInstance.curViewDS[this.activeIndex],
                        data: this.listViewInstance.curViewDS[this.activeIndex],
                        index: this.activeIndex
                    };
                }
                else {
                    const curViewDS = this.listViewInstance.curViewDS;
                    eventArgs = {
                        text: curViewDS[this.activeIndex][this.listViewInstance.fields.text],
                        data: curViewDS[this.activeIndex],
                        index: this.activeIndex
                    };
                }
                if (this.listViewInstance.showCheckBox) {
                    this.listViewInstance.trigger('select', eventArgs, (observedArgs) => {
                        if (observedArgs.cancel) {
                            if (!isChecked) {
                                eventArgs.isChecked = isChecked;
                                this.uiIndices.activeIndices.push(resutJSON.index);
                            }
                            else {
                                eventArgs.isChecked = !isChecked;
                                this.uiIndices.activeIndices.splice(this.uiIndices.activeIndices.indexOf(resutJSON.index), 1);
                            }
                        }
                    });
                }
                else if (!isSelected) {
                    this.listViewInstance.removeSelect();
                    this.listViewInstance.trigger('select', eventArgs, (observedArgs) => {
                        if (observedArgs.cancel) {
                            this.activeIndex = undefined;
                        }
                    });
                }
            }
        }
        else if (isNullOrUndefined(obj) && !this.listViewInstance.showCheckBox) {
            this.listViewInstance.removeSelect();
            this.activeIndex = undefined;
        }
    }
    enableItem(obj) {
        const resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            this.uiIndices.disabledItemIndices.splice(this.uiIndices.disabledItemIndices.indexOf(resutJSON.index), 1);
        }
    }
    disableItem(obj) {
        const resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length && this.uiIndices.disabledItemIndices.indexOf(resutJSON.index) === -1) {
            this.uiIndices.disabledItemIndices.push(resutJSON.index);
        }
    }
    showItem(obj) {
        const resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            this.uiIndices.hiddenItemIndices.splice(this.uiIndices.hiddenItemIndices.indexOf(resutJSON.index), 1);
        }
    }
    hideItem(obj) {
        const resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length && this.uiIndices.hiddenItemIndices.indexOf(resutJSON.index) === -1) {
            this.uiIndices.hiddenItemIndices.push(resutJSON.index);
        }
    }
    removeItem(obj) {
        let dataSource;
        const curViewDS = this.listViewInstance.curViewDS;
        const resutJSON = this.findDSAndIndexFromId(curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            dataSource = resutJSON.data;
            if (curViewDS[resutJSON.index - 1] &&
                curViewDS[resutJSON.index - 1].isHeader &&
                (curViewDS[resutJSON.index - 1])
                    .items.length === 1) {
                this.removeUiItem(resutJSON.index - 1);
                this.removeUiItem(resutJSON.index - 1);
            }
            else {
                this.removeUiItem(resutJSON.index);
            }
        }
        const listDataSource = this.listViewInstance.dataSource instanceof DataManager
            ? this.listViewInstance.localData : this.listViewInstance.dataSource;
        const index = listDataSource.indexOf(dataSource);
        if (index !== -1) {
            listDataSource.splice(index, 1);
            this.listViewInstance.setViewDataSource(listDataSource);
        }
        // recollect all the list item into collection
        this.listViewInstance.liCollection =
            this.listViewInstance.curUL.querySelectorAll('li');
    }
    // eslint-disable-next-line
    setCheckboxLI(li, e) {
        const index = Array.prototype.indexOf.call(this.listViewInstance.curUL.querySelectorAll('li'), li) + this.uiFirstIndex;
        this.activeIndex = Array.prototype.indexOf.call(this.listViewInstance.curUL.querySelectorAll('li'), li) + this.uiFirstIndex;
        if (li.classList.contains(classNames.selected)) {
            if (this.uiIndices.activeIndices.indexOf(index) === -1) {
                this.uiIndices.activeIndices.push(index);
            }
        }
        else {
            this.uiIndices.activeIndices.splice(this.uiIndices.activeIndices.indexOf(index), 1);
        }
    }
    // eslint-disable-next-line
    setSelectLI(li, e) {
        this.activeIndex = Array.prototype.indexOf.call(this.listViewInstance.curUL.querySelectorAll('li'), li) + this.uiFirstIndex;
    }
    checkedItem(checked) {
        if (checked) {
            this.uiIndices.activeIndices = [];
            this.activeIndex = undefined;
            const data = this.listViewInstance.curViewDS;
            for (let index = 0; index < data.length; index++) {
                if (!data[index].isHeader) {
                    this.uiIndices.activeIndices.push(index);
                }
            }
        }
        else {
            this.activeIndex = undefined;
            this.uiIndices.activeIndices = [];
        }
    }
    addUiItem(index) {
        // virtually new add list item based on the scollbar position
        // if the scroll bar is at the top, just pretend the new item has been added since no UI
        // change is required for the item that has been added at last but when scroll bar is at the bottom
        // just detach top and inject into bottom to mimic new item is added
        const curViewDs = this.listViewInstance.curViewDS;
        this.changeUiIndices(index, true);
        if (this.activeIndex && this.activeIndex >= index) {
            this.activeIndex++;
        }
        if (this.listViewInstance.showCheckBox &&
            curViewDs[index][this.listViewInstance.fields.isChecked]) {
            this.uiIndices.activeIndices.push(index);
        }
        if (!parseFloat(this.bottomElement.style.height) && !parseFloat(this.topElement.style.height)) {
            this.bottomElement.style.height = parseFloat(this.bottomElement.style.height) + this.listItemHeight + 'px';
        }
        if (parseFloat(this.bottomElement.style.height)) {
            const liItem = this.listViewInstance.curUL.lastElementChild.previousSibling;
            const target = this.listViewInstance.getLiFromObjOrElement(curViewDs[index + 1]) ||
                this.listViewInstance.getLiFromObjOrElement(curViewDs[index + 2]);
            if (target) {
                this.bottomElement.style.height = parseFloat(this.bottomElement.style.height) + this.listItemHeight + 'px';
                this.updateUI(liItem, index, target);
            }
        }
        else {
            const liItem = this.listViewInstance.curUL.firstElementChild.nextSibling;
            let target;
            if ((Object.keys(this.listViewInstance.curViewDS).length - 1) === index) {
                target = this.listViewInstance.curUL.lastElementChild;
            }
            else {
                target = this.listViewInstance.getLiFromObjOrElement(curViewDs[index + 1]) ||
                    this.listViewInstance.getLiFromObjOrElement(curViewDs[index + 2]);
            }
            this.topElement.style.height = parseFloat(this.topElement.style.height) + this.listItemHeight + 'px';
            this.uiFirstIndex++;
            this.uiLastIndex++;
            if (target) {
                this.updateUI(liItem, index, target);
                if (this.listViewInstance.isWindow === true) {
                    window.scrollTo(0, (pageYOffset + this.listItemHeight));
                }
                else {
                    this.listViewInstance.element.scrollTop += this.listItemHeight;
                }
            }
        }
        this.totalHeight += this.listItemHeight;
        this.listDiff = Math.round(parseFloat(this.topElement.style.height) / this.listItemHeight);
    }
    removeUiItem(index) {
        this.totalHeight -= this.listItemHeight;
        const curViewDS = this.listViewInstance.curViewDS[index];
        const liItem = this.listViewInstance.getLiFromObjOrElement(curViewDS);
        this.listViewInstance.curViewDS.splice(index, 1);
        if (this.activeIndex && this.activeIndex >= index) {
            this.activeIndex--;
        }
        if (liItem) {
            if (this.domItemCount > Object.keys(this.listViewInstance.curViewDS).length) {
                detach(liItem);
                this.domItemCount--;
                this.uiLastIndex--;
                this.totalHeight = 0;
            }
            else {
                if (liItem.classList.contains(classNames.disable)) {
                    liItem.classList.remove(classNames.disable);
                    this.uiIndices.disabledItemIndices.splice(this.uiIndices.disabledItemIndices.indexOf(index), 1);
                }
                if (liItem.style.display === 'none') {
                    liItem.style.display = '';
                    this.uiIndices.hiddenItemIndices.splice(this.uiIndices.hiddenItemIndices.indexOf(index), 1);
                }
                if (this.listViewInstance.showCheckBox && liItem.classList.contains(classNames.selected)) {
                    this.listViewInstance.removeSelect();
                    this.uiIndices.activeIndices.splice(this.uiIndices.activeIndices.indexOf(index), 1);
                    const checklistElement = liItem.querySelector('.' + classNames.checkboxWrapper);
                    checklistElement.removeAttribute('aria-checked');
                    checklistElement.firstElementChild.classList.remove(classNames.checked);
                    if (liItem.classList.contains(classNames.focused)) {
                        liItem.classList.remove(classNames.focused);
                        this.activeIndex = undefined;
                    }
                }
                else if (liItem.classList.contains(classNames.selected)) {
                    this.listViewInstance.removeSelect();
                    this.activeIndex = undefined;
                }
                if (!parseFloat(this.bottomElement.style.height) && !parseFloat(this.topElement.style.height)) {
                    this.updateUI(liItem, this.uiLastIndex, this.bottomElement);
                }
                else if (parseFloat(this.bottomElement.style.height)) {
                    this.bottomElement.style.height = parseFloat(this.bottomElement.style.height) - this.listItemHeight + 'px';
                    this.updateUI(liItem, this.uiLastIndex, this.bottomElement);
                }
                else {
                    this.topElement.style.height = parseFloat(this.topElement.style.height) - this.listItemHeight + 'px';
                    this.updateUI(liItem, (this.uiFirstIndex - 1), this.topElement.nextSibling);
                    this.uiLastIndex--;
                    this.uiFirstIndex--;
                }
            }
        }
        this.changeUiIndices(index, false);
        this.listDiff = Math.round(parseFloat(this.topElement.style.height) / this.listItemHeight);
    }
    changeUiIndices(index, increment) {
        const keys = Object.keys(this.uiIndices);
        for (let ind = 0; ind < keys.length; ind++) {
            this.uiIndices[keys[ind]] = this.uiIndices[keys[ind]].map((i) => {
                if (i >= index) {
                    return increment ? ++i : --i;
                }
                else {
                    return i;
                }
            });
        }
    }
    addItem(data, fields, dataSource, index) {
        for (let i = 0; i < data.length; i++) {
            const currentItem = data[i];
            // push the given data to main data array
            dataSource = this.listViewInstance.addItemAtIndex(index, dataSource, currentItem);
            // recalculate all the group data or other datasource related things
            this.listViewInstance.setViewDataSource(dataSource);
            // render list items for first time due to no datasource present earlier
            if (!this.domItemCount) {
                // fresh rendering for first time
                if ((this.listViewInstance.template || this.listViewInstance.groupTemplate) && !this.isNgTemplate()) {
                    this.listViewInstance.listBaseOption.template = null;
                    this.listViewInstance.listBaseOption.groupTemplate = null;
                    this.listViewInstance.listBaseOption.itemCreated = this.createUIItem.bind(this);
                }
                this.uiVirtualization();
                // when expected expected DOM count doesn't meet the condition we need to create and inject new item into DOM
            }
            else if (this.domItemCount < this.expectedDomItemCount) {
                const ds = this.listViewInstance.findItemFromDS(dataSource, fields);
                if (ds instanceof Array) {
                    if (this.listViewInstance.ulElement) {
                        let index = this.listViewInstance.curViewDS.indexOf(currentItem);
                        // inject new list item into DOM
                        this.createAndInjectNewItem(currentItem, index);
                        // check for group header item
                        const curViewDS = this.listViewInstance.curViewDS[index - 1];
                        if (curViewDS && curViewDS.isHeader && curViewDS.items.length === 1) {
                            // target group item index in datasource
                            --index;
                            // inject new group header into DOM for previously created list item
                            this.createAndInjectNewItem(curViewDS, index);
                        }
                    }
                    // recollect all the list item into collection
                    this.listViewInstance.liCollection =
                        this.listViewInstance.curUL.querySelectorAll('li');
                }
            }
            else {
                const index = this.listViewInstance.curViewDS.indexOf(currentItem);
                // virtually new add list item based on the scollbar position
                this.addUiItem(index);
                // check for group header item needs to be added
                const curViewDS = this.listViewInstance.curViewDS[index - 1];
                if (curViewDS && curViewDS.isHeader && curViewDS.items.length === 1) {
                    this.addUiItem(index - 1);
                }
            }
        }
    }
    createAndInjectNewItem(itemData, index) {
        // generate li item for given datasource
        let target;
        const li = ListBase.createListItemFromJson(this.listViewInstance.createElement, [itemData], this.listViewInstance.listBaseOption, null, null, this.listViewInstance);
        // check for target element whether to insert before last item or group item
        if ((Object.keys(this.listViewInstance.curViewDS).length - 1) === index) {
            target = this.listViewInstance.curUL.lastElementChild;
        }
        else {
            // target group header's first child item to append its header
            target = this.listViewInstance.getLiFromObjOrElement(this.listViewInstance.curViewDS[index + 1]) ||
                this.listViewInstance.getLiFromObjOrElement(this.listViewInstance.curViewDS[index + 2]);
        }
        if (this.listViewInstance.fields.groupBy
            && this.listViewInstance.curViewDS[index + 1]
            && this.listViewInstance.curViewDS[index + 1].isHeader) {
            const targetEle = this.listViewInstance.getLiFromObjOrElement(this.listViewInstance.curViewDS[index - 1]);
            if (targetEle) {
                target = targetEle.nextElementSibling;
            }
        }
        // insert before the target element
        this.listViewInstance.ulElement.insertBefore(li[0], target);
        // increment internal DOM count, last index count for new element
        this.domItemCount++;
        if (this.bottomElementHeight <= 0) {
            this.uiLastIndex++;
        }
        // recalculate the current item height, to avoid jumpy scroller
        this.refreshItemHeight();
    }
    createUIItem(args) {
        if (!args.item.classList.contains('e-list-group-item')) {
            this.templateData = args.curData.isHeader ? args.curData.items[0] :
                args.curData;
            if (this.listViewInstance.showCheckBox) {
                this.listViewInstance.renderCheckbox(args);
                if ((!isNullOrUndefined(this.listViewInstance.virtualCheckBox)) &&
                    (!isNullOrUndefined(this.listViewInstance.virtualCheckBox.outerHTML))) {
                    const div = document.createElement('div');
                    const commonTemplate = '<div class="e-text-content" role="presentation"> ' +
                        '<span class="e-list-text"> ${' + this.listViewInstance.fields.text + '} </span></div>';
                    const templateFunction = compile(this.listViewInstance.template || commonTemplate, this.listViewInstance);
                    const nodes = templateFunction(this.templateData, this.listViewInstance);
                    if (this.listViewInstance.template && this.listViewInstance.isReact) {
                        this.listViewInstance.renderReactTemplates();
                    }
                    [].slice.call(nodes).forEach((ele) => {
                        div.appendChild(ele);
                    });
                    if (div.children && div.children[0]) {
                        div.children[0].classList.add('e-checkbox');
                        if (this.listViewInstance.checkBoxPosition === 'Left') {
                            div.children[0].classList.add('e-checkbox-left');
                        }
                        else {
                            div.children[0].classList.add('e-checkbox-right');
                        }
                        if (this.listViewInstance.checkBoxPosition === 'Left') {
                            div.children[0].insertBefore(this.listViewInstance.virtualCheckBox, div.childNodes[0].children[0]);
                        }
                        else {
                            div.children[0].appendChild(this.listViewInstance.virtualCheckBox);
                        }
                        while (args.item.lastChild) {
                            args.item.removeChild(args.item.lastChild);
                        }
                        [].slice.call(div.children).forEach((ele) => {
                            args.item.appendChild(ele);
                        });
                    }
                }
            }
        }
    }
    reRenderUiVirtualization() {
        this.wireScrollEvent(true);
        if (this.listViewInstance.contentContainer) {
            detach(this.listViewInstance.contentContainer);
        }
        this.listViewInstance.preRender();
        // resetting the dom count to 0, to avoid edge case of dataSource suddenly becoming zero
        // and then manually adding item using addItem API
        this.domItemCount = 0;
        this.listViewInstance.header();
        this.listViewInstance.setLocalData();
    }
    updateUI(element, index, targetElement) {
        const onChange = this.isNgTemplate() ? this.onNgChange : this.onChange;
        if (this.listViewInstance.template || this.listViewInstance.groupTemplate) {
            const curViewDS = this.listViewInstance.curViewDS[index];
            element.dataset.uid = (curViewDS[this.listViewInstance.fields.id]) ?
                (curViewDS[this.listViewInstance.fields.id]) : ListBase.generateId();
            onChange(curViewDS, element, this);
        }
        else {
            this.updateUiContent(element, index);
        }
        this.changeElementAttributes(element, index);
        if (targetElement) {
            this.listViewInstance.ulElement.insertBefore(element, targetElement);
        }
    }
    /**
     * Handles the UI change in vue for the list view.
     *
     * @param {DataSource} newData - The new data source for the list view.
     * @param {ElementContext} listElement - The HTML element context for the list view.
     * @param {Virtualization} virtualThis - The virtualization context for the list view.
     * @returns {void}
     */
    onChange(newData, listElement, virtualThis) {
        const liItem = ListBase.createListItemFromJson(virtualThis.listViewInstance.createElement, [newData], virtualThis.listViewInstance.listBaseOption, null, null, virtualThis.listViewInstance);
        if (virtualThis.listViewInstance.isReact) {
            virtualThis.listViewInstance.renderReactTemplates();
        }
        while (listElement.lastChild) {
            listElement.removeChild(listElement.lastChild);
        }
        [].slice.call(liItem[0].children).forEach((ele) => {
            listElement.appendChild(ele);
        });
    }
    onNgChange(newData, listElement, virtualThis) {
        // compile given target element with template for new data
        const templateCompiler = compile(virtualThis.listViewInstance.template);
        const resultElement = templateCompiler(newData);
        while (listElement.lastChild) {
            listElement.removeChild(listElement.lastChild);
        }
        listElement.appendChild(resultElement[0]);
    }
    getModuleName() {
        return 'virtualization';
    }
    destroy() {
        this.wireScrollEvent(true);
        this.topElement = null;
        this.bottomElement = null;
    }
}

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Sortable_1;
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sortable Module provides support to enable sortable functionality in Dom Elements.
 * ```html
 * <div id="sortable">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 *   <div>Item 5</div>
 * </div>
 * ```
 * ```typescript
 *   let ele: HTMLElement = document.getElementById('sortable');
 *   let sortObj: Sortable = new Sortable(ele, {});
 * ```
 */
let Sortable = Sortable_1 = class Sortable extends Base {
    constructor(element, options) {
        super(options, element);
        this.getHelper = (e) => {
            const target = this.getSortableElement(e.sender.target);
            if (!this.isValidTarget(target, this)) {
                return false;
            }
            let element;
            if (this.helper) {
                element = this.helper({ sender: target, element: e.element });
            }
            else {
                element = target.cloneNode(true);
                element.style.width = `${target.offsetWidth}px`;
                element.style.height = `${target.offsetHeight}px`;
            }
            addClass([element], ['e-sortableclone']);
            document.body.appendChild(element);
            return element;
        };
        this.onDrag = (e) => {
            if (!e.target) {
                return;
            }
            this.trigger('drag', { event: e.event, element: this.element, target: e.target });
            let newInst = this.getSortableInstance(e.target);
            let target = this.getSortableElement(e.target, newInst);
            if ((this.isValidTarget(target, newInst) || (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('e-list-group-item') > -1)) && (this.curTarget !== target ||
                !isNullOrUndefined(newInst.placeHolder)) && (newInst.placeHolderElement ? newInst.placeHolderElement !== e.target : true)) {
                if (e.target.classList.contains('e-list-group-item')) {
                    target = e.target;
                }
                this.curTarget = target;
                if (this.target === target) {
                    return;
                }
                let oldIdx = this.getIndex(newInst.placeHolderElement, newInst);
                const placeHolder = this.getPlaceHolder(target, newInst);
                let newIdx;
                if (placeHolder) {
                    oldIdx = isNullOrUndefined(oldIdx) ? this.getIndex(this.target) : oldIdx;
                    newIdx = this.getIndex(target, newInst, e.event);
                    const isPlaceHolderPresent = this.isPlaceHolderPresent(newInst);
                    if (isPlaceHolderPresent && oldIdx === newIdx) {
                        return;
                    }
                    if (isPlaceHolderPresent) {
                        this.removePlaceHolder(newInst);
                    }
                    newInst.placeHolderElement = placeHolder;
                    if (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('e-list-group-item') > -1) {
                        newInst.element.insertBefore(newInst.placeHolderElement, newInst.element.children[newIdx]);
                    }
                    else if (newInst.element !== this.element && newIdx === newInst.element.childElementCount) {
                        newInst.element.appendChild(newInst.placeHolderElement);
                    }
                    else {
                        newInst.element.insertBefore(newInst.placeHolderElement, newInst.element.children[newIdx]);
                    }
                }
                else {
                    oldIdx = isNullOrUndefined(oldIdx) ? this.getIndex(this.target) :
                        this.getIndex(target, newInst) < oldIdx || !oldIdx ? oldIdx : oldIdx - 1;
                    newIdx = this.getIndex(target, newInst);
                    const idx = newInst.element !== this.element ? newIdx : oldIdx < newIdx ? newIdx + 1 : newIdx;
                    this.updateItemClass(newInst);
                    newInst.element.insertBefore(this.target, newInst.element.children[idx]);
                    this.curTarget = this.target;
                    this.trigger('drop', {
                        droppedElement: this.target, element: newInst.element, previousIndex: oldIdx, currentIndex: newIdx,
                        target: e.target, helper: document.getElementsByClassName('e-sortableclone')[0], event: e.event, scope: this.scope
                    });
                }
            }
            else if (this.curTarget !== this.target && this.scope && this.curTarget !== target && !isNullOrUndefined(newInst.placeHolder)) {
                this.removePlaceHolder(this.getSortableInstance(this.curTarget));
                this.curTarget = this.target;
            }
            newInst = this.getSortableInstance(this.curTarget);
            if (isNullOrUndefined(target) && e.target !== newInst.placeHolderElement) {
                if (this.isPlaceHolderPresent(newInst)) {
                    this.removePlaceHolder(newInst);
                }
            }
            else {
                const placeHolders = [].slice.call(document.getElementsByClassName('e-sortable-placeholder'));
                let inst;
                placeHolders.forEach((placeHolder) => {
                    inst = this.getSortableInstance(placeHolder);
                    if (inst.element && inst !== newInst) {
                        this.removePlaceHolder(inst);
                    }
                });
            }
        };
        this.onDragStart = (e) => {
            this.target = this.getSortableElement(e.target);
            let cancelDrag = false;
            this.target.classList.add('e-grabbed');
            this.curTarget = this.target;
            e.helper = document.getElementsByClassName('e-sortableclone')[0];
            const args = { cancel: false, element: this.element, target: this.target };
            this.trigger('beforeDragStart', args, (observedArgs) => {
                if (observedArgs.cancel) {
                    cancelDrag = observedArgs.cancel;
                    this.onDragStop(e);
                }
            });
            if (cancelDrag) {
                return;
            }
            if (isBlazor) {
                this.trigger('dragStart', {
                    event: e.event, element: this.element, target: this.target,
                    bindEvents: e.bindEvents, dragElement: e.dragElement
                });
            }
            else {
                this.trigger('dragStart', { event: e.event, element: this.element, target: this.target });
            }
        };
        this.onDragStop = (e) => {
            let dropInst = this.getSortableInstance(this.curTarget);
            let prevIdx;
            let curIdx;
            let handled;
            prevIdx = this.getIndex(this.target);
            const isPlaceHolderPresent = this.isPlaceHolderPresent(dropInst);
            if (isPlaceHolderPresent) {
                const curIdx = this.getIndex(dropInst.placeHolderElement, dropInst);
                prevIdx = this === dropInst && (prevIdx - curIdx) >= 1 ? prevIdx - 1 : prevIdx;
                const args = {
                    previousIndex: prevIdx, currentIndex: curIdx, target: e.target, droppedElement: this.target,
                    helper: e.helper, cancel: false, handled: false
                };
                this.trigger('beforeDrop', args, (observedArgs) => {
                    if (!observedArgs.cancel) {
                        handled = observedArgs.handled;
                        this.updateItemClass(dropInst);
                        if (observedArgs.handled) {
                            const ele = this.target.cloneNode(true);
                            this.target.classList.remove('e-grabbed');
                            this.target = ele;
                        }
                        dropInst.element.insertBefore(this.target, dropInst.placeHolderElement);
                        const curIdx = this.getIndex(this.target, dropInst);
                        prevIdx = this === dropInst && (prevIdx - curIdx) >= 1 ? prevIdx - 1 : prevIdx;
                        this.trigger('drop', {
                            event: e.event, element: dropInst.element, previousIndex: prevIdx, currentIndex: curIdx,
                            target: e.target, helper: e.helper, droppedElement: this.target, scopeName: this.scope, handled: handled
                        });
                    }
                    this.removePlaceHolder(dropInst);
                });
            }
            dropInst = this.getSortableInstance(e.target);
            curIdx = dropInst.element.childElementCount;
            prevIdx = this.getIndex(this.target);
            if (dropInst.element.querySelector('.e-list-nrt')) {
                curIdx = curIdx - 1;
            }
            if (this.curTarget === this.target && e.target === this.curTarget) {
                curIdx = prevIdx;
            }
            if (dropInst.element === e.target || (!isPlaceHolderPresent && this.curTarget === this.target)) {
                const beforeDropArgs = {
                    previousIndex: prevIdx, currentIndex: curIdx,
                    target: e.target, droppedElement: this.target, helper: e.helper, cancel: false
                };
                this.trigger('beforeDrop', beforeDropArgs, (observedArgs) => {
                    if ((dropInst.element === e.target || (typeof e.target.className === 'string' && e.target.className.indexOf('e-list-nrt') > -1) || (typeof e.target.className === 'string' && e.target.className.indexOf('e-list-nr-template') > -1)
                        || e.target.closest('.e-list-nr-template')) && !observedArgs.cancel) {
                        this.updateItemClass(dropInst);
                        dropInst.element.appendChild(this.target);
                        this.trigger('drop', {
                            event: e.event, element: dropInst.element, previousIndex: prevIdx, currentIndex: curIdx,
                            target: e.target, helper: e.helper, droppedElement: this.target, scopeName: this.scope
                        });
                    }
                });
            }
            this.target.classList.remove('e-grabbed');
            this.target = null;
            this.curTarget = null;
            remove(e.helper);
            getComponent(this.element, 'draggable').intDestroy(e.event);
        };
        this.bind();
    }
    bind() {
        if (!this.element.id) {
            this.element.id = getUniqueID('sortable');
        }
        if (!this.itemClass) {
            this.itemClass = 'e-sort-item';
            this.dataBind();
        }
        this.initializeDraggable();
    }
    initializeDraggable() {
        new Draggable(this.element, {
            helper: this.getHelper,
            dragStart: this.onDragStart,
            drag: this.onDrag,
            dragStop: this.onDragStop,
            dragTarget: `.${this.itemClass}`,
            enableTapHold: true,
            tapHoldThreshold: 200,
            queryPositionInfo: this.queryPositionInfo,
            distance: 1
        });
        this.wireEvents();
    }
    wireEvents() {
        const wrapper = this.element;
        EventHandler.add(wrapper, 'keydown', this.keyDownHandler, this);
    }
    unwireEvents() {
        const wrapper = this.element;
        EventHandler.remove(wrapper, 'keydown', this.keyDownHandler);
    }
    keyDownHandler(e) {
        if (e.keyCode === 27) {
            const dragStop = getComponent(this.element, 'draggable');
            if (dragStop) {
                dragStop.intDestroy(null);
            }
            const dragWrapper = document.getElementsByClassName('e-sortableclone')[0];
            if (dragWrapper) {
                dragWrapper.remove();
            }
            const dragPlaceholder = document.getElementsByClassName('e-sortable-placeholder')[0];
            if (dragPlaceholder) {
                dragPlaceholder.remove();
            }
        }
    }
    getPlaceHolder(target, instance) {
        if (instance.placeHolder) {
            const placeHolderElement = instance.placeHolder({ element: instance.element, grabbedElement: this.target, target: target });
            placeHolderElement.classList.add('e-sortable-placeholder');
            return placeHolderElement;
        }
        return null;
    }
    isValidTarget(target, instance) {
        return target && compareElementParent(target, instance.element) && target.classList.contains(instance.itemClass) &&
            !target.classList.contains('e-disabled');
    }
    removePlaceHolder(instance) {
        remove(instance.placeHolderElement);
        instance.placeHolderElement = null;
    }
    updateItemClass(instance) {
        if (this !== instance) {
            this.target.classList.remove(this.itemClass);
            this.target.classList.add(instance.itemClass);
        }
    }
    getSortableInstance(element) {
        element = closest(element, `.e-${this.getModuleName()}`);
        if (element) {
            const inst = getComponent(element, Sortable_1);
            return inst.scope && this.scope && inst.scope === this.scope ? inst : this;
        }
        else {
            return this;
        }
    }
    getIndex(target, instance = this, e) {
        let idx;
        let placeHolderPresent;
        [].slice.call(instance.element.children).forEach((element, index) => {
            if (element.classList.contains('e-sortable-placeholder')) {
                placeHolderPresent = true;
            }
            if (element === target) {
                idx = index;
                if (!isNullOrUndefined(e)) {
                    if (placeHolderPresent) {
                        idx -= 1;
                    }
                    const offset = target.getBoundingClientRect();
                    const clientY = offset.bottom - ((offset.bottom - offset.top) / 2);
                    const cltY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                    idx = cltY <= clientY ? idx : idx + 1;
                }
                return;
            }
        });
        return idx;
    }
    getSortableElement(element, instance = this) {
        return closest(element, `.${instance.itemClass}`);
    }
    queryPositionInfo(value) {
        value.left = scrollX ? `${parseFloat(value.left) - scrollX}px` : value.left;
        value.top = scrollY ? `${parseFloat(value.top) - scrollY}px` : value.top;
        return value;
    }
    isPlaceHolderPresent(instance) {
        return instance.placeHolderElement && !!closest(instance.placeHolderElement, `#${instance.element.id}`);
    }
    /**
     * It is used to sort array of elements from source element to destination element.
     *
     * @param destination - Defines the destination element to which the sortable elements needs to be appended.
     *
     * If it is null, then the Sortable library element will be considered as destination.
     * @param targetIndexes - Specifies the sortable elements indexes which needs to be sorted.
     * @param insertBefore - Specifies the index before which the sortable elements needs to be appended.
     * If it is null, elements will be appended as last child.
     * @function moveTo
     * @returns {void}
     */
    moveTo(destination, targetIndexes, insertBefore) {
        moveTo(this.element, destination, targetIndexes, insertBefore);
    }
    /**
     * It is used to destroy the Sortable library.
     */
    destroy() {
        this.unwireEvents();
        if (this.itemClass === 'e-sort-item') {
            this.itemClass = null;
            this.dataBind();
        }
        getComponent(this.element, Draggable).destroy();
        super.destroy();
    }
    getModuleName() {
        return 'sortable';
    }
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'itemClass':
                    [].slice.call(this.element.children).forEach((element) => {
                        if (element.classList.contains(oldProp.itemClass)) {
                            element.classList.remove(oldProp.itemClass);
                        }
                        if (newProp.itemClass) {
                            element.classList.add(newProp.itemClass);
                        }
                    });
                    break;
            }
        }
    }
};
__decorate$1([
    Property(false)
], Sortable.prototype, "enableAnimation", void 0);
__decorate$1([
    Property(null)
], Sortable.prototype, "itemClass", void 0);
__decorate$1([
    Property(null)
], Sortable.prototype, "scope", void 0);
__decorate$1([
    Property()
], Sortable.prototype, "helper", void 0);
__decorate$1([
    Property()
], Sortable.prototype, "placeHolder", void 0);
__decorate$1([
    Event()
], Sortable.prototype, "drag", void 0);
__decorate$1([
    Event()
], Sortable.prototype, "beforeDragStart", void 0);
__decorate$1([
    Event()
], Sortable.prototype, "dragStart", void 0);
__decorate$1([
    Event()
], Sortable.prototype, "beforeDrop", void 0);
__decorate$1([
    Event()
], Sortable.prototype, "drop", void 0);
Sortable = Sortable_1 = __decorate$1([
    NotifyPropertyChanges
], Sortable);
/**
 * It is used to sort array of elements from source element to destination element.
 *
 * @param {HTMLElement} from - The source element from which to move elements.
 * @param {HTMLElement} [to=from] - The destination element to which to move elements. Defaults to the source element.
 * @param {number[]} [targetIndexes] - The indexes of elements to move. If not provided, all children of the source element will be moved.
 * @param {number} [insertBefore] - The index before which to insert the moved elements in the destination element. If not provided, elements will be appended to the end of the destination element.
 * @returns {void}
 * @private
 */
function moveTo(from, to, targetIndexes, insertBefore) {
    let targetElements = [];
    if (!to) {
        to = from;
    }
    if (targetIndexes && targetIndexes.length) {
        targetIndexes.forEach((index) => {
            targetElements.push(from.children[index]);
        });
    }
    else {
        targetElements = [].slice.call(from.children);
    }
    if (isNullOrUndefined(insertBefore)) {
        targetElements.forEach((target) => {
            to.appendChild(target);
        });
    }
    else {
        const insertElement = to.children[insertBefore];
        targetElements.forEach((target) => {
            to.insertBefore(target, insertElement);
        });
    }
}

export { FieldSettings, ListBase, ListView, Sortable, Virtualization, classNames, cssClass, getFieldValues, moveTo };
//# sourceMappingURL=ej2-lists.es2015.js.map
