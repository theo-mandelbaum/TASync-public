import { isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SizeF } from '@syncfusion/ej2-pdf-export';
import * as cls from '../common/base/css-constant';
/**
 * This is a file to perform common utility for OLAP and Relational datasource
 *
 * @hidden
 */
var PivotUtil = /** @class */ (function () {
    function PivotUtil() {
    }
    PivotUtil.getType = function (value) {
        var val;
        var dateValue = new Date(value);
        if (typeof value === 'boolean') {
            val = 'boolean';
        }
        else if (!isNaN(Number(value))) {
            val = 'number';
        }
        else if (dateValue instanceof Date && !isNaN(dateValue.valueOf())) {
            val = (dateValue && dateValue.getDay() && (dateValue.getHours() > 0 || dateValue.getMinutes() > 0 ||
                dateValue.getSeconds() > 0 || dateValue.getMilliseconds() > 0) ? 'datetime' : 'date');
        }
        else {
            val = typeof (value);
        }
        return val;
    };
    PivotUtil.resetTime = function (date) {
        date.setHours(0, 0, 0, 0);
        return date;
    };
    PivotUtil.getClonedData = function (data) {
        var clonedData = [];
        if (data) {
            for (var _i = 0, _a = data; _i < _a.length; _i++) {
                var item = _a[_i];
                var fields = Object.keys(item);
                var keyPos = 0;
                var framedSet = {};
                while (keyPos < fields.length) {
                    framedSet[fields[keyPos]] = item[fields[keyPos]];
                    keyPos++;
                }
                clonedData.push(framedSet);
            }
        }
        return clonedData;
    };
    PivotUtil.getClonedCSVData = function (data) {
        var clonedData = data.map(function (row) { return row.slice(); });
        return clonedData;
    };
    PivotUtil.getDefinedObj = function (data) {
        var keyPos = 0;
        var framedSet = {};
        if (!(data === null || data === undefined)) {
            var fields = Object.keys(data);
            while (keyPos < fields.length) {
                if (!(data[fields[keyPos]] === null
                    || data[fields[keyPos]] === undefined)) {
                    framedSet[fields[keyPos]] = data[fields[keyPos]];
                }
                keyPos++;
            }
        }
        else {
            framedSet = data;
        }
        return framedSet;
    };
    PivotUtil.inArray = function (value, collection) {
        if (collection) {
            for (var i = 0, cnt = collection.length; i < cnt; i++) {
                if (collection[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    };
    PivotUtil.setPivotProperties = function (control, properties) {
        control.allowServerDataBinding = false;
        if (control.pivotGridModule) {
            control.pivotGridModule.allowServerDataBinding = false;
        }
        control.setProperties(properties, true);
        control.allowServerDataBinding = true;
        if (control.pivotGridModule) {
            control.pivotGridModule.allowServerDataBinding = true;
        }
    };
    PivotUtil.getClonedDataSourceSettings = function (dataSourceSettings) {
        var clonesDataSource = this.getDefinedObj({
            type: dataSourceSettings.type,
            catalog: dataSourceSettings.catalog,
            cube: dataSourceSettings.cube,
            providerType: dataSourceSettings.providerType,
            url: dataSourceSettings.url,
            localeIdentifier: dataSourceSettings.localeIdentifier,
            excludeFields: isNullOrUndefined(dataSourceSettings.excludeFields) ? [] : dataSourceSettings.excludeFields.slice(),
            expandAll: dataSourceSettings.expandAll,
            allowLabelFilter: dataSourceSettings.allowLabelFilter,
            allowValueFilter: dataSourceSettings.allowValueFilter,
            allowMemberFilter: dataSourceSettings.allowMemberFilter,
            enableSorting: dataSourceSettings.enableSorting ? true : false,
            rows: this.cloneFieldSettings(dataSourceSettings.rows),
            columns: this.cloneFieldSettings(dataSourceSettings.columns),
            filters: this.cloneFieldSettings(dataSourceSettings.filters),
            values: this.cloneFieldSettings(dataSourceSettings.values),
            filterSettings: this.cloneFilterSettings(dataSourceSettings.filterSettings),
            sortSettings: this.cloneSortSettings(dataSourceSettings.sortSettings),
            drilledMembers: this.cloneDrillMemberSettings(dataSourceSettings.drilledMembers),
            valueSortSettings: this.CloneValueSortObject(dataSourceSettings.valueSortSettings),
            valueAxis: dataSourceSettings.valueAxis,
            valueIndex: dataSourceSettings.valueIndex,
            grandTotalsPosition: dataSourceSettings.grandTotalsPosition,
            formatSettings: this.cloneFormatSettings(dataSourceSettings.formatSettings),
            calculatedFieldSettings: this.cloneCalculatedFieldSettings(dataSourceSettings.calculatedFieldSettings),
            fieldMapping: this.cloneFieldSettings(dataSourceSettings.fieldMapping),
            showSubTotals: dataSourceSettings.showSubTotals,
            showRowSubTotals: dataSourceSettings.showRowSubTotals,
            showColumnSubTotals: dataSourceSettings.showColumnSubTotals,
            subTotalsPosition: dataSourceSettings.subTotalsPosition,
            showGrandTotals: dataSourceSettings.showGrandTotals,
            showRowGrandTotals: dataSourceSettings.showRowGrandTotals,
            showColumnGrandTotals: dataSourceSettings.showColumnGrandTotals,
            showHeaderWhenEmpty: dataSourceSettings.showHeaderWhenEmpty,
            alwaysShowValueHeader: dataSourceSettings.alwaysShowValueHeader,
            conditionalFormatSettings: this.cloneConditionalFormattingSettings(dataSourceSettings.conditionalFormatSettings),
            emptyCellsTextContent: dataSourceSettings.emptyCellsTextContent,
            groupSettings: this.cloneGroupSettings(dataSourceSettings.groupSettings),
            showAggregationOnValueField: dataSourceSettings.showAggregationOnValueField,
            authentication: this.CloneAuthenticationObject(dataSourceSettings.authentication)
        });
        return clonesDataSource;
    };
    PivotUtil.getClonedFieldList = function (fieldListObj, isMemberIncluded) {
        var keys = Object.keys(fieldListObj);
        var clonedfieldlistObj = {};
        for (var i = 0, keysLength = keys.length; i < keysLength; i++) {
            var fieldlistObj = fieldListObj[keys[i]];
            if (fieldListObj[keys[i]]) {
                clonedfieldlistObj[keys[i]] = {
                    type: fieldlistObj.type,
                    caption: fieldlistObj.caption,
                    id: fieldlistObj.id,
                    isSelected: fieldlistObj.isSelected,
                    sort: fieldlistObj.sort,
                    filterType: fieldlistObj.filterType,
                    index: fieldlistObj.index,
                    filter: isMemberIncluded ? [] : fieldlistObj.filter,
                    isCustomField: fieldlistObj.isCustomField,
                    showRemoveIcon: fieldlistObj.showRemoveIcon,
                    showFilterIcon: fieldlistObj.showFilterIcon,
                    showSortIcon: fieldlistObj.showSortIcon,
                    showNoDataItems: fieldlistObj.showNoDataItems,
                    isCalculatedField: fieldlistObj.isCalculatedField,
                    showEditIcon: fieldlistObj.showEditIcon,
                    showValueTypeIcon: fieldlistObj.showValueTypeIcon,
                    allowDragAndDrop: fieldlistObj.allowDragAndDrop,
                    showSubTotals: fieldlistObj.showSubTotals,
                    expandAll: fieldlistObj.expandAll,
                    pid: fieldlistObj.pid,
                    aggregateType: fieldlistObj.aggregateType,
                    baseField: fieldlistObj.baseField,
                    baseItem: fieldlistObj.baseItem,
                    dateMember: isMemberIncluded ? [] : this.cloneDateMembers(fieldlistObj.dateMember),
                    members: isMemberIncluded ? {} : this.cloneFormatMembers(fieldlistObj.members),
                    formatString: fieldlistObj.formatString,
                    format: fieldlistObj.format,
                    formula: fieldlistObj.formula,
                    isExcelFilter: fieldlistObj.isExcelFilter,
                    membersOrder: (fieldlistObj.membersOrder ? fieldlistObj.membersOrder.slice() :
                        fieldlistObj.membersOrder),
                    isAlphanumeric: fieldlistObj.isAlphanumeric,
                    tag: fieldlistObj.tag,
                    expanded: fieldlistObj.expanded,
                    spriteCssClass: fieldlistObj.spriteCssClass,
                    name: fieldlistObj.name,
                    defaultHierarchy: fieldlistObj.defaultHierarchy,
                    hasAllMember: fieldlistObj.hasAllMember,
                    allMember: fieldlistObj.allMember,
                    isChecked: fieldlistObj.isChecked,
                    filterMembers: this.cloneFieldMembers(fieldlistObj.filterMembers),
                    childMembers: isMemberIncluded ? [] : this.cloneFieldMembers(fieldlistObj.childMembers),
                    searchMembers: isMemberIncluded ? [] : this.cloneFieldMembers(fieldlistObj.searchMembers),
                    htmlAttributes: this.getDefinedObj(fieldlistObj.htmlAttributes),
                    currrentMembers: isMemberIncluded ? {} : this.cloneFormatMembers(fieldlistObj.currrentMembers),
                    isHierarchy: fieldlistObj.isHierarchy,
                    isNamedSets: fieldlistObj.isNamedSets,
                    actualFilter: fieldlistObj.actualFilter ? fieldlistObj.actualFilter.slice() : fieldlistObj.actualFilter,
                    levels: isMemberIncluded ? [] : this.cloneFieldMembers(fieldlistObj.levels),
                    levelCount: fieldlistObj.levelCount,
                    fieldType: fieldlistObj.fieldType,
                    memberType: fieldlistObj.memberType,
                    parentHierarchy: fieldlistObj.parentHierarchy
                };
            }
        }
        return clonedfieldlistObj;
    };
    PivotUtil.cloneDateMembers = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
                var set = collection_1[_i];
                clonedCollection.push({
                    formattedText: set.formattedText,
                    actualText: set.actualText
                });
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneFormatMembers = function (collection) {
        if (collection) {
            var keys = Object.keys(collection);
            var clonedFormatMembers = {};
            for (var i = 0, keysLength = keys.length; i < keysLength; i++) {
                var cloneFormatMembersObj = collection[keys[i]];
                clonedFormatMembers[keys[i]] = {
                    index: cloneFormatMembersObj.index ? cloneFormatMembersObj.index.slice() : cloneFormatMembersObj.index,
                    isDrilled: cloneFormatMembersObj.isDrilled,
                    ordinal: cloneFormatMembersObj.ordinal
                };
            }
            return clonedFormatMembers;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneFieldMembers = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_2 = collection; _i < collection_2.length; _i++) {
                var set = collection_2[_i];
                clonedCollection.push({
                    caption: set.caption,
                    hasChildren: set.hasChildren,
                    id: set.id,
                    isSelected: set.isSelected,
                    name: set.name,
                    tag: set.tag,
                    htmlAttributes: this.getDefinedObj(set.htmlAttributes),
                    type: set.type,
                    spriteCssClass: set.spriteCssClass,
                    pid: set.pid,
                    isChecked: set.isChecked
                });
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.updateDataSourceSettings = function (control, dataSourceSettings) {
        if (control) {
            this.setPivotProperties(control, {
                dataSourceSettings: this.getDefinedObj({
                    type: dataSourceSettings.type,
                    catalog: dataSourceSettings.catalog,
                    cube: dataSourceSettings.cube,
                    providerType: dataSourceSettings.providerType,
                    url: dataSourceSettings.url,
                    localeIdentifier: dataSourceSettings.localeIdentifier,
                    excludeFields: isNullOrUndefined(dataSourceSettings.excludeFields) ? [] : dataSourceSettings.excludeFields,
                    expandAll: dataSourceSettings.expandAll,
                    allowLabelFilter: dataSourceSettings.allowLabelFilter,
                    allowValueFilter: dataSourceSettings.allowValueFilter,
                    allowMemberFilter: dataSourceSettings.allowMemberFilter,
                    enableSorting: dataSourceSettings.enableSorting ? true : false,
                    rows: dataSourceSettings.rows,
                    columns: dataSourceSettings.columns,
                    filters: dataSourceSettings.filters,
                    values: dataSourceSettings.values,
                    filterSettings: dataSourceSettings.filterSettings,
                    sortSettings: dataSourceSettings.sortSettings,
                    drilledMembers: dataSourceSettings.drilledMembers,
                    valueSortSettings: dataSourceSettings.valueSortSettings,
                    valueAxis: dataSourceSettings.valueAxis,
                    grandTotalsPosition: dataSourceSettings.grandTotalsPosition,
                    formatSettings: dataSourceSettings.formatSettings,
                    calculatedFieldSettings: dataSourceSettings.calculatedFieldSettings,
                    fieldMapping: dataSourceSettings.fieldMapping,
                    showSubTotals: dataSourceSettings.showSubTotals,
                    showRowSubTotals: dataSourceSettings.showRowSubTotals,
                    showColumnSubTotals: dataSourceSettings.showColumnSubTotals,
                    subTotalsPosition: dataSourceSettings.subTotalsPosition,
                    showGrandTotals: dataSourceSettings.showGrandTotals,
                    showRowGrandTotals: dataSourceSettings.showRowGrandTotals,
                    showColumnGrandTotals: dataSourceSettings.showColumnGrandTotals,
                    showHeaderWhenEmpty: dataSourceSettings.showHeaderWhenEmpty,
                    alwaysShowValueHeader: dataSourceSettings.alwaysShowValueHeader,
                    conditionalFormatSettings: dataSourceSettings.conditionalFormatSettings,
                    emptyCellsTextContent: dataSourceSettings.emptyCellsTextContent,
                    groupSettings: dataSourceSettings.groupSettings,
                    showAggregationOnValueField: dataSourceSettings.showAggregationOnValueField,
                    authentication: this.CloneAuthenticationObject(dataSourceSettings.authentication)
                })
            });
        }
    };
    PivotUtil.cloneFieldSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_3 = collection; _i < collection_3.length; _i++) {
                var set = collection_3[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    caption: set.caption,
                    axis: set.axis,
                    baseField: set.baseField,
                    baseItem: set.baseItem,
                    isCalculatedField: set.isCalculatedField,
                    isNamedSet: set.isNamedSet,
                    showNoDataItems: set.showNoDataItems,
                    showSubTotals: set.showSubTotals,
                    type: set.type,
                    dataType: set.dataType,
                    showFilterIcon: set.showFilterIcon,
                    showSortIcon: set.showSortIcon,
                    showRemoveIcon: set.showRemoveIcon,
                    showValueTypeIcon: set.showValueTypeIcon,
                    showEditIcon: set.showEditIcon,
                    allowDragAndDrop: set.allowDragAndDrop,
                    expandAll: set.expandAll,
                    groupName: set.groupName
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneOlapFieldSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_4 = collection; _i < collection_4.length; _i++) {
                var set = collection_4[_i];
                clonedCollection.push(this.getDefinedObj({
                    caption: set.caption,
                    hasChildren: set.hasChildren,
                    id: set.id,
                    isSelected: set.isSelected,
                    name: set.name,
                    spriteCssClass: set.spriteCssClass,
                    tag: set.tag,
                    type: set.type,
                    pid: set.pid,
                    expanded: set.expanded,
                    defaultHierarchy: set.defaultHierarchy,
                    hasAllMember: set.hasAllMember,
                    allMember: set.allMember,
                    isChecked: set.isChecked,
                    filterMembers: set.filterMembers,
                    formula: set.formula,
                    childMembers: set.childMembers,
                    searchMembers: set.searchMembers,
                    htmlAttributes: this.getDefinedObj(set.htmlAttributes),
                    currrentMembers: set.currrentMembers,
                    isHierarchy: set.isHierarchy,
                    isNamedSets: set.isNamedSets,
                    formatString: set.formatString,
                    actualFilter: set.actualFilter,
                    levels: set.levels,
                    levelCount: set.levelCount,
                    memberType: set.memberType,
                    fieldType: set.fieldType,
                    parentHierarchy: set.parentHierarchy
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneFilterSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_5 = collection; _i < collection_5.length; _i++) {
                var set = collection_5[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    type: set.type,
                    condition: set.condition,
                    items: set.items ? set.items.slice() : set.items,
                    levelCount: set.levelCount,
                    measure: set.measure,
                    selectedField: set.selectedField,
                    showDateFilter: set.showDateFilter,
                    showLabelFilter: set.showLabelFilter,
                    showNumberFilter: set.showNumberFilter,
                    value1: set.value1,
                    value2: set.value2
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneSortSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_6 = collection; _i < collection_6.length; _i++) {
                var set = collection_6[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    order: set.order,
                    membersOrder: set.membersOrder ? set.membersOrder.slice() : set.membersOrder
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    /**
     * It format the headers of pivot table.
     *
     * @param {IAxisSet} headerCell - It contains the header cell.
     * @param {PivotEngine} engine - It contains the instance of pivot engine.
     * @returns {IAxisSet} - It returns the formatted header data as IAxisSet.
     * @hidden
     */
    PivotUtil.getFormattedHeader = function (headerCell, engine) {
        var clonedHeader = PivotUtil.frameHeaderWithKeys(headerCell);
        if (clonedHeader.valueSort && clonedHeader.valueSort['axis']) {
            var fieldName = clonedHeader.valueSort['axis'];
            var isDateType = this.isDateField(fieldName, engine);
            clonedHeader.formattedText = isDateType || !engine.formatFields[fieldName] || headerCell.isSum === true ?
                clonedHeader.formattedText : engine.getFormattedValue(clonedHeader.actualText, fieldName).formattedText;
        }
        return clonedHeader;
    };
    /**
     * It format the members of field.
     *
     * @param {IMembers} members - It contains the members.
     * @param {string} fieldName - It contains the field Name.
     * @param {PivotEngine} engine - It contains the instance of pivot engine.
     * @returns {IMembers} - It returns the formatted members as IMembers.
     * @hidden
     */
    PivotUtil.getFormattedMembers = function (members, fieldName, engine) {
        var isDateField = this.isDateField(fieldName, engine);
        if (isDateField || engine.groupingFields[fieldName]) {
            var fieldMembers = {};
            var keys = Object.keys(members);
            var dateMember = engine.fieldList[fieldName].dateMember;
            for (var i = 0, j = keys.length; i < j; i++) {
                var values = members[keys[i]];
                if (isDateField) {
                    fieldMembers[values.caption] = values;
                }
                else {
                    var commonValue = dateMember[values.ordinal - 1].actualText;
                    fieldMembers[commonValue] = values;
                }
            }
            return fieldMembers;
        }
        return members;
    };
    /**
     * It determines whether the specified field is of date type.
     *
     * @param {string} fieldName - It contains the field Name.
     * @param {PivotEngine} engineModule - It contains the instance of pivot engine.
     * @returns {boolean} - It  returns whether the field is of date type or not.
     * @hidden
     */
    PivotUtil.isDateField = function (fieldName, engineModule) {
        return (engineModule.formatFields[fieldName] &&
            (['date', 'dateTime', 'time'].indexOf(engineModule.formatFields[fieldName].type) > -1));
    };
    /**
     * It format the headers of pivot chart.
     *
     * @param {string[]} values - It contains the headers.
     * @param {PivotChart} chartModule - It contains the instance of pivot chart.
     * @param {boolean} isColumnHeader - It determines whether the specified header is column or row.
     * @param {IAxisSet} cell - It contains the cell information.
     * @returns {string} - It returns the formatted header.
     * @hidden
     */
    PivotUtil.formatChartHeaders = function (values, chartModule, isColumnHeader, cell) {
        var formattedValues = [];
        for (var i = 0, j = values.length; i < j; i++) {
            var fieldName = isColumnHeader ? ((chartModule.parent.dataSourceSettings.columns.length > 0 &&
                !isNullOrUndefined(chartModule.parent.dataSourceSettings.columns[i])) ?
                chartModule.parent.dataSourceSettings.columns[i].name : undefined) :
                (chartModule.parent.dataSourceSettings.rows.length > 0 &&
                    !isNullOrUndefined(chartModule.parent.dataSourceSettings.rows[i])) ?
                    chartModule.parent.dataSourceSettings.rows[i].name : undefined;
            if (!isNullOrUndefined(fieldName)) {
                if ((chartModule.engineModule.formatFields[fieldName] &&
                    (['date', 'dateTime', 'time'].indexOf(chartModule.engineModule.formatFields[fieldName].type) > -1))) {
                    formattedValues.push(values[i]);
                }
                else {
                    formattedValues.push(chartModule.engineModule.getFormattedValue(values[i], fieldName).formattedText);
                }
            }
            else if (cell && cell.isGrandSum) {
                formattedValues.push(chartModule.parent.localeObj.getConstant('grandTotal'));
            }
            else {
                formattedValues.push(values[i]);
            }
        }
        return formattedValues.join(' - ');
    };
    PivotUtil.cloneDrillMemberSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_7 = collection; _i < collection_7.length; _i++) {
                var set = collection_7[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    delimiter: set.delimiter,
                    items: set.items ? set.items.slice() : set.items
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneFormatSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_8 = collection; _i < collection_8.length; _i++) {
                var set = collection_8[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    calendar: set.calendar,
                    currency: set.currency,
                    format: set.format,
                    maximumFractionDigits: set.maximumFractionDigits,
                    maximumSignificantDigits: set.maximumSignificantDigits,
                    minimumFractionDigits: set.minimumFractionDigits,
                    minimumIntegerDigits: set.minimumIntegerDigits,
                    minimumSignificantDigits: set.minimumSignificantDigits,
                    skeleton: set.skeleton,
                    type: set.type,
                    useGrouping: set.useGrouping
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.CloneValueSortObject = function (collection) {
        if (collection) {
            var clonedCollection = {
                columnIndex: collection.columnIndex,
                headerDelimiter: collection.headerDelimiter,
                headerText: collection.headerText,
                measure: collection.measure,
                sortOrder: collection.sortOrder
            };
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.CloneAuthenticationObject = function (collection) {
        if (collection) {
            var clonedCollection = {
                userName: collection.userName,
                password: collection.password
            };
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneCalculatedFieldSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_9 = collection; _i < collection_9.length; _i++) {
                var set = collection_9[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    formatString: set.formatString,
                    formula: set.formula,
                    hierarchyUniqueName: set.hierarchyUniqueName
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneConditionalFormattingSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_10 = collection; _i < collection_10.length; _i++) {
                var set = collection_10[_i];
                clonedCollection.push(this.getDefinedObj({
                    applyGrandTotals: set.applyGrandTotals,
                    conditions: set.conditions,
                    label: set.label,
                    measure: set.measure,
                    style: set.style ? {
                        backgroundColor: set.style.backgroundColor,
                        color: set.style.color,
                        fontFamily: set.style.fontFamily,
                        fontSize: set.style.fontSize
                    } : set.style,
                    value1: set.value1,
                    value2: set.value2
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneGroupSettings = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_11 = collection; _i < collection_11.length; _i++) {
                var set = collection_11[_i];
                clonedCollection.push(this.getDefinedObj({
                    name: set.name,
                    caption: set.caption,
                    customGroups: this.cloneCustomGroups(set.customGroups),
                    endingAt: set.endingAt,
                    startingAt: set.startingAt,
                    groupInterval: set.groupInterval,
                    rangeInterval: set.rangeInterval,
                    type: set.type
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.cloneCustomGroups = function (collection) {
        if (collection) {
            var clonedCollection = [];
            for (var _i = 0, collection_12 = collection; _i < collection_12.length; _i++) {
                var set = collection_12[_i];
                clonedCollection.push(this.getDefinedObj({
                    groupName: set.groupName,
                    items: set.items ? set.items.slice() : set.items
                }));
            }
            return clonedCollection;
        }
        else {
            return collection;
        }
    };
    PivotUtil.getFilterItemByName = function (fieldName, fields) {
        var filterItems = new DataManager({ json: fields }).executeLocal(new Query().where('name', 'equal', fieldName));
        if (filterItems && filterItems.length > 0) {
            return filterItems[filterItems.length - 1];
        }
        return undefined;
    };
    PivotUtil.getFieldByName = function (fieldName, fields) {
        return new DataManager({ json: fields }).executeLocal(new Query().where('name', 'equal', fieldName))[0];
    };
    PivotUtil.getFieldInfo = function (fieldName, control, hasAllField) {
        if (!hasAllField) {
            var rows = this.cloneFieldSettings(control.dataSourceSettings.rows);
            var columns = this.cloneFieldSettings(control.dataSourceSettings.columns);
            var values = this.cloneFieldSettings(control.dataSourceSettings.values);
            var filters = this.cloneFieldSettings(control.dataSourceSettings.filters);
            var fields = [rows, columns, values, filters];
            for (var i = 0, len = fields.length; i < len; i++) {
                for (var j = 0, cnt = (fields[i] ? fields[i].length : 0); j < cnt; j++) {
                    if (fields[i][j] && fields[i][j].name === fieldName) {
                        return { fieldName: fieldName, fieldItem: fields[i][j], axis: i === 0 ? 'rows' : i === 1 ? 'columns' : i === 2 ? 'values' : 'filters', position: j };
                    }
                }
            }
        }
        var fieldList = control.dataType === 'olap' ?
            control.olapEngineModule.fieldList[fieldName] : control.engineModule.fieldList[fieldName];
        var fieldItem = (fieldList ? {
            name: fieldName,
            caption: fieldList.caption,
            baseField: fieldList.baseField,
            baseItem: fieldList.baseItem,
            isCalculatedField: fieldList.isCalculatedField,
            isNamedSet: fieldList.isNamedSets,
            showNoDataItems: fieldList.showNoDataItems,
            showSubTotals: fieldList.showSubTotals,
            type: fieldList.aggregateType,
            showFilterIcon: fieldList.showFilterIcon,
            showSortIcon: fieldList.showSortIcon,
            showRemoveIcon: fieldList.showRemoveIcon,
            showValueTypeIcon: fieldList.showValueTypeIcon,
            showEditIcon: fieldList.showEditIcon,
            allowDragAndDrop: fieldList.allowDragAndDrop,
            expandAll: fieldList.expandAll
        } : undefined);
        return { fieldName: fieldName, fieldItem: fieldItem, axis: 'fieldlist', position: -1 };
    };
    PivotUtil.isButtonIconRefesh = function (prop, oldProp, newProp) {
        var isButtonRefresh = false;
        try {
            if (prop === 'dataSourceSettings' && oldProp.dataSourceSettings && newProp.dataSourceSettings) {
                var propValidation = ['notAvail', 'notAvail', 'notAvail', 'notAvail'];
                var oldAxesProp = Object.keys(oldProp.dataSourceSettings);
                var newAxesProp = Object.keys(newProp.dataSourceSettings);
                if (oldAxesProp && newAxesProp && newAxesProp.length > 0 && oldAxesProp.length === newAxesProp.length) {
                    var axes = ['rows', 'columns', 'values', 'filters'];
                    for (var i = 0; i < newAxesProp.length; i++) {
                        var oldAxis = (newAxesProp[i] in oldProp.dataSourceSettings &&
                            !isNullOrUndefined(oldProp.dataSourceSettings[newAxesProp[i]])) ?
                            Object.keys(oldProp.dataSourceSettings[newAxesProp[i]]) : [];
                        var newAxis = (newAxesProp[i] in newProp.dataSourceSettings &&
                            !isNullOrUndefined(newProp.dataSourceSettings[newAxesProp[i]])) ?
                            Object.keys(newProp.dataSourceSettings[newAxesProp[i]]) : [];
                        if (axes.indexOf(newAxesProp[i]) !== -1 && axes.indexOf(oldAxesProp[i]) !== -1 &&
                            oldAxis && newAxis && newAxis.length > 0 && oldAxis.length === newAxis.length) {
                            var options = ['showFilterIcon', 'showSortIcon', 'showRemoveIcon', 'showValueTypeIcon', 'showEditIcon', 'allowDragAndDrop', 'expandAll'];
                            for (var j = 0; j < newAxis.length; j++) {
                                var oldAxisProp = Object.keys(oldProp.dataSourceSettings[newAxesProp[i]][newAxis[j]]);
                                var newAxisProp = Object.keys(newProp.dataSourceSettings[newAxesProp[i]][newAxis[j]]);
                                for (var k = 0; k < newAxisProp.length; k++) {
                                    if (options.indexOf(newAxisProp[k]) !== -1 &&
                                        options.indexOf(oldAxisProp[k]) !== -1) {
                                        propValidation[i] = 'update';
                                    }
                                    else {
                                        propValidation[i] = 'break';
                                        break;
                                    }
                                }
                                if (propValidation[i] === 'break') {
                                    break;
                                }
                            }
                        }
                        else {
                            propValidation[i] = 'break';
                        }
                        if (propValidation[i] === 'break') {
                            break;
                        }
                    }
                }
                var a = 0;
                var b = 0;
                var c = 0;
                for (var _i = 0, propValidation_1 = propValidation; _i < propValidation_1.length; _i++) {
                    var validation = propValidation_1[_i];
                    if (validation === 'break') {
                        a++;
                    }
                    if (validation === 'notAvail') {
                        b++;
                    }
                    if (validation === 'update') {
                        c++;
                    }
                }
                isButtonRefresh = (a > 0 || b === 4) ? false : (a === 0 && b < 4 && c > 0);
            }
        }
        catch (exception) {
            isButtonRefresh = false;
        }
        return isButtonRefresh;
    };
    PivotUtil.formatPivotValues = function (pivotValues) {
        var values = [];
        for (var i = 0; i < pivotValues.length; i++) {
            if (pivotValues[i]) {
                values[i] = [];
                for (var j = 0; j < pivotValues[i].length; j++) {
                    if (pivotValues[i][j]) {
                        values[i][j] = {
                            axis: pivotValues[i][j].Axis,
                            actualText: pivotValues[i][j].ActualText,
                            indexObject: pivotValues[i][j].IndexObject,
                            index: pivotValues[i][j].Index,
                            rowHeaders: pivotValues[i][j].RowHeaders,
                            columnHeaders: pivotValues[i][j].ColumnHeaders,
                            formattedText: pivotValues[i][j].FormattedText,
                            actualValue: pivotValues[i][j].ActualValue,
                            rowIndex: pivotValues[i][j].RowIndex,
                            colIndex: pivotValues[i][j].ColIndex,
                            colSpan: pivotValues[i][j].ColSpan,
                            level: pivotValues[i][j].Level,
                            rowSpan: pivotValues[i][j].RowSpan,
                            isSum: pivotValues[i][j].IsSum,
                            isGrandSum: pivotValues[i][j].IsGrandSum,
                            valueSort: pivotValues[i][j].ValueSort,
                            ordinal: pivotValues[i][j].Ordinal,
                            hasChild: pivotValues[i][j].HasChild,
                            isDrilled: pivotValues[i][j].IsDrilled,
                            value: pivotValues[i][j].Value,
                            type: pivotValues[i][j].Type,
                            members: pivotValues[i][j].Members
                        };
                    }
                }
            }
        }
        return values;
    };
    PivotUtil.formatFieldList = function (fieldList) {
        var keys = Object.keys(fieldList);
        var fList = {};
        for (var i = 0; i < keys.length; i++) {
            if (fieldList[keys[i]]) {
                fList[keys[i]] = {
                    id: fieldList[keys[i]].Id,
                    caption: fieldList[keys[i]].Caption,
                    type: fieldList[keys[i]].Type,
                    formatString: fieldList[keys[i]].FormatString,
                    index: fieldList[keys[i]].Index,
                    members: fieldList[keys[i]].Members,
                    formattedMembers: fieldList[keys[i]].FormattedMembers,
                    dateMember: fieldList[keys[i]].DateMember,
                    filter: fieldList[keys[i]].Filter,
                    sort: fieldList[keys[i]].Sort,
                    aggregateType: fieldList[keys[i]].AggregateType,
                    baseField: fieldList[keys[i]].BaseField,
                    baseItem: fieldList[keys[i]].BaseItem,
                    filterType: fieldList[keys[i]].FilterType,
                    format: fieldList[keys[i]].Format,
                    formula: fieldList[keys[i]].Formula,
                    isSelected: fieldList[keys[i]].IsSelected,
                    isExcelFilter: fieldList[keys[i]].IsExcelFilter,
                    showNoDataItems: fieldList[keys[i]].ShowNoDataItems,
                    isCustomField: fieldList[keys[i]].IsCustomField,
                    showFilterIcon: fieldList[keys[i]].ShowFilterIcon,
                    showSortIcon: fieldList[keys[i]].ShowSortIcon,
                    showRemoveIcon: fieldList[keys[i]].ShowRemoveIcon,
                    showEditIcon: fieldList[keys[i]].ShowEditIcon,
                    showValueTypeIcon: fieldList[keys[i]].ShowValueTypeIcon,
                    allowDragAndDrop: fieldList[keys[i]].AllowDragAndDrop,
                    isCalculatedField: fieldList[keys[i]].IsCalculatedField,
                    showSubTotals: fieldList[keys[i]].ShowSubTotals,
                    expandAll: fieldList[keys[i]].expandAll,
                    groupName: fieldList[keys[i]].groupName
                };
            }
        }
        return fList;
    };
    PivotUtil.frameContent = function (pivotValues, type, rowPosition, control) {
        var dataContent = [];
        var pivot = control;
        if (pivot.dataSourceSettings.values.length > 0 && !pivot.engineModule.isEmptyData) {
            if ((pivot.enableValueSorting) || !pivot.engineModule.isEngineUpdated) {
                var rowCnt = 0;
                var start = type === 'value' ? rowPosition : 0;
                var end = type === 'value' ? pivotValues.length : rowPosition;
                for (var rCnt = start; rCnt < end; rCnt++) {
                    if (pivotValues[rCnt]) {
                        rowCnt = type === 'header' ? rCnt : rowCnt;
                        dataContent[rowCnt] = {};
                        for (var cCnt = 0; cCnt < pivotValues[rCnt].length; cCnt++) {
                            if (pivotValues[rCnt][cCnt]) {
                                dataContent[rowCnt][cCnt] = pivotValues[rCnt][cCnt];
                            }
                        }
                        rowCnt++;
                    }
                }
            }
        }
        return dataContent;
    };
    PivotUtil.getLocalizedObject = function (control) {
        var locale = {};
        locale['Null'] = control.localeObj.getConstant('null');
        locale['Years'] = control.localeObj.getConstant('Years');
        locale['Quarters'] = control.localeObj.getConstant('Quarters');
        locale['Months'] = control.localeObj.getConstant('Months');
        locale['Days'] = control.localeObj.getConstant('Days');
        locale['Hours'] = control.localeObj.getConstant('Hours');
        locale['Minutes'] = control.localeObj.getConstant('Minutes');
        locale['Seconds'] = control.localeObj.getConstant('Seconds');
        locale['QuarterYear'] = control.localeObj.getConstant('QuarterYear');
        locale['Of'] = control.localeObj.getConstant('of');
        locale['Qtr'] = control.localeObj.getConstant('qtr');
        locale['Undefined'] = control.localeObj.getConstant('undefined');
        locale['GroupOutOfRange'] = control.localeObj.getConstant('groupOutOfRange');
        locale['Group'] = control.localeObj.getConstant('group');
        return locale;
    };
    PivotUtil.updateReport = function (control, report) {
        control.setProperties({ dataSourceSettings: { rows: [] } }, true);
        control.setProperties({ dataSourceSettings: { columns: [] } }, true);
        control.setProperties({ dataSourceSettings: { formatSettings: [] } }, true);
        for (var i = 0; i < report.Rows.length; i++) {
            control.dataSourceSettings.rows.push({
                name: report.Rows[i].Name,
                caption: report.Rows[i].Caption,
                showNoDataItems: report.Rows[i].ShowNoDataItems,
                baseField: report.Rows[i].BaseField,
                baseItem: report.Rows[i].BaseItem,
                showFilterIcon: report.Rows[i].ShowFilterIcon,
                showSortIcon: report.Rows[i].ShowSortIcon,
                showEditIcon: report.Rows[i].ShowEditIcon,
                showRemoveIcon: report.Rows[i].ShowRemoveIcon,
                showSubTotals: report.Rows[i].ShowValueTypeIcon,
                allowDragAndDrop: report.Rows[i].AllowDragAndDrop,
                axis: report.Rows[i].Axis,
                dataType: report.Rows[i].DataType,
                isCalculatedField: report.Rows[i].IsCalculatedField,
                showValueTypeIcon: report.Rows[i].ShowValueTypeIcon,
                type: report.Rows[i].Type,
                expandAll: report.Rows[i].expandAll
            });
        }
        for (var i = 0; i < report.Columns.length; i++) {
            control.dataSourceSettings.columns.push({
                name: report.Columns[i].Name,
                caption: report.Columns[i].Caption,
                showNoDataItems: report.Columns[i].ShowNoDataItems,
                baseField: report.Columns[i].BaseField,
                baseItem: report.Columns[i].BaseItem,
                showFilterIcon: report.Columns[i].ShowFilterIcon,
                showSortIcon: report.Columns[i].ShowSortIcon,
                showEditIcon: report.Columns[i].ShowEditIcon,
                showRemoveIcon: report.Columns[i].ShowRemoveIcon,
                showSubTotals: report.Columns[i].ShowValueTypeIcon,
                allowDragAndDrop: report.Columns[i].AllowDragAndDrop,
                axis: report.Columns[i].Axis,
                dataType: report.Columns[i].DataType,
                isCalculatedField: report.Columns[i].IsCalculatedField,
                showValueTypeIcon: report.Columns[i].ShowValueTypeIcon,
                type: report.Columns[i].Type,
                expandAll: report.Columns[i].expandAll
            });
        }
        for (var i = 0; i < report.FormatSettings.length; i++) {
            control.dataSourceSettings.formatSettings.push({
                name: report.FormatSettings[i].Name,
                format: report.FormatSettings[i].Format,
                type: report.FormatSettings[i].Type,
                currency: report.FormatSettings[i].Currency,
                maximumFractionDigits: report.FormatSettings[i].MaximumFractionDigits,
                maximumSignificantDigits: report.FormatSettings[i].MaximumSignificantDigits,
                minimumFractionDigits: report.FormatSettings[i].MinimumFractionDigits,
                minimumIntegerDigits: report.FormatSettings[i].MinimumIntegerDigits,
                minimumSignificantDigits: report.FormatSettings[i].MinimumSignificantDigits,
                skeleton: report.FormatSettings[i].Skeleton,
                useGrouping: report.FormatSettings[i].UseGrouping
            });
        }
    };
    PivotUtil.generateUUID = function () {
        var d = new Date().getTime();
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    /**
     * It performing the Custom Sorting.
     *
     * @param {HeadersSortEventArgs} sortDetails - It contains the sort Details.
     * @param {IAxisSet[]} sortMembersOrder - It contains the sort Members Order.
     * @param {string | boolean} type - It contains the type.
     * @param {boolean} hasMembersOrder - It contains the has Members Order.
     * @param {boolean} isOlap - It contains the isOlap.
     * @returns {IAxisSet[]} - It returns the sorted data as IAxisSet[].
     * @hidden
     */
    PivotUtil.applyCustomSort = function (sortDetails, sortMembersOrder, type, hasMembersOrder, isOlap) {
        var grandTotal;
        var order = [];
        if (sortDetails.IsOrderChanged) {
            order = sortDetails.members;
        }
        else {
            order = (sortDetails.sortOrder === 'Ascending' || sortDetails.sortOrder === 'None' || sortDetails.sortOrder === undefined) ? [].concat(sortDetails.members) : [].concat(sortDetails.members).reverse();
        }
        if (order.length > sortMembersOrder.length) {
            order = order.filter(function (item) {
                return sortMembersOrder.some(function (member) {
                    var sortText = isOlap
                        ? member.formattedText
                        : type === 'string' || type === 'number'
                            ? member.actualText
                            : member.dateText;
                    return (typeof item === typeof sortText) && (sortText === item);
                });
            });
        }
        var updatedMembers = [];
        var isNormalType = type === undefined || type === 'string' || type === 'number';
        if (sortMembersOrder.length > 0 && sortMembersOrder[0].actualText === 'Grand Total') {
            grandTotal = sortMembersOrder[0];
            sortMembersOrder.shift();
        }
        for (var i = 0, j = 0; i < sortMembersOrder.length; i++) {
            var member = sortMembersOrder[i];
            var sortText = isOlap ? member.formattedText : isNormalType ? member.actualText :
                type === true ? member.actualText.toString() : member.dateText;
            if (order[j] === sortText) {
                sortMembersOrder.splice(j++, 0, member);
                sortMembersOrder.splice(++i, 1);
                if (j < order.length) {
                    i = -1;
                }
                else {
                    if (!hasMembersOrder) {
                        updatedMembers.splice(--j, 0, sortText);
                    }
                    break;
                }
            }
            if (i >= 0 && !hasMembersOrder) {
                updatedMembers[i] = sortText;
            }
        }
        if (!hasMembersOrder) {
            for (var i = updatedMembers.length; i < sortMembersOrder.length; i++) {
                var member = sortMembersOrder[i];
                var sortText = isOlap ? member.formattedText : isNormalType ? member.actualText :
                    type === true ? member.actualText.toString() : member.dateText;
                updatedMembers[i] = sortText;
            }
            if (updatedMembers[updatedMembers.length - 1] === 'Grand Total') {
                updatedMembers.pop();
            }
            sortDetails.members = updatedMembers;
        }
        if (grandTotal) {
            sortMembersOrder.splice(0, 0, grandTotal);
        }
        return sortMembersOrder;
    };
    /**
     * It performs to returnssorted headers.
     *
     * @param {IAxisSet[]} sortMembersOrder - It contains the sort members order.
     * @param {string} sortOrder - It contains the sort order.
     * @param {string | boolean} type - It contains the type.
     * @param {boolean} isNumberGroupSorting - it defines the sorting is numer grouping or not.
     * @returns {IAxisSet[]} - It returns the sorted data as IAxisSet[].
     * @hidden
     */
    PivotUtil.applyHeadersSort = function (sortMembersOrder, sortOrder, type, isNumberGroupSorting) {
        if (isNumberGroupSorting) {
            sortMembersOrder = sortMembersOrder.sort(function (a, b) {
                var aText = a.actualText;
                var bText = b.actualText;
                return (aText === 'Grand Total' || bText === 'Grand Total') ? 0 : (aText === 'Out of Range') ? 1 :
                    (bText === 'Out of Range') ? -1 : !isNaN(parseFloat(aText)) && !isNaN(parseFloat(bText)) ?
                        sortOrder === 'Ascending' ? parseFloat(aText) - parseFloat(bText) : parseFloat(bText) - parseFloat(aText) :
                        sortOrder === 'Ascending' ? aText.localeCompare(bText, undefined, { numeric: true, sensitivity: 'base' }) :
                            bText.localeCompare(aText, undefined, { numeric: true, sensitivity: 'base' });
            });
        }
        else if (type === 'datetime' || type === 'date' || type === 'time') {
            sortMembersOrder = sortOrder === 'Ascending'
                ? sortMembersOrder.sort(function (a, b) {
                    if (a.dateText === 'Out of Range') {
                        return 1;
                    }
                    if (b.dateText === 'Out of Range') {
                        return -1;
                    }
                    return a.dateText > b.dateText ? 1 : a.dateText < b.dateText ? -1 : 0;
                })
                : sortOrder === 'Descending'
                    ? sortMembersOrder.sort(function (a, b) {
                        if (a.dateText === 'Out of Range') {
                            return 1;
                        }
                        if (b.dateText === 'Out of Range') {
                            return -1;
                        }
                        return a.dateText < b.dateText ? 1 : a.dateText > b.dateText ? -1 : 0;
                    })
                    : sortMembersOrder;
        }
        else if (type === true) {
            sortMembersOrder = sortOrder === 'Ascending' ?
                (sortMembersOrder.sort(function (a, b) { return (a.actualText === 'Grand Total' || b.actualText === 'Grand Total') ? 0 : (a.actualText === 'Out of Range') ? 1 : (b.actualText === 'Out of Range') ? -1 : (Number(a.actualText.toString().match(/\d+/)) > Number(b.actualText.toString().match(/\d+/))) ? 1 : ((Number(b.actualText.toString().match(/\d+/)) > Number(a.actualText.toString().match(/\d+/))) ? -1 : 0); })) :
                sortOrder === 'Descending' ?
                    (sortMembersOrder.sort(function (a, b) { return (a.actualText === 'Grand Total' || b.actualText === 'Grand Total') ? 0 : (a.actualText === 'Out of Range') ? -1 : (b.actualText === 'Out of Range') ? 1 : (Number(a.actualText.toString().match(/\d+/)) < Number(b.actualText.toString().match(/\d+/))) ? 1 : ((Number(b.actualText.toString().match(/\d+/)) < Number(a.actualText.toString().match(/\d+/))) ? -1 : 0); })) :
                    sortMembersOrder;
        }
        else {
            sortMembersOrder = sortOrder === 'Ascending' ?
                (sortMembersOrder.sort(function (a, b) { return (a.actualText === 'Grand Total' || b.actualText === 'Grand Total') ? 0 : ((a.actualText > b.actualText) ? 1 : ((b.actualText > a.actualText) ? -1 : 0)); })) :
                sortOrder === 'Descending' ?
                    (sortMembersOrder.sort(function (a, b) { return (a.actualText === 'Grand Total' || b.actualText === 'Grand Total') ? 0 : ((a.actualText < b.actualText) ? 1 : ((b.actualText < a.actualText) ? -1 : 0)); })) :
                    sortMembersOrder;
        }
        return sortMembersOrder;
    };
    /**
     * It performs to render the olap engine.
     *
     * @param {PivotView | PivotFieldList} pivot - It specifies the pivotview and pivot field list component instance.
     * @param {IOlapCustomProperties} customProperties - It contains the internal properties that used for engine population.
     * @returns {void}
     * @hidden
     */
    PivotUtil.renderOlapEngine = function (pivot, customProperties) {
        try {
            pivot.olapEngineModule.renderEngine(pivot.dataSourceSettings, customProperties ? customProperties :
                pivot.frameCustomProperties(pivot.olapEngineModule.fieldListData, pivot.olapEngineModule.fieldList), pivot.onHeadersSort ? pivot.getHeaderSortInfo.bind(pivot) : undefined);
            pivot.setProperties({ dataSourceSettings: { valueIndex: pivot.olapEngineModule.measureIndex } }, true);
        }
        catch (exception) {
            pivot.actionObj.actionName = 'engineFormation';
            if (pivot.olapEngineModule.errorInfo) {
                pivot.actionFailureMethod(pivot.olapEngineModule.errorInfo);
                pivot.olapEngineModule.errorInfo = undefined;
            }
            else {
                pivot.actionFailureMethod(exception);
            }
        }
    };
    /**
     *
     * @param {IDataSet | IAxisSet} header - It contains the value of header
     * @returns {IAxisSet} - It frame Header With Keys
     * @hidden */
    PivotUtil.frameHeaderWithKeys = function (header) {
        var keys = Object.keys(header);
        var keyPos = 0;
        var framedHeader = {};
        while (keyPos < keys.length) {
            framedHeader[keys[keyPos]] = header[keys[keyPos]];
            keyPos++;
        }
        return framedHeader;
    };
    /**
     *
     * @param {PdfPageSize} pageSize - It contains the value of page Size
     * @returns {SizeF} - It returns the value as SizeF
     * @hidden */
    PivotUtil.getPageSize = function (pageSize) {
        switch (pageSize) {
            case 'Letter':
                return new SizeF(612, 792);
            case 'Note':
                return new SizeF(540, 720);
            case 'Legal':
                return new SizeF(612, 1008);
            case 'A0':
                return new SizeF(2380, 3368);
            case 'A1':
                return new SizeF(1684, 2380);
            case 'A2':
                return new SizeF(1190, 1684);
            case 'A3':
                return new SizeF(842, 1190);
            case 'A5':
                return new SizeF(421, 595);
            case 'A6':
                return new SizeF(297, 421);
            case 'A7':
                return new SizeF(210, 297);
            case 'A8':
                return new SizeF(148, 210);
            case 'A9':
                return new SizeF(105, 148);
            case 'B0':
                return new SizeF(2836, 4008);
            case 'B1':
                return new SizeF(2004, 2836);
            case 'B2':
                return new SizeF(1418, 2004);
            case 'B3':
                return new SizeF(1002, 1418);
            case 'B4':
                return new SizeF(709, 1002);
            case 'B5':
                return new SizeF(501, 709);
            case 'Archa':
                return new SizeF(648, 864);
            case 'Archb':
                return new SizeF(864, 1296);
            case 'Archc':
                return new SizeF(1296, 1728);
            case 'Archd':
                return new SizeF(1728, 2592);
            case 'Arche':
                return new SizeF(2592, 3456);
            case 'Flsa':
                return new SizeF(612, 936);
            case 'HalfLetter':
                return new SizeF(396, 612);
            case 'Letter11x17':
                return new SizeF(792, 1224);
            case 'Ledger':
                return new SizeF(1224, 792);
            default:
                return new SizeF(595, 842);
        }
    };
    /**
     *
     * @param {any} aggreColl - It contains the selected header and its value cell collection, that should be sorted for value sorting.
     * @param {string} sortOrder - It denotes the sorting order.
     * @returns {IAxisSet[]} - It returns the sorted collection in the provided sort order.
     * @hidden */
    PivotUtil.getSortedValue = function (aggreColl, sortOrder) {
        aggreColl.sort(function (a, b) {
            return sortOrder === 'Descending' ? ((b['value'] || b['header']['type'] === 'grand sum' ? b['value'] : 0) -
                (a['value'] || a['header']['type'] === 'grand sum' ? a['value'] : 0)) : ((a['value'] || a['header']['type'] === 'grand sum' ? a['value'] : 0) -
                (b['value'] || b['header']['type'] === 'grand sum' ? b['value'] : 0));
        });
        return aggreColl.map(function (item) {
            return item['header'];
        });
    };
    PivotUtil.toggleFieldListIconVisibility = function (control) {
        if (control.showFieldList && select('#' + control.element.id + '_PivotFieldList', control.element)) {
            if (control.toolbar && control.toolbar.indexOf('FieldList') !== -1) {
                select('#' + control.element.id + '_PivotFieldList', control.element).style.display = 'none';
            }
            else {
                select('#' + control.element.id + '_PivotFieldList', control.element).style.top =
                    control.element.querySelector('.' + cls.GRID_TOOLBAR).offsetHeight.toString() + 'px';
                select('#' + control.element.id + '_PivotFieldList', control.element).style.position = 'relative';
            }
        }
        if (control.toolbar && control.toolbar.indexOf('FieldList') !== -1 &&
            control.showToolbar && control.element.querySelector('.e-toggle-field-list')) {
            control.element.querySelector('.e-toggle-field-list').style.display = 'none';
        }
    };
    return PivotUtil;
}());
export { PivotUtil };
