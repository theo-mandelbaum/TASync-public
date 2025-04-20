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
exports.LargeData = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var ej2_react_heatmap_2 = require("@syncfusion/ej2-react-heatmap");
var sample_base_1 = require("../common/sample-base");
var data = require("./large-data.json");
var ej2_base_1 = require("@syncfusion/ej2-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}";
// custom code end
var LargeData = /** @class */ (function (_super) {
    __extends(LargeData, _super);
    function LargeData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LargeData.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                            text: 'Annual Flight Traffic Report',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            minimum: new Date(2017, 0, 1),
                            maximum: new Date(2017, 11, 31),
                            intervalType: 'Days',
                            valueType: 'DateTime',
                            labelFormat: 'MMM',
                            showLabelOn: 'Months',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, yAxis: {
                            labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8::00', '9:00', '10:00', '11:00',
                                '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
                                '22:00', '23:00', '24:00'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, paletteSettings: {
                            palette: [{ value: 150, color: '#A6DC7E' },
                                { value: 250, color: '#DCD57E' },
                                { value: 300, color: '#DC8D7E' },
                            ],
                            type: 'Gradient'
                        }, cellSettings: {
                            border: { width: 0 },
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, tooltipSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, renderingMode: 'Canvas', legendSettings: {
                            visible: false
                        }, load: this.load.bind(this), tooltipRender: this.tooltipTemplate, dataSource: data.largeData },
                        React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip, ej2_react_heatmap_2.Adaptor] })))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample visualizes the annual traffic report of an airport with the number of flight arrivals in a year. The data label is disabled in this sample, the tooltip displays the data point values.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to switch the Heatmap to canvas rendering mode.The rendering performance will be better in ",
                    React.createElement("code", null, "Canvas"),
                    " rendering mode, while loading large datasets. You can switch the rendering mode for Heatmap between ",
                    React.createElement("code", null, "SVG"),
                    " and ",
                    React.createElement("code", null, "Canvas"),
                    " using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/rendering-mode", target: "_blank" }, "renderingMode"),
                    " property. When the ",
                    React.createElement("code", null, "renderingMode"),
                    " property is set to ",
                    React.createElement("code", null, "Auto"),
                    ", the rendering mode will be switched automatically based of the size of data source to improve the rendering performance."),
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
    LargeData.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    ;
    LargeData.prototype.tooltipTemplate = function (args) {
        var intl = new ej2_base_1.Internationalization();
        var format = intl.getDateFormat({ format: "MMM dd, yyyy" });
        var value = format(args.xValue);
        args.content = [value + " " + args.yLabel + " : " + args.value + " flight arrivals"];
    };
    ;
    return LargeData;
}(sample_base_1.SampleBase));
exports.LargeData = LargeData;
