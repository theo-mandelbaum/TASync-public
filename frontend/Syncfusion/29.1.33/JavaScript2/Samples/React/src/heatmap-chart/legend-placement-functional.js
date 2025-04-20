"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./legend-sample-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }";
// custom code end
var LegendPlacement = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Bottom'), position = _a[0], setPosition = _a[1];
    var heatmap = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'Left' },
        { value: 'Right' },
        { value: 'Top' },
        { value: 'Bottom' }
    ];
    var title = {
        text: 'Hourly Weather Forecast',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    var xAxis = {
        labels: ['London', 'Berlin', 'Madrid', 'Paris', 'Rome', 'Lisbon', 'Dublin'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var yAxis = {
        labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var paletteSettings = {
        palette: [
            { value: 0, color: '#6EB5D0' },
            { value: 10, color: '#7EDCA2' },
            { value: 19, color: '#DCD57E' },
            { value: 22, color: '#DCD57E' }
        ]
    };
    var cellSettings = {
        showLabel: false,
        format: '{value} C'
    };
    var legendSettings = {
        position: position,
        labelFormat: '{value}\xB0 C',
        title: {
            text: "Celsius",
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var change = function (args) {
        setPosition(args.value);
        heatmap.current.refresh();
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var legendTooltip = function (args) {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + '\xB0 C'];
    };
    return (React.createElement("main", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'col-md-8 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: heatmap, titleSettings: title, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, xAxis: xAxis, yAxis: yAxis, dataSource: data.legentSampleData, cellSettings: cellSettings, tooltipRender: legendTooltip, paletteSettings: paletteSettings, load: load.bind(_this), legendSettings: legendSettings },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { className: "col-md-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Legend Position:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "LegendPosition", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, text: position, value: position }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample visualizes the hourly weather forecast for some major European cities. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to change the display position of the Heatmap legend axes by means of dropdown.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to change the display position of the Heatmap legend. You can change the display position of legend to left, right, bottom and top by using the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/legendSettingsModel/#position", target: "_blank" }, " position"),
                " property in",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/legendSettingsModel/", target: "_blank" }, " legendSettings"),
                "."),
            React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend" }, "Legend"),
                " module using the ",
                React.createElement("code", null, '<Inject services={[Tooltip, Legend]} />'),
                " method."))));
};
exports.default = LegendPlacement;
