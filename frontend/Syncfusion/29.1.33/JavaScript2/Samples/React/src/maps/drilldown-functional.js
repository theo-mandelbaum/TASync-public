"use strict";
/**
 * Drilldown sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var data = require("./map-data/default-datasource.json");
var worldMap = require("./map-data/world-map.json");
var africa = require("./map-data/africa.json");
var europe = require("./map-data/europe.json");
var asia = require("./map-data/asia.json");
var northAmerica = require("./map-data/north-america.json");
var southAmerica = require("./map-data/south-america.json");
var oceania = require("./map-data/oceania.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .backLabel:hover {\n        cursor: pointer;\n    }";
var markers = [
    { name: 'Asia', latitude: 50.32087157990324, longitude: 90.015625 },
    { name: 'Australia', latitude: -23.88583769986199, longitude: 134.296875 },
    { name: 'Africa', latitude: 16.97274101999902, longitude: 16.390625 },
    { name: 'Europe', latitude: 49.95121990866204, longitude: 18.468749999999998 },
    { name: 'North America', latitude: 59.88893689676585, longitude: -109.3359375 },
    { name: 'South America', latitude: -6.64607562172573, longitude: -54.54687499999999 }
];
var touchmove;
var DrilldownMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), button = _a[0], setButton = _a[1];
    var _b = (0, react_1.useState)('Click on a shape to drill'), content = _b[0], setContent = _b[1];
    var _c = (0, react_1.useState)('hidden'), category = _c[0], setCategory = _c[1];
    var _d = (0, react_1.useState)(''), text = _d[0], setText = _d[1];
    var _e = (0, react_1.useState)('hidden'), symbol = _e[0], setSymbol = _e[1];
    var mapInstance = (0, react_1.useRef)(null);
    var change = function () {
        mapInstance.current.baseLayerIndex = 0;
        mapInstance.current.refresh();
        setButton('none');
        setContent('Click on a shape to drill');
        setCategory('hidden');
        setText('');
        setSymbol('hidden');
    };
    var shapeSelected = function (args) {
        var shape = args.shapeData.continent;
        if (mapInstance.current.baseLayerIndex === 0 && !touchmove) {
            if (shape === 'Africa') {
                mapInstance.current.baseLayerIndex = 1;
                mapInstance.current.refresh();
            }
            else if (shape === 'Europe') {
                mapInstance.current.baseLayerIndex = 2;
                mapInstance.current.refresh();
            }
            else if (shape === 'Asia') {
                mapInstance.current.baseLayerIndex = 3;
                mapInstance.current.refresh();
            }
            else if (shape === 'North America') {
                mapInstance.current.baseLayerIndex = 4;
                mapInstance.current.refresh();
            }
            else if (shape === 'South America') {
                mapInstance.current.baseLayerIndex = 5;
                mapInstance.current.refresh();
            }
            else if (shape === 'Australia') {
                mapInstance.current.baseLayerIndex = 6;
                mapInstance.current.refresh();
            }
            setButton('block');
            setContent('');
            setCategory('visible');
            setText(shape);
            setSymbol('visible');
        }
        touchmove = false;
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var loaded = function () {
        // custom code start
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
        var mapsSVG = document.getElementById('mapdrilldown_svg');
        if (mapsSVG) {
            mapsSVG.addEventListener('touchmove', function (e) {
                touchmove = true;
            }, false);
        }
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { id: "button", className: "backLabel", style: { display: button } },
                    React.createElement("a", { id: "category", onClick: change, style: { visibility: category, display: 'inline-block', fontSize: 16 } },
                        React.createElement("h5", null, "WorldMap")),
                    React.createElement("p", { style: { visibility: symbol, display: 'inline-block' }, id: "symbol" }, "\u00A0>>\u00A0"),
                    React.createElement("p", { id: "text", style: { display: 'inline-block', fontSize: 16 } }, text)),
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", ref: mapInstance, loaded: loaded, load: load, shapeSelected: shapeSelected.bind(_this), zoomSettings: { enable: false } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Selection, ej2_react_maps_1.Highlight, ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'continent', shapeDataPath: 'continent', dataSource: datasource.default, shapeSettings: { colorValuePath: 'drillColor' }, selectionSettings: { enable: false }, tooltipSettings: { visible: true, valuePath: 'continent' } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style="font-size: 12px;color:white;text-shadow: 0px 1px 1px black;font-weight: 500;width:50px">{{:name}}</div>', animationDuration: 0, dataSource: markers }))),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: africa, shapeSettings: { fill: '#80306A' }, highlightSettings: { enable: true, fill: '#80306A' }, tooltipSettings: { visible: true, valuePath: 'name' } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: europe, shapeSettings: { fill: '#622D6C' }, highlightSettings: { enable: true, fill: '#622D6C' }, tooltipSettings: { visible: true, valuePath: 'name' } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: asia, shapeSettings: { fill: '#462A6D' }, highlightSettings: { enable: true, fill: '#462A6D' }, tooltipSettings: { visible: true, valuePath: 'name' } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: northAmerica, shapeSettings: { fill: '#C13664' }, highlightSettings: { enable: true, fill: '#C13664' }, tooltipSettings: { visible: true, valuePath: 'name' } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: southAmerica, shapeSettings: { fill: '#9C3367' }, highlightSettings: { enable: true, fill: '#9C3367' }, tooltipSettings: { visible: true, valuePath: 'name' } }),
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: oceania, shapeSettings: { fill: '#2A2870' }, highlightSettings: { enable: true, fill: '#2A2870' }, tooltipSettings: { visible: true, valuePath: 'name' } }))))),
            React.createElement("div", null,
                React.createElement("i", null,
                    React.createElement("p", { id: "content", style: { fontSize: '16px', color: 'grey', textAlign: 'center' } }, content)))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample demonstrates drill down with all the continents in the initial view. By clicking a continent, you can view all the countries available in that continent.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to display an another layer by clicking a shape in previous layer. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a shape or tap a shape in touch enabled devices"))));
};
exports.default = DrilldownMaps;
