import { IPosition, IGrid, IRow, IExpandedRow, PdfExportProperties, ExcelExportProperties, RowDropEventArgs } from './interface';
import { ServiceLocator } from '../services/service-locator';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { ColumnModel, AggregateColumnModel } from '../models/models';
import { AggregateType, HierarchyGridPrintMode } from './enum';
import { Dialog, Popup } from '@syncfusion/ej2-popups';
import { PredicateModel } from './grid-model';
import { FilterStateObj, IXLFilter } from '../common/filter-interface';
/**
 * Function to check whether target object implement specific interface
 *
 * @param  {Object} target - specifies the target
 * @param  {string} checkFor - specifies the checkfors
 * @returns {boolean} returns the boolean
 * @hidden
 */
export declare function doesImplementInterface(target: Object, checkFor: string): boolean;
/**
 * Function to get value from provided data
 *
 * @param  {string} field - specifies the field
 * @param  {Object} data - specifies the data
 * @param  {ColumnModel} column - specifies the column
 * @returns {Object} returns the object
 * @hidden
 */
export declare function valueAccessor(field: string, data: Object, column: ColumnModel): Object;
/**
 * Defines the method used to apply custom header cell values from external function and display this on each header cell rendered.
 *
 * @param  {string} field - specifies the field
 * @param  {ColumnModel} column - specifies the column
 * @returns {object} headerValueAccessor
 * @hidden
 */
export declare function headerValueAccessor(field: string, column: ColumnModel): Object;
/**
 * The function used to update Dom using requestAnimationFrame.
 *
 * @param {Function} updateFunction - Function that contains the actual action
 * @param {object} callBack - defines the callback
 * @returns {void}
 * @hidden
 */
export declare function getUpdateUsingRaf<T>(updateFunction: Function, callBack: Function): void;
/**
 * @hidden
 * @param {PdfExportProperties | ExcelExportProperties} exportProperties - Defines the export properties
 * @returns {boolean} Returns isExportColumns
 */
export declare function isExportColumns(exportProperties: PdfExportProperties | ExcelExportProperties): boolean;
/**
 * @param {PdfExportProperties | ExcelExportProperties} exportProperties - Defines the export properties
 * @param {IGrid} gObj - Defines the grid object
 * @returns {void}
 * @hidden
 */
export declare function updateColumnTypeForExportColumns(exportProperties: PdfExportProperties | ExcelExportProperties, gObj: IGrid): void;
/**
 * @hidden
 * @param {IGrid} grid - Defines the grid
 * @returns {void}
 */
export declare function updatecloneRow(grid: IGrid): void;
/**
 * @hidden
 * @param {Row<Column>} val - Defines the value
 * @param {IGrid} grid - Defines the grid
 * @returns {number} Returns the collapsed row count
 */
export declare function getCollapsedRowsCount(val: Row<Column>, grid: IGrid): number;
/**
 * @param {Object[]} row - Defines the row
 * @returns {void}
 * @hidden
 */
export declare function recursive(row: Object[]): void;
/**
 * @param {Object[]} collection - Defines the array
 * @param {Object} predicate - Defines the predicate
 * @returns {Object} Returns the object
 * @hidden
 */
export declare function iterateArrayOrObject<T, U>(collection: U[], predicate: (item: Object, index: number) => T): T[];
/**
 * @param {Object[]} array - Defines the array
 * @returns {Object} Returns the object
 * @hidden
 */
export declare function iterateExtend(array: Object[]): Object[];
/**
 * @param {string | Function} template - Defines the template
 * @returns {Function} Returns the function
 * @hidden
 */
export declare function templateCompiler(template: string | Function): Function;
/**
 * @param {Element} node - Defines the column
 * @param {Object} customAttributes - Defines the index
 * @returns {void}
 * @hidden
 */
export declare function setStyleAndAttributes(node: Element, customAttributes: {
    [x: string]: Object;
}): void;
/**
 * @param {Object} copied - Defines the column
 * @param {Object} first - Defines the inndex
 * @param {Object} second - Defines the second object
 * @param {string[]} exclude - Defines the exclude
 * @returns {Object} Returns the object
 * @hidden
 */
export declare function extend(copied: Object, first: Object, second?: Object, exclude?: string[]): Object;
/**
 * @param {Column[]} columnModel - Defines the column
 * @param {number} ind - Defines the inndex
 * @returns {number} - Returns the columnindex
 * @hidden
 */
