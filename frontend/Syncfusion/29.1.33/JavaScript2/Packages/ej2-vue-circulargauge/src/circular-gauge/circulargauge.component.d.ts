import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { CircularGauge, CircularGaugeModel } from '@syncfusion/ej2-circulargauge';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue Circular Gauge component. This tag is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```vue
 * <ejs-circulargauge></ejs-circulargauge>
 * ```
 */
export declare let CircularGaugeComponent: DefineVueComponent<CircularGaugeModel>;
export declare type CircularGaugeComponent = typeof ComponentBase & {
    ej2Instances: CircularGauge;
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
    export(type: Object, fileName: string, orientation?: Object, allowDownload?: boolean): Object;
    print(id?: string[] | string | Object): void;
    setAnnotationValue(axisIndex: number, annotationIndex: number, content: string | Object): void;
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
    setRangeValue(axisIndex: number, rangeIndex: number, start: number, end: number): void;
};
export declare const CircularGaugePlugin: {
    name: string;
    install(Vue: any): void;
};
