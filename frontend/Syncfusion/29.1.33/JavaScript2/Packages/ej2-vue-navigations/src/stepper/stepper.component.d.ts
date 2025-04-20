import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Stepper, StepperModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Stepper Component.
 * ```html
 * <ejs-stepper :steps='stepItems'></ejs-stepper>
 * ```
 */
export declare let StepperComponent: DefineVueComponent<StepperModel>;
export declare type StepperComponent = typeof ComponentBase & {
    ej2Instances: Stepper;
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
    nextStep(): void;
    previousStep(): void;
    refreshProgressbar(): void;
    reset(): void;
};
export declare const StepperPlugin: {
    name: string;
    install(Vue: any): void;
};
