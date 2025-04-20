import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { LinearGauge, LinearGaugeModel } from '@syncfusion/ej2-lineargauge';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue Linear Gauge Component. This tag is used to customize the properties of the linear gauge to visualize the data in linear scale.
 * ```vue
 * <ejs-lineargauge></ejs-lineargauge>
 * ```
 */
export declare let LinearGaugeComponent: DefineVueComponent<LinearGaugeModel>;
export declare type LinearGaugeComponent = typeof ComponentBase & {
    ej2Instances: LinearGauge;
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
    setAnnotationValue(annotationIndex: number, content: string | Object, axisValue?: number): void;
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
};
export declare const LinearGaugePlugin: {
    name: string;
    install(Vue: any): void;
};
