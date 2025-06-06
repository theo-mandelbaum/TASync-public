import { Gantt } from '../base/gantt';
import { IGanttData, ITaskbarEditedEventArgs, IParent } from '../base/interface';
import { ITaskAddedEventArgs, RowDropEventArgs } from '../base/interface';
import { RowPosition } from '../base/enum';
import { CellEdit } from './cell-edit';
import { TaskbarEdit } from './taskbar-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * The Edit Module is used to handle editing actions.
 *
 */
export declare class Edit {
    private parent;
    private isFromDeleteMethod;
    private targetedRecords;
    private isNewRecordAdded;
    private isValidatedEditedRecord;
    private createArray;
    isFirstCall: boolean;
    isAdded: boolean;
    deletedRecord: IGanttData[];
    private canReset;
    /**
     * @private
     */
    /** @hidden */
    private ganttData;
    /** @hidden */
    private treeGridData;
    /** @hidden */
    private draggedRecord;
    /** @hidden */
    private updateParentRecords;
    /** @hidden */
    private droppedRecord;
    /** @hidden */
    private isTreeGridRefresh;
    /** @hidden */
    isaddtoBottom: boolean;
    /** @hidden */
    addRowPosition: RowPosition;
    /** @hidden */
    addRowIndex: number;
    /** @hidden */
    private dropPosition;
    confirmDialog: Dialog;
    private taskbarMoved;
    private predecessorUpdated;
    newlyAddedRecordBackup: IGanttData;
    isBreakLoop: boolean;
    addRowSelectedItem: IGanttData;
    cellEditModule: CellEdit;
    taskbarEditModule: TaskbarEdit;
    dialogModule: DialogEdit;
    private editedRecord;
    constructor(parent?: Gantt);
    private getModuleName;
    /**
     * Method to update default edit params and editors for Gantt
     *
     * @returns {void} .
     */
    private updateDefaultColumnEditors;
    /**
     * Method to update editors for id column in Gantt
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    private updateIDColumnEditParams;
    /**
     * Method to update edit params of default progress column
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    private updateProgessColumnEditParams;
    /**
     * Assign edit params for id and progress columns
     *
     * @param {ColumnModel} column .
     * @param {object} editParam .
     * @returns {void} .
     */
    private updateEditParams;
    /**
     * Method to update resource column editor for default resource column
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    private updateResourceColumnEditor;
    /**
     * Method to create resource custom editor
     *
     * @returns {IEditCell} .
     */
    private getResourceEditor;
    /**
     * Method to update task type column editor for task type
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    private updateTaskTypeColumnEditor;
    /**
     * Method to create task type custom editor
     *
     * @returns {IEditCell} .
     */
    private getTaskTypeEditor;
    /**
     * @returns {void} .
     * @private
     */
    reUpdateEditModules(): void;
    private recordDoubleClick;
    /**
     * @returns {void} .
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    deletedTaskDetails: IGanttData[];
    /**
     * Method to update record with new values.
     *
     * @param {Object} data - Defines new data to update.
     * @returns {void} .
     */
    updateRecordByID(data: Object): void;
    /**
     *
     * @param {object} data .
     * @param {IGanttData} ganttData .
     * @param {boolean} isFromDialog .
     * @returns {void} .
     * @private
     */
    validateUpdateValues(data: Object, ganttData: IGanttData, isFromDialog?: boolean): void;
    /**
     * To update duration, work, resource unit
     *
     * @param {IGanttData} currentData .
     * @param {string} column .
     * @returns {void} .
     */
    updateResourceRelatedFields(currentData: IGanttData, column: string): void;
    private validateScheduleValues;
    private validateScheduleByTwoValues;
    private isTaskbarMoved;
    private isPredecessorUpdated;
    /**
     * Method to check need to open predecessor validate dialog
     *
     * @param {IGanttData} data .
     * @returns {boolean} .
     */
    private isCheckPredecessor;
    /**
     * Method to copy the ganttProperties values
     *
     * @param {IGanttData} data .
     * @param {IGanttData} updateData .
     * @returns {void} .
     * @private
     */
    updateGanttProperties(data: IGanttData, updateData: IGanttData): void;
    /**
     * Method to update all dependent record on edit action
     *
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    initiateUpdateAction(args: ITaskbarEditedEventArgs): void;
    /**
     *
     * @param {ITaskbarEditedEventArgs} editedEventArgs method to trigger validate predecessor link by dialog
     * @returns {IValidateArgs} .
     */
    private validateTaskEvent;
    private resetValidateArgs;
    private validateChildPredecessors;
    /**
     *
     * @param {ITaskAddedEventArgs} args - Edited event args like taskbar editing, dialog editing, cell editing
     * @returns {void} .
     * @private
     */
    updateEditedTask(args: ITaskbarEditedEventArgs): void;
    private updateParentItemOnEditing;
    /**
     * To update parent records while perform drag action.
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateParentChildRecord(data: IGanttData): void;
    /**
     * To update records while changing schedule mode.
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    updateTaskScheduleModes(data: IGanttData): void;
    /**
     * To update progress value of parent tasks
     *
     * @param {IParent} cloneParent .
     * @returns {void} .
     * @private
     */
    updateParentProgress(cloneParent: IParent): void;
    /**
     * Method to revert cell edit action
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    revertCellEdit(args: object): void;
    /**
     * @param {boolean} isRefreshChart .
     * @param {boolean} isRefreshGrid .
     * @returns {void} .
     * @private
     */
    reUpdatePreviousRecords(isRefreshChart?: boolean, isRefreshGrid?: boolean): void;
    /**
     * Copy previous task data value to edited task data
     *
     * @param {object} existing .
     * @param {object} newValue .
     * @returns {void} .
     */
    private copyTaskData;
    /**
     * To update schedule date on editing.
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     * @private
     */
    private updateScheduleDatesOnEditing;
    /**
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     * @private
     */
    initiateSaveAction(args: ITaskbarEditedEventArgs): void;
    private updateEditedFields;
    private dmSuccess;
    private updateEditedRecordFields;
    private dmFailure;
    private updateSharedTask;
    /**
     * Method for save action success for local and remote data
     *
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     */
    private saveSuccess;
    private updateResoures;
    /**
     * @param {IGanttData} updateRecord .
     * @returns {void} .
     * @private
     */
    checkWithUnassignedTask(updateRecord: IGanttData): void;
    private addRecordAsBottom;
    private addNewRecord;
    private removeChildRecord;
    private addRecordAsChild;
    private resetEditProperties;
    /**
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    endEditAction(args: ITaskbarEditedEventArgs): void;
    private saveFailed;
    /**
     * To render delete confirmation dialog
     *
     * @returns {void} .
     */
    private renderDeleteConfirmDialog;
    private closeConfirmDialog;
    private confirmDeleteOkButton;
    /**
     * @returns {void} .
     * @private
     */
    startDeleteAction(): void;
    /**
     *
     * @param {IGanttData[]} selectedRecords - Defines the deleted records
     * @returns {void} .
     * Method to delete the records from resource view Gantt.
     */
    private deleteResourceRecords;
    add(record: IGanttData, totalRecords: IGanttData[]): void;
    private deleteSelectedItems;
    /**
     * Method to delete record.
     *
     * @param {number | string | number[] | string[] | IGanttData | IGanttData[]} taskDetail - Defines the details of data to delete.
     * @returns {void} .
     * @public
     */
    deleteRecord(taskDetail: number | string | number[] | string[] | IGanttData | IGanttData[]): void;
    /**
     * To update 'targetedRecords collection' from given array collection
     *
     * @param {object[]} taskDetailArray .
     * @returns {void} .
     */
    private updateTargetedRecords;
    private deleteRow;
    removePredecessorOnDelete(record: IGanttData): void;
    private updatePredecessorValues;
    /**
     * Method to update TaskID of a gantt record
     *
     * @param {string | number} currentId .
     * @param {number | string} newId .
     * @returns {void} .
     */
    updateTaskId(currentId: string | number, newId: number | string): void;
    private updatePredecessorOnUpdateId;
    private deleteChildRecords;
    removeFromDataSource(deleteRecordIDs: string[]): void;
    private removeData;
    private initiateDeleteAction;
    private deleteSuccess;
    /**
     *
     * @returns {number | string} .
     * @private
     */
    getNewTaskId(): number | string;
    /**
     * @param {object} obj .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    private prepareNewlyAddedData;
    /**
     * @param {object} obj .
     * @param {number} level .
     * @param {RowPosition} rowPosition .
     * @param {IGanttData} parentItem .
     * @param {number} rowIndex .
     * @returns {IGanttData} .
     * @private
     */
    private updateNewlyAddedDataBeforeAjax;
    /**
     * @param {IGanttData} record .
     * @param {number} count .
     * @returns {number} .
     * @private
     */
    getChildCount(record: IGanttData, count: number): number;
    /**
     * @param {IGanttData} data .
     * @param {number} count .
     * @param {IGanttData[]} collection .
     * @returns {number} .
     * @private
     */
    private getVisibleChildRecordCount;
    /**
     * @param {IGanttData} parentRecord .
     * @returns {void} .
     * @private
     */
    updatePredecessorOnIndentOutdent(parentRecord: IGanttData): void;
    /**
     * @param {IGanttData} record .
     * @param {RowPosition} rowPosition .
     * @param {IGanttData} parentItem .
     * @returns {void} .
     * @private
     */
    private backUpAndPushNewlyAddedRecord;
    /**
     * @param {number} childIndex .
     * @param {number} recordIndex .
     * @param {number} updatedCollectionIndex .
     * @param {IGanttData} record .
     * @param {IGanttData} parentItem .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    private recordCollectionUpdate;
    /**
     * @param {IGanttData} cAddedRecord .
     * @param {IGanttData} modifiedRecords .
     * @param {string} event .
     * @returns {ITaskAddedEventArgs} .
     * @private
     */
    private constructTaskAddedEventArgs;
    /**
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    private addSuccess;
    private refreshRecordInImmutableMode;
    /**
     * @param {IGanttData} addedRecord .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    updateRealDataSource(addedRecord: IGanttData | IGanttData[], rowPosition: RowPosition): void;
    /**
     * @param {object[]} dataCollection .
     * @param {IGanttData} record .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    private addDataInRealDataSource;
    /**
     * Method to update the values to client side from server side.
     *
     * @param {Object} e - Defines the new modified data from the server.
     * @param {Object[]} e.addedRecords .
     * @param {Object[]} e.changedRecords .
     * @param {ITaskAddedEventArgs} args - Defines the client side data.
     * @returns {void} .
     */
    updateClientDataFromServer(e: {
        addedRecords: Object[];
        changedRecords: Object[];
    }, args: ITaskAddedEventArgs): void;
    private addNewUndoCollection;
    /**
     * Method to add new record.
     *
     * @param {Object[] | Object} data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @returns {void} .
     * @private
     */
    addRecord(data?: Object[] | Object, rowPosition?: RowPosition, rowIndex?: number): void;
    createNewRecord(): IGanttData;
    /**
     * Method to validateTaskPosition.
     *
     * @param {Object | object[] } data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @param {IGanttData} cAddedRecord - Defines the single data to validate.
     * @returns {void} .
     * @private
     */
    validateTaskPosition(data?: Object | object[], rowPosition?: RowPosition, rowIndex?: number, cAddedRecord?: IGanttData[]): void;
    private updateRowIndex;
    private updateNewRecord;
    /**
     * Method to reset the flag after adding new record
     *
     * @returns {void} .
     */
    private _resetProperties;
    /**
     * Method to update unique id collection in TreeGrid
     *
     * @param {IGanttData} data .
     * @param {string} action .
     * @returns {void} .
     */
    private updateTreeGridUniqueID;
    private refreshNewlyAddedRecord;
    /**
     *
     * @returns {void} .
     * @private
     */
    private removeAddedRecord;
    private getPrevRecordIndex;
    /**
     * indent a selected record
     *
     * @returns {void} .
     */
    indent(): void;
    /**
     * To perform outdent operation for selected row
     *
     * @returns {void} .
     */
    outdent(): void;
    private indentOutdentRow;
    private reArrangeRows;
    /**
     * @returns {void} .
     * @param {RowDropEventArgs} args .
     * @param {boolean} isDrag .
     * @private
     */
    refreshRecord(args: RowDropEventArgs, isDrag?: boolean): void;
    private indentSuccess;
    private indentFailure;
    private indentOutdentSuccess;
    private refreshDataSource;
    private deleteDragRow;
    private updateIndentedChildRecords;
    private dropMiddle;
    private updateChildRecordLevel;
    private updateChildRecord;
    private removeRecords;
    private removeChildItem;
    private recordLevel;
}
