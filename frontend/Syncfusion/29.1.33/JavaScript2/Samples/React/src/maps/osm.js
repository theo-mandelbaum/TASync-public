"use strict";
/**
 * OSM sample
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
exports.OSMMaps = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
(0, ej2_base_1.enableRipple)(true);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var OSMMaps = /** @class */ (function (_super) {
    __extends(OSMMaps, _super);
    function OSMMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data1 = [
            {
                name: 'Manhattan, New York, USA',
                latitude: 40.7488758,
                longitude: -73.9730091
            },
        ];
        return _this;
    }
    OSMMaps.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-md-12' },
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, titleSettings: {
                                text: 'Headquarters of the United Nations',
                                textStyle: {
                                    size: '16px'
                                }
                            }, centerPosition: {
                                latitude: 40.7209,
                                longitude: -73.9680
                            }, zoomSettings: {
                                zoomFactor: 9,
                                enable: false
                            } },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Bubble, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { urlTemplate: "https://tile.openstreetmap.org/level/tileX/tileY.png", animationDuration: 0 },
                                    React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                        React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img alt="Balloon image" src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>', dataSource: this.data1, tooltipSettings: {
                                                visible: true,
                                                valuePath: 'name'
                                            } }))))))),
                React.createElement("div", { style: { float: 'right' } },
                    React.createElement("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank" }, "\u00A9 OpenStreetMap contributors")),
                React.createElement("br", null),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Headquarters_of_the_United_Nations", target: "_blank" }, "en.wikipedia.org"))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample visualizes the location of United Nations Headquarters in the OpenStreetMap with marker.Tooltip is displayed for marker.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render the OpenStreetMap. Denoted the location of United Nations Headquarters using marker. EJ2 Dialog is displayed on the top of the marker. Also enabled zooming feature to zoom and pan the map for detailed analysis."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method and zoom module using ",
                    React.createElement("code", null, "maps.Inject(Zoom)"),
                    " method."))));
    };
    OSMMaps.prototype.load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    return OSMMaps;
}(sample_base_1.SampleBase));
exports.OSMMaps = OSMMaps;
