import { Browser, setStyleAttribute as setBaseStyleAttribute, getComponent, detach, isNullOrUndefined, removeClass, extend, isUndefined } from '@syncfusion/ej2-base';
import { completeAction } from './index';
import { invalidData, refreshFilterCellsOnResize } from './../common/index';
import { Cell, duplicateSheet, getSheetIndex, getSheetIndexFromAddress, getSheetIndexFromId, getSheetNameFromAddress, hideShow, moveSheet, protectsheetHandler, refreshChartSize, refreshRibbonIcons, replace, replaceAll, setLinkModel, setLockCells, updateSheetFromDataSource } from '../../workbook/index';
import { clearViewer, deleteImage, createImageElement, refreshImgCellObj, removeDataValidation } from './index';
import { removeSheetTab, rowHeightChanged, initiateFilterUI, deleteChart } from '../index';
import { getColumnsWidth, getSwapRange, isImported } from '../../workbook/index';
import { getRangeIndexes, wrap, setRowHeight, insertModel, getColumnWidth } from '../../workbook/index';
import { initiateSort, getIndexesFromAddress, getRowHeight, isLocked } from '../../workbook/index';
import { cellValidation, clearCFRule, getColumn, getRow, updateCell } from '../../workbook/index';
import { getCell, setChart, setVisibleMergeIndex, Row, Sheet, Column } from '../../workbook/index';
import { setCFRule, setMerge, setAutoFill, getautofillDDB, getRowsHeight, deleteModel } from '../../workbook/index';
import { workbookFormulaOperation, getAddressInfo, getSheet, setCellFormat, updateCFModel } from '../../workbook/index';
import { checkUniqueRange, applyCF, skipHiddenIdx, isFilterHidden } from '../../workbook/index';
import { applyProtect, chartDesignTab, copy, cut, getColIdxFromClientX, getRowIdxFromClientY, goToSheet, hideSheet, paste, performUndoRedo, refreshChartCellObj, removeHyperlink, removeWorkbookProtection, setProtectWorkbook, sheetNameUpdate, showSheet } from './event';
import { keyCodes } from './constant';
/**
 * The function used to update Dom using requestAnimationFrame.
 *
 * @param  {Function} fn - Function that contains the actual action
 * @returns {void}
 * @hidden
 */
export function getUpdateUsingRaf(fn) {
    requestAnimationFrame(function () {
        fn();
    });
}
/**
 * The function used to remove the dom element children.
 *
 * @param  {Element} parent - Specify the parent
 * @returns {void} - The function used to get colgroup width based on the row index.
 * @hidden
 */
export function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/**
 * The function used to get colgroup width based on the row index.
 *
 * @param  {number} index - Specify the index
 * @returns {number} - The function used to get colgroup width based on the row index.
 * @hidden
 */
export function getColGroupWidth(index) {
    var width = 30;
    if (index.toString().length > 3) {
        width = index.toString().length * 10;
    }
    return width;
}
var scrollAreaWidth = null;
var textLineHeight = 1.24;
/**
 * @hidden
 * @returns {number} - To get scrollbar width
 */
export function getScrollBarWidth() {
    if (scrollAreaWidth !== null) {
        return scrollAreaWidth;
    }
    var htmlDivNode = document.createElement('div');
    var result = 0;
    htmlDivNode.style.cssText = 'width:100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;';
    document.body.appendChild(htmlDivNode);
    result = (htmlDivNode.offsetWidth - htmlDivNode.clientWidth) | 0;
    document.body.removeChild(htmlDivNode);
    return scrollAreaWidth = result;
}
/**
 * @hidden
 * @param {HTMLElement} element - Specify the element.
 * @param {string[]} classList - Specify the classList
 * @param {number} scaleY - Specify the scaleY value.
 * @returns {number} - get Siblings Height
 */
export function getSiblingsHeight(element, classList, scaleY) {
    if (scaleY === void 0) { scaleY = 1; }
    classList = classList || ['e-ribbon', 'e-formula-bar-panel', 'e-sheet-tab-panel', 'e-header-toolbar'];
    var previous = getHeightFromDirection(element, 'previous', classList, scaleY);
    var next = getHeightFromDirection(element, 'next', classList, scaleY);
    return previous + next;
}
/**
 * @param {HTMLElement} element - Specify the element.
 * @param {string} direction - Specify the direction.
 * @param {string[]} classList - Specify the classList.
 * @param {number} scaleY - Specify the scaleY value.
 * @returns {number} - get Height FromDirection
 */
function getHeightFromDirection(element, direction, classList, scaleY) {
    var sibling = (element)[direction + 'ElementSibling'];
    var result = 0;
    while (sibling) {
        if (classList.some(function (value) { return sibling.classList.contains(value); })) {
            result += (sibling.getBoundingClientRect().height * scaleY);
        }
        sibling = (sibling)[direction + 'ElementSibling'];
    }
    return result;
}
/**
 * @hidden
 * @param {Spreadsheet} context - Specify the spreadsheet.
 * @param {number[]} range - Specify the range.
 * @param {boolean} isModify - Specify the boolean value.
 * @returns {boolean} - Returns boolean value.
 */
export function inView(context, range, isModify) {
    if (context.scrollSettings.enableVirtualization) {
        var sheet = context.getActiveSheet();
        var frozenRow = context.frozenRowCount(sheet);
        var frozenCol = context.frozenColCount(sheet);
        var topIdx = context.viewport.topIndex + frozenRow;
        var leftIdx = context.viewport.leftIndex + frozenCol;
        var bottomIdx = context.viewport.bottomIndex;
        var rightIdx = context.viewport.rightIndex;
        if (sheet.frozenRows || sheet.frozenColumns) {
            if (context.insideViewport(range[0], range[1]) || context.insideViewport(range[2], range[3])) {
                return true;
            }
        }
        else if (topIdx <= range[0] && bottomIdx >= range[2] && leftIdx <= range[1] && rightIdx >= range[3]) {
            return true;
        }
        var inView_1 = false;
        if (isModify) {
            if (range[0] < topIdx && range[2] < topIdx || range[0] > bottomIdx && range[2] > bottomIdx) {
                return false;
            }
            else {
                if (range[0] < topIdx && range[2] > topIdx && range[0] >= frozenRow) {
                    range[0] = topIdx;
                    inView_1 = true;
                }
                if (range[2] > bottomIdx) {
                    range[2] = bottomIdx;
                    inView_1 = true;
                }
            }
            if (range[1] < leftIdx && range[3] < leftIdx || range[1] > rightIdx && range[3] > rightIdx) {
                return false;
            }
            else {
                if (range[1] < leftIdx && range[3] > leftIdx && range[1] >= frozenCol) {
                    range[1] = leftIdx;
                    inView_1 = true;
                }
                if (range[3] > rightIdx) {
                    range[3] = rightIdx;
                    inView_1 = true;
                }
            }
        }
        return inView_1;
    }
    else {
        return true;
    }
}
/**
 * To get the top left cell position in viewport.
 *
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {number[]} indexes - Specify the indexes.
 * @param {number} frozenRow - Specify the frozen row.
 * @param {number} frozenColumn - Specify the frozen column
 * @param {number} freezeScrollHeight - Specify the freeze scroll height
 * @param {number} freezeScrollWidth - Specify the freeze scroll width
 * @param {number} rowHdrWidth - Specify the row header width
 * @param {boolean} isOverlay - Specify the overlay.
 * @returns {number} - To get the top left cell position in viewport.
 */
export function getCellPosition(sheet, indexes, frozenRow, frozenColumn, freezeScrollHeight, freezeScrollWidth, rowHdrWidth, isOverlay) {
    var i;
    var offset = { left: { idx: 0, size: 0 }, top: { idx: 0, size: 0 } };
    var top = offset.top.size;
    var left = offset.left.size;
    for (i = offset.top.idx; i < indexes[0]; i++) {
        if (frozenRow) {
            if (frozenRow - 1 < indexes[0] && i < frozenRow) {
                continue;
            }
        }
        top += getRowHeight(sheet, i, !isOverlay);
    }
    for (i = offset.left.idx; i < indexes[1]; i++) {
        if (frozenColumn && frozenColumn - 1 < indexes[1] && i < frozenColumn) {
            continue;
        }
        left += getColumnWidth(sheet, i, null, !isOverlay);
    }
    if (frozenRow && indexes[0] < frozenRow) {
        if (sheet.showHeaders) {
            top += 30;
        }
        if (freezeScrollHeight) {
            top -= freezeScrollHeight;
        }
    }
    if (frozenColumn && indexes[1] < frozenColumn) {
        if (sheet.showHeaders) {
            left += rowHdrWidth ? rowHdrWidth : 30;
        }
        if (freezeScrollWidth) {
            left -= freezeScrollWidth;
        }
    }
    return { top: top, left: left };
}
/**
 * @param {Spreadsheet} parent - Specify the parent
 * @param {HTMLElement} ele - Specify the element
 * @param {number[]} range - Specify the range
 * @param {string} cls - Specify the class name
 * @param {boolean} preventAnimation - Specify the preventAnimation.
 * @param {boolean} isMultiRange - Specify the multi range selection.
 * @param {boolean} removeCls - Specify to remove the class from selection.
 * @returns {void} - To set the position
 * @hidden
 */
