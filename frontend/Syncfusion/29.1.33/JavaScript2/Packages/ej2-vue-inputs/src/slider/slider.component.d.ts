import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Slider, SliderModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Slider Component.
 * ```html
 * <ejs-slider :value='value'></ejs-slider>
 * ```
 */
export declare let SliderComponent: DefineVueComponent<SliderModel>;
export declare type SliderComponent = typeof ComponentBase & {
    ej2Instances: Slider;
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
    reposition(): void;
    setTooltip(args?: string): void;
};
export declare const SliderPlugin: {
    name: string;
    install(Vue: any): void;
};
