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
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CellRenderer } from './cell-renderer';
import { headerCellInfo } from '../base/constant';
import { setStyleAndAttributes, appendChildren, frozenDirection, isChildColumn, applyStickyLeftRightPosition } from '../base/util';
/**
 * StackedHeaderCellRenderer class which responsible for building stacked header cell content.
 *
 * @hidden
 */
var StackedHeaderCellRenderer = /** @class */ (function (_super) {
    __extends(StackedHeaderCellRenderer, _super);
    function StackedHeaderCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = _this.parent.createElement('TH', {
            className: 'e-headercell e-stackedheadercell', attrs: {
                tabindex: '-1', role: 'columnheader'
            }
        });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     *
     * @param {Cell<Column>} cell - specifies the cell
     * @param {Object} data - specifies the data
     * @param {object} attributes - specifies the attributes
     * @returns {Element} returns the element
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    StackedHeaderCellRenderer.prototype.render = function (cell, data, attributes) {
        var node = this.element.cloneNode();
        var div = this.parent.createElement('div', {
            className: 'e-stackedheadercelldiv',
            attrs: { 'e-mappinguid': cell.column.uid }
        });
        var column = cell.column;
        node.appendChild(div);
        if (!isNullOrUndefined(column.headerTemplate)) {
            appendChildren(div, column.getHeaderTemplate()(column, this.parent, 'headerTemplate', null, null, null, null, this.parent.root));
        }
        else {
            this.appendHtml(div, this.parent.sanitize(column.headerText), column.getDomSetter());
        }
        if (cell.column.toolTip) {
            node.setAttribute('title', cell.column.toolTip);
        }
        if (column.clipMode === 'Clip' || (!column.clipMode && this.parent.clipMode === 'Clip')) {
            node.classList.add('e-gridclip');
        }
        else if (column.clipMode === 'EllipsisWithTooltip' || (!column.clipMode && this.parent.clipMode === 'EllipsisWithTooltip')) {
            node.classList.add('e-ellipsistooltip');
        }
        if (!isNullOrUndefined(cell.column.textAlign)) {
            var alignmentClassMap = { right: 'e-rightalign', left: 'e-leftalign', center: 'e-centeralign', justify: 'e-justifyalign' };
            if (alignmentClassMap[cell.column.textAlign.toLowerCase()]) {
                node.classList.add(alignmentClassMap[cell.column.textAlign.toLowerCase()]);
            }
        }
        if (cell.column.customAttributes) {
            setStyleAndAttributes(node, cell.column.customAttributes);
        }
        node.setAttribute('colspan', cell.colSpan.toString());
        node.setAttribute('aria-colspan', cell.colSpan.toString());
        node.setAttribute('aria-rowspan', '1');
        if (this.parent.allowResizing) {
            var handler = this.parent.createElement('div');
            handler.className = cell.column.allowResizing ? 'e-rhandler e-rcursor' : 'e-rsuppress';
            node.appendChild(handler);
        }
        if (cell.className) {
            node.classList.add(cell.className);
        }
        this.parent.trigger(headerCellInfo, { cell: cell, node: node });
        if (frozenDirection(column) === 'Left') {
            node.classList.add('e-leftfreeze');
            if (column.border === 'Left') {
                node.classList.add('e-freezeleftborder');
            }
            if (column.index === 0) {
                applyStickyLeftRightPosition(node, (this.parent.getIndentCount() * 30), this.parent.enableRtl, 'Left');
            }
            else {
                var cols = this.parent.getColumns();
                var width = this.parent.getIndentCount() * 30;
                for (var i = 0; i < cols.length; i++) {
                    if (column.index < cols[parseInt(i.toString(), 10)].index) {
                        break;
                    }
                    if (cols[parseInt(i.toString(), 10)].visible) {
                        width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                    }
                }
                applyStickyLeftRightPosition(node, width, this.parent.enableRtl, 'Left');
            }
        }
        else if (frozenDirection(column) === 'Right') {
            node.classList.add('e-rightfreeze');
            var cols = this.parent.getColumns();
            var width = this.parent.getFrozenMode() === 'Right' && this.parent.isRowDragable() ? 30 : 0;
            for (var i = cols.length - 1; i >= 0; i--) {
                if (isChildColumn(column, cols[parseInt(i.toString(), 10)].uid) || column.index > cols[parseInt(i.toString(), 10)].index) {
                    break;
                }
                if (cols[parseInt(i.toString(), 10)].visible) {
                    width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                }
            }
            applyStickyLeftRightPosition(node, width, this.parent.enableRtl, 'Right');
            if (column.border === 'Right') {
                node.classList.add('e-freezerightborder');
            }
        }
        else if (frozenDirection(column) === 'Fixed') {
            node.classList.add('e-fixedfreeze');
            var cols = this.parent.getColumns();
            var width = 0;
            if (this.parent.getVisibleFrozenLeftCount()) {
                width = this.parent.getIndentCount() * 30;
            }
            else if (this.parent.getFrozenMode() === 'Right') {
                width = this.parent.groupSettings.columns.length * 30;
            }
            for (var i = 0; i < cols.length; i++) {
                if (column.index > cols[parseInt(i.toString(), 10)].index) {
                    if ((cols[parseInt(i.toString(), 10)].freeze === 'Left' || cols[parseInt(i.toString(), 10)].isFrozen) ||
                        cols[parseInt(i.toString(), 10)].freeze === 'Fixed') {
                        if (cols[parseInt(i.toString(), 10)].visible) {
                            width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                        }
                    }
                }
            }
            applyStickyLeftRightPosition(node, width - 1, this.parent.enableRtl, 'Left');
            width = this.parent.getFrozenMode() === 'Right' && this.parent.isRowDragable() ? 30 : 0;
            for (var i = cols.length - 1; i >= 0; i--) {
                if (column.index < cols[parseInt(i.toString(), 10)].index) {
                    if (isChildColumn(column, cols[parseInt(i.toString(), 10)].uid) ||
                        column.index > cols[parseInt(i.toString(), 10)].index) {
                        break;
                    }
                    if (cols[parseInt(i.toString(), 10)].freeze === 'Right' || cols[parseInt(i.toString(), 10)].freeze === 'Fixed') {
                        if (cols[parseInt(i.toString(), 10)].visible) {
                            width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                        }
                    }
                }
            }
            applyStickyLeftRightPosition(node, width - 1, this.parent.enableRtl, 'Right');
        }
        else {
            node.classList.add('e-unfreeze');
        }
        return node;
    };
    return StackedHeaderCellRenderer;
}(CellRenderer));
export { StackedHeaderCellRenderer };
