"use strict";
/**
 * Legend sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/legend-datasource.json");
var worldMap = require("./map-data/world-map.json");
var datasource = data;
var SAMPLE_CSS = "\n    .e-view.fluent2 #property .e-checkbox-wrapper .e-icons, .e-view.fluent2-dark #property .e-checkbox-wrapper .e-icons {\n        margin-left: 0px;\n    }\n    .legendCheckBox {\n        margin-left: 0px, padding-left: 0px, margin-top: -19px;\n    }\n    .e-view.fluent2-highcontrast .legendCheckBox {\n        padding-left: 1px !important; margin-left: -8px !important;\n    }\n    .legendModeCheckBox{\n        padding-left: 10px;\n    }";
var LegendMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), legendHeight = _a[0], setLegendHeight = _a[1];
    var _b = (0, react_1.useState)(''), legendWidth = _b[0], setLegendWidth = _b[1];
    var _c = (0, react_1.useState)('Default'), mode = _c[0], setMode = _c[1];
    var _d = (0, react_1.useState)(false), isEnableToggleLegend = _d[0], setIsEnableToggleLegend = _d[1];
    var _e = (0, react_1.useState)('Horizontal'), orientation = _e[0], setOrientation = _e[1];
    var _f = (0, react_1.useState)('Top'), position = _f[0], setPosition = _f[1];
    var mapInstance = (0, react_1.useRef)(null);
    var legendElement = (0, react_1.useRef)(null);
    var legendPositionElement = (0, react_1.useRef)(null);
    var droplist = [
        { text: 'Default', value: 'Default' },
        { text: 'Interactive', value: 'Interactive' },
    ];
    var positionList = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' },
        { text: 'Left', value: 'Left' },
        { text: 'Right', value: 'Right' },
    ];
    var colorMappingData = [
        { from: 0.00001, to: 100, color: "rgb(153,174,214)", label: "<100" },
        { from: 100, to: 200, color: "rgb(115,143,199)", label: "100 - 200" },
        { from: 200, to: 300, color: "rgb(77,112,184)", label: "200 - 300" },
        { from: 300, to: 500, color: "rgb(38,82,168)", label: "300 - 500" },
        { from: 500, to: 19000, color: "rgb(0,51,153)", label: ">500" },
        { color: null, label: null },
    ];
    var legendChange = function (args) {
        mapInstance.current.legendSettings.mode = legendElement.current.value;
        if (legendElement.current.value === 'Interactive') {
            if (mapInstance.current.legendSettings.orientation === 'Horizontal' || mapInstance.current.legendSettings.orientation === 'None') {
                mapInstance.current.legendSettings.height = '10';
                mapInstance.current.legendSettings.width = '';
            }
            else {
                mapInstance.current.legendSettings.height = '70%';
                mapInstance.current.legendSettings.width = '10';
            }
        }
        else {
            mapInstance.current.legendSettings.height = '';
            mapInstance.current.legendSettings.width = '';
        }
        mapInstance.current.refresh();
    };
    var legendPositionChange = function (args) {
        mapInstance.current.legendSettings.position = legendPositionElement.current.value;
        if (legendPositionElement.current.value === 'Left' || legendPositionElement.current.value === 'Right') {
            mapInstance.current.legendSettings.orientation = 'Vertical';
            if (mapInstance.current.legendSettings.mode === 'Interactive') {
                mapInstance.current.legendSettings.height = '70%';
                mapInstance.current.legendSettings.width = '10';
            }
            else {
                mapInstance.current.legendSettings.height = '';
                mapInstance.current.legendSettings.width = '';
            }
        }
        else {
            mapInstance.current.legendSettings.orientation = 'Horizontal';
            if (mapInstance.current.legendSettings.mode === 'Interactive') {
                mapInstance.current.legendSettings.height = '10';
                mapInstance.current.legendSettings.width = '';
            }
        }
        mapInstance.current.refresh();
    };
    var dataChange = function (args) {
        if (args.checked) {
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
        }
        else {
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = null;
        }
        mapInstance.current.refresh();
    };
    var toggleLegendChange = function (args) {
        mapInstance.current.legendSettings.toggleLegendSettings.enable = args.checked;
        mapInstance.current.refresh();
    };
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
    //tslint:disable
    var tooltip = function (args) {
        if (!args.options['data']) {
            args.cancel = true;
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", tooltipRender: tooltip, loaded: onMapsLoad, load: load, ref: mapInstance, zoomSettings: { enable: false }, legendSettings: { visible: true, position: position, height: legendHeight, width: legendWidth, orientation: orientation, mode: mode, toggleLegendSettings: { enable: isEnableToggleLegend } }, titleSettings: { text: 'Population density (per square kilometer) - 2015', textStyle: { size: '16px' } } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource.legend, tooltipSettings: { visible: true, valuePath: 'name', format: '${name} : ${density}' }, shapeSettings: { colorValuePath: 'density', colorMapping: colorMappingData, fill: '#E5E5E5' } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://simple.wikipedia.org/wiki/List_of_countries_by_population_density", target: "_blank" }, "simple.wikipedia.org"))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: "100%", marginBottom: "20px" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '0px' } }, "Legend mode")),
                                React.createElement("td", { className: "legendModeCheckBox" },
                                    React.createElement("div", { style: { marginLeft: '0px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendmode", width: "100%", index: 0, change: legendChange.bind(_this), ref: legendElement, dataSource: droplist, fields: { text: 'text', value: 'value' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '0px' } }, "Legend position ")),
                                React.createElement("td", { className: "legendModeCheckBox" },
                                    React.createElement("div", { style: { marginLeft: '0px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendPosition", width: "100%", index: 0, change: legendPositionChange.bind(_this), ref: legendPositionElement, dataSource: positionList, fields: { text: 'text', value: 'value' } })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "property-text", style: { padding: "0px" } }, "Show legend for remaining data source items")),
                                React.createElement("td", { className: "legendModeCheckBox" },
                                    React.createElement("div", { className: "col legendCheckBox" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "datasource", change: dataChange.bind(_this), style: { paddingLeft: '0px' } })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "property-text", style: { padding: "0px" } }, "Show population density when the legend item is toggled")),
                                React.createElement("td", { className: "legendModeCheckBox" },
                                    React.createElement("div", { className: "col legendCheckBox" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "toggleLegend", change: toggleLegendChange.bind(_this), style: { paddingLeft: '0px' } }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample visualizes grouping of countries in the legends based on its population density. The legend will be displayed at the top of the map.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render a legend in the maps. A legend item denotes the value of a shape. Any number of legend items can be added to the legend. You can bind the desired colors to the shapes, if its values are within the specified range using the ColorMapping property. You can also show or hide color mapping related to population density when toggling the legend item"),
            React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null, "Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the Maps.Inject(Legend) method."))));
};
exports.default = LegendMaps;
