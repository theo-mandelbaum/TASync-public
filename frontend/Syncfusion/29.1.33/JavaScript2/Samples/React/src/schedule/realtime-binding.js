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
exports.RealTimeBinding = void 0;
var React = require("react");
var signalr_1 = require("@microsoft/signalr");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var dataSource = require("./datasource.json");
/**
 * Schedule realtime binding sample
 */
var RealTimeBinding = /** @class */ (function (_super) {
    __extends(RealTimeBinding, _super);
    function RealTimeBinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
        _this.isHubConnected = false;
        return _this;
    }
    RealTimeBinding.prototype.onCreated = function () {
        var _this = this;
        var url = 'https://ej2.syncfusion.com/aspnetcore/schedulehub/';
        this.connection = new signalr_1.HubConnectionBuilder().withUrl(url, { withCredentials: false, skipNegotiation: true, transport: signalr_1.HttpTransportType.WebSockets }).withAutomaticReconnect().build();
        this.connection.on('ReceiveData', function (action, data) {
            if (action == 'view') {
                _this.scheduleObj.currentView = data;
            }
            if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
                _this.scheduleObj.eventSettings.dataSource = data;
            }
        });
        this.connection.start().then(function () { _this.isHubConnected = true; }).catch(function () { _this.isHubConnected = false; });
    };
    RealTimeBinding.prototype.onNavigating = function (args) {
        if (args.action == 'view' && this.isHubConnected) {
            this.connection.invoke('SendData', args.action, args.currentView);
        }
    };
    RealTimeBinding.prototype.onActionComplete = function (args) {
        if (this.isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
            this.connection.invoke('SendData', args.requestType, this.scheduleObj.eventSettings.dataSource);
        }
    };
    RealTimeBinding.prototype.componentWillUnmount = function () {
        var _this = this;
        if (this.connection) {
            this.connection.stop().then(function () { _this.isHubConnected = false; }).catch(function (err) { console.log(err); });
        }
    };
    RealTimeBinding.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return _this.scheduleObj = schedule; }, height: '550px', selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: this.data }, created: this.onCreated.bind(this), actionComplete: this.onActionComplete.bind(this), navigating: this.onNavigating.bind(this) },
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
    return RealTimeBinding;
}(sample_base_1.SampleBase));
exports.RealTimeBinding = RealTimeBinding;
