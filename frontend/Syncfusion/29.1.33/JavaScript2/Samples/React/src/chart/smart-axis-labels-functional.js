"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for smart axis labels
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
exports.data1 = [{ x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
    { x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
    { x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
    { x: 'France', y: 45 }, { x: 'United Arab Emirates', y: 10 },
    { x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
    { x: 'Brazil', y: 76 }, { x: 'China', y: 51 }];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
function SmartAxisLabels() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chartInstance;
    var widthElement;
    var checkElement;
    var dropElement;
    var droplist = [
        { value: 'Hide' },
        { value: 'Trim' },
        { value: 'Wrap' },
        { value: 'MultipleRows' },
        { value: 'Rotate45' },
        { value: 'Rotate90' },
        { value: 'None' }
    ];
    function change() {
        chartInstance.primaryXAxis.labelIntersectAction = dropElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    ;
    function mode() {
        chartInstance.primaryXAxis.edgeLabelPlacement = modeElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    ;
    function trim() {
        chartInstance.primaryXAxis.enableTrim = checkElement.checked;
        chartInstance.refresh();
    }
    ;
    function xwid() {
        chartInstance.primaryXAxis.maximumLabelWidth = widthElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    function xpos() {
        chartInstance.primaryXAxis.labelPosition = posElement.value;
        chartInstance.refresh();
    }
    ;
    var modeElement;
    var modelist = [
        { value: 'None' },
        { value: 'Hide' },
        { value: 'Shift' }
    ];
    var posElement;
    var poslist = [
        { value: 'Inside' },
        { value: 'Outside' }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        interval: 1,
                        majorGridLines: { width: 0 },
                        labelIntersectAction: 'Hide',
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                        labelStyle: { size: '0px' },
                        majorTickLines: { width: 0 },
                        majorGridLines: { width: 0 },
                        lineStyle: { width: 0 },
                    }, load: load.bind(this), pointRender: pointRender, title: "Internet Users in Millions", loaded: onChartLoad.bind(this), legendSettings: { visible: false }, tooltip: { enable: true, format: "<b>${point.x}</b> <br> Internet Users : <b>${point.y}M</b>", header: '' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Users", type: 'Column', marker: { dataLabel: { visible: true, enableRotation: ej2_base_1.Browser.isDevice ? true : false, angle: -90, position: 'Top', format: "{value}M", font: { fontWeight: '600', color: '#ffffff' } } } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Intersect Action: ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selchange", change: change.bind(this), ref: function (d) { return dropElement = d; }, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "Hide" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        "Edge Label",
                                        React.createElement("br", null),
                                        "Placement: ")),
                                React.createElement("td", { style: { padding: 10 } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: mode.bind(this), ref: function (d) { return modeElement = d; }, dataSource: modelist, fields: { text: 'value', value: 'value' }, value: "None" }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Label Position: ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "labmode", change: xpos.bind(this), ref: function (d) { return posElement = d; }, dataSource: poslist, fields: { text: 'value', value: 'value' }, value: "Outside" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "trim" }, "Enable Trim:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "trimmode", defaultChecked: false, onChange: trim.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return checkElement = d; }, "aria-labelledby": "Checkbox unchecked" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "labelWidth" }, "Maximum Label Width:")),
                                React.createElement("td", { style: { padding: 10, width: '40%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: 120, value: 34, min: 1, change: xwid.bind(this), ref: function (d) { return widthElement = d; }, "aria-labelledby": "Text" })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example shows the smart label placement for the chart axis labels.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how the axis labels are smartly arranged when they overlap with each other using the ",
                React.createElement("code", null, "LabelIntersectAction"),
                " property in the axis."),
            React.createElement("p", null,
                "Chart supports the following by which can be set using ",
                React.createElement("code", null, "labelIntersectAction"),
                " property."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Hide"),
                    " - Hide the label when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "Trim"),
                    " - Trim the label when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "Wrap"),
                    " - Wrap the label when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "MultipleRows"),
                    " - Arrange the label in multiple row when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "Rotate45"),
                    " - Rotate the label to 45 degree when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "Rotate90"),
                    " - Rotate the label to 90 degree when it intersect."),
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - Shows all the labels.")),
            React.createElement("p", null,
                "Chart supports three types of edge labels placement which can be set using ",
                React.createElement("code", null, "edgeLabelPlacement"),
                " property."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - No action will be performed."),
                React.createElement("li", null,
                    React.createElement("code", null, "Hide"),
                    " - Edge label will be hidden ."),
                React.createElement("li", null,
                    React.createElement("code", null, "Shift"),
                    " - Shifts the edge labels.")),
            React.createElement("p", null,
                "More information on the smart axis labels can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/axis-labels#smart-axis-labels", "aria-label": "Navigate to the documentation for Smart Axis Labels in React Chart component" }, "documentation section"),
                "."))));
    function onChartLoad(args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    function load(args) {
        (0, theme_color_1.loadChartTheme)(args);
    }
    ;
    function pointRender(args) {
        (0, theme_color_1.pointRenderEvent)(args);
    }
}
exports.default = SmartAxisLabels;
