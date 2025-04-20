import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { PointerModel } from '@syncfusion/ej2-circulargauge';
export declare let PointersDirective: any;
export declare const PointersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render and customize the pointers in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
 * ```
 */
export declare let PointerDirective: DefineVueDirective<PointerModel>;
export declare const PointerPlugin: {
    name: string;
    install(Vue: any): void;
};
