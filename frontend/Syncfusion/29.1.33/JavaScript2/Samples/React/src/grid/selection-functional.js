"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function Selectioning() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, pageSettings: { pageCount: 5 }, selectionSettings: { type: 'Multiple' }, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: "Right", validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: "yMd", textAlign: "Right", editType: 'datepickeredit', type: 'date' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionality of the selection in Grid, which allows you to select row or cell or column through simple mouse down or keyboard interaction.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Selection provides an interactive support to highlight the row or cell or column that you select. Selection can be done through a simple Mouse down or Keyboard interaction. To enable selection, set ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#allowselection" }, "allowSelection")),
                " as true."),
            React.createElement("p", null,
                "Grid component supports two types of selection which can be set using ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#type" }, "selectionSettings->type")),
                " property. They are"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Single"),
                    " - Enabled by default. Allows the user to select single row/cell/column at a time."),
                React.createElement("li", null,
                    React.createElement("code", null, "Multiple"),
                    " - Allows the user to select more than one row/cell/column at a time.")),
            React.createElement("p", null,
                "Also, supports three modes of selection which can be set using ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#mode" }, "selectionSettings->mode")),
                " property. They are"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Row"),
                    " - Enabled by default. Enables the row selection in Grid."),
                React.createElement("li", null,
                    React.createElement("code", null, "Cell"),
                    " - Enables the cell selection in Grid."),
                React.createElement("li", null,
                    React.createElement("code", null, "Both"),
                    " - Enables both the row and cell selection in Grid. Clicking any cell will select both row and cell simultaneously")),
            React.createElement("p", null,
                "To perform the column selection, enable the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/selectionSettings/#allowcolumnselection" }, "selectionSettings->allowColumnSelection")),
                " property."),
            React.createElement("p", null,
                "To perform the multi-selection, hold ",
                React.createElement("strong", null, "CTRL"),
                " key and click the desired rows/cells/columns. To select range of rows/cells/columns, hold ",
                React.createElement("strong", null, "SHIFT"),
                " key and click the rows/cells/columns."),
            React.createElement("p", null, "While using the Grid in a touch device environment, there is an option for multi-selection through a single tap on the row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single tap."),
            React.createElement("p", null, "In this demo, multiple row selection is enabled, click any row to select."),
            React.createElement("p", null,
                "More information on the selection configuration can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/selection.html#selection" }, " documentation section"),
                "."))));
}
exports.default = Selectioning;
