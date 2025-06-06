/**
 * HeatMap Adaptor file
 */
import { HeatMap } from '../heatmap';
import { ChildProperty } from '@syncfusion/ej2-base';
import { AdaptorType } from '../utils/enum';
import { DataModel } from './adaptor-model';
import { BubbleDataModel } from '../model/base-model';
/**
 * Configures the adaptor in the heatmap.
 */
export declare class Data extends ChildProperty<Data> {
    /**
     * Specifies whether the provided data source is a JSON data or not.
     *
     * @default false
     */
    isJsonData: boolean;
    /**
     * Specifies the type of the adaptor to process the data set in the heatmap.
     *
     * @default None
     */
    adaptorType: AdaptorType;
    /**
     * Specifies the field name in the JSON data that maps to the labels on the x-axis.
     *
     * @default ''
     */
    xDataMapping: string;
    /**
     * Specifies the field name in the JSON data that maps to the labels on the y-axis.
     *
     * @default ''
     */
    yDataMapping: string;
    /**
     * Specifies the field name in the JSON data that maps to the value in the heatmap cell.
     *
     * @default ''
     */
    valueMapping: string;
    /**
     * Specifies the options to configure the data mapping for size and color bubble types.
     */
    bubbleDataMapping: BubbleDataModel;
}
export declare class AdaptiveMinMax {
    min: Object;
    max: Object;
}
/**
 *
 * The `Adaptor` module is used to handle JSON and Table data.
 */
export declare class Adaptor {
    private heatMap;
    reconstructData: Object[][];
    reconstructedXAxis: string[];
    reconstructedYAxis: string[];
    private tempSplitDataCollection;
    adaptiveXMinMax: AdaptiveMinMax;
    adaptiveYMinMax: AdaptiveMinMax;
    constructor(heatMap?: HeatMap);
    /**
     * Method to construct Two Dimentional Datasource.
     *
     * @returns {void}
     * @private
     */
    constructDatasource(dataSource: object, dataSourceSettings: DataModel): void;
    /**
     * Method to construct Axis Collection.
     *
     * @returns {void}
     * @private
     */
    private constructAdaptiveAxis;
    /**
     * Method to calculate Numeric Axis Collection.
     *
     * @returns {string[]}
     * @private
     */
    private getNumericAxisCollection;
    /**
     * Method to calculate DateTime Axis Collection.
     *
     * @returns {string[]}
     * @private
     */
    private getDateAxisCollection;
    /**
     * Method to calculate Maximum and Minimum Value from datasource.
     *
     * @returns {void}
     * @private
     */
    private getMinMaxValue;
    /**
     * Method to process Cell datasource.
     *
     * @returns {Object}
     * @private
     */
    private processCellData;
    /**
     * Method to process JSON Cell datasource.
     *
     * @returns {Object}
     * @private
     */
    private processJsonCellData;
    /**
     * Method to generate axis labels when labels are not given.
     *
     * @returns {string}
     * @private
     */
    private generateAxisLabels;
    /**
     * Method to get data from complex mapping.
     *
     * @returns {number|string}
     * @private
     */
    private getSplitDataValue;
    /**
     * Method to process JSON Table datasource.
     *
     * @returns {Object}
     * @private
     */
    private processJsonTableData;
    /**
     * To destroy the Adaptor.
     *
     * @returns {void}
     * @private
     */
    protected destroy(): void;
    /**
     * To get Module name
     */
    protected getModuleName(): string;
}
