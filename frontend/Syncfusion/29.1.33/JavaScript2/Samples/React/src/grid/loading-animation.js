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
exports.LoadingAnimation = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var LoadingAnimation = /** @class */ (function (_super) {
    __extends(LoadingAnimation, _super);
    function LoadingAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = new ej2_data_1.DataManager({ url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders', adaptor: new ej2_data_1.ODataV4Adaptor });
        _this.indicatortypes = [
            { id: 'Shimmer', name: 'Shimmer' },
            { id: 'Spinner', name: 'Spinner' }
        ];
        _this.fields = { text: 'name', value: 'id' };
        return _this;
    }
    LoadingAnimation.prototype.indicatorChange = function (e) {
        if (this.indicatorDropDown.value === 'Shimmer') {
            this.gridInstance.loadingIndicator.indicatorType = 'Shimmer';
            this.gridInstance.refresh();
        }
        else {
            this.gridInstance.loadingIndicator.indicatorType = 'Spinner';
            this.gridInstance.refresh();
        }
    };
    ;
    LoadingAnimation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { style: { paddingBottom: '20px' } },
                    React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                        React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                            React.createElement("span", null, "Indicator Type")),
                        React.createElement("div", { style: { display: 'inline-block', paddingRight: '10px' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.indicatortypes, value: "Shimmer", change: this.indicatorChange.bind(this), fields: this.fields, ref: function (indicatorDropDown) { _this.indicatorDropDown = indicatorDropDown; } })))),
                React.createElement(ej2_react_grids_1.GridComponent, { id: "Grid", dataSource: this.data, ref: function (grid) { return _this.gridInstance = grid; }, allowPaging: true, pageSettings: { pageCount: 3 }, loadingIndicator: { indicatorType: 'Shimmer' }, allowFiltering: true, allowSorting: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '130', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '100', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '100', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the loading indicator while grid loading and refreshing when using remote data. In this sample, you can change the loading indicators from the properties panel.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "When performing the grid actions (like sorting, filtering, grouping, and more), the loading indicator is shown in the in-between time the processed data is fetched and bound to the grid."),
                React.createElement("p", null, "The Grid supports the following loading indicator types. They are: "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Spinner")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Shimmer"))),
                React.createElement("p", null,
                    "Use the loading indicator by setting the ",
                    React.createElement("code", null, "loadingIndicator.indicatorType"),
                    " property as ",
                    React.createElement("code", null, "Spinner"),
                    " or ",
                    React.createElement("code", null, "Shimmer"),
                    ". The default value of the indicatorType is ",
                    React.createElement("code", null, "Spinner"),
                    "."),
                React.createElement("p", null,
                    " In this demo, the ",
                    React.createElement("code", null, "Shimmer"),
                    " type is initially enabled. If you want to use the default value of the loading indicator, use the dropdown to change it."))));
    };
    return LoadingAnimation;
}(sample_base_1.SampleBase));
exports.LoadingAnimation = LoadingAnimation;
