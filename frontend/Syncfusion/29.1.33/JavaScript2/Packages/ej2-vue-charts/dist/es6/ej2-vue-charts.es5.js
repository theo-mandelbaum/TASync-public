import { Chart, AccumulationChart, RangeNavigator, Sparkline, Smithchart, StockChart, BulletChart, Chart3D, CircularChart3D } from '@syncfusion/ej2-charts';
export * from '@syncfusion/ej2-charts';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var TrendlinesDirective = vueDefineComponent({
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
            return 'e-trendlines';
        }
    }
});
var TrendlinesPlugin = {
    name: 'e-trendlines',
    install: function (Vue) {
        Vue.component(TrendlinesPlugin.name, TrendlinesDirective);
    }
};
var TrendlineDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-trendline';
        }
    }
});
var TrendlinePlugin = {
    name: 'e-trendline',
    install: function (Vue) {
        Vue.component(TrendlinePlugin.name, TrendlineDirective);
    }
};

var SegmentsDirective = vueDefineComponent({
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
            return 'e-segments';
        }
    }
});
var SegmentsPlugin = {
    name: 'e-segments',
    install: function (Vue) {
        Vue.component(SegmentsPlugin.name, SegmentsDirective);
    }
};
var SegmentDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-segment';
        }
    }
});
var SegmentPlugin = {
    name: 'e-segment',
    install: function (Vue) {
        Vue.component(SegmentPlugin.name, SegmentDirective);
    }
};

var SeriesCollectionDirective = vueDefineComponent({
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
            return 'e-series-collection';
        }
    }
});
var SeriesCollectionPlugin = {
    name: 'e-series-collection',
    install: function (Vue) {
        Vue.component(SeriesCollectionPlugin.name, SeriesCollectionDirective);
    }
};
var SeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-series';
        }
    }
});
var SeriesPlugin = {
    name: 'e-series',
    install: function (Vue) {
        Vue.component(SeriesPlugin.name, SeriesDirective);
    }
};

var StripLinesDirective = vueDefineComponent({
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
            return 'e-striplines';
        }
    }
});
var StripLinesPlugin = {
    name: 'e-striplines',
    install: function (Vue) {
        Vue.component(StripLinesPlugin.name, StripLinesDirective);
    }
};
var StripLineDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stripline';
        }
    }
});
var StripLinePlugin = {
    name: 'e-stripline',
    install: function (Vue) {
        Vue.component(StripLinePlugin.name, StripLineDirective);
    }
};

var CategoriesDirective = vueDefineComponent({
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
            return 'e-categories';
        }
    }
});
var CategoriesPlugin = {
    name: 'e-categories',
    install: function (Vue) {
        Vue.component(CategoriesPlugin.name, CategoriesDirective);
    }
};
var CategoryDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-category';
        }
    }
});
var CategoryPlugin = {
    name: 'e-category',
    install: function (Vue) {
        Vue.component(CategoryPlugin.name, CategoryDirective);
    }
};

var MultiLevelLabelsDirective = vueDefineComponent({
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
            return 'e-multilevellabels';
        }
    }
});
var MultiLevelLabelsPlugin = {
    name: 'e-multilevellabels',
    install: function (Vue) {
        Vue.component(MultiLevelLabelsPlugin.name, MultiLevelLabelsDirective);
    }
};
var MultiLevelLabelDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-multilevellabel';
        }
    }
});
var MultiLevelLabelPlugin = {
    name: 'e-multilevellabel',
    install: function (Vue) {
        Vue.component(MultiLevelLabelPlugin.name, MultiLevelLabelDirective);
    }
};

var AxesDirective = vueDefineComponent({
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
            return 'e-axes';
        }
    }
});
var AxesPlugin = {
    name: 'e-axes',
    install: function (Vue) {
        Vue.component(AxesPlugin.name, AxesDirective);
    }
};
var AxisDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-axis';
        }
    }
});
var AxisPlugin = {
    name: 'e-axis',
    install: function (Vue) {
        Vue.component(AxisPlugin.name, AxisDirective);
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

var RangeColorSettingsDirective = vueDefineComponent({
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
            return 'e-rangecolorsettings';
        }
    }
});
var RangeColorSettingsPlugin = {
    name: 'e-rangecolorsettings',
    install: function (Vue) {
        Vue.component(RangeColorSettingsPlugin.name, RangeColorSettingsDirective);
    }
};
var RangeColorSettingDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-rangecolorsetting';
        }
    }
});
var RangeColorSettingPlugin = {
    name: 'e-rangecolorsetting',
    install: function (Vue) {
        Vue.component(RangeColorSettingPlugin.name, RangeColorSettingDirective);
    }
};

var AnnotationsDirective = vueDefineComponent({
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
            return 'e-annotations';
        }
    }
});
var AnnotationsPlugin = {
    name: 'e-annotations',
    install: function (Vue) {
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
    }
};
/**
 * `e-annotation` directive represent a annotation of the VueJS Chart.
 * It must be contained in a Chart component(`ejs-chart`).
 * ```vue
 * <ejs-chart>
 *   <e-annotations>
 *    <e-annotation content='ID' />
 *    <e-annotation content='ID' />
 *   </e-annotations>
 * </ejs-chart>
 * ```
 */
var AnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-annotation';
        }
    }
});
var AnnotationPlugin = {
    name: 'e-annotation',
    install: function (Vue) {
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
    }
};

var SelectedDataIndexesDirective = vueDefineComponent({
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
            return 'e-selecteddataindexes';
        }
    }
});
var SelectedDataIndexesPlugin = {
    name: 'e-selecteddataindexes',
    install: function (Vue) {
        Vue.component(SelectedDataIndexesPlugin.name, SelectedDataIndexesDirective);
    }
};
var SelectedDataIndexDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-selecteddataindex';
        }
    }
});
var SelectedDataIndexPlugin = {
    name: 'e-selecteddataindex',
    install: function (Vue) {
        Vue.component(SelectedDataIndexPlugin.name, SelectedDataIndexDirective);
    }
};

