import { StyleType, CollaborativeEditArgs, IAriaOptions } from './index';
import { Spreadsheet } from '../index';
import { SheetModel, CellStyleModel } from '../../workbook/index';
import { Workbook, ChartModel } from '../../workbook/index';
import { ActionEventArgs } from '../../workbook/index';
/**
 * The function used to update Dom using requestAnimationFrame.
 *
 * @param  {Function} fn - Function that contains the actual action
 * @returns {void}
 * @hidden
 */
export declare function getUpdateUsingRaf(fn: Function): void;
/**
 * The function used to remove the dom element children.
 *
 * @param  {Element} parent - Specify the parent
 * @returns {void} - The function used to get colgroup width based on the row index.
 * @hidden
 */
export declare function removeAllChildren(parent: Element): void;
/**
 * The function used to get colgroup width based on the row index.
 *
 * @param  {number} index - Specify the index
 * @returns {number} - The function used to get colgroup width based on the row index.
 * @hidden
 */
export declare function getColGroupWidth(index: number): number;
/**
 * @hidden
 * @returns {number} - To get scrollbar width
 */
export declare function getScrollBarWidth(): number;
/**
 * @hidden
 * @param {HTMLElement} element - Specify the element.
 * @param {string[]} classList - Specify the classList
 * @param {number} scaleY - Specify the scaleY value.
 * @returns {number} - get Siblings Height
 */
export declare function getSiblingsHeight(element: HTMLElement, classList?: string[], scaleY?: number): number;
/**
 * @hidden
 * @param {Spreadsheet} context - Specify the spreadsheet.
 * @param {number[]} range - Specify the range.
 * @param {boolean} isModify - Specify the boolean value.
 * @returns {boolean} - Returns boolean value.
 */
export declare function inView(context: Spreadsheet, range: number[], isModify?: boolean): boolean;
/**
 * To get the top left cell position in viewport.
 *
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {number[]} indexes - Specify the indexes.
 * @param {number} frozenRow - Specify the frozen row.
 * @param {number} frozenColumn - Specify the frozen column
 * @param {number} freezeScrollHeight - Specify the freeze scroll height
 * @param {number} freezeScrollWidth - Specify the freeze scroll width
 * @param {number} rowHdrWidth - Specify the row header width
 * @param {boolean} isOverlay - Specify the overlay.
 * @returns {number} - To get the top left cell position in viewport.
 */
export declare function getCellPosition(sheet: SheetModel, indexes: number[], frozenRow?: number, frozenColumn?: number, freezeScrollHeight?: number, freezeScrollWidth?: number, rowHdrWidth?: number, isOverlay?: boolean): {
    top: number;
    left: number;
};
/**
 * @param {Spreadsheet} parent - Specify the parent
 * @param {HTMLElement} ele - Specify the element
 * @param {number[]} range - Specify the range
 * @param {string} cls - Specify the class name
 * @param {boolean} preventAnimation - Specify the preventAnimation.
 * @param {boolean} isMultiRange - Specify the multi range selection.
 * @param {boolean} removeCls - Specify to remove the class from selection.
 * @returns {void} - To set the position
 * @hidden
 */
export declare function setPosition(parent: Spreadsheet, ele: HTMLElement, range: number[], cls?: string, preventAnimation?: boolean, isMultiRange?: boolean, removeCls?: boolean): Promise<null> | void;
/**
 * @param {Element} content - Specify the content element.
 * @param {HTMLElement} checkEle - Specify the element.
 * @param {string} cls - Specify the class name.
 * @param {string} isSelection - Specify the selection element.
 * @param {string} removeCls - Specify to remove class from element.
 * @returns {void} - remove element with given range
 */
export declare function removeRangeEle(content: Element, checkEle: HTMLElement, cls: string, isSelection?: boolean, removeCls?: boolean): void;
/**
 * Position element with given range
 *
 * @hidden
 * @param {Spreadsheet} parent - Specify the parent.
 * @param {HTMLElement} ele - Specify the element.
 * @param {number[]} range - specify the range.
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {boolean} isRtl - Specify the boolean value.
 * @param {number} frozenRow - Specidy the frozen row.
 * @param {number} frozenColumn - Specify the frozen column
 * @param {boolean} preventAnimation - Specify the preventAnimation.
 * @param {boolean} isActiveCell - Specidy the boolean value.
 * @param {number} freezeScrollHeight - Specify the freeze scroll height
 * @param {number} freezeScrollWidth - Specify the freeze scroll width
 * @param {number} rowHdrWidth - Specify the row header width
 * @param {number} cls - Specify the class
 * @param {number} isFillOptShow - Specify the fill option
 * @param {number} freezeFillOpt - Specifies the fill option
 * @param {number} freezeFillOpt.top - Specifies the fill option
 * @param {number} freezeFillOpt.left - Specifies the fill option
 * @returns {void} - Position element with given range
 */
