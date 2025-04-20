"use strict";
/**
 * ColorMapping sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var data = require("./map-data/color-mapping.json");
var usa = require("./map-data/usa.json");
var datasource = data;
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .toolback {\n        border-radius: 4px;\n        border: 1px #abb9c6;\n        opacity: 90%;\n        background: rgba(53, 63, 76, 0.90);\n        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);\n        padding-bottom: 10px;\n        padding-top: 10px;\n        padding-left: 10px;\n        padding-right: 10px;\n        width: 140px;\n    }\n    .listing1 {\n        font-size:13px;\n        color:#cccccc\n    }\n    .listing2 {\n        font-size:13px;\n        color:#ffffff;\n        font-weight: 500;\n    }\n    .fabric .opacityCheckbox, .fabric-dark .opacityCheckbox{\n        margin-top: -7px;\n    }\n    .colorOpacityCheckBox {\n        padding-left: 0px;margin-top: -10px;margin-left: -7px;\n    }\n    .e-view.fluent2-highcontrast #property .colorOpacityCheckBox {\n        margin-left: -15px !important;\n    }\n    .e-view.fluent2 #property .colorOpacityCheckBox, .e-view.fluent2-dark #property .colorOpacityCheckBox {\n        padding-left: 0px;margin-top: -10px;margin-left: -6px;\n    }";
var ColorMap = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('hidden'), hideOne = _a[0], setHideOne = _a[1];
    var _b = (0, react_1.useState)('hidden'), hideTwo = _b[0], setHideTwo = _b[1];
    var _c = (0, react_1.useState)('hidden'), hideThree = _c[0], setHideThree = _c[1];
    var mapInstance = (0, react_1.useRef)(null);
    var typeElement = (0, react_1.useRef)(null);
    var minOpacityElement = (0, react_1.useRef)(null);
    var maxOpacityElement = (0, react_1.useRef)(null);
    var opacityElement = (0, react_1.useRef)(null);
    var dropList = [
        { text: 'Range', value: 'RangeColorMapping' },
        { text: 'Equal', value: 'EqualColorMapping' },
        { text: 'Desaturation', value: 'DesaturationColorMapping' }
    ];
    var colorMappingData = [
        { from: 0.1, to: 1, color: "#DEEBAE", label: "0 - 1" },
        { from: 1, to: 2, color: "#A4D6AD", label: "1 - 2" },
        { from: 2, to: 3, color: "#37AFAB", label: "2 - 3" },
        { from: 3, to: 4, color: "#547C84", label: "3 - 4" },
        { from: 4, to: 5, color: "#CEBF93", label: "4 - 5" },
        { from: 5, to: 6, color: "#a69d70", label: "5 - 6" },
    ];
    var template = '<div id="template"><div class="toolback"><div class="listing2"><center>${State}</center></div>' + '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"/><div><center>  <span class="listing1">Inches : </span>' + '<span class="listing2">${inches}</span></center></div><div><center>  <span class="listing1">Category : </span>' + '<span class="listing2">${value}</span> </center></div></div></div>';
    var minOpacityChange = function () {
        if (opacityElement.current.checked && !opacityElement.current.disabled) {
            var minOpacity = parseFloat(minOpacityElement.current.value);
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].minOpacity = minOpacity;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].minOpacity = minOpacity;
        }
    };
    var maxOpacityChange = function () {
        if (opacityElement.current.checked && !opacityElement.current.disabled) {
            var maxOpacity = parseFloat(maxOpacityElement.current.value);
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].maxOpacity = maxOpacity;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].maxOpacity = maxOpacity;
        }
    };
    var opacityChange = function (args) {
        var value = args.checked;
        if (value) {
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(minOpacityElement.current.value);
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacityElement.current.value);
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].minOpacity = parseFloat(minOpacityElement.current.value);
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].maxOpacity = parseFloat(maxOpacityElement.current.value);
            minOpacityElement.current.disabled = false;
            maxOpacityElement.current.disabled = false;
        }
        else {
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].minOpacity = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].maxOpacity = null;
            minOpacityElement.current.disabled = true;
            maxOpacityElement.current.disabled = true;
        }
    };
    var typeChange = function () {
        var value = typeElement.current.value.toString();
        if (value === 'RangeColorMapping') {
            opacityElement.current.disabled = true;
            mapInstance.current.layers[0].shapeSettings.colorValuePath = 'inches';
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].to = 1;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].label = '0 - 1';
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].from = 1;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].to = 2;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].label = '1 - 2';
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].from = 2;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].to = 3;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].label = '2 - 3';
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].from = 3;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].to = 4;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].color = '#547C84';
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].label = '3 - 4';
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].from = 4;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].to = 5;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].color = '#CEBF93';
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].label = '4 - 5';
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].from = 5;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].to = 6;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = '#a69d70';
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = '5 - 6';
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].value = null;
            mapInstance.current.legendSettings.title.text = 'Inches';
        }
        else if (value === 'EqualColorMapping') {
            opacityElement.current.disabled = true;
            mapInstance.current.layers[0].shapeSettings.colorValuePath = 'value';
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].value = 'Low';
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].value = 'Moderate';
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].value = 'High';
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].value = null;
            mapInstance.current.legendSettings.title.text = 'Category';
        }
        if (value === 'DesaturationColorMapping') {
            if (opacityElement.current.checked) {
                mapInstance.current.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(minOpacityElement.current.value);
                mapInstance.current.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacityElement.current.value);
            }
            else {
                mapInstance.current.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
                mapInstance.current.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            }
            mapInstance.current.layers[0].shapeSettings.colorValuePath = 'inches';
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].to = 6;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[0].label = '0 - 6';
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[1].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[2].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[3].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[4].value = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].from = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].to = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].color = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].label = null;
            mapInstance.current.layers[0].shapeSettings.colorMapping[5].value = null;
            mapInstance.current.legendSettings.title.text = 'Inches';
            opacityElement.current.disabled = false;
        }
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        var dropListValue = document.getElementById('Type');
        var opacityChecked = document.getElementById('opacity');
        if (dropListValue.value === 'Desaturation') {
            setHideOne("visible");
            if (opacityChecked.checked) {
                setHideTwo("visible");
                setHideThree("visible");
            }
            else {
                setHideTwo("hidden");
                setHideThree("hidden");
            }
        }
        else {
            setHideOne("hidden");
            setHideTwo("hidden");
            setHideThree("hidden");
        }
        //custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: load, ref: mapInstance, titleSettings: { text: 'Spring Precipitation Averages of US States', textStyle: { size: '16px' } }, zoomSettings: { enable: false }, legendSettings: { visible: true, position: 'Bottom', height: '10', width: '80%', mode: 'Interactive', titleStyle: { size: '18px' }, title: { text: 'Inches' } } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { dataSource: datasource.color, shapeDataPath: 'State', shapeData: usa, shapePropertyPath: 'name', shapeSettings: { colorValuePath: 'inches', fill: '#E5E5E5', colorMapping: colorMappingData }, tooltipSettings: { visible: true, valuePath: 'State', template: template } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    " ",
                    React.createElement("a", { href: "https://simple.wikipedia.org/wiki/List_of_countries_by_population_density", target: "_blank" }, "simple.wikipedia.org"))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '0px' } }, "Color Mapping Type")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Type", width: "100%", index: 0, change: typeChange.bind(_this), ref: typeElement, dataSource: dropList, fields: { text: 'text', value: 'value' } })))),
                            React.createElement("tr", { id: "hideOne", style: { visibility: hideOne } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '0px' } }, "Change Opacity")),
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'opacityCheckbox colorOpacityCheckBox' },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'opacity', checked: false, change: opacityChange.bind(_this), ref: opacityElement, disabled: true, style: { paddingLeft: '0px' } })))),
                            React.createElement("tr", { id: "hideTwo", style: { height: '50px', visibility: hideTwo } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '0px' } }, "Min Opacity")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: 'minOpacity', disabled: true, onChange: minOpacityChange, ref: minOpacityElement, min: "0", max: "1", step: "0.1", defaultValue: "0.5", style: { width: '100%' } })))),
                            React.createElement("tr", { id: "hideThree", style: { height: '50px', visibility: hideThree } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: '0px' } }, "Max Opacity")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: 'maxOpacity', disabled: true, onChange: maxOpacityChange, ref: maxOpacityElement, min: "0", max: "1", step: "0.1", defaultValue: "1", style: { width: '100%' } }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample shows the average amount of rainfall and snowfall in spring season of all the states in US. Color mapping is applied to the shapes.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render a map with color mapping. Range color mapping and desaturation color mapping groups the shapes based on the inches value, where the equal color mapping groups based on the category (low, moderate or high) values. Legend is enabled in this example to represent each color mapping."),
            React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Maps component features are segregated into individual feature-wise modules. To use the legend, inject the ",
                React.createElement("code", null, "Legend"),
                " module using the ",
                React.createElement("code", null, "Maps.Inject(Legend)"),
                " method."))));
};
exports.default = ColorMap;