var IndicatorsDirective = vueDefineComponent({
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
            return 'e-indicators';
        }
    }
});
var IndicatorsPlugin = {
    name: 'e-indicators',
    install: function (Vue) {
        Vue.component(IndicatorsPlugin.name, IndicatorsDirective);
    }
};
var IndicatorDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-indicator';
        }
    }
});
var IndicatorPlugin = {
    name: 'e-indicator',
    install: function (Vue) {
        Vue.component(IndicatorPlugin.name, IndicatorDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'accessibility', 'allowExport', 'allowMultiSelection', 'annotations', 'axes', 'background', 'backgroundImage', 'border', 'chartArea', 'columns', 'crosshair', 'currencyCode', 'dataSource', 'description', 'enableAnimation', 'enableAutoIntervalOnBothAxis', 'enableCanvas', 'enableExport', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSideBySidePlacement', 'focusBorderColor', 'focusBorderMargin', 'focusBorderWidth', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'indicators', 'isMultiSelect', 'isTransposed', 'legendSettings', 'locale', 'margin', 'palettes', 'primaryXAxis', 'primaryYAxis', 'rangeColorSettings', 'rows', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'stackLabels', 'subTitle', 'subTitleStyle', 'tabIndex', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'zoomSettings', 'afterExport', 'animationComplete', 'annotationRender', 'axisLabelClick', 'axisLabelRender', 'axisMultiLabelRender', 'axisRangeCalculated', 'beforeExport', 'beforePrint', 'beforeResize', 'chartDoubleClick', 'chartMouseClick', 'chartMouseDown', 'chartMouseLeave', 'chartMouseMove', 'chartMouseUp', 'drag', 'dragComplete', 'dragEnd', 'dragStart', 'legendClick', 'legendRender', 'load', 'loaded', 'multiLevelLabelClick', 'onZooming', 'pointClick', 'pointDoubleClick', 'pointMove', 'pointRender', 'resized', 'scrollChanged', 'scrollEnd', 'scrollStart', 'selectionComplete', 'seriesRender', 'sharedTooltipRender', 'textRender', 'tooltipRender', 'zoomComplete'];
var modelProps = ['dataSource'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents Vuejs chart Component
 * ```vue
 * <ejs-chart></ejs-chart>
 * ```
 */
var ChartComponent = vueDefineComponent({
    name: 'ChartComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Chart({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-series-collection": { "e-series": { "e-trendlines": "e-trendline", "e-segments": "e-segment" } }, "e-axes": { "e-axis": { "e-striplines": "e-stripline", "e-multilevellabels": { "e-multilevellabel": { "e-categories": "e-category" } } } }, "e-rows": "e-row", "e-columns": "e-column", "e-rangecolorsettings": "e-rangecolorsetting", "e-annotations": "e-annotation", "e-selecteddataindexes": "e-selecteddataindex", "e-indicators": "e-indicator" },
            tagNameMapper: { "e-series-collection": "e-series", "e-striplines": "e-stripLines", "e-multilevellabels": "e-multiLevelLabels", "e-rangecolorsettings": "e-rangeColorSettings", "e-selecteddataindexes": "e-selectedDataIndexes" },
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
        FindXYPointValue: function (mouseX, mouseY) {
            return this.ej2Instances.FindXYPointValue(mouseX, mouseY);
        },
        addAxes: function (axisCollection) {
            return this.ej2Instances.addAxes(axisCollection);
        },
        addSeries: function (seriesCollection) {
            return this.ej2Instances.addSeries(seriesCollection);
        },
        clearSeries: function () {
            return this.ej2Instances.clearSeries();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        export: function (type, fileName) {
            return this.ej2Instances.export(type, fileName);
        },
        getLocalizedLabel: function (key) {
            return this.ej2Instances.getLocalizedLabel(key);
        },
        hideCrosshair: function () {
            return this.ej2Instances.hideCrosshair();
        },
        hideTooltip: function () {
            return this.ej2Instances.hideTooltip();
        },
        isSecondaryAxis: function (axis) {
            return this.ej2Instances.isSecondaryAxis(axis);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        processData: function (render) {
            return this.ej2Instances.processData(render);
        },
        refreshLiveData: function () {
            return this.ej2Instances.refreshLiveData();
        },
        removeSeries: function (index) {
            return this.ej2Instances.removeSeries(index);
        },
        setAnnotationValue: function (annotationIndex, content) {
            return this.ej2Instances.setAnnotationValue(annotationIndex, content);
        },
        showCrosshair: function (x, y) {
            return this.ej2Instances.showCrosshair(x, y);
        },
        showTooltip: function (x, y, isPoint) {
            return this.ej2Instances.showTooltip(x, y, isPoint);
        },
    }
});
var ChartPlugin = {
    name: 'ejs-chart',
    install: function (Vue) {
        Vue.component(ChartPlugin.name, ChartComponent);
        Vue.component(SeriesPlugin.name, SeriesDirective);
        Vue.component(SeriesCollectionPlugin.name, SeriesCollectionDirective);
        Vue.component(TrendlinePlugin.name, TrendlineDirective);
        Vue.component(TrendlinesPlugin.name, TrendlinesDirective);
        Vue.component(SegmentPlugin.name, SegmentDirective);
        Vue.component(SegmentsPlugin.name, SegmentsDirective);
        Vue.component(AxisPlugin.name, AxisDirective);
        Vue.component(AxesPlugin.name, AxesDirective);
        Vue.component(StripLinePlugin.name, StripLineDirective);
        Vue.component(StripLinesPlugin.name, StripLinesDirective);
        Vue.component(MultiLevelLabelPlugin.name, MultiLevelLabelDirective);
        Vue.component(MultiLevelLabelsPlugin.name, MultiLevelLabelsDirective);
        Vue.component(CategoryPlugin.name, CategoryDirective);
        Vue.component(CategoriesPlugin.name, CategoriesDirective);
        Vue.component(RowPlugin.name, RowDirective);
        Vue.component(RowsPlugin.name, RowsDirective);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(RangeColorSettingPlugin.name, RangeColorSettingDirective);
        Vue.component(RangeColorSettingsPlugin.name, RangeColorSettingsDirective);
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
        Vue.component(SelectedDataIndexPlugin.name, SelectedDataIndexDirective);
        Vue.component(SelectedDataIndexesPlugin.name, SelectedDataIndexesDirective);
        Vue.component(IndicatorPlugin.name, IndicatorDirective);
        Vue.component(IndicatorsPlugin.name, IndicatorsDirective);
    }
};

var AccumulationSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-accumulation-series-collection';
        }
    }
});
var AccumulationSeriesCollectionPlugin = {
    name: 'e-accumulation-series-collection',
    install: function (Vue) {
        Vue.component(AccumulationSeriesCollectionPlugin.name, AccumulationSeriesCollectionDirective);
    }
};
var AccumulationSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-accumulation-series';
        }
    }
});
var AccumulationSeriesPlugin = {
    name: 'e-accumulation-series',
    install: function (Vue) {
        Vue.component(AccumulationSeriesPlugin.name, AccumulationSeriesDirective);
    }
};

