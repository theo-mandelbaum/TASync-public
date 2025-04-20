import { Diagram, SymbolPalette, Overview } from '@syncfusion/ej2-diagrams';
export * from '@syncfusion/ej2-diagrams';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

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
 * `e-layers` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-layers>
 * <e-layer>
 * </e-layers>
 * </e-layers>
</ejs-diagram>
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

var CustomCursorsDirective = vueDefineComponent({
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
            return 'e-cursormaps';
        }
    }
});
var CustomCursorsPlugin = {
    name: 'e-cursormaps',
    install: function (Vue) {
        Vue.component(CustomCursorsPlugin.name, CustomCursorsDirective);
    }
};
/**
 * `e-custormaps` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-custormaps>
 * <e-custormap>
 * </e-custormap>
 * </e-custormaps>
</ejs-diagram>
 * ```
 */
var CustomCursorDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-cursormap';
        }
    }
});
var CustomCursorPlugin = {
    name: 'e-cursormap',
    install: function (Vue) {
        Vue.component(CustomCursorPlugin.name, CustomCursorDirective);
    }
};

var ConnectorFixedUserHandlesDirective = vueDefineComponent({
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
            return 'e-connector-fixeduserhandles';
        }
    }
});
var ConnectorFixedUserHandlesPlugin = {
    name: 'e-connector-fixeduserhandles',
    install: function (Vue) {
        Vue.component(ConnectorFixedUserHandlesPlugin.name, ConnectorFixedUserHandlesDirective);
    }
};
/**
 * `e-connector` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector>
 * <e-connector-fixeduserhandles>
 * <e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandles>
 * </e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
var ConnectorFixedUserHandleDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-connector-fixeduserhandle';
        }
    }
});
var ConnectorFixedUserHandlePlugin = {
    name: 'e-connector-fixeduserhandle',
    install: function (Vue) {
        Vue.component(ConnectorFixedUserHandlePlugin.name, ConnectorFixedUserHandleDirective);
    }
};

var ConnectorAnnotationsDirective = vueDefineComponent({
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
            return 'e-connector-annotations';
        }
    }
});
var ConnectorAnnotationsPlugin = {
    name: 'e-connector-annotations',
    install: function (Vue) {
        Vue.component(ConnectorAnnotationsPlugin.name, ConnectorAnnotationsDirective);
    }
};
/**
 * `e-connector-annotation` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector>
 * <e-connector-annotations>
 * <e-connector-annotation>
 * </e-connector-annotation>
 * </e-connector-annotations>
 * </e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
var ConnectorAnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-connector-annotation';
        }
    }
});
var ConnectorAnnotationPlugin = {
    name: 'e-connector-annotation',
    install: function (Vue) {
        Vue.component(ConnectorAnnotationPlugin.name, ConnectorAnnotationDirective);
    }
};

var ConnectorsDirective = vueDefineComponent({
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
            return 'e-connectors';
        }
    }
});
var ConnectorsPlugin = {
    name: 'e-connectors',
    install: function (Vue) {
        Vue.component(ConnectorsPlugin.name, ConnectorsDirective);
    }
};
/**
 * `e-connectors` directive represent a connectors of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
var ConnectorDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-connector';
        }
    }
});
var ConnectorPlugin = {
    name: 'e-connector',
    install: function (Vue) {
        Vue.component(ConnectorPlugin.name, ConnectorDirective);
    }
};

var NodeFixedUserHandlesDirective = vueDefineComponent({
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
            return 'e-node-fixeduserhandles';
        }
    }
});
var NodeFixedUserHandlesPlugin = {
    name: 'e-node-fixeduserhandles',
    install: function (Vue) {
        Vue.component(NodeFixedUserHandlesPlugin.name, NodeFixedUserHandlesDirective);
    }
};
/**
 * `e-node` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-fixeduserhandles>
 * <e-node-fixeduserhandle>
 * </e-node-fixeduserhandle>
 * </e-node-fixeduserhandles>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
var NodeFixedUserHandleDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-node-fixeduserhandle';
        }
    }
});
var NodeFixedUserHandlePlugin = {
    name: 'e-node-fixeduserhandle',
    install: function (Vue) {
        Vue.component(NodeFixedUserHandlePlugin.name, NodeFixedUserHandleDirective);
    }
};

var NodeAnnotationsDirective = vueDefineComponent({
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
            return 'e-node-annotations';
        }
    }
});
var NodeAnnotationsPlugin = {
    name: 'e-node-annotations',
    install: function (Vue) {
        Vue.component(NodeAnnotationsPlugin.name, NodeAnnotationsDirective);
    }
};
/**
 * `e-node` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-annotations>
 * <e-node-annotation>
 * </e-node-annotation>
 * </e-node-annotations>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
var NodeAnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-node-annotation';
        }
    }
});
var NodeAnnotationPlugin = {
    name: 'e-node-annotation',
    install: function (Vue) {
        Vue.component(NodeAnnotationPlugin.name, NodeAnnotationDirective);
    }
};

var PortsDirective = vueDefineComponent({
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
            return 'e-node-ports';
        }
    }
});
var PortsPlugin = {
    name: 'e-node-ports',
    install: function (Vue) {
        Vue.component(PortsPlugin.name, PortsDirective);
    }
};
/**
 * `e-port` directive represent a port of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-ports>
 * <e-node-port>
 * </e-node-port>
 * </e-node-ports>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
var PortDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-node-port';
        }
    }
});
var PortPlugin = {
    name: 'e-node-port',
    install: function (Vue) {
        Vue.component(PortPlugin.name, PortDirective);
    }
};

var NodesDirective = vueDefineComponent({
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
            return 'e-nodes';
        }
    }
});
var NodesPlugin = {
    name: 'e-nodes',
    install: function (Vue) {
        Vue.component(NodesPlugin.name, NodesDirective);
    }
};
/**
 * `e-node` directive represent a nodes of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node></e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
var NodeDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-node';
        }
    }
});
var NodePlugin = {
    name: 'e-node',
    install: function (Vue) {
        Vue.component(NodePlugin.name, NodeDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'addInfo', 'annotationTemplate', 'backgroundColor', 'bridgeDirection', 'commandManager', 'connectorDefaults', 'connectors', 'constraints', 'contextMenuSettings', 'customCursor', 'dataSourceSettings', 'diagramSettings', 'drawingObject', 'enableConnectorSplit', 'enablePersistence', 'enableRtl', 'fixedUserHandleTemplate', 'getConnectorDefaults', 'getCustomCursor', 'getCustomProperty', 'getCustomTool', 'getDescription', 'getNodeDefaults', 'height', 'historyManager', 'layers', 'layout', 'locale', 'mode', 'nodeDefaults', 'nodeTemplate', 'nodes', 'pageSettings', 'rulerSettings', 'scrollSettings', 'segmentThumbShape', 'segmentThumbSize', 'selectedItems', 'serializationSettings', 'setNodeTemplate', 'snapSettings', 'tool', 'tooltip', 'updateSelection', 'userHandleTemplate', 'width', 'animationComplete', 'click', 'collectionChange', 'commandExecute', 'connectionChange', 'contextMenuBeforeItemRender', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataLoaded', 'doubleClick', 'dragEnter', 'dragLeave', 'dragOver', 'drop', 'elementDraw', 'expandStateChange', 'fixedUserHandleClick', 'historyChange', 'historyStateChange', 'keyDown', 'keyUp', 'layoutUpdated', 'load', 'loaded', 'mouseEnter', 'mouseLeave', 'mouseOver', 'mouseWheel', 'onFixedUserHandleMouseDown', 'onFixedUserHandleMouseEnter', 'onFixedUserHandleMouseLeave', 'onFixedUserHandleMouseUp', 'onImageLoad', 'onUserHandleMouseDown', 'onUserHandleMouseEnter', 'onUserHandleMouseLeave', 'onUserHandleMouseUp', 'positionChange', 'propertyChange', 'rotateChange', 'scrollChange', 'segmentChange', 'segmentCollectionChange', 'selectionChange', 'sizeChange', 'sourcePointChange', 'targetPointChange', 'textEdit'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents vue Diagram Component
 * ```html
 * <ejs-diagram></ejs-diagram>
 * ```
 */
