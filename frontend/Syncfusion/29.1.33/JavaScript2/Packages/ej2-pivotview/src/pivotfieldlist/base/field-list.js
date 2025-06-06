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
import { Property, Event, Component, Internationalization, Fetch, select } from '@syncfusion/ej2-base';
import { L10n, remove, addClass, Browser, Complex } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, removeClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { PivotEngine } from '../../base/engine';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { PivotCommon } from '../../common/base/pivot-common';
import { Render } from '../renderer/renderer';
import { DataSourceSettings } from '../../model/datasourcesettings';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { PivotUtil } from '../../base/util';
import { OlapEngine } from '../../base/olap/engine';
/**
 * Represents the PivotFieldList component.
 * ```html
 * <div id="pivotfieldlist"></div>
 * <script>
 *  var pivotfieldlistObj = new PivotFieldList({ });
 *  pivotfieldlistObj.appendTo("#pivotfieldlist");
 * </script>
 * ```
 */
var PivotFieldList = /** @class */ (function (_super) {
    __extends(PivotFieldList, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {PivotFieldListModel} options - options
     * @param  {string|HTMLElement} element - element
     */
    function PivotFieldList(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @hidden */
        _this.pivotChange = false;
        _this.isRequiredUpdate = true;
        /** @hidden */
        _this.lastSortInfo = {};
        /** @hidden */
        _this.lastFilterInfo = {};
        /** @hidden */
        _this.lastAggregationInfo = {};
        /** @hidden */
        _this.lastCalcFieldInfo = {};
        /** @hidden */
        _this.isPopupView = false;
        /** @hidden */
        _this.enableValueSorting = false;
        _this.request = typeof window !== 'undefined' ? new XMLHttpRequest() : null;
        _this.remoteData = [];
        /** @hidden */
        _this.actionObj = {};
        /** @hidden */
        _this.destroyEngine = false;
        /** @hidden */
        _this.defaultFieldListOrder = 'None';
        /** @hidden */
        _this.isDeferUpdateApplied = false;
        _this.isInitial = true;
        return _this;
    }
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - ModuleDeclaration[]
     * @hidden
     */
    PivotFieldList.prototype.requiredModules = function () {
        var modules = [];
        if (this.allowCalculatedField) {
            modules.push({ args: [this], member: 'calculatedField' });
        }
        return modules;
    };
    /**
     * @returns {AggregateTypes[]}- AggregateTypes[]
     * @hidden
     */
    PivotFieldList.prototype.getAllSummaryType = function () {
        return ['Sum', 'Count', 'DistinctCount', 'Product', 'Min', 'Max', 'Avg', 'Median', 'Index',
            'PopulationVar', 'SampleVar', 'PopulationStDev', 'SampleStDev', 'RunningTotals', 'PercentageOfGrandTotal',
            'PercentageOfColumnTotal', 'PercentageOfRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentRowTotal',
            'DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentTotal'];
    };
    /**
     * For internal use only - Initialize the event handler;
     *
     * @private
     */
    PivotFieldList.prototype.preRender = function () {
        if (this.dataSourceSettings && this.dataSourceSettings.providerType === 'SSAS') {
            this.olapEngineModule = new OlapEngine();
            this.dataType = 'olap';
        }
        else {
            this.engineModule = new PivotEngine();
            this.dataType = 'pivot';
        }
        this.isAdaptive = Browser.isDevice;
        this.globalize = new Internationalization(this.locale);
        this.renderModule = new Render(this);
        this.defaultLocale = {
            staticFieldList: 'Pivot Field List',
            fieldList: 'Field List',
            dropFilterPrompt: 'Drop filter here',
            dropColPrompt: 'Drop column here',
            dropRowPrompt: 'Drop row here',
            dropValPrompt: 'Drop value here',
            addPrompt: 'Add field here',
            adaptiveFieldHeader: 'Choose field',
            centerHeader: 'Drag fields between axes below:',
            add: 'Add',
            drag: 'Drag',
            filter: 'Filter',
            filtered: 'Filtered',
            sort: 'Sort',
            remove: 'Remove',
            filters: 'Filters',
            rows: 'Rows',
            columns: 'Columns',
            values: 'Values',
            CalculatedField: 'Calculated Field',
            createCalculatedField: 'Create Calculated Field',
            fieldName: 'Enter the field name',
            error: 'Error',
            invalidFormula: 'Invalid formula.',
            dropText: 'Example: ("Sum(Order_Count)" + "Sum(In_Stock)") * 250',
            dropTextMobile: 'Add fields and edit formula here.',
            dropAction: 'Calculated field cannot be place in any other region except value axis.',
            search: 'Search',
            close: 'Close',
            cancel: 'Cancel',
            delete: 'Delete',
            alert: 'Alert',
            warning: 'Warning',
            ok: 'OK',
            allFields: 'All Fields',
            formula: 'Formula',
            fieldExist: 'A field already exists in this name. Please enter a different name.',
            confirmText: 'A calculation field already exists in this name. Do you want to replace it?',
            noMatches: 'No matches',
            format: 'Summaries values by',
            edit: 'Edit',
            clear: 'Clear',
            clearCalculatedField: 'Clear edited field info',
            editCalculatedField: 'Edit calculated field',
            sortAscending: 'Sort ascending order',
            sortDescending: 'Sort descending order',
            sortNone: 'Sort data order',
            formulaField: 'Drag and drop fields to formula',
            dragField: 'Drag field to formula',
            clearFilter: 'Clear',
            by: 'by',
            enterValue: 'Enter value',
            chooseDate: 'Enter date',
            all: 'All',
            multipleItems: 'Multiple items',
            Equals: 'Equals',
            DoesNotEquals: 'Does Not Equal',
            BeginWith: 'Begins With',
            DoesNotBeginWith: 'Does Not Begin With',
            EndsWith: 'Ends With',
            DoesNotEndsWith: 'Does Not End With',
            Contains: 'Contains',
            DoesNotContains: 'Does Not Contain',
            GreaterThan: 'Greater Than',
            GreaterThanOrEqualTo: 'Greater Than Or Equal To',
            LessThan: 'Less Than',
            LessThanOrEqualTo: 'Less Than Or Equal To',
            Between: 'Between',
            NotBetween: 'Not Between',
            Before: 'Before',
            BeforeOrEqualTo: 'Before Or Equal To',
            After: 'After',
            AfterOrEqualTo: 'After Or Equal To',
            member: 'Member',
            label: 'Label',
            date: 'Date',
            value: 'Value',
            labelTextContent: 'Show the items for which the label',
            dateTextContent: 'Show the items for which the date',
            valueTextContent: 'Show the items for which',
            And: 'and',
            Sum: 'Sum',
            Count: 'Count',
            DistinctCount: 'Distinct Count',
            Product: 'Product',
            Avg: 'Avg',
            Median: 'Median',
            Min: 'Min',
            Max: 'Max',
            Index: 'Index',
            SampleStDev: 'Sample StDev',
            PopulationStDev: 'Population StDev',
            SampleVar: 'Sample Var',
            PopulationVar: 'Population Var',
            RunningTotals: 'Running Totals',
            DifferenceFrom: 'Difference From',
            PercentageOfDifferenceFrom: '% of Difference From',
            PercentageOfGrandTotal: '% of Grand Total',
            PercentageOfColumnTotal: '% of Column Total',
            PercentageOfRowTotal: '% of Row Total',
            PercentageOfParentTotal: '% of Parent Total',
            PercentageOfParentColumnTotal: '% of Parent Column Total',
            PercentageOfParentRowTotal: '% of Parent Row Total',
            MoreOption: 'More...',
            Years: 'Years',
            Quarters: 'Quarters',
            Months: 'Months',
            Days: 'Days',
            Hours: 'Hours',
            Minutes: 'Minutes',
            Seconds: 'Seconds',
            apply: 'Apply',
            valueFieldSettings: 'Value field settings',
            sourceName: 'Field name :',
            sourceCaption: 'Field caption',
            summarizeValuesBy: 'Summarize values by',
            baseField: 'Base field',
            baseItem: 'Base item',
            example: 'e.g:',
            editorDataLimitMsg: ' more items. Search to refine further.',
            deferLayoutUpdate: 'Defer Layout Update',
            null: 'null',
            undefined: 'undefined',
            groupOutOfRange: 'Out of Range',
            fieldDropErrorAction: 'The field you are moving cannot be placed in that area of the report',
            memberType: 'Field Type',
            selectedHierarchy: 'Parent Hierarchy',
            formatString: 'Format',
            expressionField: 'Expression',
            olapDropText: 'Example: [Measures].[Order Quantity] + ([Measures].[Order Quantity] * 0.10)',
            customFormat: 'Enter custom format string',
            numberFormatString: 'Example: C, P, 0000 %, ###0.##0#, etc.',
            Measure: 'Measure',
            Dimension: 'Dimension',
            Standard: 'Standard',
            Currency: 'Currency',
            Percent: 'Percent',
            Custom: 'Custom',
            blank: '(Blank)',
            fieldTooltip: 'Drag and drop fields to create an expression. ' +
                'And, if you want to edit the existing calculated fields! ' +
                'You can achieve it by simply selecting the field under "Calculated Members".',
            fieldTitle: 'Field Name',
            QuarterYear: 'Quarter Year',
            caption: 'Field Caption',
            copy: 'Copy',
            of: 'of',
            group: 'Group',
            removeCalculatedField: 'Are you sure you want to delete this calculated field?',
            yes: 'Yes',
            no: 'No',
            None: 'None',
            qtr: 'Qtr',
            grandTotal: 'Grand Total'
        };
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
        this.isDragging = false;
        this.isDeferLayoutUpdate = (isNullOrUndefined(this.isDeferLayoutUpdate) && !this.isPopupView) ?
            this.allowDeferLayoutUpdate : this.isDeferLayoutUpdate;
        this.wireEvent();
    };
    /**
     * It performs to returnssorted headers.
     *
     * @param {IOlapField[]} fieldListData - It contains the olap field informations.
     * @param {fieldList} fieldList - It contains the olap field list informations.
     * @returns {ICustomProperties | IOlapCustomProperties} - It contains the internal properties that used for engine population.
     * @hidden
     */
    PivotFieldList.prototype.frameCustomProperties = function (fieldListData, fieldList) {
        if (this.pivotGridModule) {
            this.pivotGridModule.updatePageSettings(false);
        }
        var isTabular = this.pivotGridModule ? this.pivotGridModule.isTabular : false;
        var pageSettings = this.pivotGridModule ? this.pivotGridModule.pageSettings : this.pageSettings;
        var isPaging = this.pivotGridModule ? this.pivotGridModule.enablePaging : false;
        var isVirtualization = this.pivotGridModule ? this.pivotGridModule.enableVirtualization : false;
        var enableHtmlSanitizer = this.pivotGridModule ? this.pivotGridModule.enableHtmlSanitizer : this.enableHtmlSanitizer;
        var localeObj = this.pivotGridModule ? this.pivotGridModule.localeObj :
            (this.staticPivotGridModule ? this.staticPivotGridModule.localeObj : this.localeObj);
        var isDrillThrough = this.pivotGridModule ?
            (this.pivotGridModule.allowDrillThrough || this.pivotGridModule.editSettings.allowEditing) : true;
        var enableValueSorting = this.pivotGridModule ? this.pivotGridModule.enableValueSorting : undefined;
        var allowDataCompression = this.pivotGridModule && this.pivotGridModule.allowDataCompression ?
            this.pivotGridModule.allowDataCompression : false;
        var enableOptimizedRendering = this.pivotGridModule && (this.pivotGridModule.enableVirtualization &&
            this.pivotGridModule.virtualScrollSettings && this.pivotGridModule.virtualScrollSettings.allowSinglePage);
        var customProperties;
        if (this.dataType === 'olap') {
            customProperties = {
                mode: '',
                savedFieldList: fieldList ? fieldList : undefined,
                savedFieldListData: fieldListData ? fieldListData : undefined,
                pageSettings: pageSettings,
                enableValueSorting: enableValueSorting,
                isDrillThrough: isDrillThrough,
                localeObj: localeObj,
                enableVirtualization: isVirtualization,
                allowDataCompression: allowDataCompression
            };
        }
        else {
            customProperties = {
                mode: '',
                savedFieldList: undefined,
                pageSettings: pageSettings,
                enableValueSorting: enableValueSorting,
                isDrillThrough: isDrillThrough,
                localeObj: localeObj,
                clonedReport: this.clonedReport,
                globalize: this.globalize,
                currenyCode: this.currencyCode,
                enablePaging: isPaging,
                enableVirtualization: isVirtualization,
                enableHtmlSanitizer: enableHtmlSanitizer,
                allowDataCompression: allowDataCompression,
                enableOptimizedRendering: enableOptimizedRendering,
                isTabularLayout: isTabular
            };
        }
        return customProperties;
    };
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    PivotFieldList.prototype.render = function () {
        if (this.dataType === 'pivot' && this.dataSourceSettings.url && this.dataSourceSettings.url !== '') {
            if (this.dataSourceSettings.mode === 'Server') {
                this.guid = PivotUtil.generateUUID();
                this.initialLoad();
            }
            else {
                var request = new Fetch(this.dataSourceSettings.url, 'GET');
                request.send().then(function (response) { return typeof (response) === 'string' ? response : response.text(); })
                    .then(this.onReadyStateChange.bind(this));
            }
        }
        else {
            this.initialLoad();
        }
    };
    /**
     *
     * @hidden
     *
     */
    PivotFieldList.prototype.getEngine = function (action, drillItem, sortItem, aggField, cField, filterItem, memberName, rawDataArgs, editArgs) {
        var _this = this;
        this.currentAction = action;
        if (this.pivotGridModule) {
            this.pivotGridModule.updatePageSettings(false);
        }
        var customProperties = {
            pageSettings: this.pivotGridModule ? JSON.parse(this.pivotGridModule.getPageSettings()).pageSettings : undefined,
            enableValueSorting: this.pivotGridModule ? this.pivotGridModule.enableValueSorting : undefined,
            enableDrillThrough: this.pivotGridModule ?
                (this.pivotGridModule.allowDrillThrough || this.pivotGridModule.editSettings.allowEditing) : true,
            locale: JSON.stringify(PivotUtil.getLocalizedObject(this)),
            savedFieldList: (action === 'onDrop' && this.engineModule.fieldList !== null) ?
                PivotUtil.getClonedFieldList(this.engineModule.fieldList, true) : undefined,
            enableOptimizedRendering: this.pivotGridModule && (this.pivotGridModule.enableVirtualization &&
                this.pivotGridModule.virtualScrollSettings && this.pivotGridModule.virtualScrollSettings.allowSinglePage),
            requestType: 'string',
            headers: { 'Content-type': 'application/json' }
        };
        if (this.request.readyState === XMLHttpRequest.UNSENT || this.request.readyState === XMLHttpRequest.OPENED) {
            this.request.withCredentials = false;
        }
        var params = {
            request: this.request,
            dataSourceSettings: JSON.parse(this.getPersistData()).dataSourceSettings,
            action: action,
            customProperties: {},
            internalProperties: customProperties,
            drillItem: drillItem,
            sortItem: sortItem,
            aggregatedItem: aggField,
            calculatedItem: cField,
            filterItem: filterItem,
            memberName: memberName,
            fetchRawDataArgs: rawDataArgs,
            editArgs: editArgs,
            hash: this.pivotGridModule ? this.pivotGridModule.guid : this.staticPivotGridModule ?
                this.staticPivotGridModule.guid : this.guid,
            isGroupingUpdated: (this.currentAction === 'onRefresh' && this.dataSourceSettings.groupSettings.length > 0) ? true :
                ((this.pivotGridModule && this.pivotGridModule.groupingModule) ? this.pivotGridModule.groupingModule.isUpdate : false)
        };
        this.trigger(events.beforeServiceInvoke, params, function (observedArgs) {
            _this.request = observedArgs.request;
            params.internalProperties = observedArgs.internalProperties;
            params.customProperties = observedArgs.customProperties;
            params.dataSourceSettings = observedArgs.dataSourceSettings;
            params.calculatedItem = observedArgs.calculatedItem;
            params.drillItem = observedArgs.drillItem;
            params.editArgs = observedArgs.editArgs;
            params.fetchRawDataArgs = observedArgs.fetchRawDataArgs;
            params.filterItem = observedArgs.filterItem;
            params.hash = observedArgs.hash;
            params.memberName = observedArgs.memberName;
            params.sortItem = observedArgs.sortItem;
        });
        this.request.open('POST', this.dataSourceSettings.url, true);
        this.request.onreadystatechange = this.onSuccess.bind(this);
        var keys = Object.keys(params.internalProperties.headers);
        for (var i = 0; i < keys.length; i++) {
            var headerKey = keys[i];
            var headerValue = String(params.internalProperties.headers[headerKey]);
            this.request.setRequestHeader(headerKey, headerValue);
        }
        if (params.internalProperties.requestType === 'string') {
            this.request.send(JSON.stringify(params));
        }
        else if (params.internalProperties.requestType === 'base64') {
            this.request.send(btoa(JSON.stringify(params)));
        }
    };
    PivotFieldList.prototype.onSuccess = function () {
        if (this.request.readyState === XMLHttpRequest.DONE) {
            try {
                var params = {
                    action: this.currentAction,
                    response: this.request.responseText
                };
                this.trigger(events.afterServiceInvoke, params);
                var engine = JSON.parse(this.request.responseText);
                if (this.currentAction === 'fetchFieldMembers') {
                    var currentMembers = JSON.parse(engine.members);
                    var dateMembers = [];
                    var members = {};
                    this.engineModule.globalize = !isNullOrUndefined(this.globalize) ? this.globalize : new Internationalization();
                    this.engineModule.formatFields = this.engineModule.setFormattedFields(this.dataSourceSettings.formatSettings);
                    var isDateField = PivotUtil.isDateField(engine.memberName, this.engineModule);
                    var isNumberType = this.engineModule.fieldList[engine.memberName].type === 'number';
                    var keys = Object.keys(currentMembers);
                    for (var i = 0, j = keys.length; i < j; i++) {
                        var values = currentMembers[keys[i]];
                        var formattedValue = isDateField ?
                            this.engineModule.getFormattedValue(values.Name, engine.memberName) :
                            { formattedText: values.Caption };
                        members[keys[i]] = {
                            index: values.Index, ordinal: values.Ordinal,
                            isDrilled: values.IsDrilled, caption: formattedValue.formattedText
                        };
                        dateMembers.push({
                            formattedText: formattedValue.formattedText,
                            actualText: isDateField ? formattedValue.actualText : isNumberType ?
                                (!isNaN(Number(values.Name)) ? Number(values.Name) : values.Name) : values.Name
                        });
                    }
                    this.engineModule.fieldList[engine.memberName].members = members;
                    this.engineModule.fieldList[engine.memberName].dateMember = dateMembers;
                    this.pivotButtonModule.updateFilterEvents();
                }
                else {
                    var fList = PivotUtil.formatFieldList(JSON.parse(engine.fieldList));
                    if (this.engineModule.fieldList) {
                        var keys = Object.keys(this.engineModule.fieldList);
                        for (var i = 0; i < keys.length; i++) {
                            if (this.engineModule.fieldList[keys[i]] && fList[keys[i]]) {
                                fList[keys[i]].dateMember = this.engineModule.fieldList[keys[i]].dateMember;
                                fList[keys[i]].formattedMembers = this.engineModule.fieldList[keys[i]].formattedMembers;
                                fList[keys[i]].members = this.engineModule.fieldList[keys[i]].members;
                            }
                        }
                    }
                    this.engineModule.fieldList = fList;
                    this.engineModule.fields = JSON.parse(engine.fields);
                    this.engineModule.rowCount = JSON.parse(engine.pivotCount).RowCount;
                    this.engineModule.columnCount = JSON.parse(engine.pivotCount).ColumnCount;
                    this.engineModule.rowStartPos = JSON.parse(engine.pivotCount).RowStartPosition;
                    this.engineModule.colStartPos = JSON.parse(engine.pivotCount).ColumnStartPosition;
                    this.engineModule.rowFirstLvl = JSON.parse(engine.pivotCount).RowFirstLevel;
                    this.engineModule.colFirstLvl = JSON.parse(engine.pivotCount).ColumnFirstLevel;
                    var rowPos = void 0;
                    var pivotValues = PivotUtil.formatPivotValues(JSON.parse(engine.pivotValue));
                    for (var rCnt = 0; rCnt < pivotValues.length; rCnt++) {
                        if (pivotValues[rCnt] && pivotValues[rCnt][0] && pivotValues[rCnt][0].axis === 'row') {
                            rowPos = rCnt;
                            break;
                        }
                    }
                    this.engineModule.headerContent = PivotUtil.frameContent(pivotValues, 'header', rowPos, this);
                    this.engineModule.pageSettings = this.pivotGridModule ? this.pivotGridModule.pageSettings : undefined;
                    var valueSort = JSON.parse(engine.dataSourceSettings).ValueSortSettings;
                    this.engineModule.valueSortSettings = {
                        headerText: valueSort.HeaderText,
                        headerDelimiter: valueSort.HeaderDelimiter,
                        sortOrder: valueSort.SortOrder,
                        columnIndex: valueSort.ColumnIndex
                    };
                    this.engineModule.pivotValues = pivotValues;
                    this.engineModule.isEmptyData = this.dataSourceSettings.values.length === 0 ? true : false;
                }
            }
            catch (error) {
                this.engineModule.pivotValues = [];
            }
            if (this.currentAction !== 'fetchFieldMembers') {
                if (this.isInitial && !this.isPopupView) {
                    this.initEngine();
                    this.isInitial = false;
                }
                else {
                    this.enginePopulatedEventMethod(this, true, false);
                }
                if (this.calculatedFieldModule && this.currentAction === 'onCalcOperation') {
                    this.calculatedFieldModule.endDialog();
                    if (this.calculatedFieldModule.isRequireUpdate) {
                        this.calculatedFieldModule.isRequireUpdate = false;
                    }
                }
                if (this.pivotGridModule && this.pivotGridModule.calculatedFieldModule &&
                    this.pivotGridModule.calculatedFieldModule.isRequireUpdate) {
                    this.pivotGridModule.calculatedFieldModule.endDialog();
                    this.pivotGridModule.calculatedFieldModule.isRequireUpdate = false;
                }
            }
        }
    };
    PivotFieldList.prototype.onReadyStateChange = function (result) {
        var dataSource = [];
        if (this.dataSourceSettings.type === 'CSV') {
            var jsonObject = result.split(/\r?\n|\r/);
            for (var i = 0; i < jsonObject.length; i++) {
                if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
                    dataSource.push(jsonObject[i].split(','));
                }
            }
        }
        else {
            try {
                dataSource = JSON.parse(result);
            }
            catch (error) {
                dataSource = [];
            }
        }
        if (dataSource && dataSource.length > 0) {
            this.setProperties({ dataSourceSettings: { dataSource: dataSource } }, true);
        }
        this.initialLoad();
    };
    PivotFieldList.prototype.initialLoad = function () {
        var _this = this;
        var loadArgs = {
            dataSourceSettings: this.dataSourceSettings,
            defaultFieldListOrder: this.defaultFieldListOrder
        };
        this.trigger(events.load, loadArgs, function (observedArgs) {
            _this.dataSourceSettings = observedArgs.dataSourceSettings;
            _this.defaultFieldListOrder = loadArgs.defaultFieldListOrder;
            addClass([_this.element], cls.ROOT);
            if (_this.enableRtl) {
                addClass([_this.element], cls.RTL);
            }
            else {
                removeClass([_this.element], cls.RTL);
            }
            if (_this.isAdaptive) {
                addClass([_this.element], cls.DEVICE);
            }
            else {
                removeClass([_this.element], cls.DEVICE);
            }
            if (_this.cssClass) {
                addClass([_this.element], _this.cssClass.split(' '));
            }
            _this.notify(events.initialLoad, {});
        });
    };
    /**
     *
     * Binding events to the Pivot Field List element.
     *
     * @hidden
     */
    PivotFieldList.prototype.wireEvent = function () {
        this.on(events.initialLoad, this.generateData, this);
        this.on(events.dataReady, this.fieldListRender, this);
    };
    /**
     *
     * Unbinding events from the element on widget destroy.
     *
     * @hidden
     */
    PivotFieldList.prototype.unWireEvent = function () {
        if (this.pivotGridModule && this.pivotGridModule.isDestroyed) {
            return;
        }
        this.off(events.initialLoad, this.generateData);
        this.off(events.dataReady, this.fieldListRender);
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}
     */
    PivotFieldList.prototype.getPersistData = function () {
        var keyEntity = ['dataSourceSettings'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Get component name.
     *
     * @returns string
     * @private
     */
    PivotFieldList.prototype.getModuleName = function () {
        return 'pivotfieldlist';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @hidden
     */
    PivotFieldList.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'locale':
                    _super.prototype.refresh.call(this);
                    break;
                case 'dataSourceSettings':
                    if (newProp.dataSourceSettings && ((!isNullOrUndefined(newProp.dataSourceSettings.dataSource) &&
                        this.clonedDataSet !== newProp.dataSourceSettings.dataSource && newProp.dataSourceSettings.groupSettings) ||
                        (Object.keys(newProp.dataSourceSettings).length === 1 && Object.keys(newProp.dataSourceSettings)[0] === 'dataSource'
                            && this.dataSourceSettings.groupSettings.length > 0))) {
                        this.clonedDataSet = newProp.dataSourceSettings.dataSource;
                        this.engineModule.groupingFields = {};
                    }
                    if (newProp.dataSourceSettings && Object.keys(newProp.dataSourceSettings).length === 1
                        && newProp.dataSourceSettings.groupSettings && this.dataType === 'pivot') {
                        var control = !this.isPopupView ? this.staticPivotGridModule : this.pivotGridModule;
                        if (control) {
                            control.updateGroupingReport(newProp.dataSourceSettings.groupSettings, 'Date');
                        }
                    }
                    if (!isNullOrUndefined(newProp.dataSourceSettings.dataSource) || (this.dataType === 'olap' && !isNullOrUndefined(newProp.dataSourceSettings.url))) {
                        if (this.dataType !== 'olap') {
                            if (!isNullOrUndefined(this.savedDataSourceSettings)) {
                                PivotUtil.updateDataSourceSettings(this.staticPivotGridModule, this.savedDataSourceSettings);
                                this.savedDataSourceSettings = undefined;
                            }
                            if (newProp.dataSourceSettings.dataSource && (newProp.dataSourceSettings.dataSource.length === 0)
                                && !isNullOrUndefined(this.staticPivotGridModule)) {
                                this.savedDataSourceSettings =
                                    PivotUtil.getClonedDataSourceSettings(this.staticPivotGridModule.dataSourceSettings);
                                this.staticPivotGridModule.setProperties({ dataSourceSettings: {
                                        rows: [],
                                        columns: [],
                                        values: [],
                                        filters: []
                                    } }, true);
                            }
                        }
                        if (this.dataType === 'pivot') {
                            this.engineModule.fieldList = null;
                            this.engineModule.isEmptyData = true;
                            this.engineModule.data = [];
                            this.engineModule.pivotValues = [];
                            this.engineModule.groupingFieldsInfo = {};
                        }
                        else if (this.dataType === 'olap') {
                            this.olapEngineModule.fieldList = {};
                            this.olapEngineModule.fieldListData = undefined;
                            this.olapEngineModule.isEmptyData = true;
                        }
                        if (!isNullOrUndefined(this.staticPivotGridModule)) {
                            this.staticPivotGridModule.pivotValues = [];
                        }
                        this.initialLoad();
                    }
                    if (PivotUtil.isButtonIconRefesh(prop, oldProp, newProp)) {
                        if (this.isPopupView && this.pivotGridModule &&
                            this.pivotGridModule.showGroupingBar && this.pivotGridModule.groupingBarModule) {
                            var filters = PivotUtil.cloneFieldSettings(this.dataSourceSettings.filters);
                            var values = PivotUtil.cloneFieldSettings(this.dataSourceSettings.values);
                            var rows = PivotUtil.cloneFieldSettings(this.dataSourceSettings.rows);
                            var columns = PivotUtil.cloneFieldSettings(this.dataSourceSettings.columns);
                            this.pivotGridModule.setProperties({ dataSourceSettings: {
                                    rows: rows, columns: columns, values: values, filters: filters
                                } }, true);
                            this.pivotGridModule.axisFieldModule.render();
                        }
                        else if (!this.isPopupView && this.staticPivotGridModule && !this.staticPivotGridModule.isDestroyed) {
                            var pivot = this.staticPivotGridModule;
                            if (pivot.showGroupingBar && pivot.groupingBarModule) {
                                pivot.axisFieldModule.render();
                            }
                            if (pivot.showFieldList && pivot.pivotFieldListModule) {
                                var rows = PivotUtil.cloneFieldSettings(pivot.dataSourceSettings.rows);
                                var columns = PivotUtil.cloneFieldSettings(pivot.dataSourceSettings.columns);
                                var values = PivotUtil.cloneFieldSettings(pivot.dataSourceSettings.values);
                                var filters = PivotUtil.cloneFieldSettings(pivot.dataSourceSettings.filters);
                                pivot.pivotFieldListModule.setProperties({ dataSourceSettings: {
                                        rows: rows, columns: columns, values: values, filters: filters
                                    } }, true);
                                pivot.pivotFieldListModule.axisFieldModule.render();
                                if (pivot.pivotFieldListModule.treeViewModule.fieldTable && !pivot.isAdaptive) {
                                    pivot.pivotFieldListModule.notify(events.treeViewUpdate, {});
                                }
                            }
                        }
                        this.axisFieldModule.render();
                        if (this.treeViewModule.fieldTable && !this.isAdaptive) {
                            this.notify(events.treeViewUpdate, {});
                        }
                    }
                    else {
                        this.remoteData = [];
                        if (this.dataType === 'pivot' && this.dataSourceSettings.url && this.dataSourceSettings.url !== '' &&
                            ('type' in newProp.dataSourceSettings || 'url' in newProp.dataSourceSettings)) {
                            this.engineModule.fieldList = null;
                            this.render();
                        }
                    }
                    break;
                case 'aggregateTypes':
                    if (this.axisFieldModule) {
                        this.axisFieldModule.render();
                    }
                    if (this.pivotGridModule && this.pivotGridModule.axisFieldModule) {
                        this.pivotGridModule.setProperties({ aggregateTypes: newProp.aggregateTypes }, true);
                        this.pivotGridModule.axisFieldModule.render();
                    }
                    break;
                case 'showValuesButton':
                    if (this.axisFieldModule) {
                        this.axisFieldModule.render();
                    }
                    if (this.pivotGridModule && this.pivotGridModule.showGroupingBar &&
                        this.pivotGridModule.groupingBarModule && this.pivotGridModule.axisFieldModule) {
                        this.pivotGridModule.setProperties({ showValuesButton: newProp.showValuesButton }, true);
                        this.pivotGridModule.axisFieldModule.render();
                    }
                    break;
                case 'enableRtl':
                    if (this.enableRtl) {
                        addClass([this.element], cls.RTL);
                    }
                    else {
                        removeClass([this.element], cls.RTL);
                    }
                    requireRefresh = true;
                    break;
                case 'enableFieldSearching':
                case 'allowCalculatedField':
                    this.refresh();
                    break;
                case 'allowDeferLayoutUpdate':
                    this.isDeferLayoutUpdate = this.allowDeferLayoutUpdate;
                    this.fieldListRender();
                    break;
            }
            if (requireRefresh) {
                this.fieldListRender();
            }
        }
    };
    PivotFieldList.prototype.initEngine = function () {
        var _this = this;
        if (this.dataType === 'pivot') {
            var data = !isNullOrUndefined(this.dataSourceSettings.dataSource) ?
                this.dataSourceSettings.dataSource[0] : !isNullOrUndefined(this.engineModule.data) ?
                this.engineModule.data[0] : undefined;
            if (data && this.pivotCommon) {
                var isArray = Object.prototype.toString.call(data) === '[object Array]';
                if (isArray && this.dataSourceSettings.type === 'JSON') {
                    this.pivotCommon.errorDialog.createErrorDialog(this.localeObj.getConstant('error'), this.localeObj.getConstant('invalidJSON'));
                    return;
                }
                else if (!isArray && this.dataSourceSettings.type === 'CSV') {
                    this.pivotCommon.errorDialog.createErrorDialog(this.localeObj.getConstant('error'), this.localeObj.getConstant('invalidCSV'));
                    return;
                }
            }
        }
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings)
        };
        var control = this.isPopupView ? this.pivotGridModule : this;
        control.trigger(events.enginePopulating, args, function (observedArgs) {
            PivotUtil.updateDataSourceSettings(_this, observedArgs.dataSourceSettings);
            if (_this.dataType === 'pivot') {
                if (_this.dataSourceSettings.groupSettings && _this.dataSourceSettings.groupSettings.length > 0) {
                    var pivotDataSet = _this.engineModule.data;
                    _this.clonedDataSet = (_this.clonedDataSet ? _this.clonedDataSet : _this.dataSourceSettings.type === 'CSV' ? PivotUtil.getClonedCSVData(pivotDataSet)
                        : PivotUtil.getClonedData(pivotDataSet));
                    var dataSourceSettings = JSON.parse(_this.getPersistData()).dataSourceSettings;
                    dataSourceSettings.dataSource = [];
                    _this.clonedReport = _this.clonedReport ? _this.clonedReport : dataSourceSettings;
                }
                var customProperties = _this.frameCustomProperties();
                customProperties.enableValueSorting = _this.staticPivotGridModule ?
                    _this.staticPivotGridModule.enableValueSorting : _this.enableValueSorting;
                if (_this.dataSourceSettings.mode !== 'Server') {
                    _this.engineModule.renderEngine(_this.dataSourceSettings, customProperties, _this.aggregateCellInfo
                        ? _this.getValueCellInfo.bind(_this) : undefined, _this.onHeadersSort ? _this.getHeaderSortInfo.bind(_this) : undefined);
                }
                _this.pivotFieldList = _this.engineModule.fieldList;
                var eventArgs = {
                    pivotFieldList: _this.pivotFieldList,
                    pivotValues: _this.engineModule.pivotValues
                };
                var this$_1 = _this;
                control.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                    this$_1.pivotFieldList = observedArgs.pivotFieldList;
                    this$_1.engineModule.pivotValues = observedArgs.pivotValues;
                    this$_1.notify(events.dataReady, {});
                    this$_1.trigger(events.dataBound);
                });
            }
            else if (_this.dataType === 'olap') {
                PivotUtil.renderOlapEngine(_this);
                _this.pivotFieldList = _this.olapEngineModule.fieldList;
                var eventArgs = {
                    pivotFieldList: _this.pivotFieldList,
                    pivotValues: _this.olapEngineModule.pivotValues
                };
                var this$_2 = _this;
                control.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                    this$_2.pivotFieldList = observedArgs.pivotFieldList;
                    this$_2.olapEngineModule.pivotValues = observedArgs.pivotValues;
                    this$_2.notify(events.dataReady, {});
                    this$_2.trigger(events.dataBound);
                });
            }
        });
        if (this.defaultFieldListOrder !== 'None') {
            if (this.treeViewModule.fieldTable && !this.isAdaptive) {
                this.notify(events.treeViewUpdate, {});
            }
        }
    };
    PivotFieldList.prototype.generateData = function () {
        this.pivotFieldList = {};
        if (this.dataSourceSettings && (this.dataSourceSettings.dataSource || this.dataSourceSettings.url)) {
            if ((this.dataSourceSettings.url !== '' && this.dataType === 'olap') ||
                (!isNullOrUndefined(this.dataSourceSettings.dataSource) && this.dataSourceSettings.dataSource.length > 0)) {
                if (this.dataType === 'pivot') {
                    this.engineModule.data = this.dataSourceSettings.dataSource;
                }
                this.initEngine();
            }
            else if (this.dataSourceSettings.dataSource instanceof DataManager) {
                if (this.dataType === 'pivot' && this.remoteData.length > 0) {
                    this.engineModule.data = this.remoteData;
                    this.initEngine();
                }
                else {
                    setTimeout(this.getData.bind(this), 100);
                }
            }
            else {
                if (this.dataSourceSettings.mode === 'Server') {
                    this.getEngine('onRefresh');
                }
                else {
                    this.notify(events.dataReady, {});
                }
            }
        }
        else {
            this.notify(events.dataReady, {});
            this.trigger(events.dataBound);
        }
    };
    PivotFieldList.prototype.getValueCellInfo = function (aggregateObj) {
        var args = aggregateObj;
        this.trigger(events.aggregateCellInfo, args);
        return args;
    };
    /**
     *
     * @param {HeadersSortEventArgs} sortingObj - It contains the current sorting information.
     * @returns {void}
     * @hidden
     */
    PivotFieldList.prototype.getHeaderSortInfo = function (sortingObj) {
        var args = sortingObj;
        this.trigger(events.onHeadersSort, args);
        return args;
    };
    PivotFieldList.prototype.getData = function () {
        if (this.dataSourceSettings.dataSource.defaultQuery) {
            this.dataSourceSettings.dataSource.executeQuery(this.dataSourceSettings.dataSource
                .defaultQuery).then(this.executeQuery.bind(this));
        }
        else {
            this.dataSourceSettings.dataSource.executeQuery(new Query()).then(this.executeQuery.bind(this));
        }
    };
    PivotFieldList.prototype.executeQuery = function (e) {
        this.engineModule.data = e.result;
        this.initEngine();
    };
    PivotFieldList.prototype.fieldListRender = function () {
        this.element.innerHTML = '';
        var showDialog;
        if (this.renderMode === 'Popup' && this.dialogRenderer.fieldListDialog && !this.dialogRenderer.fieldListDialog.isDestroyed) {
            showDialog = this.dialogRenderer.fieldListDialog.visible;
            this.dialogRenderer.fieldListDialog.destroy();
            remove(document.getElementById(this.element.id + '_Container'));
        }
        this.renderModule.render();
        if (this.renderMode === 'Popup') {
            this.fieldListSpinnerElement = this.dialogRenderer.fieldListDialog.element;
            if (showDialog) {
                this.dialogRenderer.fieldListDialog.show();
            }
        }
        else {
            this.fieldListSpinnerElement = this.element.querySelector('.e-pivotfieldlist-container');
        }
        if (this.spinnerTemplate) {
            createSpinner({
                target: this.fieldListSpinnerElement, template: this.spinnerTemplate,
                cssClass: this.cssClass ? this.cssClass : undefined
            }, this.createElement);
        }
        else {
            createSpinner({ target: this.fieldListSpinnerElement, cssClass: this.cssClass ? this.cssClass : undefined }, this.createElement);
        }
        var args = {
            pivotEngine: this.dataType === 'olap' ? this.olapEngineModule : this.engineModule,
            dataSourceSettings: this.dataSourceSettings,
            id: this.element.id,
            element: this.renderMode === 'Popup' ? this.dialogRenderer.fieldListDialog.element : select('#' + this.element.id + '_Container', this.element),
            moduleName: this.getModuleName(),
            enableRtl: this.enableRtl,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            isAdaptive: this.isAdaptive,
            renderMode: this.renderMode,
            localeObj: this.localeObj,
            dataType: this.dataType,
            cssClass: this.cssClass
        };
        this.pivotCommon = new PivotCommon(args);
        this.pivotCommon.control = this;
        if (this.allowDeferLayoutUpdate) {
            this.clonedDataSource = PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings);
            if (this.dataType === 'olap') {
                this.clonedFieldListData = PivotUtil.cloneOlapFieldSettings(this.olapEngineModule.fieldListData);
            }
            this.clonedFieldList = PivotUtil.getClonedFieldList(this.pivotFieldList);
        }
        var control = !this.isPopupView ? this.staticPivotGridModule : this.pivotGridModule;
        if (control && control.toolbarModule) {
            PivotUtil.toggleFieldListIconVisibility(control);
        }
    };
    PivotFieldList.prototype.getFieldCaption = function (dataSourceSettings) {
        var captionData = this.getFields(dataSourceSettings);
        var engineModule = this.dataType === 'olap' ? this.olapEngineModule : this.engineModule;
        if (captionData.length > 0 && engineModule && engineModule.fieldList) {
            var lnt = captionData.length;
            while (lnt--) {
                if (captionData[lnt]) {
                    for (var _i = 0, _a = captionData[lnt]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        if (obj) {
                            if (engineModule.fieldList[obj.name]) {
                                if (obj.caption) {
                                    engineModule.fieldList[obj.name].caption = obj.caption;
                                }
                                else {
                                    engineModule.fieldList[obj.name].caption = obj.name;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            return;
        }
    };
    PivotFieldList.prototype.getFields = function (dataSourceSettings) {
        return [dataSourceSettings.rows, dataSourceSettings.columns, dataSourceSettings.values,
            dataSourceSettings.filters];
    };
    /**
     * Updates the PivotEngine using dataSource from Pivot Field List component.
     *
     * @function updateDataSource
     * @returns {void}
     * @hidden
     */
    PivotFieldList.prototype.updateDataSource = function (isTreeViewRefresh, isEngineRefresh) {
        var _this = this;
        if (this.pivotGridModule) {
            this.pivotGridModule.showWaitingPopup();
        }
        showSpinner(this.fieldListSpinnerElement);
        var pivot = this;
        var control = pivot.isPopupView ? pivot.pivotGridModule : pivot;
        //setTimeout(() => {
        var isOlapDataRefreshed = false;
        var pageSettings = pivot.pivotGridModule && (pivot.pivotGridModule.enableVirtualization
            || pivot.pivotGridModule.enablePaging) ? pivot.pivotGridModule.pageSettings : undefined;
        var isCalcChange = Object.keys(pivot.lastCalcFieldInfo).length > 0 ? true : false;
        var isSorted = Object.keys(pivot.lastSortInfo).length > 0 ? true : false;
        var isAggChange = Object.keys(pivot.lastAggregationInfo).length > 0 ? true : false;
        var isFiltered = Object.keys(pivot.lastFilterInfo).length > 0 ? true : false;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(pivot.dataSourceSettings)
        };
        control.trigger(events.enginePopulating, args, function (observedArgs) {
            if (!(pageSettings && (isSorted || isFiltered || isAggChange || isCalcChange))) {
                PivotUtil.updateDataSourceSettings(pivot, observedArgs.dataSourceSettings);
                PivotUtil.updateDataSourceSettings(pivot.pivotGridModule, observedArgs.dataSourceSettings);
            }
            if (isNullOrUndefined(isEngineRefresh)) {
                var enableValueSorting = isSorted ? false : pivot.staticPivotGridModule ?
                    pivot.staticPivotGridModule.enableValueSorting : pivot.enableValueSorting;
                if (isSorted && pivot.dataSourceSettings.valueSortSettings.headerText !== '') {
                    if (pivot.pivotGridModule) {
                        pivot.pivotGridModule.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
                    }
                    pivot.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
                }
                if (pivot.dataType === 'pivot') {
                    var customProperties = pivot.frameCustomProperties();
                    customProperties.enableValueSorting = enableValueSorting;
                    customProperties.savedFieldList = pivot.pivotFieldList;
                    if (pageSettings && (isSorted || isFiltered || isAggChange || isCalcChange) && !pivot.allowDeferLayoutUpdate) {
                        if (isSorted) {
                            if (control.dataSourceSettings.mode === 'Server') {
                                control.getEngine('onSort', null, pivot.lastSortInfo, null, null, null, null);
                            }
                            else {
                                pivot.engineModule.onSort(pivot.lastSortInfo);
                            }
                            pivot.lastSortInfo = {};
                        }
                        if (isFiltered) {
                            if (control.dataSourceSettings.mode === 'Server') {
                                control.getEngine('onFilter', null, null, null, null, pivot.lastFilterInfo, null);
                            }
                            else {
                                pivot.engineModule.onFilter(pivot.lastFilterInfo, pivot.dataSourceSettings);
                            }
                            pivot.lastFilterInfo = {};
                        }
                        if (isAggChange) {
                            if (control.dataSourceSettings.mode === 'Server') {
                                control.getEngine('onAggregation', null, null, pivot.lastAggregationInfo, null, null, null);
                            }
                            else {
                                pivot.engineModule.onAggregation(pivot.lastAggregationInfo);
                            }
                            pivot.lastAggregationInfo = {};
                        }
                        if (isCalcChange) {
                            if (control.dataSourceSettings.mode === 'Server') {
                                control.getEngine('onCalcOperation', null, null, null, pivot.lastCalcFieldInfo, null, null);
                            }
                            else {
                                pivot.engineModule.onCalcOperation(pivot.lastCalcFieldInfo, pivot.dataSourceSettings);
                            }
                            pivot.lastCalcFieldInfo = {};
                        }
                    }
                    else {
                        if (pivot.dataSourceSettings.mode === 'Server') {
                            if (isSorted) {
                                pivot.getEngine('onSort', null, pivot.lastSortInfo, null, null, null, null);
                            }
                            else if (isAggChange) {
                                pivot.getEngine('onAggregation', null, null, pivot.lastAggregationInfo, null, null, null);
                            }
                            else if (isCalcChange) {
                                pivot.getEngine('onCalcOperation', null, null, null, pivot.lastCalcFieldInfo, null, null);
                            }
                            else if (isFiltered) {
                                pivot.getEngine('onFilter', null, null, null, null, pivot.lastFilterInfo, null);
                            }
                            else {
                                pivot.getEngine('onDrop', null, null, null, null, null, null);
                            }
                        }
                        else {
                            pivot.engineModule.renderEngine(pivot.dataSourceSettings, customProperties, pivot.aggregateCellInfo ?
                                pivot.getValueCellInfo.bind(pivot) : undefined, pivot.onHeadersSort ?
                                pivot.getHeaderSortInfo.bind(pivot) : undefined);
                        }
                        pivot.lastSortInfo = {};
                        pivot.lastAggregationInfo = {};
                        pivot.lastCalcFieldInfo = {};
                        pivot.lastFilterInfo = {};
                    }
                }
                else {
                    isOlapDataRefreshed = pivot.updateOlapDataSource(pivot, isSorted, isCalcChange, isOlapDataRefreshed, enableValueSorting, isFiltered);
                }
                pivot.getFieldCaption(pivot.dataSourceSettings);
            }
            else {
                pivot.axisFieldModule.render();
                if (pivot.pivotGridModule) {
                    pivot.pivotGridModule.notify(events.uiUpdate, pivot);
                }
                pivot.isRequiredUpdate = false;
            }
            if (pivot.dataSourceSettings.mode !== 'Server') {
                pivot.enginePopulatedEventMethod(pivot, isTreeViewRefresh, isOlapDataRefreshed);
            }
            else if ((pivot.allowDeferLayoutUpdate && !pivot.isRequiredUpdate) || pivot.isRequiredUpdate) {
                hideSpinner(_this.fieldListSpinnerElement);
                if (_this.pivotGridModule) {
                    _this.pivotGridModule.hideWaitingPopup();
                }
            }
        });
        //});
    };
    PivotFieldList.prototype.enginePopulatedEventMethod = function (pivot, isTreeViewRefresh, isOlapDataRefreshed) {
        var _this = this;
        var control = pivot.isPopupView ? pivot.pivotGridModule : pivot;
        var eventArgs = {
            dataSourceSettings: pivot.dataSourceSettings,
            pivotFieldList: pivot.dataType === 'pivot' ? pivot.engineModule.fieldList : pivot.olapEngineModule.fieldList,
            pivotValues: pivot.dataType === 'pivot' ? pivot.engineModule.pivotValues : pivot.olapEngineModule.pivotValues
        };
        control.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
            pivot.dataSourceSettings = observedArgs.dataSourceSettings;
            pivot.pivotCommon.dataSourceSettings = pivot.dataSourceSettings;
            pivot.pivotFieldList = observedArgs.pivotFieldList;
            if (pivot.dataType === 'olap') {
                pivot.olapEngineModule.pivotValues = observedArgs.pivotValues;
                pivot.pivotCommon.engineModule = pivot.olapEngineModule;
            }
            else {
                pivot.engineModule.pivotValues = observedArgs.pivotValues;
                pivot.pivotCommon.engineModule = pivot.engineModule;
            }
            if (!isTreeViewRefresh && pivot.treeViewModule.fieldTable && !pivot.isAdaptive) {
                pivot.notify(events.treeViewUpdate, {});
            }
            if (pivot.isRequiredUpdate) {
                if (pivot.allowDeferLayoutUpdate) {
                    pivot.clonedDataSource = PivotUtil.getClonedDataSourceSettings(pivot.dataSourceSettings);
                    if (_this.dataType === 'olap') {
                        _this.clonedFieldListData = PivotUtil.cloneOlapFieldSettings(_this.olapEngineModule.fieldListData);
                    }
                    pivot.clonedFieldList = PivotUtil.getClonedFieldList(pivot.pivotFieldList);
                }
                pivot.updateView(pivot.pivotGridModule);
            }
            else if (_this.isPopupView && (_this.isDeferLayoutUpdate || (pivot.pivotGridModule &&
                pivot.pivotGridModule.pivotDeferLayoutUpdate))) {
                pivot.pivotGridModule.engineModule = pivot.engineModule;
                pivot.pivotGridModule.setProperties({
                    dataSourceSettings: pivot.dataSourceSettings.properties
                }, true);
                pivot.pivotGridModule.notify(events.uiUpdate, pivot);
                hideSpinner(pivot.fieldListSpinnerElement);
            }
            if ((_this.isPopupView && pivot.pivotGridModule && pivot.pivotGridModule.allowDeferLayoutUpdate && !pivot.isRequiredUpdate) ||
                !isNullOrUndefined(pivot.pivotGridModule)) {
                hideSpinner(pivot.fieldListSpinnerElement);
                pivot.pivotGridModule.hideWaitingPopup();
            }
            pivot.isRequiredUpdate = true;
            if (!pivot.pivotGridModule || isOlapDataRefreshed) {
                hideSpinner(pivot.fieldListSpinnerElement);
            }
            else {
                pivot.pivotGridModule.fieldListSpinnerElement = pivot.fieldListSpinnerElement;
            }
        });
        var actionName = this.getActionCompleteName();
        this.actionObj.actionName = actionName;
        if (this.actionObj.actionName) {
            this.actionCompleteMethod();
        }
    };
    PivotFieldList.prototype.updateOlapDataSource = function (pivot, isSorted, isCalcChange, isOlapDataRefreshed, enableValueSorting, isFiltered) {
        var customProperties = pivot.frameCustomProperties(pivot.olapEngineModule.fieldListData, pivot.olapEngineModule.fieldList);
        customProperties.enableValueSorting = enableValueSorting;
        customProperties.savedFieldList = pivot.pivotFieldList;
        if ((isCalcChange || isSorted) && !isFiltered) {
            pivot.olapEngineModule.savedFieldList = pivot.pivotFieldList;
            pivot.olapEngineModule.savedFieldListData = pivot.olapEngineModule.fieldListData;
            if (isCalcChange) {
                pivot.olapEngineModule.updateCalcFields(pivot.dataSourceSettings, pivot.lastCalcFieldInfo);
                pivot.lastCalcFieldInfo = {};
                isOlapDataRefreshed = pivot.olapEngineModule.dataFields[pivot.lastCalcFieldInfo.name] ? false : true;
                if (pivot.pivotGridModule) {
                    pivot.pivotGridModule.hideWaitingPopup();
                }
            }
            else {
                pivot.olapEngineModule.onSort(pivot.dataSourceSettings);
            }
        }
        else {
            PivotUtil.renderOlapEngine(pivot, customProperties);
        }
        pivot.lastSortInfo = {};
        pivot.lastAggregationInfo = {};
        pivot.lastCalcFieldInfo = {};
        pivot.lastFilterInfo = {};
        return isOlapDataRefreshed;
    };
    /**
     * Updates the Pivot Field List component using dataSource from PivotView component.
     *
     * @function update
     * @param {PivotView} control - Pass the instance of pivot table component.
     * @returns {void}
     */
    PivotFieldList.prototype.update = function (control) {
        if (control) {
            this.clonedDataSet = control.clonedDataSet;
            this.clonedReport = control.clonedReport;
            this.setProperties({ dataSourceSettings: control.dataSourceSettings, showValuesButton: control.showValuesButton }, true);
            this.engineModule = control.engineModule;
            this.olapEngineModule = control.olapEngineModule;
            this.dataType = control.dataType;
            this.pivotFieldList = this.dataType === 'olap' ? control.olapEngineModule.fieldList : control.engineModule.fieldList;
            if (this.isPopupView) {
                this.pivotGridModule = control;
            }
            else {
                this.staticPivotGridModule = control;
            }
            this.getFieldCaption(control.dataSourceSettings);
            this.pivotCommon.engineModule = this.dataType === 'olap' ? this.olapEngineModule : this.engineModule;
            this.pivotCommon.dataSourceSettings = this.dataSourceSettings;
            this.pivotCommon.control = this;
            if (this.treeViewModule.fieldTable && !this.isAdaptive) {
                this.notify(events.treeViewUpdate, {});
            }
            this.axisFieldModule.render();
            if (!this.isPopupView && this.allowDeferLayoutUpdate) {
                this.clonedDataSource = PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings);
                if (this.dataType === 'olap') {
                    this.clonedFieldListData = PivotUtil.cloneOlapFieldSettings(this.olapEngineModule.fieldListData);
                }
                this.clonedFieldList = PivotUtil.getClonedFieldList(this.pivotFieldList);
            }
        }
    };
    /**
     * Updates the PivotView component using dataSource from Pivot Field List component.
     *
     * @function updateView
     * @param {PivotView} control - Pass the instance of pivot table component.
     * @returns {void}
     */
    PivotFieldList.prototype.updateView = function (control) {
        if (control) {
            var isOlapCalcFieldAdded = this.actionObj.actionName === 'Calculated field applied' && control.dataType === 'olap';
            if (control.element.querySelector('.e-spin-hide') && !isOlapCalcFieldAdded &&
                (!(this.allowDeferLayoutUpdate && !this.isDeferUpdateApplied) || (control.isInitial && control.currentView !== 'Chart'))) {
                control.showWaitingPopup();
            }
            control.clonedDataSet = this.clonedDataSet;
            control.clonedReport = this.clonedReport;
            control.setProperties({ dataSourceSettings: this.dataSourceSettings, showValuesButton: this.showValuesButton }, true);
            control.engineModule = this.engineModule;
            control.olapEngineModule = this.olapEngineModule;
            control.dataType = this.dataType;
            if (!this.pivotChange) {
                control.pivotValues = this.dataType === 'olap' ? this.olapEngineModule.pivotValues : this.engineModule.pivotValues;
            }
            var eventArgs = {
                dataSourceSettings: PivotUtil.getClonedDataSourceSettings(control.dataSourceSettings),
                pivotValues: control.pivotValues
            };
            control.trigger(events.fieldListRefreshed, eventArgs);
            if (!this.isPopupView && ((this.dataType === 'olap' ?
                this.olapEngineModule.isEngineUpdated : this.engineModule.isEngineUpdated) || this.isInitial)) {
                this.staticPivotGridModule = control;
                control.isStaticRefresh = true;
                control.isStaticFieldList = true;
            }
            this.isDeferUpdateApplied = false;
            if (this.staticPivotGridModule) {
                this.staticPivotGridModule.isServerWaitingPopup = true;
            }
            control.dataBind();
        }
    };
    /**
     * Called internally to trigger populate event.
     *
     * @hidden
     */
    PivotFieldList.prototype.triggerPopulateEvent = function () {
        var _this = this;
        var control = this.isPopupView ? this.pivotGridModule : this;
        var eventArgs = {
            dataSourceSettings: this.dataSourceSettings,
            pivotFieldList: this.dataType === 'olap' ? this.olapEngineModule.fieldList : this.engineModule.fieldList,
            pivotValues: this.dataType === 'olap' ? this.olapEngineModule.pivotValues : this.engineModule.pivotValues
        };
        control.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
            _this.dataSourceSettings = observedArgs.dataSourceSettings;
            _this.pivotFieldList = observedArgs.pivotFieldList;
            if (_this.dataType === 'olap') {
                _this.olapEngineModule.pivotValues = observedArgs.pivotValues;
            }
            else {
                _this.engineModule.pivotValues = observedArgs.pivotValues;
            }
        });
    };
    /** @hidden */
    PivotFieldList.prototype.actionBeginMethod = function () {
        var eventArgs = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings),
            actionName: this.actionObj.actionName,
            fieldInfo: this.actionObj.fieldInfo,
            cancel: false
        };
        var control = this.isPopupView ? this.pivotGridModule : this;
        control.trigger(events.actionBegin, eventArgs);
        return eventArgs.cancel;
    };
    /** @hidden */
    PivotFieldList.prototype.actionCompleteMethod = function () {
        var eventArgs = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings),
            actionName: this.actionObj.actionName,
            fieldInfo: this.actionObj.fieldInfo,
            actionInfo: this.actionObj.actionInfo
        };
        var control = this.isPopupView ? this.pivotGridModule : this;
        control.trigger(events.actionComplete, eventArgs);
        this.actionObj.actionName = '';
        this.actionObj.actionInfo = undefined;
        this.actionObj.fieldInfo = undefined;
    };
    /** @hidden */
    PivotFieldList.prototype.actionFailureMethod = function (error) {
        var eventArgs = {
            actionName: this.actionObj.actionName,
            errorInfo: error
        };
        var control = this.isPopupView ? this.pivotGridModule : this;
        control.trigger(events.actionFailure, eventArgs);
    };
    /** @hidden */
    PivotFieldList.prototype.getActionCompleteName = function () {
        var actionName = (this.actionObj.actionName === events.openCalculatedField) ? events.calculatedFieldApplied :
            (this.actionObj.actionName === events.editCalculatedField) ? events.calculatedFieldEdited :
                (this.actionObj.actionName === events.sortField) ? events.fieldSorted : (this.actionObj.actionName === events.filterField)
                    ? events.fieldFiltered : (this.actionObj.actionName === events.removeField) ? events.fieldRemoved
                    : (this.actionObj.actionName === events.aggregateField) ? events.fieldAggregated :
                        this.actionObj.actionName === events.sortFieldTree ? events.fieldTreeSorted : this.actionObj.actionName;
        return actionName;
    };
    /**
     * Destroys the Field Table component.
     *
     * @function destroy
     * @returns {void}
     */
    PivotFieldList.prototype.destroy = function () {
        this.unWireEvent();
        if (this.engineModule && !this.destroyEngine) {
            this.engineModule.fieldList = {};
            this.engineModule.rMembers = null;
            this.engineModule.cMembers = null;
            this.engineModule.valueMatrix = [];
            this.engineModule = {};
        }
        if (this.olapEngineModule && !this.destroyEngine) {
            this.olapEngineModule.fieldList = {};
            this.olapEngineModule = {};
        }
        if (this.pivotFieldList) {
            this.pivotFieldList = {};
        }
        if (this.contextMenuModule) {
            this.contextMenuModule.destroy();
        }
        if (this.treeViewModule) {
            this.treeViewModule.destroy();
        }
        if (this.pivotButtonModule) {
            this.pivotButtonModule.destroy();
        }
        if (this.pivotCommon) {
            this.pivotCommon.destroy();
        }
        if (this.dialogRenderer) {
            this.dialogRenderer.destroy();
        }
        if (this.calculatedFieldModule) {
            this.calculatedFieldModule.destroy();
        }
        _super.prototype.destroy.call(this);
        if (this.contextMenuModule) {
            this.contextMenuModule = null;
        }
        if (this.treeViewModule) {
            this.treeViewModule = null;
        }
        if (this.pivotButtonModule) {
            this.pivotButtonModule = null;
        }
        if (this.pivotCommon) {
            this.pivotCommon = null;
        }
        if (this.dialogRenderer) {
            this.dialogRenderer = null;
        }
        if (this.calculatedFieldModule) {
            this.calculatedFieldModule = null;
        }
        if (this.axisFieldModule) {
            this.axisFieldModule = null;
        }
        if (this.axisTableModule) {
            this.axisTableModule = null;
        }
        if (this.renderModule) {
            this.renderModule = null;
        }
        if (this.clonedDataSet) {
            this.clonedDataSet = null;
        }
        if (this.clonedReport) {
            this.clonedReport = null;
        }
        if (this.clonedFieldList) {
            this.clonedFieldList = null;
        }
        if (this.clonedFieldListData) {
            this.clonedFieldListData = null;
        }
        if (this.localeObj) {
            this.localeObj = null;
        }
        if (this.defaultLocale) {
            this.defaultLocale = null;
        }
        this.element.innerHTML = '';
        removeClass([this.element], cls.ROOT);
        removeClass([this.element], cls.RTL);
        removeClass([this.element], cls.DEVICE);
    };
    __decorate([
        Complex({}, DataSourceSettings)
    ], PivotFieldList.prototype, "dataSourceSettings", void 0);
    __decorate([
        Property('Popup')
    ], PivotFieldList.prototype, "renderMode", void 0);
    __decorate([
        Property()
    ], PivotFieldList.prototype, "target", void 0);
    __decorate([
        Property('')
    ], PivotFieldList.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "allowCalculatedField", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "enableFieldSearching", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "showValuesButton", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "allowDeferLayoutUpdate", void 0);
    __decorate([
        Property(1000)
    ], PivotFieldList.prototype, "maxNodeLimitInMemberEditor", void 0);
    __decorate([
        Property(true)
    ], PivotFieldList.prototype, "loadOnDemandInMemberEditor", void 0);
    __decorate([
        Property()
    ], PivotFieldList.prototype, "spinnerTemplate", void 0);
    __decorate([
        Property(['Sum', 'Count', 'DistinctCount', 'Product', 'Min', 'Max', 'Avg', 'Median', 'Index', 'PopulationVar', 'SampleVar', 'PopulationStDev', 'SampleStDev', 'RunningTotals', 'PercentageOfGrandTotal', 'PercentageOfColumnTotal', 'PercentageOfRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentRowTotal', 'DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentTotal'])
    ], PivotFieldList.prototype, "aggregateTypes", void 0);
    __decorate([
        Property('USD')
    ], PivotFieldList.prototype, "currencyCode", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "load", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "enginePopulating", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "memberFiltering", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "enginePopulated", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "onFieldDropped", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "fieldDrop", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "fieldDragStart", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "aggregateCellInfo", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "memberEditorOpen", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "calculatedFieldCreate", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "aggregateMenuOpen", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "fieldRemove", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "created", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "beforeServiceInvoke", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "afterServiceInvoke", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "onHeadersSort", void 0);
    PivotFieldList = __decorate([
        NotifyPropertyChanges
    ], PivotFieldList);
    return PivotFieldList;
}(Component));
export { PivotFieldList };
