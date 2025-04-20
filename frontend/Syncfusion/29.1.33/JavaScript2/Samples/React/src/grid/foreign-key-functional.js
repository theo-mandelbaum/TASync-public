"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function ForeignKeyColumn() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gridInstance;
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var validationRules = { required: true };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, allowPaging: true, ref: function (grid) { return gridInstance = grid; }, allowFiltering: true, allowSorting: true, editSettings: { allowEditing: true, allowDeleting: true, allowAdding: true }, filterSettings: { type: 'Menu' }, toolbar: toolbarOptions },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: validationRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer Name', width: '150', validationRules: validationRules, foreignKeyValue: 'ContactName', foreignKeyField: 'CustomerID', dataSource: data_1.customerData }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '150', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.Edit, ej2_react_grids_1.Sort, ej2_react_grids_1.ForeignKey, ej2_react_grids_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In this sample,",
                React.createElement("b", null, "Customer Name"),
                "column is a foreign column. You can perform filtering, sorting or editing in the foreign key column.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Grid has option to show foreign key columns. It can be enabled by setting",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#datasource" }, "column.dataSource ")),
                "property with either local or remote data and column field and text can be defined by using",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#foreignkeyfield" }, "column.foreignKeyField")),
                " and",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#foreignkeyvalue" }, "column.foreignKeyValue")),
                " properties."),
            React.createElement("p", { style: { fontWeight: 500 } },
                React.createElement("b", null, "Injecting Module:")),
            React.createElement("p", null,
                "Grid features are segregated into individual feature-wise modules. To use foreign key column feature, we need to inject ",
                React.createElement("code", null, " ForeignKey "),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
}
exports.default = ForeignKeyColumn;
