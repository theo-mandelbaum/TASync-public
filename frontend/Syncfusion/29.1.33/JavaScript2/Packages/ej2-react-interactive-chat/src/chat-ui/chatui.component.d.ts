import * as React from 'react';
import { ChatUI, ChatUIModel } from '@syncfusion/ej2-interactive-chat';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ChatUITypecast {
    suggestionTemplate?: string | Function | any;
    footerTemplate?: string | Function | any;
    emptyChatTemplate?: string | Function | any;
    messageTemplate?: string | Function | any;
    typingUsersTemplate?: string | Function | any;
    timeBreakTemplate?: string | Function | any;
}
/**
 * Represents the React ChatUI Component
 * ```tsx
 * <ChatUIComponent></ChatUIComponent>
 * ```
 */
export declare class ChatUIComponent extends ChatUI {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ChatUIModel | DefaultHtmlAttributes | ChatUITypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private statelessTemplateProps;
    private templateProps;
    private immediateRender;
    private isReactMock;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ChatUIModel | DefaultHtmlAttributes | ChatUITypecast>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    portals: any;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
