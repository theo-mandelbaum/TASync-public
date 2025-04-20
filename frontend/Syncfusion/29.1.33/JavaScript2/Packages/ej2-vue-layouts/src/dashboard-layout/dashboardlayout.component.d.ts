import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DashboardLayout, DashboardLayoutModel } from '@syncfusion/ej2-layouts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS DashboardLayout Component.
 * ```html
 * <ejs-dashboardlayout></ejs-dashboardlayout>
 * ```
 */
export declare let DashboardLayoutComponent: DefineVueComponent<DashboardLayoutModel>;
export declare type DashboardLayoutComponent = typeof ComponentBase & {
    ej2Instances: DashboardLayout;
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
    addPanel(panel: Object): void;
    destroy(): void;
    movePanel(id: string, row: number, col: number): void;
    refresh(): void;
    refreshDraggableHandle(): void;
    removeAll(): void;
    removePanel(id: string): void;
    resizePanel(id: string, sizeX: number, sizeY: number): void;
    serialize(): Object[];
    updatePanel(panel: Object): void;
};
export declare const DashboardLayoutPlugin: {
    name: string;
    install(Vue: any): void;
};
