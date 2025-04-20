"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
function NormalEdit() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showAddNewRow: true, newRowPosition: 'Top' };
    var editparams = { params: { popupHeight: '300px' } };
    var customeridRule = { required: true, minLength: 5 };
    var freightRule = { required: true, min: 0 };
    var orderidRules = { required: true, number: true };
    var pageSettings = { pageCount: 5 };
    var format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    var gridInstance;
    var dropDownInstance;
    var droplist = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' }
    ];
    function actionBegin(args) {
        if (args.requestType === 'save') {
            if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
            }
            else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
            }
        }
    }
    function ddChange() {
        gridInstance.editSettings.newRowPosition = dropDownInstance.value;
        gridInstance.refresh();
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-md-9' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDataSource, ref: function (grid) { return gridInstance = grid; }, toolbar: toolbarOptions, allowSorting: true, allowFiltering: true, filterSettings: filterSettings, allowPaging: true, editSettings: editSettings, pageSettings: pageSettings, actionBegin: actionBegin.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '140', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '140', format: 'C2', textAlign: 'Right', validationRules: freightRule, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', format: format, width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit', edit: editparams })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Add New Row Position")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "newRowPosition", width: "120px", index: 0, change: ddChange.bind(this), ref: function (d) { return dropDownInstance = d; }, dataSource: droplist, fields: { text: 'text', value: 'value' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "In this demo, you can edit the currently selected record by changing the state of the corresponding record to edit. You can carry out the following CRUD operations:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        " -  To add a new record, click the add toolbar button. "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Edit"),
                        " - To edit record, double click a cell. "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " - To delete a record, click the toolbar delete button after selecting a row. "),
                    React.createElement("li", null,
                        React.createElement("code", null, "Update"),
                        " and ",
                        React.createElement("code", null, "Cancel"),
                        " - Save or discard changes by clicking the toolbar update and cancel button respectively.")),
                React.createElement("p", null,
                    "By default, a new row will be added at the top of the grid. You can change it by setting ",
                    React.createElement("code", null, "editSettings.newRowPosition"),
                    " as ",
                    React.createElement("code", null, "Bottom"))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " Grid supports CRUD operations. This CRUD operations can be configured using",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/" }, "editSettings")),
                    ". It also has the following modes to manipulate the datasource."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Normal")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Dialog")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Batch"))),
                React.createElement("p", null,
                    "In the normal edit mode, when you start editing the currently selected record is changed to edit state. You can edit any row by double clicking it or clicking the toolbar\u2019s",
                    React.createElement("code", null, "Edit"),
                    " button. You can change the row values and save edited data to the data source."),
                React.createElement("p", null,
                    "In order to add a new record easily, the grid content always displays a blank \"add new row\". You can enable this feature by setting the ",
                    React.createElement("code", null, "showAddNewRow"),
                    " property of ",
                    React.createElement("code", null, "editSettings"),
                    " to true."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Grid features are separated into feature-wise modules. To use the editing feature, inject",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/edit/" }, "Edit")),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the inline editing can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/editing/in-line-editing" }, "documentation section"),
                    ".")))));
}
exports.default = NormalEdit;
