"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./filter-template.css");
function FilterTemplate() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gridInstance;
    var productIDTxtObj;
    var ProductNameTxtObj;
    var minTextBox;
    var maxTextBox;
    var templateOptionsNumericTextBox = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "e-cus-label" }, "Id"),
            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (num) { return productIDTxtObj = num; }, className: 'e-fltrtemp-focus', format: 'n' })));
    };
    var templateOptionsStringTextBox = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "e-cus-label" }, "Name"),
            React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (str) { return ProductNameTxtObj = str; }, className: 'e-fltrtemp-focus' })));
    };
    var templateOptionsMinMax = function () {
        return (React.createElement("div", { className: 'e-flex-layout' },
            React.createElement("div", { className: 'e-min-max-separator' },
                React.createElement("div", { className: "e-cus-label" }, "Min"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (num) { return minTextBox = num; }, className: 'e-fltrtemp-focus', format: 'n' })),
            React.createElement("div", null,
                React.createElement("div", { className: "e-cus-label" }, "Max"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (num) { return maxTextBox = num; }, className: 'e-fltrtemp-focus', format: 'n' }))));
    };
    var templateOptionsDropDown = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "e-cus-label" }, "Status"),
            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { cssClass: 'e-fltrtemp-focus', dataSource: ['Both', 'true', 'false'], value: 'Both', change: discontinuedChange })));
    };
    var discontinuedChange = function (args) {
        if (args.value !== 'Both') {
            gridInstance.filterByColumn('Discontinued', 'equal', args.value === 'true' ? true : false);
        }
        else {
            gridInstance.removeFilteredColsByField('Discontinued');
        }
    };
    var dataBound = function () {
        var filterBarOperatorDiv = gridInstance.getHeaderTable()
            .querySelector('.e-filterdiv.e-fltrinputdiv');
        if (!filterBarOperatorDiv.querySelector('.e-cus-label')) {
            var label = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Stock';
            filterBarOperatorDiv.insertBefore(label, filterBarOperatorDiv.firstChild);
        }
    };
    var keyPressed = function (args) {
        if (args.keyCode === 13) {
            var target = args.target;
            var th = (0, ej2_base_1.closest)(target, 'th');
            if (th &&
                th.classList.contains('e-filterbarcell') &&
                th.hasAttribute('e-mappinguid')) {
                var field = gridInstance.getColumnByUid(th.getAttribute('e-mappinguid')).field;
                if (field === 'UnitPrice') {
                    args.cancel = true;
                    if (minTextBox.element.value || maxTextBox.element.value) {
                        var filterColumns_1 = gridInstance.filterSettings.columns.filter(function (data) { return data.field !== 'UnitPrice'; });
                        if (minTextBox.element.value) {
                            filterColumns_1.push({
                                field: 'UnitPrice',
                                operator: 'greaterthanorequal',
                                predicate: 'and',
                                value: parseFloat(minTextBox.element.value),
                            });
                        }
                        if (maxTextBox.element.value) {
                            filterColumns_1.push({
                                field: 'UnitPrice',
                                operator: 'lessthanorequal',
                                predicate: 'and',
                                value: parseFloat(maxTextBox.element.value),
                            });
                        }
                        setTimeout(function () {
                            gridInstance.setProperties({
                                filterSettings: { columns: filterColumns_1 },
                            });
                        }, 0);
                    }
                    else {
                        var filterColumns = gridInstance.filterSettings.columns.filter(function (data) { return data.field === 'UnitPrice'; });
                        if (filterColumns.length) {
                            gridInstance.removeFilteredColsByField('UnitPrice');
                        }
                    }
                }
                if (field === 'ProductID' || field === 'ProductName') {
                    args.cancel = true;
                    var elemValue = field === 'ProductID'
                        ? productIDTxtObj.element.value
                        : ProductNameTxtObj.element.value.trim();
                    var operator = field === 'ProductID' ? 'equal' : 'startswith';
                    if (elemValue.length > 0) {
                        if (field === 'ProductID')
                            elemValue = parseFloat(elemValue);
                        gridInstance.filterByColumn(field, operator, elemValue);
                    }
                    else {
                        gridInstance.clearFiltering([field]);
                    }
                }
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return gridInstance = grid; }, dataSource: data_1.productData, allowPaging: true, allowFiltering: true, allowSorting: true, filterSettings: { showFilterBarOperator: true, showFilterBarStatus: false }, gridLines: 'Both', pageSettings: { pageCount: 5 }, dataBound: dataBound, keyPressed: keyPressed },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductID', headerText: 'Product ID', width: 120, textAlign: 'Right', isPrimaryKey: true, filterTemplate: templateOptionsNumericTextBox }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: 220, filterTemplate: templateOptionsStringTextBox }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitPrice', headerText: 'Price', width: 200, format: 'C2', textAlign: 'Right', filterTemplate: templateOptionsMinMax }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Stock', width: 120, format: 'N', textAlign: 'Right' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Discontinued', displayAsCheckBox: true, type: 'boolean', headerText: 'Discontinued', width: 150, filterTemplate: templateOptionsDropDown })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Sort] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample illustrates the Grid's filtering bar feature, utilizing custom components in the filter cells through the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#filtertemplate" }, "filterTemplate")),
                " feature. This functionality allows users to filter records based on specified criteria, displaying a reduced set of data. To enable filtering, set the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#allowfiltering" }, "allowFiltering")),
                " property to ",
                React.createElement("code", null, "true"),
                ", which renders a filter bar row next to the header. Users can then filter data by entering text into the cells of this row.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#filtertemplate" }, "filterTemplate")),
                " feature in the Syncfusion EJ2 React Grid allows customization of the controls in the filter bar. By default, a text box appears in the filter bar cell. In this demo, the Grid showcases various custom input components: a custom input component for the ID, Name and Price columns, and a Syncfusion DropDownList for the Discontinued column, all achieved through the filter template feature. You can customize the filter components in the filter cells by setting the ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/column/#filtertemplate" }, "filterTemplate")),
                " property for each column. The Unit Stock column uses the default filter bar cell with operator functionality."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Grid features are divided into individual modules. To utilize the filtering feature, inject the ",
                React.createElement("code", null, "Filter"),
                " module into the ",
                React.createElement("code", null, "services"),
                ". For more details on configuring filters, refer to the relevant ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/filtering/filter-bar#filter-bar-template-with-custom-component" }, "documentation section"),
                "."))));
}
exports.default = FilterTemplate;
