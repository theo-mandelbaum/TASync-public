"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlNode = void 0;
var React = require("react");
require("./custom.module.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_base_2 = require("@syncfusion/ej2-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var diagram_data_1 = require("./diagram-data");
var shape = { type: "HTML" };
var constraints = ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Resize & ~ej2_react_diagrams_1.NodeConstraints.Rotate;
//Initialize Diagram Nodes
var nodes = [
    {
        id: 'node', offsetX: 409, offsetY: -151, width: 250, height: 30, shape: shape, constraints: constraints
    },
    {
        id: 'lchart', offsetX: 276, offsetY: 550, width: 512, height: 408, shape: shape, constraints: constraints
    },
    {
        id: 'colchart', offsetX: -257, offsetY: 550, width: 512, height: 408, shape: shape, constraints: constraints
    },
    {
        id: 'pie', offsetX: 10, offsetY: 100, width: 1050, height: 450, shape: shape, constraints: constraints
    },
    {
        id: 'node5', offsetX: -434, offsetY: -157, width: 250, height: 30,
        style: { fill: 'transparent', strokeColor: 'transparent' },
        constraints: ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Select,
        annotations: [{
                content: "EXPENSE TRACKER",
                style: { fontSize: 16, color: "#797979", bold: true }
            }]
    }
];
var expenseDS;
var diagramInstance;
var lineChart;
var columnChart;
var pie;
var lGrid;
var exp = diagram_data_1.expenseData;
// Function returning grid template
var template = diagramTemplate;
var predicateStart;
var predicateEnd;
var predicate;
var gtemplate = gridTemplate;
var acclegendSettings = { visible: false };
function gridTemplate(props) {
    return (React.createElement("tr", { style: { height: "30px" } },
        React.createElement("td", null,
            React.createElement("div", { style: {
                    height: "16px", width: "16px", marginLeft: "1px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    background: props.color
                } })),
        React.createElement("td", null,
            " ",
            props.text,
            " "),
        React.createElement("td", null,
            " ",
            props.y,
            " "),
        React.createElement("td", { style: { textAlign: "right" } },
            " ",
            props.x,
            " ")));
}
var datachange = onDateRangeChange;
// Initializing date range values
var start = new Date("5/31/2017");
var end = new Date("11/30/2017");
var minDate = new Date(2017, 5, 1);
var maxDate = new Date(2017, 10, 30);
// Setting predicates for date filtering
predicateStart = new ej2_data_1.Predicate('DateTime', 'greaterthanorequal', start);
predicateEnd = new ej2_data_1.Predicate('DateTime', 'lessthanorequal', end);
predicate = predicateStart.and(predicateEnd);
// Date range presets
var datePresets = [
    { label: 'Last Month', start: new Date('10/1/2017'), end: new Date('10/31/2017') },
    { label: 'Last 3 Months', start: new Date('9/1/2017'), end: new Date('11/30/2017') },
    { label: 'All Time', start: new Date('6/1/2017'), end: new Date('11/30/2017') }
];
var content1 = '<p style="font-family:Roboto;font-size: 16px;font-weight: 400;font-weight: 400;letter-spacing: 0.02em;line-height: 16px;color: #797979 !important;">Account - Balance</p>';
var content2 = '<p style="font-family:Roboto;font-size: 16px;font-weight: 400;font-weight: 400;letter-spacing: 0.02em;line-height: 16px;color: #797979 !important;">Income - Expense</p>';
var ltooltip = {
    fill: '#707070',
    enable: true,
    shared: true,
    format: '${series.name} : ${point.y}',
    header: 'Month - ${point.x} '
};
var lBorder = { width: 0.5, color: '#A16EE5' };
var lchartArea = {
    border: { width: 0 }
};
var lprimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    majorGridLines: { width: 0 },
    intervalType: 'Months'
};
var lprimaryYAxis = {
    maximum: 1800,
    interval: 300,
    labelFormat: 'c0'
};
var lanimation = { enable: false };
var lmargin = { top: 90 };
var lineChartData;
var lmarker = {
    visible: true,
    width: 10,
    height: 10,
    fill: 'white',
    border: { width: 2, color: '#0470D8' },
};
var dataSource = [];
var lineD = [];
var lineDS = [];
var tempData;
var legendData = [];
var tempLineDS = {};
var colIncomeDS = [];
var colExpenseDS = [];
var tempIncomeDS = {};
var tempExpenseDS = {};
var curDateTime;
var colChartIncomeData;
var colChartExpenseData;
var groupValue;
var pieLegendData = [];
var colorPalettes = ['#61EFCD', '#CDDE1F', '#FEC200', '#CA765A', '#2485FA', '#F57D7D', '#C152D2', '#8854D9', '#3D4EB8',
    '#00BCD7'];
