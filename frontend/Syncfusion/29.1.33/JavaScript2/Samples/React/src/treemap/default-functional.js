"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/car-sales.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        // custom code start
        var theme = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1))
            .replace(/-dark/i, "Dark")
            .replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    /* tslint:disable:no-string-literal */
    var itemMove = function (args) {
        args.item["data"].Sales = args.item["weight"];
        args.treemap.tooltipSettings.format =
            args.item["groupIndex"] === 0
                ? "Country: ${Continent}<br>Sales: ${Sales}"
                : "Country: ${Continent}<br>Company: ${Company}<br>Sales: ${Sales}";
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_treemap_1.TreeMapComponent, { itemClick: itemMove.bind(_this), itemMove: itemMove.bind(_this), load: load.bind(_this), id: "treemap-container", titleSettings: {
                        //To config title for treemap
                        text: "Car Sales by Country - 2017",
                        textStyle: { size: "15px" },
                    }, rangeColorValuePath: "Sales", format: "n", useGroupingSeparator: true, dataSource: datasource.car_sale, legendSettings: {
                        visible: true,
                        position: "Top",
                        shape: "Rectangle",
                    }, palette: [
                        "#C33764",
                        "#AB3566",
                        "#993367",
                        "#853169",
                        "#742F6A",
                        "#632D6C",
                        "#532C6D",
                        "#412A6F",
                        "#312870",
                        "#1D2671",
                    ], tooltipSettings: { visible: true }, weightValuePath: "Sales", leafItemSettings: {
                        labelPath: "Company",
                        border: { color: "white", width: 0.5 },
                    } },
                    React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] }),
                    React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                        React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: "Continent", border: { color: "white", width: 0.5 } })))),
            React.createElement("div", { style: { float: "right", marginRight: "10px" } },
                "Source:",
                React.createElement("a", { href: "https://www.factorywarrantylist.com/car-sales-by-country.html/", target: "_blank" }, "www.factorywarrantylist.com"))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
            React.createElement("p", null, "This sample visualizes the sales of cars across various countries in 2017 by rendering the countries at the top level and car manufacturing companies as leaf items.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render a TreeMap with the provided data source. The palette color is applied to the items in TreeMap. The default legend is enabled in this example to represent the items at the top level.",
                React.createElement("br", null),
                React.createElement("br", null),
                "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
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
exports.default = Default;
