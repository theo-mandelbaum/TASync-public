import { getRangeIndexes, setCellFormat, applyCellFormat, activeCellChanged, isReadOnly, isReadOnlyCells, workbookReadonlyAlert, mergedRange, setMerge, updateMergeBorder } from '../common/index';
import { getSwapRange, textDecorationUpdate } from '../common/index';
import { clear, getIndexesFromAddress, activeCellMergedRange, deleteHyperlink } from '../common/index';
import { getSheetIndex, isHiddenRow, getSheet, getCell, setCell, updateCFModel, getColumn } from '../index';
import { getRow, updateCell, isHeightCheckNeeded, workbookFormulaOperation } from '../index';
import { applyCF, getColorCode } from '../index';
import { checkColumnValidation, updateHighlight } from '../index';
/**
 * Workbook Cell format.
 */
var WorkbookCellFormat = /** @class */ (function () {
    function WorkbookCellFormat(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    WorkbookCellFormat.prototype.format = function (args) {
        var _this = this;
        var sheet;
        var rng = args.range;
        if (rng && typeof rng === 'string' && rng.indexOf('!') > -1) {
            var lastIndex = rng.lastIndexOf('!');
            rng = rng.substring(lastIndex + 1);
            sheet = this.parent.sheets[getSheetIndex(this.parent, args.range.substring(0, lastIndex))];
        }
        else {
            sheet = this.parent.getActiveSheet();
        }
        if (rng === undefined) {
            rng = sheet.selectedRange;
        }
        var triggerEvt = typeof (rng) !== 'object' && args.onActionUpdate && !args.isUndoRedo;
        var eventArgs = {
            range: rng, style: Object.assign({}, args.style), requestType: 'CellFormat'
        };
        if (args.borderType) {
            eventArgs.borderType = args.borderType;
        }
        var style = {};
        var indexes = typeof (eventArgs.range) === 'object' ? eventArgs.range :
            getSwapRange(getRangeIndexes(eventArgs.range));
        var mergeBorderRows = [];
        var hasReadOnlyCells = isReadOnlyCells(this.parent, indexes);
        if (hasReadOnlyCells) {
            if (args.onActionUpdate) {
                this.parent.notify(workbookReadonlyAlert, null);
            }
            return;
        }
        Object.assign(style, eventArgs.style, null, true);
        if (triggerEvt) {
            this.parent.trigger('beforeCellFormat', eventArgs);
            this.parent.notify('actionBegin', { eventArgs: eventArgs, action: 'format' });
            if (eventArgs.cancel) {
                args.cancel = true;
                return;
            }
        }
        if (args.borderType) {
            this.setTypedBorder(sheet, args.style.border, indexes, args.borderType, args.onActionUpdate, mergeBorderRows);
            delete args.style.border;
            delete eventArgs.style.border;
        }
        var i;
        var j;
        var props = { cell: null, rowIdx: 0, colIdx: 0, eventOnly: true, preventEvt: !triggerEvt };
        var triggerBeforeEvent = function (cellStyle) {
            props.cell = { style: cellStyle };
            props.rowIdx = i;
            props.colIdx = j;
            return updateCell(_this.parent, sheet, props);
        };
        if (eventArgs.style.borderTop !== undefined) {
            for (j = indexes[1]; j <= indexes[3]; j++) {
                i = indexes[0];
                if (!triggerBeforeEvent({ borderTop: eventArgs.style.borderTop })) {
                    if (!args.isUndoRedo) {
                        this.checkAdjacentBorder(sheet, 'borderBottom', i - 1, j);
                        this.checkFullBorder(sheet, 'borderBottom', i - 1, j);
                    }
                    this.checkFullBorder(sheet, 'borderTop', i, j);
                    this.setCellBorder(sheet, props.cell.style, i, j, args.onActionUpdate, j === indexes[3], null, null, args.isUndoRedo, mergeBorderRows);
                }
            }
            delete eventArgs.style.borderTop;
        }
        if (eventArgs.style.borderBottom !== undefined) {
            var firstCell = void 0;
            var lastCell = void 0;
            for (j = indexes[1]; j <= indexes[3]; j++) {
                i = indexes[0];
                firstCell = getCell(i, j, sheet, false, true);
                if (firstCell.rowSpan > 0) {
                    lastCell = getCell(indexes[2], indexes[1], sheet, false, true);
                }
                else {
                    lastCell = getCell(indexes[2], indexes[3], sheet, false, true);
                }
                if (!(firstCell.rowSpan > 1 && lastCell.rowSpan < 0)) {
                    i = indexes[2];
                }
                var mergeArgs = { range: [i, j, i, j] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                i = mergeArgs.range[0];
                if (!triggerBeforeEvent({ borderBottom: eventArgs.style.borderBottom })) {
                    if (!args.isUndoRedo) {
                        this.checkAdjacentBorder(sheet, 'borderTop', indexes[2] + 1, j);
                        this.checkFullBorder(sheet, 'borderTop', indexes[2] + 1, j);
                    }
                    this.checkFullBorder(sheet, 'borderBottom', indexes[2], j);
                    this.setCellBorder(sheet, props.cell.style, i, j, args.onActionUpdate, j === indexes[3], null, null, args.isUndoRedo);
                    this.setBottomBorderPriority(sheet, indexes[2], j);
                }
            }
            delete eventArgs.style.borderBottom;
        }
        if (eventArgs.style.borderLeft !== undefined) {
            for (var i_1 = indexes[0]; i_1 <= indexes[2]; i_1++) {
                j = indexes[1];
                if (!triggerBeforeEvent({ borderLeft: eventArgs.style.borderLeft })) {
                    if (!args.isUndoRedo) {
                        this.checkAdjacentBorder(sheet, 'borderRight', i_1, j - 1);
                        this.checkFullBorder(sheet, 'borderRight', i_1, j - 1);
                    }
                    this.checkFullBorder(sheet, 'borderLeft', i_1, j);
                    this.setCellBorder(sheet, props.cell.style, i_1, j, args.onActionUpdate, null, null, null, args.isUndoRedo);
                }
            }
            delete eventArgs.style.borderLeft;
        }
        if (eventArgs.style.borderRight !== undefined) {
            for (var i_2 = indexes[0]; i_2 <= indexes[2]; i_2++) {
                j = indexes[3];
                var mergeArgs = { range: [i_2, j, i_2, j] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                j = mergeArgs.range[1];
                if (!triggerBeforeEvent({ borderRight: eventArgs.style.borderRight })) {
                    if (!args.isUndoRedo) {
                        this.checkAdjacentBorder(sheet, 'borderLeft', i_2, j + 1);
                        this.checkFullBorder(sheet, 'borderLeft', i_2, j + 1);
                    }
                    this.checkFullBorder(sheet, 'borderRight', i_2, j);
                    this.setCellBorder(sheet, props.cell.style, i_2, j, args.onActionUpdate, null, null, null, args.isUndoRedo);
                }
            }
            delete eventArgs.style.borderRight;
        }
        var border;
        var isFullBorder;
        var styleKeys = Object.keys(eventArgs.style);
        if (styleKeys.length) {
            var cell = void 0;
            var validation = void 0;
            var col = void 0;
            var parent_1 = this.parent;
            var activeSheet = parent_1.viewport && this.parent.getActiveSheet().id === sheet.id;
            var frozenRow = this.parent.frozenRowCount(sheet);
            var frozenCol = this.parent.frozenColCount(sheet);
            var viewport = [frozenRow + parent_1.viewport.topIndex, frozenCol + parent_1.viewport.leftIndex,
                parent_1.viewport.bottomIndex, parent_1.viewport.rightIndex];
            var uiRefresh = void 0;
            var row = void 0;
            var checkHeight = void 0;
            var formatColor = void 0;
            var isFontColorApplied = styleKeys.indexOf('color') > -1;
            var isColorApplied = isFontColorApplied || styleKeys.indexOf('backgroundColor') > -1;
            for (i = indexes[0]; i <= indexes[2]; i++) {
                row = getRow(sheet, i) || {};
                if (row.isFiltered) {
                    continue;
                }
                uiRefresh = (i >= viewport[0] && i <= viewport[2]) || i < frozenRow;
                checkHeight = false;
                for (j = indexes[1]; j <= indexes[3]; j++) {
                    if (triggerBeforeEvent(eventArgs.style)) {
                        continue;
                    }
                    if (isFullBorder === undefined) {
                        if (eventArgs.style.border !== undefined) {
                            border = eventArgs.style.border;
                            delete eventArgs.style.border;
                            isFullBorder = true;
                        }
                        else {
                            isFullBorder = false;
                        }
                    }
                    cell = getCell(i, j, sheet, false, true);
                    col = sheet.columns[j];
                    if (cell.rowSpan > 1 || cell.colSpan > 1) {
                        for (var k = i, rowSpanLen = cell.rowSpan > 1 ? i + (cell.rowSpan - 1) : i; k <= rowSpanLen; k++) {
                            for (var l = j, colSpanLen = cell.colSpan > 1 ? j + (cell.colSpan - 1) : j; l <= colSpanLen; l++) {
                                if (isFullBorder) {
                                    this.setFullBorder(sheet, border, indexes, k, l, args.onActionUpdate, true);
                                }
                                this.setCellStyle(sheet, k, l, eventArgs.style);
                            }
                        }
                    }
                    if (isFullBorder) {
                        this.setFullBorder(sheet, border, indexes, i, j, args.onActionUpdate, undefined, mergeBorderRows);
                    }
                    this.setCellStyle(sheet, i, j, eventArgs.style);
                    if (!activeSheet) {
                        continue;
                    }
                    if (uiRefresh && ((j >= viewport[1] && j <= viewport[3]) || j < frozenCol)) {
                        formatColor = null;
                        if (isFontColorApplied && cell.format && cell.format.includes('[')) {
                            var colorCode = getColorCode(cell.format);
                            if (colorCode) {
                                formatColor = colorCode.toLowerCase();
                            }
                        }
                        this.parent.notify(applyCellFormat, { style: eventArgs.style, rowIdx: i, colIdx: j,
                            lastCell: j === indexes[3], isHeightCheckNeeded: true, manualUpdate: true, onActionUpdate: args.onActionUpdate,
                            formatColor: formatColor });
                        if (isColorApplied) {
                            validation = cell.validation || (checkColumnValidation(col, i, j) && col.validation);
                            if (validation && validation.isHighlighted) {
                                this.parent.notify(updateHighlight, {
                                    rowIdx: i, colIdx: j, cell: cell, validation: validation, col: cell.validation && col
                                });
                            }
                        }
                    }
                    else if (!row.customHeight) {
                        checkHeight = checkHeight || isHeightCheckNeeded(eventArgs.style, args.onActionUpdate);
                        if (checkHeight) {
                            this.parent.notify(applyCellFormat, { rowIdx: i, colIdx: j, lastCell: j === indexes[3], checkHeight: true,
                                outsideViewport: !uiRefresh, onActionUpdate: args.onActionUpdate });
                        }
                    }
                }
            }
        }
        if (isFullBorder) {
            eventArgs.style.border = border;
        }
        updateMergeBorder(this.parent, mergeBorderRows, [indexes[1], indexes[3]]);
        this.parent.setUsedRange(indexes[2], indexes[3]);
        if (args.refreshRibbon) {
            this.parent.notify(activeCellChanged, null);
        }
        if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
            this.parent.notify(applyCF, { indexes: indexes });
        }
        if (triggerEvt) {
            eventArgs.style = style;
            eventArgs.range = sheet.name + "!" + rng;
            this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'format' });
        }
    };
    WorkbookCellFormat.prototype.setBottomBorderPriority = function (sheet, rowIdx, colIdx) {
        if (isHiddenRow(sheet, rowIdx + 1)) {
            var pIdx = this.skipHiddenRows(sheet, rowIdx + 1);
            var pCellStyle = this.parent.getCellStyleValue(['borderTop'], [pIdx, colIdx]).borderTop;
            if (pCellStyle !== '') {
                sheet.rows[rowIdx].cells[colIdx].style.bottomPriority = true;
            }
        }
    };
    WorkbookCellFormat.prototype.setFullBorder = function (sheet, border, indexes, i, j, actionUpdate, modelUpdate, mergeBorderRows) {
        var style = {};
        if (i === indexes[0]) {
            this.checkAdjacentBorder(sheet, 'borderBottom', i - 1, j);
            this.checkFullBorder(sheet, 'borderBottom', i - 1, j);
        }
        if (j === indexes[1]) {
            this.checkAdjacentBorder(sheet, 'borderRight', i, j - 1);
            this.checkFullBorder(sheet, 'borderRight', i, j - 1);
        }
        if (j === indexes[3]) {
            this.checkAdjacentBorder(sheet, 'borderLeft', i, j + 1);
            this.checkFullBorder(sheet, 'borderLeft', i, j + 1);
        }
        else {
            this.checkAdjacentBorder(sheet, 'border', i, j + 1);
        }
        style.borderRight = border;
        style.borderTop = border;
        style.borderLeft = border;
        style.borderBottom = border;
        this.setCellBorder(sheet, style, i, j, actionUpdate, j === indexes[3], null, modelUpdate, undefined, mergeBorderRows);
        if (i === indexes[2]) {
            this.checkAdjacentBorder(sheet, 'borderTop', i + 1, j);
            this.checkFullBorder(sheet, 'borderTop', i + 1, j);
            this.setBottomBorderPriority(sheet, i, j);
        }
        else {
            this.checkAdjacentBorder(sheet, 'border', i + 1, j);
        }
    };
    WorkbookCellFormat.prototype.checkAdjacentBorder = function (sheet, prop, rowIdx, colIdx) {
        var style = {};
        if (this.parent.getCellStyleValue([prop], [rowIdx, colIdx])["" + prop] !== '') {
            style["" + prop] = undefined;
            this.setCellStyle(sheet, rowIdx, colIdx, style);
        }
    };
    WorkbookCellFormat.prototype.checkFullBorder = function (sheet, prop, rowIdx, colIdx) {
        var border = this.parent.getCellStyleValue(['border'], [rowIdx, colIdx]).border;
        if (border !== '') {
            var style_1 = { border: undefined };
            ['borderBottom', 'borderTop', 'borderLeft', 'borderRight'].forEach(function (value) {
                if (value !== prop) {
                    style_1["" + value] = border;
                }
            });
            this.setCellStyle(sheet, rowIdx, colIdx, style_1);
        }
    };
    WorkbookCellFormat.prototype.textDecorationActionUpdate = function (args) {
        var sheet = this.parent.getActiveSheet();
        var eventArgs = { range: sheet.selectedRange, style: args.style, requestType: 'CellFormat' };
        var indexes = getSwapRange(getRangeIndexes(sheet.selectedRange));
        var hasReadOnlyCells = isReadOnlyCells(this.parent, indexes);
        if (hasReadOnlyCells) {
            this.parent.notify(workbookReadonlyAlert, null);
            return;
        }
        this.parent.trigger('beforeCellFormat', eventArgs);
        this.parent.notify('actionBegin', { eventArgs: eventArgs, action: 'format' });
        if (eventArgs.cancel) {
            args.cancel = true;
            return;
        }
        var value = args.style.textDecoration.toLowerCase();
        var changedValue = value;
        var activeCellIndexes = getRangeIndexes(sheet.activeCell);
        var cellValue = this.parent.getCellStyleValue(['textDecoration'], activeCellIndexes).textDecoration.toLowerCase();
        var removeProp = false;
        if (cellValue === 'underline') {
            changedValue = value === 'underline' ? 'none' : 'underline line-through';
        }
        else if (cellValue === 'line-through') {
            changedValue = value === 'line-through' ? 'none' : 'underline line-through';
        }
        else if (cellValue === 'underline line-through') {
            changedValue = value === 'underline' ? 'line-through' : 'underline';
            removeProp = true;
        }
        if (changedValue === 'none') {
            removeProp = true;
        }
        var changedStyle = { textDecoration: changedValue };
        this.format({ style: changedStyle, range: activeCellIndexes, refreshRibbon: args.refreshRibbon, onActionUpdate: true });
        for (var i = indexes[0]; i <= indexes[2]; i++) {
            for (var j = indexes[1]; j <= indexes[3]; j++) {
                if (i === activeCellIndexes[0] && j === activeCellIndexes[1]) {
                    continue;
                }
                changedStyle = {};
                cellValue = this.parent.getCellStyleValue(['textDecoration'], [i, j]).textDecoration.toLowerCase();
                if (cellValue === 'none') {
                    if (removeProp) {
                        continue;
                    }
                    changedStyle.textDecoration = value;
                }
                else if (cellValue === 'underline' || cellValue === 'line-through') {
                    if (removeProp) {
                        if (value === cellValue) {
                            changedStyle.textDecoration = 'none';
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        changedStyle.textDecoration = value !== cellValue ? 'underline line-through' : value;
                    }
                }
                else if (cellValue === 'underline line-through') {
                    if (removeProp) {
                        changedStyle.textDecoration = value === 'underline' ? 'line-through' : 'underline';
                    }
                    else {
                        continue;
                    }
                }
                this.format({ style: changedStyle, range: [i, j, i, j], refreshRibbon: args.refreshRibbon, onActionUpdate: true });
            }
        }
        eventArgs.range = sheet.name + '!' + eventArgs.range;
        eventArgs.style.textDecoration = changedValue;
        this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'format' });
    };
    WorkbookCellFormat.prototype.setTypedBorder = function (sheet, border, range, type, actionUpdate, mergeBorderRows) {
        var prevBorder;
        if (type === 'Outer') {
            for (var colIdx = range[1]; colIdx <= range[3]; colIdx++) {
                this.checkAdjacentBorder(sheet, 'borderBottom', range[0] - 1, colIdx);
                this.checkFullBorder(sheet, 'borderBottom', range[0] - 1, colIdx);
                this.setCellBorder(sheet, { borderTop: border }, range[0], colIdx, actionUpdate, colIdx === range[3], undefined, undefined, undefined, mergeBorderRows);
                this.checkAdjacentBorder(sheet, 'borderTop', range[2] + 1, colIdx);
                this.checkFullBorder(sheet, 'borderTop', range[2] + 1, colIdx);
                this.setCellBorder(sheet, { borderBottom: border }, range[2], colIdx, actionUpdate, colIdx === range[3], type);
                this.setBottomBorderPriority(sheet, range[2], colIdx);
            }
            for (var rowIdx = range[0]; rowIdx <= range[2]; rowIdx++) {
                this.checkAdjacentBorder(sheet, 'borderRight', rowIdx, range[1] - 1);
                this.checkFullBorder(sheet, 'borderRight', rowIdx, range[1] - 1);
                this.setCellBorder(sheet, { borderLeft: border }, rowIdx, range[1], actionUpdate);
                this.checkAdjacentBorder(sheet, 'borderLeft', rowIdx, range[3] + 1);
                this.checkFullBorder(sheet, 'borderLeft', rowIdx, range[3] + 1);
                this.setCellBorder(sheet, { borderRight: border }, rowIdx, range[3], actionUpdate, null, type);
            }
        }
        else if (type === 'Inner') {
            var mergeArgs = { range: [range[0], range[1], range[0], range[1]] };
            this.parent.notify(mergedRange, mergeArgs);
            if (mergeArgs.range[0] === range[0] && mergeArgs.range[1] === range[1] &&
                mergeArgs.range[2] === range[2] && mergeArgs.range[3] === range[3]) {
                return;
            }
            for (var i = range[0]; i <= range[2]; i++) {
                for (var j = range[1]; j <= range[3]; j++) {
                    var style = {};
                    prevBorder = this.parent.getCellStyleValue(['border'], [i, j]).border;
                    if (prevBorder !== '') {
                        style.border = undefined;
                        if (j === range[3] || j === range[1] || i === range[0] || i === range[2]) {
                            if (i === range[0]) {
                                style.borderTop = prevBorder;
                            }
                            if (i === range[2]) {
                                style.borderBottom = prevBorder;
                            }
                            if (j === range[3]) {
                                style.borderRight = prevBorder;
                            }
                            if (j === range[1]) {
                                style.borderLeft = prevBorder;
                            }
                        }
                    }
                    if (j !== range[3]) {
                        style.borderRight = border;
                    }
                    if (i !== range[0]) {
                        style.borderTop = border;
                    }
                    if (i !== range[2]) {
                        style.borderBottom = border;
                    }
                    if (j !== range[1]) {
                        style.borderLeft = border;
                    }
                    this.setCellBorder(sheet, style, i, j, actionUpdate, j === range[3], undefined, undefined, undefined, mergeBorderRows);
                }
            }
        }
        else if (type === 'Vertical') {
            for (var i = range[0]; i <= range[2]; i++) {
                for (var j = range[1]; j <= range[3]; j++) {
                    var style = { borderRight: border, borderLeft: border };
                    if (j === range[1]) {
                        this.checkAdjacentBorder(sheet, 'borderRight', i, j - 1);
                        this.checkFullBorder(sheet, 'borderRight', i, j - 1);
                    }
                    if (j === range[3]) {
                        this.checkAdjacentBorder(sheet, 'borderLeft', i, j + 1);
                        this.checkFullBorder(sheet, 'borderLeft', i, j + 1);
                    }
                    this.setCellBorder(sheet, style, i, j, actionUpdate);
                }
            }
        }
        else {
            for (var i = range[0]; i <= range[2]; i++) {
                for (var j = range[1]; j <= range[3]; j++) {
                    var style = { borderTop: border, borderBottom: border };
                    if (i === range[0]) {
                        this.checkAdjacentBorder(sheet, 'borderBottom', i - 1, j);
                        this.checkFullBorder(sheet, 'borderBottom', i - 1, j);
                    }
                    this.setCellBorder(sheet, style, i, j, actionUpdate, j === range[3]);
                    if (i === range[2]) {
                        this.checkAdjacentBorder(sheet, 'borderTop', i + 1, j);
                        this.checkFullBorder(sheet, 'borderTop', i + 1, j);
                        this.setBottomBorderPriority(sheet, i, j);
                    }
                }
            }
        }
    };
    WorkbookCellFormat.prototype.setCellBorder = function (sheet, style, rowIdx, colIdx, actionUpdate, lastCell, type, modelUpdate, isUndoRedo, mergeBorderRows) {
        var cell = getCell(rowIdx, colIdx, sheet);
        var column = getColumn(sheet, colIdx);
        var row = getRow(sheet, rowIdx);
        if ((cell && cell.isReadOnly) || (column && column.isReadOnly) || (row && row.isReadOnly)) {
            return;
        }
        this.setCellStyle(sheet, rowIdx, colIdx, style);
        if (!modelUpdate && this.parent.getActiveSheet().id === sheet.id) {
            if (type === 'Outer' && (style.borderBottom || style.borderRight)) {
                var mergeArgs = { range: [rowIdx, colIdx, rowIdx, colIdx] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                rowIdx = mergeArgs.range[0];
                colIdx = mergeArgs.range[1];
            }
            if (isUndoRedo) {
                if (style.borderTop === '' && this.parent.getCellStyleValue(['borderBottom'], [rowIdx - 1, colIdx]).borderBottom !== '') {
                    style.borderTop = this.parent.getCellStyleValue(['borderBottom'], [rowIdx - 1, colIdx]).borderBottom;
                }
                if (style.borderLeft === '' && this.parent.getCellStyleValue(['borderRight'], [rowIdx, colIdx - 1]).borderRight !== '') {
                    style.borderLeft = this.parent.getCellStyleValue(['borderRight'], [rowIdx, colIdx - 1]).borderRight;
                }
                if (style.borderRight === '' && this.parent.getCellStyleValue(['borderLeft'], [rowIdx, colIdx + 1]).borderLeft !== '') {
                    style.borderRight = this.parent.getCellStyleValue(['borderLeft'], [rowIdx, colIdx + 1]).borderLeft;
                }
            }
            this.parent.notify(applyCellFormat, {
                style: style, rowIdx: rowIdx, colIdx: colIdx, onActionUpdate: actionUpdate, first: '', lastCell: lastCell,
                isHeightCheckNeeded: true, manualUpdate: true, mergeBorderRows: mergeBorderRows
            });
        }
    };
    WorkbookCellFormat.prototype.setCellStyle = function (sheet, rowIdx, colIdx, style) {
        if (!sheet.rows[rowIdx]) {
            sheet.rows[rowIdx] = { cells: [] };
        }
        else if (!sheet.rows[rowIdx].cells) {
            sheet.rows[rowIdx].cells = [];
        }
        if (!sheet.rows[rowIdx].cells[colIdx]) {
            sheet.rows[rowIdx].cells[colIdx] = {};
        }
        if (!sheet.rows[rowIdx].cells[colIdx].style) {
            sheet.rows[rowIdx].cells[colIdx].style = {};
        }
        Object.assign(sheet.rows[rowIdx].cells[colIdx].style, style, null, true);
    };
    WorkbookCellFormat.prototype.skipHiddenRows = function (sheet, startIdx) {
        startIdx++;
        if (isHiddenRow(sheet, startIdx)) {
            startIdx = this.skipHiddenRows(sheet, startIdx);
        }
        return startIdx;
    };
    WorkbookCellFormat.prototype.addEventListener = function () {
        this.parent.on(setCellFormat, this.format, this);
        this.parent.on(textDecorationUpdate, this.textDecorationActionUpdate, this);
        this.parent.on(clear, this.clearCellObj, this);
    };
    WorkbookCellFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(setCellFormat, this.format);
            this.parent.off(textDecorationUpdate, this.textDecorationActionUpdate);
            this.parent.off(clear, this.clearCellObj);
        }
    };
    WorkbookCellFormat.prototype.clearCellObj = function (options) {
        var lastIndex = options.range ? options.range.lastIndexOf('!') : 0;
        var clrRange = options.range ? (lastIndex > 0) ? options.range.substring(lastIndex + 1) : options.range
            : this.parent.getActiveSheet().selectedRange;
        var sheetIdx = (options.range && lastIndex > 0) ?
            getSheetIndex(this.parent, options.range.substring(0, lastIndex)) : this.parent.activeSheetIndex;
        var sheet = getSheet(this.parent, sheetIdx);
        var range = getSwapRange(getIndexesFromAddress(clrRange));
        var sRowIdx = range[0];
        var eRowIdx = range[2];
        var cf = sheet.conditionalFormats && sheet.conditionalFormats.length &&
            [].slice.call(sheet.conditionalFormats);
        var cfRule = [];
        var cfRefreshAll;
        var evtArgs;
        var sColIdx;
        var eColIdx;
        var isValExist;
        for (sRowIdx; sRowIdx <= eRowIdx; sRowIdx++) {
            sColIdx = range[1];
            eColIdx = range[3];
            for (sColIdx; sColIdx <= eColIdx; sColIdx++) {
                var cell = getCell(sRowIdx, sColIdx, sheet);
                var isReadonlyCell = isReadOnly(cell, getColumn(sheet, sColIdx), getRow(sheet, sRowIdx));
                if (cell && (options.type === 'Clear All' || options.type === 'Clear Formats')) {
                    if (cell.rowSpan > 1 || cell.colSpan > 1) {
                        var mergeArgs = { range: [sRowIdx, sColIdx, sRowIdx, sColIdx] };
                        this.parent.notify(mergedRange, mergeArgs);
                        var mergedRanges = mergeArgs.range;
                        if (range[0] <= mergedRanges[0] && range[1] <= mergedRanges[1] && range[2] >= mergedRanges[2] &&
                            range[3] >= mergedRanges[3]) {
                            this.parent.notify(setMerge, { merge: false, range: mergedRanges, type: 'All', sheetIndex: sheetIdx,
                                preventRefresh: sheetIdx !== this.parent.activeSheetIndex });
                        }
                    }
                    if (!!cell.rowSpan && cell.rowSpan !== 1 || !!cell.colSpan && cell.colSpan !== 1) {
                        continue;
                    }
                }
                if (cell && !isReadonlyCell) {
                    switch (options.type) {
                        case 'Clear Formats':
                            delete cell.format;
                            delete cell.rowSpan;
                            delete cell.style;
                            delete cell.wrap;
                            delete cell.colSpan;
                            delete cell.formattedText;
                            if (cell.hyperlink) {
                                cell.style = { textDecoration: 'none', color: 'inherit' };
                            }
                            break;
                        case 'Clear Contents':
                            if (cell.hyperlink) {
                                this.parent.notify(deleteHyperlink, { sheet: sheet, rowIdx: sRowIdx, colIdx: sColIdx, preventRefresh: true });
                                cell.style = { textDecoration: 'underline', color: '#00e' };
                            }
                            isValExist = !!(cell.value || cell.formula);
                            delete cell.value;
                            delete cell.formula;
                            delete cell.formattedText;
                            if (isValExist) {
                                evtArgs = { action: 'refreshCalculate', rowIndex: sRowIdx, colIndex: sColIdx, sheetIndex: sheetIdx };
                                this.parent.notify(workbookFormulaOperation, evtArgs);
                                if (cf && !cfRefreshAll) {
                                    cfRefreshAll = evtArgs.isFormulaDependent;
                                    if (!cfRefreshAll) {
                                        updateCFModel(cf, cfRule, sRowIdx, sColIdx);
                                    }
                                }
                            }
                            break;
                        case 'Clear Hyperlinks':
                            delete cell.hyperlink;
                            break;
                        case 'Clear All':
                            isValExist = !!(cell.value || cell.formula);
                            setCell(sRowIdx, sColIdx, sheet, {}, false);
                            if (isValExist) {
                                evtArgs = { action: 'refreshCalculate', rowIndex: sRowIdx, colIndex: sColIdx, sheetIndex: sheetIdx };
                                this.parent.notify(workbookFormulaOperation, evtArgs);
                                if (cf && !cfRefreshAll) {
                                    cfRefreshAll = evtArgs.isFormulaDependent;
                                }
                            }
                            break;
                    }
                }
            }
        }
        if ((cfRule.length || cfRefreshAll) && sheetIdx === this.parent.activeSheetIndex) {
            this.parent.notify(applyCF, { cfModel: !cfRefreshAll && cfRule, refreshAll: cfRefreshAll, isAction: true });
        }
    };
    /**
     * To destroy workbook cell format.
     *
     * @returns {void} - To destroy workbook cell format.
     */
    WorkbookCellFormat.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the workbook cell format module name.
     *
     *  @returns {void}
     */
    WorkbookCellFormat.prototype.getModuleName = function () {
        return 'workbookcellformat';
    };
    return WorkbookCellFormat;
}());
export { WorkbookCellFormat };
