import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AnnotationModel } from '@syncfusion/ej2-lineargauge';
export declare let AnnotationsDirective: any;
export declare const AnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to render and customize the annotations in the linear gauge.
 * ```vue
 * <ejs-lineargauge>
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * </ejs-lineargauge>
 * ```
 */
export declare let AnnotationDirective: DefineVueDirective<AnnotationModel>;
export declare const AnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
