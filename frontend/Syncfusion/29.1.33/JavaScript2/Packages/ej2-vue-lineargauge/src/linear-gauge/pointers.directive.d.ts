import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { PointerModel } from '@syncfusion/ej2-lineargauge';
export declare let PointersDirective: any;
export declare const PointersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render and customize the pointers in an axis of linear gauge.
 * ```vue
 * <ejs-lineargauge>
 * <e-axes>
 * <e-axis>
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * </e-axis>
 * </e-axes>
 * </ejs-lineargauge>
 * ```
 */
export declare let PointerDirective: DefineVueDirective<PointerModel>;
export declare const PointerPlugin: {
    name: string;
    install(Vue: any): void;
};
