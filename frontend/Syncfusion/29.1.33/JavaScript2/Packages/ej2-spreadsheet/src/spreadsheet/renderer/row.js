import { deInitProperties } from '../common/index';
import { getRowHeight, getCell, isHiddenRow, isHiddenCol } from '../../workbook/base/index';
import { attributes } from '@syncfusion/ej2-base';
import { getCellAddress, getCellIndexes, skipHiddenIdx, isImported } from '../../workbook/common/index';
/**
 * RowRenderer module is used for creating row element
 *
 * @hidden
 */
var RowRenderer = /** @class */ (function () {
    function RowRenderer(parent) {
        this.parent = parent;
        this.element = this.parent.createElement('tr');
        this.cellRenderer = parent.serviceLocator.getService('cell');
        this.parent.on(deInitProperties, this.initProps, this);
    }
    RowRenderer.prototype.render = function (index, isRowHeader, preventHiddenCls) {
        var row = this.element.cloneNode();
        var sheet = this.parent.getActiveSheet();
        if (index === undefined) {
            row.classList.add('e-header-row');
            return row;
        }
        row.classList.add('e-row');
        if (!this.bottomBorderWidth) {
            var width = 1;
            if (window.devicePixelRatio % 1 > 0) {
                var pointValue = (1 * window.devicePixelRatio) % 1;
                width = 1 + (pointValue ? ((pointValue > 0.5 ? (1 - pointValue) : -1 * pointValue) / window.devicePixelRatio) : 0);
            }
            this.bottomBorderWidth = width;
        }
        var rowHeight = getRowHeight(sheet, index, true);
        var actualRowHgt = getRowHeight(sheet, index);
        var rowStyles = {
            height: rowHeight + "px",
            lineHeight: (actualRowHgt < 20) ?
                (rowHeight > this.bottomBorderWidth ? rowHeight - this.bottomBorderWidth + "px" : '0px') : ''
        };
        Object.assign(row.style, rowStyles);
        attributes(row, { 'aria-rowindex': (index + 1).toString() });
        if (isRowHeader && !preventHiddenCls) {
            if (actualRowHgt < 20) {
                var width = 4 + (this.bottomBorderWidth - 1);
                row.style.lineHeight = rowHeight >= width ? rowHeight - width + "px" :
                    (rowHeight > this.bottomBorderWidth ? rowHeight - this.bottomBorderWidth + "px" : '0px');
                if (!row.classList.contains('e-reach-fntsize')) {
                    row.classList.add('e-reach-fntsize');
                }
            }
            if (isHiddenRow(sheet, index + 1) && !isHiddenRow(sheet, index - 1)) {
                row.classList.add('e-hide-start');
            }
            if (index !== 0 && isHiddenRow(sheet, index - 1) && !isHiddenRow(sheet, index + 1)) {
                row.classList.add('e-hide-end');
            }
        }
        return row;
    };
    RowRenderer.prototype.refresh = function (index, pRow, hRow, header, preventHiddenCls) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var row;
        if (header) {
            row = this.render(index, header, preventHiddenCls);
            this.cellRenderer.renderRowHeader(index, row);
        }
        else {
            var i_1;
            var len_1;
            var updateCells = function () {
                while (i_1 <= len_1) {
                    if (!isHiddenCol(sheet, i_1)) {
                        _this.cellRenderer.render({ colIdx: i_1, rowIdx: index, cell: getCell(index, i_1, sheet), address: getCellAddress(index, i_1),
                            lastCell: i_1 === len_1, row: row, hRow: hRow, isHeightCheckNeeded: true, pRow: pRow, first: index === _this.parent.viewport.topIndex && skipHiddenIdx(sheet, index, true) !==
                                skipHiddenIdx(sheet, 0, true) ? 'Row' : '', skipFormatCheck: isImported(_this.parent), checkCF: true });
                    }
                    i_1++;
                }
            };
            var frozenCol = this.parent.frozenColCount(sheet);
            if (frozenCol) {
                row = hRow;
                i_1 = getCellIndexes(sheet.topLeftCell)[0];
                len_1 = frozenCol - 1;
                updateCells();
            }
            row = this.render(index, header, preventHiddenCls);
            i_1 = this.parent.viewport.leftIndex + frozenCol;
            len_1 = this.parent.viewport.rightIndex;
            updateCells();
        }
        return row;
    };
    RowRenderer.prototype.initProps = function () {
        this.bottomBorderWidth = null;
    };
    /**
     * Clears the internal properties of RowRenderer module.
     *
     * @returns {void}
     */
    RowRenderer.prototype.destroy = function () {
        this.parent.off(deInitProperties, this.initProps);
        if (this.element) {
            this.element.remove();
        }
        if (this.bottomBorderWidth) {
            this.bottomBorderWidth = null;
        }
        this.parent = null;
        this.element = null;
    };
    return RowRenderer;
}());
export { RowRenderer };
