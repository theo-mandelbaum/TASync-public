import * as React from 'react';
import { SymbolPalette, SymbolPaletteModel } from '@syncfusion/ej2-diagrams';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents react SymbolPalette Component
 * ```tsx
 * <SymbolPaletteComponent></SymbolPaletteComponent>
 * ```
 */
export declare class SymbolPaletteComponent extends SymbolPalette {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<SymbolPaletteModel | DefaultHtmlAttributes>;
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
    }> & Readonly<SymbolPaletteModel | DefaultHtmlAttributes>;
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
