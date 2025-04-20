"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
require("./file-upload-with-forms.css");
var react_1 = require("react");
var Formsupport = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        renderComplete();
    }, []);
    var formValidator;
    var dialogInstance;
    var formObject;
    var animationSettings;
    var autoUpload;
    var allowedExtensions;
    var multiple;
    var inputElement;
    var inputRef;
    var inputRefElement;
    inputRefElement = null;
    inputRef = function (element) {
        inputRefElement = element;
    };
    animationSettings = { effect: 'Zoom' };
    autoUpload = false;
    allowedExtensions = 'image/*';
    multiple = false;
    // Uploader component
    var renderComplete = function () {
        var input = document.querySelectorAll('.e-input-group .e-input,.e-float-input.e-input-group input');
        var inputIcon = document.querySelectorAll('.e-input-group-icon');
        var _loop_1 = function (i) {
            { /* Focus Event binding Floating input label */ }
            input[i].addEventListener('focus', function () {
                getParentNode(input[i]).classList.add('e-input-focus');
            });
            { /* FocusOut Event binding Floating input label */ }
            input[i].addEventListener('blur', function () {
                getParentNode(input[i]).classList.remove('e-input-focus');
            });
        };
        for (var i = 0; i < input.length; i++) {
            _loop_1(i);
        }
        for (var i = 0; i < inputIcon.length; i++) {
            { /* Mousedown Event binding for input icon Ripple Effect */ }
            inputIcon[i].addEventListener('mousedown', function () {
                this.classList.add('e-input-btn-ripple');
            });
            { /* MouseUp Event binding for input icon Ripple Effect */ }
            inputIcon[i].addEventListener('mouseup', function () {
                var ele = this;
                setTimeout(function () { ele.classList.remove('e-input-btn-ripple'); }, 500);
            });
        }
        var getParentNode = function (element) {
            var parentNode = element.parentNode;
            if (parentNode.classList.contains('e-input-in-wrap')) {
                return parentNode.parentNode;
            }
            return parentNode;
        };
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        formValidator = {
            // Defines the validation rules
            rules: {
                'name': {
                    required: [true, '* Enter your name']
                },
                'email': {
                    required: [true, '* Please enter valid email']
                },
                'upload': {
                    required: [true, '* Select any file']
                },
                'mobile': {
                    required: [true, '* Enter your mobile number']
                }
            }
        };
        formObject = new ej2_inputs_1.FormValidator('#formTemp', formValidator);
    };
    var onSubmitClick = function () {
        if (formObject.validate()) {
            formObject.element.reset();
            dialogInstance.show();
        }
    };
    var onFileSelected = function (args) {
        inputElement = inputRefElement;
        inputElement.value = args.filesData[0].name;
        inputElement.classList.remove('e-error');
        inputElement.classList.remove('e-valid');
        inputElement.removeAttribute('aria-invalid');
        inputElement.setAttribute('aria-invalid', 'false');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section col-lg-12 uploadpreview' },
            React.createElement("h4", { className: "form-title" }, "Photo Contest"),
            React.createElement("div", { className: "control_wrapper uploader-form", id: "control_wrapper" },
                React.createElement("form", { id: "formTemp", method: "post" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "text", id: "name", name: "name", "data-msg-containerid": "nameError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "name" }, "Name")),
                        React.createElement("div", { id: "nameError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("input", { type: "email", id: "Email", name: "email", "data-msg-containerid": "mailError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "email" }, "Email")),
                        React.createElement("div", { id: "mailError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input", id: "mobile-no" },
                            React.createElement("input", { type: "tel", maxLength: 10, id: "mobileno", name: "mobile", "data-msg-containerid": "noError" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top", htmlFor: "mobile" }, "Mobile no")),
                        React.createElement("div", { id: "noError" })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input upload-area" },
                            React.createElement("input", { type: "text", readOnly: true, id: "upload", ref: inputRef, name: "upload", "data-msg-containerid": "uploadError" }),
                            React.createElement("button", { id: "browse", className: "e-control e-btn e-info" }, "Browse..."),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top" }, "Choose a file")),
                        React.createElement("div", { id: "uploadError" }),
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', selected: onFileSelected.bind(_this), autoUpload: autoUpload, allowedExtensions: allowedExtensions, multiple: multiple })),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("div", { className: "e-float-input" },
                            React.createElement("textarea", { className: "address-field", id: "Address", name: "Address" }),
                            React.createElement("span", { className: "e-float-line" }),
                            React.createElement("label", { className: "e-float-text e-label-top" }, "Address"))),
                    React.createElement("div", { className: "submitBtn" },
                        React.createElement("button", { className: "submit-btn e-btn", id: "submit-btn", onClick: onSubmitClick.bind(_this) }, "Submit"),
                        React.createElement("div", { className: "desc" },
                            React.createElement("span", null, "*This button is not a submit type and the form submit handled from externally."))))),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultdialog", isModal: true, header: 'Success', showCloseIcon: true, visible: false, content: 'Your details have been updated successfully, Thank you.', animationSettings: animationSettings, width: '50%', ref: function (dialog) { return dialogInstance = dialog; }, target: '.control-section' })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                " This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " sample demonstrates the Uploader component supported with HTML form upload.Fill the mandatory details in a form and click the submit button. ")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Uploader component works in synchronous mode using HTML form.When the end-user submits the form, the selected files are submitted to server with the ",
                React.createElement("code", null, "name"),
                " attribute of input element."),
            React.createElement("p", null,
                "More information on the form support can be found on this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/form-support/" }, " documentation section"),
                "."))));
};
exports.default = Formsupport;
