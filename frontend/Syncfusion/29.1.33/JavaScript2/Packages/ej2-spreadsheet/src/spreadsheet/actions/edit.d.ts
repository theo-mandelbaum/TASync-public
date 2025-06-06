import { Spreadsheet } from '../index';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
/**
 * The `Protect-Sheet` module is used to handle the Protecting functionalities in Spreadsheet.
 */
export declare class Edit {
    private parent;
    private editorElem;
    private editCellData;
    private isEdit;
    private isCellEdit;
    private isNewValueEdit;
    private isAltEnter;
    private curEndPos;
    private curStartPos;
    private endFormulaRef;
    private uniqueColl;
    private uniqueCell;
    private uniqueActCell;
    private isSpill;
    private tapedTwice;
    private keyCodes;
    private formulaErrorStrings;
    /**
     * Constructor for edit module in Spreadsheet.
     *
     * @param {Spreadsheet} parent - Constructor for edit module in Spreadsheet.
     * @private
     */
    constructor(parent: Spreadsheet);
    /**
     * To destroy the edit module.
     *
     * @returns {void} - To destroy the edit module.
     * @hidden
     */
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    getModuleName(): string;
    private performEditOperation;
    private keyUpHandler;
    private updateFormulaReference;
    private keyDownHandler;
    private renderEditor;
    private refreshEditor;
    private startEdit;
    private setCursorPosition;
    private hasFormulaSuggSelected;
    private editingHandler;
    private getCurPosition;
    private mouseDownHandler;
    private tapHandler;
    private dblClickHandler;
    private updateEditCellDetail;
    private initiateEditor;
    private positionEditor;
    private updateEditedValue;
    private updateCell;
    private checkUniqueRange;
    private updateUniqueRange;
    private reApplyFormula;
    private refreshDependentCellValue;
    private getRefreshNodeArgs;
    endEdit(refreshFormulaBar?: boolean, event?: MouseEvent & TouchEvent | KeyboardEventArgs, isPublic?: boolean): void;
    cancelEdit(refreshFormulaBar?: boolean, trigEvent?: boolean, event?: MouseEvent & TouchEvent | KeyboardEventArgs, isInternal?: boolean): void;
    private focusElement;
    private triggerEvent;
    private altEnter;
    private resetEditState;
    private refSelectionRender;
    private initiateRefSelection;
    private addressHandler;
    private updateFormulaBarValue;
    private setFormulaBarCurPosition;
    private initiateCurPosition;
    private getEditElement;
    private sheetChangeHandler;
    private showFormulaAlertDlg;
    private getFormulaErrorKey;
    private readOnlyAlertHandler;
    private finiteAlertHandler;
}
