"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-component.css");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
/**
 * Schedule remote data sample
 */
var RemoteData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataManager = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/schedule',
        adaptor: new ej2_data_1.WebApiAdaptor,
        crossDomain: true
    });
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', currentView: 'Month', eventSettings: { dataSource: dataManager }, readonly: true },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases the way of binding remote services to Scheduler component. Here, the DataManager is used to bind the remote data with Scheduler.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Scheduler can be bound to remote services by assigning the ",
                React.createElement("code", null, "dataSource"),
                " property with the instance of",
                React.createElement("code", null,
                    React.createElement("a", { "aria-label": "Data Manager", target: "_blank", className: 'code', href: "http://ej2.syncfusion.com/documentation/data/api-dataManager.html" }, "DataManager")),
                "."),
            React.createElement("p", null, "The DataManager here acts as an interface between the service endpoint and the Scheduler, and will require the below minimal information to interact with the service endpoint properly."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "url"),
                    " - Defines the service endpoint from where the data needs to be fetched"),
                React.createElement("li", null,
                    React.createElement("code", null, "adaptor"),
                    " - Defines the adaptor option. By default, ",
                    React.createElement("code", null, "ODataAdaptor"),
                    " is used for remote binding.")),
            React.createElement("p", null,
                "Adaptor is responsible for processing response and request from/to the service endpoint.",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                " package provides some predefined adaptors which are designed to interact with particular service endpoints. They are as follows,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "UrlAdaptor"),
                    " - Use this to interact with any remote services. This is the base adaptor for all the remote based adaptors."),
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
                    " - Use this to interact with web methods.")))));
};
exports.default = RemoteData;
