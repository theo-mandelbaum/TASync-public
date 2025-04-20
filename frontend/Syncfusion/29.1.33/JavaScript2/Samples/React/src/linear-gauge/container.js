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
exports.Container = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Vertical' },
            { value: 'Horizontal' }
        ];
        _this.modelist = [
            { value: 'Thermometer', text: 'Thermometer' },
            { value: 'Normal', text: 'Normal' },
            { value: 'RoundedRectangle', text: 'Rounded Rectangle' }
        ];
        return _this;
    }
    Container.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Container.prototype.orienatationChange = function () {
        this.gaugeInstance.orientation = this.orientationElement.value;
        this.gaugeInstance.refresh();
    };
    Container.prototype.containerChange = function () {
        this.gaugeInstance.container.type = this.containerElement.value;
        this.gaugeInstance.refresh();
    };
    Container.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { orientation: 'Vertical', load: this.load.bind(this), id: 'gauge', background: 'transparent', ref: function (gauge) { return _this.gaugeInstance = gauge; }, title: 'Temperature Measure', titleStyle: { fontFamily: 'inherit' }, container: { width: 13, type: 'Thermometer', roundedCornerRadius: 5 } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 180, line: { width: 0 }, minorTicks: { color: '#9e9e9e', height: 10, interval: 10 }, majorTicks: { interval: 20, color: '#9e9e9e', height: 20 }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 90, height: 13, width: 13, type: 'Bar', color: '#f02828' }))),
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 180, opposedPosition: true, line: { width: 0 }, majorTicks: { color: '#9e9e9e', interval: 20, height: 20 }, minorTicks: { height: 10, interval: 10, color: '#9e9e9e' }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: "none", title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginTop: '5px' } },
                                React.createElement("colgroup", null,
                                    React.createElement("col", { span: 1, style: { width: "40%" } }),
                                    React.createElement("col", { span: 1, style: { width: "60%" } })),
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '42px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px', fontSize: "14px" } }, "Orientation")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { width: "90%", paddingLeft: "0px" } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '110%', id: "orientationMode", style: { "width": "100%" }, change: this.orienatationChange.bind(this), className: "form-control", ref: function (d) { return _this.orientationElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Vertical" })))),
                                    React.createElement("tr", { style: { height: '50px', paddingTop: '15px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: "-20px", paddingLeft: '0px', fontSize: "14px" } }, "Container Type")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingBottom: '20px', width: '90%', paddingLeft: "0px" } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '110%', id: "containerMode", style: { "width": "90%" }, change: this.containerChange.bind(this), className: "form-control", ref: function (d) { return _this.containerElement = d; }, dataSource: this.modelist, fields: { text: 'text', value: 'value' }, value: "Thermometer" })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows the different types of containers, such as normal, thermometer, and rounded rectangle. The linear gauge's orientation can also be changed from vertical to horizontal.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "The linear gauge can be rendered vertically or horizontally depending on the option selected in the ",
                    React.createElement("b", null, "Orientation"),
                    " drop-down list. You can also select the container type from the ",
                    React.createElement("b", null, "Container Type"),
                    " drop-down list."),
                React.createElement("p", null,
                    "More information on the containers can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/appearance/#customizing-the-linear-gauge-container" }, "documentation section"),
                    ". Likewise, information about orientation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#orientation" }, "documentation section"),
                    "."))));
    };
    return Container;
}(sample_base_1.SampleBase));
exports.Container = Container;
