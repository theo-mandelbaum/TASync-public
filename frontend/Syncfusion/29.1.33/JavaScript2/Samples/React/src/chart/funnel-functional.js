"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.funnelData = void 0;
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
exports.funnelData = [
    { x: "Candidates Applied", y: 170, text: "Applications Received: 170" },
    { x: "Initial Validation", y: 145, text: "Initial Validation: 145" },
    { x: "Screening", y: 105, text: ej2_base_1.Browser.isDevice ? "Screening <br> Completed: 105" : "Screening Completed: 105" },
    { x: "Telephonic Interview", y: 85, text: ej2_base_1.Browser.isDevice ? "Phone <br> Interview: 85" : "Phone Interview: 85" },
    { x: "Personal Interview", y: 58, text: ej2_base_1.Browser.isDevice ? "Final <br> Interview: 58" : "Final Interview: 58" },
    { x: "Hired", y: 30, text: "Final <br> Selections: 30" }
];
var onPointRender = function (args) {
    (0, theme_color_1.funnelPointRender)(args);
};
var Funnel = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var funnelObj = (0, react_1.useRef)(null);
    var onChartLoad = function (args) {
        document.getElementById('funnel-chart').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row', style: { textAlign: "center" } },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { ref: funnelObj, legendSettings: { visible: false }, id: 'funnel-chart', title: 'Recruitment Funnel: From Application to Hiring', load: load.bind(_this), tooltip: { enable: false, format: '${point.x} : <b>${point.y}</b>' }, loaded: onChartLoad.bind(_this), pointRender: onPointRender.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.FunnelSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationLegend] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.funnelData, xName: 'x', yName: 'y', type: 'Funnel', explode: false, dataLabel: { connectorStyle: { length: '20px' }, name: 'text', visible: true, position: 'Inside', font: { fontWeight: '600', size: ej2_base_1.Browser.isDevice ? '11px' : '13px' } }, funnelMode: 'Trapezoidal' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React Funnel Chart example shows a funnel chart for recruitment process. Datalabels show information about the points.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a funnel chart to visualize the recruitment process. The ",
                React.createElement("code", null, "trapezoidal"),
                " funnelMode is set to display the stages of the employment cycle, from the number of candidates who applied to the number of hires. The labels are smartly arranged to avoid overlapping."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Funnel series, we need to inject ",
                React.createElement("code", null, "FunnelSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about the funnel series can be found in this ",
                React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/accumulation-chart/funnel/", "aria-label": "Navigate to the documentation for Funnel in React Accumulation Chart component" }, "documentation section"),
                "."))));
};
exports.default = Funnel;
