import { Maps } from '@syncfusion/ej2-maps';
export * from '@syncfusion/ej2-maps';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var InitialShapeSelectionsDirective = vueDefineComponent({
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
            return 'e-initialShapeSelections';
        }
    }
});
var InitialShapeSelectionsPlugin = {
    name: 'e-initialShapeSelections',
    install: function (Vue) {
        Vue.component(InitialShapeSelectionsPlugin.name, InitialShapeSelectionsDirective);
    }
};
/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-initialShapeSelections>
 * <e-initialShapeSelection>
 * </e-initialShapeSelection>
 * </e-initialShapeSelections>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
var InitialShapeSelectionDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-initialShapeSelection';
        }
    }
});
var InitialShapeSelectionPlugin = {
    name: 'e-initialShapeSelection',
    install: function (Vue) {
        Vue.component(InitialShapeSelectionPlugin.name, InitialShapeSelectionDirective);
    }
};

var MarkersDirective = vueDefineComponent({
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
            return 'e-markerSettings';
        }
    }
});
var MarkersPlugin = {
    name: 'e-markerSettings',
    install: function (Vue) {
        Vue.component(MarkersPlugin.name, MarkersDirective);
    }
};
/**
 * Represents the directive to define the markers in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-markerSettings>
 * <e-markerSetting>
 * </e-markerSetting>
 * </e-markerSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
var MarkerDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-markerSetting';
        }
    }
});
var MarkerPlugin = {
    name: 'e-markerSetting',
    install: function (Vue) {
        Vue.component(MarkerPlugin.name, MarkerDirective);
    }
};

var ColorMappingsDirective = vueDefineComponent({
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
            return 'e-colorMappings';
        }
    }
});
var ColorMappingsPlugin = {
    name: 'e-colorMappings',
    install: function (Vue) {
        Vue.component(ColorMappingsPlugin.name, ColorMappingsDirective);
    }
};
/**
 * Represents the directive to define the bubble color mapping in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
var ColorMappingDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-colorMapping';
        }
    }
});
var ColorMappingPlugin = {
    name: 'e-colorMapping',
    install: function (Vue) {
        Vue.component(ColorMappingPlugin.name, ColorMappingDirective);
    }
};

var BubblesDirective = vueDefineComponent({
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
            return 'e-bubbleSettings';
        }
    }
});
var BubblesPlugin = {
    name: 'e-bubbleSettings',
    install: function (Vue) {
        Vue.component(BubblesPlugin.name, BubblesDirective);
    }
};
/**
 * Represents the directive to define the bubbles in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
var BubbleDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-bubbleSetting';
        }
    }
});
var BubblePlugin = {
    name: 'e-bubbleSetting',
    install: function (Vue) {
        Vue.component(BubblePlugin.name, BubbleDirective);
    }
};

var NavigationLinesDirective = vueDefineComponent({
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
            return 'e-navigationLineSettings';
        }
    }
});
var NavigationLinesPlugin = {
    name: 'e-navigationLineSettings',
    install: function (Vue) {
        Vue.component(NavigationLinesPlugin.name, NavigationLinesDirective);
    }
};
/**
 * Represents the directive to define the navigation lines in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-navigationLineSettings>
 * <e-navigationLineSetting>
 * </e-navigationLineSetting>
 * </e-navigationLineSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
var NavigationLineDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-navigationLineSetting';
        }
    }
});
var NavigationLinePlugin = {
    name: 'e-navigationLineSetting',
    install: function (Vue) {
        Vue.component(NavigationLinePlugin.name, NavigationLineDirective);
    }
};

var LayersDirective = vueDefineComponent({
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
            return 'e-layers';
        }
    }
});
var LayersPlugin = {
    name: 'e-layers',
    install: function (Vue) {
        Vue.component(LayersPlugin.name, LayersDirective);
    }
};
/**
 * Represents the directive to define the layer of the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer></e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
var LayerDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-layer';
        }
    }
});
var LayerPlugin = {
    name: 'e-layer',
    install: function (Vue) {
        Vue.component(LayerPlugin.name, LayerDirective);
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
            return 'e-maps-annotations';
        }
    }
});
var AnnotationsPlugin = {
    name: 'e-maps-annotations',
    install: function (Vue) {
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
    }
};
/**
 * Represents the directive to define the annotations in the maps.
 * ```vue
 * <ejs-maps>
 * <e-maps-annotations>
 * <e-maps-annotation></e-maps-annotation>
 * </e-maps-annotations>
 * </ejs-maps>
 * ```
 */
var AnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-maps-annotation';
        }
    }
});
var AnnotationPlugin = {
    name: 'e-maps-annotation',
    install: function (Vue) {
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'allowImageExport', 'allowPdfExport', 'allowPrint', 'annotations', 'background', 'baseLayerIndex', 'border', 'centerPosition', 'description', 'enablePersistence', 'enableRtl', 'format', 'height', 'layers', 'legendSettings', 'locale', 'mapsArea', 'margin', 'projectionType', 'tabIndex', 'theme', 'titleSettings', 'tooltipDisplayMode', 'useGroupingSeparator', 'width', 'zoomSettings', 'animationComplete', 'annotationRendering', 'beforePrint', 'bubbleClick', 'bubbleMouseMove', 'bubbleRendering', 'click', 'dataLabelRendering', 'doubleClick', 'itemHighlight', 'itemSelection', 'layerRendering', 'legendRendering', 'load', 'loaded', 'markerClick', 'markerClusterClick', 'markerClusterMouseMove', 'markerClusterRendering', 'markerDragEnd', 'markerDragStart', 'markerMouseMove', 'markerRendering', 'mouseMove', 'onclick', 'pan', 'panComplete', 'resize', 'rightClick', 'shapeHighlight', 'shapeRendering', 'shapeSelected', 'tooltipRender', 'tooltipRenderComplete', 'zoom', 'zoomComplete'];
var modelProps = ['dataSource'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Vue Maps component.
 * It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that has rich feature set that includes markers, labels, bubbles and much more.
 * ```vue
 * <ejs-maps></ejs-maps>
 * ```
 */
var MapsComponent = vueDefineComponent({
    name: 'MapsComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Maps({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-layers": { "e-layer": { "e-initialShapeSelections": "e-initialShapeSelection", "e-markerSettings": "e-markerSetting", "e-bubbleSettings": { "e-bubbleSetting": { "e-colorMappings": "e-colorMapping" } }, "e-navigationLineSettings": "e-navigationLineSetting" } }, "e-maps-annotations": "e-maps-annotation" },
            tagNameMapper: { "e-initialShapeSelections": "e-initialShapeSelection", "e-colorMappings": "e-colorMapping", "e-maps-annotations": "e-annotations" },
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
        addLayer: function (layer) {
            return this.ej2Instances.addLayer(layer);
        },
        addMarker: function (layerIndex, markerCollection) {
            return this.ej2Instances.addMarker(layerIndex, markerCollection);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        export: function (type, fileName, orientation, allowDownload) {
            return this.ej2Instances.export(type, fileName, orientation, allowDownload);
        },
        getBingUrlTemplate: function (url) {
            return this.ej2Instances.getBingUrlTemplate(url);
        },
        getGeoLocation: function (layerIndex, x, y) {
            return this.ej2Instances.getGeoLocation(layerIndex, x, y);
        },
        getMinMaxLatitudeLongitude: function () {
            return this.ej2Instances.getMinMaxLatitudeLongitude();
        },
        getTileGeoLocation: function (x, y) {
            return this.ej2Instances.getTileGeoLocation(x, y);
        },
        mapsOnResize: function (e) {
            return this.ej2Instances.mapsOnResize(e);
        },
        panByDirection: function (direction, mouseLocation) {
            return this.ej2Instances.panByDirection(direction, mouseLocation);
        },
        pointToLatLong: function (pageX, pageY) {
            return this.ej2Instances.pointToLatLong(pageX, pageY);
        },
        print: function (id) {
            return this.ej2Instances.print(id);
        },
        removeLayer: function (index) {
            return this.ej2Instances.removeLayer(index);
        },
        shapeSelection: function (layerIndex, propertyName, name, enable) {
            return this.ej2Instances.shapeSelection(layerIndex, propertyName, name, enable);
        },
        zoomByPosition: function (centerPosition, zoomFactor) {
            return this.ej2Instances.zoomByPosition(centerPosition, zoomFactor);
        },
        zoomToCoordinates: function (minLatitude, minLongitude, maxLatitude, maxLongitude) {
            return this.ej2Instances.zoomToCoordinates(minLatitude, minLongitude, maxLatitude, maxLongitude);
        },
    }
});
var MapsPlugin = {
    name: 'ejs-maps',
    install: function (Vue) {
        Vue.component(MapsPlugin.name, MapsComponent);
        Vue.component(LayerPlugin.name, LayerDirective);
        Vue.component(LayersPlugin.name, LayersDirective);
        Vue.component(InitialShapeSelectionPlugin.name, InitialShapeSelectionDirective);
        Vue.component(InitialShapeSelectionsPlugin.name, InitialShapeSelectionsDirective);
        Vue.component(MarkerPlugin.name, MarkerDirective);
        Vue.component(MarkersPlugin.name, MarkersDirective);
        Vue.component(BubblePlugin.name, BubbleDirective);
        Vue.component(BubblesPlugin.name, BubblesDirective);
        Vue.component(ColorMappingPlugin.name, ColorMappingDirective);
        Vue.component(ColorMappingsPlugin.name, ColorMappingsDirective);
        Vue.component(NavigationLinePlugin.name, NavigationLineDirective);
        Vue.component(NavigationLinesPlugin.name, NavigationLinesDirective);
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
    }
};

export { AnnotationDirective, AnnotationPlugin, AnnotationsDirective, AnnotationsPlugin, BubbleDirective, BubblePlugin, BubblesDirective, BubblesPlugin, ColorMappingDirective, ColorMappingPlugin, ColorMappingsDirective, ColorMappingsPlugin, InitialShapeSelectionDirective, InitialShapeSelectionPlugin, InitialShapeSelectionsDirective, InitialShapeSelectionsPlugin, LayerDirective, LayerPlugin, LayersDirective, LayersPlugin, MapsComponent, MapsPlugin, MarkerDirective, MarkerPlugin, MarkersDirective, MarkersPlugin, NavigationLineDirective, NavigationLinePlugin, NavigationLinesDirective, NavigationLinesPlugin };
//# sourceMappingURL=ej2-vue-maps.es5.js.map
