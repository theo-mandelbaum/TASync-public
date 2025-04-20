import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { TreeMap, TreeMapModel } from '@syncfusion/ej2-treemap';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue TreeMap component. It is used to visualize both hierarchical and flat data.
 * ```vue
 * <ejs-treemap></ejs-treemap>
 * ```
 */
export declare let TreeMapComponent: DefineVueComponent<TreeMapModel>;
export declare type TreeMapComponent = typeof ComponentBase & {
    ej2Instances: TreeMap;
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
    doubleClickOnTreeMap(e: Object): void;
    export(type: Object, fileName: string, orientation?: Object, allowDownload?: boolean): Object;
    print(id?: string[] | string | Object): void;
    selectItem(levelOrder: string[], isSelected?: boolean): void;
};
export declare const TreeMapPlugin: {
    name: string;
    install(Vue: any): void;
};
