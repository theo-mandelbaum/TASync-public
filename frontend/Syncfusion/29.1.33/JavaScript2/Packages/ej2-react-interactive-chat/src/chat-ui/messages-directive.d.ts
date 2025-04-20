import { ComplexBase } from '@syncfusion/ej2-react-base';
import { MessageModel } from '@syncfusion/ej2-interactive-chat';
/**
 * Represents the React ChatUI Component
 * ```tsx
 * <ChatUIComponent>
 *    <MessagesDirective>
 *      <MessageDirective>
*      </MessageDirective>
 *    </MessagesDirective>
 * </ChatUIComponent>
 * ```
 */
export declare class MessageDirective extends ComplexBase<MessageModel & {
    children?: React.ReactNode;
}, MessageModel> {
    static moduleName: string;
}
export declare class MessagesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
