"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./summary-customization.css");
/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    showGrandTotals: true,
    grandTotalsPosition: 'Bottom',
};
var values = [
    { Name: 'Country' },
    { Name: 'Year' }
];
var options = [
    { value: 'grandTotals', text: 'Grand Totals' },
    { value: 'subTotals', text: 'Sub-totals' }
];
var field = { text: 'Name' };
var placeholder = "Select fields to hide its sub-totals";
function SummaryCustomization() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var optionsdll;
    function onChange(args) {
        if (args.value === 'None') {
            pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: false } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            pivotObj.dataSourceSettings.showGrandTotals = true;
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            if (args.value === 'Column') {
                pivotObj.dataSourceSettings.showColumnGrandTotals = false;
            }
            else if (args.value === 'Row') {
                pivotObj.dataSourceSettings.showRowGrandTotals = false;
            }
            else if (args.value === 'Both') {
                pivotObj.dataSourceSettings.showGrandTotals = false;
            }
        }
        pivotObj.refreshData();
    }
    function onChange0(args) {
        document.getElementById('grandsum').style.display = 'none';
        document.getElementById('subsum').style.display = 'none';
        if (args.value == 'grandTotals') {
            document.getElementById('grandsum').style.display = '';
        }
        else if (args.value == 'subTotals') {
            document.getElementById('subsum').style.display = '';
        }
    }
    function onChange1(args) {
        if (args.value === 'Top') {
            pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
            pivotObj.dataSourceSettings.grandTotalsPosition = 'Top';
        }
        else if (args.value === 'Bottom') {
            pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
            pivotObj.dataSourceSettings.grandTotalsPosition = 'Bottom';
        }
        pivotObj.refreshData();
    }
    function onChange2(args) {
        if (args.value === 'None') {
            pivotObj.setProperties({ dataSourceSettings: { showSubTotals: false } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            pivotObj.dataSourceSettings.showSubTotals = true;
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { showSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            if (args.value === 'Column') {
                pivotObj.dataSourceSettings.showColumnSubTotals = false;
            }
            else if (args.value === 'Row') {
                pivotObj.dataSourceSettings.showRowSubTotals = false;
            }
            else if (args.value === 'Both') {
                pivotObj.dataSourceSettings.showSubTotals = false;
            }
        }
        pivotObj.refreshData();
    }
    function onChange3(args) {
        if (args.value === 'Top') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Top' } }, true);
        }
        else if (args.value === 'Bottom') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Bottom' } }, true);
        }
        else if (args.value === 'Auto') {
            pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Auto' } }, true);
        }
        pivotObj.refreshData();
    }
    function select(args) {
        for (var i = 0; i < pivotObj.dataSourceSettings.columns.length; i++) {
            if ((pivotObj.dataSourceSettings.columns[i].name || pivotObj.dataSourceSettings.columns[i].caption) === args.itemData.Name) {
                pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
            }
        }
        for (var i = 0; i < pivotObj.dataSourceSettings.rows.length; i++) {
            if ((pivotObj.dataSourceSettings.rows[i].name || pivotObj.dataSourceSettings.rows[i].caption) === args.itemData.Name) {
                pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
            }
        }
        pivotObj.refreshData();
    }
    function removed(args) {
        for (var i = 0; i < pivotObj.dataSourceSettings.columns.length; i++) {
            if ((pivotObj.dataSourceSettings.columns[i].name || pivotObj.dataSourceSettings.columns[i].caption) === args.itemData.Name) {
                pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
            }
        }
        for (var i = 0; i < pivotObj.dataSourceSettings.rows.length; i++) {
            if ((pivotObj.dataSourceSettings.rows[i].name || pivotObj.dataSourceSettings.rows[i].caption) === args.itemData.Name) {
                pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
            }
        }
        pivotObj.refreshData();
    }
    function open(args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '500', gridSettings: { columnWidth: 140 } })),
        React.createElement("div", { className: "col-lg-3 property-section pivot-table-property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', height: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: 'auto' } },
                                React.createElement("div", { className: "total-options", style: { paddingLeft: 0, marginRight: '10px' } }, "Totals:")),
                            React.createElement("td", { style: { width: 'auto' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { optionsdll = scope; }, change: onChange0.bind(this), width: "100%", id: "options", type: 'text', tabIndex: 0, dataSource: options, fields: { value: 'value', text: 'text' }, value: "grandTotals" })))))),
                React.createElement("div", { id: "grandsum" },
                    React.createElement("table", { className: "property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' } }, "Grand totals position"))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio5", change: onChange1.bind(this), label: 'Top', name: 'position', value: "Top" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio6", checked: true, change: onChange1.bind(this), label: 'Bottom', name: 'position', value: "Bottom" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' } }, "Hide grand totals")))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio1", change: onChange.bind(this), label: 'Row', name: 'Total', value: "Row" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio2", change: onChange.bind(this), label: 'Column', name: 'Total', value: "Column" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio3", change: onChange.bind(this), label: 'Both', name: 'Total', value: "Both" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio4", checked: true, change: onChange.bind(this), label: 'None', name: 'Total', value: "None" }))))))),
                React.createElement("div", { id: "subsum", style: { display: 'none' } },
                    React.createElement("table", { className: "property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' } }, "Sub-totals position"))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio7", change: onChange3.bind(this), label: 'Top', name: 'position1', value: "Top" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio8", change: onChange3.bind(this), label: 'Bottom', name: 'position1', value: "Bottom" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio9", checked: true, change: onChange3.bind(this), label: 'Auto', name: 'position1', value: "Auto" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' } }, "Hide sub-totals")))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio10", change: onChange2.bind(this), label: 'Row', name: 'Total1', value: "Row" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio11", change: onChange2.bind(this), label: 'Column', name: 'Total1', value: "Column" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio12", change: onChange2.bind(this), label: 'Both', name: 'Total1', value: "Both" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingLeft: 0 } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio13", checked: true, change: onChange2.bind(this), label: 'None', name: 'Total1', value: "None" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' } }, "Hide specific sub-totals")))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "summary-values", dataSource: values, fields: field, mode: "CheckBox", showClearButton: true, enableSelectionOrder: false, showDropDownIcon: true, placeholder: placeholder, select: select.bind(this), removed: removed.bind(this), open: open.bind(this) },
                                            React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates showing and hiding grand totals and sub-totals, as well as change their position in rows, columns, or both at runtime. Also, end users can specify and hide sub-totals of specific fields.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this sample, you can control the position and visibility of the grand totals and sub-totals by selecting options from the Totals drop-down list. The following options will be displayed based on the drop-down selection:"),
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0', width: '180px' } },
                            React.createElement("code", null, "Grand totals position")),
                        React.createElement("td", { style: { padding: '4px 0' } },
                            ": Allows to display the grand totals either at top or bottom of the row and column axes by selecting the appropriate radio button options. To display the grand totals at top, set the property ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#grandtotalsposition" }, "grandTotalsPosition"),
                            " as ",
                            React.createElement("b", null, "Top"),
                            ". And, to display the grand totals at bottom, set the property ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#grandtotalsposition" }, "grandTotalsPosition"),
                            " as ",
                            React.createElement("b", null, "Bottom"),
                            ".")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Hide grand totals")),
                        React.createElement("td", { style: { padding: '4px 0' } },
                            ": Allows to hide grand totals in row, column, or both by selecting the appropriate radio button options. To hide grand totals in both row and column, set the property",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showgrandtotals" }, "showGrandTotals"),
                            " as ",
                            React.createElement("b", null, "false"),
                            ". To hide the row and column grand totals separately, set the property ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showrowgrandtotals" }, "showRowGrandTotals"),
                            " and ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showcolumngrandtotals" }, "showColumnGrandTotals"),
                            " as ",
                            React.createElement("b", null, "false"),
                            ".")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Sub-totals position")),
                        React.createElement("td", { style: { padding: '4px 0' } },
                            ": Allows to display the sub-totals at top, bottom, or default position of the row and column axes by selecting the appropriate radio button options. To display the sub-totals at top, set the property ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#subtotalsposition" }, "subTotalsPosition"),
                            " as ",
                            React.createElement("b", null, "Top"),
                            ". And, to display the sub-totals at bottom, set the property ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#subtotalsposition" }, "subTotalsPosition"),
                            " as ",
                            React.createElement("b", null, "Bottom"),
                            ".")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Hide sub-totals")),
                        React.createElement("td", { style: { padding: '4px 0' } },
                            ": Allows to hide sub-totals in row, column, or both by selecting the appropriate radio button options. To hide sub-totals in both row and column, set the property",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showsubtotals" }, "showSubTotals"),
                            " as ",
                            React.createElement("b", null, "false"),
                            ". To hide the row and column sub-totals separately, set the property ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showrowsubtotals" }, "showRowSubTotals"),
                            " and ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettingsModel/#showcolumnsubtotals" }, "showColumnSubTotals"),
                            " as ",
                            React.createElement("b", null, "false"),
                            ".")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Hide sub-totals for specific field(s)")),
                        React.createElement("td", { style: { padding: '4px 0' } },
                            ": Allows to hide sub-totals for specific fields in row and column by selecting appropriate fields from the multi-select drop-down. To hide sub-totals for a specific field, set the ",
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/fieldOptionsModel/#showsubtotals" }, "showSubTotals"),
                            " property as ",
                            React.createElement("b", null, "false"),
                            " inside the field definition.")))),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the show/hide totals can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/show-hide-totals" }, "documentation section"),
                "."))));
}
exports.default = SummaryCustomization;
