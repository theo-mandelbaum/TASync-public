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
exports.AccumulationDoughnut = exports.data1 = exports.pointRender = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme === 'fluent' || selectedTheme === 'bootstrap5') {
        args.fill = seriesColor[args.point.index % 10];
    }
    if (selectedTheme.indexOf('dark') > -1) {
        if (selectedTheme.indexOf('material') > -1) {
            args.border.color = '#303030';
        }
        else if (selectedTheme.indexOf('bootstrap5') > -1) {
            args.border.color = '#212529';
        }
        else if (selectedTheme.indexOf('bootstrap') > -1) {
            args.border.color = '#1A1A1A';
        }
        else if (selectedTheme.indexOf('fabric') > -1) {
            args.border.color = '#201f1f';
        }
        else if (selectedTheme.indexOf('fluent') > -1) {
            args.border.color = '#252423';
        }
        else if (selectedTheme.indexOf('bootstrap') > -1) {
            args.border.color = '#1A1A1A';
        }
        else if (selectedTheme.indexOf('tailwind') > -1) {
            args.border.color = '#1F2937';
        }
        else {
            args.border.color = '#222222';
        }
    }
    else if (selectedTheme.indexOf('highcontrast') > -1) {
        args.border.color = '#000000';
    }
    else {
        args.border.color = '#FFFFFF';
    }
};
exports.pointRender = pointRender;
var seriesColor = ['#FFE066', "#FAB666", "#F68F6A", "#F3646A", "#CC555A", "#9C4649"];
exports.data1 = [{ x: 'Chrome', y: 61.3, text: 'Chrome: 61.3%' },
    { x: 'Safari', y: 24.6, text: ej2_base_1.Browser.isDevice ? 'Safari: <br> 24.6%' : 'Safari: 24.6%' },
    { x: 'Edge', y: 5.0, text: 'Edge: 5.0%' },
    { x: 'Samsung Internet', y: 2.7, text: ej2_base_1.Browser.isDevice ? 'Samsung <br> Internet: 2.7%' : 'Samsung Internet: 2.7%' },
    { x: 'Firefox', y: 2.6, text: ej2_base_1.Browser.isDevice ? 'Firefox: <br> 2.6%' : 'Firefox: 2.6%' },
    { x: 'Others', y: 3.6, text: ej2_base_1.Browser.isDevice ? 'Others: <br> 3.6%' : 'Others: 3.6%' }];
var AccumulationDoughnut = /** @class */ (function (_super) {
    __extends(AccumulationDoughnut, _super);
    function AccumulationDoughnut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationDoughnut.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: "pie-chart", centerLabel: { text: 'Mobile<br>Browsers<br>Statistics', hoverTextFormat: '${point.x}<br>Browser Share<br>${point.y}%', textStyle: { fontWeight: '600', size: ej2_base_1.Browser.isDevice ? '7px' : '15px' } }, enableSmartLabels: true, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), pointRender: exports.pointRender, enableBorderOnMouseMove: false, legendSettings: { visible: false } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationDataLabel] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '65%', border: { width: 1 }, startAngle: ej2_base_1.Browser.isDevice ? 30 : 62, dataLabel: { visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }, radius: ej2_base_1.Browser.isDevice ? '40%' : '70%' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React donut chart example visualizes mobile browser statistics. The center label shows information about the data in the donut series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a donut chart. To create a donut in the pie series, we use the ",
                    React.createElement("code", null, "innerRadius"),
                    " property. The ",
                    React.createElement("code", null, "centerLabel"),
                    " property allows you to specify the default text that will be rendered in the center. You can also customize the text that will render when the mouse pointer is hovered over one of the donut slices using the ",
                    React.createElement("code", null, "hoverTextFormat"),
                    " property."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The Charts component\u2019s features are segregated into individual feature modules. To use pie chart, we need to inject ",
                    React.createElement("code", null, "PieSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about the donut series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/", "aria-label": "Navigate to the documentation for Doughnut Chart in React accumulation Chart component" }, "documentation section"),
                    "."))));
    };
    AccumulationDoughnut.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    AccumulationDoughnut.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return AccumulationDoughnut;
}(sample_base_1.SampleBase));
exports.AccumulationDoughnut = AccumulationDoughnut;
