import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { Chart } from '@syncfusion/ej2-charts';
import { TrendlinesDirective, TrendlineDirective, TrendlinesPlugin, TrendlinePlugin } from './trendlines.directive';
import { SegmentsDirective, SegmentDirective, SegmentsPlugin, SegmentPlugin } from './segments.directive';
import { SeriesCollectionDirective, SeriesDirective, SeriesCollectionPlugin, SeriesPlugin } from './series.directive';
import { StripLinesDirective, StripLineDirective, StripLinesPlugin, StripLinePlugin } from './striplines.directive';
import { CategoriesDirective, CategoryDirective, CategoriesPlugin, CategoryPlugin } from './categories.directive';
import { MultiLevelLabelsDirective, MultiLevelLabelDirective, MultiLevelLabelsPlugin, MultiLevelLabelPlugin } from './multilevellabels.directive';
import { AxesDirective, AxisDirective, AxesPlugin, AxisPlugin } from './axes.directive';
import { RowsDirective, RowDirective, RowsPlugin, RowPlugin } from './rows.directive';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { RangeColorSettingsDirective, RangeColorSettingDirective, RangeColorSettingsPlugin, RangeColorSettingPlugin } from './rangecolorsettings.directive';
import { AnnotationsDirective, AnnotationDirective, AnnotationsPlugin, AnnotationPlugin } from './annotations.directive';
import { SelectedDataIndexesDirective, SelectedDataIndexDirective, SelectedDataIndexesPlugin, SelectedDataIndexPlugin } from './selecteddataindexes.directive';
import { IndicatorsDirective, IndicatorDirective, IndicatorsPlugin, IndicatorPlugin } from './indicators.directive';
export var properties = ['isLazyUpdate', 'plugins', 'accessibility', 'allowExport', 'allowMultiSelection', 'annotations', 'axes', 'background', 'backgroundImage', 'border', 'chartArea', 'columns', 'crosshair', 'currencyCode', 'dataSource', 'description', 'enableAnimation', 'enableAutoIntervalOnBothAxis', 'enableCanvas', 'enableExport', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSideBySidePlacement', 'focusBorderColor', 'focusBorderMargin', 'focusBorderWidth', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'indicators', 'isMultiSelect', 'isTransposed', 'legendSettings', 'locale', 'margin', 'palettes', 'primaryXAxis', 'primaryYAxis', 'rangeColorSettings', 'rows', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'stackLabels', 'subTitle', 'subTitleStyle', 'tabIndex', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'zoomSettings', 'afterExport', 'animationComplete', 'annotationRender', 'axisLabelClick', 'axisLabelRender', 'axisMultiLabelRender', 'axisRangeCalculated', 'beforeExport', 'beforePrint', 'beforeResize', 'chartDoubleClick', 'chartMouseClick', 'chartMouseDown', 'chartMouseLeave', 'chartMouseMove', 'chartMouseUp', 'drag', 'dragComplete', 'dragEnd', 'dragStart', 'legendClick', 'legendRender', 'load', 'loaded', 'multiLevelLabelClick', 'onZooming', 'pointClick', 'pointDoubleClick', 'pointMove', 'pointRender', 'resized', 'scrollChanged', 'scrollEnd', 'scrollStart', 'selectionComplete', 'seriesRender', 'sharedTooltipRender', 'textRender', 'tooltipRender', 'zoomComplete'];
export var modelProps = ['dataSource'];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
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
export var ChartComponent = vueDefineComponent({
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
export var ChartPlugin = {
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
