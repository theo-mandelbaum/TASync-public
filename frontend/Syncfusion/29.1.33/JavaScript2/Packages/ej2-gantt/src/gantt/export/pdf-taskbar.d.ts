import { PointF, PdfColor, PdfPage, PdfFontFamily } from '@syncfusion/ej2-pdf-export';
import { TimelineDetails, TaskLabel, IIndicator, ILabel, ITemplateDetails, ITaskData, ITaskSegmentStyles } from './../base/interface';
import { Gantt } from '../base/gantt';
/**
 * @hidden
 */
export declare class PdfGanttTaskbarCollection {
    endDate?: Date;
    /** Defines the duration of task. */
    duration?: number;
    /** Defines the duration unit of task. */
    durationUnit?: string;
    /** Defines the task is auto schedule-able or not. */
    isAutoSchedule?: boolean;
    /** Defines the task is milestone or not. */
    isMilestone?: boolean;
    /** Defines the task baselinestartdate. */
    baselineStartDate?: Date;
    /** Defines the task baselineenddate. */
    baselineEndDate?: Date;
    /** Defines the task baselineleft. */
    baselineLeft?: number;
    /** Defines the task baselinewidth. */
    baselineWidth?: number;
    /** Defines the task baselineHeight . */
    baselineHeight: number;
    /** Defines the left of task.
     *
     * @hidden
     */
    left?: number;
    /** Defines the progress of task. */
    progress?: number;
    /** Defines the progress width of task. */
    progressWidth?: number;
    /** Defines the autostart date of task. */
    autoStartDate?: Date;
    /** Defines the autoent date of task. */
    autoEndDate?: Date;
    /** Defines the start date of task. */
    startDate?: Date;
    /** Defines the id of task. */
    taskId?: string;
    /** Defines the parent id of task. */
    parentId?: string;
    /** Defines the name of task. */
    taskName?: string;
    /** Defines the width of task. */
    width?: number;
    /** Defines the unique id of task. */
    uniqueID?: string;
    /** Defines the total progress of task. */
    totalProgress?: number;
    /** Defines the total duration of task. */
    totalDuration?: number;
    /**
     * @private
     */
    unscheduledTaskBy?: string;
    /**
     * @private
     */
    unscheduleStarteDate?: Date;
    /**
     * @private
     */
    unscheduleEndDate?: Date;
    isParentTask?: boolean;
    isScheduledTask?: boolean;
    height: number;
    fontFamily: PdfFontFamily;
    gridLineColor: PdfColor;
    progressFontColor: PdfColor;
    taskColor: PdfColor;
    baselineColor: PdfColor;
    splitLineBackground: PdfColor;
    unscheduledTaskBarColor: PdfColor;
    manualParentBackground: PdfColor;
    manualParentProgress: PdfColor;
    manualChildBackground: PdfColor;
    manualChildProgress: PdfColor;
    manuallineColor: PdfColor;
    manualParentBorder: PdfColor;
    manualChildBorder: PdfColor;
    baselineBorderColor: PdfColor;
    taskSegmentStyles: ITaskSegmentStyles[];
    baselineTop: number;
    labelColor: PdfColor;
    taskBorderColor: PdfColor;
    progressColor: PdfColor;
    milestoneColor: PdfColor;
    taskbar: PdfGanttTaskbarCollection[];
    parent: Gantt;
    segment: ITaskData[];
    isSpliterTask: boolean;
    segmentCollection: ITaskData[];
    isCompleted: boolean;
    isCompletedAutotask: boolean;
    isCompletedBaseline: boolean;
    autoWidth?: number;
    autoLeft?: number;
    indicators: IIndicator[];
    labelSettings: ILabel;
    taskbarTemplate: ITemplateDetails;
    previousWidthofLeftValue: number;
    previousWidthofLeftImage: number;
    totalLeftWidth: number;
    previousWidthofRightValue: number;
    previousWidthofRightImage: number;
    remainString: string;
    stringLeft: number;
    /**
     * @private
     */
    leftTaskLabel: TaskLabel;
    /**
     * @private
     */
    rightTaskLabel: TaskLabel;
    taskLabel: string;
    startPage: number;
    endPage: number;
    isStartPoint: boolean;
    taskStartPoint: PointF;
    private spaceBetweenImageAndValue;
    add(): PdfGanttTaskbarCollection;
    constructor(parent?: Gantt);
    /**
     * @param {PdfPage} page .
     * @returns {PdfPage} .
     * Get the next PDF page
     */
    private GetNextPage;
    isAutoFit(): boolean;
    /**
     * Draw the taskbar, chart back ground
     *
     * @private
     */
    drawTaskbar(page: PdfPage, startPoint: PointF, detail: TimelineDetails, cumulativeWidth: number, rowHeight: number, taskbar: PdfGanttTaskbarCollection, lineWidth: number): boolean;
    /**
     * @param {IGanttStyle} ganttStyle .
     * @returns {PdfFont}
     * Customizes the font based on the Gantt style.
     */
    private getPdfFont;
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @returns {void}
     * Draw task right side label
     */
    private drawRightLabel;
    private drawRigthlabelImage;
    private drawRightLabelValue;
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @param {PdfGanttTaskbarCollection} taskbar .
     * @returns {void}
     * Draw task left task label
     */
    private drawLeftLabel;
    private drawLeftLabelImage;
    private drawLeftLabelValue;
    private getWidth;
    private getWidthofLeftLabel;
    private getWidthofrightLabel;
    /**
     * @param {PdfGraphics} taskGraphics .
     * @param {PointF} startPoint .
     * @param {number} cumulativeWidth .
     * @param {number} adjustHeight .
     * @returns {void}
     * Draw Unscheduled Task
     */
    private drawUnscheduledTask;
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @param {PdfGanttTaskbarCollection} taskbar .
     * @param {boolean} isBaseline .
     * @returns {void}
    Draw milestone task
     */
    private drawMilestone;
}
