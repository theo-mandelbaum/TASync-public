import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Message, MessageModel } from '@syncfusion/ej2-notifications';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * The Vue Message component displays messages with severity by differentiating icons and colors to denote the importance and context of the message to the end user.
 * ```html
 * <ejs-message id='msg'>Editing is restricted</ejs-message>
 * ```
 */
export declare let MessageComponent: DefineVueComponent<MessageModel>;
export declare type MessageComponent = typeof ComponentBase & {
    ej2Instances: Message;
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
};
export declare const MessagePlugin: {
    name: string;
    install(Vue: any): void;
};
