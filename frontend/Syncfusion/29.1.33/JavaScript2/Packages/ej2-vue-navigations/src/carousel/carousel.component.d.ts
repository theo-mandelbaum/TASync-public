import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Carousel, CarouselModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Carousel Component.
 * ```html
 * <ejs-carousel :items='carouselItems'></ejs-carousel>
 * ```
 */
export declare let CarouselComponent: DefineVueComponent<CarouselModel>;
export declare type CarouselComponent = typeof ComponentBase & {
    ej2Instances: Carousel;
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
    next(): void;
    pause(): void;
    play(): void;
    prev(): void;
};
export declare const CarouselPlugin: {
    name: string;
    install(Vue: any): void;
};