export declare function locateElem(parent: Spreadsheet, ele: HTMLElement, range: number[], sheet: SheetModel, isRtl: boolean, frozenRow: number, frozenColumn: number, preventAnimation?: boolean, isActiveCell?: boolean, freezeScrollHeight?: number, freezeScrollWidth?: number, rowHdrWidth?: number, cls?: string, isFillOptShow?: boolean, freezeFillOpt?: {
    top?: number;
    left?: number;
}): Promise<null> | void;
/**
 * To update element styles using request animation frame
 *
 * @hidden
 * @param {StyleType[]} styles - Specify the styles
 * @param {boolean} preventAnimation - Specify the preventAnimation.
 * @returns {void} - To update element styles using request animation frame
 */
export declare function setStyleAttribute(styles: StyleType[], preventAnimation?: boolean): Promise<null>;
/**
 * @hidden
 * @returns {string} - to get Start Event
 */
export declare function getStartEvent(): string;
/**
 * @hidden
 * @returns {string} - to get Move Event
 */
export declare function getMoveEvent(): string;
/**
 * @hidden
 * @returns {string} - Returns string value.
 */
export declare function getEndEvent(): string;
/**
 * @hidden
 * @param {Event} e - To specify the event.
 * @returns {boolean} - Returns boolean value.
 */
export declare function isTouchStart(e: Event): boolean;
/**
 * @hidden
 * @param {Event} e - To specify the event.
 * @returns {boolean} - Returns boolean value.
 */
export declare function isTouchMove(e: Event): boolean;
/**
 * @hidden
 * @param {Event} e - To specify the event.
 * @returns {boolean} - Returns boolean value.
 */
export declare function isTouchEnd(e: Event): boolean;
/**
 * @hidden
 * @param {TouchEvent | MouseEvent} e - To specify the mouse and touch event.
 * @returns {number} - To get client value
 */
export declare function isMouseDown(e: MouseEvent): boolean;
/**
 * @param {MouseEvent} e - Specify the event.
 * @returns {boolean} - To get boolean value.
 * @hidden
 */
export declare function isMouseMove(e: MouseEvent): boolean;
/**
 * @param {MouseEvent} e - Specify the event.
 * @returns {boolean} - To get boolean value
 * @hidden
 */
export declare function isMouseUp(e: MouseEvent): boolean;
/**
 * @param {number} keyCode - Specify  the keycode.
 * @returns {boolean} - to get boolean value.
 * @hidden
 */
export declare function isNavigationKey(keyCode: number): boolean;
/**
 * @param {MouseEvent | TouchEvent} e - To specify the mouse or touch event.
 * @returns {number} - To get client X value.
 * @hidden
 */
export declare function getClientX(e: TouchEvent & MouseEvent): number;
/**
 * @hidden
 * @param {MouseEvent | TouchEvent} e - To specify the mouse and touch event.
 * @returns {number} - To get client value
 */
export declare function getClientY(e: MouseEvent & TouchEvent): number;
/**
 * To get the `pageX` value from the mouse or touch event.
 *
 * @param {MouseEvent | TouchEvent} e - Specifies the mouse or touch event.
 * @returns {number} - Return the `pageX` value.
 * @hidden
 */
export declare function getPageX(e: TouchEvent & MouseEvent): number;
/**
 * To get the `pageY` value from the mouse or touch event.
 *
 * @param {MouseEvent | TouchEvent} e - Specifies the mouse or touch event.
 * @returns {number} - Return the `pageY` value.
 * @hidden
 */
export declare function getPageY(e: MouseEvent & TouchEvent): number;
/**
 * Get even number based on device pixel ratio
 *
 * @param {number} value - Specify the number
 * @param {boolean} preventDecrease - Specify the boolean value
 * @returns {number} - To get DPR value
 * @hidden
 */
