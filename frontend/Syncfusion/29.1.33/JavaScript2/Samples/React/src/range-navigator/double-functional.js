"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backgroundColor = exports.theme = exports.selectedTheme = exports.chartAnnotation = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Numeric Axis Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var double_data_1 = require("./double-data");
var theme_color_1 = require("./theme-color");
exports.chartAnnotation = [];
exports.chartAnnotation.push({ content: '<div id="exchangeRate"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '85%', y: '15%' });
exports.selectedTheme = (0, theme_color_1.loadRangeNavigatorTheme)(null, true);
exports.theme = (exports.selectedTheme.charAt(0).toUpperCase() + exports.selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
exports.backgroundColor = 'white';
getAnnotation(double_data_1.aus, (0, ej2_react_charts_1.getSeriesColor)(exports.theme)[0]);
getAnnotation(double_data_1.sl, (0, ej2_react_charts_1.getSeriesColor)(exports.theme)[1]);
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px;\n     }\n     #title{\n         font-size: 15px;\n         font-style: normal;\n         font-family: \"Segoe UI\";\n         font-weight: 500;\n         text-anchor: middle;\n         transform: none;\n         opacity: 1;\n     }\n     ";
function NumericAxis() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chart1;
    var rangenavigator1;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row", style: { textAlign: "center" } },
                React.createElement("div", { id: "title" }, "Score Comparision AUS vs SL")),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'double', ref: function (rangenavigator) { return rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, labelPosition: 'Outside', tooltip: { enable: true }, load: rangeLoad.bind(this), changed: changed.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', tooltipRender: renderTooltip.bind(this), value: [31, 50] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeTooltip] }),
                    React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: double_data_1.aus, xName: 'x', yName: 'y' }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: double_data_1.sl, xName: 'x', yName: 'y' })))),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Overs',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 },
                        labelFormat: 'n1'
                    }, primaryYAxis: {
                        title: 'Runs',
                        minimum: 0,
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', theme: exports.theme, annotations: exports.chartAnnotation, legendSettings: { visible: false }, load: chartLoad.bind(this), loaded: chartLoaded.bind(this), axisLabelRender: labelRender.bind(this), chartArea: { border: { width: 0 } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: double_data_1.aus, xName: 'x', yName: 'y', name: 'AUS', type: 'Spline', width: 2, animation: { enable: false } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: double_data_1.sl, xName: 'x', yName: 'y', name: 'SL', type: 'Spline', width: 2, animation: { enable: false } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the cricket match data between two countries with the help of numeric axis in range navigator.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Numeric axis is used to plot numeric data in range navigator. To render numeric axis, set ",
                    React.createElement("code", null, "valueType"),
                    " to ",
                    React.createElement("code", null, "Double"),
                    ". Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed.")))));
    function changed(args) {
        if (chart1) {
            chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            chart1.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    }
    ;
    function chartLoad(args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var series1 = (0, ej2_react_charts_1.getSeriesColor)(exports.theme)[0];
        var series2 = (0, ej2_react_charts_1.getSeriesColor)(exports.theme)[1];
        var html = '<table>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
        html += '</table>';
        args.chart.annotations[0].content = '<div id="exchangeRate" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
            ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>';
    }
    ;
    function labelRender(args) {
        if (args.axis.orientation === 'Horizontal') {
            var value = Math.abs(Number(args.text));
            args.text = String(value);
        }
    }
    function chartLoaded(args) {
        var series1 = args.chart.visibleSeries[0].interior;
        var series2 = args.chart.visibleSeries[1].interior;
        var html = '<table>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
        html += '</table>';
        if (chart1) {
            chart1.setAnnotationValue(0, '<div id="exchangeRate" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' +
                html +
                '</div>');
        }
    }
    ;
    function rangeLoad(args) {
        (0, theme_color_1.loadRangeNavigatorTheme)(args);
    }
    ;
    function renderTooltip(args) {
        var text = parseFloat(args.text[0]);
        text = Math.round(text);
        var text1 = text.toString();
        args.text[0] = text1;
    }
}
function getAnnotation(args, color) {
    for (var i = 0; i < args.length; i++) {
        if (args[i].isWicket) {
            exports.chartAnnotation.push({
                content: '<div id= "wicket" style="width: 20px; height:20px; border-radius: 5px;' +
                    'background: ' + exports.backgroundColor + '; border: 2px solid ' + color + '; color:' + color + '">W</div>',
                x: args[i].x,
                y: args[i].y,
                coordinateUnits: 'Point'
            });
        }
    }
}
exports.default = NumericAxis;
