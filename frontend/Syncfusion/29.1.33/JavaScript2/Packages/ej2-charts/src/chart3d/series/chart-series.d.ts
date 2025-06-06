import { ChildProperty } from '@syncfusion/ej2-base';
import { StackValues } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { BorderModel, MarginModel, AnimationModel } from '../../common/model/base-model';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Chart3DAxis, Chart3DColumn, Chart3DRow } from '../axis/axis';
import { Data } from '../../common/model/data';
import { EmptyPointMode, LegendShape, SeriesCategories, ShapeType } from '../../common/utils/enum';
import { Chart3D } from '../chart3D';
import { Chart3DStyleOptions, Chart3DLocation, Chart3DRangeValues, Chart3DDepthInfoType } from '../model/chart3d-Interface';
import { Chart3DSeriesType, Chart3DDataLabelPosition } from '../utils/enum';
import { Chart3DEmptyPointSettingsModel, Chart3DDataLabelSettingsModel } from './chart-series-model';
import { Chart3DTextFontModel } from '../model/chart3d-Interface-model';
/**
 * Configures the data label in the series.
 */
export declare class Chart3DDataLabelSettings extends ChildProperty<Chart3DDataLabelSettings> {
    /**
     * If set true, data label for series renders.
     *
     * @default false
     */
    visible: boolean;
    /**
     * The DataSource field that contains the data label value.
     *
     * @default null
     */
    name: string;
    /**
     * The background color of the data label accepts value in hex and rgba as a valid CSS color string.
     *
     * @default 'transparent'
     */
    fill: string;
    /**
     * Used to format the point data label that accepts any global string format like 'C', 'n1', 'P' etc.
     * It also accepts placeholder like '{value}°C' in which value represent the point data label, e.g, 20°C.
     *
     * @default null
     */
    format: string;
    /**
     * The opacity for the background.
     *
     * @default 1
     */
    opacity: number;
    /**
     * Specifies angle for data label.
     *
     * @default 0
     */
    angle: number;
    /**
     * Enables rotation for data label.
     *
     * @default false
     */
    enableRotation: boolean;
    /**
     * Specifies the position of the data label. They are,
     * * top: Positions the label on top of the point.
     * * Bottom: Positions the label at the bottom of the point.
     * * Middle: Positions the label to the middle of the point.
     *
     * @default 'Middle'
     */
    position: Chart3DDataLabelPosition;
    /**
     * Option for customizing the border lines.
     */
    border: BorderModel;
    /**
     * Margin configuration for the data label.
     */
    margin: MarginModel;
    /**
     * Option for customizing the data label text.
     */
    font: Chart3DTextFontModel;
    /**
     * Custom template to show the data label. Use ${point.x} and ${point.y} as a placeholder
     * text to display the corresponding data point.
     *
     * @default null
     * @aspType string
     */
    template: string | Function;
}
/**
 * Configures the Empty Points of series
 */
export declare class Chart3DEmptyPointSettings extends ChildProperty<Chart3DEmptyPointSettings> {
    /**
     * To customize the fill color of empty points.
     *
     * @default null
     */
    fill: string;
    /**
     * To customize the mode of empty points.
     *
     * @default Gap
     */
    mode: EmptyPointMode;
}
/**
 * Points model for the series.
 *
 * @public
 */
