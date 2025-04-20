import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { SpeechToText, SpeechToTextModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS SpeechToText Component
 * ```html
 * <ejs-speechtotext></ejs-speechtotext>
 * ```
 */
export declare let SpeechToTextComponent: DefineVueComponent<SpeechToTextModel>;
export declare type SpeechToTextComponent = typeof ComponentBase & {
    ej2Instances: SpeechToText;
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
    startListening(): void;
    stopListening(): void;
};
export declare const SpeechToTextPlugin: {
    name: string;
    install(Vue: any): void;
};
