import * as React from 'react';
import { LinearGauge, LinearGaugeModel } from '@syncfusion/ej2-lineargauge';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface LinearGaugeTypecast {
    tooltip?: any;
}
/**
 * Represents the React Linear Gauge Component. This tag is used to customize the properties of the linear gauge to visualize the data in linear scale.
 * ```tsx
 * <LinearGaugeComponent></LinearGaugeComponent>
 * ```
 */
export declare class LinearGaugeComponent extends LinearGauge {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<LinearGaugeModel | DefaultHtmlAttributes | LinearGaugeTypecast>;
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
    }> & Readonly<LinearGaugeModel | DefaultHtmlAttributes | LinearGaugeTypecast>;
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
