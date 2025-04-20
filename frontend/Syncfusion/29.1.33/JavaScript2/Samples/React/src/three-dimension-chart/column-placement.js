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
exports.ColumnPlacement = exports.data4 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Column Series with disabled side by side placement
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [{ x: 'Jamesh', y: 1 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }, { x: 'Jack', y: 1 }, { x: 'Lucas', y: 1 }];
exports.data2 = [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }, { x: 'Jack', y: 2 }, { x: 'Lucas', y: 3 }];
exports.data3 = [{ x: 'Jamesh', y: 5 }, { x: 'Michael', y: 4 }, { x: 'John', y: 5 }, { x: 'Jack', y: 5 }, { x: 'Lucas', y: 6 }];
exports.data4 = [{ x: 'Jamesh', y: 10, text: 'Total 10' }, { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }, { x: 'Jack', y: 8, text: 'Total 8' }, { x: 'Lucas', y: 10, text: 'Total 10' }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Column Side placment sample
 */
var ColumnPlacement = /** @class */ (function (_super) {
    __extends(ColumnPlacement, _super);
    function ColumnPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnPlacement.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.Chart3DComponent, { id: 'charts', style: { textAlign: "center" }, load: this.load.bind(this), enableRotation: true, rotation: ej2_base_1.Browser.isDevice ? 5 : 25, depth: 500, primaryXAxis: {
                        valueType: 'Category', interval: 1, majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }, labelPlacement: 'BetweenTicks',
                        labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45',
                        labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0,
                    }, primaryYAxis: {
                        interval: ej2_base_1.Browser.isDevice ? 4 : 2,
                        majorTickLines: { width: 0 }
                    }, enableSideBySidePlacement: false, title: 'Fruit Consumption', tooltip: { enable: true }, legendSettings: { visible: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries3D, ej2_react_charts_1.Category3D, ej2_react_charts_1.Tooltip3D, ej2_react_charts_1.Legend3D] }),
                    React.createElement(ej2_react_charts_1.Chart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Grapes', type: 'Column', columnWidth: 0.2 }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Orange', type: 'Column', columnWidth: 0.2 }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'Apple', type: 'Column', columnWidth: 0.2 }),
                        React.createElement(ej2_react_charts_1.Chart3DSeriesDirective, { dataSource: exports.data4, xName: 'x', yName: 'y', name: 'Total', type: 'Column', columnWidth: 0.2 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows four series of columns in which each column is placed behind the previous column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the column 3D chart. The column 3D chart is used to compare the frequency, count, total, or average of data in different categories. The",
                    React.createElement("code", null, "enableSideBySidePlacement"),
                    " property is used to enable and disable side-by-side positioning."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "3D chart component features are segregated into individual feature-wise modules. To use column series, we need to inject",
                    React.createElement("code", null, "ColumnSeries3D"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the 3D chart can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column", "aria-label": "Navigate to the documentation for React 3D column chart" }, "documentation section"),
                    "."))));
    };
    ColumnPlacement.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    ColumnPlacement.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return ColumnPlacement;
}(sample_base_1.SampleBase));
exports.ColumnPlacement = ColumnPlacement;
