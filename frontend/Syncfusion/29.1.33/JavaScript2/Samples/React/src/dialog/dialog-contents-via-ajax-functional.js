"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./dialog-contents-via-ajax.css");
var AjaxContent = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dialogInstance = (0, react_1.useRef)(null);
    var buttons;
    var animationSettings;
    var buttonEle;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status = _b[0], setStatus = _b[1];
    var buttonRef = function (element) {
        buttonEle = element;
    };
    animationSettings = { effect: 'None' };
    var dlgButtonClick = function () {
        if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
            var fetchApi = new ej2_base_1.Fetch('./src/dialog/blog.html', 'GET');
            fetchApi.send().then();
            fetchApi.onSuccess = function (data) {
                dialogInstance.current.target = document.getElementById('target');
                dialogInstance.current.content = data;
            };
            dialogInstance.current.buttons = [
                {
                    click: dlgButtonClick,
                    buttonModel: { content: "Less Details", isPrimary: true }
                }
            ];
        }
        else {
            dialogInstance.current.content = innerContent;
            dialogInstance.current.buttons = [
                {
                    click: dlgButtonClick,
                    buttonModel: { content: "More Details", isPrimary: true }
                }
            ];
        }
    };
    buttons = [
        {
            click: dlgButtonClick,
            buttonModel: {
                content: 'More Details',
                isPrimary: true,
            },
        },
    ];
    var buttonClick = function () {
        setStatus(true);
    };
    var dialogClose = function () {
        setStatus(false);
        setDisplay('inline-block');
    };
    var dialogOpen = function () {
        setStatus(true);
        setDisplay('none');
    };
    var innerContent = "On October 17, Microsoft will release its Fall Creators Update for the Windows\n    10 platform. Much like its previous counterpart, the Spring Creators Update, the release is set to deliver more \n    features to Windows 10 for both developers and users, with particular emphasis this time around on app modernization,\n    mixed reality, and game development and software updates. App modernization is the term Microsoft used in its press \n    event to encompass the features that will affect most Windows 10 users and developers.";
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "target", className: "control-section ajaxcontent col-lg-12" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", ref: buttonRef, style: { display: display }, onClick: buttonClick, id: "dialogBtn" }, "Open"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", ref: dialogInstance, visible: status, header: '<img class="img1" src="src/dialog/images/2.png" alt="Microsoft roadmap">' + 'What’s Coming from Microsoft this Fall', showCloseIcon: true, animationSettings: animationSettings, width: '500px', target: '#target', close: dialogClose, open: dialogOpen, content: innerContent, buttons: buttons })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates that the content of dialog can be loaded from external HTML file. Click \"more details\" on dialog to load the content dynamically from external HTML file. Click \u201Copen\u201D to show the dialog again, if it is closed.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The user can load dialog's content dynamically from external source like external file using Fetch library. The Fetch library can make the request and load dialog's content using its success event."))));
};
exports.default = AjaxContent;
