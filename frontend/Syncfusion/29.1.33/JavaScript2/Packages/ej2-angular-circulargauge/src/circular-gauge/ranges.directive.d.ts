import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Represents the directive to render and customize the ranges in an axis of circular gauge.
 * ```html
 * <e-ranges><e-range></e-range></e-ranges>
 * ```
 */
export declare class RangeDirective extends ComplexBase<RangeDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Sets and gets the color of the ranges in circular gauge.
     * @aspdefaultvalueignore
     * @default null
     */
    color: any;
    /**
     * Sets and gets the end value of the range in circular gauge.
     * @aspdefaultvalueignore
     * @default 0
     */
    end: any;
    /**
     * Sets and gets the width for the end of the range in the circular gauge.
     * @default '10'
     */
    endWidth: any;
    /**
     * Sets and gets the text to be displayed for the corresponding legend item in the legend of the circular gauge.
     * @default ''
     */
    legendText: any;
    /**
     * Sets and gets the properties to render a linear gradient for the range.
     * If both linear and radial gradient is set, then the linear gradient will be rendered in the range.
     * @default null
     */
    linearGradient: any;
    /**
     * Sets and gets the offset value for the range from which it is to be placed from the axis in circular gauge.
     * @default '0'
     */
    offset: any;
    /**
     * Sets and gets the opacity for the ranges in circular gauge.
     * @default 1
     */
    opacity: any;
    /**
     * Sets and gets the position of the range in the axis in circular gauge.
     * @default Auto
     */
    position: any;
    /**
     * Sets and gets the properties to render a radial gradient for the range.
     * @default null
     */
    radialGradient: any;
    /**
     * Sets and gets the radius of the range for circular gauge.
     * @default null
     */
    radius: any;
    /**
     * Sets and gets the corner radius for ranges in circular gauge.
     * @default 0
     */
    roundedCornerRadius: any;
    /**
     * Sets and gets the start value of the range in circular gauge.
     * @aspdefaultvalueignore
     * @default 0
     */
    start: any;
    /**
     * Sets and gets the width for the start of the range in the circular gauge.
     * @default '10'
     */
    startWidth: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<RangeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RangeDirective, "e-ranges>e-range", never, { "color": "color"; "end": "end"; "endWidth": "endWidth"; "legendText": "legendText"; "linearGradient": "linearGradient"; "offset": "offset"; "opacity": "opacity"; "position": "position"; "radialGradient": "radialGradient"; "radius": "radius"; "roundedCornerRadius": "roundedCornerRadius"; "start": "start"; "startWidth": "startWidth"; }, {}, never>;
}
/**
 * Range Array Directive
 * @private
 */
export declare class RangesDirective extends ArrayBase<RangesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<RangesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RangesDirective, "ej-circulargauge>e-axes>e-axis>e-ranges", never, {}, {}, ["children"]>;
}