export function setPosition(parent, ele, range, cls, preventAnimation, isMultiRange, removeCls) {
    if (cls === void 0) { cls = 'e-selection'; }
    var sheet = parent.getActiveSheet();
    if (sheet.frozenRows || sheet.frozenColumns) {
        var content_1;
        var frozenRow_1 = parent.frozenRowCount(sheet);
        var frozenCol_1 = parent.frozenColCount(sheet);
        if (cls === 'e-active-cell') {
            if (range[0] < frozenRow_1 || range[1] < frozenCol_1) {
                ele.style.display = 'none';
                content_1 = range[0] < frozenRow_1 && range[1] < frozenCol_1 ? parent.getSelectAllContent() :
                    (range[0] < frozenRow_1 ? parent.getColumnHeaderContent() : parent.getRowHeaderContent());
                var rangeEle = content_1.querySelector('.' + cls);
                if (!rangeEle) {
                    rangeEle = ele.cloneNode(true);
                    content_1.appendChild(rangeEle);
                }
                ele = rangeEle;
                locateElem(parent, ele, range, sheet, parent.enableRtl, frozenRow_1, frozenCol_1, preventAnimation, true, parent.viewport.beforeFreezeHeight, parent.viewport.beforeFreezeWidth, parent.sheetModule.colGroupWidth);
            }
            else {
                locateElem(parent, ele, range, sheet, parent.enableRtl, frozenRow_1, frozenCol_1, preventAnimation);
            }
            if (ele.style.display) {
                ele.style.display = '';
            }
            removeRangeEle(parent.getSelectAllContent(), content_1, 'e-active-cell');
            removeRangeEle(parent.getColumnHeaderContent(), content_1, 'e-active-cell');
            removeRangeEle(parent.getRowHeaderContent(), content_1, 'e-active-cell');
        }
        else if (cls === 'e-autofill') {
            var contentElem = void 0;
            var freezeRow = parent.frozenRowCount(sheet);
            var freezeCol = parent.frozenColCount(sheet);
            if (range[0] < freezeRow || range[1] < freezeCol) {
                ele.style.display = 'none';
                contentElem = range[0] < freezeRow && range[1] < freezeCol ? parent.getSelectAllContent() :
                    (range[0] < freezeRow ? parent.getColumnHeaderContent() : parent.getRowHeaderContent());
                var rangeEle = contentElem.querySelector('.' + cls);
                if (!rangeEle) {
                    rangeEle = ele.cloneNode(true);
                    contentElem.appendChild(rangeEle);
                }
                ele = rangeEle;
                locateElem(parent, ele, range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, true, parent.viewport.beforeFreezeHeight, parent.viewport.beforeFreezeWidth, parent.sheetModule.colGroupWidth, 'e-autofill');
            }
            else {
                locateElem(parent, ele, range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, false, 0, 0, 0, 'e-autofill');
            }
            if (ele.style.display) {
                ele.style.display = '';
            }
            removeRangeEle(parent.getSelectAllContent(), contentElem, 'e-autofill');
            removeRangeEle(parent.getColumnHeaderContent(), contentElem, 'e-autofill');
            removeRangeEle(parent.getRowHeaderContent(), contentElem, 'e-autofill');
        }
        else if (cls === 'e-filloption') {
            var contentElem = void 0;
            var freezeRow = parent.frozenRowCount(sheet);
            var freezeCol = parent.frozenColCount(sheet);
            if ((range[0] < freezeRow || range[1] < freezeCol)) {
                if (range[3] + 1 === freezeCol && range[2] + 1 > freezeRow) {
                    locateElem(parent, parent.getMainContent().querySelector('.e-filloption'), range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, false, 0, 0, 0, 'e-filloption', true, { left: -4 });
                }
                else if (range[2] + 1 === freezeRow && range[3] + 1 > freezeCol) {
                    locateElem(parent, parent.getMainContent().querySelector('.e-filloption'), range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, false, 0, 0, 0, 'e-filloption', true, { top: -4 });
                }
                else if (range[3] + 1 === freezeCol && range[2] + 1 < freezeRow) { // for upper side
                    contentElem = parent.getColumnHeaderContent();
                    var rangeElem = contentElem.querySelector('.' + cls);
                    if (!rangeElem) {
                        parent.notify(getautofillDDB, { id: parent.element.id + '_autofilloptionbtn', appendElem: contentElem });
                    }
                    ele = parent.autofillModule.autoFillDropDown.element;
                    locateElem(parent, ele, range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, false, 0, 0, 0, 'e-filloption', true, { left: -4 });
                }
                else if (range[2] + 1 === freezeRow && range[3] + 1 === freezeCol) { // corner cell
                    locateElem(parent, parent.getMainContent().querySelector('.e-filloption'), range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, false, 0, 0, 0, 'e-filloption', true, { top: -4, left: -4 });
                }
                else {
                    contentElem = range[0] < freezeRow && range[1] < freezeCol ? parent.getSelectAllContent() :
                        (range[0] < freezeRow ? parent.getColumnHeaderContent() : parent.getRowHeaderContent());
                    var rangeEle = contentElem.querySelector('.' + cls);
                    if (!rangeEle) {
                        parent.notify(getautofillDDB, { id: parent.element.id + '_autofilloptionbtn', appendElem: contentElem });
                    }
                    ele = parent.autofillModule.autoFillDropDown.element;
                    locateElem(parent, ele, range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, true, parent.viewport.
                        beforeFreezeHeight, parent.viewport.beforeFreezeWidth, parent.sheetModule.colGroupWidth, 'e-filloption', true);
                }
            }
            else {
                locateElem(parent, parent.getMainContent().querySelector('.e-filloption'), range, sheet, parent.enableRtl, freezeRow, freezeCol, preventAnimation, false, 0, 0, 0, 'e-filloption', true);
            }
            if (ele.style.display) {
                ele.style.display = '';
            }
            removeRangeEle(parent.getSelectAllContent(), contentElem, 'e-filloption');
            removeRangeEle(parent.getColumnHeaderContent(), contentElem, 'e-filloption');
            removeRangeEle(parent.getRowHeaderContent(), contentElem, 'e-filloption');
        }
        else {
            var swapRange = getSwapRange(range);
            if (swapRange[0] < frozenRow_1 || swapRange[1] < frozenCol_1) {
                if (ele && !ele.classList.contains('e-multi-range')) {
                    ele.classList.add('e-hide');
                }
                var ranges_1 = [];
                if (swapRange[0] < frozenRow_1 && swapRange[1] < frozenCol_1) {
                    if (swapRange[2] < frozenRow_1 && swapRange[3] < frozenCol_1) {
                        ranges_1.push(range);
                        if (!isMultiRange) {
                            removeRangeEle(parent.getColumnHeaderContent(), content_1, cls, true);
                            removeRangeEle(parent.getRowHeaderContent(), content_1, cls, true);
                        }
                    }
                    else if (swapRange[2] > frozenRow_1 - 1) {
                        if (swapRange[3] < frozenCol_1) {
                            if (!isMultiRange) {
                                removeRangeEle(parent.getColumnHeaderContent(), content_1, cls, true);
                            }
                            ranges_1.push([swapRange[0], swapRange[1], frozenRow_1 - 1, swapRange[3]]);
                            ranges_1.push([frozenRow_1, swapRange[1], swapRange[2], swapRange[3]]);
                        }
                        else {
                            ranges_1.push([swapRange[0], swapRange[1], frozenRow_1 - 1, frozenCol_1 - 1]);
                            ranges_1.push([frozenRow_1, swapRange[1], swapRange[2], frozenCol_1 - 1]);
                            ranges_1.push([swapRange[0], frozenCol_1, frozenRow_1 - 1, swapRange[3]]);
                            ranges_1.push([frozenRow_1, frozenCol_1, swapRange[2], swapRange[3]]);
                        }
                    }
                    else {
                        if (swapRange[2] < frozenRow_1) {
                            ranges_1.push([swapRange[0], swapRange[1], swapRange[2], frozenCol_1 - 1]);
                            ranges_1.push([swapRange[0], frozenCol_1, swapRange[2], swapRange[3]]);
                            if (!isMultiRange) {
                                removeRangeEle(parent.getRowHeaderContent(), content_1, cls, true);
                            }
                        }
                        else {
                            ranges_1.push([frozenRow_1, swapRange[1], swapRange[2], frozenCol_1 - 1]);
                            ranges_1.push([swapRange[0], swapRange[1], frozenRow_1 - 1, frozenCol_1 - 1]);
                            ranges_1.push([frozenRow_1, frozenCol_1, swapRange[2], swapRange[3]]);
                            ranges_1.push([swapRange[0], frozenCol_1, frozenRow_1 - 1, swapRange[3]]);
                        }
                    }
                }
                else if (swapRange[0] < frozenRow_1) {
                    if (swapRange[2] < frozenRow_1) {
                        ranges_1.push(range);
                        if (!isMultiRange) {
                            removeRangeEle(parent.getRowHeaderContent(), content_1, cls, true);
                        }
                    }
                    else {
                        ranges_1.push([swapRange[0], swapRange[1], frozenRow_1 - 1, swapRange[3]]);
                        ranges_1.push([frozenRow_1, swapRange[1], swapRange[2], swapRange[3]]);
                        if (!isMultiRange) {
                            removeRangeEle(parent.getSelectAllContent(), content_1, cls, true);
                            removeRangeEle(parent.getRowHeaderContent(), content_1, cls, true);
                        }
                    }
                }
                else {
                    if (swapRange[3] < frozenCol_1) {
                        ranges_1.push(range);
                        if (!isMultiRange) {
                            removeRangeEle(parent.getSelectAllContent(), content_1, cls, true);
                        }
                    }
                    else {
                        ranges_1.push([swapRange[0], swapRange[1], swapRange[2], frozenCol_1 - 1]);
                        ranges_1.push([swapRange[0], frozenCol_1, swapRange[2], swapRange[3]]);
                        if (!isMultiRange) {
                            removeRangeEle(parent.getSelectAllContent(), content_1, cls, true);
                            removeRangeEle(parent.getColumnHeaderContent(), content_1, cls, true);
                        }
                    }
                }
                var removeEle_1;
                ranges_1.forEach(function (rng) {
                    var zIndex;
                    if (rng[2] < frozenRow_1 && rng[3] < frozenCol_1) {
                        content_1 = parent.getSelectAllContent();
                    }
                    else {
                        if (frozenRow_1 || frozenCol_1) {
                            var selectAllEle = parent.getSelectAllContent();
                            if (selectAllEle) {
                                zIndex = selectAllEle.style.zIndex;
                            }
                        }
                        if (rng[2] < frozenRow_1) {
                            content_1 = parent.getColumnHeaderContent();
                        }
                        else if (rng[3] < frozenCol_1) {
                            content_1 = parent.getRowHeaderContent();
                        }
                        else {
                            content_1 = parent.getMainContent();
                            if (frozenRow_1 && !zIndex) {
                                var colHdrEle = parent.getColumnHeaderContent();
                                if (colHdrEle) {
                                    zIndex = colHdrEle.style.zIndex;
                                }
                            }
                            if (frozenCol_1 && !zIndex) {
                                var rowHdrEle = parent.getRowHeaderContent();
                                if (rowHdrEle) {
                                    zIndex = rowHdrEle.style.zIndex;
                                }
                            }
                        }
                    }
                    var rangeEle;
                    if (cls === 'e-copy-indicator' || cls === 'e-range-indicator') {
                        rangeEle = ele.cloneNode(true);
                        content_1.appendChild(rangeEle);
                        if (frozenRow_1) {
                            if (rng[2] + 1 === frozenRow_1) {
                                ranges_1.forEach(function (subRng) {
                                    if (subRng !== rng) {
                                        removeEle_1 = rangeEle.getElementsByClassName('e-bottom')[0];
                                        if (removeEle_1 && subRng[0] === frozenRow_1) {
                                            detach(removeEle_1);
                                        }
                                    }
                                });
                            }
                            if (rng[0] === frozenRow_1 && content_1.parentElement.classList.contains('e-main-panel')) {
                                ranges_1.forEach(function (subRng) {
                                    if (subRng !== rng) {
                                        removeEle_1 = rangeEle.getElementsByClassName('e-top')[0];
                                        if (removeEle_1 && subRng[2] + 1 === frozenRow_1) {
                                            detach(removeEle_1);
                                        }
                                    }
                                });
                            }
                        }
                        if (frozenCol_1) {
                            if (rng[3] + 1 === frozenCol_1) {
                                ranges_1.forEach(function (subRng) {
                                    if (subRng !== rng) {
                                        removeEle_1 = rangeEle.getElementsByClassName('e-right')[0];
                                        if (removeEle_1 && subRng[1] === frozenCol_1) {
                                            detach(removeEle_1);
                                        }
                                    }
                                });
                            }
                            if (rng[1] === frozenCol_1 && (content_1.classList.contains('e-sheet-content') || content_1.classList.contains('e-column-header'))) {
                                ranges_1.forEach(function (subRng) {
                                    if (subRng !== rng) {
                                        removeEle_1 = rangeEle.getElementsByClassName('e-left')[0];
                                        if (removeEle_1 && subRng[3] + 1 === frozenCol_1) {
                                            detach(removeEle_1);
                                        }
                                    }
                                });
                            }
                        }
                    }
                    else {
                        rangeEle = content_1.querySelector('.' + cls);
                        if (!rangeEle) {
                            rangeEle = ele.cloneNode(true);
                            if (isMultiRange && !rangeEle.classList.contains('e-multi-range')) {
                                rangeEle.classList.add('e-multi-range');
                            }
                            content_1.appendChild(rangeEle);
                        }
                        if (removeCls) {
                            rangeEle.classList.remove(cls);
                        }
                    }
                    if (frozenRow_1 || frozenCol_1) {
                        if (zIndex) {
                            rangeEle.style.zIndex = zIndex;
                        }
                        else if (rangeEle.style.zIndex) {
                            rangeEle.style.zIndex = '';
                        }
                    }
                    locateElem(parent, rangeEle, rng, sheet, parent.enableRtl, frozenRow_1, frozenCol_1, preventAnimation, false, parent.viewport.beforeFreezeHeight, parent.viewport.beforeFreezeWidth, parent.sheetModule.colGroupWidth);
                    if (rangeEle.classList.contains('e-hide')) {
                        rangeEle.classList.remove('e-hide');
                    }
                });
            }
            else {
                if (!isMultiRange) {
                    removeRangeEle(parent.getSelectAllContent(), null, cls, true);
                    removeRangeEle(parent.getColumnHeaderContent(), null, cls, true);
                    removeRangeEle(parent.getRowHeaderContent(), null, cls, true);
                }
                locateElem(parent, ele, range, sheet, parent.enableRtl, frozenRow_1, frozenCol_1, preventAnimation);
                if (cls === 'e-range-indicator' || !parent.getMainContent().querySelector('.' + cls)) {
                    parent.getMainContent().appendChild(ele);
                }
                if (ele.classList.contains('e-hide')) {
                    ele.classList.remove('e-hide');
                }
                if (removeCls) {
                    ele.classList.remove(cls);
                }
            }
        }
    }
    else {
        var promise = locateElem(parent, ele, range, sheet, parent.enableRtl, 0, 0, preventAnimation);
        if (ele && !parent.getMainContent().querySelector('.' + cls)) {
            parent.getMainContent().appendChild(ele);
        }
        return promise;
    }
}
/**
 * @param {Element} content - Specify the content element.
 * @param {HTMLElement} checkEle - Specify the element.
 * @param {string} cls - Specify the class name.
 * @param {string} isSelection - Specify the selection element.
 * @param {string} removeCls - Specify to remove class from element.
 * @returns {void} - remove element with given range
 */
export function removeRangeEle(content, checkEle, cls, isSelection, removeCls) {
    if (isSelection || content !== checkEle) {
        if (removeCls) {
            var collection = content.querySelectorAll('.' + cls);
            var i = 0;
            while (i < collection.length) {
                collection[i].classList.remove(cls);
                i++;
            }
        }
        else {
            var ele = content.querySelector('.' + cls);
            if (ele && !ele.classList.contains('e-multi-range')) {
                detach(ele);
            }
        }
    }
}
/**
 * Position element with given range
 *
 * @hidden
 * @param {Spreadsheet} parent - Specify the parent.
 * @param {HTMLElement} ele - Specify the element.
 * @param {number[]} range - specify the range.
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {boolean} isRtl - Specify the boolean value.
 * @param {number} frozenRow - Specidy the frozen row.
 * @param {number} frozenColumn - Specify the frozen column
 * @param {boolean} preventAnimation - Specify the preventAnimation.
 * @param {boolean} isActiveCell - Specidy the boolean value.
 * @param {number} freezeScrollHeight - Specify the freeze scroll height
 * @param {number} freezeScrollWidth - Specify the freeze scroll width
 * @param {number} rowHdrWidth - Specify the row header width
 * @param {number} cls - Specify the class
 * @param {number} isFillOptShow - Specify the fill option
 * @param {number} freezeFillOpt - Specifies the fill option
 * @param {number} freezeFillOpt.top - Specifies the fill option
 * @param {number} freezeFillOpt.left - Specifies the fill option
 * @returns {void} - Position element with given range
 */
