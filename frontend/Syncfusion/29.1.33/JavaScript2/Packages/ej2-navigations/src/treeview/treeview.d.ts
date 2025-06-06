import { Component, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ChildProperty } from '@syncfusion/ej2-base';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Effect } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { TapEventArgs } from '@syncfusion/ej2-base';
import { TreeViewModel, FieldsSettingsModel, NodeAnimationSettingsModel, ActionSettingsModel } from './treeview-model';
/**
 * Interface for NodeExpand event arguments.
 */
export interface NodeExpandEventArgs {
    /**
     * If you want to cancel this event then, set cancel as true. Otherwise, false.
     */
    cancel: boolean;
    /**
     * If the event is triggered by interaction, it returns true. Otherwise, it returns false.
     */
    isInteracted: boolean;
    /**
     * Return the expanded/collapsed TreeView node.
     */
    node: HTMLLIElement;
    /**
     *
     * Return the expanded/collapsed node as JSON object from data source.
     *
     *
     */
    nodeData: {
        [key: string]: Object;
    };
    event: MouseEvent | KeyboardEventArgs | TapEventArgs;
}
/**
 * Interface for NodeSelect event arguments.
 */
export interface NodeSelectEventArgs {
    /**
     * Return the name of action like select or un-select.
     */
    action: string;
    /**
     * If you want to cancel this event then, set cancel as true. Otherwise, false.
     */
    cancel: boolean;
    /**
     * If the event is triggered by interaction, it returns true. Otherwise, it returns false.
     */
    isInteracted: boolean;
    /**
     * Return the currently selected TreeView node.
     */
    node: HTMLLIElement;
    /**
     * Return the currently selected node as JSON object from data source.
     *
     */
    nodeData: {
        [key: string]: Object;
    };
}
/**
 * Interface for NodeCheck event arguments.
 */
export interface NodeCheckEventArgs {
    /**
     * Return the name of action like check or un-check.
     */
    action: string;
    /**
     * If you want to cancel this event then, set cancel as true. Otherwise, false.
     */
    cancel: boolean;
    /**
     * If the event is triggered by interaction, it returns true. Otherwise, it returns false.
     */
    isInteracted: boolean;
    /**
     * Return the currently checked TreeView node.
     */
    node: HTMLLIElement;
    /**
     * Return the currently checked node as JSON object from data source.
     *
     */
    data: {
        [key: string]: Object;
    }[];
}
/**
 * Interface for NodeEdit event arguments.
 */
export interface NodeEditEventArgs {
    /**
     * If you want to cancel this event then, set cancel as true. Otherwise, false.
     */
    cancel: boolean;
    /**
     * Return the current TreeView node new text.
     */
    newText: string;
    /**
     * Return the current TreeView node.
     */
    node: HTMLLIElement;
    /**
     * Return the current node as JSON object from data source.
     *
     */
    nodeData: {
        [key: string]: Object;
    };
    /**
     * Return the current TreeView node old text.
     */
    oldText: string;
    /**
     * Gets or sets the inner HTML of TreeView node while editing.
     */
    innerHtml: string;
}
/**
 * Interface for DragAndDrop event arguments.
 */
export interface DragAndDropEventArgs {
    /**
     * If you want to cancel this event then, set cancel as true. Otherwise, false.
     */
    cancel: boolean;
    /**
     * Return the cloned element
     */
    clonedNode: HTMLElement;
    /**
     * Return the actual event.
     */
    event: MouseEvent & TouchEvent;
    /**
     * Return the currently dragged TreeView node.
     */
    draggedNode: HTMLLIElement;
    /**
     * Return the currently dragged node as array of JSON object from data source.
     *
     */
    draggedNodeData: {
        [key: string]: Object;
    };
    /**
     * Returns the dragged/dropped element's target index position
     *
     */
    dropIndex: number;
    /**
     * Returns the dragged/dropped element's target level
     *
     */
    dropLevel: number;
    /**
     * Return the dragged element's source parent
     */
    draggedParentNode: Element;
    /**
     * Return the dragged element's destination parent
     */
    dropTarget: Element;
    /**
     * Return the cloned element's drop status icon while dragging
     */
    dropIndicator: string;
    /**
     * Return the dropped TreeView node.
     */
    droppedNode: HTMLLIElement;
    /**
     * Return the dropped node as array of JSON object from data source.
     *
     */
    droppedNodeData: {
        [key: string]: Object;
    };
    /**
     * Return the target element from which drag starts/end.
     */
    target: HTMLElement;
    /**
     * Return boolean value for preventing auto-expanding of parent node.
     */
    preventTargetExpand?: boolean;
    /**
     * Denotes the cloned element's drop position relative to the dropped node while dragging. The available values are,
     *   1. Inside – Denotes that the cloned element will be appended as the child node of the dropped node.
     *   2. Before - Denotes that the cloned element will be appended before the dropped node.
     *   3. After - Denotes that the cloned element will be appended after the dropped node.
     */
    position: string;
}
/**
 * Interface for DrawNode event arguments.
 */
export interface DrawNodeEventArgs {
    /**
     * Return the current rendering node.
     */
    node: HTMLLIElement;
    /**
     * Return the current rendering node as JSON object.
     *
     * @isGenericType true
     */
    nodeData: {
        [key: string]: Object;
    };
    /**
     * Return the current rendering node text.
     */
    text: string;
}
/**
 * Interface for NodeClick event arguments.
 */
