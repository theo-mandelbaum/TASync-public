import { Dialog, Popup } from '@syncfusion/ej2-popups';
/**
 * `Table` module is used to handle table actions.
 */
export declare class Table {
    ensureInsideTableList: boolean;
    element: HTMLElement;
    private rteID;
    private parent;
    private dlgDiv;
    private tblHeader;
    popupObj: Popup;
    editdlgObj: Dialog;
    private createTableButton;
    private contentModule;
    private rendererFactory;
    private quickToolObj;
    private resizeBtnStat;
    private pageX;
    private pageY;
    private curTable;
    private activeCell;
    private keyDownEventInstance;
    private colIndex;
    private columnEle;
    private rowTextBox;
    private columnTextBox;
    private tableWidthNum;
    private tableCellPadding;
    private tableCellSpacing;
    private rowEle;
    private l10n;
    private moveEle;
    private helper;
    private dialogRenderObj;
    private currentColumnResize;
    private previousTableElement;
    private resizeEndTime;
    private isTableMoveActive;
    private resizeIconPositionTime;
    private isResizeBind;
    private isDestroyed;
    private createTablePopupBoundFn;
    private constructor();
    protected addEventListener(): void;
    protected removeEventListener(): void;
    private updateCss;
    private setCssClass;
    private afterRender;
    private dropdownSelect;
    private UpdateCells;
    private keyDown;
    private tableCellsKeyboardSelection;
    private resetTableSelection;
    private getCorrespondingColumns;
    private getCorrespondingIndex;
    private getAdjacentTableElement;
    private getAdjacentElementFromDom;
    private getAdjacentElementFromList;
    private getNodeCollection;
    private getSelectedTableEle;
    private getBrElement;
    private setSelection;
    private removeAllFakeSelectionEles;
    private deleteTable;
    private removeTableSelection;
    private updateTableSelection;
    private handleSelectAll;
    private tableModulekeyUp;
    private openDialog;
    private showDialog;
    private closeDialog;
    private onToolbarAction;
    private verticalAlign;
    private tableStyles;
    private insideList;
    private getBlockNodesInSelection;
    private getImmediateBlockNode;
    private removeEmptyTextNodes;
    private tabSelection;
    private tableArrowNavigation;
    private hideTableQuickToolbar;
    private tableHeader;
    private getAnchorNode;
    private editAreaClickHandler;
    private tableCellSelect;
    private tableMouseUp;
    private tableMouseLeave;
    private tableCellLeave;
    private tableCellClick;
    private tableInsert;
    private cellSelect;
    private heightcheck;
    private wireTableSelectionEvents;
    private unwireTableSelectionEvents;
    private removeCellSelectClasses;
    private tableMove;
    private resizeHelper;
    private tableResizeEleCreation;
    removeResizeElement(): void;
    private calcPos;
    private getPointX;
    private getPointY;
    private resizeStart;
    private getCellIndex;
    private removeHelper;
    private appendHelper;
    private setHelperHeight;
    private updateHelper;
    private calMaxCol;
    private resizing;
    private getCurrentColWidth;
    private getCurrentTableWidth;
    private findFirstLastColCells;
    private convertPixelToPercentage;
    private cancelResizeAction;
    private resizeEnd;
    private resetResizeHelper;
    private resizeBtnInit;
    private addRow;
    private addColumn;
    private removeRowColumn;
    private removeTable;
    private renderDlgContent;
    private onIframeMouseDown;
    private docClick;
    private drawTable;
    private editTable;
    private insertTableDialog;
    private tableCellDlgContent;
    private clearDialogObj;
    private createDialog;
    private customTable;
    private cancelDialog;
    private applyProperties;
    private tableDlgContent;
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    private getModuleName;
    private afterKeyDown;
    private updateResizeIconPosition;
    private createTablePopupKeyDown;
}
