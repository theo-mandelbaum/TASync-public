import { getSheetIndex, getSheet, getRangeIndexes, isFilterHidden, parseDecimalNumber } from '../index';
import { getCellAddress, getIndexesFromAddress, getColumnHeaderText, updateSheetFromDataSource, intToDate } from '../common/index';
import { queryCellInfo, getFormattedCellObject, isNumber } from '../common/index';
import { getRow, getCell, isHiddenRow, isHiddenCol, getMaxSheetId, getSheetNameCount } from './index';
import { isUndefined, isNullOrUndefined, extend, getNumericObject, Internationalization } from '@syncfusion/ej2-base';
import { setCell, getAutoDetectFormatParser, calculateFormula, isCustomDateTime } from './../index';
/**
 * Update data source to Sheet and returns Sheet
 *
 * @param {Workbook} context - Specifies the context.
 * @param {string} address - Specifies the address.
 * @param {boolean} columnWiseData - Specifies the bool value.
 * @param {boolean} valueOnly - Specifies the valueOnly.
 * @param {number[]} frozenIndexes - Specifies the freeze row and column start indexes, if it is scrolled.
 * @param {boolean} filterDialog - Specifies the bool value.
 * @param {string} formulaCellRef - Specifies the formulaCellRef.
 * @param {number} idx - Specifies the idx.
 * @param {boolean} skipHiddenRows - Specifies the skipHiddenRows.
 * @param {string} commonAddr - Specifies the common address for the address parameter specified with list of range separated by ','.
 * @param {number} dateValueForSpecificColIdx - Specify the dateValueForSpecificColIdx.
 * @param {Object} dateColData - Specify the dateColData.
 * @returns {Promise<Map<string, CellModel> | Object[]>} - To get the data
 * @hidden
 */
