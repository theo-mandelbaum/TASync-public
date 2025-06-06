import { PivotFieldList } from '../base/field-list';
import { IAction } from '../../common/base/interface';
import { TreeView } from '@syncfusion/ej2-navigations';
/**
 * Module to render Field List
 */
/** @hidden */
export declare class TreeViewRenderer implements IAction {
    /** @hidden */
    parent: PivotFieldList;
    /** @hidden */
    fieldTable: TreeView;
    private parentElement;
    private fieldDialog;
    private treeViewElement;
    private editorSearch;
    private selectedNodes;
    private fieldListSort;
    private fieldSearch;
    private nonSearchList;
    private isSearching;
    private parentIDs;
    private isSpaceKey;
    /** Constructor for render module
     *
     * @param {PivotFieldList} parent - Instance of field list.
     */
    constructor(parent: PivotFieldList);
    /**
     * Initialize the field list tree rendering
     *
     * @param {number} axis - Axis position.
     * @returns {void}
     * @private
     */
    render(axis?: number): void;
    private updateSortElements;
    private renderTreeView;
    private updateNodeIcon;
    private updateTreeNode;
    private updateOlapTreeNode;
    private renderTreeDialog;
    private createTreeView;
    private textChange;
    private dragStart;
    private dragStop;
    private isNodeDropped;
    private getButton;
    private nodeChecked;
    private nodeStateChange;
    private updateReportSettings;
    private updateCheckState;
    private updateNodeStateChange;
    private updateSelectedNodes;
    private updateDataSource;
    private addNode;
    private refreshTreeView;
    private getUpdatedData;
    private getTreeData;
    private getOlapTreeData;
    private updateExpandedNodes;
    private updateSorting;
    private applySorting;
    private onFieldAdd;
    private closeTreeDialog;
    private keyPress;
    private wireFieldListEvent;
    private unWireFieldListEvent;
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * To destroy the tree view event listener
     *
     * @returns {void}
     * @hidden
     */
    destroy(): void;
}
