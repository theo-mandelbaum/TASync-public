"use strict";
/**
 * HeatMap sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/heatmap-datasource.json");
var indiaMap = require("./map-data/india.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var colormapping = [
    {
        from: 60000,
        to: 400000,
        color: '#9fdfdf',
        label: '<0.4M',
    },
    {
        from: 400000,
        to: 10000000,
        color: '#79d2d2',
        label: '0.4-10M',
    },
    {
        from: 10000000,
        to: 20000000,
        color: '#53C6C6',
        label: '10-20M',
    },
    {
        from: 20000000,
        to: 70000000,
        color: '#39acac',
        label: '20-70M',
    },
    {
        from: 70000000,
        to: 100000000,
        color: '#339999',
        label: '70-100M',
    },
    {
        from: 100000000,
        to: 200000000,
        color: '#2d8686',
        label: '>100M',
    },
];
var HeatMaps = function () {
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
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: onMapsLoad, load: load, useGroupingSeparator: true, format: "n", zoomSettings: { enable: false }, legendSettings: { visible: true, mode: 'Interactive', position: 'Bottom', height: '10', width: '350', alignment: 'Center', labelDisplayMode: 'Trim' }, titleSettings: { text: "State wise India's population - 2011", textStyle: { size: '16px' } } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Legend] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: indiaMap, shapePropertyPath: 'NAME_1', shapeDataPath: 'Name', dataSource: datasource.heatmap, tooltipSettings: { visible: true, valuePath: 'population', format: 'State: ${Name} <br> Population: ${population}' }, shapeSettings: { colorValuePath: 'population', colorMapping: colormapping } }))))),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_states_and_union_territories_of_India_by_population", target: "_blank" }, "en.wikipedia.org"))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample visualizes the state wise population of India in the year 2011. Color for each state will be applied based on its value.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to apply the desired colors for the shapes, if its value is within the specified range using the ColorMapping property. Also, the interactive legend has been placed at the bottom of the map."),
            React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices."))));
};
exports.default = HeatMaps;
