"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Color Mapping sample for treemap
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/color.json");
var datasource = data;
var SAMPLE_CSS = "\n    .colorMappingPadding {\n        margin-left: -10px;margin-top: -10px;padding-left: 10px;\n    }\n    .e-view.fluent2-highcontrast #property .colorMappingPadding {\n        margin-left: -18px;\n    }\n    .e-view.fluent2 #property .colorMappingPadding, .e-view.fluent2-dark #property .colorMappingPadding {\n        margin-left: -8px;margin-top: -10px;padding-left: 0px;\n    }";
var ColorMapping = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treemapInstance = (0, react_1.useRef)(null);
    var typeElement = (0, react_1.useRef)(null);
    var minOpacityElement = (0, react_1.useRef)(null);
    var maxOpacityElement = (0, react_1.useRef)(null);
    var opacityElement;
    // Code for Property Panel
    var dropList = [
        { text: "Range", value: "RangeColorMapping" },
        { text: "Equal", value: "EqualColorMapping" },
        { text: "Desaturation", value: "DesaturationColorMapping" },
    ];
    var minOpacityChange = function () {
        if (opacityElement.checked && !opacityElement.disabled) {
            var minOpacity = parseFloat(minOpacityElement.current.value);
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                minOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                minOpacity;
            treemapInstance.current.refresh();
        }
    };
    var maxOpacityChange = function () {
        if (opacityElement.checked && !opacityElement.disabled) {
            var maxOpacity = parseFloat(maxOpacityElement.current.value);
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                maxOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                maxOpacity;
            treemapInstance.current.refresh();
        }
    };
    var opacityChange = function (args) {
        var value = args.checked;
        var minOpacity = parseFloat(minOpacityElement.current.value.toString());
        var maxOpacity = parseFloat(maxOpacityElement.current.value.toString());
        if (value) {
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                minOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                maxOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                minOpacity;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                maxOpacity;
            minOpacityElement.current.disabled = false;
            maxOpacityElement.current.disabled = false;
        }
        else {
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                null;
            minOpacityElement.current.disabled = true;
            maxOpacityElement.current.disabled = true;
        }
        treemapInstance.current.refresh();
    };
    var typeChange = function () {
        var value = typeElement.current.value.toString();
        if (value === "RangeColorMapping") {
            opacityElement.disabled = true;
            treemapInstance.current.rangeColorValuePath = "Area";
            treemapInstance.current.leafItemSettings.colorMapping[2].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[2].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[5].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[5].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].from = 100000;
            treemapInstance.current.leafItemSettings.colorMapping[0].to = 250000;
            treemapInstance.current.leafItemSettings.colorMapping[0].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].label =
                "0.1M - 0.25M";
            treemapInstance.current.leafItemSettings.colorMapping[0].color =
                "#547C84";
            treemapInstance.current.leafItemSettings.colorMapping[1].from = 250000;
            treemapInstance.current.leafItemSettings.colorMapping[1].to = 500000;
            treemapInstance.current.leafItemSettings.colorMapping[1].label =
                "0.25M - 0.50M";
            treemapInstance.current.leafItemSettings.colorMapping[1].color =
                "#37AFAB";
            treemapInstance.current.leafItemSettings.colorMapping[2].from = 500000;
            treemapInstance.current.leafItemSettings.colorMapping[2].to = 750000;
            treemapInstance.current.leafItemSettings.colorMapping[2].label =
                "0.5M - 0.75M";
            treemapInstance.current.leafItemSettings.colorMapping[2].color =
                "#A4D6AD";
            treemapInstance.current.leafItemSettings.colorMapping[2].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].from = 750000;
            treemapInstance.current.leafItemSettings.colorMapping[3].to = 2200000;
            treemapInstance.current.leafItemSettings.colorMapping[3].label =
                "0.75M - 2M";
            treemapInstance.current.leafItemSettings.colorMapping[3].color =
                "#DEEBAE";
            treemapInstance.current.leafItemSettings.colorMapping[4].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[5].from = null;
            treemapInstance.current.legendSettings.title.text = "Area";
            treemapInstance.current.refresh();
        }
        else if (value === "EqualColorMapping") {
            opacityElement.disabled = true;
            treemapInstance.current.rangeColorValuePath = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].value =
                "North America";
            treemapInstance.current.leafItemSettings.colorMapping[0].color =
                "#DEEBAE";
            treemapInstance.current.leafItemSettings.colorMapping[1].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].value =
                "Oceania";
            treemapInstance.current.leafItemSettings.colorMapping[1].color =
                "#A4D6AD";
            treemapInstance.current.leafItemSettings.colorMapping[2].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].value = "Asia";
            treemapInstance.current.leafItemSettings.colorMapping[2].color =
                "#37AFAB";
            treemapInstance.current.leafItemSettings.colorMapping[3].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].value = "Africa";
            treemapInstance.current.leafItemSettings.colorMapping[3].color =
                "#547C84";
            treemapInstance.current.leafItemSettings.colorMapping[4].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[4].value = "Europe";
            treemapInstance.current.leafItemSettings.colorMapping[4].color =
                "#CEBF93";
            treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[1].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[2].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[2].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[3].maxOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].minOpacity =
                null;
            treemapInstance.current.leafItemSettings.colorMapping[4].maxOpacity =
                null;
            treemapInstance.current.equalColorValuePath = "Location";
            treemapInstance.current.legendSettings.title.text = "Continent";
            treemapInstance.current.refresh();
        }
        else if (value === "DesaturationColorMapping") {
            opacityElement.disabled = false;
            treemapInstance.current.rangeColorValuePath = "Area";
            treemapInstance.current.equalColorValuePath = null;
            var minOpacity = document.getElementById("minOpacity");
            var maxOpacity = document.getElementById("maxOpacity");
            treemapInstance.current.leafItemSettings.colorMapping[2].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].label = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].from = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].to = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].from = 100000;
            treemapInstance.current.leafItemSettings.colorMapping[0].to = 2230800;
            treemapInstance.current.leafItemSettings.colorMapping[0].label =
                "0.1M - 2M";
            treemapInstance.current.leafItemSettings.colorMapping[0].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].value = null;
            treemapInstance.current.leafItemSettings.colorMapping[2].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[1].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[3].color = null;
            treemapInstance.current.leafItemSettings.colorMapping[0].color = [
                "#F0D6AD",
                "#19547B",
            ];
            if (opacityElement.checked) {
                treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                    parseFloat(minOpacity.value);
                treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                    parseFloat(maxOpacity.value);
            }
            else {
                treemapInstance.current.leafItemSettings.colorMapping[0].minOpacity =
                    null;
                treemapInstance.current.leafItemSettings.colorMapping[0].maxOpacity =
                    null;
            }
            treemapInstance.current.legendSettings.title.text = "Area";
            treemapInstance.current.refresh();
        }
    };
    var load = function (args) {
        // custom code start
        var theme = location.hash.split("/")[1];
        theme = theme ? theme : "Material";
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1))
            .replace(/-dark/i, "Dark")
            .replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        var sliderMin = document.getElementById("hideOne");
        var sliderMax = document.getElementById("hideTwo");
        var opacityCheck = document.getElementById("hideThree");
        var dropListValue = document.getElementById("Type");
        var opacityChecked = document.getElementById("opacity");
        if (dropListValue.value === "Desaturation") {
            sliderMin.style.visibility = "visible";
            if (opacityChecked.checked) {
                sliderMax.style.visibility = "visible";
                opacityCheck.style.visibility = "visible";
            }
            else {
                sliderMax.style.visibility = "hidden";
                opacityCheck.style.visibility = "hidden";
            }
        }
        else {
            sliderMin.style.visibility = "hidden";
            sliderMax.style.visibility = "hidden";
            opacityCheck.style.visibility = "hidden";
        }
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "col-md-9" },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: load.bind(_this), id: "treemap-container", ref: treemapInstance, titleSettings: {
                            //To config title for treemap
                            text: "Top 10 largest islands in the World",
                            textStyle: { size: "15px" },
                        }, format: "n", useGroupingSeparator: true, rangeColorValuePath: "Area", dataSource: datasource.color, legendSettings: {
                            // To config legend for treemap
                            visible: true,
                            position: "Bottom",
                            mode: "Interactive",
                            height: "10",
                            title: {
                                text: "Area",
                            },
                        }, tooltipSettings: {
                            // To config tooltip for treemap
                            visible: true,
                            format: "Name: ${Name}<br>Area: ${Area} per square kms<br>Continent: ${Location}",
                            opacity: 0.8,
                        }, weightValuePath: "Area", leafItemSettings: {
                            // To config leafitem customization for treemap
                            labelPath: "Name",
                            border: { color: "white", width: 0.5 },
                            colorMapping: [
                                {
                                    from: 100000,
                                    to: 250000,
                                    label: "0.1M - 0.25M",
                                    color: "#547C84",
                                },
                                {
                                    from: 250000,
                                    to: 550000,
                                    label: "0.25M - 0.55M",
                                    color: "#37AFAB",
                                },
                                {
                                    from: 550000,
                                    to: 750000,
                                    label: "0.55M - 0.75M",
                                    color: "#A4D6AD",
                                },
                                {
                                    from: 750000,
                                    to: 2250000,
                                    label: "0.75M - 2M",
                                    color: "#DEEBAE",
                                },
                                { to: null, from: null, color: "null" },
                                { to: null, from: null, color: "null" },
                            ],
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] }))),
                React.createElement("div", { className: "col-md-3 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                        React.createElement("table", { role: "none", id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%", marginBottom: "20px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Color Mapping Type")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Type", width: "100%", index: 0, change: typeChange.bind(_this), ref: typeElement, dataSource: dropList, fields: { text: "text", value: "value" } })))),
                                React.createElement("tr", { id: "hideOne", style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Change Opacity")),
                                    React.createElement("td", null,
                                        React.createElement("div", { className: "colorMappingPadding" },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "opacity", checked: false, change: opacityChange.bind(_this), ref: function (d) { return (opacityElement = d); }, disabled: true, style: { paddingLeft: "0px" } })))),
                                React.createElement("tr", { id: "hideTwo", style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Min Opacity")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "minOpacity", disabled: true, onChange: minOpacityChange.bind(_this), ref: minOpacityElement, min: "0", max: "1", step: "0.1", defaultValue: "0.5" })))),
                                React.createElement("tr", { id: "hideThree", style: { height: "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: "0px" } }, "Max Opacity")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "maxOpacity", disabled: true, onChange: maxOpacityChange.bind(_this), ref: maxOpacityElement, min: "0", max: "1", step: "0.1", defaultValue: "1" })))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
            React.createElement("p", null, "This sample visualizes the top 10 largest islands in the world based on area. The color mapping is applied to the items to differentiate them from other items.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render a tree map with color mapping. The range color mapping and desaturation color mapping group the shapes based on the area size, whereas the equal color mapping groups the shapes based on the continent value. The legend is enabled in this example to represent each color mapping.",
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
exports.default = ColorMapping;
