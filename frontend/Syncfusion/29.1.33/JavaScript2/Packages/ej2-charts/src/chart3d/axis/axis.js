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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, Complex, ChildProperty, Browser } from '@syncfusion/ej2-base';
import { rotateTextSize, firstToLowerCase, isBreakLabel, getTitle } from '../../common/utils/helper';
import { Size, Rect, measureText } from '@syncfusion/ej2-svg-base';
import { Double3D } from '../axis/double-axis';
import { axisRangeCalculated } from '../../common/model/constants';
import { textWrap } from '../../common/utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Chart3DTextFont } from '../model/chart3d-Interface';
import { valueToCoefficients } from '../utils/chart3dRender';
/**
 * Configures the `rows` of the chart.
 */
var Chart3DRow = /** @class */ (function (_super) {
    __extends(Chart3DRow, _super);
    function Chart3DRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        return _this;
    }
    /**
     * Computes the size for a three-dimensional axis, row, or column within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The three-dimensional axis to compute the size for.
     * @param {Chart3D} chart - The 3D chart containing the axis and data definitions.
     * @returns {void}
     */
    Chart3DRow.prototype.computeSize = function (axis, chart) {
        var width = 0;
        var innerPadding = 5;
        if (axis.visible && axis.internalVisibility) {
            width += (axis.majorTickLines.height +
                axis.findLabelSize(innerPadding, chart));
        }
        if (axis.isAxisOpposedPosition) {
            this.farSizes.push(width);
        }
        else {
            this.nearSizes.push(width);
        }
    };
    __decorate([
        Property('100%')
    ], Chart3DRow.prototype, "height", void 0);
    return Chart3DRow;
}(ChildProperty));
export { Chart3DRow };
/**
 * Configures the `columns` of the chart.
 */
var Chart3DColumn = /** @class */ (function (_super) {
    __extends(Chart3DColumn, _super);
    function Chart3DColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        return _this;
    }
    /**
     * Computes the size for a three-dimensional axis, row, or column within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The three-dimensional axis to compute the size for.
     * @param {Chart3D} chart - The 3D chart containing the axis and data definitions.
     * @returns {void}
     */
    Chart3DColumn.prototype.computeSize = function (axis, chart) {
        var height = 0;
        var innerPadding = 5;
        if (axis.visible && axis.internalVisibility) {
            height += (axis.majorTickLines.height +
                axis.findLabelSize(innerPadding, chart));
        }
        if (axis.isAxisOpposedPosition) {
            this.farSizes.push(height);
        }
        else {
            this.nearSizes.push(height);
        }
    };
    __decorate([
        Property('100%')
    ], Chart3DColumn.prototype, "width", void 0);
    return Chart3DColumn;
}(ChildProperty));
export { Chart3DColumn };
/**
 * Configures the major grid lines in the `axis`.
 */
var Chart3DMajorGridLines = /** @class */ (function (_super) {
    __extends(Chart3DMajorGridLines, _super);
    function Chart3DMajorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], Chart3DMajorGridLines.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Chart3DMajorGridLines.prototype, "color", void 0);
    return Chart3DMajorGridLines;
}(ChildProperty));
export { Chart3DMajorGridLines };
/**
 * Configures the minor grid lines in the `axis`.
 */
var Chart3DMinorGridLines = /** @class */ (function (_super) {
    __extends(Chart3DMinorGridLines, _super);
    function Chart3DMinorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], Chart3DMinorGridLines.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Chart3DMinorGridLines.prototype, "color", void 0);
    return Chart3DMinorGridLines;
}(ChildProperty));
export { Chart3DMinorGridLines };
/**
 * Configures the major tick lines.
 */
var Chart3DMajorTickLines = /** @class */ (function (_super) {
    __extends(Chart3DMajorTickLines, _super);
    function Chart3DMajorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Chart3DMajorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], Chart3DMajorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], Chart3DMajorTickLines.prototype, "color", void 0);
    return Chart3DMajorTickLines;
}(ChildProperty));
export { Chart3DMajorTickLines };
/**
 * Configures the minor tick lines.
 */
