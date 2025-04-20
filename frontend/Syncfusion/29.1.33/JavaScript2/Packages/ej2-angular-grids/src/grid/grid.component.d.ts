import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Grid } from '@syncfusion/ej2-grids';
import { ColumnsDirective } from './columns.directive';
import { AggregatesDirective } from './aggregates.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-grid` represents the Angular Grid Component.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'></ejs-grid>
 * ```
 */
export declare class GridComponent extends Grid implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    batchAdd: any;
    batchCancel: any;
    batchDelete: any;
    beforeAutoFill: any;
    beforeBatchAdd: any;
    beforeBatchDelete: any;
    beforeBatchSave: any;
    beforeCopy: any;
    beforeDataBound: any;
    beforeDetailTemplateDetach: any;
    beforeExcelExport: any;
    beforeOpenAdaptiveDialog: any;
    beforeOpenColumnChooser: any;
    beforePaste: any;
    beforePdfExport: any;
    beforePrint: any;
    beginEdit: any;
    cellDeselected: any;
    cellDeselecting: any;
    cellEdit: any;
    cellSave: any;
    cellSaved: any;
    cellSelected: any;
    cellSelecting: any;
    checkBoxChange: any;
    columnDataStateChange: any;
    columnDeselected: any;
    columnDeselecting: any;
    columnDrag: any;
    columnDragStart: any;
    columnDrop: any;
    columnMenuClick: any;
    columnMenuOpen: any;
    columnSelected: any;
    columnSelecting: any;
    commandClick: any;
    contextMenuClick: any;
    contextMenuOpen: any;
    created: any;
    dataBound: any;
    dataSourceChanged: any;
    dataStateChange: any;
    destroyed: any;
    detailDataBound: any;
    excelAggregateQueryCellInfo: any;
    excelExportComplete: any;
    excelHeaderQueryCellInfo: any;
    excelQueryCellInfo: any;
    exportDetailDataBound: any;
    exportDetailTemplate: any;
    exportGroupCaption: any;
    headerCellInfo: any;
    keyPressed: any;
    lazyLoadGroupCollapse: any;
    lazyLoadGroupExpand: any;
    load: any;
    pdfAggregateQueryCellInfo: any;
    pdfExportComplete: any;
    pdfHeaderQueryCellInfo: any;
    pdfQueryCellInfo: any;
    printComplete: any;
    queryCellInfo: any;
    recordClick: any;
    recordDoubleClick: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    rowDataBound: any;
    rowDeselected: any;
    rowDeselecting: any;
    rowDrag: any;
    rowDragStart: any;
    rowDragStartHelper: any;
    rowDrop: any;
    rowSelected: any;
    rowSelecting: any;
    toolbarClick: any;
    dataSourceChange: any;
    childColumns: QueryList<ColumnsDirective>;
    childAggregates: QueryList<AggregatesDirective>;
    tags: string[];
    /**
     * The row template that renders customized rows from the given template.
     * By default, Grid renders a table row for every data source item.
     * > * It accepts either [template string](../../common/template-engine/) or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [`Row Template`](../../grid/row/) customization.
     *
     * @default null
     * @asptype string
     */
    rowTemplate: any;
    /**
     * The empty record template that renders customized element or text or image instead of displaying the empty record message in the grid.
     * > It accepts either the [template string](../../common/template-engine/) or the HTML element ID.
     * @default null
     * @asptype string
     */
    emptyRecordTemplate: any;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](../../common/template-engine/) or the HTML element ID.
     *
     *{% codeBlock src="grid/detail-template-api/index.ts" %}{% endcodeBlock %}
     *
     * @default null
     * @asptype string
     */
    detailTemplate: any;
    /**
     * It used to render toolbar template
     * @default null
     * @asptype string
     */
    toolbarTemplate: any;
    /**
     * It used to render pager template
     * @default null
     * @asptype string
     */
    pagerTemplate: any;
    editSettings_template: any;
    groupSettings_captionTemplate: any;
    columnChooserSettings_headerTemplate: any;
    columnChooserSettings_template: any;
    columnChooserSettings_footerTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridComponent, "ejs-grid", never, { "adaptiveUIMode": "adaptiveUIMode"; "aggregates": "aggregates"; "allowExcelExport": "allowExcelExport"; "allowFiltering": "allowFiltering"; "allowGrouping": "allowGrouping"; "allowKeyboard": "allowKeyboard"; "allowMultiSorting": "allowMultiSorting"; "allowPaging": "allowPaging"; "allowPdfExport": "allowPdfExport"; "allowReordering": "allowReordering"; "allowResizing": "allowResizing"; "allowRowDragAndDrop": "allowRowDragAndDrop"; "allowSelection": "allowSelection"; "allowSorting": "allowSorting"; "allowTextWrap": "allowTextWrap"; "autoFit": "autoFit"; "childGrid": "childGrid"; "clipMode": "clipMode"; "columnChooserSettings": "columnChooserSettings"; "columnMenuItems": "columnMenuItems"; "columnQueryMode": "columnQueryMode"; "columns": "columns"; "contextMenuItems": "contextMenuItems"; "cssClass": "cssClass"; "currencyCode": "currencyCode"; "currentAction": "currentAction"; "currentViewData": "currentViewData"; "dataSource": "dataSource"; "detailTemplate": "detailTemplate"; "editSettings": "editSettings"; "ej2StatePersistenceVersion": "ej2StatePersistenceVersion"; "emptyRecordTemplate": "emptyRecordTemplate"; "enableAdaptiveUI": "enableAdaptiveUI"; "enableAltRow": "enableAltRow"; "enableAutoFill": "enableAutoFill"; "enableColumnVirtualization": "enableColumnVirtualization"; "enableHeaderFocus": "enableHeaderFocus"; "enableHover": "enableHover"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enableImmutableMode": "enableImmutableMode"; "enableInfiniteScrolling": "enableInfiniteScrolling"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableStickyHeader": "enableStickyHeader"; "enableVirtualMaskRow": "enableVirtualMaskRow"; "enableVirtualization": "enableVirtualization"; "exportGrids": "exportGrids"; "filterSettings": "filterSettings"; "frozenColumns": "frozenColumns"; "frozenRows": "frozenRows"; "gridLines": "gridLines"; "groupSettings": "groupSettings"; "height": "height"; "hierarchyPrintMode": "hierarchyPrintMode"; "infiniteScrollSettings": "infiniteScrollSettings"; "loadingIndicator": "loadingIndicator"; "locale": "locale"; "pageSettings": "pageSettings"; "pagerTemplate": "pagerTemplate"; "parentDetails": "parentDetails"; "printMode": "printMode"; "query": "query"; "queryString": "queryString"; "resizeSettings": "resizeSettings"; "rowDropSettings": "rowDropSettings"; "rowHeight": "rowHeight"; "rowRenderingMode": "rowRenderingMode"; "rowTemplate": "rowTemplate"; "searchSettings": "searchSettings"; "selectedRowIndex": "selectedRowIndex"; "selectionSettings": "selectionSettings"; "showColumnChooser": "showColumnChooser"; "showColumnMenu": "showColumnMenu"; "showHider": "showHider"; "sortSettings": "sortSettings"; "textWrapSettings": "textWrapSettings"; "toolbar": "toolbar"; "toolbarTemplate": "toolbarTemplate"; "width": "width"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "batchAdd": "batchAdd"; "batchCancel": "batchCancel"; "batchDelete": "batchDelete"; "beforeAutoFill": "beforeAutoFill"; "beforeBatchAdd": "beforeBatchAdd"; "beforeBatchDelete": "beforeBatchDelete"; "beforeBatchSave": "beforeBatchSave"; "beforeCopy": "beforeCopy"; "beforeDataBound": "beforeDataBound"; "beforeDetailTemplateDetach": "beforeDetailTemplateDetach"; "beforeExcelExport": "beforeExcelExport"; "beforeOpenAdaptiveDialog": "beforeOpenAdaptiveDialog"; "beforeOpenColumnChooser": "beforeOpenColumnChooser"; "beforePaste": "beforePaste"; "beforePdfExport": "beforePdfExport"; "beforePrint": "beforePrint"; "beginEdit": "beginEdit"; "cellDeselected": "cellDeselected"; "cellDeselecting": "cellDeselecting"; "cellEdit": "cellEdit"; "cellSave": "cellSave"; "cellSaved": "cellSaved"; "cellSelected": "cellSelected"; "cellSelecting": "cellSelecting"; "checkBoxChange": "checkBoxChange"; "columnDataStateChange": "columnDataStateChange"; "columnDeselected": "columnDeselected"; "columnDeselecting": "columnDeselecting"; "columnDrag": "columnDrag"; "columnDragStart": "columnDragStart"; "columnDrop": "columnDrop"; "columnMenuClick": "columnMenuClick"; "columnMenuOpen": "columnMenuOpen"; "columnSelected": "columnSelected"; "columnSelecting": "columnSelecting"; "commandClick": "commandClick"; "contextMenuClick": "contextMenuClick"; "contextMenuOpen": "contextMenuOpen"; "created": "created"; "dataBound": "dataBound"; "dataSourceChanged": "dataSourceChanged"; "dataStateChange": "dataStateChange"; "destroyed": "destroyed"; "detailDataBound": "detailDataBound"; "excelAggregateQueryCellInfo": "excelAggregateQueryCellInfo"; "excelExportComplete": "excelExportComplete"; "excelHeaderQueryCellInfo": "excelHeaderQueryCellInfo"; "excelQueryCellInfo": "excelQueryCellInfo"; "exportDetailDataBound": "exportDetailDataBound"; "exportDetailTemplate": "exportDetailTemplate"; "exportGroupCaption": "exportGroupCaption"; "headerCellInfo": "headerCellInfo"; "keyPressed": "keyPressed"; "lazyLoadGroupCollapse": "lazyLoadGroupCollapse"; "lazyLoadGroupExpand": "lazyLoadGroupExpand"; "load": "load"; "pdfAggregateQueryCellInfo": "pdfAggregateQueryCellInfo"; "pdfExportComplete": "pdfExportComplete"; "pdfHeaderQueryCellInfo": "pdfHeaderQueryCellInfo"; "pdfQueryCellInfo": "pdfQueryCellInfo"; "printComplete": "printComplete"; "queryCellInfo": "queryCellInfo"; "recordClick": "recordClick"; "recordDoubleClick": "recordDoubleClick"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "rowDataBound": "rowDataBound"; "rowDeselected": "rowDeselected"; "rowDeselecting": "rowDeselecting"; "rowDrag": "rowDrag"; "rowDragStart": "rowDragStart"; "rowDragStartHelper": "rowDragStartHelper"; "rowDrop": "rowDrop"; "rowSelected": "rowSelected"; "rowSelecting": "rowSelecting"; "toolbarClick": "toolbarClick"; "dataSourceChange": "dataSourceChange"; }, ["rowTemplate", "emptyRecordTemplate", "detailTemplate", "toolbarTemplate", "pagerTemplate", "editSettings_template", "groupSettings_captionTemplate", "columnChooserSettings_headerTemplate", "columnChooserSettings_template", "columnChooserSettings_footerTemplate", "childColumns", "childAggregates"], never>;
}
