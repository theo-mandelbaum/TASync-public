import * as React from 'react';
import { MultiColumnComboBox, MultiColumnComboBoxModel } from '@syncfusion/ej2-multicolumn-combobox';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface MultiColumnComboBoxTypecast {
    footerTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
    groupTemplate?: string | Function | any;
}
/**
 * Represents the React MultiColumnComboBox Component
 * ```tsx
 * <MultiColumnComboBoxComponent dataSource={data}></MultiColumnComboBoxComponent>
 * ```
 */
export declare class MultiColumnComboBoxComponent extends MultiColumnComboBox {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<MultiColumnComboBoxModel | DefaultHtmlAttributes | MultiColumnComboBoxTypecast>;
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
    }> & Readonly<MultiColumnComboBoxModel | DefaultHtmlAttributes | MultiColumnComboBoxTypecast>;
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