var AccumulationAnnotationsDirective = vueDefineComponent({
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
            return 'e-accumulation-annotations';
        }
    }
});
var AccumulationAnnotationsPlugin = {
    name: 'e-accumulation-annotations',
    install: function (Vue) {
        Vue.component(AccumulationAnnotationsPlugin.name, AccumulationAnnotationsDirective);
    }
};
var AccumulationAnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-accumulation-annotation';
        }
    }
});
var AccumulationAnnotationPlugin = {
    name: 'e-accumulation-annotation',
    install: function (Vue) {
        Vue.component(AccumulationAnnotationPlugin.name, AccumulationAnnotationDirective);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'accessibility', 'allowExport', 'annotations', 'background', 'backgroundImage', 'border', 'center', 'centerLabel', 'currencyCode', 'dataSource', 'enableAnimation', 'enableBorderOnMouseMove', 'enableExport', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSmartLabels', 'focusBorderColor', 'focusBorderMargin', 'focusBorderWidth', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'isMultiSelect', 'legendSettings', 'locale', 'margin', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'subTitle', 'subTitleStyle', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'afterExport', 'animationComplete', 'annotationRender', 'beforeExport', 'beforePrint', 'beforeResize', 'chartDoubleClick', 'chartMouseClick', 'chartMouseDown', 'chartMouseLeave', 'chartMouseMove', 'chartMouseUp', 'legendClick', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'selectionComplete', 'seriesRender', 'textRender', 'tooltipRender'];
var modelProps$1 = ['dataSource'];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * Represents Vuejs AccumulationChart Component
 * ```vue
 * <ejs-accumulationchart></ejs-accumulationchart>
 * ```
 */
var AccumulationChartComponent = vueDefineComponent({
    name: 'AccumulationChartComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new AccumulationChart({}),
            propKeys: properties$1,
            models: modelProps$1,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-accumulation-series-collection": "e-accumulation-series", "e-accumulation-annotations": "e-accumulation-annotation" },
            tagNameMapper: { "e-accumulation-series-collection": "e-series", "e-accumulation-annotations": "e-annotations" },
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
        calculateBounds: function () {
            return this.ej2Instances.calculateBounds();
        },
        export: function (type, fileName) {
            return this.ej2Instances.export(type, fileName);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        setAnnotationValue: function (annotationIndex, content) {
            return this.ej2Instances.setAnnotationValue(annotationIndex, content);
        },
        titleTooltip: function (event, x, y, isTouch) {
            return this.ej2Instances.titleTooltip(event, x, y, isTouch);
        },
    }
});
var AccumulationChartPlugin = {
    name: 'ejs-accumulationchart',
    install: function (Vue) {
        Vue.component(AccumulationChartPlugin.name, AccumulationChartComponent);
        Vue.component(AccumulationSeriesPlugin.name, AccumulationSeriesDirective);
        Vue.component(AccumulationSeriesCollectionPlugin.name, AccumulationSeriesCollectionDirective);
        Vue.component(AccumulationAnnotationPlugin.name, AccumulationAnnotationDirective);
        Vue.component(AccumulationAnnotationsPlugin.name, AccumulationAnnotationsDirective);
    }
};

var RangenavigatorSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-rangenavigator-series-collection';
        }
    }
});
var RangenavigatorSeriesCollectionPlugin = {
    name: 'e-rangenavigator-series-collection',
    install: function (Vue) {
        Vue.component(RangenavigatorSeriesCollectionPlugin.name, RangenavigatorSeriesCollectionDirective);
    }
};
var RangenavigatorSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-rangenavigator-series';
        }
    }
});
var RangenavigatorSeriesPlugin = {
    name: 'e-rangenavigator-series',
    install: function (Vue) {
        Vue.component(RangenavigatorSeriesPlugin.name, RangenavigatorSeriesDirective);
    }
};

var properties$2 = ['isLazyUpdate', 'plugins', 'allowIntervalData', 'allowSnapping', 'animationDuration', 'background', 'dataSource', 'disableRangeSelector', 'enableDeferredUpdate', 'enableGrouping', 'enablePersistence', 'enableRtl', 'groupBy', 'height', 'interval', 'intervalType', 'labelFormat', 'labelIntersectAction', 'labelPlacement', 'labelPosition', 'labelStyle', 'locale', 'logBase', 'majorGridLines', 'majorTickLines', 'margin', 'maximum', 'minimum', 'navigatorBorder', 'navigatorStyleSettings', 'periodSelectorSettings', 'query', 'secondaryLabelAlignment', 'series', 'skeleton', 'skeletonType', 'theme', 'tickPosition', 'tooltip', 'useGroupingSeparator', 'value', 'valueType', 'width', 'xName', 'yName', 'beforePrint', 'beforeResize', 'changed', 'labelRender', 'load', 'loaded', 'resized', 'selectorRender', 'tooltipRender'];
var modelProps$2 = ['dataSource'];
var testProp$2 = getProps({ props: properties$2 });
var props$2 = testProp$2[0], watch$2 = testProp$2[1], emitProbs$2 = Object.keys(watch$2);
emitProbs$2.push('modelchanged', 'update:modelValue');
for (var _i$2 = 0, modelProps_1$2 = modelProps$2; _i$2 < modelProps_1$2.length; _i$2++) {
    var props_1$2 = modelProps_1$2[_i$2];
    emitProbs$2.push('update:' + props_1$2);
}
/**
 * Represents Vuejs RangeNavigator Component
 * ```vue
 * <ejs-rangenavigator></ejs-rangenavigator>
 * ```
 */
var RangeNavigatorComponent = vueDefineComponent({
    name: 'RangeNavigatorComponent',
    mixins: [ComponentBase],
    props: props$2,
    watch: watch$2,
    emits: emitProbs$2,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new RangeNavigator({}),
            propKeys: properties$2,
            models: modelProps$2,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-rangenavigator-series-collection": "e-rangenavigator-series" },
            tagNameMapper: { "e-rangenavigator-series-collection": "e-series" },
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
        createSecondaryElement: function () {
            return this.ej2Instances.createSecondaryElement();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        export: function (type, fileName, orientation, controls, width, height, isVertical) {
            return this.ej2Instances.export(type, fileName, orientation, controls, width, height, isVertical);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        renderChart: function (resize) {
            return this.ej2Instances.renderChart(resize);
        },
    }
});
var RangeNavigatorPlugin = {
    name: 'ejs-rangenavigator',
    install: function (Vue) {
        Vue.component(RangeNavigatorPlugin.name, RangeNavigatorComponent);
        Vue.component(RangenavigatorSeriesPlugin.name, RangenavigatorSeriesDirective);
        Vue.component(RangenavigatorSeriesCollectionPlugin.name, RangenavigatorSeriesCollectionDirective);
    }
};

var RangeBandSettingsDirective = vueDefineComponent({
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
            return 'e-rangeBandSettings';
        }
    }
});
var RangeBandSettingsPlugin = {
    name: 'e-rangeBandSettings',
    install: function (Vue) {
        Vue.component(RangeBandSettingsPlugin.name, RangeBandSettingsDirective);
    }
};
var RangeBandSettingDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-rangeBandSetting';
        }
    }
});
var RangeBandSettingPlugin = {
    name: 'e-rangeBandSetting',
    install: function (Vue) {
        Vue.component(RangeBandSettingPlugin.name, RangeBandSettingDirective);
    }
};

var properties$3 = ['isLazyUpdate', 'plugins', 'axisSettings', 'border', 'containerArea', 'dataLabelSettings', 'dataSource', 'enablePersistence', 'enableRtl', 'endPointColor', 'fill', 'format', 'height', 'highPointColor', 'lineWidth', 'locale', 'lowPointColor', 'markerSettings', 'negativePointColor', 'opacity', 'padding', 'palette', 'query', 'rangeBandSettings', 'rangePadding', 'startPointColor', 'theme', 'tiePointColor', 'tooltipSettings', 'type', 'useGroupingSeparator', 'valueType', 'width', 'xName', 'yName', 'axisRendering', 'dataLabelRendering', 'load', 'loaded', 'markerRendering', 'pointRegionMouseClick', 'pointRegionMouseMove', 'pointRendering', 'resize', 'seriesRendering', 'sparklineMouseClick', 'sparklineMouseMove', 'tooltipInitialize'];
var modelProps$3 = [];
var testProp$3 = getProps({ props: properties$3 });
var props$3 = testProp$3[0], watch$3 = testProp$3[1], emitProbs$3 = Object.keys(watch$3);
emitProbs$3.push('modelchanged', 'update:modelValue');
for (var _i$3 = 0, modelProps_1$3 = modelProps$3; _i$3 < modelProps_1$3.length; _i$3++) {
    var props_1$3 = modelProps_1$3[_i$3];
    emitProbs$3.push('update:' + props_1$3);
}
/**
 * Represents Vuejs Sparkline Component
 * ```vue
 * <ejs-sparkline></ejs-sparkline>
 * ```
 */
