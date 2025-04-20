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
exports.RTL = void 0;
/**
 * Drilldown sample for treemap
 */
var React = require("react");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/rtl-data.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t\t}";
var RTL = /** @class */ (function (_super) {
    __extends(RTL, _super);
    function RTL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTL.prototype.load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    RTL.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, palette: ['#5B244D', '#6F3953', ' #87525A', '#A26F63', '#BA896B', '#D5A574', '#F1C37D'], titleSettings: {
                            text: 'List of countries by unemployment rate',
                            textStyle: { size: '15px' }
                        }, enableDrillDown: true, format: "n", useGroupingSeparator: true, enableRtl: true, renderDirection: 'TopRightBottomLeft', dataSource: datasource.rtl, weightValuePath: 'Size', tooltipSettings: {
                            visible: true,
                            format: '${Size} : ${Name}'
                        }, leafItemSettings: {
                            labelPath: 'Name',
                            showLabels: true
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] }),
                        React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'Continent', border: { color: 'black', width: 0.5 }, headerAlignment: 'Far' }),
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'Country', border: { color: 'black', width: 0.5 }, headerAlignment: 'Center' })))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://www.indexmundi.com/facts/visualizations/treemap#SL.UEM.TOTL.ZS:SL.UEM.TOTL.ZS", target: "_blank" }, "www.indexmundi.com"))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
                React.createElement("p", null, "This sample orders the countries based on the unemployment rate, by rendering the TreeMap in right to left (RTL) direction.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render a TreeMap from right to left direction. The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch-enabled devices."))));
    };
    return RTL;
}(sample_base_1.SampleBase));
exports.RTL = RTL;
