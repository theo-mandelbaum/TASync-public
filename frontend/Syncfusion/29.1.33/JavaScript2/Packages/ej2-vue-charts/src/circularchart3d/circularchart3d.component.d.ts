import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { CircularChart3D, CircularChart3DModel } from '@syncfusion/ej2-charts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs Circular 3D Chart Component
 * ```vue
 * <ejs-circularchart3d></ejs-circularchart3d>
 * ```
 */
export declare let CircularChart3DComponent: DefineVueComponent<CircularChart3DModel>;
export declare type CircularChart3DComponent = typeof ComponentBase & {
    ej2Instances: CircularChart3D;
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
    export(type: Object, fileName: string): void;
    pdfExport(fileName: string, orientation?: Object, controls?: Object[], width?: number, height?: number, isVertical?: boolean, header?: Object, footer?: Object, exportToMultiplePage?: boolean): void;
    print(id?: string[] | string | Object): void;
};
export declare const CircularChart3DPlugin: {
    name: string;
    install(Vue: any): void;
};
