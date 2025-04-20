"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelRender = exports.query = exports.dataManager = void 0;
/**
 * Sample for Remote data binding
 */
var React = require("react");
var react_1 = require("react");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.dataManager = new ej2_data_1.DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/orders'
});
exports.query = new ej2_data_1.Query().take(5);
var labelRender = function (args) {
    if (args.axis.orientation === 'Horizontal') {
        args.text = args.text.split(' ')[0];
    }
};
exports.labelRender = labelRender;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .waitingpopup {\n        position: absolute;\n        z-index: 100;\n        top: 0;\n        left: 0;\n        background-color: #fff;\n        border-radius: 50%;\n        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n        width: 50px;\n        height: 50px;\n    }\n    \n    .image {\n        position: absolute;\n        background-repeat: no-repeat;\n        background-image: url('src/chart/images/Medium-36px-spin.gif');\n        background-position: center;\n        width: 50px;\n        height: 50px;\n        padding: 6px;\n    }\n    #control-container {\n        padding: 0px !important;\n    }";
var RemoteData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var waitingpopref = (0, react_1.useRef)(null);
    var loaded = 1;
    var pointRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    var onChartLoad = function (args) {
        waitingpopref.current.style.display = 'none';
        if (loaded) {
            loaded = 0;
            args.chart.refresh();
        }
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var tooltipRender = function (args) {
        args.text = args.data.pointX + ': ' + '<b>' + '$' + args.data.pointY * 1000 + '</b>';
    };
    var axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '' + args.value * 1000;
        }
    };
    var load = function (args) {
        waitingpopref.current.style.display = 'block';
        var width = args.chart.element.offsetWidth;
        var height = args.chart.element.offsetHeight;
        waitingpopref.current.style.top = (height ? height : 300 / 2 - 25) + 'px';
        waitingpopref.current.style.left = (width / 2 - 25) + 'px';
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "waitingpopup", ref: waitingpopref, className: "waitingpopup", style: { display: 'none', top: '0 px', left: '0 px' } },
                React.createElement("span", { id: "gif", className: "image" })),
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: load.bind(_this), primaryXAxis: { rangePadding: 'Additional', valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { majorGridLines: { width: 1 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Freight rate in U.S. dollars' }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, axisLabelRender: axisLabelRender.bind(_this), pointRender: pointRender.bind(_this), tooltipRender: tooltipRender.bind(_this), title: "Container freight rate", loaded: onChartLoad.bind(_this), legendSettings: { visible: false }, tooltip: { enable: true, header: "<b>Freight rate</b>" } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataManager, xName: 'CustomerID', type: 'Column', yName: 'Freight', name: 'Story Point', query: exports.query, animation: { enable: false }, marker: { dataLabel: { visible: true, position: 'Top', format: "{value}K", font: { fontWeight: '600', color: '#ffffff' }, } } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the way in which the Charts component can be bound to a remote service. The data source of the chart is bound to remote data using the DataManager component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Chart supports data binding. The ",
                React.createElement("code", null, " dataSource"),
                " property can be assigned with the instance of ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/data/api-dataManager.html", "aria-label": "Navigate to the reference for DataManager" }, "DataManager")),
                " to bind remote data."),
            React.createElement("p", null, "The DataManager, which will act as an interface between the service endpoint and the chart, will require the below minimal information to interact with service endpoint properly."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager->url"),
                    " - Defines the service endpoint to fetch data"),
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager->adaptor"),
                    " - Defines the adaptor option. By default, ",
                    React.createElement("code", null, "ODataAdaptor"),
                    " is used for remote binding.")),
            React.createElement("p", null,
                "Adaptor is responsible for processing response and request from/to the service endpoint. ",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                " package provides some predefined adaptors which are designed to interact with particular service endpoints. They are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "UrlAdaptor"),
                    " - Use this to interact any remote services. This is the base adaptor for all remote based adaptors."),
                React.createElement("li", null,
                    React.createElement("code", null, "ODataAdaptor"),
                    " - Use this to interact with OData endpoints."),
                React.createElement("li", null,
                    React.createElement("code", null, "ODataV4Adaptor"),
                    " - Use this to interact with OData V4 endpoints."),
                React.createElement("li", null,
                    React.createElement("code", null, "WebApiAdaptor"),
                    " - Use this to interact with Web API created under OData standards."),
                React.createElement("li", null,
                    React.createElement("code", null, "WebMethodAdaptor"),
                    " - Use this to interact with web methods.")),
            React.createElement("p", null,
                "In this demo, remote data is bound by assigning service data as an instance of ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/data/api-dataManager.html", "aria-label": "Navigate to the reference for DataManager" }, "DataManager")),
                " to the ",
                React.createElement("code", null, " dataSource"),
                " property."),
            React.createElement("p", null,
                "More information about the remote data binding can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#remote-data", "aria-label": "Navigate to the documentation for Remote Data binding in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = RemoteData;
