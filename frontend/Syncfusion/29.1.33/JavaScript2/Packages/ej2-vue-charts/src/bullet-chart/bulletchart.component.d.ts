import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { BulletChart, BulletChartModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs BulletChart Component
 * ```vue
 * <ejs-bulletchart></ejs-bulletchart>
 * ```
 */
export declare let BulletChartComponent: DefineVueComponent<BulletChartModel>;
export declare type BulletChartComponent = typeof ComponentBase & {
    ej2Instances: BulletChart;
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
    createSvg(chart: Object): void;
    destroy(): void;
    export(type: Object, fileName: string, orientation?: Object, controls?: undefined[], width?: number, height?: number, isVertical?: boolean): void;
    print(id?: string[] | string | Object): void;
    removeSvg(): void;
};
export declare const BulletChartPlugin: {
    name: string;
    install(Vue: any): void;
};