var dataLabel = {
    name: 'x', visible: true,
    position: 'Outside', connectorStyle: { length: '10%' },
    font: { color: 'Black', size: '14px', fontFamily: 'Roboto' }
};
;
var pieRenderingData = [];
var accanimation = { enable: false };
var enableLegend = false;
var pieRenderData = [];
var primaryXAxis = {
    labelFormat: 'MMM',
    valueType: 'DateTime',
    intervalType: 'Months',
    edgeLabelPlacement: 'Shift'
};
var primaryYAxis = {
    minimum: 3000,
    maximum: 9000,
    labelFormat: 'c0'
};
var legendSettings;
var margin;
var titleStyle;
var tooltip;
var animation;
var marker;
var cBorder;
var showWaitingPopup = false;
titleStyle = { textAlignment: 'Near', fontWeight: '500', size: '16', color: '#000' };
legendSettings = { visible: true };
tooltip = {
    fill: '#707070',
    enable: true,
    shared: true,
    format: '${series.name} : ${point.y}',
    header: 'Month - ${point.x} ',
};
marker = { visible: true, height: 10, width: 10 };
margin = { top: 90 };
cBorder = { width: 0.5, color: '#A16EE5' };
animation = { enable: false };
var expTotal = 0;
var category = [];
var hiGridData;
var initialRender = true;
var piedata;
// Function to handle date range change
function onDateRangeChange(args) {
    start = args.startDate;
    end = args.endDate;
    predicateStart = new ej2_data_1.Predicate('DateTime', 'greaterthanorequal', args.startDate);
    predicateEnd = new ej2_data_1.Predicate('DateTime', 'lessthanorequal', args.endDate);
    predicate = predicateStart.and(predicateEnd);
    getTotalExpense();
    updateChartData();
    refreshPieChart();
    setTimeout(function () {
        pie.refresh();
        lineChart.refresh();
        columnChart.refresh();
    }, 400);
    setTimeout(function () {
        createLegendData('pieUpdate');
    }, 1000);
}
// Function to update chart data based on income and expense types
function updateChartData() {
    new ej2_data_1.DataManager(exp).executeQuery(new ej2_data_1.Query()
        .where(predicate.and('TransactionType', 'equal', 'Expense')))
        .then(function (e) {
        colChartExpenseData = getColumnChartExpenseDS(e);
    });
    // Query and update income chart data, and line chart data
    new ej2_data_1.DataManager(exp).executeQuery(new ej2_data_1.Query()
        .where(predicate.and('TransactionType', 'equal', 'Income')))
        .then(function (e) {
        colChartIncomeData = getColumnChartIncomeDS(e);
        lineChartData = getLineChartDS();
        lineChart.series[0].dataSource = lineChartData;
        columnChart.series[0].dataSource = colChartIncomeData;
        columnChart.series[1].dataSource = colChartExpenseData;
    });
}
/** Sets the pie chart's font size based on its size */
function getFontSize(width) {
    if (width > 300) {
        return '13px';
    }
    else if (width > 250) {
        return '8px';
    }
    else {
        return '6px';
    }
}
// Function for initial rendering
function initialRenderr() {
    start = new Date("5/31/2017");
    end = new Date("11/30/2017");
    expenseDS = diagram_data_1.expenseData;
    predicateStart = new ej2_data_1.Predicate('DateTime', 'greaterthanorequal', start);
    predicateEnd = new ej2_data_1.Predicate('DateTime', 'lessthanorequal', end);
    predicate = predicateStart.and(predicateEnd);
    dataSource = diagram_data_1.expenseData;
    refreshPieChart();
    updateChartData();
    lineChart.refresh();
    columnChart.refresh();
    lGrid.refresh();
    pie.refresh();
}
// Function to refresh pie chart
function refreshPieChart() {
    getTotalExpense();
    createLegendData('pieUpdate');
    pie.series[0].dataSource = piedata;
}
// Function to assign object properties from result to array
function objectAssign(e) {
    var result = [];
    var obj;
    obj = (0, ej2_base_2.extend)(obj, e.result, {}, true);
    for (var data = 0; data < Object.keys(e.result).length; data++) {
        result.push(obj[data]);
    }
    return result;
}
// Function to get column chart data for income
function getColumnChartIncomeDS(e) {
    colIncomeDS = [];
    tempIncomeDS = [];
    var result = objectAssign(e);
    for (var i = 0; i < result.length; i++) {
        var cur = result[i];
        if (cur.DateTime.getMonth() in tempIncomeDS) {
            curDateTime = tempIncomeDS[cur.DateTime.getMonth()];
            tempIncomeDS[cur.DateTime.getMonth()].Amount = parseInt(curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
        }
        else {
            tempIncomeDS[cur.DateTime.getMonth()] = cur;
            tempIncomeDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(tempIncomeDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
        }
    }
    for (var data in tempIncomeDS) {
        colIncomeDS.push(tempIncomeDS[data]);
    }
    return colIncomeDS;
}
// Function to get column chart data for expense
function getColumnChartExpenseDS(e) {
    colExpenseDS = [];
    tempExpenseDS = [];
    var result = objectAssign(e);
    for (var i = 0; i < result.length; i++) {
        var cur = result[i];
        if (cur.DateTime.getMonth() in tempExpenseDS) {
            curDateTime = tempExpenseDS[cur.DateTime.getMonth()];
            tempExpenseDS[cur.DateTime.getMonth()].Amount = parseInt(curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
        }
        else {
            tempExpenseDS[cur.DateTime.getMonth()] = cur;
            tempExpenseDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(tempExpenseDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
        }
    }
    for (var data in tempExpenseDS) {
        colExpenseDS.push(tempExpenseDS[data]);
    }
    return colExpenseDS;
}
// Function to get line chart data
function getLineChartDS() {
    lineD = [];
    lineDS = [];
    tempLineDS = [];
    var result = [];
    var obj;
    obj = (0, ej2_base_2.extend)(obj, (colIncomeDS.concat(colExpenseDS)), {}, true);
    for (var data = 0; data < Object.keys((colIncomeDS.concat(colExpenseDS))).length; data++) {
        result.push(obj[data]);
    }
    tempLineDS = result;
    for (var i = 0; i < tempLineDS.length; i++) {
        var cur = tempLineDS[i];
        if (cur.DateTime.getMonth() in lineD) {
            curDateTime = lineD[cur.DateTime.getMonth()];
            lineD[cur.DateTime.getMonth()].Amount = Math.abs((parseInt(curDateTime.Amount, 0) - parseInt(cur.Amount, 0)));
        }
        else {
            lineD[cur.DateTime.getMonth()] = cur;
        }
    }
    for (var data = 0; data <= lineD.length; data++) {
        if (lineD[data]) {
            lineDS.push(lineD[data]);
        }
    }
    return lineDS;
}
// Function called when accumulation chart loaded
function acconChartLoaded(args) {
    createLegendData('pie');
    enableLegend = true;
}
// Function to create legend data for pie chart
function createLegendData(initiate) {
    if (pieRenderingData.length > 10) {
        pie.series[0].groupTo = groupValue.toString();
        pie.dataBind();
    }
    if (pie && (initiate === 'pieUpdate' || pieLegendData.length === 0)) {
        pieLegendData = [];
        pieLegendData = pie.visibleSeries[0].points;
    }
    pieRenderData = [];
    for (var i = 0; i < pieLegendData.length; i++) {
        var rowdata = pieLegendData[i];
        if (rowdata.text.indexOf('Others') > -1) {
            rowdata.x = ((rowdata.y / expTotal) * 100).toFixed(2).toString() + '%';
        }
        pieRenderData.push(rowdata);
    }
    if (pieLegendData.length > 0) {
        lGrid.dataSource = pieLegendData;
    }
}
// Function called when text rendered for accumulation chart
function onTextRender(args) {
    args.series.dataLabel.font.size = getFontSize(pie.initialClipRect.width);
    pie.animateSeries = true;
    if (args.text.indexOf('Others') > -1) {
        args.text = 'Others';
    }
}
// Function called when animation completed for accumulation chart
function onAnimateCompleted(args) {
    var element = document.getElementById('total-expense_datalabel_Series_0');
    if (!(0, ej2_base_1.isNullOrUndefined)(element)) {
        element.style.visibility = 'visible';
    }
}
// Function to calculate total expense
function getTotalExpense() {
    tempData = dataSource;
    var renderingData = [];
    tempData.forEach(function (item) {
        if (item.TransactionType === 'Expense' && start.valueOf() <= item.DateTime.valueOf()
            && end.valueOf() >= item.DateTime.valueOf()) {
            expTotal += Number(item.Amount);
            legendData.push(item);
            if (category.indexOf(item.Category) < 0) {
                category.push(item.Category);
            }
        }
    });
    /* tslint:disable */
    category.forEach(function (str) {
        var total = 0;
        legendData.forEach(function (item) {
            if (str === item.Category) {
                total += Number(item.Amount);
            }
        });
        var percent = ((total / expTotal) * 100).toFixed(2) + '%';
        renderingData.push({ x: str, y: total, text: percent });
    });
    pieRenderingData = new ej2_data_1.DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new ej2_data_1.Query().sortByDesc('y')));
    if (pieRenderingData.length > 10) {
        var temp = (new ej2_data_1.DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new ej2_data_1.Query().sortByDesc('y').range(0, 9)))[8]);
        groupValue = (temp.y - 1).toString();
        hiGridData = new ej2_data_1.DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new ej2_data_1.Query().sortByDesc('y').skip(9)));
        piedata = new ej2_data_1.DataManager(JSON.parse(JSON.stringify(renderingData)))
            .executeLocal((new ej2_data_1.Query().sortByDesc('y').range(0, 10)));
    }
}
// Function called when grid loaded
function onGridLoad() {
    createLegendData('pie');
    showWaitingPopup = true;
}
// Function called when chart loaded
function onChartLoaded(args) {
    if (initialRender) {
        initialRender = false;
    }
    else {
        initialRender = false;
    }
}
// Function called when grid data bound
function onGridDataBound(args) {
    showWaitingPopup = false;
}
// Function to define diagram template
function diagramTemplate(props) {
    if (props.id === "node") {
        return (React.createElement("div", { className: "diagram_border_cus diagram_border_cal" },
            React.createElement("div", { id: "element_calander" },
                React.createElement(ej2_react_calendars_1.DateRangePickerComponent, { id: "daterangepicker", presets: datePresets, placeholder: 'Select a range', startDate: start, endDate: end, min: minDate, max: maxDate, change: datachange }),
                "  ")));
    }
    if (props.id === "lchart") {
        return (React.createElement("div", { className: "diagram_border_cus diagram_chart" },
            React.createElement("div", { id: "lineChart" },
                React.createElement(ej2_react_charts_2.ChartComponent, { id: 'Linecharts', chartArea: lchartArea, ref: function (lchart) { return (lineChart = lchart); }, primaryXAxis: lprimaryXAxis, primaryYAxis: lprimaryYAxis, margin: lmargin, useGroupingSeparator: true, tooltip: ltooltip },
                    React.createElement(ej2_react_charts_2.Inject, { services: [ej2_react_charts_2.ColumnSeries, ej2_react_charts_2.Category, ej2_react_charts_2.ChartAnnotation, ej2_react_charts_2.AreaSeries, ej2_react_charts_2.Legend, ej2_react_charts_2.Tooltip, ej2_react_charts_2.DataLabel, ej2_react_charts_2.LineSeries, ej2_react_charts_2.DateTime] }),
                    React.createElement(ej2_react_charts_2.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_2.AnnotationDirective, { content: content1, region: 'Chart', coordinateUnits: 'Pixel', x: '75px', y: '9%' })),
                    React.createElement(ej2_react_charts_2.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_2.SeriesDirective, { dataSource: lineChartData, fill: 'rgba(4, 112, 216, 0.3)', animation: lanimation, marker: lmarker, border: lBorder, xName: 'DateTime', yName: 'Amount', width: 2, name: 'Amount', type: 'Area' }))))));
    }
    if (props.id === "colchart") {
        return (React.createElement("div", { className: "diagram_border_cus diagram_chart" },
            " ",
            React.createElement("div", { id: "barChart" },
                React.createElement(ej2_react_charts_2.ChartComponent, { id: 'colcharts', ref: function (cchart) { return (columnChart = cchart); }, primaryXAxis: primaryXAxis, primaryYAxis: primaryYAxis, margin: margin, useGroupingSeparator: true, legendSettings: legendSettings, titleStyle: titleStyle, loaded: onChartLoaded, tooltip: tooltip },
                    React.createElement(ej2_react_charts_2.Inject, { services: [ej2_react_charts_2.ColumnSeries, ej2_react_charts_2.Category, ej2_react_charts_2.ChartAnnotation, ej2_react_charts_2.AreaSeries, ej2_react_charts_2.Legend, ej2_react_charts_2.Tooltip, ej2_react_charts_2.DataLabel, ej2_react_charts_2.LineSeries, ej2_react_charts_2.DateTime] }),
                    React.createElement(ej2_react_charts_2.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_2.AnnotationDirective, { content: content2, region: 'Chart', coordinateUnits: 'Pixel', x: '75px', y: '9%' })),
                    React.createElement(ej2_react_charts_2.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_2.SeriesDirective, { dataSource: colChartIncomeData, animation: animation, legendShape: 'Circle', marker: marker, border: cBorder, xName: 'DateTime', yName: 'Amount', width: 2, name: 'Income', fill: '#A16EE5', type: 'Column' }),
                        React.createElement(ej2_react_charts_2.SeriesDirective, { dataSource: colChartExpenseData, animation: animation, legendShape: 'Circle', marker: marker, border: cBorder, xName: 'DateTime', yName: 'Amount', width: 2, name: 'Expense', fill: '#4472C4', type: 'Column' }))),
                " ")));
    }
    if (props.id === "pie") {
        return (React.createElement("div", { id: "diagram_control", className: "diagram_border_cus" },
            React.createElement("div", { className: "pane col-xs-12 col-sm-12 col-md-12 pie-container" },
                React.createElement("div", { className: "pieChartHeader" },
                    React.createElement("p", { className: "chart-title" }, "Total Expenses"),
                    React.createElement("p", { id: "rangeDate", className: "chart-value" }, "Jun 1 - Dec 1")),
                React.createElement("div", { id: "pieChart", style: { height: '100%', width: '49%', overflow: 'hidden', float: 'left' } },
                    React.createElement(ej2_react_charts_1.AccumulationChartComponent, { style: { display: 'block' }, ref: function (pies) { return (pie = pies); }, id: 'pieChart', width: '100%', height: '350px', legendSettings: acclegendSettings, enableSmartLabels: true, textRender: onTextRender, animationComplete: onAnimateCompleted, loaded: acconChartLoaded },
                        React.createElement(ej2_react_charts_2.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip] }),
                        React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { xName: 'text', yName: 'y', startAngle: 0, legendShape: 'Circle', endAngle: 360, innerRadius: '50%', radius: '83%', groupTo: groupValue, palettes: colorPalettes, dataLabel: dataLabel, dataSource: pieRenderingData, animation: accanimation })))),
                React.createElement("div", { id: "grid", style: { height: '100%', width: '49%', overflow: 'hidden', float: 'left' } },
                    React.createElement(ej2_react_grids_1.GridComponent, { id: "legend-grid", ref: function (lGrids) { return (lGrid = lGrids); }, dataSource: pieRenderData, load: onGridLoad, style: { boxShadow: 'none' }, rowTemplate: gtemplate, dataBound: onGridDataBound },
                        React.createElement(ej2_react_charts_2.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.RowDD, ej2_react_grids_1.Toolbar, ej2_react_grids_1.ColumnChooser, ej2_react_grids_1.DetailRow, ej2_react_grids_1.ColumnMenu, ej2_react_grids_1.Selection, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.Group] }),
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { width: '10%', textAlign: "Center" }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { width: '50%' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { width: '20%' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { width: '20%' })))))));
    }
}
// Class for HTML node with rendering complete function
var HtmlNode = /** @class */ (function (_super) {
    __extends(HtmlNode, _super);
    function HtmlNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlNode.prototype.rendereComplete = function () {
        initialRenderr();
        diagramInstance.fitToPage();
    };
    HtmlNode.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { id: "custom-diagram", className: "control-section" },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", backgroundColor: '#f5f5f5', height: "1100px", nodes: nodes, nodeTemplate: template.bind(this) })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows how to host an element of HTML within a node. The expense tracker application can be created using chart and grid components.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example illustrates how an HTML control is hosted inside a node. By setting ",
                    React.createElement("code", null, "HTML"),
                    " to the type property of the shape, the template node can be enabled. You can define the content to be hosted by using ",
                    React.createElement("code", null, "NodeTemplate"),
                    "."),
                React.createElement("br", null))));
    };
    return HtmlNode;
}(sample_base_1.SampleBase));
exports.HtmlNode = HtmlNode;
