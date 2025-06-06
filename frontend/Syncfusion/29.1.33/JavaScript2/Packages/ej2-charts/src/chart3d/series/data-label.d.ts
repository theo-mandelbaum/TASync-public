import { Chart3D } from '../chart3D';
import { Chart3DSeries, Chart3DPoint } from './chart-series';
import { Chart3DDataLabelSettingsModel } from './chart-series-model';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Chart3DTextRenderEventArgs, Chart3DLocation } from '../model/chart3d-Interface';
/**
 * The `DataLabel` module is used to render data label for the data point.
 */
export declare class DataLabel3D {
    private chart;
    private margin;
    private fontBackground;
    /**
     * Constructor for the data label module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    constructor(chart: Chart3D);
    /**
     * Renders a 3D series on a 3D chart with data labels.
     *
     * @param {Chart3DSeries} series - The 3D series to be rendered.
     * @param {Chart3D} chart - The 3D chart on which the series is rendered.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The data label style for the series.
     * @returns {void}
     */
    render(series: Chart3DSeries, chart: Chart3D, dataLabel: Chart3DDataLabelSettingsModel): void;
    /**
     * Draws data labels for a specific data point in a 3D series on a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {number} pointIndex - The index of the data point within the series.
     * @param {Chart3DPoint} point - The data point for which data labels are drawn.
     * @param {Chart3D} chart - The 3D chart that contains the series and data point.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The style for data labels.
     * @returns {void}
     */
    private draw3DDataLabel;
    /**
     * Gets the text for data labels associated with a specific data point in a 3D series.
     *
     * @param {Chart3DPoint} currentPoint - The data point for which data label text is generated.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3D} chart - The 3D chart containing the series and data point.
     * @returns {string[]} An array of text for data labels.
     */
    private getLabelText;
    /**
     * Creates a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element to which the data label template is attached.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The style settings for data labels.
     * @param {Chart3DPoint} point - The data point for which the data label template is created.
     * @param {Chart3DTextRenderEventArgs} data - The text render event arguments.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @returns {void}
     */
    createDataLabelTemplate(parentElement: HTMLElement, series: Chart3DSeries, dataLabel: Chart3DDataLabelSettingsModel, point: Chart3DPoint, data: Chart3DTextRenderEventArgs, labelIndex: number, redraw: boolean, location: Chart3DLocation): void;
    /**
     * Calculates the size of a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element containing the data label template.
     * @param {HTMLElement} childElement - The child HTML element representing the data label template.
     * @param {Chart3DPoint} point - The data point for which the data label template size is calculated.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The style for data labels.
     * @param {Rect} clip - The rectangular clipping area.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @param {boolean} isReactCallback - Indicates whether the callback is associated with React.
     * @returns {void}
     */
    calculateTemplateLabelSize(parentElement: HTMLElement, childElement: HTMLElement, point: Chart3DPoint, series: Chart3DSeries, dataLabel: Chart3DDataLabelSettingsModel, clip: Rect, redraw: boolean, location: Chart3DLocation, isReactCallback?: boolean): void;
    /**
     * Calculates the text position for a data label associated with a specific data point in a 3D series.
     *
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3DPoint} point - The data point for which the text position is calculated.
     * @param {ClientRect} elementSize - The size of the data label element.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @returns {{ left: number, top: number, right: number }} An object representing the left, top, and right positions of the text.
     */
    private calculateTextPosition;
    /**
     * Renders a React template for a data label associated with a specific data point in a 3D series.
     *
     * @param {HTMLElement} childElement - The child HTML element for the React template.
     * @param {Chart3D} chart - The 3D chart that contains the series and data point.
     * @param {Chart3DPoint} point - The data point for which the React template is rendered.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @returns {void}
     */
    private chartReactTemplate;
    /**
     * Creates a template element for rendering data labels associated with a specific data point in a 3D series.
     *
     * @param {HTMLElement} childElement - The child HTML element to contain the template content.
     * @param {string | Function} content - The content or function for the data label template.
     * @param {Chart3D} chart - The 3D chart containing the series and data point.
     * @param {Chart3DPoint} point - The data point for which the template is created (optional).
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs (optional).
     * @param {string} dataLabelId - The ID for the data label element (optional).
     * @param {number} labelIndex - The index of the data label (optional).
     * @param {Chart3DLocation} location - The location values for the data label (optional).
     * @param {boolean} redraw - Indicates whether the template should be redrawn (optional).
     * @returns {HTMLElement} The created template element.
     */
    private createTemplate;
    /**
     * Gets the name of the data label module.
     *
     * @returns {string} The name of the data label module.
     */
    protected getModuleName(): string;
    /**
     * To destroy the dataLabel for series.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
