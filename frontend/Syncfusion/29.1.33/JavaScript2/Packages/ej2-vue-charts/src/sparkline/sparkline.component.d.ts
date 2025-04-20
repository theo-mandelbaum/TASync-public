import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Sparkline, SparklineModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs Sparkline Component
 * ```vue
 * <ejs-sparkline></ejs-sparkline>
 * ```
 */
export declare let SparklineComponent: DefineVueComponent<SparklineModel>;
export declare type SparklineComponent = typeof ComponentBase & {
    ej2Instances: Sparkline;
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
    renderSparkline(): void;
};
export declare const SparklinePlugin: {
    name: string;
    install(Vue: any): void;
};
