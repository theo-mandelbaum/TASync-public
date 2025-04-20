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
import { PdfTreeGridColumnCollection, PdfTreeGridHeaderCollection, PdfTreeGridRowCollection } from './pdf-base/index';
import { PdfTreeGridStyle, PdfBorders, PdfTreeGridLayouter } from './pdf-base/index';
import { PdfLayoutElement, RectangleF, PdfLayoutFormat, PointF, SizeF } from '@syncfusion/ej2-pdf-export';
/**
 * PdfTreeGrid Class for EJ2-PDF
 */
var PdfTreeGrid = /** @class */ (function (_super) {
    __extends(PdfTreeGrid, _super);
    function PdfTreeGrid() {
        var _this = _super.call(this) || this;
        _this.treeGridSize = new SizeF(0, 0);
        _this.treeColumnIndex = 0;
        _this.allowRowBreakAcrossPages = true;
        _this.enableHeader = true;
        _this.isFitToWidth = false;
        _this.columns = new PdfTreeGridColumnCollection(_this);
        _this.rows = new PdfTreeGridRowCollection(_this);
        _this.headers = new PdfTreeGridHeaderCollection(_this);
        _this.style = new PdfTreeGridStyle();
        _this.rowHeight = 0;
        return _this;
    }
    Object.defineProperty(PdfTreeGrid.prototype, "size", {
        //Properties
        /**
         * Gets a value indicating whether the `start cell layout event` should be raised.
         *
         * @returns {boolean} .
         * @private
         */
        // public get raiseBeginCellDraw(): boolean {
        //     // eslint-disable-next-line
        //     return (typeof this.beginCellDraw !== 'undefined' && typeof this.beginCellDraw !== null);
        // }
        /**
         * Gets a value indicating whether the `end cell layout event` should be raised.
         *
         * @returns {boolean} .
         * @private
         */
        // public get raiseEndCellDraw(): boolean {
        //     // eslint-disable-next-line
        //     return (typeof this.endCellDraw !== 'undefined' && typeof this.endCellDraw !== null);
        // }
        get: function () {
            if ((this.treeGridSize.width === 0 && this.treeGridSize.height === 0)) {
                this.treeGridSize = this.calculateTreeGridSize();
            }
            return this.treeGridSize;
        },
        set: function (value) {
            this.treeGridSize = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * `Draws` the element on the page with the specified page, 'RectangleF' class and layout format
     *
     * @private
     */
    /* eslint-disable-next-line */
    PdfTreeGrid.prototype.draw = function (arg1, arg2, arg3, arg4) {
        if (arg2 instanceof PointF && typeof arg2.width === 'undefined' && typeof arg3 === 'undefined') {
            return this.drawHelper(arg1, arg2.x, arg2.y);
        }
        else if (typeof arg2 === 'number' && typeof arg3 === 'number' && typeof arg4 === 'undefined') {
            return this.drawHelper(arg1, arg2, arg3, null);
        }
        else if (arg2 instanceof RectangleF && typeof arg2.width !== 'undefined' && typeof arg3 === 'undefined') {
            return this.drawHelper(arg1, arg2, null);
        }
        else if (arg2 instanceof PointF && typeof arg2.width === 'undefined' && arg3 instanceof PdfLayoutFormat) {
            return this.drawHelper(arg1, arg2.x, arg2.y, arg3);
        }
        else if (typeof arg2 === 'number' && typeof arg3 === 'number' && (arg4 instanceof PdfLayoutFormat || arg4 === null)) {
            var width = (arg1.graphics.clientSize.width - arg2);
            var layoutRectangle = new RectangleF(arg2, arg3, width, 0);
            return this.drawHelper(arg1, layoutRectangle, arg4);
        }
        else if (arg2 instanceof RectangleF && typeof arg2.width !== 'undefined' && typeof arg3 === 'boolean') {
            return this.drawHelper(arg1, arg2, null);
        }
        else {
            return this.drawHelper(arg1, arg2, arg3);
        }
    };
    PdfTreeGrid.prototype.measureColumnsWidth = function (bounds) {
        if (typeof bounds !== 'undefined') {
            var widths = this.columns.getDefaultWidths(bounds.width - bounds.x);
            for (var i = 0; i < this.columns.count; i++) {
                if (this.columns.getColumn(i).width < 0) {
                    this.columns.getColumn(i).width = widths[i];
                }
            }
        }
        else {
            var widths = [];
            var cellWidth = 0;
            var totalWidth = 0;
            var rowLevel = 0;
            // if(this.headers.count > 0){
            //     let colCount: number = this.headers.getHeader(0).cells.count;
            //     for(let i: number = 0; i < colCount; i++){
            //         let rowCount: number = this.headers.count;
            //         for(let j: number = 0; j < rowCount; j++){
            //             let tempWidth: number = this.headers.getHeader(j).cells.getCell(i).width;
            //             let rowWidth: number = this.initialWidth > 0 ? Math.min(this.initialWidth, tempWidth) :
            //                 tempWidth;
            //             cellWidth = Math.max(cellWidth, rowWidth);
            //         }
            //         widths.push(cellWidth);
            //     }
            // }
            var colCount = this.columns.count;
            for (var i = 0; i < colCount; i++) {
                var rowCount = this.rows.count;
                for (var j = 0; j < rowCount; j++) {
                    var tempWidth = this.rows.getRow(j).cells.getCell(i).width;
                    var rowWidth = this.initialWidth > 0 ? Math.min(this.initialWidth, tempWidth) : tempWidth;
                    cellWidth = Math.max(cellWidth, rowWidth);
                    cellWidth = Math.max(this.columns.getColumn(i).width, cellWidth);
                    if (this.columns.getColumn(i).isTreeColumn) {
                        rowLevel = Math.max(rowLevel, this.rows.getRow(j).level);
                    }
                }
                if (this.columns.getColumn(i).isTreeColumn) {
                    widths.push(cellWidth + (rowLevel * 10));
                }
                else {
                    widths.push(cellWidth);
                }
                // eslint-disable-next-line
                totalWidth += cellWidth;
                cellWidth = 0;
            }
            for (var i = 0; i < this.columns.count; i++) {
                if (this.columns.getColumn(i).width < 0) {
                    this.columns.getColumn(i).width = widths[i];
                }
            }
        }
    };
    PdfTreeGrid.prototype.calculateTreeGridSize = function () {
        var height = 0;
        var width = this.columns.width;
        for (var i = 0; i < this.headers.count; i++) {
            var row = this.headers.getHeader(i);
            height += row.height;
        }
        for (var i = 0; i < this.rows.count; i++) {
            var row = this.rows.getRow(i);
            height += row.height;
        }
        return new SizeF(width, height);
    };
    PdfTreeGrid.prototype.drawGrid = function (page, x, y, format) {
        this.initialWidth = page.graphics.clientSize.width;
        var layout = new RectangleF(0, 0, page.getClientSize().height, 0);
        return this.draw(page, layout, format);
    };
    PdfTreeGrid.prototype.layout = function (param) {
        if (this.rows.count !== 0) {
            var style = (this.rows.getRow(0).cells.count !== 0) ? this.rows.getRow(0).cells.getCell(0).style : null;
            if (!isNullOrUndefined(style) && style.borders.left.width !== 1) {
                var x = style.borders.left.width / 2;
                var y = style.borders.top.width / 2;
                if (param.bounds.x === PdfBorders.default.right.width / 2 &&
                    param.bounds.y === PdfBorders.default.right.width / 2) {
                    var newBound = new RectangleF(new PointF(x, y), new SizeF(this.size.width, this.size.height));
                    param.bounds = newBound;
                }
            }
        }
        //  this.setSpan();
        this.layouter = new PdfTreeGridLayouter(this);
        var result = this.layouter.layoutInternal(param);
        return result;
    };
    return PdfTreeGrid;
}(PdfLayoutElement));
export { PdfTreeGrid };
