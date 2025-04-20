import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DropDownButton, DropDownButtonModel } from '@syncfusion/ej2-splitbuttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS DropDownButton Component
 * ```html
 * <ejs-dropdownbutton>DropDownButton</ejs-dropdownbutton>
 * ```
 */
export declare let DropDownButtonComponent: DefineVueComponent<DropDownButtonModel>;
export declare type DropDownButtonComponent = typeof ComponentBase & {
    ej2Instances: DropDownButton;
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
    addItems(items: Object[], text?: string): void;
    destroy(): void;
    focusIn(): void;
    removeItems(items: string[], isUniqueId?: boolean): void;
    toggle(): void;
};
export declare const DropDownButtonPlugin: {
    name: string;
    install(Vue: any): void;
};
