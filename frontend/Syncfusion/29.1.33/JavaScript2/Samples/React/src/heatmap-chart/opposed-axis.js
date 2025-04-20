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
exports.OpposedAxis = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./opposed-axis-data.json");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}\n.opposedCheckBox {\n    padding-left: 0px !important;\n    margin-left: 0px;\n}\n.e-view.fluent2 #property .opposedCheckBox, .e-view.fluent2-dark #property .opposedCheckBox {\n    padding-left: 0px; margin-left: -7px;\n}";
// custom code end
var OpposedAxis = /** @class */ (function (_super) {
    __extends(OpposedAxis, _super);
    function OpposedAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpposedAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", null,
                React.createElement("div", { className: 'col-md-9 control-section' },
                    React.createElement("style", null, SAMPLE_CSS),
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                            text: 'Monthly Flight Traffic at JFK Airport',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            labels: ['2007', '2008', '2009', '2010', '2011',
                                '2012', '2013', '2014', '2015', '2016', '2017'],
                            opposedPosition: true,
                            labelRotation: 45,
                            labelIntersectAction: 'None',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, tooltipSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, yAxis: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                                'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                            opposedPosition: true,
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, dataSource: data.opposedAxisData, legendSettings: {
                            visible: false
                        }, load: this.load.bind(this), cellSettings: {
                            showLabel: false,
                            border: {
                                width: 0,
                            },
                            format: '{value} flights'
                        } },
                        React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Tooltip] }))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: -10 } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { id: '', style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { className: "opposedCheckBox" },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'XOpposedPosition', checked: true, label: 'Change X-Axis Position', change: this.valueXChange.bind(this) })))),
                                React.createElement("tr", { id: '', style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { className: "opposedCheckBox" },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'YOpposedPosition', checked: true, label: 'Change Y-Axis Position', change: this.valueYChange.bind(this) }))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample illustrates the monthly flight arrivals at JFK international airport, New York. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to change the position of the axes by means of checkbox for each axis.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to change the display position of the axis. You can change the display position of axes by enabling the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/axisModel/#opposedposition", target: "_blank" }, " opposedPosition"),
                    " property for each axis."),
                React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    " ",
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, '<Inject services={[Tooltip]} />'),
                    " method."))));
    };
    OpposedAxis.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    ;
    OpposedAxis.prototype.valueXChange = function (args) {
        if (args.checked) {
            this.heatmap.xAxis.opposedPosition = true;
        }
        else {
            this.heatmap.xAxis.opposedPosition = false;
        }
        this.heatmap.dataBind();
    };
    OpposedAxis.prototype.valueYChange = function (args) {
        if (args.checked) {
            this.heatmap.yAxis.opposedPosition = true;
        }
        else {
            this.heatmap.yAxis.opposedPosition = false;
        }
        this.heatmap.dataBind();
    };
    return OpposedAxis;
}(sample_base_1.SampleBase));
exports.OpposedAxis = OpposedAxis;
