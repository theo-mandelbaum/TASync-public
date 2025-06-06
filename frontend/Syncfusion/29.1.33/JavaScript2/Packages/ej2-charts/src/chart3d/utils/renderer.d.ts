import { Chart3D } from './../chart3D';
import { Chart3DAxis } from '../axis/axis';
/**
 * The WallRenderer class provides methods to update the 3D wall of the chart.
 */
export declare class WallRenderer {
    /**
     * Updates the 3D wall of the chart based on the chart area type.
     *
     * @param {Chart3D} chart - The Chart3D instance to update the 3D wall for.
     * @returns {void}
     */
    update3DWall(chart: Chart3D): void;
    /**
     * Updates the top wall of the 3D chart based on the specified chart and axis.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the top wall is updated.
     * @returns {void}
     */
    private updateTopWall;
    /**
     * Updates the right wall of the 3D chart based on the specified chart and axis.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the right wall is updated.
     * @returns {void}
     */
    private updateRightWall;
    /**
     * Updates the back wall of the 3D chart based on the specified chart.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the back wall is updated.
     * @returns {void}
     */
    private updateBackWall;
    /**
     * Updates the left wall of the 3D chart based on the specified chart.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the left wall is updated.
     * @returns {void}
     */
    private updateLeftWall;
    /**
     * Updates the bottom wall of the 3D chart based on the specified chart.
     *
     * @param {Chart3D} chart - The Chart3D instance for which the bottom wall is updated.
     * @returns {void}
     */
    private updateBottomWall;
}
/**
 * 3D chart axis render/
 */
export declare class AxisRenderer {
    /**
     * Draws the 3D axes at the specified index for the given axis and chart.
     *
     * @param {number} index - The index of the axis.
     * @param {Chart3DAxis} axis - The Chart3DAxis instance to draw.
     * @param {Chart3D} chart - The Chart3D instance for which the axes are drawn.
     * @returns {void}
     */
    drawAxes(index: number, axis: Chart3DAxis, chart: Chart3D): void;
    /**
     * Draws the title for the specified 3D axis on the given chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the title is drawn.
     * @param {Chart3D} chart - The Chart3D instance on which the title is drawn.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    private drawAxisTitle;
    /**
     * Trims the specified text to fit within the maximum width, applying the provided labelStyle and font settings.
     *
     * @param {number} maxWidth - The maximum width to fit the text within.
     * @param {string} text - The text to be trimmed.
     * @param {Chart3DTextFontModel} labelStyle - The label style settings to be applied.
     * @param {Chart3DTextFontModel} font - The font settings to be applied.
     * @returns {string} - The trimmed text.
     */
    private textTrim;
    /**
     * Distributes labels into multiple rows based on the specified length, currentX, currentLabel, axis, and font settings.
     *
     * @param {number} length - The length of the labels.
     * @param {number} currentX - The current X-coordinate.
     * @param {Visible3DLabels} currentLabel - The current label settings.
     * @param {Chart3DAxis} axis - The Chart3DAxis instance.
     * @param {Chart3DTextFontModel} font - The font settings to be applied.
     * @returns {void}
     */
    private multipleRows;
    /**
     * Draws the labels for the specified 3D axis on the given chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the labels are drawn.
     * @param {Chart3D} chart - The Chart3D instance on which the labels are drawn.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    private drawAxisLabel;
    /**
     * Renders the 3D ticks for the specified axis with the given size, width, and on the provided chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the ticks are rendered.
     * @param {number} size - The size of the ticks.
     * @param {number} width - The width of the ticks.
     * @param {Chart3D} chart - The Chart3D instance on which the ticks are rendered.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    private renderTicks3D;
    /**
     * Calculates the 3D position for ticks on the specified axis with the given tickSize, width, and chart dimensions.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the tick position is calculated.
     * @param {number} tickSize - The size of the ticks.
     * @param {number} width - The width of the ticks.
     * @param {number} x1 - The X-coordinate of the starting point.
     * @param {number} y1 - The Y-coordinate of the starting point.
     * @param {number} x2 - The X-coordinate of the ending point.
     * @param {number} y2 - The Y-coordinate of the ending point.
     * @param {Chart3D} chart - The Chart3D instance.
     * @returns {Chart3DTickPosition} - The calculated 3D tick position.
     */
    private calculatePosition3D;
    /**
     * Draws the 3D grid lines for the specified axis on the given chart.
     *
     * @param {Chart3DAxis} axis - The Chart3DAxis instance for which the grid lines are drawn.
     * @param {Chart3D} chart - The Chart3D instance on which the grid lines are drawn.
     * @param {number} index - The index of the axis.
     * @returns {void}
     */
    private drawGridLines3D;
}
