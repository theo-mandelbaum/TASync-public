var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { processIdx } from './data';
import { ConditionalFormat, getCellIndexes, moveOrDuplicateSheet, workbookFormulaOperation, duplicateSheetFilterHandler, moveSheetHandler, updateSortCollection } from '../common/index';
import { ProtectSettings, getCellAddress } from '../common/index';
import { isUndefined, ChildProperty, Property, Complex, Collection, extend } from '@syncfusion/ej2-base';
/**
 * Configures the range processing for the spreadsheet.
 *  ```html
 * <div id='Spreadsheet'></div>
 * ```
 * ```typescript
 * let spreadsheet: Spreadsheet = new Spreadsheet({
 *      sheets: [{
 *                  name: 'First Sheet',
 *                  ranges: [{ dataSource: defaultData }],
 *                  rows: [{
 *                          index: 30,
 *                          cells: [{ index: 4, value: 'Total Amount:' },
 *                                  { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } }]
 *                  }]
 * ...
 * });
 * spreadsheet.appendTo('#Spreadsheet');
 * ```
 */
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Range.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this['parentObj'].isComplexArraySetter && this['controlParent'] && this['controlParent'].isAngular) {
            if (Object.keys(prop).length) {
                if (this['parentObj']['currRangeIdx'] === undefined) {
                    this['parentObj']['currRangeIdx'] = 0;
                }
                else {
                    this['parentObj']['currRangeIdx'] += 1;
                }
                var range = this['parentObj'].ranges[this['parentObj']['currRangeIdx']];
                if (range && range.info) {
                    this.info = range.info;
                }
                setTimeout(function () {
                    if (_this['parentObj']['currRangeIdx'] !== undefined) {
                        delete _this['parentObj']['currRangeIdx'];
                    }
                });
            }
            else if (this['controlParent'].tagObjects[0].instance && this['controlParent'].tagObjects[0].instance.hasChanges
                && !this['controlParent'].tagObjects[0].instance.isInitChanges) {
                var sheetIdx = this['controlParent'].sheets.indexOf(this['parentObj']);
                if (this['parentObj'].changedRangeIdx === undefined) {
                    var rangeIdx_1;
                    var tagObjects = this['controlParent'].tagObjects[0].instance.list[sheetIdx].tagObjects;
                    for (var i = 0; i < tagObjects.length; i++) {
                        if (tagObjects[i]['name'] === 'ranges') {
                            tagObjects[i]['instance'].list
                                .forEach(function (range, idx) {
                                if (range.hasChanges) {
                                    rangeIdx_1 = idx;
                                }
                            });
                            break;
                        }
                    }
                    this['parentObj'].changedRangeIdx = rangeIdx_1;
                }
            }
        }
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate([
        Property(null)
    ], Range.prototype, "dataSource", void 0);
    __decorate([
        Property('A1')
    ], Range.prototype, "startCell", void 0);
    __decorate([
        Property(null)
    ], Range.prototype, "query", void 0);
    __decorate([
        Property(null)
    ], Range.prototype, "fieldsOrder", void 0);
    __decorate([
        Property(true)
    ], Range.prototype, "showFieldAsHeader", void 0);
    __decorate([
        Property('')
    ], Range.prototype, "template", void 0);
    __decorate([
        Property('A1')
    ], Range.prototype, "address", void 0);
    return Range;
}(ChildProperty));
export { Range };
/**
 * Used range which contains end row index and end column index of the last used cell in sheet .
 */
var UsedRange = /** @class */ (function (_super) {
    __extends(UsedRange, _super);
    function UsedRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], UsedRange.prototype, "rowIndex", void 0);
    __decorate([
        Property(0)
    ], UsedRange.prototype, "colIndex", void 0);
    return UsedRange;
}(ChildProperty));
export { UsedRange };
/**
 * Configures the sheet behavior for the spreadsheet.
 */
