"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function Reordering() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    var editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    var firstnameRule = { required: true, minLength: 5 };
    var employeeidRules = { required: true, number: true };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, allowReordering: true, allowSorting: true, editSettings: editSettings, allowFiltering: true, filterSettings: filterSettings, toolbar: toolbar },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '150', textAlign: "Right", validationRules: employeeidRules, isPrimaryKey: true }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '140', validationRules: firstnameRule }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hired Date', width: '120', format: 'yMd', textAlign: "Right", editType: 'datepickeredit', type: 'date' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '120' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Reorder, ej2_react_grids_1.Sort, ej2_react_grids_1.Toolbar, ej2_react_grids_1.Filter, ej2_react_grids_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates reordering of the Grid columns. You can reorder columns by simply drag and drop in the desired column position.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Reordering can be enabled by setting  ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowreordering' }, "allowReordering")),
                " property as true. Reordering can be done by drag and drop the column header from one index to another index within the Grid."),
            React.createElement("p", null, "The location in which the column to be placed, will be indicated by two arrows symbols."),
            React.createElement("p", null, "In this demo, you can reorder columns by drag and drop the column to the desired column."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use Reordering feature, we need to inject ",
                React.createElement("code", null, "Reorder"),
                " modeule into the ",
                React.createElement("code", null, "services")),
            React.createElement("p", null,
                "More information on the Reordering feature configuration can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowreordering' }, " documentation section"),
                "."))));
}
exports.default = Reordering;
