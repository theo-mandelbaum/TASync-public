import { ViewChangeEventArgs } from '../../document-editor/index';
import { L10n } from '@syncfusion/ej2-base';
import { DocumentEditorContainer } from '../document-editor-container';
/**
 * Represents document editor status bar.
 *
 * @private
 */
export declare class StatusBar {
    private zoom;
    private spellCheckButton;
    private pageBtn;
    private webBtn;
    private pageNumDiv;
    private statusBarDiv;
    private pageCount;
    private pageLabel;
    private pageNumberInput;
    private editablePageNumber;
    private ofLabel;
    private zoomBtn;
    private pageButton;
    private webButton;
    private verticalLine;
    private spellCheckBtn;
    private container;
    startPage: number;
    localObj: L10n;
    private currentLanguage;
    private allowSuggestion;
    private onPageLayoutClickHandler;
    private onWebLayoutClickHandler;
    private onPageNumberKeyDownHandler;
    private onPageNumberKeyUpHandler;
    private onPageNumberBlurHandler;
    private onPageNumberFocusHandler;
    private onPageLayoutClick;
    private onWebLayoutClick;
    private onPageNumberKeyDown;
    private onPageNumberKeyUp;
    private onPageNumberBlur;
    private onPageNumberFocus;
    private readonly documentEditor;
    private readonly editorPageCount;
    constructor(parentElement: HTMLElement, docEditor: DocumentEditorContainer);
    private initializeStatusBar;
    private addSpellCheckElement;
    private onZoom;
    private onSpellCheck;
    updateZoomContent(): void;
    private setSpellCheckValue;
    private setZoomValue;
    /**
     * Updates page count.
     *
     * @returns {void}
     */
    updatePageCount(): void;
    /**
     * Updates page number.
     *
     * @returns {void}
     */
    updatePageNumber(): void;
    updatePageNumberOnViewChange(args: ViewChangeEventArgs): void;
    private wireEvents;
    private unWireEvents;
    private updatePageNumberWidth;
    /**
     * @private
     * @returns {void}
     */
    toggleWebLayout(): void;
    /**
     * @private
     * @returns {void}
     */
    togglePageLayout(): void;
    private addRemoveClass;
    private createButtonTemplate;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private dependentComponentsDestroy;
    private removeHTMLDom;
}
