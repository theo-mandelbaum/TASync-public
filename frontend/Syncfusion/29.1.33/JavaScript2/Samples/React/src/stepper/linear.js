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
exports.Linear = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./linear.css");
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Linear.prototype.componentDidMount = function () {
        var _this = this;
        this.stepperContentRef = function (element) { _this.stepperContentEle = element; };
        this.stepperOptionsRef = function (element) { _this.stepperOptionsEle = element; };
    };
    ;
    Linear.prototype.updateBack = function () {
        this.stepperObj.previousStep();
        this.updateContent(this.stepperObj.activeStep);
    };
    ;
    Linear.prototype.updateNext = function () {
        this.stepperObj.nextStep();
        this.updateContent(this.stepperObj.activeStep);
    };
    ;
    Linear.prototype.toggleNavigationButtons = function (activeStep) {
        document.getElementById('previousStep').style.display = (activeStep !== 0) ? 'block' : 'none';
        document.getElementById('nextStep').style.display = (activeStep !== 3) ? 'block' : 'none';
    };
    Linear.prototype.updateContent = function (args) {
        var stepperContent = document.getElementById('linear-stepper-content');
        switch (args) {
            case 0:
                stepperContent.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>";
                break;
            case 1:
                stepperContent.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>Task planning involves creating a comprehensive roadmap that outlines specific tasks, sets achievable milestones, and allocates responsibilities among team members. </li>\n                <li>This phase requires a detailed breakdown of the project's requirements, resources, and a strategic timeline to ensure a systematic and efficient execution of tasks.</li>\n                </ul>";
                break;
            case 2:
                stepperContent.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>In this phase, project managers closely monitor the progress of individual tasks, track the overall project's advancement, and regularly update task statuses.</li><li>Continuous assessment of the project's timeline and potential challenges allows for timely adjustments, ensuring that the project stays on course and within the predefined parameters.</li></ul>";
                break;
            case 3:
                stepperContent.innerHTML = "<b>Description:</b> <br/><br/> <ul><li>\n                The final phase focuses on the comprehensive evaluation of the project's success, completion of all deliverables, and documentation of lessons learned. </li><li>Analyzing the outcomes and documenting the experiences gained during the project's lifecycle are crucial for improving future project management processes and enhancing overall organizational efficiency.</li>";
                break;
            default:
                break;
        }
        this.toggleNavigationButtons(args);
    };
    Linear.prototype.updateLinear = function (args) {
        this.stepperObj.linear = (/true/).test(args.currentTarget.value) ? true : false;
        this.stepperObj.reset();
        this.updateContent(this.stepperObj.activeStep);
    };
    ;
    Linear.prototype.handleStepChange = function (args) {
        this.updateContent(args.activeStep);
    };
    Linear.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "linear-stepper-section" },
                    React.createElement("div", { className: "e-btn-group" },
                        React.createElement("input", { type: "radio", id: "linear", name: "Linear", value: "true", onClick: this.updateLinear.bind(this), defaultChecked: true }),
                        React.createElement("label", { className: "e-btn", htmlFor: "linear" }, "Linear"),
                        React.createElement("input", { type: "radio", id: "nonLinear", name: "Linear", value: "false", onClick: this.updateLinear.bind(this) }),
                        React.createElement("label", { className: "e-btn", htmlFor: "nonLinear" }, "Non-Linear"))),
                React.createElement("div", { id: "linear-stepper-control" },
                    React.createElement(ej2_react_navigations_1.StepperComponent, { ref: function (stepper) { _this.stepperObj = stepper; }, linear: true, stepChanged: this.handleStepChange.bind(this) },
                        React.createElement(ej2_react_navigations_1.StepsDirective, null,
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-form', label: 'Project Setup' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-tasksheet', label: 'Task Planning' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-progress', label: 'Progress Tracking' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-submit', label: 'Project Completion' })))),
                React.createElement("div", { id: "linear-stepper-content", ref: function (stepperContent) { _this.stepperContentRef = stepperContent; } },
                    React.createElement("b", null, "Description:"),
                    " ",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    " ",
                    React.createElement("ul", null,
                        React.createElement("li", null, "During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters."),
                        React.createElement("li", null, "This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders."))),
                React.createElement("div", { className: "linear-stepper-options", style: { display: "inline-flex" }, ref: function (stepperOptions) { _this.stepperOptionsRef = stepperOptions; } },
                    React.createElement("button", { id: "previousStep", style: { marginRight: "15px", display: "none" }, onClick: this.updateBack.bind(this), className: "e-btn" }, "Back"),
                    React.createElement("button", { id: "nextStep", style: { display: "block" }, onClick: this.updateNext.bind(this), className: "e-btn" }, "Next"))),
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
    return Linear;
}(sample_base_1.SampleBase));
exports.Linear = Linear;
