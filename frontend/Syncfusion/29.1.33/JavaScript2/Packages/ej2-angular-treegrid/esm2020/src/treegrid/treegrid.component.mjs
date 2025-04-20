import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColumnsDirective } from './columns.directive';
import { AggregatesDirective } from './aggregates.directive';
import * as i0 from "@angular/core";
export const inputs = ['aggregates', 'allowExcelExport', 'allowFiltering', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'autoCheckHierarchy', 'childMapping', 'clipMode', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'copyHierarchyMode', 'currencyCode', 'dataSource', 'detailTemplate', 'editSettings', 'enableAdaptiveUI', 'enableAltRow', 'enableAutoFill', 'enableCollapseAll', 'enableColumnVirtualization', 'enableHover', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableInfiniteScrolling', 'enablePersistence', 'enableRtl', 'enableVirtualMaskRow', 'enableVirtualization', 'expandStateMapping', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'hasChildMapping', 'height', 'idMapping', 'infiniteScrollSettings', 'loadChildOnDemand', 'loadingIndicator', 'locale', 'pageSettings', 'parentIdMapping', 'printMode', 'query', 'rowDropSettings', 'rowHeight', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnChooser', 'showColumnMenu', 'sortSettings', 'textWrapSettings', 'toolbar', 'treeColumnIndex', 'width'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'batchAdd', 'batchCancel', 'batchDelete', 'beforeBatchAdd', 'beforeBatchDelete', 'beforeBatchSave', 'beforeCopy', 'beforeDataBound', 'beforeExcelExport', 'beforePaste', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSaved', 'cellSelected', 'cellSelecting', 'checkboxChange', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'detailDataBound', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick', 'dataSourceChange'];
export const twoWays = ['dataSource'];
/**
 * `ejs-treegrid` represents the Angular TreeTreeGrid Component.
 * ```html
 * <ejs-treegrid [dataSource]='data' allowPaging='true' allowSorting='true'></ejs-treegrid>
 * ```
 */
