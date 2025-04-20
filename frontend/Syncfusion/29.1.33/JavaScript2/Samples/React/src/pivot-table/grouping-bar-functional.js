"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./grouping-bar.css");
/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};
function GroupingBarSample() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    function onFilter(args) {
        pivotObj.groupingBarSettings.showFilterIcon = args.checked;
    }
    function onSort(args) {
        pivotObj.groupingBarSettings.showSortIcon = args.checked;
    }
    function onRemove(args) {
        pivotObj.groupingBarSettings.showRemoveIcon = args.checked;
    }
    function onValueType(args) {
        pivotObj.groupingBarSettings.showValueTypeIcon = args.checked;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-9 control-section', id: 'pivot-table-section', style: { overflow: 'initial' } },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '450', showGroupingBar: true, groupingBarSettings: { showFieldsPanel: true }, gridSettings: { columnWidth: 140 }, showValuesButton: true },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.GroupingBar] }))),
        React.createElement("div", { className: "col-lg-3 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', height: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'sort', checked: true, label: 'Show Sort Icon', change: onSort.bind(this) })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'filter', checked: true, label: 'Show Filter Icon', change: onFilter.bind(this) })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'summary', checked: true, label: 'Show Value Type Icon', change: onValueType.bind(this) })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'remove', checked: true, label: 'Show Remove Icon', change: onRemove.bind(this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the grouping feature of the pivot table. The pivot fields are automatically populated from the bound data source, and they can be dragged and dropped to alter the report at runtime. The pivot fields can be sorted, filtered, and removed dynamically as well.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The pivot table grouping bar option automatically populates fields from the bound data source and allows end users to drag fields between different axes such as columns, rows, values, and filters, and create pivot table at runtime. To enable grouping bar, set the",
                React.createElement("code", null, "showGroupingBar"),
                " property as true."),
            React.createElement("p", null, "Filter and sort icons allow displaying selective records and ordering them in ascending or descending order. The value type icon allows to display values based on selected aggregate type. The remove icon allows the user to remove the field from the report."),
            React.createElement("p", null,
                "During runtime, the ",
                React.createElement("b", null, "Values"),
                " button in the grouping bar can be moved to a different position (i.e., different index) among other fields in the column or row axis. To enable values button, set the ",
                React.createElement("code", null, "showValuesButton"),
                " property to ",
                React.createElement("b", null, "true"),
                "."),
            React.createElement("p", null,
                "The fields panel, which is located above the grouping bar, displays the fields that are available in the data source but are not bound in the report. The fields can be dragged and dropped into the appropriate axis. In addition, any field removed from any axes will be automatically added to the fields panel. The fields panel can be displayed by setting the ",
                React.createElement("code", null, "showFieldsPanel"),
                " property in the ",
                React.createElement("code", null, "groupingBarSettings"),
                " to ",
                React.createElement("b", null, "true"),
                "."),
            React.createElement("p", null,
                React.createElement("strong", null, "Injecting Module:")),
            React.createElement("p", null,
                "The pivot table features are segregated into individual modules. To take advantage of grouping bar support, we need to inject the",
                React.createElement("code", null, " GroupingBar"),
                " module into the",
                React.createElement("code", null, " services"),
                "."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the grouping bar can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/grouping-bar" }, "documentation section"),
                "."))));
}
exports.default = GroupingBarSample;
