import { NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { TextAlign, ClipMode, ValueAccessor, IEditCell, IFilter } from '@syncfusion/ej2-grids';
import { IGanttCellFormatter } from '../base/interface';
import { SortComparer } from '@syncfusion/ej2-grids';
/**
 * Configures column collection in Gantt.
 */
export declare class Column {
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default, all columns are editable.
     *
     * @default true
     */
    allowEditing: boolean;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default, all columns can be reorder.
     *
     * @default true
     */
    allowReordering: boolean;
    /**
     * If `allowResizing` is set to false, it disables resize option of a particular column.
     * By default, all the columns can be resized.
     *
     * @default true
     */
    allowResizing: boolean;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default, all columns are sortable.
     *
     * @default true
     */
    allowSorting: boolean;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default, all columns are filterable.
     *
     * @default true
     */
    allowFiltering: boolean;
    /**
     * It is used to customize the default filter options for a specific columns.
     * * ui - to render custom component for specific column. It has following functions:
     * * ui.create – It is used for creating custom components.
     * * ui.read - It is used for read the value from the component.
     * * ui.write - It is used to apply component model as dynamically.
     *
     * @default null
     */
    filter: IFilter;
    /**
     * Defines the overflow mode for cell content. The available modes are:
     * * `Clip` - Truncates the cell content when it overflows its area.
     * * `Ellipsis` - Displays an ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays an ellipsis when the cell content overflows its area, and shows a tooltip on hover over the ellipsis.
     *
     * @default Syncfusion.EJ2.Grids.ClipMode.EllipsisWithTooltip
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.ClipMode
     */
    clipMode: ClipMode;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     *
     * @default null
     */
    customAttributes: {
        [x: string]: Object;
    };
    /**
     * If `disableHtmlEncode` is set to true, it disables HTML encoding for the content of specific columns.
     *
     * @default false
     */
    disableHtmlEncode: boolean;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.
     *
     * @default false
     */
    displayAsCheckBox: boolean;
    /**
     * Defines the type of component used for editing the field.
     *
     * @default 'stringedit'
     */
    editType: string;
    /**
     * Defines validation rules for data before creating or updating records.
     * The rules are used to ensure that data meets specific criteria before it is saved or updated.
     *
     * @default null
     */
    validationRules: Object;
    /**
     * Defines the custom sort comparer function.
     */
    sortComparer: SortComparer | string;
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.
     */
    field: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](https://ej2.syncfusion.com/documentation/common/internationalization/#number-formatting)
     * and [`date`](https://ej2.syncfusion.com/documentation/common/internationalization/#date-formatting) formats.
     *
     * @default null
     * @aspType string
     */
    format: string | NumberFormatOptions | DateFormatOptions;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.
     *
     * @default null
     */
    formatter: {
        new (): IGanttCellFormatter;
    } | Function | IGanttCellFormatter;
    /**
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.
     *
     * @default null
     * @aspType string
     */
    headerTemplate: string | Function;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.
     *
     * @default null
     */
    headerText: string;
    /**
     * Define the alignment of column header which is used to align the text of column header.
     *
     * @default Syncfusion.EJ2.Grids.TextAlign.Left
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.TextAlign
     */
    headerTextAlign: TextAlign;
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.
     *
     * @default null
     */
    hideAtMedia: string;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.
     *
     * @default null
     */
    maxWidth: string | number;
    /**
     * Defines the minimum width of the column in pixels or percentage.
     *
     * @default null
     */
    minWidth: string | number;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either template string or HTML element ID.
     *
     * @default null
     * @aspType string
     */
    template: string | Function;
    /**
     * Defines the alignment of the column in both header and content cells.
     *
     * @default Syncfusion.EJ2.Grids.TextAlign.Left
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.TextAlign
     */
    textAlign: TextAlign;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.
     *
     * @default null
     */
    valueAccessor: ValueAccessor | string;
    /**
     * If `visible` is set to false, hides the particular column. By default, columns are displayed.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Defines the width of the column in pixels or percentage.
     *
     * @default null
     */
    width: string | number;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.
     *
     * @default false
     */
    isPrimaryKey: boolean;
    /**
     * Defines the `IEditCell` object to customize default edit cell.
     *
     * @default {}
     */
    edit: IEditCell;
    constructor(options: ColumnModel);
}
/**
 * Interface for a class GanttColumn
 */
export interface ColumnModel {
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default all columns are editable.
     *
     * @default true
     */
    allowEditing?: boolean;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.
     *
     * @default true
     */
    allowReordering?: boolean;
    /**
     * If `allowResizing` is set to false, it disables resize option of a particular column.
     * By default all the columns can be resized.
     *
     * @default true
     */
    allowResizing?: boolean;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.
     *
     * @default true
     */
    allowSorting?: boolean;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default all columns are filterable.
     *
     * @default true
     */
    allowFiltering?: boolean;
    /**
     * Defines validation rules for data before creating or updating records.
     * The rules are used to ensure that data meets specific criteria before it is saved or updated.
     *
     * @default null
     */
    validationRules?: Object;
    /**
     * It is used to customize the default filter options for a specific columns.
     * * ui - to render custom component for specific column. It has following functions:
     * * ui.create - It is used for creating custom components.
     * * ui.read - It is used for read the value from the component.
     * * ui.write - It is used to apply component model as dynamically.
     *
     * @default null
     */
    filter?: IFilter;
    /**
     * Defines the overflow mode for cell content. The available modes are:
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays an ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays an ellipsis when the cell content overflows its area, and shows a tooltip on hover over the ellipsis.
     *
     * @default Syncfusion.EJ2.Grids.ClipMode.EllipsisWithTooltip
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.ClipMode
     */
    clipMode?: ClipMode;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     *
     * @default null
     */
    customAttributes?: {
        [x: string]: Object;
    };
    /**
     * If `disableHtmlEncode` is set to true, it disables HTML encoding for the content of specific column.
     *
     * @default false
     */
    disableHtmlEncode?: boolean;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.
     *
     * @default false
     */
    displayAsCheckBox?: boolean;
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.
     *
     * @default null
     */
    field?: string;
    /**
     * Defines the type of component used for editing the field.
     *
     * @default 'stringedit'
     */
    editType?: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](https://ej2.syncfusion.com/documentation/common/internationalization/#number-formatting)
     * and [`date`](https://ej2.syncfusion.com/documentation/common/internationalization/#date-formatting) formats.
     *
     * @default null
     * @aspType string
     */
    format?: string | NumberFormatOptions | DateFormatOptions;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.
     *
     * @default null
     */
    formatter?: {
        new (): IGanttCellFormatter;
    } | Function | IGanttCellFormatter;
    /**
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.
     *
     * @default null
     * @aspType string
     */
    headerTemplate?: string | Function;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.
     *
     * @default null
     */
    headerText?: string;
    /**
     * Define the alignment of column header which is used to align the text of column header.
     *
     * @default Syncfusion.EJ2.Grids.TextAlign.Left
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.TextAlign
     */
    headerTextAlign?: TextAlign;
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.
     *
     * @default null
     */
    hideAtMedia?: string;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.
     *
     * @default null
     */
    maxWidth?: string | number;
    /**
     * Defines the minimum width of the column in pixels or percentage.
     *
     * @default null
     */
    minWidth?: string | number;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either template string or HTML element ID.
     *
     * @default null
     * @aspType string
     */
    template?: string | Function;
    /**
     * Defines the alignment of the column in both header and content cells.
     *
     * @default Syncfusion.EJ2.Grids.TextAlign.Left
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.TextAlign
     */
    textAlign?: TextAlign;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.
     *
     * @default null
     */
    valueAccessor?: ValueAccessor | string;
    /**
     * If `visible` is set to false, hides the particular column. By default, columns are displayed.
     *
     * @default true
     */
    visible?: boolean;
    /**
     * Defines the width of the column in pixels or percentage.
     *
     * @default null
     */
    width?: string | number;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.
     *
     * @default false
     */
    isPrimaryKey?: boolean;
    /**
     * Defines the `IEditCell` object to customize default edit cell.
     *
     * @default {}
     */
    edit?: IEditCell;
    /**
     * To define column type.
     *
     * @private
     */
    type?: string;
    /**
     * Defines the sort comparer property.
     *
     * @default null
     */
    sortComparer?: SortComparer | string;
}
