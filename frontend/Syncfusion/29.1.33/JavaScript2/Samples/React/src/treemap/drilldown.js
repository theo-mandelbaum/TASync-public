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
exports.Drilldown = void 0;
/**
 * Drilldown sample for treemap
 */
var React = require("react");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./treemap-data/drilldown-sample.json");
var datasource = data;
var SAMPLE_CSS = "\n\t.drilldown-checkbox {\n        padding-left: 0px !important;\n    }\n\t.drilldownCheckbox {\n        padding-left: 0px;\n    }\n    .e-view.fluent2-highcontrast #property .drilldownCheckbox {\n        padding-left: 0px; margin-left: -8px;\n    }\n    .e-view.fluent2 #property .drilldown-checkbox, .e-view.fluent2-dark #property .drilldown-checkbox {\n        padding-left: 0px; margin-left: -10px;\n    }";
var Drilldown = /** @class */ (function (_super) {
    __extends(Drilldown, _super);
    function Drilldown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headerAlign = [
            { text: 'Near', value: 'Near' },
            { text: 'Far', value: 'Far' },
            { text: 'Center', value: 'Center' }
        ];
        _this.labelAlign = [
            { text: 'Near', value: 'Near' },
            { text: 'Far', value: 'Far' },
            { text: 'Center', value: 'Center' }
        ];
        return _this;
    }
    Drilldown.prototype.drillViewChange = function (args) {
        var value = args.checked;
        this.treemapInstance.drillDownView = value;
        this.treemapInstance.refresh();
    };
    Drilldown.prototype.breadCrumbChange = function (args) {
        var value = args.checked;
        this.treemapInstance.enableBreadcrumb = value;
        this.treemapInstance.refresh();
    };
    Drilldown.prototype.breadCrumbTextChange = function (args) {
        var value = this.nameElement.value;
        this.treemapInstance.breadcrumbConnector = value;
        this.treemapInstance.refresh();
    };
    Drilldown.prototype.headerChange = function () {
        for (var i = 0; i < this.treemapInstance.levels.length - 1; i++) {
            this.treemapInstance.levels[i].headerAlignment = this.headerElement.value;
        }
        this.treemapInstance.refresh();
    };
    Drilldown.prototype.labelChange = function () {
        this.treemapInstance.levels[2].headerAlignment = this.labelElement.value;
        this.treemapInstance.refresh();
    };
    Drilldown.prototype.load = function (args) {
        //custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    /* tslint:disable:no-string-literal */
    Drilldown.prototype.drillStart = function (args) {
        if (args.item[Object.keys(args.item)[0]].length === 1) {
            args.treemap.levels[2].showHeader = true;
        }
        else {
            args.treemap.levels[2].showHeader = false;
        }
    };
    Drilldown.prototype.tooltipRendering = function (args) {
        if (args.item['groupIndex'] !== 2) {
            args.cancel = true;
        }
    };
    Drilldown.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { className: 'col-md-9' },
                        React.createElement(ej2_react_treemap_1.TreeMapComponent, { drillStart: this.drillStart.bind(this), tooltipRendering: this.tooltipRendering.bind(this), load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, palette: ['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66'], titleSettings: {
                                text: 'List of countries by population',
                                textStyle: { size: '15px' }
                            }, enableDrillDown: true, format: "n", useGroupingSeparator: true, dataSource: datasource.drilldown, weightValuePath: 'Population', tooltipSettings: {
                                visible: true,
                                format: '${Name} : ${Population}'
                            }, leafItemSettings: {
                                labelPath: 'Name',
                                showLabels: false,
                                labelStyle: { size: '0px' },
                                border: { color: 'black', width: 0.5 }
                            } },
                            React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] }),
                            React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                                React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'Continent', fill: '#336699', border: { color: 'black', width: 0.5 } }),
                                React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'States', fill: '#336699', border: { color: 'black', width: 0.5 } }),
                                React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'Region', showHeader: true, fill: '#336699', border: { color: 'black', width: 0.5 } })))),
                    React.createElement("div", { className: 'col-md-3 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { role: 'none', id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Drill Down View")),
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "drilldown-checkbox drilldownCheckbox", style: { paddingTop: '0px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'drillView', checked: false, change: this.drillViewChange.bind(this), ref: function (d) { return _this.drillviewElement = d; } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Enable Bread Crumb")),
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "drilldown-checkbox drilldownCheckbox", style: { paddingTop: '0px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'breadCrumb', checked: false, change: this.breadCrumbChange.bind(this), ref: function (d) { return _this.breadCrumbElement = d; } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Bread Crumb Text")),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: '0px' } },
                                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: ' - ', style: { width: '100%' }, id: "breadCrumbText", ref: function (d) { return _this.nameElement = d; }, onChange: this.breadCrumbTextChange.bind(this) })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Header Alignment")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "header", width: "100%", index: 0, dataSource: this.headerAlign, fields: { text: 'text', value: 'value' }, change: this.headerChange.bind(this), ref: function (d) { return _this.headerElement = d; } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Label Alignment")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "label", width: "100%", index: 0, dataSource: this.labelAlign, fields: { text: 'text', value: 'value' }, change: this.labelChange.bind(this), ref: function (d) { return _this.labelElement = d; } }))))))))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/List_of_continents_by_population", target: "_blank" }, "en.wikipedia.org"))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
                React.createElement("p", null, "This sample demonstrates drill-down with the continents at the top level followed by regions and countries. By clicking a continent, you can view all the countries available in that continent clearly. Customizations can be done in the treemap, by using the options in the properties panel")),
            React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render a TreeMap with multiple items and drill it further. Change the drill down view and enable the breadcrumb using the options available in the properties panel."),
                React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices."))));
    };
    return Drilldown;
}(sample_base_1.SampleBase));
exports.Drilldown = Drilldown;
