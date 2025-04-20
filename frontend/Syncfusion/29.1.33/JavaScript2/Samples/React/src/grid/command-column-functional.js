"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function CommandColumnEdit() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
    var editparams = { params: { popupHeight: '300px' } };
    var validationRule = { required: true };
    var commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { id: 'gridcomp', dataSource: data_1.data, allowPaging: true, pageSettings: { pageCount: 5 }, editSettings: editSettings, allowSorting: true, allowFiltering: true, filterSettings: filterSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', isPrimaryKey: true, validationRules: validationRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: validationRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', format: 'yMd', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: editparams }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Manage Records', width: '160', commands: commands })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.CommandColumn, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates CRUD operations in Grid using command column. You can perform CRUD operations as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a row or click Edit button from command column after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete record, click Delete button from command column after selected a row "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        ",",
                        React.createElement("code", null, "Cancel"),
                        " - You can save or discard changes by click Update and cancel button from command column respectively"))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Grid provides an option to render CRUD action buttons in a column by using the CommandColumn feature. The",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#commands" }, "columns->commands")),
                    " property accepts array of ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/commandModel/" }, "CommandModel")),
                    " object. The predefined command button can be defined by using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/commandModel/#type" }, "type")),
                    " property."),
                React.createElement("p", null, "The built-in command button are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cancel")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Save"))),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use commandColumn feature, we need to inject ",
                    React.createElement("code", null, "CommandColumn"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the commandcolumn configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/editing/command-column-editing" }, "documentation section"),
                    ".")))));
}
exports.default = CommandColumnEdit;
