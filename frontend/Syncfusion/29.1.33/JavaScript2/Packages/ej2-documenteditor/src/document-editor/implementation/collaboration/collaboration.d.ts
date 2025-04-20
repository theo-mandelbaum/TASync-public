import { DocumentEditor, Operation } from '../../index';
/**
 * Module to handle collaborative editing.
 */
export declare class CollaborativeEditingHandler {
    private version;
    private documentEditor;
    private roomName;
    private userMap;
    private connectionId;
    private acknowledgmentPending;
    private pendingOps;
    private commentsStart;
    private commentsEnd;
    private deletedComments;
    private serviceUrl;
    private isSyncServerChanges;
    private logEventEnabled;
    private message;
    private rowWidget;
    private table;
    constructor(documentEditor: DocumentEditor);
    /**
     * Get module name.
     * @returns - Returns the module name
     */
    getModuleName(): string;
    /**
     * This function updates the room information and server url of the collaborative editing session.
     * @param roomName - Specifies the current collaborative editing room name.
     * @param version - Specifies the current version of the document.
     * @param serviceUrl - Specifies the base url of the collaborative editing service.
     */
    updateRoomInfo(roomName: string, version: number, serviceUrl: string): void;
    /**
     * Send the current action to the server.
     * @param args - Specified the current action.
     * @returns
     */
    sendActionToServer(operations: Operation[]): void;
    private checkAndCombineOperation;
    private canCombineOperation;
    private isSameOperation;
    private isControlCharacter;
    /**
     * Apply the remote operation to the current document.
     * @param action - Specifies the remote action type.
     * @param data - Specifies the remote operation data.
     */
    applyRemoteAction(action: string, data: string | ActionInfo): void;
    private isAcknowledgePending;
    private handleAcknowledgementReceived;
    private updateVersion;
    private acknowledgementReceived;
    private sendLocalOperation;
    private dataReceived;
    private getVersionDifference;
    private handleRemoteOperation;
    private transform;
    private skipAction;
    private handleAcceptReject;
    private applyRemoteOperation;
    private updateOperation;
    private getComment;
    private updateList;
    private getOperationLength;
    private updateListCollection;
    private getObjectByCommentId;
    private transformOperation;
    private transformSection;
    private transformRemoteCursor;
    /**
     * @private
     * @returns {void}
    */
    updateCaretPosition(connectionId?: string, operation?: Operation): void;
    private updateRemoteSelection;
    private removeCarets;
    private getColorForMember;
    private updateCaretPositionInteral;
    private getBlockPosition;
    private getBlockTotalLength;
    private getRelativePositionFromAbsolutePosition;
    private getBlockIndexFromHeaderFooter;
    private getBlockByIndex;
    private insertImage;
    private buildTable;
    private buildRow;
    private buildCell;
    private buildDeleteCells;
    private transformSelectionOperation;
    private documentSettings;
    private checkAndRetriveChangesFromServer;
    private applyChangesFromServer;
    private insertCharaterFormat;
    private insertParagraphFormat;
    private insertTableFormat;
    private insertRowFormat;
    private insertCellFormat;
    private insertSectionFormat;
    private logMessage;
    private setCustomAjaxHeaders;
    /**
     * Destory collaborative editing module.
     * @private
     */
    destroy(): void;
}
/**
 * Specifies the action info.
 * > Reserved for internal use only.
 */
export interface ActionInfo {
    /**
     * Reserved for internal use only.
     */
    connectionId?: string;
    /**
     * Reserved for internal use only.
     */
    version?: number;
    /**
     * Reserved for internal use only.
     */
    roomName?: string;
    /**
     * Reserved for internal use only.
     */
    operations?: Operation[];
    /**
     * Reserved for internal use only.
     */
    currentUser?: string;
}