var DiagramComponent = vueDefineComponent({
    name: 'DiagramComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instance: new Diagram({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-layers": "e-layer", "e-cursormaps": "e-cursormap", "e-connectors": { "e-connector": { "e-connector-fixeduserhandles": "e-connector-fixeduserhandle", "e-connector-annotations": "e-connector-annotation" } }, "e-nodes": { "e-node": { "e-node-fixeduserhandles": "e-node-fixeduserhandle", "e-node-annotations": "e-node-annotation", "e-node-ports": "e-node-port" } } },
            tagNameMapper: { "e-cursormaps": "e-customCursor", "e-connector-fixeduserhandles": "e-fixedUserHandles", "e-connector-annotations": "e-annotations", "e-node-fixeduserhandles": "e-fixedUserHandles", "e-node-annotations": "e-annotations", "e-node-ports": "e-ports" },
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
        add: function (obj, group) {
            return this.ej2Instances.add(obj, group);
        },
        addChildToGroup: function (group, child) {
            return this.ej2Instances.addChildToGroup(group, child);
        },
        addChildToUmlNode: function (node, child, umlChildType) {
            return this.ej2Instances.addChildToUmlNode(node, child, umlChildType);
        },
        addConnector: function (obj) {
            return this.ej2Instances.addConnector(obj);
        },
        addConnectorLabels: function (obj, labels) {
            return this.ej2Instances.addConnectorLabels(obj, labels);
        },
        addConstraints: function (constraintsType, constraintsValue) {
            return this.ej2Instances.addConstraints(constraintsType, constraintsValue);
        },
        addCustomHistoryEntry: function (entry) {
            return this.ej2Instances.addCustomHistoryEntry(entry);
        },
        addElements: function (obj) {
            return this.ej2Instances.addElements(obj);
        },
        addHistoryEntry: function (entry, sourceId) {
            return this.ej2Instances.addHistoryEntry(entry, sourceId);
        },
        addLabels: function (obj, labels) {
            return this.ej2Instances.addLabels(obj, labels);
        },
        addLanes: function (node, lane, index) {
            return this.ej2Instances.addLanes(node, lane, index);
        },
        addLayer: function (layer, layerObject) {
            return this.ej2Instances.addLayer(layer, layerObject);
        },
        addNode: function (obj, group) {
            return this.ej2Instances.addNode(obj, group);
        },
        addNodeLabels: function (obj, labels) {
            return this.ej2Instances.addNodeLabels(obj, labels);
        },
        addNodeToLane: function (node, swimLane, lane) {
            return this.ej2Instances.addNodeToLane(node, swimLane, lane);
        },
        addPhases: function (node, phases) {
            return this.ej2Instances.addPhases(node, phases);
        },
        addPorts: function (obj, ports) {
            return this.ej2Instances.addPorts(obj, ports);
        },
        addProcess: function (process, parentId) {
            return this.ej2Instances.addProcess(process, parentId);
        },
        addTextAnnotation: function (annotation, node) {
            return this.ej2Instances.addTextAnnotation(annotation, node);
        },
        align: function (option, objects, type) {
            return this.ej2Instances.align(option, objects, type);
        },
        bringIntoView: function (bound) {
            return this.ej2Instances.bringIntoView(bound);
        },
        bringLayerForward: function (layerName) {
            return this.ej2Instances.bringLayerForward(layerName);
        },
        bringToCenter: function (bound) {
            return this.ej2Instances.bringToCenter(bound);
        },
        bringToFront: function () {
            return this.ej2Instances.bringToFront();
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        clearHistory: function () {
            return this.ej2Instances.clearHistory();
        },
        clearSelection: function () {
            return this.ej2Instances.clearSelection();
        },
        cloneLayer: function (layerName) {
            return this.ej2Instances.cloneLayer(layerName);
        },
        copy: function () {
            return this.ej2Instances.copy();
        },
        cut: function () {
            return this.ej2Instances.cut();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        distribute: function (option, objects) {
            return this.ej2Instances.distribute(option, objects);
        },
        doLayout: function () {
            return this.ej2Instances.doLayout();
        },
        drag: function (obj, tx, ty) {
            return this.ej2Instances.drag(obj, tx, ty);
        },
        dragSourceEnd: function (obj, tx, ty) {
            return this.ej2Instances.dragSourceEnd(obj, tx, ty);
        },
        dragTargetEnd: function (obj, tx, ty) {
            return this.ej2Instances.dragTargetEnd(obj, tx, ty);
        },
        editSegment: function (editOptions) {
            return this.ej2Instances.editSegment(editOptions);
        },
        endGroupAction: function () {
            return this.ej2Instances.endGroupAction();
        },
        exportDiagram: function (options) {
            return this.ej2Instances.exportDiagram(options);
        },
        exportImage: function (image, options) {
            return this.ej2Instances.exportImage(image, options);
        },
        findElementUnderMouse: function (obj, position, diagram, padding) {
            return this.ej2Instances.findElementUnderMouse(obj, position, diagram, padding);
        },
        findObjectUnderMouse: function (objects, action, inAction) {
            return this.ej2Instances.findObjectUnderMouse(objects, action, inAction);
        },
        findObjectsUnderMouse: function (position, source) {
            return this.ej2Instances.findObjectsUnderMouse(position, source);
        },
        findTargetObjectUnderMouse: function (objects, action, inAction, position, source) {
            return this.ej2Instances.findTargetObjectUnderMouse(objects, action, inAction, position, source);
        },
        fitToPage: function (options) {
            return this.ej2Instances.fitToPage(options);
        },
        getActiveLayer: function () {
            return this.ej2Instances.getActiveLayer();
        },
        getConnectorObject: function (id) {
            return this.ej2Instances.getConnectorObject(id);
        },
        getCursor: function (action, active) {
            return this.ej2Instances.getCursor(action, active);
        },
        getDiagramAction: function (diagramAction) {
            return this.ej2Instances.getDiagramAction(diagramAction);
        },
        getDiagramBounds: function () {
            return this.ej2Instances.getDiagramBounds();
        },
        getDiagramContent: function (styleSheets) {
            return this.ej2Instances.getDiagramContent(styleSheets);
        },
        getEdges: function (args) {
            return this.ej2Instances.getEdges(args);
        },
        getHistoryStack: function (isUndoStack) {
            return this.ej2Instances.getHistoryStack(isUndoStack);
        },
        getNodeObject: function (id) {
            return this.ej2Instances.getNodeObject(id);
        },
        getObject: function (name) {
            return this.ej2Instances.getObject(name);
        },
        getParentId: function (id) {
            return this.ej2Instances.getParentId(id);
        },
        getTool: function (action) {
            return this.ej2Instances.getTool(action);
        },
        group: function () {
            return this.ej2Instances.group();
        },
        hideTooltip: function (obj) {
            return this.ej2Instances.hideTooltip(obj);
        },
        insertData: function (node) {
            return this.ej2Instances.insertData(node);
        },
        loadDiagram: function (data, isEJ1Data) {
            return this.ej2Instances.loadDiagram(data, isEJ1Data);
        },
        loadDiagramFromMermaid: function (data) {
            return this.ej2Instances.loadDiagramFromMermaid(data);
        },
        moveForward: function () {
            return this.ej2Instances.moveForward();
        },
        moveObjects: function (objects, targetLayer) {
            return this.ej2Instances.moveObjects(objects, targetLayer);
        },
        moveObjectsUp: function (node, currentLayer) {
            return this.ej2Instances.moveObjectsUp(node, currentLayer);
        },
        nudge: function (direction, x, y, type) {
            return this.ej2Instances.nudge(direction, x, y, type);
        },
        pan: function (horizontalOffset, verticalOffset, focusedPoint, isInteractiveZoomPan) {
            return this.ej2Instances.pan(horizontalOffset, verticalOffset, focusedPoint, isInteractiveZoomPan);
        },
        paste: function (obj) {
            return this.ej2Instances.paste(obj);
        },
        print: function (options) {
            return this.ej2Instances.print(options);
        },
        printImage: function (image, options) {
            return this.ej2Instances.printImage(image, options);
        },
        redo: function () {
            return this.ej2Instances.redo();
        },
        remove: function (obj) {
            return this.ej2Instances.remove(obj);
        },
        removeChildFromGroup: function (group, child) {
            return this.ej2Instances.removeChildFromGroup(group, child);
        },
        removeConstraints: function (constraintsType, constraintsValue) {
            return this.ej2Instances.removeConstraints(constraintsType, constraintsValue);
        },
        removeData: function (node) {
            return this.ej2Instances.removeData(node);
        },
        removeLabels: function (obj, labels) {
            return this.ej2Instances.removeLabels(obj, labels);
        },
        removeLane: function (node, lane) {
            return this.ej2Instances.removeLane(node, lane);
        },
        removeLayer: function (layerId) {
            return this.ej2Instances.removeLayer(layerId);
        },
        removePhase: function (node, phase) {
            return this.ej2Instances.removePhase(node, phase);
        },
        removePorts: function (obj, ports) {
            return this.ej2Instances.removePorts(obj, ports);
        },
        removeProcess: function (id) {
            return this.ej2Instances.removeProcess(id);
        },
        reset: function () {
            return this.ej2Instances.reset();
        },
        resetSegments: function () {
            return this.ej2Instances.resetSegments();
        },
        rotate: function (obj, angle, pivot, rotateUsingHandle) {
            return this.ej2Instances.rotate(obj, angle, pivot, rotateUsingHandle);
        },
        sameSize: function (option, objects) {
            return this.ej2Instances.sameSize(option, objects);
        },
        saveDiagram: function () {
            return this.ej2Instances.saveDiagram();
        },
        saveDiagramAsMermaid: function () {
            return this.ej2Instances.saveDiagramAsMermaid();
        },
        scale: function (obj, sx, sy, pivot) {
            return this.ej2Instances.scale(obj, sx, sy, pivot);
        },
        select: function (objects, multipleSelection, oldValue) {
            return this.ej2Instances.select(objects, multipleSelection, oldValue);
        },
        selectAll: function () {
            return this.ej2Instances.selectAll();
        },
        sendBackward: function () {
            return this.ej2Instances.sendBackward();
        },
        sendLayerBackward: function (layerName) {
            return this.ej2Instances.sendLayerBackward(layerName);
        },
        sendToBack: function () {
            return this.ej2Instances.sendToBack();
        },
        setActiveLayer: function (layerName) {
            return this.ej2Instances.setActiveLayer(layerName);
        },
        setStackLimit: function (stackLimit) {
            return this.ej2Instances.setStackLimit(stackLimit);
        },
        showTooltip: function (obj) {
            return this.ej2Instances.showTooltip(obj);
        },
        startGroupAction: function () {
            return this.ej2Instances.startGroupAction();
        },
        startTextEdit: function (node, id) {
            return this.ej2Instances.startTextEdit(node, id);
        },
        unGroup: function () {
            return this.ej2Instances.unGroup();
        },
        unSelect: function (obj) {
            return this.ej2Instances.unSelect(obj);
        },
        undo: function () {
            return this.ej2Instances.undo();
        },
        updateData: function (node) {
            return this.ej2Instances.updateData(node);
        },
        updateViewPort: function () {
            return this.ej2Instances.updateViewPort();
        },
        zoom: function (factor, focusedPoint) {
            return this.ej2Instances.zoom(factor, focusedPoint);
        },
        zoomTo: function (options) {
            return this.ej2Instances.zoomTo(options);
        },
    }
});
var DiagramPlugin = {
    name: 'ejs-diagram',
    install: function (Vue) {
        Vue.component(DiagramPlugin.name, DiagramComponent);
        Vue.component(LayerPlugin.name, LayerDirective);
        Vue.component(LayersPlugin.name, LayersDirective);
        Vue.component(CustomCursorPlugin.name, CustomCursorDirective);
        Vue.component(CustomCursorsPlugin.name, CustomCursorsDirective);
        Vue.component(ConnectorPlugin.name, ConnectorDirective);
        Vue.component(ConnectorsPlugin.name, ConnectorsDirective);
        Vue.component(ConnectorFixedUserHandlePlugin.name, ConnectorFixedUserHandleDirective);
        Vue.component(ConnectorFixedUserHandlesPlugin.name, ConnectorFixedUserHandlesDirective);
        Vue.component(ConnectorAnnotationPlugin.name, ConnectorAnnotationDirective);
        Vue.component(ConnectorAnnotationsPlugin.name, ConnectorAnnotationsDirective);
        Vue.component(NodePlugin.name, NodeDirective);
        Vue.component(NodesPlugin.name, NodesDirective);
        Vue.component(NodeFixedUserHandlePlugin.name, NodeFixedUserHandleDirective);
        Vue.component(NodeFixedUserHandlesPlugin.name, NodeFixedUserHandlesDirective);
        Vue.component(NodeAnnotationPlugin.name, NodeAnnotationDirective);
        Vue.component(NodeAnnotationsPlugin.name, NodeAnnotationsDirective);
        Vue.component(PortPlugin.name, PortDirective);
        Vue.component(PortsPlugin.name, PortsDirective);
    }
};

var PalettesDirective = vueDefineComponent({
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
            return 'e-palettes';
        }
    }
});
var PalettesPlugin = {
    name: 'e-palettes',
    install: function (Vue) {
        Vue.component(PalettesPlugin.name, PalettesDirective);
    }
};
/**
 * `Palette` directive represent a axis palette of the vue SymbolPalette.
 * It must be contained in a SymbolPalette component(`SymbolPaletteComponent`).
 * ```html
 * <e-palettes><e-palette></e-palette><e-palettes>
 * ```
 */
var PaletteDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-palette';
        }
    }
});
var PalettePlugin = {
    name: 'e-palette',
    install: function (Vue) {
        Vue.component(PalettePlugin.name, PaletteDirective);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'accessKey', 'allowDrag', 'connectorDefaults', 'enableAnimation', 'enablePersistence', 'enableRtl', 'enableSearch', 'expandMode', 'filterSymbols', 'getConnectorDefaults', 'getNodeDefaults', 'getSymbolInfo', 'getSymbolTemplate', 'height', 'ignoreSymbolsOnSearch', 'locale', 'nodeDefaults', 'palettes', 'symbolDragSize', 'symbolHeight', 'symbolInfo', 'symbolMargin', 'symbolPreview', 'symbolWidth', 'width', 'paletteExpanding', 'paletteSelectionChange'];
var modelProps$1 = [];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * Represents vue SymbolPalette Component
 * ```html
 * <ej-symbol-palette></ej-symbol-palette>
 * ```
 */
var SymbolPaletteComponent = vueDefineComponent({
    name: 'SymbolPaletteComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new SymbolPalette({}),
            propKeys: properties$1,
            models: modelProps$1,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-palettes": "e-palette" },
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
        addPaletteItem: function (paletteName, paletteSymbol, isChild) {
            return this.ej2Instances.addPaletteItem(paletteName, paletteSymbol, isChild);
        },
        addPalettes: function (palettes) {
            return this.ej2Instances.addPalettes(palettes);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        removePaletteItem: function (paletteName, symbolId) {
            return this.ej2Instances.removePaletteItem(paletteName, symbolId);
        },
        removePalettes: function (palettes) {
            return this.ej2Instances.removePalettes(palettes);
        },
    }
});
var SymbolPalettePlugin = {
    name: 'ejs-symbolpalette',
    install: function (Vue) {
        Vue.component(SymbolPalettePlugin.name, SymbolPaletteComponent);
        Vue.component(PalettePlugin.name, PaletteDirective);
        Vue.component(PalettesPlugin.name, PalettesDirective);
    }
};

var properties$2 = ['isLazyUpdate', 'plugins', 'enablePersistence', 'enableRtl', 'height', 'locale', 'sourceID', 'width', 'created'];
var modelProps$2 = [];
var testProp$2 = getProps({ props: properties$2 });
var props$2 = testProp$2[0], watch$2 = testProp$2[1], emitProbs$2 = Object.keys(watch$2);
emitProbs$2.push('modelchanged', 'update:modelValue');
for (var _i$2 = 0, modelProps_1$2 = modelProps$2; _i$2 < modelProps_1$2.length; _i$2++) {
    var props_1$2 = modelProps_1$2[_i$2];
    emitProbs$2.push('update:' + props_1$2);
}
/**
 * Represents vue Overview Component
 * ```html
 * <ej-overview></ej-overview>
 * ```
 */
var OverviewComponent = vueDefineComponent({
    name: 'OverviewComponent',
    mixins: [ComponentBase],
    props: props$2,
    watch: watch$2,
    emits: emitProbs$2,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Overview({}),
            propKeys: properties$2,
            models: modelProps$2,
            hasChildDirective: true,
            hasInjectedModules: false,
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
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        updateHtmlLayer: function (view) {
            return this.ej2Instances.updateHtmlLayer(view);
        },
    }
});
var OverviewPlugin = {
    name: 'ejs-overview',
    install: function (Vue) {
        Vue.component(OverviewPlugin.name, OverviewComponent);
    }
};

