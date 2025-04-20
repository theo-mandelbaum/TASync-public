"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./smart-scheduler.css");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
function SmartScheduler() {
    var _this = this;
    var scheduleObj;
    var dialog;
    var tabObj;
    var toast;
    var cancelButton;
    var saveButton;
    (0, react_1.useEffect)(function () {
        (0, ej2_react_popups_1.createSpinner)({
            target: document.getElementById('editor_dialog')
        });
        cancelButton.element.onclick = function () {
            dialog.hide();
        };
        saveButton.element.onclick = formSubmit;
    }, []);
    var cardContent1 = "Title: Discussion on Ticket 429519" +
        "Hi John,\n\n" +
        "We have scheduled the meeting for tomorrow (24th Jan) at 12 PM IST at Mathura Towers and this meeting is scheduled to discuss the issue related to the ticket 429519 only. " +
        "For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets.\n\n" +
        "Note: Screen sharing is to see the issue at your end and debug directly, if needed. We request you to contact your IT team and get prior approval/disable firewall settings to share the controls. This will help to minimize the resolution time.\n\n" +
        "Regards,\n\n" +
        "Sabitha";
    var cardContent2 = "Title: Meeting to discuss on Ticket 603027" +
        "Hi Liji,\n\n" +
        "We have scheduled the meeting for today at 3 PM IST in Chennai and this meeting is scheduled to discuss the issue related to the ticket 595353 and 603027 only. " +
        "For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets.\n\n" +
        "Regards,\n\n" +
        "Ram";
    var cardContent3 = "Title: Exciting Updates and Demo Invitation from Syncfusion" +
        "You: Hi Alex, I hope you're doing well! I’m reaching out from Syncfusion Software Pvt Ltd. " +
        "We've recently made some exciting updates to our UI components and I'd love to share them with you.\n" +
        "Recipient: Hi Andrew, I'm doing well, thanks! What kind of updates have you made?\n" +
        "You: We've enhanced key components such as the Scheduler, Carousel, Tab, Toolbar, Accordion, and Appbar. " +
        "Additionally, we've improved accessibility to meet WCAG 2.2 standards and enhanced security with XSS prevention. " +
        "These updates aim to provide a more robust and secure experience for our users.\n" +
        "Recipient: That sounds fantastic! I’d be interested in seeing these updates in action.\n" +
        "You: Wonderful! I’d love to schedule a demo to showcase these new features. Are you available for a session on Wednesday, " +
        "August 7th at 11 AM, or Friday, August 9th at 2 PM? The demo will be held at our Morrisville office.\n" +
        "Recipient: Friday, August 9th at 2 PM works for me.\n" +
        "You: Perfect! I’ll send a calendar invite for Friday, August 9th at 2 PM at our Morrisville office.\n" +
        "Recipient: Great, see you then!\n" +
        "You: See you on Friday! Have a great day.";
    var event;
    var events = [];
    var onEventRendered = function (args) {
        if (event && event.Id === args.data.Id) {
            args.element.classList.add('e-appointment-border');
        }
    };
    function showDialog() {
        dialog.show();
    }
    function handleButtonClick(content) {
        navigator.clipboard.writeText(content).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
        showDialog();
    }
    function meetingContents() {
        return (React.createElement("div", { id: "meeting_contents" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "row card-item" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6", style: { marginBottom: "15px", marginTop: "15px" } },
                        React.createElement("div", { tabIndex: 0, className: "e-card", id: "basic" },
                            React.createElement("div", { className: "e-card-header" },
                                React.createElement("div", { className: "e-card-header-caption" },
                                    React.createElement("div", { className: "e-card-header-title" }, "Discussion on Ticket 429519")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "first-card-button", content: 'Schedule Appointment', iconCss: 'e-icons e-timeline-work-week', onClick: function () { return handleButtonClick(cardContent1); } })),
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("div", null,
                                    React.createElement("span", null, "Hi John,"),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null, "We have scheduled the meeting for tomorrow (24th Jan) at 12 PM IST at Mathura Towers and this meeting is scheduled to discuss the issue related to the ticket 429519 only. "),
                                    React.createElement("span", null, "For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets."),
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("p", null, "\"Note: Screen sharing is to see the issue at your end and debug directly, if needed. We request you to contact your IT team and get prior approval/disable firewall settings to share the controls. This will help to minimize the resolution time.\""),
                                    React.createElement("br", null),
                                    React.createElement("span", null, "Regards,"),
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("span", null, "Sabitha")))))),
                React.createElement("div", { className: "row card-item" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6", style: { marginBottom: "15px", marginTop: "15px" } },
                        React.createElement("div", { tabIndex: 0, className: "e-card", id: "basic" },
                            React.createElement("div", { className: "e-card-header" },
                                React.createElement("div", { className: "e-card-header-caption" },
                                    React.createElement("div", { className: "e-card-header-title" }, "Exciting Updates and Demo Invitation from Syncfusion")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "second-card-button", content: 'Schedule Appointment', iconCss: 'e-icons e-timeline-work-week', onClick: function () { return handleButtonClick(cardContent2); } })),
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("div", null,
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "You:"),
                                        " Hi Alex, I hope you're doing well! I\u2019m reaching out from Syncfusion Software Pvt Ltd. We've recently made some exciting updates to our UI components and I'd love to share them with you."),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "Recipient:"),
                                        " Hi Andrew, I'm doing well, thanks! What kind of updates have you made?"),
                                    React.createElement("br", null),
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "You:"),
                                        " We've enhanced key components such as the Scheduler, Carousel, Tab, Toolbar, Accordion, and Appbar. Additionally, we've improved accessibility to meet WCAG 2.2 standards and enhanced security with XSS prevention. These updates aim to provide a more robust and secure experience for our users."),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "Recipient:"),
                                        " That sounds fantastic! I\u2019d be interested in seeing these updates in action."),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "You:"),
                                        " Wonderful! I\u2019d love to schedule a demo to showcase these new features. Are you available for a session on Wednesday, August 7th at 11 AM, or Friday, August 9th at 2 PM? The demo will be held at our Morrisville office."),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "Recipient:"),
                                        " Friday, August 9th at 2 PM works for me."),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "You:"),
                                        " Perfect! I\u2019ll send a calendar invite for Friday, August 9th at 2 PM at our Morrisville office."),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "Recipient:"),
                                        " Great, see you then!"),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null,
                                        React.createElement("strong", null, "You:"),
                                        " See you on Friday! Have a great day.")))))),
                React.createElement("div", { className: "row card-item" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6", style: { marginBottom: "15px", marginTop: "15px" } },
                        React.createElement("div", { tabIndex: 0, className: "e-card", id: "basic" },
                            React.createElement("div", { className: "e-card-header" },
                                React.createElement("div", { className: "e-card-header-caption" },
                                    React.createElement("div", { className: "e-card-header-title" }, "Meeting to discuss on Ticket 603027")),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "third-card-button", content: 'Schedule Appointment', iconCss: 'e-icons e-timeline-work-week', onClick: function () { return handleButtonClick(cardContent3); } })),
                            React.createElement("div", { className: "e-card-content" },
                                React.createElement("div", null,
                                    React.createElement("span", null, "Hi Liji,"),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null, "We have scheduled the meeting for today at 3 PM IST in Chennai and this meeting is scheduled to discuss the issue related to the ticket 603027 only. "),
                                    React.createElement("span", null, "For any other issues, please create a new ticket or update the respective tickets and our technical team will follow up with the details in those tickets."),
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("span", null, "Regards,"),
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("span", null, "Ram")))))))));
    }
    function schedule() {
        return (React.createElement("div", { id: "scheduler" },
            React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: function (schedule) { return scheduleObj = schedule; }, height: '750px', selectedDate: new Date(), currentView: 'Week', eventSettings: {
                    dataSource: events
                }, eventRendered: onEventRendered },
                React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] }))));
    }
    var tabSelected = function (args) {
        if (args.selectedIndex === 1) {
            if (scheduleObj) {
                scheduleObj.refresh();
            }
            if (event && event.Subject) {
                toast.content = "".concat(event.Subject, " has been scheduled at ").concat(event.StartTime.toLocaleString());
                toast.dataBind();
                toast.show();
            }
        }
    };
    var created = function () {
        document.getElementById('dlgContent').style.visibility = 'visible';
        document.getElementById('dlgHeader').style.visibility = 'visible';
    };
    var closeDialog = function () {
        document.getElementById('subject').value = '';
        document.getElementById('location').value = '';
        document.getElementById('startTime').value = (function () {
            var d = new Date();
            d.setHours(12, 0, 0, 0);
            var date = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
            var time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            return "".concat(date, " ").concat(time);
        })();
        document.getElementById('endTime').value = (function () {
            var d = new Date();
            d.setHours(14, 0, 0, 0);
            var date = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
            var time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            return "".concat(date, " ").concat(time);
        })();
        document.getElementById('description').value = '';
        document.getElementById('saveButton').disabled = true;
    };
    var openDialog = function () {
        (0, ej2_react_popups_1.showSpinner)(document.getElementById('editor_dialog'));
        document.querySelector('.smart-schedule-button').click();
        var intervalId = setInterval(function () {
            var subject = document.getElementById('subject').value;
            if (subject !== '') {
                clearInterval(intervalId);
                (0, ej2_react_popups_1.hideSpinner)(document.getElementById('editor_dialog'));
                document.getElementById('saveButton').disabled = false;
            }
        }, 1000);
    };
    var AzureAIRequest = function (settings) { return __awaiter(_this, void 0, void 0, function () {
        var output, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    output = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, window.getAzureChatAIRequest(settings)];
                case 2:
                    response = _a.sent();
                    output = response;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, output];
            }
        });
    }); };
    function switchTab() {
        tabObj.select(1);
    }
    var formSubmit = function (e) {
        e.preventDefault();
        var subject = document.getElementById('subject').value;
        var location = document.getElementById('location').value;
        var startTime = document.getElementById('startTime').value;
        var endTime = document.getElementById('endTime').value;
        var description = document.getElementById('description').value;
        var newEvent = [];
        event = {
            Id: events.length + 1,
            Subject: subject,
            Location: location,
            StartTime: new Date(startTime),
            EndTime: new Date(endTime),
            Description: description
        };
        newEvent = __spreadArray([], events, true);
        newEvent.push(event);
        events = newEvent;
        scheduleObj.selectedDate = new Date(startTime);
        scheduleObj.eventSettings.dataSource = events;
        scheduleObj.dataBind();
        dialog.hide();
        switchTab();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'container', className: "scheduler-ai-container" },
            React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab", heightAdjustMode: 'Auto', ref: function (tab) { return tabObj = tab; }, selected: tabSelected, animation: { previous: { effect: 'None' }, next: { effect: 'None' } }, created: function () {
                    tabObj.select(1);
                    tabObj.select(0);
                } },
                React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: { 'text': 'Meeting Contents' }, content: meetingContents }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: { 'text': 'Schedule' }, content: schedule })))),
        React.createElement(ej2_react_popups_1.DialogComponent, { id: "editor_dialog", ref: function (dialogObj) { return dialog = dialogObj; }, header: function () {
                return (React.createElement("div", { id: "dlgHeader", style: { visibility: "hidden" }, className: "dialogHeader" },
                    React.createElement("div", null, "Event Scheduler")));
            }, content: document.getElementById("dlgContent"), target: document.getElementById("container"), showCloseIcon: true, isModal: true, visible: false, width: '500px', created: created, close: closeDialog, open: openDialog },
            React.createElement("div", { id: "dlgContent", style: { visibility: "hidden" }, className: "dialogContent" },
                React.createElement("form", { id: "formId", className: "form-horizontal schedule-form" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { className: "e-input", type: "text", id: "subject", name: "Subject", "data-smartpaste-description": "Subject must be the core content of the input" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text", htmlFor: "subject" }, "Subject"))),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { className: "e-input", type: "text", id: "location", name: "Location", "data-smartpaste-description": "Check if there is any location given in the input, if there is any location then add it, if not ignore it" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text", htmlFor: "location" }, "Location"))),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "startTime", name: "StartTime", "data-smartpaste-description": 'Get Start Time from the input, Date must follow the format: MM/dd/yyyy HH:mm', value: (function () { var d = new Date(); d.setHours(12, 0, 0, 0); return d; })(), format: 'MM/dd/yyyy HH:mm' }))),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement(ej2_react_calendars_1.DateTimePickerComponent, { id: "endTime", name: "EndTime", "data-smartpaste-description": "If there is End Time in the input get the End Time, If the End Time is not present in the input, add 1hr to the StartTime and Provide the date,  Date must follow the format: MM/dd/yyyy HH:mm", value: (function () { var d = new Date(); d.setHours(13, 0, 0, 0); return d; })(), format: 'MM/dd/yyyy HH:mm' }))),
                    React.createElement("div", { className: "form-group description" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("textarea", { rows: 4, id: "description", name: "Description", "data-smartpaste-description": "Description must be the summary of the entire input" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text", htmlFor: "description" }, "Description"))),
                    React.createElement("div", { className: "row button-group" },
                        React.createElement("div", null,
                            React.createElement(ej2_react_buttons_1.SmartPasteButtonComponent, { type: "button", id: "smart-paste", className: "smart-schedule-button form-button", style: { visibility: "hidden" }, aiAssistHandler: AzureAIRequest }, "Smart Paste")),
                        React.createElement("div", { style: { display: "inline-block" } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "saveButton", type: 'button', ref: function (button) { return saveButton = button; }, className: "samplebtn", isPrimary: true, disabled: true, style: { marginRight: "10px" }, "data-ripple": true }, "Save")),
                        React.createElement("div", { style: { float: "right" } },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (button) { return cancelButton = button; }, id: "cancelButton", className: "samplebtn", type: "reset", "data-ripple": "true" }, "cancel")))))),
        React.createElement(ej2_react_notifications_1.ToastComponent, { id: "ToastElement", ref: function (toastObj) { return toast = toastObj; }, title: 'Events Added', content: '', position: { X: 'Right', Y: 'Top' }, cssClass: 'e-toast-success' })));
}
exports.default = SmartScheduler;
