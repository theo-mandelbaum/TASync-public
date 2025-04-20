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
exports.Validation = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./validation.css");
var Validation = /** @class */ (function (_super) {
    __extends(Validation, _super);
    function Validation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEmailValid = false;
        _this.isFeedbackTextValid = false;
        _this.isUserNavigatingReverse = false;
        _this.isCurrentStepValid = false;
        _this.regex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
        _this.stepperContents = [
            "<div class='step-content step-content-0 step-active'><div id='agreement-text'><p>Welcome! This survey is an opportunity for you to share your opinions and experiences, contributing to the ongoing improvement of our offerings. Your participation is highly appreciated, and we look forward to gaining a deeper understanding of your preferences. </p></div><label style='margin-top: 15px'>Enter your email <span class='required'>*</span></label><input class='e-input inputContainer' id='add-email' placeholder='Enter here' oninput='onInputChange(this, true)' /><div class='add-email error-label'>Email cannot be empty.</div><button style='margin-top: 20px;' class='e-btn nextStep stepperBtn' onclick='onNextStep(this)'>Next</button></div>",
            "<div class='step-content step-content-1'> <div class='question-container'> <div class='survey-question'><p> Is this the first time you have visited this website? <span class='required'>*</span></p><label> <input type='radio' class='inputContainer new-user' name='service-usage' value='yes' checked={true}> Yes </label> <label style='margin: 0px 10px'> <input type='radio' class='inputContainer old-user' name='service-usage' value='no'> No </label></div> <div class='feedback-section'> <p class='feedback-label'>Anything else you would like to share? <span class='required'>*</span></p> <textarea id='feedback-text' class='inputContainer' placeholder='I have feedback on...' oninput='onInputChange(this)' required></textarea> <div class='feedback-area error-label' style='margin: 0'>Feedback cannot be empty.</div> </div> </div><div style='display: flex;'> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn previousStep' onclick='onPreviousStep(this)'>Previous</button> <button style='margin-top: 20px;' class='e-btn nextStep' onclick='onNextStep(this)'>Submit Feedback</button></div></div></div>",
            "<div class='step-content step-content-2'><div class='confirm-section'><div class='feedback-msg'><b>Please confirm to submit your feedback,</b></div><br/><div class='feedback-msg' id='feedback-message'></div> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn confirmbutton' id='confirm-button' onclick='onConfirm(this)'>Confirm</button></div></div>",
            "<div class='step-content step-content-3'><div class='success-section'><div class='success-message' id='success-message'>Thanks! Feedback has been submitted successfully.</div><button style='margin-top: 20px; margin-right: 5%;' type='reset' class='e-btn e-hide' id='reset-button' onclick='onReset(this)'> Reset </button> </div></div>"
        ];
        return _this;
    }
    Validation.prototype.componentDidMount = function () {
        var _this = this;
        this.stepperContentRef = function (element) { _this.stepperContentEle = element; };
        window.onNextStep = function () { this.stepperObj.nextStep(); };
        window.onPreviousStep = function () { this.stepperObj.previousStep(); };
        window.onConfirm = function () {
            var stepContent = this.stepperContentEle.querySelector('.step-content-3');
            if (!stepContent) {
                this.stepperContentEle.insertAdjacentHTML('beforeend', this.stepperContents[3]);
                stepContent = this.stepperContentEle.querySelector(".step-content.step-content-3");
            }
            this.stepperContentEle.querySelectorAll('.step-content').forEach(function (step) { return step.classList.remove('step-active'); });
            if (stepContent) {
                stepContent.classList.add('step-active');
                this.stepperObj.steps[this.stepperObj.activeStep].isValid = true;
                this.stepperObj.steps[this.stepperObj.activeStep].status = 'completed';
            }
        };
        window.onInputChange = function (val, isEmailInput) {
            var elementId = isEmailInput ? 'add-email' : 'feedback-area';
            var errElement = this.stepperContentEle.querySelector(".".concat(elementId, ".error-label"));
            if (val.value.length === 0) {
                if (isEmailInput)
                    errElement.textContent = 'Email cannot be empty.';
                else
                    errElement.textContent = 'Feedback cannot be empty.';
                this.isFeedbackTextValid = false;
            }
            else {
                if (isEmailInput) {
                    this.isEmailValid = this.regex.test(val.value);
                    errElement.textContent = this.isEmailValid ? '' : 'Enter a valid email address.';
                }
                else {
                    this.isFeedbackTextValid = val.value.length > 15;
                    errElement.textContent = this.isFeedbackTextValid ? '' : 'Please enter at least 15 characters.';
                }
            }
            errElement.style.visibility = errElement.textContent ? 'visible' : 'hidden';
        };
        window.onReset = function () {
            this.isCurrentStepValid = false;
            this.stepperObj.reset();
            Array.from(this.stepperContentEle.querySelectorAll('.inputContainer')).forEach(function (ele) {
                ele.value = '';
                if (ele.classList.contains('new-user'))
                    ele.checked = true;
                else
                    ele.checked = false;
            });
            for (var i = 0; i < this.stepperObj.steps.length; i++) {
                this.stepperObj.steps[i].isValid = null;
            }
        };
    };
    Validation.prototype.handleStepChange = function (args) {
        this.isUserNavigatingReverse = args.activeStep < args.previousStep ? true : false;
        if (!this.isUserNavigatingReverse) {
            this.setValidState(args);
        }
        // Making the previous and current step invalid if user navigates in reverse order.
        else {
            this.stepperObj.steps[args.activeStep].isValid = this.stepperObj.steps[args.activeStep + 1].isValid = null;
            this.isCurrentStepValid = true;
        }
        if (this.isCurrentStepValid) {
            var stepContent = this.stepperContentEle.querySelector(".step-content-".concat(args.activeStep));
            /* Remove all active class */
            this.stepperContentEle.querySelectorAll('.step-content').forEach(function (step) { return step.classList.remove('step-active'); });
            /* Only update the html into DOM if not previously */
            if (!stepContent) {
                this.stepperContentEle.insertAdjacentHTML('beforeend', this.stepperContents[args.activeStep]);
                stepContent = this.stepperContentEle.querySelector(".step-content.step-content-" + args.activeStep);
            }
            /* Update the active class */
            if (stepContent) {
                stepContent.classList.add('step-active');
            }
            if (args.activeStep === 2) {
                var feedbackMessage = this.stepperContentEle.querySelector('#feedback-message');
                feedbackMessage.textContent = this.stepperContentEle.querySelector('#feedback-text').value;
            }
        }
    };
    Validation.prototype.setValidState = function (args) {
        var stepIndexToValidate = this.stepperObj.activeStep;
        if (this.stepperObj.activeStep === 0) {
            var emailInput = this.stepperContentEle.querySelector('#add-email');
            this.isCurrentStepValid = emailInput.value.length && this.isEmailValid;
            window.onInputChange(emailInput, true);
        }
        if (this.stepperObj.activeStep === 1) {
            var radioInputs = this.stepperContentEle.querySelectorAll('.survey-question input');
            var isChecked = Array.from(radioInputs).some(function (input) { return input.checked; });
            this.isCurrentStepValid = isChecked && this.isFeedbackTextValid;
            window.onInputChange(this.stepperContentEle.querySelector('#feedback-text'));
        }
        if (this.stepperObj.activeStep === 2)
            this.isCurrentStepValid = true;
        args.cancel = !this.isCurrentStepValid;
        this.stepperObj.steps[stepIndexToValidate].isValid = this.isCurrentStepValid;
    };
    Validation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "validation-stepper-section" },
                    React.createElement(ej2_react_navigations_1.StepperComponent, { ref: function (stepperObj) { return _this.stepperObj = stepperObj; }, linear: true, stepChanging: function (args) { _this.handleStepChange(args); }, created: function () { _this.stepperContentEle.innerHTML = _this.stepperContents[_this.stepperObj.activeStep]; } },
                        React.createElement(ej2_react_navigations_1.StepsDirective, null,
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-survey-intro', text: 'Survey Introduction' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-survey-feedback', text: 'Feedback' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-survey-status', text: 'Status' })))),
                React.createElement("div", { id: "validation-step-content", ref: function (stepperContentRef) { return _this.stepperContentRef = stepperContentRef; } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases the integration of validation support in the Stepper component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Stepper validation ensures that user inputs are correct and guides them to prevent errors before proceeding to the next step. The ",
                    React.createElement("code", null, "isValid"),
                    " property is used for validating the state of each step within the Stepper component."))));
    };
    return Validation;
}(sample_base_1.SampleBase));
exports.Validation = Validation;
