import { Spreadsheet } from '../index';
/**
 * Represents Conditional Formatting support for Spreadsheet.
 */
export declare class ConditionalFormatting {
    private parent;
    private dupData;
    private colorData;
    /**
     * Constructor for the Spreadsheet Conditional Formatting module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet Conditional Formatting module.
     */
    constructor(parent: Spreadsheet);
    /**
     * To destroy the Conditional Formatting module.
     *
     * @returns {void} - To destroy the Conditional Formatting module.
     */
    protected destroy(): void;
    private addEventListener;
    private removeEventListener;
    private clearCF;
    private renderCFDlg;
    private dialogBeforeClose;
    private dlgClickHandler;
    private getType;
    private getCFColor;
    private divElements;
    private spanElements;
    private inputElements;
    private dropDownListElements;
    private numericTBElements;
    private value1Inp;
    private value2Inp;
    private cfDlgContent;
    private validateCFInput;
    private checkCellHandler;
    private getDlgText;
    private updateResult;
    private applyCF;
    private updateCF;
    private updateRange;
    private applyIconSet;
    private getIconList;
    private applyDataBars;
    private getColor;
    private getGradient;
    private getLinear;
    private byteLinear;
    private isGreaterThanLessThan;
    private isBetWeen;
    private isEqualTo;
    private isContainsText;
    private setCFStyle;
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    protected getModuleName(): string;
}
