import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PivotView } from '@syncfusion/ej2-pivotview';
export var properties = ['isLazyUpdate', 'plugins', 'aggregateTypes', 'allowCalculatedField', 'allowConditionalFormatting', 'allowDataCompression', 'allowDeferLayoutUpdate', 'allowDrillThrough', 'allowExcelExport', 'allowGrouping', 'allowNumberFormatting', 'allowPdfExport', 'cellTemplate', 'chartSettings', 'chartTypes', 'cssClass', 'dataSourceSettings', 'displayOption', 'editSettings', 'enableFieldSearching', 'enableHtmlSanitizer', 'enablePaging', 'enablePersistence', 'enableRtl', 'enableValueSorting', 'enableVirtualization', 'exportAllPages', 'gridSettings', 'groupingBarSettings', 'height', 'hyperlinkSettings', 'loadOnDemandInMemberEditor', 'locale', 'maxNodeLimitInMemberEditor', 'maxRowsInDrillThrough', 'pageSettings', 'pagerSettings', 'pivotValues', 'showFieldList', 'showGroupingBar', 'showToolbar', 'showTooltip', 'showValuesButton', 'spinnerTemplate', 'toolbar', 'toolbarTemplate', 'tooltipTemplate', 'virtualScrollSettings', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'afterServiceInvoke', 'aggregateCellInfo', 'aggregateMenuOpen', 'beforeExport', 'beforeServiceInvoke', 'beginDrillThrough', 'calculatedFieldCreate', 'cellClick', 'cellSelected', 'cellSelecting', 'chartSeriesCreated', 'conditionalFormatting', 'created', 'dataBound', 'destroyed', 'drill', 'drillThrough', 'editCompleted', 'enginePopulated', 'enginePopulating', 'exportComplete', 'fetchReport', 'fieldDragStart', 'fieldDrop', 'fieldListRefreshed', 'fieldRemove', 'hyperlinkCellClick', 'load', 'loadReport', 'memberEditorOpen', 'memberFiltering', 'newReport', 'numberFormatting', 'onFieldDropped', 'onHeadersSort', 'onPdfCellRender', 'removeReport', 'renameReport', 'saveReport', 'toolbarClick', 'toolbarRender'];
export var modelProps = [];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ejs-pivotview` represents the VueJS Pivot Table Component.
 * ```vue
 * <ejs-pivotview></ejs-pivotview>
 * ```
 */
export var PivotViewComponent = vueDefineComponent({
    name: 'PivotViewComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new PivotView({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: false,
            hasInjectedModules: true,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
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
        custom: function () {
            this.updated();
        },
        chartExport: function (type, pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
            return this.ej2Instances.chartExport(type, pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
        },
        createCalculatedFieldDialog: function () {
            return this.ej2Instances.createCalculatedFieldDialog();
        },
        csvExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        excelExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        loadPersistData: function (persistData) {
            return this.ej2Instances.loadPersistData(persistData);
        },
        pdfExport: function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob, exportBothTableAndChart) {
            return this.ej2Instances.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob, exportBothTableAndChart);
        },
        printChart: function () {
            return this.ej2Instances.printChart();
        },
        refresh: function () {
            return this.ej2Instances.refresh();
        },
        showConditionalFormattingDialog: function () {
            return this.ej2Instances.showConditionalFormattingDialog();
        },
        showNumberFormattingDialog: function () {
            return this.ej2Instances.showNumberFormattingDialog();
        },
    }
});
export var PivotViewPlugin = {
    name: 'ejs-pivotview',
    install: function (Vue) {
        Vue.component(PivotViewPlugin.name, PivotViewComponent);
    }
};
