"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./positions.css");
function Positions() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dropdownEle;
    var customChooseEle;
    var xPosEle;
    var yPosEle;
    var dropdownRef = function (element) {
        dropdownEle = element;
    };
    var customChooseRef = function (element) {
        customChooseEle = element;
    };
    var xPosRef = function (element) {
        xPosEle = element;
    };
    var yPosRef = function (element) {
        yPosEle = element;
    };
    var toastBtnShow;
    var toastBtnHide;
    var toastObj;
    var dropDownObj;
    var dropRadioObj;
    var customRadioObj;
    var radio1;
    var radio2;
    var position = { X: 'Right', Y: 'Bottom' };
    var target = document.body;
    var initialWid = '';
    var customFlag = false;
    var dropData = [
        { Id: 'topleft', Text: 'Top Left' },
        { Id: 'topright', Text: 'Top Right' },
        { Id: 'topcenter', Text: 'Top Center' },
        { Id: 'topfullwidth', Text: 'Top Full Width' },
        { Id: 'bottomleft', Text: 'Bottom Left' },
        { Id: 'bottomright', Text: 'Bottom Right' },
        { Id: 'bottomcenter', Text: 'Bottom Center' },
        { Id: 'bottomfullwidth', Text: 'Bottom Full Width' },
    ];
    var dropFields = { text: 'Text', value: 'Id' };
    var value = 'bottomright';
    function checkboxChange(e) {
        if (radio1.checked) {
            toastObj.hide('All');
            toastObj.target = '#toast_pos_target';
            toastShow(1000);
        }
    }
    function toastShow(timeOutDelay) {
        setTimeout(function () {
            toastObj.show();
        }.bind(this), timeOutDelay);
    }
    function checkboxChange1(e) {
        if (radio2.checked) {
            toastObj.hide('All');
            toastObj.target = document.body;
            toastShow(1000);
        }
    }
    function checkboxChange2(e) {
        if (dropRadioObj.checked) {
            toastObj.hide('All');
            dropdownEle.style.display = 'table-cell';
            customChooseEle.style.display = 'none';
            setToastPosValue(dropDownObj.value.toString());
            customFlag = false;
            toastShow(1000);
        }
    }
    function checkboxChange3(e) {
        if (customRadioObj.checked) {
            toastObj.hide('All');
            dropdownEle.style.display = 'none';
            customChooseEle.style.display = 'table-cell';
            setcustomPosValue();
            customFlag = true;
            toastShow(1000);
        }
    }
    function valueChange(e) {
        toastObj.hide('All');
        setToastPosValue(e.value.toString());
        toastShow(1000);
    }
    function setcustomPosValue() {
        toastObj.width = initialWid;
        toastObj.position.X = parseInt(xPosEle.value, 10);
        toastObj.position.Y = parseInt(yPosEle.value, 10);
    }
    function showBtnClick() {
        if (customFlag) {
            setcustomPosValue();
        }
        toastObj.show();
    }
    function setToastPosValue(value) {
        toastObj.width = initialWid;
        switch (value) {
            case 'topleft':
                toastObj.position.X = 'Left';
                toastObj.position.Y = 'Top';
                break;
            case 'topright':
                toastObj.position.X = 'Right';
                toastObj.position.Y = 'Top';
                break;
            case 'topcenter':
                toastObj.position.X = 'Center';
                toastObj.position.Y = 'Top';
                break;
            case 'topfullwidth':
                toastObj.width = '100%';
                toastObj.position.X = 'Center';
                toastObj.position.Y = 'Top';
                break;
            case 'bottomleft':
                toastObj.position.X = 'Left';
                toastObj.position.Y = 'Bottom';
                break;
            case 'bottomright':
                toastObj.position.X = 'Right';
                toastObj.position.Y = 'Bottom';
                break;
            case 'bottomcenter':
                toastObj.position.X = 'Center';
                toastObj.position.Y = 'Bottom';
                break;
            case 'bottomfullwidth':
                toastObj.width = '100%';
                toastObj.position.X = 'Center';
                toastObj.position.Y = 'Bottom';
                break;
        }
    }
    function hideBtnClick() {
        toastObj.hide('All');
    }
    function created() {
        setTimeout(function () {
            toastShow(200);
            initialWid = toastObj.width.toString();
        }.bind(this), 200);
    }
    function onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            toastBtnHide.element.style.display = 'none';
        }
    }
    function onbeforeOpen() {
        toastBtnHide.element.style.display = 'inline-block';
    }
    document.addEventListener('click', function (e) {
        if (!(0, ej2_base_1.isNullOrUndefined)(toastObj) && e.target !== toastBtnShow.element && toastObj.target === document.body) {
            toastObj.hide('All');
        }
    }.bind(this));
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section toast-pos-section' },
            React.createElement("div", { className: "e-sample-resize-container", id: "toast_pos_target" },
                React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { toastObj = toast; }, id: 'toast_pos', title: 'Matt sent you a friend request', content: 'You have a friend request yet to accept.', icon: 'e-laura', position: position, target: target, created: created.bind(this), close: onclose.bind(this), beforeOpen: onbeforeOpen.bind(this) }),
                React.createElement("div", { id: "toast_pos_property" },
                    React.createElement("table", { style: { 'width': '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { dropRadioObj = scope; }, id: 'dropdownRadio', checked: true, label: 'Position', name: 'toastPos', value: "Position", change: checkboxChange2.bind(this) }))),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { customRadioObj = scope; }, id: 'customRedio', label: 'Custom', name: 'toastPos', value: "Custom", change: checkboxChange3.bind(this) })))))),
                    React.createElement("div", { id: "dropdownChoose" },
                        React.createElement("div", { id: "dropdown", ref: dropdownRef, style: { paddingTop: '25px' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { dropDownObj = dropdownlist; }, id: "position", dataSource: dropData, fields: dropFields, placeholder: "Select a position", change: valueChange.bind(this), value: value, index: 5, popupHeight: '200px' }))),
                    React.createElement("table", { style: { 'width': '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { id: "customChoose", ref: customChooseRef, style: { display: 'none' } },
                                    React.createElement("form", { id: "formId", className: "form-horizontal" },
                                        React.createElement("div", { className: "e-row" },
                                            React.createElement("div", { className: "e-float-input" },
                                                React.createElement("input", { className: "e-input", id: "xPos", ref: xPosRef, name: "Digits", defaultValue: "50", required: true }),
                                                React.createElement("span", { className: "e-float-line" }),
                                                React.createElement("label", { className: "e-float-text" }, "X Position"))),
                                        React.createElement("div", { className: "e-row" },
                                            React.createElement("div", { className: "e-float-input" },
                                                React.createElement("input", { className: "e-input", id: "yPos", ref: yPosRef, name: "Digits", defaultValue: "50", required: true }),
                                                React.createElement("span", { className: "e-float-line" }),
                                                React.createElement("label", { className: "e-float-text" }, "Y Position")))))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { radio1 = scope; }, id: 'radio1', label: 'Target', name: 'toast', value: 'Target', change: checkboxChange.bind(this) }))),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { 'padding': '25px 0 0 0' } },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { ref: function (scope) { radio2 = scope; }, id: 'radio2', checked: true, label: 'Global', name: 'toast', value: 'Global', change: checkboxChange1.bind(this) })))))),
                    React.createElement("div", { id: "toast_btn", style: { paddingTop: '25px' } },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn e-control", id: 'show_Toast', ref: function (btn) { toastBtnShow = btn; }, style: { marginRight: '15px' }, onClick: showBtnClick.bind(this) }, "Show Toasts"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-btn e-control", id: 'hideTosat', ref: function (btn) { toastBtnHide = btn; }, onClick: hideBtnClick.bind(this) }, "Hide All"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the different positioning of the ",
                React.createElement("code", null, "Toast"),
                " based on the target given.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Based on the use case toast can take the body element or any specific element as target. In this sample, with help of custom inputs toast can be positioned based on the target."),
            React.createElement("ul", null,
                React.createElement("li", null, "Toast can be positioned in the 8 pre-defined places."),
                React.createElement("li", null, "Custom option will enable to give X and Y values to align the toast based on the given inputs.")),
            React.createElement("p", null,
                "More information about Toast can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Positions;
