import { IRichTextEditor } from '../base/interface';
import { RichTextEditorModel } from '../base/rich-text-editor-model';
import { ServiceLocator } from '../services/service-locator';
import { XhtmlValidation } from './xhtml-validation';
/**
 * `HtmlEditor` module is used to HTML editor
 */
export declare class HtmlEditor {
    private isDestroyed;
    private parent;
    private locator;
    private contentRenderer;
    private renderFactory;
    private toolbarUpdate;
    private nodeSelectionObj;
    private rangeCollection;
    private rangeElement;
    private oldRangeElement;
    private deleteRangeElement;
    private deleteOldRangeElement;
    private isImageDelete;
    private isMention;
    private saveSelection;
    xhtmlValidation: XhtmlValidation;
    private clickTimeout;
    private isCopyAll;
    private isSlashMenuOpen;
    private isPreviousNodeBrAfterBackSpace;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    /**
     * Destroys the Markdown.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    /**
     * @param {string} value - specifies the string value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    sanitizeHelper(value: string): string;
    private addEventListener;
    private onSlashMenuOpen;
    private updateReadOnly;
    private onSelectionSave;
    private onSelectionRestore;
    private isTableClassAdded;
    private onHandleFontsizeChange;
    private convertFontSize;
    private onKeyUp;
    private removeZeroWidthSpaces;
    private onKeyDown;
    private isOrderedList;
    private isUnOrderedList;
    private hasMultipleTextNode;
    private isCursorAtBlockStart;
    private backSpaceCleanup;
    private getLastNode;
    private removeLastBr;
    private deleteCleanup;
    private getCaretIndex;
    private getRangeElement;
    private getRootBlockNode;
    private getRangeLiNode;
    private onPaste;
    private spaceLink;
    private onToolbarClick;
    private instantiateRenderer;
    private removeEventListener;
    private render;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} e - specifies the editor model
     * @returns {void}
     * @hidden
     * @deprecated
     */
    protected onPropertyChanged(e: {
        [key: string]: RichTextEditorModel;
    }): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     * @hidden
     */
    private getModuleName;
    /**
     * For selecting all content in RTE
     *
     * @returns {void}
     * @private
     * @hidden
     */
    private selectAll;
    /**
     * For selecting all content in RTE
     *
     * @param {NotifyArgs} e - specifies the notified arguments
     * @returns {void}
     * @private
     * @hidden
     */
    private selectRange;
    /**
     * For get a selected text in RTE
     *
     * @param {NotifyArgs} e - specifies the notified arguments
     * @returns {void}
     * @hidden
     */
    private getSelectedHtml;
    private tableSelectionKeyAction;
    private marginTabAdd;
}
