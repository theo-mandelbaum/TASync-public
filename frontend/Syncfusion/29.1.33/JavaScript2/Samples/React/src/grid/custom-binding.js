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
exports.OrderService = exports.CustomBinding = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var CustomBinding = /** @class */ (function (_super) {
    __extends(CustomBinding, _super);
    function CustomBinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.orderService = new OrderService();
        return _this;
    }
    CustomBinding.prototype.rendereComplete = function () {
        var state = { skip: 0, take: 10 };
        this.dataStateChange(state);
    };
    CustomBinding.prototype.dataStateChange = function (state) {
        var _this = this;
        this.orderService.execute(state).then(function (gridData) { _this.grid.dataSource = gridData; });
    };
    CustomBinding.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: this.data, ref: function (g) { return _this.grid = g; }, allowPaging: true, allowSorting: true, pageSettings: { pageCount: 4, pageSize: 10 }, allowGrouping: true, dataStateChange: this.dataStateChange.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', allowGrouping: false }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Group, ej2_react_grids_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of grid with AJAX. Paging, sorting and grouping can be performed in this sample.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Grid can be bound with data from external API. In this demo, the external data communication is done using\u00A0AJAX\u00A0and the grid is resolved with the response data. When performing grid actions such as paging, sorting and grouping etc. the\u00A0",
                    React.createElement("code", null, "dataStateChange"),
                    "\u00A0event will be triggered and we need perform the request and assign the new grid data."),
                React.createElement("p", null,
                    "In this demo, simply select the paging and click the column header to sort a column, multiple sorting is also enabled. To group a specify column, drag and drop the column in the group drop area. To enable paging, sorting and grouping, set the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowpaging" }, "allowPaging")),
                    " , ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowsorting" }, "allowSorting ")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping" }, "allowGrouping")),
                    " as true."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use the paging ,sorting and grouping features, inject the ",
                    React.createElement("code", null, "Page"),
                    ", ",
                    React.createElement("code", null, "Sort"),
                    " and ",
                    React.createElement("code", null, "Group"),
                    " respectively into the",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return CustomBinding;
}(sample_base_1.SampleBase));
exports.CustomBinding = CustomBinding;
var OrderService = /** @class */ (function () {
    function OrderService() {
        this.ajax = new ej2_base_1.Ajax({
            type: 'GET', mode: true,
            onFailure: function (e) { return false; }
        });
        this.BASE_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';
    }
    OrderService.prototype.execute = function (state) {
        return this.getData(state);
    };
    OrderService.prototype.getData = function (state) {
        var pageQuery = "$skip=".concat(state.skip, "&$top=").concat(state.take);
        var sortQuery = '';
        if ((state.sorted || []).length) {
            sortQuery = "&$orderby=" + (state).sorted.map(function (obj) {
                return obj.direction === 'descending' ? "".concat(obj.name, " desc") : obj.name;
            }).reverse().join(',');
        }
        this.ajax.url = "".concat(this.BASE_URL, "?").concat(pageQuery).concat(sortQuery, "&$count=true");
        return this.ajax.send().then(function (response) {
            var data = JSON.parse(response);
            return { result: data['value'], count: parseInt(data['@odata.count'], 10) };
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
