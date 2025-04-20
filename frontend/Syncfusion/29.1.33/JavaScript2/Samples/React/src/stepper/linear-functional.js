"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./linear.css");
var Linear = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var stepperObj = (0, react_1.useRef)(null);
    var stepperContentEle;
    var stepperOptionsEle;
    var stepperContentRef = function (element) { stepperContentEle = element; };
    var stepperOptionsRef = function (element) { stepperOptionsEle = element; };
    var updateBack = function () {
        stepperObj.current.previousStep();
        updateContent(stepperObj.current.activeStep);
    };
    var updateNext = function () {
        stepperObj.current.nextStep();
        updateContent(stepperObj.current.activeStep);
    };
    var toggleNavigationButtons = function (activeStep) {
        stepperOptionsEle.querySelector('#previousStep').style.display = (activeStep !== 0) ? 'block' : 'none';
        stepperOptionsEle.querySelector('#nextStep').style.display = (activeStep !== 3) ? 'block' : 'none';
    };
    var updateContent = function (args) {
        switch (args) {
            case 0:
                stepperContentEle.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>";
                break;
            case 1:
                stepperContentEle.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>Task planning involves creating a comprehensive roadmap that outlines specific tasks, sets achievable milestones, and allocates responsibilities among team members. </li>\n                <li>This phase requires a detailed breakdown of the project's requirements, resources, and a strategic timeline to ensure a systematic and efficient execution of tasks.</li>\n                </ul>";
                break;
            case 2:
                stepperContentEle.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>In this phase, project managers closely monitor the progress of individual tasks, track the overall project's advancement, and regularly update task statuses.</li><li>Continuous assessment of the project's timeline and potential challenges allows for timely adjustments, ensuring that the project stays on course and within the predefined parameters.</li></ul>";
                break;
            case 3:
                stepperContentEle.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>\n                The final phase focuses on the comprehensive evaluation of the project's success, completion of all deliverables, and documentation of lessons learned. </li><li>Analyzing the outcomes and documenting the experiences gained during the project's lifecycle are crucial for improving future project management processes and enhancing overall organizational efficiency.</li>";
                break;
            default:
                break;
        }
        toggleNavigationButtons(args);
    };
    var updateLinear = function (args) {
        stepperObj.current.linear = (/true/).test(args.currentTarget.value) ? true : false;
        stepperObj.current.reset();
        updateContent(stepperObj.current.activeStep);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "linear-stepper-section" },
                React.createElement("div", { className: "e-btn-group" },
                    React.createElement("input", { type: "radio", id: "linear", name: "Linear", value: "true", onClick: updateLinear, defaultChecked: true }),
                    React.createElement("label", { className: "e-btn", htmlFor: "linear" }, "Linear"),
                    React.createElement("input", { type: "radio", id: "nonLinear", name: "Linear", value: "false", onClick: updateLinear }),
                    React.createElement("label", { className: "e-btn", htmlFor: "nonLinear" }, "Non-Linear"))),
            React.createElement("div", { className: "linear-stepper-control" },
                React.createElement(ej2_react_navigations_1.StepperComponent, { ref: stepperObj, linear: true, stepChanged: function (args) { return updateContent(args.activeStep); } },
                    React.createElement(ej2_react_navigations_1.StepsDirective, null,
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-form', label: 'Project Setup' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-tasksheet', label: 'Task Planning' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-progress', label: 'Progress Tracking' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-submit', label: 'Project Completion' })))),
            React.createElement("div", { id: "linear-stepper-content", ref: stepperContentRef },
                React.createElement("b", null, "Description:"),
                " ",
                React.createElement("br", null),
                React.createElement("br", null),
                " ",
                React.createElement("ul", null,
                    React.createElement("li", null, "During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters."),
                    React.createElement("li", null, "This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders."))),
            React.createElement("div", { className: "linear-stepper-options", style: { display: "inline-flex" }, ref: stepperOptionsRef },
                React.createElement("button", { id: "previousStep", style: { marginRight: "15px", display: "none" }, onClick: updateBack, className: "e-btn" }, "Back"),
                React.createElement("button", { id: "nextStep", style: { display: "block" }, onClick: updateNext, className: "e-btn" }, "Next"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample showcases the usage of the ",
                React.createElement("code", null, "linear"),
                " property in the Stepper component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In a linear process, users progress through steps one after the other in a sequential order. In a non-linear process, users have the flexibility to skip or complete steps in any order they prefer. In this example, the progress status can be interacted with in both a linear and nonlinear manner using the ",
                React.createElement("code", null, "linear"),
                " property."))));
};
exports.default = Linear;