export function getData(context, address, columnWiseData, valueOnly, frozenIndexes, filterDialog, formulaCellRef, idx, skipHiddenRows, commonAddr, dateValueForSpecificColIdx, dateColData) {
    if (skipHiddenRows === void 0) { skipHiddenRows = true; }
    return new Promise(function (resolve) {
        resolve((function () {
            var sheetIdx;
            var lastIndex = address.lastIndexOf('!');
            if (lastIndex > -1) {
                sheetIdx = getSheetIndex(context, address.substring(0, lastIndex));
                address = address.substring(lastIndex + 1);
            }
            else {
                sheetIdx = context.activeSheetIndex;
            }
            var sheet = getSheet(context, sheetIdx);
            var indexes = getIndexesFromAddress(commonAddr || address);
            var args = {
                sheet: sheet, indexes: indexes, formulaCellRef: formulaCellRef, sheetIndex: idx,
                promise: new Promise(function (resolve) { resolve((function () { })()); })
            };
            context.notify(updateSheetFromDataSource, args);
            return args.promise.then(function () {
                var i;
                var row;
                var data;
                var sRow = indexes[0];
                var frozenRow = context.frozenRowCount(sheet);
                var frozenCol = context.frozenColCount(sheet);
                var isDateCol = !!dateColData;
                if (columnWiseData) {
                    data = [];
                    var index_1;
                    var cells_1;
                    var parsedNumVal_1;
                    var key_1;
                    var cellProp_1;
                    var localeObj_1;
                    var intl_1;
                    var autoDetectFormatFn_1;
                    if (valueOnly) {
                        localeObj_1 = getNumericObject(context.locale);
                        intl_1 = new Internationalization(context.locale);
                    }
                    else {
                        autoDetectFormatFn_1 = getAutoDetectFormatParser(context);
                    }
                    address.split(',').forEach(function (addr, addrIdx) {
                        indexes = getRangeIndexes(addr);
                        index_1 = 0;
                        sRow = indexes[0];
                        while (sRow <= indexes[2]) {
                            cells_1 = data[index_1] || {};
                            row = getRow(sheet, sRow);
                            i = indexes[1];
                            while (i <= indexes[3]) {
                                if (skipHiddenRows && isHiddenRow(sheet, sRow) && !(filterDialog && isFilterHidden(sheet, sRow))) {
                                    sRow++;
                                    continue;
                                }
                                key_1 = getColumnHeaderText(i + 1);
                                var cell = row ? getCell(sRow, i, sheet) : null;
                                if (valueOnly) {
                                    if (cell && (cell.value || cell.value === 0)) {
                                        if (cell.formattedText && cell.format && !cell.format.includes('*')) {
                                            if (isCustomDateTime(cell.format, false)) {
                                                cells_1[key_1] = intToDate(cell.value);
                                            }
                                            else {
                                                cells_1[key_1] = cell.formattedText.toString().trim();
                                            }
                                        }
                                        else {
                                            cells_1[key_1] = getValueFromFormat(context, cell, sRow, i, false, intl_1);
                                        }
                                        cellProp_1 = cell.value;
                                        if (typeof cellProp_1 === 'string') {
                                            if (localeObj_1.decimal !== '.' && cellProp_1.includes(localeObj_1.decimal)) {
                                                parsedNumVal_1 = cellProp_1.replace(localeObj_1.decimal, '.');
                                                if (isNumber(parsedNumVal_1)) {
                                                    cellProp_1 = parseFloat(parsedNumVal_1);
                                                }
                                            }
                                            else if (isNumber(cellProp_1)) {
                                                cellProp_1 = parseFloat(cellProp_1);
                                            }
                                        }
                                    }
                                    else {
                                        cells_1[key_1] = '';
                                        cellProp_1 = null;
                                    }
                                    cells_1[key_1 + "_value"] = cellProp_1;
                                }
                                else {
                                    if ((cell && (cell.formula || !isNullOrUndefined(cell.value))) || Object.keys(cells_1).length) {
                                        if (i === dateValueForSpecificColIdx) {
                                            cellProp_1 = { value: getValueFromFormat(context, cell, sRow, i, true) };
                                            if (cellProp_1.value && typeof cellProp_1.value === 'string') {
                                                if (isNumber(cellProp_1.value) && !cell.value.toString().includes('\n')) {
                                                    if (!cell.format || cell.format !== '@') {
                                                        cellProp_1.value = parseFloat(cellProp_1.value);
                                                    }
                                                }
                                                else if (!cell.format) {
                                                    autoDetectFormatFn_1(cell);
                                                    if (isNumber(cell.value) && !cell.value.toString().includes('\n')) {
                                                        cellProp_1.value = parseFloat(cell.value);
                                                    }
                                                }
                                            }
                                            cells_1[key_1] = extend({}, cell, cellProp_1);
                                        }
                                        else {
                                            cells_1[key_1] = cell;
                                        }
                                    }
                                    if (cell && ((!!cell.rowSpan && cell.rowSpan !== 1) || (!!cell.colSpan && cell.colSpan !== 1))) {
                                        data = [{ throwMergeAlert: true }];
                                        return;
                                    }
                                }
                                if (i === indexes[3] && Object.keys(cells_1).length) {
                                    cells_1['__rowIndex'] = (sRow + 1).toString();
                                    data[index_1] = cells_1;
                                    if (isDateCol && addrIdx === 0 && !isFilterHidden(sheet, sRow)) {
                                        dateColData.push(cells_1);
                                    }
                                    index_1++;
                                }
                                i++;
                            }
                            sRow++;
                        }
                    });
                }
                else {
                    data = new Map();
                    var checkFrozenIdx = !!(!valueOnly && frozenIndexes && frozenIndexes.length);
                    while (sRow <= indexes[2]) {
                        if (checkFrozenIdx && sRow >= frozenRow && sRow < frozenIndexes[0]) {
                            sRow = frozenIndexes[0];
                            continue;
                        }
                        if (!valueOnly && isHiddenRow(sheet, sRow)) {
                            sRow++;
                            continue;
                        }
                        row = getRow(sheet, sRow);
                        i = indexes[1];
                        while (i <= indexes[3]) {
                            var eventArgs = { cell: getCell(sRow, i, sheet), address: getCellAddress(sRow, i),
                                rowIndex: sRow, colIndex: i };
                            context.trigger(queryCellInfo, eventArgs);
                            var cellObj = getCell(sRow, i, sheet, false, true);
                            if (cellObj.formula && cellObj.formula.toUpperCase().includes('UNIQUE')) {
                                context.notify(calculateFormula, { cell: cellObj, rowIdx: sRow, colIdx: i, sheetIndex: context.activeSheetIndex,
                                    address: eventArgs.address });
                            }
                            if (cellObj.colSpan > 1 && cellObj.rowSpan > 1) {
                                var cell = void 0;
                                for (var j = sRow, len = sRow + cellObj.rowSpan; j < len; j++) {
                                    for (var k = i, len_1 = i + cellObj.colSpan; k < len_1; k++) {
                                        if (j === sRow && k === i) {
                                            continue;
                                        }
                                        cell = new Object();
                                        if (j !== sRow) {
                                            cell.rowSpan = sRow - j;
                                        }
                                        if (k !== i) {
                                            cell.colSpan = i - k;
                                        }
                                        if (sheet.rows[j] && sheet.rows[j].cells &&
                                            sheet.rows[j].cells[k]) {
                                            delete sheet.rows[j].cells[k].value;
                                            delete sheet.rows[j].cells[k].formula;
                                        }
                                        setCell(j, k, sheet, cell, true);
                                    }
                                }
                            }
                            else if (cellObj.colSpan > 1) {
                                for (var j = i + 1, len = i + cellObj.colSpan; j < len; j++) {
                                    setCell(sRow, j, sheet, { colSpan: i - j }, true);
                                    if (sheet.rows[sRow] && sheet.rows[sRow].cells &&
                                        sheet.rows[sRow].cells[j]) {
                                        delete sheet.rows[sRow].cells[j].value;
                                        delete sheet.rows[sRow].cells[j].formula;
                                    }
                                }
                            }
                            else if (cellObj.rowSpan > 1) {
                                for (var j = sRow + 1, len = sRow + cellObj.rowSpan; j < len; j++) {
                                    setCell(j, i, sheet, { rowSpan: sRow - j }, true);
                                    if (sheet.rows[j] && sheet.rows[j].cells &&
                                        sheet.rows[j].cells[i]) {
                                        delete sheet.rows[j].cells[i].value;
                                        delete sheet.rows[j].cells[i].formula;
                                    }
                                }
                            }
                            if (!valueOnly && isHiddenCol(sheet, i)) {
                                i++;
                                continue;
                            }
                            if (checkFrozenIdx && i >= frozenCol && i < frozenIndexes[1]) {
                                i = frozenIndexes[1];
                                continue;
                            }
                            if (cellObj.style) {
                                var style = {};
                                Object.assign(style, cellObj.style);
                                cellObj.style = style;
                            }
                            data.set(eventArgs.address, cellObj);
                            i++;
                        }
                        sRow++;
                    }
                }
                return data;
            });
        })());
    });
}
/**
 * Used to get the formatted value of the cell.
 *
 * @param {Workbook} context - Specifies the context.
 * @param {CellModel} cell - Specifies the cell model.
 * @param {number} rowIdx - Specifies the row index.
 * @param {number} colIdx - Specifies the column index.
 * @param {boolean} getIntValueFromDate - Specify the getIntValueFromDate.
 * @param {Internationalization} intl - Specifies the internationalization object.
 * @returns {string | Date | number} - Returns the formatted cell value.
 * @hidden
 */