export declare function setColumnIndex(columnModel: Column[], ind?: number): number;
/**
 * @param {Column[] | string[] | ColumnModel[]} columns - Defines the column
 * @param {boolean} autoWidth - Defines the autowidth
 * @param {IGrid} gObj - Defines the class name
 * @returns {Column} - Returns the columns
 * @hidden
 */
export declare function prepareColumns(columns: Column[] | string[] | ColumnModel[], autoWidth?: boolean, gObj?: IGrid): Column[];
/**
 * @param {HTMLElement} popUp - Defines the popup element
 * @param {MouseEvent | TouchEvent} e - Defines the moouse event
 * @param {string} className - Defines the class name
 * @returns {void}
 * @hidden
 */
export declare function setCssInGridPopUp(popUp: HTMLElement, e: MouseEvent | TouchEvent, className: string): void;
/**
 * @param {Object} obj - Defines the object
 * @returns {Object} Returns the Properties
 * @hidden
 */
export declare function getActualProperties<T>(obj: T): T;
/**
 * @param {Element} elem - Defines the element
 * @param {string} selector - Defines the string selector
 * @param {boolean} isID - Defines the isID
 * @returns {Element} Returns the element
 * @hidden
 */
export declare function parentsUntil(elem: Element, selector: string, isID?: boolean): Element;
/**
 * @param {Element} element - Defines the element
 * @param {Element} elements - Defines the element
 * @returns {number} Returns the element index
 * @hidden
 */
export declare function getElementIndex(element: Element, elements: Element[]): number;
/**
 * @param {Object} value - Defines the value
 * @param {Object} collection - defines the collection
 * @returns {number} Returns the array
 * @hidden
 */
export declare function inArray(value: Object, collection: Object[]): number;
/**
 * @param {Object} collection - Defines the collection
 * @returns {Object} Returns the object
 * @hidden
 */
export declare function getActualPropFromColl(collection: Object[]): Object[];
/**
 * @param {Element} target - Defines the target element
 * @param {string} selector - Defines the selector
 * @returns {void}
 * @hidden
 */
export declare function removeElement(target: Element, selector: string): void;
/**
 * @param {MouseEvent | TouchEvent} e Defines the mouse event
 * @returns {IPosition} Returns the position
 * @hidden
 */
export declare function getPosition(e: MouseEvent | TouchEvent): IPosition;
/**
 * @param {string} prefix - Defines the prefix string
 * @returns {string} Returns the uid
 * @hidden
 */
export declare function getUid(prefix: string): string;
/**
 * @param {Element | DocumentFragment} elem - Defines the element
 * @param {Element[] | NodeList} children - Defines the Element
 * @returns {Element} Returns the element
 * @hidden
 */
export declare function appendChildren(elem: Element | DocumentFragment, children: Element[] | NodeList): Element;
/**
 * @param {Element} elem - Defines the element
 * @param {string} selector - Defines the selector
 * @param {boolean} isID - Defines isID
 * @returns {Element} Return the element
 * @hidden
 */
export declare function parents(elem: Element, selector: string, isID?: boolean): Element[];
/**
 * @param {AggregateType | string} type - Defines the type
 * @param {Object} data - Defines the data
 * @param {AggregateColumnModel} column - Defines the column
 * @param {Object} context - Defines the context
 * @returns {Object} Returns the calculated aggragate
 * @hidden
 */
export declare function calculateAggregate(type: AggregateType | string, data: Object, column?: AggregateColumnModel, context?: Object): Object;
/** @hidden
 * @returns {number} - Returns the scrollbarwidth
 */
export declare function getScrollBarWidth(): number;
/**
 * @param {HTMLElement} element - Defines the element
 * @returns {number} Returns the roww height
 * @hidden
 */
export declare function getRowHeight(element?: HTMLElement): number;
/**
 * @param {HTMLElement} element - Defines the HTMl element
 * @returns {number} Returns the row height
 * @hidden
 */
export declare function getActualRowHeight(element?: HTMLElement): number;
/**
 * @param {string} field - Defines the field
 * @returns {boolean} - Returns is complex field
 * @hidden
 */
export declare function isComplexField(field: string): boolean;
/**
 * @param {string} field - Defines the field
 * @returns {string} - Returns the get complex field ID
 * @hidden
 */
