import { L10n } from '@syncfusion/ej2-base';
import { ElementBox } from '../viewer/page';
import { DocumentHelper } from '../viewer';
/**
 * Spell check dialog
 */
export declare class SpellCheckDialog {
    private target;
    private elementBox;
    /**
     * @private
     */
    localValue: L10n;
    private errorText;
    private spellingListView;
    private suggestionListView;
    private selectedText;
    documentHelper: DocumentHelper;
    private isSpellChecking;
    private textContainer;
    private spellContainer;
    private listviewDiv;
    private buttonDiv;
    private ignoreButtonElement;
    private ignorebutton;
    private ignoreAllButtonElement;
    private ignoreAllbutton;
    private addDictButtonElement;
    private addDictButton;
    private suggestionDiv;
    private suggestionContainer;
    private suggestListDiv;
    private suggestBtnContainder;
    private changeButtonElement;
    private changeButton;
    private changeAllButtonElement;
    private changeAllbutton;
    private ignoreClickHandler;
    private ignoreAllClickHandler;
    private addToDictClickHandler;
    private selectHandlerClickHandler;
    private changeButtonClickHandler;
    private onChangeAllButtonClickHandler;
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    constructor(documentHelper: DocumentHelper);
    private readonly parent;
    private getModuleName;
    private onSelectHandlerClick;
    /**
     * @param {SelectEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    private selectHandler;
    /**
     * @private
     * @returns {void}
     */
    onCancelButtonClick: () => void;
    private onIgnoreClick;
    /**
     * @private
     * @returns {void}
     */
    onIgnoreClicked: () => void;
    private removeErrors;
    private onIgnoreAllClick;
    /**
     * @private
     * @returns {void}
     */
    onIgnoreAllClicked: () => void;
    private onAddToDictClick;
    /**
     * @private
     * @returns {void}
     */
    addToDictClicked: () => void;
    private onChangeButtonClick;
    /**
     * @private
     * @returns {void}
     */
    changeButtonClicked: () => void;
    private onChangeAllButtonClick;
    /**
     * @private
     * @returns {void}
     */
    changeAllButtonClicked: () => void;
    /**
     * @private
     * @param {string} error - Specifies error element box.
     * @param {ElementBox} elementbox - Specifies the element box.
     * @returns {void}
     */
    show(error?: string, elementbox?: ElementBox): void;
    /**
     * @private
     * @param {string} error - Specifies error element box.
     * @param {ElementBox} elementbox - Specifies the element box.
     * @returns {void}
     */
    updateSuggestionDialog(error: string, elementBox: ElementBox): void;
    private handleRetrievedSuggestion;
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value.
     * @param {string} error - Specifies the error text.
     * @param {string[]} suggestion - Specifies the suggestion.
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    initSpellCheckDialog(localValue: L10n, error?: string, suggestion?: string[], isRtl?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private removeEvents;
    private removeElements;
}
