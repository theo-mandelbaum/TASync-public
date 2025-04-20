"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Drilldown sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./treemap-data/drilldown-sample.json");
var datasource = data;
var SAMPLE_CSS = "\n    .drilldown-checkbox {\n        padding-left: 0px !important;\n    }\n    .drilldownCheckbox {\n        padding-left: 0px;\n    }\n    .e-view.fluent2-highcontrast #property .drilldownCheckbox {\n        padding-left: 0px; margin-left: -8px;\n    }\n    .e-view.fluent2 #property .drilldown-checkbox, .e-view.fluent2-dark #property .drilldown-checkbox {\n        padding-left: 0px; margin-left: -10px;\n    }";
var Drilldown = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treemapInstance = (0, react_1.useRef)(null);
    var nameElement = (0, react_1.useRef)(null);
    var headerElement = (0, react_1.useRef)(null);
    var labelElement = (0, react_1.useRef)(null);
    var textElement;
    var drillViewChange = function (args) {
        var value = args.checked;
        treemapInstance.current.drillDownView = value;
        treemapInstance.current.refresh();
    };
    var breadCrumbChange = function (args) {
        var value = args.checked;
        treemapInstance.current.enableBreadcrumb = value;
        treemapInstance.current.refresh();
    };
    var breadCrumbTextChange = function (args) {
        var value = textElement.value;
        treemapInstance.current.breadcrumbConnector = value;
        treemapInstance.current.refresh();
    };
    var headerChange = function () {
        for (var i = 0; i < treemapInstance.current.levels.length - 1; i++) {
            treemapInstance.current.levels[i].headerAlignment = headerElement.current
                .value;
        }
        treemapInstance.current.refresh();
    };
    var labelChange = function () {
        treemapInstance.current.levels[2].headerAlignment = labelElement.current
            .value;
        treemapInstance.current.refresh();
    };
    var headerAlign = [
        { text: "Near", value: "Near" },
        { text: "Far", value: "Far" },
        { text: "Center", value: "Center" },
    ];
    var labelAlign = [
        { text: "Near", value: "Near" },
        { text: "Far", value: "Far" },
        { text: "Center", value: "Center" },
    ];
    var load = function (args) {
        //custom code start
        var theme = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1))
            .replace(/-dark/i, "Dark")
            .replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    /* tslint:disable:no-string-literal */
    var drillStart = function (args) {
        if (args.item[Object.keys(args.item)[0]].length === 1) {
            args.treemap.levels[2].showHeader = true;
        }
        else {
            args.treemap.levels[2].showHeader = false;
        }
    };
    var tooltipRendering = function (args) {
        if (args.item["groupIndex"] !== 2) {
            args.cancel = true;
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "col-md-9" },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { drillStart: drillStart.bind(_this), tooltipRendering: tooltipRendering.bind(_this), load: load.bind(_this), id: "treemap-container", ref: treemapInstance, palette: [
                            "#9999ff",
                            "#CCFF99",
                            "#FFFF99",
                            "#FF9999",
                            "#FF99FF",
                            "#FFCC66",
                        ], titleSettings: {
                            //To config title for treemap
                            text: "List of countries by population",
                            textStyle: { size: "15px" },
                        }, enableDrillDown: true, format: "n", useGroupingSeparator: true, dataSource: datasource.drilldown, weightValuePath: "Population", tooltipSettings: {
                            // To config tooltip for treemap
                            visible: true,
                            format: "${Name} : ${Population}",
                        }, leafItemSettings: {
                            // To config leafitem customization for treemap
                            labelPath: "Name",
                            showLabels: false,
                            labelStyle: { size: "0px" },
                            border: { color: "black", width: 0.5 },
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] }),
                        React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: "Continent", fill: "#336699", border: { color: "black", width: 0.5 } }),
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: "States", fill: "#336699", border: { color: "black", width: 0.5 } }),
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: "Region", showHeader: true, fill: "#336699", border: { color: "black", width: 0.5 } })))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { role: 'none', id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%", marginBottom: "20px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Drill Down View")),
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "drilldown-checkbox drilldownCheckbox", style: { paddingTop: "0px" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "drillView", checked: false, change: drillViewChange.bind(_this) })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Enable Bread Crumb")),
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "drilldown-checkbox drilldownCheckbox", style: { paddingTop: "0px" } },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "breadCrumb", checked: false, change: breadCrumbChange.bind(_this) })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Bread Crumb Text")),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "0px" } },
                                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: ' - ', style: { width: '100%' }, id: "fileName", ref: function (d) { return textElement = d; }, onChange: breadCrumbTextChange.bind(_this) })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Header Alignment")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "header", width: "100%", index: 0, dataSource: headerAlign, fields: { text: "text", value: "value" }, change: headerChange.bind(_this), ref: headerElement })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Label Alignment")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "label", width: "100%", index: 0, dataSource: labelAlign, fields: { text: "text", value: "value" }, change: labelChange.bind(_this), ref: labelElement }))))))))),
            React.createElement("div", { style: { float: "right", marginRight: "10px" } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_continents_by_population", target: "_blank" }, "en.wikipedia.org"))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
            React.createElement("p", null, "This sample demonstrates drill-down with the continents at the top level followed by regions and countries. By clicking a continent, you can view all the countries available in that continent clearly. Customizations can be done in the treemap, by using the options in the properties panel")),
        React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render a TreeMap with multiple items and drill it further. Change the drill down view and enable the breadcrumb using the options available in the properties panel."),
            React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices."))));
};
exports.default = Drilldown;
