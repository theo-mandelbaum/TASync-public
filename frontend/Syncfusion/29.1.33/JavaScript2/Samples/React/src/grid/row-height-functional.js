"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
function RowHeight() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    /**
     * Row height sample
     */
    var filterSettings = { type: 'Excel' };
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel',
        { prefixIcon: 'e-small-icon', id: 'big', align: 'Right', tooltipText: 'Row-height-big' },
        { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right', tooltipText: 'Row-height-medium' },
        { prefixIcon: 'e-big-icon', id: 'small', align: 'Right', tooltipText: 'Row-height-small' }];
    var gridInstance;
    function clickHandler(args) {
        if (args.item.id === 'small') {
            gridInstance.rowHeight = 20;
        }
        if (args.item.id === 'medium') {
            gridInstance.rowHeight = 40;
        }
        if (args.item.id === 'big') {
            gridInstance.rowHeight = 60;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, ref: function (grid) { return gridInstance = grid; }, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, rowHeight: 20, height: 400, toolbar: toolbarOptions, toolbarClick: clickHandler.bind(this) },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '140', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the row height feature of the Grid. In this demo, the ",
                React.createElement("b", null, "rowHeight"),
                " for all the Grid rows can be changed as ",
                React.createElement("b", null, "20px"),
                ", ",
                React.createElement("b", null, "40px"),
                " and ",
                React.createElement("b", null, "60px"),
                " on ToolBar button click.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The Grid has support to provide ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#rowheight' }, "rowHeight")),
                " property."))));
}
exports.default = RowHeight;
