import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ColorPicker, ColorPickerModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS ColorPicker Component
 * ```html
 * <ejs-colorpicker></ejs-colorpicker>
 * ```
 */
export declare let ColorPickerComponent: DefineVueComponent<ColorPickerModel>;
export declare type ColorPickerComponent = typeof ComponentBase & {
    ej2Instances: ColorPicker;
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
    destroy(): void;
    focusIn(): void;
    getValue(value?: string, type?: string): string;
    toggle(): void;
};
export declare const ColorPickerPlugin: {
    name: string;
    install(Vue: any): void;
};
