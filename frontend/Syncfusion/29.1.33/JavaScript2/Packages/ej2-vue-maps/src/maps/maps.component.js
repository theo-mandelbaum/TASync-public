import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { Maps } from '@syncfusion/ej2-maps';
import { InitialShapeSelectionsDirective, InitialShapeSelectionDirective, InitialShapeSelectionsPlugin, InitialShapeSelectionPlugin } from './initialshapeselection.directive';
import { MarkersDirective, MarkerDirective, MarkersPlugin, MarkerPlugin } from './markersettings.directive';
import { ColorMappingsDirective, ColorMappingDirective, ColorMappingsPlugin, ColorMappingPlugin } from './colormapping.directive';
import { BubblesDirective, BubbleDirective, BubblesPlugin, BubblePlugin } from './bubblesettings.directive';
import { NavigationLinesDirective, NavigationLineDirective, NavigationLinesPlugin, NavigationLinePlugin } from './navigationlinesettings.directive';
import { LayersDirective, LayerDirective, LayersPlugin, LayerPlugin } from './layers.directive';
import { AnnotationsDirective, AnnotationDirective, AnnotationsPlugin, AnnotationPlugin } from './annotations.directive';
export var properties = ['isLazyUpdate', 'plugins', 'allowImageExport', 'allowPdfExport', 'allowPrint', 'annotations', 'background', 'baseLayerIndex', 'border', 'centerPosition', 'description', 'enablePersistence', 'enableRtl', 'format', 'height', 'layers', 'legendSettings', 'locale', 'mapsArea', 'margin', 'projectionType', 'tabIndex', 'theme', 'titleSettings', 'tooltipDisplayMode', 'useGroupingSeparator', 'width', 'zoomSettings', 'animationComplete', 'annotationRendering', 'beforePrint', 'bubbleClick', 'bubbleMouseMove', 'bubbleRendering', 'click', 'dataLabelRendering', 'doubleClick', 'itemHighlight', 'itemSelection', 'layerRendering', 'legendRendering', 'load', 'loaded', 'markerClick', 'markerClusterClick', 'markerClusterMouseMove', 'markerClusterRendering', 'markerDragEnd', 'markerDragStart', 'markerMouseMove', 'markerRendering', 'mouseMove', 'onclick', 'pan', 'panComplete', 'resize', 'rightClick', 'shapeHighlight', 'shapeRendering', 'shapeSelected', 'tooltipRender', 'tooltipRenderComplete', 'zoom', 'zoomComplete'];
export var modelProps = ['dataSource'];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
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
export var MapsComponent = vueDefineComponent({
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
export var MapsPlugin = {
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
