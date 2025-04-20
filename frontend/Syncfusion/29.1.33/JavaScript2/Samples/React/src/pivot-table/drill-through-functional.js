"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./drill-through.css");
/**
 * PivotView Value Sorting sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
function DrillThroughComponent() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', style: { overflow: 'initial' } },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', dataSourceSettings: dataSourceSettings, showTooltip: false, width: '100%', height: '300', showFieldList: true, allowDrillThrough: true, gridSettings: { columnWidth: 140 } },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.DrillThrough] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to obtain a list of raw items for a particular cell using the drill-through option on double-clicking.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, you can view the raw items of any pivot table cell by double-clicking the cell. The drill-through dialog holds the row headers, column headers, and values information of the clicked cell. Initially drill-through information is displayed for bound fields and you can include the remaining raw items details using the ",
                React.createElement("code", null, "column chooser"),
                " option in the dialog."),
            React.createElement("p", null,
                "This feature can be enabled by setting the ",
                React.createElement("code", null, "allowDrillThrough"),
                " as true."),
            React.createElement("p", null,
                React.createElement("strong", null, "Injecting Module:")),
            React.createElement("p", null,
                "The pivot table features are segregated into individual modules. To enable drill-through, inject the",
                React.createElement("code", null, " DrillThrough"),
                " module into",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the drill-through can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/drill-through" }, "documentation section"),
                "."))));
}
exports.default = DrillThroughComponent;
