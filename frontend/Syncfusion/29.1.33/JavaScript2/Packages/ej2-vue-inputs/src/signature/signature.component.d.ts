import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Signature, SignatureModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Signature Component
 * ```html
 * <ejs-signature></ejs-signature>
 * ```
 */
export declare let SignatureComponent: DefineVueComponent<SignatureModel>;
export declare type SignatureComponent = typeof ComponentBase & {
    ej2Instances: Signature;
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
    canRedo(): boolean;
    canUndo(): boolean;
    clear(): void;
    destroy(): void;
    draw(text: string, fontFamily?: string, fontSize?: number, x?: number, y?: number): void;
    getBlob(url: string): Object;
    getSignature(type?: Object): string;
    initialize(): void;
    isEmpty(): boolean;
    load(signature: string, width?: number, height?: number): void;
    redo(): void;
    refresh(): void;
    save(type?: Object, fileName?: string): void;
    saveAsBlob(): Object;
    undo(): void;
};
export declare const SignaturePlugin: {
    name: string;
    install(Vue: any): void;
};