export function getValueFromFormat(context, cell, rowIdx, colIdx, getIntValueFromDate, intl) {
    if (cell) {
        if (isNullOrUndefined(cell.value)) {
            return '';
        }
        if (cell.format) {
            var args = { value: cell.value, formattedText: cell.value, cell: cell, format: cell.format,
                checkDate: !getIntValueFromDate, rowIndex: rowIdx, colIndex: colIdx, dataUpdate: true };
            context.notify(getFormattedCellObject, args);
            return args.dateObj && args.dateObj.toString() !== 'Invalid Date' ? args.dateObj : (getIntValueFromDate ? args.value :
                args.formattedText.toString().trim());
        }
        else if (getIntValueFromDate) {
            return cell.value;
        }
        else {
            var cellVal = cell.value;
            if (isNumber(cellVal)) {
                cellVal = Number(cell.value).toString();
                if (cellVal.includes('.') || cellVal.length > 11) {
                    var options = { args: { value: cellVal, updateValue: true }, fResult: cellVal,
                        cellVal: cellVal, intl: intl };
                    context.notify(parseDecimalNumber, options);
                    cellVal = options.fResult;
                }
            }
            return cellVal;
        }
    }
    else {
        return '';
    }
}
/**
 * @hidden
 * @param {SheetModel | RowModel | CellModel} model - Specifies the sheet model.
 * @param {number} idx - Specifies the index value.
 * @returns {SheetModel | RowModel | CellModel} - To process the index
 */
