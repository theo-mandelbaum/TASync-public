"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Layout sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/economics.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Layout = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treemapInstance = (0, react_1.useRef)(null);
    var layoutElement = (0, react_1.useRef)(null);
    var renderDirectionElement = (0, react_1.useRef)(null);
    // Code for Property Panel
    var droplist = [
        { text: "Squarified", value: "Squarified" },
        { text: "Horizontal", value: "SliceAndDiceHorizontal" },
        { text: "Vertical", value: "SliceAndDiceVertical" },
        { text: "Auto", value: "SliceAndDiceAuto" },
    ];
    var dropList = [
        { text: "TopLeftBottomRight", value: "TopLeftBottomRight" },
        { text: "TopRightBottomLeft", value: "TopRightBottomLeft" },
        { text: "BottomLeftTopRight", value: "BottomLeftTopRight" },
        { text: "BottomRightTopLeft", value: "BottomRightTopLeft" },
    ];
    var layoutChange = function () {
        treemapInstance.current.layoutType = layoutElement.current
            .value;
        treemapInstance.current.refresh();
    };
    var renderDirectionChange = function () {
        treemapInstance.current.renderDirection = renderDirectionElement.current
            .value;
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
                            text: "Top 10 countries by GDP Nominal - 2015",
                            textStyle: { size: "15px" },
                        }, dataSource: datasource.economics, weightValuePath: "GDP", tooltipSettings: {
                            // To config tooltip for treemap
                            visible: true,
                            format: "${State}<br>Rank : ${Rank}",
                        }, rangeColorValuePath: "GDP", leafItemSettings: {
                            // To config leafitem customization for treemap
                            labelPath: "State",
                            labelFormat: "${State}<br>$${GDP} Trillion<br>(${percentage} %)",
                            labelStyle: {
                                color: "#000000",
                            },
                            border: {
                                color: "#000000",
                                width: 0.5,
                            },
                            colorMapping: [
                                {
                                    from: 1550,
                                    to: 17946,
                                    color: "#9cbb59",
                                    minOpacity: 0.7,
                                    maxOpacity: 1,
                                },
                            ],
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] })),
                    React.createElement("div", { style: { float: "right", marginRight: "10px" } },
                        "Source:",
                        React.createElement("a", { href: "https://www.reinisfischer.com/top-10-largest-economies-world-gdp-nominal-2015", target: "_blank" }, "www.reinisfischer.com"))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { role: 'none', id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%", marginBottom: "20px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Layout Type")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "layoutMode", width: "100%", index: 0, change: layoutChange.bind(_this), ref: layoutElement, dataSource: droplist, fields: { text: "text", value: "value" } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Render Direction")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "highlightMode", width: "100%", index: 0, dataSource: dropList, fields: { text: "text", value: "value" }, change: renderDirectionChange.bind(_this), ref: renderDirectionElement })))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
            React.createElement("p", null, "This sample orders the countries based on the unemployment rate by rendering TreeMap in the right-to-left (RTL) direction")),
        React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render a TreeMap from the right-to-left direction. The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices.",
                React.createElement("br", null),
                React.createElement("br", null),
                "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices."))));
};
exports.default = Layout;