export declare function getComplexFieldID(field?: string): string;
/**
 * @param {string} field - Defines the field
 * @returns {string} - Returns the parsed column field id
 * @hidden
 */
export declare function getParsedFieldID(field?: string): string;
/**
 * @param {string} field - Defines the field
 * @returns {string} - Returns the set complex field ID
 * @hidden
 */
export declare function setComplexFieldID(field?: string): string;
/**
 * @param {Column} col - Defines the column
 * @param {string} type - Defines the type
 * @param {Element} elem - Defines th element
 * @returns {boolean} Returns is Editable
 * @hidden
 */
export declare function isEditable(col: Column, type: string, elem: Element): boolean;
/**
 * @param {Element} elem - Defines th element
 * @returns {boolean} Returns is Editable
 * @hidden
 */
export declare function isCellHaveWidth(elem: Element): boolean;
/**
 * @param {IGrid} inst - Defines the IGrid
 * @returns {boolean} Returns is action prevent in boolean
 * @hidden
 */
export declare function isActionPrevent(inst: IGrid): boolean;
/**
 * @param {any} elem - Defines the element
 * @param {boolean} action - Defines the boolean for action
 * @returns {void}
 * @hidden
 */
export declare function wrap(elem: any, action: boolean): void;
/**
 * @param {ServiceLocator} serviceLocator - Defines the service locator
 * @param {Column} column  - Defines the column
 * @returns {void}
 * @hidden
 */
export declare function setFormatter(serviceLocator?: ServiceLocator, column?: Column): void;
/**
 * @param {Element} cells - Defines the cell element
 * @param {boolean} add - Defines the add
 * @param {string} args - Defines the args
 * @returns {void}
 * @hidden
 */
export declare function addRemoveActiveClasses(cells: Element[], add: boolean, ...args: string[]): void;
/**
 * @param {string} result - Defines th string
 * @returns {string} Returns the distinct staing values
 * @hidden
 */
export declare function distinctStringValues(result: string[]): string[];
/**
 * @param {Element} target - Defines the target
 * @param {Dialog} dialogObj - Defines the dialog
 * @returns {void}
 * @hidden
 */
export declare function getFilterMenuPostion(target: Element, dialogObj: Dialog): void;
/**
 * @param {Object} args - Defines the args
 * @param {Popup} args.popup - Defines the args for popup
 * @param {Dialog} dialogObj - Defines the dialog obj
 * @returns {void}
 * @hidden
 */
export declare function getZIndexCalcualtion(args: {
    popup: Popup;
}, dialogObj: Dialog): void;
/**
 * @param {string} operator - Defines the operator
 * @param {string} columnUid - Defines the column uid
 * @param {Column} column - Defines the column
 * @param {string} columnType - Defines the column type
 * @param {Dialog} dlgObj - Defines the dialog
 * @param {string} previousValue - Defines the previous operator
 * @returns {void}
 * @hidden
 */
export declare function toggleFilterUI(operator: string, columnUid: string, column: Column, columnType: string, dlgObj: Dialog, previousValue: string): void;
/**
 * @param {Element} elem - Defines the element
 * @returns {void}
 * @hidden
 */
export declare function toogleCheckbox(elem: Element): void;
/**
 * @param {HTMLInputElement} elem - Defines the element
 * @param {boolean} checked - Defines is checked
 * @returns {void}
 * @hidden
 */
export declare function setChecked(elem: HTMLInputElement, checked: boolean): void;
/**
 * @param {string} uid - Defines the string
 * @param {Element} elem - Defines the Element
 * @param {string} className - Defines the classname
 * @returns {Element} Returns the box wrap
 * @hidden
 */
export declare function createCboxWithWrap(uid: string, elem: Element, className?: string): Element;
/**
 * @param {Element} elem - Defines the element
 * @param {boolean} checked - Defines is checked
 * @returns {void}
 * @hidden
 */
export declare function removeAddCboxClasses(elem: Element, checked: boolean): void;
/**
 * Refresh the Row model's foreign data.
 *
 * @param {IRow<Column>} row - Grid Row model object.
 * @param {Column[]} columns - Foreign columns array.
 * @param {Object} data - Updated Row data.
 * @returns {void}
 * @hidden
 */
export declare function refreshForeignData(row: IRow<Column>, columns: Column[], data: Object): void;
/**
 * Get the foreign data for the corresponding cell value.
 *
 * @param {Column} column - Foreign Key column
 * @param {Object} data - Row data.
 * @param {string | number} lValue - cell value.
 * @param {Object} foreignKeyData - foreign data source.
 * @returns {Object} Returns the object
 * @hidden
 */
