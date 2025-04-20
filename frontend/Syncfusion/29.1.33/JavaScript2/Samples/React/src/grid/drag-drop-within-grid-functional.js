"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
function DragWithinGrid() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gridInstance;
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var visible = false;
    var animationSettings = { effect: 'None' };
    var alertDialogInstance;
    var alertButtons = [{
            click: function () {
                alertDialogInstance.hide();
            },
            buttonModel: { content: 'OK', isPrimary: true }
        }];
    function columnDragStart(args) {
        if (args.column.field === 'ShipCountry') {
            alertDialogInstance.show();
        }
    }
    function created() {
        gridInstance.on('columnDragStart', columnDragStart, this);
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return gridInstance = grid; }, dataSource: data_1.orderDetails, allowRowDragAndDrop: true, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar, allowGrouping: true, height: '400', selectionSettings: { type: 'Multiple' }, created: created },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '100', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', allowGrouping: false })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.RowDD, ej2_react_grids_1.Selection, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] })),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: 'Grouping', visible: visible, animationSettings: animationSettings, width: '300px', content: 'Grouping is disabled for this column', ref: function (alertdialog) { return alertDialogInstance = alertdialog; }, target: '.control-section', buttons: alertButtons })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid component with the row drag and drop feature within same grid. You can rearrange the grid rows by using drag icon in left side of grid column.Here you can drag and drop the grid rows between the decided rows.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Row drag and drop enabled by setting",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowrowdraganddrop" }, "allowRowDragAndDrop")),
                " property as true."),
            React.createElement("p", null,
                "Grouping can be enabled by setting",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping" }, "allowGrouping")),
                " property as true."),
            React.createElement("p", null,
                "Grid features are segregated into individual feature-wise modules. To use row drag and drop and grouping features, we need to inject",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#rowdraganddropmodule" }, "RowDD")),
                ",",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/group/#group" }, "Group")),
                " modules into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null, "The row drag and drop functionality is enabled with grouped records in the grid. Now, you can drag and drop the records from one group to another group of your choice."))));
}
exports.default = DragWithinGrid;
