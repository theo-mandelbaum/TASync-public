"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var dataSource = require("./pivot-data/productData.json");
require("./heat-map.css");
(0, ej2_base_1.enableRipple)(true);
/**
 * PivotView HeatMap Sample.
 */
var colourScheme = ['range1', 'range2', 'range3', 'range4', 'range5', 'range6', 'range7', 'range8', 'range9',
    'range10', 'range11', 'range12', 'range13', 'range14'];
var minValue = 0;
var maxValue = 0;
var data = dataSource.data;
var dataSourceSettings = {
    enableSorting: false,
    columns: [{ name: 'ProductType' }, { name: 'Product' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    values: [{ name: 'SoldAmount', caption: 'Sold Amount' }],
    dataSource: data,
    rows: [{ name: 'Year' }],
    formatSettings: [{ name: 'SoldAmount', format: 'C0' }],
    groupSettings: [{
            name: 'Year',
            type: 'Number',
            rangeInterval: 2
        }],
    expandAll: true,
    filters: [],
    showColumnSubTotals: false
};
function HeatMap() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    function cellTemplate(args) {
        if (args != null && args.cellInfo) {
            if (args.cellInfo.axis === 'value') {
                if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum) {
                    args.targetCell.classList.add(cellColour(args.cellInfo.value));
                }
                args.targetCell.querySelector('.e-cellvalue').innerText = '$' + (args.cellInfo.value / 1000).toFixed(1) + 'K';
            }
        }
    }
    function aggregateCellInfo(args) {
        if (args.rowCellType !== "grandTotal" && args.columnCellType !== "grandTotal") {
            minValue = (minValue < args.value && minValue !== 0) ? minValue : args.value;
            maxValue = maxValue > args.value ? maxValue : args.value;
        }
    }
    function cellColour(value) {
        var percentage = (maxValue - minValue) / colourScheme.length;
        var colourIndex = Math.round((value - minValue) / percentage);
        return colourScheme[colourIndex];
    }
    function enginePopulated() {
        minValue = minValue - 1000;
        maxValue = maxValue + 1000;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView-Heatmap', dataSourceSettings: dataSourceSettings, width: '100%', height: '500', gridSettings: { rowHeight: 35, columnWidth: 120 }, cellTemplate: cellTemplate.bind(this), enginePopulated: enginePopulated.bind(this), aggregateCellInfo: aggregateCellInfo.bind(this) })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "In this sample, we show you how to visualize the bound data by making the pivot table cells look like a heatmap.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Pivot Table provides custom styles for each cell's display using the cell template. Using the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#celltemplate" }, " cellTemplate"),
                " property in this sample, we are representing the product-specific monthly sales revenue of the goods sold by an online retailer in a year in the form of a heatmap-like appearance. Each pivot table cell was customized by calculating the lowest and highest values via the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#enginepopulated" }, "enginePopulated"),
                " event and applying a color scheme based on their range."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the cell template can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#cell-template" }, "documentation section"),
                "."))));
}
exports.default = HeatMap;
