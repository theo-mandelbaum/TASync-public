import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { Grid } from '@syncfusion/ej2-grids';
import { StackedColumnsDirective, StackedColumnDirective, StackedColumnsPlugin, StackedColumnPlugin } from './stacked-column.directive';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { AggregateColumnsDirective, AggregateColumnDirective, AggregateColumnsPlugin, AggregateColumnPlugin } from './aggregate-columns.directive';
import { AggregatesDirective, AggregateDirective, AggregatesPlugin, AggregatePlugin } from './aggregates.directive';
export var properties = ['isLazyUpdate', 'plugins', 'adaptiveUIMode', 'aggregates', 'allowExcelExport', 'allowFiltering', 'allowGrouping', 'allowKeyboard', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'autoFit', 'childGrid', 'clipMode', 'columnChooserSettings', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'cssClass', 'currencyCode', 'currentAction', 'currentViewData', 'dataSource', 'detailTemplate', 'editSettings', 'ej2StatePersistenceVersion', 'emptyRecordTemplate', 'enableAdaptiveUI', 'enableAltRow', 'enableAutoFill', 'enableColumnVirtualization', 'enableHeaderFocus', 'enableHover', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableInfiniteScrolling', 'enablePersistence', 'enableRtl', 'enableStickyHeader', 'enableVirtualMaskRow', 'enableVirtualization', 'exportGrids', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'groupSettings', 'height', 'hierarchyPrintMode', 'infiniteScrollSettings', 'loadingIndicator', 'locale', 'pageSettings', 'pagerTemplate', 'parentDetails', 'printMode', 'query', 'queryString', 'resizeSettings', 'rowDropSettings', 'rowHeight', 'rowRenderingMode', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnChooser', 'showColumnMenu', 'showHider', 'sortSettings', 'textWrapSettings', 'toolbar', 'toolbarTemplate', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'batchAdd', 'batchCancel', 'batchDelete', 'beforeAutoFill', 'beforeBatchAdd', 'beforeBatchDelete', 'beforeBatchSave', 'beforeCopy', 'beforeDataBound', 'beforeDetailTemplateDetach', 'beforeExcelExport', 'beforeOpenAdaptiveDialog', 'beforeOpenColumnChooser', 'beforePaste', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSaved', 'cellSelected', 'cellSelecting', 'checkBoxChange', 'columnDataStateChange', 'columnDeselected', 'columnDeselecting', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'columnSelected', 'columnSelecting', 'commandClick', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'destroyed', 'detailDataBound', 'excelAggregateQueryCellInfo', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'exportDetailDataBound', 'exportDetailTemplate', 'exportGroupCaption', 'headerCellInfo', 'keyPressed', 'lazyLoadGroupCollapse', 'lazyLoadGroupExpand', 'load', 'pdfAggregateQueryCellInfo', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordClick', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick'];
export var modelProps = ['dataSource'];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ejs-grid` represents the VueJS Grid Component.
 * ```vue
 * <ejs-grid :dataSource='data' allowPaging='true' allowSorting='true'></ejs-grid>
 * ```
 */
export var GridComponent = vueDefineComponent({
    name: 'GridComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Grid({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-columns": { "e-column": { "e-stacked-columns": "e-stacked-column" } }, "e-aggregates": { "e-aggregate": { "e-columns": "e-column" } } },
            tagNameMapper: { "e-stacked-columns": "e-columns" },
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
        this.updated = this.updated;
    },
    render: function (createElement) {
        var h = !isExecute ? gh : createElement;
        var slots = null;
        if (!isNullOrUndefined(this.$slots.default)) {
            slots = !isExecute ? this.$slots.default() : this.$slots.default;
        }
        return h('div', slots);
    },
    methods: {
        clearTemplate: function (templateNames) {
            if (!templateNames) {
                templateNames = Object.keys(this.templateCollection || {});
            }
            if (templateNames.length && this.templateCollection) {
                for (var _i = 0, templateNames_1 = templateNames; _i < templateNames_1.length; _i++) {
                    var tempName = templateNames_1[_i];
                    var elementCollection = this.templateCollection[tempName];
                    if (elementCollection && elementCollection.length) {
                        for (var _a = 0, elementCollection_1 = elementCollection; _a < elementCollection_1.length; _a++) {
                            var ele = elementCollection_1[_a];
                            this.destroyPortals(ele);
                        }
                        delete this.templateCollection[tempName];
                    }
                }
            }
        },
        setProperties: function (prop, muteOnChange) {
            var _this = this;
            if (this.isVue3) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if (this.ej2Instances && this.ej2Instances._setProperties) {
                this.ej2Instances._setProperties(prop, muteOnChange);
            }
            if (prop && this.models && this.models.length) {
                Object.keys(prop).map(function (key) {
                    _this.models.map(function (model) {
                        if ((key === model) && !(/datasource/i.test(key))) {
                            if (_this.isVue3) {
                                _this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                            }
                            else {
                                _this.$emit('update:' + key, prop[key]);
                                _this.$emit('modelchanged', prop[key]);
                            }
                        }
                    });
                });
            }
        },
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addRecord: function (data, index) {
            return this.ej2Instances.addRecord(data, index);
        },
        addShimmerEffect: function () {
            return this.ej2Instances.addShimmerEffect();
        },
        autoFitColumns: function (fieldNames, startRowIndex, endRowIndex) {
            return this.ej2Instances.autoFitColumns(fieldNames, startRowIndex, endRowIndex);
        },
        batchAsyncUpdate: function (changes) {
            return this.ej2Instances.batchAsyncUpdate(changes);
        },
        batchUpdate: function (changes) {
            return this.ej2Instances.batchUpdate(changes);
        },
        calculatePageSizeByParentHeight: function (containerHeight) {
            return this.ej2Instances.calculatePageSizeByParentHeight(containerHeight);
        },
        changeDataSource: function (dataSource, columns) {
            return this.ej2Instances.changeDataSource(dataSource, columns);
        },
        clearCellSelection: function () {
            return this.ej2Instances.clearCellSelection();
        },
        clearFiltering: function (fields) {
            return this.ej2Instances.clearFiltering(fields);
        },
        clearGrouping: function () {
            return this.ej2Instances.clearGrouping();
        },
        clearRowSelection: function () {
            return this.ej2Instances.clearRowSelection();
        },
        clearSelection: function () {
            return this.ej2Instances.clearSelection();
        },
        clearSorting: function () {
            return this.ej2Instances.clearSorting();
        },
        closeEdit: function () {
            return this.ej2Instances.closeEdit();
        },
        copy: function (withHeader) {
            return this.ej2Instances.copy(withHeader);
        },
        csvExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        dataReady: function () {
            return this.ej2Instances.dataReady();
        },
        deleteRecord: function (fieldname, data) {
            return this.ej2Instances.deleteRecord(fieldname, data);
        },
        deleteRow: function (tr) {
            return this.ej2Instances.deleteRow(tr);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        destroyTemplate: function (propertyNames, index) {
            return this.ej2Instances.destroyTemplate(propertyNames, index);
        },
        detailCollapseAll: function () {
            return this.ej2Instances.detailCollapseAll();
        },
        detailExpandAll: function () {
            return this.ej2Instances.detailExpandAll();
        },
        editCell: function (index, field) {
            return this.ej2Instances.editCell(index, field);
        },
        enableToolbarItems: function (items, isEnable) {
            return this.ej2Instances.enableToolbarItems(items, isEnable);
        },
        endEdit: function () {
            return this.ej2Instances.endEdit();
        },
        excelExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        extendRequiredModules: function (modules) {
            return this.ej2Instances.extendRequiredModules(modules);
        },
        filterByColumn: function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator) {
            return this.ej2Instances.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator);
        },
        getBatchChanges: function () {
            return this.ej2Instances.getBatchChanges();
        },
        getCellFromIndex: function (rowIndex, columnIndex) {
            return this.ej2Instances.getCellFromIndex(rowIndex, columnIndex);
        },
        getColumnByField: function (field) {
            return this.ej2Instances.getColumnByField(field);
        },
        getColumnByUid: function (uid, isColumns) {
            return this.ej2Instances.getColumnByUid(uid, isColumns);
        },
        getColumnFieldNames: function () {
            return this.ej2Instances.getColumnFieldNames();
        },
        getColumnHeaderByField: function (field) {
            return this.ej2Instances.getColumnHeaderByField(field);
        },
        getColumnHeaderByIndex: function (index) {
            return this.ej2Instances.getColumnHeaderByIndex(index);
        },
        getColumnHeaderByUid: function (uid) {
            return this.ej2Instances.getColumnHeaderByUid(uid);
        },
        getColumnIndexByField: function (field) {
            return this.ej2Instances.getColumnIndexByField(field);
        },
        getColumnIndexByUid: function (uid) {
            return this.ej2Instances.getColumnIndexByUid(uid);
        },
        getColumns: function (isRefresh) {
            return this.ej2Instances.getColumns(isRefresh);
        },
        getContent: function () {
            return this.ej2Instances.getContent();
        },
        getContentTable: function () {
            return this.ej2Instances.getContentTable();
        },
        getCurrentViewRecords: function () {
            return this.ej2Instances.getCurrentViewRecords();
        },
        getDataModule: function () {
            return this.ej2Instances.getDataModule();
        },
        getDataRows: function () {
            return this.ej2Instances.getDataRows();
        },
        getFilterUIInfo: function () {
            return this.ej2Instances.getFilterUIInfo();
        },
        getFilteredRecords: function () {
            return this.ej2Instances.getFilteredRecords();
        },
        getFooterContent: function () {
            return this.ej2Instances.getFooterContent();
        },
        getFooterContentTable: function () {
            return this.ej2Instances.getFooterContentTable();
        },
        getForeignKeyColumns: function () {
            return this.ej2Instances.getForeignKeyColumns();
        },
        getFrozenDataRows: function () {
            return this.ej2Instances.getFrozenDataRows();
        },
        getFrozenLeftColumnHeaderByIndex: function (index) {
            return this.ej2Instances.getFrozenLeftColumnHeaderByIndex(index);
        },
        getFrozenLeftCount: function () {
            return this.ej2Instances.getFrozenLeftCount();
        },
        getFrozenMode: function () {
            return this.ej2Instances.getFrozenMode();
        },
        getFrozenRightCellFromIndex: function (rowIndex, columnIndex) {
            return this.ej2Instances.getFrozenRightCellFromIndex(rowIndex, columnIndex);
        },
        getFrozenRightColumnHeaderByIndex: function (index) {
            return this.ej2Instances.getFrozenRightColumnHeaderByIndex(index);
        },
        getFrozenRightDataRows: function () {
            return this.ej2Instances.getFrozenRightDataRows();
        },
        getFrozenRightRowByIndex: function (index) {
            return this.ej2Instances.getFrozenRightRowByIndex(index);
        },
        getFrozenRightRows: function () {
            return this.ej2Instances.getFrozenRightRows();
        },
        getFrozenRowByIndex: function (index) {
            return this.ej2Instances.getFrozenRowByIndex(index);
        },
        getHeaderContent: function () {
            return this.ej2Instances.getHeaderContent();
        },
        getHeaderTable: function () {
            return this.ej2Instances.getHeaderTable();
        },
        getHiddenColumns: function () {
            return this.ej2Instances.getHiddenColumns();
        },
        getMediaColumns: function () {
            return this.ej2Instances.getMediaColumns();
        },
        getMovableCellFromIndex: function (rowIndex, columnIndex) {
            return this.ej2Instances.getMovableCellFromIndex(rowIndex, columnIndex);
        },
        getMovableColumnHeaderByIndex: function (index) {
            return this.ej2Instances.getMovableColumnHeaderByIndex(index);
        },
        getMovableDataRows: function () {
            return this.ej2Instances.getMovableDataRows();
        },
        getMovableRowByIndex: function (index) {
            return this.ej2Instances.getMovableRowByIndex(index);
        },
        getMovableRows: function () {
            return this.ej2Instances.getMovableRows();
        },
        getPager: function () {
            return this.ej2Instances.getPager();
        },
        getPrimaryKeyFieldNames: function () {
            return this.ej2Instances.getPrimaryKeyFieldNames();
        },
        getRowByIndex: function (index) {
            return this.ej2Instances.getRowByIndex(index);
        },
        getRowIndexByPrimaryKey: function (value) {
            return this.ej2Instances.getRowIndexByPrimaryKey(value);
        },
        getRowInfo: function (target) {
            return this.ej2Instances.getRowInfo(target);
        },
        getRows: function () {
            return this.ej2Instances.getRows();
        },
        getRowsObject: function () {
            return this.ej2Instances.getRowsObject();
        },
        getSelectedColumnsUid: function () {
            return this.ej2Instances.getSelectedColumnsUid();
        },
        getSelectedRecords: function () {
            return this.ej2Instances.getSelectedRecords();
        },
        getSelectedRowCellIndexes: function () {
            return this.ej2Instances.getSelectedRowCellIndexes();
        },
        getSelectedRowIndexes: function () {
            return this.ej2Instances.getSelectedRowIndexes();
        },
        getSelectedRows: function () {
            return this.ej2Instances.getSelectedRows();
        },
        getSummaryValues: function (summaryCol, summaryData) {
            return this.ej2Instances.getSummaryValues(summaryCol, summaryData);
        },
        getUidByColumnField: function (field) {
            return this.ej2Instances.getUidByColumnField(field);
        },
        getVisibleColumns: function () {
            return this.ej2Instances.getVisibleColumns();
        },
        goToPage: function (pageNo) {
            return this.ej2Instances.goToPage(pageNo);
        },
        groupCollapseAll: function () {
            return this.ej2Instances.groupCollapseAll();
        },
        groupColumn: function (columnName) {
            return this.ej2Instances.groupColumn(columnName);
        },
        groupExpandAll: function () {
            return this.ej2Instances.groupExpandAll();
        },
        hideColumns: function (keys, hideBy) {
            return this.ej2Instances.hideColumns(keys, hideBy);
        },
        hideScroll: function () {
            return this.ej2Instances.hideScroll();
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        isFrozenGrid: function () {
            return this.ej2Instances.isFrozenGrid();
        },
        openColumnChooser: function (x, y) {
            return this.ej2Instances.openColumnChooser(x, y);
        },
        pdfExport: function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
            return this.ej2Instances.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
        },
        print: function () {
            return this.ej2Instances.print();
        },
        refresh: function () {
            return this.ej2Instances.refresh();
        },
        refreshColumns: function () {
            return this.ej2Instances.refreshColumns();
        },
        refreshHeader: function () {
            return this.ej2Instances.refreshHeader();
        },
        removeMaskRow: function () {
            return this.ej2Instances.removeMaskRow();
        },
        reorderColumnByIndex: function (fromIndex, toIndex) {
            return this.ej2Instances.reorderColumnByIndex(fromIndex, toIndex);
        },
        reorderColumnByTargetIndex: function (fieldName, toIndex) {
            return this.ej2Instances.reorderColumnByTargetIndex(fieldName, toIndex);
        },
        reorderColumns: function (fromFName, toFName) {
            return this.ej2Instances.reorderColumns(fromFName, toFName);
        },
        reorderRows: function (fromIndexes, toIndex) {
            return this.ej2Instances.reorderRows(fromIndexes, toIndex);
        },
        saveCell: function () {
            return this.ej2Instances.saveCell();
        },
        search: function (searchString) {
            return this.ej2Instances.search(searchString);
        },
        selectCell: function (cellIndex, isToggle) {
            return this.ej2Instances.selectCell(cellIndex, isToggle);
        },
        selectCells: function (rowCellIndexes) {
            return this.ej2Instances.selectCells(rowCellIndexes);
        },
        selectCellsByRange: function (startIndex, endIndex) {
            return this.ej2Instances.selectCellsByRange(startIndex, endIndex);
        },
        selectRow: function (index, isToggle) {
            return this.ej2Instances.selectRow(index, isToggle);
        },
        selectRows: function (rowIndexes) {
            return this.ej2Instances.selectRows(rowIndexes);
        },
        selectRowsByRange: function (startIndex, endIndex) {
            return this.ej2Instances.selectRowsByRange(startIndex, endIndex);
        },
        serverCsvExport: function (url, headers) {
            return this.ej2Instances.serverCsvExport(url, headers);
        },
        serverExcelExport: function (url, headers) {
            return this.ej2Instances.serverExcelExport(url, headers);
        },
        serverPdfExport: function (url, headers) {
            return this.ej2Instances.serverPdfExport(url, headers);
        },
        setCellValue: function (key, field, value) {
            return this.ej2Instances.setCellValue(key, field, value);
        },
        setGridContent: function (element) {
            return this.ej2Instances.setGridContent(element);
        },
        setGridContentTable: function (element) {
            return this.ej2Instances.setGridContentTable(element);
        },
        setGridHeaderContent: function (element) {
            return this.ej2Instances.setGridHeaderContent(element);
        },
        setGridHeaderTable: function (element) {
            return this.ej2Instances.setGridHeaderTable(element);
        },
        setGridPager: function (element) {
            return this.ej2Instances.setGridPager(element);
        },
        setRowData: function (key, rowData) {
            return this.ej2Instances.setRowData(key, rowData);
        },
        showAdaptiveFilterDialog: function () {
            return this.ej2Instances.showAdaptiveFilterDialog();
        },
        showAdaptiveSortDialog: function () {
            return this.ej2Instances.showAdaptiveSortDialog();
        },
        showColumns: function (keys, showBy) {
            return this.ej2Instances.showColumns(keys, showBy);
        },
        showMaskRow: function (axisDirection, dialogElement) {
            return this.ej2Instances.showMaskRow(axisDirection, dialogElement);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
        sortColumn: function (columnName, direction, isMultiSort) {
            return this.ej2Instances.sortColumn(columnName, direction, isMultiSort);
        },
        startEdit: function () {
            return this.ej2Instances.startEdit();
        },
        ungroupColumn: function (columnName) {
            return this.ej2Instances.ungroupColumn(columnName);
        },
        updateCell: function (rowIndex, field, value) {
            return this.ej2Instances.updateCell(rowIndex, field, value);
        },
        updateExternalMessage: function (message) {
            return this.ej2Instances.updateExternalMessage(message);
        },
        updateRow: function (index, data) {
            return this.ej2Instances.updateRow(index, data);
        },
        updateRowValue: function (key, rowData) {
            return this.ej2Instances.updateRowValue(key, rowData);
        },
    }
});
export var GridPlugin = {
    name: 'ejs-grid',
    install: function (Vue) {
        Vue.component(GridPlugin.name, GridComponent);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(StackedColumnPlugin.name, StackedColumnDirective);
        Vue.component(StackedColumnsPlugin.name, StackedColumnsDirective);
        Vue.component(AggregatePlugin.name, AggregateDirective);
        Vue.component(AggregatesPlugin.name, AggregatesDirective);
        Vue.component(AggregateColumnPlugin.name, AggregateColumnDirective);
        Vue.component(AggregateColumnsPlugin.name, AggregateColumnsDirective);
    }
};
