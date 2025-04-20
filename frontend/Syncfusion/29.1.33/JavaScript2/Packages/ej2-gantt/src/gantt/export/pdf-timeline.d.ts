import { PdfGantt } from './pdf-gantt';
import { PointF, PdfPage, PdfFontFamily } from '@syncfusion/ej2-pdf-export';
import { TimelineDetails, TimelineFormat } from '../base/interface';
import { Gantt } from '../base/gantt';
/**
 */
export declare class PdfTimeline {
    parent: Gantt;
    private gantt;
    topTier: TimelineFormat[];
    bottomTier: TimelineFormat[];
    width: number;
    height: number;
    topTierCellWidth: number;
    bottomTierCellWidth: number;
    topTierHeight: number;
    bottomTierHeight: number;
    private topTierPoint;
    private bottomTierPoint;
    private topTierIndex;
    private bottomTierIndex;
    private prevTopTierIndex;
    private prevBottomTierIndex;
    holidayLabel: string;
    holidayCompleted: boolean;
    holidayNumberOfDays: number;
    holidayWidth: number;
    detailsTimeline: TimelineDetails;
    fitHolidayCompleted: boolean;
    fromDataHoliday: string | Date;
    timelineWidth: number;
    lastWidth: number;
    fontFamily: PdfFontFamily;
    private topTierValueLeftPadding;
    constructor(gantt?: PdfGantt);
    /**
     * @private
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @returns {void}
     */
    drawTimeline(page: PdfPage, startPoint: PointF, detail: TimelineDetails): void;
    /**
     *
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails}  detail .
     * @returns {void} .
     * Draw the specific gantt chart side header when the taskbar exceeds the page
     * @private
     */
    drawPageTimeline(page: PdfPage, startPoint: PointF, detail: TimelineDetails): void;
    /**
     * Method to trigger pdf query timelinecell event
     */
    private triggerQueryTimelinecell;
    /**
     * Initializes and returns a PdfStringFormat based on the provided Gantt style and tier level.
     *
     * @param {IGanttStyle} ganttStyle - The style settings for the Gantt chart which include the timeline format.
     * @param {boolean} isTopTier - A flag indicating whether the format is for the top tier of the timeline.
     * @returns {PdfStringFormat} The initialized PdfStringFormat with appropriate line alignment, text alignment,
     * and word wrap type, as determined by the ganttStyle and isTopTier flag.
     */
    private initializePdfStringFormat;
    private getPdfFont;
}
