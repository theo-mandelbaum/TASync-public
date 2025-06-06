import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-stacked-column` directive represent the stacked column of the Angular Grid.
 * It must be contained in a StackedColumns component(`e-stacked-columns`).
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column headerText='Details' width='100'>
 *       <e-stacked-columns>
 *         <e-stacked-column field='Name' width='140'></e-stacked-column>
 *       </e-stacked-columns>
 *     </e-column>
 *   </e-columns>
 * </ejs-grid>
 * ```
 */
export declare class StackedColumnDirective extends ComplexBase<StackedColumnDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the data type of the column.
     * @default null
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
     * If `allowGrouping` set to false, then it disables grouping of a particular column.
     * By default all columns are groupable.
     * @default true
     */
    allowGrouping: any;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.
     * @default true
     */
    allowReordering: any;
    /**
     * If `allowResizing` set to false, it disables resize option of a particular column.
     * @default true
     */
    allowResizing: any;
    /**
     * If `allowSearching` set to false, then it disables Searching of a particular column.
     * By default all columns allow Searching.
     * @default true
     */
    allowSearching: any;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.
     * @default true
     */
    allowSorting: any;
    /**
     * If `autoFit` set to true, then the particular column content width will be
     * adjusted based on its content in the initial rendering itself.
     * Setting this property as true is equivalent to calling `autoFitColumns` method in the `dataBound` event.
     * @default false
     */
    autoFit: any;
    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
     * also it will display tooltip while hover on ellipsis applied cell.
     * @default Ellipsis
     */
    clipMode: any;
    /**
     * Used to render multiple header rows(stacked headers) on the Grid header.
     * @default null
     */
    columns: any;
    /**
     * `commands` provides an option to display command buttons in every cell.
     * The available built-in command buttons are
     * * Edit - Edit the record.
     * * Delete - Delete the record.
     * * Save - Save the record.
     * * Cancel - Cancel the edit state.
     *
     * The following code example implements the custom command column.
     *```html
     *<style type="text/css" class="cssStyles">
     *.details-icon:before
     *{
     *   content:"\e74d";
     *}
     *</style>
     *<div id="Grid"></div>
     *```
     *```typescript
     *var gridObj = new Grid({
     *datasource: window.gridData,
     *columns : [
     * { field: 'CustomerID', headerText: 'Customer ID' },
     * { field: 'CustomerName', headerText: 'Customer Name' },
     * {commands: [{buttonOption:{content: 'Details', click: onClick, cssClass: details-icon}}], headerText: 'Customer Details'}
     *]
     *gridObj.appendTo("#Grid");
     *```
     *
     * @default null
     */
    commands: any;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     *
     * ```html
     *<div id="Grid"></div>
     *```
     *```typescript
     *let gridObj: Grid = new Grid({
     *dataSource: filterData,
     *columns: [
     *   { field: 'OrderID', headerText: 'Order ID' },
     *   {
     *       field: 'EmployeeID', headerText: 'Employee ID', customAttributes: {
     *          class: 'employeeid',
     *          type: 'employee-id-cell'
     *     }
     *  }]
     *});
     *gridObj.appendTo('#Grid');
     *```
     *
     * @default null
     */
    customAttributes: any;
    /**
     * Defines the column data source  which will act as foreign data source.
     * @default null
     */
    dataSource: any;
    /**
     * Defines default values for the component when adding a new record to the Grid.
     * @default null
     * @asptype object
     */
    defaultValue: any;
    /**
     * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.
     * @default true
     */
    disableHtmlEncode: any;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.
     * @default false
     */
    displayAsCheckBox: any;
    /**
     * Defines the `IEditCell`(../../grid/edit/#cell-edit-template) object to customize default edit cell.
     * @default {}
     */
    edit: any;
    /**
     * Defines the type of component for editing.
     * @default 'stringedit'
     */
    editType: any;
    /**
     * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values.
     * By default no columns are group by format.
     * @default true
     */
    enableGroupByFormat: any;
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The bounded columns can be sort, filter and group etc.,
     * If the `field` name contains “dot”, then it is considered as complex binding.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.
     * @default ''
     */
    field: any;
    /**
     *  Defines the filter options to customize filtering for the particular column.
     * @default {}
     */
    filter: any;
    /**
     * The `filterBarTemplate` is used to add a custom component instead of default input component for filter bar.
     * It have create and read functions.
     * * create: It is used for creating custom components.
     * * read: It is used to perform custom filter action.
     *
     * ```html
     *<div id="Grid"></div>
     *```
     *```typescript
     *let gridObj: Grid = new Grid({
     *dataSource: filterData,
     *columns: [
     *  { field: 'OrderID', headerText: 'Order ID' },
     *  {
     *     field: 'EmployeeID', filterBarTemplate: {
     *        create: (args: { element: Element, column: Column }) => {
     *             let input: HTMLInputElement = document.createElement('input');
     *             input.id = 'EmployeeID';
     *             input.type = 'text';
     *             return input;
     *        },
     *        write: (args: { element: Element, column: Column }) => {
     *            args.element.addEventListener('input', args.column.filterBarTemplate.read as EventListener);
     *        },
     *        read: (args: { element: HTMLInputElement, columnIndex: number, column: Column }) => {
     *            gridObj.filterByColumn(args.element.id, 'equal', args.element.value);
     *       }
     *    }
     * }],
     *  allowFiltering: true
     *});
     *gridObj.appendTo('#Grid');
     *```
     *
     * @default null
     */
    filterBarTemplate: any;
    /**
     * Defines the mapping column name of the foreign data source.
     * If it is not defined then the `columns.field` will be considered as mapping column name
     * @default null
     */
    foreignKeyField: any;
    /**
     * Defines the display column name from the foreign data source which will be obtained from comparing local and foreign data
     * @default null
     */
    foreignKeyValue: any;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../../common/internationalization/#manipulating-numbers)
     * and [`date`](../../common/internationalization/#manipulating-datetime) formats.
     * @default null
     * @asptype string
     */
    format: any;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.
     *
     * ```html
     *<div id="Grid"></div>
     *```
     *```typescript
     *class ExtendedFormatter implements ICellFormatter {
     *public getValue(column: Column, data: Object): Object {
     *  return '<span style="color:' + (data['Verified'] ? 'green' : 'red') + '"><i>' + data['Verified'] + '</i><span>';
     *}
     *}
     *let gridObj: Grid = new Grid({
     *    dataSource: filterData,
     *    columns: [
     *        { field: 'ShipName', headerText: 'Ship Name' },
     *        { field: 'Verified', headerText: 'Verified Status', formatter: ExtendedFormatter }]
     *});
     *gridObj.appendTo('#Grid');
     *```
     *
     * @default null
     */
    formatter: any;
    /**
     * defines which side the column need to freeze
     * The available built-in freeze directions are
     * * Left - Freeze the column at left side.
     * * Right - Freeze the column at right side.
     * * Fixed - Freeze the column at Center.
     * * None - Does not freeze the column.
     * @default None
     */
    freeze: any;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.
     * @default null
     */
    headerText: any;
    /**
     * Define the alignment of column header which is used to align the text of column header.
     * @aspdefaultvalueignore
     * @default null
     */
    headerTextAlign: any;
    /**
     * Defines the method used to apply custom header cell values from external function and display this on each cell rendered.
     *
     * ```html
     *<div id="Grid"></div>
     *```
     *```typescript
     *let gridObj: Grid = new Grid({
     *dataSource: [{ EmployeeID: 1, EmployeeName: ['John', 'M'] }, { EmployeeID: 2, EmployeeName: ['Peter', 'A'] }],
     *columns: [
     *    { field: 'EmployeeID', headerText: 'Employee ID' },
     *    { field: 'EmployeeName', headerText: 'Employee First Name',
     *      headerValueAccessor: (field: string,column: Column) => {
     *            return "newheadername";
     *        },
     *    }]
     *});
     *```
     *
     * @default null
     */
    headerValueAccessor: any;
    /**
     * column visibility can change based on its [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.
     * @default ''
     */
    hideAtMedia: any;
    /**
     * Gets the unique identifier value of the column. It is used to get the object.
     * @default null
     */
    index: any;
    /**
     * You can use this property to freeze selected columns in grid.
     * @default false
     */
    isFrozen: any;
    /**
     * If `isIdentity` is set to true, then this column is considered as identity column.
     * @default false
     */
    isIdentity: any;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.
     * @default false
     */
    isPrimaryKey: any;
    /**
     * Defines the mapping column name of the foreign data source.
     * If it is not defined then the `columns.field` will be considered as mapping column name
     * @default false
     */
    lockColumn: any;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.
     * @default ''
     */
    maxWidth: any;
    /**
     * Defines the minimum width of the column in pixels or percentage.
     * @default ''
     */
    minWidth: any;
    /**
     * If `showColumnMenu` set to false, then it disable the column menu of a particular column.
     * By default column menu will show for all columns
     * @default true
     */
    showColumnMenu: any;
    /**
     * If `showInColumnChooser` set to false, then hides the particular column in column chooser.
     * By default all columns are displayed in column Chooser.
     * @default true
     */
    showInColumnChooser: any;
    /**
     * It defines the custom sort comparer function.
     */
    sortComparer: any;
    /**
     * Determines the behavior of the `aria-label` attribute for cells in template columns.
     * If enableAriaLabel is set to false, the aria-label attribute is not applied to template column cells, which affects screen reader accessibility.
     * @default {}
     */
    templateOptions: any;
    /**
     * Defines the alignment of the column in both header and content cells.
     * @default Left
     */
    textAlign: any;
    /**
     * Gets the unique identifier value of the column. It is used to get the object.
     * @default ''
     */
    uid: any;
    /**
     * `editType`(../../grid/edit/#cell-edit-type-and-its-params) Defines rules to validate data before creating and updating.
     * @default null
     */
    validationRules: any;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.
     *
     * ```html
     *<div id="Grid"></div>
     *```
     *```typescript
     *let gridObj: Grid = new Grid({
     *dataSource: [{ EmployeeID: 1, EmployeeName: ['John', 'M'] }, { EmployeeID: 2, EmployeeName: ['Peter', 'A'] }],
     *columns: [
     *    { field: 'EmployeeID', headerText: 'Employee ID' },
     *    { field: 'EmployeeName', headerText: 'Employee First Name',
     *      valueAccessor: (field: string, data: Object, column: Column) => {
     *            return data['EmployeeName'][0];
     *        },
     *    }]
     *});
     *```
     *
     * @default null
     */
    valueAccessor: any;
    /**
     * If `visible` is set to false, hides the particular column. By default, all columns are displayed.
     * @default true
     */
    visible: any;
    /**
     * Defines the width of the column in pixels or percentage.
     * @default ''
     */
    width: any;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either [template string](../../common/template-engine/) or HTML element ID.
     * @default null
     * @asptype string
     */
    template: any;
    /**
     * Defines the column template as string or HTML element ID which is used to add customized element in the column header.
     * @default null
     * @asptype string
     */
    headerTemplate: any;
    commandsTemplate: any;
    filter_itemTemplate: any;
    /**
     * Defines the cell edit template that used as editor for a particular column.
     * It accepts either template string or HTML element ID.
     * @default null
     * @asptype string
     */
    editTemplate: any;
    /**
     * Defines the filter template/UI that used as filter for a particular column.
     * It accepts either template string or HTML element ID.
     * @default null
     * @asptype string
     */
    filterTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<StackedColumnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StackedColumnDirective, "ejs-grid>e-columns>e-column>e-stacked-columns>e-stacked-column", never, { "allowEditing": "allowEditing"; "allowFiltering": "allowFiltering"; "allowGrouping": "allowGrouping"; "allowReordering": "allowReordering"; "allowResizing": "allowResizing"; "allowSearching": "allowSearching"; "allowSorting": "allowSorting"; "autoFit": "autoFit"; "clipMode": "clipMode"; "columns": "columns"; "commands": "commands"; "customAttributes": "customAttributes"; "dataSource": "dataSource"; "defaultValue": "defaultValue"; "disableHtmlEncode": "disableHtmlEncode"; "displayAsCheckBox": "displayAsCheckBox"; "edit": "edit"; "editTemplate": "editTemplate"; "editType": "editType"; "enableGroupByFormat": "enableGroupByFormat"; "field": "field"; "filter": "filter"; "filterBarTemplate": "filterBarTemplate"; "filterTemplate": "filterTemplate"; "foreignKeyField": "foreignKeyField"; "foreignKeyValue": "foreignKeyValue"; "format": "format"; "formatter": "formatter"; "freeze": "freeze"; "headerTemplate": "headerTemplate"; "headerText": "headerText"; "headerTextAlign": "headerTextAlign"; "headerValueAccessor": "headerValueAccessor"; "hideAtMedia": "hideAtMedia"; "index": "index"; "isFrozen": "isFrozen"; "isIdentity": "isIdentity"; "isPrimaryKey": "isPrimaryKey"; "lockColumn": "lockColumn"; "maxWidth": "maxWidth"; "minWidth": "minWidth"; "showColumnMenu": "showColumnMenu"; "showInColumnChooser": "showInColumnChooser"; "sortComparer": "sortComparer"; "template": "template"; "templateOptions": "templateOptions"; "textAlign": "textAlign"; "type": "type"; "uid": "uid"; "validationRules": "validationRules"; "valueAccessor": "valueAccessor"; "visible": "visible"; "width": "width"; }, {}, ["template", "headerTemplate", "commandsTemplate", "filter_itemTemplate", "editTemplate", "filterTemplate"]>;
}
/**
 * StackedColumn Array Directive
 * @private
 */
export declare class StackedColumnsDirective extends ArrayBase<StackedColumnsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<StackedColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StackedColumnsDirective, "ejs-grid>e-columns>e-column>e-stacked-columns", never, {}, {}, ["children"]>;
}
