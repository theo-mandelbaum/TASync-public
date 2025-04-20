import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { QRCodeGenerator, QRCodeGeneratorModel } from '@syncfusion/ej2-barcode-generator';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents vue QRCode Component
 * ```html
 * <ejs-qrcode-generator></ejs-qrcode-generator>
 * ```
 */
export declare let QRCodeGeneratorComponent: DefineVueComponent<QRCodeGeneratorModel>;
export declare type QRCodeGeneratorComponent = typeof ComponentBase & {
    ej2Instances: QRCodeGenerator;
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
    exportImage(filename: string, barcodeExportType: Object): void;
};
export declare const QRCodeGeneratorPlugin: {
    name: string;
    install(Vue: any): void;
};
