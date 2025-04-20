import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { NodeModel } from '@syncfusion/ej2-diagrams';
export declare let NodesDirective: any;
export declare const NodesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-node` directive represent a nodes of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node></e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export declare let NodeDirective: DefineVueDirective<NodeModel>;
export declare const NodePlugin: {
    name: string;
    install(Vue: any): void;
};