var SparklineComponent = vueDefineComponent({
    name: 'SparklineComponent',
    mixins: [ComponentBase],
    props: props$3,
    watch: watch$3,
    emits: emitProbs$3,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Sparkline({}),
            propKeys: properties$3,
            models: modelProps$3,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-rangeBandSettings": "e-rangeBandSetting" },
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
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        renderSparkline: function () {
            return this.ej2Instances.renderSparkline();
        },
    }
});
var SparklinePlugin = {
    name: 'ejs-sparkline',
    install: function (Vue) {
        Vue.component(SparklinePlugin.name, SparklineComponent);
        Vue.component(RangeBandSettingPlugin.name, RangeBandSettingDirective);
        Vue.component(RangeBandSettingsPlugin.name, RangeBandSettingsDirective);
    }
};

var SmithchartSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-seriesCollection';
        }
    }
});
var SmithchartSeriesCollectionPlugin = {
    name: 'e-seriesCollection',
    install: function (Vue) {
        Vue.component(SmithchartSeriesCollectionPlugin.name, SmithchartSeriesCollectionDirective);
    }
};
var SmithchartSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-series';
        }
    }
});
var SmithchartSeriesPlugin = {
    name: 'e-series',
    install: function (Vue) {
        Vue.component(SmithchartSeriesPlugin.name, SmithchartSeriesDirective);
    }
};

var properties$4 = ['isLazyUpdate', 'plugins', 'background', 'border', 'elementSpacing', 'enablePersistence', 'enableRtl', 'font', 'height', 'horizontalAxis', 'legendSettings', 'locale', 'margin', 'radialAxis', 'radius', 'renderType', 'series', 'theme', 'title', 'width', 'animationComplete', 'axisLabelRender', 'beforePrint', 'legendRender', 'load', 'loaded', 'seriesRender', 'subtitleRender', 'textRender', 'titleRender', 'tooltipRender'];
var modelProps$4 = [];
var testProp$4 = getProps({ props: properties$4 });
var props$4 = testProp$4[0], watch$4 = testProp$4[1], emitProbs$4 = Object.keys(watch$4);
emitProbs$4.push('modelchanged', 'update:modelValue');
for (var _i$4 = 0, modelProps_1$4 = modelProps$4; _i$4 < modelProps_1$4.length; _i$4++) {
    var props_1$4 = modelProps_1$4[_i$4];
    emitProbs$4.push('update:' + props_1$4);
}
/**
 * Represents Vuejs Smithchart Component
 * ```vue
 * <ejs-smithchart></ejs-smithchart>
 * ```
 */
var SmithchartComponent = vueDefineComponent({
    name: 'SmithchartComponent',
    mixins: [ComponentBase],
    props: props$4,
    watch: watch$4,
    emits: emitProbs$4,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Smithchart({}),
            propKeys: properties$4,
            models: modelProps$4,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-seriesCollection": "e-series" },
            tagNameMapper: { "e-seriesCollection": "e-series" },
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
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        export: function (type, fileName, orientation) {
            return this.ej2Instances.export(type, fileName, orientation);
        },
        mouseEnd: function (e) {
            return this.ej2Instances.mouseEnd(e);
        },
        mouseMove: function (e) {
            return this.ej2Instances.mouseMove(e);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        setTabIndex: function (previousElement, currentElement) {
            return this.ej2Instances.setTabIndex(previousElement, currentElement);
        },
        smithchartOnClick: function (e) {
            return this.ej2Instances.smithchartOnClick(e);
        },
        smithchartOnResize: function () {
            return this.ej2Instances.smithchartOnResize();
        },
    }
});
var SmithchartPlugin = {
    name: 'ejs-smithchart',
    install: function (Vue) {
        Vue.component(SmithchartPlugin.name, SmithchartComponent);
        Vue.component(SmithchartSeriesPlugin.name, SmithchartSeriesDirective);
        Vue.component(SmithchartSeriesCollectionPlugin.name, SmithchartSeriesCollectionDirective);
    }
};

var StockChartTrendlinesDirective = vueDefineComponent({
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
            return 'e-trendlines';
        }
    }
});
var StockChartTrendlinesPlugin = {
    name: 'e-trendlines',
    install: function (Vue) {
        Vue.component(StockChartTrendlinesPlugin.name, StockChartTrendlinesDirective);
    }
};
var StockChartTrendlineDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-trendline';
        }
    }
});
var StockChartTrendlinePlugin = {
    name: 'e-trendline',
    install: function (Vue) {
        Vue.component(StockChartTrendlinePlugin.name, StockChartTrendlineDirective);
    }
};

var StockChartSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-stockchart-series-collection';
        }
    }
});
var StockChartSeriesCollectionPlugin = {
    name: 'e-stockchart-series-collection',
    install: function (Vue) {
        Vue.component(StockChartSeriesCollectionPlugin.name, StockChartSeriesCollectionDirective);
    }
};
var StockChartSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-series';
        }
    }
});
var StockChartSeriesPlugin = {
    name: 'e-stockchart-series',
    install: function (Vue) {
        Vue.component(StockChartSeriesPlugin.name, StockChartSeriesDirective);
    }
};

var StockChartAxesDirective = vueDefineComponent({
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
            return 'e-stockchart-axes';
        }
    }
});
var StockChartAxesPlugin = {
    name: 'e-stockchart-axes',
    install: function (Vue) {
        Vue.component(StockChartAxesPlugin.name, StockChartAxesDirective);
    }
};
var StockChartAxisDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-axis';
        }
    }
});
var StockChartAxisPlugin = {
    name: 'e-stockchart-axis',
    install: function (Vue) {
        Vue.component(StockChartAxisPlugin.name, StockChartAxisDirective);
    }
};

var StockChartRowsDirective = vueDefineComponent({
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
            return 'e-stockchart-rows';
        }
    }
});
var StockChartRowsPlugin = {
    name: 'e-stockchart-rows',
    install: function (Vue) {
        Vue.component(StockChartRowsPlugin.name, StockChartRowsDirective);
    }
};
var StockChartRowDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-row';
        }
    }
});
var StockChartRowPlugin = {
    name: 'e-stockchart-row',
    install: function (Vue) {
        Vue.component(StockChartRowPlugin.name, StockChartRowDirective);
    }
};

var StockChartAnnotationsDirective = vueDefineComponent({
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
            return 'e-stockchart-annotations';
        }
    }
});
var StockChartAnnotationsPlugin = {
    name: 'e-stockchart-annotations',
    install: function (Vue) {
        Vue.component(StockChartAnnotationsPlugin.name, StockChartAnnotationsDirective);
    }
};
/**
 * `e-annotation` directive represent a annotation of the VueJS Chart.
 * It must be contained in a Chart component(`ejs-chart`).
 * ```vue
 * <ejs-stockchart>
 *   <e-stockchart-annotations>
 *    <e-annotation content='ID' />
 *    <e-annotation content='ID' />
 *   </e-annotations>
 * </ejs-chart>
 * ```
 */
var StockChartAnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-annotation';
        }
    }
});
var StockChartAnnotationPlugin = {
    name: 'e-stockchart-annotation',
    install: function (Vue) {
        Vue.component(StockChartAnnotationPlugin.name, StockChartAnnotationDirective);
    }
};

var StockChartSelectedDataIndexesDirective = vueDefineComponent({
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
            return 'e-stockchart-selectedDataIndexes';
        }
    }
});
var StockChartSelectedDataIndexesPlugin = {
    name: 'e-stockchart-selectedDataIndexes',
    install: function (Vue) {
        Vue.component(StockChartSelectedDataIndexesPlugin.name, StockChartSelectedDataIndexesDirective);
    }
};
var StockChartSelectedDataIndexDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-selectedDataIndex';
        }
    }
});
var StockChartSelectedDataIndexPlugin = {
    name: 'e-stockchart-selectedDataIndex',
    install: function (Vue) {
        Vue.component(StockChartSelectedDataIndexPlugin.name, StockChartSelectedDataIndexDirective);
    }
};

var StockChartPeriodsDirective = vueDefineComponent({
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
            return 'e-stockchart-periods';
        }
    }
});
var StockChartPeriodsPlugin = {
    name: 'e-stockchart-periods',
    install: function (Vue) {
        Vue.component(StockChartPeriodsPlugin.name, StockChartPeriodsDirective);
    }
};
var StockChartPeriodDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-period';
        }
    }
});
var StockChartPeriodPlugin = {
    name: 'e-stockchart-period',
    install: function (Vue) {
        Vue.component(StockChartPeriodPlugin.name, StockChartPeriodDirective);
    }
};

var StockEventsDirective = vueDefineComponent({
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
            return 'e-stockchart-stockevents';
        }
    }
});
var StockEventsPlugin = {
    name: 'e-stockchart-stockevents',
    install: function (Vue) {
        Vue.component(StockEventsPlugin.name, StockEventsDirective);
    }
};
var StockEventDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-stockevent';
        }
    }
});
var StockEventPlugin = {
    name: 'e-stockchart-stockevent',
    install: function (Vue) {
        Vue.component(StockEventPlugin.name, StockEventDirective);
    }
};

var StockChartIndicatorsDirective = vueDefineComponent({
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
            return 'e-stockchart-indicators';
        }
    }
});
var StockChartIndicatorsPlugin = {
    name: 'e-stockchart-indicators',
    install: function (Vue) {
        Vue.component(StockChartIndicatorsPlugin.name, StockChartIndicatorsDirective);
    }
};
var StockChartIndicatorDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stockchart-indicator';
        }
    }
});
var StockChartIndicatorPlugin = {
    name: 'e-stockchart-indicator',
    install: function (Vue) {
        Vue.component(StockChartIndicatorPlugin.name, StockChartIndicatorDirective);
    }
};

var properties$5 = ['isLazyUpdate', 'plugins', 'annotations', 'axes', 'background', 'border', 'chartArea', 'crosshair', 'dataSource', 'enableCustomRange', 'enablePeriodSelector', 'enablePersistence', 'enableRtl', 'enableSelector', 'exportType', 'height', 'indicatorType', 'indicators', 'isMultiSelect', 'isSelect', 'isTransposed', 'legendSettings', 'locale', 'margin', 'periods', 'primaryXAxis', 'primaryYAxis', 'rows', 'selectedDataIndexes', 'selectionMode', 'series', 'seriesType', 'stockEvents', 'theme', 'title', 'titleStyle', 'tooltip', 'trendlineType', 'width', 'zoomSettings', 'axisLabelRender', 'beforeExport', 'legendClick', 'legendRender', 'load', 'loaded', 'onZooming', 'pointClick', 'pointMove', 'rangeChange', 'selectorRender', 'seriesRender', 'stockChartMouseClick', 'stockChartMouseDown', 'stockChartMouseLeave', 'stockChartMouseMove', 'stockChartMouseUp', 'stockEventRender', 'tooltipRender'];
var modelProps$5 = ['dataSource'];
var testProp$5 = getProps({ props: properties$5 });
var props$5 = testProp$5[0], watch$5 = testProp$5[1], emitProbs$5 = Object.keys(watch$5);
emitProbs$5.push('modelchanged', 'update:modelValue');
for (var _i$5 = 0, modelProps_1$5 = modelProps$5; _i$5 < modelProps_1$5.length; _i$5++) {
    var props_1$5 = modelProps_1$5[_i$5];
    emitProbs$5.push('update:' + props_1$5);
}
/**
 * Represents Vuejs chart Component
 * ```vue
 * <ejs-stockchart></ejs-stockchart>
 * ```
 */
var StockChartComponent = vueDefineComponent({
    name: 'StockChartComponent',
    mixins: [ComponentBase],
    props: props$5,
    watch: watch$5,
    emits: emitProbs$5,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new StockChart({}),
            propKeys: properties$5,
            models: modelProps$5,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-stockchart-series-collection": { "e-stockchart-series": { "e-trendlines": "e-trendline" } }, "e-stockchart-axes": "e-stockchart-axis", "e-stockchart-rows": "e-stockchart-row", "e-stockchart-annotations": "e-stockchart-annotation", "e-stockchart-selectedDataIndexes": "e-stockchart-selectedDataIndex", "e-stockchart-periods": "e-stockchart-period", "e-stockchart-stockevents": "e-stockchart-stockevent", "e-stockchart-indicators": "e-stockchart-indicator" },
            tagNameMapper: { "e-stockchart-series-collection": "e-series", "e-stockchart-axes": "e-axes", "e-stockchart-rows": "e-rows", "e-stockchart-annotations": "e-annotations", "e-stockchart-selectedDataIndexes": "e-selectedDataIndexes", "e-stockchart-periods": "e-periods", "e-stockchart-stockevents": "e-stockEvents", "e-stockchart-indicators": "e-indicators" },
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
        chartModuleInjection: function () {
            return this.ej2Instances.chartModuleInjection();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        findCurrentData: function (totalData, xName) {
            return this.ej2Instances.findCurrentData(totalData, xName);
        },
        rangeChanged: function (updatedStart, updatedEnd) {
            return this.ej2Instances.rangeChanged(updatedStart, updatedEnd);
        },
        renderPeriodSelector: function () {
            return this.ej2Instances.renderPeriodSelector();
        },
        stockChartDataManagerSuccess: function () {
            return this.ej2Instances.stockChartDataManagerSuccess();
        },
    }
});
var StockChartPlugin = {
    name: 'ejs-stockchart',
    install: function (Vue) {
        Vue.component(StockChartPlugin.name, StockChartComponent);
        Vue.component(StockChartSeriesPlugin.name, StockChartSeriesDirective);
        Vue.component(StockChartSeriesCollectionPlugin.name, StockChartSeriesCollectionDirective);
        Vue.component(StockChartTrendlinePlugin.name, StockChartTrendlineDirective);
        Vue.component(StockChartTrendlinesPlugin.name, StockChartTrendlinesDirective);
        Vue.component(StockChartAxisPlugin.name, StockChartAxisDirective);
        Vue.component(StockChartAxesPlugin.name, StockChartAxesDirective);
        Vue.component(StockChartRowPlugin.name, StockChartRowDirective);
        Vue.component(StockChartRowsPlugin.name, StockChartRowsDirective);
        Vue.component(StockChartAnnotationPlugin.name, StockChartAnnotationDirective);
        Vue.component(StockChartAnnotationsPlugin.name, StockChartAnnotationsDirective);
        Vue.component(StockChartSelectedDataIndexPlugin.name, StockChartSelectedDataIndexDirective);
        Vue.component(StockChartSelectedDataIndexesPlugin.name, StockChartSelectedDataIndexesDirective);
        Vue.component(StockChartPeriodPlugin.name, StockChartPeriodDirective);
        Vue.component(StockChartPeriodsPlugin.name, StockChartPeriodsDirective);
        Vue.component(StockEventPlugin.name, StockEventDirective);
        Vue.component(StockEventsPlugin.name, StockEventsDirective);
        Vue.component(StockChartIndicatorPlugin.name, StockChartIndicatorDirective);
        Vue.component(StockChartIndicatorsPlugin.name, StockChartIndicatorsDirective);
    }
};

