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
exports.BubbleTypes = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./table-bubble-data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
var BubbleTypes = /** @class */ (function (_super) {
    __extends(BubbleTypes, _super);
    function BubbleTypes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Size' },
            { value: 'Color' },
            { value: 'Sector' }
        ];
        return _this;
    }
    BubbleTypes.prototype.change = function (e) {
        var type = document.getElementById('LegendPosition');
        this.heatmap.cellSettings.bubbleType = type.value;
        this.heatmap.refresh();
    };
    BubbleTypes.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", null,
                React.createElement("div", { className: 'col-md-9 control-section' },
                    React.createElement("style", null, SAMPLE_CSS),
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                            text: 'Female Participation Rate in Labor Force for the Countries',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
                            labelRotation: 45,
                            labelIntersectAction: 'None',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, yAxis: {
                            labels: ['1995', '2000', '2005', '2010', '2015'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, dataSource: data.tableBubbleData, cellSettings: {
                            border: {
                                width: 1
                            },
                            showLabel: false,
                            tileType: 'Bubble',
                            bubbleType: 'Size'
                        }, tooltipRender: this.legendTooltip, paletteSettings: {
                            palette: [{ value: 35, color: '#50A3B1' },
                                { value: 45, color: '#78D1BD' },
                                { value: 55, color: '#CAE8B4' },
                                { value: 65, color: '#EDF8B6' },
                                { value: 78, color: '#FFFFDA' }
                            ],
                        }, tooltipSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, load: this.load.bind(this), legendSettings: {
                            visible: true,
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        } },
                        React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })),
                    React.createElement("div", { id: "source" },
                        "Source:",
                        React.createElement("a", { href: "https://data.worldbank.org", target: '_blank' }, "https://data.worldbank.org/"))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: "none", title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null, "Bubble Type:")),
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "LegendPosition", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, text: "Size", value: "Size" }))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample visualizes the female participation rate of the total female population in the country\u2019s work force. In Bubble Heatmap, the data points can be visualized using bubble size, bubble shade and sector view types. In property panel, the options are available to change the view of the data points in the bubble Heatmap by means of dropdown.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to display the data points in bubble heatmap using multiple views such as bubble size, bubble shade and the sector. You can change the cell type to bubble by using the ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#tiletype" }, "tileType"),
                    " property in ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/" }, "cellSettings"),
                    " , and you can change the view of the bubble heatmap by using the ",
                    React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#bubbletype" }, "bubbleType"),
                    " property in ",
                    React.createElement("code", null, "cellSettings"),
                    "."),
                React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend" }, "Legend"),
                    " module using the ",
                    React.createElement("code", null, '<Inject services={[Tooltip, Legend]} />'),
                    " method."))));
    };
    BubbleTypes.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    ;
    BubbleTypes.prototype.legendTooltip = function (args) {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + ' %'];
    };
    ;
    return BubbleTypes;
}(sample_base_1.SampleBase));
exports.BubbleTypes = BubbleTypes;