export interface NodeClickEventArgs {
    /**
     * Return the actual event.
     */
    event: MouseEvent;
    /**
     * Return the current clicked TreeView node.
     */
    node: HTMLLIElement;
}
/**
 * Interface for NodeKeyPress event arguments.
 */
export interface NodeKeyPressEventArgs {
    /**
     * If you want to cancel this event then, set cancel as true. Otherwise, false.
     */
    cancel: boolean;
    /**
     * Return the actual event.
     *
     */
    event: KeyboardEventArgs;
    /**
     * Return the current active TreeView node.
     */
    node: HTMLLIElement;
}
/**
 * Interface for DataBound event arguments.
 */
export interface DataBoundEventArgs {
    /**
     * Return the TreeView data.
     *
     * @isGenericType true
     */
    data: {
        [key: string]: Object;
    }[];
}
/**
 * Interface for DataSourceChanged event arguments.
 */
export interface DataSourceChangedEventArgs {
    /**
     * Return the updated TreeView data. The data source will be updated after performing some operation like
     * drag and drop, node editing, adding and removing node. If you want to get updated data source after performing operation like
     * selecting/unSelecting, checking/unChecking, expanding/collapsing the node, then you can use getTreeData method.
     *
     * @isGenericType true
     */
    data: {
        [key: string]: Object;
    }[];
    /**
     * Return the action which triggers the event
     *
     */
    action: string;
    /**
     * Return the new node data of updated data source
     *
     */
    nodeData: {
        [key: string]: Object;
    }[];
}
/**
 * Interface that holds the node details.
 */
export interface NodeData {
    /**
     * Specifies the ID field mapped in dataSource.
     */
    id: string;
    /**
     * Specifies the mapping field for text displayed as TreeView node's display text.
     */
    text: string;
    /**
     * Specifies the parent ID field mapped in dataSource.
     */
    parentID: string;
    /**
     * Specifies the mapping field for selected state of the TreeView node.
     */
    selected: boolean;
    /**
     * Specifies the mapping field for expand state of the TreeView node.
     */
    expanded: boolean;
    /**
     * Specifies the field for checked state of the TreeView node.
     */
    isChecked: string;
    /**
     * Specifies the mapping field for hasChildren to check whether a node has child nodes or not.
     */
    hasChildren: boolean;
}
/**
 * Interface for Failure event arguments
 */
export interface FailureEventArgs {
    /** Defines the error information. */
    error?: Error;
}
/**
 * Configures the fields to bind to the properties of node in the TreeView component.
 */
export declare class FieldsSettings extends ChildProperty<FieldsSettings> {
    /**
     * Binds the field settings for child nodes or mapping field for nested nodes objects that contain array of JSON objects.
     */
    child: string | FieldsSettingsModel;
    /**
     * Specifies the array of JavaScript objects or instance of DataManager to populate the nodes.
     *
     * @default []
     * @aspDatasourceNullIgnore
     * @isGenericType true
     */
    dataSource: DataManager | {
        [key: string]: Object;
    }[];
    /**
     * Specifies the mapping field for expand state of the TreeView node.
     */
    expanded: string;
    /**
     * Specifies the mapping field for hasChildren to check whether a node has child nodes or not.
     */
    hasChildren: string;
    /**
     * Specifies the mapping field for htmlAttributes to be added to the TreeView node.
     */
    htmlAttributes: string;
    /**
     * Specifies the mapping field for icon class of each TreeView node that will be added before the text.
     */
    iconCss: string;
    /**
     * Specifies the ID field mapped in dataSource.
     */
    id: string;
    /**
     * Specifies the mapping field for image URL of each TreeView node where image will be added before the text.
     */
    imageUrl: string;
    /**
     * Specifies the field for checked state of the TreeView node.
     */
    isChecked: string;
    /**
     * Specifies the parent ID field mapped in dataSource.
     */
    parentID: string;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/api/data/query/)
     * that will execute along with data processing.
     *
     * @default null
     */
    query: Query;
    /**
     * Specifies whether the node can be selected by users or not
     * When set to false, the user interaction is prevented for the corresponding node.
     */
    selectable: string;
    /**
     * Specifies the mapping field for selected state of the TreeView node.
     */
    selected: string;
    /**
     * Specifies the table name used to fetch data from a specific table in the server.
     */
    tableName: string;
    /**
     * Specifies the mapping field for text displayed as TreeView node's display text.
     */
    text: string;
    /**
     * Specifies the mapping field for tooltip that will be displayed as hovering text of the TreeView node.
     */
    tooltip: string;
    /**
     * Specifies the mapping field for navigateUrl to be added as hyper-link of the TreeView node.
     */
    navigateUrl: string;
}
/**
 * Defines the expand type of the TreeView node.
 * ```props
 * Auto :- The expand/collapse operation happens when you double-click on the node in desktop.
 * Click :- The expand/collapse operation happens when you single-click on the node in desktop.
 * DblClick :- The expand/collapse operation happens when you double-click on the node in desktop.
 * None :- The expand/collapse operation will not happen.
 * ```
 */
export declare type ExpandOnSettings = 'Auto' | 'Click' | 'DblClick' | 'None';
/**
 * Defines the sorting order type for TreeView.
 * ```props
 * None :- Indicates that the nodes are not sorted.
 * Ascending :- Indicates that the nodes are sorted in the ascending order.
 * Descending :- Indicates that the nodes are sorted in the descending order
 * ```
 */