export function locateElem(parent, ele, range, sheet, isRtl, frozenRow, frozenColumn, preventAnimation, isActiveCell, freezeScrollHeight, freezeScrollWidth, rowHdrWidth, cls, isFillOptShow, freezeFillOpt) {
    var swapRange = getSwapRange(range);
    var cellPosition = getCellPosition(sheet, swapRange, frozenRow, frozenColumn, freezeScrollHeight, freezeScrollWidth, rowHdrWidth);
    var startIndex = [skipHiddenIdx(sheet, 0, true), skipHiddenIdx(sheet, 0, true, 'columns')];
    var height;
    var width;
    if (parent.scrollSettings.isFinite) {
        height = swapRange[0] >= sheet.rowCount ? 0 : getRowsHeight(sheet, swapRange[0], swapRange[2] < sheet.rowCount ? swapRange[2] : sheet.rowCount - 1, true);
        width = swapRange[1] >= sheet.colCount ? 0 : getColumnsWidth(sheet, swapRange[1], swapRange[3] < sheet.colCount ? swapRange[3] : sheet.colCount - 1, true);
    }
    else {
        height = getRowsHeight(sheet, swapRange[0], swapRange[2], true);
        width = getColumnsWidth(sheet, swapRange[1], swapRange[3], true);
    }
    var isRowSelected = (swapRange[1] === 0 && swapRange[3] === sheet.colCount - 1);
    var isColSelected = (swapRange[0] === 0 && swapRange[2] === sheet.rowCount - 1);
    var top = 0;
    var tdiff = -5;
    var ldiff = -5;
    var left = 0;
    var otdiff = 6;
    var oldiff = 6;
    if (isNullOrUndefined(cls)) {
        var attrs = {
            'top': (swapRange[0] === startIndex[0] ? cellPosition.top : cellPosition.top - getDPRValue(1)) + 'px',
            'height': height && height + (swapRange[0] === startIndex[0] ? 0 : getDPRValue(1)) + 'px',
            'width': width && width + (swapRange[1] === startIndex[1] ? 0 : getDPRValue(1)) + (isActiveCell
                && frozenColumn && swapRange[1] < frozenColumn && swapRange[3] >= frozenColumn ? 1 : 0) + 'px'
        };
        attrs[isRtl ? 'right' : 'left'] = (swapRange[1] === startIndex[1] ? cellPosition.left : cellPosition.left - 1) + 'px';
        if (ele) {
            var promise = setStyleAttribute([{ element: ele, attrs: attrs }], preventAnimation);
            return promise;
        }
    }
    else {
        if (isRowSelected) {
            tdiff = -5;
            ldiff = -2;
            otdiff = 6;
            oldiff = 3;
        }
        if (isColSelected) {
            ldiff = -5;
            tdiff = 0;
            otdiff = 1;
            oldiff = 6;
        }
        if (!isColSelected) {
            top += height;
        }
        if (!isRowSelected) {
            left += width;
        }
        top += Math.round(cellPosition.top) + tdiff;
        left += Math.round(cellPosition.left) + ldiff;
        var attrs = {};
        if (isFillOptShow) {
            removeClass([ele], 'e-hide');
            top = freezeFillOpt && freezeFillOpt.top ? freezeFillOpt.top : top;
            left = freezeFillOpt && freezeFillOpt.left ? freezeFillOpt.left : left;
            attrs = {
                'top': top + otdiff + 'px'
            };
            attrs[isRtl ? 'right' : 'left'] = left + oldiff + 'px';
            if (ele) {
                setStyleAttribute([{ element: ele, attrs: attrs }], preventAnimation);
            }
        }
        else {
            attrs = {
                'top': top + 'px'
            };
            attrs[isRtl ? 'right' : 'left'] = left + 'px';
            if (ele) {
                setStyleAttribute([{ element: ele, attrs: attrs }], preventAnimation);
            }
        }
    }
}
/**
 * To update element styles using request animation frame
 *
 * @hidden
 * @param {StyleType[]} styles - Specify the styles
 * @param {boolean} preventAnimation - Specify the preventAnimation.
 * @returns {void} - To update element styles using request animation frame
 */
export function setStyleAttribute(styles, preventAnimation) {
    var promise = new Promise(function (resolve) {
        var setStyleFn = function () {
            styles.forEach(function (style) {
                setBaseStyleAttribute(style.element, style.attrs);
                resolve();
            });
        };
        if (preventAnimation) {
            setStyleFn();
        }
        else {
            requestAnimationFrame(function () { return setStyleFn(); });
        }
    });
    return promise;
}
/**
 * @hidden
 * @returns {string} - to get Start Event
 */
export function getStartEvent() {
    return (Browser.isPointer ? 'pointerdown' : 'mousedown touchstart');
}
/**
 * @hidden
 * @returns {string} - to get Move Event
 */
export function getMoveEvent() {
    return (Browser.isPointer ? 'pointermove' : 'mousemove touchmove');
}
/**
 * @hidden
 * @returns {string} - Returns string value.
 */
export function getEndEvent() {
    return (Browser.isPointer ? 'pointerup' : 'mouseup touchend');
}
/**
 * @hidden
 * @param {Event} e - To specify the event.
 * @returns {boolean} - Returns boolean value.
 */
export function isTouchStart(e) {
    return e.type === 'touchstart' || (e.type === 'pointerdown' && e.pointerType === 'touch');
}
/**
 * @hidden
 * @param {Event} e - To specify the event.
 * @returns {boolean} - Returns boolean value.
 */
export function isTouchMove(e) {
    return e.type === 'touchmove' || (e.type === 'pointermove' && e.pointerType === 'touch');
}
/**
 * @hidden
 * @param {Event} e - To specify the event.
 * @returns {boolean} - Returns boolean value.
 */
export function isTouchEnd(e) {
    return e.type === 'touchend' || (e.type === 'pointerup' && e.pointerType === 'touch');
}
/**
 * @hidden
 * @param {TouchEvent | MouseEvent} e - To specify the mouse and touch event.
 * @returns {number} - To get client value
 */
export function isMouseDown(e) {
    return e && (e.type === 'mousedown' || e.type === 'pointerdown');
}
/**
 * @param {MouseEvent} e - Specify the event.
 * @returns {boolean} - To get boolean value.
 * @hidden
 */
export function isMouseMove(e) {
    return e && (e.type === 'mousemove' || e.type === 'pointermove');
}
/**
 * @param {MouseEvent} e - Specify the event.
 * @returns {boolean} - To get boolean value
 * @hidden
 */
export function isMouseUp(e) {
    return e && (e.type === 'mouseup' || e.type === 'pointerup');
}
/**
 * @param {number} keyCode - Specify  the keycode.
 * @returns {boolean} - to get boolean value.
 * @hidden
 */
export function isNavigationKey(keyCode) {
    return (keyCode === keyCodes.UP) || (keyCode === keyCodes.DOWN) || (keyCode === keyCodes.LEFT)
        || (keyCode === keyCodes.RIGHT);
}
/**
 * @param {MouseEvent | TouchEvent} e - To specify the mouse or touch event.
 * @returns {number} - To get client X value.
 * @hidden
 */
export function getClientX(e) {
    return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
}
/**
 * @hidden
 * @param {MouseEvent | TouchEvent} e - To specify the mouse and touch event.
 * @returns {number} - To get client value
 */
export function getClientY(e) {
    return e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
}
/**
 * To get the `pageX` value from the mouse or touch event.
 *
 * @param {MouseEvent | TouchEvent} e - Specifies the mouse or touch event.
 * @returns {number} - Return the `pageX` value.
 * @hidden
 */
export function getPageX(e) {
    return e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
}
/**
 * To get the `pageY` value from the mouse or touch event.
 *
 * @param {MouseEvent | TouchEvent} e - Specifies the mouse or touch event.
 * @returns {number} - Return the `pageY` value.
 * @hidden
 */
export function getPageY(e) {
    return e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
}
/**
 * Get even number based on device pixel ratio
 *
 * @param {number} value - Specify the number
 * @param {boolean} preventDecrease - Specify the boolean value
 * @returns {number} - To get DPR value
 * @hidden
 */
export function getDPRValue(value, preventDecrease) {
    if (window.devicePixelRatio % 1 > 0) {
        var pointValue = (value * window.devicePixelRatio) % 1;
        return value + (pointValue ? (((pointValue > 0.5 || preventDecrease) ? (1 - pointValue) : -1 * pointValue)
            / window.devicePixelRatio) : 0);
    }
    else {
        return value;
    }
}
var config = {
    role: 'role',
    selected: 'aria-selected',
    multiselectable: 'aria-multiselectable',
    busy: 'aria-busy',
    colcount: 'aria-colcount'
};
/**
 * @hidden
 * @param {HTMLElement} target - specify the target.
 * @param {IAriaOptions<boolean>} options - Specify the options.
 * @returns {void} -  to set Aria Options
 */
export function setAriaOptions(target, options) {
    var props = Object.keys(options);
    props.forEach(function (name) {
        if (target) {
            target.setAttribute(config["" + name], options["" + name]);
        }
    });
}
/**
 * @hidden
 * @param {HTMLElement} element - specify the element.
 * @param {Object} component - Specify the component.
 * @returns {void} -  to destroy the component.
 */
export function destroyComponent(element, component) {
    if (element) {
        var compObj = getComponent(element, component);
        if (compObj) {
            compObj.destroy();
        }
    }
}
/**
 * @hidden
 * @param {number} idx - Specify the index
 * @param {number} index - Specify the index
 * @param {string} value - Specify the value.
 * @param {boolean} isCol - Specify the boolean value.
 * @param {Spreadsheet} parent - Specify the parent.
 * @returns {void} - To set resize.
 */