export declare function getForeignData(column: Column, data?: Object, lValue?: string | number, foreignKeyData?: Object[]): Object[];
/**
 * To use to get the column's object by the foreign key value.
 *
 * @param {string} foreignKeyValue - Defines ForeignKeyValue.
 * @param {Column[]} columns - Array of column object.
 * @returns {Column} Returns the element
 * @hidden
 */
export declare function getColumnByForeignKeyValue(foreignKeyValue: string, columns: Column[]): Column;
/**
 * @param {number} value - Defines the date or month value
 * @returns {string} Returns string
 * @hidden
 */
export declare function padZero(value: number): string;
/**
 * @param {PredicateModel} filterObject - Defines the filterObject
 * @param {string} type - Defines the type
 * @param {boolean} isExecuteLocal - Defines whether the data actions performed in client and used for dateonly type field
 * @returns {Predicate} Returns the Predicate
 * @hidden
 */
export declare function getDatePredicate(filterObject: PredicateModel, type?: string, isExecuteLocal?: boolean): Predicate;
/**
 * @param {IGrid} grid - Defines the IGrid
 * @returns {boolean} Returns true if group adaptive is true
 * @hidden
 */
export declare function isGroupAdaptive(grid: IGrid): boolean;
/**
 * @param {string} field - Defines the Field
 * @param {Object} object - Defines the objec
 * @returns {any} Returns the object
 * @hidden
 */
export declare function getObject(field?: string, object?: Object): any;
/**
 * @param {string | Object} format - defines the format
 * @param {string} colType - Defines the coltype
 * @returns {string} Returns the custom Data format
 * @hidden
 */
export declare function getCustomDateFormat(format: string | Object, colType: string): string;
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {HierarchyGridPrintMode} hierarchyPrintMode - Defines the hierarchyPrintMode
 * @returns {Object} Returns the object
 * @hidden
 */
export declare function getExpandedState(gObj: IGrid, hierarchyPrintMode: HierarchyGridPrintMode): {
    [index: number]: IExpandedRow;
};
/**
 * @param {IGrid} gObj - Defines the grid objct
 * @param {HierarchyGridPrintMode} hierarchyPrintMode - Defines the hierarchyPrintMode
 * @returns {IGrid} Returns the IGrid
 * @hidden
 */
export declare function getPrintGridModel(gObj: IGrid, hierarchyPrintMode?: HierarchyGridPrintMode): IGrid;
/**
 * @param {Object} copied - Defines the copied object
 * @param {Object} first - Defines the first object
 * @param {Object} second - Defines the second object
 * @param {boolean} deep - Defines the deep
 * @returns {Object} Returns the extended object
 * @hidden
 */
export declare function extendObjWithFn(copied: Object, first: Object, second?: Object, deep?: boolean): Object;
/**
 * @param {Object} obj - Defines the obj
 * @returns {string[]} Returns the string
 * @hidden
 */
export declare function getPrototypesOfObj(obj: Object): string[];
/**
 * @param {Column[]} column - Defines the Column
 * @returns {number} Returns the column Depth
 * @hidden
 */
export declare function measureColumnDepth(column: Column[]): number;
/**
 * @param {Column} col - Defines the Column
 * @param {number} index - Defines the index
 * @returns {number} Returns the depth
 * @hidden
 */
export declare function checkDepth(col: Column, index: number): number;
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {PredicateModel[]} filteredCols - Defines the PredicateModel
 * @returns {void}
 * @hidden
 */
export declare function refreshFilteredColsUid(gObj: IGrid, filteredCols: PredicateModel[]): void;
/** @hidden */
export declare namespace Global {
    let timer: Object;
}
/**
 * @param {Element} element - Defines the element
 * @returns {Object} Returns the transform values
 * @hidden
 */
export declare function getTransformValues(element: Element): {
    width: number;
    height: number;
};
/**
 * @param {Element} rootElement - Defines the root Element
 * @param {Element} element - Defines the element
 * @returns {void}
 * @hidden
 */
export declare function applyBiggerTheme(rootElement: Element, element: Element): void;
/**
 * @param {IGrid} gObj - Defines grid object
 * @returns {number}  - Returns scroll width
 * @hidden
 */
