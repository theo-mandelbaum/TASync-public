import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-column` directive represent a column of the Angular MultiColumnComboBox.
 * It must be contained in a MultiColumnComboBox component(`ejs-multicolumncombobox`).
 * ```html
 * <ejs-multicolumncombobox [dataSource]='data'>
 *   <e-columns>
 *    <e-column field='ID' width='100'></e-column>
 *    <e-column field='name' header='Name' width='100'></e-column>
 *   </e-columns>
 * </ejs-multicolumncombobox>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     * @default null
     */
    customAttributes: any;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.
     * @default false
     */
    displayAsCheckBox: any;
    /**
     * Defines the name of the field whose data will be displayed in the column.
     * @default ''
     */
    field: any;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom `number` and `date` formats.
     * @default null
     * @asptype string
     */
    format: any;
    /**
     * Defines the header text of column which is used to display in column header.
     * If headerText is not defined, then field name value will be assigned to header text.
     * @default ''
     */
    header: any;
    /**
     * Defines the alignment of the column in both header and content cells.
     * @default Left
     */
    textAlign: any;
    /**
     * Defines the width of the column in pixels or percentage.
     * @default ''
     */
    width: any;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either template or HTML element ID.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    template: any;
    /**
     * Defines the column template as string or HTML element ID which is used to add customized element in the column header.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    headerTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColumnDirective, "ejs-multicolumncombobox>e-columns>e-column", never, { "customAttributes": "customAttributes"; "displayAsCheckBox": "displayAsCheckBox"; "field": "field"; "format": "format"; "header": "header"; "headerTemplate": "headerTemplate"; "template": "template"; "textAlign": "textAlign"; "width": "width"; }, {}, ["template", "headerTemplate"]>;
}
/**
 * Column Array Directive
 * @private
 */
export declare class ColumnsDirective extends ArrayBase<ColumnsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColumnsDirective, "ejs-multicolumncombobox>e-columns", never, {}, {}, ["children"]>;
}
