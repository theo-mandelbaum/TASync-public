import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { TreeView, TreeViewModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the EJ2 VueJS TreeView Component.
 * ```html
 * <ejs-treeview></ejs-treeview>
 * ```
 */
export declare let TreeViewComponent: DefineVueComponent<TreeViewModel>;
export declare type TreeViewComponent = typeof ComponentBase & {
    ej2Instances: TreeView;
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
    addNodes(nodes: undefined[], target?: string | Object, index?: number, preventTargetExpand?: boolean): void;
    beginEdit(node: string | Object): void;
    checkAll(nodes?: string[] | Object[]): void;
    collapseAll(nodes?: string[] | Object[], level?: number, excludeHiddenNodes?: boolean): void;
    destroy(): void;
    disableNodes(nodes: string[] | Object[]): void;
    enableNodes(nodes: string[] | Object[]): void;
    ensureVisible(node: string | Object): void;
    expandAll(nodes?: string[] | Object[], level?: number, excludeHiddenNodes?: boolean, preventAnimation?: boolean): void;
    getAllCheckedNodes(): string[];
    getDisabledNodes(): string[];
    getNode(node: string | Object): Object;
    getTreeData(node?: string | Object): undefined[];
    moveNodes(sourceNodes: string[] | Object[], target: string | Object, index: number, preventTargetExpand?: boolean): void;
    refreshNode(target: string | Object, newData: undefined[]): void;
    removeNodes(nodes: string[] | Object[]): void;
    uncheckAll(nodes?: string[] | Object[]): void;
    updateNode(target: string | Object, newText: string): void;
};
export declare const TreeViewPlugin: {
    name: string;
    install(Vue: any): void;
};
