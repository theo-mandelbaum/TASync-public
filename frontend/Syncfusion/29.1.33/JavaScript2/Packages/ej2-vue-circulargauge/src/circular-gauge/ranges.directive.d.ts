import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { RangeModel } from '@syncfusion/ej2-circulargauge';
export declare let RangesDirective: any;
export declare const RangesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render and customize the ranges in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-ranges><e-range></e-range></e-ranges>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
 * ```
 */
export declare let RangeDirective: DefineVueDirective<RangeModel>;
export declare const RangePlugin: {
    name: string;
    install(Vue: any): void;
};
