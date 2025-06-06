/// <reference path="../../workbook/base/workbook-model.d.ts" />
import { INotifyPropertyChanged, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { MenuItemModel, BeforeOpenCloseMenuEventArgs, ItemModel } from '@syncfusion/ej2-navigations';
import { BeforeOpenEventArgs, UndoRedoEventArgs } from '../common/index';
import { DialogBeforeOpenEventArgs } from '../common/index';
import { CollaborativeEditArgs } from '../common/index';
import { CellEditEventArgs, CellSaveEventArgs } from '../common/index';
import { PasteSpecialType } from '../common/index';
import { Render } from '../renderer/render';
import { Scroll, Selection } from '../actions/index';
import { AutoFill, SpreadsheetNote } from '../actions/index';
import { CellRenderEventArgs, IRenderer, IViewport, OpenOptions, MenuSelectEventArgs } from '../common/index';
import { SheetModel, HyperlinkModel, DefineNameModel } from './../../workbook/index';
import { BeforeHyperlinkArgs, AfterHyperlinkArgs, FindOptions, ValidationModel, PrintOptions } from './../../workbook/common/index';
import { BeforeCellFormatArgs, CellStyleModel } from './../../workbook/index';
import { BeforeSaveEventArgs, SaveCompleteEventArgs } from './../../workbook/index';
import { CellModel, DataSourceChangedEventArgs } from './../../workbook/index';
import { BeforeSortEventArgs, SortOptions, SortEventArgs } from './../../workbook/index';
import { FilterOptions, FilterEventArgs, ProtectSettingsModel } from './../../workbook/index';
import { Workbook } from '../../workbook/base/workbook';
import { SpreadsheetModel } from './spreadsheet-model';
import { ScrollSettingsModel, SelectionSettingsModel } from '../common/index';
import { BeforeSelectEventArgs, SelectEventArgs } from '../common/index';
import { WorkbookNumberFormat, WorkbookFormula } from '../../workbook/index';
import { Open } from '../integrations/index';
import { PredicateModel } from '@syncfusion/ej2-grids';
import { RibbonItemModel } from '../../ribbon/index';
import { ClearOptions, ConditionalFormatModel, ImageModel } from './../../workbook/common/index';
import { NumberFormatArgs } from '../../workbook/index';
import { ConditionalFormatEventArgs } from '../common/index';
import { Print } from '../renderer/print';
/**
 * Represents the Spreadsheet component.
 *
 * ```html
 * <div id='spreadsheet'></div>
 * <script>
 *  let spreadsheetObj = new Spreadsheet();
 *  spreadsheetObj.appendTo('#spreadsheet');
 * </script>
 * ```
 */
export declare class Spreadsheet extends Workbook implements INotifyPropertyChanged {
    /**
     * To specify a CSS class or multiple CSS class separated by a space, add it in the Spreadsheet root element.
     * This allows you to customize the appearance of component.
     *
     * {% codeBlock src='spreadsheet/cssClass/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     */
    cssClass: string;
    /**
     * It specifies whether the Spreadsheet should be rendered with scrolling or not.
     * To customize the Spreadsheet scrolling behavior, use the [`scrollSettings`](https://ej2.syncfusion.com/documentation/api/spreadsheet/#scrollSettings) property.
     *
     * @default true
     */
    allowScrolling: boolean;
    /**
     * If `allowResizing` is set to true, spreadsheet columns and rows can be resized.
     *
     * @default true
     */
    allowResizing: boolean;
    /**
     * If `showAggregate` is set to true, spreadsheet will show the AVERAGE, SUM, COUNT, MIN and MAX values based on the selected cells.
     *
     * @default true
     */
    showAggregate: boolean;
    /**
     * It enables or disables the clipboard operations (cut, copy, and paste) of the Spreadsheet.
     *
     * @default true
     */
    enableClipboard: boolean;
    /**
     * It enables or disables the context menu option of spreadsheet. By default, context menu will opens for row header,
     * column header, sheet tabs, and cell.
     *
     * @default true
     */
    enableContextMenu: boolean;
    /**
     * It allows you to interact with cell, sheet tabs, formula bar, and ribbon through the keyboard device.
     *
     * @default true
     */
    enableKeyboardNavigation: boolean;
    /**
     * It enables shortcut keys to perform Spreadsheet operations like open, save, copy, paste, and more.
     *
     * @default true
     */
    enableKeyboardShortcut: boolean;
    /**
     * It allows to enable/disable undo and redo functionalities.
     *
     * @default true
     */
    allowUndoRedo: boolean;
    /**
     * It allows to enable/disable wrap text feature. By using this feature the wrapping applied cell text can wrap to the next line,
     * if the text width exceeds the column width.
     *
     * @default true
     */
    allowWrap: boolean;
    /**
     * Configures the selection settings.
     *
     * The selectionSettings `mode` property has three values and is described below:
     *
     * * None: Disables UI selection.
     * * Single: Allows single selection of cell, row, or column and disables multiple selection.
     * * Multiple: Allows multiple selection of cell, row, or column and disables single selection.
     *
     * {% codeBlock src='spreadsheet/selectionSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { mode: 'Multiple' }
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Configures the scroll settings.
     *
     * {% codeBlock src='spreadsheet/scrollSettings/index.md' %}{% endcodeBlock %}
     *
     * > The `allowScrolling` property should be `true`.
     *
     * @default { isFinite: false, enableVirtualization: true }
     */
    scrollSettings: ScrollSettingsModel;
    /**
     * Triggers before the cell appended to the DOM.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      beforeCellRender: (args: CellRenderEventArgs) => {
     *      }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeCellRender
     */
    beforeCellRender: EmitType<CellRenderEventArgs>;
    /**
     * Triggers before the cell or range of cells being selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      beforeSelect: (args: BeforeSelectEventArgs) => {
     *      }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeSelect
     */
    beforeSelect: EmitType<BeforeSelectEventArgs>;
    /**
     * Triggers after the cell or range of cells is selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      select: (args: SelectEventArgs) => {
     *      }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event select
     */
    select: EmitType<SelectEventArgs>;
    /**
     * Triggers before opening the context menu and it allows customizing the menu items.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       contextMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event contextMenuBeforeOpen
     */
    contextMenuBeforeOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before opening the file menu.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       fileMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event fileMenuBeforeOpen
     */
    fileMenuBeforeOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before closing the context menu.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       contextMenuBeforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event contextMenuBeforeClose
     */
    contextMenuBeforeClose: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before opening the dialog box.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       dialogBeforeOpen: (args: DialogBeforeOpenEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event dialogBeforeOpen
     */
    dialogBeforeOpen: EmitType<DialogBeforeOpenEventArgs>;
    /**
     * Triggers before closing the file menu.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       fileMenuBeforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event fileMenuBeforeClose
     */
    fileMenuBeforeClose: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers when the context menu item is selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       contextMenuItemSelect: (args: MenuSelectEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event contextMenuItemSelect
     */
    contextMenuItemSelect: EmitType<MenuSelectEventArgs>;
    /**
     * Triggers when the file menu item is selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       fileMenuItemSelect: (args: MenuSelectEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event fileMenuItemSelect
     */
    fileMenuItemSelect: EmitType<MenuSelectEventArgs>;
    /**
     * Triggers before the data is populated to the worksheet.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeDataBound: (args: Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeDataBound
     */
    beforeDataBound: EmitType<Object>;
    /**
     * Triggers when the data is populated in the worksheet.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       dataBound: (args: Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event dataBound
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers during data changes when the data is provided as `dataSource` in the Spreadsheet.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       dataSourceChanged: (args: DataSourceChangedEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event dataSourceChanged
     */
    dataSourceChanged: EmitType<DataSourceChangedEventArgs>;
    /**
     * Triggers when the cell is being edited.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellEdit: (args: CellEditEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event cellEdit
     */
    cellEdit: EmitType<CellEditEventArgs>;
    /**
     * Triggers every time a request is made to access cell information.
     * This will be triggered when editing a cell.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellEditing: (args: CellEditEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event cellEditing
     */
    cellEditing: EmitType<CellEditEventArgs>;
    /**
     * Triggers when the cell has been edited.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellEdited: (args: CellEditEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event cellEdited
     */
    cellEdited: EmitType<CellEditEventArgs>;
    /**
     * Triggers when the edited cell is saved.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellSave: (args: CellSaveEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event cellSave
     */
    cellSave: EmitType<CellSaveEventArgs>;
    /**
     * Triggers when before the cell is saved.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeCellSave: (args: CellEditEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeCellSave
     */
    beforeCellSave: EmitType<CellEditEventArgs>;
    /**
     * Triggers when the component is created.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       created: () => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Triggers before sorting the specified range.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeSort: (args: BeforeSortEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeSort
     */
    beforeSort: EmitType<BeforeSortEventArgs>;
    /**
     * Triggers before insert a hyperlink.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeHyperlinkCreate: (args: BeforeHyperlinkArgs ) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeHyperlinkCreate
     */
    beforeHyperlinkCreate: EmitType<BeforeHyperlinkArgs>;
    /**
     * Triggers after the hyperlink inserted.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       afterHyperlinkCreate: (args: afterHyperlinkArgs ) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event afterHyperlinkCreate
     */
    afterHyperlinkCreate: EmitType<AfterHyperlinkArgs>;
    /**
     * Triggers when the Hyperlink is clicked.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeHyperlinkClick: (args: BeforeHyperlinkArgs ) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event beforeHyperlinkClick
     */
    beforeHyperlinkClick: EmitType<BeforeHyperlinkArgs>;
    /**
     * Triggers when the Hyperlink function gets completed.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       afterHyperlinkClick: (args: AfterHyperlinkArgs ) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event afterHyperlinkClick
     */
    afterHyperlinkClick: EmitType<AfterHyperlinkArgs>;
    /**
     * Triggers before apply or remove the conditional format from a cell in a range.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeConditionalFormat: (args: ConditionalFormatEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event cellSave
     */
    beforeConditionalFormat: EmitType<ConditionalFormatEventArgs>;
    /**
     * Triggers when the Spreadsheet actions (such as editing, formatting, sorting etc..) are starts.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       actionBegin: (args: BeforeCellFormatArgs|BeforeOpenEventArgs|BeforeSaveEventArgs|BeforeSelectEventArgs
     *                    |BeforeSortEventArgs|CellEditEventArgs|MenuSelectEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event
     */
    actionBegin: EmitType<BeforeCellFormatArgs | BeforeOpenEventArgs | BeforeSaveEventArgs | BeforeSelectEventArgs | BeforeSortEventArgs | CellEditEventArgs | MenuSelectEventArgs>;
    /**
     * Triggers when the spreadsheet actions (such as editing, formatting, sorting etc..) gets completed.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       actionComplete: (args: SortEventArgs|CellSaveEventArgs|SaveCompleteEventArgs|Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event
     */
    actionComplete: EmitType<SortEventArgs | CellSaveEventArgs | SaveCompleteEventArgs | Object>;
    /**
     * Triggers when the spreadsheet importing gets completed.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       openComplete: (args: Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event openComplete
     */
    openComplete: EmitType<Object>;
    /**
     * Triggers after sorting action is completed.
     *
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       sortComplete: (args: SortEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     *
     * @event sortComplete
     */
    sortComplete: EmitType<SortEventArgs>;
    /**
     * Defines the currencyCode format of the Spreadsheet cells
     *
     * @private
     */
    private currencyCode;
    /** @hidden */
    spreadsheetNoteModule: SpreadsheetNote;
    /** @hidden */
    renderModule: Render;
    /** @hidden */
    scrollModule: Scroll;
    /** @hidden */
    printModule: Print;
    /** @hidden */
    workbookNumberFormatModule: WorkbookNumberFormat;
    /** @hidden */
    workbookFormulaModule: WorkbookFormula;
    /** @hidden */
    autofillModule: AutoFill;
    /** @hidden */
    openModule: Open;
    /** @hidden */
    selectionModule: Selection;
    /** @hidden */
    sheetModule: IRenderer;
    /** @hidden */
    createdHandler: Function | object;
    /** @hidden */
    viewport: IViewport;
    /** @hidden */
    enableScaling: boolean;
    protected needsID: boolean;
    ribbonModule: any;
    /**
     * Constructor for creating the widget.
     *
     * @param  {SpreadsheetModel} options - Configures Spreadsheet options.
     * @param  {string|HTMLElement} element - Element to render Spreadsheet.
     */
    constructor(options?: SpreadsheetModel, element?: string | HTMLElement);
    /**
     * To get cell element.
     *
     * @param {number} rowIndex - specify the rowIndex.
     * @param {number} colIndex - specify the colIndex.
     * @param {HTMLTableElement} row - specify the row.
     * @returns {HTMLElement} - Get cell element
     * @hidden
     */
    getCell(rowIndex: number, colIndex: number, row?: HTMLTableRowElement): HTMLElement;
    /**
     * Get cell element.
     *
     * @param {number} index - specify the index.
     * @param {HTMLTableElement} table - specify the table.
     * @param {number} colIdx - specify the column index.
     * @returns {HTMLTableRowElement} - Get cell element
     * @hidden
     */
    getRow(index: number, table?: HTMLTableElement, colIdx?: number): HTMLTableRowElement;
    /**
     * To get hidden row/column count between two specified index.
     *
     * Set `layout` as `columns` if you want to get column hidden count.
     *
     * @param {number} startIndex - specify the startIndex.
     * @param {number} endIndex - specify the endIndex.
     * @param {string} layout - specify the layout.
     * @param {SheetModel} sheet - specify the sheet.
     * @returns {number} - To get hidden row/column count between two specified index.
     * @hidden
     */
    hiddenCount(startIndex: number, endIndex: number, layout?: string, sheet?: SheetModel): number;
    /**
     * To get row/column viewport index.
     *
     * @param {number} index - specify the index.
     * @param {boolean} isCol - specify the bool value.
     * @returns {number} - To get row/column viewport index.
     * @hidden
     */
    getViewportIndex(index: number, isCol?: boolean): number;
    /**
     * To initialize the services;
     *
     * @returns {void} - To initialize the services.
     * @hidden
     */
    protected preRender(): void;
    private initServices;
    /**
     * To Initialize the component rendering.
     *
     * @returns {void} - To Initialize the component rendering.
     * @hidden
     */
    protected render(): void;
    private renderSpreadsheet;
    /**
     * By default, Spreadsheet shows the spinner for all its actions. To manually show spinner you this method at your needed time.
     *
     * {% codeBlock src='spreadsheet/showSpinner/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - shows spinner
     */
    showSpinner(): void;
    /**
     * To hide showed spinner manually.
     *
     * {% codeBlock src='spreadsheet/hideSpinner/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - To hide showed spinner manually.
     */
    hideSpinner(): void;
    /**
     * To protect the particular sheet.
     *
     * {% codeBlock src='spreadsheet/protectSheet/index.md' %}{% endcodeBlock %}
     *
     * @param {number | string} sheet - Specifies the sheet to protect.
     * @param {ProtectSettingsModel} protectSettings - Specifies the protect sheet options.
     * @default { selectCells: 'false', formatCells: 'false', formatRows: 'false', formatColumns:'false', insertLink:'false' }
     * @param {string} password - Specifies the password to protect.
     * @returns {void} - To protect the particular sheet.
     */
    protectSheet(sheet?: number | string, protectSettings?: ProtectSettingsModel, password?: string): void;
    /**
     * To unprotect the particular sheet.
     *
     * {% codeBlock src='spreadsheet/unprotectSheet/index.md' %}{% endcodeBlock %}
     *
     * @param {number | string} sheet - Specifies the sheet name or index to Unprotect.
     * @returns {void} - To unprotect the particular sheet.
     */
    unprotectSheet(sheet?: number | string): void;
    /**
     * To find the specified cell value.
     *
     * {% codeBlock src='spreadsheet/find/index.md' %}{% endcodeBlock %}
     *
     * @param {FindOptions} args - Specifies the replace value with find args to replace specified cell value.
     * @param {string} args.value - Specifies the value to be find.
     * @param {string} args.mode - Specifies the value to be find within sheet or workbook.
     * @param {string} args.searchBy - Specifies the value to be find by row or column.
     * @param {boolean} args.isCSen - Specifies the find match with case sensitive or not.
     * @param {boolean} args.isEMatch - Specifies the find match with entire match or not.
     * @param {string} args.findOpt - Specifies the next or previous find match.
     * @param {number} args.sheetIndex - Specifies the current sheet to find.
     * @default { mode: 'Sheet', searchBy: 'By Row', isCSen: 'false', isEMatch:'false' }
     * @returns {void} - To find the specified cell value.
     */
    find(args: FindOptions): void | string;
    /**
     * To replace the specified cell value.
     *
     * {% codeBlock src='spreadsheet/replace/index.md' %}{% endcodeBlock %}
     *
     * @param {FindOptions} args - Specifies the replace value with find args to replace specified cell value.
     * @param {string} args.replaceValue - Specifies the replacing value.
     * @param {string} args.replaceBy - Specifies the value to be replaced for one or all.
     * @param {string} args.value - Specifies the value to be replaced
     * @returns {void} - To replace the specified cell value.
     */
    replace(args: FindOptions): void;
    /**
     * To Find All the Match values Address within Sheet or Workbook.
     *
     * {% codeBlock src='spreadsheet/findAll/index.md' %}{% endcodeBlock %}
     *
     * @param {string} value - Specifies the value to find.
     * @param {string} mode - Specifies the value to be find within Sheet/Workbook.
     * @param {boolean} isCSen - Specifies the find match with case sensitive or not.
     * @param {boolean} isEMatch - Specifies the find match with entire match or not.
     * @param {number} sheetIndex - Specifies the sheetIndex. If not specified, it will consider the active sheet.
     * @returns {string[]} - To Find All the Match values Address within Sheet or Workbook.
     */
    findAll(value: string, mode?: string, isCSen?: boolean, isEMatch?: boolean, sheetIndex?: number): string[];
    /**
     * Used to navigate to cell address within workbook.
     *
     * {% codeBlock src='spreadsheet/goTo/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the cell address you need to navigate.
     * You can specify the address in two formats,
     * `{sheet name}!{cell address}` - Switch to specified sheet and navigate to specified cell address.
     * `{cell address}` - Navigate to specified cell address with in the active sheet.
     * @returns {void} - Used to navigate to cell address within workbook.
     */
    goTo(address: string): void;
    /**
     * @hidden
     * @param {number} rowIndex - Specifies the row index.
     * @param {number} colIndex - Specifies the column index.
     * @returns {boolean} - Specifies the boolean value.
     */
    insideViewport(rowIndex: number, colIndex: number): boolean;
    /**
     * Used to resize the Spreadsheet.
     *
     * {% codeBlock src='spreadsheet/resize/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Used to resize the Spreadsheet.
     */
    resize(): void;
    /**
     * To cut the specified cell or cells properties such as value, format, style etc...
     *
     * {% codeBlock src='spreadsheet/cut/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the range address to cut.
     * @returns {Promise<Object>} - To cut the specified cell or cells properties such as value, format, style etc...
     */
    cut(address?: string): Promise<Object>;
    /**
     * To copy the specified cell or cells properties such as value, format, style etc...
     *
     * {% codeBlock src='spreadsheet/copy/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the range address.
     * @returns {Promise<Object>} - To copy the specified cell or cells properties such as value, format, style etc...
     */
    copy(address?: string): Promise<Object>;
    /**
     * This method is used to paste the cut or copied cells in to specified address.
     *
     * {% codeBlock src='spreadsheet/paste/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the cell or range address.
     * @param {PasteSpecialType} type - Specifies the type of paste.
     * @returns {void} - used to paste the cut or copied cells in to specified address.
     */
    paste(address?: string, type?: PasteSpecialType): void;
    /**
     * To update the action which need to perform.
     *
     * {% codeBlock src='spreadsheet/updateAction/index.md' %}{% endcodeBlock %}
     *
     * @param {string} options - It describes an action and event args to perform.
     * @param {string} options.action - specifies an action.
     * @param {string} options.eventArgs - specifies an args to perform an action.
     * @returns {void} - To update the action which need to perform.
     */
    updateAction(options: CollaborativeEditArgs): void;
    private setHeight;
    private setWidth;
    /**
     * Set the width of column.
     *
     * {% codeBlock src='spreadsheet/setColWidth/index.md' %}{% endcodeBlock %}
     *
     * @param {number} width - To specify the width
     * @param {number} colIndex - To specify the colIndex
     * @param {number} sheetIndex - To specify the sheetIndex
     * @returns {void} - Set the width of column.
     */
    setColWidth(width?: number | string, colIndex?: number, sheetIndex?: number): void;
    /**
     * Set the height of row.
     *
     * {% codeBlock src='spreadsheet/setRowHeight/index.md' %}{% endcodeBlock %}
     *
     * @param {number} height - Specifies height needs to be updated. If not specified, it will set the default height 20.
     * @param {number} rowIndex - Specifies the row index. If not specified, it will consider the first row.
     * @param {number} sheetIndex - Specifies the sheetIndex. If not specified, it will consider the active sheet.
     * @param {boolean} edited - Specifies the boolean value.
     * @param {boolean} skipCustomRow - When this parameter is enabled, the method will skip updating the row height if it has already been modified and its 'customHeight' property is set to true.
     * @returns {void} - Set the height of row.
     */
    setRowHeight(height?: number | string, rowIndex?: number, sheetIndex?: number, edited?: boolean, skipCustomRow?: boolean): void;
    /**
     * Allows you to set the height to the single or multiple rows.
     *
     * @param {number} height - Specifies the height for row.
     * @param {string[]} ranges - Specifies the row range to set the height. If the sheet name is not specified then height will apply to
     * the rows in the active sheet. Possible values are
     * * Single row range: ['2'] or ['2:2']
     * * Multiple rows range: ['1:100']
     * * Multiple rows with discontinuous range - ['1:10', '15:25', '30:40']
     * * Multiple rows with different sheets - ['Sheet1!1:50', 'Sheet2!1:50', 'Sheet3!1:50'].
     * @param {boolean} skipCustomRows - When this parameter is enabled, it will skip updating the heights of rows where the height has already been modified, and its 'customHeight' property is set to true.
     * @returns {void}
     */
    setRowsHeight(height?: number, ranges?: string[], skipCustomRows?: boolean): void;
    /**
     * Allows you to set the width to the single or multiple columns.
     *
     * @param {number} width - Specifies the width for column.
     * @param {string[]} ranges - Specifies the column range to set the width. If the sheet name is not specified then width will apply to
     * the column in the active sheet. Possible values are
     * * Single column range: ['F'] or ['F:F']
     * * Multiple columns range: ['A:F']
     * * Multiple columns with discontinuous range - ['A:C', 'G:I', 'K:M']
     * * Multiple columns with different sheets - ['Sheet1!A:H', 'Sheet2!A:H', 'Sheet3!A:H'].
     * @returns {void}
     */
    setColumnsWidth(width?: number, ranges?: string[]): void;
    private setSize;
    /**
     * This method is used to autofit the range of rows or columns
     *
     * {% codeBlock src='spreadsheet/autoFit/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range of rows or columns that needs to be autofit.
     *
     * @returns {void} - used to autofit the range of rows or columns
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * let spreadsheet = new Spreadsheet({
     *      allowResizing: true
     * ...
     * }, '#Spreadsheet');
     * spreadsheet.autoFit('A:D'); // Auto fit from A to D columns
     * Spreadsheet.autoFit('1:4'); // Auto fit from 1 to 4 rows
     *
     * ```
     */
    autoFit(range: string): void;
    /**
     * @hidden
     * @param {string} range - specify the range.
     * @returns {number | boolean} - to get the index.
     *
     */
    getIndexes(range: string): {
        startIdx: number;
        endIdx: number;
        isCol: boolean;
    };
    private getAddress;
    /**
     * To add the hyperlink in the cell
     *
     * {% codeBlock src='spreadsheet/addHyperlink/index.md' %}{% endcodeBlock %}
     *
     * @param {string | HyperlinkModel} hyperlink - to specify the hyperlink
     * @param {string} address - to specify the address
     * @param {string} displayText - to specify the text to be displayed, by default value of the cell will be displayed.
     * @returns {void} - To add the hyperlink in the cell
     */
    addHyperlink(hyperlink: string | HyperlinkModel, address: string, displayText?: string): void;
    /**
     * To remove the hyperlink in the cell
     *
     * {% codeBlock src='spreadsheet/removeHyperlink/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - To specify the range
     * @returns {void} - To remove the hyperlink in the cell
     */
    removeHyperlink(range: string): void;
    /**
     * @hidden
     * @param {string | HyperlinkModel} hyperlink - specify the hyperlink
     * @param {string} address - To specify the address
     * @param {string} displayText - To specify the displayText
     * @param {boolean} isMethod - To specify the bool value
     * @returns {void} - to insert the hyperlink
     */
    insertHyperlink(hyperlink: string | HyperlinkModel, address: string, displayText: string, isMethod: boolean): void;
    /**
     * This method is used to add data validation.
     *
     * {% codeBlock src='spreadsheet/addDataValidation/index.md' %}{% endcodeBlock %}
     *
     * @param {ValidationModel} rules - specifies the validation rules like type, operator, value1, value2, ignoreBlank, inCellDropDown, isHighlighted arguments.
     * @param {string} range - range that needs to be add validation.
     * @returns {void} - used to add data validation.
     */
    addDataValidation(rules: ValidationModel, range?: string): void;
    /**
     * This method is used for remove validation.
     *
     * {% codeBlock src='spreadsheet/removeDataValidation/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be remove validation.
     * @returns {void} - This method is used for remove validation.
     */
    removeDataValidation(range?: string): void;
    /**
     * This method is used to highlight the invalid data.
     *
     * {% codeBlock src='spreadsheet/addInvalidHighlight/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be highlight the invalid data.
     * @returns {void} - This method is used to highlight the invalid data.
     */
    addInvalidHighlight(range?: string): void;
    /**
     * This method is used for remove highlight from invalid data.
     *
     * {% codeBlock src='spreadsheet/removeInvalidHighlight/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be remove invalid highlight.
     * @returns {void} - This method is used for remove highlight from invalid data.
     */
    removeInvalidHighlight(range?: string): void;
    /**
     * This method is used to add conditional formatting.
     *
     * {% codeBlock src='spreadsheet/conditionalFormat/index.md' %}{% endcodeBlock %}
     *
     * @param {ConditionalFormatModel} conditionalFormat - Specify the conditionalFormat.
     * @returns {void} - used to add conditional formatting.
     */
    conditionalFormat(conditionalFormat: ConditionalFormatModel): void;
    /**
     * This method is used for remove conditional formatting.
     *
     * {% codeBlock src='spreadsheet/clearConditionalFormat/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be remove conditional formatting.
     * @returns {void} - used for remove conditional formatting.
     */
    clearConditionalFormat(range?: string): void;
    /**
     * @hidden
     * @returns {void} - set Panel Size.
     */
    setPanelSize(): void;
    /**
     * Opens the Excel file.
     *
     * {% codeBlock src='spreadsheet/open/index.md' %}{% endcodeBlock %}
     *
     * @param {OpenOptions} options - Options for opening the excel file.
     * @returns {void} - Open the Excel file.
     */
    open(options: OpenOptions): void;
    /**
     * Used to hide/show the rows in spreadsheet.
     *
     * @param {number} startIndex - Specifies the start row index.
     * @param {number} endIndex - Specifies the end row index.
     * @param {boolean} hide - To hide/show the rows in specified range.
     * @returns {void} - To hide/show the rows in spreadsheet.
     */
    hideRow(startIndex: number, endIndex?: number, hide?: boolean): void;
    /**
     * Used to hide/show the columns in spreadsheet.
     *
     * @param {number} startIndex - Specifies the start column index.
     * @param {number} endIndex - Specifies the end column index.
     * @param {boolean} hide - Set `true` / `false` to hide / show the columns.
     * @returns {void} - To hide/show the columns in spreadsheet.
     */
    hideColumn(startIndex: number, endIndex?: number, hide?: boolean): void;
    /**
     * This method is used to Clear contents, formats and hyperlinks in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/clear/index.md' %}{% endcodeBlock %}
     *
     * @param {ClearOptions} options - Options for clearing the content, formats and hyperlinks in spreadsheet.
     * @returns {void} -  Used to Clear contents, formats and hyperlinks in spreadsheet
     */
    clear(options: ClearOptions): void;
    /**
     * Used to refresh the spreadsheet in UI level.
     *
     * {% codeBlock src='spreadsheet/refresh/index.md' %}{% endcodeBlock %}
     *
     * @param {boolean} isNew - Specifies `true` / `false` to create new workbook in spreadsheet.
     * @returns {void} -  Used to refresh the spreadsheet.
     */
    refresh(isNew?: boolean): void;
    /**
     * Used to set the image in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/insertImage/index.md' %}{% endcodeBlock %}
     *
     * @param {ImageModel} images - Specifies the options to insert image in spreadsheet.
     * @param {string} range - Specifies the range in spreadsheet.
     * @returns {void} -  Used to set the image in spreadsheet.
     */
    insertImage(images: ImageModel[], range?: string): void;
    /**
     * Used to delete the image in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/deleteImage/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the id of the image element to be deleted.
     * @param {string} range - Specifies the range in spreadsheet.
     * @returns {void} - Used to delete the image in spreadsheet.
     */
    deleteImage(id: string, range?: string): void;
    /**
     * Gets the row header div of the Spreadsheet.
     *
     * @returns {Element} - Gets the row header div of the Spreadsheet.
     * @hidden
     */
    getRowHeaderContent(): HTMLElement;
    /**
     * Gets the column header div of the Spreadsheet.
     *
     * @returns {HTMLElement} - Gets the column header div of the Spreadsheet.
     * @hidden
     */
    getColumnHeaderContent(): HTMLElement;
    /**
     * Gets the main content div of the Spreadsheet.
     *
     * @returns {HTMLElement} - Gets the main content div of the Spreadsheet.
     * @hidden
     */
    getMainContent(): HTMLElement;
    /**
     * Get the select all div of spreadsheet
     *
     * @returns {HTMLElement} - Get the select all div of spreadsheet
     */
    getSelectAllContent(): HTMLElement;
    /**
     * Gets the horizontal scroll element of the Spreadsheet.
     *
     * @returns {HTMLElement} - Gets the column header div of the Spreadsheet.
     * @hidden
     */
    getScrollElement(): HTMLElement;
    /**
     * Get the main content table element of spreadsheet.
     *
     * @returns {HTMLTableElement} -Get the main content table element of spreadsheet.
     * @hidden
     */
    getContentTable(): HTMLTableElement;
    /**
     * Get the row header table element of spreadsheet.
     *
     * @returns {HTMLTableElement} - Get the row header table element of spreadsheet.
     * @hidden
     */
    getRowHeaderTable(): HTMLTableElement;
    /**
     * Get the column header table element of spreadsheet.
     *
     * @returns {HTMLTableElement} - Get the column header table element of spreadsheet.
     * @hidden
     */
    getColHeaderTable(): HTMLTableElement;
    /**
     * To get the backup element count for row and column virtualization.
     *
     * @param {'row' | 'col'} layout -  specify the layout.
     * @returns {number} - To get the backup element count for row and column virtualization.
     * @hidden
     */
    getThreshold(layout: 'row' | 'col'): number;
    /**
     * @hidden
     * @returns {boolean} - Returns the bool value.
     */
    isMobileView(): boolean;
    /**
     * @hidden
     * @param {number} sheetId - Specifies the sheet id.
     * @param {number} rowIndex - specify the row index.
     * @param {number} colIndex - specify the col index.
     * @param {string} formulaCellReference - specify the col index.
     * @param {boolean} refresh - specify the col index.
     * @param {boolean} isUnique - specifies the unique formula.
     * @param {boolean} isSubtotal - specifies the subtotal formula.
     * @returns {string | number} - to get Value Row Col.
     */
    getValueRowCol(sheetId: number, rowIndex: number, colIndex: number, formulaCellReference?: string, refresh?: boolean, isUnique?: boolean, isSubtotal?: boolean): string | number;
    /**
     * Updates the properties of a specified cell.
     *
     * {% codeBlock src='spreadsheet/updateCell/index.md' %}{% endcodeBlock %}
     *
     * @param {CellModel} cell - The properties to update for the specified cell.
     * @param {string} address - The address of the cell to update. If not provided, the active cell's address will be used.
     * @param {boolean} enableDependentCellUpdate - Specifies whether dependent cells should also be updated. Default value is <c>true</c>.
     * @returns {void} - This method does not return a value.
     */
    updateCell(cell: CellModel, address?: string, enableDependentCellUpdate?: boolean): void;
    /**
     * Updates the properties of a specified cell.
     *
     * @param {CellModel} cell - The properties to update for the specified cell.
     * @param {string} address - The address of the cell to update. If not provided, the active cell's address will be used.
     * @param {boolean} isDependentUpdate - Specifies whether dependent cells should also be updated.
     * @param {UndoRedoEventArgs} cellInformation - It holds the undoRedoCollections.
     * @param {boolean} isRedo - It holds the undo redo information.
     * @param {boolean} isPublic - It holds whether updateCell public method is used.
     * @returns {void} - This method does not return a value.
     *
     * @hidden
     */
    updateCellInfo(cell: CellModel, address?: string, isDependentUpdate?: boolean, cellInformation?: UndoRedoEventArgs, isRedo?: boolean, isPublic?: boolean): void;
    /**
     * Used to get a row data from the data source with updated cell value.
     *
     * {% codeBlock src='spreadsheet/getRowData/index.md' %}{% endcodeBlock %}
     *
     * @param {number} index - Specifies the row index.
     * @param {number} sheetIndex - Specifies the sheet index. By default, it consider the active sheet index.
     * @returns {Object[]} - Return row data.
     */
    getRowData(index?: number, sheetIndex?: number): Object[];
    /**
     * Sorts the range of cells in the active sheet.
     *
     * {% codeBlock src='spreadsheet/sort/index.md' %}{% endcodeBlock %}
     *
     * @param {SortOptions} sortOptions - options for sorting.
     * @param {string} range - address of the data range.
     * @returns {Promise<SortEventArgs>} - Sorts the range of cells in the active sheet.
     */
    sort(sortOptions?: SortOptions, range?: string): Promise<SortEventArgs>;
    /**
     * @hidden
     * @param {number} sheetId - specify the sheet id.
     * @param {string | number} value - Specify the value.
     * @param {number} rowIndex - Specify the row index.
     * @param {number} colIndex - Specify the col index.
     * @param {string} formula - Specify the col index.
     * @param {boolean} isRandomFormula - Specify the random formula.
     * @returns {void} - To set value for row and col.
     */
    setValueRowCol(sheetId: number, value: string | number, rowIndex: number, colIndex: number, formula?: string, isRandomFormula?: boolean): void;
    /**
     * Get component name.
     *
     * @returns {string} - Get component name.
     * @hidden
     */
    getModuleName(): string;
    /**
     * The `calculateNow` method is used to calculate any uncalculated formulas in a spreadsheet.
     * This method accepts an option to specify whether the calculation should be performed for the entire workbook or a specific sheet.
     *
     * @param {string} [scope] - Specifies the scope of the calculation. Acceptable values are `Sheet` or `Workbook`.
     * If not provided, the default scope is `Sheet`.
     * * `Sheet`: Calculates formulas only on the current sheet or a specified sheet.
     * * `Workbook`: Calculates formulas across the entire workbook.
     * @param {number | string} [sheet] - The index or name of the sheet to calculate if the scope is set to `Sheet`.
     * If not provided and the scope is `Sheet`, the current active sheet will be used.
     * @returns {Promise<void>} - A promise that resolves when the calculation is complete.
     * The promise does not return a specific value, but it can be used to perform actions after the calculation has finished.
     */
    calculateNow(scope?: string, sheet?: number | string): Promise<void>;
    /**
     * @hidden
     * @param {Element} td - Specify the element.
     * @param {NumberFormatArgs} args - specify the args.
     * @returns {void} - to refresh the node.
     */
    refreshNode(td: Element, args?: NumberFormatArgs): void;
    /**
     * @hidden
     * @param {CellStyleModel} style - specify the style.
     * @param {number} lines - Specify the lines.
     * @param {number} borderWidth - Specify the borderWidth.
     * @returns {number} - To calculate Height
     */
    calculateHeight(style: CellStyleModel, lines?: number, borderWidth?: number): number;
    /**
     * @hidden
     * @param {number} startIdx - specify the start index.
     * @param {number} endIdx - Specify the end index.
     * @param {string} layout - Specify the rows.
     * @param {boolean} finite - Specifies the scroll mode.
     * @returns {number[]} - To skip the hidden rows.
     */
    skipHidden(startIdx: number, endIdx: number, layout?: string, finite?: boolean): number[];
    /**
     * @hidden
     * @param {HTMLElement} nextTab - Specify the element.
     * @param {string} selector - Specify the selector
     * @returns {void} - To update the active border.
     */
    updateActiveBorder(nextTab: HTMLElement, selector?: string): void;
    /**
     * To perform the undo operation in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/undo/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - To perform the undo operation in spreadsheet.
     */
    undo(): void;
    /**
     * To perform the redo operation in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/redo/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - To perform the redo operation in spreadsheet.
     */
    redo(): void;
    /**
     * To update the undo redo collection in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/updateUndoRedoCollection/index.md' %}{% endcodeBlock %}
     *
     * @param {object} args - options for undo redo.
     * @returns {void} - To update the undo redo collection in spreadsheet.
     */
    updateUndoRedoCollection(args: {
        [key: string]: Object;
    }): void;
    /**
     * Adds the defined name to the Spreadsheet.
     *
     * {% codeBlock src='spreadsheet/addDefinedName/index.md' %}{% endcodeBlock %}
     *
     * @param {DefineNameModel} definedName - Specifies the name, scope, comment, refersTo.
     * @returns {boolean} - Return the added status of the defined name.
     */
    addDefinedName(definedName: DefineNameModel): boolean;
    /**
     * Removes the defined name from the Spreadsheet.
     *
     * {% codeBlock src='spreadsheet/removeDefinedName/index.md' %}{% endcodeBlock %}
     *
     * @param {string} definedName - Specifies the name.
     * @param {string} scope - Specifies the scope of the defined name.
     * @returns {boolean} - Return the removed status of the defined name.
     */
    removeDefinedName(definedName: string, scope: string): boolean;
    private mouseClickHandler;
    private mouseDownHandler;
    private keyUpHandler;
    private keyDownHandler;
    private freeze;
    private freezePaneUpdated;
    /**
     * Binding events to the element while component creation.
     *
     * @returns {void} - Binding events to the element while component creation.
     */
    private wireEvents;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     *
     * {% codeBlock src='spreadsheet/destroy/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Destroys the component.
     */
    destroy(): void;
    /**
     * Unbinding events from the element while component destroy.
     *
     * @returns {void} - Unbinding events from the element while component destroy.
     */
    private unwireEvents;
    private refreshInsertDelete;
    /**
     * To add context menu items.
     *
     * {% codeBlock src='spreadsheet/addContextMenu/index.md' %}{% endcodeBlock %}
     *
     * @param {MenuItemModel[]} items - Items that needs to be added.
     * @param {string} text - Item before / after that the element to be inserted.
     * @param {boolean} insertAfter - Set `false` if the `items` need to be inserted before the `text`.
     * By default, `items` are added after the `text`.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     * @returns {void} - To add context menu items.
     */
    addContextMenuItems(items: MenuItemModel[], text: string, insertAfter?: boolean, isUniqueId?: boolean): void;
    /**
     * To remove existing context menu items.
     *
     * {% codeBlock src='spreadsheet/removeContextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Items that needs to be removed.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     * @returns {void} - To remove existing context menu items.
     */
    removeContextMenuItems(items: string[], isUniqueId?: boolean): void;
    /**
     * To enable / disable context menu items.
     *
     * {% codeBlock src='spreadsheet/enableContextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Items that needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the menu items.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     * @returns {void} - To enable / disable context menu items.
     */
    enableContextMenuItems(items: string[], enable?: boolean, isUniqueId?: boolean): void;
    /**
     * To enable / disable file menu items.
     *
     * {% codeBlock src='spreadsheet/enableFileMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Items that needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the menu items.
     * @param {boolean} isUniqueId - Set `true` if the given file menu items `text` is a unique id.
     * @returns {void} - To enable / disable file menu items.
     */
    enableFileMenuItems(items: string[], enable?: boolean, isUniqueId?: boolean): void;
    /**
     * To show/hide the file menu items in Spreadsheet ribbon.
     *
     * {% codeBlock src='spreadsheet/hideFileMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Specifies the file menu items text which is to be show/hide.
     * @param {boolean} hide - Set `true` / `false` to hide / show the file menu items.
     * @param {boolean} isUniqueId - Set `true` if the given file menu items `text` is a unique id.
     * @returns {void} - To show/hide the file menu items in Spreadsheet ribbon.
     */
    hideFileMenuItems(items: string[], hide?: boolean, isUniqueId?: boolean): void;
    /**
     * To add custom file menu items.
     *
     * {% codeBlock src='spreadsheet/addFileMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {MenuItemModel[]} items - Specifies the ribbon file menu items to be inserted.
     * @param {string} text - Specifies the existing file menu item text before / after which the new file menu items to be inserted.
     * @param {boolean} insertAfter - Set `false` if the `items` need to be inserted before the `text`.
     * By default, `items` are added after the `text`.
     * @param {boolean} isUniqueId - Set `true` if the given file menu items `text` is a unique id.
     * @returns {void} - To add custom file menu items.
     */
    addFileMenuItems(items: MenuItemModel[], text: string, insertAfter?: boolean, isUniqueId?: boolean): void;
    /**
     * To show/hide the existing ribbon tabs.
     *
     * {% codeBlock src='spreadsheet/hideRibbonTabs/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} tabs - Specifies the tab header text which needs to be shown/hidden.
     * @param {boolean} hide - Set `true` / `false` to hide / show the ribbon tabs.
     * @returns {void} - To show/hide the existing ribbon tabs.
     */
    hideRibbonTabs(tabs: string[], hide?: boolean): void;
    /**
     * To enable / disable the existing ribbon tabs.
     *
     * {% codeBlock src='spreadsheet/enableRibbonTabs/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} tabs - Specifies the tab header text which needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the ribbon tabs.
     * @returns {void} - To enable / disable the existing ribbon tabs.
     */
    enableRibbonTabs(tabs: string[], enable?: boolean): void;
    /**
     * To add custom ribbon tabs.
     *
     * {% codeBlock src='spreadsheet/addRibbonTabs/index.md' %}{% endcodeBlock %}
     *
     * @param {RibbonItemModel[]} items - Specifies the ribbon tab items to be inserted.
     * @param {string} insertBefore - Specifies the existing ribbon header text before which the new tabs will be inserted.
     * If not specified, the new tabs will be inserted at the end.
     * @returns {void} - To add custom ribbon tabs.
     */
    addRibbonTabs(items: RibbonItemModel[], insertBefore?: string): void;
    /**
     * Enables or disables the specified ribbon toolbar items or all ribbon items.
     *
     * {% codeBlock src='spreadsheet/enableToolbarItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string} tab - Specifies the ribbon tab header text under which the toolbar items need to be enabled / disabled.
     * @param {number[]} items - Specifies the toolbar item indexes / unique id's which needs to be enabled / disabled.
     * If it is not specified the entire toolbar items will be enabled / disabled.
     * @param  {boolean} enable - Boolean value that determines whether the toolbar items should be enabled or disabled.
     * @returns {void} - Enables or disables the specified ribbon toolbar items or all ribbon items.
     */
    enableToolbarItems(tab: string, items?: number[] | string[], enable?: boolean): void;
    /**
     * To show/hide the existing Spreadsheet ribbon toolbar items.
     *
     * {% codeBlock src='spreadsheet/hideToolbarItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string} tab - Specifies the ribbon tab header text under which the specified items needs to be hidden / shown.
     * @param {number[]} indexes - Specifies the toolbar indexes which needs to be shown/hidden from UI.
     * @param {boolean} hide - Set `true` / `false` to hide / show the toolbar items.
     * @returns {void} - To show/hide the existing Spreadsheet ribbon toolbar items.
     */
    hideToolbarItems(tab: string, indexes: number[], hide?: boolean): void;
    /**
     * To add the custom items in Spreadsheet ribbon toolbar.
     *
     * {% codeBlock src='spreadsheet/addToolbarItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string} tab - Specifies the ribbon tab header text under which the specified items will be inserted.
     * @param {ItemModel[]} items - Specifies the ribbon toolbar items that needs to be inserted.
     * @param {number} index - Specifies the index text before which the new items will be inserted.
     * If not specified, the new items will be inserted at the end of the toolbar.
     * @returns {void} - To add the custom items in Spreadsheet ribbon toolbar.
     */
    addToolbarItems(tab: string, items: ItemModel[], index?: number): void;
    /**
     * Selects the cell / range of cells with specified address.
     *
     * {% codeBlock src='spreadsheet/selectRange/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the range address.
     * @returns {void} - To select the range.
     */
    selectRange(address: string): void;
    /**
     * Allows you to select a chart from the active sheet. To select a specific chart from the active sheet, pass the chart `id`.
     * If you pass an empty argument, the chart present in the active cell will be selected. If the active cell does not have a chart,
     * the initially rendered chart will be selected from the active sheet.
     *
     * @param {string} id - Specifies the chart `id` to be selected.
     * @returns {void}
     */
    selectChart(id?: string): void;
    /**
     * Allows you to select an image from the active sheet. To select a specific image from the active sheet, pass the image `id`.
     * If you pass an empty argument, the image present in the active cell will be selected. If the active cell does not have an image,
     * the initially rendered image will be selected from the active sheet.
     *
     * @param {string} id - Specifies the image `id` to be selected.
     * @returns {void}
     */
    selectImage(id?: string): void;
    private selectOverlay;
    /**
     * Allows you to remove a selection from the active chart.
     *
     * @returns {void}
     */
    deselectChart(): void;
    /**
     * Allows you to remove a selection from the active image.
     *
     * @returns {void}
     */
    deselectImage(): void;
    /**
     * Start edit the active cell.
     *
     * {% codeBlock src='spreadsheet/startEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Start edit the active cell.
     */
    startEdit(): void;
    /**
     * Cancels the edited state, this will not update any value in the cell.
     *
     * {% codeBlock src='spreadsheet/closeEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Cancels the edited state, this will not update any value in the cell.
     */
    closeEdit(): void;
    /**
     * If Spreadsheet is in editable state, you can save the cell by invoking endEdit.
     *
     * {% codeBlock src='spreadsheet/endEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - If Spreadsheet is in editable state, you can save the cell by invoking endEdit.
     */
    endEdit(): void;
    /**
     * This method is used to print the active sheet or the entire workbook.
     *
     * @param {printOptions} printOptions - Represents the settings to customize the print type, row and column headers and gridlines in the printing operation.
     * @returns {void}
     */
    print(printOptions?: PrintOptions): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SpreadsheetModel} newProp - Specify the new properties
     * @param  {SpreadsheetModel} oldProp - Specify the old properties
     * @returns {void} - Called internally if any of the property value changed.
     * @hidden
     */
    onPropertyChanged(newProp: SpreadsheetModel, oldProp: SpreadsheetModel): void;
    /**
     * To provide the array of modules needed for component rendering.
     *
     * @returns {ModuleDeclaration[]} - To provide the array of modules needed for component rendering.
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Appends the control within the given HTML Div element.
     *
     * {% codeBlock src='spreadsheet/appendTo/index.md' %}{% endcodeBlock %}
     *
     * @param {string | HTMLElement} selector - Target element where control needs to be appended.
     * @returns {void} - Appends the control within the given HTML Div element.
     */
    appendTo(selector: string | HTMLElement): void;
    /**
     * Filters the range of cells in the sheet.
     *
     * @hidden
     * @param {FilterOptions} filterOptions - specifiy the FilterOptions.
     * @param {string} range - Specify the range
     * @returns {Promise<FilterEventArgs>} - Filters the range of cells in the sheet.
     */
    filter(filterOptions?: FilterOptions, range?: string): Promise<FilterEventArgs>;
    /**
     * Clears the filter changes of the sheet.
     *
     * {% codeBlock src='spreadsheet/clearFilter/index.md' %}{% endcodeBlock %}
     *
     * @param {string} field - Specify the field.
     * @param {number} sheetIndex - Specify the index of the sheet.
     * @returns {void} - To clear the filter.
     */
    clearFilter(field?: string, sheetIndex?: number): void;
    /**
     * Applies the filter UI in the range of cells in the sheet.
     *
     * {% codeBlock src='spreadsheet/applyFilter/index.md' %}{% endcodeBlock %}
     *
     * @param {PredicateModel[]} predicates - Specifies the predicates.
     * @param {string} range - Specify the range.
     * @returns {Promise<void>} - to apply the filter.
     */
    applyFilter(predicates?: PredicateModel[], range?: string): Promise<void>;
    /**
     * To add custom library function.
     *
     *  {% codeBlock src='spreadsheet/addCustomFunction/index.md' %}{% endcodeBlock %}
     *
     * @param {string} functionHandler - Custom function handler name
     * @param {string} functionName - Custom function name
     * @param  {string} formulaDescription - Specifies formula description.
     * @returns {void} - To add custom function.
     */
    addCustomFunction(functionHandler: string | Function, functionName?: string, formulaDescription?: string): void;
    /**
     * Sets or releases the read-only status for a specified range in the given sheet.
     *
     * @param {boolean} readOnly - A boolean indicating whether the range should be set as read-only (true) or editable (false).
     * @param {string} range - The range to be set as read-only. It can be a single cell, a range of cells (e.g., "A1:B5"), a column (e.g., "C"), or a row (e.g., "10").
     * @param {number} sheetIndex - The index of the sheet where the range is located. If not provided, it defaults to the active sheet index.
     * @returns {void} - Sets the read-only status for a specified range in the given sheet.
     *
     */
    setRangeReadOnly(readOnly: boolean, range: string, sheetIndex: number): void;
}
