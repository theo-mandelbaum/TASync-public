import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { Grid, Filter, Page, Selection, Sort, Group, Reorder, RowDD, DetailRow, Toolbar, Aggregate, Search, VirtualScroll, Edit, Resize, ExcelExport, PdfExport, CommandColumn, ContextMenu, Freeze, ColumnMenu, ColumnChooser, ForeignKey, InfiniteScroll, LazyLoadGroup, Pager } from '@syncfusion/ej2-grids';
export * from '@syncfusion/ej2-grids';
import { CommonModule } from '@angular/common';

let input$3 = ['allowEditing', 'allowFiltering', 'allowGrouping', 'allowReordering', 'allowResizing', 'allowSearching', 'allowSorting', 'autoFit', 'clipMode', 'columns', 'commands', 'customAttributes', 'dataSource', 'defaultValue', 'disableHtmlEncode', 'displayAsCheckBox', 'edit', 'editTemplate', 'editType', 'enableGroupByFormat', 'field', 'filter', 'filterBarTemplate', 'filterTemplate', 'foreignKeyField', 'foreignKeyValue', 'format', 'formatter', 'freeze', 'headerTemplate', 'headerText', 'headerTextAlign', 'headerValueAccessor', 'hideAtMedia', 'index', 'isFrozen', 'isIdentity', 'isPrimaryKey', 'lockColumn', 'maxWidth', 'minWidth', 'showColumnMenu', 'showInColumnChooser', 'sortComparer', 'template', 'templateOptions', 'textAlign', 'type', 'uid', 'validationRules', 'valueAccessor', 'visible', 'width'];
let outputs$5 = [];
/**
 * `e-stacked-column` directive represent the stacked column of the Angular Grid.
 * It must be contained in a StackedColumns component(`e-stacked-columns`).
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column headerText='Details' width='100'>
 *       <e-stacked-columns>
 *         <e-stacked-column field='Name' width='140'></e-stacked-column>
 *       </e-stacked-columns>
 *     </e-column>
 *   </e-columns>
 * </ejs-grid>
 * ```
 */
class StackedColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$5);
        this.directivePropList = input$3;
    }
}
StackedColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StackedColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
StackedColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StackedColumnDirective, selector: "ejs-grid>e-columns>e-column>e-stacked-columns>e-stacked-column", inputs: { allowEditing: "allowEditing", allowFiltering: "allowFiltering", allowGrouping: "allowGrouping", allowReordering: "allowReordering", allowResizing: "allowResizing", allowSearching: "allowSearching", allowSorting: "allowSorting", autoFit: "autoFit", clipMode: "clipMode", columns: "columns", commands: "commands", customAttributes: "customAttributes", dataSource: "dataSource", defaultValue: "defaultValue", disableHtmlEncode: "disableHtmlEncode", displayAsCheckBox: "displayAsCheckBox", edit: "edit", editTemplate: "editTemplate", editType: "editType", enableGroupByFormat: "enableGroupByFormat", field: "field", filter: "filter", filterBarTemplate: "filterBarTemplate", filterTemplate: "filterTemplate", foreignKeyField: "foreignKeyField", foreignKeyValue: "foreignKeyValue", format: "format", formatter: "formatter", freeze: "freeze", headerTemplate: "headerTemplate", headerText: "headerText", headerTextAlign: "headerTextAlign", headerValueAccessor: "headerValueAccessor", hideAtMedia: "hideAtMedia", index: "index", isFrozen: "isFrozen", isIdentity: "isIdentity", isPrimaryKey: "isPrimaryKey", lockColumn: "lockColumn", maxWidth: "maxWidth", minWidth: "minWidth", showColumnMenu: "showColumnMenu", showInColumnChooser: "showInColumnChooser", sortComparer: "sortComparer", template: "template", templateOptions: "templateOptions", textAlign: "textAlign", type: "type", uid: "uid", validationRules: "validationRules", valueAccessor: "valueAccessor", visible: "visible", width: "width" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "commandsTemplate", first: true, predicate: ["commandsTemplate"], descendants: true }, { propertyName: "filter_itemTemplate", first: true, predicate: ["filterItemTemplate"], descendants: true }, { propertyName: "editTemplate", first: true, predicate: ["editTemplate"], descendants: true }, { propertyName: "filterTemplate", first: true, predicate: ["filterTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], StackedColumnDirective.prototype, "template", void 0);
__decorate([
    Template()
], StackedColumnDirective.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], StackedColumnDirective.prototype, "commandsTemplate", void 0);
__decorate([
    Template()
], StackedColumnDirective.prototype, "filter_itemTemplate", void 0);
__decorate([
    Template()
], StackedColumnDirective.prototype, "editTemplate", void 0);
__decorate([
    Template()
], StackedColumnDirective.prototype, "filterTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StackedColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-columns>e-column>e-stacked-columns>e-stacked-column',
                    inputs: input$3,
                    outputs: outputs$5,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], commandsTemplate: [{
                type: ContentChild,
                args: ['commandsTemplate']
            }], filter_itemTemplate: [{
                type: ContentChild,
                args: ['filterItemTemplate']
            }], editTemplate: [{
                type: ContentChild,
                args: ['editTemplate']
            }], filterTemplate: [{
                type: ContentChild,
                args: ['filterTemplate']
            }] } });
