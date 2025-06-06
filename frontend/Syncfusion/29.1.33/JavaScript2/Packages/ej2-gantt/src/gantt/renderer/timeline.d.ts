import { TimelineFormat } from './../base/interface';
import { Gantt } from '../base/gantt';
import { TimelineSettingsModel } from '../models/timeline-settings-model';
import { ITimeSpanEventArgs, IGanttData } from '../base/interface';
/**
 * Configures the `Timeline` of the gantt.
 */
export declare class Timeline {
    private parent;
    timelineStartDate: Date;
    timelineEndDate: Date;
    topTierCellWidth: number;
    bottomTierCellWidth: number;
    customTimelineSettings: TimelineSettingsModel;
    chartTimelineContainer: HTMLElement;
    topTier: string;
    bottomTier: string;
    isSingleTier: boolean;
    private previousIsSingleTier;
    timelineRoundOffEndDate: Date;
    totalTimelineWidth: number;
    isZoomIn: boolean;
    isZooming: boolean;
    isZoomToFit: boolean;
    topTierCollection: TimelineFormat[];
    bottomTierCollection: TimelineFormat[];
    pdfExportTopTierCollection: TimelineFormat[];
    pdfExportBottomTierCollection: TimelineFormat[];
    wholeTimelineWidth: number;
    restrictRender: boolean;
    weekendEndDate: Date;
    private clientWidthDifference;
    private performedTimeSpanAction;
    isZoomedToFit: boolean;
    constructor(ganttObj?: Gantt);
    /**
     * To initialize the public property.
     *
     * @returns {void}
     * @private
     */
    private initProperties;
    /**
     * To render timeline header series.
     *
     * @returns {void}
     * @private
     */
    validateTimelineProp(): void;
    /**
     * Function used to refresh Gantt rows.
     *
     * @returns {void}
     * @private
     */
    refreshTimeline(): void;
    /**
     * Function used to refresh Gantt rows.
     *
     * @returns {void}
     * @private
     */
    refreshTimelineByTimeSpan(): void;
    /**
     * Function used to refresh Gantt rows.
     *
     * @returns {void}
     * @private
     */
    updateChartByNewTimeline(): void;
    /**
     * Function used to perform Zoomin and Zoomout actions in Gantt control.
     *
     * @param {boolean} isZoomIn .
     * @private
     * @returns {void}
     */
    processZooming(isZoomIn: boolean): void;
    private updateUndoRedo;
    private getZoomLevel;
    private updateToolbar;
    /**
     * To change the timeline settings property values based upon the Zooming levels.
     *
     * @param {ZoomTimelineSettings} newTimeline .
     * @returns {void}
     * @private
     */
    private changeTimelineSettings;
    /**
     * To perform the zoom to fit operation in Gantt.
     *
     * @returns {void}
     * @private
     */
    processZoomToFit(): void;
    private bottomTierCellWidthCalc;
    private roundOffDateToZoom;
    private calculateNumberOfTimelineCells;
    /**
     * To validate time line unit.
     *
     * @returns {void}
     * @private
     */
    processTimelineUnit(): void;
    /**
     * To validate timeline properties.
     *
     * @returns {void}
     * @private
     */
    private processTimelineProperty;
    /**
     * To find the current zooming level of the Gantt control.
     *
     * @returns {void}
     * @private
     */
    calculateZoomingLevelsPerDayWidth(): void;
    /**
     * To find the current zooming level of the Gantt control.
     *
     * @returns {void}
     * @private
     */
    private checkCurrentZoomingLevel;
    /**
     * @param {string} unit .
     * @param {number} count .
     * @param {string} tier .
     * @returns {number} .
     * @private
     */
    private getCurrentZoomingLevel;
    /**
     * Getting closest zooimg level.
     *
     * @param {string} unit .
     * @param {string} closetUnit .
     * @param {boolean} isCont .
     * @returns {string} .
     * @private
     */
    private getClosestUnit;
    private checkCollectionsWidth;
    /**
     * To create timeline header template.
     *
     * @returns {void}
     * @private
     */
    updateTimelineHeaderHeight(): void;
    private dateByLeftValue;
    /**
     * To create timeline header template.
     *
     * @returns {void}
     * @private
     */
    createTimelineSeries(): void;
    timelineVirtualizationStyles(): void;
    /**
     * To validate timeline tier count.
     *
     * @param {string} mode .
     * @param {number} count .
     * @param {string} tier .
     * @returns {number} .
     * @private
     */
    private validateCount;
    /**
     * To validate bottom tier count.
     *
     * @param {string} mode .
     * @param {number} tierCount .
     * @returns {number} .
     * @private
     */
    private validateBottomTierCount;
    /**
     * To validate timeline tier format.
     *
     * @param {string} mode .
     * @param {string} format .
     * @returns {string} .
     * @private
     */
    private validateFormat;
    /**
     * To perform extend operation.
     *
     * @param {object} cloneObj .
     * @param {string[]} propertyCollection .
     * @param {object} innerProperty .
     * @returns {object} .
     * @private
     */
    extendFunction(cloneObj: Object, propertyCollection: string[], innerProperty?: Object): Object;
    /**
     * To format date.
     *
     * @param {string} dayFormat .
     * @param {Date} data .
     * @returns {string} .
     * @private
     */
    private formatDateHeader;
    /**
     * Custom Formatting.
     *
     * @param {Date} date .
     * @param {string} format .
     * @param {string} tier .
     * @param {string} mode .
     * @param {string | ITimelineFormatter} formatter .
     * @returns {string} .
     * @private
     */
    private customFormat;
    /**
     * To create timeline template .
     *
     * @param {string} tier .
     * @returns {string} .
     * @private
     */
    private createTimelineTemplate;
    updateTimelineAfterZooming(endDate: Date, resized: boolean): void;
    private getTimelineRoundOffEndDate;
    /**
     *
     * @param {Date} startDate .
     * @param {number} count .
     * @param {string} mode .
     * @param {boolean} isFirstCell .
     * @returns {number} .
     * @private
     */
    getIncrement(startDate: Date, count: number, mode: string, isFirstCell?: boolean): number;
    private checkDate;
    /**
     * Method to find header cell was weekend or not
     *
     * @param {string} mode .
     * @param {string} tier .
     * @param {Date} day .
     * @returns {boolean} .
     */
    private isWeekendHeaderCell;
    private calculateQuarterEndDate;
    calculateTotalHours(mode: string, count: number): number;
    /**
     * To construct template string.
     *
     * @param {Date} scheduleWeeks .
     * @param {string} mode .
     * @param {string} tier .
     * @param {boolean} isLast .
     * @param {number} count .
     * @param {TimelineFormat} timelineCell .
     * @returns {string} .
     * @private
     */
    private getHeaterTemplateString;
    /**
     * To calculate last 'th' width.
     *
     * @param {string} mode .
     * @param {Date} scheduleWeeks .
     * @param {Date} endDate .
     * @returns {number} .
     * @private
     */
    private calculateWidthBetweenTwoDate;
    /**
     * To calculate timeline width.
     *
     * @returns {void} .
     * @private
     */
    private timelineWidthCalculation;
    /**
     * To validate per day width.
     *
     * @param {number} timelineUnitSize .
     * @param {number} bottomTierCount .
     * @param {string} mode .
     * @returns {number} .
     * @private
     */
    private getPerDayWidth;
    /**
     * To validate project start date and end date.
     *
     * @returns {void} .
     * @private
     */
    private roundOffDays;
    /**
     * To validate project start date and end date.
     *
     * @param {string} mode .
     * @param {string} span .
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @returns {void} .
     * @private
     */
    updateScheduleDatesByToolBar(mode: string, span: string, startDate: Date, endDate: Date): void;
    /**
     * To validate project start date and end date.
     *
     * @param {IGanttData[]} tempArray .
     * @param {string} action .
     * @returns {void} .
     * @private
     */
    updateTimeLineOnEditing(tempArray: IGanttData[][], action: string): void;
    /**
     * To validate project start date and end date on editing action
     *
     * @param {string} type .
     * @param {string} isFrom .
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {string} mode .
     * @returns {void} .
     * @private
     */
    performTimeSpanAction(type: string, isFrom: string, startDate: Date, endDate: Date, mode?: string): void;
    /**
     * To validate project start date and end date.
     *
     * @param {string} eventType .
     * @param {string} requestType .
     * @param {string} isFrom .
     * @returns {void}
     * @private
     */
    timeSpanActionEvent(eventType: string, requestType?: string, isFrom?: string): ITimeSpanEventArgs;
}
