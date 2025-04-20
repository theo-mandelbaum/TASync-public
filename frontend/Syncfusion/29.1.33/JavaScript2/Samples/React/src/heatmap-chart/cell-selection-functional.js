"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./cell-seletion-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #source{\n        float: right; margin-right: 10p\n    }";
// custom code end
var CellSelection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(data.chartData), series = _a[0], setSeries = _a[1];
    var heatmap = (0, react_1.useRef)(null);
    var chart = (0, react_1.useRef)(null);
    var cellSelected = function (args) {
        var data = args.data;
        var length = data.length;
        var xAxis = [];
        var flag = [];
        var series = [];
        var i;
        var columnData = {};
        for (i = 0; i < length; i++) {
            if (xAxis.indexOf(data[i].xLabel) === -1) {
                xAxis.push(data[i].xLabel);
                flag.push(false);
            }
        }
        for (i = 0; i < length; i++) {
            var index = xAxis.indexOf(data[i].xLabel);
            if (!flag[index]) {
                flag[index] = true;
                var column = {};
                column.type = 'Column';
                column.xName = 'x';
                column.yName = 'y';
                column.width = 2;
                column.name = data[i].xLabel;
                column.marker = { dataLabel: { visible: false } };
                column.dataSource = [];
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                column.dataSource.push(columnData);
                series.push(column);
            }
            else {
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                series[index].dataSource.push(columnData);
            }
        }
        chart.current.series = series;
        chart.current.refresh();
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var loads = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var Change = function () {
        heatmap.current.clearSelection();
        chart.current.series = (data.chartData);
        chart.current.refresh();
    };
    return (React.createElement("main", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', style: { height: '300px' }, ref: heatmap, titleSettings: { text: 'Top export products 2014-2018, Value in USD million', textStyle: { size: '15px', fontWeight: '500', fontStyle: 'Normal', fontFamily: 'inherit' } }, cellSettings: { textStyle: { fontFamily: 'inherit' } }, tooltipSettings: { textStyle: { fontFamily: 'inherit' } }, legendSettings: { visible: false, textStyle: { fontFamily: 'inherit' } }, xAxis: { labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat'], textStyle: { fontFamily: 'inherit' } }, yAxis: { labels: ['2014', '2015', '2016', '2017', '2018'], textStyle: { fontFamily: 'inherit' } }, dataSource: data.cellSelectionData, allowSelection: true, showTooltip: true, load: loads, cellSelected: cellSelected, paletteSettings: { palette: [{ color: '#3C5E62 ' }, { color: '#86C843 ' }] } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_1.Legend] })),
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "container1", style: { height: '300px' }, ref: chart, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }, chartArea: { border: { width: 0 } }, primaryYAxis: { majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }, series: series, load: load.bind(_this), tooltip: { enable: true } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip] })),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_countries_by_oil_production", target: "_blank" }, "https://en.wikipedia.org/ "))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clearSelection", onClick: Change.bind(_this) }, "Clear Selection"))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
            React.createElement("p", null, "This sample visualizes the revenue from the top exported products between the year 2014 and 2018, valued in USD million.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to selected the cell in heat map and render the column chart based on selected data."),
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
exports.default = CellSelection;
