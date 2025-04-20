"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_data_1 = require("@syncfusion/ej2-data");
var property_pane_1 = require("../common/property-pane");
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
    // enable or disable the autofill in ComboBox based on CheckBox checked state
    var _a = (0, react_1.useState)(true), autofill = _a[0], setAutofill = _a[1];
    // Bind change event
    var onChange = function (args) {
        setAutofill(args.checked);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { className: 'drop-down-list-content', id: "local" },
                        React.createElement("label", { className: "h4" }, " Local Data"),
                        React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "games", dataSource: sportsData, fields: localFields, placeholder: "Select a game", popupHeight: "220px", autofill: autofill }))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { className: 'drop-down-list-content', id: "remote" },
                        React.createElement("label", { className: "h4" }, "Remote Data"),
                        React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "customers", dataSource: customerData, sortOrder: "Ascending", query: query, fields: remoteFields, placeholder: "Select a name", autofill: autofill, popupHeight: "220px" })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("div", { style: { marginLeft: '75px', paddingTop: '35px' } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: autofill, label: 'Autofill', change: onChange.bind(_this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the different data binding supports of the ComboBox. Type a character(s) in the ComboBox element and the remaining characters are automatically filled based on the first matched item. Also, provided option to enable/disable this ",
                React.createElement("code", null, "autofill"),
                " feature in the property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ComboBox loads the data either from local data sources or remote data services through the ",
                React.createElement("code", null, "dataSource"),
                " property. It supports the data type of ",
                React.createElement("code", null, "array"),
                " or ",
                React.createElement("code", null, "DataManager"),
                "."),
            React.createElement("p", null, "The DataManager, that act as an interface between service endpoint and ComboBox will require the following minimal information to interact with the service endpoint properly."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager->url"),
                    " - Defines the service endpoint to fetch data."),
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager->adaptor"),
                    " - Defines the adaptor option. By default, ",
                    React.createElement("code", null, "ODataAdaptor"),
                    " is used for remote binding.")),
            React.createElement("p", null,
                "The adaptor is responsible for processing response and request from/to the service endpoint.",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                " package provides some predefined adaptors which are designed to interact with particular service endpoints. They are:"),
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
                "In this sample, the local data is bound to a collection of sports data and the remote data is bound to a collection of customer data as an instance of ",
                React.createElement("code", null, "DataManager"),
                ". Also, provided option to enable/disable ",
                React.createElement("code", null, "autofill"),
                " feature in the property panel."),
            React.createElement("p", null,
                " More information on the data binding feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/combo-box/data-binding.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Data;
