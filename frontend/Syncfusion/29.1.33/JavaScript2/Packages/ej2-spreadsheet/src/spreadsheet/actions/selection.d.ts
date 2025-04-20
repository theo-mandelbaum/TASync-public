import { Spreadsheet } from '../base/index';
/**
 * Represents selection support for Spreadsheet.
 */
export declare class Selection {
    private parent;
    private startCell;
    private isRowSelected;
    private isColSelected;
    private scrollInterval;
    private touchEvt;
    private mouseMoveEvt;
    private invalidOperators;
    private formulaRange;
    private dStartCell;
    private dEndCell;
    private touchSelectionStarted;
    private isautoFillClicked;
    dAutoFillCell: string;
    /** @hidden */
    previousActiveCell: string;
    /** @hidden */
    isNoteActiveElement: boolean;
    private isNoteTouch;
    /**
     * Constructor for the Spreadsheet selection module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet selection module.
     * @private
     */
    constructor(parent: Spreadsheet);
    private addEventListener;
    private removeEventListener;
    private isTouchSelectionStarted;
    private selectionByKeydown;
    private rowHeightChanged;
    private colWidthChanged;
    private selectRange;
    private init;
    private selectMultiRange;
    private createSelectionElement;
    private isMergeActiveCell;
    private mouseDownHandler;
    private mouseMoveHandler;
    private mouseUpHandler;
    private updateFormulaCursorPosition;
    private isSelected;
    private virtualContentLoadedHandler;
    private clearInterval;
    private getScrollLeft;
    private cellNavigateHandler;
    private getColIdxFromClientX;
    private isScrollableArea;
    private getRowIdxFromClientY;
    private initFormulaReferenceIndicator;
    private isMouseEvent;
    private selectRangeByIdx;
    private isRowColSelected;
    private updateActiveCell;
    private getOffset;
    private getSelectionElement;
    private getActiveCell;
    private getSheetElement;
    private highlightHdr;
    private protectHandler;
    private initiateFormulaSelection;
    private processFormulaEditRange;
    private updateFormulaEditRange;
    private chartBorderHandler;
    private focusBorder;
    private getEleFromRange;
    private getRowCells;
    private merge;
    private clearBorder;
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Get the module name.
     */
    protected getModuleName(): string;
    destroy(): void;
}
