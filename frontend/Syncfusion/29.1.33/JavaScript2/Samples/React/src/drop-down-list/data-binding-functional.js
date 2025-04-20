"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./data-binding.css");
var data = require("./dataSource.json");
var Data = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'sportsData';
    // define the JSON of data
    var sportsData = data[temp];
    // bind the DataManager instance to dataSource property
    var customerData = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
        adaptor: new ej2_data_1.WebApiAdaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    var query = new ej2_data_1.Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
    // maps the remote data column to fields property
    var remoteFields = { text: 'FirstName', value: 'EmployeeID' };
    // maps the local data column to fields property
    var localFields = { text: 'Game', value: 'Id' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "local" },
                    React.createElement("label", { className: "h4" }, " Local Data"),
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "games", dataSource: sportsData, fields: localFields, placeholder: "Select a game", popupHeight: "220px" }))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "remote" },
                    React.createElement("label", { className: "h4" }, "Remote Data"),
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "customers", dataSource: customerData, sortOrder: "Ascending", query: query, fields: remoteFields, placeholder: "Select a name", popupHeight: "220px" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the different data binding supports of the DropDownList. Click the DropDownList element and select an item from the suggestion list. At the very first time, when click on the remote data DropDownList, the loader icon will be shown until the remote request get the data from the server and display it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The DropDownList loads the data either from the local data sources, or remote data services that is is through the ",
                React.createElement("code", null, "dataSource"),
                " property. It supports the data type of ",
                React.createElement("code", null, "array"),
                " or ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null, "The DataManager that act as an interface between service endpoint and DropDownList, will require the below minimal information to interact with the service endpoint properly. "),
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
                "Adaptor is responsible for processing response and request from/to the service endpoint.",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                " package provides some predefined adaptors that are designed to interact with the particular service endpoints. They are:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "UrlAdaptor"),
                    " - Use this to interact any remote services."),
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
                "In this sample, the local data is bound to a collection of sports data, and the remote data is bound to a collection of customer data as an instance of ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null,
                " More information on the data binding feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/drop-down-list/data-binding.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Data;
