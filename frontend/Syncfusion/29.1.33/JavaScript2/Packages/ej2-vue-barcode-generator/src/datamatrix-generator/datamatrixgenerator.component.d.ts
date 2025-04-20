import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DataMatrixGenerator, DataMatrixGeneratorModel } from '@syncfusion/ej2-barcode-generator';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents vue DataMatrix Component
 * ```html
 * <ejs-datamatrix-generator></ejs-datamatrix-generator>
 * ```
 */
export declare let DataMatrixGeneratorComponent: DefineVueComponent<DataMatrixGeneratorModel>;
export declare type DataMatrixGeneratorComponent = typeof ComponentBase & {
    ej2Instances: DataMatrixGenerator;
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
    exportAsBase64Image(barcodeExportType: Object): Object;
    exportImage(fileName: string, exportType: Object): void;
};
export declare const DataMatrixGeneratorPlugin: {
    name: string;
    install(Vue: any): void;
};
