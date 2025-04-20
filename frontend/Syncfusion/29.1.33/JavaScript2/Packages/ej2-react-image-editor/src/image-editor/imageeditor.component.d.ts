import * as React from 'react';
import { ImageEditor, ImageEditorModel } from '@syncfusion/ej2-image-editor';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface ImageEditorTypecast {
    toolbarTemplate?: string | Function | any;
}
/**
 * Represents the React ImageEditor Component
 * ```html
 * <ImageEditorComponent></ImageEditorComponent>
 * ```
 */
export declare class ImageEditorComponent extends ImageEditor {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ImageEditorModel | DefaultHtmlAttributes | ImageEditorTypecast>;
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
    }> & Readonly<ImageEditorModel | DefaultHtmlAttributes | ImageEditorTypecast>;
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
