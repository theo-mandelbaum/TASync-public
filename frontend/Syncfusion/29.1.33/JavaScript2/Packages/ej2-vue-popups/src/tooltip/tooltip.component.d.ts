import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Tooltip, TooltipModel } from '@syncfusion/ej2-popups';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Tooltip component that displays a piece of information about the target element on mouse hover.
 * ```html
 * <ejs-tooltip content='Tooltip content'>Show Tooltip</ejs-tooltip>
 * ```
 */
export declare let TooltipComponent: DefineVueComponent<TooltipModel>;
export declare type TooltipComponent = typeof ComponentBase & {
    ej2Instances: Tooltip;
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
    close(animation?: Object): void;
    destroy(): void;
    open(element?: Object, animation?: Object): void;
    refresh(target?: Object): void;
};
export declare const TooltipPlugin: {
    name: string;
    install(Vue: any): void;
};
