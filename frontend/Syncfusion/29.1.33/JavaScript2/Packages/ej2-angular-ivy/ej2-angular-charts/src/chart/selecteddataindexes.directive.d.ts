import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export declare class SelectedDataIndexDirective extends ComplexBase<SelectedDataIndexDirective> {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectedDataIndexDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SelectedDataIndexDirective, "e-selecteddataindexes>e-selecteddataindex", never, { "point": "point"; "series": "series"; }, {}, never>;
}
/**
 * SelectedDataIndex Array Directive
 * @private
 */
export declare class SelectedDataIndexesDirective extends ArrayBase<SelectedDataIndexesDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectedDataIndexesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SelectedDataIndexesDirective, "ejs-chart>e-selecteddataindexes", never, {}, {}, ["children"]>;
}