export declare function getScrollWidth(gObj: IGrid): number;
/**
 * @param {IGrid} gObj - Defines grid object
 * @param {number} idx - Defines the index
 * @returns {number} Returns colSpan index
 * @hidden
 */
export declare function resetColspanGroupCaption(gObj: IGrid, idx: number): number;
/**
 * @param {HTMLElement} tr - Defines the tr Element
 * @param {IGrid} gObj - Defines grid object
 * @returns {void}
 * @hidden
 */
export declare function groupCaptionRowLeftRightPos(tr: Element, gObj: IGrid): void;
/**
 * @param {Element} row - Defines row element
 * @param {IGrid} gridObj - Defines grid object
 * @returns {boolean} Returns isRowEnteredInGrid
 * @hidden
 */
export declare function ensureLastRow(row: Element, gridObj: IGrid): boolean;
/**
 * @param {Element} row - Defines row element
 * @param {number} rowTop - Defines row top number
 * @returns {boolean} Returns first row is true
 * @hidden
 */
export declare function ensureFirstRow(row: Element, rowTop: number): boolean;
/**
 * @param {number} index - Defines index
 * @param {IGrid} gObj - Defines grid object
 * @returns {boolean} Returns isRowEnteredInGrid
 * @hidden
 */
export declare function isRowEnteredInGrid(index: number, gObj: IGrid): boolean;
/**
 * @param {IGrid} gObj - Defines the grid object
 * @param {Object} data - Defines the query
 * @returns {number} Returns the edited data index
 * @hidden
 */
export declare function getEditedDataIndex(gObj: IGrid, data: Object): number;
/**
 * @param {Object} args - Defines the argument
 * @param {Query} query - Defines the query
 * @returns {FilterStateObj} Returns the filter state object
 * @hidden
 */
export declare function eventPromise(args: Object, query: Query): FilterStateObj;
/**
 * @param {Query} query - Defines the query
 * @returns {Object} Returns the state event argument
 * @hidden
 */
export declare function getStateEventArgument(query: Query): Object;
/**
 * @param {IGrid} gObj - Defines the Igrid
 * @returns {boolean} Returns the ispercentageWidth
 * @hidden
 */
export declare function ispercentageWidth(gObj: IGrid): boolean;
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {Row<Column>[]} rows - Defines the row
 * @param {HTMLTableRowElement[]} rowElms - Row elements
 * @param {number} index - Row index
 * @param {number} startRowIndex - Start Row Index
 * @returns {void}
 * @hidden
 */
export declare function resetRowIndex(gObj: IGrid, rows: Row<Column>[], rowElms: HTMLTableRowElement[], index?: number, startRowIndex?: number): void;
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @returns {void}
 * @hidden
 */
export declare function resetCachedRowIndex(gObj: IGrid): void;
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {RowDropEventArgs} args - Defines the row drop event argument
 * @param {HTMLTableRowElement[]} tr - Row elements
 * @param {Row<Column>} dropRObj - dropped row object
 * @returns {void}
 * @hidden
 */
export declare function groupReorderRowObject(gObj: IGrid, args: RowDropEventArgs, tr: HTMLTableRowElement[], dropRObj?: Row<Column>): void;
/**
 * @param {IGrid} gObj - Defines the grid object
 * @param {Object} changes - Defines the changes
 * @param {string} type - Defines the type
 * @param {string} keyField - Defines the keyfield
 * @returns {void}
 * @hidden
 */
export declare function compareChanges(gObj: IGrid, changes: Object, type: string, keyField: string): void;
/**
 * @param {IGrid} gObj - Defines the grid object
 * @returns {void}
 * @hidden
 */
export declare function setRowElements(gObj: IGrid): void;
/**
 * @param {Element} row - Defines the row
 * @param {number} start - Defines the start index
 * @param {number} end - Defines the end index
 * @returns {void}
 * @hidden
 */
export declare function sliceElements(row: Element, start: number, end: number): void;
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {Dialog} dlgObj - Defines the dialog
 * @returns {void}
 * @hidden
 */
export declare function resetDialogAppend(gObj: IGrid, dlgObj: Dialog): void;
/**
 * @param {Column} column - Defines the column
 * @param {string} uid - Defines the uid
 * @returns {boolean} Returns is child column
 * @hidden
 */
