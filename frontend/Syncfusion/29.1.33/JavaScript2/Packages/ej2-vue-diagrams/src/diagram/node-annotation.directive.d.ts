import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ShapeAnnotationModel } from '@syncfusion/ej2-diagrams';
export declare let NodeAnnotationsDirective: any;
export declare const NodeAnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-node` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-annotations>
 * <e-node-annotation>
 * </e-node-annotation>
 * </e-node-annotations>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export declare let NodeAnnotationDirective: DefineVueDirective<ShapeAnnotationModel>;
export declare const NodeAnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
