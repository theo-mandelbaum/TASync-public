import { completeAction, focus, insertSheetTab, refreshImagePosition, updateScrollValue } from '../common/index';
import { beforeInsert, insert, triggerDataChange, getRowsHeight } from '../../workbook/index';
import { getCell, getSheet, getCellIndexes, getCellAddress, getColumnsWidth } from '../../workbook/index';
import { skipHiddenIdx } from '../../workbook/index';
/**
 * The `Insert` module is used to insert cells, rows, columns and sheets in to the spreadsheet.
 */
var Insert = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet insert module.
     *
     * @param {Spreadsheet} parent - Specify the spreadsheet instance.
     * @private
     */
    function Insert(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Insert.prototype.insert = function (actionArgs) {
        var args = actionArgs.eventArgs;
        this.parent.notify(beforeInsert, args);
        var sheet = getSheet(this.parent, args.activeSheetIndex);
        switch (args.modelType) {
            case 'Sheet':
                this.parent.notify(insertSheetTab, { startIdx: args.index, endIdx: args.index + (args.model.length - 1), preventUpdate: !args.isAction });
                this.parent.renderModule.refreshSheet();
                break;
            case 'Row':
                if (args.activeSheetIndex === this.parent.activeSheetIndex) {
                    var frozenRow = this.parent.frozenRowCount(sheet);
                    if (!this.parent.scrollSettings.enableVirtualization ||
                        args.index <= this.parent.viewport.bottomIndex) {
                        if (args.freezePane) {
                            this.parent.renderModule.refreshSheet(false, false, true);
                        }
                        else if (this.parent.scrollSettings.enableVirtualization) {
                            var frozenCol = this.parent.frozenColCount(sheet);
                            if (args.index >= this.parent.viewport.topIndex + frozenRow) {
                                var frozenIndexes = [];
                                var colIndex = void 0;
                                if (frozenCol) {
                                    colIndex = getCellIndexes(sheet.topLeftCell)[1];
                                    frozenIndexes.push(frozenRow);
                                    frozenIndexes.push(this.parent.viewport.leftIndex + frozenCol);
                                }
                                else {
                                    colIndex = this.parent.viewport.leftIndex;
                                }
                                var prevColIdx = this.parent.viewport.leftIndex;
                                this.parent.renderModule.refreshUI({
                                    rowIndex: this.parent.viewport.topIndex, colIndex: colIndex, refresh: 'Row',
                                    frozenIndexes: frozenIndexes, skipUpdateOnFirst: this.parent.viewport.topIndex +
                                        frozenRow === skipHiddenIdx(sheet, frozenRow, true)
                                });
                                if (frozenCol) {
                                    this.parent.viewport.leftIndex = prevColIdx;
                                }
                            }
                            var topIdx = getCellIndexes(sheet.paneTopLeftCell)[0];
                            if (args.index < topIdx) {
                                this.parent.notify(updateScrollValue, { scrollTop: getRowsHeight(sheet, frozenRow, topIdx - 1, true) });
                                this.parent.goTo(getCellAddress(args.index, skipHiddenIdx(sheet, frozenCol, true, 'columns')));
                            }
                            this.parent.selectRange(sheet.selectedRange);
                        }
                        else {
                            this.parent.renderModule.refreshSheet(false, false, true);
                        }
                    }
                    else if (this.parent.scrollSettings.isFinite && (this.parent.viewport.topIndex + frozenRow ===
                        skipHiddenIdx(sheet, 0, true) || this.parent.viewport.bottomIndex === skipHiddenIdx(sheet, sheet.rowCount - args.model.length - 1, false))) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                    }
                }
                break;
            case 'Column':
                if (args.activeSheetIndex === this.parent.activeSheetIndex) {
                    var frozenCol = this.parent.frozenColCount(sheet);
                    if (!this.parent.scrollSettings.enableVirtualization || args.index <= this.parent.viewport.rightIndex) {
                        if (args.freezePane) {
                            this.parent.renderModule.refreshSheet(false, false, true);
                        }
                        else if (this.parent.scrollSettings.enableVirtualization) {
                            var frozenRow = this.parent.frozenRowCount(sheet);
                            if (args.index >= this.parent.viewport.leftIndex + frozenCol) {
                                var frozenIndexes = [];
                                if (frozenRow) {
                                    frozenIndexes = [frozenRow + this.parent.viewport.topIndex, frozenCol];
                                }
                                var rowIndex = frozenRow ? getCellIndexes(sheet.topLeftCell)[0] : this.parent.viewport.topIndex;
                                var prevRowIdx = this.parent.viewport.topIndex;
                                this.parent.renderModule.refreshUI({ skipUpdateOnFirst: this.parent.viewport.leftIndex + frozenCol === skipHiddenIdx(sheet, frozenCol, true, 'columns'), rowIndex: rowIndex, colIndex: this.parent.viewport.leftIndex,
                                    refresh: 'Column', frozenIndexes: frozenIndexes });
                                if (frozenRow) {
                                    this.parent.viewport.topIndex = prevRowIdx;
                                }
                            }
                            var leftIdx = getCellIndexes(sheet.paneTopLeftCell)[1];
                            if (args.index < leftIdx) {
                                this.parent.notify(updateScrollValue, { scrollLeft: getColumnsWidth(sheet, 0, leftIdx - 1, true) });
                                this.parent.goTo(getCellAddress(skipHiddenIdx(sheet, frozenRow, true), args.index));
                            }
                            this.parent.selectRange(sheet.selectedRange);
                        }
                        else {
                            this.parent.renderModule.refreshSheet(false, false, true);
                        }
                    }
                    else if (this.parent.scrollSettings.isFinite && (this.parent.viewport.leftIndex + frozenCol ===
                        skipHiddenIdx(sheet, 0, true, 'columns') || this.parent.viewport.rightIndex === skipHiddenIdx(sheet, sheet.colCount - args.model.length - 1, false, 'columns'))) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                    }
                }
                break;
        }
        this.refreshImgElement(args.model.length, this.parent.activeSheetIndex, args.modelType, args.index);
        if (args.isAction) {
            delete args.isAction;
            this.parent.notify(completeAction, actionArgs);
            focus(this.parent.element);
        }
        else if (!args.isUndoRedo) {
            args.isMethod = true;
            this.parent.notify(triggerDataChange, actionArgs);
        }
    };
    Insert.prototype.refreshImgElement = function (count, sheetIdx, modelType, index) {
        var sheet = this.parent.sheets[sheetIdx];
        var cellObj;
        var indexes = [0, 0, sheet.usedRange.rowIndex, sheet.usedRange.colIndex];
        for (var i = 0; i <= indexes[2]; i++) {
            for (var j = indexes[1]; j <= indexes[3]; j++) {
                cellObj = getCell(i, j, sheet);
                if (cellObj && cellObj.image && cellObj.image.length > 0) {
                    if ((modelType === 'Row' && i >= index) || (modelType === 'Column' && j >= index)) {
                        this.parent.notify(refreshImagePosition, {
                            rowIdx: i, colIdx: j, sheetIdx: sheetIdx, type: modelType, count: count, status: 'insert'
                        });
                    }
                }
            }
        }
    };
    Insert.prototype.addEventListener = function () {
        this.parent.on(insert, this.insert, this);
    };
    /**
     * Destroy insert module.
     *
     * @returns {void} - Destroy insert module.
     */
    Insert.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    Insert.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(insert, this.insert);
        }
    };
    /**
     * Get the insert module name.
     *
     * @returns {string} - Get the insert module name.
     */
    Insert.prototype.getModuleName = function () {
        return 'insert';
    };
    return Insert;
}());
export { Insert };
