import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { AIAssistView, AIAssistViewModel } from '@syncfusion/ej2-interactive-chat';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS AIAssistView Component
 * ```vue
 * <ejs-aiassistview ></ejs-aiassistview>
 * ```
 */
export declare let AIAssistViewComponent: DefineVueComponent<AIAssistViewModel>;
export declare type AIAssistViewComponent = typeof ComponentBase & {
    ej2Instances: AIAssistView;
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
    addPromptResponse(outputResponse: string | Object, isFinalUpdate: boolean): void;
    destroy(): void;
    executePrompt(prompt: string): void;
    scrollToBottom(): void;
};
export declare const AIAssistViewPlugin: {
    name: string;
    install(Vue: any): void;
};
