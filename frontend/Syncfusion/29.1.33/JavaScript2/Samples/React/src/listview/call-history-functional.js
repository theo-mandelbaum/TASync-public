"use strict";
/**
 * ListView CallHistory Sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var listData_1 = require("./listData");
require("./call-history.css");
var CallHistory = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("layoutWrapper"), deviceLayout = _a[0], setDeviceLayout = _a[1];
    var _b = (0, react_1.useState)("tabContainer"), visibleLayer = _b[0], setVisibleLayer = _b[1];
    //Map the appropriate columns to fields property
    var fields = { text: 'text', groupBy: 'category' };
    var styleNone = { display: "none" };
    // Set customized list template
    var listTemplate = function (data) {
        return (React.createElement("div", { className: "e-list-wrapper e-list-avatar e-list-multi-line" },
            React.createElement("span", { className: "e-avatar e-icon" }),
            React.createElement("span", { className: "e-list-item-header" }, data.text),
            " ",
            React.createElement("span", { className: "".concat(data.type, " e-list-content") },
                data.group,
                ", ",
                data.time)));
    };
    var allInstance = (0, react_1.useRef)(null);
    var receivedInstance = (0, react_1.useRef)(null);
    var missedInstance = (0, react_1.useRef)(null);
    var listObjects = [];
    var headerText = [
        { "text": "All" },
        { "text": "Received" },
        { "text": "Missed" }
    ];
    var type = ['', 'received', 'missed'];
    // EventHandler to filter data while selecting tab
    var filterData = function (dataSource, value) {
        var newData = [];
        dataSource.filter(function (data) {
            if ((data.id).indexOf(value) !== -1) {
                newData.push(data);
            }
        });
        return newData;
    };
    // EventHandler to check the device mode
    var onCreated = function () {
        if (!ej2_base_1.Browser.isDevice) {
            setDeviceLayout("layoutWrapper e-device-layout");
        }
        else {
            setVisibleLayer("tabContainer e-visbile-layer");
        }
    };
    // EventHandler to select the tab
    var selectedHanlder = function (args) {
        if (allInstance !== undefined) {
            listObjects = [allInstance, receivedInstance, missedInstance];
            var newData = void 0;
            newData = filterData(listData_1.callHistoryData, type[args.selectedIndex]); // Filter the data while selecting tab
            listObjects[args.selectedIndex].dataSource = newData; // Append the filtered data
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'slider-call-history col-lg-12 control-section' },
            React.createElement("div", { className: deviceLayout },
                React.createElement("div", { className: "speaker" },
                    React.createElement("div", { className: "camera" })),
                React.createElement("div", { className: "layout" },
                    React.createElement("div", { id: "list-container" },
                        React.createElement("div", { className: visibleLayer },
                            React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab", selected: selectedHanlder.bind(_this), created: onCreated },
                                React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[0], content: "#all" }),
                                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[1], content: "#received" }),
                                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[2], content: "#missed" })))),
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: "all", dataSource: listData_1.callHistoryData, fields: fields, style: styleNone, cssClass: 'e-list-template', template: listTemplate, ref: function (listview) { allInstance = listview; } }),
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: "received", dataSource: listData_1.callHistoryData, fields: fields, style: styleNone, cssClass: 'e-list-template', template: listTemplate, ref: function (listview) { receivedInstance = listview; } }),
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: "missed", dataSource: listData_1.callHistoryData, fields: fields, style: styleNone, cssClass: 'e-list-template', template: listTemplate, ref: function (listview) { missedInstance = listview; } }))),
                React.createElement("div", { className: "outerButton" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the call history application using ListView. Click the checklist to filter the data in contacts list.")),
        React.createElement("div", { id: "description", className: "descriptionLayout" },
            React.createElement("p", null,
                "This sample filters out the data from ListView based on the data selected from the checklist. Here, ListView utilizes the",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#template' }, "template")),
                " and",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#showicon' }, "showIcon")),
                " properties to repesent the call history application. The Tab component is used in this sample for navigation purposes."))));
};
exports.default = CallHistory;
