import * as React from 'react';
import { Schedule, ScheduleModel } from '@syncfusion/ej2-schedule';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ScheduleTypecast {
    dateHeaderTemplate?: string | Function | any;
    dateRangeTemplate?: string | Function | any;
    dayHeaderTemplate?: string | Function | any;
    cellTemplate?: string | Function | any;
    cellHeaderTemplate?: string | Function | any;
    eventSettings?: any;
    editorTemplate?: string | Function | any;
    editorHeaderTemplate?: string | Function | any;
    editorFooterTemplate?: string | Function | any;
    monthHeaderTemplate?: string | Function | any;
    timeScale?: any;
    resourceHeaderTemplate?: string | Function | any;
    headerIndentTemplate?: string | Function | any;
    quickInfoTemplates?: any;
    group?: any;
}
/**
 * `ScheduleComponent` represents the react Schedule.
 * ```tsx
 * <ScheduleComponent/>
 * ```
 */
export declare class ScheduleComponent extends Schedule {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ScheduleModel | DefaultHtmlAttributes | ScheduleTypecast>;
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
    }> & Readonly<ScheduleModel | DefaultHtmlAttributes | ScheduleTypecast>;
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