var Sheet = /** @class */ (function (_super) {
    __extends(Sheet, _super);
    function Sheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Sheet.prototype, "rows", void 0);
    __decorate([
        Property(null)
    ], Sheet.prototype, "columns", void 0);
    __decorate([
        Complex({}, ProtectSettings)
    ], Sheet.prototype, "protectSettings", void 0);
    __decorate([
        Collection([], Range)
    ], Sheet.prototype, "ranges", void 0);
    __decorate([
        Collection([], ConditionalFormat)
    ], Sheet.prototype, "conditionalFormats", void 0);
    __decorate([
        Property(0)
    ], Sheet.prototype, "index", void 0);
    __decorate([
        Property('')
    ], Sheet.prototype, "name", void 0);
    __decorate([
        Property(100)
    ], Sheet.prototype, "rowCount", void 0);
    __decorate([
        Property(100)
    ], Sheet.prototype, "colCount", void 0);
    __decorate([
        Property('A1:A1')
    ], Sheet.prototype, "selectedRange", void 0);
    __decorate([
        Property('A1')
    ], Sheet.prototype, "activeCell", void 0);
    __decorate([
        Complex({}, UsedRange)
    ], Sheet.prototype, "usedRange", void 0);
    __decorate([
        Property('A1')
    ], Sheet.prototype, "topLeftCell", void 0);
    __decorate([
        Property(true)
    ], Sheet.prototype, "showHeaders", void 0);
    __decorate([
        Property(true)
    ], Sheet.prototype, "showGridLines", void 0);
    __decorate([
        Property(false)
    ], Sheet.prototype, "isProtected", void 0);
    __decorate([
        Property('Visible')
    ], Sheet.prototype, "state", void 0);
    __decorate([
        Property(0)
    ], Sheet.prototype, "frozenRows", void 0);
    __decorate([
        Property(0)
    ], Sheet.prototype, "frozenColumns", void 0);
    __decorate([
        Property('A1')
    ], Sheet.prototype, "paneTopLeftCell", void 0);
    __decorate([
        Property('')
    ], Sheet.prototype, "password", void 0);
    __decorate([
        Property(null)
    ], Sheet.prototype, "standardHeight", void 0);
    __decorate([
        Property(false)
    ], Sheet.prototype, "isSheetCalculated", void 0);
    return Sheet;
}(ChildProperty));
export { Sheet };
/**
 * To get sheet index from address.
 *
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {string} name - Specifies the name.
 * @returns {number} - To gget sheet index from address.
 */
export function getSheetIndex(context, name) {
    var idx;
    if (name.startsWith('\'') && name.endsWith('\'')) {
        name = name.replace(/''/g, '\'').replace(/^'|'$/g, '');
    }
    for (var i = 0; i < context.sheets.length; i++) {
        if (context.sheets[i].name.toLowerCase() === name.toLowerCase()) {
            idx = i;
            break;
        }
    }
    return idx;
}
/**
 * To get sheet index from sheet id.
 *
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {number} id - Specifies the id.
 * @returns {number} - To get the sheet index from id.
 */
export function getSheetIndexFromId(context, id) {
    var idx;
    for (var i = 0; i < context.sheets.length; i++) {
        if (context.sheets[i].id === id) {
            idx = i;
            break;
        }
    }
    return idx;
}
/**
 * To get sheet name from address.
 *
 * @hidden
 * @param {string} address - Specifies the address.
 * @returns {address} - To get Sheet Name From Address.
 */
export function getSheetNameFromAddress(address) {
    var sheetRefIndex = address.lastIndexOf('!');
    return sheetRefIndex > -1 ? address.substring(0, sheetRefIndex).replace(/'/gi, '') : address.replace(/'/gi, '');
}
/**
 * To get sheet index from sheet name.
 *
 * @hidden
 * @param {Object} context - Specifies the context.
 * @param {string} name - Specifies the name.
 * @param {SheetModel} info - Specifies the sheet info.
 * @returns {number} - To get the sheet index by name.
 */
export function getSheetIndexByName(context, name, info) {
    var len = info.length;
    for (var i = 0; i < len; i++) {
        if (info[i].sheet.toUpperCase() === name.toUpperCase()) {
            return info[i].index;
        }
    }
    return -1;
}
/**
 * update selected range
 *
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {string} range - Specifies the range.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {boolean} isMultiRange - Specifies the boolean value.
 * @returns {void} - Update the selected range.
 */
export function updateSelectedRange(context, range, sheet, isMultiRange) {
    if (sheet === void 0) { sheet = {}; }
    context.setSheetPropertyOnMute(sheet, 'selectedRange', isMultiRange ? sheet.selectedRange + ' ' + range : range);
}
/**
 * get selected range
 *
 * @hidden
 * @param {SheetModel} sheet - Specifies the sheet.
 * @returns {string} - Get selected range.
 */
export function getSelectedRange(sheet) {
    return sheet && sheet.selectedRange || 'A1';
}
/**
 * @hidden
 * @param {SheetModel} sheet - Specifies the sheet.
 * @returns {string} - To get single selected range.
 */
export function getSingleSelectedRange(sheet) {
    return sheet.selectedRange.split(' ')[0];
}
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {number} idx - Specifies the idx.
 * @returns {SheetModel} - To get sheet.
 */
export function getSheet(context, idx) {
    return context.sheets[idx];
}
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @returns {number} - To get sheet name count.
 */
