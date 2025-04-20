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
exports.Drilldown = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    #category:hover {\n        cursor: pointer;\n    }";
var Drilldown = /** @class */ (function (_super) {
    __extends(Drilldown, _super);
    function Drilldown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [
            { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
            { x: 'Minivan', y: 23 }
        ];
        _this.suvs = [
            { x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
            { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }
        ];
        _this.cars = [
            { x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 }, { x: 'Tata', y: 10 },
            { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }
        ];
        _this.pickups = [
            { x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
            { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }
        ];
        _this.minivans = [
            { x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 }, { x: 'Jaguar', y: 9 },
            { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }
        ];
        _this.dataLabel = {
            visible: true, position: 'Inside', enableRotation: false, connectorStyle: { type: 'Curve', length: '5%' }, font: { fontWeight: '600', color: 'white' }
        };
        _this.title = 'Automobile Sales by Category';
        _this.isparent = true;
        _this.visibility = 'hidden';
        return _this;
    }
    Drilldown.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "link" },
                    React.createElement("a", { id: "category", onClick: this.onClick.bind(this), style: { visibility: this.visibility, display: 'inline-block' } }, "Sales by Category"),
                    React.createElement("p", { style: { visibility: this.visibility, display: 'inline-block' }, id: "symbol" }, "\u00A0>>\u00A0"),
                    React.createElement("p", { id: "text", style: { visibility: this.visibility, display: 'inline-block' } })),
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: function (pie) { return _this.pie = pie; }, title: this.title, enableSmartLabels: false, legendSettings: { visible: false }, enableBorderOnMouseMove: false, tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' }, chartMouseClick: this.onChartMouseClick.bind(this), textRender: this.onTextRender.bind(this), load: this.load.bind(this), loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationAnnotation] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: this.data, xName: 'x', yName: 'y', dataLabel: this.dataLabel, radius: '70%', explode: false })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates a drill down chart with a pie for automobiles sales by category. By clicking one category, you can navigate to other sub-categories where companies are differentiated.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to achieve the drilldown concept using a pie chart. Automobile sales are shown in different categories. By clicking each category, you can navigate to the next level, which shows the sales by categories made by each company. ",
                    React.createElement("code", null, "Datalabels"),
                    " are used in this sample to show information about the data points."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    " Accumulation chart component features are segregated into individual feature-wise modules. To use datalabel, we need to inject DataLabel module ",
                    React.createElement("code", null, "AccumulationDataLabel"),
                    " into services "),
                React.createElement("p", null,
                    "More information on the pie series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart", "aria-label": "Navigate to the documentation for Pie Chart in React Accumulation Chart component" }, "documentation section"),
                    "."))));
    };
    Drilldown.prototype.onTextRender = function (args) {
        args.text = args.point.x + ' ' + args.point.y + '%';
    };
    Drilldown.prototype.onChartMouseClick = function (args) {
        var index = (0, ej2_react_charts_1.indexFinder)(args.target);
        if (this.isparent && document.getElementById('pie-chart_Series_' + index.series + '_Point_' + index.point)) {
            this.isparent = false;
            switch (index.point) {
                case 0:
                    this.pie.series[0].dataSource = this.suvs;
                    this.pie.title = 'Automobile Sales in the SUV Segment';
                    document.getElementById('text').innerHTML = 'SUV';
                    break;
                case 1:
                    this.pie.series[0].dataSource = this.cars;
                    this.pie.title = 'Automobile Sales in the Car Segment';
                    document.getElementById('text').innerHTML = 'Car';
                    break;
                case 2:
                    this.pie.series[0].dataSource = this.pickups;
                    this.pie.title = 'Automobile Sales in the Pickup Segment';
                    document.getElementById('text').innerHTML = 'Pickup';
                    break;
                case 3:
                    this.pie.series[0].dataSource = this.minivans;
                    this.pie.title = 'Automobile Sales in the Minivan Segment';
                    document.getElementById('text').innerHTML = 'Minivan';
                    break;
            }
            if (this.pie.theme === 'HighContrast' || this.pie.theme.indexOf('Dark') > -1) {
                this.pie.annotations = [{
                        content: '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>', region: 'Series', x: '50%', y: '50%'
                    }];
            }
            else {
                this.pie.annotations = [{
                        content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' +
                            '<img src="./src/chart/images/back.png" id="imgback" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
                    }];
            }
            this.pie.series[0].innerRadius = '30%';
            this.pie.series[0].radius = ej2_base_1.Browser.isDevice ? '90%' : '80%';
            this.pie.series[0].explode = false;
            this.pie.series[0].animation.enable = false;
            this.pie.series[0].dataLabel.connectorStyle.length = '20px';
            this.pie.series[0].dataLabel.position = ej2_base_1.Browser.isDevice ? 'Inside' : 'Outside';
            this.pie.series[0].dataLabel.enableRotation = true;
            this.pie.series[0].dataLabel.font.color = '';
            this.pie.legendSettings.visible = false;
            this.pie.visibleSeries[0].explodeIndex = null;
            this.pie.enableSmartLabels = true;
            this.pie.refresh();
            this.visibility = 'visible';
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('symbol').style.visibility = 'visible';
            document.getElementById('text').style.visibility = 'visible';
        }
        if (args.target.indexOf('back') > -1) {
            this.hide(document.getElementById(args.target));
        }
    };
    Drilldown.prototype.onClick = function (e) {
        this.hide(e.target);
    };
    Drilldown.prototype.hide = function (target) {
        this.pie.series[0].dataSource = this.data;
        this.pie.series[0].innerRadius = '0%';
        this.pie.series[0].animation.enable = false;
        this.isparent = true;
        this.pie.series[0].explode = false;
        this.pie.annotations = [];
        this.pie.annotationModule['annotations'] = [];
        this.pie.series[0].dataLabel = this.dataLabel;
        this.pie.title = this.title;
        this.pie.legendSettings.visible = false;
        this.pie.enableSmartLabels = true;
        this.pie.refresh();
        target.style.visibility = 'hidden';
        this.visibility = 'hidden';
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    };
    Drilldown.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    Drilldown.prototype.load = function (args) {
        var selectedTheme = (0, theme_color_1.loadAccumulationChartTheme)(args);
        if (selectedTheme === 'HighContrast' || selectedTheme.indexOf('Dark') > -1) {
            args.accumulation.series[0].dataLabel.font.color = "white";
            if (args.accumulation.annotations[0] && !this.isparent) {
                args.accumulation.annotations[0].content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>';
            }
        }
    };
    return Drilldown;
}(sample_base_1.SampleBase));
exports.Drilldown = Drilldown;
