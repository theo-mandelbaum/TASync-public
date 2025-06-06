import * as React from 'react';
import { PivotView, PivotViewModel } from '@syncfusion/ej2-pivotview';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface PivotViewTypecast {
    cellTemplate?: string | Function | any;
    tooltipTemplate?: string | Function | any;
}
/**
 * `PivotViewComponent` represents the react Pivot Table.
 * ```tsx
 * <PivotViewComponent></PivotViewComponent>
 * ```
 */
export declare class PivotViewComponent extends PivotView {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<PivotViewModel | DefaultHtmlAttributes | PivotViewTypecast>;
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
    }> & Readonly<PivotViewModel | DefaultHtmlAttributes | PivotViewTypecast>;
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
