import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Timeline, TimelineModel } from '@syncfusion/ej2-layouts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Timeline Component.
 * ```html
 * <ejs-timeline :items='timelineItems'></ejs-timeline>
 * ```
 */
export declare let TimelineComponent: DefineVueComponent<TimelineModel>;
export declare type TimelineComponent = typeof ComponentBase & {
    ej2Instances: Timeline;
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
};
export declare const TimelinePlugin: {
    name: string;
    install(Vue: any): void;
};
