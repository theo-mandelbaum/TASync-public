"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_data_1 = require("@syncfusion/ej2-data");
function FilterMenu() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var SAMPLE_CSS = "\n    span.e-input-group.e-ddl[aria-controls=\"ddlelement_popups\"],\n    span.e-input-group.e-ddl[aria-controls=\"ddlelement\"] {\n        margin-right: 15px;\n    }";
    var checkBoxInstance;
    var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
    var data = new ej2_data_1.DataManager({ url: hostUrl + 'api/UrlDataSource', adaptor: new ej2_data_1.UrlAdaptor });
    var query = new ej2_data_1.Query().addParams('dataCount', '10000');
    var gridInstance;
    var filterType = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Checkbox', value: 'CheckBox' },
        { text: 'Excel', value: 'Excel' },
    ];
    var filterSettings = { type: 'Menu' };
    var fields = { text: 'text', value: 'value' };
    function onChange(sel) {
        checkBoxInstance.checked = false;
        gridInstance.filterSettings.enableInfiniteScrolling = false;
        gridInstance.filterSettings.type = sel.itemData.value;
        gridInstance.clearFiltering();
        if (gridInstance.filterSettings.type === 'Excel' || gridInstance.filterSettings.type === 'CheckBox') {
            checkBoxInstance.disabled = false;
        }
        else {
            checkBoxInstance.disabled = true;
        }
    }
    function checkboxOnChange(args) {
        gridInstance.filterSettings.enableInfiniteScrolling = args.checked;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", null,
                React.createElement("div", { style: { padding: '14px', display: 'inline-block' } },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: filterType, fields: fields, change: onChange.bind(this), index: 0, popupHeight: "150px", width: "200px" })),
                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (checkBox) { return checkBoxInstance = checkBox; }, label: 'Enable OnDemand: ', labelPosition: 'Before', disabled: true, change: checkboxOnChange.bind(this) })),
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data, query: query, allowSorting: true, allowPaging: true, ref: function (grid) { return gridInstance = grid; }, pageSettings: { pageSize: 10, pageCount: 5 }, allowFiltering: true, filterSettings: filterSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '120', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Employees', headerText: 'Employee Name', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Designation', headerText: 'Designation', width: '130', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CurrentSalary', headerText: 'CurrentSalary', width: '120', format: 'C2', textAlign: 'Right' })),
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
}
exports.default = FilterMenu;
