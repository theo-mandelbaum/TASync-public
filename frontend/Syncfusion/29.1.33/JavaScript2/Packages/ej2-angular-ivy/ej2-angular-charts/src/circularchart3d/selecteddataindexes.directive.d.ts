import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export declare class CircularChart3DSelectedDataIndexDirective extends ComplexBase<CircularChart3DSelectedDataIndexDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies the index of the data point within the series.
     * @default 0
     * @asptype int
     */
    point: any;
    /**
     * Specifies the index of the series.
     * @default 0
     * @asptype int
     */
    series: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<CircularChart3DSelectedDataIndexDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CircularChart3DSelectedDataIndexDirective, "e-circularchart3d-selecteddataindexes>e-circularchart3d-selecteddataindex", never, { "point": "point"; "series": "series"; }, {}, never>;
}
/**
 * CircularChart3DSelectedDataIndex Array Directive
 * @private
 */
export declare class CircularChart3DSelectedDataIndexesDirective extends ArrayBase<CircularChart3DSelectedDataIndexesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<CircularChart3DSelectedDataIndexesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CircularChart3DSelectedDataIndexesDirective, "ejs-circularchart3d>e-circularchart3d-selecteddataindexes", never, {}, {}, ["children"]>;
}
