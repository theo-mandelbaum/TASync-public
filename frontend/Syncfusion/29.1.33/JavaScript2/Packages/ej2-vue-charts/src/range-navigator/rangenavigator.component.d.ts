import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { RangeNavigator, RangeNavigatorModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs RangeNavigator Component
 * ```vue
 * <ejs-rangenavigator></ejs-rangenavigator>
 * ```
 */
export declare let RangeNavigatorComponent: DefineVueComponent<RangeNavigatorModel>;
export declare type RangeNavigatorComponent = typeof ComponentBase & {
    ej2Instances: RangeNavigator;
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
    createSecondaryElement(): void;
    destroy(): void;
    export(type: Object, fileName: string, orientation?: Object, controls?: undefined[], width?: number, height?: number, isVertical?: boolean): void;
    print(id?: string[] | string | Object): void;
    renderChart(resize: boolean): void;
};
export declare const RangeNavigatorPlugin: {
    name: string;
    install(Vue: any): void;
};
