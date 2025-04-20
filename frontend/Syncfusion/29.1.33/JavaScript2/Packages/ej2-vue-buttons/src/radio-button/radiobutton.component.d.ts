import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { RadioButton, RadioButtonModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS RadioButton Component
 * ```html
 * <ejs-radiobutton label='Default'></ejs-radiobutton>
 * ```
 */
export declare let RadioButtonComponent: DefineVueComponent<RadioButtonModel>;
export declare type RadioButtonComponent = typeof ComponentBase & {
    ej2Instances: RadioButton;
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
    getSelectedValue(): string;
};
export declare const RadioButtonPlugin: {
    name: string;
    install(Vue: any): void;
};
