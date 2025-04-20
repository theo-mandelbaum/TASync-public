"use strict";
/**
 * Print sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var data = require("./map-data/print-datasource.json");
var usa = require("./map-data/usa.json");
var datasource = data;
var SAMPLE_CSS = "\n    .e-play-icon::before {\n        content: \"\\e34b\";\n    }\n\n    .e-view.fluent .e-play-icon::before, .e-view.fluent-dark .e-play-icon::before {\n        content: '\\e75d';\n    }\n\n    .e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before\n    {\n        content: '\\e7df';\n    }\n\n    .e-view.bootstrap .e-play-icon::before {\n        content: '\\ebd2';\n    }\n\n    .e-view.bootstrap4 .e-play-icon::before {\n        content: '\\e743';\n    }\n\n    .e-view.highcontrast .e-play-icon::before {\n        content: '\\ebf9';\n    }\n\n    .e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {\n        content: '\\e75d';\n    }";
var PrintMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var mapInstance = (0, react_1.useRef)(null);
    var colorMap = [
        {
            from: 580000,
            to: 2800000,
            color: '#dae8f1',
            label: '<3M',
        },
        {
            from: 2800000,
            to: 5280000,
            color: '#b0cde1',
            label: '3-6M',
        },
        {
            from: 5280000,
            to: 8260000,
            color: '#90bad8',
            label: '6-9M',
        },
        {
            from: 8260000,
            to: 11660000,
            color: '#6ea7d2',
            label: '9-12M',
        },
        {
            from: 11660000,
            to: 19600000,
            color: '#4c96cb',
            label: '12-20M',
        },
        {
            from: 19600000,
            to: 26500000,
            color: '#3182bd',
            label: '20-25M',
        },
        {
            from: 26500000,
            to: 38400000,
            color: '#004374',
            label: '>25M',
        },
    ];
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
    var tooltipRender = function (args) {
        if (args.options.toString().indexOf('population') > -1) {
            args.cancel = true;
        }
    };
    var onClick = function () {
        mapInstance.current.print();
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", tooltipRender: tooltipRender, loaded: onMapsLoad, load: load, allowPrint: true, ref: mapInstance, useGroupingSeparator: true, format: "n", legendSettings: { visible: true, mode: 'Interactive', position: 'Bottom', height: '10', width: '350', labelDisplayMode: 'Trim', alignment: 'Center' }, titleSettings: { text: 'State-wise US population - 2010', textStyle: { size: '16px' } } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Print] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: usa, shapePropertyPath: 'name', shapeDataPath: 'name', dataSource: datasource.print, tooltipSettings: { visible: true, valuePath: 'population', format: 'State: ${name} <br> Population: ${population}' }, shapeSettings: { colorValuePath: 'population', colorMapping: colorMap } }))),
                    React.createElement("div", { style: { float: 'right', marginRight: '10px', marginBottom: '0px' } },
                        "Source:",
                        React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population", target: "_blank" }, "en.wikipedia.org"))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '100%' } },
                                        React.createElement("div", { id: "btn-control", style: { textAlign: 'center' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onClick.bind(_this), style: { width: '80px' }, isPrimary: true }, "Print")))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample illustrates the print feature in Maps. By clicking\u00A0the Print button, you can print the maps directly from the browser.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the print functionality. The rendered maps can be printed directly from the browser by calling the ",
                React.createElement("code", null, "print"),
                " method when",
                React.createElement("code", null, "allowPrint"),
                " is set as true. Also this sample visualizes the State-wise US population in the year 2010.",
                React.createElement("br", null),
                " ",
                React.createElement("br", null),
                React.createElement("b", null, "Injecting Module"),
                React.createElement("br", null),
                " ",
                React.createElement("br", null),
                "Maps component features are segregated into individual feature-wise modules. To use a legend, inject the Legend module using the ",
                React.createElement("code", null, " Legend "),
                " module into the ",
                React.createElement("code", null, "services"),
                ".To make use of the print support, we need to inject the ",
                React.createElement("code", null, "Maps"),
                " module using the ",
                React.createElement("code", null, " Print "),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on print can be found in this",
                " ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/maps/print/#print' }, "documentation section"),
                "."))));
};
exports.default = PrintMaps;
