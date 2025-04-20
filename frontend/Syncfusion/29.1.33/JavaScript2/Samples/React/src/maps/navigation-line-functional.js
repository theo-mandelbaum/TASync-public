"use strict";
/**
 * Navigation Line sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data1 = require("./map-data/penisular-marker.json");
var data2 = require("./map-data/penisular-location.json");
var worldMap = require("./map-data/world-map.json");
var datasource1 = data1;
var datasource2 = data2;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #maps_layerIndex_0_line_Group{\n        stroke-dasharray: 10px 10px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 15s linear infinite;\n        animation: dash 15s linear infinite;\n    }\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }";
var NavigationLineMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onMapsLoad = function () {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: onMapsLoad, load: load, zoomSettings: { enable: false, zoomFactor: 10 }, projectionType: 'Equirectangular', titleSettings: { text: 'Shipping sea route between various cities', textStyle: { size: '18px' } }, mapsArea: { background: '#4863A0' }, centerPosition: { latitude: 25.54244147012483, longitude: -89.62646484375 } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.NavigationLine] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapeSettings: { fill: '#789071' }, navigationLineSettings: datasource2.location },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', fill: 'white', width: 10, height: 10, animationDuration: 0, tooltipSettings: { visible: true, valuePath: 'title' }, dataSource: datasource1.marker }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker1" style="font-size: 12px;color:white">ALTAMIRA</div>', dataSource: [{ latitude: 22.403410892712124, longitude: -100.0 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker2" style="font-size: 12px;color:white">HOUSTON</div>', dataSource: [{ latitude: 30.332197482973, longitude: -95.36270141601562 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker3" style="font-size: 12px;color:white">PANAMA CITY</div>', dataSource: [{ latitude: 30.380747605060766, longitude: -85.81283569335938 }], animationDuration: 0, offset: { x: 0, y: -15 } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker4" style="font-size: 12px;color:white">TAMPA</div>', dataSource: [{ latitude: 27.9337540167772, longitude: -81.15908447265625 }], animationDuration: 0 }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div id="marker5" style="font-size: 12px;color:white">PROGRESO</div>', dataSource: [{ latitude: 20.62336521195344, longitude: -89.6649169921875 }], animationDuration: 0 })))))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "http://www.lineaships.com/en/linea-peninsular/", target: "_blank" }, "www.lineaships.com")))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample illustrates the sea routes between various cities for shipping.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render lines between two points in map. You can use ",
                React.createElement("code", null, "dashArray"),
                ", ",
                React.createElement("code", null, "width"),
                " and ",
                React.createElement("code", null, "color"),
                " properties to customize the appearance of the navigation lines."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Maps component features are segregated into individual feature-wise modules. To use navigation lines, you need to inject ",
                React.createElement("code", null, "NavigationLine"),
                " module using ",
                React.createElement("code", null, "Maps.Inject(NavigationLine)"),
                " method"))));
};
exports.default = NavigationLineMaps;
