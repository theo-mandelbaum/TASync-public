"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
function Searching() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var filterSettings = { type: 'Excel' };
    var toolbarOptions = ['Search'];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.categoryData, toolbar: toolbarOptions, allowSorting: true, allowFiltering: true, filterSettings: filterSettings, allowPaging: true, pageSettings: { pageSize: 10, pageCount: 5 } },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CategoryName', headerText: 'Category Name', width: '170' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'QuantityPerUnit', headerText: 'Quantity PerUnit', width: '180', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Units In Stock', width: '150', textAlign: 'Right' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Page, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid searching feature. In this sample, use the search box from toolbar to search Grid records.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The searching feature enables the user to view the reduced amount of records based on search criteria. It can be enabled by setting  ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowsearching' }, "allowSearching")),
                " property as true."),
            React.createElement("p", null,
                "Grid component features are segregated into individual feature-wise modules. To use searching feature, we need to inject ",
                React.createElement("code", null, "Search"),
                " module into the ",
                React.createElement("code", null, "services")),
            React.createElement("p", null,
                "More information on the searching feature configuration can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/searching.html' }, " documentation section"),
                "."))));
}
exports.default = Searching;
