"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function BatchEdit() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel'];
    var filterSettings = { type: 'Excel' };
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
    var editparams = { params: { popupHeight: '300px' } };
    var customeridRule = { required: true, minLength: 5 };
    var freightRule = { required: true, min: 0 };
    var orderidRules = { required: true, number: true };
    var pageSettings = { pageCount: 5 };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-md-9' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, pageSettings: pageSettings, allowSorting: true, toolbar: toolbarOptions, allowPaging: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRule, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', format: 'yMd', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: editparams })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates CRUD operations in Grid. You can perform CRUD operations as follows,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " -  To add a new record, click the add toolbar button. "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double-click a cell. "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete record, click the toolbar delete button after selecting a row. "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        " and ",
                        React.createElement("code", null, "Cancel"),
                        " - Save or discard changes by clicking the toolbar update and cancel button respectively."))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " Grid supports CRUD operations and they can be configured using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/" }, "editSettings")),
                    ". It has the following modes to manipulate the datasource."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Normal")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Batch"))),
                React.createElement("p", null,
                    "In this demo, the Batch mode is enabled for editing by defining the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/#mode" }, "editSettings.mode")),
                    " as ",
                    React.createElement("code", null, "batch"),
                    ". You can start editing by double clicking a cell and changing the cell value. The edited cell will be highlighted while navigating to a new cell. You can bulk save the edited data to the datasource by clicking the toolbar's ",
                    React.createElement("code", null, "update"),
                    " button or by externally invoking the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/edit/#batchsave" }, "batchSave")),
                    " method."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are separated into feature-wise modules. To use the editing feature, inject the",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/edit/" }, "Edit")),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the batch editing can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/editing/batch-editing" }, "documentation section"),
                    ".")))));
}
exports.default = BatchEdit;
