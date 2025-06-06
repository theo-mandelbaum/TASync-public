import { subtractThickness, sum } from '../../common/utils/helper';
import { subArray } from '../../common/utils/helper';
import { Thickness } from '../../common/utils/helper';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
/**
 * Specifies the Cartesian Axis Layout.
 */
var axisPadding = 10;
/**
 * The `CartesianAxisLayoutPanel` class is responsible for managing the layout of Cartesian axes in a 3D chart.
 */
var CartesianAxisLayoutPanel = /** @class */ (function () {
    /**
     *
     *
     * @param {Chart3D} chartModule - Specifies the chart module.
     * @private
     */
    function CartesianAxisLayoutPanel(chartModule) {
        this.chart = chartModule;
    }
    /**
     * Measures and calculates the dimensions of the axis based on the provided rectangle.
     *
     * @param {Rect} rect - The rectangle used as a reference for axis measurement and sizing.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.measureAxis = function (rect) {
        var chart = this.chart;
        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
        this.initialClipRect = rect;
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        this.measureRowAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (!this.chart.delayRedraw) {
            this.calculateAxisSize(this.initialClipRect);
        }
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        this.measureRowAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (!this.chart.delayRedraw) {
            chart.refreshAxis();
            this.calculateAxisSize(this.seriesClipRect);
        }
    };
    /**
     * Measures and calculates the dimensions of the row axis within the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart containing the row axis.
     * @param {Rect} rect - The initial rect values.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.measureRowAxis = function (chart, rect) {
        var row;
        this.calculateRowSize(rect);
        for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
            var item = _a[_i];
            row = item;
            row.nearSizes = [];
            row.farSizes = [];
            this.arrangeAxis(row);
            this.measureDefinition(row, chart, new Size(chart.availableSize.width, row.computedHeight));
            if (this.leftSize < sum(row.nearSizes)) {
                this.leftSize = sum(row.nearSizes);
            }
            if (this.rightSize < sum(row.farSizes)) {
                this.rightSize = sum(row.farSizes);
            }
        }
    };
    /**
     * Measures and calculates the dimensions of the column axis within the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart containing the column axis.
     * @param {Rect} rect - The initial rect values.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.measureColumnAxis = function (chart, rect) {
        var column;
        this.calculateColumnSize(rect);
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var item = _a[_i];
            column = item;
            column.farSizes = [];
            column.nearSizes = [];
            this.arrangeAxis(column);
            this.measureDefinition(column, chart, new Size(column.computedWidth, chart.availableSize.height));
            if (this.bottomSize < sum(column.nearSizes)) {
                this.bottomSize = sum(column.nearSizes);
            }
            if (this.topSize < sum(column.farSizes)) {
                this.topSize = sum(column.farSizes);
            }
        }
    };
    /**
     * Measure the column and row in chart.
     *
     * @param {Chart3DRow | Chart3DColumn} definition - Specifies the row or column.
     * @param {Chart3D} chart - Specifies the chart.
     * @param {Size} size - Specifies the size.
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measureDefinition = function (definition, chart, size) {
        for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            axis.getModule(chart);
            axis.baseModule.calculateRangeAndInterval(size, axis);
            definition.computeSize(axis, chart);
        }
        if (definition.farSizes.length > 0) {
            definition.farSizes[definition.farSizes.length - 1] -= axisPadding;
        }
        if (definition.nearSizes.length > 0) {
            definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding;
        }
    };
    /**
     * Measure the axis.
     *
     * @param {Rect} rect - The initial rect values.
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.calculateAxisSize = function (rect) {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var axis;
        var nearCount = 0;
        var farCount = 0;
        var size = 0;
        var x;
        var y;
        var axisOffset;
        this.calculateRowSize(rect);
        for (var i = 0, len = chart.rows.length; i < len; i++) {
            row = chart.rows[i];
            nearCount = 0;
            farCount = 0;
            for (var j = 0, len_1 = row.axes.length; j < len_1; j++) {
                axis = row.axes[j];
                axisOffset = axis.plotOffset;
                if (axis.rect.height === 0) {
                    axis.rect.height = row.computedHeight;
                    size = 0;
                    for (var k = i + 1, len_2 = i + axis.span; k < len_2; k++) {
                        definition = chart.rows[k];
                        size += definition.computedHeight;
                    }
                    axis.rect.y = (row.computedTop - size) + (axis.plotOffsetTop ? axis.plotOffsetTop : axisOffset);
                    axis.rect.height = (axis.rect.height + size) -
                        (this.getAxisOffsetValue(axis.plotOffsetTop, axis.plotOffsetBottom, axis.plotOffset));
                    axis.rect.width = 0;
                }
                if (axis.isAxisOpposedPosition) {
                    x = rect.x + rect.width + sum(subArray(row.farSizes, farCount));
                    axis.rect.x = axis.rect.x >= x ? axis.rect.x : x;
                    farCount++;
                }
                else {
                    x = rect.x - sum(subArray(row.nearSizes, nearCount));
                    axis.rect.x = axis.rect.x <= x ? axis.rect.x : x;
                    nearCount++;
                }
            }
        }
        this.calculateColumnSize(rect);
        for (var i = 0, len = chart.columns.length; i < len; i++) {
            column = chart.columns[i];
            nearCount = 0;
            farCount = 0;
            for (var j = 0, len_3 = column.axes.length; j < len_3; j++) {
                axis = column.axes[j];
                axisOffset = axis.plotOffset;
                if (axis.rect.width === 0) {
                    for (var k = i, len_4 = (i + axis.span); k < len_4; k++) {
                        definition = chart.columns[k];
                        axis.rect.width += definition.computedWidth;
                    }
                    axis.rect.x = column.computedLeft + (axis.plotOffsetLeft ? axis.plotOffsetLeft : axisOffset);
                    axis.rect.width -= (this.getAxisOffsetValue(axis.plotOffsetLeft, axis.plotOffsetRight, axis.plotOffset));
                    axis.rect.height = 0;
                }
                if (axis.isAxisOpposedPosition) {
                    y = rect.y - sum(subArray(column.farSizes, farCount));
                    axis.rect.y = axis.rect.y <= y ? axis.rect.y : y;
                    farCount++;
                }
                else {
                    y = rect.y + rect.height + sum(subArray(column.nearSizes, nearCount));
                    axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                    nearCount++;
                }
            }
        }
    };
    /**
     * Measure the axis.
     *
     * @returns {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measure = function () {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var actualIndex;
        var span;
        for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
            var axis = _a[_i];
            if (axis.orientation === 'Vertical') {
                chart.verticalAxes.push(axis);
                actualIndex = this.getActualRow(axis);
                row = chart.rows[actualIndex];
                this.pushAxis(row, axis);
                span = ((actualIndex + axis.span) > chart.rows.length ? chart.rows.length : (actualIndex + axis.span));
                for (var j = actualIndex + 1; j < span; j++) {
                    definition = chart.rows[j];
                    definition.axes[row.axes.length - 1] = axis;
                    chart.rows[j] = definition;
                }
                chart.rows[actualIndex] = row;
            }
            else {
                chart.horizontalAxes.push(axis);
                actualIndex = this.getActualColumn(axis);
                column = chart.columns[actualIndex];
                this.pushAxis(column, axis);
                span = ((actualIndex + axis.span) > chart.columns.length ? chart.columns.length : (actualIndex + axis.span));
                for (var j = actualIndex + 1; j < span; j++) {
                    definition = chart.columns[j];
                    definition.axes[column.axes.length - 1] = axis;
                    chart.columns[j] = definition;
                }
                chart.columns[actualIndex] = column;
            }
            axis.isRTLEnabled = chart.enableRtl;
            axis.setIsInversedAndOpposedPosition();
        }
    };
    /**
     * Calculates the offset value for an axis based on positions and a plot offset.
     *
     * @param {number} position1 - The first position.
     * @param {number} position2 - The second position.
     * @param {number} plotOffset - The plot offset value.
     * @returns {number} - The calculated axis offset value.
     */
    CartesianAxisLayoutPanel.prototype.getAxisOffsetValue = function (position1, position2, plotOffset) {
        var rangeOffset = position1 ? (position1 + (position2 ? position2 :
            plotOffset)) : (position2 ? position2 + plotOffset : 2 * plotOffset);
        return rangeOffset;
    };
    /**
     * Pushes an axis definition into the specified row or column within the 3D chart.
     *
     * @param {Chart3DRow | Chart3DColumn} definition - The row or column definition to which the axis is added.
     * @param {Chart3DAxis} axis - The axis to be pushed into the definition.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.pushAxis = function (definition, axis) {
        for (var i = 0, len = definition.axes.length; i <= len; i++) {
            if (!definition.axes[i]) {
                definition.axes[i] = axis;
                break;
            }
        }
    };
    /**
     * Arranges and positions axis elements within the specified row or column definition.
     *
     * @param {Chart3DRow | Chart3DColumn} definition - The row or column definition in which axis elements are arranged.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.arrangeAxis = function (definition) {
        var axisCollection = [];
        for (var i = 0, len = definition.axes.length; i <= len; i++) {
            if (definition.axes[i]) {
                axisCollection.push(definition.axes[i]);
            }
        }
        definition.axes = axisCollection;
    };
    /**
     * Retrieves the actual column index for the specified axis within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual column index is retrieved.
     * @returns {number} - The actual column index.
     */
    CartesianAxisLayoutPanel.prototype.getActualColumn = function (axis) {
        var actualLength = this.chart.columns.length;
        var pos = axis.columnIndex;
        var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    };
    /**
     * Retrieves the actual row index for the specified axis within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The axis for which the actual row index is retrieved.
     * @returns {number} - The actual row index.
     */
    CartesianAxisLayoutPanel.prototype.getActualRow = function (axis) {
        var actualLength = this.chart.rows.length;
        var pos = axis.rowIndex;
        var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    };
    /**
     * Measure the row size.
     *
     * @param {Rect} rect - The available rect value.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.calculateRowSize = function (rect) {
        /** Calculate row size */
        var chart = this.chart;
        var row;
        var rowTop = rect.y + rect.height;
        var height = 0;
        var remainingHeight = Math.max(0, rect.height);
        for (var i = 0, len = chart.rows.length; i < len; i++) {
            row = chart.rows[i];
            if (row.height.indexOf('%') !== -1) {
                height = Math.min(remainingHeight, (rect.height * parseInt(row.height, 10) / 100));
            }
            else {
                height = Math.min(remainingHeight, parseInt(row.height, 10));
            }
            height = (i !== (len - 1)) ? height : remainingHeight;
            row.computedHeight = height;
            rowTop -= height;
            row.computedTop = rowTop;
            remainingHeight -= height;
        }
    };
    /**
     * Measure the column size.
     *
     * @param {Rect} rect - The available rect value.
     * @returns {void}
     */
    CartesianAxisLayoutPanel.prototype.calculateColumnSize = function (rect) {
        /** Calculate column size */
        var chart = this.chart;
        var column;
        var columnLeft = rect.x;
        var width = 0;
        var remainingWidth = Math.max(0, rect.width);
        for (var i = 0, len = chart.columns.length; i < len; i++) {
            column = chart.columns[i];
            if (column.width.indexOf('%') !== -1) {
                width = Math.min(remainingWidth, (rect.width * parseInt(column.width, 10) / 100));
            }
            else {
                width = Math.min(remainingWidth, parseInt(column.width, 10));
            }
            width = (i !== (len - 1)) ? width : remainingWidth;
            column.computedWidth = width;
            column.computedLeft = columnLeft;
            columnLeft += width;
            remainingWidth -= width;
        }
    };
    return CartesianAxisLayoutPanel;
}());
export { CartesianAxisLayoutPanel };
