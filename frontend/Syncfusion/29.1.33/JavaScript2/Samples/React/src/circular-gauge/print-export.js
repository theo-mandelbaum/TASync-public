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
exports.Export = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Export = /** @class */ (function (_super) {
    __extends(Export, _super);
    function Export() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' }
        ];
        return _this;
    }
    Export.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Export.prototype.onClickPrint = function (e) {
        this.gauge.print();
    };
    Export.prototype.onClickExport = function (e) {
        var fileName = this.textElement.value;
        this.gauge.export(this.mode.value, fileName);
    };
    Export.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'gauge', background: 'transparent', allowPrint: true, allowPdfExport: true, allowImageExport: true, ref: function (gauge) { return _this.gauge = gauge; } },
                            React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Print, ej2_react_circulargauge_1.PdfExport, ej2_react_circulargauge_1.ImageExport] }),
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '80%', startAngle: 0, endAngle: 0, direction: 'AntiClockWise', majorTicks: { width: 1, height: 25, interval: 10, position: "Outside", useRangeColor: true }, lineStyle: { width: 0 }, minorTicks: { width: 1, height: 8, interval: 2, position: "Outside", useRangeColor: true }, labelStyle: {
                                        hiddenLabel: 'Last', offset: 2,
                                        font: { fontFamily: 'inherit' },
                                        position: 'Outside',
                                        useRangeColor: true
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 32, radius: '90%', startWidth: 10, endWidth: 35, color: '#F8A197' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 32, end: 70, radius: '90%', startWidth: 10, endWidth: 35, color: '#C45072' }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 70, end: 100, radius: '90%', startWidth: 10, endWidth: 35, color: '#1B679F' })),
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '0%', cap: {
                                                radius: 0
                                            } })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px', fontSize: '14px' } }, "Export Type")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: '100%', id: "etype", value: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" })))),
                                    React.createElement("tr", { style: { height: "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px', fontSize: '14px' } }, "File Name")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { 'marginTop': '0px' } },
                                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: 'Circular Gauge', style: { width: '100%', padding: '0px', paddingLeft: '5px' }, id: "fileName", ref: function (d) { return _this.textElement = d; } })))),
                                    React.createElement("tr", { style: { height: '60px' } },
                                        React.createElement("td", { align: "right", style: { paddingRight: '5%' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClickExport.bind(this), isPrimary: true }, "Export")),
                                        React.createElement("td", { align: "left", style: { paddingLeft: '5%' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClickPrint.bind(this), isPrimary: true }, "Print"))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample demonstrates the print and export functionalities of the circular gauge.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to print and export the rendered circular gauge. You can add print functionality by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#print" }, "print"),
                    " method when ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#allowprint" }, "allowPrint"),
                    " is set as ",
                    React.createElement("b", null, "true"),
                    ". Also, you can add export functionality by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#export" }, "export"),
                    " method when ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#allowimageexport" }, "allowImageExport"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#allowpdfexport" }, "allowPdfExport"),
                    " are set as ",
                    React.createElement("b", null, "true"),
                    ". The circular gauge can be exported to JPEG, PNG, SVG, and PDF formats."),
                React.createElement("p", null,
                    "More information about print and export can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-print-and-export/" }, "documentation section"),
                    "."))));
    };
    return Export;
}(sample_base_1.SampleBase));
exports.Export = Export;
