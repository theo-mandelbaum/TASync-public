import { IDataOptions, IFieldOptions, IFilter, ISort, IFormatSettings, IFieldListOptions, IMembers, PivotEngine, IDataSet } from './engine';
import { IDrillOptions, IGroupSettings, FieldItemInfo } from './engine';
import { ICalculatedFieldSettings, IGridValues, IAxisSet } from './engine';
import { PivotView, PivotViewModel } from '../pivotview';
import { PivotFieldList, PivotFieldListModel } from '../pivotfieldlist';
import { IOlapCustomProperties, IOlapField, IOlapFieldListOptions } from './olap/engine';
import { HeadersSortEventArgs } from '../common/base/interface';
import { PdfPageSize } from '@syncfusion/ej2-grids';
import { SizeF } from '@syncfusion/ej2-pdf-export';
import { PivotChart } from '../pivotchart/base/pivotchart';
/**
 * This is a file to perform common utility for OLAP and Relational datasource
 *
 * @hidden
 */
export declare class PivotUtil {
    static getType(value: string | number | Date): string;
    static resetTime(date: Date): Date;
    static getClonedData(data: {
        [key: string]: Object;
    }[]): {
        [key: string]: Object;
    }[];
    static getClonedCSVData(data: string[][]): string[][];
    private static getDefinedObj;
    static inArray(value: Object, collection: Object[]): number;
    static setPivotProperties(control: PivotView | PivotFieldList, properties: {
        [key: string]: Object;
    }): void;
    static getClonedDataSourceSettings(dataSourceSettings: IDataOptions): IDataOptions;
    static getClonedFieldList(fieldListObj: IFieldListOptions | IOlapFieldListOptions, isMemberIncluded?: boolean): IFieldListOptions | IOlapFieldListOptions;
    static cloneDateMembers(collection: IAxisSet[]): IAxisSet[];
    static cloneFormatMembers(collection: IMembers): IMembers;
    static cloneFieldMembers(collection: IOlapField[]): IOlapField[];
    static updateDataSourceSettings(control: PivotView | PivotFieldList, dataSourceSettings: IDataOptions): void;
    static cloneFieldSettings(collection: IFieldOptions[]): IFieldOptions[];
    static cloneOlapFieldSettings(collection: IOlapField[]): IOlapField[];
    static cloneFilterSettings(collection: IFilter[]): IFilter[];
    private static cloneSortSettings;
    /**
     * It format the headers of pivot table.
     *
     * @param {IAxisSet} headerCell - It contains the header cell.
     * @param {PivotEngine} engine - It contains the instance of pivot engine.
     * @returns {IAxisSet} - It returns the formatted header data as IAxisSet.
     * @hidden
     */
    static getFormattedHeader(headerCell: IAxisSet, engine: PivotEngine): IAxisSet;
    /**
     * It format the members of field.
     *
     * @param {IMembers} members - It contains the members.
     * @param {string} fieldName - It contains the field Name.
     * @param {PivotEngine} engine - It contains the instance of pivot engine.
     * @returns {IMembers} - It returns the formatted members as IMembers.
     * @hidden
     */
    static getFormattedMembers(members: IMembers, fieldName: string, engine: PivotEngine): IMembers;
    /**
     * It determines whether the specified field is of date type.
     *
     * @param {string} fieldName - It contains the field Name.
     * @param {PivotEngine} engineModule - It contains the instance of pivot engine.
     * @returns {boolean} - It  returns whether the field is of date type or not.
     * @hidden
     */
    static isDateField(fieldName: string, engineModule: PivotEngine): boolean;
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
    static formatChartHeaders(values: string[], chartModule: PivotChart, isColumnHeader: boolean, cell?: IAxisSet): string;
    static cloneDrillMemberSettings(collection: IDrillOptions[]): IDrillOptions[];
    static cloneFormatSettings(collection: IFormatSettings[]): IFormatSettings[];
    private static CloneValueSortObject;
    private static CloneAuthenticationObject;
    static cloneCalculatedFieldSettings(collection: ICalculatedFieldSettings[]): ICalculatedFieldSettings[];
    private static cloneConditionalFormattingSettings;
    static cloneGroupSettings(collection: IGroupSettings[]): IGroupSettings[];
    private static cloneCustomGroups;
    static getFilterItemByName(fieldName: string, fields: IFilter[]): IFilter;
    static getFieldByName(fieldName: string, fields: IFieldOptions[] | ISort[] | IFormatSettings[] | IDrillOptions[] | IGroupSettings[] | ICalculatedFieldSettings[]): IFieldOptions | ISort | IFormatSettings | IDrillOptions | IGroupSettings | ICalculatedFieldSettings;
    static getFieldInfo(fieldName: string, control: PivotView | PivotFieldList, hasAllField?: boolean): FieldItemInfo;
    static isButtonIconRefesh(prop: string, oldProp: PivotViewModel | PivotFieldListModel, newProp: PivotViewModel | PivotFieldListModel): boolean;
    static formatPivotValues(pivotValues: {
        [key: string]: Object;
    }[][]): IAxisSet[][];
    static formatFieldList(fieldList: {
        [key: string]: {
            [key: string]: Object;
        };
    }): {
        [key: string]: Object;
    };
    static frameContent(pivotValues: IAxisSet[][], type: string, rowPosition: number, control: PivotView | PivotFieldList): IGridValues;
    static getLocalizedObject(control: PivotView | PivotFieldList): Object;
    static updateReport(control: PivotView | PivotFieldList, report: {
        Rows: {
            [key: string]: Object;
        }[];
        Columns: {
            [key: string]: Object;
        }[];
        FormatSettings: {
            [key: string]: Object;
        }[];
    }): void;
    static generateUUID(): string;
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
    static applyCustomSort(sortDetails: HeadersSortEventArgs, sortMembersOrder: IAxisSet[], type: string | boolean, hasMembersOrder?: boolean, isOlap?: boolean): IAxisSet[];
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
    static applyHeadersSort(sortMembersOrder: IAxisSet[], sortOrder: string, type: string | boolean, isNumberGroupSorting?: boolean): IAxisSet[];
    /**
     * It performs to render the olap engine.
     *
     * @param {PivotView | PivotFieldList} pivot - It specifies the pivotview and pivot field list component instance.
     * @param {IOlapCustomProperties} customProperties - It contains the internal properties that used for engine population.
     * @returns {void}
     * @hidden
     */
    static renderOlapEngine(pivot: PivotView | PivotFieldList, customProperties?: IOlapCustomProperties): void;
    /**
     *
     * @param {IDataSet | IAxisSet} header - It contains the value of header
     * @returns {IAxisSet} - It frame Header With Keys
     * @hidden */
    static frameHeaderWithKeys(header: IDataSet | IAxisSet): IAxisSet | IDataSet;
    /**
     *
     * @param {PdfPageSize} pageSize - It contains the value of page Size
     * @returns {SizeF} - It returns the value as SizeF
     * @hidden */
    static getPageSize(pageSize: PdfPageSize): SizeF;
    /**
     *
     * @param {any} aggreColl - It contains the selected header and its value cell collection, that should be sorted for value sorting.
     * @param {string} sortOrder - It denotes the sorting order.
     * @returns {IAxisSet[]} - It returns the sorted collection in the provided sort order.
     * @hidden */
    static getSortedValue(aggreColl: {
        'header': IAxisSet;
        'value'?: number;
    }[], sortOrder: string): IAxisSet[];
    static toggleFieldListIconVisibility(control: PivotView): void;
}
