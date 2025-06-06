import { isNullOrUndefined, addClass } from '@syncfusion/ej2-base';
import { formatUnit } from '@syncfusion/ej2-base';
import { columnWidthChanged, preventFrozenScrollRefresh } from '../base/constant';
import { Column } from '../models/column';
import { parentsUntil, ispercentageWidth, getScrollBarWidth } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * ColumnWidthService
 *
 * @hidden
 */
var ColumnWidthService = /** @class */ (function () {
    function ColumnWidthService(parent) {
        this.parent = parent;
    }
    ColumnWidthService.prototype.setWidthToColumns = function () {
        var i = 0;
        var indexes = this.parent.getColumnIndexesInView();
        var wFlag = true;
        var totalColumnsWidth = 0;
        if (this.parent.allowGrouping) {
            for (var len = this.parent.groupSettings.columns.length; i < len; i++) {
                if (this.parent.enableColumnVirtualization && indexes.indexOf(i) === -1) {
                    wFlag = false;
                    continue;
                }
                this.setColumnWidth(new Column({ width: '30px' }), i);
            }
        }
        if (this.parent.detailTemplate || this.parent.childGrid) {
            this.setColumnWidth(new Column({ width: '30px' }), i);
            i++;
        }
        if (this.parent.isRowDragable() && this.parent.getFrozenMode() !== 'Right') {
            this.setColumnWidth(new Column({ width: '30px' }), i);
            i++;
        }
        var columns = this.parent.getColumns();
        for (var j = 0; j < columns.length; j++) {
            this.setColumnWidth(columns[parseInt(j.toString(), 10)], wFlag && this.parent.enableColumnVirtualization ? undefined : j + i);
        }
        if (this.parent.isRowDragable() && this.parent.getFrozenMode() === 'Right') {
            this.setColumnWidth(new Column({ width: '30px' }), this.parent.groupSettings.columns.length + columns.length);
        }
        totalColumnsWidth = this.getTableWidth(this.parent.getColumns());
        if (totalColumnsWidth !== 'auto') {
            if (this.parent.width !== 'auto' && this.parent.width.toString().indexOf('%') === -1) {
                this.setMinwidthBycalculation(totalColumnsWidth);
            }
            var maxWidthColumns = columns.filter(function (a) {
                return !isNullOrUndefined(a.maxWidth);
            });
            var header = this.parent.getHeaderTable();
            var content = this.parent.getContentTable();
            if (this.parent.allowResizing && this.parent.element.getBoundingClientRect().width > totalColumnsWidth &&
                maxWidthColumns.length === columns.length && header && content) {
                addClass([header, content], ['e-tableborder']);
            }
        }
    };
    ColumnWidthService.prototype.setMinwidthBycalculation = function (tWidth) {
        var _this = this;
        var difference = 0;
        var collection = this.parent.getColumns().filter(function (a) {
            if (_this.parent.allowResizing) {
                return (isNullOrUndefined(a.width) || a.width === 'auto') && isNullOrUndefined(a.maxWidth);
            }
            else {
                return isNullOrUndefined(a.width) || a.width === 'auto';
            }
        });
        if (collection.length) {
            if (!isNullOrUndefined(this.parent.width) && this.parent.width !== 'auto' &&
                typeof (this.parent.width) === 'string' && this.parent.width.indexOf('%') === -1) {
                difference = parseInt(this.parent.width, 10) - tWidth;
            }
            else {
                difference = this.parent.element.getBoundingClientRect().width - tWidth;
            }
            var tmWidth = 0;
            for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
                var cols = collection_1[_i];
                tmWidth += !isNullOrUndefined(cols.minWidth) ?
                    ((typeof cols.minWidth === 'string' ? parseInt(cols.minWidth, 10) : cols.minWidth)) : 0;
            }
            for (var i = 0; i < collection.length; i++) {
                if (tWidth === 0 && this.parent.allowResizing && this.isWidthUndefined() && (i !== collection.length - 1)) {
                    this.setUndefinedColumnWidth(collection);
                }
                var index = this.parent.getColumnIndexByField(collection[parseInt(i.toString(), 10)].field) + this.parent.getIndentCount();
                if (tWidth !== 0 && difference < tmWidth) {
                    this.setWidth(collection[parseInt(i.toString(), 10)].minWidth, index);
                }
                else if (tWidth !== 0 && difference > tmWidth) {
                    this.setWidth('', index, true);
                }
            }
        }
    };
    ColumnWidthService.prototype.setUndefinedColumnWidth = function (collection) {
        for (var k = 0; k < collection.length; k++) {
            if (k !== collection.length - 1) {
                collection[parseInt(k.toString(), 10)].width = 200;
                this.setWidth(200, this.parent.getColumnIndexByField(collection[parseInt(k.toString(), 10)].field));
            }
        }
    };
    ColumnWidthService.prototype.setColumnWidth = function (column, index, module) {
        if (this.parent.getColumns().length < 1) {
            return;
        }
        var columnIndex = isNullOrUndefined(index) ? this.parent.getNormalizedColumnIndex(column.uid) : index;
        var cWidth = this.getWidth(column);
        var tgridWidth = this.getTableWidth(this.parent.getColumns());
        if (cWidth !== null) {
            this.setWidth(cWidth, columnIndex);
            if (this.parent.width !== 'auto' && this.parent.width.toString().indexOf('%') === -1 && tgridWidth !== 'auto') {
                this.setMinwidthBycalculation(tgridWidth);
            }
            if (this.parent.allowResizing && (module === 'resize' || this.parent.getFrozenColumns())) {
                var contentTable = this.parent.getContentTable();
                this.setWidthToTable(this.parent.getFrozenColumns() && contentTable.style.width.indexOf('px') === -1 && tgridWidth < contentTable.clientWidth);
            }
            this.parent.notify(columnWidthChanged, { index: columnIndex, width: cWidth, column: column, module: module });
        }
    };
    ColumnWidthService.prototype.setWidth = function (width, index, clear) {
        if (this.parent.groupSettings.columns.length > index && ispercentageWidth(this.parent)) {
            var elementWidth = this.parent.element.offsetWidth;
            width = (30 / elementWidth * 100).toFixed(1) + '%';
        }
        var header = this.parent.getHeaderTable();
        var content = this.parent.getContentTable();
        var fWidth = formatUnit(width);
        var headerCol = header.querySelector(literals.colGroup)
            .children[parseInt(index.toString(), 10)];
        if (headerCol && !clear) {
            headerCol.style.width = fWidth;
        }
        else if (headerCol && clear) {
            headerCol.style.width = '';
        }
        var contentCol = content.querySelector(literals.colGroup).children[parseInt(index.toString(), 10)];
        if (contentCol && !clear) {
            contentCol.style.width = fWidth;
        }
        else if (contentCol && clear) {
            contentCol.style.width = '';
        }
        if (!this.parent.enableColumnVirtualization && this.parent.isEdit) {
            var edit = this.parent.element.querySelectorAll('.e-table.e-inline-edit');
            var editTableCol = [];
            for (var i = 0; i < edit.length; i++) {
                if (parentsUntil(edit[parseInt(i.toString(), 10)], 'e-grid').id === this.parent.element.id) {
                    for (var j = 0; j < edit[parseInt(i.toString(), 10)].querySelector('colgroup').children.length; j++) {
                        editTableCol.push(edit[parseInt(i.toString(), 10)].querySelector('colgroup').children[parseInt(j.toString(), 10)]);
                    }
                }
            }
            if (edit.length && editTableCol.length && editTableCol[parseInt(index.toString(), 10)]) {
                editTableCol[parseInt(index.toString(), 10)].style.width = fWidth;
            }
        }
        if (this.parent.isFrozenGrid() && this.parent.enableColumnVirtualization) {
            this.refreshFrozenScrollbar();
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnWidthService.prototype.refreshFrozenScrollbar = function () {
        var args = { cancel: false };
        this.parent.notify(preventFrozenScrollRefresh, args);
        if (args.cancel) {
            return;
        }
        var scrollWidth = getScrollBarWidth();
        var movableScrollbar = this.parent.element.querySelector('.e-movablescrollbar');
        var movableWidth = this.parent.getContent().firstElementChild.getBoundingClientRect().width;
        if (this.parent.enableColumnVirtualization) {
            var placeHolder = this.parent.getContent().querySelector('.e-virtualtrack');
            if (placeHolder) {
                movableWidth = placeHolder.scrollWidth;
            }
        }
        if (this.parent.height !== 'auto') {
            movableWidth = movableWidth + scrollWidth;
        }
        movableScrollbar.firstElementChild.style.width = movableWidth + 'px';
    };
    ColumnWidthService.prototype.getSiblingsHeight = function (element) {
        var previous = this.getHeightFromDirection(element, 'previous');
        var next = this.getHeightFromDirection(element, 'next');
        return previous + next;
    };
    ColumnWidthService.prototype.getHeightFromDirection = function (element, direction) {
        var sibling = element[direction + 'ElementSibling'];
        var result = 0;
        var classList = [literals.gridHeader, literals.gridFooter, 'e-groupdroparea', 'e-gridpager', 'e-toolbar', 'e-temp-toolbar'];
        while (sibling) {
            if (classList.some(function (value) { return sibling.classList.contains(value); })) {
                result += sibling.offsetHeight;
            }
            sibling = sibling[direction + 'ElementSibling'];
        }
        return result;
    };
    ColumnWidthService.prototype.isWidthUndefined = function () {
        var isWidUndefCount = this.parent.getColumns().filter(function (col) {
            return isNullOrUndefined(col.width) && isNullOrUndefined(col.minWidth);
        }).length;
        return (this.parent.getColumns().length === isWidUndefCount);
    };
    ColumnWidthService.prototype.getWidth = function (column) {
        if (this.parent.allowResizing && isNullOrUndefined(column.width)) {
            if (isNullOrUndefined(column.minWidth) && isNullOrUndefined(column.maxWidth)
                && !this.isWidthUndefined()) {
                column.width = 200;
            }
            else if (column.maxWidth) {
                column.width = column.maxWidth;
            }
        }
        if (!column.width) {
            return null;
        }
        var width = parseInt(column.width.toString(), 10);
        if (column.minWidth && width < parseInt(column.minWidth.toString(), 10)) {
            return column.minWidth;
        }
        else if (column.maxWidth && width > parseInt(column.maxWidth.toString(), 10)) {
            return column.maxWidth;
        }
        else {
            return column.width;
        }
    };
    ColumnWidthService.prototype.getTableWidth = function (columns, resetIndentWidth) {
        var tWidth = 0;
        var isAutoColumn = false;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.visible !== false) {
                var cWidth = this.getWidth(column);
                if (column.width === 'auto' || !column.width) {
                    if (this.parent.allowResizing && !resetIndentWidth) {
                        if (!column.maxWidth) {
                            isAutoColumn = true;
                        }
                    }
                    else {
                        cWidth = 0;
                    }
                }
                if (cWidth !== null) {
                    tWidth += parseInt(cWidth.toString(), 10);
                }
            }
        }
        tWidth = isAutoColumn ? 'auto' : tWidth;
        return tWidth;
    };
    ColumnWidthService.prototype.setWidthToTable = function (isMaxWidth) {
        var tWidth = formatUnit(this.getTableWidth(this.parent.getColumns()));
        if (this.parent.detailTemplate || this.parent.childGrid) {
            this.setColumnWidth(new Column({ width: '30px' }));
        }
        tWidth = (this.isAutoResize() || tWidth === 'auto' || isMaxWidth) ? '100%' : tWidth;
        this.parent.getHeaderTable().style.width = tWidth;
        this.parent.getContentTable().style.width = tWidth;
        var edit = this.parent.element.querySelector('.e-table.e-inline-edit');
        if (edit) {
            edit.style.width = tWidth;
        }
    };
    ColumnWidthService.prototype.isAutoResize = function () {
        return this.parent.allowResizing && this.parent.resizeSettings.mode === 'Auto';
    };
    return ColumnWidthService;
}());
export { ColumnWidthService };
