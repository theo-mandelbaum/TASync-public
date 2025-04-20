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
exports.Selection = void 0;
/**
 * Selection and Highlight sample for treemap
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/import.json");
var datasource = data;
var SAMPLE_CSS = "\n\t.e-view.fluent2 #property .e-checkbox-wrapper .e-icons, .e-view.fluent2-dark #property .e-checkbox-wrapper .e-icons {\n        margin-left: 0px;\n    }\n\t.drilldownCheckbox{\n\t\tmargin-left: 0px;\n\t}\n\t.e-view.fluent2-highcontrast #property .drilldownCheckbox {\n        margin-left: -8px;\n    }\n\t";
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist1 = [
            { value: 'Item' },
            { value: 'Child' },
            { value: 'Parent' },
            { value: 'All' },
        ];
        _this.droplist2 = [
            { value: 'Item' },
            { value: 'Child' },
            { value: 'Parent' },
            { value: 'All' },
        ];
        return _this;
    }
    Selection.prototype.highlightChange = function (args) {
        var value = args.checked;
        this.treemapInstance.highlightSettings.enable = value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.highlightModeChange = function () {
        this.treemapInstance.highlightSettings.mode = this.highlightModeElement.value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.selectionchange = function (args) {
        var value = args.checked;
        this.treemapInstance.selectionSettings.enable = value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.selectionModeChange = function () {
        this.treemapInstance.selectionSettings.mode = this.selectionModeElement.value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Selection.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { className: 'col-md-9' },
                        React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                                text: 'Import and Export details of US'
                            }, selectionSettings: {
                                enable: true,
                                fill: '#58a0d3',
                                border: { width: 0.3, color: 'black' },
                                opacity: '1'
                            }, highlightSettings: {
                                enable: true,
                                fill: '#71b0dd',
                                border: { width: 0.3, color: 'black' },
                                opacity: '1'
                            }, leafItemSettings: {
                                labelPath: 'type',
                                fill: '#8ebfe2',
                                labelPosition: 'Center',
                                gap: 10
                            }, dataSource: datasource.import, weightValuePath: 'sales' },
                            React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapHighlight, ej2_react_treemap_1.TreeMapSelection] }),
                            React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                                React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'dataType', fill: '#c5e2f7', headerStyle: { size: '16px' }, headerAlignment: 'Center', groupGap: 5 }),
                                React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'product', fill: '#a4d1f2', headerAlignment: 'Center', groupGap: 2 }))),
                        React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                            "Source:",
                            React.createElement("a", { href: "https://www.indexmundi.com/united_states/imports_commodities.html", target: "_blank" }, "www.indexmundi.com"))),
                    React.createElement("div", { className: 'col-md-3 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { role: 'none', id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { "height": "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } },
                                                React.createElement("b", null, "Highlight")))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, " Enable")),
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "drilldownCheckbox", style: { paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'highlightEnable', checked: true, change: this.highlightChange.bind(this) }, " ")))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Mode")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "highlightmode", width: "100%", index: 0, change: this.highlightModeChange.bind(this), ref: function (d) { return _this.highlightModeElement = d; }, dataSource: this.droplist1, fields: { text: 'value', value: 'value' } })))),
                                    React.createElement("tr", { style: { "height": "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } },
                                                React.createElement("b", null, "Selection")))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Enable")),
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "drilldownCheckbox", style: { paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'SelectionEnable', checked: true, change: this.selectionchange.bind(this) }, " ")))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Mode")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "selectionmode", width: "100%", index: 0, change: this.selectionModeChange.bind(this), ref: function (d) { return _this.selectionModeElement = d; }, dataSource: this.droplist2, fields: { text: 'value', value: 'value' } })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
                React.createElement("p", null, "This sample depicts the details of goods imported by Japan. Selection and highlight options have been enabled in this sample.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see the modes available for performing highlight and selection in TreeMap. It can be either enabled or disabled."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "TreeMap component features are segregated into individual feature-wise modules. To use highlight and selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapSelection)"),
                    "inject the ",
                    React.createElement("code", null, "Highlight"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapHighlight)"),
                    " method."))));
    };
    return Selection;
}(sample_base_1.SampleBase));
exports.Selection = Selection;
