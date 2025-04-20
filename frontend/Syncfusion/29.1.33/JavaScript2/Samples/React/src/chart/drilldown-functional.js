"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    #category:hover {\n        cursor: pointer;\n    }";
var isparent = true;
var Drilldown = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Automobile Sales by Category'), titleContent = _a[0], setTitleContent = _a[1];
    var _b = (0, react_1.useState)(''), textContent = _b[0], setTextContent = _b[1];
    var _c = (0, react_1.useState)(false), isVisible = _c[0], setIsVisible = _c[1];
    var _d = (0, react_1.useState)(false), isEnableSmartLabels = _d[0], setIsEnableSmartLables = _d[1];
    var _e = (0, react_1.useState)('hidden'), visibility = _e[0], setVisibility = _e[1];
    var data = [
        { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
        { x: 'Minivan', y: 23 }
    ];
    var suvs = [
        { x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
        { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }
    ];
    var cars = [
        { x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 }, { x: 'Tata', y: 10 },
        { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }
    ];
    var pickups = [
        { x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
        { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }
    ];
    var minivans = [
        { x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 }, { x: 'Jaguar', y: 9 },
        { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }
    ];
    var dataLabel = {
        visible: true, position: 'Inside', enableRotation: false, connectorStyle: { type: 'Curve', length: '5%' }, font: { fontWeight: '600', color: 'white' }
    };
    var title = 'Automobile Sales by Category';
    var pie = (0, react_1.useRef)(null);
    var onTextRender = function (args) {
        args.text = args.point.x + ' ' + args.point.y + '%';
    };
    var onChartMouseClick = function (args) {
        var index = (0, ej2_react_charts_1.indexFinder)(args.target);
        if (isparent && document.getElementById('pie-chart_Series_' + index.series + '_Point_' + index.point)) {
            isparent = false;
            switch (index.point) {
                case 0:
                    pie.current.series[0].dataSource = suvs;
                    setTitleContent('Automobile Sales in the SUV Segment');
                    setTextContent('SUV');
                    break;
                case 1:
                    pie.current.series[0].dataSource = cars;
                    setTitleContent('Automobile Sales in the Car Segment');
                    setTextContent('Car');
                    break;
                case 2:
                    pie.current.series[0].dataSource = pickups;
                    setTitleContent('Automobile Sales in the Pickup Segment');
                    setTextContent('Pickup');
                    break;
                case 3:
                    pie.current.series[0].dataSource = minivans;
                    setTitleContent('Automobile Sales in the Minivan Segment');
                    setTextContent('Minivan');
                    break;
            }
            if (pie.current.theme === 'HighContrast' || pie.current.theme.indexOf('Dark') > -1) {
                pie.current.annotations = [{
                        content: '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>', region: 'Series', x: '50%', y: '50%'
                    }];
            }
            else {
                pie.current.annotations = [{
                        content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' + '<img src="./src/chart/images/back.png" id="imgback" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
                    }];
            }
            pie.current.series[0].innerRadius = '30%';
            pie.current.series[0].radius = ej2_base_1.Browser.isDevice ? '90%' : '80%';
            pie.current.series[0].explode = false;
            pie.current.series[0].animation.enable = false;
            pie.current.series[0].dataLabel.connectorStyle.length = '20px';
            pie.current.series[0].dataLabel.position = ej2_base_1.Browser.isDevice ? 'Inside' : 'Outside';
            pie.current.series[0].dataLabel.enableRotation = true;
            pie.current.series[0].dataLabel.font.color = '';
            setIsVisible(false);
            pie.current.visibleSeries[0].explodeIndex = null;
            setIsEnableSmartLables(true);
            pie.current.refresh();
            setVisibility('visible');
        }
        if (args.target.indexOf('back') > -1) {
            hide(document.getElementById(args.target));
        }
    };
    var onClick = function (e) {
        hide(e.target);
    };
    var hide = function (target) {
        pie.current.series[0].dataSource = data;
        pie.current.series[0].innerRadius = '0%';
        pie.current.series[0].animation.enable = false;
        isparent = true;
        pie.current.series[0].explode = false;
        pie.current.annotations = [];
        pie.current.annotationModule['annotations'] = [];
        pie.current.series[0].dataLabel = dataLabel;
        setTitleContent(title);
        setIsVisible(false);
        setIsEnableSmartLables(true);
        pie.current.refresh();
        target.style.visibility = 'hidden';
        setVisibility('hidden');
    };
    var onChartLoad = function (args) {
        var chart = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        var selectedTheme = (0, theme_color_1.loadAccumulationChartTheme)(args);
        if (selectedTheme === 'HighContrast' || selectedTheme.indexOf('Dark') > -1) {
            args.accumulation.series[0].dataLabel.font.color = "white";
            if (args.accumulation.annotations[0] && !isparent) {
                args.accumulation.annotations[0].content = '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>';
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "link" },
                React.createElement("a", { id: "category", onClick: onClick.bind(_this), style: { visibility: visibility, display: 'inline-block' } }, "Sales by Category"),
                React.createElement("p", { style: { visibility: visibility, display: 'inline-block' }, id: "symbol" }, "\u00A0>>\u00A0"),
                React.createElement("p", { id: "text", style: { visibility: visibility, display: 'inline-block' } }, textContent)),
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', ref: pie, title: titleContent, enableSmartLabels: isEnableSmartLabels, legendSettings: { visible: isVisible }, enableBorderOnMouseMove: false, tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' }, chartMouseClick: onChartMouseClick.bind(_this), textRender: onTextRender.bind(_this), load: load.bind(_this), loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationAnnotation] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: data, xName: 'x', yName: 'y', dataLabel: dataLabel, radius: '70%', explode: false })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates a drill down chart with a pie for automobiles sales by category. By clicking one category, you can navigate to other sub-categories where companies are differentiated.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to achieve the drilldown concept using a pie chart. Automobile sales are shown in different categories. By clicking each category, you can navigate to the next level, which shows the sales by categories made by each company. ",
                React.createElement("code", null, "Datalabels"),
                " are used in this sample to show information about the data points."),
            React.createElement("p", { style: { fontWeight: 500 } },
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Accumulation chart component features are segregated into individual feature-wise modules. To use datalabel, we need to inject DataLabel module ",
                React.createElement("code", null, "AccumulationDataLabel"),
                " into services"),
            React.createElement("p", null,
                "More information on the pie series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart", "aria-label": "Navigate to the documentation for Pie Chart in React Accumulation Chart component" }, "documentation section"),
                "."))));
};
exports.default = Drilldown;
