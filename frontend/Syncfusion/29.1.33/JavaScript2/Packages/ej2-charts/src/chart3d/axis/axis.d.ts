import { ChildProperty } from '@syncfusion/ej2-base';
import { Size, Rect } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/doubleRange';
import { Chart3DSeries } from '../series/chart-series';
import { Double3D } from '../axis/double-axis';
import { DateTime3D } from '../axis/date-time-axis';
import { Category3D } from '../axis/category-axis';
import { DateTimeCategory3D } from '../axis/date-time-category-axis';
import { ChartRangePadding, EdgeLabelPlacement, IntervalType, LabelIntersectAction, LabelPlacement, Orientation, SkeletonType, ValueType } from '../../common/utils/enum';
import { Chart3D } from '../chart3D';
import { Chart3DMajorGridLinesModel, Chart3DMajorTickLinesModel, Chart3DMinorGridLinesModel, Chart3DMinorTickLinesModel } from './axis-model';
import { VisibleRangeModel } from '../../common/model/interface';
import { Chart3DTextFontModel } from '../model/chart3d-Interface-model';
/**
 * Configures the `rows` of the chart.
 */
export declare class Chart3DRow extends ChildProperty<Chart3DRow> {
    /**
     * The height of the row as a string accept input both as '100px' and '100%'.
     * If specified as '100%, row renders to the full height of its chart.
     *
     * @default '100%'
     */
    height: string;
    /** @private */
    axes: Chart3DAxis[];
    /** @private */
    computedHeight: number;
    /** @private */
    computedTop: number;
    /** @private */
    nearSizes: number[];
    /** @private */
    farSizes: number[];
    /**
     * Computes the size for a three-dimensional axis, row, or column within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The three-dimensional axis to compute the size for.
     * @param {Chart3D} chart - The 3D chart containing the axis and data definitions.
     * @returns {void}
     */
    computeSize(axis: Chart3DAxis, chart: Chart3D): void;
}
/**
 * Configures the `columns` of the chart.
 */
export declare class Chart3DColumn extends ChildProperty<Chart3DColumn> {
    /**
     * The width of the column as a string accepts input both as like '100px' or '100%'.
     * If specified as '100%, column renders to the full width of its chart.
     *
     * @default '100%'
     */
    width: string;
    /** @private */
    axes: Chart3DAxis[];
    /** @private */
    computedWidth: number;
    /** @private */
    computedLeft: number;
    /** @private */
    nearSizes: number[];
    /** @private */
    farSizes: number[];
    /**
     * Computes the size for a three-dimensional axis, row, or column within the 3D chart.
     *
     * @param {Chart3DAxis} axis - The three-dimensional axis to compute the size for.
     * @param {Chart3D} chart - The 3D chart containing the axis and data definitions.
     * @returns {void}
     */
    computeSize(axis: Chart3DAxis, chart: Chart3D): void;
}
/**
 * Configures the major grid lines in the `axis`.
 */
export declare class Chart3DMajorGridLines extends ChildProperty<Chart3DMajorGridLines> {
    /**
     * The width of the line in pixels.
     *
     * @default 1
     */
    width: number;
    /**
     * The color of the major grid line that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default null
     */
    color: string;
}
/**
 * Configures the minor grid lines in the `axis`.
 */
export declare class Chart3DMinorGridLines extends ChildProperty<Chart3DMinorGridLines> {
    /**
     * The width of the line in pixels.
     *
     * @default 0.7
     */
    width: number;
    /**
     * The color of the minor grid line that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default null
     */
    color: string;
}
/**
 * Configures the major tick lines.
 */
export declare class Chart3DMajorTickLines extends ChildProperty<Chart3DMajorTickLines> {
    /**
     * The width of the tick lines in pixels.
     *
     * @default 0
     */
    width: number;
    /**
     * The height of the ticks in pixels.
     *
     * @default 5
     */
    height: number;
    /**
     * The color of the major tick line that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default null
     */
    color: string;
}
/**
 * Configures the minor tick lines.
 */
export declare class Chart3DMinorTickLines extends ChildProperty<Chart3DMinorTickLines> {
    /**
     * The width of the tick line in pixels.
     *
     * @default 0
     */
    width: number;
    /**
     * The height of the ticks in pixels.
     *
     * @default 5
     */
    height: number;
    /**
     * The color of the minor tick line that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default null
     */
    color: string;
}
/**
 * Configures the axes in the chart.
 *
 * @public
 */
