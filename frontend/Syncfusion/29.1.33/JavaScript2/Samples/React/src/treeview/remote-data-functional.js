"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./remote-data.css");
var RemoteData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), loading = _a[0], setLoading = _a[1];
    // Use data manager to get tree data from remote source
    var data = new ej2_data_1.DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ej2_data_1.ODataV4Adaptor,
        crossDomain: true,
    });
    // Set queries to filter and fetch remote data
    var query = new ej2_data_1.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    var query1 = new ej2_data_1.Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
    var fields = {
        dataSource: data, query: query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
        child: { dataSource: data, query: query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
    };
    // Show loading message, while loading tree data
    var show = function () {
        // let popup: HTMLElement = document.getElementById('loading');
        // popup.style.display = '';
        setLoading('Loading...');
    };
    // Hide loading message, after tree data has been loaded
    var hide = function () {
        // let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
        // popup.style.display = 'none';
        setLoading('');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'tree-control_wrapper' },
                React.createElement("span", { id: "loading" }, loading),
                React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, dataBound: hide.bind(_this), created: show.bind(_this) }))),
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
exports.default = RemoteData;