/**
 * StackedColumn Array Directive
 * @private
 */
class StackedColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
StackedColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StackedColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
StackedColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StackedColumnsDirective, selector: "ejs-grid>e-columns>e-column>e-stacked-columns", queries: [{ propertyName: "children", predicate: StackedColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StackedColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-columns>e-column>e-stacked-columns',
                    queries: {
                        children: new ContentChildren(StackedColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$2 = ['allowEditing', 'allowFiltering', 'allowGrouping', 'allowReordering', 'allowResizing', 'allowSearching', 'allowSorting', 'autoFit', 'clipMode', 'columns', 'commands', 'customAttributes', 'dataSource', 'defaultValue', 'disableHtmlEncode', 'displayAsCheckBox', 'edit', 'editTemplate', 'editType', 'enableGroupByFormat', 'field', 'filter', 'filterBarTemplate', 'filterTemplate', 'foreignKeyField', 'foreignKeyValue', 'format', 'formatter', 'freeze', 'headerTemplate', 'headerText', 'headerTextAlign', 'headerValueAccessor', 'hideAtMedia', 'index', 'isFrozen', 'isIdentity', 'isPrimaryKey', 'lockColumn', 'maxWidth', 'minWidth', 'showColumnMenu', 'showInColumnChooser', 'sortComparer', 'template', 'templateOptions', 'textAlign', 'type', 'uid', 'validationRules', 'valueAccessor', 'visible', 'width'];
let outputs$4 = [];
/**
 * `e-column` directive represent a column of the Angular Grid.
 * It must be contained in a Grid component(`ejs-grid`).
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='100'></e-column>
 *    <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 * </ejs-grid>
 * ```
 */
class ColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['columns'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$4);
        this.directivePropList = input$2;
    }
}
ColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnDirective, selector: "ejs-grid>e-columns>e-column", inputs: { allowEditing: "allowEditing", allowFiltering: "allowFiltering", allowGrouping: "allowGrouping", allowReordering: "allowReordering", allowResizing: "allowResizing", allowSearching: "allowSearching", allowSorting: "allowSorting", autoFit: "autoFit", clipMode: "clipMode", columns: "columns", commands: "commands", customAttributes: "customAttributes", dataSource: "dataSource", defaultValue: "defaultValue", disableHtmlEncode: "disableHtmlEncode", displayAsCheckBox: "displayAsCheckBox", edit: "edit", editTemplate: "editTemplate", editType: "editType", enableGroupByFormat: "enableGroupByFormat", field: "field", filter: "filter", filterBarTemplate: "filterBarTemplate", filterTemplate: "filterTemplate", foreignKeyField: "foreignKeyField", foreignKeyValue: "foreignKeyValue", format: "format", formatter: "formatter", freeze: "freeze", headerTemplate: "headerTemplate", headerText: "headerText", headerTextAlign: "headerTextAlign", headerValueAccessor: "headerValueAccessor", hideAtMedia: "hideAtMedia", index: "index", isFrozen: "isFrozen", isIdentity: "isIdentity", isPrimaryKey: "isPrimaryKey", lockColumn: "lockColumn", maxWidth: "maxWidth", minWidth: "minWidth", showColumnMenu: "showColumnMenu", showInColumnChooser: "showInColumnChooser", sortComparer: "sortComparer", template: "template", templateOptions: "templateOptions", textAlign: "textAlign", type: "type", uid: "uid", validationRules: "validationRules", valueAccessor: "valueAccessor", visible: "visible", width: "width" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "commandsTemplate", first: true, predicate: ["commandsTemplate"], descendants: true }, { propertyName: "filter_itemTemplate", first: true, predicate: ["filterItemTemplate"], descendants: true }, { propertyName: "editTemplate", first: true, predicate: ["editTemplate"], descendants: true }, { propertyName: "filterTemplate", first: true, predicate: ["filterTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: StackedColumnsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ColumnDirective.prototype, "template", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "commandsTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "filter_itemTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "editTemplate", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "filterTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-columns>e-column',
                    inputs: input$2,
                    outputs: outputs$4,
                    queries: {
                        childColumns: new ContentChild(StackedColumnsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], commandsTemplate: [{
                type: ContentChild,
                args: ['commandsTemplate']
            }], filter_itemTemplate: [{
                type: ContentChild,
                args: ['filterItemTemplate']
            }], editTemplate: [{
                type: ContentChild,
                args: ['editTemplate']
            }], filterTemplate: [{
                type: ContentChild,
                args: ['filterTemplate']
            }] } });
/**
 * Column Array Directive
 * @private
 */
class ColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
ColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnsDirective, selector: "ejs-grid>e-columns", queries: [{ propertyName: "children", predicate: ColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-columns',
                    queries: {
                        children: new ContentChildren(ColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$1 = ['columnName', 'customAggregate', 'field', 'footerTemplate', 'format', 'groupCaptionTemplate', 'groupFooterTemplate', 'type'];
let outputs$3 = [];
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the Angular Grid.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'></e-column>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-grid>
 * ```
 */
class AggregateColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$3);
        this.directivePropList = input$1;
    }
}
AggregateColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AggregateColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnDirective, selector: "ejs-grid>e-aggregates>e-aggregate>e-columns>e-column", inputs: { columnName: "columnName", customAggregate: "customAggregate", field: "field", footerTemplate: "footerTemplate", format: "format", groupCaptionTemplate: "groupCaptionTemplate", groupFooterTemplate: "groupFooterTemplate", type: "type" }, queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "groupFooterTemplate", first: true, predicate: ["groupFooterTemplate"], descendants: true }, { propertyName: "groupCaptionTemplate", first: true, predicate: ["groupCaptionTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AggregateColumnDirective.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], AggregateColumnDirective.prototype, "groupFooterTemplate", void 0);
__decorate([
    Template()
], AggregateColumnDirective.prototype, "groupCaptionTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate>e-columns>e-column',
                    inputs: input$1,
                    outputs: outputs$3,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], groupFooterTemplate: [{
                type: ContentChild,
                args: ['groupFooterTemplate']
            }], groupCaptionTemplate: [{
                type: ContentChild,
                args: ['groupCaptionTemplate']
            }] } });
/**
 * AggregateColumn Array Directive
 * @private
 */
class AggregateColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
AggregateColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AggregateColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnsDirective, selector: "ejs-grid>e-aggregates>e-aggregate>e-columns", queries: [{ propertyName: "children", predicate: AggregateColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate>e-columns',
                    queries: {
                        children: new ContentChildren(AggregateColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input = ['columns'];
let outputs$2 = [];
/**
 * `e-aggregate` directive represent a aggregate row of the Angular Grid.
 * It must be contained in a Grid component(`ejs-grid`).
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'></e-column>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-grid>
 * ```
 */
class AggregateDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['columns'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$2);
        this.directivePropList = input;
    }
}
AggregateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AggregateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateDirective, selector: "ejs-grid>e-aggregates>e-aggregate", inputs: { columns: "columns" }, queries: [{ propertyName: "childColumns", first: true, predicate: AggregateColumnsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate',
                    inputs: input,
                    outputs: outputs$2,
                    queries: {
                        childColumns: new ContentChild(AggregateColumnsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Aggregate Array Directive
 * @private
 */
class AggregatesDirective extends ArrayBase {
    constructor() {
        super('aggregates');
    }
}
AggregatesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregatesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AggregatesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregatesDirective, selector: "ejs-grid>e-aggregates", queries: [{ propertyName: "children", predicate: AggregateDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregatesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates',
                    queries: {
                        children: new ContentChildren(AggregateDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$1 = ['adaptiveUIMode', 'aggregates', 'allowExcelExport', 'allowFiltering', 'allowGrouping', 'allowKeyboard', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'autoFit', 'childGrid', 'clipMode', 'columnChooserSettings', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'cssClass', 'currencyCode', 'currentAction', 'currentViewData', 'dataSource', 'detailTemplate', 'editSettings', 'ej2StatePersistenceVersion', 'emptyRecordTemplate', 'enableAdaptiveUI', 'enableAltRow', 'enableAutoFill', 'enableColumnVirtualization', 'enableHeaderFocus', 'enableHover', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableInfiniteScrolling', 'enablePersistence', 'enableRtl', 'enableStickyHeader', 'enableVirtualMaskRow', 'enableVirtualization', 'exportGrids', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'groupSettings', 'height', 'hierarchyPrintMode', 'infiniteScrollSettings', 'loadingIndicator', 'locale', 'pageSettings', 'pagerTemplate', 'parentDetails', 'printMode', 'query', 'queryString', 'resizeSettings', 'rowDropSettings', 'rowHeight', 'rowRenderingMode', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnChooser', 'showColumnMenu', 'showHider', 'sortSettings', 'textWrapSettings', 'toolbar', 'toolbarTemplate', 'width'];
const outputs$1 = ['actionBegin', 'actionComplete', 'actionFailure', 'batchAdd', 'batchCancel', 'batchDelete', 'beforeAutoFill', 'beforeBatchAdd', 'beforeBatchDelete', 'beforeBatchSave', 'beforeCopy', 'beforeDataBound', 'beforeDetailTemplateDetach', 'beforeExcelExport', 'beforeOpenAdaptiveDialog', 'beforeOpenColumnChooser', 'beforePaste', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSaved', 'cellSelected', 'cellSelecting', 'checkBoxChange', 'columnDataStateChange', 'columnDeselected', 'columnDeselecting', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'columnSelected', 'columnSelecting', 'commandClick', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'destroyed', 'detailDataBound', 'excelAggregateQueryCellInfo', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'exportDetailDataBound', 'exportDetailTemplate', 'exportGroupCaption', 'headerCellInfo', 'keyPressed', 'lazyLoadGroupCollapse', 'lazyLoadGroupExpand', 'load', 'pdfAggregateQueryCellInfo', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordClick', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick', 'dataSourceChange'];
const twoWays$1 = ['dataSource'];
/**
 * `ejs-grid` represents the Angular Grid Component.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'></ejs-grid>
 * ```
 */
let GridComponent = class GridComponent extends Grid {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['columns', 'aggregates'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('GridsFilter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsPage');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsSort');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsGroup');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsReorder');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsRowDD');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsDetailRow');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsAggregate');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsSearch');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsEdit');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsExcelExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsPdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsCommandColumn');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsFreeze');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsColumnMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsColumnChooser');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsForeignKey');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsInfiniteScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GridsLazyLoadGroup');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        this.registerEvents(outputs$1);
        this.addTwoWay.call(this, twoWays$1);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childColumns;
        if (this.childAggregates) {
            this.tagObjects[1].instance = this.childAggregates;
        }
        this.context.ngAfterContentChecked(this);
    }
};
GridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
GridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: GridComponent, selector: "ejs-grid", inputs: { adaptiveUIMode: "adaptiveUIMode", aggregates: "aggregates", allowExcelExport: "allowExcelExport", allowFiltering: "allowFiltering", allowGrouping: "allowGrouping", allowKeyboard: "allowKeyboard", allowMultiSorting: "allowMultiSorting", allowPaging: "allowPaging", allowPdfExport: "allowPdfExport", allowReordering: "allowReordering", allowResizing: "allowResizing", allowRowDragAndDrop: "allowRowDragAndDrop", allowSelection: "allowSelection", allowSorting: "allowSorting", allowTextWrap: "allowTextWrap", autoFit: "autoFit", childGrid: "childGrid", clipMode: "clipMode", columnChooserSettings: "columnChooserSettings", columnMenuItems: "columnMenuItems", columnQueryMode: "columnQueryMode", columns: "columns", contextMenuItems: "contextMenuItems", cssClass: "cssClass", currencyCode: "currencyCode", currentAction: "currentAction", currentViewData: "currentViewData", dataSource: "dataSource", detailTemplate: "detailTemplate", editSettings: "editSettings", ej2StatePersistenceVersion: "ej2StatePersistenceVersion", emptyRecordTemplate: "emptyRecordTemplate", enableAdaptiveUI: "enableAdaptiveUI", enableAltRow: "enableAltRow", enableAutoFill: "enableAutoFill", enableColumnVirtualization: "enableColumnVirtualization", enableHeaderFocus: "enableHeaderFocus", enableHover: "enableHover", enableHtmlSanitizer: "enableHtmlSanitizer", enableImmutableMode: "enableImmutableMode", enableInfiniteScrolling: "enableInfiniteScrolling", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableStickyHeader: "enableStickyHeader", enableVirtualMaskRow: "enableVirtualMaskRow", enableVirtualization: "enableVirtualization", exportGrids: "exportGrids", filterSettings: "filterSettings", frozenColumns: "frozenColumns", frozenRows: "frozenRows", gridLines: "gridLines", groupSettings: "groupSettings", height: "height", hierarchyPrintMode: "hierarchyPrintMode", infiniteScrollSettings: "infiniteScrollSettings", loadingIndicator: "loadingIndicator", locale: "locale", pageSettings: "pageSettings", pagerTemplate: "pagerTemplate", parentDetails: "parentDetails", printMode: "printMode", query: "query", queryString: "queryString", resizeSettings: "resizeSettings", rowDropSettings: "rowDropSettings", rowHeight: "rowHeight", rowRenderingMode: "rowRenderingMode", rowTemplate: "rowTemplate", searchSettings: "searchSettings", selectedRowIndex: "selectedRowIndex", selectionSettings: "selectionSettings", showColumnChooser: "showColumnChooser", showColumnMenu: "showColumnMenu", showHider: "showHider", sortSettings: "sortSettings", textWrapSettings: "textWrapSettings", toolbar: "toolbar", toolbarTemplate: "toolbarTemplate", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", batchAdd: "batchAdd", batchCancel: "batchCancel", batchDelete: "batchDelete", beforeAutoFill: "beforeAutoFill", beforeBatchAdd: "beforeBatchAdd", beforeBatchDelete: "beforeBatchDelete", beforeBatchSave: "beforeBatchSave", beforeCopy: "beforeCopy", beforeDataBound: "beforeDataBound", beforeDetailTemplateDetach: "beforeDetailTemplateDetach", beforeExcelExport: "beforeExcelExport", beforeOpenAdaptiveDialog: "beforeOpenAdaptiveDialog", beforeOpenColumnChooser: "beforeOpenColumnChooser", beforePaste: "beforePaste", beforePdfExport: "beforePdfExport", beforePrint: "beforePrint", beginEdit: "beginEdit", cellDeselected: "cellDeselected", cellDeselecting: "cellDeselecting", cellEdit: "cellEdit", cellSave: "cellSave", cellSaved: "cellSaved", cellSelected: "cellSelected", cellSelecting: "cellSelecting", checkBoxChange: "checkBoxChange", columnDataStateChange: "columnDataStateChange", columnDeselected: "columnDeselected", columnDeselecting: "columnDeselecting", columnDrag: "columnDrag", columnDragStart: "columnDragStart", columnDrop: "columnDrop", columnMenuClick: "columnMenuClick", columnMenuOpen: "columnMenuOpen", columnSelected: "columnSelected", columnSelecting: "columnSelecting", commandClick: "commandClick", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataBound: "dataBound", dataSourceChanged: "dataSourceChanged", dataStateChange: "dataStateChange", destroyed: "destroyed", detailDataBound: "detailDataBound", excelAggregateQueryCellInfo: "excelAggregateQueryCellInfo", excelExportComplete: "excelExportComplete", excelHeaderQueryCellInfo: "excelHeaderQueryCellInfo", excelQueryCellInfo: "excelQueryCellInfo", exportDetailDataBound: "exportDetailDataBound", exportDetailTemplate: "exportDetailTemplate", exportGroupCaption: "exportGroupCaption", headerCellInfo: "headerCellInfo", keyPressed: "keyPressed", lazyLoadGroupCollapse: "lazyLoadGroupCollapse", lazyLoadGroupExpand: "lazyLoadGroupExpand", load: "load", pdfAggregateQueryCellInfo: "pdfAggregateQueryCellInfo", pdfExportComplete: "pdfExportComplete", pdfHeaderQueryCellInfo: "pdfHeaderQueryCellInfo", pdfQueryCellInfo: "pdfQueryCellInfo", printComplete: "printComplete", queryCellInfo: "queryCellInfo", recordClick: "recordClick", recordDoubleClick: "recordDoubleClick", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", rowDataBound: "rowDataBound", rowDeselected: "rowDeselected", rowDeselecting: "rowDeselecting", rowDrag: "rowDrag", rowDragStart: "rowDragStart", rowDragStartHelper: "rowDragStartHelper", rowDrop: "rowDrop", rowSelected: "rowSelected", rowSelecting: "rowSelecting", toolbarClick: "toolbarClick", dataSourceChange: "dataSourceChange" }, queries: [{ propertyName: "rowTemplate", first: true, predicate: ["rowTemplate"], descendants: true }, { propertyName: "emptyRecordTemplate", first: true, predicate: ["emptyRecordTemplate"], descendants: true }, { propertyName: "detailTemplate", first: true, predicate: ["detailTemplate"], descendants: true }, { propertyName: "toolbarTemplate", first: true, predicate: ["toolbarTemplate"], descendants: true }, { propertyName: "pagerTemplate", first: true, predicate: ["pagerTemplate"], descendants: true }, { propertyName: "editSettings_template", first: true, predicate: ["editSettingsTemplate"], descendants: true }, { propertyName: "groupSettings_captionTemplate", first: true, predicate: ["groupSettingsCaptionTemplate"], descendants: true }, { propertyName: "columnChooserSettings_headerTemplate", first: true, predicate: ["columnChooserSettingsHeaderTemplate"], descendants: true }, { propertyName: "columnChooserSettings_template", first: true, predicate: ["columnChooserSettingsTemplate"], descendants: true }, { propertyName: "columnChooserSettings_footerTemplate", first: true, predicate: ["columnChooserSettingsFooterTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }, { propertyName: "childAggregates", first: true, predicate: AggregatesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], GridComponent.prototype, "rowTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "emptyRecordTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "detailTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "toolbarTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "pagerTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "editSettings_template", void 0);
__decorate([
    Template()
], GridComponent.prototype, "groupSettings_captionTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "columnChooserSettings_headerTemplate", void 0);
__decorate([
    Template()
], GridComponent.prototype, "columnChooserSettings_template", void 0);
__decorate([
    Template()
], GridComponent.prototype, "columnChooserSettings_footerTemplate", void 0);
GridComponent = __decorate([
    ComponentMixins([ComponentBase])
], GridComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-grid',
                    inputs: inputs$1,
                    outputs: outputs$1,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective),
                        childAggregates: new ContentChild(AggregatesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { rowTemplate: [{
                type: ContentChild,
                args: ['rowTemplate']
            }], emptyRecordTemplate: [{
                type: ContentChild,
                args: ['emptyRecordTemplate']
            }], detailTemplate: [{
                type: ContentChild,
                args: ['detailTemplate']
            }], toolbarTemplate: [{
                type: ContentChild,
                args: ['toolbarTemplate']
            }], pagerTemplate: [{
                type: ContentChild,
                args: ['pagerTemplate']
            }], editSettings_template: [{
                type: ContentChild,
                args: ['editSettingsTemplate']
            }], groupSettings_captionTemplate: [{
                type: ContentChild,
                args: ['groupSettingsCaptionTemplate']
            }], columnChooserSettings_headerTemplate: [{
                type: ContentChild,
                args: ['columnChooserSettingsHeaderTemplate']
            }], columnChooserSettings_template: [{
                type: ContentChild,
                args: ['columnChooserSettingsTemplate']
            }], columnChooserSettings_footerTemplate: [{
                type: ContentChild,
                args: ['columnChooserSettingsFooterTemplate']
            }] } });

/**
 * NgModule definition for the Grid component.
 */
class GridModule {
}
GridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridModule, declarations: [GridComponent,
        StackedColumnDirective,
        StackedColumnsDirective,
        ColumnDirective,
        ColumnsDirective,
        AggregateColumnDirective,
        AggregateColumnsDirective,
        AggregateDirective,
        AggregatesDirective], imports: [CommonModule], exports: [GridComponent,
        StackedColumnDirective,
        StackedColumnsDirective,
        ColumnDirective,
        ColumnsDirective,
        AggregateColumnDirective,
        AggregateColumnsDirective,
        AggregateDirective,
        AggregatesDirective] });
GridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        GridComponent,
                        StackedColumnDirective,
                        StackedColumnsDirective,
                        ColumnDirective,
                        ColumnsDirective,
                        AggregateColumnDirective,
                        AggregateColumnsDirective,
                        AggregateDirective,
                        AggregatesDirective
                    ],
                    exports: [
                        GridComponent,
                        StackedColumnDirective,
                        StackedColumnsDirective,
                        ColumnDirective,
                        ColumnsDirective,
                        AggregateColumnDirective,
                        AggregateColumnsDirective,
                        AggregateDirective,
                        AggregatesDirective
                    ]
                }]
        }] });

