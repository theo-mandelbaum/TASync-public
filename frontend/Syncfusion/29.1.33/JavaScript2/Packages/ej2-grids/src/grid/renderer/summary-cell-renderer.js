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
import { appendChildren } from '../base/util';
import { CellRenderer } from './cell-renderer';
import { refreshAggregateCell } from '../base/constant';
/**
 * SummaryCellRenderer class which responsible for building summary cell content.
 *
 * @hidden
 */
var SummaryCellRenderer = /** @class */ (function (_super) {
    __extends(SummaryCellRenderer, _super);
    function SummaryCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = _this.parent
            .createElement('TD', { className: 'e-summarycell', attrs: { tabindex: '-1', role: 'gridcell' } });
        return _this;
    }
    SummaryCellRenderer.prototype.getValue = function (field, data, column) {
        var key = !isNullOrUndefined(column.type) ?
            column.field + ' - ' + (typeof column.type === 'string' ? column.type.toLowerCase() : '') : column.columnName;
        return data[column.columnName] ? data[column.columnName]["" + key] : '';
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    SummaryCellRenderer.prototype.evaluate = function (node, cell, data, attributes) {
        var column = cell.column;
        this.parent.on(refreshAggregateCell, this.refreshWithAggregate(node, cell), this);
        if (!(column.footerTemplate || column.groupFooterTemplate || column.groupCaptionTemplate)) {
            if (this.parent.rowRenderingMode === 'Vertical') {
                node.style.display = 'none';
            }
            return true;
        }
        else {
            if (this.parent.rowRenderingMode === 'Vertical') {
                node.classList.add('e-lastsummarycell');
            }
        }
        var tempObj = column.getTemplate(cell.cellType);
        var tempID = '';
        var gColumn = this.parent.getColumnByField(data[column.columnName].field);
        if (!isNullOrUndefined(gColumn)) {
            data[column.columnName].headerText = gColumn.headerText;
            if (gColumn.isForeignColumn()) {
                var fData = gColumn.columnData.filter(function (e) {
                    return e[gColumn.foreignKeyField] === data[column.columnName].key;
                })[0];
                if (fData) {
                    data[column.columnName].foreignKey = fData[gColumn.foreignKeyValue];
                }
            }
        }
        var isNotStringTemplate = column.footerTemplate ? typeof (column.footerTemplate) !== 'string' && !(column.footerTemplate.prototype &&
            column.footerTemplate.prototype.CSPTemplate) : column.groupFooterTemplate ? typeof (column.groupFooterTemplate) !== 'string' &&
            !(column.groupFooterTemplate.prototype && column.groupFooterTemplate.prototype.CSPTemplate)
            : column.groupCaptionTemplate ? typeof (column.groupCaptionTemplate) !== 'string' && !(column.groupCaptionTemplate.prototype &&
                column.groupCaptionTemplate.prototype.CSPTemplate) : false;
        var isReactCompiler = this.parent.isReact && isNotStringTemplate;
        var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
            this.parent.parentDetails.parentInstObj.isReact && isNotStringTemplate;
        var isReactPrintGrid = this.parent.printGridParent && this.parent.printGridParent.isReact;
        if (isReactCompiler || isReactChild || isReactPrintGrid) {
            var prop = data[column.columnName];
            if (tempObj.property === 'groupCaptionTemplate' || tempObj.property === 'groupFooterTemplate') {
                var groupKey = 'groupKey';
                var key = 'key';
                prop["" + groupKey] = prop["" + key];
            }
            tempObj.fn(prop, this.parent, tempObj.property, tempID, null, null, node);
            if (!this.parent.isInitialLoad) {
                this.parent.renderTemplates();
            }
        }
        else {
            appendChildren(node, tempObj.fn(data[column.columnName], this.parent, tempObj.property, tempID, null, null, null, this.parent.root));
        }
        return false;
    };
    SummaryCellRenderer.prototype.refreshWithAggregate = function (node, cell) {
        var _this = this;
        var cellNode = cell;
        return function (args) {
            var cell = cellNode;
            var field = cell.column.columnName ? cell.column.columnName : null;
            var curCell = (!isNullOrUndefined(field) ? args.cells.filter(function (cell) {
                return cell.column.columnName === field;
            })[0] : null);
            if (node.parentElement && node.parentElement.getAttribute('data-uid') === args.dataUid && field && curCell &&
                field === curCell.column.columnName) {
                _this.refreshTD(node, curCell, args.data);
            }
        };
    };
    return SummaryCellRenderer;
}(CellRenderer));
export { SummaryCellRenderer };
