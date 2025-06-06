import * as React from 'react';
import { Overview, OverviewModel } from '@syncfusion/ej2-diagrams';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents react Overview Component
 * ```tsx
 * <OverviewComponent></OverviewComponent>
 * ```
 */
export declare class OverviewComponent extends Overview {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<OverviewModel | DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private statelessTemplateProps;
    private templateProps;
    private immediateRender;
    private isReactMock;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<OverviewModel | DefaultHtmlAttributes>;
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
