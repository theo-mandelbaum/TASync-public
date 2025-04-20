"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Print and Export sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./treemap-data/product.json");
var datasource = data;
var SAMPLE_CSS = "\n    #btn-control {\n        width: 100%;\n        text-align: center;\n        text-transform:none !important;\n    }\n    .e-play-icon::before {\n        content: \"\\e813\";\n    }";
var PrintExport = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treemapInstance = (0, react_1.useRef)(null);
    var mode = (0, react_1.useRef)(null);
    var nameElement = (0, react_1.useRef)(null);
    var textElement;
    // Code for Property Panel
    var droplist = [
        { text: "JPEG", value: "JPEG" },
        { text: "PNG", value: "PNG" },
        { text: "SVG", value: "SVG" },
        { text: "PDF", value: "PDF" },
    ];
    var onClick2 = function (e) {
        treemapInstance.current.print();
    };
    var onClick1 = function (e) {
        var fileName = textElement.value;
        treemapInstance.current.export(mode.current.value, fileName);
    };
    var load = function (args) {
        // custom code start
        var theme = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1))
            .replace(/-dark/i, "Dark")
            .replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "col-md-9" },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: load.bind(_this), id: "treemap-container", allowPrint: true, allowPdfExport: true, allowImageExport: true, ref: treemapInstance, titleSettings: {
                            //To config title for treemap
                            text: "Top 10 best selling smartphone brands - 2017",
                            textStyle: { size: "15px" },
                        }, dataSource: datasource.product, layoutType: "SliceAndDiceVertical", weightValuePath: "Percentage", rangeColorValuePath: "Percentage", tooltipSettings: {
                            // To config tooltip for treemap
                            visible: true,
                            format: "${Product} (+${Percentage}) %",
                        }, leafItemSettings: {
                            // To config leafitem customization for treemap
                            labelPath: "Product",
                            fill: "#6699cc",
                            border: { color: "black", width: 0.5 },
                            labelPosition: "Center",
                            interSectAction: "Hide",
                            labelFormat: "${Product} (+${Percentage}) %",
                            colorMapping: [
                                {
                                    from: 1.3,
                                    to: 22,
                                    color: "#FAB665",
                                    minOpacity: 0.5,
                                    maxOpacity: 1,
                                },
                            ],
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip, ej2_react_treemap_1.Print, ej2_react_treemap_1.ImageExport, ej2_react_treemap_1.PdfExport] })),
                    React.createElement("div", { style: { float: "right", marginRight: "10px" } },
                        "Source:",
                        React.createElement("a", { href: " http://zeenews.india.com/photos/business/worlds-10-best-selling-smartphone-brands-2033958/samsung-2033959", target: "_blank" }, "zeenews.india.com"))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { role: 'none', id: "property", title: "Properties", className: "property-panel-table", style: {
                                width: "100%",
                                marginBottom: "20px",
                                overflow: "hidden",
                            } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Export Type")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "mode", width: "100%", index: 0, placeholder: "JPEG", ref: mode, dataSource: droplist, fields: { text: "text", value: "value" } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "File Name")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: "0px", paddingLeft: "0px" } },
                                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: 'TreeMap', style: { width: '100%', padding: "0px", paddingLeft: "5px" }, id: "fileName", ref: function (d) { return textElement = d; } })))),
                                React.createElement("tr", { style: { height: "60px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onClick1.bind(_this), style: { width: "80px" }, cssClass: "e-info", isPrimary: true }, "Export"))),
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control" },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onClick2.bind(_this), style: { width: "80px" }, cssClass: "e-info", isPrimary: true }, "Print")))))))))),
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
                "To make use of the print and export support, we need to inject the",
                " ",
                React.createElement("code", null, "Print"),
                " module into the ",
                React.createElement("code", null, " services "),
                "."),
            React.createElement("p", null,
                "More information on print and export can be found in this",
                " ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treemap/print-and-export" }, "documentation section"),
                "."))));
};
exports.default = PrintExport;
