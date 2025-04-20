"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Legend sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/election-data.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Legend = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treemapInstance = (0, react_1.useRef)(null);
    var legendElement = (0, react_1.useRef)(null);
    var legendPositionElement = (0, react_1.useRef)(null);
    // Code for Property Panel
    var droplist = [
        { text: "Default", value: "Default" },
        { text: "Interactive", value: "Interactive" },
    ];
    var positionList = [
        { text: "Top", value: "Top" },
        { text: "Bottom", value: "Bottom" },
        { text: "Left", value: "Left" },
        { text: "Right", value: "Right" },
        { text: "Auto", value: "Auto" },
    ];
    var legendChange = function () {
        treemapInstance.current.legendSettings.mode = legendElement.current
            .value;
        if (legendElement.current.value === "Interactive") {
            if (treemapInstance.current.legendSettings.orientation === "Horizontal" ||
                treemapInstance.current.legendSettings.orientation === "None") {
                treemapInstance.current.legendSettings.height = "10";
                treemapInstance.current.legendSettings.width = "";
            }
            else {
                treemapInstance.current.legendSettings.height = "70%";
                treemapInstance.current.legendSettings.width = "10";
            }
        }
        else {
            treemapInstance.current.legendSettings.height = "";
            treemapInstance.current.legendSettings.width = "";
        }
        treemapInstance.current.refresh();
    };
    var legendPositionChange = function () {
        treemapInstance.current.legendSettings.position = legendPositionElement
            .current.value;
        if (legendPositionElement.current.value === "Left" ||
            legendPositionElement.current.value === "Right") {
            treemapInstance.current.legendSettings.orientation = "Vertical";
            if (treemapInstance.current.legendSettings.mode === "Interactive") {
                treemapInstance.current.legendSettings.height = "70%";
                treemapInstance.current.legendSettings.width = "10";
            }
            else {
                treemapInstance.current.legendSettings.height = "";
                treemapInstance.current.legendSettings.width = "";
            }
        }
        else if (legendPositionElement.current.value === "Auto") {
            if (treemapInstance.current.availableSize.width >
                treemapInstance.current.availableSize.height) {
                treemapInstance.current.legendSettings.orientation = "Vertical";
                if (treemapInstance.current.legendSettings.mode === "Interactive") {
                    treemapInstance.current.legendSettings.height = "70%";
                    treemapInstance.current.legendSettings.width = "10";
                }
                else {
                    treemapInstance.current.legendSettings.height = "";
                    treemapInstance.current.legendSettings.width = "";
                }
            }
            else {
                treemapInstance.current.legendSettings.orientation = "Horizontal";
                if (treemapInstance.current.legendSettings.mode === "Interactive") {
                    treemapInstance.current.legendSettings.height = "10";
                    treemapInstance.current.legendSettings.width = "";
                }
                else {
                    treemapInstance.current.legendSettings.height = "";
                    treemapInstance.current.legendSettings.width = "";
                }
            }
        }
        else {
            treemapInstance.current.legendSettings.orientation = "Horizontal";
            if (treemapInstance.current.legendSettings.mode === "Interactive") {
                treemapInstance.current.legendSettings.height = "10";
                treemapInstance.current.legendSettings.width = "";
            }
        }
        treemapInstance.current.refresh();
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
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: load.bind(_this), id: "treemap-container", ref: treemapInstance, titleSettings: {
                            //To config title for treemap
                            text: "US presidential election result - 2016",
                            textStyle: { size: "15px" },
                        }, dataSource: datasource.election, weightValuePath: "Population", tooltipSettings: {
                            // To config tooltip for treemap
                            visible: true,
                            format: " <b>${Winner}</b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %",
                        }, legendSettings: {
                            // To config legend for treemap
                            visible: true,
                            position: "Top",
                            shape: "Rectangle",
                            height: "10",
                        }, format: "n", useGroupingSeparator: true, rangeColorValuePath: "WinPercentage", equalColorValuePath: "Winner", leafItemSettings: {
                            // To config leafitem customization for treemap
                            labelPath: "State",
                            fill: "#6699cc",
                            border: { color: "white", width: 0.5 },
                            colorMapping: [
                                {
                                    value: "Trump",
                                    color: "#D84444",
                                },
                                {
                                    value: "Clinton",
                                    color: "#316DB5",
                                },
                            ],
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] })),
                    React.createElement("div", { style: { float: "right", marginRight: "10px" } },
                        "Source:",
                        React.createElement("a", { href: " https://en.wikipedia.org/wiki/United_States_presidential_election,_2016", target: "_blank" }, "en.wikipedia.org"))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { role: 'none', id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%", marginBottom: "20px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { paddingTop: "15px", width: "30%" } },
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Type")),
                                    React.createElement("td", { style: { paddingTop: "15px" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendmode", width: "100%", index: 0, change: legendChange.bind(_this), ref: legendElement, dataSource: droplist, fields: { text: "text", value: "value" } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: "30%" } },
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Position")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendPosition", width: "100%", index: 0, change: legendPositionChange.bind(_this), ref: legendPositionElement, dataSource: positionList, fields: { text: "text", value: "value" } })))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
            React.createElement("p", null, "This sample visualizes the 2016 United States presidential election results. The type and position of the legends can be changed using the Type and Position options in the properties panel.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see the type of legend available in TreeMap. The equal color mapping is applied based on certain value.",
                React.createElement("br", null),
                React.createElement("br", null),
                "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
            React.createElement("br", null),
            React.createElement("p", { className: "description-header" }, "Injecting Module"),
            React.createElement("p", null,
                "The TreeMap component features are segregated into individual modules by feature. To use a legend, inject the ",
                React.createElement("code", null, "Legend"),
                " module using the ",
                React.createElement("code", null, "TreeMap.Inject(TreeMapLegend)"),
                " method."))));
};
exports.default = Legend;
