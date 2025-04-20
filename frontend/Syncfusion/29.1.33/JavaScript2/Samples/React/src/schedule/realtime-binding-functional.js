"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var signalr_1 = require("@microsoft/signalr");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var dataSource = require("./datasource.json");
/**
 * Schedule realtime binding sample
 */
var RealTimeBinding = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var connection;
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var isHubConnected = false;
    var _a = (0, react_1.useState)({ dataSource: data }), eventSettings = _a[0], setEventSettings = _a[1];
    var _b = (0, react_1.useState)("Week"), currentView = _b[0], setCurrentView = _b[1];
    var onCreated = function () {
        var url = 'https://ej2.syncfusion.com/aspnetcore/schedulehub/';
        connection = new signalr_1.HubConnectionBuilder().withUrl(url, { withCredentials: false, skipNegotiation: true, transport: signalr_1.HttpTransportType.WebSockets }).withAutomaticReconnect().build();
        connection.on('ReceiveData', function (action, data) {
            if (action == 'view') {
                setCurrentView(data);
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                setEventSettings({ dataSource: data });
            }
        });
        connection.start().then(function () { isHubConnected = true; }).catch(function () { isHubConnected = false; });
    };
    var onNavigating = function (args) {
        if (args.action == 'view' && isHubConnected) {
            connection.invoke('SendData', args.action, args.currentView);
        }
    };
    var onActionComplete = function (args) {
        if (isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            connection.invoke('SendData', args.requestType, eventSettings.dataSource);
        }
    };
    var componentWillUnmount = function () {
        if (connection) {
            connection.stop().then(function () { isHubConnected = false; }).catch(function (err) { console.log(err); });
        }
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '550px', selectedDate: new Date(2021, 0, 10), eventSettings: eventSettings, actionComplete: onActionComplete, navigating: onNavigating, created: onCreated, currentView: currentView },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases the way of binding signalR services to Scheduler component. Here, the SignalR is used to bind the data with Scheduler.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this sample, we have used the ",
                React.createElement("code", null, "navigating"),
                " event to invoke the scheduler control\u2019s view change action and ",
                React.createElement("code", null, "actionComplete"),
                "event to update the scheduler data source after performing the CRUD operations. The SignalR will bind the data in order to corresponding event call."))));
};
exports.default = RealTimeBinding;