var BulletRangeCollectionDirective = vueDefineComponent({
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
            return 'e-bullet-range-collection';
        }
    }
});
var BulletRangeCollectionPlugin = {
    name: 'e-bullet-range-collection',
    install: function (Vue) {
        Vue.component(BulletRangeCollectionPlugin.name, BulletRangeCollectionDirective);
    }
};
var BulletRangeDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-bullet-range';
        }
    }
});
var BulletRangePlugin = {
    name: 'e-bullet-range',
    install: function (Vue) {
        Vue.component(BulletRangePlugin.name, BulletRangeDirective);
    }
};

var properties$6 = ['isLazyUpdate', 'plugins', 'animation', 'border', 'categoryField', 'categoryLabelStyle', 'dataLabel', 'dataSource', 'enableGroupSeparator', 'enablePersistence', 'enableRtl', 'height', 'interval', 'labelFormat', 'labelPosition', 'labelStyle', 'legendSettings', 'locale', 'majorTickLines', 'margin', 'maximum', 'minimum', 'minorTickLines', 'minorTicksPerInterval', 'opposedPosition', 'orientation', 'query', 'ranges', 'subtitle', 'subtitleStyle', 'tabIndex', 'targetColor', 'targetField', 'targetTypes', 'targetWidth', 'theme', 'tickPosition', 'title', 'titlePosition', 'titleStyle', 'tooltip', 'type', 'valueBorder', 'valueField', 'valueFill', 'valueHeight', 'width', 'beforePrint', 'bulletChartMouseClick', 'legendRender', 'load', 'loaded', 'tooltipRender'];
var modelProps$6 = ['dataSource'];
var testProp$6 = getProps({ props: properties$6 });
var props$6 = testProp$6[0], watch$6 = testProp$6[1], emitProbs$6 = Object.keys(watch$6);
emitProbs$6.push('modelchanged', 'update:modelValue');
for (var _i$6 = 0, modelProps_1$6 = modelProps$6; _i$6 < modelProps_1$6.length; _i$6++) {
    var props_1$6 = modelProps_1$6[_i$6];
    emitProbs$6.push('update:' + props_1$6);
}
/**
 * Represents Vuejs BulletChart Component
 * ```vue
 * <ejs-bulletchart></ejs-bulletchart>
 * ```
 */
var BulletChartComponent = vueDefineComponent({
    name: 'BulletChartComponent',
    mixins: [ComponentBase],
    props: props$6,
    watch: watch$6,
    emits: emitProbs$6,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new BulletChart({}),
            propKeys: properties$6,
            models: modelProps$6,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-bullet-range-collection": "e-bullet-range" },
            tagNameMapper: { "e-bullet-range-collection": "e-ranges" },
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
        createSvg: function (chart) {
            return this.ej2Instances.createSvg(chart);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        export: function (type, fileName, orientation, controls, width, height, isVertical) {
            return this.ej2Instances.export(type, fileName, orientation, controls, width, height, isVertical);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        removeSvg: function () {
            return this.ej2Instances.removeSvg();
        },
    }
});
var BulletChartPlugin = {
    name: 'ejs-bulletchart',
    install: function (Vue) {
        Vue.component(BulletChartPlugin.name, BulletChartComponent);
        Vue.component(BulletRangePlugin.name, BulletRangeDirective);
        Vue.component(BulletRangeCollectionPlugin.name, BulletRangeCollectionDirective);
    }
};

var Chart3DSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-chart3d-series-collection';
        }
    }
});
var Chart3DSeriesCollectionPlugin = {
    name: 'e-chart3d-series-collection',
    install: function (Vue) {
        Vue.component(Chart3DSeriesCollectionPlugin.name, Chart3DSeriesCollectionDirective);
    }
};
/**
 * Represents Vuejs 3D Chart Component
 * ```vue
 * <ejs-chart3d>
 * <e-chart3d-series-collection>
 * <e-chart3d-series></e-chart3d-series>
 * </e-chart3d-series-collection>
 * </ejs-chart3d>
 * ```
 */
var Chart3DSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-series';
        }
    }
});
var Chart3DSeriesPlugin = {
    name: 'e-chart3d-series',
    install: function (Vue) {
        Vue.component(Chart3DSeriesPlugin.name, Chart3DSeriesDirective);
    }
};

var Chart3DAxesDirective = vueDefineComponent({
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
            return 'e-chart3daxes';
        }
    }
});
var Chart3DAxesPlugin = {
    name: 'e-chart3daxes',
    install: function (Vue) {
        Vue.component(Chart3DAxesPlugin.name, Chart3DAxesDirective);
    }
};
var Chart3DAxisDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3daxis';
        }
    }
});
var Chart3DAxisPlugin = {
    name: 'e-chart3daxis',
    install: function (Vue) {
        Vue.component(Chart3DAxisPlugin.name, Chart3DAxisDirective);
    }
};

var Chart3DRowsDirective = vueDefineComponent({
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
            return 'e-chart3d-rows';
        }
    }
});
var Chart3DRowsPlugin = {
    name: 'e-chart3d-rows',
    install: function (Vue) {
        Vue.component(Chart3DRowsPlugin.name, Chart3DRowsDirective);
    }
};
var Chart3DRowDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-row';
        }
    }
});
var Chart3DRowPlugin = {
    name: 'e-chart3d-row',
    install: function (Vue) {
        Vue.component(Chart3DRowPlugin.name, Chart3DRowDirective);
    }
};

var Chart3DColumnsDirective = vueDefineComponent({
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
            return 'e-chart3d-columns';
        }
    }
});
var Chart3DColumnsPlugin = {
    name: 'e-chart3d-columns',
    install: function (Vue) {
        Vue.component(Chart3DColumnsPlugin.name, Chart3DColumnsDirective);
    }
};
var Chart3DColumnDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-columns';
        }
    }
});
var Chart3DColumnPlugin = {
    name: 'e-chart3d-columns',
    install: function (Vue) {
        Vue.component(Chart3DColumnPlugin.name, Chart3DColumnDirective);
    }
};

