import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Toast, ToastModel } from '@syncfusion/ej2-notifications';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue Toast Component
 * ```html
 * <ejs-toast></ejs-toast>
 * ```
 */
export declare let ToastComponent: DefineVueComponent<ToastModel>;
export declare type ToastComponent = typeof ComponentBase & {
    ej2Instances: Toast;
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
    hide(element?: Object | Object | string): void;
    show(toastObj?: Object): void;
};
export declare const ToastPlugin: {
    name: string;
    install(Vue: any): void;
};
