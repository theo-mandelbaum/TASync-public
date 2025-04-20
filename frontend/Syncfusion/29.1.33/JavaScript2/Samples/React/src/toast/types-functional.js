"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./types.css");
function Types() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toastObj;
    var infoBtn;
    var warnBtn;
    var successBtn;
    var errorBtn;
    var hideTosat;
    var position = { X: 'Right' };
    var toasts = [
        { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
        { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
        { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
        { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
    ];
    function create() {
        setTimeout(function () {
            toastObj.show(toasts[3]);
        }.bind(this), 200);
    }
    function infoClick() {
        toastObj.show(toasts[3]);
    }
    function warningClick() {
        toastObj.show(toasts[0]);
    }
    function successClick() {
        toastObj.show(toasts[1]);
    }
    function errorClick() {
        toastObj.show(toasts[2]);
    }
    function hideClick() {
        toastObj.hide('All');
    }
    function onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            hideTosat.element.style.display = 'none';
        }
    }
    function onbeforeOpen() {
        hideTosat.element.style.display = 'inline-block';
    }
    document.addEventListener('click', function (e) {
        if (!(0, ej2_base_1.isNullOrUndefined)(toastObj) && e.target !== infoBtn.element && e.target !== warnBtn.element && e.target !== successBtn.element && e.target !== errorBtn.element) {
            toastObj.hide('All');
        }
    }.bind(this));
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section toast-type-section' },
            React.createElement("div", { className: "e-sample-resize-container" },
                React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { toastObj = toast; }, id: 'toast_type', position: position, created: create.bind(this), close: onclose.bind(this), beforeOpen: onbeforeOpen.bind(this) }),
                React.createElement("div", { id: 'toast_types' },
                    React.createElement("div", null,
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { infoBtn = scope; }, cssClass: 'e-btn e-control e-info', id: 'info_Toast', onClick: infoClick.bind(this) }, "Info Message"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { warnBtn = scope; }, cssClass: 'e-btn e-control e-warning', id: 'warning_Toast', onClick: warningClick.bind(this) }, "Warning Message"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { successBtn = scope; }, cssClass: 'e-btn e-contro e-success', id: 'success_Toast', onClick: successClick.bind(this) }, "Success Message"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { errorBtn = scope; }, cssClass: 'e-btn e-control e-danger', id: 'error_Toast', onClick: errorClick.bind(this) }, "Danger Message")),
                    React.createElement("div", { style: { paddingTop: '15px' } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-btn e-control', id: 'hideTosat', ref: function (btn) { hideTosat = btn; }, onClick: hideClick.bind(this) }, "Hide All"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates 4-predefined toast colors for various scenarios which can be using CSS class.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The toast supports the following 4 different essential colors for various situations. Here we have achieved success, danger, warning, info notifications with corresponding icon and text message. All the classes should be added with .e-toast class."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Information -  The ",
                    React.createElement("code", null, "e-toast-info"),
                    " class applies the color and background for showing toast information."),
                React.createElement("li", null,
                    "Success -  The ",
                    React.createElement("code", null, "e-toast-success"),
                    " class applies the color and background for notifying success action."),
                React.createElement("li", null,
                    "Warning -  The ",
                    React.createElement("code", null, "e-toast-warning"),
                    " class applies the color and background for showing warning message."),
                React.createElement("li", null,
                    "Danger -  The ",
                    React.createElement("code", null, "e-toast-danger"),
                    " class applies the color and background for showing error/failure toast.")),
            React.createElement("p", null,
                "More information about Toast can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Types;
