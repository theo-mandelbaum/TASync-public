import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { Chart3D } from '@syncfusion/ej2-charts';
import { Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, Chart3DSeriesCollectionPlugin, Chart3DSeriesPlugin } from './series.directive';
import { Chart3DAxesDirective, Chart3DAxisDirective, Chart3DAxesPlugin, Chart3DAxisPlugin } from './axes.directive';
import { Chart3DRowsDirective, Chart3DRowDirective, Chart3DRowsPlugin, Chart3DRowPlugin } from './rows.directive';
import { Chart3DColumnsDirective, Chart3DColumnDirective, Chart3DColumnsPlugin, Chart3DColumnPlugin } from './columns.directive';
import { Chart3DSelectedDataIndexesDirective, Chart3DSelectedDataIndexDirective, Chart3DSelectedDataIndexesPlugin, Chart3DSelectedDataIndexPlugin } from './selecteddataindexes.directive';
export var properties = ['isLazyUpdate', 'plugins', 'axes', 'background', 'backgroundImage', 'border', 'columns', 'currencyCode', 'dataSource', 'depth', 'description', 'enableExport', 'enablePersistence', 'enableRotation', 'enableRtl', 'enableSideBySidePlacement', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'isMultiSelect', 'isTransposed', 'legendSettings', 'locale', 'margin', 'palettes', 'perspectiveAngle', 'primaryXAxis', 'primaryYAxis', 'rotation', 'rows', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'subTitle', 'subTitleStyle', 'theme', 'tilt', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'wallColor', 'wallSize', 'width', 'afterExport', 'axisLabelRender', 'beforeExport', 'beforePrint', 'beforeResize', 'chart3DMouseClick', 'chart3DMouseDown', 'chart3DMouseLeave', 'chart3DMouseMove', 'chart3DMouseUp', 'legendClick', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'selectionComplete', 'seriesRender', 'textRender', 'tooltipRender'];
export var modelProps = ['dataSource'];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents Vuejs 3D Chart Component
 * ```vue
 * <ejs-chart3d></ejs-chart3d>
 * ```
 */
export var Chart3DComponent = vueDefineComponent({
    name: 'Chart3DComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Chart3D({}),
            propKeys: properties,
            models: modelProps,
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
export var Chart3DPlugin = {
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
