import { TreeGrid } from '@syncfusion/ej2-treegrid';
export * from '@syncfusion/ej2-treegrid';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var StackedColumnsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-stacked-columns';
        }
    }
});
var StackedColumnsPlugin = {
    name: 'e-stacked-columns',
    install: function (Vue) {
        Vue.component(StackedColumnsPlugin.name, StackedColumnsDirective);
    }
};
var StackedColumnDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stacked-column';
        }
    }
});
var StackedColumnPlugin = {
    name: 'e-stacked-column',
    install: function (Vue) {
        Vue.component(StackedColumnPlugin.name, StackedColumnDirective);
    }
};

var ColumnsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-columns';
        }
    }
});
var ColumnsPlugin = {
    name: 'e-columns',
    install: function (Vue) {
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
    }
};
/**
 * `e-column` directive represent a column of the VueJS TreeGrid.
 * It must be contained in a TreeGrid component(`ejs-treegrid`).
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='100'/>
 *    <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 * </ejs-treegrid>
 * ```
 */
var ColumnDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-column';
        }
    }
});
var ColumnPlugin = {
    name: 'e-column',
    install: function (Vue) {
        Vue.component(ColumnPlugin.name, ColumnDirective);
    }
};

var AggregateColumnsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-columns';
        }
    }
});
var AggregateColumnsPlugin = {
    name: 'e-columns',
    install: function (Vue) {
        Vue.component(AggregateColumnsPlugin.name, AggregateColumnsDirective);
    }
};
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the VueJS TreeGrid.
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'/>
 *     <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'/>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-treegrid>
 * ```
 */
var AggregateColumnDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-column';
        }
    }
});
var AggregateColumnPlugin = {
    name: 'e-column',
    install: function (Vue) {
        Vue.component(AggregateColumnPlugin.name, AggregateColumnDirective);
    }
};

var AggregatesDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-aggregates';
        }
    }
});
var AggregatesPlugin = {
    name: 'e-aggregates',
    install: function (Vue) {
        Vue.component(AggregatesPlugin.name, AggregatesDirective);
    }
};
/**
 * `e-aggregate` directive represent a aggregate row of the VueJS TreeGrid.
 * It must be contained in a TreeGrid component(`ejs-treegrid`).
 * ```vue
 * <ejs-treegrid :dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'/>
 *     <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'/>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-treegrid>
 * ```
 */
var AggregateDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-aggregate';
        }
    }
});
var AggregatePlugin = {
    name: 'e-aggregate',
    install: function (Vue) {
        Vue.component(AggregatePlugin.name, AggregateDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'aggregates', 'allowExcelExport', 'allowFiltering', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'autoCheckHierarchy', 'childMapping', 'clipMode', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'copyHierarchyMode', 'currencyCode', 'dataSource', 'detailTemplate', 'editSettings', 'enableAdaptiveUI', 'enableAltRow', 'enableAutoFill', 'enableCollapseAll', 'enableColumnVirtualization', 'enableHover', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableInfiniteScrolling', 'enablePersistence', 'enableRtl', 'enableVirtualMaskRow', 'enableVirtualization', 'expandStateMapping', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'hasChildMapping', 'height', 'idMapping', 'infiniteScrollSettings', 'loadChildOnDemand', 'loadingIndicator', 'locale', 'pageSettings', 'parentIdMapping', 'printMode', 'query', 'rowDropSettings', 'rowHeight', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnChooser', 'showColumnMenu', 'sortSettings', 'textWrapSettings', 'toolbar', 'treeColumnIndex', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'batchAdd', 'batchCancel', 'batchDelete', 'beforeBatchAdd', 'beforeBatchDelete', 'beforeBatchSave', 'beforeCopy', 'beforeDataBound', 'beforeExcelExport', 'beforePaste', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSaved', 'cellSelected', 'cellSelecting', 'checkboxChange', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'detailDataBound', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick'];
var modelProps = ['dataSource'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ejs-treegrid` represents the VueJS TreeGrid Component.
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'></ejs-treegrid>
 * ```
 */
var TreeGridComponent = vueDefineComponent({
    name: 'TreeGridComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new TreeGrid({}),
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
        addRecord: function (data, index, position) {
            return this.ej2Instances.addRecord(data, index, position);
        },
        autoFitColumns: function (fieldNames) {
            return this.ej2Instances.autoFitColumns(fieldNames);
        },
        clearFiltering: function () {
            return this.ej2Instances.clearFiltering();
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
        collapseAll: function () {
            return this.ej2Instances.collapseAll();
        },
        collapseAtLevel: function (level) {
            return this.ej2Instances.collapseAtLevel(level);
        },
        collapseByKey: function (key) {
            return this.ej2Instances.collapseByKey(key);
        },
        collapseRow: function (row, record, key) {
            return this.ej2Instances.collapseRow(row, record, key);
        },
        copy: function (withHeader) {
            return this.ej2Instances.copy(withHeader);
        },
        csvExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        deleteRecord: function (fieldName, data) {
            return this.ej2Instances.deleteRecord(fieldName, data);
        },
        deleteRow: function (tr) {
            return this.ej2Instances.deleteRow(tr);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        editCell: function (rowIndex, field) {
            return this.ej2Instances.editCell(rowIndex, field);
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
        expandAll: function () {
            return this.ej2Instances.expandAll();
        },
        expandAtLevel: function (level) {
            return this.ej2Instances.expandAtLevel(level);
        },
        expandByKey: function (key) {
            return this.ej2Instances.expandByKey(key);
        },
        expandRow: function (row, record, key, level) {
            return this.ej2Instances.expandRow(row, record, key, level);
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
        getCheckedRecords: function () {
            return this.ej2Instances.getCheckedRecords();
        },
        getCheckedRowIndexes: function () {
            return this.ej2Instances.getCheckedRowIndexes();
        },
        getColumnByField: function (field) {
            return this.ej2Instances.getColumnByField(field);
        },
        getColumnByUid: function (uid) {
            return this.ej2Instances.getColumnByUid(uid);
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
        getFooterContent: function () {
            return this.ej2Instances.getFooterContent();
        },
        getFooterContentTable: function () {
            return this.ej2Instances.getFooterContentTable();
        },
        getFrozenLeftColumnHeaderByIndex: function (index) {
            return this.ej2Instances.getFrozenLeftColumnHeaderByIndex(index);
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
        getHeaderContent: function () {
            return this.ej2Instances.getHeaderContent();
        },
        getHeaderTable: function () {
            return this.ej2Instances.getHeaderTable();
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
        getRowInfo: function (target) {
            return this.ej2Instances.getRowInfo(target);
        },
        getRows: function () {
            return this.ej2Instances.getRows();
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
        getUidByColumnField: function (field) {
            return this.ej2Instances.getUidByColumnField(field);
        },
        getVisibleColumns: function () {
            return this.ej2Instances.getVisibleColumns();
        },
        getVisibleRecords: function () {
            return this.ej2Instances.getVisibleRecords();
        },
        goToPage: function (pageNo) {
            return this.ej2Instances.goToPage(pageNo);
        },
        hideColumns: function (keys, hideBy) {
            return this.ej2Instances.hideColumns(keys, hideBy);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        indent: function (record) {
            return this.ej2Instances.indent(record);
        },
        openColumnChooser: function (x, y) {
            return this.ej2Instances.openColumnChooser(x, y);
        },
        outdent: function (record) {
            return this.ej2Instances.outdent(record);
        },
        paste: function (data, rowIndex, colIndex) {
            return this.ej2Instances.paste(data, rowIndex, colIndex);
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
        refreshColumns: function (refreshUI) {
            return this.ej2Instances.refreshColumns(refreshUI);
        },
        refreshHeader: function () {
            return this.ej2Instances.refreshHeader();
        },
        reorderColumns: function (fromFName, toFName) {
            return this.ej2Instances.reorderColumns(fromFName, toFName);
        },
        reorderRows: function (fromIndexes, toIndex, position) {
            return this.ej2Instances.reorderRows(fromIndexes, toIndex, position);
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
        selectCheckboxes: function (indexes) {
            return this.ej2Instances.selectCheckboxes(indexes);
        },
        selectRow: function (index, isToggle) {
            return this.ej2Instances.selectRow(index, isToggle);
        },
        selectRows: function (rowIndexes) {
            return this.ej2Instances.selectRows(rowIndexes);
        },
        serverCsvExport: function (url) {
            return this.ej2Instances.serverCsvExport(url);
        },
        serverExcelExport: function (url) {
            return this.ej2Instances.serverExcelExport(url);
        },
        serverPdfExport: function (url) {
            return this.ej2Instances.serverPdfExport(url);
        },
        setCellValue: function (key, field, value) {
            return this.ej2Instances.setCellValue(key, field, value);
        },
        setRowData: function (key, rowData) {
            return this.ej2Instances.setRowData(key, rowData);
        },
        showColumns: function (keys, showBy) {
            return this.ej2Instances.showColumns(keys, showBy);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
        sortByColumn: function (columnName, direction, isMultiSort) {
            return this.ej2Instances.sortByColumn(columnName, direction, isMultiSort);
        },
        startEdit: function (row) {
            return this.ej2Instances.startEdit(row);
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
    }
});
var TreeGridPlugin = {
    name: 'ejs-treegrid',
    install: function (Vue) {
        Vue.component(TreeGridPlugin.name, TreeGridComponent);
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

export { AggregateColumnDirective, AggregateColumnPlugin, AggregateColumnsDirective, AggregateColumnsPlugin, AggregateDirective, AggregatePlugin, AggregatesDirective, AggregatesPlugin, ColumnDirective, ColumnPlugin, ColumnsDirective, ColumnsPlugin, StackedColumnDirective, StackedColumnPlugin, StackedColumnsDirective, StackedColumnsPlugin, TreeGridComponent, TreeGridPlugin };
//# sourceMappingURL=ej2-vue-treegrid.es5.js.map
