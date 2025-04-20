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
import { Property, Browser, Component, createElement, setStyleAttribute, Fetch } from '@syncfusion/ej2-base';
import { EventHandler, Complex, ChildProperty, Collection, isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { Internationalization, L10n, NotifyPropertyChanges, compile, formatUnit } from '@syncfusion/ej2-base';
import { removeClass, addClass, Event, setValue, closest, select, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { initializeCSPTemplate } from '@syncfusion/ej2-base';
import { PivotEngine } from '../../base/engine';
import { Tooltip, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { Render } from '../renderer/render';
import { Common } from '../../common/actions/common';
import { DataSourceSettings } from '../../model/datasourcesettings';
import { GridSettings } from '../model/gridsettings';
import { Grid, Reorder, Resize, getObject } from '@syncfusion/ej2-grids';
import { getScrollBarWidth } from '@syncfusion/ej2-grids';
import { KeyboardInteraction } from '../actions/keyboard';
import { PivotContextMenu } from '../../common/popups/context-menu';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { VirtualScroll } from '../actions/virtualscroll';
import { DrillThrough } from '../actions/drill-through';
import { PivotUtil } from '../../base/util';
import { PivotChart } from '../../pivotchart/index';
import { ChartSettings } from '../model/chartsettings';
import { Chart, AccumulationChart } from '@syncfusion/ej2-charts';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { OlapEngine } from '../../base/olap/engine';
import { ChartExport } from '../../pivotchart/actions/chart-export';
import { Save } from '@syncfusion/ej2-file-utils';
/**
 * Allows a set of options for customizing the grouping bar UI with a variety of settings such as UI visibility to a specific view port,
 * customizing the pivot button features such as filtering, sorting, changing aggregate types, removing any fields.
 * The options available to customize the grouping bar UI are:
 * * `showFilterIcon`: Allows you to show or hide the filter icon that used to be displayed on the pivot button of the grouping bar UI.
 * This filter icon is used to filter the members of a particular field at runtime in the pivot table.
 * * `showSortIcon`: Allows you to show or hide the sort icon that used to be displayed in the pivot button of the grouping bar UI.
 * This sort icon is used to order members of a particular fields either in ascending or descending at runtime.
 * * `showRemoveIcon`: Allows you to show or hide the remove icon that used to be displayed in the pivot button of the grouping bar UI.
 * This remove icon is used to remove any field during runtime.
 * * `showValueTypeIcon`: Allows you to show or hide the value type icon that used to be displayed in the pivot button of the grouping bar UI.
 * This value type icon helps to select the appropriate aggregation type to value fields at runtime.
 * * `displayMode`: Allow options to show the grouping bar UI to specific view port such as either pivot table or pivot chart or both table and chart.
 * For example, to show the grouping bar UI to pivot table on its own, set the property `displayMode` to **Table**.
 * * `allowDragAndDrop`: Allows you to restrict the pivot buttons that were used to drag on runtime in the grouping bar UI. This will prevent you from modifying the current report.
 */
var GroupingBarSettings = /** @class */ (function (_super) {
    __extends(GroupingBarSettings, _super);
    function GroupingBarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showFilterIcon", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showSortIcon", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showRemoveIcon", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showValueTypeIcon", void 0);
    __decorate([
        Property('Both')
    ], GroupingBarSettings.prototype, "displayMode", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Property(false)
    ], GroupingBarSettings.prototype, "showFieldsPanel", void 0);
    return GroupingBarSettings;
}(ChildProperty));
export { GroupingBarSettings };
/**
 * Allow options for performing CRUD operations, such as add, edit, delete, and update the raw items of any cell from the pivot table.
 * The raw items can be viewed in a data grid that used to be displayed as a dialog by double-clicking the appropriate value cell in the pivot table.
 * CRUD operations can be performed in this data grid either by double-clicking the cells or using toolbar options.
 * The options available are as follows:
 * * `allowAdding`: Allows you to add a new record to the data grid used to update the appropriate cells in the pivot table.
 * * `allowEditing`: Allows you to edit the existing record in the data grid that used to update the appropriate cells in the pivot table.
 * * `allowDeleting`: Allows you to delete the existing record from the data grid that used to  update the appropriate cells in the pivot table.
 * * `allowCommandColumns`: Allows an additional column appended in the data grid layout holds the command buttons to perform the CRUD operations to edit,
 * delete, and update the raw items to the data grid that used to update the appropriate cells in the pivot table.
 * * `mode`: Allow options for performing CRUD operations with different modes in the data grid that used to update the appropriate cells in the pivot table.
 * The available modes are normal, batch and dialog. **Normal** mode is enabled for CRUD operations in the data grid by default.
 * * `allowEditOnDblClick`: Allows you to restrict CRUD operations by double-clicking the appropriate value cell in the pivot table.
 * * `showConfirmDialog`: Allows you to show the confirmation dialog to save and discard CRUD operations performed in the data grid that used to update the appropriate cells in the pivot table.
 * * `showDeleteConfirmDialog`: Allows you to show the confirmation dialog to delete any records from the data grid.
 *
 * > This feature is applicable only for the relational data source.
 */
var CellEditSettings = /** @class */ (function (_super) {
    __extends(CellEditSettings, _super);
    function CellEditSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowAdding", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowEditing", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowDeleting", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowCommandColumns", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowInlineEditing", void 0);
    __decorate([
        Property('Normal')
    ], CellEditSettings.prototype, "mode", void 0);
    __decorate([
        Property(true)
    ], CellEditSettings.prototype, "allowEditOnDblClick", void 0);
    __decorate([
        Property(true)
    ], CellEditSettings.prototype, "showConfirmDialog", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "showDeleteConfirmDialog", void 0);
    return CellEditSettings;
}(ChildProperty));
export { CellEditSettings };
/**
 * Allow options for setting the visibility of hyperlink based on specific condition. The options available here are as follows:
 * * `measure`: Allows you to specify the value field caption to get visibility of hyperlink option for specific measure.
 * * `condition`: Allows you to choose the operator type such as equals, greater than, less than, etc.
 * * `value1`: Allows you to set the start value.
 * * `value2`: Allows you to set the end value. This option will be used by default when the operator **Between** and **NotBetween** is chosen to apply.
 */
var ConditionalSettings = /** @class */ (function (_super) {
    __extends(ConditionalSettings, _super);
    function ConditionalSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "measure", void 0);
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "label", void 0);
    __decorate([
        Property('NotEquals')
    ], ConditionalSettings.prototype, "conditions", void 0);
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "value1", void 0);
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "value2", void 0);
    return ConditionalSettings;
}(ChildProperty));
export { ConditionalSettings };
/**
 * Allow a set of options to display a hyperlink to link data for individual cells that are shown in the pivot table.
 * These options allow you to enable a separate hyperlink for row headers, column headers, value cells, and summary cells in the `hyperlinkSettings` class.
 * The options available are:
 * * `showHyperlink`: Allows you to set the visibility of hyperlink in all cells.
 * * `showRowHeaderHyperlink`: Allows you to set the visibility of hyperlink in row headers.
 * * `showColumnHeaderHyperlink`: Allows you to set the visibility of hyperlink in column headers.
 * * `showValueCellHyperlink`: Allows you to set the visibility of hyperlink in value cells.
 * * `showSummaryCellHyperlink`: Allows you to set the visibility of hyperlink in summary cells.
 * * `headerText`: Allows you to set the visibility of hyperlink based on header text.
 * * `conditionalSettings`: Allows you to set the visibility of hyperlink based on specific condition.
 * * `cssClass`: Allows you to add CSS class name to the hyperlink options.
 *
 * > By default, the hyperlink options are disabled for all cells in the pivot table.
 */
var HyperlinkSettings = /** @class */ (function (_super) {
    __extends(HyperlinkSettings, _super);
    function HyperlinkSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showRowHeaderHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showColumnHeaderHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showValueCellHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showSummaryCellHyperlink", void 0);
    __decorate([
        Collection([], ConditionalSettings)
    ], HyperlinkSettings.prototype, "conditionalSettings", void 0);
    __decorate([
        Property()
    ], HyperlinkSettings.prototype, "headerText", void 0);
    __decorate([
        Property('')
    ], HyperlinkSettings.prototype, "cssClass", void 0);
    return HyperlinkSettings;
}(ChildProperty));
export { HyperlinkSettings };
/**
 * Allows you to configure page information such as page size and current page details for each axis in order to display the pivot table with a specific page when paging.
 */
var PageSettings = /** @class */ (function (_super) {
    __extends(PageSettings, _super);
    function PageSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(5)
    ], PageSettings.prototype, "columnPageSize", void 0);
    __decorate([
        Property(5)
    ], PageSettings.prototype, "rowPageSize", void 0);
    __decorate([
        Property(1)
    ], PageSettings.prototype, "currentColumnPage", void 0);
    __decorate([
        Property(1)
    ], PageSettings.prototype, "currentRowPage", void 0);
    return PageSettings;
}(ChildProperty));
export { PageSettings };
/**
 * Allows a set of options for customizing the paging UI with a variety of settings such as UI position, template and visibility to a specific axis info such as page size, paging data.
 * > To use this option, it requires the property `enablePaging` to be true.
 */
var PagerSettings = /** @class */ (function (_super) {
    __extends(PagerSettings, _super);
    function PagerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Bottom')
    ], PagerSettings.prototype, "position", void 0);
    __decorate([
        Property(false)
    ], PagerSettings.prototype, "isInversed", void 0);
    __decorate([
        Property(true)
    ], PagerSettings.prototype, "showRowPager", void 0);
    __decorate([
        Property(true)
    ], PagerSettings.prototype, "showColumnPager", void 0);
    __decorate([
        Property(true)
    ], PagerSettings.prototype, "showRowPageSize", void 0);
    __decorate([
        Property(true)
    ], PagerSettings.prototype, "showColumnPageSize", void 0);
    __decorate([
        Property([10, 50, 100, 200])
    ], PagerSettings.prototype, "rowPageSizes", void 0);
    __decorate([
        Property([5, 10, 20, 50, 100])
    ], PagerSettings.prototype, "columnPageSizes", void 0);
    __decorate([
        Property(false)
    ], PagerSettings.prototype, "enableCompactView", void 0);
    __decorate([
        Property()
    ], PagerSettings.prototype, "template", void 0);
    return PagerSettings;
}(ChildProperty));
export { PagerSettings };
/**
 * Allow options to configure the view port as either pivot table or pivot chart or both table and chart. The options available are:
 * * `view`: Allows you to choose the view port as either pivot table or pivot chart or both table and chart.
 * * `primary`: Allows you to set the primary view to be either pivot table or pivot chart. To use this option, it requires the property `view` to be **Both**.
 */
var DisplayOption = /** @class */ (function (_super) {
    __extends(DisplayOption, _super);
    function DisplayOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Table')
    ], DisplayOption.prototype, "view", void 0);
    __decorate([
        Property('Table')
    ], DisplayOption.prototype, "primary", void 0);
    return DisplayOption;
}(ChildProperty));
export { DisplayOption };
/**
 * Represents a class that allows defining values for options relating to the virtual scrolling experience in the pivot table.
 */
var VirtualScrollSettings = /** @class */ (function (_super) {
    __extends(VirtualScrollSettings, _super);
    function VirtualScrollSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], VirtualScrollSettings.prototype, "allowSinglePage", void 0);
    return VirtualScrollSettings;
}(ChildProperty));
export { VirtualScrollSettings };
/**
 * Represents the PivotView component.
 * ```html
 * <div id="PivotView"></div>
 * <script>
 *  var pivotviewObj = new PivotView({ enableGroupingBar: true });
 *  pivotviewObj.appendTo("#pivotview");
 * </script>
 * ```
 */