export function getModel(model, idx) {
    var diff;
    var j;
    var prevIdx;
    if (isUndefined(model[idx]) || !(model[idx] && model[idx].index === idx)) {
        for (var i = 0; i <= idx; i++) {
            if (model && model[i]) {
                diff = model[i].index - i;
                if (diff > 0) {
                    model.forEach(function (value, index) {
                        if (value && value.index) {
                            prevIdx = value.index;
                            j = 1;
                        }
                        if (value && !value.index && index !== 0) {
                            value.index = prevIdx + j;
                        }
                        j++;
                    });
                    while (diff--) {
                        model.splice(i, 0, null);
                    }
                    i += diff;
                }
            }
            else if (model) {
                model[i] = null;
            }
            else {
                model = [];
            }
        }
    }
    return model[idx];
}
/**
 * @hidden
 * @param {SheetModel | RowModel | CellModel} model - Specifies the sheet model.
 * @param {boolean} isSheet - Specifies the bool value.
 * @param {Workbook} context - Specifies the Workbook.
 * @param {boolean} isSort - Specifies whether to sort the unordered cell/row model in ascending order.
 * @returns {void} - To process the index
 */
export function processIdx(model, isSheet, context, isSort) {
    var j;
    var diff = 0;
    var cnt;
    var len = model.length;
    if (isSort && model.length > 0) {
        // Sort the model based on the index value in ascending order
        model.sort(function (a, b) {
            if (!isNullOrUndefined(a) && !isUndefined(a.index) && !isNullOrUndefined(b) && !isUndefined(b.index)) {
                return a.index - b.index; // Ascending order
            }
            return 0;
        });
    }
    var _loop_1 = function (i) {
        if (!isNullOrUndefined(model[i]) && !isUndefined(model[i].index)) {
            cnt = diff = model[i].index - i;
            delete model[i].index;
        }
        if (diff > 0) {
            j = 0;
            while (diff--) {
                if (isSheet) {
                    context.createSheet(i + j);
                    j++;
                }
                else {
                    model.splice(i, 0, null);
                }
            }
            i += cnt;
            len += cnt;
        }
        if (isSheet) {
            if (model[i].id < 1) {
                model[i].id = getMaxSheetId(context.sheets);
                if (model[i].properties) {
                    model[i].properties.id = model[i].id;
                }
            }
            if (!model[i].name) {
                context.setSheetPropertyOnMute(model[i], 'name', 'Sheet' + getSheetNameCount(context));
            }
            var cellCnt_1 = 0;
            model[i].rows.forEach(function (row) {
                cellCnt_1 = Math.max(cellCnt_1, (row && row.cells && row.cells.length - 1) || 0);
            });
            context.setSheetPropertyOnMute(model[i], 'usedRange', { rowIndex: model[i].rows.length ? model[i].rows.length - 1 : 0,
                colIndex: cellCnt_1 });
        }
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < len; i++) {
        _loop_1(i);
        i = out_i_1;
    }
}
