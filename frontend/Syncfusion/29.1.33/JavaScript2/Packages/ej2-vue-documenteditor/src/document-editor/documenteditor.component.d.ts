import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DocumentEditor, DocumentEditorModel } from '@syncfusion/ej2-documenteditor';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Document Editor Component
 * ```html
 * <ejs-documenteditor id='container'></ejs-documenteditor>
 * ```
 */
export declare let DocumentEditorComponent: DefineVueComponent<DocumentEditorModel>;
export declare type DocumentEditorComponent = typeof ComponentBase & {
    ej2Instance: DocumentEditor;
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
    destroy(): void;
    enableAllModules(): void;
    exportAsImage(pageNumber: number, format: Object): Object;
    exportContentControlData(): Object[];
    exportFormData(): Object[];
    fitPage(pageFitType?: Object): void;
    focusIn(): void;
    getBookmarks(): string[];
    getComments(): Object[];
    getFormFieldInfo(name: string): Object | Object | Object;
    getFormFieldNames(): string[];
    getStyleNames(styleType?: Object): string[];
    getStyles(styleType?: Object): Object[];
    importContentControlData(contentControlInfo: Object[]): Object[];
    importFormData(formData: Object[]): void;
    open(inputData: string): void;
    openAsync(inputData: string): void;
    openBlank(): void;
    print(printWindow?: Object): void;
    resetContentControlData(contentControInfo: Object[]): void;
    resetFormFields(name?: string): void;
    resize(width?: number, height?: number): void;
    save(fileName: string, formatType?: Object): void;
    saveAsBlob(formatType?: Object): Object;
    scrollToPage(pageNumber: number): boolean;
    serialize(): string;
    setCustomFonts(fonts: string | object[]): void;
    setDefaultCharacterFormat(characterFormat: Object): void;
    setDefaultParagraphFormat(paragraphFormat: Object): void;
    setDefaultSectionFormat(sectionFormat: Object): void;
    setFormFieldInfo(name: string, formFieldInfo: Object | Object | Object): void;
    showDialog(dialogType: Object): void;
    showOptionsPane(): void;
    showRestrictEditingPane(show?: boolean): void;
    showXmlPane(): void;
    updateFields(): void;
};
export declare const DocumentEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
