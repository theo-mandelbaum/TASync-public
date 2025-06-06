import * as React from 'react';
import { Gantt, GanttModel } from '@syncfusion/ej2-gantt';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface GanttTypecast {
    parentTaskbarTemplate?: string | Function | any;
    timelineTemplate?: string | Function | any;
    milestoneTemplate?: string | Function | any;
    taskbarTemplate?: string | Function | any;
    labelSettings?: any;
    tooltipSettings?: any;
}
/**
 * `GanttComponent` represents the react Gantt.
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}/>
 * ```
 */
export declare class GanttComponent extends Gantt {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<GanttModel | DefaultHtmlAttributes | GanttTypecast>;
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
    }> & Readonly<GanttModel | DefaultHtmlAttributes | GanttTypecast>;
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
