"use strict";
/**
 * Projection sample
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectionMaps = void 0;
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var data = require("./map-data/projection-datasource.json");
var worldMap = require("./map-data/world-map.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var ProjectionMaps = /** @class */ (function (_super) {
    __extends(ProjectionMaps, _super);
    function ProjectionMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Mercator' },
            { value: 'Equirectangular' },
            { value: 'Miller' },
            { value: 'Eckert3' },
            { value: 'Eckert5' },
            { value: 'Eckert6' },
            { value: 'Winkel3' },
            { value: 'AitOff' }
        ];
        return _this;
    }
    ProjectionMaps.prototype.change = function () {
        this.mapInstance.projectionType = this.dropElement.value;
        this.mapInstance.refresh();
    };
    ProjectionMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-md-8' },
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                                enable: false
                            }, legendSettings: {
                                visible: true
                            }, titleSettings: {
                                text: 'Members of the UN Security Council',
                                textStyle: {
                                    size: '16px'
                                },
                                subtitleSettings: {
                                    text: '- In 2017',
                                    alignment: 'Far'
                                }
                            } },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Zoom, ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'name', shapeDataPath: 'Country', dataSource: datasource.projection, tooltipSettings: {
                                        visible: true,
                                        valuePath: 'Country'
                                    }, shapeSettings: {
                                        fill: '#E5E5E5',
                                        colorMapping: [
                                            {
                                                value: 'Permanent',
                                                color: '#EDB46F'
                                            },
                                            {
                                                color: '#F1931B',
                                                value: 'Non-Permanent'
                                            }
                                        ],
                                        colorValuePath: 'Membership'
                                    } })))),
                    React.createElement("div", { className: 'col-md-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: '-10px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", { style: { width: '60%' } },
                                            React.createElement("div", { style: { marginLeft: '1px' } }, "Projection Type")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginRight: '0px' } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100%", index: 0, change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, placeholder: 'Select projection type' }))))))))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_members_of_the_United_Nations_Security_Council", target: "_blank" }, "en.wikipedia.org"))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample illustrates the details of permanent and non-permanent countries in the UN security council, in 2017. Projection of a map can be changed by using the projection type in properties panel.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render a map with various projections. You can use the ColorMapping property to customize the color of the shapes. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method."))));
    };
    ProjectionMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    ProjectionMaps.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    return ProjectionMaps;
}(sample_base_1.SampleBase));
exports.ProjectionMaps = ProjectionMaps;
