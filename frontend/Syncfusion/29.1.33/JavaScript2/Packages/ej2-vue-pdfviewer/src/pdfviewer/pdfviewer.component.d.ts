import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { PdfViewer, PdfViewerModel } from '@syncfusion/ej2-pdfviewer';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-pdfviewer` represents the VueJS PdfViewer Component.
 * ```vue
 * <ejs-pdfviewer></ejs-pdfviewer>
 * ```
 */
export declare let PdfViewerComponent: DefineVueComponent<PdfViewerModel>;
export declare type PdfViewerComponent = typeof ComponentBase & {
    ej2Instances: PdfViewer;
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
    addAnnotation(annotation: any): void;
    addCustomMenu(menuItems: Object[], disableDefaultItems?: boolean, appendToEnd?: boolean): void;
    clearFormFields(formField?: any): void;
    convertClientPointToPagePoint(clientPoint: Object, pageNumber: number): Object;
    convertPagePointToClientPoint(pagePoint: Object, pageNumber: number): Object;
    convertPagePointToScrollingPoint(pagePoint: Object, pageNumber: number): Object;
    deleteAnnotations(): void;
    destroy(): void;
    download(): void;
    exportAnnotation(annotationDataFormat?: Object): void;
    exportAnnotationsAsBase64String(annotationDataFormat: Object): Object;
    exportAnnotationsAsObject(annotationDataFormat: Object): Object;
    exportFormFields(data?: string, formFieldDataFormat?: Object): void;
    exportFormFieldsAsObject(formFieldDataFormat: Object): Object;
    extractText(pageIndex: number, options: Object): Object;
    focusFormField(field: any): void;
    getPageInfo(pageIndex: number): Object;
    getPageNumberFromClientPoint(clientPoint: Object): number;
    importAnnotation(importData: any, annotationDataFormat?: Object): void;
    importFormFields(data?: string, formFieldDataFormat?: Object): void;
    load(document: string | Object, password: string): void;
    redo(): void;
    requiredModules(): Object[];
    resetFormFields(): void;
    retrieveFormFields(): Object[];
    saveAsBlob(): Object;
    setJsonData(jsonData: any): void;
    showNotificationPopup(errorString: string): void;
    undo(): void;
    unload(): void;
    updateFormFields(formFields: any): void;
    updateFormFieldsValue(fieldValue: any): void;
    updateViewerContainer(): void;
    zoomToRect(rectangle: Object): void;
};
export declare const PdfViewerPlugin: {
    name: string;
    install(Vue: any): void;
};
