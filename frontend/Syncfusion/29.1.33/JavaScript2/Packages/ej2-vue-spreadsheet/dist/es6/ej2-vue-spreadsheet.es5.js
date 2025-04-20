import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
export * from '@syncfusion/ej2-spreadsheet';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

var ImagesDirective = vueDefineComponent({
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
            return 'e-images';
        }
    }
});
var ImagesPlugin = {
    name: 'e-images',
    install: function (Vue) {
        Vue.component(ImagesPlugin.name, ImagesDirective);
    }
};
var ImageDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-image';
        }
    }
});
var ImagePlugin = {
    name: 'e-image',
    install: function (Vue) {
        Vue.component(ImagePlugin.name, ImageDirective);
    }
};

var ChartsDirective = vueDefineComponent({
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
            return 'e-charts';
        }
    }
});
var ChartsPlugin = {
    name: 'e-charts',
    install: function (Vue) {
        Vue.component(ChartsPlugin.name, ChartsDirective);
    }
};
var ChartDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart';
        }
    }
});
var ChartPlugin = {
    name: 'e-chart',
    install: function (Vue) {
        Vue.component(ChartPlugin.name, ChartDirective);
    }
};

var CellsDirective = vueDefineComponent({
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
            return 'e-cells';
        }
    }
});
var CellsPlugin = {
    name: 'e-cells',
    install: function (Vue) {
        Vue.component(CellsPlugin.name, CellsDirective);
    }
};
/**
 * `e-cell` directive represent a cell of the VueJS Spreadsheet.
 * It must be contained in a `e-row` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rows>
 *    <e-row>
 *    <e-cells>
 *    <e-cell value='A1'></e-cell>
 *    </e-cells>
 *    </e-row>
 *    </e-rows>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var CellDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-cell';
        }
    }
});
var CellPlugin = {
    name: 'e-cell',
    install: function (Vue) {
        Vue.component(CellPlugin.name, CellDirective);
    }
};

var RowsDirective = vueDefineComponent({
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
            return 'e-rows';
        }
    }
});
var RowsPlugin = {
    name: 'e-rows',
    install: function (Vue) {
        Vue.component(RowsPlugin.name, RowsDirective);
    }
};
/**
 * `e-row` directive represent a row of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rows>
 *    <e-row></e-row>
 *    </e-rows>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var RowDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-row';
        }
    }
});
var RowPlugin = {
    name: 'e-row',
    install: function (Vue) {
        Vue.component(RowPlugin.name, RowDirective);
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
 * `e-column` directive represent a column of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-columns>
 *    <e-column></e-column>
 *    </e-columns>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
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

var RangesDirective = vueDefineComponent({
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
            return 'e-ranges';
        }
    }
});
var RangesPlugin = {
    name: 'e-ranges',
    install: function (Vue) {
        Vue.component(RangesPlugin.name, RangesDirective);
    }
};
/**
 * `e-range` directive represent a range of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-ranges>
 *    <e-range :dataSource='data'></e-range>
 *    </e-ranges>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var RangeDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-range';
        }
    }
});
var RangePlugin = {
    name: 'e-range',
    install: function (Vue) {
        Vue.component(RangePlugin.name, RangeDirective);
    }
};

var ConditionalFormatsDirective = vueDefineComponent({
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
            return 'e-conditionalformats';
        }
    }
});
var ConditionalFormatsPlugin = {
    name: 'e-conditionalformats',
    install: function (Vue) {
        Vue.component(ConditionalFormatsPlugin.name, ConditionalFormatsDirective);
    }
};
/**
 * `e-conditionalformat` directive represent a conditionalformat of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-conditionalformats>
 *    <e-conditionalformat></e-conditionalformat>
 *    </e-conditionalformats>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var ConditionalFormatDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-conditionalformat';
        }
    }
});
var ConditionalFormatPlugin = {
    name: 'e-conditionalformat',
    install: function (Vue) {
        Vue.component(ConditionalFormatPlugin.name, ConditionalFormatDirective);
    }
};

var SheetsDirective = vueDefineComponent({
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
            return 'e-sheets';
        }
    }
});
var SheetsPlugin = {
    name: 'e-sheets',
    install: function (Vue) {
        Vue.component(SheetsPlugin.name, SheetsDirective);
    }
};
/**
 * `e-sheet` directive represent a sheet of the VueJS Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet></e-sheet>
 *    <e-sheet></e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var SheetDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-sheet';
        }
    }
});
var SheetPlugin = {
    name: 'e-sheet',
    install: function (Vue) {
        Vue.component(SheetPlugin.name, SheetDirective);
    }
};

var DefinedNamesDirective = vueDefineComponent({
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
            return 'e-definednames';
        }
    }
});
var DefinedNamesPlugin = {
    name: 'e-definednames',
    install: function (Vue) {
        Vue.component(DefinedNamesPlugin.name, DefinedNamesDirective);
    }
};
/**
 * `e-definedname` directive represent a defined name of the VueJS Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```vue
 * <ejs-spreadsheet>
 *   <e-definednames>
 *    <e-definedname></e-definedname>
 *    <e-definedname></e-definedname>
 *   </e-definednames>
 * </ejs-spreadsheet>
 * ```
 */
var DefinedNameDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-definedname';
        }
    }
});
var DefinedNamePlugin = {
    name: 'e-definedname',
    install: function (Vue) {
        Vue.component(DefinedNamePlugin.name, DefinedNameDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'activeSheetIndex', 'allowAutoFill', 'allowCellFormatting', 'allowChart', 'allowConditionalFormat', 'allowDataValidation', 'allowDelete', 'allowEditing', 'allowFiltering', 'allowFindAndReplace', 'allowFreezePane', 'allowHyperlink', 'allowImage', 'allowInsert', 'allowMerge', 'allowNumberFormatting', 'allowOpen', 'allowPrint', 'allowResizing', 'allowSave', 'allowScrolling', 'allowSorting', 'allowUndoRedo', 'allowWrap', 'autoFillSettings', 'calculationMode', 'cellStyle', 'cssClass', 'currencyCode', 'definedNames', 'enableClipboard', 'enableContextMenu', 'enableKeyboardNavigation', 'enableKeyboardShortcut', 'enableNotes', 'enablePersistence', 'enableRtl', 'height', 'isProtected', 'listSeparator', 'locale', 'openSettings', 'openUrl', 'password', 'saveUrl', 'scrollSettings', 'selectionSettings', 'sheets', 'showAggregate', 'showFormulaBar', 'showRibbon', 'showSheetTabs', 'width', 'actionBegin', 'actionComplete', 'afterHyperlinkClick', 'afterHyperlinkCreate', 'beforeCellFormat', 'beforeCellRender', 'beforeCellSave', 'beforeCellUpdate', 'beforeConditionalFormat', 'beforeDataBound', 'beforeHyperlinkClick', 'beforeHyperlinkCreate', 'beforeOpen', 'beforeSave', 'beforeSelect', 'beforeSort', 'cellEdit', 'cellEdited', 'cellEditing', 'cellSave', 'contextMenuBeforeClose', 'contextMenuBeforeOpen', 'contextMenuItemSelect', 'created', 'dataBound', 'dataSourceChanged', 'dialogBeforeOpen', 'fileMenuBeforeClose', 'fileMenuBeforeOpen', 'fileMenuItemSelect', 'openComplete', 'openFailure', 'queryCellInfo', 'saveComplete', 'select', 'sortComplete'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ejs-spreadsheet` represents the VueJS Spreadsheet Component.
 * ```vue
 * <ejs-spreadsheet></ejs-spreadsheet>
 * ```
 */
var SpreadsheetComponent = vueDefineComponent({
    name: 'SpreadsheetComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Spreadsheet({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-sheets": { "e-sheet": { "e-rows": { "e-row": { "e-cells": { "e-cell": { "e-images": "e-image", "e-charts": "e-chart" } } } }, "e-columns": "e-column", "e-ranges": "e-range", "e-conditionalformats": "e-conditionalformat" } }, "e-definednames": "e-definedname" },
            tagNameMapper: { "e-images": "e-image", "e-charts": "e-chart", "e-conditionalformats": "e-conditionalFormats", "e-definednames": "e-definedNames" },
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
        Unfreeze: function (sheet) {
            return this.ej2Instances.Unfreeze(sheet);
        },
        addContextMenuItems: function (items, text, insertAfter, isUniqueId) {
            return this.ej2Instances.addContextMenuItems(items, text, insertAfter, isUniqueId);
        },
        addCustomFunction: function (functionHandler, functionName, formulaDescription) {
            return this.ej2Instances.addCustomFunction(functionHandler, functionName, formulaDescription);
        },
        addDataValidation: function (rules, range) {
            return this.ej2Instances.addDataValidation(rules, range);
        },
        addDefinedName: function (definedName) {
            return this.ej2Instances.addDefinedName(definedName);
        },
        addFileMenuItems: function (items, text, insertAfter, isUniqueId) {
            return this.ej2Instances.addFileMenuItems(items, text, insertAfter, isUniqueId);
        },
        addHyperlink: function (hyperlink, address, displayText) {
            return this.ej2Instances.addHyperlink(hyperlink, address, displayText);
        },
        addInvalidHighlight: function (range) {
            return this.ej2Instances.addInvalidHighlight(range);
        },
        addRibbonTabs: function (items, insertBefore) {
            return this.ej2Instances.addRibbonTabs(items, insertBefore);
        },
        addToolbarItems: function (tab, items, index) {
            return this.ej2Instances.addToolbarItems(tab, items, index);
        },
        applyFilter: function (predicates, range) {
            return this.ej2Instances.applyFilter(predicates, range);
        },
        autoFill: function (fillRange, dataRange, direction, fillType) {
            return this.ej2Instances.autoFill(fillRange, dataRange, direction, fillType);
        },
        autoFit: function (range) {
            return this.ej2Instances.autoFit(range);
        },
        calculateNow: function (scope, sheet) {
            return this.ej2Instances.calculateNow(scope, sheet);
        },
        cellFormat: function (style, range) {
            return this.ej2Instances.cellFormat(style, range);
        },
        clear: function (options) {
            return this.ej2Instances.clear(options);
        },
        clearConditionalFormat: function (range) {
            return this.ej2Instances.clearConditionalFormat(range);
        },
        clearFilter: function (field, sheetIndex) {
            return this.ej2Instances.clearFilter(field, sheetIndex);
        },
        closeEdit: function () {
            return this.ej2Instances.closeEdit();
        },
        computeExpression: function (formula) {
            return this.ej2Instances.computeExpression(formula);
        },
        conditionalFormat: function (conditionalFormat) {
            return this.ej2Instances.conditionalFormat(conditionalFormat);
        },
        copy: function (address) {
            return this.ej2Instances.copy(address);
        },
        cut: function (address) {
            return this.ej2Instances.cut(address);
        },
        delete: function (startIndex, endIndex, model, sheet) {
            return this.ej2Instances.delete(startIndex, endIndex, model, sheet);
        },
        deleteChart: function (id) {
            return this.ej2Instances.deleteChart(id);
        },
        deleteImage: function (id, range) {
            return this.ej2Instances.deleteImage(id, range);
        },
        deselectChart: function () {
            return this.ej2Instances.deselectChart();
        },
        deselectImage: function () {
            return this.ej2Instances.deselectImage();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        duplicateSheet: function (sheetIndex) {
            return this.ej2Instances.duplicateSheet(sheetIndex);
        },
        enableContextMenuItems: function (items, enable, isUniqueId) {
            return this.ej2Instances.enableContextMenuItems(items, enable, isUniqueId);
        },
        enableFileMenuItems: function (items, enable, isUniqueId) {
            return this.ej2Instances.enableFileMenuItems(items, enable, isUniqueId);
        },
        enableRibbonTabs: function (tabs, enable) {
            return this.ej2Instances.enableRibbonTabs(tabs, enable);
        },
        enableToolbarItems: function (tab, items, enable) {
            return this.ej2Instances.enableToolbarItems(tab, items, enable);
        },
        endEdit: function () {
            return this.ej2Instances.endEdit();
        },
        find: function (args) {
            return this.ej2Instances.find(args);
        },
        findAll: function (value, mode, isCSen, isEMatch, sheetIndex) {
            return this.ej2Instances.findAll(value, mode, isCSen, isEMatch, sheetIndex);
        },
        freezePanes: function (row, column, sheet) {
            return this.ej2Instances.freezePanes(row, column, sheet);
        },
        getData: function (address) {
            return this.ej2Instances.getData(address);
        },
        getDisplayText: function (cell) {
            return this.ej2Instances.getDisplayText(cell);
        },
        getRowData: function (index, sheetIndex) {
            return this.ej2Instances.getRowData(index, sheetIndex);
        },
        getSelectAllContent: function () {
            return this.ej2Instances.getSelectAllContent();
        },
        goTo: function (address) {
            return this.ej2Instances.goTo(address);
        },
        hideColumn: function (startIndex, endIndex, hide) {
            return this.ej2Instances.hideColumn(startIndex, endIndex, hide);
        },
        hideFileMenuItems: function (items, hide, isUniqueId) {
            return this.ej2Instances.hideFileMenuItems(items, hide, isUniqueId);
        },
        hideRibbonTabs: function (tabs, hide) {
            return this.ej2Instances.hideRibbonTabs(tabs, hide);
        },
        hideRow: function (startIndex, endIndex, hide) {
            return this.ej2Instances.hideRow(startIndex, endIndex, hide);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        hideToolbarItems: function (tab, indexes, hide) {
            return this.ej2Instances.hideToolbarItems(tab, indexes, hide);
        },
        insertChart: function (chart) {
            return this.ej2Instances.insertChart(chart);
        },
        insertColumn: function (startColumn, endColumn, sheet) {
            return this.ej2Instances.insertColumn(startColumn, endColumn, sheet);
        },
        insertImage: function (images, range) {
            return this.ej2Instances.insertImage(images, range);
        },
        insertRow: function (startRow, endRow, sheet) {
            return this.ej2Instances.insertRow(startRow, endRow, sheet);
        },
        insertSheet: function (startSheet, endSheet) {
            return this.ej2Instances.insertSheet(startSheet, endSheet);
        },
        isValidCell: function (cellAddress) {
            return this.ej2Instances.isValidCell(cellAddress);
        },
        lockCells: function (range, isLocked) {
            return this.ej2Instances.lockCells(range, isLocked);
        },
        merge: function (range, type) {
            return this.ej2Instances.merge(range, type);
        },
        moveSheet: function (position, sheetIndexes) {
            return this.ej2Instances.moveSheet(position, sheetIndexes);
        },
        numberFormat: function (format, range) {
            return this.ej2Instances.numberFormat(format, range);
        },
        open: function (options) {
            return this.ej2Instances.open(options);
        },
        openFromJson: function (options, jsonConfig) {
            return this.ej2Instances.openFromJson(options, jsonConfig);
        },
        paste: function (address, type) {
            return this.ej2Instances.paste(address, type);
        },
        print: function (printOptions) {
            return this.ej2Instances.print(printOptions);
        },
        protectSheet: function (sheet, protectSettings, password) {
            return this.ej2Instances.protectSheet(sheet, protectSettings, password);
        },
        redo: function () {
            return this.ej2Instances.redo();
        },
        refresh: function (isNew) {
            return this.ej2Instances.refresh(isNew);
        },
        removeContextMenuItems: function (items, isUniqueId) {
            return this.ej2Instances.removeContextMenuItems(items, isUniqueId);
        },
        removeDataValidation: function (range) {
            return this.ej2Instances.removeDataValidation(range);
        },
        removeDefinedName: function (definedName, scope) {
            return this.ej2Instances.removeDefinedName(definedName, scope);
        },
        removeHyperlink: function (range) {
            return this.ej2Instances.removeHyperlink(range);
        },
        removeInvalidHighlight: function (range) {
            return this.ej2Instances.removeInvalidHighlight(range);
        },
        replace: function (args) {
            return this.ej2Instances.replace(args);
        },
        resize: function () {
            return this.ej2Instances.resize();
        },
        save: function (saveOptions, jsonConfig) {
            return this.ej2Instances.save(saveOptions, jsonConfig);
        },
        saveAsJson: function (jsonConfig) {
            return this.ej2Instances.saveAsJson(jsonConfig);
        },
        selectChart: function (id) {
            return this.ej2Instances.selectChart(id);
        },
        selectImage: function (id) {
            return this.ej2Instances.selectImage(id);
        },
        selectRange: function (address) {
            return this.ej2Instances.selectRange(address);
        },
        setBorder: function (style, range, type, isUndoRedo) {
            return this.ej2Instances.setBorder(style, range, type, isUndoRedo);
        },
        setColWidth: function (width, colIndex, sheetIndex) {
            return this.ej2Instances.setColWidth(width, colIndex, sheetIndex);
        },
        setColumnsWidth: function (width, ranges) {
            return this.ej2Instances.setColumnsWidth(width, ranges);
        },
        setRangeReadOnly: function (readOnly, range, sheetIndex) {
            return this.ej2Instances.setRangeReadOnly(readOnly, range, sheetIndex);
        },
        setRowHeight: function (height, rowIndex, sheetIndex, edited, skipCustomRow) {
            return this.ej2Instances.setRowHeight(height, rowIndex, sheetIndex, edited, skipCustomRow);
        },
        setRowsHeight: function (height, ranges, skipCustomRows) {
            return this.ej2Instances.setRowsHeight(height, ranges, skipCustomRows);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
        sort: function (sortOptions, range) {
            return this.ej2Instances.sort(sortOptions, range);
        },
        startEdit: function () {
            return this.ej2Instances.startEdit();
        },
        unMerge: function (range) {
            return this.ej2Instances.unMerge(range);
        },
        undo: function () {
            return this.ej2Instances.undo();
        },
        unfreezePanes: function (sheet) {
            return this.ej2Instances.unfreezePanes(sheet);
        },
        unprotectSheet: function (sheet) {
            return this.ej2Instances.unprotectSheet(sheet);
        },
        updateAction: function (options) {
            return this.ej2Instances.updateAction(options);
        },
        updateCell: function (cell, address, enableDependentCellUpdate) {
            return this.ej2Instances.updateCell(cell, address, enableDependentCellUpdate);
        },
        updateRange: function (range, sheetIndex) {
            return this.ej2Instances.updateRange(range, sheetIndex);
        },
        updateUndoRedoCollection: function (args) {
            return this.ej2Instances.updateUndoRedoCollection(args);
        },
        wrap: function (address, wrap) {
            return this.ej2Instances.wrap(address, wrap);
        },
    }
});
var SpreadsheetPlugin = {
    name: 'ejs-spreadsheet',
    install: function (Vue) {
        Vue.component(SpreadsheetPlugin.name, SpreadsheetComponent);
        Vue.component(SheetPlugin.name, SheetDirective);
        Vue.component(SheetsPlugin.name, SheetsDirective);
        Vue.component(RowPlugin.name, RowDirective);
        Vue.component(RowsPlugin.name, RowsDirective);
        Vue.component(CellPlugin.name, CellDirective);
        Vue.component(CellsPlugin.name, CellsDirective);
        Vue.component(ImagePlugin.name, ImageDirective);
        Vue.component(ImagesPlugin.name, ImagesDirective);
        Vue.component(ChartPlugin.name, ChartDirective);
        Vue.component(ChartsPlugin.name, ChartsDirective);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(RangePlugin.name, RangeDirective);
        Vue.component(RangesPlugin.name, RangesDirective);
        Vue.component(ConditionalFormatPlugin.name, ConditionalFormatDirective);
        Vue.component(ConditionalFormatsPlugin.name, ConditionalFormatsDirective);
        Vue.component(DefinedNamePlugin.name, DefinedNameDirective);
        Vue.component(DefinedNamesPlugin.name, DefinedNamesDirective);
    }
};

export { CellDirective, CellPlugin, CellsDirective, CellsPlugin, ChartDirective, ChartPlugin, ChartsDirective, ChartsPlugin, ColumnDirective, ColumnPlugin, ColumnsDirective, ColumnsPlugin, ConditionalFormatDirective, ConditionalFormatPlugin, ConditionalFormatsDirective, ConditionalFormatsPlugin, DefinedNameDirective, DefinedNamePlugin, DefinedNamesDirective, DefinedNamesPlugin, ImageDirective, ImagePlugin, ImagesDirective, ImagesPlugin, RangeDirective, RangePlugin, RangesDirective, RangesPlugin, RowDirective, RowPlugin, RowsDirective, RowsPlugin, SheetDirective, SheetPlugin, SheetsDirective, SheetsPlugin, SpreadsheetComponent, SpreadsheetPlugin };
//# sourceMappingURL=ej2-vue-spreadsheet.es5.js.map
