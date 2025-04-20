"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./render-mode-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }";
// custom code end
var RenderMode = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('SVG'), renderingMode = _a[0], setRenderingMode = _a[1];
    var heatmap = (0, react_1.useRef)(null);
    var title = {
        text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    var xAxis = {
        labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland', 'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
        labelRotation: -90,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var yAxis = {
        labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990', '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var paletteSettings = {
        palette: [
            { color: '#C06C84' },
            { color: '#355C7D' }
        ]
    };
    var cellSettings = {
        border: {
            width: 0
        },
        showLabel: false,
        format: '{value} %'
    };
    var legendSettings = {
        position: 'Bottom',
        width: '200px',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var svg = function () {
        setRenderingMode('SVG');
        heatmap.current.dataBind();
    };
    var canvas = function () {
        setRenderingMode('Canvas');
        heatmap.current.dataBind();
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: heatmap, titleSettings: title, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, xAxis: xAxis, yAxis: yAxis, dataSource: data.renderModeData, paletteSettings: paletteSettings, renderingMode: renderingMode, cellSettings: cellSettings, load: load.bind(_this), legendSettings: legendSettings },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Rendering Mode:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'svg', checked: true, label: 'SVG', name: 'renderingmode', value: "SVG", change: svg })),
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'canvas', label: 'Canvas', name: 'renderingmode', value: "Canvas", change: canvas }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample visualizes the net migration rate for the northern European countries over the years. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to change the rendering mode between Canvas and SVG means of radio button.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to change the rendering mode between ",
                React.createElement("code", null, "Canvas"),
                " and ",
                React.createElement("code", null, "SVG"),
                " types in Heatmap. You can change the rendering mode using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/rendering-mode", target: "_blank" }, "renderingMode"),
                " property."),
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
exports.default = RenderMode;
