import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Button, ButtonModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Button Component
 * ```html
 * <ejs-button>Button</ejs-button>
 * ```
 */
export declare let ButtonComponent: DefineVueComponent<ButtonModel>;
export declare type ButtonComponent = typeof ComponentBase & {
    ej2Instances: Button;
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
export declare const ButtonPlugin: {
    name: string;
    install(Vue: any): void;
};