export declare type SortOrder = 'None' | 'Ascending' | 'Descending';
/**
 * Configures animation settings for the TreeView component.
 */
export declare class ActionSettings extends ChildProperty<ActionSettings> {
    /**
     * Specifies the type of animation.
     *
     * @default 'SlideDown'
     */
    effect: Effect;
    /**
     * Specifies the duration to animate.
     *
     * @default 400
     */
    duration: number;
    /**
     * Specifies the animation timing function.
     *
     * @default 'linear'
     */
    easing: string;
}
/**
 * Configures the animation settings for expanding and collapsing nodes in TreeView.
 */
export declare class NodeAnimationSettings extends ChildProperty<NodeAnimationSettings> {
    /**
     * Specifies the animation that applies on collapsing the nodes.
     *
     * @default { effect: 'SlideUp', duration: 400, easing: 'linear' }
     */
    collapse: ActionSettingsModel;
    /**
     * Specifies the animation that applies on expanding the nodes.
     *
     * @default { effect: 'SlideDown', duration: 400, easing: 'linear' }
     */
    expand: ActionSettingsModel;
}
/**
 * The TreeView component is used to represent hierarchical data in a tree like structure with advanced
 * functions to perform edit, drag and drop, selection with check-box, and more.
 * ```html
 * <div id="tree"></div>
 * ```
 * ```typescript
 * let treeObj: TreeView = new TreeView();
 * treeObj.appendTo('#tree');
 * ```
 */
