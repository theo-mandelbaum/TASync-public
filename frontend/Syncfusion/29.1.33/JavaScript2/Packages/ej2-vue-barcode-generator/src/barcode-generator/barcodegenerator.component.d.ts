import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { BarcodeGenerator, BarcodeGeneratorModel } from '@syncfusion/ej2-barcode-generator';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents vue Barcode Component
 * ```html
 * <ejs-barcode-generator></ejs-barcode-generator>
 * ```
 */
export declare let BarcodeGeneratorComponent: DefineVueComponent<BarcodeGeneratorModel>;
export declare type BarcodeGeneratorComponent = typeof ComponentBase & {
    ej2Instances: BarcodeGenerator;
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
    exportAsBase64Image(exportType: Object): Object;
    exportImage(filename: string, exportType: Object): void;
};
export declare const BarcodeGeneratorPlugin: {
    name: string;
    install(Vue: any): void;
};
