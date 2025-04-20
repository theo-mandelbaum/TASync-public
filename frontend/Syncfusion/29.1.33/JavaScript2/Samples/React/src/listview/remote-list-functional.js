"use strict";
/**
 * ListView Remote Sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./listview.css");
var Remote = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Initialize dataSource with the DataManager instance.
    var dataSource = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/',
        crossDomain: true
    });
    //Initialize query with the Query instance to get specified set of data
    var query = new ej2_data_1.Query().from('ListView').select('EmployeeID,FirstName').take(10);
    //Map the appropriate columns to fields property
    var fields = {
        id: 'EmployeeID',
        text: 'FirstName'
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'sample-list', dataSource: dataSource, fields: fields, query: query, headerTitle: 'Employees', showHeader: true })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the remote data functionalities of the ListView. Click any item from the list to select and highlight it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ListView supports ",
                React.createElement("b", null, "data binding"),
                " and the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#datasource' }, "dataSource")),
                " property can be assigned with the instance of ",
                React.createElement("code", null, "DataManager"),
                " to bind remote the data."),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "DataManager"),
                " that acts as an interface between the service endpoint and ListView will require the following minimal information to interact with the service endpoint properly."),
            React.createElement("p", null, "DataManager->url - Defines the service endpoint to fetch the data."),
            React.createElement("p", null, "DataManager->adaptor - Defines the adaptor option. By default, the ODataAdaptor is used for remote binding."),
            React.createElement("p", null,
                "Adaptor is responsible for processing response and request from/to the service endpoint. ",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                " namespace provides some predefined adaptors that are designed to interact with the particular service endpoints. They are:"),
            React.createElement("ul", null,
                React.createElement("li", null, "UrlAdaptor - Used to interact with any remote services. This is the base adaptor for all remote based adaptors."),
                React.createElement("li", null, "ODataAdaptor - Used to interact with OData endpoints."),
                React.createElement("li", null, "ODataV4Adaptor - Used to interact with OData V4 endpoints."),
                React.createElement("li", null, "WebApiAdaptor - Used to interact with Web API created under OData standards."),
                React.createElement("li", null, "WebMethodAdaptor - Used to interact with web methods.")),
            React.createElement("p", null,
                "In this sample, the remote data is bound to be a collection of ",
                React.createElement("b", null, "Products"),
                " data as an instance of ",
                React.createElement("code", null, "DataManager"),
                "."))));
};
exports.default = Remote;
