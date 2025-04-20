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
exports.MultiLevelLabels = void 0;
var React = require("react");
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./multi-level-label-data.json");
var sample_base_1 = require("../common/sample-base");
var MultiLevelLabels = /** @class */ (function (_super) {
    __extends(MultiLevelLabels, _super);
    function MultiLevelLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiLevelLabels.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', titleSettings: {
                            text: 'Product wise Monthly sales revenue for a e-commerce website',
                            textStyle: {
                                size: '15px',
                                fontWeight: '500',
                                fontStyle: 'Normal',
                                fontFamily: 'inherit'
                            }
                        }, xAxis: {
                            labels: ['Laptop', 'Mobile', 'Gaming', 'Cosmetics', 'Fragrance', 'Watches', 'Handbags', 'Apparel',
                                'Kitchenware', 'Furniture', 'Home Decor'],
                            border: {
                                width: 1,
                                type: 'Rectangle',
                                color: '#a19d9d'
                            },
                            textStyle: {
                                color: 'black',
                                fontFamily: 'inherit'
                            },
                            multiLevelLabels: [
                                {
                                    border: { type: 'Rectangle', color: '#a19d9d' },
                                    textStyle: {
                                        color: 'black',
                                        fontWeight: 'Bold',
                                        fontFamily: 'inherit'
                                    },
                                    categories: [
                                        { start: 0, end: 2, text: 'Electronics', },
                                        { start: 3, end: 4, text: 'Beauty and personal care', },
                                        { start: 5, end: 7, text: 'Fashion', },
                                        { start: 8, end: 10, text: 'Household', },
                                    ]
                                },
                            ]
                        }, yAxis: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            border: {
                                width: 0
                            },
                            textStyle: {
                                color: 'black',
                                fontFamily: 'inherit'
                            },
                            isInversed: true,
                            multiLevelLabels: [
                                {
                                    border: { type: 'Brace', color: '#a19d9d' },
                                    textStyle: {
                                        color: 'black',
                                        fontWeight: 'Bold',
                                        fontFamily: 'inherit'
                                    },
                                    categories: [
                                        { start: 0, end: 2, text: 'Q1' },
                                        { start: 3, end: 5, text: 'Q2' },
                                        { start: 6, end: 8, text: 'Q3' },
                                        { start: 9, end: 11, text: 'Q4' }
                                    ]
                                },
                            ]
                        }, dataSource: data.multiLevelLabelData, tooltipRender: this.tooltipTemplate, cellRender: this.cellTemplate, paletteSettings: {
                            palette: [{ color: '#F0ADCE' },
                                { color: '#19307B' }
                            ],
                        }, tooltipSettings: {
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, legendSettings: {
                            visible: false
                        }, cellSettings: {
                            border: {
                                width: 0
                            },
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        }, load: this.load.bind(this) },
                        React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] })))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of HeatMap sample" },
                React.createElement("p", null, "This sample visualizes the product wise monthly sales revenue of the items sold by an online retailer in a year. The products are grouped based on the purchase domains and revenue is displayed as cell data.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the HeatMap features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to group axis labels. You can customize text in each level by using ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/multiLevelLabelsModel/#alignment", target: "_blank" }, "alignment"),
                    ",",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/multiLevelLabelsModel/#textstyle", target: "_blank" }, "textStyle"),
                    " and ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/multiLevelLabelsModel/#border", target: "_blank" }, "border"),
                    " properties."),
                React.createElement("p", null,
                    "Border of the axis labels can be customized by using ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/heatmap/axisLabelBorderModel/#type", target: "_blank" }, "type"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Rectangle")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Brace")),
                    React.createElement("li", null,
                        React.createElement("code", null, "WithoutTopBorder")),
                    React.createElement("li", null,
                        React.createElement("code", null, "WithoutBottomBorder")),
                    React.createElement("li", null,
                        React.createElement("code", null, "WithoutTopandBottomBorder")),
                    React.createElement("li", null,
                        React.createElement("code", null, "WithoutBorder"),
                        ".")),
                React.createElement("br", null),
                React.createElement("p", null,
                    " ",
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are separated into discrete feature-based modules. To use a tooltip, inject the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip" }, "Tooltip"),
                    " module using the ",
                    React.createElement("code", null, '<Inject services={[Tooltip]} />'),
                    " method."))));
    };
    MultiLevelLabels.prototype.cellTemplate = function (args) {
        args.displayText = '$ ' + (args.value / 10) + 'K';
    };
    ;
    MultiLevelLabels.prototype.tooltipTemplate = function (args) {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : $ ' + (args.value / 10) + 'K'];
    };
    ;
    MultiLevelLabels.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        selectedTheme = selectedTheme.toLowerCase();
        if (selectedTheme === 'highcontrast' || args.heatmap.theme === 'Bootstrap5Dark' || selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'material-dark' || selectedTheme === 'fabric-dark' || selectedTheme === 'bootstrap-dark' || selectedTheme === 'tailwind3-dark' || selectedTheme === 'material3-dark' || selectedTheme === 'fluent-dark' || selectedTheme === 'fluent2-dark' || selectedTheme === 'fluent2-highcontrast') {
            args.heatmap.xAxis.textStyle.color = 'White';
            args.heatmap.yAxis.textStyle.color = 'White';
            args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'White';
            args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'White';
        }
        else {
            args.heatmap.xAxis.textStyle.color = 'Black';
            args.heatmap.yAxis.textStyle.color = 'Black';
            args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'Black';
            args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'Black';
        }
        // custom code end
    };
    ;
    return MultiLevelLabels;
}(sample_base_1.SampleBase));
exports.MultiLevelLabels = MultiLevelLabels;
