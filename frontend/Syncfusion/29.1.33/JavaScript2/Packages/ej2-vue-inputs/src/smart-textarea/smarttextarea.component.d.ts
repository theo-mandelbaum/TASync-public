import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { SmartTextArea, SmartTextAreaModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Smart TextArea Component
 * ```html
 * <ejs-smarttextarea></ejs-smarttextarea>
 * ```
 */
export declare let SmartTextAreaComponent: DefineVueComponent<SmartTextAreaModel>;
export declare type SmartTextAreaComponent = typeof ComponentBase & {
    ej2Instances: SmartTextArea;
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
    addAttributes(attributes: undefined): void;
    destroy(): void;
    focusIn(): void;
    focusOut(): void;
    removeAttributes(attributes: string[]): void;
};
export declare const SmartTextAreaPlugin: {
    name: string;
    install(Vue: any): void;
};
