"use strict";
/**
 * sales map sample
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
exports.SalesMaps = void 0;
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/sales-map.json");
var worldMap = require("./map-data/world-map.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var SalesMaps = /** @class */ (function (_super) {
    __extends(SalesMaps, _super);
    function SalesMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SalesMaps.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, useGroupingSeparator: true, tooltipDisplayMode: "Click", format: "n", zoomSettings: {
                            enable: true,
                            mouseWheelZoom: false,
                            pinchZooming: false
                        }, titleSettings: {
                            text: 'Sales details of products in various countries',
                            textStyle: {
                                size: '16px'
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'name', shapeDataPath: 'Country', dataSource: datasource.salesmap, shapeSettings: {
                                    fill: '#C3E6ED'
                                }, markerClusterSettings: {
                                    allowClustering: true,
                                    allowClusterExpand: true,
                                    shape: 'Image',
                                    height: 40,
                                    width: 40,
                                    labelStyle: { color: 'white' },
                                    imageUrl: 'src/maps/images/cluster.svg'
                                } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, height: 15, width: 15, shape: 'Image', imageUrl: 'src/maps/images/ballon.png', dataSource: datasource.salesmap, tooltipSettings: {
                                            format: '<b>Name</b> : ${name}<br><b>Product</b> : ${product}<br><b>Total value</b> : ${worth}',
                                            visible: true,
                                            valuePath: 'name'
                                        } }))))),
                    React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                        "Source:",
                        React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_South_America#Sovereign_states", target: "_blank" }, "www.wikipedia.com")))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample illustrates the sales details of the products and users location by rendering the markers. Marker clustering is also enabled in this sample.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render cluster for more number of markers if it is at the exact latitude and longitude values. On clicking the cluster, it will gets expanded."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, click the mouse over the marker or tap a marker in touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker and cluster, inject the ",
                    React.createElement("code", null, "Marker"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    SalesMaps.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    return SalesMaps;
}(sample_base_1.SampleBase));
exports.SalesMaps = SalesMaps;