const FilterService = { provide: 'GridsFilter', useValue: Filter };
const PageService = { provide: 'GridsPage', useValue: Page };
const SelectionService = { provide: 'GridsSelection', useValue: Selection };
const SortService = { provide: 'GridsSort', useValue: Sort };
const GroupService = { provide: 'GridsGroup', useValue: Group };
const ReorderService = { provide: 'GridsReorder', useValue: Reorder };
const RowDDService = { provide: 'GridsRowDD', useValue: RowDD };
const DetailRowService = { provide: 'GridsDetailRow', useValue: DetailRow };
const ToolbarService = { provide: 'GridsToolbar', useValue: Toolbar };
const AggregateService = { provide: 'GridsAggregate', useValue: Aggregate };
const SearchService = { provide: 'GridsSearch', useValue: Search };
const VirtualScrollService = { provide: 'GridsVirtualScroll', useValue: VirtualScroll };
const EditService = { provide: 'GridsEdit', useValue: Edit };
const ResizeService = { provide: 'GridsResize', useValue: Resize };
const ExcelExportService = { provide: 'GridsExcelExport', useValue: ExcelExport };
const PdfExportService = { provide: 'GridsPdfExport', useValue: PdfExport };
const CommandColumnService = { provide: 'GridsCommandColumn', useValue: CommandColumn };
const ContextMenuService = { provide: 'GridsContextMenu', useValue: ContextMenu };
const FreezeService = { provide: 'GridsFreeze', useValue: Freeze };
const ColumnMenuService = { provide: 'GridsColumnMenu', useValue: ColumnMenu };
const ColumnChooserService = { provide: 'GridsColumnChooser', useValue: ColumnChooser };
const ForeignKeyService = { provide: 'GridsForeignKey', useValue: ForeignKey };
const InfiniteScrollService = { provide: 'GridsInfiniteScroll', useValue: InfiniteScroll };
const LazyLoadGroupService = { provide: 'GridsLazyLoadGroup', useValue: LazyLoadGroup };
/**
 * NgModule definition for the Grid component with providers.
 */
