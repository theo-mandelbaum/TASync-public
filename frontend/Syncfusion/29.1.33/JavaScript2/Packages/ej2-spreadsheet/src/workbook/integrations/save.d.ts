import { Workbook } from '../base/index';
import { SaveWorker } from '../workers/save-worker';
/**
 * @hidden
 * The `WorkbookSave` module is used to handle the save action in Workbook library.
 */
export declare class WorkbookSave extends SaveWorker {
    private isProcessCompleted;
    private saveSettings;
    private saveJSON;
    private isFullPost;
    private needBlobData;
    private customParams;
    private pdfLayoutSettings;
    /**
     * Constructor for WorkbookSave module in Workbook library.
     *
     * @private
     * @param {Workbook} parent - Specifies the workbook.
     */
    constructor(parent: Workbook);
    /**
     * Get the module name.
     *
     * @returns {string} - To Get the module name.
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the WorkbookSave module.
     *
     * @returns {void} - To destroy the WorkbookSave module.
     * @hidden
     */
    destroy(): void;
    /**
     * @hidden
     * @returns {void} - add Event Listener
     */
    private addEventListener;
    /**
     * @hidden
     * @returns {void} - remove Event Listener.
     */
    private removeEventListener;
    /**
     * Initiate save process.
     *
     * @hidden
     * @param {Object} args - Specify the args.
     * @returns {void} - Initiate save process.
     */
    private initiateSave;
    /**
     * Update save JSON with basic settings.
     *
     * @hidden
     * @returns {void} - Update save JSON with basic settings.
     */
    private updateBasicSettings;
    /**
     * Process sheets properties.
     *
     * @param {boolean} autoDetectFormat - Auto detect the format based on the cell value.
     * @param {SerializationOptions} jsonConfig - Specify the serialization options to exclude specific features from the JSON.
     * @hidden
     * @returns {void} - Process sheets properties.
     */
    private processSheets;
    /**
     * Update processed sheet data.
     *
     * @hidden
     * @param {Object[]} data - Specifies the data.
     * @returns {void} - Update processed sheet data.
     */
    private updateSheet;
    private getSheetLength;
    /**
     * Save process.
     *
     * @hidden
     * @param {SaveOptions} saveSettings - Specifies the save settings props.
     * @returns {void} - Save process.
     */
    private save;
    /**
     * Update final save data.
     *
     * @hidden
     * @param {Object | Blob} result - specify the sve result.
     * @returns {void} - Update final save data.
     */
    private updateSaveResult;
    private ClientFileDownload;
    private initiateFullPostSave;
    private performStringifyAction;
    /**
     * Get stringified workbook object.
     *
     * @hidden
     * @param {object} model - Specifies the workbook or sheet model.
     * @param {string[]} skipProp - specifies the skipprop.
     * @param {number} sheetIdx - Specifies the sheet index.
     * @param {boolean} autoDetectFormat - Auto detect the format based on the cell value.
     * @param {boolean} isSaveAction - Specifies whether the call is for sheet processing during save action.
     * @returns {string} - Get stringified workbook object.
     */
    private getStringifyObject;
    private getDateAsNumber;
    private getFileNameWithExtension;
    private getFileExtension;
}
