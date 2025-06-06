/* eslint-disable no-inner-declarations */
import { extend, merge, isNullOrUndefined, getValue, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { attributes, prepend, isVisible, append, addClass } from '@syncfusion/ej2-base';
import { compile } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
export var cssClass = {
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
export var ListBase;
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
export function getFieldValues(dataItem, fields) {
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
