"use strict";
/**
 * Marker Template sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var australia = require("./map-data/australia.json");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var marker = [
    { weather: 'clear', Name: 'Perth', latitude: -31.950527, longitude: 115.860457, Temperature: 31.6 },
    { weather: 'clouds', Name: 'Adelaide', latitude: -34.928499, longitude: 138.600746, Temperature: 29 },
    { weather: 'clear', Name: 'Townsville', latitude: -19.2589635, longitude: 146.8169483, Temperature: 31.3 },
    { weather: 'rain', Name: 'Sydney', latitude: -33.868820, longitude: 151.209296, Temperature: 26.4 },
    { weather: 'clear', Name: 'Alice Springs', latitude: -23.698042, longitude: 133.880747, Temperature: 36.4 },
    { weather: 'clouds', Name: 'Brisbane', latitude: -27.469771, longitude: 153.025124, Temperature: 29.1 }
];
var MarkerTemplateMaps = function () {
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
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: onMapsLoad, load: load, zoomSettings: { enable: false }, titleSettings: { text: ' Australia cities weather details', textStyle: { size: '16px' } } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: australia, tooltipSettings: { visible: false }, shapeSettings: { autofill: true, palette: ['#E2B247', '#88DB46', '#42C4E2', '#C08AF8', '#52BACC', '#F4CE2F', '#6986ED'], border: { width: 0.5, color: 'white' } } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 30, width: 30, template: '<div id="marker1"><img style="height:30px;width:30px;display:block;  margin: auto;" src="src/maps/images/weather-clear.png" alt="Weather clear" /><p>{{:Name}}:{{:Temperature}}\u00B0C</p></div>', dataSource: [marker[0]] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 30, width: 30, template: '<div id="marker1"><img style="height:30px;width:30px;display:block;  margin: auto;" src="src/maps/images/weather-clouds.png" alt="Weather cloud"/><p>{{:Name}}:{{:Temperature}}\u00B0C</p></div>', dataSource: [marker[1]] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 30, width: 30, template: '<div id="marker1"><img style="height:30px;width:30px;display:block;  margin: auto;" src="src/maps/images/weather-clear.png" alt="Weather clear"/><p>{{:Name}}:{{:Temperature}}\u00B0C</p></div>', dataSource: [marker[2]] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 30, width: 30, template: '<div id="marker1"><img style="height:30px;width:30px;display:block;  margin: auto;" src="src/maps/images/weather-rain.png" alt="Weather rain"/><p>{{:Name}}:{{:Temperature}}\u00B0C</p></div>', dataSource: [marker[3]] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 30, width: 30, template: '<div id="marker1"><img style="height:30px;width:30px;display:block;  margin: auto;" src="src/maps/images/weather-clear.png" alt="Weather clear"/><p>{{:Name}}:{{:Temperature}}\u00B0C</p></div>', dataSource: [marker[4]] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, height: 30, width: 30, template: '<div id="marker1"><img style="height:30px;width:30px;display:block;  margin: auto;" src="src/maps/images/weather-clouds.png" alt="Weather cloud"/><p>{{:Name}}:{{:Temperature}}\u00B0C</p></div>', dataSource: [marker[5]] })))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample indicates the temperature of various cities of Australia in marker templates.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to place a template as a marker in the map. Any custom HTML elements can be used as a marker. You can use the autoFill property in the shapeSettings to apply the default palette colors to the shapes."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use a marker template, inject the Marker module using the Maps.Inject(Marker) method."))));
};
exports.default = MarkerTemplateMaps;
