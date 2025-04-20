import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { TextArea, TextAreaModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS TextArea Component
 * ```html
 * <ejs-textarea v-bind:value='value'></ejs-textarea>
 * ```
 */
export declare let TextAreaComponent: DefineVueComponent<TextAreaModel>;
export declare type TextAreaComponent = typeof ComponentBase & {
    ej2Instances: TextArea;
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
export declare const TextAreaPlugin: {
    name: string;
    install(Vue: any): void;
};
