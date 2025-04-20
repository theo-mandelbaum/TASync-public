"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./validation.css");
var Validation = function () {
    var stepperObj = (0, react_1.useRef)(null);
    var stepperContentEle;
    var stepperContentRef = function (element) { stepperContentEle = element; };
    var isEmailValid = false;
    var isFeedbackTextValid = false;
    var isUserNavigatingReverse = false;
    var isCurrentStepValid = false;
    var regex = new RegExp('^[A-Za-z0-9._%+-]{1,}@[A-Za-z0-9._%+-]{1,}');
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        window.onNextStep = function () { return stepperObj.current.nextStep(); };
        window.onPreviousStep = function () { return stepperObj.current.previousStep(); };
        window.onConfirm = function () {
            var stepContent = stepperContentEle.querySelector('.step-content-3');
            if (!stepContent) {
                stepperContentEle.insertAdjacentHTML('beforeend', stepperContents[3]);
                stepContent = stepperContentEle.querySelector(".step-content.step-content-3");
            }
            stepperContentEle.querySelectorAll('.step-content').forEach(function (step) { return step.classList.remove('step-active'); });
            if (stepContent) {
                stepContent.classList.add('step-active');
                stepperObj.current.steps[stepperObj.current.activeStep].isValid = true;
                stepperObj.current.steps[stepperObj.current.activeStep].status = 'completed';
            }
        };
        window.onInputChange = function (val, isEmailInput) {
            var elementId = isEmailInput ? 'add-email' : 'feedback-area';
            var errElement = stepperContentEle.querySelector(".".concat(elementId, ".error-label"));
            if (val.value.length === 0) {
                if (isEmailInput)
                    errElement.textContent = 'Email cannot be empty.';
                else
                    errElement.textContent = 'Feedback cannot be empty.';
                isFeedbackTextValid = false;
            }
            else {
                if (isEmailInput) {
                    isEmailValid = regex.test(val.value);
                    errElement.textContent = isEmailValid ? '' : 'Enter a valid email address.';
                }
                else {
                    isFeedbackTextValid = val.value.length > 15;
                    errElement.textContent = isFeedbackTextValid ? '' : 'Please enter at least 15 characters.';
                }
            }
            errElement.style.visibility = errElement.textContent ? 'visible' : 'hidden';
        };
        window.onReset = function () {
            isCurrentStepValid = false;
            stepperObj.current.reset();
            Array.from(stepperContentEle.querySelectorAll('.inputContainer')).forEach(function (ele) {
                ele.value = '';
                if (ele.classList.contains('new-user'))
                    ele.checked = true;
                else
                    ele.checked = false;
            });
            for (var i = 0; i < stepperObj.current.steps.length; i++) {
                stepperObj.current.steps[i].isValid = null;
            }
        };
    }, []);
    var stepperContents = [
        "<div class='step-content step-content-0 step-active'><div id='agreement-text'><p>Welcome! This survey is an opportunity for you to share your opinions and experiences, contributing to the ongoing improvement of our offerings. Your participation is highly appreciated, and we look forward to gaining a deeper understanding of your preferences. </p></div><label style='margin-top: 15px'>Enter your email <span class='required'>*</span></label><input class='e-input inputContainer' id='add-email' placeholder='Enter here' oninput='onInputChange(this, true)' /><div class='add-email error-label'>Email cannot be empty.</div><button style='margin-top: 20px;' class='e-btn nextStep stepperBtn' onclick='onNextStep(this)'>Next</button></div>",
        "<div class='step-content step-content-1'> <div class='question-container'> <div class='survey-question'><p> Is this the first time you have visited this website? <span class='required'>*</span></p><label> <input type='radio' class='inputContainer new-user' name='service-usage' value='yes' checked={true}> Yes </label> <label style='margin: 0px 10px'> <input type='radio' class='inputContainer old-user' name='service-usage' value='no'> No </label></div> <div class='feedback-section'> <p class='feedback-label'>Anything else you would like to share? <span class='required'>*</span></p> <textarea id='feedback-text' class='inputContainer' placeholder='I have feedback on...' oninput='onInputChange(this)' required></textarea> <div class='feedback-area error-label' style='margin: 0'>Feedback cannot be empty.</div> </div> </div><div style='display: flex;'> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn previousStep' onclick='onPreviousStep(this)'>Previous</button> <button style='margin-top: 20px;' class='e-btn nextStep' onclick='onNextStep(this)'>Submit Feedback</button></div></div></div>",
        "<div class='step-content step-content-2'><div class='confirm-section'><div class='feedback-msg'><b>Please confirm to submit your feedback,</b></div><br/><div class='feedback-msg' id='feedback-message'></div> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn confirmbutton' id='confirm-button' onclick='onConfirm(this)'>Confirm</button></div></div>",
        "<div class='step-content step-content-3'><div class='success-section'><div class='success-message' id='success-message'>Thanks! Feedback has been submitted successfully.</div><button style='margin-top: 20px; margin-right: 5%;' type='reset' class='e-btn e-hide' id='reset-button' onclick='onReset(this)'> Reset </button> </div></div>"
    ];
    function handleStepChange(args) {
        isUserNavigatingReverse = args.activeStep < args.previousStep ? true : false;
        if (!isUserNavigatingReverse) {
            setValidState(args);
        }
        // Making the previous and current step invalid if user navigates in reverse order.
        else {
            stepperObj.current.steps[args.activeStep].isValid = stepperObj.current.steps[args.activeStep + 1].isValid = null;
            isCurrentStepValid = true;
        }
        if (isCurrentStepValid) {
            var stepContent = stepperContentEle.querySelector(".step-content-".concat(args.activeStep));
            /* Remove all active class */
            stepperContentEle.querySelectorAll('.step-content').forEach(function (step) { return step.classList.remove('step-active'); });
            /* Only update the html into DOM if not previously */
            if (!stepContent) {
                stepperContentEle.insertAdjacentHTML('beforeend', stepperContents[args.activeStep]);
                stepContent = stepperContentEle.querySelector(".step-content.step-content-" + args.activeStep);
            }
            /* Update the active class */
            if (stepContent) {
                stepContent.classList.add('step-active');
            }
            if (args.activeStep === 2) {
                var feedbackMessage = stepperContentEle.querySelector("#feedback-message");
                feedbackMessage.textContent = stepperContentEle.querySelector('#feedback-text').value;
            }
        }
    }
    function setValidState(args) {
        var stepIndexToValidate = stepperObj.current.activeStep;
        if (stepperObj.current.activeStep === 0) {
            var emailInput = stepperContentEle.querySelector('#add-email');
            isCurrentStepValid = emailInput.value.length && isEmailValid;
            window.onInputChange(emailInput, true);
        }
        if (stepperObj.current.activeStep === 1) {
            var radioInputs = stepperContentEle.querySelectorAll('.survey-question input');
            var isChecked = Array.from(radioInputs).some(function (input) { return input.checked; });
            isCurrentStepValid = isChecked && isFeedbackTextValid;
            window.onInputChange(stepperContentEle.querySelector('#feedback-text'));
        }
        if (stepperObj.current.activeStep === 2)
            isCurrentStepValid = true;
        args.cancel = !isCurrentStepValid;
        stepperObj.current.steps[stepIndexToValidate].isValid = isCurrentStepValid;
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "validation-stepper-section" },
                React.createElement(ej2_react_navigations_1.StepperComponent, { ref: stepperObj, linear: true, stepChanging: function (args) { handleStepChange(args); }, created: function () { stepperContentEle.innerHTML = stepperContents[stepperObj.current.activeStep]; } },
                    React.createElement(ej2_react_navigations_1.StepsDirective, null,
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-survey-intro', text: 'Survey Introduction' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-survey-feedback', text: 'Feedback' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-survey-status', text: 'Status' })))),
            React.createElement("div", { id: "validation-step-content", ref: stepperContentRef })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases the integration of validation support in the Stepper component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Stepper validation ensures that user inputs are correct and guides them to prevent errors before proceeding to the next step. The ",
                React.createElement("code", null, "isValid"),
                " property is used for validating the state of each step within the Stepper component."))));
};
exports.default = Validation;
