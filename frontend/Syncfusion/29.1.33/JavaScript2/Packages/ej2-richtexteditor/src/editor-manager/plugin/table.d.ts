import { EditorManager } from './../base/editor-manager';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
export declare class TableCommand {
    private parent;
    private activeCell;
    private curTable;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private createTable;
    private calculateStyleValue;
    private insertAfter;
    private getSelectedCellMinMaxIndex;
    private insertRow;
    private insertColumn;
    private setBGColor;
    private deleteColumn;
    private deleteRow;
    private getMergedRow;
    private removeTable;
    private tableHeader;
    private tableVerticalAlign;
    private cellMerge;
    private updateColSpanStyle;
    private updateRowSpanStyle;
    private updateCellAttribute;
    private mergeCellContent;
    private getSelectedMinMaxIndexes;
    private HorizontalSplit;
    private VerticalSplit;
    private getSplitColWidth;
    private getColSizes;
    private getCellIndex;
    private convertPixelToPercentage;
    private getCorrespondingColumns;
    private FindIndex;
    private getCorrespondingIndex;
    private highlightCells;
    private restoreRange;
    private tableStyle;
    private tableMove;
    destroy(): void;
    private cellStyleCleanup;
}
