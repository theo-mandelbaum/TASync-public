import { Spreadsheet } from '../index';
/**
 * Represents Data Validation support for Spreadsheet.
 */
export declare class DataValidation {
    private parent;
    private listObj;
    private dataList;
    private typeList;
    private typeData;
    private operatorData;
    private formObj;
    /**
     * Constructor for the Spreadsheet Data Validation module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet Data Validation module.
     */
    constructor(parent: Spreadsheet);
    /**
     * To destroy the Data Validation module.
     *
     * @returns {void}
     */
    protected destroy(): void;
    private addEventListener;
    private removeEventListener;
    private removeValidationHandler;
    private updateNoteIndicator;
    private keyUpHandler;
    private listOpen;
    private invalidDataHandler;
    private listHandler;
    private removeListDropdownHandler;
    private addListValidationDropdownHandler;
    private updateTopPosition;
    private listValidationHeightHandler;
    private setDropDownListIndex;
    private getListDataSource;
    private listValueChange;
    private getRange;
    private initiateDataValidationHandler;
    private divElements;
    private spanElements;
    private inputElements;
    private checkBoxElements;
    private numericTextBoxElements;
    private dropDownListElements;
    private dataValidationContent;
    private dialogBeforeClose;
    private userInput;
    private dlgClickHandler;
    private formattedValue;
    private formattedType;
    private isDialogValidator;
    private getDateAsNumber;
    private getListOfValues;
    private checkValidationHandler;
    private parseValidationValue;
    private isValidCellHandler;
    private formatValidation;
    private updateHighlightHandler;
    private validationErrorHandler;
    private errorDlgHandler;
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    protected getModuleName(): string;
}
