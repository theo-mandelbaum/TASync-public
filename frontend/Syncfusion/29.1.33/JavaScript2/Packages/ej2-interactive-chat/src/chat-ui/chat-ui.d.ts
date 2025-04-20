/// <reference path="../interactive-chat-base/interactive-chat-base-model.d.ts" />
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ChildProperty, EmitType, BaseEventArgs } from '@syncfusion/ej2-base';
import { InterActiveChatBase } from '../interactive-chat-base/interactive-chat-base';
import { ToolbarSettingsModel } from '../interactive-chat-base/interactive-chat-base-model';
import { ChatUIModel, MessageModel, UserModel, MessageStatusModel } from './chat-ui-model';
export declare class MessageStatus extends ChildProperty<MessageStatus> {
    /**
     * Specifies the icon CSS class for the message status shown in messages.
     * This property represents the CSS class applied to the icons in the sent message, allowing for customization of the status icon's appearance.
     *
     * @type {string}
     * @default ''
     */
    iconCss: string;
    /**
     * Specifies the text associated with the message status.
     * This property holds the textual representation of the message status, such as "Sent", "Received", or "Read", providing users with clear status updates.
     *
     * @type {string}
     * @default ''
     */
    text: string;
    /**
     * Specifies the tooltip text for the message status icon.
     * This property provides additional information about the message status when the user hovers over the status icon, enhancing the user experience with context.
     *
     * @type {string}
     * @default ''
     */
    tooltip: string;
}
/**
 * Represents a user model for a messages in the chatUI component.
 */
