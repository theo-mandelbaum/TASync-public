"use strict";
/**
 * Programmatic Zoom sample
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
exports.ProgrammaticZoomMaps = void 0;
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var worldMap = require("./map-data/world-map.json");
var data = require("./map-data/southamerica-country-capitals.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var ProgrammaticZoomMaps = /** @class */ (function (_super) {
    __extends(ProgrammaticZoomMaps, _super);
    function ProgrammaticZoomMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Code for Property Panel
    ProgrammaticZoomMaps.prototype.zoomChange = function (args) {
        this.mapInstance.zoomSettings.shouldZoomInitially = args.checked;
        this.mapInstance.refresh();
    };
    ProgrammaticZoomMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-md-9' },
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, ref: function (m) { return _this.mapInstance = m; }, useGroupingSeparator: true, format: "n", zoomSettings: {
                                enable: true,
                                mouseWheelZoom: false,
                                pinchZooming: false
                            }, titleSettings: {
                                text: 'Capitals of South American countries',
                                textStyle: {
                                    size: '16px'
                                }
                            } },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'name', shapeDataPath: 'Country', dataSource: datasource.southAmericaCountryCapitals, shapeSettings: {
                                        fill: '#C3E6ED',
                                        border: {
                                            color: 'black',
                                            width: .3
                                        }
                                    } },
                                    React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                        React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, height: 20, width: 20, shape: 'Image', imageUrl: 'src/maps/images/ballon.png', dataSource: datasource.southAmericaCountryCapitals, tooltipSettings: {
                                                format: '<b>Capital</b> : ${name}<br><b>Country</b> : ${Country}',
                                                visible: true,
                                                valuePath: 'name'
                                            } }))))),
                        React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                            "Source:",
                            React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_South_America#Sovereign_states", target: "_blank" }, "www.wikipedia.com"))),
                    React.createElement("div", { className: 'col-lg-3 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px', marginLeft: '-10px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: "50px" } },
                                        React.createElement("td", { style: { width: "70%" } },
                                            React.createElement("div", { className: "property-text" }, "Zoom to fit all the makers in maps")),
                                        React.createElement("td", { style: { width: "20%" } },
                                            React.createElement("div", { className: "col", style: { paddingTop: '5px', marginTop: '-3px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "zoomCheckBox", change: this.zoomChange.bind(this) })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample visualizes the capitals of all the countries in the South America continent by displaying the markers in their locations.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to zoom the maps dynamically based on the location of the markers in the map. The map is scaled and the center position is changed based on the markers location. This is achieved by setting true to the ",
                    React.createElement("code", null, "shouldZoomInitially"),
                    " property in ",
                    React.createElement("code", null, "zoomSettings"),
                    "."),
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
    ProgrammaticZoomMaps.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    return ProgrammaticZoomMaps;
}(sample_base_1.SampleBase));
exports.ProgrammaticZoomMaps = ProgrammaticZoomMaps;
