import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AnnotationModel } from '@syncfusion/ej2-circulargauge';
export declare let AnnotationsDirective: any;
export declare const AnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
 * ```
 */
export declare let AnnotationDirective: DefineVueDirective<AnnotationModel>;
export declare const AnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
