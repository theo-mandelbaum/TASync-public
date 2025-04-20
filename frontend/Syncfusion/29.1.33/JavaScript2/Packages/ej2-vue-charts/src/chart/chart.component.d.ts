import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Chart, ChartModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs chart Component
 * ```vue
 * <ejs-chart></ejs-chart>
 * ```
 */
export declare let ChartComponent: DefineVueComponent<ChartModel>;
export declare type ChartComponent = typeof ComponentBase & {
    ej2Instances: Chart;
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
    FindXYPointValue(mouseX: number, mouseY: number): Object | null;
    addAxes(axisCollection: Object[]): void;
    addSeries(seriesCollection: Object[]): void;
    clearSeries(): void;
    destroy(): void;
    export(type: Object, fileName: string): void;
    getLocalizedLabel(key: string): string;
    hideCrosshair(): void;
    hideTooltip(): void;
    isSecondaryAxis(axis: Object): boolean;
    print(id?: string[] | string | Object): void;
    processData(render: boolean): void;
    refreshLiveData(): void;
    removeSeries(index: number): void;
    setAnnotationValue(annotationIndex: number, content: string): void;
    showCrosshair(x: number, y: number): void;
    showTooltip(x: number | string | Object, y: number, isPoint: boolean): void;
};
export declare const ChartPlugin: {
    name: string;
    install(Vue: any): void;
};