export declare class TreeView extends Component<HTMLElement> implements INotifyPropertyChanged {
    private initialRender;
    private treeData;
    private rootData;
    private groupedData;
    private ulElement;
    private listBaseOption;
    private dataType;
    private rippleFn;
    private rippleIconFn;
    private isNumberTypeId;
    private expandOnType;
    private keyboardModule;
    private liList;
    private aniObj;
    private treeList;
    private isLoaded;
    private expandArgs;
    private oldText;
    private dragObj;
    private dropObj;
    private dragTarget;
    private dragLi;
    private dragData;
    private startNode;
    private nodeTemplateFn;
    private currentLoadData;
    private checkActionNodes;
    private touchEditObj;
    private touchClickObj;
    private dragStartAction;
    private touchExpandObj;
    private inputObj;
    private isAnimate;
    private touchClass;
    private editData;
    private editFields;
    private refreshData;
    private isRefreshed;
    private keyConfigs;
    private isInitalExpand;
    private index;
    private preventExpand;
    private hasPid;
    private dragParent;
    private checkedElement;
    private ele;
    private disableNode;
    private onLoaded;
    private parentNodeCheck;
    private parentCheckData;
    private validArr;
    private validNodes;
    private expandChildren;
    private isFieldChange;
    private changeDataSource;
    private isOffline;
    private firstTap;
    private hasTemplate;
    private isFirstRender;
    private isNodeDropped;
    private isInteracted;
    private isRightClick;
    private mouseDownStatus;
    private isDropIn;
    private DDTTreeData;
    private OldCheckedData;
    private isHiddenItem;
    /**
     * Indicates whether the TreeView allows drag and drop of nodes. To drag and drop a node in
     * desktop, hold the mouse on the node, drag it to the target node and drop the node by releasing
     * the mouse. For touch devices, drag and drop operation is performed by touch, touch move
     * and touch end. For more information on drag and drop nodes concept, refer to
     * [Drag and Drop](../../treeview/drag-and-drop/).
     *
     * @default false
     */
    allowDragAndDrop: boolean;
    /**
     * Enables or disables editing of the text in the TreeView node. When `allowEditing` property is set
     * to true, the TreeView allows you to edit the node by double clicking the node or by navigating to
     * the node and pressing **F2** key. For more information on node editing, refer
     * to [Node Editing](../../treeview/node-editing/).
     *
     * @default false
     */
    allowEditing: boolean;
    /**
     * Enables or disables multi-selection of nodes. To select multiple nodes:
     * * Select the nodes by holding down the **Ctrl** key while clicking on the nodes.
     * * Select consecutive nodes by clicking the first node to select and hold down the **Shift** key
     * and click the last node to select.
     *
     * For more information on multi-selection, refer to
     * [Multi-Selection](../../treeview/multiple-selection/).
     *
     * @default false
     */
    allowMultiSelection: boolean;
    /**
     * Enables or disables text wrapping when text exceeds the bounds in the TreeView node.
     * When the allowTextWrap property is set to true, the TreeView node text content will wrap to the next line
     * when it exceeds the width of the TreeView node.
     * The TreeView node height will be adjusted automatically based on the TreeView node content.
     *
     * @default false
     */
    allowTextWrap: boolean;
    /**
     * Specifies the type of animation applied on expanding and collapsing the nodes along with duration.
     *
     * @default {expand: { effect: 'SlideDown', duration: 400, easing: 'linear' },
     * collapse: { effect: 'SlideUp', duration: 400, easing: 'linear' }}
     */
    animation: NodeAnimationSettingsModel;
    /**
     * The `checkedNodes` property is used to set the nodes that need to be checked.
     * This property returns the checked nodes ID in the TreeView component.
     * The `checkedNodes` property depends upon the value of `showCheckBox` property.
     * For more information on checkedNodes, refer to
     * [checkedNodes](../../treeview/check-box#checked-nodes).
     * ```html
     * <div id="tree"></div>
     * ```
     * ```typescript
     * let treeObj: TreeView = new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * showCheckBox: true,
     * checkedNodes: ['01-01','02']
     * });
     * treeObj.appendTo('#tree');
     * ```
     *
     * @default []
     */
    checkedNodes: string[];
    /**
     * Determines whether the disabled children will be checked or not if their parent is checked.
     *
     * @default true
     */
    checkDisabledChildren: boolean;
    /**
     * Specifies one or more than one CSS classes to be added with root element of the TreeView to help customize the appearance of the component.
     * ```html
     * <div id="tree"></div>
     * ```
     * ```typescript
     * let treeObj: TreeView = new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * cssClass: 'e-custom e-tree'
     * });
     * treeObj.appendTo('#tree');
     * ```
     * ```css
     * .e-custom .e-tree {
     * max-width: 600px;
     * }
     * .e-custom .e-list-item {
     * padding: 10px 0;
     * }
     * ```
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies a value that indicates whether the TreeView component is disabled or not.
     * When set to true, user interaction will not be occurred in TreeView.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Specifies the target in which the draggable element can be moved and dropped.
     * By default, the draggable element movement occurs in the page.
     * ```html
     * <div id="tree"></div>
     * ```
     * ```typescript
     * let treeObj: TreeView = new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * dragArea: '.control_wrapper'
     * });
     * treeObj.appendTo('#tree');
     * ```
     * ```css
     * .control_wrapper {
     * width: 500px;
     * margin-left: 100px;
     * }
     * ```
     *
     * @default null
     */
    dragArea: HTMLElement | string;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the TreeView component.
     * If 'enableHtmlSanitizer' set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     * ```html
     * <div id="tree"></div>
     * ```
     * ```typescript
     * let treeObj: TreeView = new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * enableHtmlSanitizer: true
     * });
     * treeObj.appendTo('#tree');
     * ```
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Enables or disables persisting TreeView state between page reloads. If enabled, following APIs will persist.
     * 1. `selectedNodes` - Represents the nodes that are selected in the TreeView component.
     * 2. `checkedNodes`  - Represents the nodes that are checked in the TreeView component.
     * 3. `expandedNodes` - Represents the nodes that are expanded in the TreeView component.
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * Represents the expanded nodes in the TreeView component. We can set the nodes that need to be
     * expanded or get the ID of the nodes that are currently expanded by using this property.
     * ```html
     * <div id='tree'></div>
     * ```
     * ```typescript
     * <script>
     * var treeObj =  new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * expandedNodes: ['01','01-01','02']
     * });
     * treeObj.appendTo('#tree');
     * </script>
     * ```
     *
     * @default []
     */
    expandedNodes: string[];
    /**
     * Specifies the action on which the node expands or collapses.
     * The available actions :
     * `Click` - The expand/collapse operation happens when you single-click on the node in desktop.
     * `DblClick` - The expand/collapse operation happens when you double-click on the node in desktop.
     * `None` - The expand/collapse operation will not happen.
     * In mobile devices, the node expand/collapse action happens on single tap.
     * Here ExpandOn attribute is set to single click property also can use double click and none property.
     * ```html
     * <div id="tree"></div>
     * ```
     * ```typescript
     * let treeObj: TreeView = new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * expandOn: 'Click'
     * });
     * treeObj.appendTo('#tree');
     * ```
     *
     * @default 'Auto'
     */
    expandOn: ExpandOnSettings;
    /**
     * Specifies the data source and mapping fields to render TreeView nodes.
     *
     * @default {id: 'id', text: 'text', dataSource: [], child: 'child', parentID: 'parentID', hasChildren: 'hasChildren',
     *  expanded: 'expanded', htmlAttributes: 'htmlAttributes', iconCss: 'iconCss', imageUrl: 'imageUrl', isChecked: 'isChecked',
     *  query: null, selected: 'selected', tableName: null, tooltip: 'tooltip', navigateUrl: 'navigateUrl'}
     */
    fields: FieldsSettingsModel;
    /**
     * On enabling this property, the entire row of the TreeView node gets selected by clicking a node.
     * When disabled only the corresponding node's text gets selected.
     * For more information on Fields concept, refer to
     * [Fields](../../treeview/data-binding#local-data).
     *
     * @default true
     */
    fullRowSelect: boolean;
    /**
     * By default, the load on demand (Lazy load) is set to true. By disabling this property, all the tree nodes are rendered at the
     * beginning itself.
     *
     * @default true
     */
    loadOnDemand: boolean;
    /**
     * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
     *
     * @private
     */
    locale: string;
    /**
     * Specifies a template to render customized content for all the nodes. If the `nodeTemplate` property
     * is set, the template content overrides the displayed node text. The property accepts template string
     * [template string](https://ej2.syncfusion.com/documentation/common/template-engine/)
     * or HTML element ID holding the content. For more information on template concept, refer to
     * [Template](../../treeview/template/).
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    nodeTemplate: string | Function;
    /**
     * Represents the selected nodes in the TreeView component. We can set the nodes that need to be
     * selected or get the ID of the nodes that are currently selected by using this property.
     * On enabling `allowMultiSelection` property we can select multiple nodes and on disabling
     * it we can select only a single node.
     * For more information on selectedNodes, refer to
     * [selectedNodes](../../treeview/multiple-selection#selected-nodes).
     * ```html
     * <div id="tree"></div>
     * ```
     * ```typescript
     * let treeObj: TreeView = new TreeView({
     * fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
     * allowMultiSelection: true,
     * selectedNodes: ['01','02']
     * });
     * treeObj.appendTo('#tree');
     * ```
     *
     * @default []
     */
    selectedNodes: string[];
    /**
     * Specifies a value that indicates whether the nodes are sorted in the ascending or descending order,
     * or are not sorted at all. The available types of sort order are,
     * * `None` - The nodes are not sorted.
     * * `Ascending` - The nodes are sorted in the ascending order.
     * * `Descending` - The nodes are sorted in the ascending order.
     *
     * @default 'None'
     */
    sortOrder: SortOrder;
    /**
     * Indicates that the nodes will display CheckBoxes in the TreeView.
     * The CheckBox will be displayed next to the expand/collapse icon of the node. For more information on CheckBoxes, refer to
     * [CheckBox](../../treeview/check-box/).
     *
     * @default false
     */
    showCheckBox: boolean;
    /**
     * Allow us to specify the parent and child nodes to get auto check while we check or uncheck a node.
     *
     * @default true
     */
    autoCheck: boolean;
    /**
     * If this property is set to true, then the entire TreeView node will be navigate-able instead of text element.
     *
     * @default false
     */
    fullRowNavigable: boolean;
    /**
     * Event callback that is raised while any TreeView action failed to fetch the desired results.
     *
     * @event actionFailure
     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Event callback that is raised when the TreeView component is created successfully.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Event callback that is raised when data source is populated in the TreeView.
     *
     * @event dataBound
     */
    dataBound: EmitType<DataBoundEventArgs>;
    /**
     * Event callback that is raised when data source is changed in the TreeView. The data source will be changed after performing some operation like
     * drag and drop, node editing, adding and removing node.
     *
     * @event dataSourceChanged
     */
    dataSourceChanged: EmitType<DataSourceChangedEventArgs>;
    /**
     * Event callback that is raised before the TreeView node is appended to the TreeView element. It helps to customize specific nodes.
     *
     * @event drawNode
     */
    drawNode: EmitType<DrawNodeEventArgs>;
    /**
     * Event callback that is raised when the TreeView control is destroyed successfully.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * Event callback that is raised when key press is successful. It helps to customize the operations at key press.
     *
     * @event keyPress
     */
    keyPress: EmitType<NodeKeyPressEventArgs>;
    /**
     * Event callback that is raised when the TreeView node is checked/unchecked successfully.
     *
     * @event nodeChecked
     */
    nodeChecked: EmitType<NodeCheckEventArgs>;
    /**
     * Event callback that is raised before the TreeView node is to be checked/unchecked.
     *
     * @event nodeChecking
     */
    nodeChecking: EmitType<NodeCheckEventArgs>;
    /**
     * Event callback that is raised when the TreeView node is clicked successfully.
     *
     * @event nodeClicked
     */
    nodeClicked: EmitType<NodeClickEventArgs>;
    /**
     * Event callback that is raised when the TreeView node collapses successfully.
     *
     * @event nodeCollapsed
     */
    nodeCollapsed: EmitType<NodeExpandEventArgs>;
    /**
     * Event callback that is raised before the TreeView node collapses.
     *
     * @event nodeCollapsing
     */
    nodeCollapsing: EmitType<NodeExpandEventArgs>;
    /**
     * Event callback that is raised when the TreeView node is dragged (moved) continuously.
     *
     * @deprecated
     * @event nodeDragging
     */
    nodeDragging: EmitType<DragAndDropEventArgs>;
    /**
     * Event callback that is raised when the TreeView node drag (move) starts.
     *
     * @event nodeDragStart
     */
    nodeDragStart: EmitType<DragAndDropEventArgs>;
    /**
     * Event callback that is raised when the TreeView node drag (move) is stopped.
     *
     * @event nodeDragStop
     */
    nodeDragStop: EmitType<DragAndDropEventArgs>;
    /**
     * Event callback that is raised when the TreeView node is dropped on target element successfully.
     *
     * @event nodeDropped
     */
    nodeDropped: EmitType<DragAndDropEventArgs>;
    /**
     * Event callback that is raised when the TreeView node is renamed successfully.
     *
     * @event nodeEdited
     */
    nodeEdited: EmitType<NodeEditEventArgs>;
    /**
     * Event callback that is raised before the TreeView node is renamed.
     *
     * @event nodeEditing
     */
    nodeEditing: EmitType<NodeEditEventArgs>;
    /**
     * Event callback that is raised when the TreeView node expands successfully.
     *
     * @event nodeExpanded
     */
    nodeExpanded: EmitType<NodeExpandEventArgs>;
    /**
     * Event callback that is raised before the TreeView node is to be expanded.
     *
     * @event nodeExpanding
     */
    nodeExpanding: EmitType<NodeExpandEventArgs>;
    /**
     * Event callback that is raised when the TreeView node is selected/unselected successfully.
     *
     * @event nodeSelected
     */
    nodeSelected: EmitType<NodeSelectEventArgs>;
    /**
     * Event callback that is raised before the TreeView node is selected/unselected.
     *
     * @event nodeSelecting
     */
    nodeSelecting: EmitType<NodeSelectEventArgs>;
    isFilter: boolean;
    constructor(options?: TreeViewModel, element?: string | HTMLElement);
    /**
     * Get component name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Initialize the event handler
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - returns the persisted data
     * @hidden
     */
    getPersistData(): string;
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    private initialize;
    private setDisabledMode;
    private setEnableRtl;
    private setRipple;
    private setFullRow;
    private setMultiSelect;
    private templateComplier;
    private setDataBinding;
    private getQuery;
    private getType;
    private setRootData;
    private isChildObject;
    private renderItems;
    /**
     * Update the checkedNodes from datasource at initial rendering
     *
     * @returns {void}
     */
    private updateCheckedStateFromDS;
    /**
     * To check whether the list data has sub child and to change the parent check state accordingly
     *
     * @param {FieldsSettingsModel} mapper - The mapper object containing field settings.
     * @param {Object[]} checkNodes - The array of checked nodes.
     * @returns {void}
     * @private
     */
    private getCheckedNodeDetails;
    /**
     * Update the checkedNodes and parent state when all the child Nodes are in checkedstate at initial rendering
     *
     * @returns {void}
     * @private
     */
    private updateParentCheckState;
    /**
     * Change the parent to indeterminate state whenever the child is in checked state which is not rendered in DOM
     *
     * @param {Object} data - The data object to check for indeterminate state.
     * @returns {void}
     * @private
     */
    private checkIndeterminateState;
    /**
     * Update the checkedNodes for child and subchild from datasource (hierarchical datasource) at initial rendering
     *
     * @param {Object[]} childItems - The array of child items to update the checked state.
     * @param {Object} treeData - The tree data object containing field values.
     * @returns {void}
     * @private
     */
    private updateChildCheckState;
    private beforeNodeCreate;
    private frameMouseHandler;
    private addActionClass;
    private getDataType;
    private getGroupedData;
    private getSortedData;
    private finalizeNode;
    private updateAttributes;
    private updateCheckedProp;
    private ensureIndeterminate;
    private ensureParentCheckState;
    private getSelectedChildNodeDetails;
    private ensureChildCheckState;
    private doCheckBoxAction;
    private updateFieldChecked;
    /**
     * Changes the parent and child  check state while changing the checkedNodes via setmodel
     *
     * @param {string} node - The unique identifier of the node.
     * @param {boolean} doCheck - A boolean value indicating whether to check or uncheck the node.
     * @returns {void}
     * @private
     */
    private dynamicCheckState;
    /**
     * updates the parent and child  check state while changing the checkedNodes via setmodel for listData
     *
     * @param {string} node - The unique identifier of the node.
     * @param {boolean} doCheck - A boolean value indicating whether to check or uncheck the node.
     * @returns {void}
     * @private
     */
    private updateIndeterminate;
    /**
     * updates the parent and child  check state while changing the checkedNodes via setmodel for hierarchical data
     *
     * @param {Object[]} subChild - Array of child nodes
     * @param {string} parent - Parent identifier
     * @param {string} node - Current node identifier
     * @param {boolean} doCheck - Boolean indicating whether to perform a check
     * @param {string} [child] - Optional child identifier
     * @returns {void}
     * @private
     */
    private updateChildIndeterminate;
    private changeState;
    private nodeCheckAction;
    private addCheck;
    private removeCheck;
    private getCheckEvent;
    private finalize;
    private setTextWrap;
    private updateWrap;
    private calculateWrap;
    private doExpandAction;
    private expandGivenNodes;
    private expandCallback;
    private afterFinalized;
    private doSelectionAction;
    private selectGivenNodes;
    private clickHandler;
    private nodeCheckedEvent;
    private updateOldCheckedData;
    private triggerClickEvent;
    private expandNode;
    private expandedNode;
    private addExpand;
    private collapseNode;
    private nodeCollapseAction;
    private collapsedNode;
    private removeExpand;
    private disableExpandAttr;
    private setHeight;
    private animateHeight;
    private renderChildNodes;
    private loadChild;
    private disableTreeNodes;
    /**
     * Sets the child Item in selectedState while rendering the child node
     *
     * @param {Object[]} nodes - Array of nodes
     * @returns {void}
     */
    private setSelectionForChildNodes;
    private ensureCheckNode;
    private getFields;
    private getChildFields;
    private getChildMapper;
    private getChildNodes;
    private findChildNodes;
    private findNestedChildNodes;
    private getChildGroup;
    private renderSubChild;
    private toggleSelect;
    private isActive;
    private selectNode;
    private nodeSelectAction;
    private unselectNode;
    private nodeUnselectAction;
    private setFocusElement;
    private addSelect;
    private removeSelect;
    private removeSelectAll;
    private getSelectEvent;
    private setExpandOnType;
    private expandHandler;
    private expandCollapseAction;
    private expandAction;
    private nodeExpandAction;
    private keyActionHandler;
    private navigateToFocus;
    private isVisibleInViewport;
    private getScrollParent;
    private shiftKeySelect;
    private checkNode;
    private validateCheckNode;
    private nodeCheckingAction;
    /**
     * Update checkedNodes when UI interaction happens before the child node renders in DOM
     *
     * @param {Element} li - The list item element
     * @param {boolean} [doCheck] - Optional parameter to specify whether to perform a check
     * @returns {void}
     */
    private ensureStateChange;
    private checkDisabledState;
    private getChildItems;
    /**
     * Update checkedNodes when UI interaction happens before the child node renders in DOM for hierarchical DS
     *
     * @param {Object[]} childItems - Array of child items
     * @param {string} parent - Parent identifier
     * @param {Element} childElement - Child DOM element
     * @param {boolean} [doCheck] - Optional parameter to specify whether to perform a check
     * @returns {void}
     */
    private childStateChange;
    private allCheckNode;
    private openNode;
    private navigateNode;
    private navigateRootNode;
    private getFocusedNode;
    private focusNextNode;
    private getNextNode;
    private getPrevNode;
    private getRootNode;
    private getEndNode;
    private setFocus;
    private updateIdAttr;
    private focusIn;
    private focusOut;
    private onMouseOver;
    private setHover;
    private onMouseLeave;
    private removeHover;
    private getNodeData;
    private getText;
    private getExpandEvent;
    private renderNodeTemplate;
    private destroyTemplate;
    private reRenderNodes;
    private setCssClass;
    private editingHandler;
    private createTextbox;
    private renderTextBox;
    private updateOldText;
    private inputFocusOut;
    private appendNewText;
    private updateText;
    private getElement;
    private getId;
    private getEditEvent;
    private getNodeObject;
    private getChildNodeObject;
    private setDragAndDrop;
    private initializeDrag;
    private dragCancelAction;
    private getOffsetX;
    private getOffsetY;
    private dragAction;
    private appendIndicator;
    private dropAction;
    private appendNode;
    private dropAsSiblingNode;
    private dropAsChildNode;
    private moveData;
    private expandParent;
    private updateElement;
    private updateAriaLevel;
    private updateChildAriaLevel;
    private renderVirtualEle;
    private removeVirtualEle;
    private destroyDrag;
    private getDragEvent;
    private addFullRow;
    private createFullRow;
    private addMultiSelect;
    private collapseByLevel;
    private collapseAllNodes;
    private expandByLevel;
    private expandAllNodes;
    private getVisibleNodes;
    private removeNode;
    private updateInstance;
    private updateList;
    private updateSelectedNodes;
    private updateExpandedNodes;
    private removeData;
    private removeChildNodes;
    private doGivenAction;
    private addGivenNodes;
    private updateMapper;
    private updateListProp;
    private getDataPos;
    private addChildData;
    private doDisableAction;
    private doEnableAction;
    private nodeType;
    private checkValidId;
    private filterNestedChild;
    private setTouchClass;
    private updatePersistProp;
    private removeField;
    private getMapperProp;
    private updateField;
    private updateChildField;
    private triggerEvent;
    private wireInputEvents;
    private wireEditingEvents;
    private wireClickEvent;
    private wireExpandOnEvent;
    private mouseDownHandler;
    private preventContextMenu;
    private wireEvents;
    private unWireEvents;
    private parents;
    private isDoubleTapped;
    private isDescendant;
    protected showSpinner(element: HTMLElement): void;
    protected hideSpinner(element: HTMLElement): void;
    private setCheckedNodes;
    /**
     * Checks whether the checkedNodes entered are valid and sets the valid checkedNodes while changing via setmodel
     *
     * @param {string} node - The unique identifier of the node.
     * @param {string[]} [nodes=[]] - The list of node IDs to check.
     * @returns {void}
     * @private
     */
    private setValidCheckedNode;
    /**
     * Checks whether the checkedNodes entered are valid and sets the valid checkedNodes while changing via setmodel(for hierarchical DS)
     *
     * @param {Object[]} childItems - The child items to check.
     * @param {string} node - The node to set the check state for.
     * @param {Object} [treeData] - The optional tree data.
     * @param {string[]} [nodes=[]] - The list of node IDs to check.
     * @returns {void}
     * @private
     */
    private setChildCheckState;
    private setIndeterminate;
    private updatePosition;
    private updateChildPosition;
    private dynamicState;
    private crudOperation;
    private deleteSuccess;
    private editSucess;
    private addSuccess;
    private dmFailure;
    private updatePreviousText;
    private getHierarchicalParentId;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeViewModel} newProp - The new property value.
     * @param {TreeViewModel} oldProp - The old property value.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: TreeViewModel, oldProp: TreeViewModel): void;
    /**
     * Removes the component from the DOM and detaches all its related event handlers. It also removes the attributes and classes.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Adds the collection of TreeView nodes based on target and index position. If target node is not specified,
     * then the nodes are added as children of the given parentID or in the root level of TreeView.
     *
     * @param  { object } nodes - Specifies the array of JSON data that has to be added.
     * @param  { string | Element } target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  { number } index - Specifies the index to place the newly added nodes in the target element.
     * @param { boolean } preventTargetExpand - If set to true, the target parent node will be prevented from auto expanding.
     * @returns {void}
     */
    addNodes(nodes: {
        [key: string]: Object;
    }[], target?: string | Element, index?: number, preventTargetExpand?: boolean): void;
    /**
     * Editing can also be enabled by using the `beginEdit` property, instead of clicking on the
     * TreeView node. On passing the node ID or element through this property, the edit textBox
     * will be created for the particular node thus allowing us to edit it.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @returns {void}
     */
    beginEdit(node: string | Element): void;
    /**
     * Checks all the unchecked nodes. You can also check specific nodes by passing array of unchecked nodes
     * as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    checkAll(nodes?: string[] | Element[]): void;
    /**
     * Collapses all the expanded TreeView nodes. You can collapse specific nodes by passing array of nodes as argument to this method.
     * You can also collapse all the nodes excluding the hidden nodes by setting **excludeHiddenNodes** to true. If you want to collapse
     * a specific level of nodes, set **level** as argument to collapseAll method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/ array of TreeView node.
     * @param  {number} level - TreeView nodes will collapse up to the given level.
     * @param  {boolean} excludeHiddenNodes - Whether or not to exclude hidden nodes of TreeView when collapsing all nodes.
     * @returns {void}
     */
    collapseAll(nodes?: string[] | Element[], level?: number, excludeHiddenNodes?: boolean): void;
    /**
     * Disables the collection of nodes by passing the ID of nodes or node elements in the array.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @returns {void}
     */
    disableNodes(nodes: string[] | Element[]): void;
    /**
     * Enables the collection of disabled nodes by passing the ID of nodes or node elements in the array.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @returns {void}
     */
    enableNodes(nodes: string[] | Element[]): void;
    /**
     * Ensures visibility of the TreeView node by using node ID or node element.
     * When many TreeView nodes are present and we need to find a particular node, `ensureVisible` property
     * helps bring the node to visibility by expanding the TreeView and scrolling to the specific node.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView nodes.
     * @returns {void}
     */
    ensureVisible(node: string | Element): void;
    /**
     * Expands all the collapsed TreeView nodes. You can expand the specific nodes by passing the array of collapsed nodes
     * as argument to this method. You can also expand all the collapsed nodes by excluding the hidden nodes by setting
     * **excludeHiddenNodes** to true to this method. To expand a specific level of nodes, set **level** as argument to expandAll method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @param  {number} level - TreeView nodes will expand up to the given level.
     * @param  {boolean} excludeHiddenNodes - Whether or not to exclude hidden nodes when expanding all nodes.
     * @param  {boolean} preventAnimation - Prevent the expand animation when expanding all nodes.
     * @returns {void}
     */
    expandAll(nodes?: string[] | Element[], level?: number, excludeHiddenNodes?: boolean, preventAnimation?: boolean): void;
    /**
     * Gets all the checked nodes including child, whether it is loaded or not.
     *
     * @returns {string[]} - An array of strings representing the unique identifiers of checked nodes.
     */
    getAllCheckedNodes(): string[];
    /**
     * Gets all the disabled nodes including child, whether it is loaded or not.
     *
     * @returns {string[]} An array of strings representing the unique identifiers of disabled nodes.
     */
    getDisabledNodes(): string[];
    /**
     * Gets the node's data such as id, text, parentID, selected, isChecked, and expanded by passing the node element or it's ID.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @returns {Object} - The data associated with the specified node.
     */
    getNode(node: string | Element): {
        [key: string]: Object;
    };
    /**
     * To get the updated data source of TreeView after performing some operation like drag and drop, node editing,
     * node selecting/unSelecting, node expanding/collapsing, node checking/unChecking, adding and removing node.
     * * If you pass the ID of TreeView node as arguments for this method then it will return the updated data source
     * of the corresponding node otherwise it will return the entire updated data source of TreeView.
     * * The updated data source also contains custom attributes if you specified in data source.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @isGenericType true
     * @returns {Object} - The tree data associated with the specified node or element.
     */
    getTreeData(node?: string | Element): {
        [key: string]: Object;
    }[];
    /**
     * Moves the collection of nodes within the same TreeView based on target or its index position.
     *
     * @param  {string[] | Element[]} sourceNodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @param  {string | Element} target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  {number} index - Specifies the index to place the moved nodes in the target element.
     * @param { boolean } preventTargetExpand - If set to true, the target parent node will be prevented from auto expanding.
     * @returns {void}
     */
    moveNodes(sourceNodes: string[] | Element[], target: string | Element, index: number, preventTargetExpand?: boolean): void;
    /**
     * Refreshes a particular node of the TreeView.
     *
     * @param  {string | Element} target - Specifies the ID of TreeView node or TreeView node as target element.
     * @param  {Object[]} newData - Specifies the new data of TreeView node.
     * @returns {void}
     * ```typescript
     * var treeObj = document.getElementById("treeview").ej2_instances[0];
     * var data = treeObj.getTreeData("01");
     * var newData = {
     *   id: data[0].id,
     *   name: "new Text",
     * };
     * treeObj.refreshNode("01", [newData]);
     * ```
     */
    refreshNode(target: string | Element, newData: {
        [key: string]: Object;
    }[]): void;
    /**
     * Removes the collection of TreeView nodes by passing the array of node details as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    removeNodes(nodes: string[] | Element[]): void;
    /**
     * Replaces the text of the TreeView node with the given text only when the `allowEditing` property is enabled.
     *
     * @param  {string | Element} target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  {string} newText - Specifies the new text of TreeView node.
     * @returns {void}
     */
    updateNode(target: string | Element, newText: string): void;
    /**
     * Unchecks all the checked nodes. You can also uncheck the specific nodes by passing array of checked nodes
     * as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    uncheckAll(nodes?: string[] | Element[]): void;
    private setNodeFocusable;
}
