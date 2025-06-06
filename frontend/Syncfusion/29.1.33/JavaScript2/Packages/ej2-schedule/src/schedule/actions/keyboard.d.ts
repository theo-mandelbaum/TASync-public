import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Schedule } from '../base/schedule';
/**
 * Keyboard interaction
 */
export declare class KeyboardInteraction {
    /**
     * Constructor
     */
    private parent;
    private initialTarget;
    selectedCells: HTMLTableCellElement[];
    private clipBoardTextArea;
    private isCutContentPasted;
    private isCutAction;
    private keyConfigs;
    private keyboardModule;
    constructor(parent: Schedule);
    private keyActionHandler;
    private processShiftAltN;
    private processFTwelve;
    private addEventListener;
    private removeEventListener;
    private onCellMouseDown;
    onMouseSelection(e: MouseEvent): void;
    private getClosestCell;
    private onMoveUp;
    private processEnter;
    private getSelectedElements;
    private getCells;
    private focusFirstCell;
    private isInverseTableSelect;
    /**
     * Internal method to select cells
     *
     * @param {boolean} isMultiple Accepts to select multiple cells or not
     * @param {HTMLTableCellElement} targetCell Accepts the target cells
     * @returns {void}
     * @private
     */
    selectCells(isMultiple: boolean, targetCell: HTMLTableCellElement): void;
    private selectAppointment;
    private selectAppointmentElementFromWorkCell;
    private getAllDayCells;
    private getAppointmentElements;
    private getAppointmentElementsByGuid;
    private getUniqueAppointmentElements;
    private getWorkCellFromAppointmentElement;
    private processViewNavigation;
    private isCalendarTarget;
    private cancelUpDownAction;
    private processUp;
    private processDown;
    private getYearUpDownCell;
    private getHorizontalUpDownCell;
    private getVerticalUpDownCell;
    private processLeftRight;
    private getQuickPopupElement;
    private isCancelLeftRightAction;
    private processRight;
    private processLeft;
    private getTimelineYearTargetCell;
    private getHorizontalLeftRightCell;
    private getVerticalLeftRightCell;
    private calculateNextPrevDate;
    private getFocusableElements;
    private processTabOnPopup;
    private processTab;
    private processDelete;
    private processCtrlShiftNavigationArrows;
    private processEscape;
    private isPreventAction;
    private processTabOnResourceCells;
    private setScrollPosition;
    private createClipboardElement;
    private setCopy;
    private filterReadOnlyEvent;
    processClipboardAction(isCut: boolean, copiedEventData?: Record<string, any>[], e?: KeyboardEventArgs): void;
    pasteHandler(clipboardEvent: ClipboardEvent, targetElement?: HTMLElement): void;
    private processPaste;
    private getTargetElements;
    private isAllDayEvent;
    private processEventData;
    private adjustEventTime;
    private prepareEventData;
    private calculateTotalDuration;
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the keyboard module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
