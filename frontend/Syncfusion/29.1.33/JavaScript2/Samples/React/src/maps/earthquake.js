"use strict";
/**
 * Earthquake sample
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
exports.EarthquakeMaps = void 0;
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var asiaMap = require("./map-data/asia.json");
var SAMPLE_CSS = "\n.pulse-css {\n    width: 20px;\n    height: 20px;\n    -webkit-border-radius: 20px;\n    -moz-border-radius: 20px;\n    border-radius: 20px;\n    background:#E94430;\n    position: relative;\n  }\n  .pulse-container {\n    width: 20px;\n    height: 20px;\n  }\n  .pulse-css:before, .pulse-css:after {\n    content: '';\n    width: 20px;\n    height: 20px;\n    -webkit-border-radius: 20px;\n    -moz-border-radius: 20px;\n    border-radius: 20px;\n    background-color: #E94430;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    transform: scale(0.5);\n    transform-origin: center center;\n    animation: pulse-me 3s linear infinite;\n  }\n  .pulse-css:after {\n    animation-delay: 2s;\n  }\n  @keyframes pulse-me {\n    0% {\n      transform: scale(0.5);\n      opacity: 0;\n    }\n    50% {\n      opacity: 0.3;\n    }\n    70% {\n      opacity: 0.1;\n    }\n    100% {\n      transform: scale(5);\n      opacity: 0;\n    }\n  }\n  \n    ";
var marketTemp = '<div> <div class="pulse-container"><div class="pulse-box"><div class="pulse-css"></div></div></div></div>';
var EarthquakeMaps = /** @class */ (function (_super) {
    __extends(EarthquakeMaps, _super);
    function EarthquakeMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EarthquakeMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-md-12' },
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                                enable: false,
                                zoomFactor: 7
                            }, mapsArea: {
                                background: '#AEE2FA'
                            }, titleSettings: {
                                text: '7.6 Magnitude earthquake strikes Sumatra - 2009',
                                textStyle: {
                                    size: '18px'
                                }
                            }, centerPosition: {
                                latitude: 0.720,
                                longitude: 99.867
                            } },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: asiaMap, shapePropertyPath: 'name', shapeDataPath: 'name', shapeSettings: {
                                        fill: '#FFFDCF',
                                        border: {
                                            color: '#3497C3',
                                            width: 0.5
                                        }
                                    } },
                                    React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                        React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 100, width: 100, animationDuration: 0, template: marketTemp, dataSource: [{
                                                    latitude: 0.720, longitude: 99.867
                                                }] })))))),
                    React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                        "Source:",
                        React.createElement("a", { href: "https://en.wikipedia.org/wiki/2009_Sumatra_earthquakes", target: "_blank" }, "en.wikipedia.org")))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample demonstrates the earth quack occurred in Sumatra, Indonesia in the year 2009.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render a custom HTML element as marker and place it on a specific location."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use marker template, you need to inject ",
                    React.createElement("code", null, "Marker"),
                    " module using ",
                    React.createElement("code", null, "Maps.Inject(Marker)"),
                    " method."))));
    };
    EarthquakeMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    EarthquakeMaps.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    return EarthquakeMaps;
}(sample_base_1.SampleBase));
exports.EarthquakeMaps = EarthquakeMaps;
