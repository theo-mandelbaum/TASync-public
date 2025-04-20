import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AxisModel } from '@syncfusion/ej2-lineargauge';
export declare let AxesDirective: any;
export declare const AxesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render the axes in the Linear Gauge.
 * ```vue
 * <ejs-lineargauge>
 * <e-axes><e-axis></e-axis></e-axes>
 * </ejs-lineargauge>
 * ```
 */
export declare let AxisDirective: DefineVueDirective<AxisModel>;
export declare const AxisPlugin: {
    name: string;
    install(Vue: any): void;
};