var Chart3DMinorTickLines = /** @class */ (function (_super) {
    __extends(Chart3DMinorTickLines, _super);
    function Chart3DMinorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Chart3DMinorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], Chart3DMinorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], Chart3DMinorTickLines.prototype, "color", void 0);
    return Chart3DMinorTickLines;
}(ChildProperty));
export { Chart3DMinorTickLines };
/**
 * Configures the axes in the chart.
 *
 * @public
 */
var Chart3DAxis = /** @class */ (function (_super) {
    __extends(Chart3DAxis, _super);
    function Chart3DAxis(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        /** @private */
        _this.visibleLabels = [];
        /** @private */
        _this.series = [];
        /** @private */
        _this.rect = new Rect(undefined, undefined, 0, 0);
        /** @private */
        _this.isStack100 = false;
        /** @private */
        _this.updatedRect = null;
        /** @private */
        _this.isIntervalInDecimal = true;
        /** @private */
        _this.intervalDivs = [10, 5, 2, 1];
        /** @private */
        _this.titleCollection = [];
        /** @private */
        _this.titleSize = new Size(0, 0);
        /**
         * This property used to hide the axis when series hide from legend click.
         *
         * @private
         */
        _this.internalVisibility = true;
        /**
         * This property is used to place the vertical axis in opposed position and horizontal axis in inversed.
         * when RTL is enabled in chart
         *
         * @private */
        _this.isRTLEnabled = false;
        _this.angle = _this.labelRotation;
        return _this;
    }
    /**
     * Finds the size of labels with specified inner padding within the 3D chart.
     *
     * @param {number} innerPadding - The inner padding value for labels.
     * @param {Chart3D} chart - The 3D chart for which label size is calculated.
     * @returns {number} - The size of labels accounting for the inner padding.
     */
    Chart3DAxis.prototype.findLabelSize = function (innerPadding, chart) {
        var titleSize = 0;
        var isHorizontal = this.orientation === 'Horizontal';
        if (this.title) {
            var angle = this.titleRotation;
            if ((isNullOrUndefined(angle))) {
                this.titleSize = measureText(this.title, this.titleStyle, chart.themeStyle.axisTitleFont);
                titleSize = this.titleSize.height + innerPadding;
            }
            else {
                this.titleSize = rotateTextSize(this.titleStyle, this.title, angle, chart, chart.themeStyle.axisTitleFont);
                titleSize = (this.orientation === 'Vertical' ? this.titleSize.width : this.titleSize.height) + innerPadding;
            }
            if (this.rect.width || this.rect.height) {
                var length_1 = isHorizontal ? this.rect.width : this.rect.height;
                this.titleCollection = getTitle(this.title, this.titleStyle, length_1, chart.enableRtl, chart.themeStyle.axisTitleFont);
                titleSize = (titleSize * this.titleCollection.length);
            }
        }
        var labelSize = titleSize + innerPadding + this.titlePadding + this.labelPadding +
            ((this.orientation === 'Vertical') ? this.maxLabelSize.width : this.maxLabelSize.height);
        return labelSize;
    };
    /**
     * Triggers the axis range calculated event with specified minimum, maximum, and interval values.
     *
     * @param {Chart3D} chart - The 3D chart for which the range is being calculated.
     * @param {number} minimum - The minimum value of the range.
     * @param {number} maximum - The maximum value of the range.
     * @param {number} interval - The interval value for the range.
     * @returns {void}
     */
    Chart3DAxis.prototype.triggerRangeRender = function (chart, minimum, maximum, interval) {
        var argsData = {
            cancel: false, axis: this,
            minimum: minimum, maximum: maximum, interval: interval
        };
        chart.trigger(axisRangeCalculated, argsData);
        if (!argsData.cancel) {
            this.visibleRange = {
                min: argsData.minimum, max: argsData.maximum, interval: argsData.interval,
                delta: argsData.maximum - argsData.minimum
            };
        }
    };
    /**
     * Calculate padding for the axis.
     *
     * @param {Chart3D} chart - Chart instance.
     * @returns {string} - Padding value.
     * @private
     */
    Chart3DAxis.prototype.getRangePadding = function (chart) {
        var padding = this.rangePadding;
        if (padding !== 'Auto') {
            return padding;
        }
        switch (this.orientation) {
            case 'Horizontal':
                if (chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
            case 'Vertical':
                if (!chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
        }
        return padding;
    };
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {Chart3D} chart - Chart instance.
     * @returns {void}
     * @private
     */
    Chart3DAxis.prototype.getMaxLabelWidth = function (chart) {
        var pointX;
        var previousEnd = 0;
        var isIntersect = false;
        var isAxisLabelBreak;
        this.angle = this.labelRotation;
        this.maxLabelSize = new Size(0, 0);
        var action = this.labelIntersectAction;
        var label;
        for (var i = 0, len = this.visibleLabels.length; i < len; i++) {
            label = this.visibleLabels[i];
            isAxisLabelBreak = isBreakLabel(label.originalText);
            if (isAxisLabelBreak) {
                label.size = measureText(label.originalText.replace(/<br>/g, ' '), this.labelStyle, chart.themeStyle.axisLabelFont);
                label.breakLabelSize = measureText(this.enableTrim ? label.text.join('<br>') : label.originalText, this.labelStyle, chart.themeStyle.axisLabelFont);
            }
            else {
                label.size = measureText(label.text, this.labelStyle, chart.themeStyle.axisLabelFont);
            }
            var width = isAxisLabelBreak ? label.breakLabelSize.width : label.size.width;
            if (width > this.maxLabelSize.width) {
                this.maxLabelSize.width = width;
                this.rotatedLabel = label.text;
            }
            var height = isAxisLabelBreak ? label.breakLabelSize.height : label.size.height;
            if (height > this.maxLabelSize.height) {
                this.maxLabelSize.height = height;
            }
            if (isAxisLabelBreak) {
                label.text = this.enableTrim ? label.text : label.originalText.split('<br>');
            }
            if (action === 'None' || action === 'Hide' || action === 'Trim') {
                continue;
            }
            if ((action !== 'None' || this.angle % 360 === 0) && this.orientation === 'Horizontal' &&
                this.rect.width > 0 && !isIntersect) {
                var width1 = isAxisLabelBreak ? label.breakLabelSize.width : label.size.width;
                pointX = (valueToCoefficients(label.value, this) * this.rect.width) + this.rect.x;
                pointX -= width1 / 2;
                if (this.edgeLabelPlacement === 'Shift') {
                    if (i === 0 && pointX < this.rect.x) {
                        pointX = this.rect.x;
                    }
                    if (i === this.visibleLabels.length - 1 && ((pointX + width1) > (this.rect.x + this.rect.width))) {
                        pointX = this.rect.x + this.rect.width - width1;
                    }
                }
                switch (action) {
                    case 'MultipleRows':
                        if (i > 0) {
                            this.findMultiRows(i, pointX, label, isAxisLabelBreak);
                        }
                        break;
                    case 'Rotate45':
                    case 'Rotate90':
                        if (i > 0 && (!this.isAxisInverse ? pointX <= previousEnd : pointX + width1 >= previousEnd)) {
                            this.angle = (action === 'Rotate45') ? 45 : 90;
                            isIntersect = true;
                        }
                        break;
                    default: {
                        if (isAxisLabelBreak) {
                            var result = void 0;
                            var result1 = [];
                            var str = void 0;
                            for (var index = 0; index < label.text.length; index++) {
                                result = textWrap(label.text[index], this.rect.width / this.visibleLabels.length, this.labelStyle, chart.enableRtl, null, null, chart.themeStyle.axisLabelFont);
                                if (result.length > 1) {
                                    for (var j = 0; j < result.length; j++) {
                                        str = result[j];
                                        result1.push(str);
                                    }
                                }
                                else {
                                    result1.push(result[0]);
                                }
                            }
                            label.text = result1;
                        }
                        else {
                            label.text = textWrap(label.text, this.rect.width / this.visibleLabels.length, this.labelStyle, chart.enableRtl, null, null, chart.themeStyle.axisLabelFont);
                        }
                        var height_1 = (label.size.height * label.text.length);
                        if (height_1 > this.maxLabelSize.height) {
                            this.maxLabelSize.height = height_1;
                        }
                        break;
                    }
                }
                previousEnd = this.isAxisInverse ? pointX : pointX + width1;
            }
        }
        if (this.angle !== 0 && this.orientation === 'Horizontal') {
            this.rotatedLabel = isNullOrUndefined(this.rotatedLabel) ? '' : this.rotatedLabel;
            var isHorizontalAngle = this.angle === -360 || this.angle === 0 || this.angle === -180 ||
                this.angle === 180 || this.angle === 360;
            if (!isHorizontalAngle && isBreakLabel(this.rotatedLabel)) {
                this.maxLabelSize = new Size(this.maxLabelSize.height, this.maxLabelSize.width);
            }
            this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart, chart.themeStyle.axisLabelFont);
        }
        else if (this.angle !== 0 && this.orientation === 'Vertical') {
            this.rotatedLabel = isNullOrUndefined(this.rotatedLabel) ? '' : this.rotatedLabel;
            var isHorizontalAngle = this.angle === -360 || this.angle === 0 || this.angle === -180 ||
                this.angle === 180 || this.angle === 360;
            // To avoid overlap axis label with chart title or chart legend when it is outside.
            if (!isHorizontalAngle && isBreakLabel(this.rotatedLabel)) {
                this.maxLabelSize = new Size(this.maxLabelSize.height, this.maxLabelSize.width);
            }
            this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart, chart.themeStyle.axisLabelFont);
        }
    };
    /**
     * Finds and manages multiple rows for labels within the 3D chart axis.
     *
     * @param {number} length - The length of the labels to be considered.
     * @param {number} currentX - The current X position.
     * @param {Visible3DLabels} currentLabel - The label for which multiple rows are being determined.
     * @param {boolean} isBreakLabels - Indicates whether the labels are break labels.
     * @returns {void}
     */
    Chart3DAxis.prototype.findMultiRows = function (length, currentX, currentLabel, isBreakLabels) {
        var label;
        var pointX;
        var width2;
        var store = [];
        var isMultiRows;
        for (var i = length - 1; i >= 0; i--) {
            label = this.visibleLabels[i];
            width2 = isBreakLabels ? label.breakLabelSize.width : label.size.width;
            pointX = (valueToCoefficients(label.value, this) * this.rect.width) + this.rect.x;
            isMultiRows = !this.isAxisInverse ? currentX < (pointX + width2 * 0.5) :
                currentX + currentLabel.size.width > (pointX - width2 * 0.5);
            if (isMultiRows) {
                store.push(label.index);
                currentLabel.index = (currentLabel.index > label.index) ? currentLabel.index : label.index + 1;
            }
            else {
                currentLabel.index = store.indexOf(label.index) > -1 ? currentLabel.index : label.index;
            }
        }
        var height = ((isBreakLabels ? currentLabel.breakLabelSize.height : currentLabel.size.height) * currentLabel.index) +
            (5 * (currentLabel.index - 1));
        if (height > this.maxLabelSize.height) {
            this.maxLabelSize.height = height;
        }
    };
    /**
     * Finds the default module for axis.
     *
     * @param {Chart3D} chart - Chart instance.
     * @returns {void}
     * @private
     */
    Chart3DAxis.prototype.getModule = function (chart) {
        if (this.valueType === 'Double') {
            this.baseModule = new Double3D(chart);
        }
        else {
            this.baseModule = chart[firstToLowerCase(this.valueType) + '3DModule'];
        }
    };
    /**
     * Set the axis `opposedPosition` and `isInversed` properties.
     *
     * @returns {void}
     * @private
     */
    Chart3DAxis.prototype.setIsInversedAndOpposedPosition = function () {
        this.isAxisOpposedPosition = this.opposedPosition || (this.isRTLEnabled && this.orientation === 'Vertical');
        this.isAxisInverse = this.isInversed || (this.isRTLEnabled && this.orientation === 'Horizontal');
    };
    __decorate([
        Complex({ fontFamily: null, size: '12px', fontStyle: 'Normal', fontWeight: '400', color: null }, Chart3DTextFont)
    ], Chart3DAxis.prototype, "labelStyle", void 0);
    __decorate([
        Property('')
    ], Chart3DAxis.prototype, "title", void 0);
    __decorate([
        Complex({ fontFamily: null, size: null, fontStyle: null, fontWeight: null, color: null }, Chart3DTextFont)
    ], Chart3DAxis.prototype, "titleStyle", void 0);
    __decorate([
        Property('')
    ], Chart3DAxis.prototype, "labelFormat", void 0);
    __decorate([
        Property('')
    ], Chart3DAxis.prototype, "skeleton", void 0);
    __decorate([
        Property('DateTime')
    ], Chart3DAxis.prototype, "skeletonType", void 0);
    __decorate([
        Property(0)
    ], Chart3DAxis.prototype, "plotOffset", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "plotOffsetLeft", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "plotOffsetTop", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "plotOffsetRight", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "plotOffsetBottom", void 0);
    __decorate([
        Property(false)
    ], Chart3DAxis.prototype, "isIndexed", void 0);
    __decorate([
        Property(10)
    ], Chart3DAxis.prototype, "logBase", void 0);
    __decorate([
        Property(0)
    ], Chart3DAxis.prototype, "columnIndex", void 0);
    __decorate([
        Property(0)
    ], Chart3DAxis.prototype, "rowIndex", void 0);
    __decorate([
        Property(1)
    ], Chart3DAxis.prototype, "span", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "desiredIntervals", void 0);
    __decorate([
        Property(3)
    ], Chart3DAxis.prototype, "maximumLabels", void 0);
    __decorate([
        Property(false)
    ], Chart3DAxis.prototype, "opposedPosition", void 0);
    __decorate([
        Property('Auto')
    ], Chart3DAxis.prototype, "rangePadding", void 0);
    __decorate([
        Property('Double')
    ], Chart3DAxis.prototype, "valueType", void 0);
    __decorate([
        Property('None')
    ], Chart3DAxis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        Property('Auto')
    ], Chart3DAxis.prototype, "intervalType", void 0);
    __decorate([
        Property('OnTicks')
    ], Chart3DAxis.prototype, "labelPlacement", void 0);
    __decorate([
        Property('')
    ], Chart3DAxis.prototype, "name", void 0);
    __decorate([
        Property(true)
    ], Chart3DAxis.prototype, "visible", void 0);
    __decorate([
        Property(0)
    ], Chart3DAxis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        Property(0)
    ], Chart3DAxis.prototype, "labelRotation", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "titleRotation", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "minimum", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "maximum", void 0);
    __decorate([
        Property(null)
    ], Chart3DAxis.prototype, "interval", void 0);
    __decorate([
        Property(34)
    ], Chart3DAxis.prototype, "maximumLabelWidth", void 0);
    __decorate([
        Property(false)
    ], Chart3DAxis.prototype, "enableTrim", void 0);
    __decorate([
        Property(5)
    ], Chart3DAxis.prototype, "labelPadding", void 0);
    __decorate([
        Property(5)
    ], Chart3DAxis.prototype, "titlePadding", void 0);
    __decorate([
        Complex({}, Chart3DMajorTickLines)
    ], Chart3DAxis.prototype, "majorTickLines", void 0);
    __decorate([
        Complex({}, Chart3DMinorTickLines)
    ], Chart3DAxis.prototype, "minorTickLines", void 0);
    __decorate([
        Complex({}, Chart3DMajorGridLines)
    ], Chart3DAxis.prototype, "majorGridLines", void 0);
    __decorate([
        Complex({}, Chart3DMinorGridLines)
    ], Chart3DAxis.prototype, "minorGridLines", void 0);
    __decorate([
        Property(Browser.isDevice ? 'Rotate45' : 'Trim')
    ], Chart3DAxis.prototype, "labelIntersectAction", void 0);
    __decorate([
        Property(false)
    ], Chart3DAxis.prototype, "isInversed", void 0);
    __decorate([
        Property(true)
    ], Chart3DAxis.prototype, "startFromZero", void 0);
    return Chart3DAxis;
}(ChildProperty));
export { Chart3DAxis };
/**
 * Calculates the axis visible labels.
 *
 * @private
 */
var Visible3DLabels = /** @class */ (function () {
    function Visible3DLabels(text, value, labelStyle, originalText, size, breakLabelSize, index) {
        if (size === void 0) { size = new Size(0, 0); }
        if (breakLabelSize === void 0) { breakLabelSize = new Size(0, 0); }
        if (index === void 0) { index = 1; }
        this.text = text;
        this.originalText = originalText;
        this.value = value;
        this.labelStyle = labelStyle;
        this.size = size;
        this.breakLabelSize = breakLabelSize;
        this.index = index;
    }
    return Visible3DLabels;
}());
export { Visible3DLabels };