class GridAllModule {
}
GridAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GridAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridAllModule, imports: [CommonModule, GridModule], exports: [GridModule] });
GridAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridAllModule, providers: [
        FilterService,
        PageService,
        SelectionService,
        SortService,
        GroupService,
        ReorderService,
        RowDDService,
        DetailRowService,
        ToolbarService,
        AggregateService,
        SearchService,
        VirtualScrollService,
        EditService,
        ResizeService,
        ExcelExportService,
        PdfExportService,
        CommandColumnService,
        ContextMenuService,
        FreezeService,
        ColumnMenuService,
        ColumnChooserService,
        ForeignKeyService,
        InfiniteScrollService,
        LazyLoadGroupService
    ], imports: [[CommonModule, GridModule], GridModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GridAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, GridModule],
                    exports: [
                        GridModule
                    ],
                    providers: [
                        FilterService,
                        PageService,
                        SelectionService,
                        SortService,
                        GroupService,
                        ReorderService,
                        RowDDService,
                        DetailRowService,
                        ToolbarService,
                        AggregateService,
                        SearchService,
                        VirtualScrollService,
                        EditService,
                        ResizeService,
                        ExcelExportService,
                        PdfExportService,
                        CommandColumnService,
                        ContextMenuService,
                        FreezeService,
                        ColumnMenuService,
                        ColumnChooserService,
                        ForeignKeyService,
                        InfiniteScrollService,
                        LazyLoadGroupService
                    ]
                }]
        }] });