export declare function getDPRValue(value: number, preventDecrease?: boolean): number;
/**
 * @hidden
 * @param {HTMLElement} target - specify the target.
 * @param {IAriaOptions<boolean>} options - Specify the options.
 * @returns {void} -  to set Aria Options
 */
export declare function setAriaOptions(target: HTMLElement, options: IAriaOptions<boolean>): void;
/**
 * @hidden
 * @param {HTMLElement} element - specify the element.
 * @param {Object} component - Specify the component.
 * @returns {void} -  to destroy the component.
 */
export declare function destroyComponent(element: HTMLElement, component: Object): void;
/**
 * @hidden
 * @param {number} idx - Specify the index
 * @param {number} index - Specify the index
 * @param {string} value - Specify the value.
 * @param {boolean} isCol - Specify the boolean value.
 * @param {Spreadsheet} parent - Specify the parent.
 * @returns {void} - To set resize.
 */
export declare function setResize(idx: number, index: number, value: string, isCol: boolean, parent: Spreadsheet): void;
/**
 * @hidden
 * @param {HTMLElement} trgt - Specify the target element.
 * @param {number} value - specify the number.
 * @param {boolean} isCol - Specify the boolean vlaue.
 * @returns {void} -  to set width and height.
 */
export declare function setWidthAndHeight(trgt: HTMLElement, value: number, isCol: boolean): void;
/**
 * @hidden
 * @param {number} lineHeight - Specify the line height for other culture text.
 * @returns {void} -  to set the line height for other culture text.
 */
export declare function setTextLineHeight(lineHeight: number): void;
/**
 * @hidden
 * @param {HTMLElement} table - Specify the table.
 * @param {HTMLElement[]} text - specify the text.
 * @param {boolean} isCol - Specifyt boolean value
 * @param {Spreadsheet} parent - Specify the parent.
 * @param {string} prevData - specify the prevData.
 * @param {boolean} isWrap - Specifyt boolean value
 * @returns {number} - To find maximum value.
 */
export declare function findMaxValue(table: HTMLElement, text: HTMLElement[], isCol: boolean, parent: Spreadsheet, prevData?: string, isWrap?: boolean): number;
/**
 * @hidden
 * @param {CollaborativeEditArgs} options - Specify the collaborative edit arguments.
 * @param {Spreadsheet} spreadsheet - specify the spreadsheet.
 * @param {boolean} isRedo - Specifyt the boolean value.
 * @param {CollaborativeEditArgs[]} undoCollections - Specify the undo collections.
 * @param {object} actionEventArgs - Specify the actionEventArgs.
 * @param {ActionEventArgs} actionEventArgs.eventArgs - Specify the eventArgs.
 * @param {boolean} isRecursive - Specify the recursive.
 * @returns {void} - To update the Action.
 */
export declare function updateAction(options: CollaborativeEditArgs, spreadsheet: Spreadsheet, isRedo?: boolean, undoCollections?: CollaborativeEditArgs[], actionEventArgs?: ActionEventArgs, isRecursive?: boolean): void;
/**
 * @hidden
 * @param {Workbook} workbook - Specify the workbook
 * @param {number} rowIdx - specify the roe index
 * @param {number} colIdx - specify the column Index.
 * @param {number} sheetIdx - specify the sheet index.
 * @returns {boolean} - Returns the boolean value.
 */
export declare function hasTemplate(workbook: Workbook, rowIdx: number, colIdx: number, sheetIdx: number): boolean;
/**
 * Setting row height in view an model.
 *
 * @hidden
 * @param {Spreadsheet} parent - Specify the parent
 * @param {SheetModel} sheet - specify the column width
 * @param {number} height - specify the style.
 * @param {number} rowIdx - specify the rowIdx
 * @param {HTMLElement} row - specify the row
 * @param {HTMLElement} hRow - specify the hRow.
 * @param {boolean} notifyRowHgtChange - specify boolean value.
 * @param {boolean} outsideViewport - Specify whether the row is outside the viewport.
 * @returns {void} - Setting row height in view an model.
 */
