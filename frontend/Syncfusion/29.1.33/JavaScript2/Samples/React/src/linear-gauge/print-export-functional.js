"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    \n    #btn-control {\n        width: 100%;\n        text-align: center;\n        text-transform:none !important;\n    }\n\n    .e-play-icon::before {\n        content: '\\e728';\n    }\n\n    .e-play-icon1::before {\n        content: \"\\e34b\";\n    }\n\n    .e-view.fluent .e-play-icon::before, .e-view.fluent-dark .e-play-icon::before {\n        content: '\\e72e';\n    }\n\n    .e-view.fluent .e-play-icon1::before, .e-view.fluent-dark .e-play-icon1::before {\n        content: '\\e75d';\n    }\n\n    .e-view.fabric .e-play-icon1::before, .e-view.fabric-dark .e-play-icon1::before\n    {\n        content: '\\e7df';\n    }\n\n    .e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before \n    {\n        content: '\\e710';\n    }\n\n    .e-view.bootstrap .e-play-icon1::before {\n        content: '\\ebd2';\n    }\n\n    .e-view.bootstrap4 .e-play-icon::before {\n        content: '\\e780';\n    }\n\n    .e-view.bootstrap4 .e-play-icon1::before {\n        content: '\\e743';\n    }\n\n    .e-view.highcontrast .e-play-icon1::before {\n        content: '\\ebf9';\n    }\n\n    .e-view.highcontrast .e-play-icon::before {\n        content: '\\e710';\n    }\n\n    .e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {\n        content: '\\e72e';\n    }\n\n    .e-view.bootstrap5 .e-play-icon1::before, .e-view.bootstrap5-dark .e-play-icon1::before {\n        content: '\\e75d';\n    }";
var Export = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gauge = (0, react_1.useRef)(null);
    var mode = (0, react_1.useRef)(null);
    var textElement;
    var type = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var onClickPrint = function () {
        gauge.current.print();
    };
    var onClickExport = function () {
        gauge.current.export(mode.current.value, textElement.value);
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load.bind(_this), id: 'gauge', allowPrint: true, allowPdfExport: true, allowImageExport: true, title: 'Speedometer', titleStyle: { fontFamily: 'inherit' }, orientation: 'Horizontal', ref: gauge },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations, ej2_react_lineargauge_1.Print, ej2_react_lineargauge_1.PdfExport, ej2_react_lineargauge_1.ImageExport] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 120, line: { width: 0 }, minorTicks: { height: 7, width: 0, interval: 4 }, majorTicks: { height: 0, width: 0, interval: 20 }, labelStyle: { position: "Outside", font: { fontFamily: 'inherit' }, offset: 4 } },
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 20, startWidth: 15, endWidth: 25, color: '#82b944' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 20, end: 40, startWidth: 25, endWidth: 35, color: '#a1cb43' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 40, end: 60, startWidth: 35, endWidth: 45, color: '#ddec12' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 60, end: 80, startWidth: 45, endWidth: 55, color: '#ffbc00' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 80, end: 100, startWidth: 55, endWidth: 65, color: '#ff6000' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 100, end: 120, startWidth: 65, endWidth: 75, color: 'red' })),
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 80, height: 23, width: 35, offset: -55, markerType: 'Triangle', border: { width: 2, color: 'white' } })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: "none", title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '80%', marginLeft: '-10px' } }, "Export Type")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '100%', id: "etype", value: "JPEG", ref: mode, dataSource: type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '80%', marginLeft: '-10px' } }, "File Name")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: '0px', height: '45px' } },
                                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: 'Linear Gauge', style: { width: '100%', padding: "0px", paddingLeft: '5px' }, id: "fileName", ref: function (d) { return textElement = d; } })))),
                                React.createElement("tr", { style: { height: '60px' } },
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { id: "btn-control" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onClickExport, style: { marginLeft: '30%' }, isPrimary: true }, "Export"))),
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { id: "btn-control" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onClickPrint, style: { marginLeft: '-20%' }, isPrimary: true }, "Print")))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
            React.createElement("p", null, "This sample demonstrates the print and export functionalities of the linear gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to print and export the rendered linear gauge. You can add print functionality by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#print" }, "print"),
                " method when ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowprint" }, "allowPrint"),
                " is set as ",
                React.createElement("b", null, "true"),
                ". Also, you can add export functionality by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#export" }, "export"),
                " method when ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowimageexport" }, "allowImageExport"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowpdfexport" }, "allowPdfExport"),
                " are set as ",
                React.createElement("b", null, "true"),
                ". The linear gauge can be exported to JPEG, PNG, SVG, and PDF formats."),
            React.createElement("p", null,
                "More information about print and export can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/print-and-export/" }, "documentation section"),
                "."))));
};
exports.default = Export;
