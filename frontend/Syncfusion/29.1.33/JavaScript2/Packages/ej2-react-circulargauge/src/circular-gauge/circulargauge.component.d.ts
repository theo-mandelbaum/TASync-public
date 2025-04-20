import * as React from 'react';
import { CircularGauge, CircularGaugeModel } from '@syncfusion/ej2-circulargauge';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface CircularGaugeTypecast {
    tooltip?: any;
}
/**
 * Represents the React Circular Gauge component. This tag is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```tsx
 * <CircularGaugeComponent></CircularGaugeComponent>
 * ```
 */
export declare class CircularGaugeComponent extends CircularGauge {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<CircularGaugeModel | DefaultHtmlAttributes | CircularGaugeTypecast>;
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
    }> & Readonly<CircularGaugeModel | DefaultHtmlAttributes | CircularGaugeTypecast>;
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
