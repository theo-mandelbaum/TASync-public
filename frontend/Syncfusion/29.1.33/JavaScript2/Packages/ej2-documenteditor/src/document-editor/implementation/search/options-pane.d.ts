import { DocumentHelper } from '../index';
import { L10n } from '@syncfusion/ej2-base';
import { Tab } from '@syncfusion/ej2-navigations';
/**
 * Options Pane class.
 */
export declare class OptionsPane {
    private documentHelper;
    /**
     * @private
     */
    optionsPane: HTMLElement;
    /**
     * @private
     */
    isOptionsPaneShow: boolean;
    private resultsListBlock;
    private messageDiv;
    private results;
    private searchInput;
    private searchDiv;
    private searchTextBoxContainer;
    private replaceWith;
    private findDiv;
    private replaceDiv;
    private replaceButton;
    private replaceAllButton;
    private occurrenceDiv;
    private treeviewDiv;
    private checkboxDiv;
    private findOption;
    private matchCase;
    private wholeWord;
    private treeviewObject;
    private searchText;
    private resultsText;
    private messageDivText;
    private replaceButtonText;
    private replaceAllButtonText;
    private focusedIndex;
    private focusedElement;
    private resultContainer;
    private navigateToPreviousResult;
    private navigateToNextResult;
    private closeButton;
    private isOptionsPane;
    private findTab;
    private findTabButton;
    private headingTabButton;
    private replaceTabButton;
    private searchIcon;
    private matchDiv;
    private tabDiv;
    private replacePaneText;
    private findPaneText;
    private headingPaneText;
    private matchDivReplaceText;
    private matchInput;
    private wholeInput;
    private regularInput;
    /**
     * @private
     */
    isHeadingTab: boolean;
    /**
     * @private
     */
    isBuildHeading: boolean;
    /**
     * @private
     */
    data: {
        [key: string]: Object;
    }[];
    /**
     * @private
     */
    tabInstance: Tab;
    private findTabContentDiv;
    private replaceTabContentDiv;
    /**
     * @private
     */
    isReplace: boolean;
    /**
     * @private
     */
    isUpdateHeading: boolean;
    private localeValue;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    private getModuleName;
    /**
     * Initialize the options pane.
     *
     * @private
     * @param {L10n} localeValue - Specifies the localization based on culture.
     * @param {boolean} isRtl - Specifies the Rtl.
     * @returns {void}
     */
    initOptionsPane(localeValue: L10n, isRtl?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    updateHeadingTab(): void;
    /**
     * Initialize the heading tab with the values.
     *
     * @private
     * @returns {void}
     */
    initHeadingTab(): void;
    private customTemplate;
    private nodeClick;
    /**
     * Data source for tree view.
     *
     * @private
     * @returns {{ [key: string]: Object; }[]}
     */
    dataForTreeview(): {
        [key: string]: Object;
    }[];
    private createDataSourceForTreeview;
    private validateHeadingSettings;
    private constructHeadingFieldCode;
    private constructTSwitch;
    private createReplacePane;
    private selectedTabItem;
    /**
     * @returns {void}
     */
    private searchOptionChange;
    private navigateSearchResult;
    /**
     * Apply find option based on whole words value.
     *
     * @private
     * @returns {void}
     */
    wholeWordsChange(): void;
    /**
     * Apply find option based on match value.
     *
     * @private
     * @returns {void}
     */
    matchChange(): void;
    /**
     * Binding events from the element when optins pane creation.
     *
     * @private
     * @returns {void}
     */
    onWireEvents(): void;
    /**
     * Fires on key down actions done.
     *
     * @private
     * @returns {void}
     */
    onKeyDownInternal(): void;
    /**
     * Enable Heading pane only.
     *
     * @private
     * @returns {void}
     */
    onHeadingPane(): void;
    /**
     * @private
     * @returns {void}
     */
    refreshHeadingPaneHeight(): void;
    /**
     * Enable find pane only.
     *
     * @private
     * @returns {void}
     */
    onFindPane(): void;
    private getMessageDivHeight;
    /**
     * @returns {void}
     */
    private onEnableDisableReplaceButton;
    /**
     * Enable replace pane only.
     *
     * @private
     * @returns {void}
     */
    onReplacePane(): void;
    /**
     * Fires on key down on options pane.
     *
     * @private
     * @param {KeyboardEvent} event - Specifies the focus of current element.
     * @returns {void}
     */
    onKeyDownOnOptionPane: (event: KeyboardEvent) => void;
    /**
     * Fires on replace.
     *
     * @private
     * @returns {void}
     */
    onReplaceButtonClick: () => void;
    /**
     * Fires on replace all.
     *
     * @private
     * @returns {void}
     */
    onReplaceAllButtonClick: () => void;
    /**
     * Replace all.
     *
     * @private
     * @returns {void}
     */
    replaceAll(): void;
    private hideMatchDiv;
    /**
     * Fires on search icon.
     *
     * @private
     * @returns {void}
     */
    searchIconClickInternal: () => void;
    /**
     * Fires on getting next results.
     *
     * @private
     * @returns {void}
     */
    navigateNextResultButtonClick: () => void;
    private updateListItems;
    /**
     * Fires on getting previous results.
     *
     * @private
     * @returns {void}
     */
    navigatePreviousResultButtonClick: () => void;
    /**
     * Scrolls to position.
     *
     * @private
     * @param {HTMLElement} list - Specifies the list element.
     * @returns {void}
     */
    scrollToPosition(list: HTMLElement): void;
    /**
     * Fires on key down
     *
     * @private
     * @param {KeyboardEvent} event - Speficies key down actions.
     * @returns {void}
     */
    onKeyDown: (event: KeyboardEvent) => void;
    /**
     * Clear the focus elements.
     *
     * @private
     * @returns {void}
     */
    clearFocusElement(): void;
    /**
     * Close the optios pane.
     *
     * @private
     * @returns {void}
     */
    close: () => void;
    /**
     * Fires on results list block.
     *
     * @private
     * @param {MouseEvent} args - Specifies which list was clicked.
     * @returns {void}
     */
    resultListBlockClick: (args: MouseEvent) => void;
    /**
     * Show or hide option pane based on boolean value.
     *
     * @private
     * @param {boolean} show - Specifies showing or hiding the options pane.
     * @returns {void}
     */
    showHideOptionsPane(show: boolean): void;
    /**
     * Clears search results.
     *
     * @private
     * @returns {void}
     */
    clearSearchResultItems(): void;
    /**
     * Dispose the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * Dispose the internal objects which are maintained.
     *
     * @returns {void}
     */
    private destroyInternal;
}
