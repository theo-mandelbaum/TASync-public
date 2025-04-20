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
exports.EmptyPoints = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./empty-point-data-source.json");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}";
// custom code end
var EmptyPoints = /** @class */ (function (_super) {
    __extends(EmptyPoints, _super);
    function EmptyPoints() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyPoints.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                            text: 'Defective Count per 1000 Products from a Manufacturing Unit',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            labels: ['2007', '2008', '2009', '2010', '2011',
                                '2012', '2013', '2014', '2015', '2016', '2017'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, yAxis: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                                'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, dataSource: data.emptyPointDataSource, cellSettings: {
                            showLabel: true,
                            border: { width: 0, color: 'white' },
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, tooltipRender: this.tooltipTemplate, paletteSettings: {
                            palette: [{ color: 'rgb(172, 213, 242)' },
                                { color: 'rgb(127, 168, 201)' },
                                { color: 'rgb(82, 123, 160)' },
                                { color: 'rgb(37, 78, 119)' },
                            ],
                            type: 'Gradient'
                        }, tooltipSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, load: this.load.bind(this), legendSettings: {
                            position: 'Bottom',
                            width: '250px',
                            showLabel: true,
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        } },
                        React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample visualizes the number of defective product count per 1000 units coming out from a manufacturing unit. Data points are enhanced with labels and tooltip. Some data points were not marked with any values which indicates there are no defective products and these data points are termed as empty points.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render empty points in the Heatmap. The empty points or the points with no data can be marked using ",
                    React.createElement("code", null, "null"),
                    " in the data source. You can also customize the background color of the empty points by using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteSettingsModel/#emptypointcolor", target: '_blank' }, "emptyPointColor"),
                    " property in ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteSettingsModel/", target: '_blank' }, "paletteSettings")),
                React.createElement("p", null, "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend" }, "Legend"),
                    " module using the ",
                    React.createElement("code", null, '<Inject services={[Tooltip, Legend]} />'),
                    " method."))));
    };
    EmptyPoints.prototype.tooltipTemplate = function (args) {
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' defective units'];
    };
    ;
    EmptyPoints.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    ;
    return EmptyPoints;
}(sample_base_1.SampleBase));
exports.EmptyPoints = EmptyPoints;
