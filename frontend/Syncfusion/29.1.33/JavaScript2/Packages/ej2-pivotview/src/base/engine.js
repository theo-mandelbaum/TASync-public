var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { PivotUtil } from './util';
/**
 * PivotEngine is used to manipulate the relational or Multi-Dimensional data as pivoting values.
 */
/** @hidden */
var PivotEngine = /** @class */ (function () {
    function PivotEngine() {
        /** @hidden */
        this.aggregatedValueMatrix = [];
        /** @hidden */
        this.valueContent = [];
        /** @hidden */
        this.formatFields = {};
        /** @hidden */
        this.groupingFieldsInfo = {};
        /** @hidden */
        this.dateFormatFunction = {};
        /** @hidden */
        this.calculatedFields = {};
        /** @hidden */
        this.calculatedFormulas = {};
        /** @hidden */
        this.valueAxis = 0;
        /** @hidden */
        this.saveDataHeaders = {};
        /** @hidden */
        this.columnCount = 0;
        /** @hidden */
        this.rowCount = 0;
        /** @hidden */
        this.columnPageCount = 0;
        /** @hidden */
        this.rowPageCount = 0;
        /** @hidden */
        this.colFirstLvl = 0;
        /** @hidden */
        this.rowFirstLvl = 0;
        /** @hidden */
        this.rowStartPos = 0;
        /** @hidden */
        this.colStartPos = 0;
        /** @hidden */
        this.enableValueSorting = false;
        /** @hidden */
        this.headerCollection = { rowHeaders: [], columnHeaders: [], rowHeadersCount: 0, columnHeadersCount: 0 };
        /** @hidden */
        this.rMembers = [];
        /** @hidden */
        this.cMembers = [];
        /** @hidden */
        this.groupingFields = {};
        /** @hidden */
        this.isLastHeaderHasMeasures = true;
        /** @hidden */
        this.measureIndex = -1;
        /** @hidden */
        this.isPagingOrVirtualizationEnabled = false;
        /** @hidden */
        this.rowMaxLevel = 0;
        this.valueMatrix = [];
        this.memberCnt = -1;
        this.pageInLimit = false;
        this.endPos = 0;
        this.removeCount = 0;
        this.colHdrBufferCalculated = false;
        this.colValuesLength = 1;
        this.rowValuesLength = 1;
        this.slicedHeaders = [];
        this.fieldFilterMem = {};
        this.filterPosObj = {};
        this.selectedHeaders = { selectedHeader: [], values: [] };
        this.rowGrandTotal = null;
        this.columnGrandTotal = null;
        this.removeRowGrandTotal = false;
        this.removeColumnGrandTotal = false;
        this.isValueHasAdvancedAggregate = false;
        this.rawIndexObject = {};
        this.reformAxisCount = 0;
        this.isEditing = false;
        /** @hidden */
        this.valueAxisFields = {};
        /** @hidden */
        this.data = [];
        /** @hidden */
        this.actualData = [];
        /** @hidden */
        this.groupRawIndex = {};
        /** @hidden */
        this.fieldKeys = {};
        this.allowDataCompression = false;
        this.dataSourceSettings = {};
        this.frameHeaderObjectsCollection = false;
        this.headerObjectsCollection = {};
        this.columnKeys = {};
        this.fieldDrillCollection = {};
        this.formatRegex = /^(?:[ncpae])(?:([0-9]|1[0-9]|20))?$/i;
        this.measureNames = {};
        this.enablePaging = false;
        this.enableVirtualization = false;
        this.enableHtmlSanitizer = false;
        this.enableOptimizedRendering = false;
        this.groupedDataType = {};
        this.emptyRowsLength = 0;
        this.tabularPivotValues = [];
        /* private makeMirrorObject(elements: number[], obj: NumberIndex): void {
             for (let lp: number = 0, end: number = elements.length; lp < end; lp++) {
                 obj[elements[lp]] = elements[lp];
             }
         } */
    }
    /**
     * It is used to clear properties.
     *
     * @param {boolean} isExport - It indicates whether it is triggered after the export or not.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.clearProperties = function (isExport) {
        if (!this.isPagingOrVirtualizationEnabled && !isExport) {
            this.columnKeys = {};
            this.headerCollection = { rowHeaders: [], columnHeaders: [], rowHeadersCount: 0, columnHeadersCount: 0 };
        }
        if (this.enableValueSorting) {
            this.valueContent = [];
        }
        this.saveDataHeaders = this.allowValueFilter ? this.saveDataHeaders : {};
        this.rMembers = [];
        this.cMembers = [];
        this.slicedHeaders = [];
        this.fieldFilterMem = {};
        this.filterPosObj = {};
        this.selectedHeaders = { selectedHeader: [], values: [] };
        this.rowGrandTotal = null;
        this.columnGrandTotal = null;
        this.rawIndexObject = {};
        if (this.dataSourceSettings.valueIndex > -1) {
            this.valueAxisFields = {};
        }
        this.headerObjectsCollection = {};
        this.fieldDrillCollection = {};
    };
    /**
     * It is used to render the pivot engine.
     *
     * @param {IDataOptions} dataSource -  It contains the dataSourceSettings.
     * @param {ICustomProperties} customProperties -  It contains the custom Properties.
     * @param {Function} fn - It contains aggreagateCellnInfo method.
     * @param {Function} onHeadersSort -  It contains onHeaderSort method.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.renderEngine = function (dataSource, customProperties, fn, onHeadersSort) {
        this.getValueCellInfo = fn;
        this.getHeaderSortInfo = onHeadersSort;
        this.customProperties = customProperties;
        if (this.fieldList) {
            for (var i = 0, j = dataSource.formatSettings; i < j.length; i++) {
                if (!this.formatFields[j[i].name] && this.fieldList[j[i].name]) {
                    this.fieldList[j[i].name].members = {};
                    this.fieldList[j[i].name].formattedMembers = {};
                    this.fieldList[j[i].name].dateMember = [];
                }
            }
        }
        this.formatFields = {};
        this.dateFormatFunction = {};
        this.calculatedFields = {};
        this.calculatedFormulas = {};
        this.valueAxis = 0;
        this.saveDataHeaders = {};
        this.columnCount = 0;
        this.rowCount = 0;
        this.columnPageCount = 0;
        this.rowPageCount = 0;
        this.colFirstLvl = 0;
        this.rowFirstLvl = 0;
        this.rowStartPos = 0;
        this.colStartPos = 0;
        this.dataSourceSettings.excludeFields = isNullOrUndefined(dataSource.excludeFields) ? [] : dataSource.excludeFields;
        this.enableValueSorting = false;
        this.headerCollection = { rowHeaders: [], columnHeaders: [], rowHeadersCount: 0, columnHeadersCount: 0 };
        this.aggregatedValueMatrix = [];
        this.rMembers = [];
        this.cMembers = [];
        this.memberCnt = -1;
        this.pageInLimit = false;
        this.endPos = 0;
        this.removeCount = 0;
        this.colHdrBufferCalculated = false;
        this.colValuesLength = 1;
        this.rowValuesLength = 1;
        this.slicedHeaders = [];
        this.fieldFilterMem = {};
        this.filterPosObj = {};
        this.selectedHeaders = { selectedHeader: [], values: [] };
        this.rowGrandTotal = null;
        this.columnGrandTotal = null;
        this.removeRowGrandTotal = false;
        this.removeColumnGrandTotal = false;
        this.isValueHasAdvancedAggregate = false;
        this.rawIndexObject = {};
        this.isLastHeaderHasMeasures = true;
        this.isEditing = false;
        var fields;
        this.globalize = (customProperties && customProperties.globalize) ? customProperties.globalize : new Internationalization();
        this.currencyCode = (customProperties && customProperties.currenyCode) ? customProperties.currenyCode : undefined;
        this.localeObj = customProperties ? customProperties.localeObj : undefined;
        this.fieldsType = customProperties ? customProperties.fieldsType : {};
        this.clonedReport = customProperties ? (customProperties.clonedReport &&
            customProperties.clonedReport.properties ?
            customProperties.clonedReport.properties :
            customProperties.clonedReport) : {};
        this.enablePaging = customProperties.enablePaging;
        this.enableVirtualization = customProperties.enableVirtualization;
        this.enableOptimizedRendering = customProperties.enableOptimizedRendering;
        this.enableHtmlSanitizer = customProperties.enableHtmlSanitizer;
        this.isPagingOrVirtualizationEnabled = this.enablePaging || this.enableVirtualization;
        this.enableSort = dataSource.enableSorting;
        this.dataSourceSettings.alwaysShowValueHeader = dataSource.alwaysShowValueHeader;
        this.dataSourceSettings.showHeaderWhenEmpty = isNullOrUndefined(dataSource.showHeaderWhenEmpty) ? true :
            dataSource.showHeaderWhenEmpty;
        this.dataSourceSettings.showSubTotals = isNullOrUndefined(dataSource.showSubTotals) ? true : dataSource.showSubTotals;
        this.dataSourceSettings.showRowSubTotals = isNullOrUndefined(dataSource.showRowSubTotals) ? true : dataSource.showRowSubTotals;
        this.dataSourceSettings.showColumnSubTotals = isNullOrUndefined(dataSource.showColumnSubTotals) ? true :
            dataSource.showColumnSubTotals;
        this.dataSourceSettings.showGrandTotals = isNullOrUndefined(dataSource.showGrandTotals) ? true : dataSource.showGrandTotals;
        this.dataSourceSettings.grandTotalsPosition = isNullOrUndefined(dataSource.grandTotalsPosition) ? 'Bottom' :
            dataSource.grandTotalsPosition;
        this.dataSourceSettings.showRowGrandTotals = isNullOrUndefined(dataSource.showRowGrandTotals) ? true :
            dataSource.showRowGrandTotals;
        this.dataSourceSettings.showColumnGrandTotals = isNullOrUndefined(dataSource.showColumnGrandTotals) ? true :
            dataSource.showColumnGrandTotals;
        this.showSubTotalsAtTop = (this.dataSourceSettings.showSubTotals && this.dataSourceSettings.showColumnSubTotals &&
            dataSource.subTotalsPosition === 'Top') && !customProperties.isTabularLayout;
        this.showSubTotalsAtBottom = (this.dataSourceSettings.showSubTotals && this.dataSourceSettings.showRowSubTotals &&
            dataSource.subTotalsPosition === 'Bottom') || customProperties.isTabularLayout;
        this.allowValueFilter = dataSource.allowValueFilter;
        this.isValueFilterEnabled = false;
        this.enableValueSorting = customProperties ? customProperties.enableValueSorting : false;
        this.isDrillThrough = customProperties ? (customProperties.isDrillThrough ? customProperties.isDrillThrough : false) : false;
        this.valueContent = [];
        this.dataSourceSettings = PivotUtil.getClonedDataSourceSettings(dataSource);
        if (!(dataSource.dataSource instanceof DataManager)) {
            if (dataSource.type === 'CSV') {
                this.data = dataSource.dataSource.map(function (innerArray) { return innerArray.slice(); });
                if (this.fieldList) {
                    this.data.shift();
                }
            }
            else {
                this.data = dataSource.dataSource;
            }
        }
        if (this.data && this.data[0]) {
            if (!this.fieldList) {
                if (dataSource.type === 'CSV') {
                    this.fields = this.data.shift();
                }
                else {
                    this.fields = Object.keys(this.data[0]);
                }
                this.fieldKeys = {};
                for (var i = 0; i < this.fields.length; i++) {
                    this.fieldKeys[this.fields[i]] = dataSource.type === 'CSV' ? i : this.fields[i];
                }
            }
            if (customProperties && customProperties.pageSettings && customProperties.allowDataCompression) {
                this.actualData = this.data;
                this.data = this.getGroupedRawData(dataSource);
            }
            this.dataSourceSettings.rows = dataSource.rows ? dataSource.rows : [];
            this.dataSourceSettings.columns = dataSource.columns ? dataSource.columns : [];
            this.dataSourceSettings.filters = dataSource.filters ? dataSource.filters : [];
            this.dataSourceSettings.values = dataSource.values ? dataSource.values : [];
            this.dataSourceSettings.formatSettings = dataSource.formatSettings ? dataSource.formatSettings : [];
            this.dataSourceSettings.groupSettings = dataSource.groupSettings ? dataSource.groupSettings : [];
            this.dataSourceSettings.calculatedFieldSettings = dataSource.calculatedFieldSettings ? dataSource.calculatedFieldSettings : [];
            this.enableSort = dataSource.enableSorting === undefined ? true : dataSource.enableSorting;
            this.dataSourceSettings.fieldMapping = dataSource.fieldMapping ? dataSource.fieldMapping : [];
            this.valueAxisFields = {};
            for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                var value = _a[_i];
                this.valueAxisFields[value.name] = value;
            }
            fields = this.getGroupData(this.data);
            this.validateFilters(dataSource);
            this.isExpandAll = (this.isValueFiltersAvail && dataSource.allowValueFilter) ? true : dataSource.expandAll;
            this.drilledMembers =
                dataSource.drilledMembers ? (this.isValueFiltersAvail && dataSource.allowValueFilter) ? [] : dataSource.drilledMembers : [];
            this.isMultiMeasures = this.dataSourceSettings.values.length > 1 ? true : false;
            this.valueAxis = dataSource.valueAxis === 'row' ? 1 : 0;
            this.measureIndex = !isNullOrUndefined(dataSource.valueIndex) ? dataSource.valueIndex : -1;
            this.emptyCellTextContent = dataSource.emptyCellsTextContent ? dataSource.emptyCellsTextContent : '';
            this.rowValuesLength = this.valueAxis === 1 ? this.dataSourceSettings.values.length : 1;
            this.colValuesLength = this.valueAxis === 0 ? this.dataSourceSettings.values.length : 1;
            this.valueSortSettings = dataSource.valueSortSettings ||
                { sortOrder: 'None', headerDelimiter: '.', headerText: '', columnIndex: undefined };
            this.valueSortData = [];
            this.pageSettings = customProperties ? (customProperties.pageSettings ? customProperties.pageSettings : this.pageSettings)
                : undefined;
            this.allowDataCompression = customProperties && customProperties.allowDataCompression;
            this.savedFieldList = customProperties ? customProperties.savedFieldList : undefined;
            this.getFieldList(fields, this.enableSort, dataSource.allowValueFilter);
            this.removeIrrelevantFields(Object.keys(this.fieldList));
            this.fillFieldMembers();
            this.updateSortSettings(dataSource.sortSettings, this.enableSort);
            this.filterMembers = [];
            var columnLength = this.dataSourceSettings.columns.length - 1;
            this.columnKeys = {};
            while (columnLength > -1) {
                this.columnKeys[this.dataSourceSettings.columns[columnLength].name] = this.dataSourceSettings
                    .columns[columnLength];
                columnLength--;
            }
            this.updateFilterMembers(dataSource);
            this.generateGridData(dataSource);
        }
    };
    PivotEngine.prototype.removeIrrelevantFields = function (fields) {
        var report = {};
        report[0] = this.dataSourceSettings.rows;
        report[1] = this.dataSourceSettings.columns;
        report[2] = this.dataSourceSettings.values;
        report[3] = this.dataSourceSettings.filters;
        var pos = 0;
        while (pos < 4) {
            if (report[pos]) {
                for (var cnt = 0; cnt < report[pos].length; cnt++) {
                    var fieldName = report[pos][cnt].name;
                    if ((this.dataSourceSettings.excludeFields.indexOf(fieldName) > -1) || (!isNullOrUndefined(fields)
                        && fields.indexOf(fieldName) === -1)) {
                        report[pos].splice(cnt, 1);
                        cnt--;
                    }
                    else if (pos === 2) {
                        this.measureNames[fieldName] =
                            report[pos][cnt].caption ? report[pos][cnt].caption : fieldName;
                        this.measureNames[report[pos][cnt].caption ?
                            report[pos][cnt].caption : fieldName] = fieldName;
                    }
                }
            }
            pos++;
        }
        this.isMultiMeasures = this.dataSourceSettings.values.length > 1 ? true : false;
        this.measureIndex = this.measureIndex === -1 ? (this.valueAxis ? report[0].length : report[1].length) : this.measureIndex;
    };
    PivotEngine.prototype.updateDataSourceSettings = function (dataSource, requireDatasourceUpdate) {
        if (requireDatasourceUpdate) {
            this.emptyCellTextContent = dataSource.emptyCellsTextContent ? dataSource.emptyCellsTextContent : '';
            this.valueAxis = dataSource.valueAxis === 'row' ? 1 : 0;
            this.rowValuesLength = this.valueAxis === 1 ? this.dataSourceSettings.values.length : 1;
            this.colValuesLength = this.valueAxis === 0 ? this.dataSourceSettings.values.length : 1;
            this.measureIndex = !isNullOrUndefined(dataSource.valueIndex) ? dataSource.valueIndex : -1;
            this.enableSort = dataSource.enableSorting;
            this.dataSourceSettings.alwaysShowValueHeader = dataSource.alwaysShowValueHeader;
            this.dataSourceSettings.showHeaderWhenEmpty = isNullOrUndefined(dataSource.showHeaderWhenEmpty) ? true :
                dataSource.showHeaderWhenEmpty;
            this.dataSourceSettings.showSubTotals = isNullOrUndefined(dataSource.showSubTotals) ? true : dataSource.showSubTotals;
            this.dataSourceSettings.showRowSubTotals = isNullOrUndefined(dataSource.showRowSubTotals) ? true : dataSource.showRowSubTotals;
            this.dataSourceSettings.showColumnSubTotals = isNullOrUndefined(dataSource.showColumnSubTotals) ? true :
                dataSource.showColumnSubTotals;
            this.dataSourceSettings.showGrandTotals = isNullOrUndefined(dataSource.showGrandTotals) ? true : dataSource.showGrandTotals;
            this.dataSourceSettings.grandTotalsPosition = isNullOrUndefined(dataSource.grandTotalsPosition) ? 'Bottom' :
                dataSource.grandTotalsPosition;
            this.dataSourceSettings.showRowGrandTotals = isNullOrUndefined(dataSource.showRowGrandTotals) ? true :
                dataSource.showRowGrandTotals;
            this.dataSourceSettings.showColumnGrandTotals = isNullOrUndefined(dataSource.showColumnGrandTotals) ? true :
                dataSource.showColumnGrandTotals;
            this.showSubTotalsAtTop = this.dataSourceSettings.showSubTotals && dataSource.subTotalsPosition === 'Top' &&
                dataSource.showColumnSubTotals;
            this.showSubTotalsAtBottom = this.customProperties.isTabularLayout ? true : this.dataSourceSettings.showSubTotals && dataSource.subTotalsPosition === 'Bottom' && dataSource.showRowSubTotals;
            this.allowValueFilter = dataSource.allowValueFilter;
            this.dataSourceSettings.formatSettings = dataSource.formatSettings ? dataSource.formatSettings : [];
            this.dataSourceSettings.groupSettings = dataSource.groupSettings ? dataSource.groupSettings : [];
            this.dataSourceSettings.calculatedFieldSettings = dataSource.calculatedFieldSettings ? dataSource.calculatedFieldSettings : [];
            this.enableSort = dataSource.enableSorting === undefined ? true : dataSource.enableSorting;
            this.dataSourceSettings.fieldMapping = dataSource.fieldMapping ? dataSource.fieldMapping : [];
            this.dataSourceSettings.values = dataSource.values ? dataSource.values : [];
            this.dataSourceSettings.rows = dataSource.rows ? dataSource.rows : [];
            this.dataSourceSettings.columns = dataSource.columns ? dataSource.columns : [];
            this.dataSourceSettings.filters = dataSource.filters ? dataSource.filters : [];
            this.dataSourceSettings.filterSettings = dataSource.filterSettings ? dataSource.filterSettings : [];
            this.dataSourceSettings.sortSettings = dataSource.sortSettings ? dataSource.sortSettings : [];
            this.dataSourceSettings.conditionalFormatSettings = dataSource.conditionalFormatSettings ?
                dataSource.conditionalFormatSettings : [];
            this.dataSourceSettings.valueSortSettings = dataSource.valueSortSettings ? dataSource.valueSortSettings : {};
            this.removeIrrelevantFields(Object.keys(this.fieldList));
        }
    };
    PivotEngine.prototype.getGroupedRawData = function (dataSourceSettings) {
        this.data = [];
        for (var _i = 0, _a = this.actualData; _i < _a.length; _i++) {
            var data = _a[_i];
            this.data[this.data.length] = PivotUtil.frameHeaderWithKeys(data);
        }
        var countFields = dataSourceSettings.values.filter(function (item) {
            return item.type === 'Count' || item.type === 'DistinctCount';
        }).map(function (item) { return item.name; });
        var hasCountField = countFields.length > 0;
        var realData = this.data;
        var headerFields = dataSourceSettings.rows.concat(dataSourceSettings.columns.concat(dataSourceSettings.filters)).map(function (item) {
            return item.name;
        });
        var groupRawData = {};
        var finalData = [];
        this.groupRawIndex = {};
        var groupKeys = {};
        var indexLength = 0;
        for (var i = 0; i < realData.length; i++) {
            var currData = realData[i];
            var members = [];
            if (hasCountField) {
                for (var vPos = 0; vPos < countFields.length; vPos++) {
                    currData[this.fieldKeys[countFields[vPos]]] =
                        isNullOrUndefined(currData[this.fieldKeys[countFields[vPos]]]) ?
                            currData[this.fieldKeys[countFields[vPos]]] : 1;
                }
            }
            for (var hPos = 0; hPos < headerFields.length; hPos++) {
                members.push(currData[this.fieldKeys[headerFields[hPos]]]);
            }
            var memberJoin = members.join('-');
            if (groupRawData[memberJoin]) {
                for (var vPos = 0; vPos < dataSourceSettings.values.length; vPos++) {
                    var currFieldName = dataSourceSettings.values[vPos].name;
                    var currValue = currData[this.fieldKeys[currFieldName]];
                    var savedData = groupRawData[memberJoin];
                    var summType = dataSourceSettings.values[vPos].type;
                    if (!isNullOrUndefined(currValue)) {
                        if (typeof currValue !== 'number' || summType === 'DistinctCount') {
                            summType = 'Count';
                        }
                        if (isNullOrUndefined(savedData[currFieldName])) {
                            savedData[currFieldName] = summType === 'Product' ? 1 : ((summType === 'Min' || summType === 'Max')
                                ? undefined : 0);
                        }
                        else if (typeof savedData[currFieldName] !== 'number') {
                            savedData[currFieldName] = 1;
                        }
                        if (summType === 'Count') {
                            savedData[currFieldName] += 1;
                        }
                        else if (summType === 'Min') {
                            if (!isNullOrUndefined(savedData[currFieldName])) {
                                savedData[currFieldName] = savedData[currFieldName] > currValue ?
                                    currValue : savedData[currFieldName];
                            }
                        }
                        else if (summType === 'Max') {
                            if (!isNullOrUndefined(savedData[currFieldName])) {
                                savedData[currFieldName] = savedData[currFieldName] < currValue ?
                                    currValue : savedData[currFieldName];
                            }
                        }
                        else if (summType === 'Product') {
                            savedData[currFieldName] *= currValue;
                        }
                        else {
                            savedData[currFieldName] += currValue;
                        }
                    }
                }
                if (this.isDrillThrough) {
                    this.groupRawIndex[groupKeys[memberJoin]].push(i);
                }
            }
            else {
                (groupRawData)[memberJoin] = currData;
                finalData.push(currData);
                if (this.isDrillThrough) {
                    this.groupRawIndex[indexLength] = [i];
                    groupKeys[memberJoin] = indexLength;
                    indexLength++;
                }
            }
        }
        return finalData;
    };
    PivotEngine.prototype.getGroupData = function (data) {
        var _this = this;
        var fieldkeySet = data[0];
        var _loop_1 = function (i, groupElements) {
            var group = groupElements[i];
            var fieldName = group.name;
            var caption = group.caption;
            if (this_1.fields.indexOf(fieldName) > -1) {
                var groupFields = {};
                var customGroupFieldName = void 0;
                if ((group.type === 'Date' && this_1.groupingFields[fieldName]) ||
                    (group.type === 'Custom' && this_1.groupingFields[fieldName])) {
                    return { value: fieldkeySet };
                }
                else if (group.type === 'Number') {
                    if (PivotUtil.getType(fieldkeySet[fieldName]) === 'number' ||
                        !this_1.groupingFields[fieldName]) {
                        if (group.rangeInterval) {
                            data.sort(function (a, b) { return (Number(a[_this.fieldKeys[fieldName]]) >
                                Number(b[_this.fieldKeys[fieldName]])) ? 1 :
                                ((Number(b[_this.fieldKeys[fieldName]]) >
                                    Number(a[_this.fieldKeys[fieldName]])) ? -1 : 0); });
                        }
                    }
                    else {
                        return { value: fieldkeySet };
                    }
                }
                // else if (group.type === 'Custom' && this.fields.indexOf(fieldName + '_custom_group') > -1) {
                //     return fieldkeySet;
                // }
                var len = data.length;
                while (len--) {
                    var item = data[len];
                    if (item[this_1.fieldKeys[fieldName]] && group.type === 'Date') {
                        var date = new Date(item[this_1.fieldKeys[fieldName]].toString());
                        if (!isNullOrUndefined(date) && group.groupInterval.length > 0) {
                            for (var i_1 = 0, len_1 = group.groupInterval.length; i_1 < len_1; i_1++) {
                                var interval = group.groupInterval[i_1];
                                var isInRangeAvail = this_1.getRange(group, date.getTime());
                                var newDate = PivotUtil.resetTime(new Date());
                                switch (interval) {
                                    case 'Years':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_years';
                                            groupFields[newFieldName] = interval;
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                new Date(newDate.setFullYear(date.getFullYear())).toString());
                                        }
                                        break;
                                    case 'Quarters':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_quarters';
                                            groupFields[newFieldName] = interval;
                                            var month = Math.ceil((date.getMonth() + 1) / 3);
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                ((this_1.localeObj ? this_1.localeObj.getConstant('qtr') : 'Qtr') + month.toString()));
                                        }
                                        break;
                                    case 'QuarterYear':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_quarterYear';
                                            groupFields[newFieldName] = interval;
                                            var month = Math.ceil((date.getMonth() + 1) / 3);
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                ((this_1.localeObj ? this_1.localeObj.getConstant('qtr') : 'Qtr') + month.toString() + ' '
                                                    + (this_1.localeObj ? this_1.localeObj.getConstant('of') : 'of') + ' '
                                                    + date.getFullYear().toString()));
                                        }
                                        break;
                                    case 'Months':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_months';
                                            groupFields[newFieldName] = interval;
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                new Date(newDate.setMonth(date.getMonth(), 1)).toString());
                                        }
                                        break;
                                    case 'Days':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_days';
                                            groupFields[newFieldName] = interval;
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                new Date(newDate.setMonth(date.getMonth(), date.getDate())).toString());
                                        }
                                        break;
                                    case 'Hours':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_hours';
                                            groupFields[newFieldName] = interval;
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                new Date(newDate.setHours(date.getHours())).toString());
                                        }
                                        break;
                                    case 'Minutes':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_minutes';
                                            groupFields[newFieldName] = interval;
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                new Date(newDate.setMinutes(date.getMinutes())).toString());
                                        }
                                        break;
                                    case 'Seconds':
                                        {
                                            var newFieldName = (i_1 === group.groupInterval.length - 1) ? fieldName :
                                                fieldName + '_date_group_seconds';
                                            groupFields[newFieldName] = interval;
                                            this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                                (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                                    this_1.fields.length) : newFieldName;
                                            if (this_1.fields.indexOf(newFieldName) === -1) {
                                                this_1.fields.push(newFieldName);
                                            }
                                            item[this_1.fieldKeys[newFieldName]] = (isInRangeAvail ? undefined :
                                                new Date(newDate.setSeconds(date.getSeconds())).toString());
                                        }
                                        break;
                                }
                            }
                        }
                    }
                    else if (!isNaN(Number(item[this_1.fieldKeys[fieldName]])) && group.type === 'Number') {
                        var isInRangeAvail = this_1.getRange(group, Number(item[this_1.fieldKeys[fieldName]]));
                        item[this_1.fieldKeys[fieldName]] = isInRangeAvail ? undefined :
                            item[this_1.fieldKeys[fieldName]];
                    }
                    else if (item[this_1.fieldKeys[fieldName]] && group.type === 'Custom' &&
                        group.customGroups && group.customGroups.length > 0) {
                        var newFieldName = fieldName + '_custom_group';
                        var customGroups = group.customGroups;
                        var groupValue = void 0;
                        this_1.groupingFieldsInfo[fieldName] = fieldName;
                        this_1.groupingFieldsInfo[newFieldName] = fieldName;
                        for (var i_2 = 0, len_2 = customGroups.length; i_2 < len_2; i_2++) {
                            var cGroup = customGroups[i_2];
                            if (cGroup.items && cGroup.items.length > 1) {
                                customGroupFieldName = newFieldName;
                                this_1.fieldKeys[newFieldName] = this_1.dataSourceSettings.type === 'CSV' ?
                                    (this_1.fieldKeys[newFieldName] ? this_1.fieldKeys[newFieldName] :
                                        this_1.fields.length) : newFieldName;
                                if (this_1.fields.indexOf(newFieldName) === -1) {
                                    this_1.fields.push(newFieldName);
                                }
                                var isDataMatch = PivotUtil.inArray(item[this_1.fieldKeys[fieldName]].toString(), cGroup.items) === -1 ? false : true;
                                item[this_1.fieldKeys[newFieldName]] =
                                    (isDataMatch ? (cGroup.groupName && cGroup.groupName !== '') ? cGroup.groupName :
                                        this_1.localeObj.getConstant('group') + ' ' + i_2 : (groupValue &&
                                        groupValue !== item[this_1.fieldKeys[fieldName]].toString()) ?
                                        groupValue : item[this_1.fieldKeys[fieldName]].toString());
                                groupValue = item[this_1.fieldKeys[newFieldName]];
                            }
                        }
                    }
                    var keys = Object.keys(item);
                    var isCompleteSet = [];
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var key = keys_1[_i];
                        isCompleteSet.push((item[key]) ? true : false);
                    }
                    fieldkeySet =
                        (((isCompleteSet.indexOf(false) === -1) && keys.length === Object.keys(data[0]).length) ? item : fieldkeySet);
                    //this.fields = Object.keys(fieldkeySet);
                }
                if (group.type === 'Date') {
                    var isDataSource = false;
                    var axisFields = [this_1.dataSourceSettings.rows, this_1.dataSourceSettings.columns,
                        this_1.dataSourceSettings.values, this_1.dataSourceSettings.filters];
                    var groupKeys = Object.keys(groupFields);
                    var gCnt = Object.keys(groupKeys).length;
                    var groupField = void 0;
                    for (var _a = 0, axisFields_1 = axisFields; _a < axisFields_1.length; _a++) {
                        var axis = axisFields_1[_a];
                        if (!isDataSource && axis) {
                            var cnt = axis.length;
                            var i_3 = 0;
                            while (i_3 < cnt) {
                                if (axis[i_3].name === fieldName) {
                                    isDataSource = true;
                                    var actualField = axis[i_3];
                                    axis.splice(i_3, 1);
                                    var dataFields = this_1.dataSourceSettings.rows;
                                    dataFields = dataFields.concat(this_1.dataSourceSettings.columns, this_1.dataSourceSettings.values, this_1.dataSourceSettings.filters);
                                    while (gCnt--) {
                                        var caption_1 = actualField.caption ? actualField.caption : actualField.name;
                                        if (this_1.clonedReport) {
                                            var clonedFields = this_1.clonedReport.rows;
                                            clonedFields = clonedFields.concat(this_1.clonedReport.columns, this_1.clonedReport.values, this_1.clonedReport.filters);
                                            var cloneField = PivotUtil.getFieldByName(groupKeys[gCnt], clonedFields);
                                            if (cloneField) {
                                                caption_1 = cloneField.caption ? cloneField.caption : cloneField.name;
                                            }
                                        }
                                        if (!PivotUtil.getFieldByName(groupKeys[gCnt], dataFields)) {
                                            groupField = groupFields[groupKeys[gCnt]];
                                            caption_1 = (caption_1.indexOf(' (') !== -1 && caption_1.indexOf(')') !== -1) ?
                                                caption_1.slice(caption_1.indexOf('(') + 1, caption_1.length - 1) : caption_1;
                                            var newField = {
                                                name: groupKeys[gCnt],
                                                caption: (this_1.localeObj ? this_1.localeObj.getConstant(groupField) : groupField) + ' (' + caption_1 + ')',
                                                type: 'Count',
                                                showNoDataItems: actualField.showNoDataItems,
                                                baseField: actualField.baseField,
                                                baseItem: actualField.baseItem,
                                                showFilterIcon: actualField.showFilterIcon,
                                                showSortIcon: actualField.showSortIcon,
                                                showEditIcon: actualField.showEditIcon,
                                                showRemoveIcon: actualField.showRemoveIcon,
                                                showSubTotals: actualField.showValueTypeIcon,
                                                allowDragAndDrop: actualField.allowDragAndDrop,
                                                expandAll: actualField.expandAll,
                                                groupName: actualField.groupName
                                            };
                                            axis.splice(i_3, 0, newField);
                                            this_1.groupingFieldsInfo[newField.name] = fieldName;
                                        }
                                        else {
                                            this_1.groupingFieldsInfo[groupKeys[gCnt]] = fieldName;
                                        }
                                    }
                                    break;
                                }
                                else if (axis[i_3].name.indexOf(fieldName) > -1) {
                                    var axisField = groupFields[axis[i_3].name];
                                    var currentField = axis.filter(function (axisField) {
                                        return axisField.name === fieldName;
                                    })[0];
                                    if (!isNullOrUndefined(currentField)) {
                                        var currentFieldCaption = currentField.caption ?
                                            (currentField.caption.indexOf(' (') !== -1 && currentField.caption.indexOf(')') !== -1) ?
                                                currentField.caption.slice(currentField.caption.indexOf('(') + 1, currentField.caption.length - 1) : currentField.caption : fieldName;
                                        axis[i_3].caption = (this_1.localeObj ? this_1.localeObj.getConstant(axisField) : currentField)
                                            + ' (' + currentFieldCaption + ')';
                                    }
                                }
                                i_3++;
                            }
                            if (isDataSource) {
                                break;
                            }
                        }
                    }
                    gCnt = Object.keys(groupKeys).length;
                    var field = this_1.getMappingField(fieldName, this_1.clonedReport ? this_1.clonedReport.fieldMapping
                        : this_1.dataSourceSettings.fieldMapping);
                    var caption_2 = field.caption ? field.caption : fieldName;
                    while (gCnt--) {
                        groupField = groupFields[groupKeys[gCnt]];
                        for (var i_4 = 0, len_3 = this_1.dataSourceSettings.formatSettings.length; i_4 < len_3; i_4++) {
                            if (this_1.dataSourceSettings.formatSettings[i_4].name === groupKeys[gCnt]) {
                                this_1.dataSourceSettings.formatSettings.splice(i_4, 1);
                                break;
                            }
                        }
                        if (groupField !== 'Quarters' && groupField !== 'QuarterYear') {
                            var formatSettings = {
                                name: groupKeys[gCnt],
                                type: ['Years', 'Months', 'Days'].indexOf(groupField) > -1 ? 'date' : 'time',
                                format: ((groupField === 'Years') ? 'yyyy' : (groupField === 'Months') ? 'MMM' :
                                    (groupField === 'Days') ? 'd-MMM' : (groupField === 'Hours') ? 'hh a' :
                                        (groupField === 'Minutes') ? ':mm' : (groupField === 'Seconds') ? ':ss' : undefined)
                            };
                            this_1.dataSourceSettings.formatSettings.push(formatSettings);
                        }
                        if (!isDataSource) {
                            var mappingField = this_1.getMappingField(groupKeys[gCnt], this_1.dataSourceSettings.fieldMapping);
                            if (groupKeys[gCnt] !== fieldName && isNullOrUndefined(mappingField.name)) {
                                var newField = {
                                    name: groupKeys[gCnt],
                                    caption: (this_1.localeObj ? this_1.localeObj.getConstant(groupField) : groupField) + ' (' + caption_2 + ')'
                                };
                                this_1.dataSourceSettings.fieldMapping.push(newField);
                                this_1.groupingFieldsInfo[newField.name] = fieldName;
                            }
                            else if (groupKeys[gCnt] !== fieldName) {
                                mappingField.caption = (this_1.localeObj ? this_1.localeObj.getConstant(groupField) : groupField) + ' (' + caption_2 + ')';
                                this_1.groupingFieldsInfo[mappingField.name] = fieldName;
                            }
                        }
                    }
                    if (!isDataSource) {
                        var mappingField = this_1.getMappingField(fieldName, this_1.dataSourceSettings.fieldMapping);
                        groupField = groupFields[fieldName];
                        if (groupKeys[gCnt] !== fieldName && isNullOrUndefined(mappingField.name)) {
                            var newField = {
                                name: fieldName,
                                caption: (this_1.localeObj ? this_1.localeObj.getConstant(groupField) : groupField) + ' (' + caption_2 + ')'
                            };
                            this_1.dataSourceSettings.fieldMapping.push(newField);
                            this_1.groupingFieldsInfo[newField.name] = fieldName;
                        }
                        else {
                            mappingField.caption = (this_1.localeObj ? this_1.localeObj.getConstant(groupField) : groupField) + ' (' + caption_2 + ')';
                            this_1.groupingFieldsInfo[mappingField.name] = fieldName;
                        }
                    }
                }
                else if (group.type === 'Number' && group.rangeInterval) {
                    var cEndValue = void 0;
                    var framedSet = [];
                    var unframedSet = [];
                    var dataLength = data.length;
                    var cnt = 0;
                    this_1.groupingFields[fieldName] = fieldName;
                    var endingAt = void 0;
                    var groupName = [];
                    while (cnt < dataLength) {
                        var numericFieldName = Number(data[cnt][fieldName]);
                        unframedSet.push(numericFieldName);
                        if (!isNaN(numericFieldName) && framedSet.indexOf(numericFieldName) === -1) {
                            framedSet.push(numericFieldName);
                        }
                        cnt++;
                    }
                    dataLength = data.length;
                    cnt = 0;
                    while (cnt < dataLength) {
                        var currentData = data[cnt];
                        if (currentData && !isNaN(Number(currentData[fieldName]))) {
                            endingAt = typeof (group.endingAt) === 'string' ? parseInt(group.endingAt, 10) : group.endingAt;
                            cEndValue = endingAt ? endingAt : Math.max.apply(Math, framedSet);
                            var decimalCnt = !Number.isInteger(group.rangeInterval) ?
                                this_1.countDecimalPlaces(group.rangeInterval) : 0;
                            var range = void 0;
                            switch (decimalCnt) {
                                case 10:
                                    range = 0.0000000001;
                                    break;
                                case 9:
                                    range = 0.000000001;
                                    break;
                                case 8:
                                    range = 0.00000001;
                                    break;
                                case 7:
                                    range = 0.0000001;
                                    break;
                                case 6:
                                    range = 0.000001;
                                    break;
                                case 5:
                                    range = 0.00001;
                                    break;
                                case 4:
                                    range = 0.0001;
                                    break;
                                case 3:
                                    range = 0.001;
                                    break;
                                case 2:
                                    range = 0.01;
                                    break;
                                case 1:
                                    range = 0.1;
                                    break;
                                default:
                                    range = 1;
                            }
                            var currentStartValue = Number.isInteger(group.rangeInterval) ?
                                Math.floor(Number(currentData[fieldName])) :
                                Number(currentData[fieldName].toFixed(decimalCnt));
                            var currentEndValue = Number.isInteger(group.rangeInterval) ?
                                Math.floor(Number(currentStartValue + (group.rangeInterval - 1))) :
                                Number((currentStartValue + (group.rangeInterval)).toFixed(decimalCnt));
                            if (currentStartValue >= groupName[0] && currentStartValue <= groupName[groupName.length - 1]) {
                                var startValue = groupName[0];
                                var endValue = Number.isInteger(group.rangeInterval) ?
                                    Math.floor(groupName[groupName.length - 1]) :
                                    Number(groupName[groupName.length - 1].toFixed(decimalCnt));
                                this_1.processGrouping(currentData, fieldName, startValue, endValue, cEndValue, group.rangeInterval, decimalCnt);
                                if (isNullOrUndefined(this_1.groupedDataType[fieldName])) {
                                    this_1.groupedDataType[fieldName] = 'string';
                                }
                            }
                            else {
                                if (groupName.length === 0) {
                                    for (var i_5 = currentStartValue; i_5 <= currentEndValue; i_5 = Number((i_5 + range).toFixed(decimalCnt))) {
                                        groupName.push(i_5);
                                    }
                                    var startValue = groupName[0];
                                    var endValue = Number.isInteger(group.rangeInterval) ?
                                        Math.floor(groupName[groupName.length - 1]) :
                                        Number(groupName[groupName.length - 1].toFixed(decimalCnt));
                                    this_1.processGrouping(currentData, fieldName, startValue, endValue, cEndValue, group.rangeInterval, decimalCnt);
                                    if (isNullOrUndefined(this_1.groupedDataType[fieldName])) {
                                        this_1.groupedDataType[fieldName] = 'string';
                                    }
                                }
                                else {
                                    var startValue = Number.isInteger(group.rangeInterval) ?
                                        Math.floor(groupName[groupName.length - 1]) + 1 :
                                        Number((groupName[groupName.length - 1]).toFixed(decimalCnt));
                                    var endValue = Number.isInteger(group.rangeInterval) ?
                                        Math.floor(startValue + (group.rangeInterval - 1)) :
                                        Number((startValue + group.rangeInterval).toFixed(decimalCnt));
                                    var grouping = true;
                                    groupName.splice(0, groupName.length);
                                    while (grouping) {
                                        if (currentStartValue >= startValue && currentStartValue <= endValue) {
                                            this_1.processGrouping(currentData, fieldName, startValue, endValue, cEndValue, group.rangeInterval, decimalCnt);
                                            if (isNullOrUndefined(this_1.groupedDataType[fieldName])) {
                                                this_1.groupedDataType[fieldName] = 'string';
                                            }
                                            groupName.push(startValue);
                                            groupName.push(endValue);
                                            grouping = false;
                                        }
                                        startValue = Number.isInteger(group.rangeInterval) ? endValue + 1 : endValue;
                                        endValue =
                                            Number.isInteger(group.rangeInterval) ? Math.floor(startValue + (group.rangeInterval - 1)) :
                                                Number((startValue + (group.rangeInterval)).toFixed(decimalCnt));
                                    }
                                }
                            }
                            var keys = Object.keys(currentData);
                            var isCompleteSet = [];
                            for (var _b = 0, keys_2 = keys; _b < keys_2.length; _b++) {
                                var key = keys_2[_b];
                                isCompleteSet.push((currentData[key]) ? true : false);
                            }
                            fieldkeySet = (((isCompleteSet.indexOf(false) === -1) && keys.length === Object.keys(data[0]).length) ?
                                currentData : fieldkeySet);
                        }
                        cnt++;
                    }
                    var axisFields = [this_1.dataSourceSettings.rows, this_1.dataSourceSettings.columns,
                        this_1.dataSourceSettings.values, this_1.dataSourceSettings.filters];
                    for (var _c = 0, axisFields_2 = axisFields; _c < axisFields_2.length; _c++) {
                        var fields = axisFields_2[_c];
                        var field = PivotUtil.getFieldByName(fieldName, fields);
                        if (field) {
                            field = field.properties ? field.properties : field;
                            field.type = 'Count';
                        }
                    }
                    for (var i_6 = 0, len_4 = this_1.dataSourceSettings.formatSettings.length; i_6 < len_4; i_6++) {
                        if (this_1.dataSourceSettings.formatSettings[i_6].name === fieldName) {
                            this_1.dataSourceSettings.formatSettings.splice(i_6, 1);
                            break;
                        }
                    }
                }
                else if (group.type === 'Custom' && customGroupFieldName) {
                    var customFieldName = customGroupFieldName;
                    // this.groupingFields[customFieldName] = customFieldName;
                    var isDataSource = false;
                    var axisFields = [this_1.dataSourceSettings.rows, this_1.dataSourceSettings.columns,
                        this_1.dataSourceSettings.values, this_1.dataSourceSettings.filters];
                    var dataFields = this_1.dataSourceSettings.rows;
                    dataFields = dataFields.concat(this_1.dataSourceSettings.columns, this_1.dataSourceSettings.values, this_1.dataSourceSettings.filters);
                    var pattern = [];
                    if (!caption || caption === '') {
                        pattern = customFieldName.match(/_custom_group/g);
                    }
                    // let actualFieldName: string = fieldName.replace(/_custom_group/g, '');
                    var parentField = PivotUtil.getFieldByName(fieldName.replace(/_custom_group/g, ''), dataFields);
                    var customGroupField = PivotUtil.getFieldByName(customFieldName, dataFields);
                    for (var _d = 0, axisFields_3 = axisFields; _d < axisFields_3.length; _d++) {
                        var axis = axisFields_3[_d];
                        if (!isDataSource && axis) {
                            var cnt = axis.length;
                            var i_7 = 0;
                            while (i_7 < cnt) {
                                if (axis[i_7].name === group.name && !customGroupField) {
                                    isDataSource = true;
                                    var actualField = axis[i_7];
                                    var newField = {
                                        name: customFieldName,
                                        caption: (!caption || caption === '') ? (parentField.caption ? parentField.caption : parentField.name) + (pattern.length + 1) : caption,
                                        type: 'Count',
                                        showNoDataItems: actualField.showNoDataItems,
                                        baseField: actualField.baseField,
                                        baseItem: actualField.baseItem,
                                        showSubTotals: actualField.showValueTypeIcon,
                                        allowDragAndDrop: actualField.allowDragAndDrop,
                                        showFilterIcon: actualField.showFilterIcon,
                                        showSortIcon: actualField.showSortIcon,
                                        showRemoveIcon: actualField.showRemoveIcon,
                                        showEditIcon: actualField.showEditIcon,
                                        expandAll: actualField.expandAll,
                                        groupName: actualField.groupName
                                    };
                                    axis.splice(i_7, 0, newField);
                                    this_1.groupingFieldsInfo[newField.name] = fieldName;
                                    this_1.groupingFieldsInfo[fieldName] = fieldName;
                                    break;
                                }
                                else if (axis[i_7].name === customFieldName && customGroupField) {
                                    var newField = {
                                        name: customGroupField.name,
                                        caption: (!caption || caption === '') ? customGroupField.caption : caption,
                                        type: customGroupField.type,
                                        showNoDataItems: customGroupField.showNoDataItems,
                                        baseField: customGroupField.baseField,
                                        baseItem: customGroupField.baseItem,
                                        showRemoveIcon: customGroupField.showRemoveIcon,
                                        showSubTotals: customGroupField.showValueTypeIcon,
                                        allowDragAndDrop: customGroupField.allowDragAndDrop,
                                        showFilterIcon: customGroupField.showFilterIcon,
                                        showSortIcon: customGroupField.showSortIcon,
                                        showEditIcon: customGroupField.showEditIcon,
                                        expandAll: customGroupField.expandAll,
                                        groupName: customGroupField.groupName
                                    };
                                    axis.splice(i_7, 1, newField);
                                    this_1.groupingFieldsInfo[newField.name] = fieldName;
                                    this_1.groupingFieldsInfo[fieldName] = fieldName;
                                    break;
                                }
                                i_7++;
                            }
                            if (isDataSource) {
                                break;
                            }
                        }
                    }
                    var formatfield = PivotUtil.getFieldByName(fieldName, PivotUtil.cloneFormatSettings(this_1.dataSourceSettings.formatSettings));
                    if (formatfield) {
                        formatfield.name = customFieldName;
                        this_1.dataSourceSettings.formatSettings.push(formatfield);
                    }
                    this_1.groupingFields[fieldName] = fieldName;
                }
                this_1.groupingFields = extend(this_1.groupingFields, groupFields);
            }
            else {
                if (i < groupElements.length - 1) {
                    return "continue";
                }
                else {
                    return { value: fieldkeySet };
                }
            }
        };
        var this_1 = this;
        for (var i = 0, groupElements = this.dataSourceSettings.groupSettings; i < groupElements.length; i++) {
            var state_1 = _loop_1(i, groupElements);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        //this.fields = Object.keys(fieldkeySet);
        return fieldkeySet;
    };
    PivotEngine.prototype.countDecimalPlaces = function (num) {
        var decimalValue = num.toString();
        return decimalValue.includes('.') ? decimalValue.split('.')[1].length : 0;
    };
    PivotEngine.prototype.processGrouping = function (currentData, fieldName, startValue, endValue, cEndValue, rangeInterval, decimalCnt) {
        if ((Number.isInteger(currentData[fieldName])) || (!Number.isInteger(currentData[fieldName])
            && (Number(currentData[fieldName]) < endValue || cEndValue <= Number(currentData[fieldName])))) {
            currentData[fieldName] = this.getNumberGroupHeaders(startValue, endValue, cEndValue);
        }
        else if (!Number.isInteger(currentData[fieldName]) && Number(currentData[fieldName]) >= endValue) {
            currentData[fieldName] =
                this.getNumberGroupHeaders(Number((startValue + rangeInterval).toFixed(decimalCnt)), Number((endValue + rangeInterval).toFixed(decimalCnt)), cEndValue);
        }
    };
    PivotEngine.prototype.getNumberGroupHeaders = function (startValue, endValue, cEndValue) {
        var fieldName = (startValue === endValue) ? startValue.toString() : (cEndValue >= startValue && cEndValue <= endValue) ?
            (cEndValue === startValue) ? startValue.toString() : startValue.toString() + '-' + cEndValue.toString() :
            startValue.toString() + '-' + endValue.toString();
        return fieldName;
    };
    PivotEngine.prototype.getRange = function (group, cValue) {
        var isRangeAvail;
        if (group.type === 'Date') {
            var cDate = new Date(cValue);
            var startDate = typeof (group.startingAt) === 'string' ? new Date(group.startingAt) : group.startingAt;
            var endDate = typeof (group.endingAt) === 'string' ? new Date(group.endingAt) : group.endingAt;
            if (startDate && cDate.getTime() < startDate.getTime() ||
                endDate && cDate.getTime() > endDate.getTime()) {
                isRangeAvail = true;
            }
            else {
                isRangeAvail = false;
            }
        }
        else {
            var startValue = typeof (group.startingAt) === 'string' ? parseFloat(group.startingAt) : group.startingAt;
            var endValue = typeof (group.endingAt) === 'string' ? parseFloat(group.endingAt) : group.endingAt;
            if (!isNaN(startValue) && cValue < startValue || !isNaN(endValue) && cValue > endValue) {
                isRangeAvail = true;
            }
            else {
                isRangeAvail = false;
            }
        }
        return isRangeAvail;
    };
    PivotEngine.prototype.getPercentFormat = function (formatField, currentField) {
        var isHavingFormat = (!isNullOrUndefined(formatField[currentField]) &&
            !isNullOrUndefined(this.formatFields[currentField].format)) ?
            (this.formatFields[currentField].format).toLowerCase().match(/p[0-9]/) : undefined;
        return !isNullOrUndefined(isHavingFormat) ? (Number((this.formatFields[currentField].format).replace(/[^0-9]/g, ''))) : 2;
    };
    PivotEngine.prototype.getFormattedFields = function (dataSourceSettings) {
        this.formatFields = this.setFormattedFields(dataSourceSettings.formatSettings);
        // for (let len: number = 0, lnt: number = fields.length; len < lnt; len++) {
        // if (fields[len as number] && fields[len as number].name === this.dataSourceSettings.formatSettings[cnt as number].name) {
        //     this.formatFields[fields[len as number].name] = this.dataSourceSettings.formatSettings[cnt as number];
        // }
        // }
    };
    /**
     * It is used to update the format fields.
     *
     * @param {IFormatSettings[]} formatSettings -  It contains the format settings.
     * @returns {Object} - An object mapping keys to format settings.
     * @hidden
     */
    PivotEngine.prototype.setFormattedFields = function (formatSettings) {
        var cnt = formatSettings.length;
        var formatFields = {};
        while (cnt--) {
            formatFields[formatSettings[cnt].name] = formatSettings[cnt];
            if (formatSettings[cnt].type) {
                this.dateFormatFunction[formatSettings[cnt].name] = {
                    exactFormat: this.globalize.getDateFormat(formatSettings[cnt]),
                    fullFormat: this.globalize.getDateFormat({
                        format: 'yyyy/MM/dd/HH/mm/ss', type: formatSettings[cnt].type
                    })
                };
            }
        }
        return formatFields;
    };
    PivotEngine.prototype.getFieldList = function (fields, isSort, isValueFilteringEnabled) {
        var _this = this;
        var type;
        var lenE = this.dataSourceSettings.excludeFields.length - 1;
        while (lenE > -1) {
            var index = this.fields.indexOf(this.dataSourceSettings.excludeFields[lenE]);
            if (index !== -1) {
                this.fields.splice(index, 1);
            }
            if (this.fieldList) {
                delete this.fieldList[this.dataSourceSettings.excludeFields[lenE]];
            }
            lenE--;
        }
        var keys = this.fields;
        var dataFields = extend([], this.dataSourceSettings.rows, null, true);
        dataFields = dataFields.concat(this.dataSourceSettings.columns, this.dataSourceSettings.values, this.dataSourceSettings.filters);
        this.getFormattedFields(this.dataSourceSettings);
        this.getCalculatedField(keys);
        keys = this.fields;
        var len = keys.length;
        var dataTypes = ['string', 'number', 'datetime', 'date', 'boolean'];
        if (this.savedFieldList) {
            this.fieldList = this.savedFieldList;
            while (len--) { /** while is used for better performance than for */
                var key = keys[len];
                var field = this.getMappingField(key, this.dataSourceSettings.fieldMapping);
                if (this.fieldList[key]) {
                    this.fieldList[key].isSelected = false;
                    this.fieldList[key].index = len;
                    this.fieldList[key].filter = [];
                    this.fieldList[key].sort = isSort ? 'Ascending' : 'None';
                    this.fieldList[key].isExcelFilter = false;
                    this.fieldList[key].filterType = '';
                    this.fieldList[key].showFilterIcon = (field && 'showFilterIcon' in field) ?
                        field.showFilterIcon : true;
                    this.fieldList[key].showRemoveIcon = (field && 'showRemoveIcon' in field) ?
                        field.showRemoveIcon : true;
                    this.fieldList[key].showSortIcon = (field && 'showSortIcon' in field) ?
                        field.showSortIcon : true;
                    this.fieldList[key].showEditIcon = (field && 'showEditIcon' in field) ?
                        field.showEditIcon : true;
                    this.fieldList[key].showValueTypeIcon = (field && 'showValueTypeIcon' in field) ?
                        field.showValueTypeIcon : true;
                    this.fieldList[key].allowDragAndDrop = (field && 'allowDragAndDrop' in field) ?
                        field.allowDragAndDrop : true;
                    this.fieldList[key].isCalculatedField = (field && 'isCalculatedField' in field) ?
                        field.isCalculatedField : false;
                    this.fieldList[key].showNoDataItems = (field && 'showNoDataItems' in field) ?
                        field.showNoDataItems : false;
                    this.fieldList[key].showSubTotals = (field && 'showSubTotals' in field) ?
                        field.showSubTotals : true;
                    this.fieldList[key].expandAll = (field && 'expandAll' in field) ?
                        field.expandAll : false;
                    this.fieldList[key].pid = (field && 'groupName' in field && field.groupName) ? field.groupName :
                        this.groupingFieldsInfo[key] ? this.groupingFieldsInfo[key] : undefined;
                    if (this.isValueFiltersAvail && isValueFilteringEnabled) {
                        this.fieldList[key].dateMember = [];
                        this.fieldList[key].members = {};
                        this.fieldList[key].isMembersFilled = false;
                    }
                    this.updateMembersOrder(key);
                }
                else {
                    if (!isNullOrUndefined(this.groupedDataType[key])) {
                        type = this.groupedDataType[key];
                    }
                    else {
                        type = (field && 'dataType' in field && field.dataType && dataTypes.indexOf(field.dataType.toLowerCase()) > -1) ?
                            field.dataType.toLowerCase() : type;
                    }
                    this.fieldList[key] = {
                        caption: (field && 'caption' in field && field.caption) ? field.caption : key,
                        id: key,
                        type: ((key.indexOf('_custom_group') !== -1) || (key.indexOf('_date_group') !== -1)) ?
                            'string' : (type === undefined || type === 'undefined') ? 'number' : type,
                        isSelected: false,
                        sort: isSort ? 'Ascending' : 'None',
                        filterType: '',
                        index: len,
                        filter: [],
                        isCustomField: ((key.indexOf('_custom_group') !== -1) || (key.indexOf('_date_group') !== -1)),
                        showRemoveIcon: (field && 'showRemoveIcon' in field) ?
                            field.showRemoveIcon : true,
                        showFilterIcon: (field && 'showFilterIcon' in field) ?
                            field.showFilterIcon : true,
                        showSortIcon: (field && 'showSortIcon' in field) ?
                            field.showSortIcon : true,
                        showNoDataItems: (field && 'showNoDataItems' in field) ?
                            field.showNoDataItems : false,
                        isCalculatedField: (field && 'isCalculatedField' in field) ?
                            field.isCalculatedField : false,
                        showEditIcon: (field && 'showEditIcon' in field) ?
                            field.showEditIcon : true,
                        showValueTypeIcon: (field && 'showValueTypeIcon' in field) ?
                            field.showValueTypeIcon : true,
                        allowDragAndDrop: (field && 'allowDragAndDrop' in field) ?
                            field.allowDragAndDrop : true,
                        showSubTotals: (field && 'showSubTotals' in field) ?
                            field.showSubTotals : true,
                        expandAll: (field && 'expandAll' in field) ?
                            field.expandAll : false,
                        pid: (field && 'groupName' in field && field.groupName) ? field.groupName :
                            this.groupingFieldsInfo[key] ? this.groupingFieldsInfo[key] : undefined,
                        aggregateType: (field && 'type' in field) ? field.type :
                            (((key.indexOf('_custom_group') !== -1) || (key.indexOf('_date_group') !== -1)) ? 'string' :
                                (type === undefined || type === 'undefined') ? 'number' : type) === 'number' ? 'Sum' : 'Count',
                        baseField: (field && 'baseField' in field) ?
                            field.baseField : undefined,
                        baseItem: (field && 'baseItem' in field) ?
                            field.baseItem : undefined
                    };
                    this.updateMembersOrder(key);
                }
            }
        }
        else {
            this.fieldList = {};
            var _loop_2 = function () {
                var key = keys[len];
                var field = this_2.getMappingField(key, this_2.dataSourceSettings.fieldMapping);
                if (!isNullOrUndefined(this_2.groupedDataType[key])) {
                    type = this_2.groupedDataType[key];
                }
                else {
                    type = (field && 'dataType' in field && field.dataType && dataTypes.indexOf(field.dataType.toLowerCase()) > -1) ?
                        field.dataType.toLowerCase() : PivotUtil.getType(fields[this_2.fieldKeys[key]]);
                }
                if (type === undefined || type === 'undefined') {
                    if (this_2.dataSourceSettings.groupSettings.length > 0) {
                        this_2.dataSourceSettings.groupSettings.forEach(function (setting) {
                            if (_this.fieldKeys[key] === setting.name && setting.type.toLocaleLowerCase() === 'number') {
                                type = 'string';
                            }
                            else {
                                type = 'number';
                            }
                        });
                    }
                    else {
                        type = 'number';
                    }
                }
                this_2.fieldList[key] = {
                    id: key,
                    pid: (field && 'groupName' in field && field.groupName) ? field.groupName :
                        this_2.groupingFieldsInfo[key] ? this_2.groupingFieldsInfo[key] : undefined,
                    caption: (field && 'caption' in field && field.caption) ? field.caption : key,
                    type: ((key.indexOf('_custom_group') !== -1) || (key.indexOf('_date_group') !== -1)) ?
                        'string' : type,
                    filterType: '',
                    index: len,
                    filter: [],
                    sort: isSort ? 'Ascending' : 'None',
                    isSelected: false,
                    isCustomField: ((key.indexOf('_custom_group') !== -1) || (key.indexOf('_date_group') !== -1)),
                    showFilterIcon: (field && 'showFilterIcon' in field) ?
                        field.showFilterIcon : true,
                    showRemoveIcon: (field && 'showRemoveIcon' in field) ?
                        field.showRemoveIcon : true,
                    showSortIcon: (field && 'showSortIcon' in field) ?
                        field.showSortIcon : true,
                    showEditIcon: (field && 'showEditIcon' in field) ?
                        field.showEditIcon : true,
                    showValueTypeIcon: (field && 'showValueTypeIcon' in field) ?
                        field.showValueTypeIcon : true,
                    allowDragAndDrop: (field && 'allowDragAndDrop' in field) ?
                        field.allowDragAndDrop : true,
                    showSubTotals: (field && 'showSubTotals' in field) ?
                        field.showSubTotals : true,
                    showNoDataItems: (field && 'showNoDataItems' in field) ?
                        field.showNoDataItems : false,
                    isCalculatedField: (field && 'isCalculatedField' in field) ?
                        field.isCalculatedField : false,
                    expandAll: (field && 'expandAll' in field) ?
                        field.expandAll : false,
                    aggregateType: (field && 'type' in field) ? field.type :
                        (((key.indexOf('_custom_group') !== -1) || (key.indexOf('_date_group') !== -1)) ? 'string' :
                            (type === undefined || type === 'undefined') ? 'number' : type) === 'number' ? 'Sum' : 'Count',
                    baseField: (field && 'baseField' in field) ?
                        field.baseField : undefined,
                    baseItem: (field && 'baseItem' in field) ?
                        field.baseItem : undefined
                };
                this_2.updateMembersOrder(key);
            };
            var this_2 = this;
            while (len--) {
                _loop_2();
            }
        }
        this.groupedDataType = {};
        this.updateTreeViewData(dataFields);
    };
    PivotEngine.prototype.updateMembersOrder = function (key) {
        for (var _i = 0, _a = this.dataSourceSettings.sortSettings; _i < _a.length; _i++) {
            var sortInfo = _a[_i];
            if (key === sortInfo.name && sortInfo.membersOrder) {
                this.fieldList[key].membersOrder = sortInfo.membersOrder;
                break;
            }
        }
    };
    PivotEngine.prototype.getMappingField = function (key, fieldMapping) {
        var field = {};
        if (fieldMapping && fieldMapping.length > 0) {
            for (var index = 0, cnt = fieldMapping.length; index < cnt; index++) {
                if (fieldMapping[index].name === key) {
                    field = fieldMapping[index];
                    break;
                }
            }
        }
        return field;
    };
    PivotEngine.prototype.updateFieldList = function (savedFieldList) {
        var keys = this.fields;
        var len = keys.length;
        while (len--) { /** while is used for better performance than for */
            this.fieldList[keys[len]].isExcelFilter = savedFieldList[keys[len]].isExcelFilter;
        }
    };
    PivotEngine.prototype.updateTreeViewData = function (fields) {
        var _this = this;
        var cnt = fields.length;
        var lnt = this.dataSourceSettings.calculatedFieldSettings.length;
        while (cnt--) {
            if (this.fieldList[fields[cnt].name]) {
                var field = this.fieldList[fields[cnt].name];
                field.type = fields[cnt].dataType ? fields[cnt].dataType.toLowerCase() : field.type;
                field.caption = fields[cnt].caption ? fields[cnt].caption : fields[cnt].name;
                field.isSelected = true;
                field.showNoDataItems = fields[cnt].showNoDataItems;
                field.aggregateType = fields[cnt].type;
                field.baseField = fields[cnt].baseField;
                field.baseItem = fields[cnt].baseItem;
                field.allowDragAndDrop = fields[cnt].allowDragAndDrop;
                field.showFilterIcon = fields[cnt].showFilterIcon;
                field.showSortIcon = fields[cnt].showSortIcon;
                field.showRemoveIcon = fields[cnt].showRemoveIcon;
                field.showValueTypeIcon = fields[cnt].showValueTypeIcon;
                field.showEditIcon = fields[cnt].showEditIcon;
                field.showSubTotals = fields[cnt].showSubTotals;
                field.expandAll = fields[cnt].expandAll;
            }
        }
        while (lnt--) {
            if (this.fieldList[this.dataSourceSettings.calculatedFieldSettings[lnt].name]) {
                this.fieldList[this.dataSourceSettings.calculatedFieldSettings[lnt].name].aggregateType = 'CalculatedField';
                this.fieldList[this.dataSourceSettings.calculatedFieldSettings[lnt].name].isCalculatedField = true;
                this.fieldList[this.dataSourceSettings.calculatedFieldSettings[lnt].name].formula
                    = this.dataSourceSettings.calculatedFieldSettings[lnt].formula;
            }
        }
        var unBoundFields = this.dataSourceSettings.groupSettings.filter(function (groupSetting) {
            return !fields.some(function (field) { return groupSetting.name === field.name; });
        });
        var groupingTypes = [
            '_date_group_years',
            '_date_group_quarters',
            '_date_group_quarterYear',
            '_date_group_months',
            '_date_group_days',
            '_date_group_hours',
            '_date_group_minutes',
            '_date_group_seconds'
        ];
        unBoundFields.forEach(function (unBoundField) {
            var fieldName = unBoundField.name;
            var fieldType = unBoundField.type.toLowerCase();
            Object.keys(_this.fieldList).forEach(function (key) {
                if (fieldType === 'date' && !isNullOrUndefined(unBoundField.caption) &&
                    (groupingTypes.some(function (dateType) { return key === "" + fieldName + dateType; }) || key === fieldName)) {
                    _this.fieldList[key].caption =
                        _this.fieldList[key].caption.replace(unBoundField.name, unBoundField.caption);
                }
                else if (fieldType === 'custom' && !isNullOrUndefined(unBoundField.caption) && key === fieldName + "_custom_group") {
                    _this.fieldList[key].caption = unBoundField.caption;
                }
                else if (fieldType === 'number' && !isNullOrUndefined(unBoundField.caption) && key === fieldName) {
                    _this.fieldList[key].caption = unBoundField.caption;
                }
            });
        });
    };
    PivotEngine.prototype.getCalculatedField = function (keys) {
        for (var _i = 0, _a = this.dataSourceSettings.calculatedFieldSettings; _i < _a.length; _i++) {
            var field = _a[_i];
            this.calculatedFields[field.name] = extend({}, field, null, true);
            this.calculatedFields[field.name].actualFormula = field.formula;
        }
        var fieldKeys = Object.keys(this.calculatedFields);
        var _loop_3 = function (calc, cnt) {
            var field = this_3.calculatedFields[fieldKeys[calc]];
            var calcProperties = field.properties;
            var actualFormula = (calcProperties ? calcProperties.formula : field.formula).trim();
            var formula = actualFormula.replace(/"/g, '');
            field.formula = formula.indexOf('^') > -1 ? this_3.powerFunction(formula) : formula;
            if (field.formula.indexOf('Math.min(') === -1 && field.formula.indexOf('min(') > -1) {
                field.formula = field.formula.replace(/min\(/g, 'Math.min(');
            }
            if (field.formula.indexOf('Math.max(') === -1 && field.formula.indexOf('max(') > -1) {
                field.formula = field.formula.replace(/max\(/g, 'Math.max(');
            }
            if (field.formula.indexOf('Math.abs(') === -1 && field.formula.indexOf('abs(') > -1) {
                field.formula = field.formula.replace(/abs\(/g, 'Math.abs(');
            }
            field.name = calcProperties ? calcProperties.name : field.name;
            if (this_3.dataSourceSettings.type === 'CSV') {
                if (keys.indexOf(field.name) === -1) {
                    keys.push(field.name);
                }
            }
            else {
                keys = keys.filter(function (key) { return key !== field.name; });
                keys.push(field.name);
            }
            var formulaType = actualFormula.split('"');
            for (var len = 0, lmt = formulaType.length; len < lmt; len++) {
                var type = formulaType[len].trim();
                var aggregateValue = type.split(/[ .:;?!~,`"&|()<>{}[\]\r\n/\\]+/);
                var matchStrings = type.match(/^([^()]+)\((.*)\)$/);
                var selectedString = (aggregateValue[0] === 'DistinctCount' ?
                    'DistinctCount' : aggregateValue[0] === 'PopulationStDev' ?
                    'PopulationStDev' : aggregateValue[0] === 'SampleStDev' ? 'SampleStDev' : aggregateValue[0] === 'PopulationVar' ?
                    'PopulationVar' : aggregateValue[0] === 'SampleVar' ? 'SampleVar' : aggregateValue[0]);
                if (['Sum', 'Count', 'Min', 'Max', 'Avg', 'Product', 'DistinctCount',
                    'PopulationStDev', 'SampleStDev', 'PopulationVar', 'SampleVar', 'Median'].indexOf(selectedString) !== -1) {
                    var index = (keys.indexOf(aggregateValue[1]) === -1 && matchStrings[2]) ?
                        keys.indexOf(matchStrings[2]) : keys.indexOf(aggregateValue[1]);
                    if (!this_3.calculatedFormulas[field.name]) {
                        this_3.calculatedFormulas[field.name] = [{
                                index: index,
                                type: selectedString,
                                formula: type
                            }];
                    }
                    else {
                        this_3.calculatedFormulas[field.name].push({
                            index: index,
                            type: selectedString,
                            formula: type
                        });
                    }
                }
            }
        };
        var this_3 = this;
        for (var calc = 0, cnt = fieldKeys.length; calc < cnt; calc++) {
            _loop_3(calc, cnt);
        }
        this.fields = keys;
    };
    PivotEngine.prototype.validateFilters = function (data) {
        this.isValueFiltersAvail = false;
        var filterElements = data.filterSettings ? data.filterSettings : [];
        var dataFields = extend([], this.dataSourceSettings.rows, null, true);
        dataFields = dataFields.concat(this.dataSourceSettings.columns);
        for (var _i = 0, filterElements_1 = filterElements; _i < filterElements_1.length; _i++) {
            var filter = filterElements_1[_i];
            for (var _a = 0, dataFields_1 = dataFields; _a < dataFields_1.length; _a++) {
                var field = dataFields_1[_a];
                if (filter.name === field.name && filter.type === 'Value') {
                    this.isValueFiltersAvail = true;
                    break;
                }
            }
            if (this.isValueFiltersAvail) {
                break;
            }
        }
    };
    PivotEngine.prototype.validateValueFields = function () {
        this.isValueHasAdvancedAggregate = false;
        for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
            var value = _a[_i];
            if ((['DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentTotal', 'RunningTotals']).indexOf(value.type) !== -1) {
                this.isValueHasAdvancedAggregate = true;
                break;
            }
        }
    };
    /**
     * It is used to update the current field members.
     *
     * @param {string} fieldName -  Current field Name.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.fetchFieldMembers = function (fieldName) {
        var fieldPosition = this.fieldList[fieldName].index;
        this.generateMembers(fieldPosition, new Set());
    };
    PivotEngine.prototype.generateMembers = function (kl, formulaFields) {
        var dlen = this.data.length;
        var keys = this.fields;
        var fList = this.fieldList;
        var key = keys[kl];
        if (!fList[key].members || this.allowDataCompression) {
            fList[key].members = {};
            if (this.allowDataCompression) {
                fList[key].isMembersFilled = false;
            }
        }
        if (!fList[key].dateMember || this.allowDataCompression) {
            fList[key].dateMember = [];
        }
        var members = fList[key].members;
        var dateMember = fList[key].dateMember;
        if ((fList[key].isSelected || formulaFields.has(kl)) && !fList[key].isMembersFilled) {
            var isDataAvail = Object.keys(members).length > 0;
            var membersCnt = 0;
            var isFieldHasExpandAll = fList[key].expandAll;
            var isDateType = PivotUtil.isDateField(key, this);
            //let sort: string[] = [];
            for (var dl = 0; dl < dlen; dl++) {
                var memberkey = this.data[dl][this.fieldKeys[key]];
                var mkey = memberkey;
                mkey = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(mkey) : mkey;
                // if (!isNullOrUndefined(mkey)) {
                if (!isDataAvail) {
                    var formattedValue = isDateType ? this.getFormattedValue(mkey, key) : ({
                        formattedText: mkey === null ? (this.localeObj ? this.localeObj.getConstant('null') : String(mkey)) :
                            mkey === undefined ? (this.localeObj ? (key in this.groupingFields) ?
                                this.localeObj.getConstant('groupOutOfRange') : this.localeObj.getConstant('undefined') :
                                String(mkey)) : mkey.toString(), actualText: mkey === null ? (this.localeObj ?
                            this.localeObj.getConstant('null') : String(mkey)) : mkey === undefined ? (this.localeObj ?
                            (key in this.groupingFields) ? this.localeObj.getConstant('groupOutOfRange') :
                                this.localeObj.getConstant('undefined') : String(mkey)) : mkey
                    });
                    if (!Object.prototype.hasOwnProperty.call(members, mkey)) {
                        membersCnt++;
                        members[mkey] = {
                            index: [dl], ordinal: membersCnt,
                            isDrilled: this.isExpandAll || isFieldHasExpandAll,
                            caption: formattedValue.formattedText
                        };
                        dateMember.push({ formattedText: formattedValue.formattedText, actualText: isDateType ?
                                formattedValue.dateText : formattedValue.actualText });
                        //sort.push(mkey);
                    }
                    else {
                        members[mkey].index.push(dl);
                    }
                }
                var memberName = isNullOrUndefined(memberkey) ? memberkey : fList[key].type === 'number' ?
                    (!isNaN(Number(memberkey)) ? Number(memberkey) : undefined) : 1;
                var valueMatrixInfo = {
                    ordinal: members[mkey].ordinal,
                    member: memberName
                };
                if (!(this.valueMatrix[dl])) {
                    this.valueMatrix[dl] = [];
                }
                this.valueMatrix[dl][kl] = valueMatrixInfo;
                // }
            }
            fList[key].isMembersFilled = true;
        }
    };
    PivotEngine.prototype.fillFieldMembers = function () {
        var keys = this.fields;
        var fList = this.fieldList;
        var kLn = keys.length;
        if (this.data.length - this.valueMatrix.length < 0) {
            this.valueMatrix = this.valueMatrix.slice(0, this.data.length);
        }
        var formulaFields = new Set();
        if (this.calculatedFormulas && Object.keys(this.calculatedFormulas).length > 0) {
            for (var key in this.calculatedFormulas) {
                if (fList[key] && fList[key].isSelected) {
                    var calculatedFormulas = this.calculatedFormulas[key];
                    for (var i = 0; i < calculatedFormulas.length; i++) {
                        var values = calculatedFormulas[i];
                        formulaFields.add(values.index);
                    }
                }
            }
        }
        for (var kl = 0; kl < kLn; kl++) {
            this.generateMembers(kl, formulaFields);
            /*sort = Object.keys(members).sort();
            let sortedMembers: Members = {};
            for (let sln: number = 0, slt: number = sort.length; sln < slt; sln++) {
                sortedMembers[sort[sln]] = members[sort[sln]];
            }
            fList[key].members = sortedMembers; */
        }
    };
    PivotEngine.prototype.generateValueMatrix = function () {
        var keys = this.fields;
        var len = this.data.length;
        var keyLen = keys.length;
        var flList = this.fieldList;
        while (len--) {
            var tkln = keyLen;
            //if (isNullOrUndefined(vMat[len as number])) {
            //}
            while (tkln--) {
                var key = keys[tkln];
                var field = flList[key];
                if (field.isMembersFilled) {
                    var fieldValue = this.data[len][this.fieldKeys[key]];
                    this.valueMatrix[len][tkln].member =
                        isNullOrUndefined(fieldValue) ? fieldValue : (field.type === 'number' ?
                            (!isNaN(Number(fieldValue)) ? Number(fieldValue) : undefined) : 1);
                }
            }
        }
    };
    PivotEngine.prototype.updateSortSettings = function (sortSettings, isSort) {
        for (var sln = 0, slt = sortSettings ? sortSettings.length : 0; sln < slt && isSort; sln++) {
            if (this.fieldList[sortSettings[sln].name]) {
                this.fieldList[sortSettings[sln].name].sort = sortSettings[sln].order;
            }
        }
    };
    PivotEngine.prototype.updateFilterMembers = function (source) {
        var filterRw = this.filterMembers;
        var list = {};
        //let eList: {[key: string] : number} = {};
        var isInclude = this.getFilters(source, list);
        //this.getFilterExcludeList(source.rows, flist);
        //this.getFilterExcludeList(source.columns, flist);
        //this.getFilterExcludeList(source.filters, flist);
        // let filters: Iterator = isInclude ? iList : eList;
        var dln = this.valueMatrix.length;
        if (isInclude) {
            var keys = list.include.index;
            for (var ln = 0; ln < keys.length; ln++) {
                if (list.exclude === undefined || list.exclude.indexObject[keys[ln]] === undefined) {
                    filterRw.push(keys[ln]);
                }
            }
        }
        else {
            for (var ln = 0; ln < dln; ln++) {
                if (list.exclude === undefined || list.exclude.indexObject[ln] === undefined) {
                    filterRw.push(ln);
                }
            }
        }
    };
    PivotEngine.prototype.getFilters = function (source, ilist) {
        var filterElements = source.filterSettings ? source.filterSettings : [];
        var isInclude = false;
        var filter = [];
        for (var rln = 0, rlt = filterElements.length; rln < rlt; rln++) {
            var filterElement = filterElements[rln].properties ?
                filterElements[rln].properties : filterElements[rln];
            if (this.fieldList[filterElement.name] &&
                this.fieldList[filterElement.name].isSelected &&
                this.isValidFilterField(filterElement, source.allowMemberFilter, source.allowLabelFilter)) {
                this.applyLabelFilter(filterElement);
                if (filterElement) {
                    filter = filterElement.items;
                }
                if (filterElement.type && filterElement.type === 'Include') {
                    this.frameFilterList(filter, filterElement.name, ilist, 'include', filterElement.showLabelFilter, isInclude);
                    isInclude = true;
                }
                else {
                    this.frameFilterList(filter, filterElement.name, ilist, 'exclude', filterElement.showLabelFilter);
                }
                if (filterElement.showLabelFilter) {
                    filterElement.items = [];
                    filterElement.type = filterElement.showDateFilter ? 'Date' : filterElement.showNumberFilter ? 'Number' : 'Label';
                }
            }
        }
        /* for (let cln: number = 0, clt: number = cols.length; cln < clt; cln ++) {
             filter = cols[cln as number].filter ? cols[cln as number].filter.items : [];
             if (filter.length && cols[cln as number].filter.type && cols[cln as number].filter.type === 'include') {
                 //type = cols[cln as number].filter.type;
                 this.frameFilterList(filter, cols[cln as number].name, ilist, 'include', isInclude);
                 isInclude = true;
             } else {
                 this.frameFilterList(filter, cols[cln as number].name, ilist, 'exclude');
             }
         }
         for (let vln: number = 0, vlt: number = filters.length; vln < vlt; vln ++) {
             filter = filters[vln].filter ? filters[vln].filter.items : [];
             if (filter.length && filters[vln].filter.type && filters[vln].filter.type === 'include') {
                 this.frameFilterList(filter, filters[vln].name, ilist, 'include', isInclude);
                 isInclude = true;
             } else {
                 this.frameFilterList(filter, filters[vln].name, ilist, 'exclude');
             }
         } */
        return isInclude;
    };
    PivotEngine.prototype.isValidFilterField = function (filterElement, allowMemberFiltering, allowLabelFiltering) {
        var fieldName = filterElement.name;
        var isValidFilterElement = false;
        var filterTypes = ['Include', 'Exclude'];
        var dataFields = extend([], this.dataSourceSettings.rows, null, true);
        dataFields = dataFields.concat(this.dataSourceSettings.columns);
        if (this.fieldList[fieldName].isSelected && allowMemberFiltering && filterTypes.indexOf(filterElement.type) >= 0) {
            isValidFilterElement = true;
            for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                var field = _a[_i];
                if (fieldName === field.name) {
                    isValidFilterElement = false;
                    break;
                }
            }
        }
        else if (allowLabelFiltering) {
            for (var _b = 0, dataFields_2 = dataFields; _b < dataFields_2.length; _b++) {
                var field = dataFields_2[_b];
                if (fieldName === field.name &&
                    (['Label', 'Date', 'Number'].indexOf(filterElement.type) >= 0)) {
                    isValidFilterElement = true;
                    break;
                }
            }
        }
        return isValidFilterElement;
    };
    PivotEngine.prototype.applyLabelFilter = function (filterElement) {
        if (['Label', 'Date', 'Number'].indexOf(filterElement.type) >= 0) {
            var members = Object.keys(this.fieldList[filterElement.name].members);
            filterElement.showLabelFilter = true;
            if (filterElement.type === 'Label') {
                filterElement.items = this.getLabelFilterMembers(members, filterElement.condition, filterElement.value1, filterElement.value2);
            }
            else if (filterElement.type === 'Date') {
                filterElement.showDateFilter = true;
                var date1 = typeof (filterElement.value1) === 'string' ?
                    new Date(filterElement.value1) : filterElement.value1;
                var date2 = typeof (filterElement.value2) === 'string' ?
                    new Date(filterElement.value2) : filterElement.value2;
                filterElement.items = this.getDateFilterMembers(members, filterElement.name, filterElement.condition, date1, date2);
            }
            else {
                filterElement.showNumberFilter = true;
                filterElement.items = [];
                for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                    var member = members_1[_i];
                    var operand1 = this.getParsedValue(filterElement.name, filterElement.value1);
                    var operand2 = this.getParsedValue(filterElement.name, filterElement.value2);
                    var cValue = this.getParsedValue(filterElement.name, member);
                    if (this.validateFilterValue(cValue, filterElement.condition, operand1, operand2)) {
                        filterElement.items.push(member);
                    }
                }
            }
            var excludeOperators = ['DoesNotBeginWith', 'DoesNotContains', 'DoesNotEndsWith', 'DoesNotEquals', 'NotBetween'];
            filterElement.type = (filterElement.condition ? (excludeOperators.indexOf(filterElement.condition) > -1 &&
                !filterElement.showNumberFilter) ? 'Exclude' : 'Include' : 'Exclude');
        }
        else {
            filterElement.showLabelFilter = false;
        }
    };
    PivotEngine.prototype.getLabelFilterMembers = function (members, operator, value1, value2) {
        var items = [];
        for (var _i = 0, members_2 = members; _i < members_2.length; _i++) {
            var member = members_2[_i];
            var filterValue = member.toLowerCase();
            if (value1.toString()) {
                switch (operator) {
                    case 'Equals':
                    case 'DoesNotEquals':
                        if (filterValue === value1.toLowerCase()) {
                            items.push(member);
                        }
                        break;
                    case 'BeginWith':
                    case 'DoesNotBeginWith':
                        if (filterValue.indexOf(value1.toLowerCase()) === 0) {
                            items.push(member);
                        }
                        break;
                    case 'EndsWith':
                    case 'DoesNotEndsWith':
                        if (filterValue.match(value1.toLowerCase() + '$') !== null) {
                            items.push(member);
                        }
                        break;
                    case 'Contains':
                    case 'DoesNotContains':
                        if (filterValue.indexOf(value1.toLowerCase()) > -1) {
                            items.push(member);
                        }
                        break;
                    case 'GreaterThan':
                        if (filterValue > value1.toLowerCase()) {
                            items.push(member);
                        }
                        break;
                    case 'GreaterThanOrEqualTo':
                        if (filterValue >= value1.toLowerCase()) {
                            items.push(member);
                        }
                        break;
                    case 'LessThan':
                        if (filterValue < value1.toLowerCase()) {
                            items.push(member);
                        }
                        break;
                    case 'LessThanOrEqualTo':
                        if (filterValue <= value1.toLowerCase()) {
                            items.push(member);
                        }
                        break;
                    case 'Between':
                    case 'NotBetween':
                        if ((filterValue >= value1.toLowerCase()) && (filterValue <= value2.toLowerCase())) {
                            items.push(member);
                        }
                        break;
                    default:
                        if (filterValue === value1.toLowerCase()) {
                            items.push(member);
                        }
                        break;
                }
            }
        }
        return items;
    };
    PivotEngine.prototype.getDateFilterMembers = function (members, name, operator, value1, value2) {
        var items = [];
        for (var _i = 0, members_3 = members; _i < members_3.length; _i++) {
            var member = members_3[_i];
            var filterValue = new Date(member);
            if (value1) {
                switch (operator) {
                    case 'Equals':
                    case 'DoesNotEquals':
                        if (this.getFormattedValue(filterValue.toString(), name).formattedText === this.getFormattedValue(value1.toString(), name).formattedText) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                    case 'After':
                        if (filterValue.getTime() > value1.getTime()) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                    case 'AfterOrEqualTo':
                        if (filterValue.getTime() >= value1.getTime()) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                    case 'Before':
                        if (filterValue.getTime() < value1.getTime()) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                    case 'BeforeOrEqualTo':
                        if (filterValue.getTime() <= value1.getTime()) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                    case 'Between':
                    case 'NotBetween':
                        if ((filterValue.getTime() >= value1.getTime()) &&
                            (filterValue.getTime() <= value2.getTime())) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                    default:
                        if (this.getFormattedValue(filterValue.toString(), name).formattedText === this.getFormattedValue(value1.toString(), name).formattedText) {
                            items.push(this.getFormattedValue(member, name).formattedText);
                        }
                        break;
                }
            }
        }
        return items;
    };
    PivotEngine.prototype.validateFilterValue = function (val, operator, value1, value2) {
        var isMemberInclude = false;
        if (typeof (value1) === 'number') {
            switch (operator) {
                case 'Equals':
                    if (val === value1) {
                        isMemberInclude = true;
                    }
                    break;
                case 'DoesNotEquals':
                    if (val !== value1) {
                        isMemberInclude = true;
                    }
                    break;
                case 'GreaterThan':
                    if (val > value1) {
                        isMemberInclude = true;
                    }
                    break;
                case 'GreaterThanOrEqualTo':
                    if (val >= value1) {
                        isMemberInclude = true;
                    }
                    break;
                case 'LessThan':
                    if (val < value1) {
                        isMemberInclude = true;
                    }
                    break;
                case 'LessThanOrEqualTo':
                    if (val <= value1) {
                        isMemberInclude = true;
                    }
                    break;
                case 'Between':
                    if ((val >= value1) && (val <= value2)) {
                        isMemberInclude = true;
                    }
                    break;
                case 'NotBetween':
                    if (!((val >= value1) && (val <= value2))) {
                        isMemberInclude = true;
                    }
                    break;
                default:
                    if (val !== value1) {
                        isMemberInclude = true;
                    }
                    break;
            }
        }
        return isMemberInclude;
    };
    PivotEngine.prototype.frameFilterList = function (filter, name, list, type, isLabelFilter, isInclude) {
        if (!list[type]) {
            list[type] = { indexObject: {}, index: [] };
            this.updateFilter(filter, name, list, type, isLabelFilter, isInclude);
        }
        else {
            this.updateFilter(filter, name, list, type, isLabelFilter, isInclude);
        }
    };
    PivotEngine.prototype.updateFilter = function (filter, name, list, type, isLabelFilter, isInclude) {
        var fln = 0;
        var field = this.fieldList[name];
        field.filter = filter;
        field.filterType = type;
        field.isExcelFilter = isLabelFilter;
        var members = PivotUtil.getFormattedMembers(field.members, name, this);
        var allowFil = isInclude;
        var final = {};
        var filterObj = {};
        final[type] = { indexObject: {}, index: [] };
        this.fieldFilterMem[name] = { memberObj: {} };
        while (!isNullOrUndefined(filter[fln])) {
            if (members[filter[fln]]) {
                var indx = members[filter[fln]].index;
                if (type === 'include') {
                    for (var iln = 0, ilt = indx.length; iln < ilt; iln++) {
                        if (!allowFil || list[type].indexObject[indx[iln]] !== undefined) {
                            final[type].indexObject[indx[iln]] = indx[iln];
                            final[type].index.push(indx[iln]);
                        }
                    }
                }
                else {
                    for (var iln = 0, ilt = indx.length; iln < ilt; iln++) {
                        if (list[type].indexObject[indx[iln]] === undefined) {
                            list[type].indexObject[indx[iln]] = indx[iln];
                            list[type].index.push(indx[iln]);
                        }
                    }
                    this.fieldFilterMem[name].memberObj[filter[fln]] = filter[fln];
                }
            }
            fln++;
        }
        if (type === 'include') {
            list[type] = final[type];
            for (var iln = 0; iln < filter.length; iln++) {
                if (members[filter[iln]]) {
                    filterObj[filter[iln]] = filter[iln];
                }
            }
            var items = Object.keys(members);
            for (var iln = 0, ilt = items.length; iln < ilt; iln++) {
                if (filterObj[items[iln]] === undefined) {
                    this.fieldFilterMem[name].memberObj[items[iln]] = items[iln];
                }
            }
        }
    };
    PivotEngine.prototype.applyValueFiltering = function (rowData, level, rows, columns, valueFilter, rowFilterData, type) {
        this.isValueFiltered = false;
        var allMember = extend({}, (type === 'row' && this.rowGrandTotal ? this.rowGrandTotal : type === 'column' && this.columnGrandTotal ? this.columnGrandTotal : (!(this.dataSourceSettings.grandTotalsPosition === 'Top') ? rows[rows.length - 1] : rows[0])), null, true);
        this.getFilteredData(rows, columns, valueFilter, rowFilterData, level, rowData.name, allMember, type);
        if (this.isValueFiltered) {
            if ((type === 'row' && this.rowGrandTotal === null) || (type === 'column' && this.columnGrandTotal === null)) {
                rowFilterData.push(allMember);
            }
            rows = rowFilterData;
        }
        return rows;
    };
    PivotEngine.prototype.getFilteredData = function (rows, columns, filterSettings, rowFilterData, level, fieldName, allMember, type) {
        var rLen = rows.length;
        for (var i = 0; i < rLen; i++) {
            if (filterSettings[fieldName]) {
                if (rows[i].level === level) {
                    this.isValueFiltered = true;
                    this.fieldList[fieldName].isExcelFilter = true;
                    var value = 0;
                    var measure = filterSettings[fieldName].measure;
                    var mPos = this.fieldList[measure].index;
                    var aggregate = this.fieldList[measure].aggregateType;
                    this.rawIndexObject = {};
                    value = (type === 'row' ? this.getAggregateValue(rows[i].index, columns.indexObject, mPos, aggregate, false) :
                        this.getAggregateValue(columns.index, rows[i].indexObject, mPos, aggregate, false));
                    var cellDetails = {
                        fieldName: measure,
                        row: rows[i],
                        column: columns,
                        value: value,
                        cellSets: this.getValueCellInfo ? this.getCellSet(this.rawIndexObject) : [],
                        rowCellType: (rows[i].hasChild && rows[i].isDrilled ? 'subTotal' : rows[i].type === 'grand sum' ? 'grandTotal' : 'value'),
                        columnCellType: (columns.hasChild && columns.isDrilled ? 'subTotal' : columns.type === 'grand sum' ? 'grandTotal' : 'value'),
                        aggregateType: aggregate,
                        skipFormatting: false
                    };
                    if (this.getValueCellInfo) {
                        this.getValueCellInfo(cellDetails);
                    }
                    value = cellDetails.value;
                    this.rawIndexObject = {};
                    var operand1 = this.getParsedValue(measure, filterSettings[fieldName].value1);
                    var operand2 = this.getParsedValue(measure, filterSettings[fieldName].value2);
                    if (!this.validateFilterValue(value, filterSettings[fieldName].condition, operand1, operand2) && rows[i].type !== 'grand sum') {
                        var data = this.removefilteredData(rows[i], this.valueFilteredData);
                        var row = data ? data : rows[i];
                        this.validateFilteredParentData(row, this.valueFilteredData, allMember, 0, level, type);
                    }
                    else if (rows[i].type !== 'grand sum') {
                        rowFilterData.push(extend({}, rows[i], null, true));
                        rowFilterData[rowFilterData.length - 1].isLevelFiltered = true;
                    }
                }
                else if (rows[i].hasChild && rows[i].members.length > 0 && rows[i].type !== 'grand sum') {
                    rowFilterData.push(extend({}, rows[i], null, true));
                    rowFilterData[rowFilterData.length - 1].members = [];
                    rowFilterData[rowFilterData.length - 1].isLevelFiltered = true;
                    this.getFilteredData(rows[i].members, columns, filterSettings, rowFilterData[rowFilterData.length - 1].members, level, fieldName, allMember, type);
                }
            }
        }
    };
    PivotEngine.prototype.getParsedValue = function (measure, value) {
        var cValue = value ? value.toString() : '';
        if (this.formatFields[measure] && value) {
            var formatSetting = extend({}, this.formatFields[measure], null, true);
            delete formatSetting.name;
            return this.globalize.parseNumber(cValue, formatSetting);
        }
        else {
            return this.globalize.parseNumber(cValue, { format: 'N' });
        }
    };
    PivotEngine.prototype.removefilteredData = function (row, rowFilterData) {
        var rows = extend([], rowFilterData, null, true);
        var filteredData;
        for (var i = 0; i < rows.length; i++) {
            if (row.isLevelFiltered && row.axis === rows[i].axis &&
                row.valueSort.levelName === rows[i].valueSort.levelName &&
                row.actualText === rows[i].actualText && row.axis === rows[i].axis &&
                row.level === rows[i].level && row.ordinal === rows[i].ordinal) {
                filteredData = rows[i];
                rowFilterData.splice(i, 1);
                break;
            }
            else if (rowFilterData[i].hasChild && rowFilterData[i].members.length > 0) {
                this.removefilteredData(row, rowFilterData[i].members);
            }
        }
        return filteredData;
    };
    PivotEngine.prototype.validateFilteredParentData = function (row, rows, allMemberData, i, level, type) {
        if (rows.length > 0) {
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var rowFilteredData = rows_1[_i];
                if (rowFilteredData.level === i) {
                    if (type === 'row') {
                        var index = row.index;
                        for (var _a = 0, index_1 = index; _a < index_1.length; _a++) {
                            var key = index_1[_a];
                            if (allMemberData.index.indexOf(key) >= 0) {
                                allMemberData.index.splice(allMemberData.index.indexOf(key), 1);
                            }
                            if (((row.valueSort.levelName.toString()).indexOf(rowFilteredData.valueSort.levelName.toString()) >= 0) &&
                                rowFilteredData.level !== level && rowFilteredData.index.indexOf(key) >= 0) {
                                rowFilteredData.index.splice(rowFilteredData.index.indexOf(key), 1);
                            }
                        }
                    }
                    else {
                        var index = row.indexObject;
                        for (var _b = 0, _c = Object.keys(index); _b < _c.length; _b++) {
                            var key = _c[_b];
                            if (Object.prototype.hasOwnProperty.call(index, key)) {
                                delete allMemberData.indexObject[key];
                                if (((row.valueSort.levelName.toString()).indexOf(rowFilteredData.valueSort.levelName.toString()) >= 0) &&
                                    rowFilteredData.level !== level) {
                                    delete rowFilteredData.indexObject[key];
                                }
                            }
                        }
                    }
                    if (rowFilteredData && rowFilteredData.members.length > 0 &&
                        rowFilteredData.members[0].level === i + 1 && rowFilteredData.members[0].level !== level) {
                        this.validateFilteredParentData(row, rowFilteredData.members, allMemberData, i + 1, level, type);
                    }
                }
            }
        }
        else {
            if (type === 'row') {
                var index = row.index;
                for (var _d = 0, index_2 = index; _d < index_2.length; _d++) {
                    var key = index_2[_d];
                    if (allMemberData.index.indexOf(key) >= 0) {
                        allMemberData.index.splice(allMemberData.index.indexOf(key), 1);
                    }
                }
            }
            else {
                var index = row.indexObject;
                for (var _e = 0, _f = Object.keys(index); _e < _f.length; _e++) {
                    var key = _f[_e];
                    if (Object.prototype.hasOwnProperty.call(index, key)) {
                        delete allMemberData.indexObject[key];
                    }
                }
            }
        }
    };
    PivotEngine.prototype.updateFramedHeaders = function (framedHeaders, dataHeaders, filteredHeaders, headers, type) {
        for (var _i = 0, framedHeaders_1 = framedHeaders; _i < framedHeaders_1.length; _i++) {
            var dHeader = framedHeaders_1[_i];
            this.isHeaderAvail = false;
            if (this.validateFilteredHeaders(dHeader, filteredHeaders, type) || dHeader.type === 'grand sum') {
                if (type === 'row') {
                    this.rowCount += this.rowValuesLength;
                }
                else {
                    this.columnCount += this.customProperties.isTabularLayout ? (this.rowMaxLevel + this.colValuesLength) :
                        this.colValuesLength;
                }
                headers.push(extend({}, dHeader, null, true));
                headers[headers.length - 1].members = [];
                if (dHeader.hasChild && dHeader.isDrilled && dHeader.members.length > 0) {
                    this.updateFramedHeaders(dHeader.members, dataHeaders, filteredHeaders, headers[headers.length - 1].members, type);
                }
            }
        }
        return this.filterFramedHeaders;
    };
    PivotEngine.prototype.validateFilteredHeaders = function (dHeader, filteredHeaders, type) {
        for (var _i = 0, filteredHeaders_1 = filteredHeaders; _i < filteredHeaders_1.length; _i++) {
            var vHeader = filteredHeaders_1[_i];
            if (!this.isHeaderAvail) {
                if (dHeader.actualText === vHeader.actualText &&
                    dHeader.level === vHeader.level &&
                    dHeader.valueSort.levelName === vHeader.valueSort.levelName) {
                    if (type === 'row') {
                        if (vHeader.index.length > 0) {
                            this.isHeaderAvail = true;
                            dHeader.index = vHeader.index;
                            return true;
                        }
                        else {
                            this.isHeaderAvail = false;
                            dHeader.index = vHeader.index;
                            return false;
                        }
                    }
                    else {
                        if (Object.keys(vHeader.indexObject).length > 0) {
                            this.isHeaderAvail = true;
                            dHeader.indexObject = vHeader.indexObject;
                            return true;
                        }
                        else {
                            this.isHeaderAvail = false;
                            dHeader.indexObject = vHeader.indexObject;
                            return false;
                        }
                    }
                }
                else if (vHeader.hasChild && vHeader.members.length > 0 && vHeader.type !== 'grand sum') {
                    this.validateFilteredHeaders(dHeader, vHeader.members, type);
                }
            }
        }
        return this.isHeaderAvail;
    };
    PivotEngine.prototype.isEmptyDataAvail = function (rowHeaders, columnHeaders) {
        this.isEmptyData = false;
        if (rowHeaders.length > 0 && rowHeaders[rowHeaders.length - 1].type === 'grand sum' &&
            rowHeaders[rowHeaders.length - 1].index.length === 0) {
            this.isEmptyData = true;
        }
        if (columnHeaders.length > 0 && columnHeaders[columnHeaders.length - 1].type === 'grand sum' &&
            Object.keys(columnHeaders[columnHeaders.length - 1].indexObject).length === 0) {
            this.isEmptyData = true;
        }
        if (rowHeaders.length === 0 || columnHeaders.length === 0) {
            this.isEmptyData = true;
        }
    };
    /**
     * It is used to update the grid data.
     *
     * @param {IDataOptions} dataSource -  It contains the dataSourceSettings.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.updateGridData = function (dataSource) {
        this.updateDataSourceSettings(dataSource, true);
        this.data = dataSource.dataSource;
        if (this.allowDataCompression) {
            this.actualData = this.data;
            this.data = this.getGroupedRawData(dataSource);
        }
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            this.fieldList[field].members = {};
            this.fieldList[field].dateMember = [];
            this.fieldList[field].isMembersFilled = false;
        }
        this.fillFieldMembers();
        this.filterMembers = [];
        this.cMembers = [];
        this.rMembers = [];
        this.updateFilterMembers(dataSource);
        this.isEditing = true;
        this.isDrillThrough = true;
        this.generateGridData(dataSource);
        this.isEditing = false;
    };
    PivotEngine.prototype.generateGridData = function (dataSource, requireDatasourceUpdate, isExport, headerCollection) {
        if (requireDatasourceUpdate === void 0) { requireDatasourceUpdate = false; }
        if (isNullOrUndefined(headerCollection) && this.customProperties.isTabularLayout) {
            this.rowMaxLevel = 0;
        }
        this.updateDataSourceSettings(dataSource, requireDatasourceUpdate);
        var columns = dataSource.columns ? dataSource.columns : [];
        var data = this.data;
        var rows = dataSource.rows ? dataSource.rows : [];
        var filterSettings = dataSource.filterSettings;
        var values = dataSource.values ? dataSource.values : [];
        this.removeCount = 0;
        this.isExpandAll = dataSource.expandAll;
        this.drilledMembers = dataSource.drilledMembers ? dataSource.drilledMembers : [];
        this.isEmptyData = false;
        var filterMembers = [];
        var showNoDataItems = (rows[0] && rows[0].showNoDataItems) || (columns[0] && columns[0].showNoDataItems);
        // let dataFields: IFieldOptions[] = extend([], this.dataSourceSettings.rows, null, true) as IFieldOptions[];
        // dataFields = dataFields.concat(this.dataSourceSettings.columns, this.dataSourceSettings.values, this.dataSourceSettings.filters);
        if (showNoDataItems) {
            for (var ln = 0; ln < this.valueMatrix.length; ln++) {
                filterMembers.push(ln);
            }
        }
        for (var ln = 0; ln < this.filterMembers.length; ln++) {
            this.filterPosObj[this.filterMembers[ln]] = this.filterMembers[ln];
        }
        //let childrens: Field = this.fieldList[rows[0].name + ''];
        this.valueSortSettings.columnIndex = undefined;
        this.validateValueFields();
        this.frameDrillObject();
        if (!this.isValueFilterEnabled || this.isEditing) {
            if (!headerCollection) {
                this.isLastHeaderHasMeasures = true;
                this.columnCount = 0;
                this.rowCount = 0;
                this.cMembers = [];
                this.rMembers = [];
                if (rows.length !== 0 && values.length !== 0) {
                    this.rMembers = this.getIndexedHeaders(rows, data, this.customProperties.isTabularLayout ? this.rowMaxLevel : 0, rows[0].showNoDataItems ? filterMembers :
                        this.filterMembers, 'row', '', this.allowValueFilter);
                }
                if (columns.length !== 0 && values.length !== 0) {
                    this.cMembers = this.getIndexedHeaders(columns, data, 0, columns[0].showNoDataItems ? filterMembers : this.filterMembers, 'column', '', this.allowValueFilter);
                }
                this.insertAllMembersCommon();
                this.saveDataHeaders = (this.isValueFiltersAvail && dataSource.allowValueFilter) ? {
                    rowHeaders: extend([], this.rMembers, null, true),
                    columnHeaders: extend([], this.cMembers, null, true)
                } : {};
            }
        }
        if (this.customProperties.isTabularLayout) {
            this.showSubTotalsAtBottom = true;
        }
        this.pivotValues = [];
        this.headerContent = [];
        this.valueContent = [];
        this.valueFilteredData = [];
        this.filterFramedHeaders = [];
        var rowheads = [];
        var colheads = [];
        var rowFilteredData = [];
        var columnFilteredData = [];
        var updatedRowMembers = [];
        var valuesCount = (this.dataSourceSettings.values.length);
        if (this.isValueFiltersAvail && dataSource.allowValueFilter && !headerCollection) {
            this.valueFilteredData = [];
            var rowHeaders = this.saveDataHeaders.rowHeaders ? this.saveDataHeaders.rowHeaders : [];
            var columnHeaders = this.saveDataHeaders.columnHeaders ? this.saveDataHeaders.columnHeaders : [];
            if (filterSettings.length > 0) {
                var valueFilters = {};
                var valueFields = {};
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var value = values_1[_i];
                    valueFields[value.name] = value;
                }
                for (var _a = 0, filterSettings_1 = filterSettings; _a < filterSettings_1.length; _a++) {
                    var filter = filterSettings_1[_a];
                    rowHeaders = (rowFilteredData.length > 0 ? rowFilteredData : rowHeaders);
                    columnHeaders = (columnFilteredData.length > 0 ? columnFilteredData : columnHeaders);
                    this.valueFilteredData = [];
                    var filterElement = filter.properties ?
                        filter.properties : filter;
                    if (filterElement.type === 'Value' && this.fieldList[filter.name] && this.fieldList[filter.name].isSelected) {
                        valueFilters[filter.name] = filter;
                        filterElement.items = [];
                        var isAvail = false;
                        var rLen = rows.length;
                        var cLen = columns.length;
                        for (var i = 0; i < rLen; i++) {
                            if (filterElement.name === rows[i].name && valueFields[filterElement.measure] && !isAvail) {
                                isAvail = true;
                                rowFilteredData = this.applyValueFiltering(rows[i], i, rowHeaders, (this.columnGrandTotal ? this.columnGrandTotal : (this.dataSourceSettings.grandTotalsPosition === 'Top' && this.dataSourceSettings.showGrandTotals) ? columnHeaders[0] : columnHeaders[columnHeaders.length - 1]), valueFilters, this.valueFilteredData, 'row');
                                break;
                            }
                        }
                        for (var j = 0; j < cLen; j++) {
                            if (filterElement.name === columns[j].name && valueFields[filterElement.measure] && !isAvail) {
                                isAvail = true;
                                columnFilteredData = this.applyValueFiltering(columns[j], j, columnHeaders, (this.rowGrandTotal ? this.rowGrandTotal : (this.dataSourceSettings.grandTotalsPosition === 'Top' && this.dataSourceSettings.showGrandTotals) ? rowHeaders[0] : rowHeaders[rowHeaders.length - 1]), valueFilters, this.valueFilteredData, 'column');
                                break;
                            }
                        }
                    }
                }
            }
            rowFilteredData = (rowFilteredData.length > 0 ? rowFilteredData : rowHeaders);
            columnFilteredData = (columnFilteredData.length > 0 ? columnFilteredData : columnHeaders);
            this.isEmptyDataAvail(rowFilteredData, columnFilteredData);
            var savedFieldList = PivotUtil.getClonedFieldList(this.fieldList);
            var fields = this.data[0];
            this.getFieldList(fields, this.enableSort, dataSource.allowValueFilter);
            this.fillFieldMembers();
            this.updateSortSettings(dataSource.sortSettings, this.enableSort);
            this.filterMembers = [];
            this.updateFilterMembers(dataSource);
            this.isLastHeaderHasMeasures = true;
            this.rMembers = rows.length !== 0 ?
                this.getIndexedHeaders(rows, data, 0, rows[0].showNoDataItems ?
                    filterMembers : this.filterMembers, 'row', '') : [];
            this.cMembers = columns.length !== 0 ?
                this.getIndexedHeaders(columns, data, 0, columns[0].showNoDataItems ?
                    filterMembers : this.filterMembers, 'column', '') : [];
            this.insertAllMembersCommon();
            this.updateFieldList(savedFieldList);
            this.rowCount = 0;
            this.columnCount = 0;
            this.rMembers = this.updateFramedHeaders(this.rMembers, this.rMembers, rowFilteredData, this.filterFramedHeaders, 'row');
            this.filterFramedHeaders = [];
            this.cMembers = this.updateFramedHeaders(this.cMembers, this.cMembers, columnFilteredData, this.filterFramedHeaders, 'column');
            this.isValueFilterEnabled = true;
        }
        if (!headerCollection) {
            this.applyValueSorting();
        }
        if (this.isPagingOrVirtualizationEnabled) {
            if (!headerCollection) {
                this.headerCollection.rowHeaders = this.rMembers;
                this.headerCollection.columnHeaders = this.cMembers;
                this.headerCollection.rowHeadersCount = this.rowCount;
                this.headerCollection.columnHeadersCount = this.columnCount;
            }
            else {
                this.rMembers = headerCollection.rowHeaders;
                this.cMembers = headerCollection.columnHeaders;
                this.rowCount = this.customProperties.isTabularLayout ? this.rowCount + this.emptyRowsLength :
                    headerCollection.rowHeadersCount;
                this.columnCount = headerCollection.columnHeadersCount;
            }
            this.calculatePagingValues();
        }
        if (!this.valueAxis && this.isLastHeaderHasMeasures) {
            this.getAggregatedHeaders(rows, columns, this.rMembers, this.cMembers, values);
        }
        this.getHeaderData(rows, columns, values, updatedRowMembers, this.cMembers, colheads, this.pivotValues, 0, this.valueAxis ? 1 : valuesCount);
        this.insertSubTotals();
        this.getTableData((updatedRowMembers.length > 0 ? updatedRowMembers : this.rMembers), rowheads, colheads, 0, this.pivotValues, valuesCount, 0, (this.rowGrandTotal ? this.rowGrandTotal :
            this.rMembers[this.rMembers.length - 1]), (this.columnGrandTotal ? this.columnGrandTotal :
            this.cMembers[this.cMembers.length - 1]));
        this.applyAdvancedAggregate(rowheads, colheads, this.pivotValues);
        if (this.customProperties.isTabularLayout) {
            this.pivotValues = this.getTabularPivotValues(requireDatasourceUpdate, dataSource);
            this.setRowSpan();
            this.rowCount = this.rowCount - this.emptyRowsLength;
        }
        this.isEngineUpdated = true;
        this.isEmptyDataAvail(this.rMembers, this.cMembers);
        //  console.log(st1 - st2);
        this.clearProperties(isExport);
    };
    PivotEngine.prototype.updateHeaders = function (rowFlag, columnFlag) {
        /* removing the row grant-total members */
        rowFlag = (isNullOrUndefined(rowFlag) ? (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showRowGrandTotals) ?
            true : (this.dataSourceSettings.rows.length > 0) ? false : true : rowFlag);
        if (((this.pageSettings && (this.removeRowGrandTotal)) || (!rowFlag && !this.rowGrandTotal)) &&
            this.rMembers[this.rMembers.length - 1].type === 'grand sum') {
            this.rMembers = this.rMembers.slice(0, this.rMembers.length - 1);
        }
        /* removing the column gran-total members */
        columnFlag = (isNullOrUndefined(columnFlag) ? (this.dataSourceSettings.showGrandTotals &&
            this.dataSourceSettings.showColumnGrandTotals) ? true : (this.dataSourceSettings.columns.length > 0) ? false : true :
            columnFlag);
        if (((this.pageSettings && (this.removeColumnGrandTotal)) || (!columnFlag && !this.columnGrandTotal)) &&
            this.cMembers[this.cMembers.length - 1].type === 'grand sum') {
            this.cMembers = this.cMembers.slice(0, this.cMembers.length - 1);
        }
    };
    PivotEngine.prototype.updatePivotValues = function (updateHeaders) {
        var rowFlag = (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showRowGrandTotals) ?
            true : (this.dataSourceSettings.rows.length > 0) ? false : true;
        var columnFlag = (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showColumnGrandTotals) ?
            true : (this.dataSourceSettings.columns.length > 0) ? false : true;
        if (updateHeaders) {
            this.updateHeaders(rowFlag, columnFlag);
        }
        /* removing the row grant-totals */
        if (((this.pageSettings && (this.removeRowGrandTotal)) ||
            (!rowFlag && !this.rowGrandTotal)) && this.valueContent.length > 0) {
            var slicePos = 1;
            if (this.valueAxis && this.dataSourceSettings.values.length > 0) {
                slicePos = 1 + this.dataSourceSettings.values.length;
            }
            if (this.pivotValues[this.pivotValues.length - slicePos] &&
                this.pivotValues[this.pivotValues.length - slicePos][0].type === 'grand sum') {
                this.pivotValues = this.pivotValues.slice(0, this.pivotValues.length - slicePos);
                this.valueContent = this.valueContent.slice(0, this.valueContent.length - slicePos);
            }
        }
        /* removing the column gran-totals */
        if (((this.pageSettings && (this.removeColumnGrandTotal)) ||
            (!columnFlag && !this.columnGrandTotal)) && this.headerContent.length > 0) {
            var slicePos = this.dataSourceSettings.values.length;
            if (this.valueAxis && this.dataSourceSettings.values.length > 0) {
                slicePos = 1;
            }
            if (this.pivotValues[0][this.pivotValues[0].length - slicePos] &&
                this.pivotValues[0][this.pivotValues[0].length - slicePos].type === 'grand sum') {
                for (var ln = 0; ln < this.pivotValues.length; ln++) {
                    if (this.pivotValues[ln]) {
                        this.pivotValues[ln] =
                            this.pivotValues[ln].slice(0, this.pivotValues[ln].length - slicePos);
                    }
                    if (this.headerContent[ln]) {
                        for (var pos = this.pivotValues[ln].length; pos < (this.pivotValues[ln].length + slicePos); pos++) {
                            delete this.headerContent[ln][pos];
                        }
                    }
                }
            }
        }
        this.removeRowGrandTotal = this.removeColumnGrandTotal = false;
    };
    /**
     * It performs the updateing Engine by the drilled item.
     *
     * @param {IDrilledItem} drilledItem -  It cotains the drilled items.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.onDrill = function (drilledItem) {
        if (!this.enableVirtualization && !this.enablePaging && this.customProperties.isTabularLayout) {
            this.rowMaxLevel = 0;
        }
        this.frameDrillObject(drilledItem);
        var headersInfo = this.getHeadersInfo(drilledItem.fieldName, drilledItem.axis);
        this.performDrillOperation(headersInfo.headers, drilledItem, headersInfo.fields, headersInfo.position, 0);
        this.headerCollection.rowHeadersCount = this.rowCount;
        this.headerCollection.columnHeadersCount = this.columnCount;
        if (headersInfo.axis === 'row') {
            this.headerCollection.rowHeaders = headersInfo.headers;
        }
        else {
            this.headerCollection.columnHeaders = headersInfo.headers;
        }
        this.updateEngine();
    };
    /**
     * It performs to update the engine by sorting data.
     *
     * @param {ISort} sortItem - It cotains the drilled item data.
     * @param {IDataOptions} dataSource - It contains dataSource.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.onSort = function (sortItem, dataSource) {
        if (dataSource) {
            this.updateDataSourceSettings(dataSource, true);
        }
        var headersInfo = this.getHeadersInfo(sortItem.name, '');
        this.fieldList[sortItem.name].sort = sortItem.order;
        this.performSortOperation(headersInfo.headers, sortItem, headersInfo, 0);
        this.updateEngine();
    };
    /**
     * It performs to update the engine by filtering data.
     *
     * @param {IFilter} filterItem - It contains the value of filter Item.
     * @param {IDataOptions} dataSource - It contains dataSource.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.onFilter = function (filterItem, dataSource) {
        this.updateDataSourceSettings(dataSource, true);
        var headersInfo = this.getHeadersInfo(filterItem.name, '');
        this.isLastHeaderHasMeasures = (this.valueAxis && headersInfo.axis === 'row') ||
            (!this.valueAxis && headersInfo.axis === 'column') ? true : this.isLastHeaderHasMeasures;
        if (filterItem.type === 'Include' && filterItem.items.length === this.fieldList[filterItem.name].dateMember.length) {
            this.fieldList[filterItem.name].filter = [];
            this.fieldList[filterItem.name].filterType = '';
        }
        else {
            this.fieldList[filterItem.name].filter = filterItem.items;
            this.fieldList[filterItem.name].filterType = filterItem.type;
        }
        var posObj = {};
        for (var _i = 0, _a = this.filterMembers; _i < _a.length; _i++) {
            var pos = _a[_i];
            posObj[pos] = pos;
        }
        this.filterMembers = [];
        this.fieldFilterMem = {};
        this.updateFilterMembers(dataSource);
        var addPos = this.filterMembers.filter(function (pos) { return posObj[pos] === undefined; });
        var itemsObj = {};
        for (var _b = 0, _c = filterItem.items; _b < _c.length; _b++) {
            var item = _c[_b];
            itemsObj[item] = item;
        }
        var showNoDataItems = (this.dataSourceSettings.rows[0] && this.dataSourceSettings.rows[0].showNoDataItems) || (this.dataSourceSettings.columns[0] && this.dataSourceSettings.columns[0].showNoDataItems);
        if (showNoDataItems && this.columnKeys[filterItem.name]) {
            showNoDataItems = (this.dataSourceSettings.columns[0] && this.dataSourceSettings.columns[0].showNoDataItems) ? true : false;
        }
        else if (showNoDataItems && headersInfo.axis === 'row') {
            showNoDataItems = (this.dataSourceSettings.rows[0] && this.dataSourceSettings.rows[0].showNoDataItems) ? true : false;
        }
        if (showNoDataItems) {
            var filterMembers = [];
            this.filterPosObj = {};
            for (var ln = 0; ln < addPos.length; ln++) {
                this.filterPosObj[addPos[ln]] = addPos[ln];
            }
            for (var ln = 0; ln < this.valueMatrix.length; ln++) {
                filterMembers.push(ln);
            }
            addPos = filterMembers;
        }
        this.performFilterCommonUpdate(filterItem, headersInfo, addPos);
        if (headersInfo.axis === 'column') {
            headersInfo = this.getHeadersInfo('', 'row');
            this.performFilterCommonUpdate(filterItem, headersInfo, addPos);
        }
        else {
            headersInfo = this.getHeadersInfo('', 'column');
            this.performFilterCommonUpdate(filterItem, headersInfo, addPos);
        }
        this.frameHeaderObjectsCollection = false;
        this.headerObjectsCollection = {};
        if (this.customProperties.isTabularLayout) {
            this.rowCount = this.rowCount - this.emptyRowsLength;
        }
        this.updateEngine();
    };
    /**
     * It performs to update the engine by the aggregation.
     *
     * @param {IFieldOptions} field -  It cotains the field data.
     * @param {IDataOptions} dataSource - It contains dataSource.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.onAggregation = function (field, dataSource) {
        if (dataSource) {
            this.updateDataSourceSettings(dataSource, true);
        }
        this.fieldList[field.name].aggregateType = field.type;
        this.rMembers = this.headerCollection.rowHeaders;
        this.cMembers = this.headerCollection.columnHeaders;
        if (this.allowDataCompression) {
            this.data = this.getGroupedRawData(this.dataSourceSettings);
            this.generateValueMatrix();
        }
        this.updateEngine();
    };
    /**
     * It performs to update the engine by the calculated field operation.
     *
     * @param {ICalculatedFields} field -  It cotains the Calculated Fields.
     * @param {IDataOptions} dataSourceSettings -  It cotains the dataSourceSettings.
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.onCalcOperation = function (field, dataSourceSettings) {
        this.dataSourceSettings.calculatedFieldSettings = dataSourceSettings.calculatedFieldSettings ?
            dataSourceSettings.calculatedFieldSettings : [];
        this.dataSourceSettings.values = dataSourceSettings.values ? dataSourceSettings.values : [];
        this.rMembers = this.headerCollection.rowHeaders;
        this.cMembers = this.headerCollection.columnHeaders;
        this.getCalculatedField(this.fields);
        if (this.fieldList[field.name]) {
            this.fieldList[field.name].formula = field.formula;
        }
        else {
            this.fieldList[field.name] = {
                id: field.name,
                caption: field.name,
                type: 'number',
                aggregateType: 'CalculatedField',
                filterType: '',
                index: this.fields.length - 1,
                filter: [],
                sort: this.enableSort ? 'Ascending' : 'None',
                isSelected: true,
                isExcelFilter: false,
                formula: field.formula
            };
            if (this.valueAxis === 1) {
                this.headerCollection.rowHeadersCount = this.rowCount = (this.rowCount / (this.dataSourceSettings.values.length - 1)) * this.dataSourceSettings.values.length;
            }
            else {
                this.headerCollection.columnHeadersCount = this.columnCount = (this.columnCount / (this.dataSourceSettings.values.length - 1)) * this.dataSourceSettings.values.length;
            }
        }
        this.getFormattedFields(dataSourceSettings);
        this.fillFieldMembers();
        this.updateEngine();
    };
    PivotEngine.prototype.performDrillOperation = function (headers, drilledItem, fields, position, currentPosition) {
        var count = 0;
        while (count < headers.length) {
            if (position === currentPosition) {
                var levelName = headers[count].valueSort.levelName.split(this.valueSortSettings.headerDelimiter);
                if (drilledItem.memberName === levelName.join(drilledItem.delimiter ? drilledItem.delimiter : '**')) {
                    if (drilledItem.action === 'down') {
                        headers[count].isDrilled = true;
                        headers[count].members = this.getIndexedHeaders(fields, this.data, position + 1, headers[count].index, drilledItem.axis, drilledItem.memberName.
                            split(drilledItem.delimiter ? drilledItem.delimiter : '**').join(this.valueSortSettings.headerDelimiter));
                        var sortedHeaders = void 0;
                        if (drilledItem.axis === 'row') {
                            sortedHeaders = this.applyValueSorting(headers[count].members, this.cMembers);
                            headers[count].members = sortedHeaders.rMembers;
                            this.rowCount += (this.showSubTotalsAtBottom ? 1 : 0);
                        }
                        else {
                            var showSubTotals = this.dataSourceSettings.showSubTotals &&
                                this.dataSourceSettings.showColumnSubTotals && fields[position].showSubTotals;
                            this.columnCount -= !showSubTotals ? this.colValuesLength : 0;
                            sortedHeaders = this.applyValueSorting(this.rMembers, headers[count].members);
                            headers[count].members = sortedHeaders.cMembers;
                        }
                    }
                    else {
                        headers[count].isDrilled = false;
                        this.updateHeadersCount(headers[count].members, drilledItem.axis, position, fields, 'minus', true);
                        headers[count].members = [];
                        if (drilledItem.axis === 'row') {
                            this.rowCount -= (this.showSubTotalsAtBottom ? 1 : 0);
                        }
                    }
                    break;
                }
            }
            else if (headers[count].members.length > 0) {
                headers[count].members = this.performDrillOperation(headers[count].members, drilledItem, fields, position, currentPosition + 1);
            }
            count++;
        }
        return headers;
    };
    PivotEngine.prototype.performSortOperation = function (headers, sortItem, headersInfo, currentPosition) {
        var count = 0;
        while (count < headers.length) {
            if (headersInfo.position === currentPosition) {
                headers = this.getSortedHeaders(headers, sortItem.order.toString());
                break;
            }
            else if (headers[count].members.length > 0) {
                headers[count].members =
                    this.performSortOperation(headers[count].members, sortItem, headersInfo, currentPosition + 1);
            }
            count++;
        }
        return headers;
    };
    PivotEngine.prototype.performFilterDeletion = function (headers, filterItem, headersInfo, filterObjects, currentPosition) {
        var count = 0;
        var loopIn = true;
        var _loop_4 = function () {
            if (headersInfo.position === currentPosition) {
                var engine_1 = this_4;
                headers = headers.filter(function (item) {
                    return engine_1.fieldFilterMem[filterItem.name].memberObj[item.formattedText] === '' ? false :
                        !engine_1.fieldFilterMem[filterItem.name].memberObj[item.formattedText] || item.type === 'grand sum';
                });
                loopIn = false;
            }
            else if (headers[count].members.length > 0) {
                headers[count].members = this_4.performFilterDeletion(headers[count].members, filterItem, headersInfo, filterObjects, currentPosition + 1);
            }
            count++;
        };
        var this_4 = this;
        while (count < headers.length && loopIn) {
            _loop_4();
        }
        var engine = this;
        return headers.filter(function (item) {
            return (item.members.length > 0 || item.type === 'grand sum') ? true : engine.matchIndexes(item.indexObject, filterObjects);
        });
    };
    PivotEngine.prototype.matchIndexes = function (index, filterObjects) {
        var keys = Object.keys(index);
        var len = keys.length;
        if (len === 0) {
            return true;
        }
        while (len > -1) {
            if (filterObjects[index[keys[len]]] !== undefined) {
                return true;
            }
            len--;
        }
        return false;
    };
    PivotEngine.prototype.performFilterAddition = function (headers, fields, headersInfo) {
        var count = 0;
        var _loop_5 = function () {
            var levelName = headers[count].valueSort.levelName;
            if (this_5.headerObjectsCollection[levelName]) {
                var memberNameObj_1 = {};
                for (var _i = 0, _a = headers[count].members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    memberNameObj_1[member.valueSort.levelName.toString()] = member.valueSort.levelName.toString();
                }
                var excessHeaders = this_5.headerObjectsCollection[levelName].filter(function (member) {
                    return !memberNameObj_1[member.valueSort.levelName.toString()];
                });
                headers[count].members = headers[count].members.concat(excessHeaders);
                headers[count].members = this_5.getSortedHeaders(headers[count].members, this_5.fieldList[headersInfo.fields[headers[count].members[0].level].name].sort);
                delete this_5.headerObjectsCollection[levelName];
            }
            if (headers[count].members.length > 0) {
                headers[count].members = this_5.performFilterAddition(headers[count].members, fields, headersInfo);
            }
            count++;
        };
        var this_5 = this;
        while (count < headers.length) {
            _loop_5();
        }
        return headers;
    };
    PivotEngine.prototype.performFilterCommonUpdate = function (filterItem, headersInfo, addPos) {
        if (headersInfo.axis === 'row' || headersInfo.axis === 'column') {
            var rawHeaders = headersInfo.axis === 'row' ? this.rMembers : this.cMembers;
            var filterObjects = {};
            for (var _i = 0, _a = this.filterMembers; _i < _a.length; _i++) {
                var item = _a[_i];
                filterObjects[item] = item;
            }
            if (this.fieldFilterMem[filterItem.name]) {
                rawHeaders = this.performFilterDeletion(headersInfo.headers, filterItem, headersInfo, filterObjects, 0);
            }
            if (addPos.length > 0 && headersInfo.fields.length > 0) {
                this.frameHeaderObjectsCollection = true;
                if (headersInfo.fields.filter(function (item) { return item.showNoDataItems; }).length > 0) {
                    for (var i = 0; i < this.data.length; i++) {
                        addPos.push(i);
                    }
                }
                this.headerObjectsCollection['parent'] = this.getIndexedHeaders(headersInfo.fields, this.data, 0, addPos, headersInfo.axis, '');
                rawHeaders = this.performFilterAddition(rawHeaders, headersInfo.fields, headersInfo);
                var headerNames_1 = {};
                for (var _b = 0, rawHeaders_1 = rawHeaders; _b < rawHeaders_1.length; _b++) {
                    var header = rawHeaders_1[_b];
                    headerNames_1[header.valueSort.levelName.toString()] = header.valueSort.levelName.toString();
                }
                var excessHeaders = this.headerObjectsCollection['parent'].filter(function (header) {
                    return !headerNames_1[header.valueSort.levelName.toString()];
                });
                var grandHeader = rawHeaders.filter(function (item) { return item.type === 'grand sum'; });
                if (grandHeader.length > 0) {
                    rawHeaders.pop();
                }
                rawHeaders = this.getSortedHeaders(rawHeaders.concat(excessHeaders), this.fieldList[headersInfo.fields[0].name].sort).concat(grandHeader);
                if (headersInfo.axis === 'row') {
                    this.cMembers = this.getIndexedHeaders(this.dataSourceSettings.columns, this.data, 0, this.filterMembers, 'column', '');
                    this.insertAllMember(this.cMembers, this.filterMembers, '', 'column');
                }
                else {
                    this.rMembers = this.getIndexedHeaders(this.dataSourceSettings.rows, this.data, 0, this.filterMembers, 'row', '');
                    this.insertAllMember(this.rMembers, this.filterMembers, '', 'row');
                }
            }
            if (headersInfo.axis === 'row') {
                this.rowCount = 0;
            }
            else {
                this.columnCount = 0;
            }
            this.updateHeadersCount(rawHeaders, headersInfo.axis, 0, headersInfo.fields, 'plus', false);
            if (headersInfo.axis === 'row') {
                if (headersInfo.position > 0) {
                    this.insertPosition(this.dataSourceSettings.rows, this.data, 0, this.filterMembers, 'row', '', rawHeaders);
                }
                this.insertTotalPosition(rawHeaders);
                this.rMembers = this.headerCollection.rowHeaders = rawHeaders;
                this.headerCollection.rowHeadersCount = this.rowCount;
            }
            else {
                if (headersInfo.position > 0) {
                    this.insertPosition(this.dataSourceSettings.columns, this.data, 0, this.filterMembers, 'column', '', rawHeaders);
                }
                this.insertTotalPosition(rawHeaders);
                this.cMembers = this.headerCollection.columnHeaders = rawHeaders;
                this.headerCollection.columnHeadersCount = this.columnCount;
            }
        }
        else {
            var showNoDataItems = (this.dataSourceSettings.rows[0] && this.dataSourceSettings.rows[0].showNoDataItems) || (this.dataSourceSettings.columns[0] && this.dataSourceSettings.columns[0].showNoDataItems);
            this.rMembers = this.getIndexedHeaders(this.dataSourceSettings.rows, this.data, 0, showNoDataItems ? addPos : this.filterMembers, 'row', '');
            this.cMembers = this.getIndexedHeaders(this.dataSourceSettings.columns, this.data, 0, showNoDataItems ? addPos : this.filterMembers, 'column', '');
            this.insertAllMembersCommon();
            this.rowCount = 0;
            this.columnCount = 0;
            this.updateHeadersCount(this.cMembers, 'column', 0, this.dataSourceSettings.columns, 'plus', false);
            this.updateHeadersCount(this.rMembers, 'row', 0, this.dataSourceSettings.rows, 'plus', false);
            if (showNoDataItems) {
                this.insertPosition(this.dataSourceSettings.rows, this.data, 0, this.filterMembers, 'row', '', this.rMembers);
                this.insertPosition(this.dataSourceSettings.columns, this.data, 0, this.filterMembers, 'column', '', this.cMembers);
            }
            this.headerCollection.rowHeaders = this.rMembers;
            this.headerCollection.rowHeadersCount = this.rowCount;
            this.headerCollection.columnHeaders = this.cMembers;
            this.headerCollection.columnHeadersCount = this.columnCount;
        }
        this.applyValueSorting();
    };
    PivotEngine.prototype.getHeadersInfo = function (fieldName, axis) {
        this.rMembers = this.headerCollection.rowHeaders;
        this.cMembers = this.headerCollection.columnHeaders;
        axis = axis === '' ? this.getAxisByFieldName(fieldName) : axis;
        var headers = axis === 'row' ? this.rMembers : this.cMembers;
        var fields = axis === 'row' ? this.dataSourceSettings.rows : this.dataSourceSettings.columns;
        var position = 0;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            if (field.name === fieldName) {
                break;
            }
            position++;
        }
        return { axis: axis, fields: fields, headers: headers, position: position };
    };
    /**
     * It performs the updating engine.
     *
     * @returns {void}
     * @hidden
     */
    PivotEngine.prototype.updateEngine = function () {
        if (this.customProperties.isTabularLayout) {
            this.rowCount = this.rowCount + this.emptyRowsLength;
        }
        this.removeCount = 0;
        this.validateValueFields();
        this.calculatePagingValues();
        this.pivotValues = [];
        this.headerContent = [];
        this.valueContent = [];
        var rowheads = [];
        var colheads = [];
        var updatedRowMembers = [];
        var valuesCount = (this.dataSourceSettings.values.length);
        this.frameDrillObject();
        this.getAggregatedHeaders(this.dataSourceSettings.rows, this.dataSourceSettings.columns, this.rMembers, this.cMembers, this.dataSourceSettings.values);
        this.getHeaderData(this.dataSourceSettings.rows, this.dataSourceSettings.columns, this.dataSourceSettings.values, updatedRowMembers, this.cMembers, colheads, this.pivotValues, 0, this.valueAxis ? 1 : valuesCount);
        this.insertSubTotals();
        this.getTableData((updatedRowMembers.length > 0 ? updatedRowMembers : this.rMembers), rowheads, colheads, 0, this.pivotValues, valuesCount, 0, (this.rowGrandTotal ? this.rowGrandTotal : this.rMembers[this.rMembers.length - 1]), (this.columnGrandTotal ? this.columnGrandTotal : this.cMembers[this.cMembers.length - 1]));
        this.applyAdvancedAggregate(rowheads, colheads, this.pivotValues);
        if (this.customProperties.isTabularLayout) {
            this.pivotValues = this.getTabularPivotValues();
            this.setRowSpan();
            this.rowCount = this.rowCount - this.emptyRowsLength;
        }
        this.isEngineUpdated = true;
        this.isEmptyDataAvail(this.rMembers, this.cMembers);
    };
    PivotEngine.prototype.getAxisByFieldName = function (fieldName) {
        var axisCount = 0;
        var axis = '';
        while (axisCount < 4 && axis === '') {
            switch (axisCount) {
                case 0:
                    axis = this.getFieldByName(fieldName, this.dataSourceSettings.rows) ? 'row' : '';
                    break;
                case 1:
                    axis = this.getFieldByName(fieldName, this.dataSourceSettings.columns) ? 'column' : '';
                    break;
            }
            axisCount++;
        }
        return axis;
    };
    PivotEngine.prototype.getFieldByName = function (fieldName, fields) {
        return new DataManager({ json: fields }).executeLocal(new Query().where('name', 'equal', fieldName))[0];
    };
    PivotEngine.prototype.updateHeadersCount = function (headers, axis, position, fields, action, isDrill) {
        var lenCnt = 0;
        var field = fields[position];
        var showSubTotals = true;
        if (axis === 'column') {
            showSubTotals = this.dataSourceSettings.showSubTotals && this.dataSourceSettings.showColumnSubTotals &&
                (field ? field.showSubTotals : true);
        }
        else {
            showSubTotals = this.dataSourceSettings.showSubTotals && this.dataSourceSettings.showRowSubTotals &&
                (field ? field.showSubTotals : true);
        }
        while (lenCnt < headers.length) {
            if (axis === 'row') {
                this.rowCount = this.rowCount - (action === 'plus' ? -(this.valueAxis === 1 ? this.dataSourceSettings.values.length : 1) :
                    (this.valueAxis === 1 ? this.dataSourceSettings.values.length : 1));
            }
            else {
                this.columnCount = this.columnCount - (action === 'plus' ? -(this.valueAxis === 1 ? 1 : this.dataSourceSettings.values.length) :
                    (this.valueAxis === 1 ? 1 : this.dataSourceSettings.values.length));
            }
            if (headers[lenCnt].members.length > 0) {
                this.updateHeadersCount(headers[lenCnt].members, axis, position + 1, fields, action, true);
                if (axis === 'row') {
                    this.rowCount -= this.showSubTotalsAtBottom && headers[lenCnt].hasChild && headers[lenCnt].isDrilled ? 1 : 0;
                }
            }
            lenCnt++;
        }
        if (axis === 'column' && !showSubTotals && isDrill) {
            this.columnCount += action === 'plus' ? -this.colValuesLength : this.colValuesLength;
        }
    };
    /**
     * It performs to retrieve the sorted headers.
     *
     * @param {IAxisSet[]} headers - It cotains the headers data.
     * @param {string} sortOrder -  It cotains the ortOrder data
     * @returns {IAxisSet[]} - return sorted headers as IAxisSet[].
     * @hidden
     */
    PivotEngine.prototype.getSortedHeaders = function (headers, sortOrder) {
        var fieldName = headers[0].actualText !== 'Grand Total' ? headers[0].valueSort.axis :
            headers[1].valueSort.axis;
        var isNotDateType = !(this.formatFields && this.formatFields[fieldName] &&
            this.formatFields[fieldName].type);
        var childrens = this.fieldList[fieldName];
        if (isNotDateType) {
            if (childrens && childrens.type === 'number' && headers.length > 0 && (typeof (headers[0].actualText) === 'string')) {
                var stringValue = [];
                var alphaNumbervalue = [];
                var nullValue = [];
                for (var i = 0; i < headers.length; i++) {
                    if (isNaN(Number(headers[i].actualText.toString().charAt(0)))) {
                        stringValue.push(headers[i]);
                    }
                    else if (headers[i].actualText === '') {
                        nullValue.push(headers[i]);
                    }
                    else {
                        alphaNumbervalue.push(headers[i]);
                        break;
                    }
                }
                if (alphaNumbervalue.length > 0) {
                    alphaNumbervalue = this.sortHeaders(fieldName, childrens, headers, childrens.sort, childrens.isAlphanumeric);
                }
                return headers;
            }
            else {
                return this.sortHeaders(fieldName, childrens, headers, sortOrder, childrens.type);
            }
        }
        else {
            return this.sortHeaders(fieldName, childrens, headers, sortOrder, 'date');
        }
    };
    PivotEngine.prototype.sortHeaders = function (fieldName, childrens, sortMembersOrder, sortOrder, type) {
        var isHeaderSortByDefault = false;
        var membersInfo = this.fieldList[fieldName] && this.fieldList[fieldName].membersOrder ?
            this.fieldList[fieldName].membersOrder.slice() : [];
        var sortDetails = {
            fieldName: fieldName,
            sortOrder: sortOrder,
            members: membersInfo && membersInfo.length > 0 ? membersInfo : Object.keys(childrens.members),
            IsOrderChanged: false
        };
        type = (type === 'datetime' || type === 'date' || type === 'time') ? (this.formatFields[fieldName] &&
            (['date', 'dateTime', 'time'].indexOf(this.formatFields[fieldName].type) > -1)) ? type : 'string' : type;
        var isDateType = (type === 'datetime' || type === 'date' || type === 'time');
        var isNumberGroupSorting = false;
        if (this.dataSourceSettings.groupSettings.length > 0) {
            var groupField = this.dataSourceSettings.groupSettings.filter(function (field) {
                return field.name === childrens.id;
            });
            if (!isNullOrUndefined(groupField) && groupField.length > 0) {
                isNumberGroupSorting = groupField[0].type.toLocaleLowerCase() === 'number' &&
                    childrens.type.toLocaleLowerCase() === 'string';
            }
        }
        if (membersInfo && membersInfo.length > 0) {
            PivotUtil.applyCustomSort(sortDetails, sortMembersOrder, type);
        }
        else {
            PivotUtil.applyHeadersSort(sortMembersOrder, sortOrder, type, isNumberGroupSorting);
            isHeaderSortByDefault = true;
        }
        if (isHeaderSortByDefault && this.getHeaderSortInfo) {
            var copyOrder = [];
            for (var m = 0, n = 0; m < sortMembersOrder.length; m++) {
                var member = sortMembersOrder[m];
                var sortText = isDateType ?
                    member.dateText : member.actualText;
                if (member.actualText !== 'Grand Total') {
                    copyOrder[n++] = sortText;
                }
            }
            sortDetails.members = copyOrder;
        }
        if (this.getHeaderSortInfo) {
            this.getHeaderSortInfo(sortDetails);
        }
        if (sortDetails.IsOrderChanged) {
            PivotUtil.applyCustomSort(sortDetails, sortMembersOrder, type, true);
        }
        return sortMembersOrder;
    };
    /**
     * It performs to applying  the value sorting.
     *
     * @param {IAxisSet[]} rMembers - It contains the row members data.
     * @param {IAxisSet[]} cMembers - It contains the column members data.
     * @returns {ISortedHeaders} - It return the sorted value as ISortedHeaders.
     * @hidden
     */
    PivotEngine.prototype.applyValueSorting = function (rMembers, cMembers) {
        var isNullArgument = false;
        if (rMembers === undefined || cMembers === undefined) {
            this.valueSortHeaderText = undefined;
            if (this.enableValueSorting && this.valueSortSettings.headerText && !this.valueSortHeaderText &&
                this.valueSortSettings.headerText !== '' && this.dataSourceSettings.values.length > 0) {
                this.valueSortHeaderText = this.valueSortSettings.headerText;
                var textArray = this.valueSortHeaderText.split(this.valueSortSettings.headerDelimiter);
                for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                    var field = _a[_i];
                    var name_1 = field.caption ? field.caption : field.name;
                    var valueIndex = textArray.indexOf(name_1);
                    if (valueIndex > -1) {
                        textArray.splice(valueIndex, 1);
                        textArray.push(name_1);
                        this.valueSortHeaderText = textArray.join(this.valueSortSettings.headerDelimiter);
                        break;
                    }
                }
            }
            rMembers = this.rMembers;
            cMembers = this.cMembers;
            isNullArgument = true;
        }
        if (this.valueSortHeaderText) {
            var textArray = this.valueSortHeaderText.split(this.valueSortSettings.headerDelimiter);
            var hText = '';
            var mIndex = void 0;
            var mType = void 0;
            var caption = void 0;
            for (var i = 0; i < this.dataSourceSettings.values.length; i++) {
                if (this.dataSourceSettings.values[i].caption === textArray[textArray.length - 1]) {
                    caption = this.dataSourceSettings.values[i].name;
                    break;
                }
                else {
                    caption = textArray[textArray.length - 1];
                }
            }
            if (((this.dataSourceSettings.values.length === 1 && this.dataSourceSettings.columns.length === 0) ||
                this.dataSourceSettings.values.length > 1) && caption && this.fieldList[caption]) {
                for (var i = 0; i < textArray.length - 1; i++) {
                    hText = hText === '' ? textArray[i] : (hText + this.valueSortSettings.headerDelimiter + textArray[i]);
                }
                mIndex = this.fieldList[caption].index;
                mType = this.fieldList[caption].aggregateType;
            }
            else {
                if (!this.dataSourceSettings.alwaysShowValueHeader || textArray.length === 1) {
                    hText = this.valueSortHeaderText;
                }
                else {
                    for (var i = 0; i < textArray.length - 1; i++) {
                        hText = hText === '' ? textArray[i] : (hText + this.valueSortSettings.headerDelimiter + textArray[i]);
                    }
                }
                mIndex = this.fieldList[this.dataSourceSettings.values[0].name].index;
                mType = this.fieldList[this.dataSourceSettings.values[0].name].aggregateType;
            }
            var member = void 0;
            if (this.valueAxis === 0) {
                member = this.getMember(cMembers, hText);
                if (member) {
                    rMembers = this.sortByValueRow(rMembers, member, this.valueSortSettings.sortOrder, mIndex, mType);
                }
            }
            else {
                member = this.getMember(rMembers, hText);
                if (member) {
                    cMembers = this.sortByValueRow(cMembers, member, this.valueSortSettings.sortOrder, mIndex, mType);
                }
            }
            if (isNullArgument) {
                this.rMembers = rMembers;
                this.cMembers = cMembers;
                if (this.isPagingOrVirtualizationEnabled) {
                    this.headerCollection.rowHeaders = this.rMembers;
                    this.headerCollection.columnHeaders = this.cMembers;
                }
            }
        }
        return { rMembers: rMembers, cMembers: cMembers };
    };
    PivotEngine.prototype.getMember = function (cMembers, headerText) {
        var vlen = cMembers.length;
        var member;
        for (var j = 0; j < vlen; j++) {
            if (cMembers[j].valueSort.levelName === headerText) {
                member = cMembers[j];
                break;
            }
            else if (cMembers[j].members.length > 0) {
                member = this.getMember(cMembers[j].members, headerText);
            }
            if (member) {
                return member;
            }
        }
        return member;
    };
    PivotEngine.prototype.sortByValueRow = function (rMembers, member, sortOrder, mIndex, mType) {
        var aggreColl = [];
        for (var _i = 0, rMembers_1 = rMembers; _i < rMembers_1.length; _i++) {
            var header = rMembers_1[_i];
            if (header.type === 'grand sum') {
                aggreColl.push({ 'header': header });
            }
            else {
                this.rawIndexObject = {};
                var value = this.getAggregateValue(header.index, member.indexObject, mIndex, mType, false);
                var cellDetails = {
                    fieldName: this.fields[mIndex],
                    row: header,
                    column: member,
                    value: value,
                    cellSets: this.getValueCellInfo ? this.getCellSet(this.rawIndexObject) : [],
                    rowCellType: (header.hasChild && header.isDrilled ? 'subTotal' : header.type === 'grand sum' ? 'grandTotal' : 'value'),
                    columnCellType: (member.hasChild && member.isDrilled ? 'subTotal' : member.type === 'grand sum' ? 'grandTotal' : 'value'),
                    aggregateType: mType,
                    skipFormatting: false
                };
                if (this.getValueCellInfo) {
                    this.getValueCellInfo(cellDetails);
                }
                value = cellDetails.value;
                this.rawIndexObject = {};
                aggreColl.push({ 'header': header, 'value': value });
            }
        }
        rMembers = PivotUtil.getSortedValue(aggreColl, sortOrder);
        for (var _a = 0, rMembers_2 = rMembers; _a < rMembers_2.length; _a++) {
            var header = rMembers_2[_a];
            if (header.members.length > 0) {
                header.members = this.sortByValueRow(header.members, member, sortOrder, mIndex, mType);
            }
        }
        return rMembers;
    };
    PivotEngine.prototype.insertAllMembersCommon = function () {
        this.rowGrandTotal = this.columnGrandTotal = null;
        var rowFlag = (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showRowGrandTotals) ? true :
            (this.dataSourceSettings.rows.length > 0) ? false : true;
        var columnFlag = (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showColumnGrandTotals) ?
            true : (this.dataSourceSettings.columns.length > 0) ? false : true;
        if (this.isValueHasAdvancedAggregate) {
            /* inserting the row grant-total members */
            this.insertAllMember(this.rMembers, this.filterMembers, '', 'row');
            if (rowFlag) {
                this.rowCount += this.rowValuesLength;
            }
            /* inserting the column gran-total members */
            this.insertAllMember(this.cMembers, this.filterMembers, '', 'column');
            if (columnFlag) {
                this.columnCount += this.colValuesLength;
            }
        }
        else {
            if (rowFlag) {
                /* inserting the row grant-total members */
                this.insertAllMember(this.rMembers, this.filterMembers, '', 'row');
                this.rowCount += this.rowValuesLength;
            }
            else {
                this.rowGrandTotal = this.insertAllMember([], this.filterMembers, '', 'row')[0];
            }
            if (columnFlag) {
                /* inserting the column gran-total members */
                this.insertAllMember(this.cMembers, this.filterMembers, '', 'column');
                this.columnCount += this.colValuesLength;
            }
            else {
                this.columnGrandTotal = this.insertAllMember([], this.filterMembers, '', 'column')[0];
            }
        }
    };
    PivotEngine.prototype.insertSubTotals = function () {
        var rowLength = this.pivotValues.length;
        for (var rowCnt = 0; rowCnt < rowLength; rowCnt++) {
            var rowCells = this.pivotValues[rowCnt];
            if (rowCells) {
                var savedCell = void 0;
                var spanCnt = 1;
                var colLength = rowCells.length;
                var indexObj = void 0;
                var startIndex = 1;
                var lastIndex = this.showSubTotalsAtTop ? this.reformAxisCount : colLength;
                var colCnt = this.showSubTotalsAtTop ? startIndex : lastIndex - 1;
                var columnSpan = void 0;
                var memberCnt = void 0;
                while (startIndex < lastIndex) {
                    var cell = rowCells[colCnt];
                    if (cell) {
                        // if (cell.rowSpan > 1) {
                        //     cell.rowSpan = 1;
                        // }
                        if (savedCell) {
                            savedCell.colSpan = spanCnt;
                            savedCell.colIndex = this.showSubTotalsAtTop ? savedCell.colIndex + (spanCnt - 1) :
                                savedCell.colIndex - (spanCnt - 1);
                        }
                        if (this.showSubTotalsAtTop) {
                            columnSpan = memberCnt = this.getMemberSpanCount(this.pivotValues[rowCnt], colCnt);
                        }
                        indexObj = { index: cell.index, indexObject: cell.indexObject };
                        cell.index = [];
                        cell.indexObject = {};
                        savedCell = extend({}, cell, null, true);
                        cell.index = indexObj.index;
                        cell.indexObject = indexObj.indexObject;
                        var rowPos = rowCnt + 1;
                        while (this.pivotValues[rowPos] && !this.pivotValues[rowPos][colCnt]) {
                            var curentCell = this.pivotValues[rowCnt][colCnt];
                            if (!curentCell.isDrilled && !(!this.valueAxis && !this.isLastHeaderHasMeasures && (curentCell.members
                                && curentCell.members.length > 0 && rowPos > this.measureIndex))) {
                                curentCell.rowSpan = (rowPos - rowCnt) + 1;
                                savedCell.rowSpan = (rowPos - rowCnt) + 1;
                            }
                            var cellType = (cell.type === 'sum' || cell.type === 'grand sum') ? cell.type : 'sum';
                            this.pivotValues[rowPos][colCnt] =
                                this.headerContent[rowPos][colCnt] = {
                                    type: cellType, formattedText: ((cell.type === 'sum' || cell.type === 'grand sum') ? cell.formattedText :
                                        (cell.formattedText + ' Total')), axis: 'column', hierarchyName: cell.hierarchyName,
                                    level: -1, colIndex: colCnt, rowIndex: rowPos, valueSort: cell.valueSort
                                };
                            if (cell.valueSort && cell.valueSort[this.valueSortSettings.headerText]) {
                                this.valueSortSettings.columnIndex = colCnt;
                            }
                            var isSpanned = false;
                            if (cellType === 'grand sum') {
                                curentCell.rowSpan = (rowPos - rowCnt) + 1;
                                savedCell.rowSpan = (rowPos - rowCnt) + 1;
                            }
                            else if (curentCell.type !== 'sum' && (curentCell.isDrilled || (this.valueAxisFields[curentCell.actualText] &&
                                !this.valueAxis && !this.isLastHeaderHasMeasures && curentCell.members && curentCell.members.length > 0))) {
                                this.pivotValues[rowCnt + 1][colCnt].rowSpan = rowPos - rowCnt;
                                isSpanned = true;
                            }
                            else {
                                this.pivotValues[rowPos][colCnt].rowSpan = -1;
                            }
                            if (rowPos > (rowCnt + 1) && (curentCell.type === 'sum' ||
                                isSpanned)) {
                                this.pivotValues[rowPos][colCnt].rowSpan = -1;
                            }
                            rowPos++;
                        }
                        spanCnt = 1;
                    }
                    else {
                        rowCells[colCnt] =
                            this.headerContent[rowCnt][colCnt] = extend({}, savedCell, null, true);
                        rowCells[colCnt].index =
                            this.headerContent[rowCnt][colCnt].index = indexObj.index;
                        rowCells[colCnt].indexObject =
                            this.headerContent[rowCnt][colCnt].indexObject = indexObj.indexObject;
                        spanCnt++;
                        if (this.showSubTotalsAtTop) {
                            memberCnt--;
                            rowCells[colCnt].colSpan = memberCnt;
                            rowCells[colCnt].colIndex = rowCells[colCnt].colIndex + (spanCnt - 1);
                        }
                        else {
                            rowCells[colCnt].colSpan = spanCnt;
                            rowCells[colCnt].colIndex = rowCells[colCnt].colIndex - (spanCnt - 1);
                        }
                    }
                    if (colCnt === 1 && savedCell) {
                        if (this.showSubTotalsAtTop) {
                            savedCell.colSpan = columnSpan;
                            savedCell.colIndex = savedCell.colIndex + (spanCnt - 1);
                        }
                        else {
                            savedCell.colSpan = spanCnt;
                            savedCell.colIndex = savedCell.colIndex - (spanCnt - 1);
                        }
                    }
                    if (this.showSubTotalsAtTop && (rowCells[colCnt + 1] || colCnt + 1 === this.reformAxisCount)) {
                        var cell_1 = this.pivotValues[rowCnt][(colCnt - spanCnt) + 1];
                        cell_1.colSpan = columnSpan;
                        this.pivotValues[rowCnt][(colCnt - spanCnt) + 1] = cell_1;
                    }
                    colCnt = this.showSubTotalsAtTop ? colCnt + 1 : colCnt - 1;
                    startIndex++;
                }
            }
        }
    };
    PivotEngine.prototype.getMemberSpanCount = function (rowCellArray, cellIndex) {
        var colIndex = 1;
        for (var i = cellIndex + 1; i < this.reformAxisCount; i++) {
            if (!rowCellArray[i]) {
                colIndex++;
            }
            else {
                break;
            }
        }
        return colIndex;
    };
    PivotEngine.prototype.frameDrillObject = function (vDrilledItem) {
        if (vDrilledItem === void 0) { vDrilledItem = null; }
        this.fieldDrillCollection = {};
        for (var fieldCnt = 0; fieldCnt < this.drilledMembers.length; fieldCnt++) {
            var drillOption = this.drilledMembers[fieldCnt];
            var hasValueField = false;
            var levelCount = 1;
            var isFieldAvail = false;
            var field = this.fieldList[drillOption.name];
            var isDrillMemberExpand = (field && field.expandAll);
            for (var i = 0; i < this.dataSourceSettings.rows.length; i++) {
                if (this.dataSourceSettings.rows[i].name === drillOption.name) {
                    var hasMeasureIndex = this.valueAxis && (this.isMultiMeasures ||
                        this.dataSourceSettings.alwaysShowValueHeader) && this.measureIndex > -1 && this.measureIndex <= i;
                    levelCount = (hasMeasureIndex ? (i + 1) : i) + 1;
                    hasValueField = hasMeasureIndex ? true : false;
                    isFieldAvail = true;
                    break;
                }
            }
            if (!isFieldAvail) {
                for (var i = 0; i < this.dataSourceSettings.columns.length; i++) {
                    if (this.dataSourceSettings.columns[i].name === drillOption.name) {
                        var hasMeasureIndex = !this.valueAxis && (this.isMultiMeasures ||
                            this.dataSourceSettings.alwaysShowValueHeader) && this.measureIndex > -1 && this.measureIndex <= i;
                        levelCount = (hasMeasureIndex ? (i + 1) : i) + 1;
                        hasValueField = hasMeasureIndex ? true : false;
                        isFieldAvail = true;
                        break;
                    }
                }
            }
            for (var _i = 0, _a = drillOption.items; _i < _a.length; _i++) {
                var drilledItem = _a[_i];
                var members = drilledItem.split(drillOption.delimiter);
                if (levelCount === members.length) {
                    var memberString = drillOption.name + this.valueSortSettings.headerDelimiter +
                        members.join(this.valueSortSettings.headerDelimiter);
                    this.fieldDrillCollection[memberString] = memberString;
                    if (hasValueField) {
                        var isAllValuesAvail = false;
                        if (this.isExpandAll || isDrillMemberExpand) {
                            for (var _b = 0, _c = this.dataSourceSettings.values; _b < _c.length; _b++) {
                                var field_1 = _c[_b];
                                var name_2 = field_1.caption ? field_1.caption : field_1.name;
                                members[this.measureIndex] = name_2;
                                if (drillOption.items.indexOf(members.join(drillOption.delimiter)) > -1) {
                                    isAllValuesAvail = true;
                                }
                                else {
                                    isAllValuesAvail = false;
                                    break;
                                }
                            }
                        }
                        if (((this.isExpandAll || isDrillMemberExpand) && isAllValuesAvail) || !this.isExpandAll || !isDrillMemberExpand) {
                            members = drilledItem.split(drillOption.delimiter);
                            members.splice(this.measureIndex, 1);
                            if (vDrilledItem && vDrilledItem.memberName === drilledItem) {
                                vDrilledItem.memberName = members.join(drillOption.delimiter);
                            }
                            memberString = drillOption.name + this.valueSortSettings.headerDelimiter +
                                members.join(this.valueSortSettings.headerDelimiter);
                            this.fieldDrillCollection[memberString] = memberString;
                        }
                    }
                }
            }
        }
    };
    PivotEngine.prototype.getIndexedHeaders = function (keys, data, keyInd, position, axis, parentMember, valueFil) {
        var hierarchy = [];
        var keysPos = 0;
        if (keys && keys.length > 0) {
            keysPos++;
            var rlen = keys.length;
            var decisionObj = {};
            var fieldName = keys[keyInd].name;
            var field = keys[keyInd];
            // let members: string[] = Object.keys(this.fieldList[field].members);
            var childrens = this.fieldList[fieldName];
            if (isNullOrUndefined(this.reportDataType)) {
                this.reportDataType = {};
                for (var i = 0; i < this.dataSourceSettings.rows.length; i++) {
                    this.reportDataType[this.dataSourceSettings.rows[i].name] =
                        this.dataSourceSettings.rows[i].dataType;
                }
                for (var i = 0; i < this.dataSourceSettings.columns.length; i++) {
                    this.reportDataType[this.dataSourceSettings.columns[i].name] =
                        this.dataSourceSettings.columns[i].dataType;
                }
                for (var i = 0; i < this.dataSourceSettings.values.length; i++) {
                    this.reportDataType[this.dataSourceSettings.values[i].name] =
                        this.dataSourceSettings.values[i].dataType;
                }
            }
            childrens.type = !isNullOrUndefined(this.reportDataType[childrens.id]) ? this.reportDataType[childrens.id] : childrens.type;
            var isNoData = false;
            var isDateType = (this.formatFields[fieldName] &&
                (['date', 'dateTime', 'time'].indexOf(this.formatFields[fieldName].type) > -1));
            var showNoDataItems = (position.length < 1 && keyInd > 0) || field.showNoDataItems;
            var savedMembers = {};
            if (showNoDataItems) {
                var members = Object.keys(childrens.members);
                for (var pos = 0, lt = members.length; pos < lt; pos++) {
                    if (this.dataSourceSettings.showHeaderWhenEmpty ||
                        (this.localeObj && members[pos] !== this.localeObj.getConstant('undefined'))) {
                        savedMembers[members[pos]] = members[pos];
                    }
                }
                if (position.length < 1) {
                    isNoData = true;
                    position.length = members.length;
                }
            }
            if (axis === this.dataSourceSettings.valueAxis && this.measureIndex === keyInd &&
                (this.dataSourceSettings.values.length > 1 || this.dataSourceSettings.alwaysShowValueHeader)) {
                this.isLastHeaderHasMeasures = false;
            }
            for (var pos = 0, lt = position.length; pos < lt; pos++) {
                var member = {};
                if (!isNullOrUndefined(keys[keyInd].showSubTotals) && !keys[keyInd].showSubTotals) {
                    member.showSubTotals = false;
                }
                member.hasChild = keyInd < rlen - 1;
                member.level = keyInd;
                member.axis = axis;
                member.colSpan = 1;
                this.rowMaxLevel = (axis === 'row' && this.rowMaxLevel < keyInd) ? keyInd : this.rowMaxLevel;
                var memInd = isNoData ? childrens.members[Object.keys(savedMembers)[0]].ordinal :
                    this.valueMatrix[position[pos]][childrens.index].ordinal;
                var headerValue = isNoData ? Object.keys(savedMembers)[0] :
                    data[position[pos]][this.fieldKeys[fieldName]];
                headerValue = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(headerValue) : headerValue;
                if ((isNullOrUndefined(headerValue) || (this.localeObj && headerValue === this.localeObj.getConstant('undefined')))
                    && !this.dataSourceSettings.showHeaderWhenEmpty) {
                    if (showNoDataItems && !isNoData && keyInd > 0 && pos + 1 === position.length &&
                        Object.keys(savedMembers).length > 0) {
                        lt = Object.keys(savedMembers).length;
                        isNoData = true;
                        pos = -1;
                    }
                    continue;
                }
                delete savedMembers[headerValue];
                if (showNoDataItems && this.fieldFilterMem[fieldName] &&
                    this.fieldFilterMem[fieldName].memberObj[headerValue] === headerValue) {
                    continue;
                }
                var formattedValue = isDateType ? {
                    actualText: headerValue,
                    formattedText: childrens.dateMember[memInd - 1].formattedText,
                    dateText: childrens.dateMember[memInd - 1].actualText
                } : {
                    formattedText: headerValue === null ? (this.localeObj ? this.localeObj.getConstant('null') : String(headerValue)) :
                        headerValue === undefined ? (this.localeObj ? (fieldName in this.groupingFields) ?
                            this.localeObj.getConstant('groupOutOfRange') : this.localeObj.getConstant('undefined') :
                            String(headerValue)) : String(headerValue), actualText: headerValue === null ? (this.localeObj ?
                        this.localeObj.getConstant('null') : String(headerValue)) : headerValue === undefined ?
                        (this.localeObj ? (fieldName in this.groupingFields) ? this.localeObj.getConstant('groupOutOfRange') :
                            this.localeObj.getConstant('undefined') : String(headerValue)) : headerValue
                };
                member.actualText = formattedValue.actualText;
                member.formattedText = formattedValue.formattedText;
                if (isDateType) {
                    member.dateText = formattedValue.dateText;
                }
                var availData = showNoDataItems ? (this.filterPosObj[position[pos]] !== undefined &&
                    !isNoData ? true : false) : true;
                //member.name = members[memInd as number];
                // member.type = member.hasChild ? 'All' : 'Single';
                var isFiltered = false;
                if (showNoDataItems && childrens.filter.length > 0 && childrens.filterType === 'include') {
                    isFiltered = true;
                }
                if ((!(decisionObj && decisionObj[memInd])) && (!isFiltered ||
                    (isFiltered && childrens.filter.indexOf(headerValue.toString()) > -1))) {
                    decisionObj[memInd] = { index: [], indexObject: {} };
                    member.index = decisionObj[memInd].index;
                    member.indexObject = decisionObj[memInd].indexObject;
                    if (availData) {
                        member.index = decisionObj[memInd].index = [position[pos]];
                        decisionObj[memInd].indexObject[position[pos]] = position[pos];
                        member.indexObject = decisionObj[memInd].indexObject;
                    }
                    member.ordinal = memInd;
                    member.valueSort = {};
                    member.valueSort.axis = fieldName;
                    if (keyInd !== 0) {
                        member.valueSort.levelName = parentMember + this.valueSortSettings.headerDelimiter +
                            (this.customProperties.isTabularLayout ?
                                this.getFormattedValue(member.formattedText, childrens.caption).formattedText : member.formattedText);
                        member.valueSort[parentMember + this.valueSortSettings.headerDelimiter + member.formattedText] = 1;
                        member.valueSort.uniqueName = parentMember + this.valueSortSettings.headerDelimiter +
                            (member.actualText ? member.actualText : member.formattedText);
                        member.valueSort[parentMember + this.valueSortSettings.headerDelimiter + (member.actualText ?
                            member.actualText : member.formattedText)] = 1;
                    }
                    else {
                        member.valueSort[member.formattedText] = 1;
                        member.valueSort.levelName = (this.customProperties.isTabularLayout ?
                            this.getFormattedValue(member.formattedText, childrens.caption).formattedText : member.formattedText);
                        member.valueSort[member.actualText ? member.actualText : member.formattedText] = 1;
                        member.valueSort.uniqueName = (member.actualText ? member.actualText : member.formattedText);
                    }
                    var memberString = member.valueSort.axis + this.valueSortSettings.headerDelimiter + member.valueSort.levelName;
                    var isExpandMember = this.isExpandAll || (field && field.expandAll);
                    member.isDrilled = (valueFil && this.isValueFiltersAvail) ? true :
                        (member.hasChild && this.fieldDrillCollection[memberString]) ?
                            isExpandMember ? (!this.valueAxis && !this.isLastHeaderHasMeasures && (keysPos >= this.measureIndex) ?
                                true : false) : true : isExpandMember;
                    //if (!member.members) {
                    member.members = [];
                    //}
                    //let copyObj: AxisSet = Object.create(member);
                    hierarchy.push(member);
                }
                else if (availData) {
                    decisionObj[memInd].index.push(position[pos]);
                    decisionObj[memInd].indexObject[position[pos]] = position[pos];
                }
                if (showNoDataItems && !isNoData && keyInd > 0 && pos + 1 === position.length &&
                    Object.keys(savedMembers).length > 0) {
                    isNoData = true;
                    lt = Object.keys(savedMembers).length;
                    pos = -1;
                }
            }
            for (var iln = 0, ilt = hierarchy.length; iln < ilt; iln++) {
                if (!this.frameHeaderObjectsCollection) {
                    if (axis === 'row') {
                        this.rowCount += (this.rowValuesLength + (hierarchy[iln].isDrilled && hierarchy[iln].hasChild && this.showSubTotalsAtBottom ? 1 : 0));
                    }
                    else {
                        this.columnCount += this.colValuesLength;
                    }
                }
                var level = null;
                if (hierarchy[iln].valueSort && hierarchy[iln].valueSort.levelName) {
                    level = hierarchy[iln].valueSort.levelName;
                }
                parentMember = (level || hierarchy[iln].formattedText);
                if (!this.dataSourceSettings.showHeaderWhenEmpty && rlen - 1 > keyInd && hierarchy[iln].index &&
                    hierarchy[iln].index.length > 0) {
                    if (showNoDataItems && keys[keyInd + 1] && keys[keyInd + 1].name &&
                        Object.keys(this.fieldList[keys[keyInd + 1].name].members).length > 0) {
                        hierarchy[iln].hasChild = true;
                    }
                    else {
                        var hIndLen = hierarchy[iln].index.length;
                        var count = 0;
                        for (var len = 0; len < hIndLen; len++) {
                            var headerValue = data[hierarchy[iln].index[len]][this.fieldKeys[keys[keyInd + 1].name]];
                            if ((isNullOrUndefined(headerValue) || (this.localeObj &&
                                headerValue === this.localeObj.getConstant('undefined')))) {
                                count++;
                            }
                        }
                        hierarchy[iln].hasChild = count !== hIndLen;
                    }
                }
                if (rlen - 1 > keyInd && hierarchy[iln].isDrilled) {
                    this.columnCount -= (!(this.dataSourceSettings.showSubTotals && this.dataSourceSettings.showColumnSubTotals && field.showSubTotals) && axis === 'column') ?
                        this.colValuesLength : 0;
                    var filterPosition = hierarchy[iln].index;
                    hierarchy[iln].members = this.getIndexedHeaders(keys, data, keyInd + 1, (filterPosition === undefined ? [] : filterPosition), axis, parentMember, valueFil);
                    if (this.frameHeaderObjectsCollection) {
                        this.headerObjectsCollection[parentMember] = hierarchy[iln].members;
                    }
                }
            }
            if (this.enableSort) {
                // return new DataManager(hierarchy as JSON[]).executeLocal(new Query().sortBy('actualText', childrens.sort.toLowerCase()));
                if (isDateType) {
                    return this.sortHeaders(fieldName, childrens, hierarchy, childrens.sort, 'date');
                }
                else {
                    if (childrens.type.toLowerCase() === 'number' && hierarchy.length > 0 && (typeof (hierarchy[0].actualText) === 'string') && hierarchy[0].actualText.match(/[a-zA-Z]+/g)) {
                        var stringValue = [];
                        var outOfRange = void 0;
                        var alphaNumbervalue = [];
                        var nullValue = [];
                        for (var i = 0; i < hierarchy.length; i++) {
                            if (isNullOrUndefined(hierarchy[i].actualText.toString().match(/\d+/))) {
                                stringValue.push(hierarchy[i]);
                                if (!outOfRange && childrens.sort !== 'None') {
                                    if (hierarchy[i].actualText === 'Out of Range') {
                                        outOfRange = hierarchy[i];
                                        hierarchy.splice(i, 1);
                                    }
                                }
                            }
                            else if (hierarchy[i].actualText === '') {
                                nullValue.push(hierarchy[i]);
                            }
                            else {
                                this.fieldList[fieldName].isAlphanumeric = true;
                                alphaNumbervalue.push(hierarchy[i]);
                                break;
                            }
                        }
                        if (outOfRange) {
                            if (childrens.sort === 'Ascending') {
                                if (hierarchy[0].actualText === 'Grand Total') {
                                    hierarchy.splice(1, 0, outOfRange);
                                }
                                else {
                                    hierarchy.splice(0, 0, outOfRange);
                                }
                            }
                            else {
                                if (hierarchy[hierarchy.length - 1].actualText === 'Grand Total') {
                                    hierarchy.splice(hierarchy.length - 1, 0, outOfRange);
                                }
                                else {
                                    hierarchy.splice(hierarchy.length, 0, outOfRange);
                                }
                            }
                        }
                        if (alphaNumbervalue.length > 0) {
                            this.sortHeaders(fieldName, childrens, hierarchy, childrens.sort, childrens.isAlphanumeric);
                        }
                        return hierarchy;
                    }
                    else {
                        return this.sortHeaders(fieldName, childrens, hierarchy, childrens.sort, childrens.type);
                    }
                }
            }
            else {
                return hierarchy;
            }
        }
        else {
            return hierarchy;
        }
    };
    PivotEngine.prototype.getOrderedIndex = function (headers) {
        var orderedIndex = {};
        for (var i = 0; i < headers.length; i++) {
            if (headers[i].type !== 'grand sum') {
                orderedIndex[headers[i].ordinal] = i;
            }
        }
        return orderedIndex;
    };
    PivotEngine.prototype.insertPosition = function (keys, data, keyInd, position, axis, parentMember, slicedHeaders) {
        var hierarchy = [];
        var orderedIndex = this.getOrderedIndex(slicedHeaders);
        if (keys) {
            var decisionObj = {};
            var field = keys[keyInd].name;
            var childrens = this.fieldList[field];
            for (var pos = 0, lt = position.length; pos < lt; pos++) {
                var member = {};
                var memInd = this.valueMatrix[position[pos]][childrens.index].ordinal;
                var slicedHeader = slicedHeaders[orderedIndex[memInd]];
                var value = data[position[pos]][this.fieldKeys[field]];
                value = value === null ? (this.localeObj ? this.localeObj.getConstant('null') : String(value)) : value;
                var formattedValue = (this.formatFields[field] &&
                    (['date', 'dateTime', 'time'].indexOf(this.formatFields[field].type) > -1)) ?
                    this.getFormattedValue(value, field) : { formattedText: value.toString(), actualText: value.toString() };
                if (!(slicedHeader && slicedHeader.formattedText === formattedValue.formattedText)) {
                    continue;
                }
                if (!(decisionObj && decisionObj[memInd])) {
                    decisionObj[memInd] = { index: [], indexObject: {} };
                    slicedHeader.index = decisionObj[memInd].index = [position[pos]];
                    decisionObj[memInd].indexObject[position[pos]] = position[pos];
                    slicedHeader.indexObject = decisionObj[memInd].indexObject;
                    slicedHeader.valueSort = {};
                    slicedHeader.valueSort.axis = field;
                    if (keyInd !== 0) {
                        slicedHeader.valueSort.levelName = parentMember + this.valueSortSettings.headerDelimiter +
                            slicedHeader.formattedText;
                        slicedHeader.valueSort[parentMember + this.valueSortSettings.headerDelimiter +
                            slicedHeader.formattedText] = 1;
                        slicedHeader.valueSort.uniqueName = parentMember + this.valueSortSettings.headerDelimiter +
                            (slicedHeader.actualText ? slicedHeader.actualText : slicedHeader.formattedText);
                        slicedHeader.valueSort[parentMember + this.valueSortSettings.headerDelimiter +
                            (slicedHeader.actualText ? slicedHeader.actualText : slicedHeader.formattedText)] = 1;
                    }
                    else {
                        slicedHeader.valueSort[slicedHeader.formattedText] = 1;
                        slicedHeader.valueSort.levelName = slicedHeader.formattedText;
                        slicedHeader.valueSort[(slicedHeader.actualText ? slicedHeader.actualText : slicedHeader.formattedText)] = 1;
                        slicedHeader.valueSort.uniqueName =
                            (slicedHeader.actualText ? slicedHeader.actualText : slicedHeader.formattedText);
                    }
                    member.members = [];
                    hierarchy.push(member);
                }
                else {
                    decisionObj[memInd].index.push(position[pos]);
                    decisionObj[memInd].indexObject[position[pos]] = position[pos];
                }
            }
            var diff = slicedHeaders.length - hierarchy.length;
            while (diff > 0) {
                hierarchy.push({ members: [] });
                diff--;
            }
            for (var iln = 0, ilt = hierarchy.length; iln < ilt; iln++) {
                if (slicedHeaders[iln].members.length > 0) {
                    var level = null;
                    if (slicedHeaders[iln].valueSort && slicedHeaders[iln].valueSort.levelName) {
                        level = slicedHeaders[iln].valueSort.levelName;
                    }
                    parentMember = (level || slicedHeaders[iln].formattedText);
                    hierarchy[iln].members = this.insertPosition(keys, data, keyInd + 1, slicedHeaders[iln].index, axis, parentMember, slicedHeaders[iln].members);
                }
            }
            return hierarchy;
        }
        else {
            return hierarchy;
        }
    };
    PivotEngine.prototype.insertTotalPosition = function (headers) {
        var summCell = headers[headers.length - 1];
        if (summCell && summCell.type === 'grand sum') {
            summCell.index = this.filterMembers;
            summCell.indexObject = {};
            for (var ln = 0, lt = this.filterMembers.length; ln < lt; ln++) {
                summCell.indexObject[this.filterMembers[ln]] = this.filterMembers[ln];
            }
        }
        return headers;
    };
    PivotEngine.prototype.calculatePagingValues = function () {
        if (this.isPagingOrVirtualizationEnabled) {
            if (this.valueAxis === 1) {
                this.rowValuesLength = this.dataSourceSettings.values.length;
            }
            else {
                this.colValuesLength = this.dataSourceSettings.values.length;
            }
            this.columnPageCount = Math.ceil(this.columnCount / this.pageSettings.columnPageSize);
            this.rowPageCount = Math.ceil(this.rowCount / this.pageSettings.rowPageSize);
            this.pageSettings.currentColumnPage = this.pageSettings.currentColumnPage >= this.columnPageCount ||
                (this.enableOptimizedRendering && this.pageSettings.currentColumnPage > 1 &&
                    ((this.pageSettings.currentColumnPage + 1) * this.colValuesLength) >= this.columnPageCount) ?
                this.columnPageCount : this.pageSettings.currentColumnPage;
            this.pageSettings.currentRowPage = this.pageSettings.currentRowPage >= this.rowPageCount ||
                (this.enableOptimizedRendering && this.pageSettings.currentRowPage > 1 &&
                    ((this.pageSettings.currentRowPage + 1) * this.rowValuesLength) >= this.rowPageCount) ?
                this.rowPageCount : this.pageSettings.currentRowPage;
            var requirePageCount = this.enablePaging ? 1 : this.enableOptimizedRendering ? 1.5 : 3;
            this.memberCnt = this.enablePaging ? 0 : -this.rowValuesLength;
            this.rowStartPos = ((this.pageSettings.currentRowPage * this.pageSettings.rowPageSize) -
                (this.pageSettings.rowPageSize)) * (this.enablePaging ? 1 : this.rowValuesLength) + (this.enablePaging ? 1 : 0);
            var exactStartPos = this.enablePaging ? this.rowStartPos :
                (this.rowStartPos + (this.pageSettings.rowPageSize * requirePageCount * this.rowValuesLength)) > this.rowCount ?
                    (this.rowCount - (this.pageSettings.rowPageSize * requirePageCount * this.rowValuesLength)) : this.rowStartPos;
            if (exactStartPos < 0) {
                exactStartPos = this.rowStartPos = 0;
                this.pageSettings.currentRowPage = 1;
            }
            this.rowFirstLvl = (this.rowStartPos - exactStartPos) % this.pageSettings.rowPageSize;
            this.rowStartPos = exactStartPos;
            this.endPos = this.rowStartPos + (this.pageSettings.rowPageSize * requirePageCount * (this.enablePaging ? 1 :
                this.rowValuesLength)) - (this.enablePaging ? 1 : 0);
            this.endPos = this.endPos > (this.rowCount + 1) ? (this.rowCount + 1) : this.endPos;
            this.rMembers = this.performSlicing(this.rMembers, [], this.rowStartPos, 'row');
            this.memberCnt = this.enablePaging ? 0 : -this.colValuesLength;
            this.pageInLimit = false;
            this.colHdrBufferCalculated = false;
            this.colStartPos = ((this.pageSettings.currentColumnPage * this.pageSettings.columnPageSize) -
                (this.pageSettings.columnPageSize)) * (this.enablePaging ? 1 : this.colValuesLength) + (this.enablePaging ? 1 : 0);
            exactStartPos = this.enablePaging ? this.colStartPos : (this.colStartPos + (this.pageSettings.columnPageSize *
                requirePageCount * this.colValuesLength)) > this.columnCount ? (this.columnCount - (this.pageSettings.columnPageSize *
                requirePageCount * this.colValuesLength)) : this.colStartPos;
            if (exactStartPos < 0) {
                exactStartPos = this.colStartPos = 0;
                this.pageSettings.currentColumnPage = 1;
            }
            this.colFirstLvl = (this.colStartPos - exactStartPos) % this.pageSettings.columnPageSize;
            this.colStartPos = exactStartPos;
            this.endPos = this.colStartPos + (this.pageSettings.columnPageSize * requirePageCount *
                (this.enablePaging ? 1 : this.colValuesLength)) - (this.enablePaging ? 1 : 0);
            this.endPos = this.endPos > (this.columnCount + 1) ? (this.columnCount + 1) : this.endPos;
            this.cMembers = this.performSlicing(this.cMembers, [], this.colStartPos, 'column');
            this.memberCnt = -1;
            this.pageInLimit = false;
            if (this.isValueHasAdvancedAggregate) {
                if (this.rMembers[this.rMembers.length - 1].type !== 'grand sum' &&
                    this.headerCollection.rowHeaders[this.headerCollection.rowHeaders.length - 1].type === 'grand sum') {
                    this.rMembers.push(this.headerCollection.rowHeaders[this.headerCollection.rowHeaders.length - 1]);
                    this.removeRowGrandTotal = true;
                }
                if (this.cMembers[this.cMembers.length - 1].type !== 'grand sum' &&
                    this.headerCollection.columnHeaders[this.headerCollection.columnHeaders.length - 1].type === 'grand sum') {
                    this.cMembers.push(this.headerCollection.columnHeaders[this.headerCollection.columnHeaders.length - 1]);
                    this.removeColumnGrandTotal = true;
                }
            }
            else {
                this.rowGrandTotal = this.rowGrandTotal ? this.rowGrandTotal :
                    this.headerCollection.rowHeaders[this.headerCollection.rowHeaders.length - 1];
                this.columnGrandTotal = this.columnGrandTotal ? this.columnGrandTotal :
                    this.headerCollection.columnHeaders[this.headerCollection.columnHeaders.length - 1];
            }
        }
    };
    PivotEngine.prototype.performSlicing = function (headers, slicedHeaders, startPos, axis) {
        var pos = 0;
        while (headers[pos]) {
            if (this.enablePaging && this.endPos <= this.memberCnt && pos !== 0) {
                break;
            }
            this.memberCnt += headers[pos].level <= this.measureIndex ? (axis === 'column' ? this.colValuesLength : this.rowValuesLength) : 1;
            if (startPos <= this.memberCnt && this.endPos >= this.memberCnt && !this.pageInLimit) {
                if (axis === 'column') {
                    this.colFirstLvl = this.colFirstLvl + headers[pos].level;
                }
                else {
                    this.rowFirstLvl = this.rowFirstLvl + headers[pos].level;
                }
                this.pageInLimit = true;
            }
            if (this.pageInLimit && !this.enablePaging) {
                if (this.endPos <= this.memberCnt) {
                    if (axis === 'column') {
                        if (headers[pos].members.length === 0) {
                            if (this.colHdrBufferCalculated) {
                                break;
                            }
                            this.colHdrBufferCalculated = true;
                            this.endPos += (headers[pos].level * this.colValuesLength);
                        }
                        else if (this.colHdrBufferCalculated) {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            slicedHeaders.push(headers[pos].members.length > 0 ?
                this.removeChildMembers(headers[pos]) : headers[pos]);
            if (headers[pos].members.length > 0) {
                if (axis === 'column') {
                    this.memberCnt -= !(this.dataSourceSettings.showSubTotals && this.dataSourceSettings.showColumnSubTotals &&
                        this.columnKeys[headers[pos].valueSort.axis].showSubTotals) ?
                        this.colValuesLength : 0;
                }
                else if (this.showSubTotalsAtBottom) {
                    this.memberCnt++;
                }
                slicedHeaders[slicedHeaders.length - 1].members =
                    this.performSlicing(headers[pos].members, [], startPos, axis);
            }
            if (!this.pageInLimit) {
                slicedHeaders.pop();
            }
            if (headers[pos].level === 0 && this.pageInLimit && this.endPos <= this.memberCnt) {
                break;
            }
            pos++;
        }
        return slicedHeaders;
    };
    PivotEngine.prototype.removeChildMembers = function (member) {
        var keys = Object.keys(member);
        var keyPos = 0;
        var framedMember = {};
        while (keyPos < keys.length) {
            framedMember[keys[keyPos]] = member[keys[keyPos]];
            if (keys[keyPos] === 'members') {
                framedMember['members'] = [];
            }
            keyPos++;
        }
        return framedMember;
    };
    PivotEngine.prototype.insertAllMember = function (set, filter, customText, axis) {
        var len = set.length;
        customText = ' Total';
        var grandTotalSet = {
            hasChild: false,
            index: filter,
            level: 0,
            axis: axis,
            isDrilled: false,
            indexObject: {},
            members: [],
            actualText: 'Grand' + customText,
            formattedText: this.localeObj ? this.localeObj.getConstant('grandTotal') : ('Grand' + customText),
            ordinal: len,
            type: 'grand sum',
            valueSort: {}
        };
        grandTotalSet.valueSort[grandTotalSet.formattedText] = 1;
        grandTotalSet.valueSort.levelName = grandTotalSet.formattedText;
        grandTotalSet.valueSort[grandTotalSet.actualText] = 1;
        grandTotalSet.valueSort.uniqueName = grandTotalSet.actualText;
        for (var ln = 0, lt = filter.length; ln < lt; ln++) {
            grandTotalSet.indexObject[filter[ln]] = filter[ln];
        }
        if (this.dataSourceSettings.grandTotalsPosition === 'Top' && this.dataSourceSettings.showGrandTotals) {
            set.unshift(grandTotalSet);
        }
        else {
            set.push(grandTotalSet);
        }
        // if (axis === 'row') {
        //     this.rowCount += this.rowValuesLength;
        // } else {
        //     this.columnCount += this.colValuesLength;
        // }
        return set;
    };
    PivotEngine.prototype.getTableData = function (rows, reformAxis, columns, pIndex, data, vlt, level, rTotal, cTotal, valueParentIndex) {
        for (var rlt = rows.length, rln = 0; rln < rlt; rln++) {
            var tnum = (!this.valueAxis && !this.isLastHeaderHasMeasures && data.length <
                (this.dataSourceSettings.columns.length + 1)) ? (this.dataSourceSettings.columns.length + 1) : data.length;
            var row = rows[rln];
            reformAxis[tnum] = row;
            var actCnt = tnum - Number(Object.keys(reformAxis)[0]);
            var isLeastNode = !reformAxis[tnum].members.length;
            row.colIndex = 0;
            row.rowIndex = tnum;
            var isRowFieldsAvail = false;
            var delimiter = this.dataSourceSettings.valueSortSettings.headerDelimiter;
            if (this.valueAxis && this.dataSourceSettings.rows.length === 0 && this.dataSourceSettings.values.length > 1) {
                this.rowIndex = (isNullOrUndefined(this.rowIndex) && !isLeastNode &&
                    this.dataSourceSettings.rows.length === 0) ? row.index : this.rowIndex;
                isRowFieldsAvail = (this.valueAxis && this.dataSourceSettings.rows.length === 0 && row.valueSort.levelName &&
                    row.valueSort.levelName.toString().indexOf('Grand Total' + delimiter) !== 0);
                if (this.valueAxis && this.dataSourceSettings.rows.length === 0 &&
                    row.valueSort.levelName.toString().indexOf('Grand Total' + delimiter) === 0) {
                    row.index = this.rowIndex;
                }
            }
            if (!isRowFieldsAvail) {
                var isValue = false;
                if (this.showSubTotalsAtBottom && reformAxis[pIndex] && reformAxis[pIndex].hasChild) {
                    var axis = void 0;
                    for (var _i = 0, _a = reformAxis[pIndex].members; _i < _a.length; _i++) {
                        axis = _a[_i];
                        if (axis.type === 'value') {
                            isValue = true;
                            break;
                        }
                    }
                }
                if (isValue && !reformAxis[tnum].isSum && reformAxis[tnum].members &&
                    reformAxis[tnum].members.length === 0) {
                    continue;
                }
                if (!data[tnum]) {
                    data[tnum] = [];
                    this.valueContent[actCnt] = {};
                }
                data[tnum][0] = reformAxis[tnum]
                    = this.valueContent[actCnt][0] = PivotUtil.getFormattedHeader(row, this);
                if (this.valueAxis && (this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader)) {
                    var hPos = tnum;
                    var actpos = actCnt;
                    var rowIndex = tnum;
                    var isValueCellUpdated = false;
                    if ((((!(level === 0 && this.measureIndex === 0) && !isLeastNode) || isLeastNode) && row.type === 'value' && !row.valueSort.axis) ||
                        (level > this.measureIndex && row.axis === 'row' && row.valueSort.axis)) {
                        var vln = 0;
                        var isValueIndexFound = false;
                        var rowUniqueName = row.valueSort.uniqueName ?
                            row.valueSort.uniqueName.toString().split(this.valueSortSettings.headerDelimiter) : [];
                        for (var cln = 0, dln = 1, clt = columns.length; cln < clt; ++cln) {
                            if (!isValueIndexFound) {
                                for (vln = 0; vln < vlt; vln++) {
                                    if (rowUniqueName.indexOf(this.dataSourceSettings.values[vln].name) > -1) {
                                        isValueIndexFound = true;
                                        isValueCellUpdated = true;
                                        break;
                                    }
                                }
                            }
                            if (level > this.measureIndex && row.axis === 'row' && row.valueSort.axis) {
                                this.updateRowData(rows, columns, tnum, data, vln, rln, cln, dln, actCnt, rTotal, cTotal);
                            }
                            else {
                                if (!reformAxis[pIndex]) {
                                    isValueCellUpdated = false;
                                    break;
                                }
                                var parentIndex = this.showSubTotalsAtBottom && valueParentIndex ? valueParentIndex : pIndex;
                                this.updateRowData(reformAxis, columns, tnum, data, vln, parentIndex, cln, dln, actCnt, rTotal, cTotal);
                            }
                            dln = data[tnum].length;
                        }
                    }
                    if (!isValueCellUpdated) {
                        for (var cln = 0, dln = 1, clt = columns.length; cln < clt; ++cln) {
                            dln = data[tnum].length;
                            data[hPos][dln] = this.valueContent[actpos][dln] = {
                                axis: 'value', actualText: '', colSpan: 1,
                                colIndex: dln, formattedText: '', hasChild: false
                            };
                        }
                    }
                    this.recursiveRowData(rows, reformAxis, columns, rowIndex, data, vlt, isLeastNode, rln, vlt, level, rTotal, cTotal);
                }
                else {
                    for (var cln = 0, dln = 1, clt = columns.length; cln < clt; ++cln) {
                        var columnUniqueName = columns[cln].valueSort.uniqueName ?
                            columns[cln].valueSort.uniqueName.toString().split(this.valueSortSettings.headerDelimiter) : [];
                        for (var vln = 0; vln < vlt; vln++) {
                            if (!this.valueAxis && !this.isLastHeaderHasMeasures) {
                                if (columnUniqueName.indexOf(this.dataSourceSettings.values[vln].name) > -1) {
                                    this.updateRowData(rows, columns, tnum, data, vln, rln, cln, dln, actCnt, rTotal, cTotal);
                                    dln = data[tnum].length;
                                }
                            }
                            else {
                                this.updateRowData(rows, columns, tnum, data, vln, rln, cln, dln, actCnt, rTotal, cTotal);
                                dln = data[tnum].length;
                            }
                        }
                    }
                    this.recursiveRowData(rows, reformAxis, columns, tnum, data, vlt, isLeastNode, rln, 0, level, rTotal, cTotal);
                }
            }
            else if (!isLeastNode) {
                this.recursiveRowData(rows, reformAxis, columns, tnum, data, vlt, isLeastNode, rln, 0, level, rTotal, cTotal);
            }
        }
    };
    PivotEngine.prototype.insertRowSubTotals = function (reformAxis, columns, tnum, data, vlt, level, rTotal, cTotal) {
        var isValueAxis = reformAxis[tnum].type ? reformAxis[tnum].type === 'value' &&
            reformAxis[tnum].valueSort.levelName !== reformAxis[tnum].actualText : false;
        if (reformAxis[tnum].hasChild && reformAxis[tnum].members.length > 0) {
            var parentIndexes = [];
            var subTotal = PivotUtil.frameHeaderWithKeys(reformAxis[tnum]);
            if (reformAxis[tnum].members[0].type === 'value') {
                var startIndex = 0;
                var valueCells = [];
                var i = 1;
                for (var _i = 0, _a = subTotal.members; _i < _a.length; _i++) {
                    var axis = _a[_i];
                    if (axis.type === 'value') {
                        valueCells[valueCells.length] = axis;
                    }
                }
                while (startIndex < valueCells.length) {
                    var valueCell = PivotUtil.frameHeaderWithKeys(valueCells[startIndex]);
                    var index = void 0;
                    for (i; i < reformAxis.length; i++) {
                        if (reformAxis[i] && reformAxis[i].valueSort.levelName === valueCell.valueSort.levelName) {
                            index = reformAxis.indexOf(reformAxis[i]);
                            break;
                        }
                    }
                    if (index > -1) {
                        parentIndexes[parentIndexes.length] = index;
                    }
                    valueCell.formattedText = subTotal.formattedText + ' ' + valueCell.formattedText;
                    valueCell.isSum = true;
                    valueCell.members = [];
                    this.getTableData([valueCell], reformAxis, columns, tnum, data, vlt, level, rTotal, cTotal);
                    startIndex++;
                }
            }
            else {
                subTotal.formattedText = subTotal.formattedText + ' Total';
                subTotal.members = [];
                subTotal.isDrilled = false;
                subTotal.hasChild = false;
                subTotal.isSum = true;
                subTotal.type = 'sum';
                var parentIndex = isValueAxis ? this.getParentIndex(reformAxis, subTotal) : 0;
                this.getTableData([subTotal], reformAxis, columns, tnum, data, vlt, level, rTotal, cTotal, parentIndex);
                parentIndexes = [tnum];
            }
            for (var index = 0; index < parentIndexes.length; index++) {
                var parentInfo = data[parentIndexes[index]];
                parentInfo = parentInfo.map(function (dataValue) {
                    dataValue.formattedText = dataValue.colIndex === 0 ? dataValue.formattedText : '';
                    return dataValue;
                });
                data[parentIndexes[index]] = parentInfo;
            }
        }
    };
    PivotEngine.prototype.getParentIndex = function (reformAxis, axis) {
        var parentIndex = 0;
        for (var i = reformAxis.length - 1; i > 0; i--) {
            if (axis.level === reformAxis[i].level && reformAxis[i].index) {
                parentIndex = i;
                break;
            }
        }
        return parentIndex;
    };
    PivotEngine.prototype.getAggregatedHeaders = function (rows, columns, rMembers, cMembers, values) {
        this.selectedHeaders = { selectedHeader: [], values: [] };
        for (var vlt = values.length, vln = 0; vln < vlt; vln++) {
            switch (values[vln].type) {
                case 'DifferenceFrom':
                case 'PercentageOfDifferenceFrom':
                    {
                        var baseField = void 0;
                        var baseItem = void 0;
                        this.selectedHeaders.values.push(values[vln].name);
                        if (values[vln].baseField && values[vln].baseItem) {
                            baseField = values[vln].baseField;
                            baseItem = values[vln].baseItem;
                        }
                        else if (this.valueAxis && (this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader) &&
                            columns.length > 0) {
                            baseField = columns[0].name;
                            baseItem = Object.keys(this.fieldList[columns[0].name].members)[0];
                        }
                        else if (rows.length > 0) {
                            baseField = rows[0].name;
                            baseItem = Object.keys(this.fieldList[rows[0].name].members)[0];
                        }
                        var isHeaderSelected = false;
                        for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                            var row = rows_2[_i];
                            if (row.name === baseField) {
                                this.getAggregatedHeaderData(rMembers, values[vln].name, baseItem, false, 'row', values[vln].type, this.selectedHeaders.selectedHeader, vln);
                                isHeaderSelected = true;
                                break;
                            }
                        }
                        if (!isHeaderSelected) {
                            for (var _a = 0, columns_1 = columns; _a < columns_1.length; _a++) {
                                var column = columns_1[_a];
                                if (column.name === baseField) {
                                    this.getAggregatedHeaderData(cMembers, values[vln].name, baseItem, false, 'column', values[vln].type, this.selectedHeaders.selectedHeader, vln);
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case 'PercentageOfParentRowTotal':
                case 'PercentageOfParentColumnTotal':
                    {
                        this.selectedHeaders.values.push(values[vln].name);
                        this.getAggregatedHeaderData((values[vln].type === 'PercentageOfParentRowTotal' ? rMembers : cMembers), values[vln].name, undefined, false, (values[vln].type === 'PercentageOfParentRowTotal' ? 'row' : 'column'), values[vln].type, this.selectedHeaders.selectedHeader, vln);
                    }
                    break;
                case 'RunningTotals':
                    {
                        this.selectedHeaders.values.push(values[vln].name);
                        this.getAggregatedHeaderData((this.valueAxis && (this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader) ? cMembers : rMembers), values[vln].name, undefined, false, (this.valueAxis && (this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader) ? 'column' : 'row'), values[vln].type, this.selectedHeaders.selectedHeader, vln);
                    }
                    break;
                case 'PercentageOfParentTotal':
                    {
                        var baseField = void 0;
                        this.selectedHeaders.values.push(values[vln].name);
                        if (values[vln].baseField) {
                            baseField = values[vln].baseField;
                        }
                        else if (this.valueAxis && (this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader) &&
                            columns.length > 0) {
                            baseField = columns[0].name;
                        }
                        else if (rows.length > 0) {
                            baseField = rows[0].name;
                        }
                        var isHeaderSelected = false;
                        for (var len = rows.length, i = 0; i < len; i++) {
                            if (rows[i].name === baseField) {
                                var level = i >= this.measureIndex ? i + 1 : i;
                                this.getAggregatedHeaderData(rMembers, values[vln].name, undefined, false, 'row', values[vln].type, this.selectedHeaders.selectedHeader, vln, level);
                                isHeaderSelected = true;
                                break;
                            }
                        }
                        if (!isHeaderSelected) {
                            for (var len = columns.length, i = 0; i < len; i++) {
                                if (columns[i].name === baseField) {
                                    var level = i;
                                    if (!this.valueAxis && !this.isLastHeaderHasMeasures) {
                                        level = i >= this.measureIndex ? i + 1 : i;
                                    }
                                    this.getAggregatedHeaderData(cMembers, values[vln].name, undefined, false, 'column', values[vln].type, this.selectedHeaders.selectedHeader, vln, level);
                                    break;
                                }
                            }
                        }
                    }
                    break;
            }
        }
    };
    PivotEngine.prototype.getAggregatedHeaderData = function (headers, name, baseItem, isChildren, type, aggregateType, selectedHeaders, vln, level) {
        for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
            var rln = headers_1[_i];
            switch (aggregateType) {
                case 'DifferenceFrom':
                case 'PercentageOfDifferenceFrom':
                    {
                        var levelName = rln.valueSort.levelName.toString().split(this.valueSortSettings.headerDelimiter);
                        if (levelName.indexOf(baseItem) !== -1) {
                            var actualHeaders = [];
                            if (!isChildren && type === 'row') {
                                for (var _a = 0, headers_2 = headers; _a < headers_2.length; _a++) {
                                    var header = headers_2[_a];
                                    if (header.level >= rln.level) {
                                        actualHeaders.push(header);
                                    }
                                }
                            }
                            selectedHeaders.push(this.updateSelectedHeaders(baseItem, rln.level, type, isChildren, name, aggregateType, rln.valueSort.levelName, (isChildren ? [rln] : (type === 'column' ? headers : actualHeaders)), vln + 1));
                            if (rln.members.length > 0) {
                                var isValuesAvail = false;
                                var members = [];
                                if (type === 'row') {
                                    for (var _b = 0, _c = rln.members; _b < _c.length; _b++) {
                                        var member = _c[_b];
                                        if (member.type === 'value' && member.members.length === 0) {
                                            isValuesAvail = true;
                                        }
                                        else {
                                            members.push(member);
                                            isValuesAvail = false;
                                            break;
                                        }
                                    }
                                }
                                if ((!isValuesAvail && members.length > 0) || type === 'column') {
                                    this.getAggregatedHeaderData(type === 'column' ? rln.members : members, name, baseItem, true, type, aggregateType, selectedHeaders[selectedHeaders.length - 1].childMembers, vln);
                                }
                            }
                        }
                        else if (rln.members.length > 0) {
                            this.getAggregatedHeaderData(rln.members, name, baseItem, false, type, aggregateType, selectedHeaders, vln);
                        }
                    }
                    break;
                case 'RunningTotals':
                case 'PercentageOfParentRowTotal':
                case 'PercentageOfParentColumnTotal':
                    {
                        if (rln.type === 'grand sum') {
                            selectedHeaders.push(this.updateSelectedHeaders(undefined, rln.level, type, false, name, aggregateType, rln.valueSort.levelName, headers, vln + 1));
                        }
                        else {
                            if (rln.members.length > 0) {
                                selectedHeaders.push(this.updateSelectedHeaders(undefined, rln.level, type, false, name, aggregateType, rln.valueSort.levelName, rln.members, vln + 1));
                                this.getAggregatedHeaderData(rln.members, name, undefined, false, type, aggregateType, selectedHeaders, vln);
                            }
                        }
                    }
                    break;
                case 'PercentageOfParentTotal':
                    {
                        if (rln.type !== 'grand sum') {
                            if ((rln.valueSort.levelName.split(this.valueSortSettings.headerDelimiter).length - 1) === level) {
                                if (rln.members.length > 0) {
                                    if (isChildren) {
                                        var aggregateHeaders = selectedHeaders[selectedHeaders.length - 1].aggregateHeaders;
                                        for (var _d = 0, _e = rln.members; _d < _e.length; _d++) {
                                            var member = _e[_d];
                                            aggregateHeaders.push(extend({}, member, null, true));
                                        }
                                    }
                                    else {
                                        var children = extend([], rln.members, null, true);
                                        selectedHeaders.push(this.updateSelectedHeaders(undefined, rln.level, type, false, name, aggregateType, rln.valueSort.levelName, children, vln + 1));
                                        var aggregateHeaders = selectedHeaders[selectedHeaders.length - 1].aggregateHeaders;
                                        aggregateHeaders.push(extend({}, rln, null, true));
                                    }
                                    this.getAggregatedHeaderData(rln.members, name, undefined, true, type, aggregateType, selectedHeaders, vln, level + 1);
                                }
                                else {
                                    if (!isChildren) {
                                        selectedHeaders.push(this.updateSelectedHeaders(undefined, rln.level, type, false, name, aggregateType, rln.valueSort.levelName, [rln], vln + 1));
                                    }
                                }
                            }
                            else if (rln.members.length > 0) {
                                this.getAggregatedHeaderData(rln.members, name, undefined, false, type, aggregateType, selectedHeaders, vln, level);
                            }
                        }
                    }
                    break;
            }
        }
    };
    PivotEngine.prototype.updateSelectedHeaders = function (baseItem, level, type, isChildren, name, aggregateType, levelName, headers, vCount) {
        var headerData = {
            name: baseItem,
            level: level,
            axis: type,
            isChild: isChildren,
            value: name,
            type: aggregateType,
            uniqueName: levelName,
            aggregateHeaders: extend([], headers, null, true),
            childMembers: [],
            valueCount: vCount
        };
        return headerData;
    };
    PivotEngine.prototype.applyAdvancedAggregate = function (rowheads, colheads, data) {
        this.aggregatedValueMatrix = [];
        if (this.selectedHeaders.values.length > 0) {
            var pivotIndex = {};
            var colIndex = [];
            var rowIndex = [];
            var isIndexFilled = false;
            for (var rlt = data.length, rln = 0; rln < rlt; rln++) {
                if (data[rln] !== undefined && data[rln][0] !== undefined) {
                    if (!isIndexFilled) {
                        for (var clt = data[rln].length, cln = 0; cln < clt; cln++) {
                            var actualText = data[rln][cln].actualText;
                            if (data[rln][cln].axis === 'value' &&
                                this.selectedHeaders.values.indexOf(actualText) !== -1) {
                                colIndex.push(cln);
                                isIndexFilled = true;
                            }
                        }
                    }
                    var isTotal = this.showSubTotalsAtBottom && data[rln][0].isDrilled &&
                        data[rln][0].hasChild;
                    if (!isTotal) {
                        if (colIndex.length > 0 && data[rln][colIndex[0]].axis === 'value' &&
                            this.selectedHeaders.values.indexOf(data[rln][colIndex[0]].actualText) !== -1) {
                            rowIndex.push(rln);
                            for (var _i = 0, colIndex_1 = colIndex; _i < colIndex_1.length; _i++) {
                                var index = colIndex_1[_i];
                                pivotIndex[rln + ',' + index] = [rln, index];
                            }
                        }
                    }
                }
            }
            this.updateAggregates(rowheads, colheads, data, this.selectedHeaders.selectedHeader, colIndex, rowIndex, pivotIndex);
            var indexCollection = Object.keys(pivotIndex);
            for (var _a = 0, indexCollection_1 = indexCollection; _a < indexCollection_1.length; _a++) {
                var index = indexCollection_1[_a];
                var currentSet = data[pivotIndex[index][0]][pivotIndex[index][1]];
                // currentSet.formattedText = '0';
                currentSet.formattedText = (this.selectedHeaders.selectedHeader.length > 0 ? this.emptyCellTextContent : '#N/A');
                if (!this.aggregatedValueMatrix[pivotIndex[index][0]]) {
                    this.aggregatedValueMatrix[pivotIndex[index][0]] = [];
                }
                this.aggregatedValueMatrix[pivotIndex[index][0]][pivotIndex[index][1]] = 0;
            }
            this.updatePivotValues(true);
        }
        else {
            return;
        }
    };
    PivotEngine.prototype.updateAggregates = function (rowheads, colheads, data, selectedHeaders, colIndex, rowIndex, pivotIndex) {
        for (var _i = 0, selectedHeaders_1 = selectedHeaders; _i < selectedHeaders_1.length; _i++) {
            var headers = selectedHeaders_1[_i];
            var selectedHeaderCollection = headers.aggregateHeaders;
            var name_3 = headers.value;
            // let valueCount: number = (this.valueAxis && (this.isMutiMeasures || this.dataSourceSettings.alwaysShowValueHeader) ? headers.valueCount : 0);
            var aggregateType = headers.type;
            var uniqueName = headers.uniqueName;
            var axis = headers.axis;
            var isRowBaseField = axis === 'row' ? true : false;
            var activeValues = void 0;
            var indexCollection = [];
            var activeColumn = [];
            var columnHeaders = [];
            var rowindexCollection = [];
            var selectedRowValues = [];
            var selectedColumnValues = [];
            if ((['DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentTotal', 'RunningTotals']).indexOf(headers.type) !== -1) {
                if (isRowBaseField) {
                    if (headers.type !== 'RunningTotals') {
                        for (var _a = 0, rowIndex_1 = rowIndex; _a < rowIndex_1.length; _a++) {
                            var rln = rowIndex_1[_a];
                            if (rowheads[rln] !== undefined) {
                                if (rowheads[rln].valueSort[uniqueName]) {
                                    activeValues = rowheads[rln];
                                    if (this.valueAxis === 0 || (this.valueAxis && data[rln] && data[rln][1] &&
                                        data[rln][1].actualText === name_3)) {
                                        selectedRowValues = data[rln];
                                    }
                                    else {
                                        selectedRowValues = [];
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    for (var len_5 = data.length, i = 0; i < len_5; i++) {
                        if (data[i] !== undefined && data[i][0] === undefined) {
                            columnHeaders.push(data[i]);
                        }
                        else {
                            break;
                        }
                    }
                    var len = columnHeaders.length;
                    while (len--) {
                        var axisObj = columnHeaders[len][colIndex[0]];
                        var cLevelName = axisObj.actualText;
                        if (this.selectedHeaders.values.indexOf(cLevelName) === -1) {
                            activeColumn = columnHeaders[len];
                            len = 0;
                        }
                    }
                    if (headers.type !== 'RunningTotals') {
                        for (var clt = activeColumn.length, cln = 0; cln < clt; cln++) {
                            var isSelectedColumn = false;
                            if (activeColumn[cln] !== undefined && activeColumn[cln].valueSort[uniqueName]) {
                                activeValues = activeColumn[cln];
                                for (var len_6 = data.length, i = 0; i < len_6; i++) {
                                    var axisObj = data[i];
                                    if (axisObj !== undefined && axisObj[0] !== undefined && axisObj[cln].axis === 'value' && this.selectedHeaders.values.indexOf(axisObj[cln].actualText) !== -1) {
                                        isSelectedColumn = true;
                                        selectedColumnValues[i] = axisObj[cln];
                                        rowindexCollection.push(i);
                                    }
                                }
                                if (isSelectedColumn) {
                                    break;
                                }
                            }
                        }
                        if (selectedColumnValues.length === 0 && rowindexCollection.length === 0) {
                            for (var clt = activeColumn.length, cln = 0; cln < clt; cln++) {
                                var isSelectedColumn = false;
                                if (activeColumn[cln] !== undefined &&
                                    activeColumn[cln].valueSort.levelName.indexOf(uniqueName) === 0) {
                                    activeValues = activeColumn[cln];
                                    for (var lnt = data.length, j = 0; j < lnt; j++) {
                                        var axisObj = data[j];
                                        if (axisObj !== undefined && axisObj[0] !== undefined && axisObj[cln].axis === 'value' && this.selectedHeaders.values.indexOf(axisObj[cln].actualText) !== -1) {
                                            isSelectedColumn = true;
                                            // selectedColumnValues[i as number] = axisObj[cln as number] as IAxisSet;
                                            rowindexCollection.push(j);
                                        }
                                    }
                                    if (isSelectedColumn) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            switch (headers.type) {
                case 'DifferenceFrom':
                case 'PercentageOfDifferenceFrom':
                    {
                        var isChildren = headers.isChild;
                        if (isRowBaseField) {
                            if (!isChildren) {
                                for (var _b = 0, selectedHeaderCollection_1 = selectedHeaderCollection; _b < selectedHeaderCollection_1.length; _b++) {
                                    var item = selectedHeaderCollection_1[_b];
                                    for (var _c = 0, rowIndex_2 = rowIndex; _c < rowIndex_2.length; _c++) {
                                        var rln = rowIndex_2[_c];
                                        if (rowheads[rln] !== undefined) {
                                            if (rowheads[rln].valueSort[item.valueSort.levelName] &&
                                                rowheads[rln].level === activeValues.level && rowheads[rln].type !== 'grand sum') {
                                                for (var _d = 0, colIndex_2 = colIndex; _d < colIndex_2.length; _d++) {
                                                    var index = colIndex_2[_d];
                                                    var currentSet = data[rln][index];
                                                    if (currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                        indexCollection.push([rln, index]);
                                                        if (pivotIndex[rln + ',' + index]) {
                                                            delete pivotIndex[rln + ',' + index];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                var uniqueLevelName = uniqueName.split(this.valueSortSettings.headerDelimiter);
                                for (var _e = 0, rowIndex_3 = rowIndex; _e < rowIndex_3.length; _e++) {
                                    var rlen = rowIndex_3[_e];
                                    if (rowheads[rlen] !== undefined) {
                                        var levelName = rowheads[rlen].valueSort.levelName.split(this.valueSortSettings.headerDelimiter);
                                        if (levelName.indexOf(uniqueLevelName[uniqueLevelName.length - 1]) !== -1 && activeValues &&
                                            rowheads[rlen].level === activeValues.level) {
                                            for (var _f = 0, colIndex_3 = colIndex; _f < colIndex_3.length; _f++) {
                                                var index = colIndex_3[_f];
                                                var currentSet = data[rlen][index];
                                                if (currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                    indexCollection.push([rlen, index]);
                                                    if (pivotIndex[rlen + ',' + index]) {
                                                        delete pivotIndex[rlen + ',' + index];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            for (var _g = 0, indexCollection_2 = indexCollection; _g < indexCollection_2.length; _g++) {
                                var index = indexCollection_2[_g];
                                var currentSet = data[index[0]][index[1]];
                                var actualValue = isNullOrUndefined(selectedRowValues[index[1]].actualValue) ? 0 : selectedRowValues[index[1]].actualValue;
                                // let cVal: number = currentSet.value - (selectedRowValues[index[1]] as IAxisSet).value;
                                var cVal = (isNullOrUndefined(currentSet.actualValue) ? 0 : currentSet.actualValue) - actualValue;
                                cVal = isNaN(cVal) ? 0 : (currentSet.value === 0 && selectedRowValues[index[1]].value === 0) ? 0 : cVal;
                                if (!this.aggregatedValueMatrix[index[0]]) {
                                    this.aggregatedValueMatrix[index[0]] = [];
                                }
                                if (aggregateType === 'DifferenceFrom') {
                                    this.aggregatedValueMatrix[index[0]][index[1]] = cVal;
                                    currentSet.formattedText = cVal === 0 ? this.emptyCellTextContent :
                                        this.getFormattedValue(cVal, name_3).formattedText;
                                }
                                else {
                                    // cVal = ((selectedRowValues[index[1]] as IAxisSet).value === 0 ?
                                    // 0 : (cVal / (selectedRowValues[index[1]] as IAxisSet).value));
                                    cVal = (actualValue === 0 ? 0 : (cVal / actualValue));
                                    this.aggregatedValueMatrix[index[0]][index[1]] = cVal;
                                    currentSet.formattedText = currentSet.showSubTotals ? (cVal !== 0 ? this.globalize.formatNumber(cVal, { format: 'P', maximumFractionDigits: this.getPercentFormat(this.formatFields, currentSet.actualText) }) : this.emptyCellTextContent) : currentSet.formattedText;
                                }
                            }
                        }
                        else {
                            if (!isChildren) {
                                for (var _h = 0, selectedHeaderCollection_2 = selectedHeaderCollection; _h < selectedHeaderCollection_2.length; _h++) {
                                    var item = selectedHeaderCollection_2[_h];
                                    for (var clt = activeColumn.length, cln = 0; cln < clt; cln++) {
                                        var isSelectedColumn = false;
                                        if (activeColumn[cln] !== undefined &&
                                            activeColumn[cln].valueSort[item.valueSort.levelName] && activeValues &&
                                            activeColumn[cln].level === activeValues.level && activeColumn[cln].type !== 'grand sum') {
                                            for (var _j = 0, rowindexCollection_1 = rowindexCollection; _j < rowindexCollection_1.length; _j++) {
                                                var index = rowindexCollection_1[_j];
                                                var currentSet = data[index][cln];
                                                if (currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                    isSelectedColumn = true;
                                                    indexCollection.push([index, cln]);
                                                    if (pivotIndex[index + ',' + cln]) {
                                                        delete pivotIndex[index + ',' + cln];
                                                    }
                                                }
                                            }
                                            if (isSelectedColumn) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                var uniqueLevelName = uniqueName.split(this.valueSortSettings.headerDelimiter);
                                for (var clt = activeColumn.length, clen = 0; clen < clt; clen++) {
                                    var isSelectedColumn = false;
                                    if (activeColumn[clen] !== undefined) {
                                        var levelName = activeColumn[clen].valueSort.levelName.split(this.valueSortSettings.headerDelimiter);
                                        if (levelName.indexOf(uniqueLevelName[uniqueLevelName.length - 1]) !== -1 &&
                                            activeColumn[clen].level === activeValues.level) {
                                            for (var _k = 0, rowindexCollection_2 = rowindexCollection; _k < rowindexCollection_2.length; _k++) {
                                                var index = rowindexCollection_2[_k];
                                                var currentSet = data[index][clen];
                                                if (currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                    isSelectedColumn = true;
                                                    indexCollection.push([index, clen]);
                                                    if (pivotIndex[index + ',' + clen]) {
                                                        delete pivotIndex[index + ',' + clen];
                                                    }
                                                }
                                            }
                                            if (isSelectedColumn) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            var selectedColumn = void 0;
                            if (selectedColumnValues.length === 0) {
                                selectedColumn = this.getSelectedColumn(headers.uniqueName, colheads);
                            }
                            for (var _l = 0, indexCollection_3 = indexCollection; _l < indexCollection_3.length; _l++) {
                                var index = indexCollection_3[_l];
                                var currentSet = data[index[0]][index[1]];
                                var selectedColumnValue = 0;
                                if (selectedColumnValues.length === 0) {
                                    var selectedRow = this.getSelectedRow(currentSet.rowHeaders, rowheads);
                                    selectedColumnValue = this.getAggregateValue(selectedRow.index, selectedColumn.indexObject, this.fieldList[name_3].index, headers.type, false);
                                }
                                else {
                                    selectedColumnValue = selectedColumnValues[index[0]].value;
                                }
                                var cVal = currentSet.value - selectedColumnValue;
                                cVal = isNaN(cVal) ? 0 : cVal;
                                if (!this.aggregatedValueMatrix[index[0]]) {
                                    this.aggregatedValueMatrix[index[0]] = [];
                                }
                                if (aggregateType === 'DifferenceFrom') {
                                    currentSet.formattedText = cVal === 0 ? this.emptyCellTextContent :
                                        this.getFormattedValue(cVal, name_3).formattedText;
                                    this.aggregatedValueMatrix[index[0]][index[1]] = cVal;
                                }
                                else {
                                    cVal = (selectedColumnValues[index[0]].value === 0 ?
                                        0 : (cVal / selectedColumnValues[index[0]].value));
                                    currentSet.formattedText = (cVal !== 0 ? this.globalize.formatNumber(cVal, { format: 'P', maximumFractionDigits: this.getPercentFormat(this.formatFields, currentSet.actualText) }) : this.emptyCellTextContent);
                                    this.aggregatedValueMatrix[index[0]][index[1]] = cVal;
                                }
                            }
                        }
                        if (headers.childMembers.length > 0) {
                            this.updateAggregates(rowheads, colheads, data, headers.childMembers, colIndex, rowIndex, pivotIndex);
                        }
                    }
                    break;
                case 'PercentageOfParentRowTotal':
                case 'PercentageOfParentColumnTotal':
                case 'PercentageOfParentTotal':
                    {
                        if (isRowBaseField) {
                            for (var _m = 0, selectedHeaderCollection_3 = selectedHeaderCollection; _m < selectedHeaderCollection_3.length; _m++) {
                                var item = selectedHeaderCollection_3[_m];
                                for (var _o = 0, rowIndex_4 = rowIndex; _o < rowIndex_4.length; _o++) {
                                    var i = rowIndex_4[_o];
                                    if (rowheads[i] !== undefined) {
                                        if (rowheads[i].valueSort[item.valueSort.levelName] &&
                                            rowheads[i].level === item.level) {
                                            for (var _p = 0, colIndex_4 = colIndex; _p < colIndex_4.length; _p++) {
                                                var index = colIndex_4[_p];
                                                var currentSet = data[i][index];
                                                if (currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                    indexCollection.push([i, index]);
                                                    if (pivotIndex[i + ',' + index]) {
                                                        delete pivotIndex[i + ',' + index];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            for (var _q = 0, indexCollection_4 = indexCollection; _q < indexCollection_4.length; _q++) {
                                var i = indexCollection_4[_q];
                                var currentSet = data[i[0]][i[1]];
                                // let cVal: number = currentSet.value / (selectedRowValues[i[1]] as IAxisSet).value;
                                var selectedRowValue = 0;
                                if (selectedRowValues.length === 0 && activeValues) {
                                    selectedRowValue = this.getAggregateValue(activeValues.index, colheads[i[1] - 1].indexObject, this.fieldList[name_3].index, headers.type, false);
                                }
                                else {
                                    selectedRowValue = selectedRowValues[i[1]] ? selectedRowValues[i[1]].actualValue : 0;
                                }
                                var cVal = currentSet.value / selectedRowValue;
                                cVal = isNaN(cVal) ? 0 : cVal;
                                currentSet.formattedText = currentSet.showSubTotals ? (cVal !== 0 ? this.globalize.formatNumber(cVal, { format: 'P', maximumFractionDigits: this.getPercentFormat(this.formatFields, currentSet.actualText) }) : this.emptyCellTextContent) : currentSet.formattedText;
                                if (!this.aggregatedValueMatrix[i[0]]) {
                                    this.aggregatedValueMatrix[i[0]] = [];
                                }
                                this.aggregatedValueMatrix[i[0]][i[1]] = cVal;
                            }
                        }
                        else {
                            for (var _r = 0, selectedHeaderCollection_4 = selectedHeaderCollection; _r < selectedHeaderCollection_4.length; _r++) {
                                var item = selectedHeaderCollection_4[_r];
                                for (var clt = activeColumn.length, j = 0; j < clt; j++) {
                                    var isSelectedColumn = false;
                                    if (activeColumn[j] !== undefined &&
                                        activeColumn[j].valueSort[item.valueSort.levelName]) {
                                        for (var _s = 0, rowindexCollection_3 = rowindexCollection; _s < rowindexCollection_3.length; _s++) {
                                            var index = rowindexCollection_3[_s];
                                            var isTotals = this.showSubTotalsAtBottom && data[index][0].isDrilled && data[index][0].hasChild;
                                            if (!isTotals) {
                                                var currentSet = data[index][j];
                                                if (currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                    isSelectedColumn = true;
                                                    indexCollection.push([index, j]);
                                                    if (pivotIndex[index + ',' + j]) {
                                                        delete pivotIndex[index + ',' + j];
                                                    }
                                                }
                                            }
                                        }
                                        if (isSelectedColumn) {
                                            break;
                                        }
                                    }
                                }
                            }
                            var selectedCol = void 0;
                            if (selectedColumnValues.length === 0) {
                                selectedCol = this.getSelectedColumn(headers.uniqueName, colheads);
                            }
                            for (var _t = 0, indexCollection_5 = indexCollection; _t < indexCollection_5.length; _t++) {
                                var i = indexCollection_5[_t];
                                var currentSet = data[i[0]][i[1]];
                                var selectedColValue = 0;
                                if (selectedColumnValues.length === 0) {
                                    var selectedRow = this.getSelectedRow(currentSet.rowHeaders, rowheads);
                                    selectedColValue = this.getAggregateValue(selectedRow.index, selectedCol.indexObject, this.fieldList[name_3].index, headers.type, false);
                                }
                                else {
                                    selectedColValue = selectedColumnValues[i[0]].value;
                                }
                                var val = currentSet.value / selectedColValue;
                                val = isNaN(val) ? 0 : val;
                                currentSet.formattedText = (val !== 0 ? this.globalize.formatNumber(val, { format: 'P', maximumFractionDigits: this.getPercentFormat(this.formatFields, currentSet.actualText) }) : this.emptyCellTextContent);
                                if (!this.aggregatedValueMatrix[i[0]]) {
                                    this.aggregatedValueMatrix[i[0]] = [];
                                }
                                this.aggregatedValueMatrix[i[0]][i[1]] = val;
                            }
                        }
                    }
                    break;
                case 'RunningTotals':
                    {
                        if (isRowBaseField) {
                            for (var _u = 0, colIndex_5 = colIndex; _u < colIndex_5.length; _u++) {
                                var index = colIndex_5[_u];
                                var cVal = 0;
                                for (var _v = 0, selectedHeaderCollection_5 = selectedHeaderCollection; _v < selectedHeaderCollection_5.length; _v++) {
                                    var item = selectedHeaderCollection_5[_v];
                                    for (var _w = 0, rowIndex_5 = rowIndex; _w < rowIndex_5.length; _w++) {
                                        var rlen = rowIndex_5[_w];
                                        if (rowheads[rlen] !== undefined) {
                                            var currentSet = data[rlen][index];
                                            if (rowheads[rlen] !== undefined && rowheads[rlen].valueSort[item.valueSort.levelName] && rowheads[rlen].level === item.level && currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                if (rowheads[rlen].type !== 'grand sum') {
                                                    cVal += (!currentSet.showSubTotals && !(!isNullOrUndefined(currentSet.actualValue) && isNaN(currentSet.actualValue))) ?
                                                        currentSet.actualValue : (!isNullOrUndefined(currentSet.value) &&
                                                        !isNaN(currentSet.value)) ? currentSet.value : null;
                                                    currentSet.formattedText = currentSet.showSubTotals ? (cVal === 0 &&
                                                        (currentSet.actualValue && currentSet.actualValue !== 0) ? '' :
                                                        this.getFormattedValue(cVal, name_3).formattedText) : currentSet.formattedText;
                                                    if (!this.aggregatedValueMatrix[rlen]) {
                                                        this.aggregatedValueMatrix[rlen] = [];
                                                    }
                                                    this.aggregatedValueMatrix[rlen][index] = cVal;
                                                }
                                                if (pivotIndex[rlen + ',' + index]) {
                                                    delete pivotIndex[rlen + ',' + index];
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (var _x = 0, rowIndex_6 = rowIndex; _x < rowIndex_6.length; _x++) {
                                var rln = rowIndex_6[_x];
                                if (data[rln] !== undefined) {
                                    var cVal = 0;
                                    for (var _y = 0, selectedHeaderCollection_6 = selectedHeaderCollection; _y < selectedHeaderCollection_6.length; _y++) {
                                        var item = selectedHeaderCollection_6[_y];
                                        var subTotal = (rowheads[rln].hasChild && rowheads[rln].isDrilled &&
                                            ((!isNullOrUndefined(rowheads[rln].showSubTotals) &&
                                                !rowheads[rln].showSubTotals) || !this.dataSourceSettings.showSubTotals ||
                                                !this.dataSourceSettings.showRowSubTotals));
                                        for (var clt = activeColumn.length, cln = 0; cln < clt; cln++) {
                                            var currentSet = data[rln][cln];
                                            if (activeColumn[cln] !== undefined &&
                                                activeColumn[cln].valueSort[item.valueSort.levelName] &&
                                                currentSet.axis === 'value' && currentSet.actualText === name_3) {
                                                if (activeColumn[cln].type !== 'grand sum') {
                                                    if (!isNullOrUndefined(currentSet.value)) {
                                                        cVal += currentSet.value;
                                                    }
                                                    currentSet.formattedText = subTotal ? '' : this.getFormattedValue(cVal, name_3).formattedText;
                                                    if (!this.aggregatedValueMatrix[rln]) {
                                                        this.aggregatedValueMatrix[rln] = [];
                                                    }
                                                    this.aggregatedValueMatrix[rln][cln] = cVal;
                                                }
                                                if (pivotIndex[rln + ',' + cln]) {
                                                    delete pivotIndex[rln + ',' + cln];
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        }
    };
    PivotEngine.prototype.getSelectedColumn = function (name, colheads) {
        var set = { axis: 'column', index: [], indexObject: {} };
        for (var _i = 0, colheads_1 = colheads; _i < colheads_1.length; _i++) {
            var head = colheads_1[_i];
            if (head && head.valueSort && head.valueSort.levelName.indexOf(name) === 0) {
                set.index = set.index.concat(head.index).sort(function (a, b) { return a - b; });
                set.indexObject = __assign({}, set.indexObject, head.indexObject);
            }
        }
        return set;
    };
    PivotEngine.prototype.getSelectedRow = function (name, rowheads) {
        for (var _i = 0, rowheads_1 = rowheads; _i < rowheads_1.length; _i++) {
            var head = rowheads_1[_i];
            if (head) {
                if (head.valueSort && head.valueSort.levelName === name) {
                    return head;
                }
                else if (name === '' && head.type === 'grand sum') {
                    return head;
                }
            }
        }
        return null;
    };
    PivotEngine.prototype.recursiveRowData = function (rows, reformAxis, columns, tnum, data, vlt, isLeastNode, rln, vln, level, rTotal, cTotal) {
        if (!isLeastNode) {
            this.getTableData(reformAxis[tnum].members, reformAxis, columns, tnum, data, vlt, level + 1, rTotal, cTotal);
        }
        if (this.showSubTotalsAtBottom && (!isNullOrUndefined(rows[rln].showSubTotals) ? rows[rln].showSubTotals : true)) {
            this.insertRowSubTotals(reformAxis, columns, tnum, data, vlt, level, rTotal, cTotal);
        }
        if (!this.isPagingOrVirtualizationEnabled) {
            reformAxis[tnum].members = [];
        }
    };
    PivotEngine.prototype.updateRowData = function (rows, columns, tnum, data, vln, rln, cln, dln, actCnt, rTotal, cTotal) {
        var mPos = this.fieldList[this.dataSourceSettings.values[vln].name].index;
        var aggregate = this.fieldList[this.dataSourceSettings.values[vln].name].aggregateType;
        var field = this.dataSourceSettings.values[vln].name;
        var gTotalIndex = [];
        var totalValues = {};
        var value = 0;
        var actualValue = 0;
        // let isLeast: boolean = isLeastNode && (vln === vlt - 1);
        switch (aggregate) {
            case 'Index':
                {
                    gTotalIndex = [
                        [rows[rln], columns[cln]], [rows[rln], cTotal],
                        [rTotal, columns[cln]], [rTotal, cTotal]
                    ];
                    var valueContent = ['cVal', 'rTotalVal', 'cTotalVal', 'gTotalVal'];
                    var i = 0;
                    for (var _i = 0, gTotalIndex_1 = gTotalIndex; _i < gTotalIndex_1.length; _i++) {
                        var rIndex = gTotalIndex_1[_i];
                        totalValues[valueContent[i]] = this.getAggregateValue((rIndex[0]).index, (rIndex[1]).indexObject, mPos, aggregate, i === 0 ? false : true);
                        i++;
                    }
                    var val = ((totalValues.cVal) * (totalValues.gTotalVal)) / ((totalValues.rTotalVal) * (totalValues.cTotalVal));
                    value = (rows[rln].members.length > 0 && rows[rln].hasChild && rows[rln].isDrilled &&
                        ((!isNullOrUndefined(rows[rln].showSubTotals) && !rows[rln].showSubTotals) ||
                            !this.dataSourceSettings.showRowSubTotals || !this.dataSourceSettings.showSubTotals)) ? undefined :
                        (isNullOrUndefined(totalValues.cVal) ? totalValues.cVal : (isNaN(val) ? 0 : val));
                    actualValue = (isNullOrUndefined(totalValues.cVal) ? totalValues.cVal : (isNaN(val) ? 0 : val));
                }
                break;
            case 'PercentageOfGrandTotal':
            case 'PercentageOfColumnTotal':
            case 'PercentageOfRowTotal':
                {
                    gTotalIndex = [[rows[rln], columns[cln]]];
                    gTotalIndex.push((aggregate === 'PercentageOfGrandTotal' ?
                        [rTotal, cTotal] : (aggregate === 'PercentageOfColumnTotal' ? [rTotal, columns[cln]] :
                        [rows[rln], cTotal])));
                    var valueContent = ['cVal', 'gTotalVal'];
                    var i = 0;
                    for (var _a = 0, gTotalIndex_2 = gTotalIndex; _a < gTotalIndex_2.length; _a++) {
                        var rIndex = gTotalIndex_2[_a];
                        totalValues[valueContent[i]] = this.getAggregateValue((rIndex[0]).index, (rIndex[1]).indexObject, mPos, aggregate, i === 0 ? false : true);
                        i++;
                    }
                    var val = ((totalValues.cVal) / (totalValues.gTotalVal));
                    value = (rows[rln].members.length > 0 && rows[rln].hasChild && rows[rln].isDrilled &&
                        ((!isNullOrUndefined(rows[rln].showSubTotals) && !rows[rln].showSubTotals) ||
                            !this.dataSourceSettings.showSubTotals || !this.dataSourceSettings.showRowSubTotals)) ? undefined :
                        (isNullOrUndefined(totalValues.cVal) ? totalValues.cVal : (isNaN(val) ? 0 : val));
                    actualValue = (isNullOrUndefined(totalValues.cVal) ? totalValues.cVal : (isNaN(val) ? 0 : val));
                }
                break;
            default:
                {
                    var val = this.getAggregateValue(rows[rln].index, columns[cln].indexObject, mPos, aggregate, false);
                    value = (rows[rln].members.length > 0 && rows[rln].hasChild && rows[rln].isDrilled &&
                        ((!isNullOrUndefined(rows[rln].showSubTotals) && !rows[rln].showSubTotals) ||
                            !this.dataSourceSettings.showSubTotals || !this.dataSourceSettings.showRowSubTotals)) ? undefined : val;
                    actualValue = val;
                }
                break;
        }
        var cellDetails = {
            fieldName: this.dataSourceSettings.values[vln].name, row: rows[rln], column: columns[cln],
            value: value,
            cellSets: this.getValueCellInfo ? this.getCellSet(this.rawIndexObject) : [],
            rowCellType: (rows[rln].hasChild && rows[rln].isDrilled ? 'subTotal' : rows[rln].type === 'grand sum' ? 'grandTotal' : 'value'),
            columnCellType: (columns[cln].hasChild && columns[cln].isDrilled ? 'subTotal' : columns[cln].type === 'grand sum' ? 'grandTotal' : 'value'),
            aggregateType: aggregate, skipFormatting: false
        };
        if (this.getValueCellInfo) {
            this.getValueCellInfo(cellDetails);
        }
        value = cellDetails.value;
        var isSum = rows[rln].hasChild || columns[cln].hasChild || rows[rln].type === 'grand sum' ||
            columns[cln].type === 'grand sum' || (this.showSubTotalsAtBottom && rows[rln].isSum);
        var isGrand = rows[rln].type === 'grand sum' || columns[cln].type === 'grand sum';
        var subTotal = (rows[rln].members.length > 0 && rows[rln].hasChild &&
            rows[rln].isDrilled && ((!isNullOrUndefined(rows[rln].showSubTotals) &&
            !rows[rln].showSubTotals) || !this.dataSourceSettings.showSubTotals || !this.dataSourceSettings.showRowSubTotals));
        var formattedText = subTotal ?
            '' : (value === undefined) ? this.emptyCellTextContent :
            (aggregate === 'Count' || aggregate === 'DistinctCount') ? value.toLocaleString() :
                this.getFormattedValue(value, field).formattedText;
        if (!isNaN(value) && !isNullOrUndefined(value) && (['PercentageOfGrandTotal', 'PercentageOfColumnTotal', 'PercentageOfRowTotal']).indexOf(aggregate) >= 0) {
            formattedText = this.globalize.formatNumber(value, { format: 'P', maximumFractionDigits: this.getPercentFormat(this.formatFields, cellDetails.fieldName) });
        }
        else if (!subTotal &&
            isNaN(value) && !isNullOrUndefined(value) &&
            (['PopulationStDev', 'SampleStDev', 'PopulationVar', 'SampleVar']).indexOf(aggregate) !== -1) {
            formattedText = '#DIV/0!';
            value = 0;
        }
        //dln = data[tnum as number].length;
        formattedText = (cellDetails.skipFormatting ? isNullOrUndefined(value) ?
            this.emptyCellTextContent : value.toString() : formattedText);
        data[tnum][dln] = this.valueContent[actCnt][dln] = {
            axis: 'value', actualText: field, indexObject: this.isDrillThrough ? this.rawIndexObject : {},
            rowHeaders: rows[rln].type === 'grand sum' ? '' : rows[rln].valueSort.levelName,
            columnHeaders: columns[cln].type === 'grand sum' ? '' : columns[cln].valueSort.levelName,
            formattedText: formattedText, value: value,
            hierarchyName: columns[cln].hierarchyName,
            actualValue: actualValue,
            rowIndex: tnum, colIndex: dln, isSum: isSum, isGrandSum: isGrand, showSubTotals: !subTotal
        };
        this.rawIndexObject = {};
    };
    PivotEngine.prototype.getCellSet = function (rawIndexObject) {
        var currentCellSets = [];
        var keys = Object.keys(rawIndexObject);
        for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
            var index = keys_3[_i];
            if (this.data[parseInt(index, 10)]) {
                currentCellSets.push(this.data[parseInt(index, 10)]);
            }
        }
        return currentCellSets;
    };
    PivotEngine.prototype.updateValueMembers = function (hasMeasureIndex, headerInfo, levelInfo, columnHeaders, axis, vcnt, levelIndex) {
        var levelName = levelInfo && !isNullOrUndefined(levelInfo.levelName) ? levelInfo.levelName.toString() : undefined;
        var uniqueName = levelInfo && !isNullOrUndefined(levelInfo.uniqueName) ? levelInfo.uniqueName.toString() : undefined;
        if (hasMeasureIndex) {
            for (var vln = 0; vln < vcnt; vln++) {
                var field = this.dataSourceSettings.values[vln];
                var name_4 = field.caption ? field.caption : field.name;
                var calObj = {
                    axis: this.valueAxis ? 'row' : 'column',
                    rowIndex: !this.valueAxis ? (headerInfo && levelIndex <= headerInfo.rowIndex ?
                        (headerInfo.rowIndex + 1) : levelIndex) : 0,
                    actualText: field.name,
                    formattedText: name_4,
                    level: 0,
                    valueSort: {},
                    // colIndex: (tnum) + 1 + vln,
                    // rowIndex: this.measureIndex,
                    members: [],
                    type: this.valueAxis ? 'value' : (headerInfo ? headerInfo.type : null),
                    index: !this.valueAxis && headerInfo ? headerInfo.index : null,
                    indexObject: !this.valueAxis && headerInfo ? headerInfo.indexObject : null
                };
                if (axis.length > 0) {
                    calObj.showSubTotals = field.showSubTotals;
                }
                var vData = calObj.valueSort;
                vData.axis = !this.valueAxis ? field.name : undefined;
                vData[(levelName ? (levelName + this.valueSortSettings.headerDelimiter) : '') + name_4] = 1;
                vData[(uniqueName ? (uniqueName + this.valueSortSettings.headerDelimiter) : '') + field.name] = 1;
                vData.levelName = (levelName ? (levelName + this.valueSortSettings.headerDelimiter) : '') + name_4;
                vData.uniqueName = (uniqueName ? (uniqueName + this.valueSortSettings.headerDelimiter) : '') + field.name;
                columnHeaders.push(calObj);
                this.updateValueMembers(false, headerInfo, vData, calObj.members, axis, vcnt, levelIndex + 1);
            }
        }
        else {
            for (var rln = 0, rlt = axis.length; rln < rlt; rln++) {
                var header = PivotUtil.frameHeaderWithKeys(axis[rln]);
                header.members = [];
                header.rowIndex = !this.valueAxis ? (levelIndex < 0 ? 0 : levelIndex) : header.rowIndex;
                var hData = {};
                hData.axis = header.valueSort.axis;
                hData[(levelName ? (levelName + this.valueSortSettings.headerDelimiter) : '') + header.formattedText] = 1;
                hData[(uniqueName ? (uniqueName + this.valueSortSettings.headerDelimiter) : '') + header.actualText] = 1;
                hData.levelName = (levelName ? (levelName + this.valueSortSettings.headerDelimiter) : '') + header.formattedText;
                hData.uniqueName = (uniqueName ? (uniqueName + this.valueSortSettings.headerDelimiter) : '') + header.actualText;
                header.hierarchyName = header.valueSort.uniqueName;
                header.valueSort = hData;
                var drillInfo = hData.axis + this.valueSortSettings.headerDelimiter + hData.levelName;
                var isFieldValueHeader = this.fieldList[hData.axis];
                if (header.isDrilled && (((this.isExpandAll || isFieldValueHeader.expandAll) &&
                    this.fieldDrillCollection[drillInfo]) || ((!this.isExpandAll && !isFieldValueHeader.expandAll) &&
                    !this.fieldDrillCollection[drillInfo]))) {
                    header.isDrilled = false;
                }
                columnHeaders.push(header);
                if (header.isDrilled && axis[rln].members.length > 0) {
                    if (this.valueAxis && levelIndex < this.measureIndex && this.measureIndex !== (levelIndex + 1) && (!(axis[rln].hasChild &&
                        ((!isNullOrUndefined(axis[rln].showSubTotals) && !axis[rln].showSubTotals) ||
                            !this.dataSourceSettings.showSubTotals || !this.dataSourceSettings.showRowSubTotals)))) {
                        this.updateValueMembers(true, header, hData, columnHeaders[columnHeaders.length - 1].members, [], vcnt, levelIndex);
                    }
                    this.updateValueMembers(this.measureIndex === (levelIndex + 1), header, hData, columnHeaders[columnHeaders.length - 1].members, axis[rln].members, vcnt, levelIndex + 1);
                    if (!this.valueAxis && levelIndex < this.measureIndex && this.measureIndex !== (levelIndex + 1) &&
                        (!(axis[rln].hasChild && ((!isNullOrUndefined(axis[rln].showSubTotals) &&
                            !axis[rln].showSubTotals) || !this.dataSourceSettings.showSubTotals ||
                            !this.dataSourceSettings.showColumnSubTotals)))) {
                        this.updateValueMembers(true, header, hData, columnHeaders[columnHeaders.length - 1].members, [], vcnt, levelIndex);
                    }
                }
                else if (levelIndex < this.measureIndex) {
                    this.updateValueMembers(true, header, hData, columnHeaders[columnHeaders.length - 1].members, [], vcnt, levelIndex);
                }
            }
        }
    };
    PivotEngine.prototype.reArrangeValueMember = function (member) {
        var valueAxis = [];
        for (var _i = 0, member_1 = member; _i < member_1.length; _i++) {
            var axis = member_1[_i];
            if (this.valueAxisFields[axis.actualText]) {
                valueAxis[valueAxis.length] = axis;
            }
        }
        return valueAxis.concat(member).slice(0, member.length);
    };
    PivotEngine.prototype.frameDefinedHeaderData = function (axis, reformAxis, data, levelIndex, tnum, vcnt) {
        // let sortText: string = this.valueSortSettings.headerText;
        for (var rln = 0, rlt = axis.length; rln < rlt; rln++) {
            var showSubTotals = true;
            if (axis[rln].members.length > 0 && ((!isNullOrUndefined(axis[rln].showSubTotals) && !axis[rln].showSubTotals) ||
                !this.dataSourceSettings.showSubTotals || !this.dataSourceSettings.showColumnSubTotals)) {
                showSubTotals = false;
            }
            var index = (this.measureIndex < levelIndex && showSubTotals ? 1 : ((this.measureIndex > levelIndex &&
                axis[rln].members.length > 0) || !(this.measureIndex === (levelIndex + 1) &&
                axis[rln].isDrilled) ? ((this.measureIndex === levelIndex && this.measureIndex !== 0 && showSubTotals) ? 1 : ((this.measureIndex > levelIndex && showSubTotals && axis[rln].valueSort &&
                axis[rln].valueSort.axis && this.measureNames[axis[rln].valueSort.axis.toString()]) ? 1 : 0)) : (this.measureIndex === 0 || !showSubTotals ? 0 : 1)));
            if (axis[rln].members.length) {
                var pos = void 0;
                var members = axis[rln].members;
                if (this.showSubTotalsAtTop) {
                    if (levelIndex + 1 < this.measureIndex && showSubTotals) {
                        pos = tnum;
                        members = this.reArrangeValueMember(members);
                    }
                    else {
                        pos = tnum + index;
                    }
                }
                else {
                    pos = tnum;
                }
                this.frameDefinedHeaderData(members, reformAxis, data, levelIndex + 1, pos, vcnt);
            }
            // let lvl: number = axis[rln as number].level;
            // axis[rln as number].rowIndex = lvl;
            var level = this.measureIndex > levelIndex && axis[rln].valueSort &&
                axis[rln].valueSort.axis && this.measureNames[axis[rln].valueSort.axis.toString()] ?
                this.measureIndex : levelIndex;
            tnum = this.showSubTotalsAtTop ? tnum + 1 : reformAxis.length + index;
            if (!reformAxis[tnum - 1]) {
                reformAxis[tnum - 1] = PivotUtil.frameHeaderWithKeys(axis[rln]);
            }
            axis[rln].colIndex = tnum;
            if (!data[level]) {
                data[level] = [];
                this.headerContent[level] = {};
                data[level][tnum] = this.headerContent[level][tnum]
                    = PivotUtil.frameHeaderWithKeys(axis[rln]);
            }
            else {
                data[level][tnum] = this.headerContent[level][tnum]
                    = PivotUtil.frameHeaderWithKeys(axis[rln]);
            }
            if (!this.isPagingOrVirtualizationEnabled && (this.showSubTotalsAtTop ? index !== 0 : true)) {
                if (reformAxis[tnum - 1]) {
                    reformAxis[tnum - 1].members = [];
                }
            }
            if (this.showSubTotalsAtTop) {
                tnum = reformAxis.length;
                if (rln + 1 === rlt && axis[rln].level === 0) {
                    this.reformAxisCount = reformAxis.length + 1;
                }
            }
        }
    };
    PivotEngine.prototype.getHeaderData = function (rows, columns, values, rowAxis, axis, reformAxis, data, tnum, vcnt) {
        if (!this.valueAxis && !this.isLastHeaderHasMeasures) {
            var columnHeaders = [];
            if (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showColumnGrandTotals && axis[axis.length - 1].type === 'grand sum') {
                this.updateValueMembers(this.measureIndex === 0 && axis.length > 1, null, null, columnHeaders, axis.slice(0, axis.length - 1), vcnt, 0);
                this.updateValueMembers(false, null, null, columnHeaders, axis.slice(axis.length - 1, axis.length), vcnt, -1);
            }
            else if (this.dataSourceSettings.grandTotalsPosition === 'Top' && this.dataSourceSettings.showGrandTotals && this.measureIndex === 0) {
                this.updateValueMembers(false, null, null, columnHeaders, axis.slice(0, 1), vcnt, -1);
                this.updateValueMembers(this.measureIndex === 0 && axis.length > 1, null, null, columnHeaders, axis.slice(1, axis.length), vcnt, 0);
            }
            else {
                var hasColumnTotal = columns.length === 0 && axis.length === 1 && axis[0].type === 'grand sum';
                this.updateValueMembers(!hasColumnTotal && this.measureIndex === 0, null, null, columnHeaders, axis, vcnt, hasColumnTotal ? -1 : 0);
            }
            this.getAggregatedHeaders(rows, columns, this.rMembers, columnHeaders, values);
            if (this.selectedHeaders.values.length > 0) {
                for (var clt = this.selectedHeaders.selectedHeader.length, i = 0; i < clt; i++) {
                    var headerData = this.selectedHeaders.selectedHeader[i];
                    if (headerData.axis === 'column') {
                        if (headerData.uniqueName === headerData.value) {
                            this.selectedHeaders.selectedHeader.splice(i, 1);
                            i--;
                            clt--;
                        }
                        else if (headerData.uniqueName === 'Grand Total') {
                            for (var clt_1 = headerData.aggregateHeaders.length, j = 0; j < clt_1; j++) {
                                if (headerData.aggregateHeaders[j] &&
                                    headerData.aggregateHeaders[j].members.length > 0) {
                                    for (var _i = 0, _a = headerData.aggregateHeaders[j].members; _i < _a.length; _i++) {
                                        var member = _a[_i];
                                        if (member.actualText === headerData.value) {
                                            headerData.aggregateHeaders[j] = member;
                                            if (member.type === 'grand sum') {
                                                headerData.uniqueName = member.valueSort.levelName;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.frameDefinedHeaderData(columnHeaders, reformAxis, data, 0, this.showSubTotalsAtTop ? 0 : 1, vcnt);
            return;
        }
        else if (rowAxis.length === 0 && (this.valueAxis && (this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader)) &&
            this.dataSourceSettings.values.length > 0) {
            if (this.dataSourceSettings.showGrandTotals && this.dataSourceSettings.showRowGrandTotals &&
                this.rMembers[this.rMembers.length - 1].type === 'grand sum') {
                this.updateValueMembers(this.measureIndex === 0 && this.rMembers.length > 1, null, null, rowAxis, this.rMembers.slice(0, this.rMembers.length - 1), this.dataSourceSettings.values.length, 0);
                this.updateValueMembers(false, null, null, rowAxis, this.rMembers.slice(this.rMembers.length - 1, this.rMembers.length), this.dataSourceSettings.values.length, -1);
            }
            else if (this.dataSourceSettings.grandTotalsPosition === 'Top' && this.dataSourceSettings.showGrandTotals && this.measureIndex === 0) {
                this.updateValueMembers(false, null, null, rowAxis, this.rMembers.slice(0, 1), this.dataSourceSettings.values.length, -1);
                this.updateValueMembers(this.measureIndex === 0 && this.rMembers.length > 1, null, null, rowAxis, this.rMembers.slice(1, this.rMembers.length), this.dataSourceSettings.values.length, 0);
            }
            else {
                var hasRowTotal = rows.length === 0 && this.rMembers.length === 1 && this.rMembers[0].type === 'grand sum';
                this.updateValueMembers(!hasRowTotal && this.measureIndex === 0, null, null, rowAxis, this.rMembers, this.dataSourceSettings.values.length, hasRowTotal ? -1 : 0);
            }
            this.getAggregatedHeaders(rows, columns, rowAxis, axis, values);
            if (this.selectedHeaders.values.length > 0) {
                for (var clt = this.selectedHeaders.selectedHeader.length, i = 0; i < clt; i++) {
                    var headerData = this.selectedHeaders.selectedHeader[i];
                    if (headerData.axis === 'row') {
                        for (var clt_2 = headerData.aggregateHeaders.length, j = 0; j < clt_2; j++) {
                            if (headerData.aggregateHeaders[j].actualText === headerData.value) {
                                if (headerData.aggregateHeaders[j].valueSort.levelName.indexOf(headerData.uniqueName) !== -1) {
                                    headerData.uniqueName = headerData.aggregateHeaders[j].valueSort.levelName;
                                    headerData.aggregateHeaders.splice(j, 1);
                                    j--;
                                    clt_2--;
                                }
                                else {
                                    for (var count = headerData.aggregateHeaders[j].members.length, k = 0; k < count; k++) {
                                        var member = headerData.aggregateHeaders[j].members[k];
                                        if (member.type !== 'value' && member.level ===
                                            headerData.aggregateHeaders[j].level) {
                                            var members = extend([], headerData.aggregateHeaders[j].members, null, true);
                                            headerData.aggregateHeaders = [].concat(headerData.aggregateHeaders, members, headerData.aggregateHeaders.splice(j));
                                            headerData.aggregateHeaders.splice(members.length + j, 1);
                                            j = (members.length + j) - 1;
                                            clt_2 = headerData.aggregateHeaders.length;
                                        }
                                    }
                                }
                            }
                            else if (headerData.aggregateHeaders[j].actualText !== headerData.value &&
                                headerData.aggregateHeaders[j].members.length > 0) {
                                for (var count = headerData.aggregateHeaders[j].members.length, k = 0; k < count; k++) {
                                    var member = headerData.aggregateHeaders[j].members[k];
                                    if (member.actualText === headerData.value) {
                                        if (headerData.uniqueName ===
                                            headerData.aggregateHeaders[j].valueSort.levelName) {
                                            headerData.uniqueName = member.valueSort.levelName;
                                        }
                                        headerData.aggregateHeaders[j].members.splice(k, 1);
                                        headerData.aggregateHeaders[j] = member;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var rlt = axis.length;
        var colItmLn = this.dataSourceSettings.columns.length;
        var sortText = this.valueSortSettings.headerText;
        //let valueLn: number = this.dataSourceSettings.values.length;
        for (var rln = 0; rln < rlt; rln++) {
            var isHidden = !isNullOrUndefined(axis[rln].showSubTotals) && !axis[rln].showSubTotals;
            if (axis[rln].members.length) {
                this.getHeaderData(rows, columns, values, rowAxis, axis[rln].members, reformAxis, data, this.showSubTotalsAtTop && !isHidden ? tnum + 1 : tnum, vcnt);
            }
            var isTotalHide = true;
            tnum = this.showSubTotalsAtTop ? tnum : reformAxis.length;
            if (isHidden || !this.dataSourceSettings.showSubTotals || !this.dataSourceSettings.showColumnSubTotals) {
                if (!(axis[rln].members.length > 0)) {
                    reformAxis[this.showSubTotalsAtTop ? tnum : reformAxis.length] = PivotUtil.frameHeaderWithKeys(axis[rln]);
                }
                else {
                    this.removeCount++;
                    isTotalHide = false;
                }
                tnum = this.showSubTotalsAtTop ? tnum : reformAxis.length - 1;
            }
            else {
                reformAxis[tnum] = PivotUtil.frameHeaderWithKeys(axis[rln]);
            }
            //  let rplus: number = rln + 1;
            var lvl = axis[rln].level;
            axis[rln].rowIndex = lvl;
            var index = (tnum * vcnt) + (this.showSubTotalsAtTop ? 1 : vcnt);
            axis[rln].colIndex = index;
            if (!data[lvl]) {
                data[lvl] = [];
                this.headerContent[lvl] = {};
            }
            data[lvl][index] = this.headerContent[lvl][index] =
                PivotUtil.getFormattedHeader(axis[rln], this);
            var isSingleMeasure = (this.dataSourceSettings.columns.length === 0 &&
                this.dataSourceSettings.values.length === 1) ? true : false;
            if ((this.isMultiMeasures || this.dataSourceSettings.alwaysShowValueHeader || isSingleMeasure) &&
                !this.valueAxis && isTotalHide) {
                for (var vln = 0; vln < vcnt; vln++) {
                    var name_5 = this.dataSourceSettings.values[vln].caption ?
                        this.dataSourceSettings.values[vln].caption : this.dataSourceSettings.values[vln].name;
                    var calObj = {
                        axis: 'column', actualText: this.dataSourceSettings.values[vln].name, formattedText: name_5, level: 0, valueSort: {},
                        colIndex: (tnum * vcnt) + 1 + vln, rowIndex: colItmLn
                    };
                    if (!data[colItmLn]) {
                        data[colItmLn] = [];
                        this.headerContent[colItmLn] = {};
                        data[colItmLn][(tnum * vcnt) + 1 + vln] =
                            this.headerContent[colItmLn][(tnum * vcnt) + 1 + vln] = calObj;
                    }
                    else {
                        data[colItmLn][(tnum * vcnt) + 1 + vln] =
                            this.headerContent[colItmLn][(tnum * vcnt) + 1 + vln] = calObj;
                    }
                    var vData = data[colItmLn][(tnum * vcnt) + 1 + vln].valueSort;
                    vData[axis[rln].valueSort.levelName + this.valueSortSettings.headerDelimiter + name_5] = 1;
                    vData.levelName = axis[rln].valueSort.levelName + this.valueSortSettings.headerDelimiter + name_5;
                    vData[axis[rln].valueSort.uniqueName + this.valueSortSettings.headerDelimiter +
                        this.dataSourceSettings.values[vln].name] = 1;
                    vData.uniqueName = axis[rln].valueSort.uniqueName +
                        this.valueSortSettings.headerDelimiter + this.dataSourceSettings.values[vln].name;
                    if (vData && vData[sortText]) {
                        this.valueSortSettings.columnIndex = (tnum * vcnt) + 1 + vln;
                    }
                }
            }
            else if (axis[rln].valueSort && axis[rln].valueSort[sortText]) {
                this.valueSortSettings.columnIndex = (tnum * vcnt) + 1;
            }
            if (!this.isPagingOrVirtualizationEnabled) {
                reformAxis[tnum].members = [];
            }
            if (this.showSubTotalsAtTop) {
                tnum = reformAxis.length;
                if (axis[rln].level === 0 && rln + 1 === rlt) {
                    this.reformAxisCount = (reformAxis.length * vcnt) + 1;
                }
            }
        }
    };
    PivotEngine.prototype.getAggregateValue = function (rowIndex, columnIndex, value, type, isGrandTotal) {
        //rowIndex = rowIndex.sort();
        //columnIndex = columnIndex.sort();
        //let clt: number = columnIndex.length;
        var ri = 0;
        var cellValue = 0;
        var avgCnt = 0;
        var isInit = true;
        var isValueExist = false;
        switch (type.toLowerCase()) {
            case 'median':
                {
                    var values = [];
                    var position = 0;
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined) {
                            isValueExist = true;
                            this.rawIndexObject[index] = index;
                            if (!isNullOrUndefined(this.valueMatrix[index][value].member)) {
                                values.push(this.valueMatrix[index][value].member);
                            }
                        }
                        ri++;
                    }
                    var len = values.length;
                    if (len > 0) {
                        values.sort(function (a, b) { return a - b; });
                        if (len % 2 === 0) {
                            position = (len / 2) <= 1 ? 0 : ((len / 2) - 1);
                            cellValue = (values[position] + values[position + 1]) / 2;
                        }
                        else {
                            position = (len + 1) / 2 <= 1 ? 0 : (((len + 1) / 2) - 1);
                            cellValue = values[position];
                        }
                    }
                }
                break;
            case 'count':
                {
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined) {
                            isValueExist = true;
                            this.rawIndexObject[index] = index;
                            cellValue += (isNullOrUndefined(this.valueMatrix[index][value].member) ?
                                0 : (this.allowDataCompression ? this.valueMatrix[index][value].member : 1));
                        }
                        ri++;
                    }
                }
                break;
            case 'distinctcount':
                {
                    var duplicateValues = [];
                    while (rowIndex[ri] !== undefined) {
                        if (columnIndex[rowIndex[ri]] !== undefined) {
                            this.rawIndexObject[rowIndex[ri]] = rowIndex[ri];
                            isValueExist = true;
                            var val = (this.data[rowIndex[ri]][this.fieldKeys[this.fields[value]]]);
                            // let currentVal: number = this.valueMatrix[rowIndex[ri as number]][value as number];
                            if (!isNullOrUndefined(val)) {
                                var currentVal = val.toString();
                                if (duplicateValues.length === 0 || (duplicateValues.length > 0 &&
                                    duplicateValues.indexOf(currentVal) === -1)) {
                                    cellValue += (this.allowDataCompression && typeof val === 'number') ? val : 1;
                                    duplicateValues.push(currentVal);
                                }
                            }
                        }
                        ri++;
                    }
                }
                break;
            case 'product':
                {
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined) {
                            this.rawIndexObject[index] = index;
                            isValueExist = true;
                            var currentVal = this.valueMatrix[index][value].member;
                            if (!isNullOrUndefined(currentVal)) {
                                cellValue = ((isInit || isNullOrUndefined(cellValue)) ? 1 : cellValue);
                                cellValue *= currentVal;
                            }
                            else if (isInit) {
                                cellValue = currentVal;
                            }
                            isInit = false;
                        }
                        ri++;
                    }
                }
                break;
            case 'populationstdev':
            case 'samplestdev':
            case 'populationvar':
            case 'samplevar':
                {
                    var i = 0;
                    var val = 0;
                    var indexVal = [];
                    var avgVal = 0;
                    var cVal = 0;
                    var avgDifferenceVal = 0;
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined) {
                            isValueExist = true;
                            this.rawIndexObject[index] = index;
                            var currentVal = this.valueMatrix[index][value].member;
                            if (!isNullOrUndefined(currentVal)) {
                                val += currentVal;
                                indexVal.push(currentVal);
                                i++;
                            }
                        }
                        ri++;
                    }
                    if (i > 0) {
                        avgVal = val / i;
                        for (var _i = 0, indexVal_1 = indexVal; _i < indexVal_1.length; _i++) {
                            var index = indexVal_1[_i];
                            avgDifferenceVal += Math.pow((index - avgVal), 2);
                        }
                        if ((['populationstdev', 'samplestdev']).indexOf(type.toLowerCase()) !== -1) {
                            cVal = Math.sqrt(avgDifferenceVal / (type.toLowerCase() === 'populationstdev' ? i : (i - 1)));
                        }
                        else {
                            cVal = avgDifferenceVal / (type.toLowerCase() === 'populationvar' ? i : (i - 1));
                        }
                        cellValue = (cVal === 0 ? NaN : cVal);
                    }
                    else {
                        cellValue = val;
                    }
                }
                break;
            case 'min':
                {
                    var isFirst = true;
                    cellValue = undefined;
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined &&
                            this.valueMatrix[index][value].member !== undefined) {
                            isValueExist = true;
                            this.rawIndexObject[index] = index;
                            if (isNullOrUndefined(cellValue) &&
                                isNullOrUndefined(this.valueMatrix[index][value].member)) {
                                cellValue = this.valueMatrix[index][value].member;
                            }
                            else {
                                if (isFirst) {
                                    cellValue = this.valueMatrix[index][value].member;
                                    isFirst = false;
                                }
                                else {
                                    cellValue = this.valueMatrix[index][value].member < cellValue ?
                                        this.valueMatrix[index][value].member : cellValue;
                                }
                            }
                        }
                        ri++;
                    }
                }
                break;
            case 'max':
                {
                    var isMaxFirst = true;
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined &&
                            this.valueMatrix[index][value].member !== undefined) {
                            isValueExist = true;
                            this.rawIndexObject[index] = index;
                            if (isMaxFirst) {
                                cellValue = this.valueMatrix[index][value].member;
                                isMaxFirst = false;
                            }
                            else {
                                cellValue = this.valueMatrix[index][value].member > cellValue ?
                                    this.valueMatrix[index][value].member : cellValue;
                            }
                        }
                        ri++;
                    }
                }
                break;
            case 'calculatedfield':
                {
                    isValueExist = true;
                    var calcField = this.calculatedFields[this.fields[value]];
                    var actualFormula = calcField.formula;
                    var aggregateField = {};
                    if (this.calculatedFormulas[calcField.name]) {
                        var calculatedFormulas = this.calculatedFormulas[calcField.name];
                        for (var len = 0, lmt = calculatedFormulas.length; len < lmt; len++) {
                            var aggregatedValue = calculatedFormulas[len];
                            var value_1 = aggregateField[aggregatedValue.formula];
                            if (value_1 === undefined) {
                                var type_1 = aggregatedValue.type;
                                value_1 = this.getAggregateValue(rowIndex, columnIndex, aggregatedValue.index, type_1, false);
                                aggregateField[aggregatedValue.formula] = value_1;
                            }
                            actualFormula = (actualFormula).replace(aggregatedValue.formula, String(value_1));
                        }
                    }
                    cellValue = this.evaluate(actualFormula);
                    cellValue = (cellValue === Infinity || cellValue === -Infinity ? Infinity : (cellValue === undefined || isNaN(cellValue)) ?
                        undefined : JSON.parse(String(cellValue)));
                }
                break;
            default:
                {
                    cellValue = undefined;
                    while (rowIndex[ri] !== undefined) {
                        var index = rowIndex[ri];
                        if (columnIndex[index] !== undefined) {
                            isValueExist = true;
                            if (!isGrandTotal) {
                                this.rawIndexObject[index] = index;
                            }
                            //let cIndx: number = isLeastLevel ? columnIndex.splice(columnIndex.indexOf(rowIndex[ri as number]), 1)[0] : rowIndex[ri as number];
                            var currentVal = this.valueMatrix[index][value].member;
                            if (isNullOrUndefined(cellValue) && isNullOrUndefined(currentVal)) {
                                cellValue = currentVal;
                            }
                            else {
                                if (isNullOrUndefined(cellValue)) {
                                    cellValue = 0;
                                }
                                cellValue += (isNullOrUndefined(currentVal) ? 0 : currentVal);
                            }
                            if (!isNullOrUndefined(currentVal)) {
                                avgCnt++;
                            }
                        }
                        ri++;
                    }
                }
                break;
        }
        /* if (rlt > clt) {
             this.makeMirrorObject(rowIndex, mirror);
             while (columnIndex[ci] !== undefined) {
                 if (mirror[columnIndex[ci]]) {
                     let cIndx: number = isLeastLevel ? columnIndex.splice(ci, 1)[0] : columnIndex[ci];
                     //rowIndex.splice
                     sum += this.valueMatrix[cIndx][value as number];
                 }
                 ci++;
             }
         } else {
             this.makeMirrorObject(columnIndex, mirror);
             while (rowIndex[ri as number] !== undefined) {
                 if (mirror[rowIndex[ri as number]]) {
                     let cIndx: number = isLeastLevel ? columnIndex.splice(columnIndex.indexOf(rowIndex[ri as number]), 1)[0] : rowIndex[ri as number];
                     sum += this.valueMatrix[rowIndex[ri as number]][value as number];
                 }
                 ri++;
             }
         } */
        return ((type && type.toLowerCase() === 'avg' && cellValue !== 0 &&
            !isNullOrUndefined(cellValue)) ? (cellValue / avgCnt) : isValueExist ? cellValue : undefined);
    };
    PivotEngine.prototype.evaluate = function (obj) {
        return Function('"use strict";return (' + obj + ')')();
    };
    /**
     * It performs the formatting to get formatted Value
     *
     * @param {number | string} value - It contains the value which went formatting.
     * @param {string} fieldName - It contains the field name.
     * @returns {IAxisSet} - It returns the formatted value as IAxisSet data.
     * @hidden
     */
    PivotEngine.prototype.getFormattedValue = function (value, fieldName) {
        var commonValue = value === null ? (this.localeObj ? this.localeObj.getConstant('null') :
            String(value)) : value === undefined ?
            (this.localeObj ? (fieldName in this.groupingFields) ? this.localeObj.getConstant('groupOutOfRange') :
                this.localeObj.getConstant('undefined') : String(value)) : value;
        var formattedValue = {
            formattedText: commonValue.toString(),
            actualText: commonValue,
            dateText: commonValue
        };
        if (this.formatFields[fieldName] && (this.formatFields[fieldName].format ||
            this.formatFields[fieldName].skeleton) && !isNullOrUndefined(value)) {
            try {
                var formatField = (this.formatFields[fieldName].properties ?
                    this.formatFields[fieldName].properties :
                    this.formatFields[fieldName]);
                var formatSetting = extend({}, formatField, null, true);
                delete formatSetting.name;
                if (!formatSetting.minimumSignificantDigits && formatSetting.minimumSignificantDigits < 1) {
                    delete formatSetting.minimumSignificantDigits;
                }
                if (!formatSetting.maximumSignificantDigits && formatSetting.maximumSignificantDigits < 1) {
                    delete formatSetting.maximumSignificantDigits;
                }
                if (formatSetting.type) {
                    formattedValue.formattedText = this.dateFormatFunction[fieldName].exactFormat(new Date(value))
                        === null ? formattedValue.formattedText :
                        this.dateFormatFunction[fieldName].exactFormat(new Date(value));
                    formattedValue.actualText = value;
                }
                else {
                    delete formatSetting.type;
                    if ((formatSetting.format) && !(this.formatRegex.test(formatSetting.format))) {
                        if (isNullOrUndefined(formatSetting.minimumFractionDigits)) {
                            delete formatSetting.minimumFractionDigits;
                        }
                        if (isNullOrUndefined(formatSetting.maximumFractionDigits)) {
                            delete formatSetting.maximumFractionDigits;
                        }
                        if (isNullOrUndefined(formatSetting.minimumIntegerDigits)) {
                            delete formatSetting.minimumIntegerDigits;
                        }
                    }
                    formattedValue.formattedText =
                        this.globalize.formatNumber(!isNaN(Number(value)) ? Number(value) : value, formatSetting);
                    formattedValue.actualText = !isNaN(Number(value)) ? Number(value) : value;
                    formattedValue.dateText = !isNaN(Number(value)) ? Number(value) : value;
                }
                if (this.fieldList[fieldName].sort !== 'None' && formatSetting.type &&
                    ['date', 'dateTime', 'time'].indexOf(this.formatFields[fieldName].type) > -1) {
                    formattedValue.dateText = this.dateFormatFunction[fieldName].fullFormat(new Date(value));
                }
                if (this.fieldList[fieldName].isCustomField) {
                    formattedValue.formattedText = formattedValue.formattedText === 'NaN' ?
                        commonValue.toString() : formattedValue.formattedText;
                    formattedValue.dateText = formattedValue.dateText === 'NaN' ?
                        commonValue.toString() : formattedValue.dateText;
                }
            }
            catch (exception) {
                if (!this.fieldList[fieldName].isCustomField) {
                    throw exception;
                }
            }
            finally {
                if (this.fieldList[fieldName].isCustomField) {
                    formattedValue.formattedText =
                        (isNullOrUndefined(formattedValue.formattedText) || formattedValue.formattedText === 'NaN') ?
                            commonValue.toString() : formattedValue.formattedText;
                    formattedValue.dateText = (isNullOrUndefined(formattedValue.dateText) || formattedValue.dateText === 'NaN') ?
                        commonValue.toString() : formattedValue.dateText;
                }
            }
        }
        return formattedValue;
    };
    PivotEngine.prototype.powerFunction = function (formula) {
        if (formula.indexOf('^') > -1) {
            var items_1 = [];
            while (formula.indexOf('(') > -1) {
                formula = formula.replace(/(\([^()]*\))/g, function (text, item) {
                    items_1.push(item);
                    return ('~' + (items_1.length - 1));
                });
            }
            items_1.push(formula);
            formula = '~' + (items_1.length - 1);
            while (formula.indexOf('~') > -1) {
                formula = formula.replace(new RegExp('~' + '(\\d+)', 'g'), function (text, index) {
                    return items_1[index].replace(/(\w*)\^(\w*)/g, 'Math.pow' + '($1,$2)');
                });
            }
        }
        return formula;
    };
    PivotEngine.prototype.getTabularPivotValues = function (requireDatasourceUpdate, dataSource) {
        this.tabularPivotValues = [];
        var colIndex;
        this.emptyRowsLength = 0;
        var isGrouping = Object.keys(this.groupingFields).length > 0;
        if (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
            this.dataSourceSettings.alwaysShowValueHeader)) {
            this.rowMaxLevel = this.rowMaxLevel + 1;
        }
        for (var i = 0; i < this.pivotValues.length; i++) {
            var rowPivotValues = void 0;
            var drillMem = false;
            var isValue = true;
            var levelName = void 0;
            var levelNameParts = void 0;
            var valueAxis = void 0;
            while (isNullOrUndefined(this.pivotValues[i]) && i < this.pivotValues.length) {
                this.tabularPivotValues.length++;
                i++;
            }
            if (i < this.pivotValues.length) {
                rowPivotValues = this.pivotValues[i];
            }
            var firstRow = rowPivotValues[0] ? rowPivotValues[0] : undefined;
            if (firstRow) {
                levelName = firstRow.valueSort.levelName;
                levelNameParts = levelName.split(this.dataSourceSettings.valueSortSettings.headerDelimiter);
                if ((!this.dataSourceSettings.showSubTotals || (this.dataSourceSettings.showColumnSubTotals &&
                    !this.dataSourceSettings.showRowSubTotals)) && firstRow.formattedText !== this.localeObj.getConstant('grandTotal')) {
                    if (firstRow.isSum) {
                        isValue = false;
                    }
                }
                if (isGrouping) {
                    var pivotValue = this.pivotValues[i - 1][this.rowMaxLevel - 1];
                    var previousValue = this.tabularPivotValues[this.tabularPivotValues.length - 1][this.rowMaxLevel - 1];
                    if (!isNullOrUndefined(pivotValue) || !isNullOrUndefined(previousValue)) {
                        var pivotValueAxis = pivotValue.valueSort.axis;
                        var previousValueAxis = void 0;
                        if (!isNullOrUndefined(previousValue) && previousValue.valueSort.axis) {
                            previousValueAxis = previousValue.valueSort.axis;
                        }
                        if (pivotValueAxis.includes('custom_group') || previousValueAxis.includes('custom_group')) {
                            if ((pivotValue.formattedText === levelNameParts[this.rowMaxLevel - 1] && pivotValue.formattedText !==
                                levelNameParts[levelNameParts.length - 1]) || (previousValue && previousValue.formattedText ===
                                levelNameParts[this.rowMaxLevel - 1])) {
                                valueAxis = pivotValue.valueSort.axis ? pivotValue.valueSort.axis : previousValue.valueSort.axis;
                            }
                            else {
                                valueAxis = firstRow.valueSort.axis;
                            }
                        }
                        else {
                            valueAxis = firstRow.valueSort.axis;
                        }
                    }
                }
            }
            if (firstRow && this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                this.dataSourceSettings.alwaysShowValueHeader)) {
                if (firstRow.type === 'value') {
                    if (levelNameParts.length - 1 !== this.rowMaxLevel && levelNameParts[0] !== this.localeObj.getConstant('grandTotal')) {
                        for (var w = 0; w < this.dataSourceSettings.values.length; w++) {
                            if (firstRow.formattedText === this.dataSourceSettings.values[w].name) {
                                isValue = false;
                                firstRow.hasChild = false;
                                break;
                            }
                        }
                    }
                }
                if (levelNameParts.length - 1 !== this.rowMaxLevel) {
                    firstRow.isDrilled = true;
                    if (!firstRow.hasChild && !firstRow.type) {
                        firstRow.hasChild = true;
                    }
                    else if (levelNameParts[0] === this.localeObj.getConstant('grandTotal') && firstRow.type === 'grand sum') {
                        firstRow.hasChild = true;
                    }
                    else {
                        firstRow.level = levelNameParts.length - 1;
                    }
                }
                else {
                    firstRow.level = levelNameParts.length - 1;
                }
                for (var n = 0; n < dataSource.drilledMembers.length; n++) {
                    var drillItems = dataSource.drilledMembers[n].items;
                    for (var v = 0; v < drillItems.length; v++) {
                        var splitdrillItems = drillItems[v].split(dataSource.drilledMembers[n].delimiter);
                        var rowText = firstRow.formattedText.split(' ');
                        var rowFormatText = rowText.length > 1 ? rowText.slice(0, rowText.length - 1).join(' ') : rowText[0];
                        if (splitdrillItems[splitdrillItems.length - 1] === rowFormatText &&
                            splitdrillItems[0] === levelNameParts[0]) {
                            drillMem = true;
                            break;
                        }
                    }
                }
            }
            if (!isNullOrUndefined(firstRow) && firstRow.axis === 'row') {
                if (!isNullOrUndefined(rowPivotValues[1]) && !(firstRow.hasChild && firstRow.isDrilled) && isValue) {
                    var levelNameArray = [];
                    if ((this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                        this.dataSourceSettings.alwaysShowValueHeader)) && (requireDatasourceUpdate && drillMem
                        ? levelNameParts.length - 1 < this.rowMaxLevel : levelNameParts.length <= this.rowMaxLevel) &&
                        firstRow.type === 'value' && (!this.dataSourceSettings.expandAll ? drillMem : !drillMem) ||
                        levelNameParts[0] === this.localeObj.getConstant('grandTotal')) {
                        for (var b = levelNameParts.length - 1; b >= 0; b--) {
                            if (levelNameParts[b] === levelNameParts[levelNameParts.length - 2]) {
                                levelNameArray[b] = levelNameParts[levelNameParts.length - 2] + ' ' +
                                    levelNameParts[levelNameParts.length - 1];
                                if (b === 0) {
                                    break;
                                }
                                else {
                                    while (b >= 0) {
                                        levelNameArray[b - 1] = levelNameParts[b - 1];
                                        b--;
                                    }
                                    break;
                                }
                            }
                            else {
                                levelNameArray[b] = levelNameParts[levelNameParts.length - 2] + ' ' +
                                    levelNameParts[levelNameParts.length - 1];
                            }
                        }
                        levelNameParts = levelNameArray;
                    }
                    colIndex = firstRow.colIndex;
                    var currentRow = [];
                    var dLevelName = levelNameParts[0];
                    var level = 0;
                    for (var k = 0; k < levelNameParts.length - 1 || k < this.rowMaxLevel; k++) {
                        var valueIsDrill = void 0;
                        var valueHasChild = void 0;
                        var duplIsDrilled = firstRow.isDrilled;
                        var dupliHasChild = firstRow.hasChild;
                        if (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                            this.dataSourceSettings.alwaysShowValueHeader)) {
                            valueIsDrill = false;
                            valueHasChild = false;
                            if (levelNameParts[levelNameParts.length - 1] !== levelNameParts[levelNameParts.length - 2]) {
                                var currentRowIndex = levelNameParts.length - 1 === this.rowMaxLevel &&
                                    this.dataSourceSettings.rows.length === this.rowMaxLevel ?
                                    levelNameParts.length - 2 : levelNameParts.length - 1;
                                if (k < currentRowIndex) {
                                    valueHasChild = true;
                                }
                                if (k < levelNameParts.length - 2) {
                                    valueIsDrill = true;
                                }
                            }
                        }
                        else {
                            if (k < this.rowMaxLevel) {
                                dupliHasChild = true;
                            }
                            if (levelNameParts.length > 1 || k === 0) {
                                duplIsDrilled = true;
                            }
                        }
                        if (k < levelNameParts.length - 1) {
                            if (k > 0) {
                                dLevelName = dLevelName + this.dataSourceSettings.valueSortSettings.headerDelimiter +
                                    levelNameParts[k];
                            }
                            currentRow.push({
                                actualText: levelNameParts[k],
                                axis: firstRow.axis,
                                formattedText: levelNameParts[k],
                                rowIndex: this.tabularPivotValues.length,
                                hasChild: (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                                    this.dataSourceSettings.alwaysShowValueHeader) && firstRow.type !== 'grand sum') ?
                                    valueHasChild : dupliHasChild,
                                isDrilled: (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                                    this.dataSourceSettings.alwaysShowValueHeader) && firstRow.type !== 'grand sum') ?
                                    valueIsDrill : duplIsDrilled,
                                level: level,
                                valueSort: {
                                    levelName: dLevelName,
                                    axis: isGrouping ? valueAxis : this.dataSourceSettings.rows[k].name
                                },
                                colIndex: colIndex++,
                                colSpan: 1,
                                rowSpan: 1
                            });
                        }
                        if (k >= firstRow.level) {
                            var span = k === 0 ? this.rowMaxLevel : this.rowMaxLevel - 1;
                            currentRow.push({
                                actualText: this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                                    this.dataSourceSettings.alwaysShowValueHeader) ? levelNameParts[k] === undefined ?
                                    levelNameParts[levelNameParts.length - 1] : levelNameParts[k] : firstRow.formattedText,
                                axis: firstRow.axis,
                                formattedText: (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                                    this.dataSourceSettings.alwaysShowValueHeader)) ? levelNameParts[k] === undefined ?
                                    levelNameParts[levelNameParts.length - 1] : levelNameParts[k] : firstRow.formattedText,
                                rowIndex: this.tabularPivotValues.length,
                                hasChild: (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                                    this.dataSourceSettings.alwaysShowValueHeader) && firstRow.type !== 'grand sum') ?
                                    valueHasChild : firstRow.hasChild,
                                isDrilled: (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                                    this.dataSourceSettings.alwaysShowValueHeader) && firstRow.type !== 'grand sum') ?
                                    valueIsDrill : firstRow.isDrilled,
                                level: level,
                                valueSort: {
                                    levelName: firstRow.valueSort.levelName,
                                    axis: isGrouping ? valueAxis : this.dataSourceSettings.rows[k].name
                                },
                                colIndex: colIndex++,
                                colSpan: span,
                                rowSpan: 1
                            });
                        }
                        level++;
                    }
                    firstRow.colIndex = colIndex;
                    firstRow.rowIndex = this.tabularPivotValues.length;
                    firstRow.colSpan = 1;
                    firstRow.rowSpan = 1;
                    if (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                        this.dataSourceSettings.alwaysShowValueHeader)) {
                        firstRow.formattedText = levelNameParts[levelNameParts.length - 1];
                    }
                    currentRow.push(firstRow);
                    this.setColumnSpan(currentRow, firstRow);
                    var colData = rowPivotValues.slice(1, rowPivotValues.length);
                    for (var i_8 = 1; i_8 < rowPivotValues.length; i_8++) {
                        var colDataValues = rowPivotValues[i_8];
                        colDataValues.colIndex = colIndex + 1;
                        colDataValues.rowIndex = this.tabularPivotValues.length;
                        colIndex++;
                    }
                    currentRow = currentRow.concat(colData);
                    this.tabularPivotValues.push(currentRow);
                }
                else {
                    this.emptyRowsLength++;
                }
            }
            else {
                var emptyRow = [];
                var headerColIndex = this.rowMaxLevel + 1;
                for (var j = 0; j < this.rowMaxLevel; j++) {
                    emptyRow.push(undefined);
                }
                emptyRow.push(firstRow);
                var colData = rowPivotValues.slice(1, rowPivotValues.length);
                for (var i_9 = 0; i_9 < colData.length; i_9++) {
                    colData[i_9].colIndex = headerColIndex;
                    colData[i_9].rowIndex = this.tabularPivotValues.length;
                    headerColIndex++;
                }
                emptyRow = emptyRow.concat(colData);
                this.tabularPivotValues.push(emptyRow);
            }
        }
        return this.tabularPivotValues;
    };
    PivotEngine.prototype.setColumnSpan = function (currentRow, firstRow) {
        var spanlength = 1;
        for (var f = currentRow.length - 1; f >= 0; f--) {
            if (f !== 0) {
                if (currentRow[f].formattedText === currentRow[f - 1].formattedText) {
                    currentRow[f].colSpan = 0;
                    spanlength++;
                    currentRow[f - 1].colSpan = spanlength;
                }
            }
            var currentRowindex = (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 ||
                this.dataSourceSettings.alwaysShowValueHeader)) ? currentRow.length - 2 : currentRow.length - 1;
            if (f < currentRowindex && (firstRow.type !== 'grand sum' || firstRow.isSum) &&
                currentRow[currentRow.length - 1].formattedText !== currentRow[currentRow.length - 2].formattedText &&
                firstRow.type !== 'grand sum') {
                currentRow[f].hasChild = true;
                var drillMem = this.dataSourceSettings.drilledMembers;
                for (var drillItem = 0; drillItem < drillMem.length; drillItem++) {
                    for (var item = 0; item < drillMem[drillItem].items.length; item++) {
                        if (drillMem[drillItem].items[item] === currentRow[f].formattedText) {
                            currentRow[f].isDrilled = currentRow[f].isDrilled ? true : false;
                        }
                    }
                }
            }
        }
    };
    PivotEngine.prototype.setRowSpan = function () {
        var emptyHeaderLength = this.headerContent.length;
        for (var m = 0; m < this.rowMaxLevel; m++) {
            var rowSpan = 1;
            if (this.tabularPivotValues.length > this.rowMaxLevel + emptyHeaderLength) {
                for (var j = this.tabularPivotValues.length - 1; j >= emptyHeaderLength - 1; j--) {
                    if (j !== emptyHeaderLength - 1) {
                        var tabluarValue = this.tabularPivotValues;
                        if (isNullOrUndefined(tabluarValue[j - 1])) {
                            break;
                        }
                        if (!isNullOrUndefined(tabluarValue[j - 1][m]) &&
                            tabluarValue[j][m].formattedText ===
                                tabluarValue[j - 1][m].formattedText) {
                            tabluarValue[j][m].rowSpan = 0;
                            rowSpan++;
                            tabluarValue[j - 1][m].rowSpan = rowSpan;
                        }
                        else {
                            rowSpan = 1;
                        }
                    }
                }
            }
        }
    };
    return PivotEngine;
}());
export { PivotEngine };