export declare function isChildColumn(column: Column, uid: string): boolean;
/**
 * @param {Column} column - Defines the column
 * @param {string[]} uids - Defines the uid
 * @returns {void}
 * @hidden
 */
export declare function pushuid(column: Column, uids: string[]): void;
/**
 * @param {Column} column - Defines the column
 * @returns {string} Returns the direction
 * @hidden
 */
export declare function frozenDirection(column: Column): string;
/**
 * @param {Element} row - Defines the row
 * @returns {void}
 * @hidden
 */
export declare function addFixedColumnBorder(row: Element): void;
/**
 * @param {HTMLElement} node - Defines the row
 * @param {number} width - Defines the width
 * @param {boolean} isRtl - Boolean property
 * @param {string} position - Defines the position
 * @returns {void}
 * @hidden
 */
export declare function applyStickyLeftRightPosition(node: HTMLElement, width: number, isRtl: boolean, position: string): void;
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {Column} column - Defines the column
 * @param {Element} node - Defines the Element
 * @param {number} colSpan - Defines the colSpan value
 * @returns {void}
 * @hidden
 */
export declare function resetColandRowSpanStickyPosition(gObj: IGrid, column: Column, node: Element, colSpan: number): void;
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {number} rowIndex - Defines the row index
 * @param {number} colIndex - Defines the colum index
 * @returns {void}
 * @hidden
 */
export declare function getCellFromRow(gObj: IGrid, rowIndex: number, colIndex: number): Element;
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {Column} column - Defines the column
 * @param {Element} node - Defines the Element
 * @returns {void}
 * @hidden
 */
export declare function addStickyColumnPosition(gObj: IGrid, column: Column, node: Element): void;
/**
 * @param {IGrid} gObj - Defines the grid Object
 * @param {Column} col - Defines the column
 * @param {number} rowIndex - Defines the rowindex
 * @returns {Element} Returns the element
 * @hidden
 */
export declare function getCellsByTableName(gObj: IGrid, col: Column, rowIndex: number): Element[];
/**
 * @param {IGrid} gObj - Defines the column
 * @param {Column} col - Defines the index
 * @param {number} rowIndex - Defines the rules
 * @param {number} index - Defines the movable column rules
 * @returns {Element} Returns the Element
 * @hidden
 */
export declare function getCellByColAndRowIndex(gObj: IGrid, col: Column, rowIndex: number, index: number): Element;
/**
 * @param {Column} col - Defines the column
 * @param {number} index - Defines the index
 * @param {Object} rules - Defines the rules
 * @param {Object} mRules - Defines the movable column rules
 * @param {Object} frRules - Defines the Frozen rules
 * @param {number} len - Defines the length
 * @param {boolean} isCustom - Defines custom form validation
 * @returns {void}
 * @hidden
 */
export declare function setValidationRuels(col: Column, index: number, rules: Object, mRules: Object, frRules: Object, len: number, isCustom?: boolean): void;
/**
 * @param {string} numberFormat - Format
 * @param {string} type - Value type
 * @param {boolean} isExcel - Boolean property
 * @param {string} currencyCode - Specifies the currency code to be used for formatting.
 * @returns {string} returns formated value
 * @hidden
 */
export declare function getNumberFormat(numberFormat: string, type: string, isExcel: boolean, currencyCode?: string): string;
/**
 * @param {IGrid} gObj - Grid instance
 * @returns {void}
 * @hidden
 */
export declare function addBiggerDialog(gObj: IGrid): void;
/**
 * @param {string} value - specifies the trr
 * @param {Object} mapObject - specifies the idx
 * @returns {Object | string} returns object or string
 * @hidden
 */
export declare function performComplexDataOperation(value: string, mapObject: Object): Object | string;
/**
 * @param {Object} tr - specifies the trr
 * @param {number} idx - specifies the idx
 * @param {string} displayVal - specifies the displayval
 * @param {Row<Column>} rows - specifies the rows
 * @param {IGrid} parent - Grid instance
 * @param {boolean} isContent - check for content renderer
 * @returns {void}
 * @hidden
 */
export declare function setDisplayValue(tr: Object, idx: number, displayVal: string, rows: Row<Column>[], parent?: IGrid, isContent?: boolean): void;
/** @hidden */
export declare function addRemoveEventListener(parent: IGrid, evt: {
    event: string;
    handler: Function;
}[], isOn: boolean, module?: Object): void;
/** @hidden */
export declare function createEditElement(parent: IGrid, column: Column, classNames: string, attr: {
    [key: string]: string;
}): Element;
/**
 * @param {IGrid} gObj - Grid instance
 * @param {string} uid - Defines column's uid
 * @returns {Column} returns column model
 * @hidden
 */
