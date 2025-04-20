import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { FileManager, FileManagerModel } from '@syncfusion/ej2-filemanager';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS FileManager Component.
 * ```vue
 * <ejs-filemanager showThumbnail='false'></ejs-filemanager>
 * ```
 */
export declare let FileManagerComponent: DefineVueComponent<FileManagerModel>;
export declare type FileManagerComponent = typeof ComponentBase & {
    ej2Instances: FileManager;
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
    clearSelection(): void;
    closeDialog(): void;
    createFolder(name?: string): void;
    deleteFiles(ids?: string[]): void;
    destroy(): void;
    disableMenuItems(items: string[]): void;
    disableToolbarItems(items: string[]): void;
    downloadFiles(ids?: string[]): void;
    enableMenuItems(items: string[]): void;
    enableToolbarItems(items: string[]): void;
    filterFiles(filterData?: Object): void;
    getMenuItemIndex(item: string): number;
    getSelectedFiles(): Object[];
    getToolbarItemIndex(item: string): number;
    openFile(id: string): void;
    refreshFiles(): void;
    refreshLayout(): void;
    renameFile(id?: string, name?: string): void;
    selectAll(): void;
    traverseBackward(): void;
    uploadFiles(): void;
};
export declare const FileManagerPlugin: {
    name: string;
    install(Vue: any): void;
};
