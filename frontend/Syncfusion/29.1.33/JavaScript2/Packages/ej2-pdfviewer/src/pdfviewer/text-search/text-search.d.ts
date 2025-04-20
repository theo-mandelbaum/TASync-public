import { PdfViewer, PdfViewerBase, IPdfRectBounds } from '../index';
import { DocumentTextCollectionSettingsModel, SearchResultModel } from '../pdfviewer-model';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
/**
 * TextSearch module
 *
 * @param {Event} event - event
 * @returns {void}
 */
export declare class TextSearch {
    /**
     * @private
     */
    isTextSearch: boolean;
    /**
     * @private
     */
    searchBtn: HTMLElement;
    /**
     * @private
     */
    searchInput: HTMLElement;
    /**
     * @private
     */
    searchCountEle: HTMLElement;
    /**
     * @private
     */
    searchInputContainer: HTMLElement;
    /**
     * @private
     */
    searchCount: number;
    /**
     * @private
     */
    currentOccurrence: number;
    private pdfViewer;
    private pdfViewerBase;
    private searchBox;
    private nextSearchBtn;
    private prevSearchBtn;
    private searchIndex;
    private currentSearchIndex;
    private startIndex;
    /**
     * @private
     */
    searchPageIndex: number;
    private startSearchPageIndex;
    private searchString;
    private isMatchCase;
    private isMultiSearch;
    private isSingleSearch;
    private findTextDocumentCollection;
    private searchAutocompleteObj;
    private searchRequestHandler;
    private textSearchHandleRequest;
    /**
     * @private
     */
    isTextSearchHandled: boolean;
    private textSearchOpen;
    /**
     * @private
     */
    programaticalSearch: boolean;
    /**
     * @private
     */
    isFiltering: boolean;
    private textContents;
    /**
     * @private
     */
    searchMatches: Array<any[]>;
    private multiSearchCounts;
    private getSearchTextDetails;
    private searchedPages;
    private isPrevSearch;
    private isExactMatch;
    private autompleteDataSource;
    private matchAnyWordCheckBox;
    private searchedOccurrences;
    private isSelectedFromPopup;
    /**
     * @private
     */
    isDocumentTextCollectionReady: boolean;
    private intervalId;
    /**
     * @private
     */
    searchTextDivzIndex: string;
    private tempElementStorage;
    /**
     * @private
     */
    isMessagePopupOpened: boolean;
    /**
     * @private
     */
    documentTextCollection: DocumentTextCollectionSettingsModel[][];
    /**
     * @private
     */
    isTextRetrieved: boolean;
    private isTextSearched;
    private isTextSearchEventTriggered;
    private isSearchText;
    private isLastOccurrenceCompleted;
    private isInitialSearch;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdf viewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     * @returns {void}
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    createTextSearchBox(): void;
    private setLoaderProperties;
    private showLoadingIndicator;
    private textSearchWhileLoading;
    /**
     * @param {any} resultPages - Result of the text search word
     * @param {number} totalSearchCount - Search count of the word
     * @param {string} searchWord - Word that given for the text search
     * @param {boolean} matchCase - It gives about the match case
     * @param {boolean} isFirstResult - It gives first result from the request
     * @param {boolean} isCompleted - It gives the search complete indication
     * @param {number} endIndex - It describes end pageindex of the result
     * @private
     * @returns {void}
     */
    searchTextAfteresult(resultPages: any, totalSearchCount: any, searchWord: string, matchCase: boolean, isFirstResult?: boolean, isCompleted?: boolean, endIndex?: number): void;
    private updateLoadingIndicator;
    /**
     * @param {number} pageNumber - It decribes the search pageIndex value
     * @param {boolean} isPageChange - It describes the first result highlight
     * @param {boolean} isSearchCompleted - It describes the text search has been completed or not.
     * @private
     * @returns {void}
     */
    hightlightSearchedTexts(pageNumber?: number, isPageChange?: boolean, isSearchCompleted?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    textSearchBoxOnResize(): void;
    /**
     * @param {boolean} isShow - It describes about the isShow
     * @private
     * @returns {void}
     */
    showSearchBox(isShow: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    searchAfterSelection(): void;
    private calculateSearchCount;
    private getSearchCountText;
    private adjustInputContainerWidth;
    private initiateTextSearch;
    private handleSearchAfterTextCollectionReady;
    /**
     * @param {string} inputString - It describes about the input string
     * @param {boolean} isMobileSearch - Indicates is mobile search or not
     * @private
     * @returns {void}
     */
    initiateSearch(inputString: string, isMobileSearch?: boolean): void;
    private textSearch;
    private nextSearch;
    private findNextPageWithText;
    private findFirstNonEmptyPage;
    private prevSearch;
    private scrollToSearch;
    private isScrollPages;
    private findPreviousPageWithText;
    private initSearch;
    private getPossibleMatches;
    private correctLinetext;
    private getSearchTextContent;
    private getSearchPage;
    private areAllNonEmptyPagesSearched;
    private areAllOccurencesSearched;
    private highlightSearchedTexts;
    private addDivForSearch;
    private addDivElement;
    private createSearchTextDiv;
    private calculateBounds;
    private isClassAvailable;
    private getScrollElement;
    private scrollToSearchStr;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    resizeSearchElements(pageIndex: number): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    highlightOtherOccurrences(pageNumber: number): void;
    private highlightOthers;
    /**
     * @private
     * @returns {void}
     */
    clearAllOccurrences(): void;
    /**
     * @private
     * @returns {any} - any
     */
    getIndexes(): any;
    private applyTextSelection;
    /**
     * @private
     * @param {boolean} [cleardocumentCollection=false] - If true, clears the document text collection.
     * @returns {void}
     */
    resetTextSearch(cleardocumentCollection?: boolean): void;
    private onTextSearchClose;
    private createRequestForSearch;
    private searchRequestOnSuccess;
    /**
     * @private
     * @returns {void}
     */
    getPDFDocumentTexts(): void;
    /**
     * @param {number} startIndex - It describes about the start index
     * @param {number} endIndex - It describes about the end index
     * @private
     * @returns {void}
     */
    createRequestForGetPdfTexts(startIndex: number, endIndex: number): void;
    /**
     * @private
     * @param {any} data - It gets the data
     * @param {number} startIndex - It gets the starting index
     * @param {number} endIndex - It gets the ending index
     * @returns {void}
     */
    pdfTextSearchRequestSuccess(data: any, startIndex: number, endIndex: number): void;
    private pdfTextSearchRequestOnSuccess;
    private updateDocumentCollection;
    private orderPdfTextCollections;
    private createSearchBoxButtons;
    private enablePrevButton;
    private enableNextButton;
    private checkBoxOnChange;
    /**
     * @private
     * @returns {void}
     */
    resetVariables(): void;
    resetVariablesTextSearch(): void;
    private searchKeypressHandler;
    private searchClickHandler;
    /**
     * @param {HTMLElement} element - It describes about the element
     * @param {HTMLElement} inputElement - It describes about the input element
     * @param {boolean} isMobileSearch - It indicates is mobile search or not
     * @private
     * @returns {void}
     */
    searchButtonClick(element: HTMLElement, inputElement: AutoComplete | HTMLElement, isMobileSearch?: boolean): void;
    private updateSearchInputIcon;
    private nextButtonOnClick;
    private prevButtonOnClick;
    private onMessageBoxOpen;
    /**
     * @private
     * @returns {void}
     */
    highlightAfterComplete(): void;
    /**
     * Searches the target text in the PDF document and highlights the occurrences in the pages
     *
     * @param  {string} searchText - Specifies the searchText content
     * @param  {boolean} isMatchCase - If set true , its highlights the MatchCase content
     * @returns {void}
     */
    searchText(searchText: string, isMatchCase: boolean): void;
    /**
     * Searches the next occurrence of the searched text from the current occurrence of the PdfViewer.
     *
     * @returns {void}
     */
    searchNext(): void;
    /**
     * Searches the previous occurrence of the searched text from the current occurrence of the PdfViewer.
     *
     * @returns {void}
     */
    searchPrevious(): void;
    /**
     * Cancels the text search of the PdfViewer.
     *
     * @returns {void}
     */
    cancelTextSearch(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * Searches for the specified text within the document and returns the bounding rectangles of the matched text. The search can be case-sensitive based on the provided parameters. If a specific page index is provided, it returns the bounding rectangles for that page; otherwise, it returns the bounding rectangles for all pages in the document where the text was found.
     *
     * @param {string} searchText - The text string to search for.
     * @param {boolean} isMatchCase - If true, performs a case-sensitive search; otherwise, performs a case-insensitive search.
     * @param {number} [pageIndex] - Optional page index to limit the search to a specific page.
     * @returns {SearchResultModel[]} - An array of `SearchResult` objects, where each object contains the page index and an array of bounds representing the locations of the search text found on that page.
     */
    findText(searchText: string, isMatchCase: boolean, pageIndex?: number): SearchResultModel[];
    /**
     * Searches for an array of strings within the document and returns the bounding rectangles for each occurrence. The search can be case-sensitive based on the provided parameters. If a specific page index is provided, it returns the bounding rectangles for these search strings on that page; otherwise, it returns the bounding rectangles for all pages in the document where the strings were found.
     *
     * @param {string[]} searchText - An array of text strings to search for.
     * @param {boolean} isMatchCase - If true, performs a case-sensitive search; otherwise, performs a case-insensitive search.
     * @param {number} [pageIndex] - Optional page index to limit the search to a specific page.
     * @returns {Record<string, SearchResultModel[]>} - An object where each key is a search text string, and each value is an array of `SearchResult` objects. Each `SearchResult` object contains the page index and an array of bounds representing the locations of that search text on the corresponding page.
     */
    findText(searchText: string[], isMatchCase: boolean, pageIndex?: number): Record<string, SearchResultModel[]>;
    /**
     * Searches for the specified text within the document and returns the bounding rectangles of the matched text. The search can be case-sensitive based on the provided parameters. If a specific page index is provided, it returns the bounding rectangles for that page; otherwise, it returns the bounding rectangles for all pages in the document where the text was found.
     *
     * @param {string} searchText - The text string to search for.
     * @param {boolean} isMatchCase - If true, performs a case-sensitive search; otherwise, performs a case-insensitive search.
     * @param {number} [pageIndex] - Optional page index to limit the search to a specific page.
     * @returns {Promise<SearchResultModel[]>} -  A Promise that resolves to an array of `SearchResult` objects. Each object contains the page index and an array of bounds representing the locations of the search text found on that page.
     */
    findTextAsync(searchText: string, isMatchCase: boolean, pageIndex?: number): Promise<SearchResultModel[]>;
    /**
     * Searches for an array of strings within the document and returns the bounding rectangles for each occurrence. The search can be case-sensitive based on the provided parameters. If a specific page index is provided, it returns the bounding rectangles for these search strings on that page; otherwise, it returns the bounding rectangles for all pages in the document where the strings were found.
     *
     * @param {string[]} searchText - An array of text strings to search for.
     * @param {boolean} isMatchCase - If true, performs a case-sensitive search; otherwise, performs a case-insensitive search.
     * @param {number} [pageIndex] - Optional page index to limit the search to a specific page.
     * @returns {Promise<Record<string, SearchResultModel[]>>} -  A Promise that resolves to an object where each key is a search text string, and each value is an array of `SearchResult` objects. Each `SearchResult` object contains the page index and an array of bounds representing the locations of that search text on the corresponding page.
     */
    findTextAsync(searchText: string[], isMatchCase: boolean, pageIndex?: number): Promise<Record<string, SearchResultModel[]>>;
    private getSearchResults;
    /**
     * Calculates the bounding rectangle for a given search text within the PDF based on character bounds.
     *
     * @param {string} searchText - The text string for which to calculate the bounding rectangle.
     * @param {any} matchIndex - The starting index of the match within the character bounds array.
     * @param {any} characterBounds - An array containing the bounds of each character on the page.
     * @private
     * @returns {IPdfRectBounds} - The calculated bounding rectangle, specifying the position and dimensions
     *                             (x, y, width, height) of the highlighted text area on the PDF page.
     */
    calculateTextBounds(searchText: string, matchIndex: any, characterBounds: any): IPdfRectBounds;
    /**
     * @private
     * @returns {void}
     */
    getModuleName(): string;
}
