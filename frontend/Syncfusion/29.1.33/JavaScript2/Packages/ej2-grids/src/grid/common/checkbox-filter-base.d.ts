import { L10n } from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { IFilterArgs, FilterSearchBeginEventArgs } from '../base/interface';
import { PredicateModel } from '../base/grid-model';
import { ValueFormatter } from '../services/value-formatter';
import { Column } from '../models/column';
import { Dialog } from '@syncfusion/ej2-popups';
import { IXLFilter } from '../common/filter-interface';
/**
 * @hidden
 * `CheckBoxFilterBase` module is used to handle filtering action.
 */
export declare class CheckBoxFilterBase {
    protected sBox: HTMLElement;
    private searchInputArgs;
    protected isExcel: boolean;
    protected id: string;
    protected colType: string;
    protected fullData: Object[];
    protected filteredData: Object[];
    protected isFiltered: boolean | number;
    protected dlg: Element;
    protected dialogObj: Dialog;
    protected cBox: HTMLElement;
    protected spinner: HTMLElement;
    protected searchBox: Element;
    protected sInput: HTMLInputElement;
    protected sIcon: Element;
    protected isExecuteLocal: boolean;
    private queryFilteredColumn;
    /** @hidden */
    options: IFilterArgs;
    protected customQuery: boolean;
    protected existingPredicate: {
        [key: string]: PredicateModel[];
    };
    protected foreignKeyData: Object[];
    protected foreignKeyQuery: Query;
    /** @hidden */
    filterState: boolean;
    protected values: Object;
    private cBoxTrue;
    private cBoxFalse;
    private itemsCnt;
    private result;
    protected renderEmpty: boolean;
    protected parent: IXLFilter;
    protected localeObj: L10n;
    protected valueFormatter: ValueFormatter;
    private searchHandler;
    private isMenuNotEqual;
    private isBlanks;
    private isCheckboxFilterTemplate;
    private infiniteRenderMod;
    private infiniteInitialLoad;
    private infiniteSearchValChange;
    private infinitePermenantLocalData;
    private infiniteQuery;
    private infiniteQueryExecutionPending;
    private infiniteSkipCnt;
    private infiniteScrollAppendDiff;
    private prevInfiniteScrollDirection;
    private infiniteLoadedElem;
    private infiniteDataCount;
    private infiniteSearchPred;
    private infiniteLocalSelectAll;
    private localInfiniteSelectAllClicked;
    private localInfiniteSelectionInteracted;
    private infiniteManualSelectMaintainPred;
    private infiniteUnloadParentExistPred;
    /**
     * Constructor for checkbox filtering module
     *
     * @param {IXLFilter} parent - specifies the IXLFilter
     * @hidden
     */
    constructor(parent?: IXLFilter);
    /**
     * @returns {void}
     * @hidden
     */
    destroy(): void;
    private wireEvents;
    private unWireEvents;
    protected foreignKeyFilter(args: Object, fColl?: Object[], mPredicate?: Predicate): void;
    private searchBoxClick;
    private searchBoxKeyUp;
    private updateSearchIcon;
    /**
     * Gets the localized label by locale keyword.
     *
     * @param {string} key - Defines localization key
     * @returns {string} - returns localization label
     */
    getLocalizedLabel(key: string): string;
    private updateDataSource;
    protected updateModel(options: IFilterArgs): void;
    protected getAndSetChkElem(options: IFilterArgs): HTMLElement;
    protected showDialog(options: IFilterArgs): void;
    private renderResponsiveFilter;
    private dialogCreated;
    openDialog(options: IFilterArgs): void;
    closeDialog(): void;
    /**
     * @param {Column} col - Defines column details
     * @returns {void}
     * @hidden
     */
    clearFilter(col?: Column): void;
    private btnClick;
    /**
     * @returns {void}
     * @hidden
     */
    fltrBtnHandler(): void;
    private complexQueryPredicate;
    private infiniteFltrBtnHandler;
    private notifyFilterPrevEvent;
    /** @hidden */
    static generateNullValuePredicates(defaults: {
        predicate?: string;
        field?: string;
        type?: string;
        uid?: string;
        operator?: string;
        matchCase?: boolean;
        ignoreAccent?: boolean;
    }): PredicateModel[];
    /** @hidden */
    initiateFilter(fColl: PredicateModel[]): void;
    protected isForeignColumn(col: Column): boolean;
    private refreshCheckboxes;
    protected search(args: FilterSearchBeginEventArgs, query: Query): void;
    private getPredicateFromCols;
    protected getQuery(): Query;
    private getAllData;
    private addDistinct;
    private getPredicateFields;
    private filterEvent;
    private addInfiniteScrollEvent;
    private infiniteScrollMouseKeyDownHandler;
    private infiniteScrollMouseKeyUpHandler;
    private getShimmerTemplate;
    /**
     * @returns {void}
     * @hidden
     */
    showMask(): void;
    private removeMask;
    private infiniteScrollHandler;
    private makeInfiniteScrollRequest;
    private processDataOperation;
    private executeQueryOperations;
    private dataSuccess;
    private queryGenerate;
    private processDataSource;
    private processSearch;
    private updateResult;
    private clickHandler;
    private updateInfiniteManualSelectPred;
    /**
     * Method to set the next target element on keyboard navigation using arrow keys.
     *
     * @param {KeyboardEventArgs} e - Defines the Keyboard event argument
     * @param {HTMLElement[]} focusableElements - Defines the Focusable elements
     * @returns {void}
     */
    private focusNextOrPrev;
    private keyupHandler;
    private setFocus;
    private updateAllCBoxes;
    private dialogOpen;
    private createCheckbox;
    private updateIndeterminatenBtn;
    private createFilterItems;
    private updateInfiniteUnLoadedCheckboxExistPred;
    private getCheckedState;
    static getDistinct(json: Object[], field: string, column?: Column, foreignKeyData?: Object[], checkboxFilter?: CheckBoxFilterBase): Object;
    static getPredicate(columns: PredicateModel[], isExecuteLocal?: boolean): Predicate;
    private static generatePredicate;
    private static getCaseValue;
    private static updateDateFilter;
}
