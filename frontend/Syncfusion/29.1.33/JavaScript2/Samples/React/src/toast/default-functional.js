"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./default.css");
function Default() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var toastObj;
    var position = { X: 'Right' };
    var toastBtnShow;
    var toastBtnHide;
    function create() {
        setTimeout(function () {
            toastObj.show({
                title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM',
                icon: 'e-meeting',
            });
        }.bind(this), 200);
    }
    function hideBtnClick() {
        toastObj.hide('All');
    }
    function showBtnClick() {
        toastObj.show();
    }
    function onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            toastBtnHide.element.style.display = 'none';
        }
    }
    function onbeforeOpen() {
        toastBtnHide.element.style.display = 'inline-block';
    }
    function rendereComplete() {
        document.addEventListener('click', function (e) {
            if (!(0, ej2_base_1.isNullOrUndefined)(toastObj) && e.target !== toastBtnShow.element) {
                toastObj.hide('All');
            }
        }.bind(this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section col-lg-12 toast-default-section' },
            React.createElement("div", { className: "e-sample-resize-container" },
                React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { toastObj = toast; }, id: 'toast_default', position: position, created: create.bind(this), close: onclose.bind(this), beforeOpen: onbeforeOpen.bind(this) }),
                React.createElement("div", { id: "toastBtnDefault", style: { margin: 'auto', textAlign: 'center' } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnShow', ref: function (btn) { toastBtnShow = btn; }, className: 'e-btn', onClick: showBtnClick.bind(this) }, "Show Toasts"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnHide', ref: function (btn) { toastBtnHide = btn; }, className: 'e-btn', onClick: hideBtnClick.bind(this) }, "Hide All")))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the basic layout of a ",
                React.createElement("code", null, "Toast"),
                " to show simple notification and hide them.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Toast"),
                " is a notification pop-up used to display on the desired position with required message and header icons."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "The header text is set using ",
                    React.createElement("code", null, "title"),
                    " property."),
                React.createElement("li", null,
                    "Information to be displayed is set using ",
                    React.createElement("code", null, "content"),
                    " property.")),
            React.createElement("p", null,
                "More information about Toast can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Default;
