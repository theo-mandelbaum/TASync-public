import { Gantt } from '../base/gantt';
import { ITaskData, IGanttData, ITaskSegment } from '../base/interface';
import { ColumnModel } from '../models/column';
/**
 * To handle cell edit action on default columns and custom columns
 */
export declare class CellEdit {
    private parent;
    /**
     * @private
     */
    isCellEdit: boolean;
    isResourceCellEdited: boolean;
    editedColumn: ColumnModel;
    currentEditedRowData: IGanttData;
    constructor(ganttObj: Gantt);
    /**
     * Bind all editing related properties from Gantt to TreeGrid
     *
     * @returns {void} .
     */
    private bindTreeGridProperties;
    /**
     * Ensure current cell was editable or not
     *
     * @param {CellEditArgs} args .
     * @returns {void | Deferred} .
     */
    private ensureEditCell;
    /**
     * To render edit dialog and to focus on notes tab
     *
     * @param {CellEditArgs} args .
     * @returns {void} .
     */
    private openNotesEditor;
    /**
     * Initiate cell save action on Gantt with arguments from TreeGrid
     *
     * @param {object} args .
     * @param {object} editedObj .
     * @returns {void} .
     * @private
     */
    initiateCellEdit(args: object, editedObj: object): void;
    /**
     * To update task name cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private taskNameEdited;
    /**
     * To update task notes cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private notedEdited;
    /**
     * To update task schedule mode cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private taskmodeEdited;
    /**
     * To update task start date cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private startDateEdited;
    validateEndDateWithSegments(ganttProp: ITaskData): ITaskSegment[];
    /**
     * To update task end date cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @param {Date} previousValue .
     * @returns {void} .
     */
    private endDateEdited;
    /**
     * To update duration cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private durationEdited;
    /**
     * To update start date, end date based on duration
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private updateDates;
    /**
     * To update progress cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private progressEdited;
    /**
     * To update baselines with new baseline start date and baseline end date
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private baselineEdited;
    /**
     * To update task's resource cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @param {object} editedObj .
     * @param {IGanttData} previousData .
     * @returns {void} .
     */
    private resourceEdited;
    /**
     * To update task's predecessor cell with new value
     *
     * @param {ITaskbarEditedEventArgs} editedArgs .
     * @param {object} cellEditArgs .
     * @returns {void} .
     */
    private dependencyEdited;
    /**
     * To update task's work cell with new value
     *
     * @param {ITaskbarEditedEventArgs} editedArgs .
     * @returns {void} .
     */
    private workEdited;
    /**
     * To update task type cell with new value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @param {object} editedObj .
     * @returns {void} .
     */
    private typeEdited;
    /**
     * To compare start date and end date from Gantt record
     *
     * @param {ITaskData} ganttRecord .
     * @returns {number} .
     */
    private compareDatesFromRecord;
    /**
     * To start method save action with edited cell value
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     */
    private updateEditedRecord;
    /**
     * To remove all public private properties
     *
     * @returns {void} .
     * @private
     */
    destroy(): void;
}
