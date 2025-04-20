"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
function FrozenAPI() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var grid;
    var freezeDropDown;
    var columnDropDown;
    var alertDialogInstance;
    var refresh = true;
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var columnNames = [
        { id: 'OrderID', name: 'Order ID' },
        { id: 'Freight', name: 'Freight' },
        { id: 'CustomerID', name: 'Customer ID' },
        { id: 'OrderDate', name: 'Order Date' },
        { id: 'ShipName', name: 'Ship Name' },
        { id: 'ShipAddress', name: 'Ship Address' },
        { id: 'ShipCity', name: 'Ship City' },
        { id: 'ShipCountry', name: 'Ship Country' }
    ];
    var directions = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' },
        { id: 'Fixed', name: 'Fixed' },
    ];
    var fields = { text: 'name', value: 'id' };
    function directionChange(e) {
        if (refresh) {
            var columnName = columnDropDown.value;
            var mvblColumns = grid.getMovableColumns();
            if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
                alertDialogInstance.show();
                refresh = false;
                freezeDropDown.value = "Center";
                freezeDropDown.refresh();
            }
            else {
                grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value;
                grid.refreshColumns();
            }
        }
        refresh = true;
    }
    ;
    function columnChange(e) {
        var columnName = e.value;
        var column = grid.getColumnByField(columnName);
        var value = column.freeze === undefined ? 'Center' : column.freeze;
        refresh = freezeDropDown.value === value;
        freezeDropDown.value = value;
    }
    ;
    var confirmButton = [{
            click: function () {
                alertDialogInstance.hide();
            },
            buttonModel: { content: 'OK', isPrimary: true }
        }];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { style: { paddingBottom: '5px' } },
                React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement("span", null, "Column Name")),
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "column", dataSource: columnNames, change: columnChange.bind(this), value: "ShipCountry", fields: fields, ref: function (colDropDown) { columnDropDown = colDropDown; } }))),
                React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement("span", null, "Freeze Direction")),
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "freezedirection", dataSource: directions, value: "Left", change: directionChange.bind(this), fields: fields, ref: function (frzDropDown) { freezeDropDown = frzDropDown; } })))),
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return grid = g; }, dataSource: data_1.orderDetails, height: '350', frozenRows: 2, enableHover: false, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', freeze: 'Left', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '125', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '130', freeze: 'Right', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '150', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '300' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipAddress', headerText: 'Ship Address', width: '270', freeze: 'Fixed' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '250' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '250', editType: 'dropdownedit' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Sort, ej2_react_grids_1.Freeze, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
        React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Frozen', visible: false, animationSettings: { effect: 'None' }, width: '300px', content: 'Atleast one Column should be in movable', ref: function (alertdialog) { alertDialogInstance = alertdialog; }, target: '.control-section', buttons: confirmButton, showCloseIcon: false }),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the frozen rows and columns feature of the Grid. Scroll the movable content horizontally to view the frozen and fixed columns, vertically to view the frozen rows with the content.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This feature enables users to freeze certain columns at specific positions. This can be achieved by setting the",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#freeze" }, "freeze")),
                "property of column settings. The various modes are:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Left"),
                    " : Freezes the column at the left."),
                React.createElement("li", null,
                    React.createElement("code", null, "Right"),
                    " : Freezes the column at the right."),
                React.createElement("li", null,
                    React.createElement("code", null, "Center"),
                    " : Freezes the column at the center."),
                React.createElement("li", null,
                    React.createElement("code", null, "Fixed"),
                    " : Freezes the column at a fixed position. This will ensure its visibility while scrolling horizontally.")),
            React.createElement("p", null,
                " In this demo sample, the ",
                React.createElement("b", null, "Order ID"),
                " column is frozen at the left, the ",
                React.createElement("b", null, "Customer ID"),
                " column is frozen at the right and the ",
                React.createElement("b", null, "Ship Address"),
                " column at a fixed position using ",
                React.createElement("code", null, "column->freeze"),
                " property."),
            React.createElement("p", null,
                "More information on the frozen rows and columns can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/frozen" }, " documentation section"),
                "."))));
}
exports.default = FrozenAPI;
