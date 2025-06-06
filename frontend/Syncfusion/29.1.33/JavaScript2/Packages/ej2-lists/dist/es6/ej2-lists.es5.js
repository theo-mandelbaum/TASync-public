import { isNullOrUndefined, getValue, extend, SanitizeHtmlHelper, prepend, merge, addClass, isVisible, attributes, append, compile, Property, ChildProperty, detach, removeClass, formatUnit, animationMode, Animation, closest, EventHandler, Touch, remove, rippleEffect, Complex, Event, NotifyPropertyChanges, Component, select, isBlazor, getComponent, getUniqueID, Draggable, compareElementParent, Base } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { createCheckBox } from '@syncfusion/ej2-buttons';

/* eslint-disable no-inner-declarations */
var cssClass = {
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
    var defaultAriaAttributes = {
        level: 1,
        listRole: 'presentation',
        itemRole: 'presentation',
        groupItemRole: 'group',
        itemText: 'list-item',
        wrapperRole: 'presentation'
    };
    var defaultListBaseOptions = {
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        var ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        var type = typeofData(dataSource).typeof;
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
        var subChild = createListItemFromArray(createElement, dataSource, isSingleLevel, options, componentInstance);
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
        var subChild = [];
        var curOpt = extend({}, defaultListBaseOptions, options);
        cssClass = getModuleClass(curOpt.moduleName);
        var id = generateId(); // generate id for drop-down-list option.
        for (var i = 0; i < dataSource.length; i++) {
            if (isNullOrUndefined(dataSource[i])) {
                continue;
            }
            var li = void 0;
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                var curData = {
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
                var curData = {
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        cssClass = getModuleClass(curOpt.moduleName);
        var fields = (componentInstance &&
            (componentInstance.getModuleName() === 'listview' || componentInstance.getModuleName() === 'multiselect'))
            ? curOpt.fields : extend({}, ListBase.defaultMappedFields, curOpt.fields);
        var ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        var id;
        var checkboxElement = [];
        if (level) {
            ariaAttributes.level = level;
        }
        var child = [];
        var li;
        var anchorElement;
        if (dataSource && dataSource.length && !isNullOrUndefined(typeofData(dataSource).item) &&
            !Object.prototype.hasOwnProperty.call(typeofData(dataSource).item, fields.id)) {
            id = generateId(); // generate id for drop-down-list option.
        }
        for (var i = 0; i < dataSource.length; i++) {
            var fieldData = getFieldValues(dataSource[i], fields);
            if (isNullOrUndefined(dataSource[i])) {
                continue;
            }
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                var curData = {
                    dataSource: dataSource,
                    curData: dataSource[i],
                    text: fieldData[fields.text],
                    options: curOpt,
                    fields: fields
                };
                curOpt.itemCreating(curData);
            }
            var curItem = dataSource[i];
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                fieldData = getFieldValues(dataSource[i], fields);
            }
            if (Object.prototype.hasOwnProperty.call(fieldData, fields.id) && !isNullOrUndefined(fieldData[fields.id])) {
                id = fieldData[fields.id];
            }
            var innerEle = [];
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
                    var tooltipText = fieldData[fields.tooltip];
                    if (options && options.enableHtmlSanitizer) {
                        tooltipText = SanitizeHtmlHelper.sanitize(tooltipText);
                    }
                    else {
                        var tooltipTextElement = createElement('span', { innerHTML: tooltipText });
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
                    var tooltipText = fieldData[fields.tooltip];
                    if (options && options.enableHtmlSanitizer) {
                        tooltipText = SanitizeHtmlHelper.sanitize(tooltipText);
                    }
                    else {
                        var tooltipTextElement = createElement('span', { innerHTML: tooltipText });
                        tooltipText = tooltipTextElement.innerText;
                        tooltipTextElement = null;
                    }
                    li.setAttribute('title', tooltipText);
                }
                if (Object.prototype.hasOwnProperty.call(fieldData, fields.htmlAttributes) && fieldData[fields.htmlAttributes]) {
                    var htmlAttributes = fieldData[fields.htmlAttributes];
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
                    var attr = { src: fieldData[fields.imageUrl], alt: !isNullOrUndefined(fieldData.name) ? ('Displaying ' + fieldData.name + ' Image') : 'Displaying Image' };
                    merge(attr, fieldData[fields.imageAttributes]);
                    var imageElemnt = createElement('img', { className: cssClass.image, attrs: attr });
                    if (anchorElement) {
                        anchorElement.insertAdjacentElement('afterbegin', imageElemnt);
                    }
                    else {
                        prepend([imageElemnt], li.firstElementChild);
                    }
                }
                if (curOpt.showIcon && Object.prototype.hasOwnProperty.call(fieldData, fields.iconCss) &&
                    !isNullOrUndefined(fieldData[fields.iconCss]) && !curOpt.template) {
                    var iconElement = createElement('div', { className: cssClass.icon + ' ' + fieldData[fields.iconCss] });
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
                var curData = {
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        var li = createListItemFromJson(createElement, dataSource, options, level, isSingleLevel, componentInstance);
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
        var siblingLI;
        var liIndex;
        var liCollections = Array.prototype.slice.call(elementArray);
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
            var liCollections = elementArray;
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
    function groupDataSource(dataSource, fields, sortOrder) {
        if (sortOrder === void 0) { sortOrder = 'None'; }
        var curFields = extend({}, ListBase.defaultMappedFields, fields);
        var cusQuery = new Query().group(curFields.groupBy);
        // need to remove once sorting issues fixed in DataManager
        cusQuery = addSorting(sortOrder, 'key', cusQuery);
        var ds = getDataSource(dataSource, cusQuery);
        dataSource = [];
        for (var j = 0; j < ds.length; j++) {
            var itemObj = ds[j].items;
            var grpItem = {};
            var hdr = 'isHeader';
            grpItem[curFields.text] = ds[j].key;
            grpItem["" + hdr] = true;
            var newtext = curFields.text;
            if (newtext === 'id') {
                newtext = 'text';
                grpItem["" + newtext] = ds[j].key;
            }
            grpItem._id = 'group-list-item-' + (ds[j].key ?
                ds[j].key.toString().trim() : 'undefined');
            grpItem.items = itemObj;
            dataSource.push(grpItem);
            for (var k = 0; k < itemObj.length; k++) {
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
    function addSorting(sortOrder, sortBy, query) {
        if (query === void 0) { query = new Query(); }
        if (sortOrder === 'Ascending') {
            query.sortBy(sortBy, 'ascending', true);
        }
        else if (sortOrder === 'Descending') {
            query.sortBy(sortBy, 'descending', true);
        }
        else {
            for (var i = 0; i < query.queries.length; i++) {
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        var fields = extend({}, ListBase.defaultMappedFields, curOpt.fields);
        var curEle = element.cloneNode(true);
        var jsonAr = [];
        curEle.classList.add('json-parent');
        var childs = curEle.querySelectorAll('.json-parent>li');
        curEle.classList.remove('json-parent');
        for (var i = 0; i < childs.length; i++) {
            var li = childs[i];
            var anchor = li.querySelector('a');
            var ul = li.querySelector('ul');
            var json = {};
            var childNodes = anchor ? anchor.childNodes : li.childNodes;
            var keys = Object.keys(childNodes);
            for (var i_1 = 0; i_1 < childNodes.length; i_1++) {
                if (!(childNodes[Number(keys[i_1])]).hasChildNodes()) {
                    json[fields.text] = childNodes[Number(keys[i_1])].textContent;
                }
            }
            var attributes_1 = getAllAttributes(li);
            if (attributes_1.id) {
                json[fields.id] = attributes_1.id;
                delete attributes_1.id;
            }
            else {
                json[fields.id] = generateId();
            }
            if (Object.keys(attributes_1).length) {
                json[fields.htmlAttributes] = attributes_1;
            }
            if (anchor) {
                attributes_1 = getAllAttributes(anchor);
                if (Object.keys(attributes_1).length) {
                    json[fields.urlAttributes] = attributes_1;
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
        var match = { typeof: null, item: null };
        for (var i = 0; i < data.length; i++) {
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
        var attr = {};
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
        var attributes = {};
        var attr = element.attributes;
        for (var index = 0; index < attr.length; index++) {
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
        var ulElement = createElement('ul', { className: cssClass.ul, attrs: { role: 'presentation' } });
        var curOpt = extend({}, defaultListBaseOptions, options);
        var curFields = extend({}, ListBase.defaultMappedFields, fields);
        var compiledString = compileTemplate(template);
        var liCollection = [];
        var value;
        var id = generateId(); // generate id for drop-down-list option.
        for (var i = 0; i < dataSource.length; i++) {
            var fieldData = getFieldValues(dataSource[i], curFields);
            var curItem = dataSource[i];
            var isHeader = curItem.isHeader;
            if (typeof dataSource[i] === 'string' || typeof dataSource[i] === 'number') {
                value = curItem;
            }
            else {
                value = fieldData[curFields.value];
            }
            if (curOpt.itemCreating && typeof curOpt.itemCreating === 'function') {
                var curData = {
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
            var li = createElement('li', {
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
                var currentID = isHeader ? curOpt.groupTemplateID : curOpt.templateID;
                if (isHeader) {
                    if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                        var compiledElement = compiledString(curItem, componentInstance, 'headerTemplate', currentID, !!curOpt.isStringTemplate, null, li);
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
                        var compiledElement = compiledString(curItem, componentInstance, 'template', currentID, !!curOpt.isStringTemplate, null, li);
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
                var curData = {
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
        var compiledString = compileTemplate(groupTemplate);
        var curFields = extend({}, ListBase.defaultMappedFields, fields);
        var curOpt = extend({}, defaultListBaseOptions, options);
        var category = curFields.groupBy;
        for (var _i = 0, headerItems_1 = headerItems; _i < headerItems_1.length; _i++) {
            var header = headerItems_1[_i];
            var headerData = {};
            headerData["" + category] = header.textContent;
            header.innerHTML = '';
            if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                var compiledElement = compiledString(headerData, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate, null, header);
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
        var subDS = fieldData[fields.child] || [];
        var hasChildren = fieldData[fields.hasChildren];
        //Create Sub child
        if (subDS.length) {
            hasChildren = true;
            element.classList.add(cssClass.hasChild);
            if (options.processSubChild) {
                var subLi = createListFromJson(createElement, subDS, options, ++level);
                element.appendChild(subLi);
            }
        }
        // Create expand and collapse node
        if (!!options.expandCollapse && hasChildren && !options.template) {
            element.firstElementChild.classList.add(cssClass.iconWrapper);
            var expandElement = options.expandIconPosition === 'Left' ? prepend : append;
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        var ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        var text = item;
        var value = item;
        var dataSource;
        if (typeof item !== 'string' && typeof item !== 'number' && typeof item !== 'boolean') {
            dataSource = item;
            text = (typeof fieldData[fields.text] === 'boolean' || typeof fieldData[fields.text] === 'number') ?
                fieldData[fields.text] : (fieldData[fields.text] || '');
            value = fieldData[fields.value];
        }
        var elementID;
        if (!isNullOrUndefined(dataSource) && !isNullOrUndefined(fieldData[fields.id])
            && fieldData[fields.id] !== '') {
            elementID = id;
        }
        else {
            elementID = id + '-' + index;
        }
        var li = createElement('li', {
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
        var moduleClass;
        // eslint-disable-next-line
        return moduleClass = {
            li: "e-" + moduleName + "-item",
            ul: "e-" + moduleName + "-parent e-ul",
            group: "e-" + moduleName + "-group-item",
            icon: "e-" + moduleName + "-icon",
            text: "e-" + moduleName + "-text",
            check: "e-" + moduleName + "-check",
            checked: 'e-checked',
            selected: 'e-selected',
            expanded: 'e-expanded',
            textContent: 'e-text-content',
            hasChild: 'e-has-child',
            level: 'e-level',
            url: "e-" + moduleName + "-url",
            collapsible: 'e-icon-collapsible',
            disabled: 'e-disabled',
            image: "e-" + moduleName + "-img",
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
        var fieldData = getFieldValues(dataSource, fields);
        var attr = { href: fieldData[fields.url] };
        if (Object.prototype.hasOwnProperty.call(fieldData, fields.urlAttributes) && fieldData[fields.urlAttributes]) {
            merge(attr, fieldData[fields.urlAttributes]);
            attr.href = fieldData[fields.url] ? fieldData[fields.url] :
                fieldData[fields.urlAttributes].href;
        }
        var anchorTag;
        if (!isFullNavigation) {
            anchorTag = createElement('a', { className: cssClass.text + ' ' + cssClass.url, innerHTML: text });
        }
        else {
            anchorTag = createElement('a', { className: cssClass.text + ' ' + cssClass.url });
            var anchorWrapper = createElement('div', { className: cssClass.anchorWrap });
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        var ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        var text = item;
        var uID;
        var grpLI;
        var dataSource;
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
        var li = createElement('li', {
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
            var compiledString = compileTemplate(options.groupTemplate);
            if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                var compiledElement = compiledString(item, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate, null, li);
                if (compiledElement) {
                    append(compiledElement, li);
                }
            }
            else {
                append(compiledString(item, componentInstance, 'groupTemplate', curOpt.groupTemplateID, !!curOpt.isStringTemplate), li);
            }
        }
        else if (!grpLI && options && options.template) {
            var compiledString = compileTemplate(options.template);
            if (componentInstance && componentInstance.getModuleName() !== 'listview') {
                var compiledElement = compiledString(item, componentInstance, 'template', curOpt.templateID, !!curOpt.isStringTemplate, null, li);
                if (compiledElement) {
                    append(compiledElement, li);
                }
            }
            else {
                append(compiledString(item, componentInstance, 'template', curOpt.templateID, !!curOpt.isStringTemplate), li);
            }
        }
        else {
            var innerDiv = createElement('div', {
                className: cssClass.textContent,
                attrs: (ariaAttributes.wrapperRole !== '' ? { role: ariaAttributes.wrapperRole } : {})
            });
            if (dataSource && (fieldData[fields.url] || (fieldData[fields.urlAttributes] &&
                fieldData[fields.urlAttributes].href))) {
                innerDiv.appendChild(anchorTag(createElement, dataSource, fields, text, null, curOpt.itemNavigable));
            }
            else {
                var element = createElement('span', {
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        var ariaAttributes = extend({}, defaultAriaAttributes, curOpt.ariaAttributes);
        cssClass = getModuleClass(curOpt.moduleName);
        var ulElement = createElement('ul', {
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
        var curOpt = extend({}, defaultListBaseOptions, options);
        cssClass = getModuleClass(curOpt.moduleName);
        var expandElement = curOpt.expandIconPosition === 'Left' ? prepend : append;
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
    var fieldData = {};
    if (isNullOrUndefined(dataItem) || typeof (dataItem) === 'string' || typeof (dataItem) === 'number'
        || !isNullOrUndefined(dataItem.isHeader)) {
        return dataItem;
    }
    else {
        for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
            var field = _a[_i];
            var dataField = fields["" + field];
            var value = !isNullOrUndefined(dataField) &&
                typeof (dataField) === 'string' ? getValue(dataField, dataItem) : undefined;
            if (!isNullOrUndefined(value)) {
                fieldData["" + dataField] = value;
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
/* eslint-disable @typescript-eslint/no-explicit-any */
// Effect Configuration Effect[] =  [fromViewBackward,fromViewForward,toViewBackward,toviewForward];
var effectsConfig = {
    'None': [],
    'SlideLeft': ['SlideRightOut', 'SlideLeftOut', 'SlideLeftIn', 'SlideRightIn'],
    'SlideDown': ['SlideTopOut', 'SlideBottomOut', 'SlideBottomIn', 'SlideTopIn'],
    'Zoom': ['FadeOut', 'FadeZoomOut', 'FadeZoomIn', 'FadeIn'],
    'Fade': ['FadeOut', 'FadeOut', 'FadeIn', 'FadeIn']
};
var effectsRTLConfig = {
    'None': [],
    'SlideLeft': ['SlideLeftOut', 'SlideRightOut', 'SlideRightIn', 'SlideLeftIn'],
    'SlideDown': ['SlideBottomOut', 'SlideTopOut', 'SlideTopIn', 'SlideBottomIn'],
    'Zoom': ['FadeZoomOut', 'FadeOut', 'FadeIn', 'FadeZoomIn'],
    'Fade': ['FadeOut', 'FadeOut', 'FadeIn', 'FadeIn']
};
// don't use space in classnames.
var classNames = {
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
var LISTVIEW_TEMPLATE_PROPERTY = 'Template';
var LISTVIEW_GROUPTEMPLATE_PROPERTY = 'GroupTemplate';
var LISTVIEW_HEADERTEMPLATE_PROPERTY = 'HeaderTemplate';
var swipeVelocity = 0.5;
/**
 * Represents the field settings of the ListView.
 */
var FieldSettings = /** @class */ (function (_super) {
    __extends(FieldSettings, _super);
    function FieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return FieldSettings;
}(ChildProperty));
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
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    /**
     * Constructor for creating the widget
     *
     * @param options
     *
     * @param element
     */
    function ListView(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.previousSelectedItems = [];
        _this.hiddenItems = [];
        _this.enabledItems = [];
        _this.disabledItems = [];
        return _this;
    }
    /**
     * @param newProp
     *
     * @param oldProp
     *
     * @private
     */
    ListView.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
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
    };
    // Model Changes
    ListView.prototype.setHTMLAttribute = function () {
        if (!isNullOrUndefined(this.htmlAttributes) && Object.keys(this.htmlAttributes).length) {
            attributes(this.element, this.htmlAttributes);
        }
    };
    ListView.prototype.setCSSClass = function (oldCSSClass) {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' ').filter(function (css) { return css; }));
        }
        if (oldCSSClass) {
            removeClass([this.element], oldCSSClass.split(' ').filter(function (css) { return css; }));
        }
    };
    ListView.prototype.setSize = function () {
        this.element.style.height = formatUnit(this.height);
        this.element.style.width = formatUnit(this.width);
        this.isWindow = this.element.clientHeight ? false : true;
    };
    ListView.prototype.setEnable = function () {
        this.enableElement(this.element, this.enable);
    };
    ListView.prototype.setEnableRTL = function () {
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        else {
            this.element.classList.remove('e-rtl');
        }
    };
    ListView.prototype.enableElement = function (element, isEnabled) {
        if (isEnabled) {
            element.classList.remove(classNames.disable);
        }
        else {
            element.classList.add(classNames.disable);
        }
    };
    // Support Component Functions
    ListView.prototype.header = function (text, showBack, prop) {
        if (this.headerEle === undefined && this.showHeader) {
            this.headerEle = this.createElement('div', { className: classNames.header });
            var innerHeaderEle = this.createElement('span', { className: classNames.headerText });
            if (this.enableHtmlSanitizer) {
                this.setProperties({ headerTitle: SanitizeHtmlHelper.sanitize(this.headerTitle) }, true);
                innerHeaderEle.innerText = this.headerTitle;
            }
            else {
                innerHeaderEle.innerHTML = this.headerTitle;
            }
            var textEle = this.createElement('div', { className: classNames.text, innerHTML: innerHeaderEle.outerHTML });
            var hedBackButton = this.createElement('div', {
                className: classNames.icon + ' ' + classNames.backIcon + ' ' + classNames.backButton,
                attrs: { style: 'display:none;' }
            });
            this.headerEle.appendChild(hedBackButton);
            this.headerEle.appendChild(textEle);
            if (this.headerTemplate) {
                var compiledString = compile(this.headerTemplate);
                var headerTemplateEle = this.createElement('div', { className: classNames.headerTemplateText });
                var compiledElement = compiledString({}, this, prop, this.LISTVIEW_HEADERTEMPLATE_ID, null, null, this.headerEle);
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
                var textEle = this.headerEle.querySelector('.' + classNames.headerText);
                var hedBackButton = this.headerEle.querySelector('.' + classNames.backIcon);
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
    };
    // Animation Related Functions
    ListView.prototype.switchView = function (fromView, toView, reverse) {
        var _this = this;
        if (fromView && toView) {
            var fPos_1 = fromView.style.position;
            var overflow_1 = (this.element.style.overflow !== 'hidden') ? this.element.style.overflow : '';
            fromView.style.position = 'absolute';
            fromView.classList.add('e-view');
            var anim = void 0;
            var duration = this.animation.duration;
            if (this.animation.effect) {
                anim = (this.enableRtl ? effectsRTLConfig[this.animation.effect] : effectsConfig[this.animation.effect]);
            }
            else {
                var slideLeft = 'SlideLeft';
                anim = effectsConfig["" + slideLeft];
                reverse = this.enableRtl;
                duration = 0;
            }
            this.element.style.overflow = 'hidden';
            this.aniObj.animate(fromView, {
                name: (reverse === true ? anim[0] : anim[1]),
                duration: (duration === 0 && animationMode === 'Enable') ? 400 : duration,
                timingFunction: this.animation.easing,
                end: function () {
                    fromView.style.display = 'none';
                    _this.element.style.overflow = overflow_1;
                    fromView.style.position = fPos_1;
                    fromView.classList.remove('e-view');
                }
            });
            toView.style.display = '';
            this.aniObj.animate(toView, {
                name: (reverse === true ? anim[2] : anim[3]),
                duration: (duration === 0 && animationMode === 'Enable') ? 400 : duration,
                timingFunction: this.animation.easing,
                end: function () {
                    _this.trigger('actionComplete');
                }
            });
            this.curUL = toView;
        }
    };
    ListView.prototype.preRender = function () {
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
            templateID: "" + this.element.id + LISTVIEW_TEMPLATE_PROPERTY,
            groupTemplateID: "" + this.element.id + LISTVIEW_GROUPTEMPLATE_PROPERTY,
            enableHtmlSanitizer: this.enableHtmlSanitizer
        };
        this.initialization();
    };
    ListView.prototype.initialization = function () {
        this.curDSLevel = [];
        this.animateOptions = {};
        this.curViewDS = [];
        this.currentLiElements = [];
        this.isNestedList = false;
        this.selectedData = [];
        this.selectedId = this.enablePersistence ? this.selectedId : [];
        this.LISTVIEW_TEMPLATE_ID = "" + this.element.id + LISTVIEW_TEMPLATE_PROPERTY;
        this.LISTVIEW_GROUPTEMPLATE_ID = "" + this.element.id + LISTVIEW_GROUPTEMPLATE_PROPERTY;
        this.LISTVIEW_HEADERTEMPLATE_ID = "" + this.element.id + LISTVIEW_HEADERTEMPLATE_PROPERTY;
        this.aniObj = new Animation(this.animateOptions);
        this.removeElement(this.curUL);
        this.removeElement(this.ulElement);
        this.removeElement(this.headerEle);
        this.removeElement(this.contentContainer);
        this.curUL = this.ulElement = this.liCollection = this.headerEle = this.contentContainer = undefined;
    };
    ListView.prototype.renderCheckbox = function (args) {
        var _this = this;
        if (args.item.classList.contains(classNames.hasChild)) {
            this.isNestedList = true;
        }
        if (this.showCheckBox && args.item.classList.contains(classNames.listItem)) {
            var fieldData_1;
            var checkboxElement = createCheckBox(this.createElement, false, {
                checked: false, enableRtl: this.enableRtl,
                cssClass: classNames.listviewCheckbox
            });
            checkboxElement.setAttribute('role', 'checkbox');
            var frameElement_1 = checkboxElement.querySelector('.' + classNames.checkboxIcon);
            args.item.classList.add(classNames.itemCheckList);
            args.item.firstElementChild.classList.add(classNames.checkbox);
            if (typeof this.dataSource[0] !== 'string' && typeof this.dataSource[0] !== 'number') {
                fieldData_1 = getFieldValues(args.curData, this.listBaseOption.fields);
                if (this.enablePersistence && !isNullOrUndefined(this.selectedId)) {
                    var index = this.selectedId.findIndex(function (e) { return e === fieldData_1[_this.listBaseOption.fields.id].toString(); });
                    if (index !== -1) {
                        this.checkInternally(args, checkboxElement);
                    }
                }
                else if (fieldData_1[this.listBaseOption.fields.isChecked]) {
                    this.checkInternally(args, checkboxElement);
                }
            }
            else if (((typeof this.dataSource[0] === 'string' ||
                typeof this.dataSource[0] === 'number') && this.selectedData.indexOf(args.text) !== -1)) {
                this.checkInternally(args, checkboxElement);
            }
            checkboxElement.setAttribute('aria-checked', frameElement_1.classList.contains(classNames.checked) ? 'true' : 'false');
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
    };
    ListView.prototype.checkInternally = function (args, checkboxElement) {
        args.item.classList.add(classNames.selected);
        checkboxElement.querySelector('.' + classNames.checkboxIcon).classList.add(classNames.checked);
        checkboxElement.setAttribute('aria-checked', 'true');
    };
    /**
     * Checks the specific list item by passing the unchecked fields as an argument to this method.
     *
     * @param  {Fields | HTMLElement | Element} item - It accepts Fields or HTML list element as an argument.
     */
    ListView.prototype.checkItem = function (item) {
        this.toggleCheckBase(item, true);
    };
    ListView.prototype.toggleCheckBase = function (item, checked) {
        if (this.showCheckBox) {
            var liElement = item;
            if (item instanceof Object && item.constructor !== HTMLLIElement) {
                liElement = this.getLiFromObjOrElement(item);
            }
            if (!isNullOrUndefined(liElement)) {
                var checkboxIcon = liElement.querySelector('.' + classNames.checkboxIcon);
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
    };
    /**
     * Uncheck the specific list item by passing the checked fields as an argument to this method.
     *
     * @param  {Fields | HTMLElement | Element} item - It accepts Fields or HTML list element as an argument.
     */
    ListView.prototype.uncheckItem = function (item) {
        this.toggleCheckBase(item, false);
    };
    /**
     * Checks all the unchecked items in the ListView.
     */
    ListView.prototype.checkAllItems = function () {
        this.toggleAllCheckBase(true);
    };
    /**
     * Uncheck all the checked items in ListView.
     */
    ListView.prototype.uncheckAllItems = function () {
        this.toggleAllCheckBase(false);
    };
    ListView.prototype.toggleAllCheckBase = function (checked) {
        if (this.showCheckBox) {
            for (var i = 0; i < this.liCollection.length; i++) {
                var checkIcon = this.liCollection[i].querySelector('.' + classNames.checkboxIcon);
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
    };
    ListView.prototype.setCheckbox = function () {
        if (this.showCheckBox) {
            var liCollection = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.listItem));
            var args = {
                item: undefined, curData: undefined, dataSource: undefined, fields: undefined,
                options: undefined, text: ''
            };
            for (var i = 0; i < liCollection.length; i++) {
                var element = liCollection[i];
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
            var liCollection = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.itemCheckList));
            for (var i = 0; i < liCollection.length; i++) {
                var element = liCollection[i];
                element.classList.remove(classNames.selected);
                element.firstElementChild.classList.remove(classNames.checkbox);
                this.removeElement(element.querySelector('.' + classNames.checkboxWrapper));
            }
            if (this.selectedItems) {
                this.selectedItems.item.classList.add(classNames.selected);
            }
        }
    };
    /**
     * Refresh the height of the list item only on enabling the virtualization property.
     */
    ListView.prototype.refreshItemHeight = function () {
        if (this.virtualizationModule) {
            this.virtualizationModule.refreshItemHeight();
        }
    };
    ListView.prototype.handleCheckboxState = function (li, checkIcon, checkboxElement, isCheckedBefore, isFocusedBefore, eventArgs, isSetCheckboxLI, textAreaFocus) {
        this.trigger('select', eventArgs, function (observedArgs) {
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
    };
    ListView.prototype.clickHandler = function (e) {
        if (Array.isArray(this.dataSource) && this.dataSource.length === 0) {
            return;
        }
        var target = e.target;
        this.targetElement = target;
        var classList = target.classList;
        var closestElement;
        if (classList.contains(classNames.backIcon) || classList.contains(classNames.headerText)) {
            if (this.showCheckBox && this.curDSLevel[this.curDSLevel.length - 1]) {
                this.uncheckAllItems();
            }
            this.back();
        }
        else {
            var li = closest(target.parentNode, '.' + classNames.listItem);
            if (li === null) {
                li = target;
            }
            this.removeFocus();
            if (this.enable && this.showCheckBox && this.isValidLI(li)) {
                if (e.target.classList.contains(classNames.checkboxIcon)) {
                    li.classList.add(classNames.focused);
                    if (isNullOrUndefined(li.querySelector('.' + classNames.checked))) {
                        var args = {
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
                        var eventArgs = this.selectEventData(li, e);
                        var checkIcon = li.querySelector('.' + classNames.checkboxIcon);
                        merge(eventArgs, { isChecked: checkIcon.classList.contains(classNames.checked) });
                        var checkboxElement = li.querySelector('.' + classNames.checkboxWrapper);
                        var isCheckedBefore = checkIcon.classList.contains(classNames.checked);
                        var isFocusedBefore = li.classList.contains(classNames.focused);
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
    };
    ListView.prototype.removeElement = function (element) {
        return element && element.parentNode && element.parentNode.removeChild(element);
    };
    ListView.prototype.hoverHandler = function (e) {
        var curLi = closest(e.target.parentNode, '.' + classNames.listItem);
        this.setHoverLI(curLi);
    };
    ListView.prototype.leaveHandler = function () {
        this.removeHover();
    };
    ListView.prototype.homeKeyHandler = function (e, end) {
        e.preventDefault();
        if (Object.keys(this.dataSource).length && this.curUL) {
            var li = this.curUL.querySelectorAll('.' + classNames.listItem);
            var focusedElement = this.curUL.querySelector('.' + classNames.focused) ||
                this.curUL.querySelector('.' + classNames.selected);
            if (focusedElement) {
                focusedElement.classList.remove(classNames.focused);
                if (!this.showCheckBox) {
                    focusedElement.classList.remove(classNames.selected);
                }
            }
            var index = !end ? 0 : li.length - 1;
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
    };
    ListView.prototype.onArrowKeyDown = function (e, prev) {
        var siblingLI;
        var li;
        var hasChild = !isNullOrUndefined(this.curUL.querySelector('.' + classNames.hasChild)) ? true : false;
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
    };
    ListView.prototype.arrowKeyHandler = function (e, prev) {
        var _this = this;
        e.preventDefault();
        if (Object.keys(this.dataSource).length && this.curUL) {
            var siblingLI = this.onArrowKeyDown(e, prev);
            var elementTop = this.element.getBoundingClientRect().top;
            var elementHeight = this.element.getBoundingClientRect().height;
            var firstItemBounds = this.curUL.querySelector('.' + classNames.listItem).getBoundingClientRect();
            var heightDiff = void 0;
            var groupItemBounds = void 0;
            if (this.fields.groupBy) {
                groupItemBounds = this.curUL.querySelector('.' + classNames.groupListItem).getBoundingClientRect();
            }
            if (siblingLI) {
                var siblingTop = siblingLI.getBoundingClientRect().top;
                var siblingHeight = siblingLI.getBoundingClientRect().height;
                if (!prev) {
                    var height = this.isWindow ? window.innerHeight : elementHeight;
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
                this.onUIScrolled = function () {
                    _this.onArrowKeyDown(e, prev);
                    _this.onUIScrolled = undefined;
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
                    var topHeight = groupItemBounds ? groupItemBounds.top : firstItemBounds.top;
                    var headerBounds = this.headerEle.getBoundingClientRect();
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
    };
    ListView.prototype.enterKeyHandler = function (e) {
        if (Object.keys(this.dataSource).length && this.curUL) {
            var hasChild = !isNullOrUndefined(this.curUL.querySelector('.' + classNames.hasChild)) ? true : false;
            var li = this.curUL.querySelector('.' + classNames.focused);
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
    };
    ListView.prototype.spaceKeyHandler = function (e) {
        if (this.enable && this.showCheckBox && Object.keys(this.dataSource).length && this.curUL) {
            e.preventDefault();
            var li = this.curUL.querySelector('.' + classNames.focused);
            var checkboxElement = void 0;
            var checkIcon = void 0;
            if (!isNullOrUndefined(li) && isNullOrUndefined(li.querySelector('.' + classNames.checked))) {
                var args = {
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
            var eventArgs = this.selectEventData(li, e);
            merge(eventArgs, { isChecked: checkIcon ? checkIcon.classList.contains(classNames.checked) : false });
            if (!isNullOrUndefined(li)) {
                var cbElement = li.querySelector('.' + classNames.checkboxWrapper);
                var checkboxIcon = li.querySelector('.' + classNames.checkboxIcon);
                var isCheckedBefore = checkboxIcon.classList.contains(classNames.checked);
                var isFocusedBefore = li.classList.contains(classNames.focused);
                this.handleCheckboxState(li, checkboxIcon, cbElement, isCheckedBefore, isFocusedBefore, eventArgs, false);
            }
            this.updateSelectedId();
        }
    };
    ListView.prototype.keyActionHandler = function (e) {
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
    };
    ListView.prototype.swipeActionHandler = function (e) {
        if (e.swipeDirection === 'Right' && e.velocity > swipeVelocity && e.originalEvent.type === 'touchend') {
            if (this.showCheckBox && this.curDSLevel[this.curDSLevel.length - 1]) {
                this.uncheckAllItems();
            }
            this.back();
        }
    };
    ListView.prototype.focusout = function () {
        if (Object.keys(this.dataSource).length && this.curUL) {
            var focusedElement = this.curUL.querySelector('.' + classNames.focused);
            if (focusedElement) {
                focusedElement.classList.remove(classNames.focused);
                if (!this.showCheckBox && !isNullOrUndefined(this.selectedLI)) {
                    this.selectedLI.classList.add(classNames.selected);
                }
            }
        }
    };
    ListView.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'keydown', this.keyActionHandler, this);
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'mouseover', this.hoverHandler, this);
        EventHandler.add(this.element, 'mouseout', this.leaveHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusout, this);
        this.touchModule = new Touch(this.element, { swipe: this.swipeActionHandler.bind(this) });
        if (!isNullOrUndefined(this.scroll)) {
            EventHandler.add(this.element, 'scroll', this.onListScroll, this);
        }
    };
    ListView.prototype.unWireEvents = function () {
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
    };
    ListView.prototype.removeFocus = function () {
        var focusedLI = this.element.querySelectorAll('.' + classNames.focused);
        for (var _i = 0, focusedLI_1 = focusedLI; _i < focusedLI_1.length; _i++) {
            var ele = focusedLI_1[_i];
            ele.classList.remove(classNames.focused);
        }
    };
    ListView.prototype.removeHover = function () {
        var hoverLI = this.element.querySelector('.' + classNames.hover);
        if (hoverLI) {
            hoverLI.classList.remove(classNames.hover);
        }
    };
    ListView.prototype.removeSelect = function (li) {
        if (isNullOrUndefined(li)) {
            var selectedLI = this.element.querySelectorAll('.' + classNames.selected);
            for (var _i = 0, selectedLI_1 = selectedLI; _i < selectedLI_1.length; _i++) {
                var ele = selectedLI_1[_i];
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
    };
    ListView.prototype.isValidLI = function (li) {
        return (li && li.classList.contains(classNames.listItem)
            && !li.classList.contains(classNames.groupListItem)
            && !li.classList.contains(classNames.disable));
    };
    ListView.prototype.setCheckboxLI = function (li, e) {
        if (this.isValidLI(li) && this.enable && this.showCheckBox) {
            if (this.curUL.querySelector('.' + classNames.focused)) {
                this.curUL.querySelector('.' + classNames.focused).classList.remove(classNames.focused);
            }
            var textAreaFocus = li.querySelector('textarea') || li.querySelector('input');
            li.classList.add(classNames.focused);
            if (!isNullOrUndefined(e)) {
                if (e.target === textAreaFocus) {
                    textAreaFocus.classList.add('e-focused');
                }
            }
            var checkboxElement = li.querySelector('.' + classNames.checkboxWrapper);
            var checkIcon = checkboxElement.querySelector('.' + classNames.checkboxIcon + '.' + classNames.icon);
            this.removeHover();
            var isCheckedBefore = checkIcon.classList.contains(classNames.checked);
            var isFocusedBefore = li.classList.contains(classNames.focused);
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
            var eventArgs = this.selectEventData(li, e);
            merge(eventArgs, { isChecked: checkIcon.classList.contains(classNames.checked) });
            if (this.enableVirtualization) {
                this.virtualizationModule.setCheckboxLI(li, e);
            }
            this.handleCheckboxState(li, checkIcon, checkboxElement, isCheckedBefore, isFocusedBefore, eventArgs, true, textAreaFocus);
            this.setSelectedItemData(li);
            this.renderSubList(li);
        }
    };
    ListView.prototype.selectEventData = function (li, e) {
        var data = this.getItemData(li);
        var fieldData = getFieldValues(data, this.listBaseOption.fields);
        var selectedItem;
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
        var eventArgs = {};
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
    };
    ListView.prototype.setSelectedItemData = function (li) {
        var data = this.getItemData(li);
        var fieldData = getFieldValues(data, this.listBaseOption.fields);
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
    };
    ListView.prototype.setSelectLI = function (li, e) {
        var _this = this;
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
            var eventArgs = this.selectEventData(li, e);
            this.trigger('select', eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    _this.selectedLI = li;
                    _this.renderSubList(li);
                }
                else {
                    li.classList.remove(classNames.selected);
                    _this.selectedLI = li;
                }
            });
        }
    };
    ListView.prototype.setHoverLI = function (li) {
        if (this.isValidLI(li) && !li.classList.contains(classNames.hover) && this.enable) {
            var lastLi = this.element.querySelectorAll('.' + classNames.hover);
            if (lastLi && lastLi.length) {
                removeClass(lastLi, classNames.hover);
            }
            if (!li.classList.contains(classNames.selected) || this.showCheckBox) {
                li.classList.add(classNames.hover);
            }
        }
    };
    //Data Source Related Functions
    ListView.prototype.getSubDS = function () {
        var levelKeys = this.curDSLevel;
        if (levelKeys.length) {
            var ds = this.localData;
            for (var _i = 0, levelKeys_1 = levelKeys; _i < levelKeys_1.length; _i++) {
                var key = levelKeys_1[_i];
                var field = {};
                field[this.fields.id] = key;
                this.curDSJSON = this.findItemFromDS(ds, field);
                var fieldData = getFieldValues(this.curDSJSON, this.listBaseOption.fields);
                ds = this.curDSJSON ? fieldData[this.fields.child] : ds;
            }
            return ds;
        }
        return this.localData;
    };
    ListView.prototype.getItemData = function (li) {
        var dataSource = this.dataSource instanceof DataManager ?
            this.localData : this.dataSource;
        var fields = this.getElementUID(li);
        var curDS;
        if (isNullOrUndefined(this.element.querySelector('.' + classNames.hasChild)) && this.fields.groupBy) {
            curDS = this.curViewDS;
        }
        else {
            curDS = dataSource;
        }
        return this.findItemFromDS(curDS, fields);
    };
    ListView.prototype.findItemFromDS = function (dataSource, fields, parent) {
        var _this = this;
        var resultJSON;
        if (dataSource && dataSource.length && fields) {
            dataSource.some(function (data) {
                var fieldData = getFieldValues(data, _this.listBaseOption.fields);
                //(!(fid) || id === fid) && (!(ftext) || text === ftext) && (!!fid || !!ftext)
                if ((fields[_this.fields.id] || fields[_this.fields.text]) &&
                    (!fields[_this.fields.id] || (!isNullOrUndefined(fieldData[_this.fields.id]) &&
                        fieldData[_this.fields.id].toString()) === fields[_this.fields.id].toString()) &&
                    (!fields[_this.fields.text] || fieldData[_this.fields.text] === fields[_this.fields.text])) {
                    resultJSON = (parent ? dataSource : data);
                }
                else if (typeof data !== 'object' && dataSource.indexOf(data) !== -1) {
                    resultJSON = (parent ? dataSource : data);
                }
                else if (!isNullOrUndefined(fields[_this.fields.id]) && isNullOrUndefined(fieldData[_this.fields.id])) {
                    var li = _this.element.querySelector('[data-uid="'
                        + fields[_this.fields.id] + '"]');
                    if (li && li.innerText.trim() === fieldData[_this.fields.text]) {
                        resultJSON = data;
                    }
                }
                else if (Object.prototype.hasOwnProperty.call(fieldData, _this.fields.child) &&
                    fieldData[_this.fields.child].length) {
                    resultJSON = _this.findItemFromDS(fieldData[_this.fields.child], fields, parent);
                }
                return !!resultJSON;
            });
        }
        else {
            resultJSON = dataSource;
        }
        return resultJSON;
    };
    ListView.prototype.getQuery = function () {
        var columns = [];
        var query = (this.query ? this.query : new Query());
        if (!this.query) {
            for (var _i = 0, _a = Object.keys(this.fields.properties); _i < _a.length; _i++) {
                var column = _a[_i];
                if (column !== 'tableName' && !!(this.fields["" + column]) &&
                    this.fields["" + column] !==
                        ListBase.defaultMappedFields["" + column]
                    && columns.indexOf(this.fields["" + column]) === -1) {
                    columns.push(this.fields["" + column]);
                }
            }
            query.select(columns);
            if (Object.prototype.hasOwnProperty.call(this.fields.properties, 'tableName')) {
                query.from(this.fields.tableName);
            }
        }
        return query;
    };
    ListView.prototype.setViewDataSource = function (dataSource) {
        if (dataSource === void 0) { dataSource = this.localData; }
        var fieldValue = (isNullOrUndefined(this.fields.sortBy)) ? this.fields.text : this.fields.sortBy;
        var query = ListBase.addSorting(this.sortOrder, fieldValue);
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
    };
    ListView.prototype.isInAnimation = function () {
        return this.curUL.classList.contains('.e-animate');
    };
    ListView.prototype.renderRemoteLists = function (e, listViewComponent) {
        if (this.isDestroyed) {
            return;
        }
        this.localData = e.result;
        listViewComponent.removeElement(listViewComponent.contentContainer);
        this.renderList();
        this.trigger('actionComplete', e);
    };
    ListView.prototype.triggerActionFailure = function (e) {
        if (this.isDestroyed) {
            return;
        }
        this.trigger('actionFailure', e);
    };
    ListView.prototype.setLocalData = function () {
        var _this = this;
        this.trigger('actionBegin');
        if (this.dataSource instanceof DataManager) {
            if (this.dataSource.ready) {
                this.dataSource.ready.then(function (e) {
                    _this.isOffline = _this.dataSource.dataSource.offline;
                    if (_this.dataSource instanceof DataManager && _this.isOffline) {
                        _this.renderRemoteLists(e, _this);
                    }
                }).catch(function (e) {
                    _this.triggerActionFailure(e);
                });
            }
            else {
                this.dataSource.executeQuery(this.getQuery()).then(function (e) {
                    _this.renderRemoteLists(e, _this);
                }).catch(function (e) {
                    _this.triggerActionFailure(e);
                });
            }
        }
        else if (!this.dataSource || !this.dataSource.length) {
            var ul = this.element.querySelector('ul');
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
    };
    ListView.prototype.reRender = function () {
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
    };
    ListView.prototype.resetCurrentList = function () {
        this.setViewDataSource(this.curViewDS);
        this.contentContainer.innerHTML = '';
        this.createList();
        this.renderIntoDom(this.curUL);
    };
    ListView.prototype.setAttributes = function (liElements) {
        for (var i = 0; i < liElements.length; i++) {
            var element = liElements[parseInt(i.toString(), 10)];
            if (element.classList.contains('e-list-item')) {
                element.setAttribute('id', this.element.id + '_' + element.getAttribute('data-uid'));
                element.setAttribute('tabindex', '-1');
            }
        }
    };
    ListView.prototype.createList = function () {
        this.currentLiElements = [];
        this.isNestedList = false;
        this.ulElement = this.curUL = ListBase.createList(this.createElement, this.curViewDS, this.listBaseOption, null, this);
        this.liCollection = this.curUL.querySelectorAll('.' + classNames.listItem);
        this.setAttributes(this.liCollection);
    };
    ListView.prototype.renderSubList = function (li) {
        this.liElement = li;
        var uID = li.getAttribute('data-uid');
        if (li.classList.contains(classNames.hasChild) && uID) {
            var ul = closest(li.parentNode, '.' + classNames.parentItem);
            var ele = this.element.querySelector('[pid=\'' + uID + '\']');
            this.curDSLevel.push(uID);
            this.setViewDataSource(this.getSubDS());
            if (this.enableVirtualization) {
                this.virtualizationModule.updateDOMItemCount();
            }
            if (!ele) {
                var data = this.curViewDS;
                ele = ListBase.createListFromJson(this.createElement, data, this.listBaseOption, this.curDSLevel.length, null, this);
                if (this.isReact) {
                    this.renderReactTemplates();
                }
                var lists = ele.querySelectorAll('.' + classNames.listItem);
                this.setAttributes(lists);
                ele.setAttribute('pID', uID);
                ele.style.display = 'none';
                this.renderIntoDom(ele);
            }
            this.switchView(ul, ele);
            this.liCollection = this.curUL.querySelectorAll('.' + classNames.listItem);
            if (this.selectedItems) {
                var fieldData = getFieldValues(this.selectedItems.data, this.listBaseOption.fields);
                this.header((fieldData[this.listBaseOption.fields.text]), true, 'header');
            }
            this.selectedLI = undefined;
        }
    };
    ListView.prototype.renderIntoDom = function (ele) {
        this.contentContainer.appendChild(ele);
    };
    ListView.prototype.renderList = function (data) {
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
    };
    ListView.prototype.getElementUID = function (obj) {
        var fields = {};
        if (obj instanceof Element) {
            fields[this.fields.id] = obj.getAttribute('data-uid');
        }
        else {
            fields = obj;
        }
        return fields;
    };
    /**
     * Initializes the ListView component rendering.
     */
    ListView.prototype.render = function () {
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
    };
    /**
     * It is used to destroy the ListView component.
     */
    ListView.prototype.destroy = function () {
        if (this.isReact) {
            this.clearTemplate();
        }
        this.unWireEvents();
        var classAr = [classNames.root, classNames.disable, 'e-rtl',
            'e-has-header', 'e-lib'].concat(this.cssClass ? this.cssClass.split(' ').filter(function (css) { return css; }) : []);
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
        _super.prototype.destroy.call(this);
    };
    /**
     * Switches back from the navigated sub list item.
     */
    ListView.prototype.back = function () {
        var pID = this.curDSLevel[this.curDSLevel.length - 1];
        if (pID === undefined || this.isInAnimation()) {
            return;
        }
        this.curDSLevel.pop();
        this.setViewDataSource(this.getSubDS());
        if (this.enableVirtualization) {
            this.virtualizationModule.updateDOMItemCount();
        }
        var toUL = this.element.querySelector('[data-uid=\'' + pID + '\']');
        var fromUL = this.curUL;
        if (!toUL) {
            this.createList();
            this.renderIntoDom(this.ulElement);
            toUL = this.curUL;
        }
        else {
            toUL = toUL.parentElement;
        }
        var fieldData = getFieldValues(this.curDSJSON, this.listBaseOption.fields);
        var text = fieldData[this.fields.text];
        this.switchView(fromUL, toUL, true);
        this.removeFocus();
        var li = this.element.querySelector('[data-uid=\'' + pID + '\']');
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
    };
    /**
     * Selects the list item from the ListView by passing the elements or field object.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.selectItem = function (item) {
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
    };
    /**
     * This method allows for deselecting a list item within the ListView. The item to be deselected can be specified by passing the element or field object.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass an element Object or Fields as an Object with ID and Text fields.
     */
    ListView.prototype.unselectItem = function (item) {
        if (isNullOrUndefined(item)) {
            this.removeSelect();
        }
        else {
            var li = this.getLiFromObjOrElement(item);
            if (!isNullOrUndefined(li)) {
                this.removeSelect(li);
            }
        }
    };
    ListView.prototype.getLiFromObjOrElement = function (obj) {
        var li;
        var dataSource = this.dataSource instanceof DataManager ?
            this.localData : this.dataSource;
        if (!isNullOrUndefined(obj)) {
            if (typeof dataSource[0] === 'string' || typeof dataSource[0] === 'number') {
                if (obj instanceof Element) {
                    var uid = obj.getAttribute('data-uid').toString();
                    for (var i = 0; i < this.liCollection.length; i++) {
                        if (this.liCollection[parseInt(i.toString(), 10)].getAttribute('data-uid').toString() === uid) {
                            li = this.liCollection[parseInt(i.toString(), 10)];
                            break;
                        }
                    }
                }
                else {
                    Array.prototype.some.call(this.curUL.querySelectorAll('.' + classNames.listItem), function (item) {
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
                var resultJSON = this.getItemData(obj);
                var fieldData = getFieldValues(resultJSON, this.listBaseOption.fields);
                if (resultJSON) {
                    li = this.element.querySelector('[data-uid="'
                        + fieldData[this.fields.id] + '"]');
                    if (!this.enableVirtualization && isNullOrUndefined(li)) {
                        var curLi = this.element.querySelectorAll('.' + classNames.listItem);
                        for (var i = 0; i < curLi.length; i++) {
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
    };
    /**
     * Selects multiple list items from the ListView.
     *
     * @param  {Fields[] | HTMLElement[] | Element[]} item - We can pass array of
     *  elements or array of fields Object with ID and Text fields.
     */
    ListView.prototype.selectMultipleItems = function (item) {
        if (!isNullOrUndefined(item)) {
            for (var i = 0; i < item.length; i++) {
                if (!isNullOrUndefined(item[parseInt(i.toString(), 10)])) {
                    this.selectItem(item[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    ListView.prototype.getParentId = function () {
        var parentId = [];
        if (this.isNestedList) {
            for (var i = this.curDSLevel.length - 1; i >= 0; i--) {
                parentId.push(this.curDSLevel[parseInt(i.toString(), 10)]);
            }
        }
        return parentId;
    };
    ListView.prototype.updateSelectedId = function () {
        this.selectedId = [];
        var liCollection = this.curUL.getElementsByClassName(classNames.selected);
        for (var i = 0; i < liCollection.length; i++) {
            var tempData = this.getItemData(liCollection[parseInt(i.toString(), 10)]);
            if (!isNullOrUndefined(tempData) && tempData[this.listBaseOption.fields.id]) {
                this.selectedId.push(tempData[this.listBaseOption.fields.id]);
            }
        }
    };
    /**
     * Gets the details of the currently selected item from the list items.
     *
     */
    ListView.prototype.getSelectedItems = function () {
        var finalValue;
        var isCompleted = false;
        this.selectedId = [];
        var dataSource = this.dataSource instanceof DataManager ?
            this.localData : this.dataSource;
        if (this.enableVirtualization && !isCompleted) {
            finalValue = this.virtualizationModule.getSelectedItems();
            isCompleted = true;
        }
        else if (this.showCheckBox && !isCompleted) {
            var liCollection = this.curUL.getElementsByClassName(classNames.selected);
            var liTextCollection = [];
            var liDataCollection = [];
            this.selectedId = [];
            var dataParent = [];
            for (var i = 0; i < liCollection.length; i++) {
                if (typeof dataSource[0] === 'string' || typeof dataSource[0] === 'number') {
                    liTextCollection.push(liCollection[parseInt(i.toString(), 10)].innerText.trim());
                }
                else {
                    var tempData = this.getItemData(liCollection[parseInt(i.toString(), 10)]);
                    var fieldData = getFieldValues(tempData, this.listBaseOption.fields);
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
            var liElement = this.element.getElementsByClassName(classNames.selected)[0];
            var fieldData = getFieldValues(this.getItemData(liElement), this.listBaseOption.fields);
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
    };
    /**
     * Finds out an item details from the current list.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.findItem = function (item) {
        return this.getItemData(item);
    };
    /**
     * Enables the disabled list items by passing the Id and text fields.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.enableItem = function (item) {
        this.setItemState(item, true);
        if (this.enableVirtualization) {
            this.virtualizationModule.enableItem(item);
        }
    };
    /**
     * Disables the list items by passing the Id and text fields.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.disableItem = function (item) {
        this.setItemState(item, false);
        if (this.enableVirtualization) {
            this.virtualizationModule.disableItem(item);
        }
    };
    //A function that used to set state of the list item like enable, disable.
    ListView.prototype.setItemState = function (item, isEnable) {
        var resultJSON = this.getItemData(item);
        var fieldData = getFieldValues(resultJSON, this.listBaseOption.fields);
        if (resultJSON) {
            var li = this.element.querySelector('[data-uid="' + fieldData[this.fields.id] + '"]');
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
    };
    /**
     * Shows the hide list item from the ListView.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.showItem = function (item) {
        this.showHideItem(item, false, '');
        if (this.enableVirtualization) {
            this.virtualizationModule.showItem(item);
        }
    };
    /**
     * Hides an list item from the ListView.
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.hideItem = function (item) {
        this.showHideItem(item, true, 'none');
        if (this.enableVirtualization) {
            this.virtualizationModule.hideItem(item);
        }
    };
    ListView.prototype.showHideItem = function (obj, isHide, display) {
        var resultJSON = this.getItemData(obj);
        var fieldData = getFieldValues(resultJSON, this.listBaseOption.fields);
        if (resultJSON) {
            var li = this.element.querySelector('[data-uid="' + fieldData[this.fields.id] + '"]');
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
    };
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
    ListView.prototype.addItem = function (data, fields, index) {
        if (fields === void 0) { fields = undefined; }
        var dataSource = this.dataSource instanceof DataManager
            ? this.localData : this.dataSource;
        this.addItemInternally(data, fields, dataSource, index);
    };
    ListView.prototype.addItemInternally = function (data, fields, dataSource, index) {
        if (data instanceof Array) {
            if (this.enableVirtualization) {
                this.virtualizationModule.addItem(data, fields, dataSource, index);
            }
            else {
                var ds = this.findItemFromDS(dataSource, fields);
                var child = void 0;
                if (ds) {
                    var fieldData = getFieldValues(ds, this.listBaseOption.fields);
                    child = fieldData[this.fields.child];
                    if (!child) {
                        child = [];
                    }
                    child = child.concat(data);
                }
                // check for whether target is nested level or top level in list
                if (ds instanceof Array) {
                    for (var i = 0; i < data.length; i++) {
                        dataSource = this.addItemAtIndex(index, dataSource, data[parseInt(i.toString(), 10)]);
                        this.setViewDataSource(dataSource);
                        // since it is top level target, get the content container's first child
                        // as it is always the top level UL
                        var targetUL = this.contentContainer
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
    };
    ListView.prototype.addItemAtIndex = function (index, newDataSource, itemData) {
        var isIndexValid = !(isNullOrUndefined(index)) && index >= 0 &&
            index < newDataSource.length && isNullOrUndefined(this.listBaseOption.fields.groupBy);
        if (isIndexValid) {
            newDataSource.splice(index, 0, itemData);
        }
        else {
            newDataSource.push(itemData);
        }
        return newDataSource;
    };
    ListView.prototype.addItemInNestedList = function (targetItemData, itemQueue) {
        var targetItemId = targetItemData[this.fields.id];
        var targetChildDS = targetItemData[this.fields.child];
        var isAlreadyRenderedUL = this.element.querySelector('[pid=\'' + targetItemId + '\']');
        var targetLi = this.element.querySelector('[data-uid=\'' + targetItemId + '\']');
        var targetUL = isAlreadyRenderedUL
            ? isAlreadyRenderedUL
            : targetLi
                ? closest(targetLi, 'ul')
                : null;
        var targetDS = isAlreadyRenderedUL ? targetChildDS : [targetItemData];
        var isTargetEmptyChild = targetLi ? !targetLi.classList.contains(classNames.hasChild) : false;
        // if li element is already rendered, that element needs to be refreshed so that
        // it becomes child viewable due to new child items are added now
        if (isTargetEmptyChild) {
            var targetRefreshedElement = ListBase.createListItemFromJson(this.createElement, targetDS, this.listBaseOption, null, null, this);
            this.setAttributes(targetRefreshedElement);
            targetUL.insertBefore(targetRefreshedElement[0], targetLi);
            detach(targetLi);
        }
        // if it is already rendered element, we need to create and append new elements
        if (isAlreadyRenderedUL && itemQueue) {
            for (var i = 0; i < itemQueue.length; i++) {
                targetDS.push(itemQueue[parseInt(i.toString(), 10)]);
                this.addItemIntoDom(itemQueue[parseInt(i.toString(), 10)], targetUL, targetDS);
            }
        }
    };
    ListView.prototype.addItemIntoDom = function (currentItem, targetUL, curViewDS) {
        var index = curViewDS.indexOf(currentItem);
        this.addListItem(currentItem, index, targetUL, curViewDS);
        var curItemDS = curViewDS[index - 1];
        if (curItemDS && curItemDS.isHeader && curItemDS.items.length === 1) {
            this.addListItem(curItemDS, (index - 1), targetUL, curViewDS);
        }
    };
    ListView.prototype.addListItem = function (dataSource, index, ulElement, curViewDS) {
        var target = this.getLiFromObjOrElement(curViewDS[index + 1]) ||
            this.getLiFromObjOrElement(curViewDS[index + 2]) || null;
        var li = ListBase.createListItemFromJson(this.createElement, [dataSource], this.listBaseOption, null, null, this);
        this.setAttributes(li);
        if (this.template && this.isReact) {
            this.renderReactTemplates();
        }
        if (this.fields.groupBy && curViewDS[index + 1] && curViewDS[index + 1].isHeader) {
            var targetEle = this.getLiFromObjOrElement(curViewDS[index - 1]);
            if (targetEle) {
                target = targetEle.nextElementSibling;
            }
        }
        ulElement.insertBefore(li[0], target);
    };
    /**
     * Removes the list item from the data source based on a passed
     *  element like fields: { text: 'Name', tooltip: 'Name', id:'id'}
     *
     * @param  {Fields | HTMLElement | Element} item - We can pass element Object or Fields as Object with ID and Text fields.
     */
    ListView.prototype.removeItem = function (item) {
        var listDataSource = this.dataSource instanceof DataManager
            ? this.localData : this.dataSource;
        if (this.enableVirtualization) {
            this.virtualizationModule.removeItem(item);
        }
        else {
            this.removeItemFromList(item, listDataSource);
        }
    };
    ListView.prototype.removeItemFromList = function (obj, listDataSource) {
        var _this = this;
        var curViewDS = this.curViewDS;
        var fields = obj instanceof Element ? this.getElementUID(obj) : obj;
        var dataSource = this.findItemFromDS(listDataSource, fields, true);
        if (dataSource) {
            var data_1 = this.findItemFromDS(dataSource, fields);
            var index = curViewDS.indexOf(data_1);
            var li = this.getLiFromObjOrElement(obj);
            var groupLi = void 0;
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
            var foundData = (dataSource.length - 1) <= 0
                ? this.findParent(this.localData, this.fields.id, function (value) { return value === data_1[_this.fields.id]; }, null) : null;
            var dsIndex = dataSource.indexOf(data_1);
            dataSource.splice(dsIndex, 1);
            this.setViewDataSource(listDataSource);
            if (foundData
                && foundData.parent
                && Array.isArray(foundData.parent[this.fields.child])
                && foundData.parent[this.fields.child].length <= 0) {
                var parentLi = this.getLiFromObjOrElement(foundData.parent);
                if (parentLi) {
                    var li_1 = ListBase.createListItemFromJson(this.createElement, [foundData.parent], this.listBaseOption, null, null, this);
                    this.setAttributes(li_1);
                    parentLi.parentElement.insertBefore(li_1[0], parentLi);
                    parentLi.parentElement.removeChild(parentLi);
                }
            }
            if (dataSource.length <= 0) {
                this.back();
            }
            this.liCollection = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.listItem));
        }
    };
    // validate before removing an element whether the current view is inside target element's child view
    ListView.prototype.validateNestedView = function (li) {
        var liID = li ? li.getAttribute('data-uid').toString().toLowerCase() : null;
        if (liID && this.curDSLevel && this.curDSLevel.length > 0) {
            while (this.curDSLevel.some(function (id) { return id.toString().toLowerCase() === liID; })) {
                this.back();
            }
        }
    };
    /**
     * Removes multiple items from the ListView by passing the array of elements or array of field objects.
     *
     * @param  {Fields[] | HTMLElement[] | Element[]} item - We can pass array of elements or array of field Object with ID and Text fields.
     */
    ListView.prototype.removeMultipleItems = function (item) {
        if (item.length) {
            for (var i = 0; i < item.length; i++) {
                this.removeItem(item[parseInt(i.toString(), 10)]);
            }
        }
    };
    ListView.prototype.findParent = function (dataSource, id, callback, parent) {
        if (Object.prototype.hasOwnProperty.call(dataSource, id) && callback(dataSource[id]) === true) {
            return extend({}, dataSource);
        }
        for (var i = 0; i < Object.keys(dataSource).length; i++) {
            if (dataSource[Object.keys(dataSource)[parseInt(i.toString(), 10)]]
                && typeof dataSource[Object.keys(dataSource)[parseInt(i.toString(), 10)]] === 'object') {
                var result = this.findParent(dataSource[Object.keys(dataSource)[parseInt(i.toString(), 10)]], id, callback, dataSource);
                if (result != null) {
                    if (!result.parent) {
                        result.parent = parent;
                    }
                    return result;
                }
            }
        }
        return null;
    };
    // Module Required function
    ListView.prototype.getModuleName = function () {
        return 'listview';
    };
    ListView.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableVirtualization) {
            modules.push({ args: [this], member: 'virtualization', name: 'Virtualization' });
        }
        return modules;
    };
    ListView.prototype.onListScroll = function (e) {
        var args = { originalEvent: e, scrollDirection: 'Bottom', distanceY: this.element.scrollHeight - this.element.scrollTop };
        var currentScrollTop = this.element.scrollTop;
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
    };
    /**
     * Get the properties to be maintained in the persisted state.
     */
    ListView.prototype.getPersistData = function () {
        return this.addOnPersist(['cssClass', 'enableRtl', 'htmlAttributes',
            'enable', 'fields', 'animation', 'headerTitle',
            'sortOrder', 'showIcon', 'height', 'width', 'showCheckBox', 'checkBoxPosition', 'selectedId']);
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
    return ListView;
}(Component));

var listElementCount = 1.5;
var windowElementCount = 3;
var Virtualization = /** @class */ (function () {
    function Virtualization(instance) {
        this.elementDifference = 0;
        this.listViewInstance = instance;
    }
    /**
     * For internal use only.
     *
     * @private
     */
    Virtualization.prototype.isNgTemplate = function () {
        return !isNullOrUndefined(this.listViewInstance.templateRef) && typeof this.listViewInstance.templateRef !== 'string';
    };
    /**
     * Checks if the platform is a Vue and its template property is a function type.
     *
     * @returns {boolean} indicating the result of the check
     */
    Virtualization.prototype.isVueFunctionTemplate = function () {
        return this.listViewInstance.isVue && typeof this.listViewInstance.template === 'function';
    };
    /**
     * For internal use only.
     *
     * @private
     */
    Virtualization.prototype.uiVirtualization = function () {
        this.wireScrollEvent(false);
        var curViewDS = this.listViewInstance.curViewDS;
        var isRendered = this.listViewInstance.isRendered;
        var firstIndex = isRendered && !isNullOrUndefined(this.uiFirstIndex) && this.uiLastIndex <= Object.keys(curViewDS).length
            ? this.uiFirstIndex : 0;
        var firstDs = curViewDS.slice(firstIndex, firstIndex + 1);
        this.listViewInstance.ulElement = this.listViewInstance.curUL = ListBase.createList(this.listViewInstance.createElement, firstDs, this.listViewInstance.listBaseOption, null, this.listViewInstance);
        this.listViewInstance.contentContainer = this.listViewInstance.createElement('div', { className: classNames.container });
        this.listViewInstance.element.appendChild(this.listViewInstance.contentContainer);
        this.listViewInstance.contentContainer.appendChild(this.listViewInstance.ulElement);
        this.listItemHeight = this.listViewInstance.ulElement.firstElementChild.getBoundingClientRect().height;
        this.expectedDomItemCount = this.ValidateItemCount(10000);
        this.updateDOMItemCount();
        var lastIndex = isRendered && !isNullOrUndefined(this.uiLastIndex) && this.listDiff !== 0
            ? this.uiLastIndex : this.domItemCount - 1;
        this.uiFirstIndex = firstIndex;
        this.uiLastIndex = lastIndex;
        var otherDs = curViewDS.slice(firstIndex + 1, lastIndex + 1);
        var listItems = ListBase.createListItemFromJson(this.listViewInstance.createElement, otherDs, this.listViewInstance.listBaseOption, null, null, this.listViewInstance);
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
    };
    Virtualization.prototype.wireScrollEvent = function (destroy) {
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
    };
    Virtualization.prototype.ValidateItemCount = function (dataSourceLength) {
        var height = parseFloat(formatUnit(this.listViewInstance.height));
        var itemCount;
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
    };
    Virtualization.prototype.updateDOMItemCount = function () {
        this.domItemCount = this.ValidateItemCount(Object.keys(this.listViewInstance.curViewDS).length);
    };
    Virtualization.prototype.uiIndicesInitialization = function () {
        this.uiIndices = { 'activeIndices': [], 'disabledItemIndices': [], 'hiddenItemIndices': [] };
        var data = this.listViewInstance.curViewDS;
        for (var i = 0; i < data.length; i++) {
            if (this.listViewInstance.showCheckBox && data[i][this.listViewInstance.fields.isChecked]) {
                this.uiIndices.activeIndices.push(i);
            }
            if (!isNullOrUndefined(data[parseInt(i.toString(), 10)][this.listViewInstance.fields.enabled]) &&
                !data[i][this.listViewInstance.fields.enabled]) {
                (this.uiIndices.disabledItemIndices.push(i));
            }
        }
        if (this.isNgTemplate()) {
            var items = this.listViewInstance.element.querySelectorAll('.' + classNames.listItem);
            for (var index = 0; index < items.length; index++) {
                items[index].context = this.listViewInstance.viewContainerRef.get(index).context;
            }
        }
    };
    Virtualization.prototype.refreshItemHeight = function () {
        if (this.listViewInstance.curViewDS.length) {
            var curViewDS = this.listViewInstance.curViewDS;
            this.listItemHeight = this.topElement.nextSibling.getBoundingClientRect().height;
            this.totalHeight = (Object.keys(curViewDS).length * this.listItemHeight) - (this.domItemCount * this.listItemHeight);
            this.bottomElementHeight = this.totalHeight;
            this.bottomElement.style.height = this.totalHeight + 'px';
        }
    };
    Virtualization.prototype.getscrollerHeight = function (startingHeight) {
        return this.listViewInstance.isWindow ? (((pageYOffset - startingHeight) <= 0) ? 0 :
            (pageYOffset - startingHeight)) : ((this.listViewInstance.element.scrollTop - startingHeight) <= 0) ? 0 :
            (this.listViewInstance.element.scrollTop - startingHeight);
    };
    Virtualization.prototype.onVirtualUiScroll = function () {
        var _a;
        var startingHeight;
        var curViewDS = this.listViewInstance.curViewDS;
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
        var scroll = this.getscrollerHeight(startingHeight);
        this.topElementHeight = this.listItemHeight * Math.floor(scroll / this.listItemHeight);
        this.bottomElementHeight = this.totalHeight - this.topElementHeight;
        _a = scroll <= this.totalHeight ?
            [this.topElementHeight, this.bottomElementHeight] : [this.totalHeight, 0], this.topElementHeight = _a[0], this.bottomElementHeight = _a[1];
        if (this.topElementHeight !== parseFloat(this.topElement.style.height)) {
            this.topElement.style.height = this.topElementHeight + 'px';
            this.bottomElement.style.height = this.bottomElementHeight + 'px';
            if (scroll > this.scrollPosition) {
                var listDiff = Math.round(((this.topElementHeight / this.listItemHeight) - this.listDiff));
                if (listDiff > (this.expectedDomItemCount + 5)) {
                    this.onLongScroll(listDiff, true);
                }
                else {
                    this.onNormalScroll(listDiff, true);
                }
            }
            else {
                var listDiff = Math.round((this.listDiff - (this.topElementHeight / this.listItemHeight)));
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
    };
    Virtualization.prototype.onLongScroll = function (listDiff, isScrollingDown) {
        var index = isScrollingDown ? (this.uiFirstIndex + listDiff) : (this.uiFirstIndex - listDiff);
        var elements = this.listViewInstance.ulElement.querySelectorAll('li');
        for (var i = 0; i < elements.length; i++) {
            this.updateUI(elements[i], index);
            index++;
        }
        this.uiLastIndex = isScrollingDown ? (this.uiLastIndex + listDiff) : (this.uiLastIndex - listDiff);
        this.uiFirstIndex = isScrollingDown ? (this.uiFirstIndex + listDiff) : (this.uiFirstIndex - listDiff);
    };
    Virtualization.prototype.onNormalScroll = function (listDiff, isScrollingDown) {
        if (isScrollingDown) {
            for (var i = 0; i < listDiff; i++) {
                var index = ++this.uiLastIndex;
                this.updateUI(this.topElement.nextElementSibling, index, this.bottomElement);
                this.uiFirstIndex++;
            }
        }
        else {
            for (var i = 0; i < listDiff; i++) {
                var index = --this.uiFirstIndex;
                var target = this.topElement.nextSibling;
                this.updateUI(this.bottomElement.previousElementSibling, index, target);
                this.uiLastIndex--;
            }
        }
    };
    Virtualization.prototype.updateUiContent = function (element, index) {
        var curViewDs = this.listViewInstance.curViewDS;
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
                var textContent = element.querySelector('.' + classNames.textContent);
                var curViewDS = this.listViewInstance.curViewDS[index];
                var iconCss = curViewDS[this.listViewInstance.fields.iconCss].toString();
                var target = this.listViewInstance.createElement('div', {
                    className: classNames.listIcon + ' ' + iconCss
                });
                textContent.insertBefore(target, element.querySelector('.' + classNames.listItemText));
            }
        }
        if (this.listViewInstance.showCheckBox && this.listViewInstance.fields.groupBy) {
            if (!this.checkListWrapper) {
                this.checkListWrapper = this.listViewInstance.curUL.querySelector('.' + classNames.checkboxWrapper).cloneNode(true);
            }
            var textContent = element.querySelector('.' + classNames.textContent);
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
    };
    Virtualization.prototype.changeElementAttributes = function (element, index) {
        element.classList.remove(classNames.disable);
        if (this.uiIndices.disabledItemIndices.length && this.uiIndices.disabledItemIndices.indexOf(index) !== -1) {
            element.classList.add(classNames.disable);
        }
        element.style.display = '';
        if (this.uiIndices.hiddenItemIndices.length && this.uiIndices.hiddenItemIndices.indexOf(index) !== -1) {
            element.style.display = 'none';
        }
        if (this.listViewInstance.showCheckBox) {
            var checklistElement = element.querySelector('.' + classNames.checkboxWrapper);
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
    };
    Virtualization.prototype.findDSAndIndexFromId = function (ds, fields) {
        var _this = this;
        var resultJSON = {};
        fields = this.listViewInstance.getElementUID(fields);
        if (!isNullOrUndefined(fields)) {
            ds.some(function (data, index) {
                if ((fields[_this.listViewInstance.fields.id] &&
                    fields[_this.listViewInstance.fields.id]
                        === (data[_this.listViewInstance.fields.id] && data[_this.listViewInstance.fields.id]) || fields === data)) {
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
    };
    Virtualization.prototype.getSelectedItems = function () {
        var _this = this;
        if (!isNullOrUndefined(this.activeIndex) || (this.listViewInstance.showCheckBox && this.uiIndices.activeIndices.length)) {
            var dataCollection = [];
            var textCollection = [];
            if (typeof this.listViewInstance.dataSource[0] === 'string' ||
                typeof this.listViewInstance.dataSource[0] === 'number') {
                var curViewDS_1 = this.listViewInstance.curViewDS;
                if (this.listViewInstance.showCheckBox) {
                    var indices = this.uiIndices.activeIndices;
                    for (var i = 0; i < indices.length; i++) {
                        dataCollection.push(curViewDS_1[indices[i]]);
                    }
                    return {
                        text: dataCollection,
                        data: dataCollection,
                        index: this.uiIndices.activeIndices.map(function (index) {
                            return _this.listViewInstance.dataSource.indexOf(curViewDS_1[index]);
                        })
                    };
                }
                else {
                    return {
                        text: curViewDS_1[this.activeIndex],
                        data: curViewDS_1[this.activeIndex],
                        index: this.listViewInstance.dataSource.indexOf(curViewDS_1[this.activeIndex])
                    };
                }
            }
            else {
                var curViewDS_2 = this.listViewInstance.curViewDS;
                var text = this.listViewInstance.fields.text;
                if (this.listViewInstance.showCheckBox) {
                    var indexArray = this.uiIndices.activeIndices;
                    for (var i = 0; i < indexArray.length; i++) {
                        textCollection.push(curViewDS_2[indexArray[i]]["" + text]);
                        dataCollection.push(curViewDS_2[indexArray[parseInt(i.toString(), 10)]]);
                    }
                    var dataSource_1 = this.listViewInstance.dataSource instanceof DataManager
                        ? curViewDS_2 : this.listViewInstance.dataSource;
                    return {
                        text: textCollection,
                        data: dataCollection,
                        index: this.uiIndices.activeIndices.map(function (index) {
                            return dataSource_1.indexOf(curViewDS_2[index]);
                        })
                    };
                }
                else {
                    var dataSource = this.listViewInstance.dataSource instanceof DataManager
                        ? curViewDS_2 : this.listViewInstance.dataSource;
                    return {
                        text: curViewDS_2[this.activeIndex][this.listViewInstance.fields.text],
                        data: curViewDS_2[this.activeIndex],
                        index: dataSource.indexOf(curViewDS_2[this.activeIndex])
                    };
                }
            }
        }
        else {
            return undefined;
        }
    };
    Virtualization.prototype.selectItem = function (obj) {
        var _this = this;
        var resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            var isSelected = this.activeIndex === resutJSON.index;
            var isChecked_1;
            this.activeIndex = resutJSON.index;
            if (this.listViewInstance.showCheckBox) {
                if (this.uiIndices.activeIndices.indexOf(resutJSON.index) === -1) {
                    isChecked_1 = true;
                    this.uiIndices.activeIndices.push(resutJSON.index);
                }
                else {
                    isChecked_1 = false;
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
                var eventArgs_1;
                if (typeof this.listViewInstance.dataSource[0] === 'string' ||
                    typeof this.listViewInstance.dataSource[0] === 'number') {
                    eventArgs_1 = {
                        text: this.listViewInstance.curViewDS[this.activeIndex],
                        data: this.listViewInstance.curViewDS[this.activeIndex],
                        index: this.activeIndex
                    };
                }
                else {
                    var curViewDS = this.listViewInstance.curViewDS;
                    eventArgs_1 = {
                        text: curViewDS[this.activeIndex][this.listViewInstance.fields.text],
                        data: curViewDS[this.activeIndex],
                        index: this.activeIndex
                    };
                }
                if (this.listViewInstance.showCheckBox) {
                    this.listViewInstance.trigger('select', eventArgs_1, function (observedArgs) {
                        if (observedArgs.cancel) {
                            if (!isChecked_1) {
                                eventArgs_1.isChecked = isChecked_1;
                                _this.uiIndices.activeIndices.push(resutJSON.index);
                            }
                            else {
                                eventArgs_1.isChecked = !isChecked_1;
                                _this.uiIndices.activeIndices.splice(_this.uiIndices.activeIndices.indexOf(resutJSON.index), 1);
                            }
                        }
                    });
                }
                else if (!isSelected) {
                    this.listViewInstance.removeSelect();
                    this.listViewInstance.trigger('select', eventArgs_1, function (observedArgs) {
                        if (observedArgs.cancel) {
                            _this.activeIndex = undefined;
                        }
                    });
                }
            }
        }
        else if (isNullOrUndefined(obj) && !this.listViewInstance.showCheckBox) {
            this.listViewInstance.removeSelect();
            this.activeIndex = undefined;
        }
    };
    Virtualization.prototype.enableItem = function (obj) {
        var resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            this.uiIndices.disabledItemIndices.splice(this.uiIndices.disabledItemIndices.indexOf(resutJSON.index), 1);
        }
    };
    Virtualization.prototype.disableItem = function (obj) {
        var resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length && this.uiIndices.disabledItemIndices.indexOf(resutJSON.index) === -1) {
            this.uiIndices.disabledItemIndices.push(resutJSON.index);
        }
    };
    Virtualization.prototype.showItem = function (obj) {
        var resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length) {
            this.uiIndices.hiddenItemIndices.splice(this.uiIndices.hiddenItemIndices.indexOf(resutJSON.index), 1);
        }
    };
    Virtualization.prototype.hideItem = function (obj) {
        var resutJSON = this.findDSAndIndexFromId(this.listViewInstance.curViewDS, obj);
        if (Object.keys(resutJSON).length && this.uiIndices.hiddenItemIndices.indexOf(resutJSON.index) === -1) {
            this.uiIndices.hiddenItemIndices.push(resutJSON.index);
        }
    };
    Virtualization.prototype.removeItem = function (obj) {
        var dataSource;
        var curViewDS = this.listViewInstance.curViewDS;
        var resutJSON = this.findDSAndIndexFromId(curViewDS, obj);
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
        var listDataSource = this.listViewInstance.dataSource instanceof DataManager
            ? this.listViewInstance.localData : this.listViewInstance.dataSource;
        var index = listDataSource.indexOf(dataSource);
        if (index !== -1) {
            listDataSource.splice(index, 1);
            this.listViewInstance.setViewDataSource(listDataSource);
        }
        // recollect all the list item into collection
        this.listViewInstance.liCollection =
            this.listViewInstance.curUL.querySelectorAll('li');
    };
    // eslint-disable-next-line
    Virtualization.prototype.setCheckboxLI = function (li, e) {
        var index = Array.prototype.indexOf.call(this.listViewInstance.curUL.querySelectorAll('li'), li) + this.uiFirstIndex;
        this.activeIndex = Array.prototype.indexOf.call(this.listViewInstance.curUL.querySelectorAll('li'), li) + this.uiFirstIndex;
        if (li.classList.contains(classNames.selected)) {
            if (this.uiIndices.activeIndices.indexOf(index) === -1) {
                this.uiIndices.activeIndices.push(index);
            }
        }
        else {
            this.uiIndices.activeIndices.splice(this.uiIndices.activeIndices.indexOf(index), 1);
        }
    };
    // eslint-disable-next-line
    Virtualization.prototype.setSelectLI = function (li, e) {
        this.activeIndex = Array.prototype.indexOf.call(this.listViewInstance.curUL.querySelectorAll('li'), li) + this.uiFirstIndex;
    };
    Virtualization.prototype.checkedItem = function (checked) {
        if (checked) {
            this.uiIndices.activeIndices = [];
            this.activeIndex = undefined;
            var data = this.listViewInstance.curViewDS;
            for (var index = 0; index < data.length; index++) {
                if (!data[index].isHeader) {
                    this.uiIndices.activeIndices.push(index);
                }
            }
        }
        else {
            this.activeIndex = undefined;
            this.uiIndices.activeIndices = [];
        }
    };
    Virtualization.prototype.addUiItem = function (index) {
        // virtually new add list item based on the scollbar position
        // if the scroll bar is at the top, just pretend the new item has been added since no UI
        // change is required for the item that has been added at last but when scroll bar is at the bottom
        // just detach top and inject into bottom to mimic new item is added
        var curViewDs = this.listViewInstance.curViewDS;
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
            var liItem = this.listViewInstance.curUL.lastElementChild.previousSibling;
            var target = this.listViewInstance.getLiFromObjOrElement(curViewDs[index + 1]) ||
                this.listViewInstance.getLiFromObjOrElement(curViewDs[index + 2]);
            if (target) {
                this.bottomElement.style.height = parseFloat(this.bottomElement.style.height) + this.listItemHeight + 'px';
                this.updateUI(liItem, index, target);
            }
        }
        else {
            var liItem = this.listViewInstance.curUL.firstElementChild.nextSibling;
            var target = void 0;
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
    };
    Virtualization.prototype.removeUiItem = function (index) {
        this.totalHeight -= this.listItemHeight;
        var curViewDS = this.listViewInstance.curViewDS[index];
        var liItem = this.listViewInstance.getLiFromObjOrElement(curViewDS);
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
                    var checklistElement = liItem.querySelector('.' + classNames.checkboxWrapper);
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
    };
    Virtualization.prototype.changeUiIndices = function (index, increment) {
        var keys = Object.keys(this.uiIndices);
        for (var ind = 0; ind < keys.length; ind++) {
            this.uiIndices[keys[ind]] = this.uiIndices[keys[ind]].map(function (i) {
                if (i >= index) {
                    return increment ? ++i : --i;
                }
                else {
                    return i;
                }
            });
        }
    };
    Virtualization.prototype.addItem = function (data, fields, dataSource, index) {
        for (var i = 0; i < data.length; i++) {
            var currentItem = data[i];
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
                var ds = this.listViewInstance.findItemFromDS(dataSource, fields);
                if (ds instanceof Array) {
                    if (this.listViewInstance.ulElement) {
                        var index_1 = this.listViewInstance.curViewDS.indexOf(currentItem);
                        // inject new list item into DOM
                        this.createAndInjectNewItem(currentItem, index_1);
                        // check for group header item
                        var curViewDS = this.listViewInstance.curViewDS[index_1 - 1];
                        if (curViewDS && curViewDS.isHeader && curViewDS.items.length === 1) {
                            // target group item index in datasource
                            --index_1;
                            // inject new group header into DOM for previously created list item
                            this.createAndInjectNewItem(curViewDS, index_1);
                        }
                    }
                    // recollect all the list item into collection
                    this.listViewInstance.liCollection =
                        this.listViewInstance.curUL.querySelectorAll('li');
                }
            }
            else {
                var index_2 = this.listViewInstance.curViewDS.indexOf(currentItem);
                // virtually new add list item based on the scollbar position
                this.addUiItem(index_2);
                // check for group header item needs to be added
                var curViewDS = this.listViewInstance.curViewDS[index_2 - 1];
                if (curViewDS && curViewDS.isHeader && curViewDS.items.length === 1) {
                    this.addUiItem(index_2 - 1);
                }
            }
        }
    };
    Virtualization.prototype.createAndInjectNewItem = function (itemData, index) {
        // generate li item for given datasource
        var target;
        var li = ListBase.createListItemFromJson(this.listViewInstance.createElement, [itemData], this.listViewInstance.listBaseOption, null, null, this.listViewInstance);
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
            var targetEle = this.listViewInstance.getLiFromObjOrElement(this.listViewInstance.curViewDS[index - 1]);
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
    };
    Virtualization.prototype.createUIItem = function (args) {
        if (!args.item.classList.contains('e-list-group-item')) {
            this.templateData = args.curData.isHeader ? args.curData.items[0] :
                args.curData;
            if (this.listViewInstance.showCheckBox) {
                this.listViewInstance.renderCheckbox(args);
                if ((!isNullOrUndefined(this.listViewInstance.virtualCheckBox)) &&
                    (!isNullOrUndefined(this.listViewInstance.virtualCheckBox.outerHTML))) {
                    var div_1 = document.createElement('div');
                    var commonTemplate = '<div class="e-text-content" role="presentation"> ' +
                        '<span class="e-list-text"> ${' + this.listViewInstance.fields.text + '} </span></div>';
                    var templateFunction = compile(this.listViewInstance.template || commonTemplate, this.listViewInstance);
                    var nodes = templateFunction(this.templateData, this.listViewInstance);
                    if (this.listViewInstance.template && this.listViewInstance.isReact) {
                        this.listViewInstance.renderReactTemplates();
                    }
                    [].slice.call(nodes).forEach(function (ele) {
                        div_1.appendChild(ele);
                    });
                    if (div_1.children && div_1.children[0]) {
                        div_1.children[0].classList.add('e-checkbox');
                        if (this.listViewInstance.checkBoxPosition === 'Left') {
                            div_1.children[0].classList.add('e-checkbox-left');
                        }
                        else {
                            div_1.children[0].classList.add('e-checkbox-right');
                        }
                        if (this.listViewInstance.checkBoxPosition === 'Left') {
                            div_1.children[0].insertBefore(this.listViewInstance.virtualCheckBox, div_1.childNodes[0].children[0]);
                        }
                        else {
                            div_1.children[0].appendChild(this.listViewInstance.virtualCheckBox);
                        }
                        while (args.item.lastChild) {
                            args.item.removeChild(args.item.lastChild);
                        }
                        [].slice.call(div_1.children).forEach(function (ele) {
                            args.item.appendChild(ele);
                        });
                    }
                }
            }
        }
    };
    Virtualization.prototype.reRenderUiVirtualization = function () {
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
    };
    Virtualization.prototype.updateUI = function (element, index, targetElement) {
        var onChange = this.isNgTemplate() ? this.onNgChange : this.onChange;
        if (this.listViewInstance.template || this.listViewInstance.groupTemplate) {
            var curViewDS = this.listViewInstance.curViewDS[index];
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
    };
    /**
     * Handles the UI change in vue for the list view.
     *
     * @param {DataSource} newData - The new data source for the list view.
     * @param {ElementContext} listElement - The HTML element context for the list view.
     * @param {Virtualization} virtualThis - The virtualization context for the list view.
     * @returns {void}
     */
    Virtualization.prototype.onChange = function (newData, listElement, virtualThis) {
        var liItem = ListBase.createListItemFromJson(virtualThis.listViewInstance.createElement, [newData], virtualThis.listViewInstance.listBaseOption, null, null, virtualThis.listViewInstance);
        if (virtualThis.listViewInstance.isReact) {
            virtualThis.listViewInstance.renderReactTemplates();
        }
        while (listElement.lastChild) {
            listElement.removeChild(listElement.lastChild);
        }
        [].slice.call(liItem[0].children).forEach(function (ele) {
            listElement.appendChild(ele);
        });
    };
    Virtualization.prototype.onNgChange = function (newData, listElement, virtualThis) {
        // compile given target element with template for new data
        var templateCompiler = compile(virtualThis.listViewInstance.template);
        var resultElement = templateCompiler(newData);
        while (listElement.lastChild) {
            listElement.removeChild(listElement.lastChild);
        }
        listElement.appendChild(resultElement[0]);
    };
    Virtualization.prototype.getModuleName = function () {
        return 'virtualization';
    };
    Virtualization.prototype.destroy = function () {
        this.wireScrollEvent(true);
        this.topElement = null;
        this.bottomElement = null;
    };
    return Virtualization;
}());

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
var Sortable = /** @class */ (function (_super) {
    __extends$1(Sortable, _super);
    function Sortable(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.getHelper = function (e) {
            var target = _this.getSortableElement(e.sender.target);
            if (!_this.isValidTarget(target, _this)) {
                return false;
            }
            var element;
            if (_this.helper) {
                element = _this.helper({ sender: target, element: e.element });
            }
            else {
                element = target.cloneNode(true);
                element.style.width = target.offsetWidth + "px";
                element.style.height = target.offsetHeight + "px";
            }
            addClass([element], ['e-sortableclone']);
            document.body.appendChild(element);
            return element;
        };
        _this.onDrag = function (e) {
            if (!e.target) {
                return;
            }
            _this.trigger('drag', { event: e.event, element: _this.element, target: e.target });
            var newInst = _this.getSortableInstance(e.target);
            var target = _this.getSortableElement(e.target, newInst);
            if ((_this.isValidTarget(target, newInst) || (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('e-list-group-item') > -1)) && (_this.curTarget !== target ||
                !isNullOrUndefined(newInst.placeHolder)) && (newInst.placeHolderElement ? newInst.placeHolderElement !== e.target : true)) {
                if (e.target.classList.contains('e-list-group-item')) {
                    target = e.target;
                }
                _this.curTarget = target;
                if (_this.target === target) {
                    return;
                }
                var oldIdx = _this.getIndex(newInst.placeHolderElement, newInst);
                var placeHolder = _this.getPlaceHolder(target, newInst);
                var newIdx = void 0;
                if (placeHolder) {
                    oldIdx = isNullOrUndefined(oldIdx) ? _this.getIndex(_this.target) : oldIdx;
                    newIdx = _this.getIndex(target, newInst, e.event);
                    var isPlaceHolderPresent = _this.isPlaceHolderPresent(newInst);
                    if (isPlaceHolderPresent && oldIdx === newIdx) {
                        return;
                    }
                    if (isPlaceHolderPresent) {
                        _this.removePlaceHolder(newInst);
                    }
                    newInst.placeHolderElement = placeHolder;
                    if (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('e-list-group-item') > -1) {
                        newInst.element.insertBefore(newInst.placeHolderElement, newInst.element.children[newIdx]);
                    }
                    else if (newInst.element !== _this.element && newIdx === newInst.element.childElementCount) {
                        newInst.element.appendChild(newInst.placeHolderElement);
                    }
                    else {
                        newInst.element.insertBefore(newInst.placeHolderElement, newInst.element.children[newIdx]);
                    }
                }
                else {
                    oldIdx = isNullOrUndefined(oldIdx) ? _this.getIndex(_this.target) :
                        _this.getIndex(target, newInst) < oldIdx || !oldIdx ? oldIdx : oldIdx - 1;
                    newIdx = _this.getIndex(target, newInst);
                    var idx = newInst.element !== _this.element ? newIdx : oldIdx < newIdx ? newIdx + 1 : newIdx;
                    _this.updateItemClass(newInst);
                    newInst.element.insertBefore(_this.target, newInst.element.children[idx]);
                    _this.curTarget = _this.target;
                    _this.trigger('drop', {
                        droppedElement: _this.target, element: newInst.element, previousIndex: oldIdx, currentIndex: newIdx,
                        target: e.target, helper: document.getElementsByClassName('e-sortableclone')[0], event: e.event, scope: _this.scope
                    });
                }
            }
            else if (_this.curTarget !== _this.target && _this.scope && _this.curTarget !== target && !isNullOrUndefined(newInst.placeHolder)) {
                _this.removePlaceHolder(_this.getSortableInstance(_this.curTarget));
                _this.curTarget = _this.target;
            }
            newInst = _this.getSortableInstance(_this.curTarget);
            if (isNullOrUndefined(target) && e.target !== newInst.placeHolderElement) {
                if (_this.isPlaceHolderPresent(newInst)) {
                    _this.removePlaceHolder(newInst);
                }
            }
            else {
                var placeHolders = [].slice.call(document.getElementsByClassName('e-sortable-placeholder'));
                var inst_1;
                placeHolders.forEach(function (placeHolder) {
                    inst_1 = _this.getSortableInstance(placeHolder);
                    if (inst_1.element && inst_1 !== newInst) {
                        _this.removePlaceHolder(inst_1);
                    }
                });
            }
        };
        _this.onDragStart = function (e) {
            _this.target = _this.getSortableElement(e.target);
            var cancelDrag = false;
            _this.target.classList.add('e-grabbed');
            _this.curTarget = _this.target;
            e.helper = document.getElementsByClassName('e-sortableclone')[0];
            var args = { cancel: false, element: _this.element, target: _this.target };
            _this.trigger('beforeDragStart', args, function (observedArgs) {
                if (observedArgs.cancel) {
                    cancelDrag = observedArgs.cancel;
                    _this.onDragStop(e);
                }
            });
            if (cancelDrag) {
                return;
            }
            if (isBlazor) {
                _this.trigger('dragStart', {
                    event: e.event, element: _this.element, target: _this.target,
                    bindEvents: e.bindEvents, dragElement: e.dragElement
                });
            }
            else {
                _this.trigger('dragStart', { event: e.event, element: _this.element, target: _this.target });
            }
        };
        _this.onDragStop = function (e) {
            var dropInst = _this.getSortableInstance(_this.curTarget);
            var prevIdx;
            var curIdx;
            var handled;
            prevIdx = _this.getIndex(_this.target);
            var isPlaceHolderPresent = _this.isPlaceHolderPresent(dropInst);
            if (isPlaceHolderPresent) {
                var curIdx_1 = _this.getIndex(dropInst.placeHolderElement, dropInst);
                prevIdx = _this === dropInst && (prevIdx - curIdx_1) >= 1 ? prevIdx - 1 : prevIdx;
                var args = {
                    previousIndex: prevIdx, currentIndex: curIdx_1, target: e.target, droppedElement: _this.target,
                    helper: e.helper, cancel: false, handled: false
                };
                _this.trigger('beforeDrop', args, function (observedArgs) {
                    if (!observedArgs.cancel) {
                        handled = observedArgs.handled;
                        _this.updateItemClass(dropInst);
                        if (observedArgs.handled) {
                            var ele = _this.target.cloneNode(true);
                            _this.target.classList.remove('e-grabbed');
                            _this.target = ele;
                        }
                        dropInst.element.insertBefore(_this.target, dropInst.placeHolderElement);
                        var curIdx_2 = _this.getIndex(_this.target, dropInst);
                        prevIdx = _this === dropInst && (prevIdx - curIdx_2) >= 1 ? prevIdx - 1 : prevIdx;
                        _this.trigger('drop', {
                            event: e.event, element: dropInst.element, previousIndex: prevIdx, currentIndex: curIdx_2,
                            target: e.target, helper: e.helper, droppedElement: _this.target, scopeName: _this.scope, handled: handled
                        });
                    }
                    _this.removePlaceHolder(dropInst);
                });
            }
            dropInst = _this.getSortableInstance(e.target);
            curIdx = dropInst.element.childElementCount;
            prevIdx = _this.getIndex(_this.target);
            if (dropInst.element.querySelector('.e-list-nrt')) {
                curIdx = curIdx - 1;
            }
            if (_this.curTarget === _this.target && e.target === _this.curTarget) {
                curIdx = prevIdx;
            }
            if (dropInst.element === e.target || (!isPlaceHolderPresent && _this.curTarget === _this.target)) {
                var beforeDropArgs = {
                    previousIndex: prevIdx, currentIndex: curIdx,
                    target: e.target, droppedElement: _this.target, helper: e.helper, cancel: false
                };
                _this.trigger('beforeDrop', beforeDropArgs, function (observedArgs) {
                    if ((dropInst.element === e.target || (typeof e.target.className === 'string' && e.target.className.indexOf('e-list-nrt') > -1) || (typeof e.target.className === 'string' && e.target.className.indexOf('e-list-nr-template') > -1)
                        || e.target.closest('.e-list-nr-template')) && !observedArgs.cancel) {
                        _this.updateItemClass(dropInst);
                        dropInst.element.appendChild(_this.target);
                        _this.trigger('drop', {
                            event: e.event, element: dropInst.element, previousIndex: prevIdx, currentIndex: curIdx,
                            target: e.target, helper: e.helper, droppedElement: _this.target, scopeName: _this.scope
                        });
                    }
                });
            }
            _this.target.classList.remove('e-grabbed');
            _this.target = null;
            _this.curTarget = null;
            remove(e.helper);
            getComponent(_this.element, 'draggable').intDestroy(e.event);
        };
        _this.bind();
        return _this;
    }
    Sortable_1 = Sortable;
    Sortable.prototype.bind = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('sortable');
        }
        if (!this.itemClass) {
            this.itemClass = 'e-sort-item';
            this.dataBind();
        }
        this.initializeDraggable();
    };
    Sortable.prototype.initializeDraggable = function () {
        new Draggable(this.element, {
            helper: this.getHelper,
            dragStart: this.onDragStart,
            drag: this.onDrag,
            dragStop: this.onDragStop,
            dragTarget: "." + this.itemClass,
            enableTapHold: true,
            tapHoldThreshold: 200,
            queryPositionInfo: this.queryPositionInfo,
            distance: 1
        });
        this.wireEvents();
    };
    Sortable.prototype.wireEvents = function () {
        var wrapper = this.element;
        EventHandler.add(wrapper, 'keydown', this.keyDownHandler, this);
    };
    Sortable.prototype.unwireEvents = function () {
        var wrapper = this.element;
        EventHandler.remove(wrapper, 'keydown', this.keyDownHandler);
    };
    Sortable.prototype.keyDownHandler = function (e) {
        if (e.keyCode === 27) {
            var dragStop = getComponent(this.element, 'draggable');
            if (dragStop) {
                dragStop.intDestroy(null);
            }
            var dragWrapper = document.getElementsByClassName('e-sortableclone')[0];
            if (dragWrapper) {
                dragWrapper.remove();
            }
            var dragPlaceholder = document.getElementsByClassName('e-sortable-placeholder')[0];
            if (dragPlaceholder) {
                dragPlaceholder.remove();
            }
        }
    };
    Sortable.prototype.getPlaceHolder = function (target, instance) {
        if (instance.placeHolder) {
            var placeHolderElement = instance.placeHolder({ element: instance.element, grabbedElement: this.target, target: target });
            placeHolderElement.classList.add('e-sortable-placeholder');
            return placeHolderElement;
        }
        return null;
    };
    Sortable.prototype.isValidTarget = function (target, instance) {
        return target && compareElementParent(target, instance.element) && target.classList.contains(instance.itemClass) &&
            !target.classList.contains('e-disabled');
    };
    Sortable.prototype.removePlaceHolder = function (instance) {
        remove(instance.placeHolderElement);
        instance.placeHolderElement = null;
    };
    Sortable.prototype.updateItemClass = function (instance) {
        if (this !== instance) {
            this.target.classList.remove(this.itemClass);
            this.target.classList.add(instance.itemClass);
        }
    };
    Sortable.prototype.getSortableInstance = function (element) {
        element = closest(element, ".e-" + this.getModuleName());
        if (element) {
            var inst = getComponent(element, Sortable_1);
            return inst.scope && this.scope && inst.scope === this.scope ? inst : this;
        }
        else {
            return this;
        }
    };
    Sortable.prototype.getIndex = function (target, instance, e) {
        if (instance === void 0) { instance = this; }
        var idx;
        var placeHolderPresent;
        [].slice.call(instance.element.children).forEach(function (element, index) {
            if (element.classList.contains('e-sortable-placeholder')) {
                placeHolderPresent = true;
            }
            if (element === target) {
                idx = index;
                if (!isNullOrUndefined(e)) {
                    if (placeHolderPresent) {
                        idx -= 1;
                    }
                    var offset = target.getBoundingClientRect();
                    var clientY = offset.bottom - ((offset.bottom - offset.top) / 2);
                    var cltY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                    idx = cltY <= clientY ? idx : idx + 1;
                }
                return;
            }
        });
        return idx;
    };
    Sortable.prototype.getSortableElement = function (element, instance) {
        if (instance === void 0) { instance = this; }
        return closest(element, "." + instance.itemClass);
    };
    Sortable.prototype.queryPositionInfo = function (value) {
        value.left = scrollX ? parseFloat(value.left) - scrollX + "px" : value.left;
        value.top = scrollY ? parseFloat(value.top) - scrollY + "px" : value.top;
        return value;
    };
    Sortable.prototype.isPlaceHolderPresent = function (instance) {
        return instance.placeHolderElement && !!closest(instance.placeHolderElement, "#" + instance.element.id);
    };
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
    Sortable.prototype.moveTo = function (destination, targetIndexes, insertBefore) {
        moveTo(this.element, destination, targetIndexes, insertBefore);
    };
    /**
     * It is used to destroy the Sortable library.
     */
    Sortable.prototype.destroy = function () {
        this.unwireEvents();
        if (this.itemClass === 'e-sort-item') {
            this.itemClass = null;
            this.dataBind();
        }
        getComponent(this.element, Draggable).destroy();
        _super.prototype.destroy.call(this);
    };
    Sortable.prototype.getModuleName = function () {
        return 'sortable';
    };
    Sortable.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'itemClass':
                    [].slice.call(this.element.children).forEach(function (element) {
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
    };
    var Sortable_1;
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
    return Sortable;
}(Base));
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
    var targetElements = [];
    if (!to) {
        to = from;
    }
    if (targetIndexes && targetIndexes.length) {
        targetIndexes.forEach(function (index) {
            targetElements.push(from.children[index]);
        });
    }
    else {
        targetElements = [].slice.call(from.children);
    }
    if (isNullOrUndefined(insertBefore)) {
        targetElements.forEach(function (target) {
            to.appendChild(target);
        });
    }
    else {
        var insertElement_1 = to.children[insertBefore];
        targetElements.forEach(function (target) {
            to.insertBefore(target, insertElement_1);
        });
    }
}

export { FieldSettings, ListBase, ListView, Sortable, Virtualization, classNames, cssClass, getFieldValues, moveTo };
//# sourceMappingURL=ej2-lists.es5.js.map
