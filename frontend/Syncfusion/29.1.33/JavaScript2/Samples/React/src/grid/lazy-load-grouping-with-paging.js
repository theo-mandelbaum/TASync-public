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
exports.LazyLoadGrouping = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
var LazyLoadGrouping = /** @class */ (function (_super) {
    __extends(LazyLoadGrouping, _super);
    function LazyLoadGrouping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupOptions = { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] };
        _this.lazyLoadData = (0, data_1.createLazyLoadData)();
        return _this;
    }
    LazyLoadGrouping.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.lazyLoadData, allowSorting: true, allowPaging: true, allowGrouping: true, groupSettings: this.groupOptions, height: 400 },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', textAlign: "Right", width: '120', allowGrouping: false }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductID', headerText: 'Product ID', textAlign: "Right", width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '160' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.LazyLoadGroup, ej2_react_grids_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the lazy load grouping feature of the Grid component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Lazy load grouping, allows the Grid to render only the initial level caption rows in the collapsed state while grouping. The child rows of each caption will render only when we expand the captions. To enable lazy load grouping, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/groupSettings/#enablelazyloading" }, "groupSettings->enableLazyLoading")),
                    " property as true."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use lazy load grouping feature, we need to inject",
                    React.createElement("code", null, "LazyLoadGroup"),
                    "module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return LazyLoadGrouping;
}(sample_base_1.SampleBase));
exports.LazyLoadGrouping = LazyLoadGrouping;
