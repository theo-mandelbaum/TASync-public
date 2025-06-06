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
exports.Circle = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var SAMPLE_CSS = "\n    .legendPadding {\n        padding-top: 0px; margin-left: 0px; margin-top: 3px; padding-left:10px\n    }\n    .e-view.fluent2 #property .legendPadding, .e-view.fluent2-dark #property .legendPadding {\n        padding-top: 0px; margin-left: 0px !important; margin-top: 3px; padding-left:0px !important;\n    }\n    .e-view.fluent2-highcontrast #property .legendPadding {\n        margin-left: -8px !important;\n    }\n    ";
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        _this.positionlist = [
            { value: 'Bottom' },
            { value: 'Top' },
            { value: 'Left' },
            { value: 'Right' },
            { value: 'Auto' }
        ];
        _this.alignlist = [
            { value: 'Center' },
            { value: 'Far' },
            { value: 'Near' }
        ];
        _this.shapelist = [
            { value: 'Circle', text: 'Circle' },
            { value: 'Rectangle', text: 'Rectangle' },
            { value: 'Triangle', text: 'Triangle' },
            { value: 'Diamond', text: 'Diamond' },
            { value: 'InvertedTriangle', text: 'Inverted Triangle' }
        ];
        return _this;
    }
    Circle.prototype.position = function () {
        this.gauge.legendSettings.position = this.positionElement.value;
    };
    Circle.prototype.alignment = function () {
        this.gauge.legendSettings.alignment = this.alignElement.value;
    };
    Circle.prototype.shape = function () {
        this.gauge.legendSettings.shape = this.dropElement.value;
    };
    Circle.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Circle.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.legendPosition = new ej2_react_dropdowns_1.DropDownList({
                index: 0,
                width: 130,
                change: function () {
                    var position = _this.legendPosition.value.toString();
                }
            });
            this.legendPosition.appendTo('#legendPosition');
        }
    };
    Circle.prototype.enableToggleLegend = function (args) {
        this.gauge.legendSettings.toggleVisibility = args.checked;
    };
    Circle.prototype.enableLegend = function (args) {
        this.gauge.legendSettings.visible = args.checked;
        this.gauge.refresh();
    };
    Circle.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement("style", null, SAMPLE_CSS),
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), background: 'transparent', id: 'range-container', loaded: this.onChartLoad.bind(this), title: 'Measure of wind speed in km/h', titleStyle: { fontFamily: 'inherit' }, legendSettings: {
                                visible: true, position: "Bottom",
                                textStyle: {
                                    fontFamily: 'inherit',
                                    size: '12px'
                                }
                            }, ref: function (gauge) { return _this.gauge = gauge; } },
                            React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations, ej2_react_circulargauge_1.Legend] }),
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 150, radius: '80%', minimum: 0, maximum: 120, majorTicks: {
                                        color: '#9E9E9E', height: 16, interval: 20
                                    }, lineStyle: { width: 2 }, minorTicks: {
                                        height: 8, interval: 10
                                    }, labelStyle: {
                                        position: 'Inside', useRangeColor: false,
                                        font: {
                                            fontFamily: 'inherit'
                                        }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 5, color: '#ccffff', radius: '110%', legendText: 'Light Air' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 5, end: 11, color: '#99ffff', radius: '110%', legendText: 'Light Breeze' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 11, end: 19, color: '#99ff99', radius: '110%', legendText: 'Gentle Breeze' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 19, end: 28, color: '#79ff4d', radius: '110%', legendText: 'Moderate Breeze' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 28, end: 49, color: '#c6ff1a', radius: '110%', legendText: 'Strong Breeze' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 49, end: 74, color: '#e6ac00', radius: '110%', legendText: 'Gale' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 74, end: 102, color: '#ff6600', radius: '110%', legendText: 'Storm' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 102, end: 120, color: '#ff0000', radius: '110%', legendText: 'Hurricane Force' })),
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', pointerWidth: 8, animation: { enable: true }, cap: {
                                                radius: 7
                                            }, needleTail: { length: '18%' } })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: '-10px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", { style: { width: '20%' } },
                                            React.createElement("div", { id: 'enablePointer', style: { fontSize: "14px" } }, "Show Legend")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { className: 'legendPadding' },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'enable', checked: true, change: this.enableLegend.bind(this) })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", { style: { width: '20%' } },
                                            React.createElement("div", { id: 'enable', style: { fontSize: "14px" } }, "Show range when the legend item is toggled")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { className: 'legendPadding' },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'enableToggle', checked: true, change: this.enableToggleLegend.bind(this) })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { id: 'position', style: { fontSize: "14px" } }, "Position")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '20px' } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100%", index: 0, change: this.position.bind(this), ref: function (d) { return _this.positionElement = d; }, dataSource: this.positionlist, fields: { text: 'value', value: 'value' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { id: 'range', style: { fontSize: "14px" } }, "Alignment")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '20px' } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100%", index: 0, change: this.alignment.bind(this), ref: function (d) { return _this.alignElement = d; }, dataSource: this.alignlist, fields: { text: 'value', value: 'value' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { id: 'pointColor', style: { fontSize: "14px" } }, "Shape")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '20px' } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "100%", index: 0, change: this.shape.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.shapelist, fields: { text: 'text', value: 'value' } })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample directs the visualization of moving wind types based on their speed via the legend of the circular gauge component. The visibility, shape, alignment, and position of the legend can all be customized.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "The legend provides useful information for interpreting what the circular gauge's axis range displays, and it can be represented in a variety of colors, shapes, and other identifiers depending on the data. To do so, use the ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/legendSettingsModel/' }, "legendSettings"),
                    " and its properties."),
                React.createElement("p", null,
                    "More information on the legend can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-legend/" }, "documentation section"),
                    "."))));
    };
    return Circle;
}(sample_base_1.SampleBase));
exports.Circle = Circle;
