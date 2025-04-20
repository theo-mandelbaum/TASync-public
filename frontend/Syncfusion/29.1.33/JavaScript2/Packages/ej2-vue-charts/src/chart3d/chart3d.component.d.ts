import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Chart3D, Chart3DModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs 3D Chart Component
 * ```vue
 * <ejs-chart3d></ejs-chart3d>
 * ```
 */
export declare let Chart3DComponent: DefineVueComponent<Chart3DModel>;
export declare type Chart3DComponent = typeof ComponentBase & {
    ej2Instances: Chart3D;
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
    addSeries(seriesCollection: Object[]): void;
    createChartSvg(): void;
    destroy(): void;
    export(type: Object, fileName: string): void;
    highlightAnimation(element: Object, index: number, duration: number, startOpacity: number): void;
    print(id?: string[] | string | Object): void;
    removeSeries(index: number): void;
    stopElementAnimation(element: Object, index: number): void;
};
export declare const Chart3DPlugin: {
    name: string;
    install(Vue: any): void;
};
