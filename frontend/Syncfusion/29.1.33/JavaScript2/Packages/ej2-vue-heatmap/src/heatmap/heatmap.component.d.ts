import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { HeatMap, HeatMapModel } from '@syncfusion/ej2-heatmap';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue HeatMap component.
 * This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
 * ```vue
 * <ejs-heatmap></ejs-heatmap>
 * ```
 */
export declare let HeatMapComponent: DefineVueComponent<HeatMapModel>;
export declare type HeatMapComponent = typeof ComponentBase & {
    ej2Instances: HeatMap;
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
    clearSelection(): void;
    destroy(): void;
    export(type: Object, fileName: string, orientation?: Object): void;
    print(): void;
    refresh(): void;
    refreshBound(): void;
};
export declare const HeatMapPlugin: {
    name: string;
    install(Vue: any): void;
};
