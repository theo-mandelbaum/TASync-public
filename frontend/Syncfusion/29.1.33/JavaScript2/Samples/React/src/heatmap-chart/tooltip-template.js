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
exports.TooltipTemplate = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var ej2_react_heatmap_2 = require("@syncfusion/ej2-react-heatmap");
var data = require("./default-table-data-source.json");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
var TooltipTemplate = /** @class */ (function (_super) {
    __extends(TooltipTemplate, _super);
    function TooltipTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipTemplate.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                            text: 'Crude Oil Production of Non-OPEC Countries (in Million barrels per day)',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA'],
                            labelRotation: 45,
                            labelIntersectAction: 'None',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, yAxis: {
                            labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, dataSource: data.defaultTableDataSource, cellSettings: {
                            border: {
                                width: 0
                            },
                            format: '{value} M',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, legendSettings: {
                            visible: false,
                        }, tooltipSettings: {
                            fill: '#265259',
                            textStyle: {
                                color: '#FFFFFF',
                                size: "12px",
                                fontFamily: 'inherit'
                            },
                            border: {
                                width: 1,
                                color: "#98BABF"
                            }
                        }, paletteSettings: {
                            palette: [{ value: 0, color: '#C2E7EC' },
                                { value: 0.6, color: '#AEDFE6' },
                                { value: 0.75, color: '#9AD7E0' },
                                { value: 1, color: '#86CFDA' },
                                { value: 1.5, color: '#72C7D4' },
                                { value: 2, color: '#5EBFCE' },
                                { value: 2.5, color: '#4AB7C8' },
                                { value: 3, color: '#36AFC2' },
                                { value: 3.5, color: '#309DAE' },
                                { value: 5, color: '#2B8C9B' },
                                { value: 5.5, color: '#257A87' },
                                { value: 6, color: '#206974' },
                                { value: 8, color: '#1B5761' },
                                { value: 9, color: '#15464D' },
                                { value: 9.5, color: '#000000' },
                            ],
                            type: 'Fixed'
                        }, load: this.load.bind(this) },
                        React.createElement(ej2_react_heatmap_2.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample visualizes the crude oil production of the non-OPEC countries over the years. The data point values displayed are in million barrels per day units.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to customize the tooltip content in the HeatMap. You can customize the tooltip content by using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip#tooltip-template", target: "_blank" }, "template"),
                    " property."),
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
    TooltipTemplate.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    ;
    return TooltipTemplate;
}(sample_base_1.SampleBase));
exports.TooltipTemplate = TooltipTemplate;
