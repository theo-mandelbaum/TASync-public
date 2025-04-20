import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { InPlaceEditor, InPlaceEditorModel } from '@syncfusion/ej2-inplace-editor';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-inplace-editor` represents the VueJS InPlaceEditor Component.
 * ```vue
 * <ejs-inplaceeditor></ejs-inplaceeditor>
 * ```
 */
export declare let InPlaceEditorComponent: DefineVueComponent<InPlaceEditorModel>;
export declare type InPlaceEditorComponent = typeof ComponentBase & {
    ej2Instances: InPlaceEditor;
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
    extendModelValue(val: string | number | boolean | Object | object | Object | string[] | Object[] | number[] | boolean[] | object[]): void;
    save(): void;
    setValue(): void;
    validate(): void;
};
export declare const InPlaceEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
