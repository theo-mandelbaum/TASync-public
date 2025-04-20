import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { RichTextEditor, RichTextEditorModel } from '@syncfusion/ej2-richtexteditor';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-richtexteditor` represents the VueJS RichTextEditor Component.
 * ```vue
 * <ejs-richtexteditor></ejs-richtexteditor>
 * ```
 */
export declare let RichTextEditorComponent: DefineVueComponent<RichTextEditorModel>;
export declare type RichTextEditorComponent = typeof ComponentBase & {
    ej2Instances: RichTextEditor;
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
    addAnchorAriaLabel(value: string): string;
    cleanList(e: Object): void;
    closeDialog(type: Object): void;
    destroy(): void;
    disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    executeCommand(commandName: Object, value?: string | Object | Object | Object | Object | Object | Object | Object, option?: Object): void;
    focusIn(): void;
    focusOut(): void;
    getCharCount(): number;
    getContent(): Object;
    getHtml(): string;
    getRange(): Object;
    getSelectedHtml(): string;
    getSelection(): string;
    getText(): string;
    getXhtml(): string;
    hideInlineToolbar(): void;
    print(): void;
    refreshUI(): void;
    removeToolbarItem(items: string | string[]): void;
    renderTemplates(callBack: any): void;
    sanitizeHtml(value: string): string;
    selectAll(): void;
    selectRange(range: Object): void;
    showDialog(type: Object): void;
    showEmojiPicker(x?: number, y?: number): void;
    showFullScreen(): void;
    showInlineToolbar(): void;
    showSourceCode(): void;
};
export declare const RichTextEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
