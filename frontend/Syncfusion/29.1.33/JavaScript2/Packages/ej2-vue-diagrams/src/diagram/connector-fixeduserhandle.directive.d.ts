import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ConnectorFixedUserHandleModel } from '@syncfusion/ej2-diagrams';
export declare let ConnectorFixedUserHandlesDirective: any;
export declare const ConnectorFixedUserHandlesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-connector` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector>
 * <e-connector-fixeduserhandles>
 * <e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandles>
 * </e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
export declare let ConnectorFixedUserHandleDirective: DefineVueDirective<ConnectorFixedUserHandleModel>;
export declare const ConnectorFixedUserHandlePlugin: {
    name: string;
    install(Vue: any): void;
};
