"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
function Filtering() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gridInstance;
    var checkboxObj;
    var filData = [
        { id: '1', category: 'All' },
        { id: '2', category: 'Beverages' },
        { id: '3', category: 'Condiments' },
        { id: '4', category: 'Confections' },
        { id: '5', category: 'Dairy Products' },
        { id: '6', category: 'Grains/Cereals' },
        { id: '7', category: 'Meat/Poultry' },
        { id: '8', category: 'Produce' },
        { id: '9', category: 'Seafood' }
    ];
    var fields = { text: 'category', value: 'id' };
    function onChange(sel) {
        if (sel.itemData.category === 'All') {
            gridInstance.clearFiltering();
        }
        else {
            gridInstance.filterByColumn('CategoryName', 'equal', sel.itemData.category);
        }
    }
    function onChanged(args) {
        if (args.checked) {
            gridInstance.filterSettings.showFilterBarOperator = true;
        }
        else {
            gridInstance.filterSettings.showFilterBarOperator = false;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { style: { padding: '14px 0' } },
                React.createElement("div", { className: "select-wrap" },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: filData, fields: fields, change: onChange.bind(this), placeholder: "Select category to filter", width: "200px" }))),
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.categoryData, allowPaging: true, allowSorting: true, ref: function (grid) { return gridInstance = grid; }, pageSettings: { pageSize: 10, pageCount: 5 }, allowFiltering: true },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CategoryName', headerText: 'Category Name', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '150' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Units In Stock', width: '150', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Discontinued', headerText: 'Discontinued', width: '150', textAlign: 'Center', displayAsCheckBox: true, type: 'boolean' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.Sort] }))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null, "Enable Filterbar operator ")),
                            React.createElement("td", { style: { width: '30%', padding: '10px 10px 10px 0px' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { checkboxObj = scope; }, change: onChanged.bind(this), "aria-label": "Enable Filterbar operator" }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid's default filtering feature. Type a value in the filterbar and press enter to filter a particular column.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The filtering feature enables the user to view a reduced amount of records based on filter criteria. It can be enabled by setting the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#allowfiltering' }, "allowFiltering")),
                " property to true. A filter bar row will be rendered next to header which allows users to filter data by entering text within its cells.",
                React.createElement("br", null),
                React.createElement("br", null),
                "The Filterbar uses two modes which specifies how to start filtering. They are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "OnEnter"),
                    " - Enabled by default, filter will be initiated when the ",
                    React.createElement("code", null, "Enter"),
                    " key is pressed."),
                React.createElement("li", null,
                    React.createElement("code", null, "Immediate"),
                    " - Filter will start after user finishes typing. There will be a time delay of ",
                    React.createElement("i", null, "1500ms"),
                    " to initiate filter after the user stops typing. It can be overridden using the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/grid/#filtersettings' }, "filterSettings->immediateModeDelay")),
                    " property.")),
            React.createElement("p", null,
                "In this demo, you can either select the ",
                React.createElement("strong", null, "Category Name"),
                " from the SELECT element or type the text in the filter bar cells to filter.",
                React.createElement("br", null),
                React.createElement("br", null),
                "Additionally, the records can also be filtered based on the selected filterbar operator. It can be enabled by setting",
                React.createElement("br", null),
                React.createElement("code", null, "filterSettings->showFilterBarOperator"),
                " property to true.",
                React.createElement("br", null),
                "In this demo,"),
            React.createElement("ul", null,
                React.createElement("li", null, "To enable or disable filterbar operator feature, check or uncheck the checkbox in the properties panel."),
                React.createElement("li", null, "Select the required filtering operator in the dropdown list on the filter bar cell and type the text to start filtering."),
                React.createElement("li", null, "Now, the addition of new filter operators such as \"Does Not Contain\", \"Does Not End With\", \"Does Not Start With\", \"Empty\", \"Not Empty\", \"Null\", \"Not Null\", \"Like\", and \"Wildcard search\" greatly enhance the filtering feature of the Grid.")),
            React.createElement("p", null,
                "For example, when the ",
                React.createElement("b", null, "Like"),
                " search operator is used:"),
            React.createElement("ul", null,
                React.createElement("li", null, "%a% - Filters words containing the character 'a'"),
                React.createElement("li", null, "a%  - Filters words ending with 'a'"),
                React.createElement("li", null, "%a  - Filters words starting with 'a'")),
            React.createElement("p", null,
                "For example when the ",
                React.createElement("b", null, "Wildcard"),
                " search operator is used:"),
            React.createElement("ul", null,
                React.createElement("li", null, "a*b - Filters words that start with 'a' and end with 'b'")),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Grid features are segregated into individual feature-wise modules. To use filtering feature, inject the",
                React.createElement("code", null, "Filter"),
                " module using the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the filter configuration can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/grid/filtering.html' }, " documentation section"),
                "."))));
}
exports.default = Filtering;
