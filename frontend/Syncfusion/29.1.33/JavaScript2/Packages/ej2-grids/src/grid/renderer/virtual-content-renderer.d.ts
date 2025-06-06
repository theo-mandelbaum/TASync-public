import { IGrid, IRenderer, NotifyArgs, VirtualInfo, IModelGenerator } from '../base/interface';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { ContentRender } from './content-renderer';
import { HeaderRender } from './header-renderer';
import { ServiceLocator } from '../services/service-locator';
import { InterSectionObserver } from '../services/intersection-observer';
import { VirtualRowModelGenerator } from '../services/virtual-row-model-generator';
/**
 * VirtualContentRenderer
 *
 * @hidden
 */
export declare class VirtualContentRenderer extends ContentRender implements IRenderer {
    private count;
    private maxPage;
    private maxBlock;
    private widthServices;
    private prevHeight;
    /** @hidden */
    observer: InterSectionObserver;
    /**
     * @hidden
     */
    vgenerator: VirtualRowModelGenerator;
    /** @hidden */
    header: VirtualHeaderRenderer;
    /** @hidden */
    startIndex: number;
    private preStartIndex;
    private preEndIndex;
    /** @hidden */
    startColIndex: number;
    /** @hidden */
    endColIndex: number;
    private locator;
    private preventEvent;
    private actions;
    /** @hidden */
    content: HTMLElement;
    /** @hidden */
    offsets: {
        [x: number]: number;
    };
    private tmpOffsets;
    /** @hidden */
    virtualEle: VirtualElementHandler;
    private offsetKeys;
    private isFocused;
    private isSelection;
    private selectedRowIndex;
    private isBottom;
    private isBottomNotify;
    private diff;
    private heightChange;
    /** @hidden */
    isTop: boolean;
    /** @hidden */
    activeKey: string;
    /** @hidden */
    rowIndex: number;
    /** @hidden */
    blzRowIndex: number;
    /** @hidden */
    blazorDataLoad: boolean;
    private cellIndex;
    private empty;
    private isAdd;
    private isCancel;
    /** @hidden */
    requestType: string;
    private editedRowIndex;
    private requestTypes;
    private isNormaledit;
    /** @hidden */
    virtualData: Object;
    private virtualInfiniteData;
    private emptyRowData;
    private initialRowTop;
    private isContextMenuOpen;
    private selectRowIndex;
    private isSelectionScroll;
    private validationCheck;
    private validationCol;
    /** @hidden */
    firstCellFocus: boolean;
    private prevPage;
    private prevCurrentInfo;
    constructor(parent: IGrid, locator?: ServiceLocator);
    renderTable(): void;
    renderEmpty(tbody: HTMLElement): void;
    getReorderedFrozenRows(args: NotifyArgs): Row<Column>[];
    private scrollListener;
    private block;
    private getInfoFromView;
    ensureBlocks(info: VirtualInfo): number[];
    appendContent(target: HTMLElement, newChild: DocumentFragment | HTMLElement, e: NotifyArgs): void;
    private validationScrollLeft;
    private ensureSelectedRowPosition;
    private focusCell;
    private restoreEdit;
    private getVirtualEditedData;
    private restoreAdd;
    protected onDataReady(e?: NotifyArgs): void;
    /**
     * @param {number} height - specifies the height
     * @returns {void}
     * @hidden
     */
    setVirtualHeight(height?: number): void;
    /**
     * @param {number} sTop - specifies the sTop
     * @param {VirtualInfo} info - specifies the info
     * @returns {number} - return the page
     * @hidden
     */
    getPageFromTop(sTop: number, info: VirtualInfo): number;
    protected getTranslateY(sTop: number, cHeight: number, info?: VirtualInfo, isOnenter?: boolean): number;
    getOffset(block: number): number;
    private onEntered;
    private dataBound;
    /**
     * To calculate the position of frozen cells
     *
     * @param {number} valueX - specifies the transform X value
     * @param {DocumentFragment | HTMLElement} newChild - specifies the element to transform
     * @returns {void}
     * @hidden
     */
    resetStickyLeftPos(valueX?: number, newChild?: DocumentFragment | HTMLElement): void;
    private rowSelected;
    private isLastBlockRow;
    private refreshMaxPage;
    private setVirtualPageQuery;
    eventListener(action: string): void;
    private refreshVirtualLazyLoadCache;
    private scrollToEdit;
    private refreshCells;
    private resetVirtualFocus;
    /**
     * @param {Object} data - specifies the data
     * @param {Object} data.virtualData -specifies the data
     * @param {boolean} data.isAdd - specifies isAdd
     * @param {boolean} data.isCancel - specifies boolean in cancel
     * @param {boolean} data.isScroll - specifies boolean for scroll
     * @returns {void}
     * @hidden
     */
    getVirtualData(data: {
        virtualData: Object;
        isAdd: boolean;
        isCancel: boolean;
        isScroll: boolean;
    }): void;
    private selectRowOnContextOpen;
    private editCancel;
    private editSuccess;
    private updateCurrentViewData;
    private actionBegin;
    private virtualCellFocus;
    private editActionBegin;
    private getEditedRowObject;
    private refreshCache;
    private actionComplete;
    private resetIsedit;
    private scrollAfterEdit;
    private createEmptyRowdata;
    private addActionBegin;
    /**
     * @param {number} index - specifies the index
     * @returns {Object} returns the object
     * @hidden
     */
    getRowObjectByIndex(index: number): Object;
    getBlockSize(): number;
    getBlockHeight(): number;
    isEndBlock(index: number): boolean;
    isOddPageSize(): boolean;
    getOddBlockSize(): number;
    getGroupedTotalBlocks(): number;
    getTotalBlocks(): number;
    getColumnOffset(block: number): number;
    getModelGenerator(): IModelGenerator<Column>;
    private resetScrollPosition;
    private onActionBegin;
    getRows(): Row<Column>[];
    getRowByIndex(index: number): Element;
    getMovableVirtualRowByIndex(index: number): Element;
    getFrozenRightVirtualRowByIndex(index: number): Element;
    getRowCollection(index: number, isRowObject?: boolean): Element | Object;
    getVirtualRowIndex(index: number): number;
    /**
     * @returns {void}
     * @hidden */
    refreshOffsets(): void;
    refreshVirtualElement(): void;
    setVisible(columns?: Column[]): void;
    private selectVirtualRow;
    private isRowInView;
}
/**
 * @hidden
 */
export declare class VirtualHeaderRenderer extends HeaderRender implements IRenderer {
    virtualEle: VirtualElementHandler;
    /** @hidden */
    gen: VirtualRowModelGenerator;
    movableTbl: Element;
    private isMovable;
    constructor(parent: IGrid, locator: ServiceLocator);
    renderTable(): void;
    appendContent(table: Element): void;
    refreshUI(): void;
    setVisible(columns?: Column[]): void;
    private setDisplayNone;
}
/**
 * @hidden
 */
export declare class VirtualElementHandler {
    wrapper: HTMLElement;
    placeholder: HTMLElement;
    content: HTMLElement;
    table: HTMLElement;
    renderWrapper(height?: number): void;
    renderPlaceHolder(position?: string): void;
    renderFrozenWrapper(height?: number): void;
    renderFrozenPlaceHolder(): void;
    adjustTable(xValue: number, yValue: number): void;
    setWrapperWidth(width: string, full?: boolean): void;
    setVirtualHeight(height?: number, width?: string): void;
    setFreezeWrapperWidth(wrapper: HTMLElement, width: string, full?: boolean): void;
}
