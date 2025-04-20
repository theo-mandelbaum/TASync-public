import { CircularGauge } from '@syncfusion/ej2-circulargauge';
export * from '@syncfusion/ej2-circulargauge';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

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
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
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
 * Represents the directive to render and customize the ranges in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-ranges><e-range></e-range></e-ranges>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
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

var PointersDirective = vueDefineComponent({
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
            return 'e-pointers';
        }
    }
});
var PointersPlugin = {
    name: 'e-pointers',
    install: function (Vue) {
        Vue.component(PointersPlugin.name, PointersDirective);
    }
};
/**
 * Represents the directive to render and customize the pointers in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
 * ```
 */
var PointerDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-pointer';
        }
    }
});
var PointerPlugin = {
    name: 'e-pointer',
    install: function (Vue) {
        Vue.component(PointerPlugin.name, PointerDirective);
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
/**
 * Represents the directive to render the axes in the Circular Gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes><e-axis></e-axis></e-axes>
 * </ejs-circulargauge>
 * ```
 */
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

var properties = ['isLazyUpdate', 'plugins', 'allowImageExport', 'allowMargin', 'allowPdfExport', 'allowPrint', 'allowRangePreRender', 'animationDuration', 'axes', 'background', 'border', 'centerX', 'centerY', 'description', 'enablePersistence', 'enablePointerDrag', 'enableRangeDrag', 'enableRtl', 'height', 'legendSettings', 'locale', 'margin', 'moveToCenter', 'tabIndex', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'animationComplete', 'annotationRender', 'axisLabelRender', 'beforePrint', 'dragEnd', 'dragMove', 'dragStart', 'gaugeMouseDown', 'gaugeMouseLeave', 'gaugeMouseMove', 'gaugeMouseUp', 'legendRender', 'load', 'loaded', 'radiusCalculate', 'resized', 'tooltipRender'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Vue Circular Gauge component. This tag is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```vue
 * <ejs-circulargauge></ejs-circulargauge>
 * ```
 */
var CircularGaugeComponent = vueDefineComponent({
    name: 'CircularGaugeComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new CircularGauge({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-axes": { "e-axis": { "e-annotations": "e-annotation", "e-ranges": "e-range", "e-pointers": "e-pointer" } } },
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
        export: function (type, fileName, orientation, allowDownload) {
            return this.ej2Instances.export(type, fileName, orientation, allowDownload);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        setAnnotationValue: function (axisIndex, annotationIndex, content) {
            return this.ej2Instances.setAnnotationValue(axisIndex, annotationIndex, content);
        },
        setPointerValue: function (axisIndex, pointerIndex, value) {
            return this.ej2Instances.setPointerValue(axisIndex, pointerIndex, value);
        },
        setRangeValue: function (axisIndex, rangeIndex, start, end) {
            return this.ej2Instances.setRangeValue(axisIndex, rangeIndex, start, end);
        },
    }
});
var CircularGaugePlugin = {
    name: 'ejs-circulargauge',
    install: function (Vue) {
        Vue.component(CircularGaugePlugin.name, CircularGaugeComponent);
        Vue.component(AxisPlugin.name, AxisDirective);
        Vue.component(AxesPlugin.name, AxesDirective);
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
        Vue.component(RangePlugin.name, RangeDirective);
        Vue.component(RangesPlugin.name, RangesDirective);
        Vue.component(PointerPlugin.name, PointerDirective);
        Vue.component(PointersPlugin.name, PointersDirective);
    }
};

export { AnnotationDirective, AnnotationPlugin, AnnotationsDirective, AnnotationsPlugin, AxesDirective, AxesPlugin, AxisDirective, AxisPlugin, CircularGaugeComponent, CircularGaugePlugin, PointerDirective, PointerPlugin, PointersDirective, PointersPlugin, RangeDirective, RangePlugin, RangesDirective, RangesPlugin };
//# sourceMappingURL=ej2-vue-circulargauge.es5.js.map
