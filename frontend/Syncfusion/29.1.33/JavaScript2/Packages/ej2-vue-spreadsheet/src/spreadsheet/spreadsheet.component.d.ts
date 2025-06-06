import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Spreadsheet, SpreadsheetModel } from '@syncfusion/ej2-spreadsheet';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-spreadsheet` represents the VueJS Spreadsheet Component.
 * ```vue
 * <ejs-spreadsheet></ejs-spreadsheet>
 * ```
 */
export declare let SpreadsheetComponent: DefineVueComponent<SpreadsheetModel>;
export declare type SpreadsheetComponent = typeof ComponentBase & {
    ej2Instances: Spreadsheet;
    isVue3: boolean;
    isLazyUpdate: Boolean;
    plugins: any[];
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    Unfreeze(sheet?: number | string): void;
    addContextMenuItems(items: Object[], text: string, insertAfter: boolean, isUniqueId?: boolean): void;
    addCustomFunction(functionHandler: string | Object, functionName?: string, formulaDescription?: string): void;
    addDataValidation(rules: Object, range?: string): void;
    addDefinedName(definedName: Object): boolean;
    addFileMenuItems(items: Object[], text: string, insertAfter: boolean, isUniqueId?: boolean): void;
    addHyperlink(hyperlink: string | Object, address: string, displayText?: string): void;
    addInvalidHighlight(range?: string): void;
    addRibbonTabs(items: Object[], insertBefore?: string): void;
    addToolbarItems(tab: string, items: Object[], index?: number): void;
    applyFilter(predicates?: Object[], range?: string): Object;
    autoFill(fillRange: string, dataRange?: string, direction?: Object, fillType?: Object): void;
    autoFit(range: string): void;
    calculateNow(scope?: string, sheet?: number | string): Object;
    cellFormat(style: Object, range?: string): void;
    clear(options: Object): void;
    clearConditionalFormat(range?: string): void;
    clearFilter(field?: string, sheetIndex?: number): void;
    closeEdit(): void;
    computeExpression(formula: string): string | number;
    conditionalFormat(conditionalFormat: Object): void;
    copy(address?: string): Object;
    cut(address?: string): Object;
    delete(startIndex?: number, endIndex?: number, model?: Object, sheet?: number | string): void;
    deleteChart(id?: string): void;
    deleteImage(id: string, range?: string): void;
    deselectChart(): void;
    deselectImage(): void;
    destroy(): void;
    duplicateSheet(sheetIndex?: number): void;
    enableContextMenuItems(items: string[], enable: boolean, isUniqueId?: boolean): void;
    enableFileMenuItems(items: string[], enable: boolean, isUniqueId?: boolean): void;
    enableRibbonTabs(tabs: string[], enable: boolean): void;
    enableToolbarItems(tab: string, items?: number[] | string[], enable?: boolean): void;
    endEdit(): void;
    find(args: Object): void | string;
    findAll(value: string, mode?: string, isCSen?: boolean, isEMatch?: boolean, sheetIndex?: number): string[];
    freezePanes(row: number, column: number, sheet?: number | string): void;
    getData(address: string): Object;
    getDisplayText(cell: Object): string;
    getRowData(index?: number, sheetIndex?: number): Object[];
    getSelectAllContent(): Object;
    goTo(address: string): void;
    hideColumn(startIndex: number, endIndex: number, hide: boolean): void;
    hideFileMenuItems(items: string[], hide: boolean, isUniqueId?: boolean): void;
    hideRibbonTabs(tabs: string[], hide: boolean): void;
    hideRow(startIndex: number, endIndex: number, hide: boolean): void;
    hideSpinner(): void;
    hideToolbarItems(tab: string, indexes: number[], hide: boolean): void;
    insertChart(chart?: Object[]): void;
    insertColumn(startColumn?: number | Object[], endColumn?: number, sheet?: number | string): void;
    insertImage(images: Object[], range?: string): void;
    insertRow(startRow?: number | Object[], endRow?: number, sheet?: number | string): void;
    insertSheet(startSheet?: number | Object[], endSheet?: number): void;
    isValidCell(cellAddress?: string): boolean;
    lockCells(range?: string, isLocked?: boolean): void;
    merge(range?: string, type?: Object): void;
    moveSheet(position: number, sheetIndexes?: number[]): void;
    numberFormat(format: string, range?: string): void;
    open(options: Object): void;
    openFromJson(options: undefined, jsonConfig?: Object): void;
    paste(address?: string, type?: Object): void;
    print(printOptions: Object): void;
    protectSheet(sheet?: number | string, protectSettings?: Object, password?: string): void;
    redo(): void;
    refresh(isNew?: boolean): void;
    removeContextMenuItems(items: string[], isUniqueId?: boolean): void;
    removeDataValidation(range?: string): void;
    removeDefinedName(definedName: string, scope: string): boolean;
    removeHyperlink(range: string): void;
    removeInvalidHighlight(range?: string): void;
    replace(args: Object): void;
    resize(): void;
    save(saveOptions: Object, jsonConfig?: Object): void;
    saveAsJson(jsonConfig?: Object): Object;
    selectChart(id?: string): void;
    selectImage(id?: string): void;
    selectRange(address: string): void;
    setBorder(style: Object, range?: string, type?: Object, isUndoRedo?: boolean): void;
    setColWidth(width: number | string, colIndex: number, sheetIndex?: number): void;
    setColumnsWidth(width: number, ranges?: string[]): void;
    setRangeReadOnly(readOnly: boolean, range: string, sheetIndex: number): void;
    setRowHeight(height: number | string, rowIndex: number, sheetIndex?: number, edited?: boolean, skipCustomRow?: boolean): void;
    setRowsHeight(height: number, ranges?: string[], skipCustomRows?: boolean): void;
    showSpinner(): void;
    sort(sortOptions?: Object, range?: string): Object;
    startEdit(): void;
    unMerge(range?: string): void;
    undo(): void;
    unfreezePanes(sheet?: number | string): void;
    unprotectSheet(sheet?: number | string): void;
    updateAction(options: Object): void;
    updateCell(cell: Object, address?: string, enableDependentCellUpdate?: boolean): void;
    updateRange(range: Object, sheetIndex: number): void;
    updateUndoRedoCollection(args: undefined): void;
    wrap(address: string, wrap: boolean): void;
};
export declare const SpreadsheetPlugin: {
    name: string;
    install(Vue: any): void;
};