export declare class Chart3DAxis extends ChildProperty<Chart3DAxis> {
    /**
     * Options to customize the axis label.
     */
    labelStyle: Chart3DTextFontModel;
    /**
     * Specifies the title of an axis.
     *
     * @default ''
     */
    title: string;
    /**
     * Options for customizing the axis title.
     */
    titleStyle: Chart3DTextFontModel;
    /**
     * Used to format the axis label that accepts any global string format like 'C', 'n1', 'P' etc.
     * It also accepts placeholder like '{value}°C' in which value represent the axis label, e.g, 20°C.
     *
     * @default ''
     */
    labelFormat: string;
    /**
     * Specifies the skeleton format in which the dateTime format will process.
     *
     * @default ''
     */
    skeleton: string;
    /**
     * It specifies the type of format to be used in dateTime format process.
     *
     * @default 'DateTime'
     * @deprecated
     */
    skeletonType: SkeletonType;
    /**
     * Left and right padding for the plot area in pixels.
     *
     * @default 0
     */
    plotOffset: number;
    /**
     * Left padding for the plot area in pixels.
     *
     * @default null
     */
    plotOffsetLeft: number;
    /**
     * Top padding for the plot area in pixels.
     *
     * @default null
     */
    plotOffsetTop: number;
    /**
     * Right padding for the plot area in pixels.
     *
     * @default null
     */
    plotOffsetRight: number;
    /**
     * Bottom padding for the plot area in pixels.
     *
     * @default null
     */
    plotOffsetBottom: number;
    /**
     * Specifies indexed category  axis.
     *
     * @default false
     */
    isIndexed: boolean;
    /**
     * The base value for logarithmic axis. It requires `valueType` to be `Logarithmic`.
     *
     * @default 10
     */
    logBase: number;
    /**
     * Specifies the index of the column where the axis is associated,
     * when the chart area is divided into multiple plot areas by using `columns`.
     * ```html
     * <div id='Chart3D'></div>
     * ```
     * ```typescript
     * let chart3D: Chart3D = new Chart3D({
     * ...
     *     columns: [{ width: '50%' },
     *               { width: '50%' }],
     *     axes: [{
     *                name: 'xAxis 1',
     *                columnIndex: 1,
     *     }],
     * ...
     * });
     * chart3D.appendTo('#Chart3D');
     * ```
     *
     * @default 0
     */
    columnIndex: number;
    /**
     * Specifies the index of the row where the axis is associated, when the chart area is divided into multiple plot areas by using `rows`.
     * ```html
     * <div id='Chart3D'></div>
     * ```
     * ```typescript
     * let chart3D: Chart3D = new Chart3D({
     * ...
     *     rows: [{ height: '50%' },
     *            { height: '50%' }],
     *     axes: [{
     *                name: 'yAxis 1',
     *                rowIndex: 1,
     *      }],
     * ...
     * });
     * chart3D.appendTo('#Chart3D');
     * ```
     *
     * @default 0
     */
    rowIndex: number;
    /**
     * Specifies the number of `columns` or `rows` an axis has to span horizontally or vertically.
     *
     * @default 1
     */
    span: number;
    /**
     * With this property, you can request axis to calculate intervals approximately equal to your specified interval.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    desiredIntervals: number;
    /**
     * The maximum number of label count per 100 pixels with respect to the axis length.
     *
     * @default 3
     */
    maximumLabels: number;
    /**
     * If set to true, the axis will render at the opposite side of its default position.
     *
     * @default false
     */
    opposedPosition: boolean;
    /**
     * Specifies the padding for the axis range in terms of interval.They are,
     * * none: Padding cannot be applied to the axis.
     * * normal: Padding is applied to the axis based on the range calculation.
     * * additional: Interval of the axis is added as padding to the minimum and maximum values of the range.
     * * round: Axis range is rounded to the nearest possible value divided by the interval.
     *
     * @default 'Auto'
     */
    rangePadding: ChartRangePadding;
    /**
     * Specifies the data types that the axis can handle:
     * * Double: This type is used for rendering a numeric axis to accommodate numeric data.
     * * DateTime: This type is utilized for rendering a date-time axis to manage date-time data.
     * * Category: This type is employed for rendering a category axis to manage categorical data.
     * * Logarithmic: This type is applied for rendering a logarithmic axis to handle a wide range of values.
     * * DateTimeCategory: This type is used to render a date time category axis for managing business days.
     *
     * @default 'Double'
     * @isEnumeration true
     */
    valueType: ValueType;
    /**
     * Specifies the position of labels at the edge of the axis.They are,
     * * None: No action will be performed.
     * * Hide: Edge label will be hidden.
     * * Shift: Shifts the edge labels.
     *
     * @default 'None'
     */
    edgeLabelPlacement: EdgeLabelPlacement;
    /**
     * Specifies the types like `Years`, `Months`, `Days`, `Hours`, `Minutes`, `Seconds` in date time axis.They are,
     * * Auto: Defines the interval of the axis based on data.
     * * Years: Defines the interval of the axis in years.
     * * Months: Defines the interval of the axis in months.
     * * Days: Defines the interval of the axis in days.
     * * Hours: Defines the interval of the axis in hours.
     * * Minutes: Defines the interval of the axis in minutes.
     *
     * @default 'Auto'
     */
    intervalType: IntervalType;
    /**
     * Specifies the placement of a label for category axis. They are,
     * * betweenTicks: Renders the label between the ticks.
     * * onTicks: Renders the label on the ticks.
     *
     * @default 'OnTicks'
     */
    labelPlacement: LabelPlacement;
    /**
     * Unique identifier of an axis.
     * To associate an axis with the series, set this name to the xAxisName/yAxisName properties of the series.
     *
     * @default ''
     */
    name: string;
    /**
     * If set to true, axis label will be visible.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Specifies the number of minor ticks per interval.
     *
     * @default 0
     */
    minorTicksPerInterval: number;
    /**
     * The angle to which the axis label gets rotated.
     *
     * @default 0
     */
    labelRotation: number;
    /**
     * Defines an angle to rotate axis title. By default, angle auto calculated based on position and orientation of axis.
     *
     * @default null
     */
    titleRotation: number;
    /**
     * Specifies the minimum range of an axis.
     *
     * @default null
     */
    minimum: Object;
    /**
     * Specifies the maximum range of an axis.
     *
     * @default null
     */
    maximum: Object;
    /**
     * Specifies the interval for an axis.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    interval: number;
    /**
     * Specifies the maximum width of an axis label.
     *
     * @default 34.
     */
    maximumLabelWidth: number;
    /**
     * Specifies the Trim property for an axis.
     *
     * @default false
     */
    enableTrim: boolean;
    /**
     * Specifies the labelPadding from axis.
     *
     * @default 5
     */
    labelPadding: number;
    /**
     * Specifies the titlePadding from axis label.
     *
     * @default 5
     */
    titlePadding: number;
    /**
     * Options for customizing major tick lines.
     */
    majorTickLines: Chart3DMajorTickLinesModel;
    /**
     * Options for customizing minor tick lines.
     */
    minorTickLines: Chart3DMinorTickLinesModel;
    /**
     * Options for customizing major grid lines.
     */
    majorGridLines: Chart3DMajorGridLinesModel;
    /**
     * Options for customizing minor grid lines.
     */
    minorGridLines: Chart3DMinorGridLinesModel;
    /**
     * Specifies the actions like `None`, `Hide`, `Trim`, `Wrap`, `MultipleRows`, `Rotate45`, and `Rotate90`
     * when the axis labels intersect with each other.They are,
     * * None: Shows all the labels.
     * * Hide: Hides the label when it intersects.
     * * Trim: Trim the label when it intersects.
     * * Wrap: Wrap the label when it intersects.
     * * MultipleRows: Shows the label in MultipleRows when it intersects.
     * * Rotate45: Rotates the label to 45 degree when it intersects.
     * * Rotate90: Rotates the label to 90 degree when it intersects.
     *
     * @default Trim
     */
    labelIntersectAction: LabelIntersectAction;
    /**
     * It specifies whether the axis to be rendered in inversed manner or not.
     *
     * @default false
     */
    isInversed: boolean;
    /**
     * It specifies whether the axis to be start from zero.
     *
     * @default true
     */
    startFromZero: boolean;
    /** @private */
    visibleRange: VisibleRangeModel;
    /** @private */
    visibleLabels: Visible3DLabels[];
    /** @private */
    actualRange: VisibleRangeModel;
    /** @private */
    series: Chart3DSeries[];
    /** @private */
    doubleRange: DoubleRange;
    /** @private */
    maxLabelSize: Size;
    /** @private */
    rotatedLabel: string;
    /** @private */
    rect: Rect;
    /** @private */
    orientation: Orientation;
    /** @private */
    actualIntervalType: IntervalType;
    /** @private */
    labels: string[];
    /** @private */
    indexLabels: object;
    /** @private */
    format: Function;
    /** @private */
    baseModule: Double3D | DateTime3D | Category3D | DateTimeCategory3D;
    /** @private */
    startLabel: string;
    /** @private */
    endLabel: string;
    /** @private */
    angle: number;
    /** @private */
    dateTimeInterval: number;
    /** @private */
    isStack100: boolean;
    /** @private */
    updatedRect: Rect;
    /** @private */
    maxPointLength: number;
    /** @private */
    isIntervalInDecimal: boolean;
    /** @private */
    intervalDivs: number[];
    /** @private */
    titleCollection: string[];
    /** @private */
    titleSize: Size;
    /** @private */
    isAxisInverse: boolean;
    /** @private */
    isAxisOpposedPosition: boolean;
    /**
     * This property used to hide the axis when series hide from legend click.
     *
     * @private
     */
    internalVisibility: boolean;
    /**
     * This property is used to place the vertical axis in opposed position and horizontal axis in inversed.
     * when RTL is enabled in chart
     *
     * @private */
    isRTLEnabled: boolean;
    constructor(parent: Chart3DAxis, propName: string, defaultValue: Object, isArray?: boolean);
    /**
     * Finds the size of labels with specified inner padding within the 3D chart.
     *
     * @param {number} innerPadding - The inner padding value for labels.
     * @param {Chart3D} chart - The 3D chart for which label size is calculated.
     * @returns {number} - The size of labels accounting for the inner padding.
     */
    findLabelSize(innerPadding: number, chart: Chart3D): number;
    /**
     * Triggers the axis range calculated event with specified minimum, maximum, and interval values.
     *
     * @param {Chart3D} chart - The 3D chart for which the range is being calculated.
     * @param {number} minimum - The minimum value of the range.
     * @param {number} maximum - The maximum value of the range.
     * @param {number} interval - The interval value for the range.
     * @returns {void}
     */
    triggerRangeRender(chart: Chart3D, minimum: number, maximum: number, interval: number): void;
    /**
     * Calculate padding for the axis.
     *
     * @param {Chart3D} chart - Chart instance.
     * @returns {string} - Padding value.
     * @private
     */
    getRangePadding(chart: Chart3D): string;
    /**
     * Calculate maximum label width for the axis.
     *
     * @param {Chart3D} chart - Chart instance.
     * @returns {void}
     * @private
     */
    getMaxLabelWidth(chart: Chart3D): void;
    /**
     * Finds and manages multiple rows for labels within the 3D chart axis.
     *
     * @param {number} length - The length of the labels to be considered.
     * @param {number} currentX - The current X position.
     * @param {Visible3DLabels} currentLabel - The label for which multiple rows are being determined.
     * @param {boolean} isBreakLabels - Indicates whether the labels are break labels.
     * @returns {void}
     */
    private findMultiRows;
    /**
     * Finds the default module for axis.
     *
     * @param {Chart3D} chart - Chart instance.
     * @returns {void}
     * @private
     */
    getModule(chart: Chart3D): void;
    /**
     * Set the axis `opposedPosition` and `isInversed` properties.
     *
     * @returns {void}
     * @private
     */
    setIsInversedAndOpposedPosition(): void;
}
/**
 * Calculates the axis visible labels.
 *
 * @private
 */
export declare class Visible3DLabels {
    text: string | string[];
    value: number;
    labelStyle: Chart3DTextFontModel;
    size: Size;
    breakLabelSize: Size;
    index: number;
    originalText: string;
    constructor(text: string | string[], value: number, labelStyle: Chart3DTextFontModel, originalText: string | string[], size?: Size, breakLabelSize?: Size, index?: number);
}
