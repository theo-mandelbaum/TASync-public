import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { StockChart } from '@syncfusion/ej2-charts';
import { StockChartTrendlinesDirective, StockChartTrendlineDirective, StockChartTrendlinesPlugin, StockChartTrendlinePlugin } from './trendlines.directive';
import { StockChartSeriesCollectionDirective, StockChartSeriesDirective, StockChartSeriesCollectionPlugin, StockChartSeriesPlugin } from './series.directive';
import { StockChartAxesDirective, StockChartAxisDirective, StockChartAxesPlugin, StockChartAxisPlugin } from './axes.directive';
import { StockChartRowsDirective, StockChartRowDirective, StockChartRowsPlugin, StockChartRowPlugin } from './rows.directive';
import { StockChartAnnotationsDirective, StockChartAnnotationDirective, StockChartAnnotationsPlugin, StockChartAnnotationPlugin } from './annotations.directive';
import { StockChartSelectedDataIndexesDirective, StockChartSelectedDataIndexDirective, StockChartSelectedDataIndexesPlugin, StockChartSelectedDataIndexPlugin } from './selecteddataindexes.directive';
import { StockChartPeriodsDirective, StockChartPeriodDirective, StockChartPeriodsPlugin, StockChartPeriodPlugin } from './periods.directive';
import { StockEventsDirective, StockEventDirective, StockEventsPlugin, StockEventPlugin } from './stockevents.directive';
import { StockChartIndicatorsDirective, StockChartIndicatorDirective, StockChartIndicatorsPlugin, StockChartIndicatorPlugin } from './indicators.directive';
export var properties = ['isLazyUpdate', 'plugins', 'annotations', 'axes', 'background', 'border', 'chartArea', 'crosshair', 'dataSource', 'enableCustomRange', 'enablePeriodSelector', 'enablePersistence', 'enableRtl', 'enableSelector', 'exportType', 'height', 'indicatorType', 'indicators', 'isMultiSelect', 'isSelect', 'isTransposed', 'legendSettings', 'locale', 'margin', 'periods', 'primaryXAxis', 'primaryYAxis', 'rows', 'selectedDataIndexes', 'selectionMode', 'series', 'seriesType', 'stockEvents', 'theme', 'title', 'titleStyle', 'tooltip', 'trendlineType', 'width', 'zoomSettings', 'axisLabelRender', 'beforeExport', 'legendClick', 'legendRender', 'load', 'loaded', 'onZooming', 'pointClick', 'pointMove', 'rangeChange', 'selectorRender', 'seriesRender', 'stockChartMouseClick', 'stockChartMouseDown', 'stockChartMouseLeave', 'stockChartMouseMove', 'stockChartMouseUp', 'stockEventRender', 'tooltipRender'];
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
 * <ejs-stockchart></ejs-stockchart>
 * ```
 */
export var StockChartComponent = vueDefineComponent({
    name: 'StockChartComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new StockChart({}),
            propKeys: properties,
            models: modelProps,
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
export var StockChartPlugin = {
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
