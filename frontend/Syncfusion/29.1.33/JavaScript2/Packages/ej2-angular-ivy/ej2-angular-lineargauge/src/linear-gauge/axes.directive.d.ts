import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to render the axes in the Linear Gauge.
 * ```html
 * <e-axes><e-axis></e-axis></e-axes>
 * ```
 */
export declare class AxisDirective extends ComplexBase<AxisDirective> {
    private viewContainerRef;
    directivePropList: any;
    childRanges: any;
    childPointers: any;
    tags: string[];
    /**
     * Enables or disables the inversed axis.
     * @default false
     */
    isInversed: any;
    /**
     * Sets and gets the options for customizing the appearance of the label in axis.
     */
    labelStyle: any;
    /**
     * Sets and gets the options for customizing the appearance of the axis line.
     */
    line: any;
    /**
     * Sets and gets the options for customizing the major tick lines.
     */
    majorTicks: any;
    /**
     * Sets and gets the maximum value for the axis.
     * @default 100
     */
    maximum: any;
    /**
     * Sets and gets the minimum value for the axis.
     * @default 0
     */
    minimum: any;
    /**
     * Sets and gets the options for customizing the minor tick lines.
     */
    minorTicks: any;
    /**
     * Enables or disables the opposed position of the axis in the linear gauge.
     * @default false
     */
    opposedPosition: any;
    /**
     * Sets and gets the options for customizing the pointers of an axis.
     */
    pointers: any;
    /**
     * Sets and gets the options for customizing the ranges of an axis.
     */
    ranges: any;
    /**
     * Shows or hides the last label in the axis of the linear gauge.
     * @default false
     */
    showLastLabel: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AxisDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AxisDirective, "e-axes>e-axis", never, { "isInversed": "isInversed"; "labelStyle": "labelStyle"; "line": "line"; "majorTicks": "majorTicks"; "maximum": "maximum"; "minimum": "minimum"; "minorTicks": "minorTicks"; "opposedPosition": "opposedPosition"; "pointers": "pointers"; "ranges": "ranges"; "showLastLabel": "showLastLabel"; }, {}, ["childRanges", "childPointers"]>;
}
/**
 * Axis Array Directive
 * @private
 */
export declare class AxesDirective extends ArrayBase<AxesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AxesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AxesDirective, "ej-lineargauge>e-axes", never, {}, {}, ["children"]>;
}
