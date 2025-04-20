import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Dialog, DialogModel } from '@syncfusion/ej2-popups';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Dialog component
 * ```html
 * <ejs-dialog></ejs-dialog>
 * ```
 */
export declare let DialogComponent: DefineVueComponent<DialogModel>;
export declare type DialogComponent = typeof ComponentBase & {
    ej2Instances: Dialog;
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
    getButtons(index?: number): Object[] | Object;
    getDimension(): Object;
    hide(event?: Object): void;
    refreshPosition(): void;
    sanitizeHelper(value: string): string;
    show(isFullScreen?: boolean): void;
};
export declare const DialogPlugin: {
    name: string;
    install(Vue: any): void;
};
