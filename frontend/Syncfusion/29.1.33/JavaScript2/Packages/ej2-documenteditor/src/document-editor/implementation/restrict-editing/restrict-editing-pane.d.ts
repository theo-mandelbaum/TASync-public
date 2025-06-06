import { LayoutViewer, DocumentHelper } from '../viewer';
import { L10n } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { AddUserDialog } from './add-user-dialog';
import { EnforceProtectionDialog, UnProtectDocumentDialog } from './enforce-protection-dialog';
import { ProtectionType } from '../../base/types';
import { Base64 } from '../editor/editor-helper';
import { ListView } from '@syncfusion/ej2-lists';
/**
 * @private
 * @param {any} args - Specifies the args
 * @returns {void}
 */
export declare class RestrictEditing {
    private documentHelper;
    restrictPane: HTMLElement;
    private addUser;
    private enforceProtection;
    private allowFormat;
    private allowPrint;
    private allowCopy;
    /**
     * @private
     */
    addUserDialog: AddUserDialog;
    enforceProtectionDialog: EnforceProtectionDialog;
    stopProtection: HTMLButtonElement;
    addRemove: boolean;
    private protectionTypeDrop;
    private userWholeDiv;
    /**
     * @private
     */
    unProtectDialog: UnProtectDocumentDialog;
    stopProtectionDiv: HTMLElement;
    contentDiv1: HTMLElement;
    contentDiv2: HTMLElement;
    restrictPaneWholeDiv: HTMLElement;
    private closeButton;
    protectionType: ProtectionType;
    private localObj;
    currentHashValue: string;
    currentSaltValue: string;
    previousProtectionType: string;
    isShowRestrictPane: boolean;
    base64: Base64;
    addedUser: ListView;
    stopReadOnlyOptions: HTMLElement;
    isAddUser: boolean;
    usersCollection: string[];
    highlightCheckBox: CheckBox;
    constructor(documentHelper: DocumentHelper);
    readonly viewer: LayoutViewer;
    showHideRestrictPane(isShow: boolean): void;
    private initPane;
    initRestrictEditingPane(localObj: L10n): void;
    showStopProtectionPane(show: boolean): void;
    /**
     * @returns {void}
     */
    private closePane;
    private wireEvents;
    private changeHighlightOptions;
    private enableFormatting;
    private stopProtectionTriggered;
    private protectionTypeDropChanges;
    private showRemovedIgnoreDialog;
    private onYesButtonClick;
    private onCancelButtonClick;
    private onNoButtonClick;
    private selectHandler;
    highlightClicked(args: any): void;
    private protectDocument;
    createCheckBox(label: string, element: HTMLInputElement): CheckBox;
    loadPaneValue(): void;
    navigateNextRegion(): void;
    addUserCollection(): void;
    /**
     * @returns {void}
     */
    showAllRegion: () => void;
    updateUserInformation(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
}
