"use strict";
/**
 * Marker sample
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
exports.MarkerMaps = void 0;
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/top-population.json");
var worldMap = require("./map-data/world-map.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    tr {\n        height: 50px;\n    }";
var MarkerMaps = /** @class */ (function (_super) {
    __extends(MarkerMaps, _super);
    function MarkerMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Code for Property Panel
    MarkerMaps.prototype.shapeChange = function (args) {
        if (args.checked) {
            this.mapInstance.layers[0].markerSettings[0].shapeValuePath = 'shape';
        }
        else {
            this.mapInstance.layers[0].markerSettings[0].shapeValuePath = null;
        }
        this.mapInstance.refresh();
    };
    MarkerMaps.prototype.colorChange = function (args) {
        if (args.checked) {
            this.mapInstance.layers[0].markerSettings[0].colorValuePath = 'color';
        }
        else {
            this.mapInstance.layers[0].markerSettings[0].colorValuePath = null;
        }
        this.mapInstance.refresh();
    };
    MarkerMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-md-9' },
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, useGroupingSeparator: true, format: "n", zoomSettings: {
                                enable: false
                            }, titleSettings: {
                                text: 'Top 25 populated cities in the world',
                                textStyle: {
                                    size: '16px'
                                }
                            } },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'name', shapeDataPath: 'Country', dataSource: datasource.population, shapeSettings: {
                                        fill: '#C3E6ED'
                                    } },
                                    React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                        React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, shape: 'Circle', fill: 'white', width: 10, border: {
                                                color: '#285255',
                                                width: 2
                                            }, dataSource: datasource.population, tooltipSettings: {
                                                template: '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
                                                    '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' +
                                                    '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                                                    '<div><span style="font-size:13px;color:#cccccc">Country : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Country}</span></div>' +
                                                    '<div><span style="font-size:13px;color:#cccccc">Continent : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Continent}</span></div>' +
                                                    '<div><span style="font-size:13px;color:#cccccc">Population : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${population}</span></div></div>',
                                                visible: true,
                                                valuePath: 'population'
                                            } }))))),
                        React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                            "Source:",
                            React.createElement("a", { href: "http://www.citymayors.com/statistics/largest-cities-population-125.html", target: "_blank" }, "www.citymayors.com"))),
                    React.createElement("div", { className: 'col-lg-3 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px', marginTop: '10px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: {} },
                                        React.createElement("td", { style: { width: "70%" } },
                                            React.createElement("div", { className: "property-text", style: { padding: '0px' } }, "Bind markers shape from data source")),
                                        React.createElement("td", { style: { width: "30%" } },
                                            React.createElement("div", { className: "col", style: { paddingTop: '0px', marginTop: '-10px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "shapeCheckBox", change: this.shapeChange.bind(this) })))),
                                    React.createElement("tr", { style: {} },
                                        React.createElement("td", { style: { width: "70%" } },
                                            React.createElement("div", { className: "property-text", style: { padding: '0px' } }, "Bind markers color from data source")),
                                        React.createElement("td", { style: { width: "30%" } },
                                            React.createElement("div", { className: "col", style: { paddingTop: '0px', marginTop: '-10px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "colorCheckBox", change: this.colorChange.bind(this) })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample visualizes the top 25 populated cities in the world by displaying the markers in their locations.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render the markers in a map. Markers are used to indicate or mark a particular location on the map with desired symbols. Also, options have been provided to bind the shapes and colors to the markers based on the continent from the data source. This is achieved using the ",
                    React.createElement("code", null, "shapeValuePath"),
                    " and ",
                    React.createElement("code", null, "colorValuePath"),
                    " properties of the marker."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a data label, inject the ",
                    React.createElement("code", null, "Marker"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    MarkerMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    MarkerMaps.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    return MarkerMaps;
}(sample_base_1.SampleBase));
exports.MarkerMaps = MarkerMaps;
