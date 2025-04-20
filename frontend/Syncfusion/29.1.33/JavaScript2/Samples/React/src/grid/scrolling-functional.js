"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function Scrolling() {
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
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, height: "400", allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '150', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '160', validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '155', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '130', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '155', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipAddress', headerText: 'Ship Address', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid component with the horizontal and vertical scrollbars to view the exceeded grid content.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "The Grid component will show scrollbar when the content exceeds the element width or height. The vertical and horizontal scrollbar will be displayed based on the following criteria."),
            React.createElement("ul", null,
                React.createElement("li", null, "The vertical scrollbar appears when the total height of rows present in Grid exceeds its element height."),
                React.createElement("li", null, "The horizontal scrollbar appears when the sum of column`s width exceeds Grid element width.")),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#height" }, "height")),
                " and ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#width" }, "width")),
                " property is used to set the Grid height and width respectively. The value of these properties can be a numeric value, pixel(",
                React.createElement("code", null, "px"),
                ") or percentage (",
                React.createElement("code", null, "%"),
                ")."),
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#height" }, "height")),
                " and ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#width" }, "width")),
                " property of the Grid is set to ",
                React.createElement("strong", null,
                    React.createElement("em", null, "400")),
                " and ",
                React.createElement("strong", null,
                    React.createElement("em", null, "auto")),
                "respectively. Now, the Grid will render with vertical scrollbar when the total height of rows exceeds its element height and horizontal scrollbar will appear when the total column width exceeds the element width."))));
}
exports.default = Scrolling;
