import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { NumericTextBox, NumericTextBoxModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS NumericTextBox Component
 * ```html
 * <ejs-numerictextbox v-bind:value='value'></ejs-numerictextbox>
 * ```
 */
export declare let NumericTextBoxComponent: DefineVueComponent<NumericTextBoxModel>;
export declare type NumericTextBoxComponent = typeof ComponentBase & {
    ej2Instances: NumericTextBox;
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
    decrement(step: number): void;
    destroy(): void;
    focusIn(): void;
    focusOut(): void;
    getText(): string;
    increment(step: number): void;
};
export declare const NumericTextBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
