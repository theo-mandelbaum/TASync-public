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
exports.PrintExport = void 0;
/**
 * Print and Export sample for treemap
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./treemap-data/product.json");
var datasource = data;
var SAMPLE_CSS = "\n\t#btn-control {\n        width: 100%;\n\t\ttext-align: center;\n\t\ttext-transform:none !important;\n    }\n\t.e-play-icon::before {\n        content: \"\\e813\";\n    }";
var PrintExport = /** @class */ (function (_super) {
    __extends(PrintExport, _super);
    function PrintExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist = [
            { text: 'JPEG', value: 'JPEG' },
            { text: 'PNG', value: 'PNG' },
            { text: 'SVG', value: 'SVG' },
            { text: 'PDF', value: 'PDF' },
        ];
        return _this;
    }
    PrintExport.prototype.onClick2 = function (e) {
        this.treemapInstance.print();
    };
    PrintExport.prototype.onClick1 = function (e) {
        var fileName = this.textElement.value;
        this.treemapInstance.export(this.mode.value, fileName);
    };
    PrintExport.prototype.load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    PrintExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { className: 'col-md-9' },
                        React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', allowPrint: true, allowPdfExport: true, allowImageExport: true, ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                                text: 'Top 10 best selling smartphone brands - 2017',
                                textStyle: { size: '15px' }
                            }, dataSource: datasource.product, layoutType: 'SliceAndDiceVertical', weightValuePath: 'Percentage', rangeColorValuePath: 'Percentage', tooltipSettings: {
                                visible: true,
                                format: '${Product} (+${Percentage}) %'
                            }, leafItemSettings: {
                                labelPath: 'Product',
                                fill: '#6699cc',
                                border: { color: 'black', width: 0.5 },
                                labelPosition: 'Center',
                                interSectAction: 'Hide',
                                labelFormat: '${Product} (+${Percentage}) %',
                                colorMapping: [
                                    {
                                        from: 1.3,
                                        to: 22,
                                        color: '#FAB665',
                                        minOpacity: 0.5,
                                        maxOpacity: 1
                                    }
                                ]
                            } },
                            React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip, ej2_react_treemap_1.Print, ej2_react_treemap_1.ImageExport, ej2_react_treemap_1.PdfExport] })),
                        React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                            "Source:",
                            React.createElement("a", { href: " http://zeenews.india.com/photos/business/worlds-10-best-selling-smartphone-brands-2033958/samsung-2033959", target: "_blank" }, "zeenews.india.com"))),
                    React.createElement("div", { className: 'col-md-3 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { role: 'none', id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px', overflow: 'hidden' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Export Type")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } },
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "mode", width: "100%", index: 0, placeholder: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "File Name")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: '0px', paddingLeft: '0px' } },
                                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: 'TreeMap', style: { width: '100%', padding: '0px', paddingLeft: '5px' }, id: "width", ref: function (d) { return _this.textElement = d; } })))),
                                    React.createElement("tr", { style: { height: "60px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { id: "btn-control" },
                                                React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick1.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Export"))),
                                        React.createElement("td", null,
                                            React.createElement("div", { id: "btn-control" },
                                                React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick2.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Print")))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
                React.createElement("p", null, "This sample depicts the top 10 best-selling smartphone brands. Print and export options have been enabled in this sample.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to export and print the rendered treemap. The TreeMap can be exported to JPEG, PNG, SVG, and PDF formats. Print functionality is done by ",
                    React.createElement("code", null, "print"),
                    "method when ",
                    React.createElement("code", null, "allowPrint"),
                    " is set as true. Export functionality is done by",
                    React.createElement("code", null, "export"),
                    " method when ",
                    React.createElement("code", null, "allowImageExport"),
                    " and",
                    React.createElement("code", null, "allowPdfExport"),
                    " is set as true.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("b", null, "Injecting Module:"),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "To make use of the print and export support, we need to inject the ",
                    React.createElement("code", null, "Print"),
                    " module into the ",
                    React.createElement("code", null, " services "),
                    "."),
                React.createElement("p", null,
                    "More information on print and export can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treemap/print-and-export" }, "documentation section"),
                    "."))));
    };
    return PrintExport;
}(sample_base_1.SampleBase));
exports.PrintExport = PrintExport;