export function getSheetNameCount(context) {
    var name = [];
    context.sheets.forEach(function (sheet) {
        name.push(sheet.name.toLowerCase());
    });
    for (var i = 0; i < name.length; i++) {
        if (name.indexOf('sheet' + context.sheetNameCount) > -1) {
            context.sheetNameCount++;
        }
        else {
            return context.sheetNameCount++;
        }
    }
    return context.sheetNameCount++;
}
/**
 * @hidden
 * @param {SheetModel[]} sheets - Specifies the sheets.
 * @returns {number} - To get sheet id.
 */
export function getMaxSheetId(sheets) {
    var cnt = 0;
    sheets.forEach(function (sheet) {
        cnt = Math.max(sheet.id, cnt);
    });
    return cnt + 1;
}
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {SheetModel[]} sheet - Specifies the sheet.
 * @param {boolean} isImport - Specifies is Import or not.
 * @returns {void} - To initiate sheet.
 */
export function initSheet(context, sheet, isImport) {
    var sheets = sheet ? sheet : context.sheets;
    sheets.forEach(function (sheet) {
        sheet.id = sheet.id || 0;
        sheet.name = sheet.name || '';
        context.setSheetPropertyOnMute(sheet, 'rowCount', sheet.rowCount || 100);
        context.setSheetPropertyOnMute(sheet, 'colCount', sheet.colCount || 100);
        context.setSheetPropertyOnMute(sheet, 'topLeftCell', sheet.topLeftCell || 'A1');
        context.setSheetPropertyOnMute(sheet, 'activeCell', sheet.activeCell || 'A1');
        context.setSheetPropertyOnMute(sheet, 'selectedRange', sheet.selectedRange || sheet.activeCell + ':' + sheet.activeCell);
        context.setSheetPropertyOnMute(sheet, 'usedRange', sheet.usedRange || { rowIndex: 0, colIndex: 0 });
        context.setSheetPropertyOnMute(sheet, 'ranges', sheet.ranges ? sheet.ranges : []);
        context.setSheetPropertyOnMute(sheet, 'rows', (sheet.rows && extend([], sheet.rows, null, true)) || []);
        context.setSheetPropertyOnMute(sheet, 'columns', sheet.columns || []);
        context.setSheetPropertyOnMute(sheet, 'showHeaders', isUndefined(sheet.showHeaders) ? true : sheet.showHeaders);
        context.setSheetPropertyOnMute(sheet, 'showGridLines', isUndefined(sheet.showGridLines) ? true : sheet.showGridLines);
        context.setSheetPropertyOnMute(sheet, 'state', sheet.state || 'Visible');
        sheet.maxHgts = sheet.maxHgts || [];
        sheet.isImportProtected = sheet.isProtected && isImport;
        sheet.protectSettings = sheet.protectSettings || { selectCells: false, formatCells: false, formatRows: false, formatColumns: false,
            insertLink: false };
        sheet.isProtected = sheet.isProtected || false;
        if (!sheet.paneTopLeftCell || sheet.paneTopLeftCell === 'A1') {
            sheet.frozenRows = sheet.frozenRows ? sheet.frozenRows : 0;
            sheet.frozenColumns = sheet.frozenColumns ? sheet.frozenColumns : 0;
            var indexes = getCellIndexes(sheet.topLeftCell);
            context.setSheetPropertyOnMute(sheet, 'paneTopLeftCell', getCellAddress(sheet.frozenRows ? indexes[0] + sheet.frozenRows : indexes[0], sheet.frozenColumns ? indexes[1] + sheet.frozenColumns : indexes[1]));
        }
        processIdx(sheet.columns);
        initRow(sheet.rows, isImport);
    });
    processIdx(sheets, true, context);
}
// function initRangeSettings(ranges: RangeModel[]): RangeModel[] {
//     ranges.forEach((range: RangeModel) => {
//         range.startCell = range.startCell || 'A1';
//         range.address = range.address || 'A1';
//         range.template = range.template || '';
//         range.showFieldAsHeader = isUndefined(range.showFieldAsHeader) ? true : range.showFieldAsHeader;
//     });
//     return ranges;
// }
/**
 * @param {RowModel[]} rows - Specifies the rows.
 * @param {boolean} isImport - Specifies the operation is from Import or not.
 * @returns {void} - Specifies the row.
 */
function initRow(rows, isImport) {
    rows.forEach(function (row) {
        if (row && row.cells) {
            // Process cell indexes in ascending order when the import operation is performed.
            processIdx(row.cells, null, undefined, isImport);
        }
    });
    processIdx(rows, null, undefined, isImport);
}
/**
 * get sheet name
 *
 * @param {Workbook} context - Specifies the context.
 * @param {number} idx - Specifies the idx.
 * @returns {string} - To get sheet name.
 * @hidden
 */