export function setResize(idx, index, value, isCol, parent) {
    var curEle;
    var curEleH;
    var curEleC;
    var preEle;
    var preEleH;
    var preEleC;
    var nxtEle;
    var nxtEleH;
    var nxtEleC;
    var sheet = parent.getActiveSheet();
    var frozenRow = parent.frozenRowCount(sheet);
    var frozenCol = parent.frozenColCount(sheet);
    if (isCol) {
        var header = idx < frozenCol ? parent.getSelectAllContent() : parent.getColumnHeaderContent();
        curEle = header.getElementsByTagName('th')[index];
        curEleH = header.getElementsByTagName('col')[index];
        curEleC = (idx < frozenCol ? parent.getRowHeaderContent() : parent.getMainContent()).getElementsByTagName('col')[index];
    }
    else {
        curEle = curEleH = frozenRow || frozenCol ? parent.getRow(idx, null, frozenCol - 1) :
            parent.getRow(idx, parent.getRowHeaderTable());
        curEleH.style.height = parseInt(value, 10) > 0 ? getDPRValue(parseInt(value, 10)) + 'px' : '2px';
        curEleC = parent.getRow(idx, null, frozenCol);
        curEleC.style.height = parseInt(value, 10) > 0 ? getDPRValue(parseInt(value, 10)) + 'px' : '0px';
        var hdrFntSize = void 0;
        if (sheet.showHeaders) {
            var hdrRow = parent.getRowHeaderContent().getElementsByClassName('e-row');
            var hdrClone = [];
            hdrClone[0] = hdrRow[index].getElementsByTagName('td')[0].cloneNode(true);
            hdrFntSize = findMaxValue(parent.getRowHeaderTable(), hdrClone, false, parent) + 1;
        }
        var contentRow = parent.getMainContent().getElementsByClassName('e-row');
        var contentClone = [];
        var eleTextHeight = 0;
        var eleMaxHeight = 0;
        var rIdx = idx;
        for (var idx_1 = 0; idx_1 < contentRow[index].getElementsByTagName('td').length; idx_1++) {
            var td = contentRow[index].getElementsByTagName('td')[idx_1];
            contentClone[idx_1] = td.cloneNode(true);
            var cell = getCell(rIdx, idx_1, sheet, false, true);
            eleTextHeight = cell.value ? getTextHeight(parent, cell.style) : eleTextHeight;
            eleMaxHeight = eleMaxHeight < eleTextHeight ? eleTextHeight : eleMaxHeight;
            if (td.getElementsByClassName('e-cf-databar')[0]) {
                var rHeight = Number((curEleC.style.height).split('px')[0]);
                parent.notify(applyCF, { indexes: [rIdx, idx_1], cell: cell, ele: td, isRender: true,
                    resizedRowHeight: rHeight });
            }
        }
        var cntFntSize = eleMaxHeight + 1;
        var fntSize = hdrFntSize >= cntFntSize ? hdrFntSize : cntFntSize;
        if (parseInt(curEleC.style.height, 10) < fntSize ||
            (curEle && curEle.classList.contains('e-reach-fntsize') && parseInt(curEleC.style.height, 10) === fntSize)) {
            if (sheet.showHeaders) {
                curEle.classList.add('e-reach-fntsize');
                curEleH.style.lineHeight = parseInt(value, 10) >= 4 ? ((parseInt(value, 10)) - 4) + 'px' :
                    parseInt(value, 10) > 0 ? ((parseInt(value, 10)) - 1) + 'px' : '0px';
            }
            curEleC.style.lineHeight = parseInt(value, 10) > 0 ? ((parseInt(value, 10)) - 1) + 'px' : '0px';
        }
        else {
            if (curEleH) {
                curEleH.style.removeProperty('line-height');
            }
            curEleC.style.removeProperty('line-height');
            if (curEle && curEle.classList.contains('e-reach-fntsize')) {
                curEle.classList.remove('e-reach-fntsize');
            }
        }
    }
    preEleC = curEleC.previousElementSibling;
    nxtEleC = curEleC.nextElementSibling;
    if (preEleC) {
        if (sheet.showHeaders) {
            preEle = curEle.previousElementSibling;
            preEleH = curEleH.previousElementSibling;
        }
        preEleC = curEleC.previousElementSibling;
    }
    if (nxtEleC) {
        if (sheet.showHeaders) {
            nxtEle = curEle.nextElementSibling;
            nxtEleH = curEleH.nextElementSibling;
        }
        nxtEleC = curEleC.nextElementSibling;
    }
    if (parseInt(value, 10) <= 0 && !(curEleC.classList.contains('e-zero') || curEleC.classList.contains('e-zero-start'))) {
        if (preEleC && nxtEleC) {
            if (isCol) {
                if (sheet.showHeaders) {
                    curEleH.style.width = '2px';
                }
                curEleC.style.width = '0px';
            }
            else {
                if (sheet.showHeaders) {
                    curEleH.style.height = '2px';
                }
                curEleC.style.height = '0px';
            }
            if (preEleC.classList.contains('e-zero-start')) {
                if (sheet.showHeaders) {
                    curEle.classList.add('e-zero-start');
                }
                curEleC.classList.add('e-zero-start');
            }
            else {
                if (sheet.showHeaders) {
                    curEle.classList.add('e-zero');
                }
                curEleC.classList.add('e-zero');
            }
            if (nxtEle && !nxtEle.classList.contains('e-zero') && !nxtEle.classList.contains('e-zero-last')) {
                if (sheet.showHeaders) {
                    curEle.classList.add('e-zero-last');
                }
                curEleC.classList.add('e-zero-last');
            }
            if (preEleC.classList.contains('e-zero-last')) {
                if (sheet.showHeaders) {
                    preEle.classList.remove('e-zero-last');
                }
                preEleC.classList.remove('e-zero-last');
            }
            if (sheet.showHeaders && preEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero-end')) {
                    setWidthAndHeight(preEleH, -2, isCol);
                }
                else {
                    setWidthAndHeight(preEleH, -2, isCol);
                }
            }
            else if (sheet.showHeaders) {
                setWidthAndHeight(preEleH, -1, isCol);
            }
            if (sheet.showHeaders && preEle.classList.contains('e-zero-start')) {
                setWidthAndHeight(curEleH, -1, isCol);
            }
            if (sheet.showHeaders && nxtEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero-start')) {
                    while (nxtEle) {
                        if (nxtEle.classList.contains('e-zero') && (parseInt(nxtEleH.style.height, 10) !== 0 && !isCol) ||
                            (parseInt(nxtEleH.style.width, 10) !== 0 && isCol)) {
                            if (isCol) {
                                curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                                nxtEleH.style.width = parseInt(nxtEleH.style.width, 10) - 1 + 'px';
                            }
                            else {
                                curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                                nxtEleH.style.height = parseInt(nxtEleH.style.height, 10) - 1 + 'px';
                            }
                            nxtEle.classList.remove('e-zero');
                            nxtEle.classList.add('e-zero-start');
                            break;
                        }
                        else {
                            var nxtIndex = void 0;
                            nxtEle.classList.remove('e-zero');
                            nxtEle.classList.add('e-zero-start');
                            if (isCol) {
                                nxtIndex = parseInt(nxtEle.getAttribute('aria-colindex'), 10) - 1;
                                nxtEle = parent.getColHeaderTable().getElementsByTagName('th')[nxtIndex + 1];
                                nxtEleH = parent.getColHeaderTable().getElementsByTagName('col')[nxtIndex + 1];
                            }
                            else {
                                nxtIndex = parseInt(nxtEle.getAttribute('aria-rowindex'), 10) - 1;
                                nxtEle = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                                nxtEleH = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                            }
                        }
                    }
                }
                else {
                    setWidthAndHeight(curEleH, -2, isCol);
                }
            }
            else if (sheet.showHeaders) {
                if (nxtEle.classList.contains('e-zero-end')) {
                    if (isCol) {
                        curEleH.style.width = '0px';
                    }
                    else {
                        curEleH.style.height = '0px';
                    }
                }
                else {
                    setWidthAndHeight(nxtEleH, -1, isCol);
                }
            }
        }
        else if (preEleC) {
            if (isCol) {
                if (sheet.showHeaders) {
                    curEleH.style.width = '1px';
                }
                curEleC.style.width = '0px';
            }
            else {
                if (sheet.showHeaders) {
                    curEleH.style.height = '1px';
                }
                curEleC.style.height = '0px';
            }
            if (sheet.showHeaders) {
                curEle.classList.add('e-zero-end');
            }
            curEleC.classList.add('e-zero-end');
            if (sheet.showHeaders) {
                curEle.classList.add('e-zero-last');
            }
            curEleC.classList.add('e-zero-last');
            if (sheet.showHeaders && preEle.classList.contains('e-zero')) {
                setWidthAndHeight(preEleH, -2, isCol);
            }
            else {
                setWidthAndHeight(preEleH, -1, isCol);
            }
        }
        else if (nxtEle) {
            curEle.classList.add('e-zero-start');
            curEleC.classList.add('e-zero-start');
            if (!nxtEle.classList.contains('e-zero')) {
                curEle.classList.add('e-zero-last');
                curEleC.classList.add('e-zero-last');
            }
            if (isCol) {
                curEleH.style.width = '1px';
                curEleC.style.width = '0px';
            }
            else {
                curEleH.style.height = '1px';
                curEleC.style.height = '0px';
            }
            if (sheet.showHeaders && nxtEle.classList.contains('e-zero')) {
                while (nxtEle) {
                    if (nxtEle.classList.contains('e-zero') && (parseInt(nxtEleH.style.width, 10) !== 0
                        && isCol) || (parseInt(nxtEleH.style.height, 10) !== 0 && !isCol)) {
                        if (isCol) {
                            nxtEleH.style.width = parseInt(nxtEleH.style.width, 10) - 1 + 'px';
                            curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                        }
                        else {
                            nxtEleH.style.height = parseInt(nxtEleH.style.height, 10) - 1 + 'px';
                            curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                        }
                        nxtEle.classList.add('e-zero-start');
                        nxtEle.classList.remove('e-zero');
                        break;
                    }
                    else {
                        var nxtIndex = void 0;
                        nxtEle.classList.add('e-zero-start');
                        nxtEle.classList.remove('e-zero');
                        if (isCol) {
                            nxtIndex = parseInt(nxtEle.getAttribute('aria-colindex'), 10) - 1;
                            nxtEleH = parent.getColHeaderTable().getElementsByTagName('col')[nxtIndex + 1];
                            nxtEle = parent.getColHeaderTable().getElementsByTagName('th')[nxtIndex + 1];
                        }
                        else {
                            nxtIndex = parseInt(nxtEle.getAttribute('aria-rowindex'), 10) - 1;
                            nxtEleH = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                            nxtEle = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                        }
                    }
                }
            }
            else if (sheet.showHeaders) {
                setWidthAndHeight(nxtEleH, -1, isCol);
            }
        }
    }
    else if (parseInt(value, 10) > 0) {
        var DPRValue = getDPRValue(parseInt(value, 10)) + 'px';
        if (isCol) {
            curEleH.style.width = DPRValue;
            curEleC.style.width = DPRValue;
        }
        else {
            curEleH.style.height = DPRValue;
            curEleC.style.height = DPRValue;
        }
        if (sheet.showHeaders && preEle && nxtEle) {
            if (preEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero')) {
                    if (isCol) {
                        preEleH.style.width = parseInt(preEleH.style.width, 10) + 2 + 'px';
                        curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                    }
                    else {
                        preEleH.style.height = parseInt(preEleH.style.height, 10) + 2 + 'px';
                        curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                    }
                }
                else {
                    setWidthAndHeight(curEleH, -1, isCol);
                }
            }
            else {
                if (curEle.classList.contains('e-zero')) {
                    setWidthAndHeight(preEleH, 1, isCol);
                }
                else {
                    if (curEle.classList.contains('e-zero-start')) {
                        if (isCol) {
                            preEleH.style.width = parseInt(preEleH.style.width, 10) + 1 + 'px';
                            curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                        }
                        else {
                            preEleH.style.height = parseInt(preEleH.style.height, 10) + 1 + 'px';
                            curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                        }
                    }
                }
            }
            if (nxtEle.classList.contains('e-zero')) {
                setWidthAndHeight(curEleH, -1, isCol);
            }
            else {
                if (curEle.classList.contains('e-zero') || curEle.classList.contains('e-zero-start')) {
                    setWidthAndHeight(nxtEleH, 1, isCol);
                }
            }
            if (curEle.classList.contains('e-zero')) {
                curEle.classList.remove('e-zero');
            }
            if (curEle.classList.contains('e-zero-start')) {
                curEle.classList.remove('e-zero-start');
            }
            if (curEleC.classList.contains('e-zero')) {
                curEleC.classList.remove('e-zero');
            }
            if (curEleC.classList.contains('e-zero-start')) {
                curEleC.classList.remove('e-zero-start');
            }
            if (curEle.classList.contains('e-zero-last')) {
                curEle.classList.remove('e-zero-last');
            }
            if (curEleC.classList.contains('e-zero-last')) {
                curEleC.classList.remove('e-zero-last');
            }
            if (preEle.classList.contains('e-zero') || preEle.classList.contains('e-zero-start')) {
                preEle.classList.add('e-zero-last');
                preEleC.classList.add('e-zero-last');
            }
        }
        else if (sheet.showHeaders && preEle) {
            if (preEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero')) {
                    if (isCol) {
                        curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                        preEleH.style.width = parseInt(preEleH.style.width, 10) + 2 + 'px';
                    }
                    else {
                        curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                        preEleH.style.height = parseInt(preEleH.style.height, 10) + 2 + 'px';
                    }
                }
                else {
                    setWidthAndHeight(curEleH, -1, isCol);
                }
            }
            else {
                if (curEle.classList.contains('e-zero')) {
                    setWidthAndHeight(preEleH, 1, isCol);
                }
                else {
                    setWidthAndHeight(curEleH, -1, isCol);
                }
            }
            if (curEle.classList.contains('e-zero')) {
                curEle.classList.remove('e-zero');
            }
            if (curEle.classList.contains('e-zero-end')) {
                curEle.classList.remove('e-zero-end');
            }
            if (curEleC.classList.contains('e-zero')) {
                curEleC.classList.remove('e-zero');
            }
            if (curEleC.classList.contains('e-zero-end')) {
                curEleC.classList.remove('e-zero-end');
            }
        }
        else if (sheet.showHeaders && nxtEle) {
            if (nxtEle.classList.contains('e-zero')) {
                setWidthAndHeight(curEleH, -1, isCol);
            }
            else if (curEle.classList.contains('e-zero-start')) {
                setWidthAndHeight(nxtEleH, 1, isCol);
                curEle.classList.remove('e-zero-start');
            }
            if (curEle.classList.contains('e-zero')) {
                curEle.classList.remove('e-zero');
            }
            if (curEleC.classList.contains('e-zero')) {
                curEleC.classList.remove('e-zero');
            }
            if (curEle.classList.contains('e-zero-start')) {
                curEle.classList.remove('e-zero-start');
            }
            if (curEleC.classList.contains('e-zero-start')) {
                curEleC.classList.remove('e-zero-start');
            }
        }
    }
}
/**
 * @hidden
 * @param {HTMLElement} trgt - Specify the target element.
 * @param {number} value - specify the number.
 * @param {boolean} isCol - Specify the boolean vlaue.
 * @returns {void} -  to set width and height.
 */
export function setWidthAndHeight(trgt, value, isCol) {
    if (isCol) {
        trgt.style.width = parseInt(trgt.style.width, 10) + value + 'px';
    }
    else {
        trgt.style.height = parseInt(trgt.style.height, 10) + value + 'px';
    }
}
/**
 * @hidden
 * @param {number} lineHeight - Specify the line height for other culture text.
 * @returns {void} -  to set the line height for other culture text.
 */
export function setTextLineHeight(lineHeight) {
    textLineHeight = lineHeight;
}
/**
 * @hidden
 * @param {HTMLElement} table - Specify the table.
 * @param {HTMLElement[]} text - specify the text.
 * @param {boolean} isCol - Specifyt boolean value
 * @param {Spreadsheet} parent - Specify the parent.
 * @param {string} prevData - specify the prevData.
 * @param {boolean} isWrap - Specifyt boolean value
 * @returns {number} - To find maximum value.
 */
export function findMaxValue(table, text, isCol, parent, prevData, isWrap) {
    var myTableDiv = parent.createElement('div', { className: parent.element.className, styles: 'display: block' });
    var myTable = parent.createElement('table', {
        className: table.className + 'e-resizetable',
        styles: 'width: auto;height: auto'
    });
    var myTr = parent.createElement('tr');
    if (isCol) {
        text.forEach(function (element) {
            var tr = myTr.cloneNode();
            tr.appendChild(element);
            myTable.appendChild(tr);
        });
    }
    else {
        text.forEach(function (element) {
            myTr.appendChild(element.cloneNode(true));
        });
        myTable.appendChild(myTr);
    }
    myTableDiv.appendChild(myTable);
    document.body.appendChild(myTableDiv);
    var offsetWidthValue;
    var offsetHeightValue;
    var tableMaxWidth = myTable.getBoundingClientRect().width;
    var tableMaxHeight = myTable.getBoundingClientRect().height;
    if (!isWrap) {
        offsetHeightValue = tableMaxHeight;
        offsetWidthValue = tableMaxWidth;
    }
    else {
        if (isCol && parseInt(prevData, 10) > tableMaxWidth) {
            offsetWidthValue = tableMaxWidth;
        }
        else {
            offsetWidthValue = parseInt(prevData, 10);
        }
        if (!isCol && parseInt(prevData, 10) > tableMaxHeight) {
            offsetHeightValue = tableMaxHeight;
        }
        else {
            offsetHeightValue = parseInt(prevData, 10);
        }
    }
    document.body.removeChild(myTableDiv);
    if (isCol) {
        return Math.ceil(offsetWidthValue);
    }
    else {
        return Math.ceil(offsetHeightValue);
    }
}
/**
 * @hidden
 * @param {CollaborativeEditArgs} options - Specify the collaborative edit arguments.
 * @param {Spreadsheet} spreadsheet - specify the spreadsheet.
 * @param {boolean} isRedo - Specifyt the boolean value.
 * @param {CollaborativeEditArgs[]} undoCollections - Specify the undo collections.
 * @param {object} actionEventArgs - Specify the actionEventArgs.
 * @param {ActionEventArgs} actionEventArgs.eventArgs - Specify the eventArgs.
 * @param {boolean} isRecursive - Specify the recursive.
 * @returns {void} - To update the Action.
 */
