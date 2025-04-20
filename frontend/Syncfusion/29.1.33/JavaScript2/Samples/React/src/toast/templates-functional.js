"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_base_2 = require("@syncfusion/ej2-base");
require("./templates.css");
function Templates() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var snoozeEle;
    var dismissEle;
    var snoozeRef = function (element) {
        snoozeEle = element;
    };
    var dismissRef = function (element) {
        dismissEle = element;
    };
    var toastObj;
    var toastObjEmail;
    var toastMailRemainder;
    var AlarmTurnOn;
    var cusPosition = { X: 'Right' };
    var tempPosition = !ej2_base_2.Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
    var tempTarget = !ej2_base_2.Browser.isDevice ? document.body : '#toast_template_target';
    var template = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" alt="img" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
    var toastData = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'src/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: 'src/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'src/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'src/toast/resource/chase.png' }, },
        {
            from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'src/toast/resource/michael.png' },
        }
    ];
    var cusAnimation = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    };
    var toastFlag = 0;
    var snoozeFlag = false;
    var waterMark = 'Select a snooze time';
    var height = '200px';
    var value = '2min';
    var snoozeData = [
        { value: '2min', text: '2 minutes' },
        { value: '5min', text: '5 minutes' },
        { value: '10min', text: '10 minutes' }
    ];
    var listObj;
    function remainderClick() {
        var obj = cardTemplateFn(toastData[toastFlag])[0];
        toastObjEmail.show({ template: obj.outerHTML });
        ++toastFlag;
        if (toastFlag === (toastData.length)) {
            toastFlag = 0;
        }
    }
    function alarmClick() {
        toastObj.show();
    }
    function onOpenToast() {
        snoozeEle.addEventListener('click', function () {
            snoozeFlag = true;
            toastObj.hide();
        }.bind(this));
        dismissEle.addEventListener('click', function () {
            toastObj.hide();
        }.bind(this));
        document.addEventListener('click', function (e) {
            var closestEle = (0, ej2_base_2.closest)(e.target, '.e-toast-container');
            if (!(0, ej2_base_1.isNullOrUndefined)(toastObj) && e.target !== AlarmTurnOn.element && e.target !== toastMailRemainder.element && closestEle !== toastObj.element && closestEle !== toastObjEmail.element) {
                toastObj.hide('All');
                toastObjEmail.hide('All');
            }
        }.bind(this));
    }
    function onToastClose() {
        AlarmTurnOn.element.style.display = 'inline-block';
        if (snoozeFlag) {
            toastObj.show({ timeOut: (parseInt(listObj.value.toString(), 10) * 60000) });
            snoozeFlag = false;
        }
    }
    function onToastBeforeOpen(e) {
        AlarmTurnOn.element.style.display = 'none';
    }
    function listChange(e) {
        snoozeFlag = true;
        toastObj.hide();
    }
    function cardTemplateFn(data) {
        return (0, ej2_base_2.compile)(template.trim())(data);
    }
    function toastObjCreate() {
        setTimeout(function () {
            toastObj.show();
        }.bind(this), 200);
    }
    function toastObjEmailCreate() {
        setTimeout(function () {
            var emailObj = cardTemplateFn(toastData[toastFlag])[0];
            toastObjEmail.show({ template: emailObj.outerHTML });
            ++toastFlag;
        }.bind(this), 200);
    }
    function templatedata() {
        return (React.createElement("div", { id: "template_toast_ele" },
            React.createElement("div", { id: 'template_toast' },
                React.createElement("div", { className: "horizontal-align" },
                    React.createElement("div", { className: 'e-icons toast-icons e-alarm' }),
                    React.createElement("div", { className: 'toast-content' },
                        React.createElement("div", { className: 'toast-title' }, "Weekend Alarm"),
                        React.createElement("div", { className: 'toast-message' }, " With traffic, its likely to take 45 minutes to get to jenny's 24th Birthday Bash at Hillside Bar, 454 E. Olive Way by 10:00PM "))),
                React.createElement("img", { src: "./src/toast/resource/map.jpg", alt: "map", width: "100%", height: "70%" }),
                React.createElement("div", { className: "snooze" }, " Snooze for "),
                React.createElement("div", { id: 'snoozedropDown' },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "snoozeDD", dataSource: snoozeData, ref: function (dropdownlist) { listObj = dropdownlist; }, change: listChange.bind(this), placeholder: waterMark, value: value, popupHeight: height })),
                React.createElement("div", { className: "snoozeBtn" },
                    React.createElement("button", { id: "snooze", ref: snoozeRef, className: 'e-btn e-flat e-primary', style: { marginRight: '15px' } }, " Snooze "),
                    React.createElement("button", { id: "dismiss", ref: dismissRef, className: 'e-btn e-flat e-primary' }, " Dismiss ")))));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section toast-template-section' },
            React.createElement("div", { className: "e-sample-resize-container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { id: "reminder" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", ref: function (btn) { toastMailRemainder = btn; }, id: 'toast_mail_remainder', onClick: remainderClick.bind(this) }, " Mail Reminder"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn", ref: function (btn) { AlarmTurnOn = btn; }, id: 'Alarm_turn_on', onClick: alarmClick.bind(this) }, "Turn on Alarm"))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { toastObjEmail = toast; }, id: 'toast_custom', position: cusPosition, animation: cusAnimation, newestOnTop: true, showCloseButton: true, timeOut: 0, created: toastObjEmailCreate.bind(this) })),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (scope) { toastObj = scope; }, id: 'toast_template', position: tempPosition, target: tempTarget, template: templatedata.bind(this), extendedTimeout: 0, timeOut: 120000, open: onOpenToast.bind(this), close: onToastClose.bind(this), beforeOpen: onToastBeforeOpen.bind(this), created: toastObjCreate.bind(this) }),
                        React.createElement("div", { id: "toast_template_target" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Template rendering of the Toast. Static HTML toast to display an alarm notification which can be snoozed or dismissed and Dynamic template rendered using template engine to display mail remainders.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample illustrates the way to display the template content on the toast. With the usage of Template, the user can format and structure the HTML content to be displayed on the toast as per their application needs."),
            React.createElement("ul", null,
                React.createElement("li", null, "Alarm toast is integrated with button and drop-down list that allows to set timeOut for toast and close it."),
                React.createElement("li", null, "Dynamic toast opened based on the data source given to add mail reminder notifications and it can be hidden using the close button available.")),
            React.createElement("p", null,
                "More information about Toast can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Templates;
