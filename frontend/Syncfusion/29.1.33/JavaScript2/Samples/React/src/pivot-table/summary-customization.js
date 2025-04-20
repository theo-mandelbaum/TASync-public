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
exports.SummaryCustomization = void 0;
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
var SummaryCustomization = /** @class */ (function (_super) {
    __extends(SummaryCustomization, _super);
    function SummaryCustomization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SummaryCustomization.prototype.onChange = function (args) {
        if (args.value === 'None') {
            this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: false } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            this.pivotObj.dataSourceSettings.showGrandTotals = true;
        }
        else {
            this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            if (args.value === 'Column') {
                this.pivotObj.dataSourceSettings.showColumnGrandTotals = false;
            }
            else if (args.value === 'Row') {
                this.pivotObj.dataSourceSettings.showRowGrandTotals = false;
            }
            else if (args.value === 'Both') {
                this.pivotObj.dataSourceSettings.showGrandTotals = false;
            }
        }
        this.pivotObj.refreshData();
    };
    SummaryCustomization.prototype.onChange0 = function (args) {
        document.getElementById('grandsum').style.display = 'none';
        document.getElementById('subsum').style.display = 'none';
        if (args.value == 'grandTotals') {
            document.getElementById('grandsum').style.display = '';
        }
        else if (args.value == 'subTotals') {
            document.getElementById('subsum').style.display = '';
        }
    };
    SummaryCustomization.prototype.onChange1 = function (args) {
        if (args.value === 'Top') {
            this.pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
            this.pivotObj.dataSourceSettings.grandTotalsPosition = 'Top';
        }
        else if (args.value === 'Bottom') {
            this.pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
            this.pivotObj.dataSourceSettings.grandTotalsPosition = 'Bottom';
        }
        this.pivotObj.refreshData();
    };
    SummaryCustomization.prototype.onChange2 = function (args) {
        if (args.value === 'None') {
            this.pivotObj.setProperties({ dataSourceSettings: { showSubTotals: false } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            this.pivotObj.dataSourceSettings.showSubTotals = true;
        }
        else {
            this.pivotObj.setProperties({ dataSourceSettings: { showSubTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowSubTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnSubTotals: true } }, true);
            if (args.value === 'Column') {
                this.pivotObj.dataSourceSettings.showColumnSubTotals = false;
            }
            else if (args.value === 'Row') {
                this.pivotObj.dataSourceSettings.showRowSubTotals = false;
            }
            else if (args.value === 'Both') {
                this.pivotObj.dataSourceSettings.showSubTotals = false;
            }
        }
        this.pivotObj.refreshData();
    };
    SummaryCustomization.prototype.onChange3 = function (args) {
        if (args.value === 'Top') {
            this.pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Top' } }, true);
        }
        else if (args.value === 'Bottom') {
            this.pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Bottom' } }, true);
        }
        else if (args.value === 'Auto') {
            this.pivotObj.setProperties({ dataSourceSettings: { subTotalsPosition: 'Auto' } }, true);
        }
        this.pivotObj.refreshData();
    };
    SummaryCustomization.prototype.select = function (args) {
        for (var i = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
            }
        }
        for (var i = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
            }
        }
        this.pivotObj.refreshData();
    };
    SummaryCustomization.prototype.removed = function (args) {
        for (var i = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
            }
        }
        for (var i = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === args.itemData.Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
            }
        }
        this.pivotObj.refreshData();
    };
    SummaryCustomization.prototype.open = function (args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    };
    SummaryCustomization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { _this.pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '500', gridSettings: { columnWidth: 140 } })),
            React.createElement("div", { className: "col-lg-3 property-section pivot-table-property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', height: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: 'auto' } },
                                    React.createElement("div", { className: "total-options", style: { paddingLeft: 0, marginRight: '10px' } }, "Totals:")),
                                React.createElement("td", { style: { width: 'auto' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { _this.optionsdll = scope; }, change: this.onChange0.bind(this), width: "100%", id: "options", type: 'text', tabIndex: 0, dataSource: options, fields: { value: 'value', text: 'text' }, value: "grandTotals" })))))),
                    React.createElement("div", { id: "grandsum" },
                        React.createElement("table", { className: "property-panel-table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' } }, "Grand totals position"))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio5", change: this.onChange1.bind(this), label: 'Top', name: 'position', value: "Top" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio6", checked: true, change: this.onChange1.bind(this), label: 'Bottom', name: 'position', value: "Bottom" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' } }, "Hide grand totals")))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio1", change: this.onChange.bind(this), label: 'Row', name: 'Total', value: "Row" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio2", change: this.onChange.bind(this), label: 'Column', name: 'Total', value: "Column" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio3", change: this.onChange.bind(this), label: 'Both', name: 'Total', value: "Both" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio4", checked: true, change: this.onChange.bind(this), label: 'None', name: 'Total', value: "None" }))))))),
                    React.createElement("div", { id: "subsum", style: { display: 'none' } },
                        React.createElement("table", { className: "property-panel-table" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' } }, "Sub-totals position"))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio7", change: this.onChange3.bind(this), label: 'Top', name: 'position1', value: "Top" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio8", change: this.onChange3.bind(this), label: 'Bottom', name: 'position1', value: "Bottom" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio9", checked: true, change: this.onChange3.bind(this), label: 'Auto', name: 'position1', value: "Auto" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' } }, "Hide sub-totals")))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio10", change: this.onChange2.bind(this), label: 'Row', name: 'Total1', value: "Row" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio11", change: this.onChange2.bind(this), label: 'Column', name: 'Total1', value: "Column" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio12", change: this.onChange2.bind(this), label: 'Both', name: 'Total1', value: "Both" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { paddingLeft: 0 } },
                                            React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio13", checked: true, change: this.onChange2.bind(this), label: 'None', name: 'Total1', value: "None" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("div", { style: { fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', paddingLeft: '0' } }, "Hide specific sub-totals")))),
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "summary-values", dataSource: values, fields: field, mode: "CheckBox", showClearButton: true, enableSelectionOrder: false, showDropDownIcon: true, placeholder: placeholder, select: this.select.bind(this), removed: this.removed.bind(this), open: this.open.bind(this) },
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
    };
    return SummaryCustomization;
}(sample_base_1.SampleBase));
exports.SummaryCustomization = SummaryCustomization;
