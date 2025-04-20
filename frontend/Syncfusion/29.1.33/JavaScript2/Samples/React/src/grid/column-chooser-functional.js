"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function ColChooser() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var customeridRule = { required: true, minLength: 5 };
    var orderidRules = { required: true, number: true };
    var freightRules = { required: true, min: 0 };
    var toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, toolbar: toolbarOptions, allowPaging: true, showColumnChooser: true, allowSorting: true, pageSettings: { pageCount: 5 }, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', validationRules: orderidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150', showInColumnChooser: false, validationRules: customeridRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right', validationRules: freightRules, editType: 'numericedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', visible: false, width: '150', editType: 'dropdownedit' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', visible: false, width: '150' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Page, ej2_react_grids_1.ColumnChooser, ej2_react_grids_1.Sort, ej2_react_grids_1.Edit, ej2_react_grids_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid column chooser feature. Click the column chooser icon in the toolbar to open column chooser and you can select columns to hide/show from the checkbox list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Grid columns can be shown/hidden dynamically by using column chooser.  To enable column chooser behavior, set  ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#showcolumnchooser" }, "showColumnChooser")),
                " property as true. You can also prevent the show of a column by setting",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#showincolumnchooser" }, "columns->showInColumnChooser")),
                " as false in Grid columns definition."),
            React.createElement("br", null),
            React.createElement("p", null, "In this demo,  when the user clicks column chooser icon from the toolbar then the column chooser menu will open. User can show or hide the columns by changing the state of the checkbox.."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use column chooser feature, we need to inject",
                React.createElement("code", null, "ColumnChooser"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
}
exports.default = ColChooser;
