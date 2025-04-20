import * as React from 'react';
import { DataMatrixGenerator, DataMatrixGeneratorModel } from '@syncfusion/ej2-barcode-generator';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents react DataMatrix Component
 * ```tsx
 * <DataMatrixGeneratorComponent></DataMatrixGeneratorComponent>
 * ```
 */
export declare class DataMatrixGeneratorComponent extends DataMatrixGenerator {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DataMatrixGeneratorModel | DefaultHtmlAttributes>;
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
    }> & Readonly<DataMatrixGeneratorModel | DefaultHtmlAttributes>;
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