var PivotView = /** @class */ (function (_super) {
    __extends(PivotView, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {PivotViewModel} options - options.
     * @param  {string|HTMLElement} element - element.
     */
    function PivotView(options, element) {
        var _this_1 = _super.call(this, options, element) || this;
        /** @hidden */
        _this_1.verticalScrollScale = 1;
        /** @hidden */
        _this_1.horizontalScrollScale = 1;
        /** @hidden */
        _this_1.scrollerBrowserLimit = 8000000;
        /** @hidden */
        _this_1.lastSortInfo = {};
        /** @hidden */
        _this_1.lastFilterInfo = {};
        /** @hidden */
        _this_1.lastAggregationInfo = {};
        /** @hidden */
        _this_1.lastCalcFieldInfo = {};
        /** @hidden */
        _this_1.isScrolling = false;
        /** @hidden */
        _this_1.allowEngineExport = false;
        /** @hidden */
        _this_1.isInitial = true;
        _this_1.shiftLockedPos = [];
        _this_1.savedSelectedCellsPos = [];
        _this_1.cellSelectionPos = [];
        _this_1.isPopupClicked = false;
        _this_1.isMouseDown = false;
        _this_1.isMouseUp = false;
        _this_1.fieldsType = {};
        _this_1.remoteData = [];
        _this_1.defaultItems = {};
        _this_1.isCellBoxMultiSelection = false;
        /** @hidden */
        _this_1.gridCellCollection = {};
        /** @hidden */
        _this_1.rowRangeSelection = { enable: false, startIndex: 0, endIndex: 0 };
        /** @hidden */
        _this_1.isStaticRefresh = false;
        /** @hidden */
        _this_1.isStaticFieldList = false;
        /** @hidden */
        _this_1.resizeInfo = {};
        /** @hidden */
        _this_1.scrollPosObject = {
            vertical: 0, horizontal: 0, verticalSection: 0,
            horizontalSection: 0, top: 0, left: 0, scrollDirection: { direction: '', position: 0 }
        };
        /** @hidden */
        _this_1.pivotColumns = [];
        /** @hidden */
        _this_1.totColWidth = 0;
        /** @hidden */
        _this_1.posCount = 0;
        /** @hidden */
        _this_1.isModified = false;
        /** @hidden */
        _this_1.isInitialRendering = false;
        _this_1.needsID = true;
        _this_1.pivotRefresh = Component.prototype.refresh;
        _this_1.request = typeof window !== 'undefined' ? new XMLHttpRequest() : null;
        /** @hidden */
        _this_1.isServerWaitingPopup = false;
        /** @hidden */
        _this_1.actionObj = {};
        /** @hidden */
        _this_1.defaultFieldListOrder = 'None';
        /** @hidden */
        _this_1.destroyEngine = false;
        _this_1.pivotView = _this_1;
        setValue('mergePersistData', _this_1.mergePersistPivotData, _this_1);
        return _this_1;
    }
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} - return.
     * @hidden
     */
    PivotView.prototype.requiredModules = function () {
        var modules = [];
        if (this.showGroupingBar) {
            modules.push({ args: [this], member: 'groupingBar' });
        }
        if (this.allowConditionalFormatting) {
            modules.push({ args: [this], member: 'conditionalFormatting' });
        }
        if (this.allowNumberFormatting) {
            modules.push({ args: [this], member: 'numberFormatting' });
        }
        if (this.allowCalculatedField) {
            modules.push({ args: [this], member: 'calculatedField' });
        }
        if (this.showToolbar && (this.toolbar.length > 0 || this.toolbarTemplate)) {
            modules.push({ args: [this], member: 'toolbar' });
        }
        if (this.showFieldList) {
            modules.push({ args: [this], member: 'fieldList' });
        }
        if (this.allowExcelExport) {
            modules.push({ args: [this], member: 'excelExport' });
        }
        if (this.allowPdfExport) {
            modules.push({ args: [this], member: 'pdfExport' });
        }
        if (this.enableVirtualization) {
            modules.push({ args: [this], member: 'virtualscroll' });
        }
        if (this.allowGrouping) {
            modules.push({ args: [this], member: 'grouping' });
        }
        if (this.allowDrillThrough || (this.editSettings && this.editSettings.allowEditing)) {
            modules.push({ args: [this], member: 'drillThrough' });
        }
        if (this.enablePaging) {
            modules.push({ args: [this], member: 'pager' });
        }
        return modules;
    };
    /**
     *
     * For internal use only - Initializing internal properties;
     *
     * @private
     */
    PivotView.prototype.preRender = function () {
        if (this.dataSourceSettings && this.dataSourceSettings.providerType === 'SSAS') {
            this.dataType = 'olap';
            this.olapEngineModule = new OlapEngine();
        }
        else {
            this.dataType = 'pivot';
            this.engineModule = new PivotEngine();
        }
        this.isAdaptive = Browser.isDevice;
        if (Browser.isIE || Browser.info.name === 'edge') {
            this.scrollerBrowserLimit = 1500000;
        }
        else if (Browser.info.name === 'chrome') {
            this.scrollerBrowserLimit = 15000000;
        }
        this.isTouchMode = closest(this.element, 'e-bigger') ? true : false;
        this.initProperties();
        this.renderToolTip();
        this.keyboardModule = new KeyboardInteraction(this);
        this.contextMenuModule = new PivotContextMenu(this);
        this.globalize = new Internationalization(this.locale);
        if (this.showFieldList || this.showGroupingBar || this.allowNumberFormatting || this.allowCalculatedField ||
            (this.toolbar && this.showToolbar) || this.allowGrouping || this.gridSettings.contextMenuItems || this.allowDrillThrough) {
            this.commonModule = new Common(this);
        }
        if (this.allowPdfExport && (this.displayOption.view === 'Both' || this.displayOption.view === 'Chart')) {
            this.chartExportModule = new ChartExport(this);
        }
        this.defaultLocale = {
            applyToGrandTotal: 'Apply to Grand Total',
            grandTotal: 'Grand Total',
            total: 'Total',
            value: 'Value',
            noValue: 'No value',
            row: 'Row',
            column: 'Column',
            collapse: 'Collapse',
            expand: 'Expand',
            rowAxisPrompt: 'Drop row here',
            columnAxisPrompt: 'Drop column here',
            valueAxisPrompt: 'Drop value here',
            filterAxisPrompt: 'Drop filter here',
            filter: 'Filter',
            filtered: 'Filtered',
            sort: 'Sort',
            filters: 'Filters',
            rows: 'Rows',
            columns: 'Columns',
            values: 'Values',
            close: 'Close',
            cancel: 'Cancel',
            delete: 'Delete',
            CalculatedField: 'Calculated Field',
            createCalculatedField: 'Create Calculated Field',
            fieldName: 'Enter the field name',
            error: 'Error',
            invalidFormula: 'Invalid formula.',
            dropText: 'Example: ("Sum(Order_Count)" + "Sum(In_Stock)") * 250',
            dropTextMobile: 'Add fields and edit formula here.',
            dropAction: 'Calculated field cannot be place in any other region except value axis.',
            alert: 'Alert',
            warning: 'Warning',
            ok: 'OK',
            search: 'Search',
            drag: 'Drag',
            remove: 'Remove',
            allFields: 'All Fields',
            formula: 'Formula',
            addToRow: 'Add to Row',
            addToColumn: 'Add to Column',
            addToValue: 'Add to Value',
            addToFilter: 'Add to Filter',
            emptyData: 'No records to display',
            fieldExist: 'A field already exists in this name. Please enter a different name.',
            confirmText: 'A calculation field already exists in this name. Do you want to replace it?',
            noMatches: 'No matches',
            format: 'Summaries values by',
            edit: 'Edit',
            clear: 'Clear',
            sortAscending: 'Sort ascending order',
            sortDescending: 'Sort descending order',
            sortNone: 'Sort data order',
            clearCalculatedField: 'Clear edited field info',
            editCalculatedField: 'Edit calculated field',
            formulaField: 'Drag and drop fields to formula',
            dragField: 'Drag field to formula',
            clearFilter: 'Clear',
            by: 'by',
            all: 'All',
            multipleItems: 'Multiple items',
            member: 'Member',
            label: 'Label',
            date: 'Date',
            enterValue: 'Enter value',
            chooseDate: 'Enter date',
            Before: 'Before',
            BeforeOrEqualTo: 'Before Or Equal To',
            After: 'After',
            AfterOrEqualTo: 'After Or Equal To',
            labelTextContent: 'Show the items for which the label',
            dateTextContent: 'Show the items for which the date',
            valueTextContent: 'Show the items for which',
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
            And: 'and',
            Sum: 'Sum',
            Count: 'Count',
            DistinctCount: 'Distinct Count',
            Product: 'Product',
            Avg: 'Avg',
            Median: 'Median',
            Min: 'Min',
            SampleVar: 'Sample Var',
            PopulationVar: 'Population Var',
            RunningTotals: 'Running Totals',
            Max: 'Max',
            Index: 'Index',
            SampleStDev: 'Sample StDev',
            PopulationStDev: 'Population StDev',
            PercentageOfRowTotal: '% of Row Total',
            PercentageOfParentTotal: '% of Parent Total',
            PercentageOfParentColumnTotal: '% of Parent Column Total',
            PercentageOfParentRowTotal: '% of Parent Row Total',
            DifferenceFrom: 'Difference From',
            PercentageOfDifferenceFrom: '% of Difference From',
            PercentageOfGrandTotal: '% of Grand Total',
            PercentageOfColumnTotal: '% of Column Total',
            MoreOption: 'More...',
            NotEquals: 'Not Equals',
            AllValues: 'All Values',
            conditionalFormatting: 'Conditional Formatting',
            apply: 'Apply',
            condition: 'Add Condition',
            formatLabel: 'Format',
            valueFieldSettings: 'Value field settings',
            baseField: 'Base field',
            baseItem: 'Base item',
            summarizeValuesBy: 'Summarize values by',
            sourceName: 'Field name :',
            sourceCaption: 'Field caption',
            example: 'e.g:',
            editorDataLimitMsg: ' more items. Search to refine further.',
            details: 'Details',
            manageRecords: 'Manage Records',
            Years: 'Years',
            Quarters: 'Quarters',
            Months: 'Months',
            Days: 'Days',
            Hours: 'Hours',
            Minutes: 'Minutes',
            Seconds: 'Seconds',
            save: 'Save a report',
            new: 'Create a new report',
            load: 'Load',
            saveAs: 'Save as current report',
            rename: 'Rename a current report',
            deleteReport: 'Delete a current report',
            export: 'Export',
            subTotals: 'Sub totals',
            grandTotals: 'Grand totals',
            reportName: 'Report Name :',
            pdf: 'PDF',
            excel: 'Excel',
            csv: 'CSV',
            png: 'PNG',
            jpeg: 'JPEG',
            svg: 'SVG',
            mdxQuery: 'MDX Query',
            showSubTotals: 'Show subtotals',
            doNotShowSubTotals: 'Do not show subtotals',
            showSubTotalsRowsOnly: 'Show subtotals rows only',
            showSubTotalsColumnsOnly: 'Show subtotals columns only',
            showGrandTotals: 'Show grand totals',
            doNotShowGrandTotals: 'Do not show grand totals',
            showGrandTotalsRowsOnly: 'Show grand totals rows only',
            showGrandTotalsColumnsOnly: 'Show grand totals columns only',
            fieldList: 'Show fieldlist',
            grid: 'Show table',
            toolbarFormatting: 'Conditional formatting',
            chart: 'Chart',
            reportMsg: 'Please enter valid report name!!!',
            reportList: 'Report list',
            removeConfirm: 'Are you sure you want to delete this report?',
            emptyReport: 'No reports found!!',
            bar: 'Bar',
            pie: 'Pie',
            funnel: 'Funnel',
            doughnut: 'Doughnut',
            pyramid: 'Pyramid',
            stackingcolumn: 'Stacked Column',
            stackingarea: 'Stacked Area',
            stackingbar: 'Stacked Bar',
            stackingline: 'Stacked Line',
            stepline: 'Step Line',
            steparea: 'Step Area',
            splinearea: 'Spline Area',
            spline: 'Spline',
            stackingcolumn100: '100% Stacked Column',
            stackingbar100: '100% Stacked Bar',
            stackingarea100: '100% Stacked Area',
            stackingline100: '100% Stacked Line',
            bubble: 'Bubble',
            pareto: 'Pareto',
            radar: 'Radar',
            line: 'Line',
            area: 'Area',
            scatter: 'Scatter',
            polar: 'Polar',
            of: 'of',
            emptyFormat: 'No format found!!!',
            emptyInput: 'Enter a value',
            newReportConfirm: 'Do you want to save the changes to this report?',
            emptyReportName: 'Enter a report name',
            qtr: 'Qtr',
            null: 'null',
            undefined: 'undefined',
            groupOutOfRange: 'Out of Range',
            fieldDropErrorAction: 'The field you are moving cannot be placed in that area of the report',
            aggregate: 'Aggregate',
            drillThrough: 'Drill Through',
            ascending: 'Ascending',
            descending: 'Descending',
            number: 'Number',
            currency: 'Currency',
            percentage: 'Percentage',
            formatType: 'Format Type',
            customText: 'Currency Symbol',
            symbolPosition: 'Symbol Position',
            left: 'Left',
            right: 'Right',
            grouping: 'Grouping',
            true: 'True',
            false: 'False',
            decimalPlaces: 'Decimal Places',
            numberFormat: 'Number Formatting',
            memberType: 'Field Type',
            formatString: 'Format',
            expressionField: 'Expression',
            customFormat: 'Enter custom format string',
            numberFormatString: 'Example: C, P, 0000 %, ###0.##0#, etc.',
            selectedHierarchy: 'Parent Hierarchy',
            olapDropText: 'Example: [Measures].[Order Quantity] + ([Measures].[Order Quantity] * 0.10)',
            Percent: 'Percent',
            Currency: 'Currency',
            Custom: 'Custom',
            Measure: 'Measure',
            Dimension: 'Dimension',
            Standard: 'Standard',
            blank: '(Blank)',
            fieldTooltip: 'Drag and drop fields to create an expression. ' +
                'And, if you want to edit the existing calculated fields! ' +
                'You can achieve it by simply selecting the field under "Calculated Members".',
            fieldTitle: 'Field Name',
            QuarterYear: 'Quarter Year',
            drillError: 'Cannot show the raw items of calculated fields.',
            caption: 'Field Caption',
            copy: 'Copy',
            defaultReport: 'Sample Report',
            customFormatString: 'Custom Format',
            invalidFormat: 'Invalid Format.',
            group: 'Group',
            unGroup: 'Ungroup',
            invalidSelection: 'Cannot group that selection.',
            groupName: 'Enter the caption to display in header',
            captionName: 'Enter the caption for group field',
            selectedItems: 'Selected items',
            groupFieldCaption: 'Field caption',
            groupTitle: 'Group name',
            startAt: 'Starting at',
            endAt: 'Ending at',
            groupBy: 'Interval by',
            selectGroup: 'Select groups',
            multipleAxes: 'Multiple Axis',
            showLegend: 'Show Legend',
            exit: 'Exit',
            chartTypeSettings: 'Chart Type Settings',
            ChartType: 'Chart Type',
            yes: 'Yes',
            no: 'No',
            numberFormatMenu: 'Number Formatting...',
            conditionalFormattingMenu: 'Conditional Formatting...',
            removeCalculatedField: 'Are you sure you want to delete this calculated field?',
            replaceConfirmBefore: 'A report named ',
            replaceConfirmAfter: ' already exists. Do you want to replace it?',
            invalidJSON: 'Invalid JSON data',
            invalidCSV: 'Invalid CSV data',
            stacked: 'Stacked',
            single: 'Single',
            combined: 'Combined',
            multipleAxisMode: 'Multiple Axis Mode',
            grandTotalPosition: 'Grand totals position',
            top: 'Top',
            bottom: 'Bottom',
            None: 'None',
            rowPage: 'Row pager',
            rowPerPage: 'Rows per page',
            columnPage: 'Column pager',
            columnPerPage: 'Columns per page',
            goToFirstPage: 'Go to first page',
            goToPreviousPage: 'Go to previous page',
            goToNextPage: 'Go to next page',
            goToLastPage: 'Go to last page',
            subTotalPosition: 'Subtotals position',
            auto: 'Auto',
            loading: 'Loading...',
            add: 'Add'
        };
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
        this.renderContextMenu();
        this.isDragging = false;
        this.pivotDeferLayoutUpdate = isNullOrUndefined(this.pivotDeferLayoutUpdate) ? this.allowDeferLayoutUpdate :
            this.pivotDeferLayoutUpdate;
        this.addInternalEvents();
        //setCurrencyCode(this.currencyCode);
    };
    PivotView.prototype.onBeforeTooltipOpen = function (args) {
        args.element.classList.add('e-pivottooltipwrap');
    };
    PivotView.prototype.renderToolTip = function () {
        if (this.showTooltip) {
            if (this.tooltipTemplate) {
                this.tooltip = new Tooltip({
                    target: 'td.e-valuescontent',
                    cssClass: 'e-pivottooltiptemplate' + (this.cssClass ? (' ' + this.cssClass) : ''),
                    showTipPointer: false,
                    position: 'BottomRight',
                    mouseTrail: true,
                    enableRtl: this.enableRtl,
                    locale: this.locale,
                    enableHtmlSanitizer: this.enableHtmlSanitizer,
                    beforeRender: this.setToolTip.bind(this),
                    beforeOpen: this.onBeforeTooltipOpen
                });
            }
            else {
                this.tooltip = new Tooltip({
                    target: 'td.e-valuescontent',
                    cssClass: this.cssClass,
                    showTipPointer: false,
                    position: 'BottomRight',
                    mouseTrail: true,
                    enableRtl: this.enableRtl,
                    locale: this.locale,
                    enableHtmlSanitizer: this.enableHtmlSanitizer,
                    beforeRender: this.setToolTip.bind(this),
                    beforeOpen: this.onBeforeTooltipOpen
                });
            }
            this.tooltip.isStringTemplate = true;
            this.tooltip.appendTo(this.element);
        }
        else if (this.tooltip) {
            this.tooltip.destroy();
        }
    };
    /** @hidden */
    PivotView.prototype.renderContextMenu = function () {
        if (this.gridSettings.contextMenuItems || (this.allowGrouping && this.dataType === 'pivot')) {
            var conmenuItems = [];
            var groupItems = [];
            var customItems = [];
            var exportItems = [];
            var aggItems = [];
            var expItems = [];
            var aggregateItems = [];
            if (this.gridSettings.contextMenuItems) {
                for (var _i = 0, _a = this.gridSettings.contextMenuItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (typeof item === 'string' && this.getDefaultItems().indexOf(item) !== -1) {
                        if (item.toString().toLowerCase().indexOf('aggregate') !== -1 && this.dataType === 'pivot') {
                            aggregateItems = [
                                { text: this.localeObj.getConstant('Sum') }
                            ];
                            var aggregateGroup = this.buildDefaultItems('Aggregate');
                            aggregateGroup.items = aggregateItems;
                            aggItems.push(aggregateGroup);
                        }
                        else if (item.toString().toLowerCase().indexOf('export') !== -1) {
                            exportItems.push(this.buildDefaultItems(item));
                        }
                        else {
                            conmenuItems.push(this.buildDefaultItems(item));
                        }
                    }
                    else if (typeof item !== 'string') {
                        customItems.push(item);
                    }
                }
            }
            if (this.allowGrouping && this.dataType === 'pivot') {
                if (!this.getFieldByID(this.element.id + '_custom_group', this.gridSettings.contextMenuItems)) {
                    groupItems.push(this.buildDefaultItems('Group'));
                }
                if (!this.getFieldByID(this.element.id + '_custom_ungroup', this.gridSettings.contextMenuItems)) {
                    groupItems.push(this.buildDefaultItems('Ungroup'));
                }
            }
            if (exportItems.length > 0) {
                var exportGroupItems = this.buildDefaultItems('export');
                exportGroupItems.items = exportItems;
                expItems.push(exportGroupItems);
            }
            var contextMenuItems = [];
            Array.prototype.push.apply(contextMenuItems, aggItems);
            Array.prototype.push.apply(contextMenuItems, conmenuItems);
            Array.prototype.push.apply(contextMenuItems, groupItems);
            Array.prototype.push.apply(contextMenuItems, expItems);
            Array.prototype.push.apply(contextMenuItems, customItems);
            this.setProperties({ gridSettings: { contextMenuItems: contextMenuItems } }, true);
        }
    };
    PivotView.prototype.getFieldByID = function (id, fields) {
        return new DataManager({ json: fields }).executeLocal(new Query().where('id', 'equal', id))[0];
    };
    /**
     *
     * @hidden
     *
     */
    PivotView.prototype.getAllSummaryType = function () {
        return ['Sum', 'Count', 'DistinctCount', 'Product', 'Min', 'Max', 'Avg', 'Median', 'Index',
            'PopulationVar', 'SampleVar', 'PopulationStDev', 'SampleStDev', 'RunningTotals', 'PercentageOfGrandTotal',
            'PercentageOfColumnTotal', 'PercentageOfRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentRowTotal',
            'DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentTotal'];
    };
    PivotView.prototype.getDefaultItems = function () {
        return ['Drillthrough', 'Expand',
            'Collapse', 'Pdf Export', 'Excel Export', 'Csv Export', 'Sort Ascending', 'Sort Descending',
            'Aggregate', 'CalculatedField'];
    };
    PivotView.prototype.buildDefaultItems = function (item) {
        var menuItem;
        switch (item) {
            case 'Aggregate':
                menuItem = {
                    text: this.localeObj.getConstant('aggregate'), target: 'th.e-valuesheader,td.e-valuescontent,.e-stot.e-rowsheader',
                    id: this.element.id + '_aggregate'
                };
                break;
            case 'CalculatedField':
                menuItem = {
                    text: this.localeObj.getConstant('CalculatedField'), target: 'td.e-valuescontent',
                    id: this.element.id + '_CalculatedField'
                };
                break;
            case 'Drillthrough':
                menuItem = {
                    text: this.localeObj.getConstant('drillThrough'), target: 'td.e-valuescontent',
                    id: this.element.id + '_drillthrough_menu', iconCss: cls.PIVOTVIEW_GRID + ' ' + cls.ICON
                };
                break;
            case 'export':
                menuItem = {
                    text: this.localeObj.getConstant('export'), target: 'td.e-valuescontent',
                    id: this.element.id + '_exporting', iconCss: cls.PIVOTVIEW_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Pdf Export':
                menuItem = {
                    text: this.localeObj.getConstant('pdf'), id: this.element.id + '_pdf',
                    iconCss: cls.GRID_PDF_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Excel Export':
                menuItem = {
                    text: this.localeObj.getConstant('excel'), id: this.element.id + '_excel',
                    iconCss: cls.GRID_EXCEL_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Csv Export':
                menuItem = {
                    text: this.localeObj.getConstant('csv'), id: this.element.id + '_csv',
                    iconCss: cls.GRID_CSV_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Expand':
                menuItem = {
                    text: this.localeObj.getConstant('expand'), target: 'td.e-rowsheader,.e-columnsheader',
                    id: this.element.id + '_expand', iconCss: cls.PIVOTVIEW_EXPAND + ' ' + cls.ICON
                };
                break;
            case 'Collapse':
                menuItem = {
                    text: this.localeObj.getConstant('collapse'), target: 'td.e-rowsheader,.e-columnsheader',
                    id: this.element.id + '_collapse', iconCss: cls.PIVOTVIEW_COLLAPSE + ' ' + cls.ICON
                };
                break;
            case 'Sort Ascending':
                menuItem = {
                    text: this.localeObj.getConstant('ascending'), target: 'th.e-valuesheader,.e-stot',
                    id: this.element.id + '_sortasc', iconCss: cls.ICON_ASC + ' ' + cls.ICON
                };
                break;
            case 'Sort Descending':
                menuItem = {
                    text: this.localeObj.getConstant('descending'), target: 'th.e-valuesheader,.e-stot',
                    id: this.element.id + '_sortdesc', iconCss: cls.ICON_DESC + ' ' + cls.ICON
                };
                break;
            case 'Group':
                menuItem = {
                    text: this.localeObj.getConstant('group'), target: 'td.e-rowsheader,.e-columnsheader',
                    id: this.element.id + '_custom_group', iconCss: cls.PIVOTVIEW_GROUP + ' ' + cls.ICON
                };
                break;
            case 'Ungroup':
                menuItem = {
                    text: this.localeObj.getConstant('unGroup'), target: 'td.e-rowsheader,.e-columnsheader',
                    id: this.element.id + '_custom_ungroup', iconCss: cls.PIVOTVIEW_UN_GROUP + ' ' + cls.ICON
                };
                break;
        }
        this.defaultItems[item] = {
            text: menuItem.text, id: menuItem.id,
            target: menuItem.target, iconCss: menuItem.iconCss
        };
        return this.defaultItems[item];
    };
    PivotView.prototype.initProperties = function () {
        this.isTabular = this.gridSettings.layout === 'Tabular' ? true : false;
        this.pivotRefresh = Component.prototype.refresh;
        this.minHeight = isNullOrUndefined(this.minHeight) ? 300 : (this.minHeight < 10 ? 10 : this.minHeight);
        this.isScrolling = false;
        this.allowServerDataBinding = false;
        this.isStaticRefresh = false;
        this.setProperties({ pivotValues: [] }, true);
        this.allowServerDataBinding = true;
        this.scrollPosObject = {
            vertical: 0, horizontal: 0, verticalSection: 0,
            horizontalSection: 0, top: 0, left: 0, scrollDirection: { direction: '', position: 0 }
        };
        this.queryCellInfo = this.gridSettings.queryCellInfo ? this.gridSettings.queryCellInfo.bind(this) : undefined;
        this.headerCellInfo = this.gridSettings.headerCellInfo ? this.gridSettings.headerCellInfo.bind(this) : undefined;
        this.resizing = this.gridSettings.resizing ? this.gridSettings.resizing.bind(this) : undefined;
        this.resizeStop = this.gridSettings.resizeStop ? this.gridSettings.resizeStop.bind(this) : undefined;
        this.pdfHeaderQueryCellInfo = this.gridSettings.pdfHeaderQueryCellInfo ? this.gridSettings.pdfHeaderQueryCellInfo : undefined;
        this.pdfQueryCellInfo = this.gridSettings.pdfQueryCellInfo ? this.gridSettings.pdfQueryCellInfo : undefined;
        this.excelHeaderQueryCellInfo = this.gridSettings.excelHeaderQueryCellInfo ? this.gridSettings.excelHeaderQueryCellInfo : undefined;
        this.excelQueryCellInfo = this.gridSettings.excelQueryCellInfo ? this.gridSettings.excelQueryCellInfo : undefined;
        this.columnDragStart = this.gridSettings.columnDragStart ? this.gridSettings.columnDragStart.bind(this) : undefined;
        this.columnDrag = this.gridSettings.columnDrag ? this.gridSettings.columnDrag.bind(this) : undefined;
        this.columnDrop = this.gridSettings.columnDrop ? this.gridSettings.columnDrop.bind(this) : undefined;
        this.beforeColumnsRender = this.gridSettings.columnRender ? this.gridSettings.columnRender : undefined;
        this.selected = this.gridSettings.cellSelected ? this.gridSettings.cellSelected : undefined;
        this.selecting = this.gridSettings.cellSelecting ? this.gridSettings.cellSelecting : undefined;
        this.cellDeselected = this.gridSettings.cellDeselected ? this.gridSettings.cellDeselected : undefined;
        this.rowSelected = this.gridSettings.rowSelected ? this.gridSettings.rowSelected : undefined;
        this.rowDeselected = this.gridSettings.rowDeselected ? this.gridSettings.rowDeselected : undefined;
        this.chartTooltipRender = this.chartSettings.tooltipRender ? this.chartSettings.tooltipRender : undefined;
        this.chartLegendClick = this.chartSettings.legendClick ? this.chartSettings.legendClick : undefined;
        this.chartLoaded = this.chartSettings.loaded ? this.chartSettings.loaded : undefined;
        this.chartLoad = this.chartSettings.load ? this.chartSettings.load : undefined;
        this.chartResized = this.chartSettings.resized ? this.chartSettings.resized : undefined;
        this.chartAxisLabelRender = this.chartSettings.axisLabelRender ? this.chartSettings.axisLabelRender : undefined;
        this.multiLevelLabelClick = this.chartSettings.multiLevelLabelClick ? this.chartSettings.multiLevelLabelClick : undefined;
        this.chartPointClick = this.chartSettings.pointClick ? this.chartSettings.pointClick : undefined;
        this.contextMenuClick = this.gridSettings.contextMenuClick ? this.gridSettings.contextMenuClick : undefined;
        this.contextMenuOpen = this.gridSettings.contextMenuOpen ? this.gridSettings.contextMenuOpen : undefined;
        this.beforePdfExport = this.gridSettings.beforePdfExport ? this.gridSettings.beforePdfExport.bind(this) : undefined;
        this.beforeExcelExport = this.gridSettings.beforeExcelExport ? this.gridSettings.beforeExcelExport.bind(this) : undefined;
        this.beforePrint = this.chartSettings.beforePrint ? this.chartSettings.beforePrint : undefined;
        this.animationComplete = this.chartSettings.animationComplete ? this.chartSettings.animationComplete : undefined;
        this.legendRender = this.chartSettings.legendRender ? this.chartSettings.legendRender : undefined;
        this.textRender = this.chartSettings.textRender ? this.chartSettings.textRender : undefined;
        this.pointRender = this.chartSettings.pointRender ? this.chartSettings.pointRender : undefined;
        this.seriesRender = this.chartSettings.seriesRender ? this.chartSettings.seriesRender : undefined;
        this.chartMouseMove = this.chartSettings.chartMouseMove ? this.chartSettings.chartMouseMove : undefined;
        this.chartMouseClick = this.chartSettings.chartMouseClick ? this.chartSettings.chartMouseClick : undefined;
        this.pointMove = this.chartSettings.pointMove ? this.chartSettings.pointMove : undefined;
        this.chartMouseLeave = this.chartSettings.chartMouseLeave ? this.chartSettings.chartMouseLeave : undefined;
        this.chartMouseDown = this.chartSettings.chartMouseDown ? this.chartSettings.chartMouseDown : undefined;
        this.chartMouseUp = this.chartSettings.chartMouseUp ? this.chartSettings.chartMouseUp : undefined;
        this.dragComplete = this.chartSettings.dragComplete ? this.chartSettings.dragComplete : undefined;
        this.zoomComplete = this.chartSettings.zoomComplete ? this.chartSettings.zoomComplete : undefined;
        this.scrollStart = this.chartSettings.scrollStart ? this.chartSettings.scrollStart : undefined;
        this.scrollEnd = this.chartSettings.scrollEnd ? this.chartSettings.scrollEnd : undefined;
        this.scrollChanged = this.chartSettings.scrollChanged ? this.chartSettings.scrollChanged : undefined;
        this.multiLevelLabelRender = this.chartSettings.multiLevelLabelRender ? this.chartSettings.multiLevelLabelRender : undefined;
        if (this.gridSettings.rowHeight === null) {
            if (this.isTouchMode) {
                this.setProperties({ gridSettings: { rowHeight: 36 } }, true);
            }
            else {
                this.setProperties({ gridSettings: { rowHeight: this.isAdaptive ? 36 : 30 } }, true);
            }
        }
        if (this.chartSettings && this.chartSettings.showMemberSeries && !this.chartSettings.showPointColorByMembers) {
            this.setProperties({ chartSettings: { showPointColorByMembers: true } }, true);
        }
        this.element.style.height = '100%';
        if (this.enableVirtualization) {
            this.updatePageSettings(true);
        }
        this.isCellBoxMultiSelection = this.gridSettings.allowSelection &&
            this.gridSettings.selectionSettings.cellSelectionMode === 'Box' &&
            this.gridSettings.selectionSettings.mode === 'Cell' && this.gridSettings.selectionSettings.type === 'Multiple';
        if (this.allowGrouping && !this.isCellBoxMultiSelection) {
            this.isCellBoxMultiSelection = true;
            this.setProperties({ gridSettings: { allowSelection: true, selectionSettings: { cellSelectionMode: 'Box', mode: 'Cell', type: 'Multiple' } } }, true);
        }
        if (this.displayOption.view !== 'Table') {
            this.pivotChartModule = new PivotChart(this);
        }
        this.currentView = this.currentView ? this.currentView : (this.displayOption.view === 'Both' ?
            this.displayOption.primary : this.displayOption.view);
    };
    /**
     *
     * @hidden
     *
     */
    PivotView.prototype.updatePageSettings = function (isInit) {
        if (this.enableVirtualization) {
            var colValues = 1;
            var rowValues = 1;
            if (this.dataSourceSettings.values.length > 1 && this.dataType === 'pivot') {
                if (this.dataSourceSettings.valueAxis === 'row') {
                    rowValues = this.dataSourceSettings.values.length;
                }
                else {
                    colValues = this.dataSourceSettings.values.length;
                }
            }
            var heightAsNumber = this.getHeightAsNumber();
            if (isNaN(heightAsNumber)) {
                heightAsNumber = this.element.offsetHeight;
            }
            this.pageSettings = {
                currentColumnPage: isInit ? 1 : this.pageSettings.currentColumnPage,
                currentRowPage: isInit ? 1 : this.pageSettings.currentRowPage,
                columnPageSize: Math.ceil((Math.floor((this.getWidthAsNumber()) /
                    this.gridSettings.columnWidth) - 1) / colValues),
                rowPageSize: Math.ceil(Math.floor((heightAsNumber) / this.gridSettings.rowHeight) / rowValues)
            };
        }
    };
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.render = function () {
        this.loadData();
    };
    PivotView.prototype.loadData = function () {
        if (this.dataSourceSettings.formatSettings.length > 0) {
            var formatfield = this.dataSourceSettings.formatSettings;
            for (var i = 0; i < formatfield.length; i++) {
                if ((!isNullOrUndefined(formatfield[i].maximumFractionDigits) || !isNullOrUndefined(formatfield[i].minimumFractionDigits)) && formatfield[i].format.match(/^(P|N|C|P[0-9]|C[0-9]|N[0-9])$/g) === null) {
                    formatfield[i].maximumFractionDigits = undefined;
                    formatfield[i].minimumIntegerDigits = undefined;
                }
            }
        }
        if (this.dataType === 'pivot' && this.dataSourceSettings.url && this.dataSourceSettings.url !== '') {
            if (this.dataSourceSettings.mode === 'Server') {
                this.guid = PivotUtil.generateUUID();
                this.initialLoad();
                if (this.displayOption.view !== 'Chart') {
                    this.renderEmptyGrid();
                }
                else {
                    this.refreshData();
                }
                this.showWaitingPopup();
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
    PivotView.prototype.onSuccess = function (excelExportProperties) {
        if (this.request.readyState === XMLHttpRequest.DONE) {
            if (this.currentAction === 'onExcelExport' || this.currentAction === 'onCsvExport') {
                if (this.request.status === 200) {
                    var buffer = this.request.response;
                    var fileName = isNullOrUndefined(excelExportProperties.fileName) ? (this.currentAction === 'onExcelExport' ? 'default.xlsx' : 'default.csv') : excelExportProperties.fileName;
                    Save.save(fileName, buffer);
                }
            }
            else {
                this.isServerWaitingPopup = true;
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
                        if (this.showGroupingBar) {
                            this.pivotButtonModule.updateFilterEvents();
                        }
                        else {
                            this.pivotFieldListModule.pivotButtonModule.updateFilterEvents();
                        }
                    }
                    else if (this.currentAction === 'fetchRawData') {
                        var valueCaption = this.engineModule.fieldList[this.drillThroughValue.actualText.toString()]
                            ? this.engineModule.fieldList[this.drillThroughValue.actualText.toString()].caption
                            : this.drillThroughValue.actualText.toString();
                        var aggType = this.engineModule.fieldList[this.drillThroughValue.actualText] ? this.engineModule.fieldList[this.drillThroughValue.actualText].aggregateType : '';
                        var rawData = JSON.parse(engine.rawData);
                        var parsedObj = JSON.parse(engine.indexObject);
                        var indexObject = {};
                        for (var len = 0; len < parsedObj.length; len++) {
                            indexObject[parsedObj[len].Key] = parsedObj[len].Value;
                        }
                        this.drillThroughValue.indexObject = indexObject;
                        this.drillThroughModule.triggerDialog(valueCaption, aggType, rawData, this.drillThroughValue, this.drillThroughElement);
                        this.hideWaitingPopup();
                    }
                    else {
                        var fList = PivotUtil.formatFieldList(JSON.parse(engine.fieldList));
                        if (this.engineModule.fieldList) {
                            var keys = Object.keys(this.engineModule.fieldList);
                            for (var i = 0; i < keys.length; i++) {
                                if (this.engineModule.fieldList[keys[i]] && fList[keys[i]]) {
                                    fList[keys[i]].dateMember = this.engineModule.fieldList[keys[i]].dateMember;
                                    fList[keys[i]].formattedMembers =
                                        this.engineModule.fieldList[keys[i]].formattedMembers;
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
                        this.engineModule.columnPageCount = JSON.parse(engine.pivotCount).ColumnPageCount;
                        this.engineModule.rowPageCount = JSON.parse(engine.pivotCount).RowPageCount;
                        var rowPos = void 0;
                        var pivotValues = PivotUtil.formatPivotValues(JSON.parse(engine.pivotValue));
                        for (var rCnt = 0; rCnt < pivotValues.length; rCnt++) {
                            if (pivotValues[rCnt] && pivotValues[rCnt][0] && pivotValues[rCnt][0].axis === 'row') {
                                rowPos = rCnt;
                                break;
                            }
                        }
                        this.engineModule.headerContent = PivotUtil.frameContent(pivotValues, 'header', rowPos, this);
                        this.engineModule.pageSettings = this.pageSettings;
                        if (this.dataSourceSettings.groupSettings.length > 0) {
                            PivotUtil.updateReport(this, JSON.parse(engine.dataSourceSettings));
                        }
                        var valueSort = JSON.parse(engine.dataSourceSettings).ValueSortSettings;
                        this.engineModule.valueSortSettings = {
                            headerText: valueSort.HeaderText,
                            headerDelimiter: valueSort.HeaderDelimiter,
                            sortOrder: valueSort.SortOrder,
                            columnIndex: valueSort.ColumnIndex
                        };
                        this.engineModule.pivotValues = pivotValues;
                        this.engineModule.isEmptyData = engine.isEmptyData;
                        this.engineModule.isEngineUpdated = engine.isEngineUpdated;
                        for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                            var value = _a[_i];
                            this.engineModule.valueAxisFields[value.name] = value;
                        }
                        this.engineModule.globalize = !isNullOrUndefined(this.globalize) ? this.globalize : new Internationalization();
                        this.engineModule.formatFields = this.engineModule.setFormattedFields(this.dataSourceSettings.formatSettings);
                    }
                }
                catch (error) {
                    this.engineModule.pivotValues = [];
                }
                if (this.currentAction === 'onScroll') {
                    if (this.scrollDirection === 'vertical') {
                        var rowValues = this.dataSourceSettings.valueAxis === 'row' ? this.dataSourceSettings.values.length : 1;
                        var exactSize = (this.pageSettings.rowPageSize * rowValues * this.gridSettings.rowHeight);
                        var exactPage = Math.ceil(this.engineModule.rowStartPos / (this.pageSettings.rowPageSize * rowValues));
                        var pos = exactSize * exactPage -
                            (this.engineModule.rowFirstLvl * rowValues * this.gridSettings.rowHeight);
                        this.scrollPosObject.verticalSection = pos;
                    }
                    else if (this.scrollDirection === 'horizondal') {
                        var colValues = this.dataSourceSettings.valueAxis === 'column' ? this.dataSourceSettings.values.length : 1;
                        var exactSize = (this.pageSettings.columnPageSize * colValues * this.gridSettings.columnWidth);
                        var exactPage = Math.ceil(this.engineModule.colStartPos / (this.pageSettings.columnPageSize * colValues));
                        var pos = exactSize * exactPage -
                            (this.engineModule.colFirstLvl * colValues * this.gridSettings.columnWidth);
                        this.scrollPosObject.horizontalSection = pos;
                    }
                }
                if (this.currentAction !== 'fetchFieldMembers' && this.currentAction !== 'fetchRawData') {
                    this.initEngine();
                    if (this.calculatedFieldModule && this.calculatedFieldModule.isRequireUpdate) {
                        this.calculatedFieldModule.endDialog();
                        this.calculatedFieldModule.isRequireUpdate = false;
                    }
                    if (this.pivotFieldListModule && this.pivotFieldListModule.calculatedFieldModule &&
                        this.pivotFieldListModule.calculatedFieldModule.isRequireUpdate) {
                        this.pivotFieldListModule.calculatedFieldModule.endDialog();
                        this.pivotFieldListModule.calculatedFieldModule.isRequireUpdate = false;
                    }
                }
            }
        }
    };
    /** @hidden */
    PivotView.prototype.getEngine = function (action, drillItem, sortItem, aggField, cField, filterItem, memberName, rawDataArgs, editArgs, excelExportProperties) {
        var _this_1 = this;
        this.engineModule.isEmptyData = false;
        if (this.element.querySelector('.e-spin-hide') && !(action === 'onExcelExport' || action === 'onCsvExport')) {
            this.showWaitingPopup();
        }
        this.currentAction = action;
        this.isServerWaitingPopup = false;
        var customProperties = {
            pageSettings: JSON.parse(this.getPageSettings()).pageSettings,
            enableValueSorting: this.enableValueSorting,
            enablePaging: this.enablePaging,
            enableVirtualization: this.enableVirtualization,
            allowDataCompression: this.allowDataCompression,
            enableDrillThrough: (this.allowDrillThrough || this.editSettings.allowEditing),
            locale: JSON.stringify(PivotUtil.getLocalizedObject(this)),
            savedFieldList: (action === 'onDrop' && this.engineModule.fieldList !== null) ?
                PivotUtil.getClonedFieldList(this.engineModule.fieldList, true) : undefined,
            enableOptimizedRendering: this.enableVirtualization && this.virtualScrollSettings &&
                this.virtualScrollSettings.allowSinglePage,
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
            hash: this.guid,
            excelExportProperties: excelExportProperties,
            exportAllPages: this.exportAllPages,
            isGroupingUpdated: (this.currentAction === 'onRefresh' && this.dataSourceSettings.groupSettings.length > 0) ? true : (this.groupingModule ? this.groupingModule.isUpdate : false)
        };
        this.trigger(events.beforeServiceInvoke, params, function (observedArgs) {
            _this_1.request = observedArgs.request;
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
            params.excelExportProperties = observedArgs.excelExportProperties;
            params.exportAllPages = observedArgs.exportAllPages;
        });
        this.request.open('POST', this.dataSourceSettings.url, true);
        this.request.onreadystatechange = this.onSuccess.bind(this, params.excelExportProperties);
        if (params.action === 'onExcelExport' || params.action === 'onCsvExport') {
            this.request.responseType = 'blob';
        }
        else {
            this.request.responseType = '';
        }
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
    /**
     * It returns chart settings.
     *
     * @returns {string} - string.
     * @hidden
     */
    PivotView.prototype.getChartSettings = function () {
        var keyEntity = ['chartSettings'];
        var chartLoadEvent = this.chartSettings['load'];
        var chartLoadedEvent = this.chartSettings['loaded'];
        var chartTextRenderEvent = this.chartSettings['textRender'];
        var chartPointRenderEvent = this.chartSettings['pointRender'];
        var chartSeriesRenderEvent = this.chartSettings['seriesRender'];
        var chartLegendRenderEvent = this.chartSettings['legendRender'];
        var chartPointClickEvent = this.chartSettings['pointClick'];
        var chartTooltipRenderEvent = this.chartSettings['tooltipRender'];
        var chartLegendClickEvent = this.chartSettings['legendClick'];
        var chartMultiLevelLabelRenderEvent = this.chartSettings['multiLevelLabelRender'];
        var chartBeforePrintEvent = this.chartSettings['beforePrint'];
        var chartAnimationCompleteEvent = this.chartSettings['animationComplete'];
        var chartMouseMoveEvent = this.chartSettings['chartMouseMove'];
        var chartMouseClickEvent = this.chartSettings['chartMouseClick'];
        var chartPointMoveEvent = this.chartSettings['pointMove'];
        var chartMouseLeaveEvent = this.chartSettings['chartMouseLeave'];
        var chartMouseDownEvent = this.chartSettings['chartMouseDown'];
        var chartMouseUpEvent = this.chartSettings['chartMouseUp'];
        var chartDragCompleteEvent = this.chartSettings['dragComplete'];
        var chartZoomCompleteEvent = this.chartSettings['zoomComplete'];
        var chartScrollStartEvent = this.chartSettings['scrollStart'];
        var chartScrollEndEvent = this.chartSettings['scrollEnd'];
        var chartScrollChangedEvent = this.chartSettings['scrollChanged'];
        this.chartSettings['load'] = undefined;
        this.chartSettings['loaded'] = undefined;
        this.chartSettings['textRender'] = undefined;
        this.chartSettings['pointRender'] = undefined;
        this.chartSettings['seriesRender'] = undefined;
        this.chartSettings['legendRender'] = undefined;
        this.chartSettings['pointClick'] = undefined;
        this.chartSettings['tooltipRender'] = undefined;
        this.chartSettings['legendClick'] = undefined;
        this.chartSettings['multiLevelLabelRender'] = undefined;
        this.chartSettings['beforePrint'] = undefined;
        this.chartSettings['animationComplete'] = undefined;
        this.chartSettings['chartMouseMove'] = undefined;
        this.chartSettings['chartMouseClick'] = undefined;
        this.chartSettings['pointMove'] = undefined;
        this.chartSettings['chartMouseLeave'] = undefined;
        this.chartSettings['chartMouseDown'] = undefined;
        this.chartSettings['chartMouseUp'] = undefined;
        this.chartSettings['dragComplete'] = undefined;
        this.chartSettings['zoomComplete'] = undefined;
        this.chartSettings['scrollStart'] = undefined;
        this.chartSettings['scrollEnd'] = undefined;
        this.chartSettings['scrollChanged'] = undefined;
        var persistData = this.addOnPersist(keyEntity);
        this.chartSettings['load'] = chartLoadEvent;
        this.chartSettings['loaded'] = chartLoadedEvent;
        this.chartSettings['textRender'] = chartTextRenderEvent;
        this.chartSettings['pointRender'] = chartPointRenderEvent;
        this.chartSettings['seriesRender'] = chartSeriesRenderEvent;
        this.chartSettings['legendRender'] = chartLegendRenderEvent;
        this.chartSettings['pointClick'] = chartPointClickEvent;
        this.chartSettings['tooltipRender'] = chartTooltipRenderEvent;
        this.chartSettings['legendClick'] = chartLegendClickEvent;
        this.chartSettings['multiLevelLabelRender'] = chartMultiLevelLabelRenderEvent;
        this.chartSettings['beforePrint'] = chartBeforePrintEvent;
        this.chartSettings['animationComplete'] = chartAnimationCompleteEvent;
        this.chartSettings['chartMouseMove'] = chartMouseMoveEvent;
        this.chartSettings['chartMouseClick'] = chartMouseClickEvent;
        this.chartSettings['pointMove'] = chartPointMoveEvent;
        this.chartSettings['chartMouseLeave'] = chartMouseLeaveEvent;
        this.chartSettings['chartMouseDown'] = chartMouseDownEvent;
        this.chartSettings['chartMouseUp'] = chartMouseUpEvent;
        this.chartSettings['dragComplete'] = chartDragCompleteEvent;
        this.chartSettings['zoomComplete'] = chartZoomCompleteEvent;
        this.chartSettings['scrollStart'] = chartScrollStartEvent;
        this.chartSettings['scrollEnd'] = chartScrollEndEvent;
        this.chartSettings['scrollChanged'] = chartScrollChangedEvent;
        return persistData;
    };
    /**
     * It returns page settings.
     *
     * @returns {string} - string.
     * @hidden
     */
    PivotView.prototype.getPageSettings = function () {
        var keyEntity = ['pageSettings'];
        var persistData = this.addOnPersist(keyEntity);
        return persistData;
    };
    PivotView.prototype.onReadyStateChange = function (result) {
        var dataSource = [];
        if (this.dataSourceSettings.type === 'CSV') {
            var jsonObject = result.split(/\r?\n|\r/);
            // (dataSource as string[][]).push(jsonObject[0].split(',').map(function (e) { return e.replace(/ /g, '').replace(/^\"(.+)\"$/, "$1"); }));
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
    PivotView.prototype.initialLoad = function () {
        var _this_1 = this;
        try {
            this.cellTemplateFn = this.templateParser(this.cellTemplate);
            this.tooltipTemplateFn = this.templateParser(this.tooltipTemplate);
            if (this.spinnerTemplate) {
                createSpinner({ target: this.element, template: this.spinnerTemplate, cssClass: this.cssClass
                        ? this.cssClass : undefined }, this.createElement);
            }
            else {
                createSpinner({ target: this.element, cssClass: this.cssClass ? this.cssClass : undefined }, this.createElement);
            }
            var loadArgs_1 = {
                dataSourceSettings: this.dataSourceSettings,
                pivotview: this,
                fieldsType: {},
                defaultFieldListOrder: this.defaultFieldListOrder
            };
            this.trigger(events.load, loadArgs_1, function (observedArgs) {
                _this_1.dataSourceSettings = observedArgs.dataSourceSettings;
                _this_1.fieldsType = observedArgs.fieldsType;
                _this_1.defaultFieldListOrder = loadArgs_1.defaultFieldListOrder;
                _this_1.updateClass();
                _this_1.notify(events.initSubComponent, {});
                _this_1.notify(events.initialLoad, {});
                if (_this_1.isAdaptive) {
                    _this_1.contextMenuModule.render();
                }
                _this_1.notify(events.initToolbar, {});
                _this_1.notify(events.initPivotPager, {});
            });
        }
        catch (execption) {
            this.actionFailureMethod(execption);
        }
    };
    /**
     * Register the internal events.
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.addInternalEvents = function () {
        this.on(events.initialLoad, this.generateData, this);
        this.on(events.dataReady, this.renderPivotGrid, this);
        this.on(events.contentReady, this.onContentReady, this);
    };
    /**
     * De-Register the internal events.
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.removeInternalEvents = function () {
        this.off(events.initialLoad, this.generateData);
        this.off(events.dataReady, this.renderPivotGrid);
        this.off(events.contentReady, this.onContentReady);
    };
    /**
     * Get the Pivot widget properties to be maintained in the persisted state.
     *
     * @returns {string} - string.
     */
    PivotView.prototype.getPersistData = function (isRemoveDatasource) {
        var keyEntity = ['dataSourceSettings', 'pivotValues', 'gridSettings', 'chartSettings', 'displayOption', 'pageSettings'];
        var columnRender = this.gridSettings['columnRender'];
        var excelQueryCellInfo = this.gridSettings['excelQueryCellInfo'];
        var excelHeaderQueryCellInfo = this.gridSettings['excelHeaderQueryCellInfo'];
        var pdfQueryCellInfo = this.gridSettings['pdfQueryCellInfo'];
        var pdfHeaderQueryCellInfo = this.gridSettings['pdfHeaderQueryCellInfo'];
        var chartLoadEvent = this.chartSettings['load'];
        var chartLoadedEvent = this.chartSettings['loaded'];
        var chartTextRenderEvent = this.chartSettings['textRender'];
        var chartPointRenderEvent = this.chartSettings['pointRender'];
        var chartSeriesRenderEvent = this.chartSettings['seriesRender'];
        var chartLegendRenderEvent = this.chartSettings['legendRender'];
        var chartPointClickEvent = this.chartSettings['pointClick'];
        var chartTooltipRenderEvent = this.chartSettings['tooltipRender'];
        var chartLegendClickEvent = this.chartSettings['legendClick'];
        var chartMultiLevelLabelRenderEvent = this.chartSettings['multiLevelLabelRender'];
        var chartBeforePrintEvent = this.chartSettings['beforePrint'];
        var chartAnimationCompleteEvent = this.chartSettings['animationComplete'];
        var chartMouseMoveEvent = this.chartSettings['chartMouseMove'];
        var chartMouseClickEvent = this.chartSettings['chartMouseClick'];
        var chartPointMoveEvent = this.chartSettings['pointMove'];
        var chartMouseLeaveEvent = this.chartSettings['chartMouseLeave'];
        var chartMouseDownEvent = this.chartSettings['chartMouseDown'];
        var chartMouseUpEvent = this.chartSettings['chartMouseUp'];
        var chartDragCompleteEvent = this.chartSettings['dragComplete'];
        var chartZoomCompleteEvent = this.chartSettings['zoomComplete'];
        var chartScrollStartEvent = this.chartSettings['scrollStart'];
        var chartScrollEndEvent = this.chartSettings['scrollEnd'];
        var chartScrollChangedEvent = this.chartSettings['scrollChanged'];
        this.gridSettings['columnRender'] = undefined;
        this.gridSettings['excelQueryCellInfo'] = undefined;
        this.gridSettings['excelHeaderQueryCellInfo'] = undefined;
        this.gridSettings['pdfQueryCellInfo'] = undefined;
        this.gridSettings['pdfHeaderQueryCellInfo'] = undefined;
        this.chartSettings['tooltipRender'] = undefined;
        this.chartSettings['legendClick'] = undefined;
        this.chartSettings['multiLevelLabelRender'] = undefined;
        this.chartSettings['load'] = undefined;
        this.chartSettings['loaded'] = undefined;
        this.chartSettings['textRender'] = undefined;
        this.chartSettings['pointRender'] = undefined;
        this.chartSettings['seriesRender'] = undefined;
        this.chartSettings['legendRender'] = undefined;
        this.chartSettings['pointClick'] = undefined;
        this.chartSettings['beforePrint'] = undefined;
        this.chartSettings['animationComplete'] = undefined;
        this.chartSettings['chartMouseMove'] = undefined;
        this.chartSettings['chartMouseClick'] = undefined;
        this.chartSettings['pointMove'] = undefined;
        this.chartSettings['chartMouseLeave'] = undefined;
        this.chartSettings['chartMouseDown'] = undefined;
        this.chartSettings['chartMouseUp'] = undefined;
        this.chartSettings['dragComplete'] = undefined;
        this.chartSettings['zoomComplete'] = undefined;
        this.chartSettings['scrollStart'] = undefined;
        this.chartSettings['scrollEnd'] = undefined;
        this.chartSettings['scrollChanged'] = undefined;
        var dataSource = [];
        if (isRemoveDatasource) {
            dataSource = (this.dataSourceSettings.dataSource && !(this.dataSourceSettings.dataSource instanceof DataManager)) ? this.dataSourceSettings.dataSource.slice() : this.dataSourceSettings.dataSource;
            this.setProperties({ dataSourceSettings: { dataSource: [] } }, true);
        }
        var persistData = this.addOnPersist(keyEntity);
        this.gridSettings['columnRender'] = columnRender;
        this.gridSettings['excelQueryCellInfo'] = excelQueryCellInfo;
        this.gridSettings['excelHeaderQueryCellInfo'] = excelHeaderQueryCellInfo;
        this.gridSettings['pdfQueryCellInfo'] = pdfQueryCellInfo;
        this.gridSettings['pdfHeaderQueryCellInfo'] = pdfHeaderQueryCellInfo;
        this.chartSettings['load'] = chartLoadEvent;
        this.chartSettings['loaded'] = chartLoadedEvent;
        this.chartSettings['textRender'] = chartTextRenderEvent;
        this.chartSettings['pointRender'] = chartPointRenderEvent;
        this.chartSettings['seriesRender'] = chartSeriesRenderEvent;
        this.chartSettings['legendRender'] = chartLegendRenderEvent;
        this.chartSettings['pointClick'] = chartPointClickEvent;
        this.chartSettings['tooltipRender'] = chartTooltipRenderEvent;
        this.chartSettings['legendClick'] = chartLegendClickEvent;
        this.chartSettings['multiLevelLabelRender'] = chartMultiLevelLabelRenderEvent;
        this.chartSettings['beforePrint'] = chartBeforePrintEvent;
        this.chartSettings['animationComplete'] = chartAnimationCompleteEvent;
        this.chartSettings['chartMouseMove'] = chartMouseMoveEvent;
        this.chartSettings['chartMouseClick'] = chartMouseClickEvent;
        this.chartSettings['pointMove'] = chartPointMoveEvent;
        this.chartSettings['chartMouseLeave'] = chartMouseLeaveEvent;
        this.chartSettings['chartMouseDown'] = chartMouseDownEvent;
        this.chartSettings['chartMouseUp'] = chartMouseUpEvent;
        this.chartSettings['dragComplete'] = chartDragCompleteEvent;
        this.chartSettings['zoomComplete'] = chartZoomCompleteEvent;
        this.chartSettings['scrollStart'] = chartScrollStartEvent;
        this.chartSettings['scrollEnd'] = chartScrollEndEvent;
        this.chartSettings['scrollChanged'] = chartScrollChangedEvent;
        if (isRemoveDatasource) {
            this.setProperties({ dataSourceSettings: { dataSource: dataSource } }, true);
        }
        return persistData;
    };
    /**
     * Loads pivot Layout
     *
     * @param {string} persistData - Specifies the persist data to be loaded to pivot.
     * @returns {void}
     */
    PivotView.prototype.loadPersistData = function (persistData) {
        var pivotData = JSON.parse(persistData);
        this.allowServerDataBinding = false;
        this.setProperties({
            gridSettings: pivotData.gridSettings,
            pivotValues: pivotData.pivotValues,
            chartSettings: pivotData.chartSettings,
            displayOption: pivotData.displayOption
        }, true);
        if (pivotData.displayOption.primary === 'Chart') {
            this.currentView = 'Chart';
        }
        else {
            this.currentView = 'Table';
        }
        this.allowServerDataBinding = true;
        if (this.dataSourceSettings && this.dataSourceSettings.dataSource && this.dataSourceSettings.dataSource instanceof DataManager
            && pivotData.dataSourceSettings && pivotData.dataSourceSettings.dataSource &&
            pivotData.dataSourceSettings.dataSource.dataSource && this.dataSourceSettings.dataSource.dataSource &&
            pivotData.dataSourceSettings.dataSource.dataSource.url === this.dataSourceSettings.dataSource.dataSource.url) {
            pivotData.dataSourceSettings.dataSource = this.dataSourceSettings.dataSource;
        }
        this.dataSourceSettings = pivotData.dataSourceSettings;
    };
    PivotView.prototype.mergePersistPivotData = function () {
        var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(isNullOrUndefined(data) || (data === ''))) {
            var dataObj = JSON.parse(data);
            if (this.dataSourceSettings && this.dataSourceSettings.dataSource && this.dataSourceSettings.dataSource instanceof DataManager
                && dataObj.dataSourceSettings && dataObj.dataSourceSettings.dataSource &&
                dataObj.dataSourceSettings.dataSource.dataSource && this.dataSourceSettings.dataSource.dataSource &&
                dataObj.dataSourceSettings.dataSource.dataSource.url === this.dataSourceSettings.dataSource.dataSource.url) {
                dataObj.dataSourceSettings.dataSource = this.dataSourceSettings.dataSource;
            }
            this.setProperties(dataObj, true);
        }
    };
    /**
     * Method to open conditional formatting dialog.
     *
     * @returns {void}
     */
    PivotView.prototype.showConditionalFormattingDialog = function () {
        if (this.conditionalFormattingModule) {
            this.conditionalFormattingModule.showConditionalFormattingDialog();
        }
    };
    /**
     * Method to open calculated field dialog.
     *
     * @returns {void}
     */
    PivotView.prototype.createCalculatedFieldDialog = function () {
        if (this.calculatedFieldModule) {
            this.calculatedFieldModule.createCalculatedFieldDialog();
        }
    };
    /**
     * It returns the Module name.
     *
     * @returns {string} - string.
     * @hidden
     */
    PivotView.prototype.getModuleName = function () {
        return 'pivotview';
    };
    /**
     * Copy the selected rows or cells data into clipboard.
     *
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.copy = function (withHeader) {
        this.grid.copy(withHeader);
    };
    /**
     * By default, prints all the pages of the Grid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./api-pivotgrid.html#printmode-string).
     *
     * @returns {void}
     * @hidden
     */
    // public print(): void {
    //     this.grid.print();
    // }
    /**
     *
     * Called internally if any of the property value changed.
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.onPropertyChanged = function (newProp, oldProp) {
        var isRequireRefresh = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'dataSourceSettings':
                case 'hyperlinkSettings':
                case 'allowDrillThrough':
                case 'editSettings':
                case 'allowDataCompression': {
                    if (newProp.dataSourceSettings && ((!isNullOrUndefined(newProp.dataSourceSettings.dataSource) &&
                        !isNullOrUndefined(this.clonedDataSet) && this.clonedDataSet !== newProp.dataSourceSettings.dataSource &&
                        !isNullOrUndefined(newProp.dataSourceSettings.groupSettings) &&
                        newProp.dataSourceSettings.groupSettings.length > 0) ||
                        (Object.keys(newProp.dataSourceSettings).length === 1 && Object.keys(newProp.dataSourceSettings)[0] === 'dataSource'
                            && this.dataSourceSettings.groupSettings.length > 0))) {
                        this.clonedDataSet = newProp.dataSourceSettings.dataSource;
                        this.engineModule.groupingFields = {};
                    }
                    if (newProp.dataSourceSettings && Object.keys(newProp.dataSourceSettings).length === 1
                        && newProp.dataSourceSettings.groupSettings && this.dataType === 'pivot') {
                        this.updateGroupingReport(newProp.dataSourceSettings.groupSettings, 'Date');
                    }
                    var changedProps = !isNullOrUndefined(newProp.dataSourceSettings) ? Object.keys(newProp.dataSourceSettings)
                        : [];
                    if (changedProps.indexOf('dataSource') > -1 && newProp.dataSourceSettings.type !== 'CSV') {
                        if (!isNullOrUndefined(this.savedDataSourceSettings) && this.dataSourceSettings.dataSource.length > 0) {
                            PivotUtil.updateDataSourceSettings(this, this.savedDataSourceSettings);
                            this.savedDataSourceSettings = undefined;
                        }
                        if (newProp.dataSourceSettings.dataSource && newProp.dataSourceSettings.dataSource.length === 0) {
                            this.savedDataSourceSettings = PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings);
                            this.setProperties({ dataSourceSettings: { rows: [] } }, true);
                            this.setProperties({ dataSourceSettings: { columns: [] } }, true);
                            this.setProperties({ dataSourceSettings: { values: [] } }, true);
                            this.setProperties({ dataSourceSettings: { filters: [] } }, true);
                        }
                        if (!this.isStaticRefresh) {
                            this.pivotValues = [];
                            if (this.dataType === 'pivot') {
                                this.engineModule.fieldList = null;
                                this.engineModule.isEmptyData = true;
                                this.engineModule.data = [];
                                this.engineModule.groupingFieldsInfo = {};
                            }
                            else if (this.dataType === 'olap') {
                                this.olapEngineModule.fieldList = {};
                                this.olapEngineModule.fieldListData = undefined;
                                this.olapEngineModule.isEmptyData = true;
                            }
                        }
                        this.showWaitingPopup();
                        this.notify(events.initialLoad, {});
                    }
                    else {
                        if (PivotUtil.isButtonIconRefesh(prop, oldProp, newProp)) {
                            if (this.showGroupingBar && this.groupingBarModule) {
                                this.axisFieldModule.render();
                            }
                            if (this.showFieldList && this.pivotFieldListModule) {
                                var rows = PivotUtil.cloneFieldSettings(this.dataSourceSettings.rows);
                                var columns = PivotUtil.cloneFieldSettings(this.dataSourceSettings.columns);
                                var values = PivotUtil.cloneFieldSettings(this.dataSourceSettings.values);
                                var filters = PivotUtil.cloneFieldSettings(this.dataSourceSettings.filters);
                                this.pivotFieldListModule.setProperties({ dataSourceSettings: { rows: rows, columns: columns,
                                        values: values, filters: filters } }, true);
                                this.pivotFieldListModule.axisFieldModule.render();
                                if (this.pivotFieldListModule.treeViewModule.fieldTable && !this.isAdaptive) {
                                    this.pivotFieldListModule.notify(events.treeViewUpdate, {});
                                }
                            }
                        }
                        else {
                            this.remoteData = [];
                            if (this.dataType === 'pivot' && this.dataSourceSettings.url && this.dataSourceSettings.url !== '' &&
                                !isNullOrUndefined(newProp.dataSourceSettings) &&
                                ('type' in newProp.dataSourceSettings || 'url' in newProp.dataSourceSettings)) {
                                this.engineModule.fieldList = null;
                                this.loadData();
                            }
                            else {
                                if (newProp.dataSourceSettings && ((this.dataType === 'pivot' && 'dataSource' in newProp.dataSourceSettings) ||
                                    (this.dataType === 'olap' && 'url' in newProp.dataSourceSettings))) {
                                    if (!this.isStaticRefresh) {
                                        if (this.dataType === 'pivot') {
                                            this.engineModule.fieldList = null;
                                            this.engineModule.isEmptyData = true;
                                            this.engineModule.data = [];
                                            this.engineModule.groupingFieldsInfo = {};
                                        }
                                        else if (this.dataType === 'olap') {
                                            this.olapEngineModule.fieldList = {};
                                            this.olapEngineModule.fieldListData = undefined;
                                            this.olapEngineModule.isEmptyData = true;
                                        }
                                        this.pivotValues = [];
                                    }
                                }
                                this.notify(events.initialLoad, {});
                            }
                        }
                    }
                    break;
                }
                case 'height':
                case 'width':
                    this.layoutRefresh();
                    break;
                case 'pivotValues':
                case 'displayOption': {
                    if (newProp.displayOption && Object.keys(newProp.displayOption).length === 1 &&
                        newProp.displayOption.view) {
                        this.currentView = (newProp.displayOption.view === 'Both' ?
                            this.displayOption.primary : newProp.displayOption.view);
                        if (this.showGroupingBar || this.showFieldList) {
                            if (this.showFieldList && this.pivotFieldListModule) {
                                this.pivotFieldListModule.destroyEngine = true;
                                this.pivotFieldListModule.destroy();
                                if (select('#' + this.element.id + '_PivotFieldList', this.element) !== null) {
                                    remove(select('#' + this.element.id + '_PivotFieldList', this.element));
                                }
                                this.pivotFieldListModule.destroyEngine = false;
                            }
                            /**
                             * Below lines are affected the grouping bar render between table and chart.
                             * In "Init subcomponent" function, grouping bar rendered properly for table and chart view.
                             * So, The below lines are commanded out.
                             */
                            // if (this.showGroupingBar && this.groupingBarModule) {
                            //     this.groupingBarModule.destroy();
                            // }
                            this.notify(events.initSubComponent, this);
                        }
                        switch (newProp.displayOption.view) {
                            case 'Both':
                                if (!this.pivotChartModule) {
                                    this.pivotChartModule = new PivotChart(this);
                                }
                                if (!this.grid) {
                                    this.renderEmptyGrid();
                                }
                                break;
                            case 'Chart':
                                if (this.grid) {
                                    this.grid.destroy();
                                    this.grid = undefined;
                                }
                                if (!this.pivotChartModule) {
                                    this.pivotChartModule = new PivotChart(this);
                                }
                                break;
                            case 'Table':
                                if (!this.grid) {
                                    this.renderEmptyGrid();
                                }
                                if (this.pivotChartModule) {
                                    this.destroyEngine = true;
                                    this.pivotChartModule.destroy();
                                    this.destroyEngine = false;
                                    this.chart = undefined;
                                    this.pivotChartModule = undefined;
                                }
                                break;
                        }
                    }
                    else if (this.showToolbar && !isNullOrUndefined(newProp.displayOption) && newProp.displayOption.view) {
                        this.currentView = (newProp.displayOption.view === 'Both' ?
                            this.displayOption.primary : newProp.displayOption.view);
                    }
                    if (this.showToolbar && !isNullOrUndefined(newProp.displayOption) && newProp.displayOption.view) {
                        if (newProp.displayOption.view === 'Chart') {
                            this.toolbarModule.createChartMenu();
                            this.toggleButtonState(cls.TOOLBAR_GRID, 'add');
                            this.toggleButtonState(cls.TOOLBAR_CHART, 'remove');
                        }
                        else if (newProp.displayOption.view === 'Table') {
                            var gridElement = select('#' + this.element.id + '_grid', this.element);
                            gridElement.style.display = 'block';
                            this.toggleButtonState(cls.TOOLBAR_CHART, 'add');
                            this.toggleButtonState(cls.TOOLBAR_GRID, 'remove');
                        }
                        else {
                            this.toolbarModule.createChartMenu();
                            this.toggleButtonState(cls.TOOLBAR_GRID, 'remove');
                            this.toggleButtonState(cls.TOOLBAR_CHART, 'remove');
                        }
                    }
                    var engine = this.dataType === 'pivot' ? this.engineModule : this.olapEngineModule;
                    if (!isNullOrUndefined(engine.fieldList) || !isNullOrUndefined(engine.pivotValues)) {
                        this.notify(events.dataReady, {});
                    }
                    break;
                }
                case 'gridSettings':
                    this.isTabular = this.gridSettings.layout === 'Tabular' ? true : false;
                    this.lastGridSettings = newProp.gridSettings;
                    this.isCellBoxMultiSelection = this.gridSettings.allowSelection &&
                        this.gridSettings.selectionSettings.cellSelectionMode === 'Box' &&
                        this.gridSettings.selectionSettings.mode === 'Cell' && this.gridSettings.selectionSettings.type === 'Multiple';
                    if (this.allowGrouping && this.groupingModule && !this.isCellBoxMultiSelection) {
                        this.setProperties({ gridSettings: { allowSelection: true, selectionSettings: { cellSelectionMode: 'Box', mode: 'Cell', type: 'Multiple' } } }, true);
                        this.isCellBoxMultiSelection = true;
                    }
                    if (this.renderModule && this.grid) {
                        this.renderModule.updateGridSettings();
                    }
                    if (newProp.gridSettings.layout) {
                        this.initialLoad();
                    }
                    break;
                case 'chartSettings': {
                    if (this.showGroupingBar &&
                        this.groupingBarModule &&
                        (Object.keys(newProp.chartSettings).indexOf('enableMultipleAxis') !== -1 ||
                            (newProp.chartSettings.chartSeries && Object.keys(newProp.chartSettings.chartSeries).indexOf('type') !== -1))) {
                        this.groupingBarModule.renderLayout();
                        if (this.pivotChartModule) {
                            this.groupingBarModule.appendToElement();
                        }
                    }
                    if (isNullOrUndefined(this.pivotChartModule) && this.displayOption.view !== 'Table') {
                        this.pivotChartModule = new PivotChart(this);
                    }
                    var engineModule = this.dataType === 'pivot' ? this.engineModule : this.olapEngineModule;
                    if (!isNullOrUndefined(this.pivotChartModule) && !isNullOrUndefined(engineModule.pivotValues)) {
                        this.pivotChartModule.loadChart(this, this.chartSettings);
                    }
                    if (!isNullOrUndefined(engineModule.pivotValues) && !isNullOrUndefined(engineModule.fieldList)) {
                        this.notify(events.uiUpdate, this);
                    }
                    break;
                }
                case 'locale':
                case 'currencyCode':
                case 'enableRtl':
                    if (this.tooltip) {
                        this.tooltip.destroy();
                    }
                    if (this.dataSourceSettings.groupSettings && this.dataSourceSettings.groupSettings.length > 0 && this.clonedDataSet) {
                        var dataSet = this.dataSourceSettings.type === 'CSV' ?
                            PivotUtil.getClonedCSVData(this.clonedDataSet) :
                            PivotUtil.getClonedData(this.clonedDataSet);
                        this.setProperties({ dataSourceSettings: { dataSource: dataSet } }, true);
                    }
                    _super.prototype.refresh.call(this);
                    this.updateClass();
                    break;
                case 'enableValueSorting':
                    this.enableValueSorting = newProp.enableValueSorting;
                    this.updateDataSource();
                    break;
                case 'showGroupingBar':
                    if (this.element.querySelector('.e-grouping-bar')) {
                        this.element.querySelector('.e-grouping-bar').remove();
                    }
                    else if (this.groupingBarModule) {
                        this.groupingBarModule.renderLayout();
                        if (!this.commonModule) {
                            this.commonModule = new Common(this);
                        }
                        this.notify(events.initialLoad, {});
                    }
                    if (isNullOrUndefined(newProp.showFieldList)) {
                        this.renderPivotGrid();
                    }
                    break;
                case 'showFieldList':
                    this.initialLoad();
                    break;
                case 'groupingBarSettings':
                    if (this.showGroupingBar && this.groupingBarModule) {
                        if (newProp.groupingBarSettings && Object.keys(newProp.groupingBarSettings).indexOf('showFieldsPanel') > -1) {
                            this.groupingBarModule.RefreshFieldsPanel();
                            this.layoutRefresh();
                        }
                        else {
                            this.axisFieldModule.render();
                        }
                    }
                    break;
                case 'showValuesButton':
                    if (this.showGroupingBar && this.groupingBarModule && this.axisFieldModule) {
                        this.axisFieldModule.render();
                    }
                    if (this.showFieldList && this.pivotFieldListModule && this.pivotFieldListModule.axisFieldModule) {
                        this.pivotFieldListModule.setProperties({ showValuesButton: newProp.showValuesButton }, true);
                        this.pivotFieldListModule.axisFieldModule.render();
                    }
                    break;
                case 'showTooltip':
                    this.renderToolTip();
                    break;
                case 'showToolbar':
                case 'toolbar':
                    if (this.toolbarModule && this.showToolbar) {
                        this.toolbarModule.refreshToolbar();
                    }
                    break;
                case 'chartTypes':
                    if (this.toolbarModule) {
                        this.toolbarModule.createChartMenu();
                    }
                    break;
                case 'aggregateTypes':
                    if (this.showGroupingBar && this.groupingBarModule) {
                        if (this.axisFieldModule) {
                            this.axisFieldModule.render();
                        }
                    }
                    if (this.showFieldList && this.pivotFieldListModule && this.pivotFieldListModule.axisFieldModule) {
                        this.pivotFieldListModule.setProperties({ aggregateTypes: newProp.aggregateTypes }, true);
                        this.pivotFieldListModule.axisFieldModule.render();
                    }
                    break;
                case 'enableFieldSearching':
                    if (this.pivotFieldListModule) {
                        this.pivotFieldListModule.enableFieldSearching = this.enableFieldSearching;
                    }
                    break;
                case 'pageSettings':
                    if (!this.enableVirtualization) {
                        this.engineModule.pageSettings = this.pageSettings;
                        if (this.engineModule.fieldList) {
                            this.refreshPageData();
                        }
                        else {
                            this.initialLoad();
                        }
                    }
                    break;
                case 'pagerSettings':
                case 'enablePaging':
                    if (this.isStaticFieldList && this.isStaticRefresh) {
                        this.isStaticRefresh = false;
                    }
                    this.initialLoad();
                    break;
                case 'cellTemplate':
                    this.cellTemplateFn = this.templateParser(this.cellTemplate);
                    isRequireRefresh = true;
                    break;
                case 'tooltipTemplate':
                    this.tooltipTemplateFn = this.templateParser(this.tooltipTemplate);
                    isRequireRefresh = true;
                    break;
                case 'allowCalculatedField':
                    if (this.pivotFieldListModule) {
                        this.pivotFieldListModule.allowCalculatedField = this.allowCalculatedField;
                    }
                    break;
                case 'allowDeferLayoutUpdate':
                    this.pivotDeferLayoutUpdate = this.allowDeferLayoutUpdate;
                    if (this.pivotFieldListModule) {
                        this.pivotFieldListModule.allowDeferLayoutUpdate = this.allowDeferLayoutUpdate;
                    }
                    break;
                case 'allowGrouping':
                    this.refresh();
                    break;
            }
        }
        if (isRequireRefresh && this.grid) {
            this.grid.refreshColumns();
        }
    };
    PivotView.prototype.toggleButtonState = function (buttonClass, action) {
        var button = this.element.querySelector('.' + buttonClass);
        if (button) {
            var closestDisabledElement = button.closest('.e-toolbar-item');
            if (closestDisabledElement) {
                if (action === 'add') {
                    closestDisabledElement.classList.add(cls.MENU_DISABLE);
                }
                else if (action === 'remove') {
                    closestDisabledElement.classList.remove(cls.MENU_DISABLE);
                }
            }
        }
    };
    /**
     * Method to parse the template string.
     *
     * @private
     */
    PivotView.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return compile(template);
            }
        }
        return undefined;
    };
    /**
     * Method to get the cell template.
     *
     * @private
     */
    PivotView.prototype.getCellTemplate = function () {
        return this.cellTemplateFn;
    };
    /**
     * @hidden
     */
    PivotView.prototype.appendHtml = function (node, innerHtml) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = innerHtml;
        if (!isNullOrUndefined(tempElement.firstChild)) {
            node.appendChild(tempElement.firstChild);
        }
        return node;
    };
    /**
     * Render the UI section of PivotView.
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.renderPivotGrid = function () {
        this.isEmptyGrid = false;
        this.notEmpty = true;
        this.clearTemplate();
        if (this.showGroupingBar) {
            if (this.pivotChartModule) {
                this.appendChartElement();
            }
            this.groupingBarModule.appendToElement();
        }
        if (this.pivotChartModule) {
            this.pivotChartModule.engineModule = this.engineModule;
            this.pivotChartModule.loadChart(this, this.chartSettings);
            if (this.enableRtl && this.chart && document.body.getAttribute('dir') !== 'rtl') {
                addClass([this.chart.element], cls.PIVOTCHART_LTR);
            }
        }
        if (this.enableVirtualization) {
            this.virtualscrollModule = new VirtualScroll(this);
        }
        if (this.allowDrillThrough || this.editSettings.allowEditing) {
            this.drillThroughModule = new DrillThrough(this);
        }
        if (this.enablePaging) {
            this.notify(events.initPivotPager, this);
        }
        if (this.displayOption.view !== 'Chart') {
            if (this.hyperlinkSettings) {
                this.isRowCellHyperlink = (this.hyperlinkSettings.showRowHeaderHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.isColumnCellHyperlink = (this.hyperlinkSettings.showColumnHeaderHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.isValueCellHyperlink = (this.hyperlinkSettings.showValueCellHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.isSummaryCellHyperlink = (this.hyperlinkSettings.showSummaryCellHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.applyHyperlinkSettings();
            }
            this.renderModule = this.renderModule ? this.renderModule : new Render(this);
            this.renderModule.render(true);
        }
        else if (this.grid) {
            remove(this.grid.element);
        }
        var isNumberFormattingApplied = this.actionObj.actionName === events.openNumberFormatting ||
            this.actionObj.actionName === events.numberFormattingMenu;
        var isConditionalFormattingApplied = this.actionObj.actionName === events.conditionalFormattingMenu ||
            this.actionObj.actionName === events.openConditionalFormatting;
        if ((this.showFieldList || this.allowNumberFormatting || this.allowCalculatedField ||
            this.toolbar || this.allowGrouping || this.gridSettings.contextMenuItems) &&
            !(isNumberFormattingApplied || isConditionalFormattingApplied)) {
            this.notify(events.uiUpdate, this);
            if (this.pivotFieldListModule && this.allowDeferLayoutUpdate) {
                this.pivotFieldListModule.clonedDataSource = PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings);
            }
        }
        if (this.allowConditionalFormatting) {
            this.applyFormatting(this.pivotValues);
        }
        if (this.showToolbar) {
            if (this.displayOption.view === 'Both' && this.chart && this.grid) {
                if (this.showGroupingBar && this.groupingBarModule && this.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.refreshUI();
                }
                if (this.toolbarModule && this.toolbarModule.toolbar) {
                    this.toolbarModule.toolbar.width = this.getGridWidthAsNumber();
                }
                if (this.chartSettings.enableScrollOnMultiAxis && this.chartSettings.enableMultipleAxis) {
                    this.element.querySelector('.' + cls.PIVOTCHART).style.width = formatUnit(this.getGridWidthAsNumber());
                }
                this.chart.width = formatUnit(this.getGridWidthAsNumber());
                if (this.currentView === 'Table') {
                    this.grid.element.style.display = '';
                    this.chart.element.style.display = 'none';
                    if (this.chartSettings.enableMultipleAxis && this.chartSettings.enableScrollOnMultiAxis) {
                        this.element.querySelector('.e-pivotchart').style.display = 'none';
                    }
                }
                else {
                    this.grid.element.style.display = 'none';
                    this.chart.element.style.display = '';
                    if (this.chartSettings.enableMultipleAxis && this.chartSettings.enableScrollOnMultiAxis) {
                        this.element.querySelector('.e-pivotchart').style.display = '';
                    }
                }
            }
        }
        if (this.toolbarModule) {
            PivotUtil.toggleFieldListIconVisibility(this);
            if (this.toolbarModule && this.toolbarModule.action !== 'New' && this.toolbarModule.action !== 'Load'
                && this.toolbarModule.action !== 'Remove') {
                this.isModified = true;
            }
            if (!this.isInitialRendering) {
                this.isModified = false;
                this.isInitialRendering = !this.isInitialRendering;
            }
            this.toolbarModule.action = '';
        }
    };
    /**
     * Appends the chart element to the DOM, based on the component's display options and settings.
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.appendChartElement = function () {
        if (!select('#' + this.element.id + '_chart', this.element)) {
            if (this.displayOption.view === 'Both') {
                if (this.displayOption.primary === 'Chart') {
                    (this.element.insertBefore((createElement('div', {
                        className: cls.PIVOTCHART, id: this.element.id + '_chart'
                    })), this.element.querySelector('.' + cls.GRID_CLASS)));
                }
                else {
                    (this.element.appendChild(createElement('div', {
                        className: cls.PIVOTCHART, id: this.element.id + '_chart'
                    })));
                }
            }
            else {
                this.element.appendChild(createElement('div', {
                    className: cls.PIVOTCHART, id: this.element.id + '_chart'
                }));
            }
            var width = this.width.toString();
            if (this.showToolbar && this.grid) {
                width = this.getGridWidthAsNumber().toString();
            }
            var height = this.pivotChartModule.getChartHeight();
            var tmpChart = void 0;
            if (this.chartSettings && this.chartSettings.chartSeries &&
                this.pivotChartModule['accumulationType'].indexOf(this.chartSettings.chartSeries.type) > -1) {
                tmpChart = new AccumulationChart({ width: width, height: height });
            }
            else {
                tmpChart = new Chart({ width: width, height: height });
            }
            tmpChart.appendTo(select('#' + this.element.id + '_chart', this.element));
            if (this.showToolbar) {
                if (this.displayOption.view === 'Both' && this.currentView === 'Chart') {
                    this.grid.element.style.display = 'none';
                }
                if (this.currentView !== 'Chart') {
                    select('#' + this.element.id + '_chart', this.element).style.display = 'none';
                }
            }
        }
    };
    /**
     * @hidden
     */
    PivotView.prototype.showWaitingPopup = function () {
        if (this.grid && this.grid.element && !this.spinnerTemplate && this.currentView === 'Table') {
            showSpinner(this.grid.element);
        }
        else {
            showSpinner(this.element);
        }
    };
    /**
     * @hidden
     */
    PivotView.prototype.hideWaitingPopup = function () {
        if (this.grid && this.grid.element && !this.spinnerTemplate && this.currentView === 'Table') {
            hideSpinner(this.grid.element);
        }
        else {
            hideSpinner(this.element);
        }
    };
    /**
     * Updates the PivotEngine using dataSource from Pivot View component.
     *
     * @function updateDataSource
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.updateDataSource = function () {
        var _this_1 = this;
        this.showWaitingPopup();
        var pivot = this;
        //setTimeout(() => {
        var isSorted = !isNullOrUndefined(pivot.lastSortInfo) && Object.keys(pivot.lastSortInfo).length > 0 ? true : false;
        var isFiltered = !isNullOrUndefined(pivot.lastFilterInfo) && Object.keys(pivot.lastFilterInfo).length > 0 ? true : false;
        var isAggChange = !isNullOrUndefined(pivot.lastAggregationInfo) && Object.keys(pivot.lastAggregationInfo).length > 0 ?
            true : false;
        var isCalcChange = !isNullOrUndefined(pivot.lastCalcFieldInfo) && Object.keys(pivot.lastCalcFieldInfo).length > 0 ?
            true : false;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(pivot.dataSourceSettings)
        };
        pivot.trigger(events.enginePopulating, args, function (observedArgs) {
            if (!((pivot.enableVirtualization || pivot.enablePaging) && (isSorted || isFiltered || isAggChange || isCalcChange))) {
                PivotUtil.updateDataSourceSettings(pivot, observedArgs.dataSourceSettings);
            }
            pivot.updatePageSettings(false);
            if (isSorted && pivot.dataSourceSettings.valueSortSettings.headerText !== '') {
                pivot.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
            }
            if (pivot.dataType === 'pivot' && (pivot.enableVirtualization || pivot.enablePaging) && (isSorted || isFiltered || isAggChange || isCalcChange)) {
                if (isSorted) {
                    if (_this_1.dataSourceSettings.mode === 'Server') {
                        pivot.getEngine('onSort', null, pivot.lastSortInfo, null, null, null, null);
                    }
                    else {
                        pivot.engineModule.onSort(pivot.lastSortInfo, pivot.dataSourceSettings);
                    }
                    pivot.lastSortInfo = {};
                }
                if (isAggChange) {
                    if (_this_1.dataSourceSettings.mode === 'Server') {
                        pivot.getEngine('onAggregation', null, null, pivot.lastAggregationInfo, null, null, null);
                    }
                    else {
                        pivot.engineModule.onAggregation(pivot.lastAggregationInfo, pivot.dataSourceSettings);
                    }
                    pivot.lastAggregationInfo = {};
                }
                if (isCalcChange) {
                    if (_this_1.dataSourceSettings.mode === 'Server') {
                        pivot.getEngine('onCalcOperation', null, null, null, pivot.lastCalcFieldInfo, null, null);
                    }
                    else {
                        pivot.engineModule.onCalcOperation(pivot.lastCalcFieldInfo, pivot.dataSourceSettings);
                    }
                    pivot.lastCalcFieldInfo = {};
                }
                if (isFiltered) {
                    if (_this_1.dataSourceSettings.mode === 'Server') {
                        pivot.getEngine('onFilter', null, null, null, null, pivot.lastFilterInfo, null);
                    }
                    else {
                        pivot.engineModule.onFilter(pivot.lastFilterInfo, pivot.dataSourceSettings);
                    }
                    pivot.lastFilterInfo = {};
                }
                pivot.allowServerDataBinding = false;
                pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
                pivot.allowServerDataBinding = true;
                if (pivot.dataSourceSettings.mode !== 'Server') {
                    pivot.enginePopulatedEventMethod('updateDataSource');
                }
            }
            else {
                if (pivot.dataType === 'olap') {
                    var customProperties = {
                        mode: '',
                        savedFieldList: pivot.olapEngineModule.fieldList,
                        savedFieldListData: pivot.olapEngineModule.fieldListData,
                        pageSettings: pivot.pageSettings,
                        enableValueSorting: pivot.enableValueSorting,
                        isDrillThrough: (pivot.allowDrillThrough || pivot.editSettings.allowEditing),
                        localeObj: pivot.localeObj,
                        enableVirtualization: _this_1.enableVirtualization
                    };
                    if (isCalcChange || isSorted) {
                        pivot.olapEngineModule.savedFieldList = pivot.olapEngineModule.fieldList;
                        pivot.olapEngineModule.savedFieldListData = pivot.olapEngineModule.fieldListData;
                        if (isCalcChange) {
                            pivot.olapEngineModule.updateCalcFields(pivot.dataSourceSettings, pivot.lastCalcFieldInfo);
                            pivot.lastCalcFieldInfo = {};
                        }
                        else {
                            pivot.olapEngineModule.onSort(pivot.dataSourceSettings);
                            pivot.lastSortInfo = {};
                        }
                    }
                    else {
                        PivotUtil.renderOlapEngine(pivot, customProperties);
                    }
                    pivot.allowServerDataBinding = false;
                    pivot.setProperties({ pivotValues: pivot.olapEngineModule.pivotValues }, true);
                    pivot.allowServerDataBinding = true;
                    pivot.enginePopulatedEventMethod('updateDataSource');
                }
                else {
                    var customProperties = {
                        mode: '',
                        savedFieldList: pivot.engineModule.fieldList,
                        pageSettings: pivot.pageSettings,
                        enableValueSorting: pivot.enableValueSorting,
                        isDrillThrough: (pivot.allowDrillThrough || pivot.editSettings.allowEditing),
                        localeObj: pivot.localeObj,
                        fieldsType: pivot.fieldsType,
                        clonedReport: pivot.clonedReport,
                        globalize: pivot.globalize,
                        currenyCode: pivot.currencyCode,
                        enablePaging: _this_1.enablePaging,
                        enableVirtualization: _this_1.enableVirtualization,
                        allowDataCompression: _this_1.allowDataCompression,
                        enableHtmlSanitizer: _this_1.enableHtmlSanitizer,
                        enableOptimizedRendering: _this_1.enableVirtualization && _this_1.virtualscrollModule &&
                            _this_1.virtualScrollSettings.allowSinglePage,
                        isTabularLayout: _this_1.isTabular
                    };
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
                            pivot.getValueCellInfo.bind(pivot) : undefined, pivot.onHeadersSort ? pivot.getHeaderSortInfo.bind(pivot)
                            : undefined);
                        pivot.allowServerDataBinding = false;
                        pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
                        pivot.allowServerDataBinding = true;
                        pivot.enginePopulatedEventMethod('updateDataSource');
                    }
                    pivot.lastSortInfo = {};
                    pivot.lastAggregationInfo = {};
                    pivot.lastCalcFieldInfo = {};
                    pivot.lastFilterInfo = {};
                }
            }
        });
        //});
    };
    PivotView.prototype.refreshPageData = function () {
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings)
        };
        this.actionBeginMethod();
        this.showWaitingPopup();
        this.trigger(events.enginePopulating, args);
        if (this.dataType === 'pivot') {
            if (this.dataSourceSettings.mode === 'Server') {
                this.getEngine('onPageChange', null, null, null, null, null, null);
            }
            else {
                this.engineModule.generateGridData(this.dataSourceSettings, true, false, this.engineModule.headerCollection);
            }
            this.setProperties({ pivotValues: this.engineModule.pivotValues }, true);
            this.enginePopulatedEventMethod('updateDataSource');
        }
        this.actionObj.actionName = this.getActionCompleteName();
        if (this.actionObj.actionName) {
            this.actionCompleteMethod();
        }
    };
    /**
     * Export the Pivot table data to an Excel file (.xlsx).
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties for customizing the table, such as custom columns, data source, and theme.
     * @param  {boolean} isMultipleExport - Specifies whether multiple exports are enabled.
     * @param  {workbook} workbook - Defines the Workbook if multiple exports are enabled.
     * @param  {boolean} isBlob - If set to true, the exported file will be returned as blob data.
     * @returns {void}
     */
    PivotView.prototype.excelExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        if (this.dataSourceSettings.mode === 'Server') {
            this.getEngine('onExcelExport', null, null, null, null, null, null, null, null, excelExportProperties);
        }
        else {
            if ((this.enableVirtualization || this.enablePaging || this.allowEngineExport || (this.allowConditionalFormatting
                && this.dataSourceSettings.conditionalFormatSettings.length > 0))) {
                this.excelExportModule.exportToExcel('Excel', excelExportProperties, isBlob);
            }
            else {
                this.exportType = 'Excel';
                this.grid.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
            }
            this.actionObj.actionName = this.getActionCompleteName();
            var actionInfo = {
                exportInfo: { type: this.exportType, info: excelExportProperties }
            };
            this.actionObj.actionInfo = actionInfo;
            if (this.actionObj.actionName) {
                this.actionCompleteMethod();
            }
        }
    };
    /**
     * Export the Pivot table data to a CSV file (.csv).
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties for customizing the table, such as custom columns, data source, and theme.
     * @param  {boolean} isMultipleExport - Specifies whether multiple exports are enabled.
     * @param  {workbook} workbook - Defines the Workbook if multiple exports are enabled.
     * @param  {boolean} isBlob - If set to true, the export will be returned as blob data.
     * @returns {void}
     */
    PivotView.prototype.csvExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        if (this.dataSourceSettings.mode === 'Server') {
            this.getEngine('onCsvExport', null, null, null, null, null, null, null, null, excelExportProperties);
        }
        else {
            if ((this.enableVirtualization || this.enablePaging || this.allowEngineExport || (this.allowConditionalFormatting
                && this.dataSourceSettings.conditionalFormatSettings.length > 0))) {
                this.excelExportModule.exportToExcel('CSV', excelExportProperties, isBlob);
            }
            else {
                this.exportType = 'CSV';
                this.grid.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
            }
            this.actionObj.actionName = this.getActionCompleteName();
            var actionInfo = {
                exportInfo: { type: this.exportType, info: excelExportProperties }
            };
            this.actionObj.actionInfo = actionInfo;
            if (this.actionObj.actionName) {
                this.actionCompleteMethod();
            }
        }
    };
    /**
     *
     * Export pivot table data to PDF document.
     *
     * @param  {PdfExportProperties} pdfExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {Object} pdfDoc - Defined the PDF document if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<Object>} - Returns the pivot table data to PDF document
     */
    PivotView.prototype.gridPdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        var args = {
            pdfExportProperties: pdfExportProperties, isMultipleExport: isMultipleExport, isBlob: isBlob, pdfDoc: pdfDoc, currentExportView: 'Table',
            pdfMargins: {}
        };
        var pdfDocument = null;
        this.trigger(events.beforeExport, args);
        if (this.pdfExportModule) {
            this.pdfExportModule.exportProperties = args;
        }
        if (this.dataSourceSettings.mode !== 'Server' && ((this.enableVirtualization || this.enablePaging || this.allowEngineExport ||
            Object.keys(args.pdfMargins).length > 0) || args.height || args.width || (this.allowConditionalFormatting &&
            this.dataSourceSettings.conditionalFormatSettings.length > 0))) {
            pdfDocument = this.pdfExportModule.exportToPDF(args.pdfExportProperties, args.isMultipleExport, args.pdfDoc, args.isBlob);
        }
        else {
            pdfDocument = this.grid.pdfExport(args.pdfExportProperties, args.isMultipleExport, args.pdfDoc, args.isBlob);
        }
        this.actionObj.actionName = this.getActionCompleteName();
        var actionInfo = {
            exportInfo: { type: 'PDF', info: pdfExportProperties }
        };
        this.actionObj.actionInfo = actionInfo;
        if (this.actionObj.actionName) {
            this.actionCompleteMethod();
        }
        return pdfDocument;
    };
    /**
     * Method allow to export the pivot chart as PDF and image formats like PNG, JPEG, and SVG.
     *
     * @param {ExportType} type - Defines the export type.
     * @param {PdfExportProperties} pdfExportProperties - Allows to define the export properties for the chart.
     * @param {boolean} isMultipleExport - Allows to export multiple tables and charts into a single PDF document.
     * @param {Object} pdfDoc - Allows the export of an external PDF document along with current PDF document.
     * @param {boolean} isBlob - Allows the PDF document to be saved as blob data.
     * @returns {Promise<Object>} - Method returns the pivot chart as PDF and image formats like PNG, JPEG, and SVG.
     */
    PivotView.prototype.chartExport = function (type, pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        var args = {
            pdfExportProperties: pdfExportProperties, isMultipleExport: isMultipleExport, isBlob: isBlob, pdfDoc: pdfDoc,
            type: type, currentExportView: 'Chart', pdfMargins: {}
        };
        this.trigger(events.beforeExport, args);
        this.chartExportModule.exportProperties = args;
        var pdfDocument;
        var fileName = args.fileName ? args.fileName : (!isNullOrUndefined(pdfExportProperties) &&
            !isNullOrUndefined(pdfExportProperties.fileName)) ? pdfExportProperties.fileName : 'default';
        if (type === 'PDF') {
            pdfDocument = this.chartExportModule.pdfChartExport(args.pdfExportProperties, args.pdfDoc, args.isMultipleExport, args.isBlob);
        }
        else {
            var orientation_1 = (args.orientation === 0 || args.orientation) ? args.orientation :
                (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.pageOrientation)) ? (pdfExportProperties.pageOrientation === 'Landscape' ?
                    PdfPageOrientation.Landscape : PdfPageOrientation.Portrait) : PdfPageOrientation.Landscape;
            pdfDocument = this.chart.exportModule.export(args.type, fileName, orientation_1, null);
        }
        this.actionObj.actionName = this.getActionCompleteName();
        var actionInfo = {
            exportInfo: { type: type, info: fileName }
        };
        this.actionObj.actionInfo = actionInfo;
        if (this.actionObj.actionName) {
            this.actionCompleteMethod();
        }
        return pdfDocument;
    };
    /**
     * Method allow to export both pivot table and pivot chart in a same PDF document.
     *
     * @param {PdfExportProperties} pdfExportProperties - Allows to define the export properties for the table and chart.
     * @param {boolean} isMultipleExport - Allows to export multiple tables and charts into a single PDF document.
     * @param {Object} pdfDoc - Allows the export of an external PDF document along with current PDF document.
     * @param {boolean} isBlob - Allows the PDF document to be saved as blob data.
     * @param {boolean} exportBothTableAndChart - When the `view` property inside the `displayOption` is set to **Both**, both table and chart data can be exported into a single PDF document.
     * @returns {Promise<Object>} - Method returns the both pivot table and pivot chart in a same PDF document.
     */
    PivotView.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob, exportBothTableAndChart) {
        var _this_1 = this;
        var pdfDocument = null;
        return new Promise(function (resolve) {
            if (exportBothTableAndChart && _this_1.displayOption.view === 'Both') {
                if (_this_1.displayOption.primary === 'Chart') {
                    var chartAndTableExportDocument = _this_1.chartExport('PDF', pdfExportProperties, true, pdfDoc, false);
                    chartAndTableExportDocument.then(function (pdfData) {
                        pdfDocument = _this_1.gridPdfExport(pdfExportProperties, isMultipleExport, pdfData, isBlob);
                        resolve(pdfDocument);
                    });
                }
                else {
                    var tableAndChartExportDocument = _this_1.gridPdfExport(pdfExportProperties, true, pdfDoc, false);
                    tableAndChartExportDocument.then(function (pdfData) {
                        pdfDocument = _this_1.chartExport('PDF', pdfExportProperties, isMultipleExport, pdfData, isBlob);
                        resolve(pdfDocument);
                    });
                }
            }
            else {
                var tableExportDocumnt = _this_1.gridPdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
                resolve(tableExportDocumnt);
            }
        });
    };
    /**
     * Print method for the chart.
     *
     * @returns {void}
     */
    PivotView.prototype.printChart = function () {
        if (this.chart) {
            this.chart.print();
        }
    };
    /** @hidden */
    PivotView.prototype.onDrill = function (target, chartDrillInfo) {
        var _this_1 = this;
        var delimiter = (this.dataSourceSettings.drilledMembers[0] && this.dataSourceSettings.drilledMembers[0].delimiter) ?
            this.dataSourceSettings.drilledMembers[0].delimiter : '**';
        var fieldName = '';
        var axis = '';
        var action = '';
        if (chartDrillInfo) {
            fieldName = chartDrillInfo.fieldName;
            axis = chartDrillInfo.cell.axis;
            action = chartDrillInfo.isDrilled ? 'up' : 'down';
        }
        else {
            var rowHeaderCell = target.closest('td.e-rowsheader');
            axis = rowHeaderCell ? 'row' : 'column';
            fieldName = axis === 'row' ? closest(target, 'td').getAttribute('fieldname') : closest(target, 'th').getAttribute('fieldname');
            action = target.classList.contains(cls.COLLAPSE) ? 'up' : 'down';
        }
        if (this.dataType === 'pivot') {
            var clonedDrillMembers_1 = PivotUtil.cloneDrillMemberSettings(this.dataSourceSettings.drilledMembers);
            var colIndex = axis === 'row' ? parseInt(closest(target, 'td').getAttribute('aria-colindex'), 10) - 1 : parseInt(closest(target, 'th').getAttribute('aria-colindex'), 10) - 1;
            var rowIndex = axis === 'row' ? Number(closest(target, 'td').getAttribute('index')) : Number(closest(target, 'th').getAttribute('index'));
            var currentCell = chartDrillInfo ? chartDrillInfo.cell :
                this.engineModule.pivotValues[rowIndex][colIndex];
            var memberName = currentCell.valueSort.levelName.
                split(this.engineModule.valueSortSettings.headerDelimiter).join(delimiter);
            var fieldAvail = false;
            if (this.dataSourceSettings.drilledMembers.length === 0) {
                this.setProperties({ dataSourceSettings: { drilledMembers: [{ name: fieldName, items: [memberName],
                                delimiter: delimiter }] } }, true);
            }
            else {
                var drillMembers = PivotUtil.cloneDrillMemberSettings(this.dataSourceSettings.drilledMembers);
                for (var fCnt = 0; fCnt < drillMembers.length; fCnt++) {
                    var field = drillMembers[fCnt];
                    memberName = memberName.split(delimiter).join(field.delimiter ? field.delimiter : delimiter);
                    delimiter = field.delimiter = field.delimiter ? field.delimiter : delimiter;
                    if (field.name === fieldName) {
                        fieldAvail = true;
                        var memIndex = field.items.indexOf(memberName);
                        if (memIndex > -1) {
                            field.items.splice(memIndex, 1);
                        }
                        else {
                            field.items.push(memberName);
                        }
                    }
                    else {
                        continue;
                    }
                }
                this.setProperties({ dataSourceSettings: { drilledMembers: drillMembers } }, true);
                if (!fieldAvail) {
                    this.dataSourceSettings.drilledMembers.push({ name: fieldName, items: [memberName], delimiter: delimiter });
                }
            }
            this.showWaitingPopup();
            var pivot_1 = this;
            //setTimeout(() => {
            var drilledItem_1 = {
                fieldName: fieldName, memberName: memberName, delimiter: delimiter,
                axis: axis,
                action: action,
                currentCell: currentCell
            };
            var drillArgs = {
                drillInfo: drilledItem_1,
                pivotview: pivot_1,
                cancel: false
            };
            pivot_1.trigger(events.drill, drillArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    var args = {
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(_this_1.dataSourceSettings)
                    };
                    pivot_1.trigger(events.enginePopulating, args);
                    pivot_1.setProperties({ dataSourceSettings: args.dataSourceSettings }, true);
                    if (pivot_1.enableVirtualization || pivot_1.enablePaging) {
                        if (_this_1.dataSourceSettings.mode === 'Server') {
                            _this_1.getEngine('onDrill', drilledItem_1, null, null, null, null, null);
                        }
                        else {
                            pivot_1.engineModule.drilledMembers = pivot_1.dataSourceSettings.drilledMembers;
                            pivot_1.engineModule.onDrill(drilledItem_1);
                        }
                    }
                    else if (_this_1.dataSourceSettings.mode === 'Server') {
                        _this_1.getEngine('onDrill', drilledItem_1, null, null, null, null, null);
                    }
                    else {
                        pivot_1.engineModule.generateGridData(pivot_1.dataSourceSettings, true);
                    }
                    pivot_1.allowServerDataBinding = false;
                    pivot_1.setProperties({ pivotValues: pivot_1.engineModule.pivotValues }, true);
                    pivot_1.allowServerDataBinding = true;
                    var eventArgs = {
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(args.dataSourceSettings),
                        pivotValues: _this_1.pivotValues
                    };
                    _this_1.trigger(events.enginePopulated, eventArgs);
                    pivot_1.engineModule.pivotValues = eventArgs.pivotValues;
                    var actionInfo = {
                        drillInfo: drilledItem_1
                    };
                    _this_1.actionObj.actionInfo = actionInfo;
                    pivot_1.renderPivotGrid();
                }
                else {
                    _this_1.hideWaitingPopup();
                    _this_1.setProperties({ dataSourceSettings: { drilledMembers: clonedDrillMembers_1 } }, true);
                }
            });
        }
        else {
            this.onOlapDrill(fieldName, axis, action, delimiter, target, chartDrillInfo);
        }
    };
    PivotView.prototype.onOlapDrill = function (fieldName, axis, action, delimiter, target, chartDrillInfo) {
        var _this_1 = this;
        var pivot = this;
        var clonedDrillMembers = PivotUtil.cloneDrillMemberSettings(this.dataSourceSettings.drilledMembers);
        var currentCell;
        if (chartDrillInfo) {
            currentCell = chartDrillInfo.cell;
        }
        else {
            var colIndex = axis === 'row' ? parseInt(closest(target, 'td').getAttribute('aria-colindex'), 10) - 1
                : parseInt(closest(target, 'th').getAttribute('aria-colindex'), 10) - 1;
            var rowIndex = axis === 'row' ? Number(closest(target, 'td').getAttribute('index')) : Number(closest(target, 'th').getAttribute('index'));
            currentCell = this.olapEngineModule.pivotValues[rowIndex][colIndex];
        }
        var tupInfo = axis === 'row' ? this.olapEngineModule.tupRowInfo[currentCell.ordinal] :
            this.olapEngineModule.tupColumnInfo[currentCell.ordinal];
        var drillInfo = {
            axis: axis,
            action: action,
            fieldName: fieldName,
            delimiter: '~~',
            memberName: tupInfo.uNameCollection,
            currentCell: currentCell
        };
        this.showWaitingPopup();
        var drillArgs = {
            drillInfo: drillInfo,
            pivotview: pivot,
            cancel: false
        };
        var isAttributeHierarchy = this.olapEngineModule.fieldList[drillInfo.fieldName]
            && this.olapEngineModule.fieldList[drillInfo.fieldName].isHierarchy;
        var fieldPos = tupInfo.drillInfo.map(function (item) { return item.hierarchy; }).indexOf(currentCell.hierarchy.toString());
        var clonedMembers = PivotUtil.cloneDrillMemberSettings(this.dataSourceSettings.drilledMembers);
        if (drillInfo && drillInfo.action === 'down') {
            var fields = tupInfo.drillInfo.map(function (item) { return item.uName; });
            var member = '';
            for (var pos = 0; pos <= fieldPos; pos++) {
                var field = fields[pos];
                var members = field.split('~~');
                member = member + (member !== '' ? '~~' : '') + members[members.length - 1];
            }
            var drillSets = this.olapEngineModule.getDrilledSets(drillInfo.memberName, currentCell, (this.olapEngineModule.fieldList[currentCell.hierarchy] &&
                !this.olapEngineModule.fieldList[currentCell.hierarchy].hasAllMember) ? currentCell.valueSort.levelName.split(this.dataSourceSettings.valueSortSettings.headerDelimiter).length - 1 : fieldPos, axis);
            var keys = Object.keys(drillSets);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var drillSet = drillSets[key];
                for (var i = 0, cnt = clonedMembers.length; i < cnt; i++) {
                    var drillMembers = clonedMembers[i];
                    var memberItem = drillSet;
                    if (drillMembers.delimiter) {
                        memberItem = memberItem.replace(/~~/g, drillMembers.delimiter);
                    }
                    var items = [];
                    for (var itemPos = 0; itemPos < drillMembers.items.length; itemPos++) {
                        if (drillMembers.items[itemPos].indexOf(memberItem) !== 0) {
                            items[items.length] = drillMembers.items[itemPos];
                        }
                    }
                    drillMembers.items = items;
                }
            }
            this.olapEngineModule.drilledSets[currentCell.actualText] = tupInfo.members[fieldPos];
            drillInfo.memberName = member;
            var drillItem = [];
            for (var _a = 0, clonedMembers_1 = clonedMembers; _a < clonedMembers_1.length; _a++) {
                var field = clonedMembers_1[_a];
                if (field.name === drillInfo.fieldName) {
                    drillItem.push(field);
                }
            }
            if (drillItem.length > 0) {
                if (drillItem[0].delimiter) {
                    member = member.replace(/~~/g, drillItem[0].delimiter);
                }
                var index = PivotUtil.inArray(member, drillItem[0].items);
                if (index === -1) {
                    drillItem[0].items.push(member);
                }
                if (isAttributeHierarchy) {
                    var i = 0;
                    while (i < drillItem[0].items.length) {
                        if (drillItem[0].items[i] === member) {
                            drillItem[0].items.splice(i, 1);
                        }
                        else {
                            ++i;
                        }
                    }
                }
            }
            else if (!isAttributeHierarchy) {
                var drilledMember = { name: drillInfo.fieldName, items: [member], delimiter: '~~' };
                if (!clonedMembers) {
                    clonedMembers = [drilledMember];
                }
                else {
                    clonedMembers.push(drilledMember);
                }
            }
            drillArgs.drillInfo.memberName = member;
            this.setProperties({ dataSourceSettings: { drilledMembers: clonedMembers } }, true);
            pivot.trigger(events.drill, drillArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    var args = {
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(_this_1.dataSourceSettings)
                    };
                    _this_1.trigger(events.enginePopulating, args);
                    _this_1.setProperties({ dataSourceSettings: args.dataSourceSettings }, true);
                    _this_1.olapEngineModule.updateDrilledInfo(_this_1.dataSourceSettings);
                    _this_1.allowServerDataBinding = false;
                    _this_1.setProperties({ pivotValues: _this_1.olapEngineModule.pivotValues }, true);
                    _this_1.allowServerDataBinding = true;
                    var eventArgs = {
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(args.dataSourceSettings),
                        pivotValues: pivot.olapEngineModule.pivotValues
                    };
                    _this_1.trigger(events.enginePopulated, eventArgs);
                    _this_1.olapEngineModule.pivotValues = eventArgs.pivotValues;
                    _this_1.renderPivotGrid();
                }
                else {
                    _this_1.hideWaitingPopup();
                    _this_1.setProperties({ dataSourceSettings: { drilledMembers: clonedDrillMembers } }, true);
                }
            });
        }
        else {
            delete this.olapEngineModule.drilledSets[currentCell.actualText];
            var drillSets = this.olapEngineModule.getDrilledSets(drillInfo.memberName, currentCell, fieldPos, axis);
            var keys = Object.keys(drillSets);
            var fields = tupInfo.drillInfo.map(function (item) { return item.uName; });
            var member = '';
            for (var pos = 0; pos <= fieldPos; pos++) {
                var field = fields[pos];
                var members = field.split('~~');
                member = member + (member !== '' ? '~~' : '') + members[members.length - 1];
            }
            for (var _b = 0, keys_2 = keys; _b < keys_2.length; _b++) {
                var key = keys_2[_b];
                var drillSet = drillSets[key];
                var drillItemCollection = [];
                for (var i = 0, cnt = clonedMembers.length; i < cnt; i++) {
                    var drillItem = clonedMembers[i];
                    var member_1 = drillSet;
                    if (drillItem.name === drillInfo.fieldName) {
                        drillItemCollection.push(drillItem);
                    }
                    if (drillItem.delimiter) {
                        member_1 = drillSet.replace(/~~/g, drillItem.delimiter);
                    }
                    if (!isAttributeHierarchy) {
                        var items = [];
                        for (var itemPos = 0; itemPos < drillItem.items.length; itemPos++) {
                            if (drillItem.items[itemPos].indexOf(member_1) !== 0) {
                                items[items.length] = drillItem.items[itemPos];
                            }
                        }
                        drillItem.items = items;
                    }
                }
                if (isAttributeHierarchy) {
                    if (drillItemCollection.length > 0) {
                        if (drillItemCollection[0].delimiter) {
                            member = member.replace(/~~/g, drillItemCollection[0].delimiter);
                        }
                        var index = PivotUtil.inArray(member, drillItemCollection[0].items);
                        if (index === -1) {
                            drillItemCollection[0].items.push(member);
                        }
                    }
                    else {
                        var drilledMember = { name: drillInfo.fieldName, items: [member], delimiter: '~~' };
                        if (!clonedMembers) {
                            clonedMembers = [drilledMember];
                        }
                        else {
                            clonedMembers.push(drilledMember);
                        }
                    }
                }
            }
            var drilledMembers_1 = [];
            for (var _c = 0, clonedMembers_2 = clonedMembers; _c < clonedMembers_2.length; _c++) {
                var fields_1 = clonedMembers_2[_c];
                if (fields_1.items.length > 0) {
                    drilledMembers_1.push(fields_1);
                }
            }
            this.setProperties({ dataSourceSettings: { drilledMembers: clonedMembers } }, true);
            pivot.trigger(events.drill, drillArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    var args = {
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(_this_1.dataSourceSettings)
                    };
                    _this_1.trigger(events.enginePopulating, args);
                    _this_1.setProperties({ dataSourceSettings: args.dataSourceSettings }, true);
                    _this_1.setProperties({ dataSourceSettings: { drilledMembers: drilledMembers_1 } }, true);
                    _this_1.olapEngineModule.updateDrilledInfo(_this_1.dataSourceSettings);
                    _this_1.allowServerDataBinding = false;
                    _this_1.setProperties({ pivotValues: _this_1.olapEngineModule.pivotValues }, true);
                    _this_1.allowServerDataBinding = true;
                    var eventArgs = {
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(args.dataSourceSettings),
                        pivotValues: pivot.olapEngineModule.pivotValues
                    };
                    _this_1.trigger(events.enginePopulated, eventArgs);
                    _this_1.olapEngineModule.pivotValues = eventArgs.pivotValues;
                    _this_1.renderPivotGrid();
                }
                else {
                    _this_1.hideWaitingPopup();
                    _this_1.setProperties({ dataSourceSettings: { drilledMembers: clonedDrillMembers } }, true);
                }
            });
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.onContentReady = function () {
        var horiScrollHeight = getScrollBarWidth();
        this.isPopupClicked = false;
        var verOffset;
        var vWidth;
        if (this.showFieldList && this.pivotFieldListModule && this.dataSourceSettings.mode !== 'Server') {
            this.pivotFieldListModule.element.style.display = 'block';
            hideSpinner(this.pivotFieldListModule.fieldListSpinnerElement);
        }
        else if (this.fieldListSpinnerElement) {
            hideSpinner(this.fieldListSpinnerElement);
        }
        if (!this.isEmptyGrid) {
            if ((this.dataSourceSettings.mode === 'Server' && this.isServerWaitingPopup) || this.dataSourceSettings.mode === 'Local') {
                this.hideWaitingPopup();
            }
        }
        else if (this.pivotValues.length > 0) {
            this.isEmptyGrid = false;
            this.notEmpty = true;
        }
        var mCnt = this.element.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV) ?
            this.element.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV) : this.element.querySelector('.' + cls.CONTENT_CLASS);
        var mHdr = this.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
        var enableOptimizedRendering = this.virtualScrollSettings && this.virtualScrollSettings.allowSinglePage && this.dataType === 'pivot';
        if (this.grid) {
            var gridContentDiv = this.element.querySelector('.' + cls.GRID_CONTENT);
            var isHorizontalOverFlow = mCnt.parentElement.offsetWidth < mCnt.querySelector('.' + cls.TABLE).offsetWidth;
            var engine = this.dataType === 'pivot' ? this.engineModule : this.olapEngineModule;
            if (this.enableVirtualization && engine && this.virtualscrollModule) {
                if (enableOptimizedRendering && this.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)) {
                    removeClass([mHdr, mCnt], ['e-virtual-pivot-content']);
                    addClass([this.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)], [cls.PIVOT_HIDE_LOADER]);
                    if (this.grid && this.grid.element.querySelector('.e-spinner-inner')) {
                        removeClass([this.grid.element.querySelector('.e-spinner-inner')], [cls.PIVOT_HIDE_LOADER]);
                    }
                }
                if (enableOptimizedRendering) {
                    var loaderElement = this.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER);
                    if (!loaderElement) {
                        loaderElement = createElement('div', {
                            className: cls.PIVOT_CONTENT_LOADER + ' ' + cls.PIVOT_HIDE_LOADER,
                            innerHTML: this.localeObj.getConstant('loading')
                        });
                        if (this.grid.element && !this.element.querySelector('.' + cls.PIVOT_CONTENT_LOADER)) {
                            this.grid.element.insertBefore(loaderElement, this.grid.element.firstElementChild);
                        }
                    }
                    if (this.element.querySelector('.' + cls.HEADERCONTENT) && this.element.querySelector('.' + cls.GRID_CONTENT)) {
                        var height = this.element.querySelector('.' + cls.GRID_CONTENT).offsetHeight + this.element.querySelector('.' + cls.HEADERCONTENT).offsetHeight;
                        setStyleAttribute(loaderElement, { 'height': height + 'px', 'width': this.element.querySelector('.' + cls.HEADERCONTENT).offsetWidth + 'px', 'padding': Math.floor(height / 2) + 'px' });
                    }
                }
                if (this.element.querySelector('.' + cls.CONTENT_CLASS) &&
                    !this.element.querySelector('.' + cls.CONTENT_CLASS).querySelector('.' + cls.VIRTUALTRACK_DIV)) {
                    this.virtualDiv = createElement('div', { className: cls.VIRTUALTRACK_DIV });
                    this.element.querySelector('.' + cls.CONTENT_CLASS).appendChild(this.virtualDiv);
                }
                if (this.element.querySelector('.' + cls.MOVABLEHEADER_DIV) &&
                    !this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).querySelector('.' + cls.VIRTUALTRACK_DIV)) {
                    this.virtualHeaderDiv = createElement('div', { className: cls.VIRTUALTRACK_DIV });
                    this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).appendChild(this.virtualHeaderDiv);
                }
                else {
                    this.virtualHeaderDiv =
                        this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).querySelector('.' + cls.VIRTUALTRACK_DIV);
                }
                var virtualScrollTableDiv = gridContentDiv.querySelector('.' + cls.VIRTUALTABLE_DIV);
                if (gridContentDiv && !virtualScrollTableDiv) {
                    this.virtualTableDiv = createElement('div', { className: cls.VIRTUALTABLE_DIV });
                    gridContentDiv.appendChild(this.virtualTableDiv);
                    virtualScrollTableDiv = gridContentDiv.querySelector('.' + cls.VIRTUALTABLE_DIV);
                    this.virtualScrollDiv = createElement('div', { className: cls.VIRTUALSCROLL_DIV });
                    virtualScrollTableDiv.appendChild(this.virtualScrollDiv);
                    setStyleAttribute(virtualScrollTableDiv, {
                        minHeight: horiScrollHeight + 'px',
                        maxHeight: horiScrollHeight + 'px',
                        overflowX: 'scroll'
                    });
                    setStyleAttribute(this.virtualScrollDiv, {
                        height: '0.1px'
                    });
                    var newContentVirtualDiv = createElement('div', {
                        className: cls.CONTENT_VIRTUALTABLE_DIV
                    });
                    (newContentVirtualDiv).append.apply((newContentVirtualDiv), Array.prototype.slice.call(mCnt.childNodes));
                    mCnt.appendChild(newContentVirtualDiv);
                    newContentVirtualDiv.scrollLeft = 0;
                }
                var movableTable = this.element.querySelector('.' + cls.CONTENT_CLASS).querySelector('.' + cls.TABLE);
                var vHeight = (this.gridSettings.rowHeight * engine.rowCount + 0.1 - movableTable.clientHeight);
                if (vHeight > this.scrollerBrowserLimit) {
                    this.verticalScrollScale = vHeight / this.scrollerBrowserLimit;
                    vHeight = this.scrollerBrowserLimit;
                }
                vWidth = this.gridSettings.columnWidth * engine.columnCount;
                if (vWidth > this.scrollerBrowserLimit) {
                    this.horizontalScrollScale = vWidth / this.scrollerBrowserLimit;
                    vWidth = this.scrollerBrowserLimit;
                }
                setStyleAttribute(this.virtualDiv, {
                    height: (vHeight > 0.1 ? vHeight : 0.1) + 'px',
                    width: (vWidth > 0.1 ? vWidth : 0.1) + 'px'
                });
                setStyleAttribute(this.virtualHeaderDiv, {
                    height: 0, width: (vWidth > 0.1 ? vWidth : 0.1) + 'px'
                });
                if (this.isAdaptive) {
                    mCnt.style.minHeight = '1px';
                    mCnt.style.minHeight = '1px';
                }
                var ele = this.isAdaptive ? mCnt : (gridContentDiv.querySelector('.' + cls.VIRTUALTABLE_DIV) ?
                    gridContentDiv.querySelector('.' + cls.VIRTUALTABLE_DIV) : mCnt);
                verOffset = (mCnt.parentElement.scrollTop > this.scrollerBrowserLimit) ?
                    mCnt.querySelector('.' + cls.TABLE).style.transform.split(',')[1].trim() :
                    (enableOptimizedRendering ? mCnt.parentElement.scrollTop :
                        -(((mCnt.parentElement.scrollTop * this.verticalScrollScale) -
                            this.scrollPosObject.verticalSection - mCnt.parentElement.scrollTop))) + 'px)';
                if (Number(verOffset.split('px')[0]) > this.virtualDiv.clientHeight) {
                    verOffset = this.virtualDiv.clientHeight + 'px)';
                }
                var eleScrollLeft = Math.abs(ele.scrollLeft);
                var horiOffset = (eleScrollLeft > this.scrollerBrowserLimit) ?
                    (mCnt.querySelector('.' + cls.TABLE).style.transform.split(',')[0].trim() + ',') :
                    'translate(' + ((this.enableRtl ? 1 : -1) * ((eleScrollLeft * this.horizontalScrollScale)
                        - this.scrollPosObject.horizontalSection - eleScrollLeft)) + 'px,';
                setStyleAttribute(mCnt.querySelector('.' + cls.TABLE), {
                    transform: horiOffset + verOffset
                });
                setStyleAttribute(mHdr.querySelector('.' + cls.TABLE), {
                    transform: horiOffset + 0 + 'px)'
                });
                if ((!isHorizontalOverFlow && gridContentDiv && virtualScrollTableDiv) || this.isAdaptive) {
                    virtualScrollTableDiv.style.display = 'none';
                }
                else {
                    virtualScrollTableDiv.style.display = 'block';
                }
                var translateValue = Number(-mCnt.querySelector('.' + cls.TABLE).style.transform.split('(')[1].split(',')[0].split('px')[0]);
                this.virtualscrollModule.alignFreezedCells(translateValue, true);
                if (isHorizontalOverFlow) {
                    var newScrollWidth = 0;
                    if (this.pivotColumns.length < 25) {
                        newScrollWidth = (vWidth + mCnt.querySelector('.' + cls.TABLE).querySelector('.' + cls.FREEZED_CELL)
                            .offsetWidth + (gridContentDiv.offsetWidth - gridContentDiv.clientWidth));
                    }
                    else {
                        newScrollWidth = (vWidth + (gridContentDiv.offsetWidth - gridContentDiv.clientWidth));
                    }
                    if (this.grid.height !== 'auto') {
                        this.grid.element.querySelector('.' + cls.VIRTUALSCROLL_DIV).style.width = newScrollWidth + horiScrollHeight + 'px';
                    }
                    else {
                        this.grid.element.querySelector('.' + cls.VIRTUALSCROLL_DIV).style.width = newScrollWidth + 'px';
                    }
                }
                if (this.grid.element.querySelector('.' + cls.CONTENT_VIRTUALTABLE_DIV)) {
                    if (mCnt.parentElement.scrollHeight === mCnt.scrollHeight) {
                        mCnt.style.overflowY = '';
                    }
                }
                var colValues = this.dataType === 'pivot' ? (this.dataSourceSettings.valueAxis === 'column' ? this.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.pageSettings.columnPageSize * colValues * this.gridSettings.columnWidth);
                var hScrollPos = (ele.scrollWidth - (Math.abs(eleScrollLeft) + ele.offsetWidth));
                if (this.virtualscrollModule && exactSize > 0 && hScrollPos <= exactSize && (eleScrollLeft > 0)) {
                    var mCntScrollPos = (mCnt.scrollWidth - (Math.abs(mCnt.scrollLeft) + mCnt.parentElement.offsetWidth));
                    var vertiTop = undefined;
                    if (mCntScrollPos < 1 && this.scrollDirection === 'horizondal') {
                        if (mCnt.parentElement.scrollTop > 0) {
                            vertiTop = mCnt.parentElement.scrollTop;
                        }
                        this.virtualDiv.style.display = 'none';
                        mCntScrollPos = (mCnt.scrollWidth - (Math.abs(mCnt.scrollLeft) + mCnt.parentElement.offsetWidth));
                    }
                    this.virtualDiv.style.display = '';
                    if (vertiTop) {
                        mCnt.parentElement.scrollTop = vertiTop;
                    }
                    var mCntVScrollPos = (mCnt.scrollWidth - (Math.abs(mCnt.scrollLeft) + mCnt.parentElement.offsetWidth));
                    if (mCntScrollPos > 1) {
                        this.scrollPosObject.horizontalSection -= (hScrollPos <= 0 ? (mCntScrollPos > hScrollPos ? mCntScrollPos
                            : -mCntVScrollPos) : (mCntVScrollPos === mCntScrollPos ? (mCntScrollPos - hScrollPos) :
                            (mCntScrollPos < mCntVScrollPos && (hScrollPos === mCntVScrollPos || hScrollPos > mCntScrollPos) ?
                                -(mCntVScrollPos - mCntScrollPos) : 0)));
                        if (this.grid.height !== 'auto') {
                            this.scrollPosObject.horizontalSection -= horiScrollHeight;
                        }
                        this.scrollPosObject.horizontalSection = (this.scrollPosObject.horizontalSection >=
                            -(this.element.querySelector('.' + cls.GRID_CLASS)
                                .querySelector('.' + cls.HEADERCELL + '.' + cls.FREEZED_CELL).offsetWidth)) ?
                            this.scrollPosObject.horizontalSection :
                            -(this.element.querySelector('.' + cls.GRID_CLASS)
                                .querySelector('.' + cls.HEADERCELL + '.' + cls.FREEZED_CELL).offsetWidth);
                    }
                    horiOffset = (eleScrollLeft > this.scrollerBrowserLimit) ?
                        (mCnt.querySelector('.' + cls.TABLE).style.transform.split(',')[0].trim() + ',') :
                        'translate(' + ((this.enableRtl ? 1 : -1) * ((eleScrollLeft * this.horizontalScrollScale)
                            - this.scrollPosObject.horizontalSection - eleScrollLeft)) + 'px,';
                    setStyleAttribute(mCnt.querySelector('.' + cls.TABLE), {
                        transform: horiOffset + verOffset
                    });
                    setStyleAttribute(mHdr.querySelector('.' + cls.TABLE), {
                        transform: horiOffset + 0 + 'px)'
                    });
                    translateValue = Number(-mCnt.querySelector('.' + cls.TABLE).style.transform.split('(')[1].split(',')[0].split('px')[0]);
                    this.virtualscrollModule.alignFreezedCells(translateValue, true);
                }
            }
            if (this.currentView !== 'Chart') {
                this.grid.hideScroll();
            }
            if (this.showGroupingBar) {
                if (this.groupingBarModule && this.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.setGridRowWidth();
                }
                if (this.actionObj.fieldInfo && this.actionObj.fieldInfo.fieldName) {
                    var pivotButton = this.pivotButtonModule.parentElement.querySelector("[data-uid=\"" + this.actionObj.fieldInfo.fieldName + "\"]");
                    if (!isNullOrUndefined(pivotButton)) {
                        pivotButton.focus();
                    }
                }
                this.element.style.minWidth = this.isAdaptive ? (this.minWidth ? this.minWidth + 'px' : '310px') : this.minWidth ? this.minWidth + 'px' : '400px';
                this.grid.element.style.minWidth = this.isAdaptive ? (this.minWidth ? this.minWidth + 'px' : '310px') : this.minWidth ? this.minWidth + 'px' : '400px';
            }
            else {
                this.element.style.minWidth = this.minWidth ? this.minWidth + 'px' : '310px';
                this.grid.element.style.minWidth = this.minWidth ? this.minWidth + 'px' : '310px';
            }
        }
        this.unwireEvents();
        this.wireEvents();
        this.isChartLoaded = false;
        if (!this.isEmptyGrid) {
            this.trigger(events.dataBound);
        }
        this.actionObj.actionName = this.getActionCompleteName();
        if (this.actionObj.actionName) {
            if (this.actionObj.actionName === events.fieldFiltered && this.pivotCommon && this.pivotCommon.filterDialog) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.pivotCommon.filterDialog.setFocus.bind(this.pivotCommon.filterDialog));
            }
            if (this.actionObj.actionName !== events.windowResize) {
                this.actionCompleteMethod();
            }
        }
        if (this.groupingModule) {
            this.groupingModule.isUpdate = false;
        }
        if (this.engineModule) {
            this.engineModule.clearProperties();
        }
        if (this.virtualscrollModule && this.grid) {
            this.virtualscrollModule.onHorizondalScroll(mHdr, mCnt);
        }
        if (!this.isAdaptive && this.enableVirtualization && mCnt && this.virtualscrollModule && !enableOptimizedRendering) {
            var movableVirtualScrollBar = mCnt.parentElement.parentElement.querySelector('.e-movablescrolldiv');
            if (vWidth < (mCnt.parentElement.clientWidth * 3)) {
                mCnt.style.overflowX = 'visible';
                movableVirtualScrollBar.style.display = 'none';
                mHdr.scrollLeft = mCnt.parentElement.scrollLeft;
                setStyleAttribute(mCnt.querySelector('.' + cls.TABLE), {
                    transform: 'translate(0px,' + verOffset
                });
                setStyleAttribute(mHdr.querySelector('.' + cls.TABLE), {
                    transform: 'translate(0px, 0px)'
                });
                this.virtualscrollModule.alignFreezedCells(0, true);
            }
            else {
                EventHandler.remove(this.element.querySelector('.' + cls.GRID_CONTENT).querySelector('.' + cls.CONTENT_CLASS), 'scroll', this.headerScrollUpdate);
                var contentLeft = this.element.querySelector('.' + cls.GRID_CONTENT).querySelector('.' + cls.CONTENT_CLASS).scrollLeft;
                mCnt.style.overflowX = 'auto';
                movableVirtualScrollBar.style.display = 'block';
                if (contentLeft !== 0) {
                    movableVirtualScrollBar.scrollLeft = contentLeft;
                }
                if ((movableVirtualScrollBar.scrollLeft !== mCnt.scrollLeft) && (mCnt.scrollLeft !== 0)) {
                    movableVirtualScrollBar.scrollLeft = mCnt.scrollLeft;
                }
            }
        }
        this.isStaticRefresh = false;
    };
    PivotView.prototype.setToolTip = function (args) {
        var _this_1 = this;
        var colIndex = parseInt(args.target.getAttribute('aria-colindex'), 10) - 1;
        var rowIndex = Number(args.target.getAttribute('index'));
        var cell = (this.dataSourceSettings.values.length > 0 && this.pivotValues &&
            this.pivotValues[rowIndex] && this.pivotValues[rowIndex][colIndex]) ?
            this.pivotValues[rowIndex][colIndex] : undefined;
        this.tooltip.content = '';
        var aggregateType;
        var caption;
        var hasField = false;
        if (cell && this.dataType === 'olap') {
            var measureName = cell.actualText;
            if (!isNullOrUndefined(measureName) && this.olapEngineModule.fieldList &&
                !this.olapEngineModule.fieldList[measureName]) {
                var tupleInfo = this.olapEngineModule.tupRowInfo;
                measureName = cell.rowOrdinal > -1 && tupleInfo.length > 0 && tupleInfo[cell.rowOrdinal] &&
                    !isNullOrUndefined(tupleInfo[cell.rowOrdinal].measureName) ? tupleInfo[cell.rowOrdinal].measureName : measureName;
            }
            if (this.olapEngineModule.fieldList && this.olapEngineModule.fieldList[measureName]) {
                var field = this.olapEngineModule.fieldList[measureName];
                aggregateType = field.isCalculatedField ? field.type : field.aggregateType;
                caption = (this.olapEngineModule.dataFields[measureName] &&
                    this.olapEngineModule.dataFields[measureName].caption) ?
                    this.olapEngineModule.dataFields[measureName].caption : field.caption;
                hasField = true;
            }
        }
        else {
            if (cell && this.engineModule.fieldList && this.engineModule.fieldList[cell.actualText]) {
                var field = this.engineModule.fieldList[cell.actualText];
                aggregateType = field.aggregateType;
                if ((aggregateType !== 'DistinctCount') && (field.type !== 'number' || field.type === 'include' ||
                    field.type === 'exclude')) {
                    aggregateType = 'Count';
                }
                else {
                    aggregateType = (aggregateType === undefined) ? 'Sum' : field.aggregateType;
                }
                caption = field.caption;
                hasField = true;
            }
        }
        if (cell && hasField) {
            var columnIndex = (this.isTabular && this.engineModule.rowMaxLevel > 0) ? this.engineModule.rowMaxLevel : 0;
            var rowHeaders = this.getRowText(rowIndex, columnIndex);
            var columnHeaders = this.getColText(0, colIndex, rowIndex);
            var value = (cell.formattedText === '' ? this.localeObj.getConstant('noValue') :
                cell.formattedText);
            if (this.tooltipTemplate && this.getTooltipTemplate() !== undefined) {
                var rowFields = this.getHeaderField(rowIndex, colIndex, 'row');
                var columnFields = this.getHeaderField(rowIndex, colIndex, 'column');
                var templateObject = {
                    rowHeaders: rowHeaders,
                    columnHeaders: columnHeaders,
                    aggregateType: aggregateType,
                    valueField: caption,
                    value: value,
                    rowFields: rowFields,
                    columnFields: columnFields
                };
                if (typeof (this.tooltipTemplate) === 'function' && this.isReact) {
                    var tooltipContent_1 = document.createElement('div');
                    this.getTooltipTemplate()(templateObject, this, 'tooltipTemplate', this.element.id + 'tooltipTemplate', null, null, tooltipContent_1);
                    this.renderReactTemplates(function () {
                        if (_this_1.enableHtmlSanitizer) {
                            _this_1.tooltip.content = SanitizeHtmlHelper.sanitize(tooltipContent_1.outerHTML);
                        }
                        else {
                            _this_1.tooltip.content = tooltipContent_1.outerHTML;
                        }
                    });
                }
                else {
                    var element = this.getTooltipTemplate()(templateObject, this, 'tooltipTemplate', this.element.id + 'tooltipTemplate')[0].outerHTML;
                    if (this.enableHtmlSanitizer) {
                        this.tooltip.content = SanitizeHtmlHelper.sanitize(element);
                    }
                    else {
                        this.tooltip.content = element;
                    }
                }
            }
            else {
                var contentTemp_1 = '<div class=' + cls.PIVOTTOOLTIP + '><p class=' + cls.TOOLTIP_HEADER + '>' +
                    this.localeObj.getConstant('row') + ':</p><p class=' + cls.TOOLTIP_CONTENT + '>' +
                    rowHeaders + '</p></br><p class=' + cls.TOOLTIP_HEADER + '>' + this.localeObj.getConstant('column') +
                    ':</p><p class=' + cls.TOOLTIP_CONTENT + '>' + columnHeaders + '</p></br>' +
                    (cell.actualText !== '' ? ('<p class=' + cls.TOOLTIP_HEADER + '>' + (this.dataType === 'olap' ? '' :
                        (this.localeObj.getConstant(aggregateType) + ' ' + this.localeObj.getConstant('of') + ' ')) +
                        caption + ':</p><p class=' + cls.TOOLTIP_CONTENT + '>' + value + '</p></div>') : '');
                var contentFunc = function () {
                    return contentTemp_1;
                };
                this.tooltip.content = initializeCSPTemplate(contentFunc);
            }
        }
        else {
            args.cancel = true;
        }
    };
    /** @hidden */
    PivotView.prototype.getTooltipTemplate = function () {
        return this.tooltipTemplateFn;
    };
    /** @hidden */
    PivotView.prototype.getHeaderField = function (rowIndex, colIndex, axis) {
        var fields = '';
        var len;
        var engineModule = this.dataType === 'olap' ? this.olapEngineModule : this.engineModule;
        var delimiter = engineModule.valueSortSettings.headerDelimiter;
        if (axis === 'row') {
            len = this.pivotValues[rowIndex][0].valueSort.levelName.toString().split(delimiter).length;
            for (var i = 0; i < len && this.dataSourceSettings.rows.length > 0 && this.dataSourceSettings.rows[i]; i++) {
                fields += (i ? ' - ' : '') + ((this.dataSourceSettings.rows[i].caption) ? this.dataSourceSettings.rows[i].caption : this.dataSourceSettings.rows[i].name);
            }
        }
        else {
            if (this.dataSourceSettings.columns.length > 0) {
                var pos = this.dataSourceSettings.values.length === 0 ? 0 :
                    Number(Object.keys(engineModule.headerContent)[Object.keys(engineModule.headerContent).length - 1]);
                len =
                    this.pivotValues[pos][colIndex].valueSort.levelName.toString().split(delimiter).length;
                len = this.dataSourceSettings.values.length > 1 ? len - 1 : len;
            }
            for (var j = 0; j < len && this.dataSourceSettings.columns.length > 0 &&
                this.dataSourceSettings.columns[j]; j++) {
                fields += (j ? ' - ' : '') + ((this.dataSourceSettings.columns[j].caption) ? this.dataSourceSettings.columns[j].caption : this.dataSourceSettings.columns[j].name);
            }
        }
        return fields;
    };
    PivotView.prototype.getLevel = function (cell) {
        var levelName = cell.valueSort ? cell.valueSort.levelName.toString() : '';
        var memberPos = cell.actualText ?
            cell.actualText.toString().split(this.dataSourceSettings.valueSortSettings.headerDelimiter).length : 0;
        var levelPosition = levelName.split(this.dataSourceSettings.valueSortSettings.headerDelimiter).length -
            (memberPos ? memberPos - 1 : memberPos);
        return levelPosition ? (levelPosition - 1) : 0;
    };
    /**
     * It used to get row text
     *
     * @param {number} rowIndex - Specifies row Index.
     * @param {number} colIndex - Specifies column Index.
     * @returns {string} - Returns row text.
     * @hidden
     */
    PivotView.prototype.getRowText = function (rowIndex, colIndex) {
        var cell = this.pivotValues[rowIndex][colIndex];
        var rowText = '';
        if (cell) {
            var level = this.getLevel(cell);
            rowText = cell.type === 'grand sum' ? this.localeObj.getConstant('grandTotal') : cell.formattedText;
            if (this.dataSourceSettings.valueAxis === 'row') {
                rowText = (this.dataSourceSettings.rows.length === 0 && this.dataSourceSettings.values.length > 1) ? this.pivotValues[rowIndex][0].valueSort.levelName.toString().slice((this.localeObj.getConstant('grandTotal')
                    + this.dataSourceSettings.valueSortSettings.headerDelimiter).length).toString()
                    : this.dataSourceSettings.values.length === 1 ? !isNullOrUndefined(this.dataSourceSettings.values[0].caption)
                        ? this.dataSourceSettings.values[0].caption : this.dataSourceSettings.values[0].name
                        : this.pivotValues[rowIndex][0].valueSort.levelName.toString();
                rowText = rowText.split(this.dataSourceSettings.valueSortSettings.headerDelimiter).join(' - ');
            }
            else {
                if (this.isTabular) {
                    while (level > 0) {
                        colIndex--;
                        cell = this.pivotValues[rowIndex][colIndex];
                        rowText = rowText + this.dataSourceSettings.valueSortSettings.headerDelimiter + cell.formattedText;
                        level = level - 1;
                    }
                }
                else {
                    while (level > 0 || cell.index === undefined) {
                        rowIndex--;
                        cell = this.pivotValues[rowIndex][colIndex];
                        if (cell.index !== undefined) {
                            if (level > cell.level) {
                                rowText = rowText + this.dataSourceSettings.valueSortSettings.headerDelimiter + cell.formattedText;
                                level = level - 1;
                            }
                        }
                    }
                }
            }
            rowText = rowText.split(this.dataSourceSettings.valueSortSettings.headerDelimiter).reverse().join(' - ');
        }
        return rowText;
    };
    PivotView.prototype.getColText = function (rowIndex, colIndex, limit) {
        var cell = this.pivotValues[0][colIndex];
        var axis = cell.axis;
        var colText = cell.type === 'grand sum' ? this.localeObj.getConstant('grandTotal') : cell.formattedText;
        while (axis !== 'value' && limit > rowIndex) {
            rowIndex++;
            if (this.pivotValues[rowIndex]) {
                cell = this.pivotValues[rowIndex][colIndex];
                axis = cell.axis;
                if (cell.type !== 'sum' && cell.type !== 'grand sum' && axis !== 'value') {
                    colText = colText + ' - ' + cell.formattedText;
                }
            }
        }
        return colText;
    };
    PivotView.prototype.updateClass = function () {
        if (this.enableRtl) {
            addClass([this.element], cls.RTL);
        }
        else {
            removeClass([this.element], cls.RTL);
        }
        if (this.isAdaptive) {
            addClass([this.element], cls.DEVICE);
        }
        else {
            removeClass([this.element], cls.DEVICE);
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
    };
    PivotView.prototype.mouseRclickHandler = function (e) {
        if (e.which === 3) {
            this.lastCellClicked = e.target;
        }
        else if (e.which === 0) {
            this.lastCellClicked = e.target;
        }
        this.lastCellClicked = e.target;
    };
    PivotView.prototype.mouseDownHandler = function (e) {
        if (e.which === 3) {
            this.lastCellClicked = e.target;
        }
        if (this.isCellBoxMultiSelection) {
            this.isMouseDown = e.target.closest('.' + cls.PIVOT_BUTTON_CLASS) ? false : true;
            this.isMouseUp = false;
            this.lastSelectedElement = undefined;
        }
    };
    PivotView.prototype.mouseMoveHandler = function (e) {
        var _this_1 = this;
        if (this.isCellBoxMultiSelection) {
            e.preventDefault();
            var ele_1 = e.target ? e.target : undefined;
            if (this.isMouseDown && ele_1 && (!ele_1.classList.contains('e-expand') && !ele_1.classList.contains('e-collapse'))) {
                var axis = (ele_1.parentElement.classList.contains(cls.ROWSHEADER) || ele_1.classList.contains(cls.ROWSHEADER)) ? 'row' : 'column';
                ele_1 = axis === 'column' ? closest(ele_1, 'th') : closest(ele_1, 'td');
                if (ele_1) {
                    var colIndex = parseInt(ele_1.getAttribute('aria-colindex'), 10) - 1;
                    var rowIndex = Number(ele_1.getAttribute('index'));
                    var selectArgs = {
                        cancel: false,
                        isCellClick: true,
                        currentCell: ele_1,
                        data: this.pivotValues[rowIndex][colIndex]
                    };
                    this.trigger(events.cellSelecting, selectArgs, function (observedArgs) {
                        if (!observedArgs.cancel) {
                            _this_1.grid.clearSelection();
                            var parentElement = _this_1.parentAt(ele_1, 'TH');
                            if (_this_1.lastSelectedElement && _this_1.lastSelectedElement !== parentElement &&
                                parentElement.classList.contains(cls.SELECTED_BGCOLOR)) {
                                _this_1.lastSelectedElement.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
                                _this_1.lastSelectedElement.classList.remove(cls.SELECTED_BGCOLOR);
                                _this_1.lastSelectedElement = parentElement;
                            }
                            else {
                                _this_1.lastSelectedElement = parentElement;
                                if (!(parentElement.classList.contains(cls.HEADERCELL) &&
                                    parentElement.classList.contains(cls.FREEZED_CELL))) {
                                    parentElement.classList.add(cls.CELL_ACTIVE_BGCOLOR);
                                    parentElement.classList.add(cls.SELECTED_BGCOLOR);
                                }
                            }
                            _this_1.renderModule.selected();
                        }
                    });
                }
            }
        }
    };
    PivotView.prototype.mouseUpHandler = function () {
        if (this.isCellBoxMultiSelection) {
            this.isMouseDown = false;
            this.isMouseUp = true;
        }
    };
    PivotView.prototype.parentAt = function (target, tagName) {
        while (target.tagName !== tagName) {
            if (target.parentElement) {
                target = target.parentElement;
            }
            else {
                break;
            }
        }
        return target;
    };
    PivotView.prototype.mouseClickHandler = function (e) {
        if (e.which === 3) {
            this.lastCellClicked = e.target;
        }
        else if (e.which === 0) {
            this.lastCellClicked = e.target;
        }
        var target = e.target;
        if (closest(target, '.' + cls.PIVOT_BUTTON_CLASS)) {
            return;
        }
        var ele = null;
        var rowHeaderCell = target.closest('td.e-rowsheader');
        var axis = rowHeaderCell ? 'row' : 'column';
        ele = axis === 'column' ? closest(target, 'th') : closest(target, 'td');
        if (axis === 'column' && !ele && this.gridSettings.selectionSettings.mode !== 'Row') {
            ele = closest(target, 'td');
        }
        if (!target.classList.contains(cls.COLLAPSE) && !target.classList.contains(cls.EXPAND) && this.enableValueSorting && !target.classList.contains(cls.RESIZED) && !(target.classList.contains(cls.RHANDLER) && target.classList.contains(cls.RCURSOR)) && !(this.dataType === 'olap' && this.enableVirtualization)) {
            var engine = this.dataType === 'pivot' ? this.engineModule : this.olapEngineModule;
            this.cellClicked(target, ele, e);
            try {
                if (ele && ((ele.parentElement.parentElement.parentElement.parentElement.classList.contains(cls.HEADERCONTENT) &&
                    this.dataSourceSettings.valueAxis === 'column' && !ele.classList.contains(cls.FREEZED_CELL)) ||
                    (ele.parentElement.classList.contains('e-row') && this.dataSourceSettings.valueAxis === 'row') &&
                        (ele.classList.contains('e-rowsheader') || ele.classList.contains('e-stot')))) {
                    var FieldName = ele.getAttribute('fieldname');
                    var fieldInfo = PivotUtil.getFieldInfo(FieldName, this);
                    this.actionObj.actionName = events.sortValue;
                    this.actionObj.fieldInfo = fieldInfo.fieldItem;
                    if (this.actionBeginMethod()) {
                        return;
                    }
                    var colIndex = parseInt(ele.getAttribute('aria-colindex'), 10) - 1;
                    var rowIndex = Number(ele.getAttribute('index'));
                    if (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 || this.dataSourceSettings.alwaysShowValueHeader)) {
                        var header = this.pivotValues[rowIndex][colIndex];
                        if (this.dataSourceSettings.valueIndex === -1) {
                            rowIndex = header.type === 'value' || header.memberType === 3 ? rowIndex : (rowIndex + 1);
                        }
                        else {
                            var level = this.getLevel(header);
                            rowIndex = (level <= engine.measureIndex && header.members && header.members.length > 0) ?
                                header.members[0].rowIndex : rowIndex;
                        }
                    }
                    else if (this.dataSourceSettings.valueAxis === 'column' && (this.dataSourceSettings.values.length > 1 || this.dataSourceSettings.alwaysShowValueHeader)) {
                        colIndex = ((parseInt(ele.getAttribute('aria-colindex'), 10) - 1) + Number(ele.getAttribute('aria-colspan')) - 1);
                        rowIndex = engine.headerContent.length - 1;
                    }
                    this.setProperties({
                        dataSourceSettings: {
                            valueSortSettings: {
                                columnIndex: ((parseInt(ele.getAttribute('aria-colindex'), 10) - 1) + Number(ele.getAttribute('aria-colspan')) - 1),
                                sortOrder: this.dataSourceSettings.valueSortSettings.sortOrder === 'Descending' ?
                                    'Ascending' : 'Descending',
                                headerText: this.pivotValues[rowIndex][colIndex].valueSort.levelName,
                                headerDelimiter: this.dataSourceSettings.valueSortSettings.headerDelimiter ?
                                    this.dataSourceSettings.valueSortSettings.headerDelimiter : '.'
                            }
                        }
                    }, true);
                    this.showWaitingPopup();
                    var pivot = this;
                    engine.enableValueSorting = true;
                    if (pivot.enableVirtualization || pivot.enablePaging) {
                        if (pivot.dataSourceSettings.enableSorting) {
                            for (var _i = 0, _a = Object.keys(pivot.engineModule.fieldList); _i < _a.length; _i++) {
                                var key = _a[_i];
                                pivot.engineModule.fieldList[key].sort = 'Ascending';
                            }
                            pivot.setProperties({ dataSourceSettings: { sortSettings: [] } }, true);
                        }
                        if (pivot.dataSourceSettings.mode === 'Server') {
                            pivot.getEngine('onValueSort', null, null, null, null, null, null);
                        }
                        else {
                            pivot.engineModule.rMembers = pivot.engineModule.headerCollection.rowHeaders;
                            pivot.engineModule.cMembers = pivot.engineModule.headerCollection.columnHeaders;
                            pivot.engineModule.applyValueSorting();
                            pivot.engineModule.updateEngine();
                        }
                    }
                    else if (pivot.dataSourceSettings.mode === 'Server') {
                        pivot.getEngine('onValueSort', null, null, null, null, null, null);
                    }
                    else if (this.dataType === 'olap') {
                        pivot.olapEngineModule.onSort(pivot.dataSourceSettings, true);
                    }
                    else {
                        pivot.engineModule.generateGridData(pivot.dataSourceSettings, true);
                    }
                    pivot.allowServerDataBinding = false;
                    pivot.setProperties({ pivotValues: engine.pivotValues }, true);
                    pivot.allowServerDataBinding = true;
                    var actionInfo = {
                        valueSortInfo: engine.valueSortSettings
                    };
                    this.actionObj.actionInfo = actionInfo;
                    pivot.renderPivotGrid();
                }
            }
            catch (execption) {
                this.actionFailureMethod(execption);
            }
        }
        else if (target.classList.contains(cls.COLLAPSE) || target.classList.contains(cls.EXPAND)) {
            var drillFieldName = target.parentElement.getAttribute('fieldname');
            var fieldInfo = PivotUtil.getFieldInfo(drillFieldName, this);
            var actionName = target.classList.contains(cls.COLLAPSE) ? this.actionObj.actionName = events.drillUp : target.classList.contains(cls.EXPAND) ? this.actionObj.actionName = events.drillDown : '';
            this.actionObj.actionName = actionName;
            this.actionObj.fieldInfo = fieldInfo.fieldItem;
            if (this.actionBeginMethod()) {
                return;
            }
            try {
                this.onDrill(target);
            }
            catch (execption) {
                this.actionFailureMethod(execption);
            }
        }
        else {
            this.cellClicked(target, ele, e);
            return;
        }
    };
    PivotView.prototype.updateTotColWidth = function () {
        this.totColWidth = 0;
        for (var _i = 0, _a = this.pivotColumns; _i < _a.length; _i++) {
            var column = _a[_i];
            this.totColWidth = this.totColWidth + column.width;
        }
    };
    PivotView.prototype.framePivotColumns = function (gridcolumns) {
        for (var _i = 0, gridcolumns_1 = gridcolumns; _i < gridcolumns_1.length; _i++) {
            var column = gridcolumns_1[_i];
            if (column.columns && column.columns.length > 0) {
                this.framePivotColumns(column.columns);
            }
            else {
                var levelName = column.field === '0.formattedText' ? '' : ((column.customAttributes &&
                    column.customAttributes.cell && column.customAttributes.cell.valueSort) ?
                    column.customAttributes.cell.valueSort.levelName : '');
                var width = this.renderModule.setSavedWidth(column.field === '0.formattedText' ? column.field :
                    levelName, Number(column.width === 'auto' ? column.minWidth : column.width));
                this.pivotColumns.push({
                    allowReordering: column.allowReordering,
                    allowResizing: column.allowResizing,
                    headerText: levelName,
                    width: width,
                    autoFit: column.autoFit
                });
                this.totColWidth = this.totColWidth + Number(width);
            }
        }
    };
    /** @hidden */
    PivotView.prototype.setGridColumns = function (gridcolumns) {
        if ((!isNullOrUndefined(this.totColWidth) && this.totColWidth > 0) || this.renderModule.isAutoFitEnabled) {
            for (var _i = 0, gridcolumns_2 = gridcolumns; _i < gridcolumns_2.length; _i++) {
                var column = gridcolumns_2[_i];
                if (column.columns && column.columns.length > 0) {
                    this.setGridColumns(column.columns);
                }
                else if (this.renderModule.isAutoFitEnabled) {
                    column.autoFit = this.pivotColumns[this.posCount].autoFit;
                    this.posCount++;
                }
                else {
                    var levelName = column.field === '0.formattedText' ? '' :
                        (column.customAttributes ? column.customAttributes.cell.valueSort.levelName : '');
                    column.allowReordering = this.pivotColumns[this.posCount].allowReordering;
                    column.allowResizing = this.pivotColumns[this.posCount].allowResizing;
                    column.autoFit = this.pivotColumns[this.posCount].autoFit;
                    var calcWidth = this.renderModule.setSavedWidth(column.field === '0.formattedText' ? column.field :
                        levelName, Number(this.pivotColumns[this.posCount].width));
                    if (!column.autoFit) {
                        if (column.width !== 'auto') {
                            column.width = calcWidth;
                        }
                        else {
                            column.minWidth = calcWidth;
                        }
                    }
                    else {
                        this.renderModule.isAutoFitEnabled = true;
                    }
                    this.posCount++;
                    if (column.allowReordering) {
                        this.gridSettings.allowReordering = true;
                    }
                    if (column.allowResizing) {
                        this.gridSettings.allowResizing = true;
                    }
                }
            }
            if (this.gridSettings.allowReordering) {
                Grid.Inject(Reorder);
            }
            if (this.gridSettings.allowResizing) {
                Grid.Inject(Resize);
            }
        }
    };
    /** @hidden */
    PivotView.prototype.fillGridColumns = function (gridcolumns) {
        for (var _i = 0, gridcolumns_3 = gridcolumns; _i < gridcolumns_3.length; _i++) {
            var column = gridcolumns_3[_i];
            column.allowReordering = this.gridSettings.allowReordering;
            column.allowResizing = this.gridSettings.allowResizing;
            column.clipMode = this.gridSettings.clipMode;
            this.posCount++;
            if (column.columns && column.columns.length > 0) {
                this.fillGridColumns(column.columns);
            }
        }
    };
    /** @hidden */
    PivotView.prototype.triggerColumnRenderEvent = function (gridcolumns) {
        this.pivotColumns = [];
        this.totColWidth = 0;
        this.framePivotColumns(gridcolumns);
        var firstColWidth = this.pivotColumns[0].width;
        var eventArgs = {
            columns: this.pivotColumns,
            dataSourceSettings: this.dataSourceSettings,
            stackedColumns: this.getStackedColumns(gridcolumns, [])
        };
        this.trigger(events.beforeColumnsRender, eventArgs);
        this.updateTotColWidth();
        if (firstColWidth !== this.pivotColumns[0].width) {
            this.firstColWidth = this.pivotColumns[0].width;
            this.renderModule.resColWidth = parseInt(this.firstColWidth.toString(), 10);
        }
        this.posCount = 0;
        this.setGridColumns(gridcolumns);
    };
    /** @hidden */
    PivotView.prototype.setCommonColumnsWidth = function (columns, width) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (this.isTabular) {
                if (column.index > this.engineModule.rowMaxLevel) {
                    if (column.columns) {
                        this.setCommonColumnsWidth(column.columns, width);
                    }
                    else {
                        this.setColumnWidth(column, width);
                    }
                }
                else {
                    column.width = !this.firstColWidth ? column.width : this.firstColWidth;
                }
            }
            else {
                if (column.field !== '0.formattedText') {
                    if (column.columns) {
                        this.setCommonColumnsWidth(column.columns, width);
                    }
                    else {
                        this.setColumnWidth(column, width);
                    }
                }
                else {
                    column.width = !this.firstColWidth ? column.width : this.firstColWidth;
                }
            }
        }
    };
    /** @hidden */
    PivotView.prototype.getHeightAsNumber = function () {
        var height;
        var displayMode;
        if (isNaN(this.height)) {
            if (this.height.toString().indexOf('%') > -1) {
                if (this.isAngular && this.element && this.element.style) {
                    displayMode = window.getComputedStyle(this.element).display;
                    this.element.style.display = 'block';
                }
                height = (parseFloat(this.height.toString()) / 100) * this.element.offsetHeight;
                if (this.isAngular && this.element && this.element.style) {
                    this.element.style.display = displayMode;
                }
            }
            else if (this.height.toString().indexOf('px') > -1) {
                height = Number(this.height.toString().split('px')[0]);
            }
        }
        else {
            height = Number(this.height);
        }
        if ((height < this.minHeight) || (this.height === 'auto')) {
            height = this.minHeight;
        }
        return height;
    };
    /** @hidden */
    PivotView.prototype.getWidthAsNumber = function () {
        var width;
        if (isNaN(this.width)) {
            if (this.width.toString().indexOf('%') > -1) {
                width = (parseFloat(this.width.toString()) / 100) * this.element.offsetWidth;
            }
            else if (this.width.toString().indexOf('px') > -1) {
                width = Number(this.width.toString().split('px')[0]);
            }
            if (isNaN(width)) {
                width = this.element.offsetWidth;
            }
        }
        else {
            width = Number(this.width);
        }
        if (width < 400 && !this.isAdaptive) {
            width = this.minWidth ? this.minWidth : 400;
        }
        else if (this.isAdaptive && width < 310) {
            width = this.minWidth ? this.minWidth : 310;
        }
        return width;
    };
    /** @hidden */
    PivotView.prototype.getGridWidthAsNumber = function () {
        var width;
        var offsetWidth = this.element.offsetWidth ? this.element.offsetWidth :
            this.element.getBoundingClientRect().width;
        if (isNaN(this.grid.width)) {
            if (this.grid.width.toString().indexOf('%') > -1) {
                width = (parseFloat(this.grid.width.toString()) / 100) * offsetWidth;
            }
            else if (this.grid.width.toString().indexOf('px') > -1) {
                width = Number(this.grid.width.toString().split('px')[0]);
            }
            if (isNaN(width)) {
                width = offsetWidth;
            }
        }
        else {
            width = Number(this.grid.width);
        }
        return width;
    };
    /** @hidden */
    PivotView.prototype.onWindowResize = function () {
        this.actionObj.actionName = events.windowResize;
        if (this.actionBeginMethod()) {
            return;
        }
        clearTimeout(this.timeOutObj);
        this.timeOutObj = setTimeout(this.layoutRefresh.bind(this), 500);
        this.actionObj.actionName = this.getActionCompleteName();
        if (this.actionObj.actionName) {
            this.actionCompleteMethod();
        }
    };
    /**
     * Refreshes the Pivot Table for blazor layoutRefresh is called for other base refresh is called.
     *
     * @returns {void}
     */
    PivotView.prototype.refresh = function () {
        this.pivotRefresh();
    };
    /** @hidden */
    PivotView.prototype.layoutRefresh = function () {
        if (this.element && this.element.classList.contains('e-pivotview') &&
            (this.dataType === 'olap' ? (this.olapEngineModule && this.olapEngineModule.pivotValues) :
                this.engineModule && this.engineModule.pivotValues)) {
            if (this.grid) {
                var colLength = (this.dataType === 'olap' && this.olapEngineModule.pivotValues.length > 0) ?
                    this.olapEngineModule.pivotValues[0].length : (this.dataSourceSettings.values.length > 0 &&
                    this.engineModule && this.engineModule.pivotValues.length > 0 ? this.engineModule.pivotValues[0].length : 2);
                var colWidth = this.renderModule.calculateColWidth(colLength);
                this.grid.width = this.renderModule.calculateGridWidth();
                this.renderModule.calculateGridHeight(true);
                if (this.gridSettings.allowAutoResizing) {
                    this.setCommonColumnsWidth(this.grid.columns, colWidth);
                }
                this.triggerColumnRenderEvent(this.grid.columns);
                this.grid.refreshColumns();
                if (this.renderModule.isAutoFitEnabled) {
                    this.renderModule.addPivotAutoFitClass();
                }
                else {
                    this.renderModule.removePivotAutoFitClass();
                }
                if (this.showGroupingBar && this.groupingBarModule && this.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.setGridRowWidth();
                }
                if (this.chart && this.pivotChartModule) {
                    this.chart.height = this.pivotChartModule.getResizedChartHeight();
                }
            }
            if (this.showToolbar && this.toolbarModule && this.toolbarModule.toolbar) {
                this.toolbarModule.toolbar.width = this.grid ? this.getGridWidthAsNumber() : this.getWidthAsNumber();
            }
            if (this.enablePaging) {
                this.notify(events.initPivotPager, this);
            }
            if (this.chart && ((this.showToolbar && this.currentView === 'Chart') || !this.showToolbar)) {
                this.chart.width = (this.showToolbar && this.grid) ? this.getGridWidthAsNumber().toString() :
                    (this.displayOption.view === 'Both' && this.grid) ? this.getGridWidthAsNumber().toString() : this.getWidthAsNumber().toString();
                this.chart.height = this.pivotChartModule.getResizedChartHeight();
                if (this.displayOption.view === 'Chart' && this.showGroupingBar && this.groupingBarModule &&
                    this.element.querySelector('.' + cls.CHART_GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.refreshUI();
                }
            }
        }
    };
    PivotView.prototype.cellClicked = function (target, ele, e) {
        var _this_1 = this;
        if (target.classList.contains(cls.ROW_SELECT)) {
            if (target.classList.contains(cls.SPAN_CLICKED)) {
                this.isPopupClicked = false;
            }
            else {
                this.isPopupClicked = true;
            }
        }
        if (ele && !isNullOrUndefined(this.pivotValues) && this.pivotValues.length > 0) {
            var colIndex_1 = parseInt(ele.getAttribute('aria-colindex'), 10) - 1;
            var rowIndex_1 = Number(ele.getAttribute('index'));
            var colSpan_1 = Number(ele.getAttribute('aria-colspan'));
            var selectArgs = {
                cancel: false,
                isCellClick: true,
                currentCell: ele,
                data: this.pivotValues[rowIndex_1][colIndex_1]
            };
            this.trigger(events.cellSelecting, selectArgs, function (observedArgs) {
                if (_this_1.gridSettings.allowSelection) {
                    if (_this_1.gridSettings.selectionSettings.mode === 'Both' ? !ele.classList.contains(cls.ROW_CELL_CLASS) :
                        _this_1.gridSettings.selectionSettings.mode !== 'Row') {
                        if (!observedArgs.cancel) {
                            _this_1.clearSelection(ele, e);
                            _this_1.applyColumnSelection(e, ele, colIndex_1, colIndex_1 + (colSpan_1 > 0 ? (colSpan_1 - 1) : 0), rowIndex_1);
                        }
                    }
                    else {
                        _this_1.clearSelection(ele, e);
                    }
                    if (_this_1.gridSettings.selectionSettings.mode !== 'Column' && !ele.classList.contains(cls.COLUMNSHEADER)) {
                        _this_1.rowDeselect(ele, e, rowIndex_1, _this_1.gridSettings.selectionSettings.mode, observedArgs);
                    }
                    if (_this_1.gridSettings.selectionSettings.mode !== 'Column' && !observedArgs.cancel) {
                        if (_this_1.gridSettings.selectionSettings.type === 'Multiple' ? (!e.ctrlKey && !e.shiftKey) : true && _this_1.selectedRowIndex !== rowIndex_1) {
                            _this_1.selectedRowIndex = rowIndex_1;
                            _this_1.grid.selectionModule.selectRow(rowIndex_1 - _this_1.renderModule.rowStartPos);
                        }
                        else {
                            _this_1.selectedRowIndex = undefined;
                        }
                    }
                }
                if (_this_1.cellClick && observedArgs.isCellClick) {
                    _this_1.trigger(events.cellClick, {
                        currentCell: ele,
                        data: _this_1.pivotValues[rowIndex_1][colIndex_1],
                        nativeEvent: e
                    });
                }
                _this_1.getSelectedCellsPos();
            });
        }
        else {
            this.clearSelection(null, e);
        }
    };
    PivotView.prototype.rowDeselect = function (ele, e, rowIndex, mode, observedArgs) {
        if (!e.shiftKey && !e.ctrlKey && this.gridSettings.selectionSettings.mode !== 'Both'
            || this.gridSettings.selectionSettings.type === 'Single') {
            if (!ele.classList.contains(cls.CELL_SELECTED_BGCOLOR) && !ele.classList.contains(cls.SELECTED_BGCOLOR)
                && !ele.classList.contains(cls.CELL_ACTIVE_BGCOLOR)) {
                if (!observedArgs.cancel) {
                    removeClass(this.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR), cls.CELL_SELECTED_BGCOLOR);
                    removeClass(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR), cls.SELECTED_BGCOLOR);
                    removeClass(this.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR), cls.CELL_ACTIVE_BGCOLOR);
                }
                else {
                    this.setSavedSelectedCells();
                }
            }
            else {
                removeClass(this.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR), cls.CELL_SELECTED_BGCOLOR);
                removeClass(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR), cls.SELECTED_BGCOLOR);
                removeClass(this.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR), cls.CELL_ACTIVE_BGCOLOR);
                if (!observedArgs.cancel) {
                    if ((mode === 'Cell')) {
                        addClass([ele], [cls.CELL_SELECTED_BGCOLOR]);
                    }
                    else if (mode === 'Row' || this.gridSettings.selectionSettings.type === 'Single') {
                        var query = '[index="' + rowIndex + '"]';
                        addClass(this.element.querySelectorAll(query), [cls.SELECTED_BGCOLOR, cls.CELL_ACTIVE_BGCOLOR]);
                        if (mode !== 'Row') {
                            ele.classList.add(cls.CELL_SELECTED_BGCOLOR);
                        }
                    }
                }
                else {
                    this.setSavedSelectedCells();
                }
            }
        }
        else if (((e.shiftKey || e.ctrlKey) || this.gridSettings.selectionSettings.mode === 'Both') && (observedArgs.cancel)) {
            removeClass(this.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR), cls.CELL_SELECTED_BGCOLOR);
            removeClass(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR), cls.SELECTED_BGCOLOR);
            removeClass(this.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR), cls.CELL_ACTIVE_BGCOLOR);
            this.setSavedSelectedCells();
        }
    };
    /** @hidden */
    PivotView.prototype.clearSelection = function (ele, e) {
        if ((!e.shiftKey && !e.ctrlKey) || this.gridSettings.selectionSettings.type === 'Single') {
            if (this.gridSettings.selectionSettings.mode === 'Cell') {
                if (ele && ele.classList.contains(cls.COLUMNSHEADER)) {
                    removeClass(this.element.querySelectorAll(('.' + cls.ROW_CELL_CLASS + '.') + cls.CELL_SELECTED_BGCOLOR), cls.CELL_SELECTED_BGCOLOR);
                }
                else {
                    removeClass(this.element.querySelectorAll(('.' + cls.COLUMNSHEADER + '.') + cls.CELL_ACTIVE_BGCOLOR), [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR]);
                }
            }
            else if (this.gridSettings.selectionSettings.mode === 'Both') {
                if (ele && ele.classList.contains(cls.ROW_CELL_CLASS)) {
                    for (var _i = 0, _a = [].slice.call(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR + ', .' + cls.CELL_SELECTED_BGCOLOR)); _i < _a.length; _i++) {
                        var ele_2 = _a[_i];
                        // if (Number((ele as HTMLElement).getAttribute('index')) !== rowIndex) {
                        removeClass([ele_2], [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR, cls.CELL_SELECTED_BGCOLOR]);
                        // }
                    }
                }
                else {
                    removeClass(this.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR), cls.CELL_SELECTED_BGCOLOR);
                }
            }
        }
    };
    /** @hidden */
    PivotView.prototype.applyRowSelection = function (colIndex, rowIndex, e) {
        var pivotValue = this.engineModule.pivotValues[rowIndex][colIndex];
        if (!e.ctrlKey && !e.shiftKey && pivotValue && this.selectedRowIndex !== rowIndex) {
            this.selectedRowIndex = rowIndex;
            var parentLevel = pivotValue.level;
            var rCount = rowIndex;
            do {
                rCount++;
                pivotValue = this.engineModule.pivotValues[rCount][colIndex];
            } while (pivotValue && parentLevel < pivotValue.level);
            var _this = this;
            if (this.isAdaptive) {
                this.rowRangeSelection = {
                    enable: true,
                    startIndex: rowIndex - _this.renderModule.rowStartPos,
                    endIndex: rCount - (1 + _this.renderModule.rowStartPos)
                };
            }
            else {
                _this.grid.selectionModule.selectRowsByRange(rowIndex -
                    _this.renderModule.rowStartPos, rCount - (1 + _this.renderModule.rowStartPos));
            }
        }
        else {
            this.selectedRowIndex = undefined;
        }
    };
    /** @hidden */
    PivotView.prototype.applyColumnSelection = function (e, target, colStart, colEnd, rowStart) {
        if (!target.classList.contains(cls.ROWSHEADER) &&
            (this.gridSettings.selectionSettings.mode === 'Cell' ? target.classList.contains(cls.COLUMNSHEADER) : true)) {
            var isCtrl = e.ctrlKey;
            if (this.isAdaptive && this.gridSettings.selectionSettings.type === 'Multiple') {
                this.grid.selectionModule['showPopup'](e);
                if (this.isPopupClicked) {
                    this.element.querySelector('.' + cls.ROW_SELECT).classList.add(cls.SPAN_CLICKED);
                    isCtrl = true;
                }
                else {
                    this.element.querySelector('.' + cls.ROW_SELECT).classList.remove(cls.SPAN_CLICKED);
                    isCtrl = false;
                }
            }
            var queryStringArray = [];
            var type = this.gridSettings.selectionSettings.type;
            var isToggle = target.classList.contains(cls.CELL_ACTIVE_BGCOLOR);
            var activeColumns = [];
            var actColPos = {};
            for (var cCnt = colStart; cCnt <= colEnd; cCnt++) {
                activeColumns.push(cCnt.toString());
            }
            if (!isCtrl || type === 'Single') {
                for (var _i = 0, _a = [].slice.call(this.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR)); _i < _a.length; _i++) {
                    var ele = _a[_i];
                    removeClass([ele], [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR]);
                    if (activeColumns.indexOf((parseInt(ele.getAttribute('aria-colindex'), 10) - 1).toString()) === -1) {
                        isToggle = false;
                    }
                    var colIndex = parseInt(ele.getAttribute('aria-colindex'), 10) - 1;
                    actColPos[colIndex] = colIndex;
                }
                activeColumns = Object.keys(actColPos).length > 0 ? Object.keys(actColPos).sort(function (a, b) {
                    return parseInt(a, 10) - parseInt(b, 10);
                }) : activeColumns;
            }
            else {
                isToggle = false;
            }
            if (type === 'Multiple' && e.shiftKey) {
                this.shiftLockedPos = this.shiftLockedPos.length === 0 ? activeColumns : this.shiftLockedPos;
                if (Number(this.shiftLockedPos[0]) <= colStart) {
                    colStart = Number(this.shiftLockedPos[0]);
                }
                else {
                    colEnd = colEnd < Number(this.shiftLockedPos[this.shiftLockedPos.length - 1]) ?
                        Number(this.shiftLockedPos[this.shiftLockedPos.length - 1]) : colEnd;
                }
            }
            else {
                this.shiftLockedPos = [];
            }
            var rowSelectedList = [];
            if (e.ctrlKey && this.gridSettings.selectionSettings.mode === 'Both' && type === 'Multiple' && !target.classList.contains(cls.ROWSHEADER)) {
                for (var _b = 0, _c = [].slice.call(this.element.querySelectorAll('.' + cls.ROWSHEADER + '.' + cls.CELL_SELECTED_BGCOLOR)); _b < _c.length; _b++) {
                    var ele = _c[_b];
                    rowSelectedList.push(ele.getAttribute('index'));
                }
            }
            var count = colStart;
            while (count <= colEnd) {
                queryStringArray.push('[aria-colindex="' + (count + 1) + '"]' + (this.gridSettings.selectionSettings.mode === 'Cell' ?
                    '[index="' + rowStart + '"]' : '') + '');
                count++;
            }
            if (!isToggle) {
                rowStart = target.classList.contains(cls.HEADERCELL) ? rowStart : (this.renderModule.rowStartPos - 1);
                var isTargetSelected = target.classList.contains(cls.CELL_ACTIVE_BGCOLOR);
                for (var _d = 0, _e = [].slice.call(this.element.querySelectorAll(queryStringArray.toString())); _d < _e.length; _d++) {
                    var ele = _e[_d];
                    if (Number(ele.getAttribute('index')) >= rowStart) {
                        if (isTargetSelected && isCtrl && (rowSelectedList.indexOf(ele.getAttribute('index')) === -1)) {
                            removeClass([ele], [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR]);
                        }
                        else {
                            addClass([ele], [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR]);
                        }
                    }
                }
            }
            this.renderModule.selected();
        }
    };
    PivotView.prototype.getSelectedCellsPos = function () {
        var control = this;
        control.savedSelectedCellsPos = [];
        control.cellSelectionPos = [];
        for (var _i = 0, _a = [].slice.call(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR)); _i < _a.length; _i++) {
            var ele = _a[_i];
            control.savedSelectedCellsPos.push({ rowIndex: ele.getAttribute('index'), colIndex: (parseInt(ele.getAttribute('aria-colindex'), 10) - 1).toString() });
        }
        for (var _b = 0, _c = [].slice.call(this.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR)); _b < _c.length; _b++) {
            var ele = _c[_b];
            control.cellSelectionPos.push({ rowIndex: ele.getAttribute('index'), colIndex: (parseInt(ele.getAttribute('aria-colindex'), 10) - 1).toString() });
        }
    };
    PivotView.prototype.setSavedSelectedCells = function () {
        var control = this;
        for (var _i = 0, _a = [].slice.call(this.savedSelectedCellsPos); _i < _a.length; _i++) {
            var item = _a[_i];
            var query = '[aria-colindex="' + (parseInt(item.colIndex, 10) + 1) + '"][index="' + item.rowIndex + '"]';
            addClass([control.element.querySelector(query)], [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR]);
        }
        for (var _b = 0, _c = [].slice.call(this.cellSelectionPos); _b < _c.length; _b++) {
            var item = _c[_b];
            var query = '[aria-colindex="' + (parseInt(item.colIndex, 10) + 1) + '"][index="' + item.rowIndex + '"]';
            addClass([control.element.querySelector(query)], [cls.CELL_SELECTED_BGCOLOR]);
        }
    };
    PivotView.prototype.renderEmptyGrid = function () {
        var _this_1 = this;
        this.isEmptyGrid = true;
        this.notEmpty = false;
        this.isInitial = true;
        this.renderModule = this.renderModule ? this.renderModule : new Render(this);
        if (this.grid && this.grid.element && this.element.querySelector('.' + cls.GRID_CLASS)) {
            this.notEmpty = true;
            this.grid.setProperties({
                columns: this.renderModule.frameEmptyColumns(),
                dataSource: this.renderModule.frameEmptyData()
            }, true);
            this.grid.notify('datasource-modified', {});
            this.grid.refreshColumns();
        }
        else {
            if (this.element.querySelector('.' + cls.GRID_CLASS)) {
                remove(this.element.querySelector('.' + cls.GRID_CLASS));
            }
            this.renderModule.bindGrid(this, true);
            this.grid.showSpinner = function () {
                // show spinner method called
            };
            this.grid.hideSpinner = function () {
                // hide spinner method called
            };
            var element = createElement('div', { id: this.element.id + '_grid' });
            this.element.appendChild(element);
            this.grid.isStringTemplate = true;
            this.grid.appendTo(element);
            this.grid.off('data-ready', this.grid.dataReady);
            this.grid.on('data-ready', function () {
                _this_1.grid.scrollModule.setWidth();
                _this_1.grid.scrollModule.setHeight();
            });
        }
    };
    /** @hidden */
    PivotView.prototype.initEngine = function () {
        var _this_1 = this;
        if (this.element.querySelector('.e-spin-hide')) {
            this.showWaitingPopup();
        }
        if (this.dataType === 'pivot') {
            var data = !isNullOrUndefined(this.dataSourceSettings.dataSource) &&
                this.dataSourceSettings.dataSource.length > 0
                ? this.dataSourceSettings.dataSource[0] :
                !isNullOrUndefined(this.engineModule.data) ? this.engineModule.data[0] : undefined;
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
        this.trigger(events.enginePopulating, args, function (observedArgs) {
            PivotUtil.updateDataSourceSettings(_this_1, observedArgs.dataSourceSettings);
            _this_1.updatePageSettings(false);
            var customProperties = {
                mode: '',
                savedFieldList: undefined,
                pageSettings: _this_1.pageSettings,
                enableValueSorting: _this_1.enableValueSorting,
                isDrillThrough: (_this_1.allowDrillThrough || _this_1.editSettings.allowEditing),
                localeObj: _this_1.localeObj,
                fieldsType: _this_1.fieldsType,
                clonedReport: _this_1.clonedReport,
                globalize: _this_1.globalize,
                currenyCode: _this_1.currencyCode,
                enablePaging: _this_1.enablePaging,
                enableVirtualization: _this_1.enableVirtualization,
                allowDataCompression: _this_1.allowDataCompression,
                enableHtmlSanitizer: _this_1.enableHtmlSanitizer,
                enableOptimizedRendering: _this_1.enableVirtualization && _this_1.virtualScrollSettings &&
                    _this_1.virtualScrollSettings.allowSinglePage,
                isTabularLayout: _this_1.isTabular
            };
            if (_this_1.dataType === 'pivot') {
                if (_this_1.dataSourceSettings.groupSettings && _this_1.dataSourceSettings.groupSettings.length > 0) {
                    var dataSet = _this_1.engineModule.data;
                    _this_1.clonedDataSet = (_this_1.clonedDataSet ? _this_1.clonedDataSet : _this_1.dataSourceSettings.type === 'CSV' ? PivotUtil.getClonedCSVData(dataSet)
                        : PivotUtil.getClonedData(dataSet));
                    var dataSourceSettings = JSON.parse(_this_1.getPersistData()).dataSourceSettings;
                    dataSourceSettings.dataSource = [];
                    _this_1.clonedReport = _this_1.clonedReport ? _this_1.clonedReport : dataSourceSettings;
                }
                if (_this_1.dataSourceSettings.mode !== 'Server') {
                    _this_1.engineModule.renderEngine(_this_1.dataSourceSettings, customProperties, _this_1.aggregateCellInfo
                        ? _this_1.getValueCellInfo.bind(_this_1) : undefined, _this_1.onHeadersSort ? _this_1.getHeaderSortInfo.bind(_this_1) : undefined);
                }
                _this_1.allowServerDataBinding = false;
                _this_1.setProperties({ pivotValues: _this_1.engineModule.pivotValues }, true);
                _this_1.allowServerDataBinding = true;
                _this_1.enginePopulatedEventMethod('initEngine');
            }
            else if (_this_1.dataSourceSettings.providerType === 'SSAS' && _this_1.dataType === 'olap') {
                customProperties.savedFieldList = _this_1.olapEngineModule.fieldList;
                customProperties.savedFieldListData = _this_1.olapEngineModule.fieldListData;
                PivotUtil.renderOlapEngine(_this_1, customProperties);
                _this_1.allowServerDataBinding = false;
                _this_1.setProperties({ pivotValues: _this_1.olapEngineModule.pivotValues }, true);
                _this_1.allowServerDataBinding = true;
                _this_1.enginePopulatedEventMethod('initEngine');
            }
        });
    };
    PivotView.prototype.enginePopulatedEventMethod = function (action, control) {
        if (action === 'initEngine') {
            var this$_1 = control ? control : this;
            this.trigger(events.enginePopulated, { pivotValues: this.pivotValues }, function (observedArgs) {
                if (this$_1.dataType === 'olap') {
                    this$_1.olapEngineModule.pivotValues = observedArgs.pivotValues;
                    this$_1.setProperties({ pivotValues: this$_1.olapEngineModule.pivotValues }, true);
                }
                else {
                    this$_1.engineModule.pivotValues = observedArgs.pivotValues;
                    this$_1.setProperties({ pivotValues: this$_1.engineModule.pivotValues }, true);
                }
                this$_1.notify(events.dataReady, {});
                this$_1.notEmpty = true;
            });
        }
        else {
            var pivot_2 = control ? control : this;
            var eventArgs = {
                dataSourceSettings: pivot_2.dataSourceSettings,
                pivotValues: pivot_2.pivotValues
            };
            pivot_2.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                pivot_2.dataSourceSettings = observedArgs.dataSourceSettings;
                if (pivot_2.dataType === 'olap') {
                    pivot_2.olapEngineModule.pivotValues = observedArgs.pivotValues;
                    pivot_2.allowServerDataBinding = false;
                    pivot_2.setProperties({ pivotValues: pivot_2.olapEngineModule.pivotValues }, true);
                    pivot_2.allowServerDataBinding = true;
                }
                else {
                    pivot_2.engineModule.pivotValues = observedArgs.pivotValues;
                    pivot_2.allowServerDataBinding = false;
                    pivot_2.setProperties({ pivotValues: pivot_2.engineModule.pivotValues }, true);
                    pivot_2.allowServerDataBinding = true;
                }
                if (pivot_2.pivotCommon) {
                    pivot_2.pivotCommon.engineModule = pivot_2.dataType === 'olap' ? pivot_2.olapEngineModule : pivot_2.engineModule;
                    pivot_2.pivotCommon.dataSourceSettings = pivot_2.dataSourceSettings;
                }
                pivot_2.renderPivotGrid();
            });
        }
    };
    PivotView.prototype.generateData = function () {
        if (!this.isStaticRefresh) {
            if (this.displayOption.view === 'Chart' || !isNullOrUndefined(this.grid)) {
                this.showWaitingPopup();
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.refreshData.bind(this), 100);
            }
            else {
                this.renderEmptyGrid();
                this.showWaitingPopup();
            }
        }
    };
    /** @hidden */
    PivotView.prototype.refreshData = function () {
        var pivot = this;
        if (!pivot.isStaticRefresh) {
            if (pivot.dataSourceSettings && (pivot.dataSourceSettings.dataSource || pivot.dataSourceSettings.url)) {
                if (pivot.dataSourceSettings.dataSource instanceof DataManager) {
                    if (pivot.dataType === 'pivot' && pivot.remoteData.length > 0) {
                        if (!this.element.querySelector('.e-spinner-pane')) {
                            this.showWaitingPopup();
                        }
                        this.engineModule.data = pivot.remoteData;
                        this.initEngine();
                    }
                    else if (!isNullOrUndefined(pivot.engineModule.data) && pivot.engineModule.data.length === 0) {
                        clearTimeout(this.timeOutObj);
                        this.timeOutObj = setTimeout(pivot.getData.bind(pivot), 100);
                    }
                    else {
                        pivot.initEngine();
                    }
                }
                else if ((this.dataSourceSettings.url !== '' && this.dataType === 'olap') ||
                    (pivot.dataSourceSettings.dataSource && pivot.dataSourceSettings.dataSource.length > 0
                        || (this.engineModule.data && this.engineModule.data.length > 0))) {
                    if (pivot.dataType === 'pivot') {
                        this.hideWaitingPopup();
                        pivot.engineModule.data = pivot.dataSourceSettings.dataSource;
                    }
                    pivot.initEngine();
                }
                else {
                    if (this.dataSourceSettings.mode === 'Server') {
                        this.getEngine('onRefresh');
                    }
                    else {
                        this.notify(events.dataReady, {});
                        this.hideWaitingPopup();
                    }
                }
            }
            else {
                this.notify(events.dataReady, {});
                this.hideWaitingPopup();
            }
        }
        else {
            pivot.isStaticRefresh = false;
            pivot.hideWaitingPopup();
        }
    };
    PivotView.prototype.getValueCellInfo = function (aggregateObj) {
        var args = aggregateObj;
        this.trigger(events.aggregateCellInfo, args);
        return args;
    };
    /**
     *
     * @param {HeadersSortEventArgs} sortingObj - args.
     * @returns {HeadersSortEventArgs}
     * @hidden
     */
    PivotView.prototype.getHeaderSortInfo = function (sortingObj) {
        var args = sortingObj;
        this.trigger(events.onHeadersSort, args);
        return args;
    };
    /**
     * De-Register the internal events.
     *
     * @param {Object} args - args.
     * @returns {void}
     * @hidden
     */
    PivotView.prototype.bindTriggerEvents = function (args) {
        this.trigger(getObject('name', args), args);
    };
    PivotView.prototype.getData = function () {
        if (this.dataSourceSettings.dataSource.defaultQuery) {
            this.dataSourceSettings.dataSource.executeQuery(this.dataSourceSettings.dataSource
                .defaultQuery).then(this.executeQuery.bind(this));
        }
        else {
            this.dataSourceSettings.dataSource.executeQuery(new Query()).then(this.executeQuery.bind(this));
        }
    };
    PivotView.prototype.executeQuery = function (e) {
        if (!this.element.querySelector('.e-spinner-pane')) {
            this.showWaitingPopup();
        }
        var pivot = this;
        pivot.engineModule.data = e.result;
        if (this.isEmptyGrid && !isNullOrUndefined(pivot.engineModule.data) && pivot.engineModule.data.length === 0) {
            this.hideWaitingPopup();
        }
        else if (!isNullOrUndefined(pivot.engineModule.data) && pivot.engineModule.data.length > 0) {
            this.isEmptyGrid = false;
            pivot.initEngine();
        }
        else {
            this.isEmptyGrid = true;
            this.hideWaitingPopup();
            this.renderEmptyGrid();
            this.engineModule.fieldList = null;
            this.engineModule.isEmptyData = true;
            this.pivotValues = [];
            this.engineModule.data = [];
            this.notify(events.dataReady, {});
        }
    };
    /** @hidden */
    PivotView.prototype.applyFormatting = function (pivotValues) {
        if (pivotValues) {
            var colIndex = [];
            for (var len = pivotValues.length, i = 0; i < len; i++) {
                if (pivotValues[i] !== undefined && pivotValues[i][0] === undefined) {
                    colIndex.push(i);
                }
            }
            for (var i = 0; i < pivotValues.length; i++) {
                for (var j = this.isTabular ? (this.engineModule.rowMaxLevel + 1) : 1; (pivotValues[i] &&
                    j < pivotValues[i].length); j++) {
                    if (pivotValues[i][j].axis === 'value' && pivotValues[i][j].formattedText !== '') {
                        pivotValues[i][j].style = undefined;
                        pivotValues[i][j].cssClass = undefined;
                        var format_1 = this.dataSourceSettings.conditionalFormatSettings;
                        for (var k = 0; k < format_1.length; k++) {
                            if ((format_1[k].applyGrandTotals === true || isNullOrUndefined(format_1[k].applyGrandTotals))
                                ? true : !pivotValues[i][j].isGrandSum) {
                                if (this.checkCondition(pivotValues[i][j].value, format_1[k].conditions, format_1[k].value1, format_1[k].value2)) {
                                    // let ilen: number =
                                    //     (this.dataSourceSettings.valueAxis === 'row' ? i : this.engineModule.headerContent.length - 1);
                                    // let jlen: number = (this.dataSourceSettings.valueAxis === 'row' ? 0 : j);
                                    if ((!format_1[k].measure || pivotValues[i][j].actualText ===
                                        format_1[k].measure) &&
                                        (format_1[k].measure === undefined || format_1[k].measure !== '') && (format_1[k].label === undefined ||
                                        format_1[k].label !== '') && ((!format_1[k].label ||
                                        (pivotValues[i][0].valueSort.levelName
                                            .indexOf(format_1[k].label)) > -1) ||
                                        (pivotValues[i][j].rowHeaders
                                            .indexOf(format_1[k].label) > -1) ||
                                        (pivotValues[i][j].columnHeaders
                                            .indexOf(format_1[k].label) > -1))) {
                                        if (format_1[k].style && format_1[k].style.backgroundColor) {
                                            format_1[k].style.backgroundColor = format_1[k].style.backgroundColor.charAt(0) === '#' &&
                                                this.conditionalFormattingModule.isHex(format_1[k].style.backgroundColor.substr(1))
                                                ? format_1[k].style.backgroundColor :
                                                this.conditionalFormattingModule.colourNameToHex(format_1[k].style.backgroundColor);
                                        }
                                        if (format_1[k].style && format_1[k].style.color) {
                                            format_1[k].style.color = format_1[k].style.color.charAt(0) === '#' &&
                                                this.conditionalFormattingModule.isHex(format_1[k].style.color.substr(1)) ?
                                                format_1[k].style.color :
                                                this.conditionalFormattingModule.colourNameToHex(format_1[k].style.color);
                                        }
                                        pivotValues[i][j].style = format_1[k].style;
                                        pivotValues[i][j].cssClass = 'format' + this.element.id + k;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var format = this.dataSourceSettings.conditionalFormatSettings;
            for (var k = 0; k < format.length; k++) {
                var sheet = (this.createStyleSheet.bind(this))();
                var str = 'color: ' + format[k].style.color + '!important;background-color: ' + format[k].style.backgroundColor +
                    '!important;font-size: ' + format[k].style.fontSize + '!important;font-family: ' + format[k].style.fontFamily +
                    ' !important;';
                var formatClass = '.format' + this.element.id + k;
                sheet.insertRule(formatClass + ', ' + formatClass + ' .e-cellvalue' + '{' + str + '}', 0);
            }
        }
    };
    PivotView.prototype.createStyleSheet = function () {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        return style.sheet;
    };
    PivotView.prototype.applyHyperlinkSettings = function () {
        if (this.pivotValues) {
            var pivotValues = this.pivotValues;
            var colIndex = [];
            for (var len = pivotValues.length, i = 0; i < len; i++) {
                if (!isNullOrUndefined(pivotValues[i]) && pivotValues[i][0] === undefined) {
                    colIndex.push(i);
                }
            }
            if (this.hyperlinkSettings.conditionalSettings.length > 0) {
                for (var i = 0; i < pivotValues.length; i++) {
                    for (var j = this.isTabular ? (this.engineModule.rowMaxLevel + 1) : 1; (pivotValues[i] &&
                        j < pivotValues[i].length); j++) {
                        if (pivotValues[i][j].axis === 'value') {
                            pivotValues[i][j].enableHyperlink = false;
                            var collection = this.hyperlinkSettings.conditionalSettings;
                            for (var k = 0; k < collection.length; k++) {
                                if (this.checkCondition(pivotValues[i][j].value, collection[k].conditions, collection[k].value1, collection[k].value2)) {
                                    var ilen = (this.dataSourceSettings.valueAxis === 'row' ?
                                        i : (this.dataType === 'pivot' ?
                                        this.engineModule.headerContent.length - 1 : this.olapEngineModule.headerContent.length - 1));
                                    var jlen = (this.dataSourceSettings.valueAxis === 'row' ? 0 : j);
                                    if ((!collection[k].measure || this.dataSourceSettings.values.length === 1 ||
                                        (pivotValues[ilen][jlen].valueSort &&
                                            (pivotValues[ilen][jlen].actualText ===
                                                collection[k].measure))) && (!collection[k].label ||
                                        ((pivotValues[colIndex[collection[k].label.split('.').length - 1]] &&
                                            pivotValues[colIndex[collection[k].label.split('.').length - 1]][j] &&
                                            pivotValues[colIndex[collection[k].label.split('.').length - 1]][j].valueSort &&
                                            pivotValues[colIndex[collection[k].label.split('.').length - 1]][j].
                                                valueSort[collection[k].label]) || (pivotValues[i][0].
                                            valueSort.levelName.indexOf(collection[k].label) > -1)))) {
                                        pivotValues[i][j].enableHyperlink = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (!isNullOrUndefined(this.hyperlinkSettings.headerText)) {
                var headerDelimiter = this.dataSourceSettings.valueSortSettings.headerDelimiter ? this.dataSourceSettings.valueSortSettings.headerDelimiter : '.';
                for (var i = 0; i < pivotValues.length; i++) {
                    for (var j = this.isTabular ? (this.engineModule.rowMaxLevel + 1) : 1; (pivotValues[i] &&
                        j < pivotValues[i].length); j++) {
                        if (pivotValues[i][j].axis === 'value') {
                            var label = this.hyperlinkSettings.headerText;
                            if (pivotValues[i][0].valueSort.levelName.indexOf(label) > -1) {
                                pivotValues[i][0].enableHyperlink = true;
                                pivotValues[i][j].enableHyperlink = true;
                            }
                            else {
                                var isApplyHyperLink = false;
                                for (var k = 0; k < colIndex.length; k++) {
                                    label = headerDelimiter + this.hyperlinkSettings.headerText;
                                    if ((headerDelimiter + (pivotValues[colIndex[k]][j]).valueSort
                                        .levelName).indexOf(label) > -1) {
                                        pivotValues[colIndex[k]][j].enableHyperlink = true;
                                        isApplyHyperLink = true;
                                    }
                                }
                                pivotValues[i][j].enableHyperlink = isApplyHyperLink;
                            }
                        }
                    }
                }
            }
            else {
                return;
            }
        }
    };
    PivotView.prototype.checkCondition = function (cellValue, conditions, conditionalValue1, conditionalValue2) {
        switch (conditions) {
            case 'LessThan':
                return cellValue < conditionalValue1;
            case 'LessThanOrEqualTo':
                return cellValue <= conditionalValue1;
            case 'GreaterThan':
                return cellValue > conditionalValue1;
            case 'GreaterThanOrEqualTo':
                return cellValue >= conditionalValue1;
            case 'Equals':
                return cellValue === conditionalValue1;
            case 'NotEquals':
                return cellValue !== conditionalValue1;
            case 'Between':
                return (conditionalValue1 < conditionalValue2 && cellValue >= conditionalValue1 && cellValue <= conditionalValue2) ||
                    (conditionalValue1 > conditionalValue2 && cellValue <= conditionalValue1 && cellValue >= conditionalValue2);
            case 'NotBetween':
                return !((conditionalValue1 < conditionalValue2 && cellValue >= conditionalValue1 && cellValue <= conditionalValue2) ||
                    (conditionalValue1 > conditionalValue2 && cellValue <= conditionalValue1 && cellValue >= conditionalValue2));
            default:
                return false;
        }
    };
    /** @hidden */
    PivotView.prototype.updateGroupingReport = function (newGroupSettings, updateGroupType) {
        if (!this.clonedDataSet && !this.clonedReport) {
            var dataSet = this.engineModule.data;
            this.clonedDataSet = this.dataSourceSettings.type === 'CSV' ? PivotUtil.getClonedCSVData(dataSet) : PivotUtil.getClonedData(dataSet);
            var dataSourceSettings = JSON.parse(this.getPersistData()).dataSourceSettings;
            dataSourceSettings.dataSource = [];
            this.clonedReport = this.clonedReport ? this.clonedReport : dataSourceSettings;
        }
        var dateGroup = /_date_group_years|_date_group_quarters|_date_group_quarterYear|_date_group_months|_date_group_days|_date_group_hours|_date_group_minutes|_date_group_seconds/g;
        var data = this.dataSourceSettings.type === 'CSV' ? PivotUtil.getClonedCSVData(this.clonedDataSet) : PivotUtil.getClonedData(this.clonedDataSet);
        var dataSource = this.dataSourceSettings;
        var clonedReport = this.clonedReport.properties ?
            this.clonedReport.properties : this.clonedReport;
        var axisFields = [dataSource.rows, dataSource.columns, dataSource.values, dataSource.filters];
        var fieldSettings = [dataSource.filterSettings, dataSource.sortSettings, dataSource.formatSettings, dataSource.drilledMembers];
        var clonedAxisFields = clonedReport.rows;
        clonedAxisFields = clonedAxisFields.concat(clonedReport.columns, clonedReport.values, clonedReport.filters);
        if (newGroupSettings.length === 0 || newGroupSettings.length > 0) {
            this.engineModule.groupingFields = {};
            this.setProperties({ dataSourceSettings: { dataSource: data, groupSettings: newGroupSettings.length > 0
                        ? dataSource.groupSettings : [] } }, true);
            var isDateGroupUpdated = updateGroupType === 'Date';
            var fields = [];
            var newFieldName_1;
            for (var i = 0, cnt = axisFields.length; i < cnt; i++) {
                var _loop_1 = function (j, len) {
                    var fieldName = axisFields[i][j].name;
                    if (fields.indexOf(fieldName) === -1) {
                        fields.push(fieldName);
                    }
                    var index = fields.indexOf(fieldName);
                    if ((!isNullOrUndefined(fieldName.match(dateGroup)) &&
                        isDateGroupUpdated) || (fieldName.indexOf('_custom_group') !== -1 &&
                        !PivotUtil.getFieldByName(fieldName.replace('_custom_group', ''), dataSource.groupSettings))) {
                        axisFields[i].splice(j, 1);
                        fields.splice(index, 1);
                        j--;
                        len--;
                        fieldName = fieldName.split('_')[0];
                        var isSameField = false;
                        for (var i_1 = 0; i_1 < axisFields.length; i_1++) {
                            isSameField = axisFields[i_1].filter(function (x) { return x.name === fieldName; }).length > 0 ?
                                true : false;
                            if (isSameField) {
                                break;
                            }
                        }
                        if (!isSameField) {
                            newFieldName_1 = fieldName.split('_')[0];
                            var fieldObj = PivotUtil.getFieldByName(newFieldName_1, clonedAxisFields);
                            clonedAxisFields = clonedAxisFields.filter(function (x) { return x.name !== newFieldName_1; });
                            fields.push(newFieldName_1);
                            if (fieldObj) {
                                if (!isSameField) {
                                    axisFields[i].splice(++j, 0, fieldObj);
                                }
                                else {
                                    axisFields[i].splice(j, 1, fieldObj);
                                }
                            }
                        }
                    }
                    else {
                        var fieldObj = PivotUtil.getFieldByName(fieldName, clonedAxisFields);
                        if (fieldObj) {
                            axisFields[i].splice(j, 1, fieldObj);
                        }
                        else if (newFieldName_1 === fieldName) {
                            axisFields[i].splice(j, 1);
                        }
                    }
                    out_j_1 = j;
                    out_len_1 = len;
                };
                var out_j_1, out_len_1;
                for (var j = 0, len = axisFields[i].length; j < len; j++) {
                    _loop_1(j, len);
                    j = out_j_1;
                    len = out_len_1;
                }
            }
            for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                var fieldName = fields_2[_i];
                var filterObj = PivotUtil.getFilterItemByName(fieldName, clonedReport.filterSettings);
                var sortObj = PivotUtil.getFieldByName(fieldName, clonedReport.sortSettings);
                var formatObj = PivotUtil.getFieldByName(fieldName, clonedReport.formatSettings);
                var drillObj = PivotUtil.getFieldByName(fieldName, clonedReport.drilledMembers);
                var settingsObj = [filterObj, sortObj, formatObj, drillObj];
                for (var i = 0, cnt = fieldSettings.length; i < cnt; i++) {
                    var isExists = false;
                    for (var j = 0, len = fieldSettings[i].length; j < len; j++) {
                        var name_1 = fieldSettings[i][j].name;
                        if ((!isNullOrUndefined(name_1.match(dateGroup)) && isDateGroupUpdated) || (name_1.indexOf('_custom_group') !== -1 &&
                            !PivotUtil.getFieldByName(name_1.replace('_custom_group', ''), dataSource.groupSettings))) {
                            fieldSettings[i].splice(j, 1);
                            j--;
                            len--;
                        }
                        else if (fieldName === fieldSettings[i][j].name) {
                            isExists = true;
                            if (settingsObj[i]) {
                                fieldSettings[i].splice(j, 1, settingsObj[i]);
                            }
                            else {
                                fieldSettings[i].splice(j, 1);
                                j--;
                                len--;
                            }
                            break;
                        }
                    }
                    if (!isExists && i === 0 && filterObj) {
                        fieldSettings[i].push(filterObj);
                    }
                    if (!isExists && i === 1 && sortObj) {
                        fieldSettings[i].push(sortObj);
                    }
                    if (!isExists && i === 2 && formatObj) {
                        fieldSettings[i].push(formatObj);
                    }
                    if (!isExists && i === 3 && drillObj) {
                        fieldSettings[i].push(drillObj);
                    }
                }
            }
        }
    };
    PivotView.prototype.removeButtonFocus = function () {
        if (document.querySelectorAll('.e-btn-focused')) {
            removeClass(document.querySelectorAll('.e-btn-focused'), 'e-btn-focused');
        }
    };
    PivotView.prototype.wireEvents = function () {
        var enableOptimizedRendering = this.virtualScrollSettings && this.virtualScrollSettings.allowSinglePage && this.dataType === 'pivot';
        if (this.displayOption.view !== 'Chart') {
            EventHandler.add(this.element, this.isAdaptive ? 'touchend' : 'click', this.mouseClickHandler, this);
            EventHandler.add(this.element, 'mousedown', this.mouseDownHandler, this);
            EventHandler.add(this.element.querySelector('.' + cls.GRID_HEADER), 'mousemove', this.mouseMoveHandler, this);
            EventHandler.add(this.element, 'mouseup', this.mouseUpHandler, this);
            EventHandler.add(this.element, this.isAdaptive ? 'touchend' : 'contextmenu', this.mouseRclickHandler, this);
            if (this.virtualscrollModule && this.enableVirtualization && !enableOptimizedRendering) {
                EventHandler.add(this.element.querySelector('.' + cls.GRID_CONTENT).querySelector('.' + cls.CONTENT_CLASS), 'scroll', this.headerScrollUpdate, this);
            }
        }
        EventHandler.add(document, this.isAdaptive ? 'touchend' : 'click', this.removeButtonFocus, this);
        window.addEventListener('resize', this.onWindowResize.bind(this), true);
    };
    PivotView.prototype.headerScrollUpdate = function () {
        if (this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).scrollLeft !== this.element.querySelector('.' + cls.GRID_CONTENT).querySelector('.' + cls.CONTENT_CLASS).scrollLeft) {
            this.virtualscrollModule.direction = 'horizondal';
        }
        this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).scrollLeft = this.element.querySelector('.' + cls.GRID_CONTENT).querySelector('.' + cls.CONTENT_CLASS).scrollLeft;
    };
    PivotView.prototype.unwireEvents = function () {
        if (this.displayOption.view !== 'Chart') {
            EventHandler.remove(this.element, this.isAdaptive ? 'touchend' : 'click', this.mouseClickHandler);
            EventHandler.remove(this.element, 'mousedown', this.mouseDownHandler);
            if (this.element.querySelector('.' + cls.GRID_HEADER)) {
                EventHandler.remove(this.element.querySelector('.' + cls.GRID_HEADER), 'mousemove', this.mouseMoveHandler);
            }
            EventHandler.remove(this.element, 'mouseup', this.mouseUpHandler);
            EventHandler.remove(this.element, this.isAdaptive ? 'touchend' : 'contextmenu', this.mouseRclickHandler);
            if (this.virtualscrollModule && this.enableVirtualization && this.element.querySelector('.' + cls.GRID_CONTENT)) {
                EventHandler.remove(this.element.querySelector('.' + cls.GRID_CONTENT).querySelector('.' + cls.CONTENT_CLASS), 'scroll', this.headerScrollUpdate);
            }
        }
        EventHandler.remove(document, this.isAdaptive ? 'touchend' : 'click', this.removeButtonFocus);
        window.removeEventListener('resize', this.onWindowResize.bind(this), true);
    };
    /** @hidden */
    PivotView.prototype.actionBeginMethod = function () {
        var eventArgs = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings),
            actionName: this.actionObj.actionName,
            fieldInfo: this.actionObj.fieldInfo,
            cancel: false
        };
        this.trigger(events.actionBegin, eventArgs);
        return eventArgs.cancel;
    };
    /** @hidden */
    PivotView.prototype.actionCompleteMethod = function () {
        var eventArgs = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings),
            actionName: this.actionObj.actionName,
            fieldInfo: this.actionObj.fieldInfo,
            actionInfo: this.actionObj.actionInfo
        };
        this.trigger(events.actionComplete, eventArgs);
        this.actionObj.actionName = '';
        this.actionObj.actionInfo = undefined;
        this.actionObj.fieldInfo = undefined;
    };
    /** @hidden */
    PivotView.prototype.actionFailureMethod = function (error) {
        var eventArgs = {
            actionName: this.actionObj.actionName,
            errorInfo: error
        };
        this.trigger(events.actionFailure, eventArgs);
    };
    /** @hidden */
    PivotView.prototype.getActionCompleteName = function () {
        var actionName;
        switch (this.actionObj.actionName) {
            case events.openConditionalFormatting:
                actionName = events.conditionallyFormatted;
                break;
            case events.conditionalFormattingMenu:
                actionName = events.conditionallyFormatted;
                break;
            case events.openNumberFormatting:
                actionName = events.numberFormatted;
                break;
            case events.numberFormattingMenu:
                actionName = events.numberFormatted;
                break;
            case events.tableView:
                actionName = events.tableViewed;
                break;
            case events.chartView:
                actionName = events.chartViewed;
                break;
            case events.hideSubTotals:
                actionName = events.subTotalsHidden;
                break;
            case events.subTotalsRow:
                actionName = events.subTotalsRowShown;
                break;
            case events.subTotalsColumn:
                actionName = events.subTotalsColumnShown;
                break;
            case events.showSubTotals:
                actionName = events.subTotalsShown;
                break;
            case events.hideGrandTotals:
                actionName = events.grandTotalsHidden;
                break;
            case events.grandTotalsRow:
                actionName = events.grandTotalsRowShown;
                break;
            case events.grandTotalsColumn:
                actionName = events.grandTotalsColumnShown;
                break;
            case events.showGrandTotals:
                actionName = events.grandTotalsShown;
                break;
            case events.sortValue:
                actionName = events.valueSorted;
                break;
            case events.openCalculatedField:
                actionName = events.calculatedFieldApplied;
                break;
            case events.editCalculatedField:
                actionName = events.calculatedFieldEdited;
                break;
            case events.sortField:
                actionName = events.fieldSorted;
                break;
            case events.filterField:
                actionName = events.fieldFiltered;
                break;
            case events.removeField:
                actionName = events.fieldRemoved;
                break;
            case events.aggregateField:
                actionName = events.fieldAggregated;
                break;
            case events.editRecord:
                actionName = events.recordEdited;
                break;
            case events.reportChange:
                actionName = events.reportChanged;
                break;
            case events.saveEditedRecords:
                actionName = events.editedRecordsSaved;
                break;
            case events.addNewRecord:
                actionName = events.newRecordAdded;
                break;
            case events.removeRecord:
                actionName = events.recordRemoved;
                break;
            case events.pngExport:
                actionName = events.pngExported;
                break;
            case events.jpegExport:
                actionName = events.jpegExported;
                break;
            case events.svgExport:
                actionName = events.svgExported;
                break;
            case events.pdfExport:
                actionName = events.pdfExported;
                break;
            case events.csvExport:
                actionName = events.csvExported;
                break;
            case events.excelExport:
                actionName = events.excelExported;
                break;
            case events.windowResize:
                actionName = events.windowResized;
                break;
            case events.saveCurrentReport:
                actionName = events.reportSaved;
                break;
            case events.addNewReport:
                actionName = events.newReportAdded;
                break;
            case events.saveAsCurrentReport:
                actionName = events.reportReSaved;
                break;
            case events.renameCurrentReport:
                actionName = events.reportRenamed;
                break;
            case events.horizontalScroll:
                actionName = events.horizontalScrolled;
                break;
            case events.verticalScroll:
                actionName = events.verticalScrolled;
                break;
            case events.rowPageNavigation:
                actionName = events.rowPageNavigated;
                break;
            case events.columnPageNavigation:
                actionName = events.columnPageNavigated;
                break;
            default:
                actionName = this.actionObj.actionName;
        }
        return actionName;
    };
    /** @hidden */
    PivotView.prototype.getStackedColumns = function (gridcolumns, stackedColumns) {
        for (var _i = 0, gridcolumns_4 = gridcolumns; _i < gridcolumns_4.length; _i++) {
            var column = gridcolumns_4[_i];
            stackedColumns.push(column);
            if (column.columns && column.columns.length > 0) {
                this.getStackedColumns(column.columns, stackedColumns);
            }
        }
        return stackedColumns;
    };
    /**
     * To destroy the PivotView elements.
     *
     * @returns {void}
     */
    PivotView.prototype.destroy = function () {
        this.removeInternalEvents();
        if (this.engineModule) {
            this.engineModule.fieldList = {};
            this.engineModule.rMembers = null;
            this.engineModule.cMembers = null;
            this.engineModule.valueMatrix = [];
            this.engineModule = {};
        }
        if (this.olapEngineModule) {
            this.olapEngineModule.fieldList = {};
            this.olapEngineModule = {};
        }
        if (this.showGroupingBar && this.groupingBarModule) {
            this.groupingBarModule.destroy();
        }
        if (this.allowGrouping && this.groupingModule) {
            this.groupingModule.destroy();
        }
        if (this.showToolbar && this.toolbarModule) {
            this.toolbarModule.destroy();
        }
        if (this.enablePaging && this.pagerModule) {
            this.pagerModule.destroy();
        }
        if (this.enableVirtualization && this.virtualscrollModule) {
            this.virtualscrollModule.destroy();
        }
        if (this.allowConditionalFormatting && this.conditionalFormattingModule) {
            this.conditionalFormattingModule.destroy();
        }
        if (this.allowNumberFormatting && this.numberFormattingModule) {
            this.numberFormattingModule.destroy();
        }
        if (this.contextMenuModule) {
            this.contextMenuModule.destroy();
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
        if (this.tooltip && !this.tooltip.isDestroyed) {
            this.tooltip.destroy();
        }
        if (this.calculatedFieldModule) {
            this.calculatedFieldModule.destroy();
        }
        if (this.chart && !this.chart.isDestroyed) {
            this.chart.destroy();
            if (this.chart.isDestroyed && select('#' + this.element.id + '_chart', this.element)) {
                remove(select('#' + this.element.id + '_chart', this.element));
            }
        }
        if (this.grid && !this.grid.isDestroyed) {
            this.grid.destroy();
            if (this.grid.isDestroyed && select('#' + this.element.id + '_grid', this.element)) {
                remove(select('#' + this.element.id + '_grid', this.element));
            }
        }
        if (this.commonModule) {
            this.commonModule.destroy();
        }
        if (this.pivotChartModule) {
            this.pivotChartModule.destroy();
        }
        if (this.pivotButtonModule && !this.pivotButtonModule.isDestroyed) {
            this.pivotButtonModule.destroy();
        }
        if (this.pivotFieldListModule && !this.pivotFieldListModule.isDestroyed) {
            this.pivotFieldListModule.destroy();
            if (this.pivotFieldListModule.isDestroyed && select('#' + this.element.id + '_PivotFieldList', this.element) !== null) {
                remove(select('#' + this.element.id + '_PivotFieldList', this.element));
            }
        }
        if ((this.allowDrillThrough || (this.editSettings && this.editSettings.allowEditing)) && this.drillThroughModule) {
            this.drillThroughModule.destroy();
        }
        if (this.chartExportModule) {
            this.chartExportModule.destroy();
        }
        this.unwireEvents();
        _super.prototype.destroy.call(this);
        if (this.groupingBarModule) {
            this.groupingBarModule = null;
        }
        if (this.groupingModule) {
            this.groupingModule = null;
        }
        if (this.pivotFieldListModule) {
            this.pivotFieldListModule = null;
        }
        if (this.calculatedFieldModule) {
            this.calculatedFieldModule = null;
        }
        if (this.conditionalFormattingModule) {
            this.conditionalFormattingModule = null;
        }
        if (this.numberFormattingModule) {
            this.numberFormattingModule = null;
        }
        if (this.toolbarModule) {
            this.toolbarModule = null;
        }
        if (this.pagerModule) {
            this.pagerModule = null;
        }
        if (this.virtualscrollModule) {
            this.virtualscrollModule = null;
        }
        if (this.contextMenuModule) {
            this.contextMenuModule = null;
        }
        if (this.keyboardModule) {
            this.keyboardModule = null;
        }
        if (this.tooltip) {
            this.tooltip = null;
        }
        if (this.chart) {
            this.chart = null;
        }
        if (this.grid) {
            this.grid = null;
        }
        if (this.commonModule) {
            this.commonModule = null;
        }
        if (this.pivotChartModule) {
            this.pivotChartModule = null;
        }
        if (this.pivotButtonModule) {
            this.pivotButtonModule = null;
        }
        if (this.renderModule) {
            this.renderModule = null;
        }
        if (this.axisFieldModule) {
            this.axisFieldModule = null;
        }
        if (this.pdfExportModule) {
            this.pdfExportModule = null;
        }
        if (this.excelExportModule) {
            this.excelExportModule = null;
        }
        if (this.drillThroughModule) {
            this.drillThroughModule = null;
        }
        if (this.clonedDataSet) {
            this.clonedDataSet = null;
        }
        if (this.clonedReport) {
            this.clonedReport = null;
        }
        if (this.pagerModule) {
            this.pagerModule = null;
        }
        if (this.chartExportModule) {
            this.chartExportModule = null;
        }
        if (this.exportSpecifiedPages) {
            this.exportSpecifiedPages = undefined;
        }
        this.element.innerHTML = '';
        removeClass([this.element], cls.ROOT);
        removeClass([this.element], cls.RTL);
        removeClass([this.element], cls.DEVICE);
        this.globalize = null;
        this.localeObj = null;
        this.currentView = null;
        this.fieldListSpinnerElement = null;
        this.lastSortInfo = null;
        this.lastFilterInfo = null;
        this.lastAggregationInfo = null;
        this.lastCalcFieldInfo = null;
        this.lastCellClicked = null;
        this.lastColumn = null;
        this.pivotCommon = null;
    };
    /**
     * Method to open the number formatting dialog to set the format dynamically.
     *
     * @returns {void}
     */
    PivotView.prototype.showNumberFormattingDialog = function () {
        if (this.allowNumberFormatting) {
            this.numberFormattingModule.showNumberFormattingDialog();
        }
    };
    /** @hidden */
    PivotView.prototype.getValuesHeader = function (pivotCell, type) {
        var values = this.dataSourceSettings.values;
        if (type === 'value' && !isNullOrUndefined(pivotCell.valueSort) && (this.localeObj.getConstant('grandTotal') + this.dataSourceSettings.valueSortSettings.headerDelimiter + pivotCell.formattedText)
            === pivotCell.valueSort.levelName && ((pivotCell.axis === 'column' && this.dataSourceSettings.columns.length === 0 && this.dataSourceSettings.valueAxis === 'column') || (pivotCell.axis === 'row' &&
            this.dataSourceSettings.rows.length === 0 && this.dataSourceSettings.valueAxis === 'row'))) {
            return this.localeObj.getConstant('total') + ' ' + this.localeObj.getConstant(this.engineModule.fieldList[pivotCell.actualText].aggregateType) + ' ' +
                this.localeObj.getConstant('of') + ' ' + pivotCell.formattedText;
        }
        else if (type === 'grandTotal' && values.length === 1 && this.dataSourceSettings.valueAxis === 'row' && pivotCell.formattedText === this.localeObj.getConstant('grandTotal')) {
            return this.localeObj.getConstant('total') + ' ' + this.localeObj.getConstant(values[values.length - 1].type) + ' ' +
                this.localeObj.getConstant('of') + ' ' + (!isNullOrUndefined(values[values.length - 1].caption) ? values[values.length - 1].caption
                : values[values.length - 1].name);
        }
        return pivotCell.formattedText;
    };
    PivotView.prototype.setColumnWidth = function (column, width) {
        if (!column.autoFit) {
            if (column.width !== 'auto') {
                column.width = (this.renderModule.lastColumn && column.field === this.renderModule.lastColumn.field) ?
                    (width - 3) : width;
            }
            else {
                column.minWidth = width;
            }
        }
    };
    __decorate([
        Property('USD')
    ], PivotView.prototype, "currencyCode", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showFieldList", void 0);
    __decorate([
        Complex({}, GridSettings)
    ], PivotView.prototype, "gridSettings", void 0);
    __decorate([
        Complex({}, ChartSettings)
    ], PivotView.prototype, "chartSettings", void 0);
    __decorate([
        Complex({}, GroupingBarSettings)
    ], PivotView.prototype, "groupingBarSettings", void 0);
    __decorate([
        Complex({}, HyperlinkSettings)
    ], PivotView.prototype, "hyperlinkSettings", void 0);
    __decorate([
        Complex({}, PageSettings)
    ], PivotView.prototype, "pageSettings", void 0);
    __decorate([
        Complex({}, PagerSettings)
    ], PivotView.prototype, "pagerSettings", void 0);
    __decorate([
        Complex({}, DataSourceSettings)
    ], PivotView.prototype, "dataSourceSettings", void 0);
    __decorate([
        Complex({}, CellEditSettings)
    ], PivotView.prototype, "editSettings", void 0);
    __decorate([
        Complex({}, DisplayOption)
    ], PivotView.prototype, "displayOption", void 0);
    __decorate([
        Complex({}, VirtualScrollSettings)
    ], PivotView.prototype, "virtualScrollSettings", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "pivotValues", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showGroupingBar", void 0);
    __decorate([
        Property(true)
    ], PivotView.prototype, "showTooltip", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showToolbar", void 0);
    __decorate([
        Property([])
    ], PivotView.prototype, "toolbar", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showValuesButton", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowCalculatedField", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enableFieldSearching", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enableValueSorting", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowConditionalFormatting", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowNumberFormatting", void 0);
    __decorate([
        Property('auto')
    ], PivotView.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], PivotView.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowExcelExport", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enablePaging", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowDrillThrough", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowPdfExport", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowDeferLayoutUpdate", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowDataCompression", void 0);
    __decorate([
        Property(1000)
    ], PivotView.prototype, "maxNodeLimitInMemberEditor", void 0);
    __decorate([
        Property(10000)
    ], PivotView.prototype, "maxRowsInDrillThrough", void 0);
    __decorate([
        Property(true)
    ], PivotView.prototype, "loadOnDemandInMemberEditor", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "cellTemplate", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "toolbarTemplate", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "tooltipTemplate", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "spinnerTemplate", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowGrouping", void 0);
    __decorate([
        Property(true)
    ], PivotView.prototype, "exportAllPages", void 0);
    __decorate([
        Property(['Sum', 'Count', 'DistinctCount', 'Product', 'Min', 'Max', 'Avg', 'Median', 'Index', 'PopulationVar', 'SampleVar', 'PopulationStDev', 'SampleStDev', 'RunningTotals', 'PercentageOfGrandTotal', 'PercentageOfColumnTotal', 'PercentageOfRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentRowTotal', 'DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentTotal'])
    ], PivotView.prototype, "aggregateTypes", void 0);
    __decorate([
        Property(['Column', 'Bar', 'Line', 'Area', 'Scatter', 'Polar', 'StackingColumn', 'StackingArea', 'StackingBar', 'StackingLine', 'StepLine', 'StepArea', 'SplineArea', 'Spline', 'StackingColumn100', 'StackingBar100', 'StackingArea100', 'StackingLine100', 'Bubble', 'Pareto', 'Radar', 'Pie', 'Doughnut', 'Funnel', 'Pyramid'])
    ], PivotView.prototype, "chartTypes", void 0);
    __decorate([
        Property('')
    ], PivotView.prototype, "cssClass", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "queryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "headerCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "pdfHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "pdfQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "excelHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "excelQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "columnDragStart", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "columnDrag", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "columnDrop", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforePdfExport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeExcelExport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeColumnsRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "selected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "selecting", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellDeselected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "rowSelected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "rowDeselected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartTooltipRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartLegendClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartMouseMove", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartMouseClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "pointMove", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartMouseLeave", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartMouseDown", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartMouseUp", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "dragComplete", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "zoomComplete", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "scrollStart", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "scrollEnd", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "scrollChanged", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "multiLevelLabelRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartLoaded", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartLoad", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartResized", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartAxisLabelRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "multiLevelLabelClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartPointClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "onPdfCellRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "saveReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fetchReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "loadReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "renameReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "removeReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "newReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "toolbarRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "load", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "enginePopulating", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "enginePopulated", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "onFieldDropped", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fieldDrop", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fieldDragStart", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "created", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeExport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "exportComplete", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "conditionalFormatting", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "memberFiltering", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "drillThrough", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "editCompleted", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beginDrillThrough", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "hyperlinkCellClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellSelecting", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "drill", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellSelected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartSeriesCreated", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "aggregateCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fieldListRefreshed", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "memberEditorOpen", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "calculatedFieldCreate", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "numberFormatting", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "aggregateMenuOpen", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fieldRemove", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeServiceInvoke", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "afterServiceInvoke", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "onHeadersSort", void 0);
    PivotView = __decorate([
        NotifyPropertyChanges
    ], PivotView);
    return PivotView;
}(Component));
export { PivotView };