export declare class Chart3DPoint {
    /** Point x. */
    x: Object;
    /** Point y. */
    y: Object;
    /** Point visibility. */
    visible: boolean;
    /** Point text. */
    text: string;
    /** Point tooltip. */
    tooltip: string;
    /** Point color. */
    color: string;
    /** Point symbol location. */
    symbolLocations: Chart3DLocation;
    /** Point x value. */
    xValue: number;
    /** Point y value. */
    yValue: number;
    /** Point color mapping. */
    colorValue: number;
    /** Point index value. */
    index: number;
    /** Point percentage value. */
    percentage: number;
    /** Point size value. */
    size: Object;
    /** Point empty checking. */
    isEmpty: boolean;
    /** Point interior value. */
    interior: string;
    /** To know the point is selected. */
    isSelect: boolean;
    /** Point x. */
    series: Object;
    /** Point top value. */
    top: number;
    /** Point bottom value. */
    bottom: number;
    /** Point right value. */
    right: number;
    /** Point left value. */
    left: number;
    /** Point start depth value. */
    startDepth: number;
    /** Point end depth value. */
    endDepth: number;
    /** Point x range values. */
    xRange: Chart3DRangeValues;
    /** Point y range values. */
    yRange: Chart3DRangeValues;
    /** Point plan values. */
    plans: Chart3DRangeValues;
}
/**
 * Configures the series in charts.
 *
 * @public
 */