var Chart3DSelectedDataIndexesDirective = vueDefineComponent({
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
            return 'e-chart3d-selecteddataindexes';
        }
    }
});
var Chart3DSelectedDataIndexesPlugin = {
    name: 'e-chart3d-selecteddataindexes',
    install: function (Vue) {
        Vue.component(Chart3DSelectedDataIndexesPlugin.name, Chart3DSelectedDataIndexesDirective);
    }
};
var Chart3DSelectedDataIndexDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-selecteddataindex';
        }
    }
});
var Chart3DSelectedDataIndexPlugin = {
    name: 'e-chart3d-selecteddataindex',
    install: function (Vue) {
        Vue.component(Chart3DSelectedDataIndexPlugin.name, Chart3DSelectedDataIndexDirective);
    }
};

var properties$7 = ['isLazyUpdate', 'plugins', 'axes', 'background', 'backgroundImage', 'border', 'columns', 'currencyCode', 'dataSource', 'depth', 'description', 'enableExport', 'enablePersistence', 'enableRotation', 'enableRtl', 'enableSideBySidePlacement', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'isMultiSelect', 'isTransposed', 'legendSettings', 'locale', 'margin', 'palettes', 'perspectiveAngle', 'primaryXAxis', 'primaryYAxis', 'rotation', 'rows', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'subTitle', 'subTitleStyle', 'theme', 'tilt', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'wallColor', 'wallSize', 'width', 'afterExport', 'axisLabelRender', 'beforeExport', 'beforePrint', 'beforeResize', 'chart3DMouseClick', 'chart3DMouseDown', 'chart3DMouseLeave', 'chart3DMouseMove', 'chart3DMouseUp', 'legendClick', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'selectionComplete', 'seriesRender', 'textRender', 'tooltipRender'];
var modelProps$7 = ['dataSource'];
var testProp$7 = getProps({ props: properties$7 });
var props$7 = testProp$7[0], watch$7 = testProp$7[1], emitProbs$7 = Object.keys(watch$7);
emitProbs$7.push('modelchanged', 'update:modelValue');
for (var _i$7 = 0, modelProps_1$7 = modelProps$7; _i$7 < modelProps_1$7.length; _i$7++) {
    var props_1$7 = modelProps_1$7[_i$7];
    emitProbs$7.push('update:' + props_1$7);
}
/**
 * Represents Vuejs 3D Chart Component
 * ```vue
 * <ejs-chart3d></ejs-chart3d>
 * ```
 */
var Chart3DComponent = vueDefineComponent({
    name: 'Chart3DComponent',
    mixins: [ComponentBase],
    props: props$7,
    watch: watch$7,
    emits: emitProbs$7,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Chart3D({}),
            propKeys: properties$7,
            models: modelProps$7,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-chart3d-series-collection": "e-chart3d-series", "e-chart3daxes": "e-chart3daxis", "e-chart3d-rows": "e-chart3d-row", "e-chart3d-columns": "e-chart3d-columns", "e-chart3d-selecteddataindexes": "e-chart3d-selecteddataindex" },
            tagNameMapper: { "e-chart3d-series-collection": "e-series", "e-chart3daxes": "e-axes", "e-chart3d-rows": "e-rows", "e-chart3d-columns": "e-columns", "e-chart3d-selecteddataindexes": "e-selectedDataIndexes" },
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
        addSeries: function (seriesCollection) {
            return this.ej2Instances.addSeries(seriesCollection);
        },
        createChartSvg: function () {
            return this.ej2Instances.createChartSvg();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        export: function (type, fileName) {
            return this.ej2Instances.export(type, fileName);
        },
        highlightAnimation: function (element, index, duration, startOpacity) {
            return this.ej2Instances.highlightAnimation(element, index, duration, startOpacity);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        removeSeries: function (index) {
            return this.ej2Instances.removeSeries(index);
        },
        stopElementAnimation: function (element, index) {
            return this.ej2Instances.stopElementAnimation(element, index);
        },
    }
});
var Chart3DPlugin = {
    name: 'ejs-chart3d',
    install: function (Vue) {
        Vue.component(Chart3DPlugin.name, Chart3DComponent);
        Vue.component(Chart3DSeriesPlugin.name, Chart3DSeriesDirective);
        Vue.component(Chart3DSeriesCollectionPlugin.name, Chart3DSeriesCollectionDirective);
        Vue.component(Chart3DAxisPlugin.name, Chart3DAxisDirective);
        Vue.component(Chart3DAxesPlugin.name, Chart3DAxesDirective);
        Vue.component(Chart3DRowPlugin.name, Chart3DRowDirective);
        Vue.component(Chart3DRowsPlugin.name, Chart3DRowsDirective);
        Vue.component(Chart3DColumnPlugin.name, Chart3DColumnDirective);
        Vue.component(Chart3DColumnsPlugin.name, Chart3DColumnsDirective);
        Vue.component(Chart3DSelectedDataIndexPlugin.name, Chart3DSelectedDataIndexDirective);
        Vue.component(Chart3DSelectedDataIndexesPlugin.name, Chart3DSelectedDataIndexesDirective);
    }
};

var CircularChart3DSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-circularchart3d-series-collection';
        }
    }
});
var CircularChart3DSeriesCollectionPlugin = {
    name: 'e-circularchart3d-series-collection',
    install: function (Vue) {
        Vue.component(CircularChart3DSeriesCollectionPlugin.name, CircularChart3DSeriesCollectionDirective);
    }
};
var CircularChart3DSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-circularchart3d-series';
        }
    }
});
var CircularChart3DSeriesPlugin = {
    name: 'e-circularchart3d-series',
    install: function (Vue) {
        Vue.component(CircularChart3DSeriesPlugin.name, CircularChart3DSeriesDirective);
    }
};

var CircularChart3DSelectedDataIndexesDirective = vueDefineComponent({
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
            return 'e-circularchart3d-selecteddataindexes';
        }
    }
});
var CircularChart3DSelectedDataIndexesPlugin = {
    name: 'e-circularchart3d-selecteddataindexes',
    install: function (Vue) {
        Vue.component(CircularChart3DSelectedDataIndexesPlugin.name, CircularChart3DSelectedDataIndexesDirective);
    }
};
var CircularChart3DSelectedDataIndexDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-circularchart3d-selecteddataindex';
        }
    }
});
var CircularChart3DSelectedDataIndexPlugin = {
    name: 'e-circularchart3d-selecteddataindex',
    install: function (Vue) {
        Vue.component(CircularChart3DSelectedDataIndexPlugin.name, CircularChart3DSelectedDataIndexDirective);
    }
};

