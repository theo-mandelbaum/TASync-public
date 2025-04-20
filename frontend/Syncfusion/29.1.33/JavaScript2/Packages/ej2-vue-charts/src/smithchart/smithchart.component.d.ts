import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Smithchart, SmithchartModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs Smithchart Component
 * ```vue
 * <ejs-smithchart></ejs-smithchart>
 * ```
 */
export declare let SmithchartComponent: DefineVueComponent<SmithchartModel>;
export declare type SmithchartComponent = typeof ComponentBase & {
    ej2Instances: Smithchart;
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
    export(type: Object, fileName: string, orientation?: Object): void;
    mouseEnd(e: Object): void;
    mouseMove(e: Object): void;
    print(id?: string[] | string | Object): void;
    setTabIndex(previousElement: Object, currentElement: Object): void;
    smithchartOnClick(e: Object | Object): void;
    smithchartOnResize(): boolean;
};
export declare const SmithchartPlugin: {
    name: string;
    install(Vue: any): void;
};
