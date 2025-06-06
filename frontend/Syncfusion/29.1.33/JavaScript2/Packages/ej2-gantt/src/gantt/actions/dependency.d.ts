/**
 * Predecessor calculation goes here
 */
import { IGanttData, ITaskData, IPredecessor, IConnectorLineObject } from '../base/interface';
import { Gantt } from '../base/gantt';
export declare class Dependency {
    private parent;
    validatedChildItems: IGanttData[];
    private dateValidateModule;
    private parentRecord;
    private parentIds;
    private parentPredecessors;
    private validatedParentIds;
    isValidatedParentTaskID: string;
    private storeId;
    isChildRecordValidated: (number | string)[];
    constructor(gantt: Gantt);
    /**
     * Method to populate predecessor collections in records
     *
     * @returns {void} .
     * @private
     */
    ensurePredecessorCollection(): void;
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {ITaskData} ganttProp .
     * @returns {void} .
     * @private
     */
    ensurePredecessorCollectionHelper(ganttData: IGanttData, ganttProp: ITaskData): void;
    /**
     * To render unscheduled empty task with 1 day duration during predecessor map
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateUnscheduledDependency(data: IGanttData): void;
    /**
     *
     * @param {string} fromId .
     * @returns {boolean} .
     */
    private checkIsParent;
    getRootParent(rec: IGanttData): IGanttData;
    validateParentPredecessor(fromRecord: IGanttData, toRecord: IGanttData): boolean;
    /**
     * Get predecessor collection object from predecessor string value
     *
     * @param {string | number} predecessorValue .
     * @param {IGanttData} ganttRecord .
     * @returns {IPredecessor[]} .
     * @private
     */
    calculatePredecessor(predecessorValue: string | number, ganttRecord?: IGanttData): IPredecessor[];
    /**
     * Get predecessor value as string with offset values
     *
     * @param {IGanttData} data .
     * @returns {string} .
     * @private
     */
    getPredecessorStringValue(data: IGanttData): string;
    private getOffsetDurationUnit;
    /**
     * Update predecessor object in both from and to tasks collection
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    updatePredecessors(flatDataCollection?: Map<string, IGanttData>): void;
    /**
     * To update predecessor collection to successor tasks
     *
     * @param {IGanttData} ganttRecord .
     * @param {IGanttData[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    updatePredecessorHelper(ganttRecord: IGanttData, predecessorsCollection?: IGanttData[], flatDataCollection?: Map<string, IGanttData>): void;
    private traverseParents;
    /**
     * Method to validate date of tasks with predecessor values for all records
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    updatedRecordsDateByPredecessor(flatDataCollection?: Map<string, IGanttData>): void;
    updateParentPredecessor(flatDataCollection?: Map<string, IGanttData>): void;
    /**
     * To validate task date values with dependency
     *
     * @param {IGanttData} ganttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    validatePredecessorDates(ganttRecord: IGanttData, flatDataCollection?: Map<string, IGanttData>): void;
    /**
     * Method to validate task with predecessor
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     */
    private validateChildGanttRecord;
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {Date} .
     * @private
     */
    getPredecessorDate(ganttRecord: IGanttData, predecessorsCollection: IPredecessor[], flatDataCollection?: Map<string, IGanttData>): Date;
    /**
     * Get validated start date as per predecessor type
     *
     * @param {ITaskData} ganttProperty .
     * @param {ITaskData} parentRecordProperty .
     * @param {IPredecessor} predecessor .
     * @returns {Date} .
     */
    private getValidatedStartDate;
    /**
     *
     * @param {Date} date .
     * @param {IPredecessor} predecessor .
     * @param {ITaskData} record .
     * @returns {void} .
     */
    private updateDateByOffset;
    /**
     *
     * @param {IGanttData} records .
     * @returns {void} .
     * @private
     */
    createConnectorLinesCollection(records?: IGanttData[]): void;
    /**
     *
     * @param {object[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @param {number} rowHeight .
     * @returns {void} .
     */
    private addPredecessorsCollection;
    /**
     * To refresh connector line object collections
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor} predecessor .
     * @param {number} rowHeight .
     * @returns {void} .
     * @private
     */
    updateConnectorLineObject(parentGanttRecord: IGanttData, childGanttRecord: IGanttData, predecessor: IPredecessor, rowHeight?: number): IConnectorLineObject;
    /**
     *
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor[]} previousValue .
     * @param {string} validationOn .
     * @returns {void} .
     * @private
     */
    validatePredecessor(childGanttRecord: IGanttData, previousValue: IPredecessor[], validationOn: string): void;
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     */
    private updateChildItems;
    /**
     * To get updated child records.
     *
     * @param {IGanttData} parentRecord .
     * @param {IGanttData} childLists .
     * @returns {void} .
     */
    private getUpdatableChildRecords;
    /**
     *
     * @param {IGanttData} data .
     * @param {Date} newStartDate .
     * @returns {void} .
     */
    private calculateDateByRoundOffDuration;
    private getRecord;
    /**
     * Method to get validate able predecessor alone from record
     *
     * @param {IGanttData} record .
     * @returns {IPredecessor[]} .
     * @private
     */
    getValidPredecessor(record: IGanttData): IPredecessor[];
}
