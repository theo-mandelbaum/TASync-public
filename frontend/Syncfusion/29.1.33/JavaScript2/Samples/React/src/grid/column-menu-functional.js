"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./grid-context-menu.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
function ColumnMenuSample() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var grid;
    var groupOptions = { showGroupedColumn: true };
    var filterSettings = { type: "CheckBox" };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var selectionSettings = { allowColumnSelection: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var columnMenuOptions = [
        { id: 'Default', text: 'Default' },
        { id: 'Custom', text: 'Custom' },
    ];
    function columnMenuClick(args) {
        if (args.item.id === 'select_column') {
            grid.selectionModule.selectColumn(args.column.index);
            // custom function
        }
        else if (args.item.id === 'clear_column') {
            // custom function
            grid.selectionModule.clearColumnSelection();
        }
    }
    function change(e) {
        var gridMenuOption = e.value;
        if (gridMenuOption === 'Custom') {
            var columnMenuItems = [
                'SortAscending',
                'SortDescending',
                'Group',
                'Ungroup',
                'Filter',
                { text: 'Select Column', id: 'select_column' },
                { text: 'Clear column selection', id: 'clear_column' },
            ];
            grid.columnMenuClick = columnMenuClick;
            grid.columnMenuItems = columnMenuItems;
        }
        else {
            grid.columnMenuClick = undefined;
            grid.columnMenuItems = undefined;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-md-9 control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { id: 'gridcomp', ref: function (g) { return grid = g; }, dataSource: data_1.orderDetails, allowPaging: true, allowGrouping: true, allowSorting: true, selectionSettings: selectionSettings, editSettings: editSettings, toolbar: toolbar, allowFiltering: true, showColumnMenu: true, groupSettings: groupOptions, filterSettings: filterSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '200', textAlign: 'Right', showInColumnChooser: false, validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '200', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '150', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', visible: false, width: '200' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '200' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Resize, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.ColumnMenu, ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar] }))),
        React.createElement("div", { className: 'col-md-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Column menu")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "columnmenu", width: "120px", index: 0, change: change.bind(this), dataSource: columnMenuOptions, fields: { text: 'text', value: 'id' } })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the ColumnMenu. Click the icon of each column to open the column menu.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The grid provides an option to display a column menu when the user clicks the icon on each column. This menu includes integrated features like sorting, grouping, filtering, column chooser, and auto-fitting. These features can be enabled by setting the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#showcolumnmenu" }, "showColumnMenu")),
                " property to `true`. The default menu items include:",
                React.createElement("br", null)),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "SortAscending"),
                    ": Sort the current column in ascending order."),
                React.createElement("li", null,
                    React.createElement("code", null, "SortDescending"),
                    ": Sort the current column in descending order."),
                React.createElement("li", null,
                    React.createElement("code", null, "Group"),
                    ": Group the current column."),
                React.createElement("li", null,
                    React.createElement("code", null, "Ungroup"),
                    ": Ungroup the current column."),
                React.createElement("li", null,
                    React.createElement("code", null, "AutoFit"),
                    ": Auto-fit current column."),
                React.createElement("li", null,
                    React.createElement("code", null, "AutoFitAll"),
                    ": Auto-fit all columns."),
                React.createElement("li", null,
                    React.createElement("code", null, "ColumnChooser"),
                    ":  Toggle column visibility."),
                React.createElement("li", null,
                    React.createElement("code", null, "Filter"),
                    ": Display the filter option as specified in the ",
                    React.createElement("code", null, "filterSetting->type"),
                    ".")),
            React.createElement("br", null),
            React.createElement("p", null, "The default column menu items are enabled based on the corresponding feature settings. Additionally, the column menu allows users to include custom menu items with the default ones, or the replacement of the default items entirely with custom options."),
            React.createElement("p", null,
                "In this demo, the Column Menu feature is initially enabled by setting ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#showcolumnmenu" }, "showColumnMenu")),
                " to `true`, with sorting, grouping, filtering, column chooser, and auto-fit options. Users also have the option to toggle custom column menu items through using the dropdown list in the property panel. In the custom menu, sorting, grouping, and filtering are enabled, and custom options like column selection and clear selection have been added."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Features of the Grid component are segregated into individual feature-wise modules. To use the Column menu feature, inject the ",
                React.createElement("code", null, "ColumnMenu"),
                " modeule into the ",
                React.createElement("code", null, "services")),
            React.createElement("p", null,
                "More information on the column menu can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/columns/column-menu" }, "documentation section"),
                "."))));
}
exports.default = ColumnMenuSample;
