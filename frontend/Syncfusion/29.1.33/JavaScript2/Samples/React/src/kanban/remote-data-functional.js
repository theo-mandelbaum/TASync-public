"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
/**
 * Kanban Remote Data sample
 */
var RemoteData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataManger = new ej2_data_1.DataManager({
        url: "https://ej2services.syncfusion.com/production/web-services/api/Kanban",
        crossDomain: true,
    });
    var dialogOpen = function (args) {
        args.cancel = true;
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", keyField: "Status", dataSource: dataManger, cardSettings: { contentField: "Summary", headerField: "Id" }, allowDragAndDrop: false, dialogOpen: dialogOpen.bind(_this) },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the way of data binding to Kanban component using remote service. The data source of Kanban is fetched from remote service using DataManager.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Kanban supports data binding using the ",
                React.createElement("code", null, "dataSource"),
                " ",
                "property that can be assigned with the instance of DataManager to bind remote data."),
            React.createElement("p", null, "The DataManager, which acts as an interface between the service endpoint and the Kanban will require the below minimal information to interact with service endpoint properly."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager"),
                    " -> ",
                    React.createElement("code", null, "url"),
                    ": Defines the service endpoint to fetch the data."),
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager"),
                    " -> ",
                    React.createElement("code", null, "adaptor"),
                    ": Defines the adaptor option. By default, ODataAdaptor is used for remote binding.")),
            React.createElement("p", null, "The adaptor is responsible for processing response and request from/to the service endpoint. @syncfusion/ej2-data package provides some predefined adaptors which are designed to interact with particular service endpoints. They are:"),
            React.createElement("ul", null,
                React.createElement("li", null, "UrlAdaptor - Use this to interact with any remote services. This is the base adaptor for all remote based adaptors."),
                React.createElement("li", null, "ODataAdaptor - Use this to interact with OData endpoints."),
                React.createElement("li", null, "ODataV4Adaptor - Use this to interact with OData V4 endpoints."),
                React.createElement("li", null, "WebApiAdaptor - Use this to interact with Web API created under OData standards."),
                React.createElement("li", null, "WebMethodAdaptor - Use this to interact with web methods.")),
            React.createElement("p", null,
                "In this demo, remote data is bound by assigning service data as an instance of DataManager to the",
                React.createElement("code", null, "dataSource"),
                " property."))));
};
exports.default = RemoteData;