export declare function getColumnModelByUid(gObj: IGrid, uid: string): Column;
/**
 * @param {IGrid} gObj - Grid instance
 * @param {string} field - Defines column's uid
 * @returns {Column} returns column model
 * @hidden
 */
export declare function getColumnModelByFieldName(gObj: IGrid, field: string): Column;
/**
 * @param {string} id - Defines component id
 * @param {string[]} evts - Defines events
 * @param {object} handlers - Defines event handlers
 * @param {any} instance - Defines class instance
 * @returns {void}
 * @hidden
 */
export declare function registerEventHandlers(id: string, evts: string[], handlers: object, instance: any): void;
/**
 * @param {any} component - Defines component instance
 * @param {string[]} evts - Defines events
 * @param {any} instance - Defines class instance
 * @returns {void}
 * @hidden
 */
export declare function removeEventHandlers(component: any, evts: string[], instance: any): void;
/**
 * @param {IGrid | IXLFilter} parent - Defines parent instance
 * @param {string[]} templates - Defines the templates name which are needs to clear
 * @returns {void}
 * @hidden
 */
export declare function clearReactVueTemplates(parent: IGrid | IXLFilter, templates: string[]): void;
/**
 *
 * @param { HTMLElement[] } removeElem - Defines checkbox wrapper element
 * @returns {void}
 * @hidden
 */
export declare function infiniteRemoveElements(removeElem: HTMLElement[]): void;
/**
 *
 * @param { HTMLElement[] } appendElem - Defines checkbox wrapper element
 * @param { HTMLElement } ulElement - Defines ul element
 * @returns {void}
 * @hidden
 */
export declare function infiniteAppendElements(appendElem: HTMLElement[], ulElement: HTMLElement): void;
/**
 *
 * @param { HTMLElement } element - Defines checkbox wrapper element
 * @param { boolean } isChooser - Defines checkbox filter column chooser
 * @returns { number } list height value
 * @hidden
 */
export declare function getListHeight(element: Element, isChooser?: boolean): number;
/**
 *
 * @param { Element } row - Defines row element
 * @returns { number } row index
 */
export declare function getRowIndexFromElement(row: Element): number;
/**
 *
 * @param { IGrid } grid - Defines grid instance
 * @returns { IGrid } returns parent grid instance
 */
export declare function getParentIns(grid: IGrid): IGrid;
/**
 *
 * @param { string[] } fields - Defines grouped fields
 * @param { values } values - Defines caption keys
 * @param { any } instance - Defines dynamic class instance
 * @returns { Predicate } returns filter predicate
 */
export declare function generateExpandPredicates(fields: string[], values: string[], instance: any): Predicate;
/**
 *
 * @param { Predicate } pred - Defines filter predicate
 * @returns { Predicate[] } Returns formed predicate
 */
export declare function getPredicates(pred: Predicate): Predicate[];
/**
 *
 * @param { number } index - Defines group caption indent
 * @param { Row<Column>[] } rowsObject - Defines rows object
 * @returns { { fields: string[], keys: string[] } } Returns grouped keys and values
 */
export declare function getGroupKeysAndFields(index: number, rowsObject: Row<Column>[]): {
    fields: string[];
    keys: string[];
};
/**
 *
 * @param { number[][] } checkActiveMatrix - Defines matrix to check
 * @param { number[] } checkCellIndex - Defines index to check
 * @param { boolean } next - Defines select next or previous index
 * @returns { number[] } - Returns next active current index
 */
export declare function findCellIndex(checkActiveMatrix: number[][], checkCellIndex: number[], next: boolean): number[];
/**
 *
 * @param { string } string - Defines string need to capitalized first letter
 * @returns { string } - Returns capitalized first letter string
 */
export declare function capitalizeFirstLetter(string: string): string;
/**
 *
 * @param { IGrid } grid - Defines parent instance
 * @returns { boolean } - Returns is virtual
 */
export declare function checkIsVirtual(grid: IGrid): boolean;
/**
 *
 * @param { number[] } blockes - Defines block indexes
 * @returns { number[] } - Returns is visible page
 */
export declare function getVisiblePage(blockes: number[]): number[];
