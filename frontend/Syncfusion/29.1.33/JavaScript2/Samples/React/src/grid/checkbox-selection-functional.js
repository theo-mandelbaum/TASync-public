"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function CheckboxSelection() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var selectionsettings = { persistSelection: true };
    var gridInstance;
    var filterSettings = { type: 'Excel' };
    var toolbarOptions = ['Delete'];
    var editSettings = { allowDeleting: true };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, ref: function (grid) { return gridInstance = grid; }, enableHover: false, allowPaging: true, pageSettings: { pageCount: 5 }, allowFiltering: true, filterSettings: filterSettings, selectionSettings: selectionsettings, toolbar: toolbarOptions, editSettings: editSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { type: 'checkbox', width: '50' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', width: '120', textAlign: "Right" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right" })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Edit, ej2_react_grids_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the selection functionality of the Grid using checkbox selection, To select and unselect all rows use header checkbox. To select/unselect particular row, click the desired row. Delete one or more records using the toolbar delete button")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Grid multiple selection can be achieved with help of checkbox in each row. To render checkbox in each grid row, you need to define column type as ",
                React.createElement("code", null, "checkbox"),
                " using",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#type" }, "columns->type")),
                " property."),
            React.createElement("p", null,
                "Selection can be persisted on all the operations using",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#persistselection" }, "selectionSettings-> persistSelection")),
                " property. For persisting selection on the Grid, any one of the column should be defined as a primary key using",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#isprimarykey" }, "columns->isPrimaryKey")),
                " property."),
            React.createElement("p", null,
                "In this demo, Grid multiple selection has been enabled with selection persistance. You can also delete multiple records, by clicking the toolbar\u2019s ",
                React.createElement("code", null, "Delete"),
                " button after selecting the checkboxes."),
            React.createElement("p", null,
                "More information on the checkbox selection configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/selection/check-box-selection" }, "documentation section"),
                "."))));
}
exports.default = CheckboxSelection;
