import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AxisModel } from '@syncfusion/ej2-circulargauge';
export declare let AxesDirective: any;
export declare const AxesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render the axes in the Circular Gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes><e-axis></e-axis></e-axes>
 * </ejs-circulargauge>
 * ```
 */
export declare let AxisDirective: DefineVueDirective<AxisModel>;
export declare const AxisPlugin: {
    name: string;
    install(Vue: any): void;
};
