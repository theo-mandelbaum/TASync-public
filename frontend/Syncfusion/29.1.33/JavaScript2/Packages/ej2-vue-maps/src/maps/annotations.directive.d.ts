import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AnnotationModel } from '@syncfusion/ej2-maps';
export declare let AnnotationsDirective: any;
export declare const AnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the directive to define the annotations in the maps.
 * ```vue
 * <ejs-maps>
 * <e-maps-annotations>
 * <e-maps-annotation></e-maps-annotation>
 * </e-maps-annotations>
 * </ejs-maps>
 * ```
 */
export declare let AnnotationDirective: DefineVueDirective<AnnotationModel>;
export declare const AnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
