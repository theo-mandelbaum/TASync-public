"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var ej2_react_heatmap_2 = require("@syncfusion/ej2-react-heatmap");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }";
// custom code end
var JsonRow = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var jsonTableData = [
        { 'Region': 'USA', '2000': 93, '2004': 101, '2008': 112, '2012': 103, '2016': 121 },
        { 'Region': 'GBR', '2000': 28, '2004': 30, '2008': 49, '2012': 65, '2016': 67 },
        { 'Region': 'China', '2000': 58, '2004': 63, '2008': 100, '2012': 91, '2016': 70 },
        { 'Region': 'Russia', '2000': 89, '2004': 90, '2008': 60, '2012': 69, '2016': 55 },
        { 'Region': 'Germany', '2000': 56, '2004': 49, '2008': 41, '2012': 44, '2016': 42 },
        { 'Region': 'Japan', '2000': 18, '2004': 37, '2008': 25, '2012': 38, '2016': 41 },
        { 'Region': 'France', '2000': 38, '2004': 33, '2008': 43, '2012': 35, '2016': 42 },
        { 'Region': 'KOR', '2000': 28, '2004': 30, '2008': 32, '2012': 30, '2016': 21 },
        { 'Region': 'Italy', '2000': 34, '2004': 32, '2008': 27, '2012': 28, '2016': 28 }
    ];
    var title = {
        text: 'Olympic Medal Achievements of most Successful Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    };
    var xAxis = {
        labels: ['China', 'France', 'GBR', 'Germany', 'Italy', 'Japan', 'KOR', 'Russia', 'USA'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var yAxis = {
        title: { text: 'Olympic Year',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        labels: ['2000', '2004', '2008', '2012', '2016'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var paletteSettings = {
        palette: [
            { color: '#F0C27B' },
            { color: '#4B1248' }
        ]
    };
    var cellSettings = {
        border: {
            width: 1,
            radius: 4,
            color: 'white'
        },
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    var dataSourceSettings = {
        isJsonData: true,
        adaptorType: 'Table',
        xDataMapping: 'Region'
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var tooltipTemplate = function (args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' Medals'];
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: title, xAxis: xAxis, yAxis: yAxis, dataSource: jsonTableData, dataSourceSettings: dataSourceSettings, paletteSettings: paletteSettings, cellSettings: cellSettings, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, legendSettings: { textStyle: { fontFamily: 'inherit' } }, load: load.bind(_this), tooltipRender: tooltipTemplate },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_2.Adaptor] }))),
            React.createElement("div", { id: "source" },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/2016_Summer_Olympics_medal_table", target: "_blank" }, "https://en.wikipedia.org/"))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample visualizes the overall Olympic medals won by the countries in all the summer Olympic events from the year 2000 to 2016.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to bind JSON data and configure the Heatmap using the data adaptor support. You can bind the JSON data with information for each row to the Heatmap using",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#isjsondata", target: "_blank" }, " isJsonData"),
                " and by defining the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#adaptortype", target: "_blank" }, " adaptorType"),
                " properties. In row JSON data, the row header is mapped using the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#xdatamapping", target: "_blank" }, " xDataMapping"),
                "."),
            React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
            React.createElement("br", null),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Heatmap component features are separated into discrete feature-based modules. To use a tooltip, adaptor and the legend, inject the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                ", ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/adaptorType/", target: '_blank' }, "Adaptor "),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend" }, "Legend"),
                " module using the ",
                React.createElement("code", null, '<Inject services={[Tooltip, Adaptor, Legend]} />'),
                " method."))));
};
exports.default = JsonRow;
