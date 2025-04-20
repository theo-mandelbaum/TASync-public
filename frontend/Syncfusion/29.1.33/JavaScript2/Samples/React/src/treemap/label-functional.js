"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Datalabel sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/country-population.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Datalabel = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treemapInstance = (0, react_1.useRef)(null);
    var labelElement = (0, react_1.useRef)(null);
    // Code for Property Panel
    var droplist = [
        { text: "Trim", value: "Trim" },
        { text: "Hide", value: "Hide" },
        { text: "Wrap", value: "Wrap" },
        { text: "WrapByWord", value: "WrapByWord" },
    ];
    var labelChange = function () {
        treemapInstance.current.leafItemSettings.interSectAction = labelElement
            .current.value;
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
                            text: "Countries ordered based on Population - 2017",
                            textStyle: { size: "15px" },
                        }, dataSource: datasource.population, tooltipSettings: {
                            // To config tooltip for treemap
                            visible: true,
                            format: "${Country} : ${Population}",
                        }, legendSettings: {
                            // To config legend for treemap
                            visible: true,
                            mode: "Interactive",
                            width: "300px",
                            height: "10",
                            position: "Top",
                        }, format: "n", useGroupingSeparator: true, rangeColorValuePath: "Population", weightValuePath: "Population", leafItemSettings: {
                            // To config leafitem customization for treemap
                            showLabels: true,
                            labelPath: "Country",
                            fill: "red",
                            colorMapping: [
                                {
                                    to: 10000000000,
                                    from: 100000000,
                                    label: "200M - 1.3M",
                                    color: "#4B134F",
                                },
                                {
                                    to: 100000000,
                                    from: 20000000,
                                    label: "20M - 200M",
                                    color: "#8C304D",
                                },
                                {
                                    to: 20000000,
                                    from: 100000,
                                    label: "0.1M - 20M",
                                    color: "#C84B4B",
                                },
                            ],
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] })),
                    React.createElement("div", { style: { float: "right", marginRight: "10px" } },
                        "Source:",
                        React.createElement("a", { href: "https://www.populationpyramid.net/population-size-per-country/2017", target: "_blank" }, "www.populationpyramid.net"))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { role: 'none', id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%", marginBottom: "20px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Label Intersect Action")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "labels", width: "100%", index: 0, change: labelChange.bind(_this), ref: labelElement, dataSource: droplist, fields: { text: "text", value: "value" } })))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
            React.createElement("p", null,
                "This sample illustrates the population level of various countries in 2017. The leaf items\u2019 labels intersect action can be changed by using the ",
                React.createElement("code", null, "Label Intersect Action"),
                " in properties panel.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see the various label intersect actions available in TreeMap. Range color mapping has been specified, and the default legend has been enabled in this example.",
                React.createElement("br", null),
                React.createElement("br", null),
                "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices"),
            React.createElement("br", null),
            React.createElement("p", { className: "description-header" }, "Injecting Module"),
            React.createElement("p", null,
                "TreeMap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                React.createElement("code", null, "Tooltip"),
                " module using the ",
                React.createElement("code", null, "TreeMap.Inject(TreeMapTooltip)"),
                " method, and use a legend by injecting the ",
                React.createElement("code", null, "Legend"),
                " module using the",
                " ",
                React.createElement("code", null, "TreeMap.Inject(TreeMapLegend)"),
                " method."))));
};
exports.default = Datalabel;
