import { Browser, EventHandler, getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { isFormulaBarEdit, colWidthChanged, mouseDown, getUpdateUsingRaf } from '../index';
import { contentLoaded, spreadsheetDestroyed, onVerticalScroll, onHorizontalScroll, getScrollBarWidth, updateNoteContainer, focusRenameInput } from '../common/index';
import { onContentScroll, deInitProperties, updateScroll, selectionStatus } from '../common/index';
import { virtualContentLoaded, updateScrollValue } from '../common/index';
import { getRowHeight, getColumnWidth, getCellAddress, skipHiddenIdx } from '../../workbook/index';
/**
 * The `Scroll` module is used to handle scrolling behavior.
 *
 * @hidden
 */
var Scroll = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet scroll module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet scroll module.
     * @private
     */
    function Scroll(parent) {
        this.clientX = 0;
        /** @hidden */
        this.isKeyScroll = true;
        this.parent = parent;
        this.addEventListener();
        this.initProps();
    }
    Scroll.prototype.onContentScroll = function (e) {
        if (!this.parent) {
            return;
        }
        var target = this.parent.getMainContent().parentElement;
        var scrollLeft = e.scrollLeft;
        var top = e.scrollTop || target.scrollTop;
        var left = scrollLeft && this.parent.enableRtl ? this.initScrollValue - scrollLeft : scrollLeft;
        var scrollArgs;
        var prevSize;
        if (this.parent.allowAutoFill) {
            var elem = document.querySelector('#' + this.parent.element.id + '_autofilloptionbtn-popup');
            var DDBElem = document.querySelector('#' + this.parent.element.id + '_autofilloptionbtn');
            if (elem) {
                var DDBObj = getComponent(DDBElem, 'dropdown-btn');
                DDBObj.toggle();
            }
        }
        if (!isNullOrUndefined(scrollLeft) && this.prevScroll.scrollLeft !== left) {
            var scrollRight = left > this.prevScroll.scrollLeft;
            prevSize = this.offset.left.size;
            this.offset.left = this.getColOffset(left, scrollRight, e.skipHidden);
            if (!e.preventScroll) {
                this.parent.getColumnHeaderContent().scrollLeft = scrollLeft;
                this.parent.getMainContent().scrollLeft = scrollLeft;
                e.scrollLeft = scrollLeft;
            }
            scrollArgs = {
                cur: this.offset.left, prev: { idx: this.leftIndex, size: prevSize }, increase: scrollRight, preventScroll: e.preventScroll
            };
            this.updateTopLeftCell(scrollRight, true);
            this.parent.notify(focusRenameInput, null);
            this.parent.notify(onHorizontalScroll, scrollArgs);
            this.updateNoteContainer();
            if (!this.parent.scrollSettings.enableVirtualization && scrollRight && !this.parent.scrollSettings.isFinite) {
                this.updateNonVirtualCols();
            }
            this.leftIndex = scrollArgs.prev.idx;
            this.prevScroll.scrollLeft = left;
        }
        if (Math.round(this.prevScroll.scrollTop) !== Math.round(top)) {
            if (e.skipRowVirualScroll) {
                this.prevScroll.scrollTop = 0;
                this.offset.top = { idx: 0, size: 0 };
            }
            var scrollDown = top > this.prevScroll.scrollTop;
            prevSize = this.offset.top.size;
            this.offset.top = this.getRowOffset(top, scrollDown);
            scrollArgs = {
                cur: this.offset.top, prev: { idx: this.topIndex, size: prevSize }, increase: scrollDown, preventScroll: e.preventScroll
            };
            this.updateTopLeftCell(scrollDown);
            if (e.preventScroll && this.offset.top.idx <= this.parent.getThreshold('row')) {
                this.offset.top = { idx: 0, size: 0 };
            }
            else if (!e.skipRowVirualScroll) {
                this.parent.notify(focusRenameInput, null);
                this.parent.notify(onVerticalScroll, scrollArgs);
                this.updateNoteContainer();
            }
            else {
                scrollArgs.prev.idx = scrollArgs.cur.idx;
            }
            if (!this.parent.scrollSettings.enableVirtualization && scrollDown && !this.parent.scrollSettings.isFinite) {
                this.updateNonVirtualRows();
            }
            this.topIndex = scrollArgs.prev.idx;
            this.prevScroll.scrollTop = top;
        }
        var isEdit = false;
        var args = { isEdit: isEdit };
        this.parent.notify(isFormulaBarEdit, args);
        if (args.isEdit) {
            var textArea = this.parent.element.querySelector('.e-formula-bar');
            textArea.focus();
        }
        this.isKeyScroll = true;
    };
    Scroll.prototype.updateNoteContainer = function () {
        if (document.getElementsByClassName('e-addNoteContainer') && document.getElementsByClassName('e-addNoteContainer').length > 0) {
            this.parent.notify(updateNoteContainer, null);
        }
    };
    Scroll.prototype.updateScrollValue = function (args) {
        if (args.scrollLeft !== undefined) {
            this.prevScroll.scrollLeft = args.scrollLeft + (this.prevScroll.scrollLeft - this.offset.left.size);
            this.offset.left.size = args.scrollLeft;
        }
        if (args.scrollTop !== undefined) {
            this.prevScroll.scrollTop = args.scrollTop + (this.prevScroll.scrollTop - this.offset.top.size);
            this.offset.top.size = args.scrollTop;
        }
    };
    Scroll.prototype.updateNonVirtualRows = function () {
        var sheet = this.parent.getActiveSheet();
        var threshold = this.parent.getThreshold('row');
        if (this.offset.top.idx > sheet.rowCount - (this.parent.viewport.rowCount + threshold)) {
            this.parent.renderModule.refreshUI({ rowIndex: sheet.rowCount, colIndex: 0, direction: 'first', refresh: 'RowPart' }, getCellAddress(sheet.rowCount, 0) + ":" + getCellAddress(sheet.rowCount + threshold - 1, sheet.colCount - 1));
            this.parent.setSheetPropertyOnMute(sheet, 'rowCount', sheet.rowCount + threshold);
            this.parent.viewport.bottomIndex = sheet.rowCount - 1;
        }
    };
    Scroll.prototype.updateNonVirtualCols = function () {
        var sheet = this.parent.getActiveSheet();
        var threshold = this.parent.getThreshold('col');
        if (this.offset.left.idx > sheet.colCount - (this.parent.viewport.colCount + threshold)) {
            this.parent.renderModule.refreshUI({ rowIndex: 0, colIndex: sheet.colCount, direction: 'first', refresh: 'ColumnPart' }, getCellAddress(0, sheet.colCount) + ":" + getCellAddress(sheet.rowCount - 1, sheet.colCount + threshold - 1));
            this.parent.setSheetPropertyOnMute(sheet, 'colCount', sheet.colCount + threshold);
            this.parent.viewport.rightIndex = sheet.colCount - 1;
        }
    };
    Scroll.prototype.updateTopLeftCell = function (increase, isLeft) {
        var sheet = this.parent.getActiveSheet();
        var top = this.offset.top.idx;
        var left = this.offset.left.idx;
        if (!increase) {
            var frozenRow = this.parent.frozenRowCount(sheet);
            top = skipHiddenIdx(sheet, top + frozenRow, true) - frozenRow;
            var frozenCol = this.parent.frozenColCount(sheet);
            left = skipHiddenIdx(sheet, left + frozenCol, true, 'columns') - frozenCol;
        }
        if (isLeft) {
            this.parent.updateTopLeftCell(null, left, 'row');
        }
        else {
            this.parent.updateTopLeftCell(top, null, 'col');
        }
    };
    Scroll.prototype.getRowOffset = function (scrollTop, scrollDown) {
        var temp = this.offset.top.size;
        var sheet = this.parent.getActiveSheet();
        var i = scrollDown ? this.offset.top.idx + 1 : (this.offset.top.idx ? this.offset.top.idx - 1 : 0);
        var frozenRow = this.parent.frozenRowCount(sheet);
        var count = this.parent.scrollSettings.isFinite ? sheet.rowCount : Infinity;
        scrollTop = Math.round(scrollTop);
        while (i < count) {
            if (scrollDown) {
                var rowHeight = getRowHeight(sheet, i - 1 + frozenRow, true);
                temp += rowHeight;
                if (Math.abs(Math.round(temp) - scrollTop) <= 1) { // <=1 -> For other resolution scrollTop value slightly various with row height
                    return { idx: skipHiddenIdx(sheet, i + frozenRow, true) - frozenRow, size: temp };
                }
                if (Math.round(temp) > scrollTop) {
                    return { idx: i - 1, size: temp - rowHeight };
                }
                i++;
            }
            else {
                var rowHeight = getRowHeight(sheet, i + frozenRow, true);
                temp -= rowHeight;
                if (temp <= 0) {
                    return { idx: 0, size: 0 };
                }
                if (Math.abs(Math.round(temp) - scrollTop) <= 1) {
                    return { idx: i, size: temp };
                }
                if (Math.round(temp) < scrollTop) {
                    temp += rowHeight;
                    if (Math.round(temp) > scrollTop) {
                        return { idx: i, size: temp - rowHeight < 0 ? 0 : temp - rowHeight };
                    }
                    else {
                        return { idx: skipHiddenIdx(sheet, i + 1 + frozenRow, true) - frozenRow, size: temp };
                    }
                }
                i--;
            }
        }
        return { idx: this.offset.top.idx, size: this.offset.top.size };
    };
    Scroll.prototype.getColOffset = function (scrollLeft, increase, skipHidden) {
        var temp = this.offset.left.size;
        var sheet = this.parent.getActiveSheet();
        var i = increase ? this.offset.left.idx + 1 : (this.offset.left.idx ? this.offset.left.idx - 1 : 0);
        var frozenCol = this.parent.frozenColCount(sheet);
        var count = this.parent.scrollSettings.isFinite ? sheet.colCount : Infinity;
        while (i < count) {
            if (increase) {
                var colWidth = getColumnWidth(sheet, i - 1 + frozenCol, skipHidden, true);
                temp += colWidth;
                if (Math.abs(Math.round(temp) - scrollLeft) <= 1) {
                    return { idx: skipHiddenIdx(sheet, i + frozenCol, true, 'columns') - frozenCol, size: temp };
                }
                if (Math.round(temp) > scrollLeft) {
                    return { idx: i - 1, size: temp - colWidth };
                }
                i++;
            }
            else {
                var colWidth = getColumnWidth(sheet, i + frozenCol, skipHidden, true);
                temp -= colWidth;
                if (temp <= 0) {
                    return { idx: 0, size: 0 };
                }
                if (Math.abs(Math.round(temp) - scrollLeft) <= 1) {
                    return { idx: i, size: temp };
                }
                if (Math.round(temp) < scrollLeft) {
                    temp += colWidth;
                    if (Math.round(temp) > scrollLeft) {
                        temp = temp - colWidth;
                        return { idx: i, size: temp < 0 ? 0 : temp };
                    }
                    else {
                        return { idx: skipHiddenIdx(sheet, i + 1 + frozenCol, true, 'columns') - frozenCol, size: temp };
                    }
                }
                i--;
            }
        }
        return { idx: this.offset.left.idx, size: this.offset.left.size };
    };
    Scroll.prototype.contentLoaded = function (args) {
        if (!this.parent.scrollSettings.enableVirtualization) {
            var scrollTrack = this.parent.createElement('div', { className: 'e-virtualtrack' });
            this.updateNonVirualScrollWidth({ scrollTrack: scrollTrack });
            this.parent.getScrollElement().appendChild(scrollTrack);
        }
        if (args.left) {
            this.parent.getScrollElement().scrollLeft = args.left;
        }
        this.setScrollEvent();
        if (this.parent.enableRtl) {
            this.initScrollValue = this.parent.getScrollElement().scrollLeft;
        }
    };
    Scroll.prototype.updateNonVirualScrollWidth = function (args) {
        if (!args.scrollTrack) {
            args.scrollTrack = this.parent.getScrollElement().getElementsByClassName('e-virtualtrack')[0];
        }
        args.scrollTrack.style.width = Math.abs(this.parent.getContentTable().getBoundingClientRect().width +
            (this.parent.scrollSettings.isFinite ? this.parent.sheetModule.getScrollSize() : 0)) + "px";
    };
    Scroll.prototype.onHeaderWheel = function (e) {
        e.preventDefault();
        this.parent.getMainContent().parentElement.scrollTop += e.deltaY;
        this.parent.getScrollElement().scrollLeft += e.deltaX;
    };
    Scroll.prototype.onContentWheel = function (e) {
        if (e.deltaX !== 0) {
            e.preventDefault();
            this.parent.getScrollElement().scrollLeft += e.deltaX;
        }
    };
    Scroll.prototype.scrollHandler = function (e) {
        this.onContentScroll({ scrollLeft: e.target.scrollLeft });
    };
    Scroll.prototype.updateScroll = function (args) {
        if (isNullOrUndefined(args.left)) {
            this.parent.sheetModule.contentPanel.scrollTop = args.top;
        }
        else {
            this.parent.getScrollElement().scrollLeft = args.left;
        }
    };
    Scroll.prototype.setScrollEvent = function () {
        EventHandler.add(this.parent.sheetModule.contentPanel, 'scroll', this.onContentScroll, this);
        EventHandler.add(this.parent.getColumnHeaderContent(), 'wheel', this.onHeaderWheel, this);
        EventHandler.add(this.parent.getSelectAllContent(), 'wheel', this.onHeaderWheel, this);
        EventHandler.add(this.parent.getMainContent(), 'wheel', this.onContentWheel, this);
        EventHandler.add(this.parent.getRowHeaderContent(), 'wheel', this.onContentWheel, this);
        EventHandler.add(this.parent.getScrollElement(), 'scroll', this.scrollHandler, this);
    };
    Scroll.prototype.initProps = function () {
        this.topIndex = 0;
        this.leftIndex = 0;
        this.prevScroll = { scrollLeft: 0, scrollTop: 0 };
        this.offset = { left: { idx: 0, size: 0 }, top: { idx: 0, size: 0 } };
    };
    /**
     * @hidden
     *
     * @param {boolean} isRtlChange - Specifies RtlChange or not.
     * @returns {void} - To Set padding
     */
    Scroll.prototype.setPadding = function (isRtlChange) {
        this.parent.sheetModule.contentPanel.style.overflowY = 'scroll';
        var scrollWidth = getScrollBarWidth();
        if (scrollWidth > 0) {
            var colHeader = this.parent.getColumnHeaderContent();
            var cssProps = this.parent.enableRtl ? { margin: 'marginLeft', border: 'borderLeftWidth' }
                : { margin: 'marginRight', border: 'borderRightWidth' };
            colHeader.parentElement.style[cssProps.margin] = scrollWidth + 'px';
            colHeader.style[cssProps.border] = '1px';
        }
        if (isRtlChange) {
            this.initScrollValue = 0;
        }
    };
    Scroll.prototype.setClientX = function (e) {
        if (e.type === 'mousedown' || e.pointerType === 'mouse') {
            return;
        }
        var args = { touchSelectionStarted: false };
        this.parent.notify(selectionStatus, args);
        if (args.touchSelectionStarted || args.isOverlayClicked) {
            return;
        }
        this.clientX = this.getPointX(e);
        var sheetContent = document.getElementById(this.parent.element.id + '_sheet');
        EventHandler.add(sheetContent, Browser.isPointer ? 'pointermove' : 'touchmove', this.onTouchScroll, this);
        EventHandler.add(sheetContent, Browser.isPointer ? 'pointerup' : 'touchend', this.pointerUpHandler, this);
    };
    Scroll.prototype.getPointX = function (e) {
        var clientX = 0;
        if (e.touches && e.touches.length) {
            clientX = e.touches[0].clientX;
        }
        else {
            clientX = e.clientX;
        }
        return clientX;
    };
    Scroll.prototype.onTouchScroll = function (e) {
        if (e.pointerType === 'mouse') {
            return;
        }
        var clientX = this.getPointX(e);
        var diff = this.clientX - clientX;
        var scroller = this.parent.element.getElementsByClassName('e-scroller')[0];
        if ((diff > 10 || diff < -10) && scroller.scrollLeft + diff >= 0) {
            e.preventDefault();
            this.clientX = clientX;
            getUpdateUsingRaf(function () { scroller.scrollLeft += diff; });
        }
    };
    Scroll.prototype.pointerUpHandler = function () {
        var sheetContent = document.getElementById(this.parent.element.id + '_sheet');
        EventHandler.remove(sheetContent, Browser.isPointer ? 'pointermove' : 'touchmove', this.onTouchScroll);
        EventHandler.remove(sheetContent, Browser.isPointer ? 'pointerup' : 'touchend', this.pointerUpHandler);
    };
    Scroll.prototype.addEventListener = function () {
        this.parent.on(contentLoaded, this.contentLoaded, this);
        this.parent.on(onContentScroll, this.onContentScroll, this);
        this.parent.on(updateScroll, this.updateScroll, this);
        this.parent.on(deInitProperties, this.initProps, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
        this.parent.on(mouseDown, this.setClientX, this);
        this.parent.on(updateScrollValue, this.updateScrollValue, this);
        if (!this.parent.scrollSettings.enableVirtualization) {
            this.parent.on(virtualContentLoaded, this.updateNonVirualScrollWidth, this);
            this.parent.on(colWidthChanged, this.updateNonVirualScrollWidth, this);
        }
    };
    Scroll.prototype.destroy = function () {
        this.removeEventListener();
        var ddbEle = document.querySelector('#' + this.parent.element.id + '_autofilloptionbtn');
        if (ddbEle) {
            var ddbObj = getComponent(ddbEle, 'dropdown-btn');
            if (ddbObj) {
                ddbObj.destroy();
            }
        }
        this.parent = null;
    };
    Scroll.prototype.removeEventListener = function () {
        this.parent.off(contentLoaded, this.contentLoaded);
        this.parent.off(onContentScroll, this.onContentScroll);
        this.parent.off(updateScroll, this.updateScroll);
        this.parent.off(deInitProperties, this.initProps);
        this.parent.off(spreadsheetDestroyed, this.destroy);
        this.parent.off(mouseDown, this.setClientX);
        this.parent.off(updateScrollValue, this.updateScrollValue);
        if (!this.parent.scrollSettings.enableVirtualization) {
            this.parent.off(virtualContentLoaded, this.updateNonVirualScrollWidth);
            this.parent.off(colWidthChanged, this.updateNonVirualScrollWidth);
        }
    };
    return Scroll;
}());
export { Scroll };
