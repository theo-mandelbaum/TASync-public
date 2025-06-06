import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DropDownTree, DropDownTreeModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
 * ```html
 * <ejs-dropdowntree></ejs-dropdowntree>
 * ```
 */
export declare let DropDownTreeComponent: DefineVueComponent<DropDownTreeModel>;
export declare type DropDownTreeComponent = typeof ComponentBase & {
    ej2Instances: DropDownTree;
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
    clear(): void;
    destroy(): void;
    ensureVisible(item: string | Object): void;
    getData(item?: string | Object): undefined[];
    getLocaleName(): string;
    hidePopup(): void;
    selectAll(state: boolean): void;
    showPopup(): void;
};
export declare const DropDownTreePlugin: {
    name: string;
    install(Vue: any): void;
};
