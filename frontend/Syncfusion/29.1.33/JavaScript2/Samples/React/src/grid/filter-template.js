"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTemplate = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./filter-template.css");
var FilterTemplate = /** @class */ (function (_super) {
    __extends(FilterTemplate, _super);
    function FilterTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterTemplate.prototype.templateOptionsNumericTextBox = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "e-cus-label" }, "Id"),
            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (num) { return _this.productIDTxtObj = num; }, className: 'e-fltrtemp-focus', format: 'n' })));
    };
    ;
    FilterTemplate.prototype.templateOptionsStringTextBox = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "e-cus-label" }, "Name"),
            React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (str) { return _this.ProductNameTxtObj = str; }, className: 'e-fltrtemp-focus' })));
    };
    ;
    FilterTemplate.prototype.templateOptionsMinMax = function () {
        var _this = this;
        return (React.createElement("div", { className: 'e-flex-layout' },
            React.createElement("div", { className: 'e-min-max-separator' },
                React.createElement("div", { className: "e-cus-label" }, "Min"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (num) { return _this.minTextBox = num; }, className: 'e-fltrtemp-focus', format: 'n' })),
            React.createElement("div", null,
                React.createElement("div", { className: "e-cus-label" }, "Max"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (num) { return _this.maxTextBox = num; }, className: 'e-fltrtemp-focus', format: 'n' }))));
    };
    ;
    FilterTemplate.prototype.templateOptionsDropDown = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "e-cus-label" }, "Status"),
            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { cssClass: 'e-fltrtemp-focus', dataSource: ['Both', 'true', 'false'], value: 'Both', change: this.discontinuedChange.bind(this) })));
    };
    ;
    FilterTemplate.prototype.discontinuedChange = function (args) {
        if (args.value !== 'Both') {
            this.gridInstance.filterByColumn('Discontinued', 'equal', args.value === 'true' ? true : false);
        }
        else {
            this.gridInstance.removeFilteredColsByField('Discontinued');
        }
    };
    ;
    FilterTemplate.prototype.dataBound = function () {
        var filterBarOperatorDiv = this.gridInstance.getHeaderTable()
            .querySelector('.e-filterdiv.e-fltrinputdiv');
        if (!filterBarOperatorDiv.querySelector('.e-cus-label')) {
            var label = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Stock';
            filterBarOperatorDiv.insertBefore(label, filterBarOperatorDiv.firstChild);
        }
    };
    ;
    FilterTemplate.prototype.keyPressed = function (args) {
        var _this = this;
        if (args.keyCode === 13) {
            var target = args.target;
            var th = (0, ej2_base_1.closest)(target, 'th');
            if (th &&
                th.classList.contains('e-filterbarcell') &&
                th.hasAttribute('e-mappinguid')) {
                var field = this.gridInstance.getColumnByUid(th.getAttribute('e-mappinguid')).field;
                if (field === 'UnitPrice') {
                    args.cancel = true;
                    if (this.minTextBox.element.value || this.maxTextBox.element.value) {
                        var filterColumns_1 = this.gridInstance.filterSettings.columns.filter(function (data) { return data.field !== 'UnitPrice'; });
                        if (this.minTextBox.element.value) {
                            filterColumns_1.push({
                                field: 'UnitPrice',
                                operator: 'greaterthanorequal',
                                predicate: 'and',
                                value: parseFloat(this.minTextBox.element.value),
                            });
                        }
                        if (this.maxTextBox.element.value) {
                            filterColumns_1.push({
                                field: 'UnitPrice',
                                operator: 'lessthanorequal',
                                predicate: 'and',
                                value: parseFloat(this.maxTextBox.element.value),
                            });
                        }
                        setTimeout(function () {
                            _this.gridInstance.setProperties({
                                filterSettings: { columns: filterColumns_1 },
                            });
                        }, 0);
                    }
                    else {
                        var filterColumns = this.gridInstance.filterSettings.columns.filter(function (data) { return data.field === 'UnitPrice'; });
                        if (filterColumns.length) {
                            this.gridInstance.removeFilteredColsByField('UnitPrice');
                        }
                    }
                }
                if (field === 'ProductID' || field === 'ProductName') {
                    args.cancel = true;
                    var elemValue = field === 'ProductID'
                        ? this.productIDTxtObj.element.value
                        : this.ProductNameTxtObj.element.value.trim();
                    var operator = field === 'ProductID' ? 'equal' : 'startswith';
                    if (elemValue.length > 0) {
                        if (field === 'ProductID')
                            elemValue = parseFloat(elemValue);
                        this.gridInstance.filterByColumn(field, operator, elemValue);
                    }
                    else {
                        this.gridInstance.clearFiltering([field]);
                    }
                }
            }
        }
    };
    ;
    FilterTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return _this.gridInstance = grid; }, dataSource: data_1.productData, allowPaging: true, allowFiltering: true, allowSorting: true, filterSettings: { showFilterBarOperator: true, showFilterBarStatus: false }, gridLines: 'Both', pageSettings: { pageCount: 5 }, dataBound: this.dataBound.bind(this), keyPressed: this.keyPressed.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductID', headerText: 'Product ID', width: 120, textAlign: 'Right', isPrimaryKey: true, filterTemplate: this.templateOptionsNumericTextBox.bind(this) }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: 220, filterTemplate: this.templateOptionsStringTextBox.bind(this) }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitPrice', headerText: 'Price', width: 200, format: 'C2', textAlign: 'Right', filterTemplate: this.templateOptionsMinMax.bind(this) }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Stock', width: 120, format: 'N', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Discontinued', displayAsCheckBox: true, type: 'boolean', headerText: 'Discontinued', width: 150, filterTemplate: this.templateOptionsDropDown.bind(this) })),
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
    };
    return FilterTemplate;
}(sample_base_1.SampleBase));
exports.FilterTemplate = FilterTemplate;
