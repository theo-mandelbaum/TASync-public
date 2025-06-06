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
exports.RemoteData = exports.labelRender = exports.query = exports.dataManager = void 0;
/**
 * Sample for Remote data binding
 */
var React = require("react");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.dataManager = new ej2_data_1.DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders'
});
exports.query = new ej2_data_1.Query().take(5).where('Estimate', 'lessThan', 3, false);
var labelRender = function (args) {
    if (args.axis.orientation === 'Horizontal') {
        args.text = args.text.split(' ')[0];
    }
};
exports.labelRender = labelRender;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .waitingpopup {\n        position: absolute;\n        z-index: 100;\n        top: 0;\n        left: 0;\n        background-color: #fff;\n        border-radius: 50%;\n        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n        width: 50px;\n        height: 50px;\n    }\n    \n    .image {\n        position: absolute;\n        background-repeat: no-repeat;\n        background-image: url('src/chart/images/Medium-36px-spin.gif');\n        background-position: center;\n        width: 50px;\n        height: 50px;\n        padding: 6px;\n    }\n    #control-container {\n        padding: 0px !important;\n    }";
var RemoteData = /** @class */ (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = 1;
        _this.axisLabelRender = function (args) {
            if (args.axis.name === 'primaryYAxis') {
                args.text = '' + args.value * 1000;
            }
        };
        return _this;
    }
    RemoteData.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "waitingpopup", className: "waitingpopup", style: { display: "none" } },
                    React.createElement("span", { id: "gif", className: "image" })),
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: this.load.bind(this), primaryXAxis: { rangePadding: 'Additional', valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, primaryYAxis: { majorGridLines: { width: 1 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Freight rate in U.S. dollars' }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, axisLabelRender: this.axisLabelRender.bind(this), pointRender: this.pointRender.bind(this), tooltipRender: this.tooltipRender.bind(this), title: "Container freight rate", loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, tooltip: { enable: true, header: "<b>Freight rate</b>" } },
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
    RemoteData.prototype.pointRender = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = theme_color_1.fabricColors[args.point.index % 10];
        }
        else if (selectedTheme === 'material') {
            args.fill = theme_color_1.materialColors[args.point.index % 10];
        }
        else if (selectedTheme === 'highcontrast') {
            args.fill = theme_color_1.highContrastColors[args.point.index % 10];
        }
        else if (selectedTheme === 'fluent') {
            args.fill = theme_color_1.fluentColors[args.point.index % 10];
        }
        else if (selectedTheme === 'fluent-dark') {
            args.fill = theme_color_1.fluentDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind') {
            args.fill = theme_color_1.pointTailwindColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind-dark') {
            args.fill = theme_color_1.pointTailwindDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind3') {
            args.fill = theme_color_1.pointTailwind3Colors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind3-dark') {
            args.fill = theme_color_1.pointTailwind3DarkColors[args.point.index % 10];
        }
        else {
            args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
        }
    };
    RemoteData.prototype.onChartLoad = function (args) {
        var div = document.getElementById('waitingpopup');
        div.style.display = 'none';
        if (this.loaded) {
            this.loaded = 0;
            args.chart.refresh();
        }
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    RemoteData.prototype.tooltipRender = function (args) {
        args.text = '<b>' + args.data.pointX + ': ' + '$' + args.data.pointY * 1000;
    };
    ;
    RemoteData.prototype.load = function (args) {
        var div = document.getElementById('waitingpopup');
        div.style.display = 'block';
        var width = args.chart.element.offsetWidth;
        var height = args.chart.element.offsetHeight;
        div.style.top = (height ? height : 300 / 2 - 25) + 'px';
        div.style.left = (width / 2 - 25) + 'px';
        div.style.display = '';
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return RemoteData;
}(sample_base_1.SampleBase));
exports.RemoteData = RemoteData;
