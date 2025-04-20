import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Switch, SwitchModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Switch Component.
 * ```html
 * <ejs-switch></ejs-switch>
 * ```
 */
export declare let SwitchComponent: DefineVueComponent<SwitchModel>;
export declare type SwitchComponent = typeof ComponentBase & {
    ej2Instances: Switch;
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
    toggle(): void;
};
export declare const SwitchPlugin: {
    name: string;
    install(Vue: any): void;
};
