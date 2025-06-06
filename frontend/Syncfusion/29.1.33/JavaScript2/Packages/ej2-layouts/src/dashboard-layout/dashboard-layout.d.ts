import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { Draggable, DragEventArgs } from '@syncfusion/ej2-base';
import { EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { DashboardLayoutModel, PanelModel } from './dashboard-layout-model';
/**
 * Defines the panel of the DashboardLayout component.
 */
export declare class Panel extends ChildProperty<Panel> {
    /**
     * Defines the id of the panel.
     *
     * @default ''
     */
    id: string;
    /**
     * Defines the CSS class name that can be appended with each panel element.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines the template value that should be displayed as the panel's header.
     *
     * @aspType string
     */
    header: string | HTMLElement | Function;
    /**
     * Defines the template value that should be displayed as the panel's content.
     *
     * @aspType string
     */
    content: string | HTMLElement | Function;
    /**
     * Defines whether to the panel should be enabled or not.
     *
     * @default true
     */
    enabled: boolean;
    /**
     * Defines a row value where the panel should be placed.
     *
     * @default 0
     * @aspType int
     */
    row: number;
    /**
     * Defines the column value where the panel to be placed.
     *
     * @default 0
     * @aspType int
     */
    col: number;
    /**
     * Specifies the width of the panel in the layout in cells count.
     *
     * @default 1
     */
    sizeX: number;
    /**
     * Specifies the height of the panel in the layout in cells count.
     *
     * @default 1
     */
    sizeY: number;
    /**
     * Specifies the minimum height of the panel in cells count.
     *
     * @default 1
     */
    minSizeY: number;
    /**
     * Specifies the minimum width of the panel in cells count.
     *
     * @default 1
     */
    minSizeX: number;
    /**
     * Specifies the maximum height of the panel in cells count.
     *
     * @default null
     * @aspType int
     *
     */
    maxSizeY: number;
    /**
     * Specifies the maximum width of the panel in cells count.
     *
     * @default null
     * @aspType int
     */
    maxSizeX: number;
    /**
     * Specifies the z-index of the panel
     *
     * @default 1000
     * @aspType double
     */
    zIndex: number;
}
/**
 * The DashboardLayout is a grid structured layout control, that helps to create a dashboard with panels.
 * Panels hold the UI components or data to be visualized with flexible options like resize, reorder, drag-n-drop, remove and add,
 * that allows users to easily place the panels at a desired position within the grid layout.
 * ```html
 * <div id="default-layout">
 * ```
 * ```typescript
 * <script>
 *   let dashBoardObject : DashboardLayout = new DashboardLayout();
 *   dashBoardObject.appendTo('#default-layout');
 * </script>
 * ```
 */
export declare class DashboardLayout extends Component<HTMLElement> implements INotifyPropertyChanged {
    protected panelCollection: HTMLElement[];
    protected checkCollision: HTMLElement[];
    protected mainElement: HTMLElement;
    protected rows: number;
    protected dragobj: Draggable;
    protected dragStartArgs: DragStartArgs;
    protected dragStopEventArgs: DragStopArgs;
    protected draggedEventArgs: DraggedEventArgs;
    protected updatedRows: number;
    protected tempObject: DashboardLayout;
    protected sortedArray: HTMLElement[][];
    protected cloneArray: HTMLElement[][];
    protected panelID: number;
    protected movePanelCalled: boolean;
    protected resizeCalled: boolean;
    protected gridPanelCollection: PanelModel[];
    protected overlapElement: HTMLElement[];
    protected shouldRestrict: boolean;
    protected shouldSubRestrict: boolean;
    protected overlapElementClone: HTMLElement[];
    protected overlapSubElementClone: HTMLElement[];
    protected dragCollection: Draggable[];
    protected iterationValue: number;
    protected shadowEle: HTMLElement;
    protected elementRef: {
        top: string;
        left: string;
        height: string;
        width: string;
    };
    protected allItems: HTMLElement[];
    protected dimensions: (string | number)[];
    protected oldRowCol: {
        [key: string]: {
            row: number;
            col: number;
        };
    };
    protected collisionChecker: {
        [key: string]: {
            ele: HTMLElement;
            row: number;
            srcEle: HTMLElement;
        };
    };
    protected availableClasses: string[];
    protected addPanelCalled: boolean;
    protected isSubValue: boolean;
    protected direction: number;
    protected directionRow: number;
    protected lastMouseX: number;
    protected lastMouseY: number;
    protected elementX: number;
    protected elementY: number;
    protected elementWidth: number;
    protected elementHeight: number;
    protected previousRow: number;
    protected originalWidth: number;
    protected originalHeight: number;
    protected handleClass: string;
    protected mOffX: number;
    protected mOffY: number;
    protected maxTop: number;
    protected maxRows: number;
    protected maxLeft: number;
    protected mouseX: number;
    protected mouseY: number;
    protected minTop: number;
    protected minLeft: number;
    protected moveTarget: HTMLElement;
    protected upTarget: HTMLElement;
    protected downTarget: HTMLElement;
    protected leftAdjustable: boolean;
    protected rightAdjustable: boolean;
    protected topAdjustable: boolean;
    protected restrictDynamicUpdate: boolean;
    protected spacedColumnValue: number;
    protected checkingElement: HTMLElement;
    protected panelContent: HTMLElement;
    protected panelHeaderElement: HTMLElement;
    protected panelBody: HTMLElement;
    protected startRow: number;
    protected startCol: number;
    protected maxColumnValue: number;
    protected checkColumnValue: number;
    protected spacedRowValue: number;
    protected cellSize: number[];
    protected table: HTMLElement;
    protected cloneObject: {
        [key: string]: {
            row: number;
            col: number;
        };
    };
    private panelsInitialModel;
    protected isRenderComplete: boolean;
    protected isMouseUpBound: boolean;
    protected isMouseMoveBound: boolean;
    protected contentTemplateChild: HTMLElement[];
    private isInlineRendering;
    private removeAllCalled;
    private isPanelRemoved;
    private panelsSizeY;
    private resizeHeight;
    private refreshListener;
    private eventVar;
    /**
     * If allowDragging is set to true, then the DashboardLayout allows you to drag and reorder the panels.
     *
     * @default true
     */
    allowDragging: boolean;
    /**
     * If allowResizing is set to true, then the DashboardLayout allows you to resize the panels.
     *
     * @default false
     */
    allowResizing: boolean;
    /**
     * If pushing is set to true, then the DashboardLayout allow to push the panels when panels collide
     * while dragging or resizing the panels.
     *
     * @default true
     * @private
     */
    private allowPushing;
    /**
     * Defines whether to allow the cross-scripting site or not.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * If allowFloating is set to true, then the DashboardLayout automatically move the panels upwards to fill the empty available
     * cells while dragging or resizing the panels.
     *
     * @default true
     */
    allowFloating: boolean;
    /**
     * Defines the cell aspect ratio of the panel.
     *
     * @default 1
     */
    cellAspectRatio: number;
    /**
     * Defines the spacing between the panels.
     *
     * @default [5,5]
     */
    cellSpacing: number[];
    /**
     * Defines the number of columns to be created in the DashboardLayout.
     *
     * @default 1
     */
    columns: number;
    /**
     * Enables or disables the grid lines for the Dashboard Layout panels.
     *
     * @default false
     */
    showGridLines: boolean;
    /**
     * Defines the draggable handle selector which will act as dragging handler for the panels.
     *
     * @default null
     */
    draggableHandle: string;
    /**
     * Locale property.
     * This is not a dashboard layout property.
     *
     * @default 'en-US'
     * @private
     */
    locale: string;
    /**
     * Defines the media query value where the dashboardlayout becomes stacked layout when the resolution meets.
     *
     * @default 'max-width:600px'
     */
    mediaQuery: string;
    /**
     *
     * Defines the panels property of the DashboardLayout component.
     *
     * @default null
     */
    panels: PanelModel[];
    /**
     * Defines the resizing handles directions used for resizing the panels.
     *
     * @default 'e-south-east'
     *
     */
    resizableHandles: string[];
    /**
     * Triggers whenever the panels positions are changed.
     *
     * @event 'object'
     */
    change: EmitType<ChangeEventArgs>;
    /**
     * Triggers when a panel is about to drag.
     *
     * @event 'object'
     */
    dragStart: EmitType<DragStartArgs>;
    /**
     * Triggers while a panel is dragged continuously.
     *
     * @event 'object'
     */
    drag: EmitType<DraggedEventArgs>;
    /**
     * Triggers when a dragged panel is dropped.
     *
     * @event 'object'
     */
    dragStop: EmitType<DragStopArgs>;
    /**
     * Triggers when a panel is about to resize.
     *
     * @event 'object'
     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers when a panel is being resized continuously.
     *
     * @event 'object'
     */
    resize: EmitType<ResizeArgs>;
    /**
     * Triggers when a panel resize ends.
     *
     * @event 'object'
     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Triggers when Dashboard Layout is created.
     *
     * @event 'object'
     */
    created: EmitType<Object>;
    /**
     * Triggers when Dashboard Layout is destroyed.
     *
     * @event 'object'
     */
    destroyed: EmitType<Object>;
    /**
     * Initialize the event handler
     *
     * @private
     */
    protected preRender(): void;
    protected setOldRowCol(): void;
    protected createPanelElement(cssClass: string[], idValue: string): HTMLElement;
    /**
     * To Initialize the control rendering.
     *
     * @returns void
     * @private
     */
    protected render(): void;
    private initGridLines;
    private initialize;
    protected checkMediaQuery(): boolean;
    protected calculateCellSize(): void;
    protected maxRow(recheck?: boolean): number;
    protected maxCol(): number;
    protected updateOldRowColumn(): void;
    protected createSubElement(cssClass: string[], idValue: string, className: string): HTMLElement;
    private templateParser;
    protected renderTemplate(content: string, appendElement: HTMLElement, type: string, isStringTemplate: boolean, prop: string): void;
    protected renderPanels(cellElement: HTMLElement, panelModel: PanelModel, panelId: string, isStringTemplate: boolean): HTMLElement;
    protected disablePanel(panelElement: HTMLElement): void;
    protected getInlinePanels(panelElement: HTMLElement): void;
    private resizeEvents;
    protected bindEvents(): void;
    protected downResizeHandler(e: MouseEvent): void;
    protected downHandler(e: MouseEvent | TouchEvent): void;
    protected touchDownResizeHandler(e: TouchEvent): void;
    private getCellSize;
    protected updateMaxTopLeft(e: MouseEvent | TouchEvent): void;
    protected updateResizeElement(el: HTMLElement): void;
    protected moveResizeHandler(e: MouseEvent): void;
    protected touchMoveResizeHandler(e: TouchEvent): void;
    protected resizingPanel(el: HTMLElement, panelModel: PanelModel, currentX: number, currentY: number): void;
    protected upResizeHandler(e: MouseEvent | TouchEvent): void;
    protected getResizeRowColumn(item: PanelModel): PanelModel;
    protected pixelsToColumns(pixels: number, isCeil: boolean): number;
    protected pixelsToRows(pixels: number, isCeil: boolean): number;
    protected getMinWidth(item: PanelModel): number;
    protected getMaxWidth(item: PanelModel): number;
    protected getMinHeight(item: PanelModel): number;
    protected getMaxHeight(item: PanelModel): number;
    protected sortedPanel(): void;
    protected moveItemsUpwards(): void;
    protected moveItemUpwards(item: HTMLElement): void;
    private sortItem;
    protected updateLayout(element: HTMLElement, panelModel: PanelModel): void;
    refresh(): void;
    protected updateGridLines(): void;
    protected checkDragging(dragCollection: Draggable[]): void;
    protected sortPanels(): PanelModel[];
    protected checkMediaQuerySizing(): void;
    protected panelResponsiveUpdate(): void;
    protected updateRowHeight(): void;
    protected setHeightWidth(): void;
    private setEmptyLayoutHeight;
    protected setHeightAndWidth(panelElement: HTMLElement, panelModel: PanelModel): void;
    protected renderCell(panel: PanelModel, isStringTemplate: boolean, index: number): HTMLElement;
    protected setPanelPosition(cellElement: HTMLElement, row: number, col: number): void;
    protected getRowColumn(): void;
    protected setMinMaxValues(panel: PanelModel): void;
    protected checkMinMaxValues(panel: PanelModel): void;
    protected panelPropertyChange(panel: PanelModel, value: IChangePanel): void;
    protected renderDashBoardCells(cells: PanelModel[]): void;
    protected collisions(row: number, col: number, sizeX: number, sizeY: number, ignore: HTMLElement[] | HTMLElement): HTMLElement[];
    protected rightWardsSpaceChecking(rowElements: HTMLElement[], col: number, ele: HTMLElement): number[];
    protected getOccupiedColumns(element: HTMLElement): number[];
    protected leftWardsSpaceChecking(rowElements: HTMLElement[], col: number, ele: HTMLElement): number[];
    protected adjustmentAvailable(row: number, col: number, sizeY: number, sizeX: number, ele: HTMLElement): boolean;
    protected isXSpacingAvailable(spacing: number[], sizeX?: number): boolean;
    protected getRowElements(base: HTMLElement[]): HTMLElement[];
    protected isLeftAdjustable(spaces: number[], ele: HTMLElement, row: number, col: number, sizeX: number, sizeY: number): boolean;
    protected isRightAdjustable(spacing: number[], ele: HTMLElement, row: number, col: number, sizeX: number, sizeY: number): boolean;
    protected replacable(spacing: number[], sizeX: number, row: number, sizeY: number, ele: HTMLElement): boolean;
    protected sortCollisionItems(collisionItems: HTMLElement[]): HTMLElement[];
    protected updatedModels(collisionItems: HTMLElement[], panelModel: PanelModel, ele: HTMLElement): HTMLElement[];
    protected resetLayout(model: PanelModel): HTMLElement[];
    protected swapAvailability(collisions: HTMLElement[], element: HTMLElement): boolean;
    protected checkForSwapping(collisions: HTMLElement[], element: HTMLElement): boolean;
    protected swapItems(collisions: HTMLElement[], element: HTMLElement, panelModel: PanelModel): void;
    protected updatePanelLayout(element: HTMLElement, panelModel: PanelModel): void;
    protected checkForCompletePushing(): void;
    protected updateCollisionChecked(item: HTMLElement): void;
    protected updateRowColumn(row: number, ele: HTMLElement[], srcEle: HTMLElement): void;
    protected collisionPanel(collisionModels: HTMLElement[], colValue: number, updatedRow: number, clone: HTMLElement): void;
    protected removeResizeClasses(panelElements: HTMLElement[]): void;
    protected ensureDrag(): void;
    protected setClasses(panelCollection: HTMLElement[]): void;
    protected setResizingClass(ele?: HTMLElement, container?: HTMLElement): void;
    protected setXYAttributes(element: HTMLElement, panelModel: PanelModel): void;
    protected setXYDimensions(panelModel: PanelModel): (string | number)[];
    protected getRowColumnDragValues(args: DragEventArgs): number[];
    protected checkForChanges(isInteracted: boolean, added?: PanelModel[], removed?: PanelModel[]): void;
    protected enableDraggingContent(collections: HTMLElement[]): void;
    protected updatePanels(): void;
    protected updateDragArea(): void;
    /**
     * Method to update the draggable handle when draggable panel elements are bound dynamically.
     *
     * @returns void
     *
     */
    refreshDraggableHandle(): void;
    protected updateRowsHeight(row: number, sizeY: number, addRows: number): void;
    private onDraggingStart;
    private cloneModels;
    private onDragStart;
    protected getPanelBase(args: HTMLElement | DragEventArgs | string): HTMLElement;
    protected getPanel(row: number, column: number, excludeItems: HTMLElement[] | HTMLElement): PanelModel;
    protected setHolderPosition(args: DragEventArgs): void;
    protected calculateShadowElementSize(sizeX: number, sizeY: number): {
        width: string;
        height: string;
    };
    protected getCellInstance(idValue: string): PanelModel;
    /**
     * Allows to add a panel to the Dashboardlayout.
     *
     * @param {panel} panel -  Defines the panel element.
     *
     * @returns void
     * @deprecated
     */
    addPanel(panel: PanelModel): void;
    /**
     * Allows to update a panel in the DashboardLayout.
     *
     * @param {panel} panel - Defines the panel element.
     *
     * @returns void
     * @deprecated
     */
    updatePanel(panel: PanelModel): void;
    protected updateCloneArrayObject(): void;
    /**
     * Returns the panels object of the DashboardLayout.
     *
     * @returns [`PanelModel[]`](./panelModel)
     */
    serialize(): PanelModel[];
    /**
     * Removes all the panels from the DashboardLayout.
     */
    removeAll(): void;
    /**
     * Removes the panel from the DashboardLayout.
     *
     * @param {string} id -  Defines the panel ID.
     *
     * @returns void
     */
    removePanel(id: string): void;
    constructor(options?: DashboardLayoutModel, element?: string | HTMLElement);
    /**
     *Moves the panel in the DashboardLayout.
     *
     * @param {string} id - Defines the panel ID.
     *
     * @param  {number} row - Defines the row of dashboard layout.
     *
     * @param {number} col - Defines the column of dashboard layout.
     *
     * @returns void
     */
    movePanel(id: string, row: number, col: number): void;
    protected setAttributes(value: IAttributes, ele: HTMLElement): void;
    /**
     * Resize the panel in the DashboardLayout.
     *
     * @param {string} id - Defines the panel ID.
     *
     * @param {number} sizeX - Defines the sizeX of dashboard layout.
     *
     * @param {number} sizeY - Defines the sizeY of dashboard layout.
     */
    resizePanel(id: string, sizeX: number, sizeY: number): void;
    /**
     * Destroys the DashboardLayout component
     *
     * @returns void
     */
    destroy(): void;
    private removeAllPanel;
    protected setEnableRtl(): void;
    /**
     * Called internally if any of the property value changed.
     * returns void
     *
     * @private
     */
    private updateCellSizeAndSpacing;
    private updatePanelsDynamically;
    private checkForIDValues;
    /**
     * Called internally if any of the property value changed.
     *
     * returns void
     *
     * @private
     */
    onPropertyChanged(newProp: DashboardLayoutModel): void;
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns string
     * @private
     */
    getPersistData(): string;
    private mergePersistPanelData;
    protected mergePanels(sortedPanels: Panel[], panels: Panel[]): void;
    /**
     * Returns the current module name.
     *
     * @returns string
     *
     * @private
     */
    protected getModuleName(): string;
}
/**
 * Defines the dragstart event arguments
 */
export interface DragStartArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel: boolean;
    /**
     * Specifies the cell element being dragged.
     */
    element: HTMLElement;
}
/**
 * Defines the change event arguments
 */
