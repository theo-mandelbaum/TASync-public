"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotationTemplate = exports.data = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Range Navigator Period Selector with Candle Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var period_data_1 = require("./period-data");
var helper_1 = require("@syncfusion/ej2-svg-base/src/tooltip/helper");
var theme_color_1 = require("./theme-color");
exports.data = [];
for (var i = 2110; i < period_data_1.periodData.length - 20; i++) {
    exports.data.push({
        High: period_data_1.periodData[i].High,
        Low: period_data_1.periodData[i].Low,
        Close: period_data_1.periodData[i].Close,
        Open: period_data_1.periodData[i].Open,
        date: new Date(2010, 6, i)
    });
}
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px;\n     }\n     #rowStyle{\n         width:80%; transform: translateX(13%)\n     }\n     #text{ \n         transform:translateX(15%);       \n         display: flex; font-size: 36px; font-weight: 500;\n         align-items: center;\n         justify-content: space-between;\n         align:left;\n     }\n     .col-sm-4{\n         align : right;\n         margin-top: 1%\n     }\n     #chart_tooltip {\n         opacity: 0;\n     }\n     #switchname{\n         font-size: 16px; margin-right: 2%\n     }\n     #switchname-0{\n        font-size: 16px; margin-right: 2%\n    }\n     .e-switch-wrapper {\n         margin-top: 5%;\n         width: 15%\n     }\n     #chart_HorizontalLine, #chart_VerticalLine {\n             stroke-dasharray: 2\n     }\n     @media only screen and (max-width: 300px) {\n     #text {\n         font-size: 10px\n     }\n     }\n     ";
function annotationTemplate(props) {
    return (React.createElement("div", { id: "annotation" }));
}
exports.annotationTemplate = annotationTemplate;
function PeriodSelectorCandle() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chart1;
    var rangenavigator1;
    var rangenavigator2;
    var chartRendered;
    var range1Rendered;
    var range2Rendered;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row", id: "rowStyles" },
                React.createElement("div", { className: "col-sm-8" },
                    React.createElement("div", { id: "text" }, "Bitcoin (USD) Price")),
                React.createElement("div", { className: "col-sm-4" },
                    React.createElement("label", { id: "switchname-0", htmlFor: "checked-0" }, " Closing Price "),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "checked", checked: true, name: "Closing Value", value: "Closing Value", cssClass: "custom-iOS", change: switchChanged.bind(this) }),
                    React.createElement("label", { id: "switchname", htmlFor: "checked-1" }, " OHLC "))),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, valueType: 'DateTime', labelPosition: 'Outside', width: ej2_base_1.Browser.isDevice ? '100%' : '80%', xName: 'date', yName: 'Close', disableRangeSelector: true, dataSource: exports.data, periodSelectorSettings: {
                        position: 'Top',
                        periods: [
                            { text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' },
                            { text: '6M', interval: 6, intervalType: 'Months' }, { text: '1Y', interval: 1, intervalType: 'Years', selected: true },
                            { text: '2Y', interval: 2, intervalType: 'Years' }, { text: 'ALL' }
                        ]
                    }, load: rangeLoad.bind(this), loaded: rangeLoaded.bind(this), changed: changed.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.PeriodSelector] }))),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'chart', ref: function (chart) { return chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        majorGridLines: { width: 0 },
                        edgeLabelPlacement: 'Shift'
                    }, primaryYAxis: {
                        title: 'Price',
                        labelFormat: 'n0',
                        opposedPosition: true, lineStyle: { width: 0 }
                    }, height: '250', width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: chartLoad.bind(this), axisLabelRender: labelRender.bind(this), tooltipRender: renderTooltip.bind(this), chartMouseMove: mouseMove.bind(this), axisRangeCalculated: rangeCalculate.bind(this), chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true }, legendSettings: { visible: false }, zoomSettings: { enableMouseWheelZooming: true, mode: 'X', toolbarItems: [] }, crosshair: {
                        enable: true
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.ChartAnnotation,
                            ej2_react_charts_1.StripLine, ej2_react_charts_1.MomentumIndicator, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, width: 2, type: 'Candle', xName: 'date', low: 'Low', high: 'High', close: 'Close', volume: 'Volume', open: 'Open', name: 'Bitcoin', yName: 'Close', animation: { enable: false }, bearFillColor: '#2ecd71', bullFillColor: '#e74c3d' })),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: annotationTemplate, x: '15%', y: '25%', coordinateUnits: 'Pixel', region: 'Chart' })))),
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator2', ref: function (rangenavigator) { return rangenavigator2 = rangenavigator; }, style: { textAlign: "center" }, valueType: 'DateTime', labelPosition: 'Outside', width: ej2_base_1.Browser.isDevice ? '100%' : '80%', value: [new Date('2017-04-30'), new Date('2018-04-30')], load: rangeLoad2.bind(this), changed: changed2.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.PeriodSelector, ej2_react_charts_1.LineSeries] }),
                    React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: exports.data, xName: 'date', yName: 'Close', type: 'Line', width: 1 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a stock chart with candle series and a momentum indicator. Period Selector shows the information about the stock chart range values.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the Period Selector. Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Range Navigator component features are segregated into individual feature-wise modules. To use period selector, ",
                    React.createElement("code", null, "PeriodSelector"),
                    " module using ",
                    React.createElement("code", null, "RangeNavigator.Inject(PeriodSelector)"),
                    " method.")))));
    function changed(args) {
        if (rangenavigator2 && range2Rendered) {
            rangenavigator2.rangeSlider.setSlider(args.start.getTime(), args.end.getTime(), false, false);
        }
        if (chart1 && chartRendered) {
            chart1.primaryXAxis.zoomFactor = 1;
            chart1.primaryXAxis.zoomPosition = 0;
            var filterData = exports.data.filter(function (data) {
                return ((data.date).getTime() >= args.start.getTime() && (data.date).getTime() <= args.end.getTime());
            });
            chart1.series[0].dataSource = filterData;
            chart1.refresh();
            chart1.setAnnotationValue(0, '<div id="annotation"></div>');
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    }
    ;
    function changed2(args) {
        if (rangenavigator1 && range1Rendered) {
            rangenavigator1.periodSelectorModule.datePicker.startDate = args.start;
            rangenavigator1.periodSelectorModule.datePicker.endDate = args.end;
            rangenavigator1.dataBind();
        }
        if (chart1 && chartRendered) {
            chart1.primaryXAxis.zoomFactor = 1;
            chart1.primaryXAxis.zoomPosition = 0;
            var filterData = exports.data.filter(function (data) {
                return ((data.date).getTime() >= args.start.getTime() && (data.date).getTime() <= args.end.getTime());
            });
            chart1.series[0].dataSource = filterData;
            chart1.setAnnotationValue(0, '<div id="annotation"></div>');
            chart1.refresh();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    }
    ;
    function switchChanged(args) {
        if (chart1 && chartRendered) {
            chart1.series[0].type = !args.checked ? 'Line' : 'Candle';
            chart1.annotations[0].content = '';
            chart1.refresh();
        }
    }
    function rangeLoaded(args) {
        var element = (0, helper_1.getElement)('rangenavigator_Secondary_Element');
        if (!ej2_base_1.Browser.isDevice) {
            element.style.transform = 'translate(13%)';
        }
    }
    function chartLoad(args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        (0, theme_color_1.loadRangeNavigatorTheme)(args);
        args.chart.tooltip.format = args.chart.series[0].type === 'Candle' ?
            '${point.x}<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>' :
            '${point.x}<br/>Close : <b>${point.close}</b>';
        chartRendered = true;
    }
    ;
    function rangeLoad(args) {
        (0, theme_color_1.loadRangeNavigatorTheme)(args);
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
        range1Rendered = true;
    }
    ;
    function rangeLoad2(args) {
        (0, theme_color_1.loadRangeNavigatorTheme)(args);
        args.rangeNavigator.dateTimeModule = new ej2_react_charts_1.DateTime(args.rangeNavigator);
        range2Rendered = true;
    }
    ;
    function labelRender(args) {
        if (args.axis.title === 'Price') {
            var value = Math.round(Number(args.text)) / 1000;
            args.text = '$' + String(value) + 'k';
        }
    }
    function renderTooltip(args) {
        if (args.text.length > 0) {
            var text = args.text.split('<br/>');
            var html = '<table><thead>' + text[0] + '</thead>';
            var value = void 0;
            for (var i = 1; i < text.length; i++) {
                value = text[i].split(':');
                html += '<tr><td style="text-align:left;opacity:0.5">' + value[0] + ':</td><td style="padding-left: 5px;">$' +
                    (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
            }
            html += '</table>';
            chart1.setAnnotationValue(0, '<div id="annotation" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>');
        }
        args.text = '';
    }
    ;
    function mouseMove(args) {
        if (!(0, ej2_react_charts_1.withInBounds)(chart1.mouseX, chart1.mouseY, chart1.chartAxisLayoutPanel.seriesClipRect)) {
            removeSecondaryElement();
        }
    }
    ;
    function rangeCalculate(args) {
        if (chart1 && chartRendered) {
            chart1.setAnnotationValue(0, '<div></div>');
        }
    }
    ;
}
function removeSecondaryElement() {
    setTimeout(function () {
        if ((0, helper_1.getElement)("annotation")) {
            (0, ej2_base_1.remove)((0, helper_1.getElement)("annotation"));
        }
    }, 2000);
}
exports.default = PeriodSelectorCandle;
