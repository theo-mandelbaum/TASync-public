import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { OtpInput, OtpInputModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS otpinput Component
 * ```html
 * <ejs-otpinput v-bind:value='value'></ejs-otpinput>
 * ```
 */
export declare let OtpInputComponent: DefineVueComponent<OtpInputModel>;
export declare type OtpInputComponent = typeof ComponentBase & {
    ej2Instances: OtpInput;
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
    focusIn(): void;
    focusOut(): void;
};
export declare const OtpInputPlugin: {
    name: string;
    install(Vue: any): void;
};
