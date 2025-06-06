import { Indexes } from '../../common/model/base';
import { IndexesModel } from '../../common/model/base-model';
import { Chart, SelectionPattern } from '../../chart';
import { AccumulationChart } from '../../accumulation-chart';
import { Chart3D } from '../../chart3d';
import { CircularChart3D } from '../../circularchart3d';
/**
 * Selection Module handles the selection for chart.
 *
 * @private
 */
export declare class BaseSelection {
    /** @private */
    styleId: string;
    protected unselected: string;
    protected control: Chart | AccumulationChart | Chart3D | CircularChart3D;
    constructor(control: Chart | AccumulationChart | Chart3D | CircularChart3D);
    selectionStyle: [string, string, string][];
    /**
     * To create selection styles for series
     *
     * @returns {void}
     */
    protected seriesStyles(): void;
    /**
     * To create the pattern for series/points.
     *
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     */
    pattern(chart: Chart | AccumulationChart | Chart3D | CircularChart3D, color: string, index: number, patternName: SelectionPattern, opacity: number): string;
    /**
     * To load the pattern into svg
     *
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     */
    private loadPattern;
    /**
     * To concat indexes
     *
     * @param userIndexes
     * @param localIndexes
     * @param userIndexes
     * @param localIndexes
     */
    protected concatIndexes(userIndexes: IndexesModel[], localIndexes: Indexes[]): Indexes[];
    /**
     * Selected points series visibility checking on legend click
     *
     * @param selectedIndexes
     */
    protected checkVisibility(selectedIndexes: Indexes[], chart?: Chart | Chart3D): boolean;
    /**
     * To add svg element style class
     *
     * @param element
     * @param className
     * @param element
     * @param className
     * @private
     */
    addSvgClass(element: Element, className: string): void;
    /**
     * To remove svg element style class
     *
     * @param element
     * @param className
     * @param element
     * @param className
     * @private
     */
    removeSvgClass(element: Element, className: string): void;
    /**
     * To get children from parent element
     *
     * @param parent
     */
    protected getChildren(parent: Element): Element[];
}
