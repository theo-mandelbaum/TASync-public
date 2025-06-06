import { IGrid, IAction, IIndex, ISelectedCell } from '../base/interface';
import { SelectionSettings } from '../base/grid';
import { ServiceLocator } from '../services/service-locator';
/**
 * The `Selection` module is used to handle cell and row selection.
 */
export declare class Selection implements IAction {
    /**
     * @hidden
     */
    selectedRowIndexes: number[];
    /**
     * @hidden
     */
    selectedRowCellIndexes: ISelectedCell[];
    /**
     * @hidden
     */
    selectedRecords: Element[];
    /**
     * @hidden
     */
    isRowSelected: boolean;
    /**
     * @hidden
     */
    isCellSelected: boolean;
    /**
     * @hidden
     */
    preventFocus: boolean;
    /**
     * @hidden
     */
    prevRowIndex: number;
    /**
     *  @hidden
     */
    selectedColumnsIndexes: number[];
    isColumnSelected: boolean;
    gridCurrentRecord: Object[];
    private prevColIndex;
    checkBoxState: boolean;
    private selectionSettings;
    private prevCIdxs;
    private prevECIdxs;
    private isMultiShiftRequest;
    private isMultiCtrlRequest;
    private isMultiCtrlRequestCell;
    private enableSelectMultiTouch;
    private clearRowCheck;
    private selectRowCheck;
    private element;
    private autofill;
    private isAutoFillSel;
    private startCell;
    private endCell;
    private startAFCell;
    private endAFCell;
    private startIndex;
    private startCellIndex;
    private startDIndex;
    private startDCellIndex;
    private currentIndex;
    private isDragged;
    private isCellDrag;
    private x;
    private y;
    private target;
    private actualTarget;
    private factory;
    private contentRenderer;
    private checkedTarget;
    private primaryKey;
    private chkField;
    /**
     * @hidden
     */
    selectedRowState: {
        [key: number]: boolean;
    };
    private unSelectedRowState;
    private totalRecordsCount;
    private chkAllCollec;
    private isCheckedOnAdd;
    private persistSelectedData;
    private virtualSelectedData;
    private deSelectedData;
    private onDataBoundFunction;
    private actionBeginFunction;
    private actionCompleteFunction;
    private actionCompleteFunc;
    private resizeEndFn;
    private mUPTarget;
    private bdrElement;
    private selectDirection;
    private mcBdrElement;
    private frcBdrElement;
    private fhBdrElement;
    private mhBdrElement;
    private frhBdrElement;
    private bdrAFLeft;
    private bdrAFRight;
    private bdrAFTop;
    private bdrAFBottom;
    /** @hidden */
    isInteracted: boolean;
    private isHeaderCheckboxClicked;
    private checkSelectAllClicked;
    private isHdrSelectAllClicked;
    private isRowClicked;
    private needColumnSelection;
    /**
     * @hidden
     */
    index: number;
    private toggle;
    private data;
    private removed;
    private parent;
    private focus;
    private isCancelDeSelect;
    private isPreventCellSelect;
    private disableUI;
    private isPersisted;
    private cmdKeyPressed;
    private isMacOS;
    private cellselected;
    private isMultiSelection;
    private isAddRowsToSelection;
    private initialRowSelection;
    private isPrevRowSelection;
    private isKeyAction;
    private isRowDragSelected;
    private evtHandlers;
    isPartialSelection: boolean;
    private rmtHdrChkbxClicked;
    private isCheckboxReset;
    private isRowDeselect;
    /**
     * @hidden
     */
    autoFillRLselection: boolean;
    private mouseButton;
    private timer1;
    private timer2;
    private isFocusLastCell;
    /**
     * Constructor for the Grid selection module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {SelectionSettings} selectionSettings - specifies the selectionsettings
     * @param {ServiceLocator} locator - specifies the ServiceLocator
     * @hidden
     */
    constructor(parent?: IGrid, selectionSettings?: SelectionSettings, locator?: ServiceLocator);
    private initializeSelection;
    /**
     * The function used to trigger onActionBegin
     *
     * @param {Object} args - specifies the args
     * @param {string} type - specifies the type
     * @returns {void}
     * @hidden
     */
    onActionBegin(args: Object, type: string): void;
    private fDataUpdate;
    /**
     * The function used to trigger onActionComplete
     *
     * @param {Object} args - specifies the args
     * @param {string} type - specifies the type
     * @returns {void}
     * @hidden
     */
    onActionComplete(args: Object, type: string): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    protected getModuleName(): string;
    /**
     * To destroy the selection
     *
     * @returns {void}
     * @hidden
     */
    destroy(): void;
    private isEditing;
    getCurrentBatchRecordChanges(): Object[];
    /**
     * Selects a row by the given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    private rowSelectingCallBack;
    private selectRowCallBack;
    /**
     * Selects a range of rows from start and end row indexes.
     *
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     * @returns {void}
     */
    selectRowsByRange(startIndex: number, endIndex?: number): void;
    private selectedDataUpdate;
    /**
     * Selects a collection of rows by index.
     *
     * @param  {number[]} rowIndexes - Specifies an array of row indexes.
     * @returns {void}
     */
    selectRows(rowIndexes: number[]): void;
    /**
     * Select rows with existing row selection by passing row indexes.
     *
     * @param {number} rowIndexes - Specifies the row indexes.
     * @returns {void}
     * @hidden
     */
    addRowsToSelection(rowIndexes: number[]): void;
    private getCollectionFromIndexes;
    private clearRow;
    private clearRowCallBack;
    private clearSelectedRow;
    private updateRowProps;
    private getPkValue;
    private updatePersistCollection;
    private updatePersistDelete;
    private updateCheckBoxes;
    private updateRowSelection;
    /**
     * Deselects the currently selected rows and cells.
     *
     * @returns {void}
     */
    clearSelection(): void;
    /**
     * Deselects the currently selected rows.
     *
     * @returns {void}
     */
    clearRowSelection(): void;
    private rowDeselect;
    private getRowObj;
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    private successCallBack;
    private getCellIndex;
    /**
     * Selects a range of cells from start and end indexes.
     *
     * @param  {IIndex} startIndex - Specifies the row and column's start index.
     * @param  {IIndex} endIndex - Specifies the row and column's end index.
     * @returns {void}
     */
    selectCellsByRange(startIndex: IIndex, endIndex?: IIndex): void;
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @returns {void}
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Select cells with existing cell selection by passing row and column index.
     *
     * @param {IIndex} cellIndexes - Defines the collection of row and column index.
     * @returns {void}
     * @hidden
     */
    addCellsToSelection(cellIndexes: IIndex[]): void;
    private getColIndex;
    private getLastColIndex;
    private clearCell;
    private cellDeselect;
    private updateCellSelection;
    private addAttribute;
    private updateCellProps;
    private addRowCellIndex;
    /**
     * Deselects the currently selected cells.
     *
     * @returns {void}
     */
    clearCellSelection(): void;
    private getSelectedCellsElement;
    private mouseMoveHandler;
    private updateScrollPosition;
    private stopTimer;
    private setScrollPosition;
    private findNextCell;
    private selectLikeExcel;
    private setFrozenBorders;
    private refreshFrozenBorders;
    /**
     * @returns {void}
     * @hidden
     */
    drawBorders(): void;
    private isLastCell;
    private isLastRow;
    private isFirstRow;
    private isFirstCell;
    private setBorders;
    private positionBorders;
    private bottom;
    private top;
    private right_bottom;
    private bottom_left;
    private top_right;
    private top_left;
    private top_bottom;
    private top_right_bottom;
    private top_bottom_left;
    private top_right_left;
    private right_bottom_left;
    private all_border;
    private applyBothFrozenBorders;
    private applyBorders;
    private createBorders;
    private showHideBorders;
    private drawAFBorders;
    private positionAFBorders;
    private createAFBorders;
    destroyAutoFillElements(): void;
    private showAFBorders;
    private hideAFBorders;
    private updateValue;
    private createBeforeAutoFill;
    private getAutoFillCells;
    private selectLikeAutoFill;
    private mouseUpHandler;
    private hideAutoFill;
    /**
     * @returns {void}
     * @hidden
     */
    updateAutoFillPosition(): void;
    private mouseDownHandler;
    private updateStartEndCells;
    private updateStartCellsIndex;
    private enableDrag;
    private clearSelAfterRefresh;
    /**
     * @returns {void}
     * @hidden
     */
    addEventListener(): void;
    /**
     * @returns {void}
     * @hidden
     */
    removeEventListener(): void;
    private wireEvents;
    private unWireEvents;
    private columnPositionChanged;
    private refreshHeader;
    private rowsRemoved;
    beforeFragAppend(e: {
        requestType: string;
    }): void;
    private getCheckAllBox;
    private enableAfterRender;
    private render;
    private onPropertyChanged;
    private hidePopUp;
    private initialEnd;
    private checkBoxSelectionChanged;
    private initPerisistSelection;
    private ensureCheckboxFieldSelection;
    private dataSuccess;
    private setRowSelection;
    private getData;
    private getAvailableSelectedData;
    private refreshPersistSelection;
    private actionBegin;
    private actionComplete;
    private onDataBound;
    private updatePersistSelectedData;
    private checkSelectAllAction;
    private checkSelectAll;
    private getCheckAllStatus;
    private checkSelect;
    private moveIntoUncheckCollection;
    private triggerChkChangeEvent;
    private updateSelectedRowIndexes;
    private updateSelectedRowIndex;
    private isAllSelected;
    private someDataSelected;
    private setCheckAllState;
    private checkVirtualCheckBox;
    private virtualCheckBoxData;
    private isSelectAllRowCount;
    private keyDownHandler;
    private keyUpHandler;
    private clickHandler;
    private popUpClickHandler;
    private showPopup;
    private rowCellSelectionHandler;
    private onCellFocused;
    private getKeyColIndex;
    /**
     * Apply ctrl + A key selection
     *
     * @returns {void}
     * @hidden
     */
    ctrlPlusA(): void;
    private applySpaceSelection;
    private applyDownUpKey;
    private applyUpDown;
    private applyRightLeftKey;
    private applyHomeEndKey;
    /**
     * Apply shift+down key selection
     *
     * @param {number} rowIndex - specfies the rowIndex
     * @param {number} cellIndex - specifies the CellIndex
     * @returns {void}
     * @hidden
     */
    shiftDownKey(rowIndex?: number, cellIndex?: number): void;
    private applyShiftLeftRightKey;
    private getstackedColumns;
    private applyCtrlHomeEndKey;
    private addRemoveClassesForRow;
    private isRowType;
    private isCellType;
    private isSingleSel;
    private getRenderer;
    /**
     * Gets the collection of selected records.
     *
     * @returns {Object[]} returns the Object
     */
    getSelectedRecords(): Object[];
    /**
     * Select the column by passing start column index
     *
     * @param {number} index - specifies the index
     * @returns {void}
     */
    selectColumn(index: number): void;
    /**
     * Select the columns by passing start and end column index
     *
     * @param  {number} startIndex - specifies the start index
     * @param  {number} endIndex - specifies the end index
     * @returns {void}
     */
    selectColumnsByRange(startIndex: number, endIndex?: number): void;
    /**
     * Select the columns by passing column indexes
     *
     * @param  {number[]} columnIndexes - specifies the columnIndexes
     * @returns {void}
     */
    selectColumns(columnIndexes: number[]): void;
    /**
     * Select the column with existing column by passing column index
     *
     * @param  {number} startIndex - specifies the start index
     * @returns {void}
     */
    selectColumnWithExisting(startIndex: number): void;
    /**
     * Clear the column selection
     *
     * @param {number} clearIndex - specifies the clearIndex
     * @returns {void}
     */
    clearColumnSelection(clearIndex?: number): void;
    private getselectedCols;
    private getSelectedColumnCells;
    private columnDeselect;
    private updateColProps;
    private clearColDependency;
    private updateColSelection;
    private headerSelectionHandler;
    private addEventListener_checkbox;
    removeEventListener_checkbox(): void;
    private setCheckAllForEmptyGrid;
    dataReady(e: {
        requestType: string;
    }): void;
    private actionCompleteHandler;
    private selectRowIndex;
    private disableInteracted;
    private activeTarget;
}
