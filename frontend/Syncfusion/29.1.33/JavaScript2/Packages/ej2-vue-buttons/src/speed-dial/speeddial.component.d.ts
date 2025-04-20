import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { SpeedDial, SpeedDialModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS SpeedDialComponent Component
 * ```html
 * <ejs-speeddial content='Edit'></ejs-speeddial>
 * ```
 */
export declare let SpeedDialComponent: DefineVueComponent<SpeedDialModel>;
export declare type SpeedDialComponent = typeof ComponentBase & {
    ej2Instances: SpeedDial;
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
    createPopup(): void;
    destroy(): void;
    hide(): void;
    refreshPosition(): void;
    show(): void;
};
export declare const SpeedDialPlugin: {
    name: string;
    install(Vue: any): void;
};
