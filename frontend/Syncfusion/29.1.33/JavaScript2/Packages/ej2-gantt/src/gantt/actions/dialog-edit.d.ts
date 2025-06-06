import { Dialog } from '@syncfusion/ej2-popups';
import { Gantt } from '../base/gantt';
import { EditDialogFieldSettingsModel } from '../models/models';
import { DialogFieldType } from '../base/enum';
import { TextBox, NumericTextBox, MaskedTextBox } from '@syncfusion/ej2-inputs';
import { IGanttData, IPredecessor } from '../base/interface';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 *
 * @hidden
 */
export declare class DialogEdit {
    private isEdit;
    /**
     * @private
     */
    dialog: HTMLElement;
    isAddNewResource: boolean;
    /**
     * @private
     */
    dialogObj: Dialog;
    private preTableCollection;
    private preTaskIds;
    private localeObj;
    private parent;
    private rowIndex;
    private isFromDialogPredecessor;
    private isTriggered;
    private formObj;
    private CustomformObj;
    private taskFieldColumn;
    private customFieldColumn;
    private isFromAddDialog;
    private isFromEditDialog;
    processedId: {
        id: string;
        value: IPredecessor[];
    }[];
    private storeColumn;
    private taskfields;
    private storeValidTab;
    private storeDependencyTab;
    private storeResourceTab;
    private firstOccuringTab;
    private numericOrString;
    private types;
    private editedRecord;
    private rowData;
    private beforeOpenArgs;
    private inputs;
    private idCollection;
    private disableUndo;
    private currentResources;
    /**
     * @private
     */
    updatedEditFields: EditDialogFieldSettingsModel[];
    private updatedAddFields;
    private addedRecord;
    private dialogEditValidationFlag;
    private tabObj;
    private selectedSegment;
    ganttResources: Object[];
    private isValidData;
    private isResourceTabUpdated;
    /**
     * @private
     */
    previousResource: Object[];
    /**
     * @private
     */
    isResourceUpdate: boolean;
    /**
     * Constructor for render module
     *
     * @param {Gantt} parent .
     * @returns {void} .
     */
    constructor(parent: Gantt);
    private wireEvents;
    private dblClickHandler;
    /**
     * Method to validate add and edit dialog fields property.
     *
     * @returns {void} .
     * @private
     */
    processDialogFields(): void;
    private validateDialogFields;
    /**
     * Method to get general column fields
     *
     * @returns {string[]} .
     */
    private getGeneralColumnFields;
    /**
     * Method to get custom column fields
     *
     * @returns {void} .
     */
    private getCustomColumnFields;
    /**
     * Get default dialog fields when fields are not defined for add and edit dialogs
     *
     * @returns {AddDialogFieldSettings} .
     */
    private getDefaultDialogFields;
    /**
     * @returns {void} .
     * @private
     */
    openAddDialog(): void;
    /**
     *
     * @returns {Date} .
     * @private
     */
    getMinimumStartDate(): Date;
    /**
     * @returns {IGanttData} .
     * @private
     */
    composeAddRecord(): IGanttData;
    /**
     * @returns {void} .
     * @private
     */
    openToolbarEditDialog(): void;
    /**
     * @param { number | string | object} taskId .
     * @returns {void} .
     * @private
     */
    openEditDialog(taskId: number | string | object): void;
    private createDialog;
    private buttonClick;
    /**
     * @returns {void} .
     * @private
     */
    dialogClose(): void;
    private resetValues;
    private destroyDialogInnerElements;
    private destroyCustomField;
    /**
     * @returns {void} .
     * @private
     */
    destroy(): void;
    /**
     * Method to get current edit dialog fields value
     *
     * @returns {AddDialogFieldSettings} .
     */
    private getEditFields;
    private createTab;
    private changeFormObj;
    private getFilteredDialogFields;
    private validateColumn;
    private createFormObj;
    private valErrorPlacement;
    private createTooltip;
    private getElemTable;
    private validationComplete;
    private tabSelectedEvent;
    private responsiveTabContent;
    private getFieldsModel;
    private createInputModel;
    private validateScheduleFields;
    private updateScheduleFields;
    /**
     * @param {IGanttData} ganttData .
     * @returns {void} .
     * @private
     */
    validateDuration(ganttData: IGanttData): void;
    private validateStartDate;
    private validateEndDate;
    /**
     *
     * @param {string} columnName .
     * @param {string} value .
     * @param {IGanttData} currentData .
     * @returns {boolean} .
     * @private
     */
    validateScheduleValuesByCurrentField(columnName: string, value: string, currentData: IGanttData): boolean;
    private getSegmentsModel;
    private getGridColumnByField;
    private updateSegmentField;
    private validateSegmentFields;
    private getPredecessorModel;
    private getResourcesModel;
    private getNotesModel;
    private createDivElement;
    private createFormElement;
    private createInputElement;
    private renderTabItems;
    private segmentGridActionBegin;
    getDialogTabIndex(tabName: DialogFieldType): number;
    private setInjected;
    private renderSegmentsTab;
    private renderGeneralTab;
    private isCheckIsDisabled;
    private isParentValid;
    private renderPredecessorTab;
    private updateColumns;
    private gridActionBegin;
    private gridActionComplete;
    private updateResourceCollection;
    private renderResourceTab;
    private resourceSelection;
    private renderCustomTab;
    private renderNotesTab;
    private renderInputElements;
    private taskNameCollection;
    private predecessorEditCollection;
    private updatePredecessorDropDownData;
    private validSuccessorTasks;
    private getPredecessorType;
    private initiateDialogSave;
    private compareObjects;
    private updateSegmentTaskData;
    private updateSegmentsData;
    private updateGeneralTab;
    private updateScheduleProperties;
    private getMatchingPrefix;
    private updatePredecessorTab;
    private updateResourceTab;
    private updateNotesTab;
    private updateCustomTab;
}
/**
 * @hidden
 */
export declare type Inputs = CheckBox | DropDownList | TextBox | NumericTextBox | DatePicker | DateTimePicker | MaskedTextBox;
/**
 * @hidden
 */
export interface IPreData {
    id?: string;
    name?: string;
    type?: string;
    offset?: string;
    uniqueId?: number;
}
