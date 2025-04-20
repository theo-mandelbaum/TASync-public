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
exports.Customization = void 0;
/**
 * Customization sample for treemap
 */
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/metal.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Customization = /** @class */ (function (_super) {
    __extends(Customization, _super);
    function Customization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Customization.prototype.load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Customization.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', titleSettings: {
                            text: 'US Gold medal categories in Summer Olympics - 2016',
                            textStyle: { size: '15px' }
                        }, dataSource: datasource.metal, weightValuePath: 'Gold', tooltipSettings: {
                            visible: true,
                            format: '${Sport} : ${Gold}'
                        }, leafItemSettings: {
                            showLabels: !ej2_base_1.Browser.isDevice,
                            labelPath: 'Sport',
                            fill: '#993399',
                            templatePosition: 'Center',
                            border: { color: 'black', width: 0.5 },
                            labelFormat: ' ${Sport} - ${Gold}',
                            labelTemplate: '<div style="pointer-events: none;"><img alt="Custom label template for illustrations" src="src/treemap/image/{{:GameImage}}" style="height:{{:ItemHeight}};width:{{:ItemWidth}};"></img></div>'
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source:",
                    React.createElement("a", { href: " https://en.wikipedia.org/wiki/United_States_at_the_2016_Summer_Olympics", target: "_blank" }, " en.wikipedia.org"))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of TreeMap sample" },
                React.createElement("p", null, "This sample depicts the gold medal categories of the 2016 U.S. Summer Olympics. Each category is denoted with label template.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the TreeMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to place custom HTML templates in the TreeMap items. The default text of the labels also have been formatted.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "TreeMap component features are segregated into individual feature-wise modules. To use a tooltip, inject the ",
                    React.createElement("code", null, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapTooltip)"),
                    " method."))));
    };
    return Customization;
}(sample_base_1.SampleBase));
exports.Customization = Customization;
