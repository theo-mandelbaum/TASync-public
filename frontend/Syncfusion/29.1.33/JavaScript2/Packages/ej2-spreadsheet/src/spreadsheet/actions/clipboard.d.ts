import { Spreadsheet } from '../base/index';
/**
 * Represents clipboard support for Spreadsheet.
 */
export declare class Clipboard {
    private parent;
    private copiedInfo;
    private copiedShapeInfo;
    constructor(parent: Spreadsheet);
    private init;
    private addEventListener;
    private removeEventListener;
    private ribbonClickHandler;
    private tabSwitchHandler;
    private cMenuBeforeOpenHandler;
    private rowHeightChanged;
    private colWidthChanged;
    private cut;
    private copy;
    private paste;
    private setCF;
    private isRangeMerged;
    private updateFilter;
    private isInRange;
    private setCell;
    private getCopiedIdx;
    private setCopiedInfo;
    private imageToCanvas;
    private addImgToClipboard;
    private checkForUncalculatedFormula;
    private getChartElemInfo;
    private clearCopiedInfo;
    private removeIndicator;
    private initCopyIndicator;
    private showDialog;
    private hidePaste;
    private setExternalCells;
    private getExternalCells;
    private generateCells;
    private getNewIndex;
    private cellStyle;
    private generateStyles;
    private refreshOnInsertDelete;
    private performAction;
    private getClipboardEle;
    private getCopyIndicator;
    protected getModuleName(): string;
    destroy(): void;
}