export declare function setRowEleHeight(parent: Spreadsheet, sheet: SheetModel, height: number, rowIdx: number, row?: HTMLElement, hRow?: HTMLElement, notifyRowHgtChange?: boolean, outsideViewport?: boolean): void;
/**
 * @hidden
 * @param {Workbook} context - Specify the context
 * @param {CellStyleModel} style - specify the style.
 * @param {number} lines - specify the lines
 * @param {number} lineHeight - Specify the line height.
 * @returns {number} - get Text Height
 */
export declare function getTextHeight(context: Workbook, style: CellStyleModel, lines?: number, lineHeight?: number): number;
/**
 * @hidden
 * @param {CellStyleModel} style - cell style
 * @returns {number} - returns line height
 */
export declare function getLineHeight(style: CellStyleModel): number;
/**
 * @hidden
 * @param {string} text - Specify the text
 * @param {CellStyleModel} style - specify the style.
 * @param {CellStyleModel} parentStyle - specify the parentStyle
 * @param  {boolean} preventDpr - specify the preventDpr.
 * @returns {number} - get Text Width
 */
export declare function getTextWidth(text: string, style: CellStyleModel, parentStyle: CellStyleModel, preventDpr?: boolean): number;
/**
 * @hidden
 * @param {string} text - Specify the text
 * @param {number} colwidth - specify the column width
 * @param {CellStyleModel} style - specify the style.
 * @param {CellStyleModel} parentStyle - specify the parentStyle
 * @returns {number} - Setting maximum height while doing formats and wraptext
 */
export declare function getLines(text: string, colwidth: number, style: CellStyleModel, parentStyle: CellStyleModel): number;
/**
 * calculation for width taken by border inside a cell
 *
 * @param {number} rowIdx - Specify the row index.
 * @param {number} colIdx - Specify the column index.
 * @param {SheetModel} sheet - Specify the sheet.
 * @returns {number} - get border width.
 * @hidden
 */
export declare function getBorderWidth(rowIdx: number, colIdx: number, sheet: SheetModel): number;
/**
 * calculation for height taken by border inside a cell
 *
 * @param {number} rowIdx - Specify the row index.
 * @param {number} colIdx - Specify the column index.
 * @param {SheetModel} sheet - Specify the sheet.
 * @returns {number} - get border height.
 * @hidden
 */
export declare function getBorderHeight(rowIdx: number, colIdx: number, sheet: SheetModel): number;
/**
 * Calculating column width by excluding cell padding and border width
 *
 * @param {SheetModel} sheet - Specify the sheet
 * @param {number} rowIdx - Specify the row index.
 * @param {number} startColIdx - Specify the start column index.
 * @param {number} endColIdx - Specify the end column index.
 * @returns {number} - get excluded column width.
 * @hidden
 */
export declare function getExcludedColumnWidth(sheet: SheetModel, rowIdx: number, startColIdx: number, endColIdx?: number): number;
/**
 * @param {Workbook} context - Specify the Workbook.
 * @param {number} rowIdx - Specify the row index.
 * @param {number} colIdx - Specify the column index.
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {CellStyleModel} style - Specify the style.
 * @param {number} lines - Specify the lines.
 * @param {number} lineHeight - Specify the line height.
 * @returns {number} - get text height with border.
 * @hidden
 */
export declare function getTextHeightWithBorder(context: Workbook, rowIdx: number, colIdx: number, sheet: SheetModel, style: CellStyleModel, lines?: number, lineHeight?: number): number;
/**
 * Setting maximum height while doing formats and wraptext
 *
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet
 * @param {number} rIdx - specify the row Index
 * @param {number} cIdx - specify the column Index.
 * @param {number} hgt - specify the hgt
 * @returns {void} - Setting maximum height while doing formats and wraptext
 */
export declare function setMaxHgt(sheet: SheetModel, rIdx: number, cIdx: number, hgt: number): void;
/**
 * Getting maximum height by comparing each cell's modified height.
 *
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {number} rIdx - Specify the row index.
 * @returns {number} - Getting maximum height by comparing each cell's modified height.
 */
export declare function getMaxHgt(sheet: SheetModel, rIdx: number): number;
/**
 * @hidden
 * @param {HTMLElement} ele - Specify the element.
 * @returns {void} - Specify the focus.
 */
export declare function focus(ele: HTMLElement): void;
/**
 * Checks whether a specific range of cells is locked or not.
 *
 * @param {Spreadsheet} parent - Specify the spreadsheet.
 * @param {number[]} rangeIndexes - Specify the range indexes.
 * @returns {boolean} - Returns true if any of the cells is locked and returns false if none of the cells is locked.
 * @hidden
 */
