"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./api.css");
var sample_base_1 = require("../common/sample-base");
function Api() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var toastInputTitleEle;
    var toastInputContentEle;
    var showDurationEle;
    var hideDurationEle;
    var timeOutEle;
    var toastInputTitleRef = function (element) {
        toastInputTitleEle = element;
    };
    var toastInputContentRef = function (element) {
        toastInputContentEle = element;
    };
    var showDurationRef = function (element) {
        showDurationEle = element;
    };
    var hideDurationRef = function (element) {
        hideDurationEle = element;
    };
    var timeOutRef = function (element) {
        timeOutEle = element;
    };
    var toastObj;
    var dropDownListShowEase;
    var dropDownListHideEase;
    var dropDownListProgressDirection;
    var dropDownListShow;
    var dropDownListHide;
    var toastBtnShow;
    var toastBtnHide;
    var position = { X: 'Right', Y: 'Bottom' };
    var prevDuplicates = false;
    var showData = [
        { Id: 'ease', Text: 'Ease' },
        { Id: 'linear', Text: 'Linear' }
    ];
    var directionData = [
        { Id: 'Rtl', Text: 'Right to Left' },
        { Id: 'Ltr', Text: 'Left to Right' }
    ];
    var animationData = [
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];
    var animationData1 = [
        { Id: 'SlideBottomOut', Effect: 'Slide Bottom Out' },
        { Id: 'FadeIn', Effect: 'Fade In' },
        { Id: 'FadeZoomIn', Effect: 'Fade Zoom In' },
        { Id: 'FadeZoomOut', Effect: 'Fade Zoom Out' },
        { Id: 'FlipLeftDownIn', Effect: 'Flip Left Down In' },
        { Id: 'FlipLeftDownOut', Effect: 'Flip Left Down Out' },
        { Id: 'FlipLeftUpIn', Effect: 'Flip Left Up In' },
        { Id: 'FlipLeftUpOut', Effect: 'Flip Left Up Out' },
        { Id: 'FlipRightDownIn', Effect: 'Flip Right Down In' },
        { Id: 'FlipRightDownOut', Effect: 'Flip Right Down Out' },
        { Id: 'FlipRightUpIn', Effect: 'Flip Right Up In' },
        { Id: 'FlipRightUpOut', Effect: 'Flip Right Up Out' },
        { Id: 'SlideBottomIn', Effect: 'Slide Bottom In' },
        { Id: 'SlideLeftIn', Effect: 'Slide Left In' },
        { Id: 'SlideLeftOut', Effect: 'Slide Left Out' },
        { Id: 'SlideRightIn', Effect: 'Slide Right In' },
        { Id: 'SlideRightOut', Effect: 'Slide Right Out' },
        { Id: 'SlideTopIn', Effect: 'Slide Top In' },
        { Id: 'SlideTopOut', Effect: 'Slide Top Out' },
        { Id: 'ZoomIn', Effect: 'Zoom In' },
        { Id: 'ZoomOut', Effect: 'Zoom Out' }
    ];
    var showFields = { text: 'Text', value: 'Id' };
    var directionFields = { text: 'Text', value: 'Id' };
    var animationFields = { text: 'Effect', value: 'Id' };
    var easeValue = 'ease';
    var directionValue = 'Rtl';
    var animationValue = 'SlideBottomIn';
    var animationHideValue = 'SlideBottomOut';
    function closeOnChange(e) {
        e.checked ? toastObj.showCloseButton = true : toastObj.showCloseButton = false;
    }
    function OnProgressChange(e) {
        e.checked ? toastObj.showProgressBar = true : toastObj.showProgressBar = false;
    }
    function closeNewestOnChange(e) {
        e.checked ? toastObj.newestOnTop = true : toastObj.newestOnTop = false;
    }
    function OnPrevDubChange(e) {
        prevDuplicates = e.checked;
    }
    function OnactionBtnChange(e) {
        if (e.checked) {
            toastObj.buttons = [{ model: { content: '<div class="e-toast-btn"> Click Here </div>' }, click: onActionBtnClick }];
        }
        else {
            toastObj.buttons = [];
        }
    }
    function onActionBtnClick(e) {
        alert('Action button is clicked');
    }
    function showToast() {
        var title = toastInputTitleEle.value;
        var content = toastInputContentEle.value;
        if (title === '' && content === '') {
            content = 'You have created a Toast message';
        }
        var showDuration = parseInt(showDurationEle.value, 10);
        var hideDuration = parseInt(hideDurationEle.value, 10);
        var timeOut = parseInt(timeOutEle.value, 10);
        toastObj.show({
            title: title, content: content, timeOut: timeOut,
            animation: {
                show: { duration: showDuration },
                hide: { duration: hideDuration }
            }
        });
    }
    function onShowEase() {
        toastObj.animation.show.easing = dropDownListShowEase.value.toString();
    }
    function onProgressDirection() {
        toastObj.progressDirection = dropDownListProgressDirection.value.toString();
    }
    function showChange() {
        toastObj.animation.show.effect = dropDownListShow.value;
    }
    function hideChange() {
        toastObj.animation.hide.effect = dropDownListHide.value;
    }
    function onHideEase() {
        toastObj.animation.hide.easing = dropDownListHideEase.value.toString();
    }
    function showBtnClick() {
        showToast();
    }
    function hideBtnClick() {
        toastObj.hide('All');
    }
    function onbeforeOpen(e) {
        toastBtnHide.element.style.display = 'inline-block';
        if (prevDuplicates) {
            e.cancel = preventDuplicate(e);
        }
    }
    function onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            toastBtnHide.element.style.display = 'none';
        }
    }
    function preventDuplicate(e) {
        var toastEle = e.element;
        var toasts = e.toastObj.element.children;
        for (var i = 0; i < toasts.length; i++) {
            var toastTitle = toasts[i].querySelector('.e-toast-title');
            var toastMessage = toasts[i].querySelector('.e-toast-message');
            if (toastTitle && toastTitle.isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                return true;
            }
            if (!toastTitle && toastMessage && toastMessage.isEqualNode(toastEle.querySelector('.e-toast-message'))) {
                return true;
            }
        }
        return false;
    }
    function rendereComplete() {
        document.addEventListener('click', function (e) {
            if (!(0, ej2_base_1.isNullOrUndefined)(toastObj) && e.target !== toastBtnShow.element) {
                toastObj.hide('All');
            }
        }.bind(this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-12 control-section toast-api-section" },
            React.createElement("div", { className: "e-sample-resize-container" },
                React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toast) { toastObj = toast; }, id: 'toastApi', position: position, close: onclose.bind(this), beforeOpen: onbeforeOpen.bind(this), newestOnTop: true }),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-6 padding" },
                        React.createElement("div", { className: "input-form" },
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("input", { id: "toast_input_title", ref: toastInputTitleRef, "aria-label": "title", className: 'e-input', required: true }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text" }, "Enter the title"))),
                        React.createElement("div", { className: "input-form" },
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("textarea", { className: 'e-input', ref: toastInputContentRef, "aria-label": "content", id: 'toast_input_content', rows: 3, required: true }),
                                React.createElement("label", { className: "e-float-text" }, "Enter the content"))),
                        React.createElement("div", { className: "group-form e-group" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'closeButton', label: 'Show Close Button', change: closeOnChange.bind(this) })),
                        React.createElement("div", { className: "group-form e-group" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'progressBar', label: 'Show Progress Bar', change: OnProgressChange.bind(this) })),
                        React.createElement("div", { className: "group-form e-group" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'newestOnTop', checked: true, label: 'Newest On Top', change: closeNewestOnChange.bind(this) })),
                        React.createElement("div", { className: "group-form e-group" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'prevDuplicates', label: 'Prevent Duplicates', change: OnPrevDubChange.bind(this) })),
                        React.createElement("div", { className: "group-form e-group" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'actionButtons', label: 'Action Buttons', change: OnactionBtnChange.bind(this) })),
                        React.createElement("div", { className: "input-form" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { dropDownListProgressDirection = dropdownlist; }, id: "ProgressDirection", floatLabelType: "Auto", dataSource: directionData, fields: directionFields, placeholder: "ProgressDirection", change: onProgressDirection.bind(this), value: directionValue })),
                        React.createElement("div", { className: "input-form" },
                            React.createElement("div", { className: "e-float-input e-input-group" },
                                React.createElement("input", { className: "e-input", id: "timeOut", ref: timeOutRef, name: "Digits", defaultValue: "5000", required: true }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text" }, "TimeOut")))),
                    React.createElement("div", { className: "col-lg-6 padding" },
                        React.createElement("div", { className: "input-form" },
                            React.createElement("h1", { className: "h4" }, " Show Animation"),
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("input", { className: "e-input", id: "showDuration", ref: showDurationRef, defaultValue: "400", required: true }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text" }, "Duration"))),
                        React.createElement("div", { className: "input-form" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { dropDownListShowEase = dropdownlist; }, id: "ShowEasing", dataSource: showData, fields: showFields, placeholder: "Select an Easing", change: onShowEase.bind(this), value: easeValue })),
                        React.createElement("div", { className: "input-form" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { dropDownListShow = dropdownlist; }, id: "ShowAnimation", dataSource: animationData, fields: animationFields, placeholder: "Select an Animation", change: showChange.bind(this), value: animationValue })),
                        React.createElement("div", { className: "input-form e-group" },
                            React.createElement("h2", { className: "h4" }, " Hide Animation"),
                            React.createElement("div", { className: "e-float-input" },
                                React.createElement("input", { className: "e-input", id: "hideDuration", ref: hideDurationRef, defaultValue: "400", required: true }),
                                React.createElement("span", { className: "e-float-line" }),
                                React.createElement("label", { className: "e-float-text" }, "Duration"))),
                        React.createElement("div", { className: "input-form" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { dropDownListHideEase = dropdownlist; }, id: "HideEasing", dataSource: showData, fields: showFields, placeholder: "Select an Easing", change: onHideEase.bind(this), value: easeValue })),
                        React.createElement("div", { className: "input-form" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdownlist) { dropDownListHide = dropdownlist; }, id: "HideAnimation", dataSource: animationData1, fields: animationFields, placeholder: "Select an Animation", change: hideChange.bind(this), value: animationHideValue })))),
                React.createElement("div", { className: "row center" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnShow', ref: function (btn) { toastBtnShow = btn; }, className: 'e-btn e-primary', onClick: showBtnClick.bind(this), style: { marginRight: '15px' } }, "Show Toasts"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toastBtnHide', ref: function (btn) { toastBtnHide = btn; }, className: 'e-btn e-primary', onClick: hideBtnClick.bind(this), style: { display: 'none' } }, " Hide All")))),
        React.createElement("br", null),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates all the API functionalities available in ",
                React.createElement("code", null, "Toast."))),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, with help of text inputs toast header ",
                React.createElement("code", null, "title"),
                " and ",
                React.createElement("code", null, "content"),
                " text can be provided."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Action Buttons"),
                    " \u2013 Provide support to add a button inside toast to interact with it."),
                React.createElement("li", null,
                    React.createElement("code", null, "Prevent Duplicates"),
                    " \u2013 Disable the user to create same toast message multiple times."),
                React.createElement("li", null,
                    React.createElement("code", null, "TimeOut"),
                    " \u2013 Allows to set time in millisecond to close toast."),
                React.createElement("li", null,
                    React.createElement("code", null, "Progress Bar"),
                    " \u2013 Visualizes the time out of toast as an indicator."),
                React.createElement("li", null,
                    React.createElement("code", null, "Animation"),
                    " \u2013 Enables to define the toast show and hide animation."),
                React.createElement("li", null,
                    React.createElement("code", null, "Close button"),
                    " \u2013 Show close button to hide toast irrespective of time out.")),
            React.createElement("p", null,
                "More information about Toast can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/toast/getting-started/" }, "documentation section"),
                "."))));
}
exports.default = Api;
