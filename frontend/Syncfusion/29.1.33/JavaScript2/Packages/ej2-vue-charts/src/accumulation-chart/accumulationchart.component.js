import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { AccumulationChart } from '@syncfusion/ej2-charts';
import { AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationSeriesCollectionPlugin, AccumulationSeriesPlugin } from './series.directive';
import { AccumulationAnnotationsDirective, AccumulationAnnotationDirective, AccumulationAnnotationsPlugin, AccumulationAnnotationPlugin } from './annotations.directive';
export var properties = ['isLazyUpdate', 'plugins', 'accessibility', 'allowExport', 'annotations', 'background', 'backgroundImage', 'border', 'center', 'centerLabel', 'currencyCode', 'dataSource', 'enableAnimation', 'enableBorderOnMouseMove', 'enableExport', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSmartLabels', 'focusBorderColor', 'focusBorderMargin', 'focusBorderWidth', 'height', 'highlightColor', 'highlightMode', 'highlightPattern', 'isMultiSelect', 'legendSettings', 'locale', 'margin', 'selectedDataIndexes', 'selectionMode', 'selectionPattern', 'series', 'subTitle', 'subTitleStyle', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'afterExport', 'animationComplete', 'annotationRender', 'beforeExport', 'beforePrint', 'beforeResize', 'chartDoubleClick', 'chartMouseClick', 'chartMouseDown', 'chartMouseLeave', 'chartMouseMove', 'chartMouseUp', 'legendClick', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'selectionComplete', 'seriesRender', 'textRender', 'tooltipRender'];
export var modelProps = ['dataSource'];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents Vuejs AccumulationChart Component
 * ```vue
 * <ejs-accumulationchart></ejs-accumulationchart>
 * ```
 */
export var AccumulationChartComponent = vueDefineComponent({
    name: 'AccumulationChartComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new AccumulationChart({}),
            propKeys: properties,
            models: modelProps,
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
export var AccumulationChartPlugin = {
    name: 'ejs-accumulationchart',
    install: function (Vue) {
        Vue.component(AccumulationChartPlugin.name, AccumulationChartComponent);
        Vue.component(AccumulationSeriesPlugin.name, AccumulationSeriesDirective);
        Vue.component(AccumulationSeriesCollectionPlugin.name, AccumulationSeriesCollectionDirective);
        Vue.component(AccumulationAnnotationPlugin.name, AccumulationAnnotationDirective);
        Vue.component(AccumulationAnnotationsPlugin.name, AccumulationAnnotationsDirective);
    }
};