export interface ChangeEventArgs {
    /**
     * Specifies the model values of the position changed panels.
     */
    changedPanels: PanelModel[];
    /**
     * Specifies that event has triggered by user interaction.
     */
    isInteracted: boolean;
    /**
     * Specifies the panel added to the DashboardLayout.
     */
    addedPanels: PanelModel[];
    /**
     * Specifies the panels removed from the DashboardLayout.
     */
    removedPanels: PanelModel[];
}
/**
 * Defines the Drag event arguments
 */
export interface DraggedEventArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Specifies the cell element being dragged.
     */
    element: HTMLElement;
    /**
     * Specifies the element below the cell element being dragged.
     */
    target: HTMLElement;
}
/**
 * Defines the dragstop event arguments
 */
export interface DragStopArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Specifies the cell element being dragged.
     */
    element: HTMLElement;
}
/**
 * Defines the resize event arguments
 */
export interface ResizeArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Specifies the cell element being resized.
     */
    element: HTMLElement;
    /**
     * Specifies that event has triggered by user interaction.
     */
    isInteracted: boolean;
}
interface IAttributes {
    [key: string]: {
        sizeX?: string | number;
        sizeY?: string | number;
        minSizeX?: string | number;
        minSizeY?: string | number;
        maxSizeX?: string | number;
        maxSizeY?: string | number;
        row?: string | number;
        col?: string | number;
    };
}
interface IChangePanel {
    sizeX?: number;
    sizeY?: number;
    minSizeX?: number;
    minSizeY?: number;
    maxSizeX?: number;
    maxSizeY?: number;
    row?: number;
    col?: number;
    id?: string;
    header?: string | HTMLElement | Function;
    content?: string | HTMLElement | Function;
}
export {};
