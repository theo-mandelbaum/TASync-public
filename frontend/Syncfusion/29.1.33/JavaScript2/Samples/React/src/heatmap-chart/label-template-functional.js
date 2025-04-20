"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }";
// custom code end
var Label = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var jsonCellData = [
        { 'rowId': 'Improbable', 'columnId': 'Negligible', 'value': '2', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Low', 'value': '4', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Moderate', 'value': '6', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Significant', 'value': '8', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Catastrophic', 'value': '10', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Negligible', 'value': '4', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Low', 'value': '16', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Moderate', 'value': '24', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Remote', 'columnId': 'Significant', 'value': '32', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Remote', 'columnId': 'Catastrophic', 'value': '40', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Negligible', 'value': '6', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Occasional', 'columnId': 'Low', 'value': '24', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Moderate', 'value': '36', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Significant', 'value': '48', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Catastrophic', 'value': '60', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Negligible', 'value': '8', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Probable', 'columnId': 'Low', 'value': '32', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Moderate', 'value': '48', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Significant', 'value': '64', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Catastrophic', 'value': '80', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Negligible', 'value': '10', 'image': './src/heatmap-chart/images/green-cross.png' },
        { 'rowId': 'Frequent', 'columnId': 'Low', 'value': '40', 'image': './src/heatmap-chart/images/orange-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Moderate', 'value': '60', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Significant', 'value': '80', 'image': './src/heatmap-chart/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Catastrophic', 'value': '100', 'image': './src/heatmap-chart/images/red-tick.png' }
    ];
    var xAxis = {
        title: {
            text: 'LIKELIHOOD',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        labels: ["Improbable", "Remote", "Occasional", "Probable", "Frequent"],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var yAxis = {
        title: {
            text: 'IMPACT',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        labels: ["Negligible", "Low", "Moderate", "Significant", "Catastrophic"],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var paletteSettings = {
        type: 'Fixed',
        palette: [{ value: 2, color: "#61c961" },
            { value: 24, color: "#fcc81c" },
            { value: 48, color: "#ff6354" }
        ],
    };
    var cellSettings = {
        labelTemplate: '<div><img alt="Description of the label template" src="${image}" style="width: 35px; height: 35px;"/></div>',
        border: {
            color: 'white'
        },
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var dataSourceSettings = {
        isJsonData: true,
        adaptorType: 'Cell',
        xDataMapping: 'rowId',
        yDataMapping: 'columnId',
        valueMapping: 'value'
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', xAxis: xAxis, legendSettings: { visible: false }, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, yAxis: yAxis, dataSourceSettings: dataSourceSettings, dataSource: jsonCellData, cellSettings: cellSettings, load: load.bind(_this), paletteSettings: paletteSettings },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_1.Adaptor, ej2_react_heatmap_1.Legend] })))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample illustrates a comprehensive view of the likelihood and impact of an organization\u2019s risks. Risks that fall into the HeatMap's green zones require no action. Action is required in the yellow areas. Risks that fall into the red zone require immediate action.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to use the ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#labeltemplate" }, "labelTemplate"),
                " to display images in the HeatMap cells. The ",
                React.createElement("code", null, "labelTemplate"),
                " can be used to add any HTML elements into the HeatMap cells, such as images, text, and so on."),
            React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Heatmap component features are separated into discrete feature-based modules. To use a tooltip and adaptor, inject the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                " and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/adaptorType/", target: '_blank' }, "Adaptor "),
                " module using the ",
                React.createElement("code", null, '<Inject services={[Tooltip, Adaptor]} />'),
                " method."),
            React.createElement("p", null,
                "More information about label template can be found in this ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/appearance#template" }, "documentation section"),
                "."))));
};
exports.default = Label;