export declare function isLockedCells(parent: Spreadsheet, rangeIndexes?: number[]): boolean;
/**
 * Checks whether the range is discontinuous or not.
 *
 * @param {string} range - Specify the sheet
 * @returns {boolean} - Returns true if the range is discontinuous range.
 * @hidden
 */
export declare function isDiscontinuousRange(range: string): boolean;
/**
 * @hidden
 * @param {Spreadsheet} context - Specifies the context.
 * @param {number[]} range - Specifies the address range.
 * @param {number} sheetIdx - Specifies the sheetIdx.
 * @returns {void} - To clear the range.
 */
export declare function clearRange(context: Spreadsheet, range: number[], sheetIdx: number): void;
/**
 * @param {Spreadsheet} parent - Specifies the spreadsheet instance.
 * @param {number} top - Specifies the top.
 * @returns {number} - It returns bottom offset.
 * @hidden
 */
export declare function getBottomOffset(parent: Spreadsheet, top: number): {
    index: number;
    height: number;
};
/**
 * @param {Spreadsheet} parent - Specifies the spreadsheet instance.
 * @param {number} left - Specifies the left.
 * @returns {number} -It returns right index using given left value.
 * @hidden
 */
export declare function getRightIdx(parent: Spreadsheet, left: number): number;
/**
 * @param {Spreadsheet} spreadsheet - Specifies the spreadsheet instance.
 * @param {number} minWidth - Specifies the minimum width.
 * @returns {void}
 * @hidden
 */
export declare function setColMinWidth(spreadsheet: Spreadsheet, minWidth: number): void;
/**
 * Calculating resolution based windows value
 *
 * @param {number} size - Specify the end column index.
 * @returns {number} - get excluded column width.
 * @hidden
 */
export declare function addDPRValue(size: number): number;
/**
 * @param {Spreadsheet} context - Specifies the spreadsheet instance.
 * @param {string[]} keys - Specifies key array.
 * @returns {string} - It returns sheet property of the given key and context.
 * @hidden
 */
export declare function getSheetProperties(context: Spreadsheet, keys?: string[]): string;
/**
 * Returns the row indexes and column indexes of the charts in the active sheet
 *
 * @param {Spreadsheet} context - Specifies the Spreadsheet instance.
 * @returns { {chart: ChartModel, chartRowIdx: number, chartColIdx: number}[] } - Returns the row indexes and column indexes of the charts in the active sheet
 * @hidden
 */
export declare function getChartsIndexes(context?: Spreadsheet): {
    chart: ChartModel;
    chartRowIdx: number;
    chartColIdx: number;
}[];
/**
 * Checks if the given range string represents a valid column range.
 *
 * @param {string} range - The range string to validate.
 * @returns {boolean} - Returns `true` if the range is a valid column range, otherwise `false`.
 * @hidden
 */
export declare function isColumnRange(range: string): boolean;
/**
 * Checks if the given range string represents a valid row range.
 *
 * @param {string} range - The range string to validate.
 * @returns {boolean} - Returns `true` if the range is a valid row range, otherwise `false`.
 * @hidden
 */
export declare function isRowRange(range: string): boolean;
/**
 * Sets the standard height for a specified sheet in a spreadsheet.
 *
 * @param {Spreadsheet} context - The spreadsheet instance.
 * @param {number} sheetIndex - The index of the sheet to set the standard height.
 * @param {number} standardHeight - The standard height to set for the sheet.
 * @returns {void}
 * @hidden
 */
export declare function setStandardHeight(context: Spreadsheet, sheetIndex: number, standardHeight: number): void;
/**
 * Retrieves the standard height of a specific sheet in the spreadsheet.
 *
 * @param {Spreadsheet} context - The spreadsheet instance.
 * @param {number} sheetIndex - The index of the sheet to retrieve the standard height.
 * @returns {number} - The standard height of the specified sheet.
 * @hidden
 */
export declare function getStandardHeight(context: Spreadsheet, sheetIndex: number): number;
/**
 * Removes the specified elements from the DOM.
 *
 * @param {HTMLElement[]} elements - An array of HTML elements that need to be removed from the DOM.
 * @returns {void}
 * @hidden
 */
export declare function removeElements(elements: HTMLElement[]): void;