export function updateAction(options, spreadsheet, isRedo, undoCollections, actionEventArgs, isRecursive) {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    var eventArgs = options.eventArgs;
    var chartElement;
    var element;
    var args;
    var promise;
    var sortArgs;
    var cellEvtArgs;
    var cellValue;
    var clipboardPromise;
    var model;
    var sheet;
    var column;
    var row;
    var addressInfo;
    var isFromUpdateAction = options.isFromUpdateAction || isUndefined(isRedo);
    if (options.isUndoRedo) {
        isFromUpdateAction = options.isFromUpdateAction = true;
        delete options.isUndoRedo;
        spreadsheet.notify(performUndoRedo, options);
        return;
    }
    if (isFromUpdateAction && !isRecursive) {
        var address = eventArgs.address || eventArgs.range || eventArgs.pastedRange
            || (eventArgs.addressCollection && eventArgs.addressCollection[0]) || eventArgs.dataRange;
        var sheetIndex_1 = isUndefined(eventArgs.sheetIndex) ? isUndefined(eventArgs.sheetIdx)
            ? isUndefined(eventArgs.activeSheetIndex) ? address ? getSheetIndexFromAddress(spreadsheet, address)
                : spreadsheet.activeSheetIndex : eventArgs.activeSheetIndex : eventArgs.sheetIdx : eventArgs.sheetIndex;
        if (sheetIndex_1 !== spreadsheet.activeSheetIndex) {
            var args_1 = {
                sheet: getSheet(spreadsheet, sheetIndex_1), resolveAfterFullDataLoaded: true,
                indexes: [0, 0, 0, 0], promise: new Promise(function (resolve) { resolve((function () { })()); })
            };
            spreadsheet.notify(updateSheetFromDataSource, args_1);
            args_1.promise.then(function () {
                updateAction(options, spreadsheet, isRedo, undoCollections, actionEventArgs, true);
            });
            return;
        }
    }
    var cellSaveArgs;
    var addrInfo;
    var clearArgs;
    var sheetIndex = getSheetIndexFromId(spreadsheet, eventArgs.index);
    var cellIndexes;
    switch (options.action) {
        case 'sorting':
            args = {
                range: options.eventArgs.range,
                sortOptions: options.eventArgs.sortOptions,
                cancel: false
            };
            promise = new Promise(function (resolve) { resolve((function () { })()); });
            sortArgs = { args: args, promise: promise };
            spreadsheet.notify(initiateSort, sortArgs);
            sortArgs.promise.then(function (args) {
                spreadsheet.serviceLocator.getService('cell').refreshRange(getIndexesFromAddress(args.range));
            });
            break;
        case 'cellSave':
            cellEvtArgs = options.eventArgs;
            cellSaveArgs = { element: cellEvtArgs.element, value: cellEvtArgs.value,
                oldValue: cellEvtArgs.oldValue, address: cellEvtArgs.address, displayText: cellEvtArgs.displayText,
                formula: cellEvtArgs.formula, originalEvent: cellEvtArgs.originalEvent, format: cellEvtArgs.format };
            cellValue = cellSaveArgs.formula ? { formula: cellSaveArgs.formula } : { value: cellSaveArgs.value };
            spreadsheet.updateCellInfo(cellValue, cellSaveArgs.address, false, options.eventArgs, isRedo);
            if (isRedo === true) {
                spreadsheet.trigger('cellSave', cellSaveArgs);
            }
            break;
        case 'addNote':
        case 'editNote':
        case 'deleteNote':
            cellIndexes = getIndexesFromAddress(options.eventArgs.address);
            if (isRedo) {
                updateCell(spreadsheet, spreadsheet.getActiveSheet(), { rowIdx: cellIndexes[0], colIdx: cellIndexes[1], preventEvt: true,
                    cell: { notes: options.eventArgs.notes } });
                spreadsheet.serviceLocator.getService('cell').refreshRange(getIndexesFromAddress(eventArgs.address), false, false, true, true, isImported(spreadsheet));
            }
            break;
        case 'cellDelete':
            addrInfo = getAddressInfo(spreadsheet, options.eventArgs.address);
            clearRange(spreadsheet, addrInfo.indices, addrInfo.sheetIndex);
            break;
        case 'format':
            if (eventArgs.requestType === 'CellFormat') {
                if (eventArgs.style && eventArgs.style.border && !isNullOrUndefined(eventArgs.borderType)) {
                    var style = {};
                    Object.assign(style, eventArgs.style, null, true);
                    eventArgs.style.border = undefined;
                    spreadsheet.notify(setCellFormat, { style: eventArgs.style, refreshRibbon: true, range: eventArgs.range,
                        onActionUpdate: true, isUndoRedo: true });
                    eventArgs.style.border = style.border;
                    spreadsheet.setBorder(eventArgs.style, eventArgs.range, eventArgs.borderType);
                    eventArgs.style = style;
                }
                else {
                    spreadsheet.notify(setCellFormat, { style: eventArgs.style, refreshRibbon: true, range: eventArgs.range,
                        onActionUpdate: true, isUndoRedo: true });
                }
                getUpdateUsingRaf(function () { return spreadsheet.selectRange(spreadsheet.getActiveSheet().selectedRange); });
            }
            else {
                spreadsheet.numberFormat(eventArgs.format, eventArgs.range);
            }
            break;
        case 'clipboard':
            clipboardPromise = new Promise(function (resolve) { resolve((function () { })()); });
            addressInfo = spreadsheet.getAddressInfo(eventArgs.copiedRange);
            spreadsheet.notify(eventArgs.copiedInfo.isCut ? cut : copy, {
                range: addressInfo.indices, sId: getSheet(spreadsheet, addressInfo.sheetIndex).id,
                promise: promise, invokeCopy: true, isPublic: true, isFromUpdateAction: true
            });
            clipboardPromise.then(function () { return spreadsheet.notify(paste, {
                range: getIndexesFromAddress(eventArgs.pastedRange),
                sIdx: getSheetIndex(spreadsheet, getSheetNameFromAddress(eventArgs.pastedRange)),
                type: eventArgs.type, isAction: false, isInternal: true, isFromUpdateAction: true
            }); });
            break;
        case 'gridLines':
            spreadsheet.setSheetPropertyOnMute(spreadsheet.sheets[eventArgs.sheetIdx], 'showGridLines', eventArgs.isShow);
            spreadsheet.serviceLocator.getService('sheet').toggleGridlines();
            spreadsheet.notify(refreshRibbonIcons, null);
            break;
        case 'headers':
            spreadsheet.setSheetPropertyOnMute(spreadsheet.sheets[eventArgs.sheetIdx], 'showHeaders', eventArgs.isShow);
            spreadsheet.serviceLocator.getService('sheet').showHideHeaders();
            spreadsheet.notify(refreshRibbonIcons, null);
            break;
        case 'resize':
        case 'resizeToFit':
            if (isFromUpdateAction) {
                sheet = spreadsheet.sheets[eventArgs.sheetIndex];
                column = getColumn(sheet, eventArgs.index);
                row = getRow(sheet, eventArgs.index);
                if ((eventArgs.isCol && column && column.hidden) || (row && row.hidden)) {
                    spreadsheet.notify(hideShow, { startIndex: eventArgs.index, endIndex: eventArgs.index, hide: false, isCol: eventArgs.isCol,
                        sheetIndex: eventArgs.sheetIndex });
                }
            }
            if (eventArgs.isCol) {
                if (eventArgs.hide === undefined) {
                    spreadsheet.setColWidth(isFromUpdateAction && !isUndefined(isRedo) ? eventArgs.oldWidth :
                        eventArgs.width, eventArgs.index, eventArgs.sheetIndex);
                }
                else {
                    spreadsheet.hideColumn(eventArgs.index, eventArgs.index, eventArgs.hide);
                }
            }
            else {
                if (eventArgs.hide === undefined) {
                    spreadsheet.setRowHeight(isFromUpdateAction && !isUndefined(isRedo) ? eventArgs.oldHeight :
                        eventArgs.height, eventArgs.index, eventArgs.sheetIndex);
                }
                else {
                    spreadsheet.hideRow(eventArgs.index, eventArgs.index, eventArgs.hide);
                }
                spreadsheet.notify(refreshFilterCellsOnResize, { rowIndex: eventArgs.index });
            }
            break;
        case 'renameSheet':
            spreadsheet.setSheetPropertyOnMute(spreadsheet.sheets[sheetIndex], 'name', eventArgs.value);
            spreadsheet.notify(sheetNameUpdate, {
                items: spreadsheet.element.querySelector('.e-sheet-tabs-items'),
                value: eventArgs.value,
                idx: sheetIndex
            });
            break;
        case 'hideSheet':
            spreadsheet.notify(hideSheet, { sheetIndex: eventArgs.sheetIndex });
            break;
        case 'showSheet':
            spreadsheet.notify(showSheet, eventArgs);
            break;
        case 'removeSheet':
            spreadsheet.notify(removeSheetTab, { index: eventArgs.index, isAction: true, count: eventArgs.sheetCount, clicked: true });
            break;
        case 'gotoSheet':
            spreadsheet.notify(goToSheet, { selectedIndex: eventArgs.currentSheetIndex, previousIndex: eventArgs.previousSheetIndex });
            break;
        case 'moveSheet':
            moveSheet(spreadsheet, eventArgs.position, eventArgs.sheetIndexes, null, isFromUpdateAction);
            break;
        case 'wrap':
            wrap(options.eventArgs.address, options.eventArgs.wrap, spreadsheet);
            break;
        case 'hideShow':
            if (eventArgs.isCol) {
                spreadsheet.notify(hideShow, { startIndex: eventArgs.startIndex, endIndex: eventArgs.endIndex, isCol: true,
                    hide: isRedo === false ? !eventArgs.hide : eventArgs.hide, sheetIndex: eventArgs.sheetIndex,
                    hiddenIndexes: eventArgs.hiddenIndexes });
            }
            else {
                spreadsheet.notify(hideShow, { startIndex: eventArgs.startIndex, endIndex: eventArgs.endIndex,
                    hide: isRedo === false ? !eventArgs.hide : eventArgs.hide, sheetIndex: eventArgs.sheetIndex });
            }
            break;
        case 'replace':
            spreadsheet.notify(replace, { value: eventArgs.compareValue, replaceValue: eventArgs.replaceValue,
                sheetIndex: eventArgs.sheetIndex, address: eventArgs.address });
            break;
        case 'replaceAll':
            spreadsheet.notify(replaceAll, eventArgs);
            break;
        case 'filter':
            promise = new Promise(function (resolve) { resolve((function () { })()); });
            if (isRedo === false) {
                spreadsheet.notify(initiateFilterUI, { predicates: eventArgs.previousPredicates, range: eventArgs.range, sIdx: eventArgs.sheetIndex, promise: promise, isInternal: true });
            }
            else {
                spreadsheet.notify(initiateFilterUI, { predicates: eventArgs.predicates, range: eventArgs.range, sIdx: eventArgs.sheetIndex, promise: promise,
                    isInternal: true, useFilterRange: eventArgs.useFilterRange, allowHeaderFilter: eventArgs.allowHeaderFilter });
            }
            if (actionEventArgs && !isFromUpdateAction) {
                promise.then(function () {
                    spreadsheet.notify(completeAction, extend({ isUndo: !isRedo, isUndoRedo: !isFromUpdateAction }, actionEventArgs));
                });
            }
            break;
        case 'insert':
            if (options.eventArgs.modelType === 'Sheet') {
                sheet = spreadsheet;
            }
            else {
                sheet = getSheet(spreadsheet, options.eventArgs.activeSheetIndex);
                if (!sheet) {
                    break;
                }
            }
            if (isRedo === false) {
                spreadsheet.notify(deleteModel, { model: sheet, start: options.eventArgs.index, isUndoRedo: true, end: options.eventArgs.index + (options.eventArgs.model.length - 1), modelType: options.eventArgs.modelType });
            }
            else {
                spreadsheet.notify(insertModel, { model: sheet, start: options.eventArgs.index, end: options.eventArgs.index +
                        (options.eventArgs.model.length - 1), modelType: options.eventArgs.modelType, checkCount: isRedo === undefined ?
                        options.eventArgs.sheetCount : null, activeSheetIndex: options.eventArgs.activeSheetIndex, isUndoRedo: true,
                    insertType: options.eventArgs.insertType, isFromUpdateAction: isFromUpdateAction, isRedo: isRedo });
            }
            break;
        case 'delete':
            if (options.eventArgs.modelType === 'Sheet') {
                sheet = spreadsheet;
            }
            else {
                sheet = getSheet(spreadsheet, options.eventArgs.activeSheetIndex);
                if (!sheet) {
                    break;
                }
            }
            if (isRedo === false) {
                spreadsheet.notify(insertModel, { model: sheet, start: options.eventArgs.deletedModel, modelType: options.eventArgs.modelType, columnCellsModel: options.eventArgs.deletedCellsModel, definedNames: options.eventArgs.definedNames, activeSheetIndex: options.eventArgs.activeSheetIndex, isUndoRedo: true,
                    insertType: options.eventArgs.modelType === 'Row' ? 'above' : 'before',
                    conditionalFormats: options.eventArgs.conditionalFormats, prevAction: options.action, freezePane: eventArgs.freezePane });
            }
            else {
                spreadsheet.notify(deleteModel, { model: sheet, start: options.eventArgs.startIndex,
                    checkCount: options.eventArgs.sheetCount, end: options.eventArgs.endIndex, modelType: options.eventArgs.modelType,
                    isUndoRedo: true, insertType: options.eventArgs.modelType === 'Row' ? 'above' : 'before' });
            }
            break;
        case 'validation':
            if (isRedo === false) {
                spreadsheet.notify(removeDataValidation, { range: eventArgs.range });
            }
            else {
                spreadsheet.notify(cellValidation, { rules: { type: eventArgs.type, operator: eventArgs.operator, value1: eventArgs.value1, value2: eventArgs.value2, ignoreBlank: eventArgs.ignoreBlank, inCellDropDown: eventArgs.inCellDropDown },
                    range: eventArgs.range, isAction: true });
            }
            break;
        case 'removeHighlight':
        case 'addHighlight':
            spreadsheet.notify(invalidData, { isRemoveHighlight: options.action === 'removeHighlight', isPublic: true });
            break;
        case 'merge':
            options.eventArgs.isAction = false;
            model = [];
            for (var rIdx = 0, rCnt = eventArgs.model.length; rIdx < rCnt; rIdx++) {
                model.push({ cells: [] });
                for (var cIdx = 0, cCnt = eventArgs.model[rIdx].cells.length; cIdx < cCnt; cIdx++) {
                    model[rIdx].cells[cIdx] = {};
                    Object.assign(model[rIdx].cells[cIdx], eventArgs.model[rIdx].cells[cIdx]);
                }
            }
            if (isRedo === false && eventArgs.mergeCollection) {
                var mergeItem = void 0;
                for (var i = 0; i < eventArgs.mergeCollection.length; i++) {
                    mergeItem = { range: null };
                    Object.assign(mergeItem, eventArgs);
                    mergeItem.range = eventArgs.mergeCollection[i];
                    spreadsheet.notify(setMerge, mergeItem);
                }
            }
            else {
                spreadsheet.notify(setMerge, options.eventArgs);
            }
            if (spreadsheet.calculationMode === 'Manual' && isRedo &&
                spreadsheet.getActiveSheet().isSheetCalculated) {
                for (var i = 0; i < eventArgs.model.length; i++) {
                    var cells = eventArgs.model[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var value = eventArgs.model[i].cells[j].value;
                        model[i].cells[j].value =
                            (!isNullOrUndefined(value) && value !== '' ? value : model[i].cells[j].value);
                    }
                }
            }
            eventArgs.model = model;
            break;
        case 'clear':
            clearArgs = { options: options.eventArgs, isFromUpdateAction: isFromUpdateAction };
            spreadsheet.notify(clearViewer, clearArgs);
            if (!isFromUpdateAction && clearArgs.cfClearActionArgs) {
                eventArgs.cfClearActionArgs.previousConditionalFormats = clearArgs.cfClearActionArgs.previousConditionalFormats;
                eventArgs.cfClearActionArgs.conditionalFormats = clearArgs.cfClearActionArgs.conditionalFormats;
            }
            break;
        case 'conditionalFormat':
            if (isRedo === false) {
                spreadsheet.notify(clearCFRule, { range: eventArgs.range, cfModel: { type: eventArgs.type, cFColor: eventArgs.cFColor,
                        value: eventArgs.value }, sheetIdx: eventArgs.sheetIdx, isUndoRedo: !eventArgs.cancel,
                    isFromUpdateAction: isFromUpdateAction });
            }
            else {
                spreadsheet.notify(setCFRule, { cfModel: { type: eventArgs.type, cFColor: eventArgs.cFColor, value: eventArgs.value,
                        range: eventArgs.range }, sheetIdx: eventArgs.sheetIdx, isUndoRedo: true, isFromUpdateAction: isFromUpdateAction });
            }
            break;
        case 'clearCF':
            if (isRedo === false) {
                spreadsheet.notify(clearCFRule, { oldCFModel: eventArgs.previousConditionalFormats, updatedCFModel: eventArgs.conditionalFormats,
                    range: eventArgs.selectedRange, isUndo: true, sheetIdx: eventArgs.sheetIdx });
            }
            else {
                var clearArgs_1 = { range: eventArgs.selectedRange, sheetIdx: eventArgs.sheetIdx,
                    isUndoRedo: true, isFromUpdateAction: isFromUpdateAction };
                spreadsheet.notify(clearCFRule, clearArgs_1);
                if (!isFromUpdateAction) {
                    eventArgs.previousConditionalFormats = clearArgs_1.oldCFModel;
                    if (clearArgs_1.updatedCFModel.length) {
                        eventArgs.conditionalFormats = clearArgs_1.updatedCFModel;
                    }
                    else {
                        delete eventArgs.conditionalFormats;
                    }
                }
            }
            break;
        case 'insertImage':
            if (isRedo === false) {
                spreadsheet.notify(deleteImage, { id: options.eventArgs.id, sheetIdx: options.eventArgs.sheetIndex + 1, range: options.eventArgs.range,
                    preventEventTrigger: true });
            }
            else {
                spreadsheet.notify(createImageElement, { options: { src: options.eventArgs.imageData, height: options.eventArgs.imageHeight, width: options.eventArgs.imageWidth, id: options.eventArgs.id }, range: options.eventArgs.range, isPublic: false,
                    isUndoRedo: true });
            }
            break;
        case 'deleteImage':
            if (isRedo === false) {
                spreadsheet.notify(createImageElement, { options: { src: options.eventArgs.imageData, height: options.eventArgs.imageHeight, width: options.eventArgs.imageWidth, id: options.eventArgs.id }, range: options.eventArgs.address, isPublic: false,
                    isUndoRedo: true });
            }
            else {
                spreadsheet.notify(deleteImage, { id: options.eventArgs.id, range: options.eventArgs.address, preventEventTrigger: true });
            }
            break;
        case 'imageRefresh':
            element = document.getElementById(options.eventArgs.id);
            if (isRedo === false) {
                spreadsheet.notify(refreshImgCellObj, { prevTop: options.eventArgs.currentTop, prevLeft: options.eventArgs.currentLeft, currentTop: options.eventArgs.prevTop, currentLeft: options.eventArgs.prevLeft, id: options.eventArgs.id, currentHeight: options.eventArgs.prevHeight, currentWidth: options.eventArgs.prevWidth, requestType: 'imageRefresh',
                    prevHeight: options.eventArgs.currentHeight, prevWidth: options.eventArgs.currentWidth, isUndoRedo: true });
            }
            else {
                options.eventArgs.isUndoRedo = true;
                spreadsheet.notify(refreshImgCellObj, options.eventArgs);
            }
            if (element) {
                element.style.height = isRedo === false ? options.eventArgs.prevHeight + 'px' : options.eventArgs.currentHeight + 'px';
                element.style.width = isRedo === false ? options.eventArgs.prevWidth + 'px' : options.eventArgs.currentWidth + 'px';
                element.style.top = isRedo === false ? options.eventArgs.prevTop + 'px' : options.eventArgs.currentTop + 'px';
                element.style.left = isRedo === false ? options.eventArgs.prevLeft + 'px' : options.eventArgs.currentLeft + 'px';
            }
            break;
        case 'insertChart':
            if (isRedo === false) {
                spreadsheet.notify(deleteChart, { id: eventArgs.id, range: eventArgs.posRange || eventArgs.range, isUndoRedo: true });
            }
            else {
                var chartOptions = [{
                        type: eventArgs.type, theme: eventArgs.theme,
                        markerSettings: eventArgs.markerSettings, isSeriesInRows: eventArgs.isSeriesInRows,
                        range: eventArgs.range, id: eventArgs.id, height: eventArgs.height, width: eventArgs.width, top: eventArgs.top,
                        left: eventArgs.left
                    }];
                spreadsheet.notify(setChart, {
                    chart: chartOptions, isUndoRedo: false, range: eventArgs.posRange || eventArgs.range, isInitCell: true, isRedo: true
                });
            }
            break;
        case 'deleteChart':
            if (isRedo === false) {
                var chartOpts = [{
                        type: eventArgs.type, theme: eventArgs.theme, markerSettings: eventArgs.markerSettings,
                        dataLabelSettings: eventArgs.dataLabelSettings, title: eventArgs.title,
                        legendSettings: eventArgs.legendSettings, primaryXAxis: eventArgs.primaryXAxis,
                        primaryYAxis: eventArgs.primaryYAxis, isSeriesInRows: eventArgs.isSeriesInRows,
                        range: eventArgs.range, id: eventArgs.id, height: eventArgs.height,
                        width: eventArgs.width, top: eventArgs.top, left: eventArgs.left
                    }];
                spreadsheet.notify(setChart, { chart: chartOpts, isUndoRedo: false, range: eventArgs.posRange, isInitCell: true, isUndo: true });
            }
            else {
                spreadsheet.notify(deleteChart, { id: eventArgs.id, range: eventArgs.range, isUndoRedo: true });
            }
            break;
        case 'chartRefresh':
            chartElement = document.getElementById(options.eventArgs.id);
            if (chartElement) {
                chartElement.style.height = isRedo === false ? options.eventArgs.prevHeight + 'px' : options.eventArgs.currentHeight + 'px';
                chartElement.style.width = isRedo === false ? options.eventArgs.prevWidth + 'px' : options.eventArgs.currentWidth + 'px';
                chartElement.style.top = isRedo === false ? options.eventArgs.prevTop + 'px' : options.eventArgs.currentTop + 'px';
                chartElement.style.left = isRedo === false ? options.eventArgs.prevLeft + 'px' : options.eventArgs.currentLeft + 'px';
            }
            if (isRedo === false) {
                spreadsheet.notify(refreshChartCellObj, extend({}, options.eventArgs, {
                    currentColIdx: options.eventArgs.prevColIdx, currentHeight: options.eventArgs.prevHeight,
                    currentLeft: options.eventArgs.prevLeft, currentRowIdx: options.eventArgs.prevRowIdx,
                    currentTop: options.eventArgs.prevTop, currentWidth: options.eventArgs.prevWidth,
                    prevColIdx: options.eventArgs.currentColIdx, prevHeight: options.eventArgs.currentHeight,
                    prevLeft: options.eventArgs.currentLeft, prevRowIdx: options.eventArgs.currentRowIdx,
                    prevTop: options.eventArgs.currentTop, prevWidth: options.eventArgs.currentWidth, isUndoRedo: true
                }));
                spreadsheet.notify(refreshChartSize, {
                    height: options.eventArgs.prevHeight.toString(),
                    width: options.eventArgs.prevWidth.toString(), overlayEle: chartElement
                });
            }
            else {
                options.eventArgs.isUndoRedo = true;
                spreadsheet.notify(refreshChartCellObj, options.eventArgs);
                spreadsheet.notify(refreshChartSize, {
                    height: options.eventArgs.currentHeight.toString(),
                    width: options.eventArgs.currentWidth.toString(), overlayEle: chartElement
                });
            }
            break;
        case 'chartDesign':
            spreadsheet.notify(chartDesignTab, options.eventArgs);
            break;
        case 'autofill':
            if (isFromUpdateAction && eventArgs.undoArgs) {
                eventArgs.undoArgs.isFromUpdateAction = eventArgs.undoArgs.isUndo = eventArgs.undoArgs.preventEvt = true;
                eventArgs.undoArgs.isPublic = true;
                spreadsheet.notify(performUndoRedo, eventArgs.undoArgs);
            }
            spreadsheet.notify(setAutoFill, { fillRange: options.eventArgs.fillRange, dataRange: options.eventArgs.dataRange,
                fillType: options.eventArgs.fillType, direction: options.eventArgs.direction, cells: options.eventArgs.beforeActionData });
            break;
        case 'removeValidation':
            if (isRedo !== false) {
                spreadsheet.notify(removeDataValidation, { range: eventArgs.range, isCol: eventArgs.isColSelected });
            }
            break;
        case 'addDefinedName':
            if (isRedo === false) {
                spreadsheet.notify(workbookFormulaOperation, { action: 'removeDefinedName', isRemoved: false, definedName: eventArgs.name, scope: eventArgs.scope, isEventTrigger: true });
            }
            else {
                var definedName = { name: eventArgs.name, refersTo: eventArgs.refersTo, scope: eventArgs.scope, comment: eventArgs.comment };
                spreadsheet.notify(workbookFormulaOperation, { action: 'addDefinedName', isAdded: false, definedName: definedName, isEventTrigger: true });
            }
            break;
        case 'hyperlink':
            spreadsheet.notify(setLinkModel, { hyperlink: eventArgs.hyperlink, cell: eventArgs.address, displayText: eventArgs.displayText,
                isUndoRedo: true });
            spreadsheet.serviceLocator.getService('cell').refreshRange(getIndexesFromAddress(eventArgs.address), false, false, false, true, isImported(spreadsheet));
            break;
        case 'removeHyperlink':
            spreadsheet.notify(removeHyperlink, { range: eventArgs.address, preventEventTrigger: true });
            break;
        case 'freezePanes':
            spreadsheet.freezePanes(eventArgs.row, eventArgs.column, eventArgs.sheetIndex);
            break;
        case 'duplicateSheet':
            duplicateSheet(spreadsheet, eventArgs.sheetIndex, null, isFromUpdateAction);
            break;
        case 'protectSheet':
            if (eventArgs.isProtected) {
                spreadsheet.notify(protectsheetHandler, eventArgs);
            }
            else {
                spreadsheet.setSheetPropertyOnMute(getSheet(spreadsheet, eventArgs.sheetIndex), 'password', '');
                spreadsheet.notify(applyProtect, { isActive: true, sheetIndex: eventArgs.sheetIndex });
            }
            break;
        case 'protectWorkbook':
            if (eventArgs.isProtected) {
                spreadsheet.notify(setProtectWorkbook, eventArgs);
            }
            else {
                spreadsheet.notify(removeWorkbookProtection, null);
            }
            break;
        case 'lockCells':
            spreadsheet.notify(setLockCells, eventArgs);
    }
}
/**
 * @hidden
 * @param {Workbook} workbook - Specify the workbook
 * @param {number} rowIdx - specify the roe index
 * @param {number} colIdx - specify the column Index.
 * @param {number} sheetIdx - specify the sheet index.
 * @returns {boolean} - Returns the boolean value.
 */
