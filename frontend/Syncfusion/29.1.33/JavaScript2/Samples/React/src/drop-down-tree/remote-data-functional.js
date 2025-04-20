"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./remote-data.css");
var RemoteData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Use data manager to get dropdown tree data from remote source
    var data = new ej2_data_1.DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ej2_data_1.ODataV4Adaptor,
        crossDomain: true,
    });
    // Set queries to filter and fetch remote data
    var query = new ej2_data_1.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    var query1 = new ej2_data_1.Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
    var fields = {
        dataSource: data, query: query, value: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
        child: { dataSource: data, query: query1, value: 'OrderID', parentValue: 'EmployeeID', text: 'ShipName' }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section dropdowntree-remote' },
            React.createElement("div", { id: "remote" },
                React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "ddtremote", fields: fields, placeholder: "Select a name", popupHeight: "200px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample explains you about how to bind data to the Dropdown Tree from a remote data source. Click the Dropdown Tree element, and then select an item from the hierarchical structure suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Dropdown Tree"),
                " loads the data from the remote data services through the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#datasource" }, "dataSource"),
                " property. It supports the data type of ",
                React.createElement("code", null, "array"),
                " or ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null, "The DataManager that act as an interface between the service endpoint and Dropdown Tree, will require the below minimal information to interact with the service endpoint properly."),
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
                "Adaptor is responsible for processing response and request from or to the service endpoint.",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                " package provides some pre-defined adaptors that are designed to interact with the particular service endpoints. They are:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "UrlAdaptor"),
                    " - To interact with any remote services."),
                React.createElement("li", null,
                    React.createElement("code", null, "ODataAdaptor"),
                    " - To interact with OData endpoints."),
                React.createElement("li", null,
                    React.createElement("code", null, "ODataV4Adaptor"),
                    " - To interact with OData V4 endpoints."),
                React.createElement("li", null,
                    React.createElement("code", null, "WebApiAdaptor"),
                    " - To interact with Web API created under OData standards."),
                React.createElement("li", null,
                    React.createElement("code", null, "WebMethodAdaptor"),
                    " - To interact with web methods.")),
            React.createElement("p", null, "In this demo, the Dropdown Tree is bound with the dataSource from the Northwind remote service by using the DataManager instance."))));
};
exports.default = RemoteData;