export declare class Chart3DSeries extends ChildProperty<Chart3DSeries> {
    /**
     * The DataSource field that contains the x value.
     *
     * @default ''
     */
    xName: string;
    /**
     * The DataSource field that contains the point colors.
     *
     * @default ''
     */
    pointColorMapping: string;
    /**
     * Specifies the visibility of series.
     *
     * @default true
     */
    visible: boolean;
    /**
     * The name of the horizontal axis associated with the series. It requires `axes` of the chart.
     *
     * @default null
     */
    xAxisName: string;
    /**
     * The name of the vertical axis associated with the series. It requires `axes` of the chart.
     *
     * @default null
     */
    yAxisName: string;
    /**
     * Options to customizing animation for the series.
     */
    animation: AnimationModel;
    /**
     * The fill color for the series, which can accept values in hex or rgba as a valid CSS color string.
     *
     * @default null
     */
    fill: string;
    /**
     * Specifies the data source for the series. It can be an array of JSON objects or an instance of DataManager.
     *
     *
     * @default ''
     */
    dataSource: Object | DataManager;
    /**
     * Specifies a query to select data from the DataSource. This property is applicable only when the DataSource is an `ej.DataManager`.
     *
     * @default ''
     */
    query: Query;
    /**
     * The data label for the series.
     */
    dataLabel: Chart3DDataLabelSettingsModel;
    /**
     * The name of the series as displayed in the legend.
     *
     * @default ''
     */
    name: string;
    /**
     * The DataSource field that contains the y value.
     *
     * @default ''
     */
    yName: string;
    /**
     * The DataSource field that contains the size value of y
     *
     * @default ''
     */
    size: string;
    /**
     * This property allows grouping series in `stacked column / bar` charts.
     * Any string value can be provided to the stackingGroup property.
     * If any two or above series have the same value, those series will be grouped together.
     *
     * @default ''
     */
    stackingGroup: string;
    /**
     * The opacity of the series.
     *
     * @default 1
     */
    opacity: number;
    /**
     * Defines the name that specifies the chart series are mutually exclusive and can be overlaid.
     * The axis in the same group shares the same baseline and location on the corresponding axis.
     *
     * @default ''
     */
    groupName: string;
    /**
     * Specifies the type of the series in the 3D chart. Available options include:
     * - Column
     * - Bar
     * - StackingColumn
     * - StackingBar
     * - StackingColumn100
     * - StackingBar100
     *
     * @default 'Column'
     */
    type: Chart3DSeriesType;
    /**
     * Enable tooltip for the chart series.
     *
     * @default true
     */
    enableTooltip: boolean;
    /**
     * Format of the tooltip content.
     *
     * @default ''
     */
    tooltipFormat: string;
    /**
     * The data source field that contains the tooltip value.
     *
     * @default ''
     */
    tooltipMappingName: string;
    /**
     * The shape of the legend. Each series has its own legend shape, which can be one of the following:
     * * Circle
     * * Rectangle
     * * Triangle
     * * Diamond
     * * Cross
     * * HorizontalLine
     * * VerticalLine
     * * Pentagon
     * * InvertedTriangle
     * * SeriesType
     * * Image
     *
     * @default 'SeriesType'
     */
    legendShape: LegendShape;
    /**
     * The URL for the Image that is to be displayed as a Legend icon.  It requires  `legendShape` value to be an `Image`.
     *
     * @default ''
     */
    legendImageUrl: string;
    /**
     * options to customize the empty points in series.
     */
    emptyPointSettings: Chart3DEmptyPointSettingsModel;
    /**
     * Render the column series points with a particular column width.
     *
     * @default null
     */
    columnWidth: number;
    /**
     * Defines the shape of the data in a column and bar chart.
     * Rectangle: Displays the data in a column and bar chart in a rectangle shape.
     * Cylinder: Displays the data in a column and bar chart in a cylinder shape.
     *
     * @default 'Rectangle'
     */
    columnFacet: ShapeType;
    /**
     * To render the column series points with particular column spacing. It takes value from 0 - 1.
     *
     * @default 0.1
     */
    columnSpacing: number;
    /** @private */
    xMin: number;
    /** @private */
    xMax: number;
    /** @private */
    yMin: number;
    /** @private */
    yMax: number;
    /** @private */
    xAxis: Chart3DAxis;
    /** @private */
    yAxis: Chart3DAxis;
    /** @private */
    chart: Chart3D;
    /** @private */
    currentViewData: Object;
    /** @private */
    clipRect: Rect;
    /** @private */
    xData: number[];
    /** @private */
    yData: number[];
    /** @private */
    index: number;
    /** @private */
    dataModule: Data;
    /** @private */
    points: Chart3DPoint[];
    /** @private */
    visiblePoints: Chart3DPoint[];
    /** @private */
    sizeMax: number;
    /** @private */
    dataLabelElement: HTMLElement;
    visibleSeriesCount: number;
    /** @private */
    position: number;
    /** @private */
    rectCount: number;
    /** @private */
    category: SeriesCategories;
    /** @private */
    isRectSeries: boolean;
    /** @private */
    stackedValues: StackValues;
    /** @private */
    interior: string;
    /** @private */
    all: boolean;
    constructor(parent: any, propName: string, defaultValue: Object, isArray?: boolean);
    /**
     * This method is responsible for handling and processing JSON data.
     *
     * @returns {void}
     * @hidden
     */
    processJsonData(): void;
    /**
     * Pushes data into a collection at a specified index.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object representing the data to be pushed.
     * @param {number} i - The index at which the data should be pushed.
     * @returns {void}
     */
    private pushData;
    /**
     * Creates and returns a Chart3DPoint object representing a data point at the specified index.
     *
     * @param {number} i - The index of the data point.
     * @param {string} textMappingName - The name of the property containing text information for the data point.
     * @param {string} xName - The name of the property containing X-axis information for the data point.
     * @returns {Chart3DPoint} - The Chart3DPoint object representing the data point.
     */
    protected dataPoint(i: number, textMappingName: string, xName: string): Chart3DPoint;
    /**
     * Retrieves the value associated with a specified mapping name from a given data object.
     *
     * @param {string} mappingName - The mapping name used to retrieve the value from the data object.
     * @param {Object} data - The data object from which the value is retrieved.
     * @returns {Object} - The value associated with the specified mapping name in the data object.
     */
    private get3DObjectValue;
    /**
     * Sets values for an empty data point at the specified index.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object representing the empty data point.
     * @param {number} i - The index of the empty data point.
     * @returns {void}
     */
    setEmptyPoint(point: Chart3DPoint, i: number): void;
    /**
     * Determines the visibility status of a Chart3DPoint.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object for which visibility is determined.
     * @returns {boolean} - A boolean indicating the visibility status of the Chart3DPoint.
     */
    private findVisibility;
    /**
     * Sets the minimum and maximum values for the X and Y dimensions based on the provided Y value.
     *
     * @param {number} yValue - The Y value used to set the minimum and maximum values for the X and Y dimensions.
     * @returns {void}
     */
    private setXYMinMax;
    /**
     * Pushes category data to the Chart3DPoint object at the specified index.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint object to which category data is pushed.
     * @param {number} index - The index at which the category data is pushed.
     * @param {string} pointX - The X value of the category data to be pushed.
     * @returns {void}
     */
    protected pushCategoryData(point: Chart3DPoint, index: number, pointX: string): void;
    /**
     * Calculates the average value of a specified member in the data object.
     *
     * @param {string} member - The member for which the average is calculated.
     * @param {number} i - The index used for the calculation.
     * @param {Object} data - The data object from which the average is calculated. Defaults to the current view data.
     * @returns {number} - The calculated average value.
     */
    private getAverage;
    /**
     * Refreshes the data manager for the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart for which the data manager is refreshed.
     * @returns {void}
     */
    refreshDataManager(chart: Chart3D): void;
    /**
     * Handles the success callback for the data manager operation.
     *
     * @param {Object} e - The success callback parameters containing the result and count.
     * @param {Object} e.result - The result object returned by the data manager operation.
     * @param {number} e.count - The count of items returned by the data manager operation.
     * @param {boolean} [isRemoteData=true] - Indicates whether the data is fetched remotely. Defaults to true.
     * @returns {void}
     */
    private dataManagerSuccess;
    /**
     * Refreshes the chart, updating its data and appearance.
     *
     * @param {boolean} isRemoteData - Indicates whether the data is fetched remotely.
     * @returns {void}
     */
    private refreshChart;
    /**
     * Refreshes the axis labels in the chart.
     * This method is responsible for updating and rendering the axis labels based on the chart's current state.
     *
     * @returns {void}
     * @public
     */
    refreshAxisLabel(): void;
    /**
     * Finds the collection of Chart3DSeries associated with the given Chart3DColumn and Chart3DRow in the 3D chart.
     *
     * @param {Chart3DColumn} column - The Chart3DColumn object representing the column in the 3D chart.
     * @param {Chart3DRow} row - The Chart3DRow object representing the row in the 3D chart.
     * @param {boolean} isStack - Indicates whether the series should be stacked.
     * @returns {Chart3DSeries[]} - An array of Chart3DSeries associated with the specified column and row.
     * @public
     */
    findSeriesCollection(column: Chart3DColumn, row: Chart3DRow, isStack: boolean): Chart3DSeries[];
    /**
     * Checks whether the given Chart3DSeries with rectangular data is present in the 3D chart.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries object to check for presence in the chart.
     * @param {boolean} isStack - Indicates whether the series should be stacked.
     * @returns {boolean} - A boolean value indicating whether the series is present in the 3D chart.
     * @private
     */
    private rectSeriesInChart;
    /**
     * Calculates the stacked values for the Chart3DSeries based on stacking type and chart context.
     *
     * @param {boolean} isStacking100 - Indicates whether the stacking type is 100% stacking.
     * @param {Chart3D} chart - The parent Chart3D object providing context for the calculation.
     * @returns {void}
     * @private
     */
    calculateStackedValue(isStacking100: boolean, chart: Chart3D): void;
    /**
     * Calculates stacking values for the given Chart3DSeries collection based on the stacking type.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of Chart3DSeries to calculate stacking values for.
     * @param {boolean} isStacking100 - Indicates whether the stacking type is 100% stacking.
     * @returns {void}
     * @private
     */
    private calculateStackingValues;
    /**
     * Finds the percentage of stacking for the given Chart3DSeries collection and values.
     *
     * @param {Chart3DSeries[]} stackingSeries - The collection of Chart3DSeries to find the percentage of stacking for.
     * @param {number[]} values - The values to calculate the percentage of stacking.
     * @param {boolean} isStacking100 - Indicates whether the stacking type is 100% stacking.
     * @returns {void}
     */
    private findPercentageOfStacking;
    /**
     * Finds the frequencies for the given Chart3DSeries collection.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of Chart3DSeries to find frequencies for.
     * @returns {number[]} An array of frequencies for each series in the collection.
     * @private
     */
    private findFrequencies;
    /**
     * Renders the Chart3DSeries on the given 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart on which to render the series.
     * @returns {void}
     * @private
     */
    renderSeries(chart: Chart3D): void;
    /**
     * Retrieves the visible data points for the Chart3DSeries.
     * The visibility of points may be influenced by factors such as data filtering or chart settings.
     *
     * @returns {Chart3DPoint[]} An array of Chart3DPoint objects representing the visible data points.
     * @private
     */
    private getVisiblePoints;
    /**
     * Sets the color for a specific Chart3DPoint in the series.
     * This method allows you to customize the color of an individual data point.
     *
     * @param {Chart3DPoint} point - The Chart3DPoint for which to set the color.
     * @param {string} color - The color value to be applied to the data point.
     * @returns {string} The updated color value after applying any modifications or validations.
     * @private
     */
    setPointColor(point: Chart3DPoint, color: string): string;
    /**
     * Gets the Y values from an array of Chart3DPoint objects.
     *
     * @param {Chart3DPoint[]} points - An array of Chart3DPoint objects.
     * @returns {number[]} An array containing the Y values extracted from the provided data points.
     * @private
     */
    getYValues(points: Chart3DPoint[]): number[];
    /**
     * Gets the X values from an array of Chart3DPoint objects.
     * This method extracts the X values from a collection of data points.
     *
     * @param {Chart3DPoint[]} points - An array of Chart3DPoint objects.
     * @returns {number[]} An array containing the X values extracted from the provided data points.
     * @private
     */
    getXValues(points: Chart3DPoint[]): number[];
    /**
     * Gets the segment depth information for a Chart3DSeries.
     * This method retrieves the depth information for the segments of a Chart3DSeries.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which segment depth is obtained.
     * @returns {Chart3DDepthInfoType} The depth information for the segments of the specified series.
     * @private
     */
    getSegmentDepth(series: Chart3DSeries): Chart3DDepthInfoType;
    /**
     * Calculates the side-by-side positions for segments in a Chart3DSeries.
     * This method determines the positions of segments when they are arranged side-by-side.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which side-by-side positions are calculated.
     * @returns {void}
     * @private
     */
    private getSideBySidePositions;
    /**
     * Finds the position of rectangles for a collection of Chart3DSeries.
     * This method determines the position of rectangles based on the given series collection.
     *
     * @param {Chart3DSeries[]} seriesCollection - The collection of Chart3DSeries for which rectangle positions are determined.
     * @returns {void}
     * @private
     */
    private findRectPosition;
    /**
     * Gets a range of values between the specified start and end points.
     * This method returns a Chart3DRangeValues object representing the range of values between the given start and end points.
     *
     * @param {number} start - The starting point of the range.
     * @param {number} end - The ending point of the range.
     * @returns {Chart3DRangeValues} - An object representing the range of values between the start and end points.
     */
    getDoubleRange(start: number, end: number): Chart3DRangeValues;
    /**
     * Sets the style options for the specified Chart3DSeries.
     * This method applies the style options to customize the appearance of the specified series.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which the style options should be set.
     * @returns {Chart3DStyleOptions} - An object representing the style options applied to the series.
     */
    setStyle(series: Chart3DSeries): Chart3DStyleOptions;
    /**
     * Gets the side-by-side positioning information for the specified Chart3DSeries.
     * This method calculates and returns the range values that define the position of the series in a side-by-side arrangement.
     *
     * @param {Chart3DSeries} series - The Chart3DSeries for which side-by-side positioning information is needed.
     * @returns {Chart3DRangeValues} - An object representing the range values that define the position of the series in a side-by-side arrangement.
     */
    getSideBySideInfo(series: Chart3DSeries): Chart3DRangeValues;
}
