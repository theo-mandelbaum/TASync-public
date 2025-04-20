import { Workbook } from '../index';
import { FormulaCalculateArgs } from '../common/index';
/**
 * @hidden
 * The `WorkbookFormula` module is used to handle the formula operation in Workbook.
 */
export declare class WorkbookFormula {
    private parent;
    private calcID;
    private uniqueOBracket;
    private uniqueCBracket;
    private uniqueCSeparator;
    private uniqueCOperator;
    private uniquePOperator;
    private uniqueSOperator;
    private uniqueMOperator;
    private uniqueDOperator;
    private uniqueModOperator;
    private uniqueConcateOperator;
    private uniqueEqualOperator;
    private uniqueExpOperator;
    private uniqueGTOperator;
    private uniqueLTOperator;
    private calculateInstance;
    private sheetInfo;
    /**
     * Constructor for formula module in Workbook.
     *
     * @param {Workbook} workbook - Specifies the workbook.
     * @private
     */
    constructor(workbook: Workbook);
    private init;
    /**
     * To destroy the formula module.
     *
     * @returns {void}
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
    private initCalculate;
    private clearFormulaDependentCells;
    private formulaInValidation;
    private performFormulaOperation;
    private definedNamesDeletion;
    private referenceError;
    private getSheetInfo;
    private addCustomFunction;
    private updateSheetInfo;
    private getSheetRefUpdateOnDelete;
    private sheetDeletion;
    private renameUpdation;
    private updateDataContainer;
    private parseSheetRef;
    private registerSheet;
    private unRegisterSheet;
    private getUniqueRange;
    private removeUniquecol;
    /**
     * Perform the formula calculation.
     *
     * @param {FormulaCalculateArgs} args - Specifies the formula calculation options.
     * @param {number} args.rowIndex - The index of the row.
     * @param {number} args.colIndex - The index of the column.
     * @param {string} args.value - The value of the cell.
     * @param {boolean} args.isFormula - A flag indicating whether the value is a formula.
     * @param {number} args.sheetIdx - The index of the sheet.
     * @param {boolean} args.isRefreshing - A flag indicating whether the calculation is being refreshed.
     * @param {boolean} [args.isDependentRefresh] - An optional flag indicating whether the refresh is dependent.
     * @param {boolean} [args.isRandomFormula] - An optional flag indicating whether the formula is random.
     * @param {boolean} [args.isDelete] - An optional flag indicating whether is from delete cells.
     * @param {number[]} [args.deletedRange] - An optional range array indicating the deleted cells.
     * @returns {void}
     * @private
     */
    refreshCalculate(args: FormulaCalculateArgs): void;
    private calculateFormula;
    private refreshRandomFormula;
    private autoCorrectFormula;
    private correctCellReference;
    private autoCorrectCellRef;
    private getUpdatedCellRef;
    private initiateDefinedNames;
    /**
     * @hidden
     * Used to add defined name to workbook.
     *
     * @param {DefineNameModel} definedName - Define named range.
     * @param {boolean} isValidate - Specify the boolean value.
     * @param {number} index - Define named index.
     * @param {boolean} isEventTrigger - Specify the boolean value.
     * @returns {boolean} - Used to add defined name to workbook.
     */
    private addDefinedName;
    /**
     * @hidden
     * Used to remove defined name from workbook.
     *
     * @param {string} name - Specifies the defined name.
     * @param {string} scope - Specifies the scope of the define name.
     * @param {boolean} isEventTrigger - Specify the boolean value.
     * @returns {boolean} - To Return the bool value.
     */
    private removeDefinedName;
    private checkIsNameExist;
    private getIndexFromNameColl;
    private calculateNow;
    private toFixed;
    private commputeFormulaValue;
    private getCellRefValue;
    private aggregateComputation;
    private refreshInsertDelete;
    private getUpdatedFormulaOnInsertDelete;
    private updateFormula;
    private clearUniqueRange;
    private clearAllUniqueFormulaValue;
    private parseFormulaArgument;
    private getUniqueCharVal;
    private isUniqueChar;
    private markSpecialChar;
    private refreshNamedRange;
    private updateDefinedNames;
}
