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
exports.Layout = void 0;
/**
 * Layout sample for treemap
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/economics.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist = [
            { text: 'Squarified', value: 'Squarified' },
            { text: 'Horizontal', value: 'SliceAndDiceHorizontal' },
            { text: 'Vertical', value: 'SliceAndDiceVertical' },
            { text: 'Auto', value: 'SliceAndDiceAuto' },
        ];
        _this.dropList = [
            { text: 'TopLeftBottomRight', value: 'TopLeftBottomRight' },
            { text: 'TopRightBottomLeft', value: 'TopRightBottomLeft' },
            { text: 'BottomLeftTopRight', value: 'BottomLeftTopRight' },
            { text: 'BottomRightTopLeft', value: 'BottomRightTopLeft' }
        ];
        return _this;
    }
    Layout.prototype.layoutChange = function () {
        this.treemapInstance.layoutType = this.layoutElement.value;
        this.treemapInstance.refresh();
    };
    Layout.prototype.renderDirectionChange = function () {
        this.treemapInstance.renderDirection = this.renderDirectionElement.value;
        this.treemapInstance.refresh();
    };
    Layout.prototype.load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Layout.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { className: 'col-md-9' },
                        React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                                text: 'Top 10 countries by GDP Nominal - 2015',
                                textStyle: { size: '15px' }
                            }, dataSource: datasource.economics, weightValuePath: 'GDP', tooltipSettings: {
                                visible: true,
                                format: '${State}<br>Rank : ${Rank}'
                            }, rangeColorValuePath: 'GDP', leafItemSettings: {
                                labelPath: 'State',
                                labelFormat: '${State}<br>$${GDP} Trillion<br>(${percentage} %)',
                                labelStyle: {
                                    color: '#000000'
                                },
                                border: {
                                    color: '#000000',
                                    width: 0.5
                                },
                                colorMapping: [
                                    {
                                        from: 1550,
                                        to: 17946,
                                        color: '#9cbb59',
                                        minOpacity: 0.7,
                                        maxOpacity: 1,
                                    }
                                ]
                            } },
                            React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] })),
                        React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                            "Source:",
                            React.createElement("a", { href: "https://www.reinisfischer.com/top-10-largest-economies-world-gdp-nominal-2015", target: "_blank" }, "www.reinisfischer.com"))),
                    React.createElement("div", { className: 'col-md-3 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { role: 'none', id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Layout Type")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "layoutMode", width: "100%", index: 0, change: this.layoutChange.bind(this), ref: function (d) { return _this.layoutElement = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { paddingLeft: '0px' } }, "Render Direction")),
                                        React.createElement("td", null,
                                            React.createElement("div", null,
                                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "highlightMode", width: "100%", index: 0, dataSource: this.dropList, fields: { text: 'text', value: 'value' }, change: this.renderDirectionChange.bind(this), ref: function (d) { return _this.renderDirectionElement = d; } })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
                React.createElement("p", null, "This sample orders the countries based on the unemployment rate by rendering TreeMap in the right-to-left (RTL) direction")),
            React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render a TreeMap from the right-to-left direction. The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices."))));
    };
    return Layout;
}(sample_base_1.SampleBase));
exports.Layout = Layout;
