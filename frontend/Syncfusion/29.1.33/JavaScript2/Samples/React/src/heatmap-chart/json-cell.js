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
exports.JsonCell = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
var JsonCell = /** @class */ (function (_super) {
    __extends(JsonCell, _super);
    function JsonCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonCellData = [
            { 'rowid': 'France', 'columnid': '2010', 'value': '77.6' },
            { 'rowid': 'France', 'columnid': '2011', 'value': '79.4' },
            { 'rowid': 'France', 'columnid': '2012', 'value': '80.8' },
            { 'rowid': 'France', 'columnid': '2013', 'value': '86.6' },
            { 'rowid': 'France', 'columnid': '2014', 'value': '83.7' },
            { 'rowid': 'France', 'columnid': '2015', 'value': '84.5' },
            { 'rowid': 'France', 'columnid': '2016', 'value': '82.6' },
            { 'rowid': 'USA', 'columnid': '2010', 'value': '60.6' },
            { 'rowid': 'USA', 'columnid': '2011', 'value': '65.4' },
            { 'rowid': 'USA', 'columnid': '2012', 'value': '70.8' },
            { 'rowid': 'USA', 'columnid': '2013', 'value': '73.8' },
            { 'rowid': 'USA', 'columnid': '2014', 'value': '75.3' },
            { 'rowid': 'USA', 'columnid': '2015', 'value': '77.5' },
            { 'rowid': 'USA', 'columnid': '2016', 'value': '77.6' },
            { 'rowid': 'Spain', 'columnid': '2010', 'value': '64.9' },
            { 'rowid': 'Spain', 'columnid': '2011', 'value': '52.6' },
            { 'rowid': 'Spain', 'columnid': '2012', 'value': '60.8' },
            { 'rowid': 'Spain', 'columnid': '2013', 'value': '65.6' },
            { 'rowid': 'Spain', 'columnid': '2014', 'value': '52.6' },
            { 'rowid': 'Spain', 'columnid': '2015', 'value': '68.5' },
            { 'rowid': 'Spain', 'columnid': '2016', 'value': '75.6' },
            { 'rowid': 'China', 'columnid': '2010', 'value': '55.6' },
            { 'rowid': 'China', 'columnid': '2011', 'value': '52.3' },
            { 'rowid': 'China', 'columnid': '2012', 'value': '54.8' },
            { 'rowid': 'China', 'columnid': '2013', 'value': '51.1' },
            { 'rowid': 'China', 'columnid': '2014', 'value': '55.6' },
            { 'rowid': 'China', 'columnid': '2015', 'value': '56.9' },
            { 'rowid': 'China', 'columnid': '2016', 'value': '59.3' },
            { 'rowid': 'Italy', 'columnid': '2010', 'value': '43.6' },
            { 'rowid': 'Italy', 'columnid': '2011', 'value': '43.2' },
            { 'rowid': 'Italy', 'columnid': '2012', 'value': '55.8' },
            { 'rowid': 'Italy', 'columnid': '2013', 'value': '50.1' },
            { 'rowid': 'Italy', 'columnid': '2014', 'value': '48.5' },
            { 'rowid': 'Italy', 'columnid': '2015', 'value': '50.7' },
            { 'rowid': 'Italy', 'columnid': '2016', 'value': '52.4' },
            { 'rowid': 'UK', 'columnid': '2010', 'value': '28.2' },
            { 'rowid': 'UK', 'columnid': '2011', 'value': '31.6' },
            { 'rowid': 'UK', 'columnid': '2012', 'value': '29.8' },
            { 'rowid': 'UK', 'columnid': '2013', 'value': '33.1' },
            { 'rowid': 'UK', 'columnid': '2014', 'value': '32.6' },
            { 'rowid': 'UK', 'columnid': '2015', 'value': '34.4' },
            { 'rowid': 'UK', 'columnid': '2016', 'value': '35.8' },
            { 'rowid': 'Germany', 'columnid': '2010', 'value': '26.8' },
            { 'rowid': 'Germany', 'columnid': '2011', 'value': '29' },
            { 'rowid': 'Germany', 'columnid': '2012', 'value': '26.8' },
            { 'rowid': 'Germany', 'columnid': '2013', 'value': '27.6' },
            { 'rowid': 'Germany', 'columnid': '2014', 'value': '33' },
            { 'rowid': 'Germany', 'columnid': '2015', 'value': '35' },
            { 'rowid': 'Germany', 'columnid': '2016', 'value': '35.6' },
            { 'rowid': 'Mexico', 'columnid': '2010', 'value': '23.2' },
            { 'rowid': 'Mexico', 'columnid': '2011', 'value': '24.9' },
            { 'rowid': 'Mexico', 'columnid': '2012', 'value': '30.1' },
            { 'rowid': 'Mexico', 'columnid': '2013', 'value': '22.2' },
            { 'rowid': 'Mexico', 'columnid': '2014', 'value': '29.3' },
            { 'rowid': 'Mexico', 'columnid': '2015', 'value': '32.1' },
            { 'rowid': 'Mexico', 'columnid': '2016', 'value': '35' },
            { 'rowid': 'Thailand', 'columnid': '2010', 'value': '15.9' },
            { 'rowid': 'Thailand', 'columnid': '2011', 'value': '19.8' },
            { 'rowid': 'Thailand', 'columnid': '2012', 'value': '21.8' },
            { 'rowid': 'Thailand', 'columnid': '2013', 'value': '23.5' },
            { 'rowid': 'Thailand', 'columnid': '2014', 'value': '24.8' },
            { 'rowid': 'Thailand', 'columnid': '2015', 'value': '29.9' },
            { 'rowid': 'Thailand', 'columnid': '2016', 'value': '32.6' },
            { 'rowid': 'Austria', 'columnid': '2010', 'value': '22' },
            { 'rowid': 'Austria', 'columnid': '2011', 'value': '21.3' },
            { 'rowid': 'Austria', 'columnid': '2012', 'value': '24.2' },
            { 'rowid': 'Austria', 'columnid': '2013', 'value': '23.2' },
            { 'rowid': 'Austria', 'columnid': '2014', 'value': '25' },
            { 'rowid': 'Austria', 'columnid': '2015', 'value': '26.7' },
            { 'rowid': 'Austria', 'columnid': '2016', 'value': '28.1' },
        ];
        return _this;
    }
    JsonCell.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                            text: 'Most Visited Destinations by International Tourist Arrivals',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            labels: ['Austria', 'China', 'France', 'Germany', 'Italy', 'Mexico', 'Spain', 'Thailand', 'UK', 'USA'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, yAxis: {
                            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, dataSourceSettings: {
                            isJsonData: true,
                            adaptorType: 'Cell',
                            xDataMapping: 'rowid',
                            yDataMapping: 'columnid',
                            valueMapping: 'value'
                        }, dataSource: this.jsonCellData, cellSettings: {
                            border: {
                                radius: 4,
                                width: 1,
                                color: 'white'
                            },
                            showLabel: true,
                            format: '{value} M',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, tooltipSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, legendSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, load: this.load.bind(this), paletteSettings: {
                            palette: [{ color: '#DCD57E' },
                                { color: '#A6DC7E' },
                                { color: '#7EDCA2' },
                                { color: '#6EB5D0' }
                            ],
                        } },
                        React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_1.Adaptor] }))),
                React.createElement("div", { id: "source" },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/World_Tourism_rankings", target: "_blank" }, "https://en.wikipedia.org/"))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample visualizes the number of international tourist arrivals in millions of the most visited destinations in the world.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to bind JSON data and configure the Heatmap using the data adaptor support. You can bind the JSON data with information for each cell to the Heatmap using",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#isjsondata", target: "_blank" }, "isJsonData "),
                    " and by defining the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#adaptortype", target: "_blank" }, "adaptorType "),
                    " properties. In cell JSON data, the value for each cell is mapped using the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#xdatamapping", target: "_blank" }, "xDataMapping "),
                    ",",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#ydatamapping", target: "_blank" }, "yDataMapping "),
                    " and",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/dataModel/#valuemapping", target: "_blank" }, "valueMapping "),
                    "properties. "),
                React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are separated into discrete feature-based modules. To use a tooltip, adaptor and the legend, inject the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                    ", ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/adaptorType/", target: '_blank' }, "Adaptor "),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend" }, "Legend"),
                    " module using the ",
                    React.createElement("code", null, '<Inject services={[Tooltip, Adaptor, Legend]} />'),
                    " method."))));
    };
    JsonCell.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    ;
    return JsonCell;
}(sample_base_1.SampleBase));
exports.JsonCell = JsonCell;
