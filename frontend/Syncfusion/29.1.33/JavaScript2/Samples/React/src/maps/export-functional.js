"use strict";
/**
 * Export sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var worldMap = require("./map-data/world-map.json");
var SAMPLE_CSS = "\n    #btn-control {\n        width: 100%;\n        text-align: center;\n        text-transform:none !important;\n    }\n\n    .e-play-icon::before {\n        content: '\\e728';\n    }\n\n    .e-view.fluent .e-play-icon::before, .e-view.fluent-dark .e-play-icon::before {\n        content: '\\e72e';\n    }\n\n    .e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before  {\n        content: '\\e710';\n    }\n\n    .e-view.bootstrap4 .e-play-icon::before {\n        content: '\\e780';\n    }\n\n    .e-view.highcontrast .e-play-icon::before {\n        content: '\\e710';\n    }\n\n    .e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {\n        content: '\\e72e';\n    }";
var ExportMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var mapInstance = (0, react_1.useRef)(null);
    var mode = (0, react_1.useRef)(null);
    var mapType = (0, react_1.useRef)(null);
    var type = [{ value: 'JPEG' }, { value: 'PNG' }, { value: 'PDF' }, { value: 'SVG' }];
    var maptype = [{ value: 'Geometry' }, { value: 'OSM' }];
    var textElement;
    var markerData = [
        { longitude: 116.5703749, latitude: 40.4319077, name: 'The Great Wall of China, China' },
        { longitude: 35.4443622, latitude: 30.3284544, name: 'Petra, Jorden' },
        { longitude: 78.0421552, latitude: 27.1750151, name: 'Taj Mahal, Agra, India' },
        { longitude: 12.4922309, latitude: 41.8902102, name: 'The Roman Colosseum, Rome, Italy' },
        { longitude: -88.5677826, latitude: 20.6842849, name: 'The Chichen Itza, Mexico' },
        { longitude: -72.5449629, latitude: -13.1631412, name: 'Machu Picchu, Peru' },
        { longitude: -43.2104872, latitude: -22.951916, name: 'Christ Redeemer, Rio de janeiro, Brazil' },
    ];
    var mapTypeChange = function () {
        if (mapType.current.value === 'OSM') {
            mapInstance.current.layers[0].urlTemplate = "https://tile.openstreetmap.org/level/tileX/tileY.png";
            mapInstance.current.layers[0].shapeData = null;
            if (mode.current.value === 'SVG') {
                mode.current.value = 'JPEG';
            }
            mode.current.dataSource = type.slice(0, 3);
        }
        else {
            mapInstance.current.layers[0].shapeData = worldMap;
            mapInstance.current.layers[0].urlTemplate = '';
            mode.current.dataSource = type;
        }
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
    var onClick = function (e) {
        mapInstance.current.export(mode.current.value, textElement.value);
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { ref: mapInstance, allowPdfExport: true, allowImageExport: true, id: "maps", loaded: onMapsLoad, load: load, titleSettings: { text: 'Location of the Wonders in the World', textStyle: { size: '16px' } } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.PdfExport, ej2_react_maps_1.ImageExport] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapeSettings: { fill: 'lightgrey', border: { color: 'black', width: 0.1 } } },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, animationDuration: 0, shape: "Balloon", fill: '#E13E40', width: 15, height: 20, dataSource: markerData, tooltipSettings: { visible: true, valuePath: 'name' } }))))),
                    React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                        "Source:",
                        React.createElement("a", { href: "http://www.emapsworld.com/world-seven-wonder-map.html", target: "_blank" }, "en.wikipedia.org"))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "20%" } },
                                        React.createElement("div", { style: { marginLeft: '-10px' } }, "Map Type")),
                                    React.createElement("td", { style: { width: "30%" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '100%', id: "maptype", value: "Geometry", change: mapTypeChange.bind(_this), ref: mapType, dataSource: maptype, fields: { text: 'value', value: 'value' }, placeholder: "Geometry" })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "20%" } },
                                        React.createElement("div", { style: { marginLeft: '-10px' } }, "Export Type")),
                                    React.createElement("td", { style: { width: "30%" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '100%', id: "etype", value: "JPEG", ref: mode, dataSource: type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: '-10px' } }, "FileName")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: '0px' } },
                                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: 'Maps', style: { width: '100%', padding: '0px', paddingLeft: '5px' }, id: "fileName", ref: function (d) { return textElement = d; } })))),
                                React.createElement("tr", { style: { height: '60px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control", style: { marginLeft: '50%' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onClick.bind(_this), style: { width: '100px' }, isPrimary: true }, "Export")))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample illustrates the exporting feature in Maps. You can modify the map type to geometric or OSM using the Map type dropdown list in this sample. By clicking the Export button, you can export the map in PNG, JPEG, SVG or in PDF formats.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the export functionality. The rendered map can be exported as either JPEG, PNG, SVG and PDF formats. Also this sample visualizes the locations of the wonders in the world using markers. Export functionality is done by ",
                React.createElement("code", null, "export"),
                " method when ",
                React.createElement("code", null, "allowImageExport"),
                " and ",
                React.createElement("code", null, "allowPdfExport"),
                " is set as true.",
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("b", null, "Injecting Module"),
                React.createElement("br", null),
                React.createElement("br", null),
                "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the ",
                React.createElement("code", null, " Marker "),
                " module into the ",
                React.createElement("code", null, " services "),
                ". To make use of the export support, we need to inject the ",
                React.createElement("code", null, "Maps"),
                " module using the ",
                React.createElement("code", null, " ImageExport"),
                " and ",
                React.createElement("code", null, " PdfExport "),
                " modules into the ",
                React.createElement("code", null, " services "),
                "."),
            React.createElement("p", null,
                "More information on export can be found in this",
                " ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/maps/print/#export' }, "documentation section"),
                "."))));
};
exports.default = ExportMaps;
