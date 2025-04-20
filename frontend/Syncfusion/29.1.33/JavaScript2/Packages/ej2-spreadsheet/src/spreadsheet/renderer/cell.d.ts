import { Spreadsheet } from '../base/index';
import { ICellRenderer, CellRenderArgs, PreviousCellDetails } from '../common/index';
/**
 * CellRenderer class which responsible for building cell content.
 *
 * @hidden
 */
export declare class CellRenderer implements ICellRenderer {
    private parent;
    private element;
    private th;
    private tableRow;
    constructor(parent?: Spreadsheet);
    renderColHeader(index: number, row: Element, refChild?: Element): void;
    renderRowHeader(index: number, row: Element, refChild?: Element): void;
    render(args: CellRenderArgs): Element;
    private setWrapByValue;
    private update;
    private applyStyle;
    private createImageAndChart;
    private calculateFormula;
    private checkMerged;
    private mergeFreezeRow;
    private updateSpanTop;
    private mergeFreezeCol;
    private updateColZIndex;
    private updateSelectAllZIndex;
    private updatedHeaderZIndex;
    private updateRowZIndex;
    private processTemplates;
    private compileCellTemplate;
    private isSelector;
    private getRowHeightOnInit;
    private removeStyle;
    /**
     * @hidden
     * @param {number[]} range - Specifies the range.
     * @param {boolean} refreshing - Specifies the refresh.
     * @param {boolean} checkWrap - Specifies the range.
     * @param {boolean} checkHeight - Specifies the checkHeight.
     * @param {boolean} checkCF - Specifies the check for conditional format.
     * @param {boolean} skipFormatCheck - Specifies whether to skip the format checking while applying the number format.
     * @param {boolean} checkFormulaAdded - Specifies whether to check the formula added or not.
     * @param {boolean} isFromAutoFillOption - Specifies whether the value is from auto fill option or not.
     * @param {boolean} isHeightCheckNeeded - Specifies whether the refreshing is from undo-redo with format action.
     * @param {boolean} isSortAction - Specifies whether to check the sort action performed or not.
     * @param {boolean} isSelectAll - Specifies the all sheet cells selected or not.
     * @param {PreviousCellDetails[]} cells - Specifies the undo redo cell collections.
     * @returns {void}
     */
    refreshRange(range: number[], refreshing?: boolean, checkWrap?: boolean, checkHeight?: boolean, checkCF?: boolean, skipFormatCheck?: boolean, checkFormulaAdded?: boolean, isFromAutoFillOption?: boolean, isHeightCheckNeeded?: boolean, isSortAction?: boolean, isSelectAll?: boolean, cells?: PreviousCellDetails[]): void;
    refresh(rowIdx: number, colIdx: number, lastCell?: boolean, element?: Element, checkCF?: boolean, checkWrap?: boolean, skipFormatCheck?: boolean, isRandomFormula?: boolean, fillType?: string): void;
    private updateView;
    /**
     * Removes the added event handlers and clears the internal properties of CellRenderer module.
     *
     * @returns {void}
     */
    destroy(): void;
}
