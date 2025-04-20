import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Rating, RatingModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Rating Component
 * ```html
 * <ejs-rating v-bind:value='value'></ejs-rating>
 * ```
 */
export declare let RatingComponent: DefineVueComponent<RatingModel>;
export declare type RatingComponent = typeof ComponentBase & {
    ej2Instances: Rating;
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
    reset(): void;
};
export declare const RatingPlugin: {
    name: string;
    install(Vue: any): void;
};
