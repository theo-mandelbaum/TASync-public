import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { ConnectorModel } from '@syncfusion/ej2-diagrams';
export declare let ConnectorsDirective: any;
export declare const ConnectorsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-connectors` directive represent a connectors of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
export declare let ConnectorDirective: DefineVueDirective<ConnectorModel>;
export declare const ConnectorPlugin: {
    name: string;
    install(Vue: any): void;
};
