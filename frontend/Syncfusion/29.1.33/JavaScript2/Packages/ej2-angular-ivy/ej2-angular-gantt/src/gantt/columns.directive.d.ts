import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-column` directive represent a column of the Angular Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='150'></e-column>
 *    <e-column field='taskName' headerText='Task Name' width='200'></e-column>
 *   </e-columns>
 * </ejs-gantt>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * To define column type.
     */
    type: any;
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default all columns are editable.
     * @default true
     */
    allowEditing: any;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default all columns are filterable.
     * @default true
     */
    allowFiltering: any;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.
     * @default true
     */
    allowReordering: any;
    /**
     * If `allowResizing` is set to false, it disables resize option of a particular column.
     * By default all the columns can be resized.
     * @default true
     */
    allowResizing: any;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.
     * @default true
     */
    allowSorting: any;
    /**
     * Defines the overflow mode for cell content. The available modes are:
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays an ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays an ellipsis when the cell content overflows its area, and shows a tooltip on hover over the ellipsis.
     * @default Syncfusion.EJ2.Grids.ClipMode.EllipsisWithTooltip
     * @isenumeration true
     * @asptype Syncfusion.EJ2.Grids.ClipMode
     */
    clipMode: any;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     * @default null
     */
    customAttributes: any;
    /**
     * If `disableHtmlEncode` is set to true, it disables HTML encoding for the content of specific column.
     * @default false
     */
    disableHtmlEncode: any;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.
     * @default false
     */
    displayAsCheckBox: any;
    /**
     * Defines the `IEditCell` object to customize default edit cell.
     * @default {}
     */
    edit: any;
    /**
     * Defines the type of component used for editing the field.
     * @default 'stringedit'
     */
    editType: any;
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.
     * @default null
     */
    field: any;
    /**
     * It is used to customize the default filter options for a specific columns.
     * * ui - to render custom component for specific column. It has following functions:
     * * ui.create - It is used for creating custom components.
     * * ui.read - It is used for read the value from the component.
     * * ui.write - It is used to apply component model as dynamically.
     * @default null
     */
    filter: any;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](https://ej2.syncfusion.com/documentation/common/internationalization/#number-formatting)
     * and [`date`](https://ej2.syncfusion.com/documentation/common/internationalization/#date-formatting) formats.
     * @default null
     * @asptype string
     */
    format: any;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.
     * @default null
     */
    formatter: any;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.
     * @default null
     */
    headerText: any;
    /**
     * Define the alignment of column header which is used to align the text of column header.
     * @default Syncfusion.EJ2.Grids.TextAlign.Left
     * @isenumeration true
     * @asptype Syncfusion.EJ2.Grids.TextAlign
     */
    headerTextAlign: any;
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.
     * @default null
     */
    hideAtMedia: any;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.
     * @default false
     */
    isPrimaryKey: any;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.
     * @default null
     */
    maxWidth: any;
    /**
     * Defines the minimum width of the column in pixels or percentage.
     * @default null
     */
    minWidth: any;
    /**
     * Defines the sort comparer property.
     * @default null
     */
    sortComparer: any;
    /**
     * Defines the alignment of the column in both header and content cells.
     * @default Syncfusion.EJ2.Grids.TextAlign.Left
     * @isenumeration true
     * @asptype Syncfusion.EJ2.Grids.TextAlign
     */
    textAlign: any;
    /**
     * Defines validation rules for data before creating or updating records.
     * The rules are used to ensure that data meets specific criteria before it is saved or updated.
     * @default null
     */
    validationRules: any;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.
     * @default null
     */
    valueAccessor: any;
    /**
     * If `visible` is set to false, hides the particular column. By default, columns are displayed.
     * @default true
     */
    visible: any;
    /**
     * Defines the width of the column in pixels or percentage.
     * @default null
     */
    width: any;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either template string or HTML element ID.
     * @default null
     * @asptype string
     */
    template: any;
    /**
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.
     * @default null
     * @asptype string
     */
    headerTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColumnDirective, "ejs-gantt>e-columns>e-column", never, { "allowEditing": "allowEditing"; "allowFiltering": "allowFiltering"; "allowReordering": "allowReordering"; "allowResizing": "allowResizing"; "allowSorting": "allowSorting"; "clipMode": "clipMode"; "customAttributes": "customAttributes"; "disableHtmlEncode": "disableHtmlEncode"; "displayAsCheckBox": "displayAsCheckBox"; "edit": "edit"; "editType": "editType"; "field": "field"; "filter": "filter"; "format": "format"; "formatter": "formatter"; "headerTemplate": "headerTemplate"; "headerText": "headerText"; "headerTextAlign": "headerTextAlign"; "hideAtMedia": "hideAtMedia"; "isPrimaryKey": "isPrimaryKey"; "maxWidth": "maxWidth"; "minWidth": "minWidth"; "sortComparer": "sortComparer"; "template": "template"; "textAlign": "textAlign"; "type": "type"; "validationRules": "validationRules"; "valueAccessor": "valueAccessor"; "visible": "visible"; "width": "width"; }, {}, ["template", "headerTemplate"]>;
}
/**
 * Column Array Directive
 * @private
 */
export declare class ColumnsDirective extends ArrayBase<ColumnsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColumnsDirective, "ejs-gantt>e-columns", never, {}, {}, ["children"]>;
}
