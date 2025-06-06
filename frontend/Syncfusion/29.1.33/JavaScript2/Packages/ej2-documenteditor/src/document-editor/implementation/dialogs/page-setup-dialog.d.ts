import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DocumentHelper } from '../viewer';
/**
 * The Page setup dialog is used to modify formatting of selected sections.
 */
export declare class PageSetupDialog {
    private target;
    /**
     * @private
     */
    documentHelper: DocumentHelper;
    /**
     * @private
     */
    topMarginBox: NumericTextBox;
    /**
     * @private
     */
    bottomMarginBox: NumericTextBox;
    /**
     * @private
     */
    leftMarginBox: NumericTextBox;
    /**
     * @private
     */
    rightMarginBox: NumericTextBox;
    /**
     * @private
     */
    widthBox: NumericTextBox;
    /**
     * @private
     */
    heightBox: NumericTextBox;
    /**
     * @private
     */
    headerBox: NumericTextBox;
    /**
     * @private
     */
    footerBox: NumericTextBox;
    private paperSize;
    private checkBox1;
    private checkBox2;
    private landscape;
    private portrait;
    private isPortrait;
    private marginTab;
    private paperTab;
    private layoutTab;
    private ejtabContainer;
    private ejtab;
    private headerContainer;
    private marginHeader;
    private paperHeader;
    private layoutHeader;
    private marginContent;
    private paperContent;
    private layoutContent;
    private marginDiv;
    private leftMarginDiv;
    private rightMarginDiv;
    private topTextBox;
    private bottomTextBox;
    private topContainer;
    private bottomContainer;
    private leftTextBox;
    private rightTextBox;
    private leftContainer;
    private rightContainer;
    private orientationDiv;
    private orientationLabeldiv;
    private orientationPropDiv;
    private portraitDiv;
    private landscapeDiv;
    private sizeDiv;
    private leftSizeDiv;
    private rightSizeDiv;
    private widthTextBox;
    private heightTextBox;
    private paperSizeDiv;
    private layoutDiv;
    private firstPageDiv;
    private oddOrEvenDiv;
    private textLabelDiv;
    private textLabel;
    private propertyDiv;
    private leftLayoutDiv;
    private rightLayoutDiv;
    private dialogElement;
    private keyUpInsertPageSettingsClickHandler;
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    constructor(documentHelper: DocumentHelper);
    private getModuleName;
    /**
     * @private
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    initPageSetupDialog(locale: L10n, isRtl?: boolean): void;
    /**
     * @private
     * @param {HTMLDivElement} element - Specifies the div element
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    initMarginProperties(element: HTMLDivElement, locale: L10n, isRtl?: boolean): void;
    /**
     * @private
     * @param {HTMLDivElement} element - Specifies the div element
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    initPaperSizeProperties(element: HTMLDivElement, locale: L10n, isRtl?: boolean): void;
    /**
     * @private
     * @param {HTMLDivElement} element - Specifies the div element
     * @param {L10n} locale - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    initLayoutProperties(element: HTMLDivElement, locale: L10n, isRtl?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    show(): void;
    /**
     * @private
     * @returns {void}
     */
    loadPageSetupDialog: () => void;
    private setPageSize;
    /**
     * @private
     * @returns {void}
     */
    closePageSetupDialog: () => void;
    /**
     * @private
     * @returns {void}
     */
    onCancelButtonClick: () => void;
    private onKeyUpInsertPageSettingsClick;
    /**
     * @private
     * @param {KeyboardEvent} event - Specifies the event args.
     * @returns {void}
     */
    keyUpInsertPageSettings: (event: KeyboardEvent) => void;
    /**
     * @private
     * @returns {void}
     */
    applyPageSetupProperties: () => void;
    /**
     * @private
     * @param {ChangeEventArgs} event - Specifies the event args.
     * @returns {void}
     */
    changeByPaperSize: (event: ChangeEventArgs) => void;
    /**
     * @private
     * @returns {void}
     */
    onPortrait: () => void;
    /**
     * @private
     * @returns {void}
     */
    onLandscape: () => void;
    /**
     * @private
     * @returns {void}
     */
    unWireEventsAndBindings: () => void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private removeEvents;
    private removeElements;
}
