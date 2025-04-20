import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ChatUI, ChatUIModel } from '@syncfusion/ej2-interactive-chat';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS ChatUI Component
 * ```vue
 * <ejs-chatui ></ejs-chatui>
 * ```
 */
export declare let ChatUIComponent: DefineVueComponent<ChatUIModel>;
export declare type ChatUIComponent = typeof ComponentBase & {
    ej2Instances: ChatUI;
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
    addMessage(message: string | Object): void;
    destroy(): void;
    focus(): void;
    scrollToBottom(): void;
    scrollToMessage(messageId: string): void;
    updateMessage(message: Object, msgId: string): void;
};
export declare const ChatUIPlugin: {
    name: string;
    install(Vue: any): void;
};
