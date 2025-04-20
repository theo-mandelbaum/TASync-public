import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Uploader, UploaderModel } from '@syncfusion/ej2-inputs';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Uploader Component
 * ```html
 * <ejs-uploader id='fileUpload' v-bind:multiple='true'></ejs-uploader>
 * ```
 */
export declare let UploaderComponent: DefineVueComponent<UploaderModel>;
export declare type UploaderComponent = typeof ComponentBase & {
    ej2Instances: Uploader;
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
    bytesToSize(bytes: number): string;
    cancel(fileData?: Object[]): void;
    clearAll(): void;
    createFileList(fileData: Object[]): void;
    destroy(): void;
    getFilesData(index?: number): Object[];
    pause(fileData?: Object | Object[], custom?: boolean): void;
    remove(fileData?: Object | Object[], customTemplate?: boolean, removeDirectly?: boolean, postRawFile?: boolean, args?: Object | Object | Object): void;
    resume(fileData?: Object | Object[], custom?: boolean): void;
    retry(fileData?: Object | Object[], fromcanceledStage?: boolean, custom?: boolean): void;
    sortFileList(filesData?: Object): Object[];
    traverseFileTree(item: any, event?: Object | Object | Object | Object): void;
    upload(files?: Object | Object[], custom?: boolean): void;
};
export declare const UploaderPlugin: {
    name: string;
    install(Vue: any): void;
};
