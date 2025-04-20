import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { MessageModel } from '@syncfusion/ej2-interactive-chat';
export declare let MessagesDirective: any;
export declare const MessagesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the Essential JS 2 VueJS ChatUI Component
 * ```vue
 * <ejs-chatui>
 *   <e-messages>
 *     <e-message>
 *     </e-message>
 *    </e-messages>
 * </ejs-chatui>
 * ```
 */
export declare let MessageDirective: DefineVueDirective<MessageModel>;
export declare const MessagePlugin: {
    name: string;
    install(Vue: any): void;
};
