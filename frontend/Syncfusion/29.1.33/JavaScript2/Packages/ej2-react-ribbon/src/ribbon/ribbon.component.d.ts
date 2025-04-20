import * as React from 'react';
import { Ribbon, RibbonModel } from '@syncfusion/ej2-ribbon';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface RibbonTypecast {
    helpPaneTemplate?: string | Function | any;
}
/**
 * Represents the React Ribbon Component
 * ```tsx
 * <RibbonComponent></RibbonComponent>
 * ```
 */
export declare class RibbonComponent extends Ribbon {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<RibbonModel | DefaultHtmlAttributes | RibbonTypecast>;
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
    }> & Readonly<RibbonModel | DefaultHtmlAttributes | RibbonTypecast>;
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
