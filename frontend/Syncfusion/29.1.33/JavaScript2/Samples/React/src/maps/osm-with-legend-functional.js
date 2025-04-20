"use strict";
/**
 * OSM with legend sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var OSMLegend = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var markerData = [
        { name: 'Tokyo', latitude: 35.6805245924747, longitude: 139.76770396213337, population: 37435191, color: '#2EB6C8' },
        { name: 'Delhi', latitude: 28.6448, longitude: 77.216721, population: 29399141, color: '#4A97F4' },
        { name: 'Shanghai', latitude: 31.224361, longitude: 121.46917, population: 26317104, color: '#498082' },
        { name: 'Sao Paulo', latitude: -23.550424484747914, longitude: -46.646471636488315, population: 21846507, color: '#FB9E67' },
        { name: 'Mexico City', latitude: 19.427402397418774, longitude: -99.131123716666, population: 21671908, color: '#8F9DE3' },
        { name: 'Cairo ', latitude: 30.033333, longitude: 31.233334, population: 20484965, color: '#7B9FB0' },
        { name: 'Dhaka', latitude: 23.777176, longitude: 90.399452, population: 20283552, color: '#4DB647' },
        { name: 'Mumbai', latitude: 19.08492049646163, longitude: 72.87449446319248, population: 20185064, color: '#30BEFF' },
        { name: 'Beijing', latitude: 39.90395970055848, longitude: 116.38831272088059, population: 20035455, color: '#Ac72AD' },
        { name: 'Osaka', latitude: 34.69024500601642, longitude: 135.50746225677142, population: 19222665, color: '#EFE23E' },
    ];
    var load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: load, useGroupingSeparator: true, format: "n", titleSettings: { text: 'Top 10 populated cities in the World', textStyle: { size: '16px', fontFamily: 'inherit' } }, legendSettings: { visible: true, position: 'Float', location: { x: 10, y: 262 }, textStyle: { color: '#000000', fontFamily: 'inherit' }, height: '170px', type: 'Markers', background: '#E6E6E6' }, zoomSettings: { zoomFactor: 2, enable: true } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { urlTemplate: "https://tile.openstreetmap.org/level/tileX/tileY.png" },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', legendText: 'name', height: 15, width: 15, colorValuePath: 'color', tooltipSettings: { visible: true, valuePath: 'population', format: 'City Name: ${name} <br> Population: ${population} million', textStyle: { fontFamily: 'inherit' } }, dataSource: markerData })))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample illustrates the world's top 10 most populated cities by displaying markers in their locations and legend with the city names.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to display markers and a legend on the OpenStreetMap. To enable the legend, set the ",
                React.createElement("code", null, "visible"),
                " property in ",
                React.createElement("code", null, "legendSettings"),
                " to ",
                React.createElement("b", null, "true"),
                ", and then use properties like ",
                React.createElement("code", null, "title"),
                ", ",
                React.createElement("code", null, "position"),
                ", ",
                React.createElement("code", null, "type"),
                ", ",
                React.createElement("code", null, "height"),
                ", ",
                React.createElement("code", null, "width"),
                ", and so on to customize the legend."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "The maps component features are segregated into individual modules by feature. To use markers and a legend, we need to inject the ",
                React.createElement("code", null, "Marker"),
                " and ",
                React.createElement("code", null, "Legend"),
                " module into services."))));
};
exports.default = OSMLegend;
