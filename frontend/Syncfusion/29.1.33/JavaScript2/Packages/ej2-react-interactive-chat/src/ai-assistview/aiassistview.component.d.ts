import * as React from 'react';
import { AIAssistView, AIAssistViewModel } from '@syncfusion/ej2-interactive-chat';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface AIAssistViewTypecast {
    footerTemplate?: string | Function | any;
    promptItemTemplate?: string | Function | any;
    responseItemTemplate?: string | Function | any;
    promptSuggestionItemTemplate?: string | Function | any;
    bannerTemplate?: string | Function | any;
}
/**
 * Represents the React AIAssistView Component
 * ```tsx
 * <AIAssistViewComponent></AIAssistViewComponent>
 * ```
 */
export declare class AIAssistViewComponent extends AIAssistView {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<AIAssistViewModel | DefaultHtmlAttributes | AIAssistViewTypecast>;
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
    }> & Readonly<AIAssistViewModel | DefaultHtmlAttributes | AIAssistViewTypecast>;
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
