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
exports.RemoteData = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./remote-data.css");
var RemoteData = /** @class */ (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Use data manager to get tree data from remote source
        _this.data = new ej2_data_1.DataManager({
            url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
            adaptor: new ej2_data_1.ODataV4Adaptor,
            crossDomain: true,
        });
        // Set queries to filter and fetch remote data
        _this.query = new ej2_data_1.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
        _this.query1 = new ej2_data_1.Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
        _this.fields = { dataSource: _this.data, query: _this.query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
            child: { dataSource: _this.data, query: _this.query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
        };
        return _this;
    }
    // Show loading message, while loading tree data
    RemoteData.prototype.show = function () {
        var popup = document.getElementById('loading');
        popup.style.display = '';
    };
    // Hide loading message, after tree data has been loaded
    RemoteData.prototype.hide = function () {
        var popup = document.getElementById('loading');
        popup.style.display = 'none';
    };
    RemoteData.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'tree-control_wrapper' },
                    React.createElement("span", { id: "loading" }, "Loading..."),
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: this.fields, dataBound: this.hide.bind(this), created: this.show.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This ",
                    React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                    " demonstrates the binding data to the TreeView from remote data source. On expanding the parent node, the spinner icon will be displayed until the child nodes will be loaded into parent node. Click on node to select it, and click on icon or double click on node to expand/collapse it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "TreeView"),
                    " component loads the data through the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#datasource" }, "dataSource"),
                    " property, where the data can be either local data or remote data. In case of remote data, the data can be loaded from any remote services though the ",
                    React.createElement("code", null, "DataManager"),
                    "."),
                React.createElement("p", null, "The DataManager will act as an interface between the service endpoint and the TreeView, that requires the below minimal information to interact with the service endpoint."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->url"),
                        " - Defines the service endpoint to fetch data."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DataManager->adaptor"),
                        " - Defines the adaptor option. By default, ODataAdaptor is used for remote binding.")),
                React.createElement("p", null, "In this demo, the TreeView is bound with the dataSource from the Northwind remote service by using the DataManager instance."),
                React.createElement("p", null,
                    "For more information, you can refer to the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/data-binding/#remote-data", target: "_blank" }, "Data Binding"),
                    " section from the documentation."))));
    };
    return RemoteData;
}(sample_base_1.SampleBase));
exports.RemoteData = RemoteData;
