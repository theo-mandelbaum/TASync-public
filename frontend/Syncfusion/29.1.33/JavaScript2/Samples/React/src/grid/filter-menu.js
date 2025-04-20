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
exports.FilterMenu = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_data_1 = require("@syncfusion/ej2-data");
var SAMPLE_CSS = "\nspan.e-input-group.e-ddl[aria-controls=\"ddlelement_popups\"],\nspan.e-input-group.e-ddl[aria-controls=\"ddlelement\"] {\n    margin-right: 15px;\n}";
var FilterMenu = /** @class */ (function (_super) {
    __extends(FilterMenu, _super);
    function FilterMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        _this.data = new ej2_data_1.DataManager({ url: _this.hostUrl + 'api/UrlDataSource', adaptor: new ej2_data_1.UrlAdaptor });
        _this.query = new ej2_data_1.Query().addParams('dataCount', '10000');
        _this.filterType = [
            { text: 'Menu', value: 'Menu' },
            { text: 'Checkbox', value: 'CheckBox' },
            { text: 'Excel', value: 'Excel' },
        ];
        _this.filterSettings = { type: 'Menu' };
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    FilterMenu.prototype.onChange = function (sel) {
        this.checkBoxInstance.checked = false;
        this.gridInstance.filterSettings.enableInfiniteScrolling = false;
        this.gridInstance.filterSettings.type = sel.itemData.value;
        this.gridInstance.clearFiltering();
        if (this.gridInstance.filterSettings.type === 'Excel' || this.gridInstance.filterSettings.type === 'CheckBox') {
            this.checkBoxInstance.disabled = false;
        }
        else {
            this.checkBoxInstance.disabled = true;
        }
    };
    FilterMenu.prototype.checkboxOnChange = function (args) {
        this.gridInstance.filterSettings.enableInfiniteScrolling = args.checked;
    };
    FilterMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", null,
                    React.createElement("div", { style: { padding: '14px', display: 'inline-block' } },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.filterType, fields: this.fields, change: this.onChange.bind(this), index: 0, popupHeight: "150px", width: "200px" })),
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (checkBox) { return _this.checkBoxInstance = checkBox; }, disabled: true, label: 'Enable OnDemand: ', labelPosition: 'Before', change: this.checkboxOnChange.bind(this) })),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.data, query: this.query, allowSorting: true, allowPaging: true, ref: function (grid) { return _this.gridInstance = grid; }, pageSettings: { pageSize: 10, pageCount: 5 }, allowFiltering: true, filterSettings: this.filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Employees', headerText: 'Employee Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Designation', headerText: 'Designation', width: '130', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CurrentSalary', headerText: 'CurrentSalary', width: '120', format: 'C2', textAlign: 'Right', editType: 'numericedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the grid's multiple-type filter functionality and user interface.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The filtering feature enables the user to view a reduced number of records based on the filter criteria. It can be enabled by setting the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowfiltering' }, "allowFiltering")),
                    " property to true."),
                React.createElement("p", null, "The grid supports the following filter types:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "FilterBar")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Menu")),
                    React.createElement("li", null,
                        React.createElement("code", null, "CheckBox")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Excel"))),
                React.createElement("p", null,
                    "You can change the filter type by setting ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/filterSettings/#type' }, "filterSettings->type")),
                    "."),
                React.createElement("p", null, "In this demo, the filter menu is enabled by default. You can switch to other filter types using the dropdown."),
                React.createElement("p", null,
                    "Additionally, we have an on-demand data fetch functionality and UI for the checkbox/Excel filter type. It can be enabled by setting the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "" }, "filterSettings->enableInfiniteScrolling")),
                    " property to true. In this demo, on-demand data fetch is not enabled by default. To enable the on-demand data fetch for the checkbox/Excel filter type, the Enable OnDemand option must be checked after selecting the checkBox/Excel filter type using the dropdown menu."),
                React.createElement("p", null,
                    "The Grid now supports improved ",
                    React.createElement("code", null, "in"),
                    " and ",
                    React.createElement("code", null, "not in"),
                    " filter operators, allowing users to filter multiple values within the same column. When the menu filter is enabled, a Syncfusion MultiSelect Dropdown component with checkboxes appears to select the ",
                    React.createElement("code", null, "in"),
                    " or ",
                    React.createElement("code", null, "not in"),
                    " operators."),
                React.createElement("p", null,
                    "More information on the filter configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#filtersettings" }, " documentation section"),
                    "."))));
    };
    return FilterMenu;
}(sample_base_1.SampleBase));
exports.FilterMenu = FilterMenu;
