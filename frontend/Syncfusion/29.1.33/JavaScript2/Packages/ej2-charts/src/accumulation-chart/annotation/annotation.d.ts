/**
 * AccumulationChart annotation properties
 */
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AnnotationBase } from '../../common/annotation/annotation';
/**
 * `AccumulationAnnotation` module handles the annotation for accumulation chart.
 */
export declare class AccumulationAnnotation extends AnnotationBase {
    private pie;
    private parentElement;
    private annotations;
    /**
     * Constructor for accumulation chart annotation.
     *
     * @private
     * @param {AccumulationChart} control - The accumulation chart control.
     */
    constructor(control: AccumulationChart);
    /**
     * Method to render the annotation for accumulation chart.
     *
     * @param {Element} element - Annotation element.
     * @returns {void}
     * @private
     */
    renderAnnotations(element: Element): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     *
     * @private
     */
    destroy(): void;
}