export { ConnectorAnnotationDirective, ConnectorAnnotationPlugin, ConnectorAnnotationsDirective, ConnectorAnnotationsPlugin, ConnectorDirective, ConnectorFixedUserHandleDirective, ConnectorFixedUserHandlePlugin, ConnectorFixedUserHandlesDirective, ConnectorFixedUserHandlesPlugin, ConnectorPlugin, ConnectorsDirective, ConnectorsPlugin, CustomCursorDirective, CustomCursorPlugin, CustomCursorsDirective, CustomCursorsPlugin, DiagramComponent, DiagramPlugin, LayerDirective, LayerPlugin, LayersDirective, LayersPlugin, NodeAnnotationDirective, NodeAnnotationPlugin, NodeAnnotationsDirective, NodeAnnotationsPlugin, NodeDirective, NodeFixedUserHandleDirective, NodeFixedUserHandlePlugin, NodeFixedUserHandlesDirective, NodeFixedUserHandlesPlugin, NodePlugin, NodesDirective, NodesPlugin, OverviewComponent, OverviewPlugin, PaletteDirective, PalettePlugin, PalettesDirective, PalettesPlugin, PortDirective, PortPlugin, PortsDirective, PortsPlugin, SymbolPaletteComponent, SymbolPalettePlugin };
//# sourceMappingURL=ej2-vue-diagrams.es5.js.map
