import * as React from 'react';
import { QRCodeGenerator, QRCodeGeneratorModel } from '@syncfusion/ej2-barcode-generator';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents react QRCode Component
 * ```tsx
 * <QRCodeGeneratorComponent></QRCodeGeneratorComponent>
 * ```
 */
export declare class QRCodeGeneratorComponent extends QRCodeGenerator {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<QRCodeGeneratorModel | DefaultHtmlAttributes>;
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
    }> & Readonly<QRCodeGeneratorModel | DefaultHtmlAttributes>;
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
