import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { spreadsheetDestroyed, beforeContentLoaded, beforeVirtualContentLoaded, virtualContentLoaded, removeAllChildren } from '../common/index';
import { colWidthChanged, updateTableWidth, focus, updateTranslate } from '../common/index';
import { onVerticalScroll, onHorizontalScroll, rowHeightChanged, deInitProperties } from '../common/index';
import { getRowsHeight, getColumnsWidth, getRangeIndexes, skipHiddenIdx, isHiddenCol } from './../../workbook/index';
import { getCellIndexes, getRangeAddress, updateRowColCount, sheetCreated, sheetsDestroyed } from '../../workbook/common/index';
/**
 * VirtualScroll module
 *
 * @hidden
 */
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(parent) {
        this.scroll = [];
        this.parent = parent;
        this.addEventListener();
    }
    VirtualScroll.prototype.createVirtualElement = function (args) {
        var sheet = this.parent.getActiveSheet();
        var container = this.parent.getMainContent();
        this.content = this.parent.createElement('div', { className: 'e-virtualable' });
        this.content.appendChild(container.querySelector('.e-table'));
        container.appendChild(this.content);
        var vTrack = container.appendChild(this.parent.createElement('div', { className: 'e-virtualtrack' }));
        var height = 0;
        var width;
        if (this.parent.sheets.length > this.scroll.length) {
            this.initScroll();
        }
        var endIndex = this.parent.viewport.bottomIndex;
        if (sheet.rowCount > endIndex + 1 || sheet.usedRange.rowIndex > endIndex) {
            if (!this.parent.scrollSettings.isFinite && sheet.rowCount <= sheet.usedRange.rowIndex) {
                this.parent.setSheetPropertyOnMute(sheet, 'rowCount', sheet.usedRange.rowIndex + 1);
            }
            this.setScrollCount(sheet.rowCount, 'row');
        }
        else {
            if (!this.parent.scrollSettings.isFinite) {
                this.parent.setSheetPropertyOnMute(sheet, 'rowCount', endIndex + 1);
            }
            this.scroll[this.parent.activeSheetIndex].rowCount = sheet.rowCount;
        }
        var startIndex = this.parent.frozenRowCount(sheet);
        var indexes = getCellIndexes(sheet.topLeftCell);
        if (args.top) {
            height = args.top;
            if (sheet.frozenRows) {
                height += getRowsHeight(sheet, indexes[0], startIndex - 1, true);
            }
            startIndex = getCellIndexes(sheet.paneTopLeftCell)[0];
        }
        height += getRowsHeight(sheet, startIndex, this.scroll[this.parent.activeSheetIndex].rowCount - 1, true);
        endIndex = this.parent.viewport.rightIndex;
        var size = 0;
        var frozenCol = this.parent.frozenColCount(sheet);
        if (args.left) {
            size = args.left;
            if (frozenCol) {
                size += getColumnsWidth(sheet, indexes[1], frozenCol - 1, true);
            }
            startIndex = getCellIndexes(sheet.paneTopLeftCell)[1];
        }
        else {
            startIndex = frozenCol;
        }
        if (sheet.colCount > endIndex + 1 || sheet.usedRange.colIndex > endIndex) {
            if (!this.parent.scrollSettings.isFinite && sheet.colCount <= sheet.usedRange.colIndex) {
                this.parent.setSheetPropertyOnMute(sheet, 'colCount', sheet.usedRange.colIndex + 1);
            }
            size += getColumnsWidth(sheet, startIndex, endIndex, true);
            this.setScrollCount(sheet.colCount, 'col');
            width = size + getColumnsWidth(sheet, endIndex + 1, this.scroll[this.parent.activeSheetIndex].colCount - 1, true);
        }
        else {
            if (!this.parent.scrollSettings.isFinite) {
                this.parent.setSheetPropertyOnMute(sheet, 'colCount', endIndex + 1);
            }
            size += getColumnsWidth(sheet, startIndex, sheet.colCount - 1, true);
            this.scroll[this.parent.activeSheetIndex].colCount = sheet.colCount;
            width = size;
        }
        if (isNullOrUndefined(this.parent.viewport.leftIndex)) {
            this.parent.viewport.leftIndex = 0;
        }
        if (isNullOrUndefined(this.parent.viewport.topIndex)) {
            this.parent.viewport.topIndex = 0;
        }
        if (args.left) {
            size = getColumnsWidth(sheet, this.parent.viewport.leftIndex + frozenCol, endIndex, true);
        }
        if (isNullOrUndefined(this.translateX)) {
            this.translateX = 0;
        }
        if (isNullOrUndefined(this.translateY)) {
            this.translateY = 0;
        }
        container = this.parent.getRowHeaderContent();
        this.rowHeader = this.content.cloneNode();
        this.rowHeader.appendChild(container.querySelector('.e-table'));
        container.appendChild(this.rowHeader);
        var rowVTrack = container.appendChild(vTrack.cloneNode());
        this.rowHeader.style.transform = "translate(0px, " + this.translateY + "px)";
        container = this.parent.getColumnHeaderContent();
        this.colHeader = this.content.cloneNode();
        this.colHeader.appendChild(container.querySelector('.e-table'));
        container.appendChild(this.colHeader);
        var colVTrack = container.appendChild(vTrack.cloneNode());
        this.colHeader.style.width = size + "px";
        rowVTrack.style.height = height + "px";
        colVTrack.style.width = width + "px";
        this.colHeader.style.transform = "translate(" + this.translateX + "px, 0px)";
        this.content.style.transform = "translate(" + this.translateX + "px, " + this.translateY + "px)";
        this.content.style.width = size + "px";
        vTrack.style.height = height + "px";
        vTrack.style.width = width + "px";
        if (this.parent.allowScrolling) {
            var scrollVTrack = colVTrack.cloneNode(true);
            scrollVTrack.style.width = width + (this.parent.scrollSettings.isFinite ? this.parent.sheetModule.getScrollSize() : 0) + "px";
            this.parent.getScrollElement().appendChild(scrollVTrack);
        }
    };
    VirtualScroll.prototype.initScroll = function () {
        var i = 0;
        while (i < this.parent.sheets.length) {
            if (!this.scroll[i]) {
                this.scroll.push({ rowCount: 0, colCount: 0 });
            }
            i++;
        }
    };
    VirtualScroll.prototype.setScrollCount = function (count, layout) {
        var activeSheetIdx = this.parent.activeSheetIndex;
        if (!this.scroll[activeSheetIdx][layout + 'Count'] || this.scroll[activeSheetIdx][layout + 'Count'] !== count) {
            this.scroll[activeSheetIdx][layout + 'Count'] = count;
        }
    };
    VirtualScroll.prototype.getRowAddress = function (indexes) {
        var sheet = this.parent.getActiveSheet();
        return getRangeAddress([indexes[0], sheet.frozenColumns ? getCellIndexes(sheet.topLeftCell)[1] : this.parent.viewport.leftIndex,
            indexes[1], this.parent.viewport.rightIndex]);
    };
    VirtualScroll.prototype.getColAddress = function (indexes) {
        var sheet = this.parent.getActiveSheet();
        return getRangeAddress([sheet.frozenRows ? getCellIndexes(sheet.topLeftCell)[0] : this.parent.viewport.topIndex, indexes[0],
            this.parent.viewport.bottomIndex, indexes[1]]);
    };
    VirtualScroll.prototype.updateScrollCount = function (idx, layout, threshold) {
        if (threshold === void 0) { threshold = idx; }
        var sheet = this.parent.getActiveSheet();
        var rowCount = idx + this.parent.viewport[layout + 'Count'] + 1 + threshold;
        var usedRangeCount = this.scroll[this.parent.activeSheetIndex][layout + 'Count'];
        if (rowCount < usedRangeCount) {
            if (sheet[layout + 'Count'] === usedRangeCount) {
                return;
            }
            rowCount = usedRangeCount;
        }
        if (!this.parent.scrollSettings.isFinite) {
            this.parent.setSheetPropertyOnMute(sheet, layout + 'Count', rowCount);
        }
    };
    VirtualScroll.prototype.onVerticalScroll = function (args) {
        var idx = args.cur.idx;
        var height = args.cur.size;
        var prevIdx = args.prev.idx;
        var idxDiff = Math.abs(idx - prevIdx);
        var threshold = this.parent.getThreshold('row');
        if (idxDiff > Math.round(threshold / 2)) {
            var startIdx = void 0;
            var lastIdx = void 0;
            var prevTopIdx = void 0;
            var sheet = this.parent.getActiveSheet();
            if (idx <= threshold) {
                if (!args.increase) {
                    if (this.translateY && prevIdx > threshold) {
                        this.translateY = 0;
                        var frozenCol = this.parent.frozenColCount(sheet);
                        var frozenRow = this.parent.frozenRowCount(sheet);
                        if (!args.preventScroll) {
                            var colIndex = frozenCol ? getCellIndexes(sheet.topLeftCell)[1] : this.parent.viewport.leftIndex;
                            var fIndexes = frozenCol ? [frozenRow, this.parent.viewport.leftIndex + frozenCol] : [];
                            if (idxDiff < this.parent.viewport.rowCount + threshold) {
                                startIdx = skipHiddenIdx(sheet, frozenRow, true);
                                lastIdx = skipHiddenIdx(sheet, (this.parent.viewport.topIndex + frozenRow) - 1, false);
                                this.parent.viewport.topIndex = startIdx - frozenRow;
                                var btmIdx = this.skipHiddenLastIdx(this.parent.viewport.bottomIndex - (((lastIdx - startIdx) + 1) - this.hiddenCount(startIdx, lastIdx)), this.parent.viewport.bottomIndex);
                                this.parent.viewport.bottomIndex = skipHiddenIdx(sheet, btmIdx, false);
                                this.parent.renderModule.refreshUI({
                                    colIndex: colIndex, rowIndex: startIdx, direction: 'last', refresh: 'RowPart',
                                    skipUpdateOnFirst: true, frozenIndexes: fIndexes
                                }, this.getRowAddress([startIdx, skipHiddenIdx(sheet, lastIdx, false)]));
                            }
                            else {
                                var prevColIndex = this.parent.viewport.leftIndex;
                                this.parent.renderModule.refreshUI({ rowIndex: 0, colIndex: colIndex, refresh: 'Row', skipUpdateOnFirst: true,
                                    frozenIndexes: fIndexes, skipTranslate: true });
                                if (frozenCol) {
                                    this.parent.viewport.leftIndex = prevColIndex;
                                }
                                this.translate({ refresh: 'Row' });
                            }
                            focus(this.parent.element);
                            idx = 0;
                        }
                        else {
                            this.parent.viewport.topIndex = prevIdx - (threshold - frozenRow);
                        }
                    }
                    this.updateScrollCount(threshold, 'row');
                }
            }
            if (prevIdx < threshold) {
                idxDiff = Math.abs(idx - threshold);
            }
            if (!args.increase && this.parent.scrollSettings.isFinite && this.parent.viewport.bottomIndex ===
                skipHiddenIdx(sheet, sheet.rowCount - 1, false)) {
                var frozenRow = this.parent.frozenRowCount(sheet);
                var thresholdIdx = this.parent.viewport.topIndex + frozenRow + getRangeIndexes(sheet.paneTopLeftCell)[0] - 1;
                if (idx + frozenRow > thresholdIdx) {
                    args.prev.idx = idx;
                    return;
                }
                idxDiff = thresholdIdx - (idx + frozenRow);
            }
            if (idx > threshold) {
                prevTopIdx = this.parent.viewport.topIndex;
                this.parent.viewport.topIndex = idx - threshold;
                if (args.increase && prevTopIdx > this.parent.viewport.topIndex) {
                    this.parent.viewport.topIndex = prevTopIdx;
                    return;
                }
                var frozenRow = this.parent.frozenRowCount(sheet);
                if (!args.preventScroll) {
                    var frozenCol = this.parent.frozenColCount(sheet);
                    var colIndex = void 0;
                    var frozenIndexes = [];
                    if (frozenCol) {
                        colIndex = getCellIndexes(sheet.topLeftCell)[1];
                        frozenIndexes.push(frozenRow);
                        frozenIndexes.push(this.parent.viewport.leftIndex + frozenCol);
                    }
                    else {
                        colIndex = this.parent.viewport.leftIndex;
                    }
                    if (idxDiff < this.parent.viewport.rowCount + threshold) {
                        if (args.increase) {
                            startIdx = this.parent.viewport.bottomIndex + 1;
                            lastIdx = this.parent.viewport.bottomIndex + (this.parent.viewport.topIndex - prevTopIdx);
                            lastIdx -= this.hiddenCount(prevTopIdx + frozenRow, this.parent.viewport.topIndex - 1 + frozenRow);
                            if (lastIdx <= this.parent.viewport.bottomIndex || (this.parent.scrollSettings.isFinite &&
                                startIdx > skipHiddenIdx(sheet, sheet.rowCount - 1, false, 'rows'))) {
                                this.parent.viewport.topIndex = prevTopIdx;
                                return;
                            }
                            var indexes = this.parent.skipHidden(startIdx, lastIdx, 'rows', false);
                            var finiteProps = this.checkLastIdx(indexes[1], 'row');
                            startIdx = indexes[0];
                            lastIdx = finiteProps.index;
                            var topIdx = this.parent.viewport.topIndex + frozenRow;
                            if (finiteProps.diff) {
                                var diffCount = ((lastIdx - startIdx) + 1) - this.hiddenCount(startIdx, lastIdx);
                                topIdx = skipHiddenIdx(sheet, prevTopIdx, true, 'rows', diffCount) + frozenRow;
                            }
                            this.parent.viewport.topIndex = skipHiddenIdx(sheet, topIdx, !finiteProps.diff) - frozenRow;
                            this.setThresholdHeight(height, idx - this.parent.viewport.topIndex, frozenRow, !!finiteProps.diff, prevTopIdx === skipHiddenIdx(sheet, frozenRow, true));
                            this.parent.viewport.bottomIndex = lastIdx;
                            this.parent.renderModule.refreshUI({ colIndex: colIndex, rowIndex: startIdx, direction: 'first', refresh: 'RowPart',
                                frozenIndexes: frozenIndexes }, this.getRowAddress([startIdx, lastIdx]));
                        }
                        else {
                            startIdx = skipHiddenIdx(sheet, this.parent.viewport.topIndex + frozenRow, false);
                            if (startIdx < frozenRow) {
                                startIdx = frozenRow;
                                startIdx = skipHiddenIdx(sheet, startIdx, true);
                            }
                            this.parent.viewport.topIndex = startIdx - frozenRow;
                            lastIdx = skipHiddenIdx(sheet, (prevTopIdx + frozenRow) - 1, false);
                            if (lastIdx < frozenRow || lastIdx < startIdx) {
                                this.parent.viewport.topIndex = prevTopIdx;
                                return;
                            }
                            var btmIdx = this.skipHiddenLastIdx(this.parent.viewport.bottomIndex - (((lastIdx - startIdx) + 1) - this.hiddenCount(startIdx, lastIdx)), this.parent.viewport.bottomIndex);
                            this.parent.viewport.bottomIndex = skipHiddenIdx(sheet, btmIdx, false);
                            this.setThresholdHeight(height, idx - this.parent.viewport.topIndex, frozenRow);
                            this.parent.renderModule.refreshUI({ colIndex: colIndex, rowIndex: startIdx, direction: 'last', refresh: 'RowPart',
                                frozenIndexes: frozenIndexes }, this.getRowAddress([startIdx, lastIdx]));
                        }
                    }
                    else {
                        prevTopIdx = this.parent.viewport.leftIndex;
                        this.parent.viewport.topIndex = skipHiddenIdx(sheet, this.parent.viewport.topIndex + frozenRow, false) - frozenRow;
                        if (this.parent.viewport.topIndex < 0) {
                            this.parent.viewport.topIndex = skipHiddenIdx(sheet, frozenRow, true) - frozenRow;
                        }
                        this.parent.renderModule.refreshUI({
                            rowIndex: this.parent.viewport.topIndex, colIndex: colIndex, refresh: 'Row',
                            frozenIndexes: frozenIndexes, skipTranslate: true
                        });
                        if (frozenCol) {
                            this.parent.viewport.leftIndex = prevTopIdx;
                        }
                        this.setThresholdHeight(height, idx - this.parent.viewport.topIndex, frozenRow, this.parent.scrollSettings.isFinite && this.parent.viewport.bottomIndex ===
                            skipHiddenIdx(sheet, sheet.rowCount - 1, false));
                        this.translate({ refresh: 'Row' });
                    }
                    this.updateScrollCount(idx, 'row', threshold);
                    this.focusSheet();
                }
                else {
                    this.setThresholdHeight(height, threshold, frozenRow);
                    this.translate({ refresh: 'Row' });
                }
            }
            args.prev.idx = idx;
        }
    };
    VirtualScroll.prototype.skipHiddenLastIdx = function (idx, prevIdx, layout) {
        if (layout === void 0) { layout = 'rows'; }
        var sheet = this.parent.getActiveSheet();
        var count = 0;
        for (var i = idx; i <= prevIdx; i++) {
            if ((sheet["" + layout])[i] && (sheet["" + layout])[i].hidden) {
                count++;
            }
        }
        if (count) {
            idx = this.skipHiddenLastIdx(idx - count, idx - 1, layout);
        }
        return idx;
    };
    VirtualScroll.prototype.hiddenCount = function (startIdx, endIdx, layout) {
        if (layout === void 0) { layout = 'rows'; }
        var index = 0;
        var sheet = this.parent.getActiveSheet();
        for (var i = startIdx; i <= endIdx; i++) {
            if ((sheet["" + layout])[i] && (sheet["" + layout])[i].hidden) {
                index++;
            }
        }
        return index;
    };
    VirtualScroll.prototype.checkLastIdx = function (idx, layout) {
        var diff = 0;
        if (this.parent.scrollSettings.isFinite) {
            var sheet = this.parent.getActiveSheet();
            var count = skipHiddenIdx(sheet, (sheet[layout + 'Count'] - 1), false, layout === 'col' ? 'columns' : 'rows');
            if (idx > count) {
                diff = idx - count;
                idx = count;
            }
        }
        return { index: idx, diff: diff };
    };
    VirtualScroll.prototype.onHorizontalScroll = function (args) {
        var idx = args.cur.idx;
        var width = args.cur.size;
        var prevIdx = args.prev.idx;
        var idxDiff = Math.abs(idx - prevIdx);
        var threshold = this.parent.getThreshold('col');
        if (idxDiff > Math.round(threshold / 2)) {
            var startIdx = void 0;
            var endIdx = void 0;
            var prevLeftIdx = void 0;
            var sheet = this.parent.getActiveSheet();
            if (idx <= threshold) {
                if (!args.increase) {
                    if (this.translateX && prevIdx > threshold) {
                        this.translateX = 0;
                        var frozenCol = this.parent.frozenColCount(sheet);
                        var frozenRow = this.parent.frozenRowCount(sheet);
                        if (!args.preventScroll) {
                            var rowIndex = frozenRow ? getCellIndexes(sheet.topLeftCell)[0] : this.parent.viewport.topIndex;
                            var fIndexes = frozenRow ? [this.parent.viewport.topIndex + frozenRow, frozenCol] : [];
                            if (idxDiff < this.parent.viewport.colCount + threshold) {
                                startIdx = skipHiddenIdx(sheet, frozenCol, true, 'columns');
                                endIdx = skipHiddenIdx(sheet, (this.parent.viewport.leftIndex + frozenCol) - 1, false, 'columns');
                                this.parent.viewport.leftIndex = startIdx - frozenCol;
                                var rightIdx = this.skipHiddenLastIdx(this.parent.viewport.rightIndex - (((endIdx - startIdx) + 1) -
                                    this.hiddenCount(startIdx, endIdx, 'columns')), this.parent.viewport.rightIndex, 'columns');
                                this.parent.viewport.rightIndex = skipHiddenIdx(sheet, rightIdx, false, 'columns');
                                this.parent.renderModule.refreshUI({ rowIndex: rowIndex, colIndex: startIdx, direction: 'last', refresh: 'ColumnPart',
                                    skipUpdateOnFirst: true, frozenIndexes: fIndexes }, this.getColAddress([startIdx, skipHiddenIdx(sheet, endIdx, false, 'columns')]));
                            }
                            else {
                                var prevRowIndex = this.parent.viewport.topIndex;
                                this.parent.renderModule.refreshUI({ rowIndex: rowIndex, colIndex: 0, refresh: 'Column', skipUpdateOnFirst: true,
                                    frozenIndexes: fIndexes, skipTranslate: true });
                                if (frozenRow) {
                                    this.parent.viewport.topIndex = prevRowIndex;
                                }
                                this.translate({ refresh: 'Column' });
                            }
                            focus(this.parent.element);
                            idx = 0;
                        }
                        else {
                            this.parent.viewport.leftIndex = prevIdx - (threshold - frozenCol);
                        }
                    }
                    this.updateScrollCount(threshold, 'col');
                }
            }
            if (prevIdx < threshold) {
                idxDiff = Math.abs(idx - threshold);
            }
            if (!args.increase && this.parent.scrollSettings.isFinite && this.parent.viewport.rightIndex ===
                skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns')) {
                var frozenCol = this.parent.frozenColCount(sheet);
                var thresholdIdx = this.parent.viewport.leftIndex + frozenCol + getRangeIndexes(sheet.paneTopLeftCell)[1] - 1;
                thresholdIdx += this.hiddenCount(this.parent.viewport.leftIndex + frozenCol, thresholdIdx);
                if (idx + frozenCol > thresholdIdx) {
                    args.prev.idx = idx;
                    return;
                }
                idxDiff = thresholdIdx - (idx + frozenCol);
            }
            if (idx > threshold) {
                prevLeftIdx = this.parent.viewport.leftIndex;
                this.parent.viewport.leftIndex = idx - threshold;
                if (args.increase && prevLeftIdx > this.parent.viewport.leftIndex) {
                    this.parent.viewport.leftIndex = prevLeftIdx;
                    return;
                }
                var frozenCol = this.parent.frozenColCount(sheet);
                if (!args.preventScroll) {
                    var frozenRow = this.parent.frozenRowCount(sheet);
                    var rowIndex = frozenRow ? getCellIndexes(sheet.topLeftCell)[0] : this.parent.viewport.topIndex;
                    var frozenIndexes = [];
                    if (frozenRow) {
                        frozenIndexes = [frozenRow + this.parent.viewport.topIndex, frozenCol];
                    }
                    if (idxDiff < this.parent.viewport.colCount + threshold) {
                        if (args.increase) {
                            startIdx = this.parent.viewport.rightIndex + 1;
                            endIdx = this.parent.viewport.rightIndex + (this.parent.viewport.leftIndex - prevLeftIdx);
                            endIdx -= this.hiddenCount(prevLeftIdx + frozenCol, this.parent.viewport.leftIndex - 1 + frozenCol, 'columns');
                            if (endIdx <= this.parent.viewport.rightIndex || (this.parent.scrollSettings.isFinite &&
                                startIdx > skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns'))) {
                                this.parent.viewport.leftIndex = prevLeftIdx;
                                return;
                            }
                            var indexes = this.parent.skipHidden(startIdx, endIdx, 'columns', false);
                            var finiteOffset = this.checkLastIdx(indexes[1], 'col');
                            startIdx = indexes[0];
                            endIdx = finiteOffset.index;
                            this.parent.viewport.leftIndex = skipHiddenIdx(sheet, (this.parent.viewport.leftIndex - finiteOffset.diff) + frozenCol, !finiteOffset.diff, 'columns') - frozenCol;
                            this.setThresholdWidth(width, idx - this.parent.viewport.leftIndex, frozenCol, !!finiteOffset.diff, prevLeftIdx === skipHiddenIdx(sheet, frozenCol, true, 'columns'));
                            this.parent.viewport.rightIndex = endIdx;
                            this.parent.renderModule.refreshUI({ rowIndex: rowIndex, colIndex: startIdx, direction: 'first', refresh: 'ColumnPart',
                                frozenIndexes: frozenIndexes }, this.getColAddress([startIdx, endIdx]));
                        }
                        else {
                            startIdx = skipHiddenIdx(sheet, this.parent.viewport.leftIndex + frozenCol, false, 'columns');
                            if (startIdx < frozenCol) {
                                startIdx = frozenCol;
                                startIdx = skipHiddenIdx(sheet, startIdx, true, 'columns');
                            }
                            this.parent.viewport.leftIndex = startIdx - frozenCol;
                            endIdx = skipHiddenIdx(sheet, (prevLeftIdx + frozenCol) - 1, false, 'columns');
                            if (endIdx < frozenCol || endIdx < startIdx) {
                                this.parent.viewport.leftIndex = prevLeftIdx;
                                return;
                            }
                            var rightIdx = this.skipHiddenLastIdx(this.parent.viewport.rightIndex - (((endIdx - startIdx) + 1) -
                                this.hiddenCount(startIdx, endIdx, 'columns')), this.parent.viewport.rightIndex, 'columns');
                            this.parent.viewport.rightIndex = skipHiddenIdx(sheet, rightIdx, false, 'columns');
                            this.setThresholdWidth(width, idx - this.parent.viewport.leftIndex, frozenCol);
                            this.parent.renderModule.refreshUI({ rowIndex: rowIndex, colIndex: startIdx, direction: 'last', refresh: 'ColumnPart',
                                frozenIndexes: frozenIndexes }, this.getColAddress([startIdx, endIdx]));
                        }
                    }
                    else {
                        prevLeftIdx = this.parent.viewport.topIndex;
                        this.parent.viewport.leftIndex = skipHiddenIdx(sheet, this.parent.viewport.leftIndex + frozenCol, false, 'columns')
                            - frozenCol;
                        if (this.parent.viewport.leftIndex < 0) {
                            this.parent.viewport.leftIndex = skipHiddenIdx(sheet, frozenCol, true, 'columns') - frozenCol;
                        }
                        this.parent.renderModule.refreshUI({
                            rowIndex: rowIndex, colIndex: this.parent.viewport.leftIndex, refresh: 'Column', frozenIndexes: frozenIndexes,
                            skipTranslate: true
                        });
                        if (frozenRow) {
                            this.parent.viewport.topIndex = prevLeftIdx;
                        }
                        this.setThresholdWidth(width, idx - this.parent.viewport.leftIndex, frozenCol, this.parent.scrollSettings.isFinite && this.parent.viewport.rightIndex ===
                            skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns'));
                        this.translate({ refresh: 'Column' });
                    }
                    this.updateScrollCount(idx, 'col', threshold);
                    this.focusSheet();
                }
                else {
                    this.setThresholdWidth(width, threshold, frozenCol);
                    this.translate({ refresh: 'Column' });
                }
            }
            args.prev.idx = idx;
        }
    };
    VirtualScroll.prototype.focusSheet = function () {
        if (!document.activeElement.classList.contains('e-text-findNext-short') || !closest(document.activeElement, '#' + this.parent.element.id)) {
            focus(this.parent.element);
        }
    };
    VirtualScroll.prototype.setThresholdHeight = function (scrollHeight, threshold, frozenRow, endReached, isInit) {
        var sheet = this.parent.getActiveSheet();
        var start = this.parent.viewport.topIndex + frozenRow;
        var end = (start + threshold) - 1;
        if (endReached || isInit || end < start) {
            this.translateY = start <= frozenRow ? 0 : getRowsHeight(sheet, frozenRow, start - 1, true);
        }
        else {
            this.translateY = scrollHeight - getRowsHeight(sheet, start, end, true);
        }
    };
    VirtualScroll.prototype.setThresholdWidth = function (scrollWidth, threshold, frozenCol, endReached, isInit) {
        var sheet = this.parent.getActiveSheet();
        var start = this.parent.viewport.leftIndex + frozenCol;
        var end = (start + threshold) - 1;
        if (endReached || isInit || end < start) {
            this.translateX = start <= frozenCol ? 0 : getColumnsWidth(sheet, frozenCol, start - 1, true);
        }
        else {
            this.translateX = scrollWidth - getColumnsWidth(sheet, start, end, true);
        }
    };
    VirtualScroll.prototype.translate = function (args) {
        if (args.skipTranslate || !this.content) {
            return;
        }
        var translateX = this.translateX || 0;
        translateX = this.parent.enableRtl ? -translateX : translateX;
        if (args.refresh === 'Row' || args.refresh === 'RowPart') {
            this.content.style.transform = "translate(" + translateX + "px, " + this.translateY + "px)";
            this.rowHeader.style.transform = "translate(0px, " + this.translateY + "px)";
        }
        if (args.refresh === 'Column' || args.refresh === 'ColumnPart') {
            this.content.style.transform = "translate(" + translateX + "px, " + this.translateY + "px)";
            this.colHeader.style.transform = "translate(" + translateX + "px, 0px)";
        }
    };
    VirtualScroll.prototype.updateColumnWidth = function (args) {
        if (args.refresh === 'Column') {
            this.content.style.width = '';
            var sheet = this.parent.getActiveSheet();
            var width = getColumnsWidth(sheet, this.parent.viewport.leftIndex + this.parent.frozenColCount(sheet), this.parent.viewport.rightIndex, true);
            this.colHeader.style.width = width + 'px';
            this.content.style.width = width + 'px';
            if (!this.parent.scrollSettings.isFinite || args.isUpdate) {
                var scroll_1 = this.parent.element.querySelector('.e-scroller .e-virtualtrack');
                if (!scroll_1) {
                    return;
                }
                var scrollWidth = parseInt(scroll_1.style.width, 10);
                var newWidth = width + this.translateX + this.parent.viewport.beforeFreezeWidth;
                if (newWidth > scrollWidth) {
                    var diff = newWidth - scrollWidth;
                    scroll_1.style.width = scrollWidth + diff + 'px';
                }
                else {
                    var diff = scrollWidth - newWidth;
                    var vTrack = this.parent.getMainContent().getElementsByClassName('e-virtualtrack')[0];
                    if (scrollWidth - diff < parseInt(vTrack.style.width, 10)) {
                        scroll_1.style.width = vTrack.style.width;
                    }
                }
            }
        }
        else if (!this.parent.scrollSettings.isFinite) {
            var vTrack = this.parent.getMainContent().getElementsByClassName('e-virtualtrack')[0];
            var vTrackHeight = parseInt(vTrack.style.height, 10);
            var height = this.content.getBoundingClientRect().height;
            var newHeight = height + this.translateY + this.parent.viewport.beforeFreezeHeight;
            if (newHeight > vTrackHeight) {
                var diff = newHeight - vTrackHeight;
                vTrack.style.height = vTrackHeight + diff + 'px';
            }
            else {
                var diff = vTrackHeight - newHeight;
                var hVTrack = this.parent.getRowHeaderContent().getElementsByClassName('e-virtualtrack')[0];
                if (vTrackHeight - diff < parseInt(hVTrack.style.height, 10)) {
                    vTrack.style.height = hVTrack.style.height;
                }
            }
        }
    };
    VirtualScroll.prototype.updateRowColCount = function (args) {
        if (!this.scroll.length) {
            return;
        }
        var sheet = this.parent.getActiveSheet();
        if (args.update === 'row') {
            if (args.index !== this.scroll[this.parent.activeSheetIndex].rowCount - 1) {
                var height = this.getVTrackHeight('height');
                var newHeight = height;
                if (args.index >= this.scroll[this.parent.activeSheetIndex].rowCount) {
                    if (args.start === undefined) {
                        newHeight += getRowsHeight(sheet, this.scroll[this.parent.activeSheetIndex].rowCount, args.index, true);
                    }
                    else {
                        newHeight += getRowsHeight(sheet, args.start, args.end, true);
                    }
                }
                else {
                    if (args.start === undefined) {
                        newHeight -= getRowsHeight(sheet, args.index + 1, this.scroll[this.parent.activeSheetIndex].rowCount - 1, true);
                    }
                    else {
                        newHeight -= getRowsHeight(sheet, args.start, args.end, true);
                    }
                }
                if (!args.isDelete && newHeight < height) {
                    return;
                }
                this.scroll[this.parent.activeSheetIndex].rowCount = args.index + 1;
                this.updateVTrack(this.rowHeader, newHeight, 'height');
                if (this.scroll[this.parent.activeSheetIndex].rowCount > sheet.rowCount) {
                    this.parent.setSheetPropertyOnMute(sheet, 'rowCount', this.scroll[this.parent.activeSheetIndex].rowCount);
                }
            }
        }
        else {
            if (args.index !== this.scroll[this.parent.activeSheetIndex].colCount - 1) {
                var width = this.getVTrackHeight('width');
                var newWidth = width;
                if (args.index >= this.scroll[this.parent.activeSheetIndex].colCount) {
                    if (args.start === undefined) {
                        newWidth += getColumnsWidth(sheet, this.scroll[this.parent.activeSheetIndex].colCount, args.index, true);
                    }
                    else {
                        newWidth += getColumnsWidth(sheet, args.start, args.end, true);
                    }
                }
                else {
                    if (args.start === undefined) {
                        newWidth -= getColumnsWidth(sheet, args.index + 1, this.scroll[this.parent.activeSheetIndex].colCount - 1, true);
                    }
                    else {
                        newWidth -= getColumnsWidth(sheet, args.start, args.end, true);
                    }
                }
                if (!args.isDelete && newWidth < width) {
                    return;
                }
                this.scroll[this.parent.activeSheetIndex].colCount = args.index + 1;
                this.updateVTrack(this.colHeader, newWidth, 'width');
                if (this.scroll[this.parent.activeSheetIndex].colCount > sheet.colCount) {
                    this.parent.setSheetPropertyOnMute(sheet, 'colCount', this.scroll[this.parent.activeSheetIndex].colCount);
                }
            }
        }
    };
    VirtualScroll.prototype.getVTrackHeight = function (str) {
        var height = this.content.nextElementSibling.style["" + str];
        if (height.includes('e+')) {
            height = height.split('px')[0];
            var heightArr = height.split('e+');
            return Number(heightArr[0]) * Math.pow(10, Number(heightArr[1]));
        }
        else {
            return parseFloat(height);
        }
    };
    VirtualScroll.prototype.updateVTrackHeight = function (args) {
        var frozenRow = this.parent.frozenRowCount(this.parent.getActiveSheet());
        if (args.rowIdx < this.scroll[this.parent.activeSheetIndex].rowCount) {
            this.updateVTrack(this.rowHeader, this.getVTrackHeight('height') + args.threshold, 'height');
        }
        if (args.rowIdx >= frozenRow && args.rowIdx < this.parent.scrollModule.offset.top.idx + frozenRow) {
            var mainPanel = this.parent.element.getElementsByClassName('e-main-panel')[0];
            if (mainPanel) {
                this.parent.scrollModule.prevScroll.scrollTop = mainPanel.scrollTop + args.threshold;
                mainPanel.scrollTop += args.threshold;
            }
            this.parent.scrollModule.offset.top.size += args.threshold;
            if (args.rowIdx < this.parent.viewport.topIndex + frozenRow) {
                this.translateY += args.threshold;
                this.translate({ refresh: 'Row' });
            }
        }
    };
    VirtualScroll.prototype.updateVTrackWidth = function (args) {
        if (isHiddenCol(this.parent.getActiveSheet(), args.colIdx)) {
            return;
        }
        var frozenCol = this.parent.frozenColCount(this.parent.getActiveSheet());
        if (args.colIdx >= this.parent.viewport.leftIndex + frozenCol && args.colIdx <= this.parent.viewport.rightIndex) {
            var hdrVTrack = this.parent.getColumnHeaderContent().getElementsByClassName('e-virtualtrack')[0];
            hdrVTrack.style.width = parseFloat(hdrVTrack.style.width) + args.threshold + 'px';
            var cntVTrack = this.parent.getMainContent().getElementsByClassName('e-virtualtrack')[0];
            cntVTrack.style.width = parseFloat(cntVTrack.style.width) + args.threshold + 'px';
            var scrollVTrack = this.parent.getScrollElement().getElementsByClassName('e-virtualtrack')[0];
            scrollVTrack.style.width = parseFloat(scrollVTrack.style.width) + args.threshold + 'px';
            var hdrColumn = this.parent.getColumnHeaderContent().getElementsByClassName('e-virtualable')[0];
            hdrColumn.style.width = parseFloat(hdrColumn.style.width) + args.threshold + 'px';
            var cntColumn = this.parent.getMainContent().getElementsByClassName('e-virtualable')[0];
            cntColumn.style.width = parseFloat(cntColumn.style.width) + args.threshold + 'px';
        }
        else if (args.colIdx >= frozenCol && args.colIdx < this.parent.viewport.leftIndex + frozenCol) {
            this.parent.scrollModule.offset.left.size += args.threshold;
            this.translateX += args.threshold;
            this.translate({ refresh: 'Column' });
        }
    };
    VirtualScroll.prototype.updateVTrack = function (header, size, sizeStr) {
        header.nextElementSibling.style["" + sizeStr] = size + "px";
        this.content.nextElementSibling.style["" + sizeStr] = size + "px";
        if (sizeStr === 'width' && this.parent.allowScrolling) {
            this.parent.getScrollElement().firstElementChild.style.width = size + "px";
        }
    };
    VirtualScroll.prototype.deInitProps = function () {
        this.parent.viewport.leftIndex = null;
        this.parent.viewport.topIndex = null;
        this.parent.viewport.bottomIndex = null;
        this.translateX = null;
        this.translateY = null;
    };
    VirtualScroll.prototype.updateScrollProps = function (args) {
        var _this = this;
        if (args === void 0) { args = { sheetIndex: 0, sheets: this.parent.sheets }; }
        if (this.scroll.length === 0) {
            this.initScroll();
        }
        else {
            args.sheets.forEach(function () { _this.scroll.splice(args.sheetIndex, 0, { rowCount: 0, colCount: 0 }); });
        }
    };
    VirtualScroll.prototype.sliceScrollProps = function (args) {
        if (isNullOrUndefined(args.sheetIndex)) {
            this.scroll.length = 0;
        }
        else {
            this.scroll.splice(args.sheetIndex, 1);
        }
    };
    VirtualScroll.prototype.updateTranslate = function (args) {
        if (args.height) {
            if (args.isRender) {
                this.translateY -= args.height;
            }
            else {
                var height = parseInt(this.parent.getMainContent().getElementsByClassName('e-virtualtrack')[0].style.height, 10);
                if (args.isHide) {
                    this.updateVTrack(this.rowHeader, height - args.height, 'height');
                    this.setThresholdHeight(this.translateY, ((args.prevSize - 1) - this.parent.viewport.topIndex) + 1, this.parent.frozenRowCount(this.parent.getActiveSheet()));
                }
                else {
                    this.updateVTrack(this.rowHeader, height + args.height, 'height');
                    this.translateY = this.translateY + args.size;
                }
            }
            this.translate({ refresh: 'Row' });
        }
        if (args.width) {
            this.translateX -= args.width;
            this.translate({ refresh: 'Column' });
        }
    };
    VirtualScroll.prototype.addEventListener = function () {
        this.parent.on(beforeContentLoaded, this.createVirtualElement, this);
        this.parent.on(beforeVirtualContentLoaded, this.translate, this);
        this.parent.on(virtualContentLoaded, this.updateColumnWidth, this);
        this.parent.on(updateTableWidth, this.updateColumnWidth, this);
        this.parent.on(onVerticalScroll, this.onVerticalScroll, this);
        this.parent.on(onHorizontalScroll, this.onHorizontalScroll, this);
        this.parent.on(updateRowColCount, this.updateRowColCount, this);
        this.parent.on(rowHeightChanged, this.updateVTrackHeight, this);
        this.parent.on(colWidthChanged, this.updateVTrackWidth, this);
        this.parent.on(deInitProperties, this.deInitProps, this);
        this.parent.on(sheetsDestroyed, this.sliceScrollProps, this);
        this.parent.on(sheetCreated, this.updateScrollProps, this);
        this.parent.on(updateTranslate, this.updateTranslate, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
    };
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
        var noteIndicatorElement = document.querySelectorAll('.e-addNoteIndicator');
        if (noteIndicatorElement) {
            noteIndicatorElement.forEach(function (element) {
                element.remove();
            });
        }
        if (this.rowHeader) {
            removeAllChildren(this.rowHeader);
            this.rowHeader.remove();
        }
        if (this.colHeader) {
            removeAllChildren(this.colHeader);
            this.colHeader.remove();
        }
        if (this.content) {
            removeAllChildren(this.content);
            this.content.remove();
        }
        this.rowHeader = null;
        this.colHeader = null;
        this.content = null;
        this.parent = null;
        this.scroll.length = 0;
        this.translateX = null;
        this.translateY = null;
    };
    VirtualScroll.prototype.removeEventListener = function () {
        this.parent.off(beforeContentLoaded, this.createVirtualElement);
        this.parent.off(beforeVirtualContentLoaded, this.translate);
        this.parent.off(virtualContentLoaded, this.updateColumnWidth);
        this.parent.off(updateTableWidth, this.updateColumnWidth);
        this.parent.off(onVerticalScroll, this.onVerticalScroll);
        this.parent.off(onHorizontalScroll, this.onHorizontalScroll);
        this.parent.off(updateRowColCount, this.updateRowColCount);
        this.parent.off(rowHeightChanged, this.updateVTrackHeight);
        this.parent.off(colWidthChanged, this.updateVTrackWidth);
        this.parent.off(sheetsDestroyed, this.sliceScrollProps);
        this.parent.off(sheetCreated, this.updateScrollProps);
        this.parent.off(updateTranslate, this.updateTranslate);
        this.parent.off(spreadsheetDestroyed, this.destroy);
    };
    return VirtualScroll;
}());
export { VirtualScroll };
