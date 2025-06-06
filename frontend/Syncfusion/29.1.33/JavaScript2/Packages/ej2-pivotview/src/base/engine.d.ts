import { Internationalization, NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { Sorting, SummaryTypes, FilterType, Operators, Condition, RenderMode } from './types';
import { DateGroup, GroupType, ProviderType, DataSourceType } from './types';
import { HeaderCollection, GrandTotalsPosition, SubTotalsPosition } from '../common';
/**
 * PivotEngine is used to manipulate the relational or Multi-Dimensional data as pivoting values.
 */
/** @hidden */
export declare class PivotEngine {
    /** @hidden */
    globalize: Internationalization;
    /** @hidden */
    fieldList: IFieldListOptions;
    /** @hidden */
    pivotValues: IAxisSet[][];
    /** @hidden */
    aggregatedValueMatrix: IMatrix2D;
    /** @hidden */
    headerContent: IGridValues;
    /** @hidden */
    valueContent: IGridValues;
    /** @hidden */
    fields: string[];
    /** @hidden */
    isMultiMeasures: boolean;
    /** @hidden */
    drilledMembers: IDrillOptions[];
    /** @hidden */
    isExpandAll: boolean;
    /** @hidden */
    enableSort: boolean;
    /** @hidden */
    pageSettings: IPageSettings;
    /** @hidden */
    filterMembers: number[];
    /** @hidden */
    formatFields: {
        [key: string]: IFormatSettings;
    };
    /** @hidden */
    groupingFieldsInfo: {
        [key: string]: string;
    };
    /** @hidden */
    dateFormatFunction: {
        [key: string]: {
            exactFormat: Function;
            fullFormat: Function;
        };
    };
    /** @hidden */
    calculatedFields: {
        [key: string]: ICalculatedFields;
    };
    /** @hidden */
    calculatedFormulas: {
        [key: string]: Object;
    };
    /** @hidden */
    valueSortSettings: IValueSortSettings;
    /** @hidden */
    rowIndex: number[];
    /** @hidden */
    isEngineUpdated: boolean;
    /** @hidden */
    savedFieldList: IFieldListOptions;
    /** @hidden */
    valueAxis: number;
    /** @hidden */
    saveDataHeaders: {
        [key: string]: IAxisSet[];
    };
    /** @hidden */
    columnCount: number;
    /** @hidden */
    rowCount: number;
    /** @hidden */
    columnPageCount: number;
    /** @hidden */
    rowPageCount: number;
    /** @hidden */
    colFirstLvl: number;
    /** @hidden */
    rowFirstLvl: number;
    /** @hidden */
    rowStartPos: number;
    /** @hidden */
    colStartPos: number;
    /** @hidden */
    enableValueSorting: boolean;
    /** @hidden */
    headerCollection: HeaderCollection;
    /** @hidden */
    isValueFilterEnabled: boolean;
    /** @hidden */
    isEmptyData: boolean;
    /** @hidden */
    emptyCellTextContent: string;
    /** @hidden */
    isHeaderAvail: boolean;
    /** @hidden */
    isDrillThrough: boolean;
    /** @hidden */
    rMembers: IAxisSet[];
    /** @hidden */
    cMembers: IAxisSet[];
    /** @hidden */
    groupingFields: {
        [key: string]: string;
    };
    /** @hidden */
    isLastHeaderHasMeasures: boolean;
    /** @hidden */
    measureIndex: number;
    /** @hidden */
    isPagingOrVirtualizationEnabled: boolean;
    /** @hidden */
    rowMaxLevel: number;
    valueMatrix: ValueMatrixInfo[][];
    private reportDataType;
    private allowValueFilter;
    private isValueFiltered;
    private isValueFiltersAvail;
    private valueSortData;
    private valueFilteredData;
    private filterFramedHeaders;
    private memberCnt;
    private pageInLimit;
    private endPos;
    private removeCount;
    private colHdrBufferCalculated;
    private colValuesLength;
    private rowValuesLength;
    private slicedHeaders;
    private fieldFilterMem;
    private filterPosObj;
    private selectedHeaders;
    private rowGrandTotal;
    private columnGrandTotal;
    private removeRowGrandTotal;
    private removeColumnGrandTotal;
    private isValueHasAdvancedAggregate;
    private rawIndexObject;
    private valueSortHeaderText;
    private showSubTotalsAtTop;
    private showSubTotalsAtBottom;
    private reformAxisCount;
    private isEditing;
    /** @hidden */
    valueAxisFields: IValueFields;
    /** @hidden */
    data: IDataSet[] | string[][];
    /** @hidden */
    actualData: IDataSet[] | string[][];
    /** @hidden */
    groupRawIndex: {
        [key: number]: number[];
    };
    /** @hidden */
    fieldKeys: IDataSet;
    private allowDataCompression;
    private dataSourceSettings;
    private frameHeaderObjectsCollection;
    private headerObjectsCollection;
    private localeObj;
    private getValueCellInfo;
    private getHeaderSortInfo;
    private fieldsType;
    private columnKeys;
    private fieldDrillCollection;
    private formatRegex;
    private clonedReport;
    private measureNames;
    private currencyCode;
    private enablePaging;
    private enableVirtualization;
    private enableHtmlSanitizer;
    private enableOptimizedRendering;
    private groupedDataType;
    private customProperties;
    private emptyRowsLength;
    private tabularPivotValues;
    /**
     * It is used to clear properties.
     *
     * @param {boolean} isExport - It indicates whether it is triggered after the export or not.
     * @returns {void}
     * @hidden
     */
    clearProperties(isExport?: boolean): void;
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
    renderEngine(dataSource?: IDataOptions, customProperties?: ICustomProperties, fn?: Function, onHeadersSort?: Function): void;
    private removeIrrelevantFields;
    private updateDataSourceSettings;
    private getGroupedRawData;
    private getGroupData;
    private countDecimalPlaces;
    private processGrouping;
    private getNumberGroupHeaders;
    private getRange;
    private getPercentFormat;
    private getFormattedFields;
    /**
     * It is used to update the format fields.
     *
     * @param {IFormatSettings[]} formatSettings -  It contains the format settings.
     * @returns {Object} - An object mapping keys to format settings.
     * @hidden
     */
    setFormattedFields(formatSettings: IFormatSettings[]): {
        [key: string]: IFormatSettings;
    };
    private getFieldList;
    private updateMembersOrder;
    private getMappingField;
    private updateFieldList;
    private updateTreeViewData;
    private getCalculatedField;
    private validateFilters;
    private validateValueFields;
    /**
     * It is used to update the current field members.
     *
     * @param {string} fieldName -  Current field Name.
     * @returns {void}
     * @hidden
     */
    fetchFieldMembers(fieldName: string): void;
    private generateMembers;
    private fillFieldMembers;
    private generateValueMatrix;
    private updateSortSettings;
    private updateFilterMembers;
    private getFilters;
    private isValidFilterField;
    private applyLabelFilter;
    private getLabelFilterMembers;
    private getDateFilterMembers;
    private validateFilterValue;
    private frameFilterList;
    private updateFilter;
    private applyValueFiltering;
    private getFilteredData;
    private getParsedValue;
    private removefilteredData;
    private validateFilteredParentData;
    private updateFramedHeaders;
    private validateFilteredHeaders;
    private isEmptyDataAvail;
    /**
     * It is used to update the grid data.
     *
     * @param {IDataOptions} dataSource -  It contains the dataSourceSettings.
     * @returns {void}
     * @hidden
     */
    updateGridData(dataSource: IDataOptions): void;
    generateGridData(dataSource: IDataOptions, requireDatasourceUpdate?: boolean, isExport?: boolean, headerCollection?: HeaderCollection): void;
    private updateHeaders;
    private updatePivotValues;
    /**
     * It performs the updateing Engine by the drilled item.
     *
     * @param {IDrilledItem} drilledItem -  It cotains the drilled items.
     * @returns {void}
     * @hidden
     */
    onDrill(drilledItem: IDrilledItem): void;
    /**
     * It performs to update the engine by sorting data.
     *
     * @param {ISort} sortItem - It cotains the drilled item data.
     * @param {IDataOptions} dataSource - It contains dataSource.
     * @returns {void}
     * @hidden
     */
    onSort(sortItem: ISort, dataSource?: IDataOptions): void;
    /**
     * It performs to update the engine by filtering data.
     *
     * @param {IFilter} filterItem - It contains the value of filter Item.
     * @param {IDataOptions} dataSource - It contains dataSource.
     * @returns {void}
     * @hidden
     */
    onFilter(filterItem: IFilter, dataSource: IDataOptions): void;
    /**
     * It performs to update the engine by the aggregation.
     *
     * @param {IFieldOptions} field -  It cotains the field data.
     * @param {IDataOptions} dataSource - It contains dataSource.
     * @returns {void}
     * @hidden
     */
    onAggregation(field: IFieldOptions, dataSource?: IDataOptions): void;
    /**
     * It performs to update the engine by the calculated field operation.
     *
     * @param {ICalculatedFields} field -  It cotains the Calculated Fields.
     * @param {IDataOptions} dataSourceSettings -  It cotains the dataSourceSettings.
     * @returns {void}
     * @hidden
     */
    onCalcOperation(field: ICalculatedFields, dataSourceSettings: IDataOptions): void;
    private performDrillOperation;
    private performSortOperation;
    private performFilterDeletion;
    private matchIndexes;
    private performFilterAddition;
    private performFilterCommonUpdate;
    private getHeadersInfo;
    /**
     * It performs the updating engine.
     *
     * @returns {void}
     * @hidden
     */
    updateEngine(): void;
    private getAxisByFieldName;
    private getFieldByName;
    private updateHeadersCount;
    /**
     * It performs to retrieve the sorted headers.
     *
     * @param {IAxisSet[]} headers - It cotains the headers data.
     * @param {string} sortOrder -  It cotains the ortOrder data
     * @returns {IAxisSet[]} - return sorted headers as IAxisSet[].
     * @hidden
     */
    private getSortedHeaders;
    private sortHeaders;
    /**
     * It performs to applying  the value sorting.
     *
     * @param {IAxisSet[]} rMembers - It contains the row members data.
     * @param {IAxisSet[]} cMembers - It contains the column members data.
     * @returns {ISortedHeaders} - It return the sorted value as ISortedHeaders.
     * @hidden
     */
    applyValueSorting(rMembers?: IAxisSet[], cMembers?: IAxisSet[]): ISortedHeaders;
    private getMember;
    private sortByValueRow;
    private insertAllMembersCommon;
    private insertSubTotals;
    private getMemberSpanCount;
    private frameDrillObject;
    private getIndexedHeaders;
    private getOrderedIndex;
    private insertPosition;
    private insertTotalPosition;
    private calculatePagingValues;
    private performSlicing;
    private removeChildMembers;
    private insertAllMember;
    private getTableData;
    private insertRowSubTotals;
    private getParentIndex;
    private getAggregatedHeaders;
    private getAggregatedHeaderData;
    private updateSelectedHeaders;
    private applyAdvancedAggregate;
    private updateAggregates;
    private getSelectedColumn;
    private getSelectedRow;
    private recursiveRowData;
    private updateRowData;
    private getCellSet;
    private updateValueMembers;
    private reArrangeValueMember;
    private frameDefinedHeaderData;
    private getHeaderData;
    getAggregateValue(rowIndex: number[], columnIndex: INumberIndex, value: number, type: string, isGrandTotal: boolean): number;
    private evaluate;
    /**
     * It performs the formatting to get formatted Value
     *
     * @param {number | string} value - It contains the value which went formatting.
     * @param {string} fieldName - It contains the field name.
     * @returns {IAxisSet} - It returns the formatted value as IAxisSet data.
     * @hidden
     */
    getFormattedValue(value: number | string, fieldName: string): IAxisSet;
    private powerFunction;
    private getTabularPivotValues;
    setColumnSpan(currentRow: IAxisSet[], firstRow: IAxisSet): void;
    setRowSpan(): void;
}
/**
 * Allows the following pivot report information such as rows, columns, values, filters, etc., that are used to render the pivot table and field list.
 * * `catalog`: Allows to set the database name of SSAS cube as string type that used to retrieve the data from the specified connection string. **Note: It is applicable only for OLAP data source.**
 * * `cube`: Allows you to set the SSAS cube name as string type that used to retrieve data for pivot table rendering. **Note: It is applicable only for OLAP data source.**
 * * `providerType`: Allows to set the provider type to identify the given connection is either Relational or SSAS to render the pivot table and field list.
 * * `url`: Allows to set the URL as string type, which helps to identify the service endpoint where the data are processed and retrieved to render the pivot table and field list. **Note: It is applicable only for OLAP data source.**
 * * `localeIdentifier`: Allows you to set the specific culture code as number type to render pivot table with desired localization.
 * By default, the pivot table displays with culture code **1033**, which indicates "en-US" locale. **Note: It is applicable only for OLAP data source.**
 * * `dataSource`: Allows you to set the data source as JSON collection to the pivot report either from local or from remote server to the render the pivot that and field list.
 * You can fetch JSON data from remote server by using DataManager. **Note: It is applicable only for relational data source.**
 * * `rows`: Allows specific fields associated with field information that needs to be displayed in row axis of pivot table.
 * * `columns`: Allows specific fields associated with field information that needs to be displayed in column axis of pivot table.
 * * `values`: Allows specific fields associated with field information that needs to be displayed as aggregated numeric values in pivot table.
 * * `filters`: Allows to filter the values in other axis based on the collection of filter fields in pivot table.
 * * `excludeFields`: Allows you to restrict the specific field(s) from displaying it in the field list UI.
 * You may also be unable to render the pivot table with this field(s) by doing so. **Note: It is applicable only for relational data source.**
 * * `expandAll`: Allows you to either expand or collapse all the headers that are displayed in the pivot table.
 * By default, all the headers are collapsed in the pivot table. **Note: It is applicable only for Relational data.**
 * * `valueAxis`: Allows you to set the value fields that to be plotted either in row or column axis in the pivot table.
 * * `filterSettings`: Allows specific fields associated with either selective or conditional-based filter members that used to be displayed in the pivot table.
 * * `sortSettings`: Allows specific fields associated with sort settings to order their members either in ascending or descending that used to be displayed in the pivot table.
 * By default, the data source containing fields are display with Ascending order alone. To use this option, it requires the `enableSorting` property to be **true**.
 * * `enableSorting`: Allows to perform sort operation to order members of a specific fields either in ascending or descending that used to be displayed in the pivot table.
 * * `formatSettings`: Allows specific fields used to display the values with specific format that used to be displayed in the pivot table.
 * For example, to display a specific field with currency formatted values in the pivot table, the set the `format` property to be **C**.
 * * `drilledMembers`: Allows specific fields used to display their the headers to be either expanded or collapsed in the pivot table.
 * * `valueSortSettings`: Allows to sort individual value field and its aggregated values either in row or column axis to ascending or descending order.
 * * `calculatedFieldSettings`: Allows to create new calculated fields from the bound data source or using simple formula with basic arithmetic operators in the pivot table.
 * * `allowMemberFilter`: Allows to perform filter operation based on the selective filter members of the specific fields used to be displayed in the pivot table.
 * * `allowLabelFilter`: Allows to perform filter operation based on the selective headers used to be displayed in the pivot table.
 * * `allowValueFilter`: Allows to perform filter operation based only on value fields and its resultant aggregated values over other fields defined in row and column axes that used to be displayed in the pivot table.
 * * `showSubTotals`: Allows to show or hide sub-totals in both rows and columns axis of the pivot table.
 * * `showRowSubTotals`: Allows to show or hide sub-totals in row axis of the pivot table.
 * * `showColumnSubTotals`: Allows to show or hide sub-totals in column axis of the pivot table.
 * * `showGrandTotals`: Allows to show or hide grand totals in both rows and columns axis of the pivot table.
 * * `grandTotalsPosition`: Allows the grand totals to be position at first position in the row and column axis of the pivot table.
 * * `showRowGrandTotals`: Allows to show or hide grand totals in row axis of the pivot table.
 * * `showColumnGrandTotals`: Allows to show or hide grand totals in column axis of the pivot table.
 * * `showHeaderWhenEmpty`: Allows the undefined headers to be displayed in the pivot table, when the specific field(s) are not defined in the raw data.
 * For example, if the raw data for the field ‘Country’ is defined as “United Kingdom” and “State” is not defined means, it will be shown as “United Kingdom >> Undefined” in the header section.
 * * `alwaysShowValueHeader`: Allows to show the value field header always in pivot table, even if it holds a single field in the value field axis.
 * * `conditionalFormatSettings`: Allows a collection of values fields to change the appearance of the pivot table value cells with different style properties such as background color, font color, font family, and font size based on specific conditions.
 * * `emptyCellsTextContent`: Allows to show custom string to the empty value cells that used to display in the pivot table. You can fill empty value cells with any value like “0”, ”-”, ”*”, “(blank)”, etc.
 * * `groupSettings`: Allows specific fields to group their data on the basis of their type.
 * For example, the date type fields can be formatted and displayed based on year, quarter, month, and more. Likewise, the number type fields can be grouped range-wise, such as 1-5, 6-10, etc.
 * You can perform custom group to the string type fields that used to displayed in the pivot table.
 * * `showAggregationOnValueField`: Allows the pivot button with specific value field caption along with the aggregation type, to be displayed in the grouping bar and field list UI.
 * For example, if the value field "Sold Amount" is aggregated with Sum, it will be displayed with caption "Sum of Sold Amount" in its pivot button.
 * * `authentication`: Allows you to set the credential information to access the specified SSAS cube. **Note: It is applicable only for OLAP data source**.
 */
export interface IDataOptions {
    /**
     * Allows to set the database name of SSAS cube as string type that used to retrieve the data from the specified connection string.
     * > It is applicable only for OLAP data source.
     */
    catalog?: string;
    /**
     * Allows you to set the SSAS cube name as string type that used to retrieve data for pivot table rendering.
     * > It is applicable only for OLAP data source.
     */
    cube?: string;
    /**
     * Allows to set the provider type to identify the given connection is either **Relational** or **SSAS** to render the pivot table and field list. The following options are:
     * * `Relational`: Allows to render the pivot table with JSON data collection either fetch at local or remote server.
     * * `SSAS`: Allows to render the pivot table with OLAP data fetch from OLAP cube.
     */
    providerType?: ProviderType;
    /**
     * Allows to set the mode of rendering the pivot table.
     *
     */
    mode?: RenderMode;
    /**
     * Allows to set the URL as string type, which helps to identify the service endpoint where the data are processed and retrieved to render the pivot table and field list.
     * > It is applicable only for OLAP data source.
     */
    url?: string;
    /**
     * Allows you to set the specific culture code as number type to render pivot table with desired localization.
     * By default, the pivot table displays with culture code **1033**, which indicates "en-US" locale.
     * > It is applicable only for OLAP data source.
     */
    localeIdentifier?: number;
    /**
     * Allows you to assign multiple roles to the OLAP cube, separated by commas, each of which can access only restricted OLAP cube information such as measures, dimensions, and more that can be rendered in the pivot table.
     * > It is applicable only for OLAP data source.
     */
    roles?: string;
    /**
     * Allows you to set the data source as JSON collection to the pivot report either from local or from remote server to the render the pivot that and field list.
     * You can fetch JSON data from remote server by using DataManager.
     * > It is applicable only for relational data source.
     */
    dataSource?: IDataSet[] | DataManager | string[][];
    /**
     * Allows specific fields associated with field information that needs to be displayed in row axis of pivot table. The following configurations which are applicable are as follows:
     * * `name`: Allows you to set the field name that needs to be displayed in row axis of pivot table.
     * * `caption`: Allows you to set caption to the specific field. It will be used to display instead of its name in pivot table component's UI.
     * * `showNoDataItems`: Allows you to display all members items of a specific field to the pivot table,
     * even doesn't have any data in its row/column intersection in data source. **Note: It is applicable only for relational data source.**
     * * `showSubTotals`: Allows to show or hide sub-totals to a specific field in row axis of the pivot table.
     * * `isNamedSet`: Allows you to set whether the specified field is a named set or not. In general,
     * the named set is a set of dimension members or a set expression (MDX query) to be created as a dimension in the SSAS OLAP cube itself. **Note: It is applicable only for OLAP data source.**
     * * `isCalculatedField`: Allows to set whether the specified field is a calculated field or not.
     * In general, the calculated field is created from the bound data source or using simple formula with basic arithmetic operators in the pivot table. **Note: It is applicable only for OLAP data source.**
     * * `showFilterIcon`: Allows you to show or hide the filter icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This filter icon is used to filter the members of a specified field at runtime in the pivot table.
     * * `showSortIcon`: Allows you to show or hide the sort icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This sort icon is used to order members of a specified field either in ascending or descending at runtime.
     * * `showRemoveIcon`: Allows you to show or hide the remove icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This remove icon is used to remove the specified field during runtime.
     * * `showEditIcon`: Allows you to show or hide the edit icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This edit icon is used to modify caption, formula, and format of a specified calculated field at runtime that to be displayed in the pivot table.
     * * `allowDragAndDrop`: Allows you to restrict the specific field's pivot button that is used to drag on runtime in the grouping bar and field list UI.
     * This will prevent you from modifying the current report.
     * * `expandAll`: Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    rows?: IFieldOptions[];
    /**
     * Allows specific fields associated with field information that needs to be displayed in column axis of pivot table. The following configurations which are applicable are as follows:
     * * `name`: Allows you to set the field name that needs to be displayed in column axis of pivot table.
     * * `caption`: Allows you to set caption to the specific field. It will be used to display instead of its name in pivot table component's UI.
     * * `showNoDataItems`: Allows you to display all members items of a specific field to the pivot table,
     * even doesn't have any data in its row/column intersection in data source. **Note: It is applicable only for relational data source.**
     * * `showSubTotals`: Allows to show or hide sub-totals to a specific field in column axis of the pivot table.
     * * `isNamedSet`: Allows you to set whether the specified field is a named set or not. In general,
     * the named set is a set of dimension members or a set expression (MDX query) to be created as a dimension in the SSAS OLAP cube itself. **Note: It is applicable only for OLAP data source.**
     * * `isCalculatedField`: Allows to set whether the specified field is a calculated field or not.
     * In general, the calculated field is created from the bound data source or using simple formula with basic arithmetic operators in the pivot table. **Note: It is applicable only for OLAP data source.**
     * * `showFilterIcon`: Allows you to show or hide the filter icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This filter icon is used to filter the members of a specified field at runtime in the pivot table.
     * * `showSortIcon`: Allows you to show or hide the sort icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This sort icon is used to order members of a specified field either in ascending or descending at runtime.
     * * `showRemoveIcon`: Allows you to show or hide the remove icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This remove icon is used to remove the specified field during runtime.
     * * `showEditIcon`: Allows you to show or hide the edit icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This edit icon is used to modify caption, formula, and format of a specified calculated field at runtime that to be displayed in the pivot table.
     * * `allowDragAndDrop`: Allows you to restrict the specific field's pivot button that is used to drag on runtime in the grouping bar and field list UI.
     * This will prevent you from modifying the current report.
     * * `expandAll`: Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    columns?: IFieldOptions[];
    /**
     * Allows specific fields associated with field information that needs to be displayed as aggregated numeric values in pivot table. The following configurations which are applicable are as follows:
     * * `name`: Allows you to set the field name that needs to be displayed in row/column/value/filter axis of pivot table.
     * * `caption`: Allows you to set caption to the specific field. It will be used to display instead of its name in pivot table component's UI.
     * * `type`: Allows to display the values in the pivot table with appropriate aggregations such as sum, product, count, average, etc… **Note: It is applicable only for relational data source.**
     * * `baseField`: Allows you to set the selective field, which used to display the values with either
     *  DifferenceFrom or PercentageOfDifferenceFrom or PercentageOfParentTotal aggregate types. **Note: It is applicable only for relational data source.**
     * * `baseItem`: Allows you to set the selective item of a specific field, which used to display the values with either DifferenceFrom or PercentageOfDifferenceFrom aggregate types.
     * The selective item should be set the from field specified in the baseField property. **Note: It is applicable only for relational data source.**
     * * `isCalculatedField`: Allows to set whether the specified field is a calculated field or not.
     * In general, the calculated field is created from the bound data source or using simple formula with basic arithmetic operators in the pivot table. **Note: It is applicable only for OLAP data source.**
     * * `showRemoveIcon`: Allows you to show or hide the remove icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This remove icon is used to remove the specified field during runtime.
     * * `showValueTypeIcon`: Allows you to show or hide the value type icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This value type icon helps to select the appropriate aggregation type to specified value field at runtime.
     * * `showEditIcon`: Allows you to show or hide the edit icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This edit icon is used to modify caption, formula, and format of a specified calculated field at runtime that to be displayed in the pivot table.
     * * `allowDragAndDrop`: Allows you to restrict the specific field's pivot button that is used to drag on runtime in the grouping bar and field list UI.
     * This will prevent you from modifying the current report.
     * * `expandAll`: Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    values?: IFieldOptions[];
    /**
     * Allows to filter the values in other axis based on the collection of filter fields in pivot table. The following configurations which are applicable are as follows:
     * * `name`: Allows you to set the field name that needs to be displayed in row/column/value/filter axis of pivot table.
     * * `caption`: Allows you to set caption to the specific field. It will be used to display instead of its name in pivot table component's UI.
     * * `isNamedSet`: Allows you to set whether the specified field is a named set or not. In general,
     * the named set is a set of dimension members or a set expression (MDX query) to be created as a dimension in the SSAS OLAP cube itself. **Note: It is applicable only for OLAP data source.**
     * * `isCalculatedField`: Allows to set whether the specified field is a calculated field or not.
     * In general, the calculated field is created from the bound data source or using simple formula with basic arithmetic operators in the pivot table. **Note: It is applicable only for OLAP data source.**
     * * `showFilterIcon`: Allows you to show or hide the filter icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This filter icon is used to filter the members of a specified field at runtime in the pivot table.
     * * `showRemoveIcon`: Allows you to show or hide the remove icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This remove icon is used to remove the specified field during runtime.
     * * `showEditIcon`: Allows you to show or hide the edit icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This edit icon is used to modify caption, formula, and format of a specified calculated field at runtime that to be displayed in the pivot table.
     * * `allowDragAndDrop`: Allows you to restrict the specific field's pivot button that is used to drag on runtime in the grouping bar and field list UI.
     * This will prevent you from modifying the current report.
     * * `expandAll`: Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    filters?: IFieldOptions[];
    /**
     * Allows you to restrict the specific field(s) from displaying it in the field list UI.
     * You may also be unable to render the pivot table with this field(s) by doing so.
     * > It is applicable only for relational data source.
     */
    excludeFields?: string[];
    /**
     * Allows you to either expand or collapse all the headers that are displayed in the pivot table.
     * By default, all the headers are collapsed in the pivot table.
     * > It is applicable only for Relational data.
     */
    expandAll?: boolean;
    /**
     * Allows you to set the value fields that to be plotted either in row or column axis in the pivot table.
     */
    valueAxis?: string;
    /**
     * Allows you to display the value headers based on the index position in row or column axis in the pivot table.
     * By default, the value headers are displayed at last index position based on the `valueAxis` property.
     * > It is applicable only for relational data source.
     */
    valueIndex?: number;
    /**
     * Allows specific fields associated with either selective or conditional-based filter members that used to be displayed in the pivot table.
     */
    filterSettings?: IFilter[];
    /**
     * Allows specific fields associated with sort settings to order their members either in ascending or descending that used to be displayed in the pivot table.
     * By default, the data source containing fields are display with Ascending order alone. To use this option, it requires the `enableSorting` property to be **true**.
     */
    sortSettings?: ISort[];
    /**
     * Allows to perform sort operation to order members of a specific fields either in ascending or descending that used to be displayed in the pivot table.
     */
    enableSorting?: boolean;
    /**
     * Allows specific fields used to display the values with specific format that used to be displayed in the pivot table.
     * For example, to display a specific field with currency formatted values in the pivot table, the set the `format` property to be **C**.
     */
    formatSettings?: IFormatSettings[];
    /**
     * Allows specific fields used to display their the headers to be either expanded or collapsed in the pivot table.
     */
    drilledMembers?: IDrillOptions[];
    /**
     * Allows to sort individual value field and its aggregated values either in row or column axis to ascending or descending order.
     */
    valueSortSettings?: IValueSortSettings;
    /**
     * Allows to create new calculated fields from the bound data source or using simple formula with basic arithmetic operators in the pivot table.
     */
    calculatedFieldSettings?: ICalculatedFieldSettings[];
    /**
     * Allows to perform filter operation based on the selective filter members of the specific fields used to be displayed in the pivot table.
     */
    allowMemberFilter?: boolean;
    /**
     * Allows to perform filter operation based on the selective headers used to be displayed in the pivot table.
     */
    allowLabelFilter?: boolean;
    /**
     * Allows to perform filter operation based only on value fields and its resultant aggregated values over other fields defined in row and column axes that used to be displayed in the pivot table.
     */
    allowValueFilter?: boolean;
    /**
     * Allows to show or hide sub-totals in both rows and columns axis of the pivot table.
     */
    showSubTotals?: boolean;
    /**
     * Allows to show or hide sub-totals in row axis of the pivot table.
     */
    showRowSubTotals?: boolean;
    /**
     * Allows to show or hide sub-totals in column axis of the pivot table.
     */
    showColumnSubTotals?: boolean;
    /**
     * Allows the row and column sub-totals to be displayed at the top or bottom of the header group in the pivot table.
     * > By default, the column sub-totals are displayed at the bottom and row sub-totals are displayed at the top of their header group in the pivot table.
     */
    subTotalsPosition?: SubTotalsPosition;
    /**
     * Allows to show or hide grand totals in both rows and columns axis of the pivot table.
     */
    showGrandTotals?: boolean;
    /**
     * Allows the grand totals to be position at first position in the row and column axis of the pivot table.
     */
    grandTotalsPosition?: GrandTotalsPosition;
    /**
     * Allows to show or hide grand totals in row axis of the pivot table.
     */
    showRowGrandTotals?: boolean;
    /**
     * Allows to show or hide grand totals in column axis of the pivot table.
     */
    showColumnGrandTotals?: boolean;
    /**
     * Allows the undefined headers to be displayed in the pivot table, when the specific field(s) are not defined in the raw data.
     * For example, if the raw data for the field ‘Country’ is defined as “United Kingdom” and “State” is not defined means, it will be shown as “United Kingdom >> Undefined” in the header section.
     */
    showHeaderWhenEmpty?: boolean;
    /**
     * Allows to show the value field header always in pivot table, even if it holds a single field in the value field axis.
     */
    alwaysShowValueHeader?: boolean;
    /**
     * Allows a collection of values fields to change the appearance of the pivot table value cells with different style properties such as background color, font color, font family, and font size based on specific conditions.
     */
    conditionalFormatSettings?: IConditionalFormatSettings[];
    /**
     * Allows to show custom string to the empty value cells that used to display in the pivot table. You can fill empty value cells with any value like “0”, ”-”, ”*”, “(blank)”, etc.
     */
    emptyCellsTextContent?: string;
    /**
     * Allows specific fields to group their data on the basis of their type.
     * For example, the date type fields can be formatted and displayed based on year, quarter, month, and more. Likewise, the number type fields can be grouped range-wise, such as 1-5, 6-10, etc.
     * You can perform custom group to the string type fields that used to displayed in the pivot table.
     */
    groupSettings?: IGroupSettings[];
    /**
     * Allows the pivot button with specific value field caption along with the aggregation type, to be displayed in the grouping bar and field list UI.
     * For example, if the value field "Sold Amount" is aggregated with Sum, it will be displayed with caption "Sum of Sold Amount" in its pivot button.
     */
    showAggregationOnValueField?: boolean;
    /**
     * Allows you to set the credential information to access the specified SSAS cube.
     * > It is applicable only for OLAP data source.
     */
    authentication?: IAuthenticationInfo;
    /**
     * Allows to define the data source type.
     */
    type?: DataSourceType;
    /**
     * Allows specific fields associated with field information that can be used while creating fieldlist. The following configurations which are applicable are as follows:
     * * `name`: Allows you to set the field name which is going to configure while creating the fieldlist.
     * * `caption`: Allows you to set caption to the specific field. It will be used to display instead of its name in pivot table component's UI.
     * * `showNoDataItems`: Allows you to display all members items of a specific field to the pivot table,
     * even doesn't have any data in its row/column intersection in data source. **Note: It is applicable only for relational data source.**
     * * `showSubTotals`: Allows to show or hide sub-totals to a specific field in row axis of the pivot table.
     * * `isNamedSet`: Allows you to set whether the specified field is a named set or not. In general,
     * the named set is a set of dimension members or a set expression (MDX query) to be created as a dimension in the SSAS OLAP cube itself. **Note: It is applicable only for OLAP data source.**
     * * `isCalculatedField`: Allows to set whether the specified field is a calculated field or not.
     * In general, the calculated field is created from the bound data source or using simple formula with basic arithmetic operators in the pivot table. **Note: It is applicable only for OLAP data source.**
     * * `showFilterIcon`: Allows you to show or hide the filter icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This filter icon is used to filter the members of a specified field at runtime in the pivot table.
     * * `showSortIcon`: Allows you to show or hide the sort icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This sort icon is used to order members of a specified field either in ascending or descending at runtime.
     * * `showRemoveIcon`: Allows you to show or hide the remove icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This remove icon is used to remove the specified field during runtime.
     * * `showEditIcon`: Allows you to show or hide the edit icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This edit icon is used to modify caption, formula, and format of a specified calculated field at runtime that to be displayed in the pivot table.
     * * `allowDragAndDrop`: Allows you to restrict the specific field's pivot button that is used to drag on runtime in the grouping bar and field list UI.
     * This will prevent you from modifying the current report.
     * * `expandAll`: Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    fieldMapping?: IFieldOptions[];
}
/**
 * Allows a collection of values fields to change the appearance of the pivot table value cells with different style properties such as background color, font color, font family, and font size based on specific conditions.
 */
export interface IConditionalFormatSettings {
    /**
     * Allows to set the value field name to apply conditional formatting.
     */
    measure?: string;
    /**
     * Allows you to choose the operator type such as equals, greater than, less than, etc. for conditional formatting.
     */
    conditions?: Condition;
    /**
     * Allows you to set the start value for applying conditional formatting.
     */
    value1?: number;
    /**
     * Allows you to set the end value for applying conditional formatting.
     * > This option will be used by default when the operator **Between** and **NotBetween** is chosen to apply.
     */
    value2?: number;
    /**
     * Allows to set the custom styles for the formatting applied values in the pivot table.
     */
    style?: IStyle;
    /**
     * Allows to set the header text of a specific row/column field to apply conditional formatting.
     */
    label?: string;
    /**
     * Allows to apply conditional formatting to the grand totals of row and column axis in the pivot table.
     */
    applyGrandTotals?: boolean;
}
/**
 * Allows the style information to customize the pivot table cell appearance.
 */
export interface IStyle {
    /**
     * It allows to set the background color to the value cell in the pivot table.
     */
    backgroundColor?: string;
    /**
     * It allows to set the font color to the value cell in the pivot table.
     */
    color?: string;
    /**
     * It allows to set the font family to the value cell in the pivot table.
     */
    fontFamily?: string;
    /**
     * It allows to set the font size to the value cell in the pivot table.
     */
    fontSize?: string;
}
/**
 * Allows to sort individual value field and its aggregated values either in row or column axis to ascending or descending order.
 */
export interface IValueSortSettings {
    /**
     * It allows to set the member name of a specific field for value sorting.
     */
    headerText?: string;
    /**
     * It allows to set the delimiter, which is used a separator to split the given header text.
     */
    headerDelimiter?: string;
    /**
     * Allows to apply sorting to the specified field either by ascending or descending. The types are,
     * * `Ascending`: It allows to display the field members in ascending order.
     * * `Descending`: It allows to display the field members in descending order.
     */
    sortOrder?: Sorting;
    /**
     * It allows to set the column index of the value cell.
     */
    columnIndex?: number;
    /**
     * It allows to set the measure name to achieve value sorting based on this.
     * > It is applicable only for OLAP data source.
     */
    measure?: string;
}
/**
 * Allows you to set the credential information to access the specified SSAS cube.
 * > It is applicable only for OLAP data source.
 */
export interface IAuthenticationInfo {
    /**
     * It allows to set the user name to access the specified SSAS cube.
     */
    userName?: string;
    /**
     * It allows to set the password to access the specified SSAS cube.
     */
    password?: string;
}
/**
 * Allows to set the page information to display the pivot table with specific page during virtual scrolling.
 */
export interface IPageSettings {
    /**
     * It allows to set the total column count of the pivot table.
     */
    columnPageSize?: number;
    /**
     * It allows to set the total row count of the pivot table.
     */
    rowPageSize?: number;
    /**
     * It allows to set the current column page count displayed in the pivot table.
     */
    currentColumnPage?: number;
    /**
     * It allows to set the current row page count displayed in the pivot table.
     */
    currentRowPage?: number;
}
/**
 * @hidden
 */
export interface IMatrix2D {
    [key: number]: {
        [key: number]: number;
    };
    length: number;
    push(item: number): number;
}
/**
 * @hidden
 */
export interface ValueMatrixInfo {
    ordinal: number;
    member: number;
}
/**
 * @hidden
 */
interface ISortedHeaders {
    rMembers: IAxisSet[];
    cMembers: IAxisSet[];
}
/**
 * @hidden
 */
export interface IFilterObj {
    [key: string]: {
        memberObj: IStringIndex;
    };
}
/**
 * @hidden
 */
export interface IIterator {
    [key: string]: {
        index: number[];
        indexObject: INumberIndex;
    };
}
/**
 * @hidden
 */
export interface INumberIndex {
    [key: string]: number;
}
/**
 * @hidden
 */
export interface INumberArrayIndex {
    [key: string]: number[];
}
/**
 * @hidden
 */
export interface IStringIndex {
    [key: string]: string;
}
/**
 * It holds the collection of cell information to render the pivot table component.
 *
 * @hidden
 */
export interface IPivotValues {
    /**
     * Allows you to configure the pivot cell information retrieved from the data source.
     */
    [key: number]: {
        [key: number]: number | string | Object | IAxisSet;
        length: number;
    };
    /**
     * Gets or sets the length of the array. This is a number one higher than the highest index in the array.
     */
    length: number;
}
/**
 * @hidden
 */
export interface IPivotRows {
    [key: number]: number | string | Object | IAxisSet;
    length: number;
}
/**
 * @hidden
 */
export interface IGridValues {
    [key: number]: IAxisSet[];
    length: number;
}
/**
 * @hidden
 */
export interface ISelectedValues {
    [key: number]: IAxisSet;
}
/**
 * @hidden
 */
export interface IDataSet {
    [key: string]: string | number | Date;
}
/**
 * Allows specific fields associated with field information that needs to be displayed in the field axes of pivot table. The following configurations which are applicable are as follows:
 */
export interface IFieldOptions {
    /**
     * Allows you to set the field name that needs to be displayed in row/column/value/filter axis of pivot table.
     */
    name?: string;
    /**
     * Allows you to set caption to the specific field. It will be used to display instead of its name in pivot table component's UI.
     */
    caption?: string;
    /**
     * Allows to display the values in the pivot table with appropriate aggregations such as sum, product, count, average, etc… The available types are,
     * * `Sum`: Allows to display the pivot table values with sum.
     * * `Product`: Allows to display the pivot table values with product.
     * * `Count`: Allows to display the pivot table values with count.
     * * `DistinctCount`: Allows to display the pivot table values with distinct count.
     * * `Min`: Allows to display the pivot table with minimum value.
     * * `Max`: Allows to display the pivot table with maximum value.
     * * `Avg`: Allows to display the pivot table values with average.
     * * `Median`: Allows to display the pivot table values with median.
     * * `Index`: Allows to display the pivot table values with index.
     * * `PopulationStDev`: Allows to display the pivot table values with population standard deviation.
     * * `SampleStDev`: Allows to display the pivot table values with sample standard deviation.
     * * `PopulationVar`: Allows to display the pivot table values with population variance.
     * * `SampleVar`: Allows to display the pivot table values with sample variance.
     * * `RunningTotals`: Allows to display the pivot table values with running totals.
     * * `DifferenceFrom`: Allows to display the pivot table values with difference from the value of the base item in the base field.
     * * `PercentageOfDifferenceFrom`: Allows to display the pivot table values with percentage difference from the value of the base item in the base field.
     * * `PercentageOfGrandTotal`: Allows to display the pivot table values with percentage of grand total of all values.
     * * `PercentageOfColumnTotal`: Allows to display the pivot table values in each column with percentage of total values for the column.
     * * `PercentageOfRowTotal`: Allows to display the pivot table values in each row with percentage of total values for the row.
     * * `PercentageOfParentTotal`: Allows to display the pivot table values with percentage of total of all values based on selected field.
     * * `PercentageOfParentColumnTotal`: Allows to display the pivot table values with percentage of its parent total in each column.
     * * `PercentageOfParentRowTotal`: Allows to display the pivot table values with percentage of its parent total in each row.
     * * `CalculatedField`: Allows to display the pivot table with calculated field values. It allows user to create a new calculated field alone.
     *
     * > It is applicable only for relational data source.
     */
    type?: SummaryTypes;
    /**
     * Allows you to set the axis name to the specific field. This will help to display the field in specified axis such as row/column/value/filter axis of pivot table.
     */
    axis?: string;
    /**
     * Allows you to display all members items of a specific field to the pivot table, even doesn't have any data in its row/column intersection in data source.
     * > It is applicable only for relational data source.
     */
    showNoDataItems?: boolean;
    /**
     * Allows you to set the selective field, which used to display the values with either DifferenceFrom or PercentageOfDifferenceFrom or PercentageOfParentTotal aggregate types.
     * > It is applicable only for relational data source.
     */
    baseField?: string;
    /**
     * Allows you to set the selective item of a specific field, which used to display the values with either DifferenceFrom or PercentageOfDifferenceFrom aggregate types.
     * The selective item should be set the from field specified in the baseField property.
     * > It is applicable only for relational data source.
     */
    baseItem?: string;
    /**
     * Allows to show or hide sub-totals to a specific field in row/column axis of the pivot table.
     */
    showSubTotals?: boolean;
    /**
     * Allows you to set whether the specified field is a named set or not.
     * In general, the named set is a set of dimension members or a set expression (MDX query) to be created as a dimension in the SSAS OLAP cube itself.
     * > It is applicable only for OLAP data source.
     */
    isNamedSet?: boolean;
    /**
     * Allows to set whether the specified field is a calculated field or not. In general, a calculated field is created from the bound data source or using simple formula with basic arithmetic operators in the pivot table.
     * > This option is applicable only for OLAP data source.
     */
    isCalculatedField?: boolean;
    /**
     * Allows you to show or hide the filter icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This filter icon is used to filter the members of a specified field at runtime in the pivot table.
     */
    showFilterIcon?: boolean;
    /**
     * Allows you to show or hide the sort icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This sort icon is used to order members of a specified field either in ascending or descending at runtime.
     */
    showSortIcon?: boolean;
    /**
     * Allows you to show or hide the remove icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This remove icon is used to remove the specified field during runtime.
     */
    showRemoveIcon?: boolean;
    /**
     * Allows you to show or hide the value type icon of a specific field that used to be displayed in the pivot button of the grouping bar and field list UI.
     * This value type icon helps to select the appropriate aggregation type to specified value field at runtime.
     */
    showValueTypeIcon?: boolean;
    /**
     * Allows you to show or hide the edit icon of a specific field that used to be displayed on the pivot button of the grouping bar and field list UI.
     * This edit icon is used to modify caption, formula, and format of a specified calculated field at runtime that to be displayed in the pivot table.
     */
    showEditIcon?: boolean;
    /**
     * Allows you to restrict the specific field's pivot button that is used to drag on runtime in the grouping bar and field list UI.
     * This will prevent you from modifying the current report.
     */
    allowDragAndDrop?: boolean;
    /**
     * Allows to specify the data type of specific field.
     */
    dataType?: string;
    /**
     * Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    expandAll?: boolean;
    /**
     * Allows you to create group folder for fields in pivot field list.
     * Allows user to set the group (i.e., folder) name for selected fields that used to be displayed in the field list tree.
     * > It is applicable only for relational data source.
     */
    groupName?: string;
}
/**
 * Allows specific fields associated with sort settings to order their members either in ascending or descending that used to be displayed in the pivot table.
 */
export interface ISort {
    /**
     * Allows to set the field name to order their members either in ascending or descending in the pivot table.
     */
    name?: string;
    /**
     * Allows to apply sorting to the specified field either by ascending or descending or JSON order. The types are,
     * * `Ascending`: It allows to display the field members in ascending order.
     * * `Descending`: It allows to display the field members in descending order.
     * * `None`: It allows to display the field members based on JSON order.
     */
    order?: Sorting;
    /**
     * Allows to specify the sorting order for custom sorting.
     *
     */
    membersOrder?: string[] | number[];
}
/**
 * Allows specific fields associated with either selective or conditional-based filter members that used to be displayed in the pivot table.
 */
export interface IFilter {
    /**
     * Allows you to set the field name that used to display the selective or conditional-based filter members that used to be displayed in the pivot table.
     */
    name?: string;
    /**
     * Allows you to set the specific filter type to display the filter members in the pivot table. They are:
     * * Include - Specifies the filter type as include.
     * * Exclude - Specifies the filter type as exclude.
     * * Label - Specifies the filter type as label.
     * * Date - Specifies the filter type as date.
     * * Number - Specifies the filter type as number.
     * * Value - Specifies the filter type as value.
     *
     * @default Include
     */
    type?: FilterType;
    /**
     * Allows you to specify the field members that used to be displayed based on the filter type provided in the pivot table.
     */
    items?: string[];
    /**
     * Allows you to choose the operator type such as equals, greater than, less than, etc. for conditional-based filtering.
     * > It is applicable only for label and value filtering.
     */
    condition?: Operators;
    /**
     * Allows you to set the start value to display the filter items in the pivot table based on the condition applied.
     * > It is applicable only for label and value filtering.
     */
    value1?: string | Date;
    /**
     * Allows you to set the end value to display the filter items in the pivot table based on the condition applied.
     * > This option will be used by default when the operator **Between** and **NotBetween** is chosen to apply. Also, it is applicable only for label and value filtering.
     */
    value2?: string | Date;
    /**
     * It allows excel-like label filtering operation through UI and code-behind.
     */
    showLabelFilter?: boolean;
    /**
     * It allows excel-like date filtering operation through UI and code-behind.
     */
    showDateFilter?: boolean;
    /**
     * It allows excel-like number filtering operation through UI and code-behind.
     */
    showNumberFilter?: boolean;
    /**
     * Allows to set value field for evaluation using conditions and operands for filtering.
     * > It is applicable only for label and value filtering.
     */
    measure?: string;
    /**
     * Allows to set level of the field to fetch data from the cube for filtering.
     * > This option is applicable only for user-defined hierarchies in OLAP data source.
     */
    levelCount?: number;
    /**
     * Allows to set level name of a specified field, where the filtering settings to be applied.
     * > This option is applicable only for user-defined hierarchies in OLAP data source.
     */
    selectedField?: string;
}
/**
 * Allows specific fields used to display their the headers to be either expanded or collapsed in the pivot table.
 */
export interface IDrillOptions {
    /**
     * It allows to set the field name whose members to be either expanded or collapsed in the pivot table.
     */
    name?: string;
    /**
     * It allows to set the members to be either expanded or collapsed in the pivot table.
     */
    items?: string[];
    /**
     * It allows to set the delimiter, which is used a separator to split the given members.
     */
    delimiter?: string;
}
/**
 * Allows options to create new calculated fields from the bound data source or using simple formula with basic arithmetic operators in the pivot table.
 */
export interface ICalculatedFieldSettings {
    /**
     * It allows to set the field name that used to create as a calculated field.
     */
    name?: string;
    /**
     * It allows to set the formula/expression to the specified calculated field.
     */
    formula?: string;
    /**
     * It allows to set hierarchy unique name, that used to create calculated member.
     * > It is applicable only for OLAP data source.
     */
    hierarchyUniqueName?: string;
    /**
     * It allows to set format string that used to create calculated member with specified formatted values that to be displayed in the pivot table.
     * > It is applicable only for OLAP data source.
     */
    formatString?: string;
}
/**
 * Configures the specific calculated field information.
 */
export interface ICalculatedFields extends ICalculatedFieldSettings {
    /**
     * It allows to set the caption to the calculated field that used to be displayed in the pivot table UI.
     */
    caption?: string;
    /**
     * It allows to set the calculated field's actual formula.
     */
    actualFormula?: string;
}
/**
 * Allows specific fields used to display the values with specific format that used to be displayed in the pivot table.
 * For example, to display a specific field with currency formatted values in the pivot table, the set the `format` property to be **C**.
 */
export interface IFormatSettings extends NumberFormatOptions, DateFormatOptions {
    /**
     * It allows to set the field name to apply format settings.
     */
    name?: string;
}
/**
 * @hidden
 */
export interface IMembers {
    [index: string]: {
        ordinal?: number;
        index?: number[];
        name?: string;
        isDrilled?: boolean;
        isNodeExpand?: boolean;
        parent?: string;
        caption?: string;
        isSelected?: boolean;
    };
}
/**
 * @hidden
 */
export interface IFieldListOptions {
    [index: string]: IField;
}
/**
 * Allows you to configure the information retrieved from the data source for the field list.
 */
export interface IField {
    /**
     * It allows to set the field name.
     */
    id?: string;
    /**
     * It allows to set the parent name.
     *
     */
    pid?: string;
    /**
     * It allows to set the field caption.
     */
    caption?: string;
    /**
     * It allows to set the field type to be either number or string or data or datetime.
     */
    type?: string;
    /**
     * It allows to set the current number format string of the field.
     */
    formatString?: string;
    /**
     * It allows to set the exact position of the specific field situated in the given data source.
     */
    index?: number;
    /**
     * It allows to set members information of the specific field.
     */
    members?: IMembers;
    /**
     * It allows to set members caption information of the specific field.
     */
    formattedMembers?: IMembers;
    /**
     * It allows to set date members information of the specific field.
     */
    dateMember?: IAxisSet[];
    /**
     * It allows to set the current filter members to the specific field.
     */
    filter?: string[];
    /**
     * It allows to set the current sort order to the specific field.
     */
    sort?: string;
    /**
     * It allows to set the current aggregate type to the specific field.
     */
    aggregateType?: string;
    /**
     * It allows to set the selective field name to the field to perform aggregation.
     */
    baseField?: string;
    /**
     * It allows to set the selective member of the specific field to perform aggregation.
     */
    baseItem?: string;
    /**
     * It allows to change the specific field's type.
     */
    filterType?: string;
    /**
     * It allows to set the format to the specific field.
     */
    format?: string;
    /**
     * It allows to set the calculated field formula.
     */
    formula?: string;
    /**
     * Allows to set whether the specific field is selected or not.
     */
    isSelected?: boolean;
    /**
     * Allows to set the specific field for excel-like filtering.
     */
    isExcelFilter?: boolean;
    /**
     * Allows to set the specific field to display the data items that are not in combination with respect to current report.
     */
    showNoDataItems?: boolean;
    /**
     * Allows to set whether the specific field is custom grouped or not.
     */
    isCustomField?: boolean;
    /**
     * It allows to set the visibility of filter icon in grouping bar and field list button.
     */
    showFilterIcon?: boolean;
    /**
     * It allows to set the visibility of sort icon in grouping bar and field list button.
     */
    showSortIcon?: boolean;
    /**
     * It allows to set the visibility of remove icon in grouping bar button.
     */
    showRemoveIcon?: boolean;
    /**
     * It allows to set the visibility of calculated field edit icon in grouping bar and field list button.
     */
    showEditIcon?: boolean;
    /**
     * It allows to set the visibility of summary type drop down icon in grouping bar and field list button.
     */
    showValueTypeIcon?: boolean;
    /**
     * It allows to enable/disable the drag and drop option to grouping bar and field list button.
     */
    allowDragAndDrop?: boolean;
    /**
     * Allows to set whether is is a calculated field or not.
     */
    isCalculatedField?: boolean;
    /**
     * It allows enable/disable sub total in pivot table.
     */
    showSubTotals?: boolean;
    /**
     * Allows you to expand or collapse all of the pivot table's headers for a specific field.
     */
    expandAll?: boolean;
    /**
     * It allows to set custom sort members of the specific field.
     */
    membersOrder?: string[] | number[];
    /**
     * It allows you to check if the custom sort type of a specific field is Alphanumeric or not.
     *
     * @default false
     */
    isAlphanumeric?: boolean;
    /**
     * @hidden
     */
    isMembersFilled?: boolean;
}
/**
 * Allows you to configure the pivot cell information retrieved from the data source.
 */
export interface IAxisSet {
    /**
     * It allows to set the formatted text.
     */
    formattedText?: string;
    /**
     * It allows to set the actual text.
     */
    actualText?: number | string;
    /**
     * It allows to set the member type.
     */
    type?: string;
    /**
     * It allows to set whether the member is drilled or not.
     */
    isDrilled?: boolean;
    /**
     * It allows to set whether the member has children or not.
     */
    hasChild?: boolean;
    /**
     * It allows to set the child members collection of the specific member.
     */
    members?: this[];
    /**
     * Specifies its position collections in data source.
     */
    index?: number[];
    /**
     * Specifies its position collections in data source with indexed object.
     */
    indexObject?: INumberIndex;
    /**
     * It allows to set the cell ordinal.
     */
    ordinal?: number;
    /**
     * It allows to set level of the member.
     */
    level?: number;
    /**
     * It allows to set the axis name of the member.
     */
    axis?: string;
    /**
     * It allows to set value of the cell.
     */
    value?: number;
    /**
     * It allows to set actual value of the cell.
     */
    actualValue?: number;
    /**
     * It allows to set column span to the cell.
     */
    colSpan?: number;
    /**
     * It allows to set row span to the cell.
     */
    rowSpan?: number;
    /**
     * Specifies the data collection which is to be framed for value sorted members.
     */
    valueSort?: IDataSet;
    /**
     * It allows to set column index to the cell.
     */
    colIndex?: number;
    /**
     * It allows to set row index to the cell.
     */
    rowIndex?: number;
    /**
     * Specifies the column header of a value cell.
     */
    columnHeaders?: string | number | Date;
    /**
     * Specifies the row header of a value cell.
     */
    rowHeaders?: string | number | Date;
    /**
     * Specifies whether the cell is summary or not.
     */
    isSum?: boolean;
    /**
     * Specifies whether the cell is grand summary or not.
     */
    isGrandSum?: boolean;
    /**
     * Specifies whether the level of the cell is filtered or not.
     */
    isLevelFiltered?: boolean;
    /**
     * It allows to custom class names to the cell.
     */
    cssClass?: string;
    /**
     * It allows to set the style information for conditional formatting.
     */
    style?: IStyle;
    /**
     * It allows to set the visibility of hyperlink to the cell.
     */
    enableHyperlink?: boolean;
    /**
     * It allows enable/disable sub totals.
     */
    showSubTotals?: boolean;
    /**
     * It allows set the formatted date string of the cell.
     */
    dateText?: number | string;
    /**
     * It allows to set member type.
     */
    memberType?: number;
    /**
     * It allows to set the parent unique name.
     */
    parentUniqueName?: string;
    /**
     * It allows to set the parent unique name.
     */
    levelUniqueName?: string;
    /**
     * It allows to set whether the member field is a attribute hierarchy or not.
     */
    hierarchy?: string;
    /**
     * It allows to set column ordinal of the cell.
     */
    colOrdinal?: number;
    /**
     * It allows to set row ordinal of the cell.
     */
    rowOrdinal?: number;
    /**
     * It allows to set whether field is a namedset or not.
     */
    isNamedSet?: boolean;
    /**
     * It allows to set depth of the cell.
     */
    depth?: number;
    /**
     * Specifies the value cell's unique header name.
     *
     * @hidden
     */
    hierarchyName?: string;
}
/**
 * Allows you to configure the drill information of a specific field item that used to display the pivot table.
 */
export interface IDrilledItem {
    /**
     * It allows to set the field name whose members to be drilled.
     */
    fieldName: string;
    /**
     * It allows to set the member name of the specific field.
     */
    memberName: string;
    /**
     * It allows to set the axis name of the specific field.
     */
    axis: string;
    /**
     * It allows to set whether the member performs drill-down or drill-up operation.
     */
    action: string;
    /**
     * It allows to set the delimiter, which is used a member separator.
     */
    delimiter: string;
    /**
     * It allows to set the selected cell information.
     */
    currentCell?: IAxisSet;
}
/**
 * Allows you to configure the additional properties from the pivot component to popuplate the pivot engine.
 *
 * @hidden
 */
export interface ICustomProperties {
    /**
     * Specifies the current data type.
     */
    mode?: string;
    /**
     * Specifies the saved field list information.
     */
    savedFieldList?: IFieldListOptions;
    /**
     * Specifies the paging information for virtualization.
     */
    pageSettings?: IPageSettings;
    /**
     * Specifies the whether the value sorting is enabled or not.
     */
    enableValueSorting?: boolean;
    /**
     * Specifies the whether the paging option is enabled or not.
     */
    enablePaging?: boolean;
    /**
     * Specifies the whether the virtualization option is enabled or not.
     */
    enableVirtualization?: boolean;
    /**
     * Specifies the whether the data compression option is enabled or not.
     */
    allowDataCompression?: boolean;
    /**
     * Specifies the whether drill through is enabled or not.
     */
    isDrillThrough?: boolean;
    /**
     * Specifies the whether html sanitizer is enabled or not.
     */
    enableHtmlSanitizer?: boolean;
    /**
     * Specifies the current locale information of the component.
     */
    localeObj?: L10n;
    /**
     * Specifies the current culture information of the component.
     */
    globalize?: Internationalization;
    /**
     * Specifies the current currency code of the component.
     */
    currenyCode?: string;
    /**
     * Specifies the customized field type information.
     */
    fieldsType?: IStringIndex;
    /**
     * Specifies the cloned report.
     */
    clonedReport?: IDataOptions;
    /**
     * Specifies whether the allowSinglePage option is enabled or not.
     */
    enableOptimizedRendering?: boolean;
    /**
     * Specifies whether the Tabular layout option is enabled or not.
     */
    isTabularLayout?: boolean;
}
/**
 * @hidden
 */
interface IValueFields {
    [index: string]: IFieldOptions;
}
/**
 * Allows specific fields to group their data on the basis of their type.
 * For example, the date type fields can be formatted and displayed based on year, quarter, month, and more. Likewise, the number type fields can be grouped range-wise, such as 1-5, 6-10, etc.
 * You can perform custom group to the string type fields that used to displayed in the pivot table.
 */
export interface IGroupSettings {
    /**
     * It allows to set the specific field name to apply group settings.
     */
    name?: string;
    /**
     * It allows to specify the date group intervals such as years or quarter or months or days or hours or minutes or seconds to group fields based on that in the pivot table. They options are:
     * * Years - Specifies the group as years.
     * * Quarters - Specifies the group as quarters.
     * * Months - Specifies the group as months.
     * * Days - Specifies the group as days.
     * * Hours - Specifies the group as hours.
     * * Minutes - Specifies the group as minutes.
     * * Seconds - Specifies the group as seconds.
     *
     * > It is applicable only for date type grouping.
     */
    groupInterval?: DateGroup[];
    /**
     * It allows to set the start value/date to group fields from the specified range that to be displayed in the pivot table.
     */
    startingAt?: Date | number | string;
    /**
     * It allows to set the start value/date to group fields to the specified range that to be displayed in the pivot table.
     */
    endingAt?: Date | number | string;
    /**
     * It allows to set the interval range to group field based on the specified range.
     * > It is applicable only of number type grouping.
     */
    rangeInterval?: number;
    /**
     * It allows to set the type as date or number or custom to the specified field for apply grouping. The types are:
     * * Date - Defines group type as 'Date' for date type field
     * * Number - Defines group type as 'Number' for numeric type field.
     * * Custom - Defines group type as 'Custom' for custom group field.
     */
    type?: GroupType;
    /**
     * It allows to set the caption to custom field that will be used to created from custom group fields in the pivot table.
     * > It is applicable only for custom grouping.
     */
    caption?: string;
    /**
     * It allows to set the custom group information to create custom group fields.
     * > It is applicable only for custom grouping.
     */
    customGroups?: ICustomGroups[];
}
/**
 * Allows to specify the custom group information of specific field to create custom groups.
 */
export interface ICustomGroups {
    /**
     * Allows user to set the group name (or title) for selected headers for custom grouping.
     */
    groupName?: string;
    /**
     * It allows to set the headers which needs to be grouped from display.
     */
    items?: string[];
}
/**
 * Allows to configure the group range information to perform date and number grouping on specific fields.
 */
export interface IGroupRange {
    /**
     * Specifies the group range value.
     */
    range?: string;
    /**
     * Specifies whether the group value is in range or not.
     */
    isNotInRange?: boolean;
    /**
     * Specifies the actual value exists in the raw item.
     */
    value?: Date | number;
}
/**
 * Allows to configure the specific field information during UI operation at runtime.
 */
export interface FieldItemInfo {
    /**
     * Specifies the field name.
     */
    fieldName?: string;
    /**
     * Specifies the field information as an object.
     */
    fieldItem?: IFieldOptions;
    /**
     * Specifies the axis name where the field currently exists.
     */
    axis?: string;
    /**
     * Specifies the position of the field in the axis.
     */
    position?: number;
}
export {};
