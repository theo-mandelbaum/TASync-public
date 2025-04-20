import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export declare class Chart3DSelectedDataIndexDirective extends ComplexBase<Chart3DSelectedDataIndexDirective> {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<Chart3DSelectedDataIndexDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Chart3DSelectedDataIndexDirective, "e-chart3d-selecteddataindexes>e-chart3d-selecteddataindex", never, { "point": "point"; "series": "series"; }, {}, never>;
}
/**
 * Chart3DSelectedDataIndex Array Directive
 * @private
 */
export declare class Chart3DSelectedDataIndexesDirective extends ArrayBase<Chart3DSelectedDataIndexesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<Chart3DSelectedDataIndexesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Chart3DSelectedDataIndexesDirective, "ejs-chart3d>e-chart3d-selecteddataindexes", never, {}, {}, ["children"]>;
}
