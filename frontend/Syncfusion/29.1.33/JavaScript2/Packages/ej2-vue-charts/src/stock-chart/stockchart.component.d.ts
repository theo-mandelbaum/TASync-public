import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { StockChart, StockChartModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs chart Component
 * ```vue
 * <ejs-stockchart></ejs-stockchart>
 * ```
 */
export declare let StockChartComponent: DefineVueComponent<StockChartModel>;
export declare type StockChartComponent = typeof ComponentBase & {
    ej2Instances: StockChart;
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
    chartModuleInjection(): void;
    destroy(): void;
    findCurrentData(totalData: Object, xName: string): Object;
    rangeChanged(updatedStart: number, updatedEnd: number): void;
    renderPeriodSelector(): void;
    stockChartDataManagerSuccess(): void;
};
export declare const StockChartPlugin: {
    name: string;
    install(Vue: any): void;
};
