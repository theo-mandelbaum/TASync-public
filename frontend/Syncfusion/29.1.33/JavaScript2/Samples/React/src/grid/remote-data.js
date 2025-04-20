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
exports.RemoteDataBinding = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./remote-data.css");
var RemoteDataBinding = /** @class */ (function (_super) {
    __extends(RemoteDataBinding, _super);
    function RemoteDataBinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        _this.data = new ej2_data_1.DataManager({ url: _this.hostUrl + 'api/Orders', adaptor: new ej2_data_1.WebApiAdaptor });
        return _this;
    }
    RemoteDataBinding.prototype.onChanged = function (args) {
        this.gridInstance.dataSource = new ej2_data_1.DataManager({ url: this.hostUrl + 'api/Orders', adaptor: new ej2_data_1.WebApiAdaptor, enableCache: args.checked });
    };
    RemoteDataBinding.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { style: { display: 'flex' } },
                    React.createElement("div", { id: "export-cache-container" },
                        React.createElement("label", { htmlFor: "unchecked" }, " Enable Cache "),
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "unchecked", checked: false, change: this.onChanged.bind(this) })))),
                React.createElement(ej2_react_grids_1.GridComponent, { id: "Grid", dataSource: this.data, ref: function (grid) { return _this.gridInstance = grid; }, allowPaging: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '150', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: 'waitingpopup', className: 'waitingpopup' },
                React.createElement("span", { id: 'gif', className: 'image' })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the way of data binding Grid component with remote service. The Grid data source is bound to remote data using DataManager.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid supports data binding. The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#datasource" }, "dataSource")),
                    " property can be assigned with the instance of ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/documentation/api/data/dataManager/" }, "DataManager")),
                    " to bind remote data."),
                React.createElement("p", null, "The DataManager, which will act as an interface between the service endpoint and the Grid, will require the below minimal information to interact with service endpoint properly."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->url"),
                        " - Defines the service endpoint to fetch data"),
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->adaptor"),
                        " - Defines the adaptor option. By default, ",
                        React.createElement("code", null, "ODataAdaptor"),
                        " is used for remote binding.")),
                React.createElement("p", null,
                    "Adaptor is responsible for processing response and request from/to the service endpoint. ",
                    React.createElement("code", null, "@syncfusion/ej2-data"),
                    " package provides some predefined adaptors which are designed to interact with particular service endpoints. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "UrlAdaptor"),
                        " - Use this to interact any remote services. This is the base adaptor for all remote based adaptors."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ODataAdaptor"),
                        " - Use this to interact with OData endpoints."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ODataV4Adaptor"),
                        " - Use this to interact with OData V4 endpoints."),
                    React.createElement("li", null,
                        React.createElement("code", null, "WebApiAdaptor"),
                        " - Use this to interact with Web API created under OData standards."),
                    React.createElement("li", null,
                        React.createElement("code", null, "WebMethodAdaptor"),
                        " - Use this to interact with web methods.")),
                React.createElement("p", null,
                    "In this demo, remote data is bound by assigning service data as an instance of ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/documentation/api/data/dataManager/" }, "DataManager")),
                    " to the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#datasource" }, "dataSource")),
                    " property."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "DataManager"),
                    " provides an option to avoid sending requests for previously visited pages by enabling the ",
                    React.createElement("code", null, "enableCache"),
                    " property. When this property is enabled, the DataManager does not send a request to the server when revisiting a page. However, the cache will be reset if any data action, such as sorting or filtering, is performed."),
                React.createElement("p", null,
                    "More information on the data binding can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/data-binding.html#remote-data" }, "documentation section"),
                    "."))));
    };
    return RemoteDataBinding;
}(sample_base_1.SampleBase));
exports.RemoteDataBinding = RemoteDataBinding;
