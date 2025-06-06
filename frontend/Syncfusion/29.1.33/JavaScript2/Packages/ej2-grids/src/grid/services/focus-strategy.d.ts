import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { IGrid, IFocus, FocusInfo, FocusedContainer, IIndex, CellFocusArgs, SwapInfo, VirtualSelectionInfo } from '../base/interface';
import { FocusType } from '../base/enum';
import { Row } from '../models/row';
import { Cell } from '../models/cell';
import { Column } from '../models/column';
import { NotifyArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * FocusStrategy class
 *
 * @hidden
 */
export declare class FocusStrategy {
    parent: IGrid;
    currentInfo: FocusInfo;
    oneTime: boolean;
    swap: SwapInfo;
    content: IFocus;
    header: IFocus;
    active: IFocus;
    /** @hidden */
    isInfiniteScroll: boolean;
    /** @hidden */
    virtualSelectionInfo: VirtualSelectionInfo;
    private forget;
    private skipFocus;
    private focusByClick;
    private firstHeaderCellClick;
    private passiveHandler;
    /** @hidden */
    prevIndexes: IIndex;
    private focusedColumnUid;
    private refMatrix;
    private rowModelGen;
    private activeKey;
    private empty;
    private actions;
    private isVirtualScroll;
    private evtHandlers;
    private groupedFrozenRow;
    constructor(parent: IGrid);
    protected focusCheck(e: Event): void;
    protected onFocus(e?: FocusEvent): void;
    protected passiveFocus(e: FocusEvent): void;
    protected onBlur(e?: FocusEvent): void;
    /**
     * @returns {void}
     * @hidden */
    setFirstFocusableTabIndex(): void;
    private setLastContentCellTabIndex;
    onClick(e: Event | {
        target: Element;
        type?: string;
    }, force?: boolean, isFocusFirstCell?: boolean): void;
    private handleFilterNavigation;
    protected onKeyPress(e: KeyboardEventArgs): void;
    private isValidBatchEditCell;
    private findBatchEditCell;
    private setLastContentCellActive;
    private focusOutFromChildGrid;
    private focusOutFromHeader;
    private allowToPaging;
    private skipOn;
    private focusVirtualElement;
    getFocusedElement(): HTMLElement;
    getContent(): IFocus;
    setActive(content: boolean): void;
    setFocusedElement(element: HTMLElement, e?: KeyboardEventArgs): void;
    focus(e?: KeyboardEventArgs | FocusEvent): void;
    protected removeFocus(e?: FocusEvent): void;
    /**
     * @returns {void}
     * @hidden */
    addOutline(): void;
    /**
     * @returns {void}
     * @hidden */
    focusHeader(): void;
    /**
     * @returns {void}
     * @hidden */
    focusContent(): void;
    private resetFocus;
    protected addFocus(info: FocusInfo, e?: KeyboardEventArgs | FocusEvent): void;
    protected refreshMatrix(content?: boolean): Function;
    private refreshAddNewRowMatrix;
    addEventListener(): void;
    private showAddNewRowFocus;
    findNextCellFocus(matrix?: number[], cellIndex?: number): number;
    filterfocus(): void;
    removeEventListener(): void;
    destroy(): void;
    restoreFocus(arg?: NotifyArgs): void;
    restoreFocusWithAction(e: NotifyArgs): void;
    clearIndicator(): void;
    getPrevIndexes(): IIndex;
    forgetPrevious(): void;
    setActiveByKey(action: string, active: IFocus): void;
    internalCellFocus(e: CellFocusArgs): void;
    private commandColumnFocusElement;
}
/**
 * Create matrix from row collection which act as mental model for cell navigation
 *
 * @hidden
 */
export declare class Matrix {
    matrix: number[][];
    current: number[];
    columns: number;
    rows: number;
    set(rowIndex: number, columnIndex: number, allow?: boolean): void;
    get(rowIndex: number, columnIndex: number, navigator: number[], action?: string, validator?: Function, active?: IFocus): number[];
    getRowsFromIndex(rowIndex: number, active: IFocus): HTMLTableRowElement | HTMLCollectionOf<HTMLTableRowElement>;
    nextVisibleCellFocus(rowIndex: number, columnIndex: number, action: string, navigator: number[], active: IFocus, tmp: number): number[];
    first(vector: number[], index: number, navigator: number[], moveTo?: boolean, action?: string): number;
    select(rowIndex: number, columnIndex: number): void;
    generate(rows: Row<Column>[], selector: Function, isRowTemplate?: boolean): number[][];
    columnsCount(rowColumns: Column[], currentColumnCount: number): number;
    inValid(value: number): boolean;
}
/**
 * @hidden
 */
export declare class ContentFocus implements IFocus {
    matrix: Matrix;
    parent: IGrid;
    keyActions: {
        [x: string]: number[];
    };
    lastIdxCell: boolean;
    target: HTMLElement;
    indexesByKey: (action: string) => number[];
    focusType: FocusType;
    currentTarget: HTMLElement;
    action: string;
    constructor(parent: IGrid);
    getTable(): HTMLTableElement;
    onKeyPress(e: KeyboardEventArgs): void | boolean;
    private editNextRow;
    getCurrentFromAction(action: string, navigator?: number[], isPresent?: boolean, e?: KeyboardEventArgs): number[];
    onClick(e: Event, force?: boolean): void | boolean;
    getFocusInfo(): FocusInfo;
    getFocusable(element: HTMLElement): HTMLElement;
    selector(row: Row<Column>, cell: Cell<Column>, isRowTemplate?: boolean): boolean;
    nextRowFocusValidate(index: number): number;
    previousRowFocusValidate(index: number): number;
    jump(action: string, current: number[]): SwapInfo;
    getNextCurrent(previous?: number[], swap?: SwapInfo, active?: IFocus, action?: string): number[];
    generateRows(rows?: Row<Column>[], optionals?: Object): void;
    getInfo(e?: KeyboardEventArgs): FocusedContainer;
    validator(): Function;
    protected shouldFocusChange(e: KeyboardEventArgs): boolean;
    protected getGridSeletion(): boolean;
}
/**
 * @hidden
 */
export declare class HeaderFocus extends ContentFocus implements IFocus {
    constructor(parent: IGrid);
    getTable(): HTMLTableElement;
    onClick(e: Event): void | boolean;
    getFocusInfo(): FocusInfo;
    selector(row: Row<Column>, cell: Cell<Column>): boolean;
    jump(action: string, current: number[]): SwapInfo;
    getNextCurrent(previous?: number[], swap?: SwapInfo, active?: IFocus, action?: string): number[];
    generateRows(rows?: Row<Column>[]): void;
    private checkFilterColumn;
    getInfo(e?: KeyboardEventArgs): FocusedContainer;
    validator(): Function;
    protected shouldFocusChange(e: KeyboardEventArgs): boolean;
    getHeaderType(): string;
}
/** @hidden */
export declare class SearchBox {
    searchBox: HTMLElement;
    private l10n;
    protected serviceLocator: ServiceLocator;
    constructor(searchBox: HTMLElement, serviceLocator?: ServiceLocator);
    searchFocus(args: {
        target: HTMLInputElement;
    }): void;
    protected searchBlur(args: Event & FocusEvent): void;
    wireEvent(): void;
    unWireEvent(): void;
}