var properties$8 = ['isLazyUpdate', 'plugins', 'background', 'backgroundImage', 'border', 'dataSource', 'depth', 'enableAnimation', 'enableExport', 'enablePersistence', 'enableRotation', 'enableRtl', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'isMultiSelect', 'legendSettings', 'locale', 'margin', 'rotation', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'subTitle', 'subTitleStyle', 'theme', 'tilt', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'afterExport', 'beforeExport', 'beforePrint', 'beforeResize', 'circularChart3DMouseClick', 'circularChart3DMouseDown', 'circularChart3DMouseLeave', 'circularChart3DMouseMove', 'circularChart3DMouseUp', 'legendClick', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'selectionComplete', 'seriesRender', 'textRender', 'tooltipRender'];
var modelProps$8 = ['dataSource'];
var testProp$8 = getProps({ props: properties$8 });
var props$8 = testProp$8[0], watch$8 = testProp$8[1], emitProbs$8 = Object.keys(watch$8);
emitProbs$8.push('modelchanged', 'update:modelValue');
for (var _i$8 = 0, modelProps_1$8 = modelProps$8; _i$8 < modelProps_1$8.length; _i$8++) {
    var props_1$8 = modelProps_1$8[_i$8];
    emitProbs$8.push('update:' + props_1$8);
}
/**
 * Represents Vuejs Circular 3D Chart Component
 * ```vue
 * <ejs-circularchart3d></ejs-circularchart3d>
 * ```
 */
var CircularChart3DComponent = vueDefineComponent({
    name: 'CircularChart3DComponent',
    mixins: [ComponentBase],
    props: props$8,
    watch: watch$8,
    emits: emitProbs$8,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new CircularChart3D({}),
            propKeys: properties$8,
            models: modelProps$8,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-circularchart3d-series-collection": "e-circularchart3d-series", "e-circularchart3d-selecteddataindexes": "e-circularchart3d-selecteddataindex" },
            tagNameMapper: { "e-circularchart3d-series-collection": "e-series", "e-circularchart3d-selecteddataindexes": "e-selectedDataIndexes" },
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
        export: function (type, fileName) {
            return this.ej2Instances.export(type, fileName);
        },
        pdfExport: function (fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage) {
            return this.ej2Instances.pdfExport(fileName, orientation, controls, width, height, isVertical, header, footer, exportToMultiplePage);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
    }
});
var CircularChart3DPlugin = {
    name: 'ejs-circularchart3d',
    install: function (Vue) {
        Vue.component(CircularChart3DPlugin.name, CircularChart3DComponent);
        Vue.component(CircularChart3DSeriesPlugin.name, CircularChart3DSeriesDirective);
        Vue.component(CircularChart3DSeriesCollectionPlugin.name, CircularChart3DSeriesCollectionDirective);
        Vue.component(CircularChart3DSelectedDataIndexPlugin.name, CircularChart3DSelectedDataIndexDirective);
        Vue.component(CircularChart3DSelectedDataIndexesPlugin.name, CircularChart3DSelectedDataIndexesDirective);
    }
};

export { AccumulationAnnotationDirective, AccumulationAnnotationPlugin, AccumulationAnnotationsDirective, AccumulationAnnotationsPlugin, AccumulationChartComponent, AccumulationChartPlugin, AccumulationSeriesCollectionDirective, AccumulationSeriesCollectionPlugin, AccumulationSeriesDirective, AccumulationSeriesPlugin, AnnotationDirective, AnnotationPlugin, AnnotationsDirective, AnnotationsPlugin, AxesDirective, AxesPlugin, AxisDirective, AxisPlugin, BulletChartComponent, BulletChartPlugin, BulletRangeCollectionDirective, BulletRangeCollectionPlugin, BulletRangeDirective, BulletRangePlugin, CategoriesDirective, CategoriesPlugin, CategoryDirective, CategoryPlugin, Chart3DAxesDirective, Chart3DAxesPlugin, Chart3DAxisDirective, Chart3DAxisPlugin, Chart3DColumnDirective, Chart3DColumnPlugin, Chart3DColumnsDirective, Chart3DColumnsPlugin, Chart3DComponent, Chart3DPlugin, Chart3DRowDirective, Chart3DRowPlugin, Chart3DRowsDirective, Chart3DRowsPlugin, Chart3DSelectedDataIndexDirective, Chart3DSelectedDataIndexPlugin, Chart3DSelectedDataIndexesDirective, Chart3DSelectedDataIndexesPlugin, Chart3DSeriesCollectionDirective, Chart3DSeriesCollectionPlugin, Chart3DSeriesDirective, Chart3DSeriesPlugin, ChartComponent, ChartPlugin, CircularChart3DComponent, CircularChart3DPlugin, CircularChart3DSelectedDataIndexDirective, CircularChart3DSelectedDataIndexPlugin, CircularChart3DSelectedDataIndexesDirective, CircularChart3DSelectedDataIndexesPlugin, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesCollectionPlugin, CircularChart3DSeriesDirective, CircularChart3DSeriesPlugin, ColumnDirective, ColumnPlugin, ColumnsDirective, ColumnsPlugin, IndicatorDirective, IndicatorPlugin, IndicatorsDirective, IndicatorsPlugin, MultiLevelLabelDirective, MultiLevelLabelPlugin, MultiLevelLabelsDirective, MultiLevelLabelsPlugin, RangeBandSettingDirective, RangeBandSettingPlugin, RangeBandSettingsDirective, RangeBandSettingsPlugin, RangeColorSettingDirective, RangeColorSettingPlugin, RangeColorSettingsDirective, RangeColorSettingsPlugin, RangeNavigatorComponent, RangeNavigatorPlugin, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesCollectionPlugin, RangenavigatorSeriesDirective, RangenavigatorSeriesPlugin, RowDirective, RowPlugin, RowsDirective, RowsPlugin, SegmentDirective, SegmentPlugin, SegmentsDirective, SegmentsPlugin, SelectedDataIndexDirective, SelectedDataIndexPlugin, SelectedDataIndexesDirective, SelectedDataIndexesPlugin, SeriesCollectionDirective, SeriesCollectionPlugin, SeriesDirective, SeriesPlugin, SmithchartComponent, SmithchartPlugin, SmithchartSeriesCollectionDirective, SmithchartSeriesCollectionPlugin, SmithchartSeriesDirective, SmithchartSeriesPlugin, SparklineComponent, SparklinePlugin, StockChartAnnotationDirective, StockChartAnnotationPlugin, StockChartAnnotationsDirective, StockChartAnnotationsPlugin, StockChartAxesDirective, StockChartAxesPlugin, StockChartAxisDirective, StockChartAxisPlugin, StockChartComponent, StockChartIndicatorDirective, StockChartIndicatorPlugin, StockChartIndicatorsDirective, StockChartIndicatorsPlugin, StockChartPeriodDirective, StockChartPeriodPlugin, StockChartPeriodsDirective, StockChartPeriodsPlugin, StockChartPlugin, StockChartRowDirective, StockChartRowPlugin, StockChartRowsDirective, StockChartRowsPlugin, StockChartSelectedDataIndexDirective, StockChartSelectedDataIndexPlugin, StockChartSelectedDataIndexesDirective, StockChartSelectedDataIndexesPlugin, StockChartSeriesCollectionDirective, StockChartSeriesCollectionPlugin, StockChartSeriesDirective, StockChartSeriesPlugin, StockChartTrendlineDirective, StockChartTrendlinePlugin, StockChartTrendlinesDirective, StockChartTrendlinesPlugin, StockEventDirective, StockEventPlugin, StockEventsDirective, StockEventsPlugin, StripLineDirective, StripLinePlugin, StripLinesDirective, StripLinesPlugin, TrendlineDirective, TrendlinePlugin, TrendlinesDirective, TrendlinesPlugin };
//# sourceMappingURL=ej2-vue-charts.es5.js.map
