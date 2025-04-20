"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Right to left for bullet chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n      .control-fluid {\n          padding: 0px !important;\n      }\n      .charts {\n        align :center\n    }";
function BulletChartOrientation() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var bulletChartInstance;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section col-md-8', style: { textAlign: "center" } },
            React.createElement(ej2_react_charts_1.BulletChartComponent, { id: 'bar-Orientation', ref: function (chart) { return bulletChartInstance = chart; }, width: '19%', height: '400', animation: { enable: false }, tooltip: { enable: true }, valueField: 'value', targetField: 'target', categoryField: 'name', minimum: 0, maximum: 30, interval: 5, labelFormat: '{value}%', margin: { left: 10 }, titlePosition: 'Top', orientation: 'Vertical', load: bulletLoad.bind(this), dataSource: [{ value: 23, target: 27, name: 'Product A' }] },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BulletTooltip] }),
                React.createElement(ej2_react_charts_1.BulletRangeCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 20 }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 25 }),
                    React.createElement(ej2_react_charts_1.BulletRangeDirective, { end: 30 })))),
        React.createElement("div", { className: 'property-section col-md-4' },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: '60%' } },
                            React.createElement("div", { className: 'prop-text' }, "Feature Mode")),
                        React.createElement("td", { style: { width: '40%' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'featureType', value: 'Vertical', dataSource: ['Vertical', 'Horizontal'], change: function (args) {
                                    if (args.value === 'Horizontal') {
                                        bulletChartInstance.width = '80%';
                                        bulletChartInstance.height = '100px';
                                    }
                                    else {
                                        bulletChartInstance.width = '19%';
                                        bulletChartInstance.height = '400px';
                                    }
                                    bulletChartInstance.orientation = args.value;
                                    bulletChartInstance.refresh();
                                } })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a bullet chart with vertical orientation to compare different values.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart."))));
    function bulletLoad(args) {
        var chart = document.getElementById('bar-Orientation');
        chart.setAttribute('title', '');
        (0, theme_color_1.loadBulletChartTheme)(args);
    }
}
exports.default = BulletChartOrientation;
