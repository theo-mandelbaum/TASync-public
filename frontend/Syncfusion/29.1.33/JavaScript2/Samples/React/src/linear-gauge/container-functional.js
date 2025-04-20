"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Container = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Vertical'), orientation = _a[0], setOrientation = _a[1];
    var _b = (0, react_1.useState)('Thermometer'), containerType = _b[0], setContainerType = _b[1];
    var gaugeInstance = (0, react_1.useRef)(null);
    var orientationElement = (0, react_1.useRef)(null);
    var containerElement = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'Vertical' },
        { value: 'Horizontal' }
    ];
    var modelist = [
        { value: 'Thermometer', text: 'Thermometer' },
        { value: 'Normal', text: 'Normal' },
        { value: 'RoundedRectangle', text: 'Rounded Rectangle' }
    ];
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var orienatationChange = function (args) {
        setOrientation(args.value);
    };
    var containerChange = function (args) {
        setContainerType(args.value);
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { orientation: orientation, load: load.bind(_this), id: 'gauge', background: 'transparent', ref: gaugeInstance, title: 'Temperature Measure', titleStyle: { fontFamily: 'inherit' }, container: { width: 13, type: containerType, roundedCornerRadius: 5 } },
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
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '110%', id: "orientationMode", style: { "width": "100%" }, change: orienatationChange, className: "form-control", ref: orientationElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "Vertical" })))),
                                React.createElement("tr", { style: { height: '50px', paddingTop: '15px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: "-20px", paddingLeft: '0px', fontSize: "14px" } }, "Container Type")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingBottom: '20px', width: '90%', paddingLeft: "0px" } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '110%', id: "containerMode", style: { "width": "90%" }, change: containerChange, className: "form-control", ref: containerElement, dataSource: modelist, fields: { text: 'text', value: 'value' }, value: "Thermometer" })))))))))),
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
exports.default = Container;
