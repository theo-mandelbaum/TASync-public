import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Fab, FabModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Fab Component
 * ```html
 * <ejs-fab></ejs-fab>
 * ```
 */
export declare let FabComponent: DefineVueComponent<FabModel>;
export declare type FabComponent = typeof ComponentBase & {
    ej2Instances: Fab;
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
    click(): void;
    destroy(): void;
    focusIn(): void;
    refreshPosition(): void;
};
export declare const FabPlugin: {
    name: string;
    install(Vue: any): void;
};
