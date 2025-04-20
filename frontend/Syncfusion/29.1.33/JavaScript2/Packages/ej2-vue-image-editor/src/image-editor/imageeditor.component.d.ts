import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ImageEditor, ImageEditorModel } from '@syncfusion/ej2-image-editor';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS ImageEditor Component.
 * ```html
 * <ejs-imageeditor></ejs-imageeditor>
 * ```
 */
export declare let ImageEditorComponent: DefineVueComponent<ImageEditorModel>;
export declare type ImageEditorComponent = typeof ComponentBase & {
    ej2Instances: ImageEditor;
    isVue3: boolean;
    isLazyUpdate: Boolean;
    plugins: any[];
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    apply(): void;
    applyImageFilter(filterOption: Object): void;
    bringForward(shapeId: string): void;
    bringToFront(shapeId: string): void;
    canRedo(): boolean;
    canUndo(): boolean;
    clearImage(): void;
    clearSelection(resetCrop?: boolean): void;
    cloneShape(shapeId: string): boolean;
    crop(): boolean;
    deleteRedact(id: string): void;
    deleteShape(id: string): void;
    destroy(): void;
    discard(): void;
    drawArrow(startX?: number, startY?: number, endX?: number, endY?: number, strokeWidth?: number, strokeColor?: string, arrowStart?: Object, arrowEnd?: Object, isSelected?: boolean): boolean;
    drawEllipse(x?: number, y?: number, radiusX?: number, radiusY?: number, strokeWidth?: number, strokeColor?: string, fillColor?: string, degree?: number, isSelected?: boolean): boolean;
    drawFrame(frameType: Object, color?: string, gradientColor?: string, size?: number, inset?: number, offset?: number, borderRadius?: number, frameLineStyle?: Object, lineCount?: number): boolean;
    drawImage(data: string | Object, x?: number, y?: number, width?: number, height?: number, isAspectRatio?: boolean, degree?: number, opacity?: number, isSelected?: boolean): boolean;
    drawLine(startX?: number, startY?: number, endX?: number, endY?: number, strokeWidth?: number, strokeColor?: string, isSelected?: boolean): boolean;
    drawPath(pointColl: Object[], strokeWidth?: number, strokeColor?: string, isSelected?: boolean): boolean;
    drawRectangle(x?: number, y?: number, width?: number, height?: number, strokeWidth?: number, strokeColor?: string, fillColor?: string, degree?: number, isSelected?: boolean, borderRadius?: number): boolean;
    drawRedact(type?: Object, x?: number, y?: number, width?: number, height?: number, value?: number): boolean;
    drawText(x?: number, y?: number, text?: string, fontFamily?: string, fontSize?: number, bold?: boolean, italic?: boolean, color?: string, isSelected?: boolean, degree?: number, fillColor?: string, strokeColor?: string, strokeWidth?: number, transformCollection?: Object[]): boolean;
    enableShapeDrawing(shapeType: Object, isEnabled: boolean): void;
    enableTextEditing(): void;
    export(type?: string, fileName?: string, imageQuality?: number): void;
    finetuneImage(finetuneOption: Object, value: number): void;
    flip(direction: Object): void;
    freehandDraw(value: boolean): void;
    getImageData(includeAnnotations?: boolean): Object;
    getImageDimension(): Object;
    getImageFilter(filterOption: Object): string;
    getRedacts(): Object[];
    getShapeSetting(id: string): Object;
    getShapeSettings(): Object[];
    initialize(): void;
    open(data: string | Object, resetChanges?: boolean, imageSettings?: Object): void;
    pan(value: boolean, x?: number, y?: number): void;
    redo(): void;
    reset(): void;
    resize(width: number, height: number, isAspectRatio?: boolean): boolean;
    rotate(degree: number): boolean;
    select(type: string, startX?: number, startY?: number, width?: number, height?: number): void;
    selectRedact(id: string): boolean;
    selectShape(id: string): boolean;
    sendBackward(shapeId: string): void;
    sendToBack(shapeId: string): void;
    straightenImage(degree: number): boolean;
    triggerEditCompleteEvent(args: Object): void;
    undo(): void;
    update(): void;
    updateRedact(setting: Object, isSelected?: boolean): boolean;
    updateShape(setting: Object, isSelected?: boolean): boolean;
    zoom(zoomFactor: number, zoomPoint?: Object): void;
};
export declare const ImageEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
