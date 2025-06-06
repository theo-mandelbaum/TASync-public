import { HighlightMode } from '../../common/utils/enum';
import { Chart3DSelectionMode } from '../utils/enum';
import { Chart3D } from '../../chart3d';
import { Chart3DSeries } from '../series/chart-series';
import { Chart3DSeriesModel } from '../series/chart-series-model';
import { Index, Indexes } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * The `Selection` module handles the selection for chart.
 *
 * @private
 */
export declare class Selection3D extends BaseSelection {
    /** @private */
    isSeriesMode: boolean;
    /** @private */
    selectedDataIndexes: Indexes[];
    /** @private */
    highlightDataIndexes: Indexes[];
    seriesIndex: number;
    /** @private */
    series: Chart3DSeries[];
    /** @private */
    chart: Chart3D;
    /** @private */
    currentMode: Chart3DSelectionMode | HighlightMode;
    /** @private */
    previousSelectedEle: Element[];
    /**
     * Constructor for selection module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    constructor(chart: Chart3D);
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * Handles the mouse down event.
     *
     * @returns {void}
     */
    private mousedown;
    /**
     * Unbinding events for selection module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * To find private variable values
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @returns {void}
     */
    private initPrivateVariables;
    /**
     * Method to select the point and series.
     *
     * @param {Chart3D} chart - Chart3D instance
     * @returns {void}
     */
    invokeSelection(chart: Chart3D): void;
    /**
     * Generates the style for the series.
     *
     * @param {Chart3DSeriesModel} series - The series for which the style is generated.
     * @returns {string} - The generated style string.
     */
    generateStyle(series: Chart3DSeriesModel): string;
    /**
     * Selects the specified data indexes in the Chart3D.
     * This method is responsible for handling the selection of specific data indexes in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance in which the data indexes are selected.
     * @param {Index[]} indexes - An array of Index objects representing the data indexes to be selected.
     * @returns {void}
     */
    selectDataIndex(chart: Chart3D, indexes: Index[]): void;
    /**
     * Retrieves the elements in the Chart3D associated with the specified data index.
     *
     * This method is responsible for obtaining the elements in the Chart3D related to the specified data index.
     *
     * @param {Chart3D} chart - The Chart3D instance containing the elements.
     * @param {Index} index - An Index object representing the data index.
     * @returns {Element[]} An array of Element objects representing the elements associated with the specified data index.
     */
    getElementByIndex(chart: Chart3D, index: Index): Element[];
    /**
     * This method is responsible for obtaining the clustered elements in the Chart3D related to the specified data index.
     * Clustering typically involves obtaining a group of related elements for a specific data index.
     *
     * @param {Chart3D} chart - The Chart3D instance containing the clustered elements.
     * @param {Index} index - An Index object representing the data index.
     * @returns {Element[]} An array of Element objects representing the clustered elements associated with the specified data index.
     */
    getClusterElements(chart: Chart3D, index: Index): Element[];
    /**
     * Method to get the selected element.
     *
     * @param {Chart3D} chart - The Chart3D instance to which the series belongs.
     * @param {Chart3DSeriesModel} series - The series in which the data point is located.
     * @param {Index} index - The index or position of the data point within the series.
     * @returns {Element[]} An array of elements associated with the specified data point in the Chart3D.
     * @private
     */
    findElements(chart: Chart3D, series: Chart3DSeriesModel, index: Index): Element[];
    /**
     * Checks whether the specified element is already selected in the Chart3D.
     *
     * @param {Element} targetElem - The target element to check for selection status.
     * @param {string} eventType - The type of event triggering the selection check (e.g., 'click', 'hover').
     * @param {Index} [index] - Optional. The index or position of the data point within the series.
     * @returns {boolean} A boolean indicating whether the specified element is already selected.
     */
    isAlreadySelected(targetElem: Element, eventType: string, index?: Index): boolean;
    /**
     * Handles the mouse click event in the Chart3D, triggering the calculation of selected elements.
     *
     * @param {Event} event - The mouse click event object.
     * @returns {void}
     */
    private mouseClick;
    /**
     * Calculates the selected elements based on the provided target element and event type.
     *
     * @param {HTMLElement} targetElement - The target HTML element that triggered the selection.
     * @param {string} eventType - The type of the event that triggered the selection (e.g., mouse click).
     * @returns {void}
     */
    calculateSelectedElements(targetElement: HTMLElement, eventType: string): void;
    /**
     * Performs selection based on the provided index, chart, and optional element.
     *
     * @param {Index} index - The index or indices specifying the data points or elements to be selected.
     * @param {Chart3D} chart - The Chart3D instance where the selection is being performed.
     * @param {Element} [element] - Optional. The specific HTML element that triggered the selection.
     * @returns {void}
     */
    performSelection(index: Index, chart: Chart3D, element?: Element): void;
    /**
     * Handles the completion of a selection process in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the selection process is completed.
     * @param {Index} index - The selected index or indices representing the data points or elements.
     * @param {Chart3DSelectionMode  | HighlightMode} selectionMode - The mode of selection, either SelectionMode or HighlightMode.
     * @returns {void}
     */
    selectionComplete(chart: Chart3D, index: Index, selectionMode: Chart3DSelectionMode | HighlightMode): void;
    /**
     * Handles the selection process in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the selection is taking place.
     * @param {Index} index - The selected index or indices representing the data points or elements.
     * @param {Element[]} selectedElements - The corresponding elements that are selected during the process.
     * @returns {void}
     */
    selection(chart: Chart3D, index: Index, selectedElements: Element[]): void;
    /**
     * Handles the cluster selection process in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the cluster selection is taking place.
     * @param {Index} index - The selected index or indices representing the cluster.
     * @returns {void}
     */
    clusterSelection(chart: Chart3D, index: Index): void;
    /**
     * Removes the selected elements during a multi-select operation in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the multi-select operation is taking place.
     * @param {Index[]} index - An array of selected indices to be removed.
     * @param {Index} currentIndex - The current index representing the selection.
     * @param {Chart3DSeriesModel[]} seriesCollection - The collection of series in the Chart3D.
     * @returns {void}
     */
    removeMultiSelectElements(chart: Chart3D, index: Index[], currentIndex: Index, seriesCollection: Chart3DSeriesModel[]): void;
    /**
     * Applies a blur effect to the specified chart elements for visual emphasis.
     *
     * @param {string} chartId - The unique identifier of the target chart where the blur effect is applied.
     * @param {Chart3DSeries[]} visibleSeries - An array of visible series in the chart.
     * @returns {void}
     */
    blurEffect(chartId: string, visibleSeries: Chart3DSeries[]): void;
    /**
     * Checks the selection status of specified chart elements and updates their appearance.
     *
     * @param {Element[] | Element} element - The chart elements or a single element to be checked for selection.
     * @param {string} className - The CSS class name used to identify selected elements.
     * @param {boolean} visibility - A boolean indicating whether the elements should be visible or hidden based on selection.
     * @param {number} [series=0] - The index of the series if the specified elements are series.
     * @param {string} [legendStrokeColor='#D3D3D3'] - The stroke color used for legends when they are selected.
     * @returns {void}
     */
    checkSelectionElements(element: Element[] | Element, className: string, visibility: boolean, series?: number, legendStrokeColor?: string): void;
    /**
     * Applies custom styles to the specified chart elements.
     *
     * @param {Element[]} elements - An array of chart elements to which custom styles will be applied.
     * @returns {void}
     */
    applyStyles(elements: Element[]): void;
    /**
     * Gets the CSS class name associated with the selection for a specific chart element.
     *
     * @param {string} id - A unique identifier for the selected element.
     * @returns {string} The CSS class name associated with the selection for the selected element.
     */
    getSelectionClass(id: string): string;
    /**
     * Removes styles associated with the selection from the selected elements.
     *
     *
     * @param {Element[]} elements - An array of chart elements from which selection styles should be removed.
     * @returns {void}
     */
    removeStyles(elements: Element[]): void;
    /**
     * Adds or removes an index from the specified array based on the provided condition.
     *
     * @param {Index[]} indexes - The array of indexes to be modified.
     * @param {Index} index - The index to be added or removed.
     * @param {boolean} [isAdd=true] - A boolean flag indicating whether to add or remove the index.
     * @returns {void}
     * @private
     */
    addOrRemoveIndex(indexes: Index[], index: Index, isAdd?: boolean): void;
    /**
     * Compares two Index objects for equality.
     *
     * @param {Index} first - The first Index object to compare.
     * @param {Index} second - The second Index object to compare.
     * @param {boolean} [checkSeriesOnly=false] - A boolean flag indicating whether to
     * @returns {boolean} - True if the Index objects are equal; otherwise, false.
     */
    toEquals(first: Index, second: Index, checkSeriesOnly: boolean): boolean;
    /**
     * Redraws the selection in the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance where the selection needs to be redrawn.
     * @param {Chart3DSelectionMode | HighlightMode} oldMode - The previous selection mode ('Series', 'Point', etc.).
     * @param {boolean} [chartRedraw=false] - A boolean flag indicating whether to trigger a chart redraw.
     * @returns {void}
     */
    redrawSelection(chart: Chart3D, oldMode: Chart3DSelectionMode | HighlightMode, chartRedraw?: boolean): void;
    /**
     * Handles the selection in the legend for the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance associated with the legend.
     * @param {number} series - The index of the series in the legend.
     * @param {Element} targetElement - The HTML element that triggered the selection event.
     * @param {string} eventType - The type of event that triggered the selection.
     * @returns {void}
     */
    legendSelection(chart: Chart3D, series: number, targetElement: Element, eventType: string): void;
    /**
     * Handles the removal of selection in the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance where the selection needs to be removed.
     * @param {number} series - The index of the series for which the selection is being removed.
     * @param {NodeListOf<HTMLElement>} selectedElements - The HTML elements representing the selected items.
     * @param {string} seriesStyle - The style to be applied to the series after the removal of selection.
     * @param {boolean} isBlurEffectNeeded - A flag indicating whether a blur effect is needed after the removal of selection.
     * @returns {void}
     */
    removeSelection(chart: Chart3D, series: number, selectedElements: NodeListOf<HTMLElement>, seriesStyle: string, isBlurEffectNeeded: boolean): void;
    /**
     * Retrieves the HTML elements associated with a specific 3D chart series.
     *
     * @param {Chart3DSeriesModel | Chart3DSeries} series - The 3D chart series for which HTML elements are to be retrieved.
     * @returns {Element[]} An array of HTML elements representing the graphical elements of the specified 3D chart series.
     * @private
     */
    getSeriesElements(series: Chart3DSeriesModel | Chart3DSeries): Element[];
    /**
     * Finds and returns the index associated with the specified identifier.
     *
     * @param {string} id - The identifier used to find the associated index.
     * @returns {Index} The index associated with the specified identifier.
     * @private
     */
    indexFinder(id: string): Index;
    /**
     * Removes the selected elements from the chart based on the specified indices.
     *
     * @param {Chart3D} chart - The 3D chart instance.
     * @param {Index[]} index - The array of indices representing the selected elements to be removed.
     * @param {Chart3DSeriesModel[]} seriesCollection - The collection of series models.
     * @returns {void}
     * @private
     */
    private removeSelectedElements;
    /**
     * Handles the mouse leave event for the 3D chart.
     *
     * @returns {void}
     * @private
     */
    private mouseLeave;
    /**
     * Completes the selection process based on the specified target element and event type.
     *
     * @returns {void}
     * @private
     */
    completeSelection(): void;
    /**
     * Handles the mouse move event, typically used for tracking the movement of the mouse pointer.
     * This method is marked as private to indicate that it should not be used externally.
     *
     * @param {PointerEvent | TouchEvent} event - The event object representing the mouse move or touch event.
     * @returns {void}
     * @private
     */
    mouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * Highlights the series elements based on the specified target element and event type.
     *
     * @param {Element} target - The target element on which the highlight action is performed.
     * @param {string} eventType - The type of the event.
     * @returns {void}
     */
    highlightChart(target: Element, eventType: string): void;
    /**
     * remove highlighted legend when not focused.
     *
     * @returns {void}
     * @private
     */
    removeLegendHighlightStyles(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
