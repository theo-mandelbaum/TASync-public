import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { SmartPasteButton, SmartPasteButtonModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue Smart Paste Button Component
 * ```html
 * <ejs-smart-paste-button>Smart paste</ejs-smart-paste-button>
 * ```
 */
export declare let SmartPasteButtonComponent: DefineVueComponent<SmartPasteButtonModel>;
export declare type SmartPasteButtonComponent = typeof ComponentBase & {
    ej2Instances: SmartPasteButton;
    isVue3: boolean;
    isLazyUpdate: Boolean;
    plugins: any[];
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    click(): void;
    destroy(): void;
    focusIn(): void;
};
export declare const SmartPasteButtonPlugin: {
    name: string;
    install(Vue: any): void;
};
