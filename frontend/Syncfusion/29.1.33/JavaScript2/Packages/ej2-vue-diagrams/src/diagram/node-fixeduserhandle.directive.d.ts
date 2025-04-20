import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { NodeFixedUserHandleModel } from '@syncfusion/ej2-diagrams';
export declare let NodeFixedUserHandlesDirective: any;
export declare const NodeFixedUserHandlesPlugin: {
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
 * <e-node-fixeduserhandles>
 * <e-node-fixeduserhandle>
 * </e-node-fixeduserhandle>
 * </e-node-fixeduserhandles>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export declare let NodeFixedUserHandleDirective: DefineVueDirective<NodeFixedUserHandleModel>;
export declare const NodeFixedUserHandlePlugin: {
    name: string;
    install(Vue: any): void;
};
