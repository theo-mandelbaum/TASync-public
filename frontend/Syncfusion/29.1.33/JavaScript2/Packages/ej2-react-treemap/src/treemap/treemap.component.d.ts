import * as React from 'react';
import { TreeMap, TreeMapModel } from '@syncfusion/ej2-treemap';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface TreeMapTypecast {
    tooltipSettings?: any;
    leafItemSettings?: any;
}
/**
 * Represents the React TreeMap component. It is used to visualize both hierarchical and flat data.
 * ```tsx
 * <TreeMapComponent></TreeMapComponent>
 * ```
 */
export declare class TreeMapComponent extends TreeMap {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TreeMapModel | DefaultHtmlAttributes | TreeMapTypecast>;
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
    }> & Readonly<TreeMapModel | DefaultHtmlAttributes | TreeMapTypecast>;
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