let TreeGridComponent = class TreeGridComponent extends TreeGrid {
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
            let mod = this.injector.get('TreeGridFilter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridPage');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridSort');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridReorder');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridAggregate');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridColumnMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridExcelExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridPdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridCommandColumn');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridEdit');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridDetailRow');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridRowDD');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridFreeze');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridColumnChooser');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridLogger');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('TreeGridInfiniteScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
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
        this.tagObjects[0].instance = this.childColumns;
        if (this.childAggregates) {
            this.tagObjects[1].instance = this.childAggregates;
        }
        this.context.ngAfterContentChecked(this);
    }
};
TreeGridComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeGridComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
TreeGridComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TreeGridComponent, selector: "ejs-treegrid", inputs: { aggregates: "aggregates", allowExcelExport: "allowExcelExport", allowFiltering: "allowFiltering", allowMultiSorting: "allowMultiSorting", allowPaging: "allowPaging", allowPdfExport: "allowPdfExport", allowReordering: "allowReordering", allowResizing: "allowResizing", allowRowDragAndDrop: "allowRowDragAndDrop", allowSelection: "allowSelection", allowSorting: "allowSorting", allowTextWrap: "allowTextWrap", autoCheckHierarchy: "autoCheckHierarchy", childMapping: "childMapping", clipMode: "clipMode", columnMenuItems: "columnMenuItems", columnQueryMode: "columnQueryMode", columns: "columns", contextMenuItems: "contextMenuItems", copyHierarchyMode: "copyHierarchyMode", currencyCode: "currencyCode", dataSource: "dataSource", detailTemplate: "detailTemplate", editSettings: "editSettings", enableAdaptiveUI: "enableAdaptiveUI", enableAltRow: "enableAltRow", enableAutoFill: "enableAutoFill", enableCollapseAll: "enableCollapseAll", enableColumnVirtualization: "enableColumnVirtualization", enableHover: "enableHover", enableHtmlSanitizer: "enableHtmlSanitizer", enableImmutableMode: "enableImmutableMode", enableInfiniteScrolling: "enableInfiniteScrolling", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableVirtualMaskRow: "enableVirtualMaskRow", enableVirtualization: "enableVirtualization", expandStateMapping: "expandStateMapping", filterSettings: "filterSettings", frozenColumns: "frozenColumns", frozenRows: "frozenRows", gridLines: "gridLines", hasChildMapping: "hasChildMapping", height: "height", idMapping: "idMapping", infiniteScrollSettings: "infiniteScrollSettings", loadChildOnDemand: "loadChildOnDemand", loadingIndicator: "loadingIndicator", locale: "locale", pageSettings: "pageSettings", parentIdMapping: "parentIdMapping", printMode: "printMode", query: "query", rowDropSettings: "rowDropSettings", rowHeight: "rowHeight", rowTemplate: "rowTemplate", searchSettings: "searchSettings", selectedRowIndex: "selectedRowIndex", selectionSettings: "selectionSettings", showColumnChooser: "showColumnChooser", showColumnMenu: "showColumnMenu", sortSettings: "sortSettings", textWrapSettings: "textWrapSettings", toolbar: "toolbar", treeColumnIndex: "treeColumnIndex", width: "width" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", batchAdd: "batchAdd", batchCancel: "batchCancel", batchDelete: "batchDelete", beforeBatchAdd: "beforeBatchAdd", beforeBatchDelete: "beforeBatchDelete", beforeBatchSave: "beforeBatchSave", beforeCopy: "beforeCopy", beforeDataBound: "beforeDataBound", beforeExcelExport: "beforeExcelExport", beforePaste: "beforePaste", beforePdfExport: "beforePdfExport", beforePrint: "beforePrint", beginEdit: "beginEdit", cellDeselected: "cellDeselected", cellDeselecting: "cellDeselecting", cellEdit: "cellEdit", cellSave: "cellSave", cellSaved: "cellSaved", cellSelected: "cellSelected", cellSelecting: "cellSelecting", checkboxChange: "checkboxChange", collapsed: "collapsed", collapsing: "collapsing", columnDrag: "columnDrag", columnDragStart: "columnDragStart", columnDrop: "columnDrop", columnMenuClick: "columnMenuClick", columnMenuOpen: "columnMenuOpen", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataBound: "dataBound", dataSourceChanged: "dataSourceChanged", dataStateChange: "dataStateChange", detailDataBound: "detailDataBound", excelExportComplete: "excelExportComplete", excelHeaderQueryCellInfo: "excelHeaderQueryCellInfo", excelQueryCellInfo: "excelQueryCellInfo", expanded: "expanded", expanding: "expanding", headerCellInfo: "headerCellInfo", load: "load", pdfExportComplete: "pdfExportComplete", pdfHeaderQueryCellInfo: "pdfHeaderQueryCellInfo", pdfQueryCellInfo: "pdfQueryCellInfo", printComplete: "printComplete", queryCellInfo: "queryCellInfo", recordDoubleClick: "recordDoubleClick", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", rowDataBound: "rowDataBound", rowDeselected: "rowDeselected", rowDeselecting: "rowDeselecting", rowDrag: "rowDrag", rowDragStart: "rowDragStart", rowDragStartHelper: "rowDragStartHelper", rowDrop: "rowDrop", rowSelected: "rowSelected", rowSelecting: "rowSelecting", toolbarClick: "toolbarClick", dataSourceChange: "dataSourceChange" }, queries: [{ propertyName: "toolbarTemplate", first: true, predicate: ["toolbarTemplate"], descendants: true }, { propertyName: "pagerTemplate", first: true, predicate: ["pagerTemplate"], descendants: true }, { propertyName: "rowTemplate", first: true, predicate: ["rowTemplate"], descendants: true }, { propertyName: "detailTemplate", first: true, predicate: ["detailTemplate"], descendants: true }, { propertyName: "editSettings_template", first: true, predicate: ["editSettingsTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }, { propertyName: "childAggregates", first: true, predicate: AggregatesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], TreeGridComponent.prototype, "toolbarTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "pagerTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "rowTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "detailTemplate", void 0);
__decorate([
    Template()
], TreeGridComponent.prototype, "editSettings_template", void 0);
TreeGridComponent = __decorate([
    ComponentMixins([ComponentBase])
], TreeGridComponent);
export { TreeGridComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeGridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-treegrid',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective),
                        childAggregates: new ContentChild(AggregatesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { toolbarTemplate: [{
                type: ContentChild,
                args: ['toolbarTemplate']
            }], pagerTemplate: [{
                type: ContentChild,
                args: ['pagerTemplate']
            }], rowTemplate: [{
                type: ContentChild,
                args: ['rowTemplate']
            }], detailTemplate: [{
                type: ContentChild,
                args: ['detailTemplate']
            }], editSettings_template: [{
                type: ContentChild,
                args: ['editSettingsTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RyZWVncmlkL3RyZWVncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBRTdELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLFlBQVksRUFBQyxrQkFBa0IsRUFBQyxnQkFBZ0IsRUFBQyxtQkFBbUIsRUFBQyxhQUFhLEVBQUMsZ0JBQWdCLEVBQUMsaUJBQWlCLEVBQUMsZUFBZSxFQUFDLHFCQUFxQixFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxlQUFlLEVBQUMsb0JBQW9CLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyxpQkFBaUIsRUFBQyxTQUFTLEVBQUMsa0JBQWtCLEVBQUMsbUJBQW1CLEVBQUMsY0FBYyxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFBQyxjQUFjLEVBQUMsa0JBQWtCLEVBQUMsY0FBYyxFQUFDLGdCQUFnQixFQUFDLG1CQUFtQixFQUFDLDRCQUE0QixFQUFDLGFBQWEsRUFBQyxxQkFBcUIsRUFBQyxxQkFBcUIsRUFBQyx5QkFBeUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsc0JBQXNCLEVBQUMsc0JBQXNCLEVB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YUFBYSxDQUFDLENBQUM7R0FDcEIsaUJBQWlCLENBNlI3QjtTQTdSWSxpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFaN0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLGdCQUFnQixDQUFDO3dCQUNoRCxlQUFlLEVBQUUsSUFBSSxZQUFZLENBQUMsbUJBQW1CLENBQUM7cUJBQ3pEO2lCQUNKOytLQTJFVSxlQUFlO3NCQUZyQixZQUFZO3VCQUFDLGlCQUFpQjtnQkFLeEIsYUFBYTtzQkFGbkIsWUFBWTt1QkFBQyxlQUFlO2dCQWdCdEIsV0FBVztzQkFGakIsWUFBWTt1QkFBQyxhQUFhO2dCQWFwQixjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFLdkIscUJBQXFCO3NCQUYzQixZQUFZO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFRyZWVHcmlkIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXRyZWVncmlkJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBZ2dyZWdhdGVzRGlyZWN0aXZlIH0gZnJvbSAnLi9hZ2dyZWdhdGVzLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhZ2dyZWdhdGVzJywnYWxsb3dFeGNlbEV4cG9ydCcsJ2FsbG93RmlsdGVyaW5nJywnYWxsb3dNdWx0aVNvcnRpbmcnLCdhbGxvd1BhZ2luZycsJ2FsbG93UGRmRXhwb3J0JywnYWxsb3dSZW9yZGVyaW5nJywnYWxsb3dSZXNpemluZycsJ2FsbG93Um93RHJhZ0FuZERyb3AnLCdhbGxvd1NlbGVjdGlvbicsJ2FsbG93U29ydGluZycsJ2FsbG93VGV4dFdyYXAnLCdhdXRvQ2hlY2tIaWVyYXJjaHknLCdjaGlsZE1hcHBpbmcnLCdjbGlwTW9kZScsJ2NvbHVtbk1lbnVJdGVtcycsJ2NvbHVtblF1ZXJ5TW9kZScsJ2NvbHVtbnMnLCdjb250ZXh0TWVudUl0ZW1zJywnY29weUhpZXJhcmNoeU1vZGUnLCdjdXJyZW5jeUNvZGUnLCdkYXRhU291cmNlJywnZGV0YWlsVGVtcGxhdGUnLCdlZGl0U2V0dGluZ3MnLCdlbmFibGVBZGFwdGl2ZVVJJywnZW5hYmxlQWx0Um93JywnZW5hYmxlQXV0b0ZpbGwnLCdlbmFibGVDb2xsYXBzZUFsbCcsJ2VuYWJsZUNvbHVtblZpcnR1YWxpemF0aW9uJywnZW5hYmxlSG92ZXInLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlSW1tdXRhYmxlTW9kZScsJ2VuYWJsZUluZmluaXRlU2Nyb2xsaW5nJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVWaXJ0dWFsTWFza1JvdycsJ2VuYWJsZVZpcnR1YWxpemF0aW9uJywnZXhwYW5kU3RhdGVNYXBwaW5nJywnZmlsdGVyU2V0dGluZ3MnLCdmcm96ZW5Db2x1bW5zJywnZnJvemVuUm93cycsJ2dyaWRMaW5lcycsJ2hhc0NoaWxkTWFwcGluZycsJ2hlaWdodCcsJ2lkTWFwcGluZycsJ2luZmluaXRlU2Nyb2xsU2V0dGluZ3MnLCdsb2FkQ2hpbGRPbkRlbWFuZCcsJ2xvYWRpbmdJbmRpY2F0b3InLCdsb2NhbGUnLCdwYWdlU2V0dGluZ3MnLCdwYXJlbnRJZE1hcHBpbmcnLCdwcmludE1vZGUnLCdxdWVyeScsJ3Jvd0Ryb3BTZXR0aW5ncycsJ3Jvd0hlaWdodCcsJ3Jvd1RlbXBsYXRlJywnc2VhcmNoU2V0dGluZ3MnLCdzZWxlY3RlZFJvd0luZGV4Jywnc2VsZWN0aW9uU2V0dGluZ3MnLCdzaG93Q29sdW1uQ2hvb3NlcicsJ3Nob3dDb2x1bW5NZW51Jywnc29ydFNldHRpbmdzJywndGV4dFdyYXBTZXR0aW5ncycsJ3Rvb2xiYXInLCd0cmVlQ29sdW1uSW5kZXgnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydhY3Rpb25CZWdpbicsJ2FjdGlvbkNvbXBsZXRlJywnYWN0aW9uRmFpbHVyZScsJ2JhdGNoQWRkJywnYmF0Y2hDYW5jZWwnLCdiYXRjaERlbGV0ZScsJ2JlZm9yZUJhdGNoQWRkJywnYmVmb3JlQmF0Y2hEZWxldGUnLCdiZWZvcmVCYXRjaFNhdmUnLCdiZWZvcmVDb3B5JywnYmVmb3JlRGF0YUJvdW5kJywnYmVmb3JlRXhjZWxFeHBvcnQnLCdiZWZvcmVQYXN0ZScsJ2JlZm9yZVBkZkV4cG9ydCcsJ2JlZm9yZVByaW50JywnYmVnaW5FZGl0JywnY2VsbERlc2VsZWN0ZWQnLCdjZWxsRGVzZWxlY3RpbmcnLCdjZWxsRWRpdCcsJ2NlbGxTYXZlJywnY2VsbFNhdmVkJywnY2VsbFNlbGVjdGVkJywnY2VsbFNlbGVjdGluZycsJ2NoZWNrYm94Q2hhbmdlJywnY29sbGFwc2VkJywnY29sbGFwc2luZycsJ2NvbHVtbkRyYWcnLCdjb2x1bW5EcmFnU3RhcnQnLCdjb2x1bW5Ecm9wJywnY29sdW1uTWVudUNsaWNrJywnY29sdW1uTWVudU9wZW4nLCdjb250ZXh0TWVudUNsaWNrJywnY29udGV4dE1lbnVPcGVuJywnY3JlYXRlZCcsJ2RhdGFCb3VuZCcsJ2RhdGFTb3VyY2VDaGFuZ2VkJywnZGF0YVN0YXRlQ2hhbmdlJywnZGV0YWlsRGF0YUJvdW5kJywnZXhjZWxFeHBvcnRDb21wbGV0ZScsJ2V4Y2VsSGVhZGVyUXVlcnlDZWxsSW5mbycsJ2V4Y2VsUXVlcnlDZWxsSW5mbycsJ2V4cGFuZGVkJywnZXhwYW5kaW5nJywnaGVhZGVyQ2VsbEluZm8nLCdsb2FkJywncGRmRXhwb3J0Q29tcGxldGUnLCdwZGZIZWFkZXJRdWVyeUNlbGxJbmZvJywncGRmUXVlcnlDZWxsSW5mbycsJ3ByaW50Q29tcGxldGUnLCdxdWVyeUNlbGxJbmZvJywncmVjb3JkRG91YmxlQ2xpY2snLCdyZXNpemVTdGFydCcsJ3Jlc2l6ZVN0b3AnLCdyZXNpemluZycsJ3Jvd0RhdGFCb3VuZCcsJ3Jvd0Rlc2VsZWN0ZWQnLCdyb3dEZXNlbGVjdGluZycsJ3Jvd0RyYWcnLCdyb3dEcmFnU3RhcnQnLCdyb3dEcmFnU3RhcnRIZWxwZXInLCdyb3dEcm9wJywncm93U2VsZWN0ZWQnLCdyb3dTZWxlY3RpbmcnLCd0b29sYmFyQ2xpY2snLCdkYXRhU291cmNlQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ2RhdGFTb3VyY2UnXTtcblxuLyoqXG4gKiBgZWpzLXRyZWVncmlkYCByZXByZXNlbnRzIHRoZSBBbmd1bGFyIFRyZWVUcmVlR3JpZCBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXRyZWVncmlkIFtkYXRhU291cmNlXT0nZGF0YScgYWxsb3dQYWdpbmc9J3RydWUnIGFsbG93U29ydGluZz0ndHJ1ZSc+PC9lanMtdHJlZWdyaWQ+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtdHJlZWdyaWQnLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRDb2x1bW5zOiBuZXcgQ29udGVudENoaWxkKENvbHVtbnNEaXJlY3RpdmUpLCBcbiAgICAgICAgY2hpbGRBZ2dyZWdhdGVzOiBuZXcgQ29udGVudENoaWxkKEFnZ3JlZ2F0ZXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFRyZWVHcmlkQ29tcG9uZW50IGV4dGVuZHMgVHJlZUdyaWQgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YWN0aW9uQmVnaW46IGFueTtcblx0YWN0aW9uQ29tcGxldGU6IGFueTtcblx0YWN0aW9uRmFpbHVyZTogYW55O1xuXHRiYXRjaEFkZDogYW55O1xuXHRiYXRjaENhbmNlbDogYW55O1xuXHRiYXRjaERlbGV0ZTogYW55O1xuXHRiZWZvcmVCYXRjaEFkZDogYW55O1xuXHRiZWZvcmVCYXRjaERlbGV0ZTogYW55O1xuXHRiZWZvcmVCYXRjaFNhdmU6IGFueTtcblx0YmVmb3JlQ29weTogYW55O1xuXHRiZWZvcmVEYXRhQm91bmQ6IGFueTtcblx0YmVmb3JlRXhjZWxFeHBvcnQ6IGFueTtcblx0YmVmb3JlUGFzdGU6IGFueTtcblx0YmVmb3JlUGRmRXhwb3J0OiBhbnk7XG5cdGJlZm9yZVByaW50OiBhbnk7XG5cdGJlZ2luRWRpdDogYW55O1xuXHRjZWxsRGVzZWxlY3RlZDogYW55O1xuXHRjZWxsRGVzZWxlY3Rpbmc6IGFueTtcblx0Y2VsbEVkaXQ6IGFueTtcblx0Y2VsbFNhdmU6IGFueTtcblx0Y2VsbFNhdmVkOiBhbnk7XG5cdGNlbGxTZWxlY3RlZDogYW55O1xuXHRjZWxsU2VsZWN0aW5nOiBhbnk7XG5cdGNoZWNrYm94Q2hhbmdlOiBhbnk7XG5cdGNvbGxhcHNlZDogYW55O1xuXHRjb2xsYXBzaW5nOiBhbnk7XG5cdGNvbHVtbkRyYWc6IGFueTtcblx0Y29sdW1uRHJhZ1N0YXJ0OiBhbnk7XG5cdGNvbHVtbkRyb3A6IGFueTtcblx0Y29sdW1uTWVudUNsaWNrOiBhbnk7XG5cdGNvbHVtbk1lbnVPcGVuOiBhbnk7XG5cdGNvbnRleHRNZW51Q2xpY2s6IGFueTtcblx0Y29udGV4dE1lbnVPcGVuOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGF0YUJvdW5kOiBhbnk7XG5cdGRhdGFTb3VyY2VDaGFuZ2VkOiBhbnk7XG5cdGRhdGFTdGF0ZUNoYW5nZTogYW55O1xuXHRkZXRhaWxEYXRhQm91bmQ6IGFueTtcblx0ZXhjZWxFeHBvcnRDb21wbGV0ZTogYW55O1xuXHRleGNlbEhlYWRlclF1ZXJ5Q2VsbEluZm86IGFueTtcblx0ZXhjZWxRdWVyeUNlbGxJbmZvOiBhbnk7XG5cdGV4cGFuZGVkOiBhbnk7XG5cdGV4cGFuZGluZzogYW55O1xuXHRoZWFkZXJDZWxsSW5mbzogYW55O1xuXHRsb2FkOiBhbnk7XG5cdHBkZkV4cG9ydENvbXBsZXRlOiBhbnk7XG5cdHBkZkhlYWRlclF1ZXJ5Q2VsbEluZm86IGFueTtcblx0cGRmUXVlcnlDZWxsSW5mbzogYW55O1xuXHRwcmludENvbXBsZXRlOiBhbnk7XG5cdHF1ZXJ5Q2VsbEluZm86IGFueTtcblx0cmVjb3JkRG91YmxlQ2xpY2s6IGFueTtcblx0cmVzaXplU3RhcnQ6IGFueTtcblx0cmVzaXplU3RvcDogYW55O1xuXHRyZXNpemluZzogYW55O1xuXHRyb3dEYXRhQm91bmQ6IGFueTtcblx0cm93RGVzZWxlY3RlZDogYW55O1xuXHRyb3dEZXNlbGVjdGluZzogYW55O1xuXHRyb3dEcmFnOiBhbnk7XG5cdHJvd0RyYWdTdGFydDogYW55O1xuXHRyb3dEcmFnU3RhcnRIZWxwZXI6IGFueTtcblx0cm93RHJvcDogYW55O1xuXHRyb3dTZWxlY3RlZDogYW55O1xuXHRyb3dTZWxlY3Rpbmc6IGFueTtcblx0dG9vbGJhckNsaWNrOiBhbnk7XG5cdHB1YmxpYyBkYXRhU291cmNlQ2hhbmdlOiBhbnk7XG4gICAgcHVibGljIGNoaWxkQ29sdW1uczogUXVlcnlMaXN0PENvbHVtbnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZEFnZ3JlZ2F0ZXM6IFF1ZXJ5TGlzdDxBZ2dyZWdhdGVzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2NvbHVtbnMnLCAnYWdncmVnYXRlcyddO1xuICAgIEBDb250ZW50Q2hpbGQoJ3Rvb2xiYXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdG9vbGJhclRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgncGFnZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcGFnZXJUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBUaGUgcm93IHRlbXBsYXRlIHRoYXQgcmVuZGVycyBjdXN0b21pemVkIHJvd3MgZnJvbSB0aGUgZ2l2ZW4gdGVtcGxhdGUuIFxuICAgICAqIEJ5IGRlZmF1bHQsIFRyZWVHcmlkIHJlbmRlcnMgYSB0YWJsZSByb3cgZm9yIGV2ZXJ5IGRhdGEgc291cmNlIGl0ZW0uIFxuICAgICAqID4gKiBJdCBhY2NlcHRzIGVpdGhlciBbdGVtcGxhdGUgc3RyaW5nXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFscykgXG4gICAgICogb3IgSFRNTCBlbGVtZW50IElELiBcbiAgICAgKiA+ICogVGhlIHJvdyB0ZW1wbGF0ZSBtdXN0IGJlIGEgdGFibGUgcm93LlxuICAgICAqIFxuICAgICAqID4gQ2hlY2sgdGhlIFtSb3cgVGVtcGxhdGVdKC4uLy4uL3RyZWVncmlkL3JvdykgY3VzdG9taXphdGlvbi5cbiAgICAgKiAgICAgXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncm93VGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHJvd1RlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSBkZXRhaWwgdGVtcGxhdGUgYWxsb3dzIHlvdSB0byBzaG93IG9yIGhpZGUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhYm91dCBhIHBhcnRpY3VsYXIgcm93LlxuICAgICAqIFxuICAgICAqID4gSXQgYWNjZXB0cyBlaXRoZXIgdGhlIFt0ZW1wbGF0ZSBzdHJpbmddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL1RlbXBsYXRlX2xpdGVyYWxzKVxuICAgICAqb3IgdGhlIEhUTUwgZWxlbWVudCBJRC5cbiAgICAgKiAgICAgXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZGV0YWlsVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGRldGFpbFRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnZWRpdFNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGVkaXRTZXR0aW5nc190ZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkRmlsdGVyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFBhZ2UnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkU29ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRSZW9yZGVyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFRvb2xiYXInKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkQWdncmVnYXRlJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFJlc2l6ZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRDb2x1bW5NZW51Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZEV4Y2VsRXhwb3J0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFBkZkV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRDb21tYW5kQ29sdW1uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZENvbnRleHRNZW51Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZEVkaXQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkU2VsZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFZpcnR1YWxTY3JvbGwnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1RyZWVHcmlkRGV0YWlsUm93Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZFJvd0REJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZEZyZWV6ZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRDb2x1bW5DaG9vc2VyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdUcmVlR3JpZExvZ2dlcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnVHJlZUdyaWRJbmZpbml0ZVNjcm9sbCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDb2x1bW5zO1xuICAgICAgICBpZiAodGhpcy5jaGlsZEFnZ3JlZ2F0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzWzFdLmluc3RhbmNlID0gdGhpcy5jaGlsZEFnZ3JlZ2F0ZXMgYXMgYW55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==