export declare class User extends ChildProperty<User> {
    /**
     * Specifies the unique identifier for each user in the Chat UI component.
     * Represents a string that uniquely identifies a user for tracking and managing individual users within the chat.
     *
     * @type {string}
     * @default '''
     */
    id: string;
    /**
     * Represents the display name of the user in the Chat UI component.
     *
     * @type {string}
     * @default 'Default'
     */
    user: string;
    /**
     * Specifies the URL of the user's avatar image.
     * If the URL is not provided, the user's first and last name initial letters will be used as the avatar.
     *
     * @type {string}
     * @default ''
     */
    avatarUrl: string;
    /**
     * Defines the background color for the user's avatar in the Chat UI component.
     * This property accepts a color in hexadecimal format (e.g., `#FFFFFF` for white), allowing for custom styling of the avatar's background.
     *
     * @type {string}
     * @default ''
     */
    avatarBgColor: string;
    /**
     * Represents additional CSS classes to style the user's messages in the Chat UI component.
     * This property allows for custom styling by accepting one or more class names as a string.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
}
/**
 *  Represents a model for a messages in the chatUI component.
 */
export declare class Message extends ChildProperty<Message> {
    /**
     * Specifies the unique identifier for each message sent in the Chat UI component.
     * Represents a string that uniquely identifies a message for tracking and managing individual messages within the chat.
     *
     * @type {string}
     * @default '''
     */
    id: string;
    /**
     * Represents the content of the message sent by a user in the Chat UI component.
     *
     * @type {string}
     * @default ''
     */
    text: string;
    /**
     * Specifies the author of the message in the Chat UI component.
     * This property references a `UserModel` object that contains details about the user who sent the message.
     *
     * @default null
     */
    author: UserModel;
    /**
     * Specifies the timestamp of when the message was sent.
     * This property holds a `Date` object that represents the exact time the message was created, providing context to the conversation flow.
     *
     * @type {Date}
     * @default ''
     */
    timeStamp: Date;
    /**
     * Specifies the format of the timestamp for displaying the message's sending time.
     * By default, the format is set based on the culture of the application.
     * You can customize the format using a specific pattern, such as "'dd/MM/yyyy hh:mm'" in string format.
     *
     * @type {string}
     * @default ''
     */
    timeStampFormat: string;
    /**
     * Specifies the status of the message in the Chat UI component.
     * Represents the current status of the message, such as sent, received, or read. It helps in tracking the messages within the chat component.
     *
     * @default null
     */
    status: MessageStatusModel;
}
export interface MessageSendEventArgs extends BaseEventArgs {
    /**
     * Indicates whether the message sending action should be canceled.
     * Setting this boolean property to `true` will prevent the message from being sent, allowing for validation or modification before the final send.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel?: boolean;
    /**
     * Represents the message that is intended to be sent.
     * This property holds a `MessageModel` object containing all relevant details of the message, including content, author, and timestamp. It can be modified before the message is sent.
     *
     * @type {MessageModel}
     * @default null
     *
     */
    message?: MessageModel;
}
export interface TypingEventArgs extends BaseEventArgs {
    /**
     * Represents the current user in the Chat UI component.
     * This property holds the user information, such as username and other relevant details.
     *
     * @type {UserModel}
     * @default null
     *
     */
    user?: UserModel;
    /**
     * Represents the content of the message sent by a user in the Chat UI component.
     *
     * @type {string}
     * @default ''
     */
    message?: string;
    /**
     * Specifies the event object associated with the input event args.
     * Represents the underlying event that triggered the action, providing details about the event.
     *
     * @type {Event}
     * @default null
     *
     */
    event?: Event;
    /**
     * Specifies the whether the user is typing in the chat UI component.
     * Returns `true`, when the user ends typing and `false` when the message is sent or user value is cleared.
     *
     * @type {boolean}
     * @default false
     *
     */
    isTyping?: boolean;
}
export declare class ChatUI extends InterActiveChatBase implements INotifyPropertyChanged {
    /**
     * Specifies the width of the Chat UI component.
     *
     * @type {string | number}
     * @default '100%'
     * @aspType string
     */
    width: string | number;
    /**
     * Specifies the height of the Chat UI component.
     *
     * @type {string | number}
     * @default '100%'
     * @aspType string
     */
    height: string | number;
    /**
     * Represents the current user interacting with the Chat UI.
     * Uses the `UserModel` object, which contains current user information.
     * Messages from the current user are displayed on the right side of the Chat UI for differentiation from other participants.
     *
     * @default null
     */
    user: UserModel;
    /**
     * Specifies the header text to be displayed in the Chat UI component.
     * This property defines the text that appears in the header, which can indicate the current participant's username or the group name, providing context for the conversation.
     * @type {string}
     * @default 'Chat'
     */
    headerText: string;
    /**
     * Specifies the CSS class for the header icon in the Chat UI component.
     * This property allows for custom styling of the header icon.
     *
     * @type {string}
     * @default ''
     */
    headerIconCss: string;
    /**
     * Specifies the placeholder text for the message input textarea in the Chat UI component.
     *
     * @type {string}
     * @default 'Type your message…'
     */
    placeholder: string;
    /**
     * Specifies custom CSS classes for the Chat UI component.
     * This property enables the application of additional styling options to customize the visual appearance of the chat interface.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies whether the header is displayed in the Chat UI component.
     * This property controls the visibility of the header, allowing users to show or hide it as needed.
     * When set to `false`, the header will be hidden from view.
     *
     * @type {boolean}
     * @default true
     */
    showHeader: boolean;
    /**
     * Specifies whether to show or hide footer in the Chat UI component.
     * When set to `true`, the footer will be visible in the Chat UI component. If `false`, the footer will be hidden.
     *
     * @type {boolean}
     * @default true
     */
    showFooter: boolean;
    /**
     * Specifies the header toolbar settings for the Chat UI component.
     * Represents the configuration for toolbar items and actions within the component.
     *
     * @default null
     */
    headerToolbar: ToolbarSettingsModel;
    /**
     * Specifies the list of message suggestions displayed above the input textarea in the Chat UI component.
     * This property represents an array of suggestions that can assist the user in composing messages, providing quick replies.
     *
     * @type {string[]}
     * @default null
     */
    suggestions: string[];
    /**
     * Specifies whether time breaks are enabled for grouping chat messages by date.
     * When set to `true`, messages will be grouped based on their timestamp, creating date-wise separators within the chat.
     *
     * @type {boolean}
     * @default false
     */
    showTimeBreak: boolean;
    /**
     * Specifies a collection of messages within the Chat UI component.
     * Each message is represented by a MessageModel object, containing properties such as text, author, timestamp, and status.
     *
     * @type {MessageModel[]}
     * @default null
     */
    messages: MessageModel[];
    /**
     * Specifies a list of users who are currently typing in the chat.
     * This property is updated to indicate active participants typing responses.
     *
     * @type {UserModel[]}
     * @default null
     * @aspType List<ChatUIUser>
     */
    typingUsers: UserModel[];
    /**
     * Specifies the format of the value that to be displayed in component.
     * By default, the format will be set based on the culture. You can set the format to "format:'dd/MM/yyyy hh:mm a'" in string.
     *
     * @type {string}
     * @default 'dd/MM/yyyy hh:mm a'
     */
    timeStampFormat: string;
    /**
     * Specifies whether timestamps are displayed alongside each message in the Chat UI component.
     * When set to true, timestamps will appear with each message, helping users track the timing of conversations.
     *
     * @type {boolean}
     * @default true
     */
    showTimeStamp: boolean;
    /**
     * Specifies whether the UI should automatically scroll to the bottom when a new message is added to the Chat UI component.
     * When set to `true`, the chat will automatically scroll to display the latest message, ensuring that users can see new messages without manual intervention.
     *
     * @type {boolean}
     * @default false
     */
    autoScrollToBottom: boolean;
    /**
     * Enables on-demand loading of messages, typically triggered as the user scrolls through the chat history.
     * When set to `true`, older messages will load progressively, improving performance for large message histories by avoiding initial loading of all messages.
     *
     * @type {boolean}
     * @default false
     */
    loadOnDemand: boolean;
    /**
     * Specifies the template for rendering suggestion items in the Chat UI component.
     * Defines the content or layout used to render suggestion items, and can be either a string or a function.
     * The template context includes the index and suggestion text.
     *
     * @type {string | Function}
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    suggestionTemplate: string | Function;
    /**
     * Specifies the template for the footer area in the Chat UI component.
     * Defines the content or layout used to render the footer, which can be provided as a string or a function.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    footerTemplate: string | Function;
    /**
     * Specifies the template for rendering the empty state of the Chat UI component.
     * This property can accept either a string or a function to customize the appearance when there are no messages to display in the chat.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    emptyChatTemplate: string | Function;
    /**
     * Specifies the template for rendering individual messages in the Chat UI component.
     * This property can accept either a string or a function to customize the appearance of messages. The template context includes message and index.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    messageTemplate: string | Function;
    /**
     * Defines a custom template for rendering time breaks in the Chat UI component.
     * Accepts a string or function that formats the appearance of date-based separators, allowing customization of how messages are visually grouped by date.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    timeBreakTemplate: string | Function;
    /**
     * Template for displaying users currently typing in the chat interface.
     * Accepts a string or function to customize the display format.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    typingUsersTemplate: string | Function;
    /**
     * Event triggered when a message is about to be sent in the Chat UI component.
     * This event allows for cancelling the send action if needed.
     *
     * @event messageSend
     */
    messageSend: EmitType<MessageSendEventArgs>;
    /**
     * Event triggered when the user is typing a message in the Chat UI component.
     * This event provides updates on the user's typing status.
     *
     * @event userTyping
     */
    userTyping: EmitType<TypingEventArgs>;
    private l10n;
    private footer;
    private sendIcon;
    private textareaObj;
    private viewWrapper;
    private chatHeader;
    private messageWrapper;
    private downArrowIcon;
    private intl;
    private indicatorWrapper;
    private isEmptyChatTemplateRendered;
    private startIndex;
    private multiplier;
    private toolbar;
    private isScrollAtBottom;
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: ChatUIModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    protected getDirective(): string;
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    protected render(): void;
    private renderChatUIView;
    private updateScrollPosition;
    private renderChatHeader;
    private renderChatHeaderToolbar;
    private updateHeaderToolbar;
    private renderChatContentElement;
    private setChatMsgId;
    private renderScrollDown;
    private loadBatch;
    private renderMessageGroup;
    private isTimeBreakAdded;
    private getLastUser;
    private renderGroup;
    private isTimeVaries;
    private loadLeftGroupOnDemand;
    private createLeftGroupItems;
    private createAvatarIcon;
    private getTimeStampElement;
    private updateTimeFormats;
    private getFormattedTime;
    private getFormat;
    private addGroupItems;
    private manageChatContent;
    private createTimebreakElement;
    private handleTimeBreak;
    private renderNewMessage;
    private loadMoreMessages;
    private updateMessageTimeFormats;
    private getMessageDate;
    private renderChatSuggestionsElement;
    private handleSuggestionUpdate;
    private onSuggestionClick;
    private renderChatFooterContent;
    private renderChatFooter;
    private handleInput;
    private triggerUserTyping;
    private renderTypingIndicator;
    private updateUserText;
    private getTypingMessage;
    private updateTypingUsers;
    private updateTextAreaObject;
    private getRowCount;
    private activateSendIcon;
    private updateHeaderIcon;
    private updateHeaderText;
    private renderUpdatedMessage;
    private onSendIconClick;
    private getContextObject;
    private handleAutoScroll;
    private footerKeyHandler;
    private scrollBottomKeyHandler;
    private keyHandler;
    private updateFooter;
    private handleScroll;
    private checkScrollAtBottom;
    private toggleClassName;
    private toggleScrollIcon;
    private scrollBtnClick;
    private updateMessageItem;
    private wireEvents;
    private unwireEvents;
    private destroyChatUI;
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    scrollToBottom(): void;
    /**
     * Appends a new message to the end of the Chat UI conversation area.
     * This method adds the specified message as the latest entry in the chat:
     *
     * @function addMessage
     * @param {string | MessageModel} message - The message to be added to the conversation. Accepts either a plain text string or a `MessageModel` object.
     * - If `message` is a string, a `MessageModel` will be automatically created with the current user’s details, and the message will be appended.
     * - If `message` is an instance of `MessageModel`, it can represent a message from either the current user or another participant and will be appended directly.
     * @returns {void} No return value.
     */
    addMessage(message: string | MessageModel): void;
    /**
     * Updates an existing message in the Chat UI component.
     * This method allows for modifying a message that has already been added to the conversation.
     * It requires the unique identifier of the message to be updated and the new message content as a `MessageModel`.
     *
     * @function updateMessage
     * @param {MessageModel} message - The updated message content represented as a `MessageModel`.
     * @param {string} msgId - The unique identifier of the message to be updated.
     * @returns {void} No return value.
     */
    updateMessage(message: MessageModel, msgId: string): void;
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    scrollToMessage(messageId: string): void;
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    focus(): void;
    destroy(): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: ChatUIModel, oldProp?: ChatUIModel): void;
}
