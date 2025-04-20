import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { AccumulationChart, AccumulationChartModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs AccumulationChart Component
 * ```vue
 * <ejs-accumulationchart></ejs-accumulationchart>
 * ```
 */
export declare let AccumulationChartComponent: DefineVueComponent<AccumulationChartModel>;
export declare type AccumulationChartComponent = typeof ComponentBase & {
    ej2Instances: AccumulationChart;
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
    calculateBounds(): void;
    export(type: Object, fileName: string): void;
    print(id?: string[] | string | Object): void;
    setAnnotationValue(annotationIndex: number, content: string): void;
    titleTooltip(event: Object, x: number, y: number, isTouch?: boolean): void;
};
export declare const AccumulationChartPlugin: {
    name: string;
    install(Vue: any): void;
};
