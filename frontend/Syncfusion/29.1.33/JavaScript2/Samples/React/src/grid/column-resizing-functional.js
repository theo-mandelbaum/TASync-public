"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function ColumnResizing() {
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
            React.createElement("div", { style: { overflowX: 'auto', marginLeft: '4px' } },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, allowResizing: true, height: '400', width: '850', autoFit: true, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', minWidth: '100', width: '150', maxWidth: '200', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', minWidth: '115', width: '150', validationRules: customeridRule }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', minWidth: '100', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', allowResizing: false, width: '150', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', minWidth: '115', width: '150', editType: 'dropdownedit' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Resize, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid column rendering with a specified width. This sample also shows how to enable the resizing feature. Click and drag the right corner of each column header to resize it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "By default, if the total width of the columns is less than the width of the Grid, columns will automatically fill to the grid's width. The Grid's AutoFit feature prevents Grid columns from filling more than their specified width by enabling the ",
                React.createElement("code", null, "autoFit"),
                " as true."),
            React.createElement("br", null),
            React.createElement("p", null,
                "The Grid columns can be resized by clicking and dragging at the right edge of column's header. To enable column, resize behavior, set the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowresizing" }, "allowResizing")),
                " property to true. You can also prevent the resize of a particular column by setting",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/columnModel/#allowresizing" }, "columns->allowResizing")),
                " to false in columns definition. And, by double clicking at the right edge of column header, the respective column width will get auto adjusted to its fit using the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#autofitcolumns" }, "autoFitColumns")),
                " method."),
            React.createElement("p", null,
                "In this demo, the allowResizing feature is enabled by setting the ",
                React.createElement("code", null, "allowResizing"),
                " property to true and ",
                React.createElement("b", null, "Order ID"),
                " column can be resized between the range of ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/columnModel/#minwidth" }, "minWidth (100px)")),
                " and ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/columnModel/#maxwidth" }, "maxWidth (200px).")),
                " Also, column resizing is disabled for the ",
                React.createElement("b", null, "Shipped Date"),
                " column."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid features are segregated into individual feature-wise modules. To use resize feature, inject the ",
                React.createElement("code", null, "Resize"),
                " module using the ",
                React.createElement("code", null, "services")))));
}
exports.default = ColumnResizing;