export function hasTemplate(workbook, rowIdx, colIdx, sheetIdx) {
    var sheet = workbook.sheets[sheetIdx];
    var ranges = sheet.ranges;
    var range;
    for (var i = 0, len = ranges.length; i < len; i++) {
        if (ranges[i].template) {
            range = getRangeIndexes(ranges[i].address.length ? ranges[i].address : ranges[i].startCell);
            if (range[0] <= rowIdx && range[1] <= colIdx && range[2] >= rowIdx && range[3] >= colIdx) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Setting row height in view an model.
 *
 * @hidden
 * @param {Spreadsheet} parent - Specify the parent
 * @param {SheetModel} sheet - specify the column width
 * @param {number} height - specify the style.
 * @param {number} rowIdx - specify the rowIdx
 * @param {HTMLElement} row - specify the row
 * @param {HTMLElement} hRow - specify the hRow.
 * @param {boolean} notifyRowHgtChange - specify boolean value.
 * @param {boolean} outsideViewport - Specify whether the row is outside the viewport.
 * @returns {void} - Setting row height in view an model.
 */
export function setRowEleHeight(parent, sheet, height, rowIdx, row, hRow, notifyRowHgtChange, outsideViewport) {
    if (notifyRowHgtChange === void 0) { notifyRowHgtChange = true; }
    var prevHgt = getRowHeight(sheet, rowIdx, true);
    var dprHgt = getDPRValue(height);
    if (!outsideViewport) {
        var frozenCol = parent.frozenColCount(sheet);
        row = row || (sheet.frozenRows ? parent.getRow(rowIdx, null, frozenCol) : parent.getRow(rowIdx));
        if (row) {
            row.style.height = dprHgt + "px";
        }
        if (sheet.frozenColumns) {
            hRow = hRow || parent.getRow(rowIdx, null, frozenCol - 1);
        }
        else {
            var frozenRow = parent.frozenRowCount(sheet);
            hRow = hRow || parent.getRow(rowIdx, rowIdx < frozenRow ? parent.sheetModule.getSelectAllTable() : parent.getRowHeaderTable());
        }
        if (hRow) {
            hRow.style.height = dprHgt + "px";
        }
    }
    setRowHeight(sheet, rowIdx, height);
    parent.setProperties({ sheets: parent.sheets }, true);
    if (notifyRowHgtChange) {
        parent.notify(rowHeightChanged, { rowIdx: rowIdx, threshold: dprHgt - prevHgt });
    }
}
/**
 * @hidden
 * @param {Workbook} context - Specify the context
 * @param {CellStyleModel} style - specify the style.
 * @param {number} lines - specify the lines
 * @param {number} lineHeight - Specify the line height.
 * @returns {number} - get Text Height
 */
export function getTextHeight(context, style, lines, lineHeight) {
    if (lines === void 0) { lines = 1; }
    var fontSize = (style && style.fontSize) || context.cellStyle.fontSize;
    var fontSizePx = fontSize.indexOf('pt') > -1 ? parseInt(fontSize, 10) / 0.75 : parseInt(fontSize, 10);
    var hgt = fontSizePx * (lineHeight || getLineHeight(style && style.fontFamily ? style : context.cellStyle)) * lines;
    return Math.ceil(hgt % 1 > 0.9 ? hgt + 1 : hgt); // 0.9 -> if it is nearest value adding extra 1 pixel
}
/**
 * @hidden
 * @param {CellStyleModel} style - cell style
 * @returns {number} - returns line height
 */
export function getLineHeight(style) {
    var lineHeight = textLineHeight;
    if (style) {
        if (style.fontFamily === 'Arial Black' || style.fontFamily === 'Comic Sans MS') {
            lineHeight = 1.44;
        }
        else if (style.fontFamily === '"Segoe UI", sans-serif') {
            lineHeight = 1.36;
        }
    }
    return lineHeight;
}
/**
 * @hidden
 * @param {string} text - Specify the text
 * @param {CellStyleModel} style - specify the style.
 * @param {CellStyleModel} parentStyle - specify the parentStyle
 * @param  {boolean} preventDpr - specify the preventDpr.
 * @returns {number} - get Text Width
 */
export function getTextWidth(text, style, parentStyle, preventDpr) {
    if (!style) {
        style = parentStyle;
    }
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = (style.fontStyle || parentStyle.fontStyle) + ' ' + (style.fontWeight || parentStyle.fontWeight) + ' '
        + (style.fontSize || parentStyle.fontSize) + ' ' + (style.fontFamily || parentStyle.fontFamily);
    return preventDpr ? context.measureText(text).width : getDPRValue(context.measureText(text).width, true);
}
/**
 * @hidden
 * @param {string} text - Specify the text
 * @param {number} colwidth - specify the column width
 * @param {CellStyleModel} style - specify the style.
 * @param {CellStyleModel} parentStyle - specify the parentStyle
 * @returns {number} - Setting maximum height while doing formats and wraptext
 */
export function getLines(text, colwidth, style, parentStyle) {
    var width;
    var splitTextArr;
    var lWidth;
    var cWidth;
    var prevWidth = 0;
    var textArr = text.toString().split(' ');
    var spaceWidth = getTextWidth(' ', style, parentStyle);
    var hypenWidth;
    var lines;
    var cnt = 0;
    var lineCnt = 0;
    var maxCnt = 0;
    var calculateCount = function (txt, isHypenSplit) {
        if (prevWidth) {
            cnt++;
        }
        if (width / colwidth >= 1) {
            txt.split('').forEach(function (val) {
                cWidth = getTextWidth(val, style, parentStyle, true);
                lWidth += cWidth;
                if (lWidth > colwidth) {
                    cnt++;
                    lWidth = cWidth;
                }
            });
            width = getDPRValue(lWidth, true);
        }
        if (!isHypenSplit) {
            addSpace(width);
        }
        prevWidth = width;
    };
    var addSpace = function (size) {
        width += ((size + spaceWidth) / colwidth >= 1 ? 0 : spaceWidth);
    };
    textArr.forEach(function (txt) {
        lWidth = 0;
        cWidth = 0;
        width = getTextWidth(txt, style, parentStyle);
        lines = (prevWidth + width) / colwidth;
        if (lines > 1) {
            splitTextArr = txt.split('-');
            if (splitTextArr.length > 1) {
                var lastIdx_1 = splitTextArr.length - 1;
                splitTextArr.forEach(function (splitText, index) {
                    lWidth = 0;
                    cWidth = 0;
                    if (!hypenWidth) {
                        hypenWidth = getTextWidth('-', style, parentStyle);
                    }
                    width = getTextWidth(splitText, style, parentStyle);
                    if (index < lastIdx_1) {
                        width += hypenWidth;
                    }
                    lines = (prevWidth + width) / colwidth;
                    if (lines >= 1) {
                        calculateCount(splitText, index !== lastIdx_1);
                    }
                    else {
                        if (index === lastIdx_1 && textArr[textArr.length - 1] !== txt) {
                            addSpace(prevWidth + width);
                        }
                        prevWidth += width;
                    }
                });
            }
            else {
                calculateCount(txt, false);
            }
        }
        else {
            addSpace(prevWidth + width);
            prevWidth += width;
        }
    });
    if (prevWidth) {
        lineCnt = (prevWidth - spaceWidth) / colwidth;
        maxCnt = parseFloat((lineCnt).toString().split('.')[0]);
        cnt += (lineCnt + 0.05 >= maxCnt + 1 ? Math.ceil(lineCnt) + 1 : Math.ceil(lineCnt));
    }
    return cnt;
}
/**
 * calculation for width taken by border inside a cell
 *
 * @param {number} rowIdx - Specify the row index.
 * @param {number} colIdx - Specify the column index.
 * @param {SheetModel} sheet - Specify the sheet.
 * @returns {number} - get border width.
 * @hidden
 */
export function getBorderWidth(rowIdx, colIdx, sheet) {
    var width = 0;
    var cell = getCell(rowIdx, colIdx, sheet, null, true);
    var rightSideCell = getCell(rowIdx, colIdx + 1, sheet, null, true);
    if (cell.style) {
        if (cell.style.border) {
            width = (colIdx === 0 ? 2 : 1) * parseFloat(cell.style.border.split('px')[0]);
        }
        else {
            if (colIdx === 0 && cell.style.borderLeft) {
                width = parseFloat(cell.style.borderLeft.split('px')[0]);
            }
            if (cell.style.borderRight) {
                width += parseFloat(cell.style.borderRight.split('px')[0]);
            }
        }
    }
    if (!(cell.style && (cell.style.border || cell.style.borderRight)) && rightSideCell.style && rightSideCell.style.borderLeft) {
        width += parseFloat(rightSideCell.style.borderLeft.split('px')[0]);
    }
    return width > 0 && width < 1 ? 1 : width;
}
/**
 * calculation for height taken by border inside a cell
 *
 * @param {number} rowIdx - Specify the row index.
 * @param {number} colIdx - Specify the column index.
 * @param {SheetModel} sheet - Specify the sheet.
 * @returns {number} - get border height.
 * @hidden
 */
export function getBorderHeight(rowIdx, colIdx, sheet) {
    var height = 0;
    var cell = getCell(rowIdx, colIdx, sheet, null, true);
    if (cell.style) {
        if (cell.style.border) {
            height = (rowIdx === 0 ? 2 : 1) * parseFloat(cell.style.border.split('px')[0]);
        }
        else {
            if (rowIdx === 0 && cell.style.borderTop) {
                height = parseFloat(cell.style.borderTop.split('px')[0]);
            }
            if (cell.style.borderBottom) {
                height += parseFloat(cell.style.borderBottom.split('px')[0]);
            }
        }
    }
    var bottomSideCell = getCell(rowIdx + 1, colIdx, sheet, null, true);
    if (!(cell.style && (cell.style.border || cell.style.borderBottom)) && bottomSideCell.style && bottomSideCell.style.borderTop) {
        height += parseFloat(bottomSideCell.style.borderTop.split('px')[0]);
    }
    return Math.ceil(height) || 1; // 1 -> For default bottom border
}
/**
 * Calculating column width by excluding cell padding and border width
 *
 * @param {SheetModel} sheet - Specify the sheet
 * @param {number} rowIdx - Specify the row index.
 * @param {number} startColIdx - Specify the start column index.
 * @param {number} endColIdx - Specify the end column index.
 * @returns {number} - get excluded column width.
 * @hidden
 */
export function getExcludedColumnWidth(sheet, rowIdx, startColIdx, endColIdx) {
    if (endColIdx === void 0) { endColIdx = startColIdx; }
    return getColumnsWidth(sheet, startColIdx, endColIdx, true) - getDPRValue((4 + (getBorderWidth(rowIdx, startColIdx, sheet) || 1))); // 4 -> For cell padding
}
/**
 * @param {Workbook} context - Specify the Workbook.
 * @param {number} rowIdx - Specify the row index.
 * @param {number} colIdx - Specify the column index.
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {CellStyleModel} style - Specify the style.
 * @param {number} lines - Specify the lines.
 * @param {number} lineHeight - Specify the line height.
 * @returns {number} - get text height with border.
 * @hidden
 */
export function getTextHeightWithBorder(context, rowIdx, colIdx, sheet, style, lines, lineHeight) {
    return getTextHeight(context, style, lines, lineHeight) + getBorderHeight(rowIdx, colIdx, sheet);
}
/**
 * Setting maximum height while doing formats and wraptext
 *
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet
 * @param {number} rIdx - specify the row Index
 * @param {number} cIdx - specify the column Index.
 * @param {number} hgt - specify the hgt
 * @returns {void} - Setting maximum height while doing formats and wraptext
 */
export function setMaxHgt(sheet, rIdx, cIdx, hgt) {
    if (!sheet.maxHgts[rIdx]) {
        sheet.maxHgts[rIdx] = {};
    }
    sheet.maxHgts[rIdx][cIdx] = hgt;
}
/**
 * Getting maximum height by comparing each cell's modified height.
 *
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {number} rIdx - Specify the row index.
 * @returns {number} - Getting maximum height by comparing each cell's modified height.
 */
export function getMaxHgt(sheet, rIdx) {
    var maxHgt = 0;
    var rowHgt = sheet.maxHgts[rIdx];
    if (rowHgt) {
        Object.keys(rowHgt).forEach(function (key) {
            if (rowHgt["" + key] > maxHgt) {
                maxHgt = rowHgt["" + key];
            }
        });
    }
    return maxHgt;
}
/**
 * @hidden
 * @param {HTMLElement} ele - Specify the element.
 * @returns {void} - Specify the focus.
 */
export function focus(ele) {
    if (!document.activeElement.classList.contains('e-text-findNext-short')) {
        if (Browser.isIE) {
            var scrollX_1 = window.scrollX;
            var scrollY_1 = window.scrollY;
            ele.focus();
            window.scrollTo(scrollX_1, scrollY_1);
        }
        else {
            if (ele.classList.contains('e-input')) {
                var inputEle = ele;
                var position = inputEle.value.length;
                inputEle.setSelectionRange(position, position);
            }
            ele.focus({ preventScroll: true });
        }
    }
}
/**
 * Checks whether a specific range of cells is locked or not.
 *
 * @param {Spreadsheet} parent - Specify the spreadsheet.
 * @param {number[]} rangeIndexes - Specify the range indexes.
 * @returns {boolean} - Returns true if any of the cells is locked and returns false if none of the cells is locked.
 * @hidden
 */
export function isLockedCells(parent, rangeIndexes) {
    var sheet = parent.getActiveSheet();
    var hasLockCell;
    var address = !isNullOrUndefined(rangeIndexes) ? rangeIndexes : getSwapRange(getRangeIndexes(sheet.selectedRange));
    for (var row = address[0]; row <= address[2]; row++) {
        for (var col = address[1]; col <= address[3]; col++) {
            var cell = getCell(row, col, sheet);
            if (isLocked(cell, getColumn(sheet, col))) {
                hasLockCell = true;
                break;
            }
        }
    }
    return hasLockCell;
}
/**
 * Checks whether the range is discontinuous or not.
 *
 * @param {string} range - Specify the sheet
 * @returns {boolean} - Returns true if the range is discontinuous range.
 * @hidden
 */
export function isDiscontinuousRange(range) {
    return range.includes(' ');
}
/**
 * @hidden
 * @param {Spreadsheet} context - Specifies the context.
 * @param {number[]} range - Specifies the address range.
 * @param {number} sheetIdx - Specifies the sheetIdx.
 * @returns {void} - To clear the range.
 */
export function clearRange(context, range, sheetIdx) {
    var sheet = getSheet(context, sheetIdx);
    var skip;
    var cell;
    var newCell;
    var td;
    var prop;
    var uiRefresh = sheetIdx === context.activeSheetIndex;
    var cfRefreshAll;
    var cf = sheet.conditionalFormats && sheet.conditionalFormats.length && [].slice.call(sheet.conditionalFormats);
    var cfRule = [];
    var isCellUpdated = false;
    for (var sRIdx = range[0], eRIdx = range[2]; sRIdx <= eRIdx; sRIdx++) {
        if (isFilterHidden(sheet, sRIdx)) {
            continue;
        }
        for (var sCIdx = range[1], eCIdx = range[3]; sCIdx <= eCIdx; sCIdx++) {
            var args = { cellIdx: [sRIdx, sCIdx], isUnique: false,
                uniqueRange: '' };
            context.notify(checkUniqueRange, args);
            skip = false;
            if (args.uniqueRange !== '') {
                var rangeIndex = getIndexesFromAddress(args.uniqueRange);
                skip = getCell(rangeIndex[0], rangeIndex[1], sheet).value === '#SPILL!';
            }
            // Determine if it's the last iteration of the given range.
            var isLastIteration = (sRIdx === eRIdx) && (sCIdx === eCIdx);
            if (!args.isUnique || skip) {
                cell = getCell(sRIdx, sCIdx, sheet);
                if ((cell && cell.value === 0) || cell && cell.value && (isNullOrUndefined(cell.value) || cell.value !== '')) {
                    isCellUpdated = false;
                    newCell = {};
                    if (cell.formula) {
                        newCell.formula = '';
                    }
                    if (cell.value || cell.value === 0) {
                        newCell.value = '';
                    }
                    if (cell.hyperlink) {
                        newCell.hyperlink = '';
                    }
                    var mergeArgs = { sheet: sheet, cell: cell, rowIdx: sRIdx, colIdx: sCIdx };
                    if (cell.colSpan > 1 || cell.rowSpan > 1) {
                        setVisibleMergeIndex(mergeArgs);
                    }
                    td = context.getCell(mergeArgs.rowIdx, mergeArgs.colIdx);
                    prop = { cell: newCell, rowIdx: sRIdx, colIdx: sCIdx, valChange: true, uiRefresh: uiRefresh, td: td,
                        cellDelete: true, isDelete: !isLastIteration, deletedRange: range };
                    if (!Object.keys(newCell).length || updateCell(context, sheet, prop)) {
                        continue;
                    }
                    if (cf && !cfRefreshAll) {
                        cfRefreshAll = prop.isFormulaDependent;
                        if (!cfRefreshAll) {
                            updateCFModel(cf, cfRule, sRIdx, sCIdx);
                        }
                    }
                    if (td) {
                        if (td.querySelector('.e-cf-databar')) {
                            td.removeChild(td.querySelector('.e-cf-databar'));
                        }
                        if (td.querySelector('.e-iconsetspan')) {
                            td.removeChild(td.querySelector('.e-iconsetspan'));
                        }
                    }
                }
                else {
                    if (!isCellUpdated && prop) {
                        isCellUpdated = isLastIteration;
                        prop.isDelete = !isLastIteration;
                        if (!Object.keys(newCell).length || updateCell(context, sheet, prop)) {
                            continue;
                        }
                    }
                }
            }
        }
    }
    if ((cfRule.length || cfRefreshAll) && uiRefresh) {
        context.notify(applyCF, { cfModel: !cfRefreshAll && cfRule, refreshAll: cfRefreshAll, isAction: true, isEdit: true });
    }
}
/**
 * @param {Spreadsheet} parent - Specifies the spreadsheet instance.
 * @param {number} top - Specifies the top.
 * @returns {number} - It returns bottom offset.
 * @hidden
 */
export function getBottomOffset(parent, top) {
    var hgt = 0;
    var sheet = parent.getActiveSheet();
    var viewPortHeight = (sheet.frozenRows ? parent.viewport.height - parent.sheetModule.getColHeaderHeight(sheet, true) :
        parent.viewport.height) - 17 || 20;
    for (var rowIdx = top;; rowIdx++) {
        hgt += getRowHeight(sheet, rowIdx, true);
        if (hgt >= viewPortHeight) {
            return { index: rowIdx, height: hgt };
        }
    }
}
/**
 * @param {Spreadsheet} parent - Specifies the spreadsheet instance.
 * @param {number} left - Specifies the left.
 * @returns {number} -It returns right index using given left value.
 * @hidden
 */
export function getRightIdx(parent, left) {
    var width = 0;
    var sheet = parent.getActiveSheet();
    var contWidth = parent.getMainContent().parentElement.offsetWidth -
        parent.sheetModule.getRowHeaderWidth(sheet) - parent.sheetModule.getScrollSize();
    for (var i = left;; i++) {
        width += getColumnWidth(sheet, i, null, true);
        if (width >= contWidth) {
            return i;
        }
    }
}
/**
 * @param {Spreadsheet} spreadsheet - Specifies the spreadsheet instance.
 * @param {number} minWidth - Specifies the minimum width.
 * @returns {void}
 * @hidden
 */
export function setColMinWidth(spreadsheet, minWidth) {
    spreadsheet.renderModule.setSheetPanelSize(minWidth);
}
/**
 * Calculating resolution based windows value
 *
 * @param {number} size - Specify the end column index.
 * @returns {number} - get excluded column width.
 * @hidden
 */
export function addDPRValue(size) {
    if (window.devicePixelRatio % 1 > 0) {
        var pointValue = (size * window.devicePixelRatio) % 1;
        return size + (pointValue ? ((pointValue > 0.5 ? (1 - pointValue) : -1 * pointValue) / window.devicePixelRatio) : 0);
    }
    return size;
}
/**
 * @param {Spreadsheet} context - Specifies the spreadsheet instance.
 * @param {string[]} keys - Specifies key array.
 * @returns {string} - It returns sheet property of the given key and context.
 * @hidden
 */
export function getSheetProperties(context, keys) {
    var skipProps = [];
    if (keys) {
        /* eslint-disable */
        var propList = Object.getPrototypeOf(new Cell(context, 'cells', {}, true)).constructor.prototype.propList;
        var cellProps = propList.colPropNames.concat(propList.complexPropNames).concat(propList.propNames);
        cellProps.push('formattedText');
        propList = Object.getPrototypeOf(new Row(context, 'rows', {}, true)).constructor.prototype.propList;
        var rowProps = propList.colPropNames.concat(propList.complexPropNames).concat(propList.propNames);
        propList = Object.getPrototypeOf(new Column(context, 'columns', {}, true)).constructor.prototype.propList;
        var colProps = propList.colPropNames.concat(propList.complexPropNames).concat(propList.propNames);
        propList = Object.getPrototypeOf(new Sheet(context, 'sheets', {}, true)).constructor.prototype.propList;
        /* eslint-enable */
        var sheetProps = propList.colPropNames.concat(propList.complexPropNames).concat(propList.propNames);
        sheetProps.splice(sheetProps.indexOf('rows'), 1);
        sheetProps.splice(sheetProps.indexOf('columns'), 1);
        sheetProps.splice(sheetProps.indexOf('cells'), 1);
        rowProps.splice(rowProps.indexOf('cells'), 1);
        skipProps.push.apply(skipProps, sheetProps);
        if (keys.indexOf('rows') === -1) {
            skipProps.push.apply(skipProps, rowProps);
        }
        if (keys.indexOf('columns') === -1) {
            skipProps.push.apply(skipProps, colProps);
        }
        if (keys.indexOf('cells') === -1) {
            skipProps.push.apply(skipProps, cellProps);
        }
        var idx_2;
        keys.forEach(function (key) {
            idx_2 = skipProps.indexOf(key);
            if (skipProps.indexOf(key) > -1) {
                skipProps.splice(idx_2, 1);
            }
        });
    }
    else {
        skipProps.push('ranges');
    }
    var eventArgs = { skipProps: skipProps };
    context.notify('getStringifyObject', eventArgs);
    return eventArgs.model;
}
/**
 * Returns the row indexes and column indexes of the charts in the active sheet
 *
 * @param {Spreadsheet} context - Specifies the Spreadsheet instance.
 * @returns { {chart: ChartModel, chartRowIdx: number, chartColIdx: number}[] } - Returns the row indexes and column indexes of the charts in the active sheet
 * @hidden
 */
export function getChartsIndexes(context) {
    var chart;
    var chartIndexes = [];
    var sheetName = context.getActiveSheet().name;
    for (var i = 0, len = context.chartColl.length; i < len; i++) {
        chart = context.chartColl[i];
        if (sheetName === getSheetNameFromAddress(chart.range)) {
            var prevTop = { clientY: chart.top, isImage: true };
            var prevLeft = { clientX: chart.left, isImage: true };
            context.notify(getRowIdxFromClientY, prevTop);
            context.notify(getColIdxFromClientX, prevLeft);
            chartIndexes.push({ chart: chart, chartRowIdx: prevTop.clientY, chartColIdx: prevLeft.clientX });
        }
    }
    return chartIndexes;
}
/**
 * Checks if the given range string represents a valid column range.
 *
 * @param {string} range - The range string to validate.
 * @returns {boolean} - Returns `true` if the range is a valid column range, otherwise `false`.
 * @hidden
 */
export function isColumnRange(range) {
    return /^[A-Za-z]+:[A-Za-z]+$/.test(range);
}
/**
 * Checks if the given range string represents a valid row range.
 *
 * @param {string} range - The range string to validate.
 * @returns {boolean} - Returns `true` if the range is a valid row range, otherwise `false`.
 * @hidden
 */
export function isRowRange(range) {
    return /^[0-9]+:[0-9]+$/.test(range);
}
/**
 * Sets the standard height for a specified sheet in a spreadsheet.
 *
 * @param {Spreadsheet} context - The spreadsheet instance.
 * @param {number} sheetIndex - The index of the sheet to set the standard height.
 * @param {number} standardHeight - The standard height to set for the sheet.
 * @returns {void}
 * @hidden
 */
export function setStandardHeight(context, sheetIndex, standardHeight) {
    var sheet = context.sheets[sheetIndex];
    if (sheet) {
        sheet.standardHeight = standardHeight;
        context.dataBind();
    }
}
/**
 * Retrieves the standard height of a specific sheet in the spreadsheet.
 *
 * @param {Spreadsheet} context - The spreadsheet instance.
 * @param {number} sheetIndex - The index of the sheet to retrieve the standard height.
 * @returns {number} - The standard height of the specified sheet.
 * @hidden
 */
export function getStandardHeight(context, sheetIndex) {
    return context.sheets[sheetIndex].standardHeight;
}
/**
 * Removes the specified elements from the DOM.
 *
 * @param {HTMLElement[]} elements - An array of HTML elements that need to be removed from the DOM.
 * @returns {void}
 * @hidden
 */
export function removeElements(elements) {
    elements.forEach(function (element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}
