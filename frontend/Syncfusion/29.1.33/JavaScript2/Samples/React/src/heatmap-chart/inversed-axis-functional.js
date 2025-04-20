"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./inversed-axis-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }\n    .inversedCheckBox{\n        padding-left: 0px !important;\n        margin-left: 0px;\n    }\n    .e-view.fluent2 #property .inversedCheckBox, .e-view.fluent2-dark #property .inversedCheckBox {\n        padding-left: 0px; margin-left: -6px;\n    }";
// custom code end
var InversedAxis = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isXInversed = _a[0], setIsXInversed = _a[1];
    var _b = (0, react_1.useState)(true), isYInversed = _b[0], setIsYInversed = _b[1];
    var heatmap = (0, react_1.useRef)(null);
    var title = {
        text: 'Population Growth Rate of the most Populous Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    var xAxis = {
        labels: ['China', 'India', 'USA', 'Indonesia', 'Brazil', 'Pakistan', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        isInversed: isXInversed,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var yAxis = {
        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990', '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
        isInversed: isYInversed,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var paletteSettings = {
        palette: [
            { value: 0, color: '#4b7287' },
            { value: 0.5, color: '#b5b29f' },
            { value: 1, color: '#F0D6AD' },
            { value: 1.5, color: '#9da49a' },
            { value: 2, color: '#466f86' },
            { value: 2.5, color: '#d7c7a7' },
            { value: 3, color: '#6e888f' },
        ]
    };
    var cellSettings = {
        border: { width: 0 },
        showLabel: false,
        format: '{value} %'
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var valueXChange = function (args) {
        setIsXInversed(args.checked);
        heatmap.current.dataBind();
    };
    var valueYChange = function (args) {
        setIsYInversed(args.checked);
        heatmap.current.dataBind();
    };
    return (React.createElement("main", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: heatmap, titleSettings: title, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, xAxis: xAxis, yAxis: yAxis, dataSource: data.inveredAxisData, cellSettings: cellSettings, paletteSettings: paletteSettings, load: load.bind(_this), legendSettings: { visible: false } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_countries_by_oil_production", target: "_blank" }, "https://en.wikipedia.org/ "))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: "inversedCheckBox" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'XOpposedPosition', checked: isXInversed, label: 'Reverse X-Axis Origin', change: valueXChange })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: "inversedCheckBox" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'YOpposedPosition', checked: isYInversed, label: 'Reverse Y-Axis Origin', change: valueYChange }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample illustrates the population growth rate of the most populous countries over the years. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to reverse the origin of the axes by means of checkbox for each axis.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to reverse the axis origin for both axes, once the axis origin has been reversed the axis data will be displayed inverted. You can reverse the axis origin by enabling the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/axisModel/#isinversed", target: "_blank" }, " isInversed "),
                " property for each axis."),
            React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
            React.createElement("br", null),
            React.createElement("p", null,
                " ",
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                " module using the ",
                React.createElement("code", null, '<Inject services={[Tooltip]} />'),
                " method."))));
};
exports.default = InversedAxis;