const inputs = ['cssClass', 'currentPage', 'customText', 'enableExternalMessage', 'enablePagerMessage', 'enablePersistence', 'enableQueryString', 'enableRtl', 'externalMessage', 'locale', 'pageCount', 'pageSize', 'pageSizes', 'template', 'totalRecordsCount'];
const outputs = ['click', 'created', 'dropDownChanged', 'currentPageChange', 'pageSizeChange', 'pageCountChange', 'pageSizesChange'];
const twoWays = ['currentPage', 'pageSize', 'pageCount', 'pageSizes'];
/**
 * `ejs-pager` represents the Angular Pager Component.
 * ```html
 * <ejs-pager></ejs-pager>
 * ```
 */
let PagerComponent = class PagerComponent extends Pager {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.context.ngAfterContentChecked(this);
    }
};
PagerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
PagerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: PagerComponent, selector: "ejs-pager", inputs: { cssClass: "cssClass", currentPage: "currentPage", customText: "customText", enableExternalMessage: "enableExternalMessage", enablePagerMessage: "enablePagerMessage", enablePersistence: "enablePersistence", enableQueryString: "enableQueryString", enableRtl: "enableRtl", externalMessage: "externalMessage", locale: "locale", pageCount: "pageCount", pageSize: "pageSize", pageSizes: "pageSizes", template: "template", totalRecordsCount: "totalRecordsCount" }, outputs: { click: "click", created: "created", dropDownChanged: "dropDownChanged", currentPageChange: "currentPageChange", pageSizeChange: "pageSizeChange", pageCountChange: "pageCountChange", pageSizesChange: "pageSizesChange" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], PagerComponent.prototype, "template", void 0);
PagerComponent = __decorate([
    ComponentMixins([ComponentBase])
], PagerComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-pager',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });

/**
 * NgModule definition for the Pager component.
 */
class PagerModule {
}
PagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerModule, declarations: [PagerComponent], imports: [CommonModule], exports: [PagerComponent] });
PagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        PagerComponent
                    ],
                    exports: [
                        PagerComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Pager component with providers.
 */
class PagerAllModule {
}
PagerAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PagerAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerAllModule, imports: [CommonModule, PagerModule], exports: [PagerModule] });
PagerAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerAllModule, providers: [], imports: [[CommonModule, PagerModule], PagerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: PagerAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PagerModule],
                    exports: [
                        PagerModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AggregateColumnDirective, AggregateColumnsDirective, AggregateDirective, AggregateService, AggregatesDirective, ColumnChooserService, ColumnDirective, ColumnMenuService, ColumnsDirective, CommandColumnService, ContextMenuService, DetailRowService, EditService, ExcelExportService, FilterService, ForeignKeyService, FreezeService, GridAllModule, GridComponent, GridModule, GroupService, InfiniteScrollService, LazyLoadGroupService, PageService, PagerAllModule, PagerComponent, PagerModule, PdfExportService, ReorderService, ResizeService, RowDDService, SearchService, SelectionService, SortService, StackedColumnDirective, StackedColumnsDirective, ToolbarService, VirtualScrollService };
//# sourceMappingURL=syncfusion-ej2-angular-grids.mjs.map