export function getSheetName(context, idx) {
    if (idx === void 0) { idx = context.activeSheetIndex; }
    return getSheet(context, idx).name;
}
/**
 * @param {Workbook} context - Specifies context
 * @param {number} position - position to move a sheet in the list of sheets
 * @param {number[]} sheetIndexes - Specifies the sheet indexes of the sheets which is to be moved
 * @param {boolean} action - Specifies to trigger events
 * @param {boolean} isFromUpdateAction - Specifies is from UpdateAction or not.
 * @returns {void}
 * @hidden
 */
export function moveSheet(context, position, sheetIndexes, action, isFromUpdateAction) {
    var needRefresh = !!sheetIndexes;
    sheetIndexes = sheetIndexes || [context.activeSheetIndex];
    var sheetName = getSheetName(context);
    position = getNextPrevVisibleSheetIndex(context.sheets, position, context.activeSheetIndex > position);
    var args = {
        action: 'moveSheet', eventArgs: { position: position, sheetIndexes: sheetIndexes, cancel: false }
    };
    if (action) {
        context.trigger('actionBegin', args);
    }
    if (!args.eventArgs.cancel) {
        context.notify(moveSheetHandler, { prevIndex: context.activeSheetIndex, currentIndex: position });
        sheetIndexes.forEach(function (sIdx, idx) {
            context.sheets.splice(position + idx, 0, context.sheets.splice(sIdx + (position > sIdx ? -1 * idx : 0), 1)[0]);
        });
        context.setProperties({
            activeSheetIndex: isFromUpdateAction ? getSheetIndex(context, sheetName)
                : (position > sheetIndexes[0] ? position - (sheetIndexes.length - 1) : position)
        }, true);
        context.notify(moveOrDuplicateSheet, { refresh: needRefresh });
        if (action) {
            delete args.eventArgs.cancel;
            context.trigger('actionComplete', args);
        }
    }
}
/**
 * @param {Workbook} context - Specifies context
 * @param {number} sheetIndex - Specifies sheetIndex to be duplicated
 * @param {boolean} action - Specifies to trigger events
 * @param {boolean} isFromUpdateAction - Specifies is from updateAction.
 * @returns {void}
 * @hidden
 */
export function duplicateSheet(context, sheetIndex, action, isFromUpdateAction) {
    sheetIndex = isUndefined(sheetIndex) ? context.activeSheetIndex : sheetIndex;
    var args = {
        action: 'duplicateSheet', eventArgs: { sheetIndex: sheetIndex, cancel: false }
    };
    if (action) {
        context.trigger('actionBegin', args);
    }
    if (!args.eventArgs.cancel) {
        var originalSheet = getSheet(context, sheetIndex);
        var sheet = extend({}, originalSheet.properties ?
            originalSheet.properties : originalSheet, {}, true);
        sheet.id = getMaxSheetId(context.sheets);
        var name_1 = sheet.name;
        if (/^\(\d+\)$/.test('(' + name_1.split(' (')[1])) {
            name_1 = name_1.split(' (')[0];
        }
        var sheetNames_1 = [];
        context.sheets.forEach(function (sheet) {
            sheetNames_1.push(sheet.name);
        });
        for (var i = 2;; i++) {
            if (sheetNames_1.indexOf(name_1 + ' (' + i + ')') === -1) {
                sheet.name = name_1 + ' (' + i + ')';
                break;
            }
        }
        context.notify(duplicateSheetFilterHandler, { sheetIndex: sheetIndex, newSheetIndex: sheetIndex + 1 });
        context.notify(updateSortCollection, { isDuplicate: true, curSheetIndex: sheetIndex, newSheetIndex: sheetIndex + 1 });
        context.createSheet(sheetIndex + 1, [sheet]);
        context.notify(workbookFormulaOperation, { action: 'addSheet', sheetName: 'Sheet' + sheet.id, visibleName: sheet.name, sheetId: sheet.id });
        if (!isFromUpdateAction) {
            context.setProperties({ activeSheetIndex: sheetIndex + 1 }, true);
        }
        context.notify(moveOrDuplicateSheet, { refresh: true, isDuplicate: true });
        if (action) {
            delete args.eventArgs.cancel;
            context.trigger('actionComplete', args);
        }
    }
}
/**
 * @param {SheetModel[]} sheets - sheets of spreadsheet
 * @param {number} startIndex - index of the sheet to search from
 * @param {boolean} isPrevious - if set to `true`, its find the previous visible sheet index
 * @returns {number} - return next visible sheet
 */
function getNextPrevVisibleSheetIndex(sheets, startIndex, isPrevious) {
    for (var i = startIndex; isPrevious ? i >= 0 : i < sheets.length; isPrevious ? i-- : i++) {
        if (!(sheets[i].state === 'Hidden' || sheets[i].state === 'VeryHidden')) {
            startIndex = i;
            break;
        }
    }
    return startIndex;
}
