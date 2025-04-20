import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { PivotView, PivotViewModel } from '@syncfusion/ej2-pivotview';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-pivotview` represents the VueJS Pivot Table Component.
 * ```vue
 * <ejs-pivotview></ejs-pivotview>
 * ```
 */
export declare let PivotViewComponent: DefineVueComponent<PivotViewModel>;
export declare type PivotViewComponent = typeof ComponentBase & {
    ej2Instances: PivotView;
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
    chartExport(type: Object, pdfExportProperties?: Object, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Object;
    createCalculatedFieldDialog(): void;
    csvExport(excelExportProperties?: Object, isMultipleExport?: boolean, workbook?: Object, isBlob?: boolean): void;
    destroy(): void;
    excelExport(excelExportProperties?: Object, isMultipleExport?: boolean, workbook?: Object, isBlob?: boolean): void;
    loadPersistData(persistData: string): void;
    pdfExport(pdfExportProperties?: Object, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean, exportBothTableAndChart?: boolean): Object;
    printChart(): void;
    refresh(): void;
    showConditionalFormattingDialog(): void;
    showNumberFormattingDialog(): void;
};
export declare const PivotViewPlugin: {
    name: string;
    install(Vue: any): void;
};
