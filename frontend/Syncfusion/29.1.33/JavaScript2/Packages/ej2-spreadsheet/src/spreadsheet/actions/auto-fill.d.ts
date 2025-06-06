import { Spreadsheet } from '../../spreadsheet/index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
/**
 * AutoFill module allows to perform auto fill functionalities.
 */
export declare class AutoFill {
    private parent;
    private autoFillElement;
    private splitBtnElem;
    private autoFillElementPosition;
    private autoFillCell;
    autoFillDropDown: DropDownButton;
    private isVerticalFill;
    private fillOptionIndex;
    constructor(parent: Spreadsheet);
    private getfillItems;
    private createAutoFillElement;
    private getautofillDDB;
    private getFillType;
    private autoFillClick;
    private getFillRange;
    private autoFillOptionClick;
    private refreshAutoFillOption;
    private positionAutoFillElement;
    private hideAutoFillElement;
    private hideAutoFillOptions;
    private selectAutoFillRange;
    private getAutoFillRange;
    private modifyRangeForMerge;
    private performAutoFill;
    private refreshCell;
    private getDirection;
    private performAutoFillAction;
    private getRangeData;
    private isMergedRange;
    private addEventListener;
    private removeEventListener;
    /**
     * Destroy AutoFill module.
     *
     * @returns {void} - Destroy auto fill module.
     */
    destroy(): void;
    /**
     * Get the AutoFill module name.
     *
     * @returns {string} - Get the auto fill module name.
     */
    getModuleName(): string;
}
