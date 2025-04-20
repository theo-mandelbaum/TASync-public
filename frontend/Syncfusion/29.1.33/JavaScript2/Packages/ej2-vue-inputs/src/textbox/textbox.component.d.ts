import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { TextBox, TextBoxModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS TextBox Component
 * ```html
 * <ejs-textbox v-bind:value='value'></ejs-textbox>
 * ```
 */
export declare let TextBoxComponent: DefineVueComponent<TextBoxModel>;
export declare type TextBoxComponent = typeof ComponentBase & {
    ej2Instances: TextBox;
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
    addIcon(position: string, icons: string | string[]): void;
    destroy(): void;
    focusIn(): void;
    focusOut(): void;
    removeAttributes(attributes: string[]): void;
};
export declare const TextBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
