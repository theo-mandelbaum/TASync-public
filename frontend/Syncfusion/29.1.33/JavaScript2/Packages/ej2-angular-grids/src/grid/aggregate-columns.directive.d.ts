import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the Angular Grid.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'></e-column>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-grid>
 * ```
 */
export declare class AggregateColumnDirective extends ComplexBase<AggregateColumnDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines the aggregate type of a particular column.
     * To use multiple aggregates for single column, specify the `type` as array.
     * Types of aggregate are,
     * * sum
     * * average
     * * max
     * * min
     * * count
     * * truecount
     * * falsecount
     * * custom
     * > Specify the `type` value as `custom` to use custom aggregation.
     * @default null
     * @asptype string
     */
    type: any;
    /**
     * Defines the column name to display the aggregate value. If `columnName` is not defined,
     * then `field` name value will be assigned to the `columnName` property.
     * @default null
     */
    columnName: any;
    /**
     * Defines a function to calculate custom aggregate value. The `type` value should be set to `custom`.
     * To use custom aggregate value in the template, use the key as `${custom}`.
     * **Total aggregation**: The custom function will be called with the whole data and the current `AggregateColumn` object.
     * **Group aggregation**: This will be called with the current group details and the `AggregateColumn` object.
     * @default null
     */
    customAggregate: any;
    /**
     * Defines the column name to perform aggregation.
     * @default null
     */
    field: any;
    /**
     * Format is applied to a calculated value before it is displayed.
     * Gets the format from the user, which can be standard or custom
     * [`number`](../../common/internationalization/#number-formatting/)
     * and [`date`](../../common/internationalization/#number-formatting/) formats.
     * @asptype string
     * @blazortype string
     * @default null
     */
    format: any;
    /**
     * Defines the footer cell template as a string for the aggregate column.
     * The `type` name should be used to access aggregate values inside the template.
     *
     * {% codeBlock src="grid/footer-template-api/index.ts" %}{% endcodeBlock %}
     *
     * @default null
     * @asptype string
     */
    footerTemplate: any;
    /**
     * Defines the group footer cell template as a string for the aggregate column.
     * The `type` name should be used to access aggregate values inside the template.
     * Additionally, the following fields can be accessed in the template.
     * * **field**: The current grouped field.
     * * **key**: The current grouped value.
     *
     * {% codeBlock src="grid/group-footer-api/index.ts" %}{% endcodeBlock %}
     *
     * @default null
     * @asptype string
     */
    groupFooterTemplate: any;
    /**
     * Defines the group caption cell template as a string for the aggregate column.
     * The `type` name should be used to access aggregate values inside the template.
     * Additionally, the following fields can be accessed in the template.
     * * **field**: The current grouped field name.
     * * **key**: The current grouped field value.
     *
     * {% codeBlock src="grid/group-caption-api/index.ts" %}{% endcodeBlock %}
     *
     * @default null
     * @asptype string
     */
    groupCaptionTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AggregateColumnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AggregateColumnDirective, "ejs-grid>e-aggregates>e-aggregate>e-columns>e-column", never, { "columnName": "columnName"; "customAggregate": "customAggregate"; "field": "field"; "footerTemplate": "footerTemplate"; "format": "format"; "groupCaptionTemplate": "groupCaptionTemplate"; "groupFooterTemplate": "groupFooterTemplate"; "type": "type"; }, {}, ["footerTemplate", "groupFooterTemplate", "groupCaptionTemplate"]>;
}
/**
 * AggregateColumn Array Directive
 * @private
 */
export declare class AggregateColumnsDirective extends ArrayBase<AggregateColumnsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AggregateColumnsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AggregateColumnsDirective, "ejs-grid>e-aggregates>e-aggregate>e-columns", never, {}, {}, ["children"]>;
}
