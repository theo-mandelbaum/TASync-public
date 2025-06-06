import { Spreadsheet } from '../base/index';
import { IRowRenderer } from '../common/index';
/**
 * RowRenderer module is used for creating row element
 *
 * @hidden
 */
export declare class RowRenderer implements IRowRenderer {
    private parent;
    private element;
    private cellRenderer;
    private bottomBorderWidth;
    constructor(parent?: Spreadsheet);
    render(index?: number, isRowHeader?: boolean, preventHiddenCls?: boolean): Element;
    refresh(index: number, pRow: Element, hRow?: Element, header?: boolean, preventHiddenCls?: boolean): Element;
    private initProps;
    /**
     * Clears the internal properties of RowRenderer module.
     *
     * @returns {void}
     */
    destroy(): void;
}